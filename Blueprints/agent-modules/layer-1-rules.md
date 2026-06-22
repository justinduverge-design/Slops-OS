# Layer 1 — Slops Saloon (division)

**Path:** `<git-root>/slops-saloon/`

**In scope:**

- Division strategy (sports / music / arts)
- Brand custody across products
- **Content + marketing** — canonical homes are `Direction/content-strategy.md` and `Direction/marketing-strategy.md`
- Cross-product reusable patterns (`Blueprints/`) — keep mostly empty until ≥2 products need the same thing
- Future product slots (parked, not active)

**Route elsewhere:**

- Corvus code, deploy, tests, source → L2 (`corvus/`)
- OS-level skills / agents / doctrine → L0 (parent)

**Do not** modify Corvus source, tests, deploy, package files, SQL, Docker, Stripe, or Supabase from L1. **Do not recreate** the retired nested `Corvus/` folder.

**Content + marketing agent work** runs at this layer. The agents (Claude + Codex, lane-agnostic) produce; Justin directs.
