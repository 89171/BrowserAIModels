/**
 * Real client-side inference on top of Transformers.js.
 *
 * Everything here is lazy: the runtime (~30 MB of ESM) is imported on the first
 * run, and each checkpoint is downloaded once per (repo, dtype, device) and then
 * kept in an in-memory Map, while the files themselves live in the browser
 * Cache Storage — so a second visit to the same model costs nothing.
 *
 * Nothing in this module is touched unless a catalogue entry has a matching
 * `REAL_MODELS` specification, which keeps every other subcategory offline.
 */
import type { RealModelSpec } from '../data/real-models';
import { MATTE_SPECS, isMatte, createMatte, type Matte, type MatteParams } from './matting';
import { ORT_WASM_PREFIX } from './remote-assets';

export interface ProgressInfo {
  /** accumulated bytes downloaded so far for this pipeline */
  loaded: number;
  total: number;
  file?: string;
  /** 0..1 */
  ratio: number;
}

export interface LoadedRun {
  /** Execute this pipeline. Options vary per task (object, label array, string). */
  call: (input: unknown, ...args: unknown[]) => Promise<unknown>;
  repo: string;
  dtype: string;
  device: string;
  /** bytes actually downloaded during this load (0 when served from cache) */
  bytes: number;
}

type Pipe = ((input: unknown, ...args: any[]) => Promise<unknown>) & { dispose?: () => Promise<void> };
type CachedRun = LoadedRun & { dispose: () => Promise<void> };

type Runtime = any;

let runtimePromise: Promise<Runtime> | null = null;
const pipelineCache = new Map<string, Promise<CachedRun>>();

async function importRuntime(): Promise<Runtime> {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      const mod = await import('@huggingface/transformers');
      const env = mod.env;
      env.allowLocalModels = false;
      // Always pin the ONNX Runtime binaries: the 26–28 MB builds are hosted in
      // object storage for production, and /public/ort covers local dev. Leaving
      // this unset falls back to the jsDelivr CDN, which is slow from CN.
      if (env.backends?.onnx?.wasm) env.backends.onnx.wasm.wasmPaths = ORT_WASM_PREFIX;
      return mod;
    })().catch((error) => { runtimePromise = null; throw error; });
  }
  return runtimePromise;
}

const prefersWebGPU = () => typeof navigator !== 'undefined' && !!(navigator as { gpu?: unknown }).gpu;

export interface LoadOptions {
  spec: RealModelSpec;
  onProgress?: (p: ProgressInfo) => void;
  /** force WASM (used after a WebGPU failure) */
  forceDevice?: string;
  /** force a quantisation (used by the fallback ladder in `getRun`) */
  forceDtype?: string;
  /** confidence threshold for object detection */
  threshold?: number;
  /** Forced ASR source language; omit to let multilingual Whisper detect it. */
  language?: string;
  timestamps?: boolean;
  normalize?: boolean;
  maxNewTokens?: number;
}

async function loadPipeline({ spec, onProgress, forceDevice, forceDtype }: LoadOptions): Promise<CachedRun> {
  const mod = await importRuntime();
  const device = forceDevice ?? (prefersWebGPU() ? 'webgpu' : 'wasm');
  // Large matting graphs only fit the GPU at fp16; the WASM EP keeps the int8
  // build. Anything without a per-device override just uses `spec.dtype`.
  const dtype = forceDtype ?? spec.dtypeByDevice?.[device === 'webgpu' ? 'webgpu' : 'wasm'] ?? spec.dtype;
  const key = `${spec.task}|${spec.repo}|${dtype}|${device}`;
  const cached = pipelineCache.get(key);
  if (cached) {
    pipelineCache.delete(key);
    pipelineCache.set(key, cached);
    // Report 0 bytes: nothing was fetched on this run, the session is reused.
    return { ...(await cached), bytes: 0 };
  }

  // Execution is serialized by getRun, so no cached pipeline is in use here.
  // Evict before loading, not after a third large model has exhausted memory.
  while (pipelineCache.size >= 2) {
    const oldest = pipelineCache.keys().next().value!;
    const entry = pipelineCache.get(oldest)!;
    pipelineCache.delete(oldest);
    await entry.then((run) => run.dispose()).catch(() => undefined);
  }

  const job = (async (): Promise<CachedRun> => {
    let loaded = 0;
    let total = 0;
    let lastFile: string | undefined;
    const files = new Map<string, { loaded: number; total: number }>();
    const progress_callback = (e: {
      status?: string;
      file?: string;
      name?: string;
      loaded?: number;
      total?: number;
      progress?: number;
    }) => {
      if (e.file && e.file !== lastFile) lastFile = e.file;
      if (e.status === 'progress' && typeof e.loaded === 'number' && typeof e.total === 'number') {
        files.set(e.file ?? '', { loaded: e.loaded, total: e.total });
        loaded = [...files.values()].reduce((sum, f) => sum + f.loaded, 0);
        total = [...files.values()].reduce((sum, f) => sum + f.total, 0);
        onProgress?.({ loaded, total, file: lastFile, ratio: total ? loaded / total : 0 });
      }
    };
    const matte = MATTE_SPECS[spec.repo];
    const pipe: Pipe = matte
      ? await loadMatte(mod, spec, matte, dtype, device, progress_callback)
      : spec.task === 'text-ranking'
        ? await loadReranker(mod, spec, dtype, device, progress_callback)
        : await mod.pipeline(spec.task, spec.repo, {
          dtype,
          device,
          progress_callback,
        } as any);
    return {
      call: (input: unknown, ...args: unknown[]) => pipe(input, ...(args.length ? args : [{}])) as Promise<unknown>,
      repo: spec.repo,
      dtype,
      device,
      bytes: loaded,
      dispose: async () => { await pipe.dispose?.(); },
    };
  })();

  pipelineCache.set(key, job);
  try {
    return await job;
  } catch (err) {
    pipelineCache.delete(key);
    throw err;
  }
}

