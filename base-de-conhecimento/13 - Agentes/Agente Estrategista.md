---
tipo: agente
area: Sistema
tags: [agente, estrategista, keywords, topic-clusters, calendario-editorial]
atualizado: 2026-04-22
---

# Agente Estrategista

## Funcao

O Agente Estrategista analisa o nicho do cliente, pesquisa o cenario competitivo, define topic clusters com pillar pages e supporting content, prioriza keywords por potencial de ranking (dificuldade vs. volume vs. intencao), e monta o calendario editorial semanal/mensal. Ele transforma dados brutos de ferramentas SEO em um plano de acao estruturado que alimenta o [[Agente Pesquisador]].

---

## Input

- **Dados do cliente**: nicho, URL do site, concorrentes conhecidos, objetivos de negocio
- **Job do Orquestrador**: `{ tipo: "create_strategy", cliente_id, periodo: "mensal" }`
- **Dados de ferramentas**: export Ahrefs (keywords do dominio, backlinks, gaps), Google Trends (sazonalidade)
- **Historico**: conteudos ja produzidos, keywords ja rankeadas (de [[Palavras-Chave Dominadas]])

## Output

- **Topic cluster map**: JSON estruturado com pillar page + 8-15 supporting pages, interlinks planejados
- **Keyword priority list**: keywords ordenadas por score composto (volume x dificuldade^-1 x intencao_comercial x gap_competitivo)
- **Content brief**: para cada peca de conteudo: keyword principal, secundarias, intencao, formato ([[Melhor X]], [[Como Fazer X]], [[X vs Y]]), word count target, fontes sugeridas
- **Calendario editorial**: cronograma semanal com 3-5 artigos, respeitando cadencia de publicacao

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| **Ahrefs API** | Keywords Explorer (volume, KD, CPC), Content Gap, Site Explorer (backlinks), SERP overview |
| **Google Trends API** | Sazonalidade de keywords, trending topics, comparacao de termos |
| **Claude Opus 4 API** | Analise estrategica, priorizacao, geracao de briefs detalhados |
| **SERP API (SerpApi/DataForSEO)** | Analise de SERP features (featured snippets, PAA, AI Overview) para cada keyword |
| **PostgreSQL** | Armazenar clusters, briefs, historico de keywords |
| **MCP Tools** | `analyze_niche`, `create_cluster`, `prioritize_keywords`, `generate_brief`, `build_calendar` |

---

## Gatilho

- **Onboarding de cliente novo**: [[Orquestrador]] dispara apos [[Checklist Onboarding Cliente]] ser concluido
- **Ciclo mensal**: cron no 1o dia util do mes para replanejar calendario
- **Demanda ad-hoc**: equipe solicita estrategia para keyword/topico especifico
- **Alerta do Monitor**: [[Agente Monitor]] detecta oportunidade (keyword com queda de concorrente) e aciona replanejamento

---

## Criterios de Sucesso

- **Cobertura de cluster**: cada pillar page tem pelo menos 8 supporting pages mapeadas
- **Qualidade do keyword scoring**: > 70% das keywords priorizadas como "alta prioridade" atingem top 10 em 90 dias
- **Brief completeness**: todo brief contem keyword principal, 3-5 secundarias, intencao, formato, word count, e angle diferenciador
- **Calendario realista**: producao diaria nao excede capacidade (3-5 artigos/dia)
- **Aprovacao do brief**: > 90% dos briefs sao aceitos pelo Pesquisador sem necessidade de revisao

---

## Casos de Erro

1. **Ahrefs API retorna dados insuficientes**: nicho muito pequeno ou keyword muito longa tem volume zero. Fallback: usar Google Trends + analise manual de SERP para estimar demanda.
2. **Cluster sobreposto**: duas pillar pages competem pela mesma keyword (canibalização). Agente deve detectar via analise de SERP overlap e consolidar.
3. **Sazonalidade nao considerada**: keyword "presentes natal" planejada para marco. Agente deve cruzar com Google Trends e ajustar timing.
4. **Concorrente com dominio muito forte**: DR 80+ para todas keywords do cluster. Agente deve recalcular priorizando long-tail e keywords informacionais.
5. **Dados desatualizados**: cache de keywords com mais de 30 dias. Agente deve forcar refresh dos dados antes de gerar estrategia.

