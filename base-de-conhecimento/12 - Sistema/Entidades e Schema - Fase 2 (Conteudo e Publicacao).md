---
tipo: sistema
area: Database
tags: [sistema, entidades, schema, banco, postgresql, supabase, fase-2, conteudo, publicacao, midia, metricas]
atualizado: 2026-04-23
---

# Entidades e Schema — Fase 2 (Conteudo, Publicacao, Midia, Metricas)

> Segunda fase do schema Supabase. Cobre o pipeline de producao de conteudo, midia, versionamento editorial e metricas de monitoramento.
>
> **Pre-requisito:** a Fase 1 ([[Entidades e Schema - Fase 1 (Onboarding)]]) precisa estar implementada — estas tabelas referenciam `organizacoes`, `projetos` e `contextos_negocio`.
>
> **Fonte canonica do produto:** [[VERDADE_UNICA_BUSCOU]] secao 4 (produto) — 90 conteudos/mes, 800-1.200 palavras cada, publicacao automatica.
>
> **Proximo arquivo:** [[Entidades e Schema - Fase 3 (Dados e Auditoria)]] — eventos do sistema, relacionamentos, indices, JSONB vs colunas.

---

## Bloco A — Pipeline de Conteudo (5 tabelas)

### palavras_chave

```sql
CREATE TABLE palavras_chave (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE,
  palavra TEXT NOT NULL,
  volume INTEGER,
  dificuldade INTEGER,
  intencao TEXT CHECK (intencao IN ('informacional', 'comercial', 'transacional', 'navegacional')),
  pontuacao_prioridade DECIMAL(4,2),
  url_alvo TEXT,
  localizacao_alvo TEXT,
  fonte TEXT,
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### briefings_conteudo

```sql
CREATE TABLE briefings_conteudo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE,
  palavra_chave_id UUID REFERENCES palavras_chave(id),
  titulo TEXT NOT NULL,
  angulo TEXT,
  briefing_json JSONB,
  status TEXT CHECK (status IN ('rascunho', 'pronto', 'em_uso', 'usado')) DEFAULT 'rascunho',
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### conteudos

```sql
CREATE TABLE conteudos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE,
  briefing_id UUID REFERENCES briefings_conteudo(id),
  titulo TEXT NOT NULL,
  slug TEXT,
  conteudo_markdown TEXT,
  conteudo_html TEXT,
  titulo_seo TEXT,
  meta_descricao TEXT,
  contagem_palavras INTEGER,
  pontuacao_seo DECIMAL(5,2),
  pontuacao_aio DECIMAL(5,2),
  status TEXT CHECK (status IN (
    'na_fila', 'pesquisando', 'escrevendo', 'revisando',
    'aprovado', 'revisao_necessaria', 'publicando',
    'publicado', 'monitorando'
  )) DEFAULT 'na_fila',
  url_publicada TEXT,
  publicado_em TIMESTAMPTZ,
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### execucoes_agentes

```sql
CREATE TABLE execucoes_agentes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  projeto_id UUID REFERENCES projetos(id),
  nome_agente TEXT NOT NULL,
  entrada_json JSONB,
  saida_json JSONB,
  status TEXT CHECK (status IN (
    'na_fila',           -- aguardando worker
    'atribuido',         -- worker pegou o job, ainda nao executa
    'executando',        -- execucao em curso
    'concluido',         -- sucesso
    'falhou',            -- exception ou timeout
    'tentando_novamente',-- auto-retry com backoff exponencial
    'morto',             -- max retries atingido (3), aguarda humano
    'cancelado'          -- cancelado manualmente antes de rodar
  )) DEFAULT 'na_fila',
  worker_id TEXT,
  iniciado_em TIMESTAMPTZ,
  concluido_em TIMESTAMPTZ,
  custo_estimado DECIMAL(10,4),
  mensagem_erro TEXT,
  tentativa INTEGER DEFAULT 1,
  max_tentativas INTEGER DEFAULT 3,
  criado_em TIMESTAMPTZ DEFAULT now()
);
```

Valores de `nome_agente` (V1): `estrategista`, `pesquisador`, `redator`, `revisor`, `publicador`, `distribuidor`, `monitor`, `visual`, `suporte`, `prospeccao`, `pagamento`. Ver [[Arquitetura de Agentes]].

**State machine completa:** ver [[Estados e Maquina de Estado]] secao "ExecucaoAgente".

### metricas_snapshots

```sql
CREATE TABLE metricas_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  projeto_id UUID REFERENCES projetos(id),
  data_snapshot DATE NOT NULL,
  impressoes INTEGER DEFAULT 0,
  cliques INTEGER DEFAULT 0,
  ctr DECIMAL(5,2),
  posicao_media DECIMAL(5,2),
  pontuacao_visibilidade_ia DECIMAL(5,2),
  leads_estimados INTEGER DEFAULT 0,
  criado_em TIMESTAMPTZ DEFAULT now()
);
```

---

## Bloco B — Monitoramento de IA (1 tabela)

### citacoes_ia

```sql
CREATE TABLE citacoes_ia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE,
  consulta TEXT NOT NULL,
  plataforma TEXT CHECK (plataforma IN ('chatgpt', 'perplexity', 'ai_overviews', 'gemini', 'claude')),
  citou BOOLEAN DEFAULT false,
  url_citada TEXT,
  concorrente_citado TEXT,
  testado_em TIMESTAMPTZ DEFAULT now()
);
```

Populada pelo [[Agente Monitor]] a partir de testes automatizados via Otterly, LLMrefs, AIclicks e verificacao manual de fallback.

---

## Bloco C — Midia e Versionamento (4 tabelas)

### imagens_conteudo

Registro de cada imagem associada a um conteudo. Gerada pelo [[Agente Visual]].

```sql
CREATE TABLE imagens_conteudo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conteudo_id UUID NOT NULL REFERENCES conteudos(id),
  versao_conteudo_id UUID REFERENCES versoes_conteudo(id),
  organizacao_id UUID NOT NULL REFERENCES organizacoes(id),

  tipo TEXT NOT NULL CHECK (tipo IN ('capa', 'explicativa', 'comparacao', 'diagrama', 'cta', 'galeria')),
  posicao TEXT NOT NULL CHECK (posicao IN ('hero', 'apos_intro', 'meio_artigo', 'antes_faq', 'final')),

  prompt TEXT,
  modelo TEXT,
  provedor_geracao TEXT,

  url_imagem TEXT NOT NULL,
  nome_arquivo TEXT NOT NULL,
  tamanho_kb INTEGER,
  largura INTEGER,
  altura INTEGER,
  formato TEXT DEFAULT 'webp',

  alt_text TEXT NOT NULL,
  legenda TEXT,
  foco_seo TEXT,

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

