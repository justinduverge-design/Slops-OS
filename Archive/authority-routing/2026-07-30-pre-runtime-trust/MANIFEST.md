# MANIFEST — Authority / Routing Surfaces Retired Before the Runtime Trust Model

**Status: HISTORICAL ONLY.** Nothing in this directory is authoritative. No file here is
loaded by any runtime, and no filename here auto-loads. Every file was renamed with an
`.archived.md` suffix so it cannot be picked up as live doctrine.

**Archived:** 2026-07-30
**Cutover:** PR B — Repository Authority / Routing (D54–D69)
**Successor model:** Runtime Policy + Active Trust Assignments in
`Blueprints/agents/AGENT_INDEX.md` §§8–9, with canonical action and approval doctrine
(Action Risk Tiers) in `Blueprints/tools/tool-permissions.md`.

Records are **not** edited to match new doctrine, and their old references stay as
written (D58). Where a historical record still names a file archived here, that record is
correct about the past and was deliberately left alone.

---

## a) Retired global agent manifest

| Field | Value |
|---|---|
| **Original path** | `Blueprints/agents/agents.md` |
| **Archived as** | `agents/agents.manifest.archived.md` |
| **Type** | Retired authority surface |
| **Size** | 9739 B |
| **Reason** | Keyed global authority to vendor names ("Claude", "Codex") and duplicated the permission model. Superseded by the runtime trust model, where authority derives from runtime eligibility plus an active assignment, never from a vendor or model name. |
| **Successor** | `Blueprints/agents/AGENT_INDEX.md` + `Blueprints/tools/tool-permissions.md` |
| **Auto-loading?** | Yes — on this Windows workspace lowercase `agents.md` resolves to the canonical `AGENTS.md`. Renamed inert. |

**Prior active inbound references, all rewired in this cutover:**

- `Blueprints/agents/AGENT_INDEX.md` :29, :30, :37, :246 — :29/:30 keyed authority to
  "Claude"/"Codex"; rekeyed onto the founder / planner / executor roles per D55.
- `Blueprints/agents/README.md` :18, :52
- `Blueprints/tools/README.md` :28
- `Blueprints/tools/tool-permissions.md` :154
- `Blueprints/tools/TOOLS_INDEX.md` :77
- `Blueprints/skills/SKILL_ROUTING.md` :22, :158
- `README.md` :23

---

## b) Retired L0 redirect stub — Manager Agent

| Field | Value |
|---|---|
| **Original path** | `Blueprints/agents/manager_agent.md` |
| **Archived as** | `agents/manager_agent.stub.archived.md` |
| **Type** | Redirect stub |
| **Size** | 1706 B |
| **Reason** | PR A doctrine forbids redirect stubs. The stub declared its own canonical location one layer down and carried no content of its own. |
| **Successor** | `omen/Blueprints/prompts/manager_agent.md` — **LIVE runtime prompt. PRESERVED, not archived, not renamed.** Verified present at 4436 B. |

**Also updated to point at the L2 canonical:**
`Blueprints/agents/layer-handoff-protocol.md` :131–132, :171–172, :187–188 and
`Blueprints/skills/slops-agent-author/SKILL.md` :29, :300, :302.

---

## c) Retired L0 redirect stub — Sub-Agents

| Field | Value |
|---|---|
| **Original path** | `Blueprints/agents/sub_agents.md` |
| **Archived as** | `agents/sub_agents.stub.archived.md` |
| **Type** | Redirect stub |
| **Size** | 1865 B |
| **Reason** | PR A doctrine forbids redirect stubs. `sub_agents.md:5` itself declared the canonical location as `slops-saloon\omen\Blueprints\prompts\sub_agents.md`. |
| **Successor** | `omen/Blueprints/prompts/sub_agents.md` — **LIVE. PRESERVED, not archived, not renamed.** Verified present at 2665 B. |

---

## d) Retired vendor-keyed workflow runbook

