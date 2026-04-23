---
tipo: recurso
area: Ambos
tags: [prompts, conteudo, ia, geracao, operacional]
atualizado: 2026-04-22
---

# Prompts para Geracao de Conteudo

Use estes prompts no **ChatGPT, Claude ou Gemini** como seu assistente de conteudo. Cada prompt foi testado e refinado para gerar resultados praticos. Copie, cole, substitua os campos entre `[colchetes]` e execute.

> **Regra de ouro**: Nunca publique a saida da IA direto. Use como rascunho, adicione sua experiencia, dados proprios e voz da marca. Veja [[E-E-A-T]] para entender por que isso importa.

---

## 1. Pesquisa de Topico

**Prompt:**
> "Analise as top 10 paginas que rankeiam no Google para a keyword '[keyword]'. Identifique: (1) os subtopicos que TODAS cobrem, (2) os gaps de conteudo que nenhuma cobre, (3) o formato predominante (listicle, guia, comparativo), (4) a contagem media de palavras. Apresente em tabela."

**Quando usar:** Antes de escrever qualquer artigo novo. E o primeiro passo do processo.
**Saida esperada:** Tabela comparativa + lista de gaps = seu diferencial competitivo.
**Dica:** Combine com [[Ahrefs]] ou [[SEMrush]] para validar volume de busca dos gaps encontrados.

---

## 2. Brief de Conteudo Completo

**Prompt:**
> "Crie um brief completo para um artigo sobre '[tema]' otimizado para SEO e AIO. Inclua: (1) titulo principal e 3 alternativas, (2) meta description com CTA, (3) estrutura de headers H2/H3, (4) palavras-chave primaria e secundarias, (5) perguntas do 'People Also Ask' para responder, (6) dados/estatisticas para incluir, (7) internal links sugeridos, (8) schema markup recomendado. Formato: documento estruturado pronto para enviar ao redator."

**Quando usar:** Apos a pesquisa de topico, para alinhar com o redator.
**Saida esperada:** Documento de 1-2 paginas que funciona como "receita" do artigo.
**Dica:** Salve briefs aprovados como templates para nichos recorrentes.

---

## 3. Estrutura Answer-First

**Prompt:**
> "Reescreva o paragrafo abaixo no formato answer-first para ser citado por IAs. Regras: (1) comece com uma resposta direta em 1-2 frases, (2) siga com um dado quantificavel de suporte, (3) expanda com contexto em 3-4 frases, (4) total entre 130-170 palavras. O trecho deve ser auto-contido — compreensivel sem ler o resto do artigo. Paragrafo original: [cole o paragrafo]"

**Quando usar:** Na revisao de conteudo existente. Aplique nas top 10 paginas primeiro.
**Saida esperada:** Paragrafo reformatado pronto para substituir o original.
**Dica:** IAs extraem 44,2% das citacoes do primeiro terco do texto. Priorize reescrever intros. Veja [[Como IA Escolhe Respostas]] e [[Como IAs Buscam e Citam Conteudo]].

---

## 4. Pull Quotes Citaveis

**Prompt:**
> "Extraia os 5 trechos mais citaveis deste artigo. Cada trecho deve: (1) ter entre 130-170 palavras, (2) ser auto-contido, (3) conter pelo menos 1 dado numerico ou afirmacao concreta, (4) funcionar como resposta direta a uma pergunta implicita. Para cada trecho, indique qual pergunta ele responde. Artigo: [cole o artigo]"

**Quando usar:** Apos publicar um artigo, para otimiza-lo para citacoes em IA.
**Saida esperada:** 5 trechos formatados + as perguntas que cada um responde.
**Dica:** Esses trechos sao seus "ganchos de citacao". Veja [[Sub-Query Optimization]] para entender como LLMs decompoe perguntas.

---

## 5. Meta Descriptions com CTA

**Prompt:**
> "Crie 3 variantes de meta description para a pagina '[titulo da pagina]' com a keyword '[keyword]'. Regras: (1) maximo 155 caracteres, (2) inclua a keyword nos primeiros 60 caracteres, (3) termine com CTA claro, (4) use linguagem ativa e especifica, (5) inclua um diferencial/numero quando possivel. Contexto da pagina: [resumo de 2 frases]."

**Quando usar:** Para cada pagina nova ou na otimizacao de paginas existentes.
**Saida esperada:** 3 opcoes para testar (escolha a melhor, guarde as outras para A/B testing).
**Dica:** Meta descriptions nao afetam ranking direto, mas afetam CTR — e CTR afeta ranking indiretamente. Veja [[On-Page SEO]].

