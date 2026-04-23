---
tipo: sistema
area: Arquitetura
tags: [sistema, estados, state-machine, workflow]
atualizado: 2026-04-23
---

# Estados e Maquinas de Estado

Todas as entidades com ciclo de vida complexo usam maquinas de estado explicitas. Transicoes sao validadas no banco (CHECK constraints) e na camada de aplicacao (Edge Functions). Transicoes invalidas sao rejeitadas.

**Nomenclatura:** todos os status sao em **portugues** para bater 1-a-1 com os CHECK constraints do schema em [[Entidades e Schema - Fase 1 (Onboarding)]] e [[Entidades e Schema - Fase 2 (Conteudo e Publicacao)]].

---

## Conteudo — Pipeline de Conteudo

A maquina de estado mais critica do sistema. Cada conteudo passa por todo o pipeline automaticamente, orquestrado pelos agentes. Status definidos na tabela `conteudos` (Fase 2, Bloco A).

```
                    ┌───────────────────────────────────────────────────┐
                    │                                                   │
                    ▼                                                   │
  ┌────────┐   ┌────────────┐   ┌────────────┐   ┌───────────┐        │
  │ na_fila│──▶│pesquisando │──▶│ escrevendo │──▶│ revisando │        │
  └────────┘   └────────────┘   └────────────┘   └─────┬─────┘        │
                                                       │              │
                                           ┌───────────┤              │
                                           ▼           ▼              │
                                    ┌──────────┐ ┌──────────────────┐ │
                                    │ aprovado │ │ revisao_necessaria│─┘
                                    └─────┬────┘ └──────────────────┘
                                          ▼
                                    ┌────────────┐
                                    │ publicando │
                                    └─────┬──────┘
                                          ▼
                                    ┌────────────┐
                                    │ publicado  │
                                    └─────┬──────┘
                                          ▼
                                    ┌────────────┐
                                    │monitorando │
                                    └────────────┘
```

### Tabela de Transicoes — Conteudo

| De | Para | Gatilho | Agente | Condicoes | Efeitos Colaterais |
|---|---|---|---|---|---|
| `na_fila` | `pesquisando` | Job de pesquisa inicia | [[Agente Pesquisador]] | Cluster definido | Cria `execucoes_agentes` tipo pesquisador |
| `pesquisando` | `escrevendo` | Pesquisa concluida | [[Agente Pesquisador]] | `briefings_conteudo` preenchido | Enfileira escrita |
| `escrevendo` | `revisando` | Escrita concluida | [[Agente Redator]] | `conteudo_markdown` preenchido, `contagem_palavras > 0` | Calcula `pontuacao_seo`, enfileira revisao |
| `revisando` | `aprovado` | Revisao aprova | [[Agente Revisor]] | `pontuacao_seo >= 70`, `pontuacao_aio >= 60` | Enfileira publicacao |
| `revisando` | `revisao_necessaria` | Revisao rejeita | [[Agente Revisor]] | Score abaixo do limiar | Registra feedback, incrementa contador de revisao |
| `revisao_necessaria` | `escrevendo` | Re-escrita inicia | [[Agente Redator]] | Contador de revisao < 3 | Re-enfileira com feedback do revisor |
| `aprovado` | `publicando` | Job de publicacao inicia | [[Agente Publicador]] | `wp_url` configurado no projeto | Cria `execucoes_agentes` tipo publicador |
| `publicando` | `publicado` | Publicacao confirmada | [[Agente Publicador]] | `url_publicada` preenchida | Seta `publicado_em`, enfileira distribuicao |
| `publicado` | `monitorando` | Distribuicao concluida | [[Agente Distribuidor]] | URL acessivel | Agenda monitoramento periodico via [[Agente Monitor]] |

**Regra de seguranca:** se contador de revisao >= 3, o conteudo e escalado para revisao humana (admin) em vez de re-entrar no loop automatico.

---

## ExecucaoAgente — Ciclo de Vida de Jobs

Status definidos na tabela `execucoes_agentes` (Fase 2, Bloco A). 8 estados alinhados com BullMQ + retry com backoff exponencial.

```
  ┌────────┐   ┌────────────┐   ┌────────────┐   ┌───────────┐
  │na_fila │──▶│ atribuido  │──▶│ executando │──▶│ concluido │
  └───┬────┘   └────────────┘   └─────┬──────┘   └───────────┘
      │                                │
      │ cancelado manual               ▼
      ▼                          ┌──────────┐
  ┌──────────┐                   │  falhou  │
  │cancelado │                   └─────┬────┘
  └──────────┘               ┌─────────┤
                             ▼         ▼
              ┌──────────────────────┐  ┌─────────┐
              │  tentando_novamente  │  │  morto  │
              └─────────┬────────────┘  └─────────┘
                        │
                        ▼
                  ┌────────────┐   ┌────────────┐
                  │ executando │──▶│ concluido  │
                  └────────────┘   └────────────┘
```

### Tabela de Transicoes — ExecucaoAgente

| De | Para | Gatilho | Condicoes | Efeitos |
|---|---|---|---|---|
| `na_fila` | `atribuido` | Worker BullMQ pega o job | Worker disponivel | Registra `worker_id` |
| `atribuido` | `executando` | Worker inicia execucao | Claude SDK conectado | Seta `iniciado_em` |
| `executando` | `concluido` | Execucao com sucesso | `saida_json` valido | Seta `concluido_em`, dispara evento downstream |
| `executando` | `falhou` | Erro na execucao | Exception ou timeout | Registra `mensagem_erro`, incrementa `tentativa` |
| `falhou` | `tentando_novamente` | Auto-retry | `tentativa < max_tentativas` (3) | Re-enfileira com backoff exponencial |
| `falhou` | `morto` | Max retries atingido | `tentativa >= max_tentativas` | Notifica admin, registra no log, aguarda intervencao humana |
| `tentando_novamente` | `executando` | Worker reinicia execucao | Worker disponivel | Nova tentativa |
| `na_fila` | `cancelado` | Cancelamento manual | Admin cancela antes de rodar | Remove do BullMQ |

**Backoff exponencial:** retry 1 = 5s, retry 2 = 25s, retry 3 = 125s (5^n segundos).

---

## Organizacao — Ciclo de Vida (modelo implementacao + infra mensal)

Referencia: [[VERDADE_UNICA_BUSCOU]] secao 5 + [[Decision Log - 2026-04-23 - Infra Mensal]]. Status definidos na tabela `organizacoes` (Fase 1, Bloco A).

```
 ┌─────────────────┐   ┌──────────────┐   ┌────────────────────┐   ┌────────────────┐
 │ pending_payment │──▶│ implementing │──▶│ live_free_period   │──▶│  live_active   │
 └─────────────────┘   └──────────────┘   │ (mes 1 - incluso)  │   │ (mes 2+)       │
                                          └────────────────────┘   └───────┬────────┘
                                                                           │
                                                                           ▼
                                                                  ┌──────────────────┐
                                                                  │  motor_paused    │◀──┐
                                                                  │ (infra inadimpl. │   │
                                                                  │  ou cancelada)   │   │
                                                                  └───────┬──────────┘   │
                                                                          │              │
                                                    regularizacao infra   │              │
                                                          ──────────────▶ │              │
                                                                          ▼              │
                                                                  (retorna para          │
                                                                   live_active)          │
                                                                          │              │
                                                          6+ meses sem regularizar       │
                                                                          ▼              │
                                                                  ┌──────────────┐       │
                                                                  │   archived   │───────┘
                                                                  └──────────────┘
```

### Tabela de Transicoes — Organizacao

