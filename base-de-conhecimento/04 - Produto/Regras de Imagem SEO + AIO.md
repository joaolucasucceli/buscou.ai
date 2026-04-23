---
tipo: produto
area: Ambos
tags: [produto, imagem, seo, aio, otimizacao, visual, alt-text, webp, core-web-vitals]
atualizado: 2026-04-23
---

# Regras de Imagem SEO + AIO — Otimizacao Visual para Buscadores e IA

## Por que Imagens Importam

Imagens nao sao decoracao. Elas cumprem tres funcoes estrategicas distintas no contexto de conteudo otimizado:

### 1. SEO Tradicional

- **Relevancia semantica**: imagens com alt text descritivo e filename com keyword reforçam o tema da pagina para o Google
- **Google Images**: fonte de trafego organico adicional — imagens bem otimizadas aparecem na busca de imagens e geram cliques
- **Tempo de permanencia**: paginas com imagens relevantes mantem o usuario por mais tempo, sinal positivo de engajamento
- **UX e escaneabilidade**: imagens quebram blocos de texto, facilitam leitura e melhoram a experiencia do usuario
- **Acessibilidade**: alt text adequado torna o conteudo acessivel para leitores de tela (requisito de [[E-E-A-T]])
- **Core Web Vitals**: imagens otimizadas (tamanho, formato, lazy loading) impactam diretamente LCP e CLS

### 2. AIO / Visibilidade em IA

- **Paginas mais completas**: conteudo com estrutura visual (imagens explicativas, diagramas, comparativos) e mais completo e util como fonte de resposta para IAs
- **Mais escaneavel**: IA analisa a estrutura da pagina — imagens com alt text descritivo ajudam a IA a entender o contexto semantico do conteudo
- **Melhor ativo de resposta**: paginas que combinam texto + visual sao fontes mais fortes para citacao em ChatGPT, Perplexity e AI Overviews
- **Nota importante**: IA nao "ranqueia imagem" da mesma forma que o Google Images, mas paginas com estrutura visual boa sao percebidas como mais completas e autoritativas

### 3. Conversao

- **Autoridade percebida**: conteudo com imagens profissionais transmite mais credibilidade e competencia
- **Clareza**: imagens explicativas e comparativos visuais facilitam a decisao do leitor
- **Retencao**: paginas visualmente atrativas reduzem bounce rate e aumentam scroll depth
- **CTA indireto**: imagens contextuais no final do artigo (ambiente profissional, interacao positiva) reforçam a conversao sem ser agressivo

---

## Regras Obrigatorias

Checklist que todo conteudo publicado deve seguir. O [[Agente Visual]] aplica automaticamente, o [[Agente Revisor]] valida.

### 1. Nome do Arquivo (Filename)

| Regra | Detalhe |
|---|---|
| **NUNCA** | `image1.png`, `IMG_20260423.jpg`, `foto.png`, `screenshot.png` |
| **SEMPRE** | `{keyword-principal}-{contexto}.webp` |
| Formato | Slug kebab-case, sem acentos, sem espacos, sem caracteres especiais |
| Extensao | `.webp` (preferencialmente) |

**Exemplos**:
- `melhor-imobiliaria-em-vitoria-es.webp`
- `crm-para-clinicas-comparativo.webp`
- `como-escolher-contador-online-fluxo.webp`
- `software-gestao-financeira-tabela-precos.webp`

**Por que importa**: o Google usa o filename como sinal semantico. Um arquivo chamado `melhor-imobiliaria-vitoria-es.webp` tem mais relevancia do que `image1.webp` para a busca "melhor imobiliaria em vitoria es".

### 2. Alt Text

O alt text e o atributo mais importante da imagem para SEO e acessibilidade.

| Regra | Detalhe |
|---|---|
| **DEVE** | Descrever o que a imagem MOSTRA de forma util e contextual |
| **DEVE** | Incluir keyword quando natural (sem forcar) |
| **Max** | 125 caracteres |
| **NUNCA** | Comecar com "imagem de" ou "foto de" |
| **NUNCA** | Deixar vazio ou usar texto generico |

**Exemplos comparativos**:

| Ruim | Bom |
|---|---|
| "imagem do artigo" | "Comparativo entre criterios para escolher imobiliaria em Vitoria ES" |
| "foto" | "Escritorio de contabilidade moderna com atendimento digital" |
| "image" | "Dashboard do CRM mostrando pipeline de vendas para clinicas" |
| "melhor imobiliaria melhor imobiliaria vitoria" | "Fachada da imobiliaria XYZ no centro de Vitoria ES" |

**Template de alt text por tipo**:
- **Capa**: `{descricao da cena} + {contexto do artigo}`
- **Explicativa**: `{o que o diagrama/imagem explica} + {keyword quando natural}`
- **Comparacao**: `Comparativo entre {opcao A} e {opcao B} + {criterio principal}`
- **Local**: `{elemento visual} em {cidade/bairro}`
- **CTA**: `{cena profissional} relacionada a {servico}`

