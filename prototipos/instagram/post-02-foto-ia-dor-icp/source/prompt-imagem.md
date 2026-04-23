# Post 02 — Prompt + config da geracao de imagem

Registro fiel da configuracao usada pra gerar `assets/imagem-principal.png` em 2026-04-23.

## Ferramenta

- **Plataforma:** Ideogram API
- **Modelo:** `V_2` (REALISTIC style_type)
- **Chave de API:** fornecida pelo dono via chat; usada apenas em variavel de ambiente na sessao de execucao. **Nao registrada neste arquivo.** Rotacionada pelo dono pos-uso.

## Prompt

```
Cinematic wide-angle photograph of a quiet city street at night in a small local neighborhood. A row of five small storefronts lines the street — a modern cafe, a dental clinic with a clean sign, a boutique shop, a real estate office, a law office — each illuminated with warm amber interior lighting, their windows glowing softly onto the wet pavement. In the exact center of the composition, one single storefront stands out by being completely dark: its windows black, its sign unlit, no light inside, swallowed by shadow, visually absent compared to its neighbors. The wet asphalt reflects the warm lights of the other shops but not the dark one. A single person walks past in the foreground, slightly out of focus, holding a smartphone whose screen emits a cool, faint teal-mint glow softly illuminating their silhouette from below. Shot on 35mm film, shallow depth of field, editorial documentary photography aesthetic. Overall color palette: deep blacks, warm amber highlights on the lit storefronts, subtle cool teal-mint accent from the phone screen. Strong negative space in the sky above. Vertical composition, high contrast, moody, contemplative, slightly melancholic atmosphere. Photorealistic, grainy film texture. No visible text on signs, no readable logos, no brand names, no faces shown clearly.
```

## Negative prompt

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

- **Seed:** `1089638296`
- **Resolution bruta retornada:** `864x1152`
- **is_image_safe:** `true`
- **Data da geracao:** 2026-04-23

Com seed + prompt + config identicos, a API **nao garante** output bit-identico (Ideogram nao e deterministico), mas costuma aproximar fortemente. Util pra iterar mantendo o estilo.

## Observacao do output

A imagem manteve texto visivel nas placas das vitrines (`"modern cafe"`, `"real estate office"`) mesmo com instrucao "no visible text" no prompt. **Neste caso, mantivemos:** os textos visiveis reforcam o ICP primario da marca (cafe, imobiliaria = negocios locais), amarrando prompt e realidade do cliente. Se em gerações futuras isso virar problema, tentar:

- Reforcar no negative prompt: `readable text on signs, english words, shop names`
- Trocar style_type pra `DESIGN` (tende a ignorar mais texto)
- Usar V_3 se/quando disponivel

## Workaround documentado

Registrar em [Playbook - Post Imagem IA + Legenda](../../../../base-de-conhecimento/14%20-%20Marketing/Social/Playbook%20-%20Post%20Imagem%20IA%20+%20Legenda.md) (quando [BAI-36](https://linear.app/joao-lucas-ucceli/issue/BAI-36) rodar) que Ideogram V_2 nao tem 4:5 nativo — gerar em 3:4 e cropar e o padrao ate V_3 ser adotada.
