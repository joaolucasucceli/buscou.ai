# Post 02 — Prompt + config da geracao de imagem

Registro fiel das 5 versoes geradas em 2026-04-23.

## Ferramenta

- **Plataforma:** Ideogram API
- **Modelo:** `V_2` (REALISTIC style_type)
- **Chave de API:** fornecida pelo dono via chat; usada apenas em variavel de ambiente na sessao de execucao. **Nao registrada neste arquivo.** Rotacao recomendada pos-uso.

---

## V5 — versao atual (aprovada, seed 2112010798)

Salto de direcao depois da V4 regredir: saimos de "close de rosto em home-office" pra "plano medio em balcao de comercio brasileiro moderno com LED neon como decor real do ambiente". A tecnologia aparece no cenario, nao no prompt forcado.

### Prompt V5

```
Medium shot photograph of a Brazilian man in his mid-30s to early 40s standing behind the counter of his own small modern business at night — could be a premium barbershop, a specialty coffee shop, or a modern men's boutique. Warm mixed Latin features, well-groomed dark hair, short well-trimmed beard, casual-smart outfit (a clean collared shirt or apron over a dark t-shirt). His expression is quietly troubled and attentive — eyebrows softly furrowed, eyes focused intently on his smartphone screen held in his hands in the lower foreground, lips parted slightly in silent thought. Composed professional, NOT panicked, NOT shocked — just reflective and concerned.

The space itself — modern Brazilian premium small business interior — has subtle designed tech ambient lighting that feels cozy and intentional, not cyberpunk or clinical:
- A thin mint-teal LED light strip glowing softly on a minimal dark wooden shelf behind him
- A soft violet-purple neon accent glow from a wall fixture on one side of the composition, creating ambient purple cast on that side
- A warm amber Edison-style pendant light hanging overhead provides the main ambient warm light
- A softly out-of-focus plant or two adds warmth and lived-in feel

The smartphone screen adds a clear mint-teal glow to his face and hands from below — signature hero light, bright and visible but still part of the overall balanced lighting. The scene has a beautiful cinematic contrast between warm amber ambient and cool mint/violet neon accents.

Background: heavy beautiful bokeh of the shelving, plants, and tasteful Brazilian modern decor elements (minimal, not clichéd). Warm amber bokeh dots mixed with cool mint-teal and violet-purple neon bokeh pinpoints. The vibe reads as a high-end commercial photograph advertising a Brazilian tech-forward service (think Nubank, iFood creator spotlight, Creditas, or XP Investimentos small-business campaign).

Shot on full-frame camera with 85mm lens equivalent, ultra-sharp focus on his eyes, heavy tasteful bokeh on background. 8K detail, ultra-realistic, photorealistic, commercial photography aesthetic. Subtle film grain, cinematic lighting, professional color grading.

Color palette: warm amber base ambient (Edison light), cool mint-teal hero light from phone and LED strip, violet-purple neon accent on one side, deep rich blacks as base, natural warm Latin skin tones preserved (no color shift on face).

Vertical portrait composition, subject composed and centered, moderate-to-strong contrast between warm subject and cool-warm ambient.

Absolutely NO body horror, NO sickly green skin, NO panicked expression, NO bulging eyes, NO dramatic emotion. Subject stays calm, composed, professional. The LED strips and neon lights should be color-only light sources with no readable patterns or text. No visible text anywhere in the entire image, no readable screens, no readable logos, no brand names, no watermarks, no signage with letters.
```

### Negative prompt V5

```
horror, body horror, sickly appearance, pale green skin, zombie, excessive wrinkles, panicked expression, wide-eyed terror, bulging eyes, over-the-top emotion, screaming, dramatic pose, theatrical lighting, cartoon, illustration, 3d render, CGI, AI-generated plastic skin look, oversaturated green, sickly yellow-green, neon green on skin, blue-only hue, bright daylight, HDR, tacky, generic stock photo, text overlays, readable text, readable screens, UI elements, interface text, app icons, typography, letters, logos, watermarks, lens flare, multiple people, two people, group, caucasian nordic features only, asian features only, female subject, woman, child, teenager, elderly, heavy makeup, hospital lighting, laboratory, clinical setting, harsh industrial, cyberpunk excess, rainbow colors, red neon, orange neon, yellow neon, pink neon, blue-only neon, disco, nightclub, party atmosphere, cluttered background, busy composition
```

### Seed V5

`2112010798` · resolution bruta 864x1152 · is_image_safe true · ~3.1 MB final

### O que o Ideogram entregou de fato (deltas)

- Homem BR carismatico, avental + camiseta preta + relogio, cabelo escuro curto, barba aparada — ✓
- Balcao preto brilhante, maos segurando celular, expressao composta concentrada — ✓
- **Neon ondulado branco-teal no teto** criando forte presenca tech — ✓ (entregou com mais protagonismo que o pedido, o que ajudou)
- Violeta explicito nao apareceu — cumpriu papel de "ar tech" so com mint/teal
- Bokeh quente + teal no fundo — ✓
- Zero texto visivel — ✓
- Pele natural preservada — ✓

