---
tipo: estrategia
area: Empresa
tags: [decision-log, canonico, oferta, desconto, cupom, stripe, pricing]
atualizado: 2026-04-24
aprovacao: Joao Lucas Ucceli — 2026-04-24
---

# Decision Log — 2026-04-24 — Politica de Desconto de Implementacao

> **ESTENDIDO em 2026-04-25** ([[Decision Log - 2026-04-25 - Pricing + ICP + Timeline + Anna V1 manual]]). A politica de desconto deixa de ser exclusiva da implementacao e passa a cobrir **tambem a infra mensal**:
> - **Implementacao** (one-time, agora R$ 3.000 fixo) — continua negociavel caso-a-caso via Cupom Stripe. Piso operacional: R$ 1.000 (66% off).
> - **Infra mensal** (recurring, agora R$ 500/mes) — **passa a ser negociavel** ate R$ 300/mes (piso). Operada via Cupom Stripe Subscription **ou** Payment Link separado de R$ 300 (a definir apos investigacao tecnica pendente — ver Decision Log 2026-04-25 §"Cupom recorrente — investigacao Stripe").
> - **Aprovador unico** (dono Joao), **canal de aplicacao privado** (Payment Link via WhatsApp), **ancora publica preservada** (R$ 3.000 + R$ 500/mes em copy publico) — todas essas regras continuam validas.
>
> O restante deste Decision Log (mecanica do cupom Stripe, registro obrigatorio em Linear, sinais de alerta, absorcao do Beneficio Parceiro Networking) permanece valido.

## Contexto

Em 24/04/2026, ao fim do dia, o Joao fechou uma venda em que o cliente quer pagar **R$ 1.000 de implementacao** (contra os R$ 2.500 canonicos a vista) — desconto de R$ 1.500, equivalente a 60% off na implementacao. Sinalizou ainda que esse padrao vai se repetir ("nao so ele, tem varios clientes que eu tambem vou dar esse cupom").

Isso quebra o canonico vigente em dois pontos simultaneos:

1. **Valor do desconto.** [[Decision Log - 2026-04-24 - Beneficio Parceiro Networking]] fixou R$ 1.000 off como teto da unica excecao oficial (R$ 2.500 → R$ 2.000). A venda nova aplica R$ 1.500 off (R$ 2.500 → R$ 1.000) — **novo nivel**.
2. **Escala de aplicacao.** O mesmo Decision Log fixou **3 aplicacoes por trimestre** como limite. "Varios clientes" + padrao recorrente extrapolam esse teto e transformam o que era "excecao nominada" em "politica de desconto recorrente".

Dois caminhos possiveis:

- **(a) Recusar a venda para preservar o canonico.** Honroso, porem **a buscou.ai tem 0 clientes pagantes**. Recusar vendas por rigidez canonica em early-stage e autolesao.
- **(b) Adaptar o canonico a realidade operacional.** Reconhecer que implementacao e negociavel e que a infra mensal e o ativo a preservar. Formalizar via Decision Log pra nao virar caos nao documentado.

A decisao do dono foi **(b)**, com fundamento explicito: *"eu preciso vender, entende? Eu nao vou deixar. Po, e R$ 1.500. Eu sei que e 60% a menos, mas ja e alguma coisa. Eu nao posso ficar sem nada."*

Este Decision Log formaliza a mudanca.

---

## Decisao anterior

**Canonica vigente ate agora** (revogada por este Decision Log):

- [[VERDADE_UNICA_BUSCOU]] §5.3 — dois descontos possiveis:
  - R$ 300 off primeiros 5 clientes (**ja removido** no Decision Log Dual-Track 2026-04-24 porque nunca foi divulgado publicamente).
  - R$ 1.000 off parceiro networking, **maximo 3 aplicacoes por trimestre**, so em Track 2.
- [[Oferta Comercial]] §Regras inegociaveis — *"Valor a vista da implementacao e R$ 2.500. Track 1 (self-service Stripe) cobra sempre esse valor cheio — sem cupom publico, sem promocao, sem negociacao."*
- [[Decision Log - 2026-04-24 - Beneficio Parceiro Networking]] — R$ 1.000 off como unica excecao oficial, com criterio estrito e limite trimestral.

