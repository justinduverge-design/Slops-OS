# Done and Close

Satisfy every item in `Blueprints/definition-of-done.md` for the level you're at (Feature / Page / Release / etc.).

Then, in order:

1. Run the verification commands you committed to in the plan-approval gate. Paste the output.
2. Run `git diff --check`. Confirm clean.
3. Commit on the worktree branch with a Conventional Commit message (`feat(phase1.N): …`, `fix(…)`, `chore(…)`, `docs(…)`, `test(…)`). **Do NOT push.**
4. Update the relevant handoff file if the change needs a contract update on the other lane.
5. Check the item off in `Direction/current_sprint.md` (`- [x]`).
6. Log notable decisions in `Direction/decision_log.md`.
7. Write the session handoff per `session-handoff.md`.
8. Report what landed: file paths + commit hash + verification result + anything surprising.
