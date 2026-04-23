---
tipo: sistema
area: Ambos
tags:
  - frontend
  - arquitetura
  - nextjs
  - design-system
  - rotas
  - componentes
  - layouts
  - ui
  - dashboard
  - onboarding
atualizado: 2026-04-23
---

# Frontend — Arquitetura Completa (Rotas, Layouts, Componentes, Design System)

## Visao Geral

A camada frontend da plataforma e construida com **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, **Shadcn/UI** e **Recharts**. A aplicacao se divide em duas grandes areas:

1. **Site Publico** — Landing page, blog, precos, exemplos (foco em conversao)
2. **App Autenticado** — Dashboard, onboarding, gestao de conteudo, resultados (foco em operacao)

Toda a interface segue o principio de **progressive disclosure**: mostrar apenas o necessario em cada momento, revelando complexidade conforme o usuario avanca.

---

## Mapa de Rotas Completo

```
/
├── (public)/
│   ├── page.tsx                      → Home (landing page)
│   ├── como-funciona/page.tsx        → Explicacao do produto
│   ├── precos/page.tsx               → Planos e pricing
│   ├── blog/page.tsx                 → Listagem do blog
│   ├── blog/[slug]/page.tsx          → Artigo individual
│   ├── categorias/[slug]/page.tsx    → Categoria do blog
│   ├── exemplos/page.tsx             → Cases / demonstracoes
│   ├── contato/page.tsx              → Contato / CTA WhatsApp
│   ├── login/page.tsx                → Login
│   └── termos/page.tsx               → Termos / privacidade
│
├── (auth)/
│   ├── onboarding/
│   │   ├── page.tsx                  → Entrada do onboarding
│   │   ├── negocio/page.tsx          → Etapa 2: Identidade do negocio
│   │   ├── localizacao/page.tsx      → Etapa 3: Localizacao e areas
│   │   ├── oferta/page.tsx           → Etapa 4: Servicos oferecidos
│   │   ├── cliente-ideal/page.tsx    → Etapa 5: Publico-alvo
│   │   ├── diferenciais/page.tsx     → Etapa 6: Provas e diferenciais
│   │   ├── concorrentes/page.tsx     → Etapa 7: Concorrencia
│   │   ├── objetivos/page.tsx        → Etapa 8: Metas e expectativas
│   │   ├── marca/page.tsx            → Etapa 9: Branding e tom de voz
│   │   ├── integracoes/page.tsx      → Etapa 10: Conexoes externas
│   │   └── revisao/page.tsx          → Etapa 11: Confirmacao final
│   │
│   └── app/
│       ├── page.tsx                  → Dashboard principal
│       ├── projeto/page.tsx          → Visao geral do projeto
│       ├── estrategia/page.tsx       → Keywords, clusters, plano
│       ├── conteudos/page.tsx        → Lista de conteudos
│       ├── conteudos/[id]/page.tsx   → Detalhe do conteudo
│       ├── agentes/page.tsx          → Estado dos agentes
│       ├── resultados/page.tsx       → SEO + IA + metricas
│       ├── integracoes/page.tsx      → Analytics, GSC, Stripe
│       ├── suporte/page.tsx          → Chat / ajuda
│       ├── configuracoes/page.tsx    → Perfil, marca, dados
│       └── faturamento/page.tsx      → Assinatura / pagamentos
│
└── api/
    ├── onboarding/[step]/route.ts    → Save onboarding steps
    ├── webhooks/stripe/route.ts      → Stripe webhooks
    ├── jobs/[type]/route.ts          → Job triggers
    └── auth/callback/route.ts        → Auth callback
```

### Explicacao dos Route Groups

- `(public)/` — Grupo de rotas publicas. Compartilham o layout publico com header e footer. Nao exigem autenticacao.
- `(auth)/` — Grupo de rotas autenticadas. Protegidas por middleware que redireciona para `/login` se o usuario nao estiver autenticado.
- `api/` — Route handlers para integracao backend. Nao renderizam UI.

