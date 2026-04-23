# Post 02 — Prompt + config da geracao de imagem

Registro fiel da(s) configuracao(oes) usadas pra gerar `assets/imagem-principal.png` em 2026-04-23.

## Ferramenta

- **Plataforma:** Ideogram API
- **Modelo:** `V_2` (REALISTIC style_type)
- **Chave de API:** fornecida pelo dono via chat; usada apenas em variavel de ambiente na sessao de execucao. **Nao registrada neste arquivo.** Rotacao recomendada pos-uso.

---

## V2 — versao atual (aprovada, seed 1663625176)

Feedback do dono sobre V1: "nao tem contexto brasileiro, tem texto em ingles na tela, imagens precisam ser chamativas e surrealistas pra retencao". V2 muda direcao: close-up emocional em vez de cenario amplo.

### Prompt V2

```
Close-up portrait photograph of a Brazilian small business owner (late 30s to mid 40s, brown skin, mixed Latin features, tired but sharp eyes, natural everyday appearance — could be a local shop owner, a dental clinic receptionist, or a real estate agent), caught in a moment of sudden unsettling realization. Their face is illuminated primarily by the cool, bright mint-teal glow of a smartphone screen held close to their chest just out of frame, casting intense light on their face from below. Their eyes are wide, pupils dilated, mouth slightly parted in a silent gasp — an expression of uncomfortable discovery, as if they just saw something they cannot unsee.

Background: softly out-of-focus cozy Brazilian small-business interior at night. Hint of a warm amber lamp far in the distance, wooden shelves, homey textures, lived-in feel. Unmistakably Brazilian warmth in the details but nothing literal or clichéd.

Surreal element: the mint-teal glow from the phone is exaggerated, unnaturally intense and volumetric. Light bends shadows around the face in impossible ways. A subtle hint that the glow is pulling all attention and light in the room toward it — as if the screen were a small portal. Slightly dreamlike, unsettling, memorable.

Shot on 35mm film, shallow depth of field, editorial portrait photography, photorealistic. Dramatic chiaroscuro lighting. Color palette: deep blacks dominating, cold mint-teal glow on the face as the hero light, warm amber mid-tones far in the background. Strong negative space around the person. Vertical portrait composition, centered subject, high contrast, moody, emotionally charged, slightly surreal. Fine film grain, subtle chromatic aberration.

Important: no visible text anywhere in frame, no readable screens, no readable logos, no brand names, no watermarks, no signage.
```

### Negative prompt V2

```
cartoon, illustration, 3d render, CGI, AI-generated look, plastic skin, oversaturated, smiling, happy expression, cheerful, bright daylight, overexposed, HDR, tacky, generic stock photo aesthetic, text overlays, readable text, typography, letters, logos, watermarks, lens flare, blue-only hue, multiple people, group of people, children, teens, elderly, cleanly dressed corporate look, professional studio lighting
```

### Seed V2

`1663625176` · resolution bruta 864x1152 · is_image_safe true

---

## V1 — versao descartada (historico, seed 1089638296)

Mantida aqui pra rastreabilidade. Conceito: "rua noturna com 5 vitrines iluminadas e uma escura no centro". Problemas do output: (1) placas em ingles ("modern cafe", "real estate office"), (2) arquitetura anglo-saxa sem contexto brasileiro, (3) visualmente editorial mas nao chamativa o suficiente pra stop-scroll. Descartada pelo dono em 2026-04-23.

### Prompt V1 (historico)

```
Cinematic wide-angle photograph of a quiet city street at night in a small local neighborhood. A row of five small storefronts lines the street — a modern cafe, a dental clinic with a clean sign, a boutique shop, a real estate office, a law office — each illuminated with warm amber interior lighting, their windows glowing softly onto the wet pavement. In the exact center of the composition, one single storefront stands out by being completely dark: its windows black, its sign unlit, no light inside, swallowed by shadow, visually absent compared to its neighbors. The wet asphalt reflects the warm lights of the other shops but not the dark one. A single person walks past in the foreground, slightly out of focus, holding a smartphone whose screen emits a cool, faint teal-mint glow softly illuminating their silhouette from below. Shot on 35mm film, shallow depth of field, editorial documentary photography aesthetic. Overall color palette: deep blacks, warm amber highlights on the lit storefronts, subtle cool teal-mint accent from the phone screen. Strong negative space in the sky above. Vertical composition, high contrast, moody, contemplative, slightly melancholic atmosphere. Photorealistic, grainy film texture. No visible text on signs, no readable logos, no brand names, no faces shown clearly.
```

### Negative prompt V1 (historico)

```
bright vibrant colors, cartoon style, 3d render, CGI, AI-generated look, oversaturated, cheerful mood, crowded composition, visible faces, text overlays, readable signage, logos, watermarks, lens flare, HDR, generic stock photo feel, plastic looking surfaces, overly polished, daytime, sunlight
```

## Config da chamada

```json
{
  "prompt": "<acima>",
  "aspect_ratio": "ASPECT_3_4",
  "model": "V_2",
  "style_type": "REALISTIC",
  "negative_prompt": "<acima>",
  "magic_prompt_option": "OFF"
}
```

- `magic_prompt_option: OFF` — queremos controle total do prompt, sem reescrita automatica do Ideogram.
- `ASPECT_3_4` — **V_2 nao suporta `ASPECT_4_5`**. Foi o ratio mais proximo disponivel; cropamos altura depois.

## Pipeline pos-geracao

1. Ideogram retornou imagem 864x1152 (3:4).
2. `sharp` fez `extract({ top: 36, height: 1080 })` centralizado (corte de 72px no total: 36 do topo, 36 da base).
3. `sharp` fez `resize(1080, 1350, { fit: 'fill' })` pra upscale limpo ao target Instagram 4:5.
4. Output: `imagem-principal.png` 1080x1350 / ~2.6 MB.

## Reprodutibilidade

- **Seed V2 (atual):** `1663625176`
- **Seed V1 (descartada):** `1089638296`
- **Resolution bruta:** `864x1152` em ambas
- **is_image_safe:** `true` em ambas
- **Data das geracoes:** 2026-04-23

Com seed + prompt + config identicos, a API **nao garante** output bit-identico (Ideogram nao e deterministico), mas costuma aproximar fortemente. Util pra iterar mantendo o estilo.

## Aprendizados das iteracoes

- **Instrução "no text" sozinha e fraca** — V1 gerou "modern cafe" e "real estate office" mesmo com "no visible text" no prompt. V2 reforcou no negative prompt (`text overlays, readable text, typography, letters`) e nao gerou texto algum.
- **Contexto cultural pede descritivo positivo** — pedir "Brazilian small business owner" + "mixed Latin features" + "cozy Brazilian interior" mudou completamente o output comparado a "a person" generico da V1.
- **Formato foto unica IG exige close emocional, nao cenario amplo** — legenda faz trabalho pesado explicando; a imagem precisa vender stop-scroll emocional antes. Wide-angle fica bom pra carrossel; foto unica quer retrato.
- **Workaround ASPECT_4_5:** Ideogram V_2 nao tem nativo, gerar em `ASPECT_3_4` + crop central pra 4:5 segue padrao.

## Workaround documentado

Registrar em [Playbook - Post Imagem IA + Legenda](../../../../base-de-conhecimento/14%20-%20Marketing/Social/Playbook%20-%20Post%20Imagem%20IA%20+%20Legenda.md) (quando [BAI-36](https://linear.app/joao-lucas-ucceli/issue/BAI-36) rodar) que Ideogram V_2 nao tem 4:5 nativo — gerar em 3:4 e cropar e o padrao ate V_3 ser adotada.
