#!/usr/bin/env node
/**
 * Keeps the static export under the host's per-file size cap.
 *
 * The Pages host rejects any single file above 25 MiB, which three copies of the
 * ONNX Runtime binaries and one unused video sample blow past. Those binaries are
 * uploaded to object storage instead, and `lib/engine/remote-assets.ts` points
 * onnxruntime-web at that origin, so the local copies must not ship.
 *
 * Anything oversized that this script does not recognise is a build failure: the
 * deploy would reject it anyway, and failing here names the file.
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'out');
const LIMIT = 25 * 1024 * 1024;

/** `.env.production` is read here because postbuild does not run under Next. */
function readAssetBase() {
  if (process.env.NEXT_PUBLIC_ASSET_BASE) return process.env.NEXT_PUBLIC_ASSET_BASE.trim();
  for (const name of ['.env.production', '.env.local', '.env']) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      const m = /^\s*NEXT_PUBLIC_ASSET_BASE\s*=\s*(.+?)\s*$/.exec(line);
      if (m) return m[1].replace(/^["']|["']$/g, '');
    }
  }
  return '';
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const base = readAssetBase();
const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;

if (!fs.existsSync(outDir)) {
  console.error('[prune-assets] out/ not found — run next build first');
  process.exit(1);
}
fixWorkerExtensions();

/** Remote-hosted binaries: the whole vendored ORT dir, plus the copies Turbopack
 * emits next to the ORT bundles (only reachable when `wasmPaths` is unset, which
 * remote-assets.ts never allows). */
const isRemoteBinary = (file) => {
  const rel = path.relative(outDir, file).split(path.sep).join('/');
  if (rel.startsWith('ort/')) return true;
  if (rel.startsWith('_next/static/media/') && /^ort[\.-][^/]*\.(wasm|mjs)$/.test(path.basename(rel))) return true;
  return false;
};

/**
 * Turbopack emits module workers with their source extension, so
 * `stems.worker.ts` ships as `media/stems.worker.<hash>.ts`. Hosts map `.ts` to
 * a non-executable MIME type (here: video/mp2t) and Chrome refuses module
 * workers with it — the same failure that `.mjs` bundles had. The hashed
 * filename is referenced verbatim in the chunks, so renaming to `.js` plus a
 * literal swap of that one string fixes both sides (same length, no offsets).
 */
function fixWorkerExtensions() {
  const media = path.join(outDir, '_next', 'static', 'media');
  if (!fs.existsSync(media)) return;
  const renamed = [];
  for (const entry of fs.readdirSync(media)) {
    if (!entry.endsWith('.ts')) continue;
    fs.renameSync(path.join(media, entry), path.join(media, entry.slice(0, -3) + '.js'));
    renamed.push([entry, entry.slice(0, -3) + '.js']);
  }
  if (!renamed.length) return;
  const chunkDirs = [media, path.join(outDir, '_next', 'static', 'chunks')];
  for (const dir of chunkDirs) {
    for (const file of walk(dir)) {
      if (!file.endsWith('.js')) continue;
      let src = fs.readFileSync(file, 'utf8');
      const before = src;
      for (const [from, to] of renamed) src = src.split(from).join(to);
      if (src !== before) fs.writeFileSync(file, src);
    }
  }
  for (const [from, to] of renamed) console.log(`[prune-assets] renamed media/${from} -> media/${to} (chunk refs patched)`);
}

const files = walk(outDir);
const removed = [];
let freed = 0;

for (const file of files) {
  const size = fs.statSync(file).size;
  // Binaries that onnxruntime-web fetches from object storage are dead weight
  // here even when they are under the cap — dropping them keeps the upload lean.
  if (isRemoteBinary(file) && base) {
    removed.push(file);
    freed += size;
    fs.rmSync(file, { force: true });
    continue;
  }
  if (size <= LIMIT) continue;
  if (!base) {
    console.error(
      `[prune-assets] ${path.relative(root, file)} is ${mb(size)} and NEXT_PUBLIC_ASSET_BASE is unset.\n` +
        '  Upload it to object storage and set NEXT_PUBLIC_ASSET_BASE (see .env.example).',
    );
    process.exit(1);
  }
  console.error(
    `[prune-assets] ${path.relative(root, file)} is ${mb(size)}, above the ${mb(LIMIT)} per-file cap, ` +
      'and is not served from object storage. Move it out of public/ or host it remotely.',
  );
  process.exit(1);
}

// Drop the now-empty vendored dir so the uploader has nothing to walk.
const ortDir = path.join(outDir, 'ort');
if (fs.existsSync(ortDir) && fs.readdirSync(ortDir).length === 0) fs.rmSync(ortDir, { recursive: true, force: true });

console.log(
  `[prune-assets] ${removed.length} remote-hosted file(s) dropped from out/ (${mb(freed)}), served from ${base || 'public/'}`,
);

/** Report the remaining headroom so a future asset does not surprise the deploy. */
const largest = walk(outDir)
  .map((f) => ({ f, size: fs.statSync(f).size }))
  .sort((a, b) => b.size - a.size)
  .slice(0, 3);
if (largest.length) {
  console.log(
    `[prune-assets] largest shipped files: ${largest
      .map(({ f, size }) => `${path.relative(outDir, f)} ${mb(size)}`)
      .join(', ')}`,
  );
}
