# Codex Prompt — Doc Cleanup: Archive + Context Merge
## Prompt for: Codex
## Operation type: File archiving + markdown edit
## Date: 2026-05-24
## Repo: SLOPS root (not ssffmvp)

---

## Scope Constraints

- Do NOT touch `.env`, secrets, keys, credentials
- Do NOT modify app source (src/, frontend/, scripts/, test/)
- Do NOT deploy or push
- Do NOT touch Archive/quarantine contents
- Do NOT modify `ssffmvp/` — it is a separate git repo
- Stop and report if anything is ambiguous before proceeding

---

## Step 1: Merge AI Rules from global-context.md into Direction/context.md

**Read first:** `Direction/global-context.md`

Find the "Universal AI Rules" section (six numbered rules):
1. Human-in-the-Loop
2. Conflict Resolution
3. Fact vs. Guess
4. Session Re-Anchoring
5. Now vs. Later
6. Practical Output
7. Context Preservation

**Edit:** `Direction/context.md`

Append a new section at the end of the file:

```markdown
## Universal AI Rules

These rules apply to all agents working at the SLOPS OS layer.

1. **Human-in-the-Loop** — Do not make final business or architecture decisions. Recommend, explain tradeoffs, and identify the strongest option.

2. **Conflict Resolution** — If instructions conflict and affect the outcome, pause and ask for clarification. If minor, make the safest practical assumption and explicitly label it.

3. **Fact vs. Guess** — Clearly label assumptions or inferences as **[Guess]** when data is missing or uncertain.

4. **Session Re-Anchoring** — At the end of major work sessions, update handoff files to maintain continuity across tool boundaries.

5. **Now vs. Later** — Ruthlessly separate what must be executed immediately from what should be deferred.

6. **Practical Output** — Do not just summarize the conversation. Conclude every response with the single next concrete action.

7. **Context Preservation** — Before initiating a large change, verify the proposal aligns with constraints in `Direction/` and does not break existing structures in `Solutions/`.
```

Do NOT copy the "Tool Specialization" section or "What Not To Do Yet" section — those are outdated.

---

## Step 2: Archive global-context.md

Move `Direction/global-context.md` to `Archive/global-context-pre-dbs.md`.

If `Archive/` does not exist, create it. If the file already exists in Archive, do not overwrite — stop and report.

---

## Step 3: Archive root ssffmvp/handoffs/ folder

The old handoffs location is `ssffmvp/handoffs/`. The canonical location is `ssffmvp/Blueprints/handoffs/`.

Create `ssffmvp/Archive/handoffs-pre-dbs/` (create the Archive folder inside ssffmvp if needed).

Move these files from `ssffmvp/handoffs/` into `ssffmvp/Archive/handoffs-pre-dbs/`:
- `decisions.md`
- `decision_log.md`
- `backend-to-frontend.md`
- `frontend-to-backend.md`

After moving, remove the now-empty `ssffmvp/handoffs/` folder.

---

## Step 4: Archive root ssffmvp/specs/ folder

The old specs location is `ssffmvp/specs/`. The canonical location is `ssffmvp/Blueprints/specs/`.

Create `ssffmvp/Archive/specs-pre-dbs/` (create folder if needed).

Move the entire `ssffmvp/specs/` directory tree into `ssffmvp/Archive/specs-pre-dbs/`. This includes all numbered spec folders (000–005) and their contents.

After moving, remove the now-empty `ssffmvp/specs/` folder.

---

## Step 5: Verify

Confirm:
- [ ] `Direction/context.md` now contains "Universal AI Rules" section
- [ ] `Direction/global-context.md` no longer exists (moved to Archive)
- [ ] `ssffmvp/handoffs/` folder no longer exists (contents in Archive)
- [ ] `ssffmvp/specs/` folder no longer exists (contents in Archive)
- [ ] `ssffmvp/Blueprints/handoffs/` is untouched
- [ ] `ssffmvp/Blueprints/specs/` is untouched

Report all files moved or modified.

---

## Do NOT

- Do not delete files — move them to Archive only
- Do not touch `ssffmvp/Blueprints/handoffs/` or `ssffmvp/Blueprints/specs/`
- Do not push or deploy
- Do not touch `.env`, secrets, app source, or production config
- Do not modify `Archive/quarantine/`
