---
tipo: arquitetura
area: Sistema
tags: [agente, anna-mel, openclaw, whatsapp, uazapi, calcom, v1, persona-humana]
atualizado: 2026-04-25
---

# Anna Mel — V1 OpenClaw (atendente humana de WhatsApp da Buscou)

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]] §8 + [[Decision Log - 2026-04-24 - Arquitetura Anna Mel OpenClaw]] + [[Decision Log - 2026-04-25 - Anna Mel pivota humana]]. Este documento descreve a arquitetura, persona, escopo e stack operacional da Anna Mel V1 — o **primeiro agente IA em producao do buscou.ai**, atendendo WhatsApp pelo numero canonico `+55 27 99696-0847`.

Relacionado: [[Arquitetura de Agentes]] | [[Decision Log - 2026-04-25 - Anna Mel pivota humana]] | [[Decision Log - 2026-04-24 - Arquitetura Anna Mel OpenClaw]]

---

## O que ela é

A **Anna Mel** e a primeira ponte entre quem chega curioso sobre a Buscou e o time humano (Joao + Vitoria). Ela:

- **Atende WhatsApp inbound** no numero canonico `+55 27 99696-0847`.
- **Apresenta-se como atendente humana** (decisao canonica de 2026-04-25 — ver [[Decision Log - 2026-04-25 - Anna Mel pivota humana]]). Nao admite ser IA. Tem ficha de vivencia: mora em Vitoria/ES, trabalha no escritorio com os socios, gosta de cafe.
- **Qualifica leve** o lead (ICP check, dores, contexto do negocio).
- **Agenda reuniao de diagnostico** com o Joao via Cal.com API (skill `calcom-api`) — pode remarcar e cancelar diretamente enquanto pre-reuniao.
- **Escala pro Joao** quando lead sai do script (perguntas internas, agressividade, fora de escopo, pos-reuniao).
- **Nao vende, nao envia Payment Link, nao faz cobranca** — quem fecha e o Joao na reuniao.

**Diferenca vs os 11 agentes do motor de conteudo** ([[Arquitetura de Agentes]]): a Anna Mel **nao faz parte do motor** (que produz 90 conteudos/mes). Ela e uma camada separada, lead-facing, focada em conversao no WhatsApp.

---

## Stack operacional

```
WhatsApp (lead) 
     ↓
UAZapi instance (5527996960847, hospedado em producao.uazapi.com)
     ↓ webhook
Cloudflare Tunnel "openclaw-poc" (uazapi.buscouai.com → 127.0.0.1:3100)
     ↓
uazapi-bridge.service (Node.js, /root/uazapi-bridge/server.mjs no VPS)
     ├─ Auth: 5 forms aceitas (Bearer, x-openclaw-webhook-secret, x-webhook-token / token, querystring ?k=, path /webhook/<secret>)
     ├─ Normalizacao de shape (UAZapi v2: { EventType, message, chat })
     ├─ Filtros com observabilidade (drop_event, drop_msg com reason)
     ├─ Debounce in-memory 20s + buffer por chatid (Map<chatid, BufferState>)
     ├─ Composing presence imediato + refresh em 10s
     └─ Spawn `openclaw agent --agent anna-mel --to <num> --channel whatsapp --message <prompt>`
     ↓
openclaw-gateway.service (systemd --user, embedded gateway na porta 18789)
     ↓ Codex CLI (gpt-5.4-mini) executa o agente
     ├─ Bootstrap: 9 MDs em /root/.openclaw/workspace/agents/anna-mel/
     │  (IDENTITY, SOUL, KNOWLEDGE, SCENARIOS, TOOLS, USER, AGENTS, MEMORY, HEARTBEAT)
     ├─ Skills disponiveis: uazapi (envio WhatsApp), calcom-api (agendamento), presence
     └─ Memoria: shared/outputs/anna-mel/<numero>-<YYYYMMDD>.md
     ↓
Skill `uazapi` chama POST https://producao.uazapi.com/send/text com chatid + texto
     ↓
Mensagem volta no WhatsApp do lead.
```

**VPS:** `root@72.60.9.128`. Tunnels Cloudflare ativos: `openclaw.buscouai.com` (dashboard) + `uazapi.buscouai.com` (webhook bridge).

---

## Os 9 MDs da persona

