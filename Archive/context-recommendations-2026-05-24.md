# Context Recommendations
**Generated**: 2026-05-24
**Scope**: Full doc pass — Layer 0 (SLOPS OS), Layer 1 (ssffmvp), Layer 2 (Omen)
**Author**: Claude doc pass after Omen canonical migration completion

---

## Architectural Decision to Log First

### optimizer/omen merge

You confirmed that `POST /api/optimizer/mvp-move` (the Pro-gated six-agent pipeline: Manager Agent + Weather/Injury/Matchup/Trend/Vegas/News sub-agents) belongs under the same umbrella as `POST /api/omen/mvp-move`. Whether that means merging them into one endpoint or surfacing them as tiers of the same product surface is the open question.

**Log this in both:**
- `ssffmvp/Direction/decision_log.md`
- `ssffmvp/Omen/Direction/decision_log.md`

**Suggested wording:**
> `POST /api/optimizer/mvp-move` (Pro-gated six-agent pipeline) and `POST /api/omen/mvp-move` (canonical Omen path) are the same product surface at different tiers. Open decision: whether this merge happens as a single endpoint with tier-based enrichment, or whether `optimizer` becomes an internal Pro enrichment layer called by the `omen` route. Architectural work deferred until after load testing and Stripe live validation.

---

## Layer 0 — SLOPS OS

### `Direction/global-context.md` — stale, merge and retire

**Problems:**
- "Current Global Priority: stabilize the Slops OS folder system" — DBS migration is complete. This is done.
- "What Not To Do Yet" list includes custom MCP servers and multi-agent networks — these are now in active use.
- "ChatGPT: Best for Strategy, specs, planning" in Tool Specialization — tool roles have shifted.
- Duplicates material already in `Direction/context.md`.

**What's worth keeping:** The six Universal AI Rules are well-written and should survive. They belong in `Direction/context.md` under a "Universal AI Rules" section, not in a separate file.

**Recommended action:** Merge the AI Rules block into `Direction/context.md`. Then retire `global-context.md` to `Archive/`.

**Do not** absorb the "Tool Specialization" section as-is — it's outdated.

---

### `SLOPS/context.md` — keep as-is

This is a valid entry-point redirector. Its job is to tell agents where to look first. It correctly points to `Direction/context.md` as the canonical context. No changes needed.

---

## Layer 1 — ssffmvp

### `CLAUDE.md` (root) — needs route table update

`CLAUDE.md` lives at the repo root and is read automatically by Claude Code. Keep it there.

**Problem 1 — missing omen route:**
The route table does not include:

```
| /api/omen | routes/omen.js | POST /mvp-move — canonical Omen path |
```

This route IS mounted in `server.js`. Claude Code doesn't know it exists.

**Problem 2 — system.js comment is stale:**
The table says `routes/system.js — Health, mock contracts`. The "mock contracts" reference is stale — `GET /api/omen-of-the-week` was retired by the Omen canonicalization. The comment should read: `Health, session, platform-status`.

**Recommended action:** Update CLAUDE.md route table. Two-line change only.

---

### `AGENT.md` (root) — needs role refresh

`AGENT.md` lives at the repo root and is read by Codex. Keep it there.

**Problems:**
- "Draft Assistant is the first-impression tool and is free this year only" — pre-launch framing, not an active engineering constraint.
- "MVP Move / Omen of the Week is the paid centerpiece" — correct but incomplete. The Omen canonical path is now POST `/api/omen/mvp-move`. Codex doesn't know the migration happened.
- Missing: the canonical Omen route and the optimizer/omen architecture question.

**Recommended action:** Add a "Current Engineering Reality" section noting the canonical Omen path. Trim the launch-framing language from Current Focus.

---

### `agent_rules.md` (root) — read-first list is wrong

`agent_rules.md` tells all agents to read these files at the start:
1. `context.md` (root)
2. `roadmap.md` (root)
3. `current_sprint.md` (root)
4. `agent_inbox.md` (root)
5. `agent_handoff.md` (root)

