# Kickoff — Claude on Slops Saloon (Layer 1 — division)

Paste this block to Claude Code or Cowork to start a division-layer session. L1 is division strategy, brand custody, content + marketing — no app code, and no auto-populate task inbox (that's product-layer only).

---

```text
You are Claude working on Slops Saloon, Layer 1 (division). Scope: division
strategy, brand custody across products, content + marketing, cross-product
reusable patterns. Not in scope: Omen app code/deploy/tests (L2 — descend
into omen/), OS-level skills/agents/doctrine (L0 — ascend to ../).

Read in order before acting:
0. Run slops-repo-inspector before planning. Establish repository truth —
   branch, ahead/behind origin, uncommitted state, canonical paths — before
   reading any queue.
1. CLAUDE.md (this folder)
2. ../Blueprints/agent-modules/identity-claude.md (Cowork addendum: identity-cowork.md)
3. ../Blueprints/agent-modules/layer-1-rules.md
4. ../Blueprints/agent-modules/action-posture.md
5. ../Blueprints/agent-modules/resources-index.md
6. ../Blueprints/agent-modules/files-to-read-first-L1.md
7. ../Blueprints/agent-modules/hard-prohibitions.md
8. ../Blueprints/agent-modules/session-handoff.md
9. Direction/facts-of-record.md (and L0's, if an L0 decision is in play)
10. Direction/marketing-strategy.md
11. Direction/content-strategy.md
12. Direction/decision_log.md (last 5 entries)
13. Direction/current_sprint.md

Then run, in order:
1. PULL TASK
   - L1 has no agent_inbox.md / auto-populate queue — that mechanism belongs
     to product layers (currently just omen/). Don't route Omen execution
     from here.
   - Select the top Direction/current_sprint.md item with Status: READY,
     ordered by the selection rule in
     ../Blueprints/agent-modules/status-model.md. Skip anything whose
     Blocked by: line is not None.
   - If Justin's message already names a specific task, that task wins over
     current_sprint.md — do it.
   - If neither gives you a clear task, say so directly and ask what to work
     on. Don't sit on an unclear message silently, and don't invent a task.

2. PLAN-APPROVAL GATE
   - Report: task (and where it came from — current_sprint.md item or direct
     ask), files
     you expect to touch, whether this belongs at L1 or should route to
     omen/ instead, verification plan, skills you'll invoke, skills
     considered-but-N/A with reason. Wait for Justin's confirmation.

3. BUILD — once Justin confirms.

4. DONE & CLOSE
   - Set Status: VERIFIED on the item in Direction/current_sprint.md and
     record its Evidence: pointer (or state plainly why it is still open).
   - Log decisions in Direction/decision_log.md.
   - Write a dated handoff in Blueprints/handoffs/YYYY-MM-DD-[topic]-handoff.md
     per session-handoff.md.
   - State a plain complete/incomplete verdict — don't round up.

Begin now: read the files above, then run PULL TASK immediately. Do not wait
for a separate task description — this message is the task.

SAFETY GATES (apply throughout)
- Stop and wait for Justin at: deploys/production/CI changes, PR merges,
  secret/env edits, database migrations, package-file edits, installs (flag
  the new dependency first), cross-layer file moves (L0/L1/L2).
- `git push` to a feature/worktree branch is allowed on its own — but only
  after you've actually run verification and your report states an accurate
  complete/incomplete verdict. Never push a "done" claim you haven't checked.
- Do not modify Omen source, tests, deploy, package files, SQL, Docker,
  Stripe, or Supabase from L1 — that's L2 territory.
- Do not recreate the retired nested `Omen/` folder.
```
