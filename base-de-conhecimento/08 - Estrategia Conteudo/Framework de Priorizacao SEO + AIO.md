---
tipo: estrategia
area: Ambos
tags: [estrategia, priorizacao, formula, scoring, keywords]
atualizado: 2026-04-22
---

# Framework de Priorizacao SEO + AIO

> Nem toda keyword merece um artigo. A priorizacao correta determina se voce ganha posicao em 30 dias ou em 12 meses. Este framework combina SEO tradicional com oportunidade em IA para maximizar o [[North Star Metric|IVT]].

---

## Formula de Priorizacao

```
Score = (Volume_norm x 0.30) + (Facilidade x 0.25) + (Intent x 0.20) + (AIO_Opp x 0.15) + (Gap x 0.10)
```

### Variaveis

| Variavel | Calculo | Range | Peso |
|---|---|---|---|
| **Volume_norm** | (Volume da keyword / max volume do nicho) x 10 | 0-10 | 30% |
| **Facilidade** | 10 - (Keyword Difficulty / 10) | 0-10 | 25% |
| **Intent** | Transacional=10, Comercial=8, Informacional=5, Navegacional=2 | 2-10 | 20% |
| **AIO_Opp** | IA nao responde bem=10, parcial=6, completo=3 | 3-10 | 15% |
| **Gap** | Concorrente fraco/desatualizado=10, medio=5, forte/atualizado=2 | 2-10 | 10% |

### Detalhamento de Cada Variavel

**Volume_norm (30%)** — Normalizado por nicho para comparabilidade:
- Nicho de CRM: max volume = 10.000 ("crm" generico). "melhor crm 2026" com 2.400 buscas = (2400/10000) x 10 = 2.4
- Nicho de clinica estetica: max volume = 5.000. "botox preco" com 3.000 = (3000/5000) x 10 = 6.0
- Fonte: Ahrefs, SEMrush, ou Ubersuggest (via API ou [[Agente Pesquisador]])

**Facilidade (25%)** — Inversao do KD para que numero alto = facil:
- KD 10 → Facilidade 9 (muito facil, atacar primeiro)
- KD 30 → Facilidade 7 (moderado, bom para Growth/Scale)
- KD 60 → Facilidade 4 (dificil, so para Scale com dominio forte)
- KD 85 → Facilidade 1.5 (muito dificil, evitar no inicio)

**Intent (20%)** — Classificacao por [[Palavras-Chave e Intencao de Busca]]:
- Transacional (10): "contratar sistema de crm", "comprar crm online" → lead quente
- Comercial (8): "melhor crm 2026", "pipedrive vs hubspot" → comparando opcoes
- Informacional (5): "o que e crm", "como implementar crm" → educacao, topo de funil
- Navegacional (2): "pipedrive login", "hubspot site" → ja decidiu marca, baixo valor

**AIO_Opp (15%)** — Oportunidade especifica de aparecer em IAs:
- Score 10: IA da resposta vaga, incompleta ou errada → oportunidade de ser A fonte
- Score 6: IA responde parcialmente mas sem citar fontes especificas → espaco para entrar
- Score 3: IA responde completo com fontes consolidadas → dificil deslocar

**Gap (10%)** — Qualidade do conteudo concorrente atual:
- Score 10: Concorrentes com conteudo desatualizado (>12 meses), thin (<800 palavras), ou sem schema
- Score 5: Conteudo medio, atualizado mas sem profundidade
- Score 2: Conteudo excelente, atualizado, com schema, de dominio com alta autoridade

---

## Exemplo Pratico: Nicho CRM

Max volume do nicho: 10.000 (keyword "crm")

