---
tipo: sistema
area: Database
tags: [sistema, entidades, schema, banco, postgresql, supabase, fase-1, onboarding, pagamento, suporte]
atualizado: 2026-04-23
---

# Entidades e Schema — Fase 1 (Onboarding, Perfil, Pagamento, Suporte)

> Primeira fase do schema Supabase. Cobre identidade do cliente, contexto de negocio, pagamentos e suporte. Multi-tenant desde o inicio: tudo vinculado a `organizacoes`.
>
> **Modelo comercial (ver [[VERDADE_UNICA_BUSCOU]] secao 5 e [[Decision Log - 2026-04-23 - Infra Mensal]]):** dois fluxos de pagamento — (1) **implementacao** (one-time a vista OU parcelada 12x) + (2) **infra mensal** (subscription recorrente R$ 300/mes a partir do mes 2). Duas tabelas separadas, dois fluxos separados de webhooks e state machines.
>
> **Proximos arquivos:** [[Entidades e Schema - Fase 2 (Conteudo e Publicacao)]] — tabelas do pipeline de conteudo e midia. [[Entidades e Schema - Fase 3 (Dados e Auditoria)]] — eventos, relacionamentos, indices, meta-info.

---

## Bloco A — Identidade e Perfil (7 tabelas)

### organizacoes

```sql
CREATE TABLE organizacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN (
    'pending_payment',       -- aguardando pagamento da implementacao
    'implementing',          -- implementacao em andamento (≤7d)
    'live_free_period',      -- mes 1: motor ativo, infra incluida na implementacao
    'live_active',           -- mes 2+: motor ativo, infra mensal sendo cobrada
    'motor_paused',          -- infra inadimplente (3 falhas) ou cancelada
    'refunded',              -- reembolso nos primeiros 14 dias
    'archived'               -- inativa por 6+ meses em motor_paused
  )) DEFAULT 'pending_payment',
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

**Nao ha coluna `plano`** — nao existem tiers na oferta. Nao ha status `trial` — nao existe periodo de teste; mes 1 e "free period" incluso na implementacao, nao trial.

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

## Bloco B — Contexto e Operacao (5 tabelas)

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

Provedores: `google_analytics`, `search_console`, `tag_manager`, `google_business`, `stripe`, `asaas`, `whatsapp`, `calendario`

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

## Bloco C — Pagamentos (4 tabelas)

### compras (implementacao — one-time ou 12 parcelas)

```sql
CREATE TABLE compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  gateway TEXT CHECK (gateway IN ('stripe', 'asaas')) NOT NULL,
  gateway_customer_id TEXT NOT NULL,
  gateway_checkout_session_id TEXT,              -- id do checkout da implementacao
  metodo TEXT CHECK (metodo IN ('a_vista', 'parcelado_12x')) NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,            -- 2500 a vista, 3000 parcelado
  status TEXT CHECK (status IN (
    'pending_payment',
    'paid_in_full',         -- a vista confirmado OU todas as 12 parcelas quitadas
    'paid_partial',         -- parcelado em curso (1-11 parcelas pagas)
    'refunded',
    'chargeback'
  )) DEFAULT 'pending_payment',
  comprada_em TIMESTAMPTZ DEFAULT now(),
  quitada_em TIMESTAMPTZ,                        -- preenchido quando status vira paid_in_full
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### parcelas_implementacao (1-12 parcelas quando metodo = parcelado_12x)

```sql
CREATE TABLE parcelas_implementacao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  compra_id UUID REFERENCES compras(id) ON DELETE CASCADE,
  numero INTEGER NOT NULL CHECK (numero BETWEEN 1 AND 12),
  valor DECIMAL(10,2) NOT NULL,                  -- tipicamente 250.00
  data_vencimento DATE NOT NULL,
  data_pagamento TIMESTAMPTZ,
  status TEXT CHECK (status IN ('scheduled', 'paid', 'failed', 'recovered')) DEFAULT 'scheduled',
  gateway_invoice_id TEXT,
  tentativas_retry INTEGER DEFAULT 0,
  atualizado_em TIMESTAMPTZ DEFAULT now(),
  UNIQUE (compra_id, numero)
);
```

