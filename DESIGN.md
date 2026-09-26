---
name: Dr Aloka's Eye Care
description: One Hyderabad family's visit, told in flat daylight illustration, for a paediatric and squint eye practice in Kukatpally.
colors:
  hope: "#e8792f"
  hope-action: "#b94e14"
  hope-action-hover: "#9e410f"
  teal: "#2a8cb0"
  teal-deep: "#1d6e8c"
  teal-ink: "#16597a"
  wa: "#128c4a"
  wa-hover: "#0e7a3f"
  ink: "#1b2a3a"
  ink-soft: "#4a5a6b"
  white: "#ffffff"
  paper: "#f3f6f8"
  mist: "#e8eef2"
  tint: "#e6f1f5"
  steel-100: "#eef1f4"
  steel-300: "#c9d1d9"
  steel-500: "#8e9aa6"
  skin: "#b97a56"
  skin-child: "#c98b63"
  skin-doctor: "#b07150"
  hair: "#1f1614"
  saree: "#c2335a"
  blouse-teal: "#1f7a8c"
  gold: "#e8a33a"
  coat-white: "#fbfcfd"
  room-wall: "#f7f3ee"
  room-floor: "#e9dfd2"
  sky-muted: "#d5dde5"
  sky-sunny: "#9fd3ee"
  sunlight: "#ffe7a3"
  auto-yellow: "#f2c230"
  auto-green: "#1f6b4a"
typography:
  display:
    fontFamily: "'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.3rem + 3.6vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 1
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
  telugu:
    fontFamily: "'Anek Telugu Variable', 'Noto Sans Telugu', sans-serif"
    fontSize: "1.15em"
    fontWeight: 600
    letterSpacing: "0"
rounded:
  tag: "4px"
  cell: "8px"
  pad: "10px"
  card: "14px"
  bubble: "18px"
  panel: "20px"
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
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem 0.85rem 1.35rem"
    height: "3.25rem"
  button-book-hover:
    backgroundColor: "{colors.hope-action-hover}"
    textColor: "{colors.white}"
  button-book-compact:
    backgroundColor: "{colors.hope-action}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.1rem 0.6rem 1.15rem"
    height: "2.75rem"
  button-whatsapp:
    backgroundColor: "{colors.white}"
    textColor: "{colors.wa}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.25rem"
    height: "3.25rem"
  button-whatsapp-hover:
    backgroundColor: "{colors.wa}"
    textColor: "{colors.white}"
  whatsapp-round:
    backgroundColor: "#e7f5ec"
    textColor: "{colors.wa}"
    rounded: "{rounded.pill}"
    size: "2.75rem"
  link-call:
    textColor: "{colors.ink}"
    padding: "0.5rem 0.25rem"
    height: "3.25rem"
  caption-hero:
    backgroundColor: "rgb(226 232 237 / 0.82)"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "1rem 1.25rem 1.25rem"
  bubble:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bubble}"
    padding: "0.7rem 1rem"
  sticker-chart:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "12px"
    padding: "1rem 1.1rem 1.1rem"
  sticker-cell:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.cell}"
  sticker-cell-done:
    backgroundColor: "#fff5e0"
    rounded: "{rounded.cell}"
  eyes-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.card}"
    padding: "0.75rem 0.9rem 0.6rem"
  rail-label:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.7rem"
  compare-tag-after:
    backgroundColor: "{colors.hope-action}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.7rem"
  week-day:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pad}"
    padding: "0.6rem 0.2rem 0.55rem"
---

# Design System: Dr Aloka's Eye Care

## Overview

**Creative North Star: "One Family's Visit"**

The site tells one literal story: a worried mother and her schoolgirl daughter arrive at a clinic on a KPHB street, Dr. Aloka examines the child, therapy fills a sticker chart and the turned eye straightens, and the family (grandmother included) walks out into sunshine. Every visual decision serves that story. The world is flat, warm vector illustration of Hyderabad in daylight: apartment towers and a small Charminar on the horizon, the elevated metro with a train crossing, the clinic's building with its sign, a neem tree, an auto-rickshaw. The characters are Indian: mother in a saree, a girl in a teal school pinafore with orange ribbons, Dr. Aloka in a white coat over a saree.

