---
tipo: marketing
area: Conteudo
tags: [marketing, tipos-conteudo, formatos]
atualizado: 2026-04-23
---

# Tipos de Conteudo

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. Este documento define os formatos de artigo usados pelo [[Agente Redator]] — no blog proprio (dog-fooding) e no blog dos clientes.

Relacionado: [[Funil Completo]] | [[Estrategia de Conteudo Autonomo]] | [[Framework SEO Completo]] | [[Framework AIO Completo]] | [[Agente Redator]]

---

## Regras gerais (todos os formatos)

- Tamanho: 800-1.200 palavras (conforme [[VERDADE_UNICA_BUSCOU]] secao 4).
- **Answer-first:** primeira resposta direta em ate 100 palavras.
- Estrutura: H1 unica, H2 por secao, H3 para sub-itens.
- Schema JSON-LD obrigatorio (minimo Article + FAQPage quando aplicavel).
- Meta description < 155 caracteres.
- Alt text em toda imagem.
- Linguagem alinhada com [[Tom de Voz e Marketing]] e [[VERDADE_UNICA_BUSCOU]] secao 6.

---

## TOFU — atracao (intent informacional)

### 1. How-to ("Como fazer X")

| Aspecto | Detalhe |
|---|---|
| Template | Problema → contexto → passo-a-passo → resultado esperado → FAQ |
| Keywords-alvo | "como aparecer no ChatGPT", "como melhorar SEO local", "como escolher clinica de estetica" |
| Schema | `HowTo` + `Article` + `FAQPage` (ver [[Schema Markup para IA]]) |
| AIO | Passos numerados, respostas diretas em cada H2, citacoes de fontes |
| Exemplo | "Como sua clinica pode aparecer nas buscas por estetica na sua cidade" |

### 2. Listicle ("X melhores Y")

| Aspecto | Detalhe |
|---|---|
| Template | Introducao → lista numerada com descricao + pros/contras → conclusao → FAQ |
| Keywords-alvo | "melhores imobiliarias em SP", "top advogados trabalhistas RJ" |
| Schema | `ItemList` + `Article` + `FAQPage` |
| AIO | Cada item com descricao auto-contida (IAs extraem itens individuais), dados concretos |
| Exemplo | "7 tecnologias que ajudam advogados a conseguir clientes em 2026" |

### 3. Glossario / conceito ("O que e X")

| Aspecto | Detalhe |
|---|---|
| Template | Definicao → como funciona → por que importa → exemplos → conceitos relacionados |
| Keywords-alvo | "o que e AIO", "o que e SEO local", "o que e busca por voz" |
| Schema | `DefinedTerm` + `Article` + `FAQPage` |
| AIO | Definicao clara no primeiro paragrafo (IAs adoram definicoes), linguagem acessivel |
| Exemplo | "AIO: o que e e por que seu negocio precisa aparecer nas IAs" |

---

## MOFU — consideracao (intent comercial/comparativo)

### 4. Comparativo ("X vs Y")

| Aspecto | Detalhe |
|---|---|
| Template | Visao geral de cada → tabela comparativa → analise por criterio → veredicto → para quem e melhor |
| Keywords-alvo | "agencia SEO vs tecnologia", "contratar agencia ou ferramenta", "Google Ads vs SEO" |
| Schema | `Article` + `Table` + `FAQPage` |
| AIO | Tabela comparativa (IAs extraem tabelas), veredicto claro e citavel |
| Exemplo | "Agencia de marketing vs tecnologia propria: qual entrega mais ROI?" |

### 5. Review / analise ("Vale a pena X?")

| Aspecto | Detalhe |
|---|---|
| Template | O que e → para quem → preco → pros/contras → alternativas → veredicto |
| Keywords-alvo | "vale a pena contratar agencia de SEO", "consultor SEO vs plataforma" |
| Schema | `Review` + `Article` |
| AIO | Opiniao clara com dados de suporte, pros/contras em lista, recomendacao inequivoca |

### 6. Case study

| Aspecto | Detalhe |
|---|---|
| Template | Situacao → desafio → solucao → resultados com numeros → aprendizados |
| Keywords-alvo | "caso de sucesso SEO local", "resultado de aparicao em AI" |
| Schema | `Article` + `Organization` |
| AIO | Numeros concretos (IAs priorizam dados quantitativos), metodologia clara |
| Exemplo | [[Case Proprio como Prova]] — nossos proprios numeros |

---

## BOFU — decisao (intent transacional)

### 7. Calculadora / ferramenta

| Aspecto | Detalhe |
|---|---|
| Formato | Ferramenta interativa (React component no Next.js) |
| Input | Faturamento, trafego, ticket medio |
| Output | Estimativa de impacto organico |
| CTA | "Ver oferta da buscou.ai" → landing com checkout |
| Schema | `WebApplication` |

### 8. Landing / oferta

A landing buscou.ai tem pagina unica. Nao existe "pagina de pricing com tabela de tiers" — o modelo e unico: **implementacao + infra mensal**. Ver [[Site Publico]] e [[Oferta Comercial]].

Estrutura da landing:
1. Hero com frase central: "Se alguem buscou, quem apareceu foi voce?"
2. Resumo do produto: Blog + Motor = 90 conteudos/mes.
3. Como funciona (3-4 passos do onboarding ao primeiro sinal).
4. Prova (dog-fooding: nosso proprio blog).
5. Oferta em duas linhas:
   - Implementacao: R$ 2.500 a vista ou R$ 3.000 em 12x de R$ 250.
   - Infra mensal: R$ 300/mes a partir do mes 2 (mes 1 incluso na implementacao).
   - Checkout.
6. FAQ com perguntas-chave sobre a infra ("E uma assinatura? Nao — e passthrough de tokens/APIs. E se eu parar de pagar? Motor pausa, blog fica no ar").
7. CTA secundario: "Ainda com duvida? Agende 20 min com nosso time."

---

## Matriz de priorizacao

| Tipo | Esforco | Impacto SEO | Impacto AIO | Prioridade |
|---|---|---|---|---|
| How-to | Medio | Alto | Alto | 1 |
| Glossario | Baixo | Alto | Muito alto | 2 |
| Comparativo | Medio | Alto | Alto | 3 |
| Listicle | Baixo | Medio | Alto | 4 |
| Case study | Alto | Medio | Alto | 5 |
| Review | Medio | Medio | Medio | 6 |

Comecamos com conteudo informacional de alto volume (TOFU) para construir autoridade tematica, depois expandimos para MOFU/BOFU conforme o trafego cresce. Ver [[Palavras-Chave e Intencao de Busca]].

---

## Notas relacionadas

- [[Funil Completo]]
- [[Estrategia de Conteudo Autonomo]]
- [[Clusterizacao Automatica]]
- [[Distribuicao Automatica]]
- [[Framework SEO Completo]]
- [[Framework AIO Completo]]
- [[Schema Markup para IA]]
- [[Content Clustering e Pillar Pages]]
- [[Agente Redator]]

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 6 — ultima verificacao 2026-04-23.*
