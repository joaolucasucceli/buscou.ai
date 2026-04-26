---
tipo: estrategia
area: Empresa
tags: [decision-log, canonico, oferta, pricing, icp, timeline, anna-mel, governanca]
atualizado: 2026-04-25
aprovacao: Joao Lucas Ucceli — 2026-04-25 (reuniao com Vitoria, 17:09–18:03)
---

# Decision Log — 2026-04-25 — Pricing + ICP + Timeline + Anna V1 manual

## Contexto

Reuniao Joao + Vitoria (54 min, 25/04/2026 17:09–18:03) revisando o material de estudo `/plano` (37 slides em 4 partes). A reuniao confirmou o material, mas trouxe **10 mudancas canonicas Nivel 1** que afetam pricing, ICP, timeline operacional, escopo da Anna Mel V1, governanca interna e reescrita do registro da primeira venda.

O gatilho foi pratico: Joao + Vitoria tem 8 dias a partir de **segunda-feira 2026-04-27** pra entregar a V1 dos componentes que destravam venda — vao ligar pra clientes em paralelo. As demandas precisam estar no Linear segunda de manha. Antes disso, o canonico precisa estar travado e propagado pra evitar incoerencias entre proposta enviada, copy publico, slide e VERDADE_UNICA.

**Falas literais do dono (registradas):**

> *"R$ 500 por mes, nao vai ser 300. Vai ser 500 porque eu sei que eu tenho cliente que consegue fechar esse valor e se ele chorar eu desco para 300 e ele vai ficar se sentindo bem."* — sobre infra mensal.

> *"E aqui na verdade nao vai ser 2.500 / 3.000. E 3.000 porque o à vista é forma de pagamento então, para deixar simples, implementação 3.000 e infra 500 por mês. E aí sobre a implementação o valor é negociável."* — sobre implementacao.

> *"Uma coisa que tá errada nisso é o seguinte: nao é sete dias o blog do ar, eu acredito que é instantâneo que o blog fica no ar."* — sobre timeline blog.

> *"Aqui uma coisa que eu percebi é o seguinte: a Anna Mel ela fez o processo de pré-call. Eu fiz a reunião, mas em nenhum momento a Anna Mel voltou, ficou 100% manual. Só que tá tudo bem, pode ser. A Anna Mel não precisa confirmar após reunião e a Anna Mel não precisa mandar o link de pagamento automático com desconto. Por enquanto vamos deixar manual: eu fiz a reunião, eu mesmo vou mandar o pdf, vou mandar o cupom, vou mandar o link de pagamento. O cliente vai realizar o pagamento e ele vai receber pela Anna Mel. Aí a Anna Mel faz o onboard, mandando as credenciais, primeiros passos, material de apoio."* — sobre escopo Anna V1.

> *"A gente tava utilizando um conceito de governança de três níveis. Isso aí é um conceito de gestão de tecnologia que eu tava aplicando, mas eu tava percebendo que tava me travando. E aí eu meio que tirei por enquanto."* — sobre governanca.

> *"Mas como eu já falei, eu não quero que a gente armazene informações de clientes fechados por enquanto, dentro do sistema, ainda não é o momento."* — sobre nome do cliente da primeira venda.

> *"Eu acredito que a gente possa mapear também e já colocar é a parte de alimentação, né? Que é muito forte. A alimentação precisa estar bem ranqueado no Google, nas IAs é fundamental."* — sobre ICP +alimentacao.

## Decisao anterior

**Canonica vigente ate este Decision Log** (revogada parcialmente):

