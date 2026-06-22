# Decision Log — SLOPS OS (L0)

**Purpose:** durable L0 operating decisions. Read the latest entries after `Direction/facts-of-record.md` when starting root-layer work.

## 2026-06-16 — L0 startup uses module wrappers, not legacy handoff folders

**Decision:** L0 agents start from `AGENTS.md` / `CLAUDE.md`, then follow `Blueprints/agent-modules/files-to-read-first-L0.md`.

**Reason:** Older prompts and context snapshots may still mention root-level `roadmap.md` or `handoffs/...` files. The current system uses `Direction/facts-of-record.md`, this decision log, the resources index, and the skill routing matrix for L0 orientation.

**Impact:** If a future session sees conflicting startup instructions, prefer the module wrappers and Direction files. App-specific Corvus work routes to `slops-saloon/corvus/Direction/current_sprint.md`, `slops-saloon/corvus/Direction/agent_inbox.md`, and `slops-saloon/corvus/Blueprints/handoffs/`.

## 2026-06-21 — Adapt selected methods; do not install the researched repositories wholesale

**Decision:** SLOPS owns adapted workflows for personal learning, community-needs research, and vertical-slice TDD. Existing skill authoring, investigation, and code review procedures absorb the approved high-value methods. The restored `phuryn/pm-skills` strategy red-team remains reference-only. Do not install the full researched repositories, Ponytail hooks/plugin, `pm-ai-shipping`, OpenCut, or the cybersecurity skill pack in this acquisition wave.

**Reason:** The selected methods close verified procedure gaps while canonical SLOPS wrappers preserve routing, safety, and maintenance authority. Wholesale installs create overlapping doctrine, hook/runtime risk, or version/licensing uncertainty without a current product need.

**Impact:** Canonical skills remain in `Blueprints/skills/` and are distributed to both agent runtimes only after backup and hash verification. Future acquisition must show a new capability gap, license clarity, current standards, and lower overlap than adapting a bounded method.

## 2026-06-21 — Park future capabilities; make every current skill operational through Corvus procedures

**Decision:** Park `slops-learning-loop` until Corvus is live, Release Done is satisfied, and seven stable days of product evidence exist. Its first use will teach why Corvus uses its current technology and identify evidence-backed improvements before the season ends. Park `slops-community-needs-research` until Justin explicitly opens a future community-product discovery phase. Every other active SLOPS skill must have a documented Corvus playbook/runbook trigger, owner, and evidence artifact; irrelevant skills are conditional, not forced into every task.

**Reason:** Corvus is the baseline product for the company. Skills only create value when operating procedures invoke them and preserve evidence. The learning/community work would distract from getting Corvus live if activated now.

**Impact:** Parked canonical packages remain versioned but leave both runtime skill directories after backup. Corvus gains a core lifecycle playbook, conditional skill runbook, complete usage matrix, and usage ledger. Kickoff and done gates must record which skills were used or why a conditional skill was not applicable.
