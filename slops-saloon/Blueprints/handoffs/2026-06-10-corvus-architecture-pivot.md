# Slops Saloon Handoff — Corvus Architecture Pivot 2026-06-10

**Layer:** 1 — Slops Saloon division
**Author:** Claude planning session (Justin in the loop)
**Status:** Division-level record; full detail at the Corvus product layer

---

## Division Decisions Made

1. **No new division-level work.** This pivot is entirely scoped to the Corvus product. No future products are being scaffolded as part of this change.
2. **Division stance on Corvus monetization holds.** Free Year 1 across all platforms. Monetization (Sleeper-first) returns in Year 2 per [Direction/business-launch-foundation.md](../../Direction/business-launch-foundation.md) — unchanged.
3. **Division stance on ESPN holds.** ESPN is high-value and high-risk. Recovery playbooks remain authoritative at [corvus/Blueprints/playbooks/espn-recovery.md](../../corvus/Blueprints/playbooks/espn-recovery.md). The pivot's "behind launch readiness" stance for ESPN live draft tracking respects this — we ship the riskier feature when we can support it well, not on a deadline.
4. **Tooling sovereignty preserved.** Self-hosted Umami over Plausible/PostHog cloud. SaaS Sentry free tier as the one explicit SaaS dependency for solo-builder velocity. Termly templates over lawyer engagement at launch.

---

## What Routes to Corvus

Everything operational from this pivot lives at the Corvus product layer:

- Full record: [corvus/Blueprints/handoffs/2026-06-10-product-architecture-pivot.md](../../corvus/Blueprints/handoffs/2026-06-10-product-architecture-pivot.md)
- Updated sprint: [corvus/Direction/current_sprint.md](../../corvus/Direction/current_sprint.md)
- Updated roadmap: [corvus/Direction/roadmap.md](../../corvus/Direction/roadmap.md)
- Updated decisions: [corvus/Direction/decision_log.md](../../corvus/Direction/decision_log.md)
- Codex kickoff: [corvus/Blueprints/prompts/codex-architecture-pivot-kickoff.md](../../corvus/Blueprints/prompts/codex-architecture-pivot-kickoff.md)

---

## Future Product Ideas Parked

None added this session. Slops Saloon's future-product holding pattern (sports / music / arts) is unchanged. Corvus remains the only active product.

---

## Open Questions

1. **Slops Saloon division-level analytics.** When does Umami's data feed up to a division-level dashboard? Out of scope for this pivot — flagged for later.
2. **Cross-product doctrine reuse.** Demo Mode, debounced Lazy Sync, AI_PROVIDER toggle, and trade share hashes are patterns likely to repeat in future Slops Saloon products. After Corvus launches, harvest these into division-level [Blueprints/](../) patterns. Not now — premature for one product.

---

## Recommended Next Prompt

```text
Read slops-saloon/Blueprints/handoffs/2026-06-10-corvus-architecture-pivot.md, then drop into corvus/ and use Blueprints/prompts/codex-architecture-pivot-kickoff.md to start Phase 1.
```
