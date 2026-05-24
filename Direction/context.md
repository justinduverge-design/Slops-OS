# SLOPS OS Context

## Layer Purpose

SLOPS OS is Justin's company and personal operating system layer. It organizes how decisions are made, how projects are framed, how agents collaborate, and how reusable work becomes repeatable infrastructure.

This level is broader than any single repository or product. It is the operating surface for Slops Saloon as a company, product studio, and working system.

## Justin and Operating Style

Justin uses SLOPS OS to turn active ideas into durable direction, reusable blueprints, and working solutions. The system should preserve context, reduce repeated explanation, and make it easier for Codex, Claude, and future agents to work from the same facts.

The operating style is:

- Direction before churn.
- Clear decisions before broad execution.
- Copy or archive before deletion.
- Handoffs over assumptions.
- Practical outputs over performative documentation.
- User approval before deployment, infrastructure, secrets, production, or repo-risking changes.

## How DBS Works Here

Direction contains context, roadmap, vision, priorities, decision logs, and current sprint thinking.

Blueprints contains specs, prompts, skills, workflows, templates, and playbooks that can be reused across projects.

Solutions contains working outputs, deliverables, assets, and implementation-adjacent artifacts that are not active source code unless explicitly approved.

References contains supporting material, research, historical copies, and source material that informs work but is not itself the current operating plan.

Archive preserves superseded or parked material after review. Archive does not mean delete.

## Decisions, Skills, Handoffs, and Projects

Decisions should be recorded where future agents can find them. Company-wide decisions belong at the SLOPS OS layer. Repo-level decisions belong inside `ssffmvp`. Product decisions belong inside `ssffmvp/Corvus`.

SLOPS-authored skills live in one canonical place: `Blueprints\skills\`. Agents should look there first, read `Blueprints\skills\README.md`, then `Blueprints\skills\SKILL_ROUTING.md`, then the named skill folder's `SKILL.md`. Do not create SLOPS skills in `.codex\skills`, `Blueprints\prompts`, app prompt folders, or product folders.

Tool-installed external skills may still live where their installer expects them. Those are runtime dependencies, not canonical SLOPS-authored skills.

Handoffs are working coordination artifacts. Active app handoffs should remain where Codex, Claude, or repo tooling expects them. DBS can hold indexes, summaries, or archived handoff material after review.

Projects are active systems under the Slops Saloon umbrella. They should not be moved or archived until their app, repo, source, secret, and deployment risks have been reviewed.

## Slops Saloon and ssffmvp

Slops Saloon is the umbrella: the company, mission, product ecosystem, and parent identity.

`ssffmvp` is the first department/project system under Slops Saloon. It is the Fantasy Sports MVP Builder layer where fantasy sports tools can be designed, tested, and operated.

Corvus is the first product inside `ssffmvp`. It is focused on fantasy football decision intelligence.

## Safety Boundary

SLOPS OS work can reorganize documents and planning layers, but it should not change app behavior, deployment posture, secrets, infrastructure, package files, source code, tests, SQL, scripts, `.git`, or active implementation assets without explicit approval.

## Universal AI Rules

These rules apply to all agents working at the SLOPS OS layer.

1. **Human-in-the-Loop** - Do not make final business or architecture decisions. Recommend, explain tradeoffs, and identify the strongest option.

2. **Conflict Resolution** - If instructions conflict and affect the outcome, pause and ask for clarification. If minor, make the safest practical assumption and explicitly label it.

3. **Fact vs. Guess** - Clearly label assumptions or inferences as **[Guess]** when data is missing or uncertain.

4. **Session Re-Anchoring** - At the end of major work sessions, update handoff files to maintain continuity across tool boundaries.

5. **Now vs. Later** - Ruthlessly separate what must be executed immediately from what should be deferred.

6. **Practical Output** - Do not just summarize the conversation. Conclude every response with the single next concrete action.

7. **Context Preservation** - Before initiating a large change, verify the proposal aligns with constraints in `Direction/` and does not break existing structures in `Solutions/`.
