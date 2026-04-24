---
tipo: estrategia
area: Agentes
tags: [decision-log, canonico, anna-mel, arquitetura, openclaw, pivot-tecnico]
atualizado: 2026-04-24
aprovacao: Joao Lucas Ucceli — 2026-04-24 (noite, plan mode)
---

# Decision Log — 2026-04-24 — Arquitetura Anna Mel: pivot para OpenClaw no VPS (escopo reduzido MVP)

## Contexto

Em 2026-04-23, apos sessao longa de arquitetura, o dono fechou 14 decisoes canonicas sobre a Anna Mel (primeiro agente IA em producao da buscou.ai). A decisao #6 fixou a stack como **Next.js monolito + OpenAI GPT-4o (Whisper+Vision) + Uazapi + Supabase + Redis**; a decisao #7 fixou a pasta como `/atendimento/` no repo do site. Essas decisoes foram traduzidas em umbrella [BAI-49](https://linear.app/joao-lucas-ucceli/issue/BAI-49) + 5 filhas (BAI-50 a BAI-54) detalhando Decision Log futuro, setup tecnico, constituicao, implementacao e dogfooding.

Em 2026-04-24, em paralelo ao trabalho de limpeza do VPS OpenClaw ([BAI-103](https://linear.app/joao-lucas-ucceli/issue/BAI-103), concluido), o dono decidiu reaproveitar a estrutura do framework **OpenClaw** (npm package open-source `openclaw@2026.4.15` rodando em `root@72.60.9.128`) como base da camada de agentes da buscou.ai, substituindo a arquitetura teorica dos 11 agentes V1 antes definida na [[VERDADE_UNICA_BUSCOU]].

Isso gerou issues novas ([BAI-113](https://linear.app/joao-lucas-ucceli/issue/BAI-113), [BAI-119](https://linear.app/joao-lucas-ucceli/issue/BAI-119), [BAI-110](https://linear.app/joao-lucas-ucceli/issue/BAI-110), [BAI-111](https://linear.app/joao-lucas-ucceli/issue/BAI-111)) em conflito com BAI-49/50/51/52/53/54. A contradicao nao estava formalizada e bloqueava inicio da V1. Durante plan mode em 2026-04-24 (noite), o dono aprovou resolver a contradicao seguindo **Stack A — OpenClaw no VPS com escopo reduzido MVP**.

**Fala do dono registrada:**

> *"A gente vai configurar a AnaMel dentro do OpenCloud. Eu quero só que você deixe os conceitos de memória, o bom funcionamento do OpenCloud e do agente Ana Mel. Tudo que é relacionado a agentes do outro projeto eu não quero, pode remover."* (2026-04-24, noite, execucao BAI-103)

> *"Opcao A — OpenClaw no VPS (escopo reduzido MVP)"* (2026-04-24, noite, plan mode V1 Anna Mel)

**Motivo central:** o VPS ja esta preparado (BAI-103 concluida), framework esta funcional (dashboard em `openclaw.buscouai.com`, tunnel Cloudflare operacional, device pareado, gateway rodando, bridge uazapi codado), e a pressao de tempo do MVP V1 favorece **reusar infra pronta** em vez de implementar do zero em Next.js/Supabase/Redis. O escopo canonico completo (3 contextos, 6 tools, regua 5 msgs, FAQ aprendizado continuo, Cal.com integration profunda, pagina `/recuperacao/`) era grande; para caber no MVP, **reduzimos para 1 contexto (Lead inbound)**, preservando a doc como referencia para V1.1+.

## Decisao anterior

**Canonica vigente ate agora** (revogada parcialmente por este Decision Log):

[[BAI-49 — Umbrella Anna Mel MVP atendimento]] e as **14 decisoes canonicas** fechadas em 2026-04-23:

1. Persona unica Anna Mel (A-N-N-A M-E-L)
2. Tom + voz feminina expressa
3. Escopo fechado (so buscou.ai)
4. Admite ser IA
5. Hibrida com vies humano
6. **Stack: Next.js monolito + OpenAI GPT-4o (Whisper + Vision) + Uazapi + Supabase + Redis** ← revogada
7. **Pasta: `/atendimento/`** ← revogada
8. LGPD by design (consentimento + retencao + esquecimento)
9. Vault prevalece sobre cliente
10. Constituicao versionada git
11. Lead = Anna agenda, nao fecha
12. Cliente ativo = 100% IA (sem escalacao humana)
13. Regua 5 msgs D+1/D+3/D+7/D+14/D+21
14. Contato reativo (lead inicia)

Slide 03 do [[prototipos/anna-mel-arquitetura/index.html|protótipo de arquitetura MVP v2]] descrevia 7 camadas tecnicas (Webhook Uazapi → Buffer Redis 20s → Whisper/Vision → Busca FAQ ILIKE+trigram → Memoria sessao Redis → Constituicao versionada → GPT-4o com 6 tools).

Slide 05 listava as **6 tools canonicas**: `consultar_agenda`, `criar_reuniao`, `remarcar_reuniao`, `cancelar_reuniao`, `registrar_faq_aprendida`, `enviar_link_recuperacao`.

## Nova decisao (canonica — Nivel 1)

### Stack e pasta revogadas

Decisoes canonicas **#6** e **#7** da Anna Mel sao revogadas e substituidas por:

- **Decisao #6 (nova):** Stack da Anna Mel e o framework **OpenClaw** (npm package `openclaw@2026.4.15`) + **Codex CLI** + **UAZapi** rodando no VPS `root@72.60.9.128`. Supabase, Redis e Vercel Cron saem da V1; podem voltar em V1.1+ se houver necessidade documentada.
- **Decisao #7 (nova):** Pasta da Anna Mel e o workspace do framework OpenClaw no VPS: `/root/.openclaw/workspace/agents/anna-mel/`. Persona vive nos 7 MDs do framework (IDENTITY, SOUL, TOOLS, USER, AGENTS, MEMORY, HEARTBEAT). O repo `/atendimento/` nao sera criado na V1.

As **outras 12 decisoes canonicas da Anna Mel (1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14) permanecem intactas** — papel, tom, voz, escopo, admite ser IA, lead = agenda, cliente = 100% IA, regua 5 msgs, contato reativo, LGPD, vault prevalece, constituicao versionada.

### Escopo reduzido V1

A V1 entrega **apenas 1 dos 3 contextos canonicos**: **Lead inbound**.

**V1 faz:**
- Recebe mensagem WhatsApp no numero canonico `+55 27 99696-0847` via `uazapi.buscouai.com` → `uazapi-bridge` → agente `anna-mel` no OpenClaw.
- Responde alinhada aa VERDADE_UNICA (linguagem, posicionamento, modelo comercial).
- Admite ser IA na primeira mensagem.
- Qualifica leve (nicho, cidade, dor).
- Oferece agendamento via **link Cal.com estatico** (colado em TOOLS.md, sem integracao API).
- Escala via **WhatsApp direto pro Joao** quando detectar sinal (fora de escopo, hostilidade, pedido explicito de humano).

**V1 NAO faz (vira V1.1+):**
- Cliente ativo context (FAQ + Vision + `registrar_faq_aprendida`).
- Inadimplente context (regua 5 msgs + link recuperacao + pagina `/recuperacao/{org_id}`).
- Cal.com/Google Calendar integration profunda (`consultar_agenda`, `criar_reuniao`, `remarcar`, `cancelar`).
- Payment Link automation (Anna envia apenas copy-paste do link quando dono manda).
- Cadencia de nutricao multi-dia (D-1, D+1, D+3, D+7) e regua D+27 infra — operacao manual pelo dono/Vitoria.
- LGPD stack completa (`/api/privacy/forget`, retencao automatizada) — V1 tem apenas disclaimer inline na primeira mensagem.
- Vision (leitura de imagens) — skill do framework OpenClaw existe mas nao sera configurada na V1.
- Chunks humanizados (resposta em blocos separados por `---` com delay) — V1 responde em 1 bloco so.

### Fluxo tecnico V1

```
Mensagem WhatsApp → Uazapi (producao.uazapi.com)
  ↓ webhook
https://uazapi.buscouai.com/webhook (Cloudflare tunnel)
  ↓
/root/uazapi-bridge/server.mjs (Node, porta 127.0.0.1:3100)
  ↓ spawn
openclaw agent --agent anna-mel --to <numero> --message "<texto>"
  ↓
openclaw-gateway.service (user systemd, :18789)
  ↓ resolve binding
workspace /root/.openclaw/workspace/agents/anna-mel/
  ↓ carrega persona
Codex CLI com modelo openai/gpt-5.4-mini
  ↓ inference
skill uazapi (send message)
  ↓
UAZapi API → WhatsApp do lead
```

### Como o contexto canonico chega na Anna Mel

**Estrategia:** inline resumido no `SOUL.md` da Anna Mel (decidido em plan mode).

O `SOUL.md` do agente no VPS contera um resumo curado da [[VERDADE_UNICA_BUSCOU]] (seccoes 1-5 produto+modelo, 6 linguagem proibida/permitida, 7 promessa vs entrega, 8 estrutura de venda parte Lead, 11 contato) — ~6k tokens. O vault completo nao sera copiado pro servidor (evita drift e exposicao de decision logs internos).

**Update flow:** quando a VERDADE_UNICA muda, o dono abre issue de sync e edita o `SOUL.md` no VPS manualmente. Nao ha sync automatico na V1.

### Escalacao

Quando a Anna detectar que precisa humano, **envia mensagem direta no WhatsApp do Joao** (decidido em plan mode) via skill `uazapi`. A conversa com o lead pausa ate o Joao responder ao lead diretamente ou orientar a Anna.

Triggers canonicos de escalacao:
- Lead pede explicitamente "quero falar com humano" / "posso falar com alguem"
- Mensagem fora do escopo (ex: "voces fazem app?", "vendem produto X?")
- Tom hostil/agressivo detectado
- Lead pergunta sobre cupom/desconto especifico (so Joao autoriza)
- Anna nao tem confianca suficiente pra responder

## O que NAO muda

- Precos canonicos (R$ 2.500 / R$ 3.000 em 12x / R$ 300/mes) — intactos.
- VERDADE_UNICA nao muda — so e replicada em resumo no SOUL.md da Anna no VPS.
- [[Decision Log - 2026-04-24 - Reversao Track 1]] permanece — fluxo consultivo unico via Cal.com.
- [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]] permanece — cupons aplicados em Payment Link via WhatsApp pos-negociacao; aprovador unico Joao.
- Numero oficial `+55 27 99696-0847` — permanente (ver §11 VERDADE_UNICA).
- As 12 decisoes canonicas da Anna Mel que nao sao stack/pasta (1-5, 8-14) — permanecem.

## Impacto operacional (cascata)

Atualizar no mesmo turno deste Decision Log (governanca §11 SDP v2 permite cascata em 7 dias, mas volume e pequeno):

1. `prototipos/anna-mel-arquitetura/index.html` — slide 07 atualizar decisoes #06 e #07; slide 03 "Arquitetura MVP" marcar como **legacy** (era pra stack Next.js) e adicionar nota apontando pra este Decision Log pra ver arquitetura V1 atual.
2. `base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md` §8 — ajustar descricao da atuacao da Anna Mel pra refletir V1 escopo reduzido (sem Payment Link automatico, sem cadencia multi-dia, sem regua D+27 automatica na V1).
3. Higiene Linear (fase 0.3 do [[plan file|C:\Users\joaol\.claude\plans\magical-shimmying-matsumoto.md]]):
   - [[BAI-49]] umbrella → Cancelado
   - [[BAI-50]], [[BAI-51]], [[BAI-53]], [[BAI-54]] → Cancelado
   - [[BAI-52]] (Constituicao) → preservar como sub-issue de BAI-119 (conteudo reusavel)
   - [[BAI-61]] (revisar slide deck v2) → Cancelado (slide deck sera revisado post-cascata)
   - [[BAI-111]] (uazapi-bridge pra Anna) → absorver em sub-issue de BAI-119 (trabalho parcial feito em BAI-103)
   - [[BAI-113]] (adocao OpenClaw broader) → preservar (trata dos outros 10 agentes V1, nao so Anna Mel)
4. `base-de-conhecimento/13 - Agentes/Anna Mel - V1 OpenClaw.md` — criar novo arquivo documentando estado V1 apos implementacao (fase 4 do plan).

## O que vira V1.1/V2

Registrar como issues Linear na Fase 4 do plan:

**V1.1** (proximo incremento):
- **Cliente ativo context** — Anna responde suporte pos-venda, com FAQ storage (Supabase ou equivalente).
- **FAQ aprendizado continuo** — `registrar_faq_aprendida` skill custom lendo/gravando em storage.
- **Cal.com/Google Calendar integration** — `consultar_agenda`, `criar_reuniao`, etc (precisa skill custom ou MCP).
- **Chunks humanizados** — resposta em blocos separados por `---` com delay simulando humano.
- **Vision** — habilitar skill pra ler prints de erro / documentos.

**V1.2+**:
- **Inadimplente context** — regua 5 msgs D+1/D+3/D+7/D+14/D+21, pagina `/recuperacao/{org_id}`, cron (heartbeat do OpenClaw ou Vercel externo).
- **Payment Link automation** — Anna gera Payment Link via Stripe API e envia ela mesma.
- **Cadencia nutricao pre-reuniao** (D-1 lembrete + material + qualificacao) e confirmacao pos-reuniao automatizadas.
- **Regua D+27 pos-pagamento** — link subscription infra mensal automatico.

**V2**:
- **LGPD stack completa** — consentimento inline + retencao automatica + `/api/privacy/forget`.
- **Multi-canal** — alem WhatsApp (Telegram, web chat, etc).
- **Handoff formal** pro Agente Suporte quando cliente vira ativo.
- **Dashboard kanban** de conversas.

## Riscos e mitigacoes

| Risco | Mitigacao |
|---|---|
| Framework OpenClaw nao tem nativo o que a doc canonica previa (buffer Redis, FAQ ILIKE+trigram, pagina `/recuperacao/`) | Aceito — escopo V1 reduzido nao precisa disso. V1.1+ avalia skill custom ou hibrido. |
| Latencia > 30s por cold start do Codex CLI | Monitorar via `journalctl -u openclaw-gateway`; V1.1 avalia warm-keeping se for cronico. |
| Cascata da VERDADE_UNICA §8 pode gerar contradicao com [[Decision Log - 2026-04-24 - Reversao Track 1]] | Fazer cascata no mesmo turno, cross-checar que Payment Link continua sendo enviado via WhatsApp (so muda que em V1 e manual pelo dono, nao pela Anna). |
| Escopo V1 reduzido gera gap operacional (régua manual, Payment Link manual) | Aceito — gap cobrimos com operacao manual Joao/Vitoria ate V1.1. Documentar no playbook. |
| Stack Next.js fica "zumbi" (BAI-49 + filhas) | Cancelar explicitamente com comentario apontando pra este Decision Log. |

## Dependencias

- [[BAI-103]] — Limpeza VPS concluida. **OK**.
- [[BAI-110]] — Tunnel Cloudflare com dominio buscouai.com. **OK** (em Revisao).
- [[BAI-41]] — Gmail corp (necessario pra OpenAI API account). Verificar se ja ha conta configurada no servidor.
- **OpenAI API key** no systemd user drop-in do gateway — **OK** (vi em BAI-103).
- **UAZapi token** no env do bridge — **OK** (vi em BAI-103).
- **Numero WhatsApp `+55 27 99696-0847` conectado no UAZapi** — precisa confirmar com dono antes de ativar bridge.

## Revisao futura obrigatoria

Esta decisao de stack sera **revisada** quando:
- Volume de atendimentos > 50 conversas ativas simultaneas (OpenClaw single-host pode nao escalar).
- Necessidade de integracoes profundas (Cal.com API full, Stripe webhook handler, Google Calendar write) que nao cabem no framework OpenClaw sem hibridos complexos.
- V1.1 completa e coletamos dados reais de latencia, custo por turn, taxa de escalacao.

Se qualquer uma dessas ocorrer, reabrir a questao: continuar OpenClaw+expandir, voltar pra Next.js/Supabase, ou adotar hibrido.

## Aprovacao

Aprovado em plan mode por **Joao Lucas Ucceli** em 2026-04-24 (noite), seguindo protocolo SDD (plano com 4 opcoes apresentadas, dono escolheu Stack A). ExitPlanMode executado pos-escrita do plano em `C:\Users\joaol\.claude\plans\magical-shimmying-matsumoto.md`.

## Links cruzados

- [[VERDADE_UNICA_BUSCOU]] — fonte canonica principal (§8 ajustada em cascata pos-este Decision Log)
- [[prototipos/anna-mel-arquitetura/index.html]] — slide 07 atualizado em cascata
- [[Governanca - Decisoes Canonicas]] — protocolo de mudanca Nivel 1
- [[Decision Log - 2026-04-24 - Reversao Track 1]] — permanece vigente
- [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]] — permanece vigente
- [BAI-119](https://linear.app/joao-lucas-ucceli/issue/BAI-119) — umbrella V1 Anna Mel OpenClaw (esta issue executa o plano aprovado)
- [BAI-49](https://linear.app/joao-lucas-ucceli/issue/BAI-49) — umbrella Next.js legado (cancelada nesta cascata)
- [BAI-113](https://linear.app/joao-lucas-ucceli/issue/BAI-113) — umbrella adocao OpenClaw broader (trata dos outros 10 agentes)
