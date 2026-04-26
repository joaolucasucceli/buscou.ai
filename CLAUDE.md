# Projeto: buscou.ai

## Descricao

Tecnologia que coloca empresas em resultados de busca (Google) e em respostas de IA (ChatGPT, Gemini, Perplexity, Claude, AI Overviews) automaticamente. Blog (estrutura) + Motor publicando 90 conteudos/mes.

**Modelo comercial canonico** (atualizado em 2026-04-25):
- **Implementacao** R$ 3.000 fixo (a vista PIX ou 12x R$ 250 cartao). Negociavel caso-a-caso via cupom Stripe (piso R$ 1.000).
- **Infra mensal** R$ 500/mes a partir do mes 2. Negociavel caso-a-caso via cupom (piso R$ 300/mes).
- Valores **nunca expostos em copy publico** — so em reuniao + proposta + Payment Link via WhatsApp.

**ICP primario:** negocios locais — clinicas (odontologicas, esteticas, medicas, veterinarias), imobiliarias e corretores, advogados e escritorios juridicos, **alimentacao** (restaurantes, padarias, hamburguerias, food trucks com presenca digital — adicionado em 2026-04-25), servicos locais (contabilidade, marketing, consultoria, assistencia tecnica, reformas).

**Nome da marca:** `buscou.ai` (visual) / `BuscouAI` (juridico). Nunca "Buscou.ai", "Buscou.AI" ou "BUSCOU.AI".

## Verdade canonica

Tudo que e Nivel 1 (modelo comercial, posicionamento, ICP, produto, fluxo de venda, linguagem) mora em [VERDADE_UNICA_BUSCOU.md](base-de-conhecimento/00%20-%20Verdade%20Unica/VERDADE_UNICA_BUSCOU.md). **Nao duplicar aqui.** Em conflito, Verdade Unica vence; corrigir o derivado.

Governanca de alteracoes em [Governanca - Decisoes Canonicas.md](base-de-conhecimento/00%20-%20Verdade%20Unica/Governanca%20-%20Decisoes%20Canonicas.md).

**Decision Logs vigentes:**

- [Pricing + ICP + Timeline + Anna V1 manual (2026-04-25)](base-de-conhecimento/05%20-%20Modelo%20de%20Negocio/Decision%20Log%20-%202026-04-25%20-%20Pricing%20%2B%20ICP%20%2B%20Timeline%20%2B%20Anna%20V1%20manual.md) — **canonico vigente** pos-reuniao Joao + Vitoria. 10 mudancas: implementacao R$ 3.000 fixo, infra R$ 500/mes (negociavel ate R$ 300), politica desconto cobre ambas linhas, ICP +alimentacao, blog instantaneo, Anna V1 escopo confirmado, governanca 3-niveis pausada, 1a venda sem nominar cliente, skill distribuida pra Vitoria.
- [Reversao Track 1 (2026-04-24)](base-de-conhecimento/05%20-%20Modelo%20de%20Negocio/Decision%20Log%20-%202026-04-24%20-%20Reversao%20Track%201.md) — fluxo unico consultivo, sem preco publico, Payment Link Stripe via WhatsApp.
- [Politica de Desconto Implementacao (2026-04-24)](base-de-conhecimento/05%20-%20Modelo%20de%20Negocio/Decision%20Log%20-%202026-04-24%20-%20Politica%20de%20Desconto%20Implementacao.md) — implementacao negociavel via Cupom Stripe (canal privado); estendido em 2026-04-25 pra cobrir tambem infra.
- [Infra Mensal (2026-04-23)](base-de-conhecimento/05%20-%20Modelo%20de%20Negocio/Decision%20Log%20-%202026-04-23%20-%20Infra%20Mensal.md) — modelo implementacao + infra mensal (valores e politica de inegociabilidade revogados parcialmente em 2026-04-25).
- [Posicionamento + ICP base (2026-04-23)](base-de-conhecimento/05%20-%20Modelo%20de%20Negocio/Decision%20Log%20-%202026-04-23.md) — alterado em 2026-04-24 pela Reversao Track 1 e em 2026-04-25 (pricing + ICP +alimentacao); posicionamento e oferta-base preservados.

