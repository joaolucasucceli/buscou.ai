---
tipo: playbook
area: Ambos
tags: [fluxo, v1, produto, pipeline, onboarding, agentes, mvp]
atualizado: 2026-04-23
---

# Fluxo V1 — do pagamento ao primeiro resultado

> Fonte canonica: [[VERDADE_UNICA_BUSCOU]]. Este documento descreve o caminho minimo completo que transforma um lead em cliente com resultado. Cada etapa desenhada para entregar valor rapido com minima friccao.

[[Modo MVP]] define o escopo: somente o que gera resultado mensuravel entra no V1. Tudo "nice to have" vai para V1.2+.

Relacionado: [[Fluxo Operacional Completo]] | [[Onboarding Automatico]] | [[Orquestrador]] | [[Arquitetura de Agentes]] | [[Roadmap do Produto]]

---

## Visao geral — 8 etapas

```
Pagamento → Conta → Onboarding → Business Context → Estrategia → Conteudo → Publicacao → Dashboard
```

```
+----------+    +----------+    +----------+    +--------------+
| Pagamento|--->|  Conta   |--->|Onboarding|--->|  Business    |
| gateway  |    | (Auth)   |    | (Wizard) |    |  Context     |
+----------+    +----------+    +----------+    +------+-------+
                                                       |
                                                       v
+----------+    +----------+    +----------+    +--------------+
|Dashboard |<---|Publicacao|<---| Conteudo |<---| Estrategia   |
|(Progresso|    |(WP REST) |    |(Pesq.+   |    |(Estrategista |
|  final)  |    |          |    | Redator) |    |   + Brief)   |
+----------+    +----------+    +----------+    +--------------+
```

---

## Etapa 1 — Pagamento (duas linhas)

Cliente escolhe a oferta na landing e finaliza o checkout (Stripe ou Asaas). O checkout cobra a **implementacao** e cria a **subscription da infra mensal** agendada para o mes 2.

| Campo | Detalhe |
|---|---|
| Quem executa | Cliente (acao) + Sistema (processamento) |
| Tempo estimado | 1-3 min |
| Input | Selecao da modalidade de implementacao (a vista R$ 2.500 / parcelado 12x de R$ 250) + dados de pagamento + cartao recorrente para infra (R$ 300/mes a partir do mes 2) |
| Output | Implementacao confirmada (webhook `checkout.session.completed`) + subscription da infra criada com `trial_end` em D+30 (mes 1 "incluso" — comeca a cobrar no mes 2) |
| Tabela afetada | `compras` (implementacao), `parcelas_implementacao` (1-12 se parcelado), `assinaturas_infra` (status `pending_start`) |
| Proximo passo | Criacao automatica da conta |

**Detalhes tecnicos:**
- Stripe Checkout em modo `payment` para a implementacao (a vista) OU `payment_with_installments` (12x).
- Stripe Subscription criada em paralelo com `trial_end` de 30 dias para a infra mensal — primeira cobranca automatica no mes 2.
- Asaas equivalente: checkout unico + assinatura recorrente (suporte nativo a 12x no cartao).
- Metadata distingue `tipo: implementacao` vs `tipo: infra` nos webhooks de pagamento (para o [[Agente Pagamento]] rotear corretamente).
- Em caso de falha na implementacao: fluxo nao prossegue (cliente ve erro do gateway). Se falha so na subscription da infra mas implementacao ok: continua, cliente e notificado para ajustar cartao antes do mes 2.

---

## Etapa 2 — Conta criada

Apos pagamento confirmado, o sistema cria a conta, a organizacao e o perfil.

| Campo | Detalhe |
|---|---|
| Quem executa | Sistema (automatico via webhook) |
| Tempo estimado | < 2s |
| Input | Dados do webhook (email, nome, `gateway_customer_id`) |
| Output | Usuario autenticado no Supabase, organizacao criada, perfil vinculado |
| Tabela afetada | `auth.users`, `organizacoes`, `perfis_organizacao` (role `owner`) |
| Proximo passo | Redirect automatico para onboarding wizard |

**Detalhes tecnicos:**
- Supabase Auth via `signUp()` ou magic link.
- Organizacao criada com `nome_fantasia` + `pagamento_id`.
- Se e-mail ja existe, vincula o novo pagamento ao usuario existente.
- Token JWT enviado ao frontend.

---

## Etapa 3 — Onboarding (wizard de 5 etapas)

Cliente responde wizard que coleta informacoes para gerar estrategia. Detalhado em [[Onboarding Automatico]].

| Campo | Detalhe |
|---|---|
| Quem executa | Cliente (responde) + Sistema (salva e valida) |
| Tempo estimado | 10-15 min |
| Input | Respostas em 5 etapas |
| Output | Sessao de onboarding completa com respostas salvas |
| Tabela afetada | `sessoes_onboarding` (`status: completa`), `respostas_onboarding` (5 linhas) |
| Proximo passo | Geracao automatica do Business Context |

