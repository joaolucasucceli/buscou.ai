---
tipo: convencao
area: Vendas
tags: [convencao, reuniao, ata, vendas]
atualizado: 2026-04-24
---

# Reuniões — Convenção de registro

Esta pasta guarda as **atas das reuniões de venda** da buscou.ai (reuniões de diagnóstico com leads, conforme [[Oferta Comercial]] e [[VERDADE_UNICA_BUSCOU]] seção 8).

## Quando criar uma ata

Toda reunião de diagnóstico (mesmo curta, mesmo não-fit, mesmo com intermediário) gera ata. A ata é o registro único e durável daquilo que foi dito — nunca fiar memória ou transcrição bruta.

## Nomenclatura

Formato: `YYYY-MM-DD - Nome da Empresa - Interlocutor Principal.md`

Exemplos:
- `2026-04-24 - Innovate LED - Mary Alves.md`
- `2026-05-10 - Clinica Odontologica Sorriso - Dr. Pedro.md`

Se houver mais de uma reunião com a mesma empresa no mesmo dia: `2026-04-24 - Innovate LED - Mary Alves (1).md`, `(2)`, etc.

## Frontmatter obrigatório

```yaml
---
tipo: ata
area: Vendas
tags: [reuniao, venda, <slug-empresa>, <lead|cliente>]
atualizado: YYYY-MM-DD
status: lead | cliente-ativo | perdido | adiado
---
```

## Estrutura da ata

1. **Dados da reunião** — data, duração, participantes, link da transcrição
2. **Empresa** — nicho, região, origem do lead, quem decide
3. **Resumo executivo** — 2-3 parágrafos
4. **Desvios do script canônico** — honestidade intelectual sobre o que fugiu do padrão de [[Oferta Comercial]] (abertura, entendimento, metodologia, solução, oferta, fechamento)
5. **Pedidos do cliente** — o que ele pediu explicitamente (features, condições comerciais, ajustes)
6. **Oferta feita** — valores, condições, brindes, prazos prometidos
7. **Próximos passos** — ação imediata + followups programados + issues Linear criadas
8. **Observações** — qualquer insight, risco, aprendizado que valha registrar

## Regras

- **Não colar transcrição bruta.** A ata sumariza — transcrição linka via URL (Tactiq, Meet, outro).
- **Datas absolutas sempre.** Nunca "amanhã", "semana passada".
- **Vincular issue Linear da umbrella de venda** (BAI-X). A umbrella é o ponto de agregação de progresso comercial; a ata é o registro semântico.
- **Atualizar o campo `status` no frontmatter** quando o ciclo de venda se resolver (ganhamos / perdemos / adiou).

## Links cruzados

- [[Oferta Comercial]] — playbook do pitch canônico
- [[Go To Market Inicial]] — fluxo comercial
- [[VERDADE_UNICA_BUSCOU]] seção 8 — estrutura de venda consultiva
