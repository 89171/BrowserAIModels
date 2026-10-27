/**
 * Alpha matting for the background-removal demos.
 *
 * Transformers.js only hands back the raw mask tensor, and its generic pipeline
 * hard-quantises it (`mul(255).to('uint8')`) and resizes afterwards, so the
 * subject turns semi-transparent whenever the sigmoid output does not reach both
 * ends of 0..1 — which is most of the time. RMBG-1.4's own reference script
 * rescales the float mask by min/max before quantising, and BiRefNet emits raw
 * logits that need a sigmoid first. Both contracts are reproduced here:
 *
 *   normalise → run → (sigmoid) → min/max → guided-filter refine → levels →
 *   bilinear upscale → decontaminate edge colours → straight-alpha RGBA
 *
 * Everything in this module is browser-only (canvas for decode/resize) but has
 * no weight-loading responsibility, so it stays testable by reading.
 */

/** How a checkpoint wants its pixels prepared and its mask read back. */
export interface MatteSpec {
  /** Square input resolution from the checkpoint's own processor config. */
  size: number;
  mean: readonly [number, number, number];
  std: readonly [number, number, number];
  /** `minmax`: the graph already outputs probabilities. `sigmoid`: it outputs logits. */
  postprocess: 'minmax' | 'sigmoid';
  /**
   * `model_type` override. Both checkpoints ship a config that Transformers.js
   * would otherwise resolve to the wrong class (RMBG declares Segformer, BiRefNet
   * declares swin), so they are pinned to the generic graph runner instead.
   */
  arch: 'custom' | 'birefnet';
}

export const MATTE_SPECS: Record<string, MatteSpec> = {
  'briaai/RMBG-1.4': {
    size: 1024,
    mean: [0.5, 0.5, 0.5],
    std: [1, 1, 1],
    postprocess: 'minmax',
    arch: 'custom',
  },
  'studioludens/birefnet-lite-512': {
    size: 512,
    mean: [0.485, 0.456, 0.406],
    std: [0.229, 0.224, 0.225],
    postprocess: 'sigmoid',
    arch: 'birefnet',
  },
};

export interface MatteParams {
  /** Midpoint of the alpha ramp, 0..1. Higher keeps less of the soft fringe. */
  thresh: number;
  /** Guided-filter radius in mask pixels; 0 disables edge refinement. */
  feather: number;
}

export const DEFAULT_MATTE_PARAMS: MatteParams = { thresh: 0.5, feather: 2 };

export interface Matte {
  width: number;
  height: number;
  /** Straight-alpha RGBA at source resolution. */
  pixels: Uint8ClampedArray<ArrayBuffer>;
  /** Share of pixels the matte keeps (alpha > 0.5). */
  coverage: number;
}

export const isMatte = (value: unknown): value is Matte =>
  !!value && typeof value === 'object' && 'pixels' in value && 'coverage' in value;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const clampInt = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

/* ------------------------------------------------------------- pixel helpers */

function canvasOf(width: number, height: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('canvas 2d context unavailable');
  return { canvas, ctx };
}

function decodeImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image could not be decoded'));
    img.src = src;
  });
}

/** Resize to a square and pack as normalised NCHW floats, plus a luminance guide. */
function prepare(
  source: CanvasImageSource,
  spec: MatteSpec,
  maskWidth: number,
  maskHeight: number
): { input: Float32Array; guide: Float32Array } {
  const { ctx } = canvasOf(maskWidth, maskHeight);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  // Stretch to a square: both reference scripts (BRIA's example_inference.py and
  // BiRefNet's inference.py) resize straight to the square input, so the weights
  // expect that geometry. Letterboxing here would introduce bars the model has
  // never seen.
  ctx.drawImage(source, 0, 0, maskWidth, maskHeight);
  const { data } = ctx.getImageData(0, 0, maskWidth, maskHeight);
  const n = maskWidth * maskHeight;
  const input = new Float32Array(3 * n);
  const guide = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const p = i * 4;
    const r = data[p] / 255;
    const g = data[p + 1] / 255;
    const b = data[p + 2] / 255;
    input[i] = (r - spec.mean[0]) / spec.std[0];
    input[n + i] = (g - spec.mean[1]) / spec.std[1];
    input[2 * n + i] = (b - spec.mean[2]) / spec.std[2];
    guide[i] = 0.299 * r + 0.587 * g + 0.114 * b;
  }
  return { input, guide };
}

