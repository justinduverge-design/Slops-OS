# SLOPS Agents

This folder contains the canonical authority model for all SLOPS OS agents.

**Canonical path:** `C:\Users\JDuve\dev\SLOPS\Blueprints\agents`

## Lookup Rule (Critical)

**Always check `AGENT_INDEX.md` first.**

If a role is not listed as `active` in `AGENT_INDEX.md`, it is not callable and has no tool authority.

## File Index

| File | Purpose |
|---|---|
| **`AGENT_INDEX.md`** | Canonical agent authority matrix — read this first |
| **`agents.md`** | Agent manifest defining Claude, Codex, and Justin roles |
| **`_imported\`** | Imported agent library — reference-only by default; see AGENT_INDEX.md for promotion status |

## Imported Agents Warning

All files under `_imported\` are `reference-only` by default.

**No imported agent is callable until promoted to `active` or `candidate` status in `AGENT_INDEX.md`.**

Promotion happens through `slops-agent-author` review.

## Tool Authorization

See `Blueprints\tools\` for the full tool permission policy and tier definitions.

Every agent has a tier cap:
- Claude: Tier 3 (write-guarded)
- Codex: Tier 5 (all; requires approval for destructive)
- Imported agents: Tier 1 (read-only) until promoted

## Quick Start

1. Open `AGENT_INDEX.md`.
2. Find your agent's row.
3. Check the `Status` column.
4. If `active`, your tier cap is listed.
5. Check `Blueprints\tools\tool-permissions.md` for what your tier permits.
6. If `reference-only` or `do-not-activate`, contact Claude or Justin.

## Related Files

- **Tool permissions:** `Blueprints\tools\tool-permissions.md`
- **Tool index:** `Blueprints\tools\TOOLS_INDEX.md`
- **Skill routing:** `Blueprints\skills\SKILL_ROUTING.md`
- **Agent manifest:** `agents.md`
