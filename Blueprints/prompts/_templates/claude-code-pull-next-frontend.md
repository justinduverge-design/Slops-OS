# Claude Code Prompt — Pull Next Frontend Lane Item

**Layer:** 2 (Corvus)
**Type:** Reusable template — fire whenever the prior Frontend / Claude Phase item closes (or its backend dependency lands).
**Date drafted:** 2026-06-13
**Posture:** Single focused PR. No deploy. No push. Frontend build must stay green.

---

## When To Use This Prompt

After Claude Code finishes a Frontend / Claude Phase item, or after a backend counterpart you've been waiting on has shipped. Use this whenever you want Claude Code to autopilot to the next frontend item without you re-drafting a phase-specific prompt.

If the next item has hand-drafted requirements (specific component refactors, visual tokens, or animation specs), draft a dedicated prompt instead.

## The Prompt

```text
Read CLAUDE.md first, then slops-saloon/corvus/Direction/current_sprint.md.

Mode: implementation.

You are Claude Code acting as the front-end engineer for Corvus.

Pull the topmost open `[ ]` item from the `Frontend / Claude — Phase N` sections of `Direction/current_sprint.md`, in Phase order (1 → 2 → 3 → 4).

Before starting, check whether the item depends on a backend counterpart that hasn't shipped:
- Phase 2.7 frontend Demo Mode UI needs Phase 2.7 backend Demo Mode route.
- Phase 2.10 trade share card needs Phase 2.10 backend share routes.
- Phase 2.11 FP1 signal-honesty labels need backend Omen vocab at `src/services/omen.js:356` (already exists — verify).
- Phase 3.14 narration skeletons need Phase 3.12 KVM2 bridge.
- Phase 4.18 Umami snippet needs the Umami container live on KVM1.

If your top item is blocked on a backend or infra dependency that hasn't shipped, STOP and report which dependency is missing. Do not skip ahead.

Ignore conditional items (e.g., "When the logo SVG is ready: …") unless I confirm the condition is met.

Ignore the `Verify`, `Decisions`, and `Tech debt` sections unless I name a specific item.

Before making changes, tell me:
1. Which Phase item you pulled, quoted verbatim.
2. Any backend dependency check and your reading of it (shipped vs missing).
3. Files you expect to touch (full paths). Frontend lives under `slops-saloon/corvus/frontend/`.
4. Files you will avoid (and why if non-obvious).
5. What the user-visible change will look like (one paragraph or screen description).

Hard constraints (always):
- Do not edit backend logic (`src/`, `services/`, `routes/`), Supabase, auth, API contracts, env files, Docker compose, Stripe behavior, or deploy workflows.
- Do not introduce a new dependency without flagging it first.
- Mock data must be clearly labeled.
- Reuse design tokens and existing components before creating new ones.
- Touch targets must be ≥44px on mobile.
- iOS Safari is a first-class target. Test viewport, focus rings, safe-area-insets.
- If a test or build fails after your change, STOP — do not modify the test to make it pass. Report it.

After implementing:
1. Run `npm --prefix frontend run build`. Confirm clean.
2. Run any frontend tests that exist. Report count delta.
3. Run `git diff --check`. Confirm clean.
4. Commit on `main` with a Conventional Commit message (`feat(phaseN.M): …` or `fix/chore/docs/test`). Do NOT push.
5. Update `slops-saloon/corvus/Blueprints/handoffs/frontend-to-backend.md` if the change needs a new backend contract or surfaces a backend bug.

Report back in two short paragraphs:
1. What landed (Phase item, files, commit hash, build status, visual change summary).
2. Anything surprising — backend contract that didn't match, design token gaps, an iOS Safari quirk worth noting. Yes/no on whether the next Frontend item is ready to fire or if this one needs follow-up first.
```

## How To Use

1. Open a fresh Claude Code session inside `SLOPS/slops-saloon/corvus`.
2. Paste the block above verbatim.
3. Review Claude Code's pre-change report. If the pulled item, dependency reading, or file list looks wrong, push back before any edits land.
4. Approve. Claude Code implements + commits to `main`. No push (your gate).
5. When Claude Code reports back, decide: fire the next Frontend pull, fire the Backend pull, or stage a hand-drafted prompt.

## Notes / Caveats

- **Why the cross-stack dependency check matters.** Frontend Phase items often need a backend counterpart already shipped. Phase 2.7 frontend Demo Mode UI is dead in the water without Phase 2.7 backend Demo Mode route returning data. The explicit check prevents Claude Code from scaffolding UI against a non-existent endpoint.
- **Why conditional items are excluded.** Phase 4 has a non-numbered conditional item ("When the logo SVG is ready: replace the `[C]` placeholder…"). It's marked `[ ]` but blocked on a Justin-deliverable (the SVG). Without exclusion, Claude Code would pull it and stall on missing input.
- **Why `Verify`, `Decisions`, `Tech debt` are excluded.** Those sections aren't Phase work — they hold cross-cutting checks (Verify), open product calls (Decisions), and post-launch backlog (Tech debt). Pulling from them ambiguously derails the spine.
- **When to override.** If you want Claude Code to grab a specific item out of phase order (a Tech debt fix, a Decisions resolution, a conditional item), draft a dedicated prompt instead of editing this one. Keep the generic template stable.

## Related

- `_templates/Claude_prompt_format.md` / `_templates/Codex_prompt_format.md` — house format guides.
- `_templates/codex-pull-next-backend.md` — Backend lane equivalent.
- `slops-saloon/corvus/Direction/current_sprint.md` — source of truth for lane state.
- `slops-saloon/corvus/Blueprints/handoffs/backend-to-frontend.md` — current backend contracts available to consume.
