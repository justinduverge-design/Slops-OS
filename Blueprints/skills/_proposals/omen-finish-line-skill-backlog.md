# Omen Finish-Line Skill Backlog

**Date:** 2026-09-02
**Revised:** 2026-09-02 — Skill 3 correction (the ESPN sheet *was* queued as `W1-A`);
Skill 8 `intent.md` format resolved and renamed `slops-intent-capture`.
**Status:** PROPOSAL — nothing built. Founder approval required per skill before authoring.
**Requested by:** Justin
**Scope:** Skills needed to finish Omen 1.0, derived from a live inspection of both repos.
**Layer:** L0 authoring, L2 application (all eleven are reusable; none is Omen runtime logic).

---

## Why this exists

A review of the `Slops-OS` and `omen` trees against what Justin actually needs to
finish Omen found eleven gaps. Nine are new skills, one is a re-scope, one is a
retirement. The single largest structural finding is not a missing skill at all —
it is that **research conclusions in `Direction/reviews/` have no route into the
build queue** (see Skill 3).

Machinery to use when building any of these, per existing doctrine:
`Blueprints/skills/_template/SKILL.md`, `slops-skill-author`, a row in
`Blueprints/skills/SKILL_ROUTING.md`, a lifecycle entry in
`Blueprints/skills/SLOPS_LIFECYCLE.md`, and a
`Blueprints/playbooks/skill-usage-ledger.md` row at Omen close-out.

---

## Current inventory (baseline)

- 52 skill folders under `Slops-OS/Blueprints/skills/`
- `omen/skills/supabase-form-debugger`
- Playwright driver at `omen/.agents/skills/run-slops-saloon/` (`driver_omen.cjs`,
  `driver_espn_recovery.cjs`, `driver_protected_route.cjs`), mirrored under `omen/.Codex/skills/`

### The structural problem with the existing mobile and UI skills

`slops-mobile-smoke`, `mobile-first-qa-playbook`, and `slops-ui-ux-audit` were all
written for the **web app**, and the product then pivoted to native. Evidence:

- `slops-mobile-smoke` frontmatter: `upstream: playwright-core@1.49.x` — it drives a
  desktop browser at phone viewports, and never touches a simulator or emulator.
- `mobile-first-qa-playbook` device matrix is iOS **Safari** / Android **Chrome**.
- `slops-ui-ux-audit` cites `omen-ux-ui-design-system-v1.md`, which `omen/CLAUDE.md`
  itself marks **partially superseded**.

Meanwhile the native side has real code and real tests with **no skill driving any of it**:

- `mobile/android/app/src/test/` — 15 Kotlin unit tests
- `mobile/android/app/src/androidTest/` — 3 instrumented Compose tests
- `mobile/ios/OmenIOS/OmenIOSTests/` and `OmenIOSUITests/` — XCTest targets

No reference to Maestro, Appium, Detox, or XCUITest tooling exists in either repo's docs.

---

## Tier 0 — unblocks shipping

### 1. `slops-founder-admin-runbook`

**Problem.** Two distinct failures, and the skill must solve both: (a) not *knowing*
an administrative step existed until it blocked a release, and (b) not being able to
*perform* it in a console never used before.

**Scope.**
- Dependency-ordered checklist with real lead times across App Store Connect, Google
  Play Console, and the Yahoo developer app registration. Examples of the class of
  step that must be surfaced *before* it blocks: App Store Connect needs an app
  record plus signed agreements and tax/banking before TestFlight accepts a build;
  Play Console gates production behind a closed-testing tester-count and duration
  requirement; Yahoo requires a registered app with an exactly-matching redirect URI.
  **Every such requirement must be verified against current primary documentation at
  authoring time — do not encode the examples above from memory.**
- Per-console click-path walkthroughs written for a first-time user, not a summary.
- A "what does this screen mean" glossary (bundle ID vs. SKU vs. App ID; internal vs.
  closed vs. open testing; consumer key vs. client ID).
- **Stateful:** the runbook tracks completed steps in a checked-in file, because these
  sequences span weeks and the founder will leave and return.

**Why P0.** This is the class of gap that silently adds a month to a release.

**Non-goals.** Not legal advice; not store-listing copy (that stays with Brand and the
existing store-metadata audit); does not store credentials of any kind.

---

### 2. `slops-canvas-to-code`

**Problem.** Claude produced HTML design canvases — 22 `.dc.html` artboards across
`omen/design/app-rework-canvas/` (13) and `omen/design/command-center/` (3), plus
`canvas.json` in each. Justin wants that workflow to continue. But handing a canvas to
Codex as-is burned rate limits: placements and icons were dropped, the build diverged,
and the retries cost the budget.

