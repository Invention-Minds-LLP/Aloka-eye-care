---
name: Dr Aloka's Eye Care
description: One Hyderabad family's evening visit, told in flat lamplit illustration, for a paediatric and squint eye practice in Kukatpally.
colors:
  hope: "#e8792f"
  hope-action: "#b94e14"
  hope-action-hover: "#9e410f"
  teal: "#4fb3d9"
  teal-deep: "#3aa0c8"
  teal-ink: "#7cc9e8"
  wa: "#3fcf80"
  wa-hover: "#1f9e5a"
  ink: "#f1f0f5"
  ink-soft: "#b9bfd2"
  ink-faint: "#8d95ad"
  ink-dark: "#1b2a3a"
  ink-dark-soft: "#4a5a6b"
  on-accent: "#ffffff"
  white: "#0f1426"
  paper: "#141a2f"
  mist: "#1a2139"
  tint: "#172340"
  card: "#fbf8f2"
  steel-100: "#1e2640"
  steel-300: "#313b5a"
  steel-500: "#6c7898"
  skin: "#b97a56"
  skin-child: "#c98b63"
  skin-doctor: "#b07150"
  hair: "#1f1614"
  saree: "#c2335a"
  blouse-teal: "#1f7a8c"
  gold: "#e8a33a"
  coat-white: "#fbfcfd"
  dusk-sky: "#1b2140"
  twilight-sky: "#7a4a70"
  twilight-horizon: "#f3a765"
  room-dusk: "#1d1a2c"
  room-floor: "#2a2334"
  lamplight: "#ffd68c"
  window-glow: "#e9b85e"
  sun: "#ffb35c"
  lens-steel: "#aab5c2"
  auto-yellow: "#f2c230"
  auto-green: "#1f6b4a"
typography:
  display:
    fontFamily: "'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 1.2rem + 2.4vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.25rem + 2.9vw, 3.75rem)"
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  title:
    fontFamily: "'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 1.08rem + 1.2vw, 2rem)"
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  quote:
    fontFamily: "'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.12rem, 1.04rem + 0.35vw, 1.3rem)"
    fontWeight: 550
    lineHeight: 1.35
  lede:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.12rem, 1.04rem + 0.35vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.02rem, 0.98rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.4
  button:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 650
    lineHeight: 1
  lens-tab:
    fontFamily: "'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.12em"
  telugu:
    fontFamily: "'Anek Telugu Variable', 'Noto Sans Telugu', sans-serif"
    fontSize: "1.15em"
    fontWeight: 600
    letterSpacing: "0"
rounded:
  tag: "4px"
  sign: "6px"
  cell: "8px"
  pad: "10px"
  chart: "12px"
  card: "14px"
  bubble: "18px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 0.4rem + 3vw, 3rem)"
  container: "1240px"
  header-container: "1400px"
  section: "clamp(6rem, 14vh, 9rem)"
  action-gap: "0.75rem 1rem"
  touch: "2.75rem"
  key: "3.25rem"
