---
name: slops-legal-spot-check
description: Pre-counsel triage on a draft document, copy, or product behavior — flag compliance risk before it ships. Converted from agent support-legal-compliance-checker.
status: draft
skill_type: simple
layer: 0
default_agent: Claude
trigger: "spot legal risk | compliance check this | pre-counsel triage | flag legal concerns"
version: 0.1.0
owner: Justin
---

# SLOPS Legal Spot Check (PROPOSAL)

## When to Use
Before sending a draft to counsel, before publishing copy that makes claims, before shipping a feature that touches user data, payments, gambling, or third-party data rights.

## Scope (one paragraph)
Triage-only pass over a draft. Flags claims that need substantiation, missing disclaimers, regulatory landmines (gambling, payments, biometric, HIPAA, CAN-SPAM, GDPR, CCPA, COPPA), and third-party ToS conflicts. Output is a severity-ranked memo: P0 = do not ship without counsel, P1 = counsel recommended, P2 = draft revision sufficient. Pairs with `compliance-by-template` (template-driven drafting) and `legal:triage-nda` (NDA-specific path).

## Required Inputs
- Draft doc / copy / feature spec.
- Product context (consumer vs B2B, US-only vs international, free vs paid).

## Outputs
- `Direction/reviews/<date>-legal-spot-check-<topic>.md` with P0/P1/P2 findings.

## Does NOT
- Provide legal advice (it is not a lawyer).
- Approve documents for publication.
- Replace counsel review for any P0 / P1 item.

## Replaces / Complements
- **Replaces** the candidate agent `support-legal-compliance-checker` (per agent-conversion plan).
- **Complements** `compliance-by-template`, `legal:review-contract`, `legal:compliance-check`.

## Verification
- Success signal: every flagged item names the specific clause/sentence and the regulation or risk vector it triggers.

## Changelog
- 0.1.0 — initial proposal scaffold (2026-06-11), converted from support-legal-compliance-checker agent.
