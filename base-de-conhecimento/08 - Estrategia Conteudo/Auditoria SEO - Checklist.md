---
tipo: estrategia
area: SEO
tags:
  - seo
  - auditoria
  - checklist
  - tecnico
  - on-page
  - off-page
  - aio
  - estrategia
atualizado: 2026-04-22
---

# Auditoria SEO - Checklist Completo

Checklist abrangente para realizar uma auditoria de [[O que e SEO|SEO]] completa em 2026, cobrindo aspectos tecnicos, on-page, off-page, conteudo e a nova dimensao de [[O que e AIO|AIO/GEO]]. Use este checklist em conjunto com o [[Framework SEO Completo]] para priorizar e executar as correcoes.

---

## Quando Realizar uma Auditoria SEO?

- **Novo projeto:** Antes de iniciar qualquer trabalho de SEO
- **Trimestralmente:** Revisao parcial para identificar problemas emergentes
- **Semestralmente:** Auditoria completa
- **Apos queda de trafego:** Diagnosticar problemas rapidamente
- **Apos atualizacao de algoritmo:** Verificar impacto no site
- **Antes de redesign/migracao:** Documentar estado atual

---

## 1. Auditoria Tecnica

### 1.1 Rastreabilidade e Indexacao

- [ ] **Robots.txt** configurado corretamente — nao bloqueando paginas importantes
- [ ] **XML Sitemap** existente, atualizado e submetido ao [[Google Search Console]]
- [ ] **Sitemap nao contem URLs 404, redirecionadas ou noindex**
- [ ] **Cobertura de indexacao:** Verificar relatorio de indexacao no GSC
- [ ] **Paginas importantes estao indexadas** (buscar `site:seusite.com`)
- [ ] **Sem paginas bloqueadas indevidamente** (verificar tags noindex incorretas)
- [ ] **Crawl budget:** Site grande? Verificar se crawler acessa paginas prioritarias
- [ ] **Profundidade de rastreamento:** Paginas importantes a no maximo 3 cliques da home
- [ ] **Orphan pages:** Sem paginas orfas (sem links internos apontando para elas)
- [ ] **Trailing slashes consistentes:** `/pagina/` ou `/pagina` — escolher um padrao

### 1.2 Performance e Core Web Vitals

- [ ] **LCP (Largest Contentful Paint):** < 2.5 segundos
- [ ] **INP (Interaction to Next Paint):** < 200ms
- [ ] **CLS (Cumulative Layout Shift):** < 0.1
- [ ] **TTFB (Time to First Byte):** < 800ms
- [ ] **Velocidade mobile:** Testar no PageSpeed Insights
- [ ] **Velocidade desktop:** Testar no PageSpeed Insights
- [ ] **Imagens otimizadas:** Formato WebP/AVIF, comprimidas, lazy loading
- [ ] **CSS e JS minificados**
- [ ] **Cache de navegador configurado**
- [ ] **CDN ativo** (se aplicavel)
- [ ] **Compressao GZIP/Brotli habilitada**

### 1.3 Mobile e Responsividade