---

## Nova decisao (canonica — Nivel 1)

### Principio geral

A partir de 2026-04-24, a politica de desconto da buscou.ai passa a distinguir dois eixos:

1. **Implementacao (one-time)** — **negociavel caso a caso**, dentro de limites e com registro obrigatorio. Reflete pragmatismo de venda B2B early-stage e realidade orcamentaria do cliente.
2. **Infra mensal (recurring, R$ 300/mes)** — **inegociavel**, sempre. Passthrough de custo operacional (tokens de IA, APIs, hospedagem); nao tem margem pra absorver desconto.

### Canal de aplicacao

Desconto de implementacao e aplicado **exclusivamente via Cupons do Stripe** (`promotion_codes`) emitidos caso a caso pelo dono apos negociacao com o cliente:

- Cliente recebe codigo de cupom nominal (ex: `INNOVATE2026`, `CLIENTE-R1500`) por WhatsApp/email.
- Cliente aplica o codigo no campo "Cupom" do Stripe Checkout.
- Checkout recalcula o valor final e processa o pagamento com o desconto embutido.

### Exposicao publica

**O desconto nao aparece em nenhum copy publico:**

- Landing (`buscouai.com`) mostra sempre o preco canonico cheio: R$ 2.500 a vista ou R$ 3.000 em 12x.
- Redes sociais, email marketing, carrosseis, anuncios: **preco canonico cheio**, sem mencao a cupom, codigo promocional ou possibilidade de negociacao.
- Nenhuma sugestao tipo "use codigo X" ou "desconto para os primeiros" em copy publico.

**Motivo:** expor publicamente quebra a ancora de preco e muda a percepcao de valor. A negociacao acontece em canal privado (reuniao de diagnostico, WhatsApp 1-a-1) apos qualificacao minima de ICP e realidade orcamentaria.

### Track 1 (Self-service Stripe)

- Stripe Checkout passa a aceitar `allow_promotion_codes: true` na criacao da Session.
- Cliente que chega por Track 1 sem contato previo **nao recebe cupom**. Paga o valor canonico cheio.
- Cupom so e enviado se houve **conversa previa** (Track 2 reuniao, ou mensagem direta por outro canal) em que desconto foi acordado.

### Track 2 (Consultivo via reuniao)

- Na reuniao de diagnostico, apos qualificacao de ICP + entendimento de realidade orcamentaria, o dono pode oferecer desconto.
- Desconto fica registrado na proposta personalizada (gerada via [[gerador-proposta-buscou]]).
- Cliente recebe o link de pagamento com o cupom ja aplicavel (`?prefilled_promo_code=X`) ou com instrucao pra aplicar manualmente.

### Regras de governanca

- **Aprovador unico:** o dono (Joao Lucas Ucceli). Nem Vitoria, nem Anna Mel, nem qualquer outro agente emite cupom.
- **Piso operacional:** o dono define case-by-case o minimo aceitavel para fechar venda sem prejuizo estrategico. Nao ha valor absoluto canonico de "piso". Referencia atual: evitar ir abaixo de R$ 1.000 na implementacao (que ja e 60% off), salvo situacoes excepcionais documentadas.
- **Infra nao desconta.** Reforco: o valor de R$ 300/mes e fixo e inegociavel em qualquer cenario. Cupons emitidos atuam exclusivamente no price_id de implementacao.
- **Parcelado (12x, R$ 3.000) tambem pode receber cupom,** mas a regra operacional e evitar — prefere-se ajustar na opcao a vista. Se aplicado em parcelado, o desconto se distribui nas 12 parcelas.
- **Registro obrigatorio.** Toda aplicacao de cupom e registrada na tabela "Historico de aplicacoes" deste Decision Log (valor, cliente, issue Linear, motivo). Ausencia de registro = aplicacao nao-canonica.

### Sem limite trimestral fixo

O limite de "3 aplicacoes por trimestre" do Decision Log Parceiro Networking **e revogado**. A nova politica assume que descontos podem acontecer com frequencia em early-stage.

Em contrapartida:

- **Metrica de monitoramento qualitativo:** o dono revisa mensalmente o ticket medio real vs canonico. Se o desvio persistir acima de 40% por 3 meses consecutivos, um novo Decision Log precisa reavaliar se o preco-ancora canonico ainda faz sentido.
- **Sinal de alerta:** se o desconto medio virar **maior que 50%** do canonico, e sinal de que o mercado esta comunicando algo sobre valor percebido — e necessita decisao estrategica, nao so ajuste tatico.

### Parceiro Networking

O beneficio especifico "Parceiro Networking R$ 1.000 off" **e absorvido** por esta politica geral. Nao existe mais como categoria separada com criterios proprios.

- Clientes vindos de parceria de networking continuam recebendo desconto quando o dono decidir, mas sob a politica geral — nao sob um limite/valor rigido.
- [[Decision Log - 2026-04-24 - Beneficio Parceiro Networking]] fica **arquivado** como historico (nao deletado), com nota de topo apontando pra este sucessor.
- Innovate LED (BAI-71, 1a venda com R$ 1.000 off) **continua valida** — aplicou a politica vigente na data da venda; nao retroage.

---

## Justificativa

1. **Realidade early-stage > rigidez canonica.** A buscou.ai tem 0 clientes pagantes em 2026-04-24. Recusar vendas por nao-conformidade a canonico e autolesao. Preservar ancora publica + permitir flexibilidade privada resolve a tensao.

2. **Separacao clara entre ancora publica e negociacao privada.** A ancora publica (R$ 2.500 / R$ 3.000) comunica valor. A negociacao privada ajusta pra realidade do cliente. Isso e pratica padrao B2B consolidada — comercial fala valor cheio, nego da margem quando qualifica.

3. **Infra mensal preserva o ativo estrategico.** Implementacao e transicao; infra e recorrente. Descontar implementacao nao compromete lifetime value — descontar infra sim. Ao proteger infra inegociavelmente, o modelo se mantem saudavel no longo prazo mesmo com implementacoes com desconto alto.

4. **Canal tecnico existe e e trivial.** Stripe tem `promotion_codes` nativo. Habilitar no Checkout e configuracao de 1 flag. Criar cupons no dashboard leva 30 segundos. Custo tecnico marginal.

5. **Formalizacao > informalidade.** O risco nao e descontar — e descontar sem registro. Com Decision Log + obrigatoriedade de tabela de historico, cada desconto fica auditavel e o padrao emerge com clareza pra decisoes futuras.

6. **Unit economics continuam saudaveis ate um piso.** Implementacao com 60% off ainda gera R$ 1.000 de receita bruta one-time + R$ 300/mes recorrente. Com LTV medio estimado de 12-24 meses, unit economics funcionam — desde que o custo de aquisicao (CAC) seja controlado.

---

## Trade-offs

### Ganhamos

- **Flexibilidade total de venda em early-stage.** Dono decide caso a caso sem bloqueio canonico.
- **Velocidade de fechamento.** Cliente que chega com restricao orcamentaria fecha com desconto em vez de virar "quase-venda perdida".
- **Preservacao de LTV.** Infra mensal continua inegociavel — o ativo recorrente esta protegido.
- **Ancora publica preservada.** Landing, redes, material publico continuam mostrando R$ 2.500 / R$ 3.000 — ancora de valor intacta.
- **Aprendizado de mercado.** Histograma de descontos aplicados vira dado sobre o quanto o mercado esta disposto a pagar — input valioso pra futuro re-pricing.

### Perdemos

- **Rigidez do "R$ 2.500 sem excecao" como arma comercial.** Era retorica util ("nao negocio"); agora e retorica parcial ("infra nao negocia").
- **Simplicidade cognitiva.** Antes: 1 preco, 1 excecao. Agora: 1 preco publico + negociacao privada caso a caso.
- **Previsibilidade de receita media por cliente.** Cada venda pode ter ticket diferente — medias ponderadas substituem medias fixas.

### Riscos

- **Erosao por volume.** Descontos viram default silencioso e ancora publica deixa de ser real.
  - **Mitigacao:** monitoramento mensal do ticket medio; sinal de alerta em desvio >40% por 3 meses; gatilho obrigatorio pra novo Decision Log.