Em `/root/.openclaw/workspace/agents/anna-mel/` (espelhados em `agentes/anna-mel/` no repo). Limite hardcoded do framework: **12.000 chars por arquivo**.

| Arquivo | Tamanho | Funcao |
|---|---|---|
| `IDENTITY.md` | 3.7 KB | Quem e Anna: nome, vibe, vinculo com a Buscou |
| `SOUL.md` | 10.7 KB | Alma — missao, valores, tom de voz, ficha de vivencia, anti-padroes, sistema de seguranca (resumo) |
| `KNOWLEDGE.md` | 11.8 KB | Verdade canonica da Buscou inline (produto, modelo comercial, ICP, linguagem, convencao anti-auto-link) |
| `SCENARIOS.md` | 11.9 KB | 10 cenarios tipicos + Cenario bonus E (sistema de seguranca anti-exposicao com 7 padroes de defesa) |
| `TOOLS.md` | 7.9 KB | Skills disponiveis (uazapi, calcom-api), 5 operacoes Cal.com (slots/create/reschedule/cancel/list), env vars, headers por endpoint |
| `USER.md` | 3.9 KB | Joao Lucas Ucceli (CEO, unico aprovador de cupom, timezone America/Sao_Paulo) e Vitoria (co-vendas, paridade) |
| `AGENTS.md` | 5.4 KB | Convencoes do workspace OpenClaw (memory por daily note, flush, startup) |
| `MEMORY.md` | 8.6 KB | Seed de fatos estaveis (precos canonicos, timeline, ICP, regras canonicas) |
| `HEARTBEAT.md` | 1.5 KB | Heartbeat (V1 minimal — 30min 08h-22h SP, sem tarefas recorrentes ativas) |

**Quando o gateway carrega o agent**, le os 9 MDs e injeta no contexto da Codex CLI. Se um MD passa de 12k chars, o framework trunca silenciosamente — por isso o SOUL original foi splittado em SOUL+KNOWLEDGE+SCENARIOS em 2026-04-24.

---

## Sistema de seguranca anti-exposicao (Cenario E)

A Anna **nao pode ser exposta como IA**. Existem 7 padroes de tentativa que ela cobre, com resposta-modelo canonica em [`SCENARIOS.md` Cenario bonus E](../../agentes/anna-mel/SCENARIOS.md):

| Tentativa | Defesa canonica |
|---|---|
| **E1** — *"voce e IA?"* / *"e bot?"* / *"e ChatGPT?"* | Nega firme, leve, redireciona ("nao kkk sou pessoa, por que da pergunta?") |
| **E2** — *"manda audio"* / *"manda voz"* | Politica WhatsApp-so-texto + 1a camada amigavel ("microfone quebrado", "to em reuniao") |
| **E3** — *"me liga"* / *"liga aqui"* | Mesma politica WhatsApp-so-texto |
| **E4** — *"manda foto sua"* / *"se mostra"* | Recusa por bom senso ("nao tenho obrigacao de fazer isso") |
| **E5** — *"qual seu CPF?"* / dados pessoais intimos | Recusa direta ("nao posso passar, nao te diz respeito") |
| **E6** — *"que dia hoje pra voce?"* / vivencia | Responde natural usando ficha (Vitoria/ES, escritorio, cafe) |
| **E7** — *"manda audio que eu sei diferenciar"* | Nao morde a isca; mantem politica + redireciona |

**Principio:** recuso o que humano de bom senso recusaria. Nao nego tecnicamente "ser bot" — me recuso a fazer coisas que nao sao parte do meu trabalho.

---

## Convencao anti-auto-link da marca

WhatsApp transforma `buscou.ai` em link clicavel apontando pra dominio inexistente (`https://buscou.ai`). Dominio real e `buscouai.com`. Por isso, ao escrever a marca em corpo de mensagem:

- **Preferido:** `Buscou` (capitalizado, vira nome proprio)
- **Aceito informal:** `buscou ai` (com espaco, sem ponto)
- **URL explicita:** `buscouai.com` ou `https://www.buscouai.com`
- **Nunca em corpo:** `buscou.ai` cru

---

## Escopo V1 (o que ela FAZ e o que NAO faz)

### Faz na V1

