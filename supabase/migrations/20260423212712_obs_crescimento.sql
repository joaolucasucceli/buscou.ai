-- ============================================================================
-- buscou.ai — Migration 004 — Observabilidade e Crescimento MVP-safe
-- ============================================================================
-- 7 alteracoes em 6 tabelas existentes + 1 VIEW nova.
-- Zero tabela nova. Zero breaking change (ADD COLUMN IF NOT EXISTS + nullable).
--
-- Objetivos:
--   1. Tokens LLM decompostos (observabilidade de custo)
--   2. Idempotencia em agentes (retry seguro sem duplicar linha)
--   3. Metricas por artigo (nao so por projeto)
--   4. VIEW saude agentes 24h (dashboard operacional 1-SELECT)
--   5. criado_por em 4 tabelas (auditoria de autoria)
--   6. Soft delete em org/projetos/conteudos (undo de delete acidental)
--   7. CHECK nome_agente (consistencia com 12 agentes V1 da VERDADE_UNICA)
--
-- Ordem obrigatoria: ADD COLUMN (excluido_em) → DROP POLICY → CREATE POLICY.
-- Inverter quebra porque policy nova referencia coluna que nao existe.
--
-- Linear: BAI-20
-- ============================================================================

-- ============================================================================
-- 1. execucoes_agentes — 6 colunas + CHECK nome_agente + UNIQUE idempotencia
-- ============================================================================
ALTER TABLE execucoes_agentes
  ADD COLUMN IF NOT EXISTS tokens_input INTEGER,
  ADD COLUMN IF NOT EXISTS tokens_output INTEGER,
  ADD COLUMN IF NOT EXISTS tokens_cached INTEGER,
  ADD COLUMN IF NOT EXISTS modelo_llm TEXT,
  ADD COLUMN IF NOT EXISTS chave_idempotencia TEXT,
  ADD COLUMN IF NOT EXISTS criado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- CHECK restringindo nome_agente aos 12 agentes V1 da VERDADE_UNICA
ALTER TABLE execucoes_agentes
  DROP CONSTRAINT IF EXISTS chk_nome_agente;
ALTER TABLE execucoes_agentes
  ADD CONSTRAINT chk_nome_agente CHECK (nome_agente IN (
    'pesquisador', 'estrategista', 'redator', 'revisor', 'publicador', 'monitor',
    'visual', 'distribuidor', 'suporte', 'prospeccao', 'pagamento', 'orquestrador'
  ));

-- UNIQUE partial em chave_idempotencia: permite NULL, unico quando preenchido.
-- Assim da pra usar ON CONFLICT (chave_idempotencia) DO UPDATE em retry.
CREATE UNIQUE INDEX IF NOT EXISTS idx_execucoes_chave_idempotencia
  ON execucoes_agentes(chave_idempotencia) WHERE chave_idempotencia IS NOT NULL;

-- ============================================================================
-- 2. metricas_snapshots — conteudo_id + ajuste UNIQUE + index
-- ============================================================================
ALTER TABLE metricas_snapshots
  ADD COLUMN IF NOT EXISTS conteudo_id UUID REFERENCES conteudos(id) ON DELETE CASCADE;

-- UNIQUE antigo (projeto_id, data_snapshot) → (projeto_id, conteudo_id, data_snapshot).
-- Permite no mesmo dia: 1 linha agregada do projeto (conteudo_id NULL) + N por artigo.
DROP INDEX IF EXISTS idx_metricas_unique_dia_projeto;
CREATE UNIQUE INDEX IF NOT EXISTS idx_metricas_unique_dia_projeto_conteudo
  ON metricas_snapshots(projeto_id, conteudo_id, data_snapshot);

CREATE INDEX IF NOT EXISTS idx_metricas_conteudo_id
  ON metricas_snapshots(conteudo_id) WHERE conteudo_id IS NOT NULL;

-- ============================================================================
-- 3. projetos — criado_por + excluido_em + index partial + RLS ajustada
-- ============================================================================
ALTER TABLE projetos
  ADD COLUMN IF NOT EXISTS criado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS excluido_em TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_projetos_org_ativos
  ON projetos(organizacao_id) WHERE excluido_em IS NULL;