### Middleware de Autenticacao

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/app') ||
                      request.nextUrl.pathname.startsWith('/onboarding')

  if (isAuthRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (request.nextUrl.pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/app', request.url))
  }
}
```

---

## Layouts

A aplicacao utiliza 3 layouts distintos, cada um otimizado para seu contexto de uso.

### 1. Layout Publico — `(public)/layout.tsx`

**Proposito:** Apresentar o produto, gerar confianca e converter visitantes.

**Header:**
- Logo (esquerda)
- Navegacao central: Como Funciona, Precos, Blog, Exemplos
- CTA "Comecar" (botao primario, destaque visual) + Login (link secundario)
- Sticky no scroll com blur/backdrop-filter
- Mobile: hamburger menu com Sheet (slide-in)

**Footer:**
- Logo + descricao curta
- Colunas de links:
  - **Produto:** Como Funciona, Precos, Exemplos
  - **Recursos:** Blog, FAQ, Suporte
  - **Empresa:** Sobre, Contato, Termos
  - **Legal:** Privacidade, Termos de Uso
- Redes sociais (icones)
- Copyright + ano

**Especificacoes tecnicas:**
- Container: `max-w-7xl` (1280px)
- Fundo: branco (`bg-background`)
- Tipografia: Inter para textos, peso variado para hierarquia
- Responsivo: breakpoints em `sm`, `md`, `lg`, `xl`

```
+--------------------------------------------------------------+
| [Logo]  Como Funciona | Precos | Blog | Exemplos  [Comecar]  |
+--------------------------------------------------------------+
|                                                                |
|                    CONTEUDO DA PAGINA                           |
|                    (slot children)                              |
|                                                                |
+--------------------------------------------------------------+
| [Logo]                                                         |
| Produto | Recursos | Empresa | Legal                          |
| [Social Icons]                     (c) 2026 Empresa            |
+--------------------------------------------------------------+
```

### 2. Layout App — `(auth)/app/layout.tsx`

**Proposito:** Oferecer navegacao eficiente e acesso rapido a todas as funcionalidades da plataforma.

**Sidebar fixa (esquerda, 240px):**

| Item | Icone (Lucide) | Rota |
|---|---|---|
| Dashboard | `LayoutDashboard` | `/app` |
| Estrategia | `Target` | `/app/estrategia` |
| Conteudos | `FileText` | `/app/conteudos` |
| Agentes | `Bot` | `/app/agentes` |
| Resultados | `TrendingUp` | `/app/resultados` |
| Integracoes | `Plug` | `/app/integracoes` |
| --- | `Separator` | --- |
| Suporte | `HelpCircle` | `/app/suporte` |
| Faturamento | `CreditCard` | `/app/faturamento` |
| Configuracoes | `Settings` | `/app/configuracoes` |

- Item ativo: fundo `bg-accent`, texto `text-accent-foreground`, borda esquerda colorida
- Hover: `bg-muted` sutil
- Collapse: em telas menores, sidebar colapsa para icones-only (56px) com tooltip
- Mobile: sidebar como Sheet (overlay)

**Topbar:**
- Esquerda: Nome da empresa do cliente (truncado se longo)
- Centro: Badge de status do projeto (`Configurando` | `Ativo` | `Pausado` | `Em revisao`)
- Direita: Sino de notificacoes (com badge de contagem) + Avatar com DropdownMenu (Perfil, Configuracoes, Sair)

**Area de conteudo:**
- Padding: `p-6` (24px)
- Max-width: nenhum (ocupa toda a largura disponivel)
- Scroll vertical independente do sidebar

```
+--------+---------------------------------------------+
| [Logo] | Nome Empresa    [Status Badge]   [Bell][Av] |
|--------|---------------------------------------------|
| Dash   |                                             |
| Estrat |         CONTEUDO DA PAGINA                  |
| Conteu |         (slot children)                     |
| Agente |                                             |
| Result |                                             |
| Integr |                                             |
| ----   |                                             |
| Suport |                                             |
| Fatur  |                                             |
| Config |                                             |
+--------+---------------------------------------------+
```

### 3. Layout Onboarding — `(auth)/onboarding/layout.tsx`

**Proposito:** Guiar o usuario por um fluxo focado e sem distracoes.

**Caracteristicas:**
- **Sem sidebar** — layout limpo e centralizado
- Barra de progresso no topo: 11 etapas com indicadores visuais
  - Completa: `●` (preenchido, cor primaria)
  - Atual: `◐` (meio preenchido, animado)
  - Pendente: `○` (vazio, cor muted)
- Indicador textual: "Etapa X de 11" + tempo estimado restante
- Container estreito: `max-w-2xl` (672px) centralizado
- Navegacao: botao "Voltar" (secundario) + "Continuar" (primario)
- Salvamento automatico a cada campo preenchido (debounced 500ms)

```
+--------------------------------------------------------------+
| ● ● ● ● ◐ ○ ○ ○ ○ ○ ○                                      |
| Etapa 5 de 11 — ~8 minutos restantes                         |
+--------------------------------------------------------------+
|                                                                |
|              CONTEUDO DA ETAPA                                 |
|              (max-w-2xl centralizado)                          |
|                                                                |
+--------------------------------------------------------------+
|         [← Voltar]                    [Continuar →]           |
+--------------------------------------------------------------+
```

---

## Paginas do App — Wireframes e Especificacoes

### Dashboard Principal (`/app`)

O dashboard e o ponto central do usuario. Mostra uma visao consolidada do estado do projeto.

```
+----------------------------------------------------+
| Cards metricas (4)                                  |
| [Presenca Google] [Presenca IA] [Publicados] [Auto] |
+----------------------------------------------------+
| Grafico crescimento  | Pipeline conteudos           |
| (area chart)         | (kanban simplificado)        |
+----------------------------------------------------+
| Atividades agentes   | Proximos passos recomendados |
| (feed)               | (checklist)                  |
+----------------------------------------------------+
```

**Cards de metricas (topo, grid 4 colunas):**

| Card | Valor exemplo | Delta | Icone |
|---|---|---|---|
| Presenca Google | 47 keywords rankeando | +12 esta semana | `Search` |
| Presenca IA | 8 citacoes detectadas | +3 esta semana | `Brain` |
| Conteudos publicados | 23 artigos | +5 este mes | `FileCheck` |
| Automacao ativa | 4 agentes rodando | 2 tarefas em fila | `Bot` |

Cada card usa o componente `MetricCard` com: valor principal (texto grande), delta (positivo verde, negativo vermelho), icone (canto superior direito), sparkline opcional.

**Grafico de crescimento (esquerda, 60%):**
- Area chart (Recharts) mostrando evolucao semanal
- Metricas sobrepostas: impressoes, cliques, citacoes IA
- Periodo selecionavel: 7d, 30d, 90d, 6m
- Tooltip com valores exatos

**Pipeline de conteudos (direita, 40%):**
- Kanban simplificado com colunas verticais
- Colunas: Planejado, Em Producao, Publicado
- Cada card: titulo truncado + keyword badge
- Click abre o conteudo no detalhe

**Atividades dos agentes (esquerda inferior):**
- Feed cronologico das ultimas acoes dos agentes
- Cada item: icone do agente, descricao da acao, timestamp
- Componente `AgentActivityItem`
- Scroll interno, max 10 itens visiveis

**Proximos passos (direita inferior):**
- Checklist de acoes recomendadas pelo sistema
- Itens clicaveis que levam a pagina relevante
- Indicador de prioridade (alta, media, baixa)
- Exemplo: "Conectar Google Search Console", "Aprovar 3 artigos pendentes"

### Pagina Estrategia (`/app/estrategia`)

**Proposito:** Visualizar e gerenciar a estrategia de SEO/AIO do projeto.

**Secoes:**

1. **Objetivo principal** — Card destacado com a meta do projeto (ex: "Dominar busca local para dentistas em Curitiba")

2. **Keywords priorizadas** — Tabela interativa:

| Coluna | Descricao |
|---|---|
| Keyword | Termo de busca |
| Score | Score de priorizacao (0-100) |
| Volume | Volume mensal de busca |
| KD | Keyword Difficulty (0-100) |
| Posicao | Posicao atual no Google (ou "—") |
| Status | Badge: monitorando, targetando, rankeando |
| Acoes | Menu: ver cluster, criar conteudo |

- Ordenacao por qualquer coluna
- Filtros: status, volume minimo, KD maximo
- Busca por texto

3. **Clusters visuais** — Grid de cards agrupados por topico:
   - Card do cluster: nome, keyword principal, numero de keywords, numero de conteudos, cobertura (barra de progresso)
   - Expandir mostra keywords do cluster

4. **Cidades/bairros foco** — Mapa simplificado ou lista com:
   - Nome da cidade/bairro
   - Numero de keywords locais
   - Cobertura de conteudo

5. **Concorrentes** — Tabela comparativa:
   - Nome, dominio, keywords em comum, posicao media

### Pagina Conteudos — Lista (`/app/conteudos`)

**Layout:** Tabela ou grid de cards (toggle entre visualizacoes).

**Campos por conteudo:**

| Campo | Tipo |
|---|---|
| Titulo | Texto (link para detalhe) |
| Status | Badge colorido |
| Keyword alvo | Texto com badge |
| Data | Criacao / publicacao |
| Canal | Blog, GMB, etc. |
| Acoes | Menu: ver, editar, aprovar |

**Status possiveis e cores:**

| Status | Cor | Descricao |
|---|---|---|
| Planejado | Cinza (`muted`) | Na fila de producao |
| Em pesquisa | Azul (`info`) | Agente pesquisando |
| Em redacao | Amarelo (`warning`) | Agente escrevendo |
| Em revisao | Laranja (`orange`) | Aguardando aprovacao |
| Publicado | Verde (`success`) | No ar |
| Monitorado | Roxo (`purple`) | Tracking ativo de metricas |

**Filtros:** Status (multi-select), keyword, data (range), canal
**Ordenacao:** Data, titulo, status
**Busca:** Full-text no titulo e keyword

### Pagina Conteudo — Detalhe (`/app/conteudos/[id]`)

**Layout em 2 colunas** (70% / 30%):

```
+--------------------------------------+------------------+
| COLUNA PRINCIPAL (70%)               | SIDEBAR (30%)    |
|                                      |                  |
| H1: Titulo do conteudo               | Status Badge     |
|                                      | [Em revisao]     |
| Metadados:                           |                  |
| Keyword: "dentista curitiba"         | Keyword alvo     |
| Cluster: "Odontologia Curitiba"      | "dentista ctba"  |
| Criado: 2026-04-20                   |                  |
| Agente: Redator                      | SEO Score        |
|                                      | [====78====]     |
| ------------------------------------ |                  |
|                                      | AIO Score        |
| Conteudo renderizado (Markdown)      | [====65====]     |
|                                      |                  |
| # Titulo                             | Acoes:           |
| Resposta direta...                   | [Aprovar]        |
| ## Secao 1...                        | [Solicitar Rev.] |
| ## Secao 2...                        | [Editar]         |
| ## FAQ...                            | [Rejeitar]       |
|                                      |                  |
|                                      | Historico        |
|                                      | (timeline)       |
|                                      | 14:30 Pesquisou  |
|                                      | 15:00 Redigiu    |
|                                      | 15:45 Otimizou   |
|                                      | 16:00 Enviou     |
+--------------------------------------+------------------+
```

**Coluna principal:**
- Titulo (H1)
- Metadados: keyword, cluster, data criacao, agente responsavel
- Conteudo renderizado em Markdown (usando `react-markdown` ou similar)
- Formatacao completa: headings, listas, blockquotes, tabelas, imagens

**Sidebar:**
- **Status badge** — Grande, colorido, com botao de acao
- **Keyword alvo** — Com link para a pagina de estrategia
- **SEO Score** — Componente `ScoreGauge` circular (0-100), cor varia: vermelho < 40, amarelo 40-70, verde > 70
- **AIO Score** — Mesmo componente, avalia otimizacao para IA
- **Acoes:**
  - Aprovar (verde) — Publica o conteudo
  - Solicitar revisao (amarelo) — Devolve ao agente com feedback
  - Editar (azul) — Abre editor inline
  - Rejeitar (vermelho) — Descarta conteudo
- **Historico do agente** — Timeline vertical com:
  - Timestamp
  - Acao realizada
  - Agente responsavel
  - Duracao de cada etapa

### Pagina Resultados (`/app/resultados`)

**Proposito:** Consolidar todas as metricas de performance SEO e presenca em IA.

```
+----------------------------------------------------+
| Cards resumo (4)                                    |
| [Impressoes] [Cliques] [CTR] [Posicao Media]       |
+----------------------------------------------------+
| Score Presenca IA              | Evolucao Semanal   |
| (gauge grande circular)       | (line chart)        |
| 72/100                        | metricas ao longo   |
|                                | do tempo            |
+----------------------------------------------------+
| Queries Monitoradas (tabela)                        |
| query | impressoes | cliques | posicao | citacao IA |
+----------------------------------------------------+
```

**Cards de resumo:**

| Metrica | Fonte | Periodo |
|---|---|---|
| Impressoes | Google Search Console | Ultimos 28 dias |
| Cliques | Google Search Console | Ultimos 28 dias |
| CTR | Calculado | Ultimos 28 dias |
| Posicao media | Google Search Console | Ultimos 28 dias |

**Score de presenca IA:**
- Gauge circular grande (componente `ScoreGauge`, tamanho `lg`)
- Score 0-100 baseado em citacoes detectadas
- Breakdown: ChatGPT, Perplexity, Google AI Overviews
- Tendencia: seta para cima/baixo com delta

**Evolucao semanal:**
- Line chart (Recharts) com multiplas linhas
- Metricas: impressoes, cliques, citacoes IA
- Periodo: 4, 8, 12 semanas
- Tooltip detalhado

**Queries monitoradas:**
- Tabela paginada com todas as queries do projeto
- Colunas: query, impressoes, cliques, CTR, posicao, citacao IA (sim/nao), tendencia
- Ordenacao e filtros
- Export CSV

### Pagina Agentes (`/app/agentes`)

**Proposito:** Visualizar o estado e atividade de cada agente do sistema.

- Grid de cards, um por agente (11 agentes + orquestrador)
- Cada card: nome, icone, status (ativo/inativo/processando), ultima acao, tarefas na fila
- Click abre detalhes: historico de acoes, metricas de performance, configuracoes
- Ver tambem: [[Arquitetura Multi-Agente]]

### Pagina Integracoes (`/app/integracoes`)

- Cards de integracao: Google Search Console, Google Analytics, Stripe, WordPress, etc.
- Status: conectado (verde), desconectado (vermelho), configurando (amarelo)
- Botao: Conectar / Desconectar / Reconfigurar
- Dados da ultima sincronizacao

### Pagina Faturamento (`/app/faturamento`)

- Plano atual (card destacado): nome, preco, ciclo, data renovacao
- Historico de faturas (tabela): data, valor, status, PDF
- Alterar plano (upgrade/downgrade)
- Metodo de pagamento (Stripe Customer Portal)
- Cancelamento com retencao (motivo + oferta)

### Pagina Configuracoes (`/app/configuracoes`)

- Tabs: Perfil, Marca, Dados do Negocio, Notificacoes
- **Perfil:** Nome, email, senha, avatar
- **Marca:** Logo, cores, tom de voz (reflete no conteudo gerado)
- **Dados do Negocio:** Editar informacoes do onboarding
- **Notificacoes:** Toggle para email, push, in-app

---

## Design System

### Tokens de Design

**Espacamento:**

| Token | Valor | Uso |
|---|---|---|
| `space-1` | 4px | Margem interna minima |
| `space-2` | 8px | Gap entre elementos inline |
| `space-3` | 12px | Padding de badges e chips |
| `space-4` | 16px | Padding de cards e inputs |
| `space-5` | 20px | Gap entre secoes menores |
| `space-6` | 24px | Padding de containers |
| `space-8` | 32px | Gap entre secoes |
| `space-10` | 40px | Margem entre blocos |
| `space-12` | 48px | Separacao de secoes grandes |
| `space-16` | 64px | Espacamento hero e secoes |

**Border Radius:**

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 4px | Badges, chips |
| `radius-md` | 8px | Cards, inputs, botoes |
| `radius-lg` | 12px | Modais, sheets |
| `radius-xl` | 16px | Cards destacados |
| `radius-full` | 9999px | Avatares, indicadores |

**Sombras:**

| Token | Valor | Uso |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Cards sutis |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards elevados, dropdowns |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modais, popovers |

**Tipografia:**

| Token | Fonte | Uso |
|---|---|---|
| `font-sans` | Inter | Textos, headings, UI |
| `font-mono` | JetBrains Mono | Codigo, dados tecnicos |

| Token | Tamanho | Line Height | Uso |
|---|---|---|---|
| `text-xs` | 12px | 16px | Labels, captions |
| `text-sm` | 14px | 20px | Corpo secundario, metadata |
| `text-base` | 16px | 24px | Corpo principal |
| `text-lg` | 18px | 28px | Subtitulos |
| `text-xl` | 20px | 28px | Titulos de secao |
| `text-2xl` | 24px | 32px | Titulos de pagina |
| `text-3xl` | 30px | 36px | Hero, numeros grandes |

**Cores (CSS Variables via Tailwind):**

| Token | Light | Dark | Uso |
|---|---|---|---|
| `background` | `#FFFFFF` | `#09090B` | Fundo principal |
| `foreground` | `#09090B` | `#FAFAFA` | Texto principal |
| `card` | `#FFFFFF` | `#18181B` | Fundo de cards |
| `primary` | `#2563EB` | `#3B82F6` | Botoes, links, destaques |
| `secondary` | `#F1F5F9` | `#27272A` | Botoes secundarios |
| `muted` | `#F1F5F9` | `#27272A` | Textos inativos, fundos sutis |
| `accent` | `#F1F5F9` | `#27272A` | Hover, item ativo sidebar |
| `destructive` | `#EF4444` | `#DC2626` | Erros, exclusao |
| `border` | `#E2E8F0` | `#27272A` | Bordas |
| `ring` | `#2563EB` | `#3B82F6` | Focus ring |

