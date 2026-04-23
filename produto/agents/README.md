# /produto/agents

Implementacao dos agentes IA.

Agentes por fase (conforme [[Roadmap do Produto]]):

| Agente | Fase | Responsabilidade |
|---|---|---|
| Redator | MVP | Gera artigo 800-1.200 palavras otimizado SEO+AIO |
| Publicador | MVP | Publica no CMS do cliente com schema |
| Pesquisador | V1 | Identifica keywords e gaps do nicho |
| Revisor | V1 | QA do artigo antes de publicar |
| Monitor | V1 | Rastreia rankings + citacoes IA |
| Distribuidor | V2 | Republica em LinkedIn, Reddit, Medium |
| Suporte | V3 | Chatbot do cliente |

**Nao implementar:**
- Agente SDR (prospecao e manual no inicio, self-service depois).
- Agente Cobranca (pagamento e upfront, nao ha recorrencia).

Contexto dos prompts: [../../agentes/prompts/](../../agentes/prompts/).
Contexto compartilhado: [../../agentes/contexto/](../../agentes/contexto/).

Consulta obrigatoria:
- [13 - Agentes/](../../base-de-conhecimento/13 - Agentes/)
- [VERDADE_UNICA_BUSCOU.md](../../base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md)
