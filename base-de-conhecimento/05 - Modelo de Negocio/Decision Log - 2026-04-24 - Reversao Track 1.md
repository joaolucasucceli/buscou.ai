---
tipo: estrategia
area: Empresa
tags: [decision-log, canonico, oferta, fluxo-venda, dual-track, reversao]
atualizado: 2026-04-24
aprovacao: Joao Lucas Ucceli — 2026-04-24 (noite)
---

# Decision Log — 2026-04-24 (noite) — Reversao Track 1 Self-Service

## Contexto

Este e o **terceiro Decision Log Nivel 1 de 2026-04-24**, escrito no fim do dia apos reflexao do dono. A sequencia de decisoes do dia:

1. **Manha** — [[Decision Log - 2026-04-24 - Dual-Track]] — canonico vira **dual-track**: Track 1 self-service Stripe Checkout na landing (preco exposto) + Track 2 consultivo via Cal.com. Revoga o pivot "consultivo puro" de 2026-04-23.
2. **Tarde** — [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]] — implementacao passa a ser **negociavel caso-a-caso via Cupom Stripe** em canal privado; infra inegociavel. Limite trimestral de 3 aplicacoes (Parceiro Networking) revogado.
3. **Noite** — **este Decision Log** — **reversao da parte Track 1** do Dual-Track.

Durante a validacao visual de [BAI-83](https://linear.app/joao-lucas-ucceli/issue/BAI-83) (higiene da landing), o dono refletiu sobre a incoerencia de expor preco na landing dadas as variacoes via cupom que a Politica de Desconto agora permite.

**Fala literal do dono, registrada literalmente:**

> *"Eu parei para refletir e deixar o preco na pagina de venda, ainda mais com essas variacoes que nos estamos tendo e tal, nao e o ideal. Eu vou voltar atras na minha decisao, ta aprovado isso. Eu sei que esta contradizendo algumas coisas, mas ta tudo bem. Nos nao teremos preco na pagina de venda. O link de pagamento sera enviado via WhatsApp. Entende? Pos-reuniao. A Anna Mel mesmo, pos-reuniao, quando a pessoa confirma, ela manda o link de pagamento, tudo bonitinho no WhatsApp. Nao vai ficar na pagina, eu discordo. Estou mudando minha decisao."*

**Motivo central:** variacao publica de preco (R$ 2.500 canonico) vs valores reais praticados (R$ 1.000 / R$ 1.500 / R$ 2.000 com cupom) quebra a credibilidade da ancora. Cliente que chega pelo organico ve R$ 2.500; cliente que passa por reuniao pode fechar em R$ 1.000. Essa dissonancia e pior do que nao expor preco.

Alem disso, o controle de qualificacao feito pela reuniao consultiva e perdido no Track 1 (cliente compra sem conversa — potencialmente fora de ICP, sem contexto do produto, sem expectativa ajustada).

## Decisao anterior

**Canonica vigente ate agora** (revogada parcialmente por este Decision Log):

[[Decision Log - 2026-04-24 - Dual-Track]]:

> **Track 1 (Self-service):** landing expoe preco publico + botao "Comprar agora" + Stripe Checkout one-time (PIX R$ 2.500 a vista ou cartao 12x R$ 3.000). Onboarding disparado automaticamente via Anna Mel (V2) ou Joao/Vitoria (V1 manual).
>
> **Track 2 (Consultivo):** landing tem "Agendar diagnostico" + formulario + Cal.com embed + confirmacao Uazapi + reuniao de 30 min + proposta escrita em 24h.
>
> Cliente escolhe qual fluxo entrar. Ambos CTAs convivem com peso visual equivalente.

[[VERDADE_UNICA_BUSCOU]] §8 e §6 escritos na manha de hoje permitiam checkout direto na landing.

[[Oferta Comercial]] §Regras inegociaveis escrito na tarde de hoje dizia: *"Landing expoe preco publico. Nao ha mais regra 'nao expor preco' — regra revogada em Decision Log Dual-Track."*

---

## Nova decisao (canonica — Nivel 1)

### Fluxo unico consultivo + pagamento via WhatsApp pos-reuniao

A partir de **2026-04-24 (noite)**, o canonico vigente passa a ser:

1. **Landing nao expoe preco em lugar nenhum.** Zero mencao a R$ 2.500, R$ 3.000, R$ 300/mes, ou qualquer outro valor financeiro em copy publico da landing. Inclui:
   - Hero e sub-ctas.
   - Secao de "quanto custa" — FAQ redireciona pra reuniao, sem numeros.
   - Final-cta e qualquer outro elemento.
   - Redes sociais, email marketing, anuncios e qualquer material publico seguem a mesma regra.

2. **Landing tem CTA unico de conversao: "Agendar diagnostico".** Header, hero, final-cta, todos apontam pro mesmo fluxo de agendamento (Cal.com, via BAI-87).

3. **Nao existe mais "Track 1 self-service" na landing.** O fluxo de compra direta via Stripe Checkout publico na landing foi **revogado**. Nao ha botao "Comprar agora" na landing. Nao ha `/api/checkout` publico servindo landing. Nao ha preco no hero.

4. **Pagamento e feito via WhatsApp pos-reuniao**, atraves de **Payment Link do Stripe** enviado pela Anna Mel (ou pelo dono/Vitoria em V1 manual ate BAI-49 Fase 3 operante):
   - Cliente agenda diagnostico na landing.
   - Reuniao acontece (30 min, Cal.com + Google Meet).
   - Dono envia proposta personalizada em ate 24h ([[gerador-proposta-buscou]]).
   - Se cliente aceita, a Anna Mel (ou dono em V1 manual) envia o **Payment Link do Stripe via WhatsApp** com o valor acertado (com cupom aplicado, se houve negociacao).
   - Cliente paga pelo link.
   - Webhook Stripe dispara onboarding.

5. **Politica de Desconto preservada.** O canonico [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]] continua valido — implementacao e negociavel caso-a-caso, infra inegociavel. **O que muda e o canal de aplicacao**: cupom e aplicado no Payment Link enviado por WhatsApp, nao em Stripe Checkout publico.

