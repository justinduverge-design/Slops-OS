---
name: slops-intent-capture
description: Turn an idea, a beta failure, a bug diagnosis, or a research finding into a committed intent.md the next stage must act on. Use when starting new work from a rough idea ("I want the app to...", "users keep hitting..."), when a research or review artifact reaches a conclusion, or when a maintenance diagnosis needs to re-enter the build loop. Implements Anthropic's AI-Native SDLC "capture intent" stage against the SLOPS template, with an SLC scope gate. Produces one intent.md; it does not design, plan, or build.
status: draft
skill_type: package
layer: 0
default_agent: Claude interviews and drafts; the founder reviews and corrects before commit
trigger: "capture intent | write an intent | new idea | intent.md | this research needs to become work"
version: 0.1.0
upstream: Anthropic AI-Native SDLC Playbook, "Capture as intent.md" — https://academy.claude.com/courses/ai-native-sdlc-playbook/capture-intent (read at authoring time; not vendored)
owner: Justin
---

# Slops Intent Capture

## Purpose

Every piece of work starts as something someone wants. This skill captures that once, in the
originator's own words, as a version-controlled `intent.md` the next stage acts on — so a
conclusion cannot evaporate between the session that reached it and the queue that should have
carried it.

**The failure this exists to prevent is documented.** On 2026-07-07 an Omen research memo
identified the working ESPN-on-iPhone approach and a same-day founder spike confirmed it, down to
the endpoint and the required headers. It reached a `Direction/reviews/` file and stopped there.
Five weeks later a second memo re-argued a question the first had settled. The work was finally
queued on 2026-08-31 — not because the research was read, but because a beta user hit the missing
flow. The research was right the whole time. The routing was the defect.

## When to Use

- A new idea, before any spec or build work.
- A research or review artifact reaches a conclusion — **this is the mandatory case.** No file in
  `Direction/reviews/` or `References/research/` is finished until its conclusion has an intent, a
  recorded deferral, or a `known_issues.md` row.
- A maintenance diagnosis, incident finding, or beta report that implies work.
- A bug that is really a missing capability.

## Do Not Use

- To write a spec — that is the Design stage (`design-md-author`, `Blueprints/specs/`).
- To write an implementation plan or an ordered backlog — that is `planning-pass`.
- To write a runnable agent prompt — that is `slops-prompt-generator`.
- To research an external API or data source — that is `pre-build-research`, which runs *before*
  an intent that depends on one.
- To decide priority or sequence. An intent says what and why. The queue decides when.

## Where this sits

The playbook's artifact chain, with the SLOPS artifact that carries each link:

| Stage | Artifact | SLOPS home |
|---|---|---|
| Plan | `intent.md` | **this skill** → `Direction/intents/` |
| Design | `spec.md` | `Blueprints/specs/`, via `design-md-author` |
| Build | `plan.md`, then code + tests | `planning-pass`, `slops-tdd` |
| Test | eval results | `slops-verify`, `slops-quality-baseline` |
| Deploy | an authorized release | `slops-ship`, `slops-canary` |
| Maintain | **a new `intent.md`** | back to this skill |

The loop closes at Maintain. A diagnosis that does not re-enter as an intent is the ESPN failure
repeating.

## Required Inputs

- The originator's description, in their own words. **Do not require formal language** — "I want
  it to just work like Walter Picks does" is a valid input.
- For a research-derived intent: the source artifact path, and its conclusion.
- The owning DBS layer.

## Preconditions and Dependencies

None. No runtime, no network, no credentials.

If the originator is unavailable and the intent would have to be invented rather than captured,
**stop.** An intent written without its originator is a guess wearing an artifact's clothes.

## Read-First Procedure

1. The originator's own words, first and completely.
2. For a research-derived intent: the source artifact, including any addendum or correction block.
   Read the **whole** file — the 2026-07-07 memo's decisive finding was in an addendum below the
   original recommendation, and a later memo missed it.
3. `Direction/intents/` for an existing intent covering this ground.
4. `Direction/known_issues.md` and `Direction/current_sprint.md` — **search by capability, not by
   your own vocabulary.** See Failure Modes.
5. Stop there. Do not read the codebase; an intent describes the world, not the implementation.

## Process Recipe

### 1. Interview