/**
 * Load a matting checkpoint as a bare ONNX graph.
 *
 * RMBG-1.4 declares `SegformerForSemanticSegmentation` and BiRefNet-lite declares
 * `swin`, so Transformers.js would build the wrong class for either; both are
 * pinned to the generic `PreTrainedModel` runner through `model_type` and fed by
 * `matting.ts`, which owns their real preprocessing/postprocessing contract.
 */
async function loadMatte(
  mod: Runtime,
  spec: RealModelSpec,
  matte: (typeof MATTE_SPECS)[string],
  dtype: string,
  device: string,
  progress_callback: (e: never) => void
): Promise<Pipe> {
  const model = await mod.AutoModel.from_pretrained(spec.repo, {
    config: { model_type: matte.arch },
    dtype,
    device,
    progress_callback,
  });
  const pipe = createMatte(mod, model, matte) as unknown as Pipe;
  pipe.dispose = () => model.dispose();
  return pipe;
}

/**
 * Try each device/quantisation combination the platform can actually run, in
 * descending order of quality, then the entry's documented substitute.
 *
 * Two steps earn their place: `webgpu + q8` rescues GPUs whose driver cannot
 * build the fp16 graph, and `wasm + q8` covers the WebGPU-less case without
 * dragging a 90 MB fp16 download down a CPU pipeline.
 */
function attemptLadder(opts: LoadOptions): LoadOptions[] {
  const { spec, forceDevice, forceDtype, ...rest } = opts;
  if (forceDevice) return [{ spec, forceDevice, forceDtype, ...rest }];

  const gpu = prefersWebGPU();
  const cpuDtype = spec.dtypeByDevice?.wasm ?? spec.dtype;
  const steps: LoadOptions[] = [];
  if (spec.webgpuOnly) {
    // Nothing smaller exists for this graph: keep it on the GPU or substitute.
    if (gpu) steps.push({ spec, forceDevice: 'webgpu', ...rest });
  } else {
    steps.push({ spec, forceDevice: gpu ? 'webgpu' : 'wasm', ...rest });
    if (gpu) {
      steps.push({ spec, forceDevice: 'webgpu', forceDtype: cpuDtype, ...rest });
      steps.push({ spec, forceDevice: 'wasm', forceDtype: cpuDtype, ...rest });
    }
  }
  if (spec.fallback) {
    const { fallback, webgpuOnly, dtypeByDevice, ...base } = spec;
    steps.push({ spec: { ...base, ...fallback }, ...rest });
  }
  return steps;
}

/** Explicit cross-encoder contract: tokenize both sides and retain single-logit scores. */
async function loadReranker(mod: Runtime, spec: RealModelSpec, dtype: string, device: string, progress_callback: (e: never) => void): Promise<Pipe> {
  const tokenizer = await mod.AutoTokenizer.from_pretrained(spec.repo);
  const model = await mod.AutoModelForSequenceClassification.from_pretrained(spec.repo, { dtype, device, progress_callback });
  const pipe: Pipe = async (query: unknown, candidates: string[]) => {
    const scores: number[] = [];
    for (let start = 0; start < candidates.length; start += 8) {
      const docs = candidates.slice(start, start + 8);
      const inputs = tokenizer(docs.map(() => String(query)), {
        text_pair: docs, padding: true, truncation: true, max_length: 512,
      });
      const { logits } = await model(inputs);
      try {
        if (logits.dims.at(-1) !== 1) throw new Error('Expected a single relevance logit per query/document pair');
        for (const value of logits.data) scores.push(1 / (1 + Math.exp(-Number(value))));
      } finally { logits.dispose?.(); }
    }
    return scores;
  };
  pipe.dispose = () => model.dispose();
  return pipe;
}

