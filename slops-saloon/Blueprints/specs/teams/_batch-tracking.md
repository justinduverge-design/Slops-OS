# Per-Team `design.md` Author Pass — Batch Tracking

**Purpose:** track which teams have completed a per-team `[team-slug]-design.md` authoring pass via the `design-md-author` skill per `README.md`.

**Status legend:**

- ✅ **Complete** — `[team-slug]-design.md` exists in this folder authored via `design-md-author`, three tests passed, chant verified, roster row in the colorway spec §8 links to it, legacy `-colorway.md` retired.
- 🟡 **First-pass drafted** — either `-colorway.md` stub exists OR `-design.md` exists but at least one test is pending fan / regional verification.
- ⏳ **Not started** — no per-team file of any kind yet.

---

## Priority tier

| Team | `-design.md` via skill | War Room | Color Rush | Chant | Region verify | Legacy `-colorway.md` | Status |
|---|---|---|---|---|---|---|---|
| Philadelphia Eagles | ⏳ pending `design-md-author` invocation | ✓ colorway spec §7.1 | ✓ Mummers Gold | BIRD GANG ✓ | Justin (Philly) ✓ | 🟡 `eagles-colorway.md` stub (retire after design.md lands) | 🟡 stub file exists, design.md pending |
| Dallas Cowboys | ⏳ pending `design-md-author` invocation | ✓ colorway spec §7.2 | ✓ State Fair Gold (first-pass) | HOW 'BOUT THEM COWBOYS ✓ | Texan pending | 🟡 `cowboys-colorway.md` stub (retire after design.md lands) | 🟡 stub file exists, needs Texan verify + design.md |
| Kansas City Chiefs | ⏳ pending `design-md-author` invocation | ✓ colorway spec §7.3 | ✓ BBQ Smoke Brown (first-pass) | CHIEFS KINGDOM ✓ (Chop parked) | KC-fan pending | 🟡 `chiefs-colorway.md` stub (retire after design.md lands) | 🟡 stub file exists, needs KC-fan verify + design.md |

Priority tier moves fully ✅ when: (a) the two remaining regional-verify passes land, (b) `design-md-author` is invoked for all three teams, (c) the `-colorway.md` stubs are retired.

---

## Extended roster (29 teams) — batches of 4

Each batch: fan of at least one team verifies Region Test BEFORE `design-md-author` is invoked.

- ⏳ **Batch 1 (suggested: NFC North — Chicago / Green Bay / Detroit / Minnesota)** — Great Lakes / Rust Belt / Midwest clustering.
- ⏳ **Batch 2 (suggested: NFC South — Atlanta / Carolina / New Orleans / Tampa)** — Deep South / Gulf Coast.
- ⏳ **Batch 3 (suggested: AFC North — Baltimore / Cincinnati / Cleveland / Pittsburgh)** — Rust Belt / Great Lakes.
- ⏳ **Batch 4 (suggested: NFC East remaining — NY Giants / Washington)** — plus 2 wildcard picks.
- ⏳ **Batch 5 (suggested: AFC East — Buffalo / Miami / New England / NY Jets)** — Northeast + South Florida.
- ⏳ **Batch 6 (suggested: AFC West — Denver / LA Chargers / Las Vegas)** — plus KC (priority) or 1 wildcard.
- ⏳ **Batch 7 (suggested: AFC South — Houston / Indianapolis / Jacksonville / Tennessee)** — Sunbelt / Country / Southern.
- ⏳ **Batch 8 (suggested: NFC West — Arizona / LA Rams / San Francisco / Seattle)** — West Coast / Pacific.

29 extended-roster teams ÷ 4 per batch = 8 batches (final batch has 1 team, absorb wildcard slots).

---

## Never-shipped teams (`mode: 'special'` missing in `nflTeams.js`)

Codex flagged 2 teams during the Phase 1.13 discrete-fixes pass with `TODO(colorway-spec-v1)` at `nflTeams.js:283` and `nflTeams.js:1036`. These teams have no Special (Color Rush) palette and need Justin's explicit regional-variant approval AND fan verification BEFORE the `design-md-author` skill can be invoked.

Pull the two team names from the Phase 1.13 handoff when scoping the batch that includes them.

---

## Progress metrics (update when a batch closes)

- Teams with ✅ complete `-design.md`: 0 / 32
- Teams with 🟡 first-pass files (stub or draft): 3 / 32 (Eagles / Cowboys / Chiefs `-colorway.md` stubs)
- Teams with ⏳ not started: 29 / 32
- Batches complete: 0 / 8

---

## After a batch completes

1. Update this file — flip status icons, update progress metrics.
2. Retire each batch's legacy `-colorway.md` stubs if any exist.
3. Update the roster row in `slops-saloon/Blueprints/specs/team-colorway-system-spec-v1.md` §8 for each team.
4. If the batch surfaced a doctrine question (new failure mode, missing rule, edge case not covered by three tests), file it as an issue against the colorway spec + fan-experience doctrine before the next batch starts.