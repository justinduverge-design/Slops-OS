# New Machine Setup Playbook

**Purpose:** get any machine — macOS, Windows, or Linux — ready to work on Slops OS:
clone the repos, install the agents (Claude Code + Codex), wire up the GitHub MCP,
join Tailscale, and run the build loop.

**Scope:** developer workstation setup. Server (KVM1/KVM2) provisioning is separate —
see `vps-hardening-plan.md`. Untrapping repos from a synced folder: `migrate-repos-out-of-onedrive-playbook.md`.

> Lives in the parent `Slops-OS` repo (`Blueprints/playbooks/`), so `git pull` brings it to every machine.

---

## Read first — hard-won gotchas

These three caused real pain. Avoid them up front.

1. **Never put the repos in a cloud-synced folder.** iCloud Drive (macOS Desktop/Documents),
   OneDrive (Windows Desktop/Documents), Google Drive, Dropbox — all of them try to sync
   `node_modules/` (tens of thousands of files) and the `.git` internals, which causes sync
   thrashing and can corrupt the repo. Keep code in a **local, non-synced** path. Your real
   cross-machine sync is **GitHub**, not the cloud drive. If you want the folder visible on a
   synced Desktop, put an **alias/shortcut** there, not the folder itself. Already trapped in a
   synced folder? See `migrate-repos-out-of-onedrive-playbook.md`.
2. **GitHub HTTPS auth uses a Personal Access Token (PAT), not your account password** — for
   **both clone and push**. If git prompts for a password, paste a PAT there. The clean fix that
   covers every future `git push` is `gh auth login` (browser-based, no token to manage). Set
   this up once per machine — see "Git identity & push auth" in step 2. Symptom when it's missing:
   `Password authentication is not supported for Git operations. Authentication failed`.
3. **Mind your shell's PATH.** On macOS the default shell is now `zsh`, but Terminal may still
   open `bash` on older accounts. Installers add their PATH line to one shell's rc file
   (usually `~/.zshrc`); if you're in the other shell, the command looks "not found." If a
   freshly installed CLI isn't found, try the other shell or re-source the rc file.

---

## Recommended local home (non-synced)

| OS      | Suggested path                | Notes                                   |
|---------|-------------------------------|-----------------------------------------|
| macOS   | `~/Developer/SlopsOS`         | `~/Developer` gets a special Finder icon |
| Windows | `C:\dev\SlopsOS`              | Short path avoids MAX_PATH issues        |
| Linux   | `~/code/SlopsOS`              | Anywhere outside a synced dir            |

Target layout (Company → Division → Product):

```
SlopsOS/
├── code/
│   ├── slops-os/                 ← parent repo (github.com/justinduverge-design/Slops-OS)
│   └── slops-saloon/
│       └── omen/               ← product repo (github.com/justinduverge-design/omen)
└── docs/                         ← optional local notes
```

---

## 1. Prerequisites

Install **git** and **Node.js 24** (the CI builds on Node 24, so match it).

| OS      | git                          | Node.js 24                                    |
|---------|------------------------------|-----------------------------------------------|
| macOS   | `xcode-select --install` or `brew install git` | `brew install node@24` or installer from nodejs.org |
| Windows | `winget install Git.Git`     | `winget install OpenJS.NodeJS` (or nvm-windows) |
| Linux   | `sudo apt install git` (Debian/Ubuntu) | NodeSource setup script, or `nvm install 24` |

Verify:

```
git --version
node --version    # expect v24.x
npm --version
```

---

## 2. Clone the repos

Both repos are **private** — you'll authenticate (PAT or `gh`/Desktop) on first clone.

```
# from your chosen local home, e.g. ~/Developer/SlopsOS
mkdir -p code/slops-saloon
git clone https://github.com/justinduverge-design/Slops-OS.git code/slops-os
git clone https://github.com/justinduverge-design/omen.git   code/slops-saloon/omen
```

Install Omen dependencies (root + frontend):

```
cd code/slops-saloon/omen
npm ci
npm --prefix frontend ci
```

### Git identity & push auth (once per machine)

Do this before your first commit/push, or commits get misattributed and pushes fail auth.

**Identity** — so commits are authored as you, not `user@hostname`:

```
git config --global user.name "Justin Duverge Catalino"
git config --global user.email "YOUR_GITHUB_EMAIL"
```

If a commit already landed with the wrong author, re-stamp it before pushing:

```
git commit --amend --reset-author --no-edit
```

**Push auth** — GitHub HTTPS needs a credential helper (password auth is dead). Easiest:

```
gh auth login        # GitHub.com → HTTPS → login via browser   (brew/winget install gh if missing)
gh auth setup-git    # registers gh as git's credential helper
```

Alternative without `gh`: run `git push`, and when prompted for a password, paste a **PAT**.
The OS credential helper (macOS Keychain / Windows Credential Manager) caches it after that.

---

## 3. Install Claude Code (frontend-lean agent)

```
npm install -g @anthropic-ai/claude-code
```

If you hit `EACCES` / permission denied on macOS/Linux, prefix with `sudo`. On Windows run the
terminal as Administrator if needed. Then launch and sign in to your Claude account:

```
claude
```

First launch walks you through account sign-in.

---

## 4. Install Codex (backend-lean agent)

```
npm install -g @openai/codex
```

