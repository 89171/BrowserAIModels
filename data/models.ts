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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/distilbert-base-uncased-finetuned-sst-2-english",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/distilbert-base-uncased-finetuned-sst-2-english",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "distilbert-sst2-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 67581197,
            "revision": "0b6928efcb76139cae2c6881d49cda67fe119f42",
            "artifactUrl": "https://huggingface.co/Xenova/distilbert-base-uncased-finetuned-sst-2-english/resolve/0b6928efcb76139cae2c6881d49cda67fe119f42/onnx/model_quantized.onnx"
          },
          {
            "id": "distilbert-sst2-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 73044407,
            "revision": "0b6928efcb76139cae2c6881d49cda67fe119f42",
            "artifactUrl": "https://huggingface.co/Xenova/distilbert-base-uncased-finetuned-sst-2-english/resolve/0b6928efcb76139cae2c6881d49cda67fe119f42/onnx/model_q4f16.onnx"
          },
          {
            "id": "distilbert-sst2-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 134088280,
            "revision": "0b6928efcb76139cae2c6881d49cda67fe119f42",
            "artifactUrl": "https://huggingface.co/Xenova/distilbert-base-uncased-finetuned-sst-2-english/resolve/0b6928efcb76139cae2c6881d49cda67fe119f42/onnx/model_fp16.onnx"
          },
          {
            "id": "distilbert-sst2-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 267955711,
            "revision": "0b6928efcb76139cae2c6881d49cda67fe119f42",
            "artifactUrl": "https://huggingface.co/Xenova/distilbert-base-uncased-finetuned-sst-2-english/resolve/0b6928efcb76139cae2c6881d49cda67fe119f42/onnx/model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/xlm-roberta-base",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/xlm-roberta-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/FacebookAI/xlm-roberta-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "100+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "xlm-roberta-base-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 280308773,
            "revision": "84bead0eb70f8445a827edba1736f9182c49aab6",
            "artifactUrl": "https://huggingface.co/Xenova/xlm-roberta-base/resolve/84bead0eb70f8445a827edba1736f9182c49aab6/onnx/model_quantized.onnx"
          },
          {
            "id": "xlm-roberta-base-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 556966598,
            "revision": "84bead0eb70f8445a827edba1736f9182c49aab6",
            "artifactUrl": "https://huggingface.co/Xenova/xlm-roberta-base/resolve/84bead0eb70f8445a827edba1736f9182c49aab6/onnx/model_fp16.onnx"
          },
          {
            "id": "xlm-roberta-base-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 1113464750,
            "revision": "84bead0eb70f8445a827edba1736f9182c49aab6",
            "artifactUrl": "https://huggingface.co/Xenova/xlm-roberta-base/resolve/84bead0eb70f8445a827edba1736f9182c49aab6/onnx/model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/xlm-roberta-base",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "mit"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/toxic-bert",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/toxic-bert",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/unitary/toxic-bert",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "toxic-bert-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 97192620,
            "revision": "65cbc2607cb7fad64f98d1e8a5a3d1f8577895fd",
            "artifactUrl": "https://huggingface.co/Xenova/toxic-bert/resolve/65cbc2607cb7fad64f98d1e8a5a3d1f8577895fd/onnx/model_q4f16.onnx"
          },
          {
            "id": "toxic-bert-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 110720344,
            "revision": "65cbc2607cb7fad64f98d1e8a5a3d1f8577895fd",
            "artifactUrl": "https://huggingface.co/Xenova/toxic-bert/resolve/65cbc2607cb7fad64f98d1e8a5a3d1f8577895fd/onnx/model_quantized.onnx"
          },
          {
            "id": "toxic-bert-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 219326893,
            "revision": "65cbc2607cb7fad64f98d1e8a5a3d1f8577895fd",
            "artifactUrl": "https://huggingface.co/Xenova/toxic-bert/resolve/65cbc2607cb7fad64f98d1e8a5a3d1f8577895fd/onnx/model_fp16.onnx"
          },
          {
            "id": "toxic-bert-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 438214184,
            "revision": "65cbc2607cb7fad64f98d1e8a5a3d1f8577895fd",
            "artifactUrl": "https://huggingface.co/Xenova/toxic-bert/resolve/65cbc2607cb7fad64f98d1e8a5a3d1f8577895fd/onnx/model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/toxic-bert",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
      },
      {
        "id": "mobilenet-bert",
        "nameKey": "models.mobilenet-bert.name",
        "descriptionKey": "models.mobilenet-bert.description",
        "name": "MobileBERT",
        "framework": "transformersjs",
        "description": "Compact BERT optimized for mobile / browser inference.",
        "docsUrl": "https://huggingface.co/Xenova/mobilebert-uncased-mnli",
        "kind": "model",
        "tasks": [
          "classification"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/mobilebert-uncased-mnli",
          "reviewedAt": "2026-10-05"
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
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/Xenova/mobilebert-uncased-mnli",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "mobilenet-bert-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 20954867,
            "revision": "8b0ea66ab7b190bba77418ba03b67d69cfc9a1ee",
            "artifactUrl": "https://huggingface.co/Xenova/mobilebert-uncased-mnli/resolve/8b0ea66ab7b190bba77418ba03b67d69cfc9a1ee/onnx/model_q4f16.onnx"
          },
          {
            "id": "mobilenet-bert-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 26967165,
            "revision": "8b0ea66ab7b190bba77418ba03b67d69cfc9a1ee",
            "artifactUrl": "https://huggingface.co/Xenova/mobilebert-uncased-mnli/resolve/8b0ea66ab7b190bba77418ba03b67d69cfc9a1ee/onnx/model_quantized.onnx"
          },
          {
            "id": "mobilenet-bert-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 50077049,
            "revision": "8b0ea66ab7b190bba77418ba03b67d69cfc9a1ee",
            "artifactUrl": "https://huggingface.co/Xenova/mobilebert-uncased-mnli/resolve/8b0ea66ab7b190bba77418ba03b67d69cfc9a1ee/onnx/model_fp16.onnx"
          },
          {
            "id": "mobilenet-bert-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 99027471,
            "revision": "8b0ea66ab7b190bba77418ba03b67d69cfc9a1ee",
            "artifactUrl": "https://huggingface.co/Xenova/mobilebert-uncased-mnli/resolve/8b0ea66ab7b190bba77418ba03b67d69cfc9a1ee/onnx/model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/mobilebert-uncased-mnli",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0"
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
        "docsUrl": "https://huggingface.co/Xenova/nllb-200-distilled-600M",
        "kind": "model",
        "tasks": [
          "translation"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/nllb-200-distilled-600M",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/facebook/nllb-200-distilled-600M",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/Xenova/nllb-200-distilled-600M",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/spaces/Xenova/react-translator",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "200+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "nllb-200-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 894626254,
            "revision": "261c31d1a5732c67cdd16d80e8d6088507c7ccea",
            "artifactUrl": "https://huggingface.co/Xenova/nllb-200-distilled-600M/resolve/261c31d1a5732c67cdd16d80e8d6088507c7ccea/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "nllb-200-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 1253954737,
            "revision": "261c31d1a5732c67cdd16d80e8d6088507c7ccea",
            "artifactUrl": "https://huggingface.co/Xenova/nllb-200-distilled-600M/resolve/261c31d1a5732c67cdd16d80e8d6088507c7ccea/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "nllb-200-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 1760444340,
            "revision": "261c31d1a5732c67cdd16d80e8d6088507c7ccea",
            "artifactUrl": "https://huggingface.co/Xenova/nllb-200-distilled-600M/resolve/261c31d1a5732c67cdd16d80e8d6088507c7ccea/onnx/decoder_model_fp16.onnx"
          },
          {
            "id": "nllb-200-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 3523627628,
            "revision": "261c31d1a5732c67cdd16d80e8d6088507c7ccea",
            "artifactUrl": "https://huggingface.co/Xenova/nllb-200-distilled-600M/resolve/261c31d1a5732c67cdd16d80e8d6088507c7ccea/onnx/decoder_model.onnx"
          }
        ],
        "modelId": "Xenova/nllb-200-distilled-600M",
        "weightLicense": "cc-by-nc-4-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "demoUrl": "https://huggingface.co/spaces/Xenova/react-translator"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/opus-mt-en-zh",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/opus-mt-en-zh",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/Helsinki-NLP/opus-mt-en-zh",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
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
            "id": "opus-mt-en-zh-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 113112546,
            "revision": "046f55aec303cdee3e0318604406d4df20f1e8ea",
            "artifactUrl": "https://huggingface.co/Xenova/opus-mt-en-zh/resolve/046f55aec303cdee3e0318604406d4df20f1e8ea/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "opus-mt-en-zh-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 160087005,
            "revision": "046f55aec303cdee3e0318604406d4df20f1e8ea",
            "artifactUrl": "https://huggingface.co/Xenova/opus-mt-en-zh/resolve/046f55aec303cdee3e0318604406d4df20f1e8ea/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "opus-mt-en-zh-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 223416625,
            "revision": "046f55aec303cdee3e0318604406d4df20f1e8ea",
            "artifactUrl": "https://huggingface.co/Xenova/opus-mt-en-zh/resolve/046f55aec303cdee3e0318604406d4df20f1e8ea/onnx/decoder_model_fp16.onnx"
          },
          {
            "id": "opus-mt-en-zh-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 445777456,
            "revision": "046f55aec303cdee3e0318604406d4df20f1e8ea",
            "artifactUrl": "https://huggingface.co/Xenova/opus-mt-en-zh/resolve/046f55aec303cdee3e0318604406d4df20f1e8ea/onnx/decoder_model.onnx"
          }
        ],
        "reportedLicense": "other",
        "modelId": "Xenova/opus-mt-en-zh",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
      },
      {
        "id": "m2m100-418m",
        "nameKey": "models.m2m100-418m.name",
        "descriptionKey": "models.m2m100-418m.description",
        "name": "M2M-100 (418M)",
        "framework": "transformersjs",
        "description": "Many-to-many translation model runnable in the browser via ONNX.",
        "docsUrl": "https://huggingface.co/Xenova/m2m100_418M",
        "kind": "model",
        "tasks": [
          "translation"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/m2m100_418M",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/facebook/m2m100_418M",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/Xenova/m2m100_418M",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "100 languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "m2m100-418m-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 631984548,
            "revision": "9c374f0b7aca709787cea97b047bfbbd1559d177",
            "artifactUrl": "https://huggingface.co/Xenova/m2m100_418M/resolve/9c374f0b7aca709787cea97b047bfbbd1559d177/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "m2m100-418m-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 729121743,
            "revision": "9c374f0b7aca709787cea97b047bfbbd1559d177",
            "artifactUrl": "https://huggingface.co/Xenova/m2m100_418M/resolve/9c374f0b7aca709787cea97b047bfbbd1559d177/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "m2m100-418m-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 1235623272,
            "revision": "9c374f0b7aca709787cea97b047bfbbd1559d177",
            "artifactUrl": "https://huggingface.co/Xenova/m2m100_418M/resolve/9c374f0b7aca709787cea97b047bfbbd1559d177/onnx/decoder_model_fp16.onnx"
          },
          {
            "id": "m2m100-418m-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 2473970161,
            "revision": "9c374f0b7aca709787cea97b047bfbbd1559d177",
            "artifactUrl": "https://huggingface.co/Xenova/m2m100_418M/resolve/9c374f0b7aca709787cea97b047bfbbd1559d177/onnx/decoder_model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/m2m100_418M",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "mit"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/t5-small",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/t5-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/google-t5/t5-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "t5-small-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 78071426,
            "revision": "4e0d91096b13cb313b43a14f35fdbb311a6d9728",
            "artifactUrl": "https://huggingface.co/Xenova/t5-small/resolve/4e0d91096b13cb313b43a14f35fdbb311a6d9728/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "t5-small-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 91034912,
            "revision": "4e0d91096b13cb313b43a14f35fdbb311a6d9728",
            "artifactUrl": "https://huggingface.co/Xenova/t5-small/resolve/4e0d91096b13cb313b43a14f35fdbb311a6d9728/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "t5-small-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 154350057,
            "revision": "4e0d91096b13cb313b43a14f35fdbb311a6d9728",
            "artifactUrl": "https://huggingface.co/Xenova/t5-small/resolve/4e0d91096b13cb313b43a14f35fdbb311a6d9728/onnx/decoder_model_fp16.onnx"
          },
          {
            "id": "t5-small-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 308236899,
            "revision": "4e0d91096b13cb313b43a14f35fdbb311a6d9728",
            "artifactUrl": "https://huggingface.co/Xenova/t5-small/resolve/4e0d91096b13cb313b43a14f35fdbb311a6d9728/onnx/decoder_model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/t5-small",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/bart-large-cnn",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/bart-large-cnn",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/facebook/bart-large-cnn",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "bart-large-cnn-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 410553557,
            "revision": "a7823edec55686ab84d3307fbccfd4af3b81e6dc",
            "artifactUrl": "https://huggingface.co/Xenova/bart-large-cnn/resolve/a7823edec55686ab84d3307fbccfd4af3b81e6dc/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "bart-large-cnn-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 462535837,
            "revision": "a7823edec55686ab84d3307fbccfd4af3b81e6dc",
            "artifactUrl": "https://huggingface.co/Xenova/bart-large-cnn/resolve/a7823edec55686ab84d3307fbccfd4af3b81e6dc/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "bart-large-cnn-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 917048236,
            "revision": "a7823edec55686ab84d3307fbccfd4af3b81e6dc",
            "artifactUrl": "https://huggingface.co/Xenova/bart-large-cnn/resolve/a7823edec55686ab84d3307fbccfd4af3b81e6dc/onnx/decoder_model_fp16.onnx"
          },
          {
            "id": "bart-large-cnn-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 1832517071,
            "revision": "a7823edec55686ab84d3307fbccfd4af3b81e6dc",
            "artifactUrl": "https://huggingface.co/Xenova/bart-large-cnn/resolve/a7823edec55686ab84d3307fbccfd4af3b81e6dc/onnx/decoder_model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/bart-large-cnn",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "mit"
      },
      {
        "id": "pegasus-xsum",
        "nameKey": "models.pegasus-xsum.name",
        "descriptionKey": "models.pegasus-xsum.description",
        "name": "PEGASUS XSum",
        "framework": "transformers",
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
            "reviewedAt": "2026-10-06"
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
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "bert-base-ner-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 93661735,
            "revision": "8e892123e8b7c2c0c2bd1dcb598b7d244c4e53aa",
            "artifactUrl": "https://huggingface.co/Xenova/bert-base-NER/resolve/8e892123e8b7c2c0c2bd1dcb598b7d244c4e53aa/onnx/model_q4f16.onnx"
          },
          {
            "id": "bert-base-ner-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 108952255,
            "revision": "8e892123e8b7c2c0c2bd1dcb598b7d244c4e53aa",
            "artifactUrl": "https://huggingface.co/Xenova/bert-base-NER/resolve/8e892123e8b7c2c0c2bd1dcb598b7d244c4e53aa/onnx/model_quantized.onnx"
          },
          {
            "id": "bert-base-ner-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 215805679,
            "revision": "8e892123e8b7c2c0c2bd1dcb598b7d244c4e53aa",
            "artifactUrl": "https://huggingface.co/Xenova/bert-base-NER/resolve/8e892123e8b7c2c0c2bd1dcb598b7d244c4e53aa/onnx/model_fp16.onnx"
          },
          {
            "id": "bert-base-ner-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 431172606,
            "revision": "8e892123e8b7c2c0c2bd1dcb598b7d244c4e53aa",
            "artifactUrl": "https://huggingface.co/Xenova/bert-base-NER/resolve/8e892123e8b7c2c0c2bd1dcb598b7d244c4e53aa/onnx/model.onnx"
          }
        ],
        "docsUrl": "https://huggingface.co/Xenova/bert-base-NER",
        "modelId": "Xenova/bert-base-NER",
        "weightLicense": "mit",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0"
      },
      {
        "id": "bert-multilingual-ner",
        "nameKey": "models.bert-multilingual-ner.name",
        "descriptionKey": "models.bert-multilingual-ner.description",
        "name": "bert-multilingual-ner",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/Xenova/bert-base-multilingual-cased-ner-hrl",
        "kind": "model",
        "tasks": [
          "ner"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/bert-base-multilingual-cased-ner-hrl",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/bert-base-multilingual-cased-ner-hrl",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/Davlan/bert-base-multilingual-cased-ner-hrl",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "Arabic",
          "German",
          "English",
          "Spanish",
          "French",
          "Italian",
          "Latvian",
          "Dutch",
          "Portuguese",
          "Chinese"
        ],
        "programmingLanguages": [],
        "capabilities": [
          "PER",
          "ORG",
          "LOC"
        ],
        "variants": [
          {
            "id": "bert-multilingual-ner-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 178495423,
            "revision": "263e82c06569c8c2ac46238a7ae5107598934234",
            "artifactUrl": "https://huggingface.co/Xenova/bert-base-multilingual-cased-ner-hrl/resolve/263e82c06569c8c2ac46238a7ae5107598934234/onnx/model_quantized.onnx"
          },
          {
            "id": "bert-multilingual-ner-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 232748071,
            "revision": "263e82c06569c8c2ac46238a7ae5107598934234",
            "artifactUrl": "https://huggingface.co/Xenova/bert-base-multilingual-cased-ner-hrl/resolve/263e82c06569c8c2ac46238a7ae5107598934234/onnx/model_q4f16.onnx"
          },
          {
            "id": "bert-multilingual-ner-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 354892016,
            "revision": "263e82c06569c8c2ac46238a7ae5107598934234",
            "artifactUrl": "https://huggingface.co/Xenova/bert-base-multilingual-cased-ner-hrl/resolve/263e82c06569c8c2ac46238a7ae5107598934234/onnx/model_fp16.onnx"
          },
          {
            "id": "bert-multilingual-ner-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 709345280,
            "revision": "263e82c06569c8c2ac46238a7ae5107598934234",
            "artifactUrl": "https://huggingface.co/Xenova/bert-base-multilingual-cased-ner-hrl/resolve/263e82c06569c8c2ac46238a7ae5107598934234/onnx/model.onnx"
          }
        ],
        "modelId": "Xenova/bert-base-multilingual-cased-ner-hrl",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "custom"
      },
      {
        "id": "gliner-small",
        "nameKey": "models.gliner-small.name",
        "descriptionKey": "models.gliner-small.description",
        "name": "gliner-small",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/onnx-community/gliner_small-v2.1",
        "kind": "model",
        "tasks": [
          "ner"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/onnx-community/gliner_small-v2.1",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/onnx-community/gliner_small-v2.1",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/urchade/gliner_small-v2.1",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Zero-shot entity types"
        ],
        "variants": [
          {
            "id": "gliner-small-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 183403734,
            "revision": "8142fb00740ccea973e64b1272949ff48653df5e",
            "artifactUrl": "https://huggingface.co/onnx-community/gliner_small-v2.1/resolve/8142fb00740ccea973e64b1272949ff48653df5e/onnx/model_quantized.onnx"
          },
          {
            "id": "gliner-small-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 245226118,
            "revision": "8142fb00740ccea973e64b1272949ff48653df5e",
            "artifactUrl": "https://huggingface.co/onnx-community/gliner_small-v2.1/resolve/8142fb00740ccea973e64b1272949ff48653df5e/onnx/model_q4f16.onnx"
          },
          {
            "id": "gliner-small-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 306253040,
            "revision": "8142fb00740ccea973e64b1272949ff48653df5e",
            "artifactUrl": "https://huggingface.co/onnx-community/gliner_small-v2.1/resolve/8142fb00740ccea973e64b1272949ff48653df5e/onnx/model_fp16.onnx"
          },
          {
            "id": "gliner-small-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 611293061,
            "revision": "8142fb00740ccea973e64b1272949ff48653df5e",
            "artifactUrl": "https://huggingface.co/onnx-community/gliner_small-v2.1/resolve/8142fb00740ccea973e64b1272949ff48653df5e/onnx/model.onnx"
          }
        ],
        "modelId": "onnx-community/gliner_small-v2.1",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
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
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "llama-3-8b-instruct-q4f32_1",
            "label": "q4f32_1",
            "quantization": "q4f32_1",
            "downloadBytes": 4517404672,
            "revision": "b2c0e50a6c723cdf65b8af4b8a03279907bb7ac1",
            "artifactUrl": "https://huggingface.co/mlc-ai/Llama-3-8B-Instruct-q4f32_1-MLC/resolve/b2c0e50a6c723cdf65b8af4b8a03279907bb7ac1/params_shard_0.bin"
          }
        ],
        "reportedLicense": "other",
        "modelId": "mlc-ai/Llama-3-8B-Instruct-q4f32_1-MLC",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mlc-ai/web-llm@0.2.85",
        "weightLicense": "custom"
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
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://huggingface.co/microsoft/Phi-3-mini-4k-instruct",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "phi-3-mini-q4f16_1",
            "label": "q4f16_1",
            "quantization": "q4f16_1",
            "downloadBytes": 2149644288,
            "revision": "7ecdc19b399efd7e967025c02496353e0dc50500",
            "artifactUrl": "https://huggingface.co/mlc-ai/Phi-3-mini-4k-instruct-q4f16_1-MLC/resolve/7ecdc19b399efd7e967025c02496353e0dc50500/params_shard_0.bin"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "mlc-ai/Phi-3-mini-4k-instruct-q4f16_1-MLC",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mlc-ai/web-llm@0.2.85",
        "weightLicense": "mit"
      },
      {
        "id": "qwen2-1-5b",
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
          "status": "upstream-example",
          "url": "https://chat.webllm.ai/",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/Qwen2-1.5B-Instruct-q4f16_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://huggingface.co/Qwen/Qwen2-1.5B-Instruct",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://chat.webllm.ai/",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
            "id": "qwen2-1-5b-q4f16_1",
            "label": "q4f16_1",
            "quantization": "q4f16_1",
            "downloadBytes": 868547584,
            "revision": "edc705fc1ffe862bc41cc056cc0031895e26eeee",
            "artifactUrl": "https://huggingface.co/mlc-ai/Qwen2-1.5B-Instruct-q4f16_1-MLC/resolve/edc705fc1ffe862bc41cc056cc0031895e26eeee/params_shard_0.bin"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "mlc-ai/Qwen2-1.5B-Instruct-q4f16_1-MLC",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mlc-ai/web-llm@0.2.85",
        "weightLicense": "apache-2-0",
        "demoUrl": "https://chat.webllm.ai/"
      },
      {
        "id": "tinyllama-1-1b",
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/TinyLlama-1.1B-Chat-v1.0",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/TinyLlama-1.1B-Chat-v1.0",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "tinyllama-1-1b-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 713747554,
            "revision": "2d31d778084d99c2f58d14adfaa7a27f100d9391",
            "artifactUrl": "https://huggingface.co/Xenova/TinyLlama-1.1B-Chat-v1.0/resolve/2d31d778084d99c2f58d14adfaa7a27f100d9391/onnx/model_q4f16.onnx"
          },
          {
            "id": "tinyllama-1-1b-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 1102917410,
            "revision": "2d31d778084d99c2f58d14adfaa7a27f100d9391",
            "artifactUrl": "https://huggingface.co/Xenova/TinyLlama-1.1B-Chat-v1.0/resolve/2d31d778084d99c2f58d14adfaa7a27f100d9391/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "tinyllama-1-1b-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 2200717222,
            "revision": "2d31d778084d99c2f58d14adfaa7a27f100d9391",
            "artifactUrl": "https://huggingface.co/Xenova/TinyLlama-1.1B-Chat-v1.0/resolve/2d31d778084d99c2f58d14adfaa7a27f100d9391/onnx/model_fp16.onnx"
          },
          {
            "id": "tinyllama-1-1b-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 4402299393,
            "revision": "2d31d778084d99c2f58d14adfaa7a27f100d9391",
            "artifactUrl": "https://huggingface.co/Xenova/TinyLlama-1.1B-Chat-v1.0/resolve/2d31d778084d99c2f58d14adfaa7a27f100d9391/onnx/decoder_model_merged.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/TinyLlama-1.1B-Chat-v1.0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
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
          "status": "upstream-example",
          "url": "https://chat.webllm.ai/",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/gemma-2-2b-it-q4f16_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://huggingface.co/google/gemma-2-2b-it",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://chat.webllm.ai/",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "gemma-2-2b-it-q4f16_1",
            "label": "q4f16_1",
            "quantization": "q4f16_1",
            "downloadBytes": 1470915072,
            "revision": "de9cc76f0d4b3a49a0f718df424944054bf1eec1",
            "artifactUrl": "https://huggingface.co/mlc-ai/gemma-2-2b-it-q4f16_1-MLC/resolve/de9cc76f0d4b3a49a0f718df424944054bf1eec1/params_shard_0.bin"
          }
        ],
        "reportedLicense": "other",
        "modelId": "mlc-ai/gemma-2-2b-it-q4f16_1-MLC",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mlc-ai/web-llm@0.2.85",
        "weightLicense": "custom",
        "demoUrl": "https://chat.webllm.ai/"
      },
      {
        "id": "smollm2-1-7b",
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
          "status": "upstream-example",
          "url": "https://chat.webllm.ai/",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/SmolLM2-1.7B-Instruct-q4f16_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://chat.webllm.ai/",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "smollm2-1-7b-q4f16_1",
            "label": "q4f16_1",
            "quantization": "q4f16_1",
            "downloadBytes": 962793472,
            "revision": "84f57f8580a9d8d623266b600ad4273bb9fd84c1",
            "artifactUrl": "https://huggingface.co/mlc-ai/SmolLM2-1.7B-Instruct-q4f16_1-MLC/resolve/84f57f8580a9d8d623266b600ad4273bb9fd84c1/params_shard_0.bin"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "mlc-ai/SmolLM2-1.7B-Instruct-q4f16_1-MLC",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mlc-ai/web-llm@0.2.85",
        "weightLicense": "apache-2-0",
        "demoUrl": "https://chat.webllm.ai/"
      },
      {
        "id": "deepseek-r1-distill-qwen-1-5b",
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
          "status": "upstream-example",
          "url": "https://chat.webllm.ai/",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://huggingface.co/mlc-ai/DeepSeek-R1-Distill-Qwen-1.5B-q4f16_1-MLC",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://chat.webllm.ai/",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
            "id": "deepseek-r1-distill-qwen-1-5b-q4f16_1",
            "label": "q4f16_1",
            "quantization": "q4f16_1",
            "downloadBytes": 999820288,
            "revision": "7198ce7f5a342e377f5e61ff8400193492af548b",
            "artifactUrl": "https://huggingface.co/mlc-ai/DeepSeek-R1-Distill-Qwen-1.5B-q4f16_1-MLC/resolve/7198ce7f5a342e377f5e61ff8400193492af548b/params_shard_0.bin"
          }
        ],
        "reportedLicense": "other",
        "modelId": "mlc-ai/DeepSeek-R1-Distill-Qwen-1.5B-q4f16_1-MLC",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mlc-ai/web-llm@0.2.85",
        "weightLicense": "mit",
        "demoUrl": "https://chat.webllm.ai/"
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
      },
      {
        "id": "webllm-json-mode",
        "nameKey": "models.webllm-json-mode.name",
        "descriptionKey": "models.webllm-json-mode.description",
        "name": "webllm-json-mode",
        "framework": "webllm",
        "description": "",
        "docsUrl": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
        "kind": "tool",
        "tasks": [
          "structured-output"
        ],
        "browserEvidence": {
          "status": "pending"
        },
        "sources": [
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://www.npmjs.com/package/@mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "JSON mode",
          "Grammar-constrained decoding"
        ],
        "variants": [],
        "npmPackage": "@mlc-ai/web-llm",
        "runtimeVersion": "@mlc-ai/web-llm@0.2.85",
        "codeLicense": "apache-2-0"
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
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://huggingface.co/codellama/CodeLlama-7b-hf",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
            "id": "codellama-7b-q4f16_1",
            "label": "q4f16_1",
            "quantization": "q4f16_1",
            "downloadBytes": 3790815232,
            "revision": "5eef5a5389bb111d9d6cd4f5e688bf0bff4ae5e1",
            "artifactUrl": "https://huggingface.co/mlc-ai/CodeLlama-7b-hf-q4f16_1-MLC/resolve/5eef5a5389bb111d9d6cd4f5e688bf0bff4ae5e1/params_shard_0.bin"
          }
        ],
        "reportedLicense": "other",
        "modelId": "mlc-ai/CodeLlama-7b-hf-q4f16_1-MLC",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mlc-ai/web-llm@0.2.85",
        "weightLicense": "custom"
      },
      {
        "id": "starcoder2-3b",
        "nameKey": "models.starcoder2-3b.name",
        "descriptionKey": "models.starcoder2-3b.description",
        "name": "StarCoder2 3B",
        "framework": "transformers",
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
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
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
        "modelId": "bigcode/starcoder2-3b",
        "weightLicense": "custom"
      },
      {
        "id": "deepseek-coder-1-3b",
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/deepseek-coder-1.3b-instruct",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/deepseek-coder-1.3b-instruct",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/deepseek-ai/deepseek-coder-1.3b-instruct",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
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
            "id": "deepseek-coder-1-3b-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 1364716527,
            "revision": "41346fd29f2a0e6b214d9ea1e232ba3e46616404",
            "artifactUrl": "https://huggingface.co/Xenova/deepseek-coder-1.3b-instruct/resolve/41346fd29f2a0e6b214d9ea1e232ba3e46616404/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "deepseek-coder-1-3b-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 5403429827,
            "revision": "41346fd29f2a0e6b214d9ea1e232ba3e46616404",
            "artifactUrl": "https://huggingface.co/Xenova/deepseek-coder-1.3b-instruct/resolve/41346fd29f2a0e6b214d9ea1e232ba3e46616404/onnx/decoder_model_merged.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/deepseek-coder-1.3b-instruct",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "other"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/all-MiniLM-L6-v2",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/all-MiniLM-L6-v2",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/spaces/Xenova/webgpu-embedding-benchmark",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "all-minilm-l6-v2-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 22972370,
            "revision": "751bff37182d3f1213fa05d7196b954e230abad9",
            "artifactUrl": "https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/751bff37182d3f1213fa05d7196b954e230abad9/onnx/model_quantized.onnx"
          },
          {
            "id": "all-minilm-l6-v2-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 30018257,
            "revision": "751bff37182d3f1213fa05d7196b954e230abad9",
            "artifactUrl": "https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/751bff37182d3f1213fa05d7196b954e230abad9/onnx/model_q4f16.onnx"
          },
          {
            "id": "all-minilm-l6-v2-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 45297825,
            "revision": "751bff37182d3f1213fa05d7196b954e230abad9",
            "artifactUrl": "https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/751bff37182d3f1213fa05d7196b954e230abad9/onnx/model_fp16.onnx"
          },
          {
            "id": "all-minilm-l6-v2-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 90387606,
            "revision": "751bff37182d3f1213fa05d7196b954e230abad9",
            "artifactUrl": "https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/751bff37182d3f1213fa05d7196b954e230abad9/onnx/model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/all-MiniLM-L6-v2",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0",
        "demoUrl": "https://huggingface.co/spaces/Xenova/webgpu-embedding-benchmark"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/bge-small-en-v1.5",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/bge-small-en-v1.5",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/BAAI/bge-small-en-v1.5",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "bge-small-en-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 34014426,
            "revision": "ea104dacec62c0de699686887e3f920caeb4f3e3",
            "artifactUrl": "https://huggingface.co/Xenova/bge-small-en-v1.5/resolve/ea104dacec62c0de699686887e3f920caeb4f3e3/onnx/model_quantized.onnx"
          },
          {
            "id": "bge-small-en-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 36190171,
            "revision": "ea104dacec62c0de699686887e3f920caeb4f3e3",
            "artifactUrl": "https://huggingface.co/Xenova/bge-small-en-v1.5/resolve/ea104dacec62c0de699686887e3f920caeb4f3e3/onnx/model_q4f16.onnx"
          },
          {
            "id": "bge-small-en-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 66749212,
            "revision": "ea104dacec62c0de699686887e3f920caeb4f3e3",
            "artifactUrl": "https://huggingface.co/Xenova/bge-small-en-v1.5/resolve/ea104dacec62c0de699686887e3f920caeb4f3e3/onnx/model_fp16.onnx"
          },
          {
            "id": "bge-small-en-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 133093490,
            "revision": "ea104dacec62c0de699686887e3f920caeb4f3e3",
            "artifactUrl": "https://huggingface.co/Xenova/bge-small-en-v1.5/resolve/ea104dacec62c0de699686887e3f920caeb4f3e3/onnx/model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/bge-small-en-v1.5",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "mit"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/gte-small",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/gte-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/thenlper/gte-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "gte-small-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 34014426,
            "revision": "5927d1727bb12db490052a1b33265ad78058de08",
            "artifactUrl": "https://huggingface.co/Xenova/gte-small/resolve/5927d1727bb12db490052a1b33265ad78058de08/onnx/model_quantized.onnx"
          },
          {
            "id": "gte-small-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 36190171,
            "revision": "5927d1727bb12db490052a1b33265ad78058de08",
            "artifactUrl": "https://huggingface.co/Xenova/gte-small/resolve/5927d1727bb12db490052a1b33265ad78058de08/onnx/model_q4f16.onnx"
          },
          {
            "id": "gte-small-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 66749212,
            "revision": "5927d1727bb12db490052a1b33265ad78058de08",
            "artifactUrl": "https://huggingface.co/Xenova/gte-small/resolve/5927d1727bb12db490052a1b33265ad78058de08/onnx/model_fp16.onnx"
          },
          {
            "id": "gte-small-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 133093490,
            "revision": "5927d1727bb12db490052a1b33265ad78058de08",
            "artifactUrl": "https://huggingface.co/Xenova/gte-small/resolve/5927d1727bb12db490052a1b33265ad78058de08/onnx/model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/gte-small",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "mit"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/bge-m3",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/bge-m3",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "100+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "bge-m3-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 1139566363,
            "revision": "4de13258303883538bd53b696b452bf8099f0858",
            "artifactUrl": "https://huggingface.co/Xenova/bge-m3/resolve/4de13258303883538bd53b696b452bf8099f0858/onnx/model_quantized.onnx"
          },
          {
            "id": "bge-m3-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 1399981060,
            "revision": "4de13258303883538bd53b696b452bf8099f0858",
            "artifactUrl": "https://huggingface.co/Xenova/bge-m3/resolve/4de13258303883538bd53b696b452bf8099f0858/onnx/model_q4f16.onnx"
          },
          {
            "id": "bge-m3-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 2268130457,
            "revision": "4de13258303883538bd53b696b452bf8099f0858",
            "artifactUrl": "https://huggingface.co/Xenova/bge-m3/resolve/4de13258303883538bd53b696b452bf8099f0858/onnx/model_fp16.onnx"
          },
          {
            "id": "bge-m3-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 4534973437,
            "revision": "4de13258303883538bd53b696b452bf8099f0858",
            "artifactUrl": "https://huggingface.co/Xenova/bge-m3/resolve/4de13258303883538bd53b696b452bf8099f0858/onnx/model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/bge-m3",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "mit"
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
            "reviewedAt": "2026-10-06"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/ms-marco-MiniLM-L-6-v2",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/ms-marco-MiniLM-L-6-v2",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/cross-encoder/ms-marco-MiniLM-L6-v2",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "ms-marco-minilm-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 23143499,
            "revision": "a09144355adeed5f58c8ed011d209bf8ee5a1fec",
            "artifactUrl": "https://huggingface.co/Xenova/ms-marco-MiniLM-L-6-v2/resolve/a09144355adeed5f58c8ed011d209bf8ee5a1fec/onnx/model_quantized.onnx"
          },
          {
            "id": "ms-marco-minilm-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 30327072,
            "revision": "a09144355adeed5f58c8ed011d209bf8ee5a1fec",
            "artifactUrl": "https://huggingface.co/Xenova/ms-marco-MiniLM-L-6-v2/resolve/a09144355adeed5f58c8ed011d209bf8ee5a1fec/onnx/model_q4f16.onnx"
          },
          {
            "id": "ms-marco-minilm-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 45609313,
            "revision": "a09144355adeed5f58c8ed011d209bf8ee5a1fec",
            "artifactUrl": "https://huggingface.co/Xenova/ms-marco-MiniLM-L-6-v2/resolve/a09144355adeed5f58c8ed011d209bf8ee5a1fec/onnx/model_fp16.onnx"
          },
          {
            "id": "ms-marco-minilm-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 90992115,
            "revision": "a09144355adeed5f58c8ed011d209bf8ee5a1fec",
            "artifactUrl": "https://huggingface.co/Xenova/ms-marco-MiniLM-L-6-v2/resolve/a09144355adeed5f58c8ed011d209bf8ee5a1fec/onnx/model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/ms-marco-MiniLM-L-6-v2",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/bge-reranker-base",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/bge-reranker-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/BAAI/bge-reranker-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
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
            "id": "bge-reranker-base-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 279301077,
            "revision": "280bcc27a84e0b898c251e06fddb25171bd9b101",
            "artifactUrl": "https://huggingface.co/Xenova/bge-reranker-base/resolve/280bcc27a84e0b898c251e06fddb25171bd9b101/onnx/model_quantized.onnx"
          },
          {
            "id": "bge-reranker-base-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 434321936,
            "revision": "280bcc27a84e0b898c251e06fddb25171bd9b101",
            "artifactUrl": "https://huggingface.co/Xenova/bge-reranker-base/resolve/280bcc27a84e0b898c251e06fddb25171bd9b101/onnx/model_q4f16.onnx"
          },
          {
            "id": "bge-reranker-base-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 556462150,
            "revision": "280bcc27a84e0b898c251e06fddb25171bd9b101",
            "artifactUrl": "https://huggingface.co/Xenova/bge-reranker-base/resolve/280bcc27a84e0b898c251e06fddb25171bd9b101/onnx/model_fp16.onnx"
          },
          {
            "id": "bge-reranker-base-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 1112459588,
            "revision": "280bcc27a84e0b898c251e06fddb25171bd9b101",
            "artifactUrl": "https://huggingface.co/Xenova/bge-reranker-base/resolve/280bcc27a84e0b898c251e06fddb25171bd9b101/onnx/model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/bge-reranker-base",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "mit"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "identityUnresolved": true,
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
      }
    ],
    "semantic-search": [
      {
        "id": "hnswlib-wasm",
        "nameKey": "models.hnswlib-wasm.name",
        "descriptionKey": "models.hnswlib-wasm.description",
        "name": "hnswlib.js",
        "framework": "wasm",
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
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/hnswlib-wasm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "hnswlib-wasm@0.8.2",
        "npmPackage": "hnswlib-wasm"
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
        "framework": "native",
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@lancedb/lancedb",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@lancedb/lancedb@0.39.0",
        "npmPackage": "@lancedb/lancedb"
      },
      {
        "id": "vectra-wasm",
        "nameKey": "models.vectra-wasm.name",
        "descriptionKey": "models.vectra-wasm.description",
        "name": "Vectra (WASM)",
        "framework": "wasm",
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/vectra",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "mit",
        "runtimeVersion": "vectra@0.15.0",
        "npmPackage": "vectra"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "other",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "other",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
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
          "status": "upstream-example",
          "url": "https://mediapipe-studio.webapps.google.com/demo/object_detector",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/tasks-vision",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/object_detector",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
            "artifactUrl": "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite",
            "downloadBytes": 7254339
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/tasks-vision@1.0.1",
        "npmPackage": "@mediapipe/tasks-vision",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/object_detector"
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
          },
          {
            "url": "https://github.com/tensorflow/tfjs",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@tensorflow-models/coco-ssd",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@tensorflow-models/coco-ssd@2.2.3",
        "npmPackage": "@tensorflow-models/coco-ssd"
      },
      {
        "id": "rtdetr-v2-r18",
        "nameKey": "models.rtdetr-v2-r18.name",
        "descriptionKey": "models.rtdetr-v2-r18.description",
        "name": "RT-DETR v2 R18",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/onnx-community/rtdetr_v2_r18vd-ONNX",
        "kind": "model",
        "tasks": [
          "detection"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/onnx-community/rtdetr_v2_r18vd-ONNX",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://huggingface.co/onnx-community/rtdetr_v2_r18vd-ONNX",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "COCO-80",
          "No NMS post-processing"
        ],
        "variants": [
          {
            "id": "rtdetr-v2-r18-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 20991219,
            "revision": "936f90b6a476c6da4dfe053fc521af55285976ba",
            "artifactUrl": "https://huggingface.co/onnx-community/rtdetr_v2_r18vd-ONNX/resolve/936f90b6a476c6da4dfe053fc521af55285976ba/onnx/model_quantized.onnx"
          },
          {
            "id": "rtdetr-v2-r18-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 34200081,
            "revision": "936f90b6a476c6da4dfe053fc521af55285976ba",
            "artifactUrl": "https://huggingface.co/onnx-community/rtdetr_v2_r18vd-ONNX/resolve/936f90b6a476c6da4dfe053fc521af55285976ba/onnx/model_q4f16.onnx"
          },
          {
            "id": "rtdetr-v2-r18-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 40750249,
            "revision": "936f90b6a476c6da4dfe053fc521af55285976ba",
            "artifactUrl": "https://huggingface.co/onnx-community/rtdetr_v2_r18vd-ONNX/resolve/936f90b6a476c6da4dfe053fc521af55285976ba/onnx/model_fp16.onnx"
          },
          {
            "id": "rtdetr-v2-r18-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 81057510,
            "revision": "936f90b6a476c6da4dfe053fc521af55285976ba",
            "artifactUrl": "https://huggingface.co/onnx-community/rtdetr_v2_r18vd-ONNX/resolve/936f90b6a476c6da4dfe053fc521af55285976ba/onnx/model.onnx"
          }
        ],
        "modelId": "onnx-community/rtdetr_v2_r18vd-ONNX",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
      },
      {
        "id": "yolov10n",
        "nameKey": "models.yolov10n.name",
        "descriptionKey": "models.yolov10n.description",
        "name": "YOLOv10n",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/onnx-community/yolov10n",
        "kind": "model",
        "tasks": [
          "detection"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/onnx-community/yolov10n",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://huggingface.co/onnx-community/yolov10n",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "COCO-80",
          "No NMS post-processing"
        ],
        "variants": [
          {
            "id": "yolov10n-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 2650737,
            "revision": "57657320425ee34056408a57ad9d29c4d4815bd8",
            "artifactUrl": "https://huggingface.co/onnx-community/yolov10n/resolve/57657320425ee34056408a57ad9d29c4d4815bd8/onnx/model_quantized.onnx"
          },
          {
            "id": "yolov10n-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 4739018,
            "revision": "57657320425ee34056408a57ad9d29c4d4815bd8",
            "artifactUrl": "https://huggingface.co/onnx-community/yolov10n/resolve/57657320425ee34056408a57ad9d29c4d4815bd8/onnx/model_fp16.onnx"
          },
          {
            "id": "yolov10n-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 9386116,
            "revision": "57657320425ee34056408a57ad9d29c4d4815bd8",
            "artifactUrl": "https://huggingface.co/onnx-community/yolov10n/resolve/57657320425ee34056408a57ad9d29c4d4815bd8/onnx/model.onnx"
          }
        ],
        "modelId": "onnx-community/yolov10n",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "agpl-3-0"
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
          "url": "https://toolgarden.xyz/en/image/remove-bg?mode=fast",
          "reviewedAt": "2026-10-05"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@imgly/background-removal",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://toolgarden.xyz/en/image/remove-bg?mode=fast",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
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
        "codeLicense": "custom",
        "runtimeVersion": "@imgly/background-removal@1.7.0",
        "backends": [
          "WASM",
          "WebGPU"
        ],
        "npmPackage": "@imgly/background-removal"
      },
      {
        "id": "birefnet-lite-512",
        "nameKey": "models.birefnet-lite-512.name",
        "descriptionKey": "models.birefnet-lite-512.description",
        "name": "BiRefNet-lite 512",
        "framework": "transformersjs",
        "description": "Legacy HD demo entry: its name, BiRefNet description and RMBG-1.4 reference disagree. Model identity, weights, size and license are unresolved; do not use it as a verified model comparison.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/image/remove-bg?mode=hd",
        "kind": "model",
        "tasks": [
          "segmentation"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/image/remove-bg?mode=hd",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/briaai/RMBG-1.4",
            "kind": "conflicting-reference",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://toolgarden.xyz/en/image/remove-bg?mode=hd",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/studioludens/birefnet-lite-512",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "512x512 input",
          "Requires WebGPU fp16"
        ],
        "variants": [
          {
            "id": "birefnet-lite-512-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 98484532,
            "revision": "4a3c40c36c94093cc1e724d9ea428b8fa4b57dc7",
            "artifactUrl": "https://huggingface.co/studioludens/birefnet-lite-512/resolve/4a3c40c36c94093cc1e724d9ea428b8fa4b57dc7/onnx/model_fp16.onnx"
          },
          {
            "id": "birefnet-lite-512-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 191877254,
            "revision": "4a3c40c36c94093cc1e724d9ea428b8fa4b57dc7",
            "artifactUrl": "https://huggingface.co/studioludens/birefnet-lite-512/resolve/4a3c40c36c94093cc1e724d9ea428b8fa4b57dc7/onnx/model.onnx"
          }
        ],
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "modelId": "studioludens/birefnet-lite-512",
        "docsUrl": "https://huggingface.co/studioludens/birefnet-lite-512",
        "backends": [
          "webgpu"
        ],
        "weightLicense": "mit"
      },
      {
        "id": "sam-tiny",
        "nameKey": "models.sam-tiny.name",
        "descriptionKey": "models.sam-tiny.description",
        "name": "SAM Tiny (ONNX)",
        "framework": "transformersjs",
        "description": "Segment Anything Model — quantized mobile variant for the browser.",
        "docsUrl": "https://huggingface.co/Xenova/slimsam-77-uniform",
        "kind": "model",
        "tasks": [
          "segmentation"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/slimsam-77-uniform",
          "reviewedAt": "2026-10-05"
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
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/spaces/Xenova/segment-anything-web",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Promptable Segmentation"
        ],
        "variants": [
          {
            "id": "sam-tiny-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 13785975,
            "revision": "5850ab45f587c112167512ffef949107115e26a0",
            "artifactUrl": "https://huggingface.co/Xenova/slimsam-77-uniform/resolve/5850ab45f587c112167512ffef949107115e26a0/onnx/prompt_encoder_mask_decoder_quantized.onnx"
          },
          {
            "id": "sam-tiny-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 20720775,
            "revision": "5850ab45f587c112167512ffef949107115e26a0",
            "artifactUrl": "https://huggingface.co/Xenova/slimsam-77-uniform/resolve/5850ab45f587c112167512ffef949107115e26a0/onnx/prompt_encoder_mask_decoder_fp16.onnx"
          },
          {
            "id": "sam-tiny-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 39833906,
            "revision": "5850ab45f587c112167512ffef949107115e26a0",
            "artifactUrl": "https://huggingface.co/Xenova/slimsam-77-uniform/resolve/5850ab45f587c112167512ffef949107115e26a0/onnx/prompt_encoder_mask_decoder.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "modelId": "Xenova/slimsam-77-uniform",
        "weightLicense": "apache-2-0",
        "demoUrl": "https://huggingface.co/spaces/Xenova/segment-anything-web"
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
          "status": "upstream-example",
          "url": "https://mediapipe-studio.webapps.google.com/demo/image_segmenter",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/selfie_segmentation",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/image_segmenter",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
            "artifactUrl": "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/1/selfie_segmenter.tflite",
            "downloadBytes": 249537
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/selfie_segmentation@0.1.1675465747",
        "npmPackage": "@mediapipe/selfie_segmentation",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/image_segmenter"
      },
      {
        "id": "rmbg-1-4",
        "nameKey": "models.rmbg-1-4.name",
        "descriptionKey": "models.rmbg-1-4.description",
        "name": "RMBG-1.4",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/briaai/RMBG-1.4",
        "kind": "model",
        "tasks": [
          "segmentation"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/briaai/RMBG-1.4",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://huggingface.co/briaai/RMBG-1.4",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/spaces/Xenova/remove-background-web",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Alpha matte output",
          "General subjects"
        ],
        "variants": [
          {
            "id": "rmbg-1-4-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 44403226,
            "revision": "2ceba5a5efaec153162aedea169f76caf9b46cf8",
            "artifactUrl": "https://huggingface.co/briaai/RMBG-1.4/resolve/2ceba5a5efaec153162aedea169f76caf9b46cf8/onnx/model_quantized.onnx"
          },
          {
            "id": "rmbg-1-4-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 88217533,
            "revision": "2ceba5a5efaec153162aedea169f76caf9b46cf8",
            "artifactUrl": "https://huggingface.co/briaai/RMBG-1.4/resolve/2ceba5a5efaec153162aedea169f76caf9b46cf8/onnx/model_fp16.onnx"
          },
          {
            "id": "rmbg-1-4-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 176153355,
            "revision": "2ceba5a5efaec153162aedea169f76caf9b46cf8",
            "artifactUrl": "https://huggingface.co/briaai/RMBG-1.4/resolve/2ceba5a5efaec153162aedea169f76caf9b46cf8/onnx/model.onnx"
          }
        ],
        "modelId": "briaai/RMBG-1.4",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "other",
        "demoUrl": "https://huggingface.co/spaces/Xenova/remove-background-web"
      },
      {
        "id": "modnet",
        "nameKey": "models.modnet.name",
        "descriptionKey": "models.modnet.description",
        "name": "MODNet",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/Xenova/modnet",
        "kind": "model",
        "tasks": [
          "segmentation"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/modnet",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/modnet",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/spaces/Xenova/webgpu-video-background-removal",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Portrait matting",
          "Trimap-free"
        ],
        "variants": [
          {
            "id": "modnet-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 6632188,
            "revision": "fa2fa546052fba4c08921230a26cc69a333fca12",
            "artifactUrl": "https://huggingface.co/Xenova/modnet/resolve/fa2fa546052fba4c08921230a26cc69a333fca12/onnx/model_quantized.onnx"
          },
          {
            "id": "modnet-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 11801931,
            "revision": "fa2fa546052fba4c08921230a26cc69a333fca12",
            "artifactUrl": "https://huggingface.co/Xenova/modnet/resolve/fa2fa546052fba4c08921230a26cc69a333fca12/onnx/model_q4f16.onnx"
          },
          {
            "id": "modnet-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 12984781,
            "revision": "fa2fa546052fba4c08921230a26cc69a333fca12",
            "artifactUrl": "https://huggingface.co/Xenova/modnet/resolve/fa2fa546052fba4c08921230a26cc69a333fca12/onnx/model_fp16.onnx"
          },
          {
            "id": "modnet-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 25888640,
            "revision": "fa2fa546052fba4c08921230a26cc69a333fca12",
            "artifactUrl": "https://huggingface.co/Xenova/modnet/resolve/fa2fa546052fba4c08921230a26cc69a333fca12/onnx/model.onnx"
          }
        ],
        "modelId": "Xenova/modnet",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0",
        "demoUrl": "https://huggingface.co/spaces/Xenova/webgpu-video-background-removal"
      },
      {
        "id": "u2netp",
        "nameKey": "models.u2netp.name",
        "descriptionKey": "models.u2netp.description",
        "name": "U²-Netp",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/BritishWerewolf/U-2-Netp",
        "kind": "model",
        "tasks": [
          "segmentation"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/BritishWerewolf/U-2-Netp",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://huggingface.co/BritishWerewolf/U-2-Netp",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Salient object detection",
          "4.4 MB"
        ],
        "variants": [
          {
            "id": "u2netp-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 4574861,
            "revision": "7112208dbac3a3642496c8d54e2f0f9bb3dc1dc8",
            "artifactUrl": "https://huggingface.co/BritishWerewolf/U-2-Netp/resolve/7112208dbac3a3642496c8d54e2f0f9bb3dc1dc8/onnx/model.onnx"
          }
        ],
        "modelId": "BritishWerewolf/U-2-Netp",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
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
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/tesseract.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "codeLicense": "apache-2-0",
        "runtimeVersion": "tesseract.js@7.0.0",
        "npmPackage": "tesseract.js"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
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
        "docsUrl": "https://github.com/PaddlePaddle/PaddleOCR",
        "kind": "model",
        "tasks": [
          "ocr"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/image/ocr",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://www.npmjs.com/package/@paddleocr/paddleocr-js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/PaddlePaddle/PaddleOCR",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://toolgarden.xyz/en/image/ocr",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          }
        ],
        "naturalLanguages": [
          "80+ languages"
        ],
        "programmingLanguages": [],
        "capabilities": [
          "Text detection",
          "Text recognition",
          "Chinese",
          "English"
        ],
        "variants": [
          {
            "id": "ppocrv5-mobile-det",
            "label": "detection",
            "downloadBytes": 4843520,
            "artifactUrl": "https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-OCRv5_mobile_det_onnx_infer.tar"
          },
          {
            "id": "ppocrv5-mobile-rec",
            "label": "recognition",
            "downloadBytes": 16701440,
            "artifactUrl": "https://paddle-model-ecology.bj.bcebos.com/paddlex/official_inference_model/paddle3.0.0/PP-OCRv5_mobile_rec_onnx_infer.tar"
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@paddleocr/paddleocr-js@0.4.2",
        "npmPackage": "@paddleocr/paddleocr-js",
        "weightLicense": "apache-2-0",
        "backends": [
          "wasm"
        ]
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/tasks-text",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "identityUnresolved": true,
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/tasks-text@1.0.1",
        "npmPackage": "@mediapipe/tasks-text"
      }
    ],
    "depth": [
      {
        "id": "midas-small",
        "nameKey": "models.midas-small.name",
        "descriptionKey": "models.midas-small.description",
        "name": "MiDaS v2 Small",
        "framework": "transformersjs",
        "description": "Robust monocular depth estimation for the browser.",
        "docsUrl": "https://huggingface.co/Xenova/dpt-hybrid-midas",
        "kind": "model",
        "tasks": [
          "depth"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/dpt-hybrid-midas",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://github.com/isl-org/MiDaS",
            "kind": "documentation"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/Intel/dpt-hybrid-midas",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/Xenova/dpt-hybrid-midas",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Monocular Depth"
        ],
        "variants": [
          {
            "id": "midas-small-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 118219625,
            "revision": "8af5a62e326ba3e842759aa27e13008c1c758db5",
            "artifactUrl": "https://huggingface.co/Xenova/dpt-hybrid-midas/resolve/8af5a62e326ba3e842759aa27e13008c1c758db5/onnx/model_q4f16.onnx"
          },
          {
            "id": "midas-small-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 207787230,
            "revision": "8af5a62e326ba3e842759aa27e13008c1c758db5",
            "artifactUrl": "https://huggingface.co/Xenova/dpt-hybrid-midas/resolve/8af5a62e326ba3e842759aa27e13008c1c758db5/onnx/model_quantized.onnx"
          },
          {
            "id": "midas-small-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 267099007,
            "revision": "8af5a62e326ba3e842759aa27e13008c1c758db5",
            "artifactUrl": "https://huggingface.co/Xenova/dpt-hybrid-midas/resolve/8af5a62e326ba3e842759aa27e13008c1c758db5/onnx/model_fp16.onnx"
          },
          {
            "id": "midas-small-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 533061339,
            "revision": "8af5a62e326ba3e842759aa27e13008c1c758db5",
            "artifactUrl": "https://huggingface.co/Xenova/dpt-hybrid-midas/resolve/8af5a62e326ba3e842759aa27e13008c1c758db5/onnx/model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "modelId": "Xenova/dpt-hybrid-midas",
        "weightLicense": "apache-2-0"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/onnx-community/depth-anything-v2-small",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/onnx-community/depth-anything-v2-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/spaces/Xenova/webgpu-realtime-depth-estimation",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Monocular Depth"
        ],
        "variants": [
          {
            "id": "depth-anything-small-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 19126267,
            "revision": "4472b7362082ad9968fee890ca0f1e5aca36b93d",
            "artifactUrl": "https://huggingface.co/onnx-community/depth-anything-v2-small/resolve/4472b7362082ad9968fee890ca0f1e5aca36b93d/onnx/model_q4f16.onnx"
          },
          {
            "id": "depth-anything-small-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 27258801,
            "revision": "4472b7362082ad9968fee890ca0f1e5aca36b93d",
            "artifactUrl": "https://huggingface.co/onnx-community/depth-anything-v2-small/resolve/4472b7362082ad9968fee890ca0f1e5aca36b93d/onnx/model_quantized.onnx"
          },
          {
            "id": "depth-anything-small-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 49642442,
            "revision": "4472b7362082ad9968fee890ca0f1e5aca36b93d",
            "artifactUrl": "https://huggingface.co/onnx-community/depth-anything-v2-small/resolve/4472b7362082ad9968fee890ca0f1e5aca36b93d/onnx/model_fp16.onnx"
          },
          {
            "id": "depth-anything-small-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 99060839,
            "revision": "4472b7362082ad9968fee890ca0f1e5aca36b93d",
            "artifactUrl": "https://huggingface.co/onnx-community/depth-anything-v2-small/resolve/4472b7362082ad9968fee890ca0f1e5aca36b93d/onnx/model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "onnx-community/depth-anything-v2-small",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0",
        "demoUrl": "https://huggingface.co/spaces/Xenova/webgpu-realtime-depth-estimation"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/objectron",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/objectron@0.4.1675468480",
        "identityUnresolved": true,
        "npmPackage": "@mediapipe/objectron"
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
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/image/enhance",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://github.com/xinntao/Real-ESRGAN",
            "kind": "documentation"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/xinntao/Real-ESRGAN/releases/tag/v0.1.0",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://toolgarden.xyz/en/image/enhance",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "4x upscale",
          "ONNX opset 17",
          "128px tiling"
        ],
        "variants": [
          {
            "id": "realesrgan-x4plus-fp16",
            "label": "x4plus fp16",
            "quantization": "fp16",
            "downloadBytes": 33756472
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0",
        "weightLicense": "bsd-3",
        "backends": [
          "wasm"
        ],
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/image/enhance"
      },
      {
        "id": "swinir",
        "nameKey": "models.swinir.name",
        "descriptionKey": "models.swinir.description",
        "name": "Swin2SR (real-world x4)",
        "framework": "transformersjs",
        "description": "SwinIR — transformer-based image restoration (super-resolution, denoising, JPEG deblocking).",
        "docsUrl": "https://huggingface.co/Xenova/swin2SR-realworld-sr-x4-64-bsrgan-psnr",
        "kind": "model",
        "tasks": [
          "image-restoration"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/swin2SR-realworld-sr-x4-64-bsrgan-psnr",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://github.com/JingyunLiang/SwinIR",
            "kind": "documentation"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://huggingface.co/Xenova/swin2SR-realworld-sr-x4-64-bsrgan-psnr",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/caidas/swin2SR-realworld-sr-x4-64-bsrgan-psnr",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "4x upscale",
          "Real-world degradation"
        ],
        "variants": [
          {
            "id": "swinir-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 15541345,
            "revision": "d0e9926970c93e472ce2392373d72597fc849027",
            "artifactUrl": "https://huggingface.co/Xenova/swin2SR-realworld-sr-x4-64-bsrgan-psnr/resolve/d0e9926970c93e472ce2392373d72597fc849027/onnx/model_q4f16.onnx"
          },
          {
            "id": "swinir-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 21438622,
            "revision": "d0e9926970c93e472ce2392373d72597fc849027",
            "artifactUrl": "https://huggingface.co/Xenova/swin2SR-realworld-sr-x4-64-bsrgan-psnr/resolve/d0e9926970c93e472ce2392373d72597fc849027/onnx/model_quantized.onnx"
          },
          {
            "id": "swinir-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 32357522,
            "revision": "d0e9926970c93e472ce2392373d72597fc849027",
            "artifactUrl": "https://huggingface.co/Xenova/swin2SR-realworld-sr-x4-64-bsrgan-psnr/resolve/d0e9926970c93e472ce2392373d72597fc849027/onnx/model_fp16.onnx"
          },
          {
            "id": "swinir-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 52772645,
            "revision": "d0e9926970c93e472ce2392373d72597fc849027",
            "artifactUrl": "https://huggingface.co/Xenova/swin2SR-realworld-sr-x4-64-bsrgan-psnr/resolve/d0e9926970c93e472ce2392373d72597fc849027/onnx/model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "modelId": "Xenova/swin2SR-realworld-sr-x4-64-bsrgan-psnr",
        "weightLicense": "apache-2-0"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "mit",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
      },
      {
        "id": "esrgan-slim",
        "nameKey": "models.esrgan-slim.name",
        "descriptionKey": "models.esrgan-slim.description",
        "name": "ESRGAN Slim (UpscalerJS)",
        "framework": "tensorflowjs",
        "description": "",
        "docsUrl": "https://github.com/thekevinscott/UpscalerJS/tree/main/models/esrgan-slim",
        "kind": "model",
        "tasks": [
          "image-restoration"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/image/upscale?mode=hd",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://github.com/thekevinscott/UpscalerJS/tree/main/models/esrgan-slim",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://toolgarden.xyz/en/image/upscale?mode=hd",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://github.com/tensorflow/tfjs",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@upscalerjs/esrgan-slim",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "2x upscale",
          "4x upscale",
          "Graph model"
        ],
        "variants": [
          {
            "id": "esrgan-slim-x2",
            "label": "x2",
            "downloadBytes": 900636
          },
          {
            "id": "esrgan-slim-x4",
            "label": "x4",
            "downloadBytes": 946140
          }
        ],
        "npmPackage": "@upscalerjs/esrgan-slim",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/image/upscale?mode=hd",
        "runtimeVersion": "@upscalerjs/esrgan-slim@1.0.0",
        "codeLicense": "mit"
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
          },
          {
            "url": "https://github.com/tensorflow/tfjs",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@tensorflow-models/mobilenet",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://storage.googleapis.com/tfjs-models/demos/mobilenet/index.html",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
        "docsUrl": "https://github.com/tensorflow/tfjs-models/tree/master/mobilenet",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@tensorflow-models/mobilenet@2.1.1",
        "npmPackage": "@tensorflow-models/mobilenet",
        "demoUrl": "https://storage.googleapis.com/tfjs-models/demos/mobilenet/index.html"
      },
      {
        "id": "vit-base-224",
        "nameKey": "models.vit-base-224.name",
        "descriptionKey": "models.vit-base-224.description",
        "name": "vit-base-224",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/Xenova/vit-base-patch16-224",
        "kind": "model",
        "tasks": [
          "image-classification"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/vit-base-patch16-224",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/vit-base-patch16-224",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/google/vit-base-patch16-224",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "ImageNet-1k"
        ],
        "variants": [
          {
            "id": "vit-base-224-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 51248686,
            "revision": "66fef688e8dbe77dd9d5aa256353f9ad8b0ef799",
            "artifactUrl": "https://huggingface.co/Xenova/vit-base-patch16-224/resolve/66fef688e8dbe77dd9d5aa256353f9ad8b0ef799/onnx/model_q4f16.onnx"
          },
          {
            "id": "vit-base-224-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 88257413,
            "revision": "66fef688e8dbe77dd9d5aa256353f9ad8b0ef799",
            "artifactUrl": "https://huggingface.co/Xenova/vit-base-patch16-224/resolve/66fef688e8dbe77dd9d5aa256353f9ad8b0ef799/onnx/model_quantized.onnx"
          },
          {
            "id": "vit-base-224-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 173484848,
            "revision": "66fef688e8dbe77dd9d5aa256353f9ad8b0ef799",
            "artifactUrl": "https://huggingface.co/Xenova/vit-base-patch16-224/resolve/66fef688e8dbe77dd9d5aa256353f9ad8b0ef799/onnx/model_fp16.onnx"
          },
          {
            "id": "vit-base-224-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 346533752,
            "revision": "66fef688e8dbe77dd9d5aa256353f9ad8b0ef799",
            "artifactUrl": "https://huggingface.co/Xenova/vit-base-patch16-224/resolve/66fef688e8dbe77dd9d5aa256353f9ad8b0ef799/onnx/model.onnx"
          }
        ],
        "modelId": "Xenova/vit-base-patch16-224",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
      },
      {
        "id": "resnet-50",
        "nameKey": "models.resnet-50.name",
        "descriptionKey": "models.resnet-50.description",
        "name": "resnet-50",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/Xenova/resnet-50",
        "kind": "model",
        "tasks": [
          "image-classification"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/resnet-50",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/resnet-50",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/microsoft/resnet-50",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "ImageNet-1k"
        ],
        "variants": [
          {
            "id": "resnet-50-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 25787876,
            "revision": "a16f29143f08c4e5c5a4a89f6f185d8edac4b6af",
            "artifactUrl": "https://huggingface.co/Xenova/resnet-50/resolve/a16f29143f08c4e5c5a4a89f6f185d8edac4b6af/onnx/model_quantized.onnx"
          },
          {
            "id": "resnet-50-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 51111653,
            "revision": "a16f29143f08c4e5c5a4a89f6f185d8edac4b6af",
            "artifactUrl": "https://huggingface.co/Xenova/resnet-50/resolve/a16f29143f08c4e5c5a4a89f6f185d8edac4b6af/onnx/model_fp16.onnx"
          },
          {
            "id": "resnet-50-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 51121285,
            "revision": "a16f29143f08c4e5c5a4a89f6f185d8edac4b6af",
            "artifactUrl": "https://huggingface.co/Xenova/resnet-50/resolve/a16f29143f08c4e5c5a4a89f6f185d8edac4b6af/onnx/model_q4f16.onnx"
          },
          {
            "id": "resnet-50-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 102157946,
            "revision": "a16f29143f08c4e5c5a4a89f6f185d8edac4b6af",
            "artifactUrl": "https://huggingface.co/Xenova/resnet-50/resolve/a16f29143f08c4e5c5a4a89f6f185d8edac4b6af/onnx/model.onnx"
          }
        ],
        "modelId": "Xenova/resnet-50",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
      },
      {
        "id": "mobilevit-small",
        "nameKey": "models.mobilevit-small.name",
        "descriptionKey": "models.mobilevit-small.description",
        "name": "mobilevit-small",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/Xenova/mobilevit-small",
        "kind": "model",
        "tasks": [
          "image-classification"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/mobilevit-small",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/mobilevit-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/apple/mobilevit-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "ImageNet-1k"
        ],
        "variants": [
          {
            "id": "mobilevit-small-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 6303767,
            "revision": "a0e5dde3e1b3d9e49894dcaeeb1e046ed01edfc8",
            "artifactUrl": "https://huggingface.co/Xenova/mobilevit-small/resolve/a0e5dde3e1b3d9e49894dcaeeb1e046ed01edfc8/onnx/model_quantized.onnx"
          },
          {
            "id": "mobilevit-small-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 7289715,
            "revision": "a0e5dde3e1b3d9e49894dcaeeb1e046ed01edfc8",
            "artifactUrl": "https://huggingface.co/Xenova/mobilevit-small/resolve/a0e5dde3e1b3d9e49894dcaeeb1e046ed01edfc8/onnx/model_q4f16.onnx"
          },
          {
            "id": "mobilevit-small-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 11560403,
            "revision": "a0e5dde3e1b3d9e49894dcaeeb1e046ed01edfc8",
            "artifactUrl": "https://huggingface.co/Xenova/mobilevit-small/resolve/a0e5dde3e1b3d9e49894dcaeeb1e046ed01edfc8/onnx/model_fp16.onnx"
          },
          {
            "id": "mobilevit-small-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 22604607,
            "revision": "a0e5dde3e1b3d9e49894dcaeeb1e046ed01edfc8",
            "artifactUrl": "https://huggingface.co/Xenova/mobilevit-small/resolve/a0e5dde3e1b3d9e49894dcaeeb1e046ed01edfc8/onnx/model.onnx"
          }
        ],
        "modelId": "Xenova/mobilevit-small",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "other"
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
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Text-to-Image"
        ],
        "variants": [
          {
            "id": "sdxl-turbo-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 13884284743,
            "revision": "71153311d3dbb46851df1931d3ca6e939de83304",
            "artifactUrl": "https://huggingface.co/stabilityai/sdxl-turbo/resolve/71153311d3dbb46851df1931d3ca6e939de83304/text_encoder/model.onnx"
          }
        ],
        "reportedLicense": "openrail",
        "modelId": "stabilityai/sdxl-turbo",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0",
        "weightLicense": "other"
      },
      {
        "id": "sd-turbo",
        "nameKey": "models.sd-turbo.name",
        "descriptionKey": "models.sd-turbo.description",
        "name": "SD-Turbo",
        "framework": "onnxruntime-web",
        "description": "Smaller distilled Stable Diffusion variant.",
        "docsUrl": "https://huggingface.co/onnxruntime/sd-turbo",
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/onnxruntime/sd-turbo",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Text-to-Image"
        ],
        "variants": [
          {
            "id": "sd-turbo-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 2580750177,
            "revision": "80d4d2e238a7c61a83053b931f2354ab43dd3688",
            "artifactUrl": "https://huggingface.co/onnxruntime/sd-turbo/resolve/80d4d2e238a7c61a83053b931f2354ab43dd3688/text_encoder/model.onnx"
          }
        ],
        "reportedLicense": "openrail",
        "modelId": "onnxruntime/sd-turbo",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0",
        "weightLicense": "other"
      },
      {
        "id": "flux-schnell",
        "nameKey": "models.flux-schnell.name",
        "descriptionKey": "models.flux-schnell.description",
        "name": "FLUX.1 Schnell (WebGPU)",
        "framework": "python",
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
            "reviewedAt": "2026-10-06"
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
        "modelId": "black-forest-labs/FLUX.1-schnell",
        "weightLicense": "apache-2-0"
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
        "demoPath": "/image/remove-watermark?mode=balanced",
        "docsUrl": "https://huggingface.co/andraniksargsyan/migan",
        "kind": "model",
        "tasks": [
          "inpainting"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/image/remove-watermark?mode=balanced",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://github.com/Picsart-AI-Research/MI-GAN",
            "kind": "documentation"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/andraniksargsyan/migan",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://toolgarden.xyz/en/image/remove-watermark?mode=balanced",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Watermark Removal"
        ],
        "variants": [
          {
            "id": "migan-pipeline-v2",
            "label": "pipeline-v2",
            "revision": "406830d0",
            "artifactUrl": "https://huggingface.co/andraniksargsyan/migan/resolve/main/migan_pipeline_v2.onnx",
            "downloadBytes": 28079181
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0",
        "weightLicense": "mit",
        "backends": [
          "wasm"
        ]
      },
      {
        "id": "lama-watermark",
        "nameKey": "models.lama-watermark.name",
        "descriptionKey": "models.lama-watermark.description",
        "name": "LaMa Watermark Removal (FP32)",
        "framework": "onnxruntime-web",
        "description": "LaMa inpainting FP32 ONNX (~208 MB) for high-quality balanced / HD watermark removal.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/image/remove-watermark?mode=hd",
        "docsUrl": "https://huggingface.co/Carve/LaMa-ONNX",
        "kind": "model",
        "tasks": [
          "inpainting"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/image/remove-watermark?mode=hd",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://github.com/advimman/lama",
            "kind": "documentation"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/Carve/LaMa-ONNX",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://toolgarden.xyz/en/image/remove-watermark?mode=hd",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Watermark Removal"
        ],
        "variants": [
          {
            "id": "lama-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "revision": "c3c0c9e4",
            "artifactUrl": "https://huggingface.co/Carve/LaMa-ONNX/resolve/main/lama_fp32.onnx",
            "downloadBytes": 208044816
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0",
        "weightLicense": "apache-2-0",
        "backends": [
          "wasm"
        ]
      },
      {
        "id": "sdxl-inpaint",
        "nameKey": "models.sdxl-inpaint.name",
        "descriptionKey": "models.sdxl-inpaint.description",
        "name": "SDXL Inpaint",
        "framework": "python",
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
            "reviewedAt": "2026-10-06"
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
        "modelId": "diffusers/stable-diffusion-xl-1.0-inpainting-0.1",
        "weightLicense": "openrail"
      }
    ]
  },
  "audio": {
    "asr": [
      {
        "id": "whistle",
        "nameKey": "models.whistle.name",
        "descriptionKey": "models.whistle.description",
        "name": "Whistle (Cactus Compute)",
        "framework": "wasm",
        "description": "Cactus Compute's compact speech recognition model with a 16.9 MB quantized .cact file, running locally in the browser through the Needle WebAssembly engine. Supports seven European languages, 16 kHz mono audio up to 30 seconds per pass, word timestamps and keyword biasing.",
        "docsUrl": "https://huggingface.co/Cactus-Compute/whistle",
        "demoUrl": "https://www.cactuscompute.com/blog/whistle",
        "kind": "model",
        "modelId": "Cactus-Compute/whistle",
        "tasks": [
          "asr"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://www.cactuscompute.com/blog/whistle",
          "reviewedAt": "2026-10-09"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Cactus-Compute/whistle",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-09"
          },
          {
            "url": "https://www.cactuscompute.com/blog/whistle",
            "kind": "browser-example",
            "reviewedAt": "2026-10-09"
          },
          {
            "url": "https://github.com/cactus-compute/needle",
            "kind": "documentation",
            "reviewedAt": "2026-10-09"
          },
          {
            "url": "https://github.com/cactus-compute/needle/blob/main/LICENSE",
            "kind": "documentation",
            "reviewedAt": "2026-10-09"
          }
        ],
        "naturalLanguages": [
          "English",
          "German",
          "French",
          "Spanish",
          "Italian",
          "Dutch",
          "Polish"
        ],
        "programmingLanguages": [],
        "capabilities": [
          "16 kHz mono audio",
          "Up to 30 seconds per pass",
          "Word timestamps",
          "Keyword biasing",
          "Speech embeddings",
          "Language detection"
        ],
        "variants": [
          {
            "id": "whistle-cact",
            "label": "Cactus Quants (.cact)",
            "quantization": "2–4 bit",
            "downloadBytes": 16919407,
            "revision": "b358ddadd89b7a713b5aa131f23032d3cca1b251",
            "artifactUrl": "https://huggingface.co/Cactus-Compute/whistle/resolve/b358ddadd89b7a713b5aa131f23032d3cca1b251/whistle.cact"
          }
        ],
        "backends": [
          "wasm"
        ],
        "codeLicense": "apache-2-0",
        "weightLicense": "apache-2-0"
      },
      {
        "id": "whisper-small",
        "nameKey": "models.whisper-small.name",
        "descriptionKey": "models.whisper-small.description",
        "name": "Whisper Small (Transformers.js)",
        "framework": "transformersjs",
        "description": "Xenova/whisper-small via Transformers.js — high-precision default; quantized encoder + merged decoder ONNX.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/audio/to-text?mode=accurate",
        "docsUrl": "https://huggingface.co/Xenova/whisper-small",
        "kind": "model",
        "tasks": [
          "asr"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/audio/to-text?mode=accurate",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/whisper-small",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://toolgarden.xyz/en/audio/to-text?mode=accurate",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          }
        ],
        "naturalLanguages": [
          "99 languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "whisper-small-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 200224406,
            "revision": "2d67713f236afa48a18992566e7647f6ca848e13",
            "artifactUrl": "https://huggingface.co/Xenova/whisper-small/resolve/2d67713f236afa48a18992566e7647f6ca848e13/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "whisper-small-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 249105759,
            "revision": "2d67713f236afa48a18992566e7647f6ca848e13",
            "artifactUrl": "https://huggingface.co/Xenova/whisper-small/resolve/2d67713f236afa48a18992566e7647f6ca848e13/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "whisper-small-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 485223415,
            "revision": "2d67713f236afa48a18992566e7647f6ca848e13",
            "artifactUrl": "https://huggingface.co/Xenova/whisper-small/resolve/2d67713f236afa48a18992566e7647f6ca848e13/onnx/decoder_model_fp16.onnx"
          },
          {
            "id": "whisper-small-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 968244601,
            "revision": "2d67713f236afa48a18992566e7647f6ca848e13",
            "artifactUrl": "https://huggingface.co/Xenova/whisper-small/resolve/2d67713f236afa48a18992566e7647f6ca848e13/onnx/decoder_model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "modelId": "Xenova/whisper-small",
        "weightLicense": "apache-2-0"
      },
      {
        "id": "whisper-base",
        "nameKey": "models.whisper-base.name",
        "descriptionKey": "models.whisper-base.description",
        "name": "Whisper Base (Transformers.js)",
        "framework": "transformersjs",
        "description": "Xenova/whisper-base via Transformers.js — balanced mode; smaller encoder/decoder footprint.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/audio/to-text?mode=balanced",
        "docsUrl": "https://huggingface.co/Xenova/whisper-base",
        "kind": "model",
        "tasks": [
          "asr"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/audio/to-text?mode=balanced",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/whisper-base",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://toolgarden.xyz/en/audio/to-text?mode=balanced",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          }
        ],
        "naturalLanguages": [
          "99 languages"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "whisper-base-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 76908389,
            "revision": "64da57285918e20ea79ea5c88eed7197933abaa8",
            "artifactUrl": "https://huggingface.co/Xenova/whisper-base/resolve/64da57285918e20ea79ea5c88eed7197933abaa8/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "whisper-base-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 82711389,
            "revision": "64da57285918e20ea79ea5c88eed7197933abaa8",
            "artifactUrl": "https://huggingface.co/Xenova/whisper-base/resolve/64da57285918e20ea79ea5c88eed7197933abaa8/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "whisper-base-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 146076166,
            "revision": "64da57285918e20ea79ea5c88eed7197933abaa8",
            "artifactUrl": "https://huggingface.co/Xenova/whisper-base/resolve/64da57285918e20ea79ea5c88eed7197933abaa8/onnx/decoder_model_fp16.onnx"
          },
          {
            "id": "whisper-base-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 291035846,
            "revision": "64da57285918e20ea79ea5c88eed7197933abaa8",
            "artifactUrl": "https://huggingface.co/Xenova/whisper-base/resolve/64da57285918e20ea79ea5c88eed7197933abaa8/onnx/decoder_model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "modelId": "Xenova/whisper-base",
        "weightLicense": "apache-2-0"
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
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "mit",
        "codeLicense": "mit"
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
        "docsUrl": "https://huggingface.co/onnx-community/Kokoro-82M-v1.1-zh-ONNX",
        "kind": "model",
        "tasks": [
          "tts"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/audio/tts",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/hexgrad/Kokoro-82M",
            "kind": "documentation"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/kokoro-js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://toolgarden.xyz/en/audio/tts",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://huggingface.co/onnx-community/Kokoro-82M-v1.1-zh-ONNX",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "Chinese",
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [
          "24 kHz output",
          "Per-speaker voice packs"
        ],
        "variants": [
          {
            "id": "kokoro-82m-fp32-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 127356597,
            "revision": "6cc0f0d2ebe369a68b0df87c2b65c1af8c0ac3e3",
            "artifactUrl": "https://huggingface.co/onnx-community/Kokoro-82M-v1.1-zh-ONNX/resolve/6cc0f0d2ebe369a68b0df87c2b65c1af8c0ac3e3/onnx/model_quantized.onnx"
          },
          {
            "id": "kokoro-82m-fp32-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 163630554,
            "revision": "6cc0f0d2ebe369a68b0df87c2b65c1af8c0ac3e3",
            "artifactUrl": "https://huggingface.co/onnx-community/Kokoro-82M-v1.1-zh-ONNX/resolve/6cc0f0d2ebe369a68b0df87c2b65c1af8c0ac3e3/onnx/model_fp16.onnx"
          },
          {
            "id": "kokoro-82m-fp32-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 165976977,
            "revision": "6cc0f0d2ebe369a68b0df87c2b65c1af8c0ac3e3",
            "artifactUrl": "https://huggingface.co/onnx-community/Kokoro-82M-v1.1-zh-ONNX/resolve/6cc0f0d2ebe369a68b0df87c2b65c1af8c0ac3e3/onnx/model_q4f16.onnx"
          },
          {
            "id": "kokoro-82m-fp32-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 339369442,
            "revision": "6cc0f0d2ebe369a68b0df87c2b65c1af8c0ac3e3",
            "artifactUrl": "https://huggingface.co/onnx-community/Kokoro-82M-v1.1-zh-ONNX/resolve/6cc0f0d2ebe369a68b0df87c2b65c1af8c0ac3e3/onnx/model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "kokoro-js@1.2.1",
        "modelId": "onnx-community/Kokoro-82M-v1.1-zh-ONNX",
        "npmPackage": "kokoro-js",
        "weightLicense": "apache-2-0",
        "backends": [
          "wasm"
        ],
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/audio/tts"
      },
      {
        "id": "piper-tts",
        "nameKey": "models.piper-tts.name",
        "descriptionKey": "models.piper-tts.description",
        "name": "Piper TTS (ONNX)",
        "framework": "onnxruntime-web",
        "description": "Fast on-device Piper TTS — many open voices.",
        "docsUrl": "https://huggingface.co/rhasspy/piper-voices",
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/rhasspy/piper-voices",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "mit",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0",
        "modelId": "rhasspy/piper-voices",
        "weightLicense": "mit"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "mit",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
      },
      {
        "id": "bark-wasm",
        "nameKey": "models.bark-wasm.name",
        "descriptionKey": "models.bark-wasm.description",
        "name": "Bark (WASM)",
        "framework": "transformers",
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
            "reviewedAt": "2026-10-06"
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
        "modelId": "suno/bark-small",
        "weightLicense": "mit"
      }
    ],
    "denoising": [
      {
        "id": "rnnoise-wasm",
        "nameKey": "models.rnnoise-wasm.name",
        "descriptionKey": "models.rnnoise-wasm.description",
        "name": "RNNoise (WASM)",
        "framework": "wasm",
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
          },
          {
            "url": "https://github.com/tensorflow/tfjs",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@jitsi/rnnoise-wasm",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "bsd-3",
        "runtimeVersion": "@jitsi/rnnoise-wasm@0.2.1",
        "npmPackage": "@jitsi/rnnoise-wasm"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/soniqo/DeepFilterNet3-ONNX",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "48 kHz",
          "Real-time frame hop"
        ],
        "variants": [
          {
            "id": "deepfilternet-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 8608859,
            "revision": "63d8ba442ba900143c468b798e94a04009b2f0c9",
            "artifactUrl": "https://huggingface.co/soniqo/DeepFilterNet3-ONNX/resolve/63d8ba442ba900143c468b798e94a04009b2f0c9/deepfilter.onnx"
          }
        ],
        "reportedLicense": "mit",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0",
        "modelId": "soniqo/DeepFilterNet3-ONNX",
        "backends": [
          "wasm"
        ],
        "weightLicense": "mit"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "cc-by-4-0",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
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
        "demoPath": "/audio/split-stems?mode=4-stem",
        "docsUrl": "https://huggingface.co/StemSplitio/htdemucs-onnx",
        "kind": "model",
        "tasks": [
          "source-separation"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/audio/split-stems?mode=4-stem",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://github.com/facebookresearch/demucs",
            "kind": "documentation"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/StemSplitio/htdemucs-onnx",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://toolgarden.xyz/en/audio/split-stems?mode=4-stem",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "drums",
          "bass",
          "other",
          "vocals"
        ],
        "variants": [
          {
            "id": "htdemucs-4-stem-fp16",
            "label": "fp16 weights",
            "quantization": "fp16",
            "downloadBytes": 165612636,
            "artifactUrl": "https://huggingface.co/StemSplitio/htdemucs-onnx/resolve/main/htdemucs_fp16weights.onnx"
          }
        ],
        "reportedLicense": "mit",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0",
        "weightLicense": "mit",
        "backends": [
          "wasm"
        ]
      },
      {
        "id": "htdemucs-6-stem",
        "nameKey": "models.htdemucs-6-stem.name",
        "descriptionKey": "models.htdemucs-6-stem.description",
        "name": "HT Demucs (6 stems, default)",
        "framework": "onnxruntime-web",
        "description": "Hybrid Transformer Demucs 6-stem model (~136 MB ONNX) — default balanced mode of toolgarden audio stem splitter.",
        "demoBase": "https://toolgarden.xyz",
        "demoPath": "/audio/split-stems?mode=6-stem",
        "docsUrl": "https://huggingface.co/StemSplitio/htdemucs-6s-onnx",
        "kind": "model",
        "tasks": [
          "source-separation"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://toolgarden.xyz/en/audio/split-stems?mode=6-stem",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://github.com/facebookresearch/demucs",
            "kind": "documentation"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/StemSplitio/htdemucs-6s-onnx",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://toolgarden.xyz/en/audio/split-stems?mode=6-stem",
            "kind": "browser-example",
            "reviewedAt": "2026-10-05"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "drums",
          "bass",
          "other",
          "vocals",
          "guitar",
          "piano"
        ],
        "variants": [
          {
            "id": "htdemucs-6-stem-fp16",
            "label": "fp16 weights",
            "quantization": "fp16",
            "downloadBytes": 136428532,
            "artifactUrl": "https://huggingface.co/StemSplitio/htdemucs-6s-onnx/resolve/main/htdemucs_6s_fp16weights.onnx"
          }
        ],
        "reportedLicense": "mit",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0",
        "weightLicense": "mit",
        "backends": [
          "wasm"
        ]
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "mit",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@ricky0123/vad-web",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://vad.ricky0123.com/",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Speech segmentation"
        ],
        "variants": [
          {
            "id": "silero-vad-web",
            "label": "default",
            "artifactUrl": "https://raw.githubusercontent.com/snakers4/silero-vad/master/src/silero_vad/data/silero_vad.onnx",
            "downloadBytes": 2327524
          }
        ],
        "docsUrl": "https://github.com/ricky0123/vad",
        "codeLicense": "isc",
        "runtimeVersion": "@ricky0123/vad-web@0.0.31",
        "npmPackage": "@ricky0123/vad-web",
        "demoUrl": "https://vad.ricky0123.com/"
      },
      {
        "id": "pyannote-segmentation",
        "nameKey": "models.pyannote-segmentation.name",
        "descriptionKey": "models.pyannote-segmentation.description",
        "name": "pyannote-segmentation",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/onnx-community/pyannote-segmentation-3.0",
        "kind": "model",
        "tasks": [
          "vad"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/onnx-community/pyannote-segmentation-3.0",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/onnx-community/pyannote-segmentation-3.0",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/spaces/Xenova/whisper-speaker-diarization",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Speech segmentation",
          "Overlapping speech"
        ],
        "variants": [
          {
            "id": "pyannote-segmentation-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 1542308,
            "revision": "733a93b6473d019a773298e08cefa686894b1854",
            "artifactUrl": "https://huggingface.co/onnx-community/pyannote-segmentation-3.0/resolve/733a93b6473d019a773298e08cefa686894b1854/onnx/model_quantized.onnx"
          },
          {
            "id": "pyannote-segmentation-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 2929425,
            "revision": "733a93b6473d019a773298e08cefa686894b1854",
            "artifactUrl": "https://huggingface.co/onnx-community/pyannote-segmentation-3.0/resolve/733a93b6473d019a773298e08cefa686894b1854/onnx/model_q4f16.onnx"
          },
          {
            "id": "pyannote-segmentation-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 3000918,
            "revision": "733a93b6473d019a773298e08cefa686894b1854",
            "artifactUrl": "https://huggingface.co/onnx-community/pyannote-segmentation-3.0/resolve/733a93b6473d019a773298e08cefa686894b1854/onnx/model_fp16.onnx"
          },
          {
            "id": "pyannote-segmentation-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 5986908,
            "revision": "733a93b6473d019a773298e08cefa686894b1854",
            "artifactUrl": "https://huggingface.co/onnx-community/pyannote-segmentation-3.0/resolve/733a93b6473d019a773298e08cefa686894b1854/onnx/model.onnx"
          }
        ],
        "modelId": "onnx-community/pyannote-segmentation-3.0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "mit",
        "demoUrl": "https://huggingface.co/spaces/Xenova/whisper-speaker-diarization"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/tasks-audio",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/audio_classifier",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "mediapipe-audio-classifier",
            "label": "default",
            "artifactUrl": "https://storage.googleapis.com/mediapipe-models/audio_classifier/yamnet/float32/1/yamnet.tflite",
            "downloadBytes": 4126810
          }
        ],
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/audio/audio_classifier/web_js",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/tasks-audio@1.0.1",
        "npmPackage": "@mediapipe/tasks-audio",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/audio_classifier"
      },
      {
        "id": "ast-audioset",
        "nameKey": "models.ast-audioset.name",
        "descriptionKey": "models.ast-audioset.description",
        "name": "ast-audioset",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/Xenova/ast-finetuned-audioset-10-10-0.4593",
        "kind": "model",
        "tasks": [
          "audio-classification"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/ast-finetuned-audioset-10-10-0.4593",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/ast-finetuned-audioset-10-10-0.4593",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/MIT/ast-finetuned-audioset-10-10-0.4593",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "AudioSet-527"
        ],
        "variants": [
          {
            "id": "ast-audioset-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 51381925,
            "revision": "249a1fbf0286b40e7f1ed687a8ae396997bf7dc6",
            "artifactUrl": "https://huggingface.co/Xenova/ast-finetuned-audioset-10-10-0.4593/resolve/249a1fbf0286b40e7f1ed687a8ae396997bf7dc6/onnx/model_q4f16.onnx"
          },
          {
            "id": "ast-audioset-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 90807386,
            "revision": "249a1fbf0286b40e7f1ed687a8ae396997bf7dc6",
            "artifactUrl": "https://huggingface.co/Xenova/ast-finetuned-audioset-10-10-0.4593/resolve/249a1fbf0286b40e7f1ed687a8ae396997bf7dc6/onnx/model_quantized.onnx"
          },
          {
            "id": "ast-audioset-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 173686898,
            "revision": "249a1fbf0286b40e7f1ed687a8ae396997bf7dc6",
            "artifactUrl": "https://huggingface.co/Xenova/ast-finetuned-audioset-10-10-0.4593/resolve/249a1fbf0286b40e7f1ed687a8ae396997bf7dc6/onnx/model_fp16.onnx"
          },
          {
            "id": "ast-audioset-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 346754297,
            "revision": "249a1fbf0286b40e7f1ed687a8ae396997bf7dc6",
            "artifactUrl": "https://huggingface.co/Xenova/ast-finetuned-audioset-10-10-0.4593/resolve/249a1fbf0286b40e7f1ed687a8ae396997bf7dc6/onnx/model.onnx"
          }
        ],
        "modelId": "Xenova/ast-finetuned-audioset-10-10-0.4593",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "bsd-3"
      },
      {
        "id": "wav2vec2-keyword-spotting",
        "nameKey": "models.wav2vec2-keyword-spotting.name",
        "descriptionKey": "models.wav2vec2-keyword-spotting.description",
        "name": "wav2vec2-keyword-spotting",
        "framework": "transformersjs",
        "description": "",
        "docsUrl": "https://huggingface.co/Xenova/wav2vec2-base-superb-ks",
        "kind": "model",
        "tasks": [
          "audio-classification"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/wav2vec2-base-superb-ks",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/wav2vec2-base-superb-ks",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/superb/wav2vec2-base-superb-ks",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [
          "Speech Commands keywords"
        ],
        "variants": [
          {
            "id": "wav2vec2-keyword-spotting-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 66578286,
            "revision": "8909d78f936d073e2c132e5ffc5c15f84d9b8a6f",
            "artifactUrl": "https://huggingface.co/Xenova/wav2vec2-base-superb-ks/resolve/8909d78f936d073e2c132e5ffc5c15f84d9b8a6f/onnx/model_q4f16.onnx"
          },
          {
            "id": "wav2vec2-keyword-spotting-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 95885969,
            "revision": "8909d78f936d073e2c132e5ffc5c15f84d9b8a6f",
            "artifactUrl": "https://huggingface.co/Xenova/wav2vec2-base-superb-ks/resolve/8909d78f936d073e2c132e5ffc5c15f84d9b8a6f/onnx/model_quantized.onnx"
          },
          {
            "id": "wav2vec2-keyword-spotting-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 189546172,
            "revision": "8909d78f936d073e2c132e5ffc5c15f84d9b8a6f",
            "artifactUrl": "https://huggingface.co/Xenova/wav2vec2-base-superb-ks/resolve/8909d78f936d073e2c132e5ffc5c15f84d9b8a6f/onnx/model_fp16.onnx"
          },
          {
            "id": "wav2vec2-keyword-spotting-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 378591630,
            "revision": "8909d78f936d073e2c132e5ffc5c15f84d9b8a6f",
            "artifactUrl": "https://huggingface.co/Xenova/wav2vec2-base-superb-ks/resolve/8909d78f936d073e2c132e5ffc5c15f84d9b8a6f/onnx/model.onnx"
          }
        ],
        "modelId": "Xenova/wav2vec2-base-superb-ks",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
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
        "docsUrl": "https://huggingface.co/Xenova/musicgen-small",
        "kind": "model",
        "tasks": [
          "text-to-music"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/musicgen-small",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/facebook/musicgen-small",
            "kind": "documentation"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/Xenova/musicgen-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/spaces/Xenova/musicgen-web",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "Text-to-Music"
        ],
        "variants": [
          {
            "id": "musicgen-small-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 598795972,
            "revision": "6a8096dabfff72909ef5eae41461408e29ae20fd",
            "artifactUrl": "https://huggingface.co/Xenova/musicgen-small/resolve/6a8096dabfff72909ef5eae41461408e29ae20fd/onnx/build_delay_pattern_mask_quantized.onnx"
          },
          {
            "id": "musicgen-small-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 635540952,
            "revision": "6a8096dabfff72909ef5eae41461408e29ae20fd",
            "artifactUrl": "https://huggingface.co/Xenova/musicgen-small/resolve/6a8096dabfff72909ef5eae41461408e29ae20fd/onnx/build_delay_pattern_mask_q4f16.onnx"
          },
          {
            "id": "musicgen-small-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 1126918007,
            "revision": "6a8096dabfff72909ef5eae41461408e29ae20fd",
            "artifactUrl": "https://huggingface.co/Xenova/musicgen-small/resolve/6a8096dabfff72909ef5eae41461408e29ae20fd/onnx/build_delay_pattern_mask_fp16.onnx"
          },
          {
            "id": "musicgen-small-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 2249012068,
            "revision": "6a8096dabfff72909ef5eae41461408e29ae20fd",
            "artifactUrl": "https://huggingface.co/Xenova/musicgen-small/resolve/6a8096dabfff72909ef5eae41461408e29ae20fd/onnx/build_delay_pattern_mask.onnx"
          }
        ],
        "reportedLicense": "other",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "modelId": "Xenova/musicgen-small",
        "weightLicense": "cc-by-nc-4-0",
        "demoUrl": "https://huggingface.co/spaces/Xenova/musicgen-web"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "other",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "openrail",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "other",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
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
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "other",
        "codeLicense": "mit",
        "runtimeVersion": "onnxruntime-web@1.30.0"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/moondream2",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/moondream2",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/spaces/Xenova/experimental-moondream-webgpu",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "moondream2-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 740853830,
            "revision": "2d577a7ec3b54cce81456f5358d7aa815d587079",
            "artifactUrl": "https://huggingface.co/Xenova/moondream2/resolve/2d577a7ec3b54cce81456f5358d7aa815d587079/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "moondream2-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 1865722796,
            "revision": "2d577a7ec3b54cce81456f5358d7aa815d587079",
            "artifactUrl": "https://huggingface.co/Xenova/moondream2/resolve/2d577a7ec3b54cce81456f5358d7aa815d587079/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "moondream2-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 3716833765,
            "revision": "2d577a7ec3b54cce81456f5358d7aa815d587079",
            "artifactUrl": "https://huggingface.co/Xenova/moondream2/resolve/2d577a7ec3b54cce81456f5358d7aa815d587079/onnx/decoder_model_merged_fp16.onnx"
          },
          {
            "id": "moondream2-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 7431842004,
            "revision": "2d577a7ec3b54cce81456f5358d7aa815d587079",
            "artifactUrl": "https://huggingface.co/Xenova/moondream2/resolve/2d577a7ec3b54cce81456f5358d7aa815d587079/onnx/decoder_model_merged.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/moondream2",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0",
        "demoUrl": "https://huggingface.co/spaces/Xenova/experimental-moondream-webgpu"
      },
      {
        "id": "llava-1-5-7b",
        "nameKey": "models.llava-1-5-7b.name",
        "descriptionKey": "models.llava-1-5-7b.description",
        "name": "LLaVA 1.5 7B",
        "framework": "transformers",
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
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/mlc-ai/web-llm/tree/main/examples/json-mode",
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
            "id": "llava-1-5-7b",
            "label": "default",
            "reportedDownloadSize": "~4.5 GB"
          }
        ],
        "reportedLicense": "other",
        "modelId": "llava-hf/llava-1.5-7b-hf",
        "weightLicense": "custom"
      },
      {
        "id": "paligemma-3b",
        "nameKey": "models.paligemma-3b.name",
        "descriptionKey": "models.paligemma-3b.description",
        "name": "PaliGemma 3B",
        "framework": "transformersjs",
        "description": "Google PaliGemma — versatile small VLM with strong OCR.",
        "docsUrl": "https://huggingface.co/onnx-community/paligemma2-3b-pt-224",
        "kind": "model",
        "tasks": [
          "vlm"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/onnx-community/paligemma2-3b-pt-224",
          "reviewedAt": "2026-10-05"
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
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/google/paligemma2-3b-pt-224",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/onnx-community/paligemma2-3b-pt-224",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "paligemma-3b-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 2895037221,
            "revision": "b0a2d6f61eff89480380bd1714ea5c43aadc35b5",
            "artifactUrl": "https://huggingface.co/onnx-community/paligemma2-3b-pt-224/resolve/b0a2d6f61eff89480380bd1714ea5c43aadc35b5/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "paligemma-3b-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 3629638130,
            "revision": "b0a2d6f61eff89480380bd1714ea5c43aadc35b5",
            "artifactUrl": "https://huggingface.co/onnx-community/paligemma2-3b-pt-224/resolve/b0a2d6f61eff89480380bd1714ea5c43aadc35b5/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "paligemma-3b-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 7251254950,
            "revision": "b0a2d6f61eff89480380bd1714ea5c43aadc35b5",
            "artifactUrl": "https://huggingface.co/onnx-community/paligemma2-3b-pt-224/resolve/b0a2d6f61eff89480380bd1714ea5c43aadc35b5/onnx/decoder_model_merged_fp16.onnx"
          },
          {
            "id": "paligemma-3b-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 14500976225,
            "revision": "b0a2d6f61eff89480380bd1714ea5c43aadc35b5",
            "artifactUrl": "https://huggingface.co/onnx-community/paligemma2-3b-pt-224/resolve/b0a2d6f61eff89480380bd1714ea5c43aadc35b5/onnx/decoder_model_merged.onnx"
          }
        ],
        "reportedLicense": "other",
        "modelId": "onnx-community/paligemma2-3b-pt-224",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "custom"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/onnx-community/Florence-2-base",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/onnx-community/Florence-2-base",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "florence-2-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 223488587,
            "revision": "d59e079711c57174f29265539fb4cc9f0f335916",
            "artifactUrl": "https://huggingface.co/onnx-community/Florence-2-base/resolve/d59e079711c57174f29265539fb4cc9f0f335916/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "florence-2-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 275008119,
            "revision": "d59e079711c57174f29265539fb4cc9f0f335916",
            "artifactUrl": "https://huggingface.co/onnx-community/Florence-2-base/resolve/d59e079711c57174f29265539fb4cc9f0f335916/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "florence-2-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 544046795,
            "revision": "d59e079711c57174f29265539fb4cc9f0f335916",
            "artifactUrl": "https://huggingface.co/onnx-community/Florence-2-base/resolve/d59e079711c57174f29265539fb4cc9f0f335916/onnx/decoder_model_fp16.onnx"
          },
          {
            "id": "florence-2-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 1085954298,
            "revision": "d59e079711c57174f29265539fb4cc9f0f335916",
            "artifactUrl": "https://huggingface.co/onnx-community/Florence-2-base/resolve/d59e079711c57174f29265539fb4cc9f0f335916/onnx/decoder_model.onnx"
          }
        ],
        "reportedLicense": "other",
        "modelId": "onnx-community/Florence-2-base",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "mit"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/clip-vit-base-patch32",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/clip-vit-base-patch32",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "clip-vit-base-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 251617632,
            "revision": "d15189d7028b43f1d3e65039190477f6af591c2a",
            "artifactUrl": "https://huggingface.co/Xenova/clip-vit-base-patch32/resolve/d15189d7028b43f1d3e65039190477f6af591c2a/onnx/model_q4f16.onnx"
          },
          {
            "id": "clip-vit-base-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 307317210,
            "revision": "d15189d7028b43f1d3e65039190477f6af591c2a",
            "artifactUrl": "https://huggingface.co/Xenova/clip-vit-base-patch32/resolve/d15189d7028b43f1d3e65039190477f6af591c2a/onnx/model_quantized.onnx"
          },
          {
            "id": "clip-vit-base-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 606935621,
            "revision": "d15189d7028b43f1d3e65039190477f6af591c2a",
            "artifactUrl": "https://huggingface.co/Xenova/clip-vit-base-patch32/resolve/d15189d7028b43f1d3e65039190477f6af591c2a/onnx/model_fp16.onnx"
          },
          {
            "id": "clip-vit-base-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 1211543291,
            "revision": "d15189d7028b43f1d3e65039190477f6af591c2a",
            "artifactUrl": "https://huggingface.co/Xenova/clip-vit-base-patch32/resolve/d15189d7028b43f1d3e65039190477f6af591c2a/onnx/model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/clip-vit-base-patch32",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/siglip-base-patch16-224",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/siglip-base-patch16-224",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/google/siglip-base-patch16-224",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "siglip-base-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 306682121,
            "revision": "4649052661e53c7000355844105f8a1792088239",
            "artifactUrl": "https://huggingface.co/Xenova/siglip-base-patch16-224/resolve/4649052661e53c7000355844105f8a1792088239/onnx/model_q4f16.onnx"
          },
          {
            "id": "siglip-base-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 421951790,
            "revision": "4649052661e53c7000355844105f8a1792088239",
            "artifactUrl": "https://huggingface.co/Xenova/siglip-base-patch16-224/resolve/4649052661e53c7000355844105f8a1792088239/onnx/model_quantized.onnx"
          },
          {
            "id": "siglip-base-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 814023189,
            "revision": "4649052661e53c7000355844105f8a1792088239",
            "artifactUrl": "https://huggingface.co/Xenova/siglip-base-patch16-224/resolve/4649052661e53c7000355844105f8a1792088239/onnx/model_fp16.onnx"
          },
          {
            "id": "siglip-base-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 1626306100,
            "revision": "4649052661e53c7000355844105f8a1792088239",
            "artifactUrl": "https://huggingface.co/Xenova/siglip-base-patch16-224/resolve/4649052661e53c7000355844105f8a1792088239/onnx/model.onnx"
          }
        ],
        "reportedLicense": "apache-2-0",
        "modelId": "Xenova/siglip-base-patch16-224",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "apache-2-0"
      },
      {
        "id": "mobileclip",
        "nameKey": "models.mobileclip.name",
        "descriptionKey": "models.mobileclip.description",
        "name": "MobileCLIP",
        "framework": "transformersjs",
        "description": "Apple MobileCLIP — tiny CLIP-style model for on-device use.",
        "docsUrl": "https://github.com/apple-aiml-research/ml-mobileclip",
        "kind": "model",
        "tasks": [
          "clip"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/mobileclip_s0",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://github.com/apple-aiml-research/ml-mobileclip",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://onnxruntime.ai/docs/",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/microsoft/onnxruntime",
            "kind": "documentation",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://huggingface.co/Xenova/mobileclip_s0",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/spaces/Xenova/webgpu-mobileclip",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [
          "Image encoder",
          "Text encoder",
          "s0 (smallest of five sizes)"
        ],
        "variants": [
          {
            "id": "mobileclip-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 54646081,
            "revision": "757d59c9c6870a76a4b0306f05f5061bca15c39f",
            "artifactUrl": "https://huggingface.co/Xenova/mobileclip_s0/resolve/757d59c9c6870a76a4b0306f05f5061bca15c39f/onnx/text_model_quantized.onnx"
          },
          {
            "id": "mobileclip-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 107847509,
            "revision": "757d59c9c6870a76a4b0306f05f5061bca15c39f",
            "artifactUrl": "https://huggingface.co/Xenova/mobileclip_s0/resolve/757d59c9c6870a76a4b0306f05f5061bca15c39f/onnx/text_model_fp16.onnx"
          },
          {
            "id": "mobileclip-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 215351419,
            "revision": "757d59c9c6870a76a4b0306f05f5061bca15c39f",
            "artifactUrl": "https://huggingface.co/Xenova/mobileclip_s0/resolve/757d59c9c6870a76a4b0306f05f5061bca15c39f/onnx/text_model.onnx"
          }
        ],
        "reportedLicense": "other",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "modelId": "Xenova/mobileclip_s0",
        "weightLicense": "other",
        "demoUrl": "https://huggingface.co/spaces/Xenova/webgpu-mobileclip"
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
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "layoutlmv3-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 501597822,
            "revision": "cfbbbff0762e6aab37086fdd4739ad14fe7d5db4",
            "artifactUrl": "https://huggingface.co/microsoft/layoutlmv3-base/resolve/cfbbbff0762e6aab37086fdd4739ad14fe7d5db4/model.onnx"
          }
        ],
        "reportedLicense": "other",
        "modelId": "microsoft/layoutlmv3-base",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "custom"
      },
      {
        "id": "donut-base",
        "nameKey": "models.donut-base.name",
        "descriptionKey": "models.donut-base.description",
        "name": "Donut (base)",
        "framework": "transformersjs",
        "description": "OCR-free document understanding transformer.",
        "docsUrl": "https://huggingface.co/Xenova/donut-base-finetuned-docvqa",
        "kind": "model",
        "tasks": [
          "document-understanding"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/donut-base-finetuned-docvqa",
          "reviewedAt": "2026-10-05"
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
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/naver-clova-ix/donut-base-finetuned-docvqa",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/Xenova/donut-base-finetuned-docvqa",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "donut-base-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 218685865,
            "revision": "d9f97a2fb22deb50fe6352f411703cff81cc4f1e",
            "artifactUrl": "https://huggingface.co/Xenova/donut-base-finetuned-docvqa/resolve/d9f97a2fb22deb50fe6352f411703cff81cc4f1e/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "donut-base-q4f16",
            "label": "q4f16",
            "quantization": "q4f16",
            "downloadBytes": 241076556,
            "revision": "d9f97a2fb22deb50fe6352f411703cff81cc4f1e",
            "artifactUrl": "https://huggingface.co/Xenova/donut-base-finetuned-docvqa/resolve/d9f97a2fb22deb50fe6352f411703cff81cc4f1e/onnx/decoder_model_merged_q4f16.onnx"
          },
          {
            "id": "donut-base-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 410768162,
            "revision": "d9f97a2fb22deb50fe6352f411703cff81cc4f1e",
            "artifactUrl": "https://huggingface.co/Xenova/donut-base-finetuned-docvqa/resolve/d9f97a2fb22deb50fe6352f411703cff81cc4f1e/onnx/decoder_model_fp16.onnx"
          },
          {
            "id": "donut-base-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 816798818,
            "revision": "d9f97a2fb22deb50fe6352f411703cff81cc4f1e",
            "artifactUrl": "https://huggingface.co/Xenova/donut-base-finetuned-docvqa/resolve/d9f97a2fb22deb50fe6352f411703cff81cc4f1e/onnx/decoder_model.onnx"
          }
        ],
        "reportedLicense": "mit",
        "modelId": "Xenova/donut-base-finetuned-docvqa",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "mit"
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
          "status": "upstream-example",
          "url": "https://huggingface.co/Xenova/nougat-small",
          "reviewedAt": "2026-10-05"
        },
        "sources": [
          {
            "url": "https://huggingface.co/Xenova/nougat-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/docs/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-03"
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://huggingface.co/facebook/nougat-small",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [
          "English"
        ],
        "programmingLanguages": [],
        "capabilities": [],
        "variants": [
          {
            "id": "nougat-small-q8",
            "label": "q8",
            "quantization": "q8",
            "downloadBytes": 255504274,
            "revision": "92802ec430c01197dd4d135ba6e7e03e1f48ed63",
            "artifactUrl": "https://huggingface.co/Xenova/nougat-small/resolve/92802ec430c01197dd4d135ba6e7e03e1f48ed63/onnx/decoder_model_merged_quantized.onnx"
          },
          {
            "id": "nougat-small-fp16",
            "label": "fp16",
            "quantization": "fp16",
            "downloadBytes": 500426613,
            "revision": "92802ec430c01197dd4d135ba6e7e03e1f48ed63",
            "artifactUrl": "https://huggingface.co/Xenova/nougat-small/resolve/92802ec430c01197dd4d135ba6e7e03e1f48ed63/onnx/decoder_model_merged_fp16.onnx"
          },
          {
            "id": "nougat-small-fp32",
            "label": "fp32",
            "quantization": "fp32",
            "downloadBytes": 995419935,
            "revision": "92802ec430c01197dd4d135ba6e7e03e1f48ed63",
            "artifactUrl": "https://huggingface.co/Xenova/nougat-small/resolve/92802ec430c01197dd4d135ba6e7e03e1f48ed63/onnx/decoder_model.onnx"
          }
        ],
        "reportedLicense": "other",
        "modelId": "Xenova/nougat-small",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0",
        "weightLicense": "cc-by-4-0"
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
          "status": "upstream-example",
          "url": "https://mediapipe-studio.webapps.google.com/demo/face_detector",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/face_detection",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/face_detector",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
            "artifactUrl": "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
            "downloadBytes": 229746
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/face_detection@0.4.1646425229",
        "npmPackage": "@mediapipe/face_detection",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/face_detector"
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
          "status": "upstream-example",
          "url": "https://mediapipe-studio.webapps.google.com/demo/face_landmarker",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/face_mesh",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/face_landmarker",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
            "artifactUrl": "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            "downloadBytes": 3758596
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/face_mesh@0.4.1633559619",
        "npmPackage": "@mediapipe/face_mesh",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/face_landmarker"
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
          "status": "upstream-example",
          "url": "https://storage.googleapis.com/tfjs-models/demos/blazeface/index.html",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/tensorflow/tfjs",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@tensorflow-models/blazeface",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://storage.googleapis.com/tfjs-models/demos/blazeface/index.html",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@tensorflow-models/blazeface@0.1.0",
        "npmPackage": "@tensorflow-models/blazeface",
        "demoUrl": "https://storage.googleapis.com/tfjs-models/demos/blazeface/index.html"
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
          "status": "upstream-example",
          "url": "https://mediapipe-studio.webapps.google.com/demo/pose_landmarker",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/pose",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/pose_landmarker",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
            "artifactUrl": "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
            "downloadBytes": 5777746
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/pose@0.5.1675469404",
        "npmPackage": "@mediapipe/pose",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/pose_landmarker"
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
          "status": "upstream-example",
          "url": "https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/tensorflow/tfjs",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@tensorflow-models/pose-detection",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@tensorflow-models/pose-detection@2.1.3",
        "npmPackage": "@tensorflow-models/pose-detection",
        "demoUrl": "https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html"
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
          "status": "upstream-example",
          "url": "https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/tensorflow/tfjs",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@tensorflow-models/posenet",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@tensorflow-models/posenet@2.2.2",
        "npmPackage": "@tensorflow-models/posenet",
        "demoUrl": "https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html"
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
          "status": "upstream-example",
          "url": "https://mediapipe-studio.webapps.google.com/demo/pose_landmarker",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/tasks-vision",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/pose_landmarker",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
            "artifactUrl": "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task",
            "downloadBytes": 9398198
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/tasks-vision@1.0.1",
        "npmPackage": "@mediapipe/tasks-vision",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/pose_landmarker"
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
          "status": "upstream-example",
          "url": "https://mediapipe-studio.webapps.google.com/demo/hand_landmarker",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/hands",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/hand_landmarker",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/hands@0.4.1675469240",
        "npmPackage": "@mediapipe/hands",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/hand_landmarker"
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
          "status": "upstream-example",
          "url": "https://mediapipe-studio.webapps.google.com/demo/hand_landmarker",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/tasks-vision",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/hand_landmarker",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
            "artifactUrl": "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            "downloadBytes": 7819105
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/tasks-vision@1.0.1",
        "npmPackage": "@mediapipe/tasks-vision",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/hand_landmarker"
      },
      {
        "id": "mediapipe-gesture-recognizer",
        "nameKey": "models.mediapipe-gesture-recognizer.name",
        "descriptionKey": "models.mediapipe-gesture-recognizer.description",
        "name": "mediapipe-gesture-recognizer",
        "framework": "mediapipe",
        "description": "",
        "docsUrl": "https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer/web_js",
        "kind": "model",
        "tasks": [
          "hand"
        ],
        "browserEvidence": {
          "status": "upstream-example",
          "url": "https://mediapipe-studio.webapps.google.com/demo/gesture_recognizer",
          "reviewedAt": "2026-10-06"
        },
        "sources": [
          {
            "url": "https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer/web_js",
            "kind": "model-or-project",
            "reviewedAt": "2026-10-05"
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/tasks-vision",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/gesture_recognizer",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
          }
        ],
        "naturalLanguages": [],
        "programmingLanguages": [],
        "capabilities": [
          "7 built-in gestures",
          "Hand landmarks"
        ],
        "variants": [
          {
            "id": "mediapipe-gesture-recognizer",
            "label": "default",
            "artifactUrl": "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            "downloadBytes": 8373440
          }
        ],
        "npmPackage": "@mediapipe/tasks-vision",
        "runtimeVersion": "@mediapipe/tasks-vision@1.0.1",
        "codeLicense": "apache-2-0",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/gesture_recognizer"
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
          "status": "upstream-example",
          "url": "https://mediapipe-studio.webapps.google.com/demo/holistic_landmarker",
          "reviewedAt": "2026-10-06"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/holistic",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://mediapipe-studio.webapps.google.com/demo/holistic_landmarker",
            "kind": "browser-example",
            "reviewedAt": "2026-10-06"
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
            "artifactUrl": "https://storage.googleapis.com/mediapipe-models/holistic_landmarker/holistic_landmarker/float16/1/holistic_landmarker.task",
            "downloadBytes": 13683609
          }
        ],
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/holistic@0.5.1675471629",
        "npmPackage": "@mediapipe/holistic",
        "demoUrl": "https://mediapipe-studio.webapps.google.com/demo/holistic_landmarker"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/objectron",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "apache-2-0",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/objectron@0.4.1675468480",
        "npmPackage": "@mediapipe/objectron"
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
          },
          {
            "url": "https://github.com/opencv/opencv",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "mit",
        "codeLicense": "apache-2-0"
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
          },
          {
            "url": "https://github.com/huggingface/transformers.js",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "reportedLicense": "other",
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@huggingface/transformers@4.3.0"
      },
      {
        "id": "xclip",
        "nameKey": "models.xclip.name",
        "descriptionKey": "models.xclip.description",
        "name": "X-CLIP",
        "framework": "transformers",
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
            "reviewedAt": "2026-10-06"
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
        "modelId": "microsoft/xclip-base-patch32",
        "weightLicense": "mit"
      },
      {
        "id": "videomae",
        "nameKey": "models.videomae.name",
        "descriptionKey": "models.videomae.description",
        "name": "VideoMAE",
        "framework": "transformers",
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
            "reviewedAt": "2026-10-06"
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
        "modelId": "MCG-NJU/videomae-base",
        "weightLicense": "cc-by-nc-4-0"
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
          },
          {
            "url": "https://github.com/google-ai-edge/mediapipe",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
          },
          {
            "url": "https://www.npmjs.com/package/@mediapipe/tasks-vision",
            "kind": "documentation",
            "reviewedAt": "2026-10-06"
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
        "identityUnresolved": true,
        "codeLicense": "apache-2-0",
        "runtimeVersion": "@mediapipe/tasks-vision@1.0.1",
        "npmPackage": "@mediapipe/tasks-vision"
      }
    ]
  }
};

export const getModels = (cat: string, sub: string) => MODELS[cat]?.[sub] ?? [];
export const countModels = (cat: string, sub: string) => getModels(cat, sub).length;
export const totalModels = () => Object.values(MODELS).reduce((sum, subs) => sum + Object.values(subs).reduce((n, list) => n + list.length, 0), 0);
