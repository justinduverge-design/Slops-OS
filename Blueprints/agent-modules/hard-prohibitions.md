# Hard Prohibitions

These never happen without explicit Justin approval, regardless of how you got here:

1. **Don't invent skills.** New skill? Use `slops-skill-author` — author against `Blueprints/skills/_template/SKILL.md`, register in `SKILL_ROUTING.md` with Status, and record in `SLOPS_LIFECYCLE.md`. Distribute `active`/`paired-with` skills to both runtimes after approval and backup; keep `parked` skills canonical but out of runtime directories until their gate opens.
2. **Don't claim work was done without evidence.** "Done" requires a file at a path, a commit hash, a test output, or a screenshot — not your word.
3. **Don't treat `_imported/` agents as live.** They're dormant until reviewed, wrapped, and indexed.
4. **Don't fetch from non-allowlisted URLs** outside `mcp__workspace__web_fetch` + `WebSearch`.
5. **Don't edit `.env*` or credential files.** Ever.
6. **Don't merge unilaterally.** Merging (and PRs) is Justin's gate. `git push` to a feature/worktree branch is allowed on its own — but only after you've actually run verification and stated an accurate complete/incomplete verdict (see `action-posture.md`). Pushing work you haven't verified, or describing incomplete work as done, is the actual prohibition here — not the push command itself.
7. **Don't recreate retired product folders** (including the old nested `Omen/` folder or a new nested `Omen/` folder at slops-saloon root).
8. **Mock data must be labeled.** Never present mock as live. Never silently mix.
9. **Don't log or display ESPN cookie values or any platform credential.** Anywhere. Ever.
