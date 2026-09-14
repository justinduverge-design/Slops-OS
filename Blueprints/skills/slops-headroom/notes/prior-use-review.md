# Upstream vetting — `slops-headroom` / headroom

**Vetted 2026-09-14 · Verdict: ADOPT THE LIBRARY. DO NOT ADOPT THE PROXY.**

## The upstream — and it moved

| | |
|---|---|
| Licence | **Apache-2.0** (our `SKILL.md` recorded no licence at all) |
| Stars / forks / issues | 72,124 / — / active |
| Last push | **2026-09-14** |
| Repo | **`headroomlabs-ai/headroom`** |

**`upstream: chopratejas/headroom@latest` is a stale path.** The project moved to an org account;
the old path 301-redirects today. GitHub redirects survive until someone claims the old namespace,
which is not a guarantee to pin a supply chain on.

## Against our constraints — the finding that decides this

Our `SKILL.md` says *"Front the headroom library/proxy/MCP server"* and lists under **Does NOT**:
*"Send data off-machine (verify the local-only claim with a netstat audit on first install)."*

**Those two sentences cannot both be satisfied**, because of what the proxy is *for*. From the
upstream's own architecture diagram:

```
Headroom (runs locally — your data stays here)  →  LLM provider (Anthropic · OpenAI · Bedrock · …)
```

Headroom does not exfiltrate. Headroom's **compression runs locally** and CCR caches originals
locally — that claim holds. But `headroom proxy` exists to sit between an agent and a **cloud LLM**
and make that traffic cheaper. Its value proposition is a cloud round-trip we do not make.

Against facts-of-record #17: `AI_PROVIDER=cloud` is fail-closed at `cloud_disabled_zero_budget`,
the public-host guard in `src/services/llm.js` stays, and beta reports are summarized by **local
Ollama only**. Standing up a cloud-LLM proxy is the one thing #17 most directly forecloses — and
relaxing it is *"a founder budget decision **and** an egress decision about other people's words,
never a config change."*

**So the split is:** `compress()` as a library is local, useful, and in scope. `headroom proxy` and
`headroom deploy` are out of scope and must not be installed as a convenience. The wrapper currently
endorses all three.

The "verify with a netstat audit" instruction is good practice and would have **passed** — the
library makes no calls — while completely missing the real issue, which is architectural, not
observational. **A soak test tells you what the software did on Tuesday; the licence and the
architecture tell you what it is for.**

## Supply chain — noted, and it cuts both ways

The upstream's own `pyproject.toml` pins out a transitive dependency because of a **compromised PyPI
release**: `ast-grep-cli` 0.44.1 shipped an info-stealer (`Trojan:Win64/Lazy!MTB`) alongside the real
binary. They excluded that exact version with `!=` and documented why, in the dependency list.

That is the correct handling and it is a point in their favour — but it is also a live demonstration
that this dependency tree has had a compromise inside the last year. Other transitive deps include
`litellm` (a multi-provider LLM router) and `opentelemetry-api` (no-op by default, but a telemetry
surface that exists).

For a skill whose job is to *read all our tool output and file contents*, the dependency surface is
part of the threat model, not a footnote.

## Does it earn its place?

**Conditionally, and lower priority than the catalogue implies.** The library is genuinely good at a
real problem. But the benefit is agent-context economics, not product capability — nothing a user
sees gets better — and the cost is a moderately large Python dependency tree with a recent
supply-chain incident in it, on a machine that also needs a Python decision it has not made.

**Recommendation: defer, do not reject.** Revisit when (a) the Python interpreter question is
settled for markitdown and manim anyway, and (b) there is a measured context problem to point at
rather than a general sense that outputs are large. Adopting a compression layer before measuring
what needs compressing is solving the cheaper half of the problem.

## What we would change

**Upstream:** nothing.

**Local deltas (required before any install):**

1. Correct `upstream:` to `headroomlabs-ai/headroom`, record **Apache-2.0**, and pin a version.
2. **Narrow the wrapper to the library.** Remove the proxy and MCP-server endorsement, and state
   plainly that `headroom proxy` is out of scope under #17 — not because headroom is untrustworthy,
   but because what the proxy accelerates is a call we do not make.
3. Replace *"verify the local-only claim with a netstat audit"* with what it should have said:
   the library is local by construction; the proxy is a cloud path by design; the control is
   **which component you install**, not what you observe afterwards.
4. Record the `ast-grep-cli` history so a future bump re-reads it.
