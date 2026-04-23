---
tipo: produto
area: Resiliencia
tags: [produto, falhas, erros, resiliencia, recovery]
atualizado: 2026-04-23
---

# Tratamento de Falhas

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. Em um sistema autonomo, falhas sao parte do design. Cada modo de falha tem deteccao automatica, resolucao automatica e escalacao definida. Se o sistema nao sabe o que fazer com um erro, ele e fragil — nao autonomo.

Relacionado: [[Requisitos Produto Autonomo]] | [[Failure Modes]] | [[Arquitetura de Agentes]] | [[Arquitetura do Sistema]] | [[Orquestrador]]

---

## Principios de resiliencia

1. **Fail gracefully**: nunca crashar silenciosamente. Todo erro gera log estruturado (JSON) com timestamp, agente, tipo, contexto e resolucao aplicada.
2. **Retry before escalate**: tentar resolver sozinho 3x antes de envolver humano.
3. **Degrade, nao pare**: se uma feature falha, o resto continua. Monitoramento caindo nao impede publicacao.
4. **Notify proactively**: o cliente descobre problemas pelo nosso alerta, nunca pela propria observacao.
5. **Learn from failures**: cada falha alimenta o dataset para prevenir recorrencia.

---

## Catalogo de falhas

### 1. Falha de API LLM (Claude)

| Aspecto | Detalhe |
|---|---|
| Deteccao | HTTP 429 (rate limit), 500/503 (server error), timeout > 120s |
| Resolucao automatica | Retry 3x com backoff exponencial (1s, 2s, 4s). Rate limit: aguardar `retry-after` |
| Fallback | Opus indisponivel → Sonnet. Sonnet indisponivel → enfileirar |
| Escalacao | 3 retries falhados → Slack. Indisponibilidade > 30 min → PagerDuty |
| SLA | Job reenfileirado em < 5 min. Sem perda de dados (estado em PostgreSQL) |
| Impacto no cliente | Atraso na producao. Dashboard mostra "processando" com ETA |

### 2. Falha de API SEO (Ahrefs, DataForSEO, GSC)

| Aspecto | Detalhe |
|---|---|
| Deteccao | HTTP error, timeout, dados inconsistentes |
| Resolucao automatica | Retry 3x. Ahrefs falha → DataForSEO. Ambos falham → cache dos ultimos dados |
| Fallback | [[Agente Pesquisador]] opera com cache marcado "dados de D-X". GSC como fonte primaria gratuita |
| Escalacao | Cache > 7 dias → alerta admin |
| SLA | Pesquisa completada com dados de ate 7 dias. Sem bloqueio no pipeline |

### 3. Conteudo abaixo do threshold de qualidade

| Aspecto | Detalhe |
|---|---|
| Deteccao | [[Agente Revisor]] score < 75/100 |
| Resolucao automatica | Revisor envia feedback especifico ao Redator. Reescrita (max 2 tentativas) |
| Fallback | Apos 2 reescritas sem threshold → job marcado `needs_human_review` |
| Escalacao | Humano revisa + calibra prompts. Taxa de rejeicao > 30%/mes → recalibrar |
| SLA | Conteudo em ate 24h adicionais (vs 6h normal). Calendario tem buffer |

### 4. Falha de publicacao no CMS

| Aspecto | Detalhe |
|---|---|
| Deteccao | [[Agente Publicador]] recebe HTTP error do WordPress/CMS, timeout ou credenciais invalidas |
| Resolucao automatica | Retry 3x em intervalos de 10 min. Re-autenticar se necessario |
| Fallback | Conteudo salvo em `content-drafts`. [[Agente Suporte]] notifica cliente |
| Escalacao | CMS indisponivel > 24h → humano contata cliente |
| SLA | Publicacao em ate 4h apos aprovacao (vs 1h normal) |

### 5. Falha de pagamento (gateway)

| Aspecto | Detalhe |
|---|---|
| Deteccao | Webhook `payment_intent.payment_failed` (primeiro pagamento) ou `invoice.payment_failed` (parcela 2-12) |
| Resolucao automatica | Gateway faz smart retry (D+1, D+3, D+5). [[Agente Pagamento]] notifica via WhatsApp + e-mail a cada tentativa |
| Fallback | Oferecer Pix como alternativa. **Nao interrompe servico** (a compra foi unica — ja pago cobre custo operacional) |
| Escalacao | Apos 30 dias em aberto → dunning humano |
| SLA | Cliente notificado em < 10 min apos falha |

