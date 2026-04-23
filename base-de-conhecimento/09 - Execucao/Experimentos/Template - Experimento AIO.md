---
tipo: template
area: AIO
tags: [template, experimento, teste, aio]
atualizado: 2026-04-22
---

# Template: Experimento AIO

Use este template para documentar cada experimento de otimizacao para IA. Duplique esta nota para cada novo experimento e preencha os campos. O objetivo e criar um registro sistematico do que funciona e do que nao funciona para ser citado por plataformas de IA.

Para contexto sobre como IAs buscam e selecionam fontes, consulte [[Como IAs Buscam e Citam Conteudo]] e [[Otimizacao para ChatGPT e Perplexity]].

---

## Experimento #{{numero}}: {{titulo}}

**Data de inicio**: {{data_inicio}}
**Data de medicao**: {{data_medicao}}
**Responsavel**: {{nome}}
**Cliente/Projeto**: {{cliente}}
**Status**: [ ] Planejado | [ ] Em execucao | [ ] Concluido | [ ] Cancelado

---

## Hipotese

> O que acreditamos que vai funcionar e por que.
> 
> Formato sugerido: "Se fizermos [acao], entao [resultado esperado], porque [justificativa baseada em dados/teoria]."
>
> Exemplo: "Se adicionarmos FAQPage schema e reescrevermos o conteudo em formato answer-first, entao a pagina sera citada pelo Perplexity em prompts sobre [tema], porque o Perplexity prioriza conteudo estruturado com respostas diretas."

{{hipotese}}

---

## Setup

### URL / Conteudo Testado

| Item | Detalhe |
|---|---|
| URL da pagina | {{url}} |
| Tipo de conteudo | [ ] Artigo | [ ] Pagina de produto | [ ] FAQ | [ ] Landing page | [ ] Outro |
| DA/DR do dominio | {{da_dr}} |
| Trafego organico atual | {{trafego}} visitas/mes |
| Posicao media no Google | {{posicao}} |

### Mudancas Realizadas (Antes vs Depois)

| Elemento | Antes | Depois |
|---|---|---|
| Title tag | {{antes}} | {{depois}} |
| Meta description | {{antes}} | {{depois}} |
| Estrutura de headers | {{antes}} | {{depois}} |
| Formato do conteudo | {{antes}} | {{depois}} |
| Schema markup | {{antes}} | {{depois}} |
| llms.txt | {{antes}} | {{depois}} |
| Links internos | {{antes}} | {{depois}} |
| Citacoes/fontes no texto | {{antes}} | {{depois}} |
| Outro: {{elemento}} | {{antes}} | {{depois}} |

### Plataformas Alvo

- [ ] ChatGPT (OAI-SearchBot)
- [ ] Perplexity (PerplexityBot)
- [ ] Google AI Overviews (Googlebot)
- [ ] Gemini (Google-Extended)
- [ ] Claude (ClaudeBot)

---

## Prompts de Teste

Listar os prompts exatos usados para testar. Usar os mesmos prompts antes e depois para comparacao valida.

| # | Prompt | Categoria |
|---|---|---|
| 1 | "melhor {{produto}} em {{local}}" | Recomendacao |
| 2 | "vale a pena {{produto/servico}}?" | Avaliacao |
| 3 | "como fazer {{acao relacionada}}" | How-to |
| 4 | "{{marca A}} vs {{marca B}}" | Comparativo |
| 5 | "recomendacao de {{categoria}} para {{perfil}}" | Recomendacao |
| 6 | "o que e {{conceito do nicho}}" | Educacional |
| 7 | "{{marca do cliente}} e bom?" | Reputacao |
| 8 | "onde comprar {{produto}} {{local}}" | Transacional |
| 9 | "problemas com {{tema}}" | Dor/Problema |
| 10 | "{{pergunta especifica do nicho}}" | Nicho |

---

## Resultado Antes (Baseline)

**Data do teste**: {{data_baseline}}

