---
tipo: operacao
area: UX
tags: [operacao, ux, criticos, abandono, fricao]
atualizado: 2026-04-23
---

# Pontos Criticos de UX

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. Cada ponto abaixo e um momento onde o cliente pode desistir, se frustrar ou perder confianca. Problema → impacto → detectar → resolver.

Relacionado: [[Jornada do Cliente]] | [[Fluxo Operacional Completo]] | [[Time to Value]]

---

## 1. Abandono de onboarding

**Problema:** cliente pagou, recebeu acesso, mas nao completou o wizard (dominio, nicho, tom, concorrentes, GSC). Sem esses dados, agentes nao iniciam.

**Impacto:** cliente nao recebe valor. Investimento do cliente fica parado — dano de reputacao.

**Deteccao:** wizard incompleto apos 24h do primeiro login (flag `onboarding_completed = false`).

**Solucao:**
- Wizard em 5 passos, 10 min para completar.
- E-mail + WhatsApp automatico: 6h, 24h, 48h, 72h sem conclusao.
- [[Agente Suporte]] envia mensagem proativa em D+2 oferecendo ajuda humana.
- Opcao "completar depois" com defaults inteligentes (sistema roda com dados parciais e pergunta o resto ao longo dos dias).
- Video de 2 min embutido mostrando como conectar GSC.

**Metrica:** conclusao em 48h > 85%.

---

## 2. Time-to-first-value (TTFV)

**Problema:** cliente pagou e quer ver resultado. Se o primeiro artigo demora mais que 72h, a empolgacao da compra se dissipa.

**Impacto:** sensacao de "paguei por nada". Cliente comeca a questionar o investimento antes de o motor entregar o primeiro sinal.

**Deteccao:** primeiro conteudo em `PUBLISHED` > 72h apos `onboarding_completed = true`.

**Solucao:**
- Pipeline acelerado para primeiro artigo: [[Agente Pesquisador]] com prioridade maxima, keyword de "quick win" (baixa dificuldade, volume decente).
- SLA interno: primeiro artigo em < 48h. Teto canonico de ativacao: 7 dias ([[VERDADE_UNICA_BUSCOU]] secao 8).
- Dashboard mostra progresso em tempo real ("Pesquisando... Escrevendo... Revisando... Publicando").
- Notificacao proativa quando o primeiro artigo vai ao ar.

**Metrica:** TTFV medio < 60h.

---

## 3. Decepcao com qualidade do conteudo

**Problema:** conteudo gerado por IA nao atende expectativa — tom errado, informacoes superficiais, "cara de IA".

**Impacto:** perda de confianca. Cliente questiona o investimento. Se nao corrigido, vira caso de atendimento e reputacao.

**Deteccao:** cliente da thumbs down no dashboard, abre ticket de suporte, ou edita > 30% do artigo publicado.

**Solucao:**
- [[Agente Revisor]] com score minimo 75/100 (rigor maior no primeiro artigo: 80).
- Calibracao de tom por cliente: wizard coleta exemplos de conteudo que o cliente gosta.
- Feedback loop: thumbs up/down alimenta ajuste nos prompts do [[Agente Redator]].
- Sempre deixar cliente poder reescrever trecho diretamente no dashboard (mudancas viram exemplo para proximos artigos).

**Metrica:** taxa de aprovacao > 90%, score medio > 80.

---

## 4. Expectativa irreal de resultados

**Problema:** cliente espera pagina 1 do Google na primeira semana. SEO/AIO leva 30-90 dias para sinais solidos.

**Impacto:** frustracao em 30-60 dias. Risco de reclamacao publica e de perda de confianca mesmo com o motor funcionando.

**Deteccao:** tickets perguntando "por que ainda nao estou na primeira pagina?", login diario checando ranking.

**Solucao:**
- Onboarding inclui video educativo: "O que esperar nos primeiros 90 dias".
- Dashboard mostra metricas de progresso — impressoes, indexacao, AI Overviews conquistadas — nao so posicao final.
- Marcos intermediarios: D7 (blog no ar), D15 (indexado), D30 (primeiras impressoes), D60 (primeiros cliques), D90 (primeiros rankings pagina 1).
- [[Agente Suporte]] com respostas prontas embasadas em dados reais.

**Metrica:** tickets sobre "falta de resultado" < 10% dos clientes/mes. NPS D30 vs D90 crescente.

---

## 5. Confusao no dashboard

**Problema:** dashboard com muitas metricas. Cliente (muitas vezes dono de negocio local sem fluencia em SEO) nao sabe o que olhar.

**Impacto:** cliente para de acessar, perde conexao com o servico, nao percebe o valor entregue.

**Deteccao:** logins caindo mes a mes, tempo medio no dashboard < 1 min.

**Solucao:**
- **Health Score unico** de 0-100 resumindo saude do projeto. Verde (>70), Amarelo (40-70), Vermelho (<40).
- Dashboard em 3 niveis:
  1. Health Score + resumo executivo (default).
  2. Metricas detalhadas (clicar para expandir).
  3. Dados brutos (exportacao CSV).
- Tooltips explicativos em cada metrica.
- Tour guiado no primeiro acesso.

**Metrica:** tempo medio no dashboard > 3 min, profundidade de scroll > 60%.

---

## 6. Frustracao com suporte

**Problema:** [[Agente Suporte]] IA nao resolve o problema. Quando escala para humano, demora.

**Impacto:** NPS cai. Suporte e o ultimo recurso — se falha, cliente abandona emocionalmente mesmo continuando a receber artigos.

**Deteccao:** conversa com IA > 5 mensagens sem resolucao, rating < 3/5, ticket humano alem do SLA.

