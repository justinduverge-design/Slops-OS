# Omen Founder Security Checklist

For Omen / Valor Ventures LLC. Check items off as you complete them.

> **Current blockers:** GitHub Actions is blocked by billing/spend settings, and Yahoo Fantasy API access is pending approval. Do not paste keys into chat, tickets, screenshots, or source control.

## P0 — do these first

- [ ] Restore GitHub Actions: resolve the GitHub Billing & plans payment/spending-limit block, then rerun the newest main deployment.
- [ ] Turn on MFA for GitHub, primary email, Supabase, Hostinger, Infisical, Yahoo Developer, and the domain registrar. Save recovery codes offline or in a password manager.
- [ ] Review account access: remove old collaborators and give each person only the minimum role they need.
- [ ] Record the Supabase secret rotation. Confirm the old credential is disabled and keep the date in private operations notes.
- [ ] Record the Vault permissions remediation. Public execution was removed from the sensitive Vault functions; retain the migration and verification result as evidence.
- [ ] Confirm recovery: verify Supabase backup/PITR coverage, take a VPS snapshot, and write a one-page restore test.
- [ ] Write an incident card: contacts, pausing deploys, rotating a secret, reviewing logs, notifying affected users, and documenting the incident.

## P1 — harden the product

- [ ] Finish Yahoo access correctly: keep Omen a **Confidential Client**, use only `https://slopssaloon.com/api/yahoo/callback`, and request read-only Fantasy Sports access.
- [ ] Verify OAuth safety: exact redirect URI, server-only client secret, state validation, secure token storage, disconnect/revoke path, and no tokens in logs.
- [ ] Add rate limits to sign-in, OAuth, password reset, AI, and expensive recommendation routes.
- [ ] Review browser/API protections: HSTS, Content Security Policy, frame protection, `nosniff`, least-privilege CORS, and secure cookies.
- [ ] Close remaining Supabase findings: RLS on exposed tables, narrow the waitlist policy, enable leaked-password protection, and document service-role-only tables.
- [ ] Make logging safe: redact auth headers, cookies, OAuth codes, refresh tokens, service secrets, and unnecessary personal data.
- [ ] Protect GitHub: required PR/status checks on `main`, secret scanning, dependency alerts, and a scheduled dependency-update window.

## Privacy and trust

- [ ] Publish truthful privacy and terms pages describing league data use, retention/deletion, provider connections, support contact, and informational nature of advice.
- [ ] Test account deletion and provider disconnect so stored provider tokens and user data are handled as promised.
- [ ] Keep analytics lean: no session replay, query strings, credentials, private roster details, or free-text prompts by default.

## Review rhythm

### Weekly — 15 minutes

- [ ] Check uptime and `/api/ready`.
- [ ] Check failed deploys, error alerts, unexpected access, backup status, and billing notices.

### Monthly — 30 minutes

- [ ] Review users/admins, secret rotation dates, dependency alerts, public endpoints, logs, and restore readiness.

### Quarterly — 60 minutes

- [ ] Do a backup restore drill.
- [ ] Audit access.
- [ ] Run an incident tabletop exercise.
- [ ] Review privacy commitments and vendor accounts.

---

This is an operating checklist, not legal or compliance certification. Keep credentials and recovery codes out of this file.
