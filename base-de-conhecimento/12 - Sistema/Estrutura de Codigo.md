---
tipo: conceito
area: Ambos
tags:
  - sistema
  - arquitetura
  - codigo
  - nextjs
  - typescript
  - estrutura
  - frontend
  - backend
atualizado: 2026-04-23
---

# Estrutura de Codigo — Organizacao Completa do Projeto

## Visao Geral

Projeto construido com **Next.js 15** e **TypeScript**. A filosofia de organizacao segue um principio claro de separacao de responsabilidades:

- `app/` = somente rotas, layouts e entrypoints
- `components/` = componentes visuais reutilizaveis
- `features/` = dominios de negocio separados e autonomos
- `lib/` = infraestrutura compartilhada (clients, utils, constants)
- `server/` = logica de negocio e acesso a dados (server-only)

Essa estrutura garante que cada camada tem uma responsabilidade unica, facilitando manutencao, testes e escalabilidade do projeto.

---

## Arvore de Pastas Completa

```
src/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    → Home
│   │   ├── como-funciona/page.tsx
│   │   ├── precos/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx               → Listagem
│   │   │   └── [slug]/page.tsx        → Artigo
│   │   ├── categorias/[slug]/page.tsx
│   │   ├── exemplos/page.tsx
│   │   ├── contato/page.tsx
│   │   ├── login/page.tsx
│   │   └── termos/page.tsx
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── onboarding/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              → Boas-vindas
│   │   │   ├── negocio/page.tsx
│   │   │   ├── localizacao/page.tsx
│   │   │   ├── oferta/page.tsx
│   │   │   ├── cliente-ideal/page.tsx
│   │   │   ├── diferenciais/page.tsx
│   │   │   ├── concorrentes/page.tsx
│   │   │   ├── objetivos/page.tsx
│   │   │   ├── marca/page.tsx
│   │   │   ├── integracoes/page.tsx
│   │   │   └── revisao/page.tsx
│   │   └── app/
│   │       ├── layout.tsx
│   │       ├── page.tsx              → Dashboard
│   │       ├── projeto/page.tsx
│   │       ├── estrategia/page.tsx
│   │       ├── conteudos/
│   │       │   ├── page.tsx          → Lista
│   │       │   └── [id]/page.tsx     → Detalhe
│   │       ├── agentes/page.tsx
│   │       ├── resultados/page.tsx
│   │       ├── integracoes/page.tsx
│   │       ├── suporte/page.tsx
│   │       ├── configuracoes/page.tsx
│   │       └── faturamento/page.tsx
│   ├── api/
│   │   ├── onboarding/[step]/route.ts
│   │   ├── webhooks/stripe/route.ts
│   │   ├── jobs/[type]/route.ts
│   │   └── auth/callback/route.ts
│   ├── globals.css
│   └── layout.tsx                    → Root layout
│
├── components/
│   ├── ui/                           → Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   ├── tooltip.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── sheet.tsx
│   │   ├── separator.tsx
│   │   ├── scroll-area.tsx
│   │   ├── progress.tsx
│   │   ├── avatar.tsx
│   │   └── command.tsx
│   ├── layout/
│   │   ├── public-header.tsx
│   │   ├── public-footer.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── app-topbar.tsx
│   │   └── page-shell.tsx
│   ├── marketing/
│   │   ├── hero-section.tsx
│   │   ├── feature-grid.tsx
│   │   ├── pricing-cards.tsx
│   │   ├── faq-section.tsx
│   │   ├── cta-banner.tsx
│   │   ├── testimonial-card.tsx
│   │   └── how-it-works.tsx
│   ├── blog/
│   │   ├── article-card.tsx
│   │   ├── article-sidebar.tsx
│   │   ├── article-content.tsx
│   │   ├── related-posts.tsx
│   │   ├── category-filter.tsx
│   │   └── table-of-contents.tsx
│   ├── dashboard/
│   │   ├── metric-card.tsx
│   │   ├── chart-panel.tsx
│   │   ├── content-status-table.tsx
│   │   ├── activity-feed.tsx
│   │   ├── score-gauge.tsx
│   │   └── keyword-table.tsx
│   ├── onboarding/
│   │   ├── step-header.tsx
│   │   ├── progress-bar.tsx
│   │   ├── form-actions.tsx
│   │   ├── ai-help-button.tsx
│   │   └── review-summary.tsx
│   └── shared/
│       ├── empty-state.tsx
│       ├── error-boundary.tsx
│       ├── loading-spinner.tsx
│       └── status-badge.tsx
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   │   └── use-auth.ts
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   └── types.ts
│   ├── onboarding/
│   │   ├── components/
│   │   │   ├── business-step-form.tsx
│   │   │   ├── location-step-form.tsx
│   │   │   ├── offer-step-form.tsx
│   │   │   ├── audience-step-form.tsx
│   │   │   ├── differentials-step-form.tsx
│   │   │   ├── competitors-step-form.tsx
│   │   │   ├── goals-step-form.tsx
│   │   │   ├── brand-step-form.tsx
│   │   │   ├── integrations-step-form.tsx
│   │   │   └── review-step.tsx
│   │   ├── schemas/
│   │   │   ├── business.schema.ts
│   │   │   ├── location.schema.ts
│   │   │   ├── offer.schema.ts
│   │   │   ├── audience.schema.ts
│   │   │   ├── differentials.schema.ts
│   │   │   ├── competitors.schema.ts
│   │   │   ├── goals.schema.ts
│   │   │   ├── brand.schema.ts
│   │   │   └── integrations.schema.ts
│   │   ├── hooks/
│   │   │   └── use-onboarding.ts
│   │   ├── services/
│   │   │   └── onboarding.service.ts
│   │   ├── utils/
│   │   │   └── onboarding-mapper.ts
│   │   └── types.ts
│   ├── organizations/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   ├── business-context/
│   │   ├── services/
│   │   │   └── business-context.service.ts
│   │   ├── utils/
│   │   │   └── context-builder.ts
│   │   └── types.ts
│   ├── strategy/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   ├── content/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   ├── agents/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   ├── analytics/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   ├── billing/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   ├── support/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   └── blog/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts               → Browser client
│   │   ├── server.ts               → Server client
│   │   ├── admin.ts                → Service role client
│   │   └── middleware.ts           → Auth middleware
│   ├── stripe/
│   │   ├── client.ts
│   │   ├── webhooks.ts
│   │   └── plans.ts
│   ├── auth/
│   │   └── guards.ts
│   ├── validations/
│   │   └── common.ts
│   ├── utils/
│   │   ├── format.ts
│   │   ├── date.ts
│   │   └── slug.ts
│   ├── constants/
│   │   ├── routes.ts
│   │   ├── plans.ts
│   │   └── agent-types.ts
│   ├── jobs/
│   │   ├── job-types.ts
│   │   ├── enqueue-job.ts
│   │   ├── process-job.ts
│   │   └── retry-policy.ts
│   └── llm/
│       ├── claude.ts
│       ├── prompts/
│       │   ├── estrategista.ts
│       │   ├── pesquisador.ts
│       │   ├── redator.ts
│       │   ├── revisor.ts
│       │   └── publicador.ts
│       └── tools/
│           └── mcp-config.ts
│
├── server/
│   ├── actions/
│   │   ├── onboarding.actions.ts
│   │   ├── content.actions.ts
│   │   └── billing.actions.ts
│   ├── services/
│   │   ├── organization.service.ts
│   │   ├── onboarding.service.ts
│   │   ├── business-context.service.ts
│   │   ├── strategy.service.ts
│   │   ├── content.service.ts
│   │   ├── publishing.service.ts
│   │   ├── analytics.service.ts
│   │   └── billing.service.ts
│   ├── repositories/
│   │   ├── organization.repository.ts
│   │   ├── onboarding.repository.ts
│   │   ├── business-context.repository.ts
│   │   ├── project.repository.ts
│   │   ├── keyword.repository.ts
│   │   ├── content.repository.ts
│   │   ├── agent-job.repository.ts
│   │   ├── metrics.repository.ts
│   │   └── subscription.repository.ts
│   ├── mappers/
│   │   ├── onboarding-to-context.mapper.ts
│   │   ├── content-to-wordpress.mapper.ts
│   │   └── gsc-to-metrics.mapper.ts
│   └── workers/
│       ├── generate-business-context.worker.ts
│       ├── generate-strategy.worker.ts
│       ├── generate-briefing.worker.ts
│       ├── generate-content.worker.ts
│       ├── review-content.worker.ts
│       ├── publish-content.worker.ts
│       ├── sync-metrics.worker.ts
│       └── process-payment.worker.ts
│
├── types/
│   ├── database.ts                  → Generated by Supabase CLI
│   ├── domain.ts                    → Business domain types
│   └── api.ts                       → API request/response types
│
└── styles/
    └── (Tailwind handles everything)
```

