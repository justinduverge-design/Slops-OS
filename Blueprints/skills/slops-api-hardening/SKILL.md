---
name: slops-api-hardening
description: Score a backend route or service against quality attributes that passing tests do not cover — query efficiency, latency budget, caching, timeout/retry/circuit-breaker discipline, idempotency, and error taxonomy. Use when a backend is correct but was built to a tolerable rather than a good standard, before a load event, or when deciding where backend effort actually pays. Produces a per-route scored rubric so "tolerable" becomes a number that can be watched moving. Reviews and recommends; fixes route back through the build loop.
status: draft
skill_type: simple
layer: 0
default_agent: Claude scores and recommends; the executor implements approved fixes via the loop
trigger: "api hardening | is this route production ready | backend quality pass | why is this slow | pre-load-event backend check"
version: 0.1.0
upstream: none
owner: Justin
---

# Slops API Hardening

## Purpose

A backend can be well-tested and still be fragile. Omen's is the case in point: 21 route modules,
36 services, and roughly 100 test files — **correctness coverage is genuinely good.** What has no
gate is everything correctness does not touch, and that is where a first real load event does its
damage.

**The founder's framing:** *"a lot of the back end was built to a tolerable point and not to the
best of its capabilities."* This skill turns that instinct into a per-route score, so the gap is
visible, rankable, and watchable rather than a feeling.

Deliberately narrow: it does **not** hunt for bugs. `slops-code-review` does that.

## When to Use

- Before a known load event. For a fantasy product, NFL Week 1 is that event.
- When a route is correct but slow, or its behaviour under failure is unknown.
- When deciding where backend effort pays, rather than guessing.
- On a route touching a third-party provider — pair with `slops-provider-resilience`.

## Do Not Use

- To find correctness bugs — `slops-code-review`.
- To fix what it finds. This scores; fixes become loop items.
- To run a load test — that is an ops action needing approval. This reads the code and the
  existing evidence; it can *recommend* a load test.
- To touch production, a database, or a deploy.

## Required Inputs

- The routes or services in scope, by path.
- The schema (`sql/`) for any route that queries.
- Existing load or latency evidence, if any.
- The traffic shape expected — a route serving a Sunday-morning spike is judged differently from
  one serving a weekly cron.

## Preconditions and Dependencies

Read-only source access. No runtime, no install, no production access, no credentials.

Latency numbers must come from **existing recorded evidence** — a prior load rehearsal, an APM
trace. **Never estimate a latency figure and present it as measurement.** Where no evidence
exists, the row is `UNMEASURED`, which is itself a finding.

## Read-First Procedure

1. The route or service in scope.
2. Its tests — they reveal the intended contract and, by omission, what was never considered.
3. The schema for tables it touches, and the indexes that exist.
4. Any recorded load or latency evidence.
5. `Direction/known_issues.md` for known gaps on this path.
6. Only the routes in scope. Do not sweep the whole backend in one pass — a rubric nobody reads is
   not a gate.

## The rubric

Seven axes. Each scored **0 (absent) / 1 (partial) / 2 (solid)**, with evidence per score.
A score without a cited line or file is not a score.

| # | Axis | What earns a 2 |
|---|---|---|
| 1 | **Query efficiency** | No N+1. Every filter and join column indexed. No unbounded result set. Pagination where the set can grow. |
| 2 | **Latency budget** | A stated p95 budget for the route, and measured evidence it is met. `UNMEASURED` scores 0 regardless of how fast it looks. |
| 3 | **Caching** | A deliberate decision — cached with a stated TTL and invalidation, or explicitly not cached with a reason. Absence of thought scores 0. |
| 4 | **Failure discipline** | Every outbound call has a timeout. Retries are bounded, backed off, and only on retryable errors. A dependency that can hang has a breaker or a deadline. |
| 5 | **Idempotency** | Writes are safe to retry. A duplicate submission cannot double-apply. Stated, not assumed. |
| 6 | **Error taxonomy** | Failures are typed and distinguishable — a provider outage does not surface as a validation error. Nothing leaks a credential, cookie, token, or internal path. |
| 7 | **Degradation** | A named behaviour when a dependency is unavailable, and it is honest to the user. Silent fallback to stale or mock data presented as live scores **0 and is a P0 finding**. |

Route score is the sum, 0–14. **The number is only meaningful next to the evidence**, so the
report always carries both.

## Process Recipe

1. Confirm scope. A handful of routes, not the whole backend.
2. Establish the traffic shape and the load event being prepared for.
3. Score each route on all seven axes, citing a file and line, or `UNMEASURED`.
4. Rank findings by **impact under the expected load**, not by score. A 0 on caching for a route
   nobody calls outranks nothing.
5. For each finding worth fixing, write the smallest change that moves the axis, and say which
   axis it moves.
6. Record the total per route so a later pass can see movement.
7. Route anything larger than a local fix through `slops-intent-capture`, not into a widened PR.

## Output Contract

`Direction/reviews/YYYY-MM-DD-api-hardening-<scope>.md`, containing: the scored table per route,
evidence per score, ranked findings with proposed minimal fixes, every `UNMEASURED` axis and what
measurement would settle it, and what was deliberately not scored.

## Verification

- **Smoke test:** score one route. If two people scoring the same route from the same evidence
  disagree by more than one point on an axis, the rubric wording is the defect, not the route.
- **Success signal:** every axis carries evidence or `UNMEASURED`. **A fully-scored route with no
  citations is a fabricated report** and must be discarded.
- **Over time:** the same route re-scored after fixes shows movement. That is the point.

## DBS Routing

Reports → `Direction/reviews/`. A finding that changes architecture → an intent. A finding that is
a live defect → `known_issues.md`. A latency budget, once agreed → the API contract in
`Blueprints/api-routes.md`, not left in a review.

## Agent and RBAC Rules

Read-only. No production, no database, no deploy, no load generation. Findings become loop items
through the normal gates; this skill has no authority to implement them.

## Failure Modes

- **Estimating a latency number and reporting it as measured.** The most damaging failure here —
  it manufactures false confidence in exactly the place the skill exists to remove it.
- Scoring an axis without citing evidence.
- Scoring the whole backend at once, producing a document nobody reads.
- Ranking by score instead of by impact under load.
- Proposing a rewrite where an index would do.
- Treating good test coverage as evidence for any axis. Correctness is not resilience.
- Missing that a fallback presents mock data as live — that is trust-critical, not a performance
  note.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: which axis was hardest to score consistently, which finding
predicted a real incident, and which scored fix did not move the number.

## Changelog

- 0.1.0 — initial. Seven-axis rubric, evidence-required scoring, `UNMEASURED` as a first-class
  score.
