---
tipo: estrategia
area: Empresa
tags: [decision-log, canonico, oferta, modelo-comercial, infra]
atualizado: 2026-04-23
aprovacao: Joao Lucas Ucceli — 2026-04-23
---

# Decision Log — 2026-04-23 — Infra Mensal

> **REVOGADO PARCIALMENTE em 2026-04-25** ([[Decision Log - 2026-04-25 - Pricing + ICP + Timeline + Anna V1 manual]]). Modelo de duas linhas (implementacao + infra mensal) preservado. **Mudaram apenas os valores-ancora e a politica de inegociabilidade da infra:**
> - **Implementacao:** R$ 2.500/3.000 → **R$ 3.000 fixo** (a vista PIX ou 12x R$ 250 cartao).
> - **Infra mensal:** R$ 300 inegociavel → **R$ 500/mes negociavel ate R$ 300/mes** (piso).
> - **Politica de desconto** estendida: agora cobre tambem infra (era so implementacao em 2026-04-24).
> - **Timeline:** "blog em 7 dias" → "blog instantaneo apos onboarding" (motor multi-tenant ja pronto).
>
> O resto deste Decision Log (justificativa do modelo, politica de inadimplencia, mecanica do passthrough de custo) permanece valido como contexto historico.

## Contexto

Apos a Fase 1-6 do saneamento (Decision Log anterior em [[Decision Log - 2026-04-23]]), uma segunda auditoria ao modelo identificou que o custo operacional real por cliente (tokens LLM + APIs SEO/AIO + hospedagem do pipeline) nao cabia dentro do ticket unico de R$ 2.500-3.000 por cliente, considerando 90 conteudos/mes por tempo indeterminado. Sem passar esse custo ao cliente:

1. **Margem negativa** em poucos meses — cada cliente vira prejuizo operacional a partir do mes 6-8.
2. **Impossibilidade de escala** — quanto mais clientes, mais prejuizo acumulado.
3. **Insustentabilidade** — o modelo de pagamento unico puro nao sobrevive aos custos reais de LLM e APIs.

O dono decidiu evoluir o modelo comercial para cobrir os custos operacionais recorrentes do motor **diretamente com o cliente**, como infra passthrough, mantendo o modelo de implementacao unica.

---

## Decisao anterior

Modelo aprovado em [[Decision Log - 2026-04-23]]:

- Oferta: R$ 2.500 a vista OU R$ 3.000 em 12x.
- **Sem mensalidade. Sem assinatura.**
- Cliente paga uma vez, tecnologia fica funcionando por tempo indeterminado.

---

## Nova decisao (canonica — Nivel 1)

O modelo comercial passa a ter **dois componentes**:

### Componente 1 — Implementacao (one-time)

Mesmos valores e regras do Decision Log anterior:

| Forma de pagamento | Valor |
|---|---|
| A vista | **R$ 2.500** |
| Parcelado ate 12x (cliente assume juros) | **R$ 3.000** (12x R$ 250) |

**Cobre:**
- Blog publicado e configurado no dominio do cliente (ate 7 dias).
- Motor configurado e ativo.
- Onboarding guiado + primeira estrategia gerada.
- **Mes 1 de operacao incluso** (primeiros ~90 conteudos publicados).

### Componente 2 — Infra mensal (recurring)

**R$ 300/mes**, cobrados a partir do **mes 2** (ao iniciar o mes 2 apos o blog ir ao ar).

**Cobre:**
- Tokens LLM do motor (Claude, OpenAI) para gerar os 90 conteudos/mes.
- APIs externas (Ahrefs, DataForSEO, Google Search Console, Stripe).
- Hospedagem do pipeline de producao.
- Custos de suporte automatizado.

**Cobrado via:** cartao recorrente cadastrado no onboarding.

**Modelo:** infra passthrough com margem pequena. O R$ 300 nao e lucro — e custo operacional real repassado ao cliente.

### Politica de inadimplencia

Se o cliente deixar de pagar os R$ 300/mes:

