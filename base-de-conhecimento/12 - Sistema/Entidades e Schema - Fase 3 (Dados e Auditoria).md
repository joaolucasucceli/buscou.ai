---
tipo: sistema
area: Database
tags: [sistema, entidades, schema, banco, postgresql, supabase, fase-3, eventos, relacionamentos, indices, auditoria]
atualizado: 2026-04-23
---

# Entidades e Schema — Fase 3 (Dados, Eventos, Relacionamentos, Auditoria)

> Terceira fase do schema. Cobre a camada transversal: diagrama de relacionamentos de todas as tabelas, tabela de eventos do sistema (event-driven), indices recomendados, e quando usar JSONB vs colunas estruturadas.
>
> **Pre-requisitos:** Fase 1 ([[Entidades e Schema - Fase 1 (Onboarding)]]) e Fase 2 ([[Entidades e Schema - Fase 2 (Conteudo e Publicacao)]]) precisam estar implementadas — este arquivo referencia todas as tabelas das duas fases.
>
> **Relacao com outras notas:** [[Eventos e Gatilhos]] detalha o catalogo completo de eventos e seus consumidores. Este arquivo mantem apenas o schema da tabela `eventos_sistema` e um sumario do catalogo.

---

## Diagrama de Relacionamentos (todas as tabelas)

```
organizacoes
├── perfis_organizacao (1:1)
├── localizacoes (1:N)
├── servicos (1:N)
├── publico_alvo (1:N)
├── diferenciais (1:N)
├── concorrentes (1:N)
├── sessoes_onboarding (1:N)
├── respostas_onboarding (1:N)
├── contextos_negocio (1:N — versionado)
├── integracoes (1:N)
├── projetos (1:N)
│   ├── palavras_chave (1:N)
│   ├── briefings_conteudo (1:N)
│   │   └── conteudos (1:1)
│   │       ├── versoes_conteudo (1:N)
│   │       │   └── imagens_conteudo (1:N)
│   │       │       └── derivados_imagem (1:N)
│   │       └── ponteiro_publicado (1:1)
│   ├── metricas_snapshots (1:N)
│   └── citacoes_ia (1:N)
├── execucoes_agentes (1:N)
├── compras (1:N)
│   └── parcelas_implementacao (1:N se metodo = parcelado_12x)
│       └── tentativas_cobranca (1:N)
├── assinaturas_infra (1:1 tipicamente)
│   └── tentativas_cobranca (1:N)
└── conversas_suporte (1:N)
    └── mensagens_suporte (1:N)
```

---

## Indices Recomendados

```sql
-- Busca por organizacao (multi-tenant)
CREATE INDEX idx_projetos_org ON projetos(organizacao_id);
CREATE INDEX idx_conteudos_projeto ON conteudos(projeto_id);
CREATE INDEX idx_conteudos_status ON conteudos(status);
CREATE INDEX idx_palavras_chave_projeto ON palavras_chave(projeto_id);
CREATE INDEX idx_execucoes_org ON execucoes_agentes(organizacao_id);
CREATE INDEX idx_execucoes_status ON execucoes_agentes(status);
CREATE INDEX idx_citacoes_projeto ON citacoes_ia(projeto_id);
CREATE INDEX idx_metricas_projeto_data ON metricas_snapshots(projeto_id, data_snapshot);
CREATE INDEX idx_contextos_org_versao ON contextos_negocio(organizacao_id, versao DESC);
CREATE INDEX idx_conversas_org ON conversas_suporte(organizacao_id);

-- Pagamentos
CREATE INDEX idx_compras_org ON compras(organizacao_id);
CREATE INDEX idx_compras_status ON compras(status);
CREATE INDEX idx_parcelas_compra ON parcelas_implementacao(compra_id);
CREATE INDEX idx_parcelas_vencimento ON parcelas_implementacao(data_vencimento) WHERE status = 'scheduled';
CREATE INDEX idx_assinaturas_infra_org ON assinaturas_infra(organizacao_id);
CREATE INDEX idx_assinaturas_infra_status ON assinaturas_infra(status);
CREATE INDEX idx_tentativas_parcela ON tentativas_cobranca(parcela_id);
CREATE INDEX idx_tentativas_infra ON tentativas_cobranca(assinatura_infra_id);

-- Busca por GIN para JSONB
CREATE INDEX idx_contexto_json ON contextos_negocio USING GIN(contexto_json);
CREATE INDEX idx_briefing_json ON briefings_conteudo USING GIN(briefing_json);
```

