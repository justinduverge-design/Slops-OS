#!/usr/bin/env node
/**
 * SLOPS Truth Gate
 *
 * Checks that the documentation layer agrees with itself and with disk.
 * Read-only. Never edits, moves, or deletes anything.
 *
 *   node Blueprints/tools/truth-gate/truth-gate.mjs            # all checks
 *   node Blueprints/tools/truth-gate/truth-gate.mjs --check=dead-header
 *   node Blueprints/tools/truth-gate/truth-gate.mjs --json
 *   node Blueprints/tools/truth-gate/truth-gate.mjs --quiet    # P0 only
 *
 * Exit 0 = no P0 findings. Exit 1 = at least one P0. Exit 2 = gate itself failed.
 *
 * Severity contract:
 *   P0 — an agent reading current docs would act on false information.
 *   P1 — drift that will become P0 if ignored.
 *   P2 — hygiene.
 */

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative, dirname, resolve, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(process.argv.find(a => a.startsWith('--root='))?.slice(7) ?? '.');
const JSON_OUT = process.argv.includes('--json');
const QUIET = process.argv.includes('--quiet');
const ONLY = process.argv.find(a => a.startsWith('--check='))?.slice(8) ?? null;

/* ---------------------------------------------------------------- config -- */

const LAYERS = [
  { id: 'L0', name: 'SLOPS OS',     root: '.' },
  { id: 'L1', name: 'Slops Saloon', root: 'slops-saloon' },
  { id: 'L2', name: 'Omen',         root: join('slops-saloon', 'omen') },
];

// Baseline entry files each layer root must expose (DBS_INDEX.md contract).
// `context.md` was removed from this set on 2026-08-05 — the L0 copy was a
// legacy snapshot and Direction/facts-of-record.md is the real entry point.
const BASELINE_FILES = ['DBS_INDEX.md', 'README.md', 'AGENTS.md', 'CLAUDE.md'];

// Directories that are never doctrine.
const SKIP_DIRS = new Set([
  '.git', 'node_modules', '.claude-worktrees', '.codex-worktrees',
  'Archive', 'archive', 'graphify-out', '_scratch', 'dist', 'build',
  'coverage', '.next', 'screenshots', 'logos',
]);

// A file whose header matches this is claiming it is not current truth.
const DEAD_HEADER = /\b(HISTORICAL|SUPERSEDED|DEPRECATED|RETIRED|OBSOLETE)\b|status:\s*(legacy|superseded|historical|deprecated)|legacy orientation snapshot|not current authority|no longer (current|authoritative)|do not (run|re-run|execute)\b/i;
const DEAD_HEADER_LINES = 12;

// "PARTIALLY superseded" means part of the file is still authority — not dead.
const PARTIAL = /\bpartial(ly)?\b/i;

/* ----------------------------------------------------------------- utils -- */

/**
 * Suppressions live in truth-gate-ignore.txt next to this script:
 *   <check-or-*> | <path prefix> | <reason>
 * Every suppression needs a reason. Blank lines and `#` comments are skipped.
 */
function loadIgnores() {
  const p = join(ROOT, 'Blueprints', 'tools', 'truth-gate', 'truth-gate-ignore.txt');
  if (!existsSync(p)) return [];
  return readFileSync(p, 'utf8').split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'))
    .map(l => {
      const [check, prefix, reason] = l.split('|').map(s => (s ?? '').trim());
      return { check, prefix: prefix.split(/[\\/]/).join('/'), reason };
    })
    .filter(r => r.check && r.prefix);
}

const IGNORES = loadIgnores();
const suppressed = [];

const findings = [];
const add = (severity, check, file, message, detail) => {
  const f = file.split(sep).join('/');
  const hit = IGNORES.find(r => (r.check === '*' || r.check === check) && f.startsWith(r.prefix));
  if (hit) { suppressed.push({ check, file: f, reason: hit.reason }); return; }
  findings.push({ severity, check, file: f, message, detail });
};

async function walk(dir, out = []) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.name.startsWith('.') && e.name !== '.github') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      await walk(full, out);
    } else if (e.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

/** Every filename in the tree, for telling "missing file" from "stale path". */
async function collectBasenames(dir, out = new Set()) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name) || e.name === '.git' || e.name === 'node_modules') continue;
      await collectBasenames(join(dir, e.name), out);
    } else {
      out.add(e.name);
    }
  }
  return out;
}

