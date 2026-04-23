---
tipo: referencia
area: Ferramentas
tags: [referencias, automacao, ferramentas, api]
atualizado: 2026-04-22
---

# Ferramentas de Automacao SEO

Mapeamento das ferramentas e APIs que nosso [[Sistema Multi-Agente]] vai integrar. Cada ferramenta foi avaliada por: funcionalidade, preco, limites, e como se encaixa na nossa arquitetura.

---

## 1. Ahrefs API

**O que oferece:** Acesso programatico aos dados de backlinks, keywords, ranking, e analise competitiva do Ahrefs.

**Pricing:**

| Plano | Preco/mes | API Units/mes | Acesso API |
|-------|-----------|---------------|------------|
| Starter | $29 | - | Nao |
| Lite | $129 | 10.000 | Sim |
| Standard | $249 | 150.000 | Sim |
| Advanced | $449 | 500.000 | Sim |
| Enterprise | $14.990+ | 2.000.000 | Ilimitado |

**Rate limits:** 60 requests por minuto em todos os planos.

**Como unidades sao consumidas:** Base de 50 units por request + custo por campo retornado (1-10 units por campo). Metricas premium consomem 5-10 units cada. Overage: $0.35-1.00 por 1.000 rows dependendo do plano.

**Para que usamos:**
- [[Agente Pesquisador]]: analise de keywords, dificuldade, volume de busca
- [[Agente Estrategista]]: analise de backlinks de concorrentes, gap analysis
- [[Agente Monitor]]: tracking de posicoes, alertas de queda

**Limitacoes:** API exige plano Lite+ ($129/mes minimo). O Starter ($29) NAO tem acesso a API. Para uso intensivo, o plano Advanced ($449) ou a API dedicada ($500-10.000/mes) e necessario. Units expiram apos 3 meses de billing.

**Alternativa mais barata:** DataForSEO - pay-as-you-go, sem assinatura, cobertura ampla. Serper para SERP scraping a $0.30/1.000 queries.

