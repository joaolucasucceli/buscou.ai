---
tipo: empresa
area: Negocio
tags: [empresa, modelo, implementacao-mais-infra]
atualizado: 2026-04-23
---

# Modelo de Negocio

> **Fonte canonica:** [[VERDADE_UNICA_BUSCOU]] secoes 1, 4, 5 (definicao, produto, oferta). Este documento e a **visao operacional do negocio**: receita, custos, competidores, parcerias e fases de evolucao. A definicao da empresa, o produto detalhado e a oferta vivem em [[VERDADE_UNICA_BUSCOU]].

Relacionado: [[Canvas]] | [[Unit Economics]] | [[North Star Metric]] | [[Roadmap do Produto]] | [[Proposta de Valor]]

---

## Tecnico vs comercial

- **Tecnicamente:** backend centralizado multi-tenant. Um motor serve N blogs de clientes. Infra tem custo recorrente real (LLM tokens, APIs de dados, hospedagem do pipeline).
- **Comercialmente:** vendemos tecnologia com **duas linhas de cobranca**: implementacao (one-time) + infra mensal (passthrough). Nao somos servico mensal — somos tecnologia com infraestrutura transparente.

O cliente compra a tecnologia. A infra mensal e o custo operacional real repassado com transparencia. Detalhes da oferta em [[VERDADE_UNICA_BUSCOU]] secao 5.

---

## Receita

Receita vem de **duas linhas principais**:

| Fonte | Frequencia | Valor |
|---|---|---|
| **Implementacao (one-time)** | Por cliente novo | R$ 2.500 a vista ou R$ 3.000 em 12x (ver [[VERDADE_UNICA_BUSCOU]] secao 5.1) |
| **Infra mensal (recurring)** | A partir do mes 2 do cliente | R$ 300/mes (ver [[VERDADE_UNICA_BUSCOU]] secao 5.2) |

Linhas secundarias (upside, nao base):

| Fonte | Frequencia | Valor |
|---|---|---|
| **Blog adicional** | Quando cliente abre filial/segunda unidade | R$ 2.500-3.000 + R$ 300/mes adicional |
| **Pacotes de infra expandida (V1.2+)** | Cliente que precisa de canais adicionais (LinkedIn, Medium) | R$ 500+/mes |
| **Modulos adicionais** | Sob demanda | Valor a definir |

**Fluxo de caixa em regime estavel:**
- Receita bruta mensal = (novos clientes × ticket implementacao) + (base ativa × R$ 300).
- Cada novo cliente paga R$ 2.500-3.000 upfront (caixa imediato) e comeca a gerar R$ 300/mes a partir do mes 2 (base de infra acumulada).

---

## Metricas-alvo (primeiros 12 meses)

| Metrica | Meta 6m | Meta 12m |
|---|---|---|
| **Clientes novos/mes** | 5-10 | 20-30 |
| **Clientes ativos (com infra paga)** | 25-50 | 100-180 |
| **Receita de implementacao/mes** | R$ 14K-28K | R$ 55K-83K |
| **Base de infra mensal (MRR real)** | R$ 7K-15K | R$ 30K-54K |
| **Receita total/mes** | R$ 21K-43K | R$ 85K-137K |
| **CAC** | < R$ 500 | < R$ 300 |
| **Payback implementacao** | Imediato | Imediato |
| **Payback operacional por cliente** | Mes 3-4 (implementacao cobre custos + 3-4 meses de infra absorvem custo operacional) | Idem |
| **Margem bruta implementacao** | 75%+ (R$ 2.500 − custo de onboarding ~R$ 500) | 80%+ |
| **Margem bruta infra mensal** | 40-60% (R$ 300 − custo real de R$ 120-180) | 50-65% (eficiencia de escala) |
| **Churn de infra** | < 10%/ano | < 5%/ano |
| **Custo operacional real por cliente/mes** | R$ 120-180 | R$ 100-150 |

Calculo detalhado em [[Unit Economics]].

---

## Diferencial competitivo

### vs agencias de marketing

| Agencia | buscou.ai |
|---|---|
| R$ 3.000-15.000/mes recorrente indefinidamente | R$ 2.500-3.000 de implementacao (1x) + R$ 300/mes de infra |
| Depende de pessoas | Tecnologia |
| Onboarding 2-4 semanas | Blog no ar em ate 7 dias |
| Relatorios | Conteudos publicados |
| Nao faz AIO | SEO + AIO integrados |
| Cobra servico opaco | Separa servico (implementacao) de infra (passthrough) |

### vs ferramentas (Surfer, Frase, Jasper)

| Ferramentas | buscou.ai |
|---|---|
| Uma parte do pipeline | Pipeline completo end-to-end |
| Cliente executa | Tecnologia executa |
| Assinatura SaaS + custo de APIs a parte | Implementacao + infra consolidada |
| Nao publica, nao monitora IA | Publica e monitora |

### vs enterprise SEO (Conductor, BrightEdge, etc.)

| Enterprise | buscou.ai |
|---|---|
| US$ 25K-100K/ano de licenca | R$ 2.500-3.000 (1x) + R$ 3.600/ano de infra |
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
| SEObot.ai | Automacao SEO IA | US$ 49-399/mes | Mensal opaca, sem AIO forte, sem foco local BR |
| Agencias BR | Servico manual | R$ 3K-15K/mes | Caro, lento, nao domina AIO |

