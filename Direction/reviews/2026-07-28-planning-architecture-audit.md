# Slops OS — Planning System Architecture Audit

**Date:** 2026-07-28 · **Revised:** 2026-07-29 (correction + founder-response pass)
**Author:** Claude (Cowork, planning + coordination tier)
**Type:** Architecture review. Read-only. Nothing was created, modified, or deleted outside this file and its companion `2026-07-28-planning-capability-map.yaml`.
**Scope:** L0 (`SLOPS/`), L1 (`slops-saloon/`), L2 (`slops-saloon/omen/`). ~370 markdown files read in full; 3,168 L0 path references and 678 L1 path references resolved against disk; git history queried across two repos.
**Standing:** Per `Direction/reviews/README.md` — *"Reviews are evidence, not authority."* This document proposes; it does not decide.

**Revision 2 changes:** founder response recorded (below); approval-status table added; four overstated claims corrected or softened; §§1.2, 4.2, 5.2, 9 re-verified with corrected methodology; verdict counts reconciled to a reproducible basis; three claims **withdrawn**. Full change log in §14. Nothing was implemented.

---

## Founder Response — Ratified Direction (2026-07-29)

> **Standing of this section.** These are founder-ratified decisions about *architecture direction*. They authorize **planning and correction only**. They do **not** authorize implementation. Nothing in this audit has been built, and nothing should be until the items marked `REQUIRES DESIGN` have a design and the approval table in §13 is satisfied.

### FR-A. Product activity boundaries — correcting an audit framing error

| Surface | Status |
|---|---|
| Shared backend / platform | **ACTIVE** |
| Web client feature work | **ACTIVE AS NEEDED** |
| Web maintenance / security | **ACTIVE AS NEEDED** |
| iOS client | **ACTIVE** |
| Android client | **ACTIVE** |

**Consequence, stated explicitly:** KVM1, Docker, API health endpoints, provider integrations, authentication, databases, caching, and the shared recommendation services **remain active** because they support the shared platform that all clients — web, iOS, Android — depend on.

**The audit's finding is corrected accordingly.** The finding is **not** that backend or web deployment work was unnecessary or that the web client is paused. The finding is narrower and stands: **launch-readiness doctrine remained centred on the web/KVM program and never gained separate native-client and store-readiness evidence after the native pivot.** `release-done.md` gating KVM1 and Docker is correct and should continue; what is missing is a *parallel* set of gates for the native clients, not a replacement.

Revision 1 language in §10.3 implied the web program was "paused" and that the shipping-definition files therefore described the wrong program. That framing is withdrawn — see §14, CHG-04.

### FR-B. Decision identity model — **Hybrid + Time**

| Element | Form | Mutability |
|---|---|---|
| Permanent ID | `DEC-YYYYMMDD-NNN` | **Immutable.** Never changes, even if the decision moves category or layer. |
| Human key | `SCOPE.DOMAIN.TOPIC` | May change to reflect current organizational meaning. |
| Classification (optional) | `Layer.Group.Item` | May change. |
| Graphify node identity | the permanent ID | Immutable. |
| Graphify display label | the human key | May change. |

The permanent ID is the referent; the human key is the affordance. This directly addresses the §5 finding that decisions are currently addressable only by `(date, parenthetical)` — a tuple that is not unique (15 L2 headings share 2026-07-19) and that breaks whenever a decision is recategorized.

**Not yet authorized:** the schema itself, any migration of existing entries, or any change to the decision logs.

### FR-C. Minimum enforcement direction — a read-only **Truth Gate**

Built around existing repository-inspection capability rather than a new subsystem. Intended to run **before planning or execution**, and **before work is closed**.

Intended coverage: repository truth · decision-schema validity · active-decision conflicts · sprint and queue validity · skill and routing integrity · completion evidence.

Rollout: **report-only → block proven critical failures → local and CI integration after validation.**

**This approves the direction only.** The technical design, the invocation points, the failure taxonomy, and the block/warn thresholds all `REQUIRE DESIGN`. See §13.

### FR-D. Agent session protocol — **DISCUSS → PROPOSE → RATIFY → EXECUTE**

| Stage | Meaning |
|---|---|
| **DISCUSS** | The default. Casual founder conversation is **not** automatically doctrine. |
| **PROPOSE** | Structures a candidate decision. Does **not** approve it. |
| **RATIFY** | Records an approved decision and identifies what it supersedes and what it governs. |
| **EXECUTE** | Requires an approved task, verified repository truth, appropriate permissions, and the applicable governing decisions. |

This is the direct structural answer to §12.4 — that founder intent currently depends on chat context. A protocol that distinguishes conversation from ratification is the precondition for a decision store that can be trusted.

**Not yet authorized:** implementing the protocol, encoding it in doctrine, or changing any kickoff.

---

## 0. Executive verdict

**Slops OS has a strong doctrine kernel and lacks an executable governance kernel.**

Two distinct things are called "kernel" in this audit, and revision 1 collapsed them into one metaphor. Separating them:

| | Status |
|---|---|
| **Doctrine kernel** — `Blueprints/agent-modules/`, 14 single-concern files imported by number from every layer wrapper | **Present and well-built.** All 8 root pointers resolve. This is the best-engineered thing in the repo. |
| **Governance kernel** — anything that *executes* to validate that doctrine is being followed | **Absent.** Nothing runs. Nothing checks. |

The design quality is real and better than most funded startups have: the doctrine kernel, a 13-phase lifecycle map, 7 per-type Definition-of-Done gates, an explicit degraded-verification doctrine, a 345-row skill ledger, an evidence-discipline rule that names its own currency. None of that is cargo cult. It was thought about.

But **the governance layer is prose that a human or an agent must re-read and re-interpret.** `omen/probo.yaml` is the only **structured governance-control map** in the tree — 4 controls with `evidence_path` + `check:` assertions — and it is not wired to CI. (This is a narrower claim than revision 1 made; the repo contains plenty of other machine-readable and automatically-testable material. See §0.1.) There are no decision IDs, no status fields, no supersession markers, no schema validation, and — as of now — not even checkboxes. The two most mechanical steps in the build loop are un-executable against the current state of the files they depend on.

The system's self-correction is genuine and is the strongest evidence it works at all: it caught its own five-day ledger gap, wrote a reconciliation section, and added a corrective rule. But **every one of those corrections was a human noticing.** No check has ever fired, because there are no checks.

**Answers to the four closing questions are in §12.** The short form:

1. **Highest-leverage improvement:** give decisions stable identity and status, and make `facts-of-record.md` the generated, enforced, queryable current-truth surface that planning reads *instead of* the log.
2. **Why first:** it is the highest-leverage *architectural* correction, and the largest class of defects — decision-truth failures — is downstream of it. It is **not** the cause of every defect found; physical repository hygiene is an independent failure class. See §0.2.
3. **OS or artifact collection:** currently a collection of planning artifacts, executing as doctrine-by-convention, held together by Justin noticing. The architecture *for* an OS is present; the enforcement layer is not.
4. **Deterministic founder intent:** **No.** Three traced decisions show a strong pattern — intent propagates when encoded as a machine-checkable literal or a blocking predicate, and failed in the one tested case where it was encoded as a documentation obligation. Three cases out of 98 decision entries is a strong signal, not a proven law. See §5.3.

### 0.1 What "machine-checkable governance artifact" means here

Revision 1's claim that there is "exactly one machine-checkable governance artifact" was too broad. Defining the term precisely and inventorying against it:

| Class | Present in repo? | Governance artifact? |
|---|---|---|
| **Structured governance-control map** — declares a control, an evidence path, and an assertion that can be evaluated | `omen/probo.yaml` (4 controls: CC6.1, GDPR_ART_17, GDPR_ART_5, CC7.2) | **Yes — and it is the only one** |
| Application tests | 68 test files; 422/422 backend suite | No — they test the product, not whether governance was followed |
| CI workflows | 9 in `.github/workflows/`, incl. `native-visual-evidence.yml` | Partially — `native-visual-evidence.yml` enforces an evidence rule, the closest second |
| Machine-readable quality baseline | `Blueprints/quality/baseline.json` | Intended as one; currently corrupted by duplicate keys (§ capability map) |
| Config schemas | `package.json`, `docker-compose*.yml`, `probo.yaml` | Config, not governance, except probo |
| Scripts | `slops_root_scan.py`, `evals/slops-prompt-guard.mjs`, 5 in `omen/scripts/` | `slops-prompt-guard.mjs` is a real automated gate, but scoped to prompts |

**Corrected claim:** `probo.yaml` is the only explicit **structured governance-control map**. It is *not* the only machine-readable or automatically-testable artifact — `native-visual-evidence.yml`, `slops-prompt-guard.mjs`, and `baseline.json` all attempt automated enforcement in narrower scopes. The gap is that none of them checks *repository or decision truth*.

### 0.2 Three independent failure classes, not one

Revision 1 asserted "every other defect is downstream of decision identity." That is withdrawn. The defects separate into three classes with different causes and different fixes:

| Class | Examples | Fixed by |
|---|---|---|
| **Decision-truth failures** | 5 live monetization positions · no supersession · `## Active Decisions` still says "Corvus" · T1 propagation failure · ADR-003/009 accepted-but-false | Decision identity + status (FR-B) |
| **Orchestration failures** | checkbox predicate has no referent · `SLOPS_LIFECYCLE.md` in no read path · `slops-repo-inspector` not wired to the loop · L0/L1 PULL TASK pointing at dead queues · 75% handoff→ledger conversion | Wiring existing capability into the loop |
| **Physical repository hygiene** | backslash paths · broken pointers · malformed `LEDGER.md` rows · duplicated checkouts · empty L1 `Archive/` · local `main` 20 commits behind `origin/main` | Mechanical cleanup + a validator |

Decision identity is the highest-leverage of the three because it is the one that silently corrupts *future* work. It does not cause the other two. A Truth Gate (FR-C) is the only proposal here that addresses all three.

---

## 1. Planning Capability Audit

### 1.1 What exists

| Layer | Planning surface | Volume |
|---|---|---|
| L0 | doctrine kernel, skills, agents, prompts, playbooks, patterns, specs, templates, tools, handoffs | 257 md files (+ 91 dormant `_imported/`, + 3,009 quarantined) |
| L1 | division doctrine, content/marketing strategy + specs + workflows, decisions | 59 files |
| L2 | the only place the machinery actually runs | 216 KB decision log, 379-line sprint, 127 handoffs, 90-row done ledger, 345-row skill ledger, 44 reviews, 43 audits |

### 1.2 The skill system — 54 directories, 52 real skills

`SLOPS_LIFECYCLE.md` maps 13 lifecycle phases to skills and marks all 13 `have`. That is a genuine orchestration artifact and it is better than I expected to find. It is also **not in any cold-start read path** — `files-to-read-first-L0.md` lists `SKILL_ROUTING.md` (the flat index) but not `SLOPS_LIFECYCLE.md` (the sequence). Agents get the lookup table, never the pipeline.

