const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports });
  return exports;
}
const { MODELS, totalModels } = load('data/models.ts');
const { TAXONOMY } = load('data/taxonomy.ts');
const { APPLICATIONS } = load('data/applications.ts');
const entries = Object.values(MODELS).flatMap(groups => Object.values(groups).flat());
const byId = new Map(entries.map(m => [m.id, m]));
const paths = new Set(TAXONOMY.flatMap(c => c.subcategories.map(s => `${c.slug}/${s.slug}`)));
const tasks = new Set(TAXONOMY.flatMap(c => c.subcategories.map(s => s.slug)));

test('every entry has a unique identity and a navigable taxonomy location', () => {
  assert.equal(byId.size, entries.length);
  assert.equal(totalModels(), entries.length);
  for (const [cat, groups] of Object.entries(MODELS)) for (const [sub, models] of Object.entries(groups)) {
    assert(paths.has(`${cat}/${sub}`));
    for (const m of models) assert(m.tasks.includes(sub));
  }
  for (const p of paths) { const [cat, sub] = p.split('/'); assert(MODELS[cat]?.[sub]?.length); }
});

test('evidence labels and measurements have supporting references', () => {
  for (const m of entries) {
    assert(m.sources.length, m.id);
    for (const source of m.sources) assert.equal(new URL(source.url).protocol, 'https:');
    assert(m.tasks.every(task => tasks.has(task)), m.id);
    if (m.browserEvidence.status !== 'pending') {
      assert(m.browserEvidence.url && m.browserEvidence.reviewedAt, m.id);
      assert(m.sources.some(s => s.url === m.browserEvidence.url && s.reviewedAt), m.id);
    }
    if (m.browserEvidence.status === 'tested') assert(m.benchmarks?.length, m.id);
    for (const b of m.benchmarks || []) {
      for (const key of ['date', 'browser', 'os', 'hardware', 'runtimeVersion', 'backend', 'input', 'metric', 'unit', 'sourceUrl']) assert(b[key], `${m.id}: ${key}`);
      assert(m.variants.some(v => v.id === b.variantId));
      assert(Number.isFinite(b.value));
    }
    assert.equal(new Set(m.variants.map(v => v.id)).size, m.variants.length);
  }
});

test('known identity and license corrections cannot regress', () => {
  assert(MODELS['search-rag'].embedding.some(m => m.id === 'instructor-xl'));
  assert(!MODELS.llm['structured-output'].some(m => m.id === 'instructor-xl'));
  assert.equal(byId.get('nllb-200').weightLicense, 'cc-by-nc-4-0');
  assert.equal(byId.get('jsonformer-llama').kind, 'tool');
  assert.equal(byId.get('jsonformer-llama').variants.length, 0);
  assert.equal(byId.get('tesseractjs').framework, 'tesseract-wasm');
  assert.equal(byId.get('voyager-wasm').docsUrl, 'https://github.com/spotify/voyager');
  const hd = byId.get('imgly-bg-removal-hd');
  assert(hd.identityUnresolved);
  assert.equal(hd.weightLicense, undefined);
  assert.equal(hd.reportedLicense, undefined);
  assert.equal(hd.variants.length, 0);
  assert.equal(byId.get('imgly-bg-removal').variants.length, 2);
  assert(!byId.has('imgly-bg-removal-balanced'));
});

test('application guides only link to existing tasks and identifiable candidates', () => {
  for (const app of APPLICATIONS) {
    assert(app.tasks.every(p => paths.has(p)), app.id);
    for (const id of app.entries) { assert(byId.has(id), id); assert(!byId.get(id).identityUnresolved, id); }
  }
});

// Verified dead (404) or moved upstream on 2026-10-03. Re-adding one ships a broken
// link in the comparison table, so fail here instead.
const RETIRED_URLS = new Map([
  ['https://xenova.github.io/transformers.js/', '404 — demo site retired, drop the demo link'],
  ['https://github.com/coqui-ai/XTTS', '404 — use https://huggingface.co/coqui/XTTS-v2'],
  ['https://github.com/PeterWang1/MI-GAN', '404 — use https://github.com/Picsart-AI-Research/MI-GAN'],
  ['https://github.com/ifzhang/ByteTrack', 'moved to FoundationVision/ByteTrack'],
  ['https://github.com/ggerganov/whisper.cpp', 'moved to ggml-org/whisper.cpp'],
  ['https://github.com/riffusion/riffusion', 'moved to riffusion/riffusion-hobby'],
  ['https://whisper.ggerganov.com/', 'moved to https://ggml.ai/whisper.cpp/'],
  ['https://developers.google.com/mediapipe', 'moved to /edge/mediapipe/solutions/guide'],
  ['https://github.com/nmslib/hnswlib', 'upstream C++ project, not the browser port'],
  ['https://www.toolgarden.xyz', 'use the bare domain, as every other entry does'],
]);

test('retired and relocated links stay out of the catalog', () => {
  for (const m of entries) {
    const urls = [m.docsUrl, m.demoUrl, m.demoBase, m.browserEvidence.url,
      ...m.sources.map(s => s.url),
      ...m.variants.flatMap(v => [v.artifactUrl, v.demoBase])];
    for (const url of urls) assert(!RETIRED_URLS.has(url), `${m.id}: ${url} — ${RETIRED_URLS.get(url)}`);
  }
});

// A framework's landing page documents the runtime, not the entry. Every identified
// entry needs at least one reference that is specific to it.
const FRAMEWORK_HUBS = new Set([
  'https://huggingface.co/docs/transformers.js',
  'https://developers.google.com/edge/mediapipe/solutions/guide',
  'https://onnxruntime.ai/docs/',
  'https://github.com/mlc-ai/web-llm',
  'https://github.com/tensorflow/tfjs-models',
]);

test('identified entries cite something more specific than a framework landing page', () => {
  for (const m of entries) {
    if (m.identityUnresolved) continue;
    assert(m.sources.some(s => !FRAMEWORK_HUBS.has(s.url)), `${m.id}: only framework landing pages cited`);
    assert(!FRAMEWORK_HUBS.has(m.docsUrl), `${m.id}: docsUrl is a framework landing page`);
  }
});
