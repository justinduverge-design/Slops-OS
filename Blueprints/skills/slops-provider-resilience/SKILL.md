---
name: slops-provider-resilience
description: Audit a third-party provider integration for the failure modes that only appear in production — contract drift, outage behaviour, quota and backoff accounting, token expiry, and honest degradation. Use before a load event, after a provider changes an API, when an integration works on a happy path but its failure behaviour is unknown, or when a connection reads healthy while its data path is broken. Produces a per-provider failure matrix with recorded fixtures. Reviews and recommends; it does not call provider APIs with real credentials.
status: draft
skill_type: simple
layer: 0
default_agent: Claude audits and specifies fixtures; real-account execution is founder-gated
trigger: "provider resilience | what happens when espn goes down | provider contract drift | integration failure matrix | provider audit"
version: 0.1.0
upstream: none
owner: Justin
---

# Slops Provider Resilience

## Purpose

A product built on someone else's undocumented API inherits their outages, their schema changes,
and their quotas — none of which appear on the happy path a test suite exercises.

Omen runs four provider adapters (ESPN, Yahoo, Sleeper, nflverse) plus a cron. On a Sunday every
one of them is load-bearing simultaneously. This is the largest concentration of risk in the
product and it has no gate.

**The specific class of failure this catches** is already in Omen's record: a connection row
reported `yahoo: connected, 1 league` while the underlying OAuth token was expired or its secret
reference was missing — so the integration looked healthy at exactly the layer anyone would check,
and the data path was dead. **Health at the connection layer is not health at the data layer**, and
nothing was watching the gap.

## When to Use

- Before a load event where every provider is exercised at once.
- After a provider changes an API, or an integration starts failing intermittently.
- When failure behaviour is unknown — which is different from believed-good.
- When a connection reads healthy but data does not arrive.
- Alongside `slops-api-hardening` for a provider-backed route.

## Do Not Use

- To make live provider calls with real credentials. **Real-account execution is founder-gated**
  and belongs to the real-account QA items, not here.
- To handle, echo, or store any credential, cookie, token, or secret reference.
- To fix what it finds. Findings become loop items.
- For a first integration with a new provider — that is `pre-build-research`.

## Required Inputs

- The adapter and its service, by path.
- Recorded fixtures, if any.
- The provider's documentation status: officially documented, community-reverse-engineered, or
  undocumented. **This changes the entire risk posture** and must be stated.
- Known past failures for this provider.

## Preconditions and Dependencies

- Read-only source access.
- **No credentials.** The audit reads code, fixtures, and error paths. It never authenticates.
- Fixture capture from a real account is founder-executed and must be sanitized before it lands in
  the repo.

## Read-First Procedure

1. The adapter and its service.
2. Its tests and fixtures — fixtures reveal what the response actually looked like the day they
   were captured, which is the only real contract an undocumented API has.
3. Its error paths, and what they surface to the user.
4. `Direction/known_issues.md` and prior reviews for this provider.
5. The cron path, if the provider is on it. A provider failure inside a scheduled job fails
   silently unless something is watching.

## The failure matrix

Audit each provider against every row. Each is `HANDLED` / `PARTIAL` / `UNHANDLED` / `UNKNOWN`,
with the file and line that handles it — or the absence that does not.

| # | Failure | The question it answers |
|---|---|---|
| 1 | **Provider down** (5xx, timeout, DNS) | What does the user see? Is it honest? |
| 2 | **Auth expired** (token, cookie, session) | Is it distinguished from "not connected", and is re-auth offered? |
| 3 | **Auth valid, entitlement revoked** | Does it read as a bug or as an actionable state? |
| 4 | **Contract drift** — field renamed, removed, retyped | Is it detected, or silently coerced to null and rendered as real? |
| 5 | **Empty vs. missing** — legitimately empty vs. failed fetch | Are they distinguishable? Conflating them is how "0 points" gets shown as fact. |
| 6 | **Rate limit / quota** | Is the limit known, counted, and backed off — or discovered by being blocked? |
| 7 | **Partial response** — some entities, not all | Is partial data labeled, or presented as complete? |
| 8 | **Slow but alive** | Is there a deadline, or does a slow provider hang the request? |
| 9 | **Boundary conditions** — week rollover, season transitions, off-season | Omen's own record shows a clamped week value being read as a fact about the world. |
| 10 | **Silent cron failure** | Does a failed scheduled fetch alert, or just not happen? |

Rows 4, 5, and 7 share one consequence and it is the most serious in the product: **presenting
degraded or absent provider data as live advice.** Any `UNHANDLED` there is P0 and trust-critical,
regardless of the rest of the matrix.

## Process Recipe

1. Scope one provider. Four at once produces a document nobody acts on.
2. State the documentation posture. An undocumented API means every field is a contract that can
   change without notice, and the fixture is the only record of what it was.
3. Walk all ten rows against the code. Cite the handler, or record its absence.
4. **Check the health-vs-data gap explicitly.** For each "connected" signal the product shows, ask
   what it actually proves. If it proves a row exists rather than that data flows, that is the
   Yahoo failure waiting to recur.
5. Specify the fixtures needed to make drift detectable: what to capture, and what must be
   sanitized out before it lands in the repo.
6. Rank findings by user-visible consequence, with trust-critical first.
7. Propose the smallest change per finding.

## Output Contract

`Direction/reviews/YYYY-MM-DD-provider-resilience-<provider>.md`, containing: documentation
posture, the ten-row matrix with citations, the health-vs-data analysis, fixture specifications,
ranked findings, and every `UNKNOWN` with what would resolve it.

## Verification

- **Smoke test:** for one `HANDLED` row, trace the path from the failure to what the user sees. If
  that cannot be traced end to end, the row is `UNKNOWN`, not `HANDLED`.
- **Success signal:** every row cites a handler or records an absence. **No row may be marked
  `HANDLED` on the strength of a test name** — a test proves a path exists, not that its user-facing
  behaviour is honest.
- Trust-critical rows (4, 5, 7) get traced individually, always.

## DBS Routing

Reports → `Direction/reviews/`. Sanitized fixtures → the adapter's existing fixture location.
Architectural findings → an intent. Live defects → `known_issues.md`. A resolved provider
behaviour worth standing on → `facts-of-record.md`.

## Agent and RBAC Rules

Read-only, no credentials, no live provider calls, no production. Real-account verification is
founder-gated and is a different item.

**Absolute:** no credential, cookie, token, or secret reference appears in any output of this
skill — including in a quoted error message or a fixture excerpt.

## Failure Modes

- **Marking a row `HANDLED` because a test exists.** The test proves the code runs, not that the
  user is told the truth.
- Auditing four providers in one pass.
- Missing the health-vs-data gap — the documented Yahoo failure.
- Treating an undocumented API's current shape as a contract.
- Leaking a credential or cookie into a report or fixture.
- Conflating empty with missing, in the audit itself.
- Ignoring the cron path because it is not user-facing. A silent scheduled failure is worse than a
  loud one.
- Recommending a retry where the real problem is that the failure is invisible.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: which row caught a real production failure, which `UNKNOWN`
stayed unknown, and every case where a "connected" signal proved not to mean data flows.

## Changelog

- 0.1.0 — initial. Ten-row matrix; health-vs-data gap promoted to an explicit step after the Yahoo
  token case; rows 4/5/7 designated trust-critical.
