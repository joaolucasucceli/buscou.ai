---
tipo: agente
area: Sistema
tags: [agente, publicador, cms, wordpress, schema, indexacao, llms-txt]
atualizado: 2026-04-22
---

# Agente Publicador

## Funcao

O Agente Publicador recebe conteudo aprovado pelo [[Agente Revisor]] e o publica no CMS do cliente (WordPress ou headless CMS). Alem de publicar, ele insere schema markup (JSON-LD) validado, submete a URL para indexacao no Google Search Console, cria/atualiza o arquivo `llms.txt` para acessibilidade por crawlers de IA, configura internal links automaticos para o cluster, e verifica que a pagina esta tecnicamente correta (status 200, canonical, robots). E a ponte entre conteudo pronto e conteudo acessivel ao mundo.

---

## Input

- **Artigo aprovado**: markdown com metadata SEO, schema JSON-LD, e notas de publicacao
- **Configuracao do CMS**: URL da API WordPress (REST API), credenciais (Application Password), categoria, autor
- **Schema markup**: JSON-LD validado (FAQPage, HowTo, Article, ProductReview)
- **Cluster map**: lista de internal links planejados pelo [[Agente Estrategista]]
- **Dados de llms.txt**: URLs e descricoes para atualizar arquivo de acessibilidade IA

## Output

- **URL publicada**: URL final do artigo no site do cliente
- **Confirmacao de indexacao**: status do submit no Google Search Console (queued/indexed)
- **llms.txt atualizado**: arquivo atualizado com nova entrada
- **Report de publicacao**: JSON com URL, status HTTP, canonical, schema inserido, internal links adicionados, tempo de carregamento
- **Screenshots**: captura automatica da pagina publicada para verificacao visual (opcional V2+)

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| **WordPress REST API** | Criar/atualizar post, definir categoria, tags, featured image, meta fields (Yoast/RankMath) |
| **Google Search Console API** | `URL Inspection API` para submeter URL para indexacao e verificar status |
| **FTP/SFTP** (ou WP REST) | Atualizar arquivo `llms.txt` na raiz do site |
| **Claude Sonnet 4 API** | Converter markdown para HTML otimizado, gerar alt text para imagens |
| **Google PageSpeed API** | Verificar performance da pagina apos publicacao (Core Web Vitals) |
| **MCP Tools** | `publish_post`, `submit_indexing`, `update_llms_txt`, `validate_page`, `add_internal_links` |

---

## Gatilho

- **Orquestrador despacha**: apos [[Agente Revisor]] aprovar conteudo (`status: APPROVED`)
- **Republicacao**: conteudo atualizado precisa de nova publicacao (refresh de conteudo)
- **Correcao**: erro detectado em conteudo ja publicado (schema invalido, link quebrado)

---

## Criterios de Sucesso

- **Publicacao sem erro**: 100% dos posts publicados com status HTTP 200
- **Schema valido**: 100% dos JSON-LD passam no Google Rich Results Test
- **Indexacao submetida**: 100% das URLs submetidas ao GSC em < 5 minutos apos publicacao
- **Internal links**: todos os links planejados no cluster map inseridos corretamente
- **llms.txt atualizado**: nova entrada adicionada em < 1 minuto apos publicacao
- **Performance**: pagina publicada com LCP < 2.5s, CLS < 0.1 (Core Web Vitals)

---

## Casos de Erro

1. **WordPress API retorna 401/403**: credenciais expiradas ou permissoes insuficientes. Agente notifica equipe e enfileira para retry apos correcao de credenciais.
2. **Schema invalido em producao**: schema que passou na validacao offline falha no Google Rich Results Test em producao. Agente auto-corrige campos problematicos e re-submete.
3. **GSC API rate limited**: muitas submissoes de indexacao em sequencia. Agente respeita rate limit (200 requests/dia) e enfileira excedentes.
4. **Pagina retorna 404/500 apos publicacao**: slug duplicado, servidor instavel, ou plugin conflitante. Agente detecta via health check pos-publicacao e alerta equipe.
5. **llms.txt inacessivel**: servidor bloqueia escrita no arquivo. Agente tenta via WP REST (custom endpoint) ou notifica equipe para correcao manual.

---

## Fallback

