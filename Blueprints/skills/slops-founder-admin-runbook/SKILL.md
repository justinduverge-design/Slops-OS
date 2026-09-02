---
name: slops-founder-admin-runbook
description: Guide a first-time operator through the administrative consoles a mobile app release requires — App Store Connect, Google Play Console, and provider developer portals (Yahoo, ESPN, Sleeper, Discord). Use when a release is blocked on a console step, when you do not know which administrative steps exist yet, when a console screen is unfamiliar, or when planning a release calendar backwards from a store gate. Produces a dependency-ordered, stateful checklist plus per-screen walkthroughs. Never handles credentials.
status: draft
skill_type: package
layer: 0
default_agent: Claude researches, drafts, and tracks state; every console action is founder-executed
trigger: "store setup | app store connect | play console | what do I need to do before submitting | provider api setup | release admin"
version: 0.1.0
upstream: none — vendor documentation is read live, never vendored (see Freshness Contract)
owner: Justin
---

# Slops Founder Admin Runbook

## Purpose

Two different failures cost a solo founder weeks, and they need different fixes:

1. **Not knowing a step existed** until it blocked a release. Administrative prerequisites are
   invisible until they bite — you discover the agreement you never signed at the moment you try
   to upload a build.
2. **Not being able to do the step** in a console you have never opened, where the vocabulary
   assumes you already know it.

This skill solves both: a dependency-ordered map of what exists, and a walkthrough for performing
each one. It is written for someone doing this for the first time, deliberately.

## When to Use

- Before a release, to discover the administrative critical path.
- When blocked on a console step and the console's own docs assume prior knowledge.
- When a screen's vocabulary is unclear (bundle ID vs. SKU vs. App ID; the testing tracks).
- When planning backwards from a store deadline and needing real lead times.

## Do Not Use

- To perform a console action. **Every step here is founder-executed.** See RBAC.
- To handle, store, transcribe, or transmit any credential, key, token, or password.
- For store *listing copy* — that is Brand plus the store-metadata audit.
- For legal or tax advice. The runbook says a form exists and what it asks; it does not tell you
  what to put in it.

## Freshness Contract — read this before trusting any step

**Console requirements change, and a runbook that is confidently wrong is worse than none.**

- Every requirement, threshold, duration, and screen path **must be verified against the vendor's
  current primary documentation at the time it is written or followed.** Not from the agent's
  training data. Not from a blog. Not from this file's memory of last quarter.
- Each checklist row carries a `verified: YYYY-MM-DD` stamp and a primary-source URL.
- **A row older than 90 days is treated as unverified** and must be re-checked before it is relied
  on as a gate.
- When the vendor's documentation and this runbook disagree, **the vendor is right and this file
  is a bug.**

Known moving parts, named so they are re-checked rather than assumed: the closed-testing tester
count and duration required before production on Google Play; which agreements and tax/banking
records gate a TestFlight or production submission on App Store Connect; Apple's account-type and
transfer rules; provider API entitlement approval flows and their turnaround.

## Required Inputs

- The target: a store submission, a beta, or a provider integration.
- Which accounts exist and which do not.
- The deadline being worked backwards from.
- The current state file (below), if one exists.

## Preconditions and Dependencies

- Network access, to read current vendor documentation.
- **No credentials, ever.** This skill does not need and must not receive an Apple ID, a Play
  Console login, an API key, a signing certificate, or a password.
- Console access is the founder's. The skill produces instructions; the founder performs them.

## Read-First Procedure

1. The state file: `Solutions/reports/founder-admin-state.md`. **Read it first** — these sequences
   span weeks and the point is not to re-derive what is already done.
2. `Direction/current_sprint.md` for the release lane, and any existing store or provider items.
3. `Direction/facts-of-record.md` for standing account facts (program enrollment, account transfer
   status, entitlements already granted).
4. The vendor's **current** primary documentation for each step being written or followed.
5. Nothing else. This skill does not read application code.

## Process Recipe

### 1. Establish current state

