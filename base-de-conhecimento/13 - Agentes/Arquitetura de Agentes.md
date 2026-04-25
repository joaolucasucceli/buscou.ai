---
tipo: arquitetura
area: Sistema
tags: [agentes, arquitetura, multi-agente, orquestracao]
atualizado: 2026-04-23
---

# Arquitetura de Agentes

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. Este documento define a arquitetura completa do sistema multi-agente da buscou.ai. Padrao hierarquico com o [[Orquestrador]] como ponto central. Nenhum agente se comunica diretamente com outro — toda comunicacao passa pelo Orquestrador via MCP (Model Context Protocol).

Relacionado: [[Orquestrador]] | [[Inputs dos Agentes]] | [[Objeto Business Context]] | [[Stack Tecnologica]]

---

## V1 — 12 componentes (6 core + 5 complementares + orquestrador)

A V1 da buscou.ai opera com 12 componentes no total:

### 6 agentes core (bloqueadores da V1)

Sem qualquer um deles, o motor nao entrega 90 conteudos/mes. Sao obrigatorios no MVP.

1. **[[Agente Pesquisador]]** — analisa SERP, extrai keywords, perguntas e gaps.
2. **[[Agente Estrategista]]** — organiza clusters e calendario editorial (90 artigos/mes).
3. **[[Agente Redator]]** — produz artigos de 800-1.200 palavras no tom do cliente.
4. **[[Agente Revisor]]** — valida SEO, AIO/answer-first, originalidade, precisao factual.
5. **[[Agente Publicador]]** — publica no CMS do cliente, dispara sitemap e indexacao.
6. **[[Agente Monitor]]** — rastreia ranking, trafego, impressoes, AI Overviews.

### 5 agentes complementares (V1 completa; podem ter escopo reduzido no MVP inicial)

Entram na V1 completa. No MVP inicial (primeiros 10-20 clientes) alguns podem rodar em modo manual/simples:

7. **[[Agente Visual]]** — capa + alt text otimizado. V1 usa Unsplash/Pexels; V1.1 gera com DALL-E 3.
8. **[[Agente Distribuidor]]** — RSS + sitemap + ping GSC (V1); cross-posting em LinkedIn/Medium (V1.2); Reddit/parasite (V2).
9. **[[Agente Suporte]]** — chatbot FAQ operacional 24/7. Escalacao automatica para humano em duvidas fora do escopo.
10. **[[Agente Prospeccao]]** — outbound paralelo (e-mails + LinkedIn) para gerar funil novo. Nao qualifica BANT — apenas gera trafego para a landing.
11. **[[Agente Pagamento]]** — monitor de dois fluxos no gateway (Stripe/Asaas): (a) implementacao (compra unica a vista ou 12 parcelas) e (b) infra mensal (subscription recorrente R$ 300 a partir do mes 2). Smart retry em falhas; 3 falhas consecutivas na infra pausam o motor.

### Orquestrador

12. **[[Orquestrador]]** — coordena todos os agentes, gerencia filas, aplica retries, reporta status.

---

## Agente lead-facing (camada separada do motor)

Alem do motor de 12 componentes acima (que produz 90 conteudos/mes), existe **um agente lead-facing** que opera fora dessa cadeia:

13. **[[Anna Mel - V1 OpenClaw]]** — atende WhatsApp inbound em `+55 27 99696-0847`, qualifica lead, agenda diagnostico via Cal.com API, escala pro Joao quando necessario. **Apresenta-se como atendente humana** (decisao canonica 2026-04-25). Stack: framework OpenClaw + Codex CLI no VPS 72.60.9.128 + UAZapi (gateway WhatsApp) + Cal.com API. Nao faz parte do motor de conteudo — e camada separada de funil/conversao.

A Anna Mel **nao se comunica com o Orquestrador nem com os 11 agentes do motor** — opera em workspace separado. Integracao motor↔Anna fica pra V1.1+ (ex: Anna receber sinais do Monitor sobre ranking pra usar em conversa com lead, ou notificar lead quando primeiro artigo do motor publicar).

---

## Mapa