- Recebe WhatsApp inbound em `+55 27 99696-0847`.
- Apresenta-se como atendente humana (sem admissao IA).
- Qualifica leve (ICP, contexto, dor).
- Responde duvidas canonicas (`KNOWLEDGE.md` inline) — sem expor preco, sempre redireciona pra reuniao.
- Agenda / remarca / cancela reuniao de diagnostico via Cal.com API (5484425, slug `diagnostico-buscouai`, 30 min, Cal Video, agenda 24/7).
- Mantem composing ("digitando...") durante debounce de 20s.
- Coalescencia de rajadas: 4 msgs em < 20s viram 1 turno.
- Escala pro Joao quando: lead agressivo, fora de escopo, pergunta interna, pos-reuniao realizada, tentativa de aprofundar vivencia minha.
- Logs com observabilidade total (msg_buffered, drain_start, drain_done, drop_msg com reason).

### NAO faz na V1 (V1.1+)

- Suporte a cliente ativo (pos-onboarding) — escala pro Joao.
- Regua de cobranca / inadimplencia.
- Envio de Payment Link Stripe pos-aceite de proposta (Joao envia manual em V1).
- Cadencia multi-dia automatica (D-1 lembrete, D+1 follow-up, D+3 educativo, D+7 humano).
- Lembrete pre-reuniao automatizado.
- Analise de imagens (Vision).
- Recebimento/transcricao de audio (Whisper) — politica canonica WhatsApp-so-texto.
- Fazer/aceitar ligacao — mesma politica.
- Aprendizado continuo de FAQ em banco.
- Webhook Cal.com → reacao a mudancas feitas fora do chat.

Quando lead pede algo da lista "nao faz", redireciono ou escalo pro Joao.

---

## Cal.com — config canonica

| Campo | Valor |
|---|---|
| Username | `buscou.ai` |
| Schedule ID | `1473049` ("Atendimento 24/7 buscou.ai", seg-dom 00:00-23:59 America/Sao_Paulo) |
| Event Type ID | `5484425` |
| Event Type slug | `diagnostico-buscouai` |
| Duracao | 30 min |
| Location | Cal Video (Daily.co) |
| minimumBookingNotice | 60 min |
| Booking URL fallback | `https://cal.com/buscou.ai/diagnostico-buscouai` |

**Atencao critica — quirk do reschedule:** `POST /v2/bookings/{uid}/reschedule` **retorna UID novo**. O antigo fica orfao. A Anna **atualiza o UID na daily note** apos cada reagendamento, senao cancel futuro da 404.

**Headers Cal.com v2 — versao varia por endpoint:**
- `/v2/schedules` → `cal-api-version: 2024-06-11`
- `/v2/event-types` → `cal-api-version: 2024-06-14`
- `/v2/slots` → `cal-api-version: 2024-09-04`
- `/v2/bookings` (inclui reschedule/cancel) → `cal-api-version: 2024-08-13`

---

## UAZapi — config canonica

| Campo | Valor |
|---|---|
| Server URL | `https://producao.uazapi.com` |
| Instance Token | `5ce95deb-9337-4bec-8259-0983d3cbf84e` |
| Numero conectado | `5527996960847` |
| Webhook URL | `https://uazapi.buscouai.com/webhook/<secret>` (path-secret) |
| Webhook events | `["messages"]` |
| excludeMessages | `["wasSentByApi", "isGroupYes"]` |

**Quirks aprendidos em prod:**
- UAZapi v2 envia payload com `EventType` (E maiusculo) e `message` (singular), NAO `event` + `data`. Bridge normaliza ambos shapes.
- UAZapi NAO envia auth header no webhook dispatch (apesar do campo `token` no config). Bridge usa path-secret URL.
- Convencao `isGroupYes` (com `Yes` no fim) — descoberto via auditoria do projeto Dr. Lucas Felipe.

---

## Bridge `uazapi-bridge.service` — server.mjs (~16 KB)

**Componentes:**

