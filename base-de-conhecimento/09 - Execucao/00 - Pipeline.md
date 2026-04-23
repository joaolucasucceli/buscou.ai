---
tipo: playbook
area: Ambos
tags: [pipeline, execucao, metodo, sistema, operacional]
atualizado: 2026-04-22
---

# Pipeline de Execucao - Sistema Operacional SEO + AIO

> Este e o coracao do projeto. Nao e uma nota — e o METODO. Cada etapa tem input, processo, output e ferramentas. Siga na ordem. Repita para cada nicho/cliente.

---

## Visao Geral do Pipeline

```
NICHO → KEYWORDS → CLUSTERS → CONTEUDO → PUBLICACAO → 
INTERLINKING → INDEXACAO → TESTE IA → DISTRIBUICAO → ITERACAO
```

| Etapa | Tempo | Input | Output |
|---|---|---|---|
| 1. Escolha do Nicho | 2-4h | Pesquisa de mercado | Nicho validado |
| 2. Pesquisa de Keywords | 4-8h | Nicho definido | Lista de 50-200 keywords |
| 3. Clusterizacao | 2-4h | Lista de keywords | Topic clusters mapeados |
| 4. Criacao de Conteudo | 4-8h/artigo | Clusters + briefs | Artigos otimizados |
| 5. Publicacao | 1-2h/artigo | Conteudo pronto | Paginas publicadas |
| 6. Interlinking | 1-2h | Paginas publicadas | Rede de links internos |
| 7. Indexacao | 30min | Paginas no ar | Paginas no indice do Google |
| 8. Teste em IA | 2-4h | Paginas indexadas | Baseline de citacoes IA |
| 9. Distribuicao | 3-5h/semana | Conteudo publicado | Mencoes externas |
| 10. Iteracao | Continuo | Dados de performance | Otimizacoes |

---

## Etapa 1: Escolha do Nicho

**Input**: Pesquisa de mercado, [[ICP - Cliente Ideal]]
**Processo**:
1. Listar 5-10 nichos potenciais
2. Para cada um, avaliar (1-5):
   - Volume de busca no nicho
   - Competicao (quanto menor, melhor para comecar)
   - Monetizacao (ticket medio do cliente)
   - Seu conhecimento/interesse
   - Oportunidade AIO (quanto menos concorrentes em IA, melhor)
3. Calcular score total e escolher top 1-2
**Output**: Nicho validado, registrado em [[Nichos Testados]]
**Ferramentas**: [[Google Trends e Keyword Planner]], [[Ahrefs]], [[SEMrush]]

## Etapa 2: Pesquisa de Keywords

**Input**: Nicho definido
**Processo**:
1. Seed keywords (10-20 termos raiz do nicho)
2. Expandir com ferramentas (50-200 keywords)
3. Classificar por intencao: informacional, comercial, transacional
4. Priorizar por: volume x dificuldade x intencao
5. Identificar keywords que IA responde (testar prompts)
**Output**: Planilha de keywords priorizada
**Ferramentas**: [[Ahrefs]], [[SEMrush]], [[Google Trends e Keyword Planner]], [[Palavras-Chave e Intencao de Busca]]
**Registro**: [[Palavras-Chave Dominadas]]

## Etapa 3: Clusterizacao

**Input**: Lista de keywords
**Processo**:
1. Agrupar keywords por topico (clusters de 5-15 keywords)
2. Identificar pillar page para cada cluster
3. Mapear cluster pages de suporte
4. Definir hierarquia de links internos
5. Criar calendario de producao
**Output**: Mapa de clusters com pillar + cluster pages
**Ferramentas**: [[Surfer SEO]], [[Ahrefs]]
**Referencia**: [[Content Clustering e Pillar Pages]]

## Etapa 4: Criacao de Conteudo

**Input**: Clusters + briefs de conteudo
**Processo**:
1. Criar brief (keyword alvo, intencao, estrutura, concorrentes)
2. Escrever conteudo com formato answer-first
3. Otimizar: headers H1-H3, meta title, meta description
4. Adicionar schema markup relevante
5. Incluir estatisticas, dados, citacoes
6. Formatar para IA: pull quotes, listas, tabelas
**Output**: Artigos otimizados para SEO + AIO
**Ferramentas**: [[Surfer SEO]], [[Rank Math e Yoast]]
**Referencia**: [[On-Page SEO]], [[Schema Markup para IA]]

