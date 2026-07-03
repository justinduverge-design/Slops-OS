# Phases 2–4 — SLOPS OS Index, Tools, and Skills Normalization
## Prompt for: Claude (Cowork mode)
## Skill to invoke: slops-context-markdown (for every file created or edited)
## Operation type: Document creation + dependency rewrites — no app source touched
## Date drafted: 2026-05-23
## Prerequisite: Phase 1 and Phase 1B (Codex rename passes) must be completed first
## Naming convention decision: kebab-case is canonical for all files and folders (see Phase 4D below)

---

## Your Role

You are operating as a SLOPS OS documentation architect.
Your job is to make the SLOPS agents, tools, and skills layers deterministic — meaning
any future agent or operator can resolve authority, permissions, and routing without
ambiguity. You will create new index documents, migrate one policy file to its correct
location, and update all markdown files whose internal paths are now stale.

**Use the `slops-context-markdown` skill for every file you create or edit.**
This ensures all outputs follow SLOPS DBS structure, frontmatter, and routing conventions.

---

## Context You Need

**SLOPS root:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS`
**Three layers:** 0-OS SLOPS · 1-slops-saloon · 2-Omen
**DBS model:** Direction / Blueprints / Solutions / References / Archive

**What changed before this operation:**
- `Blueprints\skills\skills.md` was renamed to `SKILL_ROUTING.md` (already done)
- `Blueprints\tools\` folder was created (already done by Justin)
- Phase 1 (Codex) renamed all `_imported` division folders and fixed `slops-prompt-generator\_interface`
- `Blueprints\skills\slops-prompt-generator\_interface` is now single-underscore (was `__interface`)

**The problem:** 7 files still reference old paths. No `AGENT_INDEX.md` exists.
`tools.md` is misfiled inside `skills\`. There is no `TOOLS_INDEX.md`.
`slops-prompt-generator\SKILL.md` may still reference `__interface` internally.

---

## Phase 2 — Create Missing Index and Tools Documents

### 2A — Create `Blueprints\tools\README.md`

**Path:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\tools\README.md`

This folder holds cross-cutting RBAC and tool permission policy.
It is not a skill. It is not an agent. It is a policy layer that both agents and skills
must reference to understand what tools they are permitted to use.

**Document should include:**
- What this folder is and why it exists separately from skills and agents
- File index:
  - `TOOLS_INDEX.md` — canonical tool permission lookup
  - `tool-permissions.md` — full tool permission policy (migrated from `skills\tools.md`)
- Note that neither skills nor agents have tool authority without an explicit entry here
- Links from here to `Blueprints\agents\AGENT_INDEX.md` and `Blueprints\skills\SKILL_ROUTING.md`

---

### 2B — Create `Blueprints\tools\TOOLS_INDEX.md`

**Path:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\tools\TOOLS_INDEX.md`

This is the canonical tool permission lookup. Write it fresh — do not copy from `tools.md`.
It is the authoritative index that points downstream to the detailed policy.

**Document should include:**
- Tool risk tier legend: `read-only`, `write-safe`, `write-guarded`, `execution`, `destructive`
- A summary table of all tool categories with their default risk tier and approval requirement
- Link to `tool-permissions.md` for full policy
- Link to `Blueprints\agents\AGENT_INDEX.md` for per-agent tool grants
- Note: imported agents under `_imported\` have NO tool authority by default until indexed as `active` in `AGENT_INDEX.md`
- A "who approves tool grants" section — Justin is the sole approver at 0-OS level

**Tool categories to cover (from existing `tools.md` content plus common sense):**
- File read (safe default for most agents)
- File write/edit (write-guarded — requires explicit grant)
- Bash/shell execution (execution — requires explicit grant per agent per task)
- Git operations (write-guarded — read allowed, commit/push requires Justin approval)
- Deploy / infrastructure / Docker / SSL / DNS / Nginx (destructive — do not activate without explicit prompt)
- Database / SQL / migrations (destructive — Codex implementation prompt required)
- API credentials / .env / secrets / keys (destructive — never activate for imported agents)
- Browser / web fetch (read-only by default)
- Paid media account mutation (destructive — explicit RBAC required per agent)

---

### 2C — Migrate `tools.md` to `Blueprints\tools\tool-permissions.md`

**Source:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\tools.md`
**Destination:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\tools\tool-permissions.md`

Read the content of `tools.md`. Write it into the new location with these additions:
- Add a frontmatter header: path, layer (0-OS), status (active), migrated-from, date
- Add a note at the top: "This document was migrated from `Blueprints\skills\tools.md`.
  The old path is now a redirect stub. The canonical location is `Blueprints\tools\tool-permissions.md`."
- Preserve all existing tool permission content exactly — do not paraphrase or rewrite the rules
- Add a section at the bottom: "See also: `TOOLS_INDEX.md` for tier summary, `AGENT_INDEX.md` for per-agent grants"

After writing the new file, replace `Blueprints\skills\tools.md` with a redirect stub:

```markdown
# tools.md — Redirect

