# Slops Saloon — Codex Context

You are Codex working in the Slops Saloon division layer. Read these modules in order before pulling a task.

1. **Identity** — read the identity module for the runtime you actually are, as recorded in Runtime Policy (`../Blueprints/agents/AGENT_INDEX.md` §8): `../Blueprints/agent-modules/identity-claude-code.md`, `identity-codex.md`, `identity-cowork.md`, `identity-api.md`, or `identity-generic.md`. Identity modules describe *possible* runtime profiles — confirm this session's actual capabilities before applying any trust assignment.
2. **Layer in scope** — see `../Blueprints/agent-modules/layer-1-rules.md`
3. **Action posture** — see `../Blueprints/agent-modules/action-posture.md`
4. **Resources available** — see `../Blueprints/agent-modules/resources-index.md`
5. **Files to read first** — see `../Blueprints/agent-modules/files-to-read-first-L1.md`
6. **Hard prohibitions** — see `../Blueprints/agent-modules/hard-prohibitions.md`
7. **Session handoff** — see `../Blueprints/agent-modules/session-handoff.md`
8. **Cross-layer graph** (multi-layer tasks only) — see `../Blueprints/agent-modules/graphify-hook.md`

**L1-specific routing:**

- Division strategy, brand custody, content + marketing → stay here
- Omen app work → descend into `omen/` (legacy repo folder name until external cutover)
- Reusable cross-layer patterns → ascend to L0 (`../`)

### Stay-vs-route decision table

| Situation | Stay in Slops Saloon | Route to Omen |
| :--- | :---: | :---: |
| Division context, sports/music/arts strategy, future product slots | ✅ | |
| Cross-product division brand or naming note | ✅ | |
| Omen, fantasy football, MVP Move, Trade Analyzer, Draft Assistant | | ✅ |
| Backend, frontend, Stripe, Supabase, Docker, deploy, tests, source, package files | | ✅ |
| Future product idea not yet approved | ✅ park in division context | |

## Kickoff

Paste `Blueprints/prompts/kickoff-l1.md` to start a division-layer session. The kickoff is layer- and capability-named, not vendor-named — it confirms your session's actual capabilities and reads Runtime Policy before applying any authority.
