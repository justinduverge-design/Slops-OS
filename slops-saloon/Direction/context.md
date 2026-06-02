# Slops Saloon Direction Context

## Layer

Slops Saloon is the sports, music, and arts division of SLOPS OS.

Path:

```text
C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon
```

## Current Truth

- Slops Saloon is the division.
- Corvus is the only active product.
- Corvus lives at `corvus/`.
- Corvus is the Fantasy Football MVP.
- All current engineering and product execution happens in `corvus/`.

## Active Corvus Snapshot — 2026-05-27

- Corvus local backend tests pass 216/216 after the latest backend handoff pass.
- Backend-safe requests completed locally: Sleeper/ESPN Omen gate readiness, current-week endpoint, Stripe pricing endpoint, and legacy compat route retirement.
- Supabase launch SQL is prepared locally for waitlist signups and subscription date columns, but application to any Supabase project is still approval-gated.
- The next cross-functional coordination point is Justin approval for Supabase staging/prod migration, followed by Claude optionally wiring Account pricing to `GET /api/stripe/prices`.

## What This Layer Owns

- Division context.
- Division roadmap.
- Division TODOs and decision logs.
- Future product slots.
- Cross-product naming rules.
- Division-level brand and operating notes.

## What This Layer Does Not Own

- Corvus app source.
- Corvus backend or frontend.
- Corvus deployment.
- Corvus tests.
- Corvus product handoffs.
- Corvus `AGENT.md` or `CLAUDE.md`.

## Product Boundary

If a task says "Corvus", "fantasy football", "backend", "frontend", "Omen", "Trade Analyzer", "Draft Assistant", "Stripe", "Supabase", "Docker", or "deploy", start in:

```text
corvus/
```

If a task says "Slops Saloon division", "future product", "sports/music/arts", or "division context", stay in this folder.

## Active Product

Corvus - Fantasy Football MVP.

See:

- `AGENTS.md`
- `CLAUDE.md`
- `corvus/Direction/context.md`
- `corvus/Direction/current_sprint.md`
- `corvus/Direction/roadmap.md`
- `corvus/Blueprints/handoffs/`
