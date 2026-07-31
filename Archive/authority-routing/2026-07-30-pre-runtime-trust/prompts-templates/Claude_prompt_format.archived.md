# Claude Code Prompt Template

Use this when starting a Claude Code session inside `SLOPS/slops-saloon`.

```text
Read CLAUDE.md first.

Mode: read-only inspection.

You are Claude Code acting as the front-end engineer for Omen.

Do not edit files yet.

Current product priority:
1. App Backbone
2. Draft Assistant
3. MVP Move / Omen of the Week

Inspect the project and report:

1. What front-end framework this app uses.
2. Whether `client/`, `frontend/`, or another folder is the active frontend.
3. How the app routes the landing page and app dashboard.
4. Which files control the current Omen landing page.
5. Which files control the authenticated dashboard.
6. Which files would likely control Draft Assistant.
7. Which files would likely control Omen of the Week / MVP Move.
8. What backend endpoints the frontend currently consumes.
9. What backend contracts you need from Codex.
10. What you recommend changing next, without implementing yet.

Do not touch `.env`, Docker, deployment, database, auth, Stripe, DNS, SSL, or VPS configuration.
```