- **Cliente descobrir que outro pagou menos e ficar insatisfeito.**
  - **Mitigacao:** cada cupom e emitido com codigo nominal e nao e exposto publicamente. Se perguntarem "outro cliente me falou que pagou X", resposta canonica: "o preco publico e R$ 2.500 / R$ 3.000. Negociacoes acontecem caso a caso dentro de reuniao, com criterios que nao divulgo externamente."
- **Pressao recorrente por desconto em cada venda.**
  - **Mitigacao:** negociar so com cliente qualificado (ICP bate, intencao de compra clara). Nao ofertar desconto proativamente — cliente pede, dono avalia.
- **Desconfiguracao de percepcao de valor.**
  - **Mitigacao:** desconto nunca vira argumento de venda ("nossa tecnologia custa X, mas hoje com cupom Y"). A venda continua sendo de valor; desconto so entra como fechamento de barreira orcamentaria quando tudo o mais ja esta resolvido.
- **Saida do early-stage sem atualizar politica.**
  - **Mitigacao:** revisao obrigatoria deste Decision Log quando houver **20 clientes pagantes** ou **Q4 2026**, o que vier primeiro. Flexibilidade de early-stage nao vale pra sempre.

---

## Impacto em documentos canonicos

### Alta prioridade — atualizar no mesmo ciclo

1. **[[VERDADE_UNICA_BUSCOU]] §5.3 Descontos e beneficios canonicos** — reescrever completamente pra refletir a nova politica (implementacao negociavel privado + infra inegociavel). Remover a tabela "Parceiro Networking" como categoria separada. Adicionar a regra de "cupom Stripe caso-a-caso" e a nao-exposicao publica.

2. **[[VERDADE_UNICA_BUSCOU]] §1 Alteracoes Nivel 1** — adicionar entrada de 2026-04-24 apontando pra este Decision Log.

3. **[[Oferta Comercial]] §Regras inegociaveis** — reescrever a regra sobre Track 1 ("cobra sempre valor cheio sem cupom publico") pra: "Track 1 cobra valor cheio por padrao. Cupom Stripe pode ser aplicado quando houve negociacao previa em canal privado (Track 2 ou contato 1-a-1)." Manter "infra inegociavel em hipotese nenhuma".

4. **[[Oferta Comercial]] §"Voces dao desconto?"** — reescrever pra refletir a nova politica (negociacao privada caso a caso, sem criterio publico).

5. **[[Oferta Comercial]] §Proposta personalizada — Regra critica** — atualizar o texto que fala do "unico desconto oficializado".

6. **[[Decision Log - 2026-04-24 - Beneficio Parceiro Networking]]** — adicionar nota de topo "REVOGADO por [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]]. Mantido como historico."

7. **[[CLAUDE.md]] raiz** — atualizar "Decision Logs vigentes" adicionando este Decision Log no topo e movendo Parceiro Networking pra nota de "absorvido".

### Baixa prioridade

- Skill [[gerador-proposta-buscou]] — prompt pode ser ajustado futuramente pra aceitar variavel `desconto_implementacao` e renderizar corretamente na proposta. Nao bloqueia este Decision Log.

---

## Impacto tecnico (implementacao)

### Stripe

