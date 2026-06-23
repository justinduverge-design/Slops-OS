---
name: slops-skill-template
description: Master template for SLOPS-authored Claude/Codex skill markdown files. Use as the required structure when creating or normalizing skills under Blueprints/skills. This template is reference material, not an active operational skill.
---

# SLOPS Skill Template

## Purpose

This file defines the standard shape for SLOPS-authored skills.

A skill is a reusable workflow. It explains how a type of work should be performed, what context must be read, what outputs are expected, what boundaries must be respected, and how the result should be routed through the DBS folder system.

This template is not itself a callable production skill. Copy its structure when creating or upgrading skill files.

## Skill Identity

Every SLOPS skill begins with a YAML frontmatter block. Routing (`SKILL_ROUTING.md`) and any tooling read these fields directly, so identity must live in frontmatter, not only in prose. Copy this block and fill it in:

```yaml
---
name: <skill-name>                  # kebab-case, matches the folder name
description: <one line: what it does + when to use it>
status: draft                       # draft | active | restricted | reference-only | archived
skill_type: simple                  # simple | package | wrapper
layer: 0                            # 0 = SLOPS | 1 = Slops Saloon | 2 = Omen (matches SKILL_ROUTING "Layer" column)
default_agent: Claude               # who runs it (matches SKILL_ROUTING "Default Agent" column)
trigger: <none | /command | alias>  # invocation hook; consumed by command-bridge-generator
version: 0.1.0                       # bump on every behavior change (see Version & Changelog)
upstream: <none | package@version>  # wrapper skills only: vendored tool + pinned version
owner: Justin
---
```

Field notes:

- **status** — gate on this; `draft` and `reference-only` skills must not be routed to as authoritative.
- **skill_type** — `simple` (one SKILL.md), `package` (SKILL.md + support folders), or `wrapper` (fronts an external runtime tool; see External-Tool / Wrapper Skills).
- **layer** — the operating layer from `SKILL_ROUTING.md`, not a folder. Most reusable skills are `0`. Do not confuse with the artifact type: a skill always lives in `Blueprints/skills`.
- **default_agent** — Claude for planning/review; Codex for file edits, commands, and verification. This populates the routing table's Default Agent column directly.
- **trigger** — the slash command or alias, or `none` if routed by description match only. `command-bridge-generator` reads this field to emit the command shim.
- **version** / **upstream** — keep the wrapped tool's pinned version visible so upstream drift is caught.

These frontmatter fields map 1:1 onto the columns in `SKILL_ROUTING.md` § "Current SLOPS Skills", so a new skill drops into that table without re-deriving anything.

## When to Use

Use the skill when:

- The user request directly matches the skill purpose.
- The requested output is repeatable and should follow a standard workflow.
- The work belongs in the skill's declared DBS layer.
- The agent needs guardrails to avoid scope creep.

Do not use the skill when:

- The task belongs to a different skill.
- The task requires broad project decisions that should start in `Direction`.
- The task requires code execution before a plan exists.
- The task would touch secrets, payments, auth, production, user data, databases, or deployment without explicit approval.

## Required Inputs

Before doing work, identify the minimum context needed.

Required inputs may include:

- User request.
- Current file path or target folder.
- Existing source files.
- Relevant DBS index files.
- Relevant handoff, spec, audit, or decision files.
- Prior-use notes for the skill, if present.

If required context is missing, make the smallest safe assumption only when the task is low-risk and reversible. Otherwise, ask for the missing file or clarify the boundary.

## Preconditions & Dependencies

"Required Inputs" covers *context files*. This section covers the *environment* a skill needs before it can run. Simple skills may write "None." Wrapper skills must complete it.

Declare:

- **Runtime / tools** — interpreters, CLIs, or apps the skill assumes (e.g. Python 3.10+, Claude Code, Obsidian).
- **Packages** — external packages and the pinned version (matches `upstream` in frontmatter).
- **Install boundary** — installs are an approval-gated action. State the exact install command, but do not run it. Justin runs installs; the skill verifies presence and stops with instructions if the dependency is missing.
- **Network / credentials** — anything requiring a key, token, or outbound call, so it can be reviewed against least privilege.

Pattern for a missing dependency: detect, then stop with the install command — never auto-install.

```bash
python3 -c "import <pkg>" 2>/dev/null || echo "Missing <pkg>. Ask Justin to run: pip install <pkg>"
```

## Read-First Procedure

Use least privilege.

