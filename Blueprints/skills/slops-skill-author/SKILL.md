---
name: slops-skill-author
description: Create, critique, normalize, or improve SLOPS-owned skills under Blueprints/skills. Use for a new SKILL.md, a skill-package audit, or a workflow-to-skill conversion; do not use for agent roles or to run the workflow being authored.
status: active
skill_type: simple
layer: Layer 0
default_agent: Claude plans; Codex writes and verifies approved files
trigger: create a skill, improve this skill, audit a skill, convert this workflow into a skill
version: 1.0.0
upstream: Adapted from mattpocock/skills writing-great-skills (MIT), inspected 2026-06-21
owner: SLOPS
---

# Slops Skill Author

## Purpose

Create narrow, discoverable, checkable SLOPS workflows without turning the skill library into a second application or a pile of overlapping prompts. This skill authors the workflow; it does not execute that workflow.

## When to Use

- Create or materially revise a SLOPS `SKILL.md`.
- Convert a repeated procedure into a governed skill.
- Audit a skill for trigger quality, context cost, routing, verification, or overlap.
- Decide whether a skill should remain simple or become a package.

## Do Not Use

- Agent roles or RBAC: use `slops-agent-author`.
- One-time runnable instructions: use `slops-prompt-generator`.
- External installation or promotion without Justin's approval.
- Executing the workflow described by the target skill.

## Required Inputs

- The repeated job and its intended user outcome.
- Existing overlapping skills, routing rows, and prior-use notes.
- The target DBS layer and authorized write scope.
- Any approved upstream source and its license.

## Preconditions and Dependencies

- Runtime dependencies: none.
- Canonical root: `Blueprints/skills/`, resolved from the current repository root.
- Template: `Blueprints/skills/_template/SKILL.md`.
- External sources remain references until their license, overlap, risk, and maintenance posture are reviewed.
- Installation and distribution are separate approval-gated actions; authoring alone does not copy files into runtime skill folders.

## Read-First Procedure

1. Read the user's request, `Blueprints/skills/README.md`, and `Blueprints/skills/SKILL_ROUTING.md`.
2. Read the target `SKILL.md`, `notes/prior-use-review.md`, tests, or examples when present.
3. Read `Blueprints/skills/_template/SKILL.md` for a new or normalized skill.
4. Search names, descriptions, and routing for overlap before creating another skill.
5. Load only the upstream sections needed for the approved adaptation.
6. Read `References/patterns/writing-for-agents.md` before drafting or restructuring a skill —
   context pointers, the information hierarchy, completion criteria, leading words, pruning.
   Adapted from `mattpocock/skills` (MIT).

## Invocation Economics Gate

Before authoring, answer four questions:

1. **Who invokes it?** The model should infer it from the description, or the user must name it. Make that boundary explicit.
2. **Why a skill?** It must encode a repeated, non-obvious procedure that benefits from consistent execution. If a short prompt is enough, stop and recommend a prompt.
3. **What context does it cost?** Keep the main file sufficient for normal runs; move optional depth into clearly routed support files.
4. **How is completion checked?** Name an observable signal. “Analyze thoroughly” and “looks good” are not completion criteria.

## Process Recipe

1. Define one job, one primary output, and explicit exclusions.
2. Choose a clear kebab-case name and a trigger-rich description using likely user language.
3. Classify it as `simple`, `package`, or `wrapper`; wrappers must pin their upstream and detect rather than install dependencies.
4. Write complete frontmatter: `name`, `description`, `status`, `skill_type`, `layer`, `default_agent`, `trigger`, `version`, `upstream`, and `owner`.
5. Define required inputs, dependencies, least-privilege reads, deterministic steps, output, verification, routing, boundaries, failure modes, prior-use review, and changelog.
6. Use progressive disclosure: keep the critical path in `SKILL.md`; add `references/`, `examples/`, `tests/`, `notes/`, or `interface/` only when each folder has a concrete consumer.
7. Run the pruning pass:
   - **No-op:** remove instructions the agent would reliably do without help.
   - **Sediment:** remove stale history and paths that no longer affect execution.
   - **Sprawl:** split unrelated jobs or delete unused support files.
8. Register every active, renamed, or retired skill in both `SKILL_ROUTING.md` and `SLOPS_LIFECYCLE.md`.
9. Validate frontmatter, routing uniqueness, links/paths, and the skill's own completion check.
10. Distribute only when explicitly approved, with backup and canonical-to-runtime hash verification.

