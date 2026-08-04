# DBS vNext proposed target trees

> **Status:** DRAFT architecture proposal for founder review. This file is a Solution, not Direction or Blueprint authority.
>
> **Scope:** knowledge architecture and repository boundaries only. It does not approve moves, deletions, wrapper replacement, Graphify regeneration, Direction rewrites, or application-code reorganization.
>
> **Evidence baseline:** Slops OS `814f77a829dd10a53601354e167adedb58c6ecdf`; Omen `065d4677d79c7ce9afe10b6cdb981d41f40a5471`; both on `refactor/dbs-vnext-migration`. See `slops-os-inventory.md` and `omen-inventory.md` in this audit folder.

## Architecture judgment

The target should simplify knowledge routing without disguising code moves as documentation cleanup.

- Both repositories retain the five DBS knowledge roots: `Direction/`, `Blueprints/`, `References/`, `Solutions/`, and `Archive/`.
- Slops OS remains the owner of DBS governance, Direction schemas, reusable workflows, runtime-adapter conventions, context-health tooling, and the canonical cross-repository graph.
- Omen remains the owner of product truth, product contracts, application runtime prompts, native rules, provider behavior, deployment runbooks, and application code.
- Slops OS and Omen remain separate Git repositories in one parent workspace. Omen is not moved into, copied into, or mirrored under Slops OS.
- Omen's existing runtime and build boundaries remain at their current paths. An `apps/`, `services/`, `packages/`, `infra/`, or plural `tests/` reorganization is not justified by the present evidence and would be a separate implementation workstream.
- Generated maps and reports are views with provenance. They never outrank Direction or approved Blueprints.

## Slops OS proposed target

The inner folders shown below are an information architecture, not a move authorization. Exact Direction filenames and schemas remain subject to the Direction v1 ratification owned by Slops OS issue #15.

```text
Slops-OS/
├── .gitattributes
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── Direction/
│   ├── README.md
│   ├── facts-of-record/
│   │   ├── index.md
│   │   └── <FACT-ID>.md
│   ├── current-state.md
│   ├── agent-inbox/
│   │   ├── index.md
│   │   └── <INBOX-ID>.md
│   ├── current-sprint/
│   │   ├── index.md
│   │   └── <SPRINT-ID>.md
│   ├── roadmap.md
│   ├── decisions/
│   │   ├── index.md
│   │   └── <DECISION-ID>.md
│   ├── known-issues/
│   │   ├── index.md
│   │   └── <ISSUE-ID>.md
│   ├── continuation.md
│   └── session-close.md
├── Blueprints/
│   ├── governance/
│   ├── schemas/
│   │   └── direction/v1/
│   ├── repository-boundaries.md
│   ├── workflows/
│   ├── skills/
│   ├── tools/
│   ├── templates/
│   └── agents/
├── References/
│   ├── sources/
│   ├── research/
│   ├── patterns/
│   └── graphify/
│       └── workspace/              # generated cross-repository view
├── Solutions/
│   ├── audits/
│   │   └── dbs-vnext/
│   ├── investigations/
│   ├── proposals/
│   └── generated/
├── Archive/
│   ├── dbs-vnext/
│   ├── authority-routing/
│   └── historical-planning/
└── slops-saloon/
    ├── AGENTS.md
    ├── CLAUDE.md
    ├── README.md
    ├── Direction/
    ├── Blueprints/
    ├── References/
    ├── Solutions/
    └── Archive/
```

### Slops OS top-level justification

