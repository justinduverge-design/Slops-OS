# VPS Hardening Plan

Use this when setting up a new VPS before installing apps, Docker services, databases, agents, or public web traffic.

This guide is written for a solo founder/operator. The goal is not "perfect security." The goal is a calm, repeatable baseline that blocks common attacks, keeps you from locking yourself out, and makes recovery possible.

## Golden Rules

- Keep one working SSH session open while changing SSH settings.
- Confirm key-based login works before disabling password login.
- Do not open app, model, database, Redis, or admin ports to the public internet.
- Never paste private keys, passwords, tokens, `.env` files, or cookie values into chat.
- Back up config files before changing them.
- Change one layer at a time, then verify.
- If a command belongs on your local machine, run it in PowerShell. If it belongs on the VPS, run it in the SSH terminal. Mixing these up is common and usually harmless, but it can waste time.
- After every major phase, write a short checkpoint file with what changed, what passed, and what remains.

## Phase 1 - Know The Box

What to confirm:

```bash
hostname
whoami
lsb_release -a
ip addr
```

Why it matters:

You need to know which machine you are touching, which user you are using, and whether the OS matches the expected runbook. This prevents doing production work on the wrong server or following Ubuntu instructions on a different system.

Good outcome:

- You know the VPS provider, public IP, OS version, and purpose.
- The box has a clear role, such as "KVM1 = Omen app" or "KVM2 = private model host."
- You know whether you are on the new box, the old production box, or a utility/model box before changing anything.

## Phase 2 - Create A Non-Root Admin User

First check whether a non-root admin already exists:

```bash
ls /home
grep -E '^(sudo|admin):' /etc/group
```

If an existing user is already in the `sudo` group, prefer using that user instead of creating a duplicate. For example, some Ubuntu images already have an `ubuntu` sudo user.

Commands:

```bash
adduser justin
usermod -aG sudo justin
rsync --archive --chown=justin:justin /root/.ssh /home/justin
```

Verify:

```bash
ssh justin@SERVER_IP
whoami
sudo whoami
```

Expected:

```text
justin
root
```

If `sudo` rejects the password, reset the user's password from the still-open root session:

```bash
passwd justin
usermod -aG sudo justin
groups justin
```

Why it matters:

Root is the all-powerful account. If attackers can log in as root, they skip a whole layer of defense. A normal admin user with `sudo` gives you power when needed, but does not leave the most dangerous account exposed to the internet.

## Phase 3 - Confirm SSH Key Login

On your local machine, find your public key:

```powershell
type C:\Users\JDuve\.ssh\id_ed25519.pub
```

On the VPS, confirm the key is in:

```bash
~/.ssh/authorized_keys
```

Fix ownership and permissions:

```bash
sudo chown -R justin:justin /home/justin/.ssh
chmod 700 /home/justin/.ssh
chmod 600 /home/justin/.ssh/authorized_keys
```

Test from your local machine:

```powershell
ssh -o IdentitiesOnly=yes -i C:\Users\JDuve\.ssh\id_ed25519 justin@SERVER_IP
```

Why it matters:

SSH keys are much harder to brute-force than passwords. Password login is one of the most common ways internet-facing servers get attacked.

Good outcome:

- You can log in as the non-root user without typing the Linux password.
- You keep the current working session open until this is confirmed.

If key login still asks for a password, compare fingerprints without exposing secrets:

On your local machine:

```powershell
ssh-keygen -lf C:\Users\JDuve\.ssh\id_ed25519.pub
```

On the VPS:

```bash
ssh-keygen -lf ~/.ssh/authorized_keys
ls -ld ~ ~/.ssh ~/.ssh/authorized_keys
```

The fingerprints should match. Permissions should be tight:

```text
~/.ssh = 700
~/.ssh/authorized_keys = 600
```

If SSH debug output says only `password` can continue, the server is not offering public-key auth. Check SSH config before blaming the key.

## Phase 4 - Harden SSH

Find active SSH settings:

```bash
sudo grep -RniE 'PermitRootLogin|PasswordAuthentication|PubkeyAuthentication|KbdInteractiveAuthentication|AuthorizedKeysFile' /etc/ssh/sshd_config /etc/ssh/sshd_config.d
```