**Cores semanticas (Status):**

| Status | Cor | Hex |
|---|---|---|
| Sucesso | Verde | `#22C55E` |
| Aviso | Amarelo | `#EAB308` |
| Erro | Vermelho | `#EF4444` |
| Info | Azul | `#3B82F6` |
| Neutro | Cinza | `#6B7280` |

### Componentes Base (Shadcn/UI)

Todos os componentes base sao importados do Shadcn/UI e customizados via Tailwind CSS:

| Componente | Uso principal |
|---|---|
| `Button` | Acoes primarias e secundarias |
| `Input` | Campos de texto simples |
| `Textarea` | Campos de texto longo |
| `Select` | Selecao de opcoes |
| `Card` | Container visual com borda e sombra |
| `Badge` | Labels de status, categorias |
| `Tabs` | Navegacao entre abas de conteudo |
| `Dialog` | Modais de confirmacao e formularios |
| `Sheet` | Paineis laterais (sidebar mobile, filtros) |
| `Table` | Tabelas de dados |
| `Skeleton` | Placeholders de loading |
| `Avatar` | Foto/iniciais do usuario |
| `DropdownMenu` | Menus contextuais |
| `Tooltip` | Dicas ao hover |
| `Progress` | Barras de progresso |
| `Toast` | Notificacoes temporarias |
| `Separator` | Divisores visuais |
| `ScrollArea` | Areas com scroll customizado |
| `Command` | Busca e command palette (Ctrl+K) |

