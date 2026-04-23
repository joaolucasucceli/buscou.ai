# Post 02 — Prompt + config da geracao de imagem

Registro fiel das 3 versoes geradas em 2026-04-23.

## Ferramenta

- **Plataforma:** Ideogram API
- **Modelo:** `V_2` (REALISTIC style_type)
- **Chave de API:** fornecida pelo dono via chat; usada apenas em variavel de ambiente na sessao de execucao. **Nao registrada neste arquivo.** Rotacao recomendada pos-uso.

---

## V3 — versao atual (aprovada, seed 1227136915)

Calibragem final depois do feedback de que V2 ficou "muito chamativa mas dissonante com o branding" (marca vende tecnologia limpa e inteligente, V2 entregava panico sensacionalista).

### Prompt V3

```
Medium close-up portrait photograph of a Brazilian woman in her late 30s to early 40s, elegant and approachable — a confident mid-career small business owner (clinic owner, real estate agent, boutique owner type). Natural olive/brown skin preserved in its warmth, mixed Latin features, well-groomed hair tied back, subtle natural makeup, wearing a simple casual-smart cardigan or blouse. Her expression is one of quiet, thoughtful concern — eyebrows softly furrowed, eyes focused attentively on her smartphone screen (visible in the lower foreground, held in her hand). Lips slightly parted in quiet thought, NOT shock or horror. A reflective "wait, let me actually look at this" moment — professional, curious, slightly troubled but composed.

The mint-teal glow from the phone rises softly from below, adding a subtle cool accent to her under-chin and lower cheekbones — NOT dominating the face. Her natural warm skin tones are preserved throughout; the mint appears only as a tasteful secondary light accent. Beautiful balance of warm ambient and cool phone glow on her face.

Background: softly out-of-focus cozy modern Brazilian home-office or small business interior at night. Warm amber bokeh from a lamp in the distant background, wooden textures, tasteful minimal Brazilian décor (nothing overly stylized). Shallow depth of field blurs background into warm golden bokeh.

Aesthetic: high-end Brazilian tech commercial photography — think advertising for Nubank, iFood, Creditas, or XP Investimentos. Shot on full-frame 85mm equivalent, controlled natural lighting, subtle film grain. Photorealistic, elegant, commercial quality.

Color palette: warm amber and gold background (heavily blurred bokeh), preserved natural warm skin tones on face, subtle cool mint-teal accent as secondary light from below, deep shadows on sides for contrast. Vertical portrait composition, subject centered, moderate contrast, emotionally engaging yet restrained.

Absolutely NO body horror, NO sickly green skin, NO extreme wrinkles, NO panicked expression, NO bulging eyes, NO overly dramatic emotion. Subject should look confident, mid-career, attractive, successful — just caught in a quiet moment of attentive concern. No visible text anywhere, no readable screens, no logos, no brand names, no watermarks.
```

### Negative prompt V3

```
horror, body horror, sickly appearance, pale green skin, zombie, excessive wrinkles, aged face, elderly, panicked expression, wide-eyed terror, bulging eyes, over-the-top emotion, screaming, shocked mouth wide open, dramatic pose, theatrical lighting, cartoon, illustration, 3d render, CGI, AI-generated plastic skin look, oversaturated green, neon green, sickly yellow-green, blue-only hue, bright daylight, HDR, tacky, generic stock photo, text overlays, readable text, typography, letters, logos, watermarks, lens flare, multiple people, two people, group, caucasian nordic features only, asian features only, male subject, child, teenager, heavy makeup, glamour shot, artificial studio look
```

### Seed V3

`1227136915` · resolution bruta 864x1152 · is_image_safe true

---

## V2 — versao descartada (historico, seed 1663625176)

Direcao: close-up extremo emocional com glow mint dominando o rosto. Conceito surreal, pele esverdeada.

**Problemas do output:** funcionou mecanicamente (stop-scroll forte) mas dissonante com o branding da buscou.ai. Marca posiciona "tecnologia limpa, inteligente, direta"; V2 entregava "panico, sensacionalismo, susto barato". Para o ICP primario (dono de negocio local 35-55 anos), risco alto de (a) parecer golpe/clickbait, (b) afastar em vez de qualificar, (c) reacao negativa no algoritmo do IG (stop com 👎 e pior que sem stop).

### Prompt V2 (historico)

```
Close-up portrait photograph of a Brazilian small business owner (late 30s to mid 40s, brown skin, mixed Latin features, tired but sharp eyes, natural everyday appearance — could be a local shop owner, a dental clinic receptionist, or a real estate agent), caught in a moment of sudden unsettling realization. Their face is illuminated primarily by the cool, bright mint-teal glow of a smartphone screen held close to their chest just out of frame, casting intense light on their face from below. Their eyes are wide, pupils dilated, mouth slightly parted in a silent gasp — an expression of uncomfortable discovery, as if they just saw something they cannot unsee.

Background: softly out-of-focus cozy Brazilian small-business interior at night. Hint of a warm amber lamp far in the distance, wooden shelves, homey textures, lived-in feel. Unmistakably Brazilian warmth in the details but nothing literal or clichéd.

Surreal element: the mint-teal glow from the phone is exaggerated, unnaturally intense and volumetric. Light bends shadows around the face in impossible ways. A subtle hint that the glow is pulling all attention and light in the room toward it — as if the screen were a small portal. Slightly dreamlike, unsettling, memorable.

Shot on 35mm film, shallow depth of field, editorial portrait photography, photorealistic. Dramatic chiaroscuro lighting. Color palette: deep blacks dominating, cold mint-teal glow on the face as the hero light, warm amber mid-tones far in the background. Strong negative space around the person. Vertical portrait composition, centered subject, high contrast, moody, emotionally charged, slightly surreal. Fine film grain, subtle chromatic aberration.

Important: no visible text anywhere in frame, no readable screens, no readable logos, no brand names, no watermarks, no signage.
```

