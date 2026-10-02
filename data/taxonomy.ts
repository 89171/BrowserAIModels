import type { CategoryMeta } from '@/types/taxonomy';

export const TAXONOMY: CategoryMeta[] = [
  {
    slug: 'text',
    subcategories: [
      { slug: 'classification' },
      { slug: 'translation' },
      { slug: 'summarization' },
    ],
  },
  {
    slug: 'llm',
    subcategories: [
      { slug: 'chat' },
      { slug: 'structured-output' },
      { slug: 'code' },
    ],
  },
  {
    slug: 'search-rag',
    subcategories: [
      { slug: 'embedding' },
      { slug: 'reranker' },
      { slug: 'semantic-search' },
    ],
  },
  {
    slug: 'vision',
    subcategories: [
      { slug: 'detection' },
      { slug: 'segmentation' },
      { slug: 'ocr' },
      { slug: 'depth' },
      { slug: 'image-restoration' },
    ],
  },
  {
    slug: 'generative-vision',
    subcategories: [{ slug: 'text-to-image' }, { slug: 'inpainting' }],
  },
  {
    slug: 'audio',
    subcategories: [
      { slug: 'asr' },
      { slug: 'tts' },
      { slug: 'denoising' },
      { slug: 'source-separation' },
    ],
  },
  {
    slug: 'generative-audio',
    subcategories: [
      { slug: 'text-to-music' },
      { slug: 'voice-cloning' },
    ],
  },
  {
    slug: 'multimodal',
    subcategories: [
      { slug: 'vlm' },
      { slug: 'clip' },
      { slug: 'document-understanding' },
    ],
  },
  {
    slug: 'real-time',
    subcategories: [
      { slug: 'face' },
      { slug: 'pose' },
      { slug: 'hand' },
      { slug: 'tracking' },
    ],
  },
  {
    slug: 'video',
    subcategories: [{ slug: 'video-understanding' }],
  },
];

export const getCategory = (slug: string) =>
  TAXONOMY.find((c) => c.slug === slug);

export const getSubcategory = (cat: string, sub: string) =>
  getCategory(cat)?.subcategories.find((s) => s.slug === sub);
