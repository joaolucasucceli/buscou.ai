---
tipo: produto
area: UX
tags: [produto, onboarding, wizard, automatico, ux]
atualizado: 2026-04-23
---

# Onboarding Automatico — Wizard de 11 Etapas

> O objetivo do onboarding NAO e coletar dados. E transformar o negocio do cliente em uma **ficha operacional** que os agentes consigam usar sem ambiguidade. O output e o [[Objeto Business Context]] — o cerebro compartilhado de todos os agentes.

---

## Regras de UX (Obrigatorias)

1. **1 assunto por etapa** — nunca misturar localizacao com servicos
2. **Barra de progresso** — visivel em toda etapa, mostrando % concluido
3. **Auto-save** — salvar a cada campo preenchido (nunca perder dados)
4. **Sair e voltar** — cliente pode fechar e retomar de onde parou
5. **Maximo 5-7 campos por etapa** — nunca mostrar 30 campos de vez
6. **Exemplos sempre** — abaixo de cada campo, um exemplo real
7. **"Nao sei" / "Me ajude com IA"** — em toda pergunta aberta, IA sugere e cliente edita
8. **Microcopy humano** — em vez de "Descreva seu posicionamento", usar "Explique em uma frase por que alguem escolheria sua empresa em vez do concorrente"

---

## Barra de Progresso

```
+--------------------------------------------------------------------+
| [1] [2] [3] [4] [5] [6] [7] [8] [9] [10] [11]                    |
|  ●   ●   ●   ◐   ○   ○   ○   ○   ○   ○    ○                      |
|              ↑ Voce esta aqui                                       |
|  Etapa 4 de 11 — Oferta           Tempo estimado restante: ~8 min  |
+--------------------------------------------------------------------+
```

---

## Etapa 1 — Boas-vindas

**Nenhum formulario.** Apenas explicacao + botao.

```
+--------------------------------------------------------------------+
|                                                                      |
|   Bem-vindo ao [Nome do Sistema]!                                   |
|                                                                      |
|   Vamos configurar seu projeto em ~10 minutos.                      |
|                                                                      |
|   O que vai acontecer:                                              |
|   1. Voce nos conta sobre seu negocio                               |
|   2. O sistema gera uma estrategia personalizada                    |
|   3. Os agentes comecam a trabalhar em ate 72h                      |
|                                                                      |
|   [Comecar configuracao →]                                          |
|                                                                      |
+--------------------------------------------------------------------+
```

---

## Etapa 2 — Identidade do Negocio

**Campos**:
- Nome da empresa (obrigatorio)
- Nome fantasia
- Site (URL, se tiver)
- WhatsApp comercial (obrigatorio)
- Instagram
- Categoria principal (autocomplete: restaurante, clinica, imobiliaria, etc.)
- Subcategoria
- Descricao curta do negocio (1-2 frases)

**Logica do sistema**:
- Categoria alimenta templates de conteudo e clusters padrao
- Site habilita botao "Analisar meu site" (scraping basico para pre-preencher)
- Descricao curta vira base semantica para o [[Agente Redator]]

**UX**: Autocomplete de categoria com 50+ opcoes. Exemplo abaixo da descricao: "Imobiliaria especializada em imoveis de alto padrao na regiao de Vitoria-ES"

---

## Etapa 3 — Localizacao e Area de Atuacao

**Campos**:
- Pais (default: Brasil)
- Estado (select)
- Cidade principal (obrigatorio)
- Bairros/regioes foco (chips — selecao multipla)
- Atende presencial, online ou ambos? (radio)
- Raio de atendimento (km)
- Tem mais de uma unidade? (sim/nao → se sim, bloco repetivel)

**Logica**:
- Cidade + bairro alimentam SEO local (keywords "[servico] em [bairro]")
- Multiplas unidades = multiplos clusters/paginas por localizacao
- "Online tambem" abre estrategia nao-local complementar

**UX**: Selecao de bairros em chips. Sem mapa no MVP. Bloco repetivel se multiplas unidades.

---

## Etapa 4 — Oferta

**Campos** (lista dinamica com "Adicionar servico"):
- Para cada servico: nome, descricao, e principal? (toggle), ticket medio, prioridade (1-10)
- Servicos mais lucrativos (drag-and-drop ou ranking)
- Sazonalidade existe? (sim/nao → se sim, quais meses)
- Tipo de atendimento (radio: agendamento / orcamento / compra direta / misto)

**Logica**:
- Servico principal recebe prioridade maxima no pipeline
- Ticket medio ajuda priorizacao comercial ([[Framework de Priorizacao SEO + AIO]])
- Servicos lucrativos pesam mais na producao de conteudo

**UX**: Botao "+ Adicionar servico". Minimo 1, maximo 10. Drag-and-drop para ordenar prioridade.

---

## Etapa 5 — Cliente Ideal

