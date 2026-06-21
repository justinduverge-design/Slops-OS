---
name: slops-data-ingest-plan
description: Plan a data-ingest / ETL sketch before Codex builds. Converted from engineering-data-engineer-advisor agent. Pairs with future live-data-adapter-template.
status: active
skill_type: simple
layer: 0
default_agent: Claude
trigger: "plan a data ingest | ETL sketch | adapter design | live-sync plan"
version: 0.1.0
owner: Justin
---

# Slops Data Ingest Plan (PROPOSAL)

## When to Use
Before building a new data adapter (provider integration, scheduled job, webhook receiver). Required gate for any external-data pull.

## Scope
Produce an ingest sketch: source, auth model, rate limits, schema mapping to Slops canonical entities (nflverse player IDs for fantasy products), idempotency strategy, backoff + retry, ToS check, sovereignty fit. Output is a spec, not code.

## Required Inputs
- Source name + docs URL.
- Frequency (real-time / hourly / daily).
- Auth requirements.

## Outputs
- `Blueprints/specs/<product>-<source>-ingest.spec.md`

## Does NOT
- Write the adapter code (Codex via the loop).
- Vendor proprietary data without ToS clearance — routes through `pre-build-research`.

## Replaces / Complements
- Replaces candidate agent `engineering-data-engineer-advisor`.
- Complements `pre-build-research`, future `live-data-adapter-template`.

## Verification
- Signal: every ingest names ToS status, rate-limit math, and idempotency strategy explicitly.

## Changelog
- 0.1.0 — initial proposal (2026-06-11).