- **Pricing:** [[Decision Log - 2026-04-23 - Infra Mensal]] — implementacao R$ 2.500 a vista ou R$ 3.000 em 12x; infra R$ 300/mes inegociavel.
- **Politica de desconto:** [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]] — implementacao negociavel caso-a-caso via cupom; infra inegociavel.
- **Timeline:** [[VERDADE_UNICA_BUSCOU]] §4 — blog no ar em ate 7 dias.
- **ICP primario:** [[VERDADE_UNICA_BUSCOU]] §3 — clinicas, imobiliarias, advogados, servicos locais.
- **Escopo Anna V1.1:** plano sugeria reguas pos-reuniao + Payment Link automatico como parte da V1.1.
- **Governanca:** sistema de 3 niveis (Nivel 1 canonico imutavel sem DL / Nivel 2 alteravel / Nivel 3 livre) aplicado tacitamente em arquivos do vault.
- **Primeira venda registrada:** material citava "Innovate LED — 23/04" como primeira venda fechada.

---

## Nova decisao (canonica — Nivel 1)

### Decisao 1 — Implementacao R$ 3.000 fixo

**Mudanca:** preco unico R$ 3.000, oferecido em duas formas de pagamento (a vista PIX ou 12x R$ 250 cartao). **Negociavel caso-a-caso** via Cupom Stripe em canal privado.

**De:** R$ 2.500 a vista / R$ 3.000 em 12x (duas ancoras).
**Para:** R$ 3.000 fixo (uma ancora, duas formas de pagamento).

**Por que:** simplificar copy e pitch. "Implementacao 3.000, paga a vista ou parcela em 12x" e mais claro do que "2.500 a vista, 3.000 em 12x". Negociacao continua possivel via cupom no Payment Link enviado por WhatsApp.

### Decisao 2 — Infra mensal R$ 500/mes (negociavel ate R$ 300)

**Mudanca:** preco-ancora da infra sobe pra R$ 500/mes. Cliente que negociar pode chegar a R$ 300/mes (piso). Diferente da decisao anterior, infra **passa a ser negociavel**.

**De:** R$ 300/mes inegociavel (passthrough de custo + margem pequena).
**Para:** R$ 500/mes negociavel ate R$ 300/mes (piso). Margem real por cliente com R$ 500 ≈ R$ 450 (custo operacional ~R$ 50). Com piso R$ 300 ≈ R$ 250 de margem.

**Por que (fala do dono):** *"eu sei que eu tenho cliente que consegue fechar esse valor e se ele chorar eu desco para 300 e ele vai ficar se sentindo bem."* Piso de R$ 300 preserva a unit economics original; teto de R$ 500 captura clientes com folga orcamentaria. **Meta operacional:** 300 clientes a R$ 500/mes = R$ 150K MRR.

### Decisao 3 — Politica de desconto estendida (implementacao + infra)

**Mudanca:** infra agora tambem pode ser objeto de cupom. Politica de desconto canonica passa a cobrir ambas as linhas, com regras separadas:

| Linha | Desconto | Como | Limite |
|---|---|---|---|
| Implementacao | Negociavel caso-a-caso | Cupom Stripe no Payment Link | Sem teto formal; piso operacional R$ 1.000 (manter [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]]) |
| Infra mensal | Negociavel caso-a-caso | Cupom Stripe Subscription (se suportar) ou Payment Link separado R$ 300 | Piso R$ 300/mes (60% off do ancora) |

**Aprovador unico:** dono (Joao). Vitoria, Anna Mel ou qualquer outro nao emitem cupom.
**Canal de aplicacao:** privado, pos-reuniao, via WhatsApp pela Anna Mel (V2) ou Joao manual (V1).
**Copy publico:** ancoras R$ 3.000 e R$ 500 sempre; descontos nunca aparecem.

### Decisao 4 — Cupom recorrente Stripe — investigar antes de A-02

**Pendente:** confirmar se Stripe Subscriptions aceita `promotion_codes` em Payment Link recorrente. Tres cenarios:

- **Cenario A (preferido):** Stripe suporta. Um Payment Link unico cobre a implementacao (one-time R$ 3.000 com cupom opcional) + assinatura (R$ 500/mes com cupom opcional). Anna Mel envia 1 link por cliente.
- **Cenario B:** Stripe nao suporta cupom em Subscription via Payment Link. Solucao: **2 Payment Links separados**, um para R$ 500/mes e outro para R$ 300/mes. Anna Mel manda o que combinou com cliente.
- **Cenario C:** Stripe suporta mas com restricoes (ex: cupom valido so na primeira fatura). Avaliar caso a caso.

