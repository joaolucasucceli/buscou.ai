---
tipo: produto
area: Resiliencia
tags: [produto, falhas, sistemico, fmea, riscos]
atualizado: 2026-04-23
---

# Failure Modes

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. O [[Tratamento de Falhas]] cobre falhas tecnicas dos agentes. Este documento cobre falhas **sistemicas** — quando o produto funciona tecnicamente mas nao entrega valor, ou quando o negocio encontra riscos estruturais. FMEA aplicado ao produto, nao ao codigo.

Relacionado: [[Tratamento de Falhas]] | [[Time to Value]] | [[North Star Metric]] | [[Feedback Loop]] | [[Pontos Criticos UX]]

---

## FMEA — Failure Mode and Effects Analysis

Risk Priority Number (RPN) = Probabilidade (P) × Impacto (I) × Detectabilidade Inversa (D). Escala 1-10 para cada. RPN maximo = 1.000. Acima de 200 = acao obrigatoria.

| # | Modo de Falha | P | I | D | RPN | Leading indicator |
|---|---|---|---|---|---|---|
| 1 | TTV lento (>7 dias sem blog no ar) | 6 | 8 | 5 | 240 | Onboarding incompleto em 48h |
| 2 | Conteudo de baixa qualidade | 6 | 8 | 3 | 144 | Score do Revisor < 70 |
| 3 | Expectativa irreal do cliente | 5 | 9 | 8 | 360 | Cliente pergunta "cade a pagina 1?" na semana 1 |
| 4 | Nicho muito competitivo | 5 | 6 | 5 | 150 | KD medio > 60 nas keywords alvo |
| 5 | Cliente desengaja apos primeiro sinal | 6 | 7 | 7 | 294 | Login < 1x/semana no mes 2 |
| 6 | Sistema nao escala (>50 clientes) | 3 | 10 | 7 | 210 | Tempo de processamento > 2h |
| 7 | Concorrente lanca feature similar | 5 | 5 | 3 | 75 | Release notes de concorrentes |
| 8 | Dependencia de API (Anthropic/OpenAI muda pricing) | 4 | 9 | 6 | 216 | Anuncio de mudanca de preco/termos |
| 9 | Google penaliza conteudo IA | 3 | 10 | 7 | 210 | Core update + queda generalizada |
| 10 | Cliente nao conecta GSC/CMS | 6 | 7 | 3 | 126 | Setup incompleto apos 72h |
| 11 | Parcela 12x com inadimplencia prolongada | 4 | 6 | 4 | 96 | 3 parcelas em aberto em 30 dias |

---

## Detalhamento dos top 5 por RPN

### #3 — Expectativa irreal do cliente (RPN 360)

**Problema:** cliente compra esperando pagina 1 em 7 dias. SEO leva 30-90 dias. Frustracao antes do resultado aparecer.

**Deteccao precoce:**
- Perguntas no onboarding: "quando eu apareco na primeira pagina?".
- Tickets na semana 1 pedindo resultado.
- NPS baixo no survey do dia 14.

**Acao preventiva:**
- Onboarding inclui video "O que esperar nos primeiros 90 dias" (obrigatorio antes de ativar).
- Timeline de marcos visivel no [[Dashboard do Cliente]] (ver [[Time to Value]]).
- E-mail sequencial educativo: dia 1, 7, 14, 30 explicando o processo.
- Copy da landing e onboarding deixa explicito: "blog no ar em 7 dias, primeiros sinais em 30 dias, rankings fortes em 90 dias".

**Acao corretiva:**
- Call proativa de 15 min para realinhar expectativa.
- Mostrar metricas intermediarias: impressoes, indexacao, IVT parcial.
- Quick wins artificiais para gerar valor percebido rapido.

**Owner:** [[Agente Suporte]] (deteccao) + humano (call de realinhamento).

---

### #5 — Cliente desengaja apos primeiro sinal (RPN 294)

**Problema:** cliente ve resultado inicial mas para de acessar dashboard no mes 2. Quando chega o fim do parcelamento ou uma oferta de expansao (novo blog/dominio), rejeita sem validar valor.

**Deteccao precoce:**
- Login frequency < 1x/semana no mes 2.
- Nao abriu relatorio do mes 2.
- IVT (citacoes em IA) estagnado entre mes 1 e mes 2.
- Zero interacao com suporte (cliente silencioso = em risco).

**Acao preventiva:**
- Health score por cliente (login + IVT trend + tickets + NPS).
- Clientes com health score < 40 → alerta para [[Agente Suporte]].
- Envio semanal de 3 metricas-chave via WhatsApp (sem precisar abrir dashboard).
- Marcos de conquista visiveis no dashboard ("100 keywords indexadas!").
- Call proativa no dia 60 para Clientes de alto NSM.

