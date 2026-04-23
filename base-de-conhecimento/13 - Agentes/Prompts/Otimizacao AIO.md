---
tipo: recurso
area: AIO
tags: [prompts, aio, otimizacao, ia, citacoes, operacional]
atualizado: 2026-04-22
---

# Prompts para Otimizacao AIO

Colecao de prompts operacionais para otimizar seu conteudo para citacoes em **ChatGPT, Perplexity, Google AI Overviews, Gemini e Claude**. Estes prompts transformam a teoria de [[Framework AIO Completo]] em acoes concretas que voce executa hoje.

> **Como funciona:** Voce usa a propria IA como ferramenta E como alvo. Estes prompts fazem a IA analisar seu conteudo e dizer como ajusta-lo para ser citado por ela mesma. E como perguntar ao juiz o que ele procura.

---

## 1. Auditoria de Citacao (Brand Check)

**Prompt:**
> "Busque informacoes sobre a empresa '[nome da marca/empresa]' do setor '[setor]' em '[cidade/pais]'. Me diga: (1) quais fontes voce usaria para responder sobre essa marca, (2) que informacoes voce tem sobre ela, (3) quais concorrentes voce mencionaria junto, (4) o que esta faltando para voce citar essa marca com mais confianca, (5) se as informacoes que voce tem estao corretas."

**Quando usar:** Primeiro passo de qualquer projeto AIO. Faca em ChatGPT, Perplexity e Gemini separadamente.
**Saida esperada:** Diagnostico de como cada IA ve a marca — gaps ficam claros imediatamente.
**Como agir:** Compare as respostas das 3 IAs. Os gaps em comum sao prioridade maxima. Veja [[Como IA Escolhe Respostas]].

---

## 2. Reescrita Answer-First para Citacao

**Prompt:**
> "Reescreva este conteudo para que seja citado por IAs. Regras: (1) comece CADA secao com resposta direta em 1-2 frases, (2) inclua pelo menos 1 dado numerico por secao, (3) crie 'answer capsules' de 120-150 caracteres logo apos cada H2, (4) mantenha paragrafos auto-contidos de 134-167 palavras, (5) use linguagem declarativa ('X e...', 'Os 3 principais sao...'). Conteudo original: [cole o conteudo]."

**Quando usar:** Para otimizar paginas existentes. Comece pelas top 10 em trafego.
**Saida esperada:** Conteudo reestruturado pronto para publicar.
**Como agir:** Substitua o conteudo original e adicione data de atualizacao. Veja [[Como IAs Buscam e Citam Conteudo]].

---

## 3. Fan-Out Query Mapping

**Prompt:**
> "Para a pergunta '[pergunta complexa do usuario]', simule o processo de fan-out: quais sub-perguntas voce faria internamente para construir uma resposta completa? Liste cada sub-pergunta e, para cada uma, indique: (1) o tipo de fonte que voce buscaria, (2) o formato de conteudo ideal para responde-la, (3) se meu site [url] responderia essa sub-pergunta hoje."

**Quando usar:** Para entender COMO as IAs decompoe perguntas e garantir que seu conteudo cobre cada angulo.
**Saida esperada:** Mapa de 8-12 sub-queries com gaps identificados.
**Como agir:** Crie conteudo para cada sub-query nao coberta. Veja [[Sub-Query Optimization]] para a teoria completa.

---

## 4. Schema para Citacao em IA

**Prompt:**
> "Gere FAQ schema markup (JSON-LD) para estas perguntas e respostas. As respostas devem ser formatadas como 'answer capsules' — concisas, factuais, entre 40-60 palavras cada. Perguntas: [liste 5-10 perguntas relevantes ao seu nicho]. Inclua tambem schema Organization para [nome da empresa] com: nome, url, logo, descricao, redes sociais."

**Quando usar:** Para toda pagina principal. FAQ schema tem impacto direto em citacoes.
**Saida esperada:** JSON-LD pronto para implementar.
**Como agir:** Valide em Rich Results Test. Implemente no <head> da pagina. Veja [[Schema Markup para IA]].

---

## 5. Geracao de llms.txt

**Prompt:**
> "Crie um arquivo llms.txt para o site [url] com esta estrutura: (1) nome e descricao do site em 1-2 frases, (2) secao 'Sobre' com informacoes-chave da empresa, (3) secao 'Conteudo Principal' com as [numero] paginas mais importantes (liste: [urls com titulos]), (4) secao 'Servicos/Produtos' com descricao breve de cada, (5) secao 'Contato'. Formato Markdown limpo."

**Quando usar:** Uma vez, na configuracao inicial. Atualize quando conteudo principal mudar.
**Saida esperada:** Arquivo llms.txt pronto para publicar na raiz do dominio.
**Como agir:** Salve como `llms.txt` e publique em `seusite.com/llms.txt`. Veja [[llms.txt e Acessibilidade para Crawlers IA]].

