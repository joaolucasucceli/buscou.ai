---
tipo: empresa
area: Produto
tags: [empresa, roadmap, produto, venda-unica, canonico]
atualizado: 2026-04-24
---

# Roadmap do Produto

> **Canonico.** Reflete [[VERDADE_UNICA_BUSCOU]] — modelo de venda unica (R$ 2.500/R$ 3.000). Produto e Blog + Motor (90 conteudos/mes).

---

## Visao geral

```
MVP (M1-2)   V1 (M3-4)   V1.1 (gatilhada)   V2 (M5-8)       V3 (M9-12)     FUTURO
    |            |              |                 |                |              |
 Motor core  Pipeline     Integracoes         Monitoramento    Multi-blog     API publica
 Blog base   completo     externas            avancado         Renovacao      White-label
 Dual-track  Anna Mel     CRM via webhook     50+ clientes     150+ cli.      Internacional
 5 clientes  10-15 cli.                                                       Marketplace
```

**Dual-track desde V1 (2026-04-24):** Stripe Checkout (Track 1 self-service PIX/cartao) + Cal.com embed + webhook Uazapi (Track 2 consultivo com agendamento integrado). Ver [[Decision Log - 2026-04-24 - Dual-Track]].

**Principio:** cada fase valida uma hipotese antes de investir na proxima. Nao construir por construir.

---

## MVP — Meses 1-2

### Objetivo

Provar que o motor gera conteudo que rankeia no Google + aparece em IAs, publicando no blog do cliente 3x/dia.

### O que construir

| Componente | Descricao | Stack |
|---|---|---|
| **Motor base** | Agente Redator com prompts calibrados para SEO + AIO (answer-first, schema, dados, interlinking). | Claude Sonnet 4.6 + prompt caching |
| **Blog template** | Template Next.js com schema JSON-LD, llms.txt, sitemap, Open Graph. Tema simples customizavel por cores/logo. | Next.js + Vercel |
| **Pipeline minimo** | Input: nicho + keywords → 3 artigos/dia gerados e publicados no blog. | Node/Python script + fila |
| **Dashboard minimo** | Lista de artigos publicados + status + link. Acesso via login. | Next.js + Supabase |
| **Onboarding manual** | Formulario Google Forms. Fundador configura dominio + cores + primeiro mes de keywords. | Manual + Supabase |
| **Pagamento** | Link de Pix + link Stripe/Mercado Pago para cartao parcelado. | Stripe/MP |

### O que NAO construir

- Multi-tenant automatico (por enquanto, 1 a 1).
- Self-service onboarding.
- White-label.
- Modulos avancados.
- Dashboard analitico.
- Integracao com CMS terceiro (so usa o template proprio).

### Meta MVP

| Metrica | Meta |
|---|---|
| Clientes pagantes | 5 |
| Blogs no ar | 5 |
| Conteudos publicados/mes (total) | 450+ (5 × 90) |
| Indexacao | 80%+ em 30 dias |
| Primeiros artigos em pagina 1 do Google | 3+ por cliente em 60 dias |
| Churn tecnico | 0 |

### Gate de saida

> **Se 3+ clientes tem conteudo indexado e aparecendo em buscas de cauda longa em 60 dias, avancar para V1.**

---

## V1 — Meses 3-4

### Objetivo

Estabilizar o produto para 10-15 clientes, com onboarding semi-automatico e monitoramento basico.

### O que construir

| Componente | Novo vs Iteracao |
|---|---|
| Agente Pesquisador (keywords + gaps do nicho) | Novo |
| Agente Revisor (checa qualidade, schema, answer-first) | Novo |
| Agente Monitor v1 (rankings Google + citacoes IA manuais) | Novo |
| Dashboard v1 (graficos de indexacao, IVT basico) | Iteracao |
| Onboarding semi-automatico (wizard) | Novo |
| Multi-tenant basico | Novo |

### Meta V1

- 10-15 clientes ativos.
- IVT medio dos clientes em 30-40% ate o M4.
- Tempo de ativacao: 7 dias (100% dos novos).
- Primeiros 1-2 cases publicos com resultado mensuravel.

### Gate de saida

> **Se IVT medio dos clientes > 30% em 60 dias e onboarding < 7 dias para 100% dos novos, avancar para V2.**

---

## V1.1 — Integracoes externas (gatilhada por demanda de cliente)

