# App Cutover Playbook

Use this when moving a web app onto a hardened VPS and switching real traffic to it — deploy, DNS flip, TLS, and verification — in a way you can roll back.

This playbook assumes the box is already hardened. If it is not, run `vps-hardening-plan.md` first. This guide picks up where that one's deploy guardrails (Phase 11) and checkpoint contents (Phase 12) leave off: the *ordered act of going live*. It does not repeat hardening, firewall, or registry-login detail — see `vps-hardening-plan.md` for those.

Written for a solo founder/operator. The goal is not a zero-downtime enterprise cutover. The goal is a calm, reversible one: every step is proven before the next, DNS is the last thing you change, and rollback is a single record edit because you wrote the old value down first.

## Golden Rules

- Prove the app on the new box by public IP + `Host` header **before** you touch DNS.
- DNS is the last switch you flip. Everything upstream of it is provable without it.
- Get HTTP working end to end before adding HTTPS. Add TLS to a known-good path, not a broken one.
- Keep the old box running and untouched until the new box is confirmed live and stable.
- Write down the current DNS value before you change it. That recorded value is your rollback.
- One change, then verify. Never stack app + DNS + TLS changes and hope.
- Never paste secrets, tokens, private keys, `.env`, or cookie values into chat.
- After every phase, update the cutover checkpoint file (`Blueprints/templates/cutover-checkpoint-template.md`).
- If a command belongs on your local machine, run it locally (PowerShell). If it belongs on the VPS, run it in the SSH session. Mixing them up wastes time.

## Phase 0 - Pre-Flight

Confirm before you start:

- The target box is hardened: non-root admin, key-only SSH, UFW limited to 22 / 80 / 443. See `vps-hardening-plan.md`.
- You know and have recorded the **current live DNS records** (this is the rollback target).
- You know the new box public IP and the intended hostname(s) — root and `www`.
- App images or deploy artifacts are reachable from the new box (registry login works, or files copied via `scp`).
- Managed data (database, cache, model host) lives off-box, so this cutover moves only the app tier.

Why it matters:

A cutover you can undo is one where you recorded the old value first and kept the old box alive. Establish both before changing anything.

## Phase 1 - Deploy the App on the New Box (no public DNS yet)

Bring the app up and confirm it is healthy locally, before any user-facing change.

```bash
# (registry login + image pull per vps-hardening-plan.md Phase 11)
docker compose -f deploy/<path>/docker-compose.prod.yml config --quiet
cd /opt/<app>
docker compose -f deploy/<path>/docker-compose.prod.yml up -d
```

Verify on the box itself:

```bash
curl -s http://127.0.0.1:<PORT>/api/health
curl -s http://127.0.0.1:<PORT>/api/ready
```

Good outcome:

- `/api/health` returns ok.
- `/api/ready` returns ready.
- Dependency report (DB, cache, model, auth) shows configured/reachable.

## Phase 2 - Put Nginx in Front and Prove It by Host Header

Install the site config and reload Nginx (see `vps-hardening-plan.md` Phase 11). Then prove the proxy answers for the real hostname — first locally, then from the public IP, still with no DNS change.

```bash
# on the box: local proxy answers for the real host
curl -s -H "Host: <example.com>" http://127.0.0.1/api/health
curl -s -H "Host: <example.com>" http://127.0.0.1/api/ready
```

```powershell
# from your machine: public IP answers for the real host, before DNS
curl.exe -H "Host: <example.com>" http://<NEW_IP>/api/ready
```

Good outcome:

The app answers for its real hostname over the public IP. **This is the decisive checkpoint.** Once this passes, you know the cutover will work — and you have changed nothing a user can see yet. If this fails, fix it here. Do not flip DNS to debug.

## Phase 3 - Flip DNS

Only after Phase 2 passes.

First record the current value (rollback target). Then change:

- Root `@` A record -> `<NEW_IP>`
- `www` CNAME -> root, or `www` A -> `<NEW_IP>`, kept consistent with root.

Verify resolution:

```powershell
nslookup <example.com>
nslookup www.<example.com>
```

Good outcome:

Both names resolve to `<NEW_IP>`. Propagation and cache lag are expected and harmless; a *wrong* record is not. If a name resolves to the old IP, that is usually cache, not failure — confirm the record itself is correct.

## Phase 4 - HTTPS

Issue certificates against the now-resolving hostnames.

```bash
sudo certbot --nginx -d <example.com> -d www.<example.com>
```

Verify both hosts:

```bash
curl -s https://<example.com>/api/health     # ok
curl -s https://<example.com>/api/ready       # ready
curl -I http://<example.com>                  # 301 -> https
curl -I https://<example.com>                 # 200, HSTS header present
```

Repeat the four checks for `www.<example.com>`.

Good outcome:

Both hostnames serve HTTPS, HTTP 301-redirects to HTTPS, and the HSTS header is present.

## Phase 5 - Browser Smoke

Open `https://<example.com>` and `https://www.<example.com>` in two browser engines (for example Chrome and Firefox).

Confirm:

- The app loads.
- No SSL warning appears.
- API calls use HTTPS.
- Login / account surfaces behave normally.

Why two engines: TLS, HSTS, and mixed-content behavior differ between browsers. Two engines catches the common surprises.

## Phase 6 - Checkpoint and Hold

- Write or update the cutover checkpoint using `Blueprints/templates/cutover-checkpoint-template.md`.
- Keep the old box running and untouched until the new box is stable for an agreed window.
- Record any launch-time toggles you deliberately left off (cron jobs, scoring, paid surfaces) under "Do Not Do Yet" so future-you does not flip them by accident.

Why it matters:

Cutovers are stressful. A checkpoint lets you pause, sleep, resume, or hand off without relying on memory, and gives future-you a clean recovery map.

## Rollback

If the new box fails after DNS cutover:

- Point the root `@` A record back to the recorded `<OLD_IP>` (from Phase 0/3).
- Keep `www` consistent with the root record.
- Expect DNS cache lag on the way back too — rollback is not instant.
- Because data is off-box (managed DB/cache), rolling back the app tier does not risk data.

## Stop And Ask If

- Phase 2 (public IP + `Host` header) does not pass — **do not flip DNS**.
- You do not know the current / rollback DNS value.
- `certbot` fails, or the issued cert covers the wrong names.
- Health and ready pass but the app misbehaves in the browser.
- You are about to decommission or repurpose the old box.
- You are about to change DNS, TLS, production secrets, payments, or any toggle a user can feel without a recorded reason and an explicit go-ahead.
