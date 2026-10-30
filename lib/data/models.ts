import type { ModelCatalog, ModelEntry } from '../types';
import raw from './models.json';
import extra from './extra-models.json';

// models.json is regenerated from ../WebAIModels by scripts/extract-models.cjs; entries that
// the upstream catalogue does not list live in extra-models.json so a re-extract cannot drop them.
// Subcategory lists are concatenated (extras appended, duplicates dropped by id) rather than
// replaced — otherwise one extra entry would hide every models.json entry of its subcategory
// and become the first, i.e. default-selected, model on the demo page.
const mergeCategory = (rawCat: object = {}, extraCat: object = {}) =>
  Object.fromEntries(
    [...new Set([...Object.keys(rawCat), ...Object.keys(extraCat)])].map((sub) => {
      const a = (rawCat as Record<string, ModelEntry[]>)[sub] ?? [];
      const b = (extraCat as Record<string, ModelEntry[]>)[sub] ?? [];
      const seen = new Set<string>();
      return [sub, [...a, ...b].filter((m) => (seen.has(m.id) ? false : seen.add(m.id)))];
    })
  );

const merged = Object.fromEntries(
  [...new Set([...Object.keys(raw), ...Object.keys(extra)])].map((c) => [
    c,
    mergeCategory((raw as Record<string, object>)[c], (extra as Record<string, object>)[c]),
  ])
);

export const MODELS = merged as unknown as ModelCatalog;

export const listModels = (category: string, subcategory: string): ModelEntry[] =>
  MODELS[category]?.[subcategory] ?? [];

export const findModel = (category: string, subcategory: string, id: string): ModelEntry | undefined =>
  listModels(category, subcategory).find((m) => m.id === id);

export const FRAMEWORK_LABEL: Record<string, string> = {
  transformersjs: 'Transformers.js',
  'onnxruntime-web': 'ONNX Runtime Web',
  mediapipe: 'MediaPipe',
  tensorflowjs: 'TensorFlow.js',
  webllm: 'WebLLM',
  'whisper-wasm': 'whisper.cpp (WASM)',
  opencvjs: 'OpenCV.js',
  tflite: 'TFLite',
  wasm: 'WebAssembly',
  api: 'Server API',
};

export const LICENSE_LABEL: Record<string, string> = {
  'apache-2-0': 'Apache-2.0',
  mit: 'MIT',
  'bsd-3': 'BSD-3-Clause',
  'cc-by-4-0': 'CC-BY-4.0',
  'cc-by-sa-4-0': 'CC-BY-SA-4.0',
  openrail: 'OpenRAIL',
  custom: 'Custom',
  other: 'Other',
};
