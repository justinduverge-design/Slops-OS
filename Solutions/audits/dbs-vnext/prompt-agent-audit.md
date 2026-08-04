# DBS vNext Prompt and Agent Audit

**Date:** 2026-08-03
**Scope:** Slops OS and Omen startup instructions, repository-work prompts, product-runtime prompts, agent catalogs, skill discovery surfaces, and their authority routing
**Work classification:** REVIEW ONLY
**Migration phase:** discovery and architecture; no authority, prompt, agent, or runtime behavior changed

## Executive verdict

The primary problem is not just file count. Four different artifact classes currently share the words **prompt** and **agent** without a reliable loading contract:

1. runtime entry adapters such as `AGENTS.md` and `CLAUDE.md`;
2. explicit startup read chains such as `context.md`, `DBS_INDEX.md`, and `kickoff-l2.md`;
3. repository-work prompts and candidate agent roles;
4. Omen product-inference prompts and its fantasy-football sub-agents.

That overlap makes stale text look callable and makes live behavior difficult to locate.

The most important findings are:

- Slops OS has 32 prompt-directory files across L0 and L1, plus 130 files under the L0 agent catalog. Ninety-one agent files are imported references and 36 are candidate wrappers.
- Omen has 33 files in `Blueprints/prompts/`, 48 tracked files whose path or filename contains `prompt`, three root startup adapters, and four different code/document surfaces claiming some part of product-agent prompt ownership.
- Omen's canonical `POST /api/omen/mvp-move` narration prompt is hard-coded in `src/services/llm.js`. The files that `Blueprints/prompts/README.md` calls active runtime prompts do not govern that route.
- Omen's deterministic prompt workflow watches nonexistent `src/prompts/**` and evaluates three independent fixture prompts. It does not gate the canonical narration prompt or `Blueprints/prompts/manager_agent.md`.
- Slops OS contains direct authority contradictions around `git push`, candidate callability, runtime defaults, and legacy department-scoped `agents.md` files.
- Omen has five overlapping startup routers with different ordering and source lists. One router loads the Codex/backend adapter into the Claude chain, and two startup files still contain pre-rename paths and obsolete Stripe/subscription truth.
- The safe vNext direction is a small generated-or-validated adapter layer, one explicit startup manifest per repository, a separate product-prompt registry, and a hard boundary between callable roles and reference imports.

No `DELETE` recommendation is made in this audit. Removal should follow replacement, inbound-link repair, clean-clone validation, and Git-history proof.

## Repository evidence baseline

| Repository | Checkout | Branch | Commit | Tracked files |
|---|---|---|---|---:|
| Slops OS | `C:\Users\JDuve\dev\dbs-vnext-migration\Slops-OS` | `refactor/dbs-vnext-migration` | `814f77a829dd10a53601354e167adedb58c6ecdf` | 512 |
| Omen | `C:\Users\JDuve\dev\dbs-vnext-migration\omen` | `refactor/dbs-vnext-migration` | `065d4677d79c7ce9afe10b6cdb981d41f40a5471` | 1,704 |

The generated inventory supporting this audit is in:

- `Solutions/audits/dbs-vnext/slops-os-inventory.md`
- `Solutions/audits/dbs-vnext/omen-inventory.md`
- `Solutions/audits/dbs-vnext/data/artifact-inventory.json`
- `Solutions/audits/dbs-vnext/data/inventory-summary.json`
- `Solutions/audits/dbs-vnext/data/link-findings.json`
- `Solutions/audits/dbs-vnext/data/exact-duplicates.json`
- `Solutions/audits/dbs-vnext/data/near-duplicates.json`

Archive content was counted and searched for lineage, but was not treated as current authority. Secrets and `.env` values were not inspected.

## Quantified sprawl

### Slops OS

| Surface | Files | Bytes | Lines | Current interpretation |
|---|---:|---:|---:|---|
| Tracked repository | 512 | 3,057,110 | 65,197 text lines | Documentation and governance repository |
| L0 `Blueprints/prompts/` | 30 | 167,010 | 3,928 | Mixed reusable, pending, executed, historical, and product-specific prompts |
| L0 + L1 prompt directories | 32 | 175,592 | 4,107 | No loader or callable-status manifest |
| L0 `Blueprints/agents/` | 130 | 1,262,041 | 26,950 | 91 imported references, 36 candidate wrappers, and registry/support files |
| L0 `Blueprints/skills/` | 67 | 326,436 | 7,614 | Explicitly selected skills, not startup prompt injection |
| L0 handoffs | 20 | 121,049 | 1,792 | Historical/session evidence mixed with active-looking undated contracts |

