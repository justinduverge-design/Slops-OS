# Per-Team Design Documents

**Purpose:** per-team `design.md` files authored via the **`design-md-author` skill** (see `Blueprints/skills/design-md-author/SKILL.md`), one per NFL team.

**Status:** folder direction updated 2026-07-03 — the initial `-colorway.md` stubs are reference-only pre-skill-invocation drafts; canonical outputs are `[team-slug]-design.md` files authored via the skill.

---

## Canonical entry: `design-md-author` skill

**Do not hand-author `design.md` files.** Every per-team design doc in this folder is produced by invoking the `design-md-author` skill with the following inputs:

1. **Team name + `nflTeams.js` palette data** — the existing `mode: 'official' | 'special'` palettes at `slops-saloon/omen/frontend/src/data/nflTeams.js` for that team.
2. **Fan-experience doctrine** — `slops-saloon/Direction/decisions/slops-saloon-fan-experience-doctrine-v1.md`. The Look Good — Play Good axiom, two-sided presence, three-room mapping, regional-identity rule, and data-legibility invariant all bind the output.
3. **Team colorway system spec** — `slops-saloon/Blueprints/specs/team-colorway-system-spec-v1.md`. §2 token contract, §3 three tests, §6 methodology.
4. **Chant + fan-copy spec** — `slops-saloon/Blueprints/specs/chant-and-fan-copy-spec-v1.md`. §5 chant medium, §6 copy correctness, §7 empty-state inflection.
5. **Omen brand system** — `slops-saloon/omen/Brand/brand-system.md`. Palette, typography, voice, product pillars, logo usage.
6. **Omen design system v2** — `slops-saloon/omen/Blueprints/specs/omen-ux-ui-design-system-v1.md`. Component specifications, tokens.
7. **Existing `[team-slug]-colorway.md` stub** (if present) — reference material only; skill absorbs and supersedes it.

The skill enforces template compliance, doctrine inheritance, and produces a `design.md` that other SLOPS skills (`slops-ui-ux-audit`, `slops-code-review`) can consume without translation.

---

## File naming

`[team-slug]-design.md` where `team-slug` is the lowercase-hyphenated common team name.

Preferred:

- `eagles-design.md`
- `cowboys-design.md`
- `chiefs-design.md`
- `packers-design.md`

If disambiguation is needed (two teams share a city or a mascot), use `[city]-[team]-design.md`:

- `la-rams-design.md` / `la-chargers-design.md`
- `ny-giants-design.md` / `ny-jets-design.md`

Never author two files for the same team.

---

## Legacy `-colorway.md` files (transitional)

Three stubs exist as of 2026-07-03: `eagles-colorway.md`, `cowboys-colorway.md`, `chiefs-colorway.md`. These were pre-skill-invocation drafts created during the initial folder-prep pass. They contain useful reference material (regional signature picks, test outcomes, chant strings) but are NOT canonical outputs.

**Retirement path:** once a team's `-design.md` file lands via the skill, delete the corresponding `-colorway.md` file and update `_batch-tracking.md`. See the "Retire the priority-tier `-colorway.md` stubs" sprint item.

---

## Author cadence

Batched in slots of **4 teams per session** per the colorway spec §6 methodology.

**Each batch requires fan verification of at least one team** BEFORE the skill is invoked — the Region Test (colorway spec §3 Test 2) needs a resident's read on the regional signature. Priority-tier teams (Eagles / Cowboys / Chiefs) got Region-Test decisions during the initial doctrine pass; extended-roster teams need it batch by batch.

Regional-cluster suggestions live in `_batch-tracking.md`.

---

## After a `design.md` lands

1. Update `_batch-tracking.md` — flip team status, update progress metrics.
2. Update the summary row in `slops-saloon/Blueprints/specs/team-colorway-system-spec-v1.md` §8 team roster (link to the new `-design.md`, update Status column).
3. If the `design.md` names a chant string that differs from `nflTeams.js` `cultureTag` / `cry` / `wardRoom`, file a follow-up small edit against those fields.
4. If the `design.md` produces new tokens or a new implementation shape, file a follow-up Codex prompt for `frontend/src/lib/teamTheme.js` or the relevant component.

---

## Do not

- Hand-author `design.md` files bypassing the skill.
- Author a team's regional signature without fan / resident verification.
- Rename `mode: 'official' | 'special'` in code (naming reconciliation is docs-only per Phase 1.13 discrete-fixes).
- Ship a design.md whose colorway fails any of the three tests (colorway spec §3).
- Override any data-legibility semantic color (risk / confidence / data-source / position chips / platform / demo) with team color.
- Add a Special palette to a team that Justin has explicitly not approved a regional variant for.