| Keyword | Vol. | KD | Intent | AIO | Gap | Vol_n | Fac. | Int. | AIO_O | Gap_s | **Score** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| melhor crm 2026 | 2.400 | 35 | Comercial | 8 | 7 | 2.4 | 6.5 | 8 | 8 | 7 | **5.87** |
| crm o que e | 5.000 | 20 | Info | 3 | 4 | 5.0 | 8.0 | 5 | 3 | 4 | **5.35** |
| pipedrive vs hubspot | 800 | 25 | Comercial | 10 | 9 | 0.8 | 7.5 | 8 | 10 | 9 | **6.02** |
| crm para pequenas empresas | 1.800 | 28 | Comercial | 9 | 8 | 1.8 | 7.2 | 8 | 9 | 8 | **5.99** |
| como escolher crm | 1.200 | 15 | Info | 7 | 6 | 1.2 | 8.5 | 5 | 7 | 6 | **5.09** |
| crm gratuito | 3.600 | 40 | Transacional | 5 | 3 | 3.6 | 6.0 | 10 | 5 | 3 | **5.88** |

**Ranking de prioridade**: pipedrive vs hubspot (6.02) > crm para pequenas empresas (5.99) > crm gratuito (5.88) > melhor crm 2026 (5.87) > crm o que e (5.35) > como escolher crm (5.09)

---

## Regras de Decisao Rapida

### Quick Wins (atacar primeiro)
- **Score > 6 + KD < 30** = prioridade maxima. Producao imediata.
- Tipicamente: keywords de cauda longa, comparativos, nichos especificos.
- Esperar resultado em 30-60 dias.

### Bets Estrategicos (planejar com calma)
- **Score > 5 + KD 30-50** = produzir no segundo ciclo.
- Precisam de conteudo mais profundo (2.500+ palavras) e link building.
- Esperar resultado em 60-120 dias.

### Evitar (por enquanto)
- **Score < 4 OU KD > 60** = nao atacar ate o dominio ter DR > 30.
- Keywords genericas de alto volume mas alta competicao.
- Reavaliar a cada trimestre.

---

## Matriz Visual de Priorizacao

```
IMPACTO (Volume x Intent)
    ↑
    │   Bets            Quick Wins
    │   Estrategicos    ★★★
    │   ★★              Score > 6
    │                   KD < 30
    │
    │   Evitar          Cauda Longa
    │   ☆               ★
    │   KD > 60         Volume baixo
    │                   mas facil
    │
    └──────────────────────────→ FACILIDADE (10 - KD/10)
```

Quadrante superior-direito = prioridade absoluta. Iniciar pipeline imediatamente.

---

## Como o [[Agente Estrategista]] Usa Este Framework

1. Recebe lista de keywords do [[Agente Pesquisador]] (via Ahrefs API ou scraping)
2. Para cada keyword, calcula as 5 variaveis automaticamente:
   - Volume e KD: da API de keywords
   - Intent: classificacao por NLP (Claude analisa a query)
   - AIO_Opp: resultado de [[Testes IA]] (se ja executado) ou heuristica
   - Gap: analise SERP automatica (idade do conteudo, word count, schema presente)
3. Aplica formula, ordena por score descendente
4. Gera calendario editorial: top 8-40 keywords (conforme tier) distribuidas no mes
5. Envia para [[Agente Redator]] com brief de cada keyword (intent, concorrentes, angulo recomendado)

### Recalculo

- **Semanal**: keywords que subiram de posicao podem ter score ajustado (Gap muda)
- **Mensal**: re-rodar pesquisa completa, adicionar keywords novas, remover irrelevantes
- **Trimestral**: ajustar pesos da formula se dados mostrarem que um fator importa mais

---

## Notas e Referencias

- Intencao de busca: [[Palavras-Chave e Intencao de Busca]]
- Clusters de conteudo: [[Content Clustering e Pillar Pages]]
- Agente que aplica a formula: [[Agente Estrategista]]
- Teste de oportunidade AIO: [[Testes IA]]
- Metrica que esse framework alimenta: [[North Star Metric]]
- Framework SEO geral: [[Framework SEO Completo]]
- Framework AIO geral: [[Framework AIO Completo]]
