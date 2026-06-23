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
