---
tipo: template
area: Vendas
tags: [template, proposta, skill, gerador-proposta-buscou]
atualizado: 2026-04-25
---

> **Atualizado em 2026-04-25** ([[Decision Log - 2026-04-25 - Pricing + ICP + Timeline + Anna V1 manual]]). Valores-ancora subiram (implementação R$ 2.500 → **R$ 3.000**, infra R$ 300 → **R$ 500/mês**). Política de cupom rígida (3 casos) absorvida pela política caso-a-caso (janelas R$ 1.000–3.000 implementação, R$ 300–500/mês infra).

# Variáveis do template de proposta buscou.ai

Contrato entre o template `index.html` e a skill `gerador-proposta-buscou`. A skill extrai esses valores da transcrição + contexto passado pelo dono, e substitui no HTML antes de gerar o PDF.

**Regra geral:** tudo entre `{{VAR}}` é placeholder literal. Skill faz substituição string-level (não precisa template engine — replace simples).

---

## Identidade da empresa

| Placeholder | Tipo | Exemplo | Origem |
|---|---|---|---|
| `{{COMPANY_NAME}}` | string | `Innovate LED` | Nome comercial da empresa, como vai ser chamada no documento |
| `{{NICHE}}` | string | `painéis de LED` | Produto/serviço principal, frase completa pra caber em "empresa de _" |
| `{{NICHE_SHORT}}` | string | `LED` | Versão curta pra headlines apertadas (ex: "...procura LED") |
| `{{NICHE_PRODUCTS}}` | string | `painel de LED para evento, show, corporativo, esportivo, institucional` | Lista curta de tipos de produto, vírgula-separada |
| `{{REGION_FULL}}` | string | `Espírito Santo` | Estado/região por extenso |
| `{{REGION_SHORT}}` | string | `ES` | Sigla da região |
| `{{REGION_CITIES}}` | string | `Vitória, Guarapari, Serra, Vila Velha, Cariacica` | Principais cidades/pólos onde a empresa atua |
| `{{CONTACT_LINE}}` | HTML | `a/c Mary Alves<br>` | Linha opcional "a/c fulano" na capa. Se não houver contato específico, string vazia |

---

## Datas

| Placeholder | Formato | Exemplo |
|---|---|---|
| `{{MEETING_DATE_SHORT}}` | `DD.MM.YYYY` | `24.04.2026` |
| `{{MEETING_DATE_LONG}}` | texto livre | `24 de abril de 2026` |
| `{{EXPIRES_SHORT}}` | `DD.MM.YYYY` | `01.05.2026` |
| `{{EXPIRES_LONG}}` | texto livre | `01 de maio de 2026` |

**Regra de validade:** sempre **7 dias** a partir da data da reunião.

---

## Contexto (slide 2)

| Placeholder | Tipo | Exemplo |
|---|---|---|
| `{{CONTEXT_OPENING}}` | string (1 frase) | `Mari, valeu pela call. Essa proposta consolida tudo que a gente trocou — pra você imprimir, levar pro dono e decidirem juntos.` |
| `{{CONTEXT_COMPANY_PARAGRAPH}}` | string (1-2 frases) | `A Innovate LED atua com painéis de LED no Espírito Santo — locação, produtos para evento, atendimento local. O tráfego hoje vem principalmente de indicação e canais diretos.` |
| `{{CONTEXT_BENEFIT_BLOCK}}` | HTML | `<p>A oferta abaixo tem um <strong style="color: var(--ai);">benefício exclusivo</strong> por ser fruto da nossa parceria de networking: R$ 1.000 off na implementação à vista.</p>` **OU** string vazia se não há desconto |

---

## Diagnóstico (slide 3)

| Placeholder | Exemplo |
|---|---|
| `{{DIAGNOSTIC_QUERY}}` | `painel de LED para evento espirito santo` |
| `{{DIAGNOSTIC_GOOGLE_NOTE}}` | `primeira página dominada por 2–3 concorrentes locais e por resultados genéricos de grandes marketplaces. {{COMPANY_NAME}} não está entre os primeiros resultados orgânicos.` |
| `{{DIAGNOSTIC_IA_NOTE}}` | `quando alguém pergunta "qual o melhor lugar para alugar painel de LED em Vitória/ES", as IAs respondem com base em conteúdo indexado. Hoje, vocês não figuram nessa resposta.` |

---

## Clusters (slide 5)

`{{NICHE_CLUSTERS_CHIPS}}` — HTML de chips. 6-8 chips, cada um é uma keyword que o motor vai atacar. Skill deve gerar baseado no nicho + região.

Formato de cada chip:
```html
<span class="chip">keyword curta</span>
```

Exemplo completo:
```html
<span class="chip">painel de LED para show ES</span>
<span class="chip">locação painel LED corporativo Vitória</span>
<span class="chip">como escolher painel LED para evento</span>
<span class="chip">painel LED P3 vs P4 vs P5</span>
<span class="chip">painel LED outdoor ES</span>
<span class="chip">painel LED casamento Guarapari</span>
<span class="chip">telão de LED empresa ES</span>
<span class="chip">aluguel painel LED esportivo</span>
```

---

## Escopo (slide 6)

`{{SCOPE_EXTRA_ITEMS}}` — HTML opcional de bullets extras. Usado pra brindes ou escopo específico daquela venda.

Formato:
```html
<li>Integração com o CRM do cliente via formulário do blog <span class="gift">brinde parceiro networking</span></li>
```

Se não houver brindes: string vazia.

---

## Valores (slide 7) — pricing canônico + condicional

### Preço à vista (implementação)

**5 placeholders controlam o card principal:**

