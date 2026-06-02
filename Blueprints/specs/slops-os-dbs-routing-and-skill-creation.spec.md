# slops-os-dbs-routing-and-skill-creation.spec

## Objective

Define a flexible MVP spec for routing research and critique into Slops OS DBS architecture files and creating a small reusable router skill.

This spec supports local architecture work now and implementation later.

## Scope

The MVP covers creating or updating these artifact types:

- Reference pattern files under `References/patterns`.
- Critic review files under `Direction/reviews`.
- Decision files under `Direction/decisions`.
- Spec files under `Blueprints/specs`.
- Skill files under `Blueprints/skills/<skill-name>/SKILL.md`.
- Handoff prompt files under `Blueprints/prompts`.

The workflow should convert research plus critique into modular DBS-ready outputs without merging everything into one file.

## Out Of Scope

Do not create:

- Custom MCP servers.
- Composio/Rube setup.
- External connector automation.
- Full Slops OS folder scans.
- Full folder reorganization.
- New naming conventions.
- Solutions files.
- Production code.
- App implementation tasks.
- Monolithic business automation skills.
- Auto-editing skill loops.

## Dependencies

Required inputs:

- Research packet or validated research notes.
- Critic review or critique notes.
- Target topic name.
- Target DBS layer and file list.
- Any locked decisions from Justin.

Helpful context:

- `Direction/context.md`
- `DBS_INDEX.md`
- `Blueprints/skills/README.md`
- `Blueprints/skills/SKILL_ROUTING.md`
- Existing files at the target paths.

Use least-privilege reading. Do not inspect the whole Slops OS tree unless Justin asks for an audit.

## Security / Privacy

This workflow must not read or edit:

- `.env` files.
- Secrets or credentials.
- Cookies or tokens.
- Production infrastructure.
- App source code.
- Payment, auth, database, or deployment configuration.
- Private user data.

If research touches sensitive systems, route the concern into review, decision, or spec guardrails. Do not create implementation instructions without approval.

## UX / Flow

The workflow should feel like a routing assistant, not an autonomous operator.

Expected flow:

1. User provides research, critique, or a placement prompt.
2. Agent identifies the target DBS layer and exact paths.
3. Agent checks whether target files already exist.
4. Agent reads only relevant existing source and target files.
5. Agent creates separate modular artifacts.
6. Agent verifies paths and reports exclusions.

The user should be able to see:

- What was created.
- What was updated.
- What was intentionally excluded.
- Which index updates may be needed later.
- What the next safe step is.

## Build Order

1. Confirm this is architecture/spec work, not implementation.
2. Identify the canonical layer: Slops OS, division, or product.
3. Normalize file names to existing SLOPS conventions.
4. Read source research and critic output.
5. Preserve current useful existing target files.
6. Create or update the reference patterns file.
7. Create or update the critic review file.
8. Create the decision file.
9. Create the spec file.
10. Create the reusable skill file.
11. Create the handoff prompt file.
12. Verify paths and report next safe step.

## Validation

Validation passes when:

- Each requested artifact exists at the correct DBS path.
- The decision says `BUILD NOW, reduced MVP`.
- The spec is flexible and implementation-neutral.
- The skill is modular and does not claim to run the whole business.
- The prompt says architecture is needed now and implementation comes later.
- Composio/Rube, custom MCP servers, full folder scans, and Solutions outputs are excluded.
- The critic concerns are preserved: automatic discovery, token bleed, state conflict, Composio/Rube overbuild risk, and context scoping boundaries.
- Naming follows existing Slops OS conventions.
- No app code, infrastructure, secrets, or production files were touched.