Micro-fase entre V1 e V2 — nao esperava execucao ate bater demanda real. **Gatilhada em 2026-04-24** pela reuniao com Innovate LED ([BAI-71](https://linear.app/joao-lucas-ucceli/issue/BAI-71)), que pediu integracao com CRM do cliente.

### Objetivo

Entregar uma integracao generica formulario → CRM via webhook configuravel, transformando o blog de ponto unico de CTA WhatsApp em ponte para o CRM existente do cliente. Primeiro alvo de POC: **Kommo** (confirmar com cliente antes do desenvolvimento — ver [BAI-77](https://linear.app/joao-lucas-ucceli/issue/BAI-77)).

### O que construir

| Componente | Descricao | Stack |
|---|---|---|
| Formulario generico no blog | Campos: nome, email, telefone, produto de interesse, mensagem livre. Renderizado em CTAs configurados. | Next.js + shadcn |
| Webhook POST configuravel | URL + mapping de campos definidos no onboarding wizard. | Supabase Edge Functions |
| Adaptador Kommo (POC) | Mapping dos campos pro formato Kommo API, auth via OAuth2 ou API key. | Node |
| Fallback | Se webhook falhar (timeout, 4xx, 5xx): lead gravado localmente + CTA WhatsApp mantido. | Supabase Postgres |
| Log de disparos | Ultimos 100 disparos (sucesso/erro/payload) acessiveis no admin. | Supabase + Dashboard |
| Onboarding wizard extension | Etapa adicional configurando URL webhook + mapping de campos. | Next.js wizard |

### Produto comercial

- Como **brinde** nesta venda especifica (Innovate LED — parceiro de networking).
- Como **add-on pago** pra proximos clientes — valor a definir apos POC (sugestao inicial: cobrado a parte no scoping tecnico de cada CRM alem do Kommo).
- Resto dos clientes continua usando CTA WhatsApp (comportamento default).

### Meta V1.1

- Formulario funcional no blog + webhook POC com Kommo testado end-to-end em sandbox.
- Innovate LED (se fechar) entra em onboarding com integracao ativa.
- Documentacao tecnica em [[Integracoes Externas]] seccao "CRM Out" atualizada.

### Gate de saida

> **Se o webhook entrega lead no CRM sandbox sem perda de dados + fallback funciona + cliente Innovate LED (ou primeiro cliente que usar) valida end-to-end, fase encerrada e feature fica viva no produto.**

### Issue tracker

- [BAI-76](https://linear.app/joao-lucas-ucceli/issue/BAI-76) — Feature V1.1: Integracao generica de CRM via webhook.
- [BAI-77](https://linear.app/joao-lucas-ucceli/issue/BAI-77) — Confirmar qual CRM a Innovate LED usa (pre-requisito do scoping).

---

## V2 — Meses 5-8

### Objetivo

Escalar para 50+ clientes com self-service completo e monitoramento AIO robusto.

### O que construir

| Componente | Prioridade |
|---|---|
| Self-service onboarding (zero humano) | Critica |
| Agente Monitor v2 (citacoes IA automatizadas) | Alta |
| Agente Distribuidor (LinkedIn, Reddit, Medium) | Alta |
| Dashboard v2 (IVT detalhado, comparativo, ROI estimado) | Alta |
| Renovacao anual opcional (fluxo de oferta) | Media |
| Modulos adicionais (relatorios custom, integracoes adicionais alem do webhook CRM ja entregue em V1.1) | Media |
| Multi-tenant escalavel (1000+ clientes) | Critica |

### Meta V2

- 50+ clientes ativos.
- Self-service: 80%+ dos novos entram sem intervencao humana.
- IVT medio > 45%.
- Primeiros 5-10 cases publicos.
- Receita acumulada: R$ 150K+.

### Gate de saida

> **Se atingir 50+ clientes pagantes, self-service em 80%+ dos novos, e IVT medio > 45%, avancar para V3.**

---

## V3 — Meses 9-12

### Objetivo

Consolidar plataforma com 150+ clientes, renovacao anual ativa, e operacao que roda sem o fundador no dia-a-dia.

### O que construir

| Componente | Prioridade |
|---|---|
| Onboarding 100% automatico (wizard completo) | Critica |
| Renovacao anual automatizada (oferta + pagamento + ativacao de modulos novos) | Alta |
| Agente Suporte (chatbot com base de conhecimento) | Alta |
| White-label basico (agencia revende com branding proprio) | Media |
| Programa de indicacao com tracking automatico | Media |
| Dashboard v3 (multi-blog, comparativo de clientes, exportacao) | Media |
| Suporte humano part-time (escalar suporte) | Necessario |

### Meta V3

- 150-180 clientes ativos.
- Taxa de renovacao validada (target 30-40% nos que completam 12 meses).
- Receita acumulada 12 meses: R$ 400K-500K.
- Margem bruta 70%+.
- NPS > 60.

### Gate de saida

> **Se atingir 150+ clientes, margem > 70%, taxa de renovacao > 30%, avancar para "Futuro".**

---

## Futuro (apos 12 meses)

### API publica
Exportar o motor como API para devs/empresas integrarem. Pricing usage-based. Nova receita.

### Marketplace de modulos
Terceiros criam modulos especializados (local SEO avancado para restaurantes, AIO medico com compliance, etc.). Revenue share 70/30.

### Expansao internacional
Versao em ingles (EUA/Europa) e espanhol (LATAM). Pricing em USD/EUR.

### Inteligencia de mercado
Com 1000+ clientes, a buscou.ai acumula dataset unico (o que rankeia por nicho, o que IA cita, benchmarks). Vender como feature premium ou relatorio de mercado.

### Pricing evolui?
Decisao a tomar com dados. Evolucoes possiveis:
- **Pacotes de infra expandida** (V1.2+): cliente que quer canais adicionais (LinkedIn, Medium, Reddit) paga infra mensal maior (ex: R$ 500/mes em vez de R$ 300).
- **Modulos one-time pagos** (V2): relatorios personalizados, integracoes especificas, auditorias pontuais.
- **White-label para agencias** (V2+): licenciamento diferente — parceiro revende.

**Nao** evoluir para tiers (Starter/Growth/Scale) nem para "plano mensal de servico". A estrutura canonica e **implementacao unica + infra mensal** (ver [[VERDADE_UNICA_BUSCOU]] secao 5).

---

## Stack tecnico por fase

| Componente | MVP | V1 | V2 | V3 |
|---|---|---|---|---|
| Frontend | Next.js basico | Next.js + shadcn | Next.js + graficos | Multi-tenant |
| Backend | Supabase Edge Functions | + API Routes | + BullMQ (filas) | Workers dedicados |
| Banco | Supabase Postgres | + RLS multi-tenant | + Analytics | + DW |
| Auth | Supabase Auth | + Stripe customer ID | + roles | + SSO (white-label) |
| LLM | Claude Sonnet 4.6 | + Haiku 4.5 | + Batch API | + Prompt caching otimizado |
| SEO data | Ahrefs API | + GSC API | + DataForSEO | + Dados proprios |
| AIO monitor | Manual/Otterly | Otterly API | Monitor proprio v1 | Monitor proprio v2 |
| CMS | Template proprio | Template + integracao opcional | + WordPress/Webflow | + API generica |
| Pagamento | Pix + Mercado Pago | + Stripe | + Boleto | + Pagamento anual renovacao |
| Deploy | Vercel | Vercel | + Workers | + Infra dedicada |

---

## Riscos por fase

| Fase | Risco principal | Mitigacao |
|---|---|---|
| MVP | Conteudo de IA nao rankeia bem | Iterar prompts, incluir dados + schema, answer-first forte |
| V1 | Cliente nao ve valor em 30-60 dias | Ajustar onboarding pra educar (cauda longa primeiro, resultados gradativos) |
| V2 | Crescimento abaixo do esperado | Intensificar organico + parcerias + anuncios pagos |
| V3 | Taxa de renovacao baixa | Adicionar valor claro na renovacao (modulos, otimizacao com algoritmo atualizado) |
| Todas | Google penalizar conteudo de IA | Manter E-E-A-T, diversificar AIO, rastrear mudancas de algoritmo |

---

## Agentes — mapa reduzido (vs versao anterior)

Versao anterior prometia 11 agentes. O modelo de venda unica reduz:

| Agente | MVP | V1 | V2 | V3 |
|---|---|---|---|---|
| Redator | ✓ | ✓ | ✓ | ✓ |
| Publicador | ✓ | ✓ | ✓ | ✓ |
| Pesquisador | — | ✓ | ✓ | ✓ |
| Revisor | — | ✓ | ✓ | ✓ |
| Monitor | — | ✓ (v1 manual) | ✓ (v2 auto) | ✓ |
| Distribuidor | — | — | ✓ | ✓ |
| Suporte (chatbot) | — | — | — | ✓ |
| SDR (descartado no modelo venda unica) | — | — | — | — |
| Pagamento (renomeacao + novo escopo — 2 fluxos: implementacao 12x + infra mensal R$ 300) | — | ✓ | ✓ | ✓ |

3 agentes MVP, 6 em V2, 7 em V3. Mais enxuto, mais focado.

---

## Notas relacionadas

- [[VERDADE_UNICA_BUSCOU]] — canonico
- [[Modelo de Negocio]]
- [[Unit Economics]]
- [[Oferta Comercial]]
- [[Proposta de Valor]]
- [[North Star Metric]]
- [[Go To Market Inicial]]
- [[Decision Log - 2026-04-23]]