---

## 6. Listicle Otimizado para AI Overviews

**Prompt:**
> "Transforme este conteudo em formato listicle otimizado para [[Google AI Overviews]]. Estrutura: (1) H1 com numero e keyword: 'X Melhores [tema] em 2026', (2) intro de 100 palavras com resposta direta, (3) cada item com H2 numerado, 100-200 palavras, pros/contras em bullet points, 'melhor para' em negrito, (4) tabela comparativa resumo no final, (5) secao FAQ com 3-5 perguntas. Conteudo base: [cole o conteudo]."

**Quando usar:** Para dominar queries "melhor X" e "top X". Veja tambem [[Melhor X]].
**Saida esperada:** Artigo reestruturado em formato listicle completo.
**Dica:** Listicles com ItemList schema tem 40% mais chance de aparecer em AI Overviews.

---

## 7. Content Refresh / Atualizacao

**Prompt:**
> "Analise este artigo publicado em [data de publicacao] e sugira atualizacoes para 2026. Identifique: (1) informacoes desatualizadas ou incorretas, (2) estatisticas que precisam de dados novos, (3) secoes que podem ser expandidas, (4) novos subtopicos relevantes que surgiram desde a publicacao, (5) oportunidades de adicionar dados estruturados. Para cada sugestao, indique a prioridade (alta/media/baixa). Artigo: [cole o artigo]."

**Quando usar:** Ciclo mensal de revisao de conteudo. IAs desvalorizam conteudo sem atualizacao apos 14 dias.
**Saida esperada:** Lista priorizada de mudancas com justificativa para cada.
**Dica:** Atualize SEMPRE a data de "ultima atualizacao" no artigo. Veja [[Como IA Escolhe Respostas]].

---

## 8. FAQ Generation baseada em PAA

**Prompt:**
> "Gere 10 perguntas frequentes sobre '[tema]' baseadas no 'People Also Ask' do Google. Para cada pergunta: (1) escreva a resposta em 2-3 frases diretas (formato answer-first), (2) inclua pelo menos 1 dado concreto, (3) mantenha cada resposta entre 40-60 palavras. No final, gere o JSON-LD de FAQPage schema para todas as perguntas."

**Quando usar:** Para toda pagina pilar ou artigo longo. FAQ schema e alto impacto para AIO.
**Saida esperada:** 10 Q&As formatadas + schema JSON-LD pronto para implementar.
**Dica:** Veja [[Schema Markup para IA]] para validar o schema gerado. Use Google Rich Results Test.

---

## 9. Titulo Magnetico

**Prompt:**
> "Crie 10 variantes de titulo para um artigo sobre '[tema]' com a keyword '[keyword]'. Regras: (1) maximo 60 caracteres, (2) 5 titulos informativos, 3 com numero, 2 com pergunta. Para cada titulo, indique o CTR estimado (alto/medio/baixo) e justifique em 1 frase."

**Quando usar:** Na criacao de qualquer conteudo novo.
**Saida esperada:** 10 titulos rankeados por potencial de CTR.
**Dica:** Titulos com numeros tem 36% mais cliques. Veja [[On-Page SEO]].

---

## 10. Introducao Hook

**Prompt:**
> "Escreva 3 variantes de introducao (150 palavras cada) para um artigo sobre '[tema]'. Formato: (1) Versao answer-first: comece com a resposta direta, (2) Versao estatistica: comece com um dado impactante, (3) Versao problema: comece com a dor do leitor. Keyword primaria: '[keyword]'. A keyword deve aparecer nas primeiras 100 palavras."

**Quando usar:** Para todo artigo novo. A intro determina se a IA extrai ou ignora seu conteudo.
**Saida esperada:** 3 intros prontas para escolher.
**Dica:** A versao answer-first geralmente performa melhor para AIO. Veja [[Framework AIO Completo]].

---

## 11. Conteudo Comparativo

**Prompt:**
> "Crie um artigo comparativo completo: '[Produto/Servico A] vs [Produto/Servico B]: Qual Escolher em 2026?'. Estrutura: (1) veredito rapido em 2 frases, (2) tabela comparativa com 8-10 criterios, (3) analise detalhada de cada criterio (100 palavras cada), (4) 'melhor para' cada perfil de usuario, (5) FAQ com 5 perguntas. Tom: neutro e baseado em fatos."

