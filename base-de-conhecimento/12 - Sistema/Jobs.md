---
tipo: conceito
area: Ambos
tags:
  - sistema
  - jobs
  - bullmq
  - redis
  - filas
  - workers
  - async
  - backend
atualizado: 2026-04-23
---

# Jobs — Sistema de Tarefas Assincronas

## Visao Geral

Todo trabalho pesado do sistema e executado via **jobs assincronos**. Nenhuma chamada de IA, publicacao externa ou sincronizacao de dados acontece de forma sincrona na request do usuario.

**Arquitetura**:
- **BullMQ** — biblioteca de filas para Node.js (baseada em Redis)
- **Redis** — armazena a fila em memoria para processamento rapido
- **PostgreSQL** — persistencia dos resultados e logs em `execucoes_agentes`
- **Workers** — processos que consomem jobs da fila e executam o trabalho

```
[Evento] → enqueueJob() → [Redis/BullMQ] → Worker → [Service] → [Banco] → [Proximo Evento]
```

---

## Tipos de Jobs (Enum Completo)

| Job Type | Descricao | Agente | Fila | Timeout | Prioridade |
|---|---|---|---|---|---|
| `gerar_business_context` | Consolida respostas do onboarding em JSON estruturado | (funcao deterministica) | `fila_alta` | 10s | Alta |
| `gerar_estrategia` | Gera keywords, clusters e calendario editorial | [[Agente Estrategista]] | `fila_alta` | 120s | Alta |
| `gerar_briefing` | Pesquisa SERP + monta outline do artigo | [[Agente Pesquisador]] | `fila_normal` | 180s | Normal |
| `gerar_conteudo` | Escreve artigo completo baseado no briefing | [[Agente Redator]] | `fila_alta` | 300s | Alta |
| `gerar_plano_visual` | Analisa artigo e cria plano de imagens | [[Agente Visual]] | `fila_normal` | 30s | Normal |
| `gerar_imagens` | Gera imagens via API + otimiza (WebP, alt, filename) | [[Agente Visual]] | `fila_normal` | 120s | Normal |
| `revisar_conteudo` | Avalia qualidade SEO + AIO do artigo + imagens (V2+) | [[Agente Revisor]] | `fila_normal` | 60s | Normal |
| `publicar_conteudo` | Publica artigo + imagens no WordPress via REST API | [[Agente Publicador]] | `fila_alta` | 120s | Alta |
| `distribuir_conteudo` | Posta versoes adaptadas em redes sociais (V2+) | [[Agente Distribuidor]] | `fila_baixa` | 60s | Baixa |
| `atualizar_metricas` | Busca dados do GSC e GA4 para conteudo publicado | [[Agente Monitor]] | `fila_normal` | 600s | Normal |
| `sincronizar_gsc` | Sync completo do Google Search Console | (funcao) | `fila_normal` | 300s | Normal |
| `gerar_relatorio` | Gera relatorio mensal de performance | (funcao) | `fila_baixa` | 120s | Baixa |
| `processar_pagamento` | Processa webhook do Stripe (assinatura, cobranca) | (funcao) | `fila_critica` | 30s | Critica |
| `enviar_email` | Envia email transacional (boas-vindas, alerta, relatorio) | (funcao) | `fila_baixa` | 30s | Baixa |
| `verificar_citacao_ia` | Testa se conteudo e citado em 5 plataformas de IA | [[Agente Monitor]] | `fila_normal` | 300s | Normal |

**Total**: 15 tipos de jobs cobrindo todo o ciclo de vida do conteudo (texto + imagem) + operacoes de suporte.

---

## Estados do Job

### Diagrama de Estados