This file has moved.

**Canonical location:** `Blueprints\tools\tool-permissions.md`

Updated: 2026-05-23
```

---

### 2D — Create `Blueprints\agents\AGENT_INDEX.md`

**Path:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\agents\AGENT_INDEX.md`

This is the most important missing document in the SLOPS OS.
It is the authority map — the single file any agent reads to understand who has what status.

**Document must include:**

**Status legend:**
- `active` — approved, doctrine-wrapped, callable by SLOPS agents
- `candidate` — reviewed, not yet doctrine-wrapped, do not call without explicit approval
- `reference-only` — imported material, readable for inspiration, not callable
- `do-not-activate` — flagged for security/RBAC concerns, requires Justin approval before any use

**Section 1 — Global Authorities (0-OS)**
| Role | File | Status | Authority |
|---|---|---|---|
| Justin / CEO | (person — no file) | active | Sole approver for tool grants, agent promotions, and runtime path changes |
| Claude / Architect | SLOPS context | active | Planning, review, doc creation, inspection — subject to current tool permissions |
| Codex / Engineer | SLOPS context | active | Filesystem execution, code generation — repo-specific instructions control each task |

**Section 2 — Active SLOPS Agents (0-OS authored)**
(These are the agents documented in `agents.md` — global doctrine applies)
- List any agents that have been through `slops-agent-author` and are fully promoted

**Section 3 — Project-Specific Agents (not global)**
| Agent | File | Layer | Status | Note |
|---|---|---|---|---|
| Manager Agent | `slops-saloon\omen\Blueprints\prompts\manager_agent.md` | 1-slops-saloon | active (runtime) | Omen fantasy football runtime prompt. Not a global SLOPS agent. |
| Sub-Agents (6) | `slops-saloon\omen\Blueprints\prompts\sub_agents.md` | 1-slops-saloon | active (runtime) | Omen sub-agent prompts. Not global. |

**Section 4 — Imported Agent Library**
All entries default to `reference-only`. None are callable until promoted through `slops-agent-author`.

| Division | Path | Status | File Count | Risk Level |
|---|---|---|---|---|
| `__academic_division` | `_imported\__academic_division\` | reference-only | 5 | low |
| `__design_division` | `_imported\__design_division\` | reference-only | 7 | medium |
| `__engineering_division` | `_imported\__engineering_division\` | reference-only | 14 | high |
| `__finance_division` | `_imported\__finance_division\` | reference-only | 5 | medium-high |
| `__marketing_division` | `_imported\__marketing_division\` | reference-only | 9 | medium |
| `__paid_media_division` | `_imported\__paid_media_division\` | reference-only | 7 | high |
| `__product_division` | `_imported\__product_division\` | reference-only | 5 | medium |
| `__project_management_division` | `_imported\__project_management_division\` | reference-only | 6 | medium |
| `__sales_division` | `_imported\__sales_division\` | reference-only | 9 | medium |
| `__specialized_division` | `_imported\__specialized_division\` | reference-only | 14 | high |
| `__support_division` | `_imported\__support_division\` | reference-only | 6 | high |
| `__handoffs` | `_imported\__handoffs\` | reference-only | 2 | low |

**Section 5 — Promotion Pipeline**
Note that Phase 5 (slops-agent-author review pass) will promote agents division by division.
Promotion order: product → design → marketing → sales → support (selected) → specialized → project management → engineering → paid media → finance

**Section 6 — Tool Permission Reference**
Link to: `Blueprints\tools\tool-permissions.md` and `Blueprints\tools\TOOLS_INDEX.md`

---

### 2E — Upgrade `Blueprints\agents\README.md`

**Path:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\agents\README.md`