**Problem:** Every one of these root-level files is either stale or a redirect shell. The canonical versions are in `Direction/`. Any agent following this read-first list is reading the wrong files.

**Recommended action:** Update the read-first list to:
1. `Direction/context.md`
2. `Direction/current_sprint.md`
3. `Direction/roadmap.md`
4. `Direction/agent_inbox.md`
5. `Blueprints/handoffs/decisions.md`

Also update the Forbidden list — "Move the app to Hostinger" is still valid. "Change DNS/SSL/Nginx" is still valid. But "Merge branches" should be replaced with specific guardrail language from the current sprint guardrails.

---

### Root-level direction file duplicates — retire to redirect stubs

These five files exist at both the ssffmvp root AND inside `Direction/`. The root versions are stale. The `Direction/` versions are canonical.

| Root file | Canonical location | Root file status |
|---|---|---|
| `ssffmvp/context.md` | `Direction/context.md` | Stale. Says "Future platform connections" — all three are live. |
| `ssffmvp/current_sprint.md` | `Direction/current_sprint.md` | Very stale. Sprint 1 goals (homepage layout). |
| `ssffmvp/decision_log.md` | `Direction/decision_log.md` | Stale. Missing 2026-05-23 decisions. |
| `ssffmvp/roadmap.md` | `Direction/roadmap.md` | Likely stale — not read but root pattern holds. |
| `ssffmvp/agent_inbox.md` | `Direction/agent_inbox.md` | Likely stale. |

**Recommended action:** Convert each root-level file to a two-line redirect stub (same pattern as the `manager_agent.md` redirect):

```markdown
# [filename] — Redirect

This file has moved. Canonical location: `Direction/[filename].md`
```

This preserves the path for any tooling that reads the root file by convention, while pointing agents to current content. Do not archive — leave the stubs.

**Exception:** `ssffmvp/agent_handoff.md` is separate from this group. Its canonical location would be `Blueprints/agent_handoff.md`. Same redirect pattern applies.

---

### Root-level `handoffs/` folder — archive candidate

`ssffmvp/handoffs/` at the repo root contains old session decisions from 2026-05-17/18 (before the DBS migration moved handoffs to `Blueprints/handoffs/`). The canonical active handoffs are at `Blueprints/handoffs/`.

**Files in root `handoffs/`:**
- `decisions.md` — historical record from Sessions 17-19
- `decision_log.md` — older format
- `backend-to-frontend.md` — old contracts
- `frontend-to-backend.md` — old contracts

**Recommended action:** Move to `Archive/handoffs-pre-dbs/` after confirming no active Codex tooling references this path. Do this after the git cleanup Codex prompts run (lower risk to move after the tree is clean).

---

### Root-level `specs/` folder — archive candidate

`ssffmvp/specs/` at root (000-005 numbered spec folders) is the old specs location. The canonical location is `Blueprints/specs/`. The content may overlap with `Blueprints/specs/docs/decisions/ADR-002 through ADR-010`.

**Recommended action:** Review for overlap, then archive to `Archive/specs-pre-dbs/`. Same timing recommendation — after git cleanup.

---

### One CLAUDE.md / AGENT.md rule

**Current state:**
- `CLAUDE.md` — Claude Code reads this (correct, keep at root)
- `AGENT.md` — Codex reads this (correct, keep at root)
- `agent_rules.md` — universal rules for all agents

**Problem:** The universal rules in `agent_rules.md` cover both agents but are only read if an agent explicitly reads the file. `CLAUDE.md` doesn't reference `agent_rules.md`. `AGENT.md` doesn't reference `agent_rules.md`. The universal safety rules (don't touch .env, don't deploy, etc.) may not reach all agents.

**Recommended action:** Absorb the "Universal Rules", "Forbidden For All Agents", and "Infrastructure Boundary" sections from `agent_rules.md` into both `CLAUDE.md` and `AGENT.md` under a "## Rules" heading. Then retire `agent_rules.md` — its role-specific content (Codex role, Claude role, handoff format) is already covered by each agent's own file.

This reduces three agent instruction files to two (one per agent), with no loss of coverage.

---

## Layer 2 — Omen

