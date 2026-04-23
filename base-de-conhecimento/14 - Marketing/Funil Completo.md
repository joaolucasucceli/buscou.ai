---
tipo: marketing
area: Funil
tags: [marketing, funil, conversao, aquisicao, vendas]
atualizado: 2026-04-23
---

# Funil Completo

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]] secao 7 (fluxo de venda). Este documento detalha o funil de aquisicao da buscou.ai — blog gera trafego, landing converte, pagamento fecha. Sem BANT, sem qualificacao obrigatoria, sem reuniao obrigatoria.

Relacionado: [[Estrategia de Conteudo Autonomo]] | [[Oferta Comercial]] | [[Site Publico]] | [[ICP por Nicho]] | [[Modelo de Negocio]]

---

## Visao macro

```
TOFU                         MOFU                      BOFU
Blog + citacoes em IA        Lead magnet + e-mail      Landing buscou.ai
→ trafego organico           → lead identificado       → checkout direto
                                                       → call opcional (se pedir)
                                                       → ativacao automatica
                                                       (ver [[Onboarding Automatico]])
```

---

## TOFU — atracao

**Objetivo:** trafego organico qualificado via blog + citacoes em IA.

| Aspecto | Detalhe |
|---|---|
| Canal principal | Blog proprio buscou.ai (dog-fooding). Ver [[Case Proprio como Prova]]. |
| Canais secundarios | LinkedIn, Medium, Reddit (V1.2+). Ver [[Distribuicao Automatica]]. |
| Formatos | How-to, listicles, glossarios. Ver [[Tipos de Conteudo]]. |
| Volume | 90 artigos/mes (mesmo ritmo entregue ao cliente). |
| SEO | [[Framework SEO Completo]]. |
| AIO | [[Framework AIO Completo]] (ChatGPT, Perplexity, AI Overviews). |
| Automacao | 100% (proprio pipeline). |

**Metricas TOFU:**

| Metrica | Meta mes 6 | Meta mes 12 |
|---|---|---|
| Trafego organico mensal | 10k-20k | 30k-60k |
| Keywords top 10 | 50-100 | 150-250 |
| Citacoes em IA | 20-40 | 50-100 |
| Bounce rate | < 60% | < 50% |

---

## MOFU — captura e nurturing

**Objetivo:** transformar visitante anonimo em lead identificado.

### Lead magnets

| Lead magnet | Formato | CTA no blog | Entrega |
|---|---|---|---|
| Diagnostico gratuito de aparicao | Formulario → analise automatica | Banner no final de cada artigo + pop-up de exit intent | [[Agente Pesquisador]] analisa dominio, gera relatorio em PDF |
| Checklist "Seu negocio aparece nas buscas?" | PDF curto | Sidebar + artigos TOFU | Download imediato + captura de e-mail/WhatsApp |
| Calculadora de impacto | Ferramenta interativa (React) | Artigos sobre ROI | Resultado estimado + captura de contato |

### Nurturing por e-mail

Apos captura, sequencia automatica via Resend:

| Dia | E-mail | Objetivo |
|---|---|---|
| 0 | Entrega do lead magnet + "quem somos" | Valor imediato |
| 2 | "3 motivos pelos quais seu negocio nao aparece" | Dor |
| 5 | Case proprio: nossos numeros. Ver [[Case Proprio como Prova]] | Prova |
| 8 | Compara: agencia/consultoria vs tecnologia unica | Diferencial |
| 12 | "Quer ver o motor funcionando? Compre aqui." + link landing | Conversao |

**Metricas MOFU:**

| Metrica | Meta |
|---|---|
| Captura (visita → lead) | 3-5% |
| Open rate | > 35% |
| Click rate | > 5% |
| Lead → visita landing | 15-25% |

---

## BOFU — decisao e compra

**Objetivo:** converter lead qualificado em cliente pagante.

### Fluxo

```
Lead clica CTA do e-mail ou no blog
  → Chega na landing buscou.ai
    → Ve oferta: implementacao R$ 2.500 a vista (ou 12x R$ 250) + infra mensal R$ 300 a partir do mes 2
      → Opcao A: compra direto (80% dos casos — self-service)
      → Opcao B: clica em "ficou com duvida? agende 20 min"
          → Call opcional com humano
          → Humano usa diagnostico pre-gerado pelo [[Agente Estrategista]] no dominio do prospect
          → Se fecha, prospect compra na mesma call
    → Checkout via gateway (Stripe/Asaas):
      - Cobra a implementacao (a vista ou 12 parcelas)
      - Cadastra cartao recorrente para a infra mensal (subscription agendada para D+30)
      → [[Agente Pagamento]] confirma webhook (dois fluxos)
        → Ativacao (ver [[Onboarding Automatico]])
```

**Nao ha BANT, nao ha qualificacao, nao ha reuniao obrigatoria.** A landing vende. A call so existe como esclarecimento de duvida, quando o cliente pede.

**Metricas BOFU:**

| Metrica | Meta |
|---|---|
| Landing → checkout iniciado | > 15% |
| Checkout → pagamento confirmado | > 80% |
| Landing → cliente (total) | > 2% |
| Cliente ativado em 7 dias | > 90% |

---

## Numeros projetados

Baseado em [[Roadmap do Produto]] e [[Unit Economics]]:

| Estagio | Mes 6 | Mes 12 |
|---|---|---|
| Trafego organico/mes | 15k | 45k |
| Leads capturados (3-5%) | 450-750 | 1.350-2.250 |
| Visitas na landing (15-25% dos leads) | 67-187 | 200-560 |
| Clientes novos (2% da landing) | 1-4 | 4-11 |
| Caixa recebido | R$ 2,5k-11k | R$ 10k-30k |

Meta consolidada ano 1: ~167 clientes, ~R$ 459K de receita total. Ver [[Unit Economics]].

**CAC via organico:** ~R$ 50-150 (custo marginal do pipeline, praticamente zero variavel).

---

## Stack do funil

| Componente | Ferramenta | Custo |
|---|---|---|
| Blog/conteudo | Next.js + pipeline de 6 agentes core | Custo de API (marginal) |
| E-mail | Resend | ~R$ 100-300/mes |
| Landing + checkout | Next.js + Stripe/Asaas | 2,99% + R$ 0,39 por transacao |
| Agendamento (call opcional) | Google Calendar API | Gratis |
| Analytics | GA4 + PostHog | Gratis + ~R$ 100/mes |

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 5, 6, 7 — ultima verificacao 2026-04-23.*