Current, non-archive instruction names include:

- root `AGENTS.md` and `CLAUDE.md`;
- L1 `slops-saloon/AGENTS.md` and `slops-saloon/CLAUDE.md`;
- five lowercase department files named `agents.md`;
- `Projects/project_memory.md`, which also presents active routing language.

On the current Windows filesystem, lowercase `agents.md` can collide with the conventional `AGENTS.md` name when a runtime enters that subtree. Those five department files therefore cannot be dismissed as ordinary prose.

### Omen

| Surface | Files | Bytes | Lines | Current interpretation |
|---|---:|---:|---:|---|
| Tracked repository | 1,704 | 151,853,904 | 1,246,470 | Product code plus DBS material and generated artifacts |
| `Blueprints/prompts/` | 33 | 183,927 | 4,235 | Startup, runtime, one-shot, superseded, and completed prompts in one folder |
| Any tracked prompt path/name | 48 | 220,084 | 5,089 | Adds audit/handoff evidence, eval fixtures, loader code, and tests |
| Root `AGENT.md` / `AGENTS.md` / `CLAUDE.md` | 3 | 9,217 | 228 | Overlapping startup adapters |
| `.agents/` | 34 | 2,894,198 | 18,942 | One local QA skill, scripts/routes, and 22 screenshots |
| Root `skills/` | 4 | 9,860 | 333 | One Supabase form-debugger skill package |
| `Blueprints/handoffs/` | 165 | 1,113,328 | 17,772 | 143 dated session handoffs plus 22 undated/readme/contract artifacts |

At the direct `Blueprints/handoffs/` level, there are 146 Markdown files: 139 dated and seven undated. Ten direct-child handoffs share the latest date, `2026-08-02`. A startup rule that says only “latest entry” therefore does not deterministically select one file.

## Loading model: what is automatic and what is explicit

This distinction must be preserved during migration.

| Surface | Load mode | Effective behavior | Risk | Recommendation |
|---|---|---|---|---|
| Slops OS root `AGENTS.md` | Runtime entry by Codex convention | Starts the L0 routing chain | Medium | CONVERT |
| Slops OS root `CLAUDE.md` | Runtime entry by Claude convention | Duplicates the root chain and adds a second Graphify summary | Medium | CONVERT |
| L1 `AGENTS.md` / `CLAUDE.md` | Scoped runtime entry when L1 is the working subtree | Near-duplicate adapters | Medium | CONVERT |
| Department lowercase `agents.md` files | Potential scoped entry on Windows | Can inject obsolete pricing, rebrand, and autonomous-change doctrine | High | ARCHIVE |
| `DBS_INDEX.md`, `context.md`, `Direction/*` | Explicit read only | Loaded because adapters or prompts name them | High when stale | CONVERT |
| `Blueprints/prompts/kickoff-l0.md` and Omen `kickoff-l2.md` | Manual paste/instruction execution | Starts a task and expands the read chain | High authority impact | KEEP |
| `Blueprints/prompts/*` one-shot prompts | Manual execution only | Not callable merely because they remain in the prompt folder | Medium | ARCHIVE |
| `Blueprints/skills/*` and Omen `.agents/skills/*` | Catalog discovery, then explicit trigger/read | Skill body should load only when selected | Medium | KEEP |
| `Blueprints/agents/_imported/*` | Reference only | No execution authority | High if mistaken as callable | MOVE |
| `AGENT_INDEX.md` candidate wrappers | Explicit selection under indexed authority | Candidate does not mean autonomous | High if README wins | KEEP |
| Omen `Blueprints/prompts/manager_agent.md` | Read by legacy `src/services/agents.js` only | Not used by the canonical Omen route | High truth drift | REVIEW |
| Omen `Blueprints/prompts/sub_agents.md` | Documentation source only in current code | Six live-looking prompts are duplicated inline | High truth drift | REVIEW |
| Omen `src/services/llm.js` | Production code path | Owns canonical Omen narration prompt | High product behavior | CONVERT |
| Omen `evals/promptfoo/prompts/*` | Explicit test runner input | Tests independent fixtures, not the canonical product prompt | Medium | CONVERT |
| Session handoffs | Explicit read only | Evidence/history unless specifically indexed as current | Medium | MOVE |

