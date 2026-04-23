---
tipo: produto
area: UX
tags: [produto, dashboard, metricas, ux, cliente]
atualizado: 2026-04-23
---

# Dashboard do Cliente

> O dashboard e a janela do cliente para todo o trabalho que os agentes fazem em background. Ele precisa responder 3 perguntas em < 5 segundos: "Meu projeto esta saudavel?", "O que foi publicado?", "Estou melhorando?". Tambem expoe status claro das duas linhas de cobranca (implementacao + infra mensal). Tudo o mais e secundario.

Referencia: [[Agente Monitor]] | [[Agente Pagamento]] | [[Modelo de Negocio]] | [[Suporte Automatizado]]

---

## Arquitetura de Telas

```
+-- Dashboard (Home)
|   +-- Content (Pipeline / Kanban)
|   +-- Rankings (SEO Tracking)
|   +-- AI Visibility (AIO Tracking)
|   +-- Reports (Historico)
|   +-- Settings
|   |   +-- Project Config
|   |   +-- Team Members
|   |   +-- Billing
|   +-- Support (Chat)
```

---

## Tela 1: Home (Visao Geral)

```
+------------------------------------------------------------------+
| [Logo]  Projeto: Clinica Sorriso   [Notificacoes 🔔3]  [Avatar]  |
+------------------------------------------------------------------+
|                                                                    |
|  HEALTH SCORE                                                      |
|  +-----------+   Conteudos este mes: 14/20                        |
|  |           |   Keywords top 10: 23 (+5)                         |
|  |    82     |   Trafego organico: 4.320 (+18%)                   |
|  |   /100    |   Citacoes IA: 7 (+2)                              |
|  |           |                                                    |
|  +-----------+                                                    |
|                                                                    |
|  ATIVIDADE RECENTE                                                |
|  +--------------------------------------------------------------+ |
|  | Hoje 14:30  Publicado: "Implante dentario: guia completo"    | |
|  | Hoje 10:15  Ranking up: "clareamento dental" #8 → #5         | |
|  | Ontem       Distribuido: LinkedIn + Reddit (2 posts)          | |
|  | 20/04       Novo citacao IA: Perplexity citou artigo #12      | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  PROXIMOS CONTEUDOS                                               |
|  +--------------------------------------------------------------+ |
|  | "Protese vs implante" - Em revisao (eta: 6h)                 | |
|  | "Clareamento a laser" - Em pesquisa (eta: 24h)               | |
|  +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**Dados e fontes**:

| Componente | Fonte de Dados | Tabela Supabase | Atualizacao |
|---|---|---|---|
| Health Score | Calculo composto (conteudos + rankings + trafego + AIO) | `project_health` (view materializada) | Diario |
| Conteudos/mes | Contagem de `content_pieces` com `status = published` no mes | `content_pieces` | Real-time (Realtime subscription) |
| Keywords top 10 | [[Google Search Console]] API + [[Ahrefs]] API processados pelo [[Agente Monitor]] | `keyword_rankings` | Diario |
| Trafego organico | GSC API (cliques organicos) | `traffic_metrics` | Diario |
| Citacoes IA | [[Otterly.ai]] API + [[LLMrefs]] API via [[Agente Monitor]] | `ai_citations` | Diario |
| Atividade recente | Eventos do sistema (publicacao, ranking change, distribuicao) | `activity_log` | Real-time |

**Calculo do Health Score** (0-100):
- Conteudos publicados vs meta mensal (90): 25 pontos
- Keywords melhorando vs caindo: 25 pontos
- Trafego organico trend (30 dias): 25 pontos
- Citacoes em IA (presenca): 25 pontos

### Widgets de Progresso Constante (OBRIGATORIOS)

O cliente precisa sentir que o sistema esta TRABALHANDO. SaaS vive de percepcao de progresso.

```
+------------------------------------------------------------------+
| PROGRESSO DESTA SEMANA                                            |
| +------------------------------------------------------------+   |
| | Conteudos publicados    ████████░░ 8/10                    |   |
| | Conteudos em producao   ██████░░░░ 6 em andamento          |   |
| | Distribuicoes feitas    ████░░░░░░ 12 posts (3 plataformas)|   |
| | Ranking medio           ████████░░ #12 (era #18)     ↑6   |   |
| | Presenca IA (IVT)       ██████░░░░ 32% (era 25%)    ↑7pp  |   |
| | Crescimento semanal     ██████████ +22% trafego      ↑     |   |
| +------------------------------------------------------------+   |
+------------------------------------------------------------------+
```

**Regras de UX para progresso**:
1. **Sempre mostrar delta** (variacao): "+5 posicoes", "+7pp presenca", "+22% trafego"
2. **Setas e cores**: verde = subindo, vermelho = caindo, cinza = estavel
3. **Barras de progresso**: para metas mensais (conteudos publicados vs meta de 90/mes)
4. **Atividade em real-time**: cada publicacao, cada ranking change aparece instantaneamente
5. **Notificacoes de conquista**: "Voce foi citado pelo ChatGPT!" (celebrar wins)

**Tabela de dados**:

| Widget | Fonte | Tabela | Update |
|---|---|---|---|
| Conteudos publicados | Contagem content_pieces status=published esta semana | `content_pieces` | Real-time |
| Conteudos em producao | Contagem content_pieces status IN (researching, writing, reviewing) | `content_pieces` | Real-time |
| Distribuicoes | Contagem distribution_logs esta semana | `distribution_log` | Real-time |
| Ranking medio | Media de posicao das keywords monitoradas | `keyword_rankings` | Diario |
| Presenca IA (IVT) | [[North Star Metric]] calculado pelo [[Agente Monitor]] | `ai_citations` | Semanal |
| Crescimento semanal | % variacao trafego WoW via GSC | `traffic_metrics` | Diario |

---

## Tela 2: Content (Pipeline View)

```
+------------------------------------------------------------------+
| CONTEUDO    [Kanban]  [Lista]  [Calendario]    Filtro: [Todos ▼]  |
+------------------------------------------------------------------+
|                                                                    |
| PESQUISA    | REDACAO     | REVISAO     | PUBLICADO   | DISTRIB.  |
| (3)         | (2)         | (1)         | (14)        | (12)      |
|             |             |             |             |            |
| +--------+  | +--------+ | +--------+  | +--------+  | +-------+ |
| |Protese |  | |Clarear | | |Implant |  | |Guia    |  | |Guia   | |
| |vs imp. |  | |caseiro | | |preco   |  | |compl.  |  | |compl. | |
| |eta:24h |  | |eta:12h | | |score:78|  | |22/04   |  | |LI+RE  | |
| +--------+  | +--------+ | +--------+  | +--------+  | +-------+ |
|             |             |             |             |            |
+------------------------------------------------------------------+
```

**Dados**: Tabela `content_pieces` com campo `status` (enum: `researching`, `writing`, `reviewing`, `published`, `distributed`). Real-time via Supabase Realtime subscriptions.

**Detalhamento ao clicar**: titulo, keyword alvo, SEO score, AIO score, URL publicada, datas de cada etapa, logs do [[Agente Revisor]].

---

## Tela 3: Rankings (SEO Tracking)

```
+------------------------------------------------------------------+
| RANKINGS    Periodo: [Ultimos 30 dias ▼]    Exportar: [CSV]      |
+------------------------------------------------------------------+
|                                                                    |
| EVOLUCAO DE POSICOES                                              |
| pos                                                               |
|  1 |          ___________                                          |
|  5 |     ____/                                                     |
| 10 |____/                                                          |
| 20 |                                                               |
|    +-----+-----+-----+-----+                                      |
|     sem1  sem2  sem3  sem4                                         |
|                                                                    |
| TOP MOVERS                                                        |
| +--------------------------------------------------------------+ |
| | ↑ "implante dentario preco"   #12 → #5  (+7)   Vol: 2.400   | |
| | ↑ "clareamento dental SP"     #18 → #11 (+7)   Vol: 1.100   | |
| | ↓ "dentista zona sul"         #4 → #7   (-3)   Vol: 880     | |
| | = "melhor dentista SP"        #3 → #3   (=)    Vol: 3.200   | |
| +--------------------------------------------------------------+ |
|                                                                    |
| DISTRIBUICAO POR POSICAO                                          |
| Top 3: 4 keywords | Top 10: 23 | Top 20: 47 | Top 100: 89       |
+------------------------------------------------------------------+
```

**Dados**: `keyword_rankings` table com historico de posicao por keyword por dia. Graficos via Recharts/Nivo (Next.js). Dados do [[Google Search Console]] API + [[Ahrefs]] API processados pelo [[Agente Monitor]].

---

## Tela 4: AI Visibility (AIO Tracking)

```
+------------------------------------------------------------------+
| VISIBILIDADE IA    Periodo: [Ultimos 30 dias ▼]                   |
+------------------------------------------------------------------+
|                                                                    |
| CITACOES POR PLATAFORMA                                           |
| +------------------+---+---+---+---+                              |
| | ChatGPT          | 3 citacoes    |                              |
| | Perplexity       | 2 citacoes    |                              |
| | Google AI Over.  | 4 citacoes    |                              |
| | Claude           | 1 citacao     |                              |
| +------------------+---+---+---+---+                              |
|                                                                    |
| QUERIES QUE CITAM VOCE                                            |
| +--------------------------------------------------------------+ |
| | "qual o preco medio de implante dentario"                     | |
| |   → ChatGPT, Perplexity | Artigo: Guia Completo Implante     | |
| | "clareamento dental funciona?"                                | |
| |   → Google AI Overview | Artigo: Clareamento Dental 2026     | |
| +--------------------------------------------------------------+ |
|                                                                    |
| SHARE OF VOICE IA (vs concorrentes)                              |
| Voce: 12% | Concorrente A: 18% | Concorrente B: 8%               |
+------------------------------------------------------------------+
```

**Dados**: `ai_citations` table. Fontes: [[Otterly.ai]] para AI Overviews, [[LLMrefs]] para ChatGPT/Perplexity/Claude. Implementacao propria no V3 para reduzir custo conforme [[Unit Economics]]. Framework de monitoramento definido em [[Framework AIO Completo]] e [[Otimizacao para ChatGPT e Perplexity]].

---

## Tela 5: Reports

Arquivo de relatorios mensais gerados automaticamente pelo [[Agente Monitor]].

| Dado | Fonte | Formato |
|---|---|---|
| Relatorio mensal SEO | `reports` bucket Supabase Storage | PDF (download) |
| Relatorio mensal AIO | `reports` bucket | PDF |
| Historico de reports | Lista ordenada por data | In-app viewer |

Template proprio de relatorio mensal gerado automaticamente pelo [[Agente Monitor]] ate dia 5 de cada mes — estrutura: resumo de 90 artigos publicados + keywords ranqueando + citacoes em IA + trafego organico + comparativo mensal.

---

## Tela 6: Settings

- **Project Config**: Nicho, tom de voz, keywords seed, concorrentes (editavel, [[Agente Estrategista]] reprocessa ao salvar)
- **Team Members**: Convidar colegas com roles (viewer, editor, admin). Auth via Supabase Auth com claims de `org_id` e `role`
- **Billing** (duas secoes explicitas):
  - **Implementacao**: status (a vista quitada / parcela N de 12 em aberto), historico de parcelas, data da proxima cobranca (se 12x).
  - **Infra mensal**: status (`pending_start` mes 1 / `active` / `overdue` / `motor_paused` / `cancelled`), historico de cobrancas, proxima cobranca, botao para atualizar cartao, botao para pausar infra (cliente escolhe pausar voluntariamente).
  - **Sem upgrade/downgrade** — modelo e unico.
  - Portal do gateway embedado via Customer Portal (Stripe) ou equivalente (Asaas).

---

## Tela 7: Support (Chat)

Widget de chat no canto inferior direito, powered by [[Agente Suporte]].

- Acesso a knowledge base, dados do projeto, FAQ
- Historico de conversas persistente
- Escalacao para humano com SLA unico: 24h (questoes nao criticas) / 4h (critico: blog fora do ar, motor parado). Ver [[SLAs e Garantias]].
- CSAT survey automatico apos resolucao
- Ver detalhamento completo em [[Suporte Automatizado]]

---

## Stack de UI

| Componente | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router, Server Components) |
| UI Library | Shadcn/UI + Tailwind CSS |
| Graficos | Recharts ou Nivo |
| Real-time | Supabase Realtime (WebSocket subscriptions) |
| Chat widget | Custom (React) + [[Agente Suporte]] API |
| PDF viewer | react-pdf |
| Deploy | Vercel Edge |

---

## Notas Relacionadas

- [[Requisitos Produto Autonomo]]
- [[Onboarding Automatico]]
- [[Suporte Automatizado]]
- [[Agente Monitor]]
- [[Agente Pagamento]]
- [[Modelo de Negocio]]
- [[Arquitetura do Sistema]]
- [[Frontend]] — Rotas, layouts e design system do frontend