---

## Filosofia de Organizacao

| Pasta | Responsabilidade | Regra |
|---|---|---|
| `app/` | Somente rotas, layouts e entrypoints do Next.js | ZERO logica de negocio. Cada `page.tsx` importa componentes de `features/` ou `components/` e os renderiza. Nenhum fetch direto, nenhuma query, nenhum calculo. |
| `components/` | Componentes visuais reutilizaveis em todo o app | Sem side-effects, sem fetch, sem acesso a banco. Recebem dados via props. Sao "burros" — nao sabem de onde os dados vem. |
| `features/` | Cada dominio do produto isolado e autonomo | Cada feature contem seus proprios componentes, hooks, services, schemas e types. Nao importa de outras features diretamente. |
| `lib/` | Infraestrutura compartilhada (clients, utils, constants) | Sem dependencia de features. Qualquer feature pode importar de `lib/`, mas `lib/` nunca importa de `features/`. |
| `server/` | Logica de negocio e acesso a dados | So roda no servidor (server-only). Contem actions, services, repositories, workers e mappers. Nunca importado pelo client. |
| `types/` | Definicoes TypeScript globais | Compartilhado entre client e server. Types do banco, do dominio e da API. |

### Regra de Dependencia (Fluxo Unidirecional)

```
app/ → features/ → lib/
         ↓
      components/
         ↓
       server/ → lib/
```

