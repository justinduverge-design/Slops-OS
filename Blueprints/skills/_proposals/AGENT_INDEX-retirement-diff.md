# AGENT_INDEX Retirement Diff (PROPOSAL)

**Date:** 2026-06-11
**Status:** approved by Justin pending Codex execution
**Scope:** Remove 11 candidate wrappers from `AGENT_INDEX.md` Section 5 that are shadowed by active SLOPS skills. Imported source files in `_imported/` stay untouched and remain `reference-only`.

## Rows to Remove (Section 5)

| Wrapper file | Shadowed by | Action |
|---|---|---|
| `engineering-code-reviewer.md` | `slops-code-review` | Delete row + file |
| `engineering-sre-advisor.md` | `slops-canary` + `slops-investigate` | Delete row + file |
| `engineering-software-architect.md` | `dbs-research-to-architecture-router` + plugin `engineering:architecture` | Delete row + file |
| `engineering-technical-writer.md` | `slops-markdown-authoring` | Delete row + file |
| `engineering-security-engineer.md` | `security-privacy-evidence` + `rbac-risk-review` | Delete row + file |
| `engineering-codebase-onboarding-engineer.md` | `slops-graphify` | Delete row + file |
| `design-ui-designer.md` | `slops-ui-ux-audit` | Delete row + file |
| `design-whimsy-injector.md` | `slops-ux-copy` | Delete row + file |
| `product-manager.md` | `planning-pass` + plugin `product-management:write-spec` | Delete row + file |
| `product-sprint-prioritizer.md` | `planning-pass` | Delete row + file |
| `specialized-workflow-architect.md` | `workflow-tree-spec` | Delete row + file |

## What Stays

- All `_imported/__*_division/` source files — non-authoritative, kept as reference.
- All other candidate wrappers in Section 5 not listed above — pending Bucket 2/3 conversion in a later pass.
- AGENT_INDEX Sections 1-4, 6, 7 — unchanged.

## What Codex Does

1. Confirm each shadowed-by skill exists at `Blueprints/skills/<name>/SKILL.md` before deleting any wrapper.
2. Delete the 11 wrapper files listed above from `Blueprints/agents/<division>/`.
3. Remove the 11 matching rows from `AGENT_INDEX.md` Section 5.
4. Add a one-line note to `AGENT_INDEX.md` Section 4 Promotion Process: "Wrappers shadowed by an active SLOPS skill are retired; see Blueprints/handoffs/2026-06-11-skills-acquisition-handoff.md."
5. Commit message: `chore(agents): retire 11 wrappers shadowed by SLOPS skills`.

## Risk

- **Low.** All 11 wrappers are Tier-2 advisory-only. None are referenced by active prompts or skills (grep first to confirm).
- Reversible: imported source remains in `_imported/`; a new wrapper can be re-generated via `agent-wrapper-generator` if a gap appears.

## Verification (after Codex runs)

- `grep -r <wrapper-name> Blueprints/ Direction/` returns no references except the handoff.
- `AGENT_INDEX.md` Section 5 row count drops by 11.
- All 11 shadow-skills still load via `command-bridge-generator` dry-run.

## Changelog
- 2026-06-11 — diff approved by Justin; pending Codex execution gate.
