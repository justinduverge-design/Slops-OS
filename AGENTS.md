# SLOPS OS — Shared Agent Context

This is the repository bootstrap for Codex and any runtime that supports `AGENTS.md`. Claude Code loads `CLAUDE.md`, which imports this file. Runtime-specific authority still comes from Runtime Policy and the matching identity module; never infer authority from the filename or vendor.

Read these modules in order before pulling a task:

1. **Identity** — read the identity module for the runtime you actually are, as recorded in Runtime Policy (`Blueprints/agents/AGENT_INDEX.md` §8): `Blueprints/agent-modules/identity-claude-code.md`, `identity-codex.md`, `identity-cowork.md`, `identity-api.md`, or `identity-generic.md`.
2. **Layer in scope** — `Blueprints/agent-modules/layer-0-rules.md`
3. **Action posture** — `Blueprints/agent-modules/action-posture.md`
4. **Resources available** — `Blueprints/agent-modules/resources-index.md` → `Blueprints/RESOURCES_INDEX.md`
5. **Files to read first** — `Blueprints/agent-modules/files-to-read-first-L0.md`
6. **Hard prohibitions** — `Blueprints/agent-modules/hard-prohibitions.md`
7. **Session handoff** — `Blueprints/agent-modules/session-handoff.md`
8. **Cross-layer graph** (multi-layer tasks only) — `Blueprints/agent-modules/graphify-hook.md`

## L0 routing

- Cross-cutting doctrine → stay here.
- Slops Saloon division strategy, content, marketing, and future products → `slops-saloon/`.
- Omen app code, tests, and deployment → `slops-saloon/omen/`, which is a separate repository and is not tracked by L0.

## Kickoff

Run `Blueprints/prompts/kickoff.md` to start an L0 session.
