---
tipo: agente
area: Sistema
tags: [agente, pagamento, gateway, stripe, asaas, infra-mensal]
atualizado: 2026-04-23
---

# Agente Pagamento

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]] secao 5 e [[Decision Log - 2026-04-23 - Infra Mensal]]. O Agente Pagamento opera **dois fluxos de cobranca distintos**: (1) Implementacao — cobranca unica (R$ 2.500 a vista ou R$ 3.000 em 12 parcelas de R$ 250); (2) Infra mensal — subscription recorrente (R$ 300/mes a partir do mes 2). Cada fluxo tem estados, eventos e retry proprios.

Relacionado: [[Arquitetura de Agentes]] | [[Orquestrador]] | [[Oferta Comercial]] | [[Modelo de Negocio]] | [[Decision Log - 2026-04-23 - Infra Mensal]]

---

## Funcao

Monitora dois fluxos separados no gateway (Stripe ou Asaas) e reage a seus webhooks:

### Fluxo 1 — Implementacao (one-time ou 12 parcelas)

- Confirma pagamento a vista (Pix ou cartao) **e** dispara onboarding automatico.
- Confirma primeira parcela (em 12x) **e** dispara onboarding automatico.
- Monitora parcelas 2-12 do parcelado; em falha, aciona smart retry do gateway + notifica cliente.
- **Nao pausa o motor por falha em parcela** — a implementacao ja cobriu o motor, as parcelas sao do cliente com o banco/gateway.
- Apos a parcela 12 paga: implementacao esta quitada. Nao ha mais cobranca desse fluxo.

### Fluxo 2 — Infra mensal (recurring, a partir do mes 2)

- No mes 2 do ciclo do cliente (30 dias apos blog ir ao ar), ativa subscription no gateway (R$ 300/mes).
- Todo mes: gateway cobra cartao recorrente, Pagamento confirma ou aciona retry.
- Falha: 3 tentativas de smart retry (D+0, D+3, D+7). Se todas falharem, dispara evento `motor.pausar` e notifica cliente.
- Regularizacao: cliente atualiza cartao → gateway cobra → Pagamento confirma → dispara `motor.retomar`.
- Cancelamento explicito pelo cliente: encerra subscription + mantem conta em `motor_paused` indefinidamente ate cliente solicitar cancelamento total.

---

## Input

**Por webhook:**
- `checkout.session.completed` — pagamento unico confirmado (implementacao a vista ou primeira parcela do 12x).
- `invoice.payment_succeeded` — cobranca periodica (parcela do 12x OU infra mensal — discriminar via metadata).
- `invoice.payment_failed` — falha em cobranca (parcela OU infra — discriminar).
- `customer.subscription.created` — subscription da infra foi criada.
- `customer.subscription.deleted` — cliente cancelou a subscription.
- `charge.refunded` — reembolso.

**Por dados do cliente:**
- ID da organizacao, metodo de pagamento, modalidade da implementacao (a vista / 12x), mes de ciclo atual, status da infra.

**Por configuracao:**
- Cadencia de retry para parcelas (smart retry gateway).
- Cadencia de retry para infra (D+0, D+3, D+7 → pausa motor).
- Templates de notificacao por estagio.

---

## Output

### Para o Orquestrador

| Evento emitido | Quando |
|---|---|
| `compra.confirmada` | Implementacao paga (a vista ou primeira parcela) — dispara onboarding |
| `parcela.paga` | Parcela 2-12 do parcelado confirmada |
| `parcela.falhou` | Falha em parcela — gateway faz smart retry |
| `parcela.recuperada` | Parcela recuperada apos retry |
| `compra.quitada` | 12a parcela paga — implementacao quitada |
| `infra.assinatura_iniciada` | Mes 2 do ciclo — primeira cobranca da infra |
| `infra.cobranca_paga` | Cobranca mensal da infra confirmada |
| `infra.cobranca_falhou` | Falha na cobranca da infra (emitido com contador de tentativa) |
| `motor.pausar_por_inadimplencia` | 3 tentativas de infra falharam — motor deve pausar |
| `motor.retomar_apos_regularizacao` | Cliente regularizou infra — motor deve retomar |
| `infra.cancelada` | Cliente cancelou a subscription explicitamente |
| `chargeback.aberto` | Cliente contestou cobranca |

### Para o cliente
- Notificacoes amigaveis (e-mail + WhatsApp) em cada evento relevante.
- Link para portal do gateway para atualizar cartao.

### Para a equipe
- Relatorios diarios (caixa recebido, parcelas em aberto, infra em overdue).
- Alertas em Slack para casos criticos (chargeback, motor_paused).

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| Stripe API ou Asaas API | Criar PaymentIntent, criar Subscription, verificar status, smart retry |
| Resend ou SendGrid | E-mails transacionais |
| WhatsApp Business API | Notificacoes (maior abertura) |
| Claude Sonnet 4 | Personalizar tom das mensagens |
| PostgreSQL | Tabelas `compras`, `parcelas_implementacao`, `assinaturas_infra`, `tentativas_cobranca` (ver [[Entidades e Schema - Fase 1 (Onboarding)]] — Bloco C) |
| Slack API | Alertar equipe |
| MCP Tools | `confirm_payment`, `activate_infra_subscription`, `trigger_retry`, `pause_motor`, `resume_motor`, `generate_report` |

