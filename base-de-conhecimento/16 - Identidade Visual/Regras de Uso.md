---
tipo: estrategia
area: Empresa
tags: [identidade-visual, regras, design-system, marca, enforcement]
atualizado: 2026-04-23
---

# Regras de Uso

> Sistema e consistencia. Estas sao as regras inegociaveis de aplicacao da marca.

Este e o documento operacional. **Ao mexer em qualquer UI, conteudo ou aplicacao visual, consultar aqui primeiro.**

Fonte: Brand Book §10 + §11 + Design System README §6.

---

## Logo

- **+** Aplicar sempre com o `.ai` em mint (`#00E5A0`).
- **+** Usar glow apenas em fundos escuros.
- **+** Respeitar clearspace de **1x a altura do `.ai`** em todos os lados.
- **+** Tamanho minimo: **80px digital / 24mm impresso**.
- **+** Em fundo claro, mint muda para `#00B37A` (`buscou-ai-primary-light.svg`).
- **+** Fonte `Geist` + `Geist Mono` deve estar carregada no contexto de render.
- **+** Em HTML (nao SVG), usar classe `.brand-lockup` (`typography.css`).
- **+** Atributo `alt="buscou.ai"` em `<img>` / equivalente em `next/image`.

### Proibicoes

- ✗ Nao aplicar gradiente sobre o logotipo.
- ✗ Nao adicionar icones (lupa, robo, raio) ao lado do logotipo.
- ✗ Nao usar serifa ou script no nome.
- ✗ Nao girar, espelhar ou distorcer.
- ✗ Nao trocar a cor do `buscou` (sempre texto primario).
- ✗ Nao usar `#00E5A0` em fundo claro (sem contraste suficiente).

---

## Nome da marca

- **+** Forma principal: **`buscou.ai`** — sempre minusculo, com ponto, sem espaco.
- **+** Forma secundaria: **`BuscouAI`** — so em juridico, imprensa, contratos.
- **+** O ponto `.` faz parte da identidade.
- **+** Nao separar `buscou` e `.ai` em linhas diferentes.
- **+** Dominio real: `buscouai.com` — nunca `buscou.ai` como URL.
- **+** Nao traduzir — o nome e o mesmo em qualquer idioma.

### Proibicoes

- ✗ `Buscou.AI`, `BUSCOU.AI`, `buscou.AI`, `Buscou.ai` — todas erradas.
- ✗ `buscou .ai` com espaco antes do ponto.
- ✗ `Buscou AI` sem o ponto.

---

## Cores

- **+** Fundo padrao sempre `#08090D` (`--color-bg`). Dark-first.
- **+** Mint (`--color-ai`) e **acento**, nunca base. Maximo **10%** da composicao.
- **+** Violeta (`--color-brand`) indica tecnologia, acao, CTA secundario.
- **+** Coral (`--color-coral`) reservado a **erro / alerta critico**. Maximo **2%**.
- **+** Gradientes apenas como **luz ambiente** (fundo, radial-gradient). Nunca em tipografia.
- **+** Consumir sempre via CSS variables (`var(--color-*)`). Nunca hardcode HEX.

### Proibicoes

- ✗ Inventar cor fora da paleta.
- ✗ Usar `#00E5A0` sobre fundo claro (trocar por `#00B37A`).
- ✗ Gradiente em texto ou logo.
- ✗ Fundo colorido vibrante como base (violar dark-first).

---

## Tipografia

- **+** **Geist** para tudo — exceto `.ai`, labels e metadados.
- **+** **Geist Mono** para labels em **uppercase com tracking `+0.12em`** (eyebrow, badge, card footer).
- **+** **Tracking negativo em displays** (-0.03 a -0.055em conforme tamanho).
- **+** **Instrument Serif** restrito a citacoes e manifestos.
- **+** Peso principal: **400 body / 500 display**.
- **+** Em Next.js, usar `next/font` para auto-hosting.

### Proibicoes

- ✗ Usar pesos > 600 (nao existe "bold pesado" na marca).
- ✗ Serif em titulos normais.
- ✗ Tracking positivo em displays (quebra coesao).
- ✗ Trocar a fonte do logotipo.

---

## Icones

- **+** Sempre **24x24 viewBox**, stroke **1.75**, `currentColor`.
- **+** `stroke-linecap: round` e `stroke-linejoin: round`.
- **+** Cor herdada do contexto (via `currentColor`).
- **+** Dentro de botoes, renderizar em 16px.
- **+** Novo icone entra em `identidade-visual/icons/` antes de ser usado.

### Proibicoes

- ✗ Alterar o stroke width (1.75 e inviolavel).
- ✗ Icone com fill colorido hardcoded.
- ✗ Icone 3D, material, ou estilo conflitante.
- ✗ Emoji como substituto de icone.