function halfToFloat(h: number): number {
  const sign = h & 0x8000 ? -1 : 1;
  const exp = (h & 0x7c00) >> 10;
  const frac = h & 0x03ff;
  if (exp === 0) return sign * 2 ** -14 * (frac / 1024);
  if (exp === 0x1f) return frac ? NaN : sign * Infinity;
  return sign * 2 ** (exp - 15) * (1 + frac / 1024);
}

/** fp16 sessions hand back Uint16Array payloads; decode before any arithmetic. */
function tensorData(tensor: { data: ArrayLike<number>; type?: string }): Float32Array {
  const data = tensor.data;
  if (data instanceof Float32Array) return data;
  const out = new Float32Array(data.length);
  const fp16 = tensor.type === 'float16' || data instanceof Uint16Array;
  for (let i = 0; i < data.length; i++) out[i] = fp16 ? halfToFloat(data[i] as number) : Number(data[i]);
  return out;
}

/**
 * Pull the mask out of whatever the graph returned. RMBG names its single output
 * `0`, BiRefNet names it `output_image`, and a quantitative export may append
 * class channels, so take the last `w * h` values of the first 3D/4D tensor.
 */
function pickMask(outputs: unknown): { data: Float32Array; width: number; height: number } {
  const values = Object.values(outputs as Record<string, unknown>);
  for (const value of values) {
    const tensor = value as { data?: ArrayLike<number>; dims?: number[]; type?: string };
    if (!tensor?.data || !Array.isArray(tensor.dims) || tensor.dims.length < 2) continue;
    const height = tensor.dims[tensor.dims.length - 2];
    const width = tensor.dims[tensor.dims.length - 1];
    if (!width || !height) continue;
    const data = tensorData(tensor as { data: ArrayLike<number>; type?: string });
    const start = data.length - width * height;
    if (start < 0) continue;
    return { data: start > 0 ? data.subarray(start) : data, width, height };
  }
  throw new Error('model returned no mask tensor');
}

/** Probabilities in 0..1, stretched to the full range the way BRIA's script does it. */
function toAlpha(mask: { data: Float32Array }, postprocess: MatteSpec['postprocess']): Float32Array {
  const raw = mask.data;
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < raw.length; i++) {
    const v = raw[i];
    if (v < min) min = v;
    if (v > max) max = v;
  }
  // A graph that suddenly emits negative values is handing us logits regardless
  // of what its card claims, so fall back to sigmoid instead of producing a mask
  // that is uniformly black.
  const sigmoid = postprocess === 'sigmoid' || min < -0.01 || max > 1.01;
  const out = new Float32Array(raw.length);
  if (sigmoid) {
    min = Infinity;
    max = -Infinity;
    for (let i = 0; i < raw.length; i++) {
      const v = 1 / (1 + Math.exp(-raw[i]));
      out[i] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  } else {
    out.set(raw);
  }
  const span = max - min;
  if (span > 1e-6) for (let i = 0; i < out.length; i++) out[i] = (out[i] - min) / span;
  return out;
}

/** Windowed mean with sliding sums: O(1) per pixel, no integral-image allocation. */
function boxMean(src: Float32Array, w: number, h: number, r: number): Float32Array {
  const tmp = new Float32Array(w * h);
  const width = 2 * r + 1;
  for (let y = 0; y < h; y++) {
    const row = y * w;
    let sum = 0;
    for (let x = -r; x <= r; x++) sum += src[row + clampInt(x, 0, w - 1)];
    for (let x = 0; x < w; x++) {
      tmp[row + x] = sum / width;
      sum -= src[row + clampInt(x - r, 0, w - 1)];
      sum += src[row + clampInt(x + r + 1, 0, w - 1)];
    }
  }
  const out = new Float32Array(w * h);
  for (let x = 0; x < w; x++) {
    let sum = 0;
    for (let y = -r; y <= r; y++) sum += tmp[clampInt(y, 0, h - 1) * w + x];
    for (let y = 0; y < h; y++) {
      out[y * w + x] = sum / width;
      sum -= tmp[clampInt(y - r, 0, h - 1) * w + x];
      sum += tmp[clampInt(y + r + 1, 0, h - 1) * w + x];
    }
  }
  return out;
}

/**
 * He et al. guided filter. Snapping the alpha ramp to the image's own edges is
 * what turns a 1-pixel staircase into a clean, sub-pixel contour — a plain blur
 * would just smear it.
 */
