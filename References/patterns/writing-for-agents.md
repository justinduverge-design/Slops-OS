<!-- reference-only | source: mattpocock/skills (MIT) productivity/writing-for-agents | harvested 2026-09-12 | pointed at by slops-context-markdown and slops-skill-author -->

# Writing for agents

Adapted from `mattpocock/skills` (MIT, © 2026 Matt Pocock). Reference-only: read it when
authoring or editing anything an agent consumes — a `SKILL.md`, `CLAUDE.md`, `AGENTS.md`,
`AGENT.md`, a kickoff prompt, or a doc reached by a pointer. The packaging differs; the
writing does not.

**Why SLOPS keeps this.** Every failure this repo has diagnosed in its own docs — stale
environmental claims, superseded headers on live files, a routing row that described an
unimplemented gate — is a writing failure before it is a process failure. These are the levers.

## Context pointers

A **context pointer** is a reference in the agent's context naming out-of-context material plus
the condition for reaching it. A skill's `description` is one. A line in `CLAUDE.md` naming a doc
is the same object. **The pointer's wording, not its target, decides whether the agent reaches
the material.** A must-have target behind a weak pointer is a variance bug: sharpen the wording
first; inline the material only if sharpening fails.

- Front-load the leading word — the pointer does its triggering work there.
- One trigger per branch. Synonyms renaming one branch are one branch written twice.
- Cut identity the body already carries.

Worked example from this repo: `slops-ui-ux-audit` opened with *"Slops-native UI/UX audit"*,
meaning "Slops' own" and reading as "native app". One ambiguous leading word routed native work
at a superseded web spec. Fixed 2026-09-12 by front-loading **WEB APP ONLY**.

## The two loads

- **Context load** — always-loaded material spending tokens and attention every turn whether or
  not it fires.
- **Cognitive load** — the cost on the human of knowing which documents exist and when to reach
  for each. Not a cost to minimise: it is the price of human agency. Spend it where human
  judgement matters; remove it where it does not.

Material behind a pointer escapes context load at the price of the pointer's line. Material with
no pointer rides entirely on cognitive load — which is how a 59-skill library became invisible.

## Information hierarchy

Two content types: **steps** (ordered actions) and **reference** (consulted on demand). Three rungs:

1. **In-file step** — what the agent does, in order.
2. **In-file reference** — consulted on demand. A flat peer-set is a fine arrangement, not a smell.
3. **Disclosed reference** — a separate file behind a pointer, loaded only when the pointer fires.

**Progressive disclosure** is the move down the ladder so the top stays legible. The cleanest
test is branching: inline what every branch needs; disclose what only some branches reach.

**Co-location** is the within-file companion. Keep a concept's definition, rules and caveats under
one heading. Scattering fragments one meaning across many places; duplication repeats one meaning
in two. Both are defects, differently.

**Sprawl** — a document simply too long, even when every line is live. Attention thins across the
excess. Cure with the ladder, or split by branch or sequence.

## Steps and completion criteria

Every step ends on a **completion criterion**.

- **Clarity** — can the agent tell done from not-done? A vague bound invites **premature
  completion**. Sharpen the bound first; only split the sequence if it is irreducibly fuzzy *and*
  you observe the rush. Hiding later steps works only across a real context boundary.
- **Demand** — how much it requires. *"Every modified model accounted for"* forces thorough work
  where *"produce a change list"* does not. Demand drives legwork and is not step-bound: *"every
  rule applied"* binds flat reference the same way.

The strongest criteria are both checkable and exhaustive. SLOPS already encodes this as
`Done when:` — the lever is writing them checkable rather than aspirational.

## Leading words

A **leading word** is a compact concept already in the model's pretraining that the agent thinks
with while running the document. Repeat it as a token, never as a sentence; it accumulates a
distributed definition and anchors a region of behaviour cheaply. Prefer an existing word — a
coined one recruits no priors and you pay in definition tokens what a pretrained word gives free.

It anchors twice: in the body for execution, in a pointer for invocation. When the same word lives
in prompts, docs and code, the agent links them and reaches the material more reliably.

Hunt for restatements that collapse into one token. *"fast, deterministic, low-overhead"* → **tight**.

**Negation is the failure mode beside this lever.** Steering by prohibition drags the forbidden
behaviour into context and makes it *more* available. Prompt the positive: state the target so the
banned behaviour is never spoken. A prohibition earns its place only as a hard guardrail you cannot
phrase positively — and even then, pair it with the positive target.

## Pruning

- **Single source of truth.** One authoritative place per meaning, so a behaviour change is a
  one-place edit. Duplication costs maintenance and tokens and inflates a meaning's apparent rank.
- **The environment is a source of truth too** — `package.json` scripts, config, directory layout,
  `--help`. A document restating it is a **cache**, earning its load only when the lookup is
  expensive. Cache what the agent cannot find by looking: the unwritten convention, the reason
  behind a choice, the gotcha no config confesses. Leave one-command lookups to the environment,
  where they cannot go stale.
- **Relevance.** A line loses it by never bearing on the task, or by going stale as the world it
  describes changes. Without pruning the default fate is **sediment**: stale layers that settle
  because adding feels safe and removing feels risky.
- **No-ops.** An instruction the model already obeys by default pays load to say nothing. The test
  is model-relative: settle it by running the document, not by debate. When a sentence fails,
  delete the sentence rather than trim words from it.

## The SLOPS addition — dated environmental claims

Not from upstream. Earned here, twice, by the same defect.

An **environmental claim** asserts something about the world outside the repo: the host machine,
the OS, installed tooling, a hardware limit, a vendor's availability. `"Local Xcode is not viable
(2017 Intel MacBook Air)"` was true when written and outlived its truth silently — because nothing
in it said when it was written or what would make it false. Sediment, with a specific shape.

**Every environmental claim carries a date and a falsifier.** Not "as of today" — the date, and the
event that ends it. Where the page opts into `valor-brain/v1`, that belongs in `freshness`. Where it
does not, write it in the line:

> Local capture is blocked on the founder's 2017 Intel MacBook Air. *(2026-08-14; falsified by any
> macOS host with Xcode — check the host, not this note.)*

A claim you cannot date or falsify is a claim you are asserting without evidence. Say that instead.
