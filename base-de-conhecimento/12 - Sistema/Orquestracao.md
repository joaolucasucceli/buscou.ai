---
tipo: conceito
area: Ambos
tags:
  - sistema
  - orquestracao
  - pipeline
  - agentes
  - fluxo
  - eventos
  - automacao
atualizado: 2026-04-23
---

# Orquestracao — Fluxo de Execucao dos Agentes

## Visao Geral

Este documento define o **FLUXO** — quem chama quem, em que ordem, com que dados. O [[Orquestrador]] e o AGENTE que executa este fluxo. Aqui descrevemos o pipeline completo de operacao do sistema.

> **Principio fundamental**: "Nao precisa ser magico, precisa ser previsivel."

O sistema e um **pipeline deterministico com IA dentro**. Cada passo tem entrada definida, processamento claro e saida esperada. A IA e usada como ferramenta dentro de passos especificos, nao como tomadora de decisoes arquiteturais.

---

## Pipeline Principal (V1)

```
[EVENTO]                    [JOB]                      [AGENTE]              [OUTPUT]
onboarding_completed    →   gerar_business_context  →   (funcao)          →   contextos_negocio
business_context_ready  →   gerar_estrategia        →   Estrategista      →   palavras_chave + calendario
estrategia_pronta       →   gerar_briefing (x3)     →   Pesquisador       →   briefings_conteudo (x3)
briefing_pronto         →   gerar_conteudo          →   Redator           →   conteudos (status: escrevendo)
conteudo_escrito        →   gerar_plano_visual      →   Visual            →   plano_visual_json
plano_visual_pronto     →   gerar_imagens           →   Visual            →   imagens_conteudo
imagens_prontas         →   revisar_conteudo        →   Revisor (humano)  →   conteudos (status: aprovado/revisao)
conteudo_aprovado       →   publicar_conteudo       →   Publicador        →   conteudos (status: publicado)
conteudo_publicado      →   (manual V1)             →   Monitor (humano)  →   metricas_snapshots
```

> **Nota**: O pipeline agora inclui etapas visuais entre redacao e revisao. O [[Agente Visual]] gera plano visual + imagens ANTES da revisao, para que o Revisor avalie conteudo + imagens juntos.

Cada seta (`→`) e uma transicao com evento trigger, job criado e dados passados adiante.

---

## Detalhe de Cada Transicao

### Transicao 1: Gerar Business Context

| Campo | Detalhe |
|---|---|
| **Evento trigger** | `onboarding_completed` — disparado quando `sessoes_onboarding.status = 'concluida'` |
| **Job criado** | `gerar_business_context` na `fila_alta` |
| **Input** | Todas as `respostas_onboarding` da sessao (10 steps: negocio, localizacao, oferta, cliente-ideal, diferenciais, concorrentes, objetivos, marca, integracoes, revisao) |
| **Prompt do agente** | NAO e agente IA. E funcao deterministica `consolidarRespostas()` que transforma as 10 respostas em um JSON estruturado do business context |
| **Output esperado** | JSON completo do `BusinessContext` versao 1: segmento, localizacao, publico-alvo, diferenciais, tom de voz, keywords semente, concorrentes mapeados |
| **Tabela atualizada** | `contextos_negocio` (INSERT) — campos: `organizacao_id`, `versao: 1`, `dados_json`, `criado_em` |
| **Proximo passo** | Dispara evento `business_context_ready` com `{ contexto_id, organizacao_id }` |
| **Timeout** | 10 segundos (funcao simples, sem chamada de IA) |
| **Fallback** | Retry 3x com backoff padrao. Apos falha total: alerta para admin + pausa do pipeline para esta organizacao |

---

### Transicao 2: Gerar Estrategia

