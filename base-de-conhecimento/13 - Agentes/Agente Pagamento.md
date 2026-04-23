---
tipo: agente
area: Sistema
tags: [agente, pagamento, gateway, stripe, asaas]
atualizado: 2026-04-23
---

# Agente Pagamento

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]] secao 5 (oferta). O Agente Pagamento **nao** gerencia cobranca recorrente — a oferta da buscou.ai e uma **compra unica** (R$ 2.500 a vista ou R$ 3.000 parcelado em 12x, cliente assume juros). Este agente monitora o status do gateway, confirma pagamentos e acompanha parcelas do parcelado.

Relacionado: [[Arquitetura de Agentes]] | [[Orquestrador]] | [[Oferta Comercial]] | [[Modelo de Negocio]]

---

## Funcao

Recebe webhooks do gateway de pagamento (Stripe ou Asaas) e:
- Confirma pagamento a vista (Pix ou cartao) e dispara onboarding automatico.
- Confirma primeira parcela do parcelado 12x e dispara onboarding automatico.
- Monitora parcelas subsequentes do parcelado; em falha, aciona smart retry do gateway + notifica o cliente.
- Gera relatorios financeiros (caixa recebido, parcelamentos em aberto).

**Nao cobra mensalidade.** Nao existe "renovacao automatica" — a compra foi unica. Apos as 12 parcelas, o cliente nao paga mais nada e o motor continua funcionando.

---

## Input

- **Webhooks gateway**: `payment_intent.succeeded`, `payment_intent.payment_failed`, `invoice.payment_failed` (para parcelas subsequentes), `charge.refunded`.
- **Dados do cliente**: ID, metodo de pagamento, modalidade (a vista / 12x), numero da parcela atual.
- **Configuracao de retry**: cadencia (D+1, D+3, D+5 — smart retry do gateway), maximo de tentativas, acao final.
- **Templates de notificacao**: mensagens por estagio (confirmacao → aviso de falha → follow-up).

---

## Output

- **Confirmacao de pagamento**: dispara evento `pagamento_confirmado` no Orquestrador → cria projeto + onboarding.
- **Notificacao de parcela em atraso**: e-mail + WhatsApp amigavel.
- **Retry via gateway**: dispara smart retry (D+1, D+3, D+5).
- **Escalacao para humano**: apos 30 dias em aberto, caso vira dunning humano.
- **Relatorios**: caixa recebido, parcelamentos em aberto, taxa de recuperacao.

**Nao pausa servico por padrao.** A compra foi unica — a parte ja paga cobre custo operacional enquanto o gateway tenta recuperar.

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| Stripe API ou Asaas API | Criar PaymentIntent, verificar status, disparar retry |
| Resend ou SendGrid | E-mails transacionais (confirmacao, aviso de falha) |
| WhatsApp Business API | Notificacoes (maior abertura que e-mail) |
| Claude Sonnet 4 | Personalizar tom das mensagens por contexto |
| PostgreSQL | Historico de pagamentos, status, parcelas |
| Slack API | Alertar equipe sobre casos criticos |
| MCP Tools | `confirm_payment`, `send_payment_notification`, `trigger_retry`, `generate_report` |

---

## Gatilho

- **Webhook gateway**: `payment_intent.succeeded` → confirma pagamento e dispara onboarding.
- **Webhook gateway**: `invoice.payment_failed` (parcela 2-12 do parcelado) → dispara retry + notificacao.
- **Cron diario (10h)**: revisa parcelamentos em aberto, dispara proxima acao conforme cronograma.

---

## Criterios de sucesso

| Metrica | Meta |
|---|---|
| Tempo de confirmacao apos webhook | < 5 min |
| Dispatch de onboarding apos confirmacao | < 1 min |
| Recuperacao de parcela falha (12x) | > 80% (smart retry do gateway recupera a maioria) |
| Zero cobranca duplicada | 100% idempotente |
| Notificacao de falha ao cliente | Em < 10 min do evento |

---

## Cadencia para parcela em atraso (parcelado 12x)