**Importante:** nao e cobranca recorrente. Nao existe "cancelamento por inadimplencia" automatico. A compra foi unica e o motor segue publicando enquanto o gateway tenta recuperar a parcela.

### 6. Crash de agente

| Aspecto | Detalhe |
|---|---|
| Deteccao | [[Orquestrador]] monitora heartbeat a cada 60s. Timeout sem resposta. Exception nao tratada |
| Resolucao automatica | 1) Mata processo travado. 2) Cooldown 30s. 3) Auto-restart. 4) Reagenda job em andamento |
| Fallback | Auto-restart falha 2x → agente `UNHEALTHY`. Jobs redirecionados para fila de espera |
| Escalacao | UNHEALTHY > 15 min → PagerDuty para dev. Jobs dependentes pausados |
| SLA | Recovery em < 2 min (90% dos casos). Sem perda de estado (checkpoint em PostgreSQL) |

### 7. Corrupcao de dados

| Aspecto | Detalhe |
|---|---|
| Deteccao | Constraints violados, checksums inconsistentes, duplicatas por rotina diaria |
| Resolucao automatica | Point-in-time recovery do PostgreSQL (Supabase backup continuo) |
| Fallback | Backup diario em `backups` bucket do Supabase Storage |
| Escalacao | Qualquer corrupcao = alerta imediato PagerDuty. Investigacao root cause obrigatoria |
| SLA | Recovery em < 1h. RPO < 5 min |

### 8. Rate limit de API externa

| Aspecto | Detalhe |
|---|---|
| Deteccao | HTTP 429 com `retry-after`. Counter interno de requests/min por API |
| Resolucao automatica | Queue com delay respeitando `retry-after`. Distribuir requests ao longo do dia |
| Fallback | Priorizar jobs mais antigos (FIFO) dentro da fila |
| Escalacao | Rate limit impede operacao > 4h → considerar upgrade de plano da API |
| SLA | Nenhum job descartado. Atraso maximo de 4h |

### 9. Site do cliente fora do ar

| Aspecto | Detalhe |
|---|---|
| Deteccao | [[Agente Monitor]] faz health check do site a cada 6h. HTTP error ou timeout > 10s |
| Resolucao automatica | Pausar publicacao/distribuicao para o site afetado. Continuar pesquisa e redacao |
| Fallback | Conteudo pronto acumulado em fila. Publicacao em batch quando site voltar |
| Escalacao | [[Agente Suporte]] notifica: "seu site esta indisponivel — pausamos publicacoes ate normalizar" |
| SLA | Deteccao em < 6h. Notificacao ao cliente em < 1h apos deteccao |

---

## Matriz de severidade

| Severidade | Descricao | Tempo de resposta | Canal de alerta | Exemplos |
|---|---|---|---|---|
| **P0 — Critica** | Sistema inteiro parado ou dados corrompidos | < 15 min | PagerDuty + telefone | Crash Orquestrador, corrupcao DB |
| **P1 — Alta** | Feature principal indisponivel para multiplos clientes | < 1h | PagerDuty + Slack | API Claude fora, webhook gateway falhando |
| **P2 — Media** | Feature degradada ou um cliente afetado | < 4h | Slack + e-mail | CMS de um cliente fora, rate limit |
| **P3 — Baixa** | Inconveniencia menor, workaround disponivel | < 24h | Slack | Distribuicao em uma plataforma falhando |

---

## Log estruturado de erros

Cada erro grava em `error_logs`:

```json
{
  "id": "uuid",
  "timestamp": "2026-04-23T14:30:00Z",
  "agent": "redator",
  "job_id": "uuid",
  "org_id": "uuid",
  "severity": "P2",
  "type": "content_quality_below_threshold",
  "details": "SEO score 68/100 apos 2a tentativa",
  "resolution": "escalated_to_human",
  "resolved_at": null,
  "root_cause": null
}
```

---

## Notas relacionadas

- [[Requisitos Produto Autonomo]]
- [[Failure Modes]] — falhas sistemicas (nao tecnicas)
- [[O que Automatizar vs Humano]]
- [[Arquitetura de Agentes]]
- [[Arquitetura do Sistema]]
- [[Orquestrador]]
- [[Agente Monitor]]
- [[Agente Pagamento]]
- [[Agente Suporte]]

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 7, 8 — ultima verificacao 2026-04-23.*
