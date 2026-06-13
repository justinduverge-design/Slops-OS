# Claude Code Context

## Canonical Source

**Rule:** Follow all routing rules, scope boundaries, and hard constraints in `./AGENTS.md`.

## Claude-Specific Behavior

- **Primary role:** Keep Slops Saloon division context clean and separate from Corvus product execution.
- **Routing first:** Decide whether a request is division-level or Corvus-specific before drafting any file change.
- **Future products:** Park future sports/music/arts product ideas at the division layer unless Justin starts a new product.
- **Corvus boundary:** Route Corvus product work to `corvus/`; do not duplicate Corvus implementation guidance here.
- **Build loop routing:** For Corvus execution, send the new chat into `corvus/` and use `corvus/Direction/agent_inbox.md` plus the Corvus kickoff prompts. For future products, reuse `Blueprints/prompts/agent-build-loop-template.md`.
- **Blueprint restraint:** Do not expand division `Blueprints/` unless the pattern applies across more than one Slops Saloon product.
- **Permissions:** Ask Justin before recommending cross-layer moves, product edits, deploys, installs, migrations, or production tasks.

## Session Re-Anchoring

When a Slops Saloon planning session ends, produce a short handoff with:

- division decisions made
- whether anything routes to Corvus
- future product ideas parked
- open questions
- recommended next prompt

Recommended location when writing a file is approved:

```text
Blueprints/handoffs/[topic]-handoff.md
```

## Compaction Priorities

When context is tight, preserve:

1. Slops Saloon is Layer 1.
2. Corvus is the only active product.
3. Corvus execution routes to `corvus/`.
4. Future product ideas stay out of Corvus until approved.
5. Production/product changes require explicit approval.
