# Infrastructure Service Map

_Last verified: 2026-09-23_

This is the current lightweight map of Slops OS infrastructure discovered and verified through Tailscale and host inspection. Keep this file factual and minimal. Do not store passwords, tokens, private keys, or secret contents here.

## Access model

Private/admin services should be reached over **Tailscale** unless a public route is intentionally documented elsewhere.

### Raspberry Pi SSH user

```text
darthslops@<tailscale-ip>
```

### VPS SSH user

Known working pattern on `srv1737978`:

```text
justin@<tailscale-ip>
```

Do not assume the same username/key works on every VPS.

---

## Current hosts

### command-center

- **Tailscale IP:** `100.98.81.0`
- **Role:** home application / observability host
- **SSH:** `darthslops@100.98.81.0`

Confirmed Docker services:

| Service | Tailscale URL / Port | Notes |
|---|---|---|
| Beszel Hub | `http://100.98.81.0:8090` | Main Beszel dashboard |
| Uptime Kuma | `http://100.98.81.0:3001` | Main uptime dashboard |
| GlitchTip | `http://100.98.81.0:8000` | Web service |
| GlitchTip Postgres | `5432/tcp` | Internal container port; not a public/Tailscale browser endpoint |
| GlitchTip Valkey | `6379/tcp` | Internal container port; not a public/Tailscale browser endpoint |
| Pi-hole | LAN-bound DNS + web ports | DNS currently bound to `192.168.5.30:53`; manage separately from the Tailscale web-service URLs |
| Beszel Agent | none exposed | Reports local host stats |

Verified Docker bindings:

```text
glitchtip-web        100.98.81.0:8000->8000/tcp
glitchtip-postgres   5432/tcp
glitchtip-valkey     6379/tcp
pihole               67/udp, 80/tcp, 192.168.5.30:53->53/tcp, 192.168.5.30:53->53/udp, 123/udp, 443/tcp
beszel-agent
beszel               100.98.81.0:8090->8090/tcp
uptime-kuma          100.98.81.0:3001->3001/tcp
```

### steward

- **Tailscale IP:** `100.118.42.54`
- **Role:** lightweight automation / operations worker
- **SSH:** `darthslops@100.118.42.54`
- **Current Second Brain direction:** preferred worker for WizardNote/Joplin ingestion automation
- **Do not overload with:** databases, local LLMs, or large app stacks

### sentinel

- **Tailscale IP:** `100.109.57.11`
- **Role:** passive security / network observer
- **SSH:** `darthslops@100.109.57.11`
- Keep security/observation duties isolated from unrelated application workloads.

### srv1737978

- **Tailscale IP:** `100.115.155.19`
- **Role:** Omen application host / monitored VPS
- **SSH:** `justin@100.115.155.19`

Confirmed Docker services:

```text
omen_cron
omen_api              127.0.0.1:3000->3000/tcp
beszel-agent
beszel-docker-proxy   127.0.0.1:2375->2375/tcp
```

Beszel agent reports to:

```text
http://100.98.81.0:8090
```

The Beszel token/key contents are Docker secrets and must never be copied into this repository.

### srv1647690

- **Tailscale IP:** `100.67.187.57`
- **Role:** not yet re-verified
- **SSH status:** `justin@100.67.187.57` rejected the current Mac key with `Permission denied (publickey)`
- Do not change SSH configuration or reset credentials until its intended access method and role are recovered.

---

## Client devices

| Device | Tailscale IP | Notes |
|---|---|---|
| iPhone 15 | `100.69.90.8` | Primary mobile access/capture device |
| MacBook Neo | `100.113.96.22` | Primary Mac admin/development client |
| Windows desktop | `100.122.57.23` | Was offline during 2026-09-23 verification |

---

## Quick mobile access

With Tailscale connected on the iPhone:

```text
Beszel:      http://100.98.81.0:8090
Uptime Kuma: http://100.98.81.0:3001
GlitchTip:   http://100.98.81.0:8000
```

If a saved URL does not work on mobile, first check whether it uses `localhost`, `127.0.0.1`, a desktop-only proxy, or another machine-specific address.

---

## Maintenance rule

Whenever a service moves, a host is renamed, or a Tailscale IP/port changes:

1. Verify the live host.
2. Update this file in the same session.
3. Do not record secrets.
4. Prefer Tailscale/private access for admin services.
