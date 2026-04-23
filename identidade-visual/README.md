# identidade-visual — codigo e assets do Design System buscou.ai

Pasta de **codigo + assets** do Design System. Docs narrativos (regras, tokens, cores, tipografia, componentes, uso do nome, etc) moram no vault em [../base-de-conhecimento/16 - Identidade Visual/](../base-de-conhecimento/16%20-%20Identidade%20Visual/).

## O que mora aqui

| Pasta | Conteudo |
|---|---|
| `colors/` | `colors.css` + `colors.json` + `colors.ts` (paleta em 3 formatos) |
| `components/` | `Button`, `Card`, `SearchBar`, `Badge` (React + CSS) |
| `icons/` | 7 SVGs 24x24 stroke 1.75 currentColor |
| `logos/` | SVGs do logo + favicons PNG + PFP Instagram |
| `tokens/` | `tokens.css` + `tokens.json` (radius, spacing, shadow, transition) |
| `typography/` | `fonts.css` + `typography.css` |
| `index.css` | entry point CSS (plug-and-play) |
| `index.ts` | barrel export React |
| `package.json` | metadados do pacote (candidato a publicacao como `@buscou/design-system`) |

## Instalacao

Em um app Next.js / Vite:

```ts
// app/layout.tsx
import '@buscou/design-system/index.css';
```

```tsx
import { Button, SearchBar, Badge, colors } from '@buscou/design-system';
```

## Regras essenciais

- **Tokens primeiro.** Consumir via CSS variables (`var(--color-*)`, `var(--radius-*)`). Nunca hardcode.
- **Fundo padrao:** dark-first (`#08090D`). Em fundo claro, mint troca para `#00B37A`.
- **Mint** (`--color-ai`) <= 10% da composicao. **Coral** <= 2%.
- **Icones:** 24x24, stroke 1.75, `currentColor`. Sem excecao.
- **Nome da marca:** `buscou.ai` (visual) / `BuscouAI` (juridico). Nunca "Buscou.AI" ou "BUSCOU.AI".

Detalhamento completo + rationale de cada regra no vault: [../base-de-conhecimento/16 - Identidade Visual/Regras de Uso.md](../base-de-conhecimento/16%20-%20Identidade%20Visual/Regras%20de%20Uso.md).

Changelog do pacote: [../base-de-conhecimento/16 - Identidade Visual/CHANGELOG - Design System.md](../base-de-conhecimento/16%20-%20Identidade%20Visual/CHANGELOG%20-%20Design%20System.md).