- [ ] **Site responsivo** em todos os tamanhos de tela
- [ ] **Mobile-first indexing:** Versao mobile tem todo o conteudo da desktop
- [ ] **Touch targets adequados:** Botoes e links com tamanho minimo de 48x48px
- [ ] **Sem conteudo horizontal scrollavel**
- [ ] **Fontes legiveis** sem necessidade de zoom (minimo 16px)
- [ ] **Viewport configurado:** `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] **Testar no Google Mobile-Friendly Test**

### 1.4 Seguranca e Infraestrutura

- [ ] **HTTPS em todo o site** — certificado SSL valido
- [ ] **Redirecionamento HTTP → HTTPS** configurado
- [ ] **Sem mixed content** (recursos HTTP em pagina HTTPS)
- [ ] **Redirecionamento www → non-www** (ou vice-versa) — consistente
- [ ] **Sem cadeias de redirecionamento** (A → B → C — deve ser A → C)
- [ ] **Sem loops de redirecionamento**
- [ ] **Pagina 404 customizada** com navegacao e links uteis

### 1.5 Dados Estruturados

- [ ] **Schema Organization** implementado
- [ ] **Schema BreadcrumbList** em todas as paginas
- [ ] **Schema Article** em posts de blog
- [ ] **Schema Product** em paginas de produto (se e-commerce)
- [ ] **Schema FAQPage** em paginas com FAQ
- [ ] **Schema LocalBusiness** (se negocio local)
- [ ] **Sem erros de Schema** no Google Rich Results Test
- [ ] **Sem avisos criticos** no relatorio de dados estruturados do GSC

### 1.6 Arquitetura do Site

- [ ] **Estrutura de URLs logica** e hierarquica
- [ ] **Breadcrumbs** implementados em todas as paginas internas
- [ ] **Menu de navegacao** com links para paginas principais
- [ ] **Footer** com links estruturados
- [ ] **Busca interna** funcionando (com Schema SearchAction)
- [ ] **Sem URLs com parametros excessivos** indexadas
- [ ] **[[Glossario SEO e AIO#Canonical URL|Canonicals]]** corretas em todas as paginas

### 1.7 Internacionalizacao (se aplicavel)

- [ ] **[[Glossario SEO e AIO#Hreflang|Hreflang]]** implementado corretamente
- [ ] **Hreflang reciproco:** Cada pagina referencia e e referenciada
- [ ] **Sem conflitos hreflang/canonical**
- [ ] **Idioma correto** no atributo `lang` do HTML

---

## 2. Auditoria On-Page

### 2.1 Title Tags

- [ ] **Cada pagina tem title tag unica**
- [ ] **Comprimento:** 50-60 caracteres
- [ ] **Palavra-chave principal no inicio** (quando possivel)
- [ ] **Sem title tags duplicadas** entre paginas
- [ ] **Sem title tags genericas** ("Home", "Pagina", etc.)
- [ ] **Marca incluida** no final (quando aplicavel)

### 2.2 Meta Descriptions

- [ ] **Cada pagina tem meta description unica**
- [ ] **Comprimento:** 150-160 caracteres
- [ ] **Inclui palavra-chave** naturalmente
- [ ] **Contem CTA** (call to action)
- [ ] **Sem meta descriptions duplicadas**
- [ ] **Sem meta descriptions ausentes** em paginas importantes

### 2.3 Headings

- [ ] **H1 unico por pagina**
- [ ] **H1 contem a palavra-chave principal**
- [ ] **Hierarquia logica:** H1 > H2 > H3 (sem pular niveis)
- [ ] **H2s descrevem secoes** do conteudo
- [ ] **Sem headings usados apenas para estilo** (usar CSS)

### 2.4 Conteudo

- [ ] **Sem conteudo duplicado** entre paginas do site
- [ ] **Sem conteudo fino** (thin content) — paginas com menos de 300 palavras sem justificativa
- [ ] **Conteudo atende a intencao de busca** da keyword-alvo
- [ ] **Formatacao escaneavel:** Listas, negrito, tabelas, imagens
- [ ] **Links internos presentes** (3-7 por pagina)
- [ ] **Links externos** para fontes autoritativas (1-3 por pagina)
- [ ] **Sem keyword stuffing** (uso natural da palavra-chave)
- [ ] **Data de publicacao/atualizacao** visivel

### 2.5 Imagens

- [ ] **Todas as imagens tem [[Glossario SEO e AIO#Alt Text|alt text]]**
- [ ] **Alt text e descritivo** (nao generico como "imagem1.jpg")
- [ ] **Nomes de arquivo otimizados** (descritivos com hifens)
- [ ] **Formato otimizado:** WebP ou AVIF
- [ ] **Dimensoes definidas** no HTML (width e height)
- [ ] **Lazy loading** implementado para imagens abaixo da dobra
- [ ] **Sem imagens quebradas** (404)

### 2.6 URLs

- [ ] **URLs curtas e descritivas**
- [ ] **Contem palavra-chave** quando relevante
- [ ] **Usam hifens** como separadores (nao underscores)
- [ ] **Sem caracteres especiais** ou acentos
- [ ] **Sem parametros desnecessarios** em URLs indexadas
- [ ] **Lowercase consistente**

---

## 3. Auditoria Off-Page

### 3.1 Perfil de Backlinks

- [ ] **Quantidade total de dominos referentes**
- [ ] **Qualidade dos backlinks:** DR/DA medio dos sites que linkam
- [ ] **Diversidade de fontes:** Variedade de dominios, IPs, tipos de site
- [ ] **Relevancia tematica:** Links de sites do mesmo nicho
- [ ] **Ratio dofollow/nofollow:** Proporcao natural (60-80% dofollow)
- [ ] **Anchor text variado:** Sem excesso de exact-match
- [ ] **Sem links toxicos/spam** (identificar e fazer disavow)
- [ ] **Crescimento organico:** Links novos sendo adquiridos regularmente
- [ ] **Sem perda significativa** de backlinks recente

### 3.2 Analise Competitiva

- [ ] **Comparar perfil de backlinks** com top 5 concorrentes
- [ ] **Identificar fontes de links** que concorrentes tem e voce nao
- [ ] **Gap analysis de keywords:** Palavras-chave que concorrentes ranqueiam e voce nao
- [ ] **Comparar metricas de autoridade** (DR, DA, Trust Flow)

### 3.3 Presenca de Marca

- [ ] **Google Business Profile** atualizado (se aplicavel)
- [ ] **[[Glossario SEO e AIO#NAP|NAP]]** (Nome, Endereco, Telefone) consistente na web
- [ ] **Perfis sociais ativos** e linkados ao site
- [ ] **Mencoes de marca** na web (monitorar com Google Alerts)
- [ ] **Reviews** em plataformas relevantes (Google, Reclame Aqui, etc.)

---

## 4. Auditoria de Conteudo

### 4.1 Inventario de Conteudo

- [ ] **Listar todas as paginas** com trafego organico
- [ ] **Identificar paginas sem trafego** nos ultimos 6 meses
- [ ] **Classificar por performance:** Top, medio, baixo
- [ ] **Identificar conteudo desatualizado** (dados, links, referencias)
- [ ] **Detectar [[Glossario SEO e AIO#Keyword Cannibalization|canibalizacao]]** de keywords

### 4.2 Qualidade do Conteudo

- [ ] **Conteudo atende padroes [[Glossario SEO e AIO#E-E-A-T|E-E-A-T]]?**
- [ ] **Autores identificados** com paginas de autor?
- [ ] **Fontes citadas** quando afirmacoes sao feitas?
- [ ] **Conteudo original** (nao copiado ou gerado por IA sem revisao)?
- [ ] **Conteudo util** que resolve o problema do usuario?
- [ ] **[[Glossario SEO e AIO#YMYL|YMYL]]:** Conteudo de saude/financas segue padroes extras de qualidade?

### 4.3 Acoes para Conteudo

Para cada pagina, decidir uma acao:

| Acao | Quando Aplicar |
|------|----------------|
| **Manter** | Bom trafego, conteudo atualizado |
| **Atualizar** | Ranqueando posicoes 5-20, conteudo pode melhorar |
| **Consolidar** | Multiplas paginas competindo pela mesma keyword |
| **Redirecionar 301** | Conteudo irrelevante mas com backlinks |
| **Remover (noindex)** | Conteudo sem trafego, sem backlinks, sem valor |
| **Criar** | Gap de conteudo identificado |

---

## 5. Auditoria AIO/GEO (Novo em 2026)

Esta secao e especifica para avaliar a visibilidade em motores de busca baseados em IA. Consulte o [[Framework AIO Completo]] para mais detalhes.

### 5.1 Visibilidade em IA

- [ ] **Testar mencoes da marca** no ChatGPT, Perplexity, Claude, Gemini
- [ ] **Verificar presenca em Google AI Overviews** para queries principais
- [ ] **Informacoes sobre a marca estao corretas** nos LLMs?
- [ ] **Concorrentes sao mais citados?** Em quais queries?

### 5.2 Conteudo para IA

- [ ] **Conteudo segue formato citavel:** Declaracoes claras, dados, estatisticas
- [ ] **Perguntas e respostas explicitas** (formato FAQ)
- [ ] **Definicoes claras** ("X e definido como...")
- [ ] **Dados e estatisticas com fontes** citadas
- [ ] **Conteudo estruturado** com headers logicos e listas

### 5.3 Infraestrutura para IA

- [ ] **llms.txt** presente na raiz do site
- [ ] **Robots.txt** permite crawlers de IA (GPTBot, ClaudeBot, PerplexityBot)
- [ ] **Schema markup completo** e sem erros
- [ ] **Dados estruturados abrangentes** (Organization, Article, FAQ, etc.)

### 5.4 Sinais de Autoridade para IA

- [ ] **Paginas de autor detalhadas** com Schema Person
- [ ] **Citacoes em fontes autoritativas** (Wikipedia, publicacoes do nicho)
- [ ] **Presenca consistente** em multiplas plataformas
- [ ] **Dados e pesquisas originais** publicados
- [ ] **Reviews e depoimentos** com Schema

---

## 6. Ferramentas para Auditoria

### Ferramentas Gratuitas

| Ferramenta | Uso Principal |
|------------|---------------|
| [[Google Search Console]] | Indexacao, performance, erros |
| Google Analytics | Trafego, comportamento, conversoes |
| Google PageSpeed Insights | Core Web Vitals, velocidade |
| Google Mobile-Friendly Test | Teste de mobile |
| Google Rich Results Test | Validacao de Schema |
| Lighthouse (Chrome DevTools) | Auditoria tecnica completa |
| Bing Webmaster Tools | Indexacao no Bing |

### Ferramentas Pagas

| Ferramenta | Uso Principal | Destaque |
|------------|---------------|----------|
| Screaming Frog | Crawl tecnico completo | Versao gratuita ate 500 URLs |
| Ahrefs | Backlinks, keywords, auditoria tecnica | Site Audit automatizado |
| SEMrush | Auditoria completa, keywords, posicoes | Site Audit + Position Tracking |
| Moz Pro | DA/PA, link analysis | Link Explorer |
| Sitebulb | Auditoria tecnica visual | Visualizacoes de dados |
| ContentKing | Monitoramento em tempo real | Alertas automaticos |
| Otterly.ai | Visibilidade em AI Overviews | Monitoramento AIO |

---

## Modelo de Relatorio de Auditoria

### Estrutura do Relatorio

```
1. Resumo Executivo
   - Score geral do site
   - Top 5 problemas criticos
   - Top 5 oportunidades rapidas (quick wins)

