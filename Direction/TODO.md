# SLOPS OS TODO

This file tracks root operating-system work only.

## Active

- [ ] Confirm root initial commit staging list after cleanup.
- [ ] Decide whether `Blueprints/agents/AGENT_INDEX.md` candidate statuses are approved current truth.
- [ ] Review loose root files before initial commit.
- [ ] Keep `README.md`, `DBS_INDEX.md`, and `Direction/context.md` aligned.
- [ ] Keep `Blueprints/skills/SKILL_ROUTING.md` and `Blueprints/tools/TOOLS_INDEX.md` aligned with agent authority.
- [ ] Track Omen 2026-05-27 backend status as context only: 216/216 tests passing, prepared Supabase SQL not applied.

## Next

- [ ] Create a short OS-layer handoff before any next root cleanup pass.
- [ ] Review archive candidates outside `Archive/quarantine/`.
- [ ] Review whether `Solutions/.codex-artifacts/` should remain in the initial root commit or be archived/ignored.
- [ ] Prepare the root initial commit only after Justin approves the final staged list.
- [ ] Note the Omen launch approval gate in root coordination: Supabase SQL must be approved before staging/prod application.

## Blocked Without Justin Approval

- [ ] Git commit or push.
- [ ] Any work inside `slops-saloon/`.
- [ ] Any `Archive/quarantine/` inspection, move, staging, or cleanup.
- [ ] Any secrets, credentials, `.env`, key, token, or cookie handling.
- [ ] Any deployment, infrastructure, DNS, SSL, Docker, package, SQL, or app source change.
- [ ] Applying Omen prepared Supabase SQL or validating live Stripe.

## Parked

- Product-specific Omen tasks.
- App repo cleanup.
- Imported agent activation beyond approved status review.
