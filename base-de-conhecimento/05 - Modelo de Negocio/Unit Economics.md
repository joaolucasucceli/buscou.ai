---
tipo: empresa
area: Financeiro
tags: [empresa, unit-economics, financeiro, precisa-refresh, cascata-pendente]
atualizado: 2026-04-23
---

# Unit Economics

> ⚠️ **ARQUIVO PRECISA REFRESH POS-DECISION LOG INFRA MENSAL**
>
> Este arquivo foi escrito no modelo antigo de **pagamento unico puro** (pre [[Decision Log - 2026-04-23 - Infra Mensal]]). Agora o modelo e **implementacao unica + infra mensal obrigatoria (R$ 300/mes, cobre tokens LLM do motor)**.
>
> As projecoes de 12 meses, LTV, break-even e sensibilidade abaixo precisam ser refeitas com o novo modelo. Ate a reescrita completa, as secoes "Modelo" e "Receita por cliente" foram atualizadas com o novo fraseado, mas os numeros das projecoes **nao foram recalculados**.
>
> Preliminarmente, o novo modelo e **mais favoravel** que o antigo:
> - Receita total ano 1 por cliente: ~R$ 5.800-6.300 (era R$ 2.750)
> - MRR (ano 1 fim): R$ 300 × base ativa
> - Margem bruta ano 1: 70-80% (era 35-60%)
>
> Issue: sub-issue de cascata BAI-44 ou issue separada "Refresh Unit Economics pos-Infra Mensal".

---

## Modelo

**Receita por cliente:** duas camadas.

### Camada 1 — Implementacao (upfront, unica)

| Forma | Valor nominal | Caixa liquido | Metodo |
|---|---|---|---|
| A vista | **R$ 2.500** | R$ 2.500 imediato | Pix |
| Parcelado ate 12x (cliente assume os juros) | **R$ 3.000** | ~R$ 2.700-2.850 via antecipacao da adquirente | Cartao |

**Ticket medio estimado (implementacao):** **R$ 2.750** (mix 50/50).

### Camada 2 — Infra mensal (recurring, obrigatoria)

| Valor | Caixa liquido/mes | Metodo | Inicio |
|---|---|---|---|
| **R$ 300,00** | ~R$ 285 apos taxa | Cartao recorrente | 30 dias apos pagamento da implementacao |

Cliente cancela quando quiser (motor pausa, blog/dashboard continuam).

---

## Custos por cliente

### CAC (custo de aquisicao)

| Cenario | Fonte principal | CAC |
|---|---|---|
| Fase 1 (validacao) | Prospecao ativa + indicacao + dog-fooding | R$ 200-400 |
| Fase 2 (escala organica) | Blog proprio + indicacao + parcerias | R$ 100-300 |
| Fase 3 (anuncios) | Paid ads + organico | R$ 400-800 |

**Meta:** CAC medio < R$ 400.

### Custo operacional por cliente ativo / mes

| Item | Valor mensal |
|---|---|
| Tokens LLM (geracao de 90 conteudos SEO+AIO) | R$ 40-80 |
| Infra rateada (Supabase + Vercel + CDN) | R$ 20-40 |
| Ferramentas SEO/AIO rateadas (Ahrefs API, SERPAPI, Otterly) | R$ 15-30 |
| Storage e backup | R$ 5-10 |
| **Total** | **R$ 80-160/cliente/mes** |

### Custo operacional anual por cliente (12 meses pos-venda)

- Baixo: 12 × R$ 80 = **R$ 960**
- Alto: 12 × R$ 160 = **R$ 1.920**
- Medio: **R$ 1.440**

**Sensibilidade critica:** se custo operacional subir acima de R$ 200/mes por cliente, o modelo fica no limite. Monitorar tokens LLM e otimizar prompts/batch.

---

## Margem por cliente (primeiro ano)

### Cenario base
| Item | Valor |
|---|---|
| Receita | R$ 2.750 |
| (-) CAC | R$ 300 |
| (-) Custo operacional 12 meses | R$ 1.440 |
| **Lucro bruto ano 1** | **R$ 1.010** |
| **Margem bruta ano 1** | **~37%** |

### Cenario otimista
| Item | Valor |
|---|---|
| Receita | R$ 3.000 |
| (-) CAC | R$ 200 |
| (-) Custo operacional 12 meses | R$ 960 |
| **Lucro bruto ano 1** | **R$ 1.840** |
| **Margem bruta ano 1** | **~61%** |

