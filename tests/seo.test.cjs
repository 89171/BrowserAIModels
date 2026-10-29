const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// The transpiled file is evaluated on its own, so `@/…` imports have to be
// resolved here rather than by Node's loader.
function load(file, deps = {}) {
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText,
    { exports, require: (id) => (deps[id] ? load(deps[id], deps) : require(id)) },
    { filename: file },
  );
  return exports;
}

const { taskFacts, formatMib, formatGib, taskKeywords, modelKeywords, homeKeywords } = load(
  'lib/seo.ts',
  { '@/lib/model-size': 'lib/model-size.ts' },
);

const entry = (overrides) => ({
  id: 'x',
  name: 'X',
  description: '',
  kind: 'model',
  framework: 'transformersjs',
  tasks: [],
  naturalLanguages: [],
  programmingLanguages: [],
  capabilities: [],
  variants: [],
  sources: [],
  browserEvidence: { status: 'pending' },
  ...overrides,
});

test('formatMib keeps a decimal below 100 and rounds above it', () => {
  assert.equal(formatMib(4.5 * 1024 * 1024), '4.5');
  assert.equal(formatMib(198 * 1024 * 1024), '198');
  assert.equal(formatMib(undefined), undefined);
  assert.equal(formatMib(0), undefined);
});

test('formatGib switches units at a gigabyte', () => {
  assert.equal(formatGib(512 * 1024 * 1024), '512 MiB');
  assert.equal(formatGib(2.5 * 1024 * 1024 * 1024), '2.5 GB');
});

test('taskFacts counts kinds, evidence and the smallest verified weight', () => {
  const facts = taskFacts([
    entry({
      id: 'a',
      browserEvidence: { status: 'tested' },
      variants: [{ id: 'v', label: 'default', downloadBytes: 40 * 1024 * 1024 }],
    }),
    entry({
      id: 'b',
      kind: 'tool',
      framework: 'onnxruntime-web',
      browserEvidence: { status: 'upstream-example' },
      variants: [{ id: 'v', label: 'default', downloadBytes: 12 * 1024 * 1024 }],
    }),
    entry({ id: 'c', kind: 'application', framework: 'onnxruntime-web' }),
  ]);

  assert.equal(facts.total, 3);
  assert.equal(facts.models, 1);
  assert.equal(facts.tools, 1);
  assert.equal(facts.apps, 1);
  assert.equal(facts.tested, 1);
  assert.equal(facts.upstream, 1);
  assert.equal(facts.pending, 1);
  assert.equal(facts.ready, 2);
  assert.equal(facts.smallestBytes, 12 * 1024 * 1024);
  // Objects come from the transpiled module's own realm, so compare primitives.
  assert.equal(
    facts.frameworks.map((framework) => `${framework.id}:${framework.count}`).join(','),
    'onnxruntime-web:2,transformersjs:1',
  );
});

test('an entry with no recorded size reports none rather than zero', () => {
  const facts = taskFacts([entry({ id: 'a' })]);
  assert.equal(facts.smallestBytes, undefined);
  assert.equal(facts.pending, 1);
});

test('keywords cover the long-tail phrasings without duplicates', () => {
  const entries = [entry({ id: 'a', name: 'BERT' }), entry({ id: 'b', name: 'GLiNER' })];
  const zh = taskKeywords('zh', '命名实体识别', '文本', entries);
  const en = taskKeywords('en', 'ner', 'text', entries);

  for (const list of [zh, en]) {
    assert.equal(new Set(list).size, list.length, 'duplicate keyword');
    assert(list.length >= 10, 'too few keywords to be useful');
    assert(list.every((keyword) => keyword.trim().length > 0), 'blank keyword');
  }
  assert(zh.some((keyword) => keyword.includes('在浏览器中运行 命名实体识别')));
  assert(en.some((keyword) => keyword.includes('run ner in the browser')));
  assert(zh.includes('BERT') && en.includes('GLiNER'));
});

test('model keywords carry size and runtime when they are known', () => {
  const model = entry({ name: 'Whisper base', variants: [{ id: 'v', label: 'default', downloadBytes: 42 * 1024 * 1024 }] });
  const zh = modelKeywords('zh', 'Whisper base', '音频', '语音识别', model, 'Transformers.js');
  assert(zh.includes('Whisper base 42.0 MiB'));
  assert(zh.some((keyword) => keyword.includes('Transformers.js')));
});

test('home keywords exist in both locales', () => {
  assert(homeKeywords('zh').length >= 8);
  assert(homeKeywords('en').length >= 8);
  assert.notDeepEqual(homeKeywords('zh'), homeKeywords('en'));
});
