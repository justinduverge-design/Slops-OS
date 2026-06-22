---
name: slops-community-needs-research
description: Future-product workflow for researching community needs, existing resources, and verified service or information gaps. Parked until Justin explicitly starts the post-Corvus community-product discovery phase; prioritizes consent, privacy, freshness, dissent, and measurable help.
status: parked
skill_type: simple
layer: Layer 0
default_agent: Claude researches and synthesizes; Codex writes approved artifacts or validates data flows
trigger: explicitly start future community-product discovery after Corvus baseline work
version: 0.2.0
upstream: Adapted from coreyhaines31/marketingskills customer-research and community-marketing (MIT), inspected 2026-06-21
owner: SLOPS
---

# Slops Community Needs Research

## Purpose

Ground community-facing products in verified needs, current resources, and direct community evidence. Replace lead/revenue optimization with verified help, reach, response time, resource freshness, accessibility, and harm reporting.

## When to Use

- Only when Justin explicitly opens the future community-product discovery phase after Corvus baseline work.
- Before designing an app that informs a community or connects people to necessities.
- Map existing services, eligibility, hours, language/accessibility support, and failure points.
- Validate whether an information problem, coordination problem, or actual service-capacity gap exists.

## Do Not Use

- During current Corvus delivery or post-live Corvus learning work.
- Scrape, profile, rank, or target vulnerable people.
- Promise aid, eligibility, availability, safety, or response times that providers have not verified.
- Contact communities or providers, publish results, or collect personal data without approval and consent.
- Treat engagement, leads, or revenue as proof that people were helped.

## Required Inputs

- Community, geography, time window, and need category.
- Intended users and affected non-users, especially people facing access barriers.
- Existing resource directories, public data, provider information, and known community organizations.
- Decision the research must support and the harm/privacy constraints.

## Preconditions and Dependencies

- Research is read-only unless outreach or data collection is separately approved.
- Activation gate: Justin names a community, geography, need category, and decision the research must support.
- Current provider details must include a verification date and source.
- Sensitive information is minimized, consented, purpose-limited, and never included in public artifacts.

## Process Recipe

1. Define the decision, population, geography, need, exclusions, and what “helped” means.
2. Map stakeholders: residents, mutual-aid groups, providers, government, advocates, and people excluded by digital, language, disability, documentation, or transportation barriers.
3. Inventory existing resources before proposing a product; record service, eligibility, hours, capacity signal, accessibility, language, contact method, source, and last verification.
4. Gather evidence from at least two modes where feasible: public/administrative data, direct community input, provider input, observation, or existing research.
5. Separate expressed need, observed behavior, provider constraint, information gap, coordination gap, and service-capacity gap.
6. Preserve disagreement and minority reports; do not average away high-harm experiences.
7. Rank opportunities by severity, frequency, reach, feasibility, evidence confidence, and harm if wrong.
8. Propose the smallest test that can disconfirm the top assumption without collecting unnecessary personal data.
9. Define operating measures: successful referrals or verified resolutions, reach across access groups, response time, stale-resource rate, correction rate, unmet demand, and harm reports.
10. Route product ideas through `product-gap-analysis-session` or planning only after the research shows a real gap.

## Output Contract

Produce a dated community-needs memo with scope, methods, source ledger, resource inventory, needs/gaps, dissent and blind spots, privacy/harm review, ranked opportunities, disconfirming tests, success/guardrail metrics, and next safe step. Default path: `Direction/reviews/<date>-community-needs-research.md` when writing is approved.

## Verification

- Every resource has a source and verification date; stale or unconfirmed entries are labeled.
- Every priority distinguishes direct evidence from inference.
- At least one disconfirming test and one harm/guardrail metric are present.
- No personal or sensitive record is exposed in the output.
- A community member or trusted representative can correct the interpretation before product commitment.

## DBS Routing

- Cross-product method: this Layer 0 skill.
- Division-specific opportunity research: that division's `Direction/reviews/`.
- App requirements: the app's `Blueprints/specs/` only after approval.
- Raw public sources: `References/research/`; do not store raw sensitive interviews in the repo.

## Boundaries

- Outreach, surveys, interviews, incentives, publication, accounts, purchases, and data collection require explicit approval.
- Do not infer immigration status, health condition, income, housing status, or other sensitive traits.
- Provider capacity and eligibility can change; show freshness and uncertainty in the product contract.

## Failure Modes

- Building a directory before checking whether information already exists.
- Listening only to institutions or only to the easiest-to-reach residents.
- Converting people into marketing personas and optimizing engagement instead of help.
- Treating an information gap as a substitute for missing service capacity.
- Publishing stale availability or eligibility as current fact.

## Prior-Use Review Loop

Read `notes/prior-use-review.md` when present. Track which resources went stale, which groups were missed, which assumptions failed, and which metrics actually reflected help.

## Changelog

- 0.2.0 — Parked as a far-future product capability with an explicit founder activation gate.
- 0.1.0 — Initial consent/privacy-first community-needs workflow adapted from upstream customer and community research patterns.
