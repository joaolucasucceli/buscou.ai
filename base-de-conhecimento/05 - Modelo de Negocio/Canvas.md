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
|               | Blog proprio  |                               | Implementacao |
| Motor IA      |   (dog-food)  |                               | R$ 2.500 Pix  |
| Infra cloud   | Prospecao     |                               | R$ 3.000 12x  |
| Base conhec.  | Indicacao     |                               | +             |
| Dados perform | Parcerias     |                               | Infra mensal  |
|               | Anuncios      |                               | R$ 300/mes    |
+---------------+---------------+-------------------------------+---------------+
|                               |                                               |
| ESTRUTURA DE CUSTOS           | FONTES DE RECEITA                             |
|                               |                                               |
| Variaveis: R$ 120-225         | 1) Implementacao (one-time):                  |
|   por cliente ativo/mes       |    - R$ 2.500 a vista                         |
|   (LLM + APIs + infra +       |    - R$ 3.000 parcelado ate 12x               |
|    taxa de gateway)           | 2) Infra mensal (a partir do mes 2):          |
| + ferramentas fixas + dev     |    - R$ 300/mes por cliente ativo             |
| + marketing                   | + Blog adicional + modulos especiais          |
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

> Tecnologia que coloca empresas nos resultados de busca e nas respostas de IA automaticamente. Blog + Motor, 90 conteudos/mes, implementacao unica + infra mensal.

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
| Pre-venda | Self-service + IA | Landing clara com os dois precos explicitos, chatbot responde duvidas |
| Call opcional | Humano (fundador no inicio) | 20-30 min. So quando cliente pede. Nao obrigatoria. |
| Onboarding | Semi-auto → full-auto | Wizard 5 passos. Dominio + tom + cartao recorrente cadastrado. Blog no ar em ate 7 dias. |
| Uso (mes 1) | Self-service | Motor roda sozinho. Infra incluida. Dashboard com publicacoes + metricas. |
| Uso (mes 2+) | Self-service | Infra mensal comeca a ser cobrada automaticamente. Cliente ve as duas linhas no dashboard billing. |
| Suporte | IA + humano | Chatbot resolve 80%. Humano em escalacao. SLA 24-48h (infra ativa). |
| Retencao de infra | Automatica + campanhas | Smart retry em falha. Notificacoes pre-cobranca. Campanhas de reativacao em `motor_paused`. |

---

## 5. Fontes de receita

| Fonte | Tipo | Valor | Peso estrategico |
|---|---|---|---|
| **Implementacao** | Upfront (one-time) | R$ 2.500 a vista / R$ 3.000 em 12x | 60-70% da receita nos primeiros 12 meses (caixa upfront) |
| **Infra mensal** | Recurring (a partir do mes 2) | R$ 300/mes por cliente ativo | 30-40% no ano 1; cresce ano a ano conforme base se acumula |
| **Blog adicional (filial)** | Upfront + infra | R$ 2.500-3.000 + R$ 300/mes | 3-5% |
| **Pacotes de infra expandida (V1.2+)** | Recurring | R$ 500+/mes | Upside |
| **Modulos adicionais** | Sob demanda | Variavel | Upside |

**Pagamento:**
- Implementacao: Pix (a vista) ou cartao em ate 12x (juros do cliente).
- Infra mensal: cartao recorrente cadastrado no onboarding (pode ser o mesmo da implementacao).

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
| Tokens LLM (90 conteudos) | R$ 60-120 |
| Infra rateada (Supabase + Vercel + CDN) | R$ 20-40 |
| Ferramentas SEO/AIO rateadas (Ahrefs, Otterly) | R$ 25-40 |
| Storage e backup | R$ 5-10 |
| Taxa de gateway (subscription recorrente) | R$ 10-15 |
| **Total** | **R$ 120-225/cliente/mes** |

Esse custo e **coberto pela infra mensal** (R$ 300) com margem de R$ 75-180 por cliente.

### Custos fixos (empresa)

| Categoria | Estimativa |
|---|---|
| Desenvolvimento (fundador + colabs) | Variavel |
| Ferramentas base (Ahrefs, Anthropic, Supabase) | R$ 3K-8K/mes |
| Marketing (anuncios pagos pos-validacao) | R$ 500-3K/mes |
| Suporte humano (escalacao) | R$ 0-3K/mes |

Detalhes em [[Unit Economics]].

**Meta de estrutura:**
- Implementacao: margem bruta 75%+ por venda (R$ 2.500 − ~R$ 500 de onboarding).
- Infra mensal: margem bruta 40-60% por cliente/mes (R$ 300 − R$ 120-180 custo real). Escala melhora a margem com eficiencia de prompt caching e volumes de APIs.
- **Break-even operacional da empresa:** ~40-60 clientes ativos (a infra mensal cobre custos fixos).

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
- [[Agente Pagamento]] — operador das duas cobrancas
- [[Decision Log - 2026-04-23]] — posicionamento, ICP, produto
- [[Decision Log - 2026-04-23 - Infra Mensal]] — evolucao comercial

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 1, 3, 4, 5, 9 — ultima verificacao 2026-04-23.*
