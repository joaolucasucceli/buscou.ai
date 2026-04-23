---
tipo: sistema
area: Arquitetura
tags: [sistema, modulos, componentes]
atualizado: 2026-04-22
---

# Modulos do Sistema

O sistema e dividido em 10 modulos independentes, cada um com responsabilidades claras, tabelas proprias e API endpoints definidos. Todos os endpoints sao expostos via Supabase PostgREST (CRUD automatico) ou Edge Functions (logica customizada).

---

## 1. Auth

**Descricao**: Gerencia autenticacao, autorizacao e sessoes de usuarios. Integra com Supabase Auth para login por email/password e magic link. Emite JWTs com claims customizados (role, org_id) usados pelo RLS em todas as tabelas.

**Tabelas principais**: `users`, `user_sessions` (gerenciada pelo Supabase Auth internamente)

**API Endpoints**:
- `POST /auth/signup` — Registro com email + password. Cria user e org (trial).
- `POST /auth/login` — Login. Retorna JWT com claims.
- `POST /auth/magic-link` — Envia magic link por email.
- `GET /auth/me` — Retorna perfil do usuario autenticado.
- `PATCH /auth/me` — Atualiza perfil (name, preferences).

**Dependencias**: Nenhuma (modulo raiz). Todos os outros modulos dependem deste.

---

## 2. Organizations

**Descricao**: Gerencia multi-tenancy. Cada organizacao tem seu plano, configuracoes de billing e limites de uso. Um usuario pertence a uma organizacao. O org_id e a chave principal de isolamento no RLS.

**Tabelas principais**: `organizations`, `org_settings`, `org_usage`

**API Endpoints**:
- `GET /organizations/:id` — Dados da org (com RLS, so propria org).
- `PATCH /organizations/:id` — Atualiza nome, settings.
- `GET /organizations/:id/usage` — Uso atual (content pieces, agent runs, storage).
- `POST /organizations/:id/invite` — Convida membro por email.
- `GET /organizations/:id/members` — Lista membros da org.