“Runtime entry” above describes repository/runtime convention, not proof that every vendor build loads every file identically. vNext needs clean-clone smoke tests for each supported runtime before relying on an adapter name as an enforcement mechanism.

## Slops OS authority and agent findings

### 1. Push authority has two incompatible answers

- `Blueprints/agent-modules/action-posture.md:21` says `git push` is autonomous with no permission gate.
- `Blueprints/agent-modules/hard-prohibitions.md:10` says a feature-branch push is allowed “on its own.”
- `Blueprints/tools/tool-permissions.md:79-80`, `Blueprints/tools/TOOLS_INDEX.md:32`, `Blueprints/prompts/kickoff-l0.md:112-116`, and `Blueprints/agents/AGENT_INDEX.md:835-843` require a scoped active assignment at `full-executor`.

This is a direct authority conflict, not editorial duplication. The stricter indexed tool contract must remain effective until Justin chooses otherwise.

**Recommendation:** CONVERT the permissive prose into a reference to one structured tool/assignment rule. Do not maintain independent prose copies of the push exception.

### 2. Candidate callability is contradictory

- `Blueprints/agents/README.md:25` says an import becomes callable when promoted to `active` **or `candidate`**.
- `Blueprints/agents/AGENT_INDEX.md:241-260` says candidates are not autonomous and hold no authority.

**Recommendation:** CONVERT the README into a navigator that never defines status semantics. Keep status meaning in the registry/schema only.

### 3. Active trust assignments do not close durably

`Blueprints/agents/AGENT_INDEX.md:923-1276` contains 20 `full-executor` assignments. Each expires `on-task-close`, but the entries have no required `status`, `closed_at`, closure evidence, repository identifier, or collision-resistant task identifier. Generic keys such as `A3`, `A4`, and `D1` recur across product contexts.

The section also says it was initialized empty immediately before the populated list.

**Recommendation:** CONVERT assignments to schema-validated records with repository, task UUID/key namespace, status, issue/spec link, assignment timestamp, expiry, closure timestamp, and closure evidence. Derive an active view instead of treating the historical list as active by default.

### 4. Imported and candidate agents are physically mixed with authority files

The L0 catalog contains 91 imported role files and 36 candidate wrappers. Thirty-two wrappers share an exact basename with an imported source. This is useful lineage but expensive and ambiguous for broad search/RAG.

**Recommendation:** MOVE imported source material to a clearly non-callable `References/agents/imported/` corpus with provenance. KEEP reviewed wrappers in the authority catalog. Add explicit `source_artifact`, `status`, and `scope` fields rather than relying on matching filenames.

### 5. Legacy department files can override current doctrine

The five department `agents.md` files still contain active-sounding rules:

- Executive Office calls root context the only active truth.
- COO fixes obsolete paid pricing.
- CISO grants autonomous hardening/config authority.
- CMO recommends a Slops Nexus rebrand.
- CTO and `Projects/project_memory.md` route work toward a legacy project structure.

**Recommendation:** ARCHIVE the scoped instruction files after extracting any timeless role doctrine. MERGE retained doctrine into runtime-neutral indexed roles; do not preserve their filename-based entry behavior.

### 6. App scaffolds recreate vendor lanes

`Blueprints/templates/app-scaffold/AGENTS.md:32-34` gives backend ownership to Codex and frontend ownership to Claude. This contradicts the current lane-neutral facts and planner/executor model.

**Recommendation:** CONVERT app-scaffold adapters to generated thin adapters backed by a shared startup manifest and capability/assignment policy.

## Omen startup findings

### 1. Five routers disagree about the read chain

The startup route is independently described by:

1. `AGENTS.md`;
2. `CLAUDE.md`;
3. `AGENT.md`;
4. `DBS_INDEX.md`;
5. root `context.md`.

They differ in ordering and membership. Examples:

- `AGENTS.md` includes facts, known issues, company baseline, skill activation, and “latest handoff.”
- `AGENT.md` adds roadmap, three contract-bus files, and `CLAUDE.md`, but omits facts, known issues, and the two playbooks.
- `DBS_INDEX.md` gives separate backend and frontend chains.
- root `context.md` starts with `DBS_INDEX.md` and loads both runtime adapters.
- `CLAUDE.md` starts with `AGENTS.md`; `AGENTS.md` then directs the reader to the Codex/backend-specific `AGENT.md`.

