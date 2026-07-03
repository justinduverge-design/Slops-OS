# Chant + Fan-Copy UX Spec v1

**Date:** 2026-07-03
**Status:** v1 — framework + priority-tier examples authored.
**Owner:** Justin (fan authority + brand voice) / Claude (framework, draft strings, verification tests) / Codex (implementation)
**Scope:** Slops Saloon L1 — chant + fan-copy rules apply to any current or future Slops Saloon product.
**Inherits from:** `slops-saloon/Direction/decisions/slops-saloon-fan-experience-doctrine-v1.md` (chant medium follows skin; Look Good — Play Good).
**Pairs with:** `slops-saloon/Blueprints/specs/team-colorway-system-spec-v1.md` (per-team colors that frame the chants).
**Also inherits:** `slops-saloon/omen/Brand/brand-system.md` §7 (Voice and Writing Rules); `slops-ux-copy` skill (SLOPS-canonical for Omen voice).

---

## 1. What this spec produces

- A per-team **chant string inventory** with copy correctness verified — Bird Gang, not Birds Gang; Chiefs Kingdom, not Chief's Kingdom; case-sensitive.
- **Placement rules** — which components render chants, and where in the layout.
- **Timing rules** — page load vs. celebratory triggers vs. empty-state inflection.
- **Medium rules** — how each chant renders differently on the War Room skin (curated art) versus the Color Rush skin (graffiti).
- **Empty-state inflection** — how the chant's tone bends the standard Omen empty-state voice for teams whose chant maps naturally to the state.
- **Anti-patterns** — what a chant is not, so we never ship the wrong thing.

Consumed via `frontend/src/lib/teamChant.js` (new — needs building) and the Phase 1.5g cultural-moment overlay tokens (already in `index.css`).

---

## 2. Why this spec exists

The fan-experience doctrine v1 flagged that "the chants and fan chants exist but sit inertly — not doing the job of actually energizing the user." The strings are already in the codebase somewhere but they're being rendered as if they were UI labels — flat, decontextualized, unfelt. This spec fixes that by giving each chant a **medium**, a **placement**, a **timing**, and a **tone** — the four things that make text land.

---

## 3. Where chants render — placement rules

Chants appear in **three placement families**, each with strict room-mode rules:

### 3.1 Header eyebrow slot

A single-line chant appears in the eyebrow above the page title.

- **Rooms it appears in:** Locker Room only (Dashboard, Draft Assistant, Standings, Ledger, Football, Waiver, Account, onboarding, Landing).
- **Rooms it does NOT appear in:** Owner Suite (Omen) — too solemn, breaks the executive hush. GM Suite (Trade Analyzer) — too working, breaks the analytical focus.
- **One chant per session.** Rotate on refresh from the team's chant inventory. Never mid-session — that reads as thrash.
- **Consumes:** Phase 1.5g.3 `--moment-eyebrow` + `--moment-eyebrow-color` cultural-moment overlay tokens.

### 3.2 Wall placement (Dashboard hero + Standings background)

A chant renders as if written on the wall of the room — the "locker room wall" or "GM whiteboard" or "owner suite marquee" depending on room mode.

- **Rooms it appears in:** Locker Room primarily; GM Suite as a whiteboard scrawl if a chant lands on trade-relevant tone; Owner Suite never (Omen holds its silence).
- **Ambient, not clickable.** No hover, no tap target. It's environment.
- **Rotates every N days** — on the order of weekly, not daily, not per-session. The wall is the wall; it doesn't change while you're in the room.
- **Consumes:** Phase 1.5g motif overlay + per-team surface treatment from the colorway spec.

### 3.3 Celebratory overlay (post-win pulse)

The chant appears as a brief overlay for 800ms after a win is confirmed by the platform-status Post-Win Pulse (Phase 1.5d).

- **Rooms it appears in:** any room where the user's team just won (dashboard, standings, football).
- **Timing:** exactly 800ms, honors `prefers-reduced-motion`.
- **Medium changes with skin** (see §5).

### 3.4 Empty-state inflection