**Quando usar:** Para dominar queries "X vs Y". Veja tambem [[X vs Y]].
**Saida esperada:** Artigo comparativo completo de 1500-2000 palavras.
**Dica:** Comparativos sao o tipo de conteudo #1 para citacoes em IA. Imparcialidade e fundamental.

---

## 12. Outline de Guia Definitivo

**Prompt:**
> "Crie o outline detalhado para um guia definitivo sobre '[tema]'. O guia deve: (1) cobrir o tema de forma abrangente (3000-5000 palavras), (2) usar [[Content Strategy e Topic Clusters|topic cluster]] com links para subtopicos, (3) incluir secoes praticas com exemplos, (4) ter FAQ no final, (5) seguir estrutura [[E-E-A-T]]. Liste todos os H2 e H3 com descricao de 1 frase do que cada secao deve conter."

**Quando usar:** Para conteudo pilar que sera o centro de um cluster.
**Saida esperada:** Outline completo com 15-25 secoes detalhadas.
**Dica:** Guias definitivos sao imanes de backlinks. Veja [[Content Clustering e Pillar Pages]].

---

## 13. Reescrita para Tom de Marca

**Prompt:**
> "Reescreva este texto mantendo TODAS as informacoes, mas ajustando para o seguinte tom de marca: [descreva o tom — ex: profissional mas acessivel, tecnico mas sem jargao, casual e direto]. Mantenha a estrutura de headers. Nao adicione informacoes novas. Texto: [cole o texto]."

**Quando usar:** Quando o rascunho esta bom em conteudo mas nao reflete a voz da marca.
**Saida esperada:** Mesmo conteudo com tom ajustado.
**Dica:** Defina o tom de marca UMA VEZ e salve como custom instruction na IA.

---

## 14. CTA e Conversao

**Prompt:**
> "Crie 5 variantes de CTA para a pagina '[pagina]' com objetivo de '[objetivo — ex: agendar reuniao, baixar ebook, solicitar orcamento]'. Para cada CTA: (1) texto do botao (maximo 5 palavras), (2) texto de suporte (1 frase), (3) onde posicionar na pagina (topo, meio, final). Contexto: o publico-alvo e [perfil do ICP]."

**Quando usar:** Para toda pagina com objetivo de conversao.
**Saida esperada:** 5 CTAs prontos para implementar.
**Dica:** Veja [[ICP por Nicho]] para alinhar o CTA com o perfil do publico.

---

## 15. Resumo Executivo para Conteudo Longo

**Prompt:**
> "Crie um resumo executivo (TL;DR) de 150 palavras para este artigo. O resumo deve: (1) responder a pergunta principal do artigo na primeira frase, (2) listar os 3-5 pontos mais importantes, (3) incluir o dado mais impactante do artigo, (4) ser compreensivel SEM ler o artigo completo. Artigo: [cole o artigo]."

**Quando usar:** Para adicionar no topo de artigos longos (2000+ palavras).
**Saida esperada:** TL;DR formatado pronto para inserir no artigo.
**Dica:** TL;DRs no topo do artigo funcionam como "answer capsules" que IAs adoram citar. Veja [[Como IA Escolhe Respostas]].

---

## Workflow Recomendado

A ordem ideal para usar estes prompts ao criar conteudo novo:

```
1. Pesquisa de Topico (#1)
   ↓
2. Brief de Conteudo (#2)
   ↓
3. Outline / Titulo (#12, #9)
   ↓
4. Rascunho (escreva voce ou use IA)
   ↓
5. Reescrita Tom de Marca (#13)
   ↓
6. Otimizacao Answer-First (#3)
   ↓
7. Pull Quotes + TL;DR (#4, #15)
   ↓
8. Meta Description + CTA (#5, #14)
   ↓
9. FAQ + Schema (#8)
```

---

## Notas Relacionadas

- [[Analise SEO]] — Prompts para analise e auditoria SEO
- [[Otimizacao AIO]] — Prompts para otimizacao em IA
- [[Testes IA]] — Prompts para testar visibilidade em IA
- [[Framework SEO Completo]] — Framework que estes prompts implementam
- [[Framework AIO Completo]] — Framework AIO que estes prompts suportam
- [[Content Strategy e Topic Clusters]] — Estrategia de conteudo
- [[On-Page SEO]] — Fundamentos de otimizacao on-page
- [[Schema Markup para IA]] — Dados estruturados para IA
