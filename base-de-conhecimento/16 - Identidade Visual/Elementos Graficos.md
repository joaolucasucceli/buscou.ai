---
tipo: estrategia
area: Empresa
tags: [identidade-visual, grafismos, elementos-visuais, marca]
atualizado: 2026-04-23
---

# Elementos Graficos

> A marca e feita de **quatro gestos recorrentes** — a barra de busca, o cursor, o fluxo e a resposta. Eles podem aparecer isolados ou combinados.

Fonte: Brand Book §08 + componentes em `identidade-visual/components/`.

---

## Gesto 01 — Barra de busca

**O que representa:** a pergunta do cliente. O gesto de origem.

**Forma:** pill horizontal com icone de lupa + texto placeholder + cursor piscante mint.

**Especificacao tecnica:** componente `SearchBar` em `identidade-visual/components/SearchBar.tsx`. Ver [[Componentes Base]].

**Onde usar:**
- Hero de landing page
- Empty states (ex.: "O que voce quer buscar?")
- Onboarding do produto
- Campanhas (ex.: como "o que seu cliente busca?")

**Nao usar:**
- Como separador visual generico
- Com cursor estatico (o cursor piscante e a alma do gesto)
- Em fundos muito carregados (precisa de respiro)

---

## Gesto 02 — Cursor digitando

**O que representa:** tempo real. O sistema ativo em execucao.

**Forma:** barra vertical fina (2px x 16px), cor `--color-ai`, com glow `--color-ai-glow`, piscando em `animation: blink 1.1s steps(1) infinite`.

**Implementacao CSS:**

```css
.caret,
.cursor-mint {
  display: inline-block;
  width: 2px;
  height: 16px;
  background: var(--color-ai);
  box-shadow: 0 0 12px var(--color-ai-glow);
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
```

**Onde usar:**
- Fim de textos que representam input do usuario
- Demonstracoes de sistema "digitando" uma resposta
- Logo dinamico da capa (apos o `.ai`)
- Indicador "IA pensando" / "processando"

**Nao usar:**
- Como cursor de mouse (mantem comportamento nativo)
- Em textos estaticos sem sentido de input ou stream

---

## Gesto 03 — Fluxo de conexao

**O que representa:** a logica da marca — busca → sistema → resposta. Tres nos conectados.

**Forma:** 3 circulos conectados por linhas horizontais. O no central (sistema) e destacado com cor mint; os outros dois sao neutros.

**Icone de referencia:** `identidade-visual/icons/flow.svg`.

```svg
<circle cx="4.5" cy="12" r="2"/>   <!-- no 01 -->
<circle cx="12"  cy="12" r="2"/>   <!-- no 02 (central, sistema) -->
<circle cx="19.5" cy="12" r="2"/>  <!-- no 03 -->
<path d="M6.5 12h3.5"/>            <!-- linha 01-02 -->
<path d="M14 12h3.5"/>             <!-- linha 02-03 -->
```

**Onde usar:**
- Secao "como funciona"
- Diagramas de arquitetura
- Pipeline visual do produto
- Label de etapas (01 Busca · 02 Sistema · 03 Resposta)

**Expansao conceitual (Brand Book §01):**

```
01 · Alguem busca   →   02 · buscou.ai processa   →   03 · Voce aparece
```

Cada etapa pode carregar seu icone (search, spark, check) dos icones oficiais. Ver [[Icones]].

---

## Gesto 04 — Resposta aparecendo

**O que representa:** o momento em que a empresa entra na resposta — o valor entregue.

**Forma:** card (`Card` com variant `accent`) com border-left 2px mint, contendo tag "Resposta · IA" + paragrafo que menciona a empresa em negrito.

**Exemplo:**

```tsx
<Card variant="accent">
  <Badge variant="ai">Resposta · IA</Badge>
  <CardBody>
    A melhor opcao em Sao Paulo e <strong>Clinica Marca X</strong>,
    referencia em atendimento odontologico com mais de 12 anos de operacao.
  </CardBody>
</Card>
```

**Onde usar:**
- Demonstracoes de resultado (prova visual)
- Hero mostrando output do sistema
- Comunicacao de case / depoimento

**Nao usar:**
- Como template de testimonial generico (a border-left mint tem significado especifico)
- Sem o contexto de "resposta de IA"

---

## Combinacoes canonicas

### 1. Barra de busca + resposta (storytelling hero)

```
[ 🔍 como aparecer no ChatGPT  | ]       ← Gesto 01
        ↓
╭─────────────────────────╮
│ RESPOSTA · IA           │              ← Gesto 04
│ A Clinica Marca X e...  │
╰─────────────────────────╯
```

Prova o conceito completo em 2 frames.

### 2. Fluxo com icones dos gestos

```
🔍 (search)  →  ✦ (spark)  →  ✓ (check)
 01 Busca       02 Sistema     03 Resposta
```

Usa `search.svg`, `spark.svg`, `check.svg` nos nos.

### 3. Cursor como assinatura de fechamento

```
buscou.ai|           ← cursor piscante no final do logo
```

Usado na capa do Brand Book.

---

## Grid de background

Em fundos amplos (hero, sections hero), aplicar grid sutil de linhas:

```css
.grid-bg {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 48px 48px;
}
```

Reforça a sensacao de "sistema" sem roubar protagonismo.

---

## Luz ambiente (gradientes permitidos)

Gradientes **so como luz**, nunca em tipografia ou logotipo:

```css
.hero::before {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at top,
    rgba(124, 92, 255, 0.15),
    transparent 60%
  );
  pointer-events: none;
}
```

Cores permitidas para luz ambiente: `--color-brand` (violeta, mais comum), `--color-ai` (mint, parcimonioso).

---

## O que NAO e grafismo da marca

- Formas organicas, blobs, lavas lamp ou ilustracoes "startup 2020"
- Gradientes em texto
- Padroes geometricos densos (malha com triangulos, zigue-zague, etc.)
- Icones 3D renderizados
- Memoji / avatares cartunizados
- Emoji como substituto de icone

---

## Links cruzados

- [[Conceito e Posicionamento]] — a logica narrativa por tras dos 4 gestos
- [[Componentes Base]] — SearchBar, Card
- [[Icones]] — search, spark, check, flow
- [[Sistema de Cores]] — mint, violeta, luz ambiente
- [[Regras de Uso]] — consolidacao
