---
tipo: sistema
area: Database
tags: [sistema, entidades, schema, banco, postgresql, supabase]
atualizado: 2026-04-22
---

# Entidades e Schema do Banco de Dados

> Schema completo do Supabase em **portugues**. Multi-tenant desde o inicio. Tudo vinculado a `organizacoes`. 25 tabelas organizadas em 5 fases de implementacao.

---

## Fase 1 — Onboarding e Perfil (7 tabelas)

### organizacoes

```sql
CREATE TABLE organizacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plano TEXT CHECK (plano IN ('starter', 'growth', 'scale')) DEFAULT 'starter',
  status TEXT CHECK (status IN ('trial', 'ativo', 'inadimplente', 'pausado', 'cancelado', 'reativado')) DEFAULT 'trial',
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### perfis_organizacao

```sql
CREATE TABLE perfis_organizacao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  razao_social TEXT,
  nome_fantasia TEXT,
  site_url TEXT,
  whatsapp TEXT,
  instagram_url TEXT,
  categoria TEXT NOT NULL,
  subcategoria TEXT,
  descricao_curta TEXT,
  tom_de_voz TEXT CHECK (tom_de_voz IN ('formal', 'casual', 'tecnico', 'amigavel', 'neutro')) DEFAULT 'neutro',
  objetivo_principal TEXT,
  cta_principal TEXT DEFAULT 'WhatsApp',
  ticket_medio DECIMAL(10,2),
  modelo_atendimento TEXT CHECK (modelo_atendimento IN ('agendamento', 'orcamento', 'compra_direta', 'misto')),
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### localizacoes

```sql
CREATE TABLE localizacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  pais TEXT DEFAULT 'Brasil',
  estado TEXT NOT NULL,
  cidade TEXT NOT NULL,
  bairro TEXT,
  e_principal BOOLEAN DEFAULT false,
  atende_online BOOLEAN DEFAULT false,
  raio_atendimento_km INTEGER,
  criado_em TIMESTAMPTZ DEFAULT now()
);
```

### servicos

```sql
CREATE TABLE servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  e_principal BOOLEAN DEFAULT false,
  ticket_medio DECIMAL(10,2),
  pontuacao_prioridade INTEGER DEFAULT 5 CHECK (pontuacao_prioridade BETWEEN 1 AND 10),
  margem_estimada DECIMAL(5,2),
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### publico_alvo

```sql
CREATE TABLE publico_alvo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  nome_persona TEXT,
  dores TEXT[],
  resultados_desejados TEXT[],
  objecoes TEXT[],
  termos_de_busca TEXT[],
  observacoes TEXT,
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### diferenciais

```sql
CREATE TABLE diferenciais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  tipo TEXT CHECK (tipo IN ('diferencial', 'depoimento', 'caso', 'certificacao', 'estatistica', 'premio')),
  conteudo TEXT NOT NULL,
  url_fonte TEXT,
  verificado BOOLEAN DEFAULT false,
  criado_em TIMESTAMPTZ DEFAULT now()
);
```

### concorrentes

```sql
CREATE TABLE concorrentes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  site_url TEXT,
  cidade TEXT,
  observacoes TEXT,
  e_principal BOOLEAN DEFAULT false,
  criado_em TIMESTAMPTZ DEFAULT now()
);
```

---

## Fase 2 — Contexto e Operacao (5 tabelas)

### sessoes_onboarding

```sql
CREATE TABLE sessoes_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  etapa_atual INTEGER DEFAULT 1,
  etapas_completas INTEGER[] DEFAULT '{}',
  status TEXT CHECK (status IN ('em_andamento', 'completo', 'abandonado')) DEFAULT 'em_andamento',
  iniciado_em TIMESTAMPTZ DEFAULT now(),
  concluido_em TIMESTAMPTZ,
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### respostas_onboarding

```sql
CREATE TABLE respostas_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  chave_etapa TEXT NOT NULL,
  chave_campo TEXT NOT NULL,
  valor_json JSONB NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### contextos_negocio

O cerebro compartilhado. Ver [[Objeto Business Context]] para detalhes do JSON.

```sql
CREATE TABLE contextos_negocio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  versao INTEGER DEFAULT 1,
  contexto_json JSONB NOT NULL,
  gerado_por TEXT DEFAULT 'onboarding',
  criado_em TIMESTAMPTZ DEFAULT now()
);
```

### integracoes

```sql
CREATE TABLE integracoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  provedor TEXT NOT NULL,
  status TEXT CHECK (status IN ('conectado', 'desconectado', 'erro')) DEFAULT 'desconectado',
  conta_externa_id TEXT,
  conectado_em TIMESTAMPTZ,
  ultimo_sync TIMESTAMPTZ,
  metadados_json JSONB,
  criado_em TIMESTAMPTZ DEFAULT now()
);
```

Provedores: `google_analytics`, `search_console`, `tag_manager`, `google_business`, `stripe`, `whatsapp`, `calendario`

### projetos

