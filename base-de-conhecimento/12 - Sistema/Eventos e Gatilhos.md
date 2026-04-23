---
tipo: sistema
area: Arquitetura
tags: [sistema, eventos, gatilhos, triggers, webhooks]
atualizado: 2026-04-23
---

# Eventos e Gatilhos

Arquitetura orientada a eventos. Cada mudanca significativa no sistema emite um evento que pode disparar uma ou mais acoes. Eventos sao processados via BullMQ (async) ou Supabase Realtime (sync para UI).

**Nomenclatura:** todos os nomes de eventos estao em **portugues** (padrao `entidade.acao_no_passado`) para bater 1-a-1 com os status de [[Estados e Maquina de Estado]] e os CHECK constraints do schema. Eventos com `metadata` discriminam sub-tipos (ex: `parcela_implementacao` vs `infra_mensal`).

---

## Tabela Completa de Eventos

### Eventos de Organizacao

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `organizacao.criada` | Webhook `checkout.session.completed` da implementacao | Cria organizacao (status `implementing`), user admin, projeto inicial, registro de `compras` + `assinaturas_infra` em `pending_start` | Sistema |
| `organizacao.ativada` | Blog no ar + motor ativo (≤7d) | Organizacao transita para `live_free_period` (mes 1 incluso) | [[Orquestrador]] |
| `organizacao.mes_1_encerrado` | Cron detecta D+30 apos ativacao | Organizacao transita para `live_active`; Agente Pagamento ativa subscription da infra no gateway | [[Agente Pagamento]] |
| `organizacao.motor_pausado` | 3 falhas consecutivas na cobranca da infra OU cancelamento explicito da infra | Organizacao transita para `motor_paused`; pipeline e interrompido; blog continua no ar | [[Agente Pagamento]] + [[Orquestrador]] |
| `organizacao.motor_retomado` | Cliente regulariza infra | Organizacao volta para `live_active`; pipeline retoma no proximo ciclo | [[Agente Pagamento]] |
| `organizacao.arquivada` | 6+ meses em `motor_paused` sem regularizacao | Organizacao transita para `archived`; jobs sao cancelados; blog fica publico mas sem atualizacoes | Sistema |
| `organizacao.reembolsada` | Reembolso aprovado (primeiros 14 dias) | Cancela parcelas futuras, cancela subscription da infra, marca como `refunded` | [[Agente Pagamento]] |

**Removidos deste modelo (nao existem mais):** `organizacao.trial_iniciado`, `organizacao.trial_expirando`, `organizacao.trial_expirado`, `organizacao.plano_aumentado`, `organizacao.plano_rebaixado`. Ver [[Decision Log - 2026-04-23 - Infra Mensal]].

### Eventos de Projeto

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `projeto.criado` | Admin cria projeto no dashboard | Inicia wizard de configuracao | Sistema |
| `projeto.configurado` | Wizard concluido (dominio, GSC, nicho) | Enfileira job de estrategia de keywords | [[Orquestrador]] |
| `projeto.pausado` | Admin pausa OU organizacao em `motor_paused` (infra inadimplente) | Para todas as `execucoes_agentes` pendentes do projeto | Sistema |
| `projeto.reativado` | Admin reativa OU organizacao volta a `live_active` | Re-enfileira jobs que estavam pausados | [[Orquestrador]] |
| `projeto.concluido` | Todos os clusters em status complete | Muda para monitoramento continuo apenas | Sistema |

### Eventos de Palavras-Chave e Estrategia

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `palavras_chave.pesquisadas` | [[Agente Estrategista]] completa pesquisa | Cria clusters, prioriza keywords, enfileira briefs | [[Orquestrador]] |
| `palavras_chave.cluster_criado` | Cluster definido com pillar + supports | Enfileira pesquisa de concorrentes para o cluster | [[Orquestrador]] |
| `palavras_chave.posicao_alterada` | [[Agente Monitor]] detecta mudanca >= 5 posicoes | Registra em historico, atualiza dashboard | Sistema |
| `palavras_chave.posicao_caiu` | Monitor detecta queda > 10 posicoes | Alerta admin, enfileira analise de causa | [[Orquestrador]] |

