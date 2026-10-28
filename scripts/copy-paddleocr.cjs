/** Preserve the SDK's prebuilt worker instead of rebundling it with Next. */
const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'node_modules/@paddleocr/paddleocr-js/dist');
const destination = path.join(root, 'public/paddleocr');
fs.mkdirSync(destination, { recursive: true });
fs.cpSync(path.join(source, 'assets'), path.join(destination, 'assets'), { recursive: true });
esbuild.buildSync({
  entryPoints: [path.join(source, 'index.mjs')],
  outfile: path.join(destination, 'index.mjs'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  // OpenCV contains unreachable Node-only branches. Browser/worker execution
  // does not use these builtins; leave them out of the browser bundle.
  external: ['fs', 'path', 'crypto'],
  minify: true,
});
console.log('[copy-paddleocr] Browser SDK and official worker copied to public/paddleocr');
