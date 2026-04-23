---
tipo: sistema
area: Agentes
tags: [agentes, inputs, outputs, onboarding, contexto, business-context]
atualizado: 2026-04-23
---

# Inputs dos Agentes — Do Onboarding a Execucao

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. O [[Onboarding Automatico]] gera o [[Objeto Business Context]]. Este documento mapeia exatamente quais campos cada um dos 11 agentes V1 recebe e o que produz. Nenhum agente opera sem contexto — todos leem o `business_context` como base.

---

## Fluxo de dados

```
+-------------------+
|   ONBOARDING      |  (wizard 5 etapas: dominio, nicho, tom, concorrentes, GSC)
+--------+----------+
         |
         v
+-------------------+
| BUSINESS CONTEXT  |  (JSON consolidado — tabela contextos_negocio)
| (cerebro central) |
+--------+----------+
         |
         +--→ [Pesquisador]  → briefing, SERP, gaps
         +--→ [Estrategista] → clusters, keywords, calendario (90/mes)
         +--→ [Redator]      → artigo 800-1.200 palavras, FAQ, meta
         +--→ [Revisor]      → score, aprovacao
         +--→ [Visual]       → plano visual, imagens, alt text, filename
         +--→ [Publicador]   → pagina publicada, schema, imagens, sitemap, GSC
         +--→ [Distribuidor] → RSS + sitemap (V1); LinkedIn/Medium (V1.2+)
         +--→ [Monitor]      → rankings, citacoes IA, alertas
         +--→ [Suporte]      → respostas contextualizadas (chat in-app / WhatsApp)
         +--→ [Prospeccao]   → outbound (e-mail + LinkedIn V1.2+)
         +--→ [Pagamento]    → confirmacao, retry, parcelas do 12x
                  |
                  v
         +-------------------+
         |   RESULTADOS      |
         +--------+----------+
                  |
                  v
         +-------------------+
         |  FEEDBACK LOOP    |  → Atualiza business_context (nova versao)
         +-------------------+
```

---

## Inputs e outputs por agente

### [[Agente Pesquisador]]

| Input | Campo |
|---|---|
| Keyword alvo | do Estrategista (tabela `palavras_chave`) |
| Localidade | `localizacoes.cidade_principal` |
| Concorrentes | `concorrentes[].site_url` |
| Servico relacionado | `oferta.servico_principal` |
| Perfil semantico | `publico.dores`, `publico.objecoes`, `publico.termos_busca` |

| Output | Destino |
|---|---|
| Briefing completo | tabela `briefings_conteudo` |
| Analise SERP (top 10) | dentro do `briefing_json` |
| Content gaps | dentro do `briefing_json` |
| Dados, fontes, estatisticas | dentro do `briefing_json` |
| FAQs e objecoes do publico | dentro do `briefing_json` |

---

### [[Agente Estrategista]]

| Input | Campo |
|---|---|
| Categoria do negocio | `identidade.categoria` |
| Cidade e bairros foco | `localizacoes.cidade_principal`, `localizacoes.bairros_foco` |
| Servicos e prioridades | `oferta.servico_principal`, `oferta.servicos_secundarios` |
| Objetivo principal | `objetivos.objetivo_principal` |
| Concorrentes | `concorrentes[]` |
| Persona e termos de busca | `publico.termos_busca`, `publico.dores` |

| Output | Destino |
|---|---|
| Clusters de topicos | tabela `palavras_chave` (agrupadas) |
| Keywords prioritarias (com score) | tabela `palavras_chave` |
| Calendario editorial 90/mes | input para [[Orquestrador]] (fila de jobs) |
| Paginas locais recomendadas | input para [[Agente Redator]] |

---

### [[Agente Redator]]

| Input | Campo |
|---|---|
| Briefing completo | tabela `briefings_conteudo.briefing_json` |
| Tom de voz | `marca.tom_de_voz` |
| Diferenciais e provas | `marca.diferenciais` |
| Localidade | `localizacoes.cidade_principal`, `localizacoes.bairros_foco` |
| CTA principal | `identidade.cta_principal` |
| Palavras permitidas/proibidas | `marca.palavras_usar`, `marca.palavras_evitar` |

| Output | Destino |
|---|---|
| Artigo completo 800-1.200 palavras (markdown) | tabela `conteudos.conteudo_markdown` |
| FAQ estruturado | dentro do conteudo |
| Meta title | `conteudos.titulo_seo` |
| Meta description | `conteudos.meta_descricao` |
| Trechos answer-first | dentro do conteudo (para AIO) |
| Blocos de CTA | dentro do conteudo |

---

### [[Agente Revisor]]

| Input | Campo |
|---|---|
| Conteudo escrito | tabela `conteudos` (status: `escrevendo` → `revisando`) |
| Regras da marca | `marca.tom_de_voz`, `marca.palavras_evitar` |
| Perfil do negocio | `identidade` completo |
| Criterios de qualidade | config do sistema (SEO, AIO, answer-first, score min 75) |

