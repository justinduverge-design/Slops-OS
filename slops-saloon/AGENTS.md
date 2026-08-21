# Slops Saloon — Shared Agent Context

This is the L1 repository bootstrap for Codex and any runtime that supports `AGENTS.md`. Claude Code loads `CLAUDE.md`, which imports this file. Runtime-specific authority comes from Runtime Policy and the matching identity module.

Read these modules in order before pulling a task:

1. **Identity** — use Runtime Policy in `../Blueprints/agents/AGENT_INDEX.md` §8 and the matching module under `../Blueprints/agent-modules/`.
2. **Layer in scope** — `../Blueprints/agent-modules/layer-1-rules.md`
3. **Action posture** — `../Blueprints/agent-modules/action-posture.md`
4. **Resources available** — `../Blueprints/agent-modules/resources-index.md`
5. **Files to read first** — `../Blueprints/agent-modules/files-to-read-first-L1.md`
6. **Hard prohibitions** — `../Blueprints/agent-modules/hard-prohibitions.md`
7. **Session handoff** — `../Blueprints/agent-modules/session-handoff.md`
8. **Cross-layer graph** (multi-layer tasks only) — `../Blueprints/agent-modules/graphify-hook.md`

## L1 routing

- Division strategy, brand custody, content, and marketing → stay here.
- Omen product, backend, frontend, native mobile, tests, and deployment → descend into `omen/`.
- Reusable cross-layer doctrine → ascend to L0 (`../`).

## Kickoff

Run `Blueprints/prompts/kickoff.md` to start an L1 session.
