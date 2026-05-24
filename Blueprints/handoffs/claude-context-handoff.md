# Claude Context Handoff

## Objective

Prepare Claude to continue SLOPS documentation, skill, agent, and DBS cleanup work from the current workspace truth.

## Read First

1. `context.md`
2. `DBS_INDEX.md`
3. `Direction\context.md`
4. `Direction\roadmap.md`
5. `Blueprints\skills\README.md`
6. `Blueprints\skills\SKILL_ROUTING.md`
7. `Blueprints\agents\AGENT_INDEX.md`
8. `Blueprints\tools\tool-permissions.md`

For app-specific work, also read:

1. `ssffmvp\Direction\context.md`
2. `ssffmvp\Blueprints\handoffs\frontend-to-backend.md`
3. `ssffmvp\Blueprints\handoffs\backend-to-frontend.md`
4. `ssffmvp\Blueprints\handoffs\decisions.md`

## Current State

- SLOPS OS is the root operating layer.
- `ssffmvp` is the active app repo.
- Corvus is the fantasy football product inside `ssffmvp`.
- SLOPS-authored skills live under `Blueprints\skills`.
- Agent authority lives in `Blueprints\agents\AGENT_INDEX.md`.
- Imported agents remain reference-only unless reviewed, wrapped, indexed, and approved.

## Recently Added Skills

The following skills were created and added to routing/index files:

- `agent-wrapper-generator`
- `agent-index-diff-builder`
- `rbac-risk-review`
- `workflow-tree-spec`
- `security-privacy-evidence`

## Scope For Claude

Claude should help with:

- Documentation cleanup.
- DBS routing decisions.
- Agent/skill review.
- Handoff preparation.
- Risk and scope review.
- Founder-context preservation.

Claude should not:

- Edit app source directly.
- Touch secrets, cookies, auth, payments, SQL, production, deployment, or infrastructure.
- Treat archive/imported material as current authority.
- Activate agents without Justin approval and `AGENT_INDEX.md` review.

## Open Follow-Up

Recommended next documentation pass:

1. Review root and Direction markdown for stale path references.
2. Decide whether root compatibility files should be redirects or full context files.
3. Review `Blueprints\handoffs` and decide whether root-level handoffs are redirects, OS handoffs, or both.
4. Add prior-use notes to new skills after they are used once.
