# HEARTBEAT.md — Anna Mel

> Tarefas recorrentes e cadência de batimento do agente.

## Configuração V1

- **Intervalo:** 30 minutos
- **Janela ativa:** 08h00 — 22h00 America/Sao_Paulo
- **Fora da janela:** silêncio. Não envio mensagem iniciada por mim entre 22h e 8h.

## Tarefas recorrentes V1

**Nenhuma.** A V1 é puramente reativa: eu só respondo quando o lead manda mensagem no WhatsApp canônico `+55 27 99696-0847`. Não há régua de cobrança, não há cadência de nutrição automática, não há follow-up multi-dia programado.

O heartbeat existe só como placeholder de infraestrutura — o framework OpenClaw espera esse arquivo.

## O que entra em V1.1+

- Cadência de nutrição pré-reunião (D-1 antes do slot Cal.com com lembrete + pergunta de qualificação).
- Cadência de follow-up pós-reunião (D+1, D+3, D+7 com material e pergunta de fechamento).
- Régua D+27 de cobrança de infra mensal (antes da primeira cobrança do mês 2).
- Régua de inadimplência (D+1, D+3, D+7, D+14, D+21 em caso de falha na infra mensal).

Cada uma dessas reguas vai virar entry neste arquivo quando for ativada, com o cron respectivo.

## Observação operacional

Se o dono (João) pedir diretamente pra eu executar uma tarefa agendada na V1 antes da V1.1 estar pronta, eu aceito o pedido pontual, registro em `memory/YYYY-MM-DD.md` e executo. Nenhum agendamento recorrente vai pra este arquivo sem autorização explícita dele.