**Acao:** investigar via context7 ou doc Stripe direta antes de comecar Sprint A-02 (Pagamento + Onboarding). Atualizar este Decision Log com resultado na secao "Cupom recorrente — investigacao Stripe" abaixo.

### Decisao 5 — ICP primario inclui alimentacao

**Mudanca:** restaurantes / negocios de alimentacao sobem pro ICP primario.

**De:** clinicas (odonto, esteticas, medicas, veterinarias), imobiliarias, advogados, servicos locais (contabilidade, marketing, consultoria, assistencia tecnica, reformas).
**Para:** as mesmas categorias **+ alimentacao** (restaurantes, padarias, hamburguerias, comidas tipicas regionais, food trucks com presenca digital).

**Por que (fala do dono):** *"a alimentacao precisa estar bem ranqueado no Google, nas IAs e fundamental."* Volume alto de buscas locais ("melhor restaurante perto de mim", "delivery de pizza X"), AI Overviews ja respondem essas queries — fit perfeito de SEO + AIO.

**Em copy publica:** continuar listando exemplos representativos (clinicas + imobiliarias + advogados + alimentacao + servicos locais), sem virar lista exaustiva.

### Decisao 6 — Timeline: blog instantaneo apos onboarding

**Mudanca:** SLA de "blog no ar em ≤ 7 dias" passa a "blog ativado no mesmo dia em que o cliente conclui o onboarding".

**De (canonico antigo):** "Em ate 7 dias: blog no ar, identidade aplicada, estrutura SEO+AIO, motor ativo."
**Para (canonico novo):** "Apos cliente concluir o wizard de onboarding (5 passos: dominio, nicho, tom, concorrentes, GSC), o blog e ativado automaticamente no mesmo dia. **Primeiro lote de artigos publicado em 24-48h** apos ativacao. Primeiros sinais (impressoes, indexacao) em ate 30 dias mantem-se."

**Por que (fala do dono):** *"Eu acredito que e instantaneo que o blog fica no ar."* O motor (multi-tenant) ja esta pronto; nao tem trabalho manual de "montar blog do cliente". O onboarding alimenta o Estrategista que monta o calendario, e a partir do calendario aprovado os artigos comecam a publicar imediatamente.

**Implicacao operacional:** o gargalo nao e o blog (instantaneo), e o **wizard concluido pelo cliente** + **revisao/aprovacao do calendario inicial pelo cliente**. SLA real do "blog publicando" depende da agilidade do cliente em concluir esses dois passos.

### Decisao 7 — Escopo Anna Mel V1 confirmado (manual onde faz sentido)

**Mudanca:** confirmar com clareza o que e Anna V1 ✓ (automatico) vs V1 manual (Joao). Algumas etapas ficam intencionalmente manuais por enquanto, **nao porque a tecnologia nao suporta, mas porque o dono prefere o toque humano em momentos de fechamento de venda**. Pos-V1.1, decidir o que automatiza.

**Mapa canonico V1:**

| Etapa | Operador V1 | Operador alvo V1.1+ |
|---|---|---|
| Lead inbound (WhatsApp recebe lead novo) | **Anna ✓** | Anna |
| Pre-call: confirmacao de agendamento + lembrete D-1 + material de apoio | **Anna ✓** | Anna |
| Reuniao 30 min | Joao + Vitoria | Joao + Vitoria (humano sempre) |
| Pos-reuniao: confirmacao "proposta em 24h" | **Manual (Joao)** | Anna |
| Envio da proposta PDF | **Manual (Joao)** | Anna |
| Cadencia D+1 / D+3 / D+7 fechamento | **Manual (Joao)** | Anna |
| Negociacao (cupom) | **Manual (Joao)** | Joao (sempre — aprovador unico) |
| Envio Payment Link Stripe | **Manual (Joao)** | Anna |
| Confirmacao do pagamento (webhook Stripe) | Sistema | Sistema |
| Boas-vindas + credenciais painel | **Anna ✓** | Anna |
| Onboarding wizard (acompanhamento) | **Anna ✓** | Anna |
| Blog ativado + primeiro lote publicado | Sistema | Sistema |
| Regua infra D-3 / D0 / D+3 / D+7 (mensal a partir do mes 2) | **Anna ✓** | Anna |
| Suporte sob demanda | **Anna ✓** | Anna |

