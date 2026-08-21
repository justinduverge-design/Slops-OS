# Layer 2 — Omen (active product)

**Path:** `<git-root>/slops-saloon/omen/` in the attached SLOPS workspace. Omen is a separate Git repository and must also work from a standalone clone.

**In scope:**

- The product: native mobile apps, secondary web app, backend, tests, product specs, handoffs, prompts, and runtime logic.
- Native iPhone SwiftUI and Android Kotlin/Compose are the primary product surfaces. New web-only page work is paused unless current Omen direction changes.
- Omen is free indefinitely. Do not add Stripe, subscription, paywall, or paid-tier behavior.

**Route elsewhere:**

- Division strategy, cross-product brand custody, content, and marketing → L1 (`slops-saloon/`).
- OS-level skills, agents, prompts, tools, and cross-cutting doctrine → L0 (SLOPS root).

**Do not:**

- Treat the parent `slops-saloon/` directory as the app repository.
- Recreate the retired `Corvus/` product folder.
- Touch `Archive/quarantine/`, `.env*`, secrets, DNS, SSL, Nginx, production infrastructure, Supabase migrations, package files, or deployment configuration without explicit approval for that exact action.
- Assume L0 files are reachable from Omen CI or a standalone checkout. Required operational doctrine must have an intentional Omen-local mirror or fallback.

**Founder-gated store work:** Apple/Google accounts, signing certificates, provisioning profiles, release configuration, store metadata, and submission.

**Data truth:** Mock data must be clearly labeled and must never be presented as live advice. Never expose ESPN cookies or other provider credentials.

**Native mobile read gate:** Before planning or implementing iPhone, Android, mobile design-system, onboarding, provider-connection, or mobile-release work, read the native mobile spec set named by Omen's current `CLAUDE.md`/`AGENTS.md`. If required sources are missing or conflict, stop and surface the truth-gate failure.
