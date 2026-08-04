# DBS vNext validation plan

> **Status:** DRAFT validation contract. This distinguishes audit evidence already observed from checks required during implementation.

## 1. Current audit evidence

| Area | Observed result | Confidence / limitation |
| --- | --- | --- |
| Git isolation | Clean sibling worktrees were created on `refactor/dbs-vnext-migration` at exact remote tips. Original Slops checkout's unrelated `AGENT_INDEX.md` edit and original Omen checkout were not modified. | High; recheck before every implementation phase. |
| Inventory | 512 Slops OS and 1,704 Omen tracked paths; 505 and 773 relevant governance/config artifacts inventoried. | High for tracked baseline and configured file classes; binary/media contents are counted at root but not semantically classified. |
| Dispositions | All 1,278 artifacts use only the seven permitted values. | Heuristic proposals; 165 remain `REVIEW` by design. |
| Direct local links | 159 missing-target, missing-anchor, or exact-case findings. | Candidate findings require triage; path-like prose and runtime routes can create false positives. |
| Duplicate scan | 4 exact normalized-content groups in the relevant corpus, plus a separate all-tracked-blob exact scan, and 12 bounded near-duplicate candidates. | Binary/media duplicates are often intentional; near-duplicate scan is similarity triage, not semantic replacement proof. |
| Routing | OpenAI debug input confirmed root/nested `AGENTS.md` behavior and Windows case-insensitive loading of legacy lowercase `agents.md`. Omen's singular `AGENT.md` was not auto-loaded but is explicitly required by root instructions. | Mechanical for OpenAI inputs; full outcome fixtures remain future work. |
| Context size | Omen's union of mandated root startup sources is 18 files, 559,090 bytes, 7,491 lines; native gate adds 55,522 bytes and 1,074 lines. Slops first-order/always-read context is about 68 KB and 1,116 lines. | Measured from current files; runtime tokenization varies. |
| Graphify | Omen graph has 3,965 nodes, 4,995 links, 306 communities, and 2,182 isolated nodes; 28 of 370 source paths are now missing and the recorded build commit is unavailable. Slops has no tracked graph output or canonical wrapper. | Strong staleness/ownership evidence; no graph was regenerated. |
| Schema fixtures | Four draft JSON Schema documents parse as JSON. | Full JSON Schema engine and YAML record fixtures have not yet been run. |

## 2. Audit-package checks

Run from the isolated Slops OS worktree:

```powershell
node --check Solutions/audits/dbs-vnext/scripts/build-inventory.mjs
node Solutions/audits/dbs-vnext/scripts/build-inventory.mjs `
  --slops C:\Users\JDuve\dev\dbs-vnext-migration\Slops-OS `
  --slops-ref 814f77a829dd10a53601354e167adedb58c6ecdf `
  --omen C:\Users\JDuve\dev\dbs-vnext-migration\omen `
  --omen-ref 065d4677d79c7ce9afe10b6cdb981d41f40a5471 `
  --out C:\Users\JDuve\dev\dbs-vnext-migration\Slops-OS\Solutions\audits\dbs-vnext
node Solutions/audits/dbs-vnext/scripts/validate-audit.mjs `
  --audit C:\Users\JDuve\dev\dbs-vnext-migration\Slops-OS\Solutions\audits\dbs-vnext `
  --slops C:\Users\JDuve\dev\dbs-vnext-migration\Slops-OS `
  --omen C:\Users\JDuve\dev\dbs-vnext-migration\omen
git diff --check
git status --short --branch
git -C C:\Users\JDuve\dev\dbs-vnext-migration\omen status --short --branch
```

The validator must fail if a deliverable is missing, JSON is malformed, counts drift, a disposition is invalid, a manifest row lacks migration fields, a baseline path is duplicated, or writes escape the audit directory.

## 3. Link and content validation

Before and after every move/conversion:

1. Run exact Markdown/HTML link and anchor resolution on both repositories with case-sensitive target matching.
2. Search old paths, filenames, record IDs, aliases, and absolute `C:\Users\...` / OneDrive paths with `rg`.
3. Validate non-Markdown consumers separately: import/require calls, workflow paths, Docker `COPY`, Compose volumes, Gradle/Xcode references, deploy scripts, and public asset URLs.
4. Compare before/after inbound and outbound reference sets in `data/migration-manifest.json`.
5. Treat zero direct references as unknown, never deletion proof.
6. Allow broken historical links in Archive only when recorded in an archive manifest and not reachable from active startup/navigation.

Current 159 findings should be triaged as `REAL`, `CASE_ONLY`, `RUNTIME_ROUTE`, `HISTORICAL`, or `FALSE_POSITIVE` before phase 6. Critical active-link findings block the relevant move; historical findings do not automatically block unrelated work.

## 4. Direction schema validation

Required fixture categories:

