// Fills the fields the catalog must not invent — weight and code license,
// download size, weight revision, runtime version, deployment variants — from
// the Hugging Face repo each entry names and from the npm registry, then
// rewrites data/models.ts in place.
//
//   node scripts/sync-hf.mjs           # rewrite data/models.ts
//   node scripts/sync-hf.mjs --dry-run # report only
//
// Rules it will not break:
//   * A repo that declares no license leaves the field unverified. The one
//     exception is a format conversion: a repo tagged `base_model:<id>` inherits
//     that base repo's license, and the base repo is recorded as a source.
//   * A repo that ships no browser weights is reported, never patched. Swapping
//     a model identity is a review decision; `--dry-run` output drives it.
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const DRY_RUN = process.argv.includes('--dry-run');
const TODAY = new Date().toISOString().slice(0, 10);
const FILE = 'data/models.ts';
const API = 'https://huggingface.co/api/models';

// Hugging Face / npm license ids -> LicenseId in types/taxonomy.ts. Model- and
// vendor-specific terms (llama3, gemma, "SEE LICENSE IN ...") map to `custom`
// rather than to a label that would imply a known open license.
const LICENSES = {
  'apache-2.0': 'apache-2-0',
  'agpl-3.0': 'agpl-3-0',
  'agpl-3.0-only': 'agpl-3-0',
  'agpl-3.0-or-later': 'agpl-3-0',
  mit: 'mit',
  'bsd-3-clause': 'bsd-3',
  'cc-by-nc-4.0': 'cc-by-nc-4-0',
  'cc-by-4.0': 'cc-by-4-0',
  'cc-by-sa-4.0': 'cc-by-sa-4-0',
  'gpl-3.0': 'gpl-3-0',
  'gpl-3.0-only': 'gpl-3-0',
  isc: 'isc',
  'openrail++': 'openrail',
  openrail: 'openrail',
  'creativeml-openrail-m': 'openrail',
  'bigscience-openrail-m': 'openrail',
  other: 'other',
};
const licenseId = (raw) => {
  if (!raw) return undefined;
  const key = String(raw).toLowerCase();
  return LICENSES[key] ?? 'custom';
};

// The runtime whose code executes the model, and the npm package whose current
// release the measurements are read against.
const RUNTIMES = {
  transformersjs: { license: 'apache-2-0', repo: 'https://github.com/huggingface/transformers.js', npm: '@huggingface/transformers' },
  'onnxruntime-web': { license: 'mit', repo: 'https://github.com/microsoft/onnxruntime', npm: 'onnxruntime-web' },
  mediapipe: { license: 'apache-2-0', repo: 'https://github.com/google-ai-edge/mediapipe', npm: '@mediapipe/tasks-vision' },
  tensorflowjs: { license: 'apache-2-0', repo: 'https://github.com/tensorflow/tfjs', npm: '@tensorflow/tfjs' },
  webllm: { license: 'apache-2-0', repo: 'https://github.com/mlc-ai/web-llm', npm: '@mlc-ai/web-llm' },
  'tesseract-wasm': { license: 'apache-2-0', repo: 'https://github.com/naptha/tesseract.js', npm: 'tesseract.js' },
  tflite: { license: 'apache-2-0', repo: 'https://github.com/tensorflow/tfjs', npm: '@tensorflow/tfjs-tflite' },
  opencvjs: { license: 'apache-2-0', repo: 'https://github.com/opencv/opencv' },
  'whisper-wasm': { license: 'mit', repo: 'https://github.com/ggml-org/whisper.cpp' },
};

