const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// Run the actual painter's effects and pointer handlers with a small raster canvas.
function mountPainter() {
  const effects = [], images = [], masks = [];
  let pixels = new Uint8ClampedArray(100 * 100 * 4);
  let start, end, circle;
  const ctx = {
    clearRect() { pixels.fill(0); },
    drawImage() { pixels.fill(255); }, // An opaque source must never enter the mask.
    beginPath() {},
    moveTo(x, y) { start = { x, y }; },
    lineTo(x, y) { end = { x, y }; },
    arc(x, y, r) { circle = { x, y, r }; },
    fill() { raster(circle, circle, circle.r); },
    stroke() { raster(start, end, this.lineWidth / 2); },
    getImageData() { return { data: pixels }; },
  };
  function raster(a, b, radius) {
    const dx = b.x - a.x, dy = b.y - a.y;
    for (let y = 0; y < 100; y++) for (let x = 0; x < 100; x++) {
      const t = dx || dy ? Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / (dx * dx + dy * dy))) : 0;
      if (Math.hypot(x - a.x - t * dx, y - a.y - t * dy) <= radius) pixels[(y * 100 + x) * 4 + 3] = 255;
    }
  }
  const canvas = {
    width: 100, height: 100,
    getContext: () => ctx,
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 200 }),
    setPointerCapture() {}, hasPointerCapture: () => true, releasePointerCapture() {},
  };
  const jsx = (type, props) => ({ type, props });
  const exports = {};
  const source = fs.readFileSync('components/demo/InputPanel.tsx', 'utf8') + '\nexport { MaskCanvas };';
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    exports,
    require(name) {
      if (name === 'react') return {
        useRef: (value) => ({ current: value }),
        useState: (value) => [value, () => {}],
        useEffect: (effect) => effects.push(effect),
      };
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
      return {};
    },
    Image: class {
      naturalWidth = 100;
      naturalHeight = 100;
      constructor() { images.push(this); }
    },
  });
  const tree = exports.MaskCanvas({ src: 'opaque.png', brush: 4, maskKey: 0, onMask: (mask) => masks.push(mask) });
  const props = tree.props.children.find((child) => child.type === 'canvas').props;
  props.ref.current = canvas;
  const cleanup = effects[0]();
  const event = (x, y) => ({ clientX: x * 2, clientY: y * 2, currentTarget: canvas, pointerId: 1, isPrimary: true, button: 0 });
  return { props, images, masks, event, cleanup, reset: effects[0] };
}

test('opaque image stays outside mask; sparse pointer moves form a continuous stroke', () => {
  const p = mountPainter();
  p.images[0].onload();
  assert.equal(p.masks.at(-1).some(Boolean), false);
  p.props.onPointerDown(p.event(20, 50));
  p.props.onPointerMove(p.event(80, 50));
  p.props.onPointerUp(p.event(80, 50));
  const mask = p.masks.at(-1);
  for (let x = 20; x <= 80; x++) assert.equal(mask[50 * 100 + x], 1);
  assert.equal(mask[0], 0);
  assert.equal(mask[99 * 100 + 99], 0);
  assert(mask.reduce((sum, value) => sum + value, 0) < 1000);
});

test('cancel commits a stroke and the next stroke does not connect to it', () => {
  const p = mountPainter();
  p.images[0].onload();
  p.props.onPointerDown(p.event(20, 20));
  p.props.onPointerCancel();
  p.props.onPointerDown(p.event(80, 80));
  p.props.onPointerUp(p.event(80, 80));
  assert.equal(p.masks.at(-1)[20 * 100 + 20], 1);
  assert.equal(p.masks.at(-1)[80 * 100 + 80], 1);
  assert.equal(p.masks.at(-1)[50 * 100 + 50], 0);
});

test('reset clears mask immediately and ignores a stale image load', () => {
  const p = mountPainter();
  p.images[0].onload();
  p.props.onPointerDown(p.event(20, 20));
  p.props.onPointerUp(p.event(20, 20));
  p.cleanup();
  p.reset();
  assert.equal(p.masks.at(-1).some(Boolean), false);
  const count = p.masks.length;
  p.images[0].onload();
  assert.equal(p.masks.length, count);
  p.props.onPointerDown(p.event(20, 20));
  p.props.onPointerUp(p.event(20, 20));
  assert.equal(p.masks.at(-1).some(Boolean), false);
});
