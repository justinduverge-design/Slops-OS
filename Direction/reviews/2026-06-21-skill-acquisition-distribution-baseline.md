# Skill Acquisition and Distribution Baseline

**Date:** 2026-06-21
**Layer:** L0 — SLOPS OS
**Purpose:** Establish the pre-session baseline for skill acquisition, distribution, adoption evidence, and procedure coverage.

## Definition of done for the upcoming session

Approved capabilities are acquired and normalized, every approved active SLOPS skill is hash-verified in both Claude and Codex, and a final audit shows where skills and procedures are installed, routed, actually evidenced in use, and still missing.

## Verified baseline

| Area | Current state | Gap |
|---|---:|---|
| Canonical skill package directories | 48 | One package is not registered in routing. |
| `SKILL_ROUTING.md` rows | 48: 46 active, 1 paired, 1 retired | `product-gap-analysis-session` is canonical/active in frontmatter but absent from routing; retired `slops-markdown-authoring` is a history-only row with no package directory. |
| Codex installs matching canonical names | 14 of 48 present | 34 missing. Two `SKILL.md` files match canonical content; 12 differ. Strict folder equality is one because `slops-repo-inspector` has extra Codex runtime metadata. |
| Claude installs matching canonical names | 14 of 48 present | 34 missing. Two `SKILL.md` files match canonical content; 12 differ. |
| L0 playbooks | 6 | Caller/adoption evidence is not indexed consistently. |
| Shared kickoff modules | 5 | Strong procedural wiring exists, but skill selection is named only at the plan gate. |
| Omen done gates | 7 gate files plus ledger | Several gates name skills directly; other lifecycle skills have no comparable evidence field. |

The two canonical `SKILL.md` files matching both installs are `slops-graphify` and `slops-repo-inspector`. The latter has an extra Codex-only `agents/openai.yaml`, which should be reported separately rather than treated as canonical content drift.

## Current cross-layer use evidence

### Strong procedure wiring

- L0, L1, and L2 `AGENTS.md` / `CLAUDE.md` wrappers inherit the shared identity, action posture, resource index, read-first, prohibition, handoff, and graphify modules.
- Omen kickoff modules enforce task selection, plan approval, guardrail declaration, safety stops, verification, commit discipline, sprint closure, decision logging, and handoff creation.
- Omen `Blueprints/definition-of-done.md` routes work into per-type gate files and the evidence ledger.
- `feature-done.md` requires `slops-code-review` and, for UI, `slops-ui-ux-audit`.
- `security-done.md` requires security review evidence through `slops-code-review`.
- Omen contains dated audits, handoffs, sprint entries, and done-ledger records showing real `slops-code-review` use.

### Adoption signal, not proof

A pre-report reference scan excluding canonical skill files, archives, imported agents, and old prompts found:

- 45 of 48 canonical skill names referenced somewhere outside their own package.
- 13 skill names referenced in live L2 material.
- No direct skill-name references in L1 material.
- Three names with no external reference before this preparation pass: `product-gap-analysis-session`, `slops-repo-inspector`, and `slops-ship`.

These counts are discovery signals only. The final audit must distinguish a name appearing in a document from an invocation with an output or verdict.

## Blocking issues before bulk distribution

1. **Path authority drift.** The active Git root is `C:\Users\JDuve\dev\SLOPS`, while multiple canonical skills and routing docs still name `C:\Users\JDuve\OneDrive\Desktop\SLOPS`. Blind syncing would distribute stale path assumptions.
2. **Registry mismatch.** `product-gap-analysis-session` declares itself active but is absent from `SKILL_ROUTING.md` and the lifecycle map.
3. **Distribution gap.** Both agents are missing 34 canonical skill names, and most present copies differ from canonical.
4. **Load verification gap.** Existing records mostly prove file presence, not runtime discovery/load behavior.
5. **Adoption-evidence gap.** L2 has strong evidence for a small set of guardrail skills, while most active skills are only routed or mentioned.
6. **L1 discoverability gap.** Wrapper inheritance exists, but no direct skill-name entry points were found in live L1 material.
7. **Graph freshness/precision gap.** The root graph query returned migration-era nodes rather than a reliable current skill-adoption map; it cannot serve as the final evidence source without refresh or manual reconciliation.

## Required final audit shape

The post-session report must include:

1. A per-skill canonical/Claude/Codex reconciliation table.
2. A per-skill L0/L1/L2 routing and actual-use evidence table.
3. A procedure map covering lifecycle, wrappers, kickoff, done gates, playbooks, handoffs, and decision logging.
4. Gap classification: registry, distribution, runtime load, stale path, missing entry point, referenced-only, lifecycle coverage, overlap, dependency, and evidence.
5. Prioritized corrective actions with the smallest safe next step.

## Sources inspected

- `AGENTS.md`, `CLAUDE.md`, and shared agent modules
- `Direction/facts-of-record.md`, `Direction/decision_log.md`
- `Blueprints/RESOURCES_INDEX.md`
- `Blueprints/skills/SKILL_ROUTING.md`, `SLOPS_LIFECYCLE.md`, and canonical skill packages
- `Blueprints/prompts/claude-skills-playbooks-acquisition-session.md`
- `Blueprints/prompts/codex-skill-migration.md`
- `Blueprints/handoffs/2026-06-11-skills-acquisition-handoff.md`
- L1/L2 wrappers, Omen kickoff modules, definition-of-done files, audits, handoffs, sprint, and ledger evidence
- `$HOME/.codex/skills/` and `$HOME/.claude/skills/`

## Intentionally not touched

- No skills were acquired, installed, distributed, retired, or deleted.
- No package files, secrets, app source, database, deployment, or production state changed.
- No push, merge, or external connector action occurred.

## Next safe step

Run `Blueprints/prompts/skills-acquisition-distribution-session.md`. Resolve path and registry authority before any bulk distribution.
