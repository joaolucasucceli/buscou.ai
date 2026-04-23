---
tipo: estrategia
area: Empresa
tags: [identidade-visual, cores, paleta, tokens, design-system]
atualizado: 2026-04-23
---

# Sistema de Cores

> Dark-first. A marca vive em fundo escuro. Violeta representa a tecnologia e o produto. Mint e a voz da IA — usado com precisao cirurgica.

Fonte: `identidade-visual/colors/colors.{css,json,ts}`

---

## Paleta por papel semantico

### Background (fundo) — dark-first

| Token | HEX | Uso |
|---|---|---|
| `--color-bg` | `#08090D` | Fundo padrao. **Nunca mudar.** |
| `--color-bg-elev-1` | `#0F1117` | Primeira elevacao — paineis. |
| `--color-bg-elev-2` | `#161823` | Segunda elevacao — cards. |
| `--color-bg-elev-3` | `#1C1F2C` | Terceira elevacao — chips, inputs. |

### Border

| Token | HEX | Uso |
|---|---|---|
| `--color-border` | `#1F2230` | Padrao em cards e inputs. |
| `--color-border-strong` | `#2E3142` | Destaque, ghost buttons, focus rings. |

### Text

| Token | HEX | Uso |
|---|---|---|
| `--color-text` | `#ECEDF0` | Texto primario sobre fundo escuro. |
| `--color-text-secondary` | `#A4A7B3` | Body, descricoes. |
| `--color-text-tertiary` | `#6B6E7B` | Metadados, labels, eyebrow. |
| `--color-text-quaternary` | `#4A4D5A` | Uso raro. Disabled. |

### Brand — Electric Violet (tecnologia, produto)

| Token | HEX | Uso |
|---|---|---|
| `--color-brand` | `#7C5CFF` | Violeta eletrico. CTA secundario, tech. |
| `--color-brand-600` | `#6D4CF0` | Hover/active. |
| `--color-brand-300` | `#A88FFF` | Texto em badges brand. |
| `--color-brand-100` | `#E4DEFF` | Superficies muito suaves. |
| `--color-brand-soft` | `rgba(124, 92, 255, 0.12)` | Background de badges e highlights. |

### AI — Signal Mint (voz da IA) — **USO <= 10%**

| Token | HEX | Uso |
|---|---|---|
| `--color-ai` | `#00E5A0` | Mint. **Voz da IA.** Acento, nunca base. |
| `--color-ai-300` | `#57F0C0` | Hover em botoes primarios. |
| `--color-ai-dark` | `#00B37A` | **Variante para fundo claro** (obrigatoria). |
| `--color-ai-soft` | `rgba(0, 229, 160, 0.08)` | Background de badges AI. |
| `--color-ai-glow` | `rgba(0, 229, 160, 0.45)` | Glow do `.ai` e do cursor. |

### Feedback

| Token | HEX | Uso | Limite |
|---|---|---|---|
| `--color-coral` | `#FF6B3D` | **Erro, alerta critico.** | <= 2% |
| `--color-warn` | `#FFB84D` | Aviso nao-critico. | moderado |
| `--color-success` | `#00E5A0` | Sucesso. (alias do mint) | — |

---

## Regras proporcionais (inegociaveis)

1. **Fundo padrao:** sempre `var(--color-bg)`. Dark-first. Tema claro e opcional e ainda nao existe.
2. **Mint (`--color-ai`):** maximo **10%** da composicao. Acento, nunca base.
3. **Coral (`--color-coral`):** maximo **2%**. Reservado a erro ou alerta critico.
4. **Fundo claro:** trocar `#00E5A0` por `#00B37A` (`--color-ai-dark`). `#00E5A0` nao tem contraste suficiente em fundo claro.
5. **Violeta:** representa tecnologia, produto, CTA secundario. Nao confundir com o mint (voz da IA).
6. **Gradientes:** apenas como luz ambiente (fundo, sombra). **Nunca** em tipografia ou logotipo.

---

## Hierarquia de elevacao

O dark-first usa elevacao por cor (nao por sombra dramatica):

```
Fundo base:     #08090D  (--color-bg)
↓ painel:       #0F1117  (--color-bg-elev-1)
↓ card:         #161823  (--color-bg-elev-2)
↓ chip/input:   #1C1F2C  (--color-bg-elev-3)
```

Sombras existem, mas mais sutis (ver [[Tokens de Design]]).

---

## Como consumir

### CSS (preferido)

```css
.minha-classe {
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.highlight {
  color: var(--color-ai); /* mint — uso <= 10% */
}
```

### TypeScript / React

```tsx
import { colors } from '@buscou/design-system';

<div style={{ background: colors.bg.base, color: colors.ai.default }} />
```

### Nunca

```tsx
// ❌ Hardcode
<div style={{ background: '#08090D', color: '#00E5A0' }} />

// ❌ Cor inventada fora da paleta
<div style={{ background: '#0A0B10' }} />
```

---

## Exemplos de composicao proporcional

### Hero de landing page (proporcao saudavel)

- 70% `--color-bg` (fundo preto)
- 20% `--color-text` (texto claro)
- 7% `--color-text-secondary` (body)
- 2% `--color-ai` (CTA mint + pontos de acento)
- 1% `--color-brand` (chip "Beta")

### Dashboard (proporcao saudavel)

- 60% `--color-bg`
- 15% `--color-bg-elev-1` e `elev-2` (paineis e cards)
- 15% `--color-text` + `text-secondary`
- 7% `--color-text-tertiary` (labels)
- 3% `--color-ai` (status live, KPIs positivos)

---

## Acessibilidade

- Contraste minimo AA (4.5:1) entre texto e fundo.
- `--color-text` (#ECEDF0) sobre `--color-bg` (#08090D) = 15.7:1 (AAA).
- `--color-ai` (#00E5A0) sobre `--color-bg` (#08090D) = 11.2:1 (AAA).
- `--color-brand` (#7C5CFF) sobre `--color-bg` = 4.6:1 (AA).
- Evitar texto `--color-text-tertiary` em tamanhos menores que 14px.

---

## Links cruzados

- [[Auditoria da Identidade Visual]] — inventario
- [[Tokens de Design]] — shadow, transition etc.
- [[Componentes Base]] — como Button/Card/Badge consomem essa paleta
- [[Regras de Uso]] — consolidacao
