---
tipo: operacao
area: Negocio
tags: [operacao, sla, garantias, qualidade, uptime]
atualizado: 2026-04-23
---

# SLAs e Garantias

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]] secoes 5, 7 e 8. Este arquivo formaliza as promessas operacionais da buscou.ai ao cliente que comprou a tecnologia.

Relacionado: [[Oferta Comercial]] | [[Jornada do Cliente]] | [[Time to Value]] | [[Fluxo Operacional Completo]]

---

## SLA unico (nao ha tiers)

A oferta e unica — implementacao (R$ 2.500 a vista ou R$ 3.000 em 12x) + infra mensal (R$ 300/mes a partir do mes 2). Todo cliente com infra ativa recebe os mesmos compromissos:

| SLA | Compromisso |
|---|---|
| Blog no ar (ativacao) | Ate 7 dias apos pagamento da implementacao confirmado |
| Primeiros sinais (indexacao + impressoes) | Ate 30 dias |
| Conteudos publicados | 90 artigos/mes (media 3/dia, ~720K caracteres) — **enquanto infra mensal estiver ativa** |
| Tamanho de cada artigo | 800-1.200 palavras |
| Pesquisa de keyword | Continua (por cluster) |
| Revisao de estrategia | Mensal automatica |
| Relatorio mensal | Automatico no dashboard |
| Monitoramento | Diario (ranking, trafego, AI Overviews) |
| Suporte IA | 24/7, resposta imediata (< 30s) enquanto infra ativa |
| Suporte humano | SLA 24h (questoes nao criticas); 4h (blog fora do ar) |
| Uptime dashboard + motor | >= 99% (meta 99.9%) |
| Cobranca da infra | Smart retry em falha (D+0/D+3/D+7); 3 falhas consecutivas pausam o motor |
| Politica de pausa | Blog e conteudo ja publicado permanecem no ar indefinidamente em `motor_paused`; motor retoma ao regularizar |

---

## Garantia de qualidade do conteudo

Cada artigo passa pelo [[Agente Revisor]] que avalia em 6 dimensoes (score 0-100):

| Dimensao | Peso | Criterio |
|---|---|---|
| SEO | 25% | Title, meta, H1-H3, keyword density, internal linking |
| Legibilidade | 20% | Flesch-Kincaid PT-BR, paragrafos curtos, frases claras |
| Originalidade | 20% | Sem copia direta, abordagem unica vs top 10 SERP |
| Otimizacao AIO | 15% | Estrutura para AI Overviews (listas, definicoes, answer-first) |
| Precisao factual | 10% | Dados verificaveis, sem alucinacao |
| Aderencia ao tom | 10% | Consistencia com tom definido no onboarding |

**Score minimo para publicacao: 75/100.** Abaixo disso, artigo e reescrito automaticamente (max 2 tentativas). Apos 2 rejeicoes, escalacao para humano.

**Garantia ao cliente:** se considerar que um conteudo publicado esta abaixo do padrao, pode solicitar reescrita gratuita. Sem limite de solicitacoes por motivo de qualidade dentro do escopo canonico (tom, precisao, keyword). Pedidos fora do escopo (ex: "quero outro assunto") entram no calendario do mes seguinte.

---

## Uptime e performance

### Dashboard e motor (Next.js + Vercel + Supabase)
- Uptime mensal >= 99% (meta 99.9% = max 43min de downtime/mes).
- Health check a cada 60s via Supabase Edge Functions.
- Restart automatico em < 5 min.
- Status page publica.

### Agentes IA (Claude Agent SDK)
- SLA de processamento: jobs nao devem ficar em `QUEUED` por mais de 1h.
- Fallback para fila manual se agente indisponivel > 15 min.

### Monitoramento
- UptimeRobot ou BetterStack (check a cada 1 min).
- Alertas para admin via Slack/WhatsApp em caso de downtime.

---

## Suporte — escalacao

