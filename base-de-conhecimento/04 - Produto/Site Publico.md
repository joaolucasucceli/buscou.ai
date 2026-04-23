---
tipo: sistema
area: Ambos
tags: [site-publico, marketing, landing-page, conversao, seo, aio, blog, copywriting]
atualizado: 2026-04-23
---

# Site Publico — Spec do site de marketing

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]] (secao 8 + 11) + [[Decision Log - 2026-04-23 - Venda Consultiva]]. O site publico e a vitrine da buscou.ai e o principal canal de aquisicao organica. Hospedado em Next.js 16 + Vercel. Cada pagina otimizada para SEO e AIO.
>
> **Modelo de conversao (v2.0 — pos-pivot consultivo 2026-04-23):** landing **nao expoe preco** e **nao tem checkout direto**. CTA unico e **"Agendar diagnostico"** → abre WhatsApp → reuniao obrigatoria → proposta personalizada escrita pos-call.

Relacionado: [[Proposta de Valor]] | [[Oferta Comercial]] | [[Case Proprio como Prova]] | [[Frontend]] | [[Onboarding Automatico]] | [[Funil Completo]]

---

## Visao geral

```
Home → Como Funciona → (WhatsApp: agendar diagnostico) → Reuniao → Proposta em 24h → Pagamento → Onboarding
```

**Principio:** clareza > criatividade. O visitante entende o que fazemos, como fazemos e quais sao os proximos passos em menos de 60 segundos. **Nao ha pagina de "pricing"** — preco aparece em reuniao + proposta personalizada, nao em copy publico. O visitante sai da home com **uma acao clara**: agendar diagnostico.

---

## Pagina 1 — Home (landing principal)

A landing e composta por 8 blocos sequenciais.

### Bloco 1 — Hero (above the fold)

```
+----------------------------------------------------------+
| NAV: Logo | Como Funciona | Blog | [Agendar diagnostico] |
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
| [Agendar diagnostico →]  [Ver como funciona]              |
+----------------------------------------------------------+
```

**Headline (canonica):** "Se alguem buscou, quem apareceu foi voce?"

**Subheadline:** "Blog + Motor (buscou.ai) = 90 conteudos/mes no seu site, com voce aparecendo no Google e nas IAs."

**CTAs:**
- Primario: **"Agendar diagnostico"** → abre WhatsApp `wa.me/5527996960847` com mensagem pre-preenchida "Oi, vi o site da buscou.ai e quero agendar um diagnostico do meu negocio".
- Secundario: "Ver como funciona" → scroll para bloco 3 ou `/como-funciona`.

**Importante:** o hero **nao expoe preco**. O preco aparece na reuniao e na proposta personalizada pos-call (ver [[Oferta Comercial]] + [[Decision Log - 2026-04-23 - Venda Consultiva]]).

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
- **Tecnologia, nao agencia** — pague a implementacao uma vez. A infra mensal e passthrough transparente.
- **90 conteudos/mes** — 720K caracteres otimizados para SEO + AIO.
- **Local SEO integrado** — conteudo geo-targetado para sua cidade/bairros.
- **Presenca em IA** — ChatGPT, Perplexity, AI Overviews.
- **Dashboard em tempo real** — rankings, trafego, citacoes, status da infra.
- **Ativacao em 7 dias** — blog no ar rapido, primeiros sinais em 30 dias.

### Bloco 5 — Demonstracao do dashboard

Screenshot ou video de 15-30s mostrando dashboard em uso, com callouts.

### Bloco 6 — Blog em destaque (3 cards)

Demonstracao de autoridade + alimenta SEO do proprio site. 3 artigos mais recentes.

### Bloco 7 — Como funciona o processo (nao e bloco de oferta com preco)

A landing nao expoe preco. Este bloco descreve o **processo consultivo** que o cliente vai passar: o que e o diagnostico, o que ele recebe por escrito, e os proximos passos.

```
+----------------------------------------------------------+
| O que acontece quando voce agenda seu diagnostico         |
|                                                            |
| [1] Reuniao de diagnostico (30-60 min)                    |
|     A gente faz uma busca ao vivo pra mostrar onde voce  |
|     aparece hoje. Entende seu negocio. Explica a          |
|     metodologia aplicada ao seu caso.                     |
|                                                            |
| [2] Proposta personalizada por escrito (em 24h)           |
|     Voce recebe no WhatsApp um documento com o contexto   |
|     da conversa + metodologia aplicada ao seu negocio +   |
|     escopo + valores. Vale 7 dias.                        |
|                                                            |
| [3] Apos o aceite                                          |
|     Link de pagamento via WhatsApp → onboarding guiado    |
|     → blog no ar em ate 7 dias → motor publicando 3x/dia  |
|                                                            |
| [Agendar diagnostico →]                                   |
+----------------------------------------------------------+
```

**Proposito:** converter quem leu ate aqui para **agendar a reuniao**, nao comprar direto. Deixa claro o que a pessoa ganha mesmo se nao fechar (diagnostico real) e o que recebe por escrito pos-call (proposta personalizada com validade).

**Nao incluir preco neste bloco.** Preco aparece so na reuniao e na proposta escrita pos-call.

### Bloco 8 — FAQ

Perguntas calibradas para o **processo consultivo** — quem chega na landing precisa entender o que vai acontecer na reuniao e na proposta, nao debater preco. Preco nao aparece em copy publico.