// Serialize load + execution: ORT pipelines share state, and large parallel
// downloads/inferences can exhaust GPU memory. Only two idle models are retained.
let runQueue: Promise<unknown> = Promise.resolve();
const failedGpu = new Set<string>();
function enqueue<T>(job: () => Promise<T>): Promise<T> {
  const result = runQueue.then(job, job);
  runQueue = result.catch(() => undefined);
  return result;
}
async function trimPipelines() {
  while (pipelineCache.size > 2) {
    const key = pipelineCache.keys().next().value!;
    const entry = pipelineCache.get(key)!;
    pipelineCache.delete(key);
    await entry.then((run) => run.dispose()).catch(() => undefined);
  }
}

/** Input and network failures must never disable a backend for later requests. */
function isGpuFailure(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const { name, message } = error as { name?: string; message?: string };
  return name === 'GPUValidationError' ||
    /(?:webgpu|gpu) device (?:lost|unavailable)|unsupported (?:webgpu|gpu) kernel|(?:webgpu|gpu) (?:is )?not supported/i.test(message ?? '');
}

/** A lazy handle with serialized execution and device/quantisation fallback. */
export async function getRun(opts: LoadOptions): Promise<LoadedRun> {
  const meta: LoadedRun = {
    repo: opts.spec.repo, dtype: opts.spec.dtype, device: 'wasm', bytes: 0,
    call: (input, ...args) => enqueue(async () => {
      let firstError: unknown;
      const attempted = new Set<string>();
      try {
        for (const attempt of attemptLadder(opts)) {
          const device = attempt.forceDevice ?? (prefersWebGPU() ? 'webgpu' : 'wasm');
          const dtype = attempt.forceDtype ?? attempt.spec.dtypeByDevice?.[device === 'webgpu' ? 'webgpu' : 'wasm'] ?? attempt.spec.dtype;
          const key = `${attempt.spec.task}|${attempt.spec.repo}|${dtype}|${device}`;
          if (attempted.has(key) || (!opts.forceDevice && device === 'webgpu' && failedGpu.has(key))) continue;
          attempted.add(key);
          try {
            const run = await loadPipeline(attempt);
            const output = await run.call(input, ...args);
            meta.repo = run.repo;
            meta.dtype = run.dtype;
            meta.device = run.device;
            meta.bytes = run.bytes;
            return output;
          } catch (error) {
            firstError ??= error;
            if (device === 'webgpu' && isGpuFailure(error)) failedGpu.add(key);
            const failed = pipelineCache.get(key);
            pipelineCache.delete(key);
            await failed?.then((run) => run.dispose()).catch(() => undefined);
          }
        }
        throw firstError ?? new Error('no runnable backend for this model');
      } finally { await trimPipelines(); }
    }),
  };
  return meta;
}

/** Wait for active inference, then release runtime allocations as well as references. */
export function clearRuntimeCache(): Promise<void> {
  return enqueue(async () => {
    const entries = [...pipelineCache.values()];
    pipelineCache.clear();
    failedGpu.clear();
    await Promise.all(entries.map((entry) => entry.then((r) => r.dispose()).catch(() => undefined)));
  });
}

/* --------------------------------------------------------------- task helpers */

const COCO_ZH: Record<string, string> = {
  person: '人',
  bicycle: '自行车',
  car: '汽车',
  motorcycle: '摩托车',
  airplane: '飞机',
  bus: '公交车',
  train: '火车',
  truck: '卡车',
  boat: '船',
  'traffic light': '红绿灯',
  'fire hydrant': '消防栓',
  'stop sign': '停止标志',
  'parking meter': '停车计时器',
  bench: '长椅',
  bird: '鸟',
  cat: '猫',
  dog: '狗',
  horse: '马',
  sheep: '羊',
  cow: '牛',
  elephant: '大象',
  bear: '熊',
  zebra: '斑马',
  giraffe: '长颈鹿',
  backpack: '背包',
  umbrella: '雨伞',
  handbag: '手提包',
  tie: '领带',
  suitcase: '行李箱',
  frisbee: '飞盘',
  skis: '滑雪板',
  snowboard: '单板',
  'sports ball': '球',
  kite: '风筝',
  'baseball bat': '棒球棍',
  'baseball glove': '棒球手套',
  skateboard: '滑板',
  surfboard: '冲浪板',
  'tennis racket': '网球拍',
  bottle: '瓶子',
  'wine glass': '酒杯',
  cup: '杯子',
  fork: '叉子',
  knife: '刀',
  spoon: '勺子',
  bowl: '碗',
  banana: '香蕉',
  apple: '苹果',
  sandwich: '三明治',
  orange: '橙子',
  broccoli: '西兰花',
  carrot: '胡萝卜',
  'hot dog': '热狗',
  pizza: '披萨',
  donut: '甜甜圈',
  cake: '蛋糕',
  chair: '椅子',
  couch: '沙发',
  'potted plant': '盆栽',
  bed: '床',
  'dining table': '餐桌',
  toilet: '马桶',
  tv: '电视',
  laptop: '笔记本电脑',
  mouse: '鼠标',
  remote: '遥控器',
  keyboard: '键盘',
  'cell phone': '手机',
  microwave: '微波炉',
  oven: '烤箱',
  toaster: '烤面包机',
  sink: '水槽',
  refrigerator: '冰箱',
  book: '书',
  clock: '时钟',
  vase: '花瓶',
  scissors: '剪刀',
  'teddy bear': '泰迪熊',
  'hair drier': '吹风机',
  toothbrush: '牙刷',
};

