---
tipo: estrategia
area: Empresa
tags: [decision-log, canonico, contato, whatsapp, go-to-market, aquisicao]
atualizado: 2026-04-23
aprovacao: Joao Lucas Ucceli — 2026-04-23
---

# Decision Log — 2026-04-23 — Contato Oficial

## Contexto

Ao aprovar o setup da pagina de vendas (umbrella BAI-23), o dono definiu o numero de WhatsApp **+55 27 99696-0847** como canal oficial de atendimento e leads entrantes. Antes dessa decisao, a VERDADE_UNICA nao continha referencia canonica a canal de contato — o que deixaria o numero disperso em multiplos artefatos (landing, prompts de agentes, emails de prospeccao) sem fonte unica de atualizacao.

Esta decisao formaliza:
1. **Qual** e o canal oficial.
2. **Como** ele e referenciado (formato do numero, link padrao, mensagem pre-preenchida).
3. **Por que** WhatsApp e canal unico na V1 (em vez de formulario, email, chat widget).
4. **Quando** essa escolha devera ser revisada.

---

## Decisao (canonica — Nivel 1)

### O canal

**WhatsApp e o canal unico de leads entrantes na V1 da buscou.ai.**

| Campo | Valor canonico |
|---|---|
| Numero em formato humano | `+55 27 99696-0847` |
| Formato internacional (tecnico) | `5527996960847` |
| Link wa.me padrao | `https://wa.me/5527996960847` |
| Mensagem pre-preenchida padrao | `"Oi, vi o site da buscou.ai e quero entender melhor como funciona."` |

### Uso canonico

- **CTA principal** da landing em `www.buscouai.com`.
- **Emails de prospeccao** do Agente Prospeccao (outbound).
- **Materiais de vendas** (deck, one-pager, materiais impressos).
- **Assinaturas de email** de qualquer pessoa que fale em nome da marca publicamente.

### Uso NAO-canonico (explicitamente fora)

- **Nao** e canal de suporte tecnico a clientes ativos — isso fica com [[Agente Suporte]] e canais privados pos-venda.
- **Nao** substitui webhook de sistema nem notificacao automatica do produto (alertas de motor pausado, por exemplo, usam o canal de notificacao do dashboard).

### Regra de consistencia tecnica

Todo artefato de codigo que referencie o numero deve puxar de **uma constante centralizada** no projeto (ex: `src/lib/constants.ts` do `produto/site/`). Nao hardcodar em multiplos lugares. Trocar o numero no futuro e 1-linha, nao grep pelo repo inteiro.

---

## Justificativa

### Por que WhatsApp?

1. **Zero fricao.** No Brasil, WhatsApp e o canal com maior taxa de resposta em venda B2B e B2C pequenas. Clique no link → abre conversa com mensagem pronta → nao ha cadastro, espera, loop de email, captcha.
2. **Lead ja aquecido.** Quem clica no WhatsApp demonstrou intencao (leu a landing, escolheu iniciar conversa). Nao precisa de qualificacao robotica — o proprio ato de iniciar a conversa e qualificador.
3. **Atendimento sincrono ou assincrono.** Funciona em ambos: se o dono estiver disponivel, resposta em 2 min; se nao, cliente recebe resposta quando possivel sem "sumir" como email comumente faz.
4. **Zero CRM a gerenciar na V1.** Enquanto o volume for tratavel manualmente (tipicamente ate 20-30 leads/semana), nao precisa de ferramenta de vendas acoplada. Historico fica no proprio WhatsApp.
5. **Canal familiar para o ICP.** Negocios locais (clinicas, imobiliarias, advogados, servicos locais) **ja usam WhatsApp** pra atender seus proprios clientes. Falar com a buscou.ai pelo mesmo canal e natural.

### Por que canal unico (em vez de multi-canal)?

6. **Foco na coleta.** Multi-canal dispersa conversas (email aqui, chat ali, telefone acola) e quebra o historico. Canal unico garante que todo lead da buscou.ai mora no mesmo lugar.
7. **Mais facil manter atualizado.** Se abrir 3 canais, tem que atualizar 3 canais em todo lugar. 1 canal = 1 constante = 1 ponto de atualizacao.
8. **Pronto pra escala quando precisar.** WhatsApp Business API + CRM (RD Station, HubSpot, Kommo) e plug-in barato quando o volume justificar. Comecar simples nao bloqueia escala.

---

## Alternativas descartadas

### Formulario na landing
- **Fricao.** Cliente precisa preencher nome, email, telefone, mensagem. Taxa de conversao cai ~3-5x vs CTA WhatsApp.
- **Gargalo de resposta.** Formulario entra em fila de email que pode demorar 1h+ pra ser vista.
- **Piores leads.** Quem preenche formulario nao ta tao engajado quanto quem clica pra abrir WhatsApp com mensagem pronta.
- **Descartado para V1.** Entra como possibilidade na V2 quando o volume justificar curadoria.

### Email direto (contato@buscouai.com)
- **Latencia ruim.** Email no Brasil tem taxa de rejeicao alta (spam) e tempo medio de resposta de horas.
- **Baixa relevancia pro ICP.** Negocios locais respondem WhatsApp 10x mais rapido que email.
- **Gera CRM implicit.** Email precisa de triagem, labels, filtros — vira trabalho operacional.
- **Descartado pra V1.** Pode entrar como secundario na V2.

