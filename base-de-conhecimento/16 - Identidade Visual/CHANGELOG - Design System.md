---
tipo: rastreamento
area: Empresa
tags: [identidade-visual, design-system, changelog]
atualizado: 2026-04-23
---

# CHANGELOG — Design System buscou.ai

Historico de mudancas do pacote de codigo/assets em `identidade-visual/` (fora do vault).
Segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e SemVer.

Fonte de codigo: `identidade-visual/`.
Docs narrativos (tokens, componentes, cores, etc): esta pasta `16 - Identidade Visual/`.

---

## [1.0.0] — 2026-04-23

### Adicionado

- Estrutura inicial: `logos/`, `icons/`, `colors/`, `typography/`, `tokens/`, `components/`.
- Logos SVG (primary-dark, primary-light, compact, mono, favicon) + favicons PNG 16/32.
- 7 icones base: search, cursor, spark, graph, check, arrow, flow.
- Sistema de cores em 3 formatos: JSON (W3C DTCG), CSS variables e TypeScript.
- Tokens: radius, spacing (base 4px), shadow, transition, z-index, breakpoints.
- Tipografia: Geist + Geist Mono + Instrument Serif. Escala de display a eyebrow.
- Componentes React + CSS: `Button`, `Card`, `SearchBar`, `Badge`.
- Entry points `index.css` (plug-and-play) e `index.ts` (barrel export).

### Reorganizacoes pos-1.0.0

- **2026-04-23:** reorganizacao de pastas raiz do repo (BAI-31):
  - Pasta do vault `21 - Identidade Visual` renumerada para `16 - Identidade Visual` (elimina pulo 15→21).
  - `identidade-visual/docs/` removida (conteudo era redundante com o vault); docs narrativos agora vivem exclusivamente em `16 - Identidade Visual/`.
  - `identidade-visual/Estrutura Web - V1/` (4 HTMLs de prototipo) movida para `prototipos/site-publico-v1/` — prototipo nao e design system.
  - `identidade-visual/brand-book.html` movido para `prototipos/site-publico-v1/brand-book.html`.
  - `identidade-visual/buscou-ai-instagram-pfp.png` movido para `identidade-visual/logos/`.
  - `identidade-visual/Design System - README.md` renomeado para `identidade-visual/README.md` e enxugado (ponteiro para o vault).
