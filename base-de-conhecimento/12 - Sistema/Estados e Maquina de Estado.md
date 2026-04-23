---
tipo: sistema
area: Arquitetura
tags: [sistema, estados, state-machine, workflow]
atualizado: 2026-04-22
---

# Estados e Maquinas de Estado

Todas as entidades com ciclo de vida complexo usam maquinas de estado explicitas. Transicoes sao validadas no banco (CHECK constraints) e na camada de aplicacao (Edge Functions). Transicoes invalidas sao rejeitadas silenciosamente.

---

## ContentPiece — Pipeline de Conteudo

A maquina de estado mais critica do sistema. Cada content_piece passa por todo o pipeline automaticamente, orquestrado pelos agentes.

```
                    ┌───────────────────────────────────────────────────┐
                    │                                                   │
                    ▼                                                   │
  ┌────────┐   ┌───────────┐   ┌────────┐   ┌────────┐   ┌────────┐  │
  │ queued  │──▶│researching│──▶│briefed │──▶│writing │──▶│written │  │
  └────────┘   └───────────┘   └────────┘   └────────┘   └────────┘  │
                                                              │        │
                                                              ▼        │
                                                         ┌──────────┐  │
                                                         │reviewing │  │
                                                         └────┬─────┘  │
                                                  ┌───────────┤        │
                                                  ▼           ▼        │
                                           ┌──────────┐ ┌──────────┐  │
                                           │ approved │ │ revision │──┘
                                           └─────┬────┘ │ _needed  │
                                                 │      └──────────┘
                                                 ▼
                                           ┌───────────┐
                                           │publishing │
                                           └─────┬─────┘
                                                 ▼
                                           ┌───────────┐
                                           │ published │
                                           └─────┬─────┘
                                                 ▼
                                           ┌───────────┐
                                           │monitoring │
                                           └───────────┘
```

### Tabela de Transicoes — ContentPiece

| De | Para | Gatilho | Agente | Condicoes | Efeitos Colaterais |
|---|---|---|---|---|---|
| `queued` | `researching` | Job de pesquisa inicia | Pesquisador | Cluster definido | Cria agent_job tipo pesquisador |
| `researching` | `briefed` | Pesquisa concluida | Pesquisador | Research data preenchido | Cria content_brief, enfileira escrita |
| `briefed` | `writing` | Job de escrita inicia | Redator | Brief existe | Cria agent_job tipo redator |
| `writing` | `written` | Escrita concluida | Redator | content preenchido, word_count > 0 | Calcula seo_score, enfileira revisao |
| `written` | `reviewing` | Job de revisao inicia | Revisor | Conteudo existe | Cria agent_job tipo revisor |
| `reviewing` | `approved` | Revisao aprova | Revisor | seo_score >= 70, aio_score >= 60 | Enfileira publicacao |
| `reviewing` | `revision_needed` | Revisao rejeita | Revisor | Score abaixo do limiar | Registra feedback, incrementa revision_count |
| `revision_needed` | `writing` | Re-escrita inicia | Redator | revision_count < 3 | Re-enfileira com feedback do revisor |
| `approved` | `publishing` | Job de publicacao inicia | Publicador | wp_url configurado no projeto | Cria agent_job tipo publicador |
| `publishing` | `published` | Publicacao confirmada | Publicador | wp_post_id preenchido | Seta published_at, enfileira distribuicao |
| `published` | `monitoring` | Distribuicao concluida | Distribuidor | published_url acessivel | Agenda monitoramento periodico |

**Regra de seguranca**: Se `revision_count >= 3`, o conteudo e escalado para revisao humana (admin) em vez de re-entrar no loop automatico.

---

## AgentJob — Ciclo de Vida de Jobs

```
  ┌────────┐   ┌──────────┐   ┌─────────┐   ┌───────────┐
  │ queued  │──▶│ assigned │──▶│ running │──▶│ completed │
  └────────┘   └──────────┘   └────┬────┘   └───────────┘
                                   │
                                   ▼
                              ┌────────┐
                              │ failed │
                              └───┬────┘
                     ┌────────────┤
                     ▼            ▼
               ┌──────────┐  ┌───────┐
               │ retrying │  │ dead  │
               └─────┬────┘  └───────┘
                     │
                     ▼
               ┌─────────┐   ┌───────────┐
               │ running │──▶│ completed │
               └─────────┘   └───────────┘
```

### Tabela de Transicoes — AgentJob

