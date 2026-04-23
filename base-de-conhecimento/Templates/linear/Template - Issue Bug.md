---
tipo: template
area: Operacao
tags: [linear, template, issue, bug]
atualizado: 2026-04-23
---

# Template — Issue Bug

## Instrucoes de uso

**Quando usar:** bugs, regressoes, comportamentos errados em producao ou desenvolvimento, falhas de integracao, quebras de contrato. Use este template **mesmo quando a causa ainda e desconhecida** — o fluxo de investigacao faz parte da issue.

**Como preencher:**
1. Substituir todos os placeholders `{{...}}` por conteudo real
2. Reproducao deve ser **passo-a-passo numerado**. Se nao consegue reproduzir, marcar "Nao reproduzido" e listar o que voce sabe
3. Esperado vs. Observado tem que ser **concreto** — nao "esta errado" e sim "deveria retornar X, retorna Y"
4. Hipoteses sao **provisorias** — revisitar e editar durante a investigacao
5. Criterios de aceite nascem `- [ ]`; marcar `- [x]` durante a execucao
6. Na hora de criar no Linear, copiar do "## Contexto" em diante (sem o frontmatter, sem estas instrucoes)

**Priority de bug:** se afeta producao ou cliente, **Urgent (1)**. Caminho critico bloqueado, **High (2)**. Caso contrario, **Medium (3)**.

**Regressao:** toda correcao de bug **deveria** virar teste de regressao (quando a stack permite). Se nao tem teste, justificar em "Regressao".

---

## Contexto

{{Onde e quando o bug acontece. Ambiente (producao, staging, local), componente afetado, frequencia, quando comecou (se souber).}}

## Reproducao

Passos minimos pra reproduzir:

1. {{Passo 1 — a partir de qual estado inicial}}
2. {{Passo 2 — acao concreta}}
3. {{Passo 3}}
4. {{Passo 4 — onde o bug aparece}}

**Frequencia:** {{sempre / intermitente / X de Y tentativas}}
**Ambiente onde foi visto:** {{producao / staging / local / navegador X / OS Y}}

## Comportamento esperado vs. observado

**Esperado:** {{descricao concreta do que deveria acontecer}}

**Observado:** {{descricao concreta do que acontece na pratica. Inclui mensagens de erro, stack trace, screenshots se aplicavel.}}

## Impacto

- **Quem afeta:** {{clientes finais, equipe interna, integracoes externas}}
- **Quantos:** {{escala — 1 cliente, 100 usuarios, todos}}
- **Severidade:** {{Critico (perda de dados ou bloqueio total) / Alto (funcionalidade core quebrada) / Medio (workaround existe) / Baixo (cosmetico)}}
- **Workaround disponivel:** {{sim — qual / nao}}

## Hipoteses

Causas provaveis em ordem de plausibilidade. Revisitar durante investigacao.

1. {{Hipotese 1 — com racional}}
2. {{Hipotese 2}}
3. {{Hipotese 3}}

## Criterios de Aceite

Marcar `- [x]` durante a execucao.

- [ ] Bug nao reproduz mais seguindo os passos de "Reproducao"
- [ ] Root cause identificada e registrada em comentario de marco
- [ ] Fix commitado com prefixo `BAI-X:` (regra 8 do SDP v2)
- [ ] Regressao coberta (ver secao abaixo)
- [ ] {{Criterio especifico do bug 1}}
- [ ] {{Criterio especifico do bug 2}}

## Regressao

{{Como garantir que este bug nao volta.}}

- **Teste automatizado:** {{sim — caminho / nao — justificar por que}}
- **Teste manual:** {{lista de passos ou checklist pra validar pos-fix}}
- **Monitoring/alertas:** {{se aplicavel — adicionar metrica, log estruturado, dashboard}}