### Chat widget embutido (Intercom, Tawk, Crisp, HubSpot Chat)
- **Custo.** Intercom comeca $39/usuario/mes; Crisp $25/mes; HubSpot free tem limites. Infra extra pra justificar sem volume.
- **Complexidade.** Requer integracao, monitoramento, setup de horarios, fallback quando offline.
- **Redundante com WhatsApp.** Se ja tem WhatsApp (que o cliente ja tem no celular), chat proprio e duplicacao.
- **Descartado pra V1.** Reconsiderar se escala justificar.

### Telefone de voz (DDD + numero fixo)
- **Sem retorno pra ICP.** Negocios locais respondem WhatsApp, nao telefone desconhecido (associam a golpe).
- **Sem registro.** Conversa de voz nao deixa historico escrito rastreavel.
- **Descartado.** Nem mesmo na V2.

---

## Trade-offs

### Ganhamos
- Canal com maior taxa de conversao no mercado BR pra ticket medio.
- Zero fricao no CTA.
- Historico automatico (WhatsApp guarda tudo).
- Zero custo mensal de ferramenta (ate escalar).
- Familiaridade do ICP.

### Perdemos
- **Sem automacao de triagem.** Lead entra no WhatsApp e precisa ser respondido manualmente. Nao tem resposta automatica inicial ainda (V2 pode adicionar chatbot).
- **Sem captura de email de quem nao converter.** Formulario captura email mesmo de quem nao fecha; WhatsApp so captura quem iniciou conversa.
- **Dependencia de 1 dispositivo.** Se o numero estiver no celular do dono, nao ha acesso quando ele estiver offline (resolvido quando evoluir pra WhatsApp Business + desktop).

### Riscos
- **Dono se tornar gargalo.** Se volume passar 30-50 leads/semana, resposta humana nao escala. Mitigacao: monitorar volume semanal; quando bater limite, habilitar resposta automatica inicial (chatbot) ou adicionar Vitoria como co-atendente.
- **Numero pessoal vs comercial.** Se `+55 27 99696-0847` for numero pessoal do dono, nao ha separacao entre vida pessoal e vendas. Mitigacao: migrar pra WhatsApp Business (mesmo numero) quando fizer sentido, com perfil comercial separado.

---

## Gatilho de revisao

Esta decisao sera revisada (novo Decision Log) quando **ao menos uma** das condicoes abaixo se tornar verdadeira:

1. Volume de leads semanais passar de **30-50/semana**, tornando atendimento manual impraticavel.
2. ICP secundario (negocios nao-locais) passar a representar >30% dos leads, exigindo canais mais formais (email corporativo).
3. Precisarmos de integracao com CRM de venda (pipedrive, HubSpot, RD Station) pra rodar nurturing multi-touch.
4. Dono ou Vitoria passarem a nao conseguir responder em **< 2 horas util** de forma consistente.

Ate la, canal unico via WhatsApp e canonico.

---

## Impacto em documentacao

### Reescritos (nesta release)
- `00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md` — adicionada secao 11 "Contato Oficial" + secao 8 ganhou subsecao "Canal de contato (V1)".

### Afetados em ondas futuras
- `03 - Oferta/Oferta Comercial.md` — quando reescrito pra copy de vendas da V1, inclui o numero como CTA canonico.
- `13 - Agentes/Agente Prospeccao.md` — prompts de outbound devem referenciar `+55 27 99696-0847` como call-to-action.
- `14 - Marketing/Funil Completo.md` — validar que os steps pos-click na landing apontam pra conversa WhatsApp.

### Codigo de produto
- `produto/site/src/lib/constants.ts` (a ser criado em BAI-26/BAI-30) — constante `WHATSAPP_NUMBER` + `WHATSAPP_URL` canonica.
- Todos os CTAs de conversao da landing (`produto/site/app/page.tsx` e componentes derivados) puxam dessa constante, nao hardcodam.

---

## Nivel desta decisao

**Nivel 1 — canonica.** Altera a VERDADE_UNICA (nova secao 11) e define canal oficial de aquisicao — decisao estrategica.

Qualquer alteracao futura (mudar numero, abrir mais canais, trocar canal principal) exige novo Decision Log datado, aprovacao do dono, e cascata em ate 7 dias conforme [[Governanca - Decisoes Canonicas]].

---

## Aprovacao

Joao Lucas Ucceli — 2026-04-23.

---

## Links cruzados

- [[VERDADE_UNICA_BUSCOU]] — documento canonico (secao 11 — Contato oficial)
- [[Decision Log - 2026-04-23]] — decisao base de posicionamento e oferta
- [[Decision Log - 2026-04-23 - Infra Mensal]] — decisao de modelo comercial
- [[Governanca - Decisoes Canonicas]] — processo
- [[Oferta Comercial]] — pitch e scripts (consumem esse numero)
- [[Agente Prospeccao]] — outbound (consome esse numero)
- [[Site Publico]] — landing (consome esse numero)