| Campo | Detalhe |
|---|---|
| **Evento trigger** | `business_context_ready` — disparado apos INSERT em `contextos_negocio` |
| **Job criado** | `gerar_estrategia` na `fila_alta` |
| **Input** | `contextos_negocio.dados_json` completo (segmento, localizacao, publico, diferenciais, concorrentes, keywords semente) |
| **Prompt do agente** | [[Agente Estrategista]]: "Voce e um especialista em SEO e AIO. Dado o contexto do negocio abaixo, gere: (1) lista de 30 keywords priorizadas por volume x dificuldade, (2) agrupamento em topic clusters, (3) calendario editorial para 3 meses com 3 artigos/semana" |
| **Output esperado** | JSON com: `keywords[]` (keyword, volume, dificuldade, intencao, cluster), `clusters[]` (nome, pillar_keyword, supporting_keywords), `calendario[]` (semana, keyword, tipo_conteudo, prioridade) |
| **Tabela atualizada** | `palavras_chave` (INSERT multiplo) + `projetos.estrategia_json` (UPDATE) |
| **Proximo passo** | Dispara 3x evento `estrategia_pronta` — um para cada keyword do primeiro lote do calendario |
| **Timeout** | 120 segundos (chamada LLM complexa com raciocinio) |
| **Fallback** | Retry 3x. Se falhar: marca projeto como `estrategia_pendente`, notifica admin. Nao bloqueia outros projetos. |

---

### Transicao 3: Gerar Briefing

| Campo | Detalhe |
|---|---|
| **Evento trigger** | `estrategia_pronta` — disparado para cada keyword do lote atual (3 por rodada) |
| **Job criado** | `gerar_briefing` na `fila_normal` (3 jobs em sequencia, nao paralelo no V1) |
| **Input** | `keyword` (termo, volume, dificuldade, intencao, cluster) + `contextos_negocio.dados_json` (para manter tom e relevancia) |
| **Prompt do agente** | [[Agente Pesquisador]]: "Para a keyword '{keyword}', pesquise: (1) top 10 resultados da SERP atual, (2) perguntas frequentes (People Also Ask), (3) subtopicos obrigatorios, (4) gaps de conteudo dos concorrentes. Monte um briefing com: titulo sugerido, H2s obrigatorios, contagem de palavras alvo, fontes a citar, angulo unico baseado nos diferenciais do negocio" |
| **Output esperado** | JSON do briefing: `titulo`, `meta_description`, `h2s[]`, `subtopicos[]`, `fontes[]`, `word_count_alvo`, `angulo`, `perguntas_frequentes[]`, `dados_serp` |
| **Tabela atualizada** | `conteudos` (INSERT com status `briefing_pronto`) — campos: `keyword_id`, `briefing_json`, `status: 'briefing_pronto'` |
| **Proximo passo** | Dispara evento `briefing_pronto` com `{ conteudo_id, briefing_id }` |
| **Timeout** | 180 segundos (pesquisa SERP + analise + geracao do briefing) |
| **Fallback** | Retry 3x. Se falhar: pula keyword, marca como `briefing_falhou`, continua com proximas keywords do lote |

---

### Transicao 4: Gerar Conteudo

| Campo | Detalhe |
|---|---|
| **Evento trigger** | `briefing_pronto` — disparado apos INSERT/UPDATE do briefing no conteudo |
| **Job criado** | `gerar_conteudo` na `fila_alta` |
| **Input** | `conteudos.briefing_json` (titulo, H2s, subtopicos, fontes, angulo) + `contextos_negocio.dados_json` (tom de voz, marca, diferenciais) |
| **Prompt do agente** | [[Agente Redator]]: "Escreva um artigo completo seguindo o briefing abaixo. Regras: (1) tom de voz do negocio, (2) mencionar diferenciais naturalmente, (3) incluir dados e estatisticas, (4) otimizar para SEO on-page (keyword no H1, H2s, meta), (5) otimizar para AIO (respostas diretas, listas, tabelas, FAQ schema), (6) manter naturalidade — nao parecer escrito por IA" |
| **Output esperado** | Artigo completo em Markdown: titulo, meta_description, corpo com H2s/H3s, FAQ section, internal links sugeridos. Campos: `titulo_final`, `meta_description`, `corpo_markdown`, `word_count`, `faq_json`, `schema_markup` |
| **Tabela atualizada** | `conteudos` (UPDATE) — campos: `corpo_markdown`, `titulo_final`, `meta_description`, `word_count`, `status: 'escrito'` |
| **Proximo passo** | Dispara evento `conteudo_escrito` com `{ conteudo_id }` |
| **Timeout** | 300 segundos (5 minutos — artigo longo de 2000+ palavras) |
| **Fallback** | Retry 3x. Se falhar: marca como `escrita_falhou`, notifica admin. Artigo pode ser reprocessado manualmente. |

