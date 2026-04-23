# /agentes/prompts

Prompts operacionais por agente.

Convencao de arquivo: `agente-{nome}-v{versao}.md`.

Exemplos futuros:
- `agente-redator-v1.0.0.md`
- `agente-pesquisador-v1.0.0.md`
- `agente-revisor-v1.0.0.md`
- `agente-publicador-v1.0.0.md`
- `agente-monitor-v1.0.0.md`
- `agente-distribuidor-v1.0.0.md`

Cada prompt deve:
1. Importar contexto compartilhado de `../contexto/`.
2. Definir tarefa especifica.
3. Listar regras (linguagem, schema, tamanho).
4. Especificar output em JSON.

Referencia: [13 - Agentes/](../../base-de-conhecimento/13 - Agentes/) e [13 - Agentes/Prompts/](../../base-de-conhecimento/13 - Agentes/Prompts/).
