---
name: slops-native-sim-drive
description: Capture deterministic native screenshots from the real iOS Simulator and Android emulator, for a design diff or an accessibility audit. In Omen this GOVERNS AN EXISTING PIPELINE — `.github/workflows/native-visual-evidence.yml` already builds, boots, launches with a scenario argument and uploads per-scenario artifacts on macOS runners; this skill says when to run it, how to add a scenario, and where the output belongs. Use to refresh visual evidence, add a screen to the matrix, or produce input for slops-canvas-to-code stage 3. Playwright cannot drive a native app and slops-mobile-smoke is web-only. Produces screenshots and a run report; it does not judge design or accessibility.
status: draft
skill_type: wrapper
layer: 0
default_agent: Per Runtime Policy and an active trust assignment — dispatching bills a macOS runner and is an action-gated operation, not something a runtime may self-authorize. Local capture needs a macOS/SDK host.
trigger: "sim drive | capture native screenshots | refresh visual evidence | add a screenshot scenario"
version: 0.2.2
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
different and much smaller problem: the workflow is `workflow_dispatch`, so it does not need a
local toolchain — but it does need the Omen repository selected (see below), and it does need
authorization.

**There is still no Playwright for native.** Locally the stack is `simctl`/`xcodebuild` and
`emulator`/`adb`/Gradle. But the CI path needs none of that from the operator.

## When to Use

- Refresh visual evidence for a registered scenario, on both platforms.
- Capture screenshots feeding `slops-canvas-to-code` stage 3 or `slops-native-ui-audit`.
- Regression-check a native screen before a release.
- Add a screen to the scenario matrix so it has visual evidence at all.

## Do Not Use

- **As a substitute for real-device QA.** A simulator does not reproduce real Face ID, real
  passkey ceremonies, real push, real network transitions, real thermal behaviour, or real
  provider auth in a real app. Anything gated on device evidence stays gated.
- For real-account provider QA. Those are founder-executed, credential-bearing, and separately
  gated.
- To judge design or accessibility — it captures; `slops-native-ui-audit` judges.
- For the web app — that is `slops-mobile-smoke`.

## Required Inputs

- The scenario slug, from the registered set, or the new one being added.
- The active trust assignment authorizing a billed dispatch, or a founder who will dispatch it.
- The branch to run against.
- For a new scenario: the deterministic in-app fixture it renders, which must reach no session, no
  network, and no real provider state.

## Preconditions and Dependencies

**Preferred path — CI, no local toolchain needed.** `native-visual-evidence.yml` is
`workflow_dispatch` only, deliberately: screenshots are for founder visual review, not every push,
and macOS runners bill at a higher multiplier on private repos. Dispatch it from the Actions tab, or:

```bash
# -R is REQUIRED. This skill lives in the L0 repo; the workflow lives in Omen, so gh
# resolving the repo from the current git context finds nothing.
gh workflow run native-visual-evidence.yml -R justinduverge-design/omen --ref <branch>
```

Then download the `visual-evidence-<platform>-<scenario-slug>` artifacts.

**Dispatch is action-gated.** It bills a macOS runner, and the workflow is `workflow_dispatch` only
for exactly that reason. **Having `gh` authenticated is capability, not authority** — confirm an
active trust assignment covers this action, or ask the founder to dispatch. A runtime that can
press the button is not thereby permitted to.

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

1. The scenario slug and, for a new one, the fixture it must render.
2. `.github/workflows/native-visual-evidence.yml` — its header states the contract and the cost note.
3. `ScreenshotScenarios.kt` and its iOS twin, to see what is registered and how.
4. Any prior run's report and artifacts for the same scenario, to compare against.
5. The screen contract for the screen, if one exists, under
   `Blueprints/specs/design/screen-contracts/` in the Omen repo.

**Not the app's navigation.** Nothing here taps, navigates, or asserts arrival — the fixture renders
the state directly. Reading the app's flow would be reading for a driver that does not exist.

## Process Recipe

### What this pipeline does, exactly

**One scenario in, one screenshot per platform out.** The app is launched with
`OMEN_SCREENSHOT_SCENARIO`, short-circuits straight into a deterministic fixture, and is captured.
There is no tapping, no navigation, no sequence.

**It does not walk flows.** See "Not supported yet" below — an earlier draft of this skill described
a step-by-step driver, which the pipeline has never been.

### Refreshing evidence for an existing scenario

1. **Confirm authorization** for a billed dispatch — assignment or founder. Stop here if absent.
2. **Dispatch** with `-R justinduverge-design/omen` and the branch under test.
3. **Download** the `visual-evidence-<platform>-<scenario-slug>` artifacts. **Both platforms**; one
   is half the evidence.
4. **Compare** against the screen contract, if one exists (`Blueprints/specs/design/screen-contracts/`),
   or against the artboard. A build failure ends the run and is a real finding, not a setup nuisance.
5. **Report** scenario, platforms, branch, commit, artifact paths, and explicitly what a simulator
   run cannot prove.