### `Direction/roadmap.md` — stale

**Current content:**
- Now: "Restore the Omen DBS product layer" — done
- Next: "Stabilize core decision tools" — Trade Analyzer, Draft Assistant, Omen are all live
- Later: "Harden platform integrations" — ESPN recovery is live, Yahoo and Sleeper are live

The entire roadmap is describing work that is complete.

**Recommended action:** Rewrite Omen roadmap to reflect post-launch milestones:
- Now: Git cleanup, npm audit, Stripe live validation, Docker prove-out
- Next: Load test, final deploy, launch gate
- Later: Path B optimizer integration into Omen (Pro tier), Hall of Records polish, Draft Assistant season content

---

### Omen context.md and decision_log.md — current ✅

These were updated 2026-05-23 during the last session. No changes needed now.

---

## Agent File Count — One Per Role Per Layer

**Rule: one canonical agent instruction file per agent per layer. No duplicates.**

| Layer | Claude file | Codex file | Universal rules | Status |
|---|---|---|---|---|
| 0 — SLOPS OS | None (SLOPS isn't an app repo) | None | `Direction/context.md` covers this | ✅ OK |
| 1 — ssffmvp | `CLAUDE.md` | `AGENT.md` | `agent_rules.md` (retire after absorbing) | ⚠️ 3 → 2 after cleanup |
| 2 — Omen | None (product layer, not a repo) | None | Inherits from ssffmvp | ✅ OK |

---

## Priority Order

### Do now (before next Codex session)

1. **Log optimizer/omen merge decision** in `ssffmvp/Direction/decision_log.md` and `Omen/Direction/decision_log.md`
2. **Update `CLAUDE.md` route table** — add `/api/omen` row, fix system.js comment
3. **Update `AGENT.md`** — add canonical Omen path, trim stale launch framing
4. **Update `agent_rules.md` read-first list** — point to `Direction/` files

### Do this session (Claude doc pass)

5. **Omen roadmap rewrite** — post-launch milestones replace completed work
6. **Root-level redirect stubs** — context.md, current_sprint.md, decision_log.md, roadmap.md, agent_inbox.md
7. **Absorb `agent_rules.md` universal rules into CLAUDE.md and AGENT.md**, then mark agent_rules.md as retired

### Do after git cleanup (Codex or Claude)

8. **Merge `Direction/global-context.md` AI Rules into `Direction/context.md`**, retire global-context.md to Archive
9. **Archive root `handoffs/` folder** to `Archive/handoffs-pre-dbs/`
10. **Archive root `specs/` folder** to `Archive/specs-pre-dbs/`

### Pending Justin approval

11. **AGENT_INDEX.md Section 4/5 update** — 11 divisions from `reference-only` to `candidate` (documented in `Solutions/reports/dbs-migration/PHASE_6_COMPLETION.md`)

---

## Files That Are Fine — No Action Needed

- `SLOPS/context.md` — valid entry-point redirector
- `SLOPS/Direction/context.md` — canonical SLOPS OS context
- `ssffmvp/Direction/context.md` — canonical ssffmvp context
- `ssffmvp/Direction/current_sprint.md` — updated 2026-05-23 ✅
- `ssffmvp/Direction/decision_log.md` — updated 2026-05-23 ✅ (pending optimizer/omen entry)
- `ssffmvp/Blueprints/handoffs/decisions.md` — canonical, current
- `ssffmvp/Omen/Direction/current_sprint.md` — updated 2026-05-23 ✅
- `ssffmvp/Omen/Direction/decision_log.md` — updated 2026-05-23 ✅ (pending optimizer/omen entry)
- `Blueprints/agents/manager_agent.md` — correct redirect stub ✅
- `Blueprints/agents/sub_agents.md` — correct redirect stub ✅
- `Blueprints/agents/layer-handoff-protocol.md` — authoritative ✅
- `ssffmvp/Blueprints/prompts/manager_agent.md` — runtime prompt, do not touch ✅
- `ssffmvp/Blueprints/prompts/sub_agents.md` — runtime prompt, do not touch ✅
