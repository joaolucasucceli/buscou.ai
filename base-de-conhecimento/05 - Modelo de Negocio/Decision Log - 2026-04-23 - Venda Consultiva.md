---
tipo: estrategia
area: Empresa
tags: [decision-log, canonico, vendas, processo, reuniao-diagnostico, proposta-personalizada]
atualizado: 2026-04-23
aprovacao: Joao Lucas Ucceli — 2026-04-23
---

# Decision Log — 2026-04-23 — Venda Consultiva

## Contexto

Durante o planejamento da landing da buscou.ai (umbrella [[BAI-23]]), ao apresentar o wireframe da dobra de oferta com preco exposto e CTA WhatsApp direto, o dono revisou a direcao e definiu que:

1. A landing tem **teor de chamar pra agendar uma reuniao de diagnostico** — nao uma conversa solta no WhatsApp.
2. **Preco nao e exposto na landing.** A compra e consultiva e depende de reuniao.
3. O fluxo de funil e: **marketing → atendimento no WhatsApp → reuniao de diagnostico → proposta personalizada (PDF/HTML) via WhatsApp → pagamento**.
4. A comunicacao publica alveja **fundo de funil** (quem ja tem o problema, quer resolver).
5. Durante a reuniao: entendimento do negocio + metodologia + solucao + oferta. Pos-reuniao: transcricao alimenta ferramenta que gera proposta visual personalizada, enviada manualmente pelo dono via WhatsApp.

Esta decisao **muda o fluxo de venda**, nao os valores. **Mantem** o preco canonico de R$ 2.500 a vista (ou R$ 3.000 em 12x) + R$ 300/mes de infra. A proposta personalizada apenas contextualiza esses valores pro negocio especifico, nao negocia preco.

O modelo anterior (self-service com preco exposto em landing + "call opcional 20-30 min") era compativel com tickets de auto-servico. Tickets B2B de R$ 2.500+ no ICP de negocios locais exigem construcao de confianca, diagnostico ativo e proposta escrita — nao auto-servico.

---

## Decisao anterior

Modelo aprovado em [[Decision Log - 2026-04-23]] + [[Decision Log - 2026-04-23 - Infra Mensal]]:

- Valores canonicos: R$ 2.500 a vista OU R$ 3.000 em 12x (implementacao) + R$ 300/mes (infra a partir do mes 2).
- **Processo:** 100% self-service — landing expoe preco, cliente clica em WhatsApp, conversa e fechamento rapido.
- **Call:** opcional (20-30 min "so se cliente pedir").
- **Sem BANT, sem reuniao obrigatoria, sem ciclo de venda longo.**

---

## Nova decisao (canonica — Nivel 1)

### Processo de venda passa a ser CONSULTIVO, com reuniao de diagnostico obrigatoria e proposta personalizada escrita.

**Valores canonicos permanecem iguais.** O pivot e de **processo**, nao de precificacao.

### Novo fluxo de venda (canonico)

```
1. Marketing organico ou pago gera atencao.
2. Lead chega na landing (www.buscouai.com).
   CTA unico: "Agendar diagnostico" → abre WhatsApp.
3. Conversa WhatsApp rapida pra agendar horario da reuniao.
4. Reuniao de diagnostico (30-60 min, OBRIGATORIA, transcrita):
   a. Abertura: busca ao vivo no Google e IA pra mostrar a ausencia do cliente.
   b. Entendimento: perguntas sobre ICP, servico principal, concorrentes locais.
   c. Metodologia: explicacao de blog + motor (estrutura + 90 conteudos/mes).
   d. Solucao: aplicacao contextualizada pro negocio do cliente.
   e. Oferta: valores canonicos (R$ 2.500 / R$ 3.000 + R$ 300/mes).
   f. Fechamento: "envio proposta escrita em ate 24h via WhatsApp".
5. Pos-reuniao: dono cola a transcricao no painel admin (feature futura).
   Sistema gera HTML slide personalizado usando a transcricao + valores canonicos
   + escopo contratado. Dono baixa PDF/HTML e envia manualmente via WhatsApp.
6. Cliente analisa (validade sugerida: 7 dias) e aceita.
7. Pagamento: link enviado via WhatsApp (a vista Pix ou cartao parcelado) +
   cadastro do cartao recorrente pra infra mensal.
8. Onboarding wizard (11 etapas) -> blog no ar em ate 7 dias -> motor
   publicando 3x/dia -> mes 2: primeira cobranca da infra.
```

### Proposta personalizada (PDF/HTML) — conteudo canonico

Todo cliente que fizer reuniao de diagnostico recebe, em ate 24h, um documento (slide visual ou PDF on-brand) contendo:

- **Cabecalho:** nome do cliente, nome da empresa, dominio, data, validade (7 dias padrao).
- **Contexto da reuniao:** 2-3 paragrafos resumindo a conversa (extraido da transcricao — o que foi entendido do negocio, dor principal, objetivo).
- **Metodologia proposta:** como o blog + motor se aplicam AO negocio dele (keywords-tipo, clusters iniciais, bairros/cidades foco quando local, AIO quando aplicavel).
- **Escopo:** itens contratados (blog + motor + onboarding + 90 conteudos/mes, padrao). Add-ons opcionais quando o caso justificar (multi-dominio, cross-posting, etc) — sem mudar precificacao-base.
- **Valores:** R$ 2.500 a vista ou R$ 3.000 em 12x (implementacao) + R$ 300/mes (infra a partir do mes 2). Sempre as duas linhas canonicas explicitas.
- **Proximos passos:** link de pagamento + prazo de ativacao (blog no ar em 7 dias apos pagamento).
- **Dados da BuscouAI:** contato, CNPJ quando aplicavel, termos curtos (politica de inadimplencia da infra, o que acontece se pausar).

### Call e OBRIGATORIA, nao opcional

Zero caminho self-service. Quem quer comprar **passa pela reuniao**. A landing nao tem link de pagamento direto — o unico CTA de conversao e "Agendar diagnostico".

---

## Justificativa

1. **Construir confianca no ticket B2B.** R$ 2.500-3.000 + R$ 300/mes somam R$ 6.100/ano em ano 1. Clientes ICP (negocios locais: clinicas, imobiliarias, advogados) decidem compras desse porte com **conversa humana**, nao com botao de compra na landing. Reuniao remove fricao de confianca.

2. **Diagnostico vira diferencial entregue.** A propria reuniao tem valor percebido — o cliente sai sabendo onde nao aparece, por que, e como isso se compara ao concorrente. Mesmo se nao fechar, recebeu insight real. Isso aumenta valor percebido de quem fecha e gera recomendacao de quem nao fecha.

3. **Proposta personalizada aumenta conversao.** Documento escrito com contexto especifico do negocio ("sua clinica em Vitoria ES, concorrendo com X e Y") converte mais que oferta generica. Pos-reuniao, o cliente tem algo fisico pra discutir internamente (socios, conjuge, contador).

4. **Qualificacao leve antes da oferta.** Na reuniao, qualifico o fit (ICP local? orcamento? disposto a esperar 7-30 dias pra sinais?). Se nao fit, entrego diagnostico + valor residual mas nao mando proposta. Salva trabalho de proposta pra quem realmente vai comprar.

5. **Manejo de objecao ao vivo.** Objecoes complexas ("ja tentei SEO", "meu sobrinho faz", "preciso pensar") sao respondidas melhor na reuniao que por escrito na landing. Reduz bounce.

6. **Prepara infraestrutura pra escala.** Ferramenta de "gerar proposta via transcricao" que vai ser construida ([[Agente Proposta Personalizada]]? feature V2+) e foundational — depois dela, escalar outbound + reuniao vira padrao reproduzivel.

---

## Alternativas descartadas

### Self-service mantido (status quo)

- **Atrito de confianca.** Cliente de negocio local raramente compra B2B no Brasil sem conversar antes. Self-service funcionaria melhor pra ticket baixo (< R$ 500 recorrente) ou decisao individual (SaaS B2C).
- **Sem qualificacao.** Todo lead vai pro mesmo funil, gasta tempo de onboarding mesmo quem nao e ICP.
- **Sem diferencial de experiencia.** Concorrentes (agencias, freelancers) tambem tem formularios — nao ha razao pro cliente escolher a gente pela "facilidade".
- **Descartado.** Mantem a fricao errada.

### Consultivo leve (reuniao opcional + landing com preco)

- Landing ainda expoe preco + CTA WhatsApp, mas oferece reuniao como upgrade pra quem pedir.
- **Risco de canibalizar.** Quem ve preco na landing pula a reuniao, perde diagnostico, compra menos informado. Quem nao ve preco, sente ansiedade — acha que e caro e nao volta.
- **Sem previsibilidade.** Taxa de self-service vs reuniao varia. Dificil prever quanto tempo do dono vai pra reuniao.
- **Descartado.** Metade-boca — nao aproveita beneficio do consultivo nem a fluidez do self-service.

### Consultivo com preco consultivo (faixa "a partir de X")

