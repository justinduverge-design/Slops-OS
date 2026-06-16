# SLOPS Resources Index

**valid-as-of:** 2026-06-15
**Purpose:** the single "what's in the toolbox" file. Every wrapper's section 4 (Capabilities Available) points here. Before claiming a capability doesn't exist, **read this file**.

## How to read

This index is the *aggregator*. Each section points to its authoritative source. When the authoritative source changes (new skill added, MCP connector registered), the aggregator's pointer stays valid — but the inventory shifts. If you're verifying current state, follow the pointer.

## Skills

**Authoritative:** `Blueprints/skills/SKILL_ROUTING.md` — 37 skills, **Status column first** (legend at top of file). Skill lifecycle: `Blueprints/skills/SLOPS_LIFECYCLE.md`. Skill template: `Blueprints/skills/_template/SKILL.md`.

**Index for browsing:** `Blueprints/skills/SKILL_INDEX.md` (short list of skill names).

**Authoring new skills:** invoke `slops-skill-author`. Distribution: canonical at `Blueprints/skills/<name>/SKILL.md`, mirror to `~/.claude/skills/<name>/` and `~/.codex/skills/<name>/`. Register in `SKILL_ROUTING.md` (with Status column entry) and `SLOPS_LIFECYCLE.md` in the same pass.

## Tools

**Authoritative:** `Blueprints/tools/TOOLS_INDEX.md` — what tools agents may use.
**Permissions:** `Blueprints/tools/tool-permissions.md` — RBAC, allow / deny tiers per agent.
**README:** `Blueprints/tools/README.md` — orientation.

## Agents

**Authoritative:** `Blueprints/agents/AGENT_INDEX.md` — wrapped, active agents.
**README:** `Blueprints/agents/README.md` — orientation, wrapper rules.
**Dormant pool:** `Blueprints/agents/_imported/` — external imports awaiting review. **Treat as non-authoritative until wrapped + indexed.**

Only Justin, Claude, and Codex are first-class agents. Other "agents" in the index are skill-shaped — see `feedback_agent_skill_boundary` memo.

## Prompts

**Authoritative:** `Blueprints/prompts/` — runnable task instructions.
**README:** `Blueprints/prompts/README.md`.
**Kickoff modules:** `Blueprints/prompts/kickoff-modules/` — 5 shared modules (pull-task, plan-approval, done-and-close, safety-gates, read-first) imported by both kickoff wrappers at L2.
**Templates:** `Blueprints/prompts/_templates/`.
**Pending:** `Blueprints/prompts/_pending/` — drafted but not yet routed.
**Archive:** `Blueprints/prompts/_old-prompts-for-analysis/` — historical, do not run.

## MCPs / Plugins / Connectors (runtime-discovered)

**Discovery mechanic:** call `ToolSearch` with a keyword. Example: `ToolSearch { query: "slack", max_results: 5 }` returns Slack-related tools across all connected MCP servers. Use `select:` for direct fetch.
**Runtime caveat:** exact ToolSearch syntax may vary by runtime; use the available tool schema in-session.

**Known plugin namespaces seen in active sessions:**

- `plugin:data:*` — BigQuery, Databricks, Definite, Hex, Snowflake
- `plugin:engineering:*` — Datadog, GitHub, Gmail, Google Calendar, PagerDuty
- `plugin:enterprise-search:*` — Gmail, Google Calendar, Guru
- `plugin:legal:*` — Atlassian, Box, DocuSign, Egnyte, Slack
- `plugin:marketing:*` — Ahrefs, Canva, Gmail, Google Calendar, HubSpot, Klaviyo, SimilarWeb, Supermetrics
- `plugin:operations:*` — Asana, Notion
- `plugin:product-management:*` — Amplitude, ClickUp, Figma, Fireflies, Intercom, Linear, Monday, Pendo, SimilarWeb
- `plugin:design:*` — Gmail, Google Calendar
- `plugin:prisma:*` — Prisma-Local, Prisma-Remote

**Adding new MCPs:** browse the connector registry via `mcp__mcp-registry__search_mcp_registry`. Suggest via `mcp__mcp-registry__suggest_connectors`. Justin installs.

**Reality check:** active connector list shifts across sessions. Treat this list as "what's been seen," not "what's connected right now." Run ToolSearch to verify live state.

## Computer use + workspace shell (always available in Cowork)

- `mcp__workspace__bash` — sandboxed Linux shell, allowlisted network
- `mcp__workspace__web_fetch` — page fetch with restrictions
- `mcp__computer-use__*` — mouse / keyboard / screenshot on Justin's machine (request_access first, tiered apps respect frontmost-app rules)
- `mcp__Claude_in_Chrome__*` — browser tools when computer-use isn't enough
- `mcp__cowork__*` — file presentation, artifacts, request directory access

## Scheduled tasks + persistent memory (Cowork only)

- `mcp__scheduled-tasks__*` — recurring agents
- Persistent memory at `memory/MEMORY.md` + named entries

## How to discover what's new since last session

1. Read `Direction/facts-of-record.md` first — overrides anything older.
2. Read `Direction/decision_log.md` last 5 entries.
3. Check `Blueprints/skills/SLOPS_LIFECYCLE.md` for recently added or retired skills.
4. Scan `Blueprints/skills/SKILL_ROUTING.md` Status column for new `active` rows or `paired-with:` entries.
5. Run `ToolSearch { query: "<task-keyword>", max_results: 10 }` to see what MCPs / plugins surface today.

## How to retire / add a resource

- **New skill:** `slops-skill-author` → register in `SKILL_ROUTING.md` (Status: `active`) → record in `SLOPS_LIFECYCLE.md` → distribute to `.claude/skills/` and `.codex/skills/`.
- **Retire a skill:** flip Status to `retired: YYYY-MM-DD`, note in `SLOPS_LIFECYCLE.md` keep/replace/drop record. Do NOT delete the SKILL.md file — quarantine instead.
- **New MCP/plugin/connector:** Justin installs from the registry. The next ToolSearch sees it.
- **Retire an MCP:** disconnect via the host app. The aggregator's "known namespaces" list stays as historical record.
