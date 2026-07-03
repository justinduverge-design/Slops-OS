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

- Run the tests / checks that exist for what you touched. Don't push on the assumption something passes.
- State a plain complete/incomplete verdict before pushing — per the omen `AGENT.md` End Of Task Report and `definition-of-done.md` evidence discipline. If a DoD gate is skipped, unmet, or blocked, say so in the commit message or handoff — never push work described as done that isn't.
- "Complete" and "incomplete" both push fine. Silently-inaccurate does not.

**Do not announce capabilities you don't have.** Before claiming "I can't do X," check `RESOURCES_INDEX.md` — the skill, MCP, plugin, or connector may exist.

**This doctrine can be silently overridden by tool-level permission files** (e.g. `.claude/settings.json` `permissions.allow` entries, Codex approval-mode config). Those are enforced by the tool and win over what's written here regardless of what this file says. `git push` is a deliberate, resolved exception (see above) — everything else on this list should still match the tool's actual permission grants. If you find a mismatch, flag it to Justin rather than assuming which one is right.