| Root | Purpose and owner | Routing behavior | Why it remains | Current material that maps here |
| --- | --- | --- | --- | --- |
| `Direction/` | Small, current L0 control plane owned by Slops OS. | A cold start reaches facts, current state, active work, blockers, decisions, and continuation here before detailed doctrine. | The migration charter requires a stable, versioned planning interface. | Existing `Direction/`; current parts of root `context.md`; `Direction/TODO.md` converted into the v1 inbox/sprint interfaces; accepted founder intent from root `manifesto.md` after a founder-intent diff. |
| `Blueprints/` | Approved DBS governance, schemas, reusable workflows, skills, tools, templates, agent conventions, and repository-boundary rules owned by Slops OS. | Direction records link only to the governing Blueprint needed for the task. | These contracts are reusable across repositories and should not be mirrored into Omen. | Existing `Blueprints/`; stable boundary content from `DBS_INDEX.md`; approved reusable content extracted from legacy organizational scaffolding. |
| `References/` | Evidence, research, source material, patterns, and generated maps owned by Slops OS. | Read on demand from Direction or Blueprints; never treated as accepted truth by location alone. | The canonical parent-workspace Graphify view and external evidence need a non-authoritative home. | Existing `References/`; future generated workspace graph; evidence moved out of Direction reviews. |
| `Solutions/` | Audits, investigations, proposals, migration plans, and generated work awaiting review. | Explicitly non-authoritative until promoted through a recorded decision. | Model-generated and investigative work needs a reviewable landing zone that cannot masquerade as Direction. | Existing `Solutions/`; this DBS vNext audit; current `Direction/reviews/` material moved here after link repair. |
| `Archive/` | Inactive history and provenance. | Excluded from cold-start routing; consulted only through an explicit link or historical question. | Historical decisions and scaffolding remain useful, but must not look active. | Existing `Archive/`; `00_Executive_Office/`, `01_Operations_COO/`, `02_Engineering_CTO/`, `03_Security_CISO/`, `04_Brand_CMO/`, `Projects/`, superseded prompts, and displaced root snapshots after merge proof. |
| `slops-saloon/` | Real Layer 1 division boundary owned inside Slops OS. It contains company/division strategy, content, brand direction, and future product portfolio context, not Omen application code. | Its thin adapters route first to its own Direction and then to shared L0 Blueprints by link. | This is a genuine organizational and routing boundary, unlike the department-role folders. | Existing `slops-saloon/` after its own current-versus-historical reconciliation. The separate Omen repository is referenced, not nested or mirrored. |

### Slops OS root files

The final root should contain only repository-required configuration, two thin runtime adapters, and orientation:

- Keep `.gitattributes` and `.gitignore` because Git behavior depends on them.
- Convert `AGENTS.md` and `CLAUDE.md` into short vendor adapters that point to the same Direction and Blueprint sources. They must not duplicate governance or product truth.
- Convert `README.md` into a human orientation and repository-ownership page.
- Merge current facts from root `context.md` into `Direction/current-state.md`, preserve useful historical context under Archive, then retire the loose root copy.
- Merge stable boundary content from `DBS_INDEX.md` into `Blueprints/repository-boundaries.md` and root orientation; remove hard-coded workstation paths.
- Merge approved founder intent from root `manifesto.md` into a founder-approved Direction or governance record. Do not infer approval from the file's current location.

## Omen proposed target

This target deliberately preserves the current code, test, deployment, and automation paths. The knowledge cleanup can proceed without first creating a fashionable monorepo layout.

```text
omen/
├── .github/                         # CI and release automation
├── .dockerignore
├── .env.example
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── package.json
├── package-lock.json
├── Dockerfile
├── Dockerfile.cron
├── docker-compose.yml
├── docker-compose.hostinger.yml
├── probo.yaml
├── Direction/
│   ├── README.md
│   ├── facts-of-record/
│   │   ├── index.md
│   │   └── <FACT-ID>.md
│   ├── current-state.md
│   ├── agent-inbox/
│   │   ├── index.md
│   │   └── <INBOX-ID>.md
│   ├── current-sprint/
│   │   ├── index.md
│   │   └── <SPRINT-ID>.md
│   ├── roadmap.md
│   ├── decisions/
│   │   ├── index.md
│   │   └── <DECISION-ID>.md
│   ├── known-issues/
│   │   ├── index.md
│   │   └── <ISSUE-ID>.md
│   ├── continuation.md
│   └── session-close.md
├── Blueprints/
│   ├── architecture/
│   ├── design/
│   ├── brand/
│   ├── mobile/
│   ├── providers/
│   ├── security/
│   ├── deployment/
│   ├── legal/
│   ├── workflows/
│   ├── schemas/
│   ├── schema-cache/
│   │   └── slops-os/direction-v1/
│   └── templates/
├── References/
│   ├── evidence/
│   ├── sources/
│   ├── research/
│   └── graphify/
│       └── omen-view/              # optional generated repository-only view
├── Solutions/
│   ├── audits/
│   ├── investigations/
│   ├── proposals/
│   ├── prototypes/
│   └── generated/
├── Archive/
│   ├── decisions/
│   ├── handoffs/
│   ├── prompts/
│   ├── evidence/
│   └── dbs-vnext/
├── src/                             # Express API/backend runtime
├── frontend/                        # primary React/Vite web app
├── client/                          # legacy SPA still built by Docker and CI
├── mobile/                          # SwiftUI iOS + Compose Android boundary
├── extension/                       # browser/Safari extension boundary
├── test/                            # backend and contract tests
├── evals/                           # prompt/behavior evaluation assets
├── scripts/                         # repository and operational helpers
├── sql/                             # review-only database source
└── deploy/                          # Hostinger/KVM1 and Nginx runtime config
```