---

### Transicao 4.5: Gerar Plano Visual

| Campo | Detalhe |
|---|---|
| **Evento trigger** | `conteudo_escrito` — disparado apos artigo completo pelo Redator |
| **Job criado** | `gerar_plano_visual` na `fila_normal` |
| **Input** | `conteudos.corpo_markdown` (estrutura H2s, listas, comparacoes) + `contextos_negocio.dados_json` (categoria, cidade, servico) + `conteudos.keyword_principal` |
| **Prompt do agente** | [[Agente Visual]]: "Analise a estrutura do artigo e identifique pontos que precisam de apoio visual. Gere um plano visual com: tipo de imagem, objetivo, posicao no artigo, prompt de geracao, alt text preliminar, filename SEO-friendly. Minimo: 1 capa. Maximo V1: 2 imagens." |
| **Output esperado** | JSON `plano_visual`: array de objetos com `tipo`, `objetivo`, `posicao`, `prompt`, `alt_text`, `nome_arquivo` |
| **Tabela atualizada** | `conteudos.plano_visual_json` (UPDATE) ou campo dedicado |
| **Proximo passo** | Dispara evento `plano_visual_pronto` com `{ conteudo_id }` |
| **Timeout** | 30 segundos (analise de estrutura + geracao de prompts) |
| **Fallback** | Se falhar: publicar artigo sem imagens. Gerar depois em background. |

---

### Transicao 4.6: Gerar Imagens

| Campo | Detalhe |
|---|---|
| **Evento trigger** | `plano_visual_pronto` — disparado apos plano visual salvo |
| **Job criado** | `gerar_imagens` na `fila_normal` (1 job por imagem, sequencial V1) |
| **Input** | `plano_visual_json` (prompts, tipos, posicoes) + `contextos_negocio.dados_json` (marca, cores) |
| **Prompt do agente** | [[Agente Visual]]: Chamar API de geracao (DALL-E 3) com prompt do plano visual. Apos geracao: otimizar (WebP, compressao, resize), gerar filename SEO, alt text final, legenda. Upload para `imagens-staging`. |
| **Output esperado** | Imagens geradas, otimizadas e registradas. Para cada: `url_imagem`, `nome_arquivo`, `alt_text`, `legenda`, `tamanho_kb` |
| **Tabela atualizada** | `imagens_conteudo` (INSERT para cada imagem) + `conteudos.status: 'imagens_prontas'` |
| **Proximo passo** | Dispara evento `imagens_prontas` com `{ conteudo_id, imagem_ids[] }` |
| **Timeout** | 60 segundos por imagem (geracao + processamento) |
| **Fallback** | Se API falhar: tentar provider alternativo. Se tudo falhar: publicar sem imagens + flag para regenerar. |

---

### Transicao 5: Revisar Conteudo

