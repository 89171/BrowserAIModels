export function resizeMask(alpha: Float32Array, source: { w: number; h: number }, w: number, h: number): Float32Array {
  if (source.w * source.h !== alpha.length) throw new Error('Invalid mask dimensions');
  if (source.w === w && source.h === h) return alpha;
  const result = new Float32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    result[y * w + x] = alpha[Math.min(source.h - 1, Math.floor(y * source.h / h)) * source.w + Math.min(source.w - 1, Math.floor(x * source.w / w))];
  }
  return result;
}

export function maskPatch(alpha: Float32Array, w: number, h: number) {
  if (alpha.length !== w * h) throw new Error('Invalid mask dimensions');
  let x0 = w, y0 = h, x1 = -1, y1 = -1, filled = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (alpha[y * w + x] > 0.35) {
    x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); filled++;
  }
  if (!filled) return null;
  const side = Math.max(x1 - x0 + 1, y1 - y0 + 1);
  const size = Math.ceil(side + Math.max(48, side * 0.8) * 2);
  const width = Math.min(w, size), height = Math.min(h, size);
  return {
    x: Math.max(0, Math.min(w - width, Math.floor((x0 + x1 + 1 - width) / 2))),
    y: Math.max(0, Math.min(h - height, Math.floor((y0 + y1 + 1 - height) / 2))),
    w: width, h: height, filled,
  };
}

/** Distance to the unselected region, capped at the requested blend width. */
export function featherMask(alpha: Float32Array, w: number, h: number, feather: number) {
  if (feather <= 0) return alpha;
  const distance = new Float32Array(alpha.length);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x;
    distance[i] = alpha[i] > 0.35 ? Math.min(feather, x ? distance[i - 1] + 1 : 1, y ? distance[i - w] + 1 : 1) : 0;
  }
  for (let y = h - 1; y >= 0; y--) for (let x = w - 1; x >= 0; x--) {
    const i = y * w + x;
    if (distance[i]) distance[i] = Math.min(distance[i], x < w - 1 ? distance[i + 1] + 1 : 1, y < h - 1 ? distance[i + w] + 1 : 1);
  }
  return distance.map((d, i) => alpha[i] > 0.35 ? Math.min(1, d / feather) : 0);
}
