# Decision: Slops Saloon Fan Experience Doctrine v1

**Date:** 2026-07-03
**Status:** Approved — locks the design vision for every Slops Saloon product
**Owner:** Justin (founder) / Claude (doctrine extraction)
**Scope:** Slops Saloon L1 (division-level). Binds Omen L2 and every future Slops Saloon product. Omen's `Brand/brand-system.md` inherits from this document; conflicts resolve in this document's favor until it is versioned forward.
**Supersedes nothing.** Extends `corvus-ux-ui-direction-v1.md` (Omen character) into a studio-level fan-experience system.

---

## Why this exists

Slops Saloon's competitive claim is *"the best at designing fantasy sports tools."* Competitors treat the app as a spreadsheet with a skin. This doctrine says the skin is part of the decision. Every rule below exists to make that claim defensible — first in Omen, then in every product that follows.

Justin does not have a hands-on visual-design background. This doctrine is written so that the beliefs are named clearly enough that a design system, an audit skill, or an outside designer can enforce them without re-interviewing him.

---

## Load-bearing principle: Look Good — Play Good

> **Presentation isn't cosmetic. When the app looks like a room where real decisions get made, users make better ones.**

Named after Allen Iverson's "Look Good — Play Good." This is the single axiom every rule below serves. Any design choice — a color, a texture, a chant placement, a font — must survive the question *"does this make the user's next call better, worse, or neutral?"* Neutral is the failure state, not just bad.

Corollary: **data legibility is never traded for team-color depth.** If team-color deepening starts to fight confidence, risk, or data-source semantics, the answer is not "less team color" and not "less legibility" — the answer is a *creative solution* that delivers both. Look Good is not a permission slip to look worse at math.

---

## The two-sided presence doctrine

Every Slops Saloon fan runs on a **two-sided presence** system. A team's identity in the app is expressed through two colorways, both of which the fan can select. They are not "primary + fallback." They are two full expressions of belonging, each authored differently.

### Side A — The War Room (default / primary skin)

The fan is **inside** the team's decision spaces in the tense minutes before kickoff. Institutional access. Team-authored. High-stakes hush. When the fan picks their team, **the phone puts on the uniform** — the app *becomes* the team, not "displays team colors."

- **Aesthetic tier by feature (see Three-Room Mapping below)**
- **Texture:** live, textured, real. Not flat. Not glossy. Materials feel used — leather, brushed metal, chalk, cinderblock, film grain — appropriate to which room the current feature belongs to.
- **Chants live as *curated art on the wall*.** Framed. Matted. Lit. Team-authored. A commissioned mural, a title above a locker, a plaque. Chants are placed intentionally in the environment — not sprayed, not shouted.
- **Team color goes deep** — surfaces, headers, panels take team color, not just accent lines. Depth is graduated by room (see Three-Room Mapping).

### Side B — Slops Saloon Color Rush (alt skin)

The fan is **outside**, on the block, on game day. Fan-authored. City-authored. Community celebration. The tailgate, the walk to the stadium, the local bar with everyone in colors.

- **Aesthetic:** street. Celebratory. Art-forward. Louder than the war room without being neon.
- **Chants live as *graffiti*.** Painted. Marker on brick. Wheat-pasted. Unsanctioned voice. Fan-authored, not team-authored. Where the war-room chant is *plaqued*, the Rush chant is *sprayed*.
- **Team colors carry, but the region gets a voice.** Rush pairs the team palette with a *regional* signature — colors, textures, references, or motifs that a fan of that city/region recognizes on sight independent of the team. Philadelphia isn't just Eagles green — it's also SEPTA-orange, Mummer-feather palette, cheesesteak-wrapper red-and-white, Rocky-statue bronze. The Rush skin knows this. **The Rush must be personal to the city/region the same way the chants are — not generic.**

---

## The Three-Room Mapping (for the War Room / primary skin)

The three rooms Justin named — locker room, GM suite, owner suite — are not user tiers. They are **feature tiers**. A single user moves through all three rooms in a session, and the room they're in matches the *kind of work* the current feature does.

