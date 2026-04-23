---
tipo: produto
area: Requisitos
tags: [produto, mvp, minimo, validacao, simplicidade]
atualizado: 2026-04-23
---

# Modo MVP — menor complexidade para validar

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. O MVP nao e a V1 com menos features. E a menor versao que valida se a buscou.ai gera resultado real. Tudo que nao contribui para provar valor e cortado.

Relacionado: [[Roadmap do Produto]] | [[Fluxo V1]] | [[Requisitos Produto Autonomo]] | [[Unit Economics]]

---

## Escopo: MVP vs V1 completa

| Aspecto | MVP (primeiros 10-15 clientes) | V1 completa |
|---|---|---|
| Clientes alvo | 5-15 (beta) | 50-100+ |
| Conteudos/mes por cliente | 30-45 (ritmo reduzido no inicio) | 90 |
| Agentes ativos | 4-5 (Pesquisador, Estrategista, Redator, Publicador, Monitor) | 11 (core + complementares + orquestrador) |
| Dashboard | Basico (health score + lista de conteudos) | Completo (5-7 telas) |
| Onboarding | Wizard simplificado (5 passos) | Wizard completo (5 passos) |
| Integracoes | GSC | GSC + GA4 + GBP + gateway completo |
| Pagamento | Link de checkout manual | [[Agente Pagamento]] automatico |
| Suporte | WhatsApp direto com fundador | [[Agente Suporte]] + escalacao |
| Distribuicao | RSS + ping GSC | V1.2: LinkedIn + Medium |
| Visual (imagens) | Unsplash via busca contextual | V1.1: DALL-E 3 |
| Monitoramento | GSC + planilha manual para AIO | [[Agente Monitor]] com APIs AIO |
| Relatorio | Dashboard simples | Dashboard completo + relatorio mensal |

---

## Onboarding simplificado (MVP)

Wizard de 5 passos (mesmo da V1 completa — o fluxo ja e enxuto):

1. **Identidade**: nome, site/dominio (ou subdominio buscou.ai/{slug}), segmento.
2. **Localizacao**: cidade, bairros, raio de atuacao.
3. **Servicos**: lista de servicos/tratamentos/produtos.
4. **Tom e diferenciais**: tom de voz, 2-3 diferenciais.
5. **Concorrentes + GSC**: top 3 concorrentes, acesso GSC (opcional — cliente pode conectar depois).

---

## Agentes no MVP

| Agente | Status MVP | Justificativa |
|---|---|---|
| [[Agente Pesquisador]] | Ativo | Sem briefing nao ha qualidade |
| [[Agente Estrategista]] | Ativo (simplificado) | Gera clusters e calendario basico |
| [[Agente Redator]] | Ativo | Core do produto |
| [[Agente Revisor]] | Ativo | Garante qualidade minima (score 75) |
| [[Agente Publicador]] | Ativo | Publica via WordPress REST API |
| [[Agente Visual]] | Unsplash only | V1.1 inclui DALL-E |
| [[Agente Monitor]] | Manual (GSC + planilha) | V1.1 automatiza com APIs AIO |
| [[Agente Distribuidor]] | RSS + ping GSC | V1.2 inclui LinkedIn/Medium |
| [[Agente Suporte]] | WhatsApp direto com fundador | V1.2 implementa chatbot |
| [[Agente Prospeccao]] | Nao ativo | Prospeccao manual inicial via outbound pessoal |
| [[Agente Pagamento]] | Webhook simples + e-mail manual | V1 completa automatiza notificacoes |
| [[Orquestrador]] | Script simplificado sem fila complexa | V1 completa usa BullMQ + Redis |

**Resumo:** MVP roda com 5 agentes automatizados (Pesquisador, Estrategista, Redator, Revisor, Publicador) + Visual basico. Fundador assume: suporte, prospeccao, monitor de AIO, distribuicao avancada. V1.1 e V1.2 automatizam o resto.

---

## Stack MVP

