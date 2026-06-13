---
name: self-hosted-observability-runbook
description: Wire self-hosted observability (sentry-self-hosted + Umami + Vector log shipping) on KVM1 for any Slops product. Replaces SaaS Sentry/Plausible/Datadog. Closes Corvus launch gaps #10 (no error monitoring) and #14 (no analytics).
status: active
skill_type: package
layer: 0
default_agent: Claude first, Codex if writing files or running install commands
trigger: "wire observability | wire sentry | wire umami | add error monitoring | add analytics | log shipping"
version: 0.1.0
owner: Justin
---

# Self-Hosted Observability Runbook

## When to Use
Wiring observability into a new Slops product, or filling in a missing observability axis (errors, analytics, logs) on an existing one. Default target host is KVM1.

## Scope (one paragraph)
Stand up and wire three self-hosted services on KVM1 — `sentry-self-hosted` for backend + frontend error tracking, `Umami` for product analytics, and `Vector` (or rsyslog fallback) for log shipping from app containers to a central log store. Provide per-product wire-up: env keys, init snippet locations, dashboard bookmarks, and a retention policy. Includes a sovereignty audit step that confirms no telemetry is leaving KVM1.

## Required Inputs
- Target product name + repo root.
- Deploy host (default: KVM1).
- Product `.env.example` to add observability env keys to.

## Outputs
- `<product>/Blueprints/observability.md` — per-product wire-up doc (env keys, init snippet locations, dashboard URLs).
- A KVM1-side runbook at `Blueprints/playbooks/observability-stack-runbook.md` covering install, retention, backup, and rotation. (Written once; reused across all products.)
- A short audit checklist confirming "no telemetry leaves KVM1."

## Does NOT
- Install paid SaaS (no hosted Sentry, no Datadog, no Plausible Cloud, no New Relic).
- Decide PII redaction policy — that stays in `security-privacy-evidence`.
- Replace `slops-canary` (post-deploy watch) or `vps-hardening-plan` (host posture).

## Replaces / Complements
- **Net-new.** Complements `slops-canary`, `vps-hardening-plan.md`, `app-cutover-playbook.md`.
- Removes the implicit "we'll add Sentry later" item from every product's TODO.

## Verification
- Smoke test: trigger a controlled error in the wired product; confirm it appears in self-hosted Sentry within 60s.
- Smoke test 2: visit one wired page; confirm Umami records a session.
- Audit signal: `tcpdump`/`netstat` on KVM1 shows no outbound telemetry to third-party hosts during a 5-minute soak.

## Open Questions for Justin
- Vector or rsyslog for log shipping? Vector is more flexible; rsyslog is simpler.
- Retention: 30 days errors / 90 days analytics — confirm or override.

## Changelog
- 0.1.0 — initial proposal scaffold (2026-06-11).
- 0.1.1 — promoted to active 2026-06-12 (commit c5b7af5).
