import { getModels } from '@/data/models';
import type { ModelEntry as CatalogEntry } from '@/types/taxonomy';
import { listModels } from '@/lib/data/models';
import type { ModelEntry } from '@/lib/types';

/**
 * The demo switcher used to read `lib/data/models.json` alone. That snapshot was
 * generated from this catalogue and drifts the moment an entry is added here, so
 * the two lists are merged: curated demo entries first (they carry a readable
 * download estimate), then any catalogue entry the snapshot has not seen.
 */
function sizeOf(entry: CatalogEntry): string {
  const bytes = entry.variants
    .map((v) => v.downloadBytes)
    .filter((b): b is number => typeof b === 'number');
  if (bytes.length) return `~${Math.round(Math.min(...bytes) / 1048576)} MB`;
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
  const own = listModels(category, subcategory);
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
