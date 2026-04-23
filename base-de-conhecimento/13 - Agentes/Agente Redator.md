---
tipo: agente
area: Sistema
tags: [agente, redator, conteudo, seo, aio, escrita]
atualizado: 2026-04-22
---

# Agente Redator

## Funcao

O Agente Redator transforma o research pack do [[Agente Pesquisador]] em conteudo otimizado para SEO e AIO. Ele escreve artigos no formato answer-first (resposta direta no primeiro paragrafo para AI Overviews e featured snippets), com pull quotes, estatisticas inline, headers hierarquicos, FAQ com schema markup sugerido, e tom adequado ao publico do cliente. Produz conteudo que rankeia no Google E aparece como citacao em ChatGPT, Perplexity e AI Overviews.

---

## Input

- **Research pack**: do [[Agente Pesquisador]] — SERP analysis, content gaps, estatisticas, fontes, outline sugerido
- **Content brief**: keyword principal, secundarias, formato, word count target, tom de voz do cliente
- **Templates de formato**: [[Melhor X]], [[Como Fazer X]], [[X vs Y]] — estrutura especifica por tipo
- **Brand voice**: guia de tom e voz do cliente (formal/informal, tecnico/acessivel)
- **Historico**: conteudos anteriores do cliente para manter consistencia

## Output

- **Artigo completo** (Markdown): titulo otimizado, meta description, H2s/H3s, conteudo, FAQ, CTA
- **Metadata SEO**: title tag, meta description, slug, canonical suggestion
- **Schema markup sugerido**: JSON-LD para FAQ, HowTo, Article, ou Product Review (conforme formato)
- **Dados de AIO**: pull quotes destacados, answer box no topo, dados estruturados para citacao por LLMs
- **Notas para Revisor**: pontos que precisam de validacao, fontes nao confirmadas, decisoes editoriais

---

## Ferramentas/APIs

| Ferramenta | Uso |
|---|---|
| **Claude Opus 4 API** | Geracao do conteudo principal (modelo cognitivo para escrita de alta qualidade) |
| **Surfer SEO API** | Validacao de keyword density, NLP terms, content score em tempo real durante geracao |
| **Grammarly API** (ou LanguageTool) | Verificacao gramatical em portugues |
| **PostgreSQL** | Armazenar draft, versoes, feedback do Revisor |
| **MCP Tools** | `generate_article`, `check_seo_score`, `apply_template`, `generate_schema` |

---

## Gatilho

- **Orquestrador despacha**: apos [[Agente Pesquisador]] entregar research pack completo
- **Reescrita**: [[Agente Revisor]] reprova e envia feedback estruturado para reescrita parcial ou total
- **Atualizacao de conteudo**: [[Agente Monitor]] detecta queda de ranking e solicita refresh do artigo

---

## Criterios de Sucesso

- **SEO score (Surfer)**: > 80/100 antes de enviar para revisao
- **AIO score**: answer-first no paragrafo 1, pelo menos 3 pull quotes, dados estruturados para citacao
- **Word count**: dentro de +/- 10% do target definido no brief
- **Keyword coverage**: keyword principal no titulo, H1, primeiro paragrafo, e 2-3 H2s; secundarias distribuidas naturalmente
- **Originalidade**: < 5% de similaridade com qualquer fonte do research pack (nao copiar, reescrever)
- **E-E-A-T signals**: citacao de fontes autoritativas, dados com referencia, perspectiva pratica (nao generico)

---

## Casos de Erro

1. **Research pack incompleto**: poucos dados ou fontes insuficientes. Agente solicita re-pesquisa ao [[Agente Pesquisador]] via Orquestrador com indicacao do que falta.
2. **SEO score baixo persistente**: conteudo nao atinge > 80 apos 2 iteracoes internas. Agente envia para Revisor com flag "SEO_NEEDS_HELP" para ajuste manual de termos NLP.
3. **Tom de voz inconsistente**: conteudo sai muito formal/informal para o cliente. Agente deve recarregar brand voice guide e regenerar secoes afetadas.
4. **Conteudo muito longo/curto**: ultrapassa +/- 20% do target. Agente deve ajustar cortando secoes menos relevantes ou expandindo content gaps.
5. **Alucinacao de dados**: Claude gera estatisticas nao presentes no research pack. Safeguard: instrucao explicita no prompt de usar APENAS dados do research pack, nunca inventar.

