---
tipo: sistema
area: Arquitetura
tags: [sistema, feedback, loop, aprendizado, iteracao]
atualizado: 2026-04-22
---

# Feedback Loop

> Um sistema que nao aprende com os proprios resultados e apenas uma ferramenta cara. O feedback loop transforma dados de performance em acoes automaticas, criando um ciclo virtuoso: mais dados → melhores decisoes → melhores resultados → mais dados.

---

## O Circuito

```
┌─────────┐     ┌────────┐     ┌─────────┐     ┌─────────┐     ┌───────┐
│ Monitor │────→│ Dados  │────→│ Analise │────→│ Decisao │────→│ Acao  │
└─────────┘     └────────┘     └─────────┘     └─────────┘     └───────┘
     ↑                                                              │
     └──────────────────────────────────────────────────────────────┘
                              (loop continuo)
```

O loop roda em 3 velocidades diferentes, cada uma com escopo e impacto distintos.

---

## Dados de Entrada

| Fonte | Dados | Frequencia de Coleta | Metodo |
|---|---|---|---|
| Google Search Console | Rankings, impressoes, cliques, CTR, posicao media | Diario (API) | [[Agente Monitor]] via GSC API |
| Teste de Citacao IA | SPI score, citacoes por plataforma e prompt | Semanal | [[Testes IA]] via [[Agente Monitor]] |
| Google Analytics 4 | Trafego, sessoes, bounce rate, tempo na pagina | Diario (API) | GA4 API |
| Supabase Events | Conversoes, sign-ups, interacoes do cliente | Real-time | Supabase webhooks |
| Agente Revisor | SEO score do conteudo, legibilidade, originalidade | Por artigo | Pipeline interno |
| Cliente | NPS, feedback calls, tickets de suporte | Mensal/sob demanda | [[Agente Suporte]] + forms |

---

## Regras de Decisao Automatica

Implementadas no [[Agente Monitor]] (deteccao) + [[Orquestrador]] (execucao):

### Sinais de Queda

| Sinal | Condicao Exata | Acao Automatica | Agente Executor | Prazo |
|---|---|---|---|---|
| Ranking drop | Keyword caiu 5+ posicoes em 7 dias | Re-otimizar conteudo: atualizar dados, expandir secoes, melhorar schema | [[Agente Redator]] | 48h |
| CTR baixo | CTR < 2% com impressoes > 500/semana | Reescrever title tag + meta description (3 variacoes, testar) | [[Agente Redator]] | 24h |
| Citacao perdida | SPI mostra que era citado em prompt X, agora nao | Verificar conteudo (mudou?), checar schema, re-otimizar para citabilidade | [[Agente Publicador]] | 72h |
| Trafego em queda | -20% WoW por 2 semanas consecutivas | Analise de causa: update Google? Sazonalidade? Problema tecnico? | [[Agente Monitor]] | 24h |

### Sinais de Oportunidade

| Sinal | Condicao Exata | Acao Automatica | Agente Executor | Prazo |
|---|---|---|---|---|
| Novo concorrente | Novo dominio apareceu no top 3 para keyword monitorada | Analise competitiva: o que ele tem que nos nao temos? | [[Agente Pesquisador]] | 48h |
| Trafego spike | +50% WoW em pagina especifica | Analisar causa (viral? feature snippet? referral?), replicar padrao | [[Agente Estrategista]] | 24h |
| Keyword emergente | Impressoes crescendo para keyword nao-alvo | Avaliar se vale criar conteudo dedicado | [[Agente Estrategista]] | 72h |
| Posicao 11-15 | Keyword no quase-top-10 por 2+ semanas | Boost de conteudo: expandir, adicionar dados, internal linking | [[Agente Redator]] | 48h |

### Sinais de Conversao

| Sinal | Condicao Exata | Acao Automatica | Agente Executor | Prazo |
|---|---|---|---|---|
| Conversao baixa | Trafego > 500/mes + conversao < 1% numa pagina | Otimizar CTA, adicionar prova social, melhorar acima da dobra | [[Agente Redator]] | 72h |
| Bounce alto | Bounce rate > 80% com > 100 sessoes/semana | Analisar: conteudo alinhado com intent? Velocidade OK? Mobile OK? | [[Agente Monitor]] | 48h |
| Conteudo velho | Artigo > 90 dias sem atualizacao | Flag para content refresh: atualizar dados, datas, referencias | [[Agente Estrategista]] | 7 dias |

