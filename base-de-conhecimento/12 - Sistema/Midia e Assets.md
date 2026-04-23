---
tipo: sistema
area: Arquitetura
tags: [sistema, storage, midia, assets, imagens, cdn, supabase]
atualizado: 2026-04-23
---

# Midia e Assets — Armazenamento, CDN e Gestao de Imagens

## Visao Geral

Todo ativo visual do sistema (imagens de artigos, logos, brand assets) e armazenado no Supabase Storage com estrategia de buckets separados por funcao. Imagens publicadas sao servidas via CDN do Supabase.

## Arquitetura de Buckets

O sistema utiliza 3 buckets com propositos distintos:

### 1. `blog-imagens-publico` (publico)

- Para imagens ja publicadas nos artigos
- Bucket PUBLICO — acesso direto por URL, melhor cache hit no CDN
- Tudo que esta aqui e visivel na internet
- URL publica: `https://<project-ref>.supabase.co/storage/v1/object/public/blog-imagens-publico/...`

### 2. `imagens-staging` (privado)

- Para imagens geradas mas ainda nao aprovadas/publicadas
- Bucket PRIVADO — acesso por signed URL ou rota autenticada
- Preview interno para revisao

### 3. `assets-marca` (privado)

- Para logos, manuais, uploads do cliente
- Bucket PRIVADO — nao deve ficar publico
- Acessado apenas pelo sistema e pelo cliente autenticado

## Convencao de Paths

### Bucket publico

```
blog-imagens-publico/
  org_{organization_id}/
    projeto_{project_id}/
      artigo_{content_id}/
        v1/
          capa/
            melhor-imobiliaria-vitoria-es.webp
          inline/
            criterios-escolha-imobiliaria-vitoria-es.webp
        v2/
          capa/
            melhor-imobiliaria-vitoria-es-v2.webp
          inline/
            comparativo-imobiliarias-vitoria-es.webp
```

### Bucket staging

```
imagens-staging/
  org_{organization_id}/
    artigo_{content_id}/
      rascunho_{draft_id}/
        capa-draft.webp
        inline-01-draft.webp
```

### Bucket marca

```
assets-marca/
  org_{organization_id}/
    logo/
      logo-principal.png
      logo-variante.svg
    manual/
      manual-identidade.pdf
    uploads/
      depoimento-cliente-01.jpg
```

## Fluxo de Armazenamento

1. [[Agente Visual]] gera imagem via API (DALL-E 3 / Stability)
2. Imagem sobe para `imagens-staging` (bucket privado)
3. Sistema processa: compressao, conversao WebP, nome SEO-friendly, alt/caption
4. Quando imagem e vinculada a versao publicada do conteudo → copia/move para `blog-imagens-publico`
5. URL publica definitiva gerada com `getPublicUrl()`
6. Registro atualizado na tabela `imagens_conteudo`

```
Geracao → Staging (privado) → Processamento → Publicacao (publico) → CDN
```

## Processamento de Imagens (Sharp)

| Etapa | Ferramenta | Detalhe |
|---|---|---|
| Conversao formato | Sharp | Converter para WebP |
| Compressao | Sharp | Qualidade 80-85% |
| Resize | Sharp | Gerar tamanhos: 1200px, 600px, 300px |
| Metadados | Sharp | Strip EXIF, adicionar metadados relevantes |

### Tamanhos gerados

| Nome | Largura | Uso |
|---|---|---|
| original | Tamanho real | Backup |
| desktop | 1200px | Blog desktop |
| mobile | 600px | Blog mobile |
| thumbnail | 300px | Cards, listagens |

## CDN e Cache

- Supabase Storage entrega via CDN (Cloudflare)
- Buckets publicos tem melhor cache hit
- Header `cf-cache-status` indica cache
- **Imagens publicadas**: cache longo (immutable quando possivel)
- **Imagens em staging**: cache curto ou acesso privado
- **Regra**: NUNCA sobrescrever asset publicado — criar nova versao no path

## Versionamento de Assets

### Estrutura por versao

```
artigo_{content_id}/
  v1/
    capa/
    inline/
  v2/
    capa/
    inline/
```

### Beneficios

- Rollback facil (versao anterior intacta)
- Cache previsivel (URL diferente por versao)
- Auditoria simples (historico visual)
- Nao quebra paginas ja indexadas

**Regra**: Cada versao editorial do conteudo (tabela `versoes_conteudo`) tem seus proprios assets. Nao misturar versoes.

## Tabelas Relacionadas

### `imagens_conteudo` — registro de cada imagem

