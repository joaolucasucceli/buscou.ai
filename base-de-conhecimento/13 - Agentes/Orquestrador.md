---
tipo: agente
area: Sistema
tags: [agente, orquestrador, coordenacao, state-machine]
atualizado: 2026-04-23
---

# Orquestrador

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. O Orquestrador e o cerebro central do sistema multi-agente da buscou.ai. Recebe todos os jobs, decide qual dos 11 agentes acionar, gerencia filas, controla estado via state machine, executa retries, escalona para humano e reporta status.

Relacionado: [[Arquitetura de Agentes]] | [[Inputs dos Agentes]] | [[Objeto Business Context]] | [[Jobs]] | [[Stack Tecnologica]]

---

## Funcao

Ponto unico de entrada de jobs. Coordena os 11 agentes da V1:

- **6 core (pipeline de producao):** Pesquisador → Estrategista → Redator → Revisor → Visual → Publicador (depois Distribuidor + Monitor).
- **5 complementares:** Distribuidor (publicacao pos-publish), Monitor (continuo), Suporte (transversal), Prospeccao (outbound paralelo), Pagamento (webhooks do gateway — dois fluxos: implementacao + infra mensal, incluindo pausar/retomar motor conforme status da infra).

Agentes nao se comunicam diretamente — toda coordenacao passa aqui via MCP.

---

## Input

- **Job request (JSON)**: tipo do job (`content_pipeline`, `support_ticket`, `payment_event`, `prospect_campaign`), parametros, prioridade, `cliente_id`.
- **Webhooks externos**: gateway de pagamento (Stripe/Asaas), WhatsApp Business, Google Search Console.
- **Eventos internos**: conclusao de tarefa de um agente, falha, timeout.
- **Cron triggers**: calendario editorial diario, monitoramento, campanhas de prospeccao.

## Output

- **Despacho de tarefa**: mensagem MCP para o agente alvo com parametros + timeout + callback.
- **Status updates**: estado do job (`QUEUED`, `IN_PROGRESS`, `WAITING_HUMAN`, `COMPLETED`, `FAILED`) persistido em PostgreSQL.
- **Relatorios agregados**: para dashboard admin (jobs/dia, taxa de sucesso, tempo medio, custo).
- **Alertas**: Slack/PagerDuty para falhas criticas.

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| BullMQ (Node.js) | Fila de jobs com prioridade, delayed jobs, rate limiting |
| PostgreSQL | Estado duravel de cada job + historico |
| Redis | Cache de estado, locks distribuidos, pub/sub |
| Claude Sonnet 4 | Decisoes de roteamento quando condicional e complexa |
| Slack API | Notificacoes para equipe |
| PagerDuty API | Alertas criticos (agente down, pipeline bloqueado) |
| MCP Client | Comunicacao com todos os 11 agentes |

---

## Gatilho

- **API REST** `POST /jobs` — dashboard admin, cron, webhooks.
- **Webhooks** — gateway, WhatsApp, GSC.
- **Cron** — calendario (diario 8h), monitoramento (diario 6h), retries de parcela (diario 10h), prospeccao (diario conforme batch).
- **Evento interno** — agente completa tarefa e retorna ao Orquestrador.

---

## Criterios de sucesso

- **Entrega de jobs**: > 99% chegam ao agente correto em < 5s.
- **Conclusao**: > 95% dos jobs completam sem humano.
- **Deteccao de falha**: < 10s para identificar agente problematico.
- **Zero jobs perdidos**: todo job persistido em PostgreSQL antes do despacho.
- **Idempotencia**: reprocessamento gera mesmo resultado (dedup por `job_id`).

---

## Casos de erro

1. **Agente alvo indisponivel**: health check falha → marca como UNHEALTHY, enfileira job para retry.
2. **Timeout de execucao**: agente nao retorna em tempo → job volta para fila com `retry_count += 1`.
3. **Loop infinito no pipeline**: Revisor rejeita Redator > 3 ciclos → interrompe e escala para humano.
4. **Fila sobrecarregada** (>100 jobs pendentes): ativa rate limiting, prioriza P0/P1, adia P2/P3.
5. **PostgreSQL indisponivel**: grava em Redis (WAL temporario) e reconcilia ao reconectar.

## Fallback