---

## Fallback

- **Claude Opus indisponivel**: usar Claude Sonnet 4 com prompt mais detalhado (perde qualidade, ganha disponibilidade). Marcar conteudo como "SONNET_GENERATED" para revisao mais rigorosa.
- **Surfer API indisponivel**: gerar conteudo sem score em tempo real. [[Agente Revisor]] fara verificacao de SEO score pos-geracao.
- **Reescrita falha 2x**: escalonar para humano com draft + feedback do Revisor para edicao manual.
- **Template nao encontrado**: usar estrutura generica (intro, desenvolvimento, conclusao, FAQ) e marcar para revisao de formato.

---

## Dependencias

- **Depende de**: [[Orquestrador]] (despacho), [[Agente Pesquisador]] (research pack), Surfer SEO API, Claude Opus 4
- **Quem depende dele**: [[Agente Revisor]] (recebe draft para revisao)
- **Referencia**: [[On-Page SEO]], [[Schema Markup para IA]], [[E-E-A-T]], [[Melhor X]], [[Como Fazer X]], [[X vs Y]]

---

## Exemplo de Execucao

**Cenario**: Escrever "Melhor software de gestao financeira 2026" (formato [[Melhor X]])

```
1. [08:16] Orquestrador despacha research pack + brief para Redator

2. [08:16] Redator carrega template [[Melhor X]]:
   - Paragrafo 1: resposta direta ("O melhor software de gestao financeira
     em 2026 e o [X] para [caso], [Y] para [caso]...")
   - Secao comparativa: tabela com criterios
   - Analise individual: 5-8 ferramentas com pros/contras
   - FAQ: 5-8 perguntas do PAA
   - Conclusao: recomendacao final com CTA

3. [08:17] Redator envia prompt para Claude Opus 4:
   - System: "Voce e um redator SEO especialista. Use APENAS os dados 
     do research pack. Nunca invente estatisticas."
   - User: brief + research pack + template + brand voice
   - Restricoes: answer-first, pull quotes a cada 300 palavras, 
     dados com fonte entre parenteses

4. [08:22] Claude Opus 4 retorna draft (3.200 palavras)

5. [08:22] Redator submete para Surfer SEO API:
   - Content score: 84/100 ✓
   - NLP terms faltando: "fluxo de caixa", "conciliacao bancaria"
   
6. [08:23] Redator ajusta: insere termos NLP em secoes relevantes
   - Novo score: 87/100 ✓

7. [08:24] Redator gera metadata:
   - Title: "10 Melhores Softwares de Gestao Financeira 2026 [Testados]"
   - Meta: "Compare os melhores ERPs financeiros de 2026. Analise com 
     precos, funcionalidades e para quem cada um e ideal."
   - Schema: FAQPage JSON-LD com 6 perguntas

8. [08:25] Draft + metadata + schema enviados para Revisor via Orquestrador
```

**Tempo total**: 9 minutos. **Custo**: ~$0.22.

---

## Custo Estimado por Execucao

| Componente | Custo |
|---|---|
| Claude Opus 4 (~10k tokens input, ~8k output) | ~$0.18 |
| Surfer SEO API (1-2 checks) | ~$0.03 |
| LanguageTool (grammar check) | ~$0.01 |
| **Total por artigo** | **~$0.20-0.25** |
| **Com reescrita (1 iteracao)** | **~$0.35-0.45** |

---

## Notas Relacionadas

- [[Arquitetura de Agentes]]
- [[Orquestrador]]
- [[Agente Pesquisador]]
- [[Agente Revisor]]
- [[On-Page SEO]]
- [[Schema Markup para IA]]
- [[E-E-A-T]]
- [[Melhor X]]
- [[Como Fazer X]]
- [[X vs Y]]
