# /agentes — prompts e contexto dos agentes IA

> Camada de prompts + contexto compartilhado dos agentes IA.
> A **implementacao** dos agentes mora em [`../produto/agents/`](../produto/agents/).
> O **design** dos agentes mora em [`../base-de-conhecimento/13 - Agentes/`](../base-de-conhecimento/13 - Agentes/).
> Aqui moram os prompts operacionais + contexto.

**Antes de escrever qualquer prompt, ler obrigatoriamente:**
- [VERDADE_UNICA_BUSCOU.md](../base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md)
- [13 - Agentes/Arquitetura de Agentes.md](../base-de-conhecimento/13 - Agentes/Arquitetura de Agentes.md)

---

## Estrutura

| Pasta | Responsabilidade |
|---|---|
| `prompts/` | Prompts operacionais por agente (agente-redator.md, agente-pesquisador.md, etc.). |
| `contexto/` | Contexto compartilhado que todo agente recebe: VERDADE_UNICA, ICP, oferta, tom de voz, linguagem proibida. |

---

## Como funciona

Quando um agente e chamado:

1. Recebe **contexto compartilhado** de `contexto/`:
   - posicionamento (de VERDADE_UNICA)
   - ICP (do cliente ativo + nicho)
   - oferta (para mencao correta em CTAs dentro do conteudo)
   - tom de voz (direto, com numeros, sem termos proibidos)
   - linguagem proibida/permitida
2. Recebe o **prompt especifico** do agente de `prompts/`:
   - agente-redator → "escreva artigo 800-1.200 palavras sobre X"
   - agente-revisor → "valide schema + answer-first"
3. Executa.

Agentes sao coerentes com a marca por construcao — o contexto obriga.

---

## Principios dos prompts

- **Citar VERDADE_UNICA no system prompt** — toda geracao ancora na verdade canonica.
- **Incluir linguagem proibida** — o agente sabe o que NAO escrever.
- **Exemplos concretos** — poucos mas literais (few-shot com 1-2 exemplos canonicos).
- **Output estruturado** — JSON com `titulo`, `slug`, `corpo_markdown`, `schema_jsonld`, `meta_description`.
- **Versionamento semantico** — v1.0.0 inicial, bump minor em tweaks, major em mudanca de objetivo.

---

## Exemplo de prompt

```markdown
# Prompt: Agente Redator v1.0.0

## Contexto compartilhado
(carregado automaticamente de /contexto/)

## Tarefa
Escreva um artigo de 800-1.200 palavras sobre "{keyword}" para o cliente "{cliente_slug}".

## Regras
- Answer-first: primeira resposta em <100 palavras.
- Nicho: {nicho} (seguir tom especifico do nicho se aplicavel).
- Schema obrigatorio: {tipo_schema}.
- Incluir CTA mencionando a oferta do cliente {cliente_cta}.
- Linguagem permitida/proibida: ver /contexto/linguagem.md.

## Output
JSON com:
- titulo
- slug
- meta_description (<155 chars)
- corpo_markdown
- schema_jsonld
- keywords_alvo
```
