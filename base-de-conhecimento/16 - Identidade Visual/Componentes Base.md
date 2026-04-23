---
tipo: estrategia
area: Empresa
tags: [identidade-visual, componentes, design-system, react, ui]
atualizado: 2026-04-23
---

# Componentes Base

> 4 componentes React oficiais da `buscou.ai`. Reusar sempre. Duplicar nunca.

Fonte: `identidade-visual/components/*.{tsx,css}`

---

## Regra geral

Antes de criar qualquer UI nova:

1. Ver se ja existe um componente base que resolve (`Button`, `Card`, `SearchBar`, `Badge`).
2. Se sim, reusar via `import` do barrel export (`@buscou/design-system`).
3. Se nao, primeiro documentar em [[Template - Componente UI]] e so depois implementar em `identidade-visual/components/`.

**Nao copiar-e-colar** um componente do DS para "customizar" localmente. Isso quebra a consistencia.

---

## 1. Button

Fonte: [`identidade-visual/components/Button.tsx`](../../identidade-visual/components/Button.tsx) + `Button.css`

### API

```ts
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;  // default: 'primary'
  size?: ButtonSize;        // default: 'md'
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}
```

### Variants

| Variant | Background | Color | Hover | Uso |
|---|---|---|---|---|
| `primary` | `--color-ai` (mint) | `--color-bg` | glow mint | **CTA principal.** |
| `secondary` | `--color-brand` (violeta) | `#FFFFFF` | glow brand | CTA secundario. |
| `ghost` | transparent | `--color-text` | border muda para mint | Acao terciaria. |
| `danger` | `--color-coral` | `--color-bg` | opacity 0.9 | Acao destrutiva (raro). |

### Sizes

| Size | Padding | Font |
|---|---|---|
| `sm` | `8px 14px` | `13px` |
| `md` | `12px 20px` | `14px` |
| `lg` | `16px 28px` | `15px` |

### Propriedades comuns

- `border-radius: var(--radius-pill)` — sempre pill.
- `font-family: var(--font-sans)` — Geist 500.
- `transition: var(--transition-base)` — 200ms.
- Focus ring: `outline: 2px solid var(--color-ai); outline-offset: 2px`.

### Uso

```tsx
import { Button } from '@buscou/design-system';

<Button variant="primary">Testar gratis</Button>
<Button variant="secondary">Ver demo</Button>
<Button variant="ghost" rightIcon={<ArrowIcon />}>Saiba mais</Button>
<Button variant="danger" size="sm">Excluir conta</Button>
```

---

## 2. Card

Fonte: [`identidade-visual/components/Card.tsx`](../../identidade-visual/components/Card.tsx) + `Card.css`

### API

```ts
type CardVariant = 'default' | 'elevated' | 'outline' | 'accent';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;      // default: 'default'
  interactive?: boolean;      // adiciona hover/cursor
}
```

### Sub-componentes

- `CardHeader` — title + ações à direita
- `CardTitle` — `<h3>` estilizado (16px, 500, tracking `-0.01em`)
- `CardBody` — corpo (`--color-text-secondary`, 14px, line-height 1.6)
- `CardFooter` — Geist Mono uppercase, 11px, separado por `border-top`

### Variants

| Variant | Background | Border | Uso |
|---|---|---|---|
| `default` | `--color-bg-elev-1` | `--color-border` | Padrao. |
| `elevated` | `--color-bg-elev-2` | `--color-border` + `shadow-md` | Card em destaque. |
| `outline` | `transparent` | `--color-border-strong` | Card sobre fundo elevado. |
| `accent` | `--color-bg-elev-1` | `border-left: 2px solid --color-ai` | **Destaque mint** (KPIs, status live). |

### Uso

```tsx
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '@buscou/design-system';

<Card variant="accent">
  <CardHeader><CardTitle>Aparicoes em IA</CardTitle></CardHeader>
  <CardBody>+41% vs mes anterior</CardBody>
  <CardFooter>Ultimas 24h</CardFooter>
</Card>
```

---

## 3. SearchBar — **a assinatura visual da marca**

Fonte: [`identidade-visual/components/SearchBar.tsx`](../../identidade-visual/components/SearchBar.tsx) + `SearchBar.css`

### API

