# Handoff — Skills & Playbooks Acquisition Session

**Date:** 2026-06-11
**Layer:** 0 — SLOPS OS
**Author:** Claude (acquisition session, Justin in loop)
**Session source:** `Blueprints/prompts/claude-skills-playbooks-acquisition-session.md`

---

## What Was Inventoried

- **32 Layer-0 skills** at `Blueprints/skills/` — full lifecycle covered (Frame → Plan → Build → Version → Review → Quality → Design QA → Verify → Ship → Monitor → Operate → Learn → Scale) plus authoring/RBAC utilities. None dormant — all touched between 2026-05-24 and 2026-06-09.
- **3 playbooks** at `Blueprints/playbooks/` — `app-cutover`, `runbook_ai_workflow`, `vps-hardening-plan`. Thin: no observability, mobile QA, incident-response, or compliance playbooks before this session.
- **47 candidate agent wrappers** across 11 divisions in `Blueprints/agents/` — all Tier-2 advisory only.
- **One near-duplicate flagged:** `slops-context-markdown` vs `slops-markdown-authoring` (adjacent scopes; merge or boundary call deferred).

## What Was Proposed

### Agent → Skill / Workflow Conversion
- **11 agent wrappers retired** (shadowed by active SLOPS skills) — diff at `Blueprints/skills/_proposals/AGENT_INDEX-retirement-diff.md`.
- **7 new skills** converting 11 agents (lore, image-prompt, exec-summary, financial-sketch, ai-integration-review, data-ingest-plan, legal-spot-check).
- **3 workflows** for multi-stage agent chains (sales pipeline parked, paid-media loop parked, content loop pending).
- **Net result:** `AGENT_INDEX.md` Section 5 shrinks from 47 rows to ~5 (true personas only).

### Repos Harvested (per Justin's 5 categories)
- **UX/UI:** `nexu-io/open-design`, `VoltAgent/awesome-claude-design`, `OpenCoworkAI/open-codesign`.
- **Script writing:** `HKUDS/ViMax` (concepts only).
- **Animation:** `calesthio/OpenMontage` (Remotion), `HarleyCoops/Math-To-Manim` (math explainers).
- **Legal:** `anthropics/claude-for-legal`, `open-agreements/open-agreements`.
- **Math:** `nflverse/nflreadpy`, `ffverse/ffopportunity`, `jjti/ff`, `ChinaiArman/Fantasy-Football-Analyzer`.

### Scaffolds Written (`Blueprints/skills/_proposals/`)
Week 1 (active proposals):
- `self-hosted-observability-runbook` — closes Corvus gaps #10 + #14.
- `mobile-first-qa-playbook` — closes Corvus gap #8 (mobile blocker).
- `demo-mode-pre-empty-state` — pattern doctrine.
- `compliance-by-template` — Termly replacement via open-agreements.
- `slops-legal-spot-check` — converted from `support-legal-compliance-checker`.
- `AGENT_INDEX-retirement-diff.md` — the 11-row deletion.

Week 2 (active proposals):
- `slops-design-system-pack`, `slops-image-prompt`, `slops-exec-summary`, `slops-ai-integration-review`, `slops-data-ingest-plan`, `slops-financial-sketch`, `slops-screenplay-loop`.

Parked stubs (need raw material from Justin):
- `slops-explainer-cut` (Manim) — needs a sample Omen output.
- `slops-animation-render` (Remotion) — needs brand palette + sound bed.
- `slops-lore-review` — needs lore-canon decision.

### Playbook Written
- `Blueprints/playbooks/proprietary-math-stack-playbook.md` — approved doctrine: nflverse = baseline math, Slops = opinion layer. Non-negotiable boundary.

---

## What Justin Approved (2026-06-11)

1. **Bucket 1 agent retirement** — all 11 shadowed wrappers.
2. **`open-agreements` as Termly replacement** — `compliance-by-template` promoted from parked to onboard-now.
3. **Proprietary-math doctrine** — nflverse baseline / Slops opinion layer, captured as playbook.
4. **Manim direction confirmed** for `slops-explainer-cut`.
5. **Layer discipline confirmed** — none of this touches Corvus source.
6. **Prepare push to Corvus and Slops Saloon** — see companion handoffs.

## What's Open

- Markdown-skill near-duplicate (`slops-context-markdown` vs `slops-markdown-authoring`): merge or formalize boundary? Deferred to a later pass.
- Lore canon decision (gates `slops-lore-review`).
- Sample Omen output (gates `slops-explainer-cut`).
- Brand palette finalization (gates `slops-animation-render`).
- ToS-clearance pass on each harvested OSS repo before any vendoring (license check is MIT-compatible across the board but vendor-vs-pip-install is per-product).

## Recommended Next Prompt

```text
Codex — execute the AGENT_INDEX retirement diff at
SLOPS/Blueprints/skills/_proposals/AGENT_INDEX-retirement-diff.md.
Read the diff first. Confirm each shadow-skill exists. Delete the 11 wrapper
files + the 11 AGENT_INDEX rows. Commit with the message in the diff.
Do not touch _imported/. Report which files changed.
```

After Codex finishes the retirement: promote the Week 1 proposals out of `_proposals/` into flat `Blueprints/skills/<name>/` folders and add their rows to `SKILL_ROUTING.md`. Wave-author them via `slops-skill-author` one at a time, Justin gating each.

## Safest Next Step

Run the retirement diff first. It's the lowest-risk, highest-leverage cleanup — pure routing simplification, no behavior change.

## Companion Handoffs

- `2026-06-11-slops-saloon-inheritance-handoff.md` — Layer 1 pointer.
- `2026-06-11-corvus-pull-prep-handoff.md` — Layer 2 prep.
