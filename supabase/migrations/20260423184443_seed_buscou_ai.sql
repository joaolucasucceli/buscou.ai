-- ============================================================================
-- buscou.ai — Migration 003 — Seed Dogfood (buscou.ai como tenant zero)
-- ============================================================================
-- Insere a propria buscou.ai como primeiro tenant do sistema.
-- UUID fixo `00000000-0000-0000-0000-000000000001` (tenant zero conhecido).
--
-- Dados canonicos extraidos da VERDADE_UNICA. Linguagem alinhada com
-- CLAUDE.md secao "Linguagem": apenas termos permitidos (tecnologia, motor,
-- estrutura, pagamento unico, SEO, AIO). Zero termos proibidos.
--
-- INSERTs idempotentes via ON CONFLICT DO NOTHING — rodar de novo nao duplica.
--
-- Linear: BAI-19
-- ============================================================================

-- ============================================================================
-- 1. Tenant zero: organizacoes
-- ============================================================================
INSERT INTO organizacoes (id, nome, slug, status)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'buscou.ai',
  'buscou-ai',
  'ativo'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. Perfil (1:1 com organizacoes, puxado da VERDADE_UNICA)
-- ============================================================================
INSERT INTO perfis_organizacao (
  organizacao_id,
  nome_fantasia,
  site_url,
  categoria,
  tom_de_voz,
  objetivo_principal,
  cta_principal,
  ticket_medio,
  modelo_atendimento,
  descricao_curta
)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'buscou.ai',
  'https://buscouai.vercel.app',
  'tecnologia',
  'neutro',
  'Aparecer em buscas do Google e em respostas de IA',
  'Pagamento unico R$ 2.500',
  2500.00,
  'compra_direta',
  'Tecnologia que coloca empresas em resultados de busca e em respostas de IA automaticamente.'
)
ON CONFLICT (organizacao_id) DO NOTHING;

-- ============================================================================
-- 3. Localizacao (atende Brasil, online)
-- ============================================================================
INSERT INTO localizacoes (
  organizacao_id,
  pais,
  estado,
  cidade,
  e_principal,
  atende_online
)
SELECT
  '00000000-0000-0000-0000-000000000001',
  'Brasil',
  'SP',
  'Sao Paulo',
  true,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM localizacoes
  WHERE organizacao_id = '00000000-0000-0000-0000-000000000001'
);

-- ============================================================================
-- 4. Servico (pagamento unico — sem tiers, sem mensalidade)
-- ============================================================================
INSERT INTO servicos (
  organizacao_id,
  nome,
  descricao,
  e_principal,
  ticket_medio
)
SELECT
  '00000000-0000-0000-0000-000000000001',
  'Blog SEO/AIO automatizado',
  'Estrutura (blog) + motor (buscou.ai) gerando 90 conteudos/mes. Pagamento unico R$ 2.500 a vista ou R$ 3.000 em 12x.',
  true,
  2500.00
WHERE NOT EXISTS (
  SELECT 1 FROM servicos
  WHERE organizacao_id = '00000000-0000-0000-0000-000000000001'
    AND nome = 'Blog SEO/AIO automatizado'
);

-- ============================================================================
-- 5. Projeto zero: o proprio blog buscou.ai (dogfood)
-- ============================================================================
INSERT INTO projetos (
  organizacao_id,
  nome,
  cidade_alvo,
  servico_alvo,
  status
)
SELECT
  '00000000-0000-0000-0000-000000000001',
  'Blog buscou.ai (dogfood)',
  NULL,
  'Blog SEO/AIO automatizado',
  'configurando'
WHERE NOT EXISTS (
  SELECT 1 FROM projetos
  WHERE organizacao_id = '00000000-0000-0000-0000-000000000001'
    AND nome = 'Blog buscou.ai (dogfood)'
);