---

## Gatilho

- **Webhook gateway**: cada evento dispara a acao correspondente.
- **Cron diario (10h)**: reconciliacao defensiva — consulta gateway para compras e subscriptions com status inconsistente no banco.
- **Cron mensal (dia 30 do ciclo de cada cliente)**: verifica se ja passou do mes 1 e ativa subscription da infra no gateway se ainda nao ativa.

---

## Criterios de sucesso

| Metrica | Meta |
|---|---|
| Tempo de confirmacao apos webhook | < 5 min |
| Dispatch de onboarding apos confirmacao da implementacao | < 1 min |
| Recuperacao de parcela falha (implementacao 12x) | > 80% via smart retry do gateway |
| Recuperacao de cobranca falha (infra mensal) | > 70% apos smart retry (D+0, D+3, D+7) |
| Zero cobranca duplicada | 100% idempotente (via idempotency keys do gateway) |
| Notificacao de falha ao cliente | < 10 min do evento |
| Precisao de pausa/retomada do motor | 100% (nao pausar cliente em dia, nao manter cliente inadimplente rodando) |

---

## Cadencia para cobranca em atraso

### Parcela da implementacao (parcelado 12x) — NAO pausa motor

| Dia | Acao |
|---|---|
| D+0 (falha) | Gateway dispara retry automatico + Pagamento notifica cliente (e-mail + WhatsApp amigavel: "tivemos um probleminha com sua parcela X de 12. Pode verificar? Se precisar atualizar cartao: [link]") |
| D+3 | Retry gateway + lembrete |
| D+5 | Retry final gateway |
| D+7 a D+30 | Acompanhamento humano |
| D+30 | Caso vira dunning humano — equipe entra em contato |

**Motor nao pausa** porque a implementacao ja pagou (parcelas sao compromisso do cliente com o gateway/banco — o motor ja foi entregue).

### Infra mensal — PAUSA motor apos 3 falhas

| Dia | Acao |
|---|---|
| D+0 (falha) | Gateway tenta retry automatico + Pagamento emite `infra.cobranca_falhou` (tentativa 1) + notifica cliente ("Tivemos problema ao cobrar sua infra mensal. Pode atualizar o cartao? [link]") |
| D+3 | Retry gateway (tentativa 2) + lembrete amigavel |
| D+7 | Retry final gateway (tentativa 3) + aviso critico ("Esta foi a ultima tentativa. Se nao regularizar, seu motor sera pausado em 24h") |
| D+8 | Todas as 3 tentativas falharam → Pagamento emite `motor.pausar_por_inadimplencia` + notifica cliente ("Seu motor foi pausado. Blog e conteudo ja publicado continuam no ar. Para retomar, atualize o cartao aqui: [link]") |
| Ate regularizacao | Motor permanece pausado. Pagamento tenta recobranca no proximo ciclo se cliente regularizar. |
| Regularizacao (qualquer dia) | Cliente atualiza cartao → gateway cobra → Pagamento emite `motor.retomar_apos_regularizacao` + notifica cliente ("Motor retomado. Proxima publicacao em algumas horas.") |

---

## Casos de erro

1. **Webhook nao chega.** Cron diario consulta gateway diretamente para compras e subscriptions com status inconsistente e sincroniza.
2. **Cartao expirado.** Identificar razao (`card_expired`) e enviar notificacao especifica pedindo atualizacao antes da data de vencimento (lead time).
3. **Chargeback (cliente contesta).** Pausar motor imediatamente, notificar equipe, preparar evidencias (checkout assinado, artigos publicados, comunicacao registrada). Cancelar subscription da infra se aplicavel.
4. **Reembolso dentro do periodo de 14 dias** ([[SLAs e Garantias]]): processar no gateway + cancelar parcelas restantes da implementacao + cancelar subscription da infra + marcar conta como `refunded`.
5. **Pagamento em moeda diferente**: Stripe/Asaas convertem; Pagamento informa valor correto na moeda do cliente nas notificacoes.
6. **Cliente quer cancelar so a infra (manter blog no ar com motor pausado).** Suportado — cancela subscription mas nao refunda a implementacao. Conta fica em `motor_paused` indefinidamente. Notificar cliente que pode reativar a qualquer momento cadastrando novo cartao.

---

## Fallback

- **Gateway API fora**: enfileirar acoes em BullMQ. Nenhum pagamento e perdido — status fica pendente no gateway, sincroniza quando API voltar.
- **E-mail nao entregue**: fallback para WhatsApp. Se ambos falham, alerta Slack.
- **WhatsApp API falha**: usar so e-mail, duplicar no dia seguinte.

---

## Dependencias

