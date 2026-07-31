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
- **Status:** `have` / `partial` / `gap` / `parked`.
- All Slops-authored skills live **flat** under `Blueprints/skills/` and are indexed in
  `SKILL_ROUTING.md`. This map groups them by phase for reasoning; the folder stays flat for lookup.
- Every skill keeps the Slops contract: **planner plans / executor executes / founder gates.**
  These are roles, not vendors. Which runtime is *eligible* for a role is recorded in
  Runtime Policy (`Blueprints/agents/AGENT_INDEX.md` §8); which runtime currently *holds*
  it comes from an Active Trust Assignment (§9). Eligibility is not authority, and no
  vendor or model name grants a role.

## The lifecycle

| # | Phase | Process artifact | Type | Status |
|---|-------|------------------|------|--------|
| 1 | **Frame** — research + decide | `pre-build-research`, `dbs-research-to-architecture-router` | skill | have |
| 2 | **Plan** — goal → spec + ordered backlog | `planning-pass` (+ `Blueprints/specs/*`) | skill | have |
| 3 | **Build** — pull item → vertical red/green slices → done | `slops-tdd` + kickoff prompts + `definition-of-done.md` + `HOW-TO-RUN-THE-LOOP.md` | skill+doctrine | have |
| 4 | **Version** — scoped branch/commit/PR | `slops-git-flow` | skill | have |
| 5 | **Review** — code + security before merge | `slops-code-review` | skill | have |
| 6 | **Quality** — health gate that ratchets | `slops-quality-baseline` | skill | have |
| 7 | **Design QA** — UI/UX + copy + mobile fit + taste | `slops-ui-ux-audit`, `slops-ux-copy`, `mobile-first-qa-playbook`, `slops-taste` | skill | have |
| 8 | **Verify** — functional / web / real-account QA | `slops-verify` (wraps `run-slops-saloon`) | skill | have |
| 9 | **Ship** — land → deploy → cutover | `slops-ship` orchestrator + `app-cutover-playbook`, `vps-hardening-plan`, hostinger runbook | playbook+skill | have |
| 10 | **Monitor** — post-deploy canary | `slops-canary` | skill | have |
| 11 | **Operate** — root-cause / debug / incident | `slops-investigate` | skill | have |
| 12 | **Learn** — retro → memory/decision_log | `slops-retro` | skill | have |
| 13 | **Scale** — scaffold the next product | `app-scaffold` template, `provider-adapter-template` | template | have — see template inheritance note below |

## Auxiliary OS capabilities

These are net-new SLOPS utilities that support the lifecycle but do not replace a specific build phase.

