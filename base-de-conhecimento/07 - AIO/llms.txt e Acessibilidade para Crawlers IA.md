---
tipo: guia
area: AIO
nivel: intermediario
tags:
  - llms-txt
  - robots-txt
  - crawlers-ia
  - acessibilidade
  - gptbot
  - claudebot
atualizado: 2026-04-22
---

# llms.txt e Acessibilidade para Crawlers IA

## O que e llms.txt

**llms.txt** e um arquivo em formato Markdown hospedado no diretorio raiz de um site (ex: `exemplo.com/llms.txt`) que fornece um mapa conciso e legivel por IA dos recursos mais importantes do site. Foi proposto por **Jeremy Howard** em setembro de 2024.

O objetivo e compilar toda a informacao que voce deseja que LLMs descubram em um **unico arquivo acessivel**. Diferente de outros padroes:

| Arquivo | Funcao |
|---|---|
| **robots.txt** | Concede ou nega acesso a crawlers |
| **sitemap.xml** | Lista URLs para crawlers tradicionais |
| **schema.org** | Dados estruturados dentro de cada pagina |
| **llms.txt** | Recomenda prioridade de conteudo para LLMs, como indice geral do site |

O llms.txt **nao concede nem nega acesso** — ele **recomenda prioridade**. E escrito para maquinas que leem prosa, nao para crawlers que seguem links.

## Como Criar um llms.txt

### Estrutura do Arquivo

O llms.txt segue um formato Markdown especifico:

```markdown
# Nome da Empresa

> Descricao breve da empresa ou site. Uma ou duas frases
> explicando o que voce faz e por que importa.

## Documentacao Principal

- [Guia de Inicio Rapido](https://exemplo.com/docs/inicio-rapido.md):
  Como comecar a usar nosso produto em 5 minutos.
- [Manual do Usuario](https://exemplo.com/docs/manual.md):
  Guia completo de todas as funcionalidades.
- [API Reference](https://exemplo.com/docs/api.md):
  Documentacao tecnica da API.

## Blog e Conteudo

- [Melhores Praticas de SEO](https://exemplo.com/blog/seo.md):
  Guia atualizado sobre otimizacao para buscadores.
- [Estudos de Caso](https://exemplo.com/blog/cases.md):
  Resultados alcancados por nossos clientes.

## Sobre

- [Sobre a Empresa](https://exemplo.com/sobre.md):
  Historia, missao e equipe.
- [Contato](https://exemplo.com/contato.md):
  Formas de entrar em contato.
```

### Regras de Formatacao

1. **Titulo (H1)**: Nome do site/empresa
2. **Descricao (blockquote)**: Resumo em 1-2 frases abaixo do titulo
3. **Secoes (H2)**: Categorias de conteudo
4. **Links com descricao**: `[Titulo](URL): Descricao breve`
5. **Formato**: Markdown puro (.md)
6. **Localizacao**: Raiz do dominio (`/llms.txt`)

### Boas Praticas

- Priorize paginas canonicas primeiro
- Lidere com a documentacao que voce mais deseja que seja citada
- Use descricoes claras que digam ao LLM o que cada pagina responde
- Escreva resumos curtos e objetivos
- Links devem apontar para versoes Markdown quando possivel

## Adocao e Eficacia em 2026

### Quem ja adotou
Ate abril de 2026, o formato foi adotado por empresas como **Anthropic, Stripe, Zapier, Cloudflare** e uma longa lista de empresas de ferramentas para desenvolvedores.

### Dados de eficacia
Os dados sobre eficacia do llms.txt ainda sao **mistos**:

- Apenas **5-15% dos sites** implementaram o arquivo ate 2026
- De 62.100+ visitas de bots de IA em 90 dias, apenas **84 requisicoes** visaram o /llms.txt
- **Nenhum dos principais crawlers de LLM** (GPTBot, ClaudeBot, PerplexityBot) requisita ativamente o arquivo llms.txt
- Apenas crawlers tradicionais como GoogleBot e BingBot fizeram contato com o arquivo

**Recomendacao**: Apesar da adocao limitada pelos crawlers atuais, implementar o llms.txt e um investimento de baixo esforco que pode se tornar relevante conforme o padrao amadurece. E tambem uma forma de sinalizar que seu site e "AI-friendly".

## robots.txt para Crawlers de IA

O **robots.txt** continua sendo a forma principal de controlar o acesso de crawlers de IA ao seu conteudo.

### Permitir Todos os Crawlers de IA

```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
```

### Bloquear Crawlers Especificos

```
# Bloquear treinamento da OpenAI, mas permitir busca
User-agent: GPTBot
Disallow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Bloquear treinamento da Meta
User-agent: Meta-ExternalAgent
Disallow: /
```

### Estrategia Recomendada

A abordagem mais equilibrada em 2026:

1. **Permita crawlers de busca em tempo real**: OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot — esses geram citacoes e trafego
2. **Avalie crawlers de treinamento**: GPTBot, ClaudeBot, Google-Extended — decidir se deseja contribuir para dados de treinamento
3. **Bloqueie se necessario**: Meta-ExternalAgent, Bytespider — se nao deseja contribuir para treinamento desses modelos

## Server-Side Rendering (SSR) e Importancia

Muitos crawlers de IA **nao executam JavaScript**. Se seu site usa um framework SPA (Single Page Application) como React, Vue ou Angular sem SSR, os crawlers podem ver uma pagina vazia.

### Solucoes:
- **Next.js / Nuxt.js**: Frameworks com SSR nativo
- **Pre-rendering**: Gere HTML estatico para paginas importantes
- **Dynamic rendering**: Sirva versao pre-renderizada para crawlers
- Teste com `curl` ou ferramentas de fetch para verificar se o conteudo e visivel sem JavaScript

## Checklist de Acessibilidade para IA

- [ ] Criar arquivo `llms.txt` na raiz do dominio
- [ ] Configurar `robots.txt` para permitir crawlers de IA desejados
- [ ] Garantir que conteudo principal e renderizado server-side (SSR)
- [ ] Implementar [[Schema Markup para IA|schema markup]] em JSON-LD
- [ ] Verificar velocidade de carregamento (crawlers tem timeouts)
- [ ] Manter `sitemap.xml` atualizado
- [ ] Testar acesso com `curl -A "GPTBot" https://seusite.com/`
- [ ] Nao bloquear Google-Extended se desejar aparecer em [[Google AI Overviews]]
- [ ] Publicar conteudo em formato HTML limpo, evitando PDFs para conteudo principal

## Links e Referencias

- [llms.txt Official Specification - llmstxt.org](https://llmstxt.org/)
- [What is llms.txt? - Bluehost Guide 2026](https://www.bluehost.com/blog/what-is-llms-txt/)
- [llms.txt Implementation Guide - Lowtouch.ai](https://www.lowtouch.ai/llms-txt-implementation-guide-ai-seo-2026/)
- [Meet llms.txt Proposed Standard - Search Engine Land](https://searchengineland.com/llms-txt-proposed-standard-453676)
- [Should Websites Implement llms.txt in 2026? - LinkBuildingHQ](https://www.linkbuildinghq.com/blog/should-websites-implement-llms-txt-in-2026/)
- [llms.txt and AI Visibility: GEO Study Results - Otterly.AI](https://otterly.ai/blog/the-llms-txt-experiment/)
- [What is llms.txt? - Semrush](https://www.semrush.com/blog/llms-txt/)
- [ClaudeBot Framework and robots.txt Strategy - ALM Corp](https://almcorp.com/blog/anthropic-claude-bots-robots-txt-strategy/)