```ts
interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  showCursor?: boolean;  // default: true — cursor mint piscante a direita
  ambient?: boolean;      // visual-only, nao aceita input
}
```

### Especificacoes visuais

- Container: pill (`--radius-pill`), padding `14px 22px`, max-width `520px`.
- Background: `--color-bg`, border `1px solid --color-border-strong`.
- Fonte: `var(--font-mono)`, 14px, `--color-text-secondary`.
- Icone de lupa a esquerda: 16x16, stroke 1.75.
- **Cursor piscante mint a direita** (largura 2px, altura 16px, glow `--color-ai-glow`, animacao 1.1s steps(1) infinite).
- Focus: border muda para `--color-ai`, box-shadow `0 0 0 4px --color-ai-soft`.

### Uso

```tsx
import { SearchBar } from '@buscou/design-system';

<SearchBar placeholder="O que seu cliente busca?" />
<SearchBar ambient defaultValue="clinica odonto perto de mim" />
<SearchBar showCursor={false} />
```

### Por que e a assinatura

Este componente e o **gesto de origem** da marca ("alguem buscou"). O cursor piscante mint significa "sistema ativo, tempo real". Usar sempre que a pagina tiver uma intencao de busca — hero, onboarding, empty states.

---

## 4. Badge

Fonte: [`identidade-visual/components/Badge.tsx`](../../identidade-visual/components/Badge.tsx) + `Badge.css`

### API

```ts
type BadgeVariant = 'neutral' | 'ai' | 'brand' | 'coral' | 'warn' | 'success';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;  // default: 'neutral'
  pulse?: boolean;         // dot pulsante para estados live
}
```

### Variants

| Variant | Background | Color | Uso |
|---|---|---|---|
| `neutral` | `--color-bg-elev-3` | `--color-text-secondary` | Tag generica. |
| `ai` | `--color-ai-soft` | `--color-ai` | Live/online. |
| `brand` | `--color-brand-soft` | `--color-brand-300` | Beta, produto. |
| `coral` | `rgba(255,107,61,0.1)` | `--color-coral` | Erro. |
| `warn` | `rgba(255,184,77,0.1)` | `--color-warn` | Alerta. |
| `success` | `--color-ai-soft` | `--color-ai` | Sucesso. |

### Especificacoes visuais

- `padding: 4px 10px`
- `border-radius: var(--radius-pill)`
- `font-family: var(--font-mono)`, 10px, 500, uppercase, `letter-spacing: +0.12em`
- Com `pulse`: dot de 6px com animacao de anel expandindo (`badge-pulse 2s infinite`).

### Uso

```tsx
<Badge variant="ai" pulse>Online</Badge>
<Badge variant="brand">Beta</Badge>
<Badge variant="coral">Erro</Badge>
<Badge variant="neutral">SEO</Badge>
```

---

## Estados compartilhados

Todos os componentes interativos do DS devem respeitar:

| Estado | Comportamento |
|---|---|
| `hover` | Transicao `--transition-base` (200ms). Cor/background mudam, opcional glow. |
| `focus-visible` | `outline: 2px solid var(--color-ai); outline-offset: 2px`. |
| `active` | `transform: translateY(1px)`. |
| `disabled` | `opacity: 0.4; cursor: not-allowed; transform: none`. |

---

## Importando via barrel export

```tsx
import {
  Button,
  Card, CardHeader, CardTitle, CardBody, CardFooter,
  SearchBar,
  Badge,
  colors,
} from '@buscou/design-system';
```

E o CSS uma vez no entry point:

```ts
import '@buscou/design-system/index.css';
```

---

## Roadmap de novos componentes

Ainda nao existem mas estao no roadmap v2 do DS:

- `Input` — campo de texto standalone
- `Select` — dropdown nativo estilizado
- `Modal` — dialog com overlay e focus trap
- `Toast` — notificacao transitoria
- `KPICard` — card especializado para metricas com delta %
- `DataTable` — tabela com sort, filter, paginacao

Criar seguindo [[Template - Componente UI]] antes de implementar.

---

## Links cruzados

- [[Sistema de Cores]] — tokens que os componentes consomem
- [[Tokens de Design]] — radius, spacing, shadow, transition
- [[Tipografia]] — Geist + Geist Mono usados aqui
- [[Template - Componente UI]] — padrao para documentar novos
- [[Regras de Uso]] — consolidacao
