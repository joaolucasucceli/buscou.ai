# /produto/pipeline

Orquestrador do motor de geracao. Coordena agentes em filas.

Stack: BullMQ + Redis.

Fluxo padrao (simplificado):
1. Cron diario (3x ao dia por cliente ativo) → enfileira job `gerar-artigo`.
2. Worker pega job → chama Agente Pesquisador → Agente Redator → Agente Revisor → Agente Publicador.
3. Publicador publica no CMS do cliente (produto/cms).
4. Monitor roda semanalmente para calcular IVT.

Consulta obrigatoria:
- [09 - Execucao/00 - Pipeline.md](../../base-de-conhecimento/09 - Execucao/00 - Pipeline.md)
- [12 - Sistema/Orquestracao.md](../../base-de-conhecimento/12 - Sistema/Orquestracao.md)
- [12 - Sistema/Jobs.md](../../base-de-conhecimento/12 - Sistema/Jobs.md)
- [13 - Agentes/Orquestrador.md](../../base-de-conhecimento/13 - Agentes/Orquestrador.md)
