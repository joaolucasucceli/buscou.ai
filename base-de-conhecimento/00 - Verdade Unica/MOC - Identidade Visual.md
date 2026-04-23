---
tipo: indice
area: Empresa
tags: [moc, indice, identidade-visual, design-system, marca]
atualizado: 2026-04-23
---

# MOC - Identidade Visual

> Mapa central da identidade visual da `buscou.ai`. Espelha o Design System oficial em `identidade-visual/` e transforma cada pilar em regra navegavel.

**Principio:** consistencia visual e fidelidade cognitiva. Toda UI, copy e aplicacao visual passa por aqui antes de existir.

---

## Inventario

- [[Auditoria da Identidade Visual]] — inventario mestre: 4 componentes, 7 icones, 5 logos, tokens W3C DTCG, Brand Book HTML 118KB, v1.0 / 2026-04-23

## Conceito e marca

- [[Conceito e Posicionamento]] — manifesto "Se alguem buscou, voce precisa aparecer.", fluxo Busca → Sistema → Resposta, o que e / nao e
- [[Uso do Nome]] — `buscou.ai` vs `BuscouAI`, 8 regras obrigatorias, dominio real `buscouai.com`
- [[Tom de Voz e Marketing]] — direto, inteligente, moderno; frases-chave e antifrases

## Sistema visual

- [[Logos e Variacoes]] — 5 SVGs + favicons, clearspace 1x altura do `.ai`, tamanho minimo 80px
- [[Sistema de Cores]] — dark-first `#08090D`, brand `#7C5CFF`, mint `#00E5A0` (≤10%), coral `#FF6B3D` (≤2%)
- [[Tipografia]] — Geist + Geist Mono + Instrument Serif, escala display→eyebrow, tracking negativo em displays
- [[Tokens de Design]] — radius, spacing (base 4px), shadow, transition (200ms base), z-index, breakpoints

## Componentes e icones

- [[Componentes Base]] — Button (4 variants x 3 sizes), Card (4 variants + sub-componentes), SearchBar (assinatura), Badge (6 variants + pulse)
- [[Icones]] — 7 icones: search, cursor, spark, graph, check, arrow, flow. Fixo 24x24, stroke 1.75, `currentColor`
- [[Elementos Graficos]] — 4 gestos: barra de busca, cursor digitando, fluxo de conexao, resposta aparecendo

## Enforcement

- [[Regras de Uso]] — DO/DON'T consolidados + 6 erros comuns + checklist de entrega de UI
- [[Template - Componente UI]] — padrao para documentar novos componentes antes de implementar

---

## Numeros-chave

| Metrica | Valor |
|---|---|
| Versao do DS | 1.0 (2026-04-23) |
| Componentes React | 4 (Button, Card, SearchBar, Badge) |
| Icones | 7 |
| Variacoes de logo | 5 SVGs + 3 favicons + apple-touch |
| Paleta de cores | 24 tokens semanticos |
| Escala de spacing | 11 tokens (0 a 140px, base 4px) |
| Escala de radius | 6 tokens (4px a 100px pill) |
| Fundo padrao | `#08090D` (dark-first) |
| Mint de acento | `#00E5A0` (fundo escuro) / `#00B37A` (fundo claro) |
| Violeta brand | `#7C5CFF` |
| Limite de uso do mint | ≤10% |
| Limite de uso do coral | ≤2% |
| Transition base | 200ms `cubic-bezier(0.2, 0, 0, 1)` |
| Stroke dos icones | 1.75 (fixo) |
| Tamanho minimo do logo | 80px digital / 24mm impresso |

---

## Checklist rapido antes de qualquer UI

- [ ] Consumir CSS variables (`var(--color-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--transition-*)`) — nunca hardcode.
- [ ] Reusar componentes do DS (`Button`, `Card`, `SearchBar`, `Badge`).
- [ ] Logo sempre via SVG de `identidade-visual/logos/`.
- [ ] Nome: `buscou.ai` (ou `BuscouAI` em juridico).
- [ ] Dark-first; mint ≤10%, coral ≤2%.
- [ ] Icone 24x24, stroke 1.75, `currentColor`.
- [ ] Tipografia: Geist / Geist Mono / Instrument Serif conforme regra.
- [ ] Copy segue [[Tom de Voz e Marketing]].
- [ ] Ver [[Regras de Uso]] — checklist completo de entrega.

---

## Roadmap de evolucao

Do Design System README §8 — ainda **nao** implementados:

- [ ] Tailwind plugin (`bg-brand`, `text-ai`, `rounded-pill`)
- [ ] Tema claro opcional (mesma semantica, paleta invertida)
- [ ] Storybook dos componentes
- [ ] Testes visuais (Chromatic / Playwright screenshots)
- [ ] Componentes avancados: Input, Select, Modal, Toast, KPICard, DataTable

Cada um deve virar issue no Linear quando priorizado.

---

## Navegacao

- [[MOC - Empresa]] — blueprint geral da empresa (a marca e ativo dela)
- [[MOC - SEO]] — base de conhecimento SEO
- [[MOC - AIO]] — base de conhecimento AIO
- [[MOC - Execucao]] — execucao e servico
- [[Mental Models]] — como Google, IA e usuario pensam
