# Intent: <short capability name in the originator's words>

**Intent ID:** `intent.<kebab-slug>`
**Date:** YYYY-MM-DD
**Originator:** <name — the person who wanted this, not the agent who wrote it>
**Captured by:** <agent, or the same person>
**Layer:** L0 | L1 | L2
**Status:** DRAFT | REVIEWED | ROUTED | SUPERSEDED

> Reviewed and corrected by the product owner before commit? **yes / no**
> An intent committed without this line answered `yes` is not captured, it is assumed.

---

## What I can't do today

<The problem, in the originator's own words. Quote them. Do not translate into
engineering vocabulary — the next stage needs to hear what they actually said.>

## Who this affects

<Who hits it, how often, and what they do instead today. "Me, every Sunday" is a
legitimate answer on a solo product.>

## What better looks like

<Concrete enough to recognize when it arrives. Not "onboarding is easier" but
"a user on an iPhone with no computer can connect their league."

A comparison is allowed and often clearer: "like Walter Picks — it just opens a
screen where you log into ESPN.">

## Explicitly out of scope

<What this is not. The most valuable section in the file; it is what stops the
build from growing while nobody is looking.>

---

## SLC gate

**Simple** — the smallest cut that still delivers the outcome:
<...>

**Lovable** — what makes this good rather than merely present:
<...>

**Complete** — the acceptance list. Each line checkable by someone who did not build it:

- [ ] <...>
- [ ] <...>

---

## Sources

| Source | What it contributed |
|---|---|
| `<path or conversation>` | <...> |

<For a research-derived intent, cite the artifact AND its addenda. State whether any
later document contradicts it, and which one is authoritative.>

## Open questions

<Questions the originator could not answer yet. Each names who can answer it.
An open question is not a blocker unless it is marked one.>

---

## Routing — REQUIRED

An intent is not captured until this names a terminal state. "Filed in `Direction/`"
is not one.

**State:** QUEUED | DEFERRED | KNOWN_ISSUE

- **QUEUED** → item `<ID>` in `Direction/current_sprint.md` or `agent_inbox.md`,
  which links back to this file.
- **DEFERRED** → `Direction/decision_log.md` entry `<date>`, naming the reason and
  what would reopen it.
- **KNOWN_ISSUE** → row in `Direction/known_issues.md`.

**Routed on:** YYYY-MM-DD

---

## Downstream

<Filled in as the chain advances. This is how a later session sees that the intent
was acted on rather than re-deriving it.>

- Spec: `<path>` | not yet
- Plan: `<path>` | not yet
- Shipped: `<PR / release>` | not yet
