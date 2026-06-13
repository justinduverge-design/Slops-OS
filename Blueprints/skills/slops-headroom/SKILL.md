---
name: slops-headroom
description: Compress tool outputs, logs, RAG chunks, and large file reads before they hit the LLM. 60-95% token reduction, local-only, MCP-native. Wraps chopratejas/headroom.
status: active
skill_type: wrapper
layer: 0
default_agent: Claude (governs invocation), Justin (runs install)
trigger: "compress this output | shrink the context | dedupe before LLM | headroom this"
upstream: chopratejas/headroom@latest
version: 0.1.0
owner: Justin
---

# Slops Headroom (PROPOSAL)

## When to Use
Any time a tool/file/log/RAG result exceeds ~2k tokens before it lands in Claude or Codex context. Especially: graphify outputs, large diff reviews, multi-file Read passes, persisted web-fetch dumps.

## Scope
Front the headroom library/proxy/MCP server. Headroom does the work; the wrapper governs: when to compress, what to compress, when to bypass (small inputs), and how to route the lossless-fallback (CCR) when the LLM needs the original.

## Preconditions
- Justin runs: `pip install headroom-ai` AND `headroom mcp install` (install boundary).
- Detect with: `python3 -c "import headroom"` or `which headroom` — stop with the install command if missing.

## Required Inputs
- The text/output to compress.
- Token target (default: 30% of original).

## Outputs
- Compressed text + CCR pointer for re-expansion.

## Does NOT
- Send data off-machine (verify the local-only claim with a netstat audit on first install).
- Compress small inputs (<2k tokens — overhead exceeds benefit).
- Replace `clean-up-checkpoint` for session-end summaries.

## Replaces / Complements
- Net-new. Complements `clean-up-checkpoint` (which handles session-end) and `slops-graphify` (whose outputs are large).

## Verification
- Smoke test: compress one graphify HTML output; confirm round-trip via CCR returns the original facts.
- Audit signal: tcpdump on first install — confirm no outbound traffic during a 5-minute soak.

## Changelog
- 0.1.0 — initial proposal (2026-06-11), approved by Justin.
