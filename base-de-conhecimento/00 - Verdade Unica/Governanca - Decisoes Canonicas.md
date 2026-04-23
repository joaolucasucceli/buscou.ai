---
tipo: estrategia
area: Empresa
tags: [governanca, decisoes-canonicas, processo, trava]
atualizado: 2026-04-23
---

# Governanca — Decisoes Canonicas

> Como manter a base de conhecimento consistente e evitar que o projeto
> volte a ter ambiguidade estrategica.

---

## Principio geral

**Decisoes canonicas sao a espinha dorsal do projeto. Mudam pouco. Mudam com cuidado.**

Quando uma decisao vira canonica, ela entra em [[VERDADE_UNICA_BUSCOU]] e
todos os arquivos do vault passam a refletir essa decisao. Contradicao
com a verdade unica = defeito a corrigir.

---

## O QUE NAO PODE SER ALTERADO (sem Decision Log)

As seguintes decisoes estao TRAVADAS em [[VERDADE_UNICA_BUSCOU]]:

### Nivel 1 — Inegociavel (exige Decision Log + justificativa forte)

1. **Posicionamento central** — "Se alguem buscou, quem apareceu foi voce?"
2. **Modelo comercial** — Implementacao unica (R$ 2.500 a vista via Pix ou R$ 3.000 em 12x no cartao) + infra mensal obrigatoria R$ 300/mes (cartao recorrente). Pacote inseparavel. Ver [[Decision Log - 2026-04-23 - Infra Mensal]].
3. **Definicao de produto** — Blog (estrutura) + Motor (buscou.ai, 90 conteudos/mes).
4. **Nao-SaaS de servico, nao-agencia, nao-consultoria** — vendemos tecnologia. Infra mensal cobre infraestrutura+tokens, nao servico humano.
5. **Nome da marca** — `buscou.ai` (visual) e `BuscouAI` (juridico).

### Nivel 2 — Estavel (pode mudar com calibragem, sem Decision Log formal)

6. **ICP primario** — negocios locais. Pode refinar nichos, mas o foco permanece local.
7. **Canais principais** — Google (SEO) + IA (ChatGPT, Gemini, Perplexity, Claude, AI Overviews). Adicionar canais requer nota explicando.
8. **Linguagem** — termos proibidos e permitidos (secao 6 da Verdade Unica). Pode refinar, mas nao reintroduzir termos banidos.

### Nivel 3 — Evolutivo (muda conforme aprendizado)

9. **Taticas de aquisicao** — prospecao ativa, organico, indicacao, anuncios. Livre para experimentar.
10. **Playbooks de SEO/AIO** — evoluem com o mercado.
11. **Conteudo dos blogs dos clientes** — por definicao, varia por nicho.
12. **Tooling interno** — qual LLM, qual CMS, qual infraestrutura. Decisao tecnica.

---

## O QUE PODE EVOLUIR

Qualquer coisa **nao** listada como Nivel 1 ou Nivel 2 pode ser alterada
livremente, desde que nao crie contradicao com a Verdade Unica.

Exemplos:
- Refinar nichos dentro do ICP local (ex.: focar em clinicas odonto antes de advogados).
- Mudar landing page, CTA, copy — desde que mantenham o posicionamento.
- Mudar stack tecnica.
- Adicionar metricas ao dashboard.
- Criar novos conteudos e notas no vault.

---

## COMO PROPOR MUDANCAS

### Para alteracao em Nivel 1 (inegociavel)

1. **Abrir Decision Log** em `14 - Empresa/Decision Log - YYYY-MM-DD.md` com:
   - Contexto (o que mudou no mercado/aprendizado que motiva).
   - Decisao atual (o que esta em [[VERDADE_UNICA_BUSCOU]]).
   - Decisao proposta.
   - Impacto: listar arquivos que mudam.
   - Trade-offs.
2. **Aguardar decisao explicita do dono do projeto.**
3. Se aprovada: atualizar [[VERDADE_UNICA_BUSCOU]] com `atualizado: YYYY-MM-DD` e versionamento no topo.
4. **Cascata obrigatoria**: atualizar TODOS os arquivos afetados em ate 7 dias.
5. Referenciar o novo Decision Log em [[VERDADE_UNICA_BUSCOU]].

