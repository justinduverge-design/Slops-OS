# SLOPS OS Context

## Layer Purpose

SLOPS OS is Justin's operating system layer.

It organizes decisions, context, agent routing, reusable skills, and cross-project handoffs.

This layer is broader than any single repo or product.

## Current Structure

```text
SLOPS/                 Layer 0 - operating system
slops-saloon/          Layer 1 - Slops Saloon division
slops-saloon/corvus/   Layer 2 - Corvus product repo
```

## Current Truth

- Slops Saloon is the sports, music, and arts division.
- Corvus is the only active product.
- Corvus is the Fantasy Football MVP.
- Corvus is the active git repo for app work.
- GitHub repo: `justinduverge-design/corvus`.
- Oracle checkout: `~/corvus`.

## Current Product Signal — 2026-05-27

- Corvus backend contract work advanced through frontend handoff Requests 13-18.
- Local backend test baseline is now 216/216 passing.
- New local contracts: `GET /api/system/current-week` and `GET /api/stripe/prices`.
- Prepared, but did not apply, Supabase launch SQL for `waitlist_signups`, `subscriptions.trial_ends_at`, and `subscriptions.current_period_end`.
- Legacy Corvus compatibility routes now fail closed with `410 legacy_route_retired`.
- Any Supabase migration, Stripe live validation, deploy, DNS, SSL, Nginx, or production infrastructure action still requires explicit Justin approval.

## DBS Meaning

- `Direction/` holds current context, roadmap, decisions, risks, and sprint notes.
- `Blueprints/` holds reusable skills, agents, prompts, specs, templates, playbooks, and handoffs.
- `Solutions/` holds finished outputs and reports.
- `References/` holds supporting research and source captures.
- `Archive/` preserves superseded or parked material.

## Decision Routing

- Company-wide or reusable operating decisions belong at the SLOPS OS layer.
- Slops Saloon division decisions belong in `slops-saloon/Direction/`.
- Corvus product decisions belong in `slops-saloon/corvus/Direction/`.
- Corvus frontend/backend handoffs belong in `slops-saloon/corvus/Blueprints/handoffs/`.

## Skill Routing

SLOPS-authored skills live in one canonical place:

```text
Blueprints/skills/
```

Agents should read:

1. `Blueprints/skills/README.md`
2. `Blueprints/skills/SKILL_ROUTING.md`
3. The named skill folder's `SKILL.md`

Tool-installed external skills may live elsewhere. Treat them as runtime dependencies, not SLOPS-authored source.

## Safety Boundary

SLOPS OS work can update documentation and routing context.

Do not change app behavior, deployment posture, secrets, infrastructure, package files, source code, tests, SQL, scripts, `.git`, or active implementation assets without explicit approval.

Do not treat archive, imported agents, or old project copies as current authority unless Justin explicitly says so.