---

## V4 — versao descartada (historico, seed 1929262769)

Tentativa de adicionar "ar tech" a V3. Modelo ignorou todas as instrucoes de lighting tech (bokeh neon, monitor tech, luz violeta) e entregou ainda mais sobria que V3 — vibe "campanha de joalheria" em estudio bege. Regressao completa nas dimensoes de tecnologia.

### Prompt V4 (historico)

```
Medium close-up portrait photograph of a Brazilian woman in her late 30s to early 40s, elegant and approachable — a confident mid-career small business owner (clinic owner, real estate agent, boutique owner type). Natural olive/brown skin preserved in its warmth, mixed Latin features, well-groomed hair tied back, subtle natural makeup, wearing a simple casual-smart cardigan or blouse. Her expression is one of quiet, thoughtful concern — eyebrows softly furrowed, eyes focused attentively on her smartphone screen (visible in the lower foreground, held in her hand). Lips slightly parted in quiet thought, NOT shock or horror. A reflective "wait, let me actually look at this" moment — professional, curious, slightly troubled but composed.

IMPORTANT LIGHTING: The mint-teal glow from the phone is now CLEARLY visible on her face and hand — bright signature hero light, still not dominating but distinct. Creates a clear cool-warm contrast: warm natural skin tones preserved, with a pronounced mint-teal accent on the under-chin, cheekbones, and the hand holding the phone. The tech presence is FELT in the lighting itself.

Background — high-tech cozy Brazilian home-office or modern small business interior at night, with DISTINCT NEON AMBIENT LIGHTING as a signature element. Heavy tasteful bokeh containing:
- Multiple glowing pinpoints of mint-teal neon color
- Multiple glowing pinpoints of violet-purple neon color
- A softly out-of-focus computer monitor in the far background emitting a soft mint-cyan glow (display shows only abstract blurred glow, no UI elements, no readable text, no interface)
- Subtle LED light strips creating horizontal streaks of color
- A hint of a violet-purple accent light source casting a gentle glow from one side

On the top/corner of the frame, a soft violet-purple ambient light gradient — like a radial-gradient from above — gently washes the scene, adding tech-ambient mood without overpowering. Cozy AND technological simultaneously, never sterile or clinical.
(prompt truncado aqui pra economizar espaco — ver git history do arquivo pra versao completa)
```

**Licao aprendida da V4:** Ideogram V_2 pesa prompts longos nas primeiras instrucoes e ignora o resto. Adicionar "tech lighting" depois da persona estabelecida nao funciona. Solucao (aplicada na V5): **tech faz parte do cenario**, o cenario e modern premium commerce BR (que naturalmente tem LED decor), a persona e parte do ambiente em vez do contrario.

---

## V3 — versao descartada (historico, seed 1227136915)

Close medio de brasileira elegante 40s em home-office. Expressao reflexiva, pele natural. Soberia e on-brand, mas **sem ar de tecnologia** — feedback do dono: "esta sobria, identidade visual dentro do padrao, nao esta assustadora, mas nao tem ar de tecnologia".

### Prompt V3 (historico)

```
Medium close-up portrait photograph of a Brazilian woman in her late 30s to early 40s, elegant and approachable — a confident mid-career small business owner (clinic owner, real estate agent, boutique owner type). Natural olive/brown skin preserved in its warmth, mixed Latin features, well-groomed hair tied back, subtle natural makeup, wearing a simple casual-smart cardigan or blouse. Her expression is one of quiet, thoughtful concern — eyebrows softly furrowed, eyes focused attentively on her smartphone screen (visible in the lower foreground, held in her hand). Lips slightly parted in quiet thought, NOT shock or horror. A reflective "wait, let me actually look at this" moment — professional, curious, slightly troubled but composed.

The mint-teal glow from the phone rises softly from below, adding a subtle cool accent to her under-chin and lower cheekbones — NOT dominating the face. Her natural warm skin tones are preserved throughout; the mint appears only as a tasteful secondary light accent.

Background: softly out-of-focus cozy modern Brazilian home-office or small business interior at night. Warm amber bokeh from a lamp in the distant background, wooden textures, tasteful minimal Brazilian décor. Shallow depth of field blurs background into warm golden bokeh.

Aesthetic: high-end Brazilian tech commercial photography — think advertising for Nubank, iFood, Creditas, or XP Investimentos. Shot on full-frame 85mm equivalent, controlled natural lighting, subtle film grain. Photorealistic, elegant, commercial quality.
```

**Licao aprendida V3:** on-brand mas timido demais. Faltou presenca tech real no cenario.

---

## V2 — versao descartada (historico, seed 1663625176)

