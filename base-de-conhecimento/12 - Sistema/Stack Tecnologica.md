---
tipo: sistema
area: Arquitetura
tags: [sistema, stack, tecnologia, decisoes]
atualizado: 2026-04-22
---

# Stack Tecnologica — Architecture Decision Records (ADRs)

Registro formal de cada decisao tecnologica do sistema. Formato ADR para rastreabilidade.

---

## ADR-001: Next.js 15 como Frontend Framework

**Decision**: Next.js 15 com App Router e React Server Components.

**Context**: Precisamos de um dashboard SaaS com autenticacao, graficos em tempo real, SEO para paginas de marketing, e server-side rendering para performance. O time usa TypeScript.

**Alternatives considered**:
- **Remix**: Bom em data loading, mas ecossistema menor e menos integracao com Vercel.
- **SvelteKit**: Performance excelente, mas pool de desenvolvedores menor no Brasil.
- **Vite + React SPA**: Mais simples, mas sem SSR nativo, pior SEO para paginas de marketing.

**Rationale**: Next.js 15 tem o melhor ecossistema para SaaS: Server Components para performance, App Router para layouts complexos, middleware para auth, e deploy zero-config na Vercel. React Server Components reduzem bundle size do dashboard significativamente.

**Trade-offs**: Complexidade do App Router (server vs client components), vendor lock-in com Vercel para features como ISR, curva de aprendizado para RSC.

**Revisit when**: Se o time crescer e preferir outro framework, ou se Vercel mudar pricing de forma desfavoravel.

---

## ADR-002: Supabase como Backend-as-a-Service

**Decision**: Supabase Cloud como backend unificado (PostgreSQL, Auth, Realtime, Storage, Edge Functions).

**Context**: Precisamos de autenticacao, banco relacional com RLS para multi-tenancy, real-time subscriptions para o dashboard, storage para arquivos, e functions serverless. Equipe pequena que precisa entregar rapido.

**Alternatives considered**:
- **Firebase**: NoSQL (Firestore) nao atende queries complexas de analytics. Vendor lock-in Google.
- **AWS (Cognito + RDS + Lambda + S3)**: Maximo controle, mas complexidade operacional altissima para equipe pequena.
- **Backend custom (Express/Fastify + Prisma)**: Maximo controle, mas tempo de desenvolvimento 3-5x maior.
- **PocketBase**: Simples demais, sem Edge Functions, sem Realtime escalavel.

**Rationale**: Supabase oferece tudo que precisamos em um pacote integrado com PostgreSQL real (nao NoSQL). RLS resolve multi-tenancy de forma elegante no nivel do banco. Realtime via WebSocket e nativo. Edge Functions (Deno) para logica customizada. Client SDK excelente para Next.js.

**Trade-offs**: Dependencia de um vendor para infra critica. Edge Functions sao Deno (nao Node.js), o que limita algumas libs. Custos crescem com uso (compute, bandwidth, storage). Menos controle fino sobre PostgreSQL configs.

**Revisit when**: Se atingirmos limites do plano Pro sem ROI, ou se precisarmos de extensoes PostgreSQL nao suportadas, ou se a equipe crescer ao ponto de justificar infra propria.

---

## ADR-003: Claude Agent SDK com MCP como Framework de Agentes

**Decision**: Claude Agent SDK com Model Context Protocol (MCP) para orquestracao dos 11 agentes.

**Context**: Precisamos de 11 agentes autonomos que executam tarefas complexas (pesquisa, escrita, revisao, publicacao). Cada agente precisa acessar APIs externas e o banco de dados. Precisamos de controle fino sobre qual modelo usar (custo vs qualidade).

**Alternatives considered**:
- **LangChain/LangGraph**: Ecossistema amplo, mas abstractions excessivas, debugging dificil, overhead de runtime.
- **CrewAI**: Bom para multi-agent, mas menos controle sobre routing de modelos e MCP nao e nativo.
- **Custom (chamadas diretas a API)**: Maximo controle, mas reescrever tool calling, retry logic, e context management.
- **OpenAI Assistants API**: Vendor lock-in a OpenAI, sem MCP, pricing menos previsivel.

**Rationale**: Claude Agent SDK e first-party da Anthropic, garantindo melhor integracao com modelos Claude. MCP padroniza a interface entre agentes e tools externas (APIs, banco, busca). Routing de modelos (Opus para decisoes complexas, Sonnet para execucao, Haiku para triagem) otimiza custo. SDK e TypeScript nativo, alinhado com o resto do stack.

**Trade-offs**: Lock-in na Anthropic como provider de LLM. Se Claude ficar fora do ar, todo o pipeline para. MCP e protocolo relativamente novo, ainda amadurecendo. Menos exemplos e tutoriais comparado a LangChain.

**Revisit when**: Se a Anthropic mudar pricing drasticamente, se outro provider oferecer modelos superiores, ou se MCP nao evoluir conforme esperado.

---

## ADR-004: Vercel como Plataforma de Deploy (Frontend)

**Decision**: Vercel para deploy do Next.js. Supabase Cloud para backend.

**Context**: Precisamos de deploy automatizado, preview deploys para PRs, CDN global, e zero-config para Next.js.