- minimum valid and fully populated records for inbox, sprint, decision, and session close;
- invalid/missing required fields and unknown major versions;
- illegal status transitions, including sprint `BLOCKED`;
- duplicate IDs and repository/type/date mismatches;
- broken `dbs://` links and case mismatches;
- one-way supersession and contradictory active facts;
- closed work without closure evidence;
- Solution promotion without accepted decision/provenance;
- Omen schema cache with wrong commit or checksum;
- legacy-to-v1 conversion preserving old IDs and source commit.

Use a standards-compliant JSON Schema 2020-12 validator in local tooling and CI. No such CLI is currently installed; a pinned Node dependency such as Ajv may be added only in the implementation/tooling commit after dependency review. Python's installed `PyYAML` can parse front matter during audit prototyping, but Python `jsonschema` is not installed.

## 5. Routing validation matrix

Each vendor must run the same outcome fixture at these starts:

| Start boundary | Must load/reach | Must not treat as authority |
| --- | --- | --- |
| Slops OS root | L0 Direction, authority order, repository ownership, relevant Blueprints | legacy root context, role folders, Solutions, Graphify |
| Slops governance path | canonical schema/workflow plus current L0 state | product-specific Omen prompts unless linked |
| Future company/business governance path | scoped business Direction/Blueprints when created | stale executive-role folder doctrine |
| Omen root | Omen current Direction, facts, sprint/inbox as requested, native priority | Slops historical plans, paid-tier residue, Graphify |
| `frontend/` | web boundary and relevant product/design contracts | backend-vendor ownership assumptions |
| `mobile/ios/` | native gate, iOS/Figma/API contracts, Omen state | web-only implementation doctrine |
| `mobile/android/` | native gate, Android/Figma/API contracts, Omen state | web-only implementation doctrine |
| `src/` | backend/provider/security/API contracts and Omen state | singular root file as independent authority |
| `deploy/` / `.github/` | release/deploy/security constraints and current operational evidence | stale Oracle/Corvus or billing statements |

Record automatic inputs, explicit reads, byte/token volume, selected facts, write posture, and answers. OpenAI and Claude may phrase differently; they must agree on authority, current truth, scope, code boundaries, and required validation.

## 6. Omen runtime/build validation

Documentation moves that touch no code still require targeted path checks. Any optional code-boundary phase requires the full current suite:

```powershell
npm test
npm --prefix frontend run build
npm audit --audit-level=moderate
git diff --check
docker compose config
docker build -f Dockerfile .
docker build -f Dockerfile.cron .
```

Also run focused tests for changed contracts, extension packaging when relevant, Android Gradle tests/builds with a supported JDK, and iOS tests/builds on macOS/Xcode CI. Deployment workflows and production canaries are separate authorized stages; local builds never prove deployment or live-provider behavior.

These Omen builds/tests were not run during discovery because no Omen source or path was changed. Java is not currently available on `PATH`, and iOS cannot be built locally on Windows. Docker CLI/Compose are installed; daemon/build checks were not needed for this audit-only change.

## 7. Graphify validation

The first accepted workspace graph must record:

- Graphify package and wrapper versions,
- Slops OS and Omen source commits,
- canonical workspace root without machine-specific paths,
- include/exclude rules and excluded-file counts,
- generated-at time, config, commands, checksums, and output ownership,
- source-file coverage by repository and major boundary,
- missing-source, isolated-node, duplicate-authority, stale-path, and root-marker findings.

Acceptance requires Omen mobile and both repositories to be represented; the graph must identify itself as generated/non-authoritative. Test regeneration in a disposable output directory before replacing or deleting tracked Omen output.

## 8. Tools not run or unavailable

Unavailable by current `PATH`: `jq`, `yq`, `cloc`, `scc`, `tokei`, `markdownlint`, `markdownlint-cli2`, `markdown-link-check`, `lychee`, `jscpd`, `ajv`, `yamllint`, and Java. Python `jsonschema` is also absent.

Practical current substitutes are PowerShell/Node/Python for counts and syntax parsing, `rg` for semantic path scans, SHA-256 plus bounded SimHash for duplicates, and the audit validator for package integrity. Dedicated Markdown/link/schema tools are recommended for phase 10 CI, but their absence does not invalidate the discovery evidence as long as it is reported and no run is claimed.

## 9. Acceptance and rollback evidence

Every implementation phase report must include:

- starting and ending commits, branch, and worktree status for both repositories;
- changed path list grouped by disposition and commit;
- before/after inventory and context-size delta;
- link/schema/routing/build checks actually run with exit status;
- unrun checks and reason;
- preserved Omen facts/decisions and any accepted successor decision;
- rollback anchor and a dry-run or proven restoration path.

A phase is not green merely because Git is clean. It is green only when its semantic, routing, link, and relevant runtime acceptance evidence passes.
