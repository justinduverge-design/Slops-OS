# Omen Product Roadmap

**Format:** Now / Next / Later  
**Hard Deadline:** NFL Kickoff — September 10, 2026  
**Active Product:** Omen  
**Current Doctrine:** Backbone before feature expansion

---

## Roadmap Summary

```text
Now:   Phase 4 live Omen polish + platform reconnection flow
Next:  Draft Assistant polish + MVP Move/Omen hardening
Later: Paid launch prep, production hardening, final QA
```

---

## NOW - Phase 4 Live Omen Polish + Platform Reconnection Flow

Goal: finish the first pass of live-tool polish now that the local app backbone exists.

### Recently completed locally

- Session shell endpoint: `GET /api/session`.
- Dashboard summary endpoint: `GET /api/dashboard/summary`.
- Draft Assistant recommendations endpoint: `POST /api/draft-assistant/recommendations`.
- Platform-centric Waiver Wire endpoint: `GET /api/optimizer/waiver`.
- `.env.example` documents `VITE_ESPN_ENABLED`.
- Frontend session verification is wired in `ProtectedRoute.jsx`.
- Dashboard summary is wired in `Football.jsx`.
- Draft Assistant uses the backend endpoint instead of local fallback data.
- Trade Analyzer and Start/Sit use shared error/empty states.
- Omen handles nullable Yahoo delta values.
- Mobile tab navigation and landing hero sizing received first-pass cleanup.

### Must complete

- Update Waiver Wire UI to call `GET /api/optimizer/waiver` without a platform selector.
- Surface live Omen attribution when Yahoo live data is returned.
- Add Yahoo token-expired/re-auth recovery UI in the account/platform connection flow.
- Decide whether the landing page CTA should move from "Coming Soon" to an auth entry.
- Fix Start/Sit signal display so `high | medium | low` weights render correctly.
- Keep backend contracts and handoff files synchronized after each integration step.

### Done when

- Waiver Wire consumes the platform-centric backend contract.
- Live Omen responses are clearly attributed without looking like mock data.
- Expired Yahoo tokens produce a recoverable user path.
- Landing CTA reflects the actual app readiness.
- Frontend and backend handoffs agree on the current contracts.

---

## NEXT — Draft Assistant

Goal: ship the first polished Omen experience.

Draft Assistant is free this year only and is the first impression for many users.

### Must include

- clean landing/entry path
- draft setup flow
- league/scoring format inputs where needed
- player recommendation surface
- explanation and confidence language
- loading/error/empty states
- mobile-friendly UX
- clear free-this-year positioning if surfaced publicly

### Engineering rule

Draft Assistant must reuse shared Omen layout, API conventions, types, state handling, and design language.

It should not become a standalone toy.

---

## NEXT — MVP Move / Omen of the Week

Goal: prepare the paid centerpiece after the backbone is stable.

### Must include

- platform-aware recommendation flow
- reliable disconnected/pending/live states
- clear recommendation object
- confidence, risk, evidence, and reasoning
- support for Yahoo, Sleeper, and ESPN before paid launch
- no false live-data claims

### Paid launch rule

Paid MVP Move launch is blocked until Yahoo, Sleeper, and ESPN support are acceptable for the promised experience.

---

## NEXT — Supporting Tools

Supporting fantasy tools strengthen trust and retention.

- Trade Analyzer
- Start/Sit
- Waiver Wire
- Roster insights
- Platform status

Trade Analyzer can remain free as a trust-building tool.

---

## LATER — Launch Hardening

Goal: reduce risk before NFL kickoff.

### Must include

- security review
- auth review
- ESPN storage/security review
- platform connection smoke tests
- production browser QA
- mobile QA
- Stripe/live payment review if paid features are enabled
- logging and error monitoring review
- final docs sync

---

## Explicitly Out Of Scope

The following are not active roadmap items for this Omen build phase:

- non-football sport products
- full league hosting
- full Slops Saloon media hub
- family/investment assistant
- unrelated AI agents
- content management systems
- broad community platform buildout

---

## Launch Doctrine

- Omen must feel trustworthy before it feels big.
- Backbone beats feature sprawl.
- The first free tool must make users believe the paid tool will be worth it.
- No placeholders pretending to be live features.
- No paid dependency without Justin approval.