```
                    ┌─────────────────────────────────┐
                    │                                 │
                    ▼                                 │
              ┌──────────┐                            │
              │ pending  │ ← Job criado na fila       │
              └────┬─────┘                            │
                   │                                  │
                   │ worker pega o job                 │
                   ▼                                  │
              ┌──────────┐                            │
              │ running  │ ← Em execucao              │
              └────┬─────┘                            │
                   │                                  │
          ┌────────┼────────┐                         │
          │        │        │                         │
          ▼        ▼        ▼                         │
    ┌───────┐ ┌────────┐ ┌─────────┐                  │
    │completed│ │ failed │ │ timeout │                  │
    └───────┘ └────┬───┘ └────┬────┘                  │
                   │          │                       │
                   └────┬─────┘                       │
                        │                             │
                        ▼                             │
                   ┌─────────┐                        │
                   │ retry?  │                        │
                   └────┬────┘                        │
                        │                             │
                   ┌────┼────┐                        │
                   │         │                        │
                   ▼         ▼                        │
            (tentativa   ┌────────────┐               │
             < max)      │ dead_letter│               │
                │        └────────────┘               │
                │                                     │
                └─────────────────────────────────────┘
                    volta para pending (retry)
```

### Tabela de Transicoes

| Estado Atual | Condicao | Proximo Estado | Acao |
|---|---|---|---|
| `pending` | Worker disponivel na fila | `running` | Worker inicia execucao |
| `running` | Execucao concluida com sucesso | `completed` | Resultado salvo, proximo evento disparado |
| `running` | Erro durante execucao | `failed` | Erro registrado, verifica retry |
| `running` | Tempo excedeu timeout | `timeout` | Job cancelado, verifica retry |
| `failed` | `tentativa < max_retries` | `pending` | Re-enfileirado com delay (backoff) |
| `failed` | `tentativa >= max_retries` | `dead_letter` | Movido para DLQ, admin notificado |
| `timeout` | `tentativa < max_retries` | `pending` | Re-enfileirado com delay (backoff) |
| `timeout` | `tentativa >= max_retries` | `dead_letter` | Movido para DLQ, admin notificado |
| `dead_letter` | Admin intervem | `pending` | Reprocessamento manual |

---

## Filas por Prioridade (BullMQ)

| Fila | Jobs | Concorrencia | Rate Limit | Justificativa |
|---|---|---|---|---|
| `fila_critica` | `processar_pagamento` | 5 workers | Sem limite | Pagamentos nao podem esperar — impacto direto em receita |
| `fila_alta` | `gerar_conteudo`, `publicar_conteudo`, `gerar_estrategia`, `gerar_business_context` | 3 workers | 10 jobs/min | Core do pipeline — determina velocidade de entrega |
| `fila_normal` | `gerar_briefing`, `revisar_conteudo`, `atualizar_metricas`, `sincronizar_gsc`, `verificar_citacao_ia` | 5 workers | 20 jobs/min | Importante mas nao urgente — pode esperar minutos |
| `fila_baixa` | `distribuir_conteudo`, `gerar_relatorio`, `enviar_email` | 2 workers | 30 jobs/min | Tarefas auxiliares — pode esperar horas |

### Por que Separar em Filas?

1. **Isolamento**: um pico de emails nao atrasa geracao de conteudo
2. **Prioridade**: pagamentos SEMPRE processam primeiro
3. **Rate limiting**: APIs de IA tem limites — fila controla throughput
4. **Monitoramento**: dashboards separados por criticidade

---

## Retry Policy

### Tabela de Retry

| Tentativa | Delay | Acao | Calculo |
|---|---|---|---|
| 1a (original) | 0 | Execucao normal | - |
| 2a (retry 1) | 30 segundos | Retry automatico | `30s * 2^0` |
| 3a (retry 2) | 2 minutos | Retry automatico | `30s * 2^2` |
| 4a (retry 3) | 10 minutos | Retry automatico | `30s * 2^4` (cap em 10min) |
| 5a+ | - | Dead letter queue + alerta admin | Fim dos retries automaticos |

### Retry por Tipo de Job

Nem todos os jobs usam a mesma politica:

| Job Type | Max Retries | Backoff Base | Backoff Max | Observacao |
|---|---|---|---|---|
| `processar_pagamento` | 5 | 10s | 5min | Mais retries — receita critica |
| `gerar_business_context` | 3 | 30s | 10min | Padrao |
| `gerar_estrategia` | 3 | 30s | 10min | Padrao |
| `gerar_briefing` | 3 | 30s | 10min | Padrao |
| `gerar_conteudo` | 3 | 60s | 15min | Delay maior — job caro (tokens) |
| `revisar_conteudo` | 3 | 30s | 10min | Padrao |
| `publicar_conteudo` | 5 | 30s | 10min | Mais retries — site pode estar fora |
| `enviar_email` | 3 | 60s | 10min | Padrao |
| `atualizar_metricas` | 2 | 5min | 30min | APIs externas — delays longos |
| `verificar_citacao_ia` | 2 | 5min | 30min | APIs externas — delays longos |

---

## Estrutura de Codigo

```
lib/jobs/
├── job-types.ts          → Enum/union de todos os tipos de job
├── enqueue-job.ts        → Funcao para adicionar job na fila
├── process-job.ts        → Router que direciona para worker correto
├── retry-policy.ts       → Configuracao de retry por tipo
└── queues.ts             → Definicao das filas BullMQ

server/workers/
├── generate-business-context.worker.ts
├── generate-strategy.worker.ts
├── generate-briefing.worker.ts
├── generate-content.worker.ts
├── review-content.worker.ts
├── publish-content.worker.ts
├── sync-metrics.worker.ts
└── process-payment.worker.ts
```

---

## Exemplos de Codigo (TypeScript)

### 1. `job-types.ts` — Tipos de Job

```typescript
// lib/jobs/job-types.ts

export const JOB_TYPES = {
  GERAR_BUSINESS_CONTEXT: 'gerar_business_context',
  GERAR_ESTRATEGIA: 'gerar_estrategia',
  GERAR_BRIEFING: 'gerar_briefing',
  GERAR_CONTEUDO: 'gerar_conteudo',
  REVISAR_CONTEUDO: 'revisar_conteudo',
  PUBLICAR_CONTEUDO: 'publicar_conteudo',
  DISTRIBUIR_CONTEUDO: 'distribuir_conteudo',
  ATUALIZAR_METRICAS: 'atualizar_metricas',
  SINCRONIZAR_GSC: 'sincronizar_gsc',
  GERAR_RELATORIO: 'gerar_relatorio',
  PROCESSAR_PAGAMENTO: 'processar_pagamento',
  ENVIAR_EMAIL: 'enviar_email',
  VERIFICAR_CITACAO_IA: 'verificar_citacao_ia',
} as const

export type JobType = typeof JOB_TYPES[keyof typeof JOB_TYPES]

// Payloads tipados por job
export interface JobPayloads {
  gerar_business_context: { sessao_id: string; organizacao_id: string }
  gerar_estrategia: { contexto_id: string; projeto_id: string }
  gerar_briefing: { keyword_id: string; contexto_id: string; projeto_id: string }
  gerar_conteudo: { conteudo_id: string; briefing_json: object; contexto_id: string }
  revisar_conteudo: { conteudo_id: string; contexto_id: string }
  publicar_conteudo: { conteudo_id: string; integracao_id: string }
  distribuir_conteudo: { conteudo_id: string; plataformas: string[] }
  atualizar_metricas: { conteudo_id: string; organizacao_id: string }
  sincronizar_gsc: { organizacao_id: string; projeto_id: string }
  gerar_relatorio: { organizacao_id: string; periodo: string }
  processar_pagamento: { evento_stripe: string; payload: object }
  enviar_email: { para: string; template: string; dados: object }
  verificar_citacao_ia: { conteudo_id: string; url: string; keyword: string }
}
```

### 2. `enqueue-job.ts` — Adicionar Job na Fila