Decision Logs revogados/absorvidos ficam arquivados com header de revogacao no topo. Nao usar como referencia ativa.

## Linguagem

**Proibido:** "agencia", "gestao", "consultoria", "servico mensal", "mensalidade de servico/gestao", "plano mensal", "plano" (Starter/Growth/Scale), "assinatura SaaS" (em copy publico), "contrato mensal", "piloto automatico", "sistema operacional", "transformacao digital", "jornada", "sinergia", "solucoes" (soltinho).

**Permitido:** "tecnologia", "sistema", "motor", "estrutura", "automacao", "implementacao unica", "infra mensal", "custo de operacao do motor", "taxa de infraestrutura", "aparecer", "busca", "SEO", "AIO", "presenca organica".

**Regra:** sempre separar explicitamente "implementacao unica + infra mensal". Nunca "pacote total" ou "plano completo". "Mensalidade" e "assinatura" so qualificadas como "de infra" (uso tecnico/interno; evitar em copy publico).

## Como trabalhar (SDD + SDP enxuto)

### SDD (antes de executar)

Toda mudanca substantiva nasce numa issue Linear (no projeto `buscou.ai`, equipe `BuscouAI`). Trivialidades seguem fast-track sem issue (ver regra 7). Em duvida, abre issue.

Se a spec esta furada ou o escopo nao cabia, **para**, move pra Revisao com comentario explicando, espera o dono decidir. Nao executar issue inflada.

### SDP enxuto (durante a execucao)

Sete regras. Ponto.

1. **Ciclo:** Ideias → A fazer → Em andamento → Revisao → Concluido. Nunca pular direto pra Concluido. `Bloqueada` so pra travas externas reais; `Agendado` pra pausa voluntaria.
2. **Revisao e checkpoint do dono.** Auto-close proibido. So o dono move pra Concluido.
3. **Comentarios:** abertura ao entrar em `Em andamento` (plano de execucao) + fechamento ao entrar em `Revisao` (entregue, arquivos tocados, criterios batidos). Marcos extras se houver bloqueio ou mudanca de rumo. Historico de decisao mora na issue, nao no chat.
4. **Priority com criterios:**
   - **Urgent (1):** producao parada, cliente bloqueado, perda financeira em curso.
   - **High (2):** caminho critico da V1.
   - **Medium (3):** default razoavel.
   - **Low (4):** polimento, qualidade de vida.
5. **Commit prefixo `BAI-X:`** quando alterar arquivos versionados. Multiplos commits da mesma issue usam o mesmo prefixo. Push so com autorizacao explicita do dono.
6. **Branch propria** pra issue que toca codigo/docs versionados (`feature/BAI-X-titulo` ou `gitBranchName` automatico do Linear). Umbrella pode ter branch unica. `main` sempre publicavel.
7. **Fast-track pra trivialidades:** `≤ 10 linhas`, `1 arquivo`, sem impacto canonico (nao toca posicionamento, oferta, identidade visual, VERDADE_UNICA). Commit direto com prefixo `chore:` ou `fix:` (sem `BAI-X`). Em duvida, abre issue.

### DoR (Definition of Ready) — issue nasce com isso

1. **Conteudo:** Titulo claro + Contexto + Objetivo + Requisitos + Criterios de aceite mensuraveis (`- [ ]`).
2. **Metadata Linear:** Assignee + Priority + 1+ Label + dueDate (default V1: `2026-04-27`).
3. `parentId` se for sub-issue.
4. Sem default silencioso. Toda criacao passa esses campos no mesmo call.

### DoD (Definition of Done) — issue fecha com isso

1. Todos os criterios de aceite marcados `[x]` na description.
2. Comentario de fechamento postado.
3. Commit com prefixo `BAI-X:` (ou anotar "N/A" se nao alterou codigo).
4. Issue em Revisao; dono aprovou e moveu pra Concluido.