---

## Fallback

- **Ahrefs API indisponivel**: usar cache local de keywords (atualizado semanalmente) + Google Trends como fonte primaria temporaria.
- **Claude API falha**: gerar brief basico usando template pre-definido com apenas keyword principal e formato — [[Agente Pesquisador]] compensa com pesquisa mais profunda.
- **Brief rejeitado pelo Pesquisador**: Estrategista recebe feedback estruturado e regenera com ajustes. Maximo 2 iteracoes antes de escalonar para humano.

---

## Dependencias

- **Depende de**: [[Orquestrador]] (despacho), Ahrefs API, Google Trends, [[ICP - Cliente Ideal]] (nicho), [[Palavras-Chave Dominadas]] (historico)
- **Quem depende dele**: [[Agente Pesquisador]] (recebe briefs), [[Agente Monitor]] (verifica keywords planejadas)
- **Referencia**: [[Content Clustering e Pillar Pages]], [[Framework SEO Completo]], [[Palavras-Chave e Intencao de Busca]]

---

## Exemplo de Execucao

**Cenario**: Novo cliente "TechSolutions" (SaaS de gestao financeira) — criar estrategia do 1o mes

```
1. [08:00] Orquestrador despacha: { tipo: "create_strategy", cliente: "techsolutions", 
   nicho: "software gestao financeira", url: "techsolutions.com.br" }

2. [08:01] Estrategista consulta Ahrefs API:
   - Site Explorer: DR 25, 1.2k keywords organicas, 89 backlinks
   - Content Gap vs top 3 concorrentes: 340 keywords faltando
   - Keywords Explorer: filtra por KD < 30, volume > 500

3. [08:03] Estrategista consulta Google Trends:
   - "gestao financeira empresa" = tendencia crescente +15% YoY
   - "erp financeiro" = estavel, sazonalidade em jan/fev (planejamento anual)

4. [08:04] Claude Opus 4 analisa e define cluster principal:
   PILLAR: "Gestao Financeira para Empresas: Guia Completo 2026"
   SUPPORTING:
   - "Melhor software de gestao financeira 2026" (Melhor X)
   - "Como fazer fluxo de caixa empresarial" (Como Fazer X)
   - "ContaAzul vs Omie vs Bling" (X vs Y)
   - "Vale a pena contratar ERP financeiro" (Vale a Pena X)
   - ... (8 paginas totais)

5. [08:06] Estrategista gera calendario:
   Semana 1: Pillar page + 2 supporting
   Semana 2: 3 supporting
   Semana 3: 3 supporting + 1 atualizacao
   Semana 4: 2 supporting + link building interno

6. [08:07] Output salvo em PostgreSQL, briefs despachados via Orquestrador
```

**Tempo total**: 7 minutos. **Custo**: ~$0.25 (Opus 4 para analise + Ahrefs API calls).

---

## Custo Estimado por Execucao

| Componente | Custo |
|---|---|
| Claude Opus 4 (~8k tokens input, ~4k output) | ~$0.18 |
| Ahrefs API (3-5 endpoints) | ~$0.05 (rateado do plano) |
| SerpApi (10 SERPs) | ~$0.05 |
| **Total por estrategia mensal** | **~$0.25-0.35** |

---

## Notas Relacionadas

- [[Arquitetura de Agentes]]
- [[Orquestrador]]
- [[Agente Pesquisador]]
- [[Content Clustering e Pillar Pages]]
- [[Framework SEO Completo]]
- [[Palavras-Chave e Intencao de Busca]]
- [[Melhor X]]
- [[Como Fazer X]]
- [[X vs Y]]
