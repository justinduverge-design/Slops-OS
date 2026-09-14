#!/usr/bin/env node
/**
 * SLOPS skill-deps — is the tool behind this wrapper actually here?
 *
 * `link-skills.mjs` makes a skill REACHABLE. This makes it HONEST. A wrapper whose
 * upstream tool is missing looks identical to one that works right up until you invoke
 * it, burn a session on it, and find out (X4-SkillReach closed reach; this closes state).
 *
 * It never installs anything. Installing is a founder boundary in every wrapper skill
 * and in `_template/SKILL.md` § "Install boundary"; this tool only ever reads and probes.
 *
 * Probing is LOCAL-ONLY. The single network probe kind (`http`) refuses any host that is
 * not loopback, so a dependency check can never become egress (facts-of-record #17).
 *
 * Usage
 *   node Blueprints/tools/skill-link/check-skill-deps.mjs             # report
 *   node Blueprints/tools/skill-link/check-skill-deps.mjs --check     # exit 1 if not all ready
 *   node Blueprints/tools/skill-link/check-skill-deps.mjs --json
 *   node Blueprints/tools/skill-link/check-skill-deps.mjs --skill=slops-taste
 *   node Blueprints/tools/skill-link/check-skill-deps.mjs --target=L0|L2|all
 *
 * Exit 0 = every checked skill ready (or has no external dependency).
 * Exit 1 = something needs install, or declares an upstream it never taught us to probe.
 * Exit 2 = gate failed (wrong directory, unreadable library).
 */