```typescript
// lib/jobs/enqueue-job.ts

import { Queue } from 'bullmq'
import { JobType, JobPayloads } from './job-types'
import { getQueueForJobType, getRetryPolicy } from './retry-policy'
import { redis } from '@/lib/redis'

const queues: Record<string, Queue> = {}

function getQueue(queueName: string): Queue {
  if (!queues[queueName]) {
    queues[queueName] = new Queue(queueName, { connection: redis })
  }
  return queues[queueName]
}

export async function enqueueJob<T extends JobType>(
  type: T,
  payload: JobPayloads[T],
  options?: {
    delay?: number        // delay em ms antes de processar
    priority?: number     // prioridade dentro da fila (menor = mais prioritario)
    jobId?: string        // ID customizado para idempotencia
  }
): Promise<string> {
  const queueName = getQueueForJobType(type)
  const retryPolicy = getRetryPolicy(type)
  const queue = getQueue(queueName)

  const job = await queue.add(type, payload, {
    jobId: options?.jobId,
    delay: options?.delay,
    priority: options?.priority,
    attempts: retryPolicy.maxRetries + 1,
    backoff: {
      type: 'exponential',
      delay: retryPolicy.backoffBase,
    },
    removeOnComplete: { age: 7 * 24 * 3600 },   // manter 7 dias
    removeOnFail: { age: 30 * 24 * 3600 },       // manter 30 dias
  })

  console.log(`[Job Enqueued] type=${type} id=${job.id} queue=${queueName}`)
  return job.id!
}
```

### 3. `process-job.ts` — Router para Workers

```typescript
// lib/jobs/process-job.ts

import { Job } from 'bullmq'
import { JOB_TYPES, JobType } from './job-types'

// Import dos workers
import { processGenerateBusinessContext } from '@/server/workers/generate-business-context.worker'
import { processGenerateStrategy } from '@/server/workers/generate-strategy.worker'
import { processGenerateBriefing } from '@/server/workers/generate-briefing.worker'
import { processGenerateContent } from '@/server/workers/generate-content.worker'
import { processReviewContent } from '@/server/workers/review-content.worker'
import { processPublishContent } from '@/server/workers/publish-content.worker'
import { processSyncMetrics } from '@/server/workers/sync-metrics.worker'
import { processPayment } from '@/server/workers/process-payment.worker'

const workerMap: Record<JobType, (job: Job) => Promise<unknown>> = {
  [JOB_TYPES.GERAR_BUSINESS_CONTEXT]: processGenerateBusinessContext,
  [JOB_TYPES.GERAR_ESTRATEGIA]: processGenerateStrategy,
  [JOB_TYPES.GERAR_BRIEFING]: processGenerateBriefing,
  [JOB_TYPES.GERAR_CONTEUDO]: processGenerateContent,
  [JOB_TYPES.REVISAR_CONTEUDO]: processReviewContent,
  [JOB_TYPES.PUBLICAR_CONTEUDO]: processPublishContent,
  [JOB_TYPES.ATUALIZAR_METRICAS]: processSyncMetrics,
  [JOB_TYPES.PROCESSAR_PAGAMENTO]: processPayment,
  // Jobs simples que usam funcoes inline
  [JOB_TYPES.DISTRIBUIR_CONTEUDO]: async (job) => { /* TODO V2+ */ },
  [JOB_TYPES.SINCRONIZAR_GSC]: async (job) => { /* TODO V2+ */ },
  [JOB_TYPES.GERAR_RELATORIO]: async (job) => { /* TODO V2+ */ },
  [JOB_TYPES.ENVIAR_EMAIL]: async (job) => { /* TODO V2+ */ },
  [JOB_TYPES.VERIFICAR_CITACAO_IA]: async (job) => { /* TODO V2+ */ },
}

export async function processJob(job: Job): Promise<unknown> {
  const type = job.name as JobType
  const worker = workerMap[type]

  if (!worker) {
    throw new Error(`Worker nao encontrado para job type: ${type}`)
  }

  const inicio = Date.now()
  console.log(`[Job Started] type=${type} id=${job.id} attempt=${job.attemptsMade + 1}`)

  try {
    const result = await worker(job)
    const duracao = Date.now() - inicio
    console.log(`[Job Completed] type=${type} id=${job.id} duration=${duracao}ms`)
    return result
  } catch (error) {
    const duracao = Date.now() - inicio
    console.error(`[Job Failed] type=${type} id=${job.id} duration=${duracao}ms error=${error}`)
    throw error // BullMQ captura e aplica retry policy
  }
}
```

