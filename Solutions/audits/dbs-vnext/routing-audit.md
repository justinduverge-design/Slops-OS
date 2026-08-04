# DBS vNext agent-routing audit

> **DRAFT — NON-AUTHORITATIVE — FOUNDER REVIEW REQUIRED**
>
> Evidence snapshot: 2026-08-03. This audit proposes a routing contract; it does not replace any wrapper, Direction record, product decision, or active workflow.

Governing basis: [Slops OS #14](https://github.com/justinduverge-design/Slops-OS/issues/14), [Slops OS #15](https://github.com/justinduverge-design/Slops-OS/issues/15), and [Omen #278](https://github.com/justinduverge-design/omen/issues/278).

## Executive judgment

Both runtimes can enter both repositories, but they do not currently receive the same reliable route to current truth.

- Codex automatically discovers AGENTS.md. Claude Code automatically discovers CLAUDE.md. Singular AGENT.md is not a supported automatic entry file for either runtime.
- The Omen wrappers manually send both runtimes through AGENTS.md, AGENT.md, and CLAUDE.md in a circular chain. The singular file adds a backend lean to every task, including mobile, frontend, and infrastructure work.
- Slops OS has vendor-paired wrappers plus lowercase department agents.md files. Those lowercase files happen to load as Codex instructions on this case-insensitive Windows filesystem, but are not a portable cross-platform convention and are invisible to Claude unless explicitly referenced.
- The entry files are short enough by themselves, but their mandatory startup reads are not. Omen’s wrapper-directed union is approximately 559 KB and 7,491 lines before a task-specific contract is opened. This makes “read everything first” the routing system.
- Several stale root indexes, legacy context files, role charters, and ambiguous “latest handoff” rules can send an agent away from current Direction truth.

The correct target is one shared canonical context system per repository, with small vendor adapters that select a bounded Direction bootstrap and then load task-relevant Blueprints and References on demand.

## Runtime behavior used as the audit baseline

### OpenAI / Codex

The current Codex implementation walks from the project root to the working directory, finds AGENTS.md at each level, and concatenates them root-to-leaf. A closer file is later in the instruction stream. The search stops at the repository root. See the [Codex AGENTS implementation](https://github.com/openai/codex/blob/main/codex-rs/core/src/agents_md.rs).

This means:

- AGENT.md and CLAUDE.md are not automatic Codex project-instruction files.
- Nested AGENTS.md is justified only when a real subtree needs additional rules.
- A lowercase agents.md resolves on this Windows filesystem but is not a safe case-sensitive repository contract.
- Direct system, developer, and user instructions still outrank repository guidance.

OpenAI’s [harness engineering guidance](https://openai.com/index/harness-engineering/) recommends treating the repository as a map and keeping AGENTS.md as a compact table of contents rather than an exhaustive manual. That matches the governing DBS vNext intent.

### Anthropic / Claude Code

Claude Code loads CLAUDE.md files through its memory system. Parent and child project instructions are combined, and closer instructions are later; conflicting instructions should not be treated as deterministic overrides. Anthropic recommends a short project CLAUDE.md and supports importing shared instructions, including the documented CLAUDE.md import pattern. See [Claude Code memory](https://code.claude.com/docs/en/memory).

This means:

- AGENTS.md and singular AGENT.md are not automatic Claude project-memory filenames.
- A thin CLAUDE.md can point at model-neutral canonical guidance instead of duplicating it.
- --bare and --safe-mode cannot be used to evaluate normal project routing because each disables CLAUDE.md auto-discovery.
- /context or the InstructionsLoaded hook can verify loaded memory in an interactive session; no equivalent local no-inference dump was found in the installed CLI.

## Entry-file inventory

### Slops OS worktree

| Path | Bytes | Lines | Automatic behavior | Finding |
|---|---:|---:|---|---|
| AGENTS.md | 1,852 | 22 | Codex root entry | Small wrapper, but it mandates broad context and the full routing registry. |
| CLAUDE.md | 2,863 | 30 | Claude root entry | Duplicates substantial routing content and carries a stale “no Graphify” statement. |
| slops-saloon/AGENTS.md | 2,174 | 32 | Additional Codex entry below slops-saloon | Near-duplicate of the adjacent Claude wrapper. |
| slops-saloon/CLAUDE.md | 2,176 | 32 | Additional Claude entry below slops-saloon | Near-duplicate of the adjacent Codex wrapper. |
| 00_Executive_Office/agents.md | 2,151 | 111 | Loads for Codex on Windows only by case-insensitive path resolution | Stale role charter and non-portable filename. |
| 01_Operations_COO/agents.md | 1,143 | 38 | Same Windows-only behavior | Contains fixed commercial posture beyond a thin adapter’s role. |
| 02_Engineering_CTO/agents.md | 1,282 | 32 | Same Windows-only behavior | Directs clean-slate rewriting into Projects, conflicting with evidence-first migration. |
| 03_Security_CISO/agents.md | 1,872 | 49 | Same Windows-only behavior | Grants autonomous hardening posture that can conflict with approval gates. |
| 04_Brand_CMO/agents.md | 3,818 | 64 | Same Windows-only behavior | Contains stale Slops Nexus rebrand direction. |

The root wrappers are not the whole load. Counting the current first-order and always-read material they mandate yields approximately 67,946 bytes / 1,116 lines for Codex and 68,602 bytes / 1,118 lines for Claude. About 35 KB is the full skill-routing registry, even when no skill is needed.

### Omen worktree

| Path | Bytes | Lines | Automatic behavior | Finding |
|---|---:|---:|---|---|
| AGENTS.md | 3,150 | 52 | Codex root entry | Tells Codex to read singular AGENT.md, then eleven core documents, latest handoff, and additional gates. |
| CLAUDE.md | 3,087 | 52 | Claude root entry | Sends Claude through the same broad repository context and cross-references AGENTS.md. |
| AGENT.md | 2,980 | 124 | Not automatic | Backend-specific worker doctrine is manually injected into all task types and points back to AGENTS.md and CLAUDE.md. |

No nested project adapters were found under frontend, mobile/ios, mobile/android, src, deploy, or infrastructure paths. Therefore every Omen task starts with the same root doctrine and the same backend-biased manual chain.

The union of files required by the current Omen wrappers is 18 unique files totaling approximately 559,090 bytes and 7,491 lines. The largest required reads are:

| File | Bytes | Lines |
|---|---:|---:|
| Direction/decision_log.md | 233,983 | 940 |
| Blueprints/handoffs/backend-to-frontend.md | 154,449 | 4,047 |
| Blueprints/handoffs/frontend-to-backend.md | 61,189 | 1,082 |
| Direction/current_sprint.md | 28,416 | 325 |

A native task adds at least another 55,522 bytes / 1,074 lines of fixed mobile material before its approved Figma screen and API/state contract are selected.

These figures describe wrapper-mandated reads, not hidden model tokens or an inference trace.

## Mechanical Codex routing evidence

The installed Codex CLI is 0.130.0. Its user config currently contains model_reasoning_effort = "ultra", which this CLI rejects. The following no-inference inspection works with an explicit supported override:

~~~powershell
codex debug -c 'model_reasoning_effort="xhigh"' prompt-input ROUTING_PROBE
~~~

Unique marker counts in the generated prompt input were:

| Starting directory | Root repo AGENTS marker | Nested AGENTS marker | Singular AGENT marker | CLAUDE marker | Result |
|---|---:|---:|---:|---:|---|
| Slops OS root | 1 | 0 | n/a | 0 | Root AGENTS.md loaded. |
| Slops OS/slops-saloon | 1 | 1 | n/a | 0 | Root and nested AGENTS.md loaded in order. |
| Slops OS/00_Executive_Office | 1 | 1 | n/a | 0 | Lowercase agents.md loaded on Windows. |
| Omen root | 1 | 0 | 0 | 0 | Only AGENTS.md loaded automatically. |
| Omen/mobile/android | 1 | 0 | 0 | 0 | Same root-only automatic route. |

The test proves instruction-file discovery, not whether a model obeys the instructions. No Codex model invocation was made.

## Current routing map

| Start location | Codex automatic project route | Claude automatic project route | Manual/transitive route imposed by project files | Risk |
|---|---|---|---|---|
| Slops OS root | AGENTS.md | CLAUDE.md | Root context, Direction entries, modules, full skill-routing registry | Broad startup; vendor drift. |
| Slops OS governance areas | Root AGENTS.md | Root CLAUDE.md | Same broad root route | No scoped governance selector; historical material can be reached through indexes. |
| Slops OS/slops-saloon | Root + slops-saloon/AGENTS.md | Root + slops-saloon/CLAUDE.md | Nearly identical vendor-specific instructions | Duplicate maintenance and possible divergence. |
| Slops OS company-role folders | Root + lowercase local agents.md on Windows | Root CLAUDE.md only | Stale role doctrine for Codex; no equivalent Claude route | Runtime and operating-system divergence. |
| Omen root | AGENTS.md | CLAUDE.md | AGENTS → AGENT → AGENTS + CLAUDE; CLAUDE → AGENTS → AGENT → CLAUDE | Circular adapter leakage. |
| Omen frontend/web | Root AGENTS.md | Root CLAUDE.md | Same full Omen startup and backend AGENT.md | Backend bias; no scoped UI contract selector. |
| Omen iOS | Root AGENTS.md | Root CLAUDE.md | Same full startup plus seven fixed native documents and relevant design/API contract | Very high context burden. |
| Omen Android | Root AGENTS.md | Root CLAUDE.md | Same as iOS | Same burden; no Android-local routing. |
| Omen backend/API | Root AGENTS.md | Root CLAUDE.md | Backend AGENT.md is relevant here, but still loops through both vendor files | Relevant content is packaged incorrectly. |
| Omen deployment/infra | Root AGENTS.md | Root CLAUDE.md | Backend doctrine plus deployment reads on demand | Authority and deploy guard can compete. |

User-level files also exist at ~/.codex/AGENTS.md and ~/.claude/CLAUDE.md. They are environment inputs, not repository-owned truth, and should be recorded by cold-start tests without being copied into either repository.

## Competing and stale authority claims

### Circular Omen entry layer

The current manual chain makes vendor adapters part of canonical knowledge:

~~~text
Codex auto-load:
AGENTS.md
  -> AGENT.md
     -> AGENTS.md
     -> CLAUDE.md

Claude auto-load:
CLAUDE.md
  -> AGENTS.md
     -> AGENT.md
        -> CLAUDE.md
~~~

This has no stable precedence rule. Unique backend safety rules belong in an approved scoped Blueprint or backend subtree adapter; vendor wrappers should not import each other.

### Legacy context and indexes

- Slops OS context.md states that it is legacy yet still points at a nested slops-saloon/omen path that does not exist in the sibling migration workspace.
- Slops OS DBS_INDEX.md and modules/index references also assume a nested Omen checkout.
- Omen context.md contains a OneDrive/Corvus-era path and a 2026-06-02 resume point.
- Omen DBS_INDEX.md includes legacy OneDrive/Corvus and Oracle checkout paths.
- Current index language describes Solutions as finished output, conflicting with the governing charter’s definition of Solutions as proposed, generated, investigative, or reviewable work.

These files are not automatically loaded today, but they remain plausible entry points and can be mistaken for current truth.

### Ambiguous continuation

“Read the latest entry in Blueprints/handoffs/” is not a deterministic continuation interface. The Omen inventory identifies 143 session-handoff artifacts, many with the same checkout timestamp. Filesystem mtime can select a non-dated feature handoff rather than the intended latest session. A stable Direction continuation/closure record must identify the exact active predecessor.

### Role and action conflicts

- Slops OS department-role files say the root context.md is the only active source, conflicting with the root file’s own legacy notice and the governing Direction model.
- The CTO role advocates clean-slate rewrites; the migration charter requires evidence-first, history-preserving changes.
- The CISO role permits autonomous hardening; the charter freezes unapproved external and structural changes.
- The CMO role mandates a stale Slops Nexus rebrand.
- The COO role contains pricing posture that should be an accepted business decision, not an instruction-wrapper default.
- Blueprints/agent-modules/action-posture.md contains autonomous Git push posture that can conflict with explicit scope and commit/push authorization.
- Blueprints/agent-modules/session-handoff.md requires another dated handoff for every nontrivial session, perpetuating the handoff pile instead of implementing a stable session-close interface.

## Target routing contract

### Shared invariant

Each repository should expose one model-neutral route:

~~~text
vendor adapter
  -> repository Direction bootstrap
     -> current facts/state
     -> active inbox/sprint item
     -> linked approved Blueprints
     -> linked supporting References
     -> linked active Solution, when one exists
~~~

Archive is never part of the default route. Historical records are opened only for provenance, supersession, or an explicit history request. Solutions never become authority merely because an adapter links to them.

### Slops OS target

Slops OS owns the DBS semantics, planning schemas, runtime-adapter convention, context-health checks, repository-boundary rules, and canonical cross-repository Graphify contract.

The root AGENTS.md and CLAUDE.md should:

1. identify the repository and vendor runtime;
2. point to the same small Direction bootstrap;
3. state the authority order and Archive/Solutions limits;
4. select model-neutral workflows from an index only when relevant;
5. avoid copying governance, role descriptions, skill catalogs, or product truth.

Nested adapters should exist only at durable runtime/build/ownership boundaries. Temporary organizational personas do not qualify.

### Omen target

Omen owns product truth and application contracts. Its root adapters should:

1. route first to the compact Omen Direction bootstrap;
2. determine task boundary: product knowledge, web, iOS, Android, API, infrastructure, or tests;
3. load only the relevant approved Blueprint and validation contract;
4. reference Slops OS governance by an explicit cross-repository link or checked derived pointer, not a complete mirror;
5. keep backend lean out of mobile, frontend, and deployment tasks.

A scoped nested adapter may be justified for a real subtree if it contains only additional local constraints. It must not restate the root authority model.

## Proposed dispositions

These are review recommendations, not executed file actions. Values use the governing disposition vocabulary exactly.

| Current artifact | Proposed disposition | Proposed outcome | Gate |
|---|---|---|---|
| Slops OS/AGENTS.md | CONVERT | Thin Codex adapter to shared Direction bootstrap and task selector. | Direction contract ratified. |
| Slops OS/CLAUDE.md | CONVERT | Thin Claude adapter to the same bootstrap; no duplicate knowledge base. | Direction contract ratified. |
| Slops OS/slops-saloon/AGENTS.md and CLAUDE.md | MERGE | Preserve genuinely scoped Slops Saloon constraints once in model-neutral Blueprints; retain only vendor-specific adapter mechanics if needed. | Ownership and subtree future ratified. |
| Slops OS department agents.md files | REVIEW | Extract accepted decisions/contracts; do not preserve stale personas as automatic routing. | Founder decides which business governance remains active. |
| Slops OS/context.md | CONVERT | Replace as an unambiguous pointer or retire through the migration manifest after Direction bootstrap exists. | Inbound links repaired and history preserved. |
| Slops OS/DBS_INDEX.md and modules/index route | CONVERT | Generate or maintain a small ownership map that understands sibling repositories. | Cross-repo link format ratified. |
| Slops OS/Blueprints/agent-modules/action-posture.md | REVIEW | Separate durable safety policy from environment-specific autonomy claims. | Runtime authority review. |
| Slops OS/Blueprints/agent-modules/session-handoff.md | CONVERT | Implement the versioned session-close/continuation interface rather than another append-only handoff rule. | Direction schema v1 ratified. |
| Omen/AGENTS.md | CONVERT | Thin Codex adapter; Direction first, scoped Blueprint selection second. | Omen #278 target route ratified. |
| Omen/CLAUDE.md | CONVERT | Thin Claude adapter to identical canonical knowledge. | Omen #278 target route ratified. |
| Omen/AGENT.md | MERGE | Move unique backend rules into scoped, model-neutral backend governance; eliminate the circular root chain. | Rule-by-rule conflict review. |
| Omen/context.md | CONVERT | Replace legacy resume/path content with a pointer to current Direction, then follow manifest archival rules. | Inbound links and accepted facts verified. |
| Omen/DBS_INDEX.md | CONVERT | Update ownership/routing map without absolute historical checkout paths. | Target trees ratified. |
| “Latest handoff” startup rule | CONVERT | Resolve continuation by stable ID/link from Direction session state. | Session-close schema v1 ratified. |

## Cold-start evaluation protocol

### Test cases

Run the same intent-level probes through both runtimes from:

1. Slops OS root: governance/schema change.
2. Slops OS business-governance area: product/company decision intake.
3. Omen root: product-state question.
4. Omen frontend: web UI bug.
5. Omen iOS: native screen change.
6. Omen Android: native screen change.
7. Omen src: API/provider behavior.
8. Omen deploy: infrastructure-path change.
9. Omen root: historical decision/provenance lookup.

Each response should report, without edits:

- repository and task boundary;
- automatically loaded entry files;
- first Direction records selected;
- applicable Blueprints;
- References opened only when needed;
- any Solution used and its non-authoritative status;
- conflicts or missing authority;
- excluded stale/Archive sources;
- next safe action and required approval.

### Acceptance criteria

- OpenAI and Claude identify the same canonical facts and accepted decision lineage.
- Neither treats Solutions, Archive, Graphify, a handoff directory, or a vendor wrapper as primary authority.
- Neither reads the full decision log, handoff bus, or skill registry unless the probe requires it.
- Mobile probes select the correct native contracts without inheriting backend identity.
- Deployment probes stop at the approval boundary.
- Historical probes can reach superseded evidence without promoting it to current truth.
- File selection and reasoning are captured in a machine-comparable result shape.

### Commands

Mechanical Codex prompt loading can be retested without inference:

~~~powershell
codex debug -c 'model_reasoning_effort="xhigh"' prompt-input ROUTING_PROBE
~~~

After founder approval, a bounded model-backed Codex test can use:

~~~powershell
codex exec --ephemeral --sandbox read-only -C <repository> -c 'model_reasoning_effort="xhigh"' "<approved probe>"
~~~

After founder approval, a bounded Claude test can use:

~~~powershell
claude -p --permission-mode plan --tools "Read,Glob,Grep" --no-session-persistence --max-budget-usd <approved-cap> "<approved probe>"
~~~

Do not use --bare or --safe-mode for the Claude test. Record CLI version, model, working directory, repository SHA, user-level memory presence, selected files, result, and cost. No cold-start test should be interpreted as authority to edit.

## Routing readiness

The repositories are **not ready for entry-layer replacement**. The current defects are well evidenced, but the Direction bootstrap and session-close schemas, cross-repository link format, and cold-start result schema must be ratified first. Once those interfaces exist, wrapper conversion is a small, separately reviewable commit group and should precede bulk knowledge moves.
