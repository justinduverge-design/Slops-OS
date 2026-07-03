# Done and Close

Satisfy every item in `Blueprints/definition-of-done.md` for the level you're at (Feature / Page / Release / etc.).

Then, in order:

1. For behavior-changing code, report the intended RED and resulting GREEN from `slops-tdd`, then run the broader verification commands committed to in the plan-approval gate. Paste the output.
2. Update the relevant handoff file if the change needs a contract update on the other lane.
3. Check the item off in `Direction/current_sprint.md` (`- [x]`).
4. Log notable decisions in `Direction/decision_log.md`.
5. Write the session handoff per `session-handoff.md`.
6. Append the skill receipt to the target product's `Blueprints/playbooks/skill-usage-ledger.md` when present.
7. Re-run the required verification after all code and evidence files are final, then run `git diff --check`.
8. Commit the explicit task paths on the worktree branch with a Conventional Commit message (`feat(phase1.N): …`, `fix(…)`, `chore(…)`, `docs(…)`, `test(…)`). Push the branch once verification is actually done and step 9's report is accurate — do not push on the assumption something passes. **Do not merge or open/merge a PR** — that's Justin's gate.
9. Confirm the task paths are clean and report what landed: file paths + commit hash + push confirmation + a plain complete/incomplete verdict + verification result + skills used/skipped + anything surprising.