export const cocoLabel = (en: string, locale: 'zh' | 'en') => (locale === 'zh' ? COCO_ZH[en] ?? en : en);

/** Mean-pooled, L2-normalised sentence embeddings for every line. */
export async function embedLines(
  lines: string[],
  opts: LoadOptions
): Promise<{ vectors: number[][]; meta: LoadedRun }> {
  const run = await getRun(opts);
  const out = (await run.call(lines, { pooling: /bge-/i.test(opts.spec.repo) ? 'cls' : 'mean', normalize: opts.normalize !== false })) as {
    dims: number[];
    data: Float32Array | number[];
    dispose?: () => void;
  };
  const [n, dim] = out.dims.length === 2 ? out.dims : [lines.length, out.dims[out.dims.length - 1]];
  const flat = Array.from(out.data as ArrayLike<number>);
  const vectors: number[][] = [];
  for (let i = 0; i < n; i++) {
    const v = flat.slice(i * dim, (i + 1) * dim);
    const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
    vectors.push(opts.normalize === false ? v : v.map((x) => x / norm));
  }
  out.dispose?.();
  return { vectors, meta: run };
}

export interface DetectedBox {
  label: string;
  labelEn: string;
  score: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export async function detectObjects(
  imageSrc: string,
  locale: 'zh' | 'en',
  opts: LoadOptions
): Promise<{ boxes: DetectedBox[]; width: number; height: number; meta: LoadedRun }> {
  const run = await getRun(opts);
  const threshold = opts.threshold ?? 0.4;
  const raw = (await run.call(imageSrc, { threshold })) as {
    score: number;
    label: string;
    box: { xmin: number; ymin: number; xmax: number; ymax: number };
  }[];
  const size = await naturalSize(imageSrc);
  const boxes: DetectedBox[] = raw.map((d) => ({
    label: cocoLabel(d.label, locale),
    labelEn: d.label,
    score: Math.round(d.score * 1000) / 1000,
    x: clamp01((d.box.xmin / size.width) * 1),
    y: clamp01(d.box.ymin / size.height),
    w: clamp01((d.box.xmax - d.box.xmin) / size.width),
    h: clamp01((d.box.ymax - d.box.ymin) / size.height),
  }));
  return { boxes, width: size.width, height: size.height, meta: run };
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

async function naturalSize(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve({ width: img.naturalWidth || 1, height: img.naturalHeight || 1 });
    img.onerror = () => resolve({ width: 1, height: 1 });
    img.src = src;
  });
}

export interface TranscribedSegment {
  start: number;
  end: number;
  text: string;
}

/** Whisper-style transcription with optional per-chunk timestamps. */
export async function transcribeAudio(
  audioSrc: string,
  opts: LoadOptions
): Promise<{ text: string; segments: TranscribedSegment[]; meta: LoadedRun }> {
  const run = await getRun(opts);
  // Omit language for automatic detection; chunk long recordings explicitly.
  const out = (await run.call(audioSrc, {
    return_timestamps: opts.timestamps ? 'word' : false,
    chunk_length_s: 30,
    stride_length_s: 5,
    task: 'transcribe',
    ...(opts.language ? { language: opts.language } : {}),
  })) as {
    text?: string;
    chunks?: { timestamp: [number, number | null]; text: string }[];
  };
  const segments: TranscribedSegment[] = (out.chunks ?? []).map((c) => ({
    start: Math.round((c.timestamp?.[0] ?? 0) * 100) / 100,
    end: Math.round((c.timestamp?.[1] ?? c.timestamp?.[0] ?? 0) * 100) / 100,
    text: c.text.trim(),
  }));
  return { text: (out.text ?? '').trim(), segments, meta: run };
}