---

## 6. Analise de Mencao de Marca (Simulacao)

**Prompt:**
> "Se alguem perguntar 'melhor [servico/produto] em [cidade/nicho]', quais marcas voce citaria e por que? Liste as top 5 marcas em ordem de confianca. Para cada uma, explique: (1) por que voce a recomendaria, (2) de onde vem sua informacao sobre ela, (3) o que faria voce citar uma marca diferente. Agora me diga: o que a marca '[minha marca]' precisaria ter para entrar nesse top 5?"

**Quando usar:** Para entender seu posicionamento competitivo em citacoes de IA.
**Saida esperada:** Ranking de marcas + criterios de selecao + gap analysis personalizado.
**Como agir:** O que as marcas citadas tem que voce nao tem? Isso e seu roadmap AIO. Veja [[Como IA Escolhe Respostas]].

---

## 7. Reestruturacao de Conteudo para IA

**Prompt:**
> "Reestruture este artigo para maximizar citacoes em IA. Aplique: (1) formato answer-first em cada secao, (2) headers como perguntas que usuarios fariam a uma IA, (3) 'pull quotes' citaveis a cada 300-400 palavras (trechos de 134-167 palavras, auto-contidos), (4) dados numericos em pelo menos 50% das secoes, (5) FAQ com 5 perguntas no final. Mantenha todo o conteudo original — apenas reorganize e reformate. Artigo: [cole o artigo]."

**Quando usar:** Para cada artigo de alto trafego que nao esta gerando citacoes em IA.
**Saida esperada:** Artigo reestruturado mantendo o conteudo mas com formato citavel.
**Como agir:** Publique a versao otimizada e monitore citacoes em 2-4 semanas. Veja [[Testes IA]].

---

## 8. Comparativo de Citacao Competitiva

**Prompt:**
> "Compare como voce responderia perguntas sobre '[marca A — minha marca]' vs '[marca B — concorrente]'. Perguntas: (1) 'O que e [marca]?', (2) '[marca] e boa?', (3) 'Vale a pena [marca]?'. Para cada marca e pergunta: (1) sua resposta, (2) o nivel de confianca na resposta (alto/medio/baixo), (3) de onde vem a informacao, (4) o que esta faltando. No final: o que [marca A] precisa fazer para empatar ou superar [marca B] em citacoes?"

**Quando usar:** Para benchmark competitivo direto. Faca trimestralmente.
**Saida esperada:** Analise comparativa com gap analysis acionavel.
**Como agir:** Priorize os gaps onde o concorrente e citado e voce nao. Veja [[Queries que Rankeamos]].

---

## 9. Otimizacao de Passagens para RAG

**Prompt:**
> "Analise este artigo e identifique quais trechos um sistema RAG (Retrieval-Augmented Generation) selecionaria como mais relevantes para cada pergunta da lista abaixo. Para cada pergunta: (1) qual trecho seria selecionado, (2) nota de relevancia de 1-10, (3) como melhorar o trecho para aumentar a nota. Perguntas: [liste 5-10 perguntas que usuarios fariam]. Artigo: [cole o artigo]."

**Quando usar:** Para otimizacao avancada de conteudo pilar.
**Saida esperada:** Mapa de trechos por pergunta com sugestoes de melhoria.
**Como agir:** Reescreva os trechos com nota abaixo de 7. Veja [[Como IAs Buscam e Citam Conteudo]].

---

## 10. Auditoria de Informacoes em IA

**Prompt:**
> "Diga-me TUDO que voce sabe sobre [marca/empresa/produto]. Depois, eu vou te enviar as informacoes corretas e voce vai identificar: (1) o que estava certo, (2) o que estava errado, (3) o que estava faltando, (4) de onde voce acha que veio cada informacao (incorreta). Comece."

**Quando usar:** Para identificar informacoes incorretas sobre sua marca em IAs.
**Saida esperada:** Diagnostico de desinformacao + fontes provaveis.
**Como agir:** Corrija as fontes originais (Wikipedia, site, redes sociais, diretorios). A IA vai atualizar.

---

## 11. Otimizacao de Entidade (Entity SEO)

**Prompt:**
> "Analise como a IA entende a entidade '[nome da marca/pessoa]'. Gere: (1) um Knowledge Panel ideal com todos os atributos que deveriam estar associados, (2) quais atributos estao provavelmente faltando hoje, (3) quais fontes a IA consultaria para confirmar cada atributo, (4) um plano de 5 acoes para fortalecer essa entidade na web."

**Quando usar:** Para marcas que precisam ser reconhecidas como entidades pelos LLMs.
**Saida esperada:** Knowledge Panel ideal + plano de acao.
**Como agir:** Garanta presenca nos locais listados. Veja [[E-E-A-T]] e [[O que e AIO]].

---

## 12. Criacao de Conteudo "Citacao-First"