Close extremo emocional com glow mint dominando rosto. Stop-scroll forte mas **dissonante com o branding** (marca vende "tecnologia limpa, inteligente, confiavel"; V2 entregava panico sensacionalista). Pro ICP primario, leu como clickbait.

### Prompt V2 (historico)

```
Close-up portrait photograph of a Brazilian small business owner (late 30s to mid 40s, brown skin, mixed Latin features, tired but sharp eyes, natural everyday appearance — could be a local shop owner, a dental clinic receptionist, or a real estate agent), caught in a moment of sudden unsettling realization. Their face is illuminated primarily by the cool, bright mint-teal glow of a smartphone screen held close to their chest just out of frame, casting intense light on their face from below. Their eyes are wide, pupils dilated, mouth slightly parted in a silent gasp — an expression of uncomfortable discovery, as if they just saw something they cannot unsee.

Surreal element: the mint-teal glow from the phone is exaggerated, unnaturally intense and volumetric. Light bends shadows around the face in impossible ways. A subtle hint that the glow is pulling all attention and light in the room toward it — as if the screen were a small portal.
```

**Licao aprendida V2:** stop-scroll sozinho nao basta. A emocao provocada precisa ser consistente com o posicionamento. Horror/susto destoa de marca de tecnologia elegante.

---

## V1 — versao descartada (historico, seed 1089638296)

Cenario amplo de rua noturna com 5 vitrines, uma escura no centro. Placas em ingles, arquitetura anglo-saxa, pouco stop-scroll.

### Prompt V1 (historico)

```
Cinematic wide-angle photograph of a quiet city street at night in a small local neighborhood. A row of five small storefronts lines the street — a modern cafe, a dental clinic with a clean sign, a boutique shop, a real estate office, a law office — each illuminated with warm amber interior lighting, their windows glowing softly onto the wet pavement. In the exact center of the composition, one single storefront stands out by being completely dark.
```

**Licao aprendida V1:** cenario amplo editorial nao faz stop-scroll em foto unica IG. Close emocional em rosto humano engaja mais. E precisa contexto BR explicito no prompt.

---

## Config da chamada (V5 final)

```json
{
  "prompt": "<V5 acima>",
  "aspect_ratio": "ASPECT_3_4",
  "model": "V_2",
  "style_type": "REALISTIC",
  "negative_prompt": "<V5 acima>",
  "magic_prompt_option": "OFF"
}
```

- `magic_prompt_option: OFF` — controle total do prompt, sem reescrita automatica.
- `ASPECT_3_4` — V_2 nao suporta `ASPECT_4_5` nativo; cropamos altura depois.

## Pipeline pos-geracao

1. Ideogram retorna imagem 864x1152 (3:4).
2. `sharp` faz `extract({ top: 36, height: 1080 })` centralizado.
3. `sharp` faz `resize(1080, 1350, { fit: 'fill' })` pra target IG 4:5.
4. Output: `imagem-principal.png` 1080x1350 (~3.1 MB na V5).

## Aprendizados consolidados (5 iteracoes)

- **V1 → V2:** cenario amplo editorial nao faz stop-scroll em foto unica IG.
- **V2 → V3:** stop-scroll sozinho nao basta — emocao entregue precisa ser consistente com branding.
- **V3 → V4:** "on-brand sobrio" pode perder personalidade. Marca de tecnologia precisa de **presenca tech real** na imagem.
- **V4 → V5:** **nao adicione tech depois de estabelecer persona** — Ideogram V_2 pesa primeiras instrucoes e ignora o resto. Em vez disso, **desenhe o cenario como sendo naturalmente tech** (comercio moderno com LED decor real BR). Persona vem de dentro do cenario, nao antes dele.
- **Instrução "no text" isolada e fraca** — reforcar em negative prompt.
- **Contexto cultural pede descritivo positivo** (Brazilian + mixed Latin features + specific business type).
- **Referencias explicitas de marcas tech BR** no prompt (Nubank, iFood, Creditas, XP) ancoram a estetica no lugar certo.
- **Variar persona entre posts** — alternar genero, idade, tipo de negocio pra cobrir ICPs diferentes no feed.
- **Workaround ASPECT_4_5:** V_2 nao tem 4:5 nativo; gerar em 3:4 + crop. Migrar pra V_3 quando disponivel.

## Workaround documentado

Quando [BAI-36](https://linear.app/joao-lucas-ucceli/issue/BAI-36) rodar, registrar no Playbook:

1. Template de prompt com **cenario tech BR** como ponto de partida (nao persona).
2. Persona emerge do cenario (dono da barbearia, da clinica, do cafe) em vez do contrario.
3. Checklist pre-envio: "o ar tech esta no cenario ou forcado em adendo?"
4. Anti-padroes: cenarios anglo-saxoes, placas em ingles, home-office sem tecnologia, close extremo, horror, sickly green skin, glow mint exagerado dominando o rosto.
5. Alternar persona (genero/idade/tipo de negocio) entre posts consecutivos pra representatividade do ICP.
