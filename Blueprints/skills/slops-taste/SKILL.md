---
name: slops-taste
description: Anti-slop UI generation for both Slops surfaces. WEB/marketing routes to Leonxlnx/taste-skill variants; NATIVE (iOS SwiftUI + Android Compose) routes to the Omen native half in this file, because the upstream explicitly excludes product UI and carries no SwiftUI or Compose guidance. Sets the three dials per surface. Generation only — it never grades a built screen (that is slops-native-ui-audit) and never writes copy (slops-ux-copy).
status: active
skill_type: wrapper
layer: 0
default_agent: Claude (picks surface, variant and dials), Codex (applies)
trigger: "taste check | anti-slop | layout polish | typography pass | premium UI | minimalist UI | soft UI | make this screen not look generic"
upstream: "Leonxlnx/taste-skill@ccbc15639c97 (2026-08-24, read 2026-09-14) — install names: design-taste-frontend, high-end-visual-design, minimalist-ui, imagegen-frontend-web. Installer is a second upstream: npm `skills` (vercel-labs/skills, MIT)."
requires:
  - name: design-taste-frontend
    skill: design-taste-frontend
    install: npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
    note: markdown-only agent skill; no runtime, no network calls once installed. Web route only.
  - name: high-end-visual-design
    skill: high-end-visual-design
    optional: true
    install: npx skills add https://github.com/Leonxlnx/taste-skill --skill "high-end-visual-design"
  - name: minimalist-ui
    skill: minimalist-ui
    optional: true
    install: npx skills add https://github.com/Leonxlnx/taste-skill --skill "minimalist-ui"
  - name: imagegen-frontend-web
    skill: imagegen-frontend-web
    optional: true
    install: npx skills add https://github.com/Leonxlnx/taste-skill --skill "imagegen-frontend-web"
version: 0.2.0
owner: Justin
---

# Slops Taste

Slops ships **three** surfaces: a native iPhone app (SwiftUI), a native Android app (Kotlin/Compose),
and a web app plus marketing site. This skill covers all of them, but **not with the same material**,
and the split is not a preference — it is forced by what the upstream actually contains.

## Route first — this is the whole skill

| Surface | Route | Why |
|---|---|---|
| Marketing site, landing pages, web app screens | **§A — upstream variants** | This is exactly what taste-skill was written for. |
| Native iOS SwiftUI, native Android Compose | **§B — the Omen native half, below** | The upstream cannot help here. See the boundary. |

### The boundary, stated once so nobody re-litigates it

`design-taste-frontend`'s own line 8 reads: *"Landing pages, portfolios, and redesigns. Not
dashboards, not data tables, not multi-step product UI."* Omen's native app is multi-step,
data-dense product UI — the excluded category.

Measured across the v2 skill (1,206 lines, read 2026-09-14): React 32 mentions, Motion 52, Tailwind
12, CSS 42. **SwiftUI and Compose guidance: zero.** The one SwiftUI string is a link to Apple's
`Material` docs, cited for a glass effect.

So "point taste at a native screen" is not a routing preference that could go either way. There is
no native material in the upstream to apply. **§B exists because the founder requires native
coverage and the upstream cannot provide it** — not as a fallback, as the actual native route.

On 2026-09-14 this skill was routed at a 30-artboard native canvas and could not run. Two reasons
were recorded then: not installed, and wrong-tool (generate vs grade). A third was missed, and it is
this one: web vs native. §B closes it.

---

## §A — Web and marketing route

1. Pick the variant:
   - `design-taste-frontend` — new marketing/landing UI from scratch, or a web app screen.
   - `redesign-existing-projects` — an existing web screen that looks templated.
   - `high-end-visual-design` — when the brief is "make it feel expensive."
   - `minimalist-ui` — editorial, warm monochrome, flat.
   - `imagegen-frontend-web` / `brandkit` — reference images before a code pass.
2. Set the dials from § Dials below. **Use the upstream's exact variable names** — its line 78 says
   *"never invent aliases."* An invented alias binds nothing and fails silently.
3. Apply on top of `Brand/brand-system.md` and, for web app screens, `component-lock-v1.md`.
   Taste never overrides a locked token or the AAA framework.

## §B — Native route (iOS SwiftUI + Android Compose)

This half routes rather than invents. Omen's native visual language is already locked; what was
missing was a generation-time discipline that reaches for it. **Read in this order, then compose:**

1. `Blueprints/specs/mobile/omen-native-design-house-v1.md` — §2 the Omen blend, §3 design DNA,
   §4 design hierarchy (decision first, evidence second, status never hides), §6 platform rules.
2. `Blueprints/specs/design/component-lock-v1.md` — Button, Input, Segmented, Card. The variant
   lists are **locked and closed**: "no others exist." A new variant is a finding, never an invention.
3. `Blueprints/specs/design/team-theme-contract-v1.md` — which tokens a skin may override.
4. `Blueprints/specs/mobile/omen-native-design-system-registry-v1.md` — Amendment 01 (dark-only
   `#1F1F1D`, brass `#C4933B` as the sole chrome accent, Wix Madefor, risk in one hue two weights).
5. `Brand/brand-system.md` §8 and §11 — visual direction and the AAA framework.

### Native anti-slop rules — what "generic" looks like on a phone

The upstream's rules are about landing pages. These are the product-UI equivalents, derived from the
locked specs above and from what the 2026-09-13/14 canvas passes actually caught:

