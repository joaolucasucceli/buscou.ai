-- ============================================================================
-- buscou.ai — Migration 002 — RLS Policies Multi-Tenant
-- ============================================================================
-- Habilita Row Level Security em todas as 10 tabelas da Fase 0 e cria policies
-- baseadas em `auth.jwt() ->> 'organizacao_id'`.
--
-- Padroes:
--   1. organizacoes — policy compara `id` ao claim do JWT
--   2. Tabelas com `organizacao_id` direto — policy padrao tenant_isolation
--   3. Tabelas filhas de `projetos` — policy resolve org via JOIN com projetos
--
-- Role `service_role` BYPASSA RLS por default no Supabase (usado por backend
-- e agent workers). Nao precisa policy extra.
--
-- Linear: BAI-18
-- ============================================================================

-- ============================================================================
-- 1. Habilitar RLS em todas as 10 tabelas
-- ============================================================================
ALTER TABLE organizacoes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfis_organizacao    ENABLE ROW LEVEL SECURITY;
ALTER TABLE localizacoes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicos              ENABLE ROW LEVEL SECURITY;
ALTER TABLE projetos              ENABLE ROW LEVEL SECURITY;
ALTER TABLE palavras_chave        ENABLE ROW LEVEL SECURITY;
ALTER TABLE briefings_conteudo    ENABLE ROW LEVEL SECURITY;
ALTER TABLE conteudos             ENABLE ROW LEVEL SECURITY;
ALTER TABLE execucoes_agentes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE metricas_snapshots    ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. Policy especial — `organizacoes` (compara `id`)
-- ============================================================================
CREATE POLICY "tenant_isolation" ON organizacoes
  FOR ALL
  TO authenticated
  USING (id::text = auth.jwt() ->> 'organizacao_id')
  WITH CHECK (id::text = auth.jwt() ->> 'organizacao_id');

-- ============================================================================
-- 3. Policies padrao — tabelas com `organizacao_id` direto (6 tabelas)
-- ============================================================================
CREATE POLICY "tenant_isolation" ON perfis_organizacao
  FOR ALL
  TO authenticated
  USING (organizacao_id::text = auth.jwt() ->> 'organizacao_id')
  WITH CHECK (organizacao_id::text = auth.jwt() ->> 'organizacao_id');

CREATE POLICY "tenant_isolation" ON localizacoes
  FOR ALL
  TO authenticated
  USING (organizacao_id::text = auth.jwt() ->> 'organizacao_id')
  WITH CHECK (organizacao_id::text = auth.jwt() ->> 'organizacao_id');

CREATE POLICY "tenant_isolation" ON servicos
  FOR ALL
  TO authenticated
  USING (organizacao_id::text = auth.jwt() ->> 'organizacao_id')
  WITH CHECK (organizacao_id::text = auth.jwt() ->> 'organizacao_id');

CREATE POLICY "tenant_isolation" ON projetos
  FOR ALL
  TO authenticated
  USING (organizacao_id::text = auth.jwt() ->> 'organizacao_id')
  WITH CHECK (organizacao_id::text = auth.jwt() ->> 'organizacao_id');

CREATE POLICY "tenant_isolation" ON execucoes_agentes
  FOR ALL
  TO authenticated
  USING (organizacao_id::text = auth.jwt() ->> 'organizacao_id')
  WITH CHECK (organizacao_id::text = auth.jwt() ->> 'organizacao_id');

CREATE POLICY "tenant_isolation" ON metricas_snapshots
  FOR ALL
  TO authenticated
  USING (organizacao_id::text = auth.jwt() ->> 'organizacao_id')
  WITH CHECK (organizacao_id::text = auth.jwt() ->> 'organizacao_id');

-- ============================================================================
-- 4. Policies via JOIN — tabelas filhas de `projetos` (3 tabelas)
-- ============================================================================
-- palavras_chave, briefings_conteudo, conteudos nao tem org_id direto.
-- Resolvem a org via JOIN com projetos.

CREATE POLICY "tenant_isolation_via_projeto" ON palavras_chave
  FOR ALL
  TO authenticated
  USING (projeto_id IN (
    SELECT id FROM projetos
    WHERE organizacao_id::text = auth.jwt() ->> 'organizacao_id'
  ))
  WITH CHECK (projeto_id IN (
    SELECT id FROM projetos
    WHERE organizacao_id::text = auth.jwt() ->> 'organizacao_id'
  ));

CREATE POLICY "tenant_isolation_via_projeto" ON briefings_conteudo
  FOR ALL
  TO authenticated
  USING (projeto_id IN (
    SELECT id FROM projetos
    WHERE organizacao_id::text = auth.jwt() ->> 'organizacao_id'
  ))
  WITH CHECK (projeto_id IN (
    SELECT id FROM projetos
    WHERE organizacao_id::text = auth.jwt() ->> 'organizacao_id'
  ));

CREATE POLICY "tenant_isolation_via_projeto" ON conteudos
  FOR ALL
  TO authenticated
  USING (projeto_id IN (
    SELECT id FROM projetos
    WHERE organizacao_id::text = auth.jwt() ->> 'organizacao_id'
  ))
  WITH CHECK (projeto_id IN (
    SELECT id FROM projetos
    WHERE organizacao_id::text = auth.jwt() ->> 'organizacao_id'
  ));

-- ============================================================================
-- Notas finais
-- ============================================================================
-- Role `service_role` BYPASSA RLS por default (usado pelo backend Next.js
-- Server Components/Route Handlers com SUPABASE_SERVICE_ROLE_KEY, e pelos
-- agent workers). Por isso nao precisamos de policy pra ele.
--
-- Role `anon` (nao autenticado): nenhuma policy criada, entao por default
-- nao consegue ler/escrever nada. Correto pra multi-tenant.
--
-- Claim `organizacao_id` no JWT: sera populado via Supabase Auth hook
-- (issue futura, quando dashboard cliente entrar).