### assinaturas_infra (infra mensal — R$ 300/mes a partir do mes 2)

```sql
CREATE TABLE assinaturas_infra (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
  gateway_subscription_id TEXT,                 -- id da subscription no gateway
  valor DECIMAL(10,2) NOT NULL DEFAULT 300.00,
  dia_cobranca INTEGER CHECK (dia_cobranca BETWEEN 1 AND 28) NOT NULL,
  status TEXT CHECK (status IN (
    'pending_start',    -- mes 1 (cliente ainda nao paga infra)
    'active',           -- mes 2+ cobrando normalmente
    'overdue',          -- falha de cobranca, smart retry em curso
    'paused_motor',     -- 3 falhas consecutivas — motor pausado
    'cancelled'         -- cliente cancelou explicitamente
  )) DEFAULT 'pending_start',
  ativacao_agendada_em TIMESTAMPTZ NOT NULL,    -- sempre D+30 apos compra
  ativado_em TIMESTAMPTZ,
  pausado_em TIMESTAMPTZ,
  cancelado_em TIMESTAMPTZ,
  falhas_consecutivas INTEGER DEFAULT 0,
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
```

### tentativas_cobranca (historico de cada tentativa de cobranca — parcela OU infra)

```sql
CREATE TABLE tentativas_cobranca (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT CHECK (tipo IN ('parcela_implementacao', 'infra_mensal')) NOT NULL,
  parcela_id UUID REFERENCES parcelas_implementacao(id) ON DELETE CASCADE,
  assinatura_infra_id UUID REFERENCES assinaturas_infra(id) ON DELETE CASCADE,
  numero_tentativa INTEGER NOT NULL,           -- 1, 2 ou 3
  tentada_em TIMESTAMPTZ DEFAULT now(),
  sucesso BOOLEAN NOT NULL,
  codigo_erro TEXT,                              -- card_declined, insufficient_funds, etc
  CHECK ((parcela_id IS NOT NULL AND assinatura_infra_id IS NULL)
     OR (parcela_id IS NULL AND assinatura_infra_id IS NOT NULL))
);
```

**Nao ha tabela `assinaturas` generica** — substituida por `compras` (implementacao) + `assinaturas_infra` (infra mensal). Status `trial`, `cancelar_no_fim_periodo` e conceitos de "plan_upgraded/downgraded" **nao existem** neste modelo.

---

## Bloco D — Suporte (2 tabelas)

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

## Ordem de Implementacao (esta fase)

| Ordem | Tabelas | Quando |
|---|---|---|
| 1 | `organizacoes`, `perfis_organizacao`, `localizacoes`, `servicos`, `publico_alvo`, `diferenciais`, `concorrentes` | Semana 1 |
| 2 | `sessoes_onboarding`, `respostas_onboarding`, `contextos_negocio`, `integracoes`, `projetos` | Semana 2 |
| 3 | `compras`, `parcelas_implementacao`, `assinaturas_infra`, `tentativas_cobranca` | Semana 3 (antes do primeiro checkout real) |
| 4 | `conversas_suporte`, `mensagens_suporte` | Semana 4 (quando [[Agente Suporte]] entrar em operacao) |

---

## Notas Relacionadas

- [[Entidades e Schema - Fase 2 (Conteudo e Publicacao)]] — pipeline, conteudos, midia, metricas
- [[Entidades e Schema - Fase 3 (Dados e Auditoria)]] — eventos, relacionamentos, indices, JSONB
- [[Objeto Business Context]] — JSON central gerado a partir destas tabelas
- [[Onboarding Automatico]] — Wizard que popula as tabelas do Bloco A e B
- [[Estados e Maquina de Estado]] — State machines para organizacao, compra, assinatura_infra
- [[Permissoes e Roles]] — RLS policies para cada tabela
- [[Modulos]] — Modulos do sistema que usam cada tabela
- [[Inputs dos Agentes]] — Como os agentes leem os dados
- [[Agente Pagamento]] — Agente que opera `compras`, `parcelas_implementacao`, `assinaturas_infra`, `tentativas_cobranca`
- [[Agente Suporte]] — Agente que opera `conversas_suporte`, `mensagens_suporte`
