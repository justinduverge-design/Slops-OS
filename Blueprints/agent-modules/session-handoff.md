# Session Handoff Template

At the end of any non-trivial session, write a handoff. Location:

- L0 work → `Blueprints/handoffs/YYYY-MM-DD-[topic]-handoff.md`
- L1 work → `slops-saloon/Blueprints/handoffs/YYYY-MM-DD-[topic]-handoff.md`
- L2 work → `slops-saloon/omen/Blueprints/handoffs/YYYY-MM-DD-[topic]-handoff.md`

**Required sections:**

1. **Files updated** — full paths + brief reason (commit hashes if committed)
2. **Files discussed** — read but not changed (so the next session knows what informed your work)
3. **Decisions made** — anything that should land in `decision_log.md` (you write it)
4. **Unresolved questions** — for Justin to weigh in on
5. **Blockers surfaced** — anything that needs Justin to act
6. **Last verified build/test result** — and which command produced it
7. **Next recommended pull** — what the next session should grab from the inbox

Keep it terse. The handoff is for the next agent's cold start, not for praise.

## Before you write it — run the gate

The documentation layer is checkable. Run the checks your session touched, from the L0 root:

```bash
node Blueprints/tools/truth-gate/truth-gate.mjs --quiet          # P0 only, whole tree
node Blueprints/tools/truth-gate/truth-gate.mjs --check=<name>   # one check
node Blueprints/tools/valor-brain/validate.mjs                   # opted-in pages
node Blueprints/tools/skill-link/link-skills.mjs --check         # skill reachability
```

A **P0** means an agent reading current docs would act on false information — it is a blocker on
your own close-out, not a note for later. Record the result in the handoff's *Last verified* line
with the command that produced it. A suppression added to `truth-gate-ignore.txt` needs a reason on
the line; a suppression without one is a lie you tell yourself later.

If the gate was not run, say so. An unrun check is not a passing check.
