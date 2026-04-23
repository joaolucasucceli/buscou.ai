---
tipo: produto
area: Suporte
tags: [produto, suporte, chat, ia, escalonamento]
atualizado: 2026-04-22
---

# Suporte Automatizado

> O suporte e onde a percepcao de qualidade do produto se forma. Um produto autonomo nao pode depender de humanos para responder "como vejo meu relatorio?" ou "por que meu artigo nao publicou?". O [[Agente Suporte]] resolve 85%+ das solicitacoes sem intervencao, com escalonamento transparente para humano quando necessario.

Referencia: [[Agente Suporte]] | [[Requisitos Produto Autonomo]] | [[Dashboard do Cliente]] | [[Modelo de Negocio]]

---

## Arquitetura de 3 Tiers

### Tier 1: Agente Suporte (IA) — 85% dos tickets

| Aspecto | Detalhe |
|---|---|
| **Canal** | Chat in-app (widget no [[Dashboard do Cliente]]) + WhatsApp (via Z-API) |
| **Modelo** | Claude Sonnet 4 — equilibrio custo/qualidade para conversacao |
| **Acesso a dados** | Knowledge base, dados do projeto do cliente (Supabase), historico de tickets, status de pagamento (Stripe), metricas recentes ([[Agente Monitor]]) |
| **Capabilities** | Responder duvidas, explicar metricas, diagnosticar problemas, guiar configuracoes, mostrar status de conteudo |
| **Horario** | 24/7/365 — sem fila, sem espera |
| **Tempo de resposta** | < 10 segundos |

### Tier 2: Suporte Humano — 12% dos tickets

| Aspecto | Detalhe |
|---|---|
| **Canal** | Mesmo chat (cliente nao troca de plataforma), escalado internamente |
| **SLA por tier** | Starter: 48h / Growth: 24h / Scale: 4h |
| **Acesso** | Contexto completo da conversa com IA + dados do cliente + historico |
| **Perfil** | CS generalista com conhecimento de SEO/AIO e acesso ao sistema |
| **Quando** | Issues que a IA nao resolve, solicitacoes de cancelamento, reclamacoes |

### Tier 3: Suporte Tecnico — 3% dos tickets

| Aspecto | Detalhe |
|---|---|
| **Canal** | Ticket interno (Slack → dev) |
| **SLA** | P0: 1h / P1: 4h / P2: 24h (conforme [[Tratamento de Falhas]]) |
| **Perfil** | Desenvolvedor com acesso a logs, banco, infra |
| **Quando** | Bugs no sistema, integracao CMS quebrada, falha de agente persistente |

---

## Knowledge Base

A knowledge base do [[Agente Suporte]] e construida a partir do proprio vault de conhecimento (secoes 01-13):

| Categoria | Fonte no Vault | Exemplos de Perguntas |
|---|---|---|
| SEO fundamentos | [[O que e SEO]], [[On-Page SEO]], [[SEO Tecnico]] | "O que e SEO score?", "Por que meu artigo nao indexou?" |
| AIO explicado | [[O que e AIO]], [[GEO - Generative Engine Optimization]], [[Google AI Overviews]] | "O que e citacao em IA?", "Como apareco no ChatGPT?" |
| Ferramentas | [[Google Search Console]], [[Ahrefs]], [[Otterly.ai]] | "Como conectar meu GSC?", "De onde vem os dados de ranking?" |
| Estrategia | [[Content Clustering e Pillar Pages]], [[Framework SEO Completo]], [[Framework AIO Completo]] | "Por que esses topicos?", "Como funciona o calendario editorial?" |
| Billing | [[Modelo de Negocio]], [[Unit Economics]] | "Quanto custa upgrade?", "Posso pagar com Pix?" |
| Produto | [[Onboarding Automatico]], [[Dashboard do Cliente]] | "Como mudo meu nicho?", "Como adiciono um colega?" |

**Indexacao**: Conteudo do vault convertido em embeddings (text-embedding-3-small) e armazenado em Supabase (`pgvector`). [[Agente Suporte]] faz semantic search para encontrar respostas relevantes.

---

## Suporte Proativo

O sistema detecta problemas e notifica o cliente ANTES que ele pergunte:

| Trigger | Deteccao | Mensagem Proativa |
|---|---|---|
| Ranking caiu > 5 posicoes | [[Agente Monitor]] | "Detectamos uma queda em [keyword]. Estamos analisando e reotimizando o conteudo." |
| Conteudo nao indexou em 7 dias | [[Agente Monitor]] + GSC API | "Seu artigo [titulo] ainda nao foi indexado. Reenviamos o pedido de indexacao." |
| Pagamento vai falhar | Stripe predictive (cartao expirando) | "Seu cartao termina em [data]. Atualize para evitar interrupcao." |
| CMS inacessivel | [[Agente Publicador]] | "Nao conseguimos publicar — parece que seu site esta fora do ar. Pode verificar?" |
| Nenhum login em 30 dias | Analytics do dashboard | "Faz tempo que voce nao confere seus resultados! Aqui esta um resumo..." |

