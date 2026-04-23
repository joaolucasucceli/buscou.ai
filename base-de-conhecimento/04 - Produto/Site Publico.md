---
tipo: sistema
area: Ambos
tags: [site-publico, marketing, landing-page, conversao, seo, aio, blog, copywriting]
atualizado: 2026-04-23
---

# Site Publico — Spec do site de marketing

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. O site publico e a vitrine da buscou.ai e o principal canal de aquisicao organica. Hospedado em Next.js 15 + Vercel. Cada pagina otimizada para SEO e AIO. Oferta unica, sem tabela de tiers.

Relacionado: [[Proposta de Valor]] | [[Oferta Comercial]] | [[Case Proprio como Prova]] | [[Frontend]] | [[Onboarding Automatico]] | [[Funil Completo]]

---

## Visao geral

```
Home → Como Funciona → Oferta (checkout) → Contato/Onboarding
```

**Principio:** clareza > criatividade. O visitante entende o que fazemos, como fazemos e quanto custa em menos de 60 segundos. **Nao ha pagina de "pricing" com tiers** — a oferta e unica e aparece direto na home.

---

## Pagina 1 — Home (landing principal)

A landing e composta por 8 blocos sequenciais.

### Bloco 1 — Hero (above the fold)

```
+----------------------------------------------------------+
| NAV: Logo | Como Funciona | Blog | Oferta | [Comecar]    |
+----------------------------------------------------------+
|                                                            |
| ESQUERDA (50%):              DIREITA (50%):               |
|                                                            |
| Se alguem buscou,            [Mockup do Dashboard]        |
| quem apareceu foi voce?      Preview de artigo publicado  |
|                               Indicador "Publicado         |
| Blog + Motor (buscou.ai)      automaticamente"            |
| = 90 conteudos/mes,                                       |
| aparecendo no Google                                       |
| e nas IAs.                                                |
|                                                            |
| Pagamento unico.                                          |
| R$ 2.500 a vista                                          |
| ou R$ 3.000 em 12x.                                       |
|                                                            |
| [Comprar agora →]   [Ver como funciona]                   |
+----------------------------------------------------------+
```

**Headline (canonica):** "Se alguem buscou, quem apareceu foi voce?"

**Subheadline:** "Blog + Motor (buscou.ai) = 90 conteudos/mes no seu site, com voce aparecendo no Google e nas IAs. Pagamento unico: R$ 2.500 a vista ou R$ 3.000 em 12x."

**CTAs:**
- Primario: "Comprar agora" → checkout direto (Stripe/Asaas).
- Secundario: "Ver como funciona" → scroll para bloco 3 ou `/como-funciona`.

**Visual direita:**
- Mockup do dashboard com dados reais do proprio blog da buscou.ai.
- Preview de artigo publicado com badge "Publicado automaticamente".
- Indicador mostrando presenca no Google e em IAs.
- Efeito sutil de flutuacao.

**Tecnico:**
- Altura: 100vh.
- Background: escuro (seguir Design System — dark-first).
- Headline: `text-5xl` mobile / `text-7xl` desktop, peso `bold`, tracking negativo.
- Subheadline: `text-lg`/`text-xl`, cor `muted-foreground`.

### Bloco 2 — Prova (dog-fooding)

```
+----------------------------------------------------------+
| "Nosso proprio blog roda neste motor"                    |
|                                                            |
| [Numeros reais atualizados do blog buscou.ai]            |
| X artigos publicados | Y keywords top 10 | Z citacoes IA |
|                                                            |
| [Ver blog →]                                              |
+----------------------------------------------------------+
```

**Proposito:** gerar confianca imediata. O argumento #1 de venda e [[Case Proprio como Prova]].

### Bloco 3 — Como funciona (3 passos)

```
+----------------------------------------------------------+
| [1] Configure                [2] Motor gera          [3] Apareca |
| 10 min no wizard             90 conteudos/mes         no Google + IAs |
| (dominio, nicho,             automaticamente no       em ate 30 dias |
| tom, GSC)                    seu blog                                  |
+----------------------------------------------------------+
```

### Bloco 4 — Beneficios

Grid 2x3:
- **Tecnologia, nao agencia** — pague uma vez, sem mensalidade.
- **90 conteudos/mes** — 720K caracteres otimizados para SEO + AIO.
- **Local SEO integrado** — conteudo geo-targetado para sua cidade/bairros.
- **Presenca em IA** — ChatGPT, Perplexity, AI Overviews.
- **Dashboard em tempo real** — rankings, trafego, citacoes.
- **Ativacao em 7 dias** — blog no ar rapido, primeiros sinais em 30 dias.

