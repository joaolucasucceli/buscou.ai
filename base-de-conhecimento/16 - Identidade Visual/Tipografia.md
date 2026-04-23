---
tipo: estrategia
area: Empresa
tags: [identidade-visual, tipografia, fontes, geist, typography]
atualizado: 2026-04-23
---

# Tipografia

> Duas familias em tensao. **Geist** para a voz humana; **Geist Mono** para a voz da maquina. A oscilacao entre elas e a assinatura tipografica da marca.

Fonte: `identidade-visual/typography/fonts.css` + `typography.css`

---

## 3 familias

| Token | Familia | Uso |
|---|---|---|
| `--font-sans` | **Geist** | Titulos, corpo, UI. Voz principal. Sempre com tracking negativo em displays. |
| `--font-mono` | **Geist Mono** | `.ai` do logotipo, labels (eyebrow), metadados, codigo. Voz da maquina. |
| `--font-serif` | **Instrument Serif** | Citacoes, manifestos, blockquotes. Uso restrito a momentos editoriais. |

### Stack de fallback

```css
--font-sans:  'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ui-sans-serif, system-ui, sans-serif;
--font-mono:  'Geist Mono', ui-monospace, 'SF Mono', Menlo, Monaco, 'Cascadia Mono', monospace;
--font-serif: 'Instrument Serif', ui-serif, Georgia, 'Times New Roman', serif;
```

### Em Next.js — use `next/font`

```tsx
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
```

Evita FOUT, melhora LCP, auto-hosting (sem chamada externa ao Google Fonts).

---

## Escala completa

| Classe | Tamanho | Peso | Tracking | Uso |
|---|---|---|---|---|
| `.t-display` | `clamp(56px, 9vw, 148px)` | 500 | `-0.055em` | Hero, logotipo em texto. |
| `h1, .t-h1` | `clamp(40px, 5vw, 72px)` | 500 | `-0.04em` | Titulo de pagina. |
| `h2, .t-h2` | `clamp(28px, 3.5vw, 44px)` | 500 | `-0.035em` | Secao. |
| `h3, .t-h3` | `clamp(20px, 2.2vw, 28px)` | 500 | `-0.025em` | Subsecao. |
| `h4, .t-h4` | `16px` | 500 | `-0.01em` | Titulo de card. |
| `.t-body, p` | `16px` | 400 | — | Corpo. `line-height: 1.65`. |
| `.t-lead` | `clamp(18px, 1.5vw, 22px)` | 400 | — | Paragrafo de abertura. |
| `.t-small` | `13px` | 400 | — | Texto auxiliar. |
| `.t-mono, code` | `14px` | — | `0` | Labels tecnicas, codigo inline. |
| `.t-eyebrow, .eyebrow` | `11px` | 500 | `+0.18em` **UPPERCASE** | Rotulo acima de titulo. |
| `.t-quote, blockquote` | `clamp(22px, 2.5vw, 32px)` | — | `-0.015em` italic | Citacao editorial (Instrument Serif). |

---

## Tracking negativo em displays

Regra geral: quanto maior o tamanho, mais negativo o `letter-spacing`.

- 148px: `-0.055em`
- 72px: `-0.04em`
- 44px: `-0.035em`
- 28px: `-0.025em`
- 16px: `-0.01em`
- 14px e menor: `0`

Isso cria a cohesao tipografica da marca — textos grandes "fecham" visualmente.

---

## Tensao sans vs mono (a assinatura)

A marca oscila entre:

- **Geist (sans):** voz humana, corpo fluente, titulos.
- **Geist Mono:** voz da maquina, metadados, `.ai`, labels uppercase com tracking positivo (`+0.12` a `+0.18em`).

Exemplo no `Card`:
- `.card__title` — Geist 500, 16px, tracking `-0.01em`
- `.card__footer` — Geist Mono 500, 11px, tracking `+0.12em`, uppercase

Essa oscilacao e **a identidade** — nao e decoracao opcional.

---

## Brand lockup (marca em HTML)

```html
<span class="brand-lockup">buscou<span class="ai">.ai</span></span>
```

```css
.brand-lockup {
  font-family: var(--font-sans);
  font-weight: 500;
  letter-spacing: -0.04em;
}
.brand-lockup .ai {
  color: var(--color-ai);
  font-family: var(--font-mono);
  letter-spacing: -0.02em;
  text-shadow: 0 0 16px var(--color-ai-glow);
}
.brand-lockup.on-light .ai {
  color: var(--color-ai-dark);
  text-shadow: none;
}
```

Em fundo claro, adicionar classe `.on-light` para neutralizar o glow.

---

## Defaults do body

```css
html, body {
  font-family: var(--font-sans);
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: -0.005em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
}
```

---

## Pesos usados

| Peso | Nome | Uso |
|---|---|---|
| 400 | Regular | Corpo, body, paragrafos. |
| 500 | Medium | **Padrao para titulos e display.** |
| 600 | Semibold | Uso raro, so quando 500 nao resolve. |

Nao usar 700+ (bold pesado). A tipografia da marca vive no peso 500 com tracking negativo.

---

## Italico / serif

`Instrument Serif` e restrito a:

- Citacoes diretas (`blockquote`, `.t-quote`)
- Manifestos curtos (ex.: "sistema operacional" na frase-chave)
- Tagline de capa do Brand Book

**Nao usar serif em:** titulos de secao, body geral, botoes, labels.

---

## Links cruzados

- [[Uso do Nome]] — como escrever `buscou.ai`
- [[Logos e Variacoes]] — logo SVG usa Geist + Geist Mono
- [[Sistema de Cores]] — texto primario, secundario, terciario
- [[Componentes Base]] — Button/Card/Badge usam a escala
- [[Regras de Uso]] — consolidacao
