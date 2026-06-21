---
name: slops-financial-sketch
description: Sanitized financial scenario planning — unit economics, runway, monetization sensitivity. Never touches live books. Converted from finance-financial-analyst + finance-fpa-analyst agents.
status: active
skill_type: simple
layer: 0
default_agent: Claude
trigger: "sketch unit economics | scenario plan | runway estimate | monetization sensitivity"
version: 0.1.0
owner: Justin
---

# Slops Financial Sketch (PROPOSAL)

## When to Use
Pricing a feature, sizing a market hypothesis, stress-testing the Year 1 free strategy, or planning when to introduce paid tiers.

## Scope
Sanitized scenario planning only — uses provided assumptions, never queries live financial systems. Output: a structured what-if (best/base/worst), the key sensitivities, and the threshold at which a decision changes.

## Required Inputs
- The decision being sized.
- Cost + revenue assumptions Justin provides.

## Outputs
- `Direction/reviews/<date>-financial-sketch-<topic>.md`

## Does NOT
- Touch live books, banking, tax, payroll, or any official forecast.
- Make pricing decisions — that's Justin.
- Replace counsel for tax or regulatory questions.

## Replaces / Complements
- Replaces candidate agents `finance-financial-analyst` + `finance-fpa-analyst`.
- Complements `product-management:write-spec` (for paywall-feature specs).

## Verification
- Signal: every number traces to an explicit assumption or source line.

## Changelog
- 0.1.0 — initial proposal (2026-06-11).