- Alem de reuniao obrigatoria, preco varia por cliente (porte, nicho, escopo).
- **Quebra o canonico atual.** Precisaria reescrever Modelo de Negocio + Unit Economics + Oferta Comercial pra acomodar valor variavel.
- **Abre margem pra negociacao.** Cliente sempre tentara pechinchar, perde-se ancoragem.
- **Complexifica produto.** Se preco varia, escopo precisa variar — implementacao deixa de ser servico standard.
- **Descartado (V1).** Preco fixo canonico mantem posicionamento "tecnologia, nao servico customizado". Se no futuro houver segmentos distintos (enterprise, multi-unidade), pode se abrir um "Plano Empresarial" como decisao futura.

---

## Trade-offs

### Ganhamos

- **Maior ticket medio efetivo.** Quem entra pela reuniao compra mais informado, menos objecoes de compra pos-pagamento.
- **Qualificacao inline.** Dono filtra nao-ICP antes de mandar proposta (economiza trabalho).
- **Diagnostico como USP.** "Ganhou a reuniao que recebe" vira parte do pitch — concorrentes ainda nao entregam isso estruturado.
- **Proposta escrita como ativo.** Cliente encaminha pra socio/conjuge, gera segundo ponto de conversao (nao depende so do momento da reuniao).
- **Coleta de insights estruturada.** Toda reuniao gera transcricao → alimenta ajuste de copy/ICP ao longo do tempo.

### Perdemos

- **Velocidade de fechamento.** Self-service podia fechar em minutos; consultivo leva 2-5 dias (reuniao + proposta + analise + pagamento).
- **Throughput limitado pelo tempo do dono.** Cada lead qualificado consome 30-60 min de reuniao + 15-30 min de preparacao da proposta (ate a automacao estar pronta).
- **Demanda de producao de proposta.** Template visual (V1 manual) precisa ser criado; automacao (V2+) depende de painel admin existir.

### Riscos

- **Gargalo no dono.** Se volume passar de ~20 reunioes/semana (1h cada = 20h + followups), o dono satura. Mitigacao: Vitoria entra como co-conductor; depois um SDR; eventualmente auto-qualificacao previa via formulario leve.
- **No-show em reunioes.** Lead agenda e nao comparece. Mitigacao: mensagem de confirmacao 24h antes + 1h antes; policy de 2 reagendamentos maximo.
- **Proposta nao aceita.** Cliente aceita reuniao, acha bom, mas nao fecha. Mitigacao: validade de 7 dias cria urgencia; followup automatico no dia 6.
- **Overhead ate ter proposta automatizada.** Enquanto dono preenche template manualmente, cada proposta leva 20-30min. Mitigacao: priorizar feature de geracao automatica como roadmap V2; antes disso, template V1 manual com 80% pre-preenchido.

---

## Impacto em linguagem

A secao 6 da VERDADE_UNICA (Linguagem) ganha novas regras:

**Novo proibido (em copy publico):**
- `"self-service"` — nao e mais valido descrever o fluxo da buscou.ai como self-service.
- `"call opcional"` — reuniao e obrigatoria.
- `"sem BANT"` / `"sem qualificacao"` — ha qualificacao leve na reuniao.
- `"sem reuniao obrigatoria"` — contradiz o novo canonico.
- `"checkout direto na landing"` — nao existe mais.

**Novo permitido e recomendado:**
- `"reuniao de diagnostico"` — termo canonico do primeiro contato.
- `"proposta personalizada"` — termo canonico do documento escrito pos-reuniao.
- `"diagnostico hiperpersonalizado"` — variacao em copy.
- `"compra consultiva"` — uso interno/estrategico; em copy publico, preferir "conversa de diagnostico".
- `"agendar diagnostico"` / `"agendar meu diagnostico"` — CTA canonico.

**Mensagem pre-preenchida do WhatsApp muda:**

De:
> "Oi, vi o site da buscou.ai e quero entender melhor como funciona."

Para:
> "Oi, vi o site da buscou.ai e quero agendar um diagnostico do meu negocio."

---

## Impacto em entrega (promessa vs realidade)

| Prometemos | Entregamos | Verdade |
|---|---|---|
| Diagnostico ao vivo na reuniao | 30-60 min com busca ao vivo + perguntas ICP + metodologia | Coerente |
| Proposta escrita em ate 24h apos reuniao | PDF/HTML personalizado via WhatsApp, validade 7 dias | Coerente |
| Valores fixos transparentes na proposta | R$ 2.500 / R$ 3.000 + R$ 300/mes (mesmos valores canonicos) | Coerente |
| Pagamento apos aceite da proposta | Link de pagamento enviado via WhatsApp apos OK | Coerente |
| Blog no ar em 7 dias apos pagamento | Inicio do onboarding → blog publicado | Coerente |

---

## Arquivos afetados (cascata obrigatoria)

