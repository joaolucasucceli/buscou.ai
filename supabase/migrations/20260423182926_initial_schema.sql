-- ============================================================================
-- buscou.ai — Migration 001 — Schema Fase 0 (10 tabelas)
-- ============================================================================
-- Multi-tenant desde o dia 1 via `organizacao_id`. Alinhado com VERDADE_UNICA:
--   - SEM campo `plano` (sem tiers)
--   - SEM valor `trial` no status (venda unica, nao trial)
--   - SEM tabela `assinaturas` (modelo e pagamento unico, nao recorrente)
--
-- Referencia: base-de-conhecimento/12 - Sistema/Entidades e Schema.md
-- Linear: BAI-17
-- ============================================================================

-- Extension pra gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- Helper: trigger que atualiza automaticamente `atualizado_em` em UPDATE
-- ============================================================================
CREATE OR REPLACE FUNCTION update_atualizado_em_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. organizacoes — tenant root
-- ============================================================================
-- SEM campo `plano` (VERDADE_UNICA: sem tiers)
-- status SEM valor `trial` (VERDADE_UNICA: venda unica)
CREATE TABLE organizacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN ('ativo', 'pausado', 'cancelado')) DEFAULT 'ativo',
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
CREATE TRIGGER trg_organizacoes_atualizado_em
  BEFORE UPDATE ON organizacoes
  FOR EACH ROW EXECUTE FUNCTION update_atualizado_em_column();

-- ============================================================================
-- 2. perfis_organizacao — identidade do negocio (1:1)
-- ============================================================================
CREATE TABLE perfis_organizacao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE UNIQUE NOT NULL,
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
CREATE INDEX idx_perfis_org_id ON perfis_organizacao(organizacao_id);
CREATE TRIGGER trg_perfis_atualizado_em
  BEFORE UPDATE ON perfis_organizacao
  FOR EACH ROW EXECUTE FUNCTION update_atualizado_em_column();

-- ============================================================================
-- 3. localizacoes — onde atende
-- ============================================================================
CREATE TABLE localizacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE NOT NULL,
  pais TEXT DEFAULT 'Brasil',
  estado TEXT NOT NULL,
  cidade TEXT NOT NULL,
  bairro TEXT,
  e_principal BOOLEAN DEFAULT false,
  atende_online BOOLEAN DEFAULT false,
  raio_atendimento_km INTEGER,
  criado_em TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_localizacoes_org_id ON localizacoes(organizacao_id);

-- ============================================================================
-- 4. servicos — catalogo do cliente
-- ============================================================================
CREATE TABLE servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  e_principal BOOLEAN DEFAULT false,
  ticket_medio DECIMAL(10,2),
  pontuacao_prioridade INTEGER DEFAULT 5 CHECK (pontuacao_prioridade BETWEEN 1 AND 10),
  margem_estimada DECIMAL(5,2),
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_servicos_org_id ON servicos(organizacao_id);
CREATE TRIGGER trg_servicos_atualizado_em
  BEFORE UPDATE ON servicos
  FOR EACH ROW EXECUTE FUNCTION update_atualizado_em_column();

-- ============================================================================
-- 5. projetos — ciclo de conteudo
-- ============================================================================
CREATE TABLE projetos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  cidade_alvo TEXT,
  servico_alvo TEXT,
  status TEXT CHECK (status IN ('configurando', 'ativo', 'pausado', 'concluido')) DEFAULT 'configurando',
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_projetos_org_id ON projetos(organizacao_id);
CREATE INDEX idx_projetos_status ON projetos(status);
CREATE TRIGGER trg_projetos_atualizado_em
  BEFORE UPDATE ON projetos
  FOR EACH ROW EXECUTE FUNCTION update_atualizado_em_column();