6. **Tracking e BAI-118 preservados.** O campo `compras.amount_discount_cents` + `compras.promo_code_used` continua necessario — webhook `checkout.session.completed` processa Payment Link da mesma forma que processaria Checkout publico.

### O que NAO muda

- **Precos canonicos (R$ 2.500 / R$ 3.000 em 12x / R$ 300/mes)** — seguem exatamente iguais. So nao sao publicos na landing.
- **Politica de Desconto** — continua valida, cupom continua sendo emitido pelo dono caso-a-caso.
- **Cal.com + Uazapi** (BAI-87) — fluxo de agendamento intacto.
- **Stripe como meio de pagamento** — continua sendo Stripe. Muda o canal de exposicao (Payment Link direto via WhatsApp em vez de Checkout publico).
- **Onboarding pos-pagamento** — continua igual.
- **BAI-118 (schema compras)** — continua necessario.
- **Venda Innovate LED (BAI-71)** — continua valida, aplicou canonico vigente na data.

### O que muda

- **Track 1 self-service na landing** — revogado.
- **Preco publico na landing** — revogado (volta a "nao expor").
- **`/api/checkout` publico** — nao existe no canonico.
- **Card de preco + CTA "Comprar agora"** na landing — canceladas.

---

## Justificativa

1. **Ancora publica instavel quebra confianca.** Expor R$ 2.500 enquanto vendas reais fecham em R$ 1.000 gera percepcao de "preco inflado". Cliente que compra direto paga "cheio" e descobre dias depois via networking que outro pagou a metade. Canonicamente destrutivo.

2. **Politica de Desconto exige canal privado.** O proprio Decision Log da tarde (Politica de Desconto) diz: *"Desconto e aplicado em canal privado apos negociacao com o dono. Nao aparece em copy publico."* Track 1 self-service contraria isso — cliente nao passa por negociacao privada antes de ver o valor.

3. **ICP primario prefere conversa.** Negocios locais (clinicas, imobiliarias, advogados) sao menos acostumados a comprar digital high-ticket sem reuniao. Self-service funciona melhor pra e-commerces e infoprodutores — que nao sao ICP primario.

4. **Qualificacao consultiva tem valor.** A reuniao filtra leads fora de ICP + ajusta expectativa + cria vinculo. Vender sem reuniao aumenta taxa de cancelamento pos-compra e reduz satisfacao.

5. **Reduz complexidade tecnica.** Sem Track 1 publico, a pilha tecnica simplifica: nao precisa de `/api/checkout` publico, nao precisa de "Comprar agora" + modal + formulario lead-less. Payment Link do Stripe cobre o caso de uso real (pagamento pos-qualificacao) com menos codigo.

6. **Compatibilidade com Anna Mel.** BAI-49 Anna Mel ja esta planejada pra fazer confirmacao pos-reuniao + envio de link de pagamento. Adiciona **um passo natural ao fluxo dela**, sem exigir infra nova de checkout publico.

---

## Trade-offs

### Ganhamos