### Negative prompt V2 (historico)

```
cartoon, illustration, 3d render, CGI, AI-generated look, plastic skin, oversaturated, smiling, happy expression, cheerful, bright daylight, overexposed, HDR, tacky, generic stock photo aesthetic, text overlays, readable text, typography, letters, logos, watermarks, lens flare, blue-only hue, multiple people, group of people, children, teens, elderly, cleanly dressed corporate look, professional studio lighting
```

---

## V1 — versao descartada (historico, seed 1089638296)

Direcao: cenario amplo de rua noturna com 5 vitrines iluminadas e uma escura no centro.

**Problemas:** (1) placas em ingles ("modern cafe", "real estate office"), (2) arquitetura anglo-saxa sem contexto brasileiro, (3) visualmente editorial mas nao chamativa o suficiente pra stop-scroll em feed IG.

### Prompt V1 (historico)

```
Cinematic wide-angle photograph of a quiet city street at night in a small local neighborhood. A row of five small storefronts lines the street — a modern cafe, a dental clinic with a clean sign, a boutique shop, a real estate office, a law office — each illuminated with warm amber interior lighting, their windows glowing softly onto the wet pavement. In the exact center of the composition, one single storefront stands out by being completely dark: its windows black, its sign unlit, no light inside, swallowed by shadow, visually absent compared to its neighbors. The wet asphalt reflects the warm lights of the other shops but not the dark one. A single person walks past in the foreground, slightly out of focus, holding a smartphone whose screen emits a cool, faint teal-mint glow softly illuminating their silhouette from below. Shot on 35mm film, shallow depth of field, editorial documentary photography aesthetic. Overall color palette: deep blacks, warm amber highlights on the lit storefronts, subtle cool teal-mint accent from the phone screen. Strong negative space in the sky above. Vertical composition, high contrast, moody, contemplative, slightly melancholic atmosphere. Photorealistic, grainy film texture. No visible text on signs, no readable logos, no brand names, no faces shown clearly.
```

### Negative prompt V1 (historico)

```
bright vibrant colors, cartoon style, 3d render, CGI, AI-generated look, oversaturated, cheerful mood, crowded composition, visible faces, text overlays, readable signage, logos, watermarks, lens flare, HDR, generic stock photo feel, plastic looking surfaces, overly polished, daytime, sunlight
```

---

## Config da chamada (V3 final)

```json
{
  "prompt": "<V3 acima>",
  "aspect_ratio": "ASPECT_3_4",
  "model": "V_2",
  "style_type": "REALISTIC",
  "negative_prompt": "<V3 acima>",
  "magic_prompt_option": "OFF"
}
```

- `magic_prompt_option: OFF` — queremos controle total do prompt, sem reescrita automatica do Ideogram.
- `ASPECT_3_4` — V_2 nao suporta `ASPECT_4_5` nativo; cropamos altura depois.

## Pipeline pos-geracao

1. Ideogram retorna imagem 864x1152 (3:4).
2. `sharp` faz `extract({ top: 36, height: 1080 })` centralizado (corte de 72px no total: 36 do topo, 36 da base).
3. `sharp` faz `resize(1080, 1350, { fit: 'fill' })` pra upscale limpo ao target Instagram 4:5.
4. Output: `imagem-principal.png` 1080x1350 (~2.9 MB na V3).

## Aprendizados das 3 iteracoes

- **V1 → V2:** cenario amplo editorial nao faz stop-scroll em foto unica IG. Close-up emocional em rosto humano engaja mais.
- **V2 → V3:** stop-scroll sozinho nao basta — **a emocao provocada precisa ser consistente com o branding**. Horror visual / susto afasta o ICP de uma marca posicionada como "tecnologia limpa". O ponto justo e close emocional composto (reflexivo, nao panico), pele natural, acento mint sutil.
- **Instrução "no text" isolada e fraca** — so V2/V3 conseguiram zero texto porque reforcamos no negative prompt (`text overlays, readable text, typography, letters`).
- **Contexto cultural pede descritivo positivo** — "Brazilian woman" + "mixed Latin features" + "cozy modern Brazilian interior" mudou completamente o output comparado a "a person" generico.
- **Referencias explicitas de marcas** no prompt ajudam muito — "advertising for Nubank, iFood, Creditas, or XP Investimentos" guiou o output pra estetica tech BR elegante em vez de stock/horror/editorial.
- **Workaround ASPECT_4_5:** V_2 nao tem 4:5 nativo; gerar em 3:4 + crop e o padrao ate V_3 ser adotada.

## Workaround documentado

Registrar em [Playbook - Post Imagem IA + Legenda](../../../../base-de-conhecimento/14%20-%20Marketing/Social/Playbook%20-%20Post%20Imagem%20IA%20+%20Legenda.md) (quando [BAI-36](https://linear.app/joao-lucas-ucceli/issue/BAI-36) rodar):

1. Template de prompt com secoes canonicas (persona BR, expressao calibrada, luz mint como acento, fundo warm BR, referencias de marcas tech BR).
2. Checklist pre-envio: "stop-scroll sim, mas branding-consistent — a emocao entregue combina com o posicionamento da marca?"
3. Anti-padroes explicitos: horror visual, verde-doentio, panico teatral, cenarios anglo-saxos, texto em placas, stock photo aesthetic.
