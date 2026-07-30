# Tool Permissions Policy

This is the canonical tool usage and authorization policy for the SLOPS OS.

**Migrated and normalized:** 2026-05-23 (Phase 2–4 DBS normalization).
The canonical location is `Blueprints\tools\tool-permissions.md`.

## Principle: Explicit Authorization

No runtime or skill has tool authority by default.

**This file is the canonical action and approval doctrine.** It defines the Action Risk Tiers and what each action requires. It does **not** decide who is currently allowed to act — that is Runtime Policy plus Active Trust Assignments.

There is **one** permission system, not two:

| Surface | Role |
|---|---|
| `Blueprints\tools\tool-permissions.md` (this file) | Canonical **action and approval doctrine** — Action Risk Tiers. |
| `Blueprints\agents\AGENT_INDEX.md` | **Runtime policy** and **Active Trust Assignments**. |
| `Blueprints\tools\TOOLS_INDEX.md` | **Mirrors** the capability/gate mapping. **Not** a competing authority. |
| `Blueprints\skills\SKILL_ROUTING.md` | Skill registry and skill tool usage. |

### Authorization requires all four

An action is authorized only when **every one** of these holds. Any one missing means it is not authorized:

1. The session actually has the capability.
2. The runtime has an active assignment for the specific task.
3. The applicable Action Risk Tier gate is satisfied.
4. Every founder, security, provider, and action-level approval is satisfied.

**Capability alone grants no authority.** Neither does a vendor name, a model name, or an identity module.

## Action Risk Tiers

Actions are organized by risk tier. Higher tiers require higher-level approval.

These tiers classify **actions**, not runtimes. No vendor or model name appears in this table, and no runtime name would grant anything if it did. The right-hand column is the **minimum trust tier** a runtime must hold *by active assignment* before the tier's gate is even evaluated.

| Tier | Risk Level | Minimum assigned trust tier | Approval Required |
|---|---|---|---|
| **1 (read-only)** | Low | `read-only` | No |
| **2 (write-safe)** | Low-medium | `read-only` | Review recommended |
| **3 (write-guarded)** | Medium | `guarded-writer` | Per-task approval |
| **4 (execution)** | Medium-high | `full-executor` | Task plan approval |
| **5 (destructive)** | High | `full-executor` | **Action-level** founder approval; general task approval is not sufficient |

**Main-branch merge is founder-only at every tier and is never delegated by assignment.**

Where the tables below name a runtime, read it as the trust tier that runtime is *eligible* for — eligibility is not authority.

## Category-by-Category Policy

### File Operations

| Operation | Tier | Policy |
|---|---|---|
| **Read** (any file) | 1 | Permitted at `read-only` and above by default |
| **List** (directories, find, ls) | 1 | Permitted by default |
| **Write** (new files in outputs/) | 2 | Safe default; isolated context |
| **Edit** (files in shared folders like Blueprints/) | 3 | Requires explicit per-task approval; changes are tracked in git |
| **Delete** (any file) | 5 | Destructive; founder approval required |
| **Move / rename** | 3–5 | Depends on scope; cross-layer moves are tier 5 |

### Bash / Shell Execution

| Operation | Tier | Policy |
|---|---|---|
| **Read commands** (ls, find, grep, cat) | 1 | Permitted by default |
| **Non-destructive execution** (npm, docker, tests, builds) | 4 | `full-executor` only, under an active assignment; task plan required |
| **Destructive commands** (rm, drop, migrate, deploy) | 5 | `full-executor` only; **action-level** founder approval required |

### Git Operations

| Operation | Tier | Policy |
|---|---|---|
| **Status, log, diff** (read) | 2 | Permitted at `read-only` and above |
| **Branch, checkout** (non-destructive) | 2 | `full-executor` only, under an active assignment. `guarded-writer` requires an explicit task-level assignment condition |
| **Commit** (record changes) | 3 | `full-executor` only, under an active assignment; task plan required. No standing commit authority for any runtime |
| **Push** (send to remote) | 3 | `full-executor` only, **feature branches only**, under an active assignment. **Main-branch merge is founder-only and is never delegated** |
| **Force push, rebase, reset --hard** | 5 | Destructive; **action-level** founder approval required |

### Database Operations

| Operation | Tier | Policy |
|---|---|---|
| **Read** (SELECT, schema inspection) | 2 | `full-executor` only, under an active assignment; secure credentials required |
| **Migration** (CREATE TABLE, ALTER) | 5 | Destructive; schema changes require founder approval |
| **Insert / update** (data changes) | 5 | Destructive if production; founder approval required |
| **Drop** (DELETE, DROP TABLE) | 5 | Destructive; founder approval required |