- **Ancora publica estavel.** Nenhum cliente ve R$ 2.500 no publico e depois paga R$ 1.000 — porque nao ve nada.
- **Filtro de qualificacao preservado.** Todo cliente pagante passou por reuniao.
- **Consistencia com Politica de Desconto.** Canal privado pra desconto bate com canal privado pra preco.
- **Simplicidade tecnica.** Menos codigo, menos endpoints, menos superficie de bug.
- **Anna Mel ganha escopo natural.** Enviar Payment Link vira passo canonico do fluxo dela.

### Perdemos

- **Conversao 24/7 self-service.** Cliente que ja estava decidido as 2h da manha nao tem caminho pra pagar sem esperar reuniao.
- **Volume teorico.** Dual-track aumentaria volume pra e-commerces / infoprodutores (segmento secundario) — perdido com essa reversao.
- **Canal publico "compra direta"** — ferramenta de marketing perdida (poderia ser usada em anuncio "compre agora" em low-funnel).

### Riscos

- **Cliente decidido desiste por nao ter caminho rapido.**
  - Mitigacao: agendamento via Cal.com e rapido (30-60 min ate proxima disponibilidade); Anna Mel pode enviar Payment Link em minutos se cliente ja estiver decidido pelo WhatsApp; fluxo continua rapido mesmo sem self-service.
- **Inconsistencia canonica por ter 3 Decision Logs Nivel 1 no mesmo dia.**
  - Mitigacao: este Decision Log deixa a sequencia cronologica explicita; cascata nos arquivos canonicos aponta pra Decision Log correto; futuros leitores tem rastreabilidade.
- **Pressao por self-service conforme escala.**
  - Mitigacao: revisao obrigatoria deste canonico quando atingir 20 clientes pagantes ou Q4 2026 (mesma janela da Politica de Desconto). Se volume justificar, abre-se Decision Log de re-evolucao.

---

## Impacto em documentos canonicos

### Alta prioridade — hoje (2026-04-24 noite)

1. **[[VERDADE_UNICA_BUSCOU]] §1 (ultimas alteracoes Nivel 1)** — adicionar entrada de 2026-04-24 noite apontando pra este Decision Log e marcando Dual-Track como **parcialmente revogado** (Track 1 removido; dual-track nominal vira single-track consultivo).

2. **[[VERDADE_UNICA_BUSCOU]] §6 (termos proibidos)** — readicionar `"checkout direto na landing"` como PROIBIDO.

3. **[[VERDADE_UNICA_BUSCOU]] §8 (fluxo de venda)** — reescrever como **fluxo unico consultivo**:
   - Cliente chega na landing.
   - Clica "Agendar diagnostico".
   - Agenda no Cal.com.
   - Reuniao acontece.
   - Proposta enviada em 24h.
   - Cliente aceita → Anna Mel envia Payment Link via WhatsApp.
   - Cliente paga → webhook dispara onboarding.

4. **[[Oferta Comercial]] §"O que voce vende"** — remover mencao a "comprar direto R$ 2.500 a vista ou R$ 3.000 em 12x". Fluxo vira unico consultivo.

5. **[[Oferta Comercial]] §Dual-track** — remover Track 1. Secao vira apenas descricao do fluxo consultivo.

6. **[[Oferta Comercial]] §Fluxo de venda** — unificar em fluxo unico (Track 2 passa a ser o unico). Adicionar passo "Anna Mel envia Payment Link via WhatsApp pos-aceite".

7. **[[Oferta Comercial]] §Regras inegociaveis** — readicionar `"Nao expor preco na landing"`. Manter regra da Politica de Desconto (cupom segue caso-a-caso, aplicado em canal privado via Payment Link).

8. **[[CLAUDE.md]] raiz — Decision Logs vigentes** — adicionar este Decision Log no topo. Marcar Dual-Track como parcialmente revogado.

9. **[[CLAUDE.md]] raiz — Inegociavel Nivel 1 §Fluxo de venda** — reescrever como fluxo unico consultivo + Payment Link via WhatsApp.

### Media prioridade — ate 2026-04-27

- **Issues Linear abertas** (BAI-86 setup Stripe, BAI-117 allow_promotion_codes, BAI-114 umbrella Cupons) — comentarios + ajuste de description refletindo re-scope (Payment Link em vez de `/api/checkout` publico).
- **BAI-89 (cascata dual-track original)** — comentario `[Marco]` + decisao sobre aprovar como esta (historico) vs cancelar.

### Baixa prioridade

- Skill [[gerador-proposta-buscou]] — prompt ja aceita variavel de desconto; adicionar nota no SKILL.md de que o Payment Link enviado via WhatsApp e o canal oficial pos-proposta. Nao bloqueia.

---

## Impacto tecnico (implementacao)

### Stripe

