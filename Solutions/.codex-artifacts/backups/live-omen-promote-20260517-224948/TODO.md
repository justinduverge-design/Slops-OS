# Omen - TODO

_Last updated: 2026-05-18_
_Source: Session 17 Omen contracts + live empty shell + Start/Sit signals, 120 tests passing_

---

## Current Project Status

Slops Saloon is the parent company and mission site.

Omen is the first flagship product inside that ecosystem: the fantasy football MVP.

Local app verification is green:

- `npm test`: 120 passing / 0 failing
- `frontend npm run build`: not rerun in the backend Session 17 pass

The working tree is dirty. Do not deploy, push, or merge until Claude reviews the full diff.

Justin has selected the stronger local `client/` / `localhost:3000` visual direction as the target feel for the public website. The canonical `frontend/` app should be made more presentation-worthy before production movement, while keeping claims accurate and avoiding fake live-feature promises.

The product direction is fixed:

- Trade Analyzer is free.
- MVP Move is paid.
- Ask Slops is removed permanently.
- LLM is backend-only.
- MVP Move must support Yahoo, Sleeper, and ESPN at paid launch.
- ESPN is launch-critical and security-critical.
- No placeholder features ship.

---

## Active Product Decisions

- [x] Slops Saloon remains the parent company, mission site, and long-term product studio.
- [x] Omen is the active fantasy football product name.
- [x] Brand architecture work cannot disrupt launch execution or security.
- [x] The public landing page must move toward the stronger `localhost:3000` visual quality before Justin shows the site.
- [x] Ask Slops is removed permanently.
- [x] Trade Analyzer remains free.
- [x] MVP Move is paid.
- [x] MVP Move requires Yahoo, Sleeper, and ESPN at paid launch.
- [x] ESPN is launch-critical and security-critical.
- [x] Waiver brief can be deferred if needed.
- [x] Claude and Codex may challenge Justin when the OS is being violated.

---

## Launch Platform Set

- [x] Yahoo normalized adapter path
- [x] Sleeper adapter slice
- [x] ESPN adapter slice

MVP Move cannot launch as a paid product until all three launch platforms feed the normalized decision system in production-ready form.

---

## Production Blockers

### P0 - Must resolve before paid launch

- [x] Replace `passport-yahoo-oauth2` with request-free Yahoo OAuth.
- [x] Clear npm audit gate.
- [x] Move ESPN roster route away from query-param cookies.
- [x] Gate ESPN connection UI behind `VITE_ESPN_ENABLED`.
- [x] Mask ESPN cookie input fields.
- [x] Sanitize legacy v2 error messages.
- [x] Reuse Yahoo Vault secrets on reconnect.
- [x] Wire real external data into MVP Move (weather, travel, gametime — live via ESPN + OWM).
- [x] Fix "SSFFMVP" → "Omen" in `agents.js` SUB_AGENT_PROMPTS (6 strings) and manager fallback.
- [x] Fix "Slops Saloon" references in inner app components (Header, Footer, Football, NotFound, PlatformConnections).
- [x] Fix DST normalization bug: consolidated `normalizePosition` into single export from `vorp.js`.
- [x] Add week bounds check (1–18) to all three optimizer routes via shared `parseWeek` sentinel.
- [x] Security: `requireAuth` added to 4 legacy v2 routes; `req.user.id` replaces caller-supplied userId.
- [x] Weather: switched OWM to `/forecast` endpoint — `precip_chance` now reads real `pop` value.
- [x] Footer copyright: "Slops OS" → "Slops Saloon. All rights reserved."
- [x] Claude review full dirty worktree.
- [x] Commit reviewed changes to branch `feat/session-8-10` (4 commits: 2137bab, e06aa46, b612a49, b4d2b14).
- [x] Push `feat/session-8-10`, open PR, merge, and deploy. Completed as PR #16 on 2026-05-17.
- [x] Run browser QA for Helmet CSP after server startup. Completed during PR #16 validation.
- [ ] Confirm ESPN cookie handling policy and disclosure before enabling `VITE_ESPN_ENABLED`.
- [x] Claude review the `client/` visual prototype — migration already complete. Landing.jsx IS the premium dark design. No separate PR needed.
- [x] Update the canonical `frontend/` landing page to match `localhost:3000` visual quality. Done: dark bg, Cormorant Garamond, gold accent, OmenCard example, honest CTAs.
- [x] Production deploy plan reviewed and approved by Claude + Justin.
- [x] PR #16 merged to main and deployed to production (2026-05-17). All verifications pass.

---

## Current Build Order

