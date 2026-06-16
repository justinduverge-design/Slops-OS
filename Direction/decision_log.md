# Decision Log — SLOPS OS (L0)

**Purpose:** durable L0 operating decisions. Read the latest entries after `Direction/facts-of-record.md` when starting root-layer work.

## 2026-06-16 — L0 startup uses module wrappers, not legacy handoff folders

**Decision:** L0 agents start from `AGENTS.md` / `CLAUDE.md`, then follow `Blueprints/agent-modules/files-to-read-first-L0.md`.

**Reason:** Older prompts and context snapshots may still mention root-level `roadmap.md` or `handoffs/...` files. The current system uses `Direction/facts-of-record.md`, this decision log, the resources index, and the skill routing matrix for L0 orientation.

**Impact:** If a future session sees conflicting startup instructions, prefer the module wrappers and Direction files. App-specific Corvus work routes to `slops-saloon/corvus/Direction/current_sprint.md`, `slops-saloon/corvus/Direction/agent_inbox.md`, and `slops-saloon/corvus/Blueprints/handoffs/`.
