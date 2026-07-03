# Team Colorway System Spec v1

**Date:** 2026-07-03
**Status:** v1 — framework + priority-tier examples authored; extended-roster examples authored as first-pass drafts pending fan / regional verification.
**Owner:** Justin (fan + regional authority) / Claude (framework, first drafts, verification tests) / Codex (implementation)
**Scope:** Slops Saloon L1 — colorway rules apply to any current or future Slops Saloon product.
**Inherits from:** `slops-saloon/Direction/decisions/slops-saloon-fan-experience-doctrine-v1.md` (two-sided presence, three-room mapping, data-legibility invariant).
**Implements against:** `slops-saloon/omen/Brand/brand-system.md`, `slops-saloon/omen/Blueprints/specs/omen-ux-ui-design-system-v1.md` v2 (Phase 1.5 team-theming tokens).
**Pairs with:** `slops-saloon/Blueprints/specs/chant-and-fan-copy-spec-v1.md` (chant strings, medium, placement, timing).

---

## 1. What this spec produces

For each of 32 NFL teams, two full colorways:

- **War Room** — inside, institutional, chants as curated art. Five tokens.
- **Color Rush** — outside, city on game day, chants as graffiti. Six tokens (adds a regional-signature color).

Consumed via `frontend/src/lib/teamTheme.js` (or equivalent) fed to the Phase 1.5 team-theming CSS token layer (`--color-team-*`). Selected by the fan through the appearance picker; persisted per user.

**This spec produces rules and examples.** The full 32-team roster is authored in slots (priority tier here; extended roster in follow-up passes to preserve regional verification quality).

---

## 2. Token contract (per team, per skin)

### 2.1 War Room skin — 5 tokens

| Token | Meaning | Constraint |
|---|---|---|
| `--color-team-primary` | Dominant team color (usually the modern-era primary jersey color) | Must pass 4.5:1 contrast against `--color-text-primary` bone white when used as a surface |
| `--color-team-secondary` | Second team color (usually jersey secondary or throwback color) | Must pass 3:1 contrast against team-primary for differentiation |
| `--color-team-accent` | Small-detail moments — chant plaque frame, active state, focus rings | Can be either primary or secondary depending on visual weight and legibility |
| `--color-team-surface` | Room background — deepens in Locker Room, modulates lighter in Owner Suite / GM Suite | Must resolve to a readable-on-dark surface for the current room mode |
| `--color-team-surface-card` | Card surfaces | Must pass 3:1 against team-surface |

### 2.2 Color Rush skin — 6 tokens

Same 5 as War Room, plus:

| Token | Meaning | Constraint |
|---|---|---|
| `--color-team-regional` | The city/region's own signature color — distinct from the team palette, sourced from a documented regional identity (transit color, cultural mainstay, local landmark, cross-sport local team) | Must pair legibly with team-primary; must pass the Region Test (see §3) |

Chant medium tokens also change between skins — see the chant spec.

### 2.3 Room-mode graduation

Team tokens graduate their depth by the room the current feature belongs to (per fan-experience doctrine three-room mapping):

- **Owner Suite (Omen):** team color used sparingly — signet-ring treatment. Deep charcoal surfaces dominate. `--color-team-accent` marks moments of high signal (recommendation stripe, confidence spine, CTA). `--color-team-surface` remains near `--color-bg` with a whisper of tint.
- **GM Suite (Trade Analyzer):** team color as active-state color — inputs, tabs, chip selections, panel headers. Present in working surfaces without swallowing them. `--color-team-surface` gets a modest team-tint at ~14% alpha.
- **Locker Room (everything else):** team color runs deepest — surface tints, header washes, chip fills, chant frames. `--color-team-surface` takes team color at ~30–40% alpha over `--color-bg`. This is where "phone put on the uniform" most literally applies.

---

## 3. The three tests

Every colorway ships only after passing three tests, in order.

**Test 1 — Team Test.** Show the War Room skin to a fan of that team without the team name attached. Do they recognize their team within one second? If they hesitate, the primary is wrong or the secondary is fighting.

**Test 2 — Region Test (Color Rush only).** Show the Color Rush regional color paired with the primary to a resident of that city or region. Does the regional color earn an "oh, that's us"? If they can't place the color, it's not regional — it's decorative. Kill it and reselect.

**Test 3 — Studio Test.** Compare the finished skin against a league-issued jersey knockoff. Is there something about the treatment — chant medium, surface texture, room framing, motif overlay — that a generic sports app would not know to include? If not, we haven't earned "Slops Saloon" — we've earned "another team-skin." Restart.

Every team's roster entry records the outcome of each test with a one-line note.

---

## 4. Failure modes to avoid