- Habilitar `allow_promotion_codes: true` na criacao da Checkout Session (parametro do Stripe — ver [API docs](https://docs.stripe.com/api/checkout/sessions/create)).
- Criar cupons no Stripe Dashboard conforme demanda (sem bulk creation upfront).
- Padrao de nome: `<CLIENTE>-<VALOR_OFF>` ou `<CLIENTE>-<ANO>` (ex: `INNOVATE-2026`, `CLIENTE-R1500`).
- Tipo: valor fixo em BRL (`amount_off`), nao percentual — mais auditavel.
- Limite de uso: 1 por padrao (cupom nominal, nao cupom universal).
- Validade: 30 dias por padrao. Renovavel.

### Backend

- Endpoint `/api/checkout` (Track 1) adiciona `allow_promotion_codes: true` ao criar Session.
- Webhook `/api/webhook/stripe` ja processa `checkout.session.completed` — nao precisa mudanca estrutural. O campo `total_details.amount_discount` vira persistido na tabela `compras` pra auditoria.
- Migration SQL: tabela `compras` recebe coluna `amount_discount_cents` (integer, default 0) + coluna `promo_code_used` (text, nullable).

### Landing

- **Nenhuma mudanca visivel.** Preco canonico continua sendo o exibido. A UI do Stripe Checkout exibe naturalmente um campo "Adicionar codigo promocional" quando `allow_promotion_codes` esta habilitado — isso e aceitavel (nao e exposicao de desconto, e apenas permitir cliente que tem codigo usa-lo).

### Registro operacional

- Toda emissao de cupom: issue Linear com label `vendas` + `operacional` descrevendo cliente + valor + motivo + codigo Stripe emitido.
- Aplicacao do cupom (cliente pagou usando): comentario automatico na issue via webhook (futuro V2) ou registro manual na tabela "Historico de aplicacoes" deste Decision Log.

---

## Prazo de cascata

**Alta prioridade (hoje, 2026-04-24):**
- VERDADE_UNICA §1 + §5.3 reescrito.
- Oferta Comercial §Regras inegociaveis + §"Desconto" + §Regra critica reescritos.
- Decision Log Parceiro Networking com nota de topo "revogado".
- CLAUDE.md raiz atualizado.
- Issue Linear umbrella + 4 filhas criadas.

**Media prioridade (ate 2026-04-27 — fim da V1):**
- Implementacao tecnica: `allow_promotion_codes` na Checkout Session (depende BAI-86 em Stripe setup).
- Migration `compras` com campos `amount_discount_cents` + `promo_code_used` (depende BAI-86).

**Baixa prioridade (pos V1):**
- Ajustes em gerador-proposta-buscou pra variavel de desconto.

---

## Nivel desta decisao

**Nivel 1 — INEGOCIAVEL.**

Alteracoes nesta politica (reativacao de limites quantitativos, mudanca do canal de aplicacao, exposicao publica de descontos, mudanca na regra de infra inegociavel) exigem **novo Decision Log datado + aprovacao do dono + cascata em ate 7 dias** (ver [[Governanca - Decisoes Canonicas]]).

---

## Aprovacao

Joao Lucas Ucceli — 2026-04-24.

Contexto da aprovacao:
- Reuniao de venda (cliente nomeado na issue Linear correspondente — nao citado aqui por regra de nao-exposicao privada em canonico).
- Fala literal: *"eu preciso vender, entende? Eu nao vou deixar. Po, e R$ 1.500. Eu sei que e 60% a menos, mas ja e alguma coisa. Eu nao posso ficar sem nada."*

---

## Historico de aplicacoes

Registrar aqui toda aplicacao de cupom de desconto na implementacao.

| Data | Cliente (slug/issue) | Valor off (R$) | Valor pago implementacao (R$) | Codigo Stripe | Issue Linear | Motivo |
|---|---|---|---|---|---|---|
| 2026-04-24 | Innovate LED | 1.000 | 2.000 | (a emitir) | [BAI-71](https://linear.app/joao-lucas-ucceli/issue/BAI-71) | Parceria de networking prévia (aplicacao sob canonico anterior — Parceiro Networking) |
| 2026-04-24 | (cliente nova venda) | 1.500 | 1.000 | (a emitir) | (a criar) | Realidade orcamentaria — 1a aplicacao sob nova politica |

---

## Links cruzados

- [[VERDADE_UNICA_BUSCOU]] — canonico reescrito pela cascata (§5.3 e §1)
- [[Oferta Comercial]] — regras inegociaveis e secao desconto reescritas
- [[Decision Log - 2026-04-24 - Beneficio Parceiro Networking]] — predecessor, revogado
- [[Decision Log - 2026-04-24 - Dual-Track]] — canonico vigente de modelo de venda (dual-track)
- [[Decision Log - 2026-04-23 - Infra Mensal]] — modelo implementacao + infra mensal
- [[Governanca - Decisoes Canonicas]] — processo de alteracao canonica
- [Stripe API - Checkout Sessions](https://docs.stripe.com/api/checkout/sessions/create) — doc oficial `allow_promotion_codes`
- [Stripe API - Promotion Codes](https://docs.stripe.com/api/promotion_codes) — doc oficial
