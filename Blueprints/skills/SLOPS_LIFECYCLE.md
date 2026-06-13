# SLOPS Product Lifecycle & Skill Map

The master map of how a Slops product gets built: every **phase**, the **process artifact** that
runs it (skill / playbook / template), and its **status**. This is also the canonical
**keep / replace / drop** record for migrating off external tooling (e.g. gstack), and the
**build plan** for the missing skills.

When you ask "what skill or playbook handles X?" or "what should we build next?", start here.

## How to read this

- **Type:** `skill` = reusable workflow (`Blueprints/skills/<name>/SKILL.md`); `playbook`/`runbook`
  = procedural how-to (`Blueprints/playbooks/`); `template` = reusable shell (`Blueprints/templates/`);
  `doctrine` = a rule doc agents read.
- **Status:** `have` / `partial` / `gap`.
- All Slops-authored skills live **flat** under `Blueprints/skills/` and are indexed in
  `SKILL_ROUTING.md`. This map groups them by phase for reasoning; the folder stays flat for lookup.
- Every skill keeps the Slops contract: **Claude plans / Codex executes / Justin gates.**

## The lifecycle

| # | Phase | Process artifact | Type | Status |
|---|-------|------------------|------|--------|
| 1 | **Frame** — research + decide | `pre-build-research`, `dbs-research-to-architecture-router` | skill | have |
| 2 | **Plan** — goal → spec + ordered backlog | `planning-pass` (+ `Blueprints/specs/*`) | skill | have |
| 3 | **Build** — pull item → build → done | kickoff prompts + `definition-of-done.md` + `HOW-TO-RUN-THE-LOOP.md` | doctrine | have |
| 4 | **Version** — scoped branch/commit/PR | `slops-git-flow` | skill | have |
| 5 | **Review** — code + security before merge | `slops-code-review` | skill | have |
| 6 | **Quality** — health gate that ratchets | `slops-quality-baseline` | skill | have |
| 7 | **Design QA** — UI/UX + copy | `slops-ui-ux-audit`, `slops-ux-copy` | skill | have |
| 8 | **Verify** — functional / web / real-account QA | `slops-verify` (wraps `run-slops-saloon`) | skill | have |
| 9 | **Ship** — land → deploy → cutover | `slops-ship` orchestrator + `app-cutover-playbook`, `vps-hardening-plan`, hostinger runbook | playbook+skill | have |
| 10 | **Monitor** — post-deploy canary | `slops-canary` | skill | have |
| 11 | **Operate** — root-cause / debug / incident | `slops-investigate` | skill | have |
| 12 | **Learn** — retro → memory/decision_log | `slops-retro` | skill | have |
| 13 | **Scale** — scaffold the next product | `app-scaffold` template, `provider-adapter-template` | template | have |

## Auxiliary OS capabilities

These are net-new SLOPS utilities that support the lifecycle but do not replace a specific build phase.

| Capability | Process artifact | Type | Status | Notes |
|---|---|---|---|---|
| **Knowledge graph / cross-layer map** | `slops-graphify` | wrapper skill | have | Wraps external `graphifyy@0.8.36`; builds one L0↔L2 graph, output routed to `References/graphify/`. Two-pass: L0 doctrine, then `--update` on `slops-saloon/corvus` (166 code files a root scan misses). Smoke test passed 2026-06-09. Not a gstack replacement. |

## Keep / Replace / Drop — gstack migration record

This is the decision record Codex uses to finish its skill migration (its Step 1 inventory feeds here).

**KEEP (Slops version already exists — retire the gstack one):**
- git core / `ship` / `review` → `slops-git-flow`
- `health` / `benchmark` → `slops-quality-baseline`
- `design-review` / `design-shotgun` / `design-consultation` / `design-html` / design `qa` → `slops-ui-ux-audit` + `slops-ux-copy`
- `careful` / `freeze` / `unfreeze` / `guard` → AGENTS guardrails + `slops-git-flow` scoping

**REPLACE (real lifecycle phase, build a Slops skill):**
- `review` + `cso` → `slops-code-review` (Phase 5) — **built 2026-06-08** (gstack `review`/`cso` may now be quarantined)
- `canary` + `landing-report` → `slops-canary` (Phase 10) — **built 2026-06-08** (gstack `canary`/`landing-report` may now be quarantined)
- `land-and-deploy` / `setup-deploy` / `ship` → `slops-ship` (Phase 9) — **built 2026-06-08**
- `investigate` → `slops-investigate` (Phase 11) — **built 2026-06-08**
- `learn` + `retro` → `slops-retro` (Phase 12) — **built 2026-06-08**
- `browse` / `qa` / `qa-only` → `slops-verify`, formalized from `run-slops-saloon` (Phase 8) — **built 2026-06-08**
- `context-save` / `context-restore` → folded into `clean-up-checkpoint` — **done 2026-06-08**

