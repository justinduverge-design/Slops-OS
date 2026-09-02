# Prior-use review — slops-native-sim-drive

No runs through this skill yet. `draft` until it has governed one real capture.

| Date | Scenario | Platforms | Dispatched or local | Fixture stayed deterministic? | Notes |
|---|---|---|---|---|---|

## Correction — 2026-09-02

**This skill was authored as if the pipeline did not exist. It did.**
`.github/workflows/native-visual-evidence.yml` was already doing the whole loop on a
`macos-14` runner: Xcode 16.2, unsigned simulator build, iPhone 16 boot, launch with
`OMEN_SCREENSHOT_SCENARIO` into a deterministic in-app fixture, capture, upload per
scenario, matrixed across platforms.

It was also `parked` on "no macOS build host", which was wrong: both that workflow and
`ios-ci.yml` run on `macos-14`. Only *local* capture is blocked, by the founder's 2017
Intel MacBook Air.

**The method failure worth keeping:** the gap was asserted from a `find` for `SKILL.md`
files and a grep for `maestro|appium|detox|xcuitest` across docs. Neither would ever have
found a GitHub Actions workflow implementing the same capability under different names.
**Absence of a skill is not absence of the capability** — check `.github/workflows/` and
`scripts/` before concluding a repo cannot do something. This is the third instance this
session of a negative conclusion drawn from a search whose terms could not have found the
thing; the other two are recorded in `slops-intent-capture` and `scripts/checks/README.md`
in the omen repo.

## Authoring notes

- Maestro is optional on purpose. It is the nicest ergonomics, but it is another
  dependency and another version to pin; the raw simctl/adb path works without it.
  Decide after the first real flow whether the ergonomics are worth it.
- The device matrix deliberately mirrors `mobile-first-qa-playbook` so native and web
  findings stay comparable while both exist.
- Screenshot naming is ordered (`NN-step`) so a directory listing reads as the flow.