| Output | Destino |
|---|---|
| Score SEO | `conteudos.pontuacao_seo` |
| Score AIO | `conteudos.pontuacao_aio` |
| Aprovacao ou rejeicao | `conteudos.status` → `aprovado` ou `revisao_necessaria` |
| Feedback para reescrita | `execucoes_agentes.saida_json` (se rejeitado) |
| Alertas de factualidade | log de alertas |

---

### [[Agente Visual]]

| Input | Campo |
|---|---|
| Conteudo do artigo | `conteudos.conteudo_markdown` |
| Keyword principal | `conteudos.keyword_principal` |
| Categoria | `identidade.categoria` |
| Cidade e bairros | `localizacoes.cidade_principal`, `localizacoes.bairros_foco` |
| Servico principal | `oferta.servico_principal` |
| Tom e marca | `marca.tom_de_voz`, `marca.cores` |
| Estrutura do artigo | H2s e blocos |
| Briefing | `briefings_conteudo.briefing_json` |

| Output | Destino |
|---|---|
| Plano visual (JSON) | `conteudos.plano_visual_json` |
| Imagens originais | Supabase Storage (`image-staging-private`) |
| Metadados SEO (filename, alt, caption) | tabela `imagens_conteudo` |
| Imagens otimizadas WebP | Supabase Storage (`blog-imagens-publico`) |
| Marcadores no markdown | `conteudos.conteudo_markdown` (atualizado) |

---

### [[Agente Publicador]]

| Input | Campo |
|---|---|
| Conteudo aprovado | tabela `conteudos` (status: `aprovado`) |
| Slug | `conteudos.slug` |
| Categoria | `identidade.categoria` |
| Schema markup | gerado conforme tipo de conteudo |
| Assets da marca | logo, cores de `marca` |
| Localidade | `localizacoes` (para schema LocalBusiness) |

| Output | Destino |
|---|---|
| Pagina publicada | `conteudos.url_publicada`, status → `publicado` |
| Schema JSON-LD inserido | na pagina |
| Sitemap atualizado | no site do cliente |
| Status de indexacao | submissao GSC API |
| llms.txt atualizado | no site do cliente |

---

### [[Agente Distribuidor]]

| Input | Campo |
|---|---|
| URL publicada | `conteudos.url_publicada` |
| Resumo do conteudo | gerado a partir do artigo |
| Perfil do cliente | `identidade`, `marca.tom_de_voz` |
| Canais ativos | `integracoes` (V1: apenas GSC; V1.2+: LinkedIn, Medium; V2: Reddit) |

| Output | Destino |
|---|---|
| Sitemap + ping GSC (V1) | API GSC |
| Post LinkedIn (V1.2+) | API LinkedIn |
| Artigo Medium com canonical (V1.2+) | API Medium |
| Post Reddit (V2) | API Reddit |
| Log de distribuicao | tabela `distribution_log` |

---

### [[Agente Monitor]]

| Input | Campo |
|---|---|
| Projeto | tabela `projetos` |
| Queries-alvo | tabela `palavras_chave` |
| URLs publicadas | tabela `conteudos` (status: `publicado`) |
| Integracoes analytics | `integracoes` (GSC, GA4, Otterly, LLMrefs) |

| Output | Destino |
|---|---|
| Rankings por keyword | tabela `metricas_snapshots` |
| Impressoes e cliques | tabela `metricas_snapshots` |
| Presenca em IA | tabela `citacoes_ia` |
| Alertas (queda, oportunidade) | input para [[Feedback Loop]] e [[Orquestrador]] |

---

### [[Agente Suporte]]

| Input | Campo |
|---|---|
| Perfil do cliente | `identidade`, status da compra, modalidade (a vista / 12x) |
| Status do projeto | tabela `projetos`, metricas recentes |
| Knowledge base | vault SEO/AIO (secoes 06-08 + FAQ operacional) |
| Eventos recentes | tabela `execucoes_agentes` (ultimas acoes) |
| Historico | tabela `mensagens_suporte` |

| Output | Destino |
|---|---|
| Respostas contextualizadas | chat in-app / WhatsApp |
| Tickets | tabela `conversas_suporte` |
| Escalacao para humano | flag `escalonada_para_humano` |

---

### [[Agente Prospeccao]]

| Input | Campo |
|---|---|
| Lista de leads | Google Maps API, CNPJ por segmento |
| Perfil do ICP | criterios de [[ICP por Nicho]] |
| Templates de sequencia | biblioteca interna |
| Calendario de envio | config do Orquestrador |

| Output | Destino |
|---|---|
| E-mails enviados | SendGrid / Resend |
| Mensagens LinkedIn (V1.2+) | API LinkedIn |
| Metricas de campanha | dashboard admin |
| Leads com resposta positiva | CRM → direcionados para landing (nao reuniao obrigatoria) |

