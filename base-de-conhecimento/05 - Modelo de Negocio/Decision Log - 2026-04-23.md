---
tipo: estrategia
area: Empresa
tags: [decision-log, canonico, posicionamento, produto, oferta, icp]
atualizado: 2026-04-23
aprovacao: Joao Lucas Ucceli — 2026-04-23
---

# Decision Log — 2026-04-23

## Contexto

Auditoria completa do blueprint em 2026-04-23 identificou 3 contradicoes criticas entre documentos:

1. **Posicionamento** em 5 taglines diferentes entre Proposta de Valor, Canvas, Oferta Comercial, Conceito e Posicionamento, Modelo de Negocio.
2. **ICP inicial** com 3 nichos diferentes marcados como "primeiro" em arquivos distintos (Imobiliarias 10/10 em ICP por Nicho, Clinicas em Nicho Inicial, E-commerce no Canvas).
3. **Modelo comercial** em 2 formatos incompativeis (tiers SaaS R$497/1.497/3.997 em Modelo de Negocio, vs Setup R$3.000 + mensalidade em Oferta Comercial), alem de oscilacao entre "SaaS puro" no marketing e "servico manual com 15-20h/mes do founder" na operacao.

O projeto nao pode mais conviver com essa ambiguidade. Decisoes canonicas sao tomadas agora.

---

## Decisao anterior

Nao havia decisao unica. Cada arquivo expressava uma versao diferente do projeto.

---

## Novas decisoes (canonicas)

### 1. POSICIONAMENTO

**Frase central (inegociavel):**
> "Se alguem buscou, quem apareceu foi voce?"

**Definicao oficial:**
A buscou.ai e uma **tecnologia que coloca empresas nos resultados de busca e nas respostas de IA automaticamente**.

**Canais:** Google (SEO) + IA (ChatGPT, Gemini, Perplexity, Claude, Google AI Overviews).

**O que fazemos (uma frase):** fazemos sua empresa aparecer quando seu cliente busca.

### 2. PUBLICO-ALVO (ICP)

- **Primario (foco de comunicacao):** negocios locais — clinicas, imobiliarias, advogados, servicos locais.
- **Secundario:** empresas com canal de aquisicao por intencao.
- **Regra:** comunicacao externa assume sempre negocio local como default.

### 3. PRODUTO

Dois componentes:

- **Estrutura (Blog):** site otimizado para SEO + AIO, hospedado e mantido tecnicamente pelo buscou.ai.
- **Motor (buscou.ai):** sistema de geracao automatizada — **3 conteudos/dia = 90 conteudos/mes** otimizados SEO + AIO.

### 4. MODELO DE ENTREGA

- **NAO** e agencia.
- **NAO** e consultoria.
- **NAO** e SaaS tradicional (sem mensalidade / sem assinatura).
- **E** venda de tecnologia (estrutura + motor) com pagamento unico.

Tecnicamente o backend e um SaaS centralizado. Comercialmente e venda de tecnologia.

### 5. OFERTA (unica, sem variacoes)

| Forma de pagamento | Valor |
|---|---|
| A vista | **R$ 2.500** |
| Parcelado ate 12x (cliente assume juros) | **R$ 3.000** |

**Sem mensalidade. Sem tiers. Sem setup separado. Sem assinatura.**

Entrega: blog completo + motor gerando 90 conteudos/mes.

### 6. LINGUAGEM

**Proibido** em qualquer copy ou documento externo:
"agencia", "gestao", "consultoria", "servico mensal", "assinatura", "mensalidade", "plano" (Starter/Growth/Scale), "SaaS" (em vendas), "subscription", "contrato mensal", "horas", "piloto automatico", "sistema operacional", "transformacao digital", "jornada", "sinergia", "solucoes" (soltinho).

**Obrigatorio:** "tecnologia", "sistema", "motor", "estrutura", "automacao", "pagamento unico", "aparecer", "busca", "SEO", "AIO", "presenca organica".

### 7. NOME DA MARCA

- Visual: `buscou.ai` (minusculo, com ponto).
- Juridico/institucional: `BuscouAI`.
- Dominio: `buscouai.com`.
- Proibido: `Buscou.ai`, `Buscou.AI`, `BUSCOU.AI`, `buscou.AI`.

---

## Justificativa

1. **Posicionamento unico** e pre-requisito para qualquer comunicacao coerente. Sem ele, nao ha site, nao ha vendas, nao ha marca.
2. **Foco em negocio local** reduz complexidade de go-to-market, aproveita melhor o diferencial de Local SEO + AIO, e permite cases concretos mais rapidos.
3. **Venda de tecnologia com pagamento unico** resolve simultaneamente:
   - Problema de churn (nao ha churn de assinatura — cliente paga 1x).
   - Problema de posicionamento "SaaS vs servico manual" (e tecnologia fechada).
   - Problema de complexidade de pricing (nao ha tiers).
   - Problema de previsibilidade de fluxo de caixa (recebe antecipado).
