---
name: slops-native-sim-drive
description: Capture deterministic native screenshots from the real iOS Simulator and Android emulator, for a design diff or an accessibility audit. In Omen this GOVERNS TWO EXISTING ROUTES — `scripts/capture-screen-batch.sh` on the founder's Mac (routine, free, both platforms and both themes in one command) and `.github/workflows/native-visual-evidence.yml` on macOS runners (billed, action-gated, clean-room parity); this skill says which route to use, when to run it, how to add a scenario, and where the output belongs. Use to refresh visual evidence, add a screen to the matrix, or produce input for slops-canvas-to-code stage 3. Playwright cannot drive a native app and slops-mobile-smoke is web-only. Produces screenshots and a run report; it does not judge design or accessibility.
status: active
skill_type: wrapper
layer: 0
default_agent: Local capture is ordinary work on a host that has the toolchain — it bills nothing and needs no assignment. CI dispatch is different: it bills a macOS runner and stays action-gated, not something a runtime may self-authorize.
trigger: "sim drive | capture native screenshots | refresh visual evidence | add a screenshot scenario"
version: 0.3.1
upstream: Omen's own `scripts/capture-screen-batch.sh` and `scripts/capture-screenshot-scenario.sh` (local), and `.github/workflows/native-visual-evidence.yml` (macos-14 runner, Xcode 16.2, iPhone 16 simulator; Android emulator matrix). Local stack: Xcode command-line tools (simctl, xcodebuild) + Android SDK (emulator, adb, gradle).
requires:
  - name: xcrun (simctl)
    bin: xcrun
    install: xcode-select --install
  - name: xcodebuild
    bin: xcodebuild
    install: xcode-select --install
  - name: adb (Android SDK platform-tools)
    bin: adb
    optional: true
    install: Android Studio > SDK Manager > SDK Tools > Android SDK Platform-Tools, then add platform-tools to PATH
  - name: capture-screen-batch.sh
    path: slops-saloon/omen/scripts/capture-screen-batch.sh
  - name: capture-screenshot-scenario.sh
    path: slops-saloon/omen/scripts/capture-screenshot-scenario.sh
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

**Nothing here is blocked any more, and the old framing was stale twice over.** This skill was
parked on "no macOS build host", which was already wrong — `native-visual-evidence.yml` and
`ios-ci.yml` both run on `macos-14`. v0.2.0 corrected that to "only *local* capture is blocked,
on the founder's 2017 Intel MacBook Air". That is now stale too: per
`omen-native-build-environment-v1.md`'s 2026-08-12 addendum the founder bought a Mac mini and it
is the trusted routine iOS development host, verified on Xcode 26.6 building, installing and
launching on a registered physical iPhone.

**So the recommendation inverts.** Local capture is the routine route: it is free, it is seconds
rather than minutes, and it needs no authorization because it bills nothing. CI is the fallback —
for clean-room parity, for a pinned toolchain, and for anyone without the local stack. A skill
that still sends the founder to a billed runner from his own development machine is answering a
question nobody has.

**There is still no Playwright for native.** Locally the stack is `simctl`/`xcodebuild` and
`emulator`/`adb`/Gradle. But the CI path needs none of that from the operator.

## When to Use

- **As the end-of-batch visual gate** — the main routine use. See "Where capture sits in the
  loop" below: you work against layout assertions, then capture ONCE across the finished batch.
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

**Preferred path — local, on a host with the toolchain.** One command, both platforms, both
themes, from the Omen repo root:

```bash
scripts/capture-screen-batch.sh --build          # everything
scripts/capture-screen-batch.sh --platform ios   # one platform
scripts/capture-screen-batch.sh --scenarios "command-center.carousel"
```

It orchestrates `scripts/capture-screenshot-scenario.sh`, which owns the launch protocol for a
single scenario and refuses to capture when a system dialog holds focus instead of the app. Output
lands in `output/screens/<timestamp>/<platform>/<theme>/`, with a manifest; it is gitignored, so an
evidence PNG that is meant to be KEPT gets committed deliberately and by path, alongside the
artifact that cites it. A scenario that fails to capture is reported and the run exits non-zero —
a missing PNG must never read as "nothing to see there".

Local capture bills nothing and needs no trust assignment. It is ordinary work.

**Fallback path — CI, when the local stack is absent or clean-room parity is the point.**
`native-visual-evidence.yml` is `workflow_dispatch` only, deliberately: screenshots are for
founder visual review, not every push, and macOS runners bill at a higher multiplier on private
repos.

```bash
# -R is REQUIRED. This skill lives in the L0 repo; the workflow lives in Omen, so gh
# resolving the repo from the current git context finds nothing.
gh workflow run native-visual-evidence.yml -R justinduverge-design/omen --ref <branch>
```

Then download the `visual-evidence-<platform>-<scenario-slug>` artifacts.

**Dispatch is action-gated; local capture is not.** Dispatch bills a macOS runner, and the workflow
is `workflow_dispatch` only for exactly that reason. **Having `gh` authenticated is capability, not
authority** — confirm an active trust assignment covers this action, or ask the founder to dispatch.
A runtime that can press the button is not thereby permitted to. None of that applies to running the
local script.

