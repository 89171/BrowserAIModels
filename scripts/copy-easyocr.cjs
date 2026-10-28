/** Bundle EasyOCR and its own ORT version separately from Next's runtime. */
const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const root = path.resolve(__dirname, '..');
const destination = path.join(root, 'public/easyocr');
fs.mkdirSync(destination, { recursive: true });
esbuild.buildSync({
  entryPoints: [path.join(root, 'scripts/easyocr-entry.mjs')],
  // Emit .js, not .mjs: EdgeOne Pages serves .mjs as application/octet-stream,
  // and Chrome refuses to execute ES modules with a non-JS MIME type.
  outfile: path.join(destination, 'index.js'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  alias: { 'onnxruntime-web': path.join(root, 'node_modules/@qduc/easyocr-web/node_modules/onnxruntime-web') },
  external: ['fs', 'path', 'crypto'],
  minify: true,
});
console.log('[copy-easyocr] Browser SDK copied to public/easyocr');
