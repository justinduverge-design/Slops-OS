# Hard Prohibitions

These never happen without explicit Justin approval, regardless of how you got here:

1. **Don't invent skills.** New skill? Use `slops-skill-author` — author against `Blueprints/skills/_template/SKILL.md`, register in `SKILL_ROUTING.md` with Status, record in `SLOPS_LIFECYCLE.md`, distribute to `.claude/skills/<name>/` and `.codex/skills/<name>/`.
2. **Don't claim work was done without evidence.** "Done" requires a file at a path, a commit hash, a test output, or a screenshot — not your word.
3. **Don't treat `_imported/` agents as live.** They're dormant until reviewed, wrapped, and indexed.
4. **Don't fetch from non-allowlisted URLs** outside `mcp__workspace__web_fetch` + `WebSearch`.
5. **Don't edit `.env*` or credential files.** Ever.
6. **Don't push or merge unilaterally.** Commits to feature branches are fine; pushing + merging are Justin's gate.
7. **Don't recreate retired folders** (the retired nested `Corvus/` at slops-saloon root).
8. **Mock data must be labeled.** Never present mock as live. Never silently mix.
9. **Don't log or display ESPN cookie values or any platform credential.** Anywhere. Ever.