### Omen top-level justification

| Root | Purpose and owner | Routing/build behavior | Why it remains | Current material that maps here |
| --- | --- | --- | --- | --- |
| `.github/` | Omen CI, build, release, native validation, and dependency automation. | Workflows reference current root package, `frontend/`, `client/`, `mobile/`, Docker, tests, and deploy behavior. | Renaming or nesting this boundary has no knowledge-routing benefit and can silently stop path-triggered checks. | Existing `.github/` unchanged unless a separate CI change is approved and validated. |
| `Direction/` | Small, current Omen product control plane. | Root adapters route here first; records link to detailed product Blueprints and evidence. | Omen issue #278 requires preservation of mobile-native priority, provider requirements, backend priorities, and active sprint commitments through schema migration. | Existing facts, inbox, sprint, roadmap, known issues, decisions, and current-state facts after line-by-line reconciliation. Closed sprint history and reviews leave the active control plane. |
| `Blueprints/` | Approved Omen product, architecture, native, design, brand, provider, security, legal, deployment, workflow, and schema contracts. | Read only when selected by a Direction item or relevant code boundary. | Omen-specific build rules belong with Omen and must not be fully mirrored in Slops OS. | Existing approved Blueprints; approved material from `Brand/`, `Legal/`, canonical source logos, app-local workflow contracts, and current handoff contracts after supersession review. |
| `References/` | Omen evidence, official sources, research, screenshots, and optional generated repository views. | Non-authoritative; linked from Direction, Blueprints, or Solutions. | Evidence must survive without being confused with a product decision. | Existing References; accepted screenshots from `docs/`, `.Codex/`, `output/`, and Solutions evidence folders; optional Omen-only Graphify output with provenance. |
| `Solutions/` | Omen audits, investigations, proposals, prototypes, generated drafts, and active reviewable content. | Never becomes authority without a decision and promotion. | The repository currently mixes audits and generated work into active-looking locations. | Existing Solutions; Direction reviews; active generated media/output; migration artifacts. Accepted evidence moves to References and inactive work moves to Archive. |
| `Archive/` | Inactive Omen history and provenance. | Excluded from normal cold starts and task routing. | Dated handoffs, superseded prompts, old decisions, and screenshots remain valuable but must not appear current. | Existing Archive; dated or superseded handoffs/prompts; closed sprint receipts; retired root context snapshots; inactive evidence. |
| `src/` | Express API, route, adapter, service, cron, and runtime-prompt code boundary. | Root `package.json`, Docker image, server mounts, and backend tests depend on it. If a runtime prompt survives, it must be shipped from this runtime boundary or another explicitly copied package. | The API is a real runtime boundary. Moving it to `services/api/` would change imports, Docker, CI, and deployment paths without a demonstrated benefit. | Existing `src/` unchanged during the documentation migration. |
| `frontend/` | Primary React/Vite web application. | `src/server.js` serves `frontend/dist`; Docker and CI build it. | This is a real application/build boundary. | Existing `frontend/` unchanged. |
| `client/` | Legacy React/Vite client still included in build automation. | Docker builds and copies `client/dist`; CI also builds it, although the current server serves `frontend/dist`. | Runtime use is questionable, but build dependencies make deletion or movement unsafe without a separate retirement proof. | Existing `client/` retained with disposition `REVIEW`; retire only after Docker/CI/runtime validation and founder approval. |
| `mobile/` | Native application boundary containing SwiftUI iOS and Compose Android projects plus mobile-local material. | Native CI, Xcode/Gradle project paths, platform tests, and delivery rules depend on the current layout. | The founder-approved native pivot makes this a first-class application boundary. Splitting into `apps/ios/` and `apps/android/` is not justified during knowledge migration. | Existing `mobile/ios/`, `mobile/android/`, and `mobile/contracts/` remain in place pending contract-location review. |
| `extension/` | Browser/Safari extension application boundary. | Packaging and extension-specific code use this path. | It is a separately built/distributed product surface, not knowledge clutter. | Existing `extension/` unchanged. |
| `test/` | Backend, route, provider, and contract tests. | Root test commands and imports depend on this singular path. | Renaming to `tests/` is cosmetic and high-churn. | Existing `test/` unchanged. |
| `evals/` | Prompt and behavior evaluation fixtures and guards. | Root npm scripts and CI path filters depend on it. | Evaluation artifacts are executable validation inputs, not References. Their current coverage needs repair, but the boundary is justified. | Existing `evals/`; future evals should target the actual shipped runtime prompts. |
| `scripts/` | Repository QA, verification, migration, and operational helpers. | Commands and runbooks call scripts by path. | Executable helpers are a real tooling boundary and should not be buried in knowledge folders. | Existing `scripts/` unchanged; future context-health scripts require their own reviewed additions. |
| `sql/` | Review-only database schema/migration source. | Applying SQL remains a separately gated founder action; repository presence is not production application. | The explicit data-safety boundary is valuable and current. | Existing `sql/` unchanged; destructive statements retain review metadata and approval gates. |
| `deploy/` | Omen Hostinger/KVM1 compose, Nginx, and operating material. | Deployment workflow and live host paths depend on it. | `deploy/` already describes the real infrastructure boundary; renaming to `infra/` adds churn and risks the release path. | Existing `deploy/` unchanged. |

