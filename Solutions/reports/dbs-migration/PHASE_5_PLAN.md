# Phase 5 — Imported Agent Promotion Pipeline: Strategy & Plan

**Date**: 2026-05-23
**Scope**: Review all imported agent divisions and promote selected agents to SLOPS doctrine-wrapped files
**Status**: 🟡 PLANNED — not yet executed
**Skill**: `slops-agent-author`

---

## Overview

The `Blueprints\agents\_imported\` folder contains 11 divisions and ~90 imported agent role files. All are currently `reference-only`. Phase 5 runs each division through `slops-agent-author` to:

1. Select which agents in each division are most relevant to current SLOPS/Omen launch needs
2. Create SLOPS doctrine wrapper files for selected agents
3. Update `AGENT_INDEX.md` with new status rows
4. Leave unselected agents as `reference-only` until needed

This is **not** a mass activation. It is a selective, controlled promotion pass — one division at a time, with Justin approval before advancing to the next.

---

## Architectural Decision: Wrapper Pattern

Imported agent files are preserved in `_imported/` exactly as they came in. They are the **source material**.

Promoted agents get a **new SLOPS doctrine wrapper file** at:

```text
Blueprints\agents\<division-short-name>\<agent-name>.md
```

Examples:
```text
Blueprints\agents\product\product-manager.md
Blueprints\agents\engineering\engineering-code-reviewer.md
Blueprints\agents\design\design-ux-researcher.md
```

The wrapper file:
- Uses the `slops-agent-author` Required Agent File Shape
- States status, division, DBS layer, allowed work, denied work, tool tier cap, escalation
- References the source file path in `_imported/` for rich role content
- Does NOT duplicate the full imported persona content

The imported file stays in `_imported/` as the role definition. The wrapper file is the SLOPS governance layer.

---

## Promotion Status Criteria

| Status | When to Assign |
|--------|---------------|
| `active` | Reviewed, doctrine-wrapped, approved by Justin, safe for current workflows |
| `candidate` | Reviewed and wrapped, but not yet tested in a real task or pending Justin approval |
| `do-not-activate` | Has specific RBAC or security concern that must be resolved before use |
| `reference-only` | Not yet reviewed OR reviewed but not needed for current launch scope |

**Default for unreviewed agents**: `reference-only` — no change from current state.

**Target for Phase 5**: Most promoted agents will land at `candidate`. Justin upgrades to `active` after seeing the wrapper and agreeing to the allowed/denied work and tool tier.

---

## Promotion Criteria: How to Select Agents per Division

For each division, ask:

1. **Is this agent relevant to current launch scope?** (Omen launch, ssffmvp MVP, SLOPS OS build-out)
2. **Is this agent low enough risk to promote now?** (No broad write access, no secrets/production/payment authority)
3. **Would Justin actually call this agent in the next 30–90 days?**
4. **Does the division already have a Claude/Codex workflow that covers this?** (If so, defer)

Aim for **1–5 agents per division** in the first pass. The rest stay `reference-only`.

---

## Output Per Division Review

Each division review session produces:

### 1. SLOPS Wrapper Files
One file per promoted agent:
```text
Blueprints\agents\<division-short-name>\<agent-name>.md
```

File uses the Required Agent File Shape from `slops-agent-author/SKILL.md`.

### 2. AGENT_INDEX.md Update
Add a row per promoted agent to Section 4 (Imported Agent Library) updating status from `reference-only` to `candidate` or `do-not-activate`. Add new rows to a new Section 5 (Promoted Agents) for any promoted to `candidate` or `active`.

### 3. Division Review Summary
A short markdown note documenting:
- Which agents were reviewed
- Which were selected and why
- Which were deferred and why
- Any RBAC flags or security concerns

Saved to:
```text
Solutions\reports\dbs-migration\phase-5-reviews\<division-name>-review.md
```

---

## Division Order (from AGENT_INDEX.md Section 5)

| # | Division | Folder | Agent Count | Risk | Priority Reason |
|---|----------|--------|-------------|------|-----------------|
| 5A | Product | `__product_division` | 5 | medium | Core to roadmap, specs, launch planning |
| 5B | Design | `__design_division` | 7 | medium | UX/UI/brand work pre-launch |
| 5C | Marketing | `__marketing_division` | 9 | medium | Launch narrative, content |
| 5D | Sales | `__sales_division` | 9 | medium | Monetization, pipeline |
| 5E | Support | `__support_division` | 6 | medium-high | Customer experience — selected only |
| 5F | Specialized | `__specialized_division` | 14 | high | Domain-specific — careful selection |
| 5G | Project Mgmt | `__project_management_division` | 6 | medium | Execution coordination |
| 5H | Engineering | `__engineering_division` | 17 | HIGH | Code/infra/security — careful review |
| 5I | Paid Media | `__paid_media_division` | 7 | HIGH | Ad spend, financial risk |
| 5J | Finance | `__finance_division` | 5 | high | Financial analysis, budgeting risk |
| 5K | Academic | `__academic_division` | 5 | low | Reference use case, low urgency |
| 5L | Handoffs | `__handoffs` | 1 README | low | Process documentation |

---

## Per-Division Prompt File Locations

Each division gets its own Claude runnable prompt saved to:

```text
Blueprints\prompts\phase-5\phase-5a-product-division.md
Blueprints\prompts\phase-5\phase-5b-design-division.md
...etc
```

Run each prompt as a standalone in-session Claude operation. Do not batch multiple divisions in one session.

---

## Security Constraints (All Divisions)

These rules apply to every agent wrapper produced in Phase 5:

- No agent may have write access to `.env`, `.key`, `.pem`, secrets, credentials, or auth tokens
- No agent may have write access to `ssffmvp/src/`, `ssffmvp/sql/`, or any app source folder
- No agent may be granted production, deployment, DNS, SSL, Nginx, or VPS authority
- No agent may invoke skills not listed in `Blueprints\skills\SKILL_ROUTING.md` Current SLOPS Skills without Justin approval
- Engineering division agents (especially security-engineer, devops-automator, sre, threat-detection-engineer) require explicit security review before promotion to `active`
- Paid media agents may not have write access to ad platform accounts or spend controls
- Finance agents may not initiate payments, transfers, or subscription changes

---

## Wrapper File Format (Required Agent File Shape)

Every promoted agent file must use this structure:

```markdown
---
name: <agent-name>
status: candidate | active | do-not-activate
division: <division-name>
source: Blueprints\agents\_imported\<division-folder>\<filename>.md
---