### Secrets and Credentials

| Operation | Tier | Policy |
|---|---|---|
| **Read .env** | 5 | Never permitted for candidate wrappers or imported agents; `full-executor` only, for project context, with **action-level** founder approval |
| **Write .env** | 5 | Destructive; founder approval required; secrets handling review required |
| **Enter credentials in forms** | 5 | Never permitted; user must enter sensitive data themselves |
| **API key / auth token access** | 5 | Destructive; exposure risk; founder approval + security review required |

### Paid Services and External APIs

| Operation | Tier | Policy |
|---|---|---|
| **Read** (query, inspect, list) | 2 | Permitted with valid credentials |
| **Write** (create, update, delete, mutate) | 5 | Destructive; may incur charges; founder approval required |
| **Billing / subscription changes** | 5 | Destructive; financial impact; founder approval required |
| **Email / SMS send** | 5 | Destructive (outbound); founder approval required |
| **Ad spend / campaign activation** | 5 | Destructive (financial); founder approval + review recommended |

### Infrastructure, Docker, Deployment

| Operation | Tier | Policy |
|---|---|---|
| **Inspect** (config, logs, status) | 2 | Permitted at `read-only` and above |
| **Start service** (local dev) | 3 | `full-executor` only, under an active assignment |
| **Deploy to production** | 5 | Destructive; founder approval + pre-deploy checklist required |
| **Change SSL, DNS, firewall** | 5 | Destructive; infrastructure risk; founder approval required |
| **Rotate secrets, rotate keys** | 5 | Destructive; security impact; founder approval required |

### Browser and Web Access

| Operation | Tier | Policy |
|---|---|---|
| **Fetch, read URL** | 1 | Permitted at `read-only` and above |
| **Click links** | 2 | Permitted at `read-only` and above with caution; verify URL source first |
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
| **Fine-tuning, model training** | 5 | Destructive (cost, data); founder approval required |
| **Model selection change** | 5 | Product decision; founder approval required |

## Per-Agent Tool Grants

See `AGENT_INDEX.md` for the specific tools assigned to each agent.

Default tier caps are keyed to **trust tier**, not to a vendor or model name:

- **Founder**: the founder is the sole authority to approve restricted actions and merge
  work. Founder approval does not remove hard safety, legal, provider, evidence, or
  irreversible-operation constraints.
- **`full-executor`**: all tiers per an approved task plan. Per-task only, never standing.
  Destructive operations still require action-level founder approval.
- **`guarded-writer`**: Tier 3 max. Read, tracked-context write with per-task approval,
  plan, review.
- **`bounded-contributor`**: an assignment profile, not a runtime. One founder-selected
  item. May read, investigate, test, and propose a PR. May not self-pull, merge, deploy,
  access secrets, or expand scope.
- **`read-only`**: Tier 1 only until reviewed and assigned. The default for every runtime.
- **Candidate wrappers and imported agents**: Tier 1 only (read) until reviewed and
  promoted through `AGENT_INDEX.md`.

Which runtimes are *eligible* for which tier is recorded in Runtime Policy
(`AGENT_INDEX.md` §8). Which runtime currently *holds* a tier is recorded in Active
Trust Assignments (`AGENT_INDEX.md` §9). Eligibility is not authority.

## Escalation: When to Ask the Founder

Tool tiers 4 and 5 always escalate to the founder. Each of the following needs its own
**action-level** approval — general task approval is not sufficient:

- Before destructive commands (delete, drop, force-push)
- Before production or deployment changes
- Before auth, payment, secrets, or cookie changes
- Before adding paid dependencies
- Before user-data changes or privacy implications
- Before infrastructure changes (SSL, DNS, firewall, secrets rotation)
- Before accepting terms or agreements

The planner reviews and provides a risk assessment. The executor waits for founder approval before proceeding, and re-asks per action rather than once per task.

## See Also

- **Index and tier legend:** `TOOLS_INDEX.md`
- **Agent authority matrix:** `AGENT_INDEX.md`
- **Skill routing matrix:** `SKILL_ROUTING.md`
- **Runtime policy and active assignments:** `Blueprints\agents\AGENT_INDEX.md`
- **Runtime identity modules:** `Blueprints\agent-modules\identity-claude-code.md`, `identity-codex.md`, `identity-cowork.md`, `identity-api.md`, `identity-generic.md`