---

## Tres Velocidades do Loop

### Ciclo Curto: Semanal (ajustes taticos)
- **Escopo**: title tags, meta descriptions, schema, internal links
- **Dados**: GSC (7 dias), SPI semanal
- **Decisor V1**: humano revisa alertas do Monitor
- **Decisor V2**: Orquestrador executa automaticamente, humano revisa relatorio semanal
- **Impacto esperado**: melhoria de CTR em 1-2 semanas, melhoria de posicao em 2-4 semanas

### Ciclo Medio: Mensal (ajustes estrategicos)
- **Escopo**: prioridade de keywords, clusters, calendario editorial, alocacao de recursos
- **Dados**: GSC (30 dias), SPI mensal, relatorio de performance
- **Decisor**: [[Agente Estrategista]] recalcula scores (ver [[Framework de Priorizacao SEO + AIO]])
- **Impacto esperado**: melhoria de IVT em 30-60 dias

### Ciclo Longo: Trimestral (revisao estrategica)
- **Escopo**: nicho, ICP, posicionamento, tiers, novos canais
- **Dados**: tendencias de 3 meses, churn analysis, NPS, mercado
- **Decisor**: humano (founder/produto) com dados dos agentes
- **Impacto esperado**: mudancas estruturais que afetam 6-12 meses

---

## Metricas do Proprio Loop

O loop precisa ser medido para saber se esta funcionando:

| Metrica do Loop | O que mede | Target | Como medir |
|---|---|---|---|
| Taxa de re-otimizacao bem-sucedida | % de conteudos re-otimizados que subiram posicao em 30 dias | > 60% | GSC antes/depois da re-otimizacao |
| Tempo medio de reacao | Horas entre deteccao do sinal e execucao da acao | < 48h | Timestamps no Supabase (evento detectado → acao executada) |
| Content refresh rate | % do acervo atualizado nos ultimos 6 meses | 100% | Supabase: last_updated por conteudo |
| False positive rate | % de alertas que nao resultaram em acao util | < 20% | Review manual mensal dos alertas |
| Loop completion rate | % de acoes disparadas que foram concluidas | > 90% | Status de tasks no Supabase |

---

## V1 vs V2: Evolucao do Loop

### V1 — Semi-automatico (lancamento ate ~20 clientes)
```
Monitor detecta sinal → Cria alerta no Supabase → 
Notifica humano (email/Slack) → Humano decide acao → 
Humano dispara agente manualmente → Resultado registrado
```
- **Vantagem**: controle total, aprende quais regras funcionam
- **Limitacao**: escala ate ~20 clientes antes de sobrecarregar o humano

### V2 — Totalmente automatico (escala, >20 clientes)
```
Monitor detecta sinal → Classifica por regra pre-definida →
Orquestrador executa agente automaticamente → 
Resultado registrado → Humano revisa relatorio diario
```
- **Vantagem**: escala ilimitada, tempo de reacao < 1h
- **Pre-requisito**: V1 validou que as regras de decisao produzem resultado positivo em > 60% dos casos
- **Safeguard**: humano pode pausar qualquer regra a qualquer momento

### Transicao V1 → V2
1. Cada regra comeca em modo "sugestao" (V1): sugere, humano aprova
2. Apos 10+ execucoes com taxa de sucesso > 70%, promover para "auto" (V2)
3. Regras com taxa de sucesso < 50% apos 10 execucoes: revisar logica ou desativar
4. Dashboard de confianca: mostra % de regras em modo auto vs sugestao

---

## Notas e Referencias

- Agente que detecta sinais: [[Agente Monitor]]
- Agente que orquestra acoes: [[Orquestrador]]
- Framework de priorizacao usado nas decisoes: [[Framework de Priorizacao SEO + AIO]]
- Teste ativo de citacoes: [[Testes IA]]
- Tratamento tecnico de falhas: [[Tratamento de Falhas]]
- Failure modes que o loop deve prevenir: [[Failure Modes]]
- North star alimentada pelo loop: [[North Star Metric]]
- Dashboard onde resultados aparecem: [[Dashboard do Cliente]]
