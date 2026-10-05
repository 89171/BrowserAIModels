import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onnxVariants } from '../scripts/sync-hf.mjs';

const files = (...pairs) => pairs.map(([rfilename, mib]) => ({ rfilename, size: mib * 1048576 }));
const mib = (variants, precision) =>
  Math.round(variants.find((v) => v.precision === precision).bytes / 1048576);

test('alternative exports of one component are not added together', () => {
  // model_int8 and model_quantized are the same weights exported twice; dtype q8
  // loads model_quantized, so that file alone is the q8 download.
  const variants = onnxVariants(
    files(
      ['onnx/model.onnx', 256],
      ['onnx/model_fp16.onnx', 128],
      ['onnx/model_int8.onnx', 64],
      ['onnx/model_quantized.onnx', 64],
      ['onnx/model_uint8.onnx', 64],
    ),
  );
  assert.deepEqual(
    variants.map((v) => v.precision),
    ['q8', 'fp16', 'fp32'],
  );
  assert.equal(mib(variants, 'q8'), 64);
});

test('a pipeline adds its components and ignores the superseded decoder', () => {
  const variants = onnxVariants(
    files(
      ['onnx/encoder_model_quantized.onnx', 100],
      ['onnx/decoder_model_quantized.onnx', 400],
      ['onnx/decoder_model_merged_quantized.onnx', 410],
      ['onnx/decoder_with_past_model_quantized.onnx', 380],
    ),
  );
  assert.equal(mib(variants, 'q8'), 510);
});

test('a decoder-only repo takes the larger of its duplicate exports, with sidecars', () => {
  const variants = onnxVariants(
    files(
      ['onnx/model.onnx', 1],
      ['onnx/model.onnx_data', 4196],
      ['onnx/decoder_model_merged.onnx', 2],
      ['onnx/decoder_model_merged.onnx_data', 4196],
    ),
  );
  assert.equal(mib(variants, 'fp32'), 4198);
});

test('a voice or language collection reports no single download size', () => {
  const variants = onnxVariants(
    files(...Array.from({ length: 12 }, (_, i) => [`voices/voice_${i}.onnx`, 60])),
  );
  assert.deepEqual(variants, []);
});
