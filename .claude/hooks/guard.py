#!/usr/bin/env python3
"""PreToolUse guard: blocks raw merges, pushes to main, force pushes, skipped hooks, secret reads and
production commands. Exit 2 blocks the call and shows the reason to the agent (code.claude.com/docs/en/hooks).

Why: rules/base.md -> "Guards". Commands are split into segments and tokens (shlex), so `git -C x push`,
`git push origin feat:main`, `gh pr -R o/r merge` and `cmd;git push origin main` are all seen, while a
commit message or a search pattern that merely mentions `.env` or `--no-verify` is not.
Fails closed: input it cannot read blocks the call (STANDARDS card G). Stdlib only.
For Valor-Core this is the only barrier: the repo is private on GitHub's free plan, where branch
protection is unavailable (the API answers 403 "Upgrade to GitHub Pro").
"""
import json
import os
import re
import shlex
import subprocess
import sys

SECRET = re.compile(
    r"(^|[\s'\"=/<:])\.env(rc)?(\.(?!example\b|sample\b|template\b)[\w.-]+)?(?=$|[\s'\";|&)*>])"   # .env, .env.local, .envrc, .env*
    r"|\.config/valor-core|\.codex/auth\.json|\.claude/\.credentials|\.netrc\b"
    r"|\.(p8|p12|jks|keystore|mobileprovision)\b|key\.pem\b|privkey|\.key(?=$|[\s'\";|&)])"
    r"|\.ssh/id_[\w-]+(?!\.pub)\b"
    r"|\binfisical +(secrets|export)\b",
    re.I,
)
PROD = re.compile(r"\bsupabase +db +(push|reset)\b|\bpsql\b.*(prod|supabase\.co)|docker +compose\b.*hostinger"
                  r"|\b(ssh|scp|rsync|sftp)\b.*\b(omen-prod|kvm1)\b")
PROTECTED = {"main", "master"}
PATH_TOOLS = {"Read", "Edit", "Write", "MultiEdit", "NotebookEdit"}
SEARCH_TOOLS = {"Grep", "Glob"}   # their `pattern` is search text, not a path


def block(why):
    print(f"blocked: {why}", file=sys.stderr)
    sys.exit(2)


def segments(cmd):
    """Token lists, one per simple command. Quote-aware: text inside quotes (a PR body, a commit message,
    a heredoc in "$(...)") stays inside its token and is never split into commands."""
    lex = shlex.shlex(cmd, posix=True, punctuation_chars=";&|()\n")
    lex.whitespace = " \t\r"
    lex.whitespace_split = True
    seg = []
    try:
        for tok in lex:
            if tok and set(tok) <= set(";&|()\n"):
                if seg:
                    yield seg
                seg = []
            else:
                seg.append(tok)
    except ValueError:   # unbalanced quotes: fall back to a plain split, which errs toward blocking
        yield from (p.split() for p in re.split(r"[;&|\n()]+", cmd) if p.split())
        return
    if seg:
        yield seg


def words_after(toks, name):
    """Tokens after the program `name` (matched by basename, so /opt/homebrew/bin/gh counts)."""
    for i, t in enumerate(toks):
        if os.path.basename(t) == name:
            return toks[i + 1:]
    return None


def short_flags(toks):
    return {c for t in toks if re.fullmatch(r"-[A-Za-z]+", t) for c in t[1:]}


def current_branch(cwd, args):
    """The branch a bare `git push` would push, or None if it can't be told."""
    d = args[args.index("-C") + 1] if "-C" in args[:-1] else cwd
    try:
        r = subprocess.run(["git", "-C", d or ".", "symbolic-ref", "--short", "-q", "HEAD"],
                           capture_output=True, text=True, timeout=5)
    except (OSError, subprocess.SubprocessError):
        return None
    return r.stdout.strip() if r.returncode == 0 else None


def check_git(args, cwd=None):
    sub = next((a for a in args if a in ("push", "commit", "merge", "rebase", "cherry-pick", "am")), None)
    if "--no-verify" in args or (sub == "commit" and "n" in short_flags(args[args.index(sub) + 1:])):
        block("no --no-verify (or -n): fix the failing check instead")
    if sub != "push":
        return
    rest = args[args.index("push") + 1:]
    if any(a in ("--force", "--mirror", "--all") or a.startswith(("--force-with-lease", "--force-if-includes")) for a in rest) \
            or "f" in short_flags(rest):
        block("no force-push, --mirror or --all; push one branch and fix forward")
    refs = [a for a in rest if not a.startswith("-")][1:]   # the first non-flag is the remote
    if not refs or any(r.split(":")[-1] in ("HEAD", "@") for r in refs):
        branch = current_branch(cwd, args)
        if branch is None or branch in PROTECTED or branch == "HEAD":
            block(f"a bare push from {branch or 'an unknown branch'} would push main; name a branch: git push -u origin <branch>")
    for a in refs:
        dst = a.split(":")[-1].lstrip("+").removeprefix("refs/heads/")
        if a.startswith("+"):
            block("no force-push (+refspec); fix forward")
        if dst in PROTECTED:
            block("no pushes to main or master: push a branch and open a PR (Omen main deploys to production)")


def check_bash(cmd, cwd=None):
    if PROD.search(cmd):
        block("production, SQL apply and deploys are Justin's; propose the exact command instead")
    if re.search(r"pulls/[^/\s]+/merge\b|mergePullRequest|enablePullRequestAutoMerge", cmd):
        block("no merging through the API; use the merger")
    for toks in segments(cmd):
        gh = words_after(toks, "gh")
        if gh is not None and "pr" in gh and "merge" in gh[gh.index("pr") + 1:]:
            block("merge only with ops/merge <PR>; it checks the class (rules/base.md) and waits for every check")
        git = words_after(toks, "git")
        if git is not None:
            check_git(git, cwd)
        if "merge-pr.sh" in " ".join(toks) and "--justin" in toks:
            block("--justin is the founder's flag; agents merge only agent-class PRs")
        if toks[0] in ("env", "printenv", "set", "export") and len(toks) == 1 or toks[-2:] == ["--", "env"]:
            block("no dumping the environment; it holds secrets at run time")
        # a commit message is text, not a file read
        text = toks
        if git is not None and "commit" in git:
            text = [t for i, t in enumerate(toks) if not (i and re.fullmatch(r"-[A-Za-z]*m|--message", toks[i - 1]))
                    and not t.startswith("--message=")]
        if words_after(toks, "gh") is not None:   # PR and issue bodies are text
            text = [t for i, t in enumerate(toks) if not (i and toks[i - 1] in ("--body", "-b", "--title", "-t"))]
        if SECRET.search(" " + " ".join(text)):
            block("secret files are never read, printed or staged; secrets come from Infisical at run time")


def check(event):
    tool, args = event.get("tool_name", ""), event.get("tool_input") or {}
    if tool == "Bash":
        cmd = args.get("command")
        if not isinstance(cmd, str):
            block("guard could not read the command; fix the hook input before running commands")
        check_bash(cmd, event.get("cwd"))
    elif tool in PATH_TOOLS or tool in SEARCH_TOOLS:
        keys = ("path", "glob") if tool in SEARCH_TOOLS else ("file_path", "path", "notebook_path")
        target = " ".join(str(args.get(k, "")) for k in keys)
        if SECRET.search(" " + target):
            block("secret files are never read or written by agents; secrets come from Infisical at run time")


if __name__ == "__main__":
    try:
        event = json.load(sys.stdin)
    except Exception:
        block("guard could not parse its input; failing closed")
    check(event)
    sys.exit(0)
