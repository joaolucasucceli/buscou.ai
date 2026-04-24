# Prompts Ideogram — Landing buscou.ai (humanização)

Versão: 2026-04-24 (pós-Reversão das imagens de fundo)
Modelo: V_2
Style: REALISTIC
Magic prompt: OFF (mais controle)

## Regras de estilo

- **Dark-first** (fundo `#08090D` do site predomina; imagens não precisam ser escuras — podem ter luz natural)
- **Contexto 100% brasileiro:** rostos, ambientes, móveis, arquitetura, atmosfera
- **Editorial / documental,** não "stock photo sorriso branco" nem "AI art slop"
- **Luz natural ou tungstênio warm** — nada de fluorescente branco ou studio flash
- **Zero texto legível** (negative prompt reforçado)
- **Zero "commercial pose"** — pessoas reais em momentos reais

## Imagens geradas

### Grupo A — Seção `#para-quem` (6 imagens, ASPECT_1_1)

Cards quadrados com foto no topo. Resolução nativa Ideogram 1024×1024, redimensionadas pra 800×800 (suficiente pra retina em card pequeno).

#### 1. `nicho-imobiliarias.{webp,jpg}` — seed `825356296`

> Editorial documentary photograph of a Brazilian female real estate agent in her thirties handing keys to a young couple inside a sunlit empty apartment with bare wooden floor. Natural late afternoon light through large window. Authentic interaction, slight smile, no posing. Shot on 50mm f/1.8, shallow depth of field. Warm golden hour tones, film grain. No text, no logos.

**Nota:** primeira geração (seed acima) retornou imagem ideal. Não regerada.

#### 2. `nicho-clinicas.{webp,jpg}` — seed `1207842133`

> Editorial documentary photograph of a Brazilian female dentist in her forties reviewing a digital patient chart on a tablet inside a modern calm dental clinic. Soft morning light from side window, blurred background shows clean dental chair and equipment. Focused expression. Shot on 85mm f/2, shallow depth of field. Warm neutral tones, subtle film grain. No text, no logos.

**Nota:** imagem aceitável; óculos de proteção dentária amarelos são proeminentes (característica da profissão, não quebra credibilidade).

#### 3. `nicho-prestadores.{webp,jpg}` — seed `1244248181`

> Editorial documentary photograph of a Brazilian lawyer in his forties in a cozy small office lined with books, sitting at a wooden desk with warm pendant lamp overhead. Open laptop, notes. Talking to someone off-camera with focused listening. Late afternoon amber light. Shot on 35mm f/2, documentary style, subtle film grain. No text, no logos.

#### 4. `nicho-negocios-locais.{webp,jpg}` — seed `1376125862`

> Editorial documentary photograph of a Brazilian middle-aged business owner behind the counter of a small neighborhood shop (could be a bakery, auto parts store, or clothing store), greeting a customer. Warm natural daylight from the front door. Authentic worn counter, real inventory on shelves behind. Shot on 50mm f/2, documentary style, subtle film grain. No text, no logos.

#### 5. `nicho-ecommerces.{webp,jpg}` — seed `1988765759`

> Editorial documentary photograph of a young Brazilian entrepreneur in home office setting, laptop open on a simple wooden table with cardboard shipping boxes and packing tape visible in the background. Natural afternoon light from window. Focused expression packaging a product. Shot on 35mm f/2, documentary, film grain. No text, no logos, no visible brand packaging.

**Nota:** texto embaçado "HIP" em caixa de papelão foi detectado — não legível em tamanho de card, aceitável.

#### 6. `nicho-infoprodutores.{webp,jpg}` — seed `2109526627`

> Editorial documentary photograph of a Brazilian content creator in his thirties sitting at a minimalist desk with ring light and laptop, looking at camera with calm focus. Home studio dignified but unpretentious — wooden wall, single plant, warm tungsten. Shot on 50mm f/1.8, shallow depth of field, film grain. No text, no logos.

### Grupo B — Seção `#humanos` (1 imagem, ASPECT_16_9)

Foto wide editorial da nova seção "Quem está por trás" entre `#preview` e `#faq`. Resolução 1280×720 pós-resize.

#### 7. `humanos-time.{webp,jpg}` — seed `1445946550`

> Editorial documentary photograph of two young Brazilian co-founders (one man, one woman) in their late twenties working together at a shared desk in a casual small office. Laptops open, coffee mugs, afternoon warm tungsten light, plants in background. Genuine conversation, one pointing at the screen, the other smiling while typing. Real working atmosphere, not posed. Shot on 35mm f/2, documentary style, film grain. No text, no logos.

## Negative prompt padrão

> text, typography, letters, logos, watermark, stock photo aesthetic, AI art, sci-fi, fluorescent lighting, studio flash, overly white smile, overproduced, commercial pose

Adições específicas por imagem:
- `nicho-clinicas`: `cold clinical blue, teeth close-up`
- `nicho-prestadores`: `gavel cliche, scales of justice`
- `nicho-negocios-locais`: `chain store, franchise branding`
- `nicho-ecommerces`: `amazon box, shiny corporate, sterile studio`
- `nicho-infoprodutores`: `youtuber cliche, gaming RGB lights, overly colorful`
- `humanos-time`: `silicon valley cliche, suits, corporate meeting, whiteboard with writing`

## Tamanhos otimizados

| Imagem | webp | jpg |
|---|---|---|
| nicho-imobiliarias | 47KB | 80KB |
| nicho-clinicas | 32KB | 60KB |
| nicho-prestadores | 55KB | 90KB |
| nicho-negocios-locais | 62KB | 92KB |
| nicho-ecommerces | 42KB | 70KB |
| nicho-infoprodutores | 42KB | 71KB |
| humanos-time | 85KB | 131KB |
| **Total** | **365KB** | **594KB** |

## Operacional

- **Chave Ideogram:** nunca commitada. Passada inline via env var no shell.
- **Geração:** script Python em `c:\tmp\gen_ideogram.py` (fora do repo, descartável).
- **Pós-uso:** rotacionar chave Ideogram conforme boa prática.
- **Histórico:** as 2 imagens anteriores (hero-bg + final-cta-bg) foram removidas no mesmo commit (feedback do dono: preferia o fundo radial-gradient original, sem imagem).