**Etapas do wizard:**

| # | Pergunta-chave | Dado coletado |
|---|---|---|
| 1 | Identidade: nome do negocio, segmento, dominio (ou subdominio buscou.ai/{slug}) | `nome_empresa`, `segmento`, `url_site` |
| 2 | Localizacao: cidade, estado, bairros foco | `cidade`, `estado`, `bairros_foco[]` |
| 3 | Servicos/produtos principais e diferenciais | `servicos[]`, `produto_principal`, `diferenciais[]` |
| 4 | Tom de voz + publico-alvo (perfil, dor principal) | `tom_voz`, `icp_descricao`, `dor_principal` |
| 5 | Concorrentes top 3 + acesso GSC (opcional) | `concorrentes[]`, `gsc_token` |

**Regras de UX:**
- Progresso visivel.
- Respostas salvas a cada etapa (pode fechar e voltar).
- Validacao inline.
- Nenhuma etapa > 2 min.

---

## Etapa 4 — Business Context gerado

Sistema consolida respostas em [[Objeto Business Context]].

| Campo | Detalhe |
|---|---|
| Quem executa | Sistema (automatico) |
| Tempo estimado | < 30s |
| Input | 5 respostas + dados da organizacao |
| Output | Objeto `business_context` completo e validado |
| Tabela afetada | `contextos_negocio` (linha com JSON, `organizacao_id`, `versao: 1`) |
| Proximo passo | Disparo do [[Agente Estrategista]] |

**Estrutura do Business Context:**

```json
{
  "empresa": {
    "nome": "Clinica de Estetica Horizonte",
    "segmento": "Clinica de estetica",
    "cidade": "Vitoria",
    "estado": "ES",
    "bairros_foco": ["Praia do Canto", "Jardim da Penha"]
  },
  "servicos": ["Harmonizacao facial", "Botox", "Preenchimento"],
  "icp": {
    "descricao": "Mulheres 25-45 anos buscando tratamentos esteticos",
    "dor": "Nao sabem qual clinica escolher, medo de resultado ruim"
  },
  "diferenciais": ["15 anos no mercado", "Equipamento de ultima geracao"],
  "tom_voz": "Acolhedor, profissional, com explicacoes tecnicas claras",
  "objetivos": {
    "meta_30_dias": "Blog no ar com primeiros sinais",
    "meta_90_dias": "Top 10 para 'harmonizacao facial Vitoria'",
    "desafio": "Ninguem encontra a clinica no Google"
  }
}
```

---

## Etapa 5 — Estrategia inicial

[[Agente Estrategista]] recebe o Business Context e gera estrategia: keywords, clusters, calendario editorial.

| Campo | Detalhe |
|---|---|
| Quem executa | Agente Estrategista (automatico) |
| Tempo estimado | < 60s |
| Input | `business_context` |
| Output | 20-40 keywords priorizadas, 3-5 clusters tematicos, calendario 30 dias (90 artigos) |
| Tabela afetada | `palavras_chave`, `projetos` (tipo `estrategia_inicial`, status `ativo`) |
| Proximo passo | Disparo dos 3 primeiros briefings |

**O que o Estrategista gera:**

1. **Keywords priorizadas (20-40)**: keyword principal, volume, dificuldade, score, intencao, cluster.
2. **Clusters tematicos (3-5)**: pillar page + cluster pages, seguindo [[Content Strategy e Topic Clusters]].
3. **Calendario editorial (30 dias)**: 3 artigos/dia, priorizacao por score + intencao, datas sugeridas.
4. **3 briefings iniciais** (os mais prioritarios): titulo, keyword principal + secundarias, intencao, estrutura, angulo.

---

## Etapa 6 — 3 conteudos gerados

[[Agente Pesquisador]] + [[Agente Redator]] geram os 3 primeiros artigos.

| Campo | Detalhe |
|---|---|
| Quem executa | Pesquisador (pesquisa) + Redator (redacao) |
| Tempo estimado | 5-15 min (paralelo) |
| Input | 3 briefings + `business_context` |
| Output | 3 artigos em status `aprovado` (via [[Agente Revisor]] com score >= 75) |
| Tabela afetada | `briefings_conteudo` (3 linhas), `conteudos` (3 linhas com `titulo`, `conteudo_markdown`, `status`, `keyword_principal`, `pontuacao_seo`, `pontuacao_aio`) |
| Proximo passo | Etapa de imagem + publicacao |

**Fluxo de cada artigo:**