### 4. `retry-policy.ts` — Configuracao de Retry

```typescript
// lib/jobs/retry-policy.ts

import { JobType, JOB_TYPES } from './job-types'

interface RetryConfig {
  maxRetries: number
  backoffBase: number    // ms
  backoffMax: number     // ms
  timeout: number        // ms
}

const retryPolicies: Record<JobType, RetryConfig> = {
  [JOB_TYPES.GERAR_BUSINESS_CONTEXT]: {
    maxRetries: 3, backoffBase: 30_000, backoffMax: 600_000, timeout: 10_000,
  },
  [JOB_TYPES.GERAR_ESTRATEGIA]: {
    maxRetries: 3, backoffBase: 30_000, backoffMax: 600_000, timeout: 120_000,
  },
  [JOB_TYPES.GERAR_BRIEFING]: {
    maxRetries: 3, backoffBase: 30_000, backoffMax: 600_000, timeout: 180_000,
  },
  [JOB_TYPES.GERAR_CONTEUDO]: {
    maxRetries: 3, backoffBase: 60_000, backoffMax: 900_000, timeout: 300_000,
  },
  [JOB_TYPES.REVISAR_CONTEUDO]: {
    maxRetries: 3, backoffBase: 30_000, backoffMax: 600_000, timeout: 60_000,
  },
  [JOB_TYPES.PUBLICAR_CONTEUDO]: {
    maxRetries: 5, backoffBase: 30_000, backoffMax: 600_000, timeout: 120_000,
  },
  [JOB_TYPES.DISTRIBUIR_CONTEUDO]: {
    maxRetries: 3, backoffBase: 30_000, backoffMax: 600_000, timeout: 60_000,
  },
  [JOB_TYPES.ATUALIZAR_METRICAS]: {
    maxRetries: 2, backoffBase: 300_000, backoffMax: 1_800_000, timeout: 600_000,
  },
  [JOB_TYPES.SINCRONIZAR_GSC]: {
    maxRetries: 2, backoffBase: 300_000, backoffMax: 1_800_000, timeout: 300_000,
  },
  [JOB_TYPES.GERAR_RELATORIO]: {
    maxRetries: 3, backoffBase: 60_000, backoffMax: 600_000, timeout: 120_000,
  },
  [JOB_TYPES.PROCESSAR_PAGAMENTO]: {
    maxRetries: 5, backoffBase: 10_000, backoffMax: 300_000, timeout: 30_000,
  },
  [JOB_TYPES.ENVIAR_EMAIL]: {
    maxRetries: 3, backoffBase: 60_000, backoffMax: 600_000, timeout: 30_000,
  },
  [JOB_TYPES.VERIFICAR_CITACAO_IA]: {
    maxRetries: 2, backoffBase: 300_000, backoffMax: 1_800_000, timeout: 300_000,
  },
}

export function getRetryPolicy(type: JobType): RetryConfig {
  return retryPolicies[type]
}

// Mapeamento de job type para fila
const queueMap: Record<JobType, string> = {
  [JOB_TYPES.PROCESSAR_PAGAMENTO]: 'fila_critica',
  [JOB_TYPES.GERAR_BUSINESS_CONTEXT]: 'fila_alta',
  [JOB_TYPES.GERAR_ESTRATEGIA]: 'fila_alta',
  [JOB_TYPES.GERAR_CONTEUDO]: 'fila_alta',
  [JOB_TYPES.PUBLICAR_CONTEUDO]: 'fila_alta',
  [JOB_TYPES.GERAR_BRIEFING]: 'fila_normal',
  [JOB_TYPES.REVISAR_CONTEUDO]: 'fila_normal',
  [JOB_TYPES.ATUALIZAR_METRICAS]: 'fila_normal',
  [JOB_TYPES.SINCRONIZAR_GSC]: 'fila_normal',
  [JOB_TYPES.VERIFICAR_CITACAO_IA]: 'fila_normal',
  [JOB_TYPES.DISTRIBUIR_CONTEUDO]: 'fila_baixa',
  [JOB_TYPES.GERAR_RELATORIO]: 'fila_baixa',
  [JOB_TYPES.ENVIAR_EMAIL]: 'fila_baixa',
}

export function getQueueForJobType(type: JobType): string {
  return queueMap[type]
}
```

