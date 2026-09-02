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


## Review correction — 2026-09-02, PR #21

A Codex review bot raised three P2 findings on the re-scope commit. **All three were valid and all
three were fixed**; they are recorded because the third names a failure mode worth generalising.

1. **`default_agent` treated capability as authority.** It read "any runtime that can dispatch the
   workflow" — for an operation that bills a macOS runner. SLOPS doctrine says capability grants no
   authority, and this skill's own repo states it in `AGENTS.md`. Corrected to require an active
   trust assignment or a founder dispatch.
2. **The `gh` example omitted `-R justinduverge-design/omen`.** The skill lives in L0, the workflow
   lives in Omen; `gh` resolving the repo from the current git context finds nothing. The draft also
   claimed the workflow "can be run from anywhere", which was wrong as written.
3. **The document promised two different things.** The Purpose and Preconditions were re-scoped to
   fixed-scenario capture, but the Process Recipe, Required Inputs, Output Contract and Verification
   still described walking a named flow, capturing per-step screenshots and accessibility trees, and
   asserting an end state — none of which the pipeline does.

**The generalisable lesson: a partial rewrite is worse than no rewrite.** Re-scoping the front of a
skill and leaving the back intact produces a document that reads as authoritative in both directions,
and the contradiction is invisible to the author who just changed the top. **When re-scoping, grep
the whole file for the old vocabulary before committing** — here, `flow` appeared 21 times and only
the first few had been reconciled.

Also worth keeping: multi-step flow driving and accessibility-tree capture are now named explicitly
as *not supported*, rather than implied by leftover prose. An unsupported capability that a skill
appears to offer is how an agent produces evidence that answers the wrong question.


## Second review correction — 2026-09-02, PR #22

The v0.2.1 fix for "the document promises two different things" **did not finish the job**, and a
second review caught it. Failure Modes still carried five driver-era entries and Read-First still
told the reader to learn the app's navigation and avoid "writing a new driver".

One of those was actively harmful: *"capturing screenshots without the accessibility tree"* was
listed as a failure mode, while the same commit declared accessibility-tree capture unavailable.
**Every supported capture violated the skill's own guidance.**

### Sharpening the lesson, because the first version of it was not enough

v0.2.1's prior-use note said *"grep the whole file for the old vocabulary before committing a
re-scope."* Then that is what was done — for the word `flow`, and only that word. The stale content
used `tap`, `driver`, `walk`, `per-step`, `accessibility tree`, `readiness`, `tear down`.

**The rule as it should read: enumerate the vocabulary of the model you are removing, not the one
word you noticed.** Write the list down before editing — here it would have been *tap, navigate,
walk, step, driver, boot, install, tear down, accessibility tree, end state* — then sweep for every
term and **classify each hit**:

| Class | Meaning | Action |
|---|---|---|
| **stale** | describes the removed model | rewrite or delete |
| **retained** | true of the model you are keeping | **leave alone** |
| **negation** | explicitly says the thing is not supported | leave alone |
| **history** | changelog or prior-use recording the change | leave alone |

**Classify; do not require every hit to be a negation.** Shared vocabulary is the trap: this very
list contains `boot` and `install`, and both are *retained* here — the workflow really does boot an
iPhone 16 simulator (`SKILL.md` lines 3 and 28), and the install boundary at line 95 is a real
precondition. A literal "negate or delete every hit" sweep would have damaged correct instructions.

That correction came from a **third** review of the same re-scope, on the rule written after the
second. The first version of this lesson was itself too literal — which is the same failure it was
written to prevent, one level up. Worth remembering when writing any rule of this shape: a sweep
rule that cannot say "this hit is fine" will generate work and break things.

**And check the sections that describe failure, not just the ones that describe success.** Failure
Modes, Verification and Do-Not-Use encode the old model just as strongly as the recipe does, and are
easier to skip because they read as generic caution rather than as contract.

Two reviews were needed to finish one re-scope. The reviewer was right both times.


## Third review — 2026-09-02, PR #23

The reviewer read the *lesson* rather than the skill and found it over-triggering. See the table
above. Three reviews, three valid findings, each on the fix for the one before:

| Review | Found |
|---|---|
| PR #21 | capability treated as authority; missing `-R`; half-rewritten document |
| PR #22 | the "half-rewritten" fix missed Failure Modes and Read-First |
| PR #23 | the rule written to prevent that would misclassify shared vocabulary |

None was a style preference. The pattern in all three is the same shape: **checking the thing
changed rather than the thing changed away from**, and each fix inherited it from the last.