**The toolchains are not identical and the difference is recorded.** CI pins Xcode 16.2; the local
Mac runs 26.6. Record the version with any result and never relabel a local run as CI evidence.

**Install boundary.** Detect and stop; never install.

```bash
xcrun simctl list devices 2>/dev/null | head -1 || echo "No iOS Simulator locally — dispatch native-visual-evidence.yml instead."
adb version 2>/dev/null || echo "No Android platform-tools locally — dispatch the workflow instead."
```

**Do not restate either retired framing.** "No macOS build host" was wrong and parked this skill
for no reason. "Local capture is blocked on the 2017 MacBook Air" was true when it was written and
stopped being true when the Mac mini landed. Check the host in front of you rather than either
sentence.

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

### Where capture sits in the loop

Founder, 2026-09-10: assertions are the inner loop while you build; screenshots are the check on
the **finished batch**, not a per-change debugging tool. A screenshot costs real tokens for a human
or an agent to read. An assertion costs almost nothing. So:

1. **Build against the layout assertions.** They are text-only and run in seconds:
   `OmenMatchupHeroLayoutTest.kt` and `OmenLeagueCarouselLayoutTest.kt` (Compose, comparing
   clipped against unclipped bounds) and `MatchupHeroIntrinsicHeightTests.swift` (iOS, intrinsic
   height via `UIHostingController.sizeThatFits`).
2. **Capture once, at the end,** across everything the batch touched.
3. **Hand the build to the founder's device** for final review, stating what you did NOT verify.

**The two gates catch different things and neither replaces the other.** A clipped label is an
assertion's job. Dead space, wrong colour, a cramped rhythm, a light-mode surface that has gone
grey on grey — nothing is clipped, every assertion passes, and only a screenshot shows it. That
split is why this skill captures both themes by default rather than only the app's usual dark.

**`CarouselLayoutUITests` (XCUITest) is not a clipping gate.** It stays green with a known
clipping bug injected, because XCUITest reports one frame per element already intersected with
the window. It guards presence, reachability and the scoped-failure rule. Do not cite a green run
from it as proof a layout is unclipped.

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
4. Verify the fixture is genuinely deterministic — re-run on the same commit and confirm the
   screenshots are identical. **A fixture that varies between runs turns a regression check into a
   screenshot of whatever happened that day.**
5. **Verify the fixture reaches the code path you think it does.** Determinism is not enough: a
   fixture can be perfectly stable and still render a different branch than the one under test.
   Omen's demo Command Center fixtures run `carousel == null` — stacked sections, no pager, no
   filter chips — while a real multi-league account runs `carousel != null`. On 2026-09-10 a
   before/after comparison of a carousel fix was run entirely against the demo fixture; both
   captures were identical and the comparison proved nothing. `command-center.carousel` exists
   because of that. If you cannot name the branch your fixture exercises, you do not yet have
   evidence.

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
- **Capturing a fixture that renders the wrong code branch.** Deterministic, repeatable, and
  worthless. See step 5 of "Adding a scenario" — this one has already happened.
- **Committing a system dialog as screen evidence.** A cold-booted emulator's "System UI isn't
  responding" ANR sits over the app and captures cleanly. `capture-screenshot-scenario.sh` checks
  window focus and refuses; do not work around that check.
- **Leaving the device in the theme or font scale the run set.** It silently changes what the next
  person's capture means. `capture-screen-batch.sh` restores on exit, including on failure.
- **Reading a missing PNG as "nothing to see there".** It usually means the screen crashed or a
  scenario key was renamed. The batch runner reports failures and exits non-zero for this reason.
- **Dispatching a billed runner from a machine that can capture locally in seconds.** Local is the
  routine route now; CI is for parity and for hosts without the toolchain.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: flakiness and its cause, which step definitions broke on a UI
change, tool version changes, and any case where simulator evidence disagreed with a device.

## Changelog

- 0.3.1 — promoted `draft` -> `active`. The gate this skill set for itself was "draft until it has
  governed one real capture"; it governed one on 2026-09-10 (8 screens, both platforms, both themes,
  plus the failure path) and that run is recorded in `notes/prior-use-review.md`. No behavioural
  change.
- 0.3.0 — the route recommendation inverted, because the constraint it rested on expired. v0.2.0
  correctly killed "no macOS build host" but replaced it with "local capture is blocked on the
  founder's 2017 Intel MacBook Air", which stopped being true when the Mac mini landed
  (`omen-native-build-environment-v1.md`, 2026-08-12 addendum). Local is now the routine route —
  free, seconds, no assignment, `scripts/capture-screen-batch.sh` for both platforms and both
  themes in one command — and CI is the fallback for clean-room parity. Adds "Where capture sits
  in the loop" (assertions inner, screenshots as the batch gate), a determinism-is-not-enough step
  for new scenarios after a comparison was run against the wrong branch, and five failure modes
  observed on 2026-09-10. Dispatch remains action-gated; local capture explicitly is not.
- 0.2.3 — a third review found the *lesson* written in 0.2.2 was itself over-literal: it required
  every vocabulary hit in a re-scope sweep to be a negation or history, which would have
  misclassified `boot` and `install` — both true of the retained model. The rule is now a four-way
  classification (stale / retained / negation / history). No change to the skill's behaviour.
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