> **§1.2 was re-verified on 2026-07-29 with corrected methodology.** Revision 1 derived usage counts by substring-matching skill names across the entire ledger file, which counted mentions in the Evidence and "Procedure gap" columns — including skills named only as *not applicable* — as if they were invocations. Revision 2 parses the ledger as a table and counts only the **Skill** column. Two claims are **withdrawn** and the never-invoked list changed. Details in §14.

**Confirmed:** **52** real L0 skills (directories under `Blueprints/skills/` containing a `SKILL.md`, excluding `_template/` and `_proposals/`).

**Usage basis — stated explicitly.** The L2 skill ledger has **345 data rows**; each row's Skill column lists one or more backticked skill names. Counting those names yields **622 invocation records** and **5 SKIPPED records** across **49 distinct skill tokens**. A "count" below means *invocation records in the Skill column*, not tasks and not distinct sessions — a single row listing 8 skills contributes 8. This is the ledger's own stated schema (*"one row per invoked skill"*), though practice has drifted toward one row per task.

| Tier | Count | Skills (invocation records) |
|---|---|---|
| Heavily used (>30) | 8 | `slops-git-flow` (81), `slops-repo-inspector` (71), `slops-quality-baseline` (60), `slops-code-review` (59), `slops-tdd` (49), `slops-context-markdown` (47), `planning-pass` (35), `security-privacy-evidence` (32) |
| Used (1–30) | 21 | `slops-ui-ux-audit` (21), `slops-ux-copy` (15), `pre-build-research` (11), `rbac-risk-review` (7), `workflow-tree-spec` (7), `slops-canary` (6), `slops-investigate` (6), `slops-mobile-smoke` (6), `slops-ai-integration-review` (5), `slops-design-system-pack` (4), `slops-graphify` (4), `slops-ship` (4), `demo-mode-pre-empty-state` (2), `design-md-author` (2), `mobile-first-qa-playbook` (2), `slops-legal-spot-check` (2), `slops-retro` (2), `slops-verify` (2), `compliance-by-template` (1), `product-gap-analysis-session` (1), `slops-skill-author` (1) |
| **Zero ledger records** | **23** | see classification below |

**Zero-record skills, classified as the founder requested** — this is a triage list, not a retirement list:

| Class | Count | Members |
|---|---|---|
| **Intentionally parked, named gate** | 2 | `slops-community-needs-research` (`parked: future-community-product`), `slops-learning-loop` (`parked: Omen-live-plus-7-days`) — **correctly dormant, not retirement candidates** |
| **Doctrinally required, never run** | 1 | `slops-product-pulse` — `SKILL_ROUTING` marks it active and it is the "required post-live cadence". Zero uses means the *validated-in-production* state has never been entered. A gap in practice, not a redundant skill. |
| **Meta-authoring, superseded in practice** | 5 | `slops-agent-author`, `agent-wrapper-generator`, `agent-index-diff-builder`, `command-bridge-generator`, `slops-onboarding-agent` |
| **Media/content production, product not there yet** | 5 | `slops-animation-render`, `slops-explainer-cut`, `slops-screenplay-loop`, `slops-image-prompt`, `slops-brand-mark-forge` |
| **Utility wrappers, never reached for** | 3 | `slops-headroom`, `slops-markitdown`, `slops-taste` |
| **Business/analysis, out of current scope** | 3 | `slops-exec-summary`, `slops-financial-sketch`, `slops-data-ingest-plan` |
| **Planning utilities overlapping used skills** | 3 | `dbs-research-to-architecture-router`, `slops-prompt-generator`, `clean-up-checkpoint` |
| **Ops runbook, infra not built** | 1 | `self-hosted-observability-runbook` |

**No bulk retirement is recommended.** Zero usage is a signal to triage, not evidence of redundancy — at minimum the parked pair and `slops-product-pulse` must be excluded, and the media set is plausibly early rather than dead.

**Routing-table integrity — corrected from 5 defects to 2:**

| Skill | Routing status | Reality | Verdict |
|---|---|---|---|
| `slops-markdown-authoring` | `retired` | absent | **Not a defect** — correctly absent. Revision 1 miscounted this. |
| `slops-content-ship` | `active`, Layer column reads *"Layer 2 (Omen-local: slops-saloon/omen/Blueprints/skills/slops-content-ship/)"* | exists exactly there | **Not a defect** — the table *does* record the distinction. Revision 1's claim that it does not is **withdrawn**. |
| `slops-voiceover` | same, Omen-local | exists exactly there | **Not a defect** |
| `design-quality-bar` | **`active`, Layer 0** | exists nowhere except as a name inside `SKILL_ROUTING.md` and `SLOPS_LIFECYCLE.md` | **GENUINE DEFECT** |
| `ux-ui-build-pipeline` | **`active`, Layer 0** | same | **GENUINE DEFECT** |

**Aggravating detail on `design-quality-bar`:** `SKILL_ROUTING.md` describes `design-md-author` as *"Internally gated by `design-quality-bar` (v1.1.0)"* and describes the gate as *"a mandatory self-critique gate."* `design-md-author/SKILL.md` contains **zero** references to it. A mandatory gate is declared in the registry and is not implemented in the skill it supposedly gates.

**Status column — claim withdrawn.** Revision 1 said the Status column "does not parse as a consistent enumerated field." That is wrong; my parser was. It has a documented legend and parses cleanly: **53 `active`, 2 `parked: <gate>`, 1 `retired`, 1 `paired-with: <name>`.** It is one of the better-specified fields in the repository and `files-to-read-first-L0.md` is right to send agents to it first.

**Phantom ledger entries — 2, not 1.** Both absent from disk at every layer *and* absent from `SKILL_ROUTING.md`, yet carrying invocation records:

- `slops-deploy-guard` — **13** invocation records
- `jules-react-component` — **11** invocation records

`ui-ux-pro-max` (4 records) is **not** a phantom — it is registered as `paired-with: ui-ux-pro-max` against `slops-ui-ux-audit`. Revision 1 did not distinguish these. The ledger also records legitimately external tooling (`figma-use`, `playwright`, `graphify`, `supabase`, `computer-use`) and the product-local driver `run-slops-saloon` (12), which exists in three copies under `omen/.agents/`, `.claude/`, and `.Codex/`.

**One counter-example worth recording against §8.** `ux-ui-build-pipeline`'s Default Agent cell is already fully capability-phrased: *"Stage 3 (Build) runs on whichever capable coding agent is doing the work — Codex, Claude, Cursor, or another — as long as it follows the pipeline's gates."* That is exactly the target state of §8.4, written down and dated 2026-07-09. The vendor-decoupling migration reached further than revision 1 credited — into the routing table's newest rows. It is undercut only by that skill not existing on disk.

### 1.3 The three decision stores, three schemas, three sort orders

| | L0 `Direction/decision_log.md` | L1 `Direction/decision_log.md` | L2 `omen/Direction/decision_log.md` |
|---|---|---|---|
| Size | 4.8 KB, 4 entries | 25 KB, 17 sections | **216.8 KB, 98 dated entries** |
| Heading form | `## YYYY-MM-DD — <the decision>` | `## Decisions Added YYYY-MM-DD (topic)` | `## Decisions Added YYYY-MM-DD (topic)` |
| One decision per heading | **Yes** | No — heading is a session | No — heading is a session |
| Sort order | ascending | **broken** (06-06 pivot at bottom, below `## Open Decisions`) | **both** — lines 5–362 descending, 381–846 ascending |
| Stable IDs | none | none | none |
| Status field | none | none | none |
| Supersession | none | none | prose only |

L2's log is written in two opposing directions because a prepending session and an appending session were both "following the convention." The word **"above"** is load-bearing in cross-references (`"superseded by the 2026-07-26 retirement decision above"`) — and the *last* entry in the file is also dated 2026-07-26, 822 lines below.

**A schema-complete decision system was built and abandoned.** `omen/Blueprints/specs/docs/decisions/` holds ADR-002 → ADR-010 with `ID · Date · Status · Deciders · Context · Decision · Consequences` — everything the log lacks. Last ADR: 2026-05-17. It lost to the schema-free log because the log has zero write friction. It is now actively wrong with no supersession: **ADR-003 (`Status: Accepted`) says "Omen is a paid product"**; ADR-009 (`Status: Accepted`) asserts a Sept 10 deadline with "Stripe live keys" — Stripe was removed 2026-07-12. ADR-005 has an ID collision across two files; ADR-004 is duplicated; there is no ADR-001.

### 1.4 What is genuinely well-built — preserve unchanged

- `Blueprints/agent-modules/` — 14 single-concern files, imported by number from every layer wrapper, all 8 root pointers resolve. This is the best-engineered thing in the repo.
- `Direction/facts-of-record.md` (L0) — explicit override semantics, numbered, dated, terse. The correct *shape* for a current-truth surface.
- `omen/Blueprints/definition-of-done.md` — the evidence-discipline paragraph and the **degraded-verification doctrine** (`SUBSTITUTED` / `DEFERRED-CI`, with a substitution table that grades its own equivalence and honestly downgrades: *"SUBSTITUTED, weaker — say so"*). This is stronger than most commercial DoDs.
- `omen/Direction/agent_inbox.md` — *"`main` is the proof. Handoffs were not treated as evidence."* The system learned its own prose was unreliable and routed around it to git.
- `Blueprints/playbooks/` (L0) — concrete, operational, dated, reversible-by-design.
- `omen/Direction/reviews/` — the healthiest artifact class anywhere: consistently dated, consistently produced, still active this week.
- `omen/probo.yaml` — the only explicit **structured governance-control map** found in the tree (4 controls, each with an `evidence_path` and a `check:` assertion). Narrower automated-enforcement artifacts also exist — `.github/workflows/native-visual-evidence.yml`, `evals/slops-prompt-guard.mjs`, and `Blueprints/quality/baseline.json` — but none of them checks repository or decision truth. See §0.1.
- `slops-saloon/Direction/decisions/slops-saloon-fan-experience-doctrine-v1.md` — records provenance verbatim, declares conflict precedence, tracks its own downstream artifacts. This is what every doctrine record should look like.

---

## 2. Planning Capability Map

The companion file **`2026-07-28-planning-capability-map.yaml`** holds **54 top-level records — 36 `artifact` records and 18 `aggregate` records.** Every record carries all ten required fields (purpose, inputs, outputs, dependencies, invocation, owner, strengths, weaknesses, overlap, verdict), using `[]` where a field genuinely has no entries, `unknown` where the audit did not establish it, and `not_applicable` where it does not apply. Verified: **0 records missing a required field.**

> **Revision 1's claim that the YAML was a "full per-artifact map" is corrected.** It is a **mixed map**: 36 artifact records plus 18 aggregate records. An aggregate (e.g. `skill.zero-record-set`, `L2.audits`, `L0.wrapper-sets`) is a named collection counted as one record; its fields describe the collection, **not any individual member**. Aggregates are explicitly typed `record_type: aggregate` and are not individual artifact records.

**Counting basis — one count per top-level record.** Both artifact and aggregate records count as exactly one. This is reproducible from the YAML with the snippet in its `counting_method.reproduce_with` field:

| Verdict | Count | Representative |
|---|---|---|
| KEEP | 12 | `agent-modules/`, `definition-of-done.md`, `probo.yaml`, `agent_inbox.md`, `playbooks/`, `reviews/` |
| MODIFY | 31 | decision logs (add ID+status), kickoff PULL TASK steps, `SKILL_ROUTING.md`, `release-done.md`, L1 `facts-of-record.md`, worktrees |
| MERGE | 4 | verification cluster; meta-authoring cluster; learning cluster; `release_readiness.md` → `release-done.md` |
| RETIRE | 7 | `agents.md`, wrapper sets, division folders, abandoned ADRs, `audits/`, L1 `TODO.md`, zero-record skill set |
| CREATE | 0 | — counted separately in `create_recommendations:` (1 item, see §11 Tier 4) |
| **Total** | **54** | matches the record count exactly |

**Revision 1's totals (KEEP 21 / MODIFY 18 / MERGE 9 / RETIRE 24 / CREATE 1 = 73) are withdrawn.** *(Historical description of the withdrawn method:)* they were counted at the level of underlying items — expanding the zero-record skills into a separate RETIRE verdict each, for example — while the YAML carried them as single grouped records. The two could not be reconciled, which is exactly the defect this audit criticizes elsewhere: a human-readable total not derivable from the machine-readable data.

An expanded figure is also published (`verdict_counts_expanded`: KEEP 60 / MODIFY 59 / MERGE 14 / RETIRE 89 / CREATE 1) so both bases are reproducible — but it should be used with care. It is dominated by two large collections: `L2.audits` (43 files, **one** retirement decision) and `L2.reviews` (44 files, **one** keep decision). Retiring an abandoned folder is one decision about 43 files, not 43 decisions. **The record basis is the honest summary.**

### 2.1 Overlap clusters

> Counts below are **invocation records in the ledger's Skill column** (see §1.2 for the basis). They were revised downward in revision 2; revision 1's figures came from substring-matching the whole file.

**Repository truth (3 artifacts, 3 different definitions of "truth"):**
`slops-repo-inspector` (paths, git status, canonical authority — 71), `slops-graphify` (cross-layer semantic graph — 4), `clean-up-checkpoint` (session shutdown state — 0). These do not actually overlap; they are three layers of one missing capability. **MERGE the trigger, keep the tools.**

**Planning (3 artifacts):**
`planning-pass` (goal → ordered backlog, 35), `product-gap-analysis-session` (HAS vs NEEDS → phased plan, 1), `workflow-tree-spec` (happy path/branches/failure states, 7). Genuinely distinct altitudes. **KEEP all three; the problem is no rule says which to reach for.**

**Verification / launch gating (6 artifacts):**
`slops-quality-baseline` (60), `slops-code-review` (59), `slops-canary` (6), `slops-mobile-smoke` (6), `slops-ship` (4, orchestrator), `slops-verify` (2). `slops-ship` already sequences the others correctly — it is the intended orchestrator and is routinely bypassed. `slops-verify` and `slops-mobile-smoke` both drive the same `run-slops-saloon` driver. **MERGE `slops-verify` + `slops-mobile-smoke`; PROMOTE `slops-ship` into the loop.**

**Learning (2 artifacts):** `slops-retro` (2) and `slops-learning-loop` (0 — **correctly parked** with the named gate `Omen-live-plus-7-days`, not dormant by neglect). Overlapping outputs (both write to `decision_log`). **MERGE on unpark — do not touch before the gate opens.**

**Meta-authoring (5 artifacts, 1 invocation total):** `slops-skill-author` (1), `slops-agent-author` (0), `agent-wrapper-generator` (0), `agent-index-diff-builder` (0), `command-bridge-generator` (0). Four of five have zero records. **MERGE into one authoring skill** — subject to individual triage, since bulk retirement is `NOT APPROVED` (§13).

---

## 3. Planning Pipeline Diagram

### 3.1 The intended pipeline

```
Founder Intent
   └─► kickoff paste ─► read-first (5 files) ─► PULL TASK (sprint→inbox top 5)
        ─► PLAN-APPROVAL GATE ─► BUILD ─► DoD gates ─► DONE&CLOSE
             └─► 5 writes: sprint tick · decision_log · skill ledger · handoff · done/LEDGER
```

### 3.2 The actual pipeline

```
Founder Intent (chat)
   │
   ├─► [L0] TODO.md ────────────────── 5 weeks stale; all "Active" items are
   │        ▲ kickoff PULL TASK        finished initial-commit work. DEAD QUEUE.
   │
   ├─► [L1] TODO.md ────────────────── 6 "Active" items, all permanent postures.
   │        ▲ kickoff PULL TASK        UNPULLABLE.
   │        ┊
   │        ┊  current_sprint.md ───── 7 real items, cost + done-when + blockers.
   │        ┊  ▲ referenced by exactly ONE file in the entire repo. ORPHANED.
   │
   └─► [L2] current_sprint.md ──► agent_inbox.md ──► BUILD ──► 5 writes
            (0 checkboxes)         (Top 5 has 4)      │
            "pull unchecked"       heading dropped    │
             HAS NO REFERENT        in rewrite        │
                                                      ▼
                        handoffs (120) ─── 75% ──► done/LEDGER (90)
                                                      │
                        decision_log (98) ◄───────────┤
                        skill ledger (345) ◄──────────┤
                        sprints_completed ◄───────────┘
                             │
                             ▼
                    [reconciliation] ── one-off human repair, 2026-07-28,
                                        triggered by a GitHub billing hold.
                                        NOT a mechanism.

DOCTRINE FLOW:   L0 ──45 refs──► L1 ──45 refs──► L2      ✓ works
EXECUTION FLOW:  L2 ──0 refs──► L1 ──0 refs──► L0        ✗ never happens
```

### 3.3 Where the pipeline fails

| Failure | Evidence |
|---|---|
| **Duplication** | 4 non-derivable counts of "what got done": 120 handoffs, 90 LEDGER rows, 11 reconciled areas, ~35 `sprints_completed` entries. 6 live test-count claims (240/240, 388/388, 391/391, 417/417, 422/422, 426/426), none derivable from another. |
| **Staleness enters** | 9 of 15 L1 `Direction/` files last touched by one mechanical rename commit on 2026-06-22. L1 `roadmap.md` still says "216/216 tests"; L1's own handoff said 401/401 eleven days later. |
| **Manual work** | "Auto-populate" is an LLM reading one markdown file and rewriting a section of another. No script, no schema, no validation. Result on disk right now: the Top 5 has 4 items — item 5's `### ` heading was dropped in a rewrite and nothing caught it. |
| **Decisions recreated** | The 2026-06-15 "free indefinitely" decision exists **only** as a `facts-of-record.md` line citing a date with no record behind it. It silently invalidates the 2026-06-06 pivot record without touching it. |
| **Context lost** | Cold start at L2, per the 8 L2 entry points that mandate it, requires reading a 216 KB / ~54k-token decision log before the first line of work. `files-to-read-first-L2.md` quietly drops it to keep its own "under 2 min" promise. Agents follow the kickoff they paste, not the module they never see. |
| **Reality reconstructed** | `agent_inbox.md` explicitly instructs agents to distrust the planning documents and grep `main` instead: *"Handoffs in this repo have repeatedly said 'implemented locally; not pushed' for work that was already on `main`. **`main` is the proof.**"* The system has formally conceded that its own planning layer is not authoritative about its own state. |

**The two most mechanical loop steps are un-executable.** Kickoffs say *"pull next 5 **unchecked** items"* and *"**Tick** the item in `current_sprint.md`."* Verified: `current_sprint.md` contains **0 unchecked and 0 checked** checkboxes. The predicate has no referent; the close action has no target. Three mutually inconsistent completion conventions are in simultaneous use (append `— ✅`, `~~strikethrough~~`, move to `sprints_completed.md`).

---

## 4. Repository Truth Assessment

**Does planning begin from verified repository state? No — and the system knows it.**

### 4.1 Doctrine asserts things the filesystem contradicts

**The Omen location claim.** Root `CLAUDE.md:19` and `AGENTS.md:19`, both dated 2026-07-11:

> *"Omen app code → separate repo, `justinduverge-design/omen` (**not a subdirectory of this repo** — confirmed 2026-07-11)"*

Verified directly: `slops-saloon/omen/.git` exists, remote is `justinduverge-design/omen`, HEAD `09ecec2` dated 2026-07-27. Omen **is** a separate repo *and* **is** physically a subdirectory — it is gitignored from L0 (`.gitignore:24`).

The root cause is documented in the repo — and was diagnosed and fixed for a *different* file eight lines away. `graphify-hook.md:39`:

> *"`graphify-out/` is in `.gitignore` (line 14). **A git-tracked search returns nothing even though the files are right there.** That exact mistake produced a false 'graph does not exist' claim which sat in `CLAUDE.md` from 2026-07-11 to 2026-07-18."*

Same date, same mechanism, same file. The 2026-07-18 session caught one gitignored-path false negative and missed the other in the same document. `Blueprints/playbooks/migrate-repos-out-of-onedrive-playbook.md` already contains the correct formulation.

**The newest L0 handoff is stale on arrival.** `2026-07-18-os-hygiene-and-first-kickoff-readiness.md` prescribes the entire next-session run order against three paths I verified as **MISSING**: `Direction/lanes/`, `Blueprints/agent-modules/parallel-lane-doctrine.md`, `Blueprints/prompts/kickoff-lane-agent.md`. **Zero of its four blocking pre-kickoff items were completed** in the 10 days since.

**Contradictions that no mechanism detects:**

| Topic | Positions live simultaneously |
|---|---|
| Monetization | "free indefinitely, no paid tier" (L0 facts-of-record) · "free Y1, monetize Y2" (L0 pivot record, 3 L1 docs) · "MVP Move is paid" (`agents.md`, `workflows/CLAUDE.md`) · "$1/$2/$20 tiers, **locked**" (`01_Operations_COO/agents.md`) · "Omen is a paid product" (ADR-003, `Status: Accepted`) |
| Autonomy | `git push` "allowed autonomously — no permission gate" (`action-posture.md`) vs. "**Codex only**; Justin approval" (`tool-permissions.md`, `TOOLS_INDEX.md`, `AGENT_INDEX.md`) |
| Shell access | "Claude Code — has file tools + bash" (`identity-claude.md`) vs. "**Never touch the terminal**" (`agents.md:74`) vs. "Bash — Codex only" (`TOOLS_INDEX.md:24`) |
| Launch date | Sept 10 2026 (ADR-009, wired to a Founder Kill Switch) vs. August 2026 (L0 launch handoff, "hard deadline") vs. Aug 15 (07-18 handoff) |

`facts-of-record.md` claims override authority — *"If a doc anywhere in this tree contradicts a line here, this file wins until updated"* — but **it wins silently**. Nothing flags, deletes, or even marks the contradicting lines. They just sit there and get read.

### 4.2 Physical repository truth