### Componentes Custom

Alem dos componentes base do Shadcn/UI, a aplicacao possui componentes customizados:

#### MetricCard

Exibe um valor numerico com contexto.

```typescript
interface MetricCardProps {
  title: string          // "Presenca Google"
  value: string | number // "47 keywords"
  delta?: string         // "+12 esta semana"
  deltaType?: 'positive' | 'negative' | 'neutral'
  icon?: LucideIcon      // Search
  sparklineData?: number[] // mini grafico
}
```

**Visual:** Card com icone no canto superior direito, valor grande centralizado, delta abaixo com seta e cor, sparkline opcional na base.

#### ChartPanel

Wrapper para graficos Recharts com layout e controles padronizados.

```typescript
interface ChartPanelProps {
  title: string
  description?: string
  periodSelector?: boolean  // 7d, 30d, 90d
  children: React.ReactNode // Recharts component
  exportable?: boolean      // botao export CSV/PNG
}
```

#### StatusBadge

Badge com cor automatica baseada no status.

```typescript
interface StatusBadgeProps {
  status: 'planejado' | 'em_pesquisa' | 'em_redacao' | 'em_revisao' | 'publicado' | 'monitorado'
  size?: 'sm' | 'md' | 'lg'
}
```

Mapeamento de cores definido internamente — cada status tem cor fixa para consistencia visual.