- **Depende de**: [[Orquestrador]], Stripe API (ou Asaas), provedor de e-mail, WhatsApp API.
- **Quem depende**:
  - [[Onboarding Automatico]] — precisa de `compra.confirmada` para iniciar.
  - [[Agente Redator]] / [[Agente Publicador]] — nao executam quando motor esta em `motor_paused`.
  - [[Agente Suporte]] — recebe duvidas de pagamento (cobrancas, inadimplencia, regularizacao).
  - Equipe financeira — recebe relatorios.
- **Referencia**: [[Oferta Comercial]], [[SLAs e Garantias]], [[Entidades e Schema - Fase 1 (Onboarding)]].

---

## Exemplo de execucao

### Cenario 1: cliente compra a vista (R$ 2.500 Pix)

```
1. [14:00] Cliente finaliza checkout.
2. [14:00] Gateway dispara webhook `checkout.session.completed`.
3. [14:00] Pagamento recebe.
4. [14:01] Pagamento:
   - confirma compra no PostgreSQL (tabela `compras`, status `paid_in_full`)
   - cria registro em `assinaturas_infra` (status `pending_start`, ativacao agendada para D+30)
   - emite `compra.confirmada` e `compra.quitada`
5. [14:01] Orquestrador:
   - cria projeto no Supabase
   - libera dashboard
   - dispara e-mail de boas-vindas
6. [14:01] Pagamento envia WhatsApp:
   "Pagamento confirmado! Seu blog entra no ar em ate 7 dias. 
    A partir do mes 2, sua infra mensal (R$ 300) sera cobrada no cartao cadastrado.
    Dashboard: [link]"

# D+30 (mes 2):
1. [00:00 D+30] Cron mensal detecta cliente que completou mes 1.
2. [00:05] Pagamento ativa subscription no gateway (R$ 300/mes).
3. [00:06] Emite `infra.assinatura_iniciada`.
4. [D+30, todo dia 30 subsequente] Gateway cobra → `invoice.payment_succeeded` → Pagamento confirma.
```

### Cenario 2: cliente parcelado 12x (R$ 3.000 = 12 × R$ 250)

```
1. Cliente finaliza checkout com 12 parcelas no cartao.
2. Gateway cobra primeira parcela e dispara `checkout.session.completed` + primeira `invoice.payment_succeeded`.
3. Pagamento confirma primeira parcela (parcela 1 de 12, valor R$ 250) + emite `compra.confirmada` + cria `assinaturas_infra` em `pending_start`.
4. Parcelas 2-12 cobradas automaticamente pelo gateway nos meses seguintes.
5. Mes 2: infra mensal ativa em paralelo (cliente paga parcela + infra em paralelo ate mes 12).
6. Mes 12: 12a parcela paga → `compra.quitada` (implementacao finalizada). Infra continua normalmente.
```

### Cenario 3: falha na infra mensal → motor pausa

```
1. Dia 30 do mes 5 do cliente: Gateway tenta cobrar R$ 300. Falha (saldo insuficiente).
2. Webhook `invoice.payment_failed` chega.
3. Pagamento emite `infra.cobranca_falhou` (tentativa 1) + envia WhatsApp amigavel.
4. [D+3] Gateway retry automatico. Falha.
5. Pagamento emite `infra.cobranca_falhou` (tentativa 2) + lembrete.
6. [D+7] Gateway retry final. Falha.
7. Pagamento emite `infra.cobranca_falhou` (tentativa 3) + aviso critico.
8. [D+8] Pagamento emite `motor.pausar_por_inadimplencia`.
9. Orquestrador → marca organizacao como `motor_paused`.
10. [D+8] Pagamento envia WhatsApp: "Motor pausado. Blog e conteudo continuam no ar. 
    Atualize o cartao para retomar: [link]".

# D+15 (cliente atualiza cartao):
1. Gateway cobra com sucesso.
2. Pagamento emite `motor.retomar_apos_regularizacao`.
3. Orquestrador → marca organizacao como `live_active`.
4. Agente Publicador volta a publicar no proximo ciclo.
5. Pagamento envia WhatsApp: "Motor retomado. Proxima publicacao em algumas horas."
```

---

## Custo estimado

| Componente | Custo |
|---|---|
| Claude Sonnet (personalizar mensagens, ~1k tokens/evento) | ~$0,003 por evento |
| Stripe API | Gratuito (taxas sao sobre transacao: ~4,99% + R$ 0,39 por parcela cartao; ~3,99% em subscription) |
| Asaas API | Alternativa com taxas menores para Pix |
| E-mail (Resend) | ~$0,001/e-mail |
| WhatsApp Business | ~$0,05/template |
| **Total por evento** | **~$0,05-0,10** |
| **Total por cliente/ano (ciclo completo — implementacao 12x + 11 cobrancas de infra + retries medios)** | **~$2-4** |

Observacao: taxa de gateway sobre a infra mensal e recorrente (~R$ 10-15/mes por cliente) e repassada no custo operacional calculado em [[Modelo de Negocio]].

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 5, 7 + [[Decision Log - 2026-04-23 - Infra Mensal]] — ultima verificacao 2026-04-23.*
