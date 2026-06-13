# <APP / HOST> Cutover Checkpoint

Last updated: <YYYY-MM-DD>

This file records the live cutover steps completed so far and what remains. It intentionally contains **no secrets, tokens, private keys, or `.env` values**. Copy this template per cutover; fill the `<...>` placeholders; delete sections that do not apply. Pairs with `Blueprints/playbooks/app-cutover-playbook.md`.

## Current State

- Target production host: <provider / box label, e.g. Hostinger KVM1>.
- New box public IP: `<NEW_IP>`.
- New box hostname observed: `<srvXXXX>`.
- Deploy user: `<non-root user>`.
- Private dependency host(s): `<label + private/Tailscale IP, if any>`.
- Data tier location (off-box): `<managed DB / cache, e.g. Supabase / Upstash>`.
- Old / rollback host IP: `<OLD_IP>`.

## Completed

### Box hardening
<!-- summarize; full procedure in vps-hardening-plan.md -->
- Non-root admin login verified (`<user>`), `sudo` confirmed, key-only SSH.
- SSH hardened: PermitRootLogin no / PasswordAuthentication no / PubkeyAuthentication yes.
- UFW active; public inbound limited to SSH/22, HTTP/80, HTTPS/443.

### Private service path (if applicable)
- Confirmed access to `<private host>`.
- Confirmed private link works (no public exposure):

```bash
curl http://<PRIVATE_IP>:<PORT>/<health-path>
```

### App env and images
- Created runtime env file on the box at `<path>`; permissions locked to `600`.
- Confirmed safe non-secret runtime values (list keys, **not** values):
  - `<KEY>=<safe value or "set, not shown">`
- Registry login confirmed; images pulled:
  - `<image:tag>`
- Compose config parses cleanly:

```bash
docker compose -f <path>/docker-compose.prod.yml config --quiet
```

### Containers and Nginx
- Containers started (`up -d`).
- Local container health confirmed:

```bash
curl -s http://127.0.0.1:<PORT>/api/health   # ok
curl -s http://127.0.0.1:<PORT>/api/ready     # ready
```

- Nginx site config installed; local proxy verified by Host header:

```bash
curl -s -H "Host: <example.com>" http://127.0.0.1/api/ready
```

- Public IP proxy verified **before** DNS cutover:

```powershell
curl.exe -H "Host: <example.com>" http://<NEW_IP>/api/ready
```

## DNS State

Old value recorded for rollback: root `@` -> `<OLD_IP>`.

DNS changes completed:

- Root `@` A record -> `<NEW_IP>`
- `www` CNAME -> `<example.com>` (or A -> `<NEW_IP>`)

Resolution confirmed:

```powershell
nslookup <example.com>        # -> <NEW_IP>
nslookup www.<example.com>    # -> <NEW_IP>
```

## HTTPS State

Certbot run for both hostnames. Confirmed:

- `https://<example.com>/api/health` -> ok
- `https://<example.com>/api/ready` -> ready
- `http://<example.com>` -> 301 to HTTPS
- `https://<example.com>` -> 200, HSTS present
- Same four confirmed for `www.<example.com>`.

## Browser Smoke

- <Chrome>: <pass/fail>.
- <Firefox>: <pass/fail>.
- App loads, no SSL warning, API over HTTPS, auth/account surfaces normal.

## Remaining Steps

- [ ] <next gated item>
- [ ] <final secrets / data settings review>
- [ ] <decommission timing for old box>

## Rollback Notes

If the new box fails after DNS cutover:

- Point root `@` A record back to `<OLD_IP>`.
- Keep `www` consistent with the root record.
- Expect DNS cache lag on rollback.
- Data is off-box, so app-tier rollback does not risk data.

## Do Not Do Yet

- Do not expose private/internal services publicly.
- Do not open the raw app port (`<PORT>`) to the public.
- Do not enable launch-disabled toggles: `<e.g. cron/scoring flag>`.
- Do not change payment / billing live behavior without an explicit decision.
- Do not paste env / secret values into chat.
- Do not decommission the old box until the stability window passes.
