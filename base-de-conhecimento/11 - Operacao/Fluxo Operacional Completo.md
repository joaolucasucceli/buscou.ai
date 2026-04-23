---
tipo: operacao
area: Sistema
tags: [operacao, fluxo, end-to-end, processo]
atualizado: 2026-04-23
---

# Fluxo Operacional Completo

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. Este arquivo detalha como a tecnologia executa a promessa canonica. Qualquer conflito com a verdade canonica invalida este documento.

> De visita ao blog publico ate cliente ativo publicando 90 conteudos/mes. Cada etapa com executor, SLA, entrada, saida e tratamento de falha.

Relacionado: [[Fluxo V1]] | [[Arquitetura de Agentes]] | [[Jornada do Cliente]] | [[Orquestrador]]

---

## Visao macro

```
Visita ao blog ou AI Overview
  → Landing buscou.ai
  → Checkout direto (R$ 2.500 a vista / R$ 3.000 em 12x)
  → Call opcional (20-30 min, so se o cliente pedir)
  → Confirmacao de pagamento pelo [Agente Pagamento]
  → Onboarding automatico (wizard: dominio, nicho, tom, concorrentes, GSC) em 24-48h
  → [Agente Estrategista] monta plano editorial
  → [Agente Pesquisador] extrai keywords, intencoes e gaps de SERP
  → [Agente Redator] produz 3 artigos/dia (800-1.200 palavras)
  → [Agente Revisor] valida score tecnico (SEO, AIO, answer-first)
  → [Agente Visual] anexa capa + alt text otimizado
  → [Agente Publicador] publica no blog do cliente + sitemap + indexacao GSC
  → [Agente Distribuidor] distribui (RSS, sitemap; cross-posting em V1.2)
  → [Agente Monitor] rastreia ranking, trafego, AI Overviews
  → [Agente Suporte] atende duvidas operacionais
  → [Agente Prospeccao] alimenta funil novo (outbound paralelo, nao bloqueia cliente atual)
```

Orquestrador coordena os 11 agentes (6 core + 5 complementares).

---

## Detalhamento por etapa

### 1. Atracao — visita chega ao blog publico
- **Executor:** pipeline de conteudo da propria buscou.ai (dog-fooding). Ver [[Case Proprio como Prova]].
- **Input:** calendario editorial do blog buscou.ai, keywords de negocios locais e donos de clinicas/imobiliarias/advogados.
- **Output:** artigo indexado, presente em SERP e AI Overviews.
- **SLA:** 3 artigos/dia no blog proprio (mesmo ritmo entregue ao cliente).
- **Falha:** conteudo nao indexa ou nao ranqueia → [Agente Monitor] detecta, [Agente Estrategista] reotimiza em ate 7 dias.

### 2. Captura — landing buscou.ai
- **Executor:** landing estatica (Next.js + Vercel).
- **Input:** trafego organico do blog ou direto.
- **Output:** visitante em pagina com hero + prova + oferta + checkout.
- **SLA:** carregamento < 2s em edge.
- **Falha:** uptime target 99.9%, fallback para versao estatica pura.

### 3. Decisao — checkout direto
- **Executor:** sistema (gateway Stripe ou Asaas). Ver [[Oferta Comercial]].
- **Input:** lead preenche dados de compra.
- **Output:**
  - Implementacao: a vista (Pix ou cartao debitado imediatamente) OU parcelada em 12x (primeira parcela cobrada, cronograma automatico das 11 seguintes).
  - Infra mensal: cartao recorrente cadastrado no mesmo checkout. Subscription agendada para D+30 (mes 2) com valor R$ 300.
- **SLA:** checkout em < 60s, confirmacao da implementacao em < 5 min.
- **Sem BANT, sem qualificacao, sem reuniao obrigatoria.** Call opcional (20-30 min) aparece como link secundario "ficou com duvida? agende 20 min" — usada apenas quando o cliente pede.

### 4. Confirmacao — [Agente Pagamento]
- **Executor:** [[Agente Pagamento]] (monitora **dois fluxos** de cobranca: implementacao e infra mensal — ver doc do agente).
- **Input:** webhooks do gateway (`checkout.session.completed` da implementacao, `customer.subscription.created` da infra, e eventos subsequentes).
- **Output:** cliente criado no Supabase com `compra` vinculada e `assinatura_infra` em `pending_start`; credenciais geradas; dispara onboarding.
- **SLA:** criacao de projeto em < 5 min apos confirmacao da implementacao.
- **Falha:** webhook falha → retry 3x em 15 min + reconciliacao por cron; depois escala para humano.