-- ============================================================================
-- 6. palavras_chave — keywords-alvo
-- ============================================================================
CREATE TABLE palavras_chave (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE NOT NULL,
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
CREATE INDEX idx_palavras_chave_projeto_id ON palavras_chave(projeto_id);
CREATE INDEX idx_palavras_chave_intencao ON palavras_chave(intencao);
CREATE TRIGGER trg_palavras_chave_atualizado_em
  BEFORE UPDATE ON palavras_chave
  FOR EACH ROW EXECUTE FUNCTION update_atualizado_em_column();

-- ============================================================================
-- 7. briefings_conteudo — spec antes de escrever
-- ============================================================================
CREATE TABLE briefings_conteudo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE NOT NULL,
  palavra_chave_id UUID REFERENCES palavras_chave(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  angulo TEXT,
  briefing_json JSONB,
  status TEXT CHECK (status IN ('rascunho', 'pronto', 'em_uso', 'usado')) DEFAULT 'rascunho',
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_briefings_projeto_id ON briefings_conteudo(projeto_id);
CREATE INDEX idx_briefings_palavra_chave_id ON briefings_conteudo(palavra_chave_id);
CREATE INDEX idx_briefings_status ON briefings_conteudo(status);
CREATE TRIGGER trg_briefings_atualizado_em
  BEFORE UPDATE ON briefings_conteudo
  FOR EACH ROW EXECUTE FUNCTION update_atualizado_em_column();

-- ============================================================================
-- 8. conteudos — artigo publicavel (entidade central)
-- ============================================================================
-- State machine: na_fila -> pesquisando -> escrevendo -> revisando
--                -> aprovado OR revisao_necessaria -> publicando -> publicado -> monitorando
CREATE TABLE conteudos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE NOT NULL,
  briefing_id UUID REFERENCES briefings_conteudo(id) ON DELETE SET NULL,
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
-- Slug unico por projeto (nao globalmente) pra permitir mesmo slug em blogs diferentes
CREATE UNIQUE INDEX idx_conteudos_projeto_slug ON conteudos(projeto_id, slug) WHERE slug IS NOT NULL;
CREATE INDEX idx_conteudos_projeto_id ON conteudos(projeto_id);
CREATE INDEX idx_conteudos_briefing_id ON conteudos(briefing_id);
CREATE INDEX idx_conteudos_status ON conteudos(status);
CREATE INDEX idx_conteudos_publicado_em ON conteudos(publicado_em) WHERE publicado_em IS NOT NULL;
CREATE TRIGGER trg_conteudos_atualizado_em
  BEFORE UPDATE ON conteudos
  FOR EACH ROW EXECUTE FUNCTION update_atualizado_em_column();

-- ============================================================================
-- 9. execucoes_agentes — log de cada run de agente
-- ============================================================================
CREATE TABLE execucoes_agentes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE NOT NULL,
  projeto_id UUID REFERENCES projetos(id) ON DELETE SET NULL,
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
CREATE INDEX idx_execucoes_org_id ON execucoes_agentes(organizacao_id);
CREATE INDEX idx_execucoes_projeto_id ON execucoes_agentes(projeto_id);
CREATE INDEX idx_execucoes_status ON execucoes_agentes(status);
CREATE INDEX idx_execucoes_nome_agente ON execucoes_agentes(nome_agente);

-- ============================================================================
-- 10. metricas_snapshots — snapshot diario de performance
-- ============================================================================
CREATE TABLE metricas_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE NOT NULL,
  projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE,
  data_snapshot DATE NOT NULL,
  impressoes INTEGER DEFAULT 0,
  cliques INTEGER DEFAULT 0,
  ctr DECIMAL(5,2),
  posicao_media DECIMAL(5,2),
  pontuacao_visibilidade_ia DECIMAL(5,2),
  leads_estimados INTEGER DEFAULT 0,
  criado_em TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_metricas_org_id ON metricas_snapshots(organizacao_id);
CREATE INDEX idx_metricas_projeto_id ON metricas_snapshots(projeto_id);
CREATE INDEX idx_metricas_data ON metricas_snapshots(data_snapshot);
-- Evitar duplicata de snapshot do mesmo dia pro mesmo projeto
CREATE UNIQUE INDEX idx_metricas_unique_dia_projeto ON metricas_snapshots(projeto_id, data_snapshot);

-- ============================================================================
-- Comentarios de documentacao
-- ============================================================================
COMMENT ON TABLE organizacoes IS 'Tenant root. Cada cliente da buscou.ai e uma organizacao.';
COMMENT ON TABLE perfis_organizacao IS 'Dados de identidade do negocio (1:1 com organizacoes).';
COMMENT ON TABLE localizacoes IS 'Onde a organizacao atende (cidade, estado, online).';
COMMENT ON TABLE servicos IS 'Catalogo de servicos da organizacao. Input pra keywords/conteudo.';
COMMENT ON TABLE projetos IS 'Ciclo de conteudo (blog + motor). Uma org pode ter multiplos projetos.';
COMMENT ON TABLE palavras_chave IS 'Keywords-alvo por projeto (output do Estrategista).';
COMMENT ON TABLE briefings_conteudo IS 'Spec detalhada antes de escrever (output do Pesquisador).';
COMMENT ON TABLE conteudos IS 'Artigo publicavel. Entidade central. State machine de 9 valores.';
COMMENT ON TABLE execucoes_agentes IS 'Log de cada run de agente. Input/output JSON, custo, tentativa.';
COMMENT ON TABLE metricas_snapshots IS 'Snapshot diario de performance (impressoes, cliques, ranking, citacoes IA).';