**Diagnosis.** The failure was not Codex. It was the canvas being handed over as
intent rather than as a specification.

**Scope.**
1. **Compile** each artboard into an explicit screen contract: element inventory,
   exact placements, named icons, design-token references, and every required state.
2. **Emit** a build prompt carrying a per-element acceptance checklist, so
   "did you place the icon" is checkable rather than remembered.
3. **Diff** the built screen against the artboard by screenshot after the build.

**Dependencies.** Step 3 consumes screenshots from Skill 4. Pairs with Skill 9.
Note the existing `omen/Blueprints/prompts/canvas-m1-screen-contracts.md` — check
whether it already covers step 1 before duplicating it.

**Why P0.** Removing ambiguity is the entire fix for the rate-limit burn.

---

### 3. `slops-research-to-queue`

**Problem — the ESPN case, documented.** The finding that motivated this skill:

- `omen/Direction/reviews/2026-07-07-espn-ios-cookie-sync-research.md` evaluates five
  candidates for ESPN connection on iOS. **Candidate D** — open an app-controlled
  webview, let the user log into ESPN normally, never extract the cookie — scored
  *"Best overall."*
- The **same-day addendum** records Justin's own live spike against a real account,
  which confirmed it and simplified it: the reads API is
  `lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/{season}/segments/0/leagues/{leagueId}`;
  the browser attaches the session cookie automatically so `HttpOnly` status stops
  mattering; two headers are required (`x-fantasy-platform: espn-fantasy-web`,
  `x-fantasy-source: kona`); the JSON is relayed, never the credential — a **better**
  posture against `Blueprints/hard-prohibitions.md` #9 than the extension plan.
- The recorded blocker was hardware, not design: *"the native iOS app still needs an
  actual build environment. Local Xcode is not viable (2017 Intel MacBook Air)."*
  That is a CI question, and it held the approach for weeks.
- Five weeks later, `Direction/reviews/2026-08-15-espn-mobile-feasibility-memo.md`
  re-litigated the **extension** path — including a same-day ⛔ SUPERSEDED correction
  about Safari and `HttpOnly` — and concluded with desktop-handoff-through-beta.
  **That memo shows no awareness of the July addendum**, which had already made the
  extension question moot for this purpose.
- The work was finally queued on **2026-08-31** as `W1-A — ESPN in-app connect sheet
  (iOS + Android)`, P0, after `W1-GATE` closed with the founder's accepted-risk
  decision. Its scope is the July conclusion: consent screen, native web auth sheet
  against ESPN's own sign-in, read the session, existing league-selection step, no new
  backend. **What moved it was a beta failure**, recorded in `agent_inbox.md` as the
  only confirmed beta failure on record — not the research that had established the
  answer eight weeks earlier.
- The July memo also flags a dangling citation
  (`2026-07-05-espn-community-api-and-extension-research.md`, referenced by both
  `current_sprint.md` and `agent_inbox.md`, file absent) that was never cleaned up.

So: the best answer was found, spiked, and confirmed in July — then sat unqueued while
a later memo re-argued a settled question, and only entered the queue in late August
when a beta user hit the missing flow. The research was right and the routing was slow.

> **Correction, 2026-09-02.** An earlier version of this section claimed
> `current_sprint.md`, `agent_inbox.md`, and `known_issues.md` contained *no* mention of
> this work. That was false. The grep behind it searched for `Candidate D`, `WKWebView`,
> and `relay` — none of which the sprint uses; the sprint calls it a "native web auth
> sheet" under `W1-A`. The routing delay above is real and is what this skill addresses.
> The claim that the work was never queued was not. Recorded here rather than silently
> edited, because a search that proves a negative is only as good as its search terms —
> which is itself a rule this skill should carry.

**Scope.** Every research or review artifact must terminate in one of exactly three
recorded outcomes: a queue item in `current_sprint.md` or `agent_inbox.md`, an entry in
`decision_log.md` with an explicit deferral and its reason, or a `known_issues.md` row.
Plus: a sweep that finds review files with no downstream reference, and a
dangling-citation check.

**Check before building.** `dbs-research-to-architecture-router` may already own part of
this charter. Read it first and extend rather than duplicate.

**Why P0.** This is the failure mode that costs the most and is the least visible.

---

## Tier 1 — the quality gaps Justin named

### 4. `slops-native-sim-drive`

