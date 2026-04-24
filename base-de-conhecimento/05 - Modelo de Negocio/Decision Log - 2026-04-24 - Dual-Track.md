---
tipo: estrategia
area: Empresa
tags: [decision-log, canonico, vendas, processo, dual-track, self-service, stripe, agendamento, anna-mel]
atualizado: 2026-04-24
aprovacao: Joao Lucas Ucceli — 2026-04-24 (pendente assinatura)
nivel: 1
substitui: [[Decision Log - 2026-04-23 - Venda Consultiva]]
nao-afeta: [[Decision Log - 2026-04-23 - Infra Mensal]] (precos canonicos mantidos)
---

# Decision Log — 2026-04-24 — Dual-Track V1 (self-service + consultivo)

## Contexto

Em 2026-04-23, o dono fechou [[Decision Log - 2026-04-23 - Venda Consultiva]] estabelecendo que a buscou.ai seria **100% consultiva na V1**: landing sem preco exposto, CTA unico de agendar reuniao via WhatsApp, proposta personalizada escrita, sem self-service.

Em 2026-04-24, apos auditoria critica da landing e revisao de posicionamento comercial, o dono pivotou: a landing deve atender **dois perfis** de cliente simultaneamente — quem ja decidiu e quer comprar direto (self-service Stripe) e quem quer conversar antes (agendamento integrado via Cal.com). Ambos os fluxos convivem na mesma pagina, cliente escolhe.

Essa decisao **revoga** o canonico anterior de "100% consultivo / sem self-service" e **substitui** por um modelo dual-track. Os valores canonicos (R$ 2.500 a vista / R$ 3.000 em 12x + R$ 300/mes infra) permanecem iguais — a mudanca e de **processo**, nao de **precificacao**.

## Decisao canonica (Nivel 1)

A buscou.ai passa a operar com **dois caminhos de venda convivendo na landing**:

- **Track 1 — Self-service:** preco publico exposto, botao "Comprar agora", Stripe Checkout one-time, onboarding disparado via Anna Mel (V2) ou humano (V1).
- **Track 2 — Consultivo:** formulario + agendamento Cal.com integrado no site, confirmacao WhatsApp automatica via Uazapi, reuniao de diagnostico, proposta personalizada, fechamento.

Cliente escolhe qual fluxo entrar. Landing expoe ambos os CTAs com peso visual equivalente.

## Racional

1. **Escala 24/7 sem gargalo humano** — Track 1 permite venda fora do horario de atendimento, sem esperar bandwidth do Joao/Vitoria pra responder WhatsApp.
2. **Preserva ICPs heterogeneos** — e-commerces e infoprodutores estao habituados a comprar digital high-ticket (Track 1 nativo pra eles). Clinicas, imobiliarias, advogados preferem construir confianca antes de pagar (Track 2 natural pra eles).
3. **Reducao de friccao do cliente ja decidido** — quem chegou pela indicacao, leu tudo e ja quer comprar nao tem mais que "agendar reuniao pra ouvir o que ja sabe". Track 1 elimina esse atrito.
4. **Preservacao da venda consultiva pra tickets complexos** — Track 2 continua atendendo quem precisa entender escopo personalizado, customizacao de nicho, ou tem duvida de fit.
5. **Posicionamento como tecnologia, nao agencia** — expor preco reforca que e produto com precificacao clara, nao servico sob demanda.

## Fluxos canonicos (ambos os tracks)

### Track 1 — Self-service via Stripe