### Bloco 5 — Demonstracao do dashboard

Screenshot ou video de 15-30s mostrando dashboard em uso, com callouts.

### Bloco 6 — Blog em destaque (3 cards)

Demonstracao de autoridade + alimenta SEO do proprio site. 3 artigos mais recentes.

### Bloco 7 — Oferta (canonica)

```
+----------------------------------------------------------+
| PAGAMENTO UNICO                                           |
|                                                            |
| R$ 2.500 a vista (Pix ou cartao)                         |
| OU                                                         |
| R$ 3.000 parcelado em 12x (cliente assume juros)         |
|                                                            |
| O que voce recebe:                                        |
| - Blog estruturado no seu dominio (ou subdominio buscou.ai) |
| - Motor buscou.ai gerando 90 conteudos/mes               |
| - Onboarding automatico em 24-48h                        |
| - Ativacao em ate 7 dias                                 |
| - Dashboard de acompanhamento                            |
| - Sem mensalidade, sem assinatura, sem fidelidade       |
|                                                            |
| [Comprar a vista (Pix)]  [Parcelar em 12x]               |
|                                                            |
| Ainda com duvida? [Agende 20 min com nosso time →]       |
+----------------------------------------------------------+
```

**Proposito:** converter quem leu ate aqui. Oferta clara, sem pegadinha, sem tabelas comparativas. Call opcional aparece como link secundario logo abaixo do checkout.

### Bloco 8 — FAQ

| Pergunta | Resposta (resumida) |
|---|---|
| O que exatamente o sistema faz? | Publica 90 artigos/mes no seu blog automaticamente, otimizados para Google e IA. Voce configura em 10 min e acompanha pelo dashboard. |
| Quanto tempo para ver resultados? | Blog no ar em ate 7 dias. Primeiros sinais em ate 30 dias. Rankings/citacoes em IA em 60-90 dias. |
| Funciona para qualquer negocio? | Melhor para negocios locais (clinicas, imobiliarias, advogados, servicos). Se seu cliente busca no Google, funciona. |
| Preciso saber de SEO? | Nao. O motor faz tudo. Voce so preenche o wizard no onboarding. |
| E uma assinatura? | Nao. E **pagamento unico**. Paga R$ 2.500 a vista (ou R$ 3.000 em 12x) e o motor publica 90 conteudos/mes sem cobranca adicional. |
| Qual a diferenca para agencia de SEO? | Agencia depende de pessoas, tem prazos longos e custa 5-10x mais. Tecnologia e automatizada, consistente e cobra uma vez. |
| Como e o suporte? | Chat IA 24/7 + humano em ate 24h (ver [[SLAs e Garantias]]). |
| Posso pedir reembolso? | Sim, nos primeiros 14 dias se menos de 10 artigos foram publicados. Apos isso, os artigos publicados ficam no seu site. |

Componente Accordion com FAQ schema para aparecer em rich results.

### Bloco 9 — CTA final

```
+----------------------------------------------------------+
| Pronto para aparecer?                                      |
|                                                            |
| R$ 2.500 a vista | R$ 3.000 em 12x                       |
| Blog no ar em 7 dias. Primeiros sinais em 30.            |
|                                                            |
| [Comprar agora →]     [Falar no WhatsApp]                |
+----------------------------------------------------------+
```

---

## Pagina 2 — Como Funciona

**URL:** `/como-funciona`.
**Meta title:** "Como Funciona — buscou.ai"
**Meta description:** "Veja como o motor buscou.ai publica 90 conteudos/mes no seu blog automaticamente, fazendo voce aparecer no Google e nas IAs."

Estrutura: hero explicativo + 3 etapas detalhadas (configuracao, producao automatica, monitoramento) + CTA para oferta.

---

## Pagina 3 — Blog (listagem)

**URL:** `/blog`.
**Meta title:** "Blog — buscou.ai | SEO, AIO e aparicao nas buscas"
**Meta description:** "Artigos sobre SEO, AIO e como negocios locais aparecem no Google e nas IAs. Conteudo pratico para donos de negocio."

Grid 3 colunas (desktop) / 2 (tablet) / 1 (mobile). Filtros por categoria. Paginacao (12 por pagina).

---

## Pagina 4 — Blog artigo (detalhe)

**URL:** `/blog/[slug]`.