**Dependencias**: [[#1. Auth]]

---

## 3. Projects

**Descricao**: Cada organizacao pode ter multiplos projetos (sites de clientes). Um projeto define o dominio, nicho, propriedade do GSC, e configuracoes especificas de SEO/AIO. E a unidade de trabalho dos agentes.

**Tabelas principais**: `projects`, `project_settings`

**API Endpoints**:
- `POST /projects` — Cria projeto novo (dispara onboarding).
- `GET /projects` — Lista projetos da org.
- `GET /projects/:id` — Detalhes do projeto com metricas resumidas.
- `PATCH /projects/:id` — Atualiza configuracoes (nicho, goals, domain).
- `DELETE /projects/:id` — Soft delete (muda status para archived).

**Dependencias**: [[#2. Organizations]]

---

## 4. Keywords

**Descricao**: Tracking de keywords organicas e AIO. Gerencia clusters de keywords (pillar + support), prioridades baseadas em volume/dificuldade, e monitoramento de posicoes. Integra com Ahrefs e GSC para dados.

**Tabelas principais**: `keywords`, `clusters`, `keyword_history`

**API Endpoints**:
- `GET /projects/:id/keywords` — Lista keywords com filtros (cluster, intent, position range).
- `POST /projects/:id/keywords/research` — Dispara job de pesquisa (Agente Estrategista).
- `GET /projects/:id/clusters` — Lista clusters com keywords agrupadas.
- `POST /projects/:id/clusters` — Cria cluster manualmente.
- `GET /projects/:id/keywords/:id/history` — Historico de posicao ao longo do tempo.

**Dependencias**: [[#3. Projects]], [[#6. Agents]] (pesquisa automatizada)

---

## 5. Content

**Descricao**: Pipeline completo de conteudo — do brief ao publicado. Gerencia o ciclo de vida de cada peca de conteudo com maquina de estados. Armazena briefs, rascunhos, conteudo final, scores SEO/AIO.

**Tabelas principais**: `content_pieces`, `content_briefs`, `content_revisions`

**API Endpoints**:
- `GET /projects/:id/content` — Lista content pieces com filtros (status, cluster, date range).
- `GET /content/:id` — Detalhes completos da peca (brief, conteudo, scores, historico).
- `POST /content/:id/approve` — Aprovacao manual (admin). Avanca para publishing.
- `POST /content/:id/reject` — Rejeicao com feedback. Volta para reescrita.
- `GET /content/:id/revisions` — Historico de revisoes com diff.

**Dependencias**: [[#4. Keywords]], [[#6. Agents]] (producao automatizada)

---

## 6. Agents

**Descricao**: Orquestracao dos 11 agentes IA. Gerencia a fila de jobs (BullMQ), execucao, logs, custos e retries. Cada job tem tipo (agent_type), input serializado, output, e metricas de execucao (tokens, custo, duracao).

**Tabelas principais**: `agent_jobs`, `agent_runs`, `agent_configs`

**API Endpoints**:
- `GET /agents/jobs` — Lista jobs com filtros (status, agent_type, project_id).
- `GET /agents/jobs/:id` — Detalhes do job com runs associadas.
- `POST /agents/jobs/:id/retry` — Re-enfileira job falho manualmente.
- `POST /agents/jobs/:id/cancel` — Cancela job pendente ou em execucao.
- `GET /agents/metrics` — Metricas agregadas: custo total, tokens usados, taxa de sucesso por agente.

**Dependencias**: [[#3. Projects]] (jobs sao scoped por projeto)

---

## 7. Analytics

**Descricao**: Coleta, processa e exibe metricas de SEO e AIO. Dashboards com graficos de posicao, trafego organico, citacoes em IA, e tendencias. Dados vem de GSC, GA4, Ahrefs, Otterly e LLMrefs via jobs periodicos.

**Tabelas principais**: `seo_metrics`, `aio_metrics`, `ai_citations`, `traffic_data`

**API Endpoints**:
- `GET /projects/:id/analytics/seo` — Metricas SEO (posicoes, trafego, impressoes) com date range.
- `GET /projects/:id/analytics/aio` — Metricas AIO (citacoes, plataformas, queries).
- `GET /projects/:id/analytics/overview` — Dashboard resumido (KPIs principais).
- `GET /projects/:id/analytics/trends` — Tendencias de crescimento (week-over-week, month-over-month).
- `POST /projects/:id/analytics/refresh` — Forca atualizacao de metricas (rate limited).

**Dependencias**: [[#3. Projects]], [[#6. Agents]] (coleta automatizada)

---

## 8. Billing

**Descricao**: Gerencia assinaturas Stripe, invoices, controle de uso e limites de plano. Recebe webhooks do Stripe para sincronizar status de pagamento. Controla trial, upgrades, downgrades e cancelamentos.

**Tabelas principais**: `invoices`, `subscription_history`, `usage_records`

**API Endpoints**:
- `GET /billing/subscription` — Dados da assinatura atual da org.
- `POST /billing/checkout` — Cria sessao Stripe Checkout para novo plano.
- `POST /billing/portal` — Gera link para Stripe Customer Portal.
- `POST /billing/webhooks/stripe` — Recebe webhooks do Stripe (Edge Function).
- `GET /billing/invoices` — Lista faturas da org.

**Dependencias**: [[#2. Organizations]], Stripe (externo)

---

## 9. Support

**Descricao**: Sistema de tickets e chat para suporte ao cliente. O Agente Suporte tenta resolver automaticamente via RAG sobre a knowledge base. Tickets nao resolvidos sao escalados para humanos. Integra com WhatsApp para comunicacao.

**Tabelas principais**: `support_tickets`, `ticket_messages`, `knowledge_base_articles`

**API Endpoints**:
- `POST /support/tickets` — Abre ticket novo (via dashboard ou WhatsApp).
- `GET /support/tickets` — Lista tickets da org com filtros (status, priority).
- `GET /support/tickets/:id` — Detalhes do ticket com historico de mensagens.
- `POST /support/tickets/:id/messages` — Envia mensagem no ticket.
- `PATCH /support/tickets/:id` — Atualiza status (resolve, escalate, close).

**Dependencias**: [[#2. Organizations]], [[#6. Agents]] (Agente Suporte)

---

## 10. Reporting

**Descricao**: Geracao automatizada de relatorios mensais para clientes. Compila dados de SEO, AIO, conteudo produzido, e recomendacoes. Exporta em PDF e envia por email/WhatsApp. Cron job mensal dispara a geracao.

**Tabelas principais**: `reports`, `report_templates`

**API Endpoints**:
- `GET /projects/:id/reports` — Lista relatorios do projeto.
- `GET /reports/:id` — Detalhes do relatorio com dados completos.
- `GET /reports/:id/pdf` — Download do PDF (Supabase Storage signed URL).
- `POST /projects/:id/reports/generate` — Gera relatorio manualmente (fora do ciclo mensal).
- `POST /reports/:id/send` — Envia relatorio por email e/ou WhatsApp.

**Dependencias**: [[#7. Analytics]], [[#5. Content]], [[#6. Agents]]

---

## Mapa de Dependencias entre Modulos

```
Auth (1)
  └── Organizations (2)
        ├── Projects (3)
        │     ├── Keywords (4) ──→ Agents (6)
        │     ├── Content (5) ──→ Agents (6)
        │     ├── Analytics (7) ──→ Agents (6)
        │     └── Reporting (10) ──→ Analytics (7) + Content (5)
        ├── Billing (8) ──→ Stripe
        └── Support (9) ──→ Agents (6)
```

Ver [[Arquitetura do Sistema]] para a visao de alto nivel.
Ver [[Entidades e Schema]] para o detalhamento das tabelas.
Ver [[Permissoes e Roles]] para as politicas de acesso por modulo.
