# Redirect — Wrong Layer

This file was created at the SLOPS layer by mistake.

**Canonical location:** `ssffmvp/Blueprints/prompts/codex-git-ssffmvp-clean-tree.md`

Do not run this file. Use the canonical version above.

---

<!-- original content archived below for reference only -->

# Codex Prompt — ssffmvp: Resolve Divergence and Clean Work Tree (STALE — DO NOT USE)
## Prompt for: Codex
## Operation type: Git — rebase, stage, and commit in logical groups
## Date drafted: 2026-05-23
## Date updated: 2026-05-24
## Repo: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`

---

## Context

The `ssffmvp` repo is on branch `main` with a divergence from `origin/main`:

- **Local has 3 commits** that do not exist on remote (DBS doc migrations):
  - `b656c18` fix: load agent prompts from DBS blueprint folder
  - `951790b` docs: organize ssffmvp and Corvus docs into DBS folders
  - `9283b7d` docs: update ssffmvp navigation for DBS layout

- **Remote has 3 commits** that do not exist locally (feature work):
  - `ded2b26` feat: title tag Corvus, ESPN disclosure, wire VITE_ESPN_ENABLED
  - `a2a4933` Merge pull request #19
  - `a058f6c` feat: launch Corvus landing and app contracts

- **16 modified files** (DBS docs + app source code)
- **15 untracked files** (new DBS docs + Omen MVP Move feature code)

The local and remote commits touch different files (docs vs. feature code),
so a rebase should be clean. If there are conflicts, stop immediately.

---

## Scope Constraints

- Do NOT open `.env`, `.key`, secrets, or credential files
- Do NOT touch `Archive/quarantine/`
- Do NOT `git push` — commit only in this prompt
- Do NOT auto-resolve merge conflicts — stop and report any conflict
- Do NOT run npm, docker, or any non-git commands

---

## Step 1: Verify current state

```bash
cd C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp
git status
git log --oneline -6
git log --oneline origin/main -6
```

Confirm divergence matches the context above before proceeding.

---

## Step 2: Resolve divergence with rebase

```bash
git pull --rebase origin main
```

**If this completes cleanly:** continue to Step 3.

**If there are conflicts:** run `git rebase --abort` immediately, report all
conflicting files, and stop. Do not attempt to resolve conflicts manually.

---

## Step 3: Verify rebase result

```bash
git log --oneline -8
git status
```

Confirm:
- Local commits now sit on top of the remote commits
- Working tree shows the same modified/untracked files as before

---

## Step 4: Commit Group A — DBS documentation (Phase 1–6)

Stage only the DBS markdown files (no source code):

```bash
git add Blueprints/handoffs/backend-to-frontend.md
git add Blueprints/handoffs/decisions.md
git add Blueprints/handoffs/rate-limit-shutdown-checkpoint.md
git add Blueprints/prompts/PROMPTS_CHANGELOG.md
git add Blueprints/prompts/espn-recovery-playbook.md
git add Blueprints/prompts/matchup-dvp-nflverse-development.md
git add Blueprints/prompts/omen-mvp-move-development.md
git add Blueprints/prompts/omen-mvp-move-frontend.md
git add Blueprints/prompts/omen-mvp-move-llm-reasoning.md
git add Blueprints/security-privacy.md
git add Blueprints/skills/
git add Corvus/Blueprints/README.md
git add Corvus/Blueprints/playbooks/
git add Corvus/Blueprints/specs/omen-mvp-move.md
git add Corvus/Direction/current_sprint.md
git add Direction/current_sprint.md
git add DBS_INDEX.md
```

Verify only docs are staged — no `.jsx`, `.js`, `.yaml`, or test files:

```bash
git diff --cached --name-only
```

Commit:

```bash
git commit -m "docs: DBS migration — layer docs, skills, handoffs, sprint context, and index

Adds and updates DBS-structured documentation across ssffmvp and Corvus layers:
- Blueprints: handoffs, prompts, skills, security-privacy doc
- Corvus/Blueprints: README, playbooks folder, omen-mvp-move spec
- Corvus/Direction: current sprint
- Direction: current sprint
- DBS_INDEX.md: root navigation index

Phases 1-6 of SLOPS OS DBS migration complete as of 2026-05-23."
```

---