## Frontmatter is the delivery contract

A skill reaches a session through `.claude/skills/<name>` symlinks created by
`Blueprints/tools/skill-link/link-skills.mjs`. What the harness reads is the `SKILL.md`
frontmatter, so the frontmatter is not decoration — it is the only thing deciding whether the
skill is ever offered.

- `name` must equal the folder name exactly.
- `description` is a **context pointer**, and its wording — not the skill's quality — decides when
  the skill fires. Front-load the leading word. One trigger per branch. State the scope the skill
  does *not* cover when a sibling skill owns it.
- Scope limits belong in the `description`, not only in the body. `slops-ui-ux-audit` was web-only
  for months with the limit recorded only in routing; the description said "Slops-native", and the
  one ambiguous word pointed native work at a superseded web spec.
- SLOPS keys (`status`, `layer`, `version`, `owner`, `trigger`, `upstream`, `skill_type`) are
  ignored by the harness and read by SLOPS. Keep both.
- **Never add `metadata_profile` to a `SKILL.md`.** `valor-brain/v1` is the contract for knowledge
  pages, not skills; the two serve different readers and mixing them breaks discovery.

After creating, renaming or removing a skill, re-link and verify:

```bash
node Blueprints/tools/skill-link/link-skills.mjs
node Blueprints/tools/skill-link/link-skills.mjs --check
```

## Environmental claims

A skill that asserts something about the world outside the repo — a host machine, an OS, installed
tooling, a hardware limit — dates the claim and names what falsifies it.
`slops-native-sim-drive` was parked on "no macOS build host", which was wrong twice: CI had a host
all along, and the residual "local capture is blocked on a 2017 Intel MacBook Air" outlived the Mac
mini. Both survived because neither carried a date or a falsifier. Check the host, not the note.

## Output Contract

Produce the canonical target path, full skill content or patch, package shape, routing/lifecycle changes, sources and license, verification evidence, intentional exclusions, and next safe step.

## Verification

- The frontmatter contains every required field and its `name` matches the folder.
- Exactly one active routing row resolves the skill.
- The procedure has an observable success signal and clear failure/escalation behavior.
- A search finds no stale absolute workspace paths in the changed package.
- `git diff --check` passes.
- `node Blueprints/tools/skill-link/link-skills.mjs --check` reports no drift.
- `node Blueprints/tools/truth-gate/truth-gate.mjs --check=registry-drift` passes — the skill is on
  disk *and* in an index.
- Every environmental claim in the package carries a date and a falsifier.
- If distributed, every canonical package file has the same SHA-256 hash in both runtime copies.

## DBS Routing

- Canonical skills: `Blueprints/skills/<skill-name>/`.
- Acquisition/review evidence: `Direction/reviews/`.
- Raw external material: `References/research/` or `Archive/imports/`; never active by placement alone.
- One-time execution prompts: `Blueprints/prompts/`.

## Boundaries

- Skills are workflows, not actors, permissions, or personas.
- Do not grant destructive, production, payment, auth, secret, user-data, database, DNS, or deployment authority.
- Do not auto-install external dependencies or silently promote imported instructions.
- Do not distribute, overwrite runtime copies, or change global hooks without explicit approval and a backup.

## Failure Modes

- Creating a skill for a one-off task or capability the model already performs reliably.
- A vague description that cannot be routed deterministically.
- One skill covering unrelated jobs.
- Mandatory ceremony with no observable value.
- Support folders with no consumer, copied upstream prose, or duplicated doctrine.
- Missing failure states, approval gates, prior-use review, or verification.
- Editing runtime copies as the source of truth.

## Prior-Use Review Loop

Before revision, read `<skill-name>/notes/prior-use-review.md` when present. Convert repeated corrections into the smallest durable change: a trigger clarification, step, test, failure mode, or split. Preserve the skill's identity unless the user approves a changed contract.

## Changelog

- 1.1.0 — 2026-09-12. Frontmatter is the delivery contract (skill-link); description-as-context-pointer;
  the valor-brain/skill frontmatter boundary; dated environmental claims; skill-link and
  registry-drift added to Verification. Points at `References/patterns/writing-for-agents.md`
  (harvested from `mattpocock/skills`, MIT).
- 1.0.0 — Added invocation economics, progressive disclosure, checkable completion, pruning, complete metadata, and canonical distribution verification.
- 0.1.0 — Initial SLOPS skill-authoring workflow.
