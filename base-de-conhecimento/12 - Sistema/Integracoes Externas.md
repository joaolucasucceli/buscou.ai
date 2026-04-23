---
tipo: sistema
area: Integracoes
tags: [sistema, integracoes, api, externas]
atualizado: 2026-04-23
---

# Integracoes Externas

Todas as integracoes sao acessadas via MCP tools dentro do Claude Agent SDK. Cada integracao tem rate limits respeitados, fallback definido, e custos mapeados. API keys sao armazenadas no Supabase Vault, nunca em environment variables do frontend.

---

## Stripe (ou Asaas — ADR em [[Stack Tecnologica]])

- **API Docs**: https://docs.stripe.com/api
- **Autenticacao**: Secret Key (server-side) + Publishable Key (client-side para Checkout)
- **Rate Limits**: 100 requests/segundo no modo live (suficiente)
- **Custo BR**: ~4,99% + R$ 0,39 por transacao cartao em parcelamento 12x; ~3,99% em subscription recorrente. Pix ~0,99%.
- **Uso no sistema — dois fluxos (ver [[Agente Pagamento]] e [[Decision Log - 2026-04-23 - Infra Mensal]]):**
  - **Implementacao (one-time)**: Checkout Session em modo `payment`. Parcelado 12x via `payment_with_installments` (Stripe BR) ou equivalente Asaas.
  - **Infra mensal (recurring)**: Subscription criada no mesmo checkout, com `trial_end` = D+30 (mes 1 incluso). Primeira cobranca no mes 2. Valor R$ 300.
- **Webhooks recebidos (discriminados via metadata):**
  - `checkout.session.completed` — confirma implementacao paga OU primeira parcela 12x.
  - `invoice.payment_succeeded` — cobranca de parcela 2-12 da implementacao OU cobranca mensal da infra (metadata `tipo: parcela_implementacao | infra_mensal`).
  - `invoice.payment_failed` — falha em qualquer um dos dois fluxos (discriminar via metadata).
  - `customer.subscription.created` — subscription da infra criada.
  - `customer.subscription.deleted` — cliente cancelou subscription da infra.
  - `charge.refunded` — reembolso.
  - `charge.dispute.created` — chargeback.
- **Metadata padrao em cada evento:** `organizacao_id`, `tipo` (implementacao | infra), `numero_parcela` (se implementacao parcelada), `tentativa` (se retry).
- **Fallback**: Sem fallback — gateway e critico. Se fora do ar, enfileira operacoes para retry. Historico de uptime 99.99%. Caso parcelamento 12x em cartao seja inviavel via Stripe BR (limite de parcelas), alternativa e Asaas (nativo BR). Decisao final em [[Stack Tecnologica]].

---

## WhatsApp Business API (Z-API)

- **API Docs**: https://developer.z-api.io/
- **Autenticacao**: Instance Token + Client Token no header
- **Rate Limits**: 1000 mensagens/dia por numero (WhatsApp impoe), Z-API sem limite adicional
- **Custo**: ~R$60/mes por instancia Z-API. Mensagens template do WhatsApp: ~R$0.25-0.50 cada.
- **Uso no sistema**: Notificacoes para clientes (relatorios, alertas), cobranca (mensagens de pagamento), suporte (recebimento de tickets), SDR (follow-ups de leads)
- **Endpoints usados**: `POST /send-text`, `POST /send-document`, `POST /send-link`, `GET /chats`, webhook de mensagens recebidas
- **Fallback**: Se Z-API cair, enfileira mensagens no BullMQ e envia por email via SendGrid como canal alternativo.

---

## Ahrefs API

- **API Docs**: https://docs.ahrefs.com/reference
- **Autenticacao**: API Key no header `Authorization: Bearer <key>`
- **Rate Limits**: Depende do plano. Standard: 500 rows/request, 5 requests/segundo. Creditos mensais variam por plano.
- **Custo**: Plano Standard ~$249/mes com API credits inclusos. Credits adicionais sob demanda.
- **Uso no sistema**: Pesquisa de keywords (volume, dificuldade, CPC), analise de backlinks, analise de concorrentes, keyword gap analysis, domain rating
- **Endpoints usados**: `/v3/keywords-explorer/search-suggestions`, `/v3/site-explorer/organic-keywords`, `/v3/site-explorer/backlinks`, `/v3/keywords-explorer/keyword-ideas`
- **Fallback**: Cache dos ultimos dados coletados (validade 7 dias). Para keyword research, SEMrush como alternativa futura. Para MVP, dados do GSC como complemento.

