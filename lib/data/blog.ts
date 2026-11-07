/**
 * Blog articles. Long-form content lives in TS (not the messages files) so the
 * locale JSON stays page-chrome only; the renderer in app/[locale]/blog walks
 * these blocks. Keep every number tied to a public source — posts are marketing
 * for the catalog, and a wrong benchmark figure here would undercut it.
 */

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'code'; label?: string; text: string }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { type: 'links'; items: { label: string; href: string }[] };

export interface BlogPost {
  slug: string;
  date: string; // ISO date, drives ordering and the displayed publish date
  tags: string[];
  i18n: {
    zh: { title: string; description: string; blocks: BlogBlock[] };
    en: { title: string; description: string; blocks: BlogBlock[] };
  };
}

const OXR_BENCH_TABLE = {
  zh: {
    head: ['基准榜单', 'OXR-1.0', '名次'],
    rows: [
      ['OmniDocBench', '97.18', '#1'],
      ['olmOCR-Bench', '87.84', '#1'],
      ['DocParsingBench', '87.76', '#1'],
    ],
  },
  en: {
    head: ['Benchmark', 'OXR-1.0', 'Rank'],
    rows: [
      ['OmniDocBench', '97.18', '#1'],
      ['olmOCR-Bench', '87.84', '#1'],
      ['DocParsingBench', '87.76', '#1'],
    ],
  },
};