When a chant's tone maps naturally to a page's empty state, the chant can **inflect** the standard Omen brand-voice empty-state copy for that team's user.

- **Example (Eagles):** default empty state `"No move stands out this week."` inflects to `"Bird Gang stays patient. No move clears the bar this week."`
- **Example (Steelers):** default `"Your current lineup is solid."` inflects to `"Steeler Nation holds the line. Lineup's solid."`
- **Constraint:** the inflection must survive `brand-system.md` §7 Voice Rules — lead with the state, keep it short, no apology. If the chant forces a violation, drop the inflection for that team and use the default.

Empty-state inflection is a **light touch, not a hijack**. The brand voice still owns the message; the chant colors it.

---

## 4. When chants render — timing rules

| Trigger | Placement | Frequency | Notes |
|---|---|---|---|
| Page load on a Locker-Room-mode route | Header eyebrow | Rotate on refresh (session-level) | One chant per session |
| Page load on a Locker-Room-mode route | Wall | Rotate weekly | The wall doesn't change while you're in the room |
| Post-win pulse fires | Celebratory overlay | Once per confirmed win | 800ms, honors reduced-motion |
| Empty state renders (Omen "no move," Standings "no games this week," etc.) | Inflected copy | Once per render | Only if the team's chant tone maps naturally |

**Chants never appear:**
- Inside data-critical zones (confidence meter, risk badge, recommendation stripe).
- Overlapping platform-status alerts, ESPN-recovery banners, or error states — those own the voice slot when they render.
- During loading states (`"Analyzing your matchup…"` is doing the job).

---

## 5. Medium — how chants render per skin

### 5.1 War Room skin → curated art

Chants render as if **plaqued** or **stenciled onto a locker-room shelf edge** or **engraved on a signet slab**.

- **Typography:** Alegreya Sans, weight 700, small-caps, letter-spacing tight (~0.02em) — reads as engraved metal.
- **Frame:** thin gold rule around the chant (using `--color-team-accent` at ~40% alpha) mimicking a mounted plaque.
- **Background:** the current team-surface color with subtle metallic sheen (linear gradient at very low opacity).
- **Motion:** none. Curated art is still art. When the chant enters view (post-win pulse), fade in 200ms — no bounce, no slide.
- **Tone:** ceremonial. This is what the team says when it holds itself up as an institution.

### 5.2 Color Rush skin → graffiti

Chants render as if **spray-painted** or **stenciled onto brick** or **wheat-pasted on a signal-box door**.

- **Typography:** a hand-drawn or graffiti-style face (candidate: `Permanent Marker` Google font; fallback: Alegreya Sans Black italic with a texture overlay). Weight heavy.
- **Frame:** none — graffiti doesn't get framed. Paint-drip or spray-edge texture on the letters instead. Optional rough-edge SVG mask.
- **Background:** the team-primary color at high depth, with a rough concrete / brick / metal texture overlay (SVG or CSS gradient noise).
- **Motion:** on post-win pulse, chants can "spray on" — a short mask-clip animation revealing the letters over ~400ms, honoring `prefers-reduced-motion` by falling back to fade-in.
- **Tone:** raw, celebratory, insurgent. This is what the fans yell in the parking lot.

### 5.3 Font loading