### Issue umbrella

Quando o escopo passa de uma issue, criar umbrella mae + sub-issues filhas (com `parentId`). Umbrella entra em `Em andamento` quando a 1a filha comeca; vai pra `Revisao` quando todas as filhas estao em Revisao ou Concluido. Criterios agregados de fechamento na description.

### Assignee

**Default Joao** pra todo trabalho tecnico, canonico (codigo, schema, posicionamento, agentes, Decision Logs, prompts) **e conteudo (incluindo Instagram).**

**Vitoria** apenas pra **setup operacional de SaaS externos** (Stripe, contas de redes sociais, email corporativo, dashboards de provedores).

Em duvida, perguntar. Socios em paridade — heuristica e orientacao, nao hierarquia.

### Labels (8 canonicas)

Padrao: lowercase, portugues. Toda issue com pelo menos 1 dominio.

- `produto` — codigo do motor, shell, dashboard
- `vendas` — landing, pitch, pagina comercial
- `marketing` — distribuicao, funil, campanhas, social (incluindo Instagram)
- `agentes` — agentes do motor, orquestrador, prompts canonicos
- `operacional` — infra, setup, contas externas, ops, processo
- `bug` — defeito em algo que ja existe
- `melhoria` — evolucao de algo que ja existe
- `umbrella` — issue-mae agrupando sub-issues

Novas labels exigem justificativa. Granularidade extra (intent:bofu/mofu/tofu, congelada, etc.) pode ser usada livre quando ajudar, mas nao e canonica.

## Tom e Postura

### Tom

- Amigavel e humano, nao robotico. Conversa, nao log.
- Explico o "porque" quando ha trade-off. Tom curto pra tarefa obvia.
- Equilibrio: amigavel **nao significa prolixo**. Conciso sempre.

### Postura — pensamento critico

- Nao concordar com tudo. Analiso antes de aceitar.
- Quando enxergo uma abordagem melhor, **proponho e argumento**. Nao executo calado.
- Sinalizo risco antes de avancar.
- Parceria tecnica, nao executor passivo. Se o pedido cheira errado, eu falo.

## Estrutura do projeto

Mapa fisico completo + politica de nomenclatura em [ESTRUTURA.md](ESTRUTURA.md). Resumo:

```
/base-de-conhecimento/   Vault Obsidian (conhecimento canonico, pastas numeradas)
/identidade-visual/      Design System: codigo (tokens/, components/, icons/, logos/, typography/) + docs/
/agentes/                Prompts e contexto operacional dos agentes IA (snapshots da Verdade Unica)
/prototipos/             HTMLs de prototipo (site V1, brand book) + publicacoes Instagram (instagram/)
/site/                   Codigo Next.js do site publico
/supabase/               Config + migrations SQL
/CLAUDE.md               Este arquivo (processo)
/ESTRUTURA.md            Mapa fisico + nomenclatura
```

### Vault `/base-de-conhecimento/`

Pastas vigentes:

```
00 - Verdade Unica/       VERDADE_UNICA_BUSCOU, Governanca, MOCs, Posicionamento, Glossario
04 - Produto/             Requisitos, Roadmap, Dashboard, Onboarding, Suporte, Modo MVP
05 - Modelo de Negocio/   Canvas, Unit Economics, NSM, ICP por Nicho, Oferta, Decision Logs
06 - SEO/                 Fundamentos, Tecnico, Local, On/Off-page, Ferramentas, Mercado BR/Global
07 - AIO/                 GEO, AEO, LLMO, Schema para IA, llms.txt, Ferramentas
08 - Estrategia Conteudo/ Frameworks SEO/AIO, Topic Clusters, Frameworks por Query
09 - Execucao/            Pipeline, Playbooks, Experimentos, Dominio, Rankings
11 - Operacao/            Fluxo Operacional, Jornadas, UX critica, SLAs
12 - Sistema/             Arquitetura, Modulos, Entidades, State machines, Integracoes
13 - Agentes/             Orquestrador + agentes + Prompts (subpasta) + Frameworks Multi-Agente
14 - Marketing/           Funil, Dog-fooding, Distribuicao, Tom de Voz, Casos, Concorrentes, GTM, Script de Vendas
Templates/                Templates padrao para notas
CHANGELOG.md              Historico de mudancas estruturais do vault
```