**Alternatives considered**:
- **Netlify**: Bom, mas suporte a Next.js App Router inferior ao Vercel.
- **AWS Amplify**: Funciona, mas mais complexo de configurar e manter.
- **Self-hosted (Docker + VPS)**: Maximo controle, mas overhead operacional significativo.
- **Cloudflare Pages**: Performance excelente, mas compatibilidade com Next.js ainda em evolucao.

**Rationale**: Vercel e a empresa por tras do Next.js — suporte first-party, otimizacoes automaticas (ISR, Edge Runtime, Image Optimization). Preview deploys por PR aceleram o fluxo de desenvolvimento. CDN global garante performance para clientes em qualquer regiao do Brasil.

**Trade-offs**: Custos crescem com trafego (bandwidth, serverless function invocations). Vendor lock-in para features especificas (ISR, middleware edge). Free tier generoso, mas Pro ($20/mes) necessario para team features.

**Revisit when**: Se custos de Vercel ultrapassarem $200/mes sem justificativa, ou se precisarmos de controle mais fino sobre a infraestrutura (ex: regioes especificas).

---

## ADR-005: Stripe como Gateway de Pagamento

**Decision**: Stripe para subscriptions, invoicing, e checkout.

**Context**: Precisamos de pagamento recorrente (assinaturas mensais), billing automatizado, e portal do cliente para gestao de cartao/plano.

**Alternatives considered**:
- **Pagar.me / PagSeguro**: Gateways BR nativos, mas APIs menos modernas, sem Customer Portal, webhooks menos confiaveis.
- **Mercado Pago**: Popular no BR, mas API menos developer-friendly, sem subscription management robusto.
- **Asaas**: Bom para BR (boleto, PIX), API razoavel, mas menos features de subscription.

**Rationale**: Stripe tem a melhor API do mercado, webhooks confiaveis, Customer Portal nativo, Checkout pre-built, e suporte completo a subscriptions com trial, proration, e dunning. Funciona no Brasil com PIX e boleto (via Stripe BR). Developer experience incomparavel.

**Trade-offs**: Taxas ligeiramente maiores que gateways locais (2.99% vs ~2.49%). Suporte em portugues limitado. Payout em BRL pode ter delay de 2-7 dias uteis.

**Revisit when**: Se precisarmos de boleto/PIX como metodo primario (Stripe suporta mas nao e o forte), ou se um gateway BR oferecer API comparavel com taxas menores.

---

## ADR-006: BullMQ + Redis como Sistema de Filas

**Decision**: BullMQ com Redis para fila de jobs dos agentes.

**Context**: Precisamos de uma fila robusta para jobs assincronos dos agentes: prioridades, retry com backoff, concorrencia configuravel, delayed jobs, e monitoramento.

**Alternatives considered**:
- **Supabase pgmq (PostgreSQL queues)**: Sem dependencia extra, mas menos features (sem prioridades, backoff limitado).
- **AWS SQS**: Robusto, mas vendor lock-in AWS, latencia maior para operacoes simples.
- **RabbitMQ**: Completo, mas operacionalmente complexo para equipe pequena.
- **Trigger.dev**: Bom para background jobs, mas menos controle sobre routing de agentes.

**Rationale**: BullMQ e o padrao de mercado para filas em Node.js/TypeScript. Suporta prioridades (1-5), retry com backoff exponencial, rate limiting, delayed jobs, repeatable jobs (crons), e dashboard de monitoramento (Bull Board). Redis e rapido e simples de operar (Upstash para serverless).

**Trade-offs**: Dependencia adicional (Redis). Redis nao e duravel por padrao (precisa de persistencia configurada). BullMQ nao tem garantia exactly-once (at-least-once). Custo do Redis managed (~$10-30/mes no Upstash).

**Revisit when**: Se Supabase lancar um queue service nativo robusto, ou se migrarmos para uma arquitetura mais event-driven com Kafka/NATS.

---

## ADR-007: TypeScript como Linguagem Unica

**Decision**: TypeScript em todo o stack (frontend, backend, agents).

**Context**: Precisamos de type safety, produtividade do desenvolvedor, e consistencia entre camadas. Equipe full-stack.

**Alternatives considered**:
- **JavaScript puro**: Menos boilerplate, mas sem type safety, erros em runtime.
- **Python (backend)**: Ecossistema de ML/IA forte, mas obriga a manter dois ecossistemas.
- **Go (backend)**: Performance excelente, mas curva de aprendizado, e frontend continua TS.

**Rationale**: TypeScript em todo o stack permite compartilhar types entre frontend e backend (Zod schemas, database types gerados pelo Supabase). Um unico ecossistema de tooling (ESLint, Prettier, tsconfig). Claude Agent SDK e TypeScript nativo. Supabase Edge Functions suportam TypeScript (via Deno). Produtividade maxima para equipe full-stack.

**Trade-offs**: Supabase Edge Functions rodam Deno (nao Node.js), o que limita compatibilidade com algumas libs npm. TypeScript config pode ser verboso. Build times maiores que JS puro.

**Revisit when**: Se precisarmos de performance critica em algum componente (considerar Rust/Go para workers), ou se o time de IA preferir Python para experimentacao.

---

Ver [[Arquitetura do Sistema]] para como essas decisoes se materializam.
Ver [[Modulos]] para a decomposicao funcional baseada nessa stack.
Ver [[Integracoes Externas]] para as APIs que se conectam a essa arquitetura.
