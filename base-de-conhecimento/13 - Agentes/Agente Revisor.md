---
tipo: agente
area: Sistema
tags: [agente, revisor, qualidade, fact-check, eeat, plagio]
atualizado: 2026-04-22
---

# Agente Revisor

## Funcao

O Agente Revisor e o gate de qualidade do pipeline de conteudo. Ele recebe o draft do [[Agente Redator]] e executa uma bateria de verificacoes: SEO score (keyword density, NLP terms, headers), AIO score (answer-first, citabilidade por LLMs, schema markup), fact-checking (dados/estatisticas vs. fontes), plagio (originalidade), gramatica, e conformidade com [[E-E-A-T]]. Se aprovado, envia para o [[Agente Publicador]]. Se reprovado, retorna feedback estruturado para o Redator.

---

## Input

- **Draft do artigo**: markdown completo com metadata SEO e schema markup sugerido
- **Research pack original**: para cross-reference de fatos e fontes
- **Content brief**: para verificar se o conteudo atende ao que foi planejado
- **Brand voice guide**: para verificar tom e voz
- **Checklist de qualidade**: criterios minimos de [[Auditoria SEO - Checklist]]

## Output

- **Veredicto**: `APPROVED`, `REVISION_NEEDED`, ou `REJECTED`
- **Score card** (JSON):
  - `seo_score`: 0-100 (Surfer SEO)
  - `aio_score`: 0-100 (answer-first, pull quotes, citabilidade, schema)
  - `originality_score`: 0-100 (% original)
  - `grammar_score`: 0-100 (erros gramaticais/1000 palavras)
  - `eeat_score`: 0-100 (fontes, expertise, dados, perspectiva pratica)
  - `fact_check_score`: 0-100 (dados verificados vs. total de claims)
- **Feedback estruturado**: lista de issues com localizacao (paragrafo/secao), severidade (critico/importante/sugestao), e acao sugerida
- **Artigo aprovado**: versao final com seal de qualidade para publicacao

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| **Surfer SEO API** | SEO score, NLP terms, keyword density, content length analysis |
| **Copyscape API / Plagio detector** | Verificar originalidade contra web (threshold: < 5% similaridade) |
| **Claude Opus 4 API** | Fact-checking via cross-reference com research pack, analise E-E-A-T, analise de citabilidade AIO |
| **LanguageTool API** | Verificacao gramatical em portugues (concordancia, acentuacao, pontuacao) |
| **Schema Validator** (Google Rich Results Test API) | Validar JSON-LD gerado pelo Redator |
| **MCP Tools** | `check_seo`, `check_plagiarism`, `fact_check`, `validate_schema`, `score_aio` |

---

## Gatilho

- **Orquestrador despacha**: apos [[Agente Redator]] entregar draft completo
- **Re-revisao**: apos Redator reescrever com base no feedback anterior
- **Revisao de conteudo existente**: [[Agente Monitor]] detecta queda e solicita re-avaliacao de qualidade

---

## Criterios de Sucesso

- **Tempo de revisao**: < 10 minutos por artigo (incluindo todas as verificacoes)
- **Precisao de fact-check**: 0% de dados falsos passam pela revisao (zero tolerance)
- **Taxa de aprovacao**: > 70% dos drafts aprovados na primeira submissao (indica qualidade do Redator)
- **Falsos positivos**: < 5% de rejeicoes incorretas (rejeitar conteudo que estava bom)
- **Threshold de aprovacao**:
  - SEO score >= 80
  - AIO score >= 75
  - Originalidade >= 95%
  - Grammar score >= 90
  - E-E-A-T score >= 70
  - Fact-check score >= 95%

---

## Casos de Erro

1. **Dado falso nao detectado**: Claude nao encontra a estatistica no research pack mas tambem nao flagra como inventada. Safeguard: regra explicita — se dado nao tem fonte no research pack, marcar como `UNVERIFIED`.
2. **Surfer API retorna score inconsistente**: keyword muito nichada sem dados suficientes no Surfer. Fallback: usar checklist manual de SEO on-page ([[Auditoria SEO - Checklist]]) via Claude.
3. **Plagio detector falso positivo**: trechos comuns (ex: definicoes, termos tecnicos) marcados como plagio. Agente deve diferenciar entre plagio real e linguagem tecnica padrao.
4. **Loop de rejeicao**: Redator nao consegue atingir score minimo apos 3 tentativas. Agente escala para humano com historico completo de feedback.
5. **Schema invalido**: JSON-LD gerado pelo Redator tem erros de sintaxe ou campos obrigatorios faltando. Agente corrige automaticamente antes de rejeitar o draft inteiro.

