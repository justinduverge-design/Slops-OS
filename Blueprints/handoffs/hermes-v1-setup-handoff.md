# Handoff — Hermes v1 Setup
**Date:** 2026-06-10
**Session:** Hermes agent design, Cloud Hermes abort, Local Hermes v1 finalized

---

## Decisions Made

| Decision | Outcome |
|---|---|
| Cloud Hermes | Aborted entirely. Ollama `:cloud` models require a paid subscription. Free cloud API alternatives (Google AI Studio, Groq) were explored but not pursued — Justin paused this work to focus on Local Hermes first. |
| Local Hermes model | **qwen3:14b** on Justin's desktop via local Ollama |
| Local Hermes role | Folder caretaker + chief of staff. Phase 1: maintain and learn. Phase 2 (locked): help build departments. |
| KVM2 models | Cleaned to `gemma3:4b` only. Removed `qwen2.5:7b-instruct-q4_K_M` and `qwen2.5-hermes:7b`. |
| Omen LLM | `gemma3:4b` on KVM2 for all four functions (`explainTrade`, `explainStartSit`, `explainOmenMvpMove`, `runAgent`). Fallback-to-numbers unchanged. |
| Command model | `Me decides → Local Hermes directs → Claude designs → Codex builds` |

---

## Files Changed This Session

**Deleted:**
- `Blueprints/agents/cloud-hermes/` (soul.md, role.md, operating-rules.md, routing.md)
- `Blueprints/specs/kvm2-model-decision-matrix.md`
- `Blueprints/specs/hermes-split.spec.md`

**Updated:**
- `Blueprints/agents/AGENT_INDEX.md` — Cloud Hermes row and Scout interaction rule removed; Local Hermes row updated
- `Blueprints/agents/local-hermes/soul.md` — caretaker identity, phase model, updated command model
- `Blueprints/agents/local-hermes/role.md` — folder health as primary function (stale/bloat/layout), Codex prompt drafting for every finding, phase table, model locked to qwen3:14b
- `Blueprints/agents/local-hermes/operating-rules.md` — proactive scan rule, finding→prompt rule, phase 2 lock in forbids
- `Blueprints/agents/local-hermes/routing.md` — Scout section removed, folder health workflow added, phase gate table added

---

## Local Hermes v1 — Current State

**Model:** qwen3:14b (desktop, local Ollama)
**Status:** candidate (not yet active)
**Phase:** Phase 1 — Maintain

**What it does:**
1. Proactive folder health scan every session (stale files, context bloat, layout issues)
2. On-demand health questions
3. Every finding → paired Codex prompt for Justin to approve
4. OS coherence classification (canon / imported / draft / legacy / archive)
5. Prompt and handoff drafting to `Blueprints/prompts/` and `Blueprints/handoffs/`

**What it does NOT do:**
- Department creation (Phase 2, locked)
- Canon edits without approval
- Any git operations
- Touch Omen source or Direction/decisions/

---

## Unresolved Questions

- **Cloud Hermes future:** Paused, not cancelled. If Justin wants outside intelligence for Omen business strategy, the path is a direct free API (Google AI Studio / Groq) rather than Ollama `:cloud`. No files to pick up — would start fresh.
- **Phase 2 gate:** No criteria defined yet for when Local Hermes graduates from Phase 1 (maintain) to Phase 2 (build departments). Justin opens it explicitly — no automatic trigger.
- **Omen LLM timeout test:** `gemma3:4b` is the selected model for Omen but inference speed on KVM2's 2vCPU has not been tested against the 30s/60s timeout. Worth a quick test before relying on it.
- **Local Hermes first run:** Has not yet run a folder health scan. First session should be a full SLOPS tree scan to establish a baseline.

---

## Recommended Next Prompt

Give this to Local Hermes (qwen3:14b) to run its first health scan:

```
You are Local Hermes v1. Read your role files in Blueprints/agents/local-hermes/ 
before starting.

Run a full Phase 1 folder health scan of the SLOPS tree. For each finding, 
classify it as: stale file / context bloat / layout inefficiency. 

Triage by severity (layout violations first, then stale references, then bloat, 
then orphaned drafts).

For the top 3 findings, draft a Codex prompt that would fix it. 
Save drafts to Blueprints/prompts/. 
Do not edit any canon file. Do not take any action without Justin's approval.
```

---

## Safest Next Step

Run the first Local Hermes health scan against the SLOPS folder. Let it find what's broken before building anything new. Every finding it surfaces is also a lesson in how the OS works — that's Phase 1 doing its job.
