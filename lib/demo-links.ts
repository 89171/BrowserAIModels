import { hasDemo } from '@/lib/data/registry';
import { hasDemoModel } from '@/lib/demo-catalog';

/**
 * Href (without the locale prefix — next-intl's `Link` adds it) for the
 * interactive demo page of a catalogue task, or undefined when the demo
 * registry has no page for it.
 */
export function demoPagePath(category: string, subcategory: string): string | undefined {
  return hasDemo(category, subcategory) ? `/demos/${category}/${subcategory}` : undefined;
}

/**
 * Href for one entry inside a demo page. The model segment is only emitted when
 * the demo switcher actually lists that id, so a catalogue link never opens a
 * playground showing a different model than the one that was clicked.
 */
export function demoModelPath(
  category: string,
  subcategory: string,
  modelId: string,
): string | undefined {
  const page = demoPagePath(category, subcategory);
  if (!page) return undefined;
  return hasDemoModel(category, subcategory, modelId) ? `${page}/${modelId}` : page;
}