### 5. Onboarding — wizard automatico
- **Executor:** sistema + [Agente Estrategista].
- **Input:** wizard coleta dominio, nicho, tom desejado, concorrentes, acesso GSC, CMS (ou hospedagem no motor buscou.ai).
- **Output:** projeto configurado, calendario editorial inicial aprovado.
- **SLA:** ativacao em ate 7 dias (conforme [[VERDADE_UNICA_BUSCOU]] secao 8).
- **Falha:** cliente sem dominio → fluxo "usar subdominio buscou.ai/{slug}". Cliente sem GSC → [Agente Suporte] guia setup.

### 6. Pesquisa + Estrategia
- **Executor:** [[Agente Pesquisador]] + [[Agente Estrategista]].
- **Input:** nicho, dominio, concorrentes.
- **Output:** lista de keywords priorizadas + clusters tematicos + calendario 90 artigos/mes.
- **SLA:** completo em 24h apos onboarding.

### 7. Producao — 3 artigos/dia
- **Executor:** [[Agente Redator]].
- **Input:** brief por cluster (keyword, intent, tom, estrutura, answer-first obrigatorio).
- **Output:** artigo 800-1.200 palavras, meta, schema sugerido.
- **SLA:** cadencia fixa de 3/dia, 90/mes. 720 mil caracteres/mes.

### 8. Revisao
- **Executor:** [[Agente Revisor]].
- **Criterios:** SEO, AIO/answer-first, originalidade, precisao factual, tom do cliente.
- **Output:** score 0-100. Publica se >= 75. Reescreve se <75 (max 2 tentativas, depois escala humano).

### 9. Imagem — [Agente Visual]
- **Input:** artigo aprovado.
- **Output:** capa (Unsplash/Pexels em V1; DALL-E/Ideogram em V1.1+) + alt text otimizado.

### 10. Publicacao
- **Executor:** [[Agente Publicador]].
- **Input:** artigo + imagem + credencial do CMS do cliente (ou hospedagem buscou.ai).
- **Output:** URL publicada, sitemap atualizado, indexacao solicitada via GSC API.
- **SLA:** publicacao em < 1h apos aprovacao.

### 11. Distribuicao
- **Executor:** [[Agente Distribuidor]].
- **V1:** RSS, sitemap, ping GSC.
- **V1.2:** cross-posting em LinkedIn, Medium, perfis proprios do cliente.
- **V2:** parasita SEO, Reddit, comunidades segmentadas.

### 12. Monitoramento
- **Executor:** [[Agente Monitor]].
- **Output:** dashboard unico com posicao SEO, trafego organico, AI Overviews, citacoes em IAs.
- **SLA:** sinais visiveis em ate 30 dias (primeiro lote de artigos indexado).

### 13. Suporte operacional
- **Executor:** [[Agente Suporte]].
- **Escopo V1:** FAQ operacional (status de publicacao, mudanca de tom, ajuste de keyword). Escalacao para humano em duvidas fora do escopo.

### 14. Prospeccao paralela
- **Executor:** [[Agente Prospeccao]] (nao bloqueia cliente ativo; roda em paralelo para alimentar funil).
- **Output:** e-mails outbound personalizados para leads de negocios locais.

---

## Metricas do fluxo

| Etapa | Meta |
|---|---|
| Visita → checkout | Taxa de conversao > 2% na landing |
| Checkout → ativacao | > 90% em 7 dias |
| Ativacao → primeiro conteudo publicado | < 48h |
| Volume mensal por cliente ativo | 90 artigos, ~720K caracteres |
| Uptime dashboard/motor | >= 99% (meta 99.9%) |
| Primeiros sinais (trafego/rank) | Visiveis em ate 30 dias |

---

## Tratamento de falhas — cenarios criticos

1. **Qualidade abaixo do score:** [Agente Revisor] devolve para [Agente Redator]. Max 2 rescritas. Depois escala.
2. **CMS do cliente indisponivel:** 3 retries com backoff. Persiste → [Agente Suporte] avisa cliente.
3. **API de keywords fora:** fallback para GSC + scraping. Prazo estendido +24h.
4. **Orquestrador trava:** health check a cada 60s, restart automatico em < 5 min.
5. **Pagamento de parcela da implementacao falha (parcelado 12x):** [Agente Pagamento] notifica o cliente, gateway dispara retry automatico. Motor nao pausa — implementacao ja foi entregue.
6. **Cobranca da infra mensal falha:** [Agente Pagamento] dispara retry em D+0/D+3/D+7. Se todas falharem, motor pausa e cliente recebe aviso; blog e conteudo antigo ficam no ar. Cliente regulariza → motor retoma.

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 5, 7, 8 — ultima verificacao 2026-04-23.*