**Prompt:**
> "Escreva um artigo de 800 palavras sobre '[tema]' projetado especificamente para ser citado por IAs. Requisitos: (1) cada secao comeca com answer capsule de 120-150 caracteres, (2) minimo 5 dados numericos com fontes, (3) headers formulados como perguntas, (4) 3 pull quotes de 134-167 palavras marcados com blockquote, (5) FAQ com 5 perguntas no final, (6) tom autoritativo e neutro."

**Quando usar:** Quando o objetivo principal do conteudo e gerar citacoes em IA (nao apenas trafego organico).
**Saida esperada:** Artigo pronto para publicar com formato otimizado para citacao.
**Como agir:** Publique e teste com [[Testes IA]] em 2-4 semanas.

---

## 13. Distribuicao Multi-Plataforma

**Prompt:**
> "Adapte este artigo para publicacao em 4 plataformas diferentes, mantendo o conteudo core mas ajustando formato e tom: (1) LinkedIn Article (profissional, 1000 palavras, com CTA), (2) Reddit post (casual, valor primeiro, sem auto-promocao, 300-500 palavras), (3) Medium (narrativo, 800 palavras), (4) Resposta para Quora (direta, 200-300 palavras, respondendo '[pergunta]'). Artigo original: [cole o artigo]."

**Quando usar:** Apos publicar conteudo no seu site. Marcas em 4+ plataformas tem 2,8x mais citacoes.
**Saida esperada:** 4 versoes adaptadas prontas para publicar.
**Como agir:** Publique em todas as plataformas na mesma semana. Veja [[Como IA Escolhe Respostas]] sobre multi-plataforma.

---

## 14. Review e Melhoria de Paginas de Autor

**Prompt:**
> "Crie uma pagina de autor otimizada para E-E-A-T e citacoes em IA para: Nome: [nome], Cargo: [cargo], Empresa: [empresa], Expertise: [areas de expertise], Credenciais: [formacao, certificacoes, anos de experiencia]. Inclua: bio em primeira e terceira pessoa, schema Person markup (JSON-LD), links para perfis profissionais, lista de publicacoes/contribuicoes."

**Quando usar:** Para cada autor que publica conteudo no site. Veja [[E-E-A-T]].
**Saida esperada:** Pagina de autor completa + schema Person.
**Como agir:** Publique como `/sobre/[nome]` e linke de cada artigo do autor.

---

## 15. Plano AIO Mensal

**Prompt:**
> "Crie um plano AIO mensal para o site [url] no nicho [nicho]. Inclua: (1) Semana 1: 5 paginas para otimizar com formato answer-first, (2) Semana 2: 3 novos conteudos para criar (1 listicle, 1 comparativo, 1 how-to), (3) Semana 3: distribuicao em 3 plataformas externas, (4) Semana 4: testes e medicao. Para cada acao, indique: entregavel, tempo estimado, metrica de sucesso."

**Quando usar:** No primeiro dia util de cada mes para planejar as acoes AIO.
**Saida esperada:** Calendario mensal com entregas especificas.
**Como agir:** Execute semana a semana e documente resultados em [[Dashboard de Resultados]].

---

## Workflow de Otimizacao AIO (Ordem Recomendada)

Para um site que nunca foi otimizado para AIO:

```
Mes 1 — Diagnostico e Base:
  1. Brand Check (#1) → em 3 IAs
  2. Informacoes (#10) → corrigir dados incorretos
  3. llms.txt (#5) → publicar
  4. Schema (#4) → Organization + FAQ

Mes 2 — Conteudo:
  5. Answer-First (#2) → top 10 paginas
  6. Pull Quotes (#7) → mesmas 10 paginas
  7. Fan-Out (#3) → mapear queries do nicho
  8. Citacao-First (#12) → 3-5 artigos novos

Mes 3 — Escala e Distribuicao:
  9. Multi-Plataforma (#13) → melhores artigos
  10. Competitivo (#8) → benchmark
  11. Plano Mensal (#15) → processo continuo
```

Veja [[Playbook - Aparecer na IA em 30 Dias]] para a versao detalhada deste processo.

---

## Notas Relacionadas

- [[Geracao de Conteudo]] — Prompts para criacao de conteudo
- [[Analise SEO]] — Prompts para auditoria SEO
- [[Testes IA]] — Prompts para testar visibilidade em IA
- [[Framework AIO Completo]] — Framework que estes prompts implementam
- [[Como IA Escolhe Respostas]] — Entenda o processo decisorio da IA
- [[Como IAs Buscam e Citam Conteudo]] — Mecanismo tecnico de citacao
- [[Sub-Query Optimization]] — Otimizacao para fan-out queries
- [[Schema Markup para IA]] — Dados estruturados para IA
- [[llms.txt e Acessibilidade para Crawlers IA]] — Configuracao de acesso
- [[Otimizacao para ChatGPT e Perplexity]] — Estrategias por plataforma
