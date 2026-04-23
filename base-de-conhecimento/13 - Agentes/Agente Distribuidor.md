---
tipo: agente
area: Sistema
tags: [agente, distribuidor, linkedin, reddit, medium]
atualizado: 2026-04-23
---

# Agente Distribuidor

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. O Agente Distribuidor amplifica cada artigo publicado para canais externos. Disponivel para **todo cliente ativo** — nao ha tier. Escopo expande gradualmente: V1 tecnico → V1.2 social → V2 comunidades.

Relacionado: [[Arquitetura de Agentes]] | [[Orquestrador]] | [[Agente Publicador]] | [[Distribuicao Automatica]] | [[Off-Page SEO e Link Building]]

---

## Escopo por fase

| Fase | O que o Distribuidor faz |
|---|---|
| **V1 (MVP)** | RSS, sitemap, ping GSC, schema JSON-LD, indexacao imediata |
| **V1.2** | + LinkedIn (post + article), Medium (republish com canonical) |
| **V2** | + Reddit (value-first), YouTube Shorts (resumos), Parasite SEO (Quora, Substack) |

Este documento descreve as 3 fases — a V1 entrega apenas a camada tecnica; as demais sao roadmap incremental.

---

## Funcao

Recebe URL publicada pelo [[Agente Publicador]] e:
- **V1**: garante indexacao (sitemap + ping GSC + schema valido).
- **V1.2**: adapta o artigo para LinkedIn e Medium, posta.
- **V2**: contribui em Reddit, gera Shorts, distribui em comunidades.

---

## Input

- **URL publicada**: link do artigo no blog do cliente.
- **Artigo completo** (markdown): para reaproveitamento.
- **Dados de distribuicao**: plataformas habilitadas, contas conectadas, subreddits/hashtags.
- **Perfil do cliente**: nicho, tom, publico-alvo.
- **Configuracao**: frequencia, horarios otimizados, regras por plataforma.

## Output

- **V1**: RSS atualizado, sitemap enviado, ping GSC, schema JSON-LD validado.
- **V1.2**: post LinkedIn (1.200-1.500 chars, storytelling + bullets + CTA suave), artigo Medium (republish com canonical).
- **V2**: post Reddit (value-first, tom autentico), vídeo Short (legenda + link).
- **Report de distribuicao**: JSON com URLs, status, metricas iniciais.

---

## Ferramentas/APIs

| Ferramenta | Fase | Uso |
|---|---|---|
| Google Search Console API | V1 | Submeter sitemap, solicitar indexacao |
| RSS generator | V1 | Feed do blog |
| Schema validator | V1 | Validar JSON-LD antes de publicar |
| LinkedIn Marketing API | V1.2 | Posts, articles, carrossel |
| Medium API | V1.2 | Stories com canonical |
| Reddit API (PRAW) | V2 | Submissoes, comentarios |
| Claude Sonnet 4 | V1.2+ | Adaptar artigo para cada plataforma |
| Canva API / DALL-E | V1.2+ | Gerar imagens de capa para LinkedIn/Medium |
| MCP Tools | Todas | `distribute_article`, `adapt_for_linkedin`, `adapt_for_medium`, `submit_sitemap`, `ping_gsc` |

---

## Gatilho

- **Orquestrador despacha** apos [[Agente Publicador]] confirmar publicacao.
- **Redistribuicao**: artigo antigo atualizado (ex: refresh anual) entra em nova rodada.
- **Scheduling**: posts podem ser agendados para horarios de pico de cada plataforma.

---

## Criterios de sucesso

### V1
- 100% de schema JSON-LD valido.
- Sitemap enviado ao GSC em < 1h apos publicacao.
- Indexacao obtida em ate 72h (monitorada pelo [[Agente Monitor]]).

### V1.2
- Canais ativos por artigo: >= 3 (blog + LinkedIn + Medium).
- Formato nativo em cada canal (nao copy-paste).
- Tempo de distribuicao: < 15 min apos publicacao.
- LinkedIn engagement rate > 2%.

### V2
- Reddit compliance: < 5% de remocao por spam.
- Mencoes de marca cruzando plataformas (sinal para IA).

---

## Scheduling

| Plataforma | Quando postar (apos blog) | Razao |
|---|---|---|
| Sitemap + GSC ping | Imediato | Indexacao rapida |
| LinkedIn | +2 horas | Dar tempo de indexacao no Google primeiro |
| Medium | +72 horas | Esperar indexacao com canonical |
| Reddit | +24-48 horas (V2) | Reddit valoriza conteudo com traction inicial |

**Horarios otimos (BR, GMT-3):**
- LinkedIn: ter-qui 8h-10h ou 17h-18h.
- Medium: seg-qua 9h-11h.
- Reddit: dom-ter 10h-14h.

---

## Regras de adaptacao

### LinkedIn (V1.2+)

- Formato: post (ate 3.000 chars) ou article (conteudo longo).
- Hook de 2 linhas (dado impactante ou pergunta).
- 3-5 bullets com insights principais.
- CTA suave ("artigo completo no link").
- 3-5 hashtags relevantes.
- Tom profissional mas acessivel, "voce" em vez de "empresas".

### Medium (V1.2+)

- Artigo completo republicado.
- **`rel="canonical"` obrigatorio** apontando para o blog original.
- Introducao mais narrativa (storytelling).
- 5 tags relevantes.
- Imagem de capa atraente.

### Reddit (V2)

- Value-first, NUNCA promocional direto.
- Tom casual, autentico, como membro da comunidade.
- Ratio 10:1 (10 contribuicoes de valor para 1 mencao de marca).
- Respeitar regras de cada subreddit.

---

## Casos de erro

1. **Sitemap rejeitado pelo GSC**: validar XML + retry + alerta em caso de erro persistente.
2. **LinkedIn rate limited**: agendar para proximo slot.
3. **Medium ignora canonical**: verificar apos publicacao e reportar se canonical nao funciona (risco SEO).
4. **Conta bloqueada**: detectar 403, parar postagens, notificar equipe.
5. **Reddit post removido**: ajustar tom para mais contribuitivo.

## Fallback

- LinkedIn API falha → agendar via Buffer. Se falhar, gerar texto formatado para publicacao manual.
- Medium API falha → publicar via RSS import.
- Todas as APIs falham → gerar pacote de distribuicao (textos formatados) e enviar por e-mail para publicacao manual.

---

## Dependencias

- **Depende de**: [[Orquestrador]], [[Agente Publicador]] (URL + artigo), APIs de cada plataforma.
- **Quem depende**: [[Agente Monitor]] (rastreia engagement dos posts).
- **Referencia**: [[Distribuicao Automatica]], [[LinkedIn e Medium]], [[Reddit]] (V2), [[Parasite SEO]] (V2).

---

## Custo estimado por distribuicao (V1.2 completa)

| Componente | Custo |
|---|---|
| Claude Sonnet (3 adaptacoes, ~6k tokens) | ~$0,05 |
| LinkedIn API | Gratuito |
| Medium API | Gratuito |
| **Total por artigo** | **~$0,05-0,10** |

V1 (tecnico apenas): ~$0,01 (so scheduling + validacao).

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 7, 8 — ultima verificacao 2026-04-23.*
