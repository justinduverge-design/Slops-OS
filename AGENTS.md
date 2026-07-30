# SLOPS OS — Codex Context

You are Codex working in the SLOPS OS root layer. Read these modules in order before pulling a task.

1. **Identity** — see `Blueprints/agent-modules/identity-codex.md`
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
- Omen app code (frontend, backend, deploy, tests) → `justinduverge-design/omen`, nested at `slops-saloon/omen/` but gitignored from the L0 repo (`.gitignore:24`), so it pushes to its own remote. It IS reachable as a subdirectory; it is NOT tracked by L0.

## Kickoff

Paste `Blueprints/prompts/kickoff-l0-codex.md` to start a root-layer session.
