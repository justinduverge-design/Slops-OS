#!/usr/bin/env node
/**
 * SLOPS skill-link — make the L0 skill library reachable by the agent harness.
 *
 * Authorship stays in Blueprints/skills/. This creates SYMLINKS in each repo's
 * .claude/skills/ so a session can invoke a Slops skill by name. It never copies:
 * a second editable copy would drift, and a drifted library is worse than an
 * unreachable one (see X4-SkillReach).
 *
 * Usage
 *   node Blueprints/tools/skill-link/link-skills.mjs            # apply
 *   node Blueprints/tools/skill-link/link-skills.mjs --check    # verify only, exit 1 on drift
 *   node Blueprints/tools/skill-link/link-skills.mjs --dry-run
 *   node Blueprints/tools/skill-link/link-skills.mjs --target=L0|L2|all
 *
 * Exit 0 = in sync.  Exit 1 = drift (or, in apply mode, a refusal).  Exit 2 = gate failed.
 */
import { readdirSync, statSync, lstatSync, existsSync, mkdirSync, symlinkSync, unlinkSync, readlinkSync } from 'node:fs';
import { join, resolve, relative, isAbsolute } from 'node:path';

const ARGV = process.argv.slice(2);
const CHECK = ARGV.includes('--check');
const DRY = ARGV.includes('--dry-run');
const TARGET = (ARGV.find(a => a.startsWith('--target=')) ?.slice(9) ?? 'all').toUpperCase();

const L0 = resolve(process.cwd());
const SRC = join(L0, 'Blueprints', 'skills');
const L2 = join(L0, 'slops-saloon', 'omen');

if (!existsSync(SRC)) {
  console.error(`skill-link: no Blueprints/skills under ${L0} — run from the L0 repo root.`);
  process.exit(2);
}

/** Skill dirs that are real, invocable skills: a SKILL.md with name+description. */
function discover(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root)
    .filter(n => !n.startsWith('_') && !n.startsWith('.'))
    .filter(n => { try { return statSync(join(root, n)).isDirectory(); } catch { return false; } })
    .filter(n => existsSync(join(root, n, 'SKILL.md')))
    .map(n => ({ name: n, dir: join(root, n) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

const l0Skills = discover(SRC);
const l2Skills = discover(join(L2, 'Blueprints', 'skills'));

const targets = [];
if (TARGET === 'ALL' || TARGET === 'L0') targets.push({ id: 'L0', repo: L0, skills: l0Skills });
if ((TARGET === 'ALL' || TARGET === 'L2') && existsSync(L2)) {
  // Omen sees the whole L0 library plus its own two local skills.
  targets.push({ id: 'L2', repo: L2, skills: [...l0Skills, ...l2Skills] });
}

let drift = 0, refused = 0, created = 0, repaired = 0, removed = 0, ok = 0;

for (const t of targets) {
  const dest = join(t.repo, '.claude', 'skills');
  console.log(`\n── ${t.id}  ${relative(L0, t.repo) || '.'}  →  .claude/skills  (${t.skills.length} skills)`);

  if (!existsSync(dest)) {
    if (CHECK || DRY) { console.log(`   MISSING  .claude/skills does not exist`); drift += t.skills.length; continue; }
    mkdirSync(dest, { recursive: true });
  }

  const want = new Map(t.skills.map(s => [s.name, s.dir]));

  for (const [name, dir] of want) {
    const link = join(dest, name);
    let state = 'absent';
    if (existsSync(link) || isLink(link)) state = isLink(link) ? 'link' : 'real';

    if (state === 'real') {
      // A real directory here means someone copied the library. Never clobber it.
      console.log(`   REFUSE   ${name} — a real directory, not a symlink. Resolve by hand; copies drift.`);
      refused++; drift++;
      continue;
    }
    if (state === 'link') {
      const cur = safeReadlink(link);
      // An absolute target resolves here but breaks on any other checkout path.
      const portable = cur !== null && !isAbsolute(cur);
      if (portable && resolve(dest, cur) === dir) { ok++; continue; }
      if (cur && isAbsolute(cur) && CHECK) { console.log(`   ABSOLUTE ${name} — target is not portable`); drift++; continue; }
      if (CHECK || DRY) { console.log(`   DRIFT    ${name} → ${cur}`); drift++; continue; }
      unlinkSync(link); symlinkSync(relTarget(dest, dir), link, 'dir'); console.log(`   REPAIR   ${name}`); repaired++;
      continue;
    }
    if (CHECK || DRY) { console.log(`   MISSING  ${name}`); drift++; continue; }
    symlinkSync(relTarget(dest, dir), link, 'dir'); console.log(`   LINK     ${name}`); created++;
  }

  // Orphans: links pointing at skills that no longer exist.
  for (const n of safeReaddir(dest)) {
    if (want.has(n)) continue;
    const link = join(dest, n);
    if (!isLink(link)) { console.log(`   SKIP     ${n} — not ours and not a symlink; left alone`); continue; }
    if (CHECK || DRY) { console.log(`   ORPHAN   ${n}`); drift++; continue; }
    unlinkSync(link); console.log(`   UNLINK   ${n} (orphan)`); removed++;
  }
}

/** Symlink targets are RELATIVE so they survive any checkout path, mount, or clone. */
function relTarget(linkDir, skillDir) { return relative(linkDir, skillDir); }
function isLink(p) { try { return lstatSync(p).isSymbolicLink(); } catch { return false; } }
function safeReadlink(p) { try { return readlinkSync(p); } catch { return null; } }
function safeReaddir(p) { try { return readdirSync(p); } catch { return []; } }

console.log(`\n${'─'.repeat(52)}`);
if (CHECK || DRY) {
  console.log(`in-sync ${ok}   drift ${drift}   refused ${refused}`);
  console.log(drift ? 'SKILL-LINK: DRIFT — run without --check to repair.' : 'SKILL-LINK: OK');
  process.exit(drift ? 1 : 0);
}
console.log(`linked ${created}   repaired ${repaired}   unlinked ${removed}   already-ok ${ok}   refused ${refused}`);
console.log(refused ? 'SKILL-LINK: INCOMPLETE — see REFUSE lines above.' : 'SKILL-LINK: OK');
process.exit(refused ? 1 : 0);
