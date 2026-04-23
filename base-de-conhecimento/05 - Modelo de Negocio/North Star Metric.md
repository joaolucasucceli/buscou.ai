---
tipo: empresa
area: Metricas
tags: [empresa, north-star, kpi, metrica, canonico]
atualizado: 2026-04-23
---

# North Star Metric

> **Canonico.** Reflete [[VERDADE_UNICA_BUSCOU]] + [[Decision Log - 2026-04-23 - Infra Mensal]] — modelo **implementacao unica + infra mensal obrigatoria**. A North Star da empresa agora inclui **MRR da infra** como metrica secundaria (nao principal).

---

## Duas North Stars

Uma metrica para o **cliente** (resultado entregue) e uma metrica para a **empresa** (saude do negocio).

---

## North Star do Cliente: Indice de Visibilidade Total (IVT)

### Definicao

**IVT = (queries com presenca / total de queries monitoradas) × 100**

**"Presenca"** significa: posicao top 10 no Google **OU** citado em pelo menos 1 plataforma de IA (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews).

Exemplo: cliente monitora 80 queries. Aparece no top 10 do Google em 30, citado em IAs em 15 (com 10 sobreposicao). Presenca unica = 35. **IVT = 35/80 = 43,75%.**

### Por que essa metrica

1. **Combina SEO + AIO num numero unico.**
2. **Correlaciona com o resultado prometido** — aparecer quando o cliente busca.
3. **Facil de comunicar** — "voce aparece em 43% das buscas do seu nicho".
4. **Diferencia da concorrencia** — agencias medem ranking; ferramentas medem trafego; nos medimos visibilidade total.

### Targets por tempo (cliente que contratou a oferta unica)

| Periodo | IVT esperado |
|---|---|
| Baseline (dia 0) | 0-5% |
| Mes 1 | 5-15% |
| Mes 3 | 20-35% |
| Mes 6 | 40-55% |
| Mes 12 | 55-70% |

Com 90 conteudos/mes publicando desde o dia 7, o volume acumula rapido.

### Como o IVT e calculado

1. Agente Monitor roda semanalmente (segundas 6h).
2. **Google:** GSC API para posicoes das queries monitoradas.
3. **IAs:** playbook automatizado de teste de citacao.
4. Deduplica (Google ∪ IA).
5. Armazena historico no Supabase.
6. Atualiza widget do cliente.

---

## North Star da Empresa: Novos clientes fechados / mes

### Definicao

Numero de clientes novos que pagaram a **implementacao** (a vista R$ 2.500 via Pix ou parcelado R$ 3.000 em 12x no cartao) no mes.

### Por que essa metrica (principal) e MRR infra (secundaria)

Modelo e **implementacao unica + infra mensal**. Ambas contam, mas novos clientes sao o motor de crescimento:

**Receita do mes = (Novos clientes × ticket medio implementacao R$ 2.750) + (MRR infra R$ 300 × base ativa)**.

Novos clientes e a metrica-alvo porque:
- Gera upfront grande (R$ 2.500-3.000 imediato).
- Aumenta base que eventualmente paga infra.
- Exposicao ao mercado (dog-fooding, indicacao).

MRR infra e a metrica de **saude da base** — se cai, ha churn; se sobe consistente, a empresa e sustentavel mesmo sem aquisicao nova.

### Targets por periodo

| Mes | Novos clientes/mes | Receita nova/mes |
|---|---|---|
| M1-2 | 2-3 | R$ 5.500-8.250 |
| M3-4 | 5-7 | R$ 13.750-19.250 |
| M5-6 | 10-12 | R$ 27.500-33.000 |
| M7-9 | 15-20 | R$ 41.250-55.000 |
| M10-12 | 22-28 | R$ 60.500-77.000 |

**Meta 12 meses acumulados:** ~167 clientes, R$ 459K receita.

### Metricas de suporte