- `app/` pode importar de `features/`, `components/` e `lib/`
- `features/` pode importar de `components/` e `lib/`
- `server/` pode importar de `lib/` (nunca de `features/` ou `components/`)
- `lib/` e autonomo — nao importa de ninguem
- `components/` nao importa de `features/` nem de `server/`

---

## Estrutura por Feature (Padrao)

Cada feature segue o mesmo padrao interno para manter consistencia no projeto:

```
features/{feature}/
├── components/        → Componentes especificos da feature
├── schemas/           → Zod schemas de validacao
├── hooks/             → React hooks customizados
├── services/          → Chamadas a API/Supabase
├── utils/             → Helpers da feature
└── types.ts           → Types especificos
```

### Detalhamento

| Subpasta | O que contem | Exemplo |
|---|---|---|
| `components/` | Componentes React usados exclusivamente dentro dessa feature. Se um componente for necessario em 2+ features, ele vai para `components/shared/`. | `business-step-form.tsx` na feature onboarding |
| `schemas/` | Schemas Zod para validacao de formularios e payloads. Cada step/entidade tem seu schema. | `business.schema.ts` valida o passo de negocio no onboarding |
| `hooks/` | React hooks que encapsulam estado e logica da feature. Prefixo `use-`. | `use-onboarding.ts` gerencia estado do wizard |
| `services/` | Funcoes que fazem chamadas a API ou Supabase. Camada de comunicacao. | `onboarding.service.ts` envia dados para o backend |
| `utils/` | Funcoes puras auxiliares. Transformacoes, formatacoes, calculos. | `onboarding-mapper.ts` transforma resposta para formato do banco |
| `types.ts` | Types TypeScript locais da feature. Types globais ficam em `types/`. | `OnboardingStep`, `OnboardingState` |

---

## Camadas do Backend

O backend segue uma arquitetura em camadas bem definida. Cada camada tem responsabilidade unica.

### 1. Repositories — Acesso ao Banco

- **Responsabilidade**: Acesso direto ao banco de dados via Supabase client. Queries puras, sem logica de negocio.
- **Naming**: `{entity}.repository.ts`
- **Metodos padrao**: `findById()`, `findAll()`, `findByOrganizationId()`, `create()`, `update()`, `delete()`
- **Regra**: NUNCA contem logica de negocio. So traduz operacoes para queries Supabase.

```typescript
// server/repositories/content.repository.ts
export class ContentRepository {
  async findById(id: string): Promise<Content | null> {
    const { data } = await supabase
      .from('conteudos')
      .select('*')
      .eq('id', id)
      .single()
    return data
  }

  async findByProjectId(projectId: string): Promise<Content[]> {
    const { data } = await supabase
      .from('conteudos')
      .select('*')
      .eq('projeto_id', projectId)
      .order('criado_em', { ascending: false })
    return data ?? []
  }

  async updateStatus(id: string, status: ContentStatus): Promise<void> {
    await supabase
      .from('conteudos')
      .update({ status, atualizado_em: new Date().toISOString() })
      .eq('id', id)
  }
}
```

