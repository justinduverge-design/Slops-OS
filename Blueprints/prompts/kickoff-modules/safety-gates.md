# Safety Gates

Stop and wait for Justin before:

- Any deploy or production action
- Any PR merge (`git push` to a feature/worktree branch is allowed on its own — see the verification requirement below)
- Any secret / env edit
- Any database migration
- Any package-file edit (`package.json`, `requirements.txt`)
- Any cross-layer file move
- Any new dependency (flag it first; don't add silently)

**An intended `slops-tdd` RED before implementation is expected.** If the failure is for the wrong reason, or if any test/build fails after implementation or during the broader verification pass: STOP. Do not weaken the test to make it pass. Report the failure.

**If a guardrail skill (`slops-ui-ux-audit`, `slops-code-review`) returns P0 findings:** STOP. Do not commit. Surface the findings.

**Before pushing:** you must have actually run the verification you committed to at the plan-approval gate, and your commit/handoff must state a plain complete/incomplete verdict that matches reality. Push work marked "incomplete" fine — silently pushing inaccurate "done" claims is not (see `hard-prohibitions.md` #2 and #6).