**Campos** (perguntas abertas com exemplos):
- Quem e seu cliente ideal? _Ex: "Casal entre 30-45 anos buscando primeiro imovel"_
- O que ele mais procura? _Ex: "Seguranca na compra, transparencia no processo"_
- Quais problemas ele quer resolver? _Ex: "Nao sabe por onde comecar, medo de golpe"_
- Quais objecoes ele costuma ter? _Ex: "E muito caro", "Nao confio em imobiliaria"_
- Quais termos ele usa para buscar? _Ex: "comprar apartamento vitoria", "imoveis praia do canto"_

**Logica**:
- Alimenta copy, FAQs, objecoes, titulos de conteudo
- Melhora AIO porque aproxima linguagem da busca real
- [[Agente Redator]] usa isso para tom e abordagem

**UX**: Perguntas abertas com exemplos. Botao "Me ajude com IA" que gera sugestao baseada na categoria.

---

## Etapa 6 — Diferenciais e Prova

**Campos**:
- Por que escolher sua empresa? (texto livre)
- Diferenciais reais (lista: "+ Adicionar diferencial")
- Tem depoimentos de clientes? (textarea ou upload)
- Tem cases / resultados? (textarea)
- Numeros relevantes? _Ex: "500+ imoveis vendidos", "15 anos de mercado"_
- Certificacoes, premios ou tempo de mercado?

**Logica**:
- Alimenta [[E-E-A-T]] — paginas institucionais, snippets de prova
- [[Agente Redator]] enriquece conteudo com essas provas
- Depoimentos viram schema Review

**UX**: Exemplos de diferencial bom ("15 anos de experiencia com foco em alto padrao") vs generico ("qualidade e compromisso"). Upload de depoimentos opcional (texto aceito).

---

## Etapa 7 — Concorrencia

**Campos**:
- 3 concorrentes diretos (URL ou nome — aceitar ambos)
- Quem aparece mais no Google hoje? (nome ou "nao sei")
- Quem voce admira no mercado? (referencia positiva)
- Quem voce NAO quer parecer? (anti-referencia)

**Logica**:
- Alimenta pesquisa SERP do [[Agente Pesquisador]]
- Benchmark de linguagem, paginas e autoridade
- Anti-referencia ajuda tom de voz

**UX**: Aceitar URL ou nome. "Nao sei" nao trava onboarding. Minimo 1 concorrente.

---

## Etapa 8 — Objetivos

**Campos**:
- Objetivo principal (radio — UMA escolha):
  - Mais visitas no site
  - Mais leads / contatos
  - Mais mensagens no WhatsApp
  - Mais autoridade local
  - Mais presenca em IA (ChatGPT, Perplexity)
- Em quanto tempo quer perceber resultado? (radio: 30/60/90/180 dias)
- Qual servico quer empurrar primeiro? (select dos servicos cadastrados)

**Logica**:
- Define foco do [[Dashboard do Cliente]] (qual metrica vem primeiro)
- Define prioridade do pipeline
- Servico prioridade = primeiro cluster a produzir

**UX**: UMA meta principal so. Nao deixar selecionar 5 — forca foco.

---

## Etapa 9 — Marca e Comunicacao

**Campos**:
- Tom de voz (radio: formal / casual / tecnico / amigavel / neutro)
- Palavras que a marca usa (tags: "+ Adicionar")
- Palavras que a marca evita (tags: "+ Adicionar")
- Cores da marca (color picker — opcional)
- Logo (upload — opcional)
- Manual de identidade (upload — opcional)

**Logica**:
- Alimenta output de texto do [[Agente Redator]]
- Se nao preencher, usa default neutro

**UX**: Etapa marcada como "opcional" na barra de progresso. Se pular, segue com default.

---

## Etapa 10 — Integracoes

**Campos** (cada com "Conectar agora" ou "Fazer depois"):
- Google Analytics (OAuth)
- Google Search Console (OAuth)
- Google Tag Manager
- Google Business Profile
- Stripe (para billing)
- Google Calendar (para agendamentos)
- WhatsApp Business

**Logica**:
- Cada integracao ativa modulos especificos no sistema
- NAO bloquear onboarding se nao integrar tudo
- GSC e a mais importante (habilita dados reais)

**UX**: Botao "Conectar" abre popup OAuth. Status: conectado/pendente. Pode fazer depois via Settings.

---

## Etapa 11 — Revisao Final

**Tela-resumo** com todos os dados preenchidos:

```
+--------------------------------------------------------------------+
| REVISAO DA CONFIGURACAO                                             |
|                                                                      |
| Negocio: Imobiliaria Praia do Canto                                 |
| Cidade: Vitoria - ES | Bairros: Praia do Canto, Jardim da Penha    |
| Servico principal: Venda de imoveis | Ticket: R$2.500              |
| Objetivo: Mais leads no WhatsApp                                    |
| Tom: Profissional e acessivel                                       |
| Integracoes: GSC ✓ | GA ✓ | GBP ✓ | WhatsApp ✓                    |
|                                                                      |
| [Editar]                     [Concluir configuracao →]              |
+--------------------------------------------------------------------+
```

