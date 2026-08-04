#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const DISPOSITIONS = new Set([
  'KEEP',
  'MERGE',
  'CONVERT',
  'MOVE',
  'ARCHIVE',
  'DELETE',
  'REVIEW',
]);

function parseArgs(argv) {
  const result = {};
  for (let index = 2; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith('--') || !value) {
      throw new Error(`Expected --key value arguments; received ${key ?? '<missing>'}`);
    }
    result[key.slice(2)] = value;
  }
  for (const required of ['slops', 'omen', 'out']) {
    if (!result[required]) throw new Error(`Missing --${required}`);
  }
  return result;
}

function runGit(root, args, options = {}) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: options.encoding ?? 'utf8',
    maxBuffer: 256 * 1024 * 1024,
    windowsHide: true,
  });
}

function toPosix(value) {
  return value.replaceAll('\\', '/').replace(/^\.\//, '');
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function writeJson(target, value) {
  fs.writeFileSync(target, stableJson(value), 'utf8');
}

function isRelevant(relativePath) {
  const normalized = toPosix(relativePath);
  const lower = normalized.toLowerCase();
  const base = path.posix.basename(lower);
  const extension = path.posix.extname(lower);
  const alwaysText = new Set([
    '.md', '.markdown', '.html', '.htm', '.yaml', '.yml', '.json', '.jsonc',
    '.toml', '.txt', '.prompt', '.skill', '.sql', '.properties', '.gradle',
    '.kts', '.pbxproj', '.plist', '.xcconfig', '.entitlements', '.conf', '.xml',
    '.webmanifest', '.xcscheme', '.ini', '.lock', '.bat', '.cmd',
  ]);
  if (alwaysText.has(extension)) return true;
  if ([
    'agents.md', 'agent.md', 'claude.md', 'dockerfile', 'dockerfile.cron',
    '.gitignore', '.gitattributes', '.dockerignore', '.editorconfig', '.npmrc',
    '.env.example', '.graphify_root', 'makefile', 'procfile', 'podfile', 'gemfile', 'gradlew',
    'gradlew.bat', 'package.swift', 'androidmanifest.xml', 'info.plist',
  ].includes(base)) return true;
  if (/^dockerfile(?:\..+)?$/i.test(base)) return true;
  if (/^(?:.+\.)?env\.(?:example|sample|template)$/i.test(base)) return true;
  if (/\.(?:xcconfig|plist|entitlements|conf|xml|properties)\.(?:example|sample|template)$/i.test(base)) return true;
  if (/(?:^|[._-])config(?:[._-]|$)/i.test(base) || /^(?:vite|eslint|postcss|tailwind)\./i.test(base)) return true;
  if (/(^|\/)(?:deploy|\.github)(\/|$)/i.test(normalized)) return true;
  if (/(^|\/)(prompts?|agents?|agent-modules|skills|evals|scripts)(\/|$)/i.test(normalized)) {
    return ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.ps1', '.sh', '.py'].includes(extension);
  }
  if (/(^|\/)(package\.json|probo\.yaml|settings\.gradle\.kts|build\.gradle\.kts)$/i.test(normalized)) return true;
  return false;
}

function isProbablyBinary(buffer) {
  const limit = Math.min(buffer.length, 8192);
  for (let index = 0; index < limit; index += 1) {
    if (buffer[index] === 0) return true;
  }
  return false;
}

function countLines(text) {
  if (text.length === 0) return 0;
  return text.split(/\r?\n/).length;
}

function artifactType(relativePath) {
  const normalized = toPosix(relativePath);
  const lower = normalized.toLowerCase();
  const base = path.posix.basename(lower);
  if (['agents.md', 'agent.md', 'claude.md'].includes(base)) return 'agent instruction wrapper';
  if (lower.includes('/prompts/') || lower.startsWith('prompts/') || /(^|[-_])prompt([._-]|$)/.test(base)) {
    return lower.startsWith('src/prompts/') ? 'product runtime prompt' : 'repository workflow prompt';
  }
  if (lower.includes('/agents/') || lower.includes('/agent-modules/') || lower.startsWith('.agents/')) return 'agent or routing artifact';
  if (lower.includes('/handoffs/')) return /^\d{4}-\d{2}-\d{2}-/.test(base) ? 'session handoff' : 'contract or handoff index';
  if (lower.includes('/decisions/') || base === 'decision_log.md' || base === 'decision-log.md') return 'decision artifact';
  if (lower.includes('graphify-out/')) return lower.includes('/cache/') ? 'generated Graphify cache' : 'generated Graphify view';
  if (lower.includes('/schemas/') || base.includes('schema')) return 'schema';
  if (lower.includes('/reviews/') || lower.includes('/audits/') || base.includes('audit') || base.includes('review')) return 'review or audit';
  if (lower.endsWith('.yml') || lower.endsWith('.yaml')) return lower.startsWith('.github/') ? 'CI workflow/config' : 'YAML configuration';
  if (lower.endsWith('.json') || lower.endsWith('.jsonc')) return base.includes('package') ? 'package/build manifest' : 'JSON data/configuration';
  if (lower.endsWith('.html') || lower.endsWith('.htm')) return 'HTML artifact';
  if (lower.endsWith('.sql')) return 'database schema/source';
  if (lower.endsWith('.md') || lower.endsWith('.markdown')) return 'Markdown knowledge artifact';
  if (lower.endsWith('.ps1') || lower.endsWith('.sh') || lower.endsWith('.js') || lower.endsWith('.mjs') || lower.endsWith('.cjs')) return 'script or loader';
  return 'text configuration';
}

function purposeFor(relativePath) {
  const normalized = toPosix(relativePath);
  const lower = normalized.toLowerCase();
  const base = path.posix.basename(lower);
  if (['agents.md', 'claude.md'].includes(base)) return 'runtime entry adapter and context router';
  if (base === 'agent.md') return 'indirect backend-specific runtime instruction';
  if (lower.startsWith('direction/')) return lower.includes('/reviews/') ? 'analysis/evidence currently placed in Direction' : 'planning, current truth, decisions, or continuity';
  if (lower.startsWith('blueprints/')) return 'approved contract, reusable workflow, schema, template, or handoff';
  if (lower.startsWith('references/')) return 'evidence, research, source material, or generated map';
  if (lower.startsWith('solutions/')) return 'proposal, audit, report, generated output, or reviewable deliverable';
  if (lower.startsWith('archive/')) return 'inactive provenance or superseded history';
  if (lower.startsWith('graphify-out/')) return 'repository-only generated knowledge-graph output';
  if (lower.startsWith('brand/')) return 'brand contract, draft, reference, or asset metadata';
  if (lower.startsWith('docs/')) return 'legacy or uncategorized documentation';
  if (lower.startsWith('.github/')) return 'CI, release, or repository automation';
  if (lower.startsWith('deploy/')) return 'deployment and runtime operations contract/configuration';
  if (lower.startsWith('mobile/')) return 'native application build, source contract, or platform configuration';
  if (lower.startsWith('frontend/')) return 'primary web application source/build configuration';
  if (lower.startsWith('client/')) return 'legacy web client still referenced by Docker and CI';
  if (lower.startsWith('src/')) return lower.startsWith('src/prompts/') ? 'product runtime prompt' : 'API/runtime source or configuration';
  if (lower.startsWith('test/')) return 'application validation';
  if (lower.startsWith('scripts/')) return 'repository automation or operational helper';
  if (lower.startsWith('sql/')) return 'review-only database source';
  if (lower.startsWith('output/')) return 'generated output or evidence';
  if (lower.startsWith('logos/')) return 'brand asset or generated logo material';
  if (lower.startsWith('legal/')) return 'legal contract or public-policy source';
  if (lower.startsWith('evals/')) return 'prompt/model evaluation configuration or fixture';
  if (lower.startsWith('.agents/') || lower.startsWith('.codex/') || lower.startsWith('skills/')) return 'runtime-specific adapter, skill, or tool helper';
  if (base === 'readme.md') return 'repository orientation';
  if (base === 'context.md') return 'legacy or current context entry';
  if (base === 'dbs_index.md') return 'legacy navigation index';
  if (base === 'manifesto.md') return 'founder doctrine or operating intent';
  return 'repository configuration or knowledge artifact';
}

function authorityClaim(text, relativePath) {
  const lower = text.toLowerCase();
  const pathLower = toPosix(relativePath).toLowerCase();
  const claims = [];
  if (/facts? of record/.test(lower)) claims.push('facts-of-record');
  if (/source[- ]of[- ]truth|single source/.test(lower)) claims.push('source-of-truth');
  if (/\bcanonical\b/.test(lower)) claims.push('canonical');
  if (/\bauthoritative\b|\bauthority\b/.test(lower)) claims.push('authority');
  if (/current truth|current state|active queue/.test(lower)) claims.push('current');
  if (/\bhistorical\b|\bsuperseded\b|do not re[- ]run/.test(lower) || pathLower.startsWith('archive/')) claims.push('historical/superseded');
  if (/\bdraft\b|proposal|awaiting approval/.test(lower) || pathLower.startsWith('solutions/')) claims.push('draft/proposed');
  if (/generated|do not edit manually/.test(lower) || pathLower.startsWith('graphify-out/')) claims.push('generated');
  return claims.length ? [...new Set(claims)].join(', ') : 'none explicit';
}

function currentness(relativePath, claim) {
  const lower = toPosix(relativePath).toLowerCase();
  if (lower.startsWith('archive/') || claim.includes('historical/superseded')) return 'historical/provenance';
  if (lower.includes('graphify-out/') || claim.includes('generated')) return 'generated view';
  if (lower.startsWith('solutions/') || claim.includes('draft/proposed')) return 'proposed/reviewable';
  if (lower.startsWith('references/')) return 'evidence/non-authoritative';
  if (lower.startsWith('direction/')) return lower.includes('/reviews/') ? 'misplaced analysis claim' : 'current/authority-claimed';
  if (lower.startsWith('blueprints/')) return 'approved-contract-claimed';
  if (['agents.md', 'agent.md', 'claude.md', 'context.md', 'dbs_index.md', 'readme.md', 'manifesto.md'].includes(path.posix.basename(lower))) {
    return 'entry/currentness must be reconciled';
  }
  return 'operational or unclassified';
}

function autoLoadBehavior(relativePath, inboundFromCode) {
  const normalized = toPosix(relativePath);
  const lower = normalized.toLowerCase();
  const base = path.posix.basename(lower);
  const depth = normalized.split('/').length;
  if (base === 'agents.md' || base === 'claude.md') return depth === 1 ? 'root runtime entry' : 'scoped runtime entry if subtree is entered';
  if (base === 'agent.md') return 'indirectly required by AGENTS.md';
  if (lower.startsWith('.github/workflows/')) return 'loaded by GitHub Actions triggers';
  if (lower === 'package.json' || lower.endsWith('/package.json')) return 'loaded by npm/build tooling';
  if (lower.startsWith('src/prompts/')) return inboundFromCode ? 'loaded by product runtime' : 'runtime candidate; loader not detected';
  if (lower.includes('/prompts/')) return inboundFromCode ? 'referenced by code/tooling' : 'manual invocation or wrapper import';
  if (lower.includes('graphify-out/')) return 'never authoritative; queried explicitly';
  return 'manual/read-on-demand';
}

function statusFor(relativePath, claim) {
  const lower = toPosix(relativePath).toLowerCase();
  if (lower.startsWith('archive/')) return 'inactive';
  if (lower.includes('/_old') || lower.includes('/archive/')) return 'historical';
  if (lower.includes('/_pending/') || claim.includes('draft/proposed')) return 'draft/review';
  if (lower.includes('graphify-out/') || claim.includes('generated')) return 'generated';
  if (lower.startsWith('direction/')) return 'active-claimed';
  if (lower.startsWith('blueprints/')) return 'approved-claimed';
  if (lower.startsWith('references/')) return 'reference';
  if (lower.startsWith('solutions/')) return 'solution';
  return 'operational or unclear';
}

function rootName(relativePath) {
  const normalized = toPosix(relativePath);
  return normalized.includes('/') ? normalized.split('/')[0] : '(root)';
}

function slopsDisposition(relativePath) {
  const p = toPosix(relativePath);
  const lower = p.toLowerCase();
  const base = path.posix.basename(lower);
  if (lower.startsWith('archive/')) return decision('KEEP', p, 'low', 'provenance/link check', 'already inactive history');
  if (/^(00_executive_office|01_operations_coo|02_engineering_cto|03_security_ciso|04_brand_cmo|projects)\//.test(lower)) {
    return decision('ARCHIVE', `Archive/dbs-vnext/organizational-scaffolding/${p}`, 'medium', 'content review, inbound-link repair, git history', 'role-folder scaffolding is non-target structure');
  }
  if (lower.startsWith('direction/reviews/')) return decision('MOVE', p.replace(/^Direction\/reviews\//i, 'Solutions/reviews/'), 'medium', 'link check and authority scan', 'audits/reviews are non-authoritative Solutions under vNext');
  if (lower === 'direction/00_final_plan.md') return decision('ARCHIVE', 'Archive/dbs-vnext/planning/00-final-plan.md', 'low', 'inbound-link repair', 'explicitly historical plan');
  if (['direction/facts-of-record.md', 'direction/decision_log.md', 'direction/roadmap.md', 'direction/todo.md'].includes(lower)) {
    const destinations = {
      'direction/facts-of-record.md': 'Direction/facts-of-record/',
      'direction/decision_log.md': 'Direction/decisions/',
      'direction/roadmap.md': 'Direction/roadmap.md',
      'direction/todo.md': 'Direction/current-sprint/',
    };
    const name = destinations[lower];
    return decision('CONVERT', name, 'high', 'Direction v1 schema validation and cold-start parity', 'current control-plane content needs versioned interfaces');
  }
  if (lower === 'direction/context.md') return decision('CONVERT', 'Direction/current-state.md', 'high', 'fact/decision reconciliation and schema validation', 'context should become explicit current-state interface');
  if (lower === 'direction/cutover_state.md') return decision('CONVERT', 'Direction/continuation.md', 'medium', 'cutover validator and startup test', 'continuation state belongs in the versioned Direction contract');
  if (['agents.md', 'claude.md'].includes(lower)) return decision('CONVERT', p, 'high', 'OpenAI and Claude cold-start routing test', 'keep as thin vendor adapter only');
  if (lower === 'context.md') return decision('MERGE', 'Direction/current-state.md', 'high', 'fact reconciliation and root-routing test', 'legacy root context competes with Direction');
  if (lower === 'dbs_index.md') return decision('MERGE', 'Blueprints/repository-boundaries.md', 'medium', 'path/link validation', 'navigation and repository ownership are contracts, not a root truth surface');
  if (lower === 'manifesto.md') return decision('MERGE', 'Direction/manifesto.md', 'medium', 'founder intent diff', 'duplicate doctrine should have one owner');
  if (lower === 'readme.md') return decision('CONVERT', 'README.md', 'medium', 'root truth/cold-start check', 'retain a minimal accurate repository orientation');
  if (lower.startsWith('blueprints/prompts/_old-prompts-for-analysis/')) return decision('ARCHIVE', p.replace(/^Blueprints\/prompts\/_old-prompts-for-analysis\//i, 'Archive/prompts/'), 'low', 'inbound-link scan', 'already classified historical');
  if (lower.startsWith('blueprints/prompts/phase-') || lower.includes('/phases-2-4-') || /blueprints\/prompts\/(codex-|.*-handoff\.md$)/i.test(p)) {
    return decision('ARCHIVE', `Archive/dbs-vnext/executed-prompts/${p.slice('Blueprints/prompts/'.length)}`, 'medium', 'execution-state and inbound-link review', 'one-time or executed prompt candidate');
  }
  if (lower.startsWith('blueprints/prompts/_pending/')) return decision('REVIEW', p, 'medium', 'owner/input/output/evaluation review', 'pending prompt cannot survive without a current owner and trigger');
  if (lower.startsWith('blueprints/agent-modules/identity-')) return decision('MERGE', 'Blueprints/runtime-adapters/', 'high', 'runtime-policy and cold-start tests', 'vendor/runtime modules overlap and should become thinner capability adapters');
  if (lower.startsWith('solutions/')) return decision('REVIEW', p, 'low', 'status/owner/promotion review', 'Solutions content requires current-versus-provenance classification');
  if (lower.startsWith('references/')) return decision('KEEP', p, 'low', 'source/provenance check', 'correct evidence layer');
  if (lower.startsWith('blueprints/')) return decision('KEEP', p, 'medium', 'authority/link/duplicate validation', 'generally correct contract/workflow layer; consolidation may still apply');
  if (lower.startsWith('direction/decisions/')) return decision('CONVERT', p, 'high', 'decision v1 schema and supersession validation', 'decision content is correctly owned but not uniformly schema-versioned');
  if (lower.startsWith('direction/')) return decision('REVIEW', p, 'high', 'Direction v1 mapping and authority scan', 'Direction must stay small and current');
  if (lower.startsWith('slops-saloon/')) return decision('REVIEW', p, 'medium', 'L1 ownership and routing validation', 'division-layer content needs its own evidence-based mapping');
  if (base.startsWith('.git')) return decision('KEEP', p, 'low', 'Git/config syntax check', 'repository infrastructure');
  return decision('REVIEW', p, 'medium', 'owner and target-layer review', 'insufficient evidence for a stronger automatic disposition');
}

function omenDisposition(relativePath) {
  const p = toPosix(relativePath);
  const lower = p.toLowerCase();
  const base = path.posix.basename(lower);
  if (lower.startsWith('archive/')) return decision('KEEP', p, 'low', 'provenance/link check', 'already inactive history');
  if (lower.startsWith('direction/reviews/')) return decision('MOVE', p.replace(/^Direction\/reviews\//i, 'Solutions/reviews/'), 'medium', 'link check and authority scan', 'audits/reviews are non-authoritative Solutions under vNext');
  if (lower === 'direction/sprints_completed.md') return decision('ARCHIVE', 'Archive/direction/sprints-completed.md', 'medium', 'closure/evidence link validation', 'completed history should not sit in the active control plane');
  if (lower === 'direction/status-model.md') return decision('CONVERT', 'Blueprints/schema-cache/slops-os/direction-v1/', 'high', 'canonical hash parity and standalone CI', 'hand-maintained mirror should become a generated provenance-pinned schema cache');
  if (['direction/agent_inbox.md', 'direction/current_sprint.md', 'direction/decision_log.md', 'direction/facts-of-record.md', 'direction/known_issues.md', 'direction/roadmap.md'].includes(lower)) {
    const destinations = {
      'direction/agent_inbox.md': 'Direction/agent-inbox/',
      'direction/current_sprint.md': 'Direction/current-sprint/',
      'direction/decision_log.md': 'Direction/decisions/',
      'direction/facts-of-record.md': 'Direction/facts-of-record/',
      'direction/known_issues.md': 'Direction/known-issues/',
      'direction/roadmap.md': 'Direction/roadmap.md',
    };
    return decision('CONVERT', destinations[lower], 'high', 'Direction v1 schema, transition, and cold-start validation', 'active control-plane content needs versioned interfaces');
  }
  if (lower === 'direction/context.md') return decision('CONVERT', 'Direction/current-state.md', 'high', 'fact/decision reconciliation and schema validation', 'context should become explicit current-state interface');
  if (lower === 'direction/cutover_state.md') return decision('CONVERT', 'Direction/continuation.md', 'medium', 'cutover validator and startup test', 'continuation state belongs in the versioned Direction contract');
  if (lower.startsWith('direction/decisions/')) return decision('CONVERT', p, 'high', 'decision v1 schema and supersession validation', 'decision content is correctly owned but not uniformly schema-versioned');
  if (['agents.md', 'claude.md'].includes(lower)) return decision('CONVERT', p, 'high', 'OpenAI and Claude cold-start routing test', 'keep as thin vendor adapter only');
  if (lower === 'agent.md') return decision('MERGE', 'Blueprints/runtime-rules/backend.md', 'high', 'unique-content diff and OpenAI routing test', 'singular AGENT.md is an unsupported competing entry surface');
  if (lower === 'context.md') return decision('MERGE', 'Direction/current-state.md', 'high', 'fact reconciliation and root-routing test', 'legacy root context competes with Direction');
  if (lower === 'dbs_index.md') return decision('MERGE', 'Blueprints/repository-boundaries.md', 'medium', 'path/link validation', 'navigation and repository ownership are contracts, not a root truth surface');
  if (lower === 'readme.md') return decision('CONVERT', 'README.md', 'medium', 'root truth/cold-start check', 'retain a minimal accurate repository orientation');
  if (lower === '.graphify_root') return decision('CONVERT', 'References/graphify/omen-view/manifest.json', 'high', 'remove machine-specific root and validate generated provenance', 'machine-specific Graphify root marker must become relocatable generated metadata');
  if (lower.startsWith('graphify-out/cache/')) return decision('DELETE', p, 'low', 'confirm regenerated graph and cache ignore rule', 'generated cache is reproducible and not provenance');
  if (lower.startsWith('graphify-out/')) return decision('MOVE', p.replace(/^graphify-out\//i, 'References/graphify/omen-view/'), 'medium', 'generated/provenance metadata and graph freshness check', 'optional repository view belongs in References');
  if (lower.startsWith('brand/archive/')) return decision('ARCHIVE', p.replace(/^Brand\/archive\//i, 'Archive/brand/'), 'low', 'inbound-link and asset reference check', 'already historical brand content');
  if (lower.startsWith('brand/')) return decision('MOVE', p.replace(/^Brand\//i, 'Blueprints/brand/'), 'medium', 'brand contract and asset-link validation', 'approved brand rules are Blueprints; source assets may split to References');
  if (lower.startsWith('legal/')) return decision('MOVE', p.replace(/^Legal\//i, 'Blueprints/legal/'), 'medium', 'legal-source and public-route link validation', 'approved legal contracts belong in Blueprints');
  if (lower.startsWith('docs/')) return decision('REVIEW', p, 'medium', 'classify as contract, evidence, solution, or history; repair links', 'loose docs mix several DBS semantics');
  if (lower.startsWith('output/')) return decision('MOVE', p.replace(/^output\//i, 'Solutions/generated/'), 'low', 'provenance and reproducibility check', 'generated outputs belong in Solutions or should be deleted after review');
  if (lower.startsWith('logos/')) return decision('MOVE', p.replace(/^logos\//i, 'References/assets/logos/'), 'medium', 'source/usage/hash check', 'brand source/evidence assets belong in References');
  if (lower.startsWith('.codex/')) return decision('MERGE', 'Blueprints/runtime-adapters/codex/', 'high', 'vendor parity and cold-start test', 'vendor-specific knowledge must collapse into a shared canonical system');
  if (lower.startsWith('.agents/') || lower.startsWith('skills/')) return decision('REVIEW', p, 'high', 'canonical-source, distribution, and runtime-loader validation', 'runtime packages may be justified adapters but cannot be independent truth');
  if (lower.startsWith('blueprints/prompts/_old') || lower.includes('/archive/')) return decision('ARCHIVE', p.replace(/^Blueprints\/prompts\//i, 'Archive/prompts/'), 'low', 'inbound-link scan', 'historical prompt material');
  if (lower.startsWith('blueprints/prompts/')) return decision('REVIEW', p, 'medium', 'prompt survival classification and loader/owner/evaluation check', 'repository prompts require explicit survival criteria');
  if (lower.startsWith('solutions/')) return decision('REVIEW', p, 'low', 'status/owner/promotion review', 'Solutions content requires current-versus-provenance classification');
  if (lower.startsWith('references/')) return decision('KEEP', p, 'low', 'source/provenance check', 'correct evidence layer');
  if (lower.startsWith('blueprints/')) return decision('KEEP', p, 'medium', 'authority/link/duplicate validation', 'generally correct contract/workflow layer; consolidation may still apply');
  if (lower.startsWith('client/')) return decision('REVIEW', p, 'high', 'Docker, CI, runtime, build, and usage proof before any code move', 'called legacy but still built and copied into production images');
  if (/^(src|frontend|mobile|extension|test|scripts|sql|deploy|evals|\.github)\//.test(lower)) return decision('KEEP', p, 'high', 'existing build/test/deploy validation', 'real code, test, evaluation, or deployment boundary');
  if (['package.json', 'package-lock.json', 'dockerfile', 'dockerfile.cron', 'docker-compose.yml', 'docker-compose.hostinger.yml', 'probo.yaml', '.gitignore', '.gitattributes', '.dockerignore', '.env.example'].includes(lower)) {
    return decision('KEEP', p, 'high', 'build/test/Docker/deployment path validation', 'root operational configuration');
  }
  return decision('REVIEW', p, 'medium', 'owner and target-layer review', 'insufficient evidence for a stronger automatic disposition');
}

function decision(disposition, destination, risk, validation, reason) {
  if (!DISPOSITIONS.has(disposition)) throw new Error(`Invalid disposition: ${disposition}`);
  return { disposition, destination, risk, validation, reason };
}

function rootPurpose(repoId, root) {
  const common = {
    Direction: 'stable planning and command control plane',
    Blueprints: 'approved contracts, schemas, workflows, and templates',
    References: 'evidence, research, source material, and generated maps',
    Solutions: 'proposals, audits, investigations, and generated reviewable work',
    Archive: 'inactive history and provenance',
    '(root)': 'minimal runtime adapters, repository orientation, and required configuration',
  };
  if (common[root]) return common[root];
  if (repoId === 'slops-os') {
    if (/^0[0-4]_/.test(root) || root === 'Projects') return 'legacy organizational-role or project scaffolding';
    if (root === 'slops-saloon') return 'Layer 1 division boundary retained inside Slops OS';
    return 'uncategorized Slops OS root boundary';
  }
  const omen = {
    src: 'Express API and backend runtime', frontend: 'primary React/Vite web app', client: 'legacy web client still built by Docker/CI',
    mobile: 'SwiftUI iOS, Compose Android, and shared native contracts', test: 'backend and contract tests', scripts: 'repository and operational helpers',
    deploy: 'KVM1/Hostinger runtime and Nginx configuration', sql: 'review-only database source', '.github': 'CI and release automation',
    extension: 'browser/Safari extension application boundary', evals: 'prompt and behavior evaluation assets', Brand: 'brand contracts/assets mixed by lifecycle',
    Legal: 'legal source material', docs: 'loose mixed-semantics documentation', 'graphify-out': 'tracked generated repository graph and cache',
    output: 'generated media/evidence output', logos: 'brand/source/generated logo assets', '.agents': 'runtime-specific app tooling', '.Codex': 'vendor-specific runtime material',
    skills: 'legacy or app-local skill material', memory: 'local session/memory artifact',
  };
  return omen[root] ?? 'uncategorized Omen root boundary';
}

function rootTarget(repoId, root) {
  if (['Direction', 'Blueprints', 'References', 'Solutions', 'Archive', '(root)'].includes(root)) return 'retain; narrow to vNext contract';
  if (repoId === 'slops-os') {
    if (/^0[0-4]_/.test(root) || root === 'Projects') return 'remove root after merge/archive proof';
    if (root === 'slops-saloon') return 'retain as real L1 division boundary';
    return 'review';
  }
  const keep = new Set(['src', 'frontend', 'mobile', 'test', 'scripts', 'deploy', 'sql', '.github', 'extension', 'evals']);
  if (keep.has(root)) return 'retain current boundary; code moves are a later workstream';
  if (root === 'client') return 'retain until runtime/build ownership decision proves safe disposition';
  if (root === 'graphify-out') return 'relocate optional view to References; drop reproducible cache after approval';
  if (['Brand', 'Legal', 'docs', 'output', 'logos', '.agents', '.Codex', 'skills', 'memory'].includes(root)) return 'map into DBS owner or justified adapter; remove loose root';
  return 'review';
}

function commitGroupFor(artifact) {
  const lower = artifact.path.toLowerCase();
  if (lower.includes('graphify')) return 'P9-graphify-regeneration';
  if (/^(src|frontend|client|mobile|extension|test|scripts|sql|deploy|evals|\.github)\//.test(lower)) {
    return 'P8-optional-code-boundary';
  }
  if (lower.startsWith('direction/')) return 'P4-direction-schema-and-state';
  if (['agents.md', 'agent.md', 'claude.md', 'context.md', 'dbs_index.md'].includes(lower) || lower.startsWith('.codex/')) {
    return 'P5-thin-entry-layer';
  }
  if (/prompts?|agent-modules|(^|\/)agents?(\/|$)|(^|\/)skills?(\/|$)/.test(lower)) {
    return 'P7-prompt-and-agent-cleanup';
  }
  if (artifact.disposition === 'DELETE' || artifact.disposition === 'ARCHIVE') return 'P7-history-and-generated-cleanup';
  if (artifact.disposition === 'KEEP' || artifact.disposition === 'REVIEW') return 'P1-baseline-or-review';
  return 'P6-knowledge-migration';
}

function authorityImpactFor(artifact) {
  const lower = artifact.path.toLowerCase();
  if (lower.startsWith('direction/')) return 'current-truth or work-state authority; founder-ratified conversion required';
  if (['agents.md', 'agent.md', 'claude.md'].includes(lower) || lower.includes('/agents.md') || lower.includes('/claude.md')) {
    return 'runtime instruction precedence or delegated authority; cold-start parity required';
  }
  if (lower.startsWith('blueprints/')) return 'approved contract or workflow ownership; preserve accepted meaning and provenance';
  if (lower.startsWith('references/') || lower.includes('graphify')) return 'non-authoritative evidence/view; must remain subordinate to Direction and Blueprints';
  if (lower.startsWith('solutions/')) return 'proposal/evidence only; must not be promoted implicitly';
  if (lower.startsWith('archive/')) return 'historical provenance only; must remain discoverable but inactive';
  if (/^(src|frontend|client|mobile|extension|test|scripts|sql|deploy|evals|\.github)\//.test(lower)) {
    return 'runtime, build, test, CI, or deployment boundary; no path change in the knowledge-migration workstream';
  }
  return 'navigation or ownership may change; validate against accepted authority order';
}

function linkRepairFor(artifact, direction) {
  const keys = direction === 'inbound' ? artifact.inboundKeys : artifact.outboundKeys;
  const count = keys.size;
  const pathChanges = artifact.path !== artifact.proposed_destination && ['MOVE', 'MERGE', 'ARCHIVE', 'DELETE'].includes(artifact.disposition);
  if (count === 0) {
    return pathChanges
      ? 'no direct tracked reference detected; run semantic ripgrep, exact-case link scan, and loader/build validation before change'
      : 'no direct tracked reference detected; retain full validator coverage';
  }
  if (pathChanges) return `repair and validate ${count} detected ${direction} reference(s), then rerun semantic path and exact-case scans`;
  return `validate ${count} detected ${direction} reference(s); no path rewrite is currently proposed`;
}

function rollbackFor(artifact) {
  if (artifact.disposition === 'KEEP' || artifact.disposition === 'REVIEW') return 'no migration mutation; retain baseline commit and recorded review result';
  if (artifact.disposition === 'DELETE') return 'restore exact blob/path from the pre-migration tag or regenerate only after source and version are pinned';
  return 'revert the isolated commit group or restore the old path from the pre-migration tag; preserve record IDs and provenance';
}

function markdownSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractHeadings(text) {
  const slugs = new Set();
  const seen = new Map();
  for (const line of text.split(/\r?\n/)) {
    const match = /^(#{1,6})\s+(.+?)\s*#*$/.exec(line);
    if (!match) continue;
    const base = markdownSlug(match[2]);
    if (!base) continue;
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    slugs.add(count === 0 ? base : `${base}-${count}`);
  }
  return slugs;
}

function extractLinks(text, kind) {
  const links = [];
  const markdown = /!?(?:\[[^\]]*\])\(([^)]+)\)/g;
  for (const match of text.matchAll(markdown)) links.push({ raw: match[1].trim(), syntax: 'markdown' });
  if (kind === 'HTML artifact' || /<a\s/i.test(text)) {
    const html = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
    for (const match of text.matchAll(html)) links.push({ raw: match[1].trim(), syntax: 'html' });
  }
  return links;
}

function extractPathMentions(text) {
  const values = new Set();
  for (const match of text.matchAll(/`([^`\r\n]{1,300})`/g)) {
    if (/[\\/]/.test(match[1]) || /\.(?:md|json|ya?ml|html?|js|mjs|cjs|jsx|ts|tsx|kt|swift|sql|sh|ps1)$/i.test(match[1])) values.add(match[1]);
  }
  const bare = /(?:^|[\s("'])((?:\.{1,2}[\\/])?(?:[A-Za-z0-9_.@-]+[\\/])+[A-Za-z0-9_.@() -]+\.(?:md|json|ya?ml|html?|js|mjs|cjs|jsx|ts|tsx|kt|swift|sql|sh|ps1))/gim;
  for (const match of text.matchAll(bare)) values.add(match[1]);
  return [...values];
}

function stripLinkDecorations(raw) {
  let value = raw.trim().replace(/^<|>$/g, '');
  if (/^['"]/.test(value) && value.at(-1) === value[0]) value = value.slice(1, -1);
  try { value = decodeURIComponent(value); } catch { /* Preserve literal malformed target. */ }
  return value;
}

function parseHistoryDates(root, ref) {
  const output = runGit(root, ['log', ref, '--no-renames', '--format=@@DATE:%cs', '--name-only', '--']);
  const dates = new Map();
  let currentDate = 'unknown';
  for (const rawLine of output.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith('@@DATE:')) {
      currentDate = line.slice('@@DATE:'.length);
      continue;
    }
    const normalized = toPosix(line);
    if (!dates.has(normalized)) dates.set(normalized, currentDate);
  }
  return dates;
}

function simHash(text) {
  const tokens = text.toLowerCase().match(/[\p{L}\p{N}_-]{3,}/gu) ?? [];
  const counts = new Map();
  for (const token of tokens) counts.set(token, Math.min(3, (counts.get(token) ?? 0) + 1));
  const vector = new Int32Array(64);
  for (const [token, weight] of counts) {
    const digest = crypto.createHash('sha1').update(token).digest();
    const value = digest.readBigUInt64BE(0);
    for (let bit = 0n; bit < 64n; bit += 1n) {
      vector[Number(bit)] += (value & (1n << bit)) !== 0n ? weight : -weight;
    }
  }
  let result = 0n;
  for (let bit = 0n; bit < 64n; bit += 1n) if (vector[Number(bit)] >= 0) result |= 1n << bit;
  return { value: result, tokenCount: tokens.length };
}

function hamming(left, right) {
  let value = left ^ right;
  let count = 0;
  while (value) {
    count += 1;
    value &= value - 1n;
  }
  return count;
}

function escapeCell(value) {
  const rendered = value === null || value === undefined ? '' : String(value);
  return rendered.replaceAll('|', '\\|').replaceAll('\r', '').replaceAll('\n', '<br>');
}

function markdownTable(headers, rows) {
  const head = `| ${headers.map(escapeCell).join(' | ')} |`;
  const divider = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${row.map(escapeCell).join(' | ')} |`).join('\n');
  return `${head}\n${divider}\n${body}\n`;
}

function dispositionCounts(artifacts) {
  const counts = {};
  for (const artifact of artifacts) counts[artifact.disposition] = (counts[artifact.disposition] ?? 0) + 1;
  return Object.fromEntries(Object.entries(counts).sort());
}

function typeCounts(artifacts) {
  const counts = {};
  for (const artifact of artifacts) counts[artifact.artifact_type] = (counts[artifact.artifact_type] ?? 0) + 1;
  return Object.fromEntries(Object.entries(counts).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0])));
}

function buildInventoryMarkdown(repo, artifacts, allTracked, duplicateGroups, nearPairs, linkFindings, generatedAt) {
  const roots = new Map();
  for (const file of allTracked) {
    const root = rootName(file.path);
    const entry = roots.get(root) ?? { files: 0, bytes: 0, relevant: 0 };
    entry.files += 1;
    entry.bytes += file.bytes;
    if (file.relevant) entry.relevant += 1;
    roots.set(root, entry);
  }
  const rootRows = [...roots.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([root, stats]) => [root, stats.files, stats.relevant, stats.bytes, rootPurpose(repo.id, root), repo.owner, rootTarget(repo.id, root)]);

  const summaryRows = Object.entries(dispositionCounts(artifacts)).map(([key, value]) => [key, value]);
  const artifactRows = artifacts.map((artifact) => [
    `\`${artifact.path}\``, artifact.filename, artifact.artifact_type, artifact.purpose, artifact.status,
    artifact.authority_claim, artifact.owner, artifact.lines, artifact.bytes, artifact.inbound_references,
    artifact.outbound_references, artifact.duplicate_candidates || 'none detected', artifact.auto_load,
    artifact.currentness, artifact.last_meaningful_relevance, artifact.disposition,
    `\`${artifact.proposed_destination}\``, artifact.move_risk, artifact.validation_needed,
  ]);

  const brokenForRepo = linkFindings.filter((finding) => finding.repository === repo.id);
  const duplicateMembership = duplicateGroups.filter((group) => group.members.some((member) => member.repository === repo.id));
  const nearMembership = nearPairs.filter((pair) => pair.left.repository === repo.id || pair.right.repository === repo.id);
  const commit = runGit(repo.root, ['rev-parse', repo.ref]).trim();
  const branch = runGit(repo.root, ['branch', '--show-current']).trim();

  return `# ${repo.displayName} DBS vNext Inventory\n\n` +
    `> **Status:** DRAFT audit evidence; non-authoritative until founder review.\n` +
    `> **Baseline:** \`${branch}\` at \`${commit}\`.\n` +
    `> **Generated:** ${generatedAt}.\n\n` +
    `## Scope and method\n\n` +
    `This inventory covers all ${allTracked.length.toLocaleString()} tracked paths at the pinned baseline commit and records every ${artifacts.length.toLocaleString()} relevant Markdown, HTML, YAML, JSON, prompt, agent, routing, schema, script/config, and deployment-boundary artifact selected by \`scripts/build-inventory.mjs\`. Audit files are outside that pinned commit and therefore cannot contaminate the source corpus.\n\n` +
    `Reference counts are deterministic direct-link/path detections, not a claim that prose contains no other semantic dependency. Dispositions are evidence-backed migration proposals using only the founder-approved values; \`REVIEW\` means the scan could not safely make a stronger call. No file was moved or deleted.\n\n` +
    `## Completeness summary\n\n` +
    `- Tracked files: **${allTracked.length.toLocaleString()}**\n` +
    `- Relevant text/config artifacts inventoried: **${artifacts.length.toLocaleString()}**\n` +
    `- Exact duplicate groups touching this repository: **${duplicateMembership.length.toLocaleString()}**\n` +
    `- Near-duplicate candidates touching this repository: **${nearMembership.length.toLocaleString()}**\n` +
    `- Broken or case-mismatched local-link findings: **${brokenForRepo.length.toLocaleString()}**\n\n` +
    `### Proposed disposition counts\n\n` + markdownTable(['Disposition', 'Artifacts'], summaryRows) + '\n' +
    `## Root boundaries\n\n` + markdownTable(['Root', 'Tracked files', 'Inventoried artifacts', 'Bytes', 'Current purpose', 'Owner', 'Proposed target state'], rootRows) + '\n' +
    `## Artifact manifest\n\n` +
    `The table below is the implementation-level inventory. Detailed duplicate and link evidence is also preserved under \`data/\`.\n\n` +
    markdownTable([
      'Current path', 'Filename', 'Artifact type', 'Purpose', 'Status', 'Authority claim', 'Owning repository',
      'Lines', 'Bytes', 'Inbound refs', 'Outbound refs', 'Duplicates / near-duplicates', 'Auto-load behavior',
      'Current vs historical', 'Last relevance', 'Disposition', 'Proposed destination', 'Move risk', 'Validation needed',
    ], artifactRows);
}

const args = parseArgs(process.argv);
const outputRoot = path.resolve(args.out);
fs.mkdirSync(outputRoot, { recursive: true });
const dataRoot = path.join(outputRoot, 'data');
fs.mkdirSync(dataRoot, { recursive: true });

const repos = [
  { id: 'slops-os', displayName: 'Slops OS', root: path.resolve(args.slops), ref: args['slops-ref'] ?? 'HEAD', owner: 'justinduverge-design/Slops-OS' },
  { id: 'omen', displayName: 'Omen', root: path.resolve(args.omen), ref: args['omen-ref'] ?? 'HEAD', owner: 'justinduverge-design/omen' },
];

const generatedAt = new Date().toISOString();
const baselineCommitByRepo = new Map(repos.map((repo) => [repo.id, runGit(repo.root, ['rev-parse', repo.ref]).trim()]));
const historyByRepo = new Map(repos.map((repo) => [repo.id, parseHistoryDates(repo.root, repo.ref)]));
const allTrackedByRepo = new Map();
const artifacts = [];

for (const repo of repos) {
  const tracked = runGit(repo.root, ['ls-tree', '-r', '-z', '--name-only', repo.ref], { encoding: 'buffer' })
    .toString('utf8')
    .split('\0')
    .filter(Boolean)
    .map(toPosix);
  const allTracked = [];
  for (const relativePath of tracked) {
    let buffer;
    try { buffer = runGit(repo.root, ['show', `${repo.ref}:${relativePath}`], { encoding: 'buffer' }); } catch { continue; }
    const relevant = isRelevant(relativePath);
    allTracked.push({
      path: relativePath,
      bytes: buffer.length,
      relevant,
      sha256: crypto.createHash('sha256').update(buffer).digest('hex'),
    });
    if (!relevant) continue;
    if (isProbablyBinary(buffer)) continue;
    const text = buffer.toString('utf8');
    const claim = authorityClaim(text, relativePath);
    const mapping = repo.id === 'slops-os' ? slopsDisposition(relativePath) : omenDisposition(relativePath);
    artifacts.push({
      key: `${repo.id}:${relativePath}`,
      repository: repo.id,
      repository_display: repo.displayName,
      repository_root: repo.root,
      owner: repo.owner,
      path: relativePath,
      filename: path.posix.basename(relativePath),
      bytes: buffer.length,
      lines: countLines(text),
      text,
      artifact_type: artifactType(relativePath),
      purpose: purposeFor(relativePath),
      status: statusFor(relativePath, claim),
      authority_claim: claim,
      currentness: currentness(relativePath, claim),
      last_meaningful_relevance: historyByRepo.get(repo.id).get(relativePath) ?? 'not found in reachable history',
      inboundKeys: new Set(),
      outboundKeys: new Set(),
      inboundCodeKeys: new Set(),
      duplicateLabels: new Set(),
      disposition: mapping.disposition,
      proposed_destination: mapping.destination,
      move_risk: mapping.risk,
      validation_needed: mapping.validation,
      disposition_reason: mapping.reason,
      headings: extractHeadings(text),
      normalizedHash: crypto.createHash('sha256').update(text.replace(/\r\n/g, '\n').trim()).digest('hex'),
    });
  }
  allTrackedByRepo.set(repo.id, allTracked);
}

const artifactByKey = new Map(artifacts.map((artifact) => [artifact.key, artifact]));
const exactPathMaps = new Map();
const lowerPathMaps = new Map();
for (const repo of repos) {
  exactPathMaps.set(repo.id, new Map());
  lowerPathMaps.set(repo.id, new Map());
  for (const tracked of allTrackedByRepo.get(repo.id)) {
    const target = { repository: repo.id, path: tracked.path, key: `${repo.id}:${tracked.path}` };
    exactPathMaps.get(repo.id).set(tracked.path, target);
    lowerPathMaps.get(repo.id).set(tracked.path.toLowerCase(), target);
  }
}

function resolveCandidate(source, rawValue) {
  const value = stripLinkDecorations(rawValue);
  if (!value || /^(?:https?|mailto|tel|data|javascript):/i.test(value)) return { external: true };
  const hashIndex = value.indexOf('#');
  const targetPart = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
  const anchor = hashIndex >= 0 ? value.slice(hashIndex + 1) : '';
  if (!targetPart) return { key: source.key, anchor, exactCase: true };
  if (/^[A-Za-z]:[\\/]/.test(targetPart)) return { absoluteMachinePath: true };
  if (targetPart.startsWith('/') && !/\.[A-Za-z0-9]{1,8}$/.test(targetPart)) return { applicationRoute: true };

  let repoId = source.repository;
  let candidate = toPosix(targetPart.replace(/^\/+/, ''));
  if (repoId === 'slops-os' && candidate.toLowerCase().startsWith('slops-saloon/omen/')) {
    repoId = 'omen';
    candidate = candidate.slice('slops-saloon/omen/'.length);
  } else if (repoId === 'omen' && /^(?:\.\.\/){2}(?:Blueprints|Direction|References|Solutions|Archive)\//i.test(candidate)) {
    repoId = 'slops-os';
    candidate = candidate.replace(/^(?:\.\.\/){2}/, '');
  } else if (!candidate.startsWith('../')) {
    const sourceDir = path.posix.dirname(source.path);
    candidate = path.posix.normalize(path.posix.join(sourceDir, candidate));
  } else {
    candidate = path.posix.normalize(path.posix.join(path.posix.dirname(source.path), candidate));
  }
  candidate = candidate.replace(/^\.\//, '');
  const attempts = [candidate];
  if (!path.posix.extname(candidate)) attempts.push(`${candidate}.md`, `${candidate}/README.md`);
  for (const attempt of attempts) {
    const exact = exactPathMaps.get(repoId)?.get(attempt);
    if (exact) return { ...exact, targetExists: true, anchor, exactCase: true, attempted: attempt };
    const insensitive = lowerPathMaps.get(repoId)?.get(attempt.toLowerCase());
    if (insensitive) return { ...insensitive, targetExists: true, anchor, exactCase: false, attempted: attempt };
  }
  return { missing: true, repository: repoId, attempted: attempts[0], anchor };
}

const linkFindings = [];
for (const source of artifacts) {
  const codeLike = /(?:script|loader|product runtime prompt|CI workflow|package\/build)/i.test(source.artifact_type) || /\.(?:js|mjs|cjs|jsx|ts|tsx|kt|swift)$/i.test(source.path);
  const actualLinks = extractLinks(source.text, source.artifact_type);
  const mentions = [...actualLinks.map((item) => item.raw), ...extractPathMentions(source.text)];
  for (const raw of mentions) {
    const resolved = resolveCandidate(source, raw);
    if (resolved.targetExists) {
      source.outboundKeys.add(resolved.key);
      if (artifactByKey.has(resolved.key)) {
        const target = artifactByKey.get(resolved.key);
        target.inboundKeys.add(source.key);
        if (codeLike) target.inboundCodeKeys.add(source.key);
      }
    }
  }
  for (const link of actualLinks) {
    const resolved = resolveCandidate(source, link.raw);
    if (resolved.external || resolved.applicationRoute || resolved.absoluteMachinePath) continue;
    if (resolved.missing) {
      linkFindings.push({
        repository: source.repository,
        source: source.path,
        raw_target: link.raw,
        resolved_repository: resolved.repository,
        resolved_target: resolved.attempted,
        finding: 'missing local target',
      });
      continue;
    }
    if (resolved.targetExists && !resolved.exactCase) {
      linkFindings.push({
        repository: source.repository,
        source: source.path,
        raw_target: link.raw,
        resolved_repository: resolved.repository,
        resolved_target: resolved.path,
        finding: 'case mismatch (works on Windows, may fail on case-sensitive CI)',
      });
    }
    if (resolved.targetExists && resolved.anchor && artifactByKey.has(resolved.key)) {
      const target = artifactByKey.get(resolved.key);
      const anchor = markdownSlug(resolved.anchor);
      if (anchor && !target.headings.has(anchor)) {
        linkFindings.push({
          repository: source.repository,
          source: source.path,
          raw_target: link.raw,
          resolved_repository: target.repository,
          resolved_target: target.path,
          finding: 'missing target anchor',
        });
      }
    }
  }
}

const hashGroups = new Map();
for (const artifact of artifacts) {
  const group = hashGroups.get(artifact.normalizedHash) ?? [];
  group.push(artifact);
  hashGroups.set(artifact.normalizedHash, group);
}
const duplicateGroups = [...hashGroups.entries()]
  .filter(([, members]) => members.length > 1)
  .map(([sha256, members], index) => ({
    id: `DUP-${String(index + 1).padStart(4, '0')}`,
    normalized_sha256: sha256,
    members: members.map((member) => ({ repository: member.repository, path: member.path, bytes: member.bytes })),
  }));
for (const group of duplicateGroups) {
  for (const member of group.members) artifactByKey.get(`${member.repository}:${member.path}`)?.duplicateLabels.add(group.id);
}

const allFileHashGroups = new Map();
for (const repo of repos) {
  for (const tracked of allTrackedByRepo.get(repo.id)) {
    const group = allFileHashGroups.get(tracked.sha256) ?? [];
    group.push({ repository: repo.id, path: tracked.path, bytes: tracked.bytes });
    allFileHashGroups.set(tracked.sha256, group);
  }
}
const allFileExactDuplicates = [...allFileHashGroups.entries()]
  .filter(([, members]) => members.length > 1)
  .map(([sha256, members], index) => ({
    id: `ALL-DUP-${String(index + 1).padStart(4, '0')}`,
    sha256,
    members,
  }));

const nearCandidates = artifacts
  .filter((artifact) => /Markdown|instruction wrapper|workflow prompt|decision|handoff|review or audit/i.test(artifact.artifact_type))
  .filter((artifact) => artifact.bytes >= 300 && artifact.bytes <= 250_000)
  .map((artifact) => ({ artifact, ...simHash(artifact.text) }))
  .filter((entry) => entry.tokenCount >= 50);
const nearPairs = [];
for (let leftIndex = 0; leftIndex < nearCandidates.length; leftIndex += 1) {
  const left = nearCandidates[leftIndex];
  for (let rightIndex = leftIndex + 1; rightIndex < nearCandidates.length; rightIndex += 1) {
    const right = nearCandidates[rightIndex];
    if (left.artifact.normalizedHash === right.artifact.normalizedHash) continue;
    const ratio = Math.min(left.tokenCount, right.tokenCount) / Math.max(left.tokenCount, right.tokenCount);
    if (ratio < 0.72) continue;
    const distance = hamming(left.value, right.value);
    if (distance > 5) continue;
    nearPairs.push({
      similarity: Number((1 - distance / 64).toFixed(4)),
      hamming_distance: distance,
      length_ratio: Number(ratio.toFixed(4)),
      left: { repository: left.artifact.repository, path: left.artifact.path },
      right: { repository: right.artifact.repository, path: right.artifact.path },
    });
  }
}
nearPairs.sort((left, right) => right.similarity - left.similarity || right.length_ratio - left.length_ratio || left.left.path.localeCompare(right.left.path));
const boundedNearPairs = nearPairs.slice(0, 500);
for (let index = 0; index < boundedNearPairs.length; index += 1) {
  const pair = boundedNearPairs[index];
  const label = `NEAR-${String(index + 1).padStart(4, '0')}`;
  pair.id = label;
  artifactByKey.get(`${pair.left.repository}:${pair.left.path}`)?.duplicateLabels.add(label);
  artifactByKey.get(`${pair.right.repository}:${pair.right.path}`)?.duplicateLabels.add(label);
}

for (const artifact of artifacts) {
  artifact.inbound_references = artifact.inboundKeys.size;
  artifact.outbound_references = artifact.outboundKeys.size;
  artifact.duplicate_candidates = [...artifact.duplicateLabels].sort().join(', ');
  artifact.auto_load = autoLoadBehavior(artifact.path, artifact.inboundCodeKeys.size > 0);
}

const serializableArtifacts = artifacts.map((artifact) => ({
  repository: artifact.repository,
  current_path: artifact.path,
  filename: artifact.filename,
  artifact_type: artifact.artifact_type,
  purpose: artifact.purpose,
  status: artifact.status,
  authority_claim: artifact.authority_claim,
  owning_repository: artifact.owner,
  line_count: artifact.lines,
  file_size_bytes: artifact.bytes,
  inbound_references: artifact.inbound_references,
  outbound_references: artifact.outbound_references,
  inbound_reference_paths: [...artifact.inboundKeys].sort(),
  outbound_reference_paths: [...artifact.outboundKeys].sort(),
  apparent_duplicates: artifact.duplicate_candidates || [],
  auto_load_behavior: artifact.auto_load,
  current_vs_historical: artifact.currentness,
  last_meaningful_relevance: artifact.last_meaningful_relevance,
  proposed_disposition: artifact.disposition,
  proposed_destination: artifact.proposed_destination,
  risk_of_moving: artifact.move_risk,
  validation_needed: artifact.validation_needed,
  disposition_reason: artifact.disposition_reason,
}));

const migrationManifest = artifacts.map((artifact) => ({
  repository: artifact.repository,
  baseline_commit: baselineCommitByRepo.get(artifact.repository),
  old_path: artifact.path,
  new_path: artifact.proposed_destination,
  disposition: artifact.disposition,
  reason: artifact.disposition_reason,
  authority_impact: authorityImpactFor(artifact),
  inbound_link_repair: linkRepairFor(artifact, 'inbound'),
  inbound_reference_paths: [...artifact.inboundKeys].sort(),
  outbound_link_repair: linkRepairFor(artifact, 'outbound'),
  outbound_reference_paths: [...artifact.outboundKeys].sort(),
  validation_required: artifact.validation_needed,
  risk: artifact.move_risk,
  rollback_approach: rollbackFor(artifact),
  proposed_commit_group: commitGroupFor(artifact),
  founder_ratification_required: artifact.disposition !== 'KEEP',
}));

const summary = {
  generated_at: generatedAt,
  repositories: {},
  exact_duplicate_groups: duplicateGroups.length,
  all_tracked_exact_duplicate_groups: allFileExactDuplicates.length,
  near_duplicate_candidates: boundedNearPairs.length,
  local_link_findings: linkFindings.length,
};
for (const repo of repos) {
  const repoArtifacts = artifacts.filter((artifact) => artifact.repository === repo.id);
  const allTracked = allTrackedByRepo.get(repo.id);
  summary.repositories[repo.id] = {
    path: repo.root,
    branch: runGit(repo.root, ['branch', '--show-current']).trim(),
    commit: baselineCommitByRepo.get(repo.id),
    tracked_files: allTracked.length,
    inventoried_artifacts: repoArtifacts.length,
    disposition_counts: dispositionCounts(repoArtifacts),
    artifact_type_counts: typeCounts(repoArtifacts),
    root_counts: Object.fromEntries([...new Set(allTracked.map((item) => rootName(item.path)))].sort().map((root) => [root, allTracked.filter((item) => rootName(item.path) === root).length])),
  };
}

writeJson(path.join(dataRoot, 'artifact-inventory.json'), serializableArtifacts);
writeJson(path.join(dataRoot, 'migration-manifest.json'), migrationManifest);
writeJson(path.join(dataRoot, 'inventory-summary.json'), summary);
writeJson(path.join(dataRoot, 'exact-duplicates.json'), duplicateGroups);
writeJson(path.join(dataRoot, 'all-file-exact-duplicates.json'), allFileExactDuplicates);
writeJson(path.join(dataRoot, 'near-duplicates.json'), boundedNearPairs);
writeJson(path.join(dataRoot, 'link-findings.json'), linkFindings);

for (const repo of repos) {
  const repoArtifacts = artifacts.filter((artifact) => artifact.repository === repo.id).sort((left, right) => left.path.localeCompare(right.path));
  const targetName = repo.id === 'slops-os' ? 'slops-os-inventory.md' : 'omen-inventory.md';
  fs.writeFileSync(
    path.join(outputRoot, targetName),
    buildInventoryMarkdown(repo, repoArtifacts, allTrackedByRepo.get(repo.id), duplicateGroups, boundedNearPairs, linkFindings, generatedAt),
    'utf8',
  );
}

process.stdout.write(`${stableJson(summary)}`);
