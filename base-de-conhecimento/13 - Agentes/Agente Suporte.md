---
tipo: agente
area: Sistema
tags: [agente, suporte, atendimento, chat, knowledge-base]
atualizado: 2026-04-23
---

# Agente Suporte

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. O Agente Suporte atende clientes ativos 24/7 via chat in-app e WhatsApp. Meta: resolver > 85% das duvidas sem humano. Escalacao automatica para humano quando necessario (SLA 24h; 4h se critico).

Relacionado: [[Arquitetura de Agentes]] | [[Orquestrador]] | [[SLAs e Garantias]] | [[Jornada do Cliente]] | [[Pontos Criticos UX]]

---

## Funcao

Primeiro ponto de contato para clientes ativos. Responde duvidas sobre:
- Status de publicacao, calendario editorial, cadencia do pipeline.
- Funcionamento do dashboard e relatorios.
- Ajustes de tom, keyword, configuracao de onboarding.
- Parcelas da implementacao 12x e cobrancas da infra mensal (escala para [[Agente Pagamento]] em duvidas financeiras; explica politica de pausa/retomada do motor).
- Primeiros sinais, timeline, interpretacao de metricas.

Sem upsell nem venda ativa. Cancelamento da infra mensal e self-service no dashboard — cliente pode pausar quando quiser; motor para de publicar e blog continua no ar.

---

## Input

- **Mensagem do cliente**: chat in-app ou WhatsApp.
- **Contexto do cliente**: projeto, dominio, calendario editorial, metricas recentes (via [[Agente Monitor]]).
- **Status de pagamento**: via [[Agente Pagamento]] (se duvida for financeira).
- **Knowledge base interna**: FAQ, procedimentos, troubleshooting.
- **Historico do ticket**: interacoes anteriores.

## Output

- **Resposta**: clara, empatica, acionavel.
- **Ticket criado/atualizado** em `conversas_suporte`.
- **Escalacao para humano** (quando necessario): transfer com contexto completo.
- **Feedback loop**: perguntas frequentes sinalizam gaps na knowledge base.

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| Claude Sonnet 4 | Compreensao + busca na KB + resposta contextual |
| Knowledge base (Supabase/Notion) | FAQ, procedimentos, troubleshooting, politicas |
| Intercom / Crisp / chat nativo | Widget in-app, historico de conversas, ticketing |
| WhatsApp Business API | Canal alternativo |
| PostgreSQL | Dados do cliente, projeto, metricas |
| Slack API | Escalacao para equipe humana |
| MCP Tools | `search_kb`, `get_client_context`, `create_ticket`, `escalate` |

---

## Gatilho

- **Mensagem do cliente**: webhook de novo chat.
- **Ticket reaberto**: cliente responde ticket resolvido.
- **Proativo (V1.2+)**: detecta queda anomala de trafego, alerta o cliente antes de ele perguntar.

---

## Criterios de sucesso

| Metrica | Meta |
|---|---|
| FCR (First Contact Resolution) | > 85% |
| Tempo de primeira resposta | < 30s (chat em tempo real) |
| CSAT | > 4,5/5 |
| Taxa de escalacao para humano | < 15% |
| Resolucao correta (validada por sampling mensal) | > 98% |
| Tom adequado | Empatico, profissional, sem respostas genericas |

---

## Casos de erro

1. **Pergunta fora do escopo V1** (ex: "voces fazem design de logo?"): responder honestamente que nao faz parte da oferta e sugerir alternativa.
2. **Cliente irritado**: reconhecer a frustracao, oferecer solucao concreta. Se nao resolver, **escalar IMEDIATAMENTE** para humano.
3. **Dados inconsistentes** (dashboard vs relato do cliente): verificar em tempo real (GSC, Ahrefs) antes de responder. Nunca negar a experiencia do cliente.
4. **Knowledge base desatualizada**: marcar topico como `NEEDS_UPDATE` e escalar.
5. **Multiplas perguntas em uma mensagem**: responder cada uma separadamente e de forma organizada.
6. **Duvida financeira** (parcela, reembolso): redirecionar para [[Agente Pagamento]] quando for tecnica; escalar para humano quando for sensivel.

---

## Fallback

- **Claude API falha**: ativar respostas pre-programadas (top 20 FAQs via keyword matching). Pergunta fora do top 20 → cria ticket automatico + notifica equipe.
- **KB inacessivel**: cache local das 50 perguntas mais frequentes. Pergunta fora → escala.
- **Chat widget falha**: redirecionar para formulario + auto-resposta informando SLA 4h.
- **Sem humano disponivel para escalacao imediata**: informar SLA (ate 24h) e criar ticket prioritario.

---

## Dependencias

- **Depende de**: [[Orquestrador]], KB, Claude Sonnet, chat widget, [[Agente Pagamento]] (duvidas financeiras).
- **Quem depende**: equipe humana (recebe escalacoes).
- **Referencia**: [[SLAs e Garantias]], [[Jornada do Cliente]], [[Pontos Criticos UX]], [[VERDADE_UNICA_BUSCOU]].

---

## Exemplo de execucao

**Cenario:** cliente pergunta sobre queda de trafego.

```
1. [10:15] Cliente envia via chat:
   "Oi, vi que meu trafego caiu 30% essa semana. O que houve?"

2. [10:15] Suporte recebe webhook → carrega contexto:
   - Projeto: clinica de estetica em Vitoria-ES
   - Cliente ativo ha 4 meses
   - Metricas: trafego realmente caiu 28% na semana
   - Alerta do Monitor: Google Core Update detectado 3 dias atras

3. [10:15] Suporte consulta KB:
   - Match: "queda de trafego apos Core Update" → procedimento documentado

4. [10:15] Suporte responde (< 15s):
   "Oi! Boa observacao — houve mesmo uma variacao nos ultimos dias. 
    O Google lancou um Core Update na terca-feira, e flutuacoes 
    nas primeiras 2 semanas apos um update sao normais.
    
    Olhando seus dados:
    - Suas keywords principais ('harmonizacao facial Vitoria') 
      continuam estaveis na posicao 4.
    - A queda esta em keywords long-tail informacionais.
    - Historicamente, recuperam em 10-14 dias.
    
    Nosso time ja esta acompanhando. Se nao recuperar em 2 semanas, 
    acionamos o Estrategista para ajustar.
    
    Quer um mini-relatorio com status de cada keyword?"

5. [10:16] Cliente: "Manda sim, obrigado!"

6. [10:16] Suporte gera mini-relatorio via dados do Monitor e envia.

7. [10:17] Ticket: { categoria: "performance", status: "resolvido",
   fcr: true, csat_survey: enviada }
```

**Tempo total**: 2 min. **Custo**: ~$0,04.

---

## Custo estimado

| Componente | Custo |
|---|---|
| Claude Sonnet (~3k tokens por interacao, 3-5 turnos) | ~$0,03-0,05 |
| Chat widget (plano rateado) | ~$0,01 |
| KB lookup | Gratuito |
| **Total por ticket** | **~$0,03-0,06** |

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 5, 7, 8 — ultima verificacao 2026-04-23.*