Read the state file. If none exists, create it from `references/state-template.md` and interview
for what already exists — accounts, enrollments, agreements, entitlements, prior submissions.

### 2. Build the dependency graph, not a flat list

The value is in the ordering. Each step records: **what it blocks**, **what blocks it**, and its
**real lead time** — the wall-clock wait, not the minutes of clicking. A step with a multi-day
review is a scheduling fact, not a task.

Sort by *earliest start*, not by importance. A five-minute form with a two-week review downstream
outranks an hour of work that blocks nothing.

### 3. Write the walkthrough for someone who has never seen the screen

For each step, `references/walkthrough-format.md` requires:

- **Where you are** — the exact navigation path, and what the page looks like when you arrive.
- **What you are actually doing**, in plain language, before any field is named.
- **Field by field** — what it wants, what happens if it is wrong, and whether it can be changed
  later. *Permanence is the single most useful fact about a form field* and consoles rarely say it.
- **What "done" looks like** — the state change proving it worked.
- **What breaks if skipped** — the downstream failure, so the ordering is self-evident.
- **How long the wait is**, if any.

Never write "configure the app record." Say which button, on which page, and what it does.

### 4. Glossary as you go

Any term a first-timer would have to look up goes in `references/console-glossary.md` with a plain
definition and where it appears. This is what makes the second console cheaper than the first.

### 5. Update state after every founder report

When the founder reports a step done, record it with its date and the observed result — including
"the screen did not look like the walkthrough," which is how the runbook stays true.

## Output Contract

- **`Solutions/reports/founder-admin-state.md`** — the live checklist. One file. Stateful across
  sessions. This is the deliverable.
- **`references/` additions** — walkthroughs and glossary entries as they are written.
- Optionally, an item in `current_sprint.md` under the release lane when a step becomes a blocker.

Each report states which steps are done, which are waiting on a review clock (and since when),
which are blocked, and **what the founder should do next, singular**.

## Verification

- **Smoke test:** hand a written walkthrough to someone who has not seen the console and confirm
  they reach the "done" state without asking a question the walkthrough should have answered.
- **Success signal:** the founder reports the described state change — the build appears in
  TestFlight, the track shows the right tester count, the API call returns data instead of an
  authorization error. **A completed form is not a success signal; the resulting state change is.**
- **Failure signal that matters most:** the console did not look like the walkthrough. Record it
  and fix the row — that is drift, and it is the thing this skill exists to catch early.

## DBS Routing

- Live state and reports → `Solutions/reports/`.
- Walkthroughs and glossary → this skill's `references/`.
- A decision (which account type, whether to transfer, which testing track) → `decision_log.md` in
  the owning layer.
- A discovered requirement that changes the release plan → an intent via `slops-intent-capture`,
  then the sprint.

## Agent and RBAC Rules

**The hard line: the agent writes instructions; the founder performs every console action.**

The agent must never request, receive, echo, store, or transmit a credential, key, token,
certificate, password, or recovery code. If one appears in the conversation, do not repeat it in
any file, commit, or report.

No console action is agent-buildable — consistent with `current_sprint.md`'s rule not to auto-pull
Founder/Ops or Store/Release work.

## Failure Modes

- **Writing a requirement from memory.** The most likely and most damaging failure. Store rules
  change; a confidently wrong gate sends the founder down a wrong path for a week. Cite or omit.
- Treating a form as done when the state change has not appeared.
- Missing the lead time and discovering a multi-day review on the deadline.
- Writing for someone who already knows the console.
- Failing to state that a field is permanent.
- Letting the state file drift so the runbook says "done" for something that was reverted.
- Bundling a legal or tax judgement into a procedural step.
- **Handling a credential.** Not a mistake — a boundary violation.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: which step's reality differed from its walkthrough, which
lead time was wrong, and which glossary term was still unclear at the screen.

## Changelog

- 0.1.0 — initial. Structure and freshness contract only; **no console requirements are encoded
  yet.** The first run must research and write them against live vendor documentation.