```
1. Cliente chega na landing (www.buscouai.com).
2. Clica em "Comprar agora" (CTA primario).
3. Modal abre com formulario:
   - Nome, telefone, empresa, @IG da empresa (todos obrigatorios exceto @IG)
4. Submit do modal:
   a. POST /api/lead → cria registro em `leads` com status "lead_novo"
   b. POST /api/checkout → Stripe Checkout Session criada com metadata do lead
5. Redirecionamento pro Stripe Checkout.
6. Cliente escolhe metodo de pagamento:
   - PIX a vista: R$ 2.500 (one-time)
   - Cartao parcelado em 12x: R$ 3.000 (12 parcelas de R$ 250, cliente assume juros)
7. Pagamento processado.
8. Webhook /api/webhook/stripe recebe checkout.session.completed.
9. Sistema promove o lead em cliente:
   a. Grava em `compras` (status "pago")
   b. Atualiza `leads` → status "cliente"
   c. Cria registro em `organizacoes` (o tenant do cliente)
10. Anna Mel (V2) ou Joao/Vitoria (V1) enviam via WhatsApp:
    a. Confirmacao de pagamento recebido
    b. Credenciais de acesso ao painel cliente
    c. Primeiros passos do onboarding
    d. Prazo: blog no ar em ate 7 dias
11. Cliente acessa o painel e preenche dados necessarios pro desenvolvimento do blog:
    - Dominio (proprio ou subdominio buscou.ai)
    - Nicho de atuacao
    - Regiao e publico-alvo
    - Informacoes da empresa (sobre, diferenciais, tom de voz)
    Estes dados alimentam os agentes (Pesquisador → Estrategista → Redator → Publicador)
    que comecam a configurar e popular o blog.

### Cobranca da infra mensal (a partir do dia 30 pos-implementacao)

12. Dia 27 pos-pagamento (D-3 da primeira mensalidade): Anna Mel envia link de
    subscription pro cliente escolher forma de pagamento da infra R$ 300/mes:
    a. Cartao → Stripe Subscription recurring (R$ 300/mes auto-renovavel)
    b. PIX → pagamento unico mensal (Anna Mel repete a regua mes a mes)
13. Dia 30: primeira cobranca da infra processada.
14. Se pago → Anna Mel parabeniza, confirma status OK, **avisa o proximo ciclo**
    ("sua proxima cobranca chega em ~30 dias").
15. Se nao pago → Anna Mel inicia cadencia de cobranca / recuperacao
    (tabela cobrancas_recuperacao, ver BAI-51).
16. Inadimplencia persistente pausa o motor (blog permanece no ar, conteudo para).
```

### Track 2 — Consultivo via agendamento integrado

```
1. Cliente chega na landing.
2. Clica em "Agendar diagnostico" (CTA secundario).
3. Modal abre com formulario:
   - Nome, telefone, empresa, @IG da empresa (todos obrigatorios exceto @IG).
4. Submit cria registro em `leads` com status "lead_agendando".
5. Cal.com embed carrega com pre-fill dos campos do formulario.
6. Cliente seleciona slot disponivel (integracao com Google Calendar Joao+Vitoria).
7. Confirma reserva → Cal.com cria evento nos calendarios do Joao+Vitoria.
8. Webhook Cal.com → POST /api/schedule/book:
   a. Grava em `meetings` (status "agendado").
   b. Atualiza `leads` → status "lead_agendado".
   c. Dispara Uazapi: mensagem de confirmacao do agendamento
      ("parabens pelo seu agendamento, esta confirmado para {data} as {hora}").

9. CADENCIA DE NUTRICAO PRE-REUNIAO (Anna Mel):
   Do agendamento ate o dia da reuniao, Anna Mel envia:
   - D-1 lembrete do horario
   - Material de apoio relevante (link pro blog buscou.ai, case, video curto)
   - Perguntas de pre-qualificacao ("qual e o maior desafio de presenca
     digital do seu negocio hoje?")
   Objetivo: manter lead quente ate a reuniao.

10. REUNIAO DE DIAGNOSTICO acontece (30 min, Joao+Vitoria via Google Meet).

11. CADENCIA DE CONFIRMACAO POS-REUNIAO (Anna Mel):
    Logo apos a reuniao:
    - Confirma proximo passo ("reuniao concluida! proposta chega em ate 24h")
    - Agradece o tempo
    Objetivo: sinalizar que o processo continua sem que o cliente precise cobrar.

12. Pos-reuniao: Joao gera proposta personalizada (skill gerador-proposta-buscou,
    usa transcricao + valores canonicos + beneficio parceiro networking quando
    aplicavel) e envia via WhatsApp manualmente.

13. CADENCIA DE FECHAMENTO (Anna Mel + Joao/Vitoria em colaboracao):
    Do envio da proposta ate o cliente decidir:
    - D+1: Anna Mel confirma recebimento ("viu a proposta? alguma duvida?")
    - D+3: Anna Mel faz follow-up educativo ("como voce esta pensando sobre isso?")
    - D+7: Joao/Vitoria entram humanamente (se ainda em aberto) pra fechar
    Anna Mel NAO substitui Joao/Vitoria no fechamento humano — ajuda com
    acompanhamento leve, enquanto o fechamento relacional fica com o time.
    Objetivo: reduzir esforco humano no follow-up sem perder o toque humano
    no momento de decisao.

14. Cliente decide:
    - Comprar → recebe link Stripe via WhatsApp (reusa infra do Track 1,
      passo 5-10 do Track 1 executa a partir daqui). Onboarding igual Track 1.
    - Nao comprar → Anna Mel encerra cadencia educada. Lead volta pro pool
      pra nurturing de longo prazo (futura: automacao de reativacao trimestral).
```

