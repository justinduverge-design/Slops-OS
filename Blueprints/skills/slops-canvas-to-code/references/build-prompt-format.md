# Build prompt format

The contract plus a self-check. The checklist is the mechanism — it converts
"match the design" into something the agent can verify before submitting.

---

Build `<Screen>` for `<platform>` against the contract at `<path>`.

**Read first:** the contract, `component-lock-v1.md`, `team-theme-contract-v1.md`.
Do not open the artboard — the contract is the specification. If the contract and the
artboard disagree, that is a contract bug: **stop and report it.**

**Rules**

- Use locked components and tokens. No hardcoded colours, sizes, or spacing where a
  token exists.
- Build every element in the checklist. **An element you cannot build as specified is
  reported, not omitted.** A missing element is the failure this process exists to stop.
- Do not add elements the contract does not list.
- Do not redesign. A better idea goes to the founder as a note, not into the build.

**Acceptance checklist — every box must be checked before submitting**

- [ ] E1 — <full element spec, one line, including icon name and size>
- [ ] E2 — <...>

**Screen-level**

- [ ] Navigation entry and every exit behave as contracted
- [ ] Safe area handled as contracted
- [ ] Empty and loading states render as contracted
- [ ] No hardcoded values where a token exists
- [ ] Element count in the build equals <N>

**Report back:** boxes checked, any element reported rather than built and why, and any
contract line found ambiguous. **Ambiguity is a contract defect worth reporting — that is
how the contract gets better instead of the build getting worse.**
