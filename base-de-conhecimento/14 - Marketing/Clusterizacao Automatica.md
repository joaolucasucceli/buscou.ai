---
tipo: marketing
area: Conteudo
tags: [marketing, clusters, automatico, topicos]
atualizado: 2026-04-22
---

# Clusterizacao Automatica

> Topic clusters nao sao criados manualmente. O [[Agente Estrategista]] recebe seed keywords, expande com dados de APIs de SEO, agrupa semanticamente, define pillar pages e gera o calendario editorial automaticamente. Este documento detalha o algoritmo e a logica de priorizacao.

Referencia: [[Content Clustering e Pillar Pages]] | [[Agente Estrategista]] | [[Agente Pesquisador]] | [[Palavras-Chave e Intencao de Busca]] | [[Estrategia de Conteudo Autonomo]]

---

## O Pipeline de Clusterizacao

```
Seed keywords (do onboarding, ver [[Onboarding Automatico]])
  ↓
[Agente Pesquisador] expande para 200-500 keywords relacionadas
  ↓
[Agente Estrategista] agrupa por similaridade semantica
  ↓
Define pillar pages (topicos amplos, high volume)
  ↓
Define cluster content (subtopicos, long-tail)
  ↓
Calcula prioridade de cada cluster
  ↓
Gera calendario editorial mensal
  ↓
[Orquestrador] dispara pipeline de producao
```

---

## Etapa 1: Expansao de Keywords

O [[Agente Pesquisador]] recebe 3-5 seed keywords do cliente e expande:

| Metodo de Expansao | Fonte | Output Estimado |
|---|---|---|
| Keywords relacionadas | [[Ahrefs]] API (`related_terms`) | 50-100 keywords |
| Perguntas (People Also Ask) | DataForSEO SERP API | 30-50 perguntas |
| Autocompete | Google Autocomplete API | 20-40 sugestoes |
| Concorrentes | [[Ahrefs]] API (`organic_keywords` dos concorrentes) | 50-150 gaps |
| GSC (se conectado) | [[Google Search Console]] API | 30-100 queries existentes |
| Sub-queries para IA | Prompts derivados de [[Sub-Query Optimization]] | 20-30 queries AIO |

**Output**: Lista consolidada de 200-500 keywords unicas com volume, dificuldade (KD), CPC, intent e SERP features.

---

## Etapa 2: Agrupamento Semantico

O [[Agente Estrategista]] agrupa keywords por similaridade semantica usando o modelo de embeddings:

1. Gerar embedding de cada keyword (text-embedding-3-small via OpenAI ou similar)
2. Aplicar clustering hierarquico (threshold de similaridade coseno > 0.75)
3. Cada cluster = um topico. O label e a keyword com maior volume no cluster
4. Validacao anti-canibalizacao: se duas keywords compartilham > 60% da SERP (mesmas URLs nos top 10), pertencem ao mesmo cluster

**Exemplo de output**:

```
CLUSTER: "Implante Dentario" (pillar)
├── implante dentario preco (vol: 2.400)
├── implante dentario doi (vol: 1.800)
├── quanto custa implante dentario (vol: 1.200)
├── implante dentario quanto tempo dura (vol: 890)
├── implante dentario vs protese (vol: 640)
├── implante dentario recuperacao (vol: 480)
└── implante dentario idoso pode fazer (vol: 320)

CLUSTER: "Clareamento Dental" (pillar)
├── clareamento dental preco (vol: 1.900)
├── clareamento dental caseiro funciona (vol: 1.100)
├── clareamento a laser (vol: 720)
└── clareamento dental sensibilidade (vol: 390)
```

---

## Etapa 3: Definicao de Pillar vs Cluster Content

| Tipo | Criterio | Formato |
|---|---|---|
| **Pillar page** | Keyword com volume > 1.000 E intent amplo (informacional) | Guia completo, 3.000-5.000 palavras, cobre o topico por inteiro |
| **Cluster content** | Keywords com volume < 1.000 OU intent especifico (comparativo, how-to, pergunta) | Artigo focado, 1.500-2.500 palavras, aprofunda subtopico |
| **Supporting content** | Keywords com volume < 200 OU long-tail extremo | FAQ, snippet-optimized, 800-1.200 palavras |

