const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, modules = {}, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, {
    exports, require: (name) => modules[name] ?? (name === './matting' ? load('lib/engine/matting.ts') : {}), console, setTimeout, Float32Array,
    URL, performance, ...globals,
  }, { filename: file });
  return exports;
}
const spec = (repo = 'test/model', task = 'text-classification') => ({ repo, task, dtype: 'q8', note: { zh: '', en: '' } });
function runtime(mod, gpu = false) {
  return load('lib/engine/real.ts', { '@huggingface/transformers': { env: {}, ...mod }, './matting': { MATTE_SPECS: {} } }, {
    navigator: gpu ? { gpu: {} } : {}, fetch: async () => ({ ok: false }),
  });
}

test('every real mapping resolves to a demo and NER models are reachable', () => {
  const { DEMOS } = load('lib/data/registry.ts');
  const { REAL_MODELS, realSpecFor } = load('lib/data/real-models.ts', { '../engine/mediapipe': { MP_URL: {} } });
  for (const key of Object.keys(REAL_MODELS)) {
    const [category, subcategory] = key.split('/');
    assert(DEMOS[category]?.[subcategory], key);
  }
  assert.equal(realSpecFor('text', 'ner', 'bert-base-ner').task, 'token-classification');
  for (const model of Object.values(REAL_MODELS)) if (model.task === 'document-question-answering') assert.match(model.repo, /docvqa/);
});

test('classification uses top_k and retains all toxicity labels', async () => {
  const r = runtime({ pipeline: async () => async (_, options) => {
    assert.equal(options.top_k, null);
    return [{ label: 'toxic', score: 0.8 }, { label: 'insult', score: 0.6 }];
  } });
  const out = await r.classifyText('text', { spec: spec('test/toxic') });
  assert.equal(out.labels.length, 2);
});

test('reranking includes the candidate text and preserves distinct single-logit scores', async () => {
  const seen = [];
  const r = runtime({
    AutoTokenizer: { from_pretrained: async () => (queries, options) => {
      assert.equal(queries.length, options.text_pair.length);
      seen.push(...options.text_pair);
      return { docs: options.text_pair };
    } },
    AutoModelForSequenceClassification: { from_pretrained: async () => Object.assign(async ({ docs }) => ({
      logits: { dims: [docs.length, 1], data: docs.map((doc) => doc === 'relevant' ? 3 : -3), dispose() {} },
    }), { dispose: async () => {} }) },
    pipeline: async () => { throw new Error('Generic classification must not be used for ranking'); },
  });
  const out = await r.scorePairs('query', ['irrelevant', 'relevant'], { spec: spec() });
  assert.deepEqual(seen, ['irrelevant', 'relevant']);
  assert(out.scores[1] > out.scores[0]);
  assert(out.scores[1] < 1);
});

test('BGE uses CLS; normalization toggle and query-only prefix are respected', async () => {
  const calls = [];
  const r = runtime({ pipeline: async () => async (lines, options) => {
    calls.push({ lines, options });
    return { dims: [lines.length, 2], data: new Float32Array(lines.flatMap(() => [3, 4])) };
  } });
  const options = { spec: spec('Xenova/bge-small-en-v1.5', 'feature-extraction'), normalize: false };
  const out = await r.embedLines(['hello'], options);
  assert.equal(calls[0].options.pooling, 'cls');
  assert.equal(calls[0].options.normalize, false);
  assert.deepEqual(Array.from(out.vectors[0]), [3, 4]);
  await r.rankByEmbedding('query', ['document'], options);
  assert.match(calls[1].lines[0], /^Represent this sentence/);
  assert.equal(calls[1].lines[1], 'document');
  assert.equal(calls[1].options.normalize, true);
});

