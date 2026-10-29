import type { FrameworkId, ModelEntry } from '@/types/taxonomy';
import { weightDownloadBytes } from '@/lib/model-size';

/**
 * Facts used by the page intros and by the "at a glance" blocks. Everything here
 * is derived from the catalogue, so the copy never drifts from the data: if a
 * weight size is unknown, the page says so instead of guessing.
 */
export type TaskFacts = {
  total: number;
  models: number;
  tools: number;
  apps: number;
  tested: number;
  upstream: number;
  pending: number;
  /** Entries with browser evidence of either kind. */
  ready: number;
  frameworks: { id: FrameworkId; count: number }[];
  /** Smallest verified download size across all variants, in bytes. */
  smallestBytes?: number;
};

export function taskFacts(entries: ModelEntry[]): TaskFacts {
  const byKind = (kind: ModelEntry['kind']) => entries.filter((e) => e.kind === kind).length;
  const byStatus = (status: ModelEntry['browserEvidence']['status']) =>
    entries.filter((e) => e.browserEvidence.status === status).length;
  const tested = byStatus('tested');
  const upstream = byStatus('upstream-example');

  const frameworkCounts = new Map<FrameworkId, number>();
  for (const entry of entries) {
    frameworkCounts.set(entry.framework, (frameworkCounts.get(entry.framework) ?? 0) + 1);
  }

  const sizes = entries
    .map((entry) => weightDownloadBytes(entry))
    .filter((bytes): bytes is number => typeof bytes === 'number' && bytes > 0);

  return {
    total: entries.length,
    models: byKind('model'),
    tools: byKind('tool'),
    apps: byKind('application'),
    tested,
    upstream,
    pending: entries.length - tested - upstream,
    ready: tested + upstream,
    frameworks: [...frameworkCounts.entries()]
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id)),
    smallestBytes: sizes.length ? Math.min(...sizes) : undefined,
  };
}

const MIB = 1024 * 1024;

/** One decimal below 100 MiB, whole numbers above it: 4.3 MiB, 198 MiB. */
export function formatMib(bytes?: number): string | undefined {
  if (!bytes || bytes <= 0) return undefined;
  const mib = bytes / MIB;
  return mib < 100 ? mib.toFixed(1) : String(Math.round(mib));
}

export function formatGib(bytes?: number): string | undefined {
  if (!bytes || bytes <= 0) return undefined;
  if (bytes < 1024 * MIB) return `${formatMib(bytes)} MiB`;
  return `${(bytes / (1024 * MIB)).toFixed(1)} GB`;
}

/**
 * Keywords are metadata only — Google ignores them, Bing and some in-app
 * search surfaces still read them. They restate what the page is about, in the
 * phrases people actually type ("run X in browser", "X ONNX"), so nothing here
 * claims a fact the page does not show.
 */
/**
 * The demo registry has its own, smaller entry type; keywords only need a name,
 * so accept the structural minimum instead of forcing one catalogue type.
 */
export type KeywordEntry = {
  name: string;
  variants?: { downloadBytes?: number }[];
};

export function taskKeywords(
  locale: string,
  name: string,
  categoryName: string,
  entries: KeywordEntry[],
): string[] {
  const topModels = entries.slice(0, 3).map((entry) => entry.name);
  const zh = [
    name,
    `${name} 模型`,
    `浏览器 ${name}`,
    `在浏览器中运行 ${name}`,
    `浏览器端 ${name}`,
    `${name} 本地推理`,
    `${name} ONNX`,
    `${name} WebGPU`,
    `${categoryName} ${name}`,
    'Web AI 模型',
  ];
  const en = [
    name,
    `${name} models`,
    `run ${name} in the browser`,
    `browser ${name}`,
    `client-side ${name}`,
    `${name} ONNX`,
    `${name} WebGPU`,
    `${name} local inference`,
    `${categoryName} ${name}`,
    'web AI models',
  ];
  return [...(locale === 'zh' ? zh : en), ...topModels];
}

export function modelKeywords(
  locale: string,
  name: string,
  categoryName: string,
  taskName: string,
  entry: KeywordEntry,
  frameworkLabel: string,
): string[] {
  const size = weightDownloadBytes(entry);
  const sizeLabel = formatGib(size);
  const zh = [
    name,
    `${name} 模型`,
    `${name} 浏览器`,
    `${name} 本地运行`,
    `${name} ${frameworkLabel}`,
    `${taskName} ${name}`,
    `${categoryName} ${name}`,
    `${name} 权重体积`,
    sizeLabel ? `${name} ${sizeLabel}` : '',
  ];
  const en = [
    name,
    `${name} model`,
    `${name} in the browser`,
    `run ${name} locally`,
    `${name} ${frameworkLabel}`,
    `${taskName} ${name}`,
    `${categoryName} ${name}`,
    `${name} download size`,
    sizeLabel ? `${name} ${sizeLabel}` : '',
  ];
  return [...(locale === 'zh' ? zh : en)].filter(Boolean);
}

export function homeKeywords(locale: string): string[] {
  if (locale === 'zh') {
    return [
      '浏览器 AI 模型',
      '浏览器端 AI',
      '本地推理',
      'WebGPU 模型',
      'Transformers.js',
      'ONNX Runtime Web',
      '端侧 AI',
      '浏览器内运行大模型',
      'WebAssembly AI',
      '前端 AI 模型目录',
      '在浏览器里跑模型',
    ];
  }
  return [
    'browser AI models',
    'run AI in the browser',
    'client-side inference',
    'WebGPU models',
    'Transformers.js models',
    'ONNX Runtime Web',
    'on-device AI',
    'run LLMs in the browser',
    'WebAssembly AI',
    'front-end AI model catalogue',
    'browser machine learning',
  ];
}

export function demosKeywords(locale: string): string[] {
  if (locale === 'zh') {
    return [
      '浏览器 AI 演示',
      '在线模型演示',
      '本地推理演示',
      '浏览器内运行模型',
      'AI 模型对比',
      '无需上传的 AI 演示',
    ];
  }
  return [
    'browser AI demos',
    'run models in your browser',
    'client-side inference demo',
    'AI model comparison',
    'local AI playground',
    'no-upload AI demo',
  ];
}