1. Read only the files needed for the current task.
2. Prefer current files over archived files.
3. Treat `_archive`, `_imported`, `_drafts`, and stale copies as non-authoritative unless the user says otherwise.
4. Search before reading large files.
5. Do not load unrelated project folders.
6. Do not treat an external tool's own files (its README, its installed package, its bundled skill) as canonical SLOPS authority. A SLOPS skill may *front* an external tool, but only through a governed wrapper — see External-Tool / Wrapper Skills.

## Process Recipe

Replace this section with exact steps for the skill.

A good recipe should be concrete enough that another agent can follow it without guessing.

Recommended structure:

1. Confirm the task type.
2. Identify the DBS layer.
3. Identify the authoritative source files.
4. Extract the relevant facts, decisions, constraints, and open questions.
5. Produce the required output.
6. Route the output to the correct folder or recommend the exact path.
7. Report assumptions, exclusions, and next steps.

Avoid vague steps such as “analyze deeply” unless the skill defines what analysis means.

## Output Contract

Every skill must define what it produces.

Possible outputs:

- Markdown file.
- Prompt artifact.
- Skill file.
- Agent role file.
- Audit report.
- Decision record.
- Handoff.
- Review summary.
- Patch plan.
- Folder structure recommendation.

The output must include:

- Target path.
- Purpose.
- Source files used.
- What changed or should change.
- What was intentionally not touched.
- Next safe step.

When a user asks for “no edit yet,” provide analysis only.

## Verification

Every non-trivial skill defines how its output is checked before it is treated as done. Wrapper skills must define a smoke test; this is the cheapest way to catch a broken upstream or environment.

Define:

- **Smoke test** — the smallest run that proves the skill works end to end (e.g. a wrapper run on a 2–3 file sample folder, confirming the expected output files appear).
- **Success signal** — the concrete thing that proves success (a file exists, a non-empty report, an exit code, a node count > 0).
- **Escalation** — for higher-stakes skills, route verification through `slops-verify` rather than self-attesting.

Never report a skill run as successful without naming the signal you checked.

## DBS Routing

Use this routing model unless the skill defines a narrower rule.

```text
Direction/
  decisions/       Permanent decisions and ADR-style choices.
  reviews/         Human/agent reviews, critiques, risk notes, and audits.
  roadmaps/        Strategy, priorities, release plans, and timelines.

Blueprints/
  skills/          Reusable workflows and skill packages.
  agents/          Reusable agent roles, RBAC, divisions, and personas.
  prompts/         Runnable task prompts for Claude, Codex, or other agents.
  templates/       Reusable document shapes.
  specs/           Implementation-neutral requirements and contracts.

References/
  research/        Raw source material and extracted research notes.
  patterns/        Repeated findings, source patterns, competitive patterns.
  examples/        Non-authoritative examples and inspiration.

Solutions/
  deliverables/    Final outputs intended to be used or shared.
  reports/         Completed summaries and finished reports.

Archive/
  superseded/      Old material replaced by newer decisions.
  imports/         External source dumps kept for reference.
```

## Skill Package Structure

Simple skills may contain only:

```text
<skill-name>/
  SKILL.md
```

Skill packages may include:

```text
<skill-name>/
  SKILL.md
  references/
  examples/
  tests/
  notes/
  interface/
```

Folder meanings:

- `references/`: skill-specific source material.
- `examples/`: sample inputs and outputs.
- `tests/`: expected behavior and validation cases.
- `notes/`: prior-use reviews and improvement ideas.
- `interface/`: launcher or provider metadata, not global agent authority.

Do not use a local skill support folder to grant broad project authority.

## External-Tool / Wrapper Skills

Set `skill_type: wrapper` when a skill fronts an external runtime tool (a pip/npm package, a CLI, a third-party Claude Code skill). The external tool does real work; the SLOPS wrapper governs *how it is invoked inside SLOPS*. Keep the line between the two explicit.

**SLOPS-authored (lives in this repo, version-controlled, authoritative):**

- The wrapper `SKILL.md` — trigger, preconditions, guardrails, DBS routing of the tool's outputs, failure modes.
- The `SKILL_ROUTING.md` entry.
- Any defaults, output-path conventions, or layer tags SLOPS imposes on the tool.

**Vendored (the tool itself, non-authoritative):**

- The installed package and its bundled skill/README. Reference it; do not copy it in and call it SLOPS doctrine. Pin its version in `upstream`.

Rules for wrapper skills:

- **Install boundary.** The wrapper never installs the tool. It detects presence and, if missing, stops with the exact command for Justin to run (see Preconditions & Dependencies).
- **Pin the version.** Record `upstream: <package>@<version>`. When the tool updates, re-review the wrapper before bumping.
- **Own the outputs, not the internals.** The wrapper decides where the tool's outputs land in the DBS tree and which layer they belong to. It does not reach into or fork the tool's code.
- **Least privilege still applies.** A wrapped tool that touches network, secrets, or the product repo inherits the same approval gates as any SLOPS skill.
- **Name honestly.** A wrapper is named for the SLOPS workflow it provides, and its description states it wraps an external tool.

Minimum wrapper package shape:

```text
<skill-name>/
  SKILL.md                 # the governed wrapper
  notes/prior-use-review.md   # what the tool got right/wrong on real runs
```

## Agent and RBAC Rules

Skills are workflows, not actors.

A skill may recommend an agent, but it must not grant broad permissions.

Use this split:

- `Blueprints/skills`: how work is done.
- `Blueprints/agents`: who does the work and what authority they have.
- `Blueprints/prompts`: what the next agent should do now.

Permission principles:

- Least privilege.
- Read only what is needed.
- Write only to approved target paths.
- Destructive actions require explicit approval.
- Production, payments, auth, secrets, user data, database migrations, DNS, SSL, VPS, and deployment changes require explicit approval.

## Failure Modes

Each skill should list likely mistakes.

Common failure modes:

- Over-editing beyond the request.
- Treating references as current decisions.
- Mixing skills, agents, and prompts into one file.
- Creating a prompt when the user asked for analysis only.
- Creating analysis when the user asked for a runnable prompt.
- Moving imported files into active authority without review.
- Ignoring DBS routing.
- Ignoring least privilege.
- Failing to state source files used.
- Failing to produce a target path.
- Auto-installing a wrapped tool instead of stopping at the install boundary.
- Copying a vendored tool's README/skill in and treating it as SLOPS doctrine.
- Letting a wrapped tool's version drift without re-pinning `upstream` and re-reviewing.
- Reporting a run as successful without naming the verification signal.

## Prior Use Review Loop

Before editing a skill, check whether the skill has a prior-use file.

Recommended path:

```text
<skill-name>/notes/prior-use-review.md
```

If present, review:

- What worked last time.
- What failed.
- What the user corrected.
- What assumptions were wrong.
- What should be added to the skill.
- Whether a new support file, test, example, or routing rule is needed.

When improving a skill, do not silently mutate its purpose. Preserve the skill's identity unless the user approves a rename or split.

## Version & Changelog

The `version` frontmatter field tracks the skill, not the tool it may wrap. Use simple semver: bump patch for wording/guardrail fixes, minor for new behavior, major for a changed contract or purpose. For wrapper skills, also bump when you re-pin `upstream` to a new tool version after re-review.

Keep a short changelog at the bottom of the SKILL.md so drift is visible:

```text
## Changelog
- 0.2.0 — added smoke test; re-pinned upstream to tool@1.3.0
- 0.1.0 — initial wrapper
```

## Claude/Codex Placement Prompt Pattern

When a skill file must be created or placed by Codex, use a prompt like:

```text
You are Codex working in the local SLOPS folder.

Objective:
Create or update the skill file at:
<target path>

Read first:
- <relevant source file>
- <relevant index file>

Rules:
- Do not edit app source code.
- Do not edit secrets, deployment files, package files, or database files.
- Do not move files unless explicitly instructed.
- Preserve DBS folder structure.
- Use least privilege.
- Report files changed and assumptions.

Deliverable:
Write the approved markdown content exactly to the target path.
```

## Quality Checklist

Before finalizing a skill, verify:

- [ ] Frontmatter has `name`, `description`, `status`, `skill_type`, `layer`, `default_agent`, `trigger`, and `version`.
- [ ] Description clearly explains when to use the skill.
- [ ] The skill has a narrow purpose.
- [ ] Required inputs are clear.
- [ ] Preconditions & dependencies are declared (or "None"); wrapper skills pin `upstream`.
- [ ] Install boundary is stated — the skill detects but never auto-installs.
- [ ] Read-first rules are least-privilege.
- [ ] Process steps are concrete.
- [ ] Output contract is explicit.
- [ ] Verification / smoke test is defined; wrapper skills name a success signal.
- [ ] DBS routing is defined or referenced.
- [ ] RBAC boundaries are clear.
- [ ] Failure modes are listed.
- [ ] Prior-use review loop is included.
- [ ] `version` and a changelog entry are present.
- [ ] The skill does not grant unauthorized execution authority.