---

### [[Agente Pagamento]]

| Input | Campo |
|---|---|
| Webhooks do gateway | Stripe / Asaas (dois fluxos: implementacao e infra mensal — discriminados via metadata) |
| Dados do cliente | modalidade da implementacao (a vista / 12x), status de cada parcela, status da subscription da infra (pending_start / active / overdue / paused / cancelled), mes do ciclo |
| Configuracao de retry | implementacao: smart retry do gateway (D+0/D+3/D+5); infra mensal: D+0/D+3/D+7 com pausa do motor apos 3 falhas |
| Templates de notificacao | por estagio (confirmacao, aviso de falha, lembrete, aviso critico, pausa do motor, regularizacao) |

| Output | Destino |
|---|---|
| `compra.confirmada` | dispara onboarding |
| `parcela.paga` / `compra.quitada` | atualiza billing no dashboard |
| `infra.assinatura_iniciada` / `infra.cobranca_paga` | atualiza billing no dashboard |
| `infra.cobranca_falhou` (tentativa 1-3) | notificacoes escaladas (e-mail + WhatsApp) |
| `motor.pausar_por_inadimplencia` / `motor.retomar_apos_regularizacao` | Orquestrador atualiza estado da organizacao |
| Relatorios | dashboard admin (caixa, MRR real, churn de infra) |

**Importante:** gerencia **dois fluxos** — (1) implementacao (compra unica a vista OU parcelada em 12x) e (2) infra mensal (subscription recorrente R$ 300 a partir do mes 2, passthrough de custo operacional). Detalhes em [[Agente Pagamento]].

---

## Hierarquia de inputs

Agentes nao operam no vacuo. Hierarquia de autoridade sobre dados:

```
1. VERDADE_UNICA_BUSCOU (fonte canonica — sobrepoe qualquer outra decisao)
   ↓
2. BUSINESS CONTEXT (perfil especifico do cliente)
   ↓
3. PLANO ESTRATEGICO (clusters, keywords, calendario gerado pelo Estrategista)
   ↓
4. BRIEFING DO CONTEUDO (pesquisa, outline, fontes do Pesquisador)
   ↓
5. DADOS DE PERFORMANCE (rankings, citacoes, trafego do Monitor)
   ↓ retroalimenta tudo via Feedback Loop
```

### Regras

| Regra | Significado |
|---|---|
| Verdade canonica e intocavel | Decisoes Nivel 1 (posicionamento, oferta, ICP, linguagem) nunca sao contrariadas por agentes |
| Business context e sagrado | Se o tom do cliente e "formal", Redator NAO escreve casual |
| Estrategia sobrepoe decisoes locais | Se Estrategista priorizou keyword A, Pesquisador nao decide fazer B |
| Monitor pode reabrir ciclos | Se detecta queda, dispara nova otimizacao mesmo para conteudo "concluido" |
| Revisor tem poder de veto | Pode rejeitar Redator. Redator reescreve conforme feedback (max 2 ciclos) |
| Orquestrador e o arbitro | Em conflito, decide baseado na hierarquia acima |

---

## Limites da automacao (V1)

Nem tudo e automatico no comeco. Definir o que NAO automatizar reduz risco:

| Processo | V1 (manual/supervisionado) | V1.2+ (automatico) |
|---|---|---|
| Decisoes estrategicas complexas | Humano aprova | Agente com threshold de confianca |
| Mudancas de posicionamento | Humano decide | Nunca automatizar |
| Ajustes de branding | Humano decide | Nunca automatizar |
| Interpretacao de feedback ambiguo | Humano analisa | Agente com historico |
| Publicacao de conteudo | Auto-publish se score >= 75 | Auto-publish padrao, humano so em alertas |
| Resposta a cliente insatisfeito | Humano sempre | Humano sempre |

---

## Objeto central: business_context

Todos os agentes leem o mesmo objeto: `contextos_negocio.contexto_json`.

Gerado na conclusao do [[Onboarding Automatico]], atualizado pelo [[Feedback Loop]].

Detalhes: [[Objeto Business Context]].

**Regra:** nenhum agente deve pedir informacao que ja esta no business_context. Se falta, Orquestrador solicita ao cliente via dashboard.

---

## Notas relacionadas

- [[Objeto Business Context]] — estrutura completa do JSON
- [[Onboarding Automatico]] — wizard que gera o contexto
- [[Arquitetura de Agentes]] — como os agentes se comunicam
- [[Orquestrador]] — distribui os inputs
- [[Feedback Loop]] — como o contexto evolui
- [[Entidades e Schema - Fase 1 (Onboarding)]] — tabelas do banco (Fase 1 linka para Fase 2 e Fase 3)

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 6, 7 — ultima verificacao 2026-04-23.*