### Omen root files

Keep root files that build, test, package, deploy, or orient the repository:

- Keep root package, lockfile, Dockerfiles, Compose files, `.dockerignore`, `.env.example`, `.gitignore`, and `probo.yaml` at their current paths unless a tool-specific validation proves a move safe.
- Convert `AGENTS.md` and `CLAUDE.md` into thin adapters that route to the same Omen Direction sources and relevant Blueprints.
- Merge unique, current safety or command content from singular `AGENT.md` into canonical sources, then remove it as a competing entry surface only after OpenAI cold-start validation.
- Convert `README.md` into accurate repository/build orientation; it must not retain paid-product, Oracle-hosting, or retired architecture claims.
- Merge current facts from root `context.md` into `Direction/current-state.md`, archive its old resume snapshot, and retire the loose root file after link repair.
- Convert `DBS_INDEX.md` into relocatable repository/workspace orientation or merge its stable boundary content into the root README and approved repository-boundary Blueprint. Remove hard-coded workstation paths.

## Roots proposed for absorption, not immediate removal

These current Omen roots do not represent durable top-level runtime or DBS boundaries. Their contents still require manifest-level review before the root can disappear.

| Current root | Proposed mapping | Safety condition before removal |
| --- | --- | --- |
| `.agents/` | Canonical workflow contract to Omen `Blueprints/workflows/`; executable QA drivers to `scripts/qa/`; screenshots to `References/evidence/`; any runtime install becomes a generated, non-authoritative adapter. | Inventory every invocation and prove the skill still loads and its QA commands still run. |
| `.Codex/` | Move retained screenshots/evidence to References or Archive. | Repair inbound references and prove no runtime expects the vendor-specific path. |
| `Brand/` | Approved brand rules and canonical source assets to `Blueprints/brand/`; active campaigns/drafts to Solutions; accepted evidence to References; inactive production history to Archive. | Founder review of canonical assets and content lifecycle; served copies under app public folders remain untouched. |
| `docs/` | Current evidence to `References/evidence/`; inactive PR screenshots to Archive. | Link inventory and evidence-retention review. |
| `graphify-out/` | Optional generated Omen view to `References/graphify/omen-view/`; reproducible cache omitted from hand-maintained truth. | Do not move or regenerate until graph ownership, excludes, provenance, and link repair are ratified. |
| `Legal/` | Approved product legal contracts and copy to `Blueprints/legal/`; source research to References. | Founder/counsel status review and publication-path validation. |
| `logos/` | Canonical source assets to `Blueprints/brand/assets/`; served copies remain in application public folders. | Hash/source-of-truth review and visual/build validation. |
| `memory/` | Durable historical value to Archive; otherwise DELETE only after replacement/provenance proof. | Confirm no active runtime loader reads it. |
| `output/` | Active generated work to `Solutions/generated/`; accepted evidence to References; inactive output to Archive. | Identify producer, consumer, and evidence status for every file. |
| `skills/` | Omen-specific reusable contracts to `Blueprints/workflows/` or `Blueprints/skills/`; genuinely cross-product workflows proposed to Slops OS rather than mirrored. | Skill ownership, install path, invocation, and cold-start validation. |

