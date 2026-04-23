# /produto — codigo da aplicacao buscou.ai

> Camada de codigo do produto. A base de conhecimento em [base-de-conhecimento/04 - Produto/](../base-de-conhecimento/04 - Produto/) define O QUE construir. Aqui mora O CODIGO.

**Antes de codar qualquer coisa, ler obrigatoriamente:**
- [VERDADE_UNICA_BUSCOU.md](../base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md)
- [04 - Produto/Roadmap do Produto.md](../base-de-conhecimento/04 - Produto/Roadmap do Produto.md)
- [04 - Produto/Requisitos Produto Autonomo.md](../base-de-conhecimento/04 - Produto/Requisitos Produto Autonomo.md)
- [13 - Agentes/Arquitetura de Agentes.md](../base-de-conhecimento/13 - Agentes/Arquitetura de Agentes.md)

---

## Estrutura

| Pasta | Responsabilidade |
|---|---|
| `frontend/` | App Next.js. Dashboard do cliente + landing de venda + onboarding. |
| `backend/` | API, autenticacao, multi-tenant, logica de negocio (Supabase + API Routes). |
| `pipeline/` | Orquestrador do motor (filas, jobs, state machine). |
| `agents/` | Implementacoes dos 11 agentes V1 + orquestrador. |
| `cms/` | Hospedagem multi-tenant dos blogs dos clientes. |
| `integracoes/` | Clientes de APIs externas (Ahrefs, GSC, Otterly, Anthropic, OpenAI, Stripe/Asaas). |

---

## Principios

- **Tokens primeiro.** Frontend consome `identidade-visual/index.css` — nunca hardcode cor/spacing/radius.
- **Componentes do DS.** Reusar [identidade-visual/components/](../identidade-visual/components/) — nao duplicar.
- **Multi-tenant nativo.** 1 backend serve N clientes. Isolamento via RLS no Postgres.
- **Pagamento unico.** Stripe/Asaas em modo `payment` (nao `subscription`). Sem MRR no dashboard interno.
- **Nome da marca:** sempre `buscou.ai` em textos visuais, `BuscouAI` em textos juridicos.

---

## Stack alvo

Conforme [12 - Sistema/Stack Tecnologica.md](../base-de-conhecimento/12 - Sistema/Stack Tecnologica.md):

- **Frontend:** Next.js 15 (App Router).
- **Backend:** Supabase (Postgres + Auth + Storage) + API Routes.
- **Filas:** BullMQ + Redis.
- **LLM:** Claude Sonnet 4 (operacional), Claude Opus (cognitivo: Estrategista, Redator, Revisor).
- **Deploy:** Vercel + Workers dedicados (ECS em escala).
- **Pagamento:** Stripe (cartao parcelado) + Asaas (Pix BR).

---

## 11 agentes V1 + Orquestrador

Ver [13 - Agentes/Arquitetura de Agentes.md](../base-de-conhecimento/13 - Agentes/Arquitetura de Agentes.md) para detalhes.

### 6 core (bloqueadores do MVP)

| Agente | Responsabilidade |
|---|---|
| Pesquisador | SERP, keywords, gaps, perguntas frequentes |
| Estrategista | Clusters, calendario editorial (90 artigos/mes) |
| Redator | Artigos 800-1.200 palavras, answer-first |
| Revisor | Score SEO + AIO + originalidade (min 75) |
| Publicador | Publica no CMS, sitemap, indexacao GSC |
| Monitor | Rastreia ranking, trafego, citacoes em IA |

### 5 complementares (V1 completa)

| Agente | Responsabilidade | Fase |
|---|---|---|
| Visual | Capa + alt text. V1: Unsplash. V1.1+: DALL-E 3 | V1 (simples) / V1.1 (DALL-E) |
| Distribuidor | RSS + sitemap (V1); LinkedIn + Medium (V1.2); Reddit (V2) | V1 tecnico / V1.2 social |
| Suporte | Chatbot FAQ + escalacao humana | V1.2 |
| Prospeccao | Outbound (e-mail + LinkedIn). Nao qualifica BANT — leva a landing | V1.2 |
| Pagamento | Confirma webhook do gateway, monitora parcelas 12x. Nao e cobranca recorrente | V1 |

### Coordenacao

| Componente | Responsabilidade |
|---|---|
| Orquestrador | Coordena todos via MCP, gerencia filas, aplica retries |

**Agentes antigos (descartados em 2026-04-23):**
- ~~Agente SDR~~ — substituido por **Prospeccao** (outbound, sem BANT, sem reuniao obrigatoria).
- ~~Agente Cobranca~~ — substituido por **Pagamento** (dois fluxos: implementacao one-time ou 12x + infra mensal R$ 300 recorrente a partir do mes 2).

---

## Ordem de construcao (conforme Roadmap do Produto)

| Fase | Foco |
|---|---|
| MVP (M1-2) | 5 agentes core (Pesquisador, Estrategista, Redator, Revisor, Publicador) + [[Agente Pagamento]] + frontend basico (dashboard + landing) + cms/template + pipeline minimo |
| V1 completa (M3-4) | + Agente Visual + Agente Monitor completo + onboarding self-service + backend multi-tenant |
| V1.2 (M5-6) | + Agente Distribuidor (LinkedIn/Medium) + Agente Suporte (chatbot) + Agente Prospeccao (outbound automatizado) |
| V2 (M7-12) | + White-label + API publica + expansao internacional + modulos adicionais |

---

## O que NAO implementar

- Nao criar tiers/planos no backend (a oferta e unica: implementacao + infra mensal).
- Nao implementar "plano mensal de servico" — a infra mensal R$ 300 e passthrough de custo (tokens/APIs/hospedagem).
- Nao implementar BANT/qualificacao automatica (modelo e self-service).
- Nao implementar agentes legados SDR/Cobranca com comportamento antigo.

## O que implementar no Pagamento (duas linhas)

- Checkout da implementacao (a vista via Pix/cartao OU parcelado 12x no cartao com juros do cliente).
- Subscription recorrente da infra R$ 300/mes, agendada para D+30 (mes 1 incluso na implementacao).
- Smart retry em falhas; 3 falhas consecutivas da infra pausam o motor (Orquestrador).
- Dashboard com as duas linhas visiveis (status da implementacao + status da infra).
