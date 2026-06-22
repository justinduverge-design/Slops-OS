---
name: slops-agent-author
description: Create, critique, normalize, and improve SLOPS agent role files under Blueprints\agents using least privilege and role-based access control. Use when Justin asks to organize agents, classify imported agents, create AGENT.md files, build AGENT_INDEX.md, assign divisions/layers/status, or define agent permissions. Do not use for skill workflows; use slops-skill-author for Blueprints\skills.
---

# Slops Agent Author

## Purpose

Use this skill to create and improve SLOPS agent role files.

An agent is an actor. It has a role, division, allowed work, denied work, access boundaries, escalation rules, and status.

This skill protects the SLOPS system from imported or copied agents becoming accidentally authoritative.

## When to Use

Use this skill when Justin asks to:

- Organize `Blueprints\agents`.
- Write `Blueprints\agents\README.md`.
- Create or update `AGENT_INDEX.md`.
- Classify imported agents.
- Assign agents to company divisions.
- Define agent status.
- Define role-based access control.
- Decide whether an agent belongs globally or inside a project.
- Create a reusable agent role file.
- Normalize `manager_agent.md`, `sub_agents.md`, or division agents.
- Separate reusable roles from Corvus-specific runtime agents.

## Do Not Use

Do not use this skill to:

- Create or edit skill workflows under `Blueprints\skills`.
- Perform code implementation.
- Run terminal commands.
- Activate imported agents without review.
- Grant production, secrets, payments, auth, database, deployment, or VPS authority.
- Move project-specific agents into global authority without checking scope.
- Override Justin's explicit instructions.

For skill files, use `slops-skill-author`.

## Canonical Location

Reusable SLOPS agent roles live under:

```text
Blueprints/agents/
```

Imported third-party agents should be quarantined or marked as candidate/reference material under:

```text
Blueprints\agents\_imported
```

Project-specific app agents should live closer to the project.

For Corvus / slops-saloon-specific agents, prefer:

```text
slops-saloon/Blueprints/agents/
```

unless Justin explicitly decides they should be reusable global agents.

## Agent vs Skill Rule

Agents are actors.

Skills are workflows.

Prompts are one-time runnable instructions.

Use:

```text
Blueprints\agents
```

for role identity and authority.

Use:

```text
Blueprints\skills
```

for reusable procedures.

Use:

```text
Blueprints\Prompts
```

for task prompts.

Do not place broad agent authority inside a skill folder.

Do not place reusable workflow instructions inside an agent role unless they are role-specific operating rules.

## Agent Status Model

Every agent should have a status.

Allowed statuses:

- `candidate`: imported or drafted, not approved for active use.
- `active`: approved for SLOPS workflows.
- `restricted`: approved only for narrow tasks or with extra approval.
- `reference-only`: inspiration or example only, not callable.
- `archived`: superseded, unsafe, or no longer used.

Default status for imported GitHub agents:

```text
candidate
```

until reviewed and indexed.

## Division Model

Agents may be grouped by company-style division.

Examples:

- Academic Division
- Design Division
- Engineering Division
- Finance Division
- Marketing Division
- Paid Media Division
- Product Division
- Project Management Division
- Sales Division
- Specialized Division
- Support Division

Division does not equal authority.

Authority comes from the agent file and `AGENT_INDEX.md`.

## Required Agent File Shape

Use this structure for active or candidate SLOPS agent files:

```markdown
# <Agent Name>

## Status

candidate | active | restricted | reference-only | archived

## Division

<Division name>

## DBS Layer

Global Blueprint | Project Blueprint | Direction Review | Reference Only | Runtime Candidate

## Purpose

<What this agent is for.>

## Allowed Work

- <allowed task>
- <allowed task>

## Denied Work

- <denied task>
- <denied task>

## Required Read-First Files

- <file>
- <file>

## May Invoke Skills

- <skill-name>
- <skill-name>

## May Write To

- <path>
- <path>

## Must Not Write To

- <path>
- <path>

## Approval Required For

- <action>
- <action>

## Escalates To

- Justin
- Claude planner
- Codex executor
- Security reviewer
- Product owner

## Notes

<Important source, import, or limitation notes.>
```

## AGENT_INDEX.md Shape

Use the index to make authority deterministic.

Recommended columns:

```markdown
| Agent | Division | Path | Status | Layer | Allowed Use | May Invoke Skills | Approval Required |
|---|---|---|---|---|---|---|---|
```

Rules:

1. If an agent is not listed, it is not active.
2. Imported agents default to `candidate` or `reference-only`.
3. Division folders do not grant permission.
4. Project-specific agents should not become global unless approved.
5. Agents may invoke skills only when listed or explicitly allowed by Justin.

## RBAC Rules

Use least privilege.

Every agent must define:

- What it can read.
- What it can write.
- What skills it may invoke.
- What it must not touch.
- What requires approval.
- When to escalate.

High-risk areas always require explicit approval:

- Secrets and credentials.
- `.env` files.
- Auth.
- Cookies.
- Payments.
- User data.
- Databases, SQL, migrations, and RLS.
- Production.
- DNS, SSL, Nginx, VPS, infrastructure.
- Git force pushes or pushing to main.
- Deleting files or folders.

## Read-First Procedure

1. Read Justin's request.
2. Identify whether the target is:
   - global reusable agent
   - imported candidate
   - project-specific app agent
   - runtime architecture agent
   - reference-only persona
3. Read only named files first.
4. If no files are named, read:
   - `Blueprints\agents\README.md`
   - `Blueprints\agents\AGENT_INDEX.md`, if present
   - the target agent file
   - relevant division folder only
5. Do not scan all imported agents unless the task is an import audit.
6. Treat `_imported` as non-authoritative.

## Classification Recipe

When reviewing an agent:

1. Identify source.
2. Identify division.
3. Identify whether it is global or project-specific.
4. Assign status.
5. Define allowed work.
6. Define denied work.
7. Define read-first files.
8. Define write boundaries.
9. Define skills it may invoke.
10. Define approval gates.
11. Define escalation path.
12. Add to `AGENT_INDEX.md` only if Justin approves.

## Special Rule for manager_agent.md and sub_agents.md

If `manager_agent.md` or `sub_agents.md` describe Corvus runtime behavior, fantasy football orchestration, or application-specific sub-agent routing, treat them as project-specific until reviewed.

Likely project path:

```text
slops-saloon\Blueprints\agents
```

Do not promote them to global `Blueprints\agents` unless Justin approves.

## Common Failure Modes

Avoid:

- Treating imported GitHub agents as active.
- Assuming division folders grant permissions.
- Mixing role identity with workflow instructions.
- Granting broad write access.
- Forgetting approval gates.
- Moving Corvus-specific agents into global authority.
- Creating agents that can invoke every skill.
- Allowing agents to touch production-risk files.
- Updating indexes without approval.
- Renaming or moving files before classification.

## Output Contract

When producing analysis only, include:

- What type of agent file this is.
- Recommended status.
- Recommended layer.
- Recommended path.
- RBAC risks.
- Next safe step.

When producing files, include:

- Target path.
- Full file content.
- Index update needed.
- Source files used.
- Assumptions.
- What was intentionally not touched.

## Completion Checklist

Before finishing:

- [ ] Did I distinguish agent from skill?
- [ ] Did I preserve DBS structure?
- [ ] Did I default imported agents to candidate/reference-only?
- [ ] Did I define read/write boundaries?
- [ ] Did I include approval gates?
- [ ] Did I avoid granting production authority?
- [ ] Did I recommend the correct layer?
- [ ] Did I name the next safe step?
