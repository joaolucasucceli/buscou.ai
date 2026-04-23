---
tipo: estrategia
area: Empresa
tags: [identidade-visual, logo, marca, svg, favicon]
atualizado: 2026-04-23
---

# Logos e Variacoes

> Os logos sao SVGs com texto renderizado em `Geist` + `Geist Mono`. A fonte **precisa estar carregada** no contexto de render para que o visual seja preservado.

Fonte: `identidade-visual/logos/`

---

## 5 variacoes do logotipo

| Arquivo | Uso | Cor `.ai` | Fundo previsto |
|---|---|---|---|
| `buscou-ai-primary-dark.svg` | **Padrao.** Site, dashboard, material escuro. | `#00E5A0` (mint) | Escuro (#08090D) |
| `buscou-ai-primary-light.svg` | Docs, imprensa, material em fundo claro. | `#00B37A` (mint escuro) | Claro |
| `buscou-ai-compact.svg` | Header mobile, rodape, espacos < 200px. | `#00E5A0` | Escuro |
| `buscou-ai-mono.svg` | Impressao 1 cor, herdado via `currentColor`. | `currentColor` | Qualquer |
| `favicon.svg` | Favicon vetorial moderno. | `#00E5A0` (ponto mint) | Escuro (retangulo interno) |

### Fallback de favicons

| Arquivo | Uso |
|---|---|
| `favicon-16.png` | Abas antigas, navegadores legacy. |
| `favicon-32.png` | Desktop classico. |
| `apple-touch-icon.png` | iOS home screen (180x180). |

---

## Anatomia do logotipo

```
buscou.ai
-----  ---
  ↓     ↓
Geist   Geist Mono
500     500
#ECEDF0 #00E5A0 (com glow)
```

- `buscou` — Geist (sans) 500, cor texto primario
- `.ai` — Geist Mono 500, cor mint, tracking levemente mais aberto para respirar

A **tensao sans/mono** e a assinatura tipografica da marca.

---

## Clearspace (area de respiro)

Margem minima de **1x a altura do `.ai`** em todos os lados.

```
┌─────────────────────────┐
│     ← 1x altura .ai →   │
│  ↑                      │
│  1x  buscou.ai          │
│  ↓                      │
│     ← 1x altura .ai →   │
└─────────────────────────┘
```

Nenhum elemento (texto, imagem, botao) pode invadir esse espaco.

---

## Tamanhos minimos

- **Digital:** 80px de largura (versao principal) / 44px altura (versao compacta).
- **Impressao:** 24mm de largura.

Abaixo desses tamanhos, a ponta fina do `.ai` perde definicao.

---

## Como usar em codigo

### React (Next.js)

```tsx
import Logo from '@buscou/design-system/logos/buscou-ai-primary-dark.svg';

<Logo width={160} height={40} />
```

### HTML puro

```html
<img src="./logos/buscou-ai-primary-dark.svg" alt="buscou.ai" width="160" />
```

### Atributo `alt` obrigatorio

```
alt="buscou.ai"
```

Sempre minusculo, com ponto. Nao escrever "Buscou AI" ou variacoes. Ver [[Uso do Nome]].

---

## Proibicoes absolutas

- **Nao aplicar gradiente** sobre o logotipo. O contraste e sempre cor solida em `buscou` vs mint solido em `.ai`.
- **Nao trocar a fonte.** Geist + Geist Mono sao obrigatorios.
- **Nao adicionar icones** (lupa, robo, raio) ao lado do logotipo. A tipografia sozinha e o logo.
- **Nao girar, espelhar ou distorcer** o logotipo.
- **Nao mudar a cor** do `buscou` (sempre texto primario claro / escuro conforme fundo).
- **Nao usar** `#00E5A0` em fundo claro — sem contraste suficiente. Usar `buscou-ai-primary-light.svg` que ja traz `#00B37A`.

---

## Checklist antes de publicar

- [ ] Variante certa para o fundo? (dark/light/compact/mono)
- [ ] Clearspace de 1x respeitado?
- [ ] Tamanho minimo respeitado (80px / 44px / 24mm)?
- [ ] Fonte `Geist` + `Geist Mono` carregada no contexto?
- [ ] `alt="buscou.ai"` em HTML?
- [ ] Sem gradiente, icone anexo, rotacao ou distorcao?

---

## Links cruzados

- [[Uso do Nome]] — regras de nomenclatura
- [[Sistema de Cores]] — mint `#00E5A0` vs mint escuro `#00B37A`
- [[Tipografia]] — Geist + Geist Mono
- [[Regras de Uso]] — consolidacao
