---
tipo: status
area: Agentes
tags: [anna-mel, prototipo, legacy, pivot]
atualizado: 2026-04-24
---

# Status do prototipo — anna-mel-arquitetura

## Status atual: **PARCIALMENTE LEGADO** (pos 2026-04-24)

Este prototipo apresenta a **arquitetura MVP v2 teorica** da Anna Mel fechada em 2026-04-23. Em 2026-04-24 (noite) a stack foi pivotada de Next.js/Supabase/Redis para OpenClaw no VPS via [[Decision Log - 2026-04-24 - Arquitetura Anna Mel OpenClaw]].

## O que ainda vale (12 de 14 decisoes canonicas)

Os slides 01, 02, 04, 06, 07 (parcial), 08, 09, 10 permanecem **validos** como referencia:

- **Slide 01 (capa)** — persona unica Anna Mel, 3 contextos (lead/cliente/inadimplente).
- **Slide 02 (identidade)** — Anna Mel A-N-N-A M-E-L, voz feminina, tom consultivo, escopo fechado, admite ser IA. Todas canonicas.
- **Slide 04 (3 contextos)** — papel em cada contexto permanece valido como alvo completo; V1 implementa apenas Lead.
- **Slide 05 (6 tools)** — tools continuam sendo o norte canonico; V1 implementa apenas "agenda leve" via link Cal.com estatico.
- **Slide 07 (14 decisoes)** — decisoes 06 e 07 foram **revisadas** (stack + pasta); as outras 12 permanecem intactas.
- **Slide 08 (LGPD)** — 3 pilares permanecem canonicos; V1 entrega apenas disclaimer inline.
- **Slide 09 (horizonte V1.1 → V2)** — continua valido como roadmap, com ajuste: features antes pensadas pra Next.js agora serao executadas no contexto OpenClaw (ou hibrido).
- **Slide 10 (ROI)** — data 26/05/26 pode se mover; sera revisitada apos V1 OpenClaw no ar.

## O que virou LEGADO (pivotado)

**Slide 03 — Arquitetura MVP (7 camadas tecnicas)**:

As 7 camadas descritas (Webhook Uazapi → Buffer Redis 20s → Whisper/Vision → FAQ ILIKE+trigram → Memoria Redis → Constituicao git → GPT-4o) **NAO SAO MAIS a arquitetura V1**. Arquitetura nova:

```
WhatsApp → Uazapi → uazapi.buscouai.com (Cloudflare tunnel) →
  → /root/uazapi-bridge/server.mjs (VPS) →
  → openclaw agent --agent anna-mel →
  → openclaw-gateway.service (user systemd, VPS) →
  → workspace /root/.openclaw/workspace/agents/anna-mel/ →
  → Codex CLI com modelo openai/gpt-5.4-mini →
  → skill uazapi (send) →
  → UAZapi API → WhatsApp do lead
```

**Slide 06 — Gantt de entrega (BAI-50 a BAI-54)**:

As 5 issues-filhas da umbrella BAI-49 (F0-F4) sao **canceladas** pos-pivot. A execucao V1 real e feita via [BAI-119](https://linear.app/joao-lucas-ucceli/issue/BAI-119) com sub-issues novas.

## Quando usar este prototipo

- Apresentacao institucional/investidor: o prototipo cobre bem a **visao canonica completa** (3 contextos, 6 tools, regua 5 msgs).
- Planejamento de V1.1 e V1.2: os slides 04, 05, 09 sao o norte pra expandir alem do Lead context.
- Onboarding de nova pessoa no projeto: o slide 02 e o 07 sao a verdade vigente da persona/decisoes.

## Quando NAO usar

- Apresentar como arquitetura tecnica atual (slide 03 esta superado).
- Planejar proximas issues do roadmap (slide 06 aponta issues canceladas).

## Quando revisitar

Fim da V1 (apos testes E2E aprovados e BAI-119 concluida). Slide deck sera atualizado numa nova versao (v3?) refletindo a stack OpenClaw em producao + roadmap real de V1.1 baseado em aprendizados V1.