-- RLS: DROP + CREATE com AND excluido_em IS NULL
DROP POLICY IF EXISTS "tenant_isolation" ON projetos;
CREATE POLICY "tenant_isolation" ON projetos
  FOR ALL
  TO authenticated
  USING (
    organizacao_id::text = auth.jwt() ->> 'organizacao_id'
    AND excluido_em IS NULL
  )
  WITH CHECK (
    organizacao_id::text = auth.jwt() ->> 'organizacao_id'
    AND excluido_em IS NULL
  );

-- ============================================================================
-- 4. briefings_conteudo — criado_por
-- ============================================================================
-- RLS inalterada (policy via projeto_id ja herda filtro de excluido_em do pai)
ALTER TABLE briefings_conteudo
  ADD COLUMN IF NOT EXISTS criado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- ============================================================================
-- 5. conteudos — criado_por + excluido_em + index partial + RLS ajustada
-- ============================================================================
ALTER TABLE conteudos
  ADD COLUMN IF NOT EXISTS criado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS excluido_em TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_conteudos_projeto_ativos
  ON conteudos(projeto_id) WHERE excluido_em IS NULL;

-- RLS: DROP + CREATE com AND conteudos.excluido_em IS NULL
DROP POLICY IF EXISTS "tenant_isolation_via_projeto" ON conteudos;
CREATE POLICY "tenant_isolation_via_projeto" ON conteudos
  FOR ALL
  TO authenticated
  USING (
    projeto_id IN (
      SELECT id FROM projetos
      WHERE organizacao_id::text = auth.jwt() ->> 'organizacao_id'
    )
    AND excluido_em IS NULL
  )
  WITH CHECK (
    projeto_id IN (
      SELECT id FROM projetos
      WHERE organizacao_id::text = auth.jwt() ->> 'organizacao_id'
    )
    AND excluido_em IS NULL
  );

-- ============================================================================
-- 6. organizacoes — excluido_em + index partial + RLS ajustada
-- ============================================================================
ALTER TABLE organizacoes
  ADD COLUMN IF NOT EXISTS excluido_em TIMESTAMPTZ;

-- Index partial (nao-unique): acelera lookup por slug entre orgs ativas.
-- A UNIQUE constraint global em slug (organizacoes_slug_key) fica preservada.
CREATE INDEX IF NOT EXISTS idx_organizacoes_slug_ativas
  ON organizacoes(slug) WHERE excluido_em IS NULL;

-- RLS: DROP + CREATE com AND excluido_em IS NULL.
-- Cliente de org soft-deletada perde acesso imediatamente.
DROP POLICY IF EXISTS "tenant_isolation" ON organizacoes;
CREATE POLICY "tenant_isolation" ON organizacoes
  FOR ALL
  TO authenticated
  USING (
    id::text = auth.jwt() ->> 'organizacao_id'
    AND excluido_em IS NULL
  )
  WITH CHECK (
    id::text = auth.jwt() ->> 'organizacao_id'
    AND excluido_em IS NULL
  );

-- ============================================================================
-- 7. VIEW v_agentes_saude_24h — dashboard operacional 1-SELECT
-- ============================================================================
-- security_invoker=true: VIEW executa com permissoes/RLS do usuario que consulta,
-- nao do criador. Sem isso, Supabase flaga security_definer_view ERROR (default
-- do Postgres bypassa RLS em VIEWs).
CREATE OR REPLACE VIEW v_agentes_saude_24h
WITH (security_invoker = true) AS
SELECT
  nome_agente,
  COUNT(*) AS total_execucoes,
  COUNT(*) FILTER (WHERE status = 'concluido') AS sucessos,
  COUNT(*) FILTER (WHERE status = 'falhou') AS falhas,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE status = 'concluido') / NULLIF(COUNT(*), 0),
    2
  ) AS taxa_sucesso_pct,
  AVG(EXTRACT(EPOCH FROM (concluido_em - iniciado_em))) AS duracao_media_seg,
  SUM(custo_estimado) AS custo_total_usd
FROM execucoes_agentes
WHERE criado_em > now() - interval '24 hours'
GROUP BY nome_agente;

COMMENT ON VIEW v_agentes_saude_24h IS
  'Dashboard de saude dos 12 agentes V1 nas ultimas 24h. Zero storage (e VIEW).';