test('Whisper auto language is omitted and long audio uses overlapping chunks', async () => {
  const calls = [];
  const r = runtime({ pipeline: async () => async (_, options) => {
    calls.push(options);
    return { text: 'ok', chunks: [{ timestamp: [2, null], text: 'ok' }] };
  } });
  const out = await r.transcribeAudio('blob:audio', { spec: spec(), timestamps: true });
  assert.equal(calls[0].language, undefined);
  assert.equal(calls[0].chunk_length_s, 30);
  assert.equal(calls[0].stride_length_s, 5);
  assert.equal(calls[0].return_timestamps, 'word');
  assert(out.segments[0].end >= out.segments[0].start);
  await r.transcribeAudio('blob:audio', { spec: spec(), language: 'zh', timestamps: false });
  assert.equal(calls[1].language, 'zh');
  assert.equal(calls[1].return_timestamps, false);
});

test('execution failure retries on WASM, disposes GPU and remembers the failed backend', async () => {
  const loads = [], disposed = [];
  const r = runtime({ pipeline: async (_, repo, { device }) => {
    loads.push(device);
    return Object.assign(async () => {
      if (device === 'webgpu') throw new Error('GPU device lost');
      return [{ label: 'ok', score: 1 }];
    }, { dispose: async () => disposed.push(device) });
  } }, true);
  const first = await r.classifyText('hello', { spec: spec() });
  assert.equal(first.meta.device, 'wasm');
  await r.classifyText('again', { spec: spec() });
  assert.deepEqual(loads, ['webgpu', 'wasm']);
  assert.deepEqual(disposed, ['webgpu']);
});

test('model cache is bounded and clearRuntimeCache releases allocations', async () => {
  const disposed = [];
  const r = runtime({ pipeline: async (_, repo) => Object.assign(async () => [{ label: repo, score: 1 }], { dispose: async () => disposed.push(repo) }) });
  for (const repo of ['one', 'two', 'three']) await r.classifyText('test', { spec: spec(repo) });
  assert.deepEqual(disposed, ['one']);
  await r.clearRuntimeCache();
  assert.deepEqual(disposed.sort(), ['one', 'three', 'two']);
});

test('detection, language pairs and strict schema validation reject ambiguous inputs', () => {
  const c = load('lib/engine/contracts.ts');
  assert.deepEqual(Array.from(c.splitDetectionQueries('a person, a car，a cup\n a desk')), ['a person', 'a car', 'a cup', 'a desk']);
  assert.equal(c.translationDirection('hello', 'en', 'zh').repo, 'Xenova/opus-mt-en-zh');
  assert.equal(c.translationDirection('你好', 'auto', 'en').repo, 'Xenova/opus-mt-zh-en');
  assert.throws(() => c.translationDirection('bonjour', 'fr', 'en'));
  assert.throws(() => c.validateStructured({ raw: 'not json' }, 'job'));
  const valid = { title: 'Engineer', location: '', seniority: '', skills: ['TS'], salary: '', remote: true };
  c.validateStructured(valid, 'job');
  assert.throws(() => c.validateStructured({ ...valid, remote: 'true' }, 'job'));
  assert.throws(() => c.validateStructured({ ...valid, extra: 1 }, 'job'));
});

test('obsolete queued work is skipped and running results are marked stale', async () => {
  const { LatestRun } = load('lib/engine/latest-run.ts');
  const runs = new LatestRun();
  let finish;
  const first = runs.begin();
  const one = runs.enqueue(first, () => new Promise((resolve) => { finish = resolve; }));
  await Promise.resolve();
  let skipped = false;
  const second = runs.begin();
  const two = runs.enqueue(second, async () => { skipped = true; });
  const third = runs.begin();
  const three = runs.enqueue(third, async () => 'latest');
  finish('old');
  assert.equal(await one, 'old');
  await two;
  assert.equal(skipped, false);
  assert.equal(runs.current(first), false);
  assert.equal(await three, 'latest');
  assert.equal(runs.current(third), true);
});

test('output cleanup revokes generated audio, not input media references', () => {
  const revoked = [];
  const { releaseOutputUrls } = load('lib/engine/latest-run.ts', {}, { URL: { revokeObjectURL: (url) => revoked.push(url) } });
  releaseOutputUrls({ originalUrl: 'blob:input', videoUrl: 'blob:input', stems: [{ url: 'blob:vocals' }, { url: 'blob:music' }] });
  assert.deepEqual(revoked, ['blob:vocals', 'blob:music']);
});