### Adding a scenario

1. Register the fixture in `ScreenshotScenarios.kt` and its iOS twin, with the **same slug on both**.
2. Add the row to each matrix in the workflow.
3. Dispatch once and confirm both artifacts land and render the intended state.
4. Verify the fixture is genuinely deterministic — re-dispatch on the same commit and confirm the
   screenshots are identical. **A fixture that varies between runs turns a regression check into a
   screenshot of whatever happened that day.**

### Not supported yet — do not present these as available

- **Multi-step flow walking**, per-step capture, and end-state assertion. No automation exists.
  A request to "run a flow end to end" is not served by this skill; say so rather than substituting
  a fixed-scenario screenshot, which answers a different question.
- **Accessibility-tree capture.** The workflow captures pixels only. `slops-native-ui-audit`'s
  screen-reader axis therefore cannot pass on this evidence and stays `PARTIAL` — human traversal
  is still required, as `F11` already assumes.

Both are real gaps worth closing. Closing them means extending the workflow, and that is its own
approved change — not something to imply in a skill description.

## Output Contract

- Screenshots → the workflow's own `visual-evidence-<platform>-<scenario-slug>` artifacts. Commit
  them into the repo only when they are evidence for a specific closed item, under
  `Solutions/deliverables/native-runs/YYYY-MM-DD-<scenario>/`; otherwise leave them as artifacts.
- Run report → `Direction/reviews/YYYY-MM-DD-<scenario>-visual-evidence.md`

The report states: scenario, both platforms, branch and commit, artifact paths, who authorized the
dispatch, and a standing note that **simulator evidence does not discharge a device gate.**

## Verification

- **Smoke test:** dispatch one registered scenario and confirm both platform artifacts land
  non-empty. If that round-trips, the pipeline is real for you.
- **Success signal:** the expected number of screenshots exist and are non-empty, and the final
  screenshot shows the scenario's intended state. **A run that produced no artifacts is a failed
  run, not a passed one** — silence is the failure mode a capture pipeline most easily hides.
- Compare run to run on the same scenario and commit; **any** difference is a finding, because the
  fixture is supposed to be deterministic.

## DBS Routing

Screenshots are finished outputs → `Solutions/deliverables/`. Run reports are reviews →
`Direction/reviews/`. A defect found → `known_issues.md`. A scenario worth keeping → registered in
`ScreenshotScenarios.kt` and its iOS twin, in the Omen repo, so it is reproducible.

## Agent and RBAC Rules

Runs against local simulators only. **No real credentials, no production endpoints, no real
provider accounts.** It does not modify app source. Device QA and real-account QA remain
founder-executed and are not discharged by any run of this skill.

## Failure Modes

- **Reporting a simulator pass as though it clears a device gate.** The most consequential failure —
  it converts a real gate into a false one.
- Treating a build failure as environment noise. It is a real finding.
- **Capturing one platform and calling it evidence.** Paired slugs exist so parity is checkable;
  half the pair is half the evidence.
- **A fixture that varies between runs.** It turns a regression check into a screenshot of whatever
  happened that day. Re-dispatch on the same commit to prove it does not.
- A fixture that reaches a session, the network, or real provider state.
- Using real provider credentials to reach a signed-in state.
- **Treating an authenticated `gh` as permission to dispatch.** It bills a macOS runner. Capability
  is not authority — the rule SLOPS states everywhere, and one this skill's first draft broke.
- **Omitting `-R justinduverge-design/omen`.** This skill lives in L0; the workflow lives in Omen.
  Without the flag `gh` resolves the wrong repository and reports the workflow does not exist.
- **Offering a fixed-scenario screenshot in answer to a flow request.** It answers a different
  question, and looks like evidence.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: flakiness and its cause, which step definitions broke on a UI
change, tool version changes, and any case where simulator evidence disagreed with a device.

## Changelog

- 0.2.2 — a second Codex review found the re-scope was *still* incomplete. Failure Modes had five
  driver-era entries, one of which ("capturing screenshots without the accessibility tree") made
  **every supported capture a failure** against the skill's own guidance, since v0.2.1 had just
  declared accessibility-tree capture unavailable. Read-First still told the reader to learn the
  app's navigation and to avoid "writing a new driver". Both sections reconciled; every surviving
  mention of tapping, walking or driving is now an explicit negation.
- 0.2.1 — three findings from a Codex review on PR #21, all valid: `default_agent` treated
  capability as authority for a billed dispatch; the `gh` example omitted `-R` and so could not
  resolve the workflow from an L0 checkout; and the recipe, inputs, outputs and verification still
  described a step-by-step flow driver the pipeline has never been. The last is the one that
  mattered — a half-rewritten skill promised two different things at once.
- 0.2.0 — re-scoped to govern Omen's existing `native-visual-evidence.yml` rather than propose a
  driver; unparked (CI has a `macos-14` host; only local capture is blocked).
- 0.1.0 — initial. Authored ahead of a macOS build host; not runnable until that founder decision
  is settled, and says so.
