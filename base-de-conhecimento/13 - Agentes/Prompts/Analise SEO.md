---
tipo: recurso
area: SEO
tags: [prompts, analise, seo, auditoria, operacional]
atualizado: 2026-04-22
---

# Prompts para Analise SEO

Colecao de prompts operacionais para usar **ChatGPT, Claude ou Gemini** como assistente de auditoria e analise SEO. Copie, substitua os campos entre `[colchetes]` e execute. Estes prompts complementam as ferramentas em [[Google Search Console]], [[Ahrefs]], [[SEMrush]] — nao as substituem.

> **Importante:** Para auditorias tecnicas profundas, use [[Screaming Frog]] + os prompts abaixo para interpretar os dados. A IA analisa dados que voce alimenta — ela nao crawla seu site sozinha.

---

## 1. Audit Rapido de Pagina

**Prompt:**
> "Analise a URL [url] e identifique os 5 problemas SEO mais criticos. Para cada problema: (1) o que esta errado, (2) o impacto no ranking (alto/medio/baixo), (3) como corrigir em 1-2 frases. Considere: title tag, meta description, headers, conteudo, velocidade, mobile, schema markup."

**Quando usar:** Primeiro passo ao avaliar qualquer pagina — sua ou do concorrente.
**Saida esperada:** Lista priorizada de 5 problemas com solucao imediata.
**Dica:** Cole o HTML da pagina junto com a URL para uma analise mais precisa.

---

## 2. Keyword Research Long-Tail

**Prompt:**
> "Gere 50 long-tail keywords para o nicho '[nicho]' organizadas por intencao de busca. Categorias: (1) Informacional — 'o que e', 'como funciona', (2) Navegacional — marca + termo, (3) Comercial — 'melhor', 'review', 'comparacao', (4) Transacional — 'preco', 'comprar', 'contratar'. Para cada keyword, estime: volume relativo (alto/medio/baixo) e dificuldade (facil/medio/dificil). Formato: tabela."

**Quando usar:** No inicio de qualquer projeto ou ao expandir para novos subtopicos.
**Saida esperada:** Tabela com 50 keywords categorizadas.
**Dica:** Valide os volumes reais em [[Google Trends e Keyword Planner]] ou [[Ahrefs]]. A IA estima, nao mede. Veja [[Palavras-Chave e Intencao de Busca]].

---

## 3. Analise de Concorrente

**Prompt:**
> "Compare meu site [sua url] com o concorrente [url do concorrente]. Analise: (1) topicos que ele cobre e eu nao (content gaps), (2) estrutura de conteudo (formatos, extensao, headers), (3) estrategia de keywords aparente, (4) sinais de E-E-A-T visiveis, (5) schema markup implementado. Apresente em tabela comparativa com coluna 'Acao Recomendada'."

**Quando usar:** Mensalmente ou ao iniciar um projeto novo. Veja [[Auditoria SEO - Checklist]].
**Saida esperada:** Tabela comparativa + lista de acoes priorizadas.
**Dica:** Cole o sitemap.xml de ambos os sites para uma analise mais completa de cobertura de topicos.

---

## 4. Auditoria de Robots.txt

**Prompt:**
> "Analise este robots.txt e sugira melhorias para SEO e AIO. Verifique: (1) algum conteudo importante esta bloqueado?, (2) crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) estao permitidos ou bloqueados?, (3) o sitemap.xml esta referenciado?, (4) ha regras conflitantes ou redundantes? Robots.txt atual: [cole o conteudo]."

**Quando usar:** Em toda auditoria tecnica. Veja [[llms.txt e Acessibilidade para Crawlers IA]].
**Saida esperada:** Analise linha por linha + versao corrigida do robots.txt.
**Dica:** Muitos templates de CMS bloqueiam bots de IA por padrao. Sempre verifique.

---

## 5. Geracao de Schema Markup

**Prompt:**
> "Gere o schema markup JSON-LD do tipo '[tipo — ex: FAQPage, HowTo, Product, Organization, Article, LocalBusiness]' para esta pagina. Informacoes: [cole titulo, descricao, dados relevantes da pagina]. O schema deve: (1) ser valido no Google Rich Results Test, (2) incluir todos os campos recomendados (nao so os obrigatorios), (3) estar pronto para colar no <head> da pagina."

**Quando usar:** Para cada pagina importante. Priorize FAQPage e Organization. Veja [[Schema Markup para IA]].
**Saida esperada:** Bloco JSON-LD pronto para implementar.
**Dica:** Sempre valide em https://search.google.com/test/rich-results antes de publicar.

