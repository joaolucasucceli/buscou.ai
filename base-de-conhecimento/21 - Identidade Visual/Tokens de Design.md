---
tipo: estrategia
area: Empresa
tags: [identidade-visual, tokens, design-system, radius, spacing, shadow, transition]
atualizado: 2026-04-23
---

# Tokens de Design

> Todo valor visual nasce aqui. Componentes sao consumidores — nunca definem valores proprios.

Fonte: `identidade-visual/tokens/tokens.{css,json}` — segue o [W3C Design Tokens Format](https://design-tokens.github.io/community-group/format/).

---

## Radius (arredondamento)

| Token | Valor | Uso padrao |
|---|---|---|
| `--radius-xs` | `4px` | Detalhes pequenos. |
| `--radius-sm` | `6px` | Inputs pequenos. |
| `--radius-md` | `10px` | **Padrao de cards e inputs.** |
| `--radius-lg` | `18px` | Modais, paineis grandes. |
| `--radius-xl` | `28px` | Hero blocks. |
| `--radius-pill` | `100px` | **Botoes, badges, search bar.** |

Regra: preferir `md` (10px) como arredondamento geral. O `pill` define a identidade gestual da marca (botoes e search bar sempre arredondados).

---

## Spacing (base 4px)

| Token | Valor | Uso |
|---|---|---|
| `--space-0` | `0` | — |
| `--space-1` | `4px` | Separacao minima. |
| `--space-2` | `8px` | Gap em linhas compactas. |
| `--space-3` | `12px` | Gap padrao em inputs. |
| `--space-4` | `16px` | **Base de spacing.** |
| `--space-5` | `24px` | Separacao de grupos. |
| `--space-6` | `32px` | **Padding de cards.** |
| `--space-7` | `48px` | Separacao de secoes. |
| `--space-8` | `64px` | Padding de secoes hero. |
| `--space-9` | `96px` | Entre blocos grandes. |
| `--space-10` | `140px` | Margens de pagina, hero top. |

Regra: todo valor de padding/margin deve vir de um token. Nao usar `18px`, `22px`, `40px` — use o mais proximo (`space-5` ou `space-6`).

---

## Shadow

| Token | Valor | Uso |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Elementos leves sobre elev-1. |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,0.35)` | Cards elevados, dropdowns. |
| `--shadow-lg` | `0 20px 60px rgba(0,0,0,0.45)` | Modais, floating cards. |
| `--shadow-glow` | `0 0 16px rgba(0,229,160,0.45), 0 0 40px rgba(0,229,160,0.2)` | **Glow do `.ai`, cursor, elementos live.** |
| `--shadow-brand` | `0 0 24px rgba(124,92,255,0.35)` | Hover de botao secundario (violeta). |

Regra: sombra dramatica so em elementos intencionalmente flutuantes. Dark-first prefere elevacao por cor (ver [[Sistema de Cores]]).

---

## Transition

| Token | Valor | Uso |
|---|---|---|
| `--transition-fast` | `120ms cubic-bezier(0.2, 0, 0, 1)` | Micro-interacoes (press, icone). |
| `--transition-base` | `200ms cubic-bezier(0.2, 0, 0, 1)` | **Padrao de hover/focus/state changes.** |
| `--transition-slow` | `360ms cubic-bezier(0.2, 0, 0, 1)` | Transicoes de pagina, abertura de painel. |
| `--transition-spring` | `600ms cubic-bezier(0.34, 1.56, 0.64, 1)` | Momentos de "aparecer" (pulse, entry). |
| `--ease` | `cubic-bezier(0.2, 0, 0, 1)` | Curva padrao. |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Curva spring. |

Regra: 200ms e o default da UI. Animacoes > 400ms devem ser raras e intencionais.

---

## Z-index

| Token | Valor | Uso |
|---|---|---|
| `--z-base` | `0` | Default. |
| `--z-above` | `10` | Elementos que se sobrepoem no layout. |
| `--z-sticky` | `100` | Header fixo, CTA sticky. |
| `--z-overlay` | `500` | Overlay de dropdown, tooltip. |
| `--z-modal` | `1000` | Modal, dialog. |
| `--z-toast` | `2000` | Toast / notification (sempre no topo). |

Regra: nao usar `z-index` numerico fora da escala. Se precisa de algo entre `sticky` e `overlay`, repensar hierarquia.

---

## Breakpoints

| Token | Valor | Uso |
|---|---|---|
| `--bp-sm` | `640px` | Mobile grande / tablet pequeno. |
| `--bp-md` | `768px` | Tablet. |
| `--bp-lg` | `1024px` | Desktop pequeno. |
| `--bp-xl` | `1280px` | Desktop padrao. |
| `--bp-2xl` | `1440px` | Desktop grande. |

Em JS, ler via `getComputedStyle(document.documentElement).getPropertyValue('--bp-lg')`.

---

## Grid / Layout

| Token | Valor | Uso |
|---|---|---|
| `--container` | `1240px` | Largura maxima de conteudo. |
| `--container-padding` | `32px` | Margem lateral em containers. |

Grid padrao: **12 colunas, gutter 24px, margem 32px+**.

---

## Como consumir

### CSS (preferido)

```css
.hero {
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-glow);
  transition: background var(--transition-base);
}
```

### JSON (para tools de build)

`tokens.json` segue W3C DTCG. Pode ser consumido por:

- Style Dictionary
- Figma Tokens
- Tailwind plugin

```bash
npx style-dictionary build --config ./style-dictionary.config.js
```

---

## Quando criar um novo token

1. O valor aparece em **3 ou mais lugares** do codigo?
2. O valor tem **significado semantico** (nao so estetico)?
3. A alteracao do valor precisa **propagar automaticamente**?

Se sim para as tres, cria token. Se nao, usa valor direto.

Nunca criar token so para "me organizar". Tokens sao contratos — mudanca neles afeta tudo que consome.

---

## Versionamento (SemVer)

- **Patch:** correcao de valor mal calibrado sem impacto visual (ex.: 0.29 → 0.3 em rgba).
- **Minor:** adicao de token novo, mudanca visual suave de cor/spacing.
- **Major:** remocao de token, renomeacao, breaking change (ex.: trocar escala inteira de spacing).

---

## Links cruzados

- [[Sistema de Cores]] — tokens de cor (separados neste sistema)
- [[Tipografia]] — tokens de fonte
- [[Componentes Base]] — como Button/Card/Badge consomem estes tokens
- [[Auditoria da Identidade Visual]] — inventario
