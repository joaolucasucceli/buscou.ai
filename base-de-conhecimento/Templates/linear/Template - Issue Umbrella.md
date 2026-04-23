---
tipo: template
area: Operacao
tags: [linear, template, issue, umbrella]
atualizado: 2026-04-23
---

# Template — Issue Umbrella

## Instrucoes de uso

**Quando usar:** quando uma entrega e grande demais pra caber em uma issue so, ou quando tem partes independentes que podem rodar em paralelo/sequencia, ou quando voce quer um ponto central pra ver progresso agregado. Ver **bloco 6 do SDP v2** no `CLAUDE.md` pra definicao completa.

**Como preencher:**
1. Substituir todos os placeholders `{{...}}` por conteudo real
2. Lista de sub-issues pode ser preenchida em duas etapas: primeiro titulos previstos, depois com IDs reais apos criar
3. Sub-issues nascem com `parentId` apontando pra esta umbrella — regra 5 do SDP v2
4. Criterios agregados marcar `- [x]` conforme cada sub-issue fecha
5. Na hora de criar no Linear, copiar do "## Contexto" em diante (sem o frontmatter, sem estas instrucoes)

**Fluxo da umbrella (regra 6 do SDP v2):**
- Nasce em **A fazer** com spec descrevendo as sub-issues a criar
- Move pra **Em andamento** quando a primeira sub-issue comeca
- Move pra **Revisao** quando **todas** as sub-issues estao em Revisao ou Concluido
- Move pra **Concluido** apos aprovacao do dono na umbrella

**Priority:** tipicamente High (caminho critico da entrega) ou Medium. Nunca Urgent direto — se ha urgencia pontual, cria sub-issue Urgent, umbrella fica High.

---

## Contexto

{{Por que este trabalho agregado existe. Qual problema justifica quebrar em sub-issues em vez de resolver em uma so. Resultado esperado no agregado.}}

## Objetivo

{{O que entregar quando todas as sub-issues fecharem. Uma frase.}}

## Escopo — Incluido

{{Lista concreta do que entra nesta umbrella. Cada bullet deve mapear pra pelo menos uma sub-issue planejada abaixo.}}

- {{Item 1}}
- {{Item 2}}
- {{Item 3}}

## Escopo — Excluido

Decisoes conscientes sobre o que **nao** entra nesta umbrella, pra prevenir "scope creep" e facilitar criar issues separadas depois.

- {{Item que fica fora 1 — com motivo}}
- {{Item que fica fora 2}}

## Sub-issues planejadas

Preencher com titulos previstos; editar com IDs reais (BAI-X) apos criar cada sub-issue com `parentId` apontando pra esta umbrella.

| ID | Titulo | Ordem | Dependencias |
|---|---|---|---|
| BAI-?? | {{Titulo sub 1}} | 1 | — |
| BAI-?? | {{Titulo sub 2}} | 2 | BAI-?? |
| BAI-?? | {{Titulo sub 3}} | 2 (paralelo) | — |
| BAI-?? | {{Titulo sub 4}} | 3 | BAI-?? |

## Criterios agregados de fechamento

Marcar `- [x]` conforme cada sub-issue fecha. A umbrella so vai pra Revisao quando **todas** estiverem marcadas.

- [ ] {{Sub-issue 1 (BAI-??) fechada}}
- [ ] {{Sub-issue 2 (BAI-??) fechada}}
- [ ] {{Sub-issue 3 (BAI-??) fechada}}
- [ ] {{Sub-issue 4 (BAI-??) fechada}}
- [ ] Dono aprovou esta umbrella em Revisao (regra 2 do SDP v2)

## Proximos passos possiveis (fora deste umbrella)

{{Trabalho adjacente que nasce do escopo mas fica pra outra umbrella/issue futura. Ajuda a fechar expectativa sem inflar este trabalho.}}

- {{Proximo passo 1}}
- {{Proximo passo 2}}
