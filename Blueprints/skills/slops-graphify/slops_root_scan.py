"""SLOPS-root mode runner for slops-graphify.

The vanilla `graphify update <SLOPS-root>` honours the L0 `.gitignore`, which
deliberately excludes nested git repos (notably `slops-saloon/omen/`). That
respects git boundaries — and produces a graph with zero cross-layer edges,
which defeats the whole point of a cross-layer scan.

This runner is the "slops way of graphify": when invoked at the SLOPS root,
it treats the L0/L1/L2 nested repos as one logical tree for **extraction
only**. No git operations are issued against the nested repos; the only thing
that changes is which directory names the walker is allowed to descend into.

Default graphify behaviour is unchanged for any other invocation site —
nested-repo recursion stays strictly opt-in. The detection is conservative:
SLOPS-root mode is only auto-enabled when the scan path contains BOTH
`slops-saloon/` and `References/graphify/`. Anywhere else you have to pass
`--include-nested-repos` explicitly.

CRITICAL: Do not use `--include-nested-repos` against an unrelated parent
repo. It deliberately ignores the standard git boundary and will pull
sibling-project source files into a single graph if you point it at, say,
your generic `~/dev/` or `~/code/` folder.

Usage:
    python -m Blueprints.skills.slops-graphify.slops_root_scan [PATH] \
        [--include-nested-repos] [--force]

If PATH is omitted, walks up from cwd looking for the SLOPS root signature
(`slops-saloon/` + `References/graphify/`).
"""

from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path


# ---------- SLOPS-root detection ---------------------------------------------

_SLOPS_ROOT_SIGNATURE = ("slops-saloon", "References/graphify")


def is_slops_root(path: Path) -> bool:
    """A path is the SLOPS root iff it contains slops-saloon/ and References/graphify/."""
    path = path.resolve()
    return all((path / p).exists() for p in _SLOPS_ROOT_SIGNATURE)


def find_slops_root(start: Path) -> Path | None:
    """Walk upward from start; return the first dir matching the SLOPS root signature."""
    current = start.resolve()
    home = Path.home()
    while True:
        if is_slops_root(current):
            return current
        parent = current.parent
        if parent == current or current == home:
            return None
        current = parent


def list_nested_repo_dirs(root: Path) -> list[Path]:
    """Return all directories under root that are themselves git repos.

    A directory is a nested repo iff it contains a `.git` (file or directory).
    The scan root itself is excluded — we only care about repos *below* it.
    Used to decide which .gitignore exclusions to neutralise.
    """
    nested: list[Path] = []
    root = root.resolve()
    # Cheap two-level deep search — SLOPS only nests one or two layers in practice.
    candidates: list[Path] = []
    if (root / "slops-saloon").exists():
        candidates.append(root / "slops-saloon")
        for child in (root / "slops-saloon").iterdir():
            if child.is_dir():
                candidates.append(child)
    for c in candidates:
        if (c / ".git").exists():
            nested.append(c)
    return nested


# ---------- Ignore-list rewriter ---------------------------------------------

def _patch_graphify_ignore_loader(root: Path, nested_dirs: list[Path]) -> None:
    """Monkey-patch graphify.detect._load_graphifyignore to drop nested-repo exclusions.

    The L0 .gitignore intentionally lists nested repos (slops-saloon/omen/,
    ssffmvp/, etc.) so git doesn't track app source from the SLOPS root.
    For graphify's read-only extraction those exclusions are exactly wrong —
    they cut the cross-layer edges we built this skill to surface.

    We don't mutate the .gitignore on disk. We wrap the loader so that, only
    for this in-process run, any ignore pattern resolving to a directory we
    identified as a nested git repo is dropped.
    """
    from graphify import detect

    original = detect._load_graphifyignore
    nested_rel: set[str] = set()
    for d in nested_dirs:
        try:
            rel = str(d.resolve().relative_to(root.resolve())).replace("\\", "/")
            nested_rel.add(rel.rstrip("/"))
            nested_rel.add(rel.rstrip("/") + "/")
        except ValueError:
            pass

    def patched(r: Path):
        patterns = original(r)
        filtered = []
        for anchor, pattern in patterns:
            # Normalise: a pattern like "slops-saloon/omen/" should match our
            # recorded nested-repo relpath set. Leading "/" anchors at the
            # repo root which is what gitignore does.
            norm = pattern.lstrip("/").rstrip("/")
            if norm in {p.rstrip("/") for p in nested_rel}:
                # Drop — this is a nested-repo exclusion the SLOPS-root mode
                # deliberately overrides.
                continue
            filtered.append((anchor, pattern))
        return filtered

    detect._load_graphifyignore = patched