- **Payment Links** passam a ser o canal principal de cobranca:
  - Podem ser criados manualmente no Dashboard (V1 manual — dono/Vitoria cria e copia URL).
  - Ou via API `stripe.paymentLinks.create()` em endpoint admin interno (V2).
  - Sao URLs estaticas do tipo `https://buy.stripe.com/...` — Stripe hosted, sem necessidade de dominio proprio.
  - Suportam `allow_promotion_codes` nativamente (cupom pode ser aplicado pelo cliente na pagina hospedada pelo Stripe).

- **`/api/checkout` publico** — **nao faz mais parte do canonico V1**. Se for implementado no futuro, seria admin-only pra gerar Payment Links via API.

### Landing

- **Remove qualquer valor em R$.**
- **CTA unico de conversao**: "Agendar diagnostico" em header, hero, final-cta.
- **FAQ "Quanto custa?"**: redireciona pra reuniao sem numeros.
- **Sem botao "Comprar agora"** em lugar algum.

### Webhook Stripe

- **Continua valido** — `checkout.session.completed` e acionado tanto por Payment Link quanto por Checkout publico. Mesma logica de promocao lead→cliente + criacao de organizacao funciona.

### Schema Supabase

- **BAI-118 (`compras.amount_discount_cents` + `promo_code_used`)** — **continua necessario**. Webhook persiste desconto independente do canal.

---

## Prazo de cascata

**Alta prioridade (hoje, 2026-04-24 noite):**
- VERDADE_UNICA §1 + §6 + §8.
- Oferta Comercial (5 blocos).
- CLAUDE.md raiz.
- Ajuste da landing (hero sub-ctas + FAQ).
- Commit + push.

**Media prioridade (ate 2026-04-27):**
- Comentarios e ajuste de description em BAI-86, BAI-117, BAI-114.
- Decisao sobre BAI-89.

---

## Nivel desta decisao

**Nivel 1 — INEGOCIAVEL.**

Alteracoes nesta reversao (re-adocao de Track 1 self-service, exposicao de preco na landing, checkout direto publico) exigem **novo Decision Log datado + aprovacao do dono + cascata em ate 7 dias** (ver [[Governanca - Decisoes Canonicas]]).

**Gatilho de reavaliacao automatica:** 20 clientes pagantes ou Q4 2026 (o que vier primeiro). Nesse ponto, reavaliar se faz sentido reabrir self-service como canal complementar.

---

## Aprovacao

Joao Lucas Ucceli — 2026-04-24 (noite).

Contexto: validacao da landing [BAI-83](https://linear.app/joao-lucas-ucceli/issue/BAI-83), apos reflexao sobre inconsistencia entre ancora publica canonica e valores reais praticados via Politica de Desconto de Implementacao (mesma data, tarde).

Fala literal transcrita no **Contexto** desta decisao acima.

---

## Nota historica

Este Decision Log e o terceiro Nivel 1 em sequencia no mesmo dia. A ordem cronologica:

| Horario | Decision Log | Escopo |
|---|---|---|
| Manha | [[Decision Log - 2026-04-24 - Dual-Track]] | Introduzia Track 1 self-service + Track 2 consultivo |
| Tarde | [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]] | Cupons Stripe caso-a-caso; implementacao negociavel |
| Noite | **Este Decision Log** | Revoga Track 1 self-service; volta a fluxo unico consultivo |

O Dual-Track **nao foi inteiramente revogado**: Track 2 (consultivo) continua valido e e agora o fluxo unico. So a parte "Track 1 self-service" foi removida.

A Politica de Desconto permanece **inteiramente valida** — cupons seguem sendo aplicados caso-a-caso. So muda o canal de aplicacao (Payment Link via WhatsApp, nao Checkout publico).

Iteracao rapida e parte do early-stage. A documentacao canonica e quem mantem a sanidade — cada decisao esta registrada, datada, justificada, com trade-offs explicitos. O vault honra o principio de **"toda alteracao Nivel 1 e auditavel"**.

---

## Links cruzados

- [[VERDADE_UNICA_BUSCOU]] — canonico reescrito pela cascata (§1, §6, §8)
- [[Oferta Comercial]] — 5 blocos reescritos
- [[Decision Log - 2026-04-24 - Dual-Track]] — predecessor parcialmente revogado
- [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]] — canonico preservado, canal de aplicacao ajustado
- [[Decision Log - 2026-04-23 - Infra Mensal]] — modelo implementacao + infra mensal (inalterado)
- [[Governanca - Decisoes Canonicas]] — processo de alteracao canonica
- [Stripe API - Payment Links](https://docs.stripe.com/api/payment_links/payment_links) — doc oficial