| Metrica | Meta | Dono |
|---|---|---|
| Leads qualificados/mes | 100+ | Marketing |
| Taxa de fechamento | 25-35% | Vendas |
| CAC | < R$ 400 | Marketing |
| Ticket medio implementacao | R$ 2.700+ | Vendas |
| Tempo de ativacao (onboarding → blog no ar) | 7 dias | Operacao |
| Primeiros sinais (indexacao + impressoes) | 30 dias | Operacao |
| Custo operacional/cliente/mes | < R$ 200 | Produto/Infra |
| **MRR infra (R$ 300 × base ativa)** | cresce mes a mes | Produto/Finance |
| **Churn mensal de infra** | < 5% (M12+) | Produto |
| **Tempo medio ate 1a cobranca de infra** | D+30 exato | Finance |
| NPS | > 50 | Produto |

---

## Relacao entre as duas North Stars

```
IVT do cliente sobe → Cliente ve valor → Cliente indica / renova
Clientes novos/mes sobe → Escala sustentavel → Empresa cresce
```

Se IVT medio esta subindo mas vendas estao estagnadas → problema de aquisicao.
Se vendas estao crescendo mas IVT esta estagnado → risco de reputacao (cliente nao ve valor). Motor precisa otimizar.

---

## Como o IVT aparece no dashboard do cliente

```
┌─────────────────────────────────────────┐
│                                         │
│     INDICE DE VISIBILIDADE TOTAL        │
│                                         │
│            43,7%  ↑ +5,2%               │
│         ████████████░░░░░░░░            │
│                                         │
│   Google: 37,5%    IAs: 18,7%           │
│   Sobreposicao: 12,5%                   │
│                                         │
│   Meta mes 6: 55%   Tendencia: ↑        │
│                                         │
│   Conteudos publicados: 62 este mes     │
│                                         │
└─────────────────────────────────────────┘
```

---

## Metrica de venda (usar no pitch)

Para vender, "IVT" e conceitual demais. Usar no pitch:

**"Indice de Presenca": X de 20 buscas."**

### Como usar na call

**Antes (diagnostico gratuito):**
> "Fiz uma analise: hoje voce aparece em **2 de 20** buscas importantes do seu nicho. Seu concorrente [X] aparece em **12 de 20**."

**Depois (promessa):**
> "Em 90-120 dias, nosso objetivo e colocar voce em **10 de 20 ou mais**. O motor publica 3 conteudos por dia — em 12 semanas sao 252 conteudos acumulados, cada um sendo porta de entrada para novas buscas."

### Por que funciona
- Numero simples (2 de 20) bate melhor que porcentagem.
- Comparacao com concorrente ativa competitividade.
- Cita o mecanismo concreto (3/dia, 252 em 12 semanas).

---

## Alertas baseados no IVT

| Condicao | Alerta | Acao |
|---|---|---|
| IVT caiu > 5pp em 1 semana | Vermelho | Investigar causa (algoritmo? queda de conteudo?) |
| IVT estagnado por 4+ semanas | Amarelo | Revisar estrategia de conteudo |
| IVT atingiu meta do periodo | Verde | Email com parabens + pedir indicacao |
| IVT > 70% | Excelencia | Pedir testimonial, virar case study |

---

## Metricas que NAO usamos

Mesmo com infra mensal, continuam sem sentido:

- **ARR (Annual Recurring Revenue)** — numero anualizado da infra e util mas nao e principal (implementacao continua sendo upfront).
- **LTV baseado em anos infinitos de assinatura** — LTV e implementacao + N meses de infra antes de churn. Calculo pragmatico: ticket implementacao + (R$ 300 × tempo medio ate cancelamento infra).
- **Expansao via upgrade de tier** — nao ha tiers em nenhuma camada.
- **MRR como North Star principal da empresa** — **e secundaria**. Principal continua "novos clientes fechados/mes" porque e o input, MRR e a consequencia.

---

## Notas relacionadas

- [[VERDADE_UNICA_BUSCOU]] — canonico
- [[Decision Log - 2026-04-23 - Infra Mensal]] — modelo atual
- [[Modelo de Negocio]]
- [[Unit Economics]]
- [[Proposta de Valor]]
- [[Oferta Comercial]]
- [[Decision Log - 2026-04-23]]