Layout 2 colunas (70/30). Coluna principal: artigo. Sidebar: CTA box para oferta + sumario + relacionados + mini-prova + newsletter.

---

## Pagina 5 — Exemplos / cases

**URL:** `/exemplos`.

Inicio: [[Case Proprio como Prova]] como primeiro case. Conforme clientes chegam, adicionar cases reais (antes/depois, timeline, depoimento).

---

## Pagina 6 — Contato

**URL:** `/contato`.

- Metodo primario: WhatsApp (resposta em ate 24h).
- Metodo secundario: formulario (envia para suporte).
- Informacoes: e-mail, horario, localizacao.

---

## Estrategia de navegacao e conversao

### Mapa de CTAs

| Pagina | CTA primario | CTA secundario | Destino primario | Destino secundario |
|---|---|---|---|---|
| Home | Comprar agora | Ver como funciona | Checkout (Stripe/Asaas) | `/como-funciona` |
| Como funciona | Comprar agora | Falar no WhatsApp | Checkout | WhatsApp |
| Blog (lista) | Ler artigo | Newsletter | `/blog/[slug]` | Captura de e-mail |
| Blog (artigo) | Comprar agora | Falar no WhatsApp | Checkout | WhatsApp |
| Exemplos | Comprar agora | Falar no WhatsApp | Checkout | WhatsApp |
| Contato | WhatsApp | Formulario | WhatsApp | E-mail |

### Fluxo principal

```
Visitante organico (Google/IA)
    ↓
Home ou artigo do blog
    ↓
Bloco oferta na home (ou sidebar no artigo)
    ↓
Checkout direto (80%) OU call opcional (20%)
    ↓
Pagamento confirmado → onboarding (24-48h) → ativacao (7 dias)
```

---

## SEO do site proprio

### Meta tags por pagina

| Pagina | Meta title | Meta description |
|---|---|---|
| Home | buscou.ai — Se alguem buscou, quem apareceu foi voce? | Blog + Motor publicando 90 conteudos/mes no seu site. Pagamento unico: R$ 2.500 a vista ou R$ 3.000 em 12x. |
| Como funciona | Como Funciona — buscou.ai | Configure, o motor publica, voce aparece. 3 passos em ate 7 dias. |
| Blog | Blog — buscou.ai | SEO, AIO e como aparecer nas buscas. Conteudo gerado pelo proprio motor. |
| Exemplos | Cases — buscou.ai | Resultados reais de negocios locais aparecendo no Google e nas IAs. |
| Contato | Contato — buscou.ai | Fale com nosso time pelo WhatsApp. Resposta em ate 24h. |

### Schema markup implementado

| Pagina | Schema Types |
|---|---|
| Todas | `Organization`, `WebSite` |
| Home | `Product`, `Offer`, `FAQPage`, `WebPage` |
| Blog lista | `CollectionPage` |
| Blog artigo | `BlogPosting`, `BreadcrumbList`, `FAQPage` |
| Exemplos | `WebPage`, `Review` |

### Sitemap e indexacao

- `sitemap.xml` gerado automaticamente.
- Inclui: paginas publicas + todos os artigos + categorias.
- `robots.txt` com referencia ao sitemap.
- `llms.txt` na raiz descrevendo estrutura e proposito.

### Performance (Core Web Vitals)

| Metrica | Alvo | Como |
|---|---|---|
| LCP | < 2,5s | `next/image`, font preload, ISR |
| FID/INP | < 200ms | Minimal JS, lazy loading |
| CLS | < 0,1 | Dimensoes explicitas |

### AIO do site proprio

- Resposta direta no inicio de cada artigo (blockquote).
- Estrutura clara H2/H3.
- FAQ em todas as paginas principais (FAQPage schema).
- `llms.txt` na raiz.
- Monitoramento de citacoes via [[Agente Monitor]].

---

## Notas relacionadas

- [[Proposta de Valor]] — o que vendemos e por que o cliente compra
- [[Oferta Comercial]] — pitch + objecoes + call opcional
- [[Modelo de Negocio]] — receita, custos, projecoes
- [[Case Proprio como Prova]] — dog-fooding como primeiro case
- [[Frontend]] — arquitetura tecnica
- [[Estrategia de Conteudo Autonomo]] — como o blog e alimentado
- [[Onboarding Automatico]] — fluxo completo
- [[Schema Markup para IA]] — dados estruturados
- [[O que e SEO]] / [[O que e AIO]]

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 2, 4, 5, 7 — ultima verificacao 2026-04-23.*