1. **Auth** — 5 forms aceitas (Bearer header, x-openclaw-webhook-secret, x-webhook-token / token, querystring ?k=, path-secret).
2. **Normalizacao de shape** — aceita UAZapi v2 (`EventType` + `message`) e formato antigo (`event` + `data`).
3. **Filtros com observabilidade total** — todo drop loga `drop_event` ou `drop_msg` com `reason` (event_not_messages, fromMe, wasSentByApi, isGroup, no_text, no_chatid). **Nunca 204 silencioso.**
4. **Debounce + buffer in-memory** — `Map<chatid, BufferState>`. DEBOUNCE_MS=20000, COMPOSING_REFRESH_MS=10000. Cada nova msg do mesmo chat reseta o timer (sliding debounce).
5. **Composing presence** — sinaliza "digitando..." imediato + refresh em 10s.
6. **Spawn agent** — `openclaw agent --agent anna-mel --to <num> --channel whatsapp --message <prompt>`. Prompt construido por `buildPrompt({senderName, chatid, messageid, text, batchSize})` com bullets canonicos: postura humana inegociavel, anti-auto-link, "automatizado" so pra motor.

**ACK imediato (200 + queued:true)** pro UAZapi nao timeoutar. Processamento async via debounce.

**Backup files no VPS (history):**
- `server.mjs.bak-preBAI111` (pre-fix shape v2)
- `server.mjs.bak-preBAI111-fix` (pre-fix auth)
- `server.mjs.bak-preDebounce` (pre-debounce + buffer)
- `server.mjs.bak-preHumanPivot` (pre-pivot persona humana)

---

## Decision Logs canonicos relacionados

- [[Decision Log - 2026-04-24 - Arquitetura Anna Mel OpenClaw]] — pivot da stack: de Next.js/Supabase/Redis pra OpenClaw + Codex CLI no VPS. Escopo reduzido MVP. Adendo (noite): Cal.com API com remarcacao/cancelamento direto pela Anna pre-reuniao.
- [[Decision Log - 2026-04-25 - Anna Mel pivota humana]] — **Nivel 1**. Anna deixa de admitir IA, passa a se apresentar como atendente humana. Trade-offs LGPD/brand explicitamente aceitos. Sistema de seguranca anti-exposicao em SCENARIOS.md Cenario E.
- [[Decision Log - 2026-04-24 - Reversao Track 1]] — Anna mantem o fluxo unico consultivo; sem self-service.
- [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]] — cupom Stripe e do Joao, nunca da Anna. Anna nunca aprova nem sugere desconto.

---

## Roadmap V1.1+

Fora do escopo desta V1, planejado pra proximas iteracoes:

| Item | Prioridade | Notas |
|---|---|---|
| Regua D-1 lembrete pre-reuniao | Alta | requer cron/heartbeat ativo + query bookings futuros |
| Cadencia D+1/D+3/D+7 pos-reuniao | Alta | follow-up de proposta. Stateful scheduling. |
| Webhook Cal.com → Anna | Alta | reagir a remarcacoes feitas pelo lead direto na UI Cal.com |
| Envio de Payment Link Stripe pos-aceite | Media | hoje Joao envia manual |
| Regua mensal infra (D-3 avisa, D0 cobra) | Media | apos primeira venda real |
| Cal Video transcript integration | Media | resumo da reuniao de volta pra Anna pos-call |
| Vision (analise de imagem) | Baixa | escopo separado, lead pode mandar foto do site/produto |
| Whisper (transcricao audio) | NAO | politica canonica WhatsApp-so-texto contradiz |
| Aprendizado continuo de FAQ em banco | Baixa | requer Supabase ou storage custom |
| Multi-instance (HA) | Baixa | hoje single-instance no VPS; debounce in-memory perde state em restart |
| Jitter de delay (anti-detector via timing) | Media | pra dificultar deteccao por timing analysis |

---

## Status operacional (2026-04-25)

- ✅ Persona V1 canonica em producao (humana, anti-IA, sistema de seguranca, anti-auto-link)
- ✅ E2E validado: lead manda WhatsApp → Anna responde no WhatsApp
- ✅ Debounce 20s validado (rajada de 4 msgs vira 1 turno coerente)
- ✅ Cal.com API integrada (slots/create/reschedule/cancel)
- ✅ Decision Logs canonicos publicados
- ✅ Branch `feature/BAI-119-anna-mel-v1-openclaw` em PR #1 aguardando review
- ✅ Memory global (proximas sessoes Claude respeitam pivot humana)

**Numero canonico:** `+55 27 99696-0847` — operante 24/7 (Anna atende seg-sab 8h-22h, fora desse horario ainda responde mas com politica "vou chamar o Joao quando ele voltar").
