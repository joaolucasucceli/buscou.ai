---
tipo: estrategia
area: Empresa
tags: [identidade-visual, icones, svg, design-system]
atualizado: 2026-04-23
---

# Icones

> Todos os icones sao **24x24, stroke 1.75, `currentColor`**. Sem excecao.

Fonte: `identidade-visual/icons/*.svg`

---

## Regras fixas (inegociaveis)

1. **Tamanho:** `width="24" height="24"` + `viewBox="0 0 24 24"`.
2. **Stroke width:** `1.75` em TODO path e shape.
3. **Stroke:** `currentColor` (herda do pai via CSS/React).
4. **Stroke linecap:** `round`.
5. **Stroke linejoin:** `round`.
6. **Fill:** `none` (quase sempre) ou `currentColor` quando o desenho pede.
7. **Sem cor hardcoded.** O icone e sempre herdado da cor do texto/botao ao redor.

---

## 7 icones disponiveis

| Nome | Arquivo | Forma | Uso sugerido |
|---|---|---|---|
| `search` | `icons/search.svg` | Lupa (circulo + cabo) | Barra de busca, empty state. |
| `cursor` | `icons/cursor.svg` | I-beam vertical | Indicador de entrada, texto focado. |
| `spark` | `icons/spark.svg` | Estrela 4-pontas + estrelinha | **IA, magia, acao generativa.** |
| `graph` | `icons/graph.svg` | Eixos + linha ascendente | Metricas, analytics, dashboard. |
| `check` | `icons/check.svg` | Tick simples | Confirmacao, sucesso. |
| `arrow` | `icons/arrow.svg` | Seta direita com haste longa | CTA, "saiba mais". |
| `flow` | `icons/flow.svg` | 3 nos conectados | Fluxo, pipeline, etapas. |

---

## Como consumir

### React (import direto do SVG)

```tsx
import SearchIcon from '@buscou/design-system/icons/search.svg';

<SearchIcon className="w-4 h-4 text-[var(--color-ai)]" />
```

### JSX inline (componentes customizados)

```tsx
const SparkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.75"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 L13.4 10.6 L21 12 L13.4 13.4 L12 21 L10.6 13.4 L3 12 L10.6 10.6 Z" />
    <path d="M19 4 L19.5 6 L21.5 6.5 L19.5 7 L19 9 L18.5 7 L16.5 6.5 L18.5 6 Z" strokeWidth="1.2" />
  </svg>
);
```

### Dentro de botoes do DS

```tsx
import { Button } from '@buscou/design-system';
import ArrowIcon from '@buscou/design-system/icons/arrow.svg';

<Button variant="ghost" rightIcon={<ArrowIcon />}>Saiba mais</Button>
```

O CSS do `Button` ja define `.btn svg { width: 16px; height: 16px; flex-shrink: 0 }` — icones dentro de botoes sao 16px.

---

## Tamanhos aplicados (display size)

O icone SVG e sempre 24x24 no source, mas pode ser renderizado em varios tamanhos via CSS:

| Contexto | Tamanho display |
|---|---|
| Dentro de Button | 16px |
| Inline com texto | 16px ou 18px |
| Card header / destaque | 20-24px |
| Hero / feature block | 28-40px (abrir em <svg width={40} .../>) |

Regra: nunca redimensionar abaixo de 14px (perde definicao).

---

## Politica de expansao (novos icones)

Para adicionar um icone novo:

1. Ele e realmente necessario? (checar se um dos 7 ja resolve com rotacao/contexto)
2. Desenhar em 24x24 grid.
3. **Stroke 1.75** obrigatorio, `currentColor`, linecap/linejoin `round`.
4. Exportar como SVG limpo (sem `<metadata>`, sem `inkscape:` ou `sodipodi:` namespaces).
5. Salvar em `identidade-visual/icons/{nome-kebab}.svg`.
6. Atualizar esta nota com o novo icone.
7. Bump minor do design system.

### Fontes de referencia aceitas

- [Lucide Icons](https://lucide.dev/) — base natural (stroke 2 por padrao, ajustar para 1.75).
- [Phosphor](https://phosphoricons.com/) — familia regular, ajustar stroke.
- Icones custom feitos internamente (sempre seguindo as regras acima).

**Nao aceitar:** Material Icons (muito pesado), Font Awesome (estilo conflita), icones com fill solido em grande area (quebra o padrao stroke).

---

## Quando NAO usar icone

- Em logo. **Nunca** anexar icone decorativo ao lado do logotipo.
- Em frases curtas que o verbo ja explica ("Cancelar", "Salvar", "OK").
- Quando o icone so existe por estetica, sem funcao de orientacao.

---

## Links cruzados

- [[Componentes Base]] — como icones sao usados dentro de Button
- [[Elementos Graficos]] — grafismos que combinam icones
- [[Regras de Uso]] — consolidacao
- [[Logos e Variacoes]] — proibicao de anexar icone ao logotipo
