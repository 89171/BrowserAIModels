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

const { weightDownloadBytes, weightDownloadTier } = load('lib/model-size.ts');

const MiB = 1024 * 1024;
const variant = (label, mib, quantization) => ({
  id: label,
  label,
  quantization,
  downloadBytes: Math.round(mib * MiB),
});

test('precision builds are alternatives, so the entry costs the smallest of them', () => {
  const entry = {
    variants: [variant('fp32', 255.5), variant('fp16', 127.9), variant('q8', 64.5, 'q8')],
  };
  assert.equal(weightDownloadBytes(entry), Math.round(64.5 * MiB));
});

test('pipeline components are all downloaded, so their sizes add up', () => {
  const entry = { variants: [variant('detection', 4.6), variant('recognition', 15.9)] };
  assert.equal(weightDownloadBytes(entry), Math.round(20.5 * MiB));
});

test('a quantised component still counts as an alternative, not a part', () => {
  const entry = {
    variants: [variant('model_quantized', 44), variant('model_fp16', 88, 'fp16')],
  };
  assert.equal(weightDownloadBytes(entry), 44 * MiB);
});

test('a single measurable variant is the size', () => {
  assert.equal(weightDownloadBytes({ variants: [variant('default', 6.9)] }), Math.round(6.9 * MiB));
});

test('an entry with no measured bytes reports nothing instead of guessing', () => {
  assert.equal(weightDownloadBytes({ variants: [] }), undefined);
  assert.equal(
    weightDownloadBytes({ variants: [{ id: 'x', label: 'default', reportedDownloadSize: '~5 MB' }] }),
    undefined,
  );
});

test('the chosen build carries its precision, so a size badge can name it', () => {
  const entry = {
    variants: [
      variant('q8', 42.3, 'q8'),
      variant('fp16', 84.1, 'fp16'),
      variant('fp32', 168, 'fp32'),
    ],
  };
  // Field-wise: the module is transpiled inside a vm context, so the returned
  // object's prototype is from another realm and deepEqual rejects it.
  const tier = weightDownloadTier(entry);
  assert.equal(tier.bytes, Math.round(42.3 * MiB));
  assert.equal(tier.quantization, 'q8');
});

test('a sum over pipeline parts names no single precision', () => {
  const entry = { variants: [variant('detection', 4.6), variant('recognition', 15.9)] };
  const tier = weightDownloadTier(entry);
  assert.equal(tier.bytes, Math.round(20.5 * MiB));
  assert.equal(tier.quantization, undefined);
});
