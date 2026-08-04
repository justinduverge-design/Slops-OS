# DBS vNext Graphify audit

> **DRAFT — NON-AUTHORITATIVE — FOUNDER REVIEW REQUIRED**
>
> Evidence snapshot: 2026-08-03. Graphify was inspected but not regenerated, updated, merged, labeled, moved, or deleted. Existing graph output remains advisory evidence only.

Governing basis: [Slops OS #14](https://github.com/justinduverge-design/Slops-OS/issues/14), [Slops OS #15](https://github.com/justinduverge-design/Slops-OS/issues/15), and [Omen #278](https://github.com/justinduverge-design/omen/issues/278).

## Executive judgment

The current Graphify state cannot serve as the DBS vNext cross-repository map:

- Slops OS has no Graphify output and cannot reproduce the Slops-owned wrapper that current routing/history says should exist.
- Omen has a tracked, repository-local graph built in June from an unavailable old commit and an old absolute checkout path.
- The Omen graph has no repository identity, no mobile sources, 28 referenced source files that no longer exist, and no cross-repository coverage.
- The current generated directory is neither ignored from Git nor excluded from the Docker build context.
- A raw scan of the shared parent is unsafe without a curated corpus because the installed Graphify ignore behavior is rooted at the selected scan directory and is not proven to honor each nested repository’s ignore policy.

The target should be a Slops OS-owned, manifest-driven workspace graph under References/graphify/, generated from both sibling repositories in one curated corpus. It may assist navigation and impact analysis, but every answer must resolve back to source files and the DBS authority order.

## Tool state

| Item | Observed state |
|---|---|
| Executable | C:\Users\JDuve\AppData\Roaming\Python\Python314\Scripts\graphify.exe |
| Package | graphify 0.8.36 |
| Package source inspected | C:\Users\JDuve\AppData\Roaming\Python\Python314\site-packages\graphify |
| Available read/query operations | path, explain, query, affected, diagnose |
| Available generation operations | extract, update, cluster-only, label, merge-graphs |
| Generation in this audit | Not run |
| Slops-owned repository wrapper | Not present in the Slops OS worktree |

The installed CLI is a workstation dependency, not a repository-pinned capability. Its presence does not make a historical graph reproducible.

## Slops OS findings

### No canonical output exists

No graphify-out directory and no References/graphify directory was found in the Slops OS migration worktree.

### Claimed wrapper is missing

Slops routing tables reference slops-graphify as an active capability, and Omen historical decision records refer to a Slops-owned slops-graphify v0.1.3 runner. The expected repository path and runner are absent:

~~~text
Blueprints/skills/slops-graphify/
Blueprints/skills/slops-graphify/scripts/slops_root_scan.py
~~~

No path history for those expected files was found in the current Slops repository’s reachable refs. A workstation-installed slops-graphify skill exists, but it is a draft v0.1.2 artifact, assumes the old nested Omen layout, and is not repository authority. It must not be copied into the repository as if it were the missing v0.1.3 implementation.

This is a reproducibility gap, not proof that the historical decision record should be rewritten. A later accepted decision should explicitly supersede the obsolete implementation claim while preserving the record.

## Omen graph evidence

### Tracked footprint

Omen contains a tracked graphify-out directory:

| Component | Count/size |
|---|---:|
| Total tracked files | 186 |
| Total bytes | approximately 7,006,500 |
| Generated Graphify cache records classified by inventory | 181 |
| graph.json | 2,954,506 bytes |
| graph.html | 2,922,890 bytes |
| GRAPH_REPORT.md | 70,435 bytes |
| .graphify_labels.json | 7,739 bytes |
| .graphify_root | 42 bytes |

The most recent commit touching graphify-out is 2a4a33f0ae1128220fdd9dec08d3c65ff0b91f12 from 2026-06-27.

### Provenance and freshness

| Evidence | Observed value | Finding |
|---|---|---|
| GRAPH_REPORT date | 2026-06-25 | Older than the migration baseline. |
| Reported source commit | 13483bf7 | Does not match current HEAD. |
| graph.json built_at_commit | 13483bf7db97409652d5c0d91d7dba5e5edf4a4b | Full recorded provenance. |
| Current Omen HEAD | 065d4677d79c7ce9afe10b6cdb981d41f40a5471 | Graph is stale. |
| git cat-file for recorded commit | Not a valid object in this checkout | The exact source tree cannot be verified from current reachable objects. |
| .graphify_root | C:\Users\JDuve\dev\SLOPS\slops-saloon\omen | Machine-specific old checkout path. |

The stale graph remains useful as historical evidence, but its nodes and paths must not answer “what is current?”

### Graph structure

Direct graph.json inspection found:

| Metric | Value |
|---|---:|
| Nodes | 3,965 |
| Links | 4,995 |
| Communities | 306 reported |
| Directed | false |
| Multigraph | false |
| Hyperedges | 0 |
| Nodes with a repository attribute | 0 |
| Distinct source_file values | 370 |
| Source files present at current HEAD | 342 |
| Source files missing at current HEAD | 28 |
| Source files under mobile/ | 0 |

The report says “372 files,” while graph.json exposes 370 distinct source_file values. The report also says “0% INFERRED” and then reports one inferred edge. These may be reporting semantics rather than graph corruption, but they show why generated prose cannot be treated as a formal validation contract.

Missing current source examples include retired Direction wrappers, old Stripe/subscription files, and removed frontend theme components. The absence of any mobile source means the graph predates the native-mobile product boundary and cannot route current iOS or Android work.

### Repository and deployment hygiene

- graphify-out is not excluded by Omen .gitignore.
- graphify-out is not excluded by Omen .dockerignore.
- Omen’s Docker build context is the repository root. The Dockerfiles do not explicitly COPY graphify-out, but the directory is still sent to the builder unless excluded.
- Generated cache and visualization files therefore increase repository/build-context weight and may expose stale repository text to the build service even when they do not become image layers.

Any ignore change is a later implementation action. It was not made here.

## Shared-parent scan safety

Graphify’s installed package has built-in exclusions for common generated and control paths such as .git, node_modules, dist/build, and graphify-out. Static inspection of the installed ignore loader found no proof that a scan rooted at the sibling parent recursively applies each child repository’s own .gitignore or .graphifyignore.

Therefore this is not an approved generation command:

~~~powershell
graphify extract C:\Users\JDuve\dev\dbs-vnext-migration
~~~

A raw parent scan could ingest repository-specific ignored files, local environment files, generated output, large binaries, or inactive history. The audit did not test this by generating a graph.

Separate repository extraction followed by graphify merge-graphs is also insufficient as the canonical design. It can co-locate nodes from two graphs, but it does not prove that cross-repository relationships were extracted. Historical Omen notes report a merge that produced no cross-layer edges. “Merged” must not be reported as “connected” without controlled cross-repository link tests.

## Proposed unified workspace design

### Ownership

Slops OS owns:

- corpus policy and manifest;
- generation wrapper and version pin;
- authority-tier labels;
- freshness and secret-safety validation;
- canonical cross-repository output location;
- query benchmarks and acceptance evidence.

Omen owns the correctness of included Omen product, runtime, and deployment sources. Slops OS must not reinterpret Omen product truth through the graph.

### Proposed logical layout

Exact names remain subject to target-tree ratification:

~~~text
Slops-OS/
├── Blueprints/
│   └── tools/
│       └── graphify/
│           ├── README.md
│           ├── corpus-v1.yml
│           ├── output-manifest-v1.schema.json
│           └── query-benchmarks-v1.yml
├── scripts/
│   └── graphify/
│       ├── build-workspace-graph.*
│       └── validate-workspace-graph.*
└── References/
    └── graphify/
        └── workspace/
            ├── README.md
            ├── manifest.json
            ├── GRAPH_REPORT.md
            ├── graph.json
            └── graph.html              # optional generated view
~~~

Generated cache should live outside the committed References tree or be explicitly ignored. Whether graph.json and graph.html are committed, attached as review artifacts, or regenerated locally is a founder decision informed by size, reproducibility, and review needs. README.md, manifest.json, and the human report should always identify generated status and provenance.

### Corpus contract

The versioned corpus manifest should name both repositories and classify every include by authority tier:

1. Direction — current authoritative control state.
2. Blueprints — approved contracts.
3. References — supporting evidence, excluding Graphify’s own output.
4. Solutions — excluded by default; selected active migration/audit artifacts may be allowlisted and labeled non-authoritative.
5. Archive — excluded by default; opened only for a separately named provenance graph or explicit historical run.
6. Application source/config/tests — included only by justified runtime/build boundaries and explicit patterns.

Mandatory exclusions:

- .git and worktree metadata;
- graphify-out and References/graphify generated output;
- node_modules, build, dist, coverage, caches, package-manager caches, and logs;
- .env files, credential material, keys, tokens, local settings, database dumps, and secret-bearing exports;
- binaries, archives, media, and design exports unless explicitly approved;
- inactive Archive content in the current-truth graph;
- generated inventory data unless a specific review use requires it.

The manifest must list normalized repository identifiers, include/exclude patterns, maximum file size, allowed extensions, authority tier, and reason. Before Graphify runs, a dry-run corpus listing and digest must be reviewable without model/API use.

### Safe two-repository input

Preferred generation flow:

1. Resolve the two approved sibling roots and record their exact SHAs.
2. Reject dirty or unexpected roots unless the run explicitly records the review state.
3. Materialize only allowlisted files into a temporary, deterministic staging tree:

~~~text
workspace/
├── slops-os/<repo-relative paths>
└── omen/<repo-relative paths>
~~~

4. Scan the staged workspace once so explicit and semantic cross-repository relationships can be extracted in one corpus.
5. Rewrite machine paths in metadata to repository IDs plus repo-relative paths.
6. validate, then publish generated outputs under Slops OS References only after approval.
7. remove the temporary staging directory through an explicit, verified cleanup step.

The staging mechanism must preserve bytes and repo-relative paths, avoid following links outside the allowlist, and never modify either source worktree. A broad raw parent scan is not the fallback.

### Required metadata

manifest.json should contain at least:

- metadata schema version;
- generated_at in UTC;
- Graphify package and wrapper version;
- Slops OS repository URL, branch, and full SHA;
- Omen repository URL, branch, and full SHA;
- corpus-manifest version and SHA-256 digest;
- exact included file count and corpus digest per repository;
- include/exclude summary and authority-tier counts;
- generation mode, backend/model if any, and whether network/model inference occurred;
- node, link, community, cross-repository link, and missing-source counts;
- validation result and query-benchmark result;
- output digests;
- generated/non-authoritative notice.

Do not store workstation usernames, absolute checkout paths, API keys, prompts containing secrets, or provider credentials.

### Advisory query behavior

Graphify can answer “where should I look?” and “what might this affect?” It cannot decide:

- which Direction fact is accepted;
- whether a Blueprint is approved;
- whether a Solution should be promoted;
- whether an old decision is superseded;
- whether a code move is authorized.

Every query result used for planning must cite repository ID and source path. When graph output conflicts with the source file, the source file and DBS authority order win.

## Proposed dispositions

No disposition below was executed. “Current” is the audit holding state; “conditional final” applies only after canonical design approval, successful regeneration, provenance capture, and link repair.

| Artifact | Current disposition | Conditional final disposition | Reason/gate |
|---|---|---|---|
| Omen/graphify-out/graph.json | REVIEW | ARCHIVE | Preserve stale graph provenance until a validated workspace graph replaces it. |
| Omen/graphify-out/GRAPH_REPORT.md | REVIEW | ARCHIVE | Historical report documents the old corpus and contradictions. |
| Omen/graphify-out/.graphify_labels.json | REVIEW | ARCHIVE | Labels may be useful for historical comparison; not current authority. |
| Omen/graphify-out/graph.html | REVIEW | DELETE | Reproducible visualization may be removed only after replacement proof and review. |
| Omen/graphify-out/cache/** | REVIEW | DELETE | Generated cache should not be canonical history; delete only after replacement/rollback needs are resolved. |
| Omen/graphify-out/.graphify_root | REVIEW | DELETE | Absolute machine path is unsafe and already captured in this audit. |
| Omen .gitignore / .dockerignore Graphify rules | REVIEW | CONVERT | Add approved generated-output exclusions as a separate hygiene change. |
| Workstation-installed slops-graphify draft | REVIEW | CONVERT | Use only as input to a newly approved repository-owned wrapper; do not copy as authority. |
| Historical decisions claiming v0.1.3 runner | KEEP | KEEP | Preserve decision lineage; supersede with a new accepted record rather than rewriting history. |

## Generation and validation phases

### Phase A — no model, no graph output

1. Ratify the target tree, ownership, corpus policy, and output retention.
2. Implement corpus dry-run listing, secret/path checks, and metadata schema.
3. Pin Graphify and wrapper versions.
4. Verify both repository SHAs and approved clean/dirty state.
5. Review the corpus list and digest.

### Phase B — approval-gated generation

1. Founder approves backend/model, data exposure, network use, and cost cap if semantic extraction is used.
2. Build the temporary allowlisted staging tree.
3. Run a single workspace extraction into a disposable output directory.
4. Record raw command, versions, duration, cost, and output hashes.
5. Do not overwrite Omen graphify-out.

Graphify commands are intentionally omitted as an executable recipe until the corpus wrapper exists. Direct extract/update/merge commands can write output and must not bypass the wrapper.

### Phase C — structural validation

- metadata validates against the pinned schema;
- both SHAs and corpus digest match the reviewed input;
- zero absolute workstation paths;
- zero source paths outside the allowlist;
- zero secret-pattern hits;
- zero missing included source files;
- all nodes have repository ID, repo-relative source, and authority tier where applicable;
- graph/report counts reconcile or documented tool semantics explain differences;
- expected native-mobile contracts/sources appear when included by policy;
- known explicit cross-repository references resolve to cross-repository relationships;
- graphify diagnose reports understood multigraph/collapse behavior;
- output digests are stable for the same deterministic stages.

### Phase D — human query benchmarks

Benchmark queries should cover:

- current Slops governance route;
- current Omen sprint and accepted decision lineage;
- Direction schema ownership;
- Omen web, iOS, Android, API, and deploy boundaries;
- cross-repository governance references;
- a superseded decision that must remain historical;
- an active Solution that must remain non-authoritative.

A benchmark passes only if the graph points to the correct source files and the human authority answer agrees with Direction/Blueprints. Useful-looking community labels are not an acceptance criterion.

### Phase E — publication

After founder review:

1. publish the approved generated subset under Slops OS References/graphify/workspace/;
2. add a freshness-only CI check that does not invoke a model;
3. decide whether Omen’s stale output is archived/deleted according to the ratified manifest;
4. repair links and Docker/Git ignore behavior in separate scoped commits;
5. record a Direction decision that supersedes obsolete Graphify ownership/runner claims.

## Commands actually run

Read-only commands included:

~~~powershell
graphify --version
graphify --help
Get-Content graphify-out/.graphify_root
Get-Content graphify-out/GRAPH_REPORT.md
git log -1 -- graphify-out
git cat-file -t <recorded-built-commit>
~~~

The graph JSON was parsed read-only to count nodes, links, source files, missing paths, repository attributes, hyperedges, and mobile coverage.

## Commands not run

- graphify extract
- graphify update
- graphify merge-graphs
- graphify cluster-only
- graphify label
- graphify tree
- graphify save-result
- any deletion, move, ignore-file edit, or canonical publication

## Readiness

Graphify is **not ready for canonical regeneration**. The necessary architecture is clear, but the corpus manifest, path normalization, metadata schema, secret-safety gate, version pin, output-retention decision, and founder-approved model/cost posture do not yet exist. The current Omen graph should remain in REVIEW until those prerequisites are met.
