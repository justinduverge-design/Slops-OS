# Skill Acquisition and Distribution Result

**Date:** 2026-06-21
**Layer:** L0 — SLOPS OS
**Status:** canonical authoring, registration, and two-runtime file distribution complete; fresh-session discovery and real-use evidence remain open where noted

> **Subsequent 2026-06-21 sequencing decision:** `slops-learning-loop` and `slops-community-needs-research` were parked after this point-in-time distribution result. Their runtime copies were backed up at `C:\Users\JDuve\.slops-skill-parked-backup-20260621-202704` and removed; current counts and activation gates are authoritative in `Blueprints/RESOURCES_INDEX.md`, `SKILL_ROUTING.md`, and `SLOPS_LIFECYCLE.md`. Omen procedure wiring is reported in `slops-saloon/omen/Direction/reviews/2026-06-21-skill-playbook-operationalization.md`.

## Outcome

- Added three SLOPS-owned skills: `slops-learning-loop`, `slops-community-needs-research`, and `slops-tdd`.
- Upgraded `slops-skill-author`, `slops-investigate`, and `slops-code-review` with the approved external methods.
- Registered and normalized the existing `product-gap-analysis-session` skill.
- Restored `strategy-red-team` as a reference-only PM pattern and retained prioritization/WWA as a separate procedure.
- Normalized active OneDrive-era workspace paths to Git-root-relative paths.
- Fixed invalid `slops-taste` YAML metadata found by the loader-oriented parse check.
- Distributed all 51 active/paired canonical packages to both Claude and Codex after backup.
- Installed no external repository, plugin, hook, package, connector, model, or dependency.

## What Was Acquired

| SLOPS artifact | Adapted method | Operating boundary |
|---|---|---|
| `slops-learning-loop` | `mattpocock/skills` teach: retrieval, deliberate practice, feedback, spacing, interleaving | Education only; no diagnosis, treatment, personalized investing, or sensitive-record collection by default. |
| `slops-community-needs-research` | `coreyhaines31/marketingskills` customer/community research | Measures verified help, access, freshness, response, unmet need, and harm—not leads or revenue; outreach/data collection requires approval and consent. |
| `slops-tdd` | `mattpocock/skills` vertical red-green-refactor TDD | One observable behavior slice at a time through existing test tools; no installs, deploys, migrations, or unrelated refactors. |
| `slops-skill-author` 1.0 | `writing-great-skills` invocation economics, progressive disclosure, checkable completion, no-op/sediment/sprawl pruning | Canonical authoring only; runtime distribution remains approval-gated. |
| `slops-investigate` 1.0 | `diagnosing-bugs` tight deterministic red-capable feedback loop | Read-only against production; no hot-patches. |
| `slops-code-review` 1.0 | Ponytail's YAGNI → standard library → native platform → existing dependency → minimum-code ladder | Never deletes or weakens security, validation, accessibility, observability, data integrity, or accepted behavior. |
| `strategy-red-team.md` | `phuryn/pm-skills` load-bearing assumptions, steelman/attack, fails-if, evidence, kill criterion, cheapest test | Reference-only; no full PM plugin installation. |

## Where the Skills and Procedures Are Used

| Capability | Current operating use | Adoption state |
|---|---|---|
| Skill authoring | `hard-prohibitions.md`, `RESOURCES_INDEX.md`, `SKILL_ROUTING.md`, `SLOPS_LIFECYCLE.md`, and the acquisition prompt route new/materially revised skills through `slops-skill-author`. This batch used that procedure. | Evidenced use |
| Build/TDD | Lifecycle Phase 3 now invokes `slops-tdd`. Kickoff `read-first`, `plan-approval`, `safety-gates`, and `done-and-close` require the TDD read, planned red-capable command, correct RED handling, and RED/GREEN evidence for behavior-changing code. | Procedure-integrated; first product run pending |
| Investigation | Lifecycle Phase 11 routes bugs/incidents to `slops-investigate`; its skill now blocks hypothesis-first diagnosis without a faithful failing signal or equivalent evidence. | Routed; upgraded procedure not yet exercised |
| Code/security review | Lifecycle Phase 5, kickoff safety gates, done gates, Omen audits/handoffs, and prior decision records already use `slops-code-review`; new runs now also apply the safeguarded simplicity ladder. | Existing evidenced use; upgraded lens pending first run |
| Product readiness | `product-gap-analysis-session` is now in routing and lifecycle auxiliary capabilities instead of being an unindexed package. | Installed/routed; explicit invocation evidence pending |
| Personal learning | `slops-learning-loop` is registered as an auxiliary capability and available in both runtimes. | Installed/routed; no learning plan or retention evidence yet |
| Community product discovery | `slops-community-needs-research` is registered as the gate before planning a community-information/basic-needs app. | Installed/routed; no scoped community study yet |
| PM strategy challenge | `SKILL_ROUTING.md` special routing points strategy red-team requests to the reference pattern. | Reference-routed; not an active skill |