The story runs as four pinned full-screen scenes, each a scroll length whose progress plays the action (walking, faces softening, the doctor crossing the room, stickers landing). After the story the page settles into calm, light, editorial sections for the doctor, trust and FAQ, families' words and the visit. The palette is clinical white and pale blue-greys carrying logo teal for structure and logo orange for hope. Nothing is dark, nothing is abstract, and the illustration is honest geometry, never stock photography. Real photographs appear only as evidence: the doctor's portrait and the clinic's published before/after.

Density is low and reassuring: one idea per viewport inside the story, generous section padding outside it, long measures kept to 44–56ch.

**Key Characteristics:**
- Four scroll-driven illustrated scenes with a live-measured caption band; scenery never runs under the words.
- One cast scale (`--fig`) for every figure in a scene, so mother, child, grandmother and doctor stay in proportion at every screen shape.
- Scenery warms from a muted grey-blue morning (arrival) to a sunny noon (leaving).
- Pill-shaped actions: orange Book key, green-outline WhatsApp, underlined Call.
- Light surfaces only; depth comes from soft, ink-tinted downward shadows on white objects.
- Bricolage Grotesque headlines, Hanken Grotesk text, Anek Telugu for Telugu lines.

## Colors

A white and pale-steel clinic ground, ink text, logo teal for structure, logo orange for hope, WhatsApp green for chat, and a separate warm illustration palette for people and places.

### Primary
- **Hope Orange** (`hope`): the logo orange as a mark, never as a text background. It fills the active dot on the journey rail, the left rule of the treatment step happening now, the rule beside a family's quote, and the child's ribbons, bag straps and balloon.
- **Book Key Orange** (`hope-action`): the deepened orange that carries white text. The Book key, the "After" tag on the before/after photo, today's ring on the week pad, the range accent, the apple Lea mark.
- **Book Key Pressed** (`hope-action-hover`): Book key hover only.

### Secondary
- **Logo Teal** (`teal`): structure. Focus rings (3px), the header's scroll thread, career timeline rules, the stool seat, the clinic sign's eye mark.
- **Deep Teal** (`teal-deep`): rules above trust points, FAQ plus signs, Lea list marks, visit-row icons, the doctor's stethoscope, text selection.
- **Teal Ink** (`teal-ink`): teal as text: every Telugu line, links such as "Get directions" and "More answers".

### Tertiary
- **Chat Green** (`wa`, `wa-hover`): only on WhatsApp actions. Outline and text at rest, fill on hover. The header's round WhatsApp button sits on a pale green tint (#e7f5ec).

### Neutral
- **Ink** (`ink`): all primary text, the rail's hover labels, the desk name plate, tablet and eye outlines in the illustration.
- **Soft Ink** (`ink-soft`): ledes, captions, secondary copy, rail marks, birds.
- **White** (`white`): page ground, doctor and families sections, bubbles, chart, cards.
- **Paper** (`paper`): the visit section, unfilled sticker cells, scrollbar track.
- **Tint** (`tint`): the trust section and the map fallback, a pale teal-blue.
- **Mist** (`mist`): the footer.
- **Steel 100 / 300 / 500**: the phone call chip, hairline rules and borders, scrollbar thumb and stool legs.