```sql
CREATE TABLE projetos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cidade_alvo TEXT,
  servico_alvo TEXT,
  status TEXT CHECK (status IN ('configurando', 'ativo', 'pausado', 'concluido')) DEFAULT 'configurando',
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

---

## Fase 3 — Pipeline de Conteudo (5 tabelas)

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
  status TEXT CHECK (status IN ('na_fila', 'executando', 'concluido', 'falhou', 'tentando_novamente')) DEFAULT 'na_fila',
  iniciado_em TIMESTAMPTZ,
  concluido_em TIMESTAMPTZ,
  custo_estimado DECIMAL(10,4),
  mensagem_erro TEXT,
  tentativa INTEGER DEFAULT 1,
  criado_em TIMESTAMPTZ DEFAULT now()
);
```

Valores de `nome_agente`: `estrategista`, `pesquisador`, `redator`, `revisor`, `publicador`, `distribuidor`, `monitor`, `sdr`, `suporte`, `cobranca`

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

## Fase 4 — Billing e Suporte (4 tabelas)

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

### assinaturas

```sql
CREATE TABLE assinaturas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  stripe_cliente_id TEXT,
  stripe_assinatura_id TEXT,
  status TEXT CHECK (status IN ('ativa', 'inadimplente', 'cancelada', 'pausada', 'trial')) DEFAULT 'trial',
  periodo_inicio TIMESTAMPTZ,
  periodo_fim TIMESTAMPTZ,
  cancelar_no_fim_periodo BOOLEAN DEFAULT false,
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### conversas_suporte

```sql
CREATE TABLE conversas_suporte (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  canal TEXT CHECK (canal IN ('chat', 'whatsapp', 'email')) DEFAULT 'chat',
  status TEXT CHECK (status IN ('aberta', 'em_andamento', 'resolvida', 'escalonada')) DEFAULT 'aberta',
  aberta_em TIMESTAMPTZ DEFAULT now(),
  fechada_em TIMESTAMPTZ,
  escalonada_para_humano BOOLEAN DEFAULT false
);
```

### mensagens_suporte

```sql
CREATE TABLE mensagens_suporte (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversa_id UUID REFERENCES conversas_suporte(id) ON DELETE CASCADE,
  tipo_remetente TEXT CHECK (tipo_remetente IN ('cliente', 'agente_ia', 'humano')) NOT NULL,
  texto_mensagem TEXT NOT NULL,
  metadados_json JSONB,
  criado_em TIMESTAMPTZ DEFAULT now()
);
```

---

## Relacionamentos

```
organizacoes
├── perfis_organizacao (1:1)
├── localizacoes (1:N)
├── servicos (1:N)
├── publico_alvo (1:N)
├── diferenciais (1:N)
├── concorrentes (1:N)
├── sessoes_onboarding (1:N)
├── respostas_onboarding (1:N)
├── contextos_negocio (1:N — versionado)
├── integracoes (1:N)
├── projetos (1:N)
│   ├── palavras_chave (1:N)
│   ├── briefings_conteudo (1:N)
│   │   └── conteudos (1:1)
│   ├── metricas_snapshots (1:N)
│   └── citacoes_ia (1:N)
├── execucoes_agentes (1:N)
├── assinaturas (1:N)
└── conversas_suporte (1:N)
    └── mensagens_suporte (1:N)
```

---

## Indices Recomendados

```sql
-- Busca por organizacao (multi-tenant)
CREATE INDEX idx_projetos_org ON projetos(organizacao_id);
CREATE INDEX idx_conteudos_projeto ON conteudos(projeto_id);
CREATE INDEX idx_conteudos_status ON conteudos(status);
CREATE INDEX idx_palavras_chave_projeto ON palavras_chave(projeto_id);
CREATE INDEX idx_execucoes_org ON execucoes_agentes(organizacao_id);
CREATE INDEX idx_execucoes_status ON execucoes_agentes(status);
CREATE INDEX idx_citacoes_projeto ON citacoes_ia(projeto_id);
CREATE INDEX idx_metricas_projeto_data ON metricas_snapshots(projeto_id, data_snapshot);
CREATE INDEX idx_contextos_org_versao ON contextos_negocio(organizacao_id, versao DESC);
CREATE INDEX idx_assinaturas_org ON assinaturas(organizacao_id);
CREATE INDEX idx_conversas_org ON conversas_suporte(organizacao_id);