---

## Payload de Cada Job

Tabela completa com o payload de entrada de cada tipo de job:

| Job | Payload | Exemplo |
|---|---|---|
| `gerar_business_context` | `{ sessao_id, organizacao_id }` | `{ sessao_id: "sess_abc123", organizacao_id: "org_xyz789" }` |
| `gerar_estrategia` | `{ contexto_id, projeto_id }` | `{ contexto_id: "ctx_001", projeto_id: "proj_001" }` |
| `gerar_briefing` | `{ keyword_id, contexto_id, projeto_id }` | `{ keyword_id: "kw_042", contexto_id: "ctx_001", projeto_id: "proj_001" }` |
| `gerar_conteudo` | `{ conteudo_id, briefing_json, contexto_id }` | `{ conteudo_id: "cnt_007", briefing_json: {...}, contexto_id: "ctx_001" }` |
| `revisar_conteudo` | `{ conteudo_id, contexto_id }` | `{ conteudo_id: "cnt_007", contexto_id: "ctx_001" }` |
| `publicar_conteudo` | `{ conteudo_id, integracao_id }` | `{ conteudo_id: "cnt_007", integracao_id: "int_wp_001" }` |
| `distribuir_conteudo` | `{ conteudo_id, plataformas[] }` | `{ conteudo_id: "cnt_007", plataformas: ["linkedin", "reddit"] }` |
| `atualizar_metricas` | `{ conteudo_id, organizacao_id }` | `{ conteudo_id: "cnt_007", organizacao_id: "org_xyz789" }` |
| `sincronizar_gsc` | `{ organizacao_id, projeto_id }` | `{ organizacao_id: "org_xyz789", projeto_id: "proj_001" }` |
| `gerar_relatorio` | `{ organizacao_id, periodo }` | `{ organizacao_id: "org_xyz789", periodo: "2026-03" }` |
| `processar_pagamento` | `{ evento_stripe, payload }` | `{ evento_stripe: "invoice.paid", payload: {...} }` |
| `enviar_email` | `{ para, template, dados }` | `{ para: "joao@email.com", template: "boas_vindas", dados: { nome: "Joao" } }` |
| `verificar_citacao_ia` | `{ conteudo_id, url, keyword }` | `{ conteudo_id: "cnt_007", url: "https://...", keyword: "seo local" }` |

---

## Logs Obrigatorios

Todo job que executa DEVE registrar um log completo na tabela `execucoes_agentes`. Nenhuma execucao pode passar sem registro.

### Campos Obrigatorios do Log