/** Text-to-speech: returns the raw waveform plus its sample rate. */
export async function synthesiseSpeech(
  text: string,
  opts: LoadOptions
): Promise<{ waveform: Float32Array; sampleRate: number; meta: LoadedRun }> {
  const run = await getRun(opts);
  // Both TTS families are conditioned on a speaker vector: the stock CMU-Arctic x-vector for SpeechT5, voice F1 for Supertonic.
  const options = opts.spec.repo.includes('speecht5')
    ? { speaker_embeddings: 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin' }
    : opts.spec.repo.includes('Supertonic')
      ? { speaker_embeddings: 'https://huggingface.co/onnx-community/Supertonic-TTS-ONNX/resolve/main/voices/F1.bin' }
      : undefined;
  const out = (await run.call(text, options)) as { audio?: Float32Array | number[]; sampling_rate?: number };
  const raw = out.audio;
  const waveform = raw instanceof Float32Array ? raw : new Float32Array(Array.from(raw ?? []));
  return { waveform, sampleRate: out.sampling_rate ?? 16000, meta: run };
}

/** Image captioning / OCR-style image reading via an image-to-text checkpoint. */
export async function captionImage(
  imageSrc: string,
  opts: LoadOptions
): Promise<{ text: string; meta: LoadedRun }> {
  const run = await getRun(opts);
  const out = (await run.call(imageSrc)) as { generated_text?: string }[] | { generated_text?: string };
  const list = Array.isArray(out) ? out : [out];
  return { text: (list[0]?.generated_text ?? '').trim(), meta: run };
}

/** Abstractive summarisation. */
export async function summariseText(
  text: string,
  opts: LoadOptions
): Promise<{ text: string; meta: LoadedRun }> {
  const run = await getRun(opts);
  const max = Math.max(24, Math.min(256, opts.maxNewTokens ?? Math.round(text.length / 3)));
  const out = (await run.call(text, { max_new_tokens: max })) as
    | { summary_text?: string }[]
    | { summary_text?: string };
  const list = Array.isArray(out) ? out : [out];
  return { text: (list[0]?.summary_text ?? '').trim(), meta: run };
}

/**
 * Convert whatever a vision pipeline hands back into a data URL the UI can render.
 * RawImage exposes different helpers across versions — and on the web its
 * `toCanvas()` returns an OffscreenCanvas, which has no `toDataURL`.
 */
async function toDataUrl(image: unknown): Promise<string> {
  const img = image as {
    toDataURL?: () => string | Promise<string>;
    toCanvas?: () => HTMLCanvasElement | OffscreenCanvas;
  };
  if (typeof img?.toDataURL === 'function') return img.toDataURL();
  if (typeof img?.toCanvas === 'function') {
    const canvas = img.toCanvas();
    if (typeof (canvas as HTMLCanvasElement).toDataURL === 'function') {
      return (canvas as HTMLCanvasElement).toDataURL('image/png');
    }
    const dom = document.createElement('canvas');
    dom.width = canvas.width;
    dom.height = canvas.height;
    dom.getContext('2d')?.drawImage(canvas as unknown as CanvasImageSource, 0, 0);
    return dom.toDataURL('image/png');
  }
  throw new Error('vision pipeline returned an image that cannot be serialised');
}

/** Image-to-image tasks such as super-resolution. */
export async function enhanceImage(
  imageSrc: string,
  opts: LoadOptions,
  strength = 1,
): Promise<{ url: string; meta: LoadedRun }> {
  const run = await getRun(opts);
  const out = await run.call(imageSrc);
  const generated = await toCanvas(out);
  if (!generated) throw new Error('Invalid image reconstruction output');
  if (strength < 1) {
    const original = await loadImage(imageSrc);
    const blended = createCanvas(generated.width, generated.height);
    const context = blended.getContext('2d')!;
    context.drawImage(original, 0, 0, blended.width, blended.height);
    context.globalAlpha = Math.max(0, strength);
    context.drawImage(generated, 0, 0);
    return { url: blended.toDataURL('image/png'), meta: run };
  }
  return { url: generated.toDataURL('image/png'), meta: run };
}

/** Monocular depth estimation: returns the greyscale depth map. */
export async function estimateDepth(
  imageSrc: string,
  opts: LoadOptions
): Promise<{ url: string; meta: LoadedRun }> {
  const run = await getRun(opts);
  const out = (await run.call(imageSrc)) as { depth?: unknown; predicted_depth?: unknown };
  return { url: await toDataUrl(out.depth ?? out.predicted_depth), meta: run };
}

export async function classifyText(
  text: string,
  opts: LoadOptions
): Promise<{ labels: { label: string; score: number }[]; meta: LoadedRun }> {
  const run = await getRun(opts);
  const multiLabel = opts.spec.repo.includes('toxic');
  const out = (await run.call(text, multiLabel ? { top_k: null } : { top_k: 5 })) as
    | { label: string; score: number }[]
    | { label: string; score: number };
  const list = Array.isArray(out) ? out : [out];
  return {
    labels: list.map((x) => ({ label: x.label, score: Math.round(x.score * 1000) / 1000 })),
    meta: run,
  };
}

/* ------------------------------------------------------- cross-encoder rerank */

/** Relevance scores in input order, using the explicit cross-encoder adapter. */
export async function scorePairs(query: string, docs: string[], opts: LoadOptions): Promise<{ scores: number[]; meta: LoadedRun }> {
  const run = await getRun({ ...opts, spec: { ...opts.spec, task: 'text-ranking' } });
  const scores = await run.call(query, docs) as number[];
  if (scores.length !== docs.length || scores.some((score) => !Number.isFinite(score))) {
    throw new Error('Invalid reranker output');
  }
  return { scores, meta: run };
}

/** Cosine ranking of a corpus against a query using a bi-encoder. */
export async function rankByEmbedding(
  query: string,
  docs: string[],
  opts: LoadOptions
): Promise<{ scores: number[]; meta: LoadedRun }> {
  const prefix = /bge-.*zh/i.test(opts.spec.repo) ? '为这个句子生成表示以用于检索相关文章：'
    : /bge-/i.test(opts.spec.repo) ? 'Represent this sentence for searching relevant passages: ' : '';
  const { vectors, meta } = await embedLines([prefix + query, ...docs], { ...opts, normalize: true });
  const q = vectors[0] ?? [];
  const scores = vectors.slice(1).map((v) => {
    let dot = 0;
    for (let i = 0; i < q.length; i++) dot += q[i] * v[i];
    return Math.round(((dot + 1) / 2) * 1000) / 1000;
  });
  return { scores, meta };
}

/* -------------------------------------------------------------- translation */

/** Sequence-to-sequence translation (Marian / NLLB style). */
export async function translateText(
  text: string,
  opts: LoadOptions
): Promise<{ text: string; meta: LoadedRun }> {
  const run = await getRun(opts);
  const max = Math.min(1024, Math.max(32, opts.maxNewTokens ?? Math.round(text.length * 1.6)));
  const out = (await run.call(text, { max_new_tokens: max })) as
    | { translation_text?: string }[]
    | { translation_text?: string };
  const list = Array.isArray(out) ? out : [out];
  return { text: (list[0]?.translation_text ?? '').trim(), meta: run };
}

/* ------------------------------------------------------- zero-shot scoring */

/** Text zero-shot classification against free-form candidate labels. */
export async function zeroShotClassifyText(
  text: string,
  labels: string[],
  opts: LoadOptions
): Promise<{ labels: { label: string; score: number }[]; meta: LoadedRun }> {
  const run = await getRun(opts);
  const out = (await run.call(text, labels)) as
    | { labels?: string[]; scores?: number[] }[]
    | { labels?: string[]; scores?: number[] };
  const first = Array.isArray(out) ? out[0] : out;
  const names = first?.labels ?? [];
  const scores = first?.scores ?? [];
  return {
    labels: names.map((label, i) => ({ label, score: Math.round((scores[i] ?? 0) * 1000) / 1000 })),
    meta: run,
  };
}

/** Image zero-shot classification (CLIP / SigLIP / MobileCLIP). */
export async function zeroShotClassifyImage(
  imageSrc: string,
  labels: string[],
  opts: LoadOptions
): Promise<{ labels: { label: string; score: number }[]; meta: LoadedRun }> {
  const run = await getRun(opts);
  const out = (await run.call(imageSrc, labels)) as
    | { label: string; score: number }[]
    | { label: string; score: number };
  const list = Array.isArray(out) ? out : [out];
  return {
    labels: list.map((x) => ({ label: x.label, score: Math.round(x.score * 1000) / 1000 })),
    meta: run,
  };
}

/** Document question answering (Donut-style, answers read straight off the page). */
export async function askDocument(
  imageSrc: string,
  question: string,
  opts: LoadOptions
): Promise<{ text: string; meta: LoadedRun }> {
  const run = await getRun(opts);
  const out = (await run.call(imageSrc, question)) as
    | { answer?: string }[]
    | { answer?: string };
  const list = Array.isArray(out) ? out : [out];
  return { text: (list[0]?.answer ?? '').trim(), meta: run };
}

/* ------------------------------------------------------- token generation */

/** Autoregressive text generation for the small chat / code checkpoints. */
export async function generateText(
  prompt: string,
  opts: LoadOptions,
  gen: { maxNewTokens?: number; temperature?: number } = {}
): Promise<{ text: string; meta: LoadedRun }> {
  const run = await getRun(opts);
  const greedy = !gen.temperature;
  const out = (await run.call(prompt, {
    max_new_tokens: gen.maxNewTokens ?? 160,
    do_sample: !greedy,
    ...(greedy ? {} : { temperature: gen.temperature }),
    repetition_penalty: 1.1,
  })) as { generated_text?: string }[] | { generated_text?: string };
  const list = Array.isArray(out) ? out : [out];
  const raw = list[0]?.generated_text ?? '';
  // The text-generation pipeline echoes the prompt back on the first result.
  const text = raw.startsWith(prompt) ? raw.slice(prompt.length) : raw;
  return { text: text.trim(), meta: run };
}

/* --------------------------------------------- pixel-space segmentation */

function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, width);
  canvas.height = Math.max(1, height);
  return canvas;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image could not be decoded'));
    img.src = src;
  });
}

