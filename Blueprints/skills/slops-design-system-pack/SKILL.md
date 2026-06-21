---
name: slops-design-system-pack
description: Vetted DESIGN.md files (Linear, Stripe, Vercel, Anthropic, etc.) harvested from open-design + awesome-claude-design. Lets slops-ui-ux-audit compare against a target system.
status: active
skill_type: package
layer: 0
default_agent: Claude (curate), Codex (file writes)
trigger: "use design system X | match Stripe aesthetic | scaffold UI from DESIGN.md | drop in design system"
upstream: nexu-io/open-design + VoltAgent/awesome-claude-design (markdown-only, no code)
version: 0.1.0
owner: Justin
---

# Slops Design System Pack (PROPOSAL)

## When to Use
Scaffolding a new product UI, picking a target aesthetic, or running `slops-ui-ux-audit` in "compare against system X" mode.

## Scope
Curate 5-10 DESIGN.md files into `Blueprints/skills/slops-design-system-pack/systems/` from the open-design (150 systems) and awesome-claude-design (68 systems) catalogs. Pin source commits. Mark which systems are Slops-vetted vs reference-only. Pair with `slops-ui-ux-audit` for compare-mode.

## Required Inputs
- Target product + desired aesthetic direction (one sentence).

## Outputs
- `systems/<name>.md` (one file per vetted system) — Anthropic, Linear, Stripe, Vercel, Notion as starter set.
- `systems/INDEX.md` — which system is Slops-vetted, which is reference-only, with source commit hashes.

## Does NOT
- Fork or rehost the upstream repos (sovereignty: vendor markdown only, never code).
- Replace `slops-ux-copy` for voice or `slops-ui-ux-audit` for the actual audit pass.
- Lock Corvus into one system — it's a starting point, not a constraint.

## Replaces / Complements
- Complements `slops-ui-ux-audit`. Net-new.

## Verification
- Pinned commit hash present for every vendored DESIGN.md.

## Changelog
- 0.1.0 — initial proposal (2026-06-11).
