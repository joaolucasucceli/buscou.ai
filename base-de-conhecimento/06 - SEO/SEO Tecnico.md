---
tipo: conceito
area: SEO Fundamentos
nivel: intermediario
tags:
  - seo-tecnico
  - core-web-vitals
  - schema-markup
  - mobile-first
  - sitemap
  - robots-txt
  - javascript-seo
atualizado: 2026-04-22
---

# SEO Tecnico

## O que e SEO Tecnico

SEO Tecnico e o conjunto de otimizacoes na **infraestrutura e arquitetura** de um site que facilitam o rastreamento, indexacao e renderizacao pelos motores de busca. E a fundacao sobre a qual todo [[O que e SEO|SEO]] eficaz e construido — sem ele, mesmo o melhor conteudo pode nao ser encontrado.

## Velocidade do Site e Core Web Vitals

A velocidade de carregamento e a experiencia do usuario sao fatores criticos de ranking em 2026. O Google prioriza sites que carregam rapido e oferecem navegacao fluida.

### Metricas Core Web Vitals em 2026

| Metrica | O que Mede | Limite "Bom" | Como Melhorar |
|---------|-----------|--------------|---------------|
| **LCP** (Largest Contentful Paint) | Velocidade de carregamento do maior elemento visivel | < 2,5s | Otimizar imagens, usar CDN, melhorar servidor |
| **INP** (Interaction to Next Paint) | Responsividade a interacoes do usuario | < 200ms | Reduzir JavaScript, otimizar event handlers |
| **CLS** (Cumulative Layout Shift) | Estabilidade visual da pagina | < 0,1 | Definir dimensoes de imagens/videos, evitar injecao dinamica |

> **Nota**: o INP substituiu o FID (First Input Delay) como Core Web Vital em marco de 2024.

### Otimizacao de Velocidade

- Use formatos de imagem de proxima geracao (**WebP**, **AVIF**)
- Implemente **lazy loading** para imagens e videos
- Minimize e comprima **CSS e JavaScript**
- Utilize **CDN** (Content Delivery Network)
- Habilite **cache do navegador**
- Otimize o **TTFB** (Time to First Byte) com servidor adequado

## Mobile-First Indexing

Desde 2021, o Google usa a **versao mobile** do site como base primaria para indexacao e ranking. Em 2026, isso significa:

- O site **deve** ser responsivo ou ter versao mobile dedicada
- O conteudo mobile deve ser **identico** ao desktop
- Elementos interativos devem ser **faceis de tocar** (botoes com tamanho minimo de 48x48px)
- Textos devem ser **legiveis sem zoom** (minimo 16px)
- Teste regularmente com o **Google Mobile-Friendly Test**

## SSL/HTTPS

O **HTTPS** (protocolo seguro com certificado SSL/TLS) e fator de ranking confirmado pelo Google desde 2014.

- Sites sem HTTPS exibem aviso de **"Nao Seguro"** no Chrome
- O certificado SSL criptografa dados entre usuario e servidor
- A maioria dos provedores de hospedagem oferece SSL gratuito via **Let's Encrypt**
- Em 2026, HTTPS e considerado **requisito basico**, nao diferencial

## XML Sitemap

O XML sitemap e um arquivo que lista todas as paginas importantes do seu site, ajudando os motores de busca a descobri-las e entender a estrutura.

### Boas Praticas

- Inclua apenas paginas que voce quer que sejam indexadas
- Atualize automaticamente quando novo conteudo e publicado
- Limite a **50.000 URLs** por sitemap (use sitemap index para sites maiores)
- Submeta no **Google Search Console**
- Inclua tags `<lastmod>` com a data real da ultima modificacao
- Remova URLs com redirecionamento ou status 4xx/5xx

**Localizacao padrao**: `https://seusite.com/sitemap.xml`

## Robots.txt

O arquivo robots.txt instrui os crawlers sobre quais partes do site **podem ou nao** ser rastreadas.

### Estrutura Basica

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /carrinho/
Disallow: /checkout/

Sitemap: https://seusite.com/sitemap.xml
```

### Cuidados Importantes

- **Nao use para esconder conteudo sensivel** — robots.txt e publico
- Bloquear uma pagina no robots.txt **nao impede indexacao** se ela receber links externos
- Para impedir indexacao, use a meta tag `noindex`
- Localize em: `https://seusite.com/robots.txt`

## Dados Estruturados / Schema Markup

Dados estruturados (Schema Markup) ajudam os motores de busca a **entender melhor o conteudo** da pagina. Em 2026, e uma das alavancas tecnicas mais importantes para visibilidade em rich results e AI Overviews.

### Por que e Crucial em 2026

- O Google puxa de conteudo enriquecido com schema ao gerar **AI Overviews**
- Melhora as chances de obter **rich results** (reviews, FAQs, eventos, receitas)
- Ajuda crawlers a **categorizar corretamente** o conteudo