| Capability | Process artifact | Type | Status | Notes |
|---|---|---|---|---|
| **Knowledge graph / cross-layer map** | `slops-graphify` | wrapper skill | have | Wraps external `graphifyy@0.8.36`; builds one L0↔L2 graph, output routed to `References/graphify/`. Two-pass: L0 doctrine, then `--update` on `slops-saloon/omen` (166 code files a root scan misses). Smoke test passed 2026-06-09. Not a gstack replacement. |
| **Repo inspection / layer routing** | `slops-repo-inspector` | simple skill | have | Confirms L0/L1/L2 path truth, current source-of-truth docs, git state, and canonical-vs-installed skill authority before planning or editing. Prevents pre-DBS root roadmap/manifesto/handoff drift. |
| **Observability** | `self-hosted-observability-runbook` | package skill | have | Wires self-hosted Sentry, Umami, and log shipping for Slops products; closes the reusable errors/analytics/logging gap without adopting hosted SaaS. |
| **Legal** | `compliance-by-template` | wrapper skill | have | Drafts launch-required legal documents from approved open-agreements templates; pairs with `slops-legal-spot-check` for triage and still requires Justin/counsel review where flagged. |
| **Context discipline** | `slops-headroom` | wrapper skill | have | Compresses large tool outputs before they enter model context; install remains Justin-side and local-only network behavior must be audited on first use. |
| **Ingest** | `slops-markitdown` | wrapper skill | have | Converts local documents and media into Markdown for research/build-loop intake; Azure and paid API passes stay forbidden unless explicitly approved. |
| **Personal learning loop** | `slops-learning-loop` | simple skill | parked | Reactivate after Omen passes Release Done and has a stable seven-day product pulse; first use is a technology-choice learning and in-season improvement cycle. |
| **Community needs and resource research** | `slops-community-needs-research` | simple skill | parked | Far-future product discovery only; Justin must explicitly name the community, geography, need, and decision before reactivation. |
| **Product readiness / gap analysis** | `product-gap-analysis-session` | simple skill | have | Verifies current code and facts, then separates Have/Need/Gap and routes a phased plan; registered 2026-06-21 after an index-drift audit. |
| **AI design contracts** | `design-md-author` | package skill | have | Authors/normalizes product-root `design.md` files (Google DESIGN.md-format visual contracts for Claude/Codex/Gemini/Cursor). Compiles existing brand + UX-system + entity-identity doctrine into cited, guardrail-bearing tokens; does not invent design direction. Normalized to full template shape 2026-07-08 after a live compilation exercise for Omen's 32-team identity system. Pairs with `slops-design-system-pack` (reference systems) and `slops-ui-ux-audit` (post-build audit). |
| **Design-contract quality rubric** | `design-quality-bar` | package skill | **PLANNED — does not exist** | Standalone 10-item pass/fail rubric for catching generic/uncited/"vibe-coded" output in any design.md or brand-contract draft. **Correction:** previously described as "called as a mandatory step inside `design-md-author`'s Process Recipe". That was never implemented — `design-md-author/SKILL.md` contains zero references to it, and no `design-quality-bar` skill exists. The gate is unimplemented and the skill is absent. Not callable. |
| **UX/UI build-to-ship runbook** | `ux-ui-build-pipeline` | package skill | **PLANNED — does not exist** | Would orchestrate `design-md-author` → `design-quality-bar` (PLANNED, absent — no gate runs today) → design-source reconciliation (21st.dev Magic MCP — Omen's actual tool; Figma MCP connected but unused, Justin has no Figma files) → Codex build (must replace scaffold defaults with real design.md tokens) → `design:design-critique` + `design:accessibility-review` → `slops-ui-ux-audit` → report, with explicit gates at each stage. Names available MCP tooling honestly rather than assuming it (Playwright MCP recommended-but-not-installed). Surfaced that `slops-ui-ux-audit` is stale against the 2026-06-22 palette/font rebrand as part of its own authoring pass. Registered 2026-07-09. |

Notes:
- `slops-legal-spot-check` is active as pre-counsel triage support. It flags legal/compliance risk before publication but does not replace counsel or claim a lifecycle phase.
- `demo-mode-pre-empty-state` is active cold-start pattern doctrine. It supports first-run product design and mock/live honesty, but does not replace a lifecycle phase.

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
4. **Distributed** to both runtime skill dirs after approval, backup, and canonical-to-runtime hash verification.

**Order (waves):**
- **Wave 1 — strengthen the live app:** `slops-code-review`, `slops-canary` — **DONE 2026-06-08.**
- **Wave 2 — compound + release flow:** `slops-ship`, `slops-retro` — **DONE 2026-06-08.**
- **Wave 3 — depth:** `slops-investigate`, `slops-verify`, and context-save/restore folded into `clean-up-checkpoint` — **DONE 2026-06-08.**
- **Wave 4 — evidence quality:** `slops-tdd` and targeted author/investigate/review upgrades — **DONE 2026-06-21.** `slops-learning-loop` and `slops-community-needs-research` were authored, then parked by Justin on 2026-06-21.

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

**Shared set:** every canonical package whose routing status is `active` or `paired-with`, unless its
own contract records an explicit runtime exception. Retired rows are never installed. This rule keeps
the two runtimes deterministic as the skill set grows and replaces the stale hand-maintained list.
Parked skills remain canonical but are removed from runtime skill directories until their gate opens.

## Open follow-ups (2026-06-08)

Tracked here so they survive context switches:

- Commit + re-sync the `slops-git-flow` lessons edit (branch placement, untracked companions, branch repair) to both agent dirs.
- Verify the kept `codex` skill loads post-quarantine; quarantine `devex-review` + gstack root `SKILL.md` (per the decision above).
- Re-sync installed skills whose canonical Blueprints copies now differ; start with routing-sensitive skills such as `clean-up-checkpoint`, then sync the rest in a scoped migration pass.
- Push/merge the accumulated local branches (Justin's gate) in both the SLOPS and Omen repos.
- Product: Omen **P1 Sleeper full-swap** proof when the test league drafts — see `slops-saloon/omen/Direction/current_sprint.md` → "Waiting on external".

## Promotions — 2026-06-20

Batch-promoted 11 proposals from `_proposals/` to active skills (registered in `SKILL_ROUTING.md`). These are auxiliary OS/content capabilities, not lifecycle phases:

- **Content/animation:** `slops-screenplay-loop` → `slops-explainer-cut` (Manim math cuts; powers weekly "Omen of the Week — The Almost-Missed") → `slops-animation-render` (Remotion brand/social cuts). Note: a hand-drawn Ghibli-style series would need a future `slops-toon-render` (OpenToonz), not animation-render.
- **Design/asset:** `slops-image-prompt`, `slops-design-system-pack`.
- **Comms/finance:** `slops-exec-summary`, `slops-financial-sketch`.
- **Eng planning/QA:** `slops-ai-integration-review`, `slops-data-ingest-plan`, `slops-mobile-smoke`, `slops-product-pulse`.

Still parked in `_proposals/`: `slops-lore-review` (needs animated-series concept; seed in `series-seed.md`). Plan docs retained: `pm-skills-harvest-plan.md` (executed), `slops-graphify-v2-smoke-test.md`.

## Acquisition and distribution — 2026-06-21

- Added `slops-learning-loop`, adapted from `mattpocock/skills` `teach`.
- Added `slops-community-needs-research`, adapted from `coreyhaines31/marketingskills` customer/community research patterns.
- Added `slops-tdd`, adapted from `mattpocock/skills` TDD doctrine.
- Upgraded `slops-skill-author`, `slops-investigate`, and `slops-code-review` with invocation economics, red-capable feedback loops, and a safeguarded simplicity pass.
- Registered the existing `product-gap-analysis-session` skill, which was active in frontmatter but absent from both indexes.
- Reconciled the restored upstream `strategy-red-team` as a reference pattern only; no source repository, plugin, hooks, or dependency was installed.
- Later the same day, Justin parked `slops-learning-loop` until Omen is live plus seven stable days and parked `slops-community-needs-research` until explicit far-future product discovery.

## New skill — 2026-07-13

- Added `slops-content-ship` (Omen-local, `Layer 2`, `slops-saloon/omen/Blueprints/skills/slops-content-ship/`). Content-QC equivalent of `slops-ship`: a repeatable six-dimension gate (script, storyboard, footage, voiceover, captions, goal-communication) for promo/marketing video, prompted by a 2026-07-13 manual QC pass on `Brand/promos/omen-coming-soon/renders/omen-all-users-reel-vertical.mp4` that surfaced a real render defect and a missing VO-recording step. Reuses `marketing:brand-review`, `slops-legal-spot-check`, `design:accessibility-review`, `slops-ux-copy` rather than duplicating those checks. Logs runs to a new `Blueprints/playbooks/content-usage-ledger.md` (Omen-local, created alongside the skill). QC/gate only — no auto-fix, no publish authority.
- Added `slops-voiceover` (Omen-local, `Layer 2`, `slops-saloon/omen/Blueprints/skills/slops-voiceover/`, `skill_type: wrapper`, `upstream: voicebox@v0.5.0`). Wraps `jamiepine/voicebox` (MIT, local-first, `POST /speak` + MCP) to close the missing-VO gap `slops-content-ship` found twice. Compared against `debpalash/OmniVoice-Studio` (AGPL-3.0 — copyleft risk, reference-only, not wrapped), `aidrivencoder/voiceover-generator` (cloud ElevenLabs, paid, skipped), `OpenBMB/VoxCPM` (Apache-2.0, legit, but no bundled API — future-engine candidate, not v1), and `wildminder/awesome-ai-voice` (curated list, not a tool) — full comparison in `slops-voiceover/references/alternatives-considered.md`. Detects voicebox, never installs it; no cloud/paid fallback without explicit approval. Not yet installed or invoked for real as of authoring.

## Maintenance

- Add / rename / retire a skill → update **both** this map and `SKILL_ROUTING.md` in the same pass.
- This file is the source of truth for the gstack keep/replace/drop migration; Codex should not
  remove `gstack-latest` skills that are still marked KEEP-pending or REPLACE-not-yet-built here.

### Template inheritance: `app-scaffold`

A product scaffolded from `app-scaffold` inherits the **structure** of the layer it is
scaffolded into. It does **not** inherit authority.

- A scaffolded product inherits doctrine pointers, folder shape, and the definition of
  done from its layer.
- It does **not** inherit any trust tier, any Active Trust Assignment, or any prior
  approval. A new product starts at each runtime's `default_tier`, with
  `assignments: []`, exactly like any other scope.
- Scaffolding is a Tier 3 action. It never carries a Tier 4 or Tier 5 grant forward from
  the template or from the layer it was copied out of.
- Templates must not embed vendor-keyed role assignments. Where a template names who does
  what, it names **planner / executor / founder**, and the runtime is resolved at
  invocation from Runtime Policy.

### Activating a PLANNED design skill

`design-quality-bar` and `ux-ui-build-pipeline` are **PLANNED**. They are not `active`,
not `PARKED`, and not an executor's choice. No folder and no placeholder `SKILL.md` may
be created to make a routing row look consistent.

Restoring either to `active` requires all five steps, in order:

1. Create the skill.
2. Integrate the caller.
3. Test the gate.
4. Record evidence.
5. Only then restore ACTIVE.
