---
tipo: agente
area: Sistema
tags: [agente, pesquisador, pesquisa, serp, content-gap]
atualizado: 2026-04-22
---

# Agente Pesquisador

## Funcao

O Agente Pesquisador recebe um brief do [[Agente Estrategista]] e executa pesquisa profunda sobre o topico: analisa os top 10-20 resultados da SERP, extrai dados e estatisticas de fontes confiaveis, identifica content gaps (o que os concorrentes nao cobrem), coleta citacoes e fontes autoritativas, e monta um research pack completo que sera usado pelo [[Agente Redator]] para produzir conteudo superior ao que existe no mercado.

---

## Input

- **Content brief**: keyword principal, secundarias, intencao de busca, formato, angle diferenciador, word count target
- **Brief ID**: referencia unica para rastreamento no pipeline
- **Parametros de profundidade**: `quick` (top 5 resultados, 2 min), `standard` (top 10, 5 min), `comprehensive` (top 20 + fontes externas, 10 min)

## Output

- **Research pack** (JSON estruturado):
  - `serp_analysis`: titulo, URL, word count, headings, pontos fortes/fracos de cada resultado top 10
  - `content_gaps`: topicos que nenhum resultado cobre adequadamente
  - `statistics`: dados, numeros, pesquisas citaveis com fonte e data
  - `expert_quotes`: citacoes de especialistas do setor
  - `questions_paa`: People Also Ask extraidas da SERP
  - `sources`: lista de fontes autoritativas com URL e relevancia
  - `recommended_structure`: outline sugerido com H2s e H3s baseado na analise
  - `ai_overview_analysis`: o que o Google AI Overview mostra para esta query (se aplicavel)

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| **SerpApi / DataForSEO** | Extrair SERP completa: resultados organicos, PAA, featured snippets, AI Overview |
| **WebSearch (MCP tool)** | Busca complementar para estatisticas, dados recentes, fontes nao indexadas |
| **Ahrefs API** | Analisar metricas dos resultados (DR, backlinks, trafego estimado de cada URL) |
| **Claude Opus 4 API** | Analisar conteudo dos concorrentes, identificar gaps, sugerir estrutura |
| **Crawl API (Firecrawl/Jina)** | Extrair conteudo completo das paginas top 10 para analise |
| **MCP Tools** | `analyze_serp`, `extract_page_content`, `find_statistics`, `identify_gaps` |

---

## Gatilho

- **Orquestrador despacha**: apos [[Agente Estrategista]] entregar brief aprovado
- **Re-pesquisa**: [[Agente Revisor]] solicita dados adicionais para fortalecer conteudo
- **Atualizacao**: conteudo existente precisa de refresh (dados desatualizados detectados pelo [[Agente Monitor]])

---

## Criterios de Sucesso

- **Cobertura SERP**: analisar pelo menos 10 resultados organicos com conteudo extraido
- **Estatisticas encontradas**: minimo 5 dados/estatisticas citaveis com fonte confiavel (dominio com DR > 40)
- **Content gaps identificados**: pelo menos 3 topicos/angulos que concorrentes nao cobrem
- **PAA cobertas**: todas as perguntas People Also Ask mapeadas e incorporadas no outline
- **Fontes recentes**: > 60% das fontes publicadas nos ultimos 12 meses
- **AI Overview coberta**: se existe AI Overview para a query, analise do que a IA destaca

---

## Casos de Erro

1. **SERP sem resultados relevantes**: keyword muito nichada retorna resultados off-topic. Agente deve expandir busca com variantes da keyword e reportar ao Estrategista para reconsiderar.
2. **Paginas bloqueiam crawl**: paywall, anti-bot, CAPTCHA. Agente usa cache do Google ou Jina Reader como alternativa. Se > 50% bloqueados, reduz para analise de snippets.
3. **Estatisticas desatualizadas**: todas as fontes encontradas tem > 2 anos. Agente marca dados como "verificar atualidade" e busca fontes primarias (pesquisas, relatorios).
4. **Timeout de crawl**: pagina leva > 30s para carregar. Agente pula e continua com proximos resultados. Registra URL para retry posterior.
5. **Conteudo em idioma diferente**: SERP retorna mix de portugues e ingles. Agente deve priorizar fontes em portugues e traduzir dados relevantes de fontes em ingles.