/** True if the path is a file, or a directory containing at least one file. */
function hasAnyFile(p) {
  if (!existsSync(p)) return false;
  let st;
  try { st = statSync(p); } catch { return false; }
  if (!st.isDirectory()) return true;
  const stack = [p];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { continue; }
    for (const e of entries) {
      if (e.isDirectory()) stack.push(join(dir, e.name));
      else return true;
    }
  }
  return false;
}

const read = f => { try { return readFileSync(f, 'utf8'); } catch { return ''; } };
const rel = f => relative(ROOT, f);

function git(args, cwd) {
  try {
    return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch { return null; }
}

/* ---------------------------------------------------------------- checks -- */

/** P0 — files that declare themselves dead but still sit in the live tree. */
function checkDeadHeader(files) {
  for (const f of files) {
    const head = read(f).split('\n').slice(0, DEAD_HEADER_LINES);
    for (let i = 0; i < head.length; i++) {
      const line = head[i];
      // Only count a banner-shaped line: blockquote, bold, or a status: key.
      if (!/^\s*(>|\*\*|#{1,3}\s*\**\s*(status|⚠)|status:|---)/i.test(line)) continue;
      if (!DEAD_HEADER.test(line)) continue;
      const severity = PARTIAL.test(line) ? 'P2' : 'P0';
      const note = severity === 'P2'
        ? 'partially superseded — some content still authoritative, review before removing'
        : 'file declares itself non-authoritative but is still in the live tree';
      add(severity, 'dead-header', rel(f), note, `line ${i + 1}: ${line.trim().slice(0, 160)}`);
      break;
    }
  }
}

/**
 * P0 — a doc cites a path whose file exists nowhere in the repo.
 * P1 — the file exists, but not where the doc says it does (stale path).
 *
 * A bare backticked filename (`AGENT_INDEX.md`) is prose, not a path claim, so
 * only multi-segment strings are treated as citations.
 */
function checkBrokenPaths(files, basenames) {
  const MD_LINK = /\[[^\]]*\]\(([^)\s#]+)/g;
  const TICKED = /`([A-Za-z0-9_.-]+(?:[\\/][A-Za-z0-9_.-]+)+\.(?:md|mjs|cjs|js|json|ya?ml|toml|sql|sh))`/g;
  const EXTERNAL = /^(https?:|mailto:|#|<)/i;

  for (const f of files) {
    const body = read(f);
    const seen = new Set();
    for (const re of [MD_LINK, TICKED]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(body)) !== null) {
        const p = m[1].trim();
        if (!p || EXTERNAL.test(p) || seen.has(p)) continue;
        seen.add(p);
        // Placeholders, globs, and template vars are not real citations.
        if (/[<>*{}]|\.\.\.|\$\{/.test(p)) continue;
        // Multi-segment only — a bare filename in prose is a reference, not a path.
        if (!/[\\/]/.test(p)) continue;

        const norm = p.split(/[\\/]/).join(sep);
        const candidates = [
          join(dirname(f), norm),
          join(ROOT, norm),
          ...LAYERS.map(l => join(ROOT, l.root, norm)),
        ];
        if (candidates.some(c => existsSync(c))) continue;

        const base = norm.split(sep).pop();
        if (basenames.has(base)) {
          add('P1', 'stale-path', rel(f), `cites ${p}, which does not resolve`,
              `a file named ${base} exists elsewhere — the path is stale, not the file`);
        } else {
          add('P0', 'broken-path', rel(f), `cites a path that does not exist: ${p}`,
              'no file of that name exists anywhere in the tree');
        }
      }
    }
  }
}

/** P0 — a layer root is missing a required baseline entry file. */
function checkBaseline() {
  for (const layer of LAYERS) {
    const base = join(ROOT, layer.root);
    if (!existsSync(base)) {
      add('P1', 'baseline', layer.root, `layer ${layer.id} (${layer.name}) root does not exist`);
      continue;
    }
    for (const bf of BASELINE_FILES) {
      if (!existsSync(join(base, bf))) {
        add('P0', 'baseline', join(layer.root, bf),
            `${layer.id} is missing required baseline entry file ${bf}`,
            'agents starting in this layer have no defined entry point');
      }
    }
  }
}

/** P0 — sprint claims work is unmerged when the named commit is already in main. */
function checkSprintGitDrift() {
  const omen = join(ROOT, 'slops-saloon', 'omen');
  const sprint = join(omen, 'Direction', 'current_sprint.md');
  if (!existsSync(sprint) || !existsSync(join(omen, '.git'))) return;

  const lines = read(sprint).split('\n');
  const NEGATIVE = /\bnot (pushed|merged|deployed)\b/i;
  const SHA = /\bcommit\s+`?([0-9a-f]{7,40})`?/i;

  // This repo squash-merges, so the branch commit never lands on main and a
  // SHA-ancestry test always says "unmerged". Compare commit subjects instead.
  const mainSubjects = (git(['log', '--format=%s', '-400', 'HEAD'], omen) ?? '').split('\n');
  const norm = s => s.toLowerCase().replace(/\(#\d+\)/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const mainNorm = mainSubjects.map(norm).filter(Boolean);

  let item = '(unknown item)';
  lines.forEach((line, i) => {
    const h = line.match(/^#{3,4}\s+(.+)$/);
    if (h) item = h[1].trim();
    if (!NEGATIVE.test(line)) return;
    const sha = line.match(SHA)?.[1];
    if (!sha) return;

    // Direct ancestry (non-squash merges).
    if (git(['merge-base', '--is-ancestor', sha, 'HEAD'], omen) !== null) {
      add('P0', 'sprint-git-drift', 'slops-saloon/omen/Direction/current_sprint.md',
          `"${item}" is marked not-merged but commit ${sha} is reachable from HEAD`,
          `line ${i + 1} — an agent would redo shipped work`);
      return;
    }

    // Squash merges: does the branch commit's subject appear on main?
    const subject = git(['log', '--format=%s', '-1', sha], omen);
    if (!subject) return; // commit is gone; nothing provable
    const s = norm(subject);
    if (s && mainNorm.some(m => m === s || (s.length > 15 && m.includes(s)))) {
      add('P0', 'sprint-git-drift', 'slops-saloon/omen/Direction/current_sprint.md',
          `"${item}" is marked not-merged but its commit subject is already on main`,
          `line ${i + 1} — "${subject.slice(0, 70)}" appears in main's history (squash-merged)`);
      return;
    }

    // A squash merge can reword the subject past recognition. Second signal:
    // the branch named in the status line no longer exists. Branches are
    // deleted on merge here, so a missing branch means it almost certainly
    // landed — but a reworded subject makes it unprovable, hence P1.
    const branch = line.match(/branch\s+`([^`]+)`/)?.[1];
    if (branch && !git(['rev-parse', '--verify', `refs/heads/${branch}`], omen)
               && !git(['rev-parse', '--verify', `refs/remotes/origin/${branch}`], omen)) {
      add('P1', 'sprint-git-drift', 'slops-saloon/omen/Direction/current_sprint.md',
          `"${item}" is marked not-merged but branch "${branch}" no longer exists`,
          `line ${i + 1} — branch deleted; likely squash-merged with a reworded subject. Verify against the PR list and close it.`);
    }
  });
}

/** P1 — on-disk skills/agents that no index knows about, and vice versa. */
async function checkRegistryDrift() {
  const checks = [
    {
      label: 'skill',
      dir: join(ROOT, 'Blueprints', 'skills'),
      index: join(ROOT, 'Blueprints', 'skills', 'SKILL_ROUTING.md'),
      names: async d => (await readdir(d, { withFileTypes: true }))
        .filter(e => e.isDirectory() && !e.name.startsWith('_'))
        .filter(e => existsSync(join(d, e.name, 'SKILL.md')))
        .map(e => e.name),
    },
    {
      label: 'agent',
      dir: join(ROOT, 'Blueprints', 'agents'),
      index: join(ROOT, 'Blueprints', 'agents', 'AGENT_INDEX.md'),
      names: async d => {
        const out = [];
        for (const e of await readdir(d, { withFileTypes: true })) {
          if (!e.isDirectory() || e.name.startsWith('_')) continue;
          for (const f of await readdir(join(d, e.name))) {
            if (f.endsWith('.md') && f !== 'README.md') out.push(f.replace(/\.md$/, ''));
          }
        }
        return out;
      },
    },
  ];

  for (const c of checks) {
    if (!existsSync(c.dir) || !existsSync(c.index)) continue;
    const body = read(c.index);
    let names;
    try { names = await c.names(c.dir); } catch { continue; }
    for (const n of names) {
      if (!body.includes(n)) {
        add('P1', 'registry-drift', rel(c.index),
            `${c.label} "${n}" exists on disk but is absent from the index`,
            'an agent resolving authority from the index cannot see it');
      }
    }
  }
}

/** P2 — files referencing a directory that was deleted. */
function checkDanglingTreeRefs(files) {
  const GONE = ['Blueprints/agents/_imported', 'Blueprints\\agents\\_imported'];
  const reported = new Set();
  for (const g of GONE) {
    const norm = g.split(/[\\/]/).join(sep);
    // `git rm` deletes files but leaves the directory skeleton, so an
    // existsSync test would report a fully-emptied tree as still present.
    if (hasAnyFile(join(ROOT, norm))) continue; // still real, nothing to flag
    for (const f of files) {
      if (reported.has(f)) continue; // a file citing both separator styles is one finding
      // A line that names the tree *in order to say it is gone* is the fix,
      // not the problem. Only flag lines that still treat it as live.
      const live = read(f).split('\n').filter(l =>
        l.includes(g) && !/\b(deleted|retired|removed|no longer|none exist|there is no|was deleted)\b/i.test(l));
      if (!live.length) continue;
      reported.add(f);
      add('P1', 'dangling-tree-ref', rel(f),
          `references removed tree "${g}" as if it still exists`,
          `e.g. "${live[0].trim().slice(0, 110)}"`);
    }
  }
}

/* ------------------------------------------------------------------- run -- */

const files = await walk(ROOT);
const basenames = await collectBasenames(ROOT);

const CHECKS = {
  'dead-header':       f => checkDeadHeader(f),
  'broken-path':       f => checkBrokenPaths(f, basenames),
  'baseline':          () => checkBaseline(),
  'sprint-git-drift':  () => checkSprintGitDrift(),
  'registry-drift':    () => checkRegistryDrift(),
  'dangling-tree-ref': f => checkDanglingTreeRefs(f),
};

if (ONLY && !CHECKS[ONLY]) {
  console.error(`unknown check "${ONLY}". available: ${Object.keys(CHECKS).join(', ')}`);
  process.exit(2);
}

for (const [name, fn] of Object.entries(CHECKS)) {
  if (ONLY && name !== ONLY) continue;
  await fn(files);
}

/* ---------------------------------------------------------------- report -- */

const RANK = { P0: 0, P1: 1, P2: 2 };
findings.sort((a, b) => RANK[a.severity] - RANK[b.severity] || a.check.localeCompare(b.check) || a.file.localeCompare(b.file));

const counts = findings.reduce((m, f) => ((m[f.severity] = (m[f.severity] ?? 0) + 1), m), {});
const p0 = counts.P0 ?? 0;

if (JSON_OUT) {
  console.log(JSON.stringify({ scanned: files.length, counts, findings }, null, 2));
} else {
  const shown = QUIET ? findings.filter(f => f.severity === 'P0') : findings;
  let lastCheck = null;
  for (const f of shown) {
    if (f.check !== lastCheck) { console.log(`\n── ${f.check} ──`); lastCheck = f.check; }
    console.log(`${f.severity}  ${f.file}`);
    console.log(`    ${f.message}`);
    if (f.detail) console.log(`    ${f.detail}`);
  }
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`scanned ${files.length} markdown files`);
  console.log(`P0 ${counts.P0 ?? 0}   P1 ${counts.P1 ?? 0}   P2 ${counts.P2 ?? 0}   (${suppressed.length} suppressed)`);
  console.log(p0 === 0 ? 'TRUTH GATE: PASS' : `TRUTH GATE: FAIL — ${p0} P0 finding(s)`);
}

process.exit(p0 === 0 ? 0 : 1);