---

## Quando Usar JSONB vs Colunas Estruturadas

| Usar JSONB quando | Usar colunas quando |
|---|---|
| Formato pode mudar muito | Formato e estavel e previsivel |
| Dados sao "bolsa" de informacao | Precisa filtrar/ordenar por esse campo |
| Nao precisa de FK | Precisa de relacionamento com outra tabela |
| E input/output de agente | E metrica que precisa de agregacao |

**JSONB neste schema:**
- `contextos_negocio.contexto_json` — flexivel, agentes leem inteiro
- `respostas_onboarding.valor_json` — respostas brutas de formato variado
- `briefings_conteudo.briefing_json` — briefing pode ter estruturas diferentes
- `execucoes_agentes.entrada_json / saida_json` — cada agente tem I/O diferente
- `integracoes.metadados_json` — metadados especificos por provedor
- `mensagens_suporte.metadados_json` — dados extras por mensagem
- `versoes_conteudo.faq_json / schema_json / plano_visual_json` — estruturas flexiveis que acompanham cada versao editorial

---

## Eventos do Sistema (Event-Driven)

Eventos sao o que transforma o banco de dados em automacao real. Cada evento dispara uma acao automatica via [[Orquestrador]].

### Tabela

```sql
CREATE TABLE eventos_sistema (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizacao_id UUID REFERENCES organizacoes(id),
  tipo_evento TEXT NOT NULL,
  dados_json JSONB,
  processado BOOLEAN DEFAULT false,
  criado_em TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_eventos_tipo ON eventos_sistema(tipo_evento);
CREATE INDEX idx_eventos_pendentes ON eventos_sistema(processado) WHERE processado = false;
```

### Catalogo de Eventos (completo)

Nomenclatura em **portugues** (padrao `entidade.acao_no_passado`). Todos os eventos que o schema persiste em `eventos_sistema`:

#### Organizacao (7)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `organizacao.criada` | Webhook `checkout.session.completed` da implementacao | Cria organizacao em `implementing`, projeto inicial, dispara onboarding |
| `organizacao.ativada` | Blog no ar + motor ativo (≤7d) | Transita para `live_free_period` (mes 1 incluso) |
| `organizacao.mes_1_encerrado` | Cron D+30 | Transita para `live_active`, ativa subscription de infra |
| `organizacao.motor_pausado` | 3 falhas consecutivas da infra OU cancelamento | Transita para `motor_paused`, pipeline para, blog fica no ar |
| `organizacao.motor_retomado` | Cobranca regularizada | Volta para `live_active` |
| `organizacao.arquivada` | 6+ meses em `motor_paused` | Transita para `archived`, cancela jobs |
| `organizacao.reembolsada` | Reembolso nos primeiros 14 dias | Cancela parcelas futuras, cancela subscription |

#### Projeto (5)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `projeto.criado` | Admin cria projeto | Inicia wizard |
| `projeto.configurado` | Wizard concluido | Dispara pesquisa de keywords |
| `projeto.pausado` | Admin pausa OU organizacao em `motor_paused` | Para `execucoes_agentes` pendentes |
| `projeto.reativado` | Admin reativa OU organizacao volta a `live_active` | Re-enfileira jobs |
| `projeto.concluido` | Todos os clusters completos | Modo monitoramento |

