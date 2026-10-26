const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file) {
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText,
    { exports },
    { filename: file },
  );
  return exports;
}

const { DEMOS, allDemoPaths, hasDemo } = load('lib/data/registry.ts');
const { TAXONOMY } = load('data/taxonomy.ts');

const catalogueTasks = new Set(
  TAXONOMY.flatMap((c) => c.subcategories.map((s) => `${c.slug}/${s.slug}`)),
);
const demoTasks = new Set(allDemoPaths().map(({ category, subcategory }) => `${category}/${subcategory}`));

// Tasks the demo registry carries that the catalogue has no page for: extractive
// QA and open-vocabulary detection are demo-only.
const DEMO_ONLY = new Set(['text/question-answering', 'vision/zero-shot-detection']);

test('every demo page is reachable from the catalogue taxonomy', () => {
  for (const task of demoTasks) {
    assert(catalogueTasks.has(task) || DEMO_ONLY.has(task), `demo without a catalogue task: ${task}`);
  }
});

test('every catalogue task except audio/vad ships a demo page', () => {
  for (const task of catalogueTasks) {
    if (task === 'audio/vad') {
      assert.equal(hasDemo('audio', 'vad'), false, 'audio/vad unexpectedly gained a demo');
      continue;
    }
    assert(demoTasks.has(task), `missing demo for ${task}`);
  }
});

test('each demo spec declares the category and subcategory it is filed under', () => {
  for (const [category, subcategories] of Object.entries(DEMOS)) {
    for (const [subcategory, spec] of Object.entries(subcategories)) {
      assert.equal(spec.category, category, `${category}/${subcategory}: category mismatch`);
      assert.equal(spec.subcategory, subcategory, `${category}/${subcategory}: subcategory mismatch`);
      assert(spec.samples.length > 0, `${category}/${subcategory}: no samples`);
      assert(spec.tagline.zh && spec.tagline.en, `${category}/${subcategory}: tagline is not bilingual`);
      assert(spec.task.zh && spec.task.en, `${category}/${subcategory}: task is not bilingual`);
    }
  }
});

test('no catalogue subcategory is listed twice for the same demo', () => {
  const seen = new Set();
  for (const { category, subcategory } of allDemoPaths()) {
    const key = `${category}/${subcategory}`;
    assert(!seen.has(key), `duplicate demo route: ${key}`);
    seen.add(key);
  }
});