### Illustration palette
- **People:** mother's skin (`skin`), the child's lighter skin (`skin-child`), the doctor's skin (`skin-doctor`), black-brown hair (`hair`), the mother's magenta saree (`saree`) with a gold border (`gold`) and a teal blouse (`blouse-teal`), the doctor's white coat (`coat-white`) over the same magenta-and-gold saree. The grandmother wears a cream saree (#efe4cf) with a maroon border and blouse (#8a2e3b), grey hair (#b8bcc2) and spectacles. Every woman wears a small magenta bindi and gold earrings.
- **Rooms:** the consultation and treatment stages sit on a warm wall (`room-wall`) over a sand floor (`room-floor`, top edge #d8cbbb), with a wooden desk (#c89b72 / #b3865e).
- **Scenery moods.** Muted: towers #c9d2dc, metro #aebac6, street buildings #e7e2da, trim #9aa6b2, leaves #8fa89a, sky #d5dde5 → #eef1f3. Sunny: towers #cfe3ee, metro #9fc7da, buildings #f6ead8, trim #e0a25a, leaves #5fae7b, sky #9fd3ee → #fff4e2 with a sun in `sunlight`.
- **Street furniture:** the auto-rickshaw is `auto-yellow` over `auto-green`. The metro train is near-white with a deep-teal stripe.

### Named Rules
**The Hope Is Orange Rule.** Orange means hope and the present moment: the Book key, "now" on the rail and the plan, today on the week, "After" on the photo, the child's joyful things. It never decorates a section, never becomes a background band, and never sets body text. White text sits only on `hope-action`, never on `hope`.

**The Green Means Chat Rule.** WhatsApp green appears only on the WhatsApp action. No other control, status or illustration may borrow it.

**The Warming Sky Rule.** Outdoor scenes use exactly two moods, muted for the worried arrival and sunny for the happy exit. Their difference is the story's emotional arc; a new outdoor scene picks one of the two, it does not invent a third.

## Typography

**Display Font:** Bricolage Grotesque Variable (with ui-sans-serif, system-ui)
**Body Font:** Hanken Grotesk Variable (with ui-sans-serif, system-ui)
**Telugu Font:** Anek Telugu Variable (with Noto Sans Telugu)

**Character:** Bricolage's slightly wonky, friendly grotesque gives headlines a hand-made warmth that suits a picture book without going childish. Hanken Grotesk keeps the reading text clear and calm for anxious parents.

### Hierarchy
- **Display** (700, clamp(2.3rem → 4.4rem), line-height 1): the hero H1 only. 2.05rem on phones.
- **Headline** (650, clamp(2rem → 3.75rem), 1.02, −0.028em): section and scene H2s, measure 12–18ch, `text-wrap: balance`. On tablets inside the story, clamp(1.8rem → 2.4rem).
- **Title** (650, clamp(1.4rem → 2rem)): H3s such as "For children", the FAQ heading, the phone number in the visit section.
- **Quote** (Bricolage 550, clamp(1.12rem → 1.3rem), 1.35): testimonials in the story and families section, the doctor's name in the photo caption.
- **Lede** (Hanken 400, clamp(1.12rem → 1.3rem), 1.5): the paragraph under a headline, 44–56ch, in soft ink.
- **Body** (Hanken 400, clamp(1.02rem → 1.125rem), 1.6): all running text, `text-wrap: pretty`.
- **Label** (Hanken 600, 0.9375rem): header call, captions, trust point bodies, week days. Bubbles use Hanken 600 at clamp(0.9rem → 1.05rem), 1.35.
- **Button** (Hanken 650, 1.0625rem, line-height 1): Book and WhatsApp.

Numbers that people compare or dial (phone, years, figures, hours) use `font-variant-numeric: tabular-nums`.

### Named Rules
**The Telugu Tag Rule.** Every Telugu line is wrapped in an element with `lang="te"`, which switches it to Anek Telugu with letter-spacing 0. It is set in `teal-ink` at weight 600 and sits beside its English meaning in soft ink, never alone. In captions it runs at 1.15em of its line.

**The Plain Heading Rule.** Headings stand on their own. No eyebrows, kickers or small uppercase labels above them; the scene or section context does that job.

## Layout

The page is one column of full-bleed bands. Content sits in a centred container of `min(100% − 2 × gutter, 1240px)`; the header uses 1400px. The gutter is fluid, clamp(1rem → 3rem). Sections outside the story pad clamp(6rem, 14vh, 9rem) top and bottom (4rem / 5rem on phones for the doctor section). Section bodies use asymmetric two-column grids, 5fr : 6fr or 5fr : 7fr, with a clamp(2.5rem → 5.5rem) gap, collapsing to one column at 900px. Trust points run 3 → 2 → 1 columns; the career timeline runs 6 → 3 → 1.

**The story stage.** Each scene is a tall section (230vh for the arrival, 260vh otherwise) with a sticky 100svh stage inside that clips its art. Under reduced motion the scene collapses to a single still stage of max(100svh, 640px).

- The caption sits at the top of the stage, from clamp(5.5rem, 14svh, 8.5rem) (5rem on phones), aligned to the container edges. Story captions are a 5fr : 6fr grid: the H2 on the left spanning three rows, text, quote, plan and actions on the right. Below 900px it is one column.
- `--band` is the caption's real height, measured live: caption top + caption height + 20px, re-measured by a ResizeObserver on the stage and the caption.
- The art layer runs from `--band` down to `--ground` (12svh, 10svh below 900px). Room scenes stop the art at `--floor` (ground + 7svh, + 5svh below 900px).
- `--fig` is the mother's height and scales the whole cast: min(46svh, 470px, 100svh − band − ground − 2.5rem); min(36svh, 330px, … − 1.5rem) below 900px; 30svh / 260px in the leaving scene on phones. The child is 0.62 × fig, the grandmother 0.94 × fig, the doctor 1 × fig (0.96 at the door). Widths follow the drawings' aspect ratios (200 : 470 adults, 140 : 300 child). Props (desk, chart, eyes card, bubbles) are also sized in fig units.
- In the first scene the cast starts just right of the hero panel (`--hero-right`) and walks about 9vw; on screens up to 700px it walks from 6% to 34%.

### Named Rules
**The Caption Band Rule.** Words own the top of every stage and scenery owns the band below them. Art never rises above `--band`; if the caption grows, the scene shrinks, not the other way round.

**The One Cast Scale Rule.** Every figure and prop in a scene is sized from the same `--fig`. Never give one character a fixed pixel height.

**The One Book Key Rule.** One committing Book key per view. The header's compact Book key fades out and becomes inert whenever a page Book key is on screen.

## Elevation & Depth

Surfaces are flat and light. Depth has two sources. In the scenes, parallax layers (far skyline, mid metro, near street) move at different rates with scroll and lean slightly toward the mouse pointer. On the page, white objects float on soft, downward, ink-tinted shadows with negative spread, so they read as paper resting on the scene rather than as raised UI.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 28px 50px -26px rgb(27 42 58 / 0.35)`): photographs and the map (doctor portrait, before/after frame, map).
- **Prop** (`box-shadow: 0 16px 30px -18px rgb(27 42 58 / 0.4)`, 0.45 on the eyes card): the sticker chart and eyes card standing in a scene.
- **Bubble** (`box-shadow: 0 12px 26px -14px rgb(27 42 58 / 0.45)`): speech and thought bubbles.
- **Book glow** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.2) inset, 0 12px 26px -12px rgb(185 78 20 / 0.65)`; on hover 0 18px 32px -14px at 0.75): the Book key's orange under-glow.
- **Header** (`box-shadow: 0 1px 0 #c9d1d9, 0 12px 30px -24px rgb(27 42 58 / 0.4)`): the header once the page has scrolled 24px and it turns solid white.
- **Week pad** (`box-shadow: 0 4px 12px -8px rgb(27 42 58 / 0.35)`): each open day on the week pad.

