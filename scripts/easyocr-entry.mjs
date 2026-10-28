import * as ort from 'onnxruntime-web';
import * as easy from '@qduc/easyocr-web';

// This bundle resolves both imports to EasyOCR's ONNX Runtime 1.30.0.
ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.30.0/dist/';
ort.env.wasm.numThreads = 1;
export { easy };
