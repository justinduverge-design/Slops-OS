# Handoff — Corvus Pull Prep (Layer 2)

**Date:** 2026-06-11
**Layer:** 0 → 2 (pull preparation)
**Author:** Claude (acquisition session)
**For:** the next Corvus build session that pulls from L0.

---

## Why This File Exists

The L0 acquisition session of 2026-06-11 produced changes Corvus (L2) will benefit from before First Draft Day (August 2026). Corvus does NOT touch L0 doctrine. Corvus PULLS — selectively. This file names what Corvus should pull, when, and what to leave alone.

Per session prompt: this work does not touch Corvus source.

---

## What Corvus Should Pull (in order)

### Immediate (closes already-named launch gaps)
1. **`self-hosted-observability-runbook`** — closes launch gap #10 (no error monitoring) + #14 (no analytics). Once L0 promotes it, Corvus wires Sentry-self-hosted + Umami + Vector to KVM1. Touches: `corvus/.env.example`, `corvus/server/init.js` (or equivalent), `corvus/client/main.jsx` (Sentry init), `corvus/Blueprints/observability.md` (new).
2. **`mobile-first-qa-playbook`** — closes launch gap #8 (mobile blocker). Once L0 promotes it, Corvus runs the 15-route sweep on the device matrix and routes findings into the build loop. Touches: nothing in source; produces `corvus/Solutions/reports/<date>-mobile-qa.md`.
3. **`proprietary-math-stack-playbook.md`** (already approved doctrine) — Corvus pins to nflverse/nflreadpy + ffopportunity before ADP/MVP Move/Trade Analyzer code lands. Touches: `corvus/package.json` or `corvus/requirements.txt` (add nflreadpy), `corvus/services/projections/` (route through nflreadpy), `corvus/Blueprints/specs/proprietary-math.md` (new ADR).

### Shortly after (before launch)
4. **`compliance-by-template`** — drafts ToS + Privacy Policy + (if applicable) DPA for Corvus. Touches: `corvus/Legal/` (new folder), no source.
5. **`demo-mode-pre-empty-state`** — formalizes the cold-start pattern Corvus is building in Phase 1. Touches: `corvus/Blueprints/demo-mode.md` (new), no source changes (Corvus already builds the pattern).
6. **`slops-design-system-pack`** — Corvus picks one vetted DESIGN.md and runs `slops-ui-ux-audit` in compare-mode against it. Touches: nothing; informs audit output only.

### Later (post-launch or post-validation)
7. **`slops-screenplay-loop` + `slops-explainer-cut`** — once Justin provides a sample Omen output, produce the first "show your work" explainer cut. Touches: `corvus/Solutions/deliverables/`.
8. **`live-data-adapter-template`** (still in design at L0) — harvest the Sleeper Lazy Sync pattern only AFTER the August draft validates it under real load.

---

## What Corvus Does NOT Pull

- The agent-retirement diff — that's an L0/AGENT_INDEX.md change, no L2 impact.
- The Week 2 conversion skills (image-prompt, exec-summary, financial-sketch, etc.) — none are deadline-relevant for Corvus.
- Parked stubs (animation-render, lore-review).

---

## Order-of-Operations Note

**Strict ordering before any Corvus pull happens:**
1. Justin promotes the Week 1 proposals at L0 (out of `_proposals/`, into flat `Blueprints/skills/<name>/`, into `SKILL_ROUTING.md`).
2. Codex executes the agent-retirement diff at L0.
3. Then — and only then — a Corvus build session pulls. The Corvus session reads this handoff first.

---

## Recommended Next Corvus Prompt

```text
You are working on Corvus (Layer 2). Read these in order:
- SLOPS/Blueprints/handoffs/2026-06-11-corvus-pull-prep-handoff.md (this file)
- SLOPS/Blueprints/playbooks/proprietary-math-stack-playbook.md
- corvus/Direction/current_sprint.md

Plan the pull order for the launch-blocker items (#1, #2, #3 above). Do not
build yet — produce a sprint update for Justin's approval.
```

## Safest Next Step

Do nothing at L2 yet. The Corvus build session waits for L0 promotion + agent retirement to finish first.
