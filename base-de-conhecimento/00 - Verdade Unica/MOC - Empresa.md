---
tipo: indice
area: Empresa
tags: [moc, indice, empresa, blueprint]
atualizado: 2026-04-23
---

# MOC - Blueprint da Empresa

> Mapa central do blueprint da buscou.ai. Indice navegavel — conteudo canonico nos arquivos linkados.

**Fonte unica da verdade:** [[VERDADE_UNICA_BUSCOU]].
**Governanca de decisoes:** [[Governanca - Decisoes Canonicas]].
**Decision Log vigente:** [[Decision Log - 2026-04-23]].

---

## Modelo de Negocio

- [[Modelo de Negocio]] — visao operacional (receita, custos, concorrentes, evolucao)
- [[Canvas]] — BMC em uma pagina
- [[Unit Economics]] — ticket medio, break-even, margem
- [[Proposta de Valor]] — argumentacao comercial
- [[Oferta Comercial]] — pitch, objecoes, fluxo de venda
- [[Roadmap do Produto]] — MVP → V1 → V1.2 → V2
- [[North Star Metric]] — IVT (cliente) + novos clientes/mes (empresa)
- [[ICP por Nicho]] — manual de campo por nicho
- [[Nicho Inicial]] — clinicas de estetica como entrada
- [[Go To Market Inicial]] — dog-fooding + prospecao + indicacao
- [[Conceito e Posicionamento]] — manifesto narrativo

---

## Operacao

- [[Fluxo Operacional Completo]] — end-to-end do cliente descobrir ao blog rodar
- [[Jornada do Cliente]] — touchpoints externos
- [[Jornada Interna]] — state machine de conteudo + capacidade do sistema
- [[Pontos Criticos UX]] — momentos de retencao e friccao
- [[SLAs e Garantias]] — SLAs do modelo de venda unica

---

## Arquitetura de Agentes (V1 — 11 agentes + orquestrador)

- [[Arquitetura de Agentes]] — mapa central
- [[Orquestrador]] — router principal

**6 core (obrigatorios no MVP):**
- [[Agente Pesquisador]] — SERP + keywords + gaps
- [[Agente Estrategista]] — clusters + calendario (90/mes)
- [[Agente Redator]] — artigos 800-1.200 palavras
- [[Agente Revisor]] — SEO + AIO + answer-first (score >= 75)
- [[Agente Publicador]] — CMS + sitemap + GSC
- [[Agente Monitor]] — ranking + trafego + citacoes IA

**5 complementares (V1 completa):**
- [[Agente Visual]] — capa + alt text
- [[Agente Distribuidor]] — RSS/sitemap (V1), LinkedIn/Medium (V1.2+)
- [[Agente Suporte]] — chatbot FAQ + escalacao
- [[Agente Prospeccao]] — outbound paralelo (renomeacao do antigo SDR)
- [[Agente Pagamento]] — confirmacao + parcelas 12x (renomeacao do antigo Cobranca)

Os agentes antigos SDR (com BANT obrigatorio) e Cobranca (recorrente) nao existem mais no modelo de venda unica. Ver [[Decision Log - 2026-04-23]].

---

## Design do Sistema

- [[Arquitetura do Sistema]] — multi-tenant
- [[Modulos]] — API interna
- [[Entidades e Schema]] — Postgres
- [[Estados e Maquina de Estado]]
- [[Eventos e Gatilhos]]
- [[Permissoes e Roles]]
- [[Integracoes Externas]]
- [[Stack Tecnologica]] — ADRs

---

## Produto

- [[Requisitos Produto Autonomo]] — pilares de autonomia
- [[Modo MVP]] — escopo minimo viavel
- [[Site Publico]] — spec da landing + blog publico
- [[Dashboard do Cliente]] — IVT + artigos + status
- [[Onboarding Automatico]] — wizard de 5 passos, meta 7 dias
- [[Tratamento de Falhas]] — modos de falha tecnicos
- [[Failure Modes]] — falhas sistemicas (FMEA)
- [[Suporte Automatizado]] — chatbot V1.2+

---

## Marketing (dog-fooding)

- [[Estrategia de Conteudo Autonomo]] — o motor gera o conteudo da buscou.ai
- [[Funil Completo]] — trafego organico → landing → pagamento
- [[Tipos de Conteudo]] — how-to + comparativos + local
- [[Case Proprio como Prova]] — argumento #1 de vendas
- [[Tom de Voz e Marketing]] — headlines, CTAs, microcopy
- [[Distribuicao Automatica]] — RSS/sitemap (V1) + LinkedIn/Medium (V1.2+)

---

## Referencias

- [[Concorrentes e Benchmarks]]
- [[Ferramentas de Automacao SEO]]
- [[Frameworks Multi-Agente]]

---

## Numeros-chave

| Metrica | Valor |
|---|---|
| Ticket medio | R$ 2.750 (mix 50/50 a vista / parcelado) |
| Oferta unica | R$ 2.500 a vista ou R$ 3.000 em 12x |
| Volume de producao | 90 conteudos/mes = ~720K caracteres |
| Tamanho por artigo | 800-1.200 palavras |
| Timeline de ativacao | 7 dias ate blog no ar |
| Primeiros sinais | 30 dias |
| Custo variavel por cliente/mes | R$ 80-160 |
| Custo operacional 12m/cliente | R$ 960-1.920 |
| Margem bruta ano 1 por cliente | 35-60% |
| Margem ano 2+ (com renovacao) | 90%+ |
| CAC-alvo | < R$ 400 |
| Break-even | 4-5 clientes novos/mes |
| LTV (sem renovacao) | R$ 2.750 |
| LTV (com renovacao hipotetica 30-40%) | ~R$ 3.350 |
| LTV/CAC (cenario base) | 9x |
| Payback | Imediato (pagamento upfront) |
| Meta 12 meses | 150-180 clientes · R$ 400-500K receita acumulada |

Nao usamos mais: MRR, ARR, churn de assinatura, LTV baseado em retencao continua.

---

## Proximos passos

1. [ ] Finalizar MVP (6 agentes core + [[Agente Pagamento]] + blog template + onboarding).
2. [ ] Dog-fooding intenso (blog proprio publicando 3x/dia sobre SEO/AIO para clinicas).
3. [ ] Fechar 5 primeiros clientes (clinicas de estetica).
4. [ ] Documentar casos reais.
5. [ ] Escalar para 15-30 clientes (V1 completa — ativa [[Agente Suporte]], [[Agente Prospeccao]] automatizado, distribuicao LinkedIn/Medium).

---

## Navegacao

- [[VERDADE_UNICA_BUSCOU]] — fonte unica da verdade (inegociavel)
- [[Governanca - Decisoes Canonicas]] — como decisoes mudam
- [[Decision Log - 2026-04-23]] — decisoes canonicas em vigor
- [[MOC - Identidade Visual]] — marca, tom de voz, design system
- [[MOC - SEO]] — base de conhecimento SEO
- [[MOC - AIO]] — base de conhecimento AIO
- [[MOC - Execucao]] — pipeline operacional
- [[Mental Models]] — como Google, IA e usuario pensam

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] — ultima verificacao 2026-04-23.*
