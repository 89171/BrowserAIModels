/** MI-GAN pipeline: CHW uint8, mask 255 = keep, 0 = repair. */
import type { InferenceSession } from 'onnxruntime-web/wasm';
import { createSession, fetchModel, loadOrt } from './ort';
import { featherMask, maskPatch } from './inpaint-mask';

const SIZE = 512;
const sessions = new Map<string, Promise<InferenceSession>>();

export async function miganInpaint(
  canvas: HTMLCanvasElement,
  alpha: Float32Array,
  url: string,
  onProgress?: (ratio: number) => void,
  feather = 0,
): Promise<{ url: string; filled: number }> {
  const { width: W, height: H } = canvas;
  const patch = maskPatch(alpha, W, H);
  // Empty masks must not trigger a model download.
  if (!patch) return { url: canvas.toDataURL('image/png'), filled: 0 };
  let job = sessions.get(url);
  if (!job) {
    job = fetchModel(url, (r) => onProgress?.(r)).then((b) => createSession(b));
    sessions.set(url, job);
    job.catch(() => sessions.delete(url));
  }
  const [session, ort] = await Promise.all([job, loadOrt()]);
  const small = document.createElement('canvas');
  small.width = small.height = SIZE;
  const sc = small.getContext('2d')!;
  sc.drawImage(canvas, patch.x, patch.y, patch.w, patch.h, 0, 0, SIZE, SIZE);
  const px = sc.getImageData(0, 0, SIZE, SIZE).data;
  const img = new Uint8Array(3 * SIZE * SIZE);
  const mask = new Uint8Array(SIZE * SIZE).fill(255);
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    const i = y * SIZE + x;
    const a = px[i * 4 + 3] / 255;
    for (let c = 0; c < 3; c++) img[c * SIZE * SIZE + i] = Math.round(px[i * 4 + c] * a + 255 * (1 - a));
    if (alpha[(patch.y + Math.floor(y * patch.h / SIZE)) * W + patch.x + Math.floor(x * patch.w / SIZE)] > 0.35) mask[i] = 0;
  }
  const imageTensor = new ort.Tensor('uint8', img, [1, 3, SIZE, SIZE]);
  const maskTensor = new ort.Tensor('uint8', mask, [1, 1, SIZE, SIZE]);
  const gen = document.createElement('canvas');
  gen.width = gen.height = SIZE;
  const gc = gen.getContext('2d')!;
  try {
    const result = await session.run({ image: imageTensor, mask: maskTensor });
    try {
      const tensor = result.result;
      if (!tensor || tensor.dims.join(',') !== `1,3,${SIZE},${SIZE}`) throw new Error('Unexpected MI-GAN output shape');
      const out = tensor.data as Uint8Array;
      const gd = gc.createImageData(SIZE, SIZE);
      for (let i = 0; i < SIZE * SIZE; i++) {
        for (let c = 0; c < 3; c++) gd.data[i * 4 + c] = out[c * SIZE * SIZE + i];
        gd.data[i * 4 + 3] = 255;
      }
      gc.putImageData(gd, 0, 0);
    } finally { Object.values(result).forEach((tensor) => tensor.dispose()); }
  } finally { imageTensor.dispose(); maskTensor.dispose(); }
  const full = document.createElement('canvas');
  full.width = W; full.height = H;
  const fc = full.getContext('2d', { willReadFrequently: true })!;
  fc.drawImage(canvas, 0, 0);
  const base = fc.getImageData(patch.x, patch.y, patch.w, patch.h);
  fc.drawImage(gen, patch.x, patch.y, patch.w, patch.h);
  const fill = fc.getImageData(patch.x, patch.y, patch.w, patch.h);
  const blend = featherMask(alpha, W, H, feather);
  for (let y = 0; y < patch.h; y++) for (let x = 0; x < patch.w; x++) {
    const i = y * patch.w + x;
    const a = blend[(patch.y + y) * W + patch.x + x];
    if (a <= 0) continue;
    for (let c = 0; c < 3; c++) base.data[i * 4 + c] = base.data[i * 4 + c] * (1 - a) + fill.data[i * 4 + c] * a;
  }
  fc.putImageData(base, patch.x, patch.y);
  return { url: full.toDataURL('image/png'), filled: patch.filled };
}