# <Agent Display Name>

## Status

candidate

## Division

<Division Name>

## DBS Layer

Global Blueprint | Project Blueprint | Reference Only

## Purpose

<One paragraph: what this agent is for, how it fits SLOPS workflows.>

## Allowed Work

- <specific task>
- <specific task>

## Denied Work

- No write access to secrets, .env, credentials, auth, or tokens
- No production, deployment, DNS, SSL, Nginx, or VPS access
- No payment, billing, or subscription changes
- <role-specific denied task>
- <role-specific denied task>

## Required Read-First Files

- `DBS_INDEX.md`
- `Blueprints\agents\AGENT_INDEX.md`
- <other relevant files>

## May Invoke Skills

- <skill-name from SKILL_ROUTING.md — only listed SLOPS skills>

## Tool Tier Cap

Tier <1-3> — <brief reason>

## May Write To

- <approved path>

## Must Not Write To

- `ssffmvp\src\`
- `ssffmvp\sql\`
- `.env`, `.key`, credentials
- `Archive\`
- <other restricted paths>

## Approval Required For

- <action requiring Justin or Claude approval>

## Escalates To

- Justin (final decisions)
- Claude (planning, review, security questions)

## Notes

Source file: `Blueprints\agents\_imported\<division>\<filename>.md`
<Any RBAC concerns, import notes, or limitations.>
```

---

## Phase 5 Completion Criteria

Phase 5 is complete when:

- [ ] All 12 division review sessions have been run
- [ ] At least 1 agent per division has been reviewed (even if outcome is `reference-only`)
- [ ] AGENT_INDEX.md Section 4 reflects updated statuses
- [ ] A promoted candidates section exists in AGENT_INDEX.md
- [ ] All SLOPS wrapper files are created at `Blueprints\agents\<division>\`
- [ ] Division review summaries saved to `Solutions\reports\dbs-migration\phase-5-reviews\`
- [ ] Justin has approved each division before the next is started

---

## Session Rules

- Run one division per Claude session
- Do not read all agents before starting — read the division's files as you go
- If a file raises a security concern, flag it and stop — do not wrap until resolved
- Never promote an agent that could touch `ssffmvp` app source, secrets, or production
- Write wrapper files in-session; Justin reviews before next division starts

---

## Relation to Phase 6

Phase 5 (imported agent promotion) runs before Phase 6 (manager_agent / sub_agents disposition + handoff documentation), because:

- Phase 6 defines cross-layer communication protocols
- Knowing which agents are active at the global level informs what Phase 6 handoff docs need to reference
- Phase 5 agents may need to be mentioned in Phase 6 handoff documentation

---

**Document Status**: Approved for execution
**Archival**: `Solutions\reports\dbs-migration\PHASE_5_PLAN.md`
