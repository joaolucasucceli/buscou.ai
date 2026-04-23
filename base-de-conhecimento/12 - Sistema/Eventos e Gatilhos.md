---
tipo: sistema
area: Arquitetura
tags: [sistema, eventos, gatilhos, triggers, webhooks]
atualizado: 2026-04-22
---

# Eventos e Gatilhos

Arquitetura orientada a eventos. Cada mudanca significativa no sistema emite um evento que pode disparar uma ou mais acoes. Eventos sao processados via BullMQ (async) ou Supabase Realtime (sync para UI).

---

## Tabela Completa de Eventos

### Eventos de Organizacao

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `org.created` | Stripe `checkout.session.completed` | Cria organizacao, user admin, projeto inicial | Sistema |
| `org.trial_started` | Registro sem pagamento | Inicia timer de 14 dias, envia welcome email | Sistema |
| `org.trial_expiring` | 3 dias antes do trial_ends_at | Envia lembrete por email e WhatsApp | [[Agente SDR]] |
| `org.trial_expired` | trial_ends_at atingido sem conversao | Muda status para churned, pausa projetos | Sistema |
| `org.plan_upgraded` | Stripe `customer.subscription.updated` | Atualiza limites (max_projects, max_content) | Sistema |
| `org.plan_downgraded` | Stripe `customer.subscription.updated` | Ajusta limites, alerta se uso excede novo plano | Sistema |

### Eventos de Projeto

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `project.created` | Admin cria projeto no dashboard | Inicia wizard de configuracao | Sistema |
| `project.configured` | Wizard concluido (domain, GSC, nicho) | Enfileira job de estrategia de keywords | [[Agente Orquestrador]] |
| `project.paused` | Admin pausa ou org em past_due | Para todos os agent_jobs pendentes do projeto | Sistema |
| `project.reactivated` | Admin reativa ou org volta a active | Re-enfileira jobs que estavam pausados | [[Agente Orquestrador]] |
| `project.completed` | Todos os clusters em status complete | Muda para monitoramento continuo apenas | Sistema |

### Eventos de Keywords e Estrategia

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `keywords.researched` | [[Agente Estrategista]] completa pesquisa | Cria clusters, prioriza keywords, enfileira briefs | [[Agente Orquestrador]] |
| `keywords.cluster_created` | Cluster definido com pillar + supports | Enfileira pesquisa de concorrentes para o cluster | [[Agente Orquestrador]] |
| `keywords.position_changed` | [[Agente Monitor]] detecta mudanca >= 5 posicoes | Registra em keyword_history, atualiza dashboard | Sistema |
| `keywords.position_dropped` | Monitor detecta queda > 10 posicoes | Alerta admin, enfileira analise de causa | [[Agente Orquestrador]] |

### Eventos de Conteudo (Pipeline Principal)

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `content.queued` | Orquestrador agenda nova peca | Cria content_piece com status queued | [[Agente Orquestrador]] |
| `content.research_started` | Worker pega job de pesquisa | Muda status para researching | [[Agente Pesquisador]] |
| `content.brief_ready` | Pesquisador completa pesquisa | Cria content_brief, muda para briefed, enfileira escrita | [[Agente Orquestrador]] |
| `content.writing_started` | Worker pega job de escrita | Muda status para writing | [[Agente Redator]] |
| `content.written` | Redator completa escrita | Muda para written, calcula seo_score, enfileira revisao | [[Agente Orquestrador]] |
| `content.review_started` | Worker pega job de revisao | Muda status para reviewing | [[Agente Revisor]] |
| `content.approved` | Revisor aprova conteudo | Muda para approved, enfileira publicacao | [[Agente Orquestrador]] |
| `content.revision_needed` | Revisor rejeita conteudo | Muda para revision_needed, re-enfileira escrita com feedback | [[Agente Orquestrador]] |
| `content.revision_escalated` | revision_count >= 3 | Notifica admin para revisao humana | Sistema |
| `content.publishing` | Worker pega job de publicacao | Publica no WordPress via REST API | [[Agente Publicador]] |
| `content.published` | Publicacao confirmada (wp_post_id recebido) | Seta published_at, enfileira distribuicao e indexacao | [[Agente Orquestrador]] |
| `content.distributed` | Publicacao em redes sociais concluida | Registra canais, atualiza dashboard | [[Agente Distribuidor]] |

