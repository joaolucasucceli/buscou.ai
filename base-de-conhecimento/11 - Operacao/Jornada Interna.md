---
tipo: operacao
area: Sistema
tags: [operacao, jornada-interna, pipeline, agentes]
atualizado: 2026-04-23
---

# Jornada Interna — Pipeline de Producao por Cliente

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. Este arquivo documenta o que o sistema executa por tras para cada cliente ativo.

Relacionado: [[Arquitetura de Agentes]] | [[Pipeline]] | [[Orquestrador]] | [[Fluxo Operacional Completo]]

---

## Maquina de estados — ciclo de um conteudo

Cada artigo passa pelos estados:

```
QUEUED → RESEARCHING → WRITING → REVIEWING → APPROVED/REJECTED → IMAGE → PUBLISHING → PUBLISHED → DISTRIBUTING → MONITORING
```

### Detalhamento

| Estado | Executor | Duracao max | Input | Output | Transicao |
|---|---|---|---|---|---|
| `QUEUED` | [[Orquestrador]] | Imediato | Cluster + keyword do calendario editorial | Job na fila | → `RESEARCHING` |
| `RESEARCHING` | [[Agente Pesquisador]] | 1h | Keyword, intent, cluster | Brief (SERP, top 10 concorrentes, perguntas frequentes, dados AI Overview) | → `WRITING` |
| `WRITING` | [[Agente Redator]] | 2h | Brief + tom do cliente | Artigo 800-1.200 palavras, meta, schema sugerido | → `REVIEWING` |
| `REVIEWING` | [[Agente Revisor]] | 1h | Artigo bruto | Score 0-100 + feedback | >=75 → `APPROVED` / <75 → `REJECTED` |
| `REJECTED` | [[Agente Redator]] | 2h | Artigo + feedback | Artigo reescrito | → `REVIEWING` (max 2 ciclos, depois escala humano) |
| `APPROVED` | [[Orquestrador]] | Imediato | Artigo aprovado | Marcado para imagem | → `IMAGE` |
| `IMAGE` | [[Agente Visual]] | 20min | Artigo aprovado | Capa + alt text otimizado | → `PUBLISHING` |
| `PUBLISHING` | [[Agente Publicador]] | 30min | Artigo + capa + credencial CMS | URL publicada, sitemap, indexacao via GSC | → `PUBLISHED` |
| `PUBLISHED` | [[Agente Distribuidor]] | 1h | URL + metadados | Feeds atualizados, cross-posting se V1.2 | → `MONITORING` |
| `MONITORING` | [[Agente Monitor]] | Continuo | URL + keywords | Posicao, trafego, CTR, presenca AI Overview | Loop permanente |

**Tempo medio QUEUED → PUBLISHED: ~6h** (sem rejeicoes).

Cadencia por cliente ativo: **3 artigos/dia × 30 dias = 90 artigos/mes, ~720K caracteres**.

---

## Cadencia mensal por cliente ativo

### Dia 1-2 — Planejamento
- [[Agente Estrategista]] revisa resultados do mes anterior, ajusta clusters, define calendario editorial dos proximos 30 dias.
- [[Agente Pesquisador]] roda pesquisa complementar para oportunidades sazonais ou keywords novas.
- **Output:** calendario com 90 conteudos priorizados.
- **SLA:** calendario pronto ate dia 2.

### Dia 3-28 — Producao
- [[Orquestrador]] distribui jobs conforme calendario.
- [[Agente Redator]] produz em lote (capacidade sistema: 4 artigos/dia por instancia paralela).
- [[Agente Revisor]], [[Agente Visual]], [[Agente Publicador]] rodam em paralelo conforme artigos ficam prontos.
- [[Agente Distribuidor]] distribui cada publicacao em < 4h.

### Dia 29-30 — Relatorio
- [[Agente Monitor]] compila dados do mes.
- Sistema gera relatorio automatico no dashboard.
- [[Agente Pagamento]] verifica status de parcelas (para clientes no parcelado 12x). Nao ha cobranca recorrente — nao existe renovacao automatica na venda unica.

---

## Fluxo unico (sem distincao por tier)

A oferta e unica. Nao ha Starter/Growth/Scale. Todo cliente ativo recebe:

| Recurso | Entrega |
|---|---|
| Conteudos/mes | 90 (3/dia) |
| Palavras por artigo | 800-1.200 |
| Caracteres/mes | ~720.000 |
| Pesquisa de keyword | Continua (por cluster) |
| Revisao de estrategia | Mensal automatica |
| Monitoramento | Diario |
| Relatorio | Dashboard em tempo real + resumo mensal |
| Suporte | IA 24/7 + humano em duvidas escaladas (SLA 24h) |
| Slots de producao | 3 artigos/dia garantidos |

