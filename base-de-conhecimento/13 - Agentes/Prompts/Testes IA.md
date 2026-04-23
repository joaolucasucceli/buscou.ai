---
tipo: recurso
area: AIO
tags: [prompts, testes, ia, monitoramento, operacional]
atualizado: 2026-04-22
---

# Prompts para Testes de Visibilidade em IA

Este e seu kit de monitoramento. Use estes prompts **toda semana** em ChatGPT, Perplexity, Gemini e Claude para medir se seu conteudo esta sendo citado. Sem medicao, nao ha como saber se o trabalho de [[Framework AIO Completo|AIO]] esta funcionando.

> **Regra de ouro:** Teste sempre os MESMOS prompts, nas MESMAS plataformas, para poder comparar evolucao ao longo do tempo. Troque os prompts e voce perde a baseline.

---

## Prompts por Intencao de Busca

### Informacional — "O que e / Como funciona"

Use para verificar se a IA sabe que voce existe e se sua informacao esta correta.

| # | Prompt Template | Adapte para |
|---|---|---|
| 1 | "O que e [seu servico/produto]?" | Nome exato do produto |
| 2 | "Como funciona [seu servico/produto]?" | Processo principal |
| 3 | "Para que serve [seu servico/produto]?" | Beneficio principal |
| 4 | "Quem criou [sua marca]?" | Historia da marca |
| 5 | "O que faz a empresa [sua marca]?" | Descricao da empresa |

**O que observar:** A IA menciona sua marca? As informacoes estao corretas? De onde ela tirou os dados?

---

### Comparativo — "Melhor / Top / Ranking"

Estes sao os prompts de maior valor comercial. Se voce nao aparece aqui, esta perdendo clientes.

| # | Prompt Template | Adapte para |
|---|---|---|
| 6 | "Melhor [categoria] em [cidade/regiao]" | Sua categoria + local |
| 7 | "Top 5 [categoria] em [ano]" | Sua categoria |
| 8 | "Qual o melhor [servico] para [perfil]?" | Seu nicho + ICP |
| 9 | "[sua marca] vs [concorrente]" | Concorrente direto |
| 10 | "Comparacao entre [opcao A] e [opcao B]" | Produtos do nicho |

**O que observar:** Voce aparece na lista? Em qual posicao? O concorrente aparece e voce nao? Veja estrategia em [[Melhor X]] e [[X vs Y]].

---

### Transacional — "Vale a pena / Preco / Contratar"

O usuario esta quase comprando. Se a IA recomenda voce aqui, e conversao.

| # | Prompt Template | Adapte para |
|---|---|---|
| 11 | "Vale a pena [seu servico/produto]?" | Produto principal |
| 12 | "Quanto custa [seu servico/produto]?" | Servico com preco |
| 13 | "[sua marca] e bom?" | Sua marca |
| 14 | "[sua marca] e confiavel?" | Sua marca |
| 15 | "Preco de [servico] em [cidade]" | Servico + local |

**O que observar:** Tom da resposta (positivo, neutro, negativo). Se recomenda ou desaconselha. Veja [[Vale a Pena X]].

---

### Recomendacao — "Recomende / Sugira / Indique"

A IA funciona como um consultor. Estes prompts testam se ela "confia" na sua marca para recomendar.

| # | Prompt Template | Adapte para |
|---|---|---|
| 16 | "Recomende um [servico] para [perfil]" | Seu servico + ICP |
| 17 | "Sugira [numero] opcoes de [categoria]" | Sua categoria |
| 18 | "Qual [servico] voce recomenda para quem [situacao]?" | Problema que resolve |
| 19 | "Indique um [profissional/empresa] de [area] em [cidade]" | Sua area + local |

**O que observar:** Voce e recomendado? Com que nivel de entusiasmo? Quais criterios a IA usa para recomendar?

---

### Problematico — "Como resolver / Como lidar"

O usuario tem um problema que voce resolve. Se a IA cita seu conteudo como solucao, e ouro.

| # | Prompt Template | Adapte para |
|---|---|---|
| 20 | "Como resolver [problema que seu cliente tem]?" | Problema principal |

**O que observar:** A IA menciona seu conteudo/solucao? Ou cita apenas concorrentes?

---

## Template de Teste Semanal (20 Prompts Padrao)

Copie esta lista e personalize UMA VEZ. Depois execute toda semana sem alterar.

```
PROMPTS FIXOS SEMANAIS — [Sua Marca] — [Seu Nicho]

INFORMACIONAIS:
1. "O que e [seu produto]?"
2. "Como funciona [seu servico]?"
3. "[sua marca] — o que faz?"

COMPARATIVOS:
4. "Melhor [categoria] em [cidade]"
5. "Top 5 [categoria] em 2026"
6. "[sua marca] vs [concorrente 1]"
7. "[sua marca] vs [concorrente 2]"
8. "Comparacao [categoria] em [pais/cidade]"

TRANSACIONAIS:
9. "Vale a pena [seu produto]?"
10. "[sua marca] e bom?"
11. "[sua marca] e confiavel?"
12. "Quanto custa [seu servico]?"

RECOMENDACAO:
13. "Recomende um [servico] para [perfil ICP 1]"
14. "Recomende um [servico] para [perfil ICP 2]"
15. "Qual o melhor [categoria] para [situacao]?"
16. "Indique [profissional] de [area] em [cidade]"

PROBLEMATICOS:
17. "Como resolver [problema 1 do cliente]?"
18. "Como lidar com [problema 2 do cliente]?"
19. "Solucao para [problema 3 do cliente]"

REPUTACAO:
20. "Opiniao sobre [sua marca]"
```

---

## Onde Testar (Plataformas)

Execute os 20 prompts em cada plataforma separadamente:

| Plataforma | URL | Por que Testar | Frequencia |
|---|---|---|---|
| **ChatGPT** | chat.openai.com | Maior base de usuarios, usa Bing para busca | Semanal |
| **Perplexity** | perplexity.ai | 97% das respostas citam fontes com links | Semanal |
| **Google AI Overviews** | google.com | Aparece em 13%+ das buscas tradicionais | Semanal |
| **Gemini** | gemini.google.com | Integrado ao ecossistema Google | Quinzenal |
| **Claude** | claude.ai | Crescimento rapido em uso empresarial | Quinzenal |

Veja [[Otimizacao para ChatGPT e Perplexity]] para estrategias especificas por plataforma.

---

## Como Interpretar Resultados

### Classificacao de Mencao

Para cada prompt, classifique o resultado em uma dessas categorias:

| Nivel | Descricao | Score | Significado |
|---|---|---|---|
| **Citado com link** | Sua marca aparece E a IA linka para seu site | 5 | Excelente — voce e fonte confiavel |
| **Citado sem link** | Sua marca e mencionada nominalmente | 4 | Bom — a IA conhece voce |
| **Mencionado indiretamente** | Seu conteudo e parafraseado sem citar a fonte | 3 | Medio — seu conteudo influencia, mas voce nao ganha credito |
| **Listado entre varios** | Aparece em lista junto com 5+ concorrentes | 2 | Fraco — voce e generico, nao e destaque |
| **Ausente** | Nao aparece de nenhuma forma | 1 | Critico — trabalho urgente necessario |
| **Informacao incorreta** | Aparece mas com dados errados | 0 | Emergencia — corrigir fontes imediatamente |

---

### Scoring System

Para cada prompt testado em cada plataforma, registre o score (0-5). Calcule:

**Score Semanal** = (soma dos scores de todos os prompts em todas as plataformas) / (numero de prompts x numero de plataformas x 5) x 100

| Score Semanal | Status | Acao |
|---|---|---|
| 0-20% | Critico | Foco total em [[Playbook - Aparecer na IA em 30 Dias]] |
| 21-40% | Fraco | Priorizar answer-first rewrite e schema |
| 41-60% | Progredindo | Expandir conteudo e distribuicao multi-plataforma |
| 61-80% | Bom | Refinar e manter. Focar em queries onde nao aparece |
| 81-100% | Dominante | Defender posicao. Monitorar concorrentes |

---

### Planilha de Registro

Use esta estrutura para registrar resultados toda semana:

| Data | Prompt | ChatGPT | Perplexity | AI Overviews | Gemini | Claude | Notas |
|---|---|---|---|---|---|---|---|
| [data] | "Melhor X em Y" | 4 | 5 | 3 | 2 | 4 | Perplexity linka direto |
| [data] | "Vale a pena X?" | 1 | 1 | 0 | 1 | 1 | Nao aparecemos |

---

## Prompts de Diagnostico (Quando Voce NAO Aparece)

Quando um teste mostra score 0-2, use estes prompts para investigar:

**Prompt de diagnostico:**
> "Voce acabou de responder sobre '[query testada]' e nao mencionou [minha marca]. Me explique: (1) quais criterios voce usou para escolher as fontes que citou, (2) o que [minha marca] precisaria ter para ser incluida na resposta, (3) quais tipos de conteudo ou sinais me ajudariam a ser citado neste tipo de pergunta."

**Prompt de fonte:**
> "Quando voce responde sobre '[tema do nicho]', quais sites e fontes voce considera mais confiaveis? Liste os top 10 e explique por que cada um e confiavel."

Use as respostas para priorizar acoes no [[Framework AIO Completo]].

---

## Conexao com Monitoramento Automatizado

Os testes manuais acima sao essenciais, mas combine com ferramentas automatizadas:

- **[[Otterly.ai]]** — Monitora citacoes em AI Overviews automaticamente
- **[[LLMrefs]]** — Rastreia referencias em LLMs
- **[[AIclicks]]** — Tracking de cliques vindos de IA
- **[[HubSpot AEO]]** — Metricas de Answer Engine Optimization
- **[[SE Ranking AI Visibility]]** — Visibilidade em IA integrada ao SE Ranking

Registre resultados consolidados em [[Dashboard de Resultados]] e [[Queries que Rankeamos]].

---

## Calendario de Testes

| Acao | Frequencia | Tempo | Responsavel |
|---|---|---|---|
| 20 prompts padrao em 3 IAs | Semanal | 45-60 min | Consultor/Analista |
| 20 prompts padrao em 5 IAs | Quinzenal | 90 min | Consultor/Analista |
| Diagnostico de gaps | Mensal | 2h | Consultor Senior |
| Revisao de scoring trends | Mensal | 30 min | Consultor/Gestor |
| Atualizacao dos prompts padrao | Trimestral | 1h | Consultor Senior |

---

## Notas Relacionadas

- [[Geracao de Conteudo]] — Prompts para criacao de conteudo
- [[Analise SEO]] — Prompts para auditoria SEO
- [[Otimizacao AIO]] — Prompts para otimizacao em IA
- [[Como IA Escolhe Respostas]] — Entenda por que a IA cita ou ignora voce
- [[Otimizacao para ChatGPT e Perplexity]] — Estrategias por plataforma
- [[Dashboard de Resultados]] — Onde consolidar resultados
- [[Queries que Rankeamos]] — Tracking de queries dominadas
- [[Playbook - Aparecer na IA em 30 Dias]] — Playbook completo de implementacao
- [[Melhor X]] — Estrategia para queries "melhor"
- [[Vale a Pena X]] — Estrategia para queries "vale a pena"
- [[X vs Y]] — Estrategia para queries comparativas
- [[Como Fazer X]] — Estrategia para queries "como fazer"