---

## Componentes base

- **+** Reusar `Button`, `Card`, `SearchBar`, `Badge` do DS.
- **+** Importar via `@buscou/design-system`.
- **+** Novo componente segue `[[Template - Componente UI]]` e so entra em `identidade-visual/components/` apos documentado.
- **+** Focus visible: `outline: 2px solid var(--color-ai); outline-offset: 2px`.
- **+** Transitions padrao `var(--transition-base)` (200ms).

### Proibicoes

- ✗ Duplicar componente do DS em outro arquivo.
- ✗ Criar variante de componente com cor inventada.
- ✗ Modificar radius de Button/Badge (sempre `pill`).

---

## Composicao / Layout

- **+** Grid **12 colunas**, gutter **24px**, margem **32px+**.
- **+** Bordas **1px** em superficies (evitar 2px+).
- **+** Raios **10/18/28px** conforme escala (`md`, `lg`, `xl`).
- **+** `border-radius: pill` (100px) para botoes, badges, search bar.
- **+** Cursor piscante e assinatura — usar em momentos-chave.
- **+** Grid de background sutil em fundos amplos.
- **+** Container `max-width: 1240px`, padding lateral `32px`.

### Proibicoes

- ✗ Bordas 2px+ em cards (carregado).
- ✗ Raios fora da escala (usar sempre `--radius-*`).
- ✗ Sombra dramatica em tudo (dark-first usa elevacao por cor).

---

## Spacing e tokens

- **+** Spacing sempre via `var(--space-*)` (base 4px).
- **+** `--space-4` (16px) e a base.
- **+** Cards: padding `--space-6` (32px).
- **+** Secoes: padding vertical `--space-8` (64px) ou `--space-9` (96px).
- **+** Nunca valores "quebrados" (`18px`, `22px`) — arredondar para o token proximo.

---

## 6 erros comuns (proibidos explicitamente)

Do Brand Book §11:

1. **Capitalizacao errada** — `Buscou.AI`, `buscou.AI`, `Buscou.ai`.
2. **Mint padrao em fundo claro** — `#00E5A0` sem contraste; usar `#00B37A`.
3. **Espaco antes do ponto** — `buscou .ai`.
4. **Gradiente no logotipo** — o contraste e mint solido em `.ai`.
5. **Fonte errada** — serifa ou script no nome. Geist e obrigatorio.
6. **Icone decorativo anexo** — lupa/robo/raio ao lado do logo.

---

## Checklist de entrega de UI

Antes de commitar qualquer interface ou componente:

- [ ] Importou `identidade-visual/index.css` no entry point?
- [ ] Todo valor de cor vem de `var(--color-*)`?
- [ ] Todo valor de spacing vem de `var(--space-*)`?
- [ ] Todo radius vem de `var(--radius-*)`?
- [ ] Transitions usam `var(--transition-base)` (ou variantes)?
- [ ] Logo via SVG de `identidade-visual/logos/`, nao texto?
- [ ] Icones 24x24, stroke 1.75, `currentColor`?
- [ ] Mint ≤ 10% da composicao?
- [ ] Coral ≤ 2%?
- [ ] Fundo padrao `#08090D`?
- [ ] Se fundo claro: mint trocado para `#00B37A`?
- [ ] Nome da marca sempre `buscou.ai` (ou `BuscouAI` em juridico)?
- [ ] Componentes existentes do DS foram reusados, nao duplicados?
- [ ] Focus visible implementado?
- [ ] Copy segue [[Tom de Voz e Marketing]] (direto, com numeros, sem jargao)?

---

## Quando precisar de excecao

Se uma regra bloqueia um objetivo legitimo:

1. Documentar a necessidade em issue no Linear.
2. Discutir o precedente — vai virar novo padrao ou e caso isolado?
3. Se virar padrao: atualizar esta nota + tokens + Brand Book.
4. Se isolado: documentar em `docs/vault/decisoes/` do projeto, com a data.

Nunca quebrar regra silenciosamente.

---

## Links cruzados

- [[Auditoria da Identidade Visual]] — inventario
- [[Uso do Nome]] — regras completas de nomenclatura
- [[Logos e Variacoes]] — uso e proibicoes do logo
- [[Sistema de Cores]] — paleta completa
- [[Tipografia]] — escala e pesos
- [[Tokens de Design]] — radius, spacing, shadow, transition
- [[Componentes Base]] — Button, Card, SearchBar, Badge
- [[Icones]] — 7 icones + regra stroke 1.75
- [[Elementos Graficos]] — 4 gestos recorrentes
- [[Tom de Voz e Marketing]] — voz da marca
