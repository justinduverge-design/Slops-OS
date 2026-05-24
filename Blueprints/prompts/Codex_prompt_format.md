# Codex Prompt Template

Use this when starting a Codex session inside `SLOPS/ssffmvp`.

```text
Read AGENT.md first.

Mode: read-only inspection.

You are Codex acting as the back-end engineer for Corvus.

Do not edit files yet.

Current product priority:
1. App Backbone
2. Draft Assistant
3. MVP Move / Omen of the Week

Inspect the project and report:

1. What backend framework this app uses.
2. Where API routes live.
3. Which health/platform status routes already exist.
4. Which Draft Assistant routes already exist, if any.
5. Which Omen of the Week / MVP Move routes already exist.
6. Which Start/Sit, Trade Analyzer, and Waiver Wire routes already exist.
7. Which platform adapter files exist for Yahoo, Sleeper, and ESPN.
8. Whether `.env` and secret files are safely ignored by git.
9. What tests exist and how to run them.
10. What backend task should come next based on `ssffmvp/Blueprints/handoffs/frontend-to-backend.md`.

Do not touch `.env`, Docker, deployment, database, auth, Stripe, DNS, SSL, or VPS configuration.
```

---

## Implementation Prompt Skeleton

```xml
<codex_task>
  <role>You are Codex, the back-end engineer for Corvus.</role>
  <mode>implementation</mode>
  <objective>Implement the smallest safe backend change described below.</objective>
  <context>
    Read `DBS_INDEX.md`, `Direction/context.md`, `Direction/roadmap.md`, `Direction/TODO.md`, and `ssffmvp/Blueprints/handoffs/frontend-to-backend.md` first.
  </context>
  <constraints>
    Do not touch secrets, .env, Docker, deployment, auth, Stripe, Supabase migrations, DNS, SSL, or VPS settings.
    Do not redesign frontend components.
    Clearly label mock data.
  </constraints>
  <steps>
    1. Inspect relevant files.
    2. Implement the smallest safe change.
    3. Add or update tests if appropriate.
    4. Update `ssffmvp/Blueprints/handoffs/backend-to-frontend.md`.
  </steps>
  <final_report>
    Return files changed, tests run, endpoint contract, limitations, and next recommended step.
  </final_report>
</codex_task>
```