| Campo | Tipo | Descricao | Exemplo |
|---|---|---|---|
| `id` | UUID | Identificador unico da execucao | `exec_abc123` |
| `organizacao_id` | UUID | FK para organizacao dona | `org_xyz789` |
| `projeto_id` | UUID (nullable) | FK para projeto (se aplicavel) | `proj_001` |
| `tipo_agente` | Enum | Tipo do job/agente executado | `gerar_conteudo` |
| `status` | Enum | Estado final: `sucesso`, `falha`, `timeout` | `sucesso` |
| `entrada_json` | JSONB | Payload de entrada (resumido) | `{ conteudo_id: "cnt_007" }` |
| `saida_json` | JSONB (nullable) | Resultado da execucao | `{ word_count: 2150 }` |
| `erro_json` | JSONB (nullable) | Detalhes do erro se falhou | `{ code: "LLM_TIMEOUT", message: "..." }` |
| `tentativa` | Integer | Numero da tentativa (1, 2, 3...) | `1` |
| `iniciado_em` | Timestamp | Quando o worker comecou a processar | `2026-04-23T10:30:00Z` |
| `concluido_em` | Timestamp | Quando terminou (sucesso ou falha) | `2026-04-23T10:35:12Z` |
| `duracao_ms` | Integer | Tempo de execucao em milissegundos | `312000` |
| `tokens_entrada` | Integer (nullable) | Tokens consumidos no prompt (se LLM) | `4200` |
| `tokens_saida` | Integer (nullable) | Tokens gerados na resposta (se LLM) | `8500` |
| `custo_estimado` | Decimal (nullable) | Custo estimado em USD (se LLM) | `0.087` |

### Exemplo de Log Completo

```json
{
  "id": "exec_abc123",
  "organizacao_id": "org_xyz789",
  "projeto_id": "proj_001",
  "tipo_agente": "gerar_conteudo",
  "status": "sucesso",
  "entrada_json": {
    "conteudo_id": "cnt_007",
    "keyword": "seo local para restaurantes",
    "contexto_versao": 1
  },
  "saida_json": {
    "word_count": 2150,
    "h2_count": 7,
    "faq_count": 5,
    "score_estimado": 85
  },
  "erro_json": null,
  "tentativa": 1,
  "iniciado_em": "2026-04-23T10:30:00Z",
  "concluido_em": "2026-04-23T10:35:12Z",
  "duracao_ms": 312000,
  "tokens_entrada": 4200,
  "tokens_saida": 8500,
  "custo_estimado": 0.087
}
```

---

## Monitoramento

### Dashboard Interno de Jobs

O sistema deve ter um dashboard (acessivel somente por admin) mostrando:

| Metrica | Descricao | Alerta Se |
|---|---|---|
| Jobs em fila | Quantidade de jobs aguardando por fila | > 50 em qualquer fila |
| Jobs em execucao | Quantidade de jobs sendo processados | > workers disponiveis |
| Jobs falhados (24h) | Quantidade de falhas nas ultimas 24h | > 10 falhas |
| Jobs completados (24h) | Quantidade de sucessos nas ultimas 24h | - |
| Dead letter queue | Jobs que falharam todas as tentativas | > 0 |
| Tempo medio por tipo | Duracao media de cada tipo de job | > 2x do timeout esperado |
| Taxa de sucesso | % de jobs completados vs total | < 95% |
| Throughput | Jobs processados por hora | Queda > 50% |
| Latencia da fila | Tempo entre enqueue e inicio do processamento | > 5 min (fila_alta) |

### Alertas Automaticos

| Condicao | Severidade | Canal | Acao |
|---|---|---|---|
| Job na dead letter queue | CRITICA | Slack + Email | Admin investiga e reprocessa |
| Fila com > 50 jobs | ALTA | Slack | Verificar se workers estao rodando |
| Taxa de sucesso < 90% | ALTA | Slack + Email | Investigar causa raiz |
| `processar_pagamento` falhou | CRITICA | Slack + SMS | Acao imediata — impacto em receita |
| Tempo medio > 2x timeout | MEDIA | Slack | Otimizar prompts ou aumentar timeout |
| Redis sem conexao | CRITICA | Slack + SMS | Infraestrutura — nenhum job processa |

### Metricas por Tipo de Job

