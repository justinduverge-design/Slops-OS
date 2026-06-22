---
name: slops-tdd
description: Implement changed behavior through one vertical red-green-refactor slice at a time. Use for backend, API, data-flow, or integration work where a fast deterministic test can express the contract; tests public behavior and does not authorize deploys or unrelated refactors.
status: active
skill_type: simple
layer: Layer 0
default_agent: Codex implements; Claude may define acceptance behavior
trigger: build this with TDD, implement this endpoint, fix this bug with a regression test, pull this build item
version: 0.1.0
upstream: Adapted from mattpocock/skills tdd (MIT), inspected 2026-06-21
owner: SLOPS
---

# Slops TDD

## Purpose

Build the smallest vertical behavior slice with a trustworthy feedback loop. Tests specify observable contracts, not internal call choreography.

## When to Use

- Implement backend, API, validation, data-flow, adapter, or integration behavior.
- Fix a reproducible defect with a regression test.
- Refactor behavior that can be protected by current tests.

## Do Not Use

- Pure documentation or generated/vendor output.
- Exploratory spikes whose purpose is learning; time-box and discard or convert the result into a tested build item.
- Deploy, migrate, install, change secrets, or broaden scope.

## Required Inputs

- Approved task, acceptance behavior, target repository, and boundaries.
- Existing test command, test conventions, and definition of done.
- Relevant public interface and failure behavior.

## Preconditions and Dependencies

- Use the repository's existing test framework and dependencies; do not install another framework without approval.
- Establish a fast deterministic command that can fail for the behavior under construction.
- If the legacy system cannot support a faithful test, document the constraint and obtain approval for the smallest characterization seam; do not silently skip the gate.

## Process Recipe

1. Translate one acceptance criterion into one externally observable example, including its important failure case.
2. Add the smallest test through the public interface or nearest stable boundary.
3. Run the tight command and confirm **RED for the intended reason**; compilation or fixture accidents do not count.
4. Write the minimum implementation needed for that one example.
5. Run the same command and confirm **GREEN**, then run the relevant broader suite.
6. Refactor duplication and names while tests remain green; do not add future abstractions.
7. Commit or checkpoint the vertical slice according to `slops-git-flow`.
8. Repeat with the next acceptance example. Do not write all tests first and all implementation later.
9. Finish with current quality, review, and diff checks.

## Test Design Rules

- Prefer public behavior, outputs, state transitions, and error contracts over private methods or call counts.
- Mock only slow, nondeterministic, destructive, or external boundaries; keep domain behavior real.
- A regression test must fail on the defect and pass on the correction.
- Include security and validation failures at trust boundaries.
- Keep each test clear enough that a future failure explains which contract broke.

## Output Contract

Produce the scoped code/test patch plus evidence for each slice: red command and intended failure, green command and result, broader checks, acceptance criteria covered, assumptions, and work intentionally excluded.

## Verification

- At least one test was observed red for the intended missing/broken behavior before implementation.
- The same test is green after the minimum implementation.
- Relevant broader tests and `git diff --check` pass.
- Tests exercise stable behavior rather than implementation choreography.
- No unrelated refactor, dependency, deploy, migration, or secret change entered the diff.

## DBS Routing

The skill is Layer 0 doctrine but writes only inside the approved target product/repository. Pair with `planning-pass`, `slops-git-flow`, `slops-quality-baseline`, and `slops-code-review`.

## Boundaries

- Follow target repository ownership: backend is Codex; frontend remains Claude unless explicitly assigned.
- Stop for approval on installs, schema migrations, production data, auth/payment semantics, secrets, deploys, or externally visible actions.
- TDD does not override a task's acceptance criteria or safety controls.

## Failure Modes

- A test added after implementation that was never seen fail.
- RED caused by syntax, setup, or an unrelated failure.
- Horizontal work: all tests, then all code.
- Excessive mocking that only proves calls were made.
- Refactoring unrelated code under cover of the task.
- Skipping a hard-to-test trust boundary instead of creating a seam.

## Prior-Use Review Loop

Read `notes/prior-use-review.md` when present. Record slow/flaky commands, over-mocked boundaries, escaped defects, and recurring setup friction; improve the smallest part of the loop that caused them.

## Changelog

- 0.1.0 — Initial SLOPS vertical-slice TDD workflow adapted from the upstream TDD skill.