const OXR_SPEED_TABLE = {
  zh: {
    caption: '单张 RTX PRO 6000 Blackwell（96GB），OmniDocBench 固定 100 页完整解析',
    head: ['模型', '100 页完整解析耗时'],
    rows: [
      ['OXR-1.0 (1.3B)', '101.0 秒'],
      ['OvisOCR2', '134.8 秒'],
      ['PaddleOCR-VL-1.6', '144.7 秒'],
      ['DeepSeek-OCR-2', '161.1 秒'],
      ['LightOnOCR-2-1B', '171.7 秒'],
      ['HunyuanOCR', '175.2 秒'],
      ['ABot-OCR', '217.3 秒'],
      ['MinerU2.5-Pro', '254.7 秒'],
    ],
  },
  en: {
    caption: 'Single RTX PRO 6000 Blackwell (96 GB), full parse of a fixed 100-page draw from OmniDocBench',
    head: ['Model', 'Time to fully parse 100 pages'],
    rows: [
      ['OXR-1.0 (1.3B)', '101.0 s'],
      ['OvisOCR2', '134.8 s'],
      ['PaddleOCR-VL-1.6', '144.7 s'],
      ['DeepSeek-OCR-2', '161.1 s'],
      ['LightOnOCR-2-1B', '171.7 s'],
      ['HunyuanOCR', '175.2 s'],
      ['ABot-OCR', '217.3 s'],
      ['MinerU2.5-Pro', '254.7 s'],
    ],
  },
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'browser-ai-runtime-comparison',
    date: '2026-11-07',
    tags: ['transformers.js', 'onnxruntime-web', 'webgpu', 'wasm', 'browser-ai'],
    i18n: {
      zh: {
        title: 'Transformers.js、ONNX Runtime、WebGPU，在浏览器里怎么分工',
        description:
          '本站演示页底下的推理栈不止一种：Transformers.js 管线、onnxruntime-web 裸会话、MediaPipe Tasks、几个专用 WASM 库，还有 WebGPU 和只在 Chromium 落地的 WebNN。按实际接线和踩过的坑记一下差别。',
        blocks: [
          {
            type: 'p',
            text: '点开本站任意一个演示页，浏览器做的事差不多：下载权重，把图片或音频变成张量，跑一次前向，再把结果画回画布。只在「跑一次前向」这步上，我们前后用了五六种方案。有的页面把 ONNX 权重交给 Transformers.js，有的直接建一个 onnxruntime-web 会话自己拼输入输出，还有的整个 SDK 是别人编译好的 WASM。这篇按实际接线记一下差别，顺带写上几个部署时卡过我们的坑，那些跟模型精度无关，但决定页面能不能打开。',
          },
          { type: 'h2', text: '先把这几样东西摆到不同层上' },
          {
            type: 'p',
            text: '把 Transformers.js、ONNX、WebGPU 放在一起比之前，得先说它们不在一个层面。ONNX 定的是权重文件怎么存、算子叫什么名字，onnxruntime-web 才是读这个文件并执行的东西，Transformers.js 又在它上面包了一层任务管线，WebGPU 和 WebAssembly 只管提供算力，完全不认识模型。本站四十多个演示任务里，这四层都在场。',
          },
          {
            type: 'table',
            caption: '按层次摆开，最后一列是本站用到的地方',
            head: ['层次', '代表', '负责什么', '本站'],
            rows: [
              ['模型格式', 'ONNX、GGUF、TFLite', '权重序列化与算子定义', '绝大多数是 ONNX'],
              ['推理运行时', 'onnxruntime-web、XNNPACK、TVM', '加载计算图，把算子调度到 CPU 或 GPU', 'ORT 的 wasm 与 webgpu 执行提供者'],
              ['任务级封装', 'Transformers.js、MediaPipe Tasks、TensorFlow.js', '预处理、推理、后处理打包成一个调用', 'pipeline() 和 FaceLandmarker 之类'],
              ['浏览器硬件 API', 'WebAssembly、WebGPU、WebNN', '给算力，不解析模型', 'numThreads、device、执行提供者都落到这层'],
            ],
          },
          {
            type: 'p',
            text: '选型时通常先问三件事：权重有没有现成的 ONNX 导出，前后处理要不要自己写，目标浏览器能拿到哪块芯片。速度反而是最后才测的，因为同一套权重在 WASM 和 WebGPU 上只差一个配置。',
          },
          { type: 'h2', text: 'Transformers.js 管的是整条管线' },
          {
            type: 'p',
            text: '一句 `pipeline()` 背后是下载权重、选 tokenizer 或 processor、推理、把 logits 变成标签，全都不用自己写。项目锁的是 `@huggingface/transformers` 4.3.x，运行时约 30 MB 的 ESM，第一次点运行才动态 import。每个 (repo, dtype, device) 组合的管线留在内存 Map 里，权重文件进 Cache Storage，所以第二次打开同一个模型，结果栏里下载字节数是 0。',
          },
          {
            type: 'p',
            text: '有两处必须手动钉住。onnxruntime-web 那二十几 MB 的 WASM 二进制要用 `env.backends.onnx.wasm.wasmPaths` 指到自己托管的目录，不设的话会回落到 jsDelivr CDN，国内访问很慢。模型仓库也一样，huggingface.co 连不通时会探测一次并切到 hf-mirror.com，否则页面会一直停在「下载权重」不动。',
          },
          {
            type: 'code',
            label: '本站加载管线的简化版',
            text: "const mod = await import('@huggingface/transformers');\nmod.env.allowLocalModels = false;\nmod.env.backends.onnx.wasm.wasmPaths = '/ort/';\n\nconst device = navigator.gpu ? 'webgpu' : 'wasm';\nconst dtype = device === 'webgpu' ? 'fp16' : 'q8';\nconst pipe = await mod.pipeline('image-classification', repo, { device, dtype });\nconst scores = await pipe(image);",
          },
          {
            type: 'p',
            text: '管线也有不好用的时候。做背景移除演示时，通用管线把 mask 先乘 255 转成 uint8 再放大，sigmoid 输出没顶到 0 和 1 两端，整个人就半透明。RMBG-1.4 的 config 里写的是 Segformer，BiRefNet 写的是 swin，照着解析会选错架构类。最后我们用 `model_type: \'custom\'` 和 `\'birefnet\'` 把两者钉成裸 ONNX 图，sigmoid、min-max、引导滤波、反溢色全部自己写，边缘才干净。这个演示页至今不走通用管线。',
          },
          { type: 'h2', text: '什么时候绕开管线，直接跑 ONNX 图' },
          {
            type: 'p',
            text: '本站直接建 ORT 会话的有 Silero VAD、MI-GAN 图像修复、HT-Demucs 分轨和上面那两个抠图模型。共同点是输出要自己解释，音频区间、软 alpha、分离后的波形，都不是「取 top-1 标签」能解决的。Silero v5 的 ONNX 图我们用 onnxruntime-node 实测过：`input` 是 `[1, 576]`，等于 64 个历史样本加 512 个新样本（16 kHz 下 32 毫秒），LSTM `state` 是 `[2, 1, 128]` 并要从 `stateN` 逐帧反馈，还有一个 int64 标量的 `sr`。按老教程直接喂 512 个样本，概率会一直贴着 0.001。',
          },
          {
            type: 'code',
            label: '裸会话与 Silero v5 的输入契约',
            text: "import * as ort from 'onnxruntime-web/wasm';\n\nort.env.wasm.numThreads = 1;   // 站点没有 COOP/COEP，只能单线程\nort.env.wasm.wasmPaths = '/ort/';\n\nconst session = await ort.InferenceSession.create(bytes, {\n  executionProviders: ['wasm'],\n  graphOptimizationLevel: 'disabled', // 大导出图上优化器会直接 abort\n});\n\nlet state = new ort.Tensor('float32', new Float32Array(256), [2, 1, 128]);\nconst sr = new ort.Tensor('int64', BigInt64Array.from([16000n]), []);\nconst res = await session.run({\n  input: new ort.Tensor('float32', frame576, [1, 576]),\n  state,\n  sr,\n});\nstate = res.stateN; // 下一帧接着用",
          },
          {
            type: 'p',
            text: '换 WebGPU 只要改导入路径和执行提供者数组。官方文档里几条注意事项比性能数字实用：很轻的模型用 WASM 反而二进制更小，graph capture 要求静态形状且所有 kernel 都在 WebGPU 上，留在 GPU 的张量得手动释放，不然显存一直涨。',
          },
          {
            type: 'code',
            label: '同一个权重切到 WebGPU 执行提供者',
            text: "import * as ort from 'onnxruntime-web/webgpu';\n\nconst session = await ort.InferenceSession.create(bytes, {\n  executionProviders: ['webgpu', 'wasm'],\n});",
          },
          { type: 'h2', text: "device: 'webgpu' 之后发生了什么" },
          {
            type: 'p',
            text: 'Transformers.js 的 `device: \'webgpu\'` 和 ORT 的 webgpu 执行提供者，最后都落到同一个 `navigator.gpu`。区别在算子 kernel 由谁给：ORT 把 ONNX 算子映射到预编译好的 WGSL kernel，WebLLM 和 MLC-LLM 则把模型提前用 TVM 编译成 web 运行时能直接吃的产物，配一个 OpenAI 风格的 chat 接口和 XGrammar 约束解码，专门伺候逐 token 生成。后者还有个好处，引擎跑在 Web Worker 里，解码不会卡住 UI。',
          },
          {
            type: 'p',
            text: '官方数字别照抄。Transformers.js v3 的公告写过 WebGPU 比 WASM 最多快 100 倍，那是小 encoder 上的上限；MLC 论文在 M3 Max、Chrome Canary 133、WebLLM 0.2.75 上测到 Llama-3.1-8B 约 41.1 tok/s、Phi-3.5-mini 约 71.1 tok/s，也是单台机器的厂商数据。本站结果栏只报这次实际下载的字节数和跑通的后端，不给速度承诺。',
          },
          {
            type: 'p',
            text: '真机上更常遇到的是 GPU 建图失败。我们在 `attemptLadder` 里排了四级：首选设备与精度，驱动编译不了 fp16 就同设备降 q8，再不行退到 wasm q8（免得把 90 MB 的 fp16 权重拖到 CPU 上），最后换一个更小的模型。`BiRefNet-lite-512` 标了 webgpuOnly，没 GPU 时整条退到 RMBG-1.4 的 q8 权重。GPU 失败会被记下来，同一会话里不再重试。',
          },
          {
            type: 'code',
            label: '降级阶梯（real.ts 的简化版）',
            text: "const gpu = !!navigator.gpu;\nconst steps = [\n  { device: gpu ? 'webgpu' : 'wasm' },\n  ...(gpu ? [\n    { device: 'webgpu', dtype: 'q8' },\n    { device: 'wasm', dtype: 'q8' },\n  ] : []),\n  { repo: 'briaai/RMBG-1.4', dtype: 'q8' },\n];\nfor (const step of steps) {\n  try { return await load(step); }\n  catch (e) { if (isGpuFailure(e)) rememberGpuFailure(step); }\n}",
          },
          { type: 'h2', text: 'WebAssembly 这一层其实用得最多' },
          {
            type: 'p',
            text: '所有浏览器都给 WASM，SIMD 也在，本站多数演示的最终落点就是它。除了 ORT 的 wasm 执行提供者，还有一批把整个任务编译好的库：Tesseract.js、PaddleOCR.js、EasyOCR.js 做 OCR，RNNoise 做降噪，MediaPipe Tasks 的人脸、姿态、手部、物体关键点走 XNNPACK。它们自带任务级 API 和自己的 WASM 资产，拿来就能用，代价是输出格式由对方定。',
          },
          {
            type: 'p',
            text: '部署时先卡住的不是算力，是文件。带 worker 资产的 SDK 必须和页面同源，挪到对象存储就加载不到 worker，PaddleOCR 那套我们只能整个自托管。EdgeOne Pages 按扩展名发 MIME，`.mjs` 会被发成 `application/octet-stream`，`.ts` 更离谱，是 `video/mp2t`；Chrome 对 ES module 和 module worker 强制校验 MIME，于是动态加载的 SDK 一律打成 `.js`，Turbopack 按源文件扩展名 emit 出来的 worker 文件也得在 postbuild 改名并修掉 chunk 里的引用。还有个更隐蔽的：平台没给 COOP/COEP，`crossOriginIsolated` 是 false，SharedArrayBuffer 拿不到，ORT 只能单线程，那些 pthread worker 分支全是死代码。上面代码里 `numThreads = 1` 就是这么来的。',
          },
          { type: 'h2', text: '还有几套本站没上的' },
          {
            type: 'ul',
            items: [
              'TensorFlow.js 有自己的模型格式和 layers API，WebGL 与 WebGPU 后端都在，从训模型开始就在 JS 里做比较顺；手上是 Hugging Face 的 ONNX 权重就得再转一道',
              'wllama 把 llama.cpp 编到 WASM，GGUF 权重直接跑，CPU 上 SIMD，模型兼容性最好，但没有 GPU 加速',
              'WebNN 是给 NPU 的整图 API，ORT 已经把它做成执行提供者，Chrome/Edge 里还得开 flag 或走 Origin Trial，那篇单独写过',
              '近几个版本的 Chrome 内置了 Gemini Nano，`window.LanguageModel` 这类 API 连权重都不用自己下，只是可用设备和版本有限，模型也不能换',
            ],
          },
          { type: 'h2', text: '新加一个任务时怎么定' },
          {
            type: 'table',
            caption: '本站几个任务最后落在哪套栈上',
            head: ['任务', '用的方案', '原因'],
            rows: [
              ['分类、嵌入、ASR、翻译', 'Transformers.js pipeline 加 ONNX 权重', '一条调用带完 tokenizer 与前后处理，device 和 dtype 各改一行就能换后端'],
              ['抠图、VAD、音轨分离、图像修复', 'onnxruntime-web 裸会话', '软 alpha、语音区间、logits 的 sigmoid 都得自己算'],
              ['人脸、姿态、手、物体关键点', 'MediaPipe Tasks', '任务级 API 和 WASM 资产现成，实时帧率稳'],
              ['OCR、降噪', 'Tesseract.js / PaddleOCR.js / RNNoise', '成熟任务不值得复刻前后处理'],
              ['聊天生成', '本站没上，WebLLM 或 MLC 更合适', '几 GB 权重首次下载，演示页等不起'],
              ['常驻低功耗推理', 'WebNN 执行提供者，见专文', '要等 Chromium 之外也实现'],
            ],
          },
          {
            type: 'p',
            text: '这几套栈在本站是并存的，同一个页面里可能 MediaPipe 出关键点、Transformers.js 跑分类、ORT 裸会话算 alpha。真要加新任务，先去目录里看有没有现成的 ONNX 权重和任务级管线，有就接上；输出需要自己解释，再考虑直接建会话。每次推理实际用了哪个后端、下了多少字节，结果栏里都写着，比任何选型表可靠。',
          },
          { type: 'links', items: [
            { label: 'Transformers.js 文档', href: 'https://huggingface.co/docs/transformers.js/index' },
            { label: 'ONNX Runtime Web · WebGPU 执行提供者文档', href: 'https://onnxruntime.ai/docs/tutorials/web/ep-webgpu.html' },
            { label: 'WebLLM 项目文档', href: 'https://webllm.mlc.ai/' },
            { label: 'MediaPipe Tasks Vision 文档', href: 'https://ai.google.dev/edge/mediapipe/solutions/vision/object_detector/web_js' },
            { label: '演示 · 语音活动检测（裸 ONNX 会话）', href: '/demos/audio/vad' },
            { label: '演示 · 背景移除（自己写后处理）', href: '/demos/vision/background-removal' },
            { label: '演示 · 姿态关键点（MediaPipe Tasks）', href: '/demos/real-time/pose' },
            { label: '演示 · OCR（专用 WASM 库）', href: '/demos/vision/ocr' },
            { label: '演示 · 图像分类（Transformers.js 管线）', href: '/demos/vision/image-classification' },
            { label: '博客 · WebNN 现在能在浏览器里做什么', href: '/blog/webnn-browser-neural-network-inference' },
            { label: '博客 · 在浏览器里跑大模型', href: '/blog/in-browser-llm-size-tradeoffs' },
          ] },
        ],
      },
      en: {
        title: 'What Transformers.js, ONNX Runtime Web and WebGPU each do in a browser',
        description:
          'The demos on this site do not all use one runtime: Transformers.js pipelines, raw onnxruntime-web sessions, MediaPipe Tasks, a few purpose-built WASM libraries, plus WebGPU and the WebNN EP. Notes on how they differ, from the code we actually shipped.',
        blocks: [
          {
            type: 'p',
            text: 'Open any demo on this site and the browser does roughly the same thing: download weights, turn an image or an audio clip into tensors, run one forward pass, draw the result back onto a canvas. For that one forward pass we have used five or six different setups. Some pages hand ONNX weights to Transformers.js, some open an onnxruntime-web session and assemble the inputs themselves, and some ship an SDK that someone else compiled to WASM. These are notes on how the wiring differs, plus a few deployment problems that blocked us along the way. None of them have anything to do with model accuracy, but they decide whether the page loads at all.',
          },
          { type: 'h2', text: 'These pieces sit at different layers' },
          {
            type: 'p',
            text: 'Before comparing Transformers.js, ONNX and WebGPU side by side, it helps to notice they are not the same kind of thing. ONNX defines how weights are stored and what operators are called. onnxruntime-web is the thing that reads that file and executes it. Transformers.js wraps a task pipeline on top. WebGPU and WebAssembly only supply compute and know nothing about models. All four layers show up across the forty-odd demos here.',
          },
          {
            type: 'table',
            caption: 'The stack by layer, with what this site uses in the last column',
            head: ['Layer', 'Examples', 'What it does', 'Here'],
            rows: [
              ['Model format', 'ONNX, GGUF, TFLite', 'Weight serialisation and operator names', 'Almost everything is ONNX'],
              ['Inference runtime', 'onnxruntime-web, XNNPACK, TVM', 'Loads the graph, dispatches operators to CPU or GPU', 'ORT wasm and webgpu execution providers'],
              ['Task-level wrapper', 'Transformers.js, MediaPipe Tasks, TensorFlow.js', 'Packs pre-processing, inference and post-processing into one call', 'pipeline() and FaceLandmarker'],
              ['Browser hardware API', 'WebAssembly, WebGPU, WebNN', 'Supplies compute, does not parse models', 'numThreads, device and execution providers land here'],
            ],
          },
          {
            type: 'p',
            text: 'When we pick one, the first questions are whether an ONNX export already exists, who writes the pre- and post-processing, and which chip the target browser can reach. Speed comes last, because the same weights on WASM and WebGPU are one configuration change apart.',
          },
          { type: 'h2', text: 'Transformers.js owns the whole pipeline' },
          {
            type: 'p',
            text: 'One `pipeline()` call covers downloading weights, picking the tokenizer or processor, running inference and turning logits into labels. The project pins `@huggingface/transformers` 4.3.x. Its runtime is about 30 MB of ESM and is imported only on the first run. Each (repo, dtype, device) combination stays in an in-memory Map while the files live in Cache Storage, so opening the same model a second time reports zero downloaded bytes in the results panel.',
          },
          {
            type: 'p',
            text: 'Two things have to be pinned by hand. The onnxruntime-web WASM binaries, a couple dozen MB, need `env.backends.onnx.wasm.wasmPaths` pointed at a directory we host; leave it unset and they come from the jsDelivr CDN, which is slow from China. The model hub is similar: when huggingface.co is unreachable we probe once and switch to hf-mirror.com, otherwise the page sits on "downloading weights" forever with no error.',
          },
          {
            type: 'code',
            label: 'A trimmed version of how we load a pipeline',
            text: "const mod = await import('@huggingface/transformers');\nmod.env.allowLocalModels = false;\nmod.env.backends.onnx.wasm.wasmPaths = '/ort/';\n\nconst device = navigator.gpu ? 'webgpu' : 'wasm';\nconst dtype = device === 'webgpu' ? 'fp16' : 'q8';\nconst pipe = await mod.pipeline('image-classification', repo, { device, dtype });\nconst scores = await pipe(image);",
          },
          {
            type: 'p',
            text: 'The wrapper also gets in the way sometimes. On the background-removal demo, the generic pipeline multiplies the mask by 255 and casts to uint8 before resizing. When the sigmoid output does not reach either end of 0..1, the subject turns semi-transparent. RMBG-1.4 ships a config that declares Segformer and BiRefNet declares swin, so the pipeline resolves to the wrong architecture class. We pinned both to plain ONNX graphs with `model_type: \'custom\'` and `\'birefnet\'`, then wrote the sigmoid, min-max, guided filter and colour decontamination ourselves. That demo still bypasses the generic pipeline.',
          },
          { type: 'h2', text: 'When we skip the pipeline and run the ONNX graph' },
          {
            type: 'p',
            text: 'Silero VAD, MI-GAN inpainting, HT-Demucs source separation and both matting models open an ORT session directly. What they share is that the output needs interpreting: speech ranges, a soft alpha, separated waveforms, none of which is a top-1 label. We measured the Silero v5 graph with onnxruntime-node first. `input` is `[1, 576]`, which is 64 samples of history plus 512 new ones (32 ms at 16 kHz); the LSTM `state` is `[2, 1, 128]` and has to be fed back from `stateN` every frame; there is also an int64 scalar `sr`. Feed it 512 samples as the older tutorials do and the probability sits at 0.001 the whole way through.',
          },
          {
            type: 'code',
            label: 'A raw session and the Silero v5 input contract',
            text: "import * as ort from 'onnxruntime-web/wasm';\n\nort.env.wasm.numThreads = 1;   // no COOP/COEP on this host, single thread only\nort.env.wasm.wasmPaths = '/ort/';\n\nconst session = await ort.InferenceSession.create(bytes, {\n  executionProviders: ['wasm'],\n  graphOptimizationLevel: 'disabled', // the optimiser aborts on large exported graphs\n});\n\nlet state = new ort.Tensor('float32', new Float32Array(256), [2, 1, 128]);\nconst sr = new ort.Tensor('int64', BigInt64Array.from([16000n]), []);\nconst res = await session.run({\n  input: new ort.Tensor('float32', frame576, [1, 576]),\n  state,\n  sr,\n});\nstate = res.stateN; // reuse on the next frame",
          },
          {
            type: 'p',
            text: 'Switching to WebGPU is an import path and an execution provider array. A few notes in the official docs matter more than the benchmarks: for very light models the WASM binary is smaller, graph capture needs static shapes with every kernel on WebGPU, and GPU-resident tensors must be disposed by hand or memory keeps climbing.',
          },
          {
            type: 'code',
            label: 'Same weights, WebGPU execution provider',
            text: "import * as ort from 'onnxruntime-web/webgpu';\n\nconst session = await ort.InferenceSession.create(bytes, {\n  executionProviders: ['webgpu', 'wasm'],\n});",
          },
          { type: 'h2', text: "What happens after device: 'webgpu'" },
          {
            type: 'p',
            text: 'The `device: \'webgpu\'` option in Transformers.js and the webgpu execution provider in ORT both end up at the same `navigator.gpu`. The difference is who supplies the operator kernels. ORT maps ONNX operators to prebuilt WGSL kernels. WebLLM and MLC-LLM compile the model ahead of time with TVM into artifacts their web runtime consumes, then add an OpenAI-shaped chat API and XGrammar-constrained decoding for token-by-token generation. Their engine runs in a Web Worker, so decoding does not block the UI.',
          },
          {
            type: 'p',
            text: 'Do not copy the headline numbers. The Transformers.js v3 announcement quotes up to 100x over WASM, a ceiling measured on small encoders. The MLC paper reports about 41.1 tokens/s for Llama-3.1-8B and 71.1 for Phi-3.5-mini on an M3 Max with Chrome Canary 133 and WebLLM 0.2.75, which is one machine and figures from the vendor itself. Our results panel reports the bytes actually downloaded and the backend that worked, and makes no speed claim.',
          },
          {
            type: 'p',
            text: 'On real hardware the more common failure is that the GPU cannot build the graph. `attemptLadder` has four steps: the preferred device and dtype, the same device at q8 when a driver cannot compile the fp16 graph, wasm at q8 so a 90 MB fp16 download does not land on a CPU pipeline, and finally a smaller model. `BiRefNet-lite-512` is marked webgpuOnly and falls all the way back to the q8 weights of RMBG-1.4. GPU failures are remembered so the same session stops retrying them.',
          },
          {
            type: 'code',
            label: 'The fallback ladder, simplified from real.ts',
            text: "const gpu = !!navigator.gpu;\nconst steps = [\n  { device: gpu ? 'webgpu' : 'wasm' },\n  ...(gpu ? [\n    { device: 'webgpu', dtype: 'q8' },\n    { device: 'wasm', dtype: 'q8' },\n  ] : []),\n  { repo: 'briaai/RMBG-1.4', dtype: 'q8' },\n];\nfor (const step of steps) {\n  try { return await load(step); }\n  catch (e) { if (isGpuFailure(e)) rememberGpuFailure(step); }\n}",
          },
          { type: 'h2', text: 'WebAssembly is the layer we use most' },
          {
            type: 'p',
            text: 'Every browser has WASM and SIMD is available, so most demos here end up on it. Alongside the ORT wasm provider there are libraries that compile a whole task: Tesseract.js, PaddleOCR.js and EasyOCR.js for OCR, RNNoise for denoising, and MediaPipe Tasks for face, pose, hand and object landmarks through XNNPACK. Each brings its own task-level API and its own WASM assets, which is convenient until you need an output shape it does not offer.',
          },
          {
            type: 'p',
            text: 'Deployment trips over files before compute. An SDK that ships worker assets has to be same-origin, so PaddleOCR is hosted with the page rather than on object storage. EdgeOne Pages assigns MIME types by extension: `.mjs` comes back as `application/octet-stream` and `.ts` as `video/mp2t`. Chrome validates MIME types strictly for ES modules and module workers, so every dynamically loaded SDK is packaged as `.js`, and the worker files Turbopack emits under their source extension get renamed in postbuild along with the chunk references. There is a quieter one too: without COOP/COEP the page is not cross-origin isolated, SharedArrayBuffer is unavailable, ORT stays single-threaded and those pthread worker branches are dead code. That is why `numThreads = 1` appears above.',
          },
          { type: 'h2', text: 'A few stacks we did not ship' },
          {
            type: 'ul',
            items: [
              'TensorFlow.js has its own model format and layers API with WebGL and WebGPU backends. It fits a project that trains in JS from the start; starting from ONNX weights on the Hub means another conversion',
              'wllama compiles llama.cpp to WASM and runs GGUF weights directly, SIMD on CPU, the broadest model compatibility and no GPU acceleration',
              'WebNN is the whole-graph API aimed at NPUs, already an execution provider in ORT, but still behind a flag or an Origin Trial in Chrome and Edge. There is a separate post on it',
              'Recent Chrome versions ship Gemini Nano, exposed through APIs such as `window.LanguageModel`, so no weights to download at all, at the cost of limited devices and a model you cannot swap',
            ],
          },
          { type: 'h2', text: 'How we decide for a new task' },
          {
            type: 'table',
            caption: 'Where several of our tasks ended up',
            head: ['Task', 'Stack', 'Why'],
            rows: [
              ['Classification, embeddings, ASR, translation', 'Transformers.js pipeline with ONNX weights', 'One call covers the tokenizer and post-processing; device and dtype are one line each'],
              ['Matting, VAD, source separation, inpainting', 'Raw onnxruntime-web session', 'Soft alpha, speech ranges and sigmoid on logits all need custom handling'],
              ['Face, pose, hand and object landmarks', 'MediaPipe Tasks', 'Task API and WASM assets ready to use, steady frame rates'],
              ['OCR and denoising', 'Tesseract.js / PaddleOCR.js / RNNoise', 'Mature tasks, no reason to rebuild their pre-processing'],
              ['Chat generation', 'Not shipped here; WebLLM or MLC fits better', 'Several GB on first load is too long for a demo page'],
              ['Always-on low-power inference', 'WebNN execution provider, see the dedicated post', 'Waiting on implementations outside Chromium'],
            ],
          },
          {
            type: 'p',
            text: 'These stacks coexist here. One page can take landmarks from MediaPipe, run classification through Transformers.js and compute an alpha in a raw ORT session. For a new task we check the catalogue first for an ONNX export and a task-level pipeline, and only open a session directly when the output needs its own interpretation. The results panel shows which backend ran and how many bytes were downloaded, which is more reliable than any comparison table.',
          },
          { type: 'links', items: [
            { label: 'Transformers.js documentation', href: 'https://huggingface.co/docs/transformers.js/index' },
            { label: 'ONNX Runtime Web · WebGPU execution provider', href: 'https://onnxruntime.ai/docs/tutorials/web/ep-webgpu.html' },
            { label: 'WebLLM documentation', href: 'https://webllm.mlc.ai/' },
            { label: 'MediaPipe Tasks Vision documentation', href: 'https://ai.google.dev/edge/mediapipe/solutions/vision/object_detector/web_js' },
            { label: 'Demo · Voice activity detection (raw ONNX session)', href: '/demos/audio/vad' },
            { label: 'Demo · Background removal (custom post-processing)', href: '/demos/vision/background-removal' },
            { label: 'Demo · Pose landmarks (MediaPipe Tasks)', href: '/demos/real-time/pose' },
            { label: 'Demo · OCR (purpose-built WASM libraries)', href: '/demos/vision/ocr' },
            { label: 'Demo · Image classification (Transformers.js pipeline)', href: '/demos/vision/image-classification' },
            { label: 'Post · What WebNN can do in a browser today', href: '/blog/webnn-browser-neural-network-inference' },
            { label: 'Post · Running an LLM in the browser', href: '/blog/in-browser-llm-size-tradeoffs' },
          ] },
        ],
      },
    },
  },
  {
    slug: 'detection-to-matte',
    date: '2026-11-07',
    tags: ['vision', 'detection', 'segmentation', 'background-removal'],
    i18n: {
      zh: {
        title: '从 YOLO 的框到 RMBG 的软 alpha',
        description:
          'vision 分类下最小的检测模型 2.5 MiB，抠图模型能到 93.9 MiB。差出来的三十多倍体积买了什么，把三个演示页的输出放在一起看比较清楚。',
        blocks: [
          {
            type: 'p',
            text: '我们做背景移除演示时，试过直接把整张照片送进 RMBG，慢，而且边缘会留一圈背景色。后来改成先检测出人、把框内裁出来再跑分割，速度立刻好看了。`vision` 分类下的 detection、segmentation、background-removal，差不多就是这个顺序：先定位，再逐像素判断，最后算带软边的 alpha。',
          },
          { type: 'h2', text: '先说检测，2.5 MiB 能到什么程度' },
          {
            type: 'p',
            text: 'YOLOv10n 只有 2.5 MiB，浏览器里跑实时没问题，是默认会选的那个。RT-DETR R18 大概 20.0 MiB，把 NMS 换成了 Transformer 解码器，人挤人的画面里框更稳。移动端可以看看 MediaPipe Object Detection，6.9 MiB 左右，专门调过。',
          },
          {
            type: 'p',
            text: '两个滑杆比模型选型更影响观感。置信度阈值调低，密集场景里的行人才不会漏；NMS IoU 调低，同一个人不会同时顶着三个框。演示页里可以直接拖着看。',
          },
          { type: 'h2', text: '分割输出的是每个像素的归属' },
          {
            type: 'p',
            text: '分割接着判断框里每个像素算前景还是背景。要实时换背景，MediaPipe Selfie 的 0.2 MiB 就够了；嫌边缘糙，可以换 U²-Netp（4.4 MiB）或 MODNet（6.3 MiB）。SAM Tiny 约 13.1 MiB，用法不太一样：给它一个点或者一个框当提示，它分出你指的那个东西，不需要事先定好类别。',
          },
          {
            type: 'p',
            text: '这类模型吐出来的经常是二值图，或者分辨率很低的概率图。拿去直接放大，边缘就是一圈锯齿。',
          },
          { type: 'h2', text: '抠图要的是 0 到 1 之间的数' },
          {
            type: 'p',
            text: '发丝、纱料、运动模糊这些地方没法用「是前景 / 不是前景」来回答，得给每个像素一个 0 到 1 的值。RMBG-1.4 的 int8 权重约 42.3 MiB，fp16 翻倍到 84 MiB 上下；BiRefNet-lite 512 约 93.9 MiB，边缘细一些，下载也明显久一些。',
          },
          {
            type: 'p',
            text: '拿到模型输出还没完。BiRefNet 给的是原始 logits，实测范围能到 -18 到 +19，得先过 sigmoid；RMBG 那边出来的是 0 到 1 的概率。之后按 sigmoid → min-max → 引导滤波 → levels → 双线性放大 → 反溢色的顺序做后处理，feather 和 thresh 两个滑杆分别管羽化和黑白场。最后那步专治开头说的那圈背景色。边缘上这两三个像素的差别，比榜单上 IoU 差几个点更看得出来。',
          },
          {
            type: 'table',
            caption: '几个代表模型的实测体积',
            head: ['级别', '代表模型', '输出', '实测体积'],
            rows: [
              ['检测', 'YOLOv10n', '框 + 类别 + 置信度', '~2.5 MiB'],
              ['检测', 'RT-DETR R18', '端到端框（无 NMS）', '~20.0 MiB'],
              ['分割', 'MediaPipe Selfie', '前景概率图', '~0.2 MiB'],
              ['分割', 'MODNet', '前景蒙版（人像）', '~6.3 MiB'],
              ['分割', 'SAM Tiny', '提示式蒙版', '~13.1 MiB'],
              ['抠图', 'RMBG-1.4', '软 alpha', '~42.3 MiB（int8）'],
              ['抠图', 'BiRefNet-lite 512', '软 alpha（更精细）', '~93.9 MiB'],
            ],
          },
          { type: 'h2', text: '先裁后分割' },
          {
            type: 'code',
            label: '裁出框内区域，再把蒙版贴回去',
            text: "// 检测给出 box，只把框内区域送进分割模型，省掉整图推理\nconst crop = cropToBox(frame, box);\nconst mask = await segmenter(crop);\n\n// 局部蒙版按 box 贴回原图尺寸\ncomposeMask(mask, box, frame.width, frame.height);\n\n// 软 alpha：sigmoid → 引导滤波羽化 → levels → 反溢色",
          },
          {
            type: 'p',
            text: '整张 1080p 送进分割模型，和把 200×300 的人像裁出来送进去，耗时差一个数量级，抠出来的边缘看不出区别。这个改动是我们在演示页里做的第一个优化，代价只是一次检测。',
          },
          { type: 'h2', text: '几个演示页连着看' },
          {
            type: 'ul',
            items: [
              '只想知道画面里有几个人、在哪儿，用检测就够了',
              '换背景、做背景虚化，0.2 到 6 MiB 的轻量分割够用',
              '要把人合成到另一张图上，或者边缘要拿去印刷，就得上 RMBG / BiRefNet 的软 alpha',
              '目标类别不固定、想点哪儿抠哪儿，SAM Tiny 这类提示式分割才对路',
            ],
          },
          {
            type: 'p',
            text: '三个演示页用的是同一批样例图，可以挨个点过去对比输出。',
          },
          { type: 'links', items: [
            { label: '本站演示 · 目标检测', href: '/demos/vision/detection' },
            { label: '本站演示 · 语义分割', href: '/demos/vision/segmentation' },
            { label: '本站演示 · 背景移除', href: '/demos/vision/background-removal' },
            { label: '模型详情 · YOLOv10n', href: '/vision/detection/yolov10n' },
            { label: '模型详情 · SAM Tiny', href: '/vision/segmentation/sam-tiny' },
            { label: '模型详情 · RMBG-1.4', href: '/vision/segmentation/rmbg-1-4' },
            { label: '模型详情 · BiRefNet-lite 512', href: '/vision/background-removal/birefnet-lite-512' },
            { label: 'GitHub · facebookresearch/segment-anything', href: 'https://github.com/facebookresearch/segment-anything' },
            { label: '模型卡 · RMBG-1.4', href: 'https://huggingface.co/briaai/RMBG-1.4' },
          ] },
        ],
      },
      en: {
        title: 'From a YOLO box to a soft alpha',
        description:
          'The smallest detector in our vision category is 2.5 MiB; the largest matting model is 93.9 MiB. Running the three demos side by side shows what the extra weight changes in the output.',
        blocks: [
          {
            type: 'p',
            text: 'When we built the background-removal demo, the first version fed the whole photo to RMBG. It was slow and left a rim of background colour along the edge. Cropping the person first fixed both. The three subcategories under `vision` follow roughly that order: locate, label every pixel, then compute an alpha with soft edges.',
          },
          { type: 'h2', text: 'Detection, and what 2.5 MiB gets you' },
          {
            type: 'p',
            text: 'YOLOv10n is 2.5 MiB and runs in real time in a tab, so it is the one we reach for first. RT-DETR R18 is about 20.0 MiB and swaps NMS for a Transformer decoder, which holds up better in crowded frames. For phones, MediaPipe Object Detection is around 6.9 MiB and tuned for them.',
          },
          {
            type: 'p',
            text: 'The two sliders matter more than the model choice. Drop the confidence threshold and pedestrians stop disappearing in a crowd; drop the NMS IoU and one person stops wearing three boxes. Both are live in the demo.',
          },
          { type: 'h2', text: 'Segmentation labels every pixel' },
          {
            type: 'p',
            text: 'Segmentation decides, for each pixel inside the box, foreground or background. MediaPipe Selfie at 0.2 MiB is enough for a real-time background swap. U²-Netp (4.4 MiB) and MODNet (6.3 MiB) give cleaner edges. SAM Tiny, about 13.1 MiB, works differently: give it a point or a box as a prompt and it segments the object you pointed at, with no fixed class list.',
          },
          {
            type: 'p',
            text: 'What comes out is usually a binary mask or a low-resolution probability map. Upscale it directly and the edge turns into a staircase.',
          },
          { type: 'h2', text: 'Matting needs values between 0 and 1' },
          {
            type: 'p',
            text: 'Hair, sheer fabric and motion blur cannot be answered with foreground or not. Each pixel needs a number between 0 and 1. RMBG-1.4 is about 42.3 MiB as int8 and roughly double as fp16; BiRefNet-lite 512 is about 93.9 MiB, finer at the edges and slower to download.',
          },
          {
            type: 'p',
            text: 'The model output is not the end of it. BiRefNet emits raw logits, from about -18 to +19 in our measurements, so those go through sigmoid first; RMBG already returns a 0..1 probability. Then comes our chain: sigmoid, min-max, guided filter, levels, bilinear upscale, decontamination. The feather and thresh sliders control the guided filter and the black and white points. That last step removes the colour rim from the first paragraph. A couple of pixels of edge matter more here than a few points of IoU on a leaderboard.',
          },
          {
            type: 'table',
            caption: 'Measured sizes for a few representative models',
            head: ['Rung', 'Representative model', 'Output', 'Measured size'],
            rows: [
              ['Detection', 'YOLOv10n', 'Box + class + confidence', '~2.5 MiB'],
              ['Detection', 'RT-DETR R18', 'End-to-end boxes (no NMS)', '~20.0 MiB'],
              ['Segmentation', 'MediaPipe Selfie', 'Foreground probability map', '~0.2 MiB'],
              ['Segmentation', 'MODNet', 'Portrait matte', '~6.3 MiB'],
              ['Segmentation', 'SAM Tiny', 'Promptable mask', '~13.1 MiB'],
              ['Matting', 'RMBG-1.4', 'Soft alpha', '~42.3 MiB (int8)'],
              ['Matting', 'BiRefNet-lite 512', 'Soft alpha (finer)', '~93.9 MiB'],
            ],
          },
          { type: 'h2', text: 'Crop first' },
          {
            type: 'code',
            label: 'Crop the box, then paste the mask back',
            text: "// the detector gives a box; only that crop goes to the segmenter\nconst crop = cropToBox(frame, box);\nconst mask = await segmenter(crop);\n\n// paste the local mask back at the box's position\ncomposeMask(mask, box, frame.width, frame.height);\n\n// soft alpha: sigmoid → guided-filter feather → levels → decontaminate",
          },
          {
            type: 'p',
            text: 'Segmenting a full 1080p frame versus a 200×300 crop of the person differs by an order of magnitude in time, and the extracted edge looks the same. This was the first optimisation we made on the demo, and it costs one detection pass.',
          },
          { type: 'h2', text: 'The three demos in a row' },
          {
            type: 'ul',
            items: [
              'If you only need to know how many people are in frame and where, detection is enough',
              'For a background swap or blur, lightweight segmentation between 0.2 and 6 MiB will do',
              'Compositing onto another image, or print-grade edges, needs the soft alpha from RMBG or BiRefNet',
              'When the object class is not fixed and you want click-to-segment, SAM Tiny is the shape you want',
            ],
          },
          {
            type: 'p',
            text: 'All three demos use the same sample images, so the outputs are easy to compare side by side.',
          },
          { type: 'links', items: [
            { label: 'On this site · Object detection demo', href: '/demos/vision/detection' },
            { label: 'On this site · Segmentation demo', href: '/demos/vision/segmentation' },
            { label: 'On this site · Background removal demo', href: '/demos/vision/background-removal' },
            { label: 'Model page · YOLOv10n', href: '/vision/detection/yolov10n' },
            { label: 'Model page · SAM Tiny', href: '/vision/segmentation/sam-tiny' },
            { label: 'Model page · RMBG-1.4', href: '/vision/segmentation/rmbg-1-4' },
            { label: 'Model page · BiRefNet-lite 512', href: '/vision/background-removal/birefnet-lite-512' },
            { label: 'GitHub · facebookresearch/segment-anything', href: 'https://github.com/facebookresearch/segment-anything' },
            { label: 'Model card · RMBG-1.4', href: 'https://huggingface.co/briaai/RMBG-1.4' },
          ] },
        ],
      },
    },
  },
  {
    slug: 'speech-pipeline-asr-tts-cloning',
    date: '2026-11-07',
    tags: ['audio', 'asr', 'tts', 'voice-cloning'],
    i18n: {
      zh: {
        title: '浏览器里的 ASR、TTS 与声音克隆',
        description:
          'audio 和 generative-audio 两个分类里，Whisper 系权重从 16.1 MiB 到 191 MiB，Kokoro 82M 是 121 MiB。哪些能在标签页里真跑起来、下载要等多久，按演示页里的实际情况记一下。',
        blocks: [
          {
            type: 'p',
            text: '语音数据不适合传来传去，用户对延迟又特别敏感，所以这块我们尽量放在端上做。目录里分成 `audio`（asr / tts / denoising / source-separation / audio-classification）和 `generative-audio`（text-to-music / voice-cloning）。这篇只顺着识别、合成、克隆往下看，降噪、分离、VAD 另外有文章。',
          },
          { type: 'h2', text: 'Whisper 的 30 秒窗口' },
          {
            type: 'p',
            text: 'Whisper 是编码器加解码器，log-mel 频谱进去，解码器一个 token 一个 token 往外吐。选哪个版本基本就是选等多久：Whistle 约 16.1 MiB，走 WASM，加载最快；Whisper Base 约 73.3 MiB，多语言明显更稳；Whisper Small 约 191 MiB，质量最好，第一次打开要等的时间也最长。',
          },
          {
            type: 'p',
            text: '原生实现按 30 秒一个窗口处理，更长的录音得自己切，还得处理窗口边界。把 `return_timestamps` 开到 word 级会省不少事：切分可以落在句子之间，不会把一个词劈成两半，后面做字幕对齐也方便。',
          },
          {
            type: 'p',
            text: '前面挂一个 VAD 会好很多，只把有声的区间送进去。解码时间省下来是小事，更麻烦的是 Whisper 对着一段纯噪声也能一本正经地吐出文字，VAD 能从源头拦掉大半。',
          },
          { type: 'h2', text: 'TTS 其实是两个模型' },
          {
            type: 'p',
            text: '文本先由声学模型变成频谱或者离散声学 token，声码器再把它还原成波形，两步都得跑。Kokoro 82M 约 121 MiB，是质量和体积比较合适的一档。Piper 每种语言一个小包，想加语言就多下一次。Silero TTS 在 CPU 上能实时合成。Bark 会笑会叹气，但体积和延迟都明显上去。',
          },
          {
            type: 'p',
            text: '放端上主要不是为了省钱，是为了少一次网络往返：按下就开始说，这个体感差很明显。代价也得认，音色就那几个，韵律调不了云端那么细，长文本还得自己先分句。',
          },
          { type: 'h2', text: '克隆：一段参考音频就够' },
          {
            type: 'p',
            text: '先把参考音频编码成说话人嵌入，再和要读的文本一起进合成器，音色和内容就这么拆开了。OpenVoice v2 偏零样本音色转换，同一句话换个声音；Coqui XTTS v2 能跨语言克隆。两者都不是单个文件，浏览器里编码器、合成器、声码器得分别加载，这类演示首次打开偏慢多半是这个原因。',
          },
          {
            type: 'p',
            text: '做这块更该花心思的不是推理，是授权。克隆别人的声音得先拿到明确同意，而端上跑起来又太容易了，随手一段录音就能出结果。产品里得有同意流程和边界说明，别把它当成菜单里一个普通滤镜。',
          },
          {
            type: 'table',
            caption: '代表模型的实测体积（Piper 按语言分包）',
            head: ['阶段', '代表模型', '实测体积', '特点'],
            rows: [
              ['ASR', 'Whistle', '~16.1 MiB', '轻量、WASM 友好、加载最快'],
              ['ASR', 'Whisper Base', '~73.3 MiB', '多语言，质量明显更好'],
              ['ASR', 'Whisper Small', '~191 MiB', '质量最好，加载最慢'],
              ['TTS', 'Kokoro 82M', '~121 MiB', '质量与体积的平衡点'],
              ['TTS', 'Piper', '按语言分包', '多语言、轻量、CPU 友好'],
              ['克隆', 'OpenVoice v2', '多组件', '零样本音色转换'],
              ['克隆', 'Coqui XTTS v2', '多组件', '多语言克隆'],
            ],
          },
          { type: 'h2', text: '一段能直接抄的转写代码' },
          {
            type: 'code',
            label: 'transformers.js，带词级时间戳',
            text: "const asr = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base', {\n  dtype: 'q8',\n});\n\nconst out = await asr(audioUrl, {\n  return_timestamps: 'word',\n  chunk_length_s: 30,\n  stride_length_s: 5,\n});\n// out.text / out.chunks[i].timestamp",
          },
          { type: 'h2', text: '串起来' },
          {
            type: 'p',
            text: 'VAD 切区间，ASR 出文字，交给本地 LLM 改写或摘要，TTS 再读回来，四步都能待在一个标签页里。会议记录、语音笔记、离线翻译大致都是这么搭的。本站的 VAD、语音识别、语音合成三个演示可以顺着点过去，声音克隆那页是同一段话换个音色。',
          },
          { type: 'links', items: [
            { label: '本站演示 · 语音识别', href: '/demos/audio/asr' },
            { label: '本站演示 · 语音合成', href: '/demos/audio/tts' },
            { label: '本站演示 · 声音克隆', href: '/demos/generative-audio/voice-cloning' },
            { label: '本站演示 · 语音活动检测', href: '/demos/audio/vad' },
            { label: '模型详情 · Whisper Base', href: '/audio/asr/whisper-base' },
            { label: '模型详情 · Whistle', href: '/audio/asr/whistle' },
            { label: '模型详情 · Kokoro TTS 82M', href: '/audio/tts/kokoro-82m-fp32' },
            { label: '模型详情 · OpenVoice v2', href: '/generative-audio/voice-cloning/openvoice' },
            { label: 'GitHub · openai/whisper', href: 'https://github.com/openai/whisper' },
            { label: '模型卡 · Kokoro-82M', href: 'https://huggingface.co/hexgrad/Kokoro-82M' },
          ] },
        ],
      },
      en: {
        title: 'ASR, TTS and voice cloning in a browser tab',
        description:
          'Our audio and generative-audio categories put Whisper-family weights between 16.1 MiB and 191 MiB, with Kokoro 82M at 121 MiB. Which ones actually run in a tab, and how long the download takes.',
        blocks: [
          {
            type: 'p',
            text: 'Audio is awkward to ship over the network and users notice latency immediately, so we try to keep it on the device. The catalogue splits into `audio` (asr / tts / denoising / source-separation / audio-classification) and `generative-audio` (text-to-music / voice-cloning). Here we follow recognition, synthesis and cloning; denoising, separation and VAD have their own posts.',
          },
          { type: 'h2', text: 'The 30-second Whisper window' },
          {
            type: 'p',
            text: 'Whisper is an encoder plus a decoder: log-mel spectrograms go in, tokens come out one at a time. Picking a variant is mostly picking how long you are willing to wait. Whistle is about 16.1 MiB on WebAssembly and loads fastest; Whisper Base is about 73.3 MiB and much steadier across languages; Whisper Small is about 191 MiB, best quality and the longest first load.',
          },
          {
            type: 'p',
            text: 'The native implementation works in 30-second windows, so longer recordings need your own splitting and some care at the boundaries. Setting `return_timestamps` to word level saves a lot of that: cuts can land between sentences, no word gets sliced in half, and subtitle alignment becomes easy.',
          },
          {
            type: 'p',
            text: 'Put a VAD in front and send only the speech ranges through. Saving decode time is the smaller win. The awkward part is that Whisper can produce perfectly confident text over pure noise, and a VAD blocks most of that at the source.',
          },
          { type: 'h2', text: 'TTS is really two models' },
          {
            type: 'p',
            text: 'An acoustic model turns text into a spectrogram or discrete acoustic tokens, then a vocoder rebuilds the waveform. Both stages have to run. Kokoro 82M at about 121 MiB is a reasonable quality-for-size pick. Piper ships one small package per language, so each new language is another download. Silero TTS synthesises in real time on CPU. Bark can laugh and sigh, at a clear cost in size and latency.',
          },
          {
            type: 'p',
            text: 'Running locally is mostly about losing one network round trip, not about cost: press and it starts talking, which feels very different. The trade-offs are real too. You get a fixed set of voices, coarser prosody control than cloud systems, and long text has to be split into sentences by your own code.',
          },
          { type: 'h2', text: 'Cloning: one reference clip is enough' },
          {
            type: 'p',
            text: 'A reference clip is encoded into a speaker embedding, then fed to the synthesiser together with the text, which is how timbre and content get separated. OpenVoice v2 leans towards zero-shot timbre conversion, same words in a different voice; Coqui XTTS v2 clones across languages. Neither is a single file. Encoder, synthesiser and vocoder load separately in the browser, which is why these demos are slow to open the first time.',
          },
          {
            type: 'p',
            text: 'The part that needs thought here is consent, not inference. Cloning someone\u2019s voice requires their explicit agreement, and running it on-device makes it far too easy: any short recording will do. A product needs a consent flow and stated limits, not one more filter in a menu.',
          },
          {
            type: 'table',
            caption: 'Measured download sizes (Piper is packaged per language)',
            head: ['Stage', 'Representative model', 'Measured size', 'Character'],
            rows: [
              ['ASR', 'Whistle', '~16.1 MiB', 'Light, WASM-friendly, fastest load'],
              ['ASR', 'Whisper Base', '~73.3 MiB', 'Multilingual, clearly better quality'],
              ['ASR', 'Whisper Small', '~191 MiB', 'Best quality, slowest load'],
              ['TTS', 'Kokoro 82M', '~121 MiB', 'The quality/size balance point'],
              ['TTS', 'Piper', 'Packaged per language', 'Multilingual, light, CPU-friendly'],
              ['Cloning', 'OpenVoice v2', 'Multi-component', 'Zero-shot timbre conversion'],
              ['Cloning', 'Coqui XTTS v2', 'Multi-component', 'Cross-lingual cloning'],
            ],
          },
          { type: 'h2', text: 'A transcription snippet you can copy' },
          {
            type: 'code',
            label: 'transformers.js with word-level timestamps',
            text: "const asr = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base', {\n  dtype: 'q8',\n});\n\nconst out = await asr(audioUrl, {\n  return_timestamps: 'word',\n  chunk_length_s: 30,\n  stride_length_s: 5,\n});\n// out.text / out.chunks[i].timestamp",
          },
          { type: 'h2', text: 'Putting it together' },
          {
            type: 'p',
            text: 'VAD cuts ranges, ASR produces text, a local LLM rewrites or summarises it, TTS reads it back. All four steps fit in one tab, which is roughly how meeting notes, voice memos and offline translation are built. The VAD, ASR and TTS demos on this site can be clicked through in that order; the voice cloning page keeps the words and swaps the voice.',
          },
          { type: 'links', items: [
            { label: 'On this site · Speech recognition demo', href: '/demos/audio/asr' },
            { label: 'On this site · Speech synthesis demo', href: '/demos/audio/tts' },
            { label: 'On this site · Voice cloning demo', href: '/demos/generative-audio/voice-cloning' },
            { label: 'On this site · VAD demo', href: '/demos/audio/vad' },
            { label: 'Model page · Whisper Base', href: '/audio/asr/whisper-base' },
            { label: 'Model page · Whistle', href: '/audio/asr/whistle' },
            { label: 'Model page · Kokoro TTS 82M', href: '/audio/tts/kokoro-82m-fp32' },
            { label: 'Model page · OpenVoice v2', href: '/generative-audio/voice-cloning/openvoice' },
            { label: 'GitHub · openai/whisper', href: 'https://github.com/openai/whisper' },
            { label: 'Model card · Kokoro-82M', href: 'https://huggingface.co/hexgrad/Kokoro-82M' },
          ] },
        ],
      },
    },
  },
  {
    slug: 'real-time-face-pose-hand',
    date: '2026-11-07',
    tags: ['real-time', 'mediapipe', 'pose', 'tracking'],
    i18n: {
      zh: {
        title: '一帧 16.7 毫秒里跑完人脸、姿态和手部',
        description:
          'real-time 分类下几个模型的实测体积加起来不到 15 MB。这篇记一下我们怎么把关键点、平滑和跟踪塞进一帧预算，以及哪几处调过之后才不抖。',
        blocks: [
          {
            type: 'p',
            text: '先算一笔时间账：30 fps 每帧 33 ms，60 fps 只剩 16.7 ms，这里面还得扣掉视频解码、canvas 绘制和页面合成。留给推理的没多少，`real-time` 分类里人脸检测 0.2 MiB、姿态 5.5 MiB、手部 7.5 MiB，小到有点反常，就是因为它们每帧都得跑完一遍。',
          },
          { type: 'h2', text: '先裁框，再找点' },
          {
            type: 'p',
            text: '在整张 1080p 上直接回归 468 个面部关键点，没人这么干。一般是先用 0.2 MiB 的 BlazeFace 类检测器框出人脸，把 128×128 的小图交给 Face Mesh 去回归那 468 个点。姿态也是这个套路，检测器给人体框，Pose 出 33 个关节点；手部是 21 个。背景像素压根不进回归器，算力全花在有目标的地方。',
          },
          {
            type: 'table',
            caption: 'real-time 分类下各模型的实测体积',
            head: ['子类', '代表模型', '输出', '实测体积'],
            rows: [
              ['人脸检测', 'MediaPipe Face Detection', '人脸框 + 6 个关键点', '~0.2 MiB'],
              ['人脸网格', 'MediaPipe Face Mesh', '468 个三维关键点', '~3.6 MiB'],
              ['姿态', 'MediaPipe Pose', '33 个关节点', '~5.5 MiB'],
              ['姿态（Tasks API）', 'MediaPipe Pose Landmarker', '33 点 + 世界坐标', '~9.0 MiB'],
              ['手部', 'MediaPipe Hand Landmarker', '21 个关节点', '~7.5 MiB'],
              ['手势', 'MediaPipe Gesture Recognizer', '21 点 + 手势类别', '~8.0 MiB'],
              ['整体', 'MediaPipe Holistic', '人脸 + 姿态 + 双手', '~13.0 MiB'],
            ],
          },
          { type: 'h2', text: '骨架一直在抖' },
          {
            type: 'p',
            text: '关键点模型每帧独立算，输出必然抖。用户不看 mAP，只看见骨架在抖。我们的处理顺序是：先用置信度阈值丢掉低分点，再用指数滑动平均压住坐标的高频抖动，最后靠跟踪给每个目标一个稳定 ID。姿态演示里那个「时序平滑」开关就是中间一步。',
          },
          {
            type: 'p',
            text: 'ByteTrack 管最后一步，拿本帧的框和上一帧的轨迹做 IoU 匹配，人被挡住再出现时还能接回同一个 ID。它不跑神经网络，纯 WASM 就够。计数、测速、停留时长这些都要先有轨迹才谈得上。',
          },
          { type: 'h2', text: '摄像头帧不要出标签页' },
          {
            type: 'p',
            text: '摄像头画面是最不该上传的数据。从采集到绘制，整帧都待在标签页里，没有上传、没有录制、服务端也没有日志。延迟上少一次网络往返，手势交互才可能压到 50 ms 以内，再高一点，用户就会说手势不跟手。',
          },
          {
            type: 'code',
            label: 'MediaPipe Tasks 的逐帧循环',
            text: "const landmarker = await HandLandmarker.createFromOptions(vision, {\n  baseOptions: { modelAssetPath: '/models/hand_landmarker.task' },\n  runningMode: 'VIDEO',\n  numHands: 2,\n});\n\nconst loop = () => {\n  if (video.readyState >= 2) {\n    const result = landmarker.detectForVideo(video, performance.now());\n    draw(canvas, result);\n  }\n  requestAnimationFrame(loop);\n};",
          },
          { type: 'h2', text: '调过的几处' },
          {
            type: 'ul',
            items: [
              '640×480 对关键点够了，上 1080p 推理时间基本翻倍',
              'rAF 回调里别 await 网络或解码，掉帧会攒成延迟',
              '叠加层画在 canvas 2D 上，别每帧增删 DOM 节点',
              '手机上跑几分钟会发热降频，宁可降推理频率也别降分辨率',
            ],
          },
          {
            type: 'p',
            text: '打开人脸、姿态或手部演示、允许摄像头就能看到实时叠加。跟踪演示用同一段视频，可以遮挡一下，看 ID 会不会接回来。',
          },
          { type: 'links', items: [
            { label: '本站演示 · 人脸网格', href: '/demos/real-time/face' },
            { label: '本站演示 · 人体姿态', href: '/demos/real-time/pose' },
            { label: '本站演示 · 手部 21 点', href: '/demos/real-time/hand' },
            { label: '本站演示 · 跨帧目标跟踪', href: '/demos/real-time/tracking' },
            { label: '模型详情 · MediaPipe Face Mesh', href: '/real-time/face/mediapipe-facemesh' },
            { label: '模型详情 · MediaPipe Pose', href: '/real-time/pose/mediapipe-pose' },
            { label: '模型详情 · MediaPipe Hand Landmarker', href: '/real-time/hand/mediapipe-handlandmarker' },
            { label: '模型详情 · ByteTrack (WASM)', href: '/real-time/tracking/bytetrack-wasm' },
            { label: '文档 · MediaPipe Solutions', href: 'https://ai.google.dev/edge/mediapipe/solutions/guide' },
          ] },
        ],
      },
      en: {
        title: 'Fitting face, pose and hands into a 16.7 ms frame',
        description:
          'The models in our real-time category add up to under 15 MB. Notes on fitting landmarks, smoothing and tracking into one frame budget, and on the changes that finally stopped the skeleton shaking.',
        blocks: [
          {
            type: 'p',
            text: 'Start with the time budget. At 30 fps a frame is 33 ms; at 60 fps it is 16.7 ms, and video decode, canvas drawing and compositing all come out of that. Little is left for inference. That is why the `real-time` models are oddly small: 0.2 MiB for face detection, 5.5 MiB for pose, 7.5 MiB for hands. Each one has to finish every frame.',
          },
          { type: 'h2', text: 'Crop a box first, then find the points' },
          {
            type: 'p',
            text: 'Nobody regresses 468 facial landmarks over a full 1080p frame. A 0.2 MiB BlazeFace-class detector finds the face box, and a 128×128 crop goes to Face Mesh for the 468 points. Pose follows the same shape: detector gives the body box, Pose regresses 33 joints; hands give 21. Background pixels never reach the regressor, so the compute lands where the target is.',
          },
          {
            type: 'table',
            caption: 'Measured sizes in the real-time category',
            head: ['Subcategory', 'Representative model', 'Output', 'Measured size'],
            rows: [
              ['Face detection', 'MediaPipe Face Detection', 'Face box + 6 keypoints', '~0.2 MiB'],
              ['Face mesh', 'MediaPipe Face Mesh', '468 3D landmarks', '~3.6 MiB'],
              ['Pose', 'MediaPipe Pose', '33 joints', '~5.5 MiB'],
              ['Pose (Tasks API)', 'MediaPipe Pose Landmarker', '33 points + world coords', '~9.0 MiB'],
              ['Hands', 'MediaPipe Hand Landmarker', '21 joints', '~7.5 MiB'],
              ['Gestures', 'MediaPipe Gesture Recognizer', '21 points + gesture label', '~8.0 MiB'],
              ['All in one', 'MediaPipe Holistic', 'Face + pose + both hands', '~13.0 MiB'],
            ],
          },
          { type: 'h2', text: 'The skeleton keeps shaking' },
          {
            type: 'p',
            text: 'Landmark models run independently per frame, so the output wobbles. Users never see mAP, they see a shaking skeleton. Our order is: drop low-score points with a confidence threshold, damp the high-frequency wobble with an exponential moving average, then give each target a stable id through tracking. The smoothing toggle in the pose demo is the middle step.',
          },
          {
            type: 'p',
            text: 'ByteTrack handles the last one, matching this frame\u2019s boxes to last frame\u2019s tracks by IoU and re-attaching the same id after an occlusion. It runs no neural network at all, plain WebAssembly is enough. Counting, speed and dwell time all need trajectories before they mean anything.',
          },
          { type: 'h2', text: 'Keep camera frames inside the tab' },
          {
            type: 'p',
            text: 'Camera frames are the last thing you want to upload. From capture to draw the frame stays in the tab: no upload, no recording, no server logs. Losing the network round trip is also what lets gesture interaction land under 50 ms. Past that, people say the gesture does not follow.',
          },
          {
            type: 'code',
            label: 'The MediaPipe Tasks per-frame loop',
            text: "const landmarker = await HandLandmarker.createFromOptions(vision, {\n  baseOptions: { modelAssetPath: '/models/hand_landmarker.task' },\n  runningMode: 'VIDEO',\n  numHands: 2,\n});\n\nconst loop = () => {\n  if (video.readyState >= 2) {\n    const result = landmarker.detectForVideo(video, performance.now());\n    draw(canvas, result);\n  }\n  requestAnimationFrame(loop);\n};",
          },
          { type: 'h2', text: 'Things we adjusted' },
          {
            type: 'ul',
            items: [
              '640×480 is plenty for landmarks; 1080p roughly doubles inference time',
              'Never await network or decoding inside the rAF callback, dropped frames pile up as latency',
              'Draw the overlay on canvas 2D instead of adding and removing DOM nodes every frame',
              'Phones throttle after a few minutes; lower the inference rate rather than the resolution',
            ],
          },
          {
            type: 'p',
            text: 'Open the face, pose or hand demo and allow the camera to see the overlay live. The tracking demo uses the same clip, so occlude the subject and watch whether the id comes back.',
          },
          { type: 'links', items: [
            { label: 'On this site · Face mesh demo', href: '/demos/real-time/face' },
            { label: 'On this site · Pose demo', href: '/demos/real-time/pose' },
            { label: 'On this site · Hand landmarks demo', href: '/demos/real-time/hand' },
            { label: 'On this site · Multi-object tracking demo', href: '/demos/real-time/tracking' },
            { label: 'Model page · MediaPipe Face Mesh', href: '/real-time/face/mediapipe-facemesh' },
            { label: 'Model page · MediaPipe Pose', href: '/real-time/pose/mediapipe-pose' },
            { label: 'Model page · MediaPipe Hand Landmarker', href: '/real-time/hand/mediapipe-handlandmarker' },
            { label: 'Model page · ByteTrack (WASM)', href: '/real-time/tracking/bytetrack-wasm' },
            { label: 'Docs · MediaPipe Solutions', href: 'https://ai.google.dev/edge/mediapipe/solutions/guide' },
          ] },
        ],
      },
    },
  },
  {
    slug: 'in-browser-llm-size-tradeoffs',
    date: '2026-11-07',
    tags: ['llm', 'quantization', 'webgpu', 'structured-output'],
    i18n: {
      zh: {
        title: '浏览器里的 LLM，从 681 MiB 到 4.2 GB',
        description:
          'llm 分类下最小的 TinyLlama 681 MiB，最大的 Llama-3 8B 要 4.2 GB。按目录里的实测数字，把体积怎么算、生成速度卡在哪、以及我们会挑哪一档过一遍。',
        blocks: [
          {
            type: 'p',
            text: '本站 `llm` 分类的 chat 子类下有七个模型，TinyLlama 1.1B 实测 681 MiB，Llama-3 8B 要 4.2 GB，差了六倍多。这六倍不只是「模型更准」，主要是参数量和量化位数决定的，另外词表、归一化参数、量化 scale 还会再吃掉一块固定开销。',
          },
          { type: 'h2', text: '先算体积' },
          {
            type: 'p',
            text: '权重字节数大致就是参数量乘以每参数字节数。4 bit 量化按 0.5 字节算，1.5B 模型理论 0.75 GB，Qwen2 实测 828 MiB，多出来的是 embedding 表、归一化参数和量化 scale。8B 同样 4 bit 理论 4 GB，Llama-3 实测 4.2 GB。所以选模型时先看参数量，再看能接受几位量化，这两步基本就定了下载要等多久。',
          },
          {
            type: 'table',
            caption: '对话与代码模型的实测下载体积',
            head: ['模型', '参数量', '实测体积'],
            rows: [
              ['TinyLlama', '1.1B', '~681 MiB'],
              ['Qwen2 Instruct', '1.5B', '~828 MiB'],
              ['SmolLM2 Instruct', '1.7B', '~918 MiB'],
              ['DeepSeek-Coder', '1.3B', '~1.3 GB'],
              ['Gemma 2 IT', '2B', '~1.4 GB'],
              ['Phi-3 Mini', '3.8B', '~2.0 GB'],
              ['CodeLlama', '7B', '~3.5 GB'],
              ['Llama-3 Instruct', '8B', '~4.2 GB'],
            ],
          },
          { type: 'h2', text: '生成速度卡在读权重' },
          {
            type: 'p',
            text: '生成阶段每吐一个 token，都要把权重整个读一遍，tokens/s 差不多就是内存带宽除以模型体积。同一块 GPU 上 828 MiB 比 4.2 GB 快五倍，不是算力差五倍，是要读的数据少五倍。这也解释了两个常见现象：长 prompt 首 token 慢、后面快，因为 prefill 是并行矩阵乘，decode 是串行读权重；端侧模型宁可砍参数也不肯放弃 4 bit。',
          },
          {
            type: 'p',
            text: '还有个容易漏掉的 KV cache，随上下文长度线性涨，4K 上下文的 1.5B 模型上一般是几十到上百 MB。模型 828 MiB，标签页占的内存远不止 828 MiB。',
          },
          { type: 'h2', text: '三个子类，三种用法' },
          {
            type: 'p',
            text: 'chat 是逐 token 生成，演示页能调温度和系统提示，Qwen2 1.5B 是我们最常用的一档，中文够用，推理吃力时再换 Phi-3 Mini。structured-output 要的是只吐合法 JSON，端上没有服务端兜底帮你校验重试，所以比云端更依赖它。code 那边是 DeepSeek-Coder 1.3B 和 CodeLlama 7B，补全、解释、改写都能做。',
          },
          {
            type: 'p',
            text: '让 JSON 合法有两条路，一条是用 grammar 或 JSON schema 做约束解码，限制每步可选的 token；另一条是提示词加校验重试。端侧基本只能选前者，重试等于再跑一遍完整前向，电和延迟都翻倍。',
          },
          {
            type: 'code',
            label: 'WebLLM 加载并流式生成',
            text: "import { CreateMLCEngine } from '@mlc-ai/web-llm';\n\nconst engine = await CreateMLCEngine('Qwen2-1.5B-Instruct-q4f16_1-MLC', {\n  initProgressCallback: (p) => console.log(p.text),\n});\n\nconst stream = await engine.chat.completions.create({\n  messages: [{ role: 'user', content: '把这段话改写成正式邮件：周五之前给我数据' }],\n  temperature: 0.7,\n  stream: true,\n});\nfor await (const chunk of stream) append(chunk.choices[0]?.delta?.content ?? '');",
          },
          {
            type: 'p',
            text: '第一次要下权重，1.5B 在普通宽带上十来秒，8B 得按分钟算。进度条和缓存策略不是可选项，不给的话用户会以为页面卡死了。命中浏览器缓存之后，第二次打开才谈得上秒开。',
          },
          { type: 'h2', text: '几种不适合放端上的情况' },
          {
            type: 'ul',
            items: [
              '任务要靠 70B 级模型才做得了',
              '首屏就得给答案，等不了几秒到几十秒的权重下载',
              '设备没有 WebGPU，8B 在纯 CPU 上慢得没法用',
              '合规上要求服务端审计和内容留存',
            ],
          },
          {
            type: 'p',
            text: '剩下那些 8B 以下、任务边界清楚（改写、抽取、分类、代码补全）、用户肯为首次加载等一次的场景，放端上挺合适：不按 token 计费，没有网络往返，文本也不出设备。',
          },
          { type: 'links', items: [
            { label: '本站演示 · 本地模型对话', href: '/demos/llm/chat' },
            { label: '本站演示 · 结构化输出', href: '/demos/llm/structured-output' },
            { label: '本站演示 · 代码模型', href: '/demos/llm/code' },
            { label: '模型详情 · Qwen2 1.5B Instruct', href: '/llm/chat/qwen2-1-5b' },
            { label: '模型详情 · Phi-3 Mini', href: '/llm/chat/phi-3-mini' },
            { label: '模型详情 · SmolLM2 1.7B', href: '/llm/chat/smollm2-1-7b' },
            { label: '模型详情 · DeepSeek Coder 1.3B', href: '/llm/code/deepseek-coder-1-3b' },
            { label: 'GitHub · mlc-ai/web-llm', href: 'https://github.com/mlc-ai/web-llm' },
            { label: 'GitHub · huggingface/transformers.js', href: 'https://github.com/huggingface/transformers.js' },
          ] },
        ],
      },
      en: {
        title: 'Browser LLMs, from 681 MiB to 4.2 GB',
        description:
          'Our llm category runs from TinyLlama at 681 MiB to Llama-3 8B at 4.2 GB. Working through the measured sizes, what limits generation speed, and which tier we actually pick.',
        blocks: [
          {
            type: 'p',
            text: 'The chat subcategory under `llm` lists seven models. TinyLlama 1.1B measures 681 MiB and Llama-3 8B needs 4.2 GB, a spread of more than six times. It is not just about quality. Parameter count and quantisation width set most of it, with the vocabulary, norm parameters and quantisation scales adding a fixed chunk on top.',
          },
          { type: 'h2', text: 'Working out the size' },
          {
            type: 'p',
            text: 'Weight bytes are roughly parameters times bytes per parameter. At 4 bit that is 0.5 bytes, so a 1.5B model should be 0.75 GB; Qwen2 measures 828 MiB, the difference being the embedding table, norm parameters and quantisation scales. An 8B model at 4 bit should be 4 GB, and Llama-3 measures 4.2 GB. In practice you pick parameter count first, then decide how many bits you will accept, and that already tells you how long the download takes.',
          },
          {
            type: 'table',
            caption: 'Measured download sizes for chat and code models',
            head: ['Model', 'Parameters', 'Measured size'],
            rows: [
              ['TinyLlama', '1.1B', '~681 MiB'],
              ['Qwen2 Instruct', '1.5B', '~828 MiB'],
              ['SmolLM2 Instruct', '1.7B', '~918 MiB'],
              ['DeepSeek-Coder', '1.3B', '~1.3 GB'],
              ['Gemma 2 IT', '2B', '~1.4 GB'],
              ['Phi-3 Mini', '3.8B', '~2.0 GB'],
              ['CodeLlama', '7B', '~3.5 GB'],
              ['Llama-3 Instruct', '8B', '~4.2 GB'],
            ],
          },
          { type: 'h2', text: 'Generation is limited by reading weights' },
          {
            type: 'p',
            text: 'Every generated token reads the entire weight set once, so tokens/s is roughly memory bandwidth divided by model size. On the same GPU, 828 MiB is five times faster than 4.2 GB not because the compute is five times faster but because there is five times less to read. That explains two familiar things: a long prompt means a slow first token and fast later ones, because prefill is a parallel matmul while decode reads weights serially; and on-device models cut parameters before giving up 4 bit.',
          },
          {
            type: 'p',
            text: 'KV cache is easy to forget. It grows linearly with context and typically costs tens to a hundred-plus MB at 4K context on a 1.5B model. 828 MiB of weights does not mean an 828 MiB tab.',
          },
          { type: 'h2', text: 'What the three subcategories are for' },
          {
            type: 'p',
            text: 'chat generates token by token, with temperature and system prompt exposed in the demo. Qwen2 1.5B is the one we use most and handles Chinese well; step up to Phi-3 Mini when reasoning gets harder. structured-output needs legal JSON, and it matters more here than in the cloud because there is no server-side net to validate and retry. code covers DeepSeek-Coder 1.3B and CodeLlama 7B for completion, explanation and rewriting.',
          },
          {
            type: 'p',
            text: 'There are two ways to get legal JSON: constrained decoding, where a grammar or JSON schema limits the legal token at every step, or prompt plus validate-and-retry. On the client the first is almost the only option. A retry means another full forward pass, at double the power and latency.',
          },
          {
            type: 'code',
            label: 'WebLLM loading and streaming',
            text: "import { CreateMLCEngine } from '@mlc-ai/web-llm';\n\nconst engine = await CreateMLCEngine('Qwen2-1.5B-Instruct-q4f16_1-MLC', {\n  initProgressCallback: (p) => console.log(p.text),\n});\n\nconst stream = await engine.chat.completions.create({\n  messages: [{ role: 'user', content: 'Rewrite this as a formal email: send me the data by Friday' }],\n  temperature: 0.7,\n  stream: true,\n});\nfor await (const chunk of stream) append(chunk.choices[0]?.delta?.content ?? '');",
          },
          {
            type: 'p',
            text: 'The first load downloads weights: seconds for 1.5B on ordinary broadband, minutes for 8B. A progress indicator and a cache strategy are not optional, or users will assume the page has hung. Only the second visit, served from the browser cache, feels instant.',
          },
          { type: 'h2', text: 'Cases that do not belong on the client' },
          {
            type: 'ul',
            items: [
              'Work that genuinely needs a 70B-class model',
              'A first screen that must answer immediately, with no time for a multi-second or multi-minute download',
              'Devices without WebGPU, where an 8B model on CPU is unusably slow',
              'Compliance requirements for server-side auditing and content retention',
            ],
          },
          {
            type: 'p',
            text: 'What is left suits the client well: under 8B, a well-bounded task such as rewriting, extraction, classification or code completion, and a user who will wait through one download. No per-token bill, no round trip, and the text never leaves the device.',
          },
          { type: 'links', items: [
            { label: 'On this site · Local chat demo', href: '/demos/llm/chat' },
            { label: 'On this site · Structured output demo', href: '/demos/llm/structured-output' },
            { label: 'On this site · Code model demo', href: '/demos/llm/code' },
            { label: 'Model page · Qwen2 1.5B Instruct', href: '/llm/chat/qwen2-1-5b' },
            { label: 'Model page · Phi-3 Mini', href: '/llm/chat/phi-3-mini' },
            { label: 'Model page · SmolLM2 1.7B', href: '/llm/chat/smollm2-1-7b' },
            { label: 'Model page · DeepSeek Coder 1.3B', href: '/llm/code/deepseek-coder-1-3b' },
            { label: 'GitHub · mlc-ai/web-llm', href: 'https://github.com/mlc-ai/web-llm' },
            { label: 'GitHub · huggingface/transformers.js', href: 'https://github.com/huggingface/transformers.js' },
          ] },
        ],
      },
    },
  },
  {
    slug: 'browser-rag-embedding-rerank',
    date: '2026-11-07',
    tags: ['search-rag', 'embedding', 'reranker', 'rag'],
    i18n: {
      zh: {
        title: '浏览器里做 RAG，检索这半边怎么搭',
        description:
          'search-rag 分类下有嵌入模型、交叉编码器和几个向量索引库。这篇记一下索引内存怎么算、哪一步必须留在本地，以及换嵌入模型时我们踩过的坑。',
        blocks: [
          {
            type: 'p',
            text: 'RAG 说起来像大模型的能力，拆开看是几段各自能换的零件：嵌入模型把文本变成定长向量，索引从一堆向量里找近邻，交叉编码器再给召回的候选重新打分。`search-rag` 分类就按这个拆成 embedding、reranker、semantic-search，三个子类都有能在浏览器里跑的演示。',
          },
          { type: 'h2', text: '先看嵌入模型' },
          {
            type: 'p',
            text: '嵌入模型一次只编码一句话，吐出一个定长向量，语义就压在这几百个数字里。all-MiniLM-L6-v2 是我们默认用的：384 维，权重实测 21.9 MiB 左右，CPU 上编码一条短句毫秒级。BGE Small EN 和 GTE Small 都在 32.4 MiB 量级，检索基准上略好一点。BGE-M3 能覆盖多语言和长上下文，但下载量 1.1 GB，端上一般不去碰。',
          },
          {
            type: 'p',
            text: '服务器上不用算的一笔账，端上得算：索引内存 = 条数 × 维度 × 每维字节数。10 万条 384 维向量，fp32 大约 147 MB，int8 只要 37 MB 左右。标签页能用的内存比服务器紧得多，所以本地索引基本都选 int8。',
          },
          { type: 'h2', text: '索引决定召回要多久' },
          {
            type: 'p',
            text: '十万条向量暴力扫一遍余弦，CPU 上几十毫秒，条数涨一倍时间也涨一倍。HNSW 把查询压到近似对数复杂度，端上基本都用它：hnswlib.js 是 WASM 移植，Voyager 来自 Spotify，LanceDB 是列式存储加向量索引，Vectra 把索引直接落在本地文件。',
          },
          {
            type: 'p',
            text: '比快更要紧的是索引能留在本地。切片、向量、索引都在用户设备上，检索这一步完全不发请求。合同、病历、内部知识库这类东西，很多时候只有这种做法能被接受。',
          },
          { type: 'h2', text: '重排是为了把顺序调对' },
          {
            type: 'p',
            text: '双塔为了让向量能预先算好，查询和文档只能分开编码，词和词之间的交互就丢了。「退款政策」和「退货规则」在向量空间里挨得很近，可「不退款」和「退款」也一样近。交叉编码器把查询和候选拼成一条输入整体过模型，判断准得多，代价是每个候选都要跑一次前向，没法预计算。',
          },
          {
            type: 'p',
            text: '于是常见的做法是两段：嵌入先召回 50 条，交叉编码器重排到 5 条。目录里 MS MARCO MiniLM Cross-Encoder 约 22.1 MiB，是轻量那档；BGE Reranker Base 约 266 MiB，更准也下载更久。',
          },
          {
            type: 'table',
            caption: '各阶段的实测体积',
            head: ['阶段', '代表模型', '实测体积', '输出'],
            rows: [
              ['嵌入', 'all-MiniLM-L6-v2', '~21.9 MiB', '384 维向量'],
              ['嵌入（多语言 / 长文）', 'BGE-M3', '~1.1 GB', '1024 维向量'],
              ['索引', 'hnswlib.js / Voyager / LanceDB / Vectra', '库体积，无模型权重', 'top-k 近邻 id'],
              ['重排', 'MS MARCO MiniLM Cross-Encoder', '~22.1 MiB', '查询-文档相关性分数'],
              ['重排（更强）', 'BGE Reranker Base', '~266 MiB', '查询-文档相关性分数'],
            ],
          },
          { type: 'h2', text: '拼起来的代码' },
          {
            type: 'code',
            label: 'transformers.js 两段式检索',
            text: "import { pipeline } from '@huggingface/transformers';\n\nconst embed = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { dtype: 'q8' });\nconst encode = async (text: string) =>\n  (await embed(text, { pooling: 'mean', normalize: true })).data;\n\n// 1. 建索引：语料逐条 encode 后写入 HNSW\n// 2. 召回：index.search(queryVec, 50)\n// 3. 重排：cross-encoder 对 (query, doc) 打分，取 top-5",
          },
          {
            type: 'p',
            text: '有个坑我们踩过：索引和查询必须用同一个嵌入模型、同一套归一化。哪怕换成维度相同的另一个模型，索引也得重建，否则相似度分数彼此没有可比性。端上重建索引是要花时间的，这件事得在选模型时就想好。',
          },
          { type: 'h2', text: '什么情况下值得放本地' },
          {
            type: 'ul',
            items: [
              '文档不能上传，检索就只能在本地做',
              '内网、飞机、现场作业这些没网或弱网的场合',
              '不想按 token 给 embedding API 付钱，用户多了差别很大',
              '交互式搜索少一次网络往返，手感明显不一样',
            ],
          },
          {
            type: 'p',
            text: '语料到百万条、要频繁全量重建、或者多租户共用一套索引，就别往端上搬了，这时候卡住的是索引规模和运维。',
          },
          {
            type: 'p',
            text: '三个演示可以顺着试：嵌入演示里换模型，相似度矩阵会变；重排演示里看候选顺序怎么被改过来；语义检索里是两段串起来的结果。',
          },
          { type: 'links', items: [
            { label: '本站演示 · 文本嵌入', href: '/demos/search-rag/embedding' },
            { label: '本站演示 · 交叉编码器重排', href: '/demos/search-rag/reranker' },
            { label: '本站演示 · 语义检索', href: '/demos/search-rag/semantic-search' },
            { label: '模型详情 · all-MiniLM-L6-v2', href: '/search-rag/embedding/all-minilm-l6-v2' },
            { label: '模型详情 · BGE-M3', href: '/search-rag/embedding/bge-m3' },
            { label: '模型详情 · MS MARCO MiniLM Cross-Encoder', href: '/search-rag/reranker/ms-marco-minilm' },
            { label: '模型详情 · hnswlib.js', href: '/search-rag/semantic-search/hnswlib-wasm' },
            { label: '文档 · Transformers.js', href: 'https://huggingface.co/docs/transformers.js' },
            { label: 'GitHub · nmslib/hnswlib', href: 'https://github.com/nmslib/hnswlib' },
          ] },
        ],
      },
      en: {
        title: 'Building the retrieval half of RAG in the browser',
        description:
          'Our search-rag category has embedding models, cross-encoders and several vector index libraries. Notes on working out index memory, which step has to stay local, and the embedding-model swap that cost us a rebuild.',
        blocks: [
          {
            type: 'p',
            text: 'RAG sounds like a capability of a large model, but it comes apart into pieces you can swap: an embedding model turns text into a fixed-length vector, an index finds nearby vectors, and a cross-encoder re-scores the recalled candidates. Our `search-rag` category is split along those lines into embedding, reranker and semantic-search, and each has a demo that runs in the browser.',
          },
          { type: 'h2', text: 'Starting with the embedding model' },
          {
            type: 'p',
            text: 'An embedding model encodes one sentence at a time and emits a fixed-length vector, with the meaning squeezed into a few hundred numbers. all-MiniLM-L6-v2 is our default: 384 dimensions, about 21.9 MiB of weights, millisecond encoding of a short sentence on CPU. BGE Small EN and GTE Small sit around 32.4 MiB and score slightly better on retrieval benchmarks. BGE-M3 covers multiple languages and long context, but at 1.1 GB of download we rarely touch it on the client.',
          },
          {
            type: 'p',
            text: 'A sum you never bother with on a server has to be done here: index memory is rows times dimensions times bytes per value. A hundred thousand 384-dim vectors take about 147 MB as fp32 and about 37 MB as int8. Tabs have a much tighter memory budget, so local indexes almost always go int8.',
          },
          { type: 'h2', text: 'The index decides recall time' },
          {
            type: 'p',
            text: 'A brute-force cosine scan over 100k vectors costs tens of milliseconds on CPU and grows linearly. HNSW (hierarchical navigable small world graphs) brings queries down to roughly logarithmic, which makes it the client-side default: hnswlib.js is the WebAssembly port, Voyager comes from Spotify, LanceDB pairs columnar storage with a vector index, and Vectra keeps the index in a local file.',
          },
          {
            type: 'p',
            text: 'More important than speed is that the index can stay local. Chunks, vectors and index all live on the device, and retrieval sends no request at all. For contracts, medical records or internal knowledge bases, that is often the only shape anyone will accept.',
          },
          { type: 'h2', text: 'Reranking is about fixing the order' },
          {
            type: 'p',
            text: 'A bi-encoder has to encode query and document separately so vectors can be precomputed, and token-level interaction gets lost. "Refund policy" and "return rules" land close in vector space, but so do "no refunds" and "refunds". A cross-encoder concatenates query and candidate into one input and runs the model over the pair. Much more accurate, but one forward pass per candidate and nothing can be precomputed.',
          },
          {
            type: 'p',
            text: 'So the usual shape has two stages: embeddings recall 50 candidates, the cross-encoder cuts that to 5. MS MARCO MiniLM Cross-Encoder at about 22.1 MiB is the light option; BGE Reranker Base at about 266 MiB is stronger and takes longer to download.',
          },
          {
            type: 'table',
            caption: 'Measured sizes by stage',
            head: ['Stage', 'Representative model', 'Measured size', 'Output'],
            rows: [
              ['Embedding', 'all-MiniLM-L6-v2', '~21.9 MiB', '384-dim vector'],
              ['Embedding (multilingual / long)', 'BGE-M3', '~1.1 GB', '1024-dim vector'],
              ['Index', 'hnswlib.js / Voyager / LanceDB / Vectra', 'Library only, no weights', 'top-k neighbour ids'],
              ['Rerank', 'MS MARCO MiniLM Cross-Encoder', '~22.1 MiB', 'query-document relevance'],
              ['Rerank (stronger)', 'BGE Reranker Base', '~266 MiB', 'query-document relevance'],
            ],
          },
          { type: 'h2', text: 'The code that chains it' },
          {
            type: 'code',
            label: 'Two-stage retrieval with transformers.js',
            text: "import { pipeline } from '@huggingface/transformers';\n\nconst embed = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { dtype: 'q8' });\nconst encode = async (text: string) =>\n  (await embed(text, { pooling: 'mean', normalize: true })).data;\n\n// 1. build: encode every chunk, insert into HNSW\n// 2. recall: index.search(queryVec, 50)\n// 3. rerank: cross-encode (query, doc), keep the top 5",
          },
          {
            type: 'p',
            text: 'A trap we hit: index and query have to use the same embedding model and the same normalisation. Swap the model, even for one with the same dimensions, and the index must be rebuilt because similarity scores stop being comparable. Rebuilding an index in a tab takes time, so decide the model before you build it.',
          },
          { type: 'h2', text: 'When local is worth it' },
          {
            type: 'ul',
            items: [
              'Documents cannot be uploaded, so retrieval has to happen on the device',
              'Intranets, flights, field work, anywhere the network is absent or poor',
              'No per-token embedding API bill, which matters more as the user count grows',
              'Interactive search loses one network round trip and feels noticeably different',
            ],
          },
          {
            type: 'p',
            text: 'Millions of chunks, frequent full rebuilds, or one shared index across tenants are different: the bottleneck is index operations, not latency, and the client is the wrong home.',
          },
          {
            type: 'p',
            text: 'The three demos can be tried in order: change models in the embedding demo and the similarity matrix shifts; watch the reranker reorder a candidate list; semantic search shows both stages chained.',
          },
          { type: 'links', items: [
            { label: 'On this site · Text embeddings demo', href: '/demos/search-rag/embedding' },
            { label: 'On this site · Cross-encoder reranker demo', href: '/demos/search-rag/reranker' },
            { label: 'On this site · Semantic search demo', href: '/demos/search-rag/semantic-search' },
            { label: 'Model page · all-MiniLM-L6-v2', href: '/search-rag/embedding/all-minilm-l6-v2' },
            { label: 'Model page · BGE-M3', href: '/search-rag/embedding/bge-m3' },
            { label: 'Model page · MS MARCO MiniLM Cross-Encoder', href: '/search-rag/reranker/ms-marco-minilm' },
            { label: 'Model page · hnswlib.js', href: '/search-rag/semantic-search/hnswlib-wasm' },
            { label: 'Docs · Transformers.js', href: 'https://huggingface.co/docs/transformers.js' },
            { label: 'GitHub · nmslib/hnswlib', href: 'https://github.com/nmslib/hnswlib' },
          ] },
        ],
      },
    },
  },
  {
    slug: 'webnn-browser-neural-network-inference',
    date: '2026-11-05',
    tags: ['webnn', 'webgpu', 'wasm', 'browser-ai'],
    i18n: {
      zh: {
        title: 'WebNN 现在能在浏览器里做什么',
        description:
          'W3C 的 WebNN 是眼下唯一能碰到 NPU 的 Web API。这篇记一下它现在在 Chrome 里怎么开、和 ONNX 权重怎么接、以及哪些任务真能从 NPU 上拿到好处。',
        blocks: [
          {
            type: 'p',
            text: '以前在浏览器里跑神经网络，要么把 C++ 推理引擎编译成 WebAssembly 在 CPU 上算，要么写 WebGPU 的 compute shader 在 GPU 上算。这两年买的笔记本多半还有一块 NPU，系统和原生应用一直在用，浏览器却够不着。WebNN 就是为这个做的 W3C API：把整张模型图交给操作系统的机器学习栈，由它决定落在 NPU、GPU 还是 CPU。',
          },
          { type: 'h2', text: '它是个只管推理的 API' },
          {
            type: 'p',
            text: 'W3C 机器学习工作组做的这个 API 只管推理，没有反向传播和梯度下降，训练还是在 PyTorch 那边完成，浏览器负责把前向跑好。规范 2026 年 1 月更新到候选推荐，算子集和图模型基本稳定，厂商被正式邀请实现和测试。眼下能碰 NPU 的 Web API 只有它一个。',
          },
          {
            type: 'p',
            text: '用法和常见推理引擎差不多：拿 `MLGraphBuilder` 把网络描述成计算图，输入、常量权重、卷积、激活都写进去，build 阶段由浏览器做整图编译，算子融合和内存布局都在这一步定下来，之后换输入反复执行就行。NPU 驱动要的就是整图可见，逐算子调用的命令式 API 干不了这个。',
          },
          {
            type: 'p',
            text: '能覆盖的任务大致这些：',
          },
          {
            type: 'ul',
            items: [
              '图像分类、目标检测、语义分割、超分辨率、人脸和姿态关键点',
              '语音识别、VAD、降噪、音频分类，本站目录里多数音频任务都在范围内',
              '文本分类、嵌入向量、中小型语言模型，规范作者提过让 7 到 13B 参数模型拿到硬件加速',
              '需要自定义 shader 的大模型生成式推理不算在内，WebNN 规范里没有写着色器的能力，那还是 WebGPU 的活',
            ],
          },
          { type: 'h2', text: '三条通路分别到哪块芯片' },
          {
            type: 'p',
            text: '这三者其实是对着不同硬件层的。WebGPU 给你着色器级的控制权，吞吐最高也最费电；WebNN 只管推理，把整图交给系统 ML 栈去调度，好处是能吃到 NPU 的低功耗；WebAssembly 是编译目标，所有浏览器都支持，onnxruntime-web 和 transformers.js 底层就在它上面以接近原生的速度跑 CPU。到 2026 年，WebNN 在 Chromium 之外还没有着落，兼容性兜底仍然是 WASM。',
          },
          {
            type: 'table',
            caption: '三条通路的差异（浏览器支持为 2026 年底的状态）',
            head: ['维度', 'WebNN', 'WebGPU', 'WebAssembly'],
            rows: [
              ['定位', '神经网络推理专用 API', '通用 GPU 计算 API', '通用 CPU 执行格式'],
              ['目标硬件', 'NPU / GPU / CPU（操作系统 ML 栈调度）', 'GPU', 'CPU（SIMD 向量化）'],
              ['抽象层级', '整图编译，声明式算子', '着色器级，需自写 kernel', '编译目标，引擎自带 kernel'],
              ['浏览器支持', 'Chrome/Edge（flag 或 Origin Trial）；Firefox/Safari 暂未实现', 'Chrome/Edge/Firefox 已默认启用，Safari 已跟进', '所有浏览器'],
              ['功耗', 'NPU 上 INT8 推理能效远高于 GPU', '并行吞吐最高，也最耗电', '无硬件加速，纯 CPU 功耗'],
              ['擅长', '低功耗常驻推理', '大模型生成式推理、自定义算子', '最大兼容性兜底'],
            ],
          },
          {
            type: 'p',
            text: '实际写的时候按 NPU、GPU、CPU 的顺序探测，谁能用就用谁：',
          },
          {
            type: 'code',
            label: '后端探测',
            text: "async function pickBackend() {\n  if ('ml' in navigator) {\n    for (const deviceType of ['npu', 'gpu']) {\n      try {\n        await navigator.ml.createContext({ deviceType });\n        return `webnn:${deviceType}`;\n      } catch {\n        // 该设备类不可用（无 NPU / 驱动不支持），继续降级\n      }\n    }\n  }\n  if ('gpu' in navigator) return 'webgpu';\n  return 'wasm';\n}",
          },
          { type: 'h2', text: '现在怎么把它打开' },
          {
            type: 'p',
            text: '到 2026 年底，Chrome/Edge 里要在 `chrome://flags` 打开 #web-machine-learning-neural-network，这个 flag 目前排到 Milestone 150。两家也都开过多轮 Origin Trial，注册 token 后能在生产域名对真实用户启用。Firefox 和 Safari 还没实现，`navigator.ml` 探测不到就退回 WebGPU 或 WASM。后端这边，Windows 从 DirectML 迁到了 Windows ML（能接 OpenVINO 等执行提供者），macOS 走 Core ML，Android 走系统 NN 栈。图由 WebNN 描述，具体用哪块芯片交给平台，就是这个意思。',
          },
          {
            type: 'p',
            text: '原生 API 三步：建 context、用 builder 拼图、编译一次之后反复执行。',
          },
          {
            type: 'code',
            label: 'MLGraphBuilder 拼一个小卷积图',
            text: "const context = await navigator.ml.createContext({ deviceType: 'npu' });\nconst builder = new MLGraphBuilder(context);\n\nconst input = builder.input('input', {\n  dataType: 'float32',\n  shape: [1, 3, 224, 224],\n});\nconst weights = builder.constant(\n  { dataType: 'float32', shape: [32, 3, 3, 3] },\n  new Float32Array(weightData),\n);\n\nconst graph = await builder.build({\n  output: builder.relu(builder.conv2d(input, weights, { padding: [1, 1, 1, 1] })),\n});\n\n// 之后每次推理：\nconst { outputs } = await context.compute(graph, { input }, { output });",
          },
          {
            type: 'p',
            text: '手写图只适合小 demo，真模型几百个算子没人手工拼。实际入口是运行时：ONNX Runtime Web 把 WebNN 做成一个执行提供者，换后端就是改配置数组里的名字。',
          },
          {
            type: 'code',
            label: 'onnxruntime-web 切到 WebNN',
            text: "const session = await ort.InferenceSession.create('./model.onnx', {\n  executionProviders: [\n    { name: 'webnn', deviceType: 'npu', powerPreference: 'default' },\n    'webgpu',\n    'wasm',\n  ],\n});\n// ORT 会拆分计算图：WebNN 能跑的子图交给它，其余算子自动回退",
          },
          { type: 'h2', text: '和 ONNX 的关系' },
          {
            type: 'p',
            text: 'ONNX 管模型长什么样，`.onnx` 文件、算子集、序列化格式都是它定义的；WebNN 管在哪儿跑，只定义浏览器里的图构建和执行，不碰模型格式。两边能接上，一是因为 WebNN 的算子集从一开始就照着覆盖 ONNX 算子设计，卷积、matmul、激活都有对应；二是因为最常用的路径就是 ONNX Runtime Web：加载 `.onnx`，拆图，把适合加速的子图交给 WebNN 执行提供者，其余退回 WebGPU/WASM。所以权重本来就是 ONNX 的话，接 WebNN 不用转格式，执行提供者列表里加一项就行。',
          },
          { type: 'h2', text: '哪些任务真能受益' },
          {
            type: 'ul',
            items: [
              '一开就是整场会议甚至一整天的常驻任务，实时字幕、VAD、热词唤醒，交给 NPU 基本不占 GPU。社区在骁龙 X 上测过 Whisper 走 NPU 到 30 倍速实时，GPU 那边闲着',
              '文档、语音、图像不能出设备的场景',
              '离线和弱网，PWA 里推理本来就该在本地',
              '文本分类、嵌入、检测这种每次几毫秒、调用量又大的中小模型',
            ],
          },
          {
            type: 'p',
            text: '有两类现在还用不上：几十亿参数的大 LLM 生成式推理，WebLLM、MLC 这些生态都压在 WebGPU 上，算子覆盖也更全；还有 Safari/Firefox 用户，回退路径得留着，所以上面 `pickBackend` 才按那个顺序降级。',
          },
          {
            type: 'p',
            text: '本站每个演示页现在走的都是下载 ONNX 权重、交给 onnxruntime-web 推理，WASM 和 WebGPU 的底座已经在了。等 WebNN 铺开，同一批权重不用转格式，执行提供者列表里加个 `webnn`，推理就挪到 NPU 上。',
          },
          { type: 'links', items: [
            { label: 'W3C 规范 · Web Neural Network API', href: 'https://www.w3.org/TR/webnn/' },
            { label: 'W3C 机器学习工作组', href: 'https://www.w3.org/groups/wg/webmachinelearning/' },
            { label: 'WebNN 开发者社区（webnn.io）', href: 'https://webnn.io/' },
            { label: 'GitHub · webnn-samples 官方示例', href: 'https://github.com/webmachinelearning/webnn-samples' },
            { label: 'ONNX Runtime Web 文档（Web 执行提供者）', href: 'https://onnxruntime.ai/docs/tutorials/web/' },
            { label: 'ONNX 官网', href: 'https://onnx.ai/' },
            { label: '本站 · 浏览器端模型演示（onnxruntime-web 实跑）', href: '/demos' },
          ] },
        ],
      },
      en: {
        title: 'What WebNN can actually do in a browser today',
        description:
          'WebNN is the only web API that can reach an NPU. How to turn it on in Chrome today, how ONNX weights plug into it, and which workloads actually gain something from the NPU.',
        blocks: [
          {
            type: 'p',
            text: 'Running neural networks in a browser used to mean one of two things: compile a C++ engine to WebAssembly and grind on the CPU, or write WebGPU compute shaders for the GPU. Most laptops bought in the last couple of years also have an NPU. The OS and native apps use it constantly, and the browser had no way to reach it. WebNN is the W3C API for exactly that: hand the whole model graph to the operating system ML stack, and let it schedule onto NPU, GPU or CPU.',
          },
          { type: 'h2', text: 'An inference-only API' },
          {
            type: 'p',
            text: 'The W3C Machine Learning working group built this for inference only. There is no backpropagation or gradient descent; training stays in PyTorch and the browser runs forward passes. The spec reached an updated Candidate Recommendation in January 2026, with the operator set and graph model stable enough that vendors were formally invited to implement and test. It is still the only web API that exposes the NPU.',
          },
          {
            type: 'p',
            text: 'Usage looks like the inference engines you already know. `MLGraphBuilder` describes the graph, with inputs, constant weights, convolutions and activations; the browser compiles the whole graph at build time, where operator fusion and memory layout get decided, and then you execute repeatedly with different inputs. NPU drivers want that whole-graph view. An imperative, op-by-op API cannot target this hardware well.',
          },
          {
            type: 'p',
            text: 'The tasks it covers today, roughly:',
          },
          {
            type: 'ul',
            items: [
              'Image classification, object detection, segmentation, super-resolution, face and pose landmarks',
              'Speech recognition, VAD, denoising and audio classification, which covers most audio tasks in this catalogue',
              'Text classification, embeddings and small language models; the spec authors mention hardware-accelerating 7 to 13B parameter models',
              'Not generative LLM inference with custom shaders. The WebNN spec has no shader authoring, so that stays with WebGPU',
            ],
          },
          { type: 'h2', text: 'Three routes to three different chips' },
          {
            type: 'p',
            text: 'These three point at different hardware layers. WebGPU gives shader-level control, the highest throughput and the highest power draw. WebNN only does inference and hands the graph to the OS ML stack, which is how it gets the NPU efficiency. WebAssembly is a compilation target every browser supports; onnxruntime-web and transformers.js run on it at near-native CPU speed. As of 2026 WebNN still has no footing outside Chromium, so WASM remains the compatibility floor.',
          },
          {
            type: 'table',
            caption: 'Differences between the routes (browser support as of late 2026)',
            head: ['Aspect', 'WebNN', 'WebGPU', 'WebAssembly'],
            rows: [
              ['Role', 'Dedicated neural inference API', 'General-purpose GPU compute API', 'Universal CPU execution format'],
              ['Target hardware', 'NPU / GPU / CPU (OS ML stack schedules)', 'GPU', 'CPU (SIMD vectorised)'],
              ['Abstraction', 'Whole-graph compilation, declarative ops', 'Shader level, hand-written kernels', 'Compilation target, kernels ship with the engine'],
              ['Browser support', 'Chrome/Edge (flag or Origin Trial); Firefox/Safari not yet', 'Default in Chrome/Edge/Firefox, Safari following', 'Every browser'],
              ['Power', 'INT8 inference on NPU is far more efficient than GPU', 'Highest parallel throughput, highest power draw', 'No acceleration, pure CPU'],
              ['Best at', 'Low-power always-on inference', 'Large generative models, custom operators', 'Maximum-compatibility fallback'],
            ],
          },
          {
            type: 'p',
            text: 'In practice, probe NPU, then GPU, then CPU, and use whichever answers:',
          },
          {
            type: 'code',
            label: 'Backend probing',
            text: "async function pickBackend() {\n  if ('ml' in navigator) {\n    for (const deviceType of ['npu', 'gpu']) {\n      try {\n        await navigator.ml.createContext({ deviceType });\n        return `webnn:${deviceType}`;\n      } catch {\n        // that device class is unavailable (no NPU / driver), keep falling back\n      }\n    }\n  }\n  if ('gpu' in navigator) return 'webgpu';\n  return 'wasm';\n}",
          },
          { type: 'h2', text: 'Turning it on today' },
          {
            type: 'p',
            text: 'As of late 2026, Chrome and Edge enable WebNN through the #web-machine-learning-neural-network entry in `chrome://flags`, currently slated through Milestone 150. Both have also run several rounds of Origin Trials, so with a registered token you can turn it on for real users on a production origin. Firefox and Safari have not implemented it, so fall back when `navigator.ml` is missing. On the backend side Windows has moved from DirectML to Windows ML, which can load OpenVINO and other providers; macOS maps to Core ML, Android to the platform NN stack. WebNN describes the graph, the platform picks the accelerator.',
          },
          {
            type: 'p',
            text: 'Three steps: create a context, assemble the graph with the builder, compile once and execute repeatedly.',
          },
          {
            type: 'code',
            label: 'A small convolution graph with MLGraphBuilder',
            text: "const context = await navigator.ml.createContext({ deviceType: 'npu' });\nconst builder = new MLGraphBuilder(context);\n\nconst input = builder.input('input', {\n  dataType: 'float32',\n  shape: [1, 3, 224, 224],\n});\nconst weights = builder.constant(\n  { dataType: 'float32', shape: [32, 3, 3, 3] },\n  new Float32Array(weightData),\n);\n\nconst graph = await builder.build({\n  output: builder.relu(builder.conv2d(input, weights, { padding: [1, 1, 1, 1] })),\n});\n\n// then, on every inference:\nconst { outputs } = await context.compute(graph, { input }, { output });",
          },
          {
            type: 'p',
            text: 'Hand-writing a graph is fine for a demo and miserable for a real model with hundreds of operators. The practical entry point is a runtime: ONNX Runtime Web exposes WebNN as an execution provider, so switching backends is just a change to a config array.',
          },
          {
            type: 'code',
            label: 'Switching onnxruntime-web to WebNN',
            text: "const session = await ort.InferenceSession.create('./model.onnx', {\n  executionProviders: [\n    { name: 'webnn', deviceType: 'npu', powerPreference: 'default' },\n    'webgpu',\n    'wasm',\n  ],\n});\n// ORT partitions the graph: subgraphs WebNN can run go to it, the rest fall back",
          },
          { type: 'h2', text: 'How it relates to ONNX' },
          {
            type: 'p',
            text: 'ONNX defines what a model looks like: the `.onnx` file, the operator set, the serialisation. WebNN defines where it runs: graph construction and execution inside the browser, with no model format of its own. They fit together for two reasons. WebNN operators were designed from the start to cover ONNX operators, so convolutions, matmuls and activations have direct counterparts. And the common engineering path is ONNX Runtime Web: load the `.onnx`, partition the graph, send accelerator-friendly subgraphs to the WebNN provider and fall back to WebGPU or WASM for the rest. If your weights are already ONNX, there is no format conversion to do. Just add one entry to the execution-provider list.',
          },
          { type: 'h2', text: 'Workloads that actually benefit' },
          {
            type: 'ul',
            items: [
              'Always-on tasks that run for a whole meeting or a whole shift: live captions, VAD, wake-word spotting. On an NPU they barely touch the GPU or the battery; community tests on Snapdragon X report Whisper at up to 30x realtime with the GPU asleep',
              'Documents, audio and images that cannot leave the device',
              'Offline and poor networks, where a PWA should be doing inference locally anyway',
              'Small and mid-sized models with many users: classification, embeddings and detection at a few milliseconds per call',
            ],
          },
          {
            type: 'p',
            text: 'Two cases are out for now. Multi-billion-parameter generative LLMs, where WebLLM and MLC are firmly on WebGPU and operator coverage is more mature. And Safari or Firefox users, who still need the WebGPU/WASM fallback, which is why `pickBackend` degrades in that order.',
          },
          {
            type: 'p',
            text: 'Every demo on this site already downloads ONNX weights and runs them through onnxruntime-web, so the WASM and WebGPU substrate is in place. Once WebNN ships broadly, the same weights need no conversion: add `webnn` to the execution-provider list and inference moves onto the NPU.',
          },
          { type: 'links', items: [
            { label: 'W3C spec · Web Neural Network API', href: 'https://www.w3.org/TR/webnn/' },
            { label: 'W3C Machine Learning Working Group', href: 'https://www.w3.org/groups/wg/webmachinelearning/' },
            { label: 'WebNN developer community (webnn.io)', href: 'https://webnn.io/' },
            { label: 'GitHub · webnn-samples official examples', href: 'https://github.com/webmachinelearning/webnn-samples' },
            { label: 'ONNX Runtime Web docs (web execution providers)', href: 'https://onnxruntime.ai/docs/tutorials/web/' },
            { label: 'ONNX homepage', href: 'https://onnx.ai/' },
            { label: 'On this site · in-browser model demos (real onnxruntime-web runs)', href: '/demos' },
          ] },
        ],
      },
    },
  },
  {
    slug: 'voice-activity-detection',
    date: '2026-11-05',
    tags: ['audio', 'vad', 'speech'],
    i18n: {
      zh: {
        title: '用 Silero VAD 在浏览器里切出语音区间',
        description:
          'VAD 只判断哪几段有人在说话。这篇写我们接 Silero VAD 的 ONNX 权重时踩的坑，以及目录里另一个 pyannote-segmentation 为什么在演示页里由 Silero 代跑。',
        blocks: [
          {
            type: 'p',
            text: '语音活动检测（VAD）只干一件事：给一段音频，标出哪几段有人说话。不管内容，也不管是谁，输出一条逐帧的「这是人声」概率，再用阈值和滞回规则切成区间。实时字幕靠它决定什么时候唤起 ASR，会议转写靠它跳过静音，语音助手靠它判断你说完没有。几乎每条语音管线都从这一步开始。',
          },
          { type: 'h2', text: '让 ASR 顺手做不划算' },
          {
            type: 'p',
            text: 'Whisper 这类模型权重几十到几百 MB，还得逐 token 解码。Silero VAD 的 fp32 ONNX 权重实测 2.3 MB，32 ms 出一帧概率，CPU 单线程毫秒级。先用它把静音和音乐切掉，只把真有人说话的段落送进 ASR，转写时间、显存、token 都省下来了。',
          },
          {
            type: 'p',
            text: '另一个原因更实际：ASR 对着纯噪声或者一段音乐，偶尔会一本正经地吐出文字来。前面挂个 VAD 把非语音帧拦掉，这种幻觉文本能少一大半。',
          },
          { type: 'h2', text: '它不管的三件事' },
          {
            type: 'ul',
            items: [
              '不识别内容，给的是时间区间，不是文字',
              '不区分说话人，那是 diarization 的活，pyannote 那一套在 VAD 之后还要再走几步',
              '不改波形，只标区间，想要干净的信号得去降噪那页',
            ],
          },
          { type: 'h2', text: '目录里的两个模型' },
          {
            type: 'p',
            text: '`audio/vad` 下有两个。Silero VAD 是我们默认用的，为流式推理设计，官方 fp32 ONNX 权重 2.3 MB，16 kHz 下 32 ms 一帧，LSTM 状态跨帧传，浏览器里用 `@ricky0123/vad-web` 或者 onnxruntime-web 都能实时跑，权重是 MIT 许可。pyannote-segmentation-3.0 多给一路输出，除了有没有语音，还报重叠语音的概率，这是说话人分离管线的第一级，q8 量化权重实测约 1.5 MB。',
          },
          {
            type: 'table',
            caption: '两个模型的实测权重下载体积',
            head: ['维度', 'Silero VAD', 'pyannote-segmentation-3.0'],
            rows: [
              ['设计目标', '实时流式 VAD', '说话人分离的第一级'],
              ['输出', '逐帧语音概率', '非语音 / 语音 / 重叠语音三类'],
              ['帧长', '32 ms（16 kHz）', '约 1/16 秒'],
              ['fp32 权重', '2.3 MB ONNX', '约 5.9 MB ONNX'],
              ['最小量化档', '—（官方仅 fp32）', 'q8，约 1.5 MB'],
              ['许可证', 'MIT（权重）/ ISC（vad-web）', 'MIT（权重）'],
            ],
          },
          { type: 'h2', text: '接权重时踩的坑' },
          {
            type: 'p',
            text: '接 Silero v5 的 ONNX 图时，我们先按常见写法喂了 512 个样本，结果概率一直贴在 0.001 不动。查下来 v5 的输入得拼上 64 个样本的历史上下文，形状是 [1, 576]；LSTM 的 state 是 [2,1,128]，每帧还要把输出的 stateN 喂回下一帧，sr 是个 int64 标量。改完拿真实语音样本测，语音段概率落在 0.82 到 1.00，静音段贴近 0。这些细节散在官方文档里，不实际跑一遍很容易漏。',
          },
          {
            type: 'p',
            text: '演示页里选个内置示例或者上传自己的音频，会真的下载这 2.3 MB 权重逐帧跑，波形上高亮语音区间，每个区间的平均置信度单独列出来。三个滑杆是落地时常调的：语音阈值调高更保守，最短语音时长滤掉一闪而过的误触发，最短静音时长防止一句话被呼吸声切碎。「人声 + 音乐」那个示例最考验模型，能量门限的老办法会把整段音乐判成语音，训练过的网络基本能守住边界。pyannote-segmentation 那张卡因为浏览器 ONNX 要自建 Kaldi fbank 前端，页面里明确标了由 Silero 代跑。',
          },
          { type: 'h2', text: '接进管线里' },
          {
            type: 'ul',
            items: [
              '实时字幕和会议纪要：切好的区间逐段送 ASR，再汇总。本站应用场景里 VAD + Whisper + 摘要就是这个结构',
              '语音助手用尾点检测判断你说完没有，比固定超时自然',
              '克隆和降噪前只保留人声帧，免得把音乐一起学进去',
              '音频归档按语音区间检索、跳转、计费',
            ],
          },
          { type: 'h2', text: '后面接什么' },
          {
            type: 'p',
            text: '下游两页都在本站：语音识别把区间转成带时间戳的文字，语音降噪在同一段音频上还原干净波形。从 VAD 演示页开始顺着点过去就行。',
          },
          { type: 'links', items: [
            { label: '本站演示 · 语音活动检测', href: '/demos/audio/vad' },
            { label: '本站演示 · 语音识别', href: '/demos/audio/asr' },
            { label: '本站演示 · 语音降噪', href: '/demos/audio/denoising' },
            { label: '模型详情 · Silero VAD', href: '/audio/vad/silero-vad-web' },
            { label: '模型详情 · pyannote-segmentation', href: '/audio/vad/pyannote-segmentation' },
            { label: 'GitHub · snakers4/silero-vad', href: 'https://github.com/snakers4/silero-vad' },
            { label: 'GitHub · ricky0123/vad（vad-web）', href: 'https://github.com/ricky0123/vad' },
            { label: 'GitHub · pyannote/pyannote-audio', href: 'https://github.com/pyannote/pyannote-audio' },
          ] },
        ],
      },
      en: {
        title: 'Cutting speech ranges out of audio with Silero VAD',
        description:
          'VAD only decides which ranges contain speech. These are notes from wiring up the Silero ONNX weights, including why the other model in our catalogue is run by Silero in the demo.',
        blocks: [
          {
            type: 'p',
            text: 'Voice activity detection does one thing: given an audio clip, mark the ranges where someone is speaking. It says nothing about content or speaker. What comes out is a per-frame speech probability, and a threshold with hysteresis turns that track into segments. Live captions use it to decide when to wake the ASR, meeting transcribers use it to skip silence, and voice assistants use it to tell whether you have finished. Almost every speech pipeline starts here.',
          },
          { type: 'h2', text: 'Letting the ASR do it is expensive' },
          {
            type: 'p',
            text: 'Models like Whisper weigh tens to hundreds of MB and decode token by token. Silero VAD\u2019s fp32 ONNX build measures 2.3 MB, scores one 32 ms frame at a time and runs single-threaded on CPU with millisecond latency. Cut silence and music out first and only the real speech goes to the ASR, which saves decoding time, memory and tokens together.',
          },
          {
            type: 'p',
            text: 'The other reason is more practical: an ASR can produce perfectly confident text over pure noise or a music bed. A VAD in front blocks most of those phantom words at the source.',
          },
          { type: 'h2', text: 'Three things it does not handle' },
          {
            type: 'ul',
            items: [
              'No content. The output is time ranges, not text',
              'No speakers. That belongs to diarization, and the pyannote stack takes several more steps after VAD',
              'No cleanup. It marks ranges and never touches the waveform; that is the denoising page',
            ],
          },
          { type: 'h2', text: 'The two entries in the catalogue' },
          {
            type: 'p',
            text: 'The `audio/vad` task lists two. Silero VAD is our default, a lightweight network built for streaming with 2.3 MB of fp32 ONNX weights, 16 kHz and 32 ms frames, LSTM state carried across frames, and an MIT licence; in a browser it runs in real time through `@ricky0123/vad-web` or plain onnxruntime-web. pyannote-segmentation-3.0 emits one more thing: besides speech, it scores overlapping speech, which is the first stage of a diarization pipeline. Its q8 build measures about 1.5 MB.',
          },
          {
            type: 'table',
            caption: 'Measured weight download sizes for both models',
            head: ['Aspect', 'Silero VAD', 'pyannote-segmentation-3.0'],
            rows: [
              ['Design goal', 'Real-time streaming VAD', 'First stage of diarization'],
              ['Output', 'Per-frame speech probability', 'Non-speech / speech / overlap'],
              ['Frame length', '32 ms (16 kHz)', '~1/16 s'],
              ['fp32 weights', '2.3 MB ONNX', '~5.9 MB ONNX'],
              ['Smallest quantised build', '— (official builds are fp32)', 'q8, ~1.5 MB'],
              ['Licence', 'MIT (weights) / ISC (vad-web)', 'MIT (weights)'],
            ],
          },
          { type: 'h2', text: 'The trap we hit wiring up the weights' },
          {
            type: 'p',
            text: 'We started by feeding the Silero v5 ONNX graph 512 samples, the way most examples show it, and the probability sat at 0.001 no matter what we played. The v5 input needs 64 samples of history prepended, so the shape is [1, 576]; the LSTM state is [2,1,128], each frame has to feed the returned stateN into the next one, and sr is an int64 scalar. With that fixed, a real speech sample scored between 0.82 and 1.00 and silence sat near zero. Those details are scattered across the docs and easy to miss until you actually run the graph.',
          },
          {
            type: 'p',
            text: 'Pick a built-in sample or upload your own audio and the demo really downloads those 2.3 MB and runs frame by frame, highlighting speech ranges on the waveform and listing each segment\u2019s mean confidence. The three sliders are the ones you end up tuning in production: a higher speech threshold is more conservative, minimum speech duration filters one-frame false triggers, and minimum silence duration keeps a breath from splitting one utterance. The speech-over-music sample is the hard case. An energy gate labels the whole music bed as speech, while a trained network holds the boundary. The pyannote-segmentation card needs a hand-rolled Kaldi fbank front-end in the browser, so the page clearly labels Silero as its stand-in.',
          },
          { type: 'h2', text: 'Where it sits in a pipeline' },
          {
            type: 'ul',
            items: [
              'Live captions and meeting notes: each cut range goes to the ASR, then a summariser folds the text together, the same shape as the VAD + Whisper + summarisation recipe in our applications section',
              'Voice assistants use endpointing to tell when the user has finished, which feels better than a fixed timeout',
              'Cloning and denoising keep only speech frames, so the model never learns the music bed',
              'Archives index, navigate and bill by speech ranges instead of whole files',
            ],
          },
          { type: 'h2', text: 'What comes after it' },
          {
            type: 'p',
            text: 'Both downstream stages have demos here: speech recognition turns the cut ranges into timestamped text, and speech denoising rebuilds a clean waveform from the same audio. Start at the VAD demo and hop across.',
          },
          { type: 'links', items: [
            { label: 'On this site · VAD demo', href: '/demos/audio/vad' },
            { label: 'On this site · Speech recognition demo', href: '/demos/audio/asr' },
            { label: 'On this site · Denoising demo', href: '/demos/audio/denoising' },
            { label: 'Model page · Silero VAD', href: '/audio/vad/silero-vad-web' },
            { label: 'Model page · pyannote-segmentation', href: '/audio/vad/pyannote-segmentation' },
            { label: 'GitHub · snakers4/silero-vad', href: 'https://github.com/snakers4/silero-vad' },
            { label: 'GitHub · ricky0123/vad (vad-web)', href: 'https://github.com/ricky0123/vad' },
            { label: 'GitHub · pyannote/pyannote-audio', href: 'https://github.com/pyannote/pyannote-audio' },
          ] },
        ],
      },
    },
  },
  {
    slug: 'oxr-1.0-document-parsing',
    date: '2026-10-30',
    tags: ['document-understanding', 'ocr', 'multimodal'],
    i18n: {
      zh: {
        title: '1.3B 参数的 OXR-1.0，三个文档解析榜单第一',
        description:
          'SoMark 团队开源的文档解析模型 OXR-1.0，把 PDF 和文档图片解析成 Markdown/JSON 与版面坐标。OmniDocBench、olmOCR-Bench、DocParsingBench 三个榜单第一，单卡 100 页完整解析 101 秒。',
        blocks: [
          {
            type: 'p',
            text: 'SoMark 团队（守扣科技）开源了文档解析模型 **OXR**（Optical Everything Recognition）。主模型 1.3B 参数，开源一周左右拿下三个公开文档解析基准的第一，GitHub 星标首周破千。PDF 和文档图片进去，出来的是 Markdown / JSON，每个内容块还带原页上的版面坐标，按阅读顺序排好。团队管这叫「Agent 友好数据」，意思是解析完不用再加工就能进知识库、RAG 或 Agent 流程。',
          },
          {
            type: 'p',
            text: 'OXR 支持文字、标题、表格、公式、化学方程式、化学结构式、代码块、印章等 **13 类文档元素**：表格输出为 HTML/Markdown（保留行列与单元格结构），公式按 LaTeX 输出，化学方程式用 mhchem 语法、化学结构式用 SMILES 表示，多栏报纸、论文与 A3 试卷按阅读顺序还原。',
          },
          { type: 'h2', text: '三榜第一，速度也是第一梯队' },
          {
            type: 'p',
            text: '三个榜单考的东西不一样。OmniDocBench 覆盖多种文档和版式，连阅读顺序一起评；olmOCR-Bench 用具体检查项看关键文字和表格关系有没有保住；DocParsingBench 是 SoMark 团队自己开源的，针对真实业务文档。',
          },
          { type: 'table', ...OXR_BENCH_TABLE.zh },
          {
            type: 'p',
            text: '速度方面，官方在**单张 NVIDIA RTX PRO 6000 Blackwell（96GB）**上，用 OmniDocBench 固定抽取的 100 页做完整解析：OXR-1.0 用时 101 秒，约为 PaddleOCR-VL-1.6 的 1.43 倍吞吐、MinerU2.5-Pro 的 2.52 倍。',
          },
          { type: 'table', ...OXR_SPEED_TABLE.zh },
          {
            type: 'p',
            text: '注意这组数字对应指定硬件与固定文档集；在线 Demo 会受上传与排队影响，页面等待时间不能直接和它比较。',
          },
          { type: 'h2', text: '用 RSI 把解析错误变成训练数据' },
          {
            type: 'p',
            text: 'OXR 是从零预训练的，后训练阶段用了**递归自我改进（RSI, Recursive Self-Improvement）**。团队说这是文档解析领域第一个不需要新增人工标注数据的 RSI 流程，步骤是：',
          },
          {
            type: 'ul',
            items: [
              'OXR 先解析无标签文档，产生候选结果；',
              '通用多模态模型结合 rollout 评判，把错样本与弱样本找出来并归因；',
              '相近原因由独立聚类模型归组；',
              '通用多模态模型据此制定下一轮训练策略、定向准备数据，交给 OXR 继续训练与验证，循环往复。',
            ],
          },
          {
            type: 'p',
            text: '省的是新增训练数据的人工标注。评判、归因、准备数据都由模型协作完成，哪类文档解析得差，下一轮就围绕它补。',
          },
          { type: 'h2', text: '版面分析可插拔' },
          {
            type: 'p',
            text: '版面分析在 OXR 里是独立的一块，可以换掉：轻量模型负责定位内容区域，主模型在同一阶段做内容识别和阅读顺序判断，判断顺序时能用上内容语义，也省了单独排序那一步。同一块内容怎么拆，各家业务定义不一样，有的要标题加正文，有的要整块当表格。这时候接自己的版面模型，改元素类别、区域边界和分组，识别与排序继续用 OXR 的。',
          },
          { type: 'h2', text: '怎么接入' },
          {
            type: 'p',
            text: '想先试试，官方在线 Demo 可以免费传 PDF/图片，免费 API 不用注册。Node.js 那边有 `somark-js`（Node 18+，带 CLI）：',
          },
          {
            type: 'code',
            label: 'parse.mjs',
            text: 'import { SoMark } from \'somark-js\';\n\n// 自动读取环境变量 SOMARK_API_KEY\nconst client = new SoMark();\n\nconst result = await client.parser.parse({\n  file: \'./sample.pdf\',\n  formats: [\'md\'],\n});\n\nawait result.save(\'./result.md\', \'md\');\nconsole.log(result.md);',
          },
          {
            type: 'p',
            text: '本地部署走 Docker（建议单卡 24GB 显存起步，长文档与高并发建议 48GB+），权重同时发布在 Hugging Face 与 ModelScope。许可证为基于 Apache 2.0 附加条款的自定义许可，商用前请阅读仓库 LICENSE。',
          },
          { type: 'links', items: [
            { label: 'GitHub · SoMarkAI/OXR', href: 'https://github.com/SoMarkAI/OXR' },
            { label: 'Hugging Face · SoMarkAI/OXR-1.0', href: 'https://huggingface.co/SoMarkAI/OXR-1.0' },
            { label: '在线 Demo（浏览器 WASM 社区移植）', href: 'https://huggingface.co/spaces/fusorlabs/oxr-wasm' },
            { label: '官方免费 API', href: 'https://free-oxr.somark.cn/' },
          ] },
          {
            type: 'p',
            text: '本站「多模态 → 文档理解」演示页也收了 OXR-1.0。权重跑在服务端，没有浏览器版本，所以点那张卡片会跳到上面的在线示例，不会在本地推理。',
          },
        ],
      },
      en: {
        title: 'OXR-1.0 tops three parsing benchmarks at 1.3B parameters',
        description:
          'OXR-1.0, open-sourced by the SoMark team, parses PDFs and document images into Markdown/JSON with layout coordinates. It ranks #1 on OmniDocBench, olmOCR-Bench and DocParsingBench while parsing 100 pages in 101 seconds on a single GPU.',
        blocks: [
          {
            type: 'p',
            text: 'The SoMark team has open-sourced **OXR** (Optical Everything Recognition), a document-parsing model whose main network is 1.3B parameters. Within about a week of release it took first place on three public parsing benchmarks and passed 1,000 GitHub stars. PDFs and document images come out as Markdown / JSON, with layout coordinates for each block on the original page, ordered by reading sequence. The team calls this agent-friendly data, meaning it can go straight into a knowledge base, a RAG pipeline or an agent without another processing step.',
          },
          {
            type: 'p',
            text: 'OXR recognises **13 element types**: text, titles, tables, formulas, chemical equations, chemical structures, code blocks, stamps and more. Tables come out as HTML/Markdown with row and cell structure intact, formulas as LaTeX, chemical equations in mhchem syntax, molecular structures as SMILES, and multi-column newspapers, papers and A3 exam sheets are reassembled in reading order.',
          },
          { type: 'h2', text: 'First on three benchmarks, fast too' },
          {
            type: 'p',
            text: 'The three benchmarks look at different things. OmniDocBench covers many document types and layouts, reading order included. olmOCR-Bench checks whether key text and table relations survive. DocParsingBench is open-sourced by SoMark and targets real business documents.',
          },
          { type: 'table', ...OXR_BENCH_TABLE.en },
          {
            type: 'p',
            text: 'For speed, the team parsed a fixed 100-page draw from OmniDocBench on a **single NVIDIA RTX PRO 6000 Blackwell (96 GB)**. OXR-1.0 finished in 101 seconds, roughly 1.43× the throughput of PaddleOCR-VL-1.6 and 2.52× that of MinerU2.5-Pro.',
          },
          { type: 'table', ...OXR_SPEED_TABLE.en },
          {
            type: 'p',
            text: 'Those numbers correspond to the specified hardware and fixed document set. The hosted demo adds upload and queue latency, so wall-clock times you see there are not comparable.',
          },
          { type: 'h2', text: 'Turning parse errors into training data with RSI' },
          {
            type: 'p',
            text: 'OXR is pre-trained from scratch, and its post-training introduces a **recursive self-improvement (RSI)** loop. Per the team it is the first in document parsing that needs no newly hand-labelled data:',
          },
          {
            type: 'ul',
            items: [
              'OXR parses unlabelled documents to produce candidate results;',
              'a general multimodal model judges the rollouts, finding and diagnosing error and weak samples;',
              'an independent clustering model groups similar causes;',
              'the general model then plans the next training round and prepares targeted data, and OXR trains and validates on it. Then the loop repeats.',
            ],
          },
          {
            type: 'p',
            text: 'What it saves is manual labelling of new training data. Judging, attribution and data preparation are done by cooperating models, and the next round targets whichever document type parsed worst.',
          },
          { type: 'h2', text: 'Pluggable layout analysis' },
          {
            type: 'p',
            text: 'Layout analysis is a separate module you can swap. A lightweight model locates content regions while the main model handles recognition and reading order in one pass, so ordering can use content semantics and needs no separate stage. Businesses disagree on how the same block should be split, title plus body or one table, so plug in your own layout model with its own element categories, region boundaries and grouping, and keep OXR\u2019s recognition and ordering.',
          },
          { type: 'h2', text: 'How to get started' },
          {
            type: 'p',
            text: 'The quickest way in is the hosted **online demo** (free uploads) or the **free API** (no sign-up). For Node.js there is the official `somark-js` SDK, Node 18+ with a CLI:',
          },
          {
            type: 'code',
            label: 'parse.mjs',
            text: 'import { SoMark } from \'somark-js\';\n\n// reads the SOMARK_API_KEY environment variable\nconst client = new SoMark();\n\nconst result = await client.parser.parse({\n  file: \'./sample.pdf\',\n  formats: [\'md\'],\n});\n\nawait result.save(\'./result.md\', \'md\');\nconsole.log(result.md);',
          },
          {
            type: 'p',
            text: 'Self-hosting runs via Docker (a single 24 GB GPU to start; 48 GB+ recommended for long documents and higher concurrency). Weights are published on Hugging Face and ModelScope. The licence is a custom one based on Apache 2.0 with additional terms. Read the repository LICENSE before commercial use.',
          },
          { type: 'links', items: [
            { label: 'GitHub · SoMarkAI/OXR', href: 'https://github.com/SoMarkAI/OXR' },
            { label: 'Hugging Face · SoMarkAI/OXR-1.0', href: 'https://huggingface.co/SoMarkAI/OXR-1.0' },
            { label: 'Online demo (community WASM port)', href: 'https://huggingface.co/spaces/fusorlabs/oxr-wasm' },
            { label: 'Official free API', href: 'https://free-oxr.somark.cn/' },
          ] },
          {
            type: 'p',
            text: 'This site also lists OXR-1.0 under Multimodal → Document understanding. Its weights run on servers with no browser build, so clicking that card on the demo page opens the hosted demo above rather than running anything locally.',
          },
        ],
      },
    },
  },
];

export const findPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
