# SLOPS OS

## 1. Identity & Scope

SLOPS OS is Justin's operating system layer for decisions, context, agent routing, reusable skills, and cross-project handoffs.

## 2. Tech Stack

- **Primary format:** Markdown DBS files.
- **Skill system:** `Blueprints/skills/`
- **Agent system:** `Blueprints/agents/`
- **Prompt system:** `Blueprints/prompts/`
- **Active product repo:** `slops-saloon/omen/`

## 3. Key Commands

Use commands only when explicitly assigned.

- **Read structure:** `tree /F`
- **Search files:** `rg "<term>"`
- **Check git state:** `git status`
- **Review changes:** `git diff`

Do not run installs, builds, tests, deploys, migrations, or destructive commands from this layer unless Justin explicitly approves.

## 4. Project Structure Hints

- `Direction/`: OS context, roadmap, decisions, risks, and sprint notes.
- `Blueprints/skills/`: Canonical SLOPS-authored skills.
- `Blueprints/agents/`: Canonical SLOPS-authored agent roles and RBAC.
- `Blueprints/tools/`: Tool permission rules and indexes.
- `Blueprints/prompts/`: Runnable prompts for Claude, Codex, and other agents.
- `References/`: Source material and research.
- `Solutions/`: Finished outputs and reports.
- `Archive/`: Superseded, parked, or historical material.
- `slops-saloon/`: Layer 1 division.
- `slops-saloon/omen/`: Layer 2 active product repo.

## 5. Decision Tables

| Situation | Stay in SLOPS OS | Route Elsewhere |
| :--- | :---: | :---: |
| Reusable skill, agent, tool, prompt, DBS, or naming rule | ✅ | |
| Slops Saloon division context or future product slot | | ✅ `slops-saloon/` |
| Omen fantasy football app, backend, frontend, deploy, Stripe, Supabase, Docker, tests, or source | | ✅ `slops-saloon/omen/` |
| Imported agent review or RBAC governance | ✅ | |
| Product implementation or app behavior change | | ✅ product layer only after approval |

## 6. Standard Patterns

### Skill lookup

```text
1. Open Blueprints/skills/README.md
2. Open Blueprints/skills/SKILL_ROUTING.md
3. Open the named skill folder's SKILL.md
```

### Layer route

```text
0-OS: SLOPS/
1-Division: SLOPS/slops-saloon/
2-Product: SLOPS/slops-saloon/omen/
```

## 7. Hard Constraints

Do: Preserve the DBS folder system.

Do: Treat imported agents, Archive, and old project copies as non-authoritative unless Justin says otherwise.

Do: Route Omen execution to `slops-saloon/omen/`.

Don't: Do not change app behavior, deployment posture, secrets, infrastructure, package files, source code, tests, SQL, scripts, `.git`, or active implementation assets from this layer.

Never: Never expose secrets, edit `.env`, push to production, or activate imported agents without explicit approval.
