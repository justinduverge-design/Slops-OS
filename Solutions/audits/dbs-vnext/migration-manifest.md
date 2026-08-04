# DBS vNext migration manifest

> **Status:** DRAFT execution map for founder review. Nothing in this manifest authorizes a move, merge, conversion, archive operation, or deletion.
> **Governing issues:** Slops OS #14, Slops OS #15, Omen #278.
> **Inventory baselines:** Slops OS `814f77a829dd10a53601354e167adedb58c6ecdf`; Omen `065d4677d79c7ce9afe10b6cdb981d41f40a5471`.

## 1. Complete machine-readable manifest

`data/migration-manifest.json` is the implementation-level manifest for all 1,278 inventoried artifacts. Every entry includes:

- repository and baseline commit,
- old path and proposed new path,
- one of `KEEP`, `MERGE`, `CONVERT`, `MOVE`, `ARCHIVE`, `DELETE`, or `REVIEW`,
- reason and authority impact,
- detected inbound and outbound reference paths plus repair instructions,
- required validation, risk, rollback approach, proposed commit group,
- whether founder ratification is required.

`data/artifact-inventory.json` retains the fuller classification and file metadata. The two generated Markdown inventories are the human-readable path-by-path views. The JSON is intentionally exhaustive because a Markdown table with 1,278 wide rows would be difficult to review and easy to truncate.

### Disposition summary

| Repository | KEEP | MERGE | CONVERT | MOVE | ARCHIVE | DELETE | REVIEW | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Slops OS | 340 | 8 | 16 | 18 | 22 | 0 | 101 | 505 |
| Omen | 420 | 3 | 12 | 88 | 5 | 181 | 64 | 773 |
| **Total** | **760** | **11** | **28** | **106** | **27** | **181** | **165** | **1,278** |

All 181 `DELETE` proposals are reproducible files under Omen's tracked `graphify-out/cache/`. They must remain untouched until a ratified workspace graph has been generated, validated, and proven to supersede them. No source, decision, prompt, or historical evidence received an automatic `DELETE` disposition.

## 2. Disposition semantics

| Disposition | Implementation meaning | Approval/evidence gate |
| --- | --- | --- |
| `KEEP` | Preserve path and ownership. Validation may still be required. | Baseline and link/build checks. |
| `MERGE` | Preserve unique meaning in one canonical owner; retain provenance for the source. | Content diff, accepted owner, reciprocal provenance, cold-start/link checks. |
| `CONVERT` | Preserve meaning while changing interface or representation. | Ratified schema/adapter contract and before/after fixtures. |
| `MOVE` | Use `git mv`; semantics and authority remain unchanged unless an accepted decision says otherwise. | Inbound/outbound repair and owner/path validation. |
| `ARCHIVE` | Move inactive provenance out of active routing. Never silently delete. | Proof it is inactive, archive manifest, link repair. |
| `DELETE` | Remove only proven reproducible/generated residue after replacement and rollback proof. | Founder-approved delete list, regenerated output, source/version/hash, recovery test. |
| `REVIEW` | Evidence is insufficient for a safe stronger disposition. | Explicit human classification before implementation. |

## 3. High-confidence Slops OS mappings

| Old scope | Proposed target | Disposition | Reason / authority impact | Repair and validation | Risk / rollback | Commit group |
| --- | --- | --- | --- | --- | --- | --- |
| `AGENTS.md`, `CLAUDE.md` | Same root paths as thin adapters | CONVERT | Runtime entry points are justified, but duplicated knowledge and conflicting push rules are not. | OpenAI and Claude cold-start parity; verify Direction-first routing. | High; revert adapter commit. | `P5-thin-entry-layer` |
| Root `context.md` | `Direction/current-state.md` | MERGE | Legacy root context competes with current truth. | Reconcile every fact/decision, scan absolute paths, validate schema. | High; preserve source in archive and revert conversion. | `P5-thin-entry-layer` |
| Root `DBS_INDEX.md` | `Blueprints/repository-boundaries.md` plus minimal README links | MERGE | Folder semantics and ownership are contracts, not a second truth surface. | Repair references; test root navigation. | Medium; restore index from baseline. | `P5-thin-entry-layer` |
| Root and Direction manifestos | One approved founder-doctrine owner | MERGE | Overlap and conflicting product/system claims. | Human semantic diff and accepted decision. | Medium; retain both source blobs in provenance. | `P6-knowledge-migration` |
| `Direction/reviews/**` | `Solutions/reviews/**` | MOVE | Reviews are evidence, not current command state. | Repair all detected links; assert no startup dependency. | Medium; `git mv` reversal. | `P4-direction-schema-and-state` |
| `Direction/00_FINAL_PLAN.md` | `Archive/dbs-vnext/planning/` | ARCHIVE | File already declares itself historical. | Link scan and archive manifest. | Low; reverse `git mv`. | `P4-direction-schema-and-state` |
| Current Direction files | v1 Direction record/index interfaces | CONVERT | Current state is table/prose-driven and lacks stable transitions, IDs, and supersession. | Fixture conversion, schema/link/transition validation, founder sign-off. | High; dual-reader window and pre-cutover tag. | `P4-direction-schema-and-state` |
| `00_Executive_Office/`, `01_Operations_COO/`, `02_Engineering_CTO/`, `03_Security_CISO/`, `04_Brand_CMO/`, `Projects/` | Unique doctrine to Blueprints; original files to `Archive/dbs-vnext/organizational-scaffolding/` | ARCHIVE/MERGE | Unsupported role roots auto-load on Windows and contain stale or overbroad authority. | Unique-content diff, runtime precedence test, exact-path scan. | High; archive-first and isolated commit. | `P7-prompt-and-agent-cleanup` |
| Executed/phase-specific prompts | `Archive/dbs-vnext/executed-prompts/` | ARCHIVE | One-time instructions should not remain reusable active routes. | Confirm execution/history; scan inbound references. | Medium; reverse `git mv`. | `P7-prompt-and-agent-cleanup` |
| Candidate/imported agent library | Existing Blueprints areas | KEEP/REVIEW | Provenance library can remain, but candidates must not inherit authority. | Registry status, provenance, duplicate-basename, and loader validation. | Medium; no bulk mutation until classification. | `P7-prompt-and-agent-cleanup` |

## 4. High-confidence Omen mappings