- **Agente indisponivel** → retry exponencial (1s, 2s, 4s, 8s). Max 3 tentativas, depois FAILED + Slack.
- **Banco falha** → Redis como WAL temporario.
- **Orquestrador cai** → roda em AWS ECS com auto-restart. Jobs na fila BullMQ sobrevivem.
- **Decisao ambigua de roteamento** (confianca < 0,8) → fila de triagem humana.

---

## Dependencias

- **Depende de**: PostgreSQL, Redis, BullMQ, Claude Sonnet, infra AWS.
- **Quem depende**: TODOS os 11 agentes — o Orquestrador e o unico dispatcher.
- **Referencia**: [[Arquitetura de Agentes]] (pivotal).

---

## Exemplo de execucao

**Cenario:** calendario dispara artigo "Harmonizacao facial em Vitoria-ES" para cliente `clinica-x`.

```
1. [08:00] Cron → Orquestrador:
   { tipo: "content_pipeline", keyword: "harmonizacao facial vitoria es", 
     cliente: "clinica-x", prioridade: "P1" }

2. [08:00] Orquestrador persiste job no PostgreSQL (estado: QUEUED).

3. [08:01] Despacha para [[Agente Pesquisador]] via MCP:
   { action: "research_topic", params: { keyword, localidade: "Vitoria-ES", 
     nicho: "estetica" } }

4. [08:06] Pesquisador retorna briefing → estado IN_PROGRESS.

5. [08:06] Despacha para [[Agente Estrategista]]:
   { action: "plan_article", params: { briefing_id: "br_123" } }

6. [08:10] Estrategista retorna brief + tom + estrutura.

7. [08:10] Despacha para [[Agente Redator]].

8. [08:30] Redator retorna artigo 1.050 palavras → despacha para [[Agente Revisor]].

9. [08:35] Revisor aprova (SEO: 82, AIO: 80, score: 81) → despacha para [[Agente Visual]].

10. [08:37] Visual anexa capa + alt text → despacha para [[Agente Publicador]].

11. [08:39] Publicador confirma URL publicada → despacha para [[Agente Distribuidor]].

12. [08:44] Distribuidor confirma sitemap + GSC ping (V1) / posts em 3 plataformas (V1.2).

13. [08:44] Orquestrador registra [[Agente Monitor]] para tracking continuo.

14. Estado: COMPLETED.
```

**Cenario alternativo — motor pausado por inadimplencia da infra:**

```
1. [D+8 00:00] Cron diario detecta cliente com 3 falhas consecutivas de cobranca da infra.
2. [D+8 00:01] [[Agente Pagamento]] emite evento `motor.pausar_por_inadimplencia` para o Orquestrador.
3. [D+8 00:02] Orquestrador:
   - Atualiza `organizacoes.status` para `motor_paused`.
   - Cancela jobs em QUEUED para esse cliente (content_pipeline).
   - Notifica [[Agente Suporte]] para acionar campanhas de reativacao.
4. Cron de calendario editorial para esse cliente passa a ignorar jobs enquanto status e `motor_paused`.
5. [Regularizacao] Cliente atualiza cartao → Agente Pagamento emite `motor.retomar_apos_regularizacao`.
6. Orquestrador:
   - Atualiza `organizacoes.status` de volta para `live_active`.
   - Proximo ciclo do cron retoma producao normal.
```

**Tempo total**: ~45 minutos. **Custo estimado**: ~$0,85 em API tokens.

---

## Custo estimado

| Componente | Custo |
|---|---|
| Claude Sonnet (roteamento, ~500 tokens/job) | ~$0,02/job |
| Infra (ECS, Postgres, Redis — rateado) | ~$0,01/job |
| **Total por job de roteamento** | **~$0,03** |
| **Pipeline completo** (com custo dos agentes acionados) | **~$0,80-1,20** |

---

## Agentes que o Orquestrador coordena (V1)

1. [[Agente Pesquisador]]
2. [[Agente Estrategista]]
3. [[Agente Redator]]
4. [[Agente Revisor]]
5. [[Agente Visual]]
6. [[Agente Publicador]]
7. [[Agente Distribuidor]]
8. [[Agente Monitor]]
9. [[Agente Suporte]]
10. [[Agente Prospeccao]]
11. [[Agente Pagamento]]

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 7, 8 — ultima verificacao 2026-04-23.*
