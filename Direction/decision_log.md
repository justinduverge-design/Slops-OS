# Decision Log — SLOPS OS (L0)

**Purpose:** durable L0 operating decisions. Read the latest entries after `Direction/facts-of-record.md` when starting root-layer work.

## 2026-06-16 — L0 startup uses module wrappers, not legacy handoff folders

**Decision:** L0 agents start from `AGENTS.md` / `CLAUDE.md`, then follow `Blueprints/agent-modules/files-to-read-first-L0.md`.

**Reason:** Older prompts and context snapshots may still mention root-level `roadmap.md` or `handoffs/...` files. The current system uses `Direction/facts-of-record.md`, this decision log, the resources index, and the skill routing matrix for L0 orientation.

**Impact:** If a future session sees conflicting startup instructions, prefer the module wrappers and Direction files. App-specific Omen work routes to `slops-saloon/omen/Direction/current_sprint.md`, `slops-saloon/omen/Direction/agent_inbox.md`, and `slops-saloon/omen/Blueprints/handoffs/`.

## 2026-06-21 — Adapt selected methods; do not install the researched repositories wholesale

**Decision:** SLOPS owns adapted workflows for personal learning, community-needs research, and vertical-slice TDD. Existing skill authoring, investigation, and code review procedures absorb the approved high-value methods. The restored `phuryn/pm-skills` strategy red-team remains reference-only. Do not install the full researched repositories, Ponytail hooks/plugin, `pm-ai-shipping`, OpenCut, or the cybersecurity skill pack in this acquisition wave.

**Reason:** The selected methods close verified procedure gaps while canonical SLOPS wrappers preserve routing, safety, and maintenance authority. Wholesale installs create overlapping doctrine, hook/runtime risk, or version/licensing uncertainty without a current product need.

**Impact:** Canonical skills remain in `Blueprints/skills/` and are distributed to both agent runtimes only after backup and hash verification. Future acquisition must show a new capability gap, license clarity, current standards, and lower overlap than adapting a bounded method.

## 2026-06-21 — Park future capabilities; make every current skill operational through Omen procedures

**Decision:** Park `slops-learning-loop` until Omen is live, Release Done is satisfied, and seven stable days of product evidence exist. Its first use will teach why Omen uses its current technology and identify evidence-backed improvements before the season ends. Park `slops-community-needs-research` until Justin explicitly opens a future community-product discovery phase. Every other active SLOPS skill must have a documented Omen playbook/runbook trigger, owner, and evidence artifact; irrelevant skills are conditional, not forced into every task.

**Reason:** Omen is the baseline product for the company. Skills only create value when operating procedures invoke them and preserve evidence. The learning/community work would distract from getting Omen live if activated now.

**Impact:** Parked canonical packages remain versioned but leave both runtime skill directories after backup. Omen gains a core lifecycle playbook, conditional skill runbook, complete usage matrix, and usage ledger. Kickoff and done gates must record which skills were used or why a conditional skill was not applicable.

## 2026-07-03 — CRLF and Corvus→Omen rebrand cleanup closed

**Decision:** The ~90-file dirty working tree flagged at the end of the 2026-07-03 fan-experience doctrine session was resolved via two scoped PRs (`docs/2026-07-03-crlf-rebrand-content-cleanup`, merged `be8e9a0`; `chore/normalize-line-endings`, merged `56d5a66`) rather than the single normalize-then-content sequence the reanchor doc originally proposed.

**Reason:** Phase 1 diff testing (`git diff --name-only -w`) disproved the reanchor doc's core assumption — none of the modified files were pure CRLF churn; all 91 had real, uncommitted Corvus→Omen rebrand content. `.gitattributes` also already existed (added 2802c43, 2026-06-21); the actual drift cause was local `core.autocrlf=true` fighting the existing `eol=lf` attribute, not a missing normalization rule. Content commits had to land first so the dedicated normalize branch's diff stayed pure (confirmed empty via `git diff --cached -w --stat` beyond the `.gitattributes` edit itself).

**Impact:** `core.autocrlf` is now `input` locally; `.gitattributes` covers `.docx`/`.xlsx`/`.pptx`/`.zip` (binary) and `.bat`/`.cmd`/`.ps1` (CRLF-preserved) in addition to the existing rules. A `.gitignore` rebrand bug (duplicate `slops-saloon/omen/` line, legacy-folder comment defeated) was fixed by dropping the stale line. 5 files under `_pending/`, `_old-prompts-for-analysis/`, and `_proposals/` remain intentionally uncommitted pending Justin's call. Full detail in `Blueprints/handoffs/2026-07-03-crlf-and-rebrand-cleanup-handoff.md`.

## 2026-08-20 — Valor Brain metadata v1 ratified across L0, L1, and L2

**Decision:** Ratify the opt-in `valor-brain/v1` metadata profile, its Draft 2020-12 JSON Schema, the required Markdown body contract, and repository-local validation. L0 owns the canonical contract; L1 inherits it from the shared repository; Omen keeps byte-identical schema and validator mirrors for standalone operation.

**Reason:** The O2 pilot demonstrated that task state, change state, and exercise state must remain separate. A governed profile makes authority, provenance, relationships, freshness, and compile snapshot explicit without forcing all Markdown into frontmatter or inventing a parallel DBS tree.

**Impact:** Only pages declaring `metadata_profile: valor-brain/v1` are governed. Existing DBS purpose still selects the physical folder, existing sprint/status doctrine still owns task lifecycle, and ordinary Markdown is unchanged. Mass migration, automatic extraction, Graphify ingestion, production authority, and a new domain-modeling skill remain outside v1.