| Field | Value |
|---|---|
| **Original path** | `Blueprints/playbooks/runbook_ai_workflow.md` |
| **Archived as** | `playbooks/runbook_ai_workflow.archived.md` |
| **Type** | Retired authority / routing surface |
| **Size** | 3070 B |
| **Reason** | **Verified before archiving, as §8d requires.** Its "Roles" table assigned standing authority by vendor — "Claude Code \| Front-End Engineer", "Codex \| Back-End Engineer", "Claude Chat \| Planner / Reviewer" — and defined a per-vendor routing contract. That is an authority/routing surface, not neutral operational guidance, and it is exactly what the runtime trust model replaces. Archived. |
| **Successor** | `Blueprints/agents/AGENT_INDEX.md` §§8–9 (runtime eligibility + assignments) and `Blueprints/skills/SLOPS_LIFECYCLE.md` (planner / executor / founder-gate contract) |
| **Note** | An archived copy already existed at `Archive/superseded-docs/runbook_ai_workflow.md` (3038 B) from the earlier DBS migration. That copy is left untouched; this is the newer `Blueprints/playbooks/` copy. |

**Prior inbound references — all are records and were left as written (D58):**
`Blueprints/handoffs/2026-06-11-skills-acquisition-handoff.md` :13 and seven files under
`Solutions/reports/dbs-migration/`.

---

## e) Retired vendor-keyed prompt templates (6)

| Field | Value |
|---|---|
| **Original path** | `Blueprints/prompts/_templates/` (directory removed once empty) |
| **Type** | Retired routing surface |
| **Reason** | Each template was keyed to a vendor rather than to a layer and a capability, and several embedded standing role assignments. Templates must name planner / executor / founder and resolve the runtime at invocation. |
| **Successor** | `Blueprints/prompts/kickoff-l0.md`, `slops-saloon/Blueprints/prompts/kickoff-l1.md`, `omen/Blueprints/prompts/kickoff-l2.md` |

Archived files: `Claude_prompt_format`, `Codex_prompt_format`,
`claude-code-pull-next-frontend`, `codex-pull-next-backend`,
`simple_prompt_system_claude`, `simple_prompt_system_codex` — each with `.archived.md`.

---

## f) Retired vendor-named kickoffs (4 of 6 at this layer)

| Field | Value |
|---|---|
| **Original paths** | `Blueprints/prompts/kickoff-l0-claude.md`, `kickoff-l0-codex.md`, `slops-saloon/Blueprints/prompts/kickoff-l1-claude.md`, `kickoff-l1-codex.md` |
| **Type** | Retired routing surface |
| **Reason** | Vendor-named kickoffs invite a session to infer authority from which model is reading them. The successors are layer- and capability-named and confirm actual session capability before applying any trust assignment. |
| **Successor** | `Blueprints/prompts/kickoff-l0.md`, `slops-saloon/Blueprints/prompts/kickoff-l1.md` |
| **Order** | Archived **after** the successors were created and their inbound references verified live. |

The remaining 2 of the 6 (`kickoff-frontend-claude.md`, `kickoff-backend-codex.md`) are
L2 and are archived in the `omen` repository under the same archive root. Successor:
`omen/Blueprints/prompts/kickoff-l2.md`.

**All 15 live references were updated in this cutover** — 4 at L0, 3 at L1, 8 at L2.
Historical records were deliberately **not** edited: the 2 PR A handoffs,
`Direction/decision_log.md` :618 and :629, `skill-usage-ledger.md` :118, and
`PROMPTS_CHANGELOG.md` :112.

---

## g) Retired combined identity module

| Field | Value |
|---|---|
| **Original path** | `Blueprints/agent-modules/identity-claude.md` |
| **Archived as** | `agent-modules/identity-claude.archived.md` |
| **Type** | Retired authority surface |
| **Reason** | Described three runtime modes in one file and paired itself with `identity-codex.md` as a peer. That pairing breaks under a five-module split and was rewritten rather than carried. Also carried a "Soft lean" lane rule that read as an authority boundary. |
| **Successor** | `identity-claude-code.md`, `identity-cowork.md`, `identity-codex.md`, `identity-api.md`, `identity-generic.md` — API mode preserved in `identity-api.md`. |
| **Order** | Archived **after** all four successors were verified live. |

**Prior active inbound references, all rewired:**
`Blueprints/agent-modules/identity-codex.md` :12 (peer pairing, rewritten),
`Blueprints/prompts/kickoff-l0-claude.md` :17 (itself archived),
`CLAUDE.md` :5, `slops-saloon/Blueprints/prompts/kickoff-l1-claude.md` :18 (itself
archived), `slops-saloon/CLAUDE.md` :5.
