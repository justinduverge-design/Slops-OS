# Runbook: Claude Code ↔ Codex Workflow

## Purpose

This runbook defines how Justin, Claude, and Codex work together while building Corvus.

The goal is to keep progress focused, safe, and reversible.

---

## Roles

| Actor | Role | Does | Does Not |
|---|---|---|---|
| Justin | Product Owner | Sets direction, approves risky actions, decides priorities | Let agents expand scope without approval |
| Claude Chat | Planner / Reviewer | Helps think, plan, review, rewrite docs, create prompts | Pretend to have edited local files unless producing downloadable files |
| Claude Code | Front-End Engineer | Builds UI, layout, app experience, frontend states, frontend handoffs | Own backend, DB, auth, deploy, or secrets by default |
| Codex | Back-End Engineer | Builds APIs, contracts, integrations, backend tests, infra support | Redesign frontend or make product decisions alone |

---

## Session Modes

Every session must start with one mode:

```text
read-only inspection
planning only
implementation
review
deploy prep
```

If the mode is not stated, agents must ask or default to read-only inspection.

---

## Standard Session Start

### Claude Code start prompt

```text
Read CLAUDE.md first.

Mode: read-only inspection.

Do not edit files.

Inspect the Corvus app and report the current frontend structure, active frontend folder, active routes, important components, and what should be changed next to support the app backbone and Draft Assistant.
```

### Codex start prompt

```text
Read AGENT.md first.

Mode: read-only inspection.

Do not edit files.

Inspect the Corvus app and report the backend framework, API route structure, existing Omen/Draft/Platform routes, environment safety, test status, and what backend task should come next.
```

---

## Handoff Workflow

```text
Claude Code
Front-End Engineer
        │
        │ writes backend needs
        ▼
ssffmvp/Blueprints/handoffs/frontend-to-backend.md
        │
        │ Codex reads
        ▼
Codex
Back-End Engineer
        │
        │ writes completed contracts
        ▼
ssffmvp/Blueprints/handoffs/backend-to-frontend.md
        │
        │ Claude Code reads
        ▼
Frontend connects to backend
```

---

## Required Handoff Format

Every handoff should include:

- feature name
- status
- frontend behavior or backend endpoint
- request shape
- response shape
- example response
- affected files
- limitations
- open questions

---

## Safety Boundaries

The following require explicit Justin approval:

- production deploys
- auth changes
- payment/Stripe changes
- Supabase migrations
- Docker/deployment workflow changes
- DNS/SSL/VPS changes
- `.env`, cookies, API keys, tokens, private keys
- destructive data operations

---

## End Of Session Report

Every implementation session must end with:

```text
Files changed:
Tests run:
Handoff updated:
Risks/limitations:
Next recommended step:
```

---

## Current Doctrine

Backbone first.

Draft Assistant second.

MVP Move third.

Everything else is parked unless Justin explicitly reactivates it.
