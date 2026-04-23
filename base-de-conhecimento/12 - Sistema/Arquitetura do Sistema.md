---
tipo: sistema
area: Arquitetura
tags: [sistema, arquitetura, infra, stack, design]
atualizado: 2026-04-22
---

# Arquitetura do Sistema

## Diagrama Geral (Visao de Alto Nivel)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENTE (Browser)                              │
│                    Dashboard SaaS / Portal Admin                        │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS 15 (Vercel Edge)                             │
│           SSR + API Routes + Static Assets + Middleware                  │
│        Auth check (JWT) │ Rate limiting │ Request validation            │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ REST + Realtime (WebSocket)
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      SUPABASE CLOUD                                     │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐              │
│  │   Auth   │  │ PostgREST│  │  Realtime  │  │ Storage  │              │
│  │  (JWT)   │  │  (API)   │  │  (WS sub)  │  │ (S3-like)│              │
│  └──────────┘  └──────────┘  └───────────┘  └──────────┘              │
│  ┌──────────────────────────────────────────────────────┐              │
│  │            Edge Functions (Deno runtime)              │              │
│  │     Webhooks │ Orchestration │ Business Logic         │              │
│  └──────────────────────────┬───────────────────────────┘              │
│  ┌──────────────────────────┴───────────────────────────┐              │
│  │              PostgreSQL (com RLS)                      │              │
│  │    users │ orgs │ projects │ content │ jobs │ metrics  │              │
│  └──────────────────────────────────────────────────────┘              │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ Job dispatch
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    FILA DE JOBS (BullMQ + Redis)                        │
│           Filas: content │ seo │ agent │ billing │ reports              │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ Consume jobs
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    AGENT WORKERS (Node.js)                               │
│  ┌───────────────────────────────────────────────────────┐              │
│  │           Claude Agent SDK (com MCP)                   │              │
│  │  ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌───────────┐  │              │
│  │  │ Opus 4  │ │ Sonnet 4 │ │Haiku 4.5│ │ Tools MCP │  │              │
│  │  │(cognitv)│ │(operacnl)│ │(simples)│ │(ext. APIs)│  │              │
│  │  └─────────┘ └──────────┘ └─────────┘ └───────────┘  │              │
│  └───────────────────────────────────────────────────────┘              │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ API calls
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      APIs EXTERNAS                                      │
│  Ahrefs │ GSC │ GA4 │ Otterly │ LLMrefs │ WordPress │ Stripe          │
│  WhatsApp (Z-API) │ LinkedIn │ Reddit │ Medium │ SendGrid             │
└─────────────────────────────────────────────────────────────────────────┘
```

## Camadas da Arquitetura

### 1. Presentation Layer (Next.js 15 na Vercel)
Responsavel pela interface do usuario. Server-Side Rendering para SEO do proprio dashboard, React Server Components para performance, e Client Components para interatividade (graficos, real-time updates). Middleware para autenticacao e redirecionamento.

### 2. API Layer (Supabase Edge Functions + PostgREST)
PostgREST expoe automaticamente as tabelas do PostgreSQL como API REST com filtragem, paginacao e RLS integrado. Edge Functions (Deno runtime) tratam logica customizada: webhooks do Stripe, orquestracao de agentes, validacoes complexas.

### 3. Business Logic Layer (Agent Orchestrator)
Workers Node.js consomem jobs do BullMQ. O [[Orquestrador]] decide qual agente executar, com qual modelo, e em qual prioridade. Cada agente usa o Claude Agent SDK com tools MCP para acessar APIs externas.

### 4. Data Layer (PostgreSQL com RLS)
Fonte unica de verdade. Row Level Security garante isolamento multi-tenant — um cliente nunca ve dados de outro. Views materializadas para dashboards de metricas. Indices em colunas de busca frequente (org_id, project_id, status).

### 5. External Layer (APIs de Terceiros)
Integracoes com fallback. Se Ahrefs falhar, usamos cache dos ultimos dados. Se Z-API cair, enfileiramos mensagens para reenvio. Ver [[Integracoes Externas]] para detalhes.

## Comunicacao entre Camadas

- **Frontend → Backend**: REST via Supabase client SDK (`@supabase/supabase-js`). Autenticacao por JWT no header `Authorization: Bearer <token>`.
- **Real-time updates**: Supabase Realtime subscriptions (WebSocket). O dashboard escuta mudancas em `agent_jobs`, `content_pieces`, `keywords` para atualizar a UI sem refresh.
- **Backend → Workers**: BullMQ (Redis). Edge Functions adicionam jobs na fila, workers consomem.
- **Workers → Backend**: Workers escrevem resultados diretamente no PostgreSQL via Supabase client com service role key (bypassa RLS).
- **Workers → APIs externas**: HTTP REST. Retry com backoff exponencial (1s, 2s, 4s) em caso de falha.

## Fila de Jobs (BullMQ + Redis)

Filas separadas por prioridade e tipo:

| Fila | Prioridade | Concorrencia | Timeout |
|------|-----------|--------------|---------|
| `agent:critical` | 1 (alta) | 5 workers | 120s |
| `agent:content` | 2 | 10 workers | 300s |
| `agent:analytics` | 3 | 3 workers | 60s |
| `agent:distribution` | 4 | 5 workers | 60s |
| `billing` | 1 (alta) | 2 workers | 30s |
| `reports` | 5 (baixa) | 2 workers | 600s |

## Armazenamento (Supabase Storage)

| Bucket | Conteudo | Politica de Acesso |
|--------|---------|-------------------|
| `content-drafts` | Rascunhos Markdown | Agentes + admin |
| `published-content` | Conteudo final (HTML) | Agentes + admin |
| `reports` | PDFs de relatorios | Org owner (RLS) |
| `assets` | Imagens, infograficos | Publico (CDN) |
| `backups` | Exports de dados | Admin only |

## Seguranca

- **Autenticacao**: Supabase Auth com email/password e magic link. JWT com claims customizados (`role`, `org_id`).
- **Autorizacao**: RLS em todas as tabelas. Policies baseadas em `auth.uid()` e `auth.jwt() ->> 'org_id'`.
- **API Keys**: Armazenadas como secrets no Supabase Vault (nao em environment variables expostas).
- **Rate Limiting**: Middleware Next.js + Supabase Edge Functions com rate limiting por IP e por org.
- **Encriptacao**: TLS em transito, AES-256 em repouso (Supabase padrao).

## Escalabilidade

- **Horizontal**: Adicionar mais workers Node.js. BullMQ distribui jobs automaticamente entre workers disponiveis.
- **Vertical**: Aumentar recursos (CPU/RAM) dos workers para processar jobs mais pesados.
- **Database**: Supabase Cloud gerencia replicacao e connection pooling (PgBouncer). Se necessario, read replicas para dashboards.
- **CDN**: Vercel Edge Network para assets estaticos. Supabase Storage com CDN para arquivos publicos.

Ver [[Stack Tecnologica]] para decisoes arquiteturais detalhadas e ADRs.
Ver [[Modulos]] para a decomposicao funcional do sistema.
Ver [[Entidades e Schema - Fase 1 (Onboarding)]] para o modelo de dados (Fase 1 e porta de entrada; linka para Fase 2 e Fase 3).
Ver [[Frontend]] para a arquitetura completa do frontend (rotas, layouts, design system).
Ver [[Estrutura de Codigo]] para a organizacao de pastas e convencoes do projeto.
Ver [[Orquestracao]] para o fluxo de execucao dos agentes.
Ver [[Jobs]] para o sistema de tarefas assincronas.