Back up files:

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup-$(date +%F-%H%M)
```

Set these values in the active config files:

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys .ssh/authorized_keys2
KbdInteractiveAuthentication no
```

Cloud images may override password login in `/etc/ssh/sshd_config.d/50-cloud-init.conf`. If so:

```bash
echo 'PasswordAuthentication no' | sudo tee /etc/ssh/sshd_config.d/50-cloud-init.conf
```

If `sshd -T` still reports the wrong value, search all active SSH config files:

```bash
sudo grep -RniE 'PermitRootLogin|PasswordAuthentication|PubkeyAuthentication|KbdInteractiveAuthentication|AuthorizedKeysFile' /etc/ssh/sshd_config /etc/ssh/sshd_config.d
```

Common gotchas:

- `/etc/ssh/sshd_config` may contain a later `PermitRootLogin yes` line that overrides an earlier setting.
- `/etc/ssh/sshd_config.d/50-cloud-init.conf` may set `PasswordAuthentication yes`.
- You must validate and restart SSH after changes.

Validate and restart:

```bash
sudo sshd -t
sudo systemctl restart ssh
```

Confirm:

```bash
sudo sshd -T | grep -E '^(permitrootlogin|passwordauthentication|pubkeyauthentication|authorizedkeysfile|kbdinteractiveauthentication)'
```

Expected:

```text
permitrootlogin no
passwordauthentication no
pubkeyauthentication yes
authorizedkeysfile .ssh/authorized_keys .ssh/authorized_keys2
kbdinteractiveauthentication no
```

Why it matters:

This shuts off the two easiest SSH attack paths: root login and password guessing. It leaves key-based admin access available.

Rollback:

Use your still-open session to restore the backup config, validate with `sudo sshd -t`, then restart SSH.

## Phase 5 - Firewall

Default rule:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Allow only the basics:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose
```

Expected:

```text
Status: active
Default: deny (incoming), allow (outgoing), deny (routed)
OpenSSH ALLOW
80/tcp ALLOW
443/tcp ALLOW
```

Do not publicly allow:

```text
3000
5432
6379
8000
8080
11434
```

If a private service must be reachable over Tailscale, allow it only on the Tailscale interface:

```bash
sudo ufw allow in on tailscale0 to any port 11434 proto tcp
```

Remove old one-off public allow rules when private networking replaces them. Example:

```bash
sudo ufw delete allow from OLD_PUBLIC_IP to any port 11434
```

Inspect listening ports:

```bash
sudo ss -tulpn
```

Good pattern:

- Public ports `22`, `80`, and `443` may listen on `0.0.0.0`.
- App ports such as `3000` should bind to `127.0.0.1`.
- Model ports such as `11434` should not be publicly allowed by UFW, even if the service listens broadly.

Why it matters:

The firewall makes the public internet see only what it must see. For a web app, that is usually SSH, HTTP, and HTTPS. Internal app ports should stay private behind Nginx or a private network.

## Phase 6 - Intrusion Slowdown With Fail2ban

Enable:

```bash
sudo systemctl enable --now fail2ban
sudo systemctl status fail2ban --no-pager
sudo fail2ban-client status sshd
```

Why it matters:

Fail2ban watches failed login attempts and temporarily bans repeat offenders. It does not replace SSH hardening, but it cuts down noisy brute-force traffic.

Good outcome:

- `fail2ban` is active.
- The `sshd` jail is active.

## Phase 7 - Automatic Security Updates

Install:

```bash
sudo apt install -y unattended-upgrades apt-listchanges needrestart
sudo dpkg-reconfigure unattended-upgrades
```

Choose `Yes`.

Why it matters:

Security patches close known vulnerabilities. Automatic updates reduce the chance that a forgotten VPS sits exposed with old packages.

Check:

```bash
systemctl status unattended-upgrades --no-pager
```

## Phase 8 - Baseline Security Services

Enable common safety services:

```bash
sudo systemctl enable --now apparmor
sudo systemctl enable --now auditd
sudo systemctl enable --now qemu-guest-agent
```

Check:

```bash
sudo systemctl status apparmor --no-pager
sudo systemctl status auditd --no-pager
sudo systemctl status qemu-guest-agent --no-pager
```

Why each matters:

- AppArmor limits what some programs can do if they are compromised.
- auditd records security-relevant system events for later investigation.
- qemu-guest-agent improves VPS provider integration, shutdown behavior, and visibility.

## Phase 9 - Backups Before Real Work

Minimum backup plan:

- Keep secrets in a password manager or encrypted note.
- Back up `/etc/ssh/sshd_config` before SSH changes.
- Back up app `.env.production` off-box.
- Use restic or provider snapshots once the app is deployed.

Why it matters:

Most VPS failures are recoverable if code is in git and secrets are backed up. The app can be rebuilt. Lost secrets and lost SSH access are the painful parts.

## Phase 10 - Private Networking

For services that should not be public, use a private link such as Tailscale.

Examples:

- KVM1 app server reaches KVM2 model server privately.
- `LLM_BASE_URL` points to KVM2's Tailscale IP.
- Ollama or model ports are never exposed to the public internet.

Why it matters:

Private networking lets servers talk to each other without turning internal services into public targets.

Install and connect:

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4
```

