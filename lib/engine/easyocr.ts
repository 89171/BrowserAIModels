import type * as EasyWeb from '@qduc/easyocr-web';
import type { DetectorModel, RecognizerModel, OcrResult } from '@qduc/easyocr-core';

type WebModule = { easy: typeof EasyWeb };
let sdk: Promise<typeof EasyWeb> | undefined;
let detector: Promise<DetectorModel> | undefined;
const recognizers = new Map<string, Promise<RecognizerModel>>();

function getSdk() {
  if (!sdk) {
    const sdkUrl = '/easyocr/index.mjs';
    sdk = (import(/* webpackIgnore: true */ sdkUrl) as Promise<WebModule>).then((module) => module.easy);
    sdk.catch(() => { sdk = undefined; });
  }
  return sdk;
}

function modelFor(lang: string): { model: string; charset: string; langList: string[] } {
  if (lang === 'eng') return { model: 'english_g2', charset: 'english_g2.charset.txt', langList: ['en'] };
  if (lang === 'jpn') return { model: 'japanese_g2', charset: 'japanese_g2.charset.txt', langList: ['ja', 'en'] };
  return { model: 'zh_sim_g2', charset: 'zh_sim_g2.charset.txt', langList: ['ch_sim', 'en'] };
}

async function getModels(easy: typeof EasyWeb, model: string, charset: string) {
  const revision = 'cf61c87235ee5f40b0daf039258ef8e7bbc01a5a';
  const modelBase = `https://media.githubusercontent.com/media/qduc/easyocr.js/${revision}/models`;
  const charsetBase = `https://raw.githubusercontent.com/qduc/easyocr.js/${revision}/models`;
  if (!detector) {
    detector = easy.fetchModel(`${modelBase}/onnx/craft_mlt_25k.onnx`).then((bytes) => easy.loadDetectorModel(bytes));
    detector.catch(() => { detector = undefined; });
  }
  let recognizer = recognizers.get(model);
  if (!recognizer) {
    recognizer = Promise.all([
      easy.fetchModel(`${modelBase}/onnx/${model}.onnx`),
      easy.loadCharset(`${charsetBase}/${charset}`),
    ]).then(([bytes, characters]) => easy.loadRecognizerModel(bytes, { charset: characters }));
    recognizers.set(model, recognizer);
    recognizer.catch(() => { recognizers.delete(model); });
  }
  return Promise.all([detector, recognizer]);
}

export function easyResult(items: OcrResult[], width: number, height: number) {
  if (!(width > 0 && height > 0)) throw new Error('Invalid OCR image dimensions');
  const lines = items.filter((item) => item.text.trim()).map((item) => {
    const xs = item.box.map(([x]) => Math.max(0, Math.min(width, x)));
    const ys = item.box.map(([, y]) => Math.max(0, Math.min(height, y)));
    const left = Math.min(...xs), top = Math.min(...ys);
    return {
      text: item.text.trim(),
      x: left / width, y: top / height,
      w: (Math.max(...xs) - left) / width, h: (Math.max(...ys) - top) / height,
      conf: item.confidence,
    };
  });
  return { lines, text: lines.map((line) => line.text).join('\n'), width, height };
}

export async function easyOcr(src: string, lang: string) {
  const easy = await getSdk();
  const response = await fetch(src);
  if (!response.ok) throw new Error(`OCR image download failed (${response.status})`);
  const image = await easy.loadImage(await response.blob());
  const choice = modelFor(lang);
  const [detectorModel, recognizer] = await getModels(easy, choice.model, choice.charset);
  const items = await easy.recognize({ image, detector: detectorModel, recognizer, options: { langList: choice.langList } });
  return easyResult(items, image.width, image.height);
}