```
                    +-------------------+
                    |   ORQUESTRADOR    |
                    | (Brain / Router)  |
                    +---------+---------+
                              |
          +--------+----------+----------+--------+----------+
          |        |          |          |        |          |
    [Pesquis.][Estrateg.][Redator][Revisor][Visual][Publicad.]
                                                       |
                                               [Distribuidor]
                                                       |
                                                  [Monitor]
                                                       |
                                                  [Suporte]
                              |
                              +-- [Prospeccao] (paralelo, outbound)
                              +-- [Pagamento]  (paralelo, webhook gateway)
```

**Pipeline principal (producao):** Pesquisador → Estrategista → Redator → Revisor → Visual → Publicador → Distribuidor → Monitor.

**Agentes paralelos:** Prospeccao (outbound novos leads) e Pagamento (financeiro do cliente ja comprado).

**Agente transversal:** Suporte (atende o cliente em qualquer momento).

---

## Padrao arquitetural

Hierarquico com orquestracao central. O Orquestrador e o unico ponto de entrada para jobs. Agentes nao se conhecem entre si — recebem mensagens MCP do Orquestrador.

---

## Framework: Claude Agent SDK + MCP

### Comparativo resumido

| Criterio | CrewAI | LangGraph | Claude Agent SDK |
|---|---|---|---|
| Curva de aprendizado | Baixa | Media | Media |
| Orquestracao | Process types | Grafo dirigido | Tool-use com sub-agentes |
| State persistence | Sequencial | Checkpointing nativo | State via MCP + Postgres |
| Observabilidade | Basica | LangSmith | Tracing nativo |
| MCP nativo | Integracao | Integracao | Nativo |
| Lock-in de modelo | Agnostico | Agnostico | Claude |

### Decisao: Claude Agent SDK

1. **MCP nativo.** Cada agente expoe tools MCP sem adapter intermediario.
2. **Managed Agents** (abr/2026): sandbox isolado, memoria persistente, creds nativas.
3. **Qualidade.** Claude Opus/Sonnet lideram em escrita, analise e raciocinio — core do pipeline.
4. **Lifecycle hooks.** Controle granular de inicio, execucao e teardown.
5. **Custo-beneficio.** Sonnet em agentes operacionais (Publicador, Distribuidor, Pagamento, Suporte, Prospeccao, Visual) e Opus em agentes cognitivos (Estrategista, Pesquisador, Redator, Revisor).

Trade-off: lock-in Claude. Mitigacao: abstracao de camada de agente para permitir swap futuro.

---

## Comunicacao: MCP

Cada agente expoe capacidades como MCP tools. O Orquestrador chama:

```json
{
  "agent": "pesquisador",
  "action": "research_topic",
  "params": {
    "keyword": "clinica de estetica em vitoria",
    "depth": "comprehensive",
    "max_sources": 15
  },
  "callback": "orquestrador/receive_research",
  "timeout_ms": 300000,
  "retry_policy": { "max": 3, "backoff": "exponential" }
}
```

---

## Fluxos

### Fluxo principal — producao de conteudo

```
Orquestrador
  → Pesquisador (SERP, keywords, perguntas, gaps)
    → Estrategista (cluster, calendario, brief do artigo)
      → Redator (artigo 800-1.200 palavras)
        → Revisor (SEO/AIO/answer-first, score >= 75)
          → [APROVADO?]
              SIM → Visual (capa + alt text)
                      → Publicador (CMS + sitemap + GSC)
                        → Distribuidor (RSS + ping; LinkedIn/Medium em V1.2)
                          → Monitor (rastreamento continuo)
              NAO → Redator reescreve com feedback (max 2 ciclos, depois escala humano)
```

Tempo estimado pipeline completo: **25-45 minutos por artigo** (vs. 9-14 horas manual).

### Fluxo paralelo — prospeccao (outbound)

```
Orquestrador (cron diario)
  → Prospeccao
    → busca leads em base publica (Google Maps, CNPJs por segmento)
    → monta e-mail personalizado para cada lead
    → envia via SMTP/SendGrid
    → monitora abertura e resposta
    → resposta positiva → lead entra no funil padrao (landing → checkout)
```