---

## Google Search Console API

- **API Docs**: https://developers.google.com/webmaster-tools/v1/api_reference_index
- **Autenticacao**: OAuth 2.0 (service account com domain-wide delegation ou consent do cliente)
- **Rate Limits**: 200 requests/minuto por projeto, 20000 requests/dia
- **Custo**: Gratuito
- **Uso no sistema**: Posicoes organicas reais (impressoes, cliques, CTR, posicao media), paginas indexadas, erros de cobertura, performance queries
- **Endpoints usados**: `POST /searchAnalytics/query` (principal), `GET /sitemaps`, `POST /urlInspection/index:inspect`
- **Fallback**: Ahrefs como fonte secundaria de posicoes (dados estimados, menos precisos). GSC e a fonte de verdade para posicoes organicas.

---

## Google Analytics 4 (GA4) — Data API

- **API Docs**: https://developers.google.com/analytics/devguides/reporting/data/v1
- **Autenticacao**: OAuth 2.0 (service account)
- **Rate Limits**: 10 requests concorrentes por propriedade, quotas diarias por projeto
- **Custo**: Gratuito (GA4 standard)
- **Uso no sistema**: Trafego organico (sessoes, usuarios, bounce rate), conversoes, tempo na pagina, comportamento de usuario por landing page
- **Endpoints usados**: `POST /v1beta/{property}:runReport`, `POST /v1beta/{property}:runRealtimeReport`
- **Fallback**: Se GA4 nao estiver configurado, dashboard mostra apenas dados do GSC. Nao e obrigatorio na configuracao do projeto.

---

## Otterly.ai API

- **API Docs**: https://docs.otterly.ai (API privada, acesso por plano)
- **Autenticacao**: API Key no header
- **Rate Limits**: Depende do plano. ~100 queries/dia no plano Pro.
- **Custo**: ~$99/mes (plano Pro com API access)
- **Uso no sistema**: Monitoramento de citacoes em IA (ChatGPT, Gemini, Perplexity). Verifica se o conteudo do cliente e citado em respostas de LLMs. Tracking de visibilidade AIO.
- **Endpoints usados**: Queries de monitoramento, resultados de citacao, historico de visibilidade
- **Fallback**: LLMrefs como fonte complementar. Se ambos falharem, monitoramento AIO fica pausado ate proximo ciclo. Dados sao armazenados em cache por 7 dias.

---

## LLMrefs API

- **API Docs**: https://docs.llmrefs.com (API em beta)
- **Autenticacao**: API Key
- **Rate Limits**: ~50 queries/dia (plano inicial)
- **Custo**: ~$49/mes (plano starter)
- **Uso no sistema**: Complementa Otterly. Monitora citacoes em modelos especificos (Claude, Copilot). Analise de como LLMs referenciam conteudo. Metricas de AIO mais granulares.
- **Endpoints usados**: Citation check, competitor analysis, query tracking
- **Fallback**: Otterly como fonte primaria. LLMrefs e complementar — se indisponivel, nao bloqueia o pipeline.

---

## WordPress REST API

- **API Docs**: https://developer.wordpress.org/rest-api/
- **Autenticacao**: Application Passwords (username + app password) ou JWT plugin
- **Rate Limits**: Depende do hosting do cliente (geralmente 100-500 req/min)
- **Custo**: Gratuito (API nativa do WordPress)
- **Uso no sistema**: Publicacao automatizada de conteudo (posts, paginas), upload de imagens, atualizacao de meta tags (Yoast/RankMath), verificacao de sitemap
- **Endpoints usados**: `POST /wp-json/wp/v2/posts` (criar post), `PUT /wp-json/wp/v2/posts/{id}` (atualizar), `POST /wp-json/wp/v2/media` (upload), `GET /wp-json/wp/v2/posts` (listar)
- **Fallback**: Se API do WordPress falhar, conteudo fica em status approved no nosso sistema. Admin pode publicar manualmente. Alerta enviado.

---

## LinkedIn API (Pages)