> **§4.2 was re-verified on 2026-07-29. The headline worktree claim is WITHDRAWN — it was an artifact of the audit's own sandbox, not a defect in the repository.** See CHG-01 in §14. Findings below are classified as **CONFIRMED DEFECT**, **CLEANUP OPPORTUNITY**, or **UNCERTAIN / NOT ASSESSABLE FROM HERE**.

#### WITHDRAWN — "10 prunable worktrees" as a repository-hygiene defect

Revision 1 reported that every worktree is `prunable` and treated that as repository rot. Re-checking the *reason* git gives:

```
$ git worktree prune --dry-run --verbose
Removing worktrees/omen-d1: gitdir file points to non-existent location
```

The admin files record **Windows absolute paths** (`C:/Users/JDuve/dev/SLOPS/slops-saloon/omen-d1/.git`). This audit runs in a Linux sandbox where `C:/...` does not resolve — so git concludes the worktree is gone. **The directories are present on disk** (verified for `omen-d1`, `omen-security-hardening`, `omen-sleeper-waiver-recovery`). On Justin's Windows machine these paths resolve normally and git would almost certainly **not** report them prunable.

**Consequence, and it matters:** running `git worktree prune` *from this sandbox* would delete the admin records for **all 11** worktrees. Revision 1's Tier-3 item 3.8 ("prune all 10 + 5 orphans") was written from a vantage point that could not see the truth it was recommending action on. That recommendation is downgraded to `NOT APPROVED` pending assessment from Windows — see §13.

#### CONFIRMED DEFECT

| Finding | Evidence |
|---|---|
| **Local `main` is 20 commits behind `origin/main`** | `git rev-list --count main..origin/main` = 20; `origin/main..main` = 0. The checkout on disk is not current. This is a live instance of exactly the condition §4.3 describes: planning would begin from stale state. |
| **`slops-saloon/Direction/facts-of-record.md:4`** points at `../Direction/facts-of-record.md`, which normalizes to **itself** | The file whose job is inheriting L0's override facts cannot reach them. Why L0's "no paid tier" never propagated and six L1 documents still assert a paid product. A link checker cannot catch this — the path resolves. |
| **~25 broken pointers at L1, ~33 at L0** | Both L1 index files (`Direction/decisions/README.md`, `References/README.md`) are broken — 50% failure rate on the layer's own indexes. |
| **`Archive/` at L1 is empty** | Nothing has ever been archived, including the five documents L1's own doctrine calls superseded. |

#### CLEANUP OPPORTUNITY (not a defect)

| Finding | Note |
|---|---|
| **1,561 Windows-backslash path references at L0** (49% of all path refs) | Concentrated in `AGENT_INDEX.md` and `tools/`. They resolve fine for a human on Windows. They break POSIX tooling, link checkers, and graphify edge extraction — which matters *if and only if* a validator is built. Not currently causing failures. |
| **Worktree directories carry full `node_modules` trees** | Disk usage, not correctness. |
| **Six worktree checkouts under `omen/.claude/worktrees/`** with one registered admin record | Likely throwaway per `REBRAND_Valor_Ventures_migration.md:50` (*"the `.claude/worktrees/*` copies are throwaway"*). Registration state could not be assessed reliably from this sandbox — see below. |

#### Worktree branch safety — recomputed against `origin/main`

Revision 1 computed ahead/behind against the **local** `main`, which is 20 commits stale, so those numbers were wrong. Recomputed against `origin/main`, with `git cherry` patch-id comparison to distinguish genuinely unique work from commits already applied upstream under a different SHA:

| Branch | Ahead | Unique by patch-id | Contained in `origin/main` | Safety |
|---|---|---|---|---|
| `codex/apple-auth-provisioning-docs` | 0 | 0 | YES | fully merged |
| `backend/d1-trade-pulse-v2` | 0 | 0 | YES | fully merged |
| `chore/dependency-health-clean` | 0 | 0 | YES | fully merged |
| `docs/inbox-ledger-reconciliation-2026-07-27` | 0 | 0 | YES | fully merged |
| `backend/b2d-context-contract` | 0 | 0 | YES | fully merged |
| `codex/m4-omen-screen` | 0 | 0 | YES | fully merged |
| `codex/sleeper-s3-live-proof` | 0 | 0 | YES | fully merged |
| `codex/m0be3-yahoo-mobile-return` | 1 | **0** | no | content already upstream under a different SHA |
| **`chore/dependency-health-controls`** | 9 | **4** | **no** | **holds unique work** |
| **`codex/security-log-redaction`** | 4 | **2** | **no** | **holds unique work** |

**Corrected picture: 7 branches fully merged, 1 patch-duplicate, 2 holding 6 genuinely unique commits.** Revision 1 said "six carry zero unmerged commits" — the real number is seven, and one more is a content-duplicate. Note also that an **11th** worktree (`omen-sleeper-waiver-recovery`) appeared between the first pass and this one and is already fully merged.

**No destructive action is recommended on any worktree.** The two branches holding unique work must be resolved first, and the whole assessment should be re-run from Windows where the paths resolve.

#### UNCERTAIN / NOT ASSESSABLE FROM THIS SANDBOX

- **Working-tree dirty state of any worktree.** `git -C <dir> status` fails because the `.git` file points at a Windows path. Uncommitted work in any of the 11 directories is invisible to this audit. This is the single largest blind spot in §4.2 and is the main reason cleanup is not recommended.
- **True registration state of `omen/.claude/worktrees/`.** Revision 1 claimed five orphaned checkouts with no git record; that inference came from the same broken-path condition and is **not reliable**. Downgraded to uncertain.

### 4.3 The capability already exists and is not wired in

`slops-repo-inspector` is the **second-most-used skill in the system** (71 invocations) and its stated purpose is exactly this: *"Inspect SLOPS L0, L1, and L2 repo truth before planning or editing… current paths, source-of-truth docs, git status, canonical skill authority, stale-path cleanup."*

It is **not in any read-first list and not in any kickoff PULL TASK step.** It gets used because individual agents reach for it, not because the loop requires it. That is the cheapest high-value fix in this entire audit.

---

## 5. Decision Propagation Assessment

### 5.1 Can an agent distinguish a locked decision from a thought? No.

There is no status field at any layer. Status exists only as English inside bullet prose, in at least six mutually inconsistent phrasings at L2 alone: `"M0b is approved"`, `"Decisions **Ratified**"` (used once in 98 entries), `"Justin approved"`, `"Founder approval recorded"`, `"This is local work only until Justin ships it"` (repeated verbatim as an ad-hoc marker), `"retired in place"`.

At L1 the four categories are formatted **identically** — a ratified doctrine lock, an explicit non-decision, a commit-message hygiene note, and a codebase observation are all `- **Bold lead.** prose`:

> *ratified:* `- Slops Saloon fan-experience doctrine v1 locked.`
> *explicit non-decision:* `- **Manual Omen feasibility:** Not approved or rejected.`
> *process note:* `- **Codex commit-message hygiene note:** the commit message … under-sold the actual scoped fixes.`

A parser cannot separate these. A human must read every bullet and infer.

**The one thing that does work** is `facts-of-record.md` — 7 numbered items with declared override semantics. It is the best-designed artifact in the repo and the closest thing to a lock mechanism. But: there is **no written rule for how something gets promoted into it**, it has only 7 items, L0's is 6 weeks stale with a known-stale item flagged and never fixed, and L1's cannot reach it.

### 5.2 The traceability test — three decisions traced end to end

I selected decisions that are ratified, cross-disciplinary, and recent enough that propagation failure would still be visible. Two brackets the result.

**T1 — Font stack lock (2026-07-19). PROVEN FAILURE.**

> *"**Font stack locked: Alegreya Sans / Alegreya / DM Mono.** … Cinzel/Inter (named in `component-lock-v1.md` §5) **are not revived**."*

The decision explicitly names the file it invalidates. I verified that file today:

```
component-lock-v1.md:203  | `display` | Cinzel serif | 48/56 | 700 | …
component-lock-v1.md:205  | `h2`      | Inter sans   | 20/28 | 600 | …
```

Still there, 9 days later. And `omen/CLAUDE.md:26` **still calls that file "canonical component API/tokens"** while `Blueprints/specs/design/README.md` calls it "partially superseded."

| Stage | Present? | How referenced | Drift |
|---|---|---|---|
| Decision record | ✓ | prose bullet, no ID | — |
| Repository truth | ✗ | the named file was never updated | **BREAK** |
| Planning constraints | ~ | 5 mobile specs propagated correctly | partial |
| Sprint requirements | ✓ | M1 briefs | — |
| Execution handoff | ✗ | 4 files / 8 sites hit the contradiction | **BREAK** |
| Verification criteria | ✗ | `done/design-done.md` gate 10 still says *"Focus rings visible, **gold accent**"* — the exact thing a sibling decision forbids | **BREAK** |
| Launch evidence | n/a | — | — |

**Downstream cost, measured:** three separate component briefs hit the contradiction and were each told **not to fix it** — `jules-04-pagehero.md:47`: *"the type-scale table above comes from `component-lock-v1.md` and has not been reconciled against the live font stack. **Do not silently swap fonts.**"* The system paid the tax three times rather than repairing the source.

**T5 — `AI_PROVIDER` cloud cap = $0 (2026-07-12). PROVEN SUCCESS, full nine-artifact chain.**

> *"**cloud AI spend is not authorized at all** … any `cloud` provider path must hard-fail or stay disabled unless a future decision raises the cap above $0."*

Traced: precondition (`decision_log` 2026-06-10, *"DO NOT BUILD until the cap is logged"*) → sprint item D2 → two pre-build reviews → implementation review → handoff → done ledger → skill ledger → sprints_completed → closeout decision that explicitly refuses to overclaim (*"implemented work, not deployment proof… no production environment change is implied"*). **Nine artifacts, 15 days, zero drift.**

**T2 — Custom URL scheme `com.slopssaloon.omen://` (2026-07-19). SUCCESS.** 12 markdown references plus source. It propagated because **it is a literal string that must appear in source code to function.** It self-enforces.

### 5.3 The finding — stated at the strength the evidence supports

> **Re-scoped 2026-07-29.** Revision 1 stated this as a general law. Three traced cases cannot establish a law. The evidence and the pattern both stand; the generalization is narrowed. See CHG-03 in §14.

**What was actually tested:** 3 decisions out of **98** dated entries in the L2 decision log (~3%). The sample was deliberately **non-random** — selected for being ratified, cross-disciplinary, and recent enough that failure would still be visible. That selection makes the cases informative but makes the sample unsuitable for frequency claims.

| Case | Encoding | Result | Strength of evidence |
|---|---|---|---|
| **T5** — `AI_PROVIDER` $0 cap | blocking predicate + negative constraint | propagated, 9 artifacts, 15 days, zero drift | **Strong.** Full chain independently traceable. |
| **T2** — `com.slopssaloon.omen://` | machine-checkable literal the build fails without | propagated, 12 docs + source | **Strong**, but partly self-proving: a broken literal breaks the build, so survival is expected. |
| **T1** — font stack lock | documentation obligation | failed at 4 of 7 stages; 2 of 7 disciplines inherited | **Strong** — and re-verified directly on 2026-07-29 (`component-lock-v1.md:203-209` still lists Cinzel/Inter; `omen/CLAUDE.md:26` still calls that file canonical). |

