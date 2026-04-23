---
tipo: template
area: Operacao
tags: [linear, template, issue, feature]
atualizado: 2026-04-23
---

# Template — Issue Feature

## Instrucoes de uso

**Quando usar:** features novas, melhorias incrementais, refatoracao, producao de documentacao/conteudo canonico, alteracoes em identidade visual, sistema, agentes ou marca. Enfim, todo trabalho substantivo que **nao** e correcao de defeito.

**Como preencher:**
1. Substituir todos os placeholders `{{...}}` por conteudo real
2. Deletar secoes opcionais se nao se aplicam (marcadas com `[opcional]`)
3. Preencher **sempre** Contexto, Objetivo, Requisitos e Criterios de Aceite — sao obrigatorios
4. Criterios de aceite nascem `- [ ]`; marcar `- [x]` **durante a execucao** conforme cada criterio e batido (regra 4 do SDP v2)
5. Na hora de criar no Linear, copiar do "## Contexto" em diante (sem o frontmatter, sem estas instrucoes)

**Antes de criar:** checar se ja existe issue parecida. Duplicar issue gera ruido.

**Ao criar:** ver regra de Priority no `CLAUDE.md` (secao "Fluxo de Execucao (SDP v2)", bloco 7). Default razoavel e **Medium** se nao tiver certeza.

**Se for gerar sub-issues:** use o `Template - Issue Umbrella.md` em vez deste.

---

## Contexto

{{Por que esta issue existe. Qual problema ou oportunidade justifica o trabalho. Situacao atual e o que mudaria com a entrega.}}

## Objetivo

{{O que queremos alcancar em uma ou duas frases. Resultado esperado, nao a tarefa em si.}}

## Requisitos

{{Lista concreta do que precisa ser entregue. Pode ser bullets, numerado, ou secoes com subtitulo se o escopo e grande.}}

- {{Requisito 1}}
- {{Requisito 2}}
- {{Requisito 3}}

## Criterios de Aceite

Marcar `- [x]` durante a execucao conforme cada criterio e batido.

- [ ] {{Criterio 1 — observavel e testavel}}
- [ ] {{Criterio 2}}
- [ ] {{Criterio 3}}
- [ ] Comentario de fechamento na issue com resumo do entregue (regra DoD global)

## Dependencias

{{Outras issues que precisam ser concluidas antes. Inputs externos (decisao do dono, dado de cliente, API externa). Se nao ha, escrever "Nenhuma".}}

## Proximos Passos [opcional]

{{Trabalho que nasce desta issue mas fica fora do escopo atual. Ajuda a fechar o loop sem inflar esta issue.}}

- {{Proximo passo 1}}
- {{Proximo passo 2}}
