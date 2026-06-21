---
name: slops-ai-integration-review
description: Review an AI integration plan — model choice, cost-cap, fallback behavior, data flow, sovereignty fit. Converted from engineering-ai-integration-advisor agent.
status: active
skill_type: simple
layer: 0
default_agent: Claude
trigger: "review AI integration plan | model choice review | cost-cap review | LLM safety review"
version: 0.1.0
owner: Justin
---

# Slops AI Integration Review (PROPOSAL)

## When to Use
Before any new LLM/AI feature ships. Required gate for any feature touching paid AI APIs.

## Scope
Review-only pass over a proposed AI integration. Checks: model choice fit, cost-cap and circuit-breaker design, local-fallback behavior, prompt injection surface, data egress map (what user data leaves the box), sovereignty fit (`AI_PROVIDER=local|cloud` toggle present?), failure modes.

## Required Inputs
- The proposed integration spec or PR description.
- Cost-cap target ($/user/month).
- Data classification of inputs.

## Outputs
- `Direction/reviews/<date>-ai-integration-<feature>.md` with P0/P1/P2 findings.

## Does NOT
- Approve spend (Justin only).
- Implement fixes (Codex via the loop).
- Replace `rbac-risk-review` or `security-privacy-evidence`.

## Replaces / Complements
- Replaces candidate agent `engineering-ai-integration-advisor`.
- Complements future `ai-provider-toggle` skill.

## Verification
- Signal: every paid-API call path has a cost-cap and a local fallback.

## Changelog
- 0.1.0 — initial proposal (2026-06-11).