```
Nivel 1: [Agente Suporte] IA — resposta imediata (< 30s), 24/7
    ↓ (se nao resolve em 3 mensagens ou cliente pede humano)
Nivel 2: Humano — SLA 24h (questoes nao criticas)
    ↓ (se problema tecnico critico: blog fora do ar, perda de dados)
Nivel 3: Especialista/fundador — SLA 4h
```

### Tempos de resposta

| Urgencia | SLA |
|---|---|
| Critico (blog fora do ar, motor parado) | 4h |
| Alto (funcionalidade comprometida) | 12h |
| Medio (duvida operacional, ajuste de tom) | 24h |
| Baixo (sugestao, feedback) | 48h |

---

## Politica de reembolso

### Primeiros 14 dias
- Reembolso integral da implementacao se menos de 10 artigos foram publicados, independente de justificativa.
- Subscription da infra mensal e cancelada automaticamente (mes 1 estava incluso, nao ha cobranca de infra nesse periodo).
- Processado em 5-7 dias uteis via o mesmo metodo de pagamento.

### Apos 14 dias
- Sem reembolso padrao da implementacao (servico ja foi prestado — os artigos publicados permanecem no blog do cliente, sao propriedade dele).
- Cliente pode cancelar a **infra mensal a qualquer momento** — motor pausa, blog fica no ar. Nao ha reembolso de infra ja paga (e custo operacional ja consumido).
- Excecao: se SLA de ativacao (7 dias) ou de primeiros sinais (30 dias) nao for cumprido, reembolso automatico de 50% da implementacao + isencao de 3 meses de infra (a escolha do cliente).

### Parcelamento 12x da implementacao
- Clientes no parcelado que pedirem reembolso nos primeiros 14 dias: cancelamento das parcelas restantes + reembolso do valor ja pago proporcional aos artigos nao publicados.
- Clientes que pararem de pagar parcelas da implementacao no meio do ciclo (inadimplencia em parcela): apos 30 dias em aberto e falha de retry, caso vira dunning humano. **Motor nao pausa** por parcela de implementacao em aberto — a implementacao ja foi entregue, parcelas sao compromisso do cliente com o gateway/banco. Motor pausa apenas por falha de infra mensal.

### Inadimplencia da infra mensal
- Smart retry em D+0/D+3/D+7.
- Apos 3 falhas, motor pausa automaticamente. Conteudo ja publicado fica no ar.
- Cliente regulariza → motor retoma. Sem penalidade, sem fidelidade.

---

## Compensacao por descumprimento de SLA

### Ativacao (7 dias)
- Ate 7 dias: SLA cumprido.
- 8-14 dias: extensao de 30 dias adicionais no motor sem custo.
- 15+ dias: reembolso automatico de 50% OU 90 dias adicionais de motor sem custo (a escolha do cliente).

### Volume de conteudos (90/mes)
- Entrega >= 90: SLA cumprido.
- Entrega 80-89: artigos faltantes produzidos no mes seguinte (rollover).
- Entrega < 80: rollover + credito equivalente ao valor do numero de artigos faltantes.

### Uptime
- < 99%: extensao de 7 dias de motor sem custo.
- < 95%: extensao de 30 dias + call de explicacao com humano.
- < 90%: extensao de 90 dias + reembolso de 25% do valor pago.

### Suporte
- Resposta humana > SLA x2: pedido de desculpas formal + extensao de 7 dias no motor.

---

## Transparencia dos SLAs

### No dashboard do cliente
- Secao "Meus SLAs" com: uptime do mes, artigos entregues vs 90, tickets abertos vs resolvidos, tempo medio de resposta.
- Historico de 12 meses.

### No relatorio mensal
- Secao dedicada ao cumprimento de SLA.
- Destaque quando superado (reforco positivo).
- Nota explicativa quando descumprido (transparencia).

### Interno
- Dashboard admin com SLA compliance rate consolidado.
- Meta interna: > 98% de cumprimento.
- Revisao trimestral.

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 5, 7 e 8 — ultima verificacao 2026-04-23.*