| Camada | MVP | V1 completa |
|---|---|---|
| Frontend | Next.js 15 basico (1-2 paginas) | Next.js completo (5-7 telas) |
| Backend | Supabase (auth + DB + edge functions) | Supabase + workers dedicados |
| Agentes | Claude API direto | Claude Agent SDK + MCP |
| Fila | Sincrono (sem fila complexa) | BullMQ + Redis |
| CMS | WordPress REST API | WordPress / CMS proprio |
| Pagamento | Stripe link manual (fundador envia implementacao + configura Subscription infra) | Stripe Checkout auto (implementacao) + Subscription auto (infra R$300/mes) |
| Deploy | Vercel free tier | Vercel Pro |

**Custo MVP**: ~R$ 200-400/mes (Supabase + Vercel + Claude API + Ahrefs/DataForSEO basico).

---

## O que validar no MVP

| Hipotese | Como validar | Criterio |
|---|---|---|
| Pipeline gera conteudo que rankeia | Publicar 45+ artigos, medir posicoes em 60 dias | 3+ artigos no Top 10 em 60 dias |
| Conteudo gera citacao em IA | Testar prompts semanalmente | 1+ citacao confirmada em 90 dias |
| Cliente ve valor em ate 30 dias | NPS no dia 30 | NPS > 7 |
| Unit economics fecha | Medir custos reais vs receita (implementacao R$ 2.500/3.000 + infra R$ 300/mes) | Margem bruta ano 1 > 70% |
| Pipeline roda sem quebrar | Ciclo completo x3 | Zero bloqueio critico |
| Ativacao em 7 dias funciona | Time-to-first-value | TTFV < 48h (medio), teto 7d |

---

## Criterios para sair do MVP

Nao avance para V1 completa ate atingir TODOS:

- [ ] 45+ conteudos publicados (3 clientes x 15 artigos) OU 1 cliente completo com 90 artigos.
- [ ] 3+ artigos no Top 10 do Google.
- [ ] 1+ citacao confirmada em IA.
- [ ] 5+ clientes beta ativos (implementacao paga + infra mensal R$ 300 ativa).
- [ ] 3+ com NPS > 7.
- [ ] Margem bruta > 70% confirmada.
- [ ] Pipeline rodou 8+ semanas sem quebrar.
- [ ] TTFV medio < 48h, teto 7 dias respeitado.

Atendido → migrar para V1 completa do [[Roadmap do Produto]].

---

## O que NAO fazer no MVP

- Nao construir dashboard com 5+ telas (1 tela + lista de conteudos resolve).
- Nao automatizar notificacoes de pagamento (e-mail manual do fundador resolve).
- Nao implementar chatbot de suporte (WhatsApp direto resolve).
- Nao fazer distribuicao em LinkedIn/Medium (V1.2 trata).
- Nao gerar imagens com DALL-E (Unsplash resolve em V1).
- Nao adicionar features que nenhum beta pediu.

**Regra:** se nao contribui diretamente para "conteudo publicado → indexacao → ranking/citacao IA → cliente feliz", corta.

---

## Timeline MVP

| Semana | Foco |
|---|---|
| 1 | Setup: Supabase + Next.js + WordPress connectados |
| 2 | Agente Estrategista: gera keywords + clusters |
| 3 | Agente Redator + Revisor: gera e valida 5 conteudos |
| 4 | Agente Publicador: publica + indexa (3-5 artigos/dia) |
| 5 | Primeiro beta pagante (R$ 2.500) onboarded |
| 6-8 | Volume: subir para 3-5 betas. Ajustar prompts conforme feedback |
| 9-12 | Medir: ranking, AIO, NPS, margem. Validar criterios de saida |

---

## Notas relacionadas

- [[Roadmap do Produto]] — visao MVP → V1 → V2
- [[Modo Manual]] — como rodar antes mesmo do MVP
- [[Onboarding Automatico]] — wizard de 5 passos
- [[Unit Economics]] — custos e margens
- [[Go To Market Inicial]] — como fechar betas
- [[Nicho Inicial]] — qual nicho atacar primeiro
- [[Fluxo V1]] — caminho end-to-end do produto

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 5, 7, 8 — ultima verificacao 2026-04-23.*
