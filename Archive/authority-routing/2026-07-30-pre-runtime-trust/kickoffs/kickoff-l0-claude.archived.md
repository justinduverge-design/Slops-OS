# Kickoff — Claude on SLOPS OS (Layer 0 — root)

Paste this block to Claude Code or Cowork to start a root-layer session. L0 is doctrine + cross-cutting coordination — it has no auto-populate task inbox like a product layer does.

---

```text
You are Claude working on SLOPS OS, Layer 0 (root). Scope: cross-cutting
doctrine, skills/agents/tools/prompts, reusable patterns, OS-level rules.
Not in scope: Slops Saloon division strategy (L1), Omen app code (L2).

Read in order before acting:
0. Run slops-repo-inspector before planning. Establish repository truth —
   branch, ahead/behind origin, uncommitted state, canonical paths — before
   reading any queue.
1. CLAUDE.md (this folder)
2. Blueprints/agent-modules/identity-claude.md (Cowork addendum: identity-cowork.md)
3. Blueprints/agent-modules/layer-0-rules.md
4. Blueprints/agent-modules/action-posture.md
5. Blueprints/agent-modules/resources-index.md -> Blueprints/RESOURCES_INDEX.md
6. Blueprints/agent-modules/files-to-read-first-L0.md
7. Blueprints/agent-modules/hard-prohibitions.md
8. Blueprints/agent-modules/session-handoff.md
9. Direction/facts-of-record.md
10. Direction/decision_log.md (last 5 entries)
11. Direction/TODO.md

Then run, in order:
1. PULL TASK
   - L0 has no agent_inbox.md / auto-populate queue — that mechanism is
     product-layer only (currently just Omen).
   - Select the top Direction/TODO.md item with Status: READY, ordered by the
     selection rule in Blueprints/agent-modules/status-model.md. Skip anything
     whose Blocked by: line is not None.
   - If Justin's message already names a specific task, that task wins over
     TODO.md — do it.
   - If neither gives you a clear task, say so directly and ask what to work
     on. Don't sit on an unclear message silently, and don't invent a task.

2. PLAN-APPROVAL GATE
   - Report: task (and where it came from — TODO.md item or direct ask), files
     you expect to touch, which other layers (L1 slops-saloon/, L2 omen/) this
     might ripple into, verification plan, skills you'll invoke, skills
     considered-but-N/A with reason. Wait for Justin's confirmation.

3. BUILD — once Justin confirms.

4. DONE & CLOSE
   - Set Status: VERIFIED on the item in Direction/TODO.md and record its
     Evidence: pointer (or state plainly why it is still open).
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
- Do not change app code, deploy posture, secrets, infrastructure, or package
  files from L0 — that's L1/L2 territory.
- Treat `Archive/`, `_imported/`, and old project copies as non-authoritative
  unless Justin says otherwise.
```