> **Corrected 2026-09-02.** This entry, and the inventory section above, claimed the native side
> had no tooling and that a simulator driver had to be built. **Omen already had one** —
> `.github/workflows/native-visual-evidence.yml` builds, boots an iPhone 16 simulator, launches with
> a deterministic scenario argument and uploads per-scenario artifacts on a `macos-14` runner. The
> skill was re-scoped to govern that pipeline and unparked; `ios-ci.yml` runs on `macos-14` too, so
> the "no macOS build host" blocker recorded below applies only to *local* capture.
>
> The claim came from searching for `SKILL.md` files and grepping docs for
> `maestro|appium|detox|xcuitest`. Neither could have found a GitHub Actions workflow doing the same
> job under different names. **Absence of a skill is not absence of the capability** — read
> `.github/workflows/` and `scripts/` before recording a gap.


**The Playwright-for-iOS-simulator ask.** There is no Playwright for native; the honest
stack is `xcrun simctl` + `xcodebuild test -destination 'platform=iOS Simulator'` for
iOS, and `emulator` + `adb` + `gradlew connectedAndroidTest` for Android, with
**Maestro** as the cross-platform flow layer (YAML flows, both platforms, the closest
ergonomics to Playwright).

**Loop.** boot sim/emulator → install build → run flow → screenshot each step →
diff against the approved artboard → severity-ranked P0/P1/P2 report.

Copy the report contract from `run-slops-saloon`; only the backend differs.

**Constraint.** Cannot be validated in a Linux container — no Xcode, no Android SDK.
Author here, first-run on the founder's machine or a macOS CI runner. This intersects
the Skill 1 CI question and the ESPN build-environment blocker in Skill 3.

---

### 5. `slops-native-ui-audit`

Fork `slops-ui-ux-audit` against the **native** specs the Omen read gate already names —
`omen-native-design-house-v1.md`, `component-lock-v1.md`, `team-theme-contract-v1.md` —
instead of the superseded web design system.

Native-specific checks: 44pt tap targets, Dynamic Type at XXL, VoiceOver and TalkBack
labels, contrast against team-skin token overrides, reduce-motion, dark-mode token
coverage. Consumes screenshots from Skill 4 so it audits rendered pixels, not source.

---

### 6. `slops-api-hardening`

**Justin's words: the backend was "built to a tolerable point and not to the best of its
capabilities."** Made checkable.

The backend is 21 route modules and 36 services with roughly 100 test files —
**correctness coverage is genuinely good**, so the gap is not bugs. It is quality
attributes with no gate:

- N+1 and unindexed queries against the `sql/` schema
- p95 latency budgets per route
- cache strategy on the hot paths (`players`, `optimizer`, `omen`)
- timeout, retry, and circuit-breaker discipline on the provider adapters
- idempotency on writes
- a structured error taxonomy

**Output a scored rubric per route**, so "tolerable" becomes a number that can be
watched moving.

---

### 7. `slops-provider-resilience`

Four third-party adapters (ESPN, Yahoo, Sleeper, nflverse) plus a cron. The top
production risk, with no skill covering it: contract-drift detection against recorded
fixtures, replay of provider outages, backoff and quota accounting, graceful
degradation to demo mode.

---

### 8. `slops-intent-capture` (was `slops-slc-intent`)

**Format resolved 2026-09-02.** Justin supplied the source: Anthropic's AI-Native SDLC
Playbook, "Capture as intent.md"
(`https://academy.claude.com/courses/ai-native-sdlc-playbook/capture-intent`; overview at
`https://claude.com/blog/the-ai-native-sdlc-playbook`; a community implementation at
`https://github.com/bashebr/ai-native-sdlc`). The Academy page is not fetchable from the
build container — the egress proxy blocks that host — so **the authoring session must
read it directly and reconcile against these notes** rather than treating this summary as
the spec.

**The practice.** Intent is captured **once, in the originator's own words**, as a
version-controlled artifact the next stage acts on:

1. The originator describes the problem conversationally — what they cannot do today,
   who is affected, what better looks like, what is out of scope. No formal language.
2. Claude asks the questions an analyst would: scope, users, constraints, success.
3. Claude writes the result as `intent.md` **using the organization's template, encoded
   as a skill** — which is exactly this item.
4. The product owner reviews and corrects it **before** it is committed.

**The artifact chain.** Plan commits `intent.md` → Design commits `spec.md` → Build
commits `plan.md`, then code and tests → Test reports eval results → Deploy ships an
authorized release → **Maintain writes its diagnosis back as a new `intent.md`**.

**Why this merges with Skill 3.** That last link — diagnosis re-entering the chain as a
committed intent — is the ESPN gap stated positively. Skill 3 says research must
terminate in a committed artifact the next stage must act on; the playbook says the
artifact is `intent.md`. **Build them as one skill, or as a pair sharing one template,
rather than two competing doctrines.** Decide which at authoring time.

**Keep from the original framing.** The Simple / Lovable / Complete gate — smallest
lovable cut, explicit exclusions, "complete" as an acceptance list — as the section of
the SLOPS template that constrains scope. SLC is how Omen fills the template; `intent.md`
is the template.

