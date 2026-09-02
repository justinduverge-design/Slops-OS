---
name: slops-agent-docs-refresh
description: Rewrite the agent bootstrap docs (CLAUDE.md, AGENTS.md, identity modules) and the kickoff prompts together as one atomic pass, then verify they cannot drift apart. Use when the read order changes, when a doc cites a superseded or missing file, when a session's fixed reading cost has grown too large, or when adding skills that agents must be told about. Produces the rewritten docs plus a drift check. Never changes authority or permissions.
status: draft
skill_type: simple
layer: 0
default_agent: Claude drafts; the founder approves the read order before commit
trigger: "agent docs refresh | fix claude.md | update kickoff | consolidate kickoff | the read order is wrong"
version: 0.1.0
upstream: none
owner: Justin
---

# Slops Agent Docs Refresh

## Purpose

`CLAUDE.md`, `AGENTS.md`, and the kickoff prompts all encode **the same thing** — what an agent
reads before it does anything. When they are edited separately they disagree, and an agent
following one is violating another.

The rule this skill exists to enforce: **the agent docs and the kickoff prompts are one contract
and change together, or not at all.**

## When to Use

- The read order changes.
- A doc cites a superseded, renamed, or missing file.
- The fixed per-session reading cost has grown large enough to compete with the work.
- New skills exist that agents must be routed to.
- Two bootstrap files disagree.

## Do Not Use

- To change authority, permissions, or runtime policy. Those live in the identity modules and
  Runtime Policy, and changing them is a founder decision, not a docs pass.
- To write a skill — `slops-skill-author`.
- To edit one file in isolation. **That is the failure this skill prevents.** If only one file
  needs changing, that is still a full pass, because the check must run.

## Required Inputs

- Every bootstrap file in scope, in both repos.
- Every kickoff prompt and module.
- The current skill inventory from `SKILL_ROUTING.md`.
- The founder's decision on the read order, since that is a cost decision, not a technical one.

## Preconditions and Dependencies

None. Read and write access to both repos' documentation.

## The full file set

**Nothing in this list is optional.** Missing one is how the contract drifts.

| Layer | Bootstrap | Kickoff |
|---|---|---|
| L0 | `AGENTS.md`, `CLAUDE.md`, `Blueprints/agent-modules/*`, `Blueprints/agents/AGENT_INDEX.md` | `Blueprints/prompts/kickoff.md` + `kickoff-modules/*` |
| L2 | `CLAUDE.md`, `AGENTS.md`, and any `AGENT.md` | `Blueprints/prompts/kickoff-l2.md`, `HOW-TO-RUN-THE-LOOP.md`, `PROMPTS_CHANGELOG.md` |

## Process Recipe

### 1. Inventory before editing

List every bootstrap and kickoff file across both repos. **Find duplicates and near-duplicates
first** — a `CLAUDE.md` and an `AGENTS.md` and an `AGENT.md` in one repo, where only some are
referenced, is a trap, and resolving it is step one.

### 2. Audit every citation

For each file cited in a read order: does it exist, and is it current? A dangling citation is a
defect. A citation to a superseded spec is worse — the agent reads it and acts on it.

### 3. Decide the read order with the founder

Separate **always-read core** from **on-demand routes**. Every file in the core is paid for on
every session, so the core earns its size. This is the founder's call because it trades session
cost against consistency.

### 4. Rewrite bootstrap and kickoff in the same pass

One read order, expressed once. Where a layer genuinely differs — L0 has no auto-populate task
inbox; a product layer does — **branch on the layer explicitly rather than maintaining two
documents that happen to agree.** One kickoff per repo or per layer is fine; two kickoffs that
both claim to define the read order is not.

### 5. Fix paths

Absolute machine paths do not survive a container, a CI checkout, or a second machine. **Use
repo-relative paths.** Where a canonical local path genuinely matters, mark it as informational,
not as the way to find a file.

### 6. Install the drift check

Add a check that fails when the bootstrap read order and the kickoff read order disagree, and
record it where the other repo checks live. **Without this, the pass is a one-time fix and the
files drift again.**

### 7. Log it

Record in `PROMPTS_CHANGELOG.md` and, where the read order changed, `decision_log.md`.

## Output Contract

Rewritten bootstrap and kickoff files, a drift check, and changelog entries. The report states:
every file touched, the read order before and after, dangling citations found and fixed,
duplicates resolved, and what was deliberately left alone.

## Verification

- **Smoke test:** follow the new kickoff as a cold agent, reading only what it says to read. If a
  needed file is not reachable through the stated routes, the read order is wrong.
- **Success signal:** the drift check passes; every cited file exists; no two files claim different
  read orders.
- **Count the core.** If the always-read set grew, say so explicitly — that is a cost the founder
  agreed to, not a side effect.

## DBS Routing

Bootstrap files stay at repo roots. Kickoff prompts stay in `Blueprints/prompts/`. The read-order
decision → `decision_log.md`. This skill creates no new locations.

## Agent and RBAC Rules

Documentation only. **Never changes authority, permissions, tiers, or runtime policy** — if a
rewrite would alter what an agent is allowed to do, stop and raise it. Rewording a permission is
changing it.

Founder approves the read order before commit.

## Failure Modes

- **Editing the bootstrap without the kickoff, or vice versa.** The whole reason for the skill.
- Skipping the drift check, making this a one-time fix.
- Quietly changing an authority boundary while "improving wording."
- Growing the always-read core without saying so.
- Leaving a duplicate bootstrap file unresolved.
- Keeping absolute machine paths as canonical.
- Consolidating two kickoffs into one that then hides a real layer difference.
- Citing a superseded spec because it was in the old list.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: which file was forgotten, whether the drift check caught
anything, and whether the core actually shrank.

## Changelog

- 0.1.0 — initial.