export function guidedFilter(
  p: Float32Array,
  guide: Float32Array,
  w: number,
  h: number,
  radius: number,
  eps = 1e-3
): Float32Array {
  const r = Math.max(1, Math.round(radius));
  const meanGuide = boxMean(guide, w, h, r);
  const meanP = boxMean(p, w, h, r);
  const cross = new Float32Array(w * h);
  const square = new Float32Array(w * h);
  for (let i = 0; i < p.length; i++) {
    cross[i] = guide[i] * p[i];
    square[i] = guide[i] * guide[i];
  }
  const meanCross = boxMean(cross, w, h, r);
  const meanSquare = boxMean(square, w, h, r);
  const a = new Float32Array(w * h);
  const b = new Float32Array(w * h);
  for (let i = 0; i < p.length; i++) {
    const variance = meanSquare[i] - meanGuide[i] * meanGuide[i];
    a[i] = (meanCross[i] - meanGuide[i] * meanP[i]) / (variance + eps);
    b[i] = meanP[i] - a[i] * meanGuide[i];
  }
  const meanA = boxMean(a, w, h, r);
  const meanB = boxMean(b, w, h, r);
  const out = new Float32Array(w * h);
  for (let i = 0; i < out.length; i++) out[i] = clamp01(meanA[i] * guide[i] + meanB[i]);
  return out;
}

/** Push the ramp's midpoint to `thresh` while keeping a soft, monotonic transition. */
function applyLevels(alpha: Float32Array, thresh: number): void {
  const t = clamp01(thresh);
  const lo = t * 0.4;
  const hi = 1 - (1 - t) * 0.4;
  const span = Math.max(1e-3, hi - lo);
  for (let i = 0; i < alpha.length; i++) alpha[i] = clamp01((alpha[i] - lo) / span);
}

export function bilinear(src: Float32Array, sw: number, sh: number, dw: number, dh: number): Float32Array {
  if (sw === dw && sh === dh) return src;
  const out = new Float32Array(dw * dh);
  const xRatio = sw / dw;
  const yRatio = sh / dh;
  for (let y = 0; y < dh; y++) {
    const sy = clampInt((y + 0.5) * yRatio - 0.5, 0, sh - 1);
    const y0 = Math.floor(sy);
    const y1 = Math.min(sh - 1, y0 + 1);
    const fy = sy - y0;
    for (let x = 0; x < dw; x++) {
      const sx = clampInt((x + 0.5) * xRatio - 0.5, 0, sw - 1);
      const x0 = Math.floor(sx);
      const x1 = Math.min(sw - 1, x0 + 1);
      const fx = sx - x0;
      const top = src[y0 * sw + x0] * (1 - fx) + src[y0 * sw + x1] * fx;
      const bottom = src[y1 * sw + x0] * (1 - fx) + src[y1 * sw + x1] * fx;
      out[y * dw + x] = top * (1 - fy) + bottom * fy;
    }
  }
  return out;
}

/**
 * Colour decontamination: a semi-transparent edge pixel still carries the old
 * background's colour, which reads as a white (or green-screen) halo once the
 * cutout sits on a dark page. Estimate the nearby opaque foreground colour on a
 * coarse grid and pull the fringe towards it in proportion to its transparency.
 */
