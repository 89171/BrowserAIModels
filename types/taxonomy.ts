export type Slug = string;

export interface SubcategoryMeta {
  slug: Slug;
}

export interface CategoryMeta {
  slug: Slug;
  subcategories: SubcategoryMeta[];
}

export type FrameworkId =
  | 'transformersjs'
  | 'mediapipe'
  | 'onnxruntime-web'
  | 'tensorflowjs'
  | 'webllm'
  | 'whisper-wasm'
  | 'opencvjs'
  | 'tflite'
  | 'transformers';

export type LicenseId =
  | 'apache-2-0'
  | 'mit'
  | 'bsd-3'
  | 'cc-by-4-0'
  | 'cc-by-sa-4-0'
  | 'openrail'
  | 'custom'
  | 'other';

export interface ModelEntry {
  id: string;
  /** Fallback name (used when no `nameKey` resolves in the active locale). */
  name: string;
  /** i18n key under `models.<id>.name`. When present, looked up at render time. */
  nameKey?: string;
  framework: FrameworkId;
  size: string;
  license: LicenseId;
  languages: string[];
  /** Fallback description. */
  description: string;
  /** i18n key under `models.<id>.description`. */
  descriptionKey?: string;
  /** Absolute demo URL — rendered as-is. */
  demoUrl?: string;
  /** Locale-aware demo URL. Rendered as `{demoBase}/{locale}{demoPath}`. */
  demoBase?: string;
  demoPath?: string;
  docsUrl?: string;
}

export type CategoryModels = Record<string, Record<string, ModelEntry[]>>;

export type CategorySlug =
  | 'text'
  | 'llm'
  | 'search-rag'
  | 'vision'
  | 'generative-vision'
  | 'audio'
  | 'generative-audio'
  | 'multimodal'
  | 'real-time'
  | 'video';

export type SubcategorySlug =
  | 'classification'
  | 'translation'
  | 'summarization'
  | 'chat'
  | 'structured-output'
  | 'code'
  | 'embedding'
  | 'reranker'
  | 'semantic-search'
  | 'detection'
  | 'segmentation'
  | 'ocr'
  | 'depth'
  | 'image-restoration'
  | 'text-to-image'
  | 'inpainting'
  | 'asr'
  | 'tts'
  | 'denoising'
  | 'source-separation'
  | 'text-to-music'
  | 'voice-cloning'
  | 'vlm'
  | 'clip'
  | 'document-understanding'
  | 'face'
  | 'pose'
  | 'hand'
  | 'tracking'
  | 'video-understanding';
