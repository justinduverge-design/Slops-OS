# Decision — SLOPS OS Multi-Division Pivot (2026-06-06)

## Decision

SLOPS operates as a multi-division company. Slops Saloon (sports/media; Omen is product 1) is the active division. A second division — local web/app services for small businesses — is planned but not started, and will be built from Omen experience.

## Why

Justin wants a near-term path to cover costs and serve his local community, without pulling focus off Omen before it launches. Sequencing the services business after Omen traction protects the free-launch that builds Omen's audience.

## Operating doctrine set by this pivot

- Ship the first product free first; monetize once proven (Omen: free Year 1, monetize draft assistant Year 2).
- Run one business at a time as a solo founder; start the second only after the first has traction.
- Infra: keep the critical product on its own machine; keep models/agents/experiments on a separate, non-critical machine.

## Layer routing

- Company doctrine: this file + `Direction/context.md`.
- Division/business specifics (pricing, entity, platform terms): `slops-saloon/Direction/business-launch-foundation.md`.
- Product hosting/runtime specifics: `slops-saloon/omen/Direction/`.

## Not touched

No app source, secrets, infra, or deploy changes. Documentation/decision only.