Numeracao com buracos e intencional (consolidacao 2026-04-25). Identidade Visual narrativa **nao mora mais no vault** — foi consolidada em `/identidade-visual/docs/`.

Principio: cada pasta tem funcao clara. Nota que nao cabe em nenhuma → deletar. Sem pasta de "arquivo morto".

## Identidade Visual (obrigatoria)

Fonte unica: `/identidade-visual/`. Codigo em `tokens/`, `components/`, `icons/`, `logos/`, `typography/`. Docs narrativos em `docs/`.

**Antes de qualquer trabalho de UI, logo ou copy da marca**, ler [identidade-visual/docs/Regras de Uso.md](identidade-visual/docs/Regras%20de%20Uso.md). Resumo das regras inegociaveis:

- **Tokens primeiro.** CSS variables (`var(--color-*)`, `var(--radius-*)`, `var(--space-*)`, `var(--transition-*)`). Nunca hardcode HEX/px fora da paleta.
- **Componentes do DS.** Reusar `Button`, `Card`, `SearchBar`, `Badge` de `identidade-visual/components/`. Nao duplicar.
- **Logo.** Sempre via SVG em `identidade-visual/logos/`.
- **Dark-first.** Fundo padrao `#08090D`. Em fundo claro, mint troca para `#00B37A`.
- **Proporcoes.** Mint (`--color-ai`) ≤ 10% da composicao. Coral (`--color-coral`) ≤ 2% (so erro/alerta).
- **Icones.** 24x24, stroke 1.75, `currentColor`. Novo icone entra em `identidade-visual/icons/` antes de ser usado.
- **Tipografia.** Geist (corpo/display), Geist Mono (`.ai`/labels/eyebrow), Instrument Serif (citacoes/manifestos). Tracking negativo em displays.
- **SearchBar com cursor piscante** e a assinatura visual — usar em momentos-chave.
- **Tom de voz.** Direto, inteligente, moderno. Numeros em vez de adjetivos.

## Como gerar propostas comerciais

Skill `gerador-proposta-buscou` (em `~/.claude/skills/gerador-proposta-buscou/SKILL.md`) faz o pipeline completo:

1. Dono manda transcricao da reuniao no chat.
2. Skill extrai variaveis + absorve aprendizado em **nivel de persona** (sem CRM, sem nome do cliente no vault).
3. Renderiza template canonico em `prototipos/template-proposta-buscou/index.html`.
4. Chrome headless gera PDF em `C:\Users\joaol\Desktop\Propostas Buscou\`.
5. Dono envia via WhatsApp + Payment Link Stripe.

**Regras rigidas:**

- Template canonico em `prototipos/template-proposta-buscou/` — fonte unica, nunca editar per-cliente.
- Nada per-cliente no projeto. PDFs ficam fora do repo.
- Descontos via Cupom Stripe caso-a-caso (canal privado; nunca em copy publico). Implementacao negociavel; infra mensal R$ 300 inegociavel. Ver [Decision Log Politica de Desconto](base-de-conhecimento/05%20-%20Modelo%20de%20Negocio/Decision%20Log%20-%202026-04-24%20-%20Politica%20de%20Desconto%20Implementacao.md).

## Frontmatter do vault

Toda nota nova em `/base-de-conhecimento/` deve ter:

```yaml
---
tipo: conceito | ferramenta | especialista | estrategia | recurso | mercado | glossario | playbook | template | rastreamento
area: SEO | AIO | Ambos
tags: [...]
atualizado: YYYY-MM-DD
---
```

Nomes de arquivo em portugues, Title Case com espacos. Wikilinks `[[Nome da Nota]]` pra navegacao interna. Datas absolutas (`2026-04-27`), nunca relativas.
