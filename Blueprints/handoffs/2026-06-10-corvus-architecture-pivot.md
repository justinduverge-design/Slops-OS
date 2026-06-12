# SLOPS OS Handoff — Corvus Architecture Pivot 2026-06-10

**Layer:** 0 — SLOPS OS
**Author:** Claude planning session (Justin in the loop)
**Status:** OS-layer record. No doctrine changes.

---

## Why This File Exists

A Layer 2 (Corvus product) architecture pivot just happened. Layer routing and naming conventions held throughout. This file is the OS-layer breadcrumb pointing to the division and product handoffs so future SLOPS sessions can re-anchor without re-deriving the pivot.

---

## Decisions Made at OS Layer

**None.** No OS doctrine was changed. No new layer was added. Layer routing held:

- Layer 2 product changes → [`slops-saloon/corvus/`](../../slops-saloon/corvus/)
- Layer 1 division note → [`slops-saloon/Blueprints/handoffs/2026-06-10-corvus-architecture-pivot.md`](../../slops-saloon/Blueprints/handoffs/2026-06-10-corvus-architecture-pivot.md)
- Layer 0 OS record → this file

---

## Files Discussed at OS Layer

- This file
- [`AGENTS.md`](../../AGENTS.md) — routing rules unchanged
- [`CLAUDE.md`](../../CLAUDE.md) — session re-anchoring conventions followed

---

## Unresolved Questions

1. **Pattern harvesting.** After Corvus launches, Demo Mode, debounced Lazy Sync, the `AI_PROVIDER` toggle, and trade share hashes are candidates for OS-level templates. Not now — wait until they prove out under real load.
2. **Cross-layer skill imports.** A separate session is being opened to identify new skills and playbooks worth adopting at the OS layer (see [`Blueprints/prompts/claude-skills-playbooks-acquisition-session.md`](../prompts/claude-skills-playbooks-acquisition-session.md)).

---

## Recommended Next Prompt

For a new SLOPS OS session that needs to know what just happened at the product layer:

```text
Read SLOPS/Blueprints/handoffs/2026-06-10-corvus-architecture-pivot.md, then route into the product layer per the file's pointers. Do not modify OS doctrine — the pivot is product-scoped.
```

---

## Safest Next Step

Do nothing at the OS layer. Operational work belongs in `slops-saloon/corvus/`. The OS layer just witnessed the pivot.