The resulting graph contains loops and causes the Claude path to inherit the Codex/backend adapter.

**Recommendation:** MERGE the five lists into one structured startup manifest. CONVERT `AGENTS.md` and `CLAUDE.md` into thin runtime adapters that load that manifest plus only their genuinely runtime-specific mechanics.

### 2. Explicit startup reads inject stale product truth

- `DBS_INDEX.md` still declares a OneDrive `...\corvus` canonical path while also listing the newer dev path.
- root `context.md` repeats the retired `...\corvus` path and a 2026-06-02 resume state with Stripe prices, subscriptions, and Pro gates.
- `Direction/facts-of-record.md` says Stripe and subscription gates were fully removed and Omen is free indefinitely.
- `AGENT.md:109-113`, which `AGENTS.md` requires every session to read, says Oracle is the current app host and Hostinger web deployment is parked. `.github/workflows/deploy.yml:2-28` and `deploy/hostinger/DEPLOY-NOTES.md:17-64` establish Hostinger KVM1 as the current deploy lane.

Because `context.md` and `DBS_INDEX.md` are explicitly placed near the front of several startup chains, their stale content is operationally significant even though they are not automatic adapters.

**Recommendation:** CONVERT them into thin navigators with repo-relative paths and a generated current-state pointer. MOVE dated resume evidence to history.

### 3. The L2 authority dependency is not resolvable in a standalone checkout

`Blueprints/prompts/kickoff-l2.md` requires L0 Runtime Policy and Active Trust Assignments. It correctly fails to read-only when L0 is unavailable, but it does not define a cross-repository locator.

`Blueprints/playbooks/skill-activation-runbook.md` uses `../../../../Blueprints/skills/SKILL_ROUTING.md`, which resolves in the old nested monorepo layout but not in the current sibling migration worktrees.

**Recommendation:** CONVERT cross-layer paths to a validated repository locator or an explicit checked-in mirror contract with schema/version comparison. Never infer authority from whichever similarly named file happens to resolve.

### 4. “Latest handoff” is not deterministic

There are 146 direct-child Markdown files under `Blueprints/handoffs/`, including ten dated `2026-08-02` entries and seven undated files. Filesystem modification time selected the old `trade-analyzer-rework.md` in this checkout, demonstrating that mtime is not a safe definition of latest.

**Recommendation:** CONVERT “latest entry” to a single explicit current-handoff pointer or manifest field. MOVE closed dated session handoffs out of the startup scan while preserving contract-bus files separately.

## Omen product-prompt findings

### 1. The prompt README's active-runtime claim does not match the canonical route

`Blueprints/prompts/README.md:43-44` calls `manager_agent.md` and `sub_agents.md` active runtime prompts.

Current dependency evidence says otherwise:

- `src/routes/omen.js:17,265-277` sends optional canonical narration to `src/services/llm.js`.
- `src/services/llm.js:355-377` builds the live Omen explanation prompt inline.
- No production source imports `src/services/agents.js`; direct references are its unit test and mocks in tests for the retired optimizer route.
- `src/routes/optimizer.js:164-166` retires `/api/optimizer/mvp-move` in favor of `/api/omen/mvp-move`.

**Recommendation:** REVIEW `manager_agent.md` and `sub_agents.md` as legacy-or-future prompt assets until a live caller is proven. CONVERT the prompt README into a generated registry of caller, status, owner, input schema, output schema, tests, and last verified commit.

### 2. Three prompt-loading implementations disagree

The repository has at least these product-agent prompt mechanisms:

1. `src/services/llm.js` hard-codes the canonical Omen narration prompt.
2. `src/services/agents.js` reads `manager_agent.md` but defines all six sub-agent system prompts inline.
3. `src/omen_prompt_loader.js` implements a second Markdown loader but has no current importer.

Both loaders expect fenced code blocks beneath prompt headings. The current `manager_agent.md` and `sub_agents.md` contain no fenced prompt blocks:

- `src/services/agents.js:346-348` therefore passes the entire manager Markdown document when extraction fails.
- `src/omen_prompt_loader.js:53-68,84-91` fails extraction and falls back to another hard-coded manager prompt.
- `src/omen_prompt_loader.js:142-180` cannot extract the current sub-agent sections.

The supposedly canonical Markdown can therefore yield three different effective prompts depending on caller.

