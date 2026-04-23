---
tipo: produto
area: Requisitos
tags: [produto, automacao, humano, decisao]
atualizado: 2026-04-23
---

# O que Automatizar vs Humano

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. Nem tudo deve ser automatizado desde o dia 1. Este documento define a matriz de decisao por processo, com criterios claros de quando o humano intervem e quando o agente opera sozinho. Meta: migrar progressivamente para autonomia total conforme agentes acumulam dados e confianca.

Relacionado: [[Requisitos Produto Autonomo]] | [[Arquitetura de Agentes]] | [[Fluxo Operacional Completo]] | [[Roadmap do Produto]]

---

## Matriz de automacao por versao

| Processo | V1 MVP | V1 completa | V1.2+ | V2 | Razao da progressao |
|---|---|---|---|---|---|
| Keyword research | [[Agente Pesquisador]] | Auto | Auto | Auto | Dados-driven, objetivo |
| Estrategia/clusters | [[Agente Estrategista]] + aprovacao humana | [[Agente Estrategista]] + amostragem | Auto + amostragem 10% | Auto | Precisa validacao ate historico de acertos |
| Redacao | [[Agente Redator]] + revisao auto (score 75) | Auto | Auto | Auto | Revisor amadurece com corpus |
| Revisao de qualidade | [[Agente Revisor]] + sampling humano 10% | Auto + sampling 5% | Auto | Auto | Sampling calibra Revisor |
| Geracao de imagem | Unsplash + alt text | DALL-E 3 | Custom por marca | Custom | V1 usa banco, V1.1+ gera |
| Publicacao no CMS | Auto se score >= 75 | Auto se score >= 75 | Auto | Auto | Score protege o cliente |
| Distribuicao V1 (RSS + GSC) | Auto | Auto | Auto | Auto | Tecnico, sem risco |
| Distribuicao V1.2 (LinkedIn/Medium) | Nao existe | Nao existe | [[Agente Distribuidor]] auto | Auto | Entra em V1.2 |
| Monitoramento | [[Agente Monitor]] GSC | Auto (GSC + AIO) | Auto com triggers | Auto | Mais dados = melhores thresholds |
| Call opcional de venda | Humano (quando cliente pede) | Humano | Humano | Humano em tickets altos; auto-scheduler em tickets baixos | Confianca pessoal pesa em ticket alto |
| Onboarding | Wizard 5 passos (auto) | Auto | Auto | 100% self-service | UX ja validada |
| Suporte ao cliente | Humano (WhatsApp direto) | [[Agente Suporte]] + escalacao | Auto + escalacao rara | Auto; humano so em tier 3 | Suporte melhora com historico |
| Confirmacao de pagamento | [[Agente Pagamento]] (webhook) | Auto | Auto | Auto | Tecnico, sem risco |
| Acompanhamento de parcela 12x | Auto (gateway smart retry) | Auto | Auto | Auto | Gateway resolve |
| Dunning de parcela apos 30 dias | Humano | Humano | Humano | Auto (com alerta) | Conversao financeira e sensivel |
| Relatorio mensal | Dashboard auto | Auto + e-mail | Auto | Auto | Template validado |
| Prospeccao outbound | Manual (fundador) | [[Agente Prospeccao]] (e-mail) | Auto (+ LinkedIn) | Auto + canais adicionais | Valida copy antes de escalar |

---

## Criterios de decisao

Antes de automatizar qualquer processo, aplicar estas 5 perguntas:

### 1. Risco de erro e reversivel?
- **Sim** → automatizar agressivamente (pesquisa, monitoramento).
- **Nao** → manter human-in-the-loop ate confianca alta (publicacao, dunning).

### 2. A tarefa e deterministica ou criativa?
- **Deterministica** → automatizar imediatamente (confirmacao de pagamento, schema markup).
- **Criativa** → automatizar gradualmente com validacao (redacao, estrategia).

### 3. O custo de falha e alto?
- **Baixo** → automatizar (distribuicao em redes — post ruim se apaga).
- **Alto** → human review (publicar no site do cliente — qualidade baixa mancha a marca).

### 4. Temos dados suficientes para calibrar?
- **Sim (> 100 execucoes)** → automatizar com confianca.
- **Nao (< 100 execucoes)** → manter humano para gerar dataset.

### 5. O cliente espera interacao humana?
- **Sim** → humano ou IA com transparencia (call opcional, tickets altos).
- **Nao** → automatizar sem friccao (confirmacao, relatorios, onboarding).

---

## Triggers de escalacao para humano

Para processos automatizados, definir QUANDO o sistema escala:

| Processo | Trigger | Acao |
|---|---|---|
| Redacao | Score < 70 apos 2 reescritas | Humano revisa e corrige prompts |
| Publicacao | CMS retorna erro 3x consecutivas | Humano verifica credenciais e acesso |
| Suporte | Cliente frustrado ou pede cancelamento | Humano assume conversa imediatamente |
| Parcela em atraso | 30 dias em aberto e gateway smart retry esgotado | Humano liga para o cliente |
| Estrategia | Cliente rejeita plano editorial 2x | Humano faz call de alinhamento |
| Monitoramento | Queda > 20 posicoes em keyword principal | Humano revisa e define plano |
| Prospeccao | Lead de alto valor (ticket esperado > R$ 10k em expansao futura) | Humano assume follow-up |

---

## Criterios de auto-aprovacao

Processos que migram de "humano aprova" para "auto-aprovacao":

| Processo | Criterio | Metrica |
|---|---|---|
| Publicacao de conteudo | SEO score >= 75 AND AIO score >= 70 AND originalidade >= 95% | [[Agente Revisor]] calcula |
| Estrategia mensal | Alinhamento com ICP do cliente >= 90% AND sem sobreposicao de keywords | [[Agente Estrategista]] valida |
| Distribuicao | Conteudo ja aprovado para publicacao | Herda aprovacao |
| Relatorio mensal | Todos os dados presentes AND variacao vs mes anterior explicada | [[Agente Monitor]] valida |

---

## Projecao de intervencao humana

| Metrica | V1 MVP | V1 completa | V1.2 | V2 |
|---|---|---|---|---|
| Horas humanas/cliente/mes | 3-5h | 1-2h | 30-60 min | < 15 min |
| % jobs sem escalacao | 60% | 85% | 92% | 95% |
| Custo humano/cliente/mes | ~R$ 150-250 | ~R$ 50-100 | ~R$ 25-50 | ~R$ 10 |
| Margem bruta impacto | -5% a -10% | -2% a -4% | -1% | -0,4% |

Essa reducao progressiva torna [[Unit Economics]] cada vez mais favoravel. Com margem bruta de 70%+ em V1 completa e custo humano tendendo a zero em V2, o negocio escala sem escalar equipe.

---

## Notas relacionadas

- [[Requisitos Produto Autonomo]]
- [[Tratamento de Falhas]]
- [[Arquitetura de Agentes]]
- [[Orquestrador]]
- [[Roadmap do Produto]]
- [[Unit Economics]]
- [[Onboarding Automatico]]

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 5, 7, 8 — ultima verificacao 2026-04-23.*
