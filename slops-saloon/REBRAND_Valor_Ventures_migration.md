# Slops Saloon → Valor Ventures LLC — Migration Checklist

Owner: Justin | Entity: **Valor Ventures LLC** | Product/brand stays: **Omen** (public), domain stays **slopssaloon.com** for now.

**The one idea that makes this simple:** three separate layers, they don't have to match.
- **Legal owner** = Valor Ventures LLC (who owns/bills the accounts, who legal docs name)
- **Brand** = Omen / Slops Saloon (what users see — a marketing choice, not an LLC requirement)
- **Technical IDs** = `com.slopssaloon.omen`, package names (internal strings — never change once shipped)

"Free to change" is the goal — but **not** for technical IDs, which are free to change and will break the app. Those are quarantined in section D.

---

## A. Change now — FREE and safe (legal name / ownership)

These cost nothing and are the actual reason you formed the LLC.

- [ ] **Legal text in the app** — Terms, Privacy, Support pages: change "Slops Saloon" the *operator* to "operated by Valor Ventures LLC". (Keep @slopssaloon.com emails.)
  - Files: `frontend/src/pages/Terms.jsx`, `Privacy.jsx`, `Support.jsx`, `client/App.jsx` footer, `frontend/src/components/layout/Footer.jsx` (`© Slops Saloon` → `© Valor Ventures LLC`)
- [ ] **GitHub → move under the LLC** (free — see section E for steps)
- [ ] **Service account "organization/company" name fields** (free profile edits, billing stays as-is for now): Supabase project org name, Upstash (Redis), Sentry org name.
- [ ] **README / repo descriptions** where they call the company "Slops Saloon".

## B. Change when convenient — costs money OR real effort

- [ ] **Domain** — keep `slopssaloon.com`. Only buying a new domain (e.g. valorventures.com or an Omen domain) costs money. Defer unless you want a new public brand. If/when you do: update `CORS_ORIGINS`, `APP_BASE_URL`, nginx configs, extension manifest, health-check URLs.
- [ ] **Domain registrant/owner** → set to Valor Ventures LLC (free-ish, done at your registrar; you keep the name).
- [ ] **Billing/payment method** on Supabase, Upstash, Sentry, host (Hostinger KVM), API accounts (Sportradar, Yahoo, Anthropic) → move to LLC bank/card. Free to do, needs the business account to exist.

## C. Higher-stakes — do deliberately (tied to legal entity)

- [ ] **Apple Developer + Google Play accounts** — enroll/hold under Valor Ventures LLC. Easiest *before* first publish; painful to transfer after. Apple org enrollment needs a D-U-N-S number (free).
- [ ] **EIN / bank account / any Stripe or payment processing** → LLC. (Talk to your accountant.)

## D. Do NOT change (free, but breaks things) 🚫

- 🚫 `com.slopssaloon.omen` — Android `applicationId`/`namespace` + iOS bundle ID. Changing after publish breaks installs, OAuth redirect URIs, and store listing identity.
- 🚫 Kotlin/Swift package namespaces (`com.slopssaloon.omen.*`) — cosmetic, huge diff, zero benefit, risk of breakage.
- 🚫 `slops-saloon-frontend` npm package `name` — internal only; nobody sees it.
- These are engineering identifiers, not the brand. Leave them even though they're "free."

## E. GitHub move — step by step (free)

1. Create a **GitHub Organization** owned by your account, named for the LLC (e.g. `valor-ventures`). Free tier is fine.
2. Repo → **Settings → Danger Zone → Transfer** `justinduverge-design/omen` to the `valor-ventures` org. GitHub auto-redirects the old URL, so nothing breaks immediately.
3. Update local remotes in each clone:
   ```
   git remote set-url origin https://github.com/valor-ventures/omen
   ```
   (Do this in the main omen clone; the `.claude/worktrees/*` copies are throwaway.)
4. Update any hardcoded `justinduverge-design/omen` references in workflows/docs.
5. Later, if you add collaborators or agents, they join the org — cleaner than personal-repo sharing.

Note: this is org-hygiene, not legal advice. For entity/tax/liability questions, confirm with your accountant or attorney.

---

## Suggested order
1. GitHub move (E) — free, unblocks clean ownership.
2. Legal text + footers (A) — free, 20 min, and it's the visible "who operates this."
3. Account org-name fields (A) — free profile edits.
4. Domain registrant + billing to LLC (B) — when the business bank/card is ready.
5. Apple/Google dev accounts (C) — before you publish.
6. Leave section D alone.