| De | Para | Gatilho | Efeitos |
|---|---|---|---|
| `pending_payment` | `implementing` | Webhook `checkout.session.completed` (implementacao paga a vista ou primeira parcela) | Cria `compras`, `parcelas_implementacao` (se 12x) e `assinaturas_infra` (status `pending_start`). Dispara onboarding. |
| `pending_payment` | (ficar em `pending_payment`) | Falha no checkout | Cliente retenta |
| `implementing` | `live_free_period` | Blog subiu + motor ativo (≤7d) | Libera pipeline de conteudo completo; mes 1 incluso. |
| `live_free_period` | `live_active` | Cron mensal detecta D+30 (fim do mes 1) → `assinaturas_infra` passa de `pending_start` para `active` + primeira cobranca de R$ 300 confirmada | Infra mensal passa a ser cobrada normalmente |
| `live_active` | `motor_paused` | Evento `motor.pausar_por_inadimplencia` (3 falhas consecutivas da infra) OU cliente cancela infra explicitamente | Interrompe producao de novos artigos; blog e conteudo antigo ficam no ar; notifica cliente |
| `motor_paused` | `live_active` | Evento `motor.retomar_apos_regularizacao` (cliente regulariza cartao) | Retoma pipeline no proximo ciclo |
| `motor_paused` | `archived` | 6+ meses em `motor_paused` sem regularizacao | Arquiva (mantem conteudo publico; para todos os jobs agendados) |
| (qualquer) | `refunded` | Reembolso aprovado (nos primeiros 14 dias, politica [[SLAs e Garantias]]) | Cancela parcelas futuras + cancela subscription da infra + marca organizacao |

### Transicoes independentes — Compra (implementacao)

Status definidos na tabela `compras` (Fase 1, Bloco C).

```
pending_payment ──▶ paid_in_full (a vista)
                 OR paid_partial (parcelado) ──▶ paid_in_full (12a parcela)
                                              └─▶ refunded (em 14 dias)
                                              └─▶ chargeback (contestacao)
```

### Transicoes independentes — AssinaturaInfra

Status definidos na tabela `assinaturas_infra` (Fase 1, Bloco C).

```
pending_start (mes 1) ──▶ active (mes 2+) ──▶ overdue (falha) ──▶ paused_motor (3 falhas)
                                            ──▶ active (regularizacao no proximo ciclo)
                                            ──▶ cancelled (cliente cancela explicitamente)
```

**Notas criticas:**
- `trial` nao existe como status — nao ha teste gratuito. Mes 1 e "free period" incluso na implementacao ja paga (nao e trial).
- `past_due` deu lugar a `overdue` (transiente, durante smart retry) + `paused_motor` (apos 3 falhas).
- `plan_upgraded`/`plan_downgraded` nao existem — nao ha tiers.

---

## Projeto — Ciclo de Vida

Status definidos na tabela `projetos` (Fase 1, Bloco B).

```
  ┌─────────────┐   ┌────────┐
  │ configurando│──▶│ ativo  │
  └─────────────┘   └───┬────┘
                        │
                  ┌─────┴─────┐
                  ▼           ▼
             ┌────────┐  ┌───────────┐
             │pausado │  │ concluido │
             └───┬────┘  └───────────┘
                 │
                 ▼
             ┌────────┐
             │ ativo  │
             └────────┘
```

| De | Para | Gatilho | Efeitos |
|---|---|---|---|
| `configurando` | `ativo` | Wizard concluido (dominio, GSC, nicho) | Dispara keyword research via [[Agente Estrategista]] |
| `ativo` | `pausado` | Admin pausa ou organizacao em `motor_paused` | Para todos os jobs do projeto |
| `pausado` | `ativo` | Admin reativa ou organizacao volta a `live_active` | Re-enfileira jobs pendentes |
| `ativo` | `concluido` | Todos os clusters marcados como completos | Muda para modo somente monitoramento |

---

## SessaoOnboarding — Wizard do Cliente

Status definidos na tabela `sessoes_onboarding` (Fase 1, Bloco B). Maquina simples para rastrear progresso do cliente no wizard.