### Tipos Essenciais de Schema

| Tipo de Pagina | Schema Recomendado |
|----------------|-------------------|
| Homepage | Organization, WebSite |
| Blog posts | BlogPosting, Article |
| Paginas de produto | Product, Offer |
| Negocios locais | LocalBusiness |
| FAQs | FAQPage |
| Eventos | Event |
| Receitas | Recipe |
| Reviews | Review, AggregateRating |
| Pessoas/Autores | Person |

### Implementacao

- Use formato **JSON-LD** (recomendado pelo Google), colocado no `<head>` ou `<body>`
- Valide com o **Google Rich Results Test** e o **Schema Markup Validator**
- Nunca marque conteudo que nao e visivel na pagina (spam de schema)

**Exemplo JSON-LD para artigo**:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Guia de SEO Tecnico 2026",
  "author": {
    "@type": "Person",
    "name": "Joao Silva"
  },
  "datePublished": "2026-04-22",
  "description": "Checklist completo de SEO tecnico para 2026"
}
```

## Canonicalizacao

A tag canonical (`rel="canonical"`) indica ao Google qual e a **versao preferida** de uma pagina quando existem URLs duplicadas ou similares.

### Quando Usar

- Conteudo acessivel por multiplas URLs (com e sem www, com e sem trailing slash)
- Paginas de produto com parametros de filtragem
- Conteudo sindicado ou republipublicado em outros sites
- Versoes AMP e desktop da mesma pagina

**Exemplo**:
```html
<link rel="canonical" href="https://seusite.com/pagina-principal/" />
```

## Crawl Budget (Orcamento de Rastreamento)

Crawl budget e o numero de paginas que o Googlebot rastreara no seu site em um determinado periodo. E especialmente importante para sites grandes (10.000+ paginas).

### Como Otimizar

- Elimine **paginas duplicadas** e de baixo valor
- Corrija **links internos quebrados**
- Reduza **cadeias de redirecionamento**
- Bloqueie paginas desnecessarias no **robots.txt**
- Mantenha o sitemap **atualizado e limpo**
- Melhore a **velocidade do servidor** (TTFB)

## JavaScript SEO

Muitos sites modernos dependem de JavaScript para renderizar conteudo. Em 2026, o Googlebot renderiza JavaScript usando um motor Chromium, mas existem desafios:

### Boas Praticas

- Use **Server-Side Rendering (SSR)** ou **Static Site Generation (SSG)** quando possivel
- Implemente **renderizacao hibrida** para conteudo critico
- Evite conteudo que dependa exclusivamente de **client-side rendering** para SEO
- Teste a renderizacao com o **URL Inspection Tool** do Google Search Console
- Garanta que links internos usem tags `<a href>` tradicionais, nao apenas eventos JavaScript
- Implemente **pre-rendering** para crawlers quando SSR nao for viavel

## Checklist de SEO Tecnico 2026

- [ ] HTTPS implementado com certificado SSL valido
- [ ] Site responsivo e mobile-first
- [ ] Core Web Vitals com score "Bom" (LCP < 2,5s, INP < 200ms, CLS < 0,1)
- [ ] XML sitemap atualizado e submetido no Search Console
- [ ] Robots.txt configurado corretamente
- [ ] Schema markup implementado (JSON-LD)
- [ ] Tags canonical em todas as paginas
- [ ] Sem paginas orfas (todas acessiveis via links internos)
- [ ] Sem cadeias de redirecionamento longas
- [ ] JavaScript renderizavel pelo Googlebot
- [ ] Sem erros 4xx/5xx nas paginas importantes
- [ ] Hreflang configurado para sites multilinguais
- [ ] Paginacao implementada corretamente

## Conceitos Relacionados

- [[O que e SEO]]
- [[Como Funcionam os Motores de Busca]]
- [[On-Page SEO]]
- [[Local SEO]]

## Links e Referencias

- [Technical SEO Checklist 2026 - NoGood](https://nogood.io/blog/technical-seo-checklist/)
- [Full Technical SEO Checklist 2026 - Yotpo](https://www.yotpo.com/blog/full-technical-seo-checklist/)
- [Technical SEO Checklist 2026 - Amit Gupta SEO](https://www.amitguptaseo.com/blog/technical-seo-checklist-to-boost-website-performance/)
- [Technical SEO Complete Guide 2026 - W3Era](https://www.w3era.com/blog/seo/technical-seo-complete-guide/)
- [Technical SEO Checklist 2026 - Nation Media Design](https://nationmediadesign.com/blog/technical-seo-checklist-2026)
- [Technical SEO Audit Checklist 2026: 200+ Items - Digital Applied](https://www.digitalapplied.com/blog/technical-seo-audit-checklist-200-items)
- [Ultimate Technical SEO Checklist 2026 - Dinero Tech Labs](https://www.dinerotechlabs.com/blog/ultimate-technical-seo-checklist-for-2026/)
