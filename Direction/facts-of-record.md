# Facts of Record — SLOPS OS (L0)

**valid-as-of:** 2026-06-16
**Purpose:** facts that override anything older on disk. If a doc anywhere in this tree contradicts a line here, this file wins until updated.

## Active facts

1. **Three-layer DBS** — L0 (SLOPS root) / L1 (slops-saloon/) / L2 (slops-saloon/omen/). Layer routing rules live in each layer's `CLAUDE.md` + `AGENTS.md` wrappers, which import shared modules from `Blueprints/agent-modules/`.
2. **Omen is free indefinitely** (decided 2026-06-15). No Y2 monetization plan. No paid tier. See `slops-saloon/omen/Blueprints/definition-of-done.md` posture line.
3. **Runtime lane policy** — lanes are a scheduling convenience, never an authority boundary. Any runtime may be assigned any item; there are no vendor-keyed lanes. What a runtime may *do* with an item comes from Runtime Policy plus an Active Trust Assignment (`Blueprints/agents/AGENT_INDEX.md` §§8–9), not from which runtime it is. Escape hatch surfaces only when an item is high-risk.
4. **"Replaces" semantics in `Blueprints/skills/SKILL_ROUTING.md`** — read the legend above the table before treating any skill as retired. Most "Replaces" entries are real retirements (gstack predecessors quarantined 2026-06-08, SaaS sovereignty-banned). `ui-ux-pro-max` is the exception — it's still active in the design-intelligence role.
5. **There is no imported-agent pool.** The `Blueprints/agents/_imported/` staging tree was deleted 2026-08-05 (91 files, recoverable from git). The only agent files are the promoted ones in `Blueprints/agents/<division>/`; their status is recorded in `Blueprints/agents/AGENT_INDEX.md` Section 5.
6. **L0 startup route** — agents start from `AGENTS.md` / `CLAUDE.md`, then `Blueprints/agent-modules/files-to-read-first-L0.md`. Root-level `context.md` is a legacy orientation snapshot, not the active queue.
7. **Omen work queue** — the app's live build queue is `slops-saloon/omen/Direction/current_sprint.md`; `slops-saloon/omen/Direction/agent_inbox.md` is the override slot. App handoffs live under `slops-saloon/omen/Blueprints/handoffs/`.
