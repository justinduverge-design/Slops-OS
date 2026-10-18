---
name: slops-rust-tdd
description: Implement changed Rust behavior through one vertical red-green-refactor slice at a time with cargo test. Use for Rust crates, Pi fleet binaries, and the shared decision core and its napi-rs/UniFFI/WASM bindings; tests public behavior and does not authorize deploys, cross-compiled releases or unrelated refactors.
status: proposed
skill_type: simple
layer: Layer 0
default_agent: Codex implements; Claude may define acceptance behavior
trigger: build this crate with TDD, add a Rust regression test, port this JS function to the Rust core, fix this Pi binary bug
version: 0.1.0
upstream: Extends slops-tdd 0.1.0 for Rust and cargo
owner: SLOPS
---

# Slops Rust TDD

## Purpose

Build the smallest vertical Rust behavior slice with a fast cargo feedback loop. Tests specify observable contracts,
not internal call choreography. Parity with an existing JS path is a contract, not a side check.

## When to Use

- Implement behavior in a Rust library or binary crate.
- Port a JS function into the shared decision core, behind a parity test.
- Fix a reproducible defect in a Pi fleet binary with a regression test.
- Change a binding layer (napi-rs, UniFFI, wasm-bindgen) whose callers can be tested.

## Do Not Use

- Pure documentation, generated bindings or vendored crates.
- Exploratory spikes; time-box and discard or convert the result into a tested build item.
- Cross-compiling and shipping a release to a Pi, deploying, installing toolchains or changing secrets.
- JS or Python work; use `slops-tdd`.

## Required Inputs

- Approved task, acceptance behavior, target crate and boundaries.
- The crate's test command (`cargo test -p <crate>`) and definition of done.
- For a port: the JS function, its recorded fixtures, and the parity tolerance (default: exact).

## Preconditions and Dependencies

- Use the workspace's pinned toolchain (`rust-toolchain.toml`). Do not change it without approval.
- Use only crates already in `Cargo.lock`. A new dependency needs approval and must pass `cargo deny check`.
- Establish a fast deterministic command that can fail for the behavior under construction.

## Process Recipe

1. Translate one acceptance criterion into one externally observable example, including its important failure case.
2. Add the smallest test through the public API: a unit test in the module, or an integration test in `tests/`.
3. Run `cargo test -p <crate> <test_name>` and confirm **RED for the intended reason**. A compile error does not
   count; stub the signature first so the test compiles and fails on an assertion.
4. Write the minimum implementation for that one example.
5. Run the same command and confirm **GREEN**. Then run `cargo test --workspace --all-features`, so bindings behind feature flags are compiled and tested.
6. For a port, run the parity test against the recorded JS fixtures and confirm an exact match.
7. Run `cargo fmt --check` and `cargo clippy --all-targets -- -D warnings`. Refactor while tests stay green.
8. Checkpoint the slice according to `slops-git-flow`.
9. Repeat with the next acceptance example. Do not write all tests first and all code later.
10. For a Pi binary, finish with a cross-compile check for the target (`aarch64-unknown-linux-gnu`). Building is
    verification; copying to a device is a deploy and needs approval.

## Test Design Rules

- Prefer public functions, return values and `Result` error variants over private helpers.
- Test error contracts: every `Err` variant a caller can see has at least one test.
- No `unwrap()` or `expect()` on untrusted input in non-test code; test the failure path instead.
- Mock only slow, nondeterministic or external boundaries behind a trait; keep domain math real.
- Floating-point math: state the tolerance in the test. Parity with JS uses the same rounding as JS.
- Use property tests (proptest) only when the crate already depends on it.
- A regression test must fail on the defect and pass on the correction.

## Output Contract

The scoped code and test patch, plus evidence per slice: red command and intended failure, green command and result,
workspace test, fmt and clippy results, parity result for ports, cross-compile result for Pi targets, assumptions and
excluded work.

## Verification

- At least one test was observed red on an assertion before the implementation.
- The same test is green after the minimum implementation.
- `cargo test --workspace --all-features`, `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings` and `git diff --check` pass.
- Ports: parity test passes against recorded JS fixtures.
- No unrelated refactor, new crate, toolchain change, deploy or secret change entered the diff.

## DBS Routing

Layer 0 doctrine that writes only inside the approved target repository. Pair with `planning-pass`, `slops-git-flow`,
`slops-quality-baseline` and `slops-code-review`.

## Boundaries

- Follow target repository ownership: backend and Rust crates are Codex unless explicitly assigned.
- Stop for approval on new crates, toolchain bumps, `unsafe` blocks, production data, secrets, deploys or flipping a
  programme switch (`DECISION_ENGINE`, systemd units).
- TDD does not override a task's acceptance criteria or safety controls.

## Failure Modes

- A test added after implementation that was never seen fail.
- RED caused by a compile error instead of an assertion.
- Horizontal work: all tests, then all code.
- Parity checked by eye instead of by a test.
- `unwrap()` hiding an untested error path.
- Clippy warnings silenced with `#[allow]` instead of fixed.

## Prior-Use Review Loop

Read `notes/prior-use-review.md` when present. Record slow builds, flaky tests, parity mismatches and cross-compile
friction; improve the smallest part of the loop that caused them.

## Changelog

- 0.1.0 — Proposed. Rust extension of `slops-tdd`.
