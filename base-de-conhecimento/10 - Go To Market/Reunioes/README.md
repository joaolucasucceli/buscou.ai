---
tipo: convencao
area: Vendas
tags: [convencao, reuniao, playbook, vendas]
atualizado: 2026-04-24
---

# Reuniões — Convenção de registro

**⚠️ Mudança de convenção em 2026-04-24.** Esta pasta NÃO recebe mais atas novas per-cliente. Detalhes abaixo.

## Nova convenção (vigente)

Reuniões de venda da buscou.ai **não geram mais ata per-cliente**. A razão operacional:

1. Manter um CRM interno (quem fechou, quem está em negociação, status de deal, próximos passos de cliente X) **não é responsabilidade do vault** — isso é operação comercial de dia-a-dia e mora em outras ferramentas (Linear issue da umbrella de venda, WhatsApp do dono).
2. O aprendizado **transferível** de uma reunião — objeções novas, argumentos que funcionaram, padrões de persona — pertence a **playbooks abstratos** que generalizam, não a arquivos per-cliente que ninguém mais consulta depois.
3. Salvar transcrição completa tem baixo valor marginal (transcrição é longa, tem ruído, rapidamente desatualiza) e alto custo (acúmulo de material sensível que não é usado).

### Fluxo novo

Toda reunião de diagnóstico agora segue:

1. **Dono faz a reunião.** Grava ou tem transcrição.
2. **Dono manda transcrição pro Claude Code** com pedido de proposta (ex: "gera proposta pra X").
3. **Skill `gerador-proposta-buscou`** entra em ação:
   - Gera PDF alta resolução em `C:\Users\joaol\Desktop\Propostas Buscou\<slug>-<data>.pdf`
   - Absorve transcrição em **nível de persona** (não de cliente):
     - Objeção nova descoberta → update em [[Oferta Comercial]] seção "Objecoes" (abstrato, sem nome do cliente)
     - Argumento novo → playbook canônico, sem contexto do cliente específico
     - Feature pedida → Linear issue abstrata ("Persona X pede feature Y")
     - Regra canônica nova → Decision Log datado (requer aprovação do dono)
   - **Não** salva transcrição
   - **Não** cria arquivo nesta pasta
4. **Entrega no chat:** caminho do PDF + resumo de aprendizados absorvidos.
5. **Dono envia PDF** manualmente via WhatsApp pro cliente.

### Status operacional do deal

Se o dono precisa rastrear "Innovate LED está em negociação, followup em D+6", esse tracking fica em **Linear issue** (umbrella da venda BAI-XX), não aqui. Exemplo vigente: BAI-71 umbrella Innovate LED + sub-issues de followup BAI-73 e BAI-74.

## Arquivos nesta pasta

Um único arquivo histórico está preservado aqui como **registro de primeira venda real da buscou.ai**:

- `2026-04-24 - Innovate LED - Mary Alves.md` — primeira ata da empresa, criada no BAI-71 antes da mudança de convenção. Mantida como marco.

**Nenhum arquivo novo entra nesta pasta daqui pra frente.**

## Para onde vão os aprendizados

| Tipo de aprendizado | Destino |
|---|---|
| Objeção nova descoberta | `03 - Oferta/Oferta Comercial.md` seção "Objecoes e respostas" (abstrato, sem nome do cliente) |
| Argumento novo que funcionou | `03 - Oferta/Oferta Comercial.md` relevante ou Decision Log se for canônico |
| Padrão de persona observado | Playbook próprio em `10 - Go To Market/Padrao - <nome do padrão>.md` (ex: `Padrao - Reuniao com Intermediario.md`) |
| Feature pedida pela persona | Linear issue abstrata + update em `04 - Produto/Roadmap do Produto.md` |
| Regra canônica nova (preço, desconto, prazo) | Decision Log datado em `05 - Modelo de Negocio/` + update na VERDADE_UNICA |

## Links cruzados

- [[Oferta Comercial]] — playbook do pitch canônico + objeções (atualizado continuamente)
- [[Padrao - Reuniao com Intermediario]] — primeiro playbook abstrato da nova convenção
- Skill `gerador-proposta-buscou` em `~/.claude/skills/gerador-proposta-buscou/SKILL.md`
- Umbrella Linear BAI-78 — sistema que materializa essa mudança