| Placeholder | Regra |
|---|---|
| `{{PRICING_AVISTA_CLASS}}` | `highlight` se tiver cupom aplicado (preço abaixo do ancora R$ 3.000), senão string vazia |
| `{{PRICING_AVISTA_STRIKETHROUGH}}` | Se tiver cupom: `<span class="price-strikethrough">R$ 3.000</span>` + ` ` (espaço). Se não: string vazia |
| `{{PRICING_AVISTA_DISPLAY}}` | Valor numérico SEM `R$`, formatado BR. Ex: `1.000`, `2.000`, `3.000` (janela canônica R$ 1.000–3.000) |
| `{{PRICING_AVISTA_SUBLABEL}}` | Subtexto curto: `Pix · pagamento único` **OU** `Pix · pagamento único · cupom aplicado` |
| `{{PRICING_AVISTA_NOTE_EXTRA}}` | Sufixo extra no price-note. Ex: ` + integração CRM` (começa com espaço) ou string vazia |

### Badge do desconto (só aparece se `{{PRICING_AVISTA_CLASS}}=highlight`)

`{{DISCOUNT_BADGE}}` — texto curto dentro do badge flutuante. Ex:
- `Cupom aplicado · canal privado`
- Não usar mais "parceria networking" / "early client" como justificativa nominal — política unificada.

Se não há cupom, badge vira irrelevante (class `highlight` não aplicada, `::before` não renderiza).

### Infra mensal (novo bloco — pricing variável)

**3 placeholders controlam a linha da infra:**

| Placeholder | Regra |
|---|---|
| `{{PRICING_INFRA_CLASS}}` | `highlight` se infra tem cupom (abaixo do ancora R$ 500/mês), senão string vazia |
| `{{PRICING_INFRA_STRIKETHROUGH}}` | Se tiver cupom: `<span class="price-strikethrough">R$ 500/mês</span>` + ` ` (espaço). Se não: string vazia |
| `{{PRICING_INFRA_DISPLAY}}` | Valor numérico SEM `R$/mês`, formatado BR. Ex: `300`, `400`, `500` (janela canônica R$ 300–500) |

### Ano 1 — cálculos derivados

| Placeholder | Cálculo |
|---|---|
| `{{YEAR1_AVISTA_TOTAL}}` | `PRICING_AVISTA_DISPLAY + (PRICING_INFRA_DISPLAY × 11)`. Ex: 3.000 + (500 × 11) = **8.500** (default canônico); 1.000 + (300 × 11) = **4.300** (cupom max) |
| `{{YEAR1_AVISTA_AVG}}` | `YEAR1_AVISTA_TOTAL / 12` arredondado. Ex: 8.500 → **708**, 4.300 → **358** |

Valores parcelados (12×) — placeholder dinâmico baseado no preço com cupom (não mais hardcoded). Calcular: `PRICING_AVISTA_DISPLAY / 12` (parcelas), e Ano 1 parcelado = `PRICING_AVISTA_DISPLAY + (PRICING_INFRA_DISPLAY × 11)`.

---

## CTA (slide 9)

| Placeholder | Exemplo |
|---|---|
| `{{WHATSAPP_URL}}` | `https://wa.me/5527996960847?text=...` — URL encoded com mensagem pré-preenchida contextual. Formato da mensagem: `Oi João, aqui é {CONTACT_FIRST_NAME} da {COMPANY_NAME}. O dono aprovou a proposta — pode mandar os próximos passos.` URL-encoded |

Se não houver contato específico, usar genérico: `Oi João, aqui é da {COMPANY_NAME}. Proposta aprovada — próximos passos?`

---

## Tabela de janela canônica vigente

Fonte: [Decision Log — 2026-04-25 — Pricing + ICP + Timeline + Anna V1 manual](../../base-de-conhecimento/05%20-%20Modelo%20de%20Negocio/Decision%20Log%20-%202026-04-25%20-%20Pricing%20%2B%20ICP%20%2B%20Timeline%20%2B%20Anna%20V1%20manual.md)

| Linha | Ancora canônico | Valor com cupom (piso) | Quando descontar |
|---|---|---|---|
| Implementação | R$ 3.000 | R$ 1.000 (66% off) | Caso-a-caso, dono aprova, cupom Stripe no Payment Link |
| Infra mensal | R$ 500/mês | R$ 300/mês (40% off) | Caso-a-caso, dono aprova, cupom Subscription **ou** Payment Link separado R$ 300 |

**Default sem cupom:** R$ 3.000 implementação + R$ 500/mês infra (paga mês 2 em diante).

**Fora da janela canônica** (acima do ancora ou abaixo dos pisos R$ 1.000 / R$ 300): a skill **pausa** e pede Decision Log novo antes de gerar a proposta.

---

## Checklist rápido pra skill

Antes de renderizar, a skill verifica:

- [ ] Todas as variáveis obrigatórias (empresa, nicho, região, datas, preço implementação, preço infra) têm valor
- [ ] Data de expiração = meeting_date + 7 dias
- [ ] Preço implementação dentro da janela R$ 1.000–3.000
- [ ] Preço infra dentro da janela R$ 300–500/mês
- [ ] Cálculos derivados (`YEAR1_AVISTA_*`) conferem com `PRICING_AVISTA_DISPLAY` + (`PRICING_INFRA_DISPLAY` × 11)
- [ ] WhatsApp URL está properly encoded
- [ ] Clusters têm 6-8 chips relevantes ao nicho
- [ ] Brindes (`SCOPE_EXTRA_ITEMS`) só aparecem se negociados (sem adicionar entre as "features padrão")

Se algum item falhar, a skill pausa e pede clarificação ao dono.
