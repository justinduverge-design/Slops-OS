# Prior use — slops-agent-docs-refresh

## Run 1 — 2026-09-12, Omen L2 + Slops OS L0

**First invocation.** The skill was `draft` and this was its first real pass.

### Which file was forgotten

None were forgotten — but the skill's file list was **incomplete**, and that is the finding.

Its "full file set" table names `AGENTS.md`, `CLAUDE.md`, `AGENT.md`, agent-modules, and the kickoff
prompts. It does not say to grep for *other* files that restate a read order. Three did:
`omen/AGENTS.md`, `omen/AGENT.md`, and L0's `Blueprints/agent-modules/files-to-read-first-L2.md`.
All three still listed `Direction/decision_log.md` as an up-front read, all three predated the
`current_sprint` / `known_issues` splits, and all three disagreed with each other on sequence.

**Carry forward:** step 1 should be a search, not a list. `grep -rl "Read in order\|read first\|always-read"`
across both repos finds restatements the table cannot anticipate. A file that is not named in the
table can still carry the contract.

### Whether the drift check caught anything

**No — and that is its limit, not a failure.** `check-kickoff-drift.js` compares exactly two files:
`CLAUDE.md` and `kickoff-l2.md`. Those two never drifted. The three that did were invisible to it,
for eight weeks. A check that guards one pair while four files carry the contract reports green on a
drifted system.

The fix applied was structural rather than another check: the three now **point at `CLAUDE.md`**
instead of restating it, so there is one copy and nothing left to drift. That is better than
extending the check to compare five files, because the comparison would then have to tolerate five
different phrasings of the same list.

### Whether the core actually shrank

Yes, and the number was the whole argument: **~166,000 tokens to ~50,000.** Measured, not estimated —
`wc -w` on every file in the read order, at 4/3 tokens per word.

`decision_log.md` alone was 93,000 tokens, 56% of the cold start, and sat in *read before you plan*.
Nothing about picking up a task requires every decision ever made.

**Carry forward:** the skill says "count the core" in Verification. It should say it in **step 3**,
before the founder is asked to decide the read order. The founder cannot trade session cost against
consistency without the cost, and the cost is two commands. Presenting the per-file table is what
turned a vague "the docs feel heavy" into a decision made in one message.

### What the skill got right

The atomic-pass rule held. Rewriting `CLAUDE.md` without `kickoff-l2.md` would have failed the drift
check immediately, which is exactly the guard rail working. And "Never changes authority" was the
right boundary — the Safety Gates block was left byte-identical, and the read-order change was put
to the founder rather than decided in the pass.

### Promotion

Not promoted out of `draft` on one run. Promote after a second pass confirms the search-not-list
change works, and after the founder's read-order decision has survived a few sessions.
