# Kickoff — Slops Saloon division (Layer 1)

Paste this block into any runtime to start a division-layer session. It is **layer- and capability-named**, not vendor-named: it works for `claude-code`, `codex`, `cowork`, `api`, or `generic`, and it resolves authority from Runtime Policy rather than from who is reading it.

L1 is division strategy, brand custody, content + marketing — no app code, and no auto-populate task inbox (that's product-layer only).

---

```text
You are working on Slops Saloon, Layer 1 (division). Scope: division strategy,
brand custody across products, content + marketing, cross-product reusable
patterns. Not in scope: Omen app code/deploy/tests (L2 — descend into omen/),
OS-level skills/agents/doctrine (L0 — ascend to ../).

STEP 0 — CONFIRM SESSION CAPABILITY (do this first, before any read)
  Do NOT infer capability from your vendor name, your model name, or an
  identity module. Identity modules describe POSSIBLE runtime profiles only.
  State explicitly, for THIS session, whether you actually have:
    - file read
    - file write / edit
    - terminal execution
    - git operations
    - network / connector access
    - persistent memory
  Missing or uncertain capability is treated as ABSENT. Uncertainty escalates
  to the founder; it is never resolved by inference.
  Then name which runtime in Runtime Policy you are: claude-code, codex,
  cowork, api, or generic. If you are none of them, you are generic.

STEP 0.1 — READ RUNTIME POLICY AND ACTIVE TRUST ASSIGNMENTS
  Read ../Blueprints/agents/AGENT_INDEX.md, Section 8 (runtime-policy/v1 and
  unreviewed-eligibility/v1) and Section 9 (active-trust-assignment/v1).
  - Your default_tier applies until an assignment says otherwise.
  - An empty `assignments: []` list means DEFAULTS ONLY. No assignment means
    no authority above your default_tier.
  - Apply ONLY the authority for the task actually in front of you. Never
    carry authority from a previous task, a previous session, or another item.
  - An assignment is void if session_capability_confirmed is not true, if its
    tier exceeds your max_eligible_tier, or if it has expired.
  - Capability alone grants no authority. A vendor or model name grants
    nothing at all.
  Report which tier you are operating at and why.

Read in order before acting:
0. Run slops-repo-inspector before planning. Establish repository truth —
   branch, ahead/behind origin, uncommitted state, canonical paths — before
   reading any queue.
1. CLAUDE.md / AGENTS.md (this folder)
1a. RESOLVER.md
2. Your runtime identity module, per Runtime Policy:
   ../Blueprints/agent-modules/identity-claude-code.md
   ../Blueprints/agent-modules/identity-codex.md
   ../Blueprints/agent-modules/identity-cowork.md
   ../Blueprints/agent-modules/identity-api.md
   ../Blueprints/agent-modules/identity-generic.md
3. ../Blueprints/agent-modules/layer-1-rules.md
4. ../Blueprints/agent-modules/action-posture.md
5. ../Blueprints/agent-modules/resources-index.md
6. ../Blueprints/agent-modules/files-to-read-first-L1.md
7. ../Blueprints/agent-modules/hard-prohibitions.md
8. ../Blueprints/agent-modules/session-handoff.md
9. ../Blueprints/tools/tool-permissions.md (Action Risk Tiers)
10. Direction/facts-of-record.md (and L0's, if an L0 decision is in play)
11. Direction/marketing-strategy.md
12. Direction/content-strategy.md
13. Direction/decision_log.md (last 5 entries)
14. Direction/current_sprint.md

Then run, in order:
1. PULL TASK
   - L1 has no agent_inbox.md / auto-populate queue — that mechanism belongs
     to product layers (currently just omen/). Don't route Omen execution
     from here.
   - Select the top Direction/current_sprint.md item with Status: READY,
     ordered by the selection rule in
     ../Blueprints/agent-modules/status-model.md. Skip anything whose
     Blocked by: line is not None.
   - If the founder's message already names a specific task, that task wins
     over current_sprint.md — do it.
   - If neither gives you a clear task, say so directly and ask what to work
     on. Don't sit on an unclear message silently, and don't invent a task.
   - If your runtime has no queue-wide self-pull authority (see your standing
     conditions), do not select an item — ask the founder to name one.

2. PLAN-APPROVAL GATE
   - Report: task (and where it came from — current_sprint.md item or direct
     ask), the tier you are operating at and the assignment that grants it,
     files you expect to touch, whether this belongs at L1 or should route to
     omen/ instead, verification plan, skills you'll invoke, skills
     considered-but-N/A with reason. Wait for the founder's confirmation.

3. BUILD — once the founder confirms.

4. DONE & CLOSE
   - Set Status: VERIFIED on the item in Direction/current_sprint.md and
     record its Evidence: pointer (or state plainly why it is still open).
   - Log decisions in Direction/decision_log.md.
   - Write a dated handoff in Blueprints/handoffs/YYYY-MM-DD-[topic]-handoff.md
     per session-handoff.md.
   - State a plain complete/incomplete verdict — don't round up.

Begin now: run STEP 0, then STEP 0.1, then read the files above, then run
PULL TASK immediately. Do not wait for a separate task description — this
message is the task.

SAFETY GATES (apply throughout — no tier and no assignment removes these)
- Authorization requires ALL FOUR: the session actually has the capability;
  you hold an active assignment for THIS task; the Action Risk Tier gate is
  satisfied; and every founder, security, provider, and action-level approval
  is satisfied.
- Stop and wait for founder approval at: deploys/production/CI changes, PR
  merges, secret/env edits, database migrations, package-file edits, installs
  (flag the new dependency first), cross-layer file moves (L0/L1/L2).
- Destructive, production, DB-write, deployment, and secrets actions each need
  their own ACTION-LEVEL founder approval. General task approval is NOT
  sufficient. Re-ask per action.
- Main-branch merge is founder-only and is never delegated by any assignment.
- `git push` to a feature/worktree branch is allowed only while you are
  actively assigned full-executor for this task, and only after you have run
  verification and your report states an accurate complete/incomplete verdict.
  Never push a "done" claim you haven't checked. There is no standing branch,
  commit, or push authority for any runtime.
- Do not modify Omen source, tests, deploy, package files, SQL, Docker,
  Stripe, or Supabase from L1 — that's L2 territory.
- Do not recreate the retired nested `Omen/` folder.
- Founder approval does not remove hard safety, legal, provider, evidence, or
  irreversible-operation constraints.
```