```
┌─────────────────────────────────────────────────────────────┐
│ JOB METRICS DASHBOARD                                       │
├──────────────────────┬──────┬──────┬──────┬─────┬───────────┤
│ Job Type             │ 24h  │ Avg  │ P95  │ Fail│ Success % │
├──────────────────────┼──────┼──────┼──────┼─────┼───────────┤
│ gerar_business_ctx   │  12  │  3s  │  8s  │  0  │   100%    │
│ gerar_estrategia     │  12  │ 45s  │ 90s  │  1  │    92%    │
│ gerar_briefing       │  36  │ 95s  │ 160s │  2  │    94%    │
│ gerar_conteudo       │  36  │ 180s │ 280s │  1  │    97%    │
│ revisar_conteudo     │   0  │  -   │  -   │  -  │     -     │
│ publicar_conteudo    │  30  │ 25s  │ 60s  │  3  │    90%    │
│ processar_pagamento  │   5  │  2s  │  5s  │  0  │   100%    │
│ enviar_email         │  48  │  1s  │  3s  │  0  │   100%    │
└──────────────────────┴──────┴──────┴──────┴─────┴───────────┘
```

---

## Tabela Relacionada: `execucoes_agentes`

Referencia da tabela no banco de dados (ver [[Entidades e Schema - Fase 2 (Conteudo e Publicacao)]] — Bloco A para schema completo):

```sql
CREATE TABLE execucoes_agentes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id  UUID NOT NULL REFERENCES organizacoes(id),
  projeto_id      UUID REFERENCES projetos(id),
  tipo_agente     TEXT NOT NULL,          -- enum dos job types
  status          TEXT NOT NULL DEFAULT 'pendente',  -- pendente, executando, sucesso, falha, timeout
  entrada_json    JSONB,                  -- payload de entrada
  saida_json      JSONB,                  -- resultado
  erro_json       JSONB,                  -- detalhes do erro
  tentativa       INTEGER DEFAULT 1,      -- numero da tentativa
  iniciado_em     TIMESTAMPTZ,            -- inicio da execucao
  concluido_em    TIMESTAMPTZ,            -- fim da execucao
  duracao_ms      INTEGER,                -- duracao calculada
  tokens_entrada  INTEGER,                -- tokens do prompt (se LLM)
  tokens_saida    INTEGER,                -- tokens da resposta (se LLM)
  custo_estimado  DECIMAL(10,4),          -- custo em USD (se LLM)
  criado_em       TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em   TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes para queries frequentes
CREATE INDEX idx_exec_org ON execucoes_agentes(organizacao_id);
CREATE INDEX idx_exec_projeto ON execucoes_agentes(projeto_id);
CREATE INDEX idx_exec_tipo ON execucoes_agentes(tipo_agente);
CREATE INDEX idx_exec_status ON execucoes_agentes(status);
CREATE INDEX idx_exec_criado ON execucoes_agentes(criado_em DESC);
```

---

## Dead Letter Queue (DLQ)

Jobs que falharam todas as tentativas vao para a Dead Letter Queue. Sao mantidos por 30 dias para investigacao.

### Processo de Tratamento da DLQ

1. **Alerta disparado** — admin recebe notificacao
2. **Investigacao** — admin checa `erro_json` e `entrada_json` na tabela `execucoes_agentes`
3. **Decisao**:
   - **Bug no codigo**: corrige, faz deploy, reprocessa manualmente
   - **API externa fora**: espera normalizar, reprocessa
   - **Dados invalidos**: corrige dados na origem, reprocessa
   - **Irrecuperavel**: marca como `cancelado`, notifica cliente se necessario
4. **Reprocessamento**: admin usa dashboard para re-enfileirar job com mesmos dados

---

## Notas Relacionadas

- [[Orquestracao]] — Fluxo completo de execucao dos agentes
- [[Eventos e Gatilhos]] — Eventos que disparam jobs
- [[Estados e Maquina de Estado]] — State machines do sistema
- [[Entidades e Schema - Fase 1 (Onboarding)]] — Modelo de dados do banco (porta de entrada; linka para Fase 2 e Fase 3)
- [[Arquitetura do Sistema]] — Visao geral da arquitetura
- [[Stack Tecnologica]] — Tecnologias usadas (BullMQ, Redis, etc.)
- [[Estrutura de Codigo]] — Organizacao do projeto