- **Two teams whose Color Rush ends up looking the same** because both got a generic "louder alt" treatment. Every Rush should feel like a different city, not a template with different hex codes dropped in. This is the same failure mode flagged in Phase 1.13 QA — the current implementation fails this test.
- **Regional color that no one from the region recognizes.** If a Boston-native doesn't smile at the choice, it's wrong.
- **Team color overrides semantic color.** Team-red on top of `--color-risk-high` (also red) — never. Team color occupies the surface and accent layers only. See §5.
- **War Room skin that looks like a jersey rather than a room.** The palette lives inside a texture — leather, cinderblock, brushed metal, film grain — appropriate to the room. Not a flat jersey wash.

---

## 5. Data-legibility invariant (restatement)

Per the fan-experience doctrine, the following semantic families **own their own colors** and are never overridden by team color, motif, or moment overlay:

- Risk (`--color-risk-low` / `--color-risk-medium` / `--color-risk-high`)
- Confidence gradient (`--color-confidence-floor` / `--color-confidence-ceiling`)
- Data-source (`--color-data-live` / `--color-data-stub` / `--color-data-mock` / `--color-data-unavailable`)
- Position chips (`--color-pos-*`)
- Platform brand colors (`--color-platform-*`)
- Demo accent (`--color-demo-*`)

**Team color runs in surfaces, accents, chip fills, and chant frames only.** Where a data-semantic color and a team color both want the same spot, the semantic color wins and the team color moves. This is where Look Good — Play Good is enforced in code.

---

## 6. Author methodology (per team)

To author a team's colorways:

1. **Collect the team-palette source of truth** — modern-era primary + secondary + throwback if visually distinctive. Prefer the team's own published brand kit over Wikipedia; when neither, use two independent public brand-color references and reconcile.
2. **Draft War Room tokens** — pick the primary and secondary that a fan will read as "theirs" within one second (Test 1). Compute accent from whichever reads well as focus-ring / small-detail color.
3. **Verify contrast** — every token pairing hand-computed against `--color-text-primary` bone white and `--color-bg` raven black in both dark and light themes. Fail closed: if any pair drops below 4.5:1 (text) or 3:1 (non-text), reselect.
4. **Draft the regional signature for Color Rush** — brainstorm 4–6 candidate regional colors sourced from the city's transit, cultural landmarks, food, geography, or cross-sport local teams. Pick the one that pairs legibly with team-primary AND passes the Region Test (Test 2).
5. **Assign chant medium hooks** — link the team's primary chant string to its curated-art frame (War Room) and graffiti overlay (Color Rush) per the chant spec.
6. **Run the three tests, document outcomes** — one-line note per test in the roster entry below.
7. **File as `[team-slug]-colorway.md` in `slops-saloon/Blueprints/specs/teams/`** — full per-team detail lives there; the summary row in this spec's roster (§8) links to it.

---

## 7. Priority-tier examples

### 7.1 Philadelphia Eagles (Justin's regional — deep example)

**War Room**

| Token | Value | Notes |
|---|---|---|
| `--color-team-primary` | `#004C54` | Midnight Green — modern era, institutional feel, Owner Suite / War Room appropriate |
| `--color-team-secondary` | `#A5ACAF` | Eagles Silver — jersey secondary |
| `--color-team-accent` | `#F5F0E8` | Bone White — chant plaque frame reads as ceremonial |
| `--color-team-surface` | `color-mix(in oklab, #004C54 32%, #0A0A0B)` | Deep green wash over raven black (Locker Room graduation) |
| `--color-team-surface-card` | `#1C1C1E` | Charcoal — unchanged from core, per invariant |

**Color Rush**

| Token | Value | Notes |
|---|---|---|
| `--color-team-primary` | `#007730` | Kelly Green — nostalgic throwback, the color Bird Gang gets emotional about |
| `--color-team-secondary` | `#000000` | Kelly Green throwbacks paired with black |
| `--color-team-accent` | `#E2B93B` | Mummers Gold — see below |
| `--color-team-regional` | `#E2B93B` | **Mummers Gold** — the New Year's Day parade sequin gold, unmistakably Philly, celebratory, pairs with kelly without competing. Alternates considered: SEPTA orange (working-class, transit-authentic), Wawa red (deep-cut Philly), Liberty Bell bronze (too civic-solemn for game-day feel). Mummers wins on celebration + regional-authenticity. |
| `--color-team-surface` | `color-mix(in oklab, #007730 40%, #0A0A0B)` | Kelly wash — graffiti overlay reads well |
| `--color-team-surface-card` | `#1C1C1E` | Charcoal — unchanged |

**Test outcomes**

