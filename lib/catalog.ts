import type { ModelEntry } from '@/types/taxonomy';

export function resolveDemoUrl(model: ModelEntry, locale: string) {
  if (model.demoUrl) return model.demoUrl;
  if (model.demoBase && model.demoPath) {
    const path = model.demoPath.startsWith('/') ? model.demoPath : `/${model.demoPath}`;
    return `${model.demoBase.replace(/\/$/, '')}/${locale}${path}`;
  }
}