**Fontes:** [Ahrefs Pricing](https://ahrefs.com/blog/ahrefs-pricing/) | [Ahrefs API Docs](https://docs.ahrefs.com/api/docs/limits-consumption) | [Ahrefs API Pricing UPAI](https://upai.lat/blog/ahrefs-api-pricing)

---

## 2. Google Search Console API

**O que oferece:** Dados reais de performance de busca organica - impressoes, cliques, CTR, posicao media por query e pagina.

**Pricing:** Gratuito (requer conta Google e verificacao de propriedade do site).

**O que conseguimos:**
- Performance data: queries, paginas, paises, dispositivos, datas
- Indexacao: status de cada URL, cobertura, erros
- Sitemaps: submissao e monitoramento
- Core Web Vitals: dados de performance
- Links: backlinks e links internos detectados pelo Google

**Limitacoes:**
- Dados com delay de 24-48 horas (nao e tempo real)
- Maximo de 25.000 rows por request no Search Analytics
- Dados limitados a 16 meses de historico
- Amostragem em sites com muito trafego
- Rate limit: 200 requests por minuto por projeto

**Para que usamos:**
- [[Agente Monitor]]: tracking de performance organica real
- [[Agente Auditor]]: identificacao de erros de indexacao
- [[Agente Estrategista]]: identificacao de keywords com potencial (posicao 5-15)

**Fontes:** [Google Search Console API](https://developers.google.com/webmaster-tools/search-console-api-original)

---

## 3. Google Analytics Data API (GA4)

**O que oferece:** Acesso aos dados do Google Analytics 4 - sessoes, usuarios, eventos, conversoes, comportamento no site.

**Pricing:** Gratuito para GA4 standard. GA4 360 (enterprise) tem custo.

**O que conseguimos:**
- Metricas de engajamento: sessoes, duracao, bounce rate, paginas/sessao
- Conversoes e eventos customizados
- Demograficos: idade, genero, interesses, localizacao
- Origem de trafego: organico, pago, social, referral, direto
- E-commerce: receita, transacoes, produtos

**Limitacoes:**
- Quotas: 10.000 requests por dia por projeto, 10 requests concorrentes
- Amostragem em queries complexas com grandes volumes de dados
- Dados sujeitos a thresholding (valores pequenos ocultados para privacidade)

**Para que usamos:**
- [[Agente Monitor]]: correlacionar ranking com trafego e conversoes reais
- [[Dashboard do Cliente]]: metricas de ROI
- [[Agente Estrategista]]: identificar conteudos de alto engajamento para replicar

**Fontes:** [Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1)

---

## 4. Screaming Frog SEO Spider

**O que oferece:** Crawler de websites para auditoria tecnica SEO - links quebrados, redirects, meta tags, duplicatas, Core Web Vitals, JavaScript rendering.

**Pricing:** Gratuito ate 500 URLs | $259/ano para versao completa (URLs ilimitadas).

**Pode ser automatizado?** SIM. Desde a versao 10, tem CLI (Command Line Interface) completo:
- Agendar crawls via cron jobs ou Windows Task Scheduler
- Rodar multiplos crawls simultaneos sem GUI
- Exportar dados especificos via parametros de linha de comando
- Integrar com Python scripts, Google Sheets, APIs

**Comandos uteis:**
```
ScreamingFrogSEOSpiderCli.exe --crawl https://exemplo.com --headless --config "config.seospiderconfig"
ScreamingFrogSEOSpiderCli.exe --crawl https://exemplo.com --export-tabs "Internal:All"
```

**Integracao com MCP:** Existe um MCP server para Screaming Frog que permite integracao direta com Claude e outros assistentes IA para workflows de SEO automatizados.

**Performance:** Crawl de 50.000 paginas em ~35 minutos vs 6+ horas para crawlers cloud (Semrush).

**Para que usamos:**
- [[Agente Auditor]]: crawl tecnico completo automatizado
- Pipeline de auditoria: executar via CLI, processar resultados, gerar recomendacoes

**Limitacoes:** Precisa rodar localmente (nao e cloud-native); consome recursos da maquina; licenca por maquina.

**Fontes:** [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) | [Screaming Frog CLI Guide](https://understandingdata.com/posts/the-comprehensive-guide-to-automating-screaming-frog/) | [Screaming Frog MCP](https://mcpmarket.com/server/screaming-frog-seo-spider)

---

## 5. Surfer SEO API

**O que oferece:** Content optimization scoring - analisa top-ranking content e fornece guidelines de otimizacao (keywords, estrutura, tamanho, entidades).

**Pricing:** API access disponivel apenas no plano Enterprise (preco custom).

**Para que usamos:**
- [[Agente Editor]]: scoring de conteudo antes da publicacao
- [[Agente Writer]]: guidelines de otimizacao durante a escrita

**Alternativa:** Implementar nosso proprio scoring baseado em SERP analysis usando DataForSEO + NLP proprio. Mais barato a longo prazo e sem dependencia.

---

## 6. WordPress REST API

**O que oferece:** CRUD completo de posts, paginas, categorias, tags, midia, usuarios, comentarios.

**Pricing:** Gratuito (built-in no WordPress).

**Capacidades:**
- Criar/editar/publicar posts e paginas programaticamente
- Upload de imagens e midia
- Gerenciar categorias, tags e taxonomias
- Gerenciar menus e widgets
- Autenticacao via Application Passwords ou OAuth

**Para que usamos:**
- [[Agente Publisher]]: publicacao automatica de conteudo
- [[Agente Auditor]]: leitura de conteudo existente para auditoria
- [[Sistema de Distribuicao]]: agendamento de publicacoes

**Limitacoes:** Performance pode degradar em sites com muitos plugins; necessita autenticacao segura; rate limiting depende do hosting.

**Fontes:** [WordPress REST API](https://developer.wordpress.org/rest-api/)

---

## 7. Stripe API

**O que oferece:** Processamento de pagamentos, gerenciamento de assinaturas, faturamento recorrente, webhooks para eventos.

**Pricing:** 2.9% + $0.30 por transacao (cartao internacional) | Taxas variam por pais. No Brasil via Stripe: 3.99% + R$0.39.

**Capacidades:**
- Checkout Sessions para onboarding
- Subscriptions com trial periods
- Customer Portal para auto-gerenciamento
- Webhooks para eventos (pagamento, cancelamento, falha)
- Invoicing automatico
- Metered billing (cobranca por uso)

**Para que usamos:**
- [[Sistema de Billing]]: cobranca recorrente dos clientes
- [[Onboarding]]: trial gratuito + upgrade automatico
- [[Dashboard Admin]]: monitoramento de MRR, churn, LTV

**Alternativa Brasil:** Stripe funciona no Brasil, mas alternativas locais incluem Pagar.me (iugu), Asaas, e Vindi para boleto/PIX nativos.

**Fontes:** [Stripe Pricing](https://stripe.com/pricing) | [Stripe API Docs](https://docs.stripe.com/api)

---

## 8. WhatsApp Business API

**O que oferece:** Envio e recebimento de mensagens WhatsApp programaticamente para comunicacao empresarial.

**Opcoes de provedor:**

| Provedor | Tipo | Custo Base | Markup |
|----------|------|-----------|--------|
| WhatsApp Cloud API (Meta) | Oficial/Direto | Gratis (apenas taxa por mensagem) | Nenhum |
| Twilio | BSP Oficial | $0.005/msg + taxa Meta | $50-500/mes + 10-30% markup |
| Z-API | Nao-oficial (Brasil) | ~R$70-200/mes | Sem taxa por mensagem |
| Waha | Self-hosted | Open source | Sem taxa por mensagem |

**Custos por mensagem Meta (2026):**
- Marketing: $0.025-$0.1365 (varia por pais)
- Utility: $0.004-$0.0456
- Authentication: $0.004-$0.0456
- Service (resposta em 24h): GRATIS

**Novidades 2026:**
- Volume Tiers com descontos para Utility e Authentication (nao Marketing)
- Brasil tera billing local em H2 2026

**Para que usamos:**
- [[Agente SDR]]: prospecção, qualificacao e nurturing de leads via WhatsApp
- [[Sistema de Notificacoes]]: alertas para clientes sobre resultados
- [[Onboarding]]: comunicacao durante trial

**Recomendacao:** Comecar com Z-API ou Waha (custo fixo, sem taxa por mensagem) para MVP. Migrar para WhatsApp Cloud API oficial quando escalar para compliance.

**Fontes:** [WhatsApp Platform Pricing](https://business.whatsapp.com/products/platform-pricing) | [Twilio WhatsApp](https://www.twilio.com/en-us/whatsapp/pricing) | [WhatsApp API Pricing Guide](https://respond.io/blog/whatsapp-business-api-pricing)

---

## 9. Google Calendar API

**O que oferece:** Gerenciamento programatico de calendarios e eventos Google Calendar.

**Pricing:** Gratuito (com quotas).

**Capacidades:**
- Criar/editar/deletar eventos
- Verificar disponibilidade (free/busy)
- Convites automaticos
- Webhooks para notificacoes de mudancas

**Para que usamos:**
- [[Agente SDR]]: agendar reunioes de discovery com leads qualificados
- [[Sistema de Onboarding]]: agendar kickoff calls

**Alternativa:** Calendly API para agendamento self-service (freemium, $8+/mes para features avancadas).

**Fontes:** [Google Calendar API](https://developers.google.com/calendar/api)

---

## Resumo de Custos Mensais (Stack Minima para MVP)

| Ferramenta | Custo/mes | Prioridade |
|------------|----------|------------|
| Google Search Console API | Gratis | P0 |
| Google Analytics Data API | Gratis | P0 |
| WordPress REST API | Gratis | P0 |
| Google Calendar API | Gratis | P1 |
| Z-API (WhatsApp) | ~R$100 | P1 |
| Screaming Frog | ~$22/mes ($259/ano) | P1 |
| DataForSEO (alt. Ahrefs) | ~$50-100/mes (pay-as-you-go) | P0 |
| Stripe | % por transacao | P0 |
| **Total MVP** | **~$200-300/mes** | - |

> **Nota:** Stack completa com Ahrefs Standard + Surfer Enterprise pode chegar a $700+/mes. Ver [[Arquitetura do Sistema]] para decisao final de stack.
