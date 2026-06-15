# Layer 2 — Corvus (active product)

**Path:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus\`

**In scope:**

- App source: `frontend/`, `src/`, `services/`, `routes/`, `test/`, `sql/`
- Specs: `Blueprints/specs/` (page-system, design-system, brand-system)
- Handoffs: `Blueprints/handoffs/`
- Direction: `Direction/current_sprint.md`, `decision_log.md`, `agent_inbox.md`
- Deploy: `deploy/hostinger/` (config only — production action is Justin-gated)

**Lane lean (soft):**

- **Claude** leans frontend (`frontend/`), docs, specs, planning, brand+copy review
- **Codex** leans backend (`src/` + `services/` + `routes/`), tests, migrations, code-volume changes
- Either agent can pull any item. Soft-preference escape hatch fires only when an item is *both* far outside the lean *and* high-risk.

**Do not** touch `Archive/quarantine/`, `.env*`, secrets, `_imported/`, DNS, SSL, Nginx, Supabase migrations, Stripe production behavior, or push to deploy without explicit approval.
**Mock data must be labeled.** Never present mock as live.