**What this supports:** a **tested pattern** — one demonstrated failure mode (documentation obligation), one demonstrated success via blocking predicate, one demonstrated success via machine-checkable literal. The mechanism is plausible and the three cases are consistent with it.

**What this does not support:** that *all* documentation obligations fail or that *all* machine-checkable decisions succeed. Ninety-five entries were not traced. There are almost certainly documentation obligations in this repo that were honoured — indeed, T1's own decision propagated correctly into five mobile specs and failed only into the sixth file, which is itself evidence that the encoding shapes probability rather than determining outcome.

**Stated at the right strength:** *encoding appears to be the dominant variable in whether a ratified decision survives downstream, and the one tested documentation-obligation case failed while both tested self-enforcing cases succeeded.* That is enough to justify FR-B and FR-C as design direction. It is not enough to claim a proven law, and the recommendation does not depend on one.

**What is not in doubt:** this is not a discipline problem. Discipline is demonstrably high — `Direction/reviews/` produced consistently for six weeks, a scrupulous degraded-verification doctrine, a voluntary and honest reconciliation on 2026-07-28. The OS simply has no way to represent an obligation that something checks.

### 5.4 Reverse trace — is implementation auditable back to authorization?

Partially, and only by grep. `Direction/agent_inbox.md` is the closest thing to an audit instruction and it points at git, not at the decision store. There is no decision ID to trace back *to*. Reverse-tracing T5 took 9 manual hops through named files; reverse-tracing an arbitrary merged PR to its governing decision is not reliably possible.

### 5.5 Conflict and staleness detection

**None exists.** No skill, script, CI job, or checklist performs conflict detection. Two proofs:

- L2 `decision_log.md:363` — the `## Active Decisions` standing block, the one place that should hold current standing truth, opens with **`- Corvus is the Fantasy Football MVP product.`** Five weeks after the rename that the same file records at line 590. The log contains 48 occurrences of "corvus."
- L2 `known_issues.md` (header: "Last updated 2026-07-19") says *"Legacy `src/omen_gdpr.js` remains present"* — the file was deleted 2026-07-13, six days **before** that stated update.

### 5.6 Inheritance breadth

For T1 (the strongest test): design ✓ (mobile specs), frontend ✗ (`component-lock-v1.md` unrepaired), backend n/a, **QA ✗** (`design-done.md` gate 10 contradicts it), analytics ✗, documentation ✗ (`CLAUDE.md` still calls the stale file canonical), launch ✗. **Two of seven disciplines inherited the constraint.**

---

## 6. Gap Analysis

| # | Gap | Severity | Existing capability that could close it |
|---|---|---|---|
| 1 | Decisions have no stable ID or status field | **Critical** | The abandoned ADR schema already defines it |
| 2 | No supersession mechanism at any layer | **Critical** | L2 practices it in prose — formalize |
| 3 | No conflict/staleness detection | **Critical** | `probo.yaml` pattern; `slops-repo-inspector` |
| 4 | Repo truth not required before planning | **High** | `slops-repo-inspector` — exists, 71 uses, not wired to the loop |
| 5 | Loop's pull/close steps un-executable (0 checkboxes) | **High** | Restore checkboxes **or** update the three instruction sites |
| 6 | `facts-of-record.md` has no promotion rule and doesn't inherit at L1 | **High** | One-line path fix + a written promotion rule |
| 7 | Cold start mandates a 216 KB log | **High** | Split by status; keep the log as archive |
| 8 | "Provisioned" is not a DoD state | **High** | Add gates to `release-done.md` |
| 9 | Launch gates cannot see the native program | **High** | `release-done.md` — 0 mentions of native/mobile/iOS/Android (verified) |
| 10 | Execution state never flows L2 → L1 → L0 | **Medium** | `slops-retro` exists (6 uses) |
| 11 | **23** skills with zero ledger records — 2 correctly parked, 1 a practice gap (`slops-product-pulse`), the rest split across early capabilities, overlapping utilities and genuine retirement candidates; **2** phantom ledger tokens (`slops-deploy-guard` 13 records, `jules-react-component` 11); **2** registry-only skills marked active (`design-quality-bar`, `ux-ui-build-pipeline`) | **Medium** | Individual triage against `SLOPS_LIFECYCLE.md`. Bulk retirement is `NOT APPROVED` (§13). |
| 12 | `SLOPS_LIFECYCLE.md` (the only orchestration artifact) is in no read path | **Medium** | Add to read-first |
| 13 | Three competing agent-wrapper sets auto-load by cwd | **Medium** | Delete two |
| 14 | **Windows-native worktree state not yet safely assessed** (the audit sandbox cannot resolve the Windows paths in the worktree admin files); **local `main` is 20 commits behind `origin/main`**; **2 branches hold 6 unique commits** (`chore/dependency-health-controls`, `codex/security-log-redaction`) | **Medium** | Re-assess from Windows; resolve the 2 branches. **No pruning, deletion, or destructive cleanup is authorized** (§13). |
| 15 | ~58 broken pointers; 1,561 backslash paths | **Medium** | Scriptable |
| 16 | Both L1 index files broken; L1 `Archive/` empty | **Low** | Manual |

---

## 7. Doctrine Corrections

Ordered by damage. Each is a correction to an **existing** file.

1. **`CLAUDE.md:19` + `AGENTS.md:19`** — replace the Omen parenthetical with the formulation already correct in `migrate-repos-out-of-onedrive-playbook.md`: *"nested at `slops-saloon/omen/` but gitignored from the L0 repo; pushes to its own remote."*
2. **`slops-saloon/Direction/facts-of-record.md:4`** — `../Direction/…` → `../../Direction/…`. One character. Unblocks all of L0's override facts reaching L1.
3. **Autonomy contradiction** — reconcile `action-posture.md` (push/bash free) against `tool-permissions.md` + `TOOLS_INDEX.md` + `AGENT_INDEX.md` (Codex-only, approval-gated). `action-posture.md:29` anticipates *doctrine vs. tool-config* mismatch; the actual mismatch is doctrine vs. doctrine and it names no winner.
4. **Monetization** — five positions live. `facts-of-record.md` should win; the contradicting lines in `agents.md`, `workflows/CLAUDE.md`, `01_Operations_COO/agents.md`, ADR-003 and four L1 docs need retirement banners, not silent override.
5. **Vendor coupling** — ~50 binding vendor-coupled lines at L0 against 6 capability-neutral ones. See §8.
6. **`omen/CLAUDE.md:26`** — stop calling `component-lock-v1.md` "canonical" while `specs/design/README.md` calls it partially superseded.
7. **Kickoff PULL TASK steps (L0 + L1)** — both point at `TODO.md` files that are stale/unpullable. L1's kickoff should point at `current_sprint.md`, which is current, well-structured, and referenced by exactly one file in the repo.
8. **`layer-2-rules.md:7,16`** — names `services/` and `routes/` as in-scope L2 source directories. Neither exists.
9. **The 07-18 handoff** — mark it superseded or create the three lane files it depends on. As written it sends the next session into three dead ends.

---

## 8. Agent Doctrine Audit

**Does the repository still assume "Claude plans, Codex executes"? Yes — in roughly 50 binding lines against 6 capability-neutral ones. The migration away from it was started and abandoned mid-way, which is why the two halves now actively contradict each other.**

### 8.1 The scoreboard

| | Lines | Where |
|---|---|---|
| Capability-neutral (target state) | ~6 | `facts-of-record.md`, `identity-{claude,codex}.md`, `layer-1-rules.md`, `layer-2-rules.md`, `kickoff-modules/pull-task.md` |
| **Binding vendor assignment** | **~50** | `tools/tool-permissions.md`, `tools/TOOLS_INDEX.md`, `agents/agents.md`, `agents/AGENT_INDEX.md`, `agents/layer-handoff-protocol.md`, `workflows/`, `playbooks/runbook_ai_workflow.md`, `playbooks/new-machine-setup-playbook.md`, `prompts/_templates/`, `Direction/manifesto.md`, `SLOPS_LIFECYCLE.md` |

**Already migrated:** the `agent-modules/` kernel, the `kickoff-modules/`, `facts-of-record.md`, L2's lane *labels* (Backend / Frontend / Ops / Verify / Decisions), and `omen/Direction/sprints_completed.md` — all correctly say *"either agent can pull any item."*

**Not migrated:** everything with teeth.

### 8.2 The five deepest couplings

These are ordered by how hard they would be for a fourth runtime to work around.

1. **RBAC tiers are vendor-gated.** `tool-permissions.md` defines tier 4 (execution) and tier 5 (destructive) as **"Codex only"** — bash, tests, builds, commits, and pushes. This is empirically false today (Claude Code and Cowork both have bash) and is the mechanical source of the autonomy contradiction in §4.1.
2. **Kickoff filenames are vendor-keyed.** There is no `kickoff-frontend.md`, only `kickoff-frontend-claude.md`. **A third runtime cannot start a session without a new file being authored.**
3. **The contract bus is named by vendor pairing.** `frontend-to-backend.md` is documented as *"Claude/frontend requests for Codex/backend."* A capability-keyed system would call these `ui-to-service.md` / `service-to-ui.md`.
4. **A permission boundary is keyed to vendor identity.** `decision_log.md:15` constrains **Jules** by name — *"may investigate, test, and propose a PR, but cannot merge, deploy, alter secrets."* Those are exactly the right constraints. Attached to a `dependency-updater` **trust tier** they would be portable; attached to a vendor name they are not.
5. **A DoD substitution depends on one vendor's sandbox.** `definition-of-done.md:59` accepts Android tests run against *"the **Codex-sandbox** SDK path."* No other agent can satisfy that gate as written.

Also note: `Blueprints/skills/SLOPS_LIFECYCLE.md` states *"Every skill keeps the Slops contract: **Claude plans / Codex executes / Justin gates**"* — embedding the vendor model into the one artifact that sequences the entire lifecycle.

### 8.3 The coupling is nowhere capability-derived

This is the part that makes it expensive. **No file anywhere says "the runtime with terminal access does X" or "the runtime with browser tooling does Y."** Even the *correct* lines express the lean as *"Claude leans frontend"* rather than naming the capability that justifies the lean. A new runtime therefore has no rule to inherit — it must be added by name in ~50 places across 11 files.

`identity-cowork.md` is the proof of cost: adding one **variant of Claude** required authoring a whole new doctrine module, and Cowork still does not appear in `AGENT_INDEX.md`, `TOOLS_INDEX.md`, or `tool-permissions.md`. The system has already failed this test once, at the easiest possible difficulty.

There is exactly one line in L0 that anticipates a non-Claude/Codex world — `Direction/decisions/design-md-decision.md`: *"repeatable UI guidance across Claude, Codex, Gemini, and future local models."* And L2 has already outgrown the two-vendor model in practice: `agent_inbox.md` routes work to **three** agents (Jules, Codex, Claude), while `facts-of-record.md` still enumerates two.