#### ScoreGauge

Indicador circular de progresso/score.

```typescript
interface ScoreGaugeProps {
  value: number        // 0-100
  maxValue?: number    // padrao 100
  label: string        // "SEO Score"
  size?: 'sm' | 'md' | 'lg'
  showPercentage?: boolean
}
```

**Visual:** Circulo SVG com arco preenchido proporcionalmente. Cor automatica: vermelho (< 40), amarelo (40-70), verde (> 70). Valor centralizado no circulo.

#### AgentActivityItem

Item individual do feed de atividades dos agentes.

```typescript
interface AgentActivityItemProps {
  agentName: string     // "Agente Redator"
  agentIcon: LucideIcon // PenTool
  action: string        // "Redigiu artigo sobre dentista em Curitiba"
  timestamp: Date
  status?: 'success' | 'processing' | 'error'
}
```

#### StepProgress

Indicador de progresso do onboarding.

```typescript
interface StepProgressProps {
  totalSteps: number    // 11
  currentStep: number   // 5
  completedSteps: number[]
  estimatedTimeRemaining?: string // "~8 minutos"
}
```

**Visual:** Linha horizontal com circulos para cada etapa. Circulos preenchidos (completas), meio preenchido animado (atual), vazios (pendentes). Conectados por linhas.