Read the current file. Replace the thin redirect content with:

- What this folder contains
- Lookup rule: "Always check `AGENT_INDEX.md` first. If a role is not listed as `active` there, it is not callable."
- File index: `AGENT_INDEX.md`, `agents.md`, `manager_agent.md` (stub/redirect), `sub_agents.md` (stub/redirect)
- `_imported\` warning: "All files under `_imported\` are `reference-only` by default. See `AGENT_INDEX.md` Section 4."
- Link to `Blueprints\tools\TOOLS_INDEX.md` for tool permission policy

---

## Phase 3 — Dependency Rewrites

These 7 files still reference old paths. For each one, read it first,
then edit only the stale path references. Preserve all other content exactly.

Use `slops-context-markdown` skill for each edit.

### 3A — `Blueprints\README.md`
Read the file. Update any references to:
- `skills\tools.md` → `tools\tool-permissions.md`
- `skills\skills.md` → `skills\SKILL_ROUTING.md`
- `Blueprints\Agents\` (capital A) → `Blueprints\agents\` (lowercase)
- `Blueprints\Skills\` (capital S) → `Blueprints\skills\` (lowercase)

---

### 3B — `Blueprints\agents\agents.md`
Read the file. Update any references to:
- `skills.md` → `SKILL_ROUTING.md`
- `tools.md` → `Blueprints\tools\tool-permissions.md`
- Any path using capital `Agents`, `Skills`, or `Blueprints` → normalize to lowercase

---

### 3C — `Blueprints\skills\README.md`
Read the file. Update any references to:
- `tools.md` → `Blueprints\tools\tool-permissions.md`
- `AGENT_INDEX.md` → `Blueprints\agents\AGENT_INDEX.md` (now exists)
- Normalize any path casing inconsistencies

---

### 3D — `Blueprints\skills\SKILL_ROUTING.md`
Read the file. Update any references to:
- `Blueprints\Skills\tools.md` or `skills\tools.md` → `Blueprints\tools\tool-permissions.md`
- `Blueprints\Agents\AGENT_INDEX.md` → `Blueprints\agents\AGENT_INDEX.md` (normalize casing)
- `Blueprints\Skills\` → `Blueprints\skills\` (normalize casing)

---

### 3E — `Blueprints\skills\slops-agent-author\SKILL.md`
Read the file. Update any references to:
- `Blueprints\Agents\` → `Blueprints\agents\`
- `Blueprints\Skills\` → `Blueprints\skills\`
- `slops-saloon\Blueprints\agents` → `slops-saloon\omen\Blueprints\prompts` (this is the correct runtime path)
- Old `skills.md` → `SKILL_ROUTING.md`
- Old `tools.md` → `Blueprints\tools\tool-permissions.md`

---

### 3F — `Blueprints\skills\slops-context-markdown\SKILL.md`
Read the file. Normalize any path references using capital letters for `Blueprints`, `Skills`, or `Agents`.

---

### 3G — `Blueprints\skills\slops-skill-author\SKILL.md`
Read the file. Normalize path casing. Update any `tools.md` or `skills.md` references.

---

### 3H — `SLOPS\DBS_INDEX.md`
Read the file. If it references `skills\tools.md`, `skills\skills.md`, or uses capital `Blueprints\Skills` or `Blueprints\Agents`, update those references.

---

## Phase 4 — Skill Package Support Folder Normalization

### 4A — Update `slops-prompt-generator\SKILL.md`

**Path:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\slops-prompt-generator\SKILL.md`