The deployment image adds another divergence. `Dockerfile:61-78` copies `package.json`, dependencies, and `src/`, but never copies `Blueprints/prompts/`. If `src/services/agents.js` or the alternate loader were reactivated in that image, the local Markdown path would be unavailable and the deployed process would take a fallback path instead of using the checkout prompt.

**Recommendation:** CONVERT to one prompt registry and one tested loader. Product prompts should be data assets with schema/version metadata; fallbacks must be explicit, observable, and test-covered rather than silently different prose.

### 3. The legacy compatibility comments are stale too

`src/omen_agents.js:4-10` says current production agent work lives in `src/services/agents.js` and `src/routes/optimizer.js`. The optimizer MVP route is now retired and the canonical route uses `src/services/omen.js` plus `src/services/llm.js`.

**Recommendation:** REVIEW the compatibility module's remaining consumers, then CONVERT its comments and exported boundary to current route truth. ARCHIVE only if dependency proof shows the compatibility exports are no longer required.

### 4. Prompt QA does not follow the live prompt

The deterministic runner loads three files under `evals/promptfoo/prompts/`. Its two fixtures exercise 18 assertions, but those prompt files are separate from both the canonical `src/services/llm.js` prompt and the two Markdown runtime claims.

`.github/workflows/ai-evals.yml` watches:

```text
src/prompts/**
evals/**
package.json
package-lock.json
```

`src/prompts/` does not exist. A pull request that changes the live inline narration prompt or `Blueprints/prompts/manager_agent.md` does not trigger this workflow through a prompt-specific path.

**Recommendation:** CONVERT the workflow and eval config to consume the same registry/loader used by the canonical route. Include loader parsing, placeholder completeness, output-schema, fail-closed behavior, and prompt-version assertions.

### 5. Prompt lifecycle metadata is not enforced

- `Blueprints/prompts/README.md` says every prompt change must be recorded in `PROMPTS_CHANGELOG.md`.
- The changelog's newest routing entry is 2026-06-04 and still discusses the now-archived vendor kickoff pair.
- `kickoff-l2.md` was created during the 2026-07-30 authority cutover but has no matching changelog entry.
- Four rename prompts are explicitly historical but remain in the active prompt directory.
- `prompt_playbook.md` declares itself superseded but remains beside active files.
- A July cleanup handoff already classified most loose one-shot prompts as completed or historical, but the moves were not performed.

**Recommendation:** ARCHIVE completed and explicitly historical prompts after validating inbound links. KEEP only the current kickoff/operator surface in the active operator-prompt directory. CONVERT the changelog into registry-backed version history for product prompts; Git history is sufficient for executed one-shot task prompts.

### 6. “Agent” names mix product inference with repository authority

The Omen Manager Agent and six fantasy-football sub-agents are product-runtime inference components. They are not SLOPS repository-work roles and should not inherit `AGENT_INDEX.md` authority terminology.

**Recommendation:** MOVE product inference definitions under an explicit product-prompt/runtime namespace. KEEP repository-work agent authority under the L0 registry. Use separate schemas and names for `runtime_component` versus `work_agent`.

## Disposition map

