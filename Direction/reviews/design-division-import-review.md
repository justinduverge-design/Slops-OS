# Design Division Import Review

Date: 2026-05-23
Reviewer: Codex / slops-onboarding-agent
Source folder: `Blueprints\agents\_imported\__design_division`

## Context

The imported Design Division remains non-authoritative until promoted through `slops-agent-author` review and recorded in `Blueprints\agents\AGENT_INDEX.md`.

Root `AGENTS.md` required files checked from `C:\Users\JDuve\OneDrive\Desktop\SLOPS`:

- `context.md` missing
- `roadmap.md` missing
- `manifesto.md` missing
- `handoffs\decisions.md` missing
- `handoffs\frontend-to-backend.md` missing
- `handoffs\backend-to-frontend.md` missing
- `CLAUDE.md` missing

Canonical app handoff files were found and reviewed under `ssffmvp\Blueprints\handoffs`.

## Classification Summary

| Imported agent | Recommended status | Wrapper decision | Risk level | Notes |
|---|---|---:|---|---|
| `design-brand-guardian.md` | candidate | yes | medium | Useful for brand doctrine, voice, identity checks, and consistency reviews. Must not own final brand direction, legal/trademark strategy, asset libraries, or implementation. |
| `design-ui-designer.md` | candidate | yes | medium | Useful as a design-system and UI review role. Must stay advisory because Claude owns frontend and Codex owns backend. No frontend source edits, no asset export authority. |
| `design-image-prompt-engineer.md` | candidate | yes | low-medium | Useful for drafting image generation prompts and visual direction. Must not invoke paid/external generation tools, publish images, or create final brand assets without approval. |
| `design-ux-researcher.md` | candidate | yes, restricted | medium-high | Useful for research plans, test scripts, heuristics, and synthesis templates. Must not collect, store, process, or summarize real participant/user data without explicit privacy approval. |
| `design-whimsy-injector.md` | candidate | yes, restricted | medium | Useful for brand microcopy and delight reviews. Must not add code, Easter eggs, gamification, animations, or distracting UI patterns directly. |
| `design-visual-storyteller.md` | reference-only | no for now | medium | Overlaps Brand Guardian, Image Prompt Engineer, Whimsy Injector, and future Marketing agents. Keep as inspiration until there is a concrete campaign/storytelling gap. |
| `design-ux-architect.md` | do-not-activate | no direct wrapper | high | Claims repository topology, contract definitions, schema compliance, CSS architecture, and JavaScript implementation guidance. This conflicts with Claude/Codex ownership and backend/frontend boundaries. Salvage ideas only into narrower wrappers if needed. |

## RBAC And Overlap Risks

- Frontend ownership risk: `design-ui-designer.md`, `design-ux-architect.md`, and `design-whimsy-injector.md` all imply UI implementation or developer handoff. Wrappers must state that Claude owns frontend planning and Codex does not redesign frontend unless explicitly asked.
- Backend/API ownership risk: `design-ux-architect.md` claims contract definitions and schema compliance, which conflicts with Codex backend ownership and the established handoff files.
- Production/code risk: `design-ux-architect.md` and `design-whimsy-injector.md` include CSS/JS or interaction implementation patterns. Design agents should draft specs and reviews only, not edit app source.
- Brand authority risk: `design-brand-guardian.md` includes trademark/legal protection and brand governance language. Justin remains final brand authority; legal/trademark work needs external/explicit approval.
- Privacy/user-data risk: `design-ux-researcher.md` includes consent, recording, research repositories, and data handling. Keep it to planning/templates until privacy rules are approved.
- Paid/external tool risk: `design-image-prompt-engineer.md` can imply image generation. Prompt drafting is safe; invoking paid models, publishing assets, or storing generated assets needs approval.
- Scope overlap risk: `design-visual-storyteller.md` overlaps heavily with Marketing and Brand agents. It should stay reference-only until the Marketing Division pass defines launch narrative ownership.

## Wrapper Queue

Recommended wrapper creation order:

1. `design-brand-guardian` as `Blueprints\agents\design\design-brand-guardian.md`
2. `design-ui-designer` as `Blueprints\agents\design\design-ui-designer.md`
3. `design-image-prompt-engineer` as `Blueprints\agents\design\design-image-prompt-engineer.md`
4. `design-whimsy-injector` as `Blueprints\agents\design\design-whimsy-injector.md`
5. `design-ux-researcher` as `Blueprints\agents\design\design-ux-researcher.md`

Do not create a direct `design-ux-architect` wrapper. If architecture support is needed later, create a narrower `design-system-architect` candidate that cannot own repo topology, schemas, contracts, backend behavior, frontend source, or implementation.

Keep `design-visual-storyteller` reference-only until Brand and Marketing responsibilities are clearer.

## Baseline Wrapper Constraints

All Design Division wrappers should start as `candidate`, Tier 2 max:

- Read, analyze, draft, and recommend only.
- May write draft markdown only when explicitly assigned.
- May write to `Blueprints\prompts\`, `Direction\reviews\`, and `Solutions\reports\`.
- Must not write to `ssffmvp\src\`, `ssffmvp\frontend\`, `ssffmvp\client\`, `ssffmvp\sql\`, `ssffmvp\scripts\`, `ssffmvp\test\`, `Archive\`, `.env`, `.key`, credentials, secrets, tokens, cookies, production, deployment, Docker, GitHub Actions, auth, payment, or database files.
- Must not make final decisions on brand direction, launch scope, monetization, UX direction, frontend implementation, or backend contracts.
- Escalates to Justin for brand/product decisions, Claude for frontend/design planning, and Codex only for separately approved implementation.

## Next Safe Step

Create the five recommended wrapper files under `Blueprints\agents\design\`, then update `AGENT_INDEX.md` only after Justin/Claude approval.