**DROP (gstack-bound, external infra, or off-mission):**
- `gstack-upgrade`, `plan-tune`, `open-gstack-browser`, all `gstack-openclaw-*`, `setup-gbrain` / `sync-gbrain`, `pair-agent`
- `hackernews-frontpage`, `scrape` / `skillify`, `setup-browser-cookies`, `benchmark-models`
- `make-pdf` / `document-generate` / `document-release` → use existing doc tooling
- `autoplan` / `plan-ceo-review` / `plan-design-review` / `plan-devex-review` / `plan-eng-review` / `office-hours` / `ceo-review` → covered by `planning-pass` + brainstorming, unless you later want Slops versions

**Decided 2026-06-08 (remaining gstack items):** `codex` (Codex consult wrapper) → **KEEP**, pending a standalone-load check post-quarantine; drop only if broken. `devex-review` + gstack root `SKILL.md` → **quarantine** (recoverable); revisit `devex-review` as a future `slops-devex-review` if a DevEx phase is ever added.

## Build plan for the gaps

**Home & organization.** Every new skill lives at `Blueprints/skills/<name>/SKILL.md` (flat). Each is:
1. **Authored** with `slops-skill-author` against `Blueprints/skills/_template/SKILL.md` (Claude drafts).
2. **Registered** as a row in `SKILL_ROUTING.md`.
3. **Recorded** by flipping its status in this map.
4. **Installed** into Codex's skill dir via the Codex migration pass when Codex needs it.

**Order (waves):**
- **Wave 1 — strengthen the live app:** `slops-code-review`, `slops-canary` — **DONE 2026-06-08.**
- **Wave 2 — compound + release flow:** `slops-ship`, `slops-retro` — **DONE 2026-06-08.**
- **Wave 3 — depth:** `slops-investigate`, `slops-verify`, and context-save/restore folded into `clean-up-checkpoint` — **DONE 2026-06-08.**

Each new skill keeps plan-only / measure-only boundaries where applicable and never deploys, edits secrets, or touches production without Justin.

## Distribution (both Claude and Codex)

The skill is authored **once** and both agents load a copy. One source of truth, two installs.

- **Canonical source:** `Blueprints/skills/<name>/SKILL.md` (edit only here).
- **Claude (Claude Code):** `~/.claude/skills/<name>/`
- **Codex:** `~/.codex/skills/<name>/`

Rules:
- Edit the canonical copy in `Blueprints/skills`, then re-sync to both agent dirs. On conflict, the
  `Blueprints` copy wins.
- When a skill is added or changed, copy it to **both** agent dirs and re-verify it loads.
- The Codex migration pass (`Blueprints/prompts/codex-skill-migration.md`) performs the initial
  install into both dirs and is governed by the Keep/Replace/Drop record above.

**Shared set (install to both agents now):** `planning-pass`, `slops-git-flow`,
`slops-quality-baseline`, `slops-ui-ux-audit`, `slops-ux-copy`, `clean-up-checkpoint`, `slops-code-review`, `slops-canary`, `slops-ship`, `slops-retro`, `slops-investigate`, `slops-verify`, `slops-graphify`. Wave 1–3
skills join the shared set as each is authored.

## Open follow-ups (2026-06-08)

Tracked here so they survive context switches:

- Commit + re-sync the `slops-git-flow` lessons edit (branch placement, untracked companions, branch repair) to both agent dirs.
- Verify the kept `codex` skill loads post-quarantine; quarantine `devex-review` + gstack root `SKILL.md` (per the decision above).
- One-line fix to Codex's repo-inspector **read-list** so it stops reporting missing pre-DBS root `roadmap.md` / `manifesto.md` / `handoffs/` — point it at `Direction/*` + `Blueprints/handoffs/*`.
- Push/merge the accumulated local branches (Justin's gate) in both the SLOPS and Corvus repos.
- Product: Corvus **P1 Sleeper full-swap** proof when the test league drafts — see `slops-saloon/corvus/Direction/current_sprint.md` → "Waiting on external".

## Maintenance

- Add / rename / retire a skill → update **both** this map and `SKILL_ROUTING.md` in the same pass.
- This file is the source of truth for the gstack keep/replace/drop migration; Codex should not
  remove `gstack-latest` skills that are still marked KEEP-pending or REPLACE-not-yet-built here.
