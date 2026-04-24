---
tipo: template
area: Vendas
tags: [template, proposta, skill, gerador-proposta-buscou]
atualizado: 2026-04-24
---

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

### Preço à vista

**4 placeholders controlam o card principal:**

| Placeholder | Regra |
|---|---|
| `{{PRICING_AVISTA_CLASS}}` | `highlight` se tiver desconto canônico aplicado, senão string vazia |
| `{{PRICING_AVISTA_STRIKETHROUGH}}` | Se tiver desconto: `<span class="price-strikethrough">R$ 2.500</span>` + ` ` (espaço). Se não: string vazia |
| `{{PRICING_AVISTA_DISPLAY}}` | Valor numérico SEM `R$`, formatado BR. Ex: `2.000`, `2.200`, `2.500` |
| `{{PRICING_AVISTA_SUBLABEL}}` | Subtexto curto: `Pix · pagamento único` **OU** `Pix · pagamento único · R$ 1.000 off exclusivo parceria networking` **OU** `Pix · pagamento único · R$ 300 off early client com case` |
| `{{PRICING_AVISTA_NOTE_EXTRA}}` | Sufixo extra no price-note. Ex: ` + integração CRM` (começa com espaço) ou string vazia |

### Badge do desconto (só aparece se `{{PRICING_AVISTA_CLASS}}=highlight`)

`{{DISCOUNT_BADGE}}` — texto curto dentro do badge flutuante. Ex:
- `Benefício exclusivo — parceria de networking`
- `Early client com case`

Se não há desconto, badge vira irrelevante (class `highlight` não aplicada, `::before` não renderiza).

### Ano 1 — cálculos derivados

| Placeholder | Cálculo |
|---|---|
| `{{YEAR1_AVISTA_TOTAL}}` | `PRICING_AVISTA_DISPLAY + (300 × 11)`. Ex: 2.000 → **5.300**, 2.500 → **5.800** |
| `{{YEAR1_AVISTA_AVG}}` | `YEAR1_AVISTA_TOTAL / 12` arredondado. Ex: 5.300 → **441**, 5.800 → **483** |

Valores parcelados (12×) são **fixos R$ 3.000 / R$ 250 / R$ 6.300 / R$ 525** — não variam, hardcoded no template.

---

## CTA (slide 9)

| Placeholder | Exemplo |
|---|---|
| `{{WHATSAPP_URL}}` | `https://wa.me/5527996960847?text=...` — URL encoded com mensagem pré-preenchida contextual. Formato da mensagem: `Oi João, aqui é {CONTACT_FIRST_NAME} da {COMPANY_NAME}. O dono aprovou a proposta — pode mandar os próximos passos.` URL-encoded |

Se não houver contato específico, usar genérico: `Oi João, aqui é da {COMPANY_NAME}. Proposta aprovada — próximos passos?`

---

## Tabela de descontos canônicos vigentes

Fonte: [Decision Log — 2026-04-24 — Benefício Parceiro Networking](../../base-de-conhecimento/05%20-%20Modelo%20de%20Negocio/Decision%20Log%20-%202026-04-24%20-%20Beneficio%20Parceiro%20Networking.md)

| Desconto | Valor | Preço final à vista | Quando aplicar |
|---|---|---|---|
| Nenhum (padrão) | — | R$ 2.500 | Default. Sem justificativa canônica pra desconto |
| Parceiro networking | R$ 1.000 off | R$ 2.000 | Indicação direta de parceiro pré-estabelecido. Limite 3/quarter. Aprovação do dono |
| Primeiros 5 clientes com case | R$ 300 off | R$ 2.200 | Cliente topou virar case (prova social, entrevista). Limite: primeiros 5 |

**Sem outros descontos.** Se o dono pedir um valor diferente desses 3, a skill deve pausar e perguntar antes de gerar a proposta.

---

## Checklist rápido pra skill

Antes de renderizar, a skill verifica:

- [ ] Todas as variáveis obrigatórias (empresa, nicho, região, datas, preço) têm valor
- [ ] Data de expiração = meeting_date + 7 dias
- [ ] Preço à vista bate com um dos 3 canônicos da tabela
- [ ] Cálculos derivados (`YEAR1_AVISTA_*`) conferem com preço à vista
- [ ] WhatsApp URL está properly encoded
- [ ] Clusters têm 6-8 chips relevantes ao nicho
- [ ] Brindes (`SCOPE_EXTRA_ITEMS`) só aparecem se negociados (sem adicionar entre as "features padrão")

Se algum item falhar, a skill pausa e pede clarificação ao dono.
