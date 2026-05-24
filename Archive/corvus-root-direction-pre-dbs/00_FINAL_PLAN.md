# Slops OS / Corvus Final Operating Plan

## Purpose

This plan turns the current Slops OS files into a cleaner working system for building Corvus without distracting Claude, Codex, or Justin with future ideas.

Corvus is the active product. The current priority is finishing the app backbone so polished tools can be built on top of a stable foundation.

---

## Strategic Decision

### Active now

- **Corvus** — fantasy football decision assistant and app experience.
- **Draft Assistant** — first-impression free tool for this year only.
- **MVP Move / Omen of the Week** — paid centerpiece after the backbone is stable.
- **Slops Saloon landing page** — lightweight umbrella doorway only.

### Parked

Future products, sport expansions, league hosting, and private research-team ideas are not active engineering scope. They should not be introduced into Claude or Codex work sessions unless Justin explicitly reactivates them.

---

## Priority Stack

```text
Priority 0: App Backbone
Priority 1: Draft Assistant
Priority 2: MVP Move / Omen of the Week
Priority 3: Supporting Fantasy Tools
Priority 4: Lightweight Slops Saloon Landing Page
```

### Priority 0 — App Backbone

Backbone means:

- routing
- authentication/session stability
- dashboard shell
- platform connection flow
- reusable UI layout
- API contracts
- platform status contract
- error/loading/empty states
- environment safety
- deployment stability
- handoff discipline between frontend and backend

This comes before feature expansion.

### Priority 1 — Draft Assistant

Draft Assistant is the first-impression tool. It is free this year only. It must feel polished and trustworthy, but it must not be built as a one-off toy. It should reuse the same Corvus layout, API conventions, and UI patterns that will later support MVP Move.

### Priority 2 — MVP Move / Omen of the Week

MVP Move / Omen of the Week remains the paid centerpiece. It should use the same backbone and platform data foundation as Draft Assistant once stable.

### Priority 3 — Supporting Tools

Trade Analyzer, Start/Sit, Waiver Wire, roster insights, and related features come after the backbone and first-impression path are coherent.

### Priority 4 — Slops Saloon Landing Page

Slops Saloon is the umbrella brand. For now, it should be a thin doorway that introduces the world and points users to Corvus. It should not become a media hub, CMS, blog, podcast archive, or second product build during this phase.

---

## Product Architecture

```text
Slops Saloon
Umbrella brand / parent domain / founder world
│
└── Corvus
    Active product
    Fantasy football decision assistant
    │
    ├── App Backbone
    ├── Draft Assistant
    ├── MVP Move / Omen of the Week
    ├── Trade Analyzer
    ├── Start/Sit
    └── Waiver Wire
```

---

## Folder Architecture

```text
Desktop/
└── SLOPS/                         ← Slops OS command center
    ├── README.md
    ├── Direction/                 ← active mission, roadmap, doctrine, work queue
    ├── Blueprints/workflows/      ← global Claude/Codex instructions
    ├── Blueprints/playbooks/      ← Claude/Codex workflow
    ├── Blueprints/prompts/        ← reusable prompt templates
    ├── Blueprints/handoffs/       ← global decisions and notes
    └── ssffmvp/                   ← canonical app repo
        ├── Blueprints/workflows/  ← app-specific agent instructions
        ├── Blueprints/handoffs/   ← app engineering contracts
        └── Corvus/Blueprints/design.md ← Corvus visual direction
```

---

## Agent Roles

```text
Justin
Product owner and final decision-maker
│
├── Claude Chat
│   Planner, reviewer, architect, doctrine helper
│
├── Claude Code
│   Front-end engineer for Corvus app experience
│
└── Codex
    Back-end engineer for APIs, data contracts, integrations, infrastructure support
```

Claude Code and Codex should not be given unrelated future-product context during normal Corvus build sessions.

---

## Workflow Diagram

```text
Justin sets mission
        │
        ▼
Direction/context.md / Direction/TODO.md
        │
        ├──────────────► Claude Code
        │                 builds frontend and UX
        │                 writes backend needs to:
        │                 ssffmvp/Blueprints/handoffs/frontend-to-backend.md
        │
        └──────────────► Codex
                          builds backend and contracts
                          writes completed contracts to:
                          ssffmvp/Blueprints/handoffs/backend-to-frontend.md

Claude Code then connects the UI to the backend contract.
```

---

## Session Modes

Every session must start with one of these modes:

- **read-only inspection** — inspect and report only
- **planning only** — propose a plan, no edits
- **implementation** — edit only approved files
- **review** — inspect diffs and verify safety
- **deploy prep** — production/deployment-sensitive work

Production, Docker, secrets, auth, Stripe, Supabase migrations, DNS, SSL, and VPS changes require explicit Justin approval.

---

## Recommended Next Operations

1. Replace or copy in the updated files from this bundle.
2. Keep current `.env`, `.env.cloud`, key files, and private credentials out of GitHub and out of AI prompts.
3. Point Claude Code at `SLOPS/ssffmvp` for frontend work.
4. Point Codex at `SLOPS/ssffmvp` for backend work.
5. Run a read-only inspection pass before any new implementation.
6. Finish app backbone before expanding feature scope.
7. Build Draft Assistant as the first polished free experience.
8. Continue MVP Move / Omen of the Week as the paid centerpiece after the shared foundation is stable.