### 3. Legenda (Caption)

Nem toda imagem precisa de legenda, mas quando aplicavel ela reforça o contexto semantico.

| Quando Usar | Quando Nao Usar |
|---|---|
| Imagens de comparacao | Imagem de capa simples |
| Diagramas e fluxos | Imagens decorativas |
| Dados e estatisticas | Imagens auto-explicativas |
| Imagens que precisam de contexto extra | |

**Exemplo**:
- "Escolher a imobiliaria certa depende de reputacao, atendimento e conhecimento local"
- "Fluxo completo do processo de contratacao de um contador online"
- "Comparativo de precos entre os 5 principais CRMs para clinicas em 2026"

**Regra**: legenda nao deve repetir o alt text. Deve complementar com contexto ou insight.

### 4. Formato

| Formato | Quando Usar | Quando NAO Usar |
|---|---|---|
| **WebP** (preferido) | Fotos, ilustracoes, imagens geradas | — |
| **AVIF** | Se stack suporta e compressao extra e necessaria | Compatibilidade limitada em browsers antigos |
| **SVG** | Diagramas vetoriais, icones, logos | Fotos, imagens complexas |
| **JPEG** | Fallback se WebP nao for viavel | Imagens com transparencia |
| **PNG** | Screenshots, imagens com texto legivel | Fotos (arquivo muito pesado) |
| **NUNCA** | BMP, TIFF, GIF (exceto animacoes curtas) | — |

**Por que WebP**: compressao 25-35% melhor que JPEG com qualidade visual equivalente. Suporte universal em browsers modernos (Chrome, Firefox, Safari, Edge). Melhor para [[SEO Tecnico|Core Web Vitals]].

### 5. Tamanho e Compressao

| Regra | Valor |
|---|---|
| Tamanho maximo (desktop) | 200KB |
| Tamanho maximo (mobile) | 100KB |
| Tamanho maximo (thumbnail) | 30KB |
| Qualidade WebP | 80-85% |
| Lazy loading | `loading="lazy"` em TODAS as imagens (exceto capa/hero) |
| Dimensoes no HTML | `width` e `height` OBRIGATORIOS (evitar CLS) |

**Tamanhos responsivos a gerar**:

| Versao | Largura | Uso |
|---|---|---|
| Desktop | 1200px | Imagem principal no blog |
| Mobile | 600px | Dispositivos moveis |
| Thumbnail | 300px | Listagens, cards, related posts |

**Implementacao com `srcset`**:
```html
<img 
  src="melhor-imobiliaria-vitoria-es-1200.webp"
  srcset="
    melhor-imobiliaria-vitoria-es-300.webp 300w,
    melhor-imobiliaria-vitoria-es-600.webp 600w,
    melhor-imobiliaria-vitoria-es-1200.webp 1200w
  "
  sizes="(max-width: 600px) 600px, 1200px"
  alt="Escritorio de imobiliaria moderna em Vitoria ES"
  width="1200"
  height="675"
  loading="lazy"
/>
```

**Nota sobre imagem de capa (hero)**: a imagem de capa nao deve ter `loading="lazy"` pois esta acima do fold e impacta LCP. Usar `loading="eager"` ou omitir o atributo. Considerar `fetchpriority="high"` para priorizar carregamento.

### 6. Contexto na Pagina (Posicionamento)

| Tipo de Imagem | Posicao Correta | Posicao Errada |
|---|---|---|
| Imagem de capa | Acima do primeiro H2 (hero) | No meio do artigo |
| Imagem explicativa | Logo apos o H2 que ela ilustra | Longe da secao relacionada |
| Imagem de comparacao | Dentro do bloco de comparacao | Em secao sem relacao |
| Diagrama de processo | Apos explicacao textual do processo | Antes do contexto |
| Imagem local | Na secao que menciona a localidade | Genericamente no artigo |
| CTA visual | Proximo ao call-to-action final | No inicio do artigo |

**Regras de posicionamento**:
- Imagem **DEVE** estar perto do bloco de texto que ela explica ou complementa
- Nao colocar imagem decorativa entre secoes sem relacao logica
- Nao agrupar todas as imagens em um unico lugar (distribuir ao longo do artigo)
- Respeitar fluxo de leitura: texto → imagem → texto (nao imagem → imagem → imagem)

---

## Regras Especificas para AIO

Otimizacao de imagens pensando em como IAs consomem e referenciam paginas:

