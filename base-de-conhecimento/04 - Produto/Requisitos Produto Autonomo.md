---
tipo: produto
area: Requisitos
tags: [produto, autonomo, requisitos, self-service]
atualizado: 2026-04-23
---

# Requisitos Produto Autonomo

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. Este documento define os criterios objetivos de autonomia do motor buscou.ai. Um produto autonomo nao depende de pessoas para operar — ele se explica, se executa, se recupera, se reporta e se escala.

Relacionado: [[Roadmap do Produto]] | [[Arquitetura de Agentes]] | [[Modelo de Negocio]] | [[Fluxo Operacional Completo]]

---

## Os 5 pilares da autonomia

### 1. Self-explanatory (auto-explicativo)

Nenhum cliente deveria precisar perguntar "como funciona". Cada feature se explica.

| Elemento | Implementacao | Prioridade |
|---|---|---|
| Tooltips contextuais | Icone `?` ao lado de cada metrica e acao no [[Dashboard do Cliente]] | V1 |
| Walkthrough interativo | Tour guiado no primeiro login | V1.2 |
| Microcopy explicativo | Cada botao/status com texto sem ambiguidade | V1 |
| Videos de 60s | Loom embutido por secao do dashboard | V1.2 |
| Knowledge base in-app | Busca contextual sem sair do dashboard | V1.2 |
| Empty states uteis | Sem dados → mostrar "o que vai acontecer aqui" | V1 |

**Criterio:** < 5% dos novos clientes abrem ticket de duvida sobre uso na primeira semana.

### 2. Self-executing (auto-executante)

Os 11 agentes definidos em [[Arquitetura de Agentes]] operam 24/7 sem humano. O [[Orquestrador]] gerencia filas, prioridades e dependencias. O pipeline descrito em [[Fluxo Operacional Completo]] roda end-to-end automaticamente.

| Capacidade | Descricao |
|---|---|
| Pipeline continuo | Pesquisador → Estrategista → Redator → Revisor → Visual → Publicador → Distribuidor → Monitor sem pausa |
| Scheduling inteligente | Calendario editorial auto-gerado (90/mes), publicacoes em horarios otimos por nicho |
| Confirmacao de pagamento autonoma | [[Agente Pagamento]] confirma Pix/cartao e dispara onboarding em < 5 min |
| Onboarding self-service | Wizard de 5 passos completa setup sem call (ver [[Onboarding Automatico]]) |
| Relatorios auto-gerados | Mensais criados no dashboard automaticamente |

### 3. Self-healing (auto-recuperavel)

Falhas acontecem. Um produto autonomo resolve sem acordar ninguem. Ver detalhamento em [[Tratamento de Falhas]].

- **Retry automatico**: 3 tentativas com backoff exponencial para toda API call.
- **Circuit breaker**: API externa falha > 5x em 10 min → para de chamar por 5 min + usa cache.
- **Job recovery**: [[Orquestrador]] detecta job travado, mata e reagenda.
- **Data consistency**: verificacao periodica entre Supabase e estado dos agentes.
- **Auto-restart**: agente que crasha reinicia em 30s.

### 4. Self-reporting (auto-reportavel)

Sistema gera reports sem ninguem pedir.

| Report | Frequencia | Destinatario | Formato |
|---|---|---|---|
| Relatorio SEO/AIO do cliente | Mensal (dia 5) | Cliente | Dashboard + resumo e-mail |
| Health check dos agentes | A cada 60s | Sistema interno | Grafana |
| Metricas de negocio | Diario | Admin | Slack |
| Alerta de anomalia | Real-time | Admin + cliente (se aplicavel) | Slack + e-mail + in-app |
| Relatorio trimestral de ROI | Trimestral | Cliente | Dashboard (baseado em [[ROI para Cliente]]) |

### 5. Self-scaling (auto-escalavel)

Novo cliente = zero configuracao manual.

- **Landing → pagamento → projeto criado → agentes configurados**: tudo via webhooks do gateway + Supabase (ver [[Arquitetura do Sistema]]).
- **Multi-tenant nativo**: RLS no PostgreSQL isolando cada `org_id`.
- **Recursos elasticos**: BullMQ distribui jobs entre workers. Mais clientes = mais workers (horizontal).
- **Volume fixo por cliente**: 90 conteudos/mes, sem tiers — capacidade do sistema dimensionada por volume total (ver [[Jornada Interna]]).

---

## Dependencia humana residual

Meta: reduzir a cada versao.

| Processo | V1 (MVP) | V1.2+ | V2 | Justificativa |
|---|---|---|---|---|
| Call opcional de venda | Humano (quando cliente pede) | Humano para deals altos; auto-scheduler | Humano so em enterprise | Confianca pessoal ainda importa em tickets altos |
| Revisao de conteudo | Auto-publish se score >= 75 | Auto-publish + sampling 10% humano | Humano so em edge cases | Revisor amadurece com dados |
| Suporte complexo | Humano em escalacao | Humano em tier 2+ | Humano em tier 3 apenas | [[Agente Suporte]] melhora com historico |
| Decisoes estrategicas de produto | Fundador | Fundador | Fundador | Direcao de negocio e humana |
| Bugs criticos | Dev | Dev | Dev | Codigo precisa de humano |
| Dunning de parcela (12x) apos 30 dias | Humano | Humano | Automatico (com alerta) | Conversao financeira sensivel |

---

## Autonomy score por feature

Escala 1-5 (1 = 100% manual, 5 = 100% autonomo).

| Feature | V1 | V1.2 | V2 (meta) |
|---|---|---|---|
| Onboarding | 3 | 4 | 5 |
| Pesquisa de keywords | 4 | 5 | 5 |
| Estrategia de conteudo | 3 | 4 | 5 |
| Redacao | 3 | 4 | 5 |
| Revisao | 3 | 4 | 5 |
| Visual (imagens) | 3 | 4 | 5 |
| Publicacao | 4 | 5 | 5 |
| Distribuicao | 3 (V1 tecnica) | 4 (LinkedIn/Medium) | 5 (Reddit/comunidades) |
| Monitoramento | 3 | 4 | 5 |
| Suporte | 2 | 3 | 4 |
| Prospeccao (outbound) | 3 | 4 | 5 |
| Pagamento (confirmacao + parcelas 12x) | 4 | 5 | 5 |
| Relatorios | 3 | 4 | 5 |
| **Media** | **3,2** | **4,1** | **4,8** |

**Meta V2: autonomy score medio >= 4,5 (90%+ autonomo).**

---

## Como medir autonomia na pratica

1. **Intervencao humana por cliente/mes**: meta V2 < 15 min/cliente.
2. **Jobs completados sem escalacao**: % que terminam sem alerta humano. Meta: > 95%.
3. **Tickets resolvidos pelo [[Agente Suporte]]**: > 85% em V2.
4. **Onboardings completos sem assistencia**: > 90% em V2.
5. **Pagamentos confirmados sem intervencao**: > 98%.
6. **Parcelas do 12x recuperadas via smart retry do gateway**: > 80%.

---

## Notas relacionadas

- [[O que Automatizar vs Humano]]
- [[Tratamento de Falhas]]
- [[Onboarding Automatico]]
- [[Dashboard do Cliente]]
- [[Suporte Automatizado]]
- [[Roadmap do Produto]]
- [[Unit Economics]]

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 5, 7, 8 — ultima verificacao 2026-04-23.*