| Room | Feature(s) | Character | Materials | Density | Formality |
|---|---|---|---|---|---|
| **Owner Suite** | **Omen** (the paid weekly recommendation feature) | Executive vantage. Distant window on the field. Observer, not operator. The decision has weight. | Leather, cut crystal, dark wood, brass rules, long shadows. | Sparse. Wide margins. Cinematic. | High. Presentation-worthy at full scale. Quiet. |
| **GM Suite** | **Trade Analyzer** | Strategist's workshop. Where the trade calls actually happen. Analytical, in-motion, tools visible. | Whiteboard hints, film-loop residue, coffee-cup ring, pinned-up spreadsheets, mid charcoal. | Working density. Tools out. | Mid. Professional but hands-on. |
| **Locker Room** | **All other pages** — Dashboard, Draft Assistant, Standings, Ledger (`/ledger`), Football (`/football`), Waiver, Account, Onboarding, Sign-in, Landing. | Player-side. Team-space. Raw, textured, community, close-quarters. Chants scrawled on cinderblock. Jersey-in-the-cage energy. | Cinderblock, tape, worn wood, chalk, weathered metal, dense team-color washes. | Warm density. Human. | Lower. Camaraderie. |

**Consistency across rooms:** the team colorway is set *once* by the fan (via appearance picker) and stays constant across all three rooms. What changes room-to-room is the **texture, formality tier, layout density, and material vocabulary** — not the color. Eagles-green fan sees kelly-green everywhere; they see it *rendered differently* in each room.

**Graduated depth of team color:**

- **Owner Suite (Omen):** team color used sparingly — like a signet ring. Deep charcoal surfaces dominate. Team color marks moments of high signal (the recommendation stripe, the confidence spine, the CTA).
- **GM Suite (Trade Analyzer):** team color as active-state color — inputs, tabs, chip selections, panel headers. Present in the working surfaces without swallowing them.
- **Locker Room (everything else):** team color runs deepest — surface tints, header washes, chip fills, chant frames. This is where the "phone put on the uniform" line most literally applies.

**The three rooms are style modes, not routes.** They are not switched by the user. They are baked into which feature the user is currently in.

---

## The chant-medium rule

- **On the War Room (primary) skin:** chants render as **curated art**. Frames, mats, plaques, murals. Team-authored voice. Placement is intentional and sparse — one chant per screen at most, positioned where a real locker/office would hang it.
- **On the Color Rush (alt) skin:** chants render as **graffiti**. Painted-letter styling, marker strokes, wheat-paste layering, sanctioned-street-art vocabulary. Fan-authored voice. Placement is looser — chants can layer, overlap, and appear more freely, because that is how they appear on the actual streets on game day.

Same content strings, different medium. This is why "the strings exist but sit inertly" — no medium has been assigned. Assigning medium is what activates them.

**Copy correctness rides on top of medium.** The Eagles chant is **"Bird Gang,"** not "Birds Gang." Every chant string must pass a per-team copy check before it ships in either medium. That check is part of the UX-copy pass, not the color pass.

---

## The regional-identity rule (Color Rush only)

Every team's Color Rush skin must satisfy three tests, in order:

1. **Recognizable as the team.** A fan of that team must know it is theirs within one second.
2. **Recognizable as the region.** A resident of that city/region must feel their place represented — a color, a texture, a motif, a nod — that a generic sports app would not know to include.
3. **Reads as Slops Saloon, not the league.** The Rush is our alt, not a jersey knockoff. Even when the palette is faithful, the treatment (graffiti chants, street materials, regional pairing) must feel *studio-authored*.

**Failure mode to avoid:** two teams whose Color Rush ends up feeling the same because both got a generic "louder alt" treatment. Every Rush should feel like a different city, not one template with different colors dropped in. This is the same failure mode as identical "second skins" flagged in Phase 1.13 QA — the current implementation fails this test.

---

## Data legibility invariant

**Confidence, risk, data-source, and mock/live semantics own their own colors, in every room, on both skins, for every team.**

- Confidence gradient (Phase 1.8): `--color-confidence-floor` / `--color-confidence-ceiling` — never overridden by team color.
- Risk badges: low / medium / high — never overridden.
- Data-source labels: live / stub / mock / unavailable — never overridden.
- Mock banner: retains its own amber system — never team-tinted.

Team color runs in surfaces, accents, chip fills, and chant frames. Semantic color runs in the data layer. **These two systems coexist by design, not by tradeoff.** When they collide, the resolution is *creative composition* (spatial separation, texture layering, deliberate contrast pairing) — never a demotion of either side.

This is where Look Good — Play Good is enforced in code.

---

## What this doctrine binds

