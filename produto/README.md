# /produto — codigo da aplicacao buscou.ai

> Camada de codigo do produto. A base de conhecimento em [base-de-conhecimento/04 - Produto/](../base-de-conhecimento/04 - Produto/) define O QUE construir. Aqui mora O CODIGO.

**Antes de codar qualquer coisa, ler obrigatoriamente:**
- [VERDADE_UNICA_BUSCOU.md](../base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md)
- [04 - Produto/Roadmap do Produto.md](../base-de-conhecimento/04 - Produto/Roadmap do Produto.md)
- [04 - Produto/Requisitos Produto Autonomo.md](../base-de-conhecimento/04 - Produto/Requisitos Produto Autonomo.md)

---

## Estrutura

| Pasta | Responsabilidade |
|---|---|
| `frontend/` | App Next.js. Dashboard do cliente + pagina de venda + onboarding. |
| `backend/` | API, autenticacao, multi-tenant, logica de negocio (Supabase + API Routes). |
| `pipeline/` | Orquestrador do motor de geracao (filas, jobs, estado). |
| `agents/` | Implementacao dos agentes IA (Redator, Publicador, Pesquisador, Revisor, Monitor, etc.). |
| `cms/` | Servico que hospeda N blogs de clientes (multi-tenant). |
| `integracoes/` | Clientes de APIs externas (Ahrefs, GSC, Otterly, Anthropic, OpenAI, Stripe/Mercado Pago). |

---

## Principios

- **Tokens primeiro.** Frontend consome `identidade-visual/index.css` — nunca hardcode cor/spacing/radius.
- **Componentes do DS.** Reusar [identidade-visual/components/](../identidade-visual/components/) — nao duplicar.
- **Multi-tenant nativo.** 1 backend serve N clientes. N blogs frontend (instancias separadas ou subdominio).
- **Pagamento unico.** Nao modelar assinatura. Stripe/Mercado Pago so para checkout pontual.
- **Nome da marca:** sempre `buscou.ai` em textos visuais, `BuscouAI` em textos juridicos.

---

## Stack alvo

Conforme [12 - Sistema/Stack Tecnologica.md](../base-de-conhecimento/12 - Sistema/Stack Tecnologica.md):

- Frontend: Next.js 14+ (App Router).
- Backend: Supabase (Postgres + Auth + Storage) + API Routes.
- Filas: BullMQ.
- LLM: Claude Sonnet 4.6 (primario), Haiku 4.5 (simples), Opus 4.7 (revisao final raro).
- Deploy: Vercel + Workers dedicados (V2+).
- Pagamento: Pix + Mercado Pago (a vista) + Stripe ou MP (cartao parcelado).

---

## Ordem de construcao (ver [[Roadmap do Produto]])

| Fase | Foco |
|---|---|
| MVP (M1-2) | agents/redator + frontend/dashboard basico + cms/template + pipeline minimo + integracoes de pagamento |
| V1 (M3-4) | + agents/pesquisador + agents/revisor + backend/multi-tenant + frontend/onboarding |
| V2 (M5-8) | + agents/monitor + agents/distribuidor + cms multi-tenant completo + frontend self-service |
| V3 (M9-12) | + agents/suporte + renovacao anual + white-label + frontend v3 |

---

## O que NAO implementar

- Nao implementar Agente SDR (modelo e self-service + prospecao manual do fundador no inicio).
- Nao implementar Agente Cobranca de assinatura (pagamento e upfront, nao ha recorrencia a cobrar).
- Nao criar tiers/planos no backend (a oferta e unica: R$ 2.500 / R$ 3.000).
- Nao implementar dashboard com MRR/ARR (sao metricas de SaaS com assinatura, que nao e o modelo).