### 2. Services — Regras de Negocio

- **Responsabilidade**: Regras de negocio, validacoes complexas, orquestracao de repositories.
- **Naming**: `{domain}.service.ts`
- **Regra**: Um service pode chamar multiplos repositories, mas NUNCA faz query direta no banco.

```typescript
// server/services/content.service.ts
export class ContentService {
  constructor(
    private contentRepo: ContentRepository,
    private keywordRepo: KeywordRepository
  ) {}

  async publishContent(contentId: string): Promise<PublishResult> {
    const content = await this.contentRepo.findById(contentId)
    if (!content) throw new NotFoundError('Conteudo nao encontrado')
    if (content.status !== 'aprovado') throw new ValidationError('Conteudo precisa estar aprovado')

    // Logica de negocio: validar, transformar, publicar
    const result = await this.publishToWordPress(content)
    await this.contentRepo.updateStatus(contentId, 'publicado')
    await this.keywordRepo.markAsPublished(content.keyword_id)

    return result
  }
}
```

### 3. Workers — Execucao Assincrona

- **Responsabilidade**: Consumers de [[Jobs]] da fila BullMQ. Executam tarefas pesadas em background.
- **Naming**: `{action}.worker.ts`
- **Regra**: Importa o service correspondente, executa a tarefa, registra resultado.

```typescript
// server/workers/generate-content.worker.ts
export async function processGenerateContent(job: Job<GenerateContentPayload>) {
  const { briefing_id, contexto_id } = job.data

  const contentService = new ContentService(/* deps */)
  const result = await contentService.generateFromBriefing(briefing_id, contexto_id)

  return { content_id: result.id, word_count: result.wordCount }
}
```

### 4. Mappers — Transformacao entre Camadas

- **Responsabilidade**: Transformar dados de um formato para outro. Sem logica de negocio, sem side-effects.
- **Naming**: `{source}-to-{target}.mapper.ts`

```typescript
// server/mappers/onboarding-to-context.mapper.ts
export function mapOnboardingToContext(
  respostas: OnboardingResponse[]
): BusinessContextInput {
  return {
    segmento: respostas.find(r => r.step === 'negocio')?.data.segmento,
    localizacao: respostas.find(r => r.step === 'localizacao')?.data,
    // ... consolidacao de todas as respostas
  }
}
```

### 5. Actions — Next.js Server Actions

- **Responsabilidade**: Ponto de entrada para chamadas do client via Server Actions do Next.js.
- **Naming**: `{domain}.actions.ts`
- **Regra**: Valida input (com Zod), autentica usuario, chama service, retorna resultado formatado.

```typescript
// server/actions/onboarding.actions.ts
'use server'

export async function saveOnboardingStep(step: string, data: unknown) {
  const user = await requireAuth()
  const validated = onboardingSchemas[step].parse(data)

  const service = new OnboardingService(/* deps */)
  return service.saveStep(user.organizationId, step, validated)
}
```

### Diagrama de Fluxo entre Camadas

```
[Client]
    │
    ├── Server Action ──→ Action ──→ Service ──→ Repository ──→ [Supabase/DB]
    │                                   │
    │                                   ├──→ Mapper (transformacao)
    │                                   └──→ LLM Client (se agente)
    │
    └── API Route ──→ Route Handler ──→ Service ──→ Repository ──→ [Supabase/DB]

[BullMQ Queue]
    │
    └── Worker ──→ Service ──→ Repository ──→ [Supabase/DB]
```

---

## Convencoes de Codigo

