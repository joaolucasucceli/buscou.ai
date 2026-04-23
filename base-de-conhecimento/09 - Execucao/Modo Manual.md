---
tipo: playbook
area: Ambos
tags: [execucao, manual, validacao, mvp, pre-sistema]
atualizado: 2026-04-22
---

# Modo Manual — Rodar o Pipeline Sem Sistema

> Antes de construir o software, rode o pipeline MANUALMENTE simulando o que o sistema fara. Isso valida o processo, gera os primeiros resultados e produz dados reais para calibrar os agentes.

---

## Por que Modo Manual Primeiro

- **Validar o processo** antes de investir meses de desenvolvimento
- **Gerar case real** (dog-fooding manual → prova de resultado)
- **Entender bottlenecks** (onde o humano demora mais = onde automatizar primeiro)
- **Calibrar qualidade** (o que e "bom o suficiente" para conteudo IA)
- **Fechar betas** ([[Go To Market Inicial]]) sem depender de software

---

## Pipeline Manual: Etapa por Etapa

| Etapa do pipeline | Como fazer manualmente | Ferramenta | Tempo estimado |
|---|---|---|---|
| 1. Nicho | Definir com base no [[Nicho Inicial]] | Planilha | 2h (unica vez) |
| 2. Keywords | Pesquisar no Ahrefs/SEMrush free trial + Google Trends | [[Ahrefs]], [[Google Trends e Keyword Planner]] | 4-6h |
| 3. Clusters | Agrupar keywords manualmente em planilha | Google Sheets | 2-3h |
| 4. Conteudo | Usar Claude/ChatGPT com prompts de [[Geracao de Conteudo]] | Claude.ai | 1-2h/artigo |
| 5. Revisao | Revisar manualmente: SEO score (Surfer free), fatos, qualidade | [[Surfer SEO]], leitura manual | 30min/artigo |
| 6. Publicacao | Publicar manualmente no WordPress + schema via Rank Math | CMS + [[Rank Math e Yoast]] | 30min/artigo |
| 7. Indexacao | Submeter URL no GSC manualmente | [[Google Search Console]] | 5min/artigo |
| 8. Distribuicao | Postar manualmente no LinkedIn, Reddit, Medium | Plataformas | 1h/artigo |
| 9. Teste IA | Testar prompts manualmente via [[Testes IA]] | ChatGPT, Perplexity, etc. | 2h/semana |
| 10. Monitoramento | Checar GSC + rankings manualmente | GSC + [[Ranking IA - Tracking Manual]] | 1h/semana |

---

## Tempo Total por Semana (1 cliente)

| Atividade | Horas/semana |
|---|---|
| Producao de conteudo (2-3 artigos) | 4-6h |
| Publicacao + distribuicao | 2-3h |
| Teste IA + monitoramento | 3h |
| Relatorio mensal (1x/mes) | 2h |
| **Total** | **~10-12h/semana** |

Com 3 clientes beta: ~30-36h/semana = full-time (viavel para founder solo).

---

## O que Documentar no Modo Manual

Cada acao manual gera DADOS que alimentam o sistema futuro:

- [ ] Tempo por etapa (para estimar custo e SLA do produto)
- [ ] Qualidade do conteudo IA (precisa de muita edicao? pouca?)
- [ ] Quais prompts geram melhor conteudo ([[Geracao de Conteudo]])
- [ ] Quais formatos rankeiam mais rapido ([[Conteudos que Ranqueiam]])
- [ ] Quais queries de IA citam nosso conteudo ([[Queries que Rankeamos]])
- [ ] Objecoes e feedback dos clientes beta
- [ ] Onde voce mais perde tempo (= prioridade de automacao)

---

## Criterios para Migrar do Manual para o Sistema

| Criterio | Meta |
|---|---|
| Artigos publicados total | 30+ |
| Artigos que rankearam top 10 | 5+ |
| Citacoes em IA confirmadas | 3+ |
| Clientes beta satisfeitos | 2+ (NPS > 7) |
| Processo estavel (sem improvisar) | 4+ semanas rodando igual |
| Bottleneck claro identificado | Saber QUAL agente construir primeiro |

Quando atingir → comecar MVP do [[Roadmap do Produto]].

---

## Ordem de Automacao (baseada no Modo Manual)

O que automatizar PRIMEIRO = o que leva mais tempo + e mais repetitivo:

1. **Agente Redator** — conteudo e o gargalo (#1 em tempo)
2. **Agente Publicador** — publicacao e repetitiva e mecanica
3. **Agente Monitor** — monitoramento e tedioso e precisa de consistencia
4. **Agente Pesquisador** — pesquisa de SERP e demorada
5. **Resto** — na ordem que o gargalo indicar

---

## Notas Relacionadas

- [[Fluxo V1]] - Pipeline automatizado (versao sistema)
- [[Go To Market Inicial]] - Como fechar os betas
- [[Nicho Inicial]] - Qual nicho atacar primeiro
- [[Roadmap do Produto]] - Quando migrar para sistema