1. **Team Test:** Midnight Green + Silver reads "Eagles" within one second to a Philly fan. Kelly + Black reads "Eagles throwback" within one second — actually reads harder ("this is my team on a REAL game day"). Pass.
2. **Region Test:** Mummers Gold to a Philly resident earns "oh, that's us" — the New Year's Day parade is universal Philly cultural memory. Pass. (Runners-up SEPTA orange and Wawa red also pass Test 2 but were less compatible with the kelly-green pairing on Test 1.)
3. **Studio Test:** the chant medium — "BIRD GANG" as graffiti-spray on the Color Rush wall and as a curated brass plaque on the War Room wall — is not something a generic sports app would render. Combined with the Mummers Gold accent, this reads as Slops Saloon, not as a jersey knockoff. Pass.

**Chant string:** `BIRD GANG` (per chant spec — note the singular "Bird"; the repo's current `Birds Gang` is a typo to be fixed in Task #5 batch).

### 7.2 Dallas Cowboys (contrast example — divisional rival)

**War Room**

| Token | Value | Notes |
|---|---|---|
| `--color-team-primary` | `#003594` | Cowboys Navy — modern era |
| `--color-team-secondary` | `#869397` | Cowboys Silver |
| `--color-team-accent` | `#B0B7BC` | Metallic Silver — reads well as focus ring |
| `--color-team-surface` | `color-mix(in oklab, #003594 30%, #0A0A0B)` | Navy wash |
| `--color-team-surface-card` | `#1C1C1E` | Charcoal |

**Color Rush**

| Token | Value | Notes |
|---|---|---|
| `--color-team-primary` | `#041E42` | Cowboys Deep Blue (throwback) |
| `--color-team-secondary` | `#869397` | Silver |
| `--color-team-accent` | `#C89B3A` | State Fair Gold — see regional below |
| `--color-team-regional` | `#C89B3A` | **State Fair of Texas Gold** — Big Tex, deep-fried carnival glow. Alternates considered: Reunion Tower ball white-gold (too specific), Boot leather brown (too muted), Texas flag red (competes with too many other teams). State Fair Gold is celebratory + distinctly Dallas. |
| `--color-team-surface` | `color-mix(in oklab, #041E42 40%, #0A0A0B)` | Deep navy wash |
| `--color-team-surface-card` | `#1C1C1E` | Charcoal |

**Test outcomes (Claude first-pass — Justin verify with a Dallas fan / Texan)**

1. **Team Test:** navy + silver reads "Cowboys" — high confidence.
2. **Region Test:** State Fair Gold — first-pass claim, needs a Texan to verify.
3. **Studio Test:** Big Tex framing + graffiti chant + navy wash reads studio-authored — first-pass claim.

**Chant string:** `HOW 'BOUT THEM COWBOYS`

### 7.3 Kansas City Chiefs (recent dynasty — high-visibility example)

**War Room**

| Token | Value | Notes |
|---|---|---|
| `--color-team-primary` | `#E31837` | Chiefs Red |
| `--color-team-secondary` | `#FFB81C` | Chiefs Gold |
| `--color-team-accent` | `#FFB81C` | Gold reads well as small-detail on red-washed surfaces |
| `--color-team-surface` | `color-mix(in oklab, #E31837 25%, #0A0A0B)` | Red wash muted to preserve legibility |
| `--color-team-surface-card` | `#1C1C1E` | Charcoal |

**Color Rush**

| Token | Value | Notes |
|---|---|---|
| `--color-team-primary` | `#E31837` | Chiefs Red |
| `--color-team-secondary` | `#FFB81C` | Gold |
| `--color-team-accent` | `#6B4423` | BBQ Smoke — see regional below |
| `--color-team-regional` | `#6B4423` | **KC BBQ Smoke Brown** — deep smokehouse tone. Unmistakable KC identity (Kansas City barbecue is a globally-recognized cultural signature). Alternates considered: Country Club Plaza light gold (too soft), Fountain city cyan (too disconnected from game-day energy), Missouri River blue (competes with too many other teams). BBQ Smoke wins on cultural authority and celebratory grit. |
| `--color-team-surface` | `color-mix(in oklab, #E31837 35%, #0A0A0B)` | Red wash |
| `--color-team-surface-card` | `#1C1C1E` | Charcoal |

**Test outcomes (Claude first-pass — Justin verify with a KC fan)**

1. **Team Test:** red + gold reads "Chiefs" — high confidence.
2. **Region Test:** BBQ Smoke Brown — first-pass claim, needs a KC fan to verify. Watch for cultural-sensitivity conflict with the team's ongoing "Chief Kingdom" / Tomahawk Chop debates; see chant spec §Copy correctness — per-team check.
3. **Studio Test:** BBQ Smoke framing is a specific studio-authored choice — a generic sports app would not know to reach for it. First-pass claim.

**Chant string:** `CHIEFS KINGDOM` (see chant spec for the Tomahawk Chop discussion — parked, not shipped).

---

## 8. Team roster (32)

| Team | War Room | Color Rush | Chant | Status |
|---|---|---|---|---|
| Philadelphia Eagles | ✓ §7.1 | ✓ §7.1 | BIRD GANG | Priority — verified region |
| Dallas Cowboys | ✓ §7.2 | ✓ §7.2 | HOW 'BOUT THEM COWBOYS | Priority — first-pass, Texan verify pending |
| Kansas City Chiefs | ✓ §7.3 | ✓ §7.3 | CHIEFS KINGDOM (chant TBD, see chant spec) | Priority — first-pass, KC-fan verify pending |
| Arizona Cardinals | | | | Extended roster — pending author pass |
| Atlanta Falcons | | | | Extended roster — pending author pass |
| Baltimore Ravens | | | | Extended roster — pending author pass (regional candidates: Chesapeake blue, Old Bay red-orange) |
| Buffalo Bills | | | | Extended roster — pending author pass (regional candidates: Buffalo wing red, Lake Erie steel-blue) |
| Carolina Panthers | | | | Extended roster — pending author pass |
| Chicago Bears | | | | Extended roster — pending author pass (regional candidates: L-train yellow, deep-dish crust brown) |
| Cincinnati Bengals | | | | Extended roster — pending author pass |
| Cleveland Browns | | | | Extended roster — pending author pass |
| Denver Broncos | | | | Extended roster — pending author pass (regional candidates: Rockies snow-white, Coors amber) |
| Detroit Lions | | | | Extended roster — pending author pass (regional candidates: Motown brass, Vernors ginger-gold) |
| Green Bay Packers | | | | Extended roster — pending author pass (regional candidates: cheese-curd yellow, Lombardi Trophy silver) |
| Houston Texans | | | | Extended roster — pending author pass |
| Indianapolis Colts | | | | Extended roster — pending author pass |
| Jacksonville Jaguars | | | | Extended roster — pending author pass |
| Las Vegas Raiders | | | | Extended roster — pending author pass (regional candidates: Vegas neon violet, Strip gold) |
| Los Angeles Chargers | | | | Extended roster — pending author pass |
| Los Angeles Rams | | | | Extended roster — pending author pass |
| Miami Dolphins | | | | Extended roster — pending author pass (regional candidates: South Beach coral, Everglades teal — pairs with existing team teal → risk) |
| Minnesota Vikings | | | | Extended roster — pending author pass (regional candidates: North Star silver, Nordic red) |
| New England Patriots | | | | Extended roster — pending author pass |
| New Orleans Saints | | | | Extended roster — pending author pass (regional candidates: Mardi Gras purple-green-gold — mind the existing team gold overlap) |
| New York Giants | | | | Extended roster — pending author pass (regional candidates: subway silver, taxicab yellow) |
| New York Jets | | | | Extended roster — pending author pass |
| Pittsburgh Steelers | | | | Extended roster — pending author pass (regional candidates: steel-mill sepia, Iron City black-and-gold — overlaps team) |
| San Francisco 49ers | | | | Extended roster — pending author pass (regional candidates: Golden Gate international-orange, Alcatraz gray) |
| Seattle Seahawks | | | | Extended roster — pending author pass (regional candidates: Rainier evergreen, Pike Place fish-silver) |
| Tampa Bay Buccaneers | | | | Extended roster — pending author pass |
| Tennessee Titans | | | | Extended roster — pending author pass |
| Washington Commanders | | | | Extended roster — pending author pass (regional candidates: cherry-blossom pink, Metro red — pairs with existing team burgundy) |

**Extended-roster author pass:** batch in slots of 4 teams. Each slot: draft War Room + Color Rush + chant + three-test outcomes per §6 methodology. File per-team detail at `slops-saloon/Blueprints/specs/teams/[team-slug]-colorway.md`. Update this roster's summary row.

---

## 9. Next artifacts

- [ ] Author `slops-saloon/Blueprints/specs/teams/` directory + per-team files for priority tier (Eagles, Cowboys, Chiefs) as detail sinks; move most of §7 content into those files, keep §7 as summaries here.
- [ ] Extended-roster author pass — 8 batches of 4 teams. Each batch reviewed by a fan of one of the teams if available. Track batch progress in a follow-up handoff.
- [ ] Codex prompt for `frontend/src/lib/teamTheme.js` scaffolding — take the token contract from §2 and generate the runtime shape. **Blocked** on at least 4 teams shipping so the shape has real cases.
- [ ] Appearance-picker alphabetization (Task #5 batch) — the current picker isn't alphabetical per Phase 1.13 QA.
- [ ] `Blueprints/specs/chant-and-fan-copy-spec-v1.md` — pairs with this spec, handles the chant string, medium, placement, and timing rules.