1. [x] External API integration: wire ESPN scoreboard + OpenWeatherMap into MVP Move.
2. [x] 99 tests passing / 0 failing verified.
3. [x] Brand text cleanup: "SSFFMVP" → "Omen" in agent prompts; inner-app "Slops Saloon" → "Omen".
4. [x] Backend bug fixes: DST normalization, optimizer week bounds (1–18).
5. [x] Security: requireAuth added to all four v2 legacy routes; caller-supplied userId eliminated.
6. [x] Weather accuracy: switched to /forecast endpoint for real precip_chance.
7. [x] normalizePosition consolidated — single export from vorp.js, imported in tradeValue.js.
8. [x] Footer.jsx copyright corrected: "Slops OS" → "Slops Saloon".
9. [x] 107 tests passing / 0 failing verified.
10. [x] Add TODO comment to weatherService.js for season-hardening (game-time forecast lookup).
11. [x] Four-commit grouping: feat/session-8-10 — 4 commits + CSP follow-on, PR #16 opened.
12. [x] Landing migration: already complete — Landing.jsx has the premium dark Omen design.
13. [x] Browser QA: CSP verified on localhost:3000, fixes applied, re-tested.
14. [x] Production deploy: PR #16 merged (6d505917), deployed via GitHub Actions, verified live.

**Next build order:**
15. [x] GitHub Actions workflow dependency update — PR #17 merged/deployed on 2026-05-17.
16. [x] Matchup DvP — PR #18 merged/deployed on 2026-05-17.
17. [x] Landing page title tag — fixed to `<title>Omen</title>` in PR #19 on 2026-05-17.
18. [x] Omen of the Week mock contracts — `GET /api/omen-of-the-week`, `GET /api/platform-status`, and `GET /api/health` ready locally; frontend consumed the contract.
19. [x] Omen live empty shell — authenticated `GET /api/omen-of-the-week` returns live-mode empty states while preserving the mock contract shape.
20. [x] Platform status bar compatibility — authenticated `GET /api/platforms/status` now preserves top-level platform keys and also returns `connections`.
21. [x] Add deterministic `signals` to `POST /api/start-sit` while preserving existing response fields. 120 tests passing locally.
22. [ ] Map connected roster data into live Omen recommendations.
23. [ ] Confirm ESPN cookie handling policy and disclosure before enabling VITE_ESPN_ENABLED in production.
24. [ ] Promote live Omen engine — wire getLiveOmenForUser() to real roster + optimizer output

---

## MVP Move Requirements

MVP Move must:

- use real roster data
- use actual league context
- support Yahoo, Sleeper, and ESPN
- evaluate lineup, waiver, and trade actions
- surface one best move
- explain the recommendation clearly
- avoid false certainty
- meet the Omen quality standard before paid launch

---

## Trade Analyzer Requirements

Trade Analyzer must:

- remain free
- require no authentication
- provide a trade fairness metric
- provide a short explanation
- be shareable
- not replace MVP Move
- avoid claiming certainty

---

## ADRs To Create Or Maintain

- [x] ADR-002 - Remove Ask Slops Permanently
- [x] ADR-003 - Trade Analyzer Always Free
- [x] ADR-004 - Replace passport-yahoo-oauth2 with axios-based OAuth
- [x] ADR-005 - Platform Adapter Pattern
- [x] ADR-006 - ESPN Cookie Auth Risk
- [x] ADR-007 - LLM Backend-Only Reasoning Engine
- [x] ADR-008 - Start/Sit Removed as Standalone Tab
- [x] ADR-009 - September 10, 2026 Launch Deadline
- [x] ADR-010 - VORP + Trade Analysis A+B Model

---

## Documentation To Maintain

- [x] `brand_voice.md`
- [x] `brand/rebrand_notes.md`
- [ ] `decisions/ADR-template.md`
- [x] `context.md`
- [ ] `manifesto.md`
- [ ] `agents.md`
- [ ] `coo.md`
- [ ] `cto.md`
- [ ] `skills.md`
- [x] `README.md`
- [ ] `runbook_ai_workflow.md`

---

## Deferred Features

These are not dead. They are not launch-critical.

- [ ] Waiver brief
- [ ] Standalone Start/Sit tab
- [ ] Fantrax support
- [ ] NFL Fantasy support
- [ ] League hosting
- [ ] Full rebrand
- [ ] Advanced content/community system

---

## Do Not Touch Without Explicit Justin Approval

- production deployment
- `.env` files
- Stripe settings
- Supabase migrations
- auth/payment flows
- ESPN cookie storage behavior
- paid dependencies
- DNS / SSL / VPS configuration
- launch platform set
- product roadmap
