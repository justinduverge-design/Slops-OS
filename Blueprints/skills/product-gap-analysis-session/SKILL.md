---
name: product-gap-analysis-session
description: Run a stop-and-think product readiness session that separates what a product HAS from what it NEEDS, grounded in real code and current facts, and converts the gap into a phased, approval-gated plan. Use when Justin wants to pause, evaluate how far a product (e.g. Corvus) is from a finished/sellable state, discuss gaps, and decide the next safe moves. Do not use to write code or change product source.
status: active
skill_type: simple
layer: Layer 0
default_agent: Claude analyzes; Codex writes only when approved
trigger: product gap analysis, how far are we from launch, what do we have versus need, readiness session
version: 1.0.0
upstream: none
owner: SLOPS
---

# Product Gap-Analysis Session

## Purpose

This skill captures the repeatable way Justin and Claude think a product through from "what exists today" to "what is required to ship and charge for it."

It exists because planning documents drift from reality. A product can look unfinished in a doc while being mostly built in code, or look done in a doc while missing the business foundation. This skill forces ground-truth verification first, then a clean Have / Need / Gap separation, then a phased plan that respects approval gates and the NFL/seasonal calendar where relevant.

The output is analysis and a routed plan. This skill never edits product source, secrets, payments, auth, or deployment.

## Skill Identity

- **Skill name:** `product-gap-analysis-session`
- **Primary user:** Justin
- **Primary agents:** Claude for analysis, planning, and review; Codex only if a file write is explicitly approved.
- **DBS layer:** `Blueprints\skills` (Layer 0 — reusable across divisions and products)
- **Skill type:** analytical skill (simple)
- **Status:** active

## When to Use

Use this skill when Justin asks to:

- "Stop and really think out the product" or discuss how close it is to finished.
- Find the gaps between current state and a sellable/launch state.
- Audit how much of a feature is actually live and tested versus aspirational.
- Turn a pile of status docs into one prioritized path forward.
- Decide the next safe move without starting a build yet.

Do not use this skill when:

- Justin wants code written or changed (route to Codex via a prompt + handoff).
- Justin wants a single runnable task prompt (use `slops-prompt-generator`).
- The task is pure external-API research (use `pre-build-research`), though this skill calls that research as a step.
- The work touches secrets, payments, auth, production, user data, databases, or deployment directly.

## Required Inputs

Minimum context before analysis:

- The product or workstream in scope (e.g. Corvus, a specific feature).
- The relevant code root and/or status docs (e.g. `slops-saloon\corvus\Direction`, `release_readiness.md`, `known_issues.md`, `current_sprint.md`).
- Any planning/architecture doc Justin is reacting to.
- The definition of "done" for this session (full launch, paid launch, one feature, etc.).

If a needed file is missing, ask for it or locate it by search before reasoning. Never infer live/tested status from a planning doc alone.

## Preconditions and Dependencies

- No runtime dependencies or installs.
- Repository, external-source, and test access remain read-only unless a file write is explicitly approved.
- Current external terms, pricing, schedules, or platform facts require fresh primary-source research.

## Read-First Procedure

Least privilege. Verify, do not trust.

1. Read the in-scope status docs in `Direction/` first; treat `Archive/` and historical handoffs as non-authoritative.
2. Locate the real code for any claimed capability; confirm it exists before describing it.
3. Where feasible and safe, run the existing test suite (read-only) to establish a real pass/fail baseline instead of quoting a doc.
4. Confirm where things actually run (host, model location, managed vs self-hosted) rather than assuming the architecture doc is current.
5. For any external dependency (API, data source, platform terms), verify current facts with web research before recommending it.

## Process Recipe

1. **Set scope and "done."** Restate the product in scope and what finished means for this session.
2. **Establish ground truth.** Read status docs, find the code, run tests read-only, confirm hosting/model reality. Note every discrepancy between the doc-of-record and the code-of-record.
3. **Decompose into workstreams.** Break the product into a small number of named workstreams (infra, a feature, data, monetization, mobile, etc.).
4. **For each workstream, write Have -> Need -> Gap.**
   - **Have:** what is verified in code/tests today (cite file or test result).
   - **Need:** the target state for launch/charging.
   - **Gap:** the specific missing pieces.
