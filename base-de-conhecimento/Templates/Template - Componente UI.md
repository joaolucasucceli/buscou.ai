---
tipo: template
area: Empresa
tags: [template, componente, ui, design-system]
atualizado: {{date:YYYY-MM-DD}}
---

# {{title}}

> Resumo em 1-2 frases do que o componente resolve e por que ele existe no DS.

---

## Proposito

Qual problema de UI este componente resolve? Em que contextos ele deve aparecer?

---

## API

```ts
type {{Name}}Variant = '...' | '...';
type {{Name}}Size = '...' | '...';

interface {{Name}}Props extends React.HTMLAttributes<HTMLElement> {
  variant?: {{Name}}Variant;
  size?: {{Name}}Size;
  // outros props
}
```

### Defaults

- `variant`: `'...'`
- `size`: `'...'`

---

## Variants

| Variant | Background | Color | Border | Uso |
|---|---|---|---|---|
| `...` | `var(--color-...)` | `var(--color-...)` | `...` | ... |

---

## Sizes

| Size | Padding | Font | Radius |
|---|---|---|---|
| `sm` | ... | ... | ... |
| `md` | ... | ... | ... |
| `lg` | ... | ... | ... |

---

## Estados

| Estado | Comportamento |
|---|---|
| `hover` | Transicao `var(--transition-base)`. Descricao. |
| `focus-visible` | `outline: 2px solid var(--color-ai); outline-offset: 2px;` |
| `active` | `transform: translateY(1px);` |
| `disabled` | `opacity: 0.4; cursor: not-allowed;` |

---

## Tokens consumidos

Liste **todos** os tokens que este componente usa. Se nao estiver na lista, nao pode estar no codigo.

### Cores
- `var(--color-...)`

### Spacing
- `var(--space-...)`

### Radius
- `var(--radius-...)`

### Transition
- `var(--transition-base)`

### Fonte
- `var(--font-sans)` ou `var(--font-mono)`

---

## Exemplos de uso

### Basico

```tsx
import { {{Name}} } from '@buscou/design-system';

<{{Name}} variant="...">...</{{Name}}>
```

### Com icone

```tsx
import {{Name}} from '@buscou/design-system';
import SparkIcon from '@buscou/design-system/icons/spark.svg';

<{{Name}} leftIcon={<SparkIcon />}>...</{{Name}}>
```

### Em composicao

```tsx
// Dentro de Card
<Card>
  <{{Name}} variant="...">...</{{Name}}>
</Card>
```

---

## Acessibilidade

- Contraste AA (4.5:1) minimo entre texto e fundo.
- Focus visivel obrigatorio (`:focus-visible`).
- Aria labels quando o componente nao tem texto visivel.
- Navegacao por teclado: `Tab`, `Enter`, `Escape` conforme contexto.
- `prefers-reduced-motion`: desabilitar animacoes nao-essenciais.

---

## Quando NAO usar

- Situacao 1: por que outro componente resolve melhor.
- Situacao 2: por que este e inadequado ao contexto.

---

## Anti-patterns

- ✗ Duplicar o componente em outro arquivo para "customizar".
- ✗ Hardcode de cor/spacing dentro do componente.
- ✗ Sobrescrever CSS via className com `!important`.

---

## Dependencias

- Tokens: `identidade-visual/tokens/tokens.css`, `identidade-visual/colors/colors.css`
- Componentes aninhados: `[[Componente X]]`, `[[Componente Y]]`
- Icones: lista dos icones usados

---

## Changelog

| Data | Versao | Mudanca |
|---|---|---|
| YYYY-MM-DD | 1.0.0 | Criacao. |

---

## Links cruzados

- [[Componentes Base]]
- [[Sistema de Cores]]
- [[Tokens de Design]]
- [[Regras de Uso]]