| Dia | Acao |
|---|---|
| D+0 (falha) | Gateway dispara retry automatico + Pagamento notifica cliente (e-mail + WhatsApp amigavel: "tivemos um probleminha com sua parcela. Pode verificar? Se precisar atualizar cartao: [link]") |
| D+3 | Retry gateway + lembrete |
| D+5 | Retry final gateway |
| D+7-30 | Acompanhamento via Pagamento (nao envia mais cobranca automatica; espera cliente atualizar) |
| D+30 | Caso vira dunning humano — equipe entra em contato |

**Durante todo esse periodo o motor continua publicando.** A compra foi unica, o ja pago (ou as parcelas ate entao) cobre o custo operacional.

---

## Casos de erro

1. **Webhook nao chega.** Cron diario consulta gateway diretamente para parcelas com status `past_due` e sincroniza.
2. **Cartao expirado.** Identificar razao (`card_expired`) e enviar notificacao especifica pedindo atualizacao.
3. **Chargeback (cliente contesta).** Pausar servico imediatamente, notificar equipe, preparar evidencias (contrato, artigos publicados, comunicacao).
4. **Reembolso dentro do periodo de 14 dias** ([[SLAs e Garantias]]): processar no gateway + cancelar parcelas restantes se for parcelado.
5. **Pagamento em moeda diferente**: Stripe/Asaas convertem; Pagamento informa valor correto na moeda do cliente.

---

## Fallback

- **Gateway API fora**: enfileirar acoes em BullMQ. Nenhum pagamento e perdido — status fica pendente no gateway.
- **E-mail nao entregue**: fallback para WhatsApp. Se ambos falham, alerta Slack.
- **WhatsApp API falha**: usar so e-mail, duplicar no dia seguinte.

---

## Dependencias

- **Depende de**: [[Orquestrador]], Stripe API (ou Asaas), provedor de e-mail, WhatsApp API.
- **Quem depende**: Onboarding Automatico (precisa de `pagamento_confirmado`), equipe financeira (relatorios), [[Agente Suporte]] (recebe duvidas de pagamento).
- **Referencia**: [[Oferta Comercial]], [[SLAs e Garantias]].

---

## Exemplo de execucao

**Cenario:** cliente compra R$ 3.000 em 12x (primeira parcela de R$ 250 hoje).

```
1. [14:00] Cliente finaliza checkout no Stripe.
2. [14:00] Stripe dispara webhook `payment_intent.succeeded`.
3. [14:00] Orquestrador → Pagamento recebe.
4. [14:01] Pagamento:
   - confirma primeira parcela no PostgreSQL (parcela 1 de 12, valor R$ 250)
   - marca customer como `active`
   - dispara evento `pagamento_confirmado`
5. [14:01] Orquestrador:
   - cria projeto no Supabase
   - libera dashboard
   - dispara e-mail de boas-vindas
6. [14:01] Pagamento envia WhatsApp:
   "Pagamento confirmado! Seu blog entra no ar em ate 7 dias. 
    Seu dashboard: [link]. Qualquer duvida, e so responder aqui."

# Parcela 5 (D+120), cartao recusado:
1. [02:00 D+120] Stripe tenta cobrar → falha (saldo insuficiente).
2. [02:01] Webhook `invoice.payment_failed` chega.
3. [02:05] Pagamento envia WhatsApp amigavel:
   "Tivemos um probleminha com sua parcela 5 de 12. Isso acontece — 
    as vezes o cartao bloqueia por precaucao. Pode atualizar aqui: [link]?"
4. [D+121, D+123, D+125] Gateway smart retry automatico.
5. [D+125] Todas as tentativas falham.
6. Pagamento nao interrompe servico — motor continua publicando.
7. [D+150] Caso vira dunning humano — equipe faz ligacao.
```

---

## Custo estimado

| Componente | Custo |
|---|---|
| Claude Sonnet (personalizar mensagens, ~1k tokens/evento) | ~$0,003 |
| Stripe API | Gratuito (taxas sao sobre transacao: 4,99% + R$ 0,39 por parcela cartao) |
| Asaas API | Alternativa com taxas menores para Pix |
| E-mail (Resend) | ~$0,001/e-mail |
| WhatsApp Business | ~$0,05/template |
| **Total por evento** | **~$0,05-0,10** |
| **Total por ciclo completo (12x, com 1 retry)** | **~$0,80-1,20** |

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 5, 7 — ultima verificacao 2026-04-23.*