async function toCanvas(image: unknown): Promise<HTMLCanvasElement | null> {
  const maybe = image as { toCanvas?: () => HTMLCanvasElement | OffscreenCanvas };
  if (typeof maybe?.toCanvas === 'function') {
    const raw = maybe.toCanvas();
    const dom = document.createElement('canvas');
    dom.width = raw.width;
    dom.height = raw.height;
    dom.getContext('2d')?.drawImage(raw as unknown as CanvasImageSource, 0, 0);
    return dom;
  }
  try {
    const url = await toDataUrl(image);
    const el = await loadImage(url);
    const canvas = createCanvas(el.naturalWidth, el.naturalHeight);
    canvas.getContext('2d')?.drawImage(el, 0, 0);
    return canvas;
  } catch {
    return null;
  }
}

/** Share of pixels the model kept as foreground (alpha > 0.5). */
async function alphaCoverage(url: string): Promise<number> {
  const img = await loadImage(url);
  const canvas = createCanvas(img.naturalWidth, img.naturalHeight);
  const ctx = canvas.getContext('2d');
  if (!ctx) return 0;
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let hits = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > 127) hits++;
  return Math.round((hits / (canvas.width * canvas.height)) * 1000) / 1000;
}

/** Background removal: the model predicts a per-pixel alpha matte. */
export async function cutForeground(
  imageSrc: string,
  opts: LoadOptions,
  params?: MatteParams
): Promise<{ url: string; coverage: number; meta: LoadedRun }> {
  const run = await getRun(opts);
  // Only the matting pipelines understand the refine params; passing them to a
  // generic Transformers.js pipeline would land in its `options` bag.
  const out: unknown = MATTE_SPECS[run.repo]
    ? await run.call(imageSrc, params)
    : await run.call(imageSrc);
  // Matting checkpoints come back as a ready RGBA buffer: alpha ramp, level
  // remap and colour decontamination already applied, so no canvas round-trip
  // through a second quantisation.
  if (isMatte(out)) {
    const canvas = createCanvas(out.width, out.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('canvas 2d context unavailable');
    ctx.putImageData(new ImageData(out.pixels, out.width, out.height), 0, 0);
    return { url: canvas.toDataURL('image/png'), coverage: out.coverage, meta: run };
  }
  const url = await toDataUrl(out as Parameters<typeof toDataUrl>[0]);
  return { url, coverage: await alphaCoverage(url), meta: run };
}

const SEG_PALETTE = ['#4f8ef7', '#f2994a', '#27ae60', '#eb5757', '#9b51e0', '#2d9cdb', '#e8c547'];

const hexToRgb = (hex: string): [number, number, number] => {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/** Semantic segmentation: colour every predicted region over the source image. */
export async function semanticSegment(
  imageSrc: string,
  opts: LoadOptions,
  params?: MatteParams
): Promise<{ url: string; coverage: number; meta: LoadedRun }> {
  const run = await getRun(opts);
  const raw = (await run.call(imageSrc, {
    // Faint regions fall below the mask threshold instead of being painted as if
    // the model were certain; this is the same slider the matting path uses.
    ...(params ? { mask_threshold: Math.min(0.95, Math.max(0.05, params.thresh)) } : {}),
  })) as
    | { mask?: unknown; label?: string; score?: number }[]
    | { mask?: unknown };
  const list = Array.isArray(raw) ? raw : [raw];

  const base = await loadImage(imageSrc);
  const width = base.naturalWidth;
  const height = base.naturalHeight;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas 2d context unavailable');
  ctx.drawImage(base, 0, 0);

  let largest = 0;
  for (let i = 0; i < list.length; i++) {
    const maskCanvas = await toCanvas(list[i]?.mask);
    if (!maskCanvas) continue;
    const overlay = createCanvas(width, height);
    const octx = overlay.getContext('2d');
    if (!octx) continue;
    if (params?.feather) octx.filter = `blur(${Math.max(0.5, params.feather / 2)}px)`;
    octx.drawImage(maskCanvas, 0, 0, width, height);
    octx.filter = 'none';
    const frame = octx.getImageData(0, 0, width, height);
    const [r, g, b] = hexToRgb(SEG_PALETTE[i % SEG_PALETTE.length]);
    let hits = 0;
    for (let p = 0; p < frame.data.length; p += 4) {
      const on = frame.data[p] > 127;
      if (!on) {
        frame.data[p + 3] = 0;
        continue;
      }
      hits++;
      frame.data[p] = r;
      frame.data[p + 1] = g;
      frame.data[p + 2] = b;
      frame.data[p + 3] = 110;
    }
    largest = Math.max(largest, hits / (width * height));
    octx.putImageData(frame, 0, 0);
    ctx.drawImage(overlay, 0, 0);
  }
  return {
    url: canvas.toDataURL('image/png'),
    coverage: Math.round(largest * 1000) / 1000,
    meta: run,
  };
}

/* ------------------------------------------------- token / span / class tasks */

const CJK = /[\u3400-\u9fff]/;

export interface Entity {
  text: string;
  type: string;
  score: number;
}

/** BIO token tags → whole entities (sub-word pieces and adjacent I- tags merge). */
export async function tagEntities(
  text: string,
  opts: LoadOptions
): Promise<{ entities: Entity[]; meta: LoadedRun }> {
  const run = await getRun(opts);
  const raw = (await run.call(text, { ignore_labels: ['O'] })) as {
    entity: string;
    score: number;
    word: string;
    index: number;
  }[];
  const out: (Entity & { last: number; n: number })[] = [];
  for (const t of raw) {
    const type = t.entity.replace(/^[BI]-/, '');
    const sub = t.word.startsWith('##');
    const word = t.word.replace(/^##/, '');
    const prev = out[out.length - 1];
    const joins = prev && t.index === prev.last + 1 && (sub || (t.entity.startsWith('I-') && prev.type === type));
    if (joins) {
      const glue = sub || CJK.test(word) || CJK.test(prev.text.slice(-1)) ? '' : ' ';
      prev.text += glue + word;
      prev.score += t.score;
      prev.n++;
      prev.last = t.index;
    } else {
      out.push({ text: word, type, score: t.score, last: t.index, n: 1 });
    }
  }
  return {
    entities: out.map((e) => ({ text: e.text, type: e.type, score: Math.round((e.score / e.n) * 1000) / 1000 })),
    meta: run,
  };
}

export async function answerQuestion(
  question: string,
  context: string,
  opts: LoadOptions
): Promise<{ answer: string; score: number; meta: LoadedRun }> {
  const run = await getRun(opts);
  const out = (await run.call(question, context)) as { answer?: string; score?: number } | { answer?: string; score?: number }[];
  const best = Array.isArray(out) ? out[0] : out;
  return { answer: (best?.answer ?? '').trim(), score: Math.round((best?.score ?? 0) * 1000) / 1000, meta: run };
}

/** Image or audio classification: top-k labels. */
export async function classifyMedia(
  src: string,
  topK: number,
  opts: LoadOptions
): Promise<{ labels: { label: string; score: number }[]; meta: LoadedRun }> {
  const run = await getRun(opts);
  const out = (await run.call(src, { top_k: topK })) as { label: string; score: number }[];
  return { labels: out.map((x) => ({ label: x.label, score: Math.round(x.score * 1000) / 1000 })), meta: run };
}

/** Open-vocabulary detection: boxes for whatever the text queries describe. */
export async function detectZeroShot(
  imageSrc: string,
  queries: string[],
  threshold: number,
  opts: LoadOptions
): Promise<{ boxes: DetectedBox[]; width: number; height: number; meta: LoadedRun }> {
  const run = await getRun(opts);
  const raw = (await run.call(imageSrc, queries, { threshold })) as {
    score: number;
    label: string;
    box: { xmin: number; ymin: number; xmax: number; ymax: number };
  }[];
  const size = await naturalSize(imageSrc);
  const boxes: DetectedBox[] = raw.map((d) => ({
    label: d.label,
    labelEn: d.label,
    score: Math.round(d.score * 1000) / 1000,
    x: clamp01(d.box.xmin / size.width),
    y: clamp01(d.box.ymin / size.height),
    w: clamp01((d.box.xmax - d.box.xmin) / size.width),
    h: clamp01((d.box.ymax - d.box.ymin) / size.height),
  }));
  return { boxes, width: size.width, height: size.height, meta: run };
}