| Campo | Detalhe |
|---|---|
| **Evento trigger** | `imagens_prontas` — disparado apos todas as imagens geradas e otimizadas (V1: `conteudo_escrito` se imagens desabilitadas) |
| **Job criado** | No V1: nenhum job automatico. Notificacao para o founder revisar manualmente. No V2+: `revisar_conteudo` na `fila_normal` |
| **Input** | `conteudos` completo (titulo, meta, corpo, briefing original) + `contextos_negocio.dados_json` |
| **Prompt do agente (V2+)** | [[Agente Revisor]]: "Avalie o artigo abaixo em 5 criterios: (1) aderencia ao briefing (0-20), (2) qualidade SEO on-page (0-20), (3) otimizacao AIO (0-20), (4) naturalidade do texto (0-20), (5) valor para o leitor (0-20). Score total 0-100. Se >= 80: aprovar. Se < 80: listar revisoes necessarias." |
| **Output esperado** | JSON de revisao: `score_total`, `scores_por_criterio`, `aprovado: boolean`, `revisoes_necessarias[]`, `comentarios` |
| **Tabela atualizada** | `conteudos` (UPDATE) — campos: `score_qualidade`, `revisao_json`, `status: 'aprovado'` ou `status: 'revisao_necessaria'` |
| **Proximo passo** | Se aprovado: dispara `conteudo_aprovado`. Se revisao necessaria: volta para `gerar_conteudo` com feedback (max 2 reescritas) |
| **Timeout** | V1: sem timeout (humano). V2+: 60 segundos |
| **Fallback** | V1: founder decide. V2+: se score indeterminado, encaminha para revisao humana |

---

### Transicao 6: Publicar Conteudo

| Campo | Detalhe |
|---|---|
| **Evento trigger** | `conteudo_aprovado` — disparado quando `conteudos.status = 'aprovado'` |
| **Job criado** | `publicar_conteudo` na `fila_alta` |
| **Input** | `conteudos` completo (titulo, meta, corpo markdown, schema markup, FAQ) + `integracoes` do projeto (WordPress credentials, site URL) |
| **Prompt do agente** | [[Agente Publicador]]: NAO e prompt de IA. E funcao deterministica que: (1) converte Markdown para HTML, (2) aplica schema markup, (3) faz upload via WordPress REST API, (4) configura SEO plugin (Yoast/RankMath), (5) agenda ou publica imediatamente conforme calendario |
| **Output esperado** | `{ post_id, url_publicada, publicado_em, status_wordpress }` |
| **Tabela atualizada** | `conteudos` (UPDATE) — campos: `url_publicada`, `publicado_em`, `post_id_externo`, `status: 'publicado'` |
| **Proximo passo** | Dispara evento `conteudo_publicado`. No V1: pipeline termina aqui para este conteudo. |
| **Timeout** | 120 segundos (upload + configuracao no WordPress) |
| **Fallback** | Retry 3x. Se falhar: marca como `publicacao_falhou`, notifica admin com erro detalhado. Comum: credenciais expiradas, site fora do ar. |

---

### Transicao 7: Monitorar Metricas (V1: Manual)

| Campo | Detalhe |
|---|---|
| **Evento trigger** | V1: manual pelo founder a cada 7-14 dias. V2+: `conteudo_publicado` + cron job semanal |
| **Job criado** | V1: nenhum. V2+: `atualizar_metricas` na `fila_normal` |
| **Input** | `conteudos.url_publicada` + credenciais Google Search Console + Google Analytics |
| **Prompt do agente (V2+)** | [[Agente Monitor]]: NAO e prompt de IA. E funcao que: (1) consulta GSC API para impressoes, cliques, CTR, posicao media, (2) consulta GA4 para pageviews, bounce rate, tempo na pagina, (3) testa citacao em IAs (ChatGPT, Perplexity, Gemini) |
| **Output esperado** | `{ impressoes, cliques, ctr, posicao_media, pageviews, bounce_rate, tempo_pagina, citacoes_ia[] }` |
| **Tabela atualizada** | `metricas_snapshots` (INSERT) — snapshot semanal por conteudo |
| **Proximo passo** | V1: nenhum (dados para consulta manual). V2+: se queda detectada, dispara `monitor_detecta_queda` → feedback loop |
| **Timeout** | V2+: 600 segundos (10 minutos — APIs externas podem ser lentas) |
| **Fallback** | V2+: retry 3x. Se APIs indisponiveis: pula coleta desta semana, tenta novamente na proxima |

---

## Fluxos Secundarios

### Feedback Loop (V2+)

Fluxo automatico que detecta queda de performance e reotimiza conteudo:

