---
tipo: sistema
area: Seguranca
tags: [sistema, permissoes, roles, rls, seguranca]
atualizado: 2026-04-22
---

# Permissoes e Roles (RBAC)

O sistema usa Role-Based Access Control (RBAC) combinado com Row Level Security (RLS) do PostgreSQL. Cada requisicao carrega um JWT com claims `role` e `org_id`, que o RLS usa para filtrar dados automaticamente.

---

## Roles do Sistema

### admin
**Descricao**: Operadores da plataforma SaaS. Acesso total ao sistema, todas as organizacoes, configuracao de agentes e monitoramento global.

**Permissoes**:
- Ler e escrever em todas as tabelas de todas as organizacoes
- Gerenciar agentes (configurar, pausar, reiniciar jobs)
- Acessar metricas globais (custo de tokens, performance de agentes)
- Gerenciar planos e billing de qualquer org
- Escalar/resolver tickets de suporte
- Acessar logs e auditoria do sistema

### client
**Descricao**: Usuarios clientes que acessam o dashboard da propria organizacao. Nunca veem dados de outras orgs.

**Permissoes**:
- Ler dados da propria organizacao (projetos, keywords, conteudo, relatorios)
- Visualizar dashboard com metricas dos proprios projetos
- Abrir e acompanhar tickets de suporte
- Aprovar/rejeitar conteudo manualmente (override do agente)
- Baixar relatorios PDF
- Gerenciar configuracoes da propria org (nome, membros)
- **NAO pode**: ver dados de outras orgs, gerenciar agentes, acessar billing do Stripe diretamente

### agent (role de sistema)
**Descricao**: Identidade usada pelos agent workers quando acessam o banco de dados. Usa uma service role key do Supabase com permissoes especificas.

**Permissoes**:
- Ler e escrever em `content_pieces`, `content_briefs`, `keywords`, `clusters` (scoped por project_id do job)
- Ler e escrever em `agent_jobs`, `agent_runs` (proprios jobs)
- Ler `projects`, `organizations` (configuracoes necessarias para execucao)
- Escrever em `ai_citations`, `seo_metrics`, `aio_metrics`
- Ler `knowledge_base_articles` (para Agente Suporte)
- **NAO pode**: deletar registros, alterar configuracoes de org, acessar billing

### support
**Descricao**: Equipe humana de suporte que recebe tickets escalados. Acesso limitado a dados relevantes para resolver problemas.

**Permissoes**:
- Ler dados de clientes (projetos, conteudo, metricas) — somente leitura
- Gerenciar tickets de suporte (ler, responder, fechar, escalar)
- Ler logs de agent_jobs para diagnosticar problemas
- **NAO pode**: editar conteudo, alterar configuracoes de projeto, acessar billing

---

## Politicas RLS por Tabela

### users
```sql
-- Client: ve apenas a si mesmo
CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (auth.uid() = id);

-- Admin: ve todos
CREATE POLICY "users_select_admin" ON users
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Client: atualiza apenas proprio perfil
CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

### organizations
```sql
-- Client: ve apenas propria org
CREATE POLICY "orgs_select_own" ON organizations
  FOR SELECT USING (id = (auth.jwt() ->> 'org_id')::uuid);

-- Client: atualiza apenas propria org (nome, settings)
CREATE POLICY "orgs_update_own" ON organizations
  FOR UPDATE USING (id = (auth.jwt() ->> 'org_id')::uuid)
  WITH CHECK (id = (auth.jwt() ->> 'org_id')::uuid);

-- Admin: acesso total
CREATE POLICY "orgs_admin" ON organizations
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

### projects
```sql
-- Client: ve apenas projetos da propria org
CREATE POLICY "projects_select_org" ON projects
  FOR SELECT USING (org_id = (auth.jwt() ->> 'org_id')::uuid);

-- Client: cria projetos na propria org (respeitando limite do plano)
CREATE POLICY "projects_insert_org" ON projects
  FOR INSERT WITH CHECK (org_id = (auth.jwt() ->> 'org_id')::uuid);

-- Agent: le projetos associados aos seus jobs
CREATE POLICY "projects_select_agent" ON projects
  FOR SELECT USING (auth.jwt() ->> 'role' = 'agent');

-- Admin: acesso total
CREATE POLICY "projects_admin" ON projects
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

### keywords
```sql
-- Client: ve keywords dos projetos da propria org
CREATE POLICY "keywords_select_org" ON keywords
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE org_id = (auth.jwt() ->> 'org_id')::uuid
    )
  );

-- Agent: CRUD em keywords dos projetos que esta processando
CREATE POLICY "keywords_agent" ON keywords
  FOR ALL USING (auth.jwt() ->> 'role' = 'agent');

-- Admin: acesso total
CREATE POLICY "keywords_admin" ON keywords
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