### Eventos de Monitoramento (SEO + AIO)

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `ranking.checked` | Cron diario (06:00 UTC) | Consulta GSC + Ahrefs, atualiza posicoes | [[Agente Monitor]] |
| `ranking.dropped` | Monitor detecta queda significativa | Enfileira analise e possivel otimizacao do conteudo | [[Agente Orquestrador]] |
| `ranking.improved` | Monitor detecta melhora > 10 posicoes | Registra, atualiza best_position | Sistema |
| `citation.checked` | Cron semanal (seg 08:00 UTC) | Consulta Otterly + LLMrefs | [[Agente Monitor]] |
| `citation.gained` | Monitor detecta nova citacao em IA | Registra em ai_citations, notifica cliente por WhatsApp | Sistema |
| `citation.lost` | Monitor detecta citacao removida | Registra, enfileira analise de causa | [[Agente Orquestrador]] |
| `citation.competitor_gained` | Concorrente ganhou citacao que nao tinhamos | Registra, sugere otimizacao | [[Agente Monitor]] |

### Eventos de Pagamento (Stripe Webhooks)

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `payment.succeeded` | Stripe `invoice.paid` | Registra invoice, atualiza org status | Sistema |
| `payment.failed` | Stripe `invoice.payment_failed` | Muda org para past_due, inicia cadencia de cobranca | [[Agente Cobranca]] |
| `payment.recovered` | Stripe `invoice.paid` apos falha | Muda org para active, reativa servicos | Sistema |
| `payment.refunded` | Stripe `charge.refunded` | Registra, notifica admin | Sistema |
| `subscription.cancelled` | Stripe `customer.subscription.deleted` | Muda org para churned, agenda desativacao | Sistema |

### Eventos de Suporte

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `support.ticket_created` | Cliente abre ticket (dashboard ou WhatsApp) | Tenta resolver automaticamente via RAG | [[Agente Suporte]] |
| `support.auto_resolved` | Agente Suporte resolve com confianca alta | Fecha ticket, envia resposta ao cliente | [[Agente Suporte]] |
| `support.escalated` | Agente Suporte nao consegue resolver | Notifica equipe humana via WhatsApp/email | Sistema |
| `support.human_resolved` | Humano resolve e fecha ticket | Adiciona resolucao a knowledge base para futuro | Sistema |

### Eventos de Relatorio

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `report.due` | Cron mensal (dia 1, 09:00 UTC) | Gera relatorio para todos os projetos ativos | Sistema |
| `report.generated` | Relatorio PDF pronto | Armazena em Supabase Storage, enfileira envio | Sistema |
| `report.sent` | Relatorio enviado por email + WhatsApp | Atualiza sent_at, registra canais | Sistema |
| `report.viewed` | Cliente acessa relatorio no dashboard | Registra analytics de engajamento | Sistema |

---

## Fluxo de Processamento de Eventos

```
Evento emitido
    │
    ▼
┌─────────────────────┐     ┌──────────────────────┐
│ Supabase Realtime   │     │ BullMQ (Redis)       │
│ (UI update sync)    │     │ (async processing)   │
│                     │     │                      │
│ Dashboard recebe    │     │ Worker pega evento   │
│ via WebSocket       │     │ e executa acao       │
└─────────────────────┘     └──────────────────────┘
```

**Dual dispatch**: Eventos que atualizam a UI (ex: `content.published`) sao enviados tanto para Supabase Realtime (atualizar dashboard em tempo real) quanto para BullMQ (processar proxima etapa do pipeline).

---

## Cron Jobs Periodicos

| Job | Frequencia | Horario | Acao |
|---|---|---|---|
| `ranking.check` | Diario | 06:00 UTC | Coleta posicoes de todas as keywords ativas |
| `citation.check` | Semanal | Seg 08:00 UTC | Verifica citacoes em plataformas de IA |
| `report.generate` | Mensal | Dia 1, 09:00 UTC | Gera relatorios para projetos ativos |
| `trial.check` | Diario | 10:00 UTC | Verifica trials expirando em 3 dias |
| `usage.reset` | Mensal | Dia 1, 00:00 UTC | Reseta contadores de uso mensal |
| `cleanup.old_jobs` | Semanal | Dom 02:00 UTC | Arquiva agent_jobs com mais de 90 dias |

Ver [[Estados e Maquina de Estado]] para as transicoes disparadas por cada evento.
Ver [[Modulos]] para os endpoints que emitem esses eventos.
