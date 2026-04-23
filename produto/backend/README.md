# /produto/backend

Backend multi-tenant. Supabase (Postgres + Auth + Storage) + API Routes do Next.js.

Responsabilidades:
- Multi-tenant (cada cliente = tenant isolado via RLS).
- Autenticacao (cliente + admin).
- API para agentes consumirem contexto do cliente.
- Persistencia de artigos gerados, rankings, IVT.
- Webhook de pagamento (Pix/MP/Stripe) -> ativar conta.

Consulta obrigatoria:
- [12 - Sistema/Arquitetura do Sistema.md](../../base-de-conhecimento/12 - Sistema/Arquitetura do Sistema.md)
- [12 - Sistema/Entidades e Schema.md](../../base-de-conhecimento/12 - Sistema/Entidades e Schema.md)
- [12 - Sistema/Permissoes e Roles.md](../../base-de-conhecimento/12 - Sistema/Permissoes e Roles.md)
