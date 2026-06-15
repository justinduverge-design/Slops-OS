# Codex Prompt — Pull Next Backend Lane Item

**Layer:** 2 (Corvus)
**Type:** Reusable template — fire whenever the prior Backend / Codex Phase item closes.
**Date drafted:** 2026-06-13
**Posture:** Single focused PR. No deploy. No push. Backend tests must stay green.

---

## When To Use This Prompt

After Codex finishes a Backend / Codex Phase item and you want it to autopilot to the next one without you re-drafting a phase-specific prompt. **Do not use this for Phase 1.2 backend** — that one has a hand-drafted prompt at `codex-corvus-phase-1.2-sentry-backend.md` because the PII scrubber spec is too important to leave to a generic pull. From Phase 1.3+ onward, this is your default.

If the upcoming phase has hard constraints or non-obvious dependencies, draft a dedicated prompt instead. Generic prompts are for cohesive, well-scoped items.

## The Prompt

```text
Read AGENT.md first, then slops-saloon/corvus/Direction/current_sprint.md.

Mode: implementation.

You are Codex acting as the back-end engineer for Corvus.

Pull the topmost open `[ ]` item from the `Backend / Codex — Phase N` sections of `Direction/current_sprint.md`, in Phase order (1 → 2 → 3 → 4).

Respect `(waits until X closes)` annotations. If your top item is gated by a Phase that has not closed, STOP and report which gate is blocking. Do not skip ahead.

Ignore the `Behind launch readiness` section unless I name a specific item.

Before making changes, tell me:
1. Which Phase item you pulled, quoted verbatim.
2. Whether any gate annotation applies and how you read it.
3. Files you expect to touch (full paths).
4. Files you will avoid (and why if non-obvious).
5. Tests that will run, and your expected baseline count.

Hard constraints (always):
- Do not touch `.env`, `.env.production`, secrets, Docker compose, deploy workflows, Nginx, Supabase migrations, Stripe production behavior, DNS, SSL, or KVM1/KVM2 runtime.
- Do not edit frontend files unless the Phase item explicitly says backend-and-frontend.
- ESPN cookie material must NEVER appear in code, tests, comments, or logs.
- Mock data must be clearly labeled.
- If a test fails after your change, STOP — do not modify the test to make it pass. Report it.
- If `npm audit` introduces a NEW moderate+ advisory beyond the pre-existing `hono`, STOP and report.

After implementing:
1. Run `npm test`. Report count delta.
2. Run `npm --prefix frontend run build`. Confirm clean.
3. Run `git diff --check`. Confirm clean.
4. Commit on `main` with a Conventional Commit message (`feat(phaseN.M): …` or `fix/chore/docs/test`). Do NOT push.
5. Update `slops-saloon/corvus/Blueprints/handoffs/backend-to-frontend.md` if the change affects an endpoint contract or a frontend dependency.

Report back in two short paragraphs:
1. What landed (Phase item, files, commit hash, test delta, audit delta).
2. Anything surprising — API drift, unexpected dep adds, places spec was ambiguous. Yes/no on whether the next Backend item is ready to fire or if this one needs follow-up first.
```

## How To Use

1. Open a fresh Codex session inside `SLOPS/slops-saloon/corvus`.
2. Paste the block above verbatim.
3. Review Codex's pre-change report. If the pulled item or file list looks wrong, push back before any edits land.
4. Approve. Codex implements + commits to `main`. No push (your gate).
5. When Codex reports back, decide: fire the next Backend pull, fire the Frontend pull, or stage a hand-drafted prompt for the next item.

## Notes / Caveats

- **Why the gate rule matters.** `Backend / Codex — Phase 2` is annotated `(waits until Phase 1 closes)`. Phase 1 doesn't close until 1.2 frontend (Claude Code) and 1.3 (Claude Code) ship. Without the explicit gate-respect line, Codex would happily start Phase 2.5 backend while Phase 1 frontend is still open.
- **Why "Behind launch readiness" is excluded.** That section holds post-launch items (Tuesday scoring enablement, ESPN/Yahoo live draft tracking) that aren't part of the Phase 1→4 march. Pulling from it ambiguously would derail the spine work.
- **When to override.** If you want Codex to grab a specific item out of phase order (say, an urgent fix from `Behind launch readiness`), draft a dedicated prompt instead of editing this one. Keep the generic template stable.
- **Phase 1.2 exception.** Hand-drafted prompt lives at `_pending/codex-corvus-phase-1.2-sentry-backend.md`. Fire that, not this, for Phase 1.2 backend.

## Related

- `_templates/Claude_prompt_format.md` / `_templates/Codex_prompt_format.md` — house format guides.
- `_templates/claude-code-pull-next-frontend.md` — Frontend lane equivalent.
- `_pending/codex-corvus-phase-1.2-sentry-backend.md` — the one Phase 1 item that's NOT generic-pullable.
- `slops-saloon/corvus/Direction/current_sprint.md` — source of truth for lane state.