-- Busca por GIN para JSONB
CREATE INDEX idx_contexto_json ON contextos_negocio USING GIN(contexto_json);
CREATE INDEX idx_briefing_json ON briefings_conteudo USING GIN(briefing_json);
```

---

## Quando Usar JSONB vs Colunas Estruturadas

| Usar JSONB quando | Usar colunas quando |
|---|---|
| Formato pode mudar muito | Formato e estavel e previsivel |
| Dados sao "bolsa" de informacao | Precisa filtrar/ordenar por esse campo |
| Nao precisa de FK | Precisa de relacionamento com outra tabela |
| E input/output de agente | E metrica que precisa de agregacao |

**JSONB neste schema**:
- `contextos_negocio.contexto_json` — flexivel, agentes leem inteiro
- `respostas_onboarding.valor_json` — respostas brutas de formato variado
- `briefings_conteudo.briefing_json` — briefing pode ter estruturas diferentes
- `execucoes_agentes.entrada_json / saida_json` — cada agente tem I/O diferente
- `integracoes.metadados_json` — metadados especificos por provedor
- `mensagens_suporte.metadados_json` — dados extras por mensagem

---

## Eventos do Sistema (Event-Driven)

Eventos sao o que transforma o banco de dados em automacao real. Cada evento dispara uma acao automatica via [[Orquestrador]].

```sql
CREATE TABLE eventos_sistema (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id),
  tipo_evento TEXT NOT NULL,
  dados_json JSONB,
  processado BOOLEAN DEFAULT false,
  criado_em TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_eventos_tipo ON eventos_sistema(tipo_evento);
CREATE INDEX idx_eventos_pendentes ON eventos_sistema(processado) WHERE processado = false;
```

### Catalogo de Eventos

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `onboarding_concluido` | Cliente finaliza wizard | Gerar business_context + rodar Estrategista |
| `contexto_gerado` | Business context v1 criado | Criar projeto + gerar keywords |
| `estrategia_criada` | Estrategista conclui | Criar briefings + agendar conteudos |
| `briefing_criado` | Pesquisador conclui | Disparar Redator |
| `conteudo_escrito` | Redator conclui | Disparar Revisor |
| `conteudo_aprovado` | Revisor aprova | Disparar Publicador |
| `conteudo_rejeitado` | Revisor rejeita | Reenviar para Redator com feedback |
| `conteudo_publicado` | Publicador conclui | Disparar Distribuidor + submeter GSC |
| `conteudo_distribuido` | Distribuidor conclui | Log + atualizar dashboard |
| `metricas_atualizadas` | Monitor coleta dados | Atualizar snapshots + verificar alertas |
| `ranking_caiu` | Monitor detecta queda >= 5 pos | Disparar re-otimizacao (Redator) |
| `citacao_ia_detectada` | Monitor detecta nova citacao | Notificar cliente + atualizar IVT |
| `citacao_ia_perdida` | Monitor detecta perda | Disparar analise (Pesquisador) |
| `assinatura_criada` | Stripe webhook | Criar organizacao + disparar onboarding |
| `pagamento_falhou` | Stripe webhook | Disparar Agente Cobranca |
| `pagamento_recuperado` | Stripe webhook | Reativar servico |
| `suporte_escalonado` | Agente Suporte nao resolve | Notificar humano |
| `relatorio_pendente` | Cron mensal | Gerar e enviar relatorio |

### Como Funciona

```
Evento criado → eventos_sistema (processado=false)
    ↓
Orquestrador poll a cada 5s (ou via Supabase Realtime)
    ↓
Identifica tipo → despacha para agente correto
    ↓
Marca processado=true
```

Detalhes em [[Eventos e Gatilhos]].

---

## Ordem de Implementacao

| Fase | Tabelas | Quando |
|---|---|---|
| **1** | organizacoes, perfis_organizacao, localizacoes, servicos, publico_alvo, diferenciais, concorrentes | MVP (mes 1) |
| **2** | sessoes_onboarding, respostas_onboarding, contextos_negocio, integracoes, projetos | MVP (mes 1-2) |
| **3** | palavras_chave, briefings_conteudo, conteudos, execucoes_agentes, metricas_snapshots | V1 (mes 3-4) |
| **4** | citacoes_ia, assinaturas, conversas_suporte, mensagens_suporte | V2 (mes 5-8) |

---

## Fase 5 — Midia e Versionamento (4 tabelas)

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

## Ordem de Implementacao (Atualizada)

| Fase | Tabelas | Quando |
|---|---|---|
| **1** | organizacoes, perfis_organizacao, localizacoes, servicos, publico_alvo, diferenciais, concorrentes | Semana 1 |
| **2** | sessoes_onboarding, respostas_onboarding, contextos_negocio, integracoes, projetos | Semana 2 |
| **3** | palavras_chave, briefings_conteudo, conteudos, execucoes_agentes, metricas_snapshots | V1 (mes 3-4) |
| **4** | citacoes_ia, assinaturas, conversas_suporte, mensagens_suporte | V2 (mes 5-8) |
| **5** | imagens_conteudo, versoes_conteudo, ponteiro_publicado, derivados_imagem | V1.5 (mes 4-5) |

---

## Notas Relacionadas

- [[Objeto Business Context]] — JSON central gerado a partir destas tabelas
- [[Midia e Assets]] — Armazenamento e CDN de imagens
- [[Estados e Maquina de Estado]] — State machines para conteudos, agentes, organizacoes
- [[Permissoes e Roles]] — RLS policies para cada tabela
- [[Modulos]] — Modulos do sistema que usam cada tabela
- [[Onboarding Automatico]] — Wizard que popula as tabelas da Fase 1
- [[Inputs dos Agentes]] — Como os agentes leem os dados
