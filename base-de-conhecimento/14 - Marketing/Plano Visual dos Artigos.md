---
tipo: marketing
area: Ambos
tags: [marketing, visual, artigos, imagem, planejamento, conteudo]
atualizado: 2026-04-23
---

# Plano Visual dos Artigos — Estrategia de Imagem por Tipo de Conteudo

## Visao Geral

Cada artigo gerado pelo sistema NAO tem imagens soltas. Tem blocos visuais planejados. O [[Agente Visual]] cria um plano visual especifico baseado no tipo de conteudo, categoria do negocio, e estrutura do artigo.

## Tipos de Bloco Visual

| Bloco | Descricao | Quando Usar | Obrigatorio |
|---|---|---|---|
| Imagem capa (hero) | Representa o tema principal | SEMPRE | Sim (V1) |
| Imagem explicativa | Ilustra conceito complexo | Secoes didaticas | Sim se >2000 palavras |
| Imagem comparacao | Mostra diferencas lado a lado | "X vs Y", criterios | Nao |
| Diagrama/fluxo | Processo visual | "Como fazer", pipeline | Nao |
| Imagem local | Contexto geografico | SEO local | Nao |
| Bloco mockup/interface | Preview de ferramenta/sistema | Tutoriais, reviews | Nao |
| Mapa/localizacao | Contexto espacial | Servicos locais | Nao |

## Plano Visual por Tipo de Conteudo

### 1. Artigo "Melhor X em {{Cidade}}" (query de recomendacao)

| Bloco | Tipo | Posicao | Objetivo |
|---|---|---|---|
| 1 | capa | hero | Representar o tema/servico na cidade |
| 2 | comparacao | meio_artigo | Mostrar criterios de avaliacao |
| 3 | local | antes_faq | Contexto geografico (opcional V1) |

### 2. Artigo "Vale a Pena X" (query de avaliacao)

| Bloco | Tipo | Posicao | Objetivo |
|---|---|---|---|
| 1 | capa | hero | Representar o dilema/decisao |
| 2 | explicativa | meio_artigo | Ilustrar pros vs contras |

### 3. Artigo "Como Fazer X" (query tutorial)

| Bloco | Tipo | Posicao | Objetivo |
|---|---|---|---|
| 1 | capa | hero | Representar o processo |
| 2 | diagrama | apos_intro | Fluxo visual do processo |
| 3 | explicativa | meio_artigo | Detalhe de etapa complexa |

### 4. Artigo "X vs Y" (query comparativa)

| Bloco | Tipo | Posicao | Objetivo |
|---|---|---|---|
| 1 | capa | hero | Representar as duas opcoes |
| 2 | comparacao | meio_artigo | Side-by-side visual |

### 5. Pagina de servico local

| Bloco | Tipo | Posicao | Objetivo |
|---|---|---|---|
| 1 | capa | hero | Servico no contexto da cidade |
| 2 | local | apos_intro | Referencia visual da regiao |
| 3 | cta | final | Confianca + acao |

## Plano Visual por Nicho (Exemplos)

### Imobiliarias

- **Capa**: cena editorial de imoveis/escritorio profissional
- **Explicativa**: criterios de escolha (diagrama)
- **Local**: referencia visual da cidade/bairro

### Clinicas Medicas

- **Capa**: ambiente clinico moderno e acolhedor
- **Explicativa**: processo de tratamento (fluxo)
- **CTA**: interacao medico-paciente

### Restaurantes

- **Capa**: ambiente do restaurante ou prato
- **Explicativa**: cardapio/especialidade visual
- **Local**: fachada ou area do restaurante

### Escritorios de Advocacia

- **Capa**: ambiente juridico profissional
- **Explicativa**: processo juridico (timeline)
- **CTA**: consulta profissional

## Template do Plano Visual (JSON)