## Distribution Evidence

- Canonical registered entries: **52** — 50 active, 1 paired, 1 retired.
- Canonical active/paired packages: **51**; the retired routing-only entry intentionally has no package.
- Existing packages backed up: **28** total (14 per runtime).
- Backup: `C:\Users\JDuve\.slops-skill-sync-backup-20260621-200709`.
- Packages copied: **102** (51 × 2 runtimes).
- Canonical file copies hash-verified: **118**.
- SHA-256 mismatches or missing canonical files: **0**.
- Runtime active/paired package presence: **51 Codex**, **51 Claude**.
- Preserved runtime-only file: Codex `slops-repo-inspector/agents/openai.yaml`; it does not conflict with canonical behavior.
- Active/proposed instruction references to the retired OneDrive workspace: **0** in `Blueprints/skills` and `Blueprints/agent-modules`.

## Remaining Gaps

### P1 — verify runtime discovery in fresh sessions

File presence and hashes are proven, but the current agent session loaded its skill catalog before distribution. Start one fresh Claude session and one fresh Codex session and confirm that each can discover `slops-learning-loop`, `slops-community-needs-research`, and `slops-tdd` by trigger. Do not label this load-tested until that occurs.

### P1 — normalize the legacy skill catalog

Only **15 of 51** active/paired packages contain every field required by the current template. **36** legacy packages lack one or more of `status`, `skill_type`, `layer`, `default_agent`, `trigger`, `version`, `upstream`, or `owner`. They remain loadable because names/descriptions and routing validate, but governance and maintenance are inconsistent. Normalize them in scoped waves; do not churn all workflows without an overlap/prior-use review.

### P1 — collect real-use and prior-use evidence

The three new skills and four materially revised skills have no `notes/prior-use-review.md`. Run bounded pilots, then record trigger accuracy, unnecessary steps, safety corrections, output usefulness, and verification failures. Current catalog totals are one prior-use file, zero skill test files, and one example file, so procedure regression coverage is weak.

### P1 — community app discovery is not product delivery

No community, geography, needs category, service inventory, consent plan, provider-verification workflow, correction channel, or resource-freshness SLA has been selected. The new skill is the research gate; there is not yet an app specification, backend contract, data model, or implementation plan.

### P2 — personal-development curricula are not yet sequenced

The learning loop can teach across programming, AI engineering, financial literacy, physical health, emotional health, and mental health, but there is no baseline assessment, ordered curriculum, practice project, review calendar, or progress evidence in any domain. Health and financial work also requires domain-specific authoritative sources and professional boundaries per session.

### P2 — future drift is still manually controlled

This distribution was a verified manual sync. There is no checked-in, dry-run-first sync/audit script or CI check for routing-to-folder parity, required metadata, and canonical-to-runtime hashes. Automating it would reduce drift, but runtime writes and backups must remain explicit and user-gated.

### Held acquisitions

- `cybersecurity-skills`: held because the inspected root license file was missing and its OWASP/NIST baselines lag current standards.
- Ponytail: method harvested; plugin/global hooks not installed.
- OpenCut: watchlist/reference only; no current product requirement and upstream rewrite risk.
- Full `marketingskills`, `mattpocock/skills`, and `pm-skills`: not installed because bounded adaptations avoid overlapping doctrine.
- `pm-ai-shipping`: not installed; its review concept overlaps current SLOPS review/quality/done gates.

## Next Safe Steps

1. Run fresh-session discovery checks in Claude and Codex.
2. Pilot `slops-learning-loop` on one programming/AI capability and record a prior-use review.
3. Select one narrowly defined community/geography/need and run `slops-community-needs-research` before drafting an app specification.
4. Use `slops-tdd` on the next approved backend behavior change and retain RED/GREEN evidence.
5. Normalize the 36 legacy packages in small lifecycle-based waves after overlap review.

## Sources and Files Used

- `Direction/reviews/2026-06-21-github-skill-acquisition-research.md`
- `Direction/reviews/2026-06-21-skill-acquisition-distribution-baseline.md`
- `Blueprints/skills/_template/SKILL.md`
- `Blueprints/skills/SKILL_ROUTING.md`
- `Blueprints/skills/SLOPS_LIFECYCLE.md`
- `Blueprints/RESOURCES_INDEX.md`
- `Blueprints/prompts/kickoff-modules/`
- `References/patterns/pm-skills/`

## Intentionally Not Touched

- Omen product source, tests, database, auth, payments, package files, environment files, deploy configuration, and production.
- Front-end components and Claude-owned design work.
- Git commit, push, PR, merge, and external outreach.