## Operacao V1 (hoje) vs V2 (Anna Mel operacional)

A visao desse Decision Log assume **Anna Mel como peca central do Track 1** (manda credenciais + faz regua mensal de cobranca). Anna Mel e entregue em [[BAI-49]] com MVP operante na F3 ([[BAI-53]]), com prazo de ~4-6 semanas.

Ate la, o Track 1 opera em modo **V1 manual hibrido**:

- Joao/Vitoria recebem notificacao de nova compra via email ou Slack quando webhook dispara
- Joao/Vitoria mandam manualmente via WhatsApp as credenciais + primeiros passos
- Joao/Vitoria fazem manualmente a regua de cobranca da infra mensal (avisa D-3, cobra D0, recupera se falhar)
- Copy das mensagens V1 e assinada como "equipe buscou.ai" (sem identificar Joao ou Vitoria por nome, preparando terreno pra transicao)

Quando [[BAI-49]] F3 fechar, **Anna Mel assume a operacao e se identifica abertamente pro cliente**. A primeira mensagem de transicao carrega apresentacao: "Oi, sou a Anna Mel, agente da buscou.ai. A partir de agora voce fala comigo pra suporte e cobranca mensal." Dessa mensagem em diante, toda comunicacao leva assinatura Anna Mel.

Essa escolha de **transparencia** (IA se identifica, nao se disfarca) reforca o posicionamento de tecnologia — Anna Mel e personagem-marca, nao substituta humana camuflada. Clientes que preferem humano continuam tendo Track 2 (reuniao consultiva).

Esta fase de transicao e **aceita como debito operacional** e nao bloqueia a ativacao do Track 1. Valida a hipotese de self-service com primeiros clientes reais enquanto Anna Mel virar codigo em paralelo.

## Alteracoes no canonico (orienta Cascata — [[BAI-89]])

Aplicar em ate 7 dias da data deste Decision Log:

### [[VERDADE_UNICA_BUSCOU]]

- **§6 (Termos proibidos):** remover `"checkout direto (na landing)"`. Esse termo deixa de ser proibido.
- **§8 (Modelo comercial / fluxo):** reescrever trecho `"Reuniao de diagnostico e obrigatoria. Nao ha auto-servico; a landing nao expoe preco e nao tem checkout direto"` para refletir dual-track:
  - Landing expoe preco publico (R$ 2.500 a vista / R$ 3.000 em 12x + R$ 300/mes infra).
  - Cliente escolhe: Track 1 self-service ou Track 2 consultivo.
  - Reuniao de diagnostico e obrigatoria SO no Track 2.

### [[Oferta Comercial]]

- **§Regras Inegociaveis:**
  - Remover: "Nao expor preco na landing. Preco aparece em reuniao + proposta personalizada, nao em copy publico."
  - Adicionar: "Preco publico e exposto pra Track 1 self-service. Track 2 consultivo mantem proposta escrita apos reuniao."
  - **Manter**: "Valores canonicos NAO negociam em Track 1. Em Track 2, unica excecao documentada e o beneficio parceiro networking (R$ 1.000 off, nunca divulgado publicamente)."
- **§Fluxo de venda:** substituir fluxo linear antigo pelos dois fluxos canonicos descritos neste Decision Log.