**Ao concluir**:
1. Sistema gera [[Objeto Business Context]] (versao 1)
2. [[Agente Estrategista]] roda: analisa nicho, gera clusters, define keywords
3. Projeto criado no banco ([[Entidades e Schema - Fase 1 (Onboarding)]])
4. Dashboard ativado para o cliente
5. Pipeline inicia — primeiro conteudo em 48-72h

---

## Output Automatico do Onboarding (CRITICO)

Este e o primeiro "WOW moment" do cliente. Em **< 60 segundos** apos clicar "Concluir", o sistema DEVE gerar:

### 1. Business Context (versao 1)
- JSON consolidado a partir das respostas
- Armazenado em `contextos_negocio` — ver [[Objeto Business Context]]

### 2. Plano Estrategico Inicial
- **Top 20 keywords** rankeadas por [[Framework de Priorizacao SEO + AIO|score de priorizacao]]
- **3-5 clusters iniciais** baseados no servico principal + localidade
- **Paginas locais sugeridas**: "[servico] em [bairro]" para cada bairro foco
- **Calendario editorial**: proximos 30 dias com datas de publicacao

### 3. Primeiros 3 Conteudos (draft)
- [[Agente Pesquisador]] gera briefings das 3 keywords de maior score
- [[Agente Redator]] gera rascunhos (status: 'escrevendo')
- Cliente ve no dashboard: "3 conteudos em producao" imediatamente

### 4. Estrutura do Projeto
- Projeto criado na tabela `projetos`
- Keywords inseridas na tabela `palavras_chave`
- Dashboard ativado com Health Score inicial

**Tempo maximo**: 60 segundos para gerar tudo (Business Context + keywords sao instantaneos; drafts de conteudo rodam em background e aparecem em 5-10 min)

**O que o cliente ve**: Dashboard com plano gerado + 3 conteudos "em producao" + calendario dos proximos 30 dias. Isso transforma onboarding de formulario em EXPERIENCIA.

### Qualidade Minima de Conteudo

Todo conteudo gerado pelo sistema DEVE:

- [ ] Responder a pergunta nos primeiros 3 paragrafos (answer-first)
- [ ] Conter FAQ estruturado (minimo 5 perguntas)
- [ ] Conter mencao local (cidade + bairro quando aplicavel)
- [ ] Incluir CTA para WhatsApp do cliente
- [ ] Incluir diferenciais do cliente (do business_context)
- [ ] Ter pontuacao SEO >= 70 (avaliado pelo [[Agente Revisor]])
- [ ] Ter pontuacao AIO >= 60
- [ ] Ter >= 1.500 palavras

Se nao atingir: [[Agente Revisor]] rejeita e [[Agente Redator]] reescreve (max 2 tentativas, depois escala para humano).

---

## Saida do Onboarding — 4 Blocos

O onboarding consolida tudo em 4 perfis que formam o [[Objeto Business Context]]:

| Bloco | Contem | Usado por |
|---|---|---|
| **Perfil do Negocio** | Identidade, localizacao, servicos, diferenciais | Todos os agentes |
| **Perfil Semantico** | Termos, linguagem, objecoes, FAQs, entidades | [[Agente Redator]], [[Agente Pesquisador]] |
| **Perfil Estrategico** | Servico prioritario, cidades foco, objetivo, concorrentes, clusters | [[Agente Estrategista]] |
| **Perfil Operacional** | Integracoes, status, canais, limites do plano | [[Orquestrador]], [[Agente Publicador]] |

---

## Metricas de Onboarding

| Metrica | Meta | Como medir |
|---|---|---|
| Taxa de conclusao | > 85% | sessoes completas / sessoes iniciadas |
| Tempo medio | < 15 min | tempo da etapa 1 ate etapa 11 |
| Abandono por etapa | Identificar | qual etapa perde mais usuarios |
| Time to first content | < 72h | concluiu onboarding → primeiro conteudo publicado |

**Email drip se abandonar**:
- 24h: "Faltam X etapas para ativar seu projeto"
- 48h: "Sua estrategia esta quase pronta"
- 7d: "Voce sabia que [concorrente] ja esta aparecendo em IA?"
- 14d: Oferta especial / desconto
- 30d: Ultimo contato antes de expirar

---

## Notas Relacionadas

- [[Objeto Business Context]] — O cerebro gerado pelo onboarding
- [[Inputs dos Agentes]] — Como cada agente usa os dados
- [[Dashboard do Cliente]] — O que o cliente ve apos concluir
- [[Time to Value]] — Marcos de valor pos-onboarding
- [[Jornada do Cliente]] — Onboarding e o touchpoint 10
- [[Template de Artigo]] — Estrutura padrao do conteudo gerado
