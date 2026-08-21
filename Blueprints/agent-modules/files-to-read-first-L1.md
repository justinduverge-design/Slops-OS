# Always-read at L1 (read in order, under 2 min)

0. **Run `slops-repo-inspector` before planning.** Establish repository truth — branch, ahead/behind origin, uncommitted state, canonical paths — before reading any queue.
0.5. `../Direction/CUTOVER_STATE.md` — if `STATE:` is anything other than `NONE`, a cutover is in progress; stop and confirm with Justin before pulling work.
1. `AGENTS.md` (or `CLAUDE.md`) — identity, posture, scope
1.5. `RESOLVER.md` — L1 filing and Valor Brain resolution
2. `Direction/facts-of-record.md` — facts that override anything older
3. `Direction/current_sprint.md` — **the L1 queue**; select by `Status: READY` per `../Blueprints/agent-modules/status-model.md`
4. `Direction/marketing-strategy.md` — current marketing direction
5. `Direction/content-strategy.md` — current content direction
6. `../Blueprints/RESOURCES_INDEX.md` — what's in your toolbox (parent-level)

Read L0's facts-of-record too if there's any L0-level decision in play.

**Multi-layer / cross-cutting tasks:** also consult the cross-layer knowledge graph — see `graphify-hook.md`.