Nao ha upgrade nem downgrade. Se o cliente precisar de mais volume, isso e tratado como oferta futura (V1.2+) e nao bloqueia V1.

---

## Capacidade do sistema

Cada instancia do [[Agente Redator]] via Claude Agent SDK produz ~4 artigos/dia com qualidade aprovada pelo [[Agente Revisor]].

Para atender **100 clientes ativos simultaneamente** (meta operacional pos-V1):

- 100 clientes × 90 artigos/mes = 9.000 artigos/mes.
- 9.000 artigos/mes ÷ ~22 dias uteis = ~410 artigos/dia.
- ~410 ÷ 4 por instancia = **~100 instancias paralelas do Redator**.

Custo de tokens proporcional ao volume. Otimizacao via prompt caching, batching e reuso de briefs por cluster.

---

## Job queue — tabela `content_jobs` (Supabase)

| Campo | Tipo | Descricao |
|---|---|---|
| `id` | UUID | Identificador |
| `project_id` | UUID | FK para projeto do cliente |
| `status` | ENUM | `queued, researching, writing, reviewing, rejected, approved, image, publishing, published, distributing, monitoring` |
| `priority` | INT | FIFO dentro do projeto; fair-scheduling entre projetos |
| `keyword` | TEXT | Keyword alvo |
| `cluster_id` | UUID | FK para cluster |
| `assigned_agent` | TEXT | ID da instancia |
| `attempts` | INT | Tentativas de revisao |
| `quality_score` | FLOAT | Score da ultima revisao |
| `created_at` | TIMESTAMP | Criacao |
| `updated_at` | TIMESTAMP | Ultima mudanca |
| `published_url` | TEXT | URL final |
| `error_log` | JSONB | Erros |

**Escalacao:** jobs com `attempts >= 2` e `status = rejected` vao para fila humana com alerta.

---

## Tratamento de erros — cenarios criticos

### 1. Redator produz qualidade baixa (score < 75)
- **Deteccao:** [[Agente Revisor]] atribui score < 75.
- **Acao:** volta para `WRITING` com feedback. `attempts += 1`.
- **Escalacao:** apos 2 rejeicoes, fila humana + alerta no dashboard admin.
- **Prevencao:** se taxa de rejeicao > 30% em um nicho, recalibrar prompts.

### 2. Publicador falha
- **Deteccao:** timeout ou erro HTTP no CMS do cliente.
- **Acao:** 3 retries com backoff (1, 5, 15 min).
- **Escalacao:** [[Agente Suporte]] avisa cliente para verificar credenciais.
- **Impacto:** conteudo fica em `APPROVED`. Nao bloqueia demais jobs.

### 3. API de keywords indisponivel
- **Acao:** fallback para GSC + scraping de SERP.
- **Impacto:** atraso de 24h. Prioriza jobs de cluster critico.

### 4. Orquestrador trava
- **Deteccao:** health check a cada 60s.
- **Acao:** restart automatico. Se falhar 3x em 5 min, alerta critico para admin.
- **Resolucao:** < 15 min restart, < 1h intervencao humana.

### 5. Parcela do cliente falha (parcelado 12x)
- **Deteccao:** webhook do gateway.
- **Acao:** [[Agente Pagamento]] notifica o cliente (e-mail + WhatsApp) e gateway dispara retry automatico (Stripe smart retry / Asaas).
- **Impacto em 0-15 dias:** nenhum — pipeline continua publicando (a compra ja foi feita, parcelamento e financeiro).
- **Impacto em 15+ dias:** se todas as tentativas falham e cliente nao responde, o caso vira dunning humano. Nao interrompe servico por padrao (compra unica ja paga parcialmente cobre custo operacional).

---

## Dashboards internos (admin)

1. **Fila de jobs:** jobs por status, por cliente, gargalos.
2. **Health dos agentes:** uptime, tempo medio, taxa de erro por agente.
3. **Qualidade:** score medio, taxa de rejeicao, distribuicao por nicho.
4. **Financeiro:** clientes ativos, caixa recebido, parcelamentos em aberto, conversao landing → cliente.
5. **Alertas:** jobs em fila humana, agentes com erro, SLA estourado.

O [[Orquestrador]] e o coracao do sistema. Ver [[Arquitetura de Agentes]] para detalhes tecnicos.

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 7, 8 — ultima verificacao 2026-04-23.*
