---
tipo: estrategia
area: SEO
tags:
  - seo
  - framework
  - auditoria
  - estrategia
  - on-page
  - off-page
  - tecnico
atualizado: 2026-04-22
---

# Framework SEO Completo: Do Audit a Execucao

Um framework completo e passo a passo para implementar uma estrategia de [[O que e SEO|SEO]] do zero, cobrindo desde a auditoria inicial ate o monitoramento continuo. Este guia e aplicavel a qualquer tipo de site e pode ser adaptado conforme o nicho e os recursos disponiveis.

---

## Visao Geral das Fases

| Fase | Descricao | Prazo Estimado |
|------|-----------|----------------|
| 1. Auditoria | Diagnostico completo do site | Semanas 1-2 |
| 2. Pesquisa de Palavras-chave | Mapeamento de oportunidades | Semanas 2-3 |
| 3. Otimizacao On-Page | Ajustes em conteudo e metadados | Semanas 3-6 |
| 4. Correcoes Tecnicas | Infraestrutura e performance | Semanas 3-8 |
| 5. Criacao de Conteudo | Producao estrategica | Semanas 4-continuo |
| 6. Link Building | Construcao de autoridade | Semanas 6-continuo |
| 7. Monitoramento | Acompanhamento e iteracao | Continuo |

---

## Fase 1: Auditoria SEO (Semanas 1-2)

A auditoria e o ponto de partida. Sem um diagnostico preciso, qualquer acao sera baseada em suposicoes. Consulte o checklist completo em [[Auditoria SEO - Checklist]].

### 1.1 Auditoria Tecnica