- **Omen (L2)** — the appearance system, the team-colorway system, the three-room mapping, and the chant medium all inherit from this document. `slops-saloon/omen/Brand/brand-system.md` is updated in a follow-on pass to reference this doctrine as its parent.
- **Any future Slops Saloon product** — same doctrine, different rooms. A future product's "three rooms" may differ (a betting product might have a *cage* instead of a locker room, a media product might have a *studio*) but the doctrine's shape — *two-sided presence, load-bearing "Look Good — Play Good", medium-follows-skin for cultural content, data-legibility invariant* — is inherited by default.

## What this doctrine does not decide

The doctrine names the rules. It does not name the hexes, fonts, textures, or specific material references. Those live in the specs it will spawn:

1. **Reconciled Omen design system spec v2** — merges `omen-ux-ui-design-system-v1.md` with `Brand/brand-system.md` (canonical) and encodes the three rooms as build-ready tokens. Blocks all other design specs. **✅ landed 2026-07-03 as v2 in `slops-saloon/omen/Blueprints/specs/omen-ux-ui-design-system-v1.md`.**
2. **Team colorway system spec** — 32 teams × {War Room primary, Color Rush alt}, each satisfying the three tests above. Depends on doctrine + reconciled system. **✅ landed 2026-07-03 as v1 at `slops-saloon/Blueprints/specs/team-colorway-system-spec-v1.md` — framework + priority-tier examples (Eagles/Cowboys/Chiefs); extended-roster team drafts pending fan verification.**
3. **Chant + fan-copy UX spec** — placement, timing, medium rules, per-team copy check. Includes the "Bird Gang" typo fix and the alphabetization of the appearance picker as line items. **✅ landed 2026-07-03 as v1 at `slops-saloon/Blueprints/specs/chant-and-fan-copy-spec-v1.md` — framework + priority-tier chants verified; extended-roster candidates listed pending per-team fan verification.**
4. **Room-mode implementation spec** — how the three rooms differ in code (tokens, texture layers, material vocabulary, density scale). Where the "creative solutions" for data-legibility get engineered. **⏳ pending — spawn after colorway + chant specs stabilize.**

---

## Provenance

This doctrine was extracted from two founder statements on 2026-07-03:

> "I want the fan to see the team colorway and feel like their phone just put on the uniform for their favorite team. I want them to feel like Allen Iverson said Look Good — Play Good. I want the UX to look alive, to have texture, to feel real. I want the fan chants to be like graffiti on the walls or more like art on the wall maybe. I want the team scheme to also feel like the user is in the locker room or GM suite or owner suite right before a big game.
>
> The Slops Saloon Color Rush should feel more fan-centered and be tailored to how that city might feel on a home game day. It's a big game, everyone got the team colors on, but you might also have some distinct colors to that region that people also love, and we should tie the city in the same way we tie the fan chants — it should be art, it should feel good, look good, and be personal to the city/region."

And three follow-up decisions:

1. Owner Suite = Omen. GM Suite = Trade Analyzer. Locker Room = everything else.
2. Graffiti on the Rush skin. Curated art on the War Room skin.
3. Data legibility and team-color depth are both required — solve creatively, don't pick one.

---

## Next artifacts

- [x] Update `slops-saloon/Direction/decisions/README.md` to list this record. **(2026-07-03)**
- [x] Add running-log entry in `slops-saloon/Direction/decision_log.md` pointing here. **(2026-07-03)**
- [x] Logo usage rule authored as `brand-system.md` §12 (2026-07-03). Shield is its own frame; horizontal lockup replaces `[C]` placeholder in `Header.jsx` / `NavDrawer`; wordmark is the designed asset (not Alegreya text); asset canonical location = `omen/logos/`, build-served = `omen/frontend/public/`. Codex prompt at `slops-saloon/omen/Blueprints/prompts/codex-logo-suite-swap.md` executes the file copy + `.jsx` swap.
- [ ] Follow-on pass: update `slops-saloon/omen/Brand/brand-system.md` §6 (Brand Personality) and §8 (Visual Direction) to inherit from this doctrine. Not done in this pass because it changes Omen's canonical brand file and warrants its own scoped diff.
- [ ] Follow-on pass: reconcile `slops-saloon/omen/Blueprints/specs/omen-ux-ui-design-system-v1.md` (still lists Cormorant Garamond / Electric Violet / Antique Gold — all superseded by `brand-system.md` and by this doctrine).
- [ ] Confirm or revise `brand-system.md` §10a Marketing Pillars (DETECT / ANALYZE / PREDICT / WIN) — currently provisional per brand board; parked pending explicit Justin decision.
- [ ] Spawn the four specs listed under "What this doctrine does not decide."
