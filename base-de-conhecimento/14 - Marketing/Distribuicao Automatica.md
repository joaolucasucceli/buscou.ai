---
tipo: marketing
area: Distribuicao
tags: [marketing, distribuicao, automatico, multi-plataforma]
atualizado: 2026-04-23
---

# Distribuicao Automatica

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. O [[Agente Distribuidor]] amplifica cada artigo para plataformas externas, gerando mencoes de marca, sinais sociais e corroboracao para IAs. Disponivel para todos os clientes ativos — nao ha tiers.

Relacionado: [[Estrategia de Distribuicao]] | [[LinkedIn e Medium]] | [[Reddit]] | [[Agente Distribuidor]] | [[Off-Page SEO e Link Building]]

---

## Escopo V1 vs V1.2+

**V1 (MVP):** distribuicao tecnica basica.
- RSS feed do blog.
- Sitemap enviado ao GSC automaticamente.
- Ping para indexacao imediata.
- Schema JSON-LD validado.

**V1.2+:** cross-posting nas plataformas externas.
- LinkedIn (post + article).
- Medium (com canonical).
- Reddit (value-first, sem spam).

**V2:** parasita SEO, comunidades segmentadas por nicho, YouTube Shorts de resumos de artigos.

Este documento descreve o modelo V1.2+ completo — a V1 entrega apenas a camada tecnica.

---

## Por que distribuicao importa

Dados de 2026 (ver [[Estrategia de Distribuicao]]):
- Marcas presentes em multiplas plataformas recebem **2,8x mais citacoes em IA**.
- Mencoes de marca correlacionam **3x mais** com visibilidade em IA do que backlinks.
- YouTube, Reddit e LinkedIn estao entre os dominios mais citados por IAs.
- 94% dos compradores B2B usam IA generativa durante pesquisa.

Sem distribuicao, o conteudo existe em um unico ponto. Com distribuicao, existe em um ecossistema — e IAs confiam mais em marcas com presenca distribuida. Ver [[Como IAs Buscam e Citam Conteudo]].

---

## Plataformas e regras de adaptacao

### LinkedIn (V1.2+)

| Aspecto | Regra |
|---|---|
| Formato | Post (ate 3.000 chars) para artigos curtos, Article para conteudo longo |
| Adaptacao | Hook de 2 linhas (dado impactante ou pergunta) → 3-5 bullets com insights → CTA suave ("artigo completo no link") |
| Tom | Profissional mas acessivel. "Voce" em vez de "empresas" |
| Frequencia | 3-5 posts/semana (limite API LinkedIn) |
| Hashtags | 3-5 relevantes (#SEO, #IA, #AIO, #NegocioLocal, #MarketingDigital) |
| Horarios | Terca a quinta, 8h-10h ou 17h-18h (Brasil) |
| Metricas | Impressoes, engagement rate, cliques no link |

### Reddit (V1.2+)

| Aspecto | Regra |
|---|---|
| Formato | Post de texto (value-first, NUNCA promocional direto) ou comentario em threads existentes |
| Adaptacao | Compartilhar insight genuino do artigo como se fosse experiencia. Link apenas se perguntarem ou no final como "se quiser ler mais" |
| Tom | Casual, autentico, como membro da comunidade |
| Subreddits | r/SEO, r/digital_marketing, r/entrepreneur, subreddits BR relevantes (ex: r/empreendedorismo) |
| Frequencia | 2-3 posts/semana + 5-10 comentarios de valor/semana |
| Regra de ouro | Ratio 10:1 (10 contribuicoes de valor para 1 mencao de marca) |

### Medium (V1.2+)

| Aspecto | Regra |
|---|---|
| Formato | Artigo republicado com tag `rel="canonical"` apontando para o blog original |
| Adaptacao | Introducao mais narrativa. Imagem de capa atraente. 5 tags relevantes |
| Tom | Editorial, mais storytelling que o blog tecnico |
| Frequencia | 2-4 artigos/mes (melhores pecas, nao tudo) |
| Canonical | OBRIGATORIO. Sem canonical, Google indexa o Medium em vez do blog |

---

## Fluxo do Agente Distribuidor

```
[Agente Publicador] publica artigo no blog
  → webhook notifica [Orquestrador]
    → [Orquestrador] dispara [Agente Distribuidor]
      → le artigo publicado (URL + conteudo)
        → adapta para cada plataforma (regras acima)
          → posta via API de cada plataforma (V1.2+)
            → registra URLs em `distribution_log` (Supabase)
              → [Agente Monitor] rastreia engagement
```

**APIs:**
- LinkedIn API v2 (posts + articles).
- Reddit API (submissions + comments).
- Medium API (stories com canonical).

---

## Scheduling e timing

Nao publicar tudo no mesmo momento:

| Plataforma | Quando postar (apos blog) | Razao |
|---|---|---|
| LinkedIn | +2 horas | Dar tempo de indexacao no Google |
| Reddit | +24-48 horas | Reddit valoriza conteudo que ja tem traction |
| Medium | +72 horas | Esperar indexacao com canonical no Google |

**Horarios otimos (BR, GMT-3):**
- LinkedIn: ter-qui, 8h-10h ou 17h-18h.
- Reddit: dom-ter, 10h-14h (BR) ou madrugada (subs internacionais).
- Medium: seg-qua, 9h-11h.

---

## Metricas

| Metrica | Meta | Frequencia |
|---|---|---|
| Plataformas por artigo | >= 3 (em V1.2+) | A cada publicacao |
| Engagement rate LinkedIn | > 2% | Semanal |
| Upvotes Reddit | > 10 por post | Semanal |
| Views Medium | > 100 por artigo | Mensal |
| Mencoes de marca | Crescimento 10%/mes | Mensal via [[Agente Monitor]] |
| Referral traffic das plataformas | > 5% do trafego total | Mensal via GA4 |

---

## Distribuicao para o marketing proprio (dog-fooding)

Para o blog buscou.ai, a distribuicao ativa em todas as plataformas sempre — nosso proprio produto rodando como prova. Ver [[Case Proprio como Prova]] e [[Estrategia de Conteudo Autonomo]].

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 5 — ultima verificacao 2026-04-23.*