### 8.4 Recommendation

**Rekey the subject, not the constraint.** RBAC, approval gates, security, and auditability must not weaken — and nothing here weakens them:

| Change | Verdict |
|---|---|
| Tier tables: `Codex only` → `requires: {terminal, repo-write}` + trust tier | MODIFY — preserves every gate, changes only who qualifies |
| Kickoffs: `kickoff-frontend-claude.md` → `kickoff-frontend.md` + a runtime identity module argument | MODIFY — the identity modules already exist and already parameterize this |
| Contract bus: `frontend-to-backend.md` → `ui-to-service.md` | MODIFY |
| Jules constraints → a named `bounded-contributor` trust tier | MODIFY — same constraints, now inheritable |
| `SLOPS_LIFECYCLE.md` contract line → "planner / executor / founder-gate" roles | MODIFY |
| `agents.md`, `workflows/`, `runbook_ai_workflow.md` vendor-role manifests | RETIRE (see §7) |

The correct end state already exists in miniature: `facts-of-record.md`'s lane policy and `pull-task.md`'s *"either can pull anything."* The work is finishing a migration that is already two-thirds designed, not inventing a new model.

---

## 9. Layer Architecture Assessment

**Evaluated cold, no preset. Verdict: keep three layers. The problem is not the count — it is that layer membership is unenforced.**

### 9.1 Are responsibilities mixed? Yes, asymmetrically.

- **L0** is broadly correct. Its defect is age, not placement: only 3 files touched in 25 days, and three competing wrapper sets (`/`, `/Direction/`, `/Blueprints/workflows/`) that auto-load by cwd and never cross-reference.
- **L1 is ~45% misplaced.** Its charter says "keep `Blueprints/` mostly empty until ≥2 products need the same thing." It holds 17 files with one product. Four artifacts are pure L2 (endpoint contracts, route tables, `.jsx` line numbers) — one of them violating `handoffs/README.md`'s own explicit rule *"Do not place active Omen endpoint contracts in this folder."* Two artifacts are pure L0 (`slops-os-app-template-spec.md`, `agent-build-loop-template.md`).
- **L2 is correctly scoped** and is where all real work happens.

But the charter is **self-contradictory**: it says keep `Blueprints/` empty *and* assigns content+marketing to L1. The content specs are correctly at L1 *because of the second clause* and violate the first. Nobody reconciled them. That clause is unenforceable as written and should be narrowed or retired.

### 9.2 Is the hierarchy load-bearing for repository truth?

Yes — and asymmetrically, which is the real finding.

```
Doctrine   L0 → L1 → L2   45 inbound refs from the omen repo   ✓ works well
Execution  L2 → L1 → L0   0 refs                                ✗ never happens
```

L1 doctrine genuinely binds L2 (`slops-saloon-fan-experience-doctrine-v1.md` is cited from 7+ L2 sites including `frontend/src/data/nflTeams.js:36`). That is the layer model working as designed.

But **nothing at L1 or L0 subscribes to L2's reality.** That is precisely why L1 `roadmap.md` can say "216/216 tests" indefinitely while L2 sits at 426/426. The staleness is invisible from inside L1 *by construction*.

**L1's doctrine function is healthy. L1's queue function is dead** — 4 content-edit sessions ever, 13 days silent, a `TODO.md` of permanent postures, and a well-built `current_sprint.md` nothing reads.

### 9.3 Should the company be its own layer?

**Defer. The current evidence supports keeping three layers *for now*; it does not settle the question permanently.**

> **Clarified 2026-07-29.** Revision 1 read as though the absence of a second live product were evidence that a company layer is architecturally wrong. It is not. The absence of product #2 means the *governance requirement* that would justify a fourth layer has not yet materialized — which is an argument about **timing**, not about **correctness**. Revisit when multiple products or divisions create a concrete governance requirement. See CHG-05 in §14.

The pressure is real: `business-launch-foundation.md` anticipates a second division; the entity is now Valor Ventures LLC, which will own both. An LLC owning two divisions is genuinely not a division-level object.

But `REBRAND_Valor_Ventures_migration.md` is **untracked in git, undated, unlogged, unpromoted, and has zero propagation** — 0 matches for "Valor" anywhere in either repo outside that one file. Meanwhile `business-launch-foundation.md`, in the same folder tree, still describes an unnamed Connecticut LLC. **Neither file references the other.**

Adding a fourth architectural layer to a system that cannot keep three layers' membership straight, and cannot propagate an entity name across two documents in the same directory, would add a fourth unenforced boundary. The company-layer question is a **real** question that should be **revisited when product #2 is real** — and the migration doc should first be tracked, dated, logged, and promoted into `decisions/` so it stops being invisible.

### 9.4 Migration effort if pursued later

Low for doctrine (move ~6 files), **high for the entity items** — 181 files match `slopssaloon`, 113 match `com.slopssaloon`. The rebrand doc's central insight is correct and should be preserved verbatim: legal owner, brand, and technical IDs are three independent layers that do not have to match, and the bundle IDs must never change post-publish.

---

## 10. Launch Readiness Doctrine Assessment

### 10.1 Does reusable doctrine answer "what must be true before shipping"?

**Six different things answer it, in six files, with no cross-references and material divergence.**

| Source | Shape | Evidence-gated |
|---|---|---|
| `omen/Blueprints/done/release-done.md` | 18 numbered gates | **Yes** — gate 14 is an executable command; gate 13 a measurable threshold; gate 1 pins a named baseline at a named commit |
| `omen/Direction/release_readiness.md` | 6 bullets | No — "final review", "keep in the checklist" |
| L0 `Blueprints/handoffs/omen-launch-readiness-handoff.md` | 15 criteria | No — a one-session brief, 7 weeks stale, materially wrong on Stripe |
| `omen/Blueprints/specs/docs/decisions/ADR-009.md` | deadline + scope | `Status: Accepted`, references removed Stripe |
| `omen/Direction/agent_inbox.md` | 9 blockers | operational, current, unstructured |
| `omen/Direction/current_sprint.md` | per-item `Done when:` | **Yes**, and well-formed |

Two "hard" launch deadlines a month apart, both live, neither superseded, neither referencing the other.

### 10.2 The five-state test

| State | Status | Evidence |
|---|---|---|
| 1. **DESIGNED** | ~ Partial | No `design-contract-done.md` type exists; an agent invented the category inline in a ledger cell |
| 2. **IMPLEMENTED** | ✓ Yes | `feature-done.md`, 20 gates |
| 3. **PROVISIONED** | ✗ **ABSENT** | No Done file has a provisioning gate |
| 4. **VERIFIED** | ✓✓ **Excellent** | The degraded-verification doctrine is the best thing in the repo |
| 5. **VALIDATED IN PRODUCTION** | ✗ Defined, never entered | `slops-product-pulse` is "required post-live cadence" with **0 rows** in the 345-row ledger |

**State 3 is the dangerous one and it has a live example.** Decision log, 2026-07-19: the Apple OAuth secret *"expires after six months; the founder must rotate it before **2027-01-19**."* **No artifact tracks that date as a task.** No gate asks "is the credential actually installed in the target environment?" This is the classic failure where a feature is coded, merged, and marked done while the API key, DNS record, env var, or webhook was never applied in production.

**Merged vs. released is handled unusually well** and should be preserved verbatim: *"Work merged to `main` during the hold is **merged, not released**, and must never be described as live or deployed."* Paired with an honest disclosure that branch protection is unavailable on the current GitHub plan, so *"a red PR merged during the hold carries no implied verification."*

### 10.3 The structural blind spot

Verified today: `release-done.md`, `release_readiness.md`, and `roadmap.md` contain **zero** occurrences of native/mobile/iOS/Android. All 18 Release Done gates are web/KVM1/Docker-specific (`/api/health`, container tags, `npm --prefix frontend run build`).

Meanwhile `current_sprint.md` declares *"Native Mobile Pivot — active authority… **Pause** all new web page migrations"* and `agent_inbox.md` says *"**Do not auto-pull web UI work.**"*

**Corrected per FR-A.** All surfaces are active: **shared backend/platform ACTIVE · web feature work ACTIVE AS NEEDED · web maintenance/security ACTIVE AS NEEDED · iOS ACTIVE · Android ACTIVE.** The web/KVM gates in `release-done.md` are therefore **correct and should continue** — they govern the shared platform every client depends on.

**The remaining finding, stated precisely:** the three files that define shipping cover only the web/KVM surface, and **no parallel native-client or store-readiness gate set was added alongside them after the native pivot.** There is no Done type that can gate an App Store or Play submission. That is an **incompleteness**, not a misdirection — nothing here says the web gates are wrong or that the web program is paused. Revision 1's "paused program" framing is withdrawn (CHG-04, §14).

### 10.4 Layer assignment

- **Belongs at L0 (reusable):** the five-state model, evidence discipline, the degraded-verification doctrine, rollback-ready-by-default, merged≠released. All of this currently lives **only** at L2 and is genuinely product-agnostic. This is the single clearest case of reusable doctrine trapped in a product layer.
- **Belongs at L1 (company governance):** entity/EIN/ToS/privacy/sales-tax — currently in `business-launch-foundation.md`, correctly placed, but superseded on monetization and disconnected from the entity rebrand.
- **Belongs at L2:** the specific gate values (417/417 baseline, KVM1 thresholds, ESPN cookie prohibition). Correctly placed.

### 10.5 Were the gates actually applied?

Genuinely, and then partially. Handoff→ledger conversion is **75%** (90 rows / 120 handoffs). The ledger has 14 zero-row days on which 17 handoffs were written. `Blueprints/audits/` was **silently abandoned** on 2026-07-19 — its function migrated to `Direction/reviews/` with no doctrine file recording the move, while `specs/design/README.md` still routes to it.

The system diagnosed this itself in `definition-of-done.md`: *"Writing nothing at all is the failure mode that let `done/LEDGER.md` go five days stale."* A corrective rule was added 2026-07-27. **That correction was a human noticing. No check fired.**

---

## 11. Prioritized Improvement Plan

Sequenced. Each tier unblocks the next. Nothing here is a new subsystem.

### Tier 0 — Under an hour, unblocks everything downstream

| # | Action | Verdict | Why |
|---|---|---|---|
| 0.1 | Fix `slops-saloon/Direction/facts-of-record.md:4` (`../` → `../../`) | MODIFY | One character. Unblocks L0 override facts reaching L1. Currently the reason 6 L1 docs assert a paid product. |
| 0.2 | Fix the Omen "not a subdirectory" line in `CLAUDE.md` + `AGENTS.md` | MODIFY | Correct text already exists in the migration playbook. Already caused one wasted audit pass. |
| 0.3 | Point L1's kickoff PULL TASK at `current_sprint.md` instead of `TODO.md` | MODIFY | The good queue exists and nothing reads it. |
| 0.4 | Resolve the checkbox predicate — restore `- [ ]` in `current_sprint.md` **or** update the 3 instruction sites | MODIFY | Two loop steps are currently un-executable. |
| 0.5 | Add `slops-repo-inspector` as a required first step in every kickoff | MODIFY | Skill exists, 71 uses, already does exactly this. Establishes repo-truth-before-planning with zero new artifacts. |

