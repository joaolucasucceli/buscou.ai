---
tipo: agente
area: Ambos
tags: [agente, visual, imagem, seo, aio, conteudo, assets]
atualizado: 2026-04-23
---

# Agente Visual

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. O Agente Visual fornece imagens otimizadas (capa + contextuais) para cada artigo. Em **V1** usa bancos de imagem (Unsplash/Pexels) com query contextual; em **V1.1+** gera imagens com DALL-E 3 / Ideogram para capas unicas.

Relacionado: [[Arquitetura de Agentes]] | [[Orquestrador]] | [[Agente Redator]] | [[Agente Publicador]] | [[Regras de Imagem SEO + AIO]] | [[Midia e Assets]]

---

## Escopo por fase

| Fase | Fonte de imagem | Numero por artigo |
|---|---|---|
| **V1 (MVP)** | Unsplash/Pexels via API (busca contextual) | 1-2 (capa + opcional) |
| **V1.1** | + DALL-E 3 para capas unicas | 2-3 (capa + explicativa) |
| **V2** | + Ideogram, Midjourney API, imagens custom por marca | 3-5 (capa, explicativa, comparativa, CTA) |

---

## Funcao

Recebe artigo finalizado pelo [[Agente Redator]] e:
1. Analisa a estrutura do artigo (H2s, listas, comparacoes).
2. Define plano visual (o que mostrar onde).
3. Busca/gera a(s) imagem(ns).
4. Otimiza (WebP, 3 tamanhos responsivos, < 200KB desktop).
5. Gera metadados SEO (filename semantico, alt text descritivo, caption).
6. Insere marcadores no markdown e registra em `imagens_conteudo`.

Nenhuma imagem decorativa sem proposito. Cada imagem tem funcao clara.

---

## Input

| Input | Fonte |
|---|---|
| Conteudo do artigo (markdown) | `conteudos.conteudo_markdown` |
| Keyword principal | `conteudos.keyword_principal` |
| Cidade/bairros | `localizacoes.cidade_principal`, `localizacoes.bairros_foco` |
| Categoria do negocio | `identidade.categoria` |
| Tom de voz | `marca.tom_de_voz` |
| Cores da marca (quando disponivel) | `marca.cores` |
| Estrutura do artigo | H2s e blocos |
| Briefing | `briefings_conteudo.briefing_json` |

## Output

| Output | Destino |
|---|---|
| Plano visual (JSON) | `conteudos.plano_visual_json` |
| Imagens originais | Supabase Storage (`image-staging-private`) |
| Metadados SEO | tabela `imagens_conteudo` |
| Imagens otimizadas (WebP) | Supabase Storage (`blog-imagens-publico`) |
| Marcadores no markdown do artigo | `conteudos.conteudo_markdown` |

---

## Ferramentas/APIs

| Ferramenta | Fase | Uso |
|---|---|---|
| Unsplash API | V1 | Buscar imagem com query contextual |
| Pexels API | V1 | Fallback / alternativa |
| OpenAI Images (DALL-E 3) | V1.1+ | Gerar capas unicas por artigo |
| Stability AI | V1.1+ | Alternativa quando DALL-E indisponivel |
| Ideogram API | V2 | Geracao com texto embutido (quando necessario) |
| Sharp (Node.js) | Todas | Compressao, WebP, resize |
| Supabase Storage | Todas | Upload, buckets staging + publico |
| Claude Sonnet 4 | Todas | Gerar query de busca + prompts + alt text |
| MCP Tools | Todas | `generate_visual_plan`, `find_image`, `generate_image`, `optimize_image`, `upload_asset`, `update_article_images` |

---

## Processamento (6 etapas)

### 1. Identificar pontos visuais

Analisa estrutura do artigo e detecta onde imagem agrega valor:

| Elemento | Tipo | Obrigatorio |
|---|---|---|
| Abertura | Capa | SIM |
| Secoes complexas (conceitos) | Explicativa | Recomendado (V1.1+) |
| Listas comparativas (vs) | Comparacao | Recomendado (V1.1+) |
| Processos | Diagrama/fluxo | Opcional |
| Contexto geografico (SEO local) | Imagem local | Quando aplicavel |
| CTA/conclusao | Visual de conversao | Opcional (V2) |

### 2. Criar plano visual (JSON)

```json
{
  "visual_plan": [
    {
      "type": "cover",
      "goal": "representar o tema principal",
      "placement": "hero",
      "source": "unsplash",
      "query": "modern dental clinic interior brazil",
      "alt_text_preliminar": "...",
      "filename_preliminar": "clinica-estetica-vitoria-cover.webp"
    }
  ],
  "total_images": 1,
  "estimated_cost": "$0.00",
  "estimated_time": "10s"
}
```

Plano salvo em `conteudos.plano_visual_json`.

### 3. V1 — buscar em banco / V1.1+ — gerar

**V1 (Unsplash/Pexels):**
- Query curta em ingles, contextual ao tema + local.
- Filtros: orientacao (horizontal), min 1200px largura.
- Ranking: relevancia + numero de downloads.
- Fallback: Pexels se Unsplash nao encontrar.

