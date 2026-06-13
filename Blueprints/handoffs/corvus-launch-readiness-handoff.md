# Handoff — Corvus Launch Readiness Check-In
**Date:** 2026-06-10
**For:** Claude + Codex session tomorrow
**Deadline:** First Draft Day — August 2026 (~8 weeks)
**Purpose:** Deep inspection of Corvus against launch readiness criteria. Find gaps, plan solutions, align sprints and roadmap to ship before drafts start.

---

## Critical Context — Read First

**Stripe validation is NOT a priority right now.**
It has been tested and it works. The `CORVUS_BILLING_ENABLED` kill-switch is built and deployed.
The strategy is: **launch free, build something incredible, find monetization paths later.**
Do not bring up Stripe, payments, or subscription validation unless Justin asks.

**First Draft Day = August 2026.**
Fantasy football drafts start in August. That is the hard deadline. Everything below must be done, planned, or explicitly deprioritized before then.

---

## Session Mission for Claude + Codex

This is not a build session. It is an inspection and planning session.

**Do this:**
1. Read `context.md`, `Direction/current_sprint.md`, `Direction/roadmap.md`, `Blueprints/definition-of-done.md`, and `Blueprints/security-privacy.md` before anything else.
2. For each criterion below, inspect the actual codebase and state a real status: **done / partial / not started / blocked**.
3. Where the status is partial or not started, propose a solution and a rough effort estimate.
4. Flag anything that is a launch blocker vs. a nice-to-have.
5. Bring findings to Justin for a planning conversation — do not start building until Justin approves the priority order.
6. After the planning conversation, update `Direction/current_sprint.md` and `Direction/roadmap.md` to reflect what was decided.

**Do not:**
- Start building without Justin approving the priority order first.
- Assume anything is done without checking the actual source.
- Surface Stripe, payments, or billing as a priority.

---

## Launch Readiness Criteria

### Justin's 7

**1. Trade Analyzer — reasoning / quick fix**
- Phase 2 player search is done.
- What's missing: the reasoning layer or a "here's a quick fix" suggestion surfaced to the user.
- Inspect: `src/routes/trade.js`, `services/omen.js` for how analysis is currently returned to frontend.
- Status: **check codebase**

**2. Omens — all three league providers**
- Yahoo: live.
- Sleeper: code complete, live-data validated — blocked on rosters being populated by a draft. **Justin will join a public Sleeper league and draft in early August.** That league becomes the test league. Note: public leagues often die off mid-season, but that doesn't matter — we only need the draft to happen so rosters are populated and the live engine can be validated.
- ESPN: fixture-verified, but in-season live smoke deferred to ~August 2026.
- **Risk:** Public league may draft late or not at all. If that happens, Sleeper validation slips past launch. Have a contingency: launch with Yahoo-only Omen live, Sleeper follows when the draft happens.
- Status: **partial — Sleeper gated on early-August draft, ESPN gated on season open**

**3. ADP — Average Draft Position**
- Does not exist yet.
- **Justin wants a brainstorm before any build prompt is written.**
- Key question: how do we build the *best* ADP — one that adapts to the user's league scoring settings?
- This is a design + research task first. Do not build anything until Justin signs off on the approach.
- Status: **not started — brainstorm required**

**4. Web page + App — built and secured**
- App is live on KVM1 at `slopssaloon.com`.
- Outstanding ops gaps from the sprint: CI/CD still targets the retired Oracle box (not KVM1), final production secrets review not signed off, deploy of billing kill-switch to KVM1 pending.
- Inspect: `deploy/hostinger/`, `.github/workflows/deploy.yml`, `Blueprints/security-privacy.md`.
- Status: **partial — ops gaps remain**