2. Auditoria Tecnica
   - Problemas encontrados por severidade
   - Acoes recomendadas com prioridade

3. Auditoria On-Page
   - Problemas de metadados
   - Problemas de conteudo
   - Acoes recomendadas

4. Auditoria Off-Page
   - Estado do perfil de backlinks
   - Oportunidades de link building
   - Acoes recomendadas

5. Auditoria de Conteudo
   - Inventario e classificacao
   - Acoes por pagina/grupo

6. Auditoria AIO/GEO
   - Visibilidade atual em IA
   - Gaps e oportunidades
   - Acoes recomendadas

7. Plano de Acao
   - Prioridade 1 (Critico): Semanas 1-2
   - Prioridade 2 (Alto impacto): Semanas 3-6
   - Prioridade 3 (Importante): Meses 2-3
   - Prioridade 4 (Melhorias): Meses 3-6

8. Cronograma e Responsaveis
```

### Priorizacao de Correcoes

```
CRITICO (Corrigir imediatamente):
- Paginas importantes nao indexadas
- Erros de rastreamento bloqueando acesso
- Site sem HTTPS
- Core Web Vitals reprovando

ALTO (Corrigir em 2-4 semanas):
- Title tags duplicadas/ausentes
- Conteudo duplicado
- Links internos quebrados
- Schema com erros