test('inpainting mask scales to full resolution, keeps unselected pixels and crops context', () => {
  const { resizeMask, maskPatch, featherMask } = load('lib/engine/inpaint-mask.ts');
  const input = new Float32Array(100 * 100);
  for (let y = 40; y < 60; y++) for (let x = 40; x < 60; x++) input[y * 100 + x] = 1;
  const full = resizeMask(input, { w: 100, h: 100 }, 1000, 1000);
  const patch = maskPatch(full, 1000, 1000);
  assert.equal(patch.filled, 40000);
  assert(patch.w < 1000 && patch.h < 1000);
  const blend = featherMask(full, 1000, 1000, 6);
  assert.equal(blend[0], 0);
  assert.equal(blend[500 * 1000 + 500], 1);
  assert(blend[400 * 1000 + 400] > 0 && blend[400 * 1000 + 400] < 1);
  assert.equal(maskPatch(new Float32Array(4), 2, 2), null);
});

function dispatcher(realSpec, helpers) {
  return load('lib/engine/index.ts', {
    './contracts': load('lib/engine/contracts.ts'),
    './random': load('lib/engine/random.ts'),
    './real': helpers,
    './text-tasks': { tokensOf: (s) => s.split(/\s+/) },
    '../data/real-models': { realSpecFor: () => realSpec, ocrUnavailableReason: () => undefined, REAL_SUBCATEGORIES: new Set(), BROWSER_INFEASIBLE: {} },
  }, { window: {} });
}
function context(kind, params = {}) {
  return {
    spec: { category: 'audio', subcategory: 'asr', outputKind: kind },
    model: { id: 'test', framework: 'transformersjs', size: '1 MB' },
    locale: 'zh', sampleId: 'zh', text: 'hello', fields: {}, lines: [], params,
    media: { src: 'blob:upload', builtin: false },
  };
}
const meta = { repo: 'test', device: 'wasm', dtype: 'q8', bytes: 0 };

test('dispatcher honors uploaded audio language instead of stale Chinese sample ID', async () => {
  let options;
  const engine = dispatcher(spec('whisper', 'automatic-speech-recognition'), {
    transcribeAudio: async (_, opts) => { options = opts; return { text: 'hello', segments: [], meta }; },
  });
  const out = await engine.runInference('transcript', context('transcript', { lang: 'en', timestamps: false }));
  assert.equal(options.language, 'en');
  assert.equal(options.timestamps, false);
  assert.equal(out.payload.language, 'en');
});

test('failed real inference surfaces the error without fabricating a simulated result', async () => {
  const engine = dispatcher(spec(), { classifyText: async () => { throw new Error('model download 503'); } });
  await assert.rejects(engine.runInference('labels', context('labels')), /model download 503/);
});

test('dispatcher forwards the selected translation direction and token budget', async () => {
  let options;
  const engine = dispatcher(spec('original', 'translation'), {
    translateText: async (_, opts) => { options = opts; return { text: '你好', meta }; },
  });
  await engine.runInference('text', context('text', { sourceLang: 'en', targetLang: 'zh', maxTokens: 64 }));
  assert.equal(options.spec.repo, 'Xenova/opus-mt-en-zh');
  assert.equal(options.maxNewTokens, 64);
});

test('unsupported controls are explicitly excluded for real adapters', () => {
  const { supportedParams } = load('lib/engine/contracts.ts');
  const migan = supportedParams({ outputKind: 'inpainting' }, spec('migan', 'onnxruntime'));
  assert(migan.has('feather'));
  assert.equal(migan.has('method'), false);
  const caption = supportedParams({ outputKind: 'chat' }, spec('vit-gpt2', 'image-to-text'));
  assert.equal(caption.size, 0);
  assert.equal(supportedParams({ outputKind: 'chat' }, undefined), undefined);
});


