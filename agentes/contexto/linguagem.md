---
sincronizado_em: 2026-04-23
fonte: base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md (secao 6)
versao: 1.0.0
tipo: snapshot-contexto-agente
---

# LINGUAGEM — snapshot para agentes

> Snapshot da tabela canonica proibido vs permitido. **Qualquer agente que gera texto publico deve consultar esta lista.** Alteracoes exigem Decision Log.

---

## PROIBIDO em qualquer copy externa

| Termo proibido | Por que | Substituir por |
|---|---|---|
| "agencia" | Nao somos | "tecnologia", "sistema" |
| "gestao de X" | Nao gerimos | "automacao de X" |
| "consultoria" | Nao consultamos | "tecnologia" |
| "servico mensal" | Nao e servico, nao e mensal | "tecnologia com pagamento unico" |
| "assinatura" | Nao ha | "pagamento unico" |
| "mensalidade" | Nao ha | "pagamento unico" |
| "plano" (Starter/Growth/Scale) | Nao ha planos | "a oferta" |
| "SaaS" (em copy de vendas) | Tecnicamente sim, comercialmente nao | "tecnologia", "sistema" |
| "subscription" | Idem | "pagamento unico" |
| "contrato mensal" | Nao ha | "pagamento unico" |
| "horas de trabalho" | Nao vendemos horas | "motor", "tecnologia" |
| "piloto automatico" | Gasto, abstrato | "automacao de presenca" |
| "sistema operacional" | Abstrato | cortar ou "tecnologia" |
| "transformacao digital" | Cliche | cortar |
| "jornada" | Cliche de agencia | cortar ou "trajetoria" |
| "sinergia" | Corporativo ruim | "integracao" |
| "disruptivo" | Inflated | cortar |
| "solucao" (soltinho) | Esvaziado | "tecnologia", "sistema", "motor" |
| "excelencia" | Outdoor | mostrar com numero |
| "qualidade" | Idem | mostrar com numero |

---

## PERMITIDO e recomendado

| Termo | Uso |
|---|---|
| "tecnologia" | Como vendemos |
| "sistema" | O que o cliente compra |
| "motor" | O componente de geracao automatica |
| "estrutura" | O componente blog |
| "automacao" | O que o motor faz |
| "pagamento unico" | Como e vendido |
| "aparecer" | O que entregamos |
| "busca" | Onde aparecemos |
| "SEO" / "AIO" | Canais (em contexto tecnico/operacional) |
| "presenca organica" | Resultado |
| "90 conteudos por mes" | Volume concreto |
| "blog + motor" | Produto em 3 palavras |
| "Google", "ChatGPT", "Perplexity", "Gemini", "Claude", "AI Overviews" | Canais especificos (usar nome proprio) |

---

## Como traduzir jargao tecnico em copy de vendas

Lista complementar para agentes que geram copy de venda:

| Jargao tecnico | Tradução para cliente |
|---|---|
| "SEO" | "aparecer no Google" |
| "AIO" / "GEO" | "ser a resposta no ChatGPT / Gemini / Perplexity" |
| "Keywords" | "termos que seus clientes pesquisam" |
| "Backlinks" | "ser referenciado por outros sites" |
| "Crawling" | "o Google encontrar seu site" |
| "Schema markup" | "dados que ajudam o Google a entender seu negocio" |
| "Topic cluster" | "sistema de conteudo interligado" |
| "On-page SEO" | "melhorar seu site pra atrair mais gente" |

Regra de ouro: se o cliente precisaria pesquisar a palavra no Google para entender, nao e copy de vendas. Traduzir.

---

## Nome da marca (obrigatorio)

- **Visual:** `buscou.ai` — minusculo, com ponto.
- **Institucional (juridico, contrato):** `BuscouAI`.
- **Dominio:** `buscouai.com`.
- **Nunca:** `Buscou.ai`, `Buscou.AI`, `BUSCOU.AI`, `buscou.AI`.

---

## Enforcement

Qualquer texto gerado por agente que contiver termo proibido deve ser:
1. **Auto-corrigido** pelo proprio agente antes de publicar.
2. **Detectado pelo [[Agente Revisor]]** que roda pos-geracao.
3. **Escalado para humano** se nao for auto-corrigivel (ex: texto do cliente importado).

---

*Snapshot gerado em 2026-04-23. Lista autoritativa em `base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md` secao 6.*
