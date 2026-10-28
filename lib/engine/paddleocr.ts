import type { PaddleOCR } from '@paddleocr/paddleocr-js';

type Ocr = Awaited<ReturnType<typeof PaddleOCR.create>>;
let instance: Promise<Ocr> | undefined;

function getOcr(): Promise<Ocr> {
  if (!instance) {
    const sdkUrl = '/paddleocr/index.mjs';
    instance = (import(/* webpackIgnore: true */ sdkUrl) as Promise<typeof import('@paddleocr/paddleocr-js')>).then(({ PaddleOCR }) => PaddleOCR.create({
      textDetectionModelName: 'PP-OCRv5_mobile_det',
      textRecognitionModelName: 'PP-OCRv5_mobile_rec',
      worker: true,
      // The SDK's prebuilt worker embeds ORT 1.24.3; do not use the
      // Transformers.js binaries, which may be a different ABI/version.
      ortOptions: {
        backend: 'wasm',
        wasmPaths: 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.24.3/dist/',
        numThreads: 1,
      },
    }));
    instance.catch(() => { instance = undefined; });
  }
  return instance;
}

export function paddleResult(result: {
  image: { width: number; height: number };
  items: { text: string; score: number; poly: [number, number][] }[];
}) {
  const { width, height } = result.image;
  if (!(width > 0 && height > 0)) throw new Error('Invalid OCR image dimensions');
  const lines = result.items.filter((item) => item.text.trim() && item.poly.length >= 4).map((item) => {
    const xs = item.poly.map(([x]) => Math.max(0, Math.min(width, x)));
    const ys = item.poly.map(([, y]) => Math.max(0, Math.min(height, y)));
    const left = Math.min(...xs), top = Math.min(...ys);
    return {
      text: item.text.trim(),
      x: left / width, y: top / height,
      w: (Math.max(...xs) - left) / width, h: (Math.max(...ys) - top) / height,
      conf: item.score,
    };
  });
  return { lines, text: lines.map((line) => line.text).join('\n'), width, height };
}

export async function paddleOcr(src: string) {
  const response = await fetch(src);
  if (!response.ok) throw new Error(`OCR image download failed (${response.status})`);
  const blob = await response.blob();
  const ocr = await getOcr();
  const [result] = await ocr.predict(blob);
  if (!result) throw new Error('PaddleOCR returned no image result');
  return paddleResult(result);
}