- **API Docs**: https://learn.microsoft.com/en-us/linkedin/marketing/
- **Autenticacao**: OAuth 2.0 (3-legged, token refresh a cada 60 dias)
- **Rate Limits**: 100 requests/dia para posts (API restritiva)
- **Custo**: Gratuito
- **Uso no sistema**: Distribuicao de conteudo publicado como posts no LinkedIn da empresa do cliente. Compartilhamento de artigos com resumo gerado pelo agente.
- **Endpoints usados**: `POST /ugcPosts` (criar post), `GET /organizationalEntityShareStatistics` (metricas)
- **Fallback**: Se token expirar, alerta admin para reconectar. Posts ficam enfileirados. Canal opcional — nao bloqueia pipeline.

---

## Reddit API

- **API Docs**: https://www.reddit.com/dev/api/
- **Autenticacao**: OAuth 2.0 (script app)
- **Rate Limits**: 60 requests/minuto (OAuth), 10 requests/minuto (sem OAuth)
- **Custo**: Gratuito
- **Uso no sistema**: Distribuicao de conteudo em subreddits relevantes ao nicho do cliente. Monitoramento de mencoes da marca/dominio.
- **Endpoints usados**: `POST /api/submit` (postar), `GET /search` (buscar mencoes)
- **Fallback**: Canal opcional de distribuicao. Se indisponivel, pula e distribui nos demais canais.

---

## Medium API

- **API Docs**: https://github.com/Medium/medium-api-docs
- **Autenticacao**: Integration Token (self-issued)
- **Rate Limits**: Nao documentados oficialmente. ~100 posts/dia estimado.
- **Custo**: Gratuito
- **Uso no sistema**: Cross-posting de artigos no Medium com canonical URL apontando para o site do cliente (beneficio SEO). Amplia alcance do conteudo.
- **Endpoints usados**: `POST /v1/users/{userId}/posts` (publicar artigo)
- **Fallback**: Canal opcional. Se indisponivel, conteudo nao e cross-postado. Sem impacto no pipeline principal.

---

## SendGrid API

- **API Docs**: https://docs.sendgrid.com/api-reference
- **Autenticacao**: API Key no header `Authorization: Bearer <key>`
- **Rate Limits**: Depende do plano. Free: 100 emails/dia. Pro: sem limite pratico.
- **Custo**: Free ate 100/dia. Pro ~$20/mes para 50k emails/mes.
- **Uso no sistema**: Envio de relatorios por email, notificacoes (welcome apos compra, alertas de inadimplencia da infra mensal, aviso de pausa/retomada do motor, cobrancas), emails transacionais (reset password delegado do Supabase Auth)
- **Endpoints usados**: `POST /v3/mail/send` (envio), `GET /v3/stats` (metricas de entrega)
- **Fallback**: Supabase Auth tem SMTP proprio para emails basicos (confirmacao, reset). SendGrid e para emails ricos (templates HTML).

---

## Google Calendar API

- **API Docs**: https://developers.google.com/calendar/api/v3/reference
- **Autenticacao**: OAuth 2.0 (service account ou consent do cliente)
- **Rate Limits**: 500 requests/100s por usuario, 1000000 requests/dia
- **Custo**: Gratuito
- **Uso no sistema**: Agendamento de calls opcionais de esclarecimento (Agente Prospeccao), lembretes de onboarding, agendamento de publicacoes
- **Endpoints usados**: `POST /calendars/{id}/events` (criar evento), `GET /calendars/{id}/events` (listar)
- **Fallback**: Se nao configurado, agendamentos sao feitos via WhatsApp manualmente.

---

## Resumo de Custos Mensais (Estimativa MVP)

| Integracao | Custo Mensal Estimado |
|---|---|
| Stripe | ~2.99% + R$0.39/transacao |
| Z-API (WhatsApp) | R$60 |
| Ahrefs | ~$249 (~R$1.250) |
| Otterly.ai | ~$99 (~R$500) |
| LLMrefs | ~$49 (~R$250) |
| SendGrid | $20 (~R$100) |
| GSC, GA4, WP, LinkedIn, Reddit, Medium, Calendar | Gratuito |
| **Total estimado (infra integracoes)** | **~R$2.160/mes** |

Ver [[Arquitetura do Sistema]] para onde cada integracao se encaixa.
Ver [[Modulos]] para quais modulos usam cada integracao.
