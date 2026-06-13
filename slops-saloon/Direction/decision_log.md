# Slops Saloon Division Decision Log

## Active Decisions

- Slops Saloon is the Layer 1 division under SLOPS OS.
- Corvus is the only active product under Slops Saloon.
- The Corvus product git repo lives at `corvus/`.
- Division context stays in this folder.
- Product context stays in `corvus/Direction/`.

## Decisions Added 2026-05-24

- The old nested `Corvus/` folder inside the repo was folded into the Corvus repo root.
- The canonical Corvus repo path is `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus`.
- The canonical GitHub repo is `justinduverge-design/corvus`.
- The Oracle checkout path is `~/corvus`.
- Justin approved a focused Corvus backend hardening pass before further feature expansion. The work stays inside `corvus/` and should prioritize launch-blocking backend risks: Vault/RLS secret boundaries, broken cron/legacy agent drift, Omen route/tier clarity, schema drift, and CI release gates.
- Codex completed the focused local backend hardening pass for Corvus: Vault/RLS boundaries, executable cron/legacy-agent cleanup, cron safety gate, CI quality gate, Probo evidence path cleanup, and backend handoff updates. No deploy was performed.

## Decisions Added 2026-05-24 (UX/UI Planning Pass)

- A clean-plate UX/UI design pass was completed. Decision doc is at `Direction/decisions/corvus-ux-ui-direction-v1.md`.
- The Slops OS app template spec was created at `Blueprints/specs/slops-os-app-template-spec.md`. Corvus is the reference implementation.
- Corvus UX/UI design system v1 is at `corvus/Blueprints/specs/corvus-ux-ui-design-system-v1.md`.
- Sign In / Connect Your League screen spec is at `corvus/Blueprints/specs/sign-in-connect-league-screen-spec.md`. This is P0 — first screen to build.
- Codex UX/UI build handoff is at `corvus/Blueprints/handoffs/codex-ux-ui-build-handoff.md`.
- Dark mode is the primary Corvus experience. Light and system modes are required.
- Trade Analyzer stays auth-free. Sign-in gates Omen, not Trade Analyzer.
- Sign In / Connect Your League is a two-step flow: auth first, league connection second.
- Sleeper connect endpoint does not yet exist — Codex must build it before the frontend can wire Step 2.

## Decisions Added 2026-05-24 (UX/UI Approval Pass — Justin)

- Auth providers confirmed for v1: Google, Apple, Discord, and email magic link — all four ship at launch.
- Omen requires a connected league — no exceptions. No generic Omen without a connected platform. Skipping league connection locks Omen; Trade Analyzer and Draft Assistant remain available.
- ESPN UX is fully guided and in-product. Every step of cookie-extraction is walked through inside the app. Do not hide or minimize ESPN friction.
- `/` serves Corvus at launch. Slops Saloon parent-brand routing at `/` is a future decision, not blocking launch.
- Provisional final sign-in screen headline: **"Your best call, every time."** Marked provisional — confirm after seeing it rendered.
- Manual league entry is a new connection option (Sleeper / Yahoo / ESPN / Manual). Backend contract needed from Codex before it can be built.
- The sign-in and connect-league spec is now v2 (updated). See `corvus/Blueprints/specs/sign-in-connect-league-screen-spec.md`.
- The Codex UX/UI build handoff has been fully updated with product guardrails and resolved decisions. See `corvus/Blueprints/handoffs/codex-ux-ui-build-handoff.md`.

## Decisions Added 2026-05-24 (Data Quality Framework Pass)

- **Paid tier placeholder:** "Pro" is confirmed as an internal working placeholder only. It is not final brand naming. A paid tier naming/brand workshop is a future backlog item to be completed before launch marketing.
- **Manual Omen framework approved:** Three-tier access model is locked in principle — Connected League (full Omen), Manual Complete (conditional Omen), Manual Incomplete (Omen locked, Trade Analyzer available). Full adoption pending Codex data quality audit.
- **Manual Omen feasibility:** Not approved or rejected. Codex must audit what data manual entry can collect and report whether it is sufficient for honest Omen recommendations. Justin decides after seeing the report. The audit is a required step before the manual entry frontend or API is built.
- Codex handoff section 2.4 updated with audit scope, decision framework, and build gate.
- Sign-in spec manual entry card updated to reflect conditional access and build-gate status.
- Direction doc Decisions 14 and 15 added.

## Open Decisions

- When a second Slops Saloon product starts, decide its folder name before creating any source or DBS files.
- Decide whether Slops Saloon needs division-level brand standards before the second product.
- **Paid tier name (final):** Pending brand/naming workshop before launch. "Pro" is placeholder only — do not use in user-facing copy.
- **Manual Omen feasibility:** Pending Codex audit. Codex evaluates data quality ceiling; Justin decides whether Manual Omen ships, ships with limitations, or is deferred.

## Decisions Added 2026-06-06 (Go-to-market + business pivot)

- Corvus is **free for all users on all platforms in Year 1** (adoption/feedback over revenue); the **draft assistant becomes the paid anchor in Year 2**, Sleeper-first.
- **Yahoo/ESPN cannot be charged on** under current API terms (Yahoo needs prior written commercial permission; ESPN is unofficial/fragile). Paid features gate to Sleeper; Yahoo/ESPN stay free "connect and view."
- **Billing is web-only** (Stripe), no Apple IAP — avoids the App Store cut and keeps billing in one place.
- **Entity:** forming a **Connecticut LLC**; CT taxes consumer SaaS at 6.35% (CPA to confirm registration timing).
- **ToS + Privacy Policy** drafted as attorney-review drafts grounded in the real data model: `corvus/References/docs/legal/`.
- A **future local web/app services division** is planned at Layer 0, sequenced after Corvus traction. Not a Slops Saloon product.
- Full record: `Direction/business-launch-foundation.md`.