Nao qualifica BANT. Nao agenda reuniao. Apenas leva trafego qualificado para a landing.

### Fluxo paralelo — pagamento

```
Webhook do gateway (Stripe/Asaas)
  → Orquestrador
    → Pagamento
      → A vista (Pix/cartao): confirma → dispara onboarding
      → Parcelado 12x (primeira parcela): confirma → dispara onboarding
      → Parcela subsequente em atraso: smart retry do gateway + notifica cliente
      → Apos 30 dias em aberto: vira dunning humano (nao bloqueia servico por padrao)
```

### Fluxo transversal — suporte

```
Cliente envia mensagem via chat in-app ou WhatsApp
  → Orquestrador
    → Suporte (consulta knowledge base interna + contexto do cliente)
      → resposta em < 30s
      → [RESOLVIDO?]
          SIM → fecha ticket, pede feedback
          NAO → escala para humano (SLA 24h; 4h se critico)
```

---

## Human-in-the-loop

| Decisao | V1 (MVP) | V1.2+ |
|---|---|---|
| Aprovacao de conteudo | Auto-publish se score >= 75. Humano em exceções | Auto-publish padrao, humano so em alertas |
| Call opcional de vendas | Humano sempre (quando cliente pede) | Humano para calls de alto valor; auto-scheduler |
| Suporte tecnico | Escala humano em duvida fora do escopo | Escala humano so em problemas complexos |
| Estrategia editorial | Humano aprova clusters iniciais | Agente propoe, humano aprova trimestralmente |
| Dunning de parcela | Humano assume apos 30 dias em aberto | Totalmente autonomo com alertas |

---

## Metricas por agente

| Agente | Metrica primaria | SLA | Alerta |
|---|---|---|---|
| [[Orquestrador]] | Jobs/hora, taxa de falha | 99.5% uptime | > 3 falhas consecutivas |
| [[Agente Pesquisador]] | Fontes por pesquisa | > 10 fontes | < 5 fontes |
| [[Agente Estrategista]] | Briefs/semana, qualidade | > 90% aprovacao | 2 briefs rejeitados seguidos |
| [[Agente Redator]] | Artigos/dia, score medio | Score > 80 | Score < 70 |
| [[Agente Revisor]] | Taxa aprovacao, tempo | < 10 min/artigo | Revisao > 20 min |
| [[Agente Visual]] | Imagens sem texto embutido, tempo | 100% validas | Falha de geracao |
| [[Agente Publicador]] | Publicacoes sem erro | 100% schema valido | Erro de publicacao |
| [[Agente Distribuidor]] | Canais por artigo | >= 3 plataformas (V1.2+) | Falha em plataforma |
| [[Agente Monitor]] | Precisao de alertas | < 1h para detectar queda | Queda > 10 posicoes |
| [[Agente Suporte]] | FCR, tempo, CSAT | > 85% FCR, < 30s | CSAT < 4.0 |
| [[Agente Prospeccao]] | Taxa de resposta | > 3% abertura | < 1% abertura |
| [[Agente Pagamento]] | Confirmacoes em < 5 min | 100% | Atraso > 15 min |

### Infra

- **Logs**: JSON estruturado em CloudWatch/Datadog.
- **Tracing**: Claude Managed Agents fornece tracing end-to-end nativo.
- **Alertas**: PagerDuty para criticos, Slack para warnings.
- **Dashboard**: Grafana com metricas em tempo real.
- **Health check**: heartbeat a cada 60s.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Runtime | Claude Agent SDK (Managed Agents) |
| Protocolo | MCP |
| Modelos | Claude Opus (cognitivo), Claude Sonnet (operacional) |
| Estado | PostgreSQL (duravel), Redis (cache/filas) |
| Fila de jobs | BullMQ (Node.js) |
| Observabilidade | Datadog + Claude Tracing |
| Alertas | PagerDuty + Slack |
| Infra | AWS (ECS/Fargate isolado por agente) |
| CI/CD | GitHub Actions |

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 7, 8 — ultima verificacao 2026-04-23.*
