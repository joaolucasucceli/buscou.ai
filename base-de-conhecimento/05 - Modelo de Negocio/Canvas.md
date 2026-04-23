---
tipo: empresa
area: Negocio
tags: [empresa, canvas, estrategia]
atualizado: 2026-04-23
---

# Business Model Canvas

> **Fonte canonica:** [[VERDADE_UNICA_BUSCOU]] (decisao sobre produto, ICP, oferta) e [[Modelo de Negocio]] (receita, custos). Este documento e a **visao executiva dos 9 blocos do BMC** — para quem precisa do panorama em uma pagina.

Relacionado: [[VERDADE_UNICA_BUSCOU]] | [[Modelo de Negocio]] | [[Unit Economics]] | [[Proposta de Valor]]

---

## Canvas em uma pagina

```
+---------------+---------------+---------------+---------------+---------------+
|               |               |               |               |               |
| PARCERIAS     | ATIVIDADES    | PROPOSTA DE   | RELACIONAMENTO| SEGMENTOS     |
| CHAVE         | CHAVE         | VALOR         | COM CLIENTE   | DE CLIENTE    |
|               |               |               |               |               |
| Anthropic     | Geracao auto  | Ver           | Self-service  | Negocios      |
| OpenAI        | Publicacao    | VERDADE_UNICA | Onboarding    | locais (foco) |
| Ahrefs        | Monitoramento |  _BUSCOU      |   automatico  | Detalhe em    |
| Google        | Suporte tec   |               | Suporte IA    | VERDADE_UNICA |
| Stripe/Asaas  |               |               | + humano      | secao 3       |
+---------------+---------------+---------------+---------------+---------------+
|               |               |                               |               |
| RECURSOS      | CANAIS        |                               | RECEITAS      |
| CHAVE         |               |                               |               |
|               | Blog proprio  |                               | Venda unica   |
| Motor IA      |   (dog-food)  |                               | R$ 2.500 Pix  |
| Infra cloud   | Prospecao     |                               | R$ 3.000 12x  |
| Base conhec.  | Indicacao     |                               | (sem mensal)  |
| Dados perform | Parcerias     |                               | + renovacao   |
|               | Anuncios      |                               |   opcional    |
+---------------+---------------+-------------------------------+---------------+
|                               |                                               |
| ESTRUTURA DE CUSTOS           | FONTES DE RECEITA                             |
|                               |                                               |
| Variaveis: R$ 80-160          | Venda unica da tecnologia:                    |
|   por cliente/mes             |  - R$ 2.500 a vista                           |
| + ferramentas fixas + dev     |  - R$ 3.000 parcelado ate 12x                 |
| + marketing                   | + renovacao anual opcional                    |
|                               | + blog adicional                              |
+-------------------------------+-----------------------------------------------+
```

---

## 1. Segmentos de cliente

Ver [[VERDADE_UNICA_BUSCOU]] secao 3. Resumo executivo:

| Nicho primario | Dor especifica | Potencial |
|---|---|---|
| **Clinicas** (odonto, estetica, veterinaria, medica) | Paciente busca — nao aparece | Muito alto |
| **Imobiliarias e corretores** | Cliente busca imovel — aparece o concorrente | Alto |
| **Advogados** | Cliente pronto, invisivel | Alto |
| **Servicos locais** (contabilidade, reformas, etc.) | Intencao alta, presenca fraca | Medio-alto |

**Secundario** (atende, nao foco): empresas nao-locais com canal de intencao.

**Quem NAO e cliente:**
- Empresas que dependem de brand awareness puro (FMCG, entretenimento).
- Negocios 100% offline sem presenca digital minima.
- Clientes que esperam resultado em 1-2 semanas.
- Empresas com ticket medio muito baixo (CAC nao se paga).

---

## 2. Proposta de valor

Ver [[VERDADE_UNICA_BUSCOU]] secoes 1, 2, 4. Resumo em uma frase:

> Tecnologia que coloca empresas nos resultados de busca e nas respostas de IA automaticamente. Blog + Motor, 90 conteudos/mes, pagamento unico.

Detalhamento em [[Proposta de Valor]].

---

## 3. Canais

| Canal | Tipo | Prioridade | Observacao |
|---|---|---|---|
| **Blog proprio (dog-fooding)** | Organico | Alta | O motor publica no proprio site. Prova viva. |
| **Prospecao ativa** | Outbound | Alta | Listas segmentadas por nicho local. Agente Prospeccao. |
| **Indicacao** | Organico | Alta | Sem mensalidade = cliente confia para indicar. |
| **Parcerias** | Organico | Media | Agencias e consultores que nao fazem SEO/AIO. White-label futuro. |
| **Anuncios pagos** | Pago | Media | So depois de validacao. |
| **YouTube / LinkedIn organico** | Organico | Media | Educativo sobre SEO+AIO para negocios locais. |

**Principio:** canal primario e o proprio produto. Se o motor nao consegue gerar trafego para a buscou.ai, nao esta pronto para cliente.

---

## 4. Relacionamento com cliente