```
  ┌──────────────┐   ┌──────────┐
  │em_andamento  │──▶│ completo │
  └──────┬───────┘   └──────────┘
         │
         ▼
  ┌──────────────┐
  │  abandonado  │
  └──────────────┘
```

| De | Para | Gatilho | Efeitos |
|---|---|---|---|
| `em_andamento` | `completo` | Cliente finaliza ultima etapa do wizard | Gera `contextos_negocio` v1, dispara evento `onboarding_concluido` |
| `em_andamento` | `abandonado` | Cron de limpeza detecta inatividade > 72h sem nova resposta | [[Agente Suporte]] envia e-mail/WhatsApp de retomada |
| `abandonado` | `em_andamento` | Cliente volta e retoma wizard | Mantem respostas previas, continua do ponto onde parou |

**Sem transicoes reversas de `completo`:** wizard concluido e imutavel; ajustes pos-onboarding sao feitos via tela de configuracao do projeto, nao reabrindo a sessao.

---

## ConversaSuporte — Atendimento ao Cliente

Status definidos na tabela `conversas_suporte` (Fase 1, Bloco D). Maquina que cobre tanto o [[Agente Suporte]] quanto o suporte humano.

```
  ┌────────┐   ┌──────────────┐   ┌────────────┐
  │ aberta │──▶│ em_andamento │──▶│ resolvida  │
  └───┬────┘   └──────┬───────┘   └────────────┘
      │               │
      │               ▼
      │        ┌──────────────┐
      │        │ escalonada   │──▶ (humano assume; volta para em_andamento)
      │        └──────────────┘
      ▼
  ┌────────────┐
  │ resolvida  │ (auto-resposta resolve)
  └────────────┘
```

| De | Para | Gatilho | Efeitos |
|---|---|---|---|
| `aberta` | `em_andamento` | [[Agente Suporte]] pega conversa e responde | Registra primeira `mensagens_suporte` do agente |
| `aberta` | `resolvida` | Resposta automatica resolve de primeira (FAQ match) | Fecha sem escalacao |
| `em_andamento` | `resolvida` | Cliente confirma ou agente resolve e fecha apos 24h de silencio | Seta `fechada_em` |
| `em_andamento` | `escalonada` | Criterio de escalonamento atingido (sentimento negativo, 3+ trocas sem avanco, ou solicitacao explicita de humano) | Seta `escalonada_para_humano = true`, notifica equipe |
| `escalonada` | `em_andamento` | Humano responde e retoma tratamento | Humano continua como responsavel |
| `escalonada` | `resolvida` | Humano fecha | Seta `fechada_em` |

**Criterios de escalonamento:** ver [[Suporte Automatizado]] secao "Criterios de Escalonamento para Humano".

---

## Validacao de Transicoes no Codigo

```typescript
// Exemplo de validacao no Edge Function (conteudos)
const VALID_TRANSITIONS: Record<string, string[]> = {
  'na_fila': ['pesquisando'],
  'pesquisando': ['escrevendo'],
  'escrevendo': ['revisando'],
  'revisando': ['aprovado', 'revisao_necessaria'],
  'revisao_necessaria': ['escrevendo'],
  'aprovado': ['publicando'],
  'publicando': ['publicado'],
  'publicado': ['monitorando'],
};

function podeTransitar(de: string, para: string): boolean {
  return VALID_TRANSITIONS[de]?.includes(para) ?? false;
}
```

Cada maquina acima deve ter sua propria `VALID_TRANSITIONS` na camada de aplicacao, espelhando as tabelas deste documento.

---

Ver [[Eventos e Gatilhos]] para os eventos disparados em cada transicao.
Ver [[Entidades e Schema - Fase 1 (Onboarding)]] e [[Entidades e Schema - Fase 2 (Conteudo e Publicacao)]] para os CHECK constraints no banco.