**Fit with existing doctrine.** SLOPS already has `planning-pass`, `design-md-author`,
and `slops-prompt-generator` covering adjacent ground, and `definition-of-done.md` owns
acceptance. Map those to the playbook's stages before authoring so this adds a missing
first link rather than a fourth planning doctrine.

---

## Tier 2

### 9. `slops-figma-to-native`

The Figma MCP server is connected and **no existing skill uses it**. Pull
`get_design_context`, emit SwiftUI/Compose against `component-lock-v1` tokens, flag
drift. Closes the loop between the design source and the native code.

### 10. `slops-agent-docs-refresh`

The CLAUDE.md / AGENTS.md rework, built as a repeatable skill and then run as its own
first application. Defects found in this review, to be fixed by that first run:

- **`omen/AGENT.md` (5.9 KB) and `omen/AGENTS.md` (3.9 KB) both exist.** `CLAUDE.md`
  points at `AGENTS.md`; nothing explains `AGENT.md`. One of the two is a trap.
- **Windows absolute paths are canonical** in both `DBS_INDEX.md` files
  (`C:\Users\JDuve\dev\SLOPS\...`). They do not resolve in a container or in CI.
  Repo-relative paths survive every environment.
- **Omen's `CLAUDE.md` orders a 12-file read before any task**, plus a 7-file native
  gate. That is a large fixed cost every session competing with the actual work.
  Restructure into a short always-read core plus explicit on-demand routes.
- **A superseded spec is still cited as authoritative** in the on-demand list
  (`omen-ux-ui-design-system-v1.md`). `slops-ui-ux-audit` cites it too — part of why
  UI/UX work drifts.
- **At least one dangling reference exists** (see Skill 3). Sweep for others.

**Kickoff is in scope for this same pass.** The agent docs and the kickoff prompts are
one contract; changing the read order in `CLAUDE.md` without changing kickoff leaves
two competing instructions. Files to update together:

- `Slops-OS/Blueprints/prompts/kickoff.md` (124 lines) and its five
  `kickoff-modules/` (`read-first.md`, `pull-task.md`, `plan-approval.md`,
  `safety-gates.md`, `done-and-close.md`) — `read-first.md` in particular mirrors the
  read order being changed
- `omen/Blueprints/prompts/kickoff-l2.md`
- `omen/Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md`, which `CLAUDE.md` cites as
  "the loop in one page"
- `omen/Blueprints/prompts/PROMPTS_CHANGELOG.md` — log the change

Add a consistency check to the skill so the two never drift again: the read order in
`CLAUDE.md`/`AGENTS.md` and the read order in kickoff must be verified as identical.

### 11. Re-scope and retire

Re-label `slops-mobile-smoke` and `mobile-first-qa-playbook` frontmatter as
**web-app only**, or retire them. As written they are routed to native tasks and return
confident, irrelevant findings. Skills 4 and 5 are their native successors.

---

## Recommended order

1. **Skill 10** first — fix the docs and kickoff that every other skill will cite,
   otherwise new skills inherit the stale pointers.
2. **Skills 1 and 3** — the two live blockers.
3. **Skill 2** — stops the rate-limit burn on the next screen build.
4. Then Tier 1, with Skill 4 gated on a macOS build environment being resolved.

## Open decisions for the founder

- ~~Skill 3 first action: does the ESPN relay approach become a sprint item now?~~
  **Resolved** — it was queued as `W1-A` on 2026-08-31, before this proposal was written.
  See the correction in Skill 3.
- ~~Skill 8: pointer to the real `intent.md` release, or authorize research time?~~
  **Resolved 2026-09-02** — Anthropic's AI-Native SDLC Playbook. See Skill 8.
- Skills 3 and 8: build as one skill, or as a pair sharing one `intent.md` template?
- ~~Skill 4 and the ESPN native path both need a macOS build environment. Cloud runner, or newer hardware?~~
  **Partly resolved 2026-09-02** — CI already runs on `macos-14` (`native-visual-evidence.yml`,
  `ios-ci.yml`). Remaining question is narrower: is a *local* macOS environment worth buying, or is
  dispatching CI enough? The native ESPN path needs a build environment for iteration, not just
  capture, so it may still want one.
- Skill 11: re-scope the two web mobile skills, or retire them outright?
- Sequencing, live as of 2026-09-02: NFL Week 1 is ~2026-09-10 and the season floor clears
  2026-09-05. `F7` (Yahoo) and `F8` (Sleeper) are `READY` and gate Phase 4 alongside `F6`.
  Does skill-building yield to the three-provider QA gate until the season opens?
