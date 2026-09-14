---
name: slops-headroom
description: Compress tool outputs, logs, RAG chunks, and large file reads before they hit the LLM. 60-95% token reduction, local-only, MCP-native. Wraps chopratejas/headroom.
status: active
skill_type: wrapper
layer: 0
default_agent: Claude (governs invocation), Justin (runs install)
trigger: "compress this output | shrink the context | dedupe before LLM | headroom this"
upstream: headroomlabs-ai/headroom (Apache-2.0). Corrected 2026-09-14 — the project moved from `chopratejas/headroom`, which now only 301-redirects, and no licence was recorded. See notes/prior-use-review.md
requires:
  - name: headroom (library)
    python-module: headroom
    install: pip install headroom-ai
  - name: headroom (cli)
    bin: headroom
    install: pip install headroom-ai && headroom mcp install
version: 0.1.0
owner: Justin
---

# Slops Headroom

## When to Use
Any time a tool/file/log/RAG result exceeds ~2k tokens before it lands in Claude or Codex context. Especially: graphify outputs, large diff reviews, multi-file Read passes, persisted web-fetch dumps.

## Scope
Front the headroom **library** only — `compress()` and CCR, which run entirely locally. The wrapper
governs: when to compress, what to compress, when to bypass (small inputs), and how to route the
lossless-fallback (CCR) when the LLM needs the original.

> **Narrowed 2026-09-14. `headroom proxy`, `headroom deploy` and the MCP server are OUT OF SCOPE.**
> This section previously read "library/proxy/MCP server". The proxy exists to sit between an agent
> and a **cloud LLM** and make that traffic cheaper — upstream's own architecture diagram is
> `Headroom (local) → LLM provider (Anthropic · OpenAI · Bedrock)`. facts-of-record #17 keeps
> `AI_PROVIDER=cloud` fail-closed and summarizes beta reports through **local Ollama only**;
> relaxing that is "a founder budget decision **and** an egress decision about other people's
> words, never a config change." Standing up a cloud-LLM proxy is the thing #17 most directly
> forecloses. Headroom is not the problem — what the proxy accelerates is a call we do not make.

## Preconditions
- Justin runs: `pip install headroom-ai` AND `headroom mcp install` (install boundary).
- Detect with: `python3 -c "import headroom"` or `which headroom` — stop with the install command if missing.

## Required Inputs
- The text/output to compress.
- Token target (default: 30% of original).

## Outputs
- Compressed text + CCR pointer for re-expansion.

## Does NOT
- Send data off-machine. **The control is which component you install, not what you observe
  afterwards.** This line previously said "verify the local-only claim with a netstat audit on first
  install." That audit would have **passed** — the library makes no calls — while missing the real
  issue entirely, which is architectural: the proxy is a cloud path *by design*. A soak test tells
  you what the software did on Tuesday; the licence and the architecture tell you what it is for.
- Compress small inputs (<2k tokens — overhead exceeds benefit).
- Replace `clean-up-checkpoint` for session-end summaries.

## Replaces / Complements
- Net-new. Complements `clean-up-checkpoint` (which handles session-end) and `slops-graphify` (whose outputs are large).

## Verification
- Smoke test: compress one graphify HTML output; confirm round-trip via CCR returns the original facts.
- Audit signal: tcpdump on first install — confirm no outbound traffic during a 5-minute soak.

## Changelog
- 0.1.0 — initial proposal (2026-06-11), approved by Justin.
- 0.1.1 — promoted to active 2026-06-12 (commit 1221894).