**5. UX/UI — genuinely well built**
- Full audit was completed (PR #22 merged).
- Still open: FP1 signal honesty labels, FP2 Omen rendering for Sleeper/ESPN.
- UX and UI skills have been updated — use them.
- Inspect all 15 routed pages for current state against the AAA framework in `definition-of-done.md`.
- Status: **partial**

**6. Logo**
- Justin is still working on it.
- A `[C]` placeholder is in `Header.jsx` and `NavDrawer` — ready to swap when the SVG is ready.
- Do not assign to Codex. Not a blocker for the code review.

**7. Legal — Terms, Conditions, anything requiring a lawyer**
- Nothing drafted yet.
- Claude's job today: produce a checklist of every document needed for launch (ToS, Privacy Policy, GDPR/CCPA compliance, etc.) and flag what requires actual legal counsel vs. what can be drafted with AI assistance.
- Do not draft the documents themselves yet — agree on the list first.
- Status: **not started**

---

### 8 Additional Gaps (Claude identified from codebase inspection)

**8. Mobile experience**
- Fantasy football is phone-first. Chrome + Firefox smoke passed on desktop only.
- Safari and mobile Safari have not been tested.
- Inspect: is the app responsive? Test on mobile viewport. Flag any layout breaks.
- **Likely launch blocker.**

**9. Omen latency — p95 ~5 seconds**
- Currently logged as post-launch tech debt (Backend P4 in sprint).
- 5 seconds for the flagship feature is a bad first impression.
- Plan: precompute weekly Omen per user on a schedule, serve from cache, stream LLM narration.
- Decide with Justin: is this a pre-launch or post-launch fix given the August deadline?

**10. Error monitoring**
- No mention of Sentry, Datadog, or similar in the codebase.
- If something breaks in production, Justin won't know until a user reports it.
- Minimum viable: wire Sentry to the backend and surface errors to a dashboard.
- Status: **not started**

**11. Onboarding / first-run experience**
- What does a brand new user actually see and do after sign-up?
- Connect a league — then what? Is there a guided flow or does it drop them on the dashboard?
- Inspect: `client/App.jsx`, `AuthApp.jsx`, dashboard flow.
- If there is no first-run guide, this needs to be designed before launch.
- Status: **check codebase**

**12. Account deletion**
- Sprint notes: "Account deletion stays hidden until UX copy + Justin approval are explicit."
- GDPR (EU users) and CCPA (California users) may require this at launch.
- This connects to item 7 (legal) — the legal checklist should confirm whether this is required.
- Status: **hidden / not shipped**

**13. CI/CD pipeline — Oracle vs KVM1**
- The GitHub Actions deploy workflow is named "Deploy to Oracle" and likely targets the retired Oracle box.
- If this is not retargeted to KVM1, a production push may not deploy correctly.
- Inspect: `.github/workflows/deploy.yml`. Confirm the deploy target.
- **Potential launch blocker — confirm before shipping anything.**

**14. Analytics / user behavior**
- No tracking mentioned anywhere in the codebase.
- At launch, Justin will have no visibility into whether anyone is using the app, which features work, or where users drop off.
- Minimum viable: one lightweight analytics tool (PostHog, Plausible, or similar).
- Status: **not started**

**15. Error and empty states — systematic check**
- Some empty states exist (ESPN off-season mode, `pending_live_engine` fallback).
- No evidence of a systematic audit across all 15 pages.
- Inspect: what does each page show when: no league is connected, the API is down, the user has no data yet, the provider returns an error?
- Status: **check codebase**

---

## Recommended Session Flow

1. **Claude reads the codebase** using the Read First list in `context.md`. State real status on all 15 criteria above.
2. **Claude produces a status table** — done / partial / not started / blocked — with a one-line finding for each.
3. **Planning conversation with Justin** — prioritize what must ship before First Draft Day vs. what can follow.
4. **ADP brainstorm** — run this with Justin before any build prompt is written.
5. **Legal checklist** — Claude drafts the list of required documents; Justin decides which need a real lawyer.
6. **Sprint + roadmap update** — after Justin approves the priority order, update `Direction/current_sprint.md` and `Direction/roadmap.md` to reflect the agreed build sequence.
7. **Codex takes build tasks** only after Claude and Justin have aligned on priority.

---

## What to Read First (in order)

1. This file
2. `context.md`
3. `Direction/current_sprint.md`
4. `Direction/roadmap.md`
5. `Blueprints/definition-of-done.md`
6. `Blueprints/security-privacy.md`
7. `Brand/brand-system.md`
