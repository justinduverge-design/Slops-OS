# SLOPS OS Context

## Layer Purpose

SLOPS OS is Justin's operating system layer.

It organizes decisions, context, agent routing, reusable skills, and cross-project handoffs.

This layer is broader than any single repo or product.

## Current Structure

```text
SLOPS/                 Layer 0 - operating system
slops-saloon/          Layer 1 - Slops Saloon division
slops-saloon/omen/   Layer 2 - Omen product repo
```

## Current Truth

- Slops Saloon is the sports, music, and arts division.
- Omen is the only active product.
- Omen is the Fantasy Football MVP.
- Omen is the active git repo for app work.
- GitHub repo: `justinduverge-design/omen`.
- Oracle checkout: `~/omen`.

## Current Product Signal — 2026-05-27

- Omen backend contract work advanced through frontend handoff Requests 13-18.
- Local backend test baseline is now 216/216 passing.
- New local contracts: `GET /api/system/current-week` and `GET /api/stripe/prices`.
- Prepared, but did not apply, Supabase launch SQL for `waitlist_signups`, `subscriptions.trial_ends_at`, and `subscriptions.current_period_end`.
- Legacy Omen compatibility routes now fail closed with `410 legacy_route_retired`.
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
- Omen product decisions belong in `slops-saloon/omen/Direction/`.
- Omen frontend/backend handoffs belong in `slops-saloon/omen/Blueprints/handoffs/`.

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

## Pivot — 2026-06-06

SLOPS is now explicitly a **multi-division** operating system, not a single-product company.

- **Division 1 — Slops Saloon:** sports/media products. Omen is its first product.
- **Division 2 (planned) — local web/app services:** a future Layer-1 division that helps local businesses build/improve sites and apps. Built from Omen experience. **Not started.** Sequenced after Omen gains traction to protect focus.

Operating doctrine confirmed this pivot:

- **Ship the first product free first.** Omen is free for everyone in Year 1 to build trust, an audience, and bug feedback; monetize in Year 2. Don't charge for something still rough.
- **Sequence divisions, don't parallelize them solo.** A second business starts only after the first has traction.
- **Infra doctrine — separate critical from non-critical.** The must-stay-up product runs on its own machine; models, agents, and experiments run on a different machine where wobble is harmless.

Full decision record: `Direction/decisions/2026-06-06-slops-os-multi-division-pivot.md`. Product/business specifics live at Layer 1 (`slops-saloon/Direction/`) and Layer 2 (`slops-saloon/omen/Direction/`).