// One ONNX file per precision, named after the transformers.js `dtype` that
// loads it, because `_quantized` (dtype q8) and `_int8` are different exports
// with different sizes — not two names for one file.
const PRECISIONS = [
  ['_fp16', 'fp16'],
  ['_quantized', 'q8'],
  ['_int8', 'int8'],
  ['_uint8', 'uint8'],
  ['_q4f16', 'q4f16'],
  ['_q4', 'q4'],
  ['_bnb4', 'bnb4'],
];
// Only these reach the table: the full-precision reference, the half-precision
// build, the default quantized build and the 4-bit build browsers load for LLMs.
const KEEP = new Set(['fp32', 'fp16', 'q8', 'q4f16']);
// A decoder-only repo often ships the same graph twice under legacy and current
// names. Without an encoder they are alternatives, not pipeline components.
const DECODER_ALIASES = ['model', 'decoder_model_merged', 'decoder_model'];
// Mirrors that exist to make a model loadable in the browser.
const MIRROR_OWNERS = ['Xenova', 'onnx-community'];

const splitPrecision = (stem) => {
  for (const [suffix, precision] of PRECISIONS) {
    if (stem.endsWith(suffix)) return [stem.slice(0, -suffix.length), precision];
  }
  return [stem, 'fp32'];
};

export function onnxVariants(siblings) {
  // precision -> component stem -> candidate file -> bytes. The three levels matter:
  // a pipeline SUMS its components, a component takes the LARGEST of its candidate
  // files (model_int8 and model_quantized are the same weights twice), and a file
  // ADDS its external-data sidecar.
  const groups = new Map();
  for (const { rfilename, size } of siblings) {
    const match = /^(?:.*\/)?([^/]+)\.onnx(_data)?$/.exec(rfilename);
    if (!match || size == null) continue;
    const [stem, precision] = splitPrecision(match[1]);
    if (!KEEP.has(precision)) continue;
    const group = groups.get(precision) ?? { stems: new Map() };
    const candidates = group.stems.get(stem) ?? new Map();
    candidates.set(match[1], (candidates.get(match[1]) ?? 0) + size);
    group.stems.set(stem, candidates);
    group.file ??= rfilename;
    groups.set(precision, group);
  }
  const variants = [];
  for (const [precision, group] of groups) {
    // A merged decoder supersedes the split pair; counting both doubles the size.
    if (group.stems.has('decoder_model_merged')) {
      group.stems.delete('decoder_model');
      group.stems.delete('decoder_with_past_model');
    }
    if (group.stems.has('encoder_model')) {
      group.stems.delete('model'); // a whole-model export beside the pipeline parts
    } else {
      const aliases = DECODER_ALIASES.filter((stem) => group.stems.has(stem));
      if (aliases.length > 1) {
        const largest = aliases.reduce(
          (best, stem) => Math.max(best, ...group.stems.get(stem).values()),
          0,
        );
        for (const stem of aliases) group.stems.delete(stem);
        group.stems.set('decoder', new Map([['decoder', largest]]));
      }
    }
    // A pipeline has a handful of components; dozens means the repo is a collection
    // (one file per voice or per language) and no single download size exists.
    if (group.stems.size > 8) continue;
    const bytes = [...group.stems.values()].reduce(
      (sum, candidates) => sum + Math.max(...candidates.values()),
      0,
    );
    if (bytes > 0) variants.push({ precision, bytes, file: group.file });
  }
  return variants.sort((a, b) => a.bytes - b.bytes);
}

// WebLLM loads MLC shards, not ONNX: the weights are params_shard_*.bin.
function mlcVariant(siblings, repoId) {
  const bytes = siblings
    .filter((s) => /params_shard_\d+\.bin$/.test(s.rfilename) && s.size != null)
    .reduce((sum, s) => sum + s.size, 0);
  if (!bytes) return [];
  const precision = /-(q[0-9a-z_]+)-MLC$/i.exec(repoId)?.[1] ?? 'mlc';
  return [{ precision, bytes, file: 'params_shard_0.bin' }];
}