| Tipo | Convencao | Exemplo |
|---|---|---|
| Componentes React | kebab-case | `metric-card.tsx`, `hero-section.tsx` |
| Hooks React | camelCase com prefixo "use" | `use-onboarding.ts`, `use-auth.ts` |
| Services | dot notation | `onboarding.service.ts`, `content.service.ts` |
| Repositories | dot notation | `content.repository.ts`, `keyword.repository.ts` |
| Schemas Zod | dot notation | `business.schema.ts`, `location.schema.ts` |
| Types/Interfaces | PascalCase | `BusinessContext`, `ContentPiece`, `AgentJob` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT` |
| Envs publicas | Prefixo NEXT_PUBLIC_ | `NEXT_PUBLIC_SUPABASE_URL` |
| Envs privadas | Sem prefixo | `SUPABASE_SERVICE_ROLE_KEY` |
| Funcoes utilitarias | camelCase | `formatDate()`, `generateSlug()` |
| Pastas | kebab-case | `business-context/`, `ai-help-button/` |

### Regras Adicionais

- **Imports**: Usar path aliases (`@/components/`, `@/lib/`, `@/features/`, `@/server/`, `@/types/`)
- **Exports**: Preferir named exports. Default export apenas em `page.tsx` e `layout.tsx` (exigencia Next.js)
- **Async/Await**: Sempre usar async/await, nunca `.then()` chains
- **Error Handling**: Erros customizados (`NotFoundError`, `ValidationError`, `AuthError`) em `lib/errors/`
- **Null Safety**: Sempre tratar `null` e `undefined`. Usar optional chaining e nullish coalescing

---

## Tipagem (4 Camadas)

O projeto usa 4 camadas de tipagem para manter clareza e separacao:

| Camada | Arquivo | Uso | Quem Gera |
|---|---|---|---|
| Database | `types/database.ts` | Types das tabelas do banco, gerados automaticamente | `supabase gen types typescript` — NUNCA editar manualmente |
| Domain | `types/domain.ts` | Types do dominio de negocio: `BusinessContext`, `ContentPiece`, `AgentJob`, `Strategy` | Criado e mantido manualmente |
| API | `types/api.ts` | Shapes de request e response das API routes | Criado e mantido manualmente |
| Feature | `features/*/types.ts` | Types locais e especificos de cada feature | Criado dentro de cada feature |

### Fluxo de Conversao

```
[Supabase Response] → Database Types → Mapper → Domain Types → API Types → [Client]
```

O banco retorna `Database Types`. Os mappers convertem para `Domain Types` que o service usa. As actions/routes convertem para `API Types` que o client consome.

---

## Route Groups do Next.js

O `app/` usa **route groups** (pastas com parenteses) para organizar rotas sem afetar a URL:

| Route Group | Layout | Auth | Proposito |
|---|---|---|---|
| `(public)` | `public-header` + `public-footer` | Nao requer auth | Site publico: home, blog, precos, contato |
| `(auth)` | `app-sidebar` + `app-topbar` | Requer auth (middleware) | Area logada: onboarding, dashboard, app |

### Middleware de Auth

O middleware em `lib/supabase/middleware.ts` intercepta todas as rotas `(auth)` e:
1. Verifica se existe sessao Supabase valida
2. Se nao, redireciona para `/login`
3. Se sim, injeta dados do usuario no request

---

## Modulos V1 vs V2+

| Modulo | V1 (MVP) | V2+ (Evolucao) |
|---|---|---|
| `auth` | Completo — login, logout, sessao | - |
| `organizations` | Completo — CRUD basico | - |
| `onboarding` | Completo — 10 steps wizard | Versao avancada com IA assistente |
| `business-context` | Completo — geracao a partir do onboarding | Auto-update baseado em metricas |
| `strategy` | Basico — keywords + calendario simples | Avancado com feedback loop e re-otimizacao |
| `content` | Completo — pipeline de geracao ate publicacao | + templates, + A/B testing de titulos |
| `billing` | Link Stripe — checkout basico | Automacao completa com dunning e upgrades |
| `dashboard` | Basico — 3 metricas principais | 7 telas completas com graficos interativos |
| `blog` | Completo — listagem + artigo + SEO | + newsletter integrada + lead magnets |
| `support` | Nao implementado | Chat IA com escalonamento para humano |
| `analytics` | Nao implementado | Dashboard automatico com GSC + GA4 |
| `agents` | 3 ativos (Estrategista, Pesquisador, Redator) | 11 ativos (todos os agentes do [[Arquitetura de Agentes]]) |

---

## Notas Relacionadas

- [[Stack Tecnologica]] — Tecnologias usadas no projeto
- [[Modulos]] — Detalhamento de cada modulo do sistema
- [[Frontend]] — Especificacoes da interface do usuario
- [[Orquestracao]] — Fluxo de execucao dos agentes
- [[Jobs]] — Sistema de tarefas assincronas
- [[Entidades e Schema - Fase 1 (Onboarding)]] — Modelo de dados do banco (Fase 1 e porta de entrada; linka para Fase 2 e Fase 3)
- [[Arquitetura do Sistema]] — Visao geral da arquitetura
