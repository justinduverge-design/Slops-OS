# Tool Permissions Policy

This is the canonical tool usage and authorization policy for the SLOPS OS.

**Migrated and normalized:** 2026-05-23 (Phase 2–4 DBS normalization).
The canonical location is `Blueprints\tools\tool-permissions.md`.

## Principle: Explicit Authorization

No agent or skill has tool authority by default.

Every tool grant is explicit and is recorded in the relevant authority file:
- Agent grants → `AGENT_INDEX.md`
- Skill tool usage → `SKILL_ROUTING.md`
- Tier definitions → `TOOLS_INDEX.md`

## Tier-Based Authorization Model

Tools are organized by risk tier. Higher tiers require higher-level approval.

| Tier | Risk Level | Who Can Use | Approval Required |
|---|---|---|---|
| **1 (read-only)** | Low | Claude, Codex, Skills | No |
| **2 (write-safe)** | Low-medium | Claude, Codex, Skills | Review recommended |
| **3 (write-guarded)** | Medium | Claude, Codex (Codex restricted) | Per-task approval |
| **4 (execution)** | Medium-high | Codex only | Task plan approval |
| **5 (destructive)** | High | Codex only (Justin approval req’d) | Justin approval required |

## Category-by-Category Policy

### File Operations

| Operation | Tier | Policy |
|---|---|---|
| **Read** (any file) | 1 | Permitted for Claude, Codex, Skills by default |
| **List** (directories, find, ls) | 1 | Permitted by default |
| **Write** (new files in outputs/) | 2 | Safe default; isolated context |
| **Edit** (files in shared folders like Blueprints/) | 3 | Requires explicit per-task approval; changes are tracked in git |
| **Delete** (any file) | 5 | Destructive; Justin approval required |
| **Move / rename** | 3–5 | Depends on scope; cross-layer moves are tier 5 |

### Bash / Shell Execution

| Operation | Tier | Policy |
|---|---|---|
| **Read commands** (ls, find, grep, cat) | 1 | Permitted by default |
| **Non-destructive execution** (npm, docker, tests, builds) | 4 | Codex only; task plan required |
| **Destructive commands** (rm, drop, migrate, deploy) | 5 | Codex only; Justin approval required |

### Git Operations

| Operation | Tier | Policy |
|---|---|---|
| **Status, log, diff** (read) | 2 | Claude and Codex permitted |
| **Branch, checkout** (non-destructive) | 2 | Codex permitted |
| **Commit** (record changes) | 3 | Codex only; task plan required |
| **Push** (send to remote) | 3 | Codex only; Justin approval for main branch |
| **Force push, rebase, reset --hard** | 5 | Destructive; Justin approval required |

### Database Operations

| Operation | Tier | Policy |
|---|---|---|
| **Read** (SELECT, schema inspection) | 2 | Codex permitted; secure credentials required |
| **Migration** (CREATE TABLE, ALTER) | 5 | Destructive; schema changes require Justin approval |
| **Insert / update** (data changes) | 5 | Destructive if production; Justin approval required |
| **Drop** (DELETE, DROP TABLE) | 5 | Destructive; Justin approval required |

### Secrets and Credentials

| Operation | Tier | Policy |
|---|---|---|
| **Read .env** | 5 | Never permitted for imported agents; Codex/Claude only for project context |
| **Write .env** | 5 | Destructive; Justin approval required; secrets handling review required |
| **Enter credentials in forms** | 5 | Never permitted; user must enter sensitive data themselves |
| **API key / auth token access** | 5 | Destructive; exposure risk; Justin approval + security review required |

### Paid Services and External APIs

| Operation | Tier | Policy |
|---|---|---|
| **Read** (query, inspect, list) | 2 | Permitted with valid credentials |
| **Write** (create, update, delete, mutate) | 5 | Destructive; may incur charges; Justin approval required |
| **Billing / subscription changes** | 5 | Destructive; financial impact; Justin approval required |
| **Email / SMS send** | 5 | Destructive (outbound); Justin approval required |
| **Ad spend / campaign activation** | 5 | Destructive (financial); Justin approval + review recommended |

### Infrastructure, Docker, Deployment

| Operation | Tier | Policy |
|---|---|---|
| **Inspect** (config, logs, status) | 2 | Claude and Codex permitted |
| **Start service** (local dev) | 3 | Codex permitted |
| **Deploy to production** | 5 | Destructive; Justin approval + pre-deploy checklist required |
| **Change SSL, DNS, firewall** | 5 | Destructive; infrastructure risk; Justin approval required |
| **Rotate secrets, rotate keys** | 5 | Destructive; security impact; Justin approval required |

### Browser and Web Access

| Operation | Tier | Policy |
|---|---|---|
| **Fetch, read URL** | 1 | Claude and Codex permitted |
| **Click links** | 2 | Claude permitted with caution; verify URL source first |
| **Submit forms** | 3–5 | Depends on form contents; credential entry is tier 5 |
| **Accept cookies, auth, terms** | 3 | Requires explicit approval per integration |

### Authentication and Authorization

| Operation | Tier | Policy |
|---|---|---|
| **OAuth, SSO, passwordless login** | 3 | Write-guarded; requires explicit approval per integration |
| **Credential entry (username/password)** | 5 | User must enter; never permit automated entry |
| **Session token storage** | 5 | Destructive (privacy/security risk); review required |
| **Cookie handling** | 5 | ESPN cookies especially; security review required every time |

### LLM API Access

| Operation | Tier | Policy |
|---|---|---|
| **Inference** (free tier) | 2 | Permitted with budget awareness |
| **Inference** (paid tier) | 3–4 | Write-guarded; requires API key management |
| **Fine-tuning, model training** | 5 | Destructive (cost, data); Justin approval required |
| **Model selection change** | 5 | Product decision; Justin approval required |

## Per-Agent Tool Grants

See `AGENT_INDEX.md` for the specific tools assigned to each agent.

Default tier caps by agent role:
- **Justin (CEO)**: No restrictions
- **Claude (Architect)**: Tier 3 max (write-guarded); reads, writes to outputs/, plans, reviews
- **Codex (Engineer)**: Tier 5 (all tiers); executes per task plan; escalates destructive work
- **Imported agents**: Tier 1 only (read) until reviewed and promoted through AGENT_INDEX

## Escalation: When to Ask Justin

Tool tiers 4 and 5 always escalate to Justin:

- Before destructive commands (delete, drop, force-push)
- Before production or deployment changes
- Before auth, payment, secrets, or cookie changes
- Before adding paid dependencies
- Before user-data changes or privacy implications
- Before infrastructure changes (SSL, DNS, firewall, secrets rotation)
- Before accepting terms or agreements

Claude reviews and provides risk assessment. Codex waits for Justin approval.

## See Also

- **Index and tier legend:** `TOOLS_INDEX.md`
- **Agent authority matrix:** `AGENT_INDEX.md`
- **Skill routing matrix:** `SKILL_ROUTING.md`
- **Agent responsibilities:** `Blueprints\agents\agents.md`
