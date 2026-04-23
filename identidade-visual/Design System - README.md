# buscou.ai — Design System

Infraestrutura oficial de design da buscou.ai.
Tokens, logos, icones, tipografia e componentes base — prontos para Next.js / React.

> "Se alguem buscou, voce precisa aparecer."

---

## Instalacao

```bash
# copiar a pasta para seu monorepo
cp -r buscou-design-system ./packages/design-system

# ou publicar como pacote privado
npm publish --access restricted
```

Em um app Next.js / Vite:

```ts
// app/layout.tsx
import '@buscou/design-system/index.css';
```

```tsx
import { Button, SearchBar, Badge, colors } from '@buscou/design-system';
```

---

## Estrutura

```
buscou-design-system/
├── logos/          SVGs + favicons (PNG)
├── icons/          24x24 stroke 1.75, currentColor
├── colors/         JSON + CSS vars + TS tokens
├── typography/     fonts.css + typography.css
├── tokens/         radius, spacing, shadow, transitions
├── components/     Button, Card, SearchBar, Badge (+ React)
├── docs/           esta documentacao
├── index.css       entry point CSS
├── index.ts        barrel export React
└── package.json
```

---

## 1. Como usar as cores

### Em CSS

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

### Em TypeScript / React

```tsx
import { colors } from '@buscou/design-system';

<div style={{ background: colors.bg.base, color: colors.ai.default }} />
```

### Regras

- **Fundo padrao:** sempre `--color-bg` (#08090D). Dark-first.
- **Mint (--color-ai):** acento, nunca base. Maximo 10% da composicao.
- **Violeta (--color-brand):** tecnologia, produto, CTA secundario.
- **Coral:** reservado a erro/alerta. Maximo 2%.
- **Fundo claro:** usar `--color-ai-dark` (#00B37A) em vez do mint padrao.

---

## 2. Como usar os logos

Os logos sao SVGs com texto renderizado em `Geist` + `Geist Mono`.
**A fonte deve estar carregada no contexto de render.**

### React / Next.js

```tsx
import Logo from '@buscou/design-system/logos/buscou-ai-primary-dark.svg';

<Logo width={160} height={40} />
```

### HTML puro

```html
<img src="./logos/buscou-ai-primary-dark.svg" alt="buscou.ai" width="160" />
```

### Quando usar cada variacao

| Arquivo                          | Uso                                    |
|----------------------------------|-----------------------------------------|
| `buscou-ai-primary-dark.svg`     | Padrao. Site, dashboard, fundo escuro.  |
| `buscou-ai-primary-light.svg`    | Docs, imprensa, fundo claro.            |
| `buscou-ai-compact.svg`          | Header mobile, rodape, espacos < 200px. |
| `buscou-ai-mono.svg`             | Impressao 1 cor, inherits `currentColor`. |
| `favicon.svg`                    | Favicon vetorial moderno.               |
| `favicon-16.png` / `favicon-32.png` | Fallback para navegadores antigos.   |

### Clearspace

Margem de pelo menos `1x` a altura do `.ai` em todos os lados.
Tamanho minimo: **80px** digital / **24mm** impresso.

---

## 3. Como usar os tokens

### CSS Variables (recomendado)

```css
.hero {
  padding: var(--space-8);                 /* 64px */
  border-radius: var(--radius-lg);          /* 18px */
  box-shadow: var(--shadow-glow);           /* glow mint */
  transition: background var(--transition-base);
}
```

### JSON (para tools de build)

O `tokens.json` segue o [W3C Design Tokens Format](https://design-tokens.github.io/community-group/format/).
Pode ser consumido por Style Dictionary, Figma Tokens, Tailwind plugin etc.

```bash
npx style-dictionary build --config ./style-dictionary.config.js
```

### Tabela rapida

| Token                | Valor     | Uso                                       |
|----------------------|-----------|-------------------------------------------|
| `--radius-md`        | 10px      | Cards, inputs. Padrao.                    |
| `--radius-pill`      | 100px     | Botoes, badges, search bar.               |
| `--space-4`          | 16px      | Base de spacing.                          |
| `--space-6`          | 32px      | Padding de cards.                         |
| `--shadow-glow`      | mint glow | `.ai`, cursores, elementos live.          |
| `--transition-base`  | 200ms     | Hover / focus / state changes.            |

---

## 4. Componentes

### Button

```tsx
import { Button } from '@buscou/design-system';

<Button variant="primary">Testar gratis</Button>
<Button variant="secondary">Ver demo</Button>
<Button variant="ghost" rightIcon={<ArrowIcon />}>Saiba mais</Button>
```

### SearchBar

```tsx
import { SearchBar } from '@buscou/design-system';

<SearchBar placeholder="O que seu cliente busca?" />
<SearchBar ambient defaultValue="clinica odonto perto de mim" />
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '@buscou/design-system';

<Card variant="accent">
  <CardHeader><CardTitle>Aparicoes em IA</CardTitle></CardHeader>
  <CardBody>+41% vs mes anterior</CardBody>
  <CardFooter>Ultimas 24h</CardFooter>
</Card>
```

### Badge

```tsx
<Badge variant="ai" pulse>Online</Badge>
<Badge variant="brand">Beta</Badge>
<Badge variant="coral">Erro</Badge>
```

---

## 5. Icones

Todos os icones sao 24x24, stroke 1.75, `currentColor`.

```tsx
import SearchIcon from '@buscou/design-system/icons/search.svg';

<SearchIcon className="w-4 h-4 text-[var(--color-ai)]" />
```

Disponiveis: `search`, `cursor`, `spark`, `graph`, `check`, `arrow`, `flow`.

---

## 6. Boas praticas

### Faca

- Sempre consumir tokens via CSS variables. Nunca hardcode cores.
- Usar `--color-ai` com moderacao (10% max da composicao).
- Manter `--font-sans` como padrao. Mono apenas em labels/codigo.
- Usar `--transition-base` (200ms) como padrao de UI.
- Respeitar o clearspace dos logos.
- Renderizar a marca como `buscou.ai` (com ponto, minusculo).

### Nao faca

- Nao criar cores fora da paleta (use as variaveis).
- Nao aplicar gradiente sobre o logotipo.
- Nao usar serifa ou script no nome da marca.
- Nao mudar o stroke dos icones (1.75 obrigatorio).
- Nao escrever "Buscou.AI", "BUSCOU.AI" ou "buscou.AI" — apenas `buscou.ai` ou `BuscouAI`.
- Nao adicionar icones decorativos ao lado do logotipo.

---

## 7. Escala e manutencao

Este DS e pensado para escalar:

- **Tokens primeiro.** Tudo nasce em `colors.json` + `tokens.json`.
- **Componentes sao consumers.** Jamais referencie cores hex em um componente.
- **Versionamento semver.** Mudancas visuais de cor/spacing = bump minor.
  Remocao de token ou breaking API = bump major.
- **Automacao.** Considere integrar com Style Dictionary, Figma Tokens e CI
  que valide contrastes e uso de cores fora da paleta.

---

## 8. Roadmap sugerido

- [ ] Tailwind plugin (consumir tokens como `bg-brand`, `text-ai`)
- [ ] Tema claro opcional (mesma semantica, paleta invertida)
- [ ] Storybook com todos os componentes
- [ ] Testes visuais (Chromatic / Playwright screenshots)
- [ ] Componentes avancados: Input, Select, Modal, Toast, KPICard, DataTable

---

`buscou.ai` — Design System v1.0 — Abril 2026