Test private service reachability from the caller box:

```bash
curl http://TAILSCALE_IP:11434/api/tags
```

Good outcome:

- The private request succeeds.
- The public firewall does not expose that same service broadly.
- Application env points to the private IP, such as `LLM_BASE_URL=http://TAILSCALE_IP:11434`.

## Phase 11 - App Deployment Guardrails

Before deploying an app:

- Confirm SSH hardening.
- Confirm UFW only allows SSH, 80, and 443.
- Confirm Docker app ports bind to `127.0.0.1`, not `0.0.0.0`.
- Put Nginx in front of the app.
- Use Certbot for HTTPS.
- Store env files only on the server and off-box backup, never in git.
- Keep database/cache/model services off the public internet unless there is an explicit, reviewed reason.
- If Docker says `permission denied while trying to connect to the docker API`, add the deploy user to the Docker group and log out/in:

```bash
sudo usermod -aG docker USERNAME
groups USERNAME
```

- For private GitHub Container Registry images, log in with a GitHub personal access token, not a GitHub password:

```bash
docker login ghcr.io -u GITHUB_USERNAME
```

- The password prompt expects the PAT token. For pulling images, the token needs `read:packages`.
- If cloning a private GitHub repo over HTTPS, Git also expects a PAT token, not the GitHub password. Repo access is separate from package access.
- If repo files are not yet pushed, copy deploy artifacts with `scp` instead of fighting `git clone`.

Why it matters:

This keeps the public surface small. Users reach Nginx over HTTPS. Nginx reaches the local app. The app reaches managed services or private services. Nothing else is exposed.

## Phase 12 - Cutover Checkpoint

When a server begins serving real traffic, create a checkpoint file in the relevant repo or operations folder.

Include:

- Public IP and hostname.
- Non-root deploy user.
- SSH hardening status.
- Firewall status.
- Private networking status.
- Runtime env path, without values.
- Image pull status.
- Container health and readiness.
- Nginx proxy status.
- DNS state.
- HTTPS/Certbot state.
- Browser smoke results.
- Remaining steps.
- Rollback notes.

Why it matters:

Cutovers are stressful. A checkpoint lets you pause, sleep, resume, or hand off without relying on memory. It also gives future you a clean incident-recovery map.

## Quick Verification Checklist

Run:

```bash
whoami
sudo whoami
sudo sshd -T | grep -E '^(permitrootlogin|passwordauthentication|pubkeyauthentication|authorizedkeysfile|kbdinteractiveauthentication)'
sudo ufw status verbose
sudo systemctl is-active fail2ban
sudo fail2ban-client status sshd
sudo ss -tulpn
```

Pass criteria:

- `whoami` is the non-root user.
- `sudo whoami` prints `root`.
- `permitrootlogin no`.
- `passwordauthentication no`.
- `pubkeyauthentication yes`.
- UFW is active.
- Only SSH, 80, and 443 are public inbound.
- Fail2ban is active.
- App and model ports are not publicly exposed.

## Stop And Ask If

- Key login does not work.
- SSH config validation fails.
- You see ports open that you do not recognize.
- You are about to edit DNS, SSL, production secrets, Docker deploys, databases, Stripe, or payment settings.
- You are not sure which VPS you are connected to.