| Fase | Tipo | Como |
|---|---|---|
| Pre-venda | Self-service + IA | Landing clara, chatbot responde duvidas |
| Call opcional | Humano (fundador no inicio) | 20-30 min. So quando cliente pede. Nao obrigatoria. |
| Onboarding | Semi-auto → full-auto | Wizard 5 passos. Dominio + tom definidos. Blog no ar em ate 7 dias. |
| Uso | Self-service | Motor roda sozinho. Dashboard com publicacoes + metricas. |
| Suporte | IA + humano | Chatbot resolve 80%. Humano em escalacao. SLA 24-48h. |
| Renovacao (opcional) | Outbound gentil | 10-11 meses apos compra. |

---

## 5. Fontes de receita

| Fonte | Tipo | Valor | % projetada |
|---|---|---|---|
| **Venda unica da tecnologia** | Upfront | R$ 2.500 / R$ 3.000 | 85% |
| **Renovacao anual opcional** | Anual | R$ 500-1.000 | 8% |
| **Blog adicional (filial)** | Upfront | R$ 2.500-3.000 | 5% |
| **Modulos adicionais** | Sob demanda | Variavel | 2% |

**Pagamento:** Pix (a vista) ou cartao em ate 12x (juros do cliente). Sem boleto recorrente. Sem assinatura.

---

## 6. Recursos-chave

| Recurso | Descricao |
|---|---|
| **Motor buscou.ai** | Pipeline multi-agente (ver [[Arquitetura de Agentes]]). |
| **Infra multi-tenant** | Supabase + Vercel + CDN. N blogs, 1 motor. |
| **Base de conhecimento SEO/AIO** | Este vault. Alimenta prompts e qualidade do conteudo. |
| **Dados de performance** | Queries testadas, citacoes em IA, rankings por nicho. |
| **Integracoes** | APIs de dados (Ahrefs, GSC, GA), CMS do cliente, monitoramento IA. |
| **Landing + dashboard do cliente** | Frontend Next.js. |

---

## 7. Atividades-chave

| Atividade | Frequencia | Automatizada? |
|---|---|---|
| Geracao de conteudo (90/mes por cliente) | Diaria (3x/dia) | Sim (agentes) |
| Publicacao no blog | Diaria | Sim |
| Monitoramento de rankings + citacoes IA | Diaria | Sim |
| Otimizacao / refresh de conteudo | Semanal/mensal | Sim |
| Aquisicao (prospecao + organico) | Continua | Parcial |
| Fechamento de vendas | Por lead | Manual (inicio) → IA (depois) |
| Onboarding de cliente novo | Por cliente | Semi-auto |
| Suporte tecnico | Sob demanda | Parcial (chatbot 80%) |
| Desenvolvimento de produto | Continuo | Manual |

**Criterio:** toda atividade repetitiva → executada por agente. Humano so em decisao estrategica + suporte tecnico de excecao.

---

## 8. Parcerias-chave

| Parceiro | O que fornece | Custo |
|---|---|---|
| Anthropic (Claude) | LLM principal | Variavel por uso |
| OpenAI | LLM redundancia | Variavel |
| Ahrefs / SERPAPI | Dados de SERP, keywords | Fixo mensal |
| Google (GSC / GA / Maps) | Plataformas | Gratis |
| Otterly.ai / LLMrefs | Monitoramento IA | Mensal |
| Stripe / Asaas | Billing e Pix | Taxa por transacao |
| Supabase | Banco + auth | Mensal |
| Vercel | Hosting + CDN | Mensal |

---

## 9. Estrutura de custos

### Custos variaveis (por cliente ativo/mes)

| Item | Valor |
|---|---|
| Tokens LLM | R$ 40-80 |
| Infra rateada | R$ 20-40 |
| Ferramentas SEO/AIO rateadas | R$ 15-30 |
| Storage e backup | R$ 5-10 |
| **Total** | **R$ 80-160/cliente/mes** |

### Custos fixos (empresa)

| Categoria | Estimativa |
|---|---|
| Desenvolvimento (fundador + colabs) | Variavel |
| Ferramentas base (Ahrefs, Anthropic, Supabase) | R$ 3K-8K/mes |
| Marketing (anuncios pagos pos-validacao) | R$ 500-3K/mes |
| Suporte humano (escalacao) | R$ 0-3K/mes |

Detalhes em [[Unit Economics]].

**Meta de estrutura:** margem bruta 75%+ no primeiro ano por cliente (12 meses de operacao pos-venda unica). 90%+ em anos subsequentes se renovacao.

---

## Notas e referencias

- [[VERDADE_UNICA_BUSCOU]] — canonico
- [[Modelo de Negocio]] — visao operacional
- [[Proposta de Valor]] — argumentacao
- [[Oferta Comercial]] — pitch
- [[Unit Economics]] — numeros detalhados
- [[North Star Metric]]
- [[ICP por Nicho]] / [[Nicho Inicial]]
- [[Go To Market Inicial]]
- [[Roadmap do Produto]]
- [[Decision Log - 2026-04-23]]

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 1, 3, 4, 5, 9 — ultima verificacao 2026-04-23.*