test('merged backend ladder retries quantisation on execution failure and updates metadata', async () => {
  const attempts = [];
  const disposed = [];
  const r = runtime({ pipeline: async (_, repo, { dtype, device }) => {
    attempts.push(`${repo}|${dtype}|${device}`);
    return Object.assign(async () => {
      if (dtype === 'fp16') throw new Error('unsupported GPU kernel');
      return 'ok';
    }, { dispose: async () => { disposed.push(dtype); } });
  } }, true);
  const run = await r.getRun({ spec: { ...spec(), dtypeByDevice: { webgpu: 'fp16', wasm: 'q8' } } });
  assert.equal(await run.call('input'), 'ok');
  assert.deepEqual(attempts, ['test/model|fp16|webgpu', 'test/model|q8|webgpu']);
  assert.deepEqual(disposed, ['fp16']);
  assert.equal(run.dtype, 'q8');
  assert.equal(run.device, 'webgpu');
  await run.call('again');
  assert.equal(attempts.length, 2);
  await r.clearRuntimeCache();
  assert.deepEqual(disposed, ['fp16', 'q8']);
});

test('GPU-only model uses its documented substitute on a CPU-only device', async () => {
  const attempts = [];
  const r = runtime({ pipeline: async (_, repo, { dtype, device }) => {
    attempts.push(`${repo}|${dtype}|${device}`);
    return async () => 'ok';
  } });
  const run = await r.getRun({ spec: { ...spec(), webgpuOnly: true, fallback: { repo: 'test/substitute', dtype: 'q8' } } });
  assert.equal(await run.call('input'), 'ok');
  assert.deepEqual(attempts, ['test/substitute|q8|wasm']);
  assert.equal(run.repo, 'test/substitute');
});


test('bad input and transient downloads do not poison GPU-only models for later runs', async () => {
  for (const failure of ['image could not be decoded', 'Failed to fetch']) {
    let broken = true;
    const r = runtime({ pipeline: async () => {
      if (broken && failure === 'Failed to fetch') throw new Error(failure);
      return Object.assign(async () => {
        if (broken) throw new Error(failure);
        return 'ok';
      }, { dispose: async () => {} });
    } }, true);
    const run = await r.getRun({ spec: { ...spec(), webgpuOnly: true, fallback: { repo: 'test/substitute', dtype: 'q8' } } });
    await assert.rejects(run.call('bad'), { message: failure });
    broken = false;
    assert.equal(await run.call('valid'), 'ok');
    assert.equal(run.repo, 'test/model');
    assert.equal(run.device, 'webgpu');
  }
});

test('matting and semantic segmentation expose supported refine controls only', () => {
  const { supportedParams } = load('lib/engine/contracts.ts');
  const { MATTE_SPECS } = load('lib/engine/matting.ts');
  for (const repo of Object.keys(MATTE_SPECS)) {
    const allowed = supportedParams({ outputKind: 'segmentation' }, spec(repo, 'background-removal'));
    assert(allowed.has('thresh'), repo);
    assert(allowed.has('feather'), repo);
  }
  const semantic = supportedParams({ outputKind: 'segmentation' }, spec('test/segformer', 'image-segmentation'));
  assert(semantic.has('thresh'));
  assert(semantic.has('feather'));
  assert.equal(supportedParams({ outputKind: 'segmentation' }, spec('Xenova/modnet', 'background-removal')).size, 0);
});

test('both localized translation samples start with a valid language pair', () => {
  const { DEMOS } = load('lib/data/registry.ts');
  const { initialDemoParams, translationDirection } = load('lib/engine/contracts.ts');
  const demo = DEMOS.text.translation;
  for (const locale of ['en', 'zh']) {
    const text = demo.samples[0].text[locale];
    const params = initialDemoParams(demo, text);
    assert(translationDirection(text, params.sourceLang, params.targetLang).repo);
    assert.equal(params.maxTokens, 256);
    assert.equal(translationDirection(text, locale, locale).repo, null);
  }
});