5. **Research the unknowns.** For external APIs, data, licensing, or platform terms, confirm current facts (delegate to `pre-build-research` patterns). Flag commercial/legal constraints explicitly.
6. **Plan each gap in phases** with a Definition of Done, and mark which steps are gated (money, secrets, deploy, public, legal) and therefore need Justin's approval.
7. **Sequence against real-world constraints** (e.g. NFL draft/season calendar) and call out any hard deadlines.
8. **Route the output** to the correct DBS layer and recommend the next safe step (often a single Codex kickoff prompt for the lowest-risk workstream).

## Output Contract

Produce a handoff/roadmap markdown file (unless Justin asks for analysis only) containing:

- **Target path** in the correct DBS layer (default: a `*-handoff.md` or `*-roadmap.md` for app-level work in the app's `Blueprints\handoffs\`; founder/business-level work in the subsidiary `Direction\`).
- **Purpose** and the session's definition of "done."
- **Verified baseline** with the discrepancies found between docs and code.
- **Per-workstream Have / Need / Gap / Plan / Definition of Done.**
- **Source files and research used.**
- **What was intentionally not touched.**
- A **decision queue** for Justin and the **next safe step**.

When Justin says "no edits yet," provide the analysis in-chat only and name where the file would go.

## Verification

- Every `Have` claim cites current code, a current test result, or another authoritative source.
- Every `Need` is tied to the stated outcome; every `Gap` identifies a missing capability or decision rather than vague effort.
- Approval-gated steps are labeled and the plan has a concrete next safe step.
- Contradictions between docs and code are explicit rather than silently resolved.

## DBS Routing

- App-specific product gap analysis (e.g. Corvus): write to `slops-saloon\corvus\Blueprints\handoffs\`.
- Division/business-level readiness (entity, pricing, commercialization): write to `slops-saloon\Direction\`.
- Company-wide reusable doctrine that emerges: propose promotion to Layer 0 `SLOPS\Direction\` or `Blueprints\`, but do not promote app-specific content into Layer 0 without explicit approval.
- Decisions that result should be logged in the relevant `Direction\decision_log.md`.

## Failure Modes

- Trusting a planning or architecture doc as current truth instead of verifying against code and tests.
- Reporting a feature as "live" without finding its route/service in source.
- Skipping external-terms research and recommending a data source that forbids commercial use.
- Producing a build prompt when Justin asked to think, not build.
- Ignoring the seasonal/real-world deadline that governs sequencing.
- Writing app-specific work into Layer 0, or business doctrine into the app layer.
- Failing to mark money/secrets/deploy/legal steps as approval-gated.
- Failing to state source files used or a concrete next step.

## Boundaries

- Analysis and planning only; do not edit product source, deploy, install, migrate, spend, contact third parties, or change secrets/auth/payment behavior.
- Do not promote app-specific findings into Layer 0 doctrine without explicit approval.

## Prior Use Review Loop

Before reusing, check `product-gap-analysis-session/notes/prior-use-review.md` if present for what worked, what Justin corrected, and what to add. Preserve the skill's identity; do not silently broaden it into a build skill.

## Notes

- Pairs well with: `pre-build-research` (external facts), `slops-prompt-generator` (turn a chosen gap into a Codex prompt), `dbs-research-to-architecture-router` (split findings into specs/decisions), and `clean-up-checkpoint` (when a session must pause safely).
- First captured from the 2026-06 Corvus readiness sessions (hosting, Trade LLM, projection model, Sleeper draft assistant, Capacitor mobile, business foundation).

## Changelog

- 1.0.0 — Registered the existing skill, completed metadata, corrected simple/package classification, and added dependencies, verification, and boundaries.
- 0.1.0 — Initial product gap-analysis session workflow.
