# Tool Permissions Index

This is the canonical tool permission lookup for SLOPS OS.

It defines risk tiers, default approval requirements, and links downstream to detailed policy.

## Risk Tier Legend

| Tier | Name | Definition | Default Approval |
|---|---|---|---|
| **1** | `read-only` | Reading files, browsing, inspection. No mutations. | Claude/Codex (permitted by default) |
| **2** | `write-safe` | File writes in isolated, non-production context. Reversible changes. | Claude/Codex (permitted; review recommended) |
| **3** | `write-guarded` | File edits in shared/tracked context. Git ops, doc updates, config changes. | Claude/Codex (requires explicit per-task approval) |
| **4** | `execution` | Terminal commands, script runs, tests, builds. Non-destructive automation. | Codex only (requires task plan approval) |
| **5** | `destructive` | Delete, drop, migrate, secrets, deploy, auth/payment changes, infrastructure. | Justin approval required (security/risk/production impact) |

## Tool Categories and Default Tiers

| Category | Tier | Note |
|---|---|---|
| **File read** (Read, file inspection, ls, find) | 1 | Safe default for all agents |
| **File write** (Write new files in outputs/) | 2 | Safe default for Claude/Codex isolated work |
| **File edit** (Edit existing files in shared context) | 3 | Requires per-task approval; reversible if tracked in git |
| **Bash/shell execution** | 4 | Codex only; non-destructive commands approved per task |
| **Git operations** (status, log, diff, branch) | 2–3 | Read is `write-safe`; commit/push is `write-guarded` |
| **Git commit/push** | 3 | Requires explicit approval; tracked and reversible |
| **Database** (read queries) | 2 | Codex only; read access to schemas and data |
| **Database** (migrations, inserts, updates, drops) | 5 | Destructive; schema changes, data modifications; Justin approval required |
| **Deploy / Docker / infrastructure** | 5 | Destructive; production risk; Justin approval required |
| **Environment variables / .env / secrets / API keys** | 5 | Destructive; exposure risk; never activate for imported agents |
| **Paid media accounts / analytics mutation** | 5 | Destructive; financial/data risk; explicit per-agent RBAC required |
| **Browser / web fetch** | 1 | Read-only by default; safe for all agents |
| **Web authentication (OAuth, SSO, passwordless)** | 3 | Write-guarded; requires explicit approval per integration |
| **LLM API calls** (inference, embeddings) | 2–3 | Write-safe to free tier; write-guarded to paid APIs |
| **Email / messaging send** | 5 | Destructive (outbound); Justin approval required |
| **Credential entry / form submission of sensitive data** | 5 | Destructive; financial/auth/PII risk; never activate without explicit approval |

## Per-Agent Tool Grants

See **`Blueprints\agents\AGENT_INDEX.md`** for the tool grants assigned to each agent by role.

All agents default to `read-only` unless explicitly indexed and granted higher tier.

**Imported agents** (in `Blueprints\agents\_imported\`) have **NO tool authority** by default until promoted to `active` status in `AGENT_INDEX.md`.

## Per-Skill Tool Grants

See **`Blueprints\skills\SKILL_ROUTING.md`** for the tool usage patterns of each skill.

Skills may use agents as part of their workflow. When a skill invokes an agent, the agent's own tool permissions apply (not the skill's).

## Who Approves Tool Grants

**At 0-OS level (SLOPS root):**
- Justin is the sole approver for new agent tool grants.
- Claude and Codex may recommend.
- Agent status changes, tier promotions, and destructive-tier grants require Justin approval.

**At 1-ssffmvp and 2-Corvus levels:**
- Follow 0-OS policy unless explicitly overridden by ssffmvp/Corvus context files.
- Project-specific agents may be granted tools per their `AGENT.md` or equivalent.
- Check `ssffmvp\Blueprints\agents\AGENT_INDEX.md` (if it exists) for subsidiary-level grants.

## Activation Rule

An agent or skill may not use a tool at a tier it is not explicitly granted.

If you are unsure whether an agent has a tool grant, check `AGENT_INDEX.md` first.

If the agent is not listed as `active` or a higher status, assume no tools beyond `read-only`.

## See Also

- **Full tool permission policy:** `tool-permissions.md`
- **Agent authority matrix:** `Blueprints\agents\AGENT_INDEX.md`
- **Skill routing matrix:** `Blueprints\skills\SKILL_ROUTING.md`
- **Agent manifest with responsibilities:** `Blueprints\agents\agents.md`
