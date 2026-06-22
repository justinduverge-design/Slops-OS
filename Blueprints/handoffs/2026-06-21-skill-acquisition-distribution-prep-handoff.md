# Skill Acquisition and Distribution Prep Handoff

> **Resolved 2026-06-21.** The approved acquisition/distribution wave completed. See `Direction/reviews/2026-06-21-skill-acquisition-distribution-result.md`.

**Date:** 2026-06-21
**Layer:** L0 — SLOPS OS

## Files updated

- `Blueprints/prompts/skills-acquisition-distribution-session.md` — runnable acquisition, normalization, two-agent distribution, verification, and usage/gap audit prompt.
- `Blueprints/prompts/claude-skills-playbooks-acquisition-session.md` — marked the old OneDrive-era prompt as superseded.
- `Blueprints/prompts/README.md` — indexed the current and historical capability-session prompts.
- `Direction/reviews/2026-06-21-skill-acquisition-distribution-baseline.md` — recorded the verified pre-session inventory and blockers.
- `Blueprints/handoffs/2026-06-21-skill-acquisition-distribution-prep-handoff.md` — this continuation record.

## Files discussed

- Root/L1/L2 `AGENTS.md` and `CLAUDE.md` wrappers
- Shared agent modules
- `Blueprints/RESOURCES_INDEX.md`
- `Blueprints/skills/SKILL_ROUTING.md`
- `Blueprints/skills/SLOPS_LIFECYCLE.md`
- `Blueprints/prompts/codex-skill-migration.md`
- `Blueprints/handoffs/2026-06-11-skills-acquisition-handoff.md`
- Corvus kickoff modules, definition-of-done gates, audits, sprint, handoffs, and ledger

## Decisions made

- The next acquisition session must include distribution to both agents and end with a per-skill/per-procedure usage-evidence and gap audit.
- Installation, routing, textual reference, invocation, and evidenced output are separate adoption states.
- Stale absolute-root guidance must be resolved before bulk syncing canonical packages.

## Unresolved questions

- Whether every current canonical package should remain active after a future overlap and maintenance review.
- Resolved: `product-gap-analysis-session` is registered active.
- Resolved: active stale workspace paths were normalized before distribution.

## Blockers surfaced

- 34 of 48 canonical skill names are missing from each agent install.
- Twelve of the 14 present `SKILL.md` files differ from canonical for each agent.
- Canonical path guidance still mixes the active dev root with retired OneDrive paths.

## Last verified result

- Git root: `C:/Users/JDuve/dev/SLOPS`; branch: `master`; worktree was clean before this preparation pass.
- Canonical/routing/install inventory and SHA-256 comparisons completed read-only.
- No product build or test was applicable; `git diff --check` passed.

## Next recommended pull

Run the fresh-session discovery checks and the first bounded learning, community-research, and TDD pilots listed in the result report.
