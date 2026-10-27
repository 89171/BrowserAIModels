/**
 * Binaries that are too large for the static host live in object storage.
 *
 * The host that serves `out/` rejects any single file above 25 MiB, while the
 * ONNX Runtime builds we vendor are 26–28 MB each (the `jsep` one is needed for
 * WebGPU, `asyncify` for Safari). They are uploaded to the bucket once and the
 * runtime points there instead.
 *
 * `NEXT_PUBLIC_ASSET_BASE` is the bucket origin without a trailing slash. Leave
 * it unset for local dev: `npm install` copies the same binaries into
 * `public/ort`, and `scripts/prune-large-assets.cjs` keeps them out of `out/`
 * whenever a remote base is configured.
 */
const raw = (process.env.NEXT_PUBLIC_ASSET_BASE ?? '').trim().replace(/\/+$/, '');

/** Bucket origin, or '' when the build serves everything from /public. */
export const ASSET_BASE = raw;

/** True when the oversized binaries are fetched cross-origin. */
export const ASSETS_ARE_REMOTE = raw.length > 0;

/**
 * Prefix that onnxruntime-web appends `ort-wasm-simd-threaded[-jsep|-jspi|-asyncify].{wasm,mjs}`
 * to, so it must end with a slash. Object storage keys are flat, hence the root
 * prefix; dev keeps the vendored `public/ort/` copy.
 */
export const ORT_WASM_PREFIX = ASSETS_ARE_REMOTE ? `${raw}/` : '/ort/';

/** Absolute URL for an asset that only exists in the bucket (e.g. a large sample). */
export const remoteAsset = (name: string): string =>
  `${raw}/${name.replace(/^\/+/, '')}`;