components:
  button-book:
    backgroundColor: "{colors.hope-action}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem 0.85rem 1.35rem"
    height: "3.25rem"
  button-book-hover:
    backgroundColor: "{colors.hope-action-hover}"
    textColor: "{colors.on-accent}"
  button-book-compact:
    backgroundColor: "{colors.hope-action}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.1rem 0.6rem 1.15rem"
    height: "2.75rem"
  button-whatsapp:
    textColor: "{colors.wa}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.25rem"
    height: "3.25rem"
  button-whatsapp-hover:
    backgroundColor: "{colors.wa-hover}"
    textColor: "{colors.on-accent}"
  whatsapp-round:
    backgroundColor: "rgb(63 207 128 / 0.14)"
    textColor: "{colors.wa}"
    rounded: "{rounded.pill}"
    size: "2.75rem"
  link-call:
    textColor: "{colors.ink}"
    padding: "0.5rem 0.25rem"
    height: "3.25rem"
  logo-plate:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.pad}"
    padding: "6px 10px"
  story-player:
    backgroundColor: "rgb(15 20 38 / 0.9)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 1.1rem 0.45rem 0.45rem"
  story-player-key:
    backgroundColor: "{colors.hope-action}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    size: "2.9rem"
  bubble:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.bubble}"
    padding: "0.7rem 1rem"
  sticker-chart:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.chart}"
    padding: "1rem 1.1rem 1.1rem"
  sticker-cell:
    backgroundColor: "#eee8dc"
    rounded: "{rounded.cell}"
  sticker-cell-done:
    backgroundColor: "#fff5e0"
    rounded: "{rounded.cell}"
  eyes-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-dark-soft}"
    rounded: "{rounded.card}"
    padding: "0.75rem 0.9rem 0.6rem"
  clinic-sign:
    backgroundColor: "{colors.card}"
    textColor: "{colors.hope-action}"
    rounded: "{rounded.sign}"
    padding: "0.55rem 1.1rem 0.6rem 0.9rem"
  rail-label:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.7rem"
  lens-tab:
    backgroundColor: "{colors.hope-action}"
    textColor: "{colors.on-accent}"
    typography: "{typography.lens-tab}"
    padding: "0.4rem 1rem 0.4rem 1.4rem"
  mini-lens:
    backgroundColor: "#1b2644"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "clamp(80px, 8vw, 104px)"
  week-day:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pad}"
    padding: "0.6rem 0.2rem 0.55rem"
---

# Design System: Dr Aloka's Eye Care

## Overview

**Creative North Star: "One Family's Visit, at Evening"**

The site tells one literal story: a worried mother and her schoolgirl daughter arrive at a clinic on a KPHB street as dusk falls, Dr. Aloka examines the child under a lamp, therapy fills a sticker chart and the turned eye straightens, and the family (grandmother included) walks out into a warm twilight. Every visual decision serves that story. The world is flat, warm vector illustration of Hyderabad in the evening: apartment towers with lit windows and a small Charminar on the horizon, the elevated metro with a lit train crossing, the clinic's building with its glowing name board and an open door spilling light, a neem tree, an auto-rickshaw with its headlamp on. The characters are Indian: mother in a saree, a girl in a teal school pinafore with orange ribbons, Dr. Aloka in a white coat over a saree, each rim-lit so they read against the dark.

The story runs as four pinned full-screen scenes, each a scroll length whose progress plays the action (walking, faces softening, the doctor crossing the room, stickers landing). A story player can play it on its own after a short countdown; any scroll, swipe, key or tap hands control straight back. After the story the page stays in the evening: calm editorial sections for the doctor, trust and FAQ, families' results and the visit, all on a deep blue-ink ground with warm-white text. Two sections carry a themed motif of their own, fenced to that section: the Trust section flies a Sankranti evening sky of kites, and the Results section shows its before/after through a steel-rimmed trial lens. Light surfaces exist only as lit paper objects inside the world. Real photographs appear only as evidence: the doctor's portrait and the clinic's published before/after.

Density is low and reassuring: one idea per viewport inside the story, generous section padding outside it, long measures kept to 44–56ch.

