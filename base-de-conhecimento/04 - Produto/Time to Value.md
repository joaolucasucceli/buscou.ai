---
tipo: produto
area: UX
tags: [produto, ttv, time-to-value, marcos, onboarding]
atualizado: 2026-04-23
---

# Time to Value

> O cliente nao paga pelo sistema. Paga pelo resultado. Quanto mais rapido ele VER resultado, mais rapido ele confia, renova e indica. Time to Value e a metrica que separa produtos que retêm de produtos que churnam.

---

## Timeline de Valor Percebido

O que o cliente EXPERIMENTA em cada marco:

| Marco | Dia | O que acontece (bastidores) | O que o cliente VE | Notificacao |
|---|---|---|---|---|
| Setup completo | 0-1 | Onboarding wizard, GSC conectado, nicho configurado | Dashboard ativo, [[Agente Estrategista]] gera estrategia inicial | Email: "Seu projeto esta ativo! Veja sua estrategia." |
| Primeiro conteudo | 3-5 | [[Agente Redator]] + [[Agente Revisor]] + Publicador executam | Artigo publicado no site do cliente | Email: "Seu primeiro conteudo foi publicado!" + link |
| Indexacao | 7 | GSC confirma que pagina foi indexada | Pagina aparece no Google (sem posicao relevante ainda) | Notificacao no dashboard |
| Primeiras impressoes | 14 | GSC mostra dados de impressao | Numeros reais no dashboard: "X pessoas viram seu conteudo" | Email: "Suas primeiras impressoes no Google!" |
| Primeiro relatorio | 30 | Relatorio automatico gerado pelo [[Agente Monitor]] | PDF + dashboard completo com metricas do mes 1 | Email + call opcional de alinhamento |
| Primeiros rankings | 60-90 | Posicoes melhoram para keywords de cauda longa | Keywords no top 10 aparecem no dashboard | Email: "Voce esta no Top 10 para '[keyword]'!" |
| Citacoes em IA | 60-120 | [[Agente Monitor]] detecta citacao em plataforma de IA | "ChatGPT citou seu site para '[query]'!" | Push notification + destaque no dashboard |
| ROI positivo | 90-180 | Trafego organico supera o investimento acumulado (implementacao + infra dos primeiros N meses) | Dashboard mostra: "Valor do trafego organico: R$ X.XXX" | Dashboard mensal com ROI acumulado |

---

## Quick Wins Artificiais

Estrategias para mostrar valor ANTES dos resultados organicos naturais (que demoram 60-90 dias):

### 1. Schema Markup (Semana 1-2)
- Publicador implementa schema no conteudo publicado
- Rich snippets (FAQ, How-to, Review) aparecem no Google em 1-2 semanas
- Cliente ve: "Olha, meu resultado no Google ta diferente dos outros — tem estrelas/FAQ"

### 2. Title Tags Otimizadas (Imediato)
- Se cliente ja tem conteudo, [[Agente Redator]] reescreve titles e meta descriptions
- CTR melhora em dias (mais cliques com mesma posicao)
- Cliente ve: "Meu trafego subiu 20% sem mudar de posicao"

### 3. Distribuicao Social (Semana 1)
- [[Agente Distribuidor]] publica em Reddit, LinkedIn, Medium
- Trafego social imediato (nao depende de Google)
- Cliente ve: "Ja tive 200 visitas do LinkedIn no primeiro artigo"

### 4. Baseline AIO (Dia 1)
- Auditoria automatica de presenca em IAs no setup
- Mesmo que resultado seja zero, cliente ve que esta sendo medido
- Cria expectativa: "Hoje voce aparece em 0% das IAs. Vamos mudar isso."

### 5. Competitive Intelligence (Semana 1)
- [[Agente Pesquisador]] mapeia concorrentes e gaps
- Relatorio: "Seus concorrentes aparecem para X queries. Voce aparece para 0."
- Cria urgencia e mostra que o sistema esta trabalhando