### Tier 1 — The root fix: decision identity

| # | Action | Verdict | Why not CREATE |
|---|---|---|---|
| 1.1 | Give every new decision `id · date · status · supersedes` | MODIFY | The schema already exists in the abandoned `specs/docs/decisions/` ADRs. Revive the schema, keep the low-friction log format. |
| 1.2 | Adopt a fixed status vocabulary: `PROPOSED / RATIFIED / SUPERSEDED / REVERSED` | MODIFY | Formalizes what L2 already does in prose. Six inconsistent phrasings collapse to four values. |
| 1.3 | Write the promotion rule for `facts-of-record.md` and make it the queryable current-truth surface | MODIFY | The file is already declared as override authority. It just has no intake rule and no enforcement. |
| 1.4 | Fix L2 log ordering; state the convention in the file's own preamble | MODIFY | "Above"/"below" are currently load-bearing and wrong in half the file. |
| 1.5 | Mark ADR-003 and ADR-009 superseded; retire the ADR folder as a live store | RETIRE | Two `Status: Accepted` records assert a paid product and a Stripe launch. |

**Encoding rule to adopt (this is the actual lesson of §5):** every ratified decision should carry either a **machine-checkable literal** or a **blocking predicate**. T5 and T2 propagated perfectly because they had one; T1 failed because it had only a documentation obligation. When a decision invalidates another file, it should name that file *and* the check that will fail if the file is not repaired.

### Tier 2 — Launch readiness

| # | Action | Verdict |
|---|---|---|
| 2.1 | Add a **PROVISIONED** gate set to `release-done.md` — credential installed, DNS resolves, env var present in target, webhook registered, migration applied, expiry tracked | MODIFY |
| 2.2 | Track the 2027-01-19 Apple secret rotation as a real queue item | MODIFY |
| 2.3 | Add a native/store Done type, or generalize `release-done.md` beyond KVM1/Docker | MODIFY |
| 2.4 | Promote the five-state model + evidence discipline + degraded-verification + merged≠released from L2 to L0 doctrine | MODIFY (promote) |
| 2.5 | Collapse six launch definitions to one authority; banner the other five | MERGE |

### Tier 3 — Consolidation

> **Founder status applied 2026-07-29.** Several Tier-3 items are **NOT APPROVED** as written. They remain in the plan as *candidates requiring individual triage or dependency review*, not as an approved work queue.

| # | Action | Verdict | Founder status |
|---|---|---|---|
| 3.1 | Triage the **23** zero-record skills (corrected from 20) against `SLOPS_LIFECYCLE.md` — **individually**, excluding the 2 correctly-parked skills and `slops-product-pulse` | RETIRE (candidates) | **NOT APPROVED** as bulk retirement — individual triage required |
| 3.2 | Resolve **2** phantoms — `slops-deploy-guard` (13 records) and `jules-react-component` (11) | MODIFY | ACCEPTED DIRECTION |
| 3.2b | Resolve the 2 registry-only skills (`design-quality-bar`, `ux-ui-build-pipeline`) and the unimplemented gate they imply | MODIFY | ACCEPTED DIRECTION |
| 3.3 | Merge `slops-verify` + `slops-mobile-smoke`; merge the meta-authoring cluster; promote `slops-ship` into the loop | MERGE | ACCEPTED DIRECTION (merge design still needed) |
| 3.4 | Retire two of three competing wrapper sets | RETIRE | **NOT APPROVED** — requires dependency review |
| 3.5 | Retire the 5 division `agents.md`, `cep_operator.md`, root `README.md`, `00_FINAL_PLAN.md` | RETIRE | **NOT APPROVED** — requires dependency review |
| 3.6 | Add `SLOPS_LIFECYCLE.md` to `files-to-read-first-L0.md` | MODIFY | ACCEPTED DIRECTION |
| 3.7 | Move 4 L2-content files out of L1; promote 2 L0-content files | MODIFY | **NOT APPROVED** — immediate repository restructuring not authorized |
| 3.8 | ~~Prune all 10 worktrees + 5 orphans~~ → **Re-assess worktrees from Windows.** Resolve the 2 branches holding 6 unique commits first. | MODIFY | **NOT APPROVED** — prior basis withdrawn (§4.2); dirty state unassessable from the audit sandbox |

### Tier 4 — The one CREATE

**4.1 — A repository-truth validator script.** `CREATE`, and here is why nothing existing can do it:

Every consistency failure in this audit is of a class that **no amount of doctrine can catch, because doctrine is the thing that is wrong.** The specific checks:

- resolve every markdown path reference against disk (would have caught ~58 broken pointers, both L1 index files, and the 07-18 handoff's three dead lane paths)
- detect self-resolving relative pointers (would have caught the `facts-of-record.md` inheritance bug, which a normal link checker misses because the path *does* resolve)
- diff asserted counts against reality (would have caught 6 divergent test counts and the 47-vs-36 wrapper census)
- flag retired names in live doctrine (would have caught `Corvus` in the `## Active Decisions` block, five weeks running)
- verify ledger skill names exist on disk (would have caught `slops-deploy-guard`)

**Why not orchestration or doctrine instead:** the system has already tried doctrine on exactly this problem and lost. `hard-prohibitions.md` #2 says *"Don't claim work was done without evidence."* `definition-of-done.md` names its own five-day ledger failure. `agent_inbox.md` instructs agents to distrust handoffs and grep `main`. **Three separate doctrine-level attempts, all correct, all still requiring a human to notice.** The 2026-07-28 reconciliation happened because a GitHub billing hold forced it — not because anything checked.

**Complexity budget:** this replaces the manual reconciliation passes, retires the need for periodic audits like this one, and is the precondition for retiring 20+ stale documents safely. It removes more than it adds. `probo.yaml` already demonstrates the pattern (`evidence_path` + `check: contains(...)`); this generalizes it from 4 compliance controls to repository truth. It should live at L0 and be invoked by `slops-repo-inspector`.

---

## 12. Closing Assessment

### 12.1 The single highest-leverage improvement

**Give decisions stable identity and status, and make `facts-of-record.md` the enforced, queryable current-truth surface that planning reads instead of the log.** (Tier 0 + Tier 1.)

### 12.2 Why it should come before further planning or launch work

Not because every defect is downstream of it — §0.2 separates three independent failure classes — but because it is the class that **silently corrupts future work**, and because the other two classes are cheaper to fix later without compounding.

- Launch doctrine cannot be fixed first, because you cannot tell which of the six launch definitions is authoritative without a status field.
- Layering cannot be fixed first, because moving files between layers requires knowing which decisions govern them — and there are no IDs to trace.
- More planning cannot help, because planning currently begins by re-deriving reality from a 216 KB log written in two directions, and the system has already formally conceded that its own planning documents are not evidence.

Concretely: **five contradictory monetization positions are live right now.** Any launch checklist, any pricing page, any ToS draft, any marketing plan written before that is resolved will inherit whichever contradiction the authoring agent happened to read. That is not a hypothetical — it already happened. Six L1 documents assert a paid product because one relative path had one too few `../`.

### 12.3 Is Slops OS an operating system, or a collection of planning artifacts?

**Currently a collection of planning artifacts — but with the architecture of an operating system already drawn.**

The distinguishing test for an OS is whether it enforces its own invariants without the operator watching. Slops OS does not, anywhere, once:

- 1 machine-checkable governance artifact exists; it is not wired to CI
- the loop's pull and close steps depend on a predicate that no longer exists in the file
- 23 of 52 skills have zero ledger records (2 correctly parked, 1 a practice gap, the rest awaiting individual triage); 2 skills that do not exist carry 24 recorded invocations between them; 2 more are registered `active` and exist nowhere
- a decision that explicitly named the file it invalidated did not reach that file in 9 days, and 3 downstream briefs were told to work around it
- the `## Active Decisions` block has asserted a retired product name for 5 weeks

What *is* present is unusually good OS *design*: layer separation that genuinely binds, a modular doctrine kernel, per-type done gates, a degraded-verification doctrine that is more honest than most production systems, and a lifecycle map that covers all 13 phases. **The doctrine kernel is strong. The governance kernel was never written.**

**On "it is one script" — corrected.** Revision 1 said Tier 4 *is* the kernel and it is one script. That overstates a proposed simplification as a finished architecture. A validator is a plausible **first executable enforcement component**, and starting there is the right economy. But an enforcement kernel that actually holds will also depend on:

- structured decision records (FR-B) — a validator cannot check a schema that does not exist
- current-truth generation — something must produce the surface being validated
- repository inspection — `slops-repo-inspector` already covers much of this
- routing and workflow invocation — knowing *when* to run
- evidence definitions — knowing what counts as satisfied

The honest statement: **the first executable enforcement layer can begin with one validator; one validator does not complete the Slops OS kernel.** The Truth Gate (FR-C) names the destination; the validator is step one of a staged rollout, and the design has not been done.

### 12.4 Can it preserve founder intent deterministically?

**No. Intent is still substantially dependent on historical chat context — and this should be treated as the first-class architectural concern the brief calls it.**

The proof is not impressionistic. §5 isolates the exact boundary:

- **T5** ($0 cloud cap) carried a blocking predicate and a negative constraint. It propagated through **nine artifacts over 15 days with zero drift**, and its closeout entry explicitly refused to overclaim deployment.
- **T2** (URL scheme) was a literal string the build fails without. It self-enforced across 12 documents plus source.
- **T1** (font lock) carried a documentation obligation. It **failed at four of seven stages**, contradicted the QA gate meant to enforce it, and left `CLAUDE.md` calling the invalidated file "canonical."

Where intent is encoded as something checkable, this system preserves it better than most. Where intent is encoded as prose someone is supposed to act on, it survives exactly as long as the person who remembers it is in the room.

Three further pieces of evidence that intent currently depends on chat:

1. The 2026-06-15 "free indefinitely" decision — arguably the most consequential product decision in the system — **has no decision record at all.** It exists only as a `facts-of-record.md` line citing a date. The reasoning lives in a chat log.
2. **Handoffs are the real memory, not the decision log.** At L0: 21 handoffs vs. 4 decision-log entries. The Hermes v1 abort and the three-layer graph design exist *only* in handoffs and were never promoted.
3. `REBRAND_Valor_Ventures_migration.md` states the legal entity as settled fact, is untracked in git, and has zero propagation. A future agent reading `business-launch-foundation.md` will conclude the entity is an unnamed Connecticut LLC.

**The good news is the diagnosis is narrow.** This is not a culture or discipline problem — the discipline on display in `Direction/reviews/`, the degraded-verification doctrine, and the voluntary 2026-07-28 reconciliation is high. It is an **encoding** problem with a known, demonstrated fix already operating inside the system. T5 is the pattern: make every ratified decision carry what T5 carried — a blocking predicate or a machine-checkable literal — and give something executable the job of noticing when they don't.

**That "something" starts as a validator and is not the whole kernel.** Per CHG-09: a read-only validator (FR-C) is a plausible **first executable enforcement component**, and starting there is the right economy. It does **not** complete the governance kernel by itself — it depends on structured decision records (FR-B), current-truth generation, repository inspection, routing, and evidence definitions. Implementation remains `NOT YET AUTHORIZED` (§13).

---

## 13. Approval Status

Founder-assigned status, 2026-07-29. `ACCEPTED DIRECTION` authorizes **planning and correction only** — not implementation.

| Area | Founder status |
|---|---|
| Immediate Tier 0 path and queue corrections | **ACCEPTED DIRECTION**, pending corrected evidence |
| Decision identity and status | **ACCEPTED DIRECTION** |
| Hybrid + Time ID model (`DEC-YYYYMMDD-NNN` + `SCOPE.DOMAIN.TOPIC`) | **ACCEPTED DIRECTION** |
| Read-only Truth Gate | **ACCEPTED DIRECTION**; exact implementation **REQUIRES DESIGN** |
| DISCUSS → PROPOSE → RATIFY → EXECUTE | **ACCEPTED DIRECTION** |
| Provisioned release state | **ACCEPTED DIRECTION** |
| Native/store release gates | **ACCEPTED DIRECTION**; scope **REQUIRES DESIGN** |
| Capability-based agent routing | **ACCEPTED DIRECTION** |
| Bulk retirement of unused skills | **NOT APPROVED** — requires individual triage |
| Bulk deletion of wrapper sets and division documents | **NOT APPROVED** — requires dependency review |
| Immediate company-layer migration | **DEFERRED** |
| Immediate repository restructuring | **NOT APPROVED** |
| Truth Gate implementation | **NOT YET AUTHORIZED** |
| CI enforcement | **DEFERRED** until report-only checks are validated |
| Worktree pruning *(added in revision 2)* | **NOT APPROVED** — prior basis withdrawn; 2 branches hold unique work; dirty state unassessable |

---

## 14. Claim Change Log — revision 1 → revision 2

| ID | Claim | Status | Resolution |
|---|---|---|---|
| **CHG-01** | "10 prunable git worktrees — repository rot; prune all 10 plus 5 orphans" | **WITHDRAWN** | `prunable` was reported because worktree admin files record Windows absolute paths that do not resolve in the audit's Linux sandbox. The directories exist on disk. Running the recommended prune from the sandbox would have destroyed all 11 admin records. Replaced by an `origin/main` safety table and an explicit uncertainty note. |
| **CHG-02a** | "5 skills routed but absent from L0" | **CORRECTED** | 3 were not defects: `slops-markdown-authoring` is routed `retired`; `slops-content-ship` and `slops-voiceover` are routed with the Layer column naming their exact Omen-local path. Corrected to **2** genuine registry-only defects. |
| **CHG-02b** | "The routing table does not distinguish product-local skills" | **WITHDRAWN** | The Layer column names the exact Omen-local path for both. |
| **CHG-02c** | "The Status column does not parse as a consistent enumerated field" | **WITHDRAWN** | It parses cleanly — 53 `active`, 2 `parked:<gate>`, 1 `retired`, 1 `paired-with:` — with a documented legend. My parser was wrong, not the file. |
| **CHG-02d** | "20 skills never used" + all usage counts | **CORRECTED** | Counts came from substring-matching the whole ledger, which also matched skills named as *not applicable*. Re-derived from the Skill column: **23** zero-record skills, and lower counts for most used skills. |
| **CHG-03** | "Propagation succeeds when… fails when…" stated as a general law | **SOFTENED** | Restated as a tested pattern across 3 of 98 entries, non-randomly selected. Recommendations do not depend on the stronger claim. |
| **CHG-04** | Launch doctrine "describes the paused program" | **REFRAMED** | Per FR-A: shared backend, web, iOS and Android are all active. The web/KVM gates are correct and should continue; the finding is that a **parallel** native/store gate set was never added. |
| **CHG-05** | Absence of a second product cuts against a company layer | **CLARIFIED** | That is an argument about timing, not correctness. Defer; revisit at multi-product. |
| **CHG-06** | "An operating system specification with no kernel" | **CLARIFIED** | Two meanings separated: **doctrine kernel present and strong**; **executable governance kernel absent**. |
| **CHG-07** | "Exactly one machine-checkable governance artifact" | **NARROWED** | `probo.yaml` is the only **structured governance-control map**. It is not the only machine-readable or automatically-testable artifact — `native-visual-evidence.yml`, `slops-prompt-guard.mjs` and `baseline.json` all attempt narrower automated enforcement. |
| **CHG-08** | "Every other defect is downstream of decision identity" | **SOFTENED** | Three independent failure classes identified (§0.2). Decision identity is highest-leverage because it corrupts future work, not because it causes the others. |
| **CHG-09** | "Tier 4 is that kernel, and it is one script" | **SOFTENED** | A validator is a plausible **first** enforcement component; it does not complete the kernel. |
| **CHG-10** | YAML described as a "full per-artifact map"; verdict totals 21/18/9/24/1 | **CORRECTED** | It is a mixed map: 36 artifact + 18 aggregate records. Totals recomputed on a reproducible record basis: 12/31/4/7 (+1 CREATE counted separately) = 54. |

**Confirmed unchanged** (re-verified 2026-07-29, no correction needed): the L1 `facts-of-record.md` self-resolving pointer · `current_sprint.md` 0/0 checkboxes · `component-lock-v1.md:203-209` still listing Cinzel/Inter · `omen/CLAUDE.md:26` still calling it canonical · `release-done.md`/`release_readiness.md`/`roadmap.md` at 0 native mentions · `## Active Decisions` still opening "Corvus is the Fantasy Football MVP product" · `Direction/lanes/` + `parallel-lane-doctrine.md` + `kickoff-lane-agent.md` all missing · 52 L0 skills · the five-state model · the degraded-verification doctrine · merged ≠ released.

---

## 15. Re-verification Report — §§1.2, 4.2, 5.2, 9

Four planned sub-agents were terminated mid-run by an account spend limit during revision 1, leaving these four sections on thinner evidence. Each was re-read directly on 2026-07-29.

| § | Method | Outcome |
|---|---|---|
| **1.2 Skills** | Parsed `SKILL_ROUTING.md` and the 345-row skill ledger as tables rather than substring-matching. Checked every "missing" skill against L0, `omen/Blueprints/skills/`, `omen/skills/`, `.agents/`, `.claude/`. Read the routing legend. | **4 corrections, 3 withdrawals.** Confirmed: 52 L0 skills; `slops-deploy-guard` phantom. Corrected: 23 (not 20) zero-record skills; 2 (not 5) routing defects; 2 (not 1) phantoms; all usage counts revised down. Withdrawn: the Status-column and product-local claims. New finding: `design-quality-bar` is declared a mandatory gate inside `design-md-author` and that skill file has zero references to it. |
| **4.2 Repo truth** | Queried `git worktree prune --dry-run --verbose` for the actual prunable *reason*; checked directory existence on disk; recomputed all branch arithmetic against `origin/main` instead of the stale local `main`; used `git cherry` patch-id comparison. | **Headline claim withdrawn** (CHG-01). Corrected: 7 branches fully merged (not 6), 1 patch-duplicate, 2 holding 6 unique commits. **New confirmed defect:** local `main` is 20 commits behind `origin/main`. New uncertainty recorded: worktree dirty state is unassessable from this sandbox. |
| **5.2 Propagation** | Re-verified T1's breakage directly against `component-lock-v1.md` and `omen/CLAUDE.md`. Quantified sample size and selection method. | **Evidence sound, generalization narrowed.** All three cases hold. Restated as a 3-of-98 non-random tested pattern. Added the caveat that T1 *did* propagate into 5 of 6 target files — encoding shapes probability, it does not determine outcome. |
| **9 Layering** | No new file reads; reasoning re-examined. | **Recommendation preserved, framing clarified** (CHG-05). Keep three layers for now; the company-layer question is deferred, not settled. |

---

## Appendix — Method and limits

**Verified independently by me against the filesystem** (not taken from sub-agent report): the nested Omen git repo and its remote; `Direction/lanes/`, `parallel-lane-doctrine.md`, `kickoff-lane-agent.md` all missing; `current_sprint.md` checkbox count = 0/0; `component-lock-v1.md:203-209` still lists Cinzel/Inter; `omen/CLAUDE.md:26` still says "canonical"; release/readiness/roadmap native mentions = 0/0/0; `## Active Decisions` still says "Corvus"; L1 `facts-of-record.md:4` self-pointer; **23** skills with zero ledger records; **2** phantom ledger tokens (`slops-deploy-guard`, `jules-react-component`) absent from disk and from `SKILL_ROUTING.md`; **2** registry-only skills marked active (`design-quality-bar`, `ux-ui-build-pipeline`); the 13-phase lifecycle table.

**Re-verified in revision 2 (2026-07-29):** 52 L0 skills; routing Status distribution 53/2/1/1; 345 ledger rows → 622 invocation records → 23 zero-record skills; `design-quality-bar` and `ux-ui-build-pipeline` absent from disk; `design-md-author/SKILL.md` has zero references to its declared gate; `slops-deploy-guard` (13) and `jules-react-component` (11) absent from disk and routing; worktree prunable *reason*; directory existence on disk; all branch arithmetic against `origin/main`; `git cherry` patch-id comparison; local `main` 20 behind `origin/main`; T1's breakage still live.

**Limits — stated plainly.**

- **The audit sandbox is a Linux mount of a Windows working tree.** This produced one materially wrong finding (CHG-01) and remains the single largest source of uncertainty. Any claim about worktrees, file permissions, or path resolution should be re-checked from Windows before it is acted on.
- **Worktree dirty state is unassessable from here.** `git -C <dir> status` fails because the `.git` files record Windows absolute paths. Uncommitted work in any of the 11 worktree directories is invisible to this audit. This is why no worktree cleanup is recommended.
- **The propagation finding rests on 3 of 98 decision entries**, non-randomly selected. It is a pattern, not a proven law.
- **Application source** (`src/`, `frontend/`, `client/`, `mobile/`) was inventoried but not read line-by-line; per the brief this is an OS review, not an Omen review.
- **The 216 KB L2 decision log** was read strategically (first 400 lines, last 600, grep-driven sampling of the middle) rather than exhaustively.
- **`Archive/quarantine/`** (3,009 files) was characterized, not read.
- **Four planned sub-agents were terminated mid-run by an account spend limit** in revision 1. Their scopes — skills, repo-truth forensics, propagation, launch doctrine — were completed directly in the main session, which is why §1.2, §4.2, §5.2 and §9 originally cited fewer files than §1–§3. Revision 2 re-verified all four (§15).
- **Revision 2 changed 12 claims** (§14). Three were withdrawn outright. A reader who acted on revision 1 should re-read §§0, 1.2, 4.2, 5.3 and 9.3 before proceeding.
