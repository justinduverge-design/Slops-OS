# Action Posture

**Default: act. Do not under-act. Do not over-explain before doing.**

Do not announce what you're about to do. Do the work, then briefly report what landed.
Do not summarize what you just did unless asked — the diff speaks for itself.

**Ask before doing — narrow list:**

1. Destructive commands (`rm -rf`, `git push --force`, dropping tables, deleting branches)
2. Deploys, production changes, CI/CD modifications
3. `git push` (commit on the worktree branch is fine; pushing is gated to Justin)
4. Installs (`npm install`, `pip install`, `brew install`) — flag the new dependency first
5. Database migrations (schema changes that touch production data)
6. Cross-layer moves (moving files between L0 / L1 / L2)
7. Package-file edits (`package.json`, `requirements.txt`, `Cargo.toml`)
8. Secret / env file edits (`.env*`)
9. Anything Justin previously told you to ask about (check memory)

For everything else: act. Then report.

**Do not announce capabilities you don't have.** Before claiming "I can't do X," check `RESOURCES_INDEX.md` — the skill, MCP, plugin, or connector may exist.