1. **Priorizar imagens que AJUDAM o entendimento**: diagramas simples, explicacoes visuais, comparativos lado a lado, fluxogramas, mapas leves, mockups de interface
2. **Evitar imagens genericas bonitas sem funcao**: IA nao se beneficia de stock photos decorativos
3. **IA usa paginas como fonte de resposta**: paginas com estrutura visual boa (imagens relevantes + alt text descritivo + posicionamento logico) sao fontes mais completas e preferidas
4. **Alt text como contexto semantico**: para IA, o alt text funciona como uma descricao adicional do conteudo da pagina — alt texts descritivos enriquecem o entendimento semantico
5. **Imagens com dados estruturados**: [[Schema Markup para IA|Schema Markup]] do tipo `ImageObject` ajuda buscadores e crawlers de IA a entender o papel da imagem no conteudo
6. **Nao depender da imagem para informacao critica**: IA nao "ve" imagens — toda informacao importante deve estar no texto tambem. Imagem complementa, nunca substitui

---

## Schema Markup para Imagens

Usar `ImageObject` dentro do schema `BlogPosting` para cada imagem relevante do artigo.

**Campos obrigatorios**:

| Campo | Descricao |
|---|---|
| `@type` | `ImageObject` |
| `url` | URL publica da imagem |
| `contentUrl` | URL direta do arquivo (pode ser igual a `url`) |
| `caption` | Legenda da imagem |
| `width` | Largura em pixels |
| `height` | Altura em pixels |

