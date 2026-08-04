# DBS vNext tool-capability manifest

> **DRAFT — NON-AUTHORITATIVE — FOUNDER REVIEW REQUIRED**
>
> Evidence snapshot: 2026-08-03. This file records observed local capability and proposed additions. It does not authorize installation, bulk migration, Graphify regeneration, build/deploy activity, or external-service changes.

Governing basis: [Slops OS #14](https://github.com/justinduverge-design/Slops-OS/issues/14), [Slops OS #15](https://github.com/justinduverge-design/Slops-OS/issues/15), and [Omen #278](https://github.com/justinduverge-design/omen/issues/278).

## Scope and baseline

The audit covered these sibling worktrees:

| Repository | Branch | Baseline commit | Default branch | Baseline state |
|---|---|---|---|---|
| Slops OS | refactor/dbs-vnext-migration | 814f77a829dd10a53601354e167adedb58c6ecdf | origin/master | Clean before audit artifacts were created |
| Omen | refactor/dbs-vnext-migration | 065d4677d79c7ce9afe10b6cdb981d41f40a5471 | origin/main | Clean |

The current Slops OS worktree contains untracked audit output under Solutions/audits/dbs-vnext/. That is expected session work, not a clean-state discrepancy. No install, dependency restore, Graphify generation, Docker build, application build, test suite, deployment, push, or external mutation was performed for this capability audit.

## Classification vocabulary

A capability may have more than one classification:

- **AVAILABLE — REQUIRED**: installed and necessary for a safe migration.
- **AVAILABLE — OPTIONAL**: installed and useful but not required for correctness.
- **LOCAL ONLY**: usable on this workstation; no repository-pinned or CI setup currently proves portability.
- **CI CAPABLE**: already exercised by repository CI, or can be made deterministic in CI with a pinned dependency and command.
- **UNAVAILABLE**: the named executable/module was not found.
- **REPLACEABLE**: the requirement can be met with an observed available tool or a small deterministic repository script.
- **FOUNDER APPROVAL REQUIRED**: execution would incur model/API cost, touch live infrastructure, install software, regenerate review-sensitive output, or cross another explicit migration gate.
- **BLOCKED**: a command surface exists, but a required runtime, dependency tree, platform, daemon, credential, or approved external state is absent.

“CI capable” does not mean CI currently runs the check. “Available” does not mean the command was executed.

## Capability matrix

### Repository, search, and inventory

| Capability | Observed tool/version | Classification | Evidence and practical use |
|---|---|---|---|
| Git history/status/diff | Git 2.54.0.windows.1 | AVAILABLE — REQUIRED; CI CAPABLE | Both repositories, branches, remotes, HEADs, and status were inspected. Use explicit repository paths. |
| History-preserving moves | git mv from Git 2.54.0 | AVAILABLE — REQUIRED; FOUNDER APPROVAL REQUIRED for migration moves | git mv -h exposes dry-run support. No move was run. Bulk moves remain gated by manifest and target-tree ratification. |
| Fast text/file search | ripgrep 15.1.0 | AVAILABLE — REQUIRED; LOCAL ONLY | Used for tracked-file and routing searches. CI portability needs an installed/pinned rg or a Node substitute. |
| PowerShell filesystem inventory | PowerShell 7.6.4; Get-ChildItem, Get-Item, Get-Content, Measure-Object, Get-FileHash | AVAILABLE — REQUIRED; LOCAL ONLY | Sufficient for Windows inventory, line/byte counts, and SHA-256. A Node implementation is preferable for cross-platform CI. |
| Tree overview | tree.com | AVAILABLE — OPTIONAL; LOCAL ONLY | Useful for human snapshots; not stable enough to be a machine contract. |
| Cross-platform audit scripting | Node v24.11.0 | AVAILABLE — REQUIRED; CI CAPABLE | The repository audit script generated JSON and Markdown inventories without changing tracked source. Omen CI already uses Node. |
| Supplemental parsing | Python 3.14.3 | AVAILABLE — OPTIONAL; LOCAL ONLY | Useful locally; not a repository-pinned runtime in Slops OS. |
| fd | Not found | UNAVAILABLE; REPLACEABLE | Replace with rg --files or Node recursive traversal. No installation is required. |
| cloc, scc, tokei | Not found | UNAVAILABLE; REPLACEABLE | Replace Markdown line/byte analysis with Node or PowerShell. Language-specific code metrics are optional for this migration. |

### Duplicate and link analysis

| Capability | Observed tool/version | Classification | Evidence and practical use |
|---|---|---|---|
| Exact duplicate detection | PowerShell SHA-256 and audit script normalized/raw SHA-256 | AVAILABLE — REQUIRED; CI CAPABLE through Node script | Four normalized exact-duplicate groups were found across the relevant text/config corpus; a separate raw scan found 41 groups across every tracked blob. The active cross-repository pair is Direction/CUTOVER_STATE.md in both repositories. Hash equality proves identical content, not correct ownership. |
| fdupes, jdupes, rdfind | Not found | UNAVAILABLE; REPLACEABLE | Deterministic SHA-256 grouping is sufficient. |
| Near-duplicate detection | Audit script similarity pass | AVAILABLE — REQUIRED; LOCAL ONLY pending algorithm contract | Twelve candidates were emitted. These are triage leads, not automatic merge/delete authority. |
| jscpd, duplo, simian, ssdeep | Not found; Java also not found | UNAVAILABLE; REPLACEABLE | Keep the current bounded text-similarity pass, document normalization/thresholds, and require human review before disposition changes. |
| Local Markdown-link candidate scan | Audit script | AVAILABLE — REQUIRED; LOCAL ONLY pending parser hardening | It emitted 159 “missing local target” candidates: 20 in Slops OS and 139 in Omen. Samples include prose tokens such as “link,” so this is not yet a confirmed broken-link count. |
| markdown-link-check, lychee, linkinator | Not found | UNAVAILABLE; REPLACEABLE; CI CAPABLE after addition | Prefer a pinned cross-platform parser/checker or harden the Node scanner to parse only genuine Markdown links, anchors, and repository-relative paths. |

### Structured-content validation

| Capability | Observed tool/version | Classification | Evidence and practical use |
|---|---|---|---|
| JSON syntax | Node JSON.parse | AVAILABLE — REQUIRED; CI CAPABLE | All 203 tracked Omen JSON files parsed; Slops OS had no tracked JSON at the pre-audit baseline. Generated audit JSON also parsed during verification. Syntax does not prove schema conformance. |
| jq | Not found | UNAVAILABLE; REPLACEABLE | Replace with Node or PowerShell ConvertFrom-Json. |
| YAML syntax | PyYAML 6.0.3 | AVAILABLE — REQUIRED; LOCAL ONLY | Three tracked Slops OS YAML files and fourteen tracked Omen YAML files parsed with zero syntax failures. Pin a CI dependency or use a Node parser before treating this as portable. |
| yamllint, yq | Not found | UNAVAILABLE; REPLACEABLE | Syntax is covered locally; style lint is optional. |
| JSON/YAML schema validation | No root check-jsonschema, ajv CLI, or Python jsonschema; only an unrelated transitive AJV lock entry | UNAVAILABLE; REQUIRED ADDITION; CI CAPABLE | A transitive package-lock entry is not an available tool. Add one pinned validator only after Direction schemas are ratified. |
| GitHub Actions semantics | actionlint not found | UNAVAILABLE; REQUIRED ADDITION or hosted validation | YAML parsing alone cannot validate Actions expressions, events, permissions, or path filters. Prefer pinned actionlint plus GitHub’s own workflow validation. |
| Markdown style | markdownlint and markdownlint-cli2 not found | UNAVAILABLE; OPTIONAL ADDITION | Style lint should be scoped to stable active knowledge, not historical Archive files. |
| Prose/spelling | Vale and cspell not found | UNAVAILABLE; OPTIONAL ADDITION | Not a migration correctness gate. |

### Graphify

| Capability | Observed tool/version | Classification | Evidence and practical use |
|---|---|---|---|
| Graphify CLI | graphifyy / graphify 0.8.36 | AVAILABLE — OPTIONAL; LOCAL ONLY; FOUNDER APPROVAL REQUIRED for regeneration | Query/report commands are available. Generation was deliberately not run. The existing Omen graph is stale and machine-path-bound; see graphify-audit.md. |
| Slops-owned Graphify wrapper | Referenced slops-graphify skill/runner is absent from this checkout | UNAVAILABLE; REQUIRED ADDITION before canonical generation | Routing tables and historical Omen records claim a wrapper/version that current Slops OS cannot reproduce. Recreate only from an approved corpus/output contract, not historical assumptions. |
| Cross-repository graph freshness check | Git, Node, Graphify metadata | REPLACEABLE; CI CAPABLE | CI can compare recorded repo SHAs, corpus-manifest digest, tool version, and output metadata without running semantic extraction. |

### Builds, tests, containers, and deployment paths

| Capability | Observed surface | Classification | Evidence and practical use |
|---|---|---|---|
| Omen backend tests | npm test → node --test | CI CAPABLE; BLOCKED locally | Command exists and .github/workflows/pr-quality.yml restores dependencies before running it. Local node_modules is absent; npm ci was not authorized because it writes and may use the network. |
| Omen evaluation checks | npm run evals:validate; npm run evals:mock | CI CAPABLE; BLOCKED locally | Scripts exist; dependency restore was not performed. |
| Omen web builds | npm --prefix frontend run build; npm --prefix client run build | CI CAPABLE; BLOCKED locally | Both are present in PR quality CI. Local dependency trees are absent. |
| Android build | ./gradlew --no-daemon :app:assembleDebug | CI CAPABLE; BLOCKED locally | Manual workflow provisions JDK 17. This Windows host has no Java or system Gradle and no dependency cache. Android is not covered by the main PR quality trigger. |
| iOS tests | xcodebuild test with OmenIOS scheme and iPhone 16 simulator | CI CAPABLE; BLOCKED locally | CI uses macos-14/Xcode 16.2. Swift and xcodebuild are unavailable on Windows. |
| Docker Compose model validation | Docker CLI 29.4.0; Compose v5.1.1 | AVAILABLE — REQUIRED; LOCAL ONLY and CI CAPABLE | Three Compose model combinations passed config --quiet with env interpolation and path resolution disabled. |
| Docker image build/runtime | Docker CLI present; daemon unavailable | BLOCKED; CI CAPABLE | The local named-pipe daemon is unavailable, so no image build or container smoke test ran. |
| Deployment-path static validation | Git/rg/read-only workflow and Dockerfile inspection | AVAILABLE — REQUIRED; LOCAL ONLY | Static reads exposed hard-coded Docker COPY paths, deploy-host paths, and CI path-filter gaps. |
| Live deployment-path validation | SSH/host filesystem/container state | FOUNDER APPROVAL REQUIRED; BLOCKED in this audit | deploy.yml assumes /opt/omen/deploy/hostinger and a server-side Compose file that the workflow does not sync. No live access or deployment was attempted. |
| Slops OS build/test baseline | No tracked root package/build/test/CI manifest at baseline | UNAVAILABLE; REQUIRED ADDITION for audit tooling only | Add deterministic audit validation separately from product code. Do not invent an application build for a governance repository. |

### Runtime routing evaluation

| Capability | Observed tool/version | Classification | Evidence and practical use |
|---|---|---|---|
| OpenAI instruction-load inspection | Codex CLI 0.130.0, codex debug prompt-input | AVAILABLE — REQUIRED; LOCAL ONLY | Mechanically verified which AGENTS.md files were loaded without model inference. The user config contains unsupported reasoning value “ultra”; a command-line xhigh override is currently required. |
| OpenAI cold-start behavior | codex exec, read-only sandbox and ephemeral mode available | AVAILABLE; FOUNDER APPROVAL REQUIRED | A model-backed evaluation may incur service use and is intentionally deferred until target routing is approved. |
| Claude instruction-load inspection | Claude Code 2.1.205 | PARTIALLY AVAILABLE; LOCAL ONLY | No equivalent non-inference prompt inspector was identified. Anthropic documents /context and InstructionsLoaded for interactive verification. |
| Claude cold-start behavior | claude -p with plan permission mode, restricted tools, no persistence, and budget cap | AVAILABLE; FOUNDER APPROVAL REQUIRED | Do not use --bare or --safe-mode: both disable CLAUDE.md discovery and invalidate the test. No model-backed test was run. |
| Governing issue access | GitHub connector/remote read access | AVAILABLE — REQUIRED; LOCAL ONLY | Slops OS #14, Slops OS #15, and Omen #278 were read before repository analysis. No issue, PR, or comment mutation occurred. |

## Checks actually run

The following checks were observed during discovery:

1. Git branch, HEAD, remote/default branch, and status for both worktrees.
2. Inventory generation over 512 tracked Slops OS files and 1,704 tracked Omen files. The resulting relevant-artifact inventories contain 505 Slops OS and 773 Omen records after build/deploy/native configuration classes were included.
3. JSON syntax parse: 203 tracked Omen JSON files, zero failures.
4. YAML syntax parse: 3 Slops OS plus 14 Omen tracked YAML files, zero failures.
5. Exact-duplicate analysis: 4 normalized groups in the relevant corpus and 41 raw groups across all tracked blobs.
6. Near-duplicate candidate analysis: 12 candidates.
7. Local-link candidate analysis: 159 candidates; not yet a confirmed broken-link total.
8. git diff --check on both initially clean worktrees.
9. Docker Compose syntax/model checks for the base, Hostinger overlay, and production Compose inputs with environment and path resolution deliberately disabled.
10. Codex instruction-load marker checks from Slops OS root, Slops Saloon, a company-role directory, Omen root, and Omen Android.
11. Read-only inspection of Omen build/test/deployment manifests and the existing Graphify output.

The generated evidence is stored in:

- data/inventory-summary.json
- data/artifact-inventory.json
- data/exact-duplicates.json
- data/near-duplicates.json
- data/link-findings.json

## Checks not run

- No npm ci, npm test, eval, frontend build, or legacy client build.
- No Android assemble or test.
- No iOS build or test.
- No Docker image build or container smoke.
- No actionlint, Markdown lint, dedicated Markdown-link checker, or schema validation.
- No live server/deployment-path check.
- No Graphify extraction, update, merge, label, or regeneration.
- No model-backed OpenAI or Claude cold-start evaluation.
- No package/tool installation.

## Reproducible command set

These commands are evidence commands, not blanket authorization. Run from an explicitly named repository and preserve unrelated work.

~~~powershell
git status --short --branch
git rev-parse HEAD
git remote -v
git remote show origin
git diff --check
rg --files
~~~

Syntax-only JSON validation:

~~~powershell
git ls-files '*.json' |
  ForEach-Object { node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" $_ }
~~~

Syntax-only YAML validation with the observed local Python environment:

~~~powershell
git ls-files '*.yml' '*.yaml' |
  ForEach-Object { python -c "import sys,yaml; yaml.safe_load(open(sys.argv[1],encoding='utf-8'))" $_ }
~~~

Compose model validation used:

~~~powershell
docker compose -f docker-compose.yml config --quiet --no-env-resolution --no-interpolate --no-path-resolution
docker compose -f docker-compose.yml -f docker-compose.hostinger.yml config --quiet --no-env-resolution --no-interpolate --no-path-resolution
docker compose -f deploy/hostinger/docker-compose.prod.yml config --quiet --no-env-resolution --no-interpolate --no-path-resolution
~~~

OpenAI instruction loading was inspected without model inference:

~~~powershell
codex debug -c 'model_reasoning_effort="xhigh"' prompt-input ROUTING_PROBE
~~~

Model-backed routing commands are proposed only after founder approval:

~~~powershell
codex exec --ephemeral --sandbox read-only -C <repository> -c 'model_reasoning_effort="xhigh"' "<approved routing-evaluation prompt>"

claude -p --permission-mode plan --tools "Read,Glob,Grep" --no-session-persistence --max-budget-usd <approved-cap> "<approved routing-evaluation prompt>"
~~~

## Required additions before implementation

| Priority | Addition | Why | Proposed disposition |
|---|---|---|---|
| 1 | Ratified Direction Markdown schemas plus a pinned JSON/YAML schema validator | Planning interfaces cannot be machine-checked today. | REVIEW |
| 2 | Hardened cross-platform link validator with anchor and repository-reference semantics | Current 159 findings include false positives and cannot safely drive moves. | CONVERT |
| 3 | Deterministic context-health check covering wrapper size, unsupported filenames, stale paths, duplicate authority claims, and graph freshness | Routing regressions need an inexpensive local/CI gate. | CONVERT |
| 4 | Pinned actionlint or equivalent hosted Actions validation | Current YAML syntax checks miss workflow semantics and path-filter regressions. | REVIEW |
| 5 | Slops-owned Graphify corpus/output wrapper and metadata contract | The claimed historical wrapper is missing and current Omen output is stale. | CONVERT |
| 6 | CI wiring for audit validators in Slops OS, separate from Omen product build/deploy workflows | Governance checks need portable proof without creating a fake application build. | REVIEW |

No addition above is approved merely by appearing here. Installation, CI changes, Graphify regeneration, and model-backed evaluations remain later implementation groups.

## Readiness judgment

Core discovery is possible with the current local toolchain. Bulk migration is **not tool-ready** because link findings are not yet authoritative, schema validation is absent, Actions semantics are unchecked, Graphify ownership/generation is not reproducible, and cold-start behavior has not been evaluated against a ratified thin-entry design. Each gap has a practical replacement path; none justifies blind moves.