import { readdirSync, statSync, existsSync, readFileSync, realpathSync } from 'node:fs';
import { join, resolve, relative, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { get as httpGet } from 'node:http';

const ARGV = process.argv.slice(2);
const CHECK = ARGV.includes('--check');
const JSON_OUT = ARGV.includes('--json');
const ONLY = ARGV.find(a => a.startsWith('--skill='))?.slice(8) ?? null;
const TARGET = (ARGV.find(a => a.startsWith('--target='))?.slice(9) ?? 'all').toUpperCase();

const L0 = resolve(process.cwd());
const SRC = join(L0, 'Blueprints', 'skills');
const L2 = join(L0, 'slops-saloon', 'omen');

if (!existsSync(SRC)) {
  console.error(`skill-deps: no Blueprints/skills under ${L0} — run from the L0 repo root.`);
  process.exit(2);
}

/* ── discovery ───────────────────────────────────────────────────────────────
   Same rule as link-skills.mjs: a directory with a SKILL.md is a skill.        */

function discover(root, layerId) {
  if (!existsSync(root)) return [];
  return readdirSync(root)
    .filter(n => !n.startsWith('_') && !n.startsWith('.'))
    .filter(n => { try { return statSync(join(root, n)).isDirectory(); } catch { return false; } })
    .filter(n => existsSync(join(root, n, 'SKILL.md')))
    .map(n => ({ name: n, dir: join(root, n), file: join(root, n, 'SKILL.md'), layer: layerId }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

const skills = [];
if (TARGET === 'ALL' || TARGET === 'L0') skills.push(...discover(SRC, 'L0'));
if (TARGET === 'ALL' || TARGET === 'L2') skills.push(...discover(join(L2, 'Blueprints', 'skills'), 'L2'));

const selected = ONLY ? skills.filter(s => s.name === ONLY) : skills;
if (ONLY && !selected.length) {
  console.error(`skill-deps: no skill named ${ONLY}. Known: ${skills.map(s => s.name).join(', ')}`);
  process.exit(2);
}

/* ── frontmatter ─────────────────────────────────────────────────────────────
   Deliberately small. Enough for scalars, a `requires:` list of flat maps, and
   quoted values — not a YAML implementation. A field this reader cannot parse is
   reported as unreadable rather than silently skipped, because a dependency that
   parses to nothing is exactly the failure this tool exists to stop.            */

function frontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) return { fields: {}, requires: [], raw: '' };
  const body = m[1];
  const fields = {};
  const requires = [];
  let inRequires = false;
  let current = null;

  for (const rawLine of body.split(/\r?\n/)) {
    if (/^\s*#/.test(rawLine) || !rawLine.trim()) continue;

    if (inRequires) {
      const item = /^\s{2,}-\s+(.*)$/.exec(rawLine);
      if (item) {
        current = {};
        requires.push(current);
        const inline = kv(item[1]);
        if (inline) current[inline.k] = inline.v;
        continue;
      }
      const cont = /^\s{4,}(.*)$/.exec(rawLine);
      if (cont && current) {
        const pair = kv(cont[1]);
        if (pair) current[pair.k] = pair.v;
        continue;
      }
      inRequires = false; current = null;
    }

    if (/^requires:\s*$/.test(rawLine)) { inRequires = true; continue; }
    const pair = kv(rawLine);
    if (pair) fields[pair.k] = pair.v;
  }
  return { fields, requires, raw: body };
}

/** Structural hazards a lenient line reader survives and a real YAML parser does not. */
function yamlHazards(raw) {
  const out = [];
  raw.split(/\r?\n/).forEach((line, i) => {
    if (/^\s*#/.test(line) || !line.trim()) return;
    const m = /^\s*(?:-\s+)?[A-Za-z_][\w-]*\s*:\s*(.*)$/.exec(line);
    if (!m) return;
    const v = m[1].trim();
    if (!v || /^[>|]/.test(v)) return;              // block scalars are fine
    for (const q of ['"', "'"]) {
      if (v.startsWith(q) && !(v.endsWith(q) && v.length > 1)) {
        out.push(`line ${i + 2}: value opens with ${q} and never closes it`);
      }
    }
  });
  return out;
}

function kv(line) {
  const m = /^\s*([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
  if (!m) return null;
  let v = m[2].trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  return { k: m[1], v };
}

/* ── probes ──────────────────────────────────────────────────────────────────
   Each returns { ok, detail }. None of them installs, writes, or reaches a
   non-loopback host. A probe that throws is a MISS, never a pass.               */

const PROBES = {
  bin(spec) {
    try {
      const p = execFileSync('sh', ['-c', `command -v ${shq(spec.bin)}`], { encoding: 'utf8', timeout: 5000 }).trim();
      return p ? { ok: true, detail: p } : { ok: false, detail: 'not on PATH' };
    } catch { return { ok: false, detail: 'not on PATH' }; }
  },

  'python-module'(spec) {
    const py = spec.python ?? 'python3';
    try {
      const out = execFileSync(py, ['-c', `import ${spec['python-module']} as m, sys; print(getattr(m,"__version__","present"))`],
        { encoding: 'utf8', timeout: 20000, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
      return { ok: true, detail: `${py} → ${out}` };
    } catch (e) {
      const why = /No module named/.test(String(e.stderr ?? '')) ? 'module not installed' : `${py} probe failed`;
      return { ok: false, detail: why };
    }
  },

  // Resolve from a package root so a vendored dep is judged where the skill says it lives,
  // not wherever this script happens to sit.
  'node-module'(spec) {
    const root = resolve(L0, spec.from ?? '.');
    const p = join(root, 'node_modules', spec['node-module'], 'package.json');
    if (!existsSync(p)) return { ok: false, detail: `absent from ${relative(L0, root) || '.'}/node_modules` };
    try {
      const v = JSON.parse(readFileSync(p, 'utf8')).version;
      return { ok: true, detail: `${spec['node-module']}@${v} in ${relative(L0, root) || '.'}` };
    } catch { return { ok: true, detail: 'present (version unreadable)' }; }
  },

  path(spec) {
    const p = resolve(L0, spec.path);
    return existsSync(p) ? { ok: true, detail: relative(L0, p) } : { ok: false, detail: `no ${spec.path}` };
  },

  // A harness skill installed alongside ours (taste-skill's variants). `.claude/` is
  // gitignored and machine-local, so this is a per-machine answer by design.
  skill(spec) {
    const roots = [join(L0, '.claude', 'skills'), join(L2, '.claude', 'skills'),
      join(process.env.HOME ?? '', '.claude', 'skills')];
    for (const r of roots) {
      const p = join(r, spec.skill);
      if (!existsSync(p)) continue;
      // Our own linker points .claude/skills at Blueprints/skills. A wrapper is not its upstream.
      try {
        if (realpathSync(p).startsWith(realpathSync(SRC))) continue;
      } catch { /* fall through and count it */ }
      return { ok: true, detail: relative(L0, p) };
    }
    return { ok: false, detail: 'no installed skill by that name' };
  },

  // Loopback only. A dependency check must never become egress.
  http(spec) {
    let u;
    try { u = new URL(spec.http); } catch { return Promise.resolve({ ok: false, detail: 'unparseable url' }); }
    if (!['127.0.0.1', 'localhost', '::1', '[::1]'].includes(u.hostname)) {
      return Promise.resolve({ ok: false, detail: `REFUSED — ${u.hostname} is not loopback; probes never leave this machine` });
    }
    const deadline = Number(spec.timeout_ms ?? 1500);
    return new Promise(done => {
      let settled = false;
      const finish = r => { if (!settled) { settled = true; done(r); } };
      const req = httpGet(u, r => { r.resume(); finish({ ok: r.statusCode < 500, detail: `HTTP ${r.statusCode}` }); });
      req.on('error', e => finish({ ok: false, detail: `not answering (${e.code ?? 'error'})` }));
      req.setTimeout(deadline, () => { req.destroy(); finish({ ok: false, detail: 'timed out' }); });
    });
  },
};

function shq(s) { return `'${String(s).replace(/'/g, `'\\''`)}'`; }

function probeKind(spec) { return Object.keys(PROBES).find(k => k in spec) ?? null; }

/* ── inference ───────────────────────────────────────────────────────────────
   For a wrapper that has not yet been given a `requires:` block, read the prose
   Preconditions for an install command so the report can still name one. This is
   a HINT and is labelled as one. An inferred install line is never treated as a
   probe: a skill with no declared probe reports `undeclared`, which is a finding.
   The alternative — guessing a probe out of prose and reporting `ready` — would
   make this tool the thing it was built to catch.                               */

function inferInstall(text) {
  const sec = /\n##+ *Preconditions[^\n]*\n([\s\S]*?)(?=\n##+ |\n*$)/i.exec(text);
  if (!sec) return null;
  const body = sec[1];
  const fenced = /```(?:bash|sh|shell|text)?\n([\s\S]*?)```/.exec(body);
  if (fenced) {
    const line = fenced[1].split('\n').map(s => s.trim())
      .find(s => /^(npx|npm|pip3?|pipx|brew|uv|python3? -m pip|cargo|go) /.test(s));
    if (line) return line;
  }
  const inline = /`((?:npx|npm|pip3?|pipx|brew|uv|python3? -m pip|cargo|go) [^`]+)`/.exec(body);
  return inline ? inline[1].trim() : null;
}

/* ── evaluate ────────────────────────────────────────────────────────────────  */

const rows = [];
for (const s of selected) {
  let text;
  try { text = readFileSync(s.file, 'utf8'); }
  catch { rows.push({ ...meta(s), state: 'unreadable', deps: [], note: 'SKILL.md could not be read' }); continue; }

  const { fields, requires, raw: fmRaw } = frontmatter(text);

  // The harness parses this frontmatter as real YAML. THIS reader is line-based and deliberately
  // lenient, so it will happily read a block the harness rejects — and a rejected block means the
  // skill loses its `description`, which is what routing reads. It then silently stops being
  // suggested, showing only its folder name. Same failure class as a missing dependency: fine until
  // the moment you needed it. (Introduced exactly this way on 2026-09-14 with one unterminated
  // quote in a `note:`, and this tool did not notice — hence the check.)
  const malformed = yamlHazards(fmRaw);
  if (malformed.length || !(fields.description ?? '').trim()) {
    rows.push({ ...meta(s), state: 'unreadable', deps: [],
      note: malformed.length
        ? `frontmatter will not parse as YAML — ${malformed.join('; ')}. Routing reads \`description\` from it, so the skill becomes unroutable.`
        : 'frontmatter yields no `description` — routing reads that field, so this skill is unroutable.' });
    continue;
  }

  const upstream = (fields.upstream ?? '').trim();
  const status = (fields.status ?? '').trim() || 'unstated';
  const type = (fields.skill_type ?? '').trim() || 'unstated';
  const declaresUpstream = upstream && !/^none\b/i.test(upstream);

  // `upstream:` is overloaded — it carries both "the tool this fronts" and "where the
  // ideas came from". `skill_type` is the discriminator the template already defines:
  // a `wrapper` "fronts an external runtime tool"; a `simple` skill runs on prose alone.
  // Without this split the gate fires on `slops-tdd` for citing mattpocock/skills, and a
  // gate full of false positives is one nobody reads — which is the failure being fixed.
  const runtimeExpected = ['wrapper', 'package'].includes(type);

  if (!requires.length) {
    if (!declaresUpstream) { rows.push({ ...meta(s), status, type, upstream, state: 'no-deps', deps: [] }); continue; }
    if (!runtimeExpected) {
      rows.push({ ...meta(s), status, type, upstream, state: 'provenance', deps: [] });
      continue;
    }
    rows.push({
      ...meta(s), status, type, upstream, state: 'undeclared', deps: [],
      install: inferInstall(text),
      note: 'declares an upstream but no `requires:` probe — cannot be proved present or absent',
    });
    continue;
  }

  // `requires: none` settles a wrapper/package whose upstream is provenance, not a tool.
  if (requires.length === 1 && String(requires[0].none ?? '') === 'true') {
    rows.push({ ...meta(s), status, type, upstream, state: 'provenance', deps: [], note: requires[0].note });
    continue;
  }

  const deps = [];
  for (const spec of requires) {
    const kind = probeKind(spec);
    if (!kind) { deps.push({ name: spec.name ?? '(unnamed)', kind: null, ok: false, detail: 'no recognised probe key', spec }); continue; }
    const r = await PROBES[kind](spec);
    deps.push({ name: spec.name ?? spec[kind], kind, ok: r.ok, detail: r.detail, spec });
  }

  const unmet = deps.filter(d => !d.ok);
  const optionalOnly = unmet.every(d => String(d.spec.optional ?? '') === 'true');
  rows.push({
    ...meta(s), status, type, upstream, deps,
    state: !unmet.length ? 'ready' : optionalOnly ? 'ready-partial' : 'needs-install',
  });
}

function meta(s) { return { name: s.name, layer: s.layer, path: relative(L0, s.file) }; }

/* ── report ──────────────────────────────────────────────────────────────────  */

const ORDER = ['needs-install', 'undeclared', 'unreadable', 'ready-partial', 'ready', 'provenance', 'no-deps'];
const LABEL = {
  'needs-install': 'NEEDS-INSTALL',
  undeclared: 'UNDECLARED',
  unreadable: 'UNREADABLE',
  'ready-partial': 'READY — optional extras absent',
  ready: 'READY',
  provenance: 'provenance only — nothing to install',
  'no-deps': 'no external dependency',
};

if (JSON_OUT) {
  console.log(JSON.stringify({ root: L0, target: TARGET, rows }, null, 2));
} else {
  const runtime = rows.filter(r => !['no-deps', 'provenance'].includes(r.state));
  console.log(`\nskill-deps — ${selected.length} skills scanned, ${runtime.length} front an external tool\n`);

  for (const state of ORDER) {
    const group = rows.filter(r => r.state === state);
    if (!group.length || state === 'no-deps') continue;
    if (state === 'provenance') {
      console.log(`── ${LABEL[state]} (${group.length})`);
      console.log(`   ${group.map(r => r.name).join(', ')}\n`);
      continue;
    }
    console.log(`── ${LABEL[state]} (${group.length})`);
    for (const r of group) {
      console.log(`   ${r.name}  [${r.layer}${r.status && r.status !== 'active' ? ` · ${r.status}` : ''}]`);
      if (r.upstream) console.log(`      upstream  ${r.upstream}`);
      if (r.note) console.log(`      ${r.note}`);
      for (const d of r.deps ?? []) {
        const mark = d.ok ? '✓' : (String(d.spec?.optional ?? '') === 'true' ? '·' : '✗');
        console.log(`      ${mark} ${d.name}${d.kind ? ` (${d.kind})` : ''} — ${d.detail}`);
        if (!d.ok && d.spec?.install) console.log(`          install:  ${d.spec.install}`);
        if (!d.ok && d.spec?.note) console.log(`          note:     ${d.spec.note}`);
      }
      if (r.install) console.log(`      install (inferred from prose, unverified):  ${r.install}`);
    }
    console.log('');
  }

  const noDeps = rows.filter(r => r.state === 'no-deps').length;
  console.log('─'.repeat(52));
  const tally = ['ready', 'ready-partial', 'needs-install', 'undeclared', 'unreadable']
    .map(s => `${s} ${rows.filter(r => r.state === s).length}`).join('   ');
  console.log(`${tally}   provenance ${rows.filter(r => r.state === 'provenance').length}   self-contained ${noDeps}`);
  console.log('Installing is a founder action. This tool never installs, and never probes off this machine.');
}

const blocking = rows.filter(r => ['needs-install', 'undeclared', 'unreadable'].includes(r.state));
if (CHECK) {
  if (!JSON_OUT) console.log(blocking.length ? 'SKILL-DEPS: NOT READY' : 'SKILL-DEPS: OK');
  process.exit(blocking.length ? 1 : 0);
}
process.exit(0);