### Eventos de Conteudo (Pipeline Principal)

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `conteudo.enfileirado` | Orquestrador agenda nova peca | Cria registro em `conteudos` com status `na_fila` | [[Orquestrador]] |
| `conteudo.pesquisa_iniciada` | Worker pega job de pesquisa | Muda status para `pesquisando` | [[Agente Pesquisador]] |
| `conteudo.briefing_pronto` | Pesquisador completa pesquisa | Cria `briefings_conteudo`, muda para `escrevendo`, enfileira escrita | [[Orquestrador]] |
| `conteudo.escrita_iniciada` | Worker pega job de escrita | Muda status para `escrevendo` | [[Agente Redator]] |
| `conteudo.escrito` | Redator completa escrita | Muda para `revisando`, calcula `pontuacao_seo`, enfileira revisao | [[Orquestrador]] |
| `conteudo.revisao_iniciada` | Worker pega job de revisao | Muda status para `revisando` | [[Agente Revisor]] |
| `conteudo.aprovado` | Revisor aprova conteudo | Muda para `aprovado`, enfileira publicacao | [[Orquestrador]] |
| `conteudo.revisao_necessaria` | Revisor rejeita conteudo | Muda para `revisao_necessaria`, re-enfileira escrita com feedback | [[Orquestrador]] |
| `conteudo.revisao_escalonada` | Contador de revisao >= 3 | Notifica admin para revisao humana | Sistema |
| `conteudo.publicando` | Worker pega job de publicacao | Publica no WordPress via REST API | [[Agente Publicador]] |
| `conteudo.publicado` | Publicacao confirmada (wp_post_id recebido) | Seta `publicado_em`, enfileira distribuicao e indexacao | [[Orquestrador]] |
| `conteudo.distribuido` | Publicacao em redes sociais concluida | Registra canais, atualiza dashboard | [[Agente Distribuidor]] |

### Eventos de Monitoramento (SEO + AIO)

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `ranking.verificado` | Cron diario (06:00 UTC) | Consulta GSC + Ahrefs, atualiza posicoes | [[Agente Monitor]] |
| `ranking.caiu` | Monitor detecta queda significativa | Enfileira analise e possivel otimizacao do conteudo | [[Orquestrador]] |
| `ranking.melhorou` | Monitor detecta melhora > 10 posicoes | Registra, atualiza melhor posicao | Sistema |
| `citacao.verificada` | Cron semanal (seg 08:00 UTC) | Consulta Otterly + LLMrefs | [[Agente Monitor]] |
| `citacao.ganha` | Monitor detecta nova citacao em IA | Registra em `citacoes_ia`, notifica cliente por WhatsApp | Sistema |
| `citacao.perdida` | Monitor detecta citacao removida | Registra, enfileira analise de causa | [[Orquestrador]] |
| `citacao.concorrente_ganhou` | Concorrente ganhou citacao que nao tinhamos | Registra, sugere otimizacao | [[Agente Monitor]] |

### Eventos de Pagamento — Implementacao (one-time ou 12 parcelas)

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `compra.confirmada` | Webhook `checkout.session.completed` (metadata: tipo=implementacao) | Cria `compras`, `parcelas_implementacao` (se 12x), dispara `organizacao.criada` | [[Agente Pagamento]] |
| `parcela.paga` | Webhook `invoice.payment_succeeded` (metadata: tipo=parcela_implementacao) | Atualiza `parcelas_implementacao` (status=paid), atualiza `compras` (status=paid_partial ou paid_in_full se parcela 12) | [[Agente Pagamento]] |
| `parcela.falhou` | Webhook `invoice.payment_failed` (metadata: tipo=parcela_implementacao) | Registra tentativa em `tentativas_cobranca`, gateway smart retry. **Motor NAO pausa.** Notifica cliente. | [[Agente Pagamento]] |
| `parcela.recuperada` | Webhook `invoice.payment_succeeded` apos falha | Marca parcela como recovered, cliente normalizou | [[Agente Pagamento]] |
| `compra.quitada` | 12a parcela paga OU pagamento a vista confirmado | `compras.status = paid_in_full`, `compras.quitada_em = now()` | Sistema |

### Eventos de Pagamento — Infra mensal (recurring)

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `infra.assinatura_iniciada` | Cron detecta D+30 do cliente → Pagamento ativa subscription no gateway | `assinaturas_infra.status = active`; primeira cobranca de R$ 300 em seguida | [[Agente Pagamento]] |
| `infra.cobranca_paga` | Webhook `invoice.payment_succeeded` (metadata: tipo=infra_mensal) | Atualiza `assinaturas_infra`, reseta `falhas_consecutivas = 0` | [[Agente Pagamento]] |
| `infra.cobranca_falhou` | Webhook `invoice.payment_failed` (metadata: tipo=infra_mensal) | Incrementa `falhas_consecutivas`, registra em `tentativas_cobranca`, notifica cliente com escala crescente | [[Agente Pagamento]] |
| `motor.pausar_por_inadimplencia` | `falhas_consecutivas = 3` na infra | `assinaturas_infra.status = paused_motor`; dispara `organizacao.motor_pausado` | [[Agente Pagamento]] → [[Orquestrador]] |
| `motor.retomar_apos_regularizacao` | Cobranca de infra bem-sucedida apos `paused_motor` | `assinaturas_infra.status = active`; dispara `organizacao.motor_retomado` | [[Agente Pagamento]] → [[Orquestrador]] |
| `infra.cancelada` | Cliente cancela subscription explicitamente (dashboard ou portal do gateway) | `assinaturas_infra.status = cancelled`; dispara `organizacao.motor_pausado` | [[Agente Pagamento]] |