---

## Top 20 Perguntas e Respostas Pre-Construidas

| # | Pergunta | Resposta Resumida |
|---|---|---|
| 1 | Como vejo meus rankings? | Dashboard → Rankings. Atualizado [frequencia por tier] |
| 2 | Quando meu artigo sera publicado? | Dashboard → Content → ver ETA na coluna de status |
| 3 | Por que meu artigo foi rejeitado? | O [[Agente Revisor]] encontrou [motivo]. Reescrita automatica em andamento |
| 4 | Como mudo meu nicho/keywords? | Settings → Project Config → editar e salvar |
| 5 | Posso mudar de plano? | Settings → Billing → Upgrade/Downgrade |
| 6 | O que e o Health Score? | Indice 0-100 baseado em conteudo + rankings + trafego + citacoes IA |
| 7 | Como a IA escreve meu conteudo? | Pipeline de agentes: pesquisa → estrategia → escrita → revisao → publicacao |
| 8 | Meu conteudo e original? | Sim. Verificamos originalidade >= 95% em cada artigo |
| 9 | Posso editar um artigo publicado? | Sim, diretamente no CMS. Avisamos que reotimizacao pode ser necessaria |
| 10 | Quanto tempo ate ver resultados? | SEO: 30-90 dias para primeiros rankings. AIO: 14-30 dias para citacoes |
| 11 | O Google penaliza conteudo de IA? | Nao, se for de alta qualidade. Seguimos diretrizes [[E-E-A-T]] rigorosamente |
| 12 | Como cancelo minha assinatura? | Settings → Billing → Cancelar. Seus dados ficam 90 dias |
| 13 | Posso adicionar mais sites? | Sim, conforme seu tier. Growth: 3 sites. Scale: ilimitado |
| 14 | O que sao citacoes em IA? | Quando ChatGPT, Perplexity ou AI Overviews mencionam seu conteudo |
| 15 | Como acompanho citacoes IA? | Dashboard → AI Visibility |
| 16 | Meu relatorio mensal nao chegou | Relatorios sao gerados ate dia 5. Verificar spam ou baixar no Dashboard → Reports |
| 17 | Posso escolher os topicos? | Sim, edite no onboarding ou em Settings → Project Config |
| 18 | Quem escreve meu conteudo? | Agentes de IA especializados, usando dados reais e frameworks validados |
| 19 | Meu site saiu do ar, o que acontece? | Pausamos publicacoes automaticamente e acumulamos conteudo para publicar quando voltar |
| 20 | Posso exportar meus dados? | Sim. Scale tem API. Outros tiers: Dashboard → Reports → Exportar CSV |

---

## Criterios de Escalonamento para Humano

O [[Agente Suporte]] DEVE escalar para humano quando:

1. **Sentimento negativo detectado**: NLP identifica frustacao, raiva ou sarcasmo na mensagem
2. **Pedido de cancelamento**: Qualquer mencao a "cancelar", "parar", "desistir"
3. **Bug confirmado**: Cliente descreve comportamento que nao existe na knowledge base
4. **Pergunta sem resposta**: IA nao encontra resposta relevante apos 2 tentativas
5. **Solicitacao financeira complexa**: Reembolso, disputa de cobranca, negociacao de preco
6. **3 interacoes sem resolucao**: Se o cliente continua insatisfeito apos 3 trocas

---

## Metricas de Suporte

| Metrica | Meta V1 | Meta V2 | Meta V3 |
|---|---|---|---|
| FCR (First Contact Resolution) | > 70% | > 80% | > 85% |
| CSAT (Customer Satisfaction) | > 4.0/5 | > 4.3/5 | > 4.5/5 |
| Tempo medio de resolucao (IA) | < 2 min | < 1 min | < 30s |
| Tickets escalados para humano | < 30% | < 15% | < 10% |
| Tickets por cliente/mes | < 3 | < 2 | < 1 |

---

## Notas Relacionadas

- [[Agente Suporte]]
- [[Requisitos Produto Autonomo]]
- [[O que Automatizar vs Humano]]
- [[Tratamento de Falhas]]
- [[Dashboard do Cliente]]
- [[Modelo de Negocio]]
- [[E-E-A-T]]
- [[Glossario SEO e AIO]]