MEDIO (Corrigir em 1-2 meses):
- Otimizar meta descriptions
- Melhorar alt text
- Atualizar conteudo antigo
- Implementar llms.txt

BAIXO (Corrigir em 3-6 meses):
- Melhorias incrementais de conteudo
- Link building proativo
- Otimizacoes finas de performance
```

---

## Notas Relacionadas

- [[Framework SEO Completo]]
- [[Framework AIO Completo]]
- [[Content Clustering e Pillar Pages]]
- [[Link Building Estrategico]]
- [[SEO para E-commerce]]
- [[SEO para SaaS]]
- [[SEO para Conteudo e Blogs]]
- [[Glossario SEO e AIO]]
- [[Como Funcionam os Motores de Busca]]

---

## Fontes

- [Technical SEO Audit Checklist 2026: 200+ Items to Fix - Digital Applied](https://www.digitalapplied.com/blog/technical-seo-audit-checklist-200-items)
- [The Ultimate SEO Checklist 2026: Step-by-Step Guide - ClickRank](https://www.clickrank.ai/ultimate-seo-checklist/)
- [The Complete Website Audit Checklist for 2026 (SEO + UX) - Red Rattler Creative](https://redrattlercreative.com/complete-website-audit-checklist-2026/)
- [SEO Audit Checklist 2026 (Technical + Content) - Bravery Technology](https://braverytechnology.com/seo-audit-checklist/)
- [Technical SEO Checklist 2026: What Really Matters - NoGood](https://nogood.io/blog/technical-seo-checklist/)
- [How to Perform SEO Audit: 50 Things Checklist for 2026 - Medium](https://medium.com/@makarenko.roman121/how-to-perform-seo-audit-50-things-checklist-for-2026-e66131fb5cff)