| # | Prompt | ChatGPT | Perplexity | AI Overviews | Gemini | Claude |
|---|---|---|---|---|---|---|
| 1 | "melhor..." | [ ] Citou | [ ] Citou | [ ] Citou | [ ] Citou | [ ] Citou |
| 2 | "vale a pena..." | [ ] Citou | [ ] Citou | [ ] Citou | [ ] Citou | [ ] Citou |
| 3 | "como fazer..." | [ ] Citou | [ ] Citou | [ ] Citou | [ ] Citou | [ ] Citou |
| 4 | "X vs Y..." | [ ] Citou | [ ] Citou | [ ] Citou | [ ] Citou | [ ] Citou |
| 5 | "recomendacao..." | [ ] Citou | [ ] Citou | [ ] Citou | [ ] Citou | [ ] Citou |

**Total de citacoes baseline**: {{X}} de {{Y}} possiveis ({{Z%}})

---

## Resultado Depois

**Data do teste**: {{data_resultado}}
**Dias apos implementacao**: {{dias}}

| Plataforma | Citou? | Quantos Prompts | Posicao Media | Contexto da Citacao |
|---|---|---|---|---|
| ChatGPT | [ ] Sim [ ] Nao | {{X}}/10 | {{posicao}} | {{como citou}} |
| Perplexity | [ ] Sim [ ] Nao | {{X}}/10 | {{posicao}} | {{como citou}} |
| Google AI Overviews | [ ] Sim [ ] Nao | {{X}}/10 | {{posicao}} | {{como citou}} |
| Gemini | [ ] Sim [ ] Nao | {{X}}/10 | {{posicao}} | {{como citou}} |
| Claude | [ ] Sim [ ] Nao | {{X}}/10 | {{posicao}} | {{como citou}} |

**Total de citacoes apos mudanca**: {{X}} de {{Y}} possiveis ({{Z%}})

### Comparativo

| Metrica | Antes | Depois | Variacao |
|---|---|---|---|
| Total de citacoes | {{X}} | {{Y}} | {{+/-Z}} |
| Citacoes ChatGPT | {{X}} | {{Y}} | {{+/-Z}} |
| Citacoes Perplexity | {{X}} | {{Y}} | {{+/-Z}} |
| Citacoes AI Overviews | {{X}} | {{Y}} | {{+/-Z}} |
| Posicao media de citacao | {{X}} | {{Y}} | {{+/-Z}} |

---

## Analise

### O que funcionou

- {{insight_1}}
- {{insight_2}}
- {{insight_3}}

### O que NAO funcionou

- {{insight_1}}
- {{insight_2}}

### Fatores externos que podem ter influenciado

- {{fator_1}} (ex: atualizacao de algoritmo, sazonalidade, concorrente publicou conteudo novo)

---

## Aprendizados

> Insights acionaveis que podem ser aplicados em outros projetos/clientes.

1. {{aprendizado_1}}
2. {{aprendizado_2}}
3. {{aprendizado_3}}

**Regra geral extraida**: {{regra}}

---

## Impacto no Negocio

| Metrica | Antes | Depois | Variacao |
|---|---|---|---|
| Trafego organico (pagina) | {{X}} | {{Y}} | {{+/-Z%}} |
| Trafego referral de IA | {{X}} | {{Y}} | {{+/-Z%}} |
| Leads gerados | {{X}} | {{Y}} | {{+/-Z}} |
| Conversoes/vendas | {{X}} | {{Y}} | {{+/-Z}} |

---

## Proximo Passo

> O que testar em seguida com base nos aprendizados deste experimento.

- [ ] {{proximo_experimento_1}}
- [ ] {{proximo_experimento_2}}
- [ ] {{proximo_experimento_3}}

**Proximo experimento relacionado**: [[Template - Experimento AIO|Experimento #{{proximo_numero}}]]

---

## Notas Relacionadas

- [[Playbook - Aparecer na IA em 30 Dias]]
- [[Como IAs Buscam e Citam Conteudo]]
- [[Otimizacao para ChatGPT e Perplexity]]
- [[Google AI Overviews]]
- [[Schema Markup para IA]]
- [[llms.txt e Acessibilidade para Crawlers IA]]
- [[Otterly.ai]]
- [[LLMrefs]]
- [[Framework AIO Completo]]