### Cenario pessimista
| Item | Valor |
|---|---|
| Receita | R$ 2.500 |
| (-) CAC | R$ 500 |
| (-) Custo operacional 12 meses | R$ 1.920 |
| **Lucro bruto ano 1** | **R$ 80** |
| **Margem bruta ano 1** | **~3%** |

No pessimista a venda cobre quase apenas o custo. Viabilidade depende de manter CAC < R$ 400 e custo operacional < R$ 120/mes.

---

## Payback

**Imediato.** Pagamento unico upfront, cliente paga antes de usar. Vantagem estrutural vs SaaS com assinatura (que leva 3-6 meses para recuperar CAC).

- Pix: R$ 2.500 na conta no dia.
- Cartao parcelado: ~R$ 2.700-2.850 em 1-3 dias via antecipacao.

---

## LTV (Lifetime Value)

Em venda unica, LTV depende de:
1. Ticket da venda (primario).
2. Renovacao anual opcional (secundario).
3. Blog adicional / filial (terciario).

### LTV sem renovacao
- **R$ 2.750** (ticket medio).

### LTV com renovacao anual opcional (hipotese a validar)

Premissas:
- Renovacao anual opcional: R$ 750 (valor hipotetico — a validar no M12).
- Taxa de renovacao: 40% ano 2, 25% ano 3, 15% ano 4.

| Ano | Receita | Custo op | Margem |
|---|---|---|---|
| 1 | R$ 2.750 | R$ 1.440 | R$ 1.310 |
| 2 | R$ 300 | R$ 576 | -R$ 276 |
| 3 | R$ 188 | R$ 360 | -R$ 172 |
| 4 | R$ 112 | R$ 216 | -R$ 104 |

- **LTV bruto 4 anos:** ~R$ 3.350.
- **Custo op 4 anos:** ~R$ 2.592.
- **LTV liquido:** ~R$ 758 acima do ticket unico.

**Obs:** numeros de renovacao sao hipoteticos. Validar nos primeiros 12 meses.

---

## LTV/CAC

| Cenario | LTV | CAC | LTV/CAC |
|---|---|---|---|
| So venda unica, CAC medio | R$ 2.750 | R$ 300 | **9x** |
| Com renovacao (4 anos), CAC medio | R$ 3.350 | R$ 300 | **11x** |
| Pessimista (venda unica, CAC alto) | R$ 2.500 | R$ 500 | **5x** |

**Benchmark:** > 3x e viavel, > 5x e excelente. Mesmo pessimista, o modelo fecha.

---

## Break-even operacional

### Custos fixos mensais (fase validacao)

| Item | Valor/mes |
|---|---|
| Ferramentas base (Ahrefs, Anthropic minimo, Supabase, Vercel) | R$ 3.000 |
| Dominio + email | R$ 300 |
| Marketing / anuncios iniciais | R$ 500 |
| Ferramentas extras | R$ 500 |
| **Total fixo** | **~R$ 4.300** |

### Clientes novos/mes para break-even

- Cenario base (lucro bruto R$ 1.010/cliente): **4-5 clientes/mes**.
- Cenario otimista (lucro R$ 1.840/cliente): **2-3 clientes/mes**.

**Meta realista:** 5-7 clientes novos/mes nos primeiros 6 meses.

---

## Projecao 12 meses (cenario base)

Premissas: ticket medio R$ 2.750, lucro bruto/cliente R$ 1.010 ano 1, custo fixo R$ 4.300/mes, crescimento gradual.

| Mes | Clientes novos | Receita | Lucro mes |
|---|---|---|---|
| M1 | 2 | R$ 5.500 | R$ 880 |
| M2 | 3 | R$ 8.250 | R$ 3.470 |
| M3 | 5 | R$ 13.750 | R$ 8.650 |
| M4 | 7 | R$ 19.250 | R$ 13.830 |
| M5 | 10 | R$ 27.500 | R$ 21.600 |
| M6 | 12 | R$ 33.000 | R$ 26.780 |
| M7 | 15 | R$ 41.250 | R$ 34.550 |
| M8 | 18 | R$ 49.500 | R$ 42.320 |
| M9 | 20 | R$ 55.000 | R$ 47.500 |
| M10 | 22 | R$ 60.500 | R$ 52.680 |
| M11 | 25 | R$ 68.750 | R$ 60.450 |
| M12 | 28 | R$ 77.000 | R$ 68.220 |
| **Total 12m** | **167 clientes** | **R$ 459K** | **~R$ 380K** |

