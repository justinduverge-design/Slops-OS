---
name: slops-native-sim-drive
description: Capture deterministic native screenshots from the real iOS Simulator and Android emulator, for a design diff or an accessibility audit. In Omen this GOVERNS AN EXISTING PIPELINE — `.github/workflows/native-visual-evidence.yml` already builds, boots, launches with a scenario argument and uploads per-scenario artifacts on macOS runners; this skill says when to run it, how to add a scenario, and where the output belongs. Use to refresh visual evidence, add a screen to the matrix, or produce input for slops-canvas-to-code stage 3. Playwright cannot drive a native app and slops-mobile-smoke is web-only. Produces screenshots and a run report; it does not judge design or accessibility.
status: draft
skill_type: wrapper
layer: 0
default_agent: Any runtime that can dispatch the workflow; local runs need a macOS/SDK host
trigger: "sim drive | capture native screenshots | refresh visual evidence | add a screenshot scenario | native flow check"
version: 0.2.0
upstream: Omen's own `.github/workflows/native-visual-evidence.yml` (macos-14 runner, Xcode 16.2, iPhone 16 simulator; Android emulator matrix). Locally: Xcode command-line tools (simctl, xcodebuild) + Android SDK (emulator, adb, gradle).
owner: Justin
---

# Slops Native Sim Drive

## Purpose

Omen's mobile QA and design tooling was written for the web app and never followed the native
pivot. `slops-mobile-smoke` pins `playwright-core` and drives a desktop browser at phone
viewports; `mobile-first-qa-playbook` targets iOS Safari and Android Chrome. Meanwhile the native
apps have real test targets — Android unit and instrumented tests, iOS `OmenIOSTests` and
`OmenIOSUITests` — **and no skill drives any of them.**

**Corrected 2026-09-02, and the correction matters.** The first version of this skill was written
as if native screenshot capture did not exist and had to be built. **It already exists in Omen**, is
better than what was proposed, and had been running for some time:
`.github/workflows/native-visual-evidence.yml` selects Xcode 16.2 on a `macos-14` runner, builds
`OmenIOS.app` unsigned for the simulator, boots an iPhone 16, launches the app with an
`OMEN_SCREENSHOT_SCENARIO` argument that short-circuits into a deterministic in-app fixture — no
session, no network, no fabricated provider state — captures the screen and uploads it as a named
artifact, matrixed across both platforms.

That is the loop this skill described building. So the skill's job is not to build a driver; it is
to **govern the pipeline that exists**: when to run it, how to add a screen to it, where its output
belongs, and what its evidence does and does not prove.

**The `parked` status is lifted.** It was parked on "no macOS build host", which was wrong twice
over: `native-visual-evidence.yml` and `ios-ci.yml` both run on `macos-14`, so CI capture has a host
today. What is actually blocked is *local* capture on the founder's 2017 Intel MacBook Air — a
different and much smaller problem, since the workflow is `workflow_dispatch` and can be run from
anywhere.

**There is still no Playwright for native.** Locally the stack is `simctl`/`xcodebuild` and
`emulator`/`adb`/Gradle. But the CI path needs none of that from the operator.

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

**Preferred path — CI, no local toolchain needed.** `native-visual-evidence.yml` is
`workflow_dispatch` only, deliberately: screenshots are for founder visual review, not every push,
and macOS runners bill at a higher multiplier on private repos. Dispatch it from the Actions tab or
with `gh workflow run native-visual-evidence.yml --ref <branch>`, then download the
`visual-evidence-<platform>-<scenario-slug>` artifacts.

**Local path — only when iterating faster than CI allows.** macOS with Xcode command-line tools and
an iOS Simulator runtime; Android SDK platform-tools with an emulator image. `scripts/capture-
screenshot-scenario.sh` exists in the repo for this.

**Install boundary.** Detect and stop; never install.

```bash
xcrun simctl list devices 2>/dev/null | head -1 || echo "No iOS Simulator locally — dispatch native-visual-evidence.yml instead."
adb version 2>/dev/null || echo "No Android platform-tools locally — dispatch the workflow instead."
```

**The local constraint is real but narrow.** Xcode is not viable on the founder's 2017 Intel
MacBook Air. That blocks *local* capture only; the CI path has a `macos-14` host today and is the
route this skill points at first. Do not restate the old "no macOS build host" framing — it was
wrong, and it parked this skill for no reason.

## Adding a screen to the matrix

The workflow's own header states the contract, and it is deliberately cheap:

1. Add one entry to `mobile/android/app/src/main/kotlin/com/slopssaloon/omen/app/screenshot/ScreenshotScenarios.kt` and its iOS twin.
2. Add one row to each platform matrix in `native-visual-evidence.yml`.
3. Nothing else changes.

Scenario slugs are platform-agnostic so an iOS/Android pair shares a suffix — that pairing is what
makes a parity check possible, so never name one side differently.

**The fixture must stay deterministic.** A scenario that reaches a session, the network, or real
provider state produces evidence that cannot be compared across runs, and quietly turns a
regression check into a screenshot of whatever happened that day.

**Registered as of 2026-09-02:** `command-center.demo-connected`, `command-center.disconnected`,
`omen.demo`, `omen.disconnected`.

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