---

## Stack UI Completa

| Biblioteca | Versao | Uso |
|---|---|---|
| **Next.js** | 15.x | Framework React com App Router, SSR, ISR |
| **React** | 19.x | Biblioteca de UI |
| **TypeScript** | 5.x | Tipagem estatica |
| **Tailwind CSS** | 4.x | Estilos utilitarios, design tokens |
| **Shadcn/UI** | latest | Componentes base acessiveis |
| **Recharts** | 2.x | Graficos (area, line, bar, pie, radar) |
| **Lucide React** | latest | Biblioteca de icones |
| **React Hook Form** | 7.x | Gerenciamento de formularios |
| **Zod** | 3.x | Validacao de schemas (integrado com RHF) |
| **Supabase Realtime** | latest | Updates em tempo real via WebSocket |
| **react-markdown** | latest | Renderizacao de Markdown no detalhe de conteudo |
| **date-fns** | 3.x | Formatacao e manipulacao de datas |
| **nuqs** | latest | Query string state management |

---

## Padroes de Codigo Frontend

### Estrutura de Pastas

```
src/
├── app/                    → Rotas (Next.js App Router)
│   ├── (public)/           → Rotas publicas
│   ├── (auth)/             → Rotas autenticadas
│   └── api/                → Route handlers
├── components/
│   ├── ui/                 → Shadcn/UI components
│   ├── layout/             → Header, Sidebar, Footer
│   ├── charts/             → ChartPanel, wrappers Recharts
│   ├── cards/              → MetricCard, ContentCard
│   ├── forms/              → Formularios compostos
│   └── shared/             → StatusBadge, ScoreGauge, etc.
├── lib/
│   ├── supabase/           → Cliente e queries
│   ├── utils.ts            → Helpers (cn, formatDate, etc.)
│   └── validations/        → Schemas Zod
├── hooks/                  → Custom hooks
├── types/                  → Tipos TypeScript
└── styles/
    └── globals.css         → Tailwind directives + tokens
```