### Named Rules
**The Soft Lift Rule.** Shadows are always soft, downward and tinted with ink or Book orange. No hard offset shadows, no glows on anything except the Book key.

## Shapes

Round and friendly, never sharp. Every action is a full pill (999px), as are the rail's hover labels, the photo tags, the scroll cue and the header chips. Photographs, the map and the eyes card use 14px corners; bubbles 18px; the hero caption panel 20px; the sticker chart 12px; week days 10px; sticker cells 8px; the desk plate 4px. The illustration is exact geometry: rectangles, circles, ellipses and simple curves with round line caps, no outlines on figures except the doctor's coat seams. Lists and sections are divided by hairline or 2px rules instead of boxes: 2px ink under the specialities headings, 2px teal above career years and trust points, 1px steel under list rows and FAQ items.

## Components

### Buttons
Tactile, rounded and unmistakable.
- **Shape:** full pill (999px), minimum height 3.25rem (2.75rem compact).
- **Book key (primary):** `hope-action` fill, white Hanken 650 text, a north-east arrow icon. Hover lifts it 2px, deepens to `hope-action-hover`, grows its orange glow and slides the arrow 3px up-right, all on the ease-out curve over 0.35s. Active presses it 1px down. The label drops "an" below 600px ("Book appointment").
- **WhatsApp (secondary):** white fill, 1.5px inset `wa` ring, green text and WhatsApp glyph. Hover fills it green with white text.
- **Call link (tertiary):** no box, just the phone icon and the number, underlined at 35% opacity that goes to full on hover. It hides in the hero actions below 600px so Book and WhatsApp share one row.
- **Focus (all):** 3px teal outline at 3px offset with 6px corners.

### Site header
Transparent over the first scene, then solid white with a hairline and soft shadow after 24px of scroll (0.4s). The logo sits at clamp(30px → 40px) high. On the right: a round WhatsApp chip (2.75rem, pale green), the call link with the number (an icon-only steel-100 chip below 640px), and the compact Book key, which yields when a page Book key is in view. Below 1400px a 2px teal thread along the bottom edge fills with page progress.

