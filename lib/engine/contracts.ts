import { MATTE_SPECS } from './matting';
import type { DemoSpec } from '../types';
import type { RealModelSpec } from '../data/real-models';

export const splitDetectionQueries = (value: string) => value.split(/[,，\n]/).map((s) => s.trim()).filter(Boolean);

/** Make the initial translation sample runnable without changing explicit choices. */
export function initialDemoParams(spec: DemoSpec | undefined, text: string) {
  const params: Record<string, string | number | boolean> = {};
  for (const param of spec?.params ?? []) params[param.key] = param.default;
  if (spec?.category === 'text' && spec.subcategory === 'translation') {
    params.targetLang = /[\u3400-\u9fff]/.test(text) ? 'en' : 'zh';
  }
  return params;
}

export function translationDirection(text: string, source: string, target: string) {
  const from = source === 'auto' ? (/[\u3400-\u9fff]/.test(text) ? 'zh' : 'en') : source;
  if (!['en', 'zh'].includes(from) || !['en', 'zh'].includes(target)) {
    throw new Error('This model supports English ↔ Chinese only / 当前模型仅支持中英互译');
  }
  return { from, target, repo: from === target ? null : `Xenova/opus-mt-${from}-${target}` };
}

const schemas: Record<string, Record<string, 'string' | 'boolean' | 'strings'>> = {
  job: { title: 'string', location: 'string', seniority: 'string', skills: 'strings', salary: 'string', remote: 'boolean' },
  event: { what: 'string', where: 'string', when: 'string', casualties: 'string', cause: 'string' },
  ticket: { product: 'string', version: 'string', symptom: 'string', environment: 'string', workaround: 'string' },
};
export function validateStructured(value: unknown, schema: string): void {
  const expected = schemas[schema];
  if (!expected || !value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Expected a JSON object / 模型未返回 JSON 对象');
  const obj = value as Record<string, unknown>;
  const valid = Object.keys(obj).length === Object.keys(expected).length && Object.entries(expected).every(([key, type]) =>
    type === 'strings' ? Array.isArray(obj[key]) && obj[key].every((v: unknown) => typeof v === 'string') : typeof obj[key] === type);
  if (!valid) throw new Error('Model output does not match the selected schema; retry / 输出不符合所选结构，请重试');
}

/** Only expose controls the selected real adapter actually consumes. */
export function supportedParams(spec: DemoSpec, real?: RealModelSpec): Set<string> | undefined {
  if (!real) return undefined;
  const byKind: Record<string, string[]> = {
    labels: real.task === 'text-classification' ? ['threshold'] : real.task === 'zero-shot-classification' ? ['threshold', 'task'] : ['topK'],
    text: real.task === 'translation' ? ['sourceLang', 'targetLang', 'maxTokens'] : real.task === 'summarization' ? ['maxLength', 'style'] : [],
    json: real.task === 'token-classification' ? ['minScore'] : ['schema', 'strict'],
    chat: real.task === 'text-generation' ? ['temperature', 'maxTokens'] : [],
    code: ['language', 'task'], embedding: ['dim', 'normalize'], ranking: ['topK'], search: ['topK'],
    detection: ['conf'], segmentation: real.task === 'image-segmentation' ||
      Boolean(MATTE_SPECS[real.repo]) ? ['thresh', 'feather'] : [],
    depth: [], restoration: ['strength', 'compare'],
    inpainting: ['brushSize', 'feather'], transcript: ['lang', 'timestamps'], 'synth-audio': [],
    'audio-compare': ['strength', 'hpf'], stems: ['model'], ocr: real.task === 'tesseract' ? ['lang'] : [],
    'landmarks-face': [], 'landmarks-pose': [], 'landmarks-hand': [], tracking: ['maxAge', 'conf'],
    'video-timeline': ['fps', 'maxSegments'], 'video-inpainting': ['method'],
  };
  return new Set(byKind[spec.outputKind] ?? []);
}