- **WordPress API falha**: salvar post como draft via email (WP Post by Email) ou enfileirar para publicacao quando API voltar. Notificar equipe.
- **GSC API falha**: agendar submissao para proxima janela (6h depois). Indexacao organica acontece em 24-48h de qualquer forma.
- **Schema invalido sem auto-correcao**: publicar sem schema e criar ticket para correcao manual. Conteudo nao deve atrasar por issue de schema.
- **Performance ruim (LCP > 4s)**: publicar mas criar alerta para equipe tecnica otimizar (lazy loading, image compression, cache).

---

## Dependencias

- **Depende de**: [[Orquestrador]] (despacho), [[Agente Revisor]] (artigo aprovado), WordPress REST API, GSC API
- **Quem depende dele**: [[Agente Distribuidor]] (recebe URL publicada para distribuicao), [[Agente Monitor]] (comeca tracking da URL)
- **Referencia**: [[Schema Markup para IA]], [[llms.txt e Acessibilidade para Crawlers IA]], [[SEO Tecnico]], [[On-Page SEO]]

---

## Exemplo de Execucao

**Cenario**: Publicar "Melhor software de gestao financeira 2026" aprovado pelo Revisor

```
1. [08:35] Orquestrador despacha artigo aprovado + schema + metadata

2. [08:35] Publicador converte markdown para HTML:
   - Headers → <h2>, <h3> com IDs para anchor links
   - Pull quotes → <blockquote class="pullquote">
   - Tabela comparativa → <table> responsiva
   - FAQ → <div class="faq-section"> com schema embutido

3. [08:36] Publicador chama WordPress REST API:
   POST /wp-json/wp/v2/posts
   {
     "title": "10 Melhores Softwares de Gestao Financeira 2026 [Testados]",
     "content": "<html convertido>",
     "status": "publish",
     "categories": [12],  // "Software"
     "meta": {
       "_yoast_wpseo_title": "10 Melhores Softwares de Gestao Financeira 2026",
       "_yoast_wpseo_metadesc": "Compare os melhores ERPs...",
       "_yoast_wpseo_schema_page_type": "FAQPage"
     }
   }
   → Response: 201 Created, URL: techsolutions.com.br/melhor-software-gestao-financeira/

4. [08:36] Publicador insere JSON-LD no header via custom field:
   <script type="application/ld+json">
   { "@type": "FAQPage", "mainEntity": [...6 perguntas...] }
   </script>

5. [08:37] Publicador adiciona internal links:
   - Link para pillar page "Gestao Financeira: Guia Completo"
   - Link para "ContaAzul vs Omie vs Bling"
   - Atualiza pillar page com link de volta

6. [08:37] Publicador submete ao GSC:
   POST /searchconsole/v1/urlInspection:index
   { "siteUrl": "sc-domain:techsolutions.com.br",
     "inspectionUrl": "https://techsolutions.com.br/melhor-software-gestao-financeira/" }
   → Response: QUEUED

7. [08:37] Publicador atualiza llms.txt:
   Adiciona: "/melhor-software-gestao-financeira/ - Comparativo dos 10 
   melhores softwares de gestao financeira em 2026 com precos e analise"

8. [08:38] Health check pos-publicacao:
   - HTTP status: 200 ✓
   - Canonical: self-referencing ✓
   - Robots: index, follow ✓
   - Schema: valido (Google Rich Results Test) ✓
   - LCP: 1.8s ✓

9. [08:38] Report enviado ao Orquestrador → pipeline segue para Distribuidor
```

**Tempo total**: 3 minutos. **Custo**: ~$0.05.

---

## Custo Estimado por Execucao

| Componente | Custo |
|---|---|
| Claude Sonnet 4 (markdown→HTML, ~3k tokens) | ~$0.02 |
| WordPress API | Gratuito (self-hosted) |
| GSC API | Gratuito |
| PageSpeed API | Gratuito |
| **Total por publicacao** | **~$0.03-0.06** |

---

## Notas Relacionadas

- [[Arquitetura de Agentes]]
- [[Orquestrador]]
- [[Agente Revisor]]
- [[Agente Distribuidor]]
- [[Agente Monitor]]
- [[Schema Markup para IA]]
- [[llms.txt e Acessibilidade para Crawlers IA]]
- [[SEO Tecnico]]
