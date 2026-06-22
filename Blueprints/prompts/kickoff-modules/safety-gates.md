# Safety Gates

Stop and wait for Justin before:

- Any deploy or production action
- Any `git push` or PR merge
- Any secret / env edit
- Any database migration
- Any package-file edit (`package.json`, `requirements.txt`)
- Any cross-layer file move
- Any new dependency (flag it first; don't add silently)

**An intended `slops-tdd` RED before implementation is expected.** If the failure is for the wrong reason, or if any test/build fails after implementation or during the broader verification pass: STOP. Do not weaken the test to make it pass. Report the failure.

**If a guardrail skill (`slops-ui-ux-audit`, `slops-code-review`) returns P0 findings:** STOP. Do not commit. Surface the findings.