# ---------- Markdown-link enrichment -----------------------------------------

_MD_LINK_RE = None  # lazy-compiled
_MD_BACKTICK_RE = None  # lazy-compiled — captures `path/like/this.md` mentions


def _enrich_markdown_links(graph_path: Path, scan_root: Path) -> int:
    """Add cross-file edges from markdown links the upstream extractor misses.

    graphify's deterministic markdown extractor surfaces in-doc structure
    (headings → sections) but does NOT emit edges for inline `[text](path)`
    links pointing at other documents. For the cross-layer scan that's the
    whole signal — `omen/CLAUDE.md` references `../../Blueprints/...` and we
    want those to land as L2→L0 edges in the graph.

    This pass is purely structural and deterministic: regex-extract every
    markdown link to a relative path, resolve it against the markdown file's
    directory, and if the target resolves to a markdown file that already
    has a node in the graph, add a `references` edge from the source file's
    document node to the target's. No LLM calls, no token cost.

    Returns the number of edges added. Skips any link whose target doesn't
    resolve to a file currently in the graph (out-of-scope, broken link,
    code path, etc.).
    """
    import json
    import re

    global _MD_LINK_RE, _MD_BACKTICK_RE
    if _MD_LINK_RE is None:
        # [text](path)  — capture path only, allow inline title in quotes
        _MD_LINK_RE = re.compile(r"\[[^\]]*\]\(([^)\s#]+)(?:#[^)\s]*)?(?:\s+\"[^\"]*\")?\)")
    if _MD_BACKTICK_RE is None:
        # `path/like/this.md` — backtick-quoted relative markdown reference.
        # Many SLOPS docs (e.g. omen/CLAUDE.md) quote paths in inline code,
        # which the markdown-link regex above does not match.
        _MD_BACKTICK_RE = re.compile(r"`([^`\s]+\.md)`")

    with graph_path.open("r", encoding="utf-8") as f:
        graph = json.load(f)

    nodes = graph["nodes"]
    links = graph["links"]

    # Index document nodes by their source_file (the top-level file node for
    # each markdown). The top-level node is the one whose label equals the
    # filename (e.g. 'CLAUDE.md').
    file_to_id: dict[str, str] = {}
    for n in nodes:
        sf = (n.get("source_file") or "").replace("\\", "/")
        if not sf:
            continue
        # Top-level file node: label matches the basename, file_type=='document'
        if n.get("file_type") == "document":
            label = n.get("label", "")
            if label and (label == sf.rsplit("/", 1)[-1] or label == sf):
                # Prefer earliest seen — graphify writes the canonical file node first.
                file_to_id.setdefault(sf, n["id"])

    existing_edges: set[tuple[str, str, str]] = set()
    for e in links:
        existing_edges.add((e["source"], e["target"], e.get("relation", "")))

    added = 0
    for sf, node_id in file_to_id.items():
        if not sf.lower().endswith(".md"):
            continue
        abs_path = scan_root / sf
        if not abs_path.exists():
            continue
        try:
            text = abs_path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        src_dir = abs_path.parent
        scan_abs = scan_root.resolve()
        # Collect all candidate paths from both link forms.
        candidates: list[str] = []
        for match in _MD_LINK_RE.finditer(text):
            raw = match.group(1).strip()
            if raw and not raw.startswith(("http://", "https://", "mailto:", "#", "<")):
                candidates.append(raw.split("?", 1)[0])
        for match in _MD_BACKTICK_RE.finditer(text):
            candidates.append(match.group(1).strip())

        for raw in candidates:
            if not raw.lower().endswith(".md"):
                continue
            # Try resolving relative to the source-file's directory first,
            # then against the scan root (handles bare `Blueprints/x.md`
            # references that the author meant as L0-rooted, not file-relative).
            target_id = None
            for base in (src_dir, scan_abs):
                try:
                    resolved = (base / raw).resolve()
                    rel = resolved.relative_to(scan_abs)
                except (OSError, ValueError):
                    continue
                rel_key = str(rel).replace("\\", "/")
                tid = file_to_id.get(rel_key)
                if tid:
                    target_id = tid
                    break
            if not target_id or target_id == node_id:
                continue
            key = (node_id, target_id, "references")
            if key in existing_edges:
                continue
            existing_edges.add(key)
            links.append({
                "source": node_id,
                "target": target_id,
                "relation": "references",
                "confidence": "EXTRACTED",
                "confidence_score": 1.0,
                "weight": 1.0,
                "source_file": sf,
                "_origin": "slops_root_scan.md_link",
            })
            added += 1

    if added:
        with graph_path.open("w", encoding="utf-8") as f:
            json.dump(graph, f, ensure_ascii=False)

    return added