**Internal linking automatico**: Cada cluster content linka para sua pillar page (obrigatorio). Pillar page linka para todos os clusters (obrigatorio). Cross-linking entre clusters relacionados (quando semanticamente proximo). Implementado pelo [[Agente Publicador]] usando mapa de links definido pelo [[Agente Estrategista]].

---

## Etapa 4: Priority Score

Cada cluster recebe um score de prioridade (0-100) para definir a ordem de producao:

```
Priority Score = (Volume * 0.30) + (Inverse_KD * 0.25) + (Intent_Score * 0.20) + (Competition_Gap * 0.15) + (AIO_Opportunity * 0.10)
```

| Fator | Peso | Calculo |
|---|---|---|
| **Volume** | 30% | Normalizado 0-100 baseado no maior volume do dataset |
| **Inverse KD** | 25% | (100 - KD). Keywords faceis primeiro (quick wins) |
| **Intent Score** | 20% | Transacional/comercial = 100, informacional = 60, navegacional = 30 |
| **Competition Gap** | 15% | Se concorrentes rankam e cliente nao = oportunidade alta |
| **AIO Opportunity** | 10% | Se a keyword gera AI Overview mas nenhum concorrente otimizou para IA = oportunidade |

**Quick wins**: Priority Score > 70 E KD < 30 → produzir primeiro (resultados rapidos geram confianca do cliente).

Alinhado com a logica de [[Palavras-Chave e Intencao de Busca]] e priorizacao de [[Oportunidades no Mercado BR]].

---

## Etapa 5: Calendario Editorial

O [[Agente Estrategista]] distribui os clusters priorizados no calendario do mes:

| Modelo comercial | Artigos/Mes | Distribuicao |
|---|---|---|
| Oferta unica buscou.ai (ver [[VERDADE_UNICA_BUSCOU]] secao 5) | 90 (3/dia) | Diario, multiplos clusters em paralelo (pillar primeiro, depois clusters em ordem de prioridade) |

**Regras do calendario**:
- Pillar page sempre publicada antes de seus clusters (autoridade tematica precede profundidade)
- Max 1 pillar page por semana (evitar diluicao de crawl budget)
- Clusters com Intent Score > 80 (comercial/transacional) priorizados no final do mes (pipeline de nurturing precisa de TOFU primeiro)

---

## Validacao Anti-Canibalizacao

Antes de aprovar um cluster, o [[Agente Estrategista]] verifica:

1. **SERP overlap**: Se 2 keywords compartilham > 3 URLs nos top 10, sao o mesmo topico → fundir em um unico artigo
2. **Existing content**: Se o cliente ja tem conteudo rankando para essa keyword → atualizar/refresh em vez de criar novo
3. **Internal cannibalization**: Se dois clusters do calendario miram a mesma SERP → combinar ou priorizar um

Essa validacao segue os principios de [[Content Clustering e Pillar Pages]] sobre evitar canibalizacao.

---

## Reclusterizacao Mensal

No inicio de cada mes, o [[Agente Estrategista]] reavalia:

- Keywords que subiram/cairam (dados do [[Agente Monitor]])
- Novas oportunidades (queries emergentes no GSC)
- Gaps ainda nao cobertos (concorrentes publicaram conteudo novo)
- Performance dos clusters existentes (quais geraram trafego/leads)

Output: calendario editorial atualizado + sugestoes de refresh para conteudo existente.

---

## Notas Relacionadas

- [[Content Clustering e Pillar Pages]]
- [[Agente Estrategista]]
- [[Agente Pesquisador]]
- [[Estrategia de Conteudo Autonomo]]
- [[Tipos de Conteudo]]
- [[Palavras-Chave e Intencao de Busca]]
- [[Sub-Query Optimization]]
- [[Onboarding Automatico]]
- [[Oportunidades no Mercado BR]]