---

## 6. Oportunidades de Internal Linking

**Prompt:**
> "Sugira oportunidades de internal linking entre estas paginas: [liste 10-20 URLs com titulo de cada]. Para cada link sugerido: (1) pagina de origem, (2) pagina de destino, (3) anchor text recomendado, (4) onde inserir no texto (secao/paragrafo), (5) relevancia (alta/media). Priorize links que fortalecem o topic cluster principal."

**Quando usar:** Mensalmente ou apos publicar conteudo novo. Veja [[Content Clustering e Pillar Pages]].
**Saida esperada:** Tabela de links sugeridos com anchor text e posicao.
**Dica:** Internal linking e um dos quick wins mais subestimados em SEO. Veja [[Framework SEO Completo]].

---

## 7. Title Tag com CTR Optimization

**Prompt:**
> "Crie 5 variantes de title tag para a pagina '[pagina]' com a keyword '[keyword]'. Regras: (1) maximo 60 caracteres, (2) keyword nos primeiros 30 caracteres, (3) use power words que aumentam CTR (guia, definitivo, atualizado, 2026, comprovado), (4) pelo menos 1 variante com numero, (5) pelo menos 1 variante com pergunta. Para cada: indique CTR estimado (alto/medio/baixo)."

**Quando usar:** Para otimizar paginas com bom ranking mas baixo CTR (veja [[Google Search Console]] > Performance).
**Saida esperada:** 5 title tags rankeados por potencial de CTR.
**Dica:** Se a pagina ja rankeia top 5 mas tem CTR abaixo de 3%, o title tag e provavelmente o problema.

---

## 8. Content Gap Analysis

**Prompt:**
> "Analise estas keywords dos concorrentes e identifique gaps no meu site. Keywords dos concorrentes: [cole lista de keywords do Ahrefs/SEMrush]. Meus topicos atuais: [cole lista de titulos/URLs]. Identifique: (1) keywords que eles rankeiam e eu nao tenho conteudo, (2) keywords onde meu conteudo existe mas e mais fraco, (3) oportunidades de 'low-hanging fruit' (volume decente + dificuldade baixa). Priorize por impacto comercial."

**Quando usar:** Trimestralmente ou ao iniciar estrategia de conteudo.
**Saida esperada:** Lista priorizada de gaps com tipo de conteudo sugerido para cada.
**Dica:** Exporte keywords do [[Ahrefs]] ou [[SEMrush]] e alimente direto neste prompt.

---

## 9. Auditoria de Velocidade e Core Web Vitals

**Prompt:**
> "Analise estes resultados do PageSpeed Insights e priorize as correcoes. Dados: [cole o JSON ou as metricas principais — LCP, FID/INP, CLS]. Para cada problema: (1) o que esta causando, (2) impacto no SEO (alto/medio/baixo), (3) como corrigir (instrucao para desenvolvedor), (4) tempo estimado de correcao. Ordene por impacto."

**Quando usar:** Na auditoria tecnica inicial e apos cada sprint de desenvolvimento. Veja [[SEO Tecnico]].
**Saida esperada:** Lista priorizada de correcoes tecnicas.
**Dica:** LCP > 2.5s e CLS > 0.1 sao os problemas mais comuns. Foque neles primeiro.

---

## 10. Analise de Backlink Profile

**Prompt:**
> "Analise este perfil de backlinks e sugira estrategia. Dados: [cole resumo do Ahrefs — DR, total de backlinks, referring domains, top anchor texts, top linking pages]. Identifique: (1) qualidade geral do perfil (saudavel/arriscado/fraco), (2) anchor texts que parecem manipulativos, (3) oportunidades de link building baseadas nos gaps, (4) links toxicos que devem ser desautorizados, (5) top 5 acoes para fortalecer o perfil."

**Quando usar:** Na auditoria inicial e trimestralmente. Veja [[Off-Page SEO e Link Building]].
**Saida esperada:** Diagnostico do perfil + plano de acao de link building.
**Dica:** Combine com [[Link Building Estrategico]] para a estrategia de aquisicao.

---

## 11. Auditoria de Sitemap e Indexacao

**Prompt:**
> "Analise este sitemap.xml e identifique problemas. Sitemap: [cole o conteudo ou lista de URLs]. Verifique: (1) URLs com status 404 ou redirect, (2) paginas importantes ausentes, (3) paginas de baixa qualidade que nao deveriam estar indexadas, (4) estrutura e organizacao do sitemap, (5) se o lastmod esta atualizado. Sugira versao otimizada."