```sql
CREATE TABLE imagens_conteudo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conteudo_id UUID NOT NULL REFERENCES conteudos(id),
  versao_conteudo_id UUID REFERENCES versoes_conteudo(id),
  organizacao_id UUID NOT NULL REFERENCES organizacoes(id),
  
  -- tipo e posicao
  tipo TEXT NOT NULL CHECK (tipo IN ('capa', 'explicativa', 'comparacao', 'diagrama', 'cta', 'galeria')),
  posicao TEXT NOT NULL CHECK (posicao IN ('hero', 'apos_intro', 'meio_artigo', 'antes_faq', 'final')),
  
  -- geracao
  prompt TEXT,
  modelo TEXT,
  provedor_geracao TEXT,
  
  -- arquivo
  url_imagem TEXT NOT NULL,
  nome_arquivo TEXT NOT NULL,
  tamanho_kb INTEGER,
  largura INTEGER,
  altura INTEGER,
  formato TEXT DEFAULT 'webp',
  
  -- SEO
  alt_text TEXT NOT NULL,
  legenda TEXT,
  foco_seo TEXT,
  
  -- controle
  status TEXT DEFAULT 'gerada' CHECK (status IN ('planejada', 'gerada', 'otimizada', 'publicada', 'falhou', 'arquivada')),
  versao INTEGER DEFAULT 1,
  
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_imagens_conteudo_id ON imagens_conteudo(conteudo_id);
CREATE INDEX idx_imagens_org ON imagens_conteudo(organizacao_id);
CREATE INDEX idx_imagens_tipo ON imagens_conteudo(tipo);
CREATE INDEX idx_imagens_status ON imagens_conteudo(status);
```

### `versoes_conteudo` — versionamento editorial

```sql
CREATE TABLE versoes_conteudo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conteudo_id UUID NOT NULL REFERENCES conteudos(id),
  numero_versao INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'rascunho',
  titulo TEXT,
  conteudo_markdown TEXT,
  conteudo_html TEXT,
  titulo_seo TEXT,
  meta_descricao TEXT,
  faq_json JSONB,
  schema_json JSONB,
  plano_visual_json JSONB,
  versao_contexto_id UUID REFERENCES contextos_negocio(id),
  criado_por TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  publicado_em TIMESTAMPTZ,
  substitui_versao_id UUID REFERENCES versoes_conteudo(id)
);

CREATE INDEX idx_versoes_conteudo_id ON versoes_conteudo(conteudo_id);
CREATE INDEX idx_versoes_status ON versoes_conteudo(status);
```

### `ponteiro_publicado` — qual versao esta ativa

```sql
CREATE TABLE ponteiro_publicado (
  conteudo_id UUID PRIMARY KEY REFERENCES conteudos(id),
  versao_ativa_id UUID NOT NULL REFERENCES versoes_conteudo(id),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);
```

### `derivados_imagem` — thumbnails e tamanhos alternativos (V2)

```sql
CREATE TABLE derivados_imagem (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  imagem_conteudo_id UUID NOT NULL REFERENCES imagens_conteudo(id),
  tipo_derivado TEXT NOT NULL, -- 'desktop', 'mobile', 'thumbnail'
  url_imagem TEXT NOT NULL,
  largura INTEGER,
  altura INTEGER,
  formato TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);
```

## Regras do Supabase Storage

- NAO mexer nas tabelas internas do schema `storage` diretamente
- Usar API para upload, copy, move, delete
- RLS nos buckets: org_id no path = acesso restrito por organizacao
- Signed URLs para preview de staging (expiracao: 1h)

## Seguranca

| Bucket | Acesso | RLS |
|---|---|---|
| blog-imagens-publico | Publico (leitura) | Upload: autenticado + org_id match |
| imagens-staging | Privado | Signed URL, org_id match |
| assets-marca | Privado | Autenticado + org_id match |

## Custos

| Item | Custo |
|---|---|
| Supabase Storage (free tier) | 1GB incluido |
| Supabase Storage (Pro) | $0.021/GB/mes |
| DALL-E 3 (1024x1024) | ~$0.04/imagem |
| Estimativa/artigo (2 imagens) | ~$0.08-0.12 |
| Estimativa/mes (30 artigos) | ~$2.40-3.60 geracao + storage minimo |

## Notas Relacionadas

- [[Agente Visual]]
- [[Regras de Imagem SEO + AIO]]
- [[Entidades e Schema]]
- [[Agente Publicador]]
- [[Estrutura de Codigo]]
- [[Integracoes Externas]]