**Key Characteristics:**
- An evening palette: deep blue-ink grounds (`white` #0f1426 is the page base), warm-white ink, logo teal lifted for the dark.
- Four scroll-driven illustrated scenes with a live-measured caption band; scenery never runs under the words.
- One cast scale (`--fig`) for every figure in a scene, so mother, child, grandmother and doctor stay in proportion at every screen shape.
- The sky moves from a starlit dusk (arrival) to a warm twilight with a setting sun (leaving); light comes from within the world: windows, lamps, the open door.
- Lit paper objects (bubbles, sticker chart, eyes card, name boards, logo plate) are the only light surfaces, and they glow warm.
- Kites belong to the Trust section and trial lenses to the Results section, and nowhere else.
- Pill-shaped actions: orange Book key, green-outline WhatsApp, underlined Call; an autoplay story player that always yields to the visitor.
- Bricolage Grotesque headlines, Hanken Grotesk text, Anek Telugu for Telugu lines.

## Colors

A deep evening ground with warm-white ink, lifted logo teal for structure, logo orange for hope, a bright WhatsApp green for chat, cream lit paper for objects in the scene, and a lamplit illustration palette for people and places.

### Primary
- **Hope Orange** (`hope`): the logo orange as a mark, never as a text background. It fills the active dot on the journey rail, the left rule of the treatment step happening now, the rule beside a family's quote, the story player's countdown ring, the before/after divider line and the range accent, and the child's ribbons, bag straps and balloon.
- **Book Key Orange** (`hope-action`): the deepened orange that carries white text. The Book key, the story player's play key, the trial lens's tab, today's ring on the week pad, the apple Lea mark and the lettering on the clinic's name board.
- **Book Key Pressed** (`hope-action-hover`): hover on the Book key and the play key.

### Secondary
- **Logo Teal** (`teal`): structure, lifted to read on the dark. Focus rings (3px), the header's scroll thread, career timeline rules, the stool seat, the base stripe and eye mark of the name board.
- **Deep Teal** (`teal-deep`): FAQ plus signs, Lea list marks, visit-row icons.
- **Teal Ink** (`teal-ink`): teal as text: every Telugu line, links such as "Get directions" and "More answers", the open-now status.

### Tertiary
- **Chat Green** (`wa`, `wa-hover`): only on WhatsApp actions. A bright green ring and text at rest; hover fills with the deeper `wa-hover`. The header's round WhatsApp chip sits on a 14% green tint.

### Neutral
- **Evening Base** (`white`, #0f1426): the page ground, the doctor section and the base of every section gradient. The token keeps its historical name `--white`; it is the darkest surface, not a light one.
- **Paper** (`paper`): the visit section and the scrollbar track, one step up from the base.
- **Mist** (`mist`): the footer and the week pad's open days.
- **Tint** (`tint`): the map fallback, a blue-ink step.
- **Steel 100 / 300 / 500**: the phone chip on small screens; hairline rules, FAQ dividers, the rail line and the solid header's bottom edge; scrollbar thumb and stool legs.
- **Ink** (`ink`): all primary text on the evening ground, headings, the 2px rule under the speciality headings.
- **Soft Ink** (`ink-soft`): ledes, captions, secondary copy, rail marks and fill.
- **Faint Ink** (`ink-faint`): footnotes such as "Figures as published by the clinic."
- **Lit Paper** (`card`): the cream surface of every lit object in the world: bubbles, sticker chart, eyes card, the clinic's name board, the logo plate, rail labels and the skip link.
- **Dark Ink / Dark Soft Ink** (`ink-dark`, `ink-dark-soft`): text on lit paper only.
- **On Accent** (`on-accent`): text and icons on orange, green and teal fills.

### Illustration palette
- **People** (unchanged by the evening): mother's skin (`skin`), the child's lighter skin (`skin-child`), the doctor's skin (`skin-doctor`), black-brown hair (`hair`), the mother's magenta saree (`saree`) with a gold border (`gold`) and a teal blouse (`blouse-teal`), the doctor's white coat (`coat-white`) over the same magenta-and-gold saree. The grandmother wears a cream saree (#efe4cf) with a maroon border and blouse (#8a2e3b), grey hair (#b8bcc2) and spectacles. Every woman wears a small magenta bindi and gold earrings.
- **Dusk (muted mood):** sky from #0f1428 through `dusk-sky` to #3d4166, with a scatter of first stars; towers #232a47 with windows lit `window-glow`; metro #2d3556; street buildings #383e5e with trim #58607f; leaves #2c4a45; lit windows #c9934e and the open door #f4cf8a. Ground: a #4a4e68 kerb over a #22263a road.
- **Twilight (sunny mood):** sky from #1c1a3c through #3b2d5c and `twilight-sky` to `twilight-horizon`, with a setting `sun` (core #ffe2a8); towers #3a3560 with windows #ffd27a; metro #46406e; buildings #5b4a68 with trim #e0a25a; leaves #35604d; door #ffe0a0. Ground: a #6a5670 kerb over a #2a2438 road.
- **Rooms:** the consultation and treatment stages are a lamplit interior, a radial glow from #2e2840 through `room-dusk` to #15131f, over a `room-floor` with a #3a3148 edge; a hanging lamp casts a faint `lamplight` pool; a window looks onto the city at night; the wooden desk is #8a6446 / #6c4e38.
- **Street furniture:** the auto-rickshaw is `auto-yellow` over `auto-green` with its headlamp on. The metro train is pale with a deep-teal stripe and warm lit windows.
- **Kite paper (Trust section only):** rose #e0457b / #b02457, marigold #f2b134 / #d9931a, teal #4fb3d9 / #2a8cb0, violet #9a6fd6 / #6f49ad, orange #f08a3e / #c9621f, with a bamboo spine and bow in #2a1d14.
- **Trial lens (Results section only):** a brushed-steel rim from #6f7b88 to #f4f7fa, mini-lens rings `lens-steel` over #6f7b88, dark glass #1b2644 → #121a30.

### Named Rules
**The Evening Rule.** Every section sits on the evening: the base (#0f1426) or a gradient that starts or ends on it. There are no light bands and no light theme. Sections step up through `paper`, `mist` and `tint`, never toward white.

**The Lit Paper Rule.** The only light surfaces are objects that exist in the world and catch the lamplight: bubbles, the sticker chart, the eyes card, name boards, the logo plate, rail labels. They are `card` cream with `ink-dark` text. Light `ink` never sits on `card`, and `ink-dark` never sits on the evening ground.

**The Hope Is Orange Rule.** Orange means hope and the present moment: the Book key, the story player, "now" on the rail and the plan, today on the week, what the lens is showing, the child's joyful things. It never decorates a section, never becomes a background band, and never sets body text. White text sits only on `hope-action`, never on `hope`.

**The Green Means Chat Rule.** WhatsApp green appears only on the WhatsApp action. No other control, status or illustration may borrow it.

**The Dusk To Twilight Rule.** Outdoor scenes use exactly two moods, a starlit dusk for the worried arrival and a warm twilight for the happy exit. Their difference is the story's emotional arc; a new outdoor scene picks one of the two, it does not invent a third.

## Typography

**Display Font:** Bricolage Grotesque Variable (with ui-sans-serif, system-ui)
**Body Font:** Hanken Grotesk Variable (with ui-sans-serif, system-ui)
**Telugu Font:** Anek Telugu Variable (with Noto Sans Telugu)

**Character:** Bricolage's slightly wonky, friendly grotesque gives headlines a hand-made warmth that suits a picture book without going childish. Hanken Grotesk keeps the reading text clear and calm for anxious parents. On the evening ground both are set in warm-white ink with antialiased smoothing.

### Hierarchy
- **Display** (700, clamp(2.2rem → 3.6rem), line-height 1.02): the hero H1 only, measure 18ch. 2.05rem on phones.
- **Headline** (650, clamp(2rem → 3.75rem), 1.02, −0.028em): section and scene H2s, measure 12–18ch, `text-wrap: balance`. On tablets inside the story, clamp(1.8rem → 2.4rem).
- **Title** (650, clamp(1.4rem → 2rem)): H3s such as "For children", the FAQ heading, the phone number in the visit section, the Telugu myth line in Trust.
- **Quote** (Bricolage 550, clamp(1.12rem → 1.3rem), 1.35): testimonials in the story and families section, the doctor's name in the photo caption.
- **Lede** (Hanken 400, clamp(1.12rem → 1.3rem), 1.5): the paragraph under a headline, 44–56ch, in soft ink.
- **Body** (Hanken 400, clamp(1.02rem → 1.125rem), 1.6): all running text, `text-wrap: pretty`.
- **Label** (Hanken 600, 0.9375rem): header call, captions, trust point bodies, week days, the story player's title (650). Bubbles use Hanken 600 at clamp(0.9rem → 1.05rem), 1.35.
- **Button** (Hanken 650, 1.0625rem, line-height 1): Book and WhatsApp.
- **Lens tab** (Bricolage 700, 0.75rem, 0.12em, uppercase): only the engraving on the trial lens's tab ("Before" / "After"). It is part of the instrument, not a label above a heading.

Numbers that people compare or dial (phone, years, figures, hours) use `font-variant-numeric: tabular-nums`.

### Named Rules
**The Telugu Tag Rule.** Every Telugu line is wrapped in an element with `lang="te"`, which switches it to Anek Telugu with letter-spacing 0. It is set in `teal-ink` at weight 600 and sits beside its English meaning in soft ink, never alone. In captions it runs at 1.15em of its line.

**The Plain Heading Rule.** Headings stand on their own. No eyebrows, kickers or small uppercase labels above them; the scene or section context does that job.

## Layout

The page is one column of full-bleed bands. Content sits in a centred container of `min(100% − 2 × gutter, 1240px)`; the header uses 1400px. The gutter is fluid, clamp(1rem → 3rem). Sections outside the story pad clamp(6rem, 14vh, 9rem) top and bottom (4rem / 5rem on phones for the doctor section). Section bodies use asymmetric two-column grids, 5fr : 6fr or 5fr : 7fr (6fr : 5fr for the visit), with a clamp(2.5rem → 5.5rem) gap, collapsing to one column at 900px. Trust points run 3 → 2 → 1 columns; the career timeline runs 6 → 3 → 1; the figures run 4 → 2 at 560px.

**The story stage.** Each scene is a tall section (230vh for the arrival, 260vh otherwise) with a sticky 100svh stage inside that clips its art. Under reduced motion the scene collapses to a single still stage of max(100svh, 640px).

- The caption sits at the top of the stage, from clamp(5.5rem, 14svh, 8.5rem) (5rem on phones), aligned to the container edges. Story captions are a 5fr : 6fr grid: the H2 on the left spanning three rows, text, quote, plan and actions on the right. Below 900px it is one column.
- The opening words have no panel. A scrim, a fade from #121833 (solid to 34%, gone by 56%; top-down to 52% below 900px), holds the hero caption against the sky and fades with it once the scene passes 28%.
- `--band` is the caption's real height, measured live: caption top + caption height + 20px, re-measured by a ResizeObserver on the stage and the caption.
- The art layer runs from `--band` down to `--ground` (12svh, 10svh below 900px). Room scenes stop the art at `--floor` (ground + 7svh, + 5svh below 900px).
- `--fig` is the mother's height and scales the whole cast: min(46svh, 470px, 100svh − band − ground − 2.5rem); min(31svh, 300px, … − 1.5rem) below 900px. The leaving scene keeps headroom for the name board: min(44svh, 450px, … − 5rem), and min(30svh, 260px, … − 4.5rem) on phones. The child is 0.62 × fig, the grandmother 0.94 × fig, the doctor 1 × fig (0.96 at the door). Widths follow the drawings' aspect ratios (200 : 470 adults, 140 : 300 child). Props (desk, chart, eyes card, bubbles) are also sized in fig units.
- In the first scene the cast stands right of the words at 70% and walks to 73%; on screens up to 700px it walks from 6% to 34%.
- The story player floats at the bottom centre, clear of the safe area, above the stage and below the header.

### Named Rules
**The Caption Band Rule.** Words own the top of every stage and scenery owns the band below them. Art never rises above `--band`; if the caption grows, the scene shrinks, not the other way round.

**The One Cast Scale Rule.** Every figure and prop in a scene is sized from the same `--fig`. Never give one character a fixed pixel height.

**The One Book Key Rule.** One committing Book key per view. The header's compact Book key fades out and becomes inert whenever a page Book key is on screen.

**The Motif Fence Rule.** Kites fly only in the Trust section and trial lenses appear only in the Results (families) section. The story scenes stay literal: no kites, lenses or other metaphor enter them, and no other section borrows either motif.

## Elevation & Depth

In the evening, depth comes from light more than shadow. In the scenes, parallax layers (far skyline, mid metro, near street) move at different rates with scroll and lean slightly toward the pointer, and the world is lit from within: windows, the open clinic door, the lamp, the auto's headlamp, the setting sun. Lit paper objects glow with warm lamplight rather than casting shadows, and the cast is rim-lit so the figures separate from the dark. Photographs, the map and the trial lens sink into the ground on deep black shadows. Floating chrome (header, player) is translucent evening glass.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 28px 50px -26px rgb(0 0 0 / 0.7)`): photographs and the map (doctor portrait, map).
- **Lit paper** (`box-shadow: 0 0 40px rgb(255 214 140 / 0.18)`): the sticker chart and eyes card standing in a scene.
- **Bubble glow** (`box-shadow: 0 0 26px rgb(255 214 140 / 0.3)`): speech and thought bubbles.
- **Name board glow** (`box-shadow: 0 0 22px rgb(255 214 140 / 0.45)`; in the street SVG `drop-shadow(0 0 10px rgb(255 214 140 / 0.55))`): the clinic's name boards.
- **Rim light** (`filter: drop-shadow(0 0 1px rgb(255 236 210 / 0.75)) drop-shadow(0 0 22px rgb(255 190 120 / 0.22))`): every cast figure.
- **Book glow** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.2) inset, 0 12px 26px -12px rgb(185 78 20 / 0.65)`; on hover 0 18px 32px -14px at 0.75): the Book key's orange under-glow.
- **Header** (`background: rgb(15 20 38 / 0.94); box-shadow: 0 1px 0 #313b5a, 0 12px 30px -20px rgb(0 0 0 / 0.6)`): the header once the page has scrolled 24px.
- **Player** (`background: rgb(15 20 38 / 0.9); backdrop-filter: blur(8px); box-shadow: 0 0 0 1px rgb(255 255 255 / 0.12), 0 16px 34px -16px rgb(0 0 0 / 0.8)`): the story player.
- **Lens** (`filter: drop-shadow(0 30px 40px rgb(0 0 0 / 0.55)) drop-shadow(0 0 40px rgb(79 179 217 / 0.18))`): the trial lens, with a faint cool halo of glass. Mini lenses: two inset steel rings plus `0 12px 24px -12px rgb(0 0 0 / 0.7)`.
- **Kite glow** (`filter: drop-shadow(0 0 14px rgb(255 200 140 / 0.35))`): the kites that carry the trust points.
- **Sun halo** (`box-shadow: 0 0 60px 30px rgb(255 170 90 / 0.35)`): the setting sun.

### Named Rules
**The Lamplight Rule.** Glows are light, and light is warm: lit paper, name boards, the cast's rim, kites and the sun all glow in amber (rgb 255 190–236 / 90–210). The only exceptions are the Book key's orange under-glow, the before/after divider's orange glow, and the trial lens's faint teal halo. No neon, no coloured glow on controls, no hard offset shadows.

## Shapes

Round and friendly, never sharp. Every action is a full pill (999px), as are the rail's hover labels, the story player and its round key, the header chips and the logo plate's softer 10px. Photographs and the map use 14px corners, as does the eyes card; bubbles 18px; the sticker chart 12px; week days 10px; sticker cells 8px; name boards 6px; the desk plate 4px. The trial lens and mini lenses are true circles; the lens tab is squared on the lens side and rounded 6px at its free end. The illustration is exact geometry: rectangles, circles, ellipses and simple curves with round line caps, no outlines on figures except the doctor's coat seams. Kites are a square sail flown on its corner, with a spine, a bow and a curling tail. Lists and sections are divided by hairline or 2px rules instead of boxes: 2px ink under the specialities headings, 2px teal above career years, 1px steel under list rows and FAQ items.

## Components

### Buttons
Tactile, rounded and unmistakable.
- **Shape:** full pill (999px), minimum height 3.25rem (2.75rem compact).
- **Book key (primary):** `hope-action` fill, white Hanken 650 text, a north-east arrow icon. Hover lifts it 2px, deepens to `hope-action-hover`, grows its orange glow and slides the arrow 3px up-right, all on the ease-out curve over 0.35s. Active presses it 1px down. The label drops "an" below 600px ("Book appointment").
- **WhatsApp (secondary):** transparent fill, 1.5px inset `wa` ring, green text and WhatsApp glyph. Hover fills it `wa-hover` with `on-accent` text.
- **Call link (tertiary):** no box, just the phone icon and the number in `ink`, underlined at 35% of the text colour, full on hover. It hides in the hero actions below 600px so Book and WhatsApp share one row.
- **Focus (all):** 3px lifted-teal outline at 3px offset with 6px corners.

### Site header
Transparent over the first scene, then translucent evening glass with a steel hairline after 24px of scroll (0.4s). The logo, drawn for a light ground, sits on a small lit-paper plate (`card`, 6px 10px padding, 10px corners) at clamp(30px → 40px) high. On the right: a round WhatsApp chip (2.75rem, 14% green tint, filling `wa-hover` on hover), the call link with the number (an icon-only `steel-100` chip below 640px), and the compact Book key, which yields when a page Book key is in view. Below 1400px a 2px teal thread along the bottom edge fills with page progress.

### Journey rail
A vertical chapter rail fixed at the left edge, shown only from 1400px where the side margin can hold it. 16px circular marks on a 2px `steel-300` line whose soft-ink fill grows with scroll. Hollow (evening base) means ahead, filled means seen, and the current chapter scales to 1.25 with an orange centre dot and turns `ink`. Chapter names appear as lit-paper pills with dark ink on hover or focus.

### Story player
The story plays itself, and the visitor always wins. A pill of evening glass fixed at the bottom centre holds a round `hope-action` key (2.9rem) and two lines of text. A `hope` ring (2.5 stroke, round caps) around the key counts down 3.5s ("Their story starts in 3…"), then shows progress while the page glides at one screen height per 3.8s. The key toggles pause, play and replay; its glyph follows the state. Any wheel, touch, scroll key, or pointer press outside the player pauses it at once. It counts down only when the visit starts at the top of the page, slides away 25% of a screen past the story, drops its hint line below 600px, and does not exist under reduced motion. Text changes are announced politely.

### Story scene stage
A sticky full-viewport stage: a dusk or twilight sky (stars that twinkle over 4s at dusk; sun and birds at twilight; faint drifting clouds), three parallax art layers, a ground strip with a dashed road line, the cast, props and the caption. Room scenes swap the sky and street for a lamplit interior with a flickering hanging lamp (3.2s). The hero caption holds the H1, the Telugu welcome line, the lede and the three actions over the scrim; it fades up and away once the scene passes 28%, and the story caption fades in behind it.

### Cast figures
Inline SVG people who share one face system with four moods (worried, calm, smile, joy) and a set of arm poses. Mother: hold, shoulder, heart, wave. Child: hold, rest, tablet, balloon, with a school bag, eye patch and glasses as options and a `squint` value that slides the left pupil inward. Doctor: examine (with a glowing penlight), point, wave, rest. Every figure carries the rim light. Walking bobs the body and swings the legs on a 0.55s cycle. Faces soften with scroll progress. Figures are decorative (`aria-hidden`); the caption carries the meaning.

### Speech and thought bubbles
Lit paper: `card` cream, dark ink, 18px corners, Hanken 600, a warm bubble glow. Thought bubbles trail two small circles; speech bubbles have a small triangular tail. They pop in at set scroll points (fade, rise 10px, scale from 0.92) and are `aria-hidden`: they illustrate, the caption tells.

### Name boards
The clinic's sign is a lit board: cream with a teal base stripe, the name in Bricolage 700 in `hope-action` beside the teal eye mark, glowing warm. On the arrival street it is part of the building; in the exit scene it hangs on two #e0a25a posts above the family, placed by measurement against the building.

### Sticker chart
A lit-paper card titled "My sessions" with a 4 × 4 grid of twelve rounded cream cells (#eee8dc, #d8cfbd ring). As treatment progresses each cell turns pale gold with a gold ring and a gold star scales in. Hidden in the treatment scene on tablets and phones.

### Eyes card
A small lit-paper card showing two drawn eyes; the right-hand pupil slides from turned-in to centred as the scene progresses, and the caption changes from "Left eye turns in" to "Both eyes straight".

### Treatment plan
An ordered list of three steps with a 1px steel left rule. The step matching the scroll position brightens to `ink` and its rule turns hope orange.

### Kite sky and trust points (Trust section only)
The section is a Sankranti evening: a gradient from the base through #1a1c3e and #2c2350 to #3a2a55, with fourteen kites at every depth behind the words (18–52px wide, fainter when farther, 0.18–0.5 opacity), each drifting 14px / −18px and turning 8° on a 9s ease-in-out loop. Each trust point hangs from its own 52px kite on a 1.5px manja string (rgb(255 236 220 / 0.45), 1.4rem), swaying ±5° over 5s, alternating direction, and lifts 60px into place when it comes into view. A Bricolage title and a short soft-ink body sit below each kite. No cards, no icons.

### FAQ
Native `details` rows split by 1px `steel-300` rules. Summary in Hanken 650 at the lede size with a deep-teal "+" that rotates to "×" when open.

### Trial lens compare (Results section only)
The before/after is seen through a trial lens, as in the eye test itself. A circular photograph up to 440px (min(78vw, 360px) below 900px) inside a brushed-steel conic rim (16px, 12px on small screens). The corrected photo is clipped in from the right by a range input (accent `hope`, moving right brings "after" across), and a 3px `hope` divider with an orange glow marks the edge. A white highlight on the glass follows the pointer and a soft vignette darkens the edge. An orange tab on an arm at 40° reads "Before" or "After" in the lens-tab engraving. The section glows faintly blue behind the lens (radial #1d2a4a at 25% 45% into the base). Photographs are the clinic's own published images.

### Figures in mini lenses (Results section only)
Each clinic figure sits in a small dark-glass lens (80–104px) with two inset steel rings, the value in Bricolage 700 `ink` with tabular figures, the label below in soft ink, and a faint-ink source note under the row. Families' quotes follow with a 1px `hope` left rule.

### Week pad
The week as seven small `mist` tiles with a 1px `steel-300` inset ring, Monday first: day in bold, hours below in tabular figures. Sunday is a dashed, transparent "Closed" tile; today is ringed 2px in `hope-action`. A live status line above reads the clinic's own time zone.

## Do's and Don'ts

### Do:
- **Do** tell the clinic's story literally, with the illustrated family, the doctor and real Hyderabad places (KPHB street, metro, auto-rickshaw, Charminar), in the evening.
- **Do** light the world from within: lit windows, the open clinic door, the lamp, the headlamp, the setting sun, and a warm rim on every figure.
- **Do** put every light surface on `card` (#fbf8f2) with `ink-dark` text, and every other surface on the evening grounds with `ink` text.
- **Do** measure `--band` from the rendered caption and keep all scenery between `--band` and `--ground`.
- **Do** size every figure and scene prop from `--fig`.
- **Do** keep one Book key per view in `hope-action` (#b94e14) with white text.
- **Do** let the story player yield instantly to any scroll, swipe, key or tap, and remove it under reduced motion.
- **Do** wrap every Telugu line in `lang="te"` and pair it with its English meaning.
- **Do** keep content visible without JavaScript or motion: reveals only hide under `html.motion-ok`, and reduced motion freezes each scene at a chosen still frame and stops every loop (stars, clouds, birds, lamp, kites).
- **Do** use real photographs only as evidence (the doctor's portrait, the clinic's published before/after), and draw everything else.

### Don't:
- **Don't** add light sections, white bands or a light theme. The page is an evening from top to bottom.
- **Don't** put kites, kite strings or a festival sky anywhere but the Trust section, and never in the story scenes.
- **Don't** put trial lenses, lens rims or optical-instrument motifs anywhere but the Results (families) section, and never in the story scenes.
- **Don't** set light `ink` on `card`, or `ink-dark` on the evening ground.
- **Don't** put eyebrows, kickers or small uppercase labels above headings.
- **Don't** use orange for anything but hope, the present moment and the Book key, and never set white text on `hope` (#e8792f).
- **Don't** use WhatsApp green outside the WhatsApp action.
- **Don't** let scenery, figures or props run under a caption.
- **Don't** use hard offset shadows, neon, or cool glows; glows are warm lamplight, except the Book key's orange and the lens's faint teal halo.
- **Don't** autoplay the story against the visitor or under reduced motion.
- **Don't** use stock or generated photography of patients or clinics.