**Quando usar:** Na auditoria tecnica. Veja [[SEO Tecnico]].
**Saida esperada:** Lista de problemas + sitemap corrigido.

---

## 12. Analise de SERP e Intencao de Busca

**Prompt:**
> "Para a keyword '[keyword]', analise a SERP atual do Google. Baseado nos tipos de resultado que aparecem (featured snippets, AI Overviews, People Also Ask, videos, local pack, etc.), determine: (1) a intencao de busca predominante, (2) o formato de conteudo ideal para ranquear, (3) se ha oportunidade para featured snippet, (4) se AI Overviews aparece para esta query, (5) a dificuldade estimada de ranquear. SERP: [cole os primeiros 10 resultados com titulos]."

**Quando usar:** Antes de criar conteudo para qualquer keyword. Veja [[Palavras-Chave e Intencao de Busca]].
**Saida esperada:** Analise de intencao + formato ideal + oportunidades.

---

## 13. Otimizacao de URL Structure

**Prompt:**
> "Analise a estrutura de URLs deste site e sugira melhorias: [cole 20-30 URLs de exemplo]. Verifique: (1) URLs sao descritivas e incluem keywords?, (2) ha URLs muito longas ou com parametros desnecessarios?, (3) a hierarquia reflete a estrutura do conteudo?, (4) ha problemas de canonicalizacao potenciais?. Sugira nova estrutura padronizada."

**Quando usar:** Na auditoria tecnica ou ao planejar reestruturacao do site. Veja [[SEO Tecnico]].
**Saida esperada:** Mapeamento de URLs atuais → sugeridas com regras de redirect.

---

## 14. Analise de Canibalizacao de Keywords

**Prompt:**
> "Identifique canibalizacao de keywords neste site. Dados: [cole lista de paginas com suas keywords primarias e posicoes no Google — exporte do Search Console ou Ahrefs]. Canibalizacao ocorre quando 2+ paginas competem pela mesma keyword. Para cada caso: (1) quais paginas estao competindo, (2) qual deve ser a principal, (3) acao recomendada (consolidar, redirecionar, diferenciar intent)."

**Quando usar:** Quando varias paginas flutuam de posicao para a mesma keyword.
**Saida esperada:** Mapa de canibalizacao + plano de resolucao.
**Dica:** Canibalizacao e uma das causas mais comuns de estagnacao de ranking.

---

## 15. Checklist de Lancamento de Pagina

**Prompt:**
> "Revise esta pagina antes do lancamento usando este checklist SEO. URL: [url ou cole o HTML]. Verifique e reporte status (OK / Problema / Ausente) para: (1) title tag otimizado, (2) meta description com CTA, (3) H1 unico com keyword, (4) headers H2/H3 estruturados, (5) keyword no primeiro paragrafo, (6) imagens com alt text, (7) internal links (minimo 3), (8) schema markup, (9) URL amigavel, (10) mobile-friendly, (11) velocidade aceitavel, (12) canonical tag correta."

**Quando usar:** Antes de publicar QUALQUER pagina nova. Veja [[Auditoria SEO - Checklist]].
**Saida esperada:** Checklist com status de cada item + correcoes necessarias.

---

## Template de Auditoria Rapida (Copie e Adapte)

Para auditorias de clientes novos, execute estes prompts em sequencia:

```
1. Audit Rapido (#1) → nas 5 paginas principais
2. Robots.txt (#4) → verificar acesso
3. Content Gap (#8) → vs. top 3 concorrentes
4. Internal Linking (#6) → nas 10 paginas de maior trafego
5. Canibalizacao (#14) → verificar sobreposicoes
```

Resultado: auditoria inicial completa em ~2 horas. Sequencia aplicada pelo [[Agente Pesquisador]] na V1 como parte do onboarding automatico.

---

## Notas Relacionadas

- [[Geracao de Conteudo]] — Prompts para criacao de conteudo
- [[Otimizacao AIO]] — Prompts para otimizacao em IA
- [[Testes IA]] — Prompts para testar visibilidade em IA
- [[Auditoria SEO - Checklist]] — Checklist completo de auditoria
- [[Framework SEO Completo]] — Framework que estes prompts suportam
- [[SEO Tecnico]] — Fundamentos tecnicos
- [[On-Page SEO]] — Otimizacao on-page
- [[Off-Page SEO e Link Building]] — Estrategia de backlinks
- [[Palavras-Chave e Intencao de Busca]] — Pesquisa de keywords
