# Agent Build Loop Template

Use this as the Slops Saloon division pattern when a product needs repeatable
Claude/Codex work routing.

## Purpose

One task should move through one active slot, one lane-specific kickoff, one
Definition of Done, and one handoff/memory path. Justin should approve gates,
not relay every step.

## Product Files To Create

Each active product should own its own copies of these files:

- `Direction/agent_inbox.md` - the single active task slot plus candidate queue.
- `Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md` - operator guide.
- `Blueprints/prompts/kickoff-l2.md` - the single L2 starter, layer- and
  capability-named. Supersedes the retired vendor-named backend/frontend pair.
- `Blueprints/definition-of-done.md` - shared completion checklist.
- `Blueprints/handoffs/frontend-to-backend.md` - frontend requests to backend.
- `Blueprints/handoffs/backend-to-frontend.md` - backend contracts to frontend.
- `Blueprints/handoffs/decisions.md` - shared engineering decisions.

## Product Entry Docs To Update

Add the loop files to the product read-first lists:

- `AGENTS.md`
- `AGENT.md`
- `CLAUDE.md`
- `context.md`
- `DBS_INDEX.md`

## Operating Flow

1. Load one task into `Direction/agent_inbox.md`.
2. Start Codex with the backend kickoff or Claude with the frontend kickoff.
3. The agent reports task understanding, expected files, avoided areas, and verification before editing.
4. The agent builds inside its ownership lane, satisfies the Definition of Done, writes the handoff, logs decisions, and stops at gated actions.

## Current Omen Reference

Omen is the current reference implementation:

```text
omen/Direction/agent_inbox.md
omen/Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md
omen/Blueprints/definition-of-done.md
```

Do not route Omen execution from the division layer. Start in `omen/`.
