# app-strategy-critic-review

## Status

Captured.

## Classification

SPEC ONLY input.

This review critiques app strategy research and informs the decision/spec files. It does not authorize implementation.

## What Looks Strong

- The research correctly separates AI-assisted prototyping from production-grade engineering.
- It identifies that StoreKit, Play Billing, geofencing, security, and compliance cannot be safely delegated to app-builder output.
- It flags weak signal quality in generic sports social sentiment.
- It recognizes Sunday traffic spikes and the risk of backend lock-in.

## Weak Assumptions

### Blockchain Verification

Public blockchain roster verification is too heavy for the current trust problem.

A server-side tamper-evident audit log, signed roster snapshot, or chained PostgreSQL record may provide enough integrity proof without gas fees, wallet UX, or block-time latency.

### Scraping For Production Data

Firecrawl-style scraping can support research and prototypes, but it is fragile for production sports recommendations.

Official APIs should be preferred for decision-critical data. If scraping is used, it needs validation, fallback behavior, and visible uncertainty states.

### Model Version Specificity

The research referenced speculative model-version names.

Future specs should describe capability classes instead, such as low-latency recommendation model, frontier reasoning model, or local fallback model.

## Research Gaps

### App Store Review

The strategy needs Apple and Google policy review before any paid fantasy mechanic or native distribution path is chosen.

Paid contests, game-of-skill framing, billing rules, and platform approval can block launch.

### API Economics

The strategy needs cost and rate-limit planning for sports data.

High-frequency polling during games can become expensive and brittle unless paired with caching, fanout, and freshness rules.

### Geo-Compliance

Paid or restricted fantasy mechanics may require jurisdiction-aware access controls.

No geofencing implementation should begin until the distribution path and legal requirements are known.

## Complexity Bias

### Automated UI Shortcut

Design skills can guide UI quality, but high-impact mobile animation and native-feeling transitions still require manual performance review.

Do not assume prompt-generated UI will meet production performance standards without QA.

### Multi-Agent Draft Assistant

Live draft rooms have hard time limits.

Slow reasoning loops can fail inside a 60-second pick clock. Draft Assistant should separate pre-draft deep analysis from live low-latency recommendation paths.

## Effectiveness Review

Overall rating:

Moderate-value research.

The research builds a useful conceptual framework, but it over-indexes on blockchain and under-indexes on app store and compliance realities.

Recommended action:

Reduce.

Strip out blockchain implementation, downgrade scraping to prototype or secondary enrichment, and focus on modular architecture, data source reliability, distribution, compliance, and latency.

## Biggest Risk

App store or legal rejection could block distribution if paid fantasy mechanics are pursued without legal, app store, and geo-compliance review.

## Missing Decision

PWA vs native distribution is the next required decision.

That decision changes billing, compliance, geofencing, mobile performance, app store review, and release workflow.

## DBS Routing

```text
Direction/reviews/app-strategy-critic-review.md
Direction/decisions/app-strategy-decision.md
Blueprints/specs/app-strategy.spec.md
References/patterns/ai-app-development-patterns.md
```