const cache = new Map();
function getJson(url) {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url, { headers: { 'user-agent': 'web-ai-models-catalog/0.1 (+catalog sync)' } }).then(
        (response) => (response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`))),
      ),
    );
  }
  return cache.get(url);
}

// "upstream-example" means the project itself documents running this in a browser.
// A model card that imports transformers.js in its usage snippet is exactly that,
// and it is checkable, unlike a claim about someone's device.
async function documentsBrowserUsage(id) {
  const response = await fetch(`https://huggingface.co/${id}/raw/main/README.md`);
  if (!response.ok) return false;
  const card = await response.text();
  return /@(?:huggingface|xenova)\/transformers|transformers\.js/i.test(card);
}

const baseModelOf = (repo) =>
  repo.cardData?.base_model && typeof repo.cardData.base_model === 'string'
    ? repo.cardData.base_model
    : repo.tags?.find((tag) => tag.startsWith('base_model:') && !tag.startsWith('base_model:quantized'))?.slice('base_model:'.length);

/** A browser-loadable mirror of a PyTorch-only repo, or undefined. */
async function findOnnxMirror(id) {
  const name = id.split('/').pop().toLowerCase();
  const hits = await getJson(`${API}?search=${encodeURIComponent(name)}&filter=onnx&limit=30`).catch(() => []);
  const matches = hits.filter((hit) => hit.id !== id && hit.id.split('/').pop().toLowerCase() === name);
  return (
    matches.find((hit) => MIRROR_OWNERS.includes(hit.id.split('/')[0]))?.id ??
    matches.sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0))[0]?.id
  );
}

async function mapLimit(items, limit, worker) {
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) await worker(items[cursor++]);
    }),
  );
}