---

## Sensibilidade

### Se ticket cair para R$ 2.000
- Lucro bruto/cliente ano 1: R$ 260.
- Break-even: 17 clientes novos/mes.
- **Piso inviavel.** R$ 2.500 e o limite.

### Se custo operacional subir para R$ 320/mes
- Custo anual/cliente: R$ 3.840.
- Lucro bruto ano 1: **NEGATIVO (-R$ 1.390)**.
- **Inviavel.** Custo teto e R$ 200/mes.

### Se CAC subir para R$ 1.000
- Lucro bruto ano 1: R$ 310.
- Break-even: 14 clientes/mes.
- **Tolerable, mas pressiona margem.** Manter canais organicos e baratos.

---

## Parametros-chave a monitorar (mensalmente)

1. **Ticket medio real** — teto R$ 2.500 (nao cair abaixo).
2. **Tokens LLM por cliente/mes** — teto R$ 100.
3. **CAC** — teto R$ 500.
4. **Clientes novos/mes** — minimo 4-5.
5. **Taxa de renovacao anual (validar M12+)** — hipotese 40%.

---

## Por que implementacao + infra mensal (2 camadas) vs modelos alternativos

### SaaS puro com mensalidade (descartado)
- MRR previsivel, mas CAC se paga em 3-6 meses (aperto de caixa).
- Churn pesa pesado (cliente que sai = perda permanente, nao ha upfront pra absorver).
- Posicionamento confuso no mercado BR de negocios locais.

### Venda unica pura (descartado em 2026-04-23)
- Caixa imediato ótimo, mas nao cobre custo operacional recorrente (tokens LLM).
- Margem do ticket unico evapora em 3-6 meses de operacao.
- Inviavel no longo prazo.

### Duas camadas — implementacao unica + infra mensal (escolhido)
- Caixa imediato na implementacao + MRR previsivel da infra.
- Cliente entende que implementacao compra infraestrutura fixa (vitalicia) e infra cobre execucao do motor (tokens LLM).
- Se cliente cancela infra: motor pausa, blog continua — nao destroi o SEO investido.
- Posicionamento distinto: "compra tecnologia + paga infra pra mante-la publicando, sem assinatura de servico humano".

**Trade-off aceito:** introduz churn da infra como risco, em troca de sustentabilidade economica e MRR real.

---

## Meta 12 meses (canonica)

- **Clientes ativos:** 150-180.
- **Receita acumulada:** R$ 400K-500K.
- **Lucro bruto:** R$ 320K-420K.
- **Margem bruta:** 70%+.
- **CAC medio:** < R$ 400.
- **Ticket medio:** R$ 2.700+.
- **Taxa de renovacao anual (hipotese):** 30-40%.

---

## Riscos financeiros

| Risco | Impacto | Mitigacao |
|---|---|---|
| Custo LLM sobe | Margem comprimida | Otimizar prompts, batch API, prompt caching, modelos mais baratos para tarefas simples |
| Churn tecnico > 20% | Clientes largam o blog | Melhorar ferramentas do cliente, suporte proativo, onboarding claro |
| CAC > R$ 500 | Break-even sobe | Dobrar em canais organicos (dog-fooding + indicacao), parcerias |
| Cambio USD/BRL | Custos em dolar sobem | Margem alta absorve; avaliar cobertura ou pricing em dolar futuro |
| Concorrente vende mais barato | Pressao de preco | Diferencial: pipeline completo + AIO + negocio local. Defender com prova (casos) |

---

## Notas relacionadas

- [[VERDADE_UNICA_BUSCOU]] — canonico
- [[Decision Log - 2026-04-23 - Infra Mensal]] — modelo atual, projecoes abaixo precisam refresh
- [[Modelo de Negocio]]
- [[Oferta Comercial]]
- [[Proposta de Valor]]
- [[Canvas]]
- [[North Star Metric]]
- [[Go To Market Inicial]]
- [[Decision Log - 2026-04-23]]