| Old scope | Proposed target | Disposition | Reason / authority impact | Repair and validation | Risk / rollback | Commit group |
| --- | --- | --- | --- | --- | --- | --- |
| `AGENTS.md`, `CLAUDE.md` | Same root paths as thin adapters | CONVERT | Two vendor entries should route to one canonical Omen context. | Vendor cold-start matrix across root/web/iOS/Android/API/deploy. | High; revert isolated adapter commit. | `P5-thin-entry-layer` |
| Singular `AGENT.md` | Unique backend rules in `Blueprints/runtime-rules/backend.md`; entry removed only after parity | MERGE | Unsupported competing root filename creates backend bias and a circular read chain. | Unique-content diff; prove OpenAI/Claude reach backend rules from `src/`. | High; keep source until parity. | `P5-thin-entry-layer` |
| Root `context.md` and `DBS_INDEX.md` | v1 current state and repository-boundary contract | MERGE | Both contain stale Corvus/OneDrive, paid-tier, and deployment claims. | Fact reconciliation against facts-of-record and current code; cold-start check. | High; preserve baseline source. | `P5-thin-entry-layer` |
| Current Direction files | v1 Direction records/indexes | CONVERT | Inbox/sprint disagree; blockers are malformed; status semantics are violated. | Record-by-record conversion, transition/supersession/link validation. | High; dual-reader window. | `P4-direction-schema-and-state` |
| Hand-maintained `Direction/status-model.md` | Generated provenance-pinned Slops OS schema cache | CONVERT | Omen must consume, not fork, Slops-owned planning interfaces. | Commit/checksum parity and standalone CI. | High; retain old mirror until cache passes. | `P4-direction-schema-and-state` |
| `Direction/reviews/**` and completed sprint history | `Solutions/reviews/**`, `Archive/direction-records/**` | MOVE/ARCHIVE | Evidence and completed work crowd current truth. | Link, startup, and closure checks. | Medium; reverse move. | `P6-knowledge-migration` |
| `Brand/**` and `Legal/**` | Approved contracts to `Blueprints/`; source evidence/assets to `References/`; history to `Archive/` | MOVE/REVIEW | Current roots mix contracts, sources, generated assets, and history. | File-level classification, asset usage/hash, public-route and legal-source links. | Medium/high; split into small commits. | `P6-knowledge-migration` |
| `logos/**` | `References/assets/logos/**` | MOVE | Source/evidence asset boundary. | Code/CSS/design link scan and visual/build checks. | Medium; reverse `git mv`. | `P6-knowledge-migration` |
| `output/**` | `Solutions/generated/**` or approved deletion | MOVE/REVIEW | Generated review material should not be a loose root. | Provenance, source, reproducibility, and consumer scan. | Low/medium; preserve hashes. | `P6-knowledge-migration` |
| `docs/**` | Per-file DBS owner | REVIEW | The folder mixes contracts, evidence, reports, and assets; one bulk destination would destroy semantics. | Complete semantic classification and link/asset scan. | High; no move until every row is decided. | `P6-knowledge-migration` |
| `.agents/**`, `.Codex/**`, root `skills/**` | Canonical Blueprints package plus justified generated/runtime adapters | REVIEW/MERGE | Tool packages may be real runtime boundaries, but cannot be independent knowledge bases. | Source/distribution hashes, loader behavior, vendor parity, package smoke tests. | High; keep installed and repo copies until parity. | `P7-prompt-and-agent-cleanup` |
| `graphify-out/**` | Canonical workspace graph under Slops OS `References/graphify/`; optional Omen view under Omen `References/graphify/` | MOVE/DELETE after regeneration | Current graph is stale, repository-only, path-bound, and mostly isolated. | Source/commit/version/hash, exclusion manifest, coverage/freshness, resolver tests. | High; retain baseline graph and cache until replacement accepted. | `P9-graphify-regeneration` |
| `src/`, `frontend/`, `mobile/`, `extension/`, `test/`, `evals/`, `scripts/`, `sql/`, `deploy/`, `.github/` | Same paths | KEEP | They represent real runtime/build/test/deploy boundaries. | Existing tests, builds, CI path and Docker validation. | High runtime impact; no knowledge-phase moves. | `P8-optional-code-boundary` |
| `client/` | Same path pending proof | REVIEW | Called legacy, but Docker and CI still build/copy it. | Runtime usage, Docker, workflow, bundle, route, and deletion proof. | High; no move or archive now. | `P8-optional-code-boundary` |

## 5. Link repair protocol

For each non-`KEEP` row:

1. Resolve exact baseline blob and all detected reference paths from the JSON manifest.
2. Run semantic `rg` for path, filename, record ID, aliases, and absolute-path variants before moving.
3. Use `git mv` for moves/archives so history is explicit.
4. Repair inbound links in the same repository-specific commit group. Do not bundle Slops and Omen code-path changes with documentation moves.
5. Re-scan Markdown/HTML links with exact-case rules and run loader/build/config checks for non-Markdown consumers.
6. Record old path, new path, baseline commit, result, and validation evidence in the migration ledger.
7. Do not add permanent compatibility shims unless a real runtime/tool consumer requires one; time-box and test any shim.

The inventory's reference counts are direct path/link detections, not proof of semantic completeness. A zero count never authorizes deletion.

## 6. Rollback model

- Create annotated pre-migration tags in each repository only after founder approval and immediately before implementation.
- Use one concern and one repository per commit group; keep documentation and code-boundary changes separate.
- For moves/conversions, rollback is a commit revert or exact restoration from the pre-migration tag.
- Preserve stable Direction IDs and `migrated_from` provenance even when paths change.
- For generated-output deletion, record hashes and prove either regeneration or exact tag restoration first.
- Stop a phase if current Omen truth, build paths, runtime routing, or cross-repository links cannot be reproduced.

## 7. Unresolved manifest rows

`REVIEW` is an intentional implementation blocker for 165 artifacts. The largest unresolved classes are:

- Slops OS active/candidate/imported agent ownership and L1-boundary material,
- one-time versus reusable prompts without explicit owners/evaluations,
- Omen mixed `docs/`, `.agents/`, `.Codex/`, local `skills/`, and Solution lifecycle,
- Omen `client/` runtime status,
- files whose generated/source/provenance relationship is not recorded.

These rows must be resolved by ratified rules or direct artifact review; a bulk heuristic may not silently turn them into moves or deletions.