async function main() {
  const source = readFileSync(FILE, 'utf8');
  const start = source.indexOf('{', source.indexOf('MODELS'));
  const end = source.lastIndexOf('};');
  const models = JSON.parse(source.slice(start, end + 1));
  const entries = Object.values(models).flatMap((groups) => Object.values(groups).flat());

  const report = { variants: [], measured: [], documented: [], inherited: [], noLicense: [], noArtifacts: [], failed: [] };
  const addSource = (entry, url, kind) => {
    const existing = entry.sources.find((s) => s.url === url);
    if (existing) existing.reviewedAt = TODAY;
    else entry.sources.push({ url, kind, reviewedAt: TODAY });
  };

  // Runtime version and code license come from the runtime, not from the weights,
  // so every entry on a known browser runtime gets them.
  const npmVersions = new Map(
    await Promise.all(
      [...new Set(Object.values(RUNTIMES).map((r) => r.npm).filter(Boolean))].map(async (name) => [
        name,
        await getJson(`https://registry.npmjs.org/${name}`)
          .then((meta) => meta['dist-tags']?.latest)
          .catch(() => undefined),
      ]),
    ),
  );

  for (const entry of entries) {
    const runtime = RUNTIMES[entry.framework];
    if (!runtime) continue;
    // An entry that ships as its own package has its own license; the npm pass below
    // decides it, so only the runtime version is inherited here.
    if (!entry.npmPackage) entry.codeLicense = runtime.license;
    const version = npmVersions.get(runtime.npm);
    if (version) entry.runtimeVersion = `${runtime.npm}@${version}`;
    addSource(entry, runtime.repo, 'documentation');
  }

  // Entries that are themselves a published browser library: license and version
  // come from the registry that ships them.
  await mapLimit(
    entries.filter((entry) => entry.npmPackage),
    5,
    async (entry) => {
      try {
        const meta = await getJson(`https://registry.npmjs.org/${entry.npmPackage}`);
        const version = meta['dist-tags']?.latest;
        const license = licenseId(typeof meta.license === 'string' ? meta.license : meta.license?.type);
        if (license) entry.codeLicense = license;
        else delete entry.codeLicense; // the package declares none; do not borrow the runtime's
        if (version) entry.runtimeVersion = `${entry.npmPackage}@${version}`;
        addSource(entry, `https://www.npmjs.com/package/${entry.npmPackage}`, 'documentation');
      } catch (error) {
        report.failed.push(`${entry.id}: npm ${entry.npmPackage} — ${error.message}`);
      }
    },
  );

  await mapLimit(
    entries.filter((entry) => entry.modelId),
    5,
    async (entry) => {
      let repo;
      try {
        repo = await getJson(`${API}/${entry.modelId}?blobs=true`);
      } catch (error) {
        report.failed.push(`${entry.id}: ${entry.modelId} — ${error.message}`);
        return;
      }

      const siblings = repo.siblings ?? [];
      const found = entry.framework === 'webllm' ? mlcVariant(siblings, repo.id) : onnxVariants(siblings);

      let license = licenseId(repo.cardData?.license);
      if (!license) {
        const base = baseModelOf(repo);
        const baseLicense = base
          ? licenseId(await getJson(`${API}/${base}`).then((r) => r.cardData?.license).catch(() => undefined))
          : undefined;
        if (baseLicense) {
          license = baseLicense;
          addSource(entry, `https://huggingface.co/${base}`, 'model-or-project');
          report.inherited.push(`${entry.id}: ${license} from ${base}`);
        }
      }
      if (license) entry.weightLicense = license;
      else report.noLicense.push(`${entry.id}: ${entry.modelId}`);

      if (found.length) {
        entry.variants = found.map((variant) => ({
          id: `${entry.id}-${variant.precision}`,
          label: variant.precision,
          quantization: variant.precision,
          downloadBytes: variant.bytes,
          revision: repo.sha,
          artifactUrl: `https://huggingface.co/${repo.id}/resolve/${repo.sha}/${variant.file}`,
        }));
        report.variants.push(
          `${entry.id}: ${found.map((v) => `${v.precision} ${(v.bytes / 1048576).toFixed(0)} MiB`).join(', ')}`,
        );
      } else if (RUNTIMES[entry.framework]) {
        // Only a browser-runtime claim is a defect; an entry already labelled
        // Python/native is expected to have no browser weights.
        const mirror = await findOnnxMirror(entry.modelId);
        report.noArtifacts.push(
          `${entry.id}: ${entry.modelId} claims ${entry.framework}, ships no browser weights${mirror ? ` — mirror: ${mirror}` : ' — no mirror found'}`,
        );
      }

      addSource(entry, `https://huggingface.co/${repo.id}`, 'model-or-project');

      // Never downgrade: an entry tested here outranks a documented example.
      if (entry.browserEvidence.status === 'pending' && found.length && (await documentsBrowserUsage(repo.id))) {
        entry.browserEvidence = {
          status: 'upstream-example',
          url: `https://huggingface.co/${repo.id}`,
          reviewedAt: TODAY,
        };
        report.documented.push(`${entry.id}: ${repo.id}`);
      }
    },
  );

  // Weights hosted outside Hugging Face (MediaPipe's bucket, a raw repo file) still
  // have an exact size: ask for it rather than keeping a historical estimate.
  await mapLimit(
    entries.flatMap((entry) => entry.variants.map((variant) => ({ entry, variant }))).filter(
      ({ variant }) => variant.artifactUrl && variant.downloadBytes == null && !variant.artifactUrl.includes('huggingface.co'),
    ),
    5,
    async ({ entry, variant }) => {
      try {
        const response = await fetch(variant.artifactUrl, { method: 'HEAD', redirect: 'follow' });
        const length = Number(response.headers.get('content-length'));
        if (!response.ok || !length) throw new Error(`HTTP ${response.status}`);
        variant.downloadBytes = length;
        delete variant.reportedDownloadSize;
        report.measured.push(`${entry.id}: ${(length / 1048576).toFixed(1)} MiB`);
      } catch (error) {
        report.failed.push(`${entry.id}: HEAD ${variant.artifactUrl} — ${error.message}`);
      }
    },
  );

  for (const [title, lines] of Object.entries(report)) {
    console.log(`\n## ${title} (${lines.length})`);
    for (const line of lines.sort()) console.log(`  ${line}`);
  }

  if (!DRY_RUN) {
    writeFileSync(FILE, `${source.slice(0, start)}${JSON.stringify(models, null, 2)}${source.slice(end + 1)}`);
    console.log(`\nWrote ${FILE}`);
  }
}

// Importable for tests; the sync only runs when this file is the entry point.
if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
