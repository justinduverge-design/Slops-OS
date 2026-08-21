import assert from 'node:assert/strict';
import { mkdtemp, cp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { loadSchema, scanValorBrainTree, validateValorBrainFile } from './validate.mjs';

const FIXTURES = new URL('./fixtures/', import.meta.url);
const SCHEMA = new URL('../../specs/valor-brain-page.schema.json', import.meta.url);

test('accepts a valid opted-in Valor Brain page', async () => {
  const schema = await loadSchema(SCHEMA);
  const result = await validateValorBrainFile(new URL('valid.md', FIXTURES), schema);

  assert.deepEqual(result.errors, []);
  assert.equal(result.metadata.metadata_profile, 'valor-brain/v1');
  assert.equal(result.metadata.state.task, 'IN_PROGRESS');
});

test('rejects metadata that violates the schema', async () => {
  const schema = await loadSchema(SCHEMA);
  const result = await validateValorBrainFile(new URL('invalid-metadata.md', FIXTURES), schema);

  assert.ok(result.errors.some(error => error.path === '$.sources'));
  assert.ok(result.errors.some(error => error.path === '$.state.task'));
});

test('rejects an opted-in page without compiled truth and an append-only timeline', async () => {
  const schema = await loadSchema(SCHEMA);
  const result = await validateValorBrainFile(new URL('invalid-body.md', FIXTURES), schema);

  assert.ok(result.errors.some(error => error.code === 'missing-compiled-truth'));
  assert.ok(result.errors.some(error => error.code === 'missing-append-only-timeline'));
});

test('tree scan ignores ordinary Markdown and reports only opted-in failures', async () => {
  const root = await mkdtemp(join(tmpdir(), 'valor-brain-validator-'));
  await cp(new URL('valid.md', FIXTURES), join(root, 'valid.md'));
  await cp(new URL('invalid-body.md', FIXTURES), join(root, 'invalid-body.md'));
  await writeFile(join(root, 'ordinary.md'), '# Ordinary Markdown\n', 'utf8');

  const result = await scanValorBrainTree(root, { schemaPath: SCHEMA });

  assert.equal(result.scanned, 2);
  assert.equal(result.valid, 1);
  assert.equal(result.invalid, 1);
  assert.equal(result.files[0].path.endsWith('invalid-body.md'), true);
});

test('tree scan rejects duplicate page IDs', async () => {
  const root = await mkdtemp(join(tmpdir(), 'valor-brain-duplicate-id-'));
  await cp(new URL('valid.md', FIXTURES), join(root, 'first.md'));
  await cp(new URL('valid.md', FIXTURES), join(root, 'second.md'));

  const result = await scanValorBrainTree(root, { schemaPath: SCHEMA });

  assert.equal(result.scanned, 2);
  assert.equal(result.valid, 0);
  assert.equal(result.invalid, 2);
  assert.ok(result.files.every(file => file.errors.some(error => error.code === 'duplicate-page-id')));
});
