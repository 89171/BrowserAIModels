import type { CategoryModels } from '@/types/taxonomy';

export const MODELS: CategoryModels = {
  "text": {
    "classification": [
      {
        "id": "distilbert-sst2",
        "nameKey": "models.distilbert-sst2.name",
        "descriptionKey": "models.distilbert-sst2.description",
        "name": "DistilBERT (SST-2)",
        "framework": "transformersjs",
        "description": "Compact BERT variant fine-tuned for binary sentiment classification.",
        "docsUrl": "https://huggingface.co/Xenova/distilbert-base-uncased-finetuned-sst-2-english",
        "kind": "model",
        "tasks": [
          "classification"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/distilbert-base-uncased-finetuned-sst-2-english",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "distilbert-sst2",
            "label": "default",
            "reportedDownloadSize": "~67 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
      },
      {
        "id": "xlm-roberta-base",
        "nameKey": "models.xlm-roberta-base.name",
        "descriptionKey": "models.xlm-roberta-base.description",
        "name": "XLM-RoBERTa Base",
        "framework": "transformersjs",
        "description": "Multilingual masked language model; used for zero-shot text classification.",
        "docsUrl": "https://huggingface.co/Xenova/xlm-roberta-base",
        "kind": "model",
        "tasks": [
          "classification"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/xlm-roberta-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "100+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "xlm-roberta-base",
            "label": "default",
            "reportedDownloadSize": "~278 MB"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/xlm-roberta-base"
      },
      {
        "id": "toxic-bert",
        "nameKey": "models.toxic-bert.name",
        "descriptionKey": "models.toxic-bert.description",
        "name": "Toxic-BERT",
        "framework": "transformersjs",
        "description": "Detects toxic comments across multiple labels.",
        "docsUrl": "https://huggingface.co/Xenova/toxic-bert",
        "kind": "model",
        "tasks": [
          "classification"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/toxic-bert",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "toxic-bert",
            "label": "default",
            "reportedDownloadSize": "~110 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/toxic-bert"
      },
      {
        "id": "mobilenet-bert",
        "nameKey": "models.mobilenet-bert.name",
        "descriptionKey": "models.mobilenet-bert.description",
        "name": "MobileBERT",
        "framework": "onnxruntime-web",
        "description": "Compact BERT optimized for mobile / browser inference.",
        "docsUrl": "https://huggingface.co/google/mobilebert-uncased",
        "kind": "model",
        "tasks": [
          "classification"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/google/mobilebert-uncased",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "mobilenet-bert",
            "label": "default",
            "reportedDownloadSize": "~100 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "google/mobilebert-uncased"
      }
    ],
    "translation": [
      {
        "id": "nllb-200",
        "nameKey": "models.nllb-200.name",
        "descriptionKey": "models.nllb-200.description",
        "name": "NLLB-200 Distilled",
        "framework": "transformersjs",
        "description": "NLLB-200 distilled 600M translation model. Weight license: CC-BY-NC-4.0. Exact browser artifact and runtime configuration remain to be verified.",
        "docsUrl": "https://huggingface.co/facebook/nllb-200-distilled-600M",
        "kind": "model",
        "tasks": [
          "translation"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/facebook/nllb-200-distilled-600M",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "200+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "nllb-200",
            "label": "default",
            "reportedDownloadSize": "~600 MB"
          }
        ],
        "modelId": "facebook/nllb-200-distilled-600M",
        "weightLicense": "cc-by-nc-4-0"
      },
      {
        "id": "opus-mt-en-zh",
        "nameKey": "models.opus-mt-en-zh.name",
        "descriptionKey": "models.opus-mt-en-zh.description",
        "name": "Opus-MT (en↔zh)",
        "framework": "transformersjs",
        "description": "MarianMT-based English ↔ Chinese translation pair.",
        "docsUrl": "https://huggingface.co/Xenova/opus-mt-en-zh",
        "kind": "model",
        "tasks": [
          "translation"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/opus-mt-en-zh",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English",
          "Chinese"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "opus-mt-en-zh",
            "label": "default",
            "reportedDownloadSize": "~75 MB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "Xenova/opus-mt-en-zh"
      },
      {
        "id": "m2m100-418m",
        "nameKey": "models.m2m100-418m.name",
        "descriptionKey": "models.m2m100-418m.description",
        "name": "M2M-100 (418M)",
        "framework": "onnxruntime-web",
        "description": "Many-to-many translation model runnable in the browser via ONNX.",
        "docsUrl": "https://huggingface.co/facebook/m2m100_418M",
        "kind": "model",
        "tasks": [
          "translation"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/facebook/m2m100_418M",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "100 languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "m2m100-418m",
            "label": "default",
            "reportedDownloadSize": "~1.7 GB"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "facebook/m2m100_418M"
      }
    ],
    "summarization": [
      {
        "id": "t5-small",
        "nameKey": "models.t5-small.name",
        "descriptionKey": "models.t5-small.description",
        "name": "T5 Small",
        "framework": "transformersjs",
        "description": "Lightweight T5 variant for short text summarization.",
        "docsUrl": "https://huggingface.co/Xenova/t5-small",
        "kind": "model",
        "tasks": [
          "summarization"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/t5-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "t5-small",
            "label": "default",
            "reportedDownloadSize": "~60 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/t5-small"
      },
      {
        "id": "bart-large-cnn",
        "nameKey": "models.bart-large-cnn.name",
        "descriptionKey": "models.bart-large-cnn.description",
        "name": "BART Large CNN",
        "framework": "transformersjs",
        "description": "BART fine-tuned on CNN/DailyMail — strong abstractive summarization.",
        "docsUrl": "https://huggingface.co/Xenova/bart-large-cnn",
        "kind": "model",
        "tasks": [
          "summarization"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/bart-large-cnn",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "bart-large-cnn",
            "label": "default",
            "reportedDownloadSize": "~400 MB"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/bart-large-cnn"
      },
      {
        "id": "pegasus-xsum",
        "nameKey": "models.pegasus-xsum.name",
        "descriptionKey": "models.pegasus-xsum.description",
        "name": "PEGASUS XSum",
        "framework": "transformersjs",
        "description": "Abstractive summarization model trained on XSum.",
        "docsUrl": "https://huggingface.co/google/pegasus-xsum",
        "kind": "model",
        "tasks": [
          "summarization"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/google/pegasus-xsum",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "pegasus-xsum",
            "label": "default",
            "reportedDownloadSize": "~570 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "google/pegasus-xsum"
      }
    ],
    "ner": [
      {
        "id": "bert-base-ner",
        "name": "BERT Base NER (ONNX)",
        "nameKey": "models.bert-base-ner.name",
        "description": "Token classification for extracting named entities; upstream provides ONNX weights and a Transformers.js example.",
        "descriptionKey": "models.bert-base-ner.description",
        "framework": "transformersjs",
        "kind": "model",
        "tasks": [
          "ner"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/bert-base-NER",
          "reviewedAt": "2026-10-03"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/bert-base-NER",
            "kind": "browser-example",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "bert-base-ner",
            "label": "default"
          }
        ],
        "docsUrl": "https://huggingface.co/Xenova/bert-base-NER",
        "modelId": "Xenova/bert-base-NER",
        "weightLicense": "mit"
      }
    ]
  },
  "llm": {
    "chat": [
      {
        "id": "llama-3-8b-instruct",
        "nameKey": "models.llama-3-8b-instruct.name",
        "descriptionKey": "models.llama-3-8b-instruct.description",
        "name": "Llama-3 8B Instruct",
        "framework": "webllm",
        "description": "Meta Llama 3 chat-tuned 8B; runs in the browser with WebGPU via WebLLM.",
        "demoUrl": "https://chat.webllm.ai/",
        "docsUrl": "https://huggingface.co/mlc-ai/Llama-3-8B-Instruct-q4f32_1-MLC",
        "kind": "model",
        "tasks": [
          "chat"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/Llama-3-8B-Instruct-q4f32_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "llama-3-8b-instruct",
            "label": "default",
            "reportedDownloadSize": "~4.7 GB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "mlc-ai/Llama-3-8B-Instruct-q4f32_1-MLC"
      },
      {
        "id": "phi-3-mini",
        "nameKey": "models.phi-3-mini.name",
        "descriptionKey": "models.phi-3-mini.description",
        "name": "Phi-3 Mini (3.8B)",
        "framework": "webllm",
        "description": "Microsoft Phi-3 small language model with WebGPU inference.",
        "demoUrl": "https://chat.webllm.ai/",
        "docsUrl": "https://huggingface.co/mlc-ai/Phi-3-mini-4k-instruct-q4f16_1-MLC",
        "kind": "model",
        "tasks": [
          "chat"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/Phi-3-mini-4k-instruct-q4f16_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "phi-3-mini",
            "label": "default",
            "reportedDownloadSize": "~2.3 GB"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "mlc-ai/Phi-3-mini-4k-instruct-q4f16_1-MLC"
      },
      {
        "id": "qwen2-1.5b",
        "nameKey": "models.qwen2-1-5b.name",
        "descriptionKey": "models.qwen2-1-5b.description",
        "name": "Qwen2 1.5B Instruct",
        "framework": "webllm",
        "description": "Compact Qwen2 chat model for resource-constrained browsers.",
        "docsUrl": "https://huggingface.co/mlc-ai/Qwen2-1.5B-Instruct-q4f16_1-MLC",
        "kind": "model",
        "tasks": [
          "chat"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/Qwen2-1.5B-Instruct-q4f16_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English",
          "Chinese"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "qwen2-1.5b",
            "label": "default",
            "reportedDownloadSize": "~1.1 GB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "mlc-ai/Qwen2-1.5B-Instruct-q4f16_1-MLC"
      },
      {
        "id": "tinyllama-1.1b",
        "nameKey": "models.tinyllama-1-1b.name",
        "descriptionKey": "models.tinyllama-1-1b.description",
        "name": "TinyLlama 1.1B",
        "framework": "transformersjs",
        "description": "Small open-source Llama; works in Transformers.js with WASM.",
        "docsUrl": "https://huggingface.co/Xenova/TinyLlama-1.1B-Chat-v1.0",
        "kind": "model",
        "tasks": [
          "chat"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/TinyLlama-1.1B-Chat-v1.0",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "tinyllama-1.1b",
            "label": "default",
            "reportedDownloadSize": "~700 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/TinyLlama-1.1B-Chat-v1.0"
      },
      {
        "id": "gemma-2-2b-it",
        "nameKey": "models.gemma-2-2b-it.name",
        "descriptionKey": "models.gemma-2-2b-it.description",
        "name": "Gemma 2 2B IT",
        "framework": "webllm",
        "description": "Google Gemma 2 2B instruction-tuned — small enough to load on iOS Safari via WebLLM.",
        "docsUrl": "https://huggingface.co/mlc-ai/gemma-2-2b-it-q4f16_1-MLC",
        "kind": "model",
        "tasks": [
          "chat"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/gemma-2-2b-it-q4f16_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "gemma-2-2b-it",
            "label": "default",
            "reportedDownloadSize": "~1.6 GB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "mlc-ai/gemma-2-2b-it-q4f16_1-MLC"
      },
      {
        "id": "smollm2-1.7b",
        "nameKey": "models.smollm2-1-7b.name",
        "descriptionKey": "models.smollm2-1-7b.description",
        "name": "SmolLM2 1.7B Instruct",
        "framework": "webllm",
        "description": "Hugging Face SmolLM2 1.7B — extremely compact instruct model for browser chat.",
        "docsUrl": "https://huggingface.co/mlc-ai/SmolLM2-1.7B-Instruct-q4f16_1-MLC",
        "kind": "model",
        "tasks": [
          "chat"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/SmolLM2-1.7B-Instruct-q4f16_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "smollm2-1.7b",
            "label": "default",
            "reportedDownloadSize": "~1.1 GB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "mlc-ai/SmolLM2-1.7B-Instruct-q4f16_1-MLC"
      },
      {
        "id": "deepseek-r1-distill-qwen-1.5b",
        "nameKey": "models.deepseek-r1-distill-qwen-1-5b.name",
        "descriptionKey": "models.deepseek-r1-distill-qwen-1-5b.description",
        "name": "DeepSeek R1 Distill (Qwen 1.5B)",
        "framework": "webllm",
        "description": "DeepSeek-R1 reasoning model distilled into Qwen 1.5B — runs in the browser with chain-of-thought output.",
        "docsUrl": "https://huggingface.co/mlc-ai/DeepSeek-R1-Distill-Qwen-1.5B-q4f16_1-MLC",
        "kind": "model",
        "tasks": [
          "chat"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/DeepSeek-R1-Distill-Qwen-1.5B-q4f16_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English",
          "Chinese"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "deepseek-r1-distill-qwen-1.5b",
            "label": "default",
            "reportedDownloadSize": "~1.1 GB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "mlc-ai/DeepSeek-R1-Distill-Qwen-1.5B-q4f16_1-MLC"
      }
    ],
    "structured-output": [
      {
        "id": "jsonformer-llama",
        "nameKey": "models.jsonformer-llama.name",
        "descriptionKey": "models.jsonformer-llama.description",
        "name": "JSONFormer",
        "framework": "transformers",
        "description": "Python wrapper for constrained JSON generation with a supplied language model; supports a subset of JSON Schema. It has no standalone model weights.",
        "docsUrl": "https://github.com/1rgs/jsonformer",
        "kind": "tool",
        "tasks": [
          "structured-output"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/1rgs/jsonformer",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [],
        "codeLicense": "mit"
      },
      {
        "id": "outline-llama",
        "nameKey": "models.outline-llama.name",
        "descriptionKey": "models.outline-llama.description",
        "name": "Outlines",
        "framework": "python",
        "description": "Structured generation library used with a separately selected model and backend. A Python example is not evidence of browser support.",
        "docsUrl": "https://github.com/dottxt-ai/outlines",
        "kind": "tool",
        "tasks": [
          "structured-output"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/dottxt-ai/outlines",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": []
      }
    ],
    "code": [
      {
        "id": "codellama-7b",
        "nameKey": "models.codellama-7b.name",
        "descriptionKey": "models.codellama-7b.description",
        "name": "CodeLlama 7B",
        "framework": "webllm",
        "description": "Meta CodeLlama — code completion and infill in the browser.",
        "docsUrl": "https://huggingface.co/mlc-ai/CodeLlama-7b-hf-q4f16_1-MLC",
        "kind": "model",
        "tasks": [
          "code"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/CodeLlama-7b-hf-q4f16_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [
          "Python",
          "JS",
          "TS",
          "C++",
          "Java"
        ],
        "capabilities": [],
        "variants": [
          {
            "id": "codellama-7b",
            "label": "default",
            "reportedDownloadSize": "~3.8 GB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "mlc-ai/CodeLlama-7b-hf-q4f16_1-MLC"
      },
      {
        "id": "starcoder2-3b",
        "nameKey": "models.starcoder2-3b.name",
        "descriptionKey": "models.starcoder2-3b.description",
        "name": "StarCoder2 3B",
        "framework": "webllm",
        "description": "BigCode StarCoder2 — modern code LLM with permissive licensing.",
        "docsUrl": "https://huggingface.co/bigcode/starcoder2-3b",
        "kind": "model",
        "tasks": [
          "code"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/bigcode/starcoder2-3b",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [
          "80+ languages"
        ],
        "capabilities": [],
        "variants": [
          {
            "id": "starcoder2-3b",
            "label": "default",
            "reportedDownloadSize": "~1.8 GB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "bigcode/starcoder2-3b"
      },
      {
        "id": "deepseek-coder-1.3b",
        "nameKey": "models.deepseek-coder-1-3b.name",
        "descriptionKey": "models.deepseek-coder-1-3b.description",
        "name": "DeepSeek Coder 1.3B",
        "framework": "transformersjs",
        "description": "Compact DeepSeek Coder model for browser-side code generation.",
        "docsUrl": "https://huggingface.co/Xenova/deepseek-coder-1.3b-instruct",
        "kind": "model",
        "tasks": [
          "code"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/deepseek-coder-1.3b-instruct",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [
          "Python",
          "JS",
          "TS",
          "Go"
        ],
        "capabilities": [],
        "variants": [
          {
            "id": "deepseek-coder-1.3b",
            "label": "default",
            "reportedDownloadSize": "~900 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/deepseek-coder-1.3b-instruct"
      }
    ]
  },
  "search-rag": {
    "embedding": [
      {
        "id": "all-minilm-l6-v2",
        "nameKey": "models.all-minilm-l6-v2.name",
        "descriptionKey": "models.all-minilm-l6-v2.description",
        "name": "all-MiniLM-L6-v2",
        "framework": "transformersjs",
        "description": "Tiny but high-quality sentence embeddings for semantic search.",
        "docsUrl": "https://huggingface.co/Xenova/all-MiniLM-L6-v2",
        "kind": "model",
        "tasks": [
          "embedding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/all-MiniLM-L6-v2",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "all-minilm-l6-v2",
            "label": "default",
            "reportedDownloadSize": "~23 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/all-MiniLM-L6-v2"
      },
      {
        "id": "bge-small-en",
        "nameKey": "models.bge-small-en.name",
        "descriptionKey": "models.bge-small-en.description",
        "name": "BGE Small EN",
        "framework": "transformersjs",
        "description": "BAAI BGE small embedding model, strong on retrieval benchmarks.",
        "docsUrl": "https://huggingface.co/Xenova/bge-small-en-v1.5",
        "kind": "model",
        "tasks": [
          "embedding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/bge-small-en-v1.5",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "bge-small-en",
            "label": "default",
            "reportedDownloadSize": "~33 MB"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/bge-small-en-v1.5"
      },
      {
        "id": "gte-small",
        "nameKey": "models.gte-small.name",
        "descriptionKey": "models.gte-small.description",
        "name": "GTE Small",
        "framework": "transformersjs",
        "description": "Alibaba GTE small embedding model.",
        "docsUrl": "https://huggingface.co/Xenova/gte-small",
        "kind": "model",
        "tasks": [
          "embedding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/gte-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "gte-small",
            "label": "default",
            "reportedDownloadSize": "~33 MB"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/gte-small"
      },
      {
        "id": "bge-m3",
        "nameKey": "models.bge-m3.name",
        "descriptionKey": "models.bge-m3.description",
        "name": "BGE-M3",
        "framework": "transformersjs",
        "description": "Multilingual, multi-granularity, multi-function embedding model.",
        "docsUrl": "https://huggingface.co/Xenova/bge-m3",
        "kind": "model",
        "tasks": [
          "embedding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/bge-m3",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "100+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "bge-m3",
            "label": "default",
            "reportedDownloadSize": "~570 MB"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/bge-m3"
      },
      {
        "id": "instructor-xl",
        "nameKey": "models.instructor-xl.name",
        "descriptionKey": "models.instructor-xl.description",
        "name": "Instructor-XL",
        "framework": "transformers",
        "description": "Instruction-tuned text embedding model for retrieval, clustering and similarity. This source does not establish browser compatibility.",
        "docsUrl": "https://huggingface.co/hkunlp/instructor-xl",
        "kind": "model",
        "tasks": [
          "embedding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/hkunlp/instructor-xl",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "instructor-xl",
            "label": "default"
          }
        ],
        "reportedLicense": "apache-2-0",
        "weightLicense": "apache-2-0",
        "modelId": "hkunlp/instructor-xl"
      }
    ],
    "reranker": [
      {
        "id": "ms-marco-minilm",
        "nameKey": "models.ms-marco-minilm.name",
        "descriptionKey": "models.ms-marco-minilm.description",
        "name": "MS MARCO MiniLM Cross-Encoder",
        "framework": "transformersjs",
        "description": "Cross-encoder reranker trained on MS MARCO.",
        "docsUrl": "https://huggingface.co/Xenova/ms-marco-MiniLM-L-6-v2",
        "kind": "model",
        "tasks": [
          "reranker"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/ms-marco-MiniLM-L-6-v2",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "ms-marco-minilm",
            "label": "default",
            "reportedDownloadSize": "~90 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/ms-marco-MiniLM-L-6-v2"
      },
      {
        "id": "bge-reranker-base",
        "nameKey": "models.bge-reranker-base.name",
        "descriptionKey": "models.bge-reranker-base.description",
        "name": "BGE Reranker Base",
        "framework": "transformersjs",
        "description": "BAAI BGE reranker — strong out-of-the-box reranker.",
        "docsUrl": "https://huggingface.co/Xenova/bge-reranker-base",
        "kind": "model",
        "tasks": [
          "reranker"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/bge-reranker-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English",
          "Chinese"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "bge-reranker-base",
            "label": "default",
            "reportedDownloadSize": "~280 MB"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/bge-reranker-base"
      },
      {
        "id": "cohere-rerank-wasm",
        "nameKey": "models.cohere-rerank-wasm.name",
        "descriptionKey": "models.cohere-rerank-wasm.description",
        "name": "Cohere Rerank (ONNX)",
        "framework": "onnxruntime-web",
        "description": "ONNX port of a Cohere-style reranker for client-side use.",
        "docsUrl": "https://onnxruntime.ai/docs/",
        "kind": "model",
        "tasks": [
          "reranker"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "conflicting-reference",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "cohere-rerank-wasm",
            "label": "default",
            "reportedDownloadSize": "~280 MB"
          }
        ],
        "reportedLicense": "cc-by-4-0",
        "identityUnresolved": true
      }
    ],
    "semantic-search": [
      {
        "id": "hnswlib-wasm",
        "nameKey": "models.hnswlib-wasm.name",
        "descriptionKey": "models.hnswlib-wasm.description",
        "name": "hnswlib.js",
        "framework": "transformersjs",
        "description": "HNSW ANN index compiled to WebAssembly — used to do semantic search on top of embeddings.",
        "docsUrl": "https://github.com/shravansunder/hnswlib-wasm",
        "kind": "tool",
        "tasks": [
          "semantic-search"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/shravansunder/hnswlib-wasm",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "any"
        ],
        "variants": [
          {
            "id": "hnswlib-wasm",
            "label": "default"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "voyager-wasm",
        "nameKey": "models.voyager-wasm.name",
        "descriptionKey": "models.voyager-wasm.description",
        "name": "Voyager (Spotify)",
        "framework": "native",
        "description": "Spotify approximate nearest-neighbor search library with Python and Java bindings. No browser WASM implementation has been verified for this entry.",
        "docsUrl": "https://github.com/spotify/voyager",
        "kind": "tool",
        "tasks": [
          "semantic-search"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/spotify/voyager",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "any"
        ],
        "variants": [],
        "codeLicense": "apache-2-0"
      },
      {
        "id": "lancedb-js",
        "nameKey": "models.lancedb-js.name",
        "descriptionKey": "models.lancedb-js.description",
        "name": "LanceDB JS",
        "framework": "onnxruntime-web",
        "description": "Embedded vector DB with WASM build for the browser.",
        "docsUrl": "https://github.com/lancedb/lancedb",
        "kind": "tool",
        "tasks": [
          "semantic-search"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/lancedb/lancedb",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "any"
        ],
        "variants": [
          {
            "id": "lancedb-js",
            "label": "default"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "vectra-wasm",
        "nameKey": "models.vectra-wasm.name",
        "descriptionKey": "models.vectra-wasm.description",
        "name": "Vectra (WASM)",
        "framework": "onnxruntime-web",
        "description": "Vectra — local vector index for semantic search in Node and the browser. WASM build, no server.",
        "docsUrl": "https://github.com/Stevenic/vectra",
        "kind": "tool",
        "tasks": [
          "semantic-search"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/Stevenic/vectra",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "any"
        ],
        "variants": [
          {
            "id": "vectra-wasm",
            "label": "default",
            "reportedDownloadSize": "~80 KB"
          }
        ],
        "reportedLicense": "apache-2-0"
      }
    ]
  },
  "vision": {
    "detection": [
      {
        "id": "yolov8n",
        "nameKey": "models.yolov8n.name",
        "descriptionKey": "models.yolov8n.description",
        "name": "YOLOv8n",
        "framework": "onnxruntime-web",
        "description": "Ultralytics YOLOv8 nano — fast real-time object detection in the browser.",
        "docsUrl": "https://github.com/ultralytics/ultralytics",
        "kind": "model",
        "tasks": [
          "detection"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/ultralytics/ultralytics",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Object Detection (80 classes, COCO)"
        ],
        "variants": [
          {
            "id": "yolov8n",
            "label": "default",
            "reportedDownloadSize": "~13 MB"
          }
        ],
        "reportedLicense": "other"
      },
      {
        "id": "yolov5s",
        "nameKey": "models.yolov5s.name",
        "descriptionKey": "models.yolov5s.description",
        "name": "YOLOv5s",
        "framework": "onnxruntime-web",
        "description": "Classic YOLOv5 small model widely ported to ONNX.",
        "docsUrl": "https://github.com/ultralytics/yolov5",
        "kind": "model",
        "tasks": [
          "detection"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/ultralytics/yolov5",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Object Detection"
        ],
        "variants": [
          {
            "id": "yolov5s",
            "label": "default",
            "reportedDownloadSize": "~30 MB"
          }
        ],
        "reportedLicense": "other"
      },
      {
        "id": "mediapipe-objectdetection",
        "nameKey": "models.mediapipe-objectdetection.name",
        "descriptionKey": "models.mediapipe-objectdetection.description",
        "name": "MediaPipe Object Detection",
        "framework": "mediapipe",
        "description": "MediaPipe Tasks API — EfficientDet-Lite for object detection.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/object_detector/web_js",
        "kind": "model",
        "tasks": [
          "detection"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/object_detector/web_js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/guide",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Object Detection"
        ],
        "variants": [
          {
            "id": "mediapipe-objectdetection",
            "label": "default",
            "reportedDownloadSize": "~5 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "ssd-mobilenet",
        "nameKey": "models.ssd-mobilenet.name",
        "descriptionKey": "models.ssd-mobilenet.description",
        "name": "SSD MobileNet v2",
        "framework": "tensorflowjs",
        "description": "MobileNetV2 backbone with SSD head, packaged for tfjs-models.",
        "docsUrl": "https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd",
        "kind": "model",
        "tasks": [
          "detection"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/tensorflow/tfjs-models",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Object Detection"
        ],
        "variants": [
          {
            "id": "ssd-mobilenet",
            "label": "default",
            "reportedDownloadSize": "~27 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      }
    ],
    "segmentation": [
      {
        "id": "imgly-bg-removal",
        "nameKey": "models.imgly-bg-removal.name",
        "descriptionKey": "models.imgly-bg-removal.description",
        "name": "IMG.LY Background Removal",
        "framework": "onnxruntime-web",
        "description": "Browser background-removal package using ONNX Runtime Web. The upstream example documents isnet_quint8 and isnet_fp16 configurations. Exact downloaded weights, sizes and device performance still need verification.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/image/remove-bg?mode=fast",
        "docsUrl": "https://github.com/imgly/background-removal-js/blob/main/packages/web/README.md",
        "kind": "tool",
        "tasks": [
          "segmentation"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://github.com/imgly/background-removal-js/blob/main/packages/web/README.md",
          "reviewedAt": "2026-10-03"
        },
        "sources": [
          {
            "url": "https://github.com/imgly/background-removal-js/blob/main/packages/web/README.md",
            "kind": "browser-example",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/imgly/background-removal-js/blob/main/packages/web/package.json",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/imgly/background-removal-js",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Foreground / Background"
        ],
        "variants": [
          {
            "id": "imgly-bg-removal",
            "label": "isnet_quint8",
            "quantization": "quint8",
            "demoBase": "https://toolgarden.xyz",
            "demoPath": "/image/remove-bg?mode=fast"
          },
          {
            "id": "imgly-bg-removal-balanced",
            "label": "isnet_fp16",
            "quantization": "fp16",
            "demoBase": "https://toolgarden.xyz",
            "demoPath": "/image/remove-bg?mode=balanced"
          }
        ],
        "codeLicense": "agpl-3-0",
        "runtimeVersion": "onnxruntime-web 1.21.0 (package peer dependency)",
        "backends": [
          "WASM",
          "WebGPU"
        ]
      },
      {
        "id": "imgly-bg-removal-hd",
        "nameKey": "models.imgly-bg-removal-hd.name",
        "descriptionKey": "models.imgly-bg-removal-hd.description",
        "name": "HD background removal — identity unresolved",
        "framework": "unknown",
        "description": "Legacy HD demo entry: its name, BiRefNet description and RMBG-1.4 reference disagree. Model identity, weights, size and license are unresolved; do not use it as a verified model comparison.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/image/remove-bg?mode=hd",
        "kind": "application",
        "tasks": [
          "segmentation"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/briaai/RMBG-1.4",
            "kind": "conflicting-reference",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Foreground / Background (HD)"
        ],
        "variants": [],
        "identityUnresolved": true
      },
      {
        "id": "sam-tiny",
        "nameKey": "models.sam-tiny.name",
        "descriptionKey": "models.sam-tiny.description",
        "name": "SAM Tiny (ONNX)",
        "framework": "onnxruntime-web",
        "description": "Segment Anything Model — quantized mobile variant for the browser.",
        "docsUrl": "https://github.com/ChaoningZhang/MobileSAM",
        "kind": "model",
        "tasks": [
          "segmentation"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/ChaoningZhang/MobileSAM",
            "kind": "conflicting-reference",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/Xenova/slimsam-77-uniform",
            "kind": "conflicting-reference",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Promptable Segmentation"
        ],
        "variants": [
          {
            "id": "sam-tiny",
            "label": "default",
            "reportedDownloadSize": "~40 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "identityUnresolved": true
      },
      {
        "id": "mediapipe-selfie",
        "nameKey": "models.mediapipe-selfie.name",
        "descriptionKey": "models.mediapipe-selfie.description",
        "name": "MediaPipe Selfie Segmentation",
        "framework": "mediapipe",
        "description": "Lightweight binary segmentation for people in close-up shots.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter/web_js",
        "kind": "model",
        "tasks": [
          "segmentation"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/selfie_segmentation.md",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter/web_js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Selfie Segmentation"
        ],
        "variants": [
          {
            "id": "mediapipe-selfie",
            "label": "default",
            "reportedDownloadSize": "~2 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      }
    ],
    "ocr": [
      {
        "id": "tesseractjs",
        "nameKey": "models.tesseractjs.name",
        "descriptionKey": "models.tesseractjs.description",
        "name": "Tesseract.js",
        "framework": "tesseract-wasm",
        "description": "Browser/Node.js OCR library wrapping Tesseract via WebAssembly. Language data is downloaded separately; PDF pages must first be converted to images.",
        "demoUrl": "https://tesseract.projectnaptha.com/",
        "docsUrl": "https://github.com/naptha/tesseract.js",
        "kind": "tool",
        "tasks": [
          "ocr"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://github.com/naptha/tesseract.js",
          "reviewedAt": "2026-10-03"
        },
        "sources": [
          {
            "url": "https://github.com/naptha/tesseract.js",
            "kind": "browser-example",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "100+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "tesseractjs",
            "label": "default",
            "reportedDownloadSize": "~2 MB (core) + lang data"
          }
        ],
        "codeLicense": "apache-2-0"
      },
      {
        "id": "easy-ocr",
        "nameKey": "models.easy-ocr.name",
        "descriptionKey": "models.easy-ocr.description",
        "name": "EasyOCR (ONNX)",
        "framework": "onnxruntime-web",
        "description": "Community ONNX port of EasyOCR for the browser.",
        "docsUrl": "https://github.com/JaidedAI/EasyOCR",
        "kind": "model",
        "tasks": [
          "ocr"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/JaidedAI/EasyOCR",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "80+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "easy-ocr",
            "label": "default",
            "reportedDownloadSize": "~30 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "paddle-ocr",
        "nameKey": "models.paddle-ocr.name",
        "descriptionKey": "models.paddle-ocr.description",
        "name": "PaddleOCR PP-OCRv5 Mobile (Browser)",
        "framework": "onnxruntime-web",
        "description": "PaddleOCR PP-OCRv5 mobile, loaded via @paddleocr/paddleocr-js and run on ONNX Runtime Web (WASM) inside the browser.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/image/ocr",
        "docsUrl": "https://www.npmjs.com/package/@paddleocr/paddleocr-js",
        "kind": "model",
        "tasks": [
          "ocr"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://www.npmjs.com/package/@paddleocr/paddleocr-js",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [
          "80+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "paddle-ocr",
            "label": "default",
            "reportedDownloadSize": "~10 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "mediapipe-text",
        "nameKey": "models.mediapipe-text.name",
        "descriptionKey": "models.mediapipe-text.description",
        "name": "MediaPipe Text Detector",
        "framework": "mediapipe",
        "description": "DBNet-based text detector running entirely on-device.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/text/text_classifier/web_js",
        "kind": "model",
        "tasks": [
          "ocr"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/text/text_classifier/web_js",
            "kind": "conflicting-reference",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/text/text_embedder/web_js",
            "kind": "conflicting-reference",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [
          "Latin scripts"
        ],
        "variants": [
          {
            "id": "mediapipe-text",
            "label": "default",
            "reportedDownloadSize": "~4 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "identityUnresolved": true
      }
    ],
    "depth": [
      {
        "id": "midas-small",
        "nameKey": "models.midas-small.name",
        "descriptionKey": "models.midas-small.description",
        "name": "MiDaS v2 Small",
        "framework": "onnxruntime-web",
        "description": "Robust monocular depth estimation for the browser.",
        "docsUrl": "https://github.com/isl-org/MiDaS",
        "kind": "model",
        "tasks": [
          "depth"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/isl-org/MiDaS",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Monocular Depth"
        ],
        "variants": [
          {
            "id": "midas-small",
            "label": "default",
            "reportedDownloadSize": "~60 MB"
          }
        ],
        "reportedLicense": "mit"
      },
      {
        "id": "depth-anything-small",
        "nameKey": "models.depth-anything-small.name",
        "descriptionKey": "models.depth-anything-small.description",
        "name": "Depth Anything v2 Small",
        "framework": "transformersjs",
        "description": "State-of-the-art monocular depth, ported to Transformers.js.",
        "docsUrl": "https://huggingface.co/onnx-community/depth-anything-v2-small",
        "kind": "model",
        "tasks": [
          "depth"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/onnx-community/depth-anything-v2-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Monocular Depth"
        ],
        "variants": [
          {
            "id": "depth-anything-small",
            "label": "default",
            "reportedDownloadSize": "~100 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "onnx-community/depth-anything-v2-small"
      },
      {
        "id": "mediapipe-depth",
        "nameKey": "models.mediapipe-depth.name",
        "descriptionKey": "models.mediapipe-depth.description",
        "name": "MediaPipe Objectron (depth hints)",
        "framework": "mediapipe",
        "description": "Provides 3D bounding boxes and rough depth from a single image.",
        "docsUrl": "https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/objectron.md",
        "kind": "model",
        "tasks": [
          "depth"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/objectron.md",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/guide",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "3D Object Detection"
        ],
        "variants": [
          {
            "id": "mediapipe-depth",
            "label": "default",
            "reportedDownloadSize": "~8 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      }
    ],
    "image-restoration": [
      {
        "id": "real-esrgan",
        "nameKey": "models.real-esrgan.name",
        "descriptionKey": "models.real-esrgan.description",
        "name": "Real-ESRGAN",
        "framework": "onnxruntime-web",
        "description": "Real-ESRGAN general-purpose image super-resolution; runs entirely on WebGPU via onnxruntime-web.",
        "docsUrl": "https://github.com/xinntao/Real-ESRGAN",
        "kind": "model",
        "tasks": [
          "image-restoration"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/xinntao/Real-ESRGAN",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Image Super-Resolution"
        ],
        "variants": [
          {
            "id": "real-esrgan",
            "label": "default",
            "reportedDownloadSize": "~65 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "swinir",
        "nameKey": "models.swinir.name",
        "descriptionKey": "models.swinir.description",
        "name": "SwinIR",
        "framework": "onnxruntime-web",
        "description": "SwinIR — transformer-based image restoration (super-resolution, denoising, JPEG deblocking).",
        "docsUrl": "https://github.com/JingyunLiang/SwinIR",
        "kind": "model",
        "tasks": [
          "image-restoration"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/JingyunLiang/SwinIR",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Image Restoration"
        ],
        "variants": [
          {
            "id": "swinir",
            "label": "default",
            "reportedDownloadSize": "~45 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "nafnet-denoise",
        "nameKey": "models.nafnet-denoise.name",
        "descriptionKey": "models.nafnet-denoise.description",
        "name": "NAFNet (Denoise)",
        "framework": "onnxruntime-web",
        "description": "NAFNet — nonlinear activation free network for image denoising in the browser.",
        "docsUrl": "https://github.com/megvii-research/NAFNet",
        "kind": "model",
        "tasks": [
          "image-restoration"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/megvii-research/NAFNet",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Image Denoising"
        ],
        "variants": [
          {
            "id": "nafnet-denoise",
            "label": "default",
            "reportedDownloadSize": "~25 MB"
          }
        ],
        "reportedLicense": "mit"
      }
    ],
    "image-classification": [
      {
        "id": "mobilenet-tfjs",
        "name": "MobileNet (TensorFlow.js)",
        "nameKey": "models.mobilenet-tfjs.name",
        "description": "Classifies browser image, canvas or video elements. Model version and width multiplier affect its output and resource requirements.",
        "descriptionKey": "models.mobilenet-tfjs.description",
        "framework": "tensorflowjs",
        "kind": "model",
        "tasks": [
          "image-classification"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://github.com/tensorflow/tfjs-models/tree/master/mobilenet",
          "reviewedAt": "2026-10-03"
        },
        "sources": [
          {
            "url": "https://github.com/tensorflow/tfjs-models/tree/master/mobilenet",
            "kind": "browser-example",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "mobilenet-tfjs",
            "label": "default"
          }
        ],
        "docsUrl": "https://github.com/tensorflow/tfjs-models/tree/master/mobilenet"
      }
    ]
  },
  "generative-vision": {
    "text-to-image": [
      {
        "id": "sdxl-turbo",
        "nameKey": "models.sdxl-turbo.name",
        "descriptionKey": "models.sdxl-turbo.description",
        "name": "SDXL-Turbo",
        "framework": "onnxruntime-web",
        "description": "Real-time distilled SDXL; runs on WebGPU with onnxruntime-web.",
        "docsUrl": "https://huggingface.co/stabilityai/sdxl-turbo",
        "kind": "model",
        "tasks": [
          "text-to-image"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/stabilityai/sdxl-turbo",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Text-to-Image"
        ],
        "variants": [
          {
            "id": "sdxl-turbo",
            "label": "default",
            "reportedDownloadSize": "~3.5 GB"
          }
        ],
        "reportedLicense": "openrail",
        "modelId": "stabilityai/sdxl-turbo"
      },
      {
        "id": "sd-turbo",
        "nameKey": "models.sd-turbo.name",
        "descriptionKey": "models.sd-turbo.description",
        "name": "SD-Turbo",
        "framework": "onnxruntime-web",
        "description": "Smaller distilled Stable Diffusion variant.",
        "docsUrl": "https://huggingface.co/stabilityai/sd-turbo",
        "kind": "model",
        "tasks": [
          "text-to-image"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/stabilityai/sd-turbo",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Text-to-Image"
        ],
        "variants": [
          {
            "id": "sd-turbo",
            "label": "default",
            "reportedDownloadSize": "~1.6 GB"
          }
        ],
        "reportedLicense": "openrail",
        "modelId": "stabilityai/sd-turbo"
      },
      {
        "id": "flux-schnell",
        "nameKey": "models.flux-schnell.name",
        "descriptionKey": "models.flux-schnell.description",
        "name": "FLUX.1 Schnell (WebGPU)",
        "framework": "transformersjs",
        "description": "Fast FLUX diffusion model — community ONNX/WebGPU builds.",
        "docsUrl": "https://huggingface.co/black-forest-labs/FLUX.1-schnell",
        "kind": "model",
        "tasks": [
          "text-to-image"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/black-forest-labs/FLUX.1-schnell",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Text-to-Image"
        ],
        "variants": [
          {
            "id": "flux-schnell",
            "label": "default",
            "reportedDownloadSize": "~6 GB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "black-forest-labs/FLUX.1-schnell"
      }
    ],
    "inpainting": [
      {
        "id": "mi-gan-watermark",
        "nameKey": "models.mi-gan-watermark.name",
        "descriptionKey": "models.mi-gan-watermark.description",
        "name": "MI-GAN Watermark Removal",
        "framework": "onnxruntime-web",
        "description": "MI-GAN — single-file ONNX watermark remover (~28 MB). Fast mode for clean backgrounds.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/image/remove-watermark?mode=fast",
        "docsUrl": "https://github.com/Picsart-AI-Research/MI-GAN",
        "kind": "model",
        "tasks": [
          "inpainting"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/Picsart-AI-Research/MI-GAN",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Watermark Removal"
        ],
        "variants": [
          {
            "id": "mi-gan-watermark",
            "label": "default",
            "reportedDownloadSize": "~28 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "lama-watermark",
        "nameKey": "models.lama-watermark.name",
        "descriptionKey": "models.lama-watermark.description",
        "name": "LaMa Watermark Removal (FP32)",
        "framework": "onnxruntime-web",
        "description": "LaMa inpainting FP32 ONNX (~208 MB) for high-quality balanced / HD watermark removal.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/image/remove-watermark?mode=balanced",
        "docsUrl": "https://github.com/advimman/lama",
        "kind": "model",
        "tasks": [
          "inpainting"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/advimman/lama",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Watermark Removal"
        ],
        "variants": [
          {
            "id": "lama-watermark",
            "label": "default",
            "reportedDownloadSize": "~208 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "sdxl-inpaint",
        "nameKey": "models.sdxl-inpaint.name",
        "descriptionKey": "models.sdxl-inpaint.description",
        "name": "SDXL Inpaint",
        "framework": "onnxruntime-web",
        "description": "SDXL variant fine-tuned for mask-based inpainting.",
        "docsUrl": "https://huggingface.co/diffusers/stable-diffusion-xl-1.0-inpainting-0.1",
        "kind": "model",
        "tasks": [
          "inpainting"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/diffusers/stable-diffusion-xl-1.0-inpainting-0.1",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Image Inpainting"
        ],
        "variants": [
          {
            "id": "sdxl-inpaint",
            "label": "default",
            "reportedDownloadSize": "~3.8 GB"
          }
        ],
        "reportedLicense": "openrail",
        "modelId": "diffusers/stable-diffusion-xl-1.0-inpainting-0.1"
      }
    ]
  },
  "audio": {
    "asr": [
      {
        "id": "whisper-small",
        "nameKey": "models.whisper-small.name",
        "descriptionKey": "models.whisper-small.description",
        "name": "Whisper Small (Transformers.js)",
        "framework": "transformersjs",
        "description": "Xenova/whisper-small via Transformers.js — high-precision default; quantized encoder + merged decoder ONNX.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/audio/to-text",
        "docsUrl": "https://huggingface.co/Xenova/whisper-small",
        "kind": "model",
        "tasks": [
          "asr"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/whisper-small",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [
          "99 languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "whisper-small",
            "label": "default",
            "reportedDownloadSize": "~460 MB"
          }
        ],
        "reportedLicense": "mit"
      },
      {
        "id": "whisper-base",
        "nameKey": "models.whisper-base.name",
        "descriptionKey": "models.whisper-base.description",
        "name": "Whisper Base (Transformers.js)",
        "framework": "transformersjs",
        "description": "Xenova/whisper-base via Transformers.js — balanced mode; smaller encoder/decoder footprint.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/audio/to-text",
        "docsUrl": "https://huggingface.co/Xenova/whisper-base",
        "kind": "model",
        "tasks": [
          "asr"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/whisper-base",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [
          "99 languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "whisper-base",
            "label": "default",
            "reportedDownloadSize": "~140 MB"
          }
        ],
        "reportedLicense": "mit"
      },
      {
        "id": "whisper-tiny-wasm",
        "nameKey": "models.whisper-tiny-wasm.name",
        "descriptionKey": "models.whisper-tiny-wasm.description",
        "name": "Whisper Tiny (WASM)",
        "framework": "whisper-wasm",
        "description": "OpenAI Whisper Tiny compiled to WASM via whisper.cpp — fastest ASR variant in the browser.",
        "demoUrl": "https://ggml.ai/whisper.cpp/",
        "docsUrl": "https://github.com/ggml-org/whisper.cpp",
        "kind": "model",
        "tasks": [
          "asr"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/ggml-org/whisper.cpp",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [
          "99 languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "whisper-tiny-wasm",
            "label": "default",
            "reportedDownloadSize": "~75 MB"
          }
        ],
        "reportedLicense": "mit"
      }
    ],
    "tts": [
      {
        "id": "kokoro-82m-fp32",
        "nameKey": "models.kokoro-82m-fp32.name",
        "descriptionKey": "models.kokoro-82m-fp32.description",
        "name": "Kokoro TTS (FP32, 82M voices)",
        "framework": "transformersjs",
        "description": "Kokoro 82M FP32 ONNX with 4 bundled voices (zf_001, zm_009, af_maple, bf_vale). Loaded with its own tokenizer, model config and on-demand voice.bin files.",
        "docsUrl": "https://huggingface.co/hexgrad/Kokoro-82M",
        "kind": "model",
        "tasks": [
          "tts"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/hexgrad/Kokoro-82M",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "kokoro-82m-fp32",
            "label": "default",
            "reportedDownloadSize": "~330 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "piper-tts",
        "nameKey": "models.piper-tts.name",
        "descriptionKey": "models.piper-tts.description",
        "name": "Piper TTS (ONNX)",
        "framework": "onnxruntime-web",
        "description": "Fast on-device Piper TTS — many open voices.",
        "docsUrl": "https://github.com/rhasspy/piper",
        "kind": "model",
        "tasks": [
          "tts"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/rhasspy/piper",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [
          "30+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "piper-tts",
            "label": "default",
            "reportedDownloadSize": "~15 MB"
          }
        ],
        "reportedLicense": "mit"
      },
      {
        "id": "silero-tts",
        "nameKey": "models.silero-tts.name",
        "descriptionKey": "models.silero-tts.description",
        "name": "Silero TTS",
        "framework": "onnxruntime-web",
        "description": "Compact Silero TTS models with several built-in speakers.",
        "docsUrl": "https://github.com/snakers4/silero-models",
        "kind": "model",
        "tasks": [
          "tts"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/snakers4/silero-models",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [
          "English",
          "Russian",
          "German",
          "Spanish"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "silero-tts",
            "label": "default",
            "reportedDownloadSize": "~30 MB"
          }
        ],
        "reportedLicense": "mit"
      },
      {
        "id": "bark-wasm",
        "nameKey": "models.bark-wasm.name",
        "descriptionKey": "models.bark-wasm.description",
        "name": "Bark (WASM)",
        "framework": "transformersjs",
        "description": "Suno Bark — generative audio / speech with non-verbal cues.",
        "docsUrl": "https://huggingface.co/suno/bark-small",
        "kind": "model",
        "tasks": [
          "tts"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/suno/bark-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "Multilingual"
        ],
        "programmingLanguages": [],
        "capabilities": [
          "Music"
        ],
        "variants": [
          {
            "id": "bark-wasm",
            "label": "default",
            "reportedDownloadSize": "~400 MB"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "suno/bark-small"
      }
    ],
    "denoising": [
      {
        "id": "rnnoise-wasm",
        "nameKey": "models.rnnoise-wasm.name",
        "descriptionKey": "models.rnnoise-wasm.description",
        "name": "RNNoise (WASM)",
        "framework": "tflite",
        "description": "Xiph.org RNNoise — real-time speech denoising in the browser.",
        "docsUrl": "https://github.com/xiph/rnnoise",
        "kind": "model",
        "tasks": [
          "denoising"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/xiph/rnnoise",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Speech Denoising"
        ],
        "variants": [
          {
            "id": "rnnoise-wasm",
            "label": "default",
            "reportedDownloadSize": "~1 MB"
          }
        ],
        "reportedLicense": "bsd-3"
      },
      {
        "id": "deepfilternet",
        "nameKey": "models.deepfilternet.name",
        "descriptionKey": "models.deepfilternet.description",
        "name": "DeepFilterNet",
        "framework": "onnxruntime-web",
        "description": "DeepFilterNet — modern speech enhancement via ONNX.",
        "docsUrl": "https://github.com/Rikorose/DeepFilterNet",
        "kind": "model",
        "tasks": [
          "denoising"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/Rikorose/DeepFilterNet",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Speech Enhancement"
        ],
        "variants": [
          {
            "id": "deepfilternet",
            "label": "default",
            "reportedDownloadSize": "~5 MB"
          }
        ],
        "reportedLicense": "mit"
      },
      {
        "id": "facebook-denoiser",
        "nameKey": "models.facebook-denoiser.name",
        "descriptionKey": "models.facebook-denoiser.description",
        "name": "Facebook Denoiser (ONNX)",
        "framework": "onnxruntime-web",
        "description": "FAIR real-time speech denoiser ported to ONNX.",
        "docsUrl": "https://github.com/facebookresearch/denoiser",
        "kind": "model",
        "tasks": [
          "denoising"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/facebookresearch/denoiser",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Speech Denoising"
        ],
        "variants": [
          {
            "id": "facebook-denoiser",
            "label": "default",
            "reportedDownloadSize": "~10 MB"
          }
        ],
        "reportedLicense": "cc-by-4-0"
      }
    ],
    "source-separation": [
      {
        "id": "htdemucs-4-stem",
        "nameKey": "models.htdemucs-4-stem.name",
        "descriptionKey": "models.htdemucs-4-stem.description",
        "name": "HT Demucs (4 stems)",
        "framework": "onnxruntime-web",
        "description": "Hybrid Transformer Demucs 4-stem model (~166 MB ONNX) — fast mode of toolgarden audio stem splitter.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/audio/split-stems?mode=fast",
        "docsUrl": "https://github.com/facebookresearch/demucs",
        "kind": "model",
        "tasks": [
          "source-separation"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/facebookresearch/demucs",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Vocals / Drums / Bass / Other"
        ],
        "variants": [
          {
            "id": "htdemucs-4-stem",
            "label": "default",
            "reportedDownloadSize": "~166 MB"
          }
        ],
        "reportedLicense": "mit"
      },
      {
        "id": "htdemucs-6-stem",
        "nameKey": "models.htdemucs-6-stem.name",
        "descriptionKey": "models.htdemucs-6-stem.description",
        "name": "HT Demucs (6 stems, default)",
        "framework": "onnxruntime-web",
        "description": "Hybrid Transformer Demucs 6-stem model (~136 MB ONNX) — default balanced mode of toolgarden audio stem splitter.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/audio/split-stems?mode=balanced",
        "docsUrl": "https://github.com/facebookresearch/demucs",
        "kind": "model",
        "tasks": [
          "source-separation"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/facebookresearch/demucs",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Vocals / Drums / Bass / Guitar / Piano / Other"
        ],
        "variants": [
          {
            "id": "htdemucs-6-stem",
            "label": "default",
            "reportedDownloadSize": "~136 MB"
          }
        ],
        "reportedLicense": "mit"
      },
      {
        "id": "open-unmix",
        "nameKey": "models.open-unmix.name",
        "descriptionKey": "models.open-unmix.description",
        "name": "Open-Unmix",
        "framework": "onnxruntime-web",
        "description": "Open-Unmix — reference open-source music source separation.",
        "docsUrl": "https://github.com/sigsep/open-unmix-pytorch",
        "kind": "model",
        "tasks": [
          "source-separation"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/sigsep/open-unmix-pytorch",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "4 stems"
        ],
        "variants": [
          {
            "id": "open-unmix",
            "label": "default",
            "reportedDownloadSize": "~60 MB"
          }
        ],
        "reportedLicense": "mit"
      }
    ],
    "vad": [
      {
        "id": "silero-vad-web",
        "name": "Silero VAD / vad-web",
        "nameKey": "models.silero-vad-web.name",
        "description": "Browser speech-activity detection through vad-web. Outputs speech segments, not transcripts or speaker identities.",
        "descriptionKey": "models.silero-vad-web.description",
        "framework": "onnxruntime-web",
        "kind": "tool",
        "tasks": [
          "vad"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://github.com/ricky0123/vad",
          "reviewedAt": "2026-10-03"
        },
        "sources": [
          {
            "url": "https://github.com/ricky0123/vad",
            "kind": "browser-example",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Speech segmentation"
        ],
        "variants": [],
        "docsUrl": "https://github.com/ricky0123/vad"
      }
    ],
    "audio-classification": [
      {
        "id": "mediapipe-audio-classifier",
        "name": "MediaPipe Audio Classifier",
        "nameKey": "models.mediapipe-audio-classifier.name",
        "description": "Web task API for audio classification. Select a compatible model asset; task-library support does not specify the weight version or measured latency.",
        "descriptionKey": "models.mediapipe-audio-classifier.description",
        "framework": "mediapipe",
        "kind": "tool",
        "tasks": [
          "audio-classification"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://developers.google.com/edge/mediapipe/solutions/audio/audio_classifier/web_js",
          "reviewedAt": "2026-10-03"
        },
        "sources": [
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/audio/audio_classifier/web_js",
            "kind": "browser-example",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [],
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/audio/audio_classifier/web_js"
      }
    ]
  },
  "generative-audio": {
    "text-to-music": [
      {
        "id": "musicgen-small",
        "nameKey": "models.musicgen-small.name",
        "descriptionKey": "models.musicgen-small.description",
        "name": "MusicGen Small",
        "framework": "transformersjs",
        "description": "Meta MusicGen small (300M) — text-conditioned music generation that runs entirely in the browser via Transformers.js.",
        "docsUrl": "https://huggingface.co/facebook/musicgen-small",
        "kind": "model",
        "tasks": [
          "text-to-music"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/facebook/musicgen-small",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Text-to-Music"
        ],
        "variants": [
          {
            "id": "musicgen-small",
            "label": "default",
            "reportedDownloadSize": "~300 MB"
          }
        ],
        "reportedLicense": "other"
      },
      {
        "id": "musicgen-medium",
        "nameKey": "models.musicgen-medium.name",
        "descriptionKey": "models.musicgen-medium.description",
        "name": "MusicGen Medium (ONNX)",
        "framework": "onnxruntime-web",
        "description": "Meta MusicGen medium (1.5B) — better quality, exported to ONNX for browser-side generation.",
        "docsUrl": "https://huggingface.co/facebook/musicgen-medium",
        "kind": "model",
        "tasks": [
          "text-to-music"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/facebook/musicgen-medium",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Text-to-Music"
        ],
        "variants": [
          {
            "id": "musicgen-medium",
            "label": "default",
            "reportedDownloadSize": "~1.5 GB"
          }
        ],
        "reportedLicense": "other"
      },
      {
        "id": "riffusion",
        "nameKey": "models.riffusion.name",
        "descriptionKey": "models.riffusion.description",
        "name": "Riffusion (Stable Diffusion spectrogram)",
        "framework": "onnxruntime-web",
        "description": "Riffusion — generates music by inpainting spectrograms with a Stable Diffusion model; runs in the browser.",
        "docsUrl": "https://github.com/riffusion/riffusion-hobby",
        "kind": "model",
        "tasks": [
          "text-to-music"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/riffusion/riffusion-hobby",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Text-to-Music"
        ],
        "variants": [
          {
            "id": "riffusion",
            "label": "default",
            "reportedDownloadSize": "~1.6 GB"
          }
        ],
        "reportedLicense": "openrail"
      }
    ],
    "voice-cloning": [
      {
        "id": "openvoice",
        "nameKey": "models.openvoice.name",
        "descriptionKey": "models.openvoice.description",
        "name": "OpenVoice v2",
        "framework": "onnxruntime-web",
        "description": "OpenVoice v2 — instant voice cloning with tone-color control; ONNX port runs locally.",
        "docsUrl": "https://github.com/myshell-ai/OpenVoice",
        "kind": "model",
        "tasks": [
          "voice-cloning"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/myshell-ai/OpenVoice",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Voice Cloning",
          "Cross-lingual TTS"
        ],
        "variants": [
          {
            "id": "openvoice",
            "label": "default",
            "reportedDownloadSize": "~150 MB"
          }
        ],
        "reportedLicense": "other"
      },
      {
        "id": "coqui-xtts",
        "nameKey": "models.coqui-xtts.name",
        "descriptionKey": "models.coqui-xtts.description",
        "name": "Coqui XTTS v2",
        "framework": "onnxruntime-web",
        "description": "Coqui XTTS v2 — short-clone voice cloning TTS; community ONNX port runs in the browser.",
        "docsUrl": "https://huggingface.co/coqui/XTTS-v2",
        "kind": "model",
        "tasks": [
          "voice-cloning"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/coqui/XTTS-v2",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [
          "17 languages"
        ],
        "programmingLanguages": [],
        "capabilities": [
          "Voice Cloning"
        ],
        "variants": [
          {
            "id": "coqui-xtts",
            "label": "default",
            "reportedDownloadSize": "~900 MB"
          }
        ],
        "reportedLicense": "other"
      }
    ]
  },
  "multimodal": {
    "vlm": [
      {
        "id": "moondream2",
        "nameKey": "models.moondream2.name",
        "descriptionKey": "models.moondream2.description",
        "name": "Moondream 2",
        "framework": "transformersjs",
        "description": "Tiny VLM for visual question answering and captioning.",
        "docsUrl": "https://huggingface.co/Xenova/moondream2",
        "kind": "model",
        "tasks": [
          "vlm"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/moondream2",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "moondream2",
            "label": "default",
            "reportedDownloadSize": "~1.7 GB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/moondream2"
      },
      {
        "id": "llava-1.5-7b",
        "nameKey": "models.llava-1-5-7b.name",
        "descriptionKey": "models.llava-1-5-7b.description",
        "name": "LLaVA 1.5 7B",
        "framework": "webllm",
        "description": "LLaVA visual chat model; runs in the browser via WebLLM.",
        "docsUrl": "https://huggingface.co/llava-hf/llava-1.5-7b-hf",
        "kind": "model",
        "tasks": [
          "vlm"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/llava-hf/llava-1.5-7b-hf",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "llava-1.5-7b",
            "label": "default",
            "reportedDownloadSize": "~4.5 GB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "llava-hf/llava-1.5-7b-hf"
      },
      {
        "id": "paligemma-3b",
        "nameKey": "models.paligemma-3b.name",
        "descriptionKey": "models.paligemma-3b.description",
        "name": "PaliGemma 3B",
        "framework": "transformersjs",
        "description": "Google PaliGemma — versatile small VLM with strong OCR.",
        "docsUrl": "https://huggingface.co/google/paligemma-3b-mix-224",
        "kind": "model",
        "tasks": [
          "vlm"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/google/paligemma-3b-mix-224",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "paligemma-3b",
            "label": "default",
            "reportedDownloadSize": "~2.2 GB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "google/paligemma-3b-mix-224"
      },
      {
        "id": "florence-2",
        "nameKey": "models.florence-2.name",
        "descriptionKey": "models.florence-2.description",
        "name": "Florence-2",
        "framework": "transformersjs",
        "description": "Microsoft Florence-2 — unified vision foundation model for captioning, detection, OCR and grounding in the browser.",
        "docsUrl": "https://huggingface.co/onnx-community/Florence-2-base",
        "kind": "model",
        "tasks": [
          "vlm",
          "detection",
          "ocr"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/onnx-community/Florence-2-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "florence-2",
            "label": "default",
            "reportedDownloadSize": "~770 MB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "onnx-community/Florence-2-base"
      }
    ],
    "clip": [
      {
        "id": "clip-vit-base",
        "nameKey": "models.clip-vit-base.name",
        "descriptionKey": "models.clip-vit-base.description",
        "name": "CLIP ViT-B/32",
        "framework": "transformersjs",
        "description": "OpenAI CLIP base model — image/text embeddings in the browser.",
        "docsUrl": "https://huggingface.co/Xenova/clip-vit-base-patch32",
        "kind": "model",
        "tasks": [
          "clip"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/clip-vit-base-patch32",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "clip-vit-base",
            "label": "default",
            "reportedDownloadSize": "~150 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/clip-vit-base-patch32"
      },
      {
        "id": "siglip-base",
        "nameKey": "models.siglip-base.name",
        "descriptionKey": "models.siglip-base.description",
        "name": "SigLIP Base",
        "framework": "transformersjs",
        "description": "Google SigLIP — improved image-text similarity learning.",
        "docsUrl": "https://huggingface.co/Xenova/siglip-base-patch16-224",
        "kind": "model",
        "tasks": [
          "clip"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/siglip-base-patch16-224",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "siglip-base",
            "label": "default",
            "reportedDownloadSize": "~200 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/siglip-base-patch16-224"
      },
      {
        "id": "mobileclip",
        "nameKey": "models.mobileclip.name",
        "descriptionKey": "models.mobileclip.description",
        "name": "MobileCLIP",
        "framework": "onnxruntime-web",
        "description": "Apple MobileCLIP — tiny CLIP-style model for on-device use.",
        "docsUrl": "https://github.com/apple/ml-mobileclip",
        "kind": "model",
        "tasks": [
          "clip"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/apple/ml-mobileclip",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "mobileclip",
            "label": "default",
            "reportedDownloadSize": "~30 MB"
          }
        ],
        "reportedLicense": "other"
      }
    ],
    "document-understanding": [
      {
        "id": "layoutlmv3",
        "nameKey": "models.layoutlmv3.name",
        "descriptionKey": "models.layoutlmv3.description",
        "name": "LayoutLMv3",
        "framework": "transformersjs",
        "description": "Multimodal document understanding with text + layout + image.",
        "docsUrl": "https://huggingface.co/microsoft/layoutlmv3-base",
        "kind": "model",
        "tasks": [
          "document-understanding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/microsoft/layoutlmv3-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "layoutlmv3",
            "label": "default",
            "reportedDownloadSize": "~500 MB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "microsoft/layoutlmv3-base"
      },
      {
        "id": "donut-base",
        "nameKey": "models.donut-base.name",
        "descriptionKey": "models.donut-base.description",
        "name": "Donut (base)",
        "framework": "transformersjs",
        "description": "OCR-free document understanding transformer.",
        "docsUrl": "https://huggingface.co/naver-clova-ix/donut-base",
        "kind": "model",
        "tasks": [
          "document-understanding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/naver-clova-ix/donut-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "donut-base",
            "label": "default",
            "reportedDownloadSize": "~300 MB"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "naver-clova-ix/donut-base"
      },
      {
        "id": "nougat-small",
        "nameKey": "models.nougat-small.name",
        "descriptionKey": "models.nougat-small.description",
        "name": "Nougat Small",
        "framework": "transformersjs",
        "description": "Meta Nougat — scientific document parsing.",
        "docsUrl": "https://huggingface.co/Xenova/nougat-small",
        "kind": "model",
        "tasks": [
          "document-understanding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/nougat-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "nougat-small",
            "label": "default",
            "reportedDownloadSize": "~450 MB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "Xenova/nougat-small"
      }
    ]
  },
  "real-time": {
    "face": [
      {
        "id": "mediapipe-facedetection",
        "nameKey": "models.mediapipe-facedetection.name",
        "descriptionKey": "models.mediapipe-facedetection.description",
        "name": "MediaPipe Face Detection",
        "framework": "mediapipe",
        "description": "BlazeFace — short-range and full-range face detection.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/face_detector/web_js",
        "kind": "model",
        "tasks": [
          "face"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/face_detector/web_js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/guide",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Face Detection"
        ],
        "variants": [
          {
            "id": "mediapipe-facedetection",
            "label": "default",
            "reportedDownloadSize": "~3 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "mediapipe-facemesh",
        "nameKey": "models.mediapipe-facemesh.name",
        "descriptionKey": "models.mediapipe-facemesh.description",
        "name": "MediaPipe Face Mesh",
        "framework": "mediapipe",
        "description": "Dense 3D face landmarks for AR / analytics.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js",
        "kind": "model",
        "tasks": [
          "face"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/face_mesh.md",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "468 landmarks"
        ],
        "variants": [
          {
            "id": "mediapipe-facemesh",
            "label": "default",
            "reportedDownloadSize": "~6 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "blazeface",
        "nameKey": "models.blazeface.name",
        "descriptionKey": "models.blazeface.description",
        "name": "BlazeFace (tfjs)",
        "framework": "tensorflowjs",
        "description": "Original BlazeFace implementation via TensorFlow.js.",
        "docsUrl": "https://github.com/tensorflow/tfjs-models/tree/master/blazeface",
        "kind": "model",
        "tasks": [
          "face"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/tensorflow/tfjs-models/tree/master/blazeface",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/tensorflow/tfjs-models",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Face Detection"
        ],
        "variants": [
          {
            "id": "blazeface",
            "label": "default",
            "reportedDownloadSize": "~1 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      }
    ],
    "pose": [
      {
        "id": "mediapipe-pose",
        "nameKey": "models.mediapipe-pose.name",
        "descriptionKey": "models.mediapipe-pose.description",
        "name": "MediaPipe Pose",
        "framework": "mediapipe",
        "description": "ML-based 3D pose estimation from a single image.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/web_js",
        "kind": "model",
        "tasks": [
          "pose"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/pose.md",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/web_js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "33 landmarks"
        ],
        "variants": [
          {
            "id": "mediapipe-pose",
            "label": "default",
            "reportedDownloadSize": "~5 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "movenet",
        "nameKey": "models.movenet.name",
        "descriptionKey": "models.movenet.description",
        "name": "MoveNet",
        "framework": "tensorflowjs",
        "description": "Google MoveNet — lightning/ thunder variants for pose.",
        "docsUrl": "https://github.com/tensorflow/tfjs-models/tree/master/pose-detection",
        "kind": "model",
        "tasks": [
          "pose"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/tensorflow/tfjs-models/tree/master/pose-detection",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/tensorflow/tfjs-models",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "17 keypoints"
        ],
        "variants": [
          {
            "id": "movenet",
            "label": "default",
            "reportedDownloadSize": "~3 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "posenet",
        "nameKey": "models.posenet.name",
        "descriptionKey": "models.posenet.description",
        "name": "PoseNet",
        "framework": "tensorflowjs",
        "description": "Classic PoseNet for single-person pose estimation.",
        "docsUrl": "https://github.com/tensorflow/tfjs-models/tree/master/posenet",
        "kind": "model",
        "tasks": [
          "pose"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/tensorflow/tfjs-models/tree/master/posenet",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/tensorflow/tfjs-models",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "17 keypoints"
        ],
        "variants": [
          {
            "id": "posenet",
            "label": "default",
            "reportedDownloadSize": "~5 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "mediapipe-pose-landmarker",
        "nameKey": "models.mediapipe-pose-landmarker.name",
        "descriptionKey": "models.mediapipe-pose-landmarker.description",
        "name": "MediaPipe Pose Landmarker (Tasks API)",
        "framework": "mediapipe",
        "description": "MediaPipe Pose Landmarker — modern Tasks API successor to MediaPipe Pose, with BlazePose GHUM 3D model.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/web_js",
        "kind": "model",
        "tasks": [
          "pose"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/web_js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/guide",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "33 landmarks"
        ],
        "variants": [
          {
            "id": "mediapipe-pose-landmarker",
            "label": "default",
            "reportedDownloadSize": "~5 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      }
    ],
    "hand": [
      {
        "id": "mediapipe-hands",
        "nameKey": "models.mediapipe-hands.name",
        "descriptionKey": "models.mediapipe-hands.description",
        "name": "MediaPipe Hands",
        "framework": "mediapipe",
        "description": "Real-time hand landmark tracking for gesture interfaces.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js",
        "kind": "model",
        "tasks": [
          "hand"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/hands.md",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "21 landmarks / hand"
        ],
        "variants": [
          {
            "id": "mediapipe-hands",
            "label": "default",
            "reportedDownloadSize": "~5 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "mediapipe-handlandmarker",
        "nameKey": "models.mediapipe-handlandmarker.name",
        "descriptionKey": "models.mediapipe-handlandmarker.description",
        "name": "MediaPipe Hand Landmarker",
        "framework": "mediapipe",
        "description": "Newer Tasks API version of MediaPipe Hands.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js",
        "kind": "model",
        "tasks": [
          "hand"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/guide",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "21 landmarks / hand"
        ],
        "variants": [
          {
            "id": "mediapipe-handlandmarker",
            "label": "default",
            "reportedDownloadSize": "~6 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      }
    ],
    "tracking": [
      {
        "id": "mediapipe-holistic",
        "nameKey": "models.mediapipe-holistic.name",
        "descriptionKey": "models.mediapipe-holistic.description",
        "name": "MediaPipe Holistic",
        "framework": "mediapipe",
        "description": "Unified pipeline that tracks face, pose and hands simultaneously.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/web_js",
        "kind": "model",
        "tasks": [
          "tracking"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/holistic.md",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/web_js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Face + Pose + Hands"
        ],
        "variants": [
          {
            "id": "mediapipe-holistic",
            "label": "default",
            "reportedDownloadSize": "~12 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "mediapipe-objectron",
        "nameKey": "models.mediapipe-objectron.name",
        "descriptionKey": "models.mediapipe-objectron.description",
        "name": "MediaPipe Objectron",
        "framework": "mediapipe",
        "description": "3D bounding-box tracking for everyday objects.",
        "docsUrl": "https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/objectron.md",
        "kind": "model",
        "tasks": [
          "tracking"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/objectron.md",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/guide",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "3D Object Tracking"
        ],
        "variants": [
          {
            "id": "mediapipe-objectron",
            "label": "default",
            "reportedDownloadSize": "~8 MB"
          }
        ],
        "reportedLicense": "apache-2-0"
      },
      {
        "id": "bytetrack-wasm",
        "nameKey": "models.bytetrack-wasm.name",
        "descriptionKey": "models.bytetrack-wasm.description",
        "name": "ByteTrack (WASM)",
        "framework": "opencvjs",
        "description": "ByteTrack tracker used together with OpenCV.js for in-browser MOT.",
        "docsUrl": "https://github.com/FoundationVision/ByteTrack",
        "kind": "model",
        "tasks": [
          "tracking"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/FoundationVision/ByteTrack",
            "kind": "documentation"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Multi-object Tracking"
        ],
        "variants": [
          {
            "id": "bytetrack-wasm",
            "label": "default"
          }
        ],
        "reportedLicense": "mit"
      }
    ]
  },
  "video": {
    "video-understanding": [
      {
        "id": "videoclip",
        "nameKey": "models.videoclip.name",
        "descriptionKey": "models.videoclip.description",
        "name": "VideoCLIP",
        "framework": "transformersjs",
        "description": "CLIP-style video-text embedding for retrieval and tagging.",
        "docsUrl": "https://github.com/facebookresearch/fairseq/tree/main/examples/MMPT",
        "kind": "model",
        "tasks": [
          "video-understanding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/facebookresearch/fairseq/tree/main/examples/MMPT",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "videoclip",
            "label": "default",
            "reportedDownloadSize": "~300 MB"
          }
        ],
        "reportedLicense": "other"
      },
      {
        "id": "xclip",
        "nameKey": "models.xclip.name",
        "descriptionKey": "models.xclip.description",
        "name": "X-CLIP",
        "framework": "transformersjs",
        "description": "Multimodal contrastive video-language model.",
        "docsUrl": "https://huggingface.co/microsoft/xclip-base-patch32",
        "kind": "model",
        "tasks": [
          "video-understanding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/microsoft/xclip-base-patch32",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "xclip",
            "label": "default",
            "reportedDownloadSize": "~350 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "microsoft/xclip-base-patch32"
      },
      {
        "id": "videomae",
        "nameKey": "models.videomae.name",
        "descriptionKey": "models.videomae.description",
        "name": "VideoMAE",
        "framework": "transformersjs",
        "description": "Masked autoencoder pre-trained for video action classification.",
        "docsUrl": "https://huggingface.co/MCG-NJU/videomae-base",
        "kind": "model",
        "tasks": [
          "video-understanding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://huggingface.co/MCG-NJU/videomae-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Action Recognition"
        ],
        "variants": [
          {
            "id": "videomae",
            "label": "default",
            "reportedDownloadSize": "~430 MB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "MCG-NJU/videomae-base"
      },
      {
        "id": "mediapipe-classifier",
        "nameKey": "models.mediapipe-classifier.name",
        "descriptionKey": "models.mediapipe-classifier.description",
        "name": "MediaPipe Video Classifier",
        "framework": "mediapipe",
        "description": "On-device video action classification via the MediaPipe Tasks API.",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/image_classifier/web_js",
        "kind": "model",
        "tasks": [
          "video-understanding"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/image_classifier/web_js",
            "kind": "conflicting-reference",
            "reviewedAt": "2026-10-03"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Kinetics-400"
        ],
        "variants": [
          {
            "id": "mediapipe-classifier",
            "label": "default",
            "reportedDownloadSize": "~6 MB"
          }
        ],
        "reportedLicense": "apache-2-0",
        "identityUnresolved": true
      }
    ]
  }
};

export const getModels = (cat: string, sub: string) => MODELS[cat]?.[sub] ?? [];
export const countModels = (cat: string, sub: string) => getModels(cat, sub).length;
export const totalModels = () => Object.values(MODELS).reduce((sum, subs) => sum + Object.values(subs).reduce((n, list) => n + list.length, 0), 0);
