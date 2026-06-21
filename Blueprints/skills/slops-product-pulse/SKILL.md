---
name: slops-product-pulse
description: Time-windowed product report (24h / 7d / 30d) on usage, performance, errors, and user followups. Harvested from EveryInc/compound-engineering's /ce-product-pulse. Pairs with self-hosted-observability-runbook once it ships data.
status: active
skill_type: simple
layer: 0
default_agent: Claude
trigger: "product pulse | 24h pulse | weekly pulse | what did users do this week | how is production behaving"
version: 0.1.0
owner: Justin
---

# Slops Product Pulse (PROPOSAL)

## When to Use
Daily / weekly / monthly check on what real users experienced. Replaces "I'll just check Sentry and Umami and stitch it together in my head."

## Scope
Generate a single-page time-windowed pulse: usage (Umami), errors (Sentry-self-hosted), perf (latency p50/p95), and a "what users tried to do but couldn't" section pulled from error patterns. Saved to `<product>/docs/pulse-reports/<date>-<window>.md`. Past pulses form a browseable timeline that the next sprint planning and the next strategy update anchor to.

## Required Inputs
- Product name.
- Time window (24h / 7d / 30d).
- Observability stack endpoints (Sentry self-hosted URL, Umami URL).

## Outputs
- `<product>/docs/pulse-reports/<date>-<window>.md`

## Does NOT
- Make product decisions — surfaces signal, Justin decides.
- Pull data from paid SaaS (relies on self-hosted observability stack only).
- Run automatically — Justin or Codex invokes it. No silent cron without explicit approval.

## Replaces / Complements
- Net-new. Complements `self-hosted-observability-runbook` (which makes the data available) and `slops-retro` (which is sprint-end, this is rolling).
- Harvested from compound-engineering's `/ce-product-pulse` pattern — not the implementation.

## Verification
- Requires `self-hosted-observability-runbook` to be live first; until then, the skill is parked.
- Success signal: every section names its source (Sentry/Umami) and the query/window used.

## Changelog
- 0.1.0 — initial proposal (2026-06-11), approved by Justin (harvest call).
