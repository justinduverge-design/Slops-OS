# Handoff — Slops Saloon Inheritance (Layer 1)

**Date:** 2026-06-11
**Layer:** 0 → 1 (inheritance pointer)
**Author:** Claude (acquisition session)
**For:** the Slops Saloon division layer when it next pulls from L0.

---

## Why This File Exists

The L0 acquisition session of 2026-06-11 produced new skills, a playbook, and an agent-retirement diff. Slops Saloon (L1) inherits all L0 doctrine but does NOT host implementation. This handoff names what L1 should KNOW exists at L0, not what L1 should COPY.

Per CLAUDE.md: "The division layer stays lean." No app implementation work belongs here.

---

## What L1 Inherits (just-in-time, by reference)

### New playbook
- `SLOPS/Blueprints/playbooks/proprietary-math-stack-playbook.md` — applies to every Slops Saloon product. **Action at L1:** add a one-line pointer in the division's portfolio doctrine so future products (post-Corvus) inherit the boundary automatically.

### New skills (proposals — not yet promoted)
- Active Week 1: `self-hosted-observability-runbook`, `mobile-first-qa-playbook`, `demo-mode-pre-empty-state`, `compliance-by-template`, `slops-legal-spot-check`.
- Active Week 2: `slops-design-system-pack`, `slops-image-prompt`, `slops-exec-summary`, `slops-ai-integration-review`, `slops-data-ingest-plan`, `slops-financial-sketch`, `slops-screenplay-loop`.
- **Action at L1:** none until L0 promotes them out of `_proposals/`. L1 reads `SKILL_ROUTING.md` and inherits whatever is active.

### Retired agents
- 11 wrappers shadowed by active SLOPS skills (see `_proposals/AGENT_INDEX-retirement-diff.md`).
- **Action at L1:** none — `AGENT_INDEX.md` is L0-canonical. L1 routes through it.

---

## What L1 Does NOT Do

- Does not copy skills into a `slops-saloon/Blueprints/skills/` folder. L1 reads from L0.
- Does not host product implementation. Corvus (L2) does that.
- Does not promote proposals — only Justin does, at L0.

---

## Recommended Next Prompt (when ready)

```text
Read SLOPS/Blueprints/handoffs/2026-06-11-slops-saloon-inheritance-handoff.md.
Update slops-saloon/Blueprints/portfolio-doctrine.md (or equivalent) with a
one-line pointer to SLOPS/Blueprints/playbooks/proprietary-math-stack-playbook.md.
Do not copy the playbook — link to it. No other changes at L1.
```

## Safest Next Step

Do nothing at L1 yet. Wait until Justin promotes the Week 1 proposals at L0; then a single pointer update at L1 suffices.