## Etapa 5: Publicacao

**Input**: Conteudo pronto
**Processo**:
1. Revisar formatacao, links, imagens
2. Configurar URL slug otimizada
3. Adicionar schema markup (JSON-LD)
4. Publicar
5. Verificar pagina no mobile
**Output**: Paginas publicadas e funcionando

## Etapa 6: Interlinking

**Input**: Paginas publicadas
**Processo**:
1. Linkar cluster pages → pillar page
2. Linkar pillar page → cluster pages
3. Linkar entre clusters relacionados
4. Verificar que nenhuma pagina esta orfao (sem links)
5. Usar anchor text descritivo e variado
**Output**: Rede de links internos solida
**Referencia**: [[Content Clustering e Pillar Pages]], [[On-Page SEO]]

## Etapa 7: Indexacao

**Input**: Paginas no ar
**Processo**:
1. Submeter URLs no [[Google Search Console]] (Inspecao de URL)
2. Verificar indexacao apos 24-48h
3. Se nao indexou: verificar robots.txt, canonical, noindex
4. Submeter sitemap atualizado
5. Garantir que AI crawlers tem acesso ([[llms.txt e Acessibilidade para Crawlers IA]])
**Output**: Paginas no indice do Google e acessiveis para IAs

## Etapa 8: Teste em IA

**Input**: Paginas indexadas (aguardar 1-2 semanas)
**Processo**:
1. Criar lista de 10-20 prompts relevantes ao conteudo
2. Testar em cada plataforma: ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude
3. Documentar: citou? qual URL? em que posicao?
4. Comparar com concorrentes
5. Identificar gaps e oportunidades
**Output**: Baseline de citacoes IA
**Ferramentas**: [[Otterly.ai]], [[LLMrefs]], [[HubSpot AEO]]
**Registro**: [[Queries que Rankeamos]], [[Template - Experimento AIO]]
**Referencia**: [[Como IA Escolhe Respostas]]

## Etapa 9: Distribuicao

**Input**: Conteudo publicado
**Processo**:
1. Publicar resumo/adaptacao no LinkedIn
2. Postar no Reddit (subreddits relevantes)
3. Publicar versao no Medium
4. Responder perguntas no Quora com link
5. Buscar oportunidades de guest post
6. Digital PR e outreach
**Output**: Mencoes e backlinks de fontes externas
**Referencia**: [[11 - Distribuicao/]] (pasta completa)

## Etapa 10: Iteracao

**Input**: Dados de performance (2-4 semanas apos publicacao)
**Processo**:
1. Verificar rankings no [[Google Search Console]]
2. Verificar citacoes em IA (retestar prompts)
3. Atualizar conteudo que nao esta performando
4. Expandir conteudo que esta performando bem
5. Adicionar novos clusters baseado em oportunidades
6. Documentar resultados em [[Dashboard de Resultados]]
**Output**: Otimizacoes implementadas, metricas atualizadas

---

## Metricas do Pipeline

| Metrica | Meta Semanal | Meta Mensal |
|---|---|---|
| Artigos publicados | 2-3 | 8-12 |
| Keywords no Top 10 | +2-5 | +10-20 |
| Citacoes em IA ganhas | +1-3 | +5-10 |
| Backlinks conquistados | 1-2 | 5-10 |
| Posts de distribuicao | 3-5 | 15-20 |

---

## Como Usar Este Pipeline

- **Para voce**: Siga etapa por etapa no seu projeto/blog
- **Para cliente**: Adapte e use como onboarding ([[Playbook - Cliente Novo em 30 Dias]])
- **Para equipe**: Use como treinamento e SOP (Standard Operating Procedure)
- **Para venda**: Mostre o metodo no [[Script de Vendas]] como diferencial

---

## Notas Relacionadas

- [[MOC - Execucao]] - Mapa completo de execucao
- [[Playbook - Aparecer na IA em 30 Dias]]
- [[Framework SEO Completo]]
- [[Framework AIO Completo]]
- [[Checklist Operacional]]