1. Gateway tenta cobranca 3 vezes com smart retry (D+0, D+3, D+7).
2. Se todas falharem: **motor pausa** — nao gera nem publica novos conteudos.
3. **Conteudo ja publicado permanece no ar** no blog do cliente.
4. Cliente recebe notificacoes em cada tentativa + aviso de pausa.
5. Ao regularizar: motor retoma no proximo ciclo (D+1 da regularizacao).

**Nao ha cancelamento automatico** — a conta fica em estado `motor_paused` ate cliente regularizar ou cancelar explicitamente.

---

## Justificativa

1. **Sustentabilidade financeira.** LLM + APIs + infra tem custo crescente e recorrente. Nao ha como cobrir isso com receita unica indefinidamente. Passthrough direto e o modelo mais simples e honesto.

2. **Transparencia de precificacao.** Separar implementacao (servico) de infra (custo operacional) e mais facil de explicar ao cliente do que embutir tudo em ticket unico que "precisa render" para caber.

3. **Alinhamento de interesses.** Cliente paga para manter motor ativo. Se nao pagar, motor para. Blog (ja pago) fica no ar. Justo de ambos os lados.

4. **Capacidade de escala.** Com infra repassada, margem por cliente e constante independente do tempo. Adicionar clientes nao gera prejuizo acumulado.

5. **Positioning honesto.** "Pague a implementacao + infra mensal" e mais confiavel do que "pague uma vez e esqueca" quando claramente ha custo recorrente.

---

## Trade-offs

### Ganhamos
- Modelo sustentavel (margem constante por cliente).
- Possibilidade real de escalar para N clientes.
- Receita recorrente previsivel (cada cliente ativo = R$ 300/mes + novos clientes do mes).
- Cliente entende melhor o que esta pagando (implementacao = servico / infra = operacao).
- Estrutura financeira mais facil de explicar a investidor, contador, socios.

### Perdemos
- Narrativa "pague uma vez e esqueca" (que era atrativa mas insustentavel).
- Simplicidade absoluta da oferta (agora tem 2 linhas de cobranca em vez de 1).
- Argumento "sem mensalidade" como diferencial.

### Riscos
- **Confusao com modelo SaaS.** Mitigacao: linguagem explicita em todo copy — "implementacao unica + infra mensal" (nunca "assinatura"). Infra nao e servico; e passthrough de custo de infraestrutura.
- **Churn de infra.** Cliente pode cancelar infra depois de 2-3 meses, deixando motor parado mas blog no ar. Isso gera saida "suja" — o que fazer com a conta? Mitigacao: politica clara, conta fica em `motor_paused` ate regularizacao; se inativa por 6+ meses, converter em arquivamento.
- **Complexidade operacional.** Agente Pagamento precisa monitorar 2 fluxos (parcelas da implementacao + infra recorrente). Mitigacao: reescrita do agente com 2 state machines separadas.
- **Objecao de vendas**. Cliente pode resistir a "pagar duas coisas". Mitigacao: pitch focado no total transparente — "R$ 2.500 + R$ 300/mes = custo real de rodar um motor de 90 conteudos/mes. Qualquer agencia cobra R$ 4.000+/mes por um terco disso."

---

## Impacto em linguagem

A secao 6 da VERDADE_UNICA (Linguagem) precisa ser atualizada:

**Nao mais 100% proibido:**
- `"mensalidade"` — **permitido** quando especificado como "mensalidade de infra" ou "infra mensal do motor".
- `"assinatura"` — **permitido** apenas como "assinatura de infraestrutura" (tecnico/interno); evitar em copy publico.

**Continua proibido:**
- `"mensalidade de servico"`, `"mensalidade de gestao"`, `"assinatura de SaaS"`, `"plano mensal"`.
- `"servico mensal"`, `"contrato mensal"`.
- `"tiers"`, `"planos"` (Starter/Growth/Scale).

**Preferido em copy publico:**
- `"infra mensal"` — mais neutro.
- `"custo de operacao do motor"` — explicativo.
- `"taxa de infraestrutura"` — tecnico.

**Obrigatorio:** sempre separar na comunicacao **"implementacao"** (componente 1) e **"infra"** ou **"motor em operacao"** (componente 2). Nunca usar "pacote total" ou "plano completo".