```
monitor_detecta_queda
    │
    ├── Trigger: posicao caiu > 5 posicoes OU impressoes caiu > 30% em 2 semanas
    │
    ▼
analisar_causa (Monitor)
    │
    ├── Analisa: SERP mudou? Novo concorrente? Conteudo desatualizado? Algoritmo?
    │
    ▼
ajustar_estrategia (Estrategista)
    │
    ├── Decide: reescrever? atualizar dados? expandir? mudar angulo?
    │
    ▼
gerar_novo_briefing (Pesquisador)
    │
    ├── Pesquisa SERP atualizada, identifica gaps novos
    │
    ▼
reescrever_conteudo (Redator)
    │
    ├── Reescrita parcial ou total conforme briefing atualizado
    │
    ▼
re-publicar (Publicador)
    │
    ├── Atualiza post existente (mesmo URL, conteudo novo)
    │
    ▼
monitorar_novamente
    └── Volta ao ciclo de monitoramento semanal
```

**Regra de seguranca**: maximo 2 reotimizacoes por conteudo por trimestre. Se continuar caindo, escala para revisao humana.

---

### Distribuicao (V2+)

Apos publicacao, distribui conteudo em multiplas plataformas:

```
conteudo_publicado
    │
    ▼
gerar_posts (Distribuidor)
    │
    ├── Cria versoes adaptadas para cada plataforma
    │
    ├──→ postar_linkedin (post profissional, 1300 chars max)
    ├──→ postar_reddit (resposta util em subreddits relevantes)
    ├──→ postar_medium (artigo completo com canonical link)
    ├──→ postar_twitter (thread com highlights)
    └──→ postar_pinterest (pin com imagem + descricao)
```

Ver [[Estrategia de Distribuicao]] para detalhes de cada plataforma.

---

### Suporte (V2+)

Atendimento automatizado com escalonamento:

```
mensagem_recebida
    │
    ▼
classificar_intent (Suporte)
    │
    ├── Intents: duvida_tecnica | pedido_alteracao | reclamacao | feedback | outro
    │
    ├── Se confianca >= 80%:
    │   └── responder_automatico (com base no contexto do projeto + FAQ)
    │
    └── Se confianca < 80%:
        └── escalonar_humano (notifica founder via Slack/email)
```

---

## Regras de Orquestracao

| Regra | Descricao | Justificativa |
|---|---|---|
| Execucao sequencial | V1 nao executa agentes em paralelo — um job por vez por organizacao | Evita conflitos de contexto e facilita debug |
| Retry com backoff | 3 tentativas: 30s, 2min, 10min | Cobre falhas transientes de API sem sobrecarregar |
| Fallback para humano | Apos 3 falhas, notifica admin + pausa job | Evita loop infinito de retries |
| Timeout por tipo | Cada job tem limite de execucao definido | Previne jobs travados consumindo recursos |
| Idempotencia | Re-executar job nao duplica output | Permite retry seguro — usa upsert ou check-before-insert |
| Logs obrigatorios | Toda execucao registrada em `execucoes_agentes` | Auditoria completa e debug |
| Versao do contexto | Todos os jobs numa "rodada" usam mesma versao do `business_context` | Consistencia — evita briefing com contexto v1 e conteudo com v2 |
| Ordem do calendario | Conteudos sao gerados na ordem do calendario editorial | Primeiro os pillar pages, depois os supporting |
| Cooldown entre jobs | Minimo 5s entre jobs do mesmo tipo para mesma organizacao | Evita rate limit das APIs de IA |
| Prioridade por estado da organizacao | `live_active` tem prioridade sobre `implementing` na fila de producao | Garantia de SLA para clientes com infra ativa |

---

## Diagrama Completo (ASCII)