### Journey rail
A vertical chapter rail fixed at the left edge, shown only from 1400px where the side margin can hold it. Seven 16px circular marks on a 2px steel line whose soft-ink fill grows with scroll. Hollow means ahead, filled means seen, and the current chapter scales to 1.25 with an orange centre dot. Chapter names appear as ink pills on hover or focus.

### Story scene stage
A sticky full-viewport stage: sky gradient with drifting clouds (and sun and birds when sunny), three parallax art layers, a ground strip with a dashed road line, the cast, props and the caption. The hero caption is a translucent pale panel (rgb(226 232 237 / 0.82), 20px) holding the H1, the Telugu welcome line, the lede and the three actions. It fades up and away once the scene passes 28%, and the story caption fades in behind it.

### Cast figures
Inline SVG people who share one face system with four moods (worried, calm, smile, joy) and a set of arm poses. Mother: hold, shoulder, heart, wave. Child: hold, rest, tablet, balloon, with a school bag, eye patch and glasses as options and a `squint` value that slides the left pupil inward. Doctor: examine (with a glowing penlight), point, wave, rest. Walking bobs the body and swings the legs on a 0.55s cycle. Faces soften with scroll progress. Figures are decorative (`aria-hidden`); the caption carries the meaning.

### Speech and thought bubbles
White, 18px corners, Hanken 600, soft bubble shadow. Thought bubbles trail two small circles; speech bubbles have a small triangular tail. They pop in at set scroll points (fade, rise 10px, scale from 0.92) and are `aria-hidden`: they illustrate, the caption tells.

### Sticker chart
A white card titled "My sessions" with a 4 × 4 grid of twelve rounded cells. As treatment progresses each cell turns pale gold with a gold ring and a gold star scales in. Hidden on tablets and phones.

### Eyes card
A small white figure card showing two drawn eyes; the right-hand pupil slides from turned-in to centred as the scene progresses, and the caption changes from "Left eye turns in" to "Both eyes straight".

### Treatment plan
An ordered list of three steps with a 1px steel left rule. The step matching the scroll position darkens to ink and its rule turns hope orange.

### Before/after compare
A square photograph frame (14px, lift shadow) with the corrected photo clipped in from the right by a range input, a white 3px divider, a white "Before" pill and an orange "After" pill. Photographs are the clinic's own published images.

### Trust points
Three-column list items, each under a 2px deep-teal rule: a Bricolage title and a short soft-ink body. No cards, no icons.

### FAQ
Native `details` rows split by 1px ink-at-18% rules. Summary in Hanken 650 at the lede size with a deep-teal "+" that rotates to "×" when open.

### Week pad
The week as seven small white tiles, Monday first: day in bold, hours below in tabular figures. Sunday is a dashed, transparent "Closed" tile; today is ringed 2px in `hope-action`. A live status line above reads the clinic's own time zone.

## Do's and Don'ts

### Do:
- **Do** tell the clinic's story literally, with the illustrated family, the doctor and real Hyderabad places (KPHB street, metro, auto-rickshaw, Charminar).
- **Do** measure `--band` from the rendered caption and keep all scenery between `--band` and `--ground`.
- **Do** size every figure and scene prop from `--fig`.
- **Do** keep one Book key per view in `hope-action` (#b94e14) with white text.
- **Do** wrap every Telugu line in `lang="te"` and pair it with its English meaning.
- **Do** keep content visible without JavaScript or motion: reveals only hide under `html.motion-ok`, and reduced motion freezes each scene at a chosen still frame.
- **Do** use real photographs only as evidence (the doctor's portrait, the clinic's published before/after), and draw everything else.

### Don't:
- **Don't** bring back kites, kite strings, a festival sky or any other abstract metaphor world.
- **Don't** use trial lenses, trial frames, lens rings or optical-instrument motifs as decoration.
- **Don't** add dark sections or a dark theme. Ink appears only in small pills, the desk plate and line work.
- **Don't** put eyebrows, kickers or small uppercase labels above headings.
- **Don't** use orange for anything but hope, the present moment and the Book key, and never set white text on `hope` (#e8792f).
- **Don't** use WhatsApp green outside the WhatsApp action.
- **Don't** let scenery, figures or props run under a caption.
- **Don't** use hard offset shadows or glows other than the Book key's.
- **Don't** use stock or generated photography of patients or clinics.