- **Rastreabilidade (Crawlability):** Verificar se o [[Glossario SEO e AIO#Googlebot|Googlebot]] consegue acessar todas as paginas importantes
- **Indexacao:** Conferir quais paginas estao indexadas via [[Google Search Console]]
- **Velocidade do site:** Medir [[Glossario SEO e AIO#Core Web Vitals|Core Web Vitals]] (LCP, INP, CLS)
- **Mobile-first:** Testar responsividade e usabilidade mobile
- **HTTPS:** Verificar certificado SSL e redirecionamentos
- **[[Glossario SEO e AIO#Robots.txt|Robots.txt]]** e **[[Glossario SEO e AIO#XML Sitemap|XML Sitemap]]:** Confirmar configuracao correta

### 1.2 Auditoria On-Page

- **[[Glossario SEO e AIO#Title Tag|Title Tags]]:** Unicos, entre 50-60 caracteres, com palavra-chave principal
- **[[Glossario SEO e AIO#Meta Description|Meta Descriptions]]:** Unicas, entre 150-160 caracteres, com CTA
- **[[Glossario SEO e AIO#H1-H6|Estrutura de Headings]]:** H1 unico por pagina, hierarquia logica
- **[[Glossario SEO e AIO#Alt Text|Alt Text]]:** Descritivo em todas as imagens
- **Links internos:** Distribuicao e profundidade de clique

### 1.3 Auditoria de Conteudo

- Identificar paginas com conteudo fino (thin content)
- Detectar conteudo duplicado
- Avaliar qualidade conforme padroes [[Glossario SEO e AIO#E-E-A-T|E-E-A-T]]
- Mapear [[Glossario SEO e AIO#Keyword Cannibalization|canibalizacao de palavras-chave]]

### 1.4 Auditoria Off-Page

- Analisar perfil de backlinks (qualidade, quantidade, diversidade)
- Identificar links toxicos para rejeicao (disavow)
- Comparar com perfil de backlinks dos concorrentes

### Ferramentas Recomendadas

- [[Google Search Console]] (gratuito)
- Screaming Frog SEO Spider
- Ahrefs / SEMrush / Moz
- Google PageSpeed Insights
- GTmetrix

---

## Fase 2: Pesquisa de Palavras-chave (Semanas 2-3)

### 2.1 Mapeamento de Intencao de Busca

Classifique cada palavra-chave conforme a [[Glossario SEO e AIO#User Intent|intencao do usuario]]:

| Tipo de Intencao | Exemplo | Prioridade |
|-------------------|---------|------------|
| Transacional | "comprar tenis nike" | Alta |
| Comercial | "melhor tenis para corrida" | Alta |
| Informacional | "como escolher tenis de corrida" | Media |
| Navegacional | "site nike oficial" | Baixa |

### 2.2 Processo de Pesquisa

1. **Brainstorm inicial:** Listar todos os topicos relevantes ao negocio
2. **Analise de concorrentes:** Identificar palavras-chave que concorrentes ranqueiam
3. **Expansao com ferramentas:** Usar Google Keyword Planner, Ahrefs, Ubersuggest
4. **Filtrar por metricas:** Volume de busca, dificuldade, CPC, tendencia
5. **Agrupar por topico:** Organizar em [[Content Clustering e Pillar Pages|clusters de conteudo]]
6. **Priorizar:** Focar em palavras-chave com melhor relacao impacto/esforco

### 2.3 Palavras-chave Long-tail

[[Glossario SEO e AIO#Long-tail Keyword|Palavras-chave de cauda longa]] sao essenciais:
- Menor concorrencia
- Maior taxa de conversao
- Mais faceis de ranquear para sites novos
- Exemplo: em vez de "SEO", focar em "como fazer SEO para e-commerce em 2026"

---

## Fase 3: Otimizacao On-Page (Semanas 3-6)

### 3.1 Otimizacao de Metadados

Para cada pagina prioritaria:

```
Title Tag: [Palavra-chave Principal] - [Beneficio] | [Marca]
Exemplo: "Tenis para Corrida: Guia Completo de Escolha | SportShop"

Meta Description: [Contexto] + [Beneficio] + [CTA]
Exemplo: "Descubra como escolher o tenis ideal para corrida. 
Comparamos 20 modelos para todos os tipos de pisada. Confira agora!"
```

### 3.2 Otimizacao de Conteudo

- **Palavra-chave no primeiro paragrafo** (naturalmente)
- **Subtitulos (H2, H3)** com variacoes da palavra-chave
- **Conteudo abrangente:** Cobrir o topico em profundidade
- **Formatacao escaneavel:** Listas, tabelas, negrito em pontos-chave
- **Midia rica:** Imagens otimizadas, videos, infograficos
- **Links internos:** 3-5 links para paginas relacionadas
- **Links externos:** 2-3 links para fontes autoritativas

### 3.3 Otimizacao de URLs

- Curtas e descritivas
- Conter a palavra-chave principal
- Usar hifens como separadores
- Evitar parametros desnecessarios

**Exemplo:**
- Ruim: `site.com/p?id=123&cat=45`
- Bom: `site.com/tenis-corrida-guia-completo`

---

## Fase 4: Correcoes Tecnicas (Semanas 3-8)

### 4.1 Prioridade Tier 1 (Critico - Semanas 3-4)

Problemas que bloqueiam a visibilidade:
- Corrigir erros de rastreamento (paginas 404, loops de redirecionamento)
- Implementar redirecionamentos 301 para URLs alteradas
- Corrigir problemas de indexacao (tags noindex incorretas)
- Garantir que o sitemap XML esta atualizado e enviado ao Google

### 4.2 Prioridade Tier 2 (Alto Impacto - Semanas 4-6)

- **Core Web Vitals:**
  - LCP (Largest Contentful Paint) < 2.5s
  - INP (Interaction to Next Paint) < 200ms
  - CLS (Cumulative Layout Shift) < 0.1
- **Otimizacao de imagens:** WebP/AVIF, lazy loading, dimensoes definidas
- **Minificacao:** CSS, JavaScript, HTML
- **Cache:** Configurar cache de navegador e CDN

### 4.3 Prioridade Tier 3 (Importante - Semanas 6-8)

- Implementar [[Glossario SEO e AIO#Schema Markup|Schema Markup]] (Organization, Article, FAQ, Product)
- Configurar [[Glossario SEO e AIO#Hreflang|hreflang]] para sites multilinguais
- Otimizar arquitetura do site (maximo 3 cliques ate qualquer pagina)
- Implementar breadcrumbs com dados estruturados
- Configurar [[Glossario SEO e AIO#Canonical URL|URLs canonicas]] corretamente

---

## Fase 5: Criacao de Conteudo (Semana 4 em diante)

### 5.1 Calendario Editorial

Baseado nos [[Content Clustering e Pillar Pages|clusters de conteudo]]:

1. **Mes 1-2:** Criar/otimizar pillar pages para os topicos principais
2. **Mes 2-4:** Produzir cluster content (artigos de suporte)
3. **Mes 4+:** Expandir para novos clusters e atualizar conteudo existente

### 5.2 Estrutura de Conteudo Ideal

```
- Introducao com a palavra-chave (100-150 palavras)
- Sumario/indice (para artigos longos)
- Secoes com H2 (cada uma respondendo uma pergunta)
  - Subsecoes com H3 (detalhamento)
- Elementos visuais a cada 300-500 palavras
- Conclusao com CTA
- FAQ (perguntas frequentes com Schema FAQ)
```

### 5.3 Frequencia Recomendada

| Tipo de Site | Frequencia Minima | Ideal |
|--------------|-------------------|-------|
| Blog/Media | 2-3x por semana | 5x por semana |
| E-commerce | 1-2x por semana | 3-4x por semana |
| SaaS | 1x por semana | 2-3x por semana |
| Servicos locais | 2x por mes | 1x por semana |

### 5.4 Atualizacao de Conteudo Existente

Revisar e atualizar conteudo antigo a cada 6-12 meses:
- Atualizar dados e estatisticas
- Adicionar novas secoes relevantes
- Melhorar a formatacao e legibilidade
- Otimizar para novas palavras-chave
- Adicionar [[Glossario SEO e AIO#Schema Markup|dados estruturados]]

---

## Fase 6: Link Building (Semana 6 em diante)

Consulte o guia completo em [[Link Building Estrategico]].

### 6.1 Estrategia Progressiva

**Mes 1-2 (Fundacao):**
- Registrar em diretorios relevantes e de qualidade
- Criar perfis em plataformas do nicho
- Buscar links de parceiros e fornecedores

**Mes 3-4 (Crescimento):**
- Iniciar guest posting em sites relevantes
- Produzir conteudo linkavel (pesquisas, infograficos, ferramentas)
- Implementar broken link building

**Mes 5+ (Escala):**
- Digital PR e assessoria de imprensa
- Construir relacionamentos com jornalistas (HARO, Terkel)
- Criar recursos definitivos que atraiam links naturais

### 6.2 Metas de Links

| Competitividade do Nicho | Links/Mes (minimo) |
|--------------------------|--------------------|
| Baixa | 5-10 |
| Media | 10-25 |
| Alta | 25-50+ |

---

## Fase 7: Monitoramento e Iteracao (Continuo)

### 7.1 KPIs Essenciais

| Metrica | Ferramenta | Frequencia |
|---------|------------|------------|
| Posicoes de palavras-chave | Ahrefs/SEMrush | Semanal |
| Trafego organico | Google Analytics | Semanal |
| Impressoes e cliques | [[Google Search Console]] | Semanal |
| Core Web Vitals | PageSpeed Insights | Mensal |
| Backlinks novos/perdidos | Ahrefs | Mensal |
| Conversoes organicas | Google Analytics | Semanal |
| Visibilidade em IA | Otterly/Peec AI | Mensal |

### 7.2 Ciclo de Revisao

- **Semanal:** Checar ranking e trafego, identificar anomalias
- **Mensal:** Analisar tendencias, ajustar prioridades
- **Trimestral:** Revisao completa, nova auditoria parcial, ajuste de estrategia
- **Semestral:** Auditoria completa, revisao de metas

### 7.3 Adaptacao a Atualizacoes de Algoritmo

Quando houver uma atualizacao do algoritmo do Google:
1. Nao entrar em panico — esperar 2-3 semanas para dados estabilizarem
2. Analisar quais paginas foram afetadas (positiva ou negativamente)
3. Comparar com as diretrizes oficiais do Google
4. Ajustar estrategia conforme necessario
5. Documentar aprendizados

---

## Framework de Priorizacao

Use a matriz Impacto x Esforco para priorizar acoes:

```
         Alto Impacto
              |
   Quick Wins | Projetos Estrategicos
   (Fazer     | (Planejar e
    primeiro)  |  executar)
--------------+------------------
   Tarefas    | Nao Priorizar
   Menores    | (Fazer se sobrar
   (Delegar)  |  tempo)
              |
         Baixo Impacto

   Baixo Esforco --> Alto Esforco
```

### Exemplos Praticos de Priorizacao

| Acao | Impacto | Esforco | Prioridade |
|------|---------|---------|------------|
| Corrigir title tags | Alto | Baixo | Quick Win |
| Criar pillar page | Alto | Alto | Estrategico |
| Adicionar alt text | Medio | Baixo | Quick Win |
| Migrar para novo CMS | Medio | Alto | Nao priorizar |
| Corrigir 404s | Alto | Baixo | Quick Win |
| Link building campanha | Alto | Alto | Estrategico |

---

## Timeline Resumida (Primeiros 6 Meses)

```
Mes 1: Auditoria + Pesquisa de Palavras-chave
Mes 2: Correcoes tecnicas criticas + Otimizacao on-page
Mes 3: Criacao de conteudo (pillar pages) + Correcoes tecnicas restantes
Mes 4: Conteudo de cluster + Inicio do link building
Mes 5: Expansao de conteudo + Link building ativo
Mes 6: Revisao completa + Ajuste de estrategia + Escala
```

**Resultados esperados:**
- Mes 1-3: Melhorias tecnicas visiveis, primeiros ganhos de ranking
- Mes 3-6: Crescimento de trafego organico (20-50%)
- Mes 6-12: Resultados significativos e compostos

---

## Notas Relacionadas

- [[O que e SEO]]
- [[Auditoria SEO - Checklist]]
- [[Content Clustering e Pillar Pages]]
- [[Link Building Estrategico]]
- [[SEO para E-commerce]]
- [[SEO para SaaS]]
- [[SEO para Conteudo e Blogs]]
- [[Framework AIO Completo]]
- [[Glossario SEO e AIO]]

---

## Fontes

- [The Complete Website Audit Checklist for 2026 (SEO + UX)](https://redrattlercreative.com/complete-website-audit-checklist-2026/)
- [SEO Audit Checklist 2026: A Step-by-Step Guide](https://seeklab.io/blog/the-complete-seo-audit-checklist-for-2026-a-step-by-step-guide/)
- [The Ultimate SEO Checklist 2026: Step-by-Step Guide](https://www.clickrank.ai/ultimate-seo-checklist/)
- [How to Perform a Complete SEO Audit in 20 Steps - Semrush](https://www.semrush.com/blog/seo-audit/)
- [Full Technical SEO Checklist: Complete Audit Guide for 2026](https://visiblefactors.com/technical-seo-checklist/)
