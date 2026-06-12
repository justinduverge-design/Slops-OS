# Slops Saloon

## 1. Identity & Scope

Slops Saloon is the sports, music, and arts division of SLOPS OS; Corvus is its only active product.

Slops Saloon and all its division standards — including the Slops OS App Template Spec and the business-launch foundation — are governed by SLOPS OS (Layer 0) doctrine and inherit its layer-discipline and safety boundaries.

## 2. Tech Stack

- **Primary format:** Markdown DBS files.
- **Division layer:** `SLOPS/slops-saloon/`
- **Active product repo:** `SLOPS/slops-saloon/corvus/`
- **Product stack:** Owned by `corvus/`, not this division layer.

## 3. Key Commands

Use commands only when explicitly assigned.

- **Read structure:** `tree /F`
- **Search division docs:** `rg "<term>"`
- **Check git state:** `git status`
- **Review changes:** `git diff`

Do not run product builds, tests, deploys, migrations, Docker commands, or package commands from this layer unless Justin explicitly routes the task to `corvus/`.

## 4. Project Structure Hints

- `Direction/`: Division context, roadmap, decisions, and future product strategy.
- `Blueprints/`: Reusable division-level patterns only when more than one product needs them.
- `References/`: Division-level research and source material.
- `Solutions/`: Division-level finished outputs and reports.
- `Archive/`: Superseded division material.
- `corvus/`: Active fantasy football product repo and all current engineering execution.

## 5. Decision Tables

| Situation | Stay in Slops Saloon | Route to Corvus |
| :--- | :---: | :---: |
| Division context, sports/music/arts strategy, future product slots | ✅ | |
| Cross-product division brand or naming note | ✅ | |
| Corvus, fantasy football, Omen, MVP Move, Trade Analyzer, Draft Assistant | | ✅ |
| Backend, frontend, Stripe, Supabase, Docker, deploy, tests, source, package files | | ✅ |
| Future product idea not yet approved | ✅ park in division context | |

## 6. Standard Patterns

### Product route

```text
If the task is about Corvus execution, start in:
SLOPS/slops-saloon/corvus/
```

### Build loop route

```text
For Corvus execution, use the Corvus loop:
corvus/Direction/agent_inbox.md
corvus/Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md
corvus/Blueprints/prompts/kickoff-backend-codex.md
corvus/Blueprints/prompts/kickoff-frontend-claude.md
corvus/Blueprints/definition-of-done.md
```

For future Slops Saloon products, copy the reusable pattern from:

```text
Blueprints/prompts/agent-build-loop-template.md
```

### Division rule

```text
Keep future product ideas out of Corvus until Justin explicitly starts a second product.
```

## 7. Hard Constraints

Do: Keep Slops Saloon division context separate from Corvus product context.

Do: Use `corvus/` as the only active product repo.

Do: Keep `Blueprints/` mostly empty unless a reusable division-level pattern exists.

Don't: Do not modify Corvus source, tests, deployment, product handoffs, package files, SQL, Docker, Stripe, Supabase, or app behavior from this layer.

Don't: Do not recreate the retired nested `Corvus/` folder.

Never: Never treat division-level notes as permission to change production or product code.