```
                            PIPELINE PRINCIPAL V1
    ================================================================

    [USUARIO]
        │
        │ completa onboarding (10 steps)
        ▼
    ┌─────────────────────┐     ┌──────────────────────────────────┐
    │ sessoes_onboarding  │────→│ EVENTO: onboarding_completed     │
    │ status: concluida   │     └──────────────┬───────────────────┘
    └─────────────────────┘                    │
                                               ▼
                                    ┌──────────────────────┐
                                    │ JOB: gerar_business   │
                                    │      _context         │
                                    │ Agente: (funcao)      │
                                    └──────────┬───────────┘
                                               │
                                               ▼
    ┌─────────────────────┐     ┌──────────────────────────────────┐
    │ contextos_negocio   │────→│ EVENTO: business_context_ready   │
    │ versao: 1           │     └──────────────┬───────────────────┘
    └─────────────────────┘                    │
                                               ▼
                                    ┌──────────────────────┐
                                    │ JOB: gerar_estrategia │
                                    │ Agente: Estrategista  │
                                    └──────────┬───────────┘
                                               │
                                               ▼
    ┌─────────────────────┐     ┌──────────────────────────────────┐
    │ palavras_chave (30) │────→│ EVENTO: estrategia_pronta (x3)  │
    │ + calendario        │     └──────────────┬───────────────────┘
    └─────────────────────┘                    │
                                               ▼
                                    ┌──────────────────────┐
                                    │ JOB: gerar_briefing   │
                                    │ Agente: Pesquisador   │
                                    │ (x3 em sequencia)     │
                                    └──────────┬───────────┘
                                               │
                                               ▼
    ┌─────────────────────┐     ┌──────────────────────────────────┐
    │ conteudos (x3)      │────→│ EVENTO: briefing_pronto (x3)    │
    │ status: briefing    │     └──────────────┬───────────────────┘
    └─────────────────────┘                    │
                                               ▼
                                    ┌──────────────────────┐
                                    │ JOB: gerar_conteudo   │
                                    │ Agente: Redator       │
                                    │ (x3 em sequencia)     │
                                    └──────────┬───────────┘
                                               │
                                               ▼
    ┌─────────────────────┐     ┌──────────────────────────────────┐
    │ conteudos (x3)      │────→│ EVENTO: conteudo_escrito (x3)   │
    │ status: escrito     │     └──────────────┬───────────────────┘
    └─────────────────────┘                    │
                                               ▼
                                    ┌──────────────────────┐
                                    │ REVISAO HUMANA (V1)   │
                                    │ Founder revisa        │
                                    │ e aprova/rejeita      │
                                    └──────────┬───────────┘
                                               │
                                               ▼
    ┌─────────────────────┐     ┌──────────────────────────────────┐
    │ conteudos (x3)      │────→│ EVENTO: conteudo_aprovado (x3)  │
    │ status: aprovado    │     └──────────────┬───────────────────┘
    └─────────────────────┘                    │
                                               ▼
                                    ┌──────────────────────┐
                                    │ JOB: publicar_conteudo│
                                    │ Agente: Publicador    │
                                    │ (x3 em sequencia)     │
                                    └──────────┬───────────┘
                                               │
                                               ▼
    ┌─────────────────────┐     ┌──────────────────────────────────┐
    │ conteudos (x3)      │     │ FIM DO PIPELINE V1               │
    │ status: publicado   │     │ Monitoramento manual via GSC     │
    └─────────────────────┘     └──────────────────────────────────┘

    ================================================================
                        TEMPO TOTAL ESTIMADO
    ================================================================
    Onboarding → Business Context:    ~10s
    Business Context → Estrategia:    ~2min
    Estrategia → 3 Briefings:         ~9min (3x 3min)
    3 Briefings → 3 Conteudos:        ~15min (3x 5min)
    Revisao humana:                   ~24-48h
    3 Aprovacoes → 3 Publicacoes:     ~6min (3x 2min)
    ================================================================
    Total automatizado:               ~32min
    Total com revisao humana:         ~24-48h
    ================================================================
```

---

## Maquina de Estados do Pipeline

Cada organizacao tem um estado no pipeline. A transicao e unidirecional (com excecao de revisao):