- **Colour is not the carrier.** Every data-semantic state carries *form* — shape, weight, fill,
  ring — and colour second. Risk is the single exception: one hue, two weights. A state distinguished
  only by hue fails for the colour-blind and fails in bright sun.
- **Brass means action, never danger.** One accent in chrome. Adding a second "just for this screen"
  is the most common way an app starts looking generic.
- **No sub-3:1 fill without a silhouette.** A fill that cannot carry contrast gets a ring. Measure it;
  do not eyeball it. `#7E1717` on `surface-3` is 1.02:1 — invisible, not subtle.
- **Decision first, evidence second.** A screen that opens with supporting data before the call is
  built backwards. §4 of the design house is the hierarchy.
- **Status never hides.** Mock/live, stale, partial, and unavailable are first-class visible states,
  not a muted footnote. Never present mock as live.
- **Type earns its role through case and tracking, not a third typeface.** Two families app-wide
  (facts-of-record #21). Do not reach for a mono to fix column alignment — use `.monospacedDigit()`.
- **Respect the platform before the brand.** iOS reads Apple-native, Android reads Google-native
  (§6). A single cross-platform pixel-identical screen is its own kind of slop.
- **Density is a product decision, not a taste one.** Omen is data-dense by nature; airy is wrong
  here in a way it is not wrong on a landing page. Hence separate dials.
- **Check the device floor.** D11 is measured against a declared device. iPhone SE at 375×667 gives
  604pt of content area — a design that "fits comfortably" at 390×844 may scroll there.

### Native output

SwiftUI or Compose composition bound to locked tokens, plus a list of any locked component it could
not satisfy. **An unmapped need is reported, never invented.**

---

## Dials

Three dials, **upstream's exact names**, set per surface. One set cannot serve both: a landing page
wants variety and air, a product screen wants consistency and density. That they differ this much is
itself the evidence for the §A/§B split.

```text
# Web / marketing  (feeds the upstream variants directly)
DESIGN_VARIANCE: 6      # composed, not templated; brand personality is restraint, not chaos
MOTION_INTENSITY: 3     # brand-system.md §8 — 150-250ms, reveals state change, never spectacle
VISUAL_DENSITY: 4       # marketing surfaces breathe

# Native product  (governs §B composition)
DESIGN_VARIANCE: 2      # a product UI is learned; "never the same layout twice" is a defect here
MOTION_INTENSITY: 2     # §8 again, tighter — plus reduce-motion is a hard requirement, not a mode
VISUAL_DENSITY: 6       # the app is data-dense by nature; airy reads as unfinished
```

`MOTION_INTENSITY` is derived from `brand-system.md` §8. The other four are a **founder taste call
recorded as a default**, not a measurement — unlike the contrast ratios above, there is nothing here
to measure. Change them here, in one place, rather than per-invocation.

> **Superseded 2026-09-14.** This block previously read `VARIANCE: medium | MOTION: low | DENSITY:
> medium` under the comment *"placeholder until slops-saloon/Brand/brand-system.md is authored."*
> Both halves were wrong. `brand-system.md` had been authoritative for months, and the dial names
> and type did not match upstream v2 at all — word values against a 1-10 integer scale, using exactly
> the kind of invented alias the upstream forbids. It would have bound nothing and said nothing.
> A stale placeholder at least announces itself; that did not.

## Does NOT

- **Grade a built screen.** Generation only. The verdict is `slops-native-ui-audit` (native) or
  `slops-ui-ux-audit` (web). This distinction is why the 2026-09-14 routing failed — the routing
  table named taste for "UI/UX — native" without separating *make* from *judge*.
- **Check an artboard against its contract.** That is `slops-canvas-to-code`.
- **Write copy.** That is `slops-ux-copy`.
- **Decide brand identity.** That is `Brand/brand-system.md`.
- **Override the AAA framework or a locked token.** Taste applies on top of accessibility, never
  beneath it. Two of three A's is a fail.
- **Introduce a vendor.** The image-gen variants direct whatever image tool the session already has.
  "imagegen" is not authorization to wire up a service — facts-of-record #17 still binds.

## Sovereignty note

Vetted 2026-09-14 against facts-of-record #17. The upstream is MIT and its payload is **prose** — no
SDK, no client, no telemetry, no runtime, no network call. Nothing about a user can leave through a
file that only instructs an agent already running. The single egress is the install itself, a
one-time founder-executed fetch carrying no user data. Full review:
`notes/prior-use-review.md`.

## Verification

- Web: run a variant against a marketing section; confirm brand palette and `slops-ui-ux-audit`.
- Native: compose one screen, then hand to `slops-native-sim-drive` for capture and
  `slops-native-ui-audit` for the verdict. **Taste does not get to mark its own work.**
- Install state: `node Blueprints/tools/skill-link/check-skill-deps.mjs --skill=slops-taste`.

## Changelog

- 0.2.0 — 2026-09-14. Vetted the upstream and pinned it to a commit. **Split into a web route and a
  native route**, because the upstream excludes product UI and carries zero SwiftUI/Compose material
  while the product is native-first. Replaced the stale and non-binding Default Dials with two
  correctly-named sets. Added the sovereignty note and the `requires:` probe block.
- 0.1.2 — quoted the upstream metadata so the active skill frontmatter parses as valid YAML.
- 0.1.1 — promoted to active 2026-06-12 (commit 3f421eb).
- 0.1.0 — initial proposal (2026-06-11), approved by Justin.