function decontaminate(pixels: Uint8ClampedArray, alpha: Float32Array, w: number, h: number): void {
  const scale = Math.max(1, Math.ceil(Math.max(w, h) / 192));
  const gw = Math.max(1, Math.ceil(w / scale));
  const gh = Math.max(1, Math.ceil(h / scale));
  const red = new Float32Array(gw * gh);
  const green = new Float32Array(gw * gh);
  const blue = new Float32Array(gw * gh);
  const weight = new Float32Array(gw * gh);

  for (let y = 0; y < h; y++) {
    const gy = Math.min(gh - 1, (y / scale) | 0);
    for (let x = 0; x < w; x++) {
      const a = alpha[y * w + x];
      if (a <= 0.5) continue;
      const cell = gy * gw + Math.min(gw - 1, (x / scale) | 0);
      const wgt = a >= 0.92 ? 1 : (a - 0.5) / 0.42 * 0.5;
      if (wgt <= 0) continue;
      const p = (y * w + x) * 4;
      red[cell] += pixels[p] * wgt;
      green[cell] += pixels[p + 1] * wgt;
      blue[cell] += pixels[p + 2] * wgt;
      weight[cell] += wgt;
    }
  }

  const blurred = [red, green, blue].map((channel) => boxMean(channel, gw, gh, 2));
  const blurredWeight = boxMean(weight, gw, gh, 2);

  for (let y = 0; y < h; y++) {
    const fy = clampInt(y / scale - 0.5, 0, gh - 1);
    const y0 = Math.floor(fy);
    const y1 = Math.min(gh - 1, y0 + 1);
    const ty = fy - y0;
    for (let x = 0; x < w; x++) {
      const a = alpha[y * w + x];
      if (a >= 0.98) continue;
      const fx = clampInt(x / scale - 0.5, 0, gw - 1);
      const x0 = Math.floor(fx);
      const x1 = Math.min(gw - 1, x0 + 1);
      const tx = fx - x0;
      const w00 = blurredWeight[y0 * gw + x0] * (1 - tx) * (1 - ty);
      const w10 = blurredWeight[y0 * gw + x1] * tx * (1 - ty);
      const w01 = blurredWeight[y1 * gw + x0] * (1 - tx) * ty;
      const w11 = blurredWeight[y1 * gw + x1] * tx * ty;
      const total = w00 + w10 + w01 + w11;
      if (total <= 1e-4) continue;
      const p = (y * w + x) * 4;
      const mix = Math.min(1, (1 - a) * 1.15);
      for (let c = 0; c < 3; c++) {
        const channel = blurred[c];
        const fg =
          (channel[y0 * gw + x0] * (1 - tx) * (1 - ty) +
            channel[y0 * gw + x1] * tx * (1 - ty) +
            channel[y1 * gw + x0] * (1 - tx) * ty +
            channel[y1 * gw + x1] * tx * ty) /
          total;
        pixels[p + c] = pixels[p + c] * (1 - mix) + fg * mix;
      }
    }
  }
}

/* ---------------------------------------------------------------- public API */

export interface MatteRuntime {
  Tensor: new (type: string, data: Float32Array, dims: number[]) => unknown;
}

/**
 * Build the callable for one loaded checkpoint. The returned function keeps the
 * `Pipe` shape real.ts expects: `(imageSrc, params?) => Promise<Matte>`.
 */
export function createMatte(
  mod: MatteRuntime,
  model: {
    (inputs: Record<string, unknown>): Promise<unknown>;
    sessions?: Record<string, { inputNames?: string[] }>;
  },
  spec: MatteSpec
) {
  return async (input: unknown, params?: MatteParams): Promise<Matte> => {
    const options = { ...DEFAULT_MATTE_PARAMS, ...params };
    const image = await decodeImage(input as string);
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    if (!width || !height) throw new Error('image has no pixels');

    const source = canvasOf(width, height);
    source.ctx.drawImage(image, 0, 0);

    const { input: inputData, guide } = prepare(source.canvas, spec, spec.size, spec.size);
    const tensor = new mod.Tensor('float32', inputData, [1, 3, spec.size, spec.size]);
    const inputName = model.sessions?.model?.inputNames?.[0] ?? 'input';
    const outputs = await model({ [inputName]: tensor });

    const mask = pickMask(outputs);
    let alpha = toAlpha(mask, spec.postprocess);

    // Guided filtering needs the guide and the alpha at the same resolution; a
    // checkpoint whose output is downsampled relative to its input is rare but
    // cheap to handle.
    const guideAtMask =
      mask.width === spec.size && mask.height === spec.size
        ? guide
        : bilinear(guide, spec.size, spec.size, mask.width, mask.height);
    const radius = Math.round((options.feather * mask.width) / 512);
    if (radius >= 1) alpha = guidedFilter(alpha, guideAtMask, mask.width, mask.height, radius);
    applyLevels(alpha, options.thresh);
    alpha = bilinear(alpha, mask.width, mask.height, width, height);

    const pixels = source.ctx.getImageData(0, 0, width, height).data as Uint8ClampedArray<ArrayBuffer>;
    decontaminate(pixels, alpha, width, height);

    let kept = 0;
    for (let i = 0; i < alpha.length; i++) {
      const a = alpha[i];
      if (a > 0.5) kept++;
      pixels[i * 4 + 3] = Math.round(a * 255);
    }
    return { width, height, pixels, coverage: Math.round((kept / alpha.length) * 1000) / 1000 };
  };
}
