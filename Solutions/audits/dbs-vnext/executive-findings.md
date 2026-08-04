# DBS vNext executive findings

> **Judgment:** The system contains a strong five-folder knowledge model and substantial product knowledge, but current truth is harder to reach than it should be because runtime entry files, historical context, planning state, and generated references compete. This is a routing and lifecycle problem first, a folder-move problem second.

## Plain answers

| Question | Finding |
| --- | --- |
| What is actually wrong? | Authority is internally inconsistent; current and historical material share startup paths; Omen's inbox/sprint/blockers contradict their own status model; OpenAI and Claude follow different entry behavior; the Graphify view is stale and unreproducible; no versioned Direction record contract prevents drift. |
| What is merely messy but harmless? | Large archives, many old handoffs, imported agent sources, design/media assets, and duplicate historical snapshots are mostly harmless when clearly inactive and excluded from startup. They cost search quality, but they do not need emergency deletion. |
| What should be removed? | After replacement proof: Slops root department/role folders and `Projects/`; Omen's unsupported singular root `AGENT.md`; loose legacy root context/index surfaces; executed prompts from active paths; reproducible Omen Graphify cache after a validated replacement. Removal means merge/archive first, not blind delete. |
| What should be merged? | Root context into v1 current state; duplicated founder doctrine; vendor-specific knowledge from `AGENTS.md`/`CLAUDE.md` into shared canonical rules; overlapping identity/action modules; duplicate registries/indexes; singular Omen backend rules into an owned Blueprint. |
| What should become Direction? | Versioned facts, current state, inbox records, sprint records, roadmap links, accepted/superseded decisions, known issues/blockers, continuation, and latest session close. Nothing generated or merely proposed. |
| What should become Blueprints? | Direction schemas, repository/ownership boundaries, runtime adapter conventions, reusable workflows, agent/tool contracts, Omen architecture/design/provider/security/deploy contracts, and approved brand/legal rules. |
| What should remain References? | External/source evidence, research, screenshots, official docs, source assets, and generated Graphify maps with explicit commit/config/freshness metadata. References never resolve authority. |
| What should remain Solutions? | This audit, investigations, reports, drafts, prototypes, generated review work, unresolved `REVIEW` classifications, and proposals awaiting an accepted decision. |
| What belongs in Archive? | Executed one-time prompts, old session handoffs after continuity is recorded, superseded planning snapshots, legacy organizational scaffolding, pre-rename doctrine, and original source files after a proven merge/conversion. |
| Which code folders are justified? | Omen `src`, `frontend`, `mobile`, `extension`, `test`, `evals`, `scripts`, `sql`, `deploy`, and `.github` map to real runtime/build/test/deploy boundaries. `client` is unresolved but must stay because Docker/CI still consume it. There is no evidence for a fashionable apps/services/packages rewrite now. |
| Which routing files compete? | Slops root adapters conflict with permissive action modules, trust-assignment rules, lowercase nested `agents.md`, legacy context/index, and vendor-owned scaffold rules. Omen has `AGENTS.md`, `CLAUDE.md`, explicit singular `AGENT.md`, legacy root context/index, and oversized mandatory read chains. |
| Which prompts deserve to exist? | Model-neutral reusable workflows with defined inputs, outputs, owner, trigger, and evaluation; true product runtime prompts loaded by code; active scoped task specifications. Executed phase prompts and vendor-formatted duplicates belong in Archive or should be merged. |
| Why do OpenAI and Claude miss current truth? | Omen's mandated root startup union is 18 files and about 559 KB/7,491 lines before the native gate; high-volume decision/handoff ledgers swamp small current facts. OpenAI can also auto-load lowercase legacy `agents.md` on Windows, while Claude officially follows `CLAUDE.md`; stale absolute paths can route either runtime outside the active worktree. |
| What happens first? | Founder ratifies the target boundaries and Direction v1 lifecycle/link/schema ownership. Implementation then records immutable baselines and builds fixtures before changing any entry file or moving any artifact. |

## Highest-risk findings

### 1. Authority rules can authorize opposite behavior

Slops action modules say pushing is independently allowed, while the tool-permission index, kickoff, and agent registry require a scoped active `full-executor` assignment. Candidate agents are also described as both callable and non-autonomous. This is not cosmetic: a runtime can choose the wrong write posture depending on which file it reads first.

### 2. Active Omen planning state is not internally valid

`Direction/agent_inbox.md` duplicates a billing retraction and later retains the billing blocker. Inbox and sprint disagree, the sprint declares a four-state lifecycle but uses `BLOCKED`, blockers are malformed/duplicated, and verified items remain marked blocked. `Blueprints/definition-of-done.md` still describes a GitHub Actions billing hold while the inbox says gates run green. Agents cannot deterministically infer what is active.

### 3. Startup routing loads too much and does not have vendor parity

The Omen root instruction union is 559,090 bytes/7,491 lines across 18 mandated sources; a native task adds 55,522 bytes/1,074 lines before screen-specific contracts. `AGENT.md` is not a supported automatic root entry, yet `AGENTS.md` requires it, producing a backend-biased circular chain. Lowercase department `agents.md` files can scope OpenAI on Windows, while Claude follows a different documented entry surface.

### 4. Graphify cannot currently prove freshness or cross-repository coverage

Omen's tracked graph contains 3,965 nodes, 4,995 links, 306 communities, and 2,182 isolated nodes. Its recorded build commit is absent from the current object database, 28 of 370 source paths are missing, it contains no mobile sources, and `.graphify_root` hard-codes an old machine path. Slops declares an active wrapper that is missing from tracked truth. The graph is useful only as stale reference evidence until regenerated after migration.

### 5. Omen code paths are coupled to current folder names

Workflows, Dockerfiles, deployment configuration, and build commands explicitly consume `src`, `frontend`, `client`, and `mobile`. `client` is described as legacy but still built/copied. A cosmetic root rewrite could break CI or production packaging even if documentation links pass.

## What the evidence does not justify

- It does not justify deleting source or historical evidence.
- It does not justify changing Omen's free-product, native-mobile, provider, or release decisions.
- It does not justify reorganizing Omen into `apps/`, `services/`, or `packages/`.
- It does not justify regenerating Graphify before the target paths and owner are accepted.
- It does not justify keeping every current prompt or agent merely because a loader might someday use it.
- It does not prove every link finding is real; 159 findings require classification.

## Executive recommendation

Approve the architecture in two decisions: first, the five-folder ownership and root/code boundaries; second, Direction v1 identity, lifecycle, linking, promotion, and schema distribution. Then implement thin entry adapters and Direction fixtures before the first knowledge move. This sequence fixes wrong routing before reducing visible folder count and leaves a clean rollback at every step.
