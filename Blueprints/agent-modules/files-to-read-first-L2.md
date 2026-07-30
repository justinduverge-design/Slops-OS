# Always-read at L2 (read in order, under 2 min)

0. **Run `slops-repo-inspector` before planning.** Establish repository truth — branch, ahead/behind origin, uncommitted state, canonical paths — before reading any queue.
0.5. `Direction/CUTOVER_STATE.md` — if `STATE:` is anything other than `NONE`, a cutover is in progress; stop and confirm with Justin before pulling work.
1. `AGENTS.md` (or `CLAUDE.md`) — identity, posture, scope
2. `Direction/facts-of-record.md` — facts that override anything older
3. `Direction/agent_inbox.md` — your active task (honor the pin)
4. `Direction/current_sprint.md` — the queue; select by `Status: READY` and record your claim in `agent_inbox.md`
5. `Blueprints/definition-of-done.md` — the gates you must pass

Read-when-relevant: `Brand/brand-system.md`, `Blueprints/specs/page-system.md`, `Blueprints/specs/omen-ux-ui-design-system-v1.md`, `Blueprints/handoffs/backend-to-frontend.md`, `Blueprints/handoffs/frontend-to-backend.md`, `Direction/known_issues.md`.

**Multi-layer / cross-cutting tasks:** also consult the cross-layer knowledge graph — see `graphify-hook.md`.