| Pergunta | Resposta (resumida) |
|---|---|
| Como funciona a reuniao? | Sao 30-60 min por video-call. A gente faz uma busca ao vivo pra mostrar onde voce aparece hoje (e onde nao aparece), entende seu negocio com perguntas diretas, e explica como o blog + motor se aplicam ao seu caso especifico. |
| Quanto tempo leva da primeira conversa ate o blog estar no ar? | Ate 7 dias do primeiro contato ate pagamento (reuniao + proposta em 24h + aceite). Apos pagamento, blog no ar em ate 7 dias. |
| Preciso preparar algo antes da reuniao? | Nao. Ideal ter o dominio atual em mente e lembrar 2-3 concorrentes locais. O resto a gente descobre na conversa. |
| Vou receber algo por escrito? | Sim. Em ate 24h pos-reuniao voce recebe no WhatsApp uma proposta personalizada com contexto da nossa conversa, metodologia aplicada ao seu negocio, escopo e valores. Vale 7 dias. |
| Funciona para qualquer negocio? | Melhor para negocios locais (clinicas, imobiliarias, advogados, servicos). Se seu cliente busca no Google, funciona. Se nao for fit, entregamos o diagnostico mesmo assim. |
| Preciso saber de SEO? | Nao. O motor faz tudo. Voce so preenche o wizard no onboarding depois do pagamento. |
| O que voces entregam exatamente? | Blog no seu dominio + motor buscou.ai publicando 90 conteudos por mes otimizados pra Google e IAs. Detalhes completos vao na proposta personalizada. |
| E uma assinatura de servico? | Nao vendemos servico mensal. O modelo comercial e explicado na reuniao e detalhado na proposta por escrito. |
| E se eu nao tiver certeza ainda? | Agenda mesmo. A reuniao nao tem compromisso de compra — voce sai sabendo onde aparece hoje no Google e na IA, e se decidir nao fechar, o diagnostico vale por si. |
| Como e o suporte apos contratar? | Chat IA 24/7 + humano em ate 24h enquanto infra estiver ativa (ver [[SLAs e Garantias]]). |

Componente Accordion com FAQ schema para aparecer em rich results.

### Bloco 9 — CTA final

```
+----------------------------------------------------------+
| Hoje alguem esta buscando o que voce vende.               |
| Voce prefere continuar invisivel ou aparecer?             |
|                                                            |
| Agenda seu diagnostico. 30-60 min por video-call.         |
| Voce sai da reuniao sabendo exatamente onde aparece       |
| hoje — e recebe uma proposta personalizada em 24h.        |
|                                                            |
| [Agendar meu diagnostico no WhatsApp: +55 27 99696-0847] |
+----------------------------------------------------------+
```

**Obrigatorio:** numero canonico `+55 27 99696-0847` exibido no botao OU visivel fora dele (ver [[Decision Log - 2026-04-23 - Contato Oficial]]).

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

Todos os CTAs primarios apontam para **WhatsApp com mensagem pre-preenchida pra agendar diagnostico** — ver `src/lib/constants.ts` (`WHATSAPP_URL`).

| Pagina | CTA primario | CTA secundario | Destino primario | Destino secundario |
|---|---|---|---|---|
| Home | Agendar diagnostico | Ver como funciona | WhatsApp (agendamento) | `/como-funciona` |
| Como funciona | Agendar diagnostico | Ver blog | WhatsApp | `/blog` |
| Blog (lista) | Ler artigo | Agendar diagnostico (sidebar) | `/blog/[slug]` | WhatsApp |
| Blog (artigo) | Agendar diagnostico | Ver como funciona | WhatsApp | `/como-funciona` |
| Exemplos | Agendar diagnostico | Ver como funciona | WhatsApp | `/como-funciona` |
| Contato | WhatsApp | — | WhatsApp | — |

### Fluxo principal (consultivo)

```
Visitante organico (Google/IA)
    ↓
Home ou artigo do blog
    ↓
CTA unico "Agendar diagnostico"
    ↓
WhatsApp abre com mensagem pre-preenchida
    ↓
Conversa rapida → agenda reuniao (30-60 min)
    ↓
Reuniao acontece (gravada/transcrita)
    ↓
Proposta personalizada via WhatsApp em ate 24h (validade 7 dias)
    ↓
Cliente aceita → link de pagamento via WhatsApp
    ↓
Pagamento confirmado → onboarding → ativacao (7 dias)
```

---

## SEO do site proprio

### Meta tags por pagina

| Pagina | Meta title | Meta description |
|---|---|---|
| Home | buscou.ai — Se alguem buscou, quem apareceu foi voce? | Blog + Motor publicando 90 conteudos/mes no seu site. Implementacao R$ 2.500 a vista (ou 12x R$ 250) + infra mensal R$ 300 a partir do mes 2. |
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
- [[Oferta Comercial]] — pitch da reuniao de diagnostico + objecoes + proposta personalizada
- [[Modelo de Negocio]] — receita, custos, projecoes
- [[Case Proprio como Prova]] — dog-fooding como primeiro case
- [[Frontend]] — arquitetura tecnica
- [[Estrategia de Conteudo Autonomo]] — como o blog e alimentado
- [[Onboarding Automatico]] — fluxo completo
- [[Schema Markup para IA]] — dados estruturados
- [[O que e SEO]] / [[O que e AIO]]

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 2, 4, 5, 7 — ultima verificacao 2026-04-23.*