# ---------- Main -------------------------------------------------------------

def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="slops-graphify slops-root-scan",
        description="Run graphify across L0+L1+L2 as one logical tree.",
    )
    parser.add_argument("path", nargs="?", default=None,
                        help="Scan root. Defaults to the discovered SLOPS root.")
    parser.add_argument("--include-nested-repos", action="store_true",
                        help="Force SLOPS-root mode regardless of auto-detect.")
    parser.add_argument("--force", action="store_true",
                        help="Pass --force to graphify (overwrite even if node count drops).")
    parser.add_argument("--no-cluster", action="store_true",
                        help="Skip community detection (faster smoke).")
    parser.add_argument("--no-publish", action="store_true",
                        help="Do not copy result into References/graphify/graphify-out/.")
    args = parser.parse_args(argv)

    if args.path:
        scan_root = Path(args.path).resolve()
    else:
        discovered = find_slops_root(Path.cwd())
        if discovered is None:
            print("error: not under a SLOPS root (no slops-saloon/ + References/graphify/ found).",
                  file=sys.stderr)
            return 2
        scan_root = discovered

    auto = is_slops_root(scan_root)
    nested_mode = args.include_nested_repos or auto
    if not nested_mode:
        print(f"error: {scan_root} does not match the SLOPS-root signature. "
              f"Pass --include-nested-repos to override (DO NOT do this on an "
              f"unrelated parent repo).", file=sys.stderr)
        return 2

    nested = list_nested_repo_dirs(scan_root)
    print(f"[slops-graphify] scan root: {scan_root}")
    print(f"[slops-graphify] SLOPS-root mode: {'auto' if auto else 'forced'}")
    print(f"[slops-graphify] nested repos detected: {[str(p.relative_to(scan_root)) for p in nested]}")

    if nested:
        _patch_graphify_ignore_loader(scan_root, nested)
        print(f"[slops-graphify] ignore loader patched — nested-repo exclusions neutralised for this run")

    # Defer import until after the monkey-patch is installed so the rebuild sees it.
    from graphify.watch import _rebuild_code

    print(f"[slops-graphify] running graphify rebuild...")
    ok = _rebuild_code(
        scan_root,
        force=args.force,
        no_cluster=args.no_cluster,
        block_on_lock=True,
    )
    if not ok:
        print("[slops-graphify] rebuild failed.", file=sys.stderr)
        return 1

    src = scan_root / "graphify-out" / "graph.json"
    if not src.exists():
        print(f"[slops-graphify] expected output missing: {src}", file=sys.stderr)
        return 1

    if nested_mode:
        added = _enrich_markdown_links(src, scan_root)
        print(f"[slops-graphify] markdown-link enrichment: +{added} cross-file edges")

    if args.no_publish:
        print(f"[slops-graphify] done. Graph at {src}")
        return 0

    dst_dir = scan_root / "References" / "graphify" / "graphify-out"
    dst_dir.mkdir(parents=True, exist_ok=True)
    dst = dst_dir / "graph.json"
    if dst.exists():
        backup = dst.with_suffix(".json.bak")
        shutil.copy2(dst, backup)
        print(f"[slops-graphify] prior canonical graph backed up to {backup.name}")
    shutil.copy2(src, dst)
    report_src = scan_root / "graphify-out" / "GRAPH_REPORT.md"
    if report_src.exists():
        shutil.copy2(report_src, dst_dir / "GRAPH_REPORT.md")
    print(f"[slops-graphify] published canonical graph to {dst}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
