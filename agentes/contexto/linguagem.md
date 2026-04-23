---
sincronizado_em: 2026-04-23
fonte: base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md (secao 6) + Decision Log - 2026-04-23 - Infra Mensal.md + Decision Log - 2026-04-23 - Venda Consultiva.md
versao: 1.2.0
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
| "servico mensal" | Nao e servico | "tecnologia com implementacao unica + infra mensal" |
| "mensalidade de servico" | A infra mensal e passthrough, nao servico | "infra mensal" ou "custo de operacao do motor" |
| "mensalidade de gestao" | Idem | "infra mensal" |
| "plano mensal" | Nao ha planos | "a oferta" ou "o modelo comercial" |
| "assinatura SaaS" (em copy publico) | Comercialmente nao somos assinatura | "implementacao + infra" |
| "plano" (Starter/Growth/Scale) | Nao ha planos | "a oferta" |
| "SaaS" (em copy de vendas) | Tecnicamente sim, comercialmente nao | "tecnologia", "sistema" |
| "contrato mensal" | Nao ha contrato de servico mensal | "implementacao + infra" |
| "horas de trabalho" | Nao vendemos horas | "motor", "tecnologia" |
| "piloto automatico" | Gasto, abstrato | "automacao de presenca" |
| "sistema operacional" | Abstrato | cortar ou "tecnologia" |
| "transformacao digital" | Cliche | cortar |
| "jornada" | Cliche de agencia | cortar ou "trajetoria" |
| "sinergia" | Corporativo ruim | "integracao" |
| "disruptivo" | Inflated | cortar |
| "solucao" (soltinho) | Esvaziado | "tecnologia", "sistema", "motor" |
| "excelencia" | Outdoor | mostrar com numero |
| "qualidade" (como atributo solto) | Idem | mostrar com numero |
| "pagamento unico" (sem contexto) | O modelo nao e so "pagamento unico" — tem infra mensal | "implementacao unica + infra mensal" |
| "sem mensalidade" (afirmacao absoluta) | Ha mensalidade de infra (passthrough) | "sem mensalidade de servico" ou "sem fee de gestao mensal" |
| "self-service" / "compra self-service" | Venda e consultiva na V1 | "venda consultiva" (interno) / "conversa de diagnostico" (publico) |
| "checkout direto" / "comprar direto" | Landing nao expoe preco nem tem checkout | "agendar diagnostico" |
| "call opcional" / "reuniao opcional" | Reuniao e obrigatoria no processo de venda | "reuniao de diagnostico" |
| "sem reuniao obrigatoria" | Contradiz o canonico | (omitir) |
| "sem BANT" (em copy publico) | Ha qualificacao leve na reuniao | (omitir em copy; interno ok) |

---

## PERMITIDO e recomendado

| Termo | Uso |
|---|---|
| "tecnologia" | Como vendemos |
| "sistema" | O que o cliente compra |
| "motor" | O componente de geracao automatica |
| "estrutura" | O componente blog |
| "automacao" | O que o motor faz |
| "implementacao unica" | Componente 1 do modelo comercial |
| "infra mensal" | Componente 2 — **nome preferido em copy publico** |
| "custo de operacao do motor" | Forma explicativa da infra mensal |
| "taxa de infraestrutura" | Forma tecnica |
| "mensalidade de infra" | Aceitavel internamente; em copy publico preferir "infra mensal" |
| "aparecer" | O que entregamos |
| "busca" | Onde aparecemos |
| "SEO" / "AIO" | Canais (em contexto tecnico/operacional) |
| "presenca organica" | Resultado |
| "90 conteudos por mes" | Volume concreto |
| "blog + motor" | Produto em 3 palavras |
| "Google", "ChatGPT", "Perplexity", "Gemini", "Claude", "AI Overviews" | Canais especificos (usar nome proprio) |
| "reuniao de diagnostico" | Primeiro contato estruturado pos-landing |
| "proposta personalizada" / "proposta escrita" | Documento PDF/HTML enviado via WhatsApp pos-reuniao |
| "agendar diagnostico" / "agendar meu diagnostico" | CTA canonico da landing |
| "diagnostico hiperpersonalizado" | Variacao em copy |
| "compra consultiva" | Uso interno/estrategico |
| "conversa de diagnostico" | Variacao em copy publico (mais leve que "compra consultiva") |

---

## Regra de comunicacao — duas linhas sempre explicitas

- **Certo:** "Implementacao R$ 2.500 (ou 12x R$ 250) + infra mensal R$ 300 a partir do mes 2."
- **Certo:** "Paga a implementacao uma vez. Paga a infra que mantem o motor rodando."
- **Certo:** "Mes 1 incluso na implementacao. Infra comeca no mes 2."
- **Errado:** "Plano de R$ 300/mes."
- **Errado:** "Assinatura de R$ 300."
- **Errado:** "Mensalidade do servico."
- **Errado:** "Pacote completo por R$ X total." (nao unificar)

**Nunca** unificar implementacao + infra em um numero totalizado como se fosse um pacote unico. Sempre apresentar as duas linhas separadamente.

---

## Como traduzir jargao tecnico em copy de vendas

Lista complementar para agentes que geram copy de venda:

| Jargao tecnico | Traducao para cliente |
|---|---|
| "SEO" | "aparecer no Google" |
| "AIO" / "GEO" | "ser a resposta no ChatGPT / Gemini / Perplexity" |
| "Keywords" | "termos que seus clientes pesquisam" |
| "Backlinks" | "ser referenciado por outros sites" |
| "Crawling" | "o Google encontrar seu site" |
| "Schema markup" | "dados que ajudam o Google a entender seu negocio" |
| "Topic cluster" | "sistema de conteudo interligado" |
| "On-page SEO" | "melhorar seu site pra atrair mais gente" |
| "Tokens LLM" | "custo da inteligencia que escreve — parte da infra mensal" |
| "Subscription" (interno) | "infra mensal" (publico) |

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

*Snapshot gerado em 2026-04-23 (versao 1.2.0). Lista autoritativa em `base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md` secao 6. Historico: 1.0.0 (2026-04-23) → 1.1.0 (2026-04-23, infra mensal) → 1.2.0 (2026-04-23, venda consultiva — novos termos proibidos e permitidos conforme [[Decision Log - 2026-04-23 - Venda Consultiva]]).*