### Para alteracao em Nivel 2 (estavel)

1. Atualizar o arquivo afetado direto (sem Decision Log formal).
2. Se mudanca for grande (ex.: reformular lista de termos proibidos), anotar em secao "Historico" do arquivo.
3. Se criar risco de contradicao, abrir Decision Log.

### Para alteracao em Nivel 3 (evolutivo)

1. Editar arquivos livremente.
2. Manter `atualizado: YYYY-MM-DD` sempre correto.
3. Remover ou marcar obsoleto conteudo que deixou de ser valido.

---

## COMO MANTER CONSISTENCIA

### Checklist ao criar nota nova

- [ ] Frontmatter completo (tipo, area, tags, atualizado).
- [ ] Lida [[VERDADE_UNICA_BUSCOU]] antes de escrever sobre produto/oferta/ICP?
- [ ] Linguagem respeita termos permitidos/proibidos?
- [ ] Nome da marca em `buscou.ai` / `BuscouAI`?
- [ ] Wiki-links para notas relacionadas?
- [ ] Template apropriado de `Templates/` foi usado?

### Checklist ao editar nota existente

- [ ] Atualizei o campo `atualizado`?
- [ ] Conteudo continua coerente com [[VERDADE_UNICA_BUSCOU]]?
- [ ] Wiki-links citados continuam existindo?

### Auditoria periodica (a cada 30 dias)

Rodar:
1. Grep por termos proibidos em todo o vault — nenhum deve aparecer em copy/documentacao externa.
2. Grep por capitalizacoes erradas (`Buscou.ai`, `Buscou.AI`, etc).
3. Verificar `atualizado` — notas com mais de 90 dias sem update merecem revisao.
4. Cross-check entre `14 - Empresa/*` e [[VERDADE_UNICA_BUSCOU]] — contradicoes = bugs.

---

## DONO DAS DECISOES

- **Decisoes Nivel 1:** dono do projeto (Joao Lucas Ucceli).
- **Decisoes Nivel 2:** dono do projeto, com possibilidade de delegar para responsavel de area.
- **Decisoes Nivel 3:** executor direto.

Quando houver duvida sobre nivel: **tratar como Nivel 1 ate provar o contrario.**

---

## ESTRUTURA DO DECISION LOG

Todo Decision Log segue formato:

```markdown
---
tipo: estrategia
area: Empresa
tags: [decision-log, canonico]
atualizado: YYYY-MM-DD
---

# Decision Log — YYYY-MM-DD

## Contexto
Que situacao gerou a decisao.

## Decisao anterior
O que estava vigente em [[VERDADE_UNICA_BUSCOU]].

## Nova decisao
O que passa a vigorar.

## Justificativa
Por que mudar.

## Trade-offs
O que se ganha, o que se perde.

## Arquivos afetados
Lista de arquivos que precisam ser atualizados.

## Prazo de cascata
Data limite para todos os arquivos estarem alinhados.

## Aprovacao
Dono do projeto + data.
```

---

## SINALIZADORES DE VIOLACAO

Alertas que indicam que a verdade unica esta sendo comprometida:

- Copy de site usa termo proibido ("agencia", "consultoria", "mensalidade").
- Material de vendas fala em "planos" ou "tiers".
- Doc interno descreve produto como "SaaS" em contexto comercial.
- Proposta de Valor diverge de Oferta Comercial.
- Dois MOCs dizem coisas diferentes sobre o mesmo assunto.
- ICP citado em landing muda entre paginas.

Qualquer um desses = bug. Abrir issue interna para corrigir.

---

## Links cruzados

- [[VERDADE_UNICA_BUSCOU]] — a trava canonica
- [[Decision Log - 2026-04-23]] — primeiro decision log (estabelece Nivel 1)
- [[MOC - Empresa]] — blueprint
- [[MOC - Identidade Visual]] — regras de marca
