# Tools — RBAC and Permission Policy

This folder holds cross-cutting tool permission policy for the SLOPS OS.

**This is not a skill folder. This is not an agent folder.**

This is the authorization layer that governs what tools agents and skills may use.

## What Lives Here

- **`TOOLS_INDEX.md`** — canonical tool permission lookup; tier legend and summary table
- **`tool-permissions.md`** — full tool permission policy (migrated from `skills\tools.md`)

## How It Works

Neither skills nor agents have tool authority without an explicit entry in this layer.

Every agent reads `AGENT_INDEX.md` to understand their own status and permissions.

Every skill reads `SKILL_ROUTING.md` to understand where it fits.

Both reference this folder to understand what tools are available at their tier.

## Related Files

- **Agent authority matrix:** `Blueprints\agents\AGENT_INDEX.md`
- **Skill routing matrix:** `Blueprints\skills\SKILL_ROUTING.md`
- **Agent manifest:** `Blueprints\agents\agents.md`

## Key Principle

Tool authority is granted explicitly, not by default.

Imported agents and imported skills have no tool authority until they are:
1. Reviewed through `slops-agent-author` or `slops-skill-author`
2. Indexed as `active` (or equivalent status) in `AGENT_INDEX.md` or `SKILL_ROUTING.md`
3. Assigned explicit tool grants in this layer

Justin is the sole approver for tool grants at the 0-OS level.
