---
tipo: template
area: Vendas
tags: [template, proposta, canonico]
atualizado: 2026-04-24
---

# Template canônico de proposta buscou.ai

Fonte única da verdade da proposta comercial. Todas as propostas geradas pela skill `gerador-proposta-buscou` partem deste template.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Template HTML com placeholders `{{VAR}}`. 10 slides canônicos. Dark-first no navegador, light mode no PDF via `@media print` |
| `variaveis.md` | Contrato de variáveis — nome, formato, exemplos, regras de preenchimento |
| `README.md` | Este arquivo — como usar, como atualizar, histórico de versões |

## Como a skill usa

1. Skill lê `index.html` em memória
2. Para cada `{{VAR}}` no variaveis.md, skill extrai/calcula o valor
3. Skill faz `replaceAll` string-level e salva em HTML temporário em `%TEMP%/proposta-buscou/<slug>/index.html`
4. Chrome headless gera PDF do HTML temporário (usa `@media print` light mode)
5. PDF vai pra `C:\Users\joaol\Desktop\Propostas Buscou\<slug>-<YYYY-MM-DD>.pdf`
6. HTML temporário é descartado

**O template NUNCA é editado per-cliente.** Se precisar ajustar algo, edita aqui uma vez e o efeito aparece em todas as próximas propostas.

## 10 slides canônicos

1. **Capa** — brand, headline "Que a [empresa] apareça quando alguém procura [nicho]", tagline, data, validade
2. **Contexto** — resumo da reunião em 2-3 parágrafos
3. **Diagnóstico** — prova de que empresa não aparece hoje (SERP + IA)
4. **Metodologia** — blog + motor (2 cards)
5. **Clusters do nicho** — exemplos concretos de queries que o motor vai atacar
6. **Escopo** — checklist do que está incluso
7. **Valores** — pricing à vista vs 12× + infra + total ano 1
8. **Timeline** — D+7, D+30, D+60-90
9. **Permanência + CTA** — o que fica com o cliente + botão WhatsApp
10. **Rodapé** — brand + meta

## Regras visuais inegociáveis

- Tokens CSS do design system (`:root` replicado inline pra não depender de import)
- Dark-first no navegador; light mode automático em `@media print`
- Logo `buscou.ai` em texto com `.ai` em mint (Geist Mono, text-shadow suave)
- Fontes via Google Fonts: Geist + Geist Mono + Instrument Serif
- Mint ≤10% da composição, coral 0% (não há alerta crítico em proposta)
- Tipografia: `clamp()` em tudo pra escalar bem do mobile ao desktop

## Regras de linguagem

Da [VERDADE_UNICA_BUSCOU.md](../../base-de-conhecimento/00%20-%20Verdade%20Unica/VERDADE_UNICA_BUSCOU.md):

### Proibido

- "agência", "plano", "consultoria", "serviço mensal", "mensalidade de serviço"
- "plano mensal", "jornada", "piloto automático", "sinergia", "transformação digital"
- Nunca prometer top 1, retorno X%, exclusividade, posição específica no Google

### Obrigatório

- Sempre separar explicitamente "implementação única" + "infra mensal"
- Nome da marca: `buscou.ai` (visual) / `BuscouAI` (jurídico)
- Headline canônica: "Se alguém buscou, quem apareceu foi você?"
- Promessa honesta: aparecer com consistência, não top 1 garantido

## Como atualizar

### Mudança em conteúdo (textos de slides)
1. Edita `index.html` direto
2. Testa renderização local (abre em navegador)
3. Testa PDF via Chrome headless
4. Commit `BAI-XX: ajustar <o-que>` no template
5. Avisar no Slack/changelog pro dono saber que proposta mudou

### Mudança em placeholders (novo `{{VAR}}` ou renomeação)
1. Edita `index.html` e `variaveis.md` juntos
2. Edita a skill `~/.claude/skills/gerador-proposta-buscou/SKILL.md` pra suportar a nova variável
3. Testa end-to-end gerando uma proposta fictícia
4. Commit único com todas as 3 mudanças

### Mudança em slides (adicionar/remover slide)
1. Decisão precisa estar alinhada com fluxo canônico de proposta — checar Oferta Comercial.md do vault
2. Atualizar variaveis.md seção de slides
3. Se for nova seção canônica, atualizar VERDADE_UNICA também

## Histórico de versões

| Data | Versão | Mudança | Issue |
|---|---|---|---|
| 2026-04-24 | v1.0 | Versão inicial. 10 slides em modo slide. Deriva da proposta Innovate LED (`prototipos/proposta-innovate-led-2026-04-24/`) com generalização via placeholders | BAI-79 |

## Teste rápido local

```bash
# Abre o template literal no navegador (vai mostrar {{VAR}} literais)
start prototipos/template-proposta-buscou/index.html
```

Pra testar com variáveis preenchidas, rodar a skill `gerador-proposta-buscou` — ela faz o replace e gera o PDF.

## Por que o HTML tem `{{VAR}}` soltos no meio do CSS?

Há um caso específico: `{{DISCOUNT_BADGE}}` dentro de `.pricing-card.highlight::before { content: '{{DISCOUNT_BADGE}}'; }`. É proposital — quando o skill substitui, o badge do desconto aparece só se a classe `highlight` está aplicada. Se não tiver highlight, o `::before` nem é renderizado, então o badge "some" naturalmente.

## Limitações conhecidas

- Chrome headless `--print-to-pdf` às vezes não carrega Google Fonts rápido o suficiente. Solução: `--virtual-time-budget=5000` no comando
- Em viewports muito estreitos (< 360px), cards de pricing ficam apertados — fallback é grid de 1 coluna via `@media (max-width: 768px)`
- PDF A4 assume 16mm de margem. Conteúdo muito denso em slide 7 (valores) pode passar da página em impressoras que adicionam margens próprias