**Solucao:**
- [[Agente Suporte]] treinado com base de conhecimento + historico do cliente.
- Escalacao automatica para humano apos 3 mensagens sem resolucao ou a pedido do cliente.
- SLA unico: resposta humana em ate 24h para questoes nao criticas; 4h para blog fora do ar.
- Confirmacao ao cliente quando ticket humano e aberto: "Recebemos. Um humano responde em ate 24h."
- Pesquisa de satisfacao apos cada atendimento.

**Metrica:** resolucao na IA > 70%, CSAT > 4/5.

---

## 7. Parcela do parcelamento 12x falha

**Problema:** cartao do cliente recusado em uma das 12 parcelas. Nao e mensalidade (compra foi unica), mas o fluxo financeiro existe por 12 meses.

**Impacto:** se nao tratado, cobranca fica em aberto. Cliente que quer continuar nao consegue resolver o pagamento.

**Deteccao:** webhook do gateway (`invoice.payment_failed`, `subscription.payment_failed` — dependendo do provider).

**Solucao:**
- Gateway (Stripe ou Asaas) dispara smart retry automatico (D+1, D+3, D+5).
- [[Agente Pagamento]] envia WhatsApp amigavel em D+1: "Problema com sua parcela deste mes. Atualize aqui: [link]."
- Oferta de troca de metodo (cartao → Pix).
- Nao interrompe servico por padrao — compra foi unica, motor segue publicando. Apos 30 dias de parcela em aberto, o caso vira dunning humano.

**Metrica:** recuperacao de parcelas falhas > 60%, resolucao media < 3 dias.

---

## 8. Desengajamento silencioso

**Problema:** cliente para de acessar o dashboard, nao le relatorios, nao da feedback. O motor roda sozinho, mas o cliente esqueceu.

**Impacto:** cliente nao percebe o valor entregue. Quando chega o fim do parcelamento ou proposta de servico adicional, ele rejeita ("nao via valor").

**Deteccao:** score composto — logins < 2/mes, nenhum feedback em 30 dias, relatorio nao aberto, nenhuma interacao com suporte.

**Solucao:**
- Alerta proativo: [[Agente Suporte]] envia WhatsApp com 3 metricas-chave no corpo da mensagem (sem precisar abrir dashboard): "Oi! Neste mes seu blog teve +X% de impressoes, Y artigos novos publicados, Z keywords ranqueando."
- Para clientes de alto ticket ou nichos estrategicos: humano agenda call proativa.
- Marcos de conquista no dashboard ("100 keywords indexadas!", "Primeira citacao em AI Overview!").

**Metrica:** score de engajamento medio > 60/100.

---

## 9. Comparacao com concorrente

**Problema:** cliente ve ferramenta concorrente (Frase, SurferSEO, Jasper, agencia local) com uma feature que a buscou.ai nao tem, ou preco aparentemente menor para uma funcao.

**Impacto:** semeia duvida. Se o diferencial nao for obvio, o cliente questiona o investimento.

**Deteccao:** mencao a concorrente em ticket, pesquisa de NPS citando alternativa, cliente pedindo feature que concorrente tem.

**Solucao:**
- Battlecards no [[Agente Suporte]]: comparativos honestos (pontos fortes e fracos de cada concorrente).
- Diferencial claro: a buscou.ai e **done-for-you** (nao ferramenta), gera **90 conteudos/mes** (nao 1-5), cobra **uma vez** (nao mensalidade), e foca em **Blog + Motor** com SEO + AIO integrados.
- Roadmap publico de features por prioridade.
- Lock-in positivo: quanto mais tempo, mais historico, mais dificil sair (dog-fooding cresce ativo do cliente).

**Metrica:** mencoes de concorrente em tickets < 5% dos atendimentos/mes.

---

## 10. Cliente quer mais volume

**Problema:** cliente fica satisfeito com o resultado de 90 artigos/mes e pergunta "posso ter mais?".

**Impacto:** positivo — e sinal de satisfacao, nao de friccao. Mas a V1 nao trata volume adicional no escopo canonico.

**Deteccao:** ticket pedindo volume maior, cliente cita que outros blogs dele poderiam receber o mesmo tratamento.

**Solucao V1:** nao existe upsell automatico. Pedido vira oportunidade de venda de **novo projeto** (novo dominio → nova oferta R$ 2.500 / R$ 3.000). Cada blog e uma compra separada.

**Solucao V1.2+:** avaliar se faz sentido abrir SKU "dois blogs por cliente" — mas so depois de validar oferta unica com os primeiros 50-100 clientes. Nao e prioridade agora.

**Metrica:** pedidos de volume adicional por mes (sinaliza apetite por expansao de oferta).

---

## Matriz de prioridade

| Ponto critico | Impacto em retencao | Facilidade de resolver | Prioridade |
|---|---|---|---|
| Time-to-first-value | Alto | Media | P0 |
| Abandono de onboarding | Alto | Alta | P0 |
| Expectativa de resultados | Alto | Alta | P1 |
| Qualidade do conteudo | Alto | Media | P1 |
| Falha de parcela | Medio | Alta | P1 |
| Desengajamento silencioso | Alto | Baixa | P2 |
| Confusao no dashboard | Medio | Media | P2 |
| Frustracao com suporte | Medio | Media | P2 |
| Comparacao com concorrente | Medio | Baixa | P3 |
| Cliente quer mais volume | Baixo (positivo) | Baixa | P3 |

P0 obrigatorio no MVP. P1 em V1.1. P2 em V1.2. P3 avaliado caso a caso.

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 5, 7, 8 — ultima verificacao 2026-04-23.*