Phase 1 (Codex) renamed `__interface` → `_interface` at the filesystem level.
Read this SKILL.md and update any internal reference from `__interface` to `_interface`.
Preserve all other content exactly.

---

### 4B — Document skill package convention at slops-saloon layer

**Path:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\Blueprints\skills\README.md`

Create this file. The `slops-saloon\Blueprints\skills\` folder is currently empty.
This README establishes the convention so future skill packages at this layer
follow the same pattern.

**Content:**
- What belongs in this folder: app-specific skills that are NOT reusable at 0-OS level
- Do not duplicate SLOPS global skills here — use `Blueprints\skills\` at SLOPS root instead
- Canonical structure for any skill package added here:
  ```
  slops-saloon\Blueprints\skills\
    [skill-name]\
      SKILL.md          ← required
      _interface\       ← optional: provider/launcher metadata (e.g., openai.yaml)
      _references\      ← optional: skill-specific reference docs
  ```
- Link to global skills at `SLOPS\Blueprints\skills\`
- Link to global routing at `SLOPS\Blueprints\skills\SKILL_ROUTING.md`

---

### 4D — Document the SLOPS OS Canonical Naming Convention

This is the most important addition from the Phase 1B decision session.
The naming convention must be written into living documents so all future agents,
operators, and Claude sessions follow it without needing to ask.

**File 1 — Create or update `SLOPS/DBS_INDEX.md`**

Read the existing `DBS_INDEX.md`. Add or replace the naming convention section with:

```
## SLOPS OS Canonical Naming Convention

This convention applies at all three layers (0-OS SLOPS, 1-slops-saloon, 2-Omen)
on all paths and all markdown files. It is the rule when creating any folder or
file in the future at any layer.

| Type | Rule | Examples |
|---|---|---|
| DBS pillars | Title Case — always, no exception | Direction · Blueprints · Solutions · References · Archive |
| Single-word content folders | lowercase | agents · skills · tools · handoffs · prompts · specs |
| Multi-word content folders | kebab-case | dbs-migration · brand-assets · old-prompts |
| Skill packages (all layers) | kebab-case | slops-context-markdown · pre-build-research · clean-up-checkpoint |
| Skill support subfolders | _ prefix + kebab | _interface · _references · _old-prompts-for-analysis |
| Import containers | _ prefix + kebab | _imported · _template |
| Items inside _imported | __ prefix + snake_case | __academic_division · __design_division · __handoffs |
| Canonical index files | ALL_CAPS_SNAKE | AGENT_INDEX.md · SKILL_ROUTING.md · TOOLS_INDEX.md · DBS_INDEX.md |
| Regular markdown files | kebab-case | brand-strategy.md · tool-permissions.md · agent-handoff.md |
| Config/special files | keep as-is | README.md · SKILL.md · CLAUDE.md · AGENT.md |

Exception: Items inside _imported use snake_case (not kebab) after the __ prefix.
This is the only place where underscores replace hyphens in multi-word names.
It was set in Phase 1 and is intentional.
```

**File 2 — Update `Blueprints/README.md`**

Read the file. Add a "Naming Convention" section that:
- States kebab-case is the rule for all new content folders and files at this layer
- Links to `DBS_INDEX.md` for the full convention table
- Reminds that DBS pillar names (Direction, Blueprints, etc.) are always Title Case
- States that skill packages under `skills/` use kebab-case at all three layers

**File 3 — Add convention note to `slops-saloon/Blueprints/skills/README.md`** (being created in 4B)

When writing that README, include a section:
"All skill packages at this layer follow kebab-case naming. See SLOPS root
`DBS_INDEX.md` for the full SLOPS OS naming convention."

---

### 4C — Note Omen skills convention

**Path:** Check if `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\omen\Blueprints\` has a `skills\` folder.

If not present: add a note to `slops-saloon\omen\Blueprints\README.md` (create if needed):
- "A `skills\` folder will be created here when Omen-specific skills are needed."
- "Until then, use slops-saloon or SLOPS root skills."
- "When created, follow the `_interface\` / `_references\` subfolder naming convention."

---

## Verification Steps

After completing all phases:

**Step 1:** Run grep for old paths.
```
rg "tools\.md|skills\.md|Blueprints\\Skills|Blueprints\\Agents|__interface" \
  C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints --include="*.md" --include="*.yaml"
