# DBS vNext implementation phases

> **Status:** DRAFT. Phases 5–13 are proposed future work and are not authorized by this audit.
> **Rule:** one repository and one concern per commit group. Documentation migration and code-boundary migration never share a commit.

## Phase gates

| Phase | Purpose | Entry gate | Required work | Exit evidence | Typical commit group |
| ---: | --- | --- | --- | --- | --- |
| 1 | Structural freeze and baseline | Founder schedules implementation window. | Fetch remotes; verify both worktrees; record default branches, commits, dirty state, CI state, and active work; create approved pre-migration tags. | Signed/annotated baseline IDs, clean implementation worktrees, unrelated work preserved. | `chore: record DBS vNext migration baseline` |
| 2 | Inventory | Baseline fixed. | Re-run the deterministic inventory; review broken links, duplicates, generated files, authority claims, code/deploy consumers, and every `REVIEW` row. | Regenerated manifests match tracked corpus; all high-risk rows have owners. | `docs: refresh DBS vNext migration inventory` |
| 3 | Target architecture ratification | Issues #14/#278 and audit review complete. | Founder accepts, edits, or rejects root trees, ownership boundaries, disposition rules, Graphify ownership, and code no-move scope. | Accepted Slops OS decision with Omen application link; no unresolved structural contradiction. | `docs: ratify DBS vNext target architecture` |
| 4 | Direction schema ratification | Target ownership accepted. | Resolve the four ratification questions; approve status transitions, IDs, links, promotion, cache distribution, archival rules, and fixtures. | Accepted Slops OS decision; canonical v1 schemas and migration guide in Blueprints; Omen cache design approved. | `docs: define Direction planning contract v1` |
| 5 | Thin entry-layer creation | Schemas and source ownership accepted; cold-start fixtures prepared. | Create shared canonical routing; reduce root `AGENTS.md`/`CLAUDE.md` to vendor-specific capability adapters; preserve unique `AGENT.md` rules before retiring that surface; route Direction first. | Root and scoped OpenAI/Claude fixtures reach the same facts, rules, and product boundaries within the context budget. | Slops and Omen each use isolated `refactor: add DBS vNext thin runtime adapters` commits. |
| 6 | Knowledge migration | Thin adapters pass on unchanged tree. | Use `git mv` and the manifest to move reviews, evidence, contracts, proposals, and history into correct DBS owners; convert legacy root context/indexes; repair links in each commit. | Exact-case links pass; authority scan finds no unapproved competing truth; Omen current facts unchanged. | Separate commits per repository and semantic class. |
| 7 | Prompt and agent cleanup | Canonical routing works and knowledge owners are stable. | Apply six-class prompt disposition; archive executed prompts; merge reusable model-neutral workflows; reconcile agent registry/candidates/trust assignments; remove legacy role-folder autoload only after unique-content proof. | Loader, registry, provenance, context-size, and vendor-parity checks pass; no orphaned callable agent. | `refactor: consolidate DBS prompts and agent routing` (separate per repository). |
| 8 | Optional Omen code-boundary migration | Knowledge migration closed; separate founder decision identifies a measurable code benefit. | Re-evaluate `client/` and any apps/services/packages proposal against build, runtime, ownership, dependency, CI, Docker, and deploy evidence. Keep current paths if no material benefit. | All Omen tests/builds/workflows/deploy-path checks pass; no mixed documentation move. | Dedicated Omen code-only commits/PR. This phase may be skipped. |
| 9 | Graphify regeneration | Final approved paths are stable; wrapper and exclusions are reviewable. | Restore/canonicalize Slops-owned wrapper; pin Graphify version; generate one workspace graph into Slops `References/graphify/`; optionally derive Omen view; record sources, commit pair, exclusions, config, hashes, freshness. | Both repos covered; zero authority claims from graph; missing-source and stale-path thresholds pass; old cache recovery proven before cleanup. | `chore: regenerate DBS workspace reference graph` plus separate generated-cache cleanup. |
| 10 | Context-health tooling | Canonical tree and graph exist. | Add deterministic checks for schema/version, Direction size/currentness, IDs, links, supersession, promotions, duplicate authority, absolute paths, generated provenance, adapter budgets, and schema-cache parity. | Local and CI fixtures pass; failures are actionable and do not auto-rewrite truth. | `test: add DBS context-health validation` |
| 11 | OpenAI cold-start validation | Tooling green and Codex runtime available. | Start clean evaluations at Slops root, Omen root, web, iOS, Android, API, deploy, governance, and future business-governance boundaries. Test current facts, authority, required reads, forbidden history, and write posture. | Recorded prompt/input sources, answers, token/byte budget, and zero critical divergence. | Evidence-only report; adapter fixes isolated. |
| 12 | Claude cold-start validation | Same tree/fixtures as phase 11; Claude runtime available. | Run equivalent Claude sessions using supported `CLAUDE.md` behavior; compare outcomes rather than vendor wording. | Same current truth, contracts, boundaries, and authority results as OpenAI; explained capability-only differences. | Evidence-only report; adapter fixes isolated. |
| 13 | Closure and migration report | All required phases green; optional phase 8 explicitly completed or skipped. | Reconcile Direction, close issues, publish migration ledger, unresolved debt, rollback anchors, context-size deltas, tool versions, and Graphify freshness. Archive temporary compatibility material. | Founder accepts closure; no active contradiction; worktrees/branches/PRs and deployment scope reported exactly. | `docs: close DBS vNext migration` |

## Mandatory stop conditions

Stop the active phase and preserve the last green commit when:

- an Omen product fact, provider rule, native-mobile priority, or release boundary changes without an accepted decision;
- a move would break a build/CI/deploy/runtime path and no same-phase repair is proven;
- OpenAI and Claude resolve different authority or current truth;
- a Direction conversion cannot preserve IDs, supersession, blockers, or closure evidence;
- a `REVIEW` row is being treated as a move/delete without direct evidence;
- Graphify input, commit pair, exclusions, or generated provenance cannot be reproduced;
- unrelated dirty work appears in an implementation worktree.

## Proposed review sequence

Founder review should decide architecture before file placement details:

1. accept or amend target ownership and no-move code boundary;
2. ratify Direction v1 lifecycle, IDs, links, and schema distribution;
3. approve the `REVIEW` triage policy and delete threshold;
4. authorize phases 5–7 as separate implementation work;
5. decide later whether phase 8 has any product value.

The first implementation commit after approval should establish the immutable baseline and fixtures. It should not move a file.