**Por que manual no fechamento V1:** transcricao do dono *"a Anna Mel nao precisa confirmar apos reuniao e a Anna Mel nao precisa mandar o link de pagamento automatico com desconto. Por enquanto vamos deixar manual."* O fechamento e o momento mais sensivel da venda — cupom, valor real, expectativa do cliente. Manter manual ate o playbook estar 100% maduro.

### Decisao 8 — Sistema de governanca 3-niveis pausado

**Mudanca:** o conceito de governanca em 3 niveis (Nivel 1 canonico imutavel sem DL / Nivel 2 alteravel via DL leve / Nivel 3 livre) que vinha sendo aplicado no vault foi **removido temporariamente**.

**Por que (fala do dono):** *"isso daí é um conceito de gestão de tecnologia que eu tava aplicando, mas eu tava percebendo que tava me travando. Porque ela falava 'cara, mas voce tinha dito isso, mas tinha dito aquilo'. Como nui [hoje] a gente no futuro vai ser otimo porque ela [a governanca] nao deixa a gente meio que sair do que voce tinha planejado, mas agora ta travando o projeto."*

**O que substitui:** log de decisao simples (este formato de Decision Log datado, sem categorizar em N1/N2/N3). Quando alguma coisa importante muda, escreve um Decision Log novo, atualiza VERDADE_UNICA, propaga em 7 dias.

**Quando volta:** quando o produto V1 estiver fechado e a empresa em fase de operacao em escala. Em fase de bootstrap o overhead de governanca formal estava custando velocidade.

### Decisao 9 — Primeira venda real fechada (sem nome no sistema)

**Mudanca:** o material citava "Innovate LED — 23/04" como primeira venda fechada. **Estava errado** — Innovate LED foi reuniao que **nao fechou**. A primeira venda real e o **Rodrigo**.

**Politica:** **nao armazenar nome de cliente em sistema (vault, code, slide, plano publico)** ate o dono autorizar.

**Por que (fala do dono):** *"Mas como eu ja falei, eu nao quero que a gente armazene informacoes de clientes fechados por enquanto, dentro do sistema, ainda nao e o momento."* Privacidade do cliente + foco em montar o produto antes de criar CRM mental.

**Implicacao:** issues, slides, decision logs, vault — todos referem a "primeira venda real fechada" sem nominar. Status de deal mora em Linear issue da umbrella de venda especifica do cliente; vault permanece sem CRM mental.

### Decisao 10 — Skill `gerador-proposta-buscou` distribuida (Vitoria tambem)

**Mudanca:** skill ate hoje so disponivel pro Joao (user-scope, em `~/.claude/skills/gerador-proposta-buscou/`) **passa a ser usada tambem pela Vitoria**.

**Como:**
- Vitoria instala a skill local dela em `~/.claude/skills/gerador-proposta-buscou/` (mesmo path).
- Joao compartilha o conteudo do `SKILL.md` + template em `prototipos/template-proposta-buscou/`.
- Documentar passo-a-passo em `base-de-conhecimento/10 - Go To Market/Skill - gerador-proposta-buscou - como instalar.md` (criar arquivo).

**Por que:** Vitoria conduz reunioes e fecha vendas tambem. Atrelar skill a uma so pessoa e ponto unico de falha.

---

## Cupom recorrente — investigacao Stripe (CONCLUIDA 2026-04-25)

> Investigacao completa via context7 (`mcp__context7__query-docs` em `/websites/stripe`). **Cenario A confirmado** — Stripe suporta 1 Payment Link unico cobrindo implementacao one-time + infra recurring com cupons separados por produto.

