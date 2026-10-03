export const APPLICATIONS = [
  { id: 'meeting-notes', tasks: ['audio/vad', 'audio/asr', 'text/summarization'], entries: ['silero-vad-web', 'whisper-small', 'bart-large-cnn'], source: 'https://github.com/ricky0123/vad' },
  { id: 'document-qa', tasks: ['vision/ocr', 'search-rag/embedding', 'search-rag/reranker', 'llm/chat'], entries: ['tesseractjs', 'all-minilm-l6-v2', 'ms-marco-minilm'], source: 'https://github.com/naptha/tesseract.js' },
  { id: 'product-cutout', tasks: ['vision/segmentation', 'vision/image-restoration'], entries: ['imgly-bg-removal'], source: 'https://github.com/imgly/background-removal-js/blob/main/packages/web/README.md' },
  { id: 'offline-translation', tasks: ['text/translation'], entries: ['nllb-200', 'opus-mt-en-zh'], source: 'https://huggingface.co/facebook/nllb-200-distilled-600M' },
] as const;
