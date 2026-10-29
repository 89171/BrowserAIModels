import { getModels } from '@/data/models';
import type { ModelEntry as CatalogEntry } from '@/types/taxonomy';
import { listModels } from '@/lib/data/models';
import { weightDownloadTier } from '@/lib/model-size';
import { formatGib } from '@/lib/seo';
import type { ModelEntry } from '@/lib/types';

/** ONNX spells the unsigned 8-bit quantisation type out; the badge does not. */
const TIER_LABEL: Record<string, string> = { quint8: 'int8' };

/**
 * The demo switcher used to read `lib/data/models.json` alone. That snapshot was
 * generated from this catalogue and drifts the moment an entry is added here, so
 * the two lists are merged: curated demo entries first, then any catalogue entry
 * the snapshot has not seen.
 *
 * The curated snapshot also carried its own `size` strings, and those had gone
 * stale — they were written from the fp32 build, so a model the browser loads as
 * 64 MiB read as 255 MB. Whenever the catalogue knows the weights, its measured
 * size wins; the curated string is only the fallback for entries the catalogue
 * cannot size at all (closed APIs, npm-only libraries).
 *
 * The size is annotated with the precision it belongs to, because a lone byte
 * count is ambiguous: RMBG-1.4 is 42 MiB as int8 and 84 MiB as fp16, and the
 * badge used to show the smaller number with no hint of which build it meant.
 */
function sizeOf(entry: Pick<CatalogEntry, 'variants'>): string {
  const tier = weightDownloadTier(entry);
  if (tier) {
    const precision = tier.quantization
      ? ` · ${TIER_LABEL[tier.quantization] ?? tier.quantization}`
      : '';
    return `~${formatGib(tier.bytes)}${precision}`;
  }
  const reported = entry.variants.find((v) => v.reportedDownloadSize)?.reportedDownloadSize;
  return reported ?? '—';
}

function toDemoEntry(entry: CatalogEntry): ModelEntry {
  return {
    id: entry.id,
    name: entry.name,
    framework: entry.framework,
    size: sizeOf(entry),
    license: entry.codeLicense ?? entry.weightLicense ?? 'other',
    languages: entry.naturalLanguages,
    description: entry.description,
    docsUrl: entry.docsUrl,
  };
}

const cache = new Map<string, ModelEntry[]>();

export function demoModels(category: string, subcategory: string): ModelEntry[] {
  const key = `${category}/${subcategory}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const catalogue = new Map(getModels(category, subcategory).map((entry) => [entry.id, entry]));
  const own = listModels(category, subcategory).map((entry) => {
    const measured = catalogue.get(entry.id);
    return measured ? { ...entry, size: sizeOf(measured) } : entry;
  });
  const known = new Set(own.map((m) => m.id));
  const rest = getModels(category, subcategory)
    .filter((m) => !known.has(m.id))
    .map(toDemoEntry);
  const merged = [...own, ...rest];
  cache.set(key, merged);
  return merged;
}

export function hasDemoModel(category: string, subcategory: string, modelId: string): boolean {
  return demoModels(category, subcategory).some((m) => m.id === modelId);
}