## Step 5: Commit Group A2 — Doc pass and archive cleanup (2026-05-24)

Stage the doc pass additions and archive operations (markdown only, no source code):

```bash
git add CLAUDE.md
git add AGENT.md
git add agent_rules.md
git add context.md
git add current_sprint.md
git add decision_log.md
git add roadmap.md
git add agent_inbox.md
git add agent_handoff.md
git add Direction/context.md
git add Direction/decision_log.md
git add Direction/roadmap.md
git add Corvus/Direction/decision_log.md
git add Corvus/Direction/roadmap.md
git add Blueprints/prompts/codex-doc-cleanup-archive.md
git add Blueprints/prompts/codex-omen-path-canonicalize.md
git add Blueprints/specs/
git add Corvus/Blueprints/specs/
git add References/
git add Archive/
```

Verify only markdown/docs are staged — no `.jsx`, `.js`, `.yaml`, or test files:

```bash
git diff --cached --name-only
```

If any source files appear, un-stage them with `git restore --staged <file>` and report which files were found.

Commit:

```bash
git commit -m "docs: 2026-05-24 doc pass — agent files, redirect stubs, archive cleanup

Doc pass across ssffmvp and Corvus layers:
- CLAUDE.md: route table updated (omen row added), universal rules absorbed
- AGENT.md: canonical Omen path documented, universal rules absorbed
- agent_rules.md: retired stub (rules now in CLAUDE.md and AGENT.md)
- Root stubs: context.md, current_sprint.md, decision_log.md, roadmap.md,
  agent_inbox.md, agent_handoff.md converted to canonical redirects
- Direction: context.md (Universal AI Rules merged), decision_log.md updated
- Corvus/Direction: decision_log.md updated, roadmap.md rewritten post-launch
- New specs: infrastructure-boundaries.md, corvus-decision-layer.md,
  homepage-product-priority.md, spec-kit-usage.md
- References: nflverse-data-research.md, historical-handoffs/pre-dbs-contract-notes.md
- Archive: handoffs-pre-dbs/, specs-pre-dbs/, global-context-pre-dbs.md"
```

---

## Step 6: Commit Group B — Omen MVP Move feature

Stage the app source files and tests:

```bash
git add frontend/src/components/platforms/PlatformConnections.jsx
git add frontend/src/pages/Account.jsx
git add frontend/src/pages/Football.jsx
git add frontend/src/pages/Omen.jsx
git add probo.yaml
git add src/server.js
git add src/services/llm.js
git add src/services/matchupService.js
git add src/routes/omen.js
git add src/services/omen.js
git add test/matchupService.test.js
git add test/omenRoute.test.js
```

Verify staged files:

```bash
git diff --cached --name-only
```

Confirm only source/test/config files are staged — no markdown or doc files.

Commit:

```bash
git commit -m "feat: Omen MVP Move — routes, services, frontend page, and tests

Implements the Omen MVP Move feature end-to-end:
- src/routes/omen.js: Omen API route
- src/services/omen.js: Omen business logic
- frontend/src/pages/Omen.jsx: Omen frontend page
- Updates to server.js, llm.js, matchupService.js, probo.yaml
- Updates to Account.jsx, Football.jsx, PlatformConnections.jsx
- test/omenRoute.test.js: Omen route tests
- test/matchupService.test.js: updated matchup service tests"
```

---

## Step 7: Final verification

```bash
git status
git log --oneline -10
```

Expected:
- Working tree is clean
- Log shows the rebase result + 3 new commits on top (Group A, Group A2, Group B)

---

## Completion Checklist

- [ ] `git pull --rebase origin main` completed without conflicts
- [ ] Rebase confirmed clean — no conflicts encountered
- [ ] Group A (DBS docs Phase 1–6) committed as a separate commit
- [ ] Group A2 (doc pass 2026-05-24) committed as a separate commit
- [ ] Group B (Omen feature) committed as a separate commit
- [ ] `git status` is clean after all three commits
- [ ] Report back all three commit hashes and the final `git log --oneline -10`

---

## Do NOT

- Do not `git push`
- Do not `git pull --force` or `git reset --hard`
- Do not auto-resolve conflicts — abort rebase and report
- Do not run npm, docker, or build commands
- Do not open `.env`, `.key`, or credential files
