---
name: slops-native-sim-drive
description: Drive the real iOS Simulator and Android emulator to exercise a native app flow and capture per-step screenshots. Use to run a native flow end to end, capture screenshots for a design diff or an accessibility audit, or regression-check a native screen before release. This is the native counterpart to the Playwright-based web driver — Playwright cannot drive a native app, and slops-mobile-smoke is web-only. Produces a screenshot set and a run report; it does not judge design or accessibility.
status: draft
skill_type: wrapper
layer: 0
default_agent: Codex or Claude with a macOS/SDK host; the founder supplies the build environment
trigger: "sim drive | run the app in the simulator | android emulator run | capture native screenshots | native flow check"
version: 0.1.0
upstream: Xcode command-line tools (simctl, xcodebuild) + Android SDK (emulator, adb, gradle); Maestro optional as the flow layer. Pin exact versions at first successful run — see Preconditions.
owner: Justin
---

# Slops Native Sim Drive

## Purpose

Omen's mobile QA and design tooling was written for the web app and never followed the native
pivot. `slops-mobile-smoke` pins `playwright-core` and drives a desktop browser at phone
viewports; `mobile-first-qa-playbook` targets iOS Safari and Android Chrome. Meanwhile the native
apps have real test targets — Android unit and instrumented tests, iOS `OmenIOSTests` and
`OmenIOSUITests` — **and no skill drives any of them.**

This is the missing native driver: boot a simulator or emulator, install a build, walk a flow, and
capture a screenshot at every step.

**Set expectations honestly: there is no Playwright for native.** The stack is `simctl` and
`xcodebuild` on iOS, `emulator`, `adb`, and Gradle on Android, with Maestro as an optional
cross-platform flow layer. That is heavier and less ergonomic than a browser driver, and pretending
otherwise leads to a skill that cannot be run.

## When to Use

- Run a native flow end to end on both platforms.
- Capture screenshots feeding `slops-canvas-to-code` stage 3 or `slops-native-ui-audit`.
- Regression-check a native screen before a release.
- Reproduce a reported native failure in a controlled environment.

## Do Not Use

- **As a substitute for real-device QA.** A simulator does not reproduce real Face ID, real
  passkey ceremonies, real push, real network transitions, real thermal behaviour, or real
  provider auth in a real app. Anything gated on device evidence stays gated.
- For real-account provider QA. Those are founder-executed, credential-bearing, and separately
  gated.
- To judge design or accessibility — it captures; `slops-native-ui-audit` judges.
- For the web app — that is `slops-mobile-smoke`.

## Required Inputs

- The flow: a named sequence of steps with an expected end state.
- Buildable app sources for the target platform.
- The device targets. Default: a small iPhone, a current iPhone, and a mid-tier Android — mirroring
  `mobile-first-qa-playbook`'s matrix so findings stay comparable.
- Whether the flow needs a signed-in state, and how that state is established **without real
  credentials** — a demo account or a seeded fixture.

## Preconditions and Dependencies

**This skill cannot run in a Linux CI container or the agent's own environment.** It needs:

- **iOS:** macOS, Xcode with command-line tools, at least one iOS Simulator runtime.
- **Android:** Android SDK with platform-tools, an emulator image, a working Gradle build.
- **Optional:** Maestro, for one flow definition across both platforms.

**Install boundary.** Detect and stop; never install. Xcode, SDK components, and Maestro are all
founder-installed.

```bash
xcrun simctl list devices 2>/dev/null | head -1 || echo "No iOS Simulator. Ask Justin to install Xcode + command line tools."
adb version 2>/dev/null || echo "No Android platform-tools. Ask Justin to install the Android SDK."
maestro --version 2>/dev/null || echo "Maestro not present (optional). Install: curl -Ls https://get.maestro.mobile.dev | bash"
```

**Known environment constraint, from the record:** local Xcode was found not viable on the
founder's 2017 Intel MacBook Air, which is why the native ESPN path stalled on build environment
rather than design. **A macOS build host is an open founder decision** (cloud runner vs. newer
hardware). Until it is settled, this skill is authored but not runnable, and it must say so rather
than appear available.

Pin exact tool versions in `upstream` at the first successful run.

## Read-First Procedure

1. The flow definition.
2. The app's entry point and navigation, enough to know what to tap and what proves arrival.
3. Existing UI test targets — **reuse an existing test harness before writing a new driver.**
4. Any prior run's report, for the same flow.
5. Not the whole app. A driver that knows the whole codebase is a driver nobody maintains.

## Process Recipe

1. **Verify the environment.** If a dependency is missing, stop with the install command. Do not
   partially run.
2. **Boot the target** — `simctl boot` / `emulator -avd`, then wait for readiness rather than
   sleeping a fixed interval.
3. **Build and install** — `xcodebuild` for a simulator destination, `gradlew installDebug` for the
   emulator. A build failure ends the run; it is a real finding, not a setup nuisance.
4. **Establish state** without real credentials.
5. **Walk the flow**, capturing a screenshot **after every step**, named by step and device, plus
   the accessibility tree where available — it is what makes the capture useful to an audit rather
   than only to a human eye.
6. **Record failures precisely**: which step, what was expected, what appeared, and the screenshot.
7. **Tear down**, so a later run starts clean and results are comparable.
8. **Report.** Steps passed and failed, screenshot paths, environment and tool versions, and
   explicitly what a simulator run cannot prove.

## Output Contract

- Screenshots → `Solutions/deliverables/native-runs/YYYY-MM-DD-<flow>/<device>/<NN>-<step>.png`
- Run report → `Direction/reviews/YYYY-MM-DD-<flow>-sim-run.md`

The report states: flow, devices, tool versions, per-step result, screenshot paths, failures with
evidence, and a standing note that **simulator evidence does not discharge a device gate.**

## Verification

- **Smoke test:** boot one simulator, install, capture one screenshot of the launch screen. If that
  round-trips, the environment is real. Do this before writing any flow.
- **Success signal:** the expected number of screenshots exist and are non-empty, and the final
  screenshot shows the flow's expected end state. **A run that produced no screenshots is a failed
  run, not a passed one** — silence is the failure mode a driver most easily hides.
- Compare run to run on the same flow and device; an unexplained difference is a finding.

## DBS Routing

Screenshots are finished outputs → `Solutions/deliverables/`. Run reports are reviews →
`Direction/reviews/`. A defect found → `known_issues.md`. A flow worth keeping → committed
alongside the skill so it is reproducible.

## Agent and RBAC Rules

Runs against local simulators only. **No real credentials, no production endpoints, no real
provider accounts.** It does not modify app source. Device QA and real-account QA remain
founder-executed and are not discharged by any run of this skill.

## Failure Modes

- **Reporting a simulator pass as though it clears a device gate.** The most consequential failure —
  it converts a real gate into a false one.
- Sleeping a fixed interval instead of waiting for readiness, producing flaky runs blamed on the app.
- Treating a build failure as environment noise.
- Capturing screenshots without the accessibility tree, leaving the output useful only to a human.
- Writing a new driver where a UI test target already exists.
- Letting tool versions drift unpinned, so a behaviour change looks like an app regression.
- Appearing runnable when no macOS host exists.
- Using real provider credentials to reach a signed-in state.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: flakiness and its cause, which step definitions broke on a UI
change, tool version changes, and any case where simulator evidence disagreed with a device.

## Changelog

- 0.1.0 — initial. Authored ahead of a macOS build host; not runnable until that founder decision
  is settled, and says so.
