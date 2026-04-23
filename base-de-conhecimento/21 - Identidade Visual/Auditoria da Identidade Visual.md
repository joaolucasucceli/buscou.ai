---
tipo: conceito
area: Empresa
tags: [identidade-visual, design-system, marca, auditoria, brand]
atualizado: 2026-04-23
---

# Auditoria da Identidade Visual

> Inventario mestre do Design System oficial da `buscou.ai`. Espelha a pasta `identidade-visual/` na raiz do projeto.

**Versao:** 1.0 — 2026-04-23
**Fonte da verdade:** `identidade-visual/` (tokens, SVGs, componentes React)
**Documentacao navegavel:** esta secao `21 - Identidade Visual/`

---

## Resumo executivo

A `buscou.ai` tem um Design System maduro e completo para UI web (Next.js/React), organizado em torno de tokens semanticos consumidos por componentes. A marca e **dark-first**, com violeta eletrico como cor tecnologica e mint ("Signal Mint") como voz da IA — usado com precisao cirurgica (maximo 10% da composicao).

### O que existe

| Dominio | Arquivos | Local |
|---|---|---|
| Manifesto / Brand Book | Brand Book HTML (118KB) | `identidade-visual/` |
| Documentacao | `Design System - README.md`, `docs/README.md`, `docs/CHANGELOG.md` | `identidade-visual/docs/` |
| Logos | 5 SVGs + favicon SVG + 2 PNGs + apple-touch | `identidade-visual/logos/` |
| Icones | 7 SVGs | `identidade-visual/icons/` |
| Cores | 3 formatos: JSON (W3C DTCG), CSS vars, TypeScript | `identidade-visual/colors/` |
| Tokens | 2 formatos: CSS vars + JSON (W3C DTCG) | `identidade-visual/tokens/` |
| Tipografia | 2 arquivos CSS (fonts + typography) | `identidade-visual/typography/` |
| Componentes React | 4 pares `.tsx` + `.css` | `identidade-visual/components/` |
| Entry points | `index.css`, `index.ts`, `package.json` | `identidade-visual/` |

### O que nao existe (gaps identificados)

- Tailwind plugin (roadmap §8.1 do DS)
- Tema claro opcional (roadmap §8.2)
- Storybook dos componentes (roadmap §8.3)
- Testes visuais automatizados (Chromatic / Playwright screenshots) (roadmap §8.4)
- Componentes avancados: `Input`, `Select`, `Modal`, `Toast`, `KPICard`, `DataTable` (roadmap §8.5)

---

## Indice por dominio

- [[Conceito e Posicionamento]] — manifesto, tagline, fluxo Busca → Sistema → Resposta, o que a marca e / nao e
- [[Uso do Nome]] — `buscou.ai` vs `BuscouAI`, 8 regras obrigatorias
- [[Logos e Variacoes]] — 5 variacoes + favicons, clearspace, tamanhos minimos
- [[Sistema de Cores]] — paleta semantica, regras proporcionais, variante fundo claro
- [[Tipografia]] — Geist, Geist Mono, Instrument Serif + escala completa
- [[Tokens de Design]] — radius, spacing, shadow, transition, z-index, breakpoints
- [[Componentes Base]] — Button, Card, SearchBar, Badge
- [[Icones]] — 7 icones + regras fixas (24x24, stroke 1.75, `currentColor`)
- [[Elementos Graficos]] — barra de busca, cursor, fluxo, resposta
- [[Tom de Voz e Marketing]] — direto, inteligente, moderno
- [[Regras de Uso]] — DOs e DON'Ts + 6 erros comuns

---

## Estado dos ativos

| Ativo | Versao | Estado | Observacoes |
|---|---|---|---|
| Tokens de cor | 1.0 | producao | 3 formatos sincronizados (CSS/JSON/TS) |
| Tokens de design | 1.0 | producao | W3C DTCG format |
| Logos SVG | 1.0 | producao | Dependem de Geist + Geist Mono carregados |
| Favicons | 1.0 | producao | SVG + PNG 16/32 + apple-touch 180 |
| Icones | 1.0 | 7 icones | Expansao sob demanda |
| Button | 1.0 | producao | 4 variants x 3 sizes |
| Card | 1.0 | producao | 4 variants + sub-componentes |
| SearchBar | 1.0 | producao | **Assinatura visual da marca** |
| Badge | 1.0 | producao | 6 variants + `pulse` |
| Tipografia | 1.0 | producao | Geist via Google Fonts (preferir `next/font`) |
| Brand Book | 1.0 | producao | 12 secoes, HTML standalone |

---

## Dependencias externas

- **Fontes:** Geist, Geist Mono, Instrument Serif (Google Fonts). Em Next.js, usar `next/font` para auto-hosting e melhor LCP.
- **React:** peer dependency `>=18`.
- **Publicacao:** pacote privado `@buscou/design-system` (descrito em `package.json`).

---

## Como consumir

### CSS plug-and-play

```ts
// app/layout.tsx (Next.js)
import '@buscou/design-system/index.css';
```

Importa em cascata: `typography/fonts.css` → `colors/colors.css` → `tokens/tokens.css` → `typography/typography.css` → componentes.

### React (barrel export)

```tsx
import { Button, Card, SearchBar, Badge, colors } from '@buscou/design-system';
```

### Logos e icones

```tsx
import Logo from '@buscou/design-system/logos/buscou-ai-primary-dark.svg';
import SearchIcon from '@buscou/design-system/icons/search.svg';
```

---

## Principios que organizam tudo

1. **Tokens primeiro.** Todo valor visual nasce em `colors.json` ou `tokens.json`. Componentes sao consumidores.
2. **Dark-first.** Fundo padrao `#08090D`. Tema claro e opcional e ainda nao implementado.
3. **Mint e acento, nao base.** Maximo 10% da composicao. Fundo claro troca `#00E5A0` por `#00B37A`.
4. **Coral e emergencia.** Maximo 2%, so erro / alerta critico.
5. **Tipografia em tensao.** Geist (voz humana) + Geist Mono (voz da maquina). A oscilacao e a assinatura.
6. **Cursor piscante e vida.** A `SearchBar` com cursor mint e a assinatura gestual da marca.
7. **Consistencia e defesa.** Violar a paleta ou a capitalizacao do nome e quebra de marca.

Ver [[Regras de Uso]] para o detalhamento operacional.

---

## Proximos passos sugeridos (fora do escopo desta auditoria)

- Issue: implementar Tailwind plugin consumindo os tokens (`bg-brand`, `text-ai`, `rounded-pill`).
- Issue: integrar Style Dictionary para gerar outros formatos (Android/iOS/Figma Tokens).
- Issue: criar Storybook com todos os componentes + controles de variants.
- Issue: CI que valide contrastes WCAG e uso de cores fora da paleta.
- Issue: documentar os 6 componentes avancados do roadmap (Input, Select, Modal, Toast, KPICard, DataTable) seguindo [[Template - Componente UI]].

---

## Links cruzados

- [[MOC - Identidade Visual]] — mapa central desta secao
- [[MOC - Empresa]] — blueprint geral da empresa
- [[Template - Componente UI]] — padrao para documentar novos componentes