Ask the questions an analyst would. Ask them one or two at a time, not as a form:

- What can't you do today?
- Who hits this, and how often?
- What does better look like — concretely enough to recognize it?
- What is explicitly out of scope?
- How would you know this worked?

Follow the originator's language. If they say "sheet," the intent says sheet.

### 2. Check for an existing intent

Search `Direction/intents/` and the queue for the same capability. If one exists, **amend it
rather than opening a second** — two intents for one capability is how a queue starts arguing
with itself.

### 3. Apply the SLC gate

Before writing, force three answers:

- **Simple** — the smallest cut that delivers the outcome. What is the version with one screen
  instead of four?
- **Lovable** — what makes this good rather than present? A capability that technically works and
  nobody wants is a completed task and a wasted week.
- **Complete** — "complete" is an acceptance list, not a feeling. Each line must be checkable by
  someone who did not build it.

Record the SLC answers **in** the intent. They are the scope contract.

### 4. Write it

Use `references/intent-template.md`. Do not add sections; if something does not fit, it probably
belongs in the spec.

### 5. Route it to a terminal state

An intent is not finished until it reaches exactly one of:

- **Queued** — an item in `current_sprint.md` or `agent_inbox.md` that links back to it.
- **Deferred** — an entry in `decision_log.md` naming the reason and what would reopen it.
- **Known issue** — a row in `known_issues.md`, for something real but not now.

**"Filed in `Direction/`" is not a terminal state.** That is precisely what happened to the ESPN
research.

### 6. Founder review before commit

The product owner reviews and corrects the agent-written `intent.md` **before** it is committed.
This is a required step in the source playbook and it is not optional here. An agent-drafted
intent committed without review is the agent deciding what the founder wants.

## Output Contract

One file: `Direction/intents/YYYY-MM-DD-<kebab-slug>.md`.

Every intent states: target path, the originator and the date, source artifacts used, the SLC
answers, the acceptance list, what is deliberately excluded, and its terminal routing state.

## Verification

- **Smoke test:** a completed intent hands to `planning-pass` or `design-md-author` and the next
  stage does not have to ask the originator a scope question the intent should have answered.
- **Success signal:** the file exists, has a terminal routing state naming a real queue item or
  decision-log entry, and the acceptance list has at least one line a third party could check.
- **Sweep mode:** run over `Direction/reviews/` and `References/research/` to find artifacts with
  conclusions and no downstream reference. Report them; do not auto-generate intents for them —
  each needs its originator.

Never report an intent as captured because the file was written. The routing state is the signal.

## DBS Routing

`Direction/intents/` is the intent home — new under this skill. It sits in `Direction/` because an
intent is current product direction, not a specification or a finished output.

Per `RESOLVER.md` rule 5, `page_type` describes content and never creates a folder. If
`Direction/intents/` is judged a parallel knowledge tree rather than a route, fall back to
`Direction/agent_inbox.md` as the routing surface and ask the founder — **do not invent a second
location.**

## Agent and RBAC Rules

Drafting is agent work. **Committing is not** — founder review precedes commit, always.

This skill never changes an item's priority, blocker, or status; never closes anything; and never
writes to `current_sprint.md` beyond adding an item that links to a reviewed intent.

## Failure Modes

- **Writing the intent in the agent's vocabulary instead of the originator's.** The 2026-09-02
  review of this repo searched `current_sprint.md` for "Candidate D", "WKWebView", and "relay",
  concluded the ESPN work had never been queued, and was wrong — the sprint calls it a "native web
  auth sheet." **Search by capability and by several plausible phrasings, and treat a negative
  result as unproven rather than proven.** A search that proves a negative is only as good as its
  search terms.
- Reading only the top of a research file and missing a correcting addendum.
- Producing a spec. If it names files, functions, or endpoints, it has stopped being an intent.
- Skipping founder review because the draft "looks right."
- Filing in `Direction/` and calling it routed.
- Opening a second intent for a capability that already has one.
- Treating an old intent as current. An intent is a snapshot of what was wanted then.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: what the originator corrected in the draft, which interview
question was missing, and whether the routing state held or the item stalled anyway.

## Changelog

- 0.1.0 — initial. Merges the SLC scope gate with the AI-Native SDLC intent-capture stage; carries
  the research-to-queue routing rule that motivated it.
