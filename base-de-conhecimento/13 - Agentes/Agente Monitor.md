---
tipo: agente
area: Sistema
tags: [agente, monitor, rankings, citacoes-ia, trafego, alertas]
atualizado: 2026-04-23
---

# Agente Monitor

## Funcao

O Agente Monitor rastreia continuamente o desempenho de todo conteudo publicado em duas frentes: SEO tradicional (posicoes no Google, trafego organico, CTR, conversoes) e AIO (citacoes em ChatGPT, Perplexity, Google AI Overviews, e outros LLMs). Ele detecta quedas de ranking, identifica oportunidades de melhoria, emite alertas automaticos e alimenta o [[Dashboard do Cliente]] com dados atualizados. E o agente que fecha o loop — seus insights disparam acoes nos outros agentes (refresh de conteudo, re-otimizacao, redistribuicao).

---

## Input

- **Lista de URLs monitoradas**: todos os conteudos publicados pelo [[Agente Publicador]]
- **Keywords rastreadas**: keywords principais e secundarias de cada conteudo (do [[Agente Estrategista]])
- **Queries de monitoramento IA**: prompts especificos para verificar citacoes em LLMs (framework em [[Ranking IA - Tracking Manual]])
- **Baseline de metricas**: posicoes, trafego e citacoes anteriores para comparacao (delta)
- **Configuracao de alertas**: thresholds para cada metrica (ex: queda > 5 posicoes, trafego -20%)

## Output

- **Dashboard atualizado**: dados em tempo real para [[Dashboard do Cliente]]
- **Alertas**: notificacoes Slack/email quando metricas ultrapassam thresholds
- **Reports semanais/mensais**: relatorio automatico com tendencias, winners, losers, oportunidades
- **Triggers de acao**: despacho automatico para Orquestrador quando acao e necessaria (refresh, re-otimizacao)
- **Dados de citacao IA**: quais artigos sao citados, em quais LLMs, para quais queries, com que frequencia

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| **Google Search Console API** | Posicoes, impressoes, CTR, cliques por query e pagina (dados reais) |
| **Ahrefs API** | Rankings tracking, backlinks novos/perdidos, Domain Rating, keyword movements |
| **Otterly API** | Monitoramento de citacoes em AI Overviews do Google — frequencia e posicao |
| **LLMrefs API** | Tracking de citacoes do site em ChatGPT, Perplexity, Claude, e outros LLMs |
| **Google Analytics 4 API** | Trafego organico, conversoes, bounce rate, tempo na pagina |
| **Claude Sonnet 4 API** | Analise de tendencias, geracao de insights, composicao de relatorios |
| **Slack API** | Envio de alertas e relatorios semanais |
| **PostgreSQL** | Historico de metricas para analise de tendencias |
| **MCP Tools** | `check_rankings`, `check_ai_citations`, `generate_report`, `send_alert`, `trigger_refresh` |

---

## Gatilho

- **Cron diario** (6h): verificacao de rankings e citacoes IA para todas as keywords monitoradas
- **Cron semanal** (segunda 8h): relatorio semanal consolidado
- **Cron mensal** (dia 1): relatorio mensal com analise de tendencias e recomendacoes
- **Evento**: [[Agente Publicador]] publica novo conteudo → Monitor adiciona a lista de tracking
- **Alerta reativo**: Agente detecta anomalia e despacha acao imediata

---

## Criterios de Sucesso

- **Cobertura de monitoramento**: 100% dos conteudos publicados estao sendo rastreados
- **Latencia de deteccao**: queda significativa (> 10 posicoes) detectada em < 24 horas
- **Precisao de alertas**: < 10% de falsos positivos (alertas que nao requerem acao)
- **Citacoes IA rastreadas**: tracking ativo em pelo menos 3 LLMs (ChatGPT, Perplexity, AI Overviews)
- **Reports entregues no prazo**: relatorio semanal entregue toda segunda ate 9h sem falha
- **Acoes disparadas**: > 80% dos alertas de queda resultam em acao corretiva dentro de 48h

---

## Casos de Erro

1. **GSC API retorna dados atrasados**: dados do GSC tem delay de 24-48h. Agente deve informar no report a data dos dados e nao confundir delay com queda real.
2. **Otterly/LLMrefs API indisponivel**: tracking de citacoes IA para. Fallback: executar queries manualmente via WebSearch/Claude para verificar citacoes.
3. **Falso positivo de queda**: flutuacao normal de ranking (1-3 posicoes) dispara alerta. Agente deve aplicar smoothing (media movel de 7 dias) antes de alertar.
4. **Metricas de concorrente mudam drasticamente**: concorrente lanca conteudo superior. Agente deve detectar e recomendar atualizacao proativa, nao apenas reportar a queda.
5. **Volume de dados excede capacidade**: muitos clientes + muitas keywords = muitas API calls. Agente deve priorizar por importancia (keywords com maior trafego/receita primeiro).