| Artifact or cohort | Recommendation | Target intent | Validation before implementation |
|---|---|---|---|
| L0 root `AGENTS.md` / `CLAUDE.md` | CONVERT | Thin generated or validated adapters | Clean-clone Codex and Claude startup smoke |
| L1 `AGENTS.md` / `CLAUDE.md` | CONVERT | Thin layer adapters using one startup schema | Scoped-working-directory startup smoke |
| Five department `agents.md` files | ARCHIVE | Historical organization experiments only | Confirm no required runtime reads; preserve provenance |
| `Projects/project_memory.md` | ARCHIVE | Historical routing record | Repair root README references |
| Timeless doctrine in legacy department files | MERGE | Runtime-neutral indexed role constraints | RBAC review and founder approval |
| `Blueprints/agents/AGENT_INDEX.md` role registry | KEEP | Single callable-role authority | Add schema validation without changing current grants |
| Active-trust assignment block | CONVERT | Structured assignment/closure records and derived active view | Fixture tests for expiry, collision, and closure |
| `Blueprints/agents/_imported/` | MOVE | `References/agents/imported/` or equivalent non-callable corpus | Preserve source URL/license/hash/provenance |
| Reviewed candidate wrappers | KEEP | Callable only through indexed assignment | Verify each wrapper points to source artifact |
| L0 reusable kickoff and kickoff modules | KEEP | Small operator startup surface | Cross-runtime execution tests |
| L0 `_pending` prompts | REVIEW | Decide current task, workflow, or history | Founder/task-state verification |
| L0 executed migration and acquisition prompts | ARCHIVE | Immutable run history | Inbound-link repair |
| L0 product-specific prompts | MOVE | Owning product repository if still current | Product owner and current-contract proof |
| Omen root `AGENTS.md` / `CLAUDE.md` | CONVERT | Thin adapters backed by one startup manifest | Verify neither imports the other's vendor lean |
| Omen `AGENT.md` backend profile | MERGE | On-demand capability profile, not universal startup doctrine | Confirm all safety rules survive |
| Omen `DBS_INDEX.md` and root `context.md` | CONVERT | Repo-relative navigators and current-state pointer | Stale-path and fact-conflict checks |
| Omen `kickoff-l2.md` | KEEP | Sole manual task-start prompt | L0 locator and standalone-read-only tests |
| Omen `HOW-TO-RUN-THE-LOOP.md` | MERGE | Human explanation derived from startup/task schemas | Diff check against kickoff/status model |
| Omen “latest handoff” startup rule | CONVERT | Explicit current-handoff pointer | Multiple-same-date fixture |
| Closed dated Omen session handoffs | MOVE | History/evidence outside default startup scan | Preserve contract-bus and current pointer separately |
| Omen completed/rename/Phase-B one-shot prompts | ARCHIVE | Immutable task history | Check current sprint, code, and inbound links |
| Omen `manager_agent.md` / `sub_agents.md` | REVIEW | Prove current caller or mark legacy/future | Production dependency trace and route test |
| Omen canonical inline narration prompt | CONVERT | Versioned product prompt asset using one loader | Exact output-contract and fallback tests |
| `src/omen_prompt_loader.js` | REVIEW | Retain only if chosen as the single loader | Import graph and parser tests |
| `src/services/agents.js` product-agent pipeline | REVIEW | Retain only if a supported route owns it | Production importer and route proof |
| `src/omen_agents.js` compatibility module | REVIEW | Compatibility-only boundary | Consumer graph and fail-closed test |
| `evals/promptfoo/prompts/*` | CONVERT | Fixtures against canonical product prompt IDs | Prove the eval exercises production prompt content |
| `.github/workflows/ai-evals.yml` prompt paths | CONVERT | Watch canonical prompt assets, loader, schema, and evals | Negative trigger test and workflow path audit |
| Omen `.agents/skills/run-slops-saloon/` | KEEP | Explicitly triggered local QA skill | Keep screenshots out of prompt injection context |
| Omen `skills/supabase-form-debugger/` | REVIEW | Confirm installation/discovery and product scope | Skill registry and security review |

## Proposed vNext separation

The exact folder names remain an architecture decision, but the responsibilities should be separated as follows:

```text
repository root
  AGENTS.md                  thin runtime adapter
  CLAUDE.md                  thin runtime adapter
  DBS_INDEX.md               human/repo navigator only

Direction/
  startup-state.*            current pointers and schema version
  current-handoff.*          exactly one explicit pointer

Blueprints/
  runtime/
    startup-manifest.*       ordered required and conditional reads
    authority-schema.*       role, assignment, capability, expiry
  agents/
    AGENT_INDEX.*            callable work-agent registry
    wrappers/                reviewed role wrappers only
  prompts/
    operator/                current kickoff/task-control prompts
    product/                 versioned inference prompt assets
    registry.*               caller, owner, schema, tests, status

References/
  agents/imported/           non-callable source roles with provenance

Archive/
  prompts/executed/          one-shot task prompts and superseded routers
  handoffs/sessions/         closed dated session records
```

Key invariants:

- A filename does not grant authority.
- `candidate` does not mean callable.
- A skill being discoverable does not mean its body is startup context.
- A repository-work prompt cannot masquerade as a standing role.
- A product inference agent cannot inherit repository tool permissions.
- Every product prompt has one canonical caller and one validation route.
- Runtime adapters do not repeat authority prose; they route to validated sources.
- Every explicit startup read is ordered, conditional, and bounded.
- History is linkable but not in the default startup payload.

## Implementation-safe sequence