### versoes_conteudo

Versionamento editorial — cada versao e um snapshot completo de conteudo + imagens.

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

### ponteiro_publicado

Aponta para a versao ativa de cada conteudo. Permite rollback trocando o ponteiro.

```sql
CREATE TABLE ponteiro_publicado (
  conteudo_id UUID PRIMARY KEY REFERENCES conteudos(id),
  versao_ativa_id UUID NOT NULL REFERENCES versoes_conteudo(id),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);
```

### derivados_imagem

Thumbnails e tamanhos alternativos (V2+).

```sql
CREATE TABLE derivados_imagem (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  imagem_conteudo_id UUID NOT NULL REFERENCES imagens_conteudo(id),
  tipo_derivado TEXT NOT NULL CHECK (tipo_derivado IN ('desktop', 'mobile', 'thumbnail')),
  url_imagem TEXT NOT NULL,
  largura INTEGER,
  altura INTEGER,
  formato TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_derivados_imagem_id ON derivados_imagem(imagem_conteudo_id);
```

---

## Ordem de Implementacao (esta fase)

| Ordem | Tabelas | Quando |
|---|---|---|
| 1 | `palavras_chave`, `briefings_conteudo`, `conteudos`, `execucoes_agentes`, `metricas_snapshots` | V1 (mes 3-4) |
| 2 | `imagens_conteudo`, `versoes_conteudo`, `ponteiro_publicado` | V1.5 (mes 4-5) |
| 3 | `citacoes_ia` | V1.5 (junto com [[Agente Monitor]] em producao) |
| 4 | `derivados_imagem` | V2+ (quando thumbnails multi-formato forem necessarios) |

---

## Notas Relacionadas

- [[Entidades e Schema - Fase 1 (Onboarding)]] — identidade, pagamento, suporte (pre-requisito)
- [[Entidades e Schema - Fase 3 (Dados e Auditoria)]] — eventos, relacionamentos, indices
- [[Midia e Assets]] — Armazenamento e CDN de imagens
- [[Estados e Maquina de Estado]] — State machine do ciclo de vida de `conteudos` e `versoes_conteudo`
- [[Arquitetura de Agentes]] — Agentes que operam estas tabelas
- [[Agente Redator]] — escreve em `conteudos`
- [[Agente Publicador]] — publica e atualiza `ponteiro_publicado`
- [[Agente Monitor]] — popula `metricas_snapshots` e `citacoes_ia`
- [[Agente Visual]] — gera `imagens_conteudo`