---

## Impacto em entrega (promessa vs realidade)

| Prometemos | Entregamos | Verdade |
|---|---|---|
| Blog no ar em 7 dias | Estrutura ativa, dominio configurado, identidade aplicada | Coerente |
| 90 conteudos/mes | Motor publica 3x/dia enquanto infra esta ativa | Coerente (condicional a infra paga) |
| Implementacao unica | Cliente paga implementacao 1x (a vista ou em 12x) | Coerente |
| Infra mensal transparente | R$ 300/mes via cartao, cobre tokens e APIs | Coerente |
| Motor pausa se nao pagar infra | Nao gera novo conteudo; blog e conteudo antigo ficam no ar | Coerente |

---

## Arquivos afetados (cascata obrigatoria)

### Alta prioridade — reescrever no mesmo ciclo (Fase 7)

**Nucleo canonico:**
- `00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md` (secoes 4, 5, 6, 7, 8, 9)
- `00 - Verdade Unica/MOC - Empresa.md`
- `CLAUDE.md` (raiz)

**Consolidados Fase 2:**
- `01 - Posicionamento/Conceito e Posicionamento.md`
- `01 - Posicionamento/Proposta de Valor.md`
- `02 - ICP/ICP por Nicho.md`
- `02 - ICP/Nicho Inicial.md`
- `03 - Oferta/Oferta Comercial.md` (heavy rewrite)
- `05 - Modelo de Negocio/Modelo de Negocio.md` (heavy rewrite — unit economics)
- `05 - Modelo de Negocio/Canvas.md`
- `14 - Marketing/Tom de Voz e Marketing.md`

**Reescritos Fase 1:**
- `04 - Produto/Site Publico.md`, `Suporte Automatizado.md`, `Dashboard do Cliente.md`, `Requisitos Produto Autonomo.md`, `Modo MVP.md`, `Time to Value.md`, `Roadmap do Produto.md`
- `09 - Execucao/Fluxo V1.md`
- `11 - Operacao/SLAs e Garantias.md`, `Jornada do Cliente.md`, `Jornada Interna.md`
- `13 - Agentes/Agente Pagamento.md` (heavy), `Arquitetura de Agentes.md`, `Inputs dos Agentes.md`, `Orquestrador.md`
- `14 - Marketing/Funil Completo.md`, `Tipos de Conteudo.md`, `Case Proprio como Prova.md`, `Casos de Estudo do Mercado.md`, `Concorrentes e Benchmarks.md`

**12 - Sistema (reprojetamento):**
- `Entidades e Schema.md`, `Estados e Maquina de Estado.md`, `Eventos e Gatilhos.md`, `Integracoes Externas.md`, `Modulos.md`, `Stack Tecnologica.md`

**Camada operacional:**
- `agentes/contexto/verdade-unica.md`, `oferta.md`, `linguagem.md` (bump versao 1.1.0)

### Baixa prioridade — validado em auditoria futura

- Arquivos em 06-SEO, 07-AIO, 08-Estrategia (didaticos, sem mencao direta ao modelo comercial) — validar se citam oferta ou modelo; se sim, atualizar.

---

## Prazo de cascata

**Alta prioridade:** 2026-04-23 (mesmo dia desta decisao, no escopo da Fase 7).
**Baixa prioridade:** validado em auditoria pos-Fase 7.

---

## Nivel desta decisao

**Nivel 1 — INEGOCIAVEL.**

Qualquer alteracao exige novo Decision Log datado, aprovacao do dono do projeto, e cascata de atualizacao em ate 7 dias (ver [[Governanca - Decisoes Canonicas]]).

---

## Aprovacao

Joao Lucas Ucceli — 2026-04-23.

---

## Links cruzados

- [[VERDADE_UNICA_BUSCOU]] — documento canonico atualizado por esta decisao
- [[Decision Log - 2026-04-23]] — decisao anterior (base), agora complementada
- [[Governanca - Decisoes Canonicas]] — processo
- [[MOC - Empresa]]
- [[Agente Pagamento]] — ator operacional principal desta decisao