### content_pieces
```sql
-- Client: ve conteudo dos projetos da propria org
CREATE POLICY "content_select_org" ON content_pieces
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE org_id = (auth.jwt() ->> 'org_id')::uuid
    )
  );

-- Client: pode aprovar/rejeitar (update de status apenas)
CREATE POLICY "content_update_org" ON content_pieces
  FOR UPDATE USING (
    project_id IN (
      SELECT id FROM projects WHERE org_id = (auth.jwt() ->> 'org_id')::uuid
    )
  );

-- Agent: CRUD completo
CREATE POLICY "content_agent" ON content_pieces
  FOR ALL USING (auth.jwt() ->> 'role' = 'agent');

-- Admin: acesso total
CREATE POLICY "content_admin" ON content_pieces
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

### agent_jobs e agent_runs
```sql
-- Client: somente leitura dos jobs da propria org
CREATE POLICY "jobs_select_org" ON agent_jobs
  FOR SELECT USING (org_id = (auth.jwt() ->> 'org_id')::uuid);

-- Agent: CRUD nos proprios jobs
CREATE POLICY "jobs_agent" ON agent_jobs
  FOR ALL USING (auth.jwt() ->> 'role' = 'agent');

-- Mesma logica para agent_runs (via join com agent_jobs)
CREATE POLICY "runs_select_org" ON agent_runs
  FOR SELECT USING (
    job_id IN (
      SELECT id FROM agent_jobs WHERE org_id = (auth.jwt() ->> 'org_id')::uuid
    )
  );

CREATE POLICY "runs_agent" ON agent_runs
  FOR ALL USING (auth.jwt() ->> 'role' = 'agent');
```

### invoices
```sql
-- Client: ve apenas faturas da propria org
CREATE POLICY "invoices_select_org" ON invoices
  FOR SELECT USING (org_id = (auth.jwt() ->> 'org_id')::uuid);

-- Admin: acesso total
CREATE POLICY "invoices_admin" ON invoices
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Ninguem alem de admin pode inserir/atualizar (via webhook do Stripe)
```

### support_tickets
```sql
-- Client: ve apenas tickets da propria org
CREATE POLICY "tickets_select_org" ON support_tickets
  FOR SELECT USING (org_id = (auth.jwt() ->> 'org_id')::uuid);

-- Client: cria tickets na propria org
CREATE POLICY "tickets_insert_org" ON support_tickets
  FOR INSERT WITH CHECK (org_id = (auth.jwt() ->> 'org_id')::uuid);

-- Support: ve todos os tickets (para resolver)
CREATE POLICY "tickets_support" ON support_tickets
  FOR ALL USING (auth.jwt() ->> 'role' IN ('support', 'admin'));
```

### ai_citations
```sql
-- Client: ve citacoes dos proprios projetos
CREATE POLICY "citations_select_org" ON ai_citations
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE org_id = (auth.jwt() ->> 'org_id')::uuid
    )
  );

-- Agent: insere e le (monitoramento)
CREATE POLICY "citations_agent" ON ai_citations
  FOR ALL USING (auth.jwt() ->> 'role' = 'agent');
```

---

## Matriz de Permissoes Resumida

| Tabela | admin | client | agent | support |
|---|---|---|---|---|
| `users` | CRUD | R (proprio) | - | R |
| `organizations` | CRUD | RU (propria) | R | R |
| `projects` | CRUD | CRU (propria org) | R | R |
| `keywords` | CRUD | R (propria org) | CRUD | R |
| `content_pieces` | CRUD | RU (propria org) | CRUD | R |
| `content_briefs` | CRUD | R (propria org) | CRUD | R |
| `agent_jobs` | CRUD | R (propria org) | CRUD | R |
| `agent_runs` | CRUD | R (propria org) | CRUD | R |
| `reports` | CRUD | R (propria org) | CR | - |
| `invoices` | CRUD | R (propria org) | - | - |
| `support_tickets` | CRUD | CR (propria org) | CR | CRUD |
| `ai_citations` | CRUD | R (propria org) | CRUD | R |

Legenda: C = Create, R = Read, U = Update, D = Delete

---

## Consideracoes de Seguranca

- **Service Role Key**: Usada apenas pelos agent workers em ambiente servidor. Nunca exposta no frontend. Bypassa RLS quando necessario (ex: agente escrevendo em multiplas orgs).
- **Anon Key**: Usada pelo frontend. Todas as queries passam pelo RLS.
- **JWT Claims customizados**: `org_id` e `role` sao setados no momento do login via Supabase Auth hook. Nao podem ser alterados pelo cliente.
- **Audit Trail**: Todas as operacoes de escrita em tabelas sensiveis (`organizations`, `invoices`) sao logadas em uma tabela `audit_log`.

Ver [[Arquitetura do Sistema]] para o fluxo de autenticacao.
Ver [[Entidades e Schema]] para as tabelas referenciadas.