1. **Pesquisador** busca: top 10 SERP, PAA, dados locais, estatisticas, perguntas frequentes.
2. **Redator** aplica [[Template de Artigo]]:
   - Answer-first (trecho citavel por IA em < 100 palavras).
   - 800-1.200 palavras.
   - FAQ com 3-5 perguntas.
   - CTA contextual.
   - Schema FAQPage + Article (quando aplicavel LocalBusiness).
3. **Output por artigo:** `conteudo_markdown`, `titulo_seo` (<60 chars), `meta_descricao` (<155 chars), `faq_json`, `schema_json_ld`, `pontuacao_seo`, `pontuacao_aio`.

---

## Etapa 7 — Imagens e publicacao

[[Agente Visual]] anexa capa (Unsplash em V1) + alt text. [[Agente Publicador]] publica no CMS do cliente.

| Campo | Detalhe |
|---|---|
| Quem executa | Visual (imagem) + Publicador (publicacao) |
| Tempo estimado | < 30 min total (3 artigos) |
| Input | 3 artigos `aprovado` |
| Output | 3 artigos `publicado` com URLs reais |
| Tabela afetada | `imagens_conteudo` (3+ linhas), `conteudos` (status → `publicado`, `url_publicada`, `data_publicacao`) |
| Proximo passo | Sitemap + indexacao via GSC |

**Fluxo de publicacao V1 (auto-publish se score >= 75):**

1. **Visual**: busca Unsplash contextual → WebP + 3 tamanhos → alt text.
2. **Publicador**: WordPress REST API (ou Next.js CMS interno) → schema JSON-LD → GSC indexacao request.
3. **Distribuidor (V1 tecnico)**: RSS + ping GSC.

---

## Etapa 8 — Dashboard com progresso

Cliente acessa [[Dashboard do Cliente]] e ve o progresso: keywords, conteudos, status, calendario.

| Campo | Detalhe |
|---|---|
| Quem executa | Sistema (renderizacao automatica) |
| Tempo estimado | Real-time |
| Input | Dados de todas as tabelas |
| Output | Dashboard visual com progresso completo |
| Tabela afetada | Apenas leitura |
| Proximo passo | Ciclo continuo — pipeline segue publicando 3 artigos/dia |

**O que o cliente ve:**

| Secao | Conteudo |
|---|---|
| Resumo | Motor ativo, data de ativacao, proximos marcos |
| Keywords | Lista priorizada com score e posicao (quando disponivel) |
| Conteudos | Cards com titulo, status, data publicacao |
| Calendario | Proximos 30 dias com 90 artigos agendados |
| Progresso | Barra: onboarding → estrategia → conteudo → publicacao → indexacao |
| Primeiros sinais (D+30) | Indexacao GSC, primeiras impressoes |

---

## First value moment

> O "momento magico" acontece imediatamente apos o onboarding — em menos de 60 segundos.

Ao completar o onboarding, o sistema:
1. Gera o Business Context (< 5s).
2. Roda o Estrategista (< 60s).
3. Exibe no dashboard (< 5s):
   - 20-40 keywords sugeridas com score.
   - 3-5 clusters tematicos.
   - 3 conteudos marcados como "em producao".
   - Calendario dos proximos 30 dias preenchido com 90 artigos.

**Por que importa:** o cliente gastou 10-15 min respondendo. A recompensa imediata (plano completo em segundos) cria confianca e justifica o pagamento.

---

## Corte V1 — o que entra e o que fica para depois

### V1 inclui

| Componente | Descricao |
|---|---|
| Onboarding | Wizard 5 etapas + salvamento progressivo |
| Business Context | Geracao automatica |
| Agente Estrategista | Keywords + clusters + calendario 90/mes |
| Agente Pesquisador | SERP + PAA + gaps |
| Agente Redator | Artigo 800-1.200 palavras com template |
| Agente Revisor | Score SEO + AIO + answer-first (>= 75) |
| Agente Visual | Unsplash + alt text (V1.1 adiciona DALL-E) |
| Agente Publicador | WordPress REST API + schema + GSC ping |
| Agente Distribuidor | V1 tecnico (RSS + sitemap + GSC); V1.2 LinkedIn/Medium |
| Agente Monitor | GSC (V1 manual para AIO); V1.1 automatiza AIO |
| Agente Suporte | V1 WhatsApp humano; V1.2 chatbot |
| Agente Prospeccao | V1 manual; V1 completa automatiza e-mail |
| Agente Pagamento | Webhook gateway + confirmacao |
| Dashboard basico | Keywords, conteudos, calendario, progresso |

### V1.2+

| Componente | Motivo |
|---|---|
| Agente Distribuidor (LinkedIn/Medium) | V1 foca tecnico; social entra em V1.2 |
| Agente Visual DALL-E | V1 Unsplash; V1.1 DALL-E |
| Monitor automatico AIO | V1 manual; V1.1 integra Otterly/AthenaHQ |
| Chatbot Agente Suporte | V1 WhatsApp direto |
| Prospeccao outbound | V1 manual |
| Multi-idioma | So PT-BR em V1 |
| Relatorios PDF | Dashboard resolve em V1 |