```json
{
  "plano_visual": [
    {
      "tipo": "capa",
      "objetivo": "representar o tema principal do artigo",
      "posicao": "hero",
      "prompt": "cena editorial moderna relacionada a {{SERVICO}} em {{CIDADE}}, interface clean, contexto profissional, sem texto na imagem",
      "alt_text": "Ilustracao representando {{TOPICO}} em {{CIDADE}}",
      "nome_arquivo": "{{keyword-slug}}.webp",
      "legenda": "{{frase descritiva curta que reforce o tema}}"
    },
    {
      "tipo": "explicativa",
      "objetivo": "explicar {{CONCEITO}} visualmente",
      "posicao": "meio_artigo",
      "prompt": "diagrama visual simples mostrando {{CONCEITO}}, estilo minimalista, sem texto, fundo limpo",
      "alt_text": "Diagrama mostrando {{CONCEITO}} de forma visual",
      "nome_arquivo": "{{conceito-slug}}-{{cidade-slug}}.webp",
      "legenda": null
    }
  ]
}
```

## Exemplo Real Completo

**Artigo**: "Melhor imobiliaria em Vitoria ES: como escolher com seguranca"
**Keyword**: melhor imobiliaria vitoria es
**Categoria**: imobiliaria
**Cidade**: Vitoria, ES

### Imagem 1 — Capa

- **Tipo**: capa
- **Posicao**: hero
- **Prompt**: "cena editorial moderna de um escritorio imobiliario sofisticado, com interface clean, profissional, iluminacao suave, sem texto na imagem, wide horizontal composition"
- **Filename**: `melhor-imobiliaria-em-vitoria-es.webp`
- **Alt**: "Ilustracao representando criterios para escolher uma imobiliaria em Vitoria ES"
- **Legenda**: "Escolher a imobiliaria certa depende de reputacao, atendimento e conhecimento local"

### Imagem 2 — Comparacao

- **Tipo**: comparacao
- **Posicao**: meio_artigo (apos H2 "Principais fatores para avaliar")
- **Prompt**: "diagrama visual comparando criterios de escolha de uma imobiliaria, layout dividido, estilo clean e organizado, sem texto embutido"
- **Filename**: `comparativo-criterios-imobiliaria-vitoria-es.webp`
- **Alt**: "Comparativo visual entre criterios de avaliacao de imobiliarias em Vitoria ES"
- **Legenda**: null (imagem auto-explicativa)

## Regras do Plano Visual

1. **Todo artigo TEM plano visual** — mesmo que so com 1 imagem de capa
2. **Plano e gerado ANTES da imagem** — planejamento vem primeiro, geracao depois
3. **Plano e salvo no conteudo** — campo `plano_visual_json` no registro do conteudo
4. **Consistencia de estilo** — todas as imagens de um artigo devem ter estilo visual coerente
5. **Keyword no filename e alt** — SEMPRE que natural
6. **Nenhuma imagem sem objetivo** — se nao tem funcao clara, nao gera
7. **V1 = 1-2 imagens** — nao exagerar, qualidade > quantidade

## Pipeline Visual Completo

```
Estrategista define tipo de conteudo
    → Redator cria estrutura do artigo
        → Sistema identifica blocos que pedem apoio visual
            → Agente Visual gera plano
                → Agente Visual gera prompts
                    → Servico de imagem gera assets
                        → Sistema otimiza: nome, alt, legenda, tamanho, compressao
                            → Publicador insere no artigo
                                → Pagina publicada com metadados corretos
```

## V1 vs V2+ Evolucao

| Aspecto | V1 | V2+ |
|---|---|---|
| Imagens por artigo | 1 capa + 1 opcional | 3-5 planejadas |
| Template por nicho | Generico | Especifico por categoria |
| Personalizacao marca | Nao | Cores e estilo do cliente |
| Tipos de bloco | capa + explicativa | + comparacao, diagrama, cta, galeria |
| Geracao em lote | Nao | Sim (batch de artigos) |
| A/B testing visual | Nao | Sim (qual imagem converte mais) |

## Notas Relacionadas

- [[Agente Visual]]
- [[Regras de Imagem SEO + AIO]]
- [[Template de Artigo]]
- [[Tipos de Conteudo]]
- [[Midia e Assets]]
- [[Agente Redator]]
- [[Agente Publicador]]