test('OCR catalogue uses real Paddle and EasyOCR pipelines and blocks missing adapters', () => {
  const models = load('lib/data/real-models.ts', { '../engine/mediapipe': { MP_URL: {} } });
  assert.equal(models.realSpecFor('vision', 'ocr', 'paddle-ocr').task, 'paddleocr');
  assert.equal(models.realSpecFor('vision', 'ocr', 'paddle-ocr').substitute, undefined);
  assert.equal(models.realSpecFor('vision', 'ocr', 'easy-ocr').task, 'easyocr');
  for (const id of ['mediapipe-text', 'unknown']) {
    assert.equal(models.realSpecFor('vision', 'ocr', id), undefined);
    assert(models.ocrUnavailableReason('vision', 'ocr', id).zh);
  }
  assert.equal(models.ocrUnavailableReason('vision', 'ocr', 'tesseractjs'), undefined);
  assert.equal(models.ocrUnavailableReason('vision', 'ocr', 'paddle-ocr'), undefined);
  assert.equal(models.ocrUnavailableReason('vision', 'ocr', 'easy-ocr'), undefined);
  assert.equal(models.ocrUnavailableReason('vision', 'classification', 'unknown'), undefined);
});

test('Paddle output preserves multiple lines and actual confidence, normalizing polygons', () => {
  const { paddleResult } = load('lib/engine/paddleocr.ts');
  const result = paddleResult({ image: { width: 200, height: 100 }, items: [
    { text: '  中文  ', score: 0.82, poly: [[20, 10], [100, 12], [98, 30], [22, 28]] },
    { text: 'English', score: 0.73, poly: [[-2, 50], [210, 50], [210, 80], [-2, 80]] },
    { text: ' ', score: 0.99, poly: [[0, 0], [1, 0], [1, 1], [0, 1]] },
  ] });
  assert.equal(result.text, '中文\nEnglish');
  assert.equal(result.lines.length, 2);
  assert.equal(result.lines[0].x, 0.1);
  assert.equal(result.lines[0].h, 0.2);
  assert.equal(result.lines[0].conf, 0.82);
  assert.equal(result.lines[1].w, 1);
  assert.equal(paddleResult({ image: { width: 100, height: 100 }, items: [] }).text, '');
});


test('EasyOCR preserves real polygon positions, confidence, and separate lines', () => {
  const { easyResult } = load('lib/engine/easyocr.ts');
  const result = easyResult([
    { text: '中文', confidence: 0.83, box: [[20, 10], [100, 10], [100, 30], [20, 30]] },
    { text: 'English', confidence: 0.72, box: [[20, 50], [120, 50], [120, 70], [20, 70]] },
  ], 200, 100);
  assert.equal(result.text, '中文\nEnglish');
  assert.equal(result.lines[0].x, 0.1);
  assert.equal(result.lines[1].y, 0.5);
  assert.equal(result.lines[1].conf, 0.72);
});


test('demo mappings load the catalogue checkpoint when no substitute is declared', () => {
  const { MODELS } = load('data/models.ts');
  const { REAL_MODELS } = load('lib/data/real-models.ts', { '../engine/mediapipe': { MP_URL: {} } });
  for (const [key, spec] of Object.entries(REAL_MODELS)) {
    const [category, subcategory, id] = key.split('/');
    const model = MODELS[category]?.[subcategory]?.find((entry) => entry.id === id);
    if (!model?.modelId || spec.substitute || spec.task === 'mediapipe') continue;
    assert.equal(spec.repo, model.modelId, key);
  }
  assert.equal(REAL_MODELS['vision/depth/depth-anything-small'].repo, 'onnx-community/depth-anything-v2-small');
  assert.equal(REAL_MODELS['multimodal/clip/clip-vit-base'].repo, 'Xenova/clip-vit-base-patch32');
  assert.equal(REAL_MODELS['vision/depth/mediapipe-depth'], undefined);
  assert.equal(REAL_MODELS['video/video-understanding/mediapipe-classifier'], undefined);
});
