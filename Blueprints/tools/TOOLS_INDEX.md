# Tool Permissions Index

This file **mirrors** the capability/gate mapping for quick lookup.

**It is NOT a competing authority.** Canonical action and approval doctrine lives in
`tool-permissions.md` (Action Risk Tiers). Runtime policy and Active Trust Assignments
live in `Blueprints\agents\AGENT_INDEX.md`. Where this file and either of those
disagree, they win and this file is wrong — fix it here, do not act on it.

Tiers classify **actions**, not runtimes. The approval column names the **minimum trust
tier** a runtime must hold by active assignment, never a vendor or model name.

## Action Risk Tier Legend

| Tier | Name | Definition | Default Approval |
|---|---|---|---|
| **1** | `read-only` | Reading files, browsing, inspection. No mutations. | `read-only` and above (permitted by default) |
| **2** | `write-safe` | File writes in isolated, non-production context. Reversible changes. | `read-only` and above (permitted; review recommended) |
| **3** | `write-guarded` | File edits in shared/tracked context. Git ops, doc updates, config changes. | `guarded-writer` and above (requires explicit per-task approval) |
| **4** | `execution` | Terminal commands, script runs, tests, builds. Non-destructive automation. | `full-executor` only, under an active assignment (requires task plan approval) |
| **5** | `destructive` | Delete, drop, migrate, secrets, deploy, auth/payment changes, infrastructure. | `full-executor` **plus action-level founder approval** (security/risk/production impact) |

## Tool Categories and Default Tiers

| Category | Tier | Note |
|---|---|---|
| **File read** (Read, file inspection, ls, find) | 1 | Safe default at `read-only` and above |
| **File write** (Write new files in outputs/) | 2 | Safe default for isolated work at `read-only` and above |
| **File edit** (Edit existing files in shared context) | 3 | Requires per-task approval; reversible if tracked in git |
| **Bash/shell execution** | 4 | `full-executor` only, under an active assignment; non-destructive commands approved per task |
| **Git operations** (status, log, diff, branch) | 2–3 | Read is `write-safe`; commit/push is `write-guarded` |
| **Git commit/push** | 3 | `full-executor` only, under an active assignment; **feature branches only**. No standing commit or push authority for any runtime. **Main-branch merge is founder-only** |
| **Database** (read queries) | 2 | `full-executor` only, under an active assignment; read access to schemas and data |
| **Database** (migrations, inserts, updates, drops) | 5 | Destructive; schema changes, data modifications; founder approval required |
| **Deploy / Docker / infrastructure** | 5 | Destructive; production risk; founder approval required |
| **Environment variables / .env / secrets / API keys** | 5 | Destructive; exposure risk; never activate for imported agents |
| **Paid media accounts / analytics mutation** | 5 | Destructive; financial/data risk; explicit per-agent RBAC required |
| **Browser / web fetch** | 1 | Read-only by default; safe for all agents |
| **Web authentication (OAuth, SSO, passwordless)** | 3 | Write-guarded; requires explicit approval per integration |
| **LLM API calls** (inference, embeddings) | 2–3 | Write-safe to free tier; write-guarded to paid APIs |
| **Email / messaging send** | 5 | Destructive (outbound); founder approval required |
| **Credential entry / form submission of sensitive data** | 5 | Destructive; financial/auth/PII risk; never activate without explicit approval |

## Per-Agent Tool Grants

See **`Blueprints\agents\AGENT_INDEX.md`** for the tool grants assigned to each agent by role.

All agents default to `read-only` unless explicitly indexed and granted higher tier.

**Imported agents:** none exist. The `Blueprints\agents\_imported\` tree was deleted 2026-08-05. Tool authority comes only from `active` status in `AGENT_INDEX.md`; a promoted wrapper at `candidate` status still carries no tool authority.

## Per-Skill Tool Grants

See **`Blueprints\skills\SKILL_ROUTING.md`** for the tool usage patterns of each skill.

Skills may use agents as part of their workflow. When a skill invokes an agent, the agent's own tool permissions apply (not the skill's).

## Who Approves Tool Grants

**At 0-OS level (SLOPS root):**
- The founder is the sole approver for new tool grants and the sole issuer of Active
  Trust Assignments.
- Any runtime may recommend; recommending is not granting.
- Status changes, tier promotions, and destructive-tier grants require founder approval.
- Capability alone grants no authority. Eligibility in Runtime Policy is not authority.

**At 1-slops-saloon and 2-Omen levels:**
- Follow 0-OS policy unless explicitly overridden by slops-saloon/omen context files.
- Project-specific agents may be granted tools per their `AGENT.md` or equivalent.
- Check `slops-saloon\Blueprints\agents\AGENT_INDEX.md` (if it exists) for subsidiary-level grants.

## Activation Rule

A runtime or skill may not use a tool at a tier it is not explicitly assigned.

Authorization requires **all four**: the session actually has the capability; the runtime
has an active assignment for the specific task; the Action Risk Tier gate is satisfied;
and every founder, security, provider, and action-level approval is satisfied.

If you are unsure, check Runtime Policy and Active Trust Assignments in `AGENT_INDEX.md`
first. An empty `assignments: []` list means defaults only — no authority above each
runtime's `default_tier`.

Unknown or undeclared capability is treated as **ABSENT**. Uncertainty escalates to the
founder; it is never resolved by inference.

## See Also

- **Full tool permission policy:** `tool-permissions.md`
- **Agent authority matrix:** `Blueprints\agents\AGENT_INDEX.md`
- **Skill routing matrix:** `Blueprints\skills\SKILL_ROUTING.md`
- **Runtime identity modules:** `Blueprints\agent-modules\identity-claude-code.md`, `identity-codex.md`, `identity-cowork.md`, `identity-api.md`, `identity-generic.md`
