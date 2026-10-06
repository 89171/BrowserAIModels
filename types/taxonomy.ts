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
  | 'transformers'
  | 'tesseract-wasm'
  | 'wasm'
  | 'python'
  | 'native'
  | 'unknown';

export type LicenseId =
  | 'apache-2-0'
  | 'agpl-3-0'
  | 'mit'
  | 'bsd-3'
  | 'cc-by-nc-4-0'
  | 'cc-by-4-0'
  | 'cc-by-sa-4-0'
  | 'gpl-3-0'
  | 'isc'
  | 'openrail'
  | 'custom'
  | 'other';

export interface ModelVariant {
  id: string;
  label: string;
  /** Historic estimate, not a measured or source-verified download size. */
  reportedDownloadSize?: string;
  demoBase?: string;
  demoPath?: string;
  quantization?: string;
  artifactUrl?: string;
  revision?: string;
  downloadBytes?: number;
  peakMemoryMB?: number;
}

export interface BrowserBenchmark {
  date: string;
  browser: string;
  os: string;
  hardware: string;
  runtimeVersion: string;
  variantId: string;
  backend: string;
  input: string;
  metric: string;
  value: number;
  unit: string;
  sourceUrl: string;
}

export interface ModelEntry {
  id: string;
  name: string;
  nameKey?: string;
  description: string;
  descriptionKey?: string;
  kind: 'model' | 'tool' | 'application';
  framework: FrameworkId;
  modelId?: string;
  /** npm package that ships this entry's code; source of its code license and version. */
  npmPackage?: string;
  tasks: string[];
  naturalLanguages: string[];
  programmingLanguages: string[];
  capabilities: string[];
  variants: ModelVariant[];
  runtimeVersion?: string;
  backends?: string[];
  codeLicense?: LicenseId;
  weightLicense?: LicenseId;
  /** Preserved legacy label; not treated as verified code or weight licensing. */
  reportedLicense?: LicenseId;
  identityUnresolved?: boolean;
  sources: { url: string; kind: 'documentation' | 'browser-example' | 'model-or-project' | 'conflicting-reference'; reviewedAt?: string }[];
  browserEvidence: {
    status: 'pending' | 'upstream-example' | 'tested';
    url?: string;
    reviewedAt?: string;
  };
  benchmarks?: BrowserBenchmark[];
  demoUrl?: string;
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
  | 'ner'
  | 'image-classification'
  | 'vad'
  | 'audio-classification'
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
