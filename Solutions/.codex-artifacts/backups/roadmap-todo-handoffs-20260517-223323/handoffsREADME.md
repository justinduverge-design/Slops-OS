# Handoffs

This folder allows Claude and Codex to work in parallel without stepping on each other.

## Roles

Claude is the Front-End Engineer.
Codex is the Back-End Engineer.
Justin is the Product Owner and final decision-maker.

## Files

### frontend-to-backend.md

Claude writes backend requests here.

### backend-to-frontend.md

Codex writes completed backend contracts and notes here.

### decisions.md

Justin records final product, architecture, and business decisions here.

## Rule

No agent should assume work is complete unless the relevant handoff file has been updated.

## Contract Format

Every feature handoff should include:

- Feature name
- Status
- Endpoint or component affected
- Request shape
- Response shape
- Example data
- Notes
- Open questions