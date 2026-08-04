#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const REQUIRED_DOCS = [
  'README.md',
  'executive-findings.md',
  'tool-capability-manifest.md',
  'slops-os-inventory.md',
  'omen-inventory.md',
  'routing-audit.md',
  'prompt-agent-audit.md',
  'graphify-audit.md',
  'direction-schema-v1-proposal.md',
  'target-trees.md',
  'migration-manifest.md',
  'validation-plan.md',
  'implementation-phases.md',
];

const REQUIRED_DATA = [
  'artifact-inventory.json',
  'inventory-summary.json',
  'all-file-exact-duplicates.json',
  'exact-duplicates.json',
  'near-duplicates.json',
  'link-findings.json',
  'migration-manifest.json',
];

const REQUIRED_SCHEMAS = [
  'agent-inbox-item.schema.json',
  'sprint-item.schema.json',
  'decision.schema.json',
  'session-close.schema.json',
];

const DISPOSITIONS = new Set(['KEEP', 'MERGE', 'CONVERT', 'MOVE', 'ARCHIVE', 'DELETE', 'REVIEW']);

function parseArgs(argv) {
  const result = {};
  for (let index = 2; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith('--') || !value) throw new Error(`Expected --key value; received ${key ?? '<missing>'}`);
    result[key.slice(2)] = path.resolve(value);
  }
  for (const key of ['audit', 'slops', 'omen']) if (!result[key]) throw new Error(`Missing --${key}`);
  return result;
}

function git(root, args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 64 * 1024 * 1024 }).trim();
}

function readJson(target, errors) {
  try {
    return JSON.parse(fs.readFileSync(target, 'utf8'));
  } catch (error) {
    errors.push(`invalid JSON ${target}: ${error.message}`);
    return null;
  }
}

function countBy(items, key) {
  const result = {};
  for (const item of items) result[item[key]] = (result[item[key]] ?? 0) + 1;
  return result;
}

function sameCounts(left, right) {
  const keys = new Set([...Object.keys(left ?? {}), ...Object.keys(right ?? {})]);
  return [...keys].every((key) => (left?.[key] ?? 0) === (right?.[key] ?? 0));
}