| De | Para | Gatilho | Condicoes | Efeitos |
|---|---|---|---|---|
| `queued` | `assigned` | Worker pega o job do BullMQ | Worker disponivel | Seta started_at, registra worker_id |
| `assigned` | `running` | Worker inicia execucao | Claude SDK conectado | Cria agent_run |
| `running` | `completed` | Execucao com sucesso | Output valido | Seta completed_at, atualiza output, dispara evento |
| `running` | `failed` | Erro na execucao | Exception ou timeout | Registra error, incrementa retry_count |
| `failed` | `retrying` | Auto-retry | retry_count < max_retries (3) | Re-enfileira com backoff exponencial |
| `failed` | `dead` | Max retries atingido | retry_count >= max_retries | Notifica admin, registra no log |
| `retrying` | `running` | Worker reinicia execucao | Worker disponivel | Cria nova agent_run |
| `queued` | `cancelled` | Cancelamento manual | Admin cancela | Remove do BullMQ |

**Backoff exponencial**: retry 1 = 5s, retry 2 = 25s, retry 3 = 125s (5^n segundos).

---

## Organization — Ciclo de Assinatura

```
  ┌───────┐   ┌────────┐   ┌──────────┐   ┌────────┐
  │ trial │──▶│ active │──▶│ past_due │──▶│ paused │
  └───────┘   └────┬───┘   └─────┬────┘   └───┬────┘
                   │             │             │
                   │             │             ▼
                   │             │        ┌─────────┐
                   │             └───────▶│ churned │
                   │                      └────┬────┘
                   │                           │
                   │                           ▼
                   │                     ┌─────────────┐
                   └─────────────────────│ reactivated │
                                         └─────────────┘
```

### Tabela de Transicoes — Organization

| De | Para | Gatilho | Efeitos |
|---|---|---|---|
| `trial` | `active` | Stripe `checkout.session.completed` | Ativa limites do plano pago, remove trial_ends_at |
| `trial` | `churned` | trial_ends_at expirado sem conversao | Pausa todos os projetos, envia email de win-back |
| `active` | `past_due` | Stripe `invoice.payment_failed` | Ativa [[Agente Cobranca]], envia WhatsApp |
| `past_due` | `active` | Stripe `invoice.paid` | Desativa cobranca, reativa projetos |
| `past_due` | `paused` | 15 dias sem pagamento | Pausa todos os agentes, dashboard read-only |
| `paused` | `churned` | 30 dias sem pagamento | Arquiva projetos, para todos os jobs |
| `churned` | `reactivated` | Novo pagamento via Stripe | Reativa projetos, retoma pipeline |
| `reactivated` | `active` | Primeira invoice paga apos reativacao | Normaliza status |

---

## Project — Ciclo de Vida do Projeto

```
  ┌───────┐   ┌─────────────┐   ┌────────┐
  │ setup │──▶│ configuring │──▶│ active │
  └───────┘   └─────────────┘   └───┬────┘
                                    │
                              ┌─────┴─────┐
                              ▼           ▼
                         ┌────────┐  ┌───────────┐
                         │ paused │  │ completed │
                         └───┬────┘  └───────────┘
                             │
                             ▼
                         ┌────────┐
                         │ active │
                         └────────┘
```

| De | Para | Gatilho | Efeitos |
|---|---|---|---|
| `setup` | `configuring` | Projeto criado | Abre wizard de configuracao |
| `configuring` | `active` | Wizard concluido (domain, GSC, nicho) | Dispara keyword research via [[Agente Estrategista]] |
| `active` | `paused` | Admin pausa ou org.status = paused | Para todos os jobs do projeto |
| `paused` | `active` | Admin reativa ou org volta a active | Re-enfileira jobs pendentes |
| `active` | `completed` | Todos os clusters marcados como complete | Muda para modo somente monitoramento |

---

## Validacao de Transicoes no Codigo

```typescript
// Exemplo de validacao no Edge Function
const VALID_TRANSITIONS: Record<string, string[]> = {
  'queued': ['researching'],
  'researching': ['briefed'],
  'briefed': ['writing'],
  'writing': ['written'],
  'written': ['reviewing'],
  'reviewing': ['approved', 'revision_needed'],
  'revision_needed': ['writing'],
  'approved': ['publishing'],
  'publishing': ['published'],
  'published': ['monitoring'],
};

function canTransition(from: string, to: string): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}
```

Ver [[Eventos e Gatilhos]] para os eventos disparados em cada transicao.
Ver [[Entidades e Schema]] para os CHECK constraints no banco.
