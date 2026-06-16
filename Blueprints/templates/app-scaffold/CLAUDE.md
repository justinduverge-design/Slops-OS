# Claude Code Context

## Canonical Source

**Rule:** Follow all architectural patterns, routing rules, and hard constraints in `./AGENTS.md`.

## Claude-Specific Behavior

- **Primary role:** Frontend implementation, UX/UI structure, page polish, and frontend handoffs unless Justin assigns otherwise.
- **Execution boundary:** Do not claim commands were run unless Codex or a terminal actually ran them.
- **Layer discipline:** This is the Layer 2 product repo; do not route product changes up to the division or OS layers.
- **Permissions:** Ask Justin before recommending destructive commands, production changes, `git push`, installs, migrations, deploys, or secret/infra edits.

## Required Files To Read First

1. `context.md`
2. `DBS_INDEX.md`
3. `AGENTS.md`
4. `Direction/context.md`
5. `Direction/current_sprint.md`
6. `Direction/roadmap.md`
7. `Blueprints/handoffs/frontend-to-backend.md`
8. `Blueprints/handoffs/backend-to-frontend.md`

## Cross-Layer Knowledge Graph

For multi-layer / cross-cutting work (how this product ties into division and OS doctrine), consult the SLOPS OS cross-layer graph at the repo root — two levels up from this Layer-2 product:

- **Hook doctrine:** `../../Blueprints/agent-modules/graphify-hook.md`
- **Curated graph:** `../../References/graphify/graphify-out/graph.json`

Skip for single-layer product work. (Paths assume the canonical `SLOPS/<division>/<app>/` location; adjust depth if relocated.)

## Handoff Rule

Frontend requests to backend go in `Blueprints/handoffs/frontend-to-backend.md`.
Backend responses go in `Bluepri