**Nosso espaco:** tecnologia completa SEO + AIO, implementacao unica + infra passthrough, foco negocio local BR.

---

## Parcerias-chave

| Parceiro | Tipo | Papel | Custo |
|---|---|---|---|
| Anthropic (Claude) | API LLM | Motor de escrita | Variavel por uso (componente principal da infra) |
| OpenAI (GPT) | API LLM alternativa | Redundancia | Variavel |
| Ahrefs / SERPAPI | Dados SEO | Pesquisa de keywords | Fixo mensal |
| Google (GSC / GA / Maps) | Plataforma | Monitoramento | Gratis |
| Otterly.ai / LLMrefs | Dados AIO | Citacoes em IA | Mensal |
| Stripe / Asaas | Pagamento | Billing (parcelamento 12x + subscription recorrente) | Taxa por transacao |
| Supabase | Infra | Banco + auth | Mensal |
| Vercel | Infra | Hosting + CDN | Mensal |

---

## Estrutura de custos

### Custo operacional real por cliente ativo (mensal)

| Item | Valor estimado |
|---|---|
| Tokens LLM (geracao de 90 conteudos) | R$ 60-120 |
| Infra (Supabase share + Vercel hosting blog) | R$ 20-40 |
| Ferramentas SEO/AIO rateadas (Ahrefs, Otterly) | R$ 25-40 |
| Storage + backups | R$ 5-10 |
| Taxa de gateway (infra mensal cobrada via subscription) | R$ 10-15 |
| **Total por cliente/mes** | **R$ 120-225** |

### Margem da infra mensal

- Receita: R$ 300/mes por cliente ativo.
- Custo operacional direto: R$ 120-180 (alvo) / R$ 150-225 (limite).
- **Margem bruta por cliente/mes:** R$ 75-180 (25-60%).
- A infra e **passthrough com margem modesta** — o modelo nao ganha dinheiro alto na infra, ganha no volume da base ativa.

### Receita por cliente (primeiro ano)

- Implementacao: R$ 2.500-3.000 upfront.
- Infra acumulada ano 1 (11 meses): 11 × R$ 300 = R$ 3.300.
- Receita total ano 1: R$ 5.800-6.300 por cliente.
- Custo operacional ano 1: ~R$ 1.440-2.160 (12 × R$ 120-180, incluindo mes 1 incluso na implementacao).
- **Margem bruta primeiro ano:** 60-75% por cliente.

### Custos fixos (empresa)

| Categoria | Estimativa |
|---|---|
| Desenvolvimento (fundador + colabs) | Variavel |
| Ferramentas base (fixo — Ahrefs, Anthropic base, Supabase) | R$ 3K-8K/mes |
| Marketing (anuncios pagos pos-validacao) | R$ 500-3K/mes |
| Suporte humano (escalacao) | R$ 0-3K/mes |

**Ponto de equilibrio operacional estimado:** ~40-60 clientes ativos (infra mensal cobre custos fixos, implementacao vira lucro).

---

## Visao de evolucao

```
FASE 1         FASE 2              FASE 3                 FASE 4
Validacao →    Escala aquisicao →  Multi-produto →        Plataforma
(10 clientes)  (100 clientes)      (pacotes + blogs)      (white-label + API)
```

| Fase | Descricao | Clientes | Receita mensal |
|---|---|---|---|
| 1. Validacao | Primeiros 10-15 clientes. Validar produto + motor + satisfacao + retencao de infra. | 10-15 | R$ 21K-43K total (implementacao + infra) |
| 2. Escala | Prospecao + trafego organico estabelecido. 20-30 novos/mes. Base ativa crescendo. | 100+ | R$ 85K-137K total |
| 3. Multi-produto | Pacotes de infra densos, blogs adicionais, modulos. Retencao como metrica central. | 300+ | R$ 200K+ |
| 4. Plataforma | White-label para agencias, API, expansao internacional. | 1.000+ | R$ 600K+ |

Cada fase aumenta o peso da infra mensal no mix (mais recorrencia, mais previsibilidade). Objetivo: custo marginal por cliente reduz com escala (eficiencia de LLM prompt caching, APIs volumosas, infra amortizada).

---

## O que NAO faz parte do modelo

- **Mensalidade de servico.** A infra mensal cobre infraestrutura, nao servico de gestao nem de consultoria.
- **Tiers** (Starter / Growth / Scale).
- **Plano mensal de servico.**
- **SaaS tradicional** com login do cliente gerenciando seu proprio acesso a ferramentas (o cliente acessa um dashboard, mas o produto e tecnologia entregue, nao plataforma de self-service).
- **Agencia tradicional** (reunioes semanais, account manager, relatorios customizados).
- **Consultoria** (venda de horas).
- **Producao de conteudo manual.**
- **Servicos de SEO tecnico avulso** (migracao, auditoria manual).
- **Gestao de ads pagos.**

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
- [[Agente Pagamento]] — operador das duas cobrancas
- [[Decision Log - 2026-04-23]] — origem (posicionamento, ICP, produto, oferta-base)
- [[Decision Log - 2026-04-23 - Infra Mensal]] — evolucao do modelo comercial

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 1, 4, 5, 9 — ultima verificacao 2026-04-23.*
