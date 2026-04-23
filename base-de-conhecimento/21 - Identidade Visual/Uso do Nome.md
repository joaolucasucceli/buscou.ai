---
tipo: estrategia
area: Empresa
tags: [identidade-visual, marca, nome, nomenclatura, naming]
atualizado: 2026-04-23
---

# Uso do Nome

> O nome da marca sempre e escrito com o dominio visualmente embutido. O `.ai` nao e um detalhe tecnico — e identidade.

---

## Duas formas validas

### Forma principal — `buscou.ai`

Usar em **todo contexto visual**: logo, site, dashboard, redes sociais, campanhas, comunicacao de produto. E a forma padrao e preferida da marca.

- `buscou` — minusculo, texto (Geist)
- `.ai` — monospace (Geist Mono), cor de destaque (mint), glow em fundos escuros

### Forma secundaria — `BuscouAI`

Usar **apenas** em:

- Textos juridicos
- Imprensa
- Contratos
- Documentos oficiais
- Contextos onde o ponto nao e renderizado ou pode causar confusao tecnica

---

## 8 regras obrigatorias

1. Sempre escrever em minusculo, exceto em textos institucionais (`BuscouAI`).
2. O `b` nunca tem maiuscula em `buscou.ai`.
3. O `.ai` deve receber tratamento visual distintivo sempre que possivel (cor mint + Geist Mono).
4. O ponto `.` faz parte da identidade — nunca usar espaco no lugar.
5. Nao separar `buscou` e `.ai` em linhas diferentes.
6. **Dominio real: `buscouai.com`** — nunca usar `buscou.ai` como URL clicavel.
7. Nunca escrever "Buscou.ai" (capitalizado misto sem padrao).
8. Nunca traduzir — o nome e o mesmo em qualquer idioma.

---

## Erros proibidos

| Errado | Por que |
|---|---|
| `Buscou.AI` | Capitalizacao mista sem padrao. |
| `BUSCOU.AI` | Caixa alta destroi a tensao sans/mono. |
| `Buscou.ai` | "B" maiusculo sem ser institucional. |
| `buscou .ai` | Espaco antes do ponto. |
| `Buscou AI` | Remove o ponto. |
| `buscouai` como visual | So o dominio tem essa forma. |

---

## Implementacao HTML (brand lockup)

Quando o nome aparece em HTML (nao SVG), usar `.brand-lockup` de `identidade-visual/typography/typography.css`:

```html
<span class="brand-lockup">buscou<span class="ai">.ai</span></span>
```

Em fundo claro, adicionar a classe `.on-light` para neutralizar o glow e trocar o mint:

```html
<span class="brand-lockup on-light">buscou<span class="ai">.ai</span></span>
```

---

## Implementacao SVG (logo oficial)

Preferir sempre SVG de `identidade-visual/logos/` a renderizar o nome em texto. Ver [[Logos e Variacoes]].

---

## Contexto de audio / leitura em voz alta

Pronunciar como "**buscou ponto ai**" ou "**buscou ai**" conforme contexto. Em portugues, "ai" le-se como "a-i" (duas silabas) — nunca como "ei" ou "ai!" (interjeicao).

---

## Links cruzados

- [[Logos e Variacoes]] — logo SVG oficial e quando usar cada variacao
- [[Tipografia]] — Geist, Geist Mono e a tensao sans/mono
- [[Regras de Uso]] — consolidacao de todas as regras da marca
- [[Conceito e Posicionamento]] — por que o nome foi construido assim