#### Onboarding (2)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `onboarding_concluido` | Cliente finaliza ultima etapa do wizard | Gera `contextos_negocio` v1, dispara [[Agente Estrategista]] |
| `onboarding.abandonado` | Cron detecta inatividade > 72h | [[Agente Suporte]] envia retomada |

#### Palavras-Chave (4)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `palavras_chave.pesquisadas` | Estrategista conclui | Cria clusters, enfileira briefs |
| `palavras_chave.cluster_criado` | Cluster definido | Enfileira pesquisa de concorrentes |
| `palavras_chave.posicao_alterada` | Monitor detecta mudanca >= 5 posicoes | Registra historico, atualiza dashboard |
| `palavras_chave.posicao_caiu` | Queda > 10 posicoes | Alerta admin, enfileira analise |

#### Conteudo — Pipeline (12)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `conteudo.enfileirado` | Orquestrador agenda peca | Cria em `conteudos` com `na_fila` |
| `conteudo.pesquisa_iniciada` | Worker pega job de pesquisa | Muda para `pesquisando` |
| `conteudo.briefing_pronto` | Pesquisador conclui | Cria `briefings_conteudo`, enfileira escrita |
| `conteudo.escrita_iniciada` | Worker pega job de escrita | Muda para `escrevendo` |
| `conteudo.escrito` | Redator conclui | Muda para `revisando`, calcula scores |
| `conteudo.revisao_iniciada` | Worker pega job de revisao | Muda para `revisando` |
| `conteudo.aprovado` | Revisor aprova | Muda para `aprovado`, enfileira publicacao |
| `conteudo.revisao_necessaria` | Revisor rejeita | Muda para `revisao_necessaria`, re-enfileira escrita |
| `conteudo.revisao_escalonada` | Contador de revisao >= 3 | Notifica admin |
| `conteudo.publicando` | Worker pega job de publicacao | Publica no WordPress |
| `conteudo.publicado` | `url_publicada` recebida | Seta `publicado_em`, dispara distribuicao |
| `conteudo.distribuido` | Distribuidor conclui | Registra canais |

#### Monitoramento SEO + AIO (7)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `ranking.verificado` | Cron diario (06:00 UTC) | Consulta GSC + Ahrefs |
| `ranking.caiu` | Queda significativa | Analise + re-otimizacao |
| `ranking.melhorou` | Melhora > 10 posicoes | Atualiza melhor posicao |
| `citacao.verificada` | Cron semanal | Consulta Otterly + LLMrefs |
| `citacao.ganha` | Nova citacao em IA | Registra, notifica cliente |
| `citacao.perdida` | Citacao removida | Registra, enfileira analise |
| `citacao.concorrente_ganhou` | Concorrente ganhou citacao | Sugere otimizacao |

#### Pagamento — Implementacao (5)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `compra.confirmada` | Webhook `checkout.session.completed` (tipo=implementacao) | Cria `compras`, dispara `organizacao.criada` |
| `parcela.paga` | Webhook `invoice.payment_succeeded` (tipo=parcela_implementacao) | Atualiza `parcelas_implementacao` |
| `parcela.falhou` | Webhook `invoice.payment_failed` (tipo=parcela_implementacao) | Smart retry, **motor NAO pausa** |
| `parcela.recuperada` | Pagamento recuperado apos falha | Marca como `recovered` |
| `compra.quitada` | 12a parcela OU a vista confirmado | `paid_in_full` |

#### Pagamento — Infra Mensal (6)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `infra.assinatura_iniciada` | Cron D+30 ativa subscription | `assinaturas_infra.status = active` |
| `infra.cobranca_paga` | Webhook `invoice.payment_succeeded` (tipo=infra_mensal) | Reseta `falhas_consecutivas = 0` |
| `infra.cobranca_falhou` | Webhook `invoice.payment_failed` (tipo=infra_mensal) | Incrementa `falhas_consecutivas`, smart retry |
| `motor.pausar_por_inadimplencia` | `falhas_consecutivas = 3` | Pausa motor, blog fica no ar |
| `motor.retomar_apos_regularizacao` | Cobranca recuperada apos pausa | Retoma publicacoes |
| `infra.cancelada` | Cliente cancela subscription | `cancelled`, dispara `organizacao.motor_pausado` |