**Exemplo JSON-LD completo**:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Melhor Imobiliaria em Vitoria ES: Guia Completo 2026",
  "image": [
    {
      "@type": "ImageObject",
      "url": "https://exemplo.com.br/images/melhor-imobiliaria-vitoria-es.webp",
      "contentUrl": "https://exemplo.com.br/images/melhor-imobiliaria-vitoria-es.webp",
      "caption": "Panorama das melhores imobiliarias em Vitoria ES em 2026",
      "width": 1200,
      "height": 675
    },
    {
      "@type": "ImageObject",
      "url": "https://exemplo.com.br/images/comparativo-criterios-imobiliaria-vitoria-es.webp",
      "contentUrl": "https://exemplo.com.br/images/comparativo-criterios-imobiliaria-vitoria-es.webp",
      "caption": "Comparativo dos criterios essenciais para avaliacao de imobiliarias",
      "width": 1200,
      "height": 675
    }
  ],
  "author": {
    "@type": "Organization",
    "name": "Nome da Empresa"
  }
}
```

**Validacao**: sempre testar o schema no [Google Rich Results Test](https://search.google.com/test/rich-results) apos publicacao. O [[Agente Publicador]] faz isso automaticamente.

---

## Tipos de Imagem por Funcao

| Tipo | Funcao | Quando Usar | Prioridade | Exemplo |
|---|---|---|---|---|
| **cover** | Representar tema do artigo | Sempre (obrigatoria) | P0 | Cena editorial relacionada ao topico |
| **explanatory** | Explicar conceito visualmente | Secoes complexas, conceitos abstratos | P1 | Diagrama de processo, fluxograma simples |
| **comparison** | Mostrar diferencas | Listas "vs", criterios, tabelas comparativas | P1 | Layout dividido com contrastes visuais |
| **diagram** | Fluxo ou processo | Explicacoes de processo, step-by-step | P2 | Fluxograma, mapa mental, timeline |
| **local** | Contexto geografico | SEO local, artigos com foco em cidade/regiao | P2 | Elementos urbanos ou cenario da cidade |
| **cta** | Reforçar conversao | Fim do artigo, proximo ao CTA | P3 | Ambiente profissional, interacao positiva |
| **gallery** | Multiplas imagens | Portfolios, cases, antes/depois | P3 | Grid de imagens com contexto |

**Regra de priorizacao**:
- **P0**: implementar SEMPRE, desde V1
- **P1**: implementar quando artigo tem secoes que se beneficiam (maioria dos casos)
- **P2**: implementar quando contexto exige (SEO local, processos complexos)
- **P3**: implementar em V2+ ou quando briefing especifica

---

## Evolucao por Versao

### V1 — Regras Minimas (MVP)

- 1 imagem de capa por artigo (**OBRIGATORIA**)
- 1 imagem explicativa opcional (quando artigo tem secao complexa)
- Geracao automatizada via DALL-E 3
- Alt text automatico gerado pelo [[Agente Visual]]
- Compressao automatica via Sharp (Node.js)
- Formato WebP unico
- Filename com keyword (automatico)
- Posicionamento automatico baseado em H2s

### V2 — Evolucao

- Multiplos blocos visuais (3-5 por artigo)
- Templates visuais por nicho (imobiliario, saude, financeiro, tech)
- Diagramas customizados com estilo do nicho
- Comparacao visual side-by-side
- Estilo visual adaptado ao cliente (cores, tipografia, tom)
- Galeria de imagens para portfolios e cases
- Geracao em lote (batch de ate 10 artigos)
- Metricas de Google Images por imagem

### V3 — Maturidade

- Personalizacao completa por marca (brand kit visual)
- A/B testing de imagens (qual versao gera mais engagement e conversao)
- Video thumbnails otimizados
- Infograficos automaticos a partir de dados do artigo
- Geracao inteligente: IA decide quantas e quais imagens com base no conteudo
- Integracao com analytics de imagem (heatmaps, click tracking)
- CDN dedicado com otimizacao automatica por dispositivo

---

## Erros Comuns a Evitar

| Erro | Por que e Ruim | Como Evitar |
|---|---|---|
| Imagem sem relacao com texto | Confunde leitor, nao agrega SEO, IA ignora | [[Agente Visual]] valida coerencia via plano visual |
| Alt text generico ("imagem") | Perde oportunidade de SEO, inacessivel para leitores de tela | Template de alt com keyword + contexto (automatico) |
| Arquivo pesado (>500KB) | Piora LCP e CLS ([[SEO Tecnico|Core Web Vitals]]), aumenta bounce rate | Compressao automatica obrigatoria (Sharp) |
| Excesso de imagens (10+) | Poluicao visual, peso excessivo da pagina, diluicao de relevancia | Limite: 2-3 (V1), 4-6 (V2) |
| Imagem com texto embutido | Texto nao indexavel por buscadores, ilegivel em mobile, inacessivel | Regra: NUNCA texto renderizado na imagem |
| Sem lazy loading | Piora LCP significativamente, carrega imagens fora do viewport | Atributo `loading="lazy"` em todas (exceto hero) |
| Sem dimensoes definidas | Causa CLS (layout shift) — pagina "pula" enquanto imagem carrega | `width` e `height` obrigatorios no HTML |
| Filename generico | Perde sinal semantico para Google Images | Slug com keyword obrigatorio |
| Alt text keyword-stuffed | Penalizacao por spam, experiencia ruim para acessibilidade | Keyword 1x quando natural, foco na descricao |
| Imagem de capa com lazy loading | Hero image carrega lenta, piora LCP | Usar `loading="eager"` ou `fetchpriority="high"` |
| Todas as imagens no mesmo tamanho | Desperdicio de banda em mobile | Gerar tamanhos responsivos com `srcset` |

---

## Metricas de Imagem

| Metrica | Como Medir | Meta | Frequencia |
|---|---|---|---|
| Trafego via Google Images | GSC > Performance > Search type: Image | Crescimento mensal consistente | Semanal |
| Core Web Vitals (LCP) | PageSpeed Insights, GSC > Core Web Vitals | < 2.5s (verde) | A cada publicacao |
| Core Web Vitals (CLS) | PageSpeed Insights, GSC > Core Web Vitals | < 0.1 (verde) | A cada publicacao |
| Tempo na pagina | GA4 > Engagement > Average engagement time | Acima da media do blog | Mensal |
| Scroll depth | GA4 custom event | > 60% dos usuarios | Mensal |
| CTR de imagem | GA4 click tracking (se aplicavel) | Baseline + melhoria continua | Mensal |
| Taxa de imagens com alt text | Auditoria interna | 100% | A cada publicacao |
| Taxa de imagens em WebP | Auditoria interna | 100% | A cada publicacao |
| Tamanho medio das imagens | Lighthouse audit | < 200KB (desktop) | A cada publicacao |

---

## Checklist de Publicacao (Validacao Final)

Antes de publicar qualquer artigo, o [[Agente Revisor]] e o [[Agente Publicador]] devem verificar:

- [ ] Toda imagem tem alt text descritivo (nao generico)
- [ ] Todo filename contem keyword em formato slug
- [ ] Todas as imagens estao em formato WebP
- [ ] Nenhuma imagem excede 200KB (versao desktop)
- [ ] Imagens responsivas geradas (1200px, 600px, 300px)
- [ ] `loading="lazy"` em todas as imagens (exceto hero)
- [ ] `width` e `height` definidos no HTML
- [ ] Imagem de capa presente (acima do primeiro H2)
- [ ] Cada imagem esta perto do bloco que ilustra
- [ ] Nenhuma imagem contem texto embutido
- [ ] Schema `ImageObject` incluido no JSON-LD do artigo
- [ ] Caption adicionada em imagens de comparacao/diagrama

---

## Notas Relacionadas

- [[Agente Visual]]
- [[Template de Artigo]]
- [[Midia e Assets]]
- [[Plano Visual dos Artigos]]
- [[SEO Tecnico]]
- [[Framework AIO Completo]]
- [[Agente Publicador]]
- [[Agente Revisor]]
- [[On-Page SEO]]
- [[Schema Markup para IA]]
- [[E-E-A-T]]
- [[SEO Tecnico|Core Web Vitals]]