Graffiti font is loaded lazily on first Color-Rush-skin route entry — do not preload globally (extra weight for users who don't select a Rush skin). Fallback stack in `frontend/src/index.css`:

```css
--font-graffiti: 'Permanent Marker', 'Alegreya Sans', system-ui, sans-serif;
```

Fallback still reads as "raw" because Alegreya Sans Black italic with the texture overlay approximates the effect.

---

## 6. Copy correctness — per-team check

**Every chant string must pass a per-team copy check** before it ships. The check verifies:

- **Spelling and grammar** to the fanbase's own convention. Not the dictionary's.
- **Case sensitivity** — `Bird Gang` is a proper noun for the fanbase, not descriptive language.
- **Avoidance of retired or controversial team language** — the Chiefs Tomahawk Chop is a live cultural-sensitivity debate; ship "Chiefs Kingdom" and park the Chop.
- **No profanity, no offensive humor** per `corvus-ux-ui-direction-v1.md` Brand Character.
- **Match to team's own public voice** — if the team's official social channels use `#BirdGang` and never `#BirdsGang`, that's the source of truth.

### 6.1 Priority-tier chants (verified)

| Team | Primary chant | Alternates | Copy notes |
|---|---|---|---|
| Philadelphia Eagles | **BIRD GANG** | E-A-G-L-E-S EAGLES (spelled-out) | Singular *Bird*. The repo's current `Birds Gang` is a typo — fix in Task #5 batch. |
| Dallas Cowboys | **HOW 'BOUT THEM COWBOYS** | AMERICA'S TEAM | Curly quote or straight quote — pick straight (`'`) for universal font compat. |
| Kansas City Chiefs | **CHIEFS KINGDOM** | — | Ship Chiefs Kingdom. **Do not ship the Tomahawk Chop or "Chief Kingdom" (singular).** Cultural sensitivity + copy correctness. |

### 6.2 Extended roster — chant candidates (Claude first-pass; needs verification)

| Team | Chant candidate | Verification needed |
|---|---|---|
| Arizona Cardinals | RISE UP RED SEA | Cardinals fan |
| Atlanta Falcons | RISE UP | Falcons fan — confirm not confused with Cardinals |
| Baltimore Ravens | NEVERMORE | Poe reference, verify with Ravens fan |
| Buffalo Bills | GO BILLS · BILLS MAFIA | Bills fan — pick primary |
| Carolina Panthers | KEEP POUNDING | Panthers fan |
| Chicago Bears | BEAR DOWN | Bears fan |
| Cincinnati Bengals | WHO DEY | Bengals fan |
| Cleveland Browns | DAWG POUND · HERE WE GO BROWNIES | Browns fan — pick primary |
| Denver Broncos | MILE HIGH SALUTE | Broncos fan |
| Detroit Lions | ONE PRIDE | Lions fan |
| Green Bay Packers | GO PACK GO | Packers fan |
| Houston Texans | HOUSTON WE HAVE A PROBLEM (opp) · BULL RUSH | Texans fan |
| Indianapolis Colts | COLTS UP | Colts fan |
| Jacksonville Jaguars | DUUUVAL | Jaguars fan — confirm spelling and use in text |
| Las Vegas Raiders | RAIDER NATION | Raiders fan — universal |
| Los Angeles Chargers | BOLT UP | Chargers fan |
| Los Angeles Rams | WHOSE HOUSE, RAMS HOUSE | Rams fan |
| Miami Dolphins | FINS UP | Dolphins fan |
| Minnesota Vikings | SKOL | Vikings fan — universal |
| New England Patriots | DO YOUR JOB | Patriots fan — recent-era, verify still current |
| New Orleans Saints | WHO DAT | Saints fan — universal |
| New York Giants | GIANTS! GIANTS! GIANTS! | Giants fan |
| New York Jets | J-E-T-S JETS JETS JETS | Jets fan |
| Pittsburgh Steelers | HERE WE GO STEELERS · STEELER NATION | Steelers fan — pick primary |
| San Francisco 49ers | FAITHFUL · QUEST FOR SIX | 49ers fan — pick primary |
| Seattle Seahawks | LOUD AND PROUD · 12S | Seahawks fan — pick primary |
| Tampa Bay Buccaneers | FIRE THE CANNONS | Bucs fan |
| Tennessee Titans | TITAN UP | Titans fan |
| Washington Commanders | HAIL | Commanders fan — verify current era post-rename |

---

## 7. Empty-state inflection — worked examples

Below are per-team inflected copies for the standard Omen empty state (`"No move stands out this week"`). Each inflection is optional — if it forces the brand voice off-key for a team, drop it and use default.

| Team | Default | Inflected |
|---|---|---|
| Philadelphia Eagles | No move stands out this week. | Bird Gang stays patient. No move clears the bar this week. |
| Pittsburgh Steelers | Your current lineup is solid. | Steeler Nation holds the line. Lineup's solid. |
| Kansas City Chiefs | No move stands out this week. | Chiefs Kingdom's holding. No move clears the bar this week. |
| New Orleans Saints | No move stands out this week. | Who dat? No move — you're set. |
| Green Bay Packers | Your current lineup is solid. | Pack's already stacked. Lineup's solid. |

Inflection rule: chant subject + short verb + fall through to the default-voice second sentence. Never drop the default sentence — it's the load-bearing information.

---

## 8. Anti-patterns

- **Chants as decoration only.** If the chant is just wallpaper, it doesn't earn its slot. Every placement must have a clear job (identity, celebration, tonal inflection). Ambient wall placement is the exception — but even the wall has to feel like the room.
- **Chants in high-signal data zones.** Never overlap confidence, risk, data-source, position chips, or platform-status alerts. Chants live in the *chrome*, not the *content*.
- **Universal chant fallback.** There is no "generic Slops Saloon chant." If a team has no chant, the eyebrow / wall / celebratory slots either use the team's mascot noun ("EAGLES," "COWBOYS") in the same medium OR they render empty and the eyebrow shows the standard section label.
- **Mixing media within a skin.** War Room never renders graffiti. Color Rush never renders plaqued art. Consistency inside a skin is load-bearing.
- **Chants over risk / warning states.** A chant celebrating your team is inappropriate when you're seeing a "your ESPN cookie is expired" reconnect banner. Suppression rule: any active platform-status alert on the page hides all chant placements for the duration.
- **Adopting a chant we can't verify.** First-pass drafts are drafts. Ship only after copy correctness check with a fan of that team.

---

## 9. Implementation notes for Codex

- **New library:** `frontend/src/lib/teamChant.js` — exports `teamChant(teamId, skin, placement)` returning `{ string, medium, cssTokens }`.
- **New CSS tokens** in `frontend/src/index.css`:
  ```css
  --chant-plaque-frame: color-mix(in oklab, var(--color-team-accent) 40%, transparent);
  --chant-graffiti-texture: url('/textures/chant-graffiti-brick.svg');   /* asset TBD */
  --font-graffiti: 'Permanent Marker', 'Alegreya Sans', system-ui, sans-serif;
  ```
- **New component:** `frontend/src/components/chant/ChantEyebrow.jsx` — consumes `teamChant()` for the current team + skin + `'eyebrow'` placement. Renders inside the Locker-Room-mode page header slot.
- **Post-win pulse integration:** `frontend/src/lib/postWinPulse.js` (already exists, Phase 1.5d) — extend to overlay the celebratory chant with medium-per-skin rendering. Suppress if `prefers-reduced-motion`.
- **Suppression rule:** all chant placements read `usePlatformStatus()` and short-circuit if an active alert is present.
- **Feature flag:** ship behind `VITE_FEATURE_TEAM_CHANTS=true` until the copy correctness pass completes for all 32 teams.

---

## 10. Next artifacts

- [ ] Author `frontend/src/lib/teamChant.js` — Codex prompt to be drafted once at least 6 teams' chants are verified.
- [ ] Copy correctness pass — Justin verifies priority-tier + walks the extended roster in slots of 4–8 teams. Track per-team verification in this spec's §6.
- [ ] Chant graffiti texture assets — SVG brick / concrete / metal masks. Author via `slops-image-prompt` skill; canonical location `slops-saloon/omen/logos/textures/`.
- [ ] Graffiti font decision — Permanent Marker vs. bespoke asset vs. Alegreya-Sans-Black-italic-with-texture-mask. Ship Permanent Marker as v1; upgrade later if it feels generic.
- [ ] Empty-state inflection copy pass — expand §7 to at least 16 teams; drop teams where inflection forces brand-voice violations.
- [ ] Wall placement design — the "locker room wall" needs its own visual spec (texture, chant sizing, per-room-mode variant). Pairs with the room-mode implementation spec listed in the fan-experience doctrine's Next Artifacts.
- [ ] Fix the `Birds Gang` → `Bird Gang` typo (Task #5 batch).
