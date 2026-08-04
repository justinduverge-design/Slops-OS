# DBS vNext discovery and architecture audit

> **Status:** DRAFT Solution for founder review.
> **Scope:** Slops OS #14, Slops OS #15, and Omen #278.
> **Safety:** Audit artifacts and non-mutating validators only. No existing artifact, application path, product decision, sprint item, Graphify output, or external service was changed.

## Baseline and workspace

The original checkouts did not both satisfy the requested branch/clean-state assumptions. They were preserved unchanged. Discovery ran in clean sibling worktrees:

| Repository | Audit worktree | Branch | Baseline | Default remote branch |
| --- | --- | --- | --- | --- |
| Slops OS | `C:\Users\JDuve\dev\dbs-vnext-migration\Slops-OS` | `refactor/dbs-vnext-migration` | `814f77a829dd10a53601354e167adedb58c6ecdf` | `origin/master` |
| Omen | `C:\Users\JDuve\dev\dbs-vnext-migration\omen` | `refactor/dbs-vnext-migration` | `065d4677d79c7ce9afe10b6cdb981d41f40a5471` | `origin/main` |

At discovery start, the original Slops checkout was on `codex/status-model-truth-gate` with an unrelated `Blueprints/agents/AGENT_INDEX.md` modification. The original Omen checkout was clean on `main` and one commit behind `origin/main`. No switch, reset, stash, or overwrite was performed there.

## Review order

1. [Executive findings](executive-findings.md)
2. [Direction v1 proposal](direction-schema-v1-proposal.md)
3. [Target trees](target-trees.md)
4. [Migration manifest](migration-manifest.md)
5. [Implementation phases](implementation-phases.md)
6. [Validation plan](validation-plan.md)
7. Supporting audits and inventories below

## Deliverables

| Artifact | Purpose |
| --- | --- |
| [Tool capability manifest](tool-capability-manifest.md) | Available, optional, missing, replaceable, CI, local-only, and approval-gated tools. |
| [Slops OS inventory](slops-os-inventory.md) | Generated path-by-path L0/L1 governance inventory. |
| [Omen inventory](omen-inventory.md) | Generated path-by-path product/governance/config inventory and code-boundary map. |
| [Routing audit](routing-audit.md) | OpenAI/Claude entry behavior, precedence, context volume, and target routing. |
| [Prompt and agent audit](prompt-agent-audit.md) | Survival classification, registries, loaders, wrappers, and cleanup sequence. |
| [Graphify audit](graphify-audit.md) | Current graph truth, gaps, ownership, exclusions, and proposed workspace design. |
| [Direction v1 proposal](direction-schema-v1-proposal.md) | Permanent planning interfaces, IDs, links, transitions, promotion, versioning, and archival. |
| [Draft schema fixtures](schemas/README.md) | Four non-authoritative JSON Schema 2020-12 drafts. |
| [Target trees](target-trees.md) | Evidence-based Slops OS and Omen roots, ownership, routing, and current mapping. |
| [Migration manifest](migration-manifest.md) | Human execution rules and high-confidence mappings. |
| `data/migration-manifest.json` | All 1,278 per-artifact moves/dispositions/repairs/validation/rollback/commit groups. |
| [Validation plan](validation-plan.md) | Current observations plus implementation acceptance matrix. |
| [Implementation phases](implementation-phases.md) | Thirteen gated phases from baseline through closure. |

Generated evidence under `data/` includes the full artifact inventory, summary counts, exact duplicates for both the relevant text/config corpus and every tracked blob, bounded near-duplicate candidates, link findings, and migration manifest. Generated files are reproducible from tracked baseline inputs; they are review evidence, not authority.

## Reproduce the inventory

From the isolated Slops OS worktree:

```powershell
node --check Solutions/audits/dbs-vnext/scripts/build-inventory.mjs
node Solutions/audits/dbs-vnext/scripts/build-inventory.mjs `
  --slops C:\Users\JDuve\dev\dbs-vnext-migration\Slops-OS `
  --slops-ref 814f77a829dd10a53601354e167adedb58c6ecdf `
  --omen C:\Users\JDuve\dev\dbs-vnext-migration\omen `
  --omen-ref 065d4677d79c7ce9afe10b6cdb981d41f40a5471 `
  --out C:\Users\JDuve\dev\dbs-vnext-migration\Slops-OS\Solutions\audits\dbs-vnext
```

The script reads each pinned baseline commit tree, so the audit remains reproducible after this package is committed and never inventories itself. It uses direct path/link detection, normalized SHA-256, and bounded SimHash triage. Heuristic dispositions are deliberately conservative; `REVIEW` means founder or artifact-level evidence is still required.

Run the package validator after all deliverables exist:

```powershell
node Solutions/audits/dbs-vnext/scripts/validate-audit.mjs `
  --audit C:\Users\JDuve\dev\dbs-vnext-migration\Slops-OS\Solutions\audits\dbs-vnext `
  --slops C:\Users\JDuve\dev\dbs-vnext-migration\Slops-OS `
  --omen C:\Users\JDuve\dev\dbs-vnext-migration\omen
```

## Scope limits

- Inventory metadata and automated dispositions are proposals, not accepted decisions.
- Direct reference counts do not capture every semantic dependency.
- Near-duplicate candidates are review leads, not merge authorization.
- Binary/media files are counted in root boundaries but not semantically interpreted en masse.
- No application build, deployment, live-provider test, native emulator/simulator run, Graphify regeneration, or external write was performed.
- Omen source stays at its current build/runtime boundaries during this phase.

## Review decisions requested

Founder review should explicitly decide:

1. the proposed target trees and code no-move boundary;
2. Direction v1 record layout, lifecycle, IDs, `dbs://` links, and schema-cache ownership;
3. the classification policy for the 163 `REVIEW` artifacts;
4. whether to authorize implementation phases 5–7 after baseline/fixture preparation.

Until those decisions are accepted, this entire directory remains a Solution and must not be treated as current Direction or approved Blueprint truth.
