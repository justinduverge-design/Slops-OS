# Slops Saloon Division Roadmap

## Now

- Keep Slops Saloon division context clean and separate from Omen product context.
- Keep `omen/` as the only active product repo.
- Keep future product ideas out of Omen until Justin explicitly starts a second product.

**Omen status as of 2026-05-30:**
- Backend: 216/216 tests passing. Requests 13–18 advanced locally. Supabase SQL prepared but not applied (Justin approval required).
- Frontend UI/UX audit: complete. All pages audited, all five findings shipped across Tracks A/B/C.
- Font system: locked — Barlow Condensed / DM Sans / DM Mono / Cormorant Garamond (brand-only).
- CSS token sweep: done — all pages use `var(--color-*)` tokens; team theme applies universally.
- Team identity: live — `cultureTag`, `cry`, `wardRoom`, `lore` fields for all 32 teams in `nflTeams.js`.
- Active build: Trade Analyzer form rework — position-first layout + player name autocomplete (Phase 1, frontend-only).

## Next

- Add division-level brand standards when they apply across more than Omen.
- Add division-level workflows only when a second product needs them.
- Keep `Blueprints/` mostly empty until there is a reusable division-level pattern.
- Coordinate Justin approval for Omen Supabase staging/prod SQL application before paid-launch claims.
- Let Claude optionally wire Omen Account pricing to `GET /api/stripe/prices`; keep that execution in `omen/`.

## Later

- Create a sibling product folder when a second Slops Saloon product becomes active.
- Give each product its own DBS structure.
- Keep shared division rules here, not inside a product repo.

## Out Of Scope

- Omen source code.
- Omen deploy config.
- Omen product prompts and specs.
- Production operations.
- Agent rewrites for `omen/AGENT.md` or `omen/CLAUDE.md`.
- Supabase, Stripe live, deploy, VPS, DNS, SSL, or Nginx action without explicit Justin approval.