### [[Roadmap do Produto]]

Adicionar features V1 (nao V1.1):
- Stripe Checkout one-time (implementacao) — [[BAI-86]]
- Stripe Subscription condicional (infra cartao) + Payment Link avulso (infra PIX) — [[BAI-86]]
- Cal.com embed + webhook — [[BAI-87]]
- Uazapi confirmacao automatica — [[BAI-108]]
- `/admin/compras` e `/admin/meetings` dashboards — [[BAI-102]], [[BAI-109]]

### [[CLAUDE.md]] (raiz do projeto)

- **Decisoes Canonicas (fixas):** Decision Log vigente aponta pra `Decision Log - 2026-04-24 - Dual-Track.md`.
- **Inegociavel (Nivel 1):** reescrever bullet sobre fluxo de venda pra refletir dual-track.
- **Linguagem:** remover "checkout direto" de proibidos.

## O que NAO muda

- **Precos canonicos:** R$ 2.500 a vista ou R$ 3.000 em 12x (implementacao) + R$ 300/mes (infra a partir do mes 2).
- **Valores nao negociam em Track 1 (self-service):** preco Stripe e fixo, sem cupom publico, sem promocao. Track 1 sempre cobra o valor canonico cheio.
- **Negociacao caso-a-caso existe apenas em Track 2 (reuniao consultiva):** durante diagnostico, o dono pode aplicar excecoes pontuais (ex: [[Decision Log - 2026-04-24 - Beneficio Parceiro Networking]] — R$ 1.000 off quando ha relacao de networking previa documentada). **Nenhum desconto e divulgado publicamente na landing, em redes sociais ou em copy.** Sao ferramentas operacionais internas do dono, nao produto comunicado.
- **LGPD, retencao de dados, direitos do titular** — mantidos conforme [[Politica de Privacidade]].
- **Posicionamento canonico:** "Se alguem buscou, quem apareceu foi voce?"
- **Produto:** blog + motor gerando 90 conteudos/mes.
- **Nao-agencia, nao-consultoria:** buscou.ai continua sendo tecnologia vendida como produto fechado.
- **ICP primario:** negocios locais continua. Track 1 abre porta pra e-commerces e infoprodutores sem deslocar o foco primario.

## Revisao do modelo

Revisao acontece **qualitativamente** — sem thresholds numericos pre-definidos. O dono avalia periodicamente se o dual-track esta funcionando conforme esperado, olhando sinais diretos (conversao do jeito que deveria, clientes satisfeitos, inadimplencia controlada, tempo de atendimento saudavel).

Se algum sinal de desalinhamento surgir (ex: muitas compras Track 1 seguidas de devolucao, ou muitos leads Track 2 que nao fecham), abrir novo Decision Log documentando o diagnostico + a correcao proposta.

Decisao explicita de **nao comprometer com thresholds agora** porque nao temos dados reais ainda — numeros forcados poderiam virar dogma errado. Quando houver base historica (3-6 meses de operacao), revisitar esta secao pra formalizar thresholds informados pelos dados reais.

## Implicacoes tecnicas (viram umbrellas de implementacao)

- **[[BAI-84]]** — Umbrella Canonico Dual-Track (2 filhas: este Decision Log + cascata)
- **[[BAI-85]]** — Umbrella Reformulacao de conteudo da landing (5 filhas)
- **[[BAI-86]]** — Umbrella Track 1 Self-service Stripe (8 filhas)
- **[[BAI-87]]** — Umbrella Track 2 Agendamento Cal.com + Uazapi (6 filhas)
- **[[BAI-70]]** (ampliada) — Tracking per-tenant (GA + GTM + Clarity + Kommo webhook)
- **[[BAI-69]]** (ampliada) — Port Next.js fiel incorporando todas as novas secoes

## Aprovacao

- **Dono:** Joao Lucas Ucceli
- **Data:** 2026-04-24
- **Status:** pendente assinatura final (revisao visual deste documento)

Apos aprovacao explicita do dono, executar **[[BAI-89]] — Cascata canonica** nos 4 arquivos acima em ate 7 dias (prazo [[CLAUDE.md]] §Governanca).