```
Expected: Zero hits on old paths. (Redirect stubs referencing old filenames are acceptable — just confirm they're stubs not live references.)

**Step 2:** Confirm `Blueprints\tools\` contains all three files.
```
dir "C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\tools"
```
Expected: `README.md`, `TOOLS_INDEX.md`, `tool-permissions.md`

**Step 3:** Confirm `Blueprints\agents\AGENT_INDEX.md` exists.
```
dir "C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\agents"
```
Expected: `AGENT_INDEX.md`, `README.md`, `agents.md`, `manager_agent.md`, `sub_agents.md`

**Step 4:** Confirm `slops-prompt-generator` uses `_interface` (single).
```
dir "C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\slops-prompt-generator"
```
Expected: `_interface` present, `__interface` absent.

**Step 5:** Git status at both SLOPS root and slops-saloon — confirm no app source was touched.

---

## Do Not Touch — Absolute

```
slops-saloon\omen\src\
slops-saloon\omen\frontend\
slops-saloon\omen\client\
slops-saloon\omen\scripts\
slops-saloon\omen\sql\
slops-saloon\omen\test\
slops-saloon\evals\
slops-saloon\omen\Blueprints\prompts\manager_agent.md    ← runtime prompt — do not change content
slops-saloon\omen\Blueprints\prompts\sub_agents.md       ← runtime prompt — do not change content
slops-saloon\.env
slops-saloon\.env.cloud
slops-saloon\oraclepu.key
slops-saloon\.github\
slops-saloon\Dockerfile*
slops-saloon\package.json
slops-saloon\node_modules\
slops-saloon\.git\
SLOPS\.git\
SLOPS\Archive\
```

---

## Completion Note

Write a completion report at:
`C:\Users\JDuve\OneDrive\Desktop\SLOPS\Solutions\reports\dbs-migration\PHASES_2_4_COMPLETION.md`

Include:
- Date completed
- Files created (list with paths)
- Files edited (list with paths and what changed)
- Result of grep verification step
- Git status from both locations
- Any deviations or decisions made during execution

---

## Summary Checklist

### Phase 2 — Create
- [ ] `Blueprints\tools\README.md`
- [ ] `Blueprints\tools\TOOLS_INDEX.md`
- [ ] `Blueprints\tools\tool-permissions.md` (migrated + redirect stub at old location)
- [ ] `Blueprints\agents\AGENT_INDEX.md`
- [ ] `Blueprints\agents\README.md` (upgraded, not new)

### Phase 3 — Update (dependency rewrites)
- [ ] `Blueprints\README.md`
- [ ] `Blueprints\agents\agents.md`
- [ ] `Blueprints\skills\README.md`
- [ ] `Blueprints\skills\SKILL_ROUTING.md`
- [ ] `Blueprints\skills\slops-agent-author\SKILL.md`
- [ ] `Blueprints\skills\slops-context-markdown\SKILL.md`
- [ ] `Blueprints\skills\slops-skill-author\SKILL.md`
- [ ] `SLOPS\DBS_INDEX.md`

### Phase 4 — Normalize skill conventions
- [ ] `Blueprints\skills\slops-prompt-generator\SKILL.md` (update `_interface` ref)
- [ ] `slops-saloon\Blueprints\skills\README.md` (create)
- [ ] `slops-saloon\omen\Blueprints\README.md` (create or update with skills convention note)
