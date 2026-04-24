# Prompts Ideogram — Landing buscou.ai

Versão: 2026-04-24
Modelo: V_2
Aspect ratio: ASPECT_16_9
Style: REALISTIC
Magic prompt: ON (default)

## Regras de estilo

- Dark-first: fundo base `#08090D`
- Glow mint-teal `#00E5A0` como acento emocional (< 10% da composição)
- Cinematográfico / editorial, não "AI art slop", não startup-stock
- Contexto brasileiro — rostos, ambiente, quando aplicável
- Metáfora visual > ilustração literal
- Zero texto renderizado na imagem (negative prompt explícito)

## Imagens geradas

### 1. hero-bg — Hero background cinematic

**Uso:** background da seção `.hero`, aplicado via CSS com gradient overlay escuro pra garantir legibilidade do texto.

**Prompt:**
> Cinematic close-up photograph of a Brazilian professional's face softly illuminated by a single teal-green glow from an unseen phone screen below. Deep shadows, 85% of frame in near-black with subtle grain. The teal glow reflects on the cheekbone and lower lip only, creating a minimal accent. Contemplative gaze looking slightly down. Blurred urban Brazilian street lights in background (warm orange-yellow bokeh). Shot on Leica Q, 28mm, f/1.7, ISO 1600. Editorial, moody, quiet tension. No text, no logos.

**Negative:** text, typography, letters, logos, watermark, AI art aesthetic, neon signs, cyberpunk, sci-fi, futuristic tech interface

**Seed:** 1863663136
**Magic prompt:** ON
**Resolução original:** 1312×736

---

### 2. final-cta-bg — Final CTA emotional background (v2 após regeneração)

**Uso:** background da seção `.final-cta`, aplicado via CSS com gradient overlay escuro forte pra o copy branco ficar legível, evocando a tensão da pergunta final "sua empresa já aparece?".

**Prompt (v2 — reforçou tungstênio quente + removeu texto legível):**
> Cinematic wide shot of a Brazilian small business owner in their fifties sitting alone at a dim wooden counter inside a small local pharmacy at dusk. One warm tungsten pendant light creates a honey amber glow bathing the entire scene. The man rests his chin on one hand, contemplative, looking at a closed laptop. A simple white coffee mug beside it emits a tiny teal reflection on its rim (the only cold accent in the image). Background is soft focus: wooden shelves with glass jars, warm terracotta wall tones, faint depth. No signage visible. Shot on Sony A7IV, 50mm, f/1.8, ISO 800, shallow depth of field, subtle film grain. Editorial documentary aesthetic. Empty but dignified atmosphere.

**Negative:** any text, any letters, any words, any typography, any signs, any logos, watermark, readable signage, storefront windows with writing, neon signs, price tags, cyberpunk blue, cold color grade, futuristic, sci-fi, stock photo aesthetic, AI art aesthetic

**Seed:** 574743047
**Magic prompt:** OFF
**Resolução original:** 1312×736

**Nota v1:** primeira versão (seed 1728565337) foi descartada — tonalidade azul-cyan dominante em vez de âmbar, sinalização visível em vitrine. V2 corrige ambos.

---

## Notas operacionais

- Chave Ideogram: nunca commitada. Usada só inline em chamadas via shell.
- Pós-geração: imagens baixadas pra `site/public/images/` (raiz), resize até max 1920px wide + compressão JPEG q75 ou WEBP quality 80.
- Pós-uso: recomendar rotação da chave.