---

## Fallback

- **Surfer API falha**: executar checklist SEO manual via Claude (keyword no titulo? H1? Primeiro paragrafo? Densidade? Headers? Internal links?). Resultado menos preciso mas funcional.
- **Plagio detector falha**: aprovar condicionalmente com flag "PLAGIARISM_UNCHECKED" — humano revisa antes de publicar.
- **Claude API falha**: usar regras estaticas pre-definidas (regex para keyword density, contagem de headers, verificacao de schema via JSON parser). Funciona para 60% das verificacoes.
- **Todos os checks falham**: pausar pipeline, notificar equipe, manter draft em fila para revisao quando ferramentas voltarem.

---

## Dependencias

- **Depende de**: [[Orquestrador]] (despacho), [[Agente Redator]] (draft), Surfer SEO API, Copyscape API, Claude Opus 4
- **Quem depende dele**: [[Agente Publicador]] (recebe artigo aprovado), [[Agente Redator]] (recebe feedback para reescrita)
- **Referencia**: [[E-E-A-T]], [[Auditoria SEO - Checklist]], [[On-Page SEO]], [[Schema Markup para IA]]

---

## Exemplo de Execucao

**Cenario**: Revisar draft "Melhor software de gestao financeira 2026"

```
1. [08:26] Orquestrador despacha draft (3.200 palavras) + research pack + brief

2. [08:26] Revisor executa verificacoes em paralelo:

   a) Surfer SEO API:
      - Content score: 87/100 ✓
      - NLP terms: 23/28 presentes ✓
      - Keyword density: 1.2% (ideal: 1-2%) ✓

   b) Copyscape API:
      - Originalidade: 97% ✓
      - Trechos similares: 2 frases genericas (definicoes) — ignorar

   c) LanguageTool:
      - 3 erros encontrados: 1 concordancia, 2 virgulas
      - Grammar score: 94/100 ✓

   d) Claude Opus 4 — Fact-check:
      - 8 claims com dados verificados vs research pack
      - 7/8 confirmados ✓
      - 1 estatistica sem fonte no research pack → marcada UNVERIFIED

   e) Claude Opus 4 — AIO analysis:
      - Answer-first: SIM, paragrafo 1 responde diretamente ✓
      - Pull quotes: 4 encontrados ✓
      - Schema FAQ: 6 perguntas, JSON-LD valido ✓
      - Citabilidade: frases claras, dados inline ✓
      - AIO score: 83/100 ✓

   f) Claude Opus 4 — E-E-A-T:
      - Fontes autoritativas citadas: 5 ✓
      - Perspectiva pratica: analise hands-on presente ✓
      - Expertise demonstrada: comparacao tecnica detalhada ✓
      - E-E-A-T score: 78/100 ✓

3. [08:31] Revisor gera score card:
   { seo: 87, aio: 83, originality: 97, grammar: 94, eeat: 78, fact_check: 87 }

4. [08:31] Veredicto: REVISION_NEEDED
   Feedback: [
     { secao: "paragrafo 7", severidade: "critico", 
       issue: "Estatistica '65% das PMEs...' sem fonte no research pack",
       acao: "Remover ou buscar fonte confiavel" },
     { secao: "geral", severidade: "importante",
       issue: "3 erros gramaticais", acao: "Corrigir concordancia e virgulas" }
   ]

5. [08:31] Feedback enviado para Redator via Orquestrador
```

**Tempo total**: 5 minutos. **Custo**: ~$0.15.

---

## Custo Estimado por Execucao

| Componente | Custo |
|---|---|
| Surfer SEO API (1 check) | ~$0.03 |
| Copyscape (1 verificacao, ~3k palavras) | ~$0.03 |
| Claude Opus 4 (fact-check + AIO + E-E-A-T, ~12k tokens) | ~$0.08 |
| LanguageTool (1 verificacao) | ~$0.01 |
| **Total por revisao** | **~$0.12-0.18** |

---

## Notas Relacionadas

- [[Arquitetura de Agentes]]
- [[Orquestrador]]
- [[Agente Redator]]
- [[Agente Publicador]]
- [[E-E-A-T]]
- [[Auditoria SEO - Checklist]]
- [[On-Page SEO]]
- [[Schema Markup para IA]]