No content is deleted merely because its current root is absent from the target tree.

## Generated and reference views

### Canonical workspace graph

Slops OS owns the canonical graph at a path such as:

```text
Slops-OS/References/graphify/workspace/
├── README.md               # generated-view warning and rebuild command
├── manifest.json           # tool/version, repo commits, excludes, timestamps
├── graph.json              # generated graph
└── report.md               # generated human-readable summary
```

The generator scans the parent workspace containing both repositories. It records each repository commit independently and excludes Git internals, dependencies, build products, secrets, binaries, archived generated caches, and the graph output itself.

### Optional Omen view

An Omen-only view may exist under `omen/References/graphify/omen-view/` when it materially helps standalone work. It must carry the same generated warning and provenance fields. It may not duplicate manually maintained product facts, decisions, sprint state, or route contracts.

Current Omen `graphify-out/` is not migration authority: its report records a 2026-06-25 build from unresolved commit `13483bf7`, only 370 unique source paths, no `kickoff-l2.md`, and no mobile sources, while the repository now has 1,704 tracked files. Preserve it in place during discovery; decide later whether to archive the snapshot or replace it with a reproducible view.

Generated HTML, caches, and graph files are never edited as truth. If retained in Git, they are reproducible review artifacts with provenance; otherwise CI or local generation publishes them as artifacts.

## What stays in place during discovery and ratification

Until the founder approves the target architecture and migration manifest:

1. Both repositories stay on their current migration branches and remain separate Git repositories.
2. All five DBS roots stay at their current paths in both repositories.
3. Slops OS legacy organizational roots, `Projects/`, root context/index/manifesto files, and current L1 structure stay in place.
4. Omen `.github/`, `src/`, `frontend/`, `client/`, `mobile/`, `extension/`, `test/`, `evals/`, `scripts/`, `sql/`, and `deploy/` stay at their exact paths.
5. Omen root package, Docker, Compose, environment-example, compliance, and runtime adapter files stay at their exact paths.
6. Omen `.agents/`, `.Codex/`, `Brand/`, `docs/`, `graphify-out/`, `Legal/`, `logos/`, `memory/`, `output/`, and `skills/` stay in place until their individual manifests, inbound links, consumers, and rollback paths are approved.
7. Current Direction records are not normalized in place if doing so could change product meaning. Invalid or stale fields are findings for founder review, not permission to rewrite the queue.
8. Dated handoffs, decision logs, ledgers, prompts, and evidence are not bulk-moved, rewritten, or deleted.
9. Graphify output is not regenerated or relocated during discovery.
10. The only discovery additions belong under `Solutions/audits/dbs-vnext/` and remain explicitly non-authoritative.

## Separate future workstreams

The following must not share a commit group with DBS knowledge moves:

- retiring `client/` or changing Docker/CI SPA behavior;
- moving `src/` to `services/api/`;
- splitting `mobile/` into `apps/ios/` and `apps/android/`;
- creating `packages/shared-contracts/`;
- renaming `deploy/` to `infra/`;
- renaming `test/` to `tests/`;
- changing runtime prompt loading or Docker copy behavior;
- changing CI path filters;
- applying SQL or changing any production/deployment state.

Each requires its own evidence, path-impact inventory, validation commands, rollback point, and founder approval where applicable.

## Ratification gates

This target is ready to implement only after all of the following are true:

- Direction v1 schemas and transition rules are approved.
- Every moved artifact has one manifest row with disposition, destination, link repairs, risk, validation, rollback, and commit group.
- Competing truth in Omen's facts, context, README, Direction queue, infrastructure docs, API reference, handoffs, and decisions is explicitly resolved by the founder or a later accepted decision.
- OpenAI and Claude cold-start tests agree on current truth and read substantially less historical context.
- Internal links and case-sensitive paths pass after each move group.
- Omen knowledge moves pass relevant documentation checks without changing code paths.
- Any later code-boundary change passes the corresponding tests, builds, Docker validation, CI-path validation, and deployment-path review.
- Graphify regeneration happens only after paths stabilize and is verified as a generated view rather than authority.
