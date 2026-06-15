# Handoff — Corvus Pull Prep (Layer 2)

**Date:** 2026-06-11 (revised 2026-06-12 with Phase 1.1 reality + Week 1.5 additions)
**Layer:** 0 → 2 (pull preparation)
**Author:** Claude (acquisition session)
**For:** the next Corvus build session that pulls from L0.

---

## Why This File Exists

The L0 acquisition session of 2026-06-11 produced changes Corvus (L2) will benefit from before First Draft Day (August 2026). Corvus does NOT touch L0 doctrine. Corvus PULLS — selectively. This file names what Corvus should pull, when, and what to leave alone.

Per session prompt: this work does not touch Corvus source.

---

## Phase 1.1 Reality Check (2026-06-12)

**Justin reports Corvus is still in Phase 1.1.** This handoff originally implied launch-gap-closing pulls (#1, #2, #3 below) could start immediately. They cannot — Phase 1.1 has to finish first. The pull window is **after Phase 1.1 ships**, not now.

**Practical effect:**
- L0 capability stack keeps building (Week 1 promoted, Week 1.5 + Week 2 pending).
- L0 work does NOT block Corvus. Corvus does NOT block L0 work.
- When Phase 1.1 ships, Justin re-reads this handoff and pulls in the order below.
- Until then: do nothing at L2. No partial-pull, no "while we're here" edits.

**What "Phase 1.1 shipped" means** as the trigger: a green build, the Phase 1.1 done-when from `corvus/Direction/current_sprint.md` is met, and Justin marks it complete in the sprint file. Anything less = keep waiting.

---

## What Corvus Should Pull (in order, AFTER Phase 1.1 ships)

### Immediate post-Phase-1.1 (closes already-named launch gaps)
1. **`self-hosted-observability-runbook`** — closes launch gap #10 (no error monitoring) + #14 (no analytics). Once L0 promotes it, Corvus wires Sentry-self-hosted + Umami + Vector to KVM1. Touches: `corvus/.env.example`, `corvus/server/init.js` (or equivalent), `corvus/client/main.jsx` (Sentry init), `corvus/Blueprints/observability.md` (new).
2. **`mobile-first-qa-playbook`** — closes launch gap #8 (mobile blocker). Once L0 promotes it, Corvus runs the 15-route sweep on the device matrix and routes findings into the build loop. Touches: nothing in source; produces `corvus/Solutions/reports/<date>-mobile-qa.md`.
3. **`proprietary-math-stack-playbook.md`** (already approved doctrine) — Corvus pins to nflverse/nflreadpy + ffopportunity before ADP/MVP Move/Trade Analyzer code lands. Touches: `corvus/package.json` or `corvus/requirements.txt` (add nflreadpy), `corvus/services/projections/` (route through nflreadpy), `corvus/Blueprints/specs/proprietary-math.md` (new ADR).

### Shortly after (still before launch)
4. **`compliance-by-template`** — drafts ToS + Privacy Policy + (if applicable) DPA for Corvus. Touches: `corvus/Legal/` (new folder), no source.
5. **`demo-mode-pre-empty-state`** — formalizes the cold-start pattern Corvus is building. Touches: `corvus/Blueprints/demo-mode.md` (new), no source changes (Corvus already builds the pattern).
6. **`slops-design-system-pack`** — Corvus picks one vetted DESIGN.md and runs `slops-ui-ux-audit` in compare-mode against it. Touches: nothing; informs audit output only.

### Week 1.5 additions (approved 2026-06-11 — pull when L0 promotes)
7. **`slops-headroom`** — token compression for long context sessions (60-95% reduction). MCP-native. Drop-in for Corvus's long debugging passes. Touches: developer toolchain only, not Corvus source. **Justin runs the install on his machine, not Codex.**
8. **`slops-markitdown`** — PDF/PPTX/DOCX → markdown for any ingest step. Touches: nothing in Corvus source; produces files in `corvus/References/research/`.
9. **`slops-taste`** — anti-slop frontend pass. Pairs with `slops-ui-ux-audit` + `slops-design-system-pack`. Pull alongside #6.

### Later (post-launch or post-validation)
10. **`slops-screenplay-loop` + `slops-explainer-cut` + `slops-voxcpm`** — once Justin provides a sample Omen output, produce the first "show your work" explainer cut with narration. Touches: `corvus/Solutions/deliverables/`.
11. **`live-data-adapter-template`** (still in design at L0) — harvest the Sleeper Lazy Sync pattern only AFTER the August draft validates it under real load.
12. **`slops-product-pulse`** — time-windowed product report. Gated on observability runbook (#1) shipping data first.
13. **`slops-graphify` v2 upstream swap** — Understand-Anything side-by-side smoke test first. Re-pin only after pass. Out-of-band from Corvus launch path.

### STRATEGY.md (separate, when ready)
14. **`STRATEGY.md` pattern** — write `corvus/STRATEGY.md` as a 1-page durable anchor AFTER Phase 1.1 ships. NOT mid-phase. Approved doctrine from this session.

---

## What Corvus Does NOT Pull

- The agent-retirement diff — that's an L0/AGENT_INDEX.md change, no L2 impact. (Already committed at L0 as `fd05018`.)
- The Week 2 conversion skills (image-prompt, exec-summary, financial-sketch, ai-integration-review, data-ingest-plan) — none are deadline-relevant for Corvus.
- Parked stubs (animation-render, lore-review).
- `pm-skills` harvest patterns (Layer 0 reference only; future products may consume).
- `open-notebook` (parked; SurrealDB infra cost too high for Y1).

---

## Order-of-Operations Note (revised)

**Strict ordering before any Corvus pull happens:**
1. **Corvus Phase 1.1 must ship first.** Until then, L2 pulls are paused.
2. Justin promotes the Week 1 + Week 1.5 proposals at L0 (out of `_proposals/`, into flat `Blueprints/skills/<name>/`, into `SKILL_ROUTING.md`).
3. ~~Codex executes the agent-retirement diff at L0.~~ **Done** (master `fd05018`, 2026-06-12).
4. Then — and only then — a Corvus build session pulls. The Corvus session reads this handoff first.

---

## Recommended Next Corvus Prompt (use AFTER Phase 1.1 ships)

```text
You are working on Corvus (Layer 2). Phase 1.1 has shipped (verify in
corvus/Direction/current_sprint.md). Read these in order:
- SLOPS/Blueprints/handoffs/2026-06-11-corvus-pull-prep-handoff.md (this file)
- SLOPS/Blueprints/playbooks/proprietary-math-stack-playbook.md
- corvus/Direction/current_sprint.md

Plan the pull order for the launch-blocker items (#1, #2, #3 above). Do not
build yet — produce a sprint update for Justin's approval.
```

## Safest Next Step

Do nothing at L2 yet. Finish Phase 1.1. The Corvus build session waits for Phase 1.1 done-when + L0 promotion to finish first.

## Revision Log

- **2026-06-12** — added Phase 1.1 reality check; added Week 1.5 items (headroom, markitdown, taste); marked agent retirement as done (`fd05018`); added STRATEGY.md adoption gating; added `slops-product-pulse` + `slops-graphify` v2 + voxcpm to later list.
- **2026-06-11** — initial handoff written.