### Outros eventos financeiros

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `pagamento.reembolsado` | Webhook `charge.refunded` | Registra reembolso, cancela parcelas futuras (se implementacao) OU cancela subscription (se infra) | [[Agente Pagamento]] |
| `chargeback.aberto` | Webhook `charge.dispute.created` | Pausa motor imediatamente, notifica equipe, prepara evidencias | [[Agente Pagamento]] |

**Removidos deste modelo (nao existem mais):** `pagamento.sucesso`/`pagamento.falhou` genericos (substituidos por eventos discriminados acima), `assinatura.cancelada` indiscriminado (substituido por `infra.cancelada`). Ver [[Decision Log - 2026-04-23 - Infra Mensal]].

### Eventos de Suporte

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `suporte.ticket_criado` | Cliente abre ticket (dashboard ou WhatsApp) | Tenta resolver automaticamente via RAG | [[Agente Suporte]] |
| `suporte.auto_resolvido` | Agente Suporte resolve com confianca alta | Fecha ticket, envia resposta ao cliente | [[Agente Suporte]] |
| `suporte.escalonado` | Agente Suporte nao consegue resolver | Notifica equipe humana via WhatsApp/email | Sistema |
| `suporte.humano_resolveu` | Humano resolve e fecha ticket | Adiciona resolucao a knowledge base para futuro | Sistema |

### Eventos de Onboarding

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `onboarding_concluido` | Cliente finaliza ultima etapa do wizard | Gera `contextos_negocio` v1, dispara [[Agente Estrategista]] | Sistema |
| `onboarding.abandonado` | Cron de limpeza detecta inatividade > 72h | [[Agente Suporte]] envia e-mail/WhatsApp de retomada | Sistema |

### Eventos de Relatorio

| Evento | Gatilho | Acao | Agente/Servico |
|---|---|---|---|
| `relatorio.pendente` | Cron mensal (dia 1, 09:00 UTC) | Gera relatorio para todos os projetos ativos | Sistema |
| `relatorio.gerado` | Relatorio PDF pronto | Armazena em Supabase Storage, enfileira envio | Sistema |
| `relatorio.enviado` | Relatorio enviado por email + WhatsApp | Atualiza data de envio, registra canais | Sistema |
| `relatorio.visualizado` | Cliente acessa relatorio no dashboard | Registra analytics de engajamento | Sistema |

---

## Fluxo de Processamento de Eventos

```
Evento emitido
    │
    ▼
┌─────────────────────┐     ┌──────────────────────┐
│ Supabase Realtime   │     │ BullMQ (Redis)       │
│ (UI update sync)    │     │ (async processing)   │
│                     │     │                      │
│ Dashboard recebe    │     │ Worker pega evento   │
│ via WebSocket       │     │ e executa acao       │
└─────────────────────┘     └──────────────────────┘
```

**Dual dispatch:** eventos que atualizam a UI (ex: `conteudo.publicado`) sao enviados tanto para Supabase Realtime (atualizar dashboard em tempo real) quanto para BullMQ (processar proxima etapa do pipeline).

---

## Cron Jobs Periodicos

IDs de cron sao tecnicos (nao sao eventos) e podem permanecer em ingles como identificadores estaveis.

| Job | Frequencia | Horario | Acao |
|---|---|---|---|
| `ranking.check` | Diario | 06:00 UTC | Coleta posicoes de todas as keywords ativas |
| `citation.check` | Semanal | Seg 08:00 UTC | Verifica citacoes em plataformas de IA |
| `report.generate` | Mensal | Dia 1, 09:00 UTC | Gera relatorios para projetos ativos |
| `infra.activate_subscriptions` | Diario | 10:00 UTC | Detecta clientes que completaram D+30 (fim do mes 1) e ativa a subscription da infra mensal no gateway |
| `infra.reconcile` | Diario | 10:30 UTC | Reconciliacao defensiva: consulta gateway para subscriptions com status inconsistente vs banco |
| `cleanup.old_jobs` | Semanal | Dom 02:00 UTC | Arquiva `execucoes_agentes` com mais de 90 dias |

---

Ver [[Estados e Maquina de Estado]] para as transicoes disparadas por cada evento.
Ver [[Modulos]] para os endpoints que emitem esses eventos.
Ver [[Entidades e Schema - Fase 3 (Dados e Auditoria)]] para a tabela `eventos_sistema` onde os eventos sao persistidos.
