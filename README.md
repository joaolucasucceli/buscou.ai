# buscou.ai

> **Se alguem buscou, quem apareceu foi voce?**

Tecnologia que coloca empresas em resultados do Google e em respostas de IA (ChatGPT, Gemini, Perplexity, Claude, AI Overviews) automaticamente.

**Status:** V1 em construcao (2026-04).

---

## Estrutura do repositorio

Mapa fisico completo + politica de nomenclatura: [ESTRUTURA.md](ESTRUTURA.md).

```
buscou.ai/
├── CLAUDE.md                → Instrucoes operacionais (SDD + SDP v2 + Tom)
├── ESTRUTURA.md             → Mapa fisico + politica de nomenclatura
├── identidade-visual/       → Design System v1 (tokens, componentes, icones, logos)
├── base-de-conhecimento/    → Vault Obsidian (16 secoes canonicas)
│   ├── 00 - Verdade Unica/  → Fonte unica da verdade + governanca
│   ├── 01 - Posicionamento/
│   ├── 02 - ICP/
│   ├── 03 - Oferta/
│   ├── 04 - Produto/
│   ├── 05 - Modelo de Negocio/
│   ├── 06 - SEO/
│   ├── 07 - AIO/
│   ├── 08 - Estrategia Conteudo/
│   ├── 09 - Execucao/
│   ├── 10 - Go To Market/
│   ├── 11 - Operacao/
│   ├── 12 - Sistema/
│   ├── 13 - Agentes/
│   ├── 14 - Marketing/
│   ├── 15 - Glossario/
│   ├── 16 - Identidade Visual/
│   └── Templates/           → Templates padrao (inclui Linear issues)
├── prototipos/              → HTMLs de prototipo (site publico V1, brand book)
├── supabase/                → Config + migrations SQL
└── agentes/                 → Prompts e contexto dos agentes IA
```

## Onde entrar primeiro

- **Instrucoes operacionais:** [CLAUDE.md](CLAUDE.md)
- **Mapa fisico do repo:** [ESTRUTURA.md](ESTRUTURA.md)
- **Fonte unica da verdade:** [VERDADE_UNICA_BUSCOU.md](base-de-conhecimento/00%20-%20Verdade%20Unica/VERDADE_UNICA_BUSCOU.md)
- **Governanca de decisoes:** [Governanca - Decisoes Canonicas.md](base-de-conhecimento/00%20-%20Verdade%20Unica/Governanca%20-%20Decisoes%20Canonicas.md)
- **Identidade visual:** [identidade-visual/](identidade-visual/) (codigo) + [Design System docs](base-de-conhecimento/16%20-%20Identidade%20Visual/) (vault)

## Stack e padroes

- **Identidade:** dark-first (fundo `#08090D`), mint como acento (`#00E5A0` em dark / `#00B37A` em light)
- **Tipografia:** Geist (corpo/display), Geist Mono (`.ai`/labels), Instrument Serif (citacoes)
- **Icones:** 24x24, stroke 1.75, `currentColor`
- **Tokens primeiro:** CSS variables em todo lugar, nunca hardcode fora da paleta

## Gestao de trabalho

- **Linear workspace:** `Joao Lucas Ucceli`
- **Equipe:** `BuscouAI` (key `BAI`)
- **Projeto:** `buscou.ai`
- **Fluxo:** SDD (antes) + SDP v2 (durante) — ver `CLAUDE.md`
