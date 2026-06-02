# slops-os-markdown.spec

## Objective

Define the flexible MVP Markdown standard for Slops OS.

The standard should help agents and humans create, route, prune, and validate Markdown files without creating full automation or productivity theater.

## Scope

This spec applies to Markdown files in Slops OS DBS, including:

- Context files.
- Decisions.
- Reviews.
- Specs.
- Skills.
- Prompts.
- Reference patterns.
- Handoffs.
- README and index files.

The MVP standard is documentation architecture only. It does not create application code or automated workflow infrastructure.

## File Routing

Route by purpose:

```text
Direction/decisions   Accepted decisions, scope gates, tradeoffs
Direction/reviews     Critiques, audits, risk reviews, weak assumptions
Blueprints/specs      Implementation-neutral standards and contracts
Blueprints/skills     Reusable procedural workflows
Blueprints/prompts    Runnable Claude/Codex handoff prompts
References/patterns   Research-derived repeated patterns and lessons
References/research   Raw research or source captures, when needed
Solutions             Finished deliverables only when explicitly asked
Archive               Superseded or parked files only when replacing
```

Use existing DBS naming conventions:

- DBS pillars use Title Case.
- Content folders use existing lowercase or kebab-case.
- Skill packages use kebab-case.
- Skill files are named `SKILL.md`.
- Regular Markdown files use kebab-case.

## Creation Rules

Create a Markdown file only when it has a clear job.

Each file should have:

- One H1 title.
- A short purpose section.
- Clear scope.
- Explicit exclusions when relevant.
- Paths or routing when relevant.
- A next safe step when useful.

Avoid:

- Monolithic files.
- Duplicate copies of the same truth.
- Broad doctrine from temporary notes.
- Research inside procedural skill files.
- Procedure inside reference pattern files.

## Pruning Rules

Prune Markdown when:

- It repeats a newer source.
- It points to retired paths.
- It describes decisions that changed.
- It mixes research, decisions, specs, prompts, and implementation instructions.
- It causes agents to read too much before acting.
- It no longer helps build or operate a real product.

Pruning does not mean deletion by default.

Safe pruning options:

- Shorten.
- Split into the right DBS layer.
- Mark as historical.
- Move to Archive only when replacing or superseding with approval.
- Update the source file that keeps causing repeated mistakes.

## Validation Criteria

A Slops OS Markdown file is valid when:

- Its DBS layer matches its purpose.
- It is short enough to read in one pass.
- It separates current truth from reference material.
- It does not hide implementation instructions inside research.
- It does not hide research patterns inside procedural skill files.
- It uses kebab-case for regular Markdown filenames.
- It avoids stale paths and ambiguous ownership.
- It supports the Source Integrity Principle.
- It helps real product work move faster.

Package validation passes when:

- References contain patterns only.
- Reviews contain critique and risks.
- Decisions contain accepted scope.
- Specs contain flexible standards and validation.
- Skills contain procedure.
- Prompts contain runnable handoff instructions.

## Source Integrity Principle

Repeated corrections should update the source Markdown, not just the generated output.

When the same agent mistake repeats:

1. Identify the source file responsible.
2. Decide whether the source is current authority.
3. Recommend a precise source update.
4. Apply the update only when explicitly asked.
5. Verify the new source does not conflict with nearby context.

## Security / Privacy

Markdown files must not expose:

- Secrets.
- Credentials.
- API keys.
- Tokens.
- Cookies.
- Private user data.
- Sensitive provider responses.

Markdown may document that a sensitive area exists, but it should route implementation to an approval-required workflow.

Do not use Markdown tasks to bypass security, auth, payment, database, infrastructure, or production approval gates.

## UX / Flow

Markdown should make the next action obvious.

A good Markdown package lets a future agent answer:

- What layer am I in?
- What is current truth?
- What is reference only?
- What is accepted?
- What is excluded?
- What should I read next?
- What should I not touch?

Avoid productivity theater:

- Do not create a file because the folder looks incomplete.
- Do not over-polish docs while product work waits.
- Do not build a Markdown machine around work that has not repeated.

## Build Order

For a new Markdown operating package:

1. Confirm this is Markdown architecture work, not app implementation.
2. Identify the target DBS paths.
3. Read existing source research and critic output.
4. Create or normalize reference patterns.
5. Create or normalize critic review.
6. Record the reduced decision.
7. Write the flexible spec.
8. Create the procedural skill.
9. Create the reusable handoff prompt.
10. Validate the skill and verify paths.
11. Report exclusions and index updates needed.

## Out Of Scope

Do not build:

- Application code.
- Full automation.
- File locking.
- Rollback.
- Multi-agent orchestration.
- Custom MCP servers.
- Connector setup.
- Full IA or governance systems.
- Solutions outputs unless explicitly asked.

## Review Triggers

Review this standard when:

- The same Markdown mistake repeats twice.
- Agents read too much before acting.
- Product paths change.
- A file becomes stale and starts misleading agents.
- A workflow repeats enough to justify a template or script.
- Markdown work stops helping real product progress.
