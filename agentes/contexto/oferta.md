---
sincronizado_em: 2026-04-23
fonte: base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md (secao 5) + 03 - Oferta/Oferta Comercial.md + Decision Log - 2026-04-23 - Infra Mensal.md
versao: 1.1.0
tipo: snapshot-contexto-agente
---

# OFERTA — snapshot para agentes

> Snapshot da oferta canonica. Agentes que escrevem copy ou lidam com venda devem usar este documento como referencia. **Sempre comunicar as duas linhas (implementacao + infra mensal) explicitamente.**

---

## Modelo comercial — duas linhas

### 1. Implementacao (one-time)

| Forma de pagamento | Valor | Observacao |
|---|---|---|
| A vista | **R$ 2.500** | Pix ou cartao |
| Parcelado em ate 12x no cartao | **R$ 3.000** (12x R$ 250) | Cliente assume juros |

**Cobre:** blog publicado e configurado, motor ativo, onboarding, mes 1 de operacao incluso.

### 2. Infra mensal (recurring)

| Item | Valor | Quando comeca |
|---|---|---|
| Infra mensal | **R$ 300/mes** | A partir do mes 2 (mes 1 incluso na implementacao) |

**Cobre:** tokens LLM (Claude, OpenAI) + APIs (Ahrefs, DataForSEO, GSC, Stripe) + hospedagem do pipeline.
**Natureza:** passthrough de custo operacional. Nao e mensalidade de servico.
**Cobranca:** cartao recorrente cadastrado no onboarding.

---

## Politica de inadimplencia da infra

- Gateway faz smart retry 3 vezes (D+0, D+3, D+7).
- Apos 3 falhas consecutivas: motor pausa automaticamente. Nao gera novos artigos.
- **Blog e conteudo ja publicado permanecem no ar.**
- Cliente regulariza → motor retoma no proximo ciclo. Sem penalidade, sem fidelidade, sem multa.

---

## O que o cliente recebe

1. **Blog completo** configurado e publicado em dominio proprio (ate 7 dias apos pagamento da implementacao).
2. **Motor buscou.ai** gerando **3 conteudos por dia = 90 conteudos por mes** (~720.000 caracteres) enquanto infra ativa.
3. **Cada conteudo: 800-1.200 palavras**, otimizado para SEO + AIO.
4. Publicacao automatica no blog do cliente.
5. Dashboard com metricas em tempo real e status das duas linhas de cobranca.
6. Suporte via IA 24/7 + humano em ate 24h quando necessario (enquanto infra ativa).

### Timeline canonica

- **Ate 7 dias:** blog no ar, motor ativo.
- **Ate 30 dias:** indexacao, primeiras impressoes, primeiras aparicoes em IA.
- **Mes 1 (0-30 dias):** incluso na implementacao. Sem cobranca de infra.
- **Mes 2 em diante:** infra mensal R$ 300 cobrada automaticamente.
- **60-90 dias:** primeiras posicoes, trafego crescente.
- **90+ dias:** presenca escalando continuamente enquanto infra ativa.

---

## O que NAO faz parte da oferta

- **Nao ha tiers** (Starter/Growth/Scale).
- **Nao ha plano mensal de servico** (a infra mensal e passthrough de infra, nao servico).
- **Nao ha assinatura SaaS** em copy publico.
- **Nao ha gestao de ads pagos** (Google Ads, Meta Ads).
- **Nao ha producao manual** de conteudo por redator humano.
- **Nao ha consultoria** individualizada de estrategia.
- **Nao ha migracao de site** do cliente (o blog da buscou.ai fica em sub-diretorio ou subdominio).

---

## O que NAO prometer (copy)

- Top 1 no Google em alguma busca especifica.
- Ranqueamento em 7 dias (em 7 dias temos **o blog no ar**, nao posicao).
- Aparicao em 100% das queries do nicho.
- Retorno financeiro X% garantido em Y meses.
- Exclusividade de nicho.
- Motor rodando sem pagar a infra.

## O que se pode prometer

- Blog no ar em **ate 7 dias** apos pagamento da implementacao confirmado.
- Primeiros sinais (indexacao + impressoes no Google) em **ate 30 dias**.
- Volume de **90 conteudos/mes** consistente enquanto infra ativa.
- Otimizacao para Google e IAs (ChatGPT, Perplexity, Gemini, AI Overviews).
- Transparencia total dos custos (implementacao + infra visiveis no checkout e no dashboard).
- Reembolso da implementacao em 14 dias se menos de 10 artigos foram publicados.
- Cancelamento da infra a qualquer momento (motor pausa, blog fica no ar).

---

## Como traduzir termos tecnicos em venda

| Jargao tecnico | Como falar para o cliente |
|---|---|
| "SEO" | "aparecer no Google" |
| "AIO" / "GEO" | "ser a resposta no ChatGPT / Gemini / Perplexity" |
| "Keywords" | "termos que seus clientes pesquisam" |
| "Backlinks" | "ser referenciado por outros sites" |
| "Schema markup" | "dados que ajudam o Google a entender seu negocio" |
| "Tokens LLM" | "custo da inteligencia que escreve — parte da infra mensal" |

---

## Frases-chave para CTAs

- "Comprar a vista — R$ 2.500 no Pix"
- "Parcelar em 12x — R$ 250/mes"
- "Ver demo do motor"
- "Como funciona a infra mensal?" (link para FAQ)
- "Falar com a buscou.ai" (para call opcional — nao obrigatoria)

## Frases-chave para pitch

- "Implementacao unica + infra mensal transparente."
- "Paga a construcao do motor uma vez. Paga R$ 300/mes a conta de luz que mantem ele vivo."
- "Se voce parar de pagar a infra, o motor pausa. O blog fica no ar com tudo que ja foi publicado."
- "No primeiro ano, investimento total fica entre R$ 5.800 e R$ 6.300 — menos de R$ 500/mes de media pra 90 artigos otimizados por mes."

---

*Snapshot gerado em 2026-04-23 (versao 1.1.0). Para pitch completo, objecoes e fluxo de venda, ver `base-de-conhecimento/03 - Oferta/Oferta Comercial.md`. Historico: versao 1.0.0 (2026-04-23) → 1.1.0 (2026-04-23) ao incluir infra mensal conforme Decision Log - 2026-04-23 - Infra Mensal.*
