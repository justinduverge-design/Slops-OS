# SLOPS OS Roadmap

**valid-as-of:** 2026-09-12
**Scope:** the operating-system layer only. Product and app work lives in `slops-saloon/omen/`.

> **Read Omen's `CLAUDE.md` before treating anything here as product truth.** This file governs
> L0. When the two disagree about the product, Omen wins and this file is the defect.

## Product posture this layer must not contradict

Recorded because the previous version of this file contradicted all four for roughly six weeks,
and L0 is what a cold session reads first.

- Omen is a **mobile app** — iPhone SwiftUI and Android Kotlin/Compose. The native pivot is active
  authority; the web app is secondary and new web page migrations are paused.
- Omen is **free indefinitely.** No Stripe, subscription, or paywall code exists. Nothing at this
  layer tracks billing.
- **Draft Assistant is cut from 1.0** (2026-08-05); it ships for the 2027 fantasy draft on a
  Slops-built ADP.
- A **TestFlight external beta is live** with real testers. *(2026-09-12; falsified by the cohort
  closing or the build being pulled.)*

## Now

- Keep `README.md`, `DBS_INDEX.md`, `RESOLVER.md` and `Direction/context.md` agreeing on the
  three-layer route, with no contradicting path or layer claim.
- Keep SLOPS-authored skills canonical under `Blueprints/skills/`, reachable via
  `Blueprints/tools/skill-link/link-skills.mjs`, and routed by `SKILL_ROUTING.md`.
- Run the Truth Gate before any close-out. It currently reports **147 P0** against live surfaces,
  concentrated in Omen's append-only logs — the standing backlog, not a clean tree.
- Roll `valor-brain/v1` beyond its pilot. Eleven pages are opted in; the contract, schema and
  validator have been ratified since 2026-08-20.
- Resolve `OS1` — the last open call is deleting the 18 agent wrappers named in
  `Direction/decisions/2026-09-12-agent-wrapper-disposition.md`.

## Next

- Convert the 6 wrappers named for conversion; fold the 5 that are already covered.
- Author the native design-authoring skill. Every design skill in the library audits; none composes,
  which is the gap behind the remaining native UI work.
- Extend `freshness` triggers to cover environmental claims — host machine, OS, tooling — so a
  claim like "no macOS build host" cannot outlive its truth a third time.
- Add prior-use notes to high-use skills once the library is actually being invoked.

## Later

- Promote imported agents only through reviewed, least-privilege wrappers.
- Add new SLOPS skills only when a workflow repeats enough to justify it.
- Keep root OS docs focused on reusable operating doctrine.
- Let each product repo maintain its own code, tests, deployment, and product docs.

## Out Of Scope

- Omen app source edits from this layer.
- Secrets or credentials.
- Deployment and infrastructure changes.
- SQL, package files, tests, or Docker config.
- Archive or quarantine cleanup without a separate review.

## Superseded 2026-09-12

The prior version tracked a Stripe subscription surface, an "Omen launch approval checkpoint"
framed around a web deploy, and "Omen backend handoff Requests 13-18 as locally advanced as of
2026-05-27" — and never mentioned the native pivot. All of it was false by 2026-08-05 and stayed in
the live tree. Recorded here rather than deleted quietly, because the failure mode is the point: a
correction written where it was discovered and not where it was asserted.
