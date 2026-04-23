# /produto/agents

Implementacao dos 11 agentes V1 + orquestrador.

## Agentes por fase

| Agente | Fase | Responsabilidade |
|---|---|---|
| Pesquisador | MVP | SERP, keywords, gaps, perguntas frequentes |
| Estrategista | MVP | Clusters, calendario editorial (90/mes) |
| Redator | MVP | Artigos 800-1.200 palavras, answer-first |
| Revisor | MVP | Score SEO + AIO + originalidade (min 75) |
| Publicador | MVP | Publica no CMS, sitemap, indexacao GSC |
| Pagamento | MVP | Confirma webhook gateway, monitora parcelas 12x |
| Visual | V1 | Capa (Unsplash V1 / DALL-E V1.1) + alt text |
| Monitor | V1 | Ranking, trafego, citacoes em IA |
| Distribuidor | V1.2 | RSS/sitemap (V1) + LinkedIn/Medium (V1.2) + Reddit (V2) |
| Suporte | V1.2 | Chatbot FAQ + escalacao humana |
| Prospeccao | V1.2 | Outbound (e-mail + LinkedIn). Leva a landing. Nao qualifica BANT |

**Orquestrador:** coordena todos via MCP. Presente desde o MVP.

---

## Descontinuados (nao implementar)

- ~~Agente SDR~~ — substituido por **Prospeccao** (modelo venda unica nao tem BANT nem reuniao obrigatoria).
- ~~Agente Cobranca~~ — substituido por **Pagamento** (compra unica, nao recorrente).

Detalhes do porque em [13 - Agentes/Arquitetura de Agentes.md](../../base-de-conhecimento/13 - Agentes/Arquitetura de Agentes.md) e [Decision Log - 2026-04-23](../../base-de-conhecimento/05 - Modelo de Negocio/Decision Log - 2026-04-23.md).

---

## Contexto

- **Prompts operacionais:** [../../agentes/prompts/](../../agentes/prompts/).
- **Contexto compartilhado** (verdade-unica, icp, oferta, tom-de-voz, linguagem): [../../agentes/contexto/](../../agentes/contexto/).

Todo agente consome o snapshot de `agentes/contexto/` antes de executar. Snapshots sao sincronizados com a verdade canonica em [00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md](../../base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md).

---

## Consulta obrigatoria

- [13 - Agentes/](../../base-de-conhecimento/13 - Agentes/) — design completo
- [VERDADE_UNICA_BUSCOU.md](../../base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md) — canonico
