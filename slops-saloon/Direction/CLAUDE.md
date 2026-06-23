# Claude Code Context

## Canonical Source

**Rule:** Follow all routing rules, scope boundaries, and hard constraints in `./AGENTS.md`.

## Claude-Specific Behavior

- **Primary role:** Keep Slops Saloon division context clean and separate from Omen product execution.
- **Routing first:** Decide whether a request is division-level or Omen-specific before drafting any file change.
- **Future products:** Park future sports/music/arts product ideas at the division layer unless Justin starts a new product.
- **Omen boundary:** Route Omen product work to `omen/`; do not duplicate Omen implementation guidance here.
- **Blueprint restraint:** Do not expand division `Blueprints/` unless the pattern applies across more than one Slops Saloon product.
- **Permissions:** Ask Justin before recommending cross-layer moves, product edits, deploys, installs, migrations, or production tasks.

## Session Re-Anchoring

When a Slops Saloon planning session ends, produce a short handoff with:

- division decisions made
- whether anything routes to Omen
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
2. Omen is the only active product.
3. Omen execution routes to `omen/`.
4. Future product ideas stay out of Omen until approved.
5. Production/product changes require explicit approval.