(Alternatively `brew install codex` on macOS, or the desktop app.) Sign in when prompted:

```
codex
```

---

## 5. GitHub MCP for Claude Code (PAT route)

**Important:** the GitHub MCP endpoint (`https://api.githubcopilot.com/mcp/`) does **not**
support dynamic client registration, so the OAuth flow fails in both Cowork and Claude Code.
Use a **Personal Access Token** instead — that the server accepts.

This config is **per-machine** (`~/.claude.json`); it does not sync. Repeat on each machine,
and use a **separate token per machine** so you can revoke one without breaking the others.

1. Create a token at **github.com → Settings → Developer settings → Personal access tokens →
   Tokens (classic) → Generate new token (classic)**, scope **`repo`**.
2. Register the server at user scope (works in any OS shell — PowerShell accepts the same
   double-quoted header):

   ```
   claude mcp add --transport http --scope user github https://api.githubcopilot.com/mcp/ --header "Authorization: Bearer ghp_YOUR_TOKEN"
   ```

3. **Restart Claude Code** (new MCP servers load only at startup), then run `/mcp` — `github`
   should show **connected**.

Notes:
- `/mcp` is a **Claude Code** command. In the Cowork desktop app, `/` lists *skills*, not MCP servers.
- The token is stored in **plaintext** in `~/.claude.json`. Keep it scoped to `repo`.
- **On a borrowed/shared machine, revoke the token when done** (github.com → the token → Delete).
- Verify any time with `claude mcp list`.

---

## 6. Tailscale (reach the servers)

The servers live on the `tailef1902.ts.net` tailnet. KVM1's MagicDNS name is
`srv1737978.tailef1902.ts.net`; SSH user is `justin`.

**Install:**

| OS      | Install                                                        |
|---------|----------------------------------------------------------------|
| macOS   | Mac App Store ("Tailscale") or `tailscale.com/download/mac`     |
| Windows | `winget install Tailscale.Tailscale` or the MSI from tailscale.com |
| Linux   | `curl -fsSL https://tailscale.com/install.sh \| sh`             |

**Connect & verify:**

```
tailscale status          # KVM1 (srv1737978) and KVM2 should appear
```

Sign in to the tailnet account; approve the device in the admin console if device approval is on.

**SSH into KVM1:**

```
ssh justin@srv1737978.tailef1902.ts.net
```

Works once KVM1's `sshd` accepts your key. For keyless access, enable Tailscale SSH on the
server (`sudo tailscale up --ssh`) plus an ACL rule allowing your user to SSH the server tag.

---

## 7. CI deploy-fallback secrets (GitHub-side, OS-agnostic)

The manual Tailscale deploy fallback (`omen/.github/workflows/deploy-kvm1-tailscale-fallback.yml`)
needs these in **GitHub → repo → Settings → Secrets and variables → Actions**. These are
account/repo settings, not per-machine.

Required **secrets:** `TS_OAUTH_CLIENT_ID`, `TS_OAUTH_SECRET`, `KVM1_USER` (=`justin`),
`KVM1_SSH_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL`,
`VITE_ESPN_ENABLED`.

Optional **variable:** `KVM1_TAILSCALE_HOST` (defaults to `srv1737978.tailef1902.ts.net`).

Tailscale admin console:
- An **OAuth client** (Settings → OAuth clients) with device-write scope, tagged **`tag:github`**.
- ACL policy defines `tag:github` in `tagOwners` and grants it SSH access to KVM1 (port 22).

---

## 8. Open a terminal from a folder (convenience)

| OS      | How                                                                                  |
|---------|--------------------------------------------------------------------------------------|
| macOS   | System Settings → Keyboard → Keyboard Shortcuts → Services → Files and Folders → enable "New Terminal at Folder". Bind a key (we use **⌃⌥T**). **Select the folder first**, then press it; with nothing selected it does nothing. Right-click → Services also works. |
| Windows | In File Explorer, click the address bar, type `wt` (Windows Terminal), `pwsh`, or `cmd`, press Enter. Or Shift + right-click → "Open in Terminal" / "Open PowerShell window here". |
| Linux   | Most file managers have right-click → "Open Terminal Here" (GNOME Files may need `nautilus-extension-gnome-terminal`). Otherwise `cd` to the path. |

---

## 9. Run the build loop

Full operator guide: `omen/Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md`.

1. **(Optional) pin a task** — edit `omen/Direction/agent_inbox.md` → Active Task. Leave it
   empty to let each agent auto-pull the top item in its lane; fill it to override the queue
   (required if you want a specific task that isn't top of its lane).
2. **Paste the kickoff** for the agent you want:
   - Any Omen session → `omen/Blueprints/prompts/kickoff.md` (run in any runtime;
     the kickoff is layer- and capability-named, not vendor-named, and confirms the
     session's actual capabilities before applying any trust assignment)
3. The agent self-pulls, hits the **plan-approval gate**, and waits for your confirm before building.

---

## Appendix — borrowed / temporary machine cleanup

When done on a machine that isn't yours to keep:

- Revoke the GitHub PAT (github.com → Developer settings → the token → Delete).
- Sign out / remove the device from Tailscale (admin console → Machines → the device → Remove).
- Sign out of Claude Code and Codex.
- Delete the local repo clone if it contains any local `.env`/secrets.