### Achados

- [x] **Stripe Payment Links suporta `allow_promotion_codes: true` em mode subscription.** Cliente digita codigo de cupom no checkout hospedado.
- [x] **Cupom em subscription tem 3 modos de duracao** — `once` (so primeira fatura), `forever` (todas as faturas recorrentes pra sempre), `repeating` (por X meses via `duration_in_months`).
- [x] **Implementacao + Subscription no mesmo Payment Link e suportado** — `mode: subscription` com `line_items: [price_one_time, price_recurring]` (ate 20 line_items por link).
- [x] **Cupom pode aplicar a produtos especificos** via `applies_to: { products: [PRODUCT_ID] }` — permite descontar so a implementacao, so a infra, ou ambos.

### Implementacao canonica adotada (Cenario A)

**Setup pontual no Stripe:**
1. **2 Products + 2 Prices canonicos:**
   - Product `prod_implementacao` + Price `price_implementacao` (one-time, R$ 3.000).
   - Product `prod_infra_mensal` + Price `price_infra_mensal` (recurring monthly, R$ 500/mes).
2. **1 Payment Link unico** `mode: subscription` com `line_items: [price_implementacao, price_infra_mensal]` + `allow_promotion_codes: true`. Esse link e o canal canonico de pagamento de qualquer cliente novo.
3. **Cupons emitidos caso-a-caso pelo dono** (apos negociacao em reuniao):
   - **Cupom implementacao** — `amount_off` em centavos, `currency: brl`, `duration: once`, `applies_to: { products: [prod_implementacao] }`. Ex: cliente fechou em R$ 1.500 (piso R$ 1.000 nao atingido) → cupom de R$ 1.500 off (`amount_off: 150000`).
   - **Cupom infra** — `amount_off`, `currency: brl`, `duration: forever`, `applies_to: { products: [prod_infra_mensal] }`. Ex: cliente fechou em R$ 350/mes → cupom de R$ 150 off forever (`amount_off: 15000`).
   - Cupons sao independentes — pode aplicar so um, so o outro, ou os dois no mesmo Payment Link.

**Fluxo operacional:**
1. Joao gera/identifica cupons no Stripe Dashboard (1 cupom de implementacao + 0 ou 1 cupom de infra).
2. Anna Mel envia o **Payment Link unico** via WhatsApp (mesma URL pra todos os clientes) + os codigos de cupom emitidos (ex: "ANCORA-1500-AVL" + "INFRA-FOREVER-150").
3. Cliente abre o Payment Link, digita os codigos no campo "Codigo promocional", valor cai instantaneamente.
4. Webhook `checkout.session.completed` registra os cupons usados em `compras.promo_code_used` (BAI-118).

### Vantagens deste design

- **1 link canonico** — Anna Mel nao precisa gerar Payment Link novo por cliente. Mesma URL sempre.
- **Cupom forever** preserva o desconto em todas as cobrancas mensais — cliente nao "perde" o R$ 300/mes apos o primeiro mes.
- **`applies_to`** garante que cupom de implementacao nao zera infra (ou vice-versa) por engano.
- **Auditavel** — toda emissao de cupom fica registrada no Stripe Dashboard + Linear issue (regra DoD da Politica de Desconto Implementacao).

### Acao desbloqueada

Sprint **A-02 (Pagamento + Onboarding cliente)** pode prosseguir sem bloqueio. Setup canonico Stripe (2 Products + 2 Prices + 1 Payment Link) entra como tarefa de Banco/Backend dentro da sprint.

---

## O que NAO muda

- **Posicionamento "Se alguem buscou, quem apareceu foi voce?"** — frase central inegociavel.
- **Produto** — blog (estrutura) + motor (90 conteudos/mes, ~720K caracteres). Volume nao muda.
- **Fluxo unico consultivo** — landing nao tem checkout publico, nao expoe preco. Mantido [[Decision Log - 2026-04-24 - Reversao Track 1]].
- **Stripe como gateway** — continua. Muda forma do Payment Link (com ou sem cupom recorrente, dependendo de Decisao 4).
- **Governanca de Decision Logs** — continua usando este formato; o que pausou foi o sistema de classificacao em 3 niveis aplicado no resto do vault.
- **VPS Anna Mel + UAZapi + Cal.com API** — infra Anna V1 continua igual; o que muda e o **escopo do que ela faz no fluxo de venda** (Decisao 7).

---

## Cascata obrigatoria (em 7 dias — ate 2026-05-02)

| Arquivo | Mudancas | Responsavel |
|---|---|---|
| [[VERDADE_UNICA_BUSCOU]] §3, §4, §5.1, §5.2, §5.3, §6, §8 + header | Decisoes 1, 2, 3, 5, 6, 7 | Joao |
| [[Decision Log - 2026-04-23 - Infra Mensal]] | Nota: revogado parcialmente por Decisoes 1+2+3 | Joao |
| [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]] | Nota: estendido por Decisao 3 (infra agora negociavel ate R$ 300) | Joao |
| `~/.claude/skills/gerador-proposta-buscou/SKILL.md` | Atualizar precos canonicos R$ 3.000 + R$ 500; regra de cupom infra | Joao |
| `prototipos/template-proposta-buscou/index.html` | Placeholders + valores default | Joao |
| `CLAUDE.md` (raiz do projeto) | Header "Descricao" + secao "Inegociavel Nivel 1" | Joao |
| `site/public/plano.html` slides 6, 7, 8, 9, 11, 13, 14, 18, 25 | Decisoes 5, 6, 1+2+3, 7, 8, 9 | Joao |
| `base-de-conhecimento/10 - Go To Market/Skill - gerador-proposta-buscou - como instalar.md` (criar) | Decisao 10 | Joao |
| Linear: 16 sprints + 48 sub-issues recadastradas | Recadastro com lastro completo | Joao + Vitoria |

---

## Trade-offs aceitos

- **Pricing publico mais alto pode afastar lead borderline.** Aceito — o ICP primario (negocios locais com ticket medio razoavel) absorve R$ 500. Lead que nao absorve negocia ate R$ 300, ainda dentro do unit economics original.
- **Governanca pausada perde trilhas de auditoria curta.** Aceito — Decision Logs datados continuam sendo o mecanismo principal. Quando produto estabilizar, governanca volta de forma mais leve.
- **Sem nome de cliente no sistema dificulta CRM futuro.** Aceito — autorizado pelo dono. Quando virar momento (escala, time crescendo), abrir Decision Log especifico permitindo armazenamento.
- **Manual no fechamento V1 limita escala.** Aceito — playbook nao esta maduro. Joao prefere errar menos com manual a errar mais com automacao prematura.
- **Cupom recorrente pendente bloqueia Sprint A-02.** Aceito — investigacao tecnica e curta (1h via context7); fica como tarefa bloqueante explicita.

---

## Historico de aprovacao

| Data | Quem | Acao |
|---|---|---|
| 2026-04-25 17:09–18:03 | Joao + Vitoria | Reuniao de revisao do plano /plano + decisoes 1–10 verbalmente aprovadas. |
| 2026-04-25 (pos-reuniao) | Joao | Aprovado por escrito via comando para registrar este Decision Log. |

---

## Links cruzados

- [[VERDADE_UNICA_BUSCOU]] — fonte unica da verdade (atualizada apos este DL).
- [[Decision Log - 2026-04-23 - Infra Mensal]] — pricing antigo (revogado parcialmente).
- [[Decision Log - 2026-04-24 - Reversao Track 1]] — fluxo unico consultivo (continua valido).
- [[Decision Log - 2026-04-24 - Politica de Desconto Implementacao]] — politica de desconto (estendida por este DL).
- [[Anna Mel - V1 OpenClaw]] — arquitetura tecnica do agente em producao.
- [[gerador-proposta-buscou]] — skill que consome estes precos.