#### Outros Financeiros (2)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `pagamento.reembolsado` | Webhook `charge.refunded` | Cancela parcelas/subscription |
| `chargeback.aberto` | Webhook `charge.dispute.created` | Pausa motor, prepara evidencias |

#### Suporte (4)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `suporte.ticket_criado` | Cliente abre ticket | Tenta resolver via RAG |
| `suporte.auto_resolvido` | Resposta automatica resolve | Fecha ticket |
| `suporte.escalonado` | Agente nao resolve | Notifica humano |
| `suporte.humano_resolveu` | Humano fecha ticket | Adiciona a KB |

#### Relatorio (4)

| Evento | Disparado quando | Acao automatica |
|---|---|---|
| `relatorio.pendente` | Cron mensal (dia 1, 09:00 UTC) | Gera relatorios |
| `relatorio.gerado` | PDF pronto | Armazena, enfileira envio |
| `relatorio.enviado` | Enviado por email + WhatsApp | Registra canais |
| `relatorio.visualizado` | Cliente acessa dashboard | Registra engajamento |

**Total:** 58 eventos em 10 dominios.

**Consumidores + formato do payload por evento:** ver [[Eventos e Gatilhos]].

### Como Funciona

```
Evento criado → eventos_sistema (processado=false)
    ↓
Orquestrador poll a cada 5s (ou via Supabase Realtime)
    ↓
Identifica tipo → despacha para agente correto
    ↓
Marca processado=true
```

Detalhes da orquestracao em [[Orquestrador]] e [[Eventos e Gatilhos]].

---

## Ordem de Implementacao Geral (consolidada)

Consolidacao das ordens de implementacao das 3 fases:

| Semana | Tabelas | Objetivo |
|---|---|---|
| **1** | `organizacoes`, `perfis_organizacao`, `localizacoes`, `servicos`, `publico_alvo`, `diferenciais`, `concorrentes` | Identidade do cliente (Fase 1 — Bloco A) |
| **2** | `sessoes_onboarding`, `respostas_onboarding`, `contextos_negocio`, `integracoes`, `projetos` | Onboarding funcional (Fase 1 — Bloco B) |
| **3** | `compras`, `parcelas_implementacao`, `assinaturas_infra`, `tentativas_cobranca`, `eventos_sistema` | Pagamento + base event-driven (Fase 1 — Bloco C + Fase 3) |
| **4** | `conversas_suporte`, `mensagens_suporte` | Suporte automatizado (Fase 1 — Bloco D) |
| **5-6** | `palavras_chave`, `briefings_conteudo`, `conteudos`, `execucoes_agentes`, `metricas_snapshots` | Pipeline de conteudo (Fase 2 — Bloco A) |
| **7** | `versoes_conteudo`, `ponteiro_publicado`, `imagens_conteudo` | Versionamento editorial + midia (Fase 2 — Bloco C) |
| **8+** | `citacoes_ia`, `derivados_imagem` | Monitoramento de IA + thumbnails (V2+) |

---

## Notas Relacionadas

- [[Entidades e Schema - Fase 1 (Onboarding)]] — identidade, pagamento, suporte
- [[Entidades e Schema - Fase 2 (Conteudo e Publicacao)]] — pipeline, conteudos, midia, metricas
- [[Eventos e Gatilhos]] — catalogo completo de eventos com consumidores
- [[Estados e Maquina de Estado]] — state machines de `organizacoes`, `conteudos`, `compras`, `assinaturas_infra`
- [[Orquestrador]] — processa `eventos_sistema` e despacha agentes
- [[Integracoes Externas]] — webhooks que populam `eventos_sistema`
- [[Permissoes e Roles]] — RLS para multi-tenant
- [[Modulos]] — modulos do sistema que consomem as tabelas
