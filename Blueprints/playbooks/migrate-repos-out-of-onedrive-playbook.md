# Playbook — Move active repos OUT of OneDrive + back up to GitHub

**Why:** OneDrive holds file handles on `.git`, which corrupts the index, blocks lock removal, and races writes. Git wants a local, non-synced working directory. Target home: `C:\Users\JDuve\dev\`. Keep the OneDrive copy as a cold backup only.

**Remotes (both repos DO have one):**

| Repo | Location now | GitHub remote | Covers |
|------|--------------|---------------|--------|
| SLOPS OS (L0) | `...\Desktop\SLOPS` | `https://github.com/justinduverge-design/Slops-OS.git` | Layer 0 + Layer 1 (slops-saloon) |
| Corvus (L2) | `...\SLOPS\slops-saloon\corvus` | `https://github.com/justinduverge-design/corvus.git` | Layer 2 app |

> Note: `slops-saloon/corvus` is gitignored inside the L0 repo, so the SLOPS-OS push does NOT include Corvus — that's correct, Corvus backs up to its own repo.

---

## 0. Pre-flight (every time)

1. **Fully quit OneDrive** — tray cloud → *Quit OneDrive*. Pausing is NOT enough; only quitting releases the `.git` handles.
2. Open **PowerShell**.
3. `mkdir C:\Users\JDuve\dev` (ignore "already exists").

---

## 1. SLOPS OS (L0+L1) — heal, commit, push to Slops-OS.git

The repo already has commit `b7d7963` (the graphify hooks) waiting locally; it just can't be pushed from the sandbox (no credentials there). Do this on your machine.

**1a. Clear the stale locks + rebuild the corrupt index:**
```powershell
cd "C:\Users\JDuve\OneDrive\Desktop\SLOPS"
Remove-Item .git\index.lock,.git\HEAD.lock,.git\objects\maintenance.lock,.git\index -Force -ErrorAction SilentlyContinue
git reset            # rebuilds index from HEAD; working tree untouched
git status           # no more "index file corrupt"
git log --oneline -3 # confirm b7d7963 "graphify hook" is on top
```

**1b. Commit the new playbook (and decide on the rest):**
```powershell
# just this playbook (recommended — clean):
git add Blueprints/playbooks/migrate-repos-out-of-onedrive-playbook.md
git commit -m "docs(playbook): add migrate-repos-out-of-onedrive playbook"

# OR, full backup snapshot of everything dirty (~70 pre-existing modified files):
#   git add -A
#   git commit -m "chore: full snapshot before relocation"
# ^ only do this if you've eyeballed `git status` and nothing sensitive is in there.
```

**1c. Wire up the remote and push:**
```powershell
git remote add origin https://github.com/justinduverge-design/Slops-OS.git
git push -u origin master
```
If the remote already has history that conflicts: `git pull --rebase origin master` first, then push. If it's empty (it is right now), the plain push works.

---

## 2. Relocate L0 out of OneDrive (after the push succeeds)

```powershell
robocopy "C:\Users\JDuve\OneDrive\Desktop\SLOPS" "C:\Users\JDuve\dev\SLOPS" /MIR /R:1 /W:1
cd C:\Users\JDuve\dev\SLOPS
git status        # same state, now living outside OneDrive
git remote -v     # origin still points to Slops-OS.git
```
From now on work in `C:\Users\JDuve\dev\SLOPS`. GitHub is your real backup; demote the OneDrive copy (rename to `SLOPS-ARCHIVE-DO-NOT-EDIT`) so you don't open it by habit.

---

## 3. Corvus (L2) — fresh clone

Corvus has uncommitted work on disk (graphify edits + Codex WIP). Preserve it, then clone clean.
```powershell
cd "C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus"
Remove-Item .git\index.lock,.git\HEAD.lock,.git\objects\maintenance.lock -Force -ErrorAction SilentlyContinue
git add -A
git commit -m "wip: graphify hook + in-flight changes before relocation"
git push origin codex/phase1-4-font-system

cd C:\Users\JDuve\dev
git clone https://github.com/justinduverge-design/corvus.git
```
Work in `C:\Users\JDuve\dev\corvus` going forward.

---

## 4. Guardrails

- Never run git against a path under `OneDrive\` again — that's the whole point.
- The `Archive/quarantine/...sensitive...\.git` is a quarantined repo — leave it alone.
- Don't delete any OneDrive copy until the new repo is pushed AND `git status`/`git log` look right.
- L0 edits → Slops-OS.git. Corvus edits → corvus.git. Separate repos.