1. **KEEP current effective authority while tests are built.** Record the stricter assignment/tool rules as the migration baseline. Do not move adapters or change prompt callers yet.
2. **CONVERT inventory into two manifests.** Create a startup/read manifest and a product-prompt registry. Populate them from current behavior, including unknown/unproven status.
3. **REVIEW runtime loading empirically.** Use clean clones and minimal probe text to confirm what Codex, Claude, and supported local runtimes actually autoload at root and in subtrees.
4. **CONVERT authority records first.** Add assignment status, namespaced task identity, expiry, closure evidence, and schema fixtures before altering prose adapters.
5. **CONVERT startup adapters.** Make root and L1 adapters thin, then validate exact ordered reads and standalone behavior. Preserve the current read-only failure mode when L0 authority is unavailable.
6. **MERGE duplicated startup chains.** Generate or validate human guides from the same manifest so `AGENTS.md`, `CLAUDE.md`, `AGENT.md`, `DBS_INDEX.md`, and `context.md` cannot define independent orderings.
7. **CONVERT the Omen product-prompt path.** Choose one loader and move the canonical narration prompt behind a versioned registry ID. Keep the existing inline prompt as the comparison fixture until route parity passes.
8. **CONVERT prompt QA.** Point deterministic evals and CI path filters at the canonical prompt registry and loader. Add a negative test proving malformed or missing prompt assets fail closed.
9. **MOVE reference corpora.** Relocate imported agents and closed handoffs only after manifests no longer scan their old paths and inbound links have replacements.
10. **ARCHIVE executed prompts in small batches.** Separate explicit historical rename prompts first, then completed one-shot/product batches. Validate startup, internal links, and current sprint after each batch.
11. **REVIEW compatibility surfaces.** Prove consumers for `src/services/agents.js`, `src/omen_prompt_loader.js`, and `src/omen_agents.js`; retain or archive only from dependency evidence.
12. **REVIEW the final tree as a clean clone.** Verify root/subtree autoload, standalone L2 read-only behavior, L0 assignment lookup, canonical Omen prompt version, CI triggers, and absence of Archive/reference injection.

This order intentionally keeps current behavior observable until its replacement is verified. File movement is late because moving first would erase the easiest evidence of what callers currently resolve.

## Commands used

Representative read-only commands:

```powershell
git status --short --branch
git branch --show-current
git rev-parse HEAD
git rev-list --left-right --count origin/master...HEAD
git ls-files

rg --files -uu
rg -n "git push|active assignment|candidate|read-only|guarded-writer" Blueprints AGENTS.md CLAUDE.md
rg -n "manager_agent|sub_agents|omen_prompt_loader|services/agents|explainOmenMvpMove" src test evals Blueprints
rg -n "prompt" package.json .github/workflows src test evals

Get-Item <path>
[IO.File]::ReadAllLines(<path>).Count
Get-FileHash <path> -Algorithm SHA256
git check-ignore -v --no-index <path>
Test-Path <path>
```

The Omen dependency trace specifically established:

- canonical route caller: `src/routes/omen.js:265-277`;
- canonical narration prompt: `src/services/llm.js:355-377`;
- legacy manager loader: `src/services/agents.js:339-377`;
- unused alternate loader surface: `src/omen_prompt_loader.js`;
- production image copy boundary: `Dockerfile:61-78`;
- retired optimizer route: `src/routes/optimizer.js:164-166`;
- misrouted CI watch path: `.github/workflows/ai-evals.yml:3-8`;
- no tracked `src/prompts/` directory.

## Validation performed and deferred

Performed:

- repository status, branch, commit, and ancestry checks;
- tracked-file enumeration, byte counts, and line counts;
- current-versus-archive separation;
- exact and near-duplicate inventory review;
- startup-read-chain comparison;
- path existence and ignore-rule checks;
- Omen production caller/import searches;
- prompt-loader/parser contract inspection;
- CI prompt-path inspection.

Deferred to implementation:

- actual adapter autoload smoke tests in fresh Codex and Claude sessions;
- prompt registry/schema validation, because no vNext schema exists yet;
- product prompt parity tests, because no canonical externalized prompt exists yet;
- moves or archives, because this phase is audit-only;
- authority changes, because this audit reviews authority and does not grant it;
- build, deployment, production, provider, database, secret, or external-account actions.

## Completion statement

This file is the only artifact authored by this prompt/agent audit task. No source prompt, startup adapter, agent registry, skill, handoff, code path, CI workflow, archive, or authority rule was modified.