4. **90 conteudos/mes** e numero concreto, defensavel e facil de comunicar.

---

## Trade-offs

### Ganhamos
- Clareza absoluta em posicionamento, produto e oferta.
- Fluxo de caixa antecipado (cliente paga ate R$3.000 upfront).
- Simplicidade de vendas: oferta unica sem negociacao de tier.
- Sem churn de assinatura.
- Copy de marketing fica direto (sem "qual plano voce prefere?").

### Perdemos
- Receita recorrente previsivel (MRR). Receita passa a depender de novos clientes por mes.
- Ticket medio mais baixo vs um modelo SaaS Growth R$1.497 x 12 = R$17.964/ano. Aqui e ticket R$2.500-3.000 e cabou.
- Opcao de upsell ongoing (pode ser compensada com renovacao anual ou modulos adicionais no futuro).

### Riscos
- Modelo de venda unica tem que provar ROI claro para o cliente em 3-6 meses, senao nao ha recompra nem indicacao.
- Custo operacional por cliente (tokens LLM + infra + CMS) precisa ficar dentro do ticket para manter margem. Unit Economics precisa ser refeita com este modelo.
- Suporte pos-venda: sem mensalidade, cliente pode exigir suporte eterno. Definir SLA claro de suporte.

---

## Arquivos afetados (cascata obrigatoria)

### Alta prioridade — reescritos nesta mesma rodada
- `00 - Indice/VERDADE_UNICA_BUSCOU.md` (criado)
- `00 - Indice/Governanca - Decisoes Canonicas.md` (criado)
- `00 - Indice/MOC - Empresa.md` (atualizar tabela de numeros-chave)
- `14 - Empresa/Proposta de Valor.md` (reescrita)
- `14 - Empresa/Oferta Comercial.md` (reescrita)
- `14 - Empresa/Modelo de Negocio.md` (reescrita)
- `14 - Empresa/Canvas.md` (reescrita)
- `14 - Empresa/Unit Economics.md` (reescrita — modelo de venda unica)
- `14 - Empresa/North Star Metric.md` (reescrita — NSM passa a ser clientes/mes)
- `14 - Empresa/ICP por Nicho.md` (reescrita — foco em negocio local)
- `14 - Empresa/Nicho Inicial.md` (reescrita)
- `14 - Empresa/Go To Market Inicial.md` (reescrita — sem reuniao obrigatoria)
- `14 - Empresa/Roadmap do Produto.md` (reescrita)
- `21 - Identidade Visual/Conceito e Posicionamento.md` (reescrita)
- `21 - Identidade Visual/Tom de Voz e Marketing.md` (reescrita)
- `CLAUDE.md` (raiz) (adicionar secao "Decisoes Canonicas")

### Media prioridade — revisar proximo sprint
- `15 - Operacao/*` — fluxo operacional deve refletir venda unica (sem reuniao obrigatoria)
- `16 - Agentes/*` — arquitetura de 11 agentes deve ser reduzida (SDR, Cobranca sao redundantes no novo modelo)
- `17 - Sistema/*` — stack precisa suportar multi-tenant de blogs + motor centralizado
- `18 - Produto/*` — onboarding, dashboard, suporte realinhados
- `19 - Marketing Automatizado/*` — funil vira "pagina de venda → check-out direto"

### Baixa prioridade — quando forem criados novos
- Todas as demais notas devem consultar VERDADE_UNICA_BUSCOU antes de falar de produto/oferta/ICP.

---

## Prazo de cascata

**Alta prioridade:** 2026-04-23 (mesmo dia desta decisao).
**Media prioridade:** ate 2026-05-07 (proximas 2 semanas).
**Baixa prioridade:** continuo, validado em auditoria de 30 dias.

---

## Nivel desta decisao

**Nivel 1 — INEGOCIAVEL.**

Qualquer alteracao exige novo Decision Log datado, aprovacao do dono do projeto, e cascata de atualizacao em ate 7 dias (ver [[Governanca - Decisoes Canonicas]]).

---

## Aprovacao

Joao Lucas Ucceli — 2026-04-23.

---

## Links cruzados

- [[VERDADE_UNICA_BUSCOU]] — documento canonico resultante desta decisao
- [[Governanca - Decisoes Canonicas]] — processo de governanca
- [[MOC - Empresa]]
