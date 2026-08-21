# Always-read at L0 (read in order, under 2 min)

0. **Run `slops-repo-inspector` before planning.** Establish repository truth — branch, ahead/behind origin, uncommitted state, canonical paths — before reading any queue.
0.5. `Direction/CUTOVER_STATE.md` — if `STATE:` is anything other than `NONE`, a cutover is in progress; stop and confirm with Justin before pulling work.
1. `AGENTS.md` (or `CLAUDE.md`) — identity, posture, scope
1.5. `RESOLVER.md` — cross-layer filing, authority, and Valor Brain resolution
2. `Direction/facts-of-record.md` — facts that override anything older
3. `Direction/decision_log.md` — recent decisions (read last 5 entries)
4. `Blueprints/RESOURCES_INDEX.md` — what's in your toolbox
5. `Blueprints/skills/SKILL_ROUTING.md` — Status column first, legend at top
6. `Blueprints/agent-modules/status-model.md` — the task states every queue uses

Everything else is read-when-relevant or search-before-reading. Do not pre-load handoffs, archives, or old specs unless the task names them.

Read-when-relevant: `Blueprints/skills/SLOPS_LIFECYCLE.md` — skill/artifact lifecycle states, needed for any triage, retirement, or promotion call.

**Multi-layer / cross-cutting tasks:** also consult the cross-layer knowledge graph — see `graphify-hook.md`.
