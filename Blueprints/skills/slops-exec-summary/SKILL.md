---
name: slops-exec-summary
description: Convert raw progress/data into a 1-pager exec summary in the internal-comms house style. Converted from support-executive-summary-generator agent.
status: active
skill_type: simple
layer: 0
default_agent: Claude
trigger: "summarize for exec | leadership update | 1-pager | board-style summary"
version: 0.1.0
owner: Justin
---

# Slops Exec Summary (PROPOSAL)

## When to Use
Compressing a sprint, an incident, a launch readiness check, or a metrics review into a 1-pager Justin can forward without editing.

## Scope
Produce a fixed-shape 1-pager: TL;DR, what shipped, what slipped, what's next, asks. Uses `internal-comms` plugin skill as substrate. Tone: institutional but human (per brand voice).

## Required Inputs
- Source material (sprint notes, decision log, metrics dump, handoff).
- Audience (Justin only / Justin + Slops Saloon stakeholders / public-facing).

## Outputs
- `Solutions/reports/<date>-summary-<topic>.md`

## Does NOT
- Make binding commitments.
- Generate metrics it can't source.

## Replaces / Complements
- Replaces candidate agent `support-executive-summary-generator`.
- Complements `internal-comms`, `operations:status-report`, `product-management:stakeholder-update`.

## Verification
- Length cap: 1 page. If it spills, split.

## Changelog
- 0.1.0 — initial proposal (2026-06-11).