function inspectMarkdown(target, errors) {
  const text = fs.readFileSync(target, 'utf8');
  if (!text.startsWith('#')) errors.push(`Markdown does not start with a heading: ${target}`);
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/[ \t]+$/.test(line)) errors.push(`trailing whitespace ${target}:${index + 1}`);
  });
  const fences = lines.filter((line) => /^\s*```/.test(line)).length;
  if (fences % 2 !== 0) errors.push(`unbalanced code fences: ${target}`);
  if (text.includes('\0')) errors.push(`NUL byte in Markdown: ${target}`);
}

const args = parseArgs(process.argv);
const errors = [];
const observations = [];

for (const relative of REQUIRED_DOCS) {
  const target = path.join(args.audit, relative);
  if (!fs.existsSync(target)) errors.push(`missing required document: ${relative}`);
  else inspectMarkdown(target, errors);
}
for (const relative of REQUIRED_DATA) {
  if (!fs.existsSync(path.join(args.audit, 'data', relative))) errors.push(`missing required data file: data/${relative}`);
}
for (const relative of REQUIRED_SCHEMAS) {
  if (!fs.existsSync(path.join(args.audit, 'schemas', relative))) errors.push(`missing required schema: schemas/${relative}`);
}

const summary = readJson(path.join(args.audit, 'data', 'inventory-summary.json'), errors);
const inventory = readJson(path.join(args.audit, 'data', 'artifact-inventory.json'), errors);
const manifest = readJson(path.join(args.audit, 'data', 'migration-manifest.json'), errors);
const duplicates = readJson(path.join(args.audit, 'data', 'exact-duplicates.json'), errors);
const allFileDuplicates = readJson(path.join(args.audit, 'data', 'all-file-exact-duplicates.json'), errors);
const nearDuplicates = readJson(path.join(args.audit, 'data', 'near-duplicates.json'), errors);
const links = readJson(path.join(args.audit, 'data', 'link-findings.json'), errors);

if (summary && inventory && manifest) {
  const expectedTotal = Object.values(summary.repositories).reduce((total, repo) => total + repo.inventoried_artifacts, 0);
  if (inventory.length !== expectedTotal) errors.push(`inventory length ${inventory.length} != summary total ${expectedTotal}`);
  if (manifest.length !== expectedTotal) errors.push(`manifest length ${manifest.length} != summary total ${expectedTotal}`);
  if (summary.exact_duplicate_groups !== duplicates?.length) errors.push('exact duplicate summary count mismatch');
  if (summary.all_tracked_exact_duplicate_groups !== allFileDuplicates?.length) errors.push('all-file exact duplicate summary count mismatch');
  if (summary.near_duplicate_candidates !== nearDuplicates?.length) errors.push('near duplicate summary count mismatch');
  if (summary.local_link_findings !== links?.length) errors.push('link finding summary count mismatch');

  const inventoryKeys = new Set();
  const manifestKeys = new Set();
  const requiredInventoryFields = [
    'repository', 'current_path', 'filename', 'artifact_type', 'purpose', 'status', 'authority_claim',
    'owning_repository', 'line_count', 'file_size_bytes', 'inbound_references', 'outbound_references',
    'inbound_reference_paths', 'outbound_reference_paths', 'auto_load_behavior', 'current_vs_historical',
    'last_meaningful_relevance', 'proposed_disposition', 'proposed_destination', 'risk_of_moving',
    'validation_needed', 'disposition_reason',
  ];
  const requiredManifestFields = [
    'repository', 'baseline_commit', 'old_path', 'new_path', 'disposition', 'reason', 'authority_impact',
    'inbound_link_repair', 'inbound_reference_paths', 'outbound_link_repair', 'outbound_reference_paths',
    'validation_required', 'risk', 'rollback_approach', 'proposed_commit_group', 'founder_ratification_required',
  ];

  for (const item of inventory) {
    const key = `${item.repository}:${item.current_path}`;
    if (inventoryKeys.has(key)) errors.push(`duplicate inventory path: ${key}`);
    inventoryKeys.add(key);
    for (const field of requiredInventoryFields) if (!(field in item)) errors.push(`inventory ${key} missing ${field}`);
    if (!DISPOSITIONS.has(item.proposed_disposition)) errors.push(`invalid inventory disposition ${key}: ${item.proposed_disposition}`);
    if (!Array.isArray(item.inbound_reference_paths) || !Array.isArray(item.outbound_reference_paths)) errors.push(`reference paths are not arrays: ${key}`);
  }

  for (const item of manifest) {
    const key = `${item.repository}:${item.old_path}`;
    if (manifestKeys.has(key)) errors.push(`duplicate manifest path: ${key}`);
    manifestKeys.add(key);
    for (const field of requiredManifestFields) if (!(field in item)) errors.push(`manifest ${key} missing ${field}`);
    if (!DISPOSITIONS.has(item.disposition)) errors.push(`invalid manifest disposition ${key}: ${item.disposition}`);
    if (!item.new_path || !item.reason || !item.validation_required || !item.rollback_approach) errors.push(`empty migration field: ${key}`);
    if ((item.disposition !== 'KEEP') !== item.founder_ratification_required) errors.push(`founder gate mismatch: ${key}`);
    if (item.disposition === 'DELETE' && !(item.repository === 'omen' && item.old_path.toLowerCase().startsWith('graphify-out/cache/'))) {
      errors.push(`delete proposal outside generated Omen Graphify cache: ${key}`);
    }
    if (item.repository === 'omen' && /^(src|frontend|mobile|extension|test|evals|scripts|sql|deploy|\.github)\//.test(item.old_path) && item.disposition !== 'KEEP') {
      errors.push(`non-KEEP disposition on frozen Omen code boundary: ${key}`);
    }
  }

  if (inventoryKeys.size !== manifestKeys.size || [...inventoryKeys].some((key) => !manifestKeys.has(key))) errors.push('inventory and migration manifest path sets differ');

  for (const [repoId, repoSummary] of Object.entries(summary.repositories)) {
    const actual = countBy(inventory.filter((item) => item.repository === repoId), 'proposed_disposition');
    if (!sameCounts(actual, repoSummary.disposition_counts)) errors.push(`disposition count mismatch for ${repoId}`);
  }
  observations.push(`validated ${inventory.length} artifact rows and ${manifest.length} migration rows`);
}

for (const relative of REQUIRED_SCHEMAS) {
  const target = path.join(args.audit, 'schemas', relative);
  if (!fs.existsSync(target)) continue;
  const schema = readJson(target, errors);
  if (!schema) continue;
  for (const field of ['$schema', '$id', 'title', 'type', 'required', 'properties']) {
    if (!(field in schema)) errors.push(`schema ${relative} missing ${field}`);
  }
  if (schema.type !== 'object' || !Array.isArray(schema.required)) errors.push(`schema ${relative} is not an object contract with required fields`);
  for (const field of ['schema_id', 'schema_version', 'id']) if (!(field in (schema.properties ?? {}))) errors.push(`schema ${relative} lacks property ${field}`);
}

if (summary) {
  for (const [repoId, root] of [['slops-os', args.slops], ['omen', args.omen]]) {
    const baseline = summary.repositories?.[repoId]?.commit;
    if (!baseline) {
      errors.push(`missing baseline commit for ${repoId}`);
      continue;
    }
    try {
      git(root, ['cat-file', '-e', `${baseline}^{commit}`]);
      git(root, ['merge-base', '--is-ancestor', baseline, 'HEAD']);
    } catch {
      errors.push(`baseline ${baseline} is absent or not an ancestor of ${repoId} HEAD`);
    }
  }
}

const auditRelative = path.relative(args.slops, args.audit).replaceAll('\\', '/');
if (auditRelative.startsWith('../') || path.isAbsolute(auditRelative)) errors.push('audit directory is outside the Slops OS worktree');
for (const [repoId, root] of [['slops-os', args.slops], ['omen', args.omen]]) {
  const status = git(root, ['status', '--porcelain=v1', '--untracked-files=all']);
  if (!status) continue;
  for (const line of status.split(/\r?\n/)) {
    const changed = line.slice(3).replace(/^"|"$/g, '').replaceAll('\\', '/');
    if (repoId === 'omen' || !changed.startsWith(`${auditRelative}/`)) errors.push(`out-of-scope worktree change in ${repoId}: ${line}`);
  }
}

if (errors.length) {
  process.stderr.write(`${JSON.stringify({ ok: false, error_count: errors.length, errors }, null, 2)}\n`);
  process.exit(1);
}

process.stdout.write(`${JSON.stringify({
  ok: true,
  required_documents: REQUIRED_DOCS.length,
  required_data_files: REQUIRED_DATA.length,
  draft_schemas: REQUIRED_SCHEMAS.length,
  observations,
}, null, 2)}\n`);
