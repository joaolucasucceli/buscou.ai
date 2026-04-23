---
tipo: empresa
area: Negocio
tags: [empresa, modelo, venda-unica]
atualizado: 2026-04-23
---

# Modelo de Negocio

> **Fonte canonica:** [[VERDADE_UNICA_BUSCOU]] secoes 1, 4, 5 (definicao, produto, oferta). Este documento e a **visao operacional do negocio**: receita, custos, competidores, parcerias e fases de evolucao. A definicao da empresa, o produto detalhado e a oferta vivem em [[VERDADE_UNICA_BUSCOU]].

Relacionado: [[Canvas]] | [[Unit Economics]] | [[North Star Metric]] | [[Roadmap do Produto]] | [[Proposta de Valor]]

---

## Tecnico vs comercial

- **Tecnicamente:** backend centralizado multi-tenant. Um motor serve N blogs de clientes.
- **Comercialmente:** venda de tecnologia. Produto fechado. Pagamento unico.

Clientes nao compram assinatura. Compram a tecnologia. Detalhes da oferta em [[VERDADE_UNICA_BUSCOU]] secao 5.

---

## Receita

Nao ha MRR (Monthly Recurring Revenue). Nao ha assinatura.

A receita vem de:

| Fonte | Frequencia | Valor |
|---|---|---|
| **Venda unica da tecnologia** | Por cliente novo | R$ 2.500 a vista ou R$ 3.000 parcelado (ver [[VERDADE_UNICA_BUSCOU]] secao 5) |
| **Renovacao anual opcional do motor** | Anual (para clientes existentes) | Valor a definir (provavel R$ 500-1.000/ano) |
| **Blog adicional** | Quando cliente abre nova unidade | R$ 2.500-3.000 por blog |
| **Modulos adicionais** | Sob demanda | Valor a definir por modulo |

**Modelo primario:** aquisicao de novos clientes (venda unica).
**Modelos secundarios:** renovacao + blog adicional + modulos. Sao upside, nao base.

---

## Metricas-alvo (primeiros 12 meses)

Nao medimos MRR. Medimos:

| Metrica | Meta 6m | Meta 12m |
|---|---|---|
| **Clientes novos/mes** | 5-10 | 20-30 |
| **Clientes ativos (base)** | 30-50 | 120-180 |
| **Receita nova/mes (ticket medio R$ 2.750)** | R$ 14K-28K | R$ 55K-83K |
| **Receita acumulada 12m** | R$ 80K+ | R$ 400K+ |
| **CAC** | < R$ 500 | < R$ 300 |
| **Payback** | Imediato | Imediato |
| **Margem bruta por venda** | 75%+ | 80%+ |
| **Custo operacional por cliente ativo/mes** | < R$ 150 | < R$ 100 |

Calculo detalhado em [[Unit Economics]].

---

## Diferencial competitivo

### vs agencias de marketing

| Agencia | buscou.ai |
|---|---|
| R$ 3.000-15.000/mes recorrente | R$ 2.500-3.000 unico |
| Depende de pessoas | Tecnologia |
| Onboarding 2-4 semanas | Blog no ar em ate 7 dias |
| Relatorios | Conteudos publicados |
| Nao faz AIO | SEO + AIO integrados |

### vs ferramentas (Surfer, Frase, Jasper)

| Ferramentas | buscou.ai |
|---|---|
| Uma parte do pipeline | Pipeline completo end-to-end |
| Cliente executa | Tecnologia executa |
| Mensalidade US$ 49-399 | Pagamento unico R$ 2.500-3.000 |
| Nao publica, nao monitora IA | Publica e monitora |

### vs enterprise SEO (Conductor, BrightEdge, etc.)

| Enterprise | buscou.ai |
|---|---|
| US$ 25K-100K/ano | R$ 2.500-3.000 uma vez |
| Enterprise (empresas grandes) | Negocios locais / mid-market |
| Complexo, equipe dedicada | Simples, plug-and-play |

---

## Concorrentes diretos

Para analise detalhada, ver [[Concorrentes e Benchmarks]].