---

## Fallback

- **GSC API falha**: usar Ahrefs como fonte primaria de rankings (menos preciso mas funcional). Enfileirar sync com GSC para quando voltar.
- **Otterly/LLMrefs falham**: executar verificacao manual de citacoes IA via prompts no Claude ("O que voce sabe sobre [topico]? Cite fontes.") — menos escalavel mas cobre o gap.
- **Slack falha para alertas**: enviar alertas via email (SendGrid) como canal secundario. PagerDuty para alertas criticos.
- **PostgreSQL falha**: gravar metricas em CSV temporario e importar quando banco voltar. Nenhum dado perdido.

---

## Dependencias

- **Depende de**: [[Orquestrador]] (cron triggers), GSC API, Ahrefs API, Otterly API, LLMrefs API, GA4 API
- **Quem depende dele**: [[Dashboard do Cliente]] (dados), [[Agente Estrategista]] (oportunidades), [[Agente Redator]] (triggers de refresh), [[Agente Pesquisador]] (re-pesquisa)
- **Referencia**: [[Ranking IA - Tracking Manual]], [[Dashboard do Cliente]], [[Google Search Console]], [[Ahrefs]], [[Otterly.ai]], [[LLMrefs]]

---

## Exemplo de Execucao

**Cenario**: Monitoramento diario detecta queda de ranking + oportunidade AIO

```
1. [06:00] Cron trigger → Orquestrador despacha job de monitoramento diario

2. [06:01] Monitor consulta GSC API para cliente "TechSolutions":
   - "melhor software gestao financeira" → posicao 4 → posicao 4 (estavel ✓)
   - "erp financeiro para pme" → posicao 7 → posicao 15 (queda -8 ⚠️)
   - "contaazul vs omie" → posicao 2 → posicao 2 (estavel ✓)

3. [06:02] Monitor consulta Ahrefs API:
   - "erp financeiro para pme": novo concorrente na posicao 3 
     (dominio DR 65, conteudo publicado 5 dias atras, 2.800 palavras)
   - Backlinks: TechSolutions perdeu 2 backlinks na ultima semana

4. [06:03] Monitor consulta Otterly API:
   - "melhor erp financeiro": TechSolutions citado no Google AI Overview ✓
   - "como escolher sistema financeiro": NAO citado (oportunidade!)

5. [06:04] Monitor consulta LLMrefs API:
   - ChatGPT: cita TechSolutions para 3/10 queries monitoradas
   - Perplexity: cita para 5/10 queries ✓
   - Claude: cita para 2/10 queries (abaixo do esperado)

6. [06:05] Claude Sonnet 4 analisa e gera insights:
   - ALERTA: "erp financeiro para pme" caiu 8 posicoes → novo concorrente 
     com conteudo mais longo e recente. Recomendacao: refresh urgente.
   - OPORTUNIDADE: "como escolher sistema financeiro" nao aparece no 
     AI Overview mas temos conteudo relevante. Recomendacao: otimizar 
     para AIO (answer-first, mais dados estruturados).

7. [06:06] Monitor despacha:
   a) Alerta Slack: "⚠️ TechSolutions: 'erp financeiro para pme' caiu 
      da posicao 7 para 15. Novo concorrente detectado."
   b) Trigger para Orquestrador: { tipo: "content_refresh", 
      url: "techsolutions.com.br/erp-financeiro-pme/", 
      motivo: "ranking_drop", prioridade: "P1" }
   c) Dados salvos em PostgreSQL para historico

8. [06:06] Dashboard atualizado com novas metricas
```

**Tempo total**: 6 minutos. **Custo**: ~$0.12.

---

## Custo Estimado por Execucao

| Componente | Custo |
|---|---|
| GSC API | Gratuito |
| Ahrefs API (rankings + backlinks) | ~$0.05 (rateado do plano) |
| Otterly API (AI Overview tracking) | ~$0.03 (rateado do plano) |
| LLMrefs API (citacoes LLM) | ~$0.02 (rateado do plano) |
| Claude Sonnet 4 (analise, ~4k tokens) | ~$0.02 |
| **Total por execucao diaria (1 cliente)** | **~$0.10-0.15** |
| **Total mensal (30 dias, 10 clientes)** | **~$30-45** |

---

## Notas Relacionadas

- [[Arquitetura de Agentes]]
- [[Orquestrador]]
- [[Dashboard do Cliente]]
- [[Ranking IA - Tracking Manual]]
- [[Google Search Console]]
- [[Ahrefs]]
- [[Otterly.ai]]
- [[LLMrefs]]
- [[Agente Publicador]]
- [[Agente Estrategista]]