**V1.1+ (DALL-E 3):**
- Prompt por template (cover/explanatory/comparison/local/cta).
- 1024x1024, qualidade `hd`, estilo `natural`.
- Regra: "absolutely no text, no letters, no words in the image".
- Max 2 regeracoes em caso de qualidade baixa ou texto embutido.

### 4. Otimizar assets (Sharp)

| Operacao | Detalhe |
|---|---|
| Formato | PNG/JPG → WebP |
| Qualidade | 80-85% |
| Tamanho desktop | 1200px largura |
| Tamanho mobile | 600px largura |
| Tamanho thumbnail | 300px largura |
| Tamanho alvo desktop | < 200KB |

### 5. Gerar metadados SEO

- **Filename**: `{keyword-slug}-{tipo}.webp` (kebab-case, sem acentos).
  - Bom: `clinica-estetica-vitoria-es-cover.webp`.
- **Alt text**: descritivo, contextual, keyword natural, max 125 chars.
  - Ruim: "imagem do artigo".
  - Bom: "Interior moderno de clinica de estetica em Vitoria ES com atendimento profissional".
- **Caption** (quando aplicavel): reforco semantico.

Upload das versoes otimizadas para `blog-imagens-publico`.

### 6. Associar ao conteudo

Inserir marcadores no markdown:

```markdown
![Alt text descritivo](url-otimizada.webp)
*Caption quando aplicavel*
```

Registrar em `imagens_conteudo`:

| Campo | Valor |
|---|---|
| `conteudo_id` | ID do artigo |
| `tipo` | cover / explanatory / comparison / local / cta |
| `url_original` | URL staging |
| `url_otimizada` | URL publica |
| `url_desktop` / `url_mobile` / `url_thumbnail` | Versoes responsivas |
| `filename` | Nome semantico |
| `alt_text` | Alt descritivo |
| `caption` | Legenda |
| `placement` | hero / mid_article / comparison_section / faq / cta |
| `posicao_ordem` | Ordem no artigo |

Atualizar status do conteudo: `plano_visual` → `imagens_prontas`.

---

## Criterios de sucesso

| Metrica | Meta |
|---|---|
| Imagens por artigo | 1-2 (V1), 2-3 (V1.1+), 3-5 (V2) |
| Tempo de processamento | < 30s (V1 busca), < 60s (V1.1+ geracao) |
| Alt text preenchido | 100% |
| Filename com keyword | 100% |
| Formato WebP | 100% |
| Tamanho < 200KB desktop | >= 95% |
| Imagem sem texto embutido | 100% |
| Coerencia com artigo (avaliada pelo [[Agente Revisor]]) | >= 90% |

---

## Regras de qualidade

1. Imagem **DEVE** ter funcao clara — sem decorativa generica.
2. Alt text **DEVE** ser descritivo — sem "imagem do artigo".
3. Filename **DEVE** conter keyword em slug kebab-case.
4. Imagem **DEVE** estar perto do bloco que ela complementa.
5. **NUNCA** texto renderizado na imagem.
6. **NUNCA** publicar sem alt text.
7. **NUNCA** publicar sem otimizacao (WebP + 3 tamanhos).
8. Manter consistencia visual entre imagens do mesmo artigo.
9. Alt text max 125 chars, nao comecar com "imagem de" ou "foto de".

---

## Casos de erro

1. **Unsplash/Pexels sem resultado relevante** (V1): fallback para imagem generica da categoria (pre-aprovada por nicho). Ultimo fallback: publicar sem imagem de capa (nao bloqueia artigo).
2. **DALL-E 3 indisponivel** (V1.1+): alternar para Stability AI. Se ambos indisponiveis, voltar para Unsplash.
3. **Imagem com texto indesejado** (DALL-E): regenerar com "absolutely no text, no letters, no words, no writing". Max 2 tentativas.
4. **Upload Supabase falha**: retry 3x com backoff. Apos falhas, salvar local e alerta.
5. **Timeout (>120s por imagem)**: publicar sem imagem + job assincrono de geracao posterior. Artigo nao atrasa.
6. **Artigo muito curto (< 500 palavras)**: apenas capa, sem imagens explicativas.

---

## Fallback

- **DALL-E indisponivel** → Stability AI → Unsplash → publicar sem capa.
- **Sharp falha** → servir original (PNG), publicar mesmo assim.
- **Storage indisponivel** → salvar local, enfileirar upload.
- **Claude indisponivel** → usar templates estaticos de query/alt text.

---

## Dependencias

- **Depende de**: [[Orquestrador]], [[Agente Redator]] (artigo com H2s).
- **Quem depende**: [[Agente Revisor]] (valida coerencia), [[Agente Publicador]] (recebe imagens).
- **Referencia**: [[Regras de Imagem SEO + AIO]], [[Template de Artigo]], [[Midia e Assets]], [[On-Page SEO]].

---

## Custo estimado por artigo

| Fase | Fonte | Custo |
|---|---|---|
| V1 | Unsplash/Pexels | Gratuito |
| V1.1 | DALL-E 3 (1-2 imagens) | ~$0,04-0,08 |
| V2 | Multiplas imagens | ~$0,15-0,30 |

Claude Sonnet (query + alt text): ~$0,01 por artigo em todas as fases.

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 7 — ultima verificacao 2026-04-23.*