---

## Warning Signs e Acoes Proativas

Se um marco nao e atingido no prazo, o sistema detecta e age ANTES do cliente reclamar:

| Marco nao atingido | Prazo estourado | Causa provavel | Acao proativa |
|---|---|---|---|
| Setup nao completo | 48h | Cliente nao conectou GSC ou CMS | Email + WhatsApp do suporte com tutorial |
| Conteudo nao publicado | Dia 5 | Agente falhou, CMS inacessivel, ou credenciais erradas | Suporte proativo identifica erro, fix manual, notifica cliente |
| Nao indexado | Dia 14 | Robots.txt bloqueando, noindex tag, conteudo thin, ou sitemap ausente | Verificacao tecnica automatica, correcao se possivel, alerta se nao |
| Zero impressoes | Dia 30 | Nicho muito competitivo, conteudo nao alinhado com intencao, ou keyword errada | [[Agente Estrategista]] reavalia, ajusta estrategia, reescreve se necessario |
| Nenhum ranking top 10 | Dia 90 | KD muito alto, dominio muito novo (baixa autoridade), ou conteudo inferior | Pivotar para keywords de menor competicao, intensificar link building |

### Protocolo de Intervencao

```
Dia esperado do marco passa → Monitor detecta (automatico)
  → Classifica severidade (baixa/media/alta)
  → Severidade baixa: notificacao interna, retry automatico
  → Severidade media: alerta para suporte, email proativo ao cliente
  → Severidade alta: escalar para humano, call com cliente em 24h
```

---

## Metricas de TTV

| Metrica | Target | Como medir | Acao se fora do target |
|---|---|---|---|
| % clientes com setup em 24h | > 80% | Supabase: timestamp onboarding_complete | Simplificar wizard, adicionar suporte live |
| % clientes com 1o conteudo em 5 dias | > 80% | Supabase: timestamp first_content_published | Priorizar fila de novos clientes nos agentes |
| Dias ate primeira impressao no GSC | < 14 | GSC API: primeira impressao registrada | Forcar indexacao via API, verificar sitemap |
| Dias ate primeiro ranking top 10 | < 90 | GSC API: posicao media < 10 | Ajustar estrategia de keywords |
| Dias ate primeira citacao IA | < 120 | [[Agente Monitor]]: primeira deteccao | Intensificar otimizacao AIO (schema, E-E-A-T) |

---

## Comunicacao de Valor por Fase

Cada fase do TTV tem uma comunicacao especifica para reforcar que o sistema esta funcionando:

| Fase | Mensagem-chave | Canal |
|---|---|---|
| Dia 0-1 | "Seu sistema esta configurado e trabalhando" | Email + dashboard |
| Dia 3-5 | "Primeiro conteudo publicado — veja aqui" | Email com link direto |
| Dia 7-14 | "Google indexou seu conteudo — os dados comecam a chegar" | Notificacao dashboard |
| Dia 14-30 | "X impressoes no Google este mes — tendencia crescente" | Email semanal |
| Dia 30-60 | "Relatorio completo do mes 1 — veja sua evolucao" | PDF + dashboard |
| Dia 60-90 | "Voce esta no top 10 para [keyword]!" | Email celebratorio |
| Dia 90+ | "ROI: seu trafego organico vale R$X.XXX — [Y]x o investimento" | Relatorio mensal |

**Principio**: nunca deixar o cliente sem noticias por mais de 7 dias. Silencio = duvida = churn.

---

## Notas e Referencias

- Onboarding detalhado: [[Onboarding Automatico]]
- Dashboard onde marcos aparecem: [[Dashboard do Cliente]]
- North star que TTV alimenta: [[North Star Metric]]
- Agente que monitora marcos: [[Agente Monitor]]
- Tratamento quando marcos falham: [[Tratamento de Falhas]]
- Failure modes relacionados a TTV: [[Failure Modes]]