---

## Timeline — do pagamento ao primeiro resultado

| Etapa | Tempo | Acumulado | Quem |
|---|---|---|---|
| Pagamento → conta criada | Instantaneo | 0 min | Sistema |
| Onboarding completo | 10-15 min | 15 min | Cliente |
| Business Context gerado | < 30s | 15 min | Sistema |
| Estrategia pronta | < 60s | 16 min | Agente Estrategista |
| 3 conteudos em draft | 5-15 min | 31 min | Agentes |
| Revisao + imagem + publicacao | < 30 min | ~1h | Agentes |
| Dashboard com tudo visivel | Real-time | ~1h | Sistema |
| Primeiros sinais (impressoes GSC) | 7-30 dias | 30 dias | Agente Monitor |

**Resumo:** menos de 1h do pagamento ate o primeiro artigo publicado. Menos de 30 dias ate os primeiros sinais. Blog no ar em ate 7 dias (SLA canonico).

---

## Sequencia de build — 5 fases de desenvolvimento

| Fase | Foco | Resultado para o cliente | Criterio de "pronto" |
|---|---|---|---|
| **1** | Auth + Organizations + Onboarding wizard + salvar respostas | Conta criada, dados coletados | Cliente completa onboarding |
| **2** | Gerar business_context + dashboard basico + estrategia inicial | Cliente ve keywords e plano | Dashboard mostra calendario |
| **3** | Conteudo: pesquisa + redacao + revisao + visual + publicacao | Artigos gerados e publicados | 3 artigos publicados em WordPress de teste |
| **4** | Landing publica + blog proprio + CTA | Site vendendo | Landing com checkout funcional |
| **5** | Gateway (Stripe/Asaas) + integracoes + monitoramento AIO | Produto monetizado | Fluxo pagamento → publicacao end-to-end |

---

## Jobs disparados no fluxo

| Job | Trigger | Agente | Prioridade |
|---|---|---|---|
| `confirmar_pagamento` | Webhook `payment_intent.succeeded` | Agente Pagamento | Alta |
| `criar_conta` | Apos confirmar pagamento | Sistema | Alta |
| `gerar_business_context` | Onboarding completo | Sistema | Alta |
| `gerar_estrategia_inicial` | Business context pronto | Estrategista | Alta |
| `pesquisar_keyword` | Briefing criado | Pesquisador | Media |
| `gerar_conteudo` | Pesquisa pronta | Redator | Media |
| `revisar_conteudo` | Conteudo em draft | Revisor | Media |
| `gerar_imagem` | Conteudo aprovado | Visual | Media |
| `publicar_conteudo` | Imagem pronta | Publicador | Media |
| `distribuir_conteudo` | Conteudo publicado | Distribuidor | Baixa |
| `monitorar_conteudo` | URL publicada | Monitor | Baixa (continuo) |
| `atualizar_dashboard` | Qualquer mudanca de status | Sistema | Baixa |

Cada job e gerenciado pelo [[Orquestrador]] com retry automatico. Ver [[Tratamento de Falhas]].

---

## Metricas de sucesso da V1

| Metrica | Alvo | Como medir |
|---|---|---|
| Tempo onboarding → first value | < 60s | Timestamp entre `onboarding_completo` e `dashboard_carregado` |
| Tempo pagamento → primeiro conteudo publicado | < 48h | Timestamp entre `pagamento_confirmado` e `conteudo_publicado` |
| Taxa de conclusao do onboarding | > 80% | `sessoes_completas / sessoes_iniciadas` |
| Blog no ar em 7 dias | 100% | SLA canonico |
| Primeiros sinais em 30 dias | > 90% | Indexacao GSC + primeiras impressoes |
| Qualidade dos conteudos | Score SEO >= 75, AIO >= 70 | [[Agente Revisor]] |
| Volume mensal | 90 artigos/cliente ativo | Auditoria diaria |

---

## Notas relacionadas

- [[Onboarding Automatico]] — wizard de 5 etapas
- [[Objeto Business Context]] — estrutura do objeto
- [[Agente Estrategista]] — logica de priorizacao
- [[Agente Redator]] — como os artigos sao gerados
- [[Orquestrador]] — coordenacao dos jobs
- [[Jobs]] — fila assincrona
- [[Dashboard do Cliente]] — interface
- [[Modo MVP]] — corte V1 vs V1 completa
- [[Roadmap do Produto]] — evolucao
- [[Template de Artigo]] — estrutura dos conteudos

---

*Alinhado com [[VERDADE_UNICA_BUSCOU]] secoes 4, 5, 7, 8 — ultima verificacao 2026-04-23.*
