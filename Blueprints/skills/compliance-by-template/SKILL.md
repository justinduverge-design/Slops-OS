---
name: compliance-by-template
description: Draft launch-required legal docs (ToS, Privacy Policy, DPA, NDA, GDPR/CCPA pages) using open-agreements templates + AI-drafted custom paragraphs. Self-hosted, signable DOCX output. Replaces Termly for the Slops sovereignty rule.
status: active
skill_type: wrapper
layer: 0
default_agent: Claude (draft), Justin (review), Codex (file writes)
trigger: "draft ToS | draft privacy policy | DPA | compliance checklist | launch legal pack | NDA"
upstream: open-agreements@latest
version: 0.1.0
owner: Justin
---

# Compliance-by-Template (PROPOSAL)

## When to Use
A Slops product needs launch-required legal documents and does NOT yet warrant paid counsel. Pairs with `slops-legal-spot-check` (triage) and the `legal:*` plugin skills (review-contract, triage-nda).

## Scope (one paragraph)
Wrap the `open-agreements/open-agreements` repo (MIT, GitHub) as the canonical SLOPS legal-template source. The skill produces signable DOCX from Common Paper standard forms (employment, IP assignment, NDA, DPA, GDPR/HIPAA/BAA), plus AI-drafted custom paragraphs for product-specific clauses (data collection scope, AI use disclosure, fantasy sports T&Cs). All output is reviewed by Justin and, for paid-tier products, by counsel before public launch.

## Preconditions
- Clone `open-agreements` to `References/legal-templates/open-agreements/` (Justin runs the clone — install boundary).
- `pandoc` and `docx` writer installed on the workstation.

## Required Inputs
- Product name + product description + entity (LLC) name.
- Data collected from users (for the privacy policy section).
- AI usage disclosure (which LLMs, what data leaves the box).

## Outputs
- `<product>/Legal/draft-tos.docx`
- `<product>/Legal/draft-privacy-policy.docx`
- `<product>/Legal/draft-dpa.docx` (if B2B)
- `<product>/Legal/checklist.md` — every doc needed for launch with escalation flags ("counsel required" / "AI-draft OK") next to each.

## Does NOT
- Replace counsel for regulated activities (gambling, payments, health data).
- Publish documents — Justin signs and uploads.
- Edit the open-agreements templates upstream — only consumes them.
- Use paid SaaS (no Termly, no PrivacyPolicies.com, no iubenda).

## Replaces / Complements
- **Replaces** the parked "Termly + custom paragraphs" pattern from Session 1.
- **Complements** `slops-legal-spot-check` (pre-counsel triage) and `legal:review-contract` (vendor-side review).

## Verification
- Success signal: every checklist item produces a draft file or names the counsel ask.
- Escalation: any clause involving payments, gambling, biometric, or health data routes to counsel — flagged automatically by the spot-check pass.

## Changelog
- 0.1.0 — initial proposal scaffold (2026-06-11), open-agreements approved as Termly replacement.