### Convencoes

- **Componentes:** PascalCase, um componente por arquivo
- **Hooks:** camelCase, prefixo `use` (ex: `useProject`, `useMetrics`)
- **Tipos:** PascalCase, sufixo `Props` para props de componentes
- **Arquivos:** kebab-case para nomes de arquivo (ex: `metric-card.tsx`)
- **Imports:** Path aliases com `@/` (ex: `@/components/ui/button`)

### Data Fetching

- **Server Components** (padrao): Fetch direto no componente com `async/await`
- **Client Components** (interativos): SWR ou React Query para cache e revalidacao
- **Realtime:** Supabase Realtime subscriptions para updates ao vivo (status de agentes, novos conteudos)
- **Forms:** Server Actions para mutacoes simples, Route Handlers para logica complexa

### Performance

- **Images:** `next/image` com otimizacao automatica
- **Fonts:** `next/font` com Inter e JetBrains Mono
- **Code Splitting:** Automatico pelo App Router (cada rota = chunk separado)
- **Lazy Loading:** `dynamic()` para componentes pesados (graficos, editores)
- **ISR:** Paginas do blog com revalidacao a cada 60 segundos
- **Prefetch:** Links com prefetch automatico (navegacao instantanea)

---

## Responsividade

| Breakpoint | Largura | Comportamento |
|---|---|---|
| Mobile | < 640px | Stack vertical, sidebar como overlay, 1 coluna |
| Tablet | 640-1024px | 2 colunas, sidebar colapsavel |
| Desktop | > 1024px | Layout completo, sidebar aberta |

**Componentes criticos em mobile:**
- Dashboard: cards empilhados, graficos 100% largura
- Tabelas: scroll horizontal ou versao card
- Sidebar: Sheet com gesto de swipe
- Onboarding: full-width, botoes grandes

---

## Acessibilidade

- Todos os componentes Shadcn/UI sao construidos sobre Radix UI (acessiveis por padrao)
- Navegacao por teclado em todos os elementos interativos
- Focus ring visivel (cor `ring`)
- Labels associados a todos os inputs (via `htmlFor`)
- Aria labels em icones e botoes sem texto
- Contraste minimo WCAG AA (4.5:1 para texto, 3:1 para elementos grandes)
- Skip-to-content link no topo de cada layout
- Anuncios de status via `aria-live` regions

---

## Notas Relacionadas

- [[Dashboard do Cliente]] — Detalhamento funcional do dashboard
- [[Site Publico]] — Especificacao completa do site de marketing
- [[Onboarding Automatico]] — Fluxo completo de onboarding
- [[Estrutura de Codigo]] — Organizacao do repositorio
- [[Stack Tecnologica]] — Decisoes de tecnologia
- [[Arquitetura Multi-Agente]] — Sistema de agentes que alimenta a UI