| Concorrente | O que faz | Preco | Lacuna explorada pela buscou.ai |
|---|---|---|---|
| Frase.io | Pesquisa + otimizacao | US$ 14-115/mes | Nao publica, nao distribui, nao faz AIO |
| Jasper | Geracao de texto | US$ 49-69/mes | Sem foco SEO/AIO, sem pipeline |
| Surfer SEO | Otimizacao on-page | US$ 99-179/mes | Nao escreve, nao publica |
| SEObot.ai | Automacao SEO IA | US$ 49-399/mes | Mensal, sem AIO forte, sem foco local BR |
| Agencias BR | Servico manual | R$ 3K-15K/mes | Caro, lento, nao domina AIO |

**Nosso espaco:** tecnologia completa SEO + AIO, venda unica, foco negocio local BR.

---

## Parcerias-chave

| Parceiro | Tipo | Papel | Custo |
|---|---|---|---|
| Anthropic (Claude) | API LLM | Motor de escrita | Variavel por uso |
| OpenAI (GPT) | API LLM alternativa | Redundancia | Variavel |
| Ahrefs / SERPAPI | Dados SEO | Pesquisa de keywords | Fixo mensal |
| Google (GSC / GA / Maps) | Plataforma | Monitoramento | Gratis |
| Otterly.ai / LLMrefs | Dados AIO | Citacoes em IA | Mensal |
| Stripe / Asaas | Pagamento | Billing | Taxa por transacao |
| Supabase | Infra | Banco + auth | Mensal |
| Vercel | Infra | Hosting + CDN | Mensal |

---

## Estrutura de custos

### Custo por cliente ativo (mensal operacional)

| Item | Valor estimado |
|---|---|
| Tokens LLM (geracao de 90 conteudos) | R$ 40-80 |
| Infra (Supabase share + Vercel hosting blog) | R$ 20-40 |
| Ferramentas SEO/AIO rateadas | R$ 15-30 |
| Storage + backups | R$ 5-10 |
| **Total por cliente/mes** | **R$ 80-160** |

### Receita por cliente

- Venda unica: R$ 2.500-3.000.
- Custo operacional anual: ~R$ 960-1.920 (12 meses × R$ 80-160).
- **Margem bruta no primeiro ano:** 35-60%.
- **Margem bruta se cliente renovar (anos 2+):** 90%+ (so custo operacional).

Numeros detalhados em [[Unit Economics]].

### Custos fixos (empresa)

- Desenvolvimento: fundador + colaboradores (variavel).
- Marketing: organico primeiro. Anuncios pagos depois de validacao.
- Ferramentas base: Ahrefs, GSC API, Otterly, Anthropic rateado.

---

## Visao de evolucao

```
FASE 1         FASE 2              FASE 3                 FASE 4
Validacao →    Escala aquisicao →  Multi-produto →        Plataforma
(10 clientes)  (100 clientes)      (blogs + renovacao)    (white-label + API)
```

| Fase | Descricao | Clientes | Receita mensal |
|---|---|---|---|
| 1. Validacao | Primeiros 10-15 clientes. Validar produto + motor + satisfacao. | 10-15 | R$ 14K-42K total |
| 2. Escala | Prospecao + trafego organico estabelecido. 20-30 novos/mes. | 100+ | R$ 55K-83K novos + renovacoes |
| 3. Multi-produto | Modulos adicionais, renovacoes anuais, blogs adicionais. | 300+ | R$ 150K+ |
| 4. Plataforma | White-label para agencias, API, expansao internacional. | 1.000+ | R$ 500K+ |

Cada fase reduz complexidade e aumenta margem. Objetivo: custo marginal por cliente tendendo a zero.

---

## O que NAO faz parte do modelo

- Mensalidade / assinatura.
- Tiers (Starter / Growth / Scale).
- Setup fee + mensalidade separada.
- SaaS com login de cliente final no produto (no sentido comercial).
- Agencia tradicional (reunioes, account manager).
- Consultoria (venda de horas).
- Producao de conteudo manual.
- Servicos de SEO tecnico avulso (migracao, auditoria manual).
- Gestao de ads pagos.

---

## Notas e referencias

- [[VERDADE_UNICA_BUSCOU]] — canonico
- [[Proposta de Valor]]
- [[Oferta Comercial]]
- [[Canvas]]
- [[Unit Economics]]
- [[North Star Metric]]
- [[ICP por Nicho]] / [[Nicho Inicial]]
- [[Go To Market Inicial]]
- [[Roadmap do Produto]]
- [[Decision Log - 2026-04-23]]

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 1, 4, 5, 9 — ultima verificacao 2026-04-23.*
