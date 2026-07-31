---
name: slops-brand-mark-forge
description: End-to-end brand mark creation for a SLOPS product — interview the founder in plain English, generate concept directions that actually sell the product, trace the chosen mark to measured fidelity with Python, then build the full system (monochrome, micro-marks, layered OS icon, export masters). Use when Justin says "make a logo", "the favicon looks bad", "I want a new mark", "polish this wordmark", "this doesn't look like us", or hands over a raster/AI-generated logo that needs to become a production vector. Produces Figma artwork plus an approval board; never exports over production assets without an explicit gate.
status: active
skill_type: simple
layer: 0
default_agent: Claude
trigger: none
version: 1.0.0
upstream: none
owner: Justin
---

# Slops Brand Mark Forge

## Purpose

Turn a plain-English brand instinct into a production-grade mark and its full export system.

This exists because the previous Omen identity failed a test nobody had written down: **the shield
did not read as football.** It was a handsome crest with a lace-spear inside it, and it sold
"esports org" more than "fantasy football decision tool". The replacement — an aged-brass letter
**O** whose negative space is a literal American football — sells the product in one glance and
carries the product's initial for free.

That is the whole doctrine. Everything below is machinery for reaching it repeatably.

## When To Use

- Any new or replacement logo, symbol, wordmark, lockup, favicon, or app icon.
- A raster or AI-generated mark that must become a clean, editable, exportable vector.
- "The favicon looks bad at small sizes" / "this doesn't feel premium" / "polish the wordmark".
- Building the variant + export system around an already-approved mark.

## When Not To Use

- UI screen design or component work — that is `slops-ui-ux-audit` and the design-system specs.
- Marketing imagery, OG cards, promo renders — that is `slops-image-prompt`.
- Copy or naming — that is `slops-ux-copy`.
- Swapping production assets in the repo — that is a separate, gated build-loop item.

---

## The Mindset (load this before drawing anything)

A mark has one job: **make the product legible in one glance.** Judge every direction against
these, in order.

1. **Does it sell the product?** A stranger sees it for 300ms. Do they learn what this is?
   Abstract-clever loses to literal-confident almost every time at this stage of a company.
2. **Does it carry the name?** A mark that doubles as the product's initial is free equity. The
   Omen O is worth more than any bespoke glyph precisely because it is also a letter.
3. **Does it survive 16px?** Not "does the hero look good". The favicon is the mark most people
   see most often. Design it as its own cut, not as a shrunken hero.
4. **Does it work in one ink?** If the silhouette dies without gradient, texture, or lighting,
   the mark is not finished.
5. **Is it ownable?** Would a competitor's logo also fit this shape? If yes, keep going.

Anti-patterns that keep reappearing and should be named out loud:

- **Decoration mistaken for meaning.** Sunbursts, halos, orbital rings and starfields read as
  "generic mystical" and add nothing a stranger can name.
- **Two ideas fighting.** A mark that is a shield AND a bird AND a football is none of them.
- **Reproducing the reference's flaws.** A raster reference carries lighting, bevels, texture and
  skew. Trace the *silhouette*; the rest is rendering.
- **Solving the favicon by damaging the primary.** Never thin the hero to rescue 16px. Cut a
  dedicated micro-mark instead.

### Constrain intent, not form

**Do not let an approved contract ban a shape before the identity exists.**

Omen's mobile visual brief was approved months early and contained the clause *"must not use …
literal footballs."* The intent was sound — keep novelty sports decoration out of decision
screens. But it was written as a prohibition on **form**, and it ended up banning the winning
answer: a letter O whose negative space is a literal football. Under the native read gate, agents
were obliged to refuse the brand's own mark. The artwork was never the blocker; the doctrine was.

When writing or reviewing a spec that touches visual identity:

- Ban **behaviours and intents** ("no novelty sports decoration in product surfaces", "no
  team-colour repainting"), never **specific shapes**.
- Scope every visual prohibition to a **surface**. Product chrome and brand identity are different
  jurisdictions; a rule for one must not silently govern the other.
- Leave identity deliberately **under-specified** until it is being designed. Vision on the app
  and vision on the mark narrow together — a rule written at wide aperture will be wrong at
  narrow aperture.
- If a spec blocks work that is obviously right, **that is a spec bug**. Say so, propose the
  amendment, get it approved, and record why. Do not quietly route around it, and do not
  reluctantly comply with a rule that has outlived its reasoning.

---

## Phase 0 — Interview

**Do not open a drawing tool until this is answered.** Ask in plain English; keep it to a handful
of questions and offer a recommendation with each so the founder can react rather than originate.

Ask:

1. **What must someone understand in one glance?** (the product, the category, the attitude)
2. **Where does this live first?** Browser tab · iOS home screen · nav bar · app store · press.
   The first surface sets the constraints.
3. **What is the smallest size it must survive?** This decides how much detail the mark can hold.
4. **What is off the table?** Retired directions, retired colours, competitor territory.
5. **Is there a reference?** A raster, a screenshot, a competitor, a mood. If yes, it becomes the
   locked source — see Phase 2.
6. **Who approves, and what does approval mean?** Locked geometry, or still exploring?

Then **state the brief back in one paragraph and get it confirmed** before generating. Ambiguity
resolved here costs one message; resolved after tracing it costs a day.

Record the answers. They become the approval board's first panel.

---

## Phase 1 — Concept

Generate **3–4 directions, never more.** More options do not help a founder decide; they
diffuse the signal. For each direction give a name, the one-sentence idea, and — critically —
show it **at true favicon size alongside the hero**. Most concepts die at 32px and it is cheaper
to learn that in round one.

Use `mcp__visualize__show_widget` for fast SVG iteration; it is far faster than round-tripping to
Figma while the direction is still moving. Move to Figma only once a direction is chosen.

State a recommendation and the reason. Do not present a neutral menu.

If the founder supplies a reference they like, skip straight to Phase 2 — do not generate
alternatives they did not ask for.

---

## Phase 2 — Trace to measured fidelity

This is the part that makes the output production-grade rather than "close enough". **Never
eyeball a proportion you can measure.**

### 2.1 Establish the locked source

One artifact is canonical — usually the approved raster. Label it `LOCKED SOURCE — DO NOT EDIT`
and never modify it. Everything is judged against it.

### 2.2 Measure it in Python

Screenshot via the Figma MCP, download with `curl`, analyse with PIL. Build an ink mask, then:

- **Connected components** separate the outer form from interior detail. This is how you get a
  true count of interior elements — it is what proved the Omen reference had **four** lace bars
  when the written brief said five.
- **Row/column scans** give the width profile at every height: outer silhouette, interior
  negative space, ring thickness, apex gaps.
- **Normalise everything to the outer form.** Absolute pixels are meaningless across sizes.
  Record every measurement as a ratio: `interior/outerW`, `barThickness/outerH`, `pitch/outerH`.

### 2.3 Fit curves, do not guess them

Fit one cubic per quarter to the traced edge and grid-search the control-point parameters against
the measured profile. Two shapes need different models:

- **Rounded apex** (a letter O, an oval): horizontal tangent at the apex, vertical at the flank.
- **Pointed apex** (a football, a vesica, a leaf): the tangent at the tip is *not* horizontal —
  parameterise the tip control point's offset separately or the fit will not converge.

Report the RMS. On Omen the outer O fitted to **0.82px** and the football to **1.21px** on a
378px-wide reference. If RMS is worse than ~0.5% of the reference width, the model is wrong, not
the source.

### 2.4 Verify by registered diff

Scale the source so its outer bounding box matches the vector's exactly, overlay, and compute
brass-mask **IoU** plus a per-row edge divergence table. Anything above ~0.95 IoU with the
residual confined to a 1–3px anti-aliasing rim is a good trace. A thick or one-sided residual
band means a real geometry error.

### 2.5 Symmetrise deliberately

A rendered reference is almost never symmetric — lighting and perspective skew it. **A logo
should be symmetric.** Build the vector symmetric, measure the divergence, and record it as a
deliberate choice in the notes. Do not import the reference's skew to chase a better IoU.

---

## Phase 3 — Build the system

### 3.1 Ratios are the source of truth, not numbers

Store every relationship as a fraction of the outer form and re-derive at every size. **This is
the single highest-value rule in this document.** On Omen, a symbol placed into four lockups kept
its hardcoded stroke weights while its geometry shrank — the laces ended up **111% too thick** on
the monochrome tiles and fused into a solid blob on the nav-size lockup.

- In Figma use **`node.rescale(s)`**, never `resize()`. `rescale` scales stroke weights, corner
  radii and effects; `resize` does not.
- After any scaling, assert `strokeWeight / outerWidth` still equals the locked ratio.

### 3.2 Stroke-rendered elements are coloured by their stroke

If an element draws as a stroked path, setting its **fill** does nothing. A monochrome variant
built by changing fills will silently keep the original stroke colour — this is exactly how gold
laces survived onto a supposedly all-black mark. Set `strokes`, and set `fills` too for safety.

### 3.3 Micro-marks are redrawn, not scaled

Below roughly 48px, interior detail stops resolving. Verify by rendering at **true pixel size**
and printing an ASCII map of the result — do not trust a zoomed preview.

Measured on Omen: 64px holds all four lace bars; **32px collapses them into a single smudge**;
16px keeps only the outer form and interior negative space. So the family is:

| Size | Cut |
|---|---|
| ≥64px | full primary mark |
| 32px | simplified — fewer, thicker interior elements |
| 16px | silhouette only |

Never solve small sizes by damaging the primary.

### 3.4 Layered OS icons (iOS 26+ Icon Composer)

Modern app icons are **layered**, not flat images. The system supplies specular highlight,
refraction, blur and shadow across Default / Dark / Clear / Tinted appearances.

Build layer art as:

- **Flat, single-ink, unshaded.** Any baked gradient fights the system material.
- **Transparent background**, no rounded-square mask baked in — the OS applies the shape.
- **2–4 layers**, ordered back to front by intended parallax. Omen splits as
  `outer form → interior negative space → foreground detail`.
- Each layer individually exportable at 1024.

A mark built from discrete named vector parts layers trivially. One built as a flattened shape
does not — which is a reason to keep parts separate from the start.

---

## Phase 4 — Export masters

### 4.1 Naming

One self-describing family, no synonyms:

```
omen-symbol-primary
omen-symbol-micro-32
omen-symbol-micro-16
omen-symbol-<ink>-on-<ground>
omen-wordmark-<ink>
omen-lockup-horizontal
omen-lockup-stacked
omen-app-icon-master-1024
omen-icon-layer-<n>-<part>
```

Mixing schemes (`omen-micro-32` beside `omen-favicon-16`) guarantees drift.

### 4.2 Wiring

- Export settings belong on the **true-size** frame, not the display tile. A display tile that
  carries exports will ship a file named `Actual micro export 32.svg`.
- Rename display-only frames so they cannot be mistaken (`display · … (not an export)`).
- Give every scalable asset SVG + a PNG ladder (`@1x/@2x/@3x`). App icons get explicit sizes.

### 4.3 The filename list must be generated, not typed

**Never advertise an export that does not exist.** Walk the board, collect every frame that
actually has `exportSettings`, and write that list into the board. A hand-typed list drifts —
on Omen it promised `omen-app-icon-master-1024` for a frame nobody had built.

---

## Gates

Stop and get explicit approval at each:

1. **Direction gate** — before tracing. Which concept?
2. **Geometry gate** — after tracing. Approval board with locked source, candidate, registered
   overlay, size tests, flat variants, and a notes panel stating every adjustment and every
   remaining mismatch.
3. **System gate** — after variants, micro-marks and layered icon.
4. **Production gate** — before any repo asset is replaced. Requires: approved geometry, verified
   export package, and an inventory of what the swap breaks.

Report honestly at every gate. Name what is still wrong. A board that hides a known defect is
worse than no board — the apex-notch overshoot on Omen was caught by an independent reviewer
after the primary agent had already called the mark clean.

## Boundaries

- Never modify the locked source, a previous approved version, or a backup.
- Never delete historical brand work — archive it with a visible
  `Historical only. Do not use. Replaced by <mark>.` notice.
- Never replace production assets, favicons, manifests or app icons without the production gate.
- Never touch `.env`, secrets, deploy config, or CI as part of brand work.
- Colour decisions come from `Brand/brand-system.md`. Proposing a palette exception is fine;
  making one silently is not.

## Related

- `slops-ui-ux-audit` — auditing screens against the brand system
- `slops-image-prompt` — marketing imagery, not identity
- `slops-context-markdown` — writing the brand/decision docs this work produces
- `design-md-author` — the design contract a brand system feeds
