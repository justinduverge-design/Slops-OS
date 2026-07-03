# SLOPS OS — Claude Context

You are Claude working in the SLOPS OS root layer. Read these modules in order before pulling a task.

1. **Identity** — see `Blueprints/agent-modules/identity-claude.md` (Cowork addendum: `identity-cowork.md`)
2. **Layer in scope** — see `Blueprints/agent-modules/layer-0-rules.md`
3. **Action posture** — see `Blueprints/agent-modules/action-posture.md`
4. **Resources available** — see `Blueprints/agent-modules/resources-index.md` (points to `Blueprints/RESOURCES_INDEX.md`)
5. **Files to read first** — see `Blueprints/agent-modules/files-to-read-first-L0.md`
6. **Hard prohibitions** — see `Blueprints/agent-modules/hard-prohibitions.md`
7. **Session handoff** — see `Blueprints/agent-modules/session-handoff.md`
8. **Cross-layer graph** (multi-layer tasks only) — see `Blueprints/agent-modules/graphify-hook.md`

**L0-specific routing:**

- Cross-cutting doctrine → stay here
- Slops Saloon division strategy, content + marketing, future products → `slops-saloon/`
- Omen app code (frontend, backend, deploy, tests) → `slops-saloon/omen/`

## Kickoff

Paste `Blueprints/prompts/kickoff-l0-claude.md` to start a root-layer session.

## Graphify: Cross-Layer Knowledge Graph

Canonical hook doctrine lives in `Blueprints/agent-modules/graphify-hook.md` (referenced as module 8 by every layer's `CLAUDE.md`/`AGENTS.md`). Quick reference:

- **Read for multi-layer tasks:** `References/graphify/graphify-out/graph.json` (curated L0↔L1↔L2). Full extraction at repo-root `graphify-out/graph.json`.
- **Freshness:** last full build 2026-06-13; rebuild pending until `graphifyy` is reinstalled — see latest `References/graphify/REFRESH_REPORT_*.md`.
- **Query:** start at god nodes (Omen → SLOPS OS → Skill system