```
                    ┌──────────────────────────────────────────┐
                    │                                          │
                    ▼                                          │
[onboarding] → [context] → [estrategia] → [briefing] → [escrita] → [revisao]
                                                                       │
                                                              ┌────────┤
                                                              │        │
                                                              ▼        ▼
                                                          [reescrita] [aprovado] → [publicado]
                                                              │
                                                              └────→ [revisao] (max 2x)
```

---

## V1 vs V2+ Automacao

| Processo | V1 (MVP) | V2+ (Evolucao) |
|---|---|---|
| Geracao business_context | Automatico (funcao deterministica) | Automatico + auto-update quando metricas mudam |
| Estrategia | Automatico (Estrategista IA) | Automatico + feedback loop baseado em performance |
| Pesquisa/briefing | Automatico (Pesquisador IA) | Automatico (sem mudancas significativas) |
| Redacao | Automatico (Redator IA) | Automatico (sem mudancas significativas) |
| Revisao | Humano (founder revisa manualmente) | Automatico se score >= 80 (Revisor IA). Humano se < 80 |
| Publicacao | Semi-automatico (founder clica "publicar") | Totalmente automatico conforme calendario |
| Distribuicao | Manual (founder posta em redes) | Automatico (Distribuidor IA em 5+ plataformas) |
| Monitoramento | Manual (founder checa GSC) | Automatico (Monitor sincroniza semanalmente) |
| Feedback loop | Manual (founder decide reotimizar) | Automatico (detecta queda, reotimiza, re-publica) |
| Suporte ao cliente | Email manual | Chat IA com escalonamento automatico |

### Impacto na Carga do Founder

| Metrica | V1 | V2+ |
|---|---|---|
| Tempo por cliente/semana | ~2-4h (revisao + publicacao + monitoramento) | ~15min (apenas revisoes rejeitadas pela IA) |
| Clientes simultaneos | 3-5 max | 20-50+ |
| Intervencao humana | Obrigatoria em 3 etapas | Opcional (apenas edge cases) |

---

## Eventos e Seus Dados

Tabela completa dos eventos que circulam no sistema:

| Evento | Payload | Origem | Destino |
|---|---|---|---|
| `onboarding_completed` | `{ sessao_id, organizacao_id }` | Onboarding service | Job: gerar_business_context |
| `business_context_ready` | `{ contexto_id, organizacao_id, versao }` | Worker: generate-business-context | Job: gerar_estrategia |
| `estrategia_pronta` | `{ projeto_id, keyword_ids[], organizacao_id }` | Worker: generate-strategy | Job: gerar_briefing (x N) |
| `briefing_pronto` | `{ conteudo_id, keyword_id, briefing_json }` | Worker: generate-briefing | Job: gerar_conteudo |
| `conteudo_escrito` | `{ conteudo_id, word_count }` | Worker: generate-content | Notificacao + (V2+: Job: revisar_conteudo) |
| `conteudo_aprovado` | `{ conteudo_id, score_qualidade }` | Revisao humana / Worker: review-content | Job: publicar_conteudo |
| `conteudo_publicado` | `{ conteudo_id, url_publicada, post_id }` | Worker: publish-content | (V2+: Job: distribuir + monitorar) |
| `monitor_detecta_queda` | `{ conteudo_id, metrica, valor_anterior, valor_atual }` | Worker: sync-metrics | Job: feedback loop |

---

## Notas Relacionadas

- [[Orquestrador]] — O agente que executa este fluxo
- [[Jobs]] — Sistema de tarefas assincronas (BullMQ)
- [[Eventos e Gatilhos]] — Detalhamento dos eventos do sistema
- [[Feedback Loop]] — Ciclo de reotimizacao automatica
- [[Fluxo V1]] — Versao simplificada do pipeline
- [[Inputs dos Agentes]] — Dados que cada agente recebe
- [[Estrutura de Codigo]] — Organizacao do projeto
- [[Entidades e Schema - Fase 3 (Dados e Auditoria)]] — `eventos_sistema`, relacionamentos e indices
- [[Estados e Maquina de Estado]] — State machines do sistema
