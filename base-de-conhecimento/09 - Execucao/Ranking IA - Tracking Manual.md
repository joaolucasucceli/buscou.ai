---
tipo: rastreamento
area: AIO
tags: [dominio, ia, tracking, citacoes, manual, monitoramento]
atualizado: 2026-04-22
---

# Ranking IA - Tracking Manual

> Protocolo para monitorar manualmente suas citacoes em IAs quando voce nao tem (ou nao quer pagar) ferramentas como [[Otterly.ai]] ou [[LLMrefs]]. Funciona com zero custo.

---

## Protocolo de Teste Semanal

### Passo 1: Prepare sua lista de prompts

Crie 20 prompts fixos baseados no seu nicho. Use as categorias de [[Testes IA]]:

| # | Prompt | Tipo |
|---|---|---|
| 1 | "Melhor [seu servico] em [cidade]" | Comparativo |
| 2 | "[Sua marca] e bom?" | Reputacao |
| 3 | "Vale a pena [seu produto]?" | Decisao |
| 4 | "Como fazer [problema que voce resolve]?" | Informacional |
| 5 | "[Concorrente A] vs [Concorrente B]" | Comparacao |
| 6 | "Recomende um [categoria] para [perfil]" | Recomendacao |
| 7 | "Top 5 [categoria] em 2026" | Listicle |
| 8 | "Preco de [servico] em [cidade]" | Transacional |
| 9-20 | _adapte ao seu nicho_ | _varie os tipos_ |

### Passo 2: Teste em cada plataforma

Toda **sexta-feira** (consistencia e chave), teste os mesmos 20 prompts em:

| Plataforma | URL | Versao Gratuita? |
|---|---|---|
| ChatGPT | chat.openai.com | Sim (GPT-4o mini) |
| Perplexity | perplexity.ai | Sim |
| Google AI | google.com (AI Overviews) | Sim |
| Gemini | gemini.google.com | Sim |
| Claude | claude.ai | Sim |

### Passo 3: Documente resultados

Para cada prompt, registre:

| Prompt | Plataforma | Citou? | URL Citada | Posicao | Concorrentes Citados | Data |
|---|---|---|---|---|---|---|
| "melhor crm 2026" | ChatGPT | Sim | meusite.com/crm | 2o citado | ConcA, ConcB | 2026-04-22 |
| "melhor crm 2026" | Perplexity | Nao | — | — | ConcA, ConcC, ConcD | 2026-04-22 |

### Passo 4: Calcule seu score semanal

**Formula simples:**

```
Score = (citacoes suas / total de testes) x 100

Exemplo: Testou 20 prompts x 5 plataformas = 100 testes
Citado em 15 = Score de 15%
```

| Semana | Testes | Citacoes | Score | Tendencia |
|---|---|---|---|---|
| Sem 1 | 100 | 8 | 8% | Baseline |
| Sem 2 | 100 | 11 | 11% | +3pp |
| Sem 3 | 100 | 15 | 15% | +4pp |
| Sem 4 | 100 | 18 | 18% | +3pp |

---

## O que Observar

### Sinais Positivos
- Citacao direta com link para seu site
- Mencao do nome da sua marca
- Seu conteudo e parafraseado (mesmo sem link)
- Aumento consistente semana a semana

### Sinais de Alerta
- Concorrente novo aparecendo que nao existia
- Perda de citacao que voce tinha
- IA recomendando informacao desatualizada sobre voce
- Sua marca mencionada em contexto negativo

### Acoes por Resultado

| Resultado | Acao |
|---|---|
| Nao citado em nenhuma plataforma | Verificar se AI crawlers estao liberados, adicionar schema, publicar em plataformas externas |
| Citado em 1-2 plataformas | Expandir distribuicao ([[Estrategia de Distribuicao]]), atualizar conteudo |
| Citado em 3+ plataformas | Manter e expandir, documentar como caso de sucesso |
| Perdeu citacao | Verificar se conteudo ficou desatualizado, checar se concorrente atualizou |

---

## Ferramentas Gratuitas para Apoiar

| Ferramenta | Uso | Custo |
|---|---|---|
| Google Search Console | Ver queries e impressoes | Gratuito |
| Google Alerts | Monitorar mencoes da marca | Gratuito |
| Social Mention | Monitorar mencoes em redes | Gratuito |
| [[HubSpot AEO]] | Score basico de visibilidade | Gratuito (basico) |
| [[LLMrefs]] | AI rank tracking | Plano gratuito disponivel |

---

## Quando Migrar para Ferramentas Pagas

Considere investir em [[Otterly.ai]] ou [[LLMrefs]] quando:

- [ ] Voce monitora 3+ clientes (tracking manual fica inviavel)
- [ ] Seu score semanal passa de 20% (escala merece automacao)
- [ ] Voce precisa de relatorios profissionais para clientes
- [ ] Quer tracking diario em vez de semanal

---

## Notas Relacionadas

- [[Queries que Rankeamos]] - Registro de queries com citacao
- [[Template - Experimento AIO]] - Template para experimentos
- [[Testes IA]] - Prompts prontos para teste
- [[Como IA Escolhe Respostas]] - Por que IA cita ou nao cita
- [[Agente Monitor]] - Versao automatizada deste tracking (pos-V1)