---

## Fallback

- **SerpApi falha**: usar WebSearch como fonte primaria + cache de SERPs anteriores para a mesma keyword.
- **Crawl API falha**: analisar apenas snippets da SERP (titulo, descricao, URL) + cached versions.
- **Claude API indisponivel**: salvar SERP data bruto e enfileirar analise para quando API voltar. Pipeline pausa neste estagio.
- **Pesquisa insuficiente** (< 5 fontes): estender busca para queries relacionadas, usar Google Scholar para fontes academicas.

---

## Dependencias

- **Depende de**: [[Orquestrador]] (despacho), [[Agente Estrategista]] (brief), SerpApi, Ahrefs API, Crawl API
- **Quem depende dele**: [[Agente Redator]] (recebe research pack), [[Agente Revisor]] (pode solicitar re-pesquisa)
- **Referencia**: [[Palavras-Chave e Intencao de Busca]], [[Framework SEO Completo]]

---

## Exemplo de Execucao

**Cenario**: Brief recebido para "Melhor software de gestao financeira 2026"

```
1. [08:08] Orquestrador despacha brief:
   { keyword: "melhor software gestao financeira 2026", formato: "melhor-x",
     secundarias: ["erp financeiro", "sistema gestao financeira empresa"],
     word_count: 3000, depth: "comprehensive" }

2. [08:08] Pesquisador consulta SerpApi:
   - Top 10 resultados extraidos (titulo, URL, posicao, features)
   - PAA: "Qual o melhor sistema financeiro?", "Quanto custa um ERP?", 
     "ContaAzul e bom?", "Como escolher software financeiro?"
   - AI Overview: presente, cita ContaAzul, Omie e Bling

3. [08:09] Pesquisador crawla top 10 via Firecrawl:
   - #1: "10 Melhores ERPs 2026" - 4.200 palavras, 12 H2s, sem dados comparativos
   - #2: "ContaAzul vs Omie" - 2.800 palavras, foco em 2 ferramentas apenas
   - #3: "Guia ERP Financeiro" - 3.500 palavras, sem precos atualizados
   → GAPS: nenhum tem tabela comparativa com precos, nenhum cobre integracao 
     com IA, nenhum testa usabilidade real

4. [08:12] Pesquisador busca estatisticas:
   - "72% das PMEs que adotam ERP reduzem custos em 20%" (FGV, 2025)
   - "Mercado de SaaS financeiro no Brasil: R$4.2bi em 2026" (Gartner)
   - "43% das empresas trocam de ERP nos primeiros 2 anos" (Panorama PME)

5. [08:14] Claude Opus 4 analisa e gera research pack:
   { serp_analysis: [...], content_gaps: ["tabela comparativa com precos reais",
     "integracoes com IA/automacao", "teste de usabilidade hands-on"],
     statistics: [...], recommended_structure: [...], paa: [...] }

6. [08:15] Research pack salvo e despachado para Redator via Orquestrador
```

**Tempo total**: 7 minutos. **Custo**: ~$0.30.

---

## Custo Estimado por Execucao

| Componente | Custo |
|---|---|
| SerpApi (1-2 queries) | ~$0.05 |
| Firecrawl (10 paginas) | ~$0.10 |
| Claude Opus 4 (~15k tokens input, ~5k output) | ~$0.12 |
| Ahrefs API (metricas dos 10 resultados) | ~$0.03 |
| **Total por pesquisa** | **~$0.25-0.35** |

---

## Notas Relacionadas

- [[Arquitetura de Agentes]]
- [[Orquestrador]]
- [[Agente Estrategista]]
- [[Agente Redator]]
- [[Palavras-Chave e Intencao de Busca]]
- [[Framework SEO Completo]]
- [[Content Clustering e Pillar Pages]]
