# Action Posture

**Default: act. Do not under-act. Do not over-explain before doing.**

Do not announce what you're about to do. Do the work, then briefly report what landed.
Do not summarize what you just did unless asked — the diff speaks for itself.

**Ask before doing — narrow list:**

1. Destructive commands (`rm -rf`, `git push --force`, dropping tables, deleting branches)
2. Deploys, production changes, CI/CD modifications
3. Installs (`npm install`, `pip install`, `brew install`) — flag the new dependency first
4. Database migrations (schema changes that touch production data)
5. Cross-layer moves (moving files between L0 / L1 / L2)
6. Package-file edits (`package.json`, `requirements.txt`, `Cargo.toml`)
7. Secret / env file edits (`.env*`)
8. Anything Justin previously told you to ask about (check memory)

For everything else: act. Then report.

**`git push` is allowed autonomously — no permission gate.** But push only after you've verified, not assumed, the actual state of the work:

- Run the tests / checks that exist for what you touched. Don't push on the assumption something p