### Alta prioridade — reescrever no mesmo ciclo (BAI-57)

**Nucleo canonico:**
- `00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md` (topo + §5 + §7 + §8 + §11)
- `03 - Oferta/Oferta Comercial.md` (reescrita significativa — fluxo, pitch, objecoes, nova secao de proposta personalizada)

**Consolidados relacionados:**
- `01 - Posicionamento/Conceito e Posicionamento.md` (tabela aplicacoes — CTA do hero)
- `01 - Posicionamento/Proposta de Valor.md` (tabela diferencial vs agencia)

**Camada operacional (agentes):**
- `agentes/contexto/oferta.md` (sincronizar)
- `agentes/contexto/verdade-unica.md` (sincronizar)

**Metadados:**
- `base-de-conhecimento/CHANGELOG.md` (entrada nova datada)

### Media prioridade — auditar e atualizar conforme impacto

- `04 - Produto/Onboarding Automatico.md` — adicionar que onboarding so comeca apos pagamento pos-proposta-aceita
- `09 - Execucao/Fluxo V1.md` — incluir etapa de reuniao + proposta
- `10 - Go To Market/Go To Market Inicial.md` — ajustar funil (prospecao → reuniao)
- `11 - Operacao/Jornada do Cliente.md` — touchpoint "reuniao de diagnostico" entra
- `13 - Agentes/Agente Prospeccao.md` — outbound agora agenda reuniao, nao venda direta
- `14 - Marketing/Funil Completo.md` — etapa "reuniao" entre WhatsApp e pagamento
- `14 - Marketing/Tom de Voz e Marketing.md` — novas regras de linguagem

### Baixa prioridade — validar em auditoria futura

- Outros arquivos didaticos em 06-SEO, 07-AIO, 08-Estrategia (sem mencao direta ao fluxo de venda) — validar se citam self-service; se sim, atualizar.

---

## Prazo de cascata

**Alta prioridade:** mesmo dia (2026-04-23), escopo da issue BAI-57.
**Media prioridade:** ate 7 dias (2026-04-30) ou quando as issues operacionais correspondentes rodarem — o que vier primeiro.
**Baixa prioridade:** auditoria periodica (revisita conforme topicos sao trabalhados).

---

## Gatilho de revisao

Esta decisao sera revisada (novo Decision Log) quando **ao menos uma** das condicoes abaixo se tornar verdadeira:

1. Volume de reunioes passar de **20/semana** consistentemente, exigindo auto-qualificacao previa ou onboarding leve self-service pra reduzir carga na reuniao.
2. Taxa de no-show em reunioes agendadas passar de **30%**, forcando fricao maior no agendamento (pagamento pequeno de hold, contrato de compromisso, etc).
3. Taxa de fechamento pos-proposta cair abaixo de **25%**, sugerindo que o modelo consultivo nao esta convertendo melhor que o self-service era.
4. Surgirem pedidos recorrentes de "quero comprar direto sem reuniao" de leads claramente qualificados (sinal de que parte do ICP nao se encaixa no consultivo obrigatorio).
5. A ferramenta de geracao automatizada de proposta (feature V2+) ficar pronta e estavel a ponto de permitir experimentos de self-service com proposta instantanea.

Ate la, venda consultiva com reuniao obrigatoria e proposta personalizada e **canonica**.

---

## Nivel desta decisao

**Nivel 1 — INEGOCIAVEL.**

Qualquer alteracao exige novo Decision Log datado, aprovacao do dono do projeto, e cascata de atualizacao em ate 7 dias (ver [[Governanca - Decisoes Canonicas]]).

---

## Aprovacao

Joao Lucas Ucceli — 2026-04-23.

---

## Links cruzados

- [[VERDADE_UNICA_BUSCOU]] — documento canonico atualizado por esta decisao (topo + §5 + §7 + §8 + §11)
- [[Decision Log - 2026-04-23]] — decisao base de posicionamento, ICP, produto, oferta
- [[Decision Log - 2026-04-23 - Infra Mensal]] — decisao do modelo de cobranca
- [[Decision Log - 2026-04-23 - Contato Oficial]] — decisao do canal WhatsApp
- [[Governanca - Decisoes Canonicas]] — processo
- [[Oferta Comercial]] — pitch, objecoes, fluxo (reescrito por esta decisao)
- [[Proposta de Valor]] — diferencial comercial (atualizado por esta decisao)
- [[Conceito e Posicionamento]] — aplicacoes (atualizadas por esta decisao)
- [[Agente Prospeccao]] — outbound que agenda reuniao
- [[Agente Pagamento]] — operacional pos-aceite de proposta
- [[Site Publico]] — landing (CTA agora e "agendar diagnostico")
