# Facts of Record — SLOPS OS (L0)

**valid-as-of:** 2026-06-16
**Purpose:** facts that override anything older on disk. If a doc anywhere in this tree contradicts a line here, this file wins until updated.

## Active facts

1. **Three-layer DBS** — L0 (SLOPS root) / L1 (slops-saloon/) / L2 (slops-saloon/omen/). Layer routing rules live in each layer's `CLAUDE.md` + `AGENTS.md` wrappers, which import shared modules from `Blueprints/agent-modules/`.
2. **Omen is free indefinitely** (decided 2026-06-15). No Y2 monetization plan. No paid tier. See `slops-saloon/omen/Blueprints/definition-of-done.md` posture line.
3. **Agent lane policy** — both Claude and Codex can pull any item. Soft lean only (Claude leans frontend/docs/spec, Codex leans backend/code-volume/tests). Escape hatch surfaces only when item is both far outside lean and high-risk.
4. **"Replaces" semantics in `Blueprints/skills/SKILL_ROUTING.md`** — read the legend above the table before treating any skill as retired. Most "Replaces" entries are real retirements (gstack predecessors quarantined 2026-06-08, SaaS sovereignty-banned). `ui-ux-pro-max` is the exception — it's still active in the design-intelligence role.
5. **Imported agents** in `Blueprints/agents/_imported/` are non-authoritative until reviewed, wrapped, and indexed.
6. **L0 startup route** — agents start from `AGENTS.md` / `CLAUDE.md`, then `Blueprints/agent-modules/files-to-read-first-L0.md`. Root-level `context.md` is a legacy orientation snapshot, not the active queue.
7. **Omen work queue** — the app's live build queue is `slops-saloon/omen/Direction/current_sprint.md`; `slops-saloon/omen/Direction/agent_inbox.md` is the override slot. App handoffs live under `slops-saloon/omen/Blueprints/handoffs/`.