**Acao corretiva:**
- Call de reengajamento humana.
- Ajustar estrategia se resultado fraco (mais keywords faceis, cluster diferente).
- Exit survey para alimentar aprendizado caso saia do ciclo.

**Owner:** [[Agente Suporte]] (deteccao) + humano (call).

---

### #1 — TTV lento (RPN 240)

**Problema:** cliente nao ve nada em 7 dias. Nao e lentidao de SEO — e falha operacional (blog nao publicado, dashboard sem dados).

**Deteccao precoce:**
- Onboarding incompleto em 48h (GSC nao conectado, dominio nao configurado).
- Primeiro artigo nao publicado ate dia 5.
- Dashboard sem dados apos dia 7.

**Acao preventiva:**
- Wizard com progresso visivel + checklist obrigatorio.
- Fila de prioridade: novos clientes processados antes dos existentes.
- SLA interno: primeiro artigo em 48h (teto canonico 7 dias em [[VERDADE_UNICA_BUSCOU]] secao 8).
- Quick wins no dia 1: baseline AIO, analise competitiva, schema markup do primeiro artigo.

**Acao corretiva:**
- Alert no Supabase: marco nao atingido → notifica [[Agente Suporte]] + humano.
- Humano entra em contato proativamente (nao espera cliente reclamar).
- Fix manual se agente falhou (publicar conteudo manualmente se necessario).
- Postmortem: por que foi lento? Fix sistemico.

**Owner:** [[Agente Monitor]] (deteccao) + [[Agente Suporte]] (acao) + humano (escalacao).

---

### #8 — Dependencia de API (RPN 216)

**Problema:** Anthropic ou OpenAI aumentam preco, mudam termos, depreciam modelos. Margem cai dramaticamente.

**Deteccao precoce:**
- Monitorar blog/changelog dos providers semanalmente.
- Custo por artigo subindo sem aumento de volume.
- Novo modelo lancado com pricing diferente.

**Acao preventiva:**
- Multi-model: sistema funciona com Claude + GPT-4 + modelos open-source (fallback).
- Reserva financeira: 3 meses de custo de API em caixa.
- Contratos de volume quando possivel (pricing locked).
- Otimizar prompts continuamente (reduzir tokens).

**Acao corretiva:**
- Switch para modelo mais barato se threshold de qualidade for mantido.
- Acelerar uso de open-source (Llama, Mistral) para tarefas menos cognitivas.
- Ajuste de oferta (ultimo recurso, exige Decision Log Nivel 1).

**Owner:** fundador/CTO (estrategia) + financeiro (custo).

---

### #6 — Sistema nao escala (RPN 210)

**Problema:** com >50 clientes, filas ficam longas, jobs falham por timeout, experiencia degrada.

**Deteccao precoce:**
- Tempo medio de job > 2h (normal: 15-30 min).
- Taxa de erro > 5% (normal: < 1%).
- Custo de API por cliente > R$ 160/mes (teto operacional).

**Acao preventiva:**
- Arquitetura de filas com prioridade (novos > re-otimizacao > monitoramento).
- Rate limiting por cliente (fairness).
- Infra elastica: Supabase Edge Functions escalam automaticamente.
- Load testing mensal simulando 2x a base.
- Monitoramento de custos por cliente em tabela `client_costs`.

**Acao corretiva:**
- Pausar jobs nao-criticos (reduzir frequencia de monitoramento).
- Escalar infra (mais workers, mais API).
- Otimizar prompts (reduzir tokens).
- Waitlist temporario para novos clientes se necessario.

**Owner:** fundador/CTO (infra) + [[Orquestrador]] (filas).

---

## Plano de revisao

- **Mensal:** revisar leading indicators — algum esta acendendo?
- **Trimestral:** recalcular RPN com dados reais (P muda com base de clientes).
- **A cada incidente:** postmortem + atualizar FMEA.

---

## Notas e referencias

- Tratamento tecnico de falhas dos agentes: [[Tratamento de Falhas]]
- Timeline de valor e marcos: [[Time to Value]]
- North Star impactada por falhas: [[North Star Metric]]
- Feedback loop que mitiga falhas: [[Feedback Loop]]
- Oferta comercial (previne expectativa irreal): [[Oferta Comercial]]
- Dashboard do cliente: [[Dashboard do Cliente]]
- Roadmap de produto (escala): [[Roadmap do Produto]]
- Pontos criticos UX: [[Pontos Criticos UX]]

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 7, 8 — ultima verificacao 2026-04-23.*
