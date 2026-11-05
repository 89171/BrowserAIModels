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
    slug: 'webnn-browser-neural-network-inference',
    date: '2026-11-05',
    tags: ['webnn', 'webgpu', 'wasm', 'browser-ai'],
    i18n: {
      zh: {
        title: 'WebNN 入门：浏览器里的神经网络推理标准',
        description:
          'WebNN 是 W3C 的神经网络推理 API，也是目前唯一能把 NPU 暴露给网页的标准。讲清它是什么、与 WebGPU/WebAssembly 的分工、今天怎么在浏览器里用起来、它与 ONNX 的关系，以及最适合它的场景。',
        blocks: [
          {
            type: 'p',
            text: '在浏览器里跑神经网络，过去只有两条路：把 C++ 推理引擎编译成 **WebAssembly** 在 CPU 上跑，或者写 **WebGPU** 计算着色器在 GPU 上跑。可你这两年买的笔记本里几乎都还有第三块芯片——NPU（神经处理单元），操作系统和原生应用一直在用它，浏览器却始终没有入口。**WebNN（Web Neural Network API）就是补上这块拼图的 W3C 标准**：浏览器内建的神经网络推理 API，把整张模型图交给操作系统的机器学习栈，调度到 NPU、GPU 或 CPU 上执行。',
          },
          { type: 'h2', text: 'WebNN 是什么，能做什么' },
          {
            type: 'p',
            text: 'WebNN 由 W3C 机器学习工作组制定，是**推理专用** API——注意是推理，不是训练：它不提供反向传播和梯度下降，训练照旧在 PyTorch 等框架里完成，浏览器只负责高效执行前向计算。规范在 2026 年 1 月更新到候选推荐（Candidate Recommendation）状态，算子集和图模型趋于稳定，浏览器厂商被正式邀请实现和测试。它也是目前**唯一能触达 NPU 的 Web API**。',
          },
          {
            type: 'p',
            text: '它的使用模型和常见推理引擎一致：用 `MLGraphBuilder` 把网络描述成一张计算图（输入、常量权重、卷积、激活……），浏览器在 build 阶段做**整图编译**——算子融合、内存布局选择都发生在这一步——之后可以带着不同输入反复执行。整图可见正是 NPU 驱动想要的形态，这也是逐算子调用的命令式 API 做不好这件事的原因。',
          },
          {
            type: 'p',
            text: '落到任务上，它目前覆盖了浏览器端 AI 的主干：',
          },
          {
            type: 'ul',
            items: [
              '图像：分类、目标检测、语义分割、超分辨率、人脸与姿态关键点；',
              '音频：语音识别、语音活动检测、降噪、音频分类——本站目录里的多数任务都在射程内；',
              '文本：文本分类、嵌入向量、中小型语言模型（规范作者的目标是让 7–13B 参数的模型在浏览器里获得硬件加速）；',
              '不适合的：需要自定义 shader 的大模型生成式推理，那是 WebGPU 的主场（WebNN 规范明确不提供自定义着色器能力）。',
            ],
          },
          { type: 'h2', text: 'WebNN、WebGPU、WebAssembly 有什么区别' },
          {
            type: 'p',
            text: '三者不是竞争关系，而是面向不同硬件层的三条通路。WebGPU 是通用 GPU 计算 API，给你着色器级的控制权，吞吐高但也最耗电；WebNN 是推理专用 API，把整图交给操作系统 ML 栈调度，能吃到 NPU 的低功耗红利；WebAssembly 是编译目标，所有浏览器都支持，推理引擎（onnxruntime-web、transformers.js 的底层）以近原生速度在 CPU 上执行。WebNN 到了 2026 年还只能算 Chromium 系的「增量选项」，WASM 仍然是最大的兼容性兜底。',
          },
          {
            type: 'table',
            caption: '三条通路的关键差异（浏览器支持状态为 2026 年底的快照）',
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
            text: '所以工程上的正确姿势是渐进增强——按 NPU → GPU → CPU 的顺序探测，谁可用用谁：',
          },
          {
            type: 'code',
            label: '运行时后端选择',
            text: "async function pickBackend() {\n  if ('ml' in navigator) {\n    for (const deviceType of ['npu', 'gpu']) {\n      try {\n        await navigator.ml.createContext({ deviceType });\n        return `webnn:${deviceType}`;\n      } catch {\n        // 该设备类不可用（无 NPU / 驱动不支持），继续降级\n      }\n    }\n  }\n  if ('gpu' in navigator) return 'webgpu';\n  return 'wasm';\n}",
          },
          { type: 'h2', text: '如何在浏览器中使用 WebNN' },
          {
            type: 'p',
            text: '截至 2026 年底，WebNN 在 Chrome/Edge 里通过 `chrome://flags` 的 **#web-machine-learning-neural-network** 开关启用（该 flag 当前覆盖到 Milestone 150），Chrome 与 Edge 也开放了多轮 Origin Trial——注册 token 后可以在生产域名对真实用户启用。Firefox 和 Safari 尚未实现，探测不到 `navigator.ml` 时应回退 WebGPU/WASM。后端方面，Windows 路线已从 DirectML 迁往 Windows ML（可接入 OpenVINO 等执行提供者），macOS 走 Core ML，Android 走系统 NN 栈——这正是「WebNN 只描述图、加速细节交给平台」的设计意图。',
          },
          {
            type: 'p',
            text: '原生 API 的用法分三步：创建 context → 用 builder 拼图 → 编译后反复执行：',
          },
          {
            type: 'code',
            label: 'MLGraphBuilder：拼一张最小的卷积图',
            text: "const context = await navigator.ml.createContext({ deviceType: 'npu' });\nconst builder = new MLGraphBuilder(context);\n\nconst input = builder.input('input', {\n  dataType: 'float32',\n  shape: [1, 3, 224, 224],\n});\nconst weights = builder.constant(\n  { dataType: 'float32', shape: [32, 3, 3, 3] },\n  new Float32Array(weightData),\n);\n\nconst graph = await builder.build({\n  output: builder.relu(builder.conv2d(input, weights, { padding: [1, 1, 1, 1] })),\n});\n\n// 之后每次推理：\nconst { outputs } = await context.compute(graph, { input }, { output });",
          },
          {
            type: 'p',
            text: '不过手写图只适合小 demo，真实模型不会有人手拼几百个算子。实践中的入口是**运行时**：ONNX Runtime Web 把 WebNN 暴露为一个执行提供者（execution provider），换后端只是把配置数组里的名字换掉——',
          },
          {
            type: 'code',
            label: 'onnxruntime-web：一行配置切到 WebNN',
            text: "const session = await ort.InferenceSession.create('./model.onnx', {\n  executionProviders: [\n    { name: 'webnn', deviceType: 'npu', powerPreference: 'default' },\n    'webgpu',\n    'wasm',\n  ],\n});\n// ORT 会拆分计算图：WebNN 能跑的子图交给它，其余算子自动回退",
          },
          { type: 'h2', text: 'WebNN 和 ONNX 是什么关系' },
          {
            type: 'p',
            text: '一句话：**ONNX 是模型格式，WebNN 是执行接口**，一个管「模型长什么样」，一个管「在哪儿跑」。ONNX 定义了 `.onnx` 文件、算子集合和序列化格式，是 PyTorch / TensorFlow 等训练框架通向浏览器生态的桥；WebNN 不定义模型格式，只定义浏览器内的图构建与执行 API。两者的咬合点有两层：其一，WebNN 的算子集从设计之初就以覆盖 ONNX 算子为目标，ONNX 图里的卷积、matmul、激活都有直接的 WebNN 对应；其二，工程上最常用的路径是 ONNX Runtime Web——加载 `.onnx`，把图拆分，加速子图交给 WebNN 执行提供者，其余回退到 WebGPU/WASM。这也意味着：**只要模型是 ONNX 权重，接入 WebNN 不需要任何格式转换**，改一行执行提供者配置即可。',
          },
          { type: 'h2', text: 'WebNN 适合哪些场景' },
          {
            type: 'ul',
            items: [
              '低功耗常驻推理：实时字幕、VAD、热词唤醒这类一开就是整场会议甚至一整天的任务，交给 NPU 几乎不占 GPU、不明显掉电——社区在骁龙 X 上实测 Whisper 走 NPU 可达 30 倍速实时，而 GPU 待机；',
              '隐私敏感的数据处理：文档、语音、图像全程不出设备，没有上传这一步；',
              '离线与弱网环境：推理在本地完成，PWA 场景天然契合；',
              '服务海量用户的中小模型：文本分类、嵌入、检测这类每次几毫秒的调用，在 NPU 上批量成本几乎为零。',
            ],
          },
          {
            type: 'p',
            text: '反过来说，两类情况今天还轮不到 WebNN：一是几十亿参数的大 LLM 生成式推理，社区生态（WebLLM、MLC）都压在 WebGPU 上，算子覆盖也更成熟；二是 Safari/Firefox 用户，必须保留 WebGPU/WASM 回退路径——这也是为什么上面 `pickBackend` 的降级顺序是标准做法。',
          },
          {
            type: 'p',
            text: '对本站来说，WebNN 是一条顺理成章的升级路径：这里的每一个演示页本来走的就是「下载 ONNX 权重 → onnxruntime-web 推理」的形态，运行时底座 WASM/WebGPU 已经就位。等 WebNN 全面落地，同一批 ONNX 权重不需要任何转换，执行提供者列表里加上 `webnn` 一项，推理就能无缝挪进 NPU——这也是把模型目录建在 ONNX 生态上的红利。',
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
        title: 'WebNN: a field guide to neural network inference in the browser',
        description:
          'WebNN is the W3C neural network inference API and the only web API that can reach the NPU. What it is, how it splits duties with WebGPU and WebAssembly, how to use it in a browser today, its relationship with ONNX, and the workloads it fits best.',
        blocks: [
          {
            type: 'p',
            text: 'Running neural networks in the browser used to mean one of two roads: compiling a C++ inference engine to **WebAssembly** and grinding on the CPU, or writing **WebGPU** compute shaders for the GPU. But laptops bought in the last couple of years ship a third chip — an NPU (neural processing unit). Your OS and native apps use it constantly; the browser has had no way to reach it. **WebNN (Web Neural Network API) is the W3C standard that closes that gap**: a browser-builtin inference API that hands an entire model graph to the OS\u2019s machine-learning stack, which schedules it onto the NPU, GPU or CPU.',
          },
          { type: 'h2', text: 'What WebNN is and what it can do' },
          {
            type: 'p',
            text: 'WebNN is built by the W3C Machine Learning working group and is **inference-only** — no backpropagation, no gradient descent. Training stays in PyTorch and friends; the browser executes forward passes efficiently. The spec reached an updated Candidate Recommendation in January 2026, with the operator set and graph model stable enough that browser vendors were formally invited to implement and test. It is also currently **the only web API that exposes the NPU**.',
          },
          {
            type: 'p',
            text: 'Its usage model matches the inference engines you already know: describe the network as a computational graph with `MLGraphBuilder` (inputs, constant weights, convolutions, activations…), and the browser compiles the **whole graph** at build time — operator fusion and memory layout selection happen there — then executes it repeatedly with different inputs. That whole-graph view is exactly what NPU drivers want, which is why an imperative, op-by-op API could never target this hardware well.',
          },
          {
            type: 'p',
            text: 'In terms of tasks, it already covers the backbone of browser AI:',
          },
          {
            type: 'ul',
            items: [
              'Vision: classification, object detection, segmentation, super-resolution, face and pose landmarks;',
              'Audio: speech recognition, voice activity detection, denoising, audio classification — most tasks in this catalogue are in range;',
              'Text: classification, embeddings, small language models (the spec authors\u2019 stated goal is hardware-accelerating 7–13B parameter models in the browser);',
              'Not a fit: generative LLM inference that needs custom shaders — that is WebGPU\u2019s turf (the WebNN spec explicitly provides no shader authoring).',
            ],
          },
          { type: 'h2', text: 'WebNN vs WebGPU vs WebAssembly' },
          {
            type: 'p',
            text: 'These three are not competitors; they are routes to different hardware layers. WebGPU is a general-purpose GPU API with shader-level control — highest throughput, highest power draw. WebNN is an inference-only API that delegates the whole graph to the OS ML stack, unlocking the NPU\u2019s power efficiency. WebAssembly is a compilation target supported by every browser, on which engines like onnxruntime-web and transformers.js execute at near-native CPU speed. In 2026, WebNN is still an incremental option confined to Chromium, and WASM remains the compatibility floor.',
          },
          {
            type: 'table',
            caption: 'Key differences between the three routes (browser support snapshot, late 2026)',
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
            text: 'So the production pattern is progressive enhancement — probe in NPU → GPU → CPU order and use whichever answers:',
          },
          {
            type: 'code',
            label: 'Runtime backend selection',
            text: "async function pickBackend() {\n  if ('ml' in navigator) {\n    for (const deviceType of ['npu', 'gpu']) {\n      try {\n        await navigator.ml.createContext({ deviceType });\n        return `webnn:${deviceType}`;\n      } catch {\n        // that device class is unavailable (no NPU / driver), keep falling back\n      }\n    }\n  }\n  if ('gpu' in navigator) return 'webgpu';\n  return 'wasm';\n}",
          },
          { type: 'h2', text: 'Using WebNN in the browser today' },
          {
            type: 'p',
            text: 'As of late 2026, WebNN in Chrome/Edge is enabled via the **#web-machine-learning-neural-network** entry in `chrome://flags` (the flag is currently slated through Milestone 150), and both Chrome and Edge have opened several rounds of Origin Trials — register a token and real users on your production origin get the API. Firefox and Safari have not implemented it yet, so fall back to WebGPU/WASM whenever `navigator.ml` is missing. On the backend side, Windows has migrated from DirectML to Windows ML (which can load OpenVINO and other execution providers), macOS maps to Core ML, Android to the platform NN stack — precisely the design intent of "WebNN describes the graph, the platform picks the accelerator".',
          },
          {
            type: 'p',
            text: 'The native API works in three steps: create a context, assemble a graph with the builder, compile once and execute repeatedly:',
          },
          {
            type: 'code',
            label: 'MLGraphBuilder: the smallest convolution graph',
            text: "const context = await navigator.ml.createContext({ deviceType: 'npu' });\nconst builder = new MLGraphBuilder(context);\n\nconst input = builder.input('input', {\n  dataType: 'float32',\n  shape: [1, 3, 224, 224],\n});\nconst weights = builder.constant(\n  { dataType: 'float32', shape: [32, 3, 3, 3] },\n  new Float32Array(weightData),\n);\n\nconst graph = await builder.build({\n  output: builder.relu(builder.conv2d(input, weights, { padding: [1, 1, 1, 1] })),\n});\n\n// then, on every inference:\nconst { outputs } = await context.compute(graph, { input }, { output });",
          },
          {
            type: 'p',
            text: 'Hand-writing graphs is fine for a demo and miserable for a real model — nobody assembles hundreds of operators manually. The practical entry point is a **runtime**: ONNX Runtime Web exposes WebNN as an execution provider, so switching backends is just rearranging a config array —',
          },
          {
            type: 'code',
            label: 'onnxruntime-web: switch to WebNN with one config line',
            text: "const session = await ort.InferenceSession.create('./model.onnx', {\n  executionProviders: [\n    { name: 'webnn', deviceType: 'npu', powerPreference: 'default' },\n    'webgpu',\n    'wasm',\n  ],\n});\n// ORT partitions the graph: subgraphs WebNN can run go to it, the rest fall back",
          },
          { type: 'h2', text: 'WebNN and ONNX: what is the relationship' },
          {
            type: 'p',
            text: 'In one line: **ONNX is a model format, WebNN is an execution interface** — one says what a model looks like, the other says where it runs. ONNX defines the `.onnx` file, the operator set and the serialization that bridges training frameworks (PyTorch, TensorFlow) into the browser ecosystem. WebNN defines no model format at all, only the in-browser graph construction and execution API. They mesh in two ways: first, WebNN\u2019s operator set was designed from day one to cover ONNX operators — convolutions, matmuls and activations in an ONNX graph have direct WebNN counterparts; second, the common engineering path is ONNX Runtime Web — load the `.onnx`, partition the graph, send accelerator-friendly subgraphs to the WebNN provider and fall back to WebGPU/WASM for the rest. Which means: **if your weights are already ONNX, adopting WebNN requires no format conversion at all** — just one execution-provider line.',
          },
          { type: 'h2', text: 'Where WebNN fits best' },
          {
            type: 'ul',
            items: [
              'Low-power always-on inference: live captions, VAD, wake-word spotting — tasks that run for a whole meeting or a whole shift. On the NPU they barely touch the GPU or the battery; community tests on Snapdragon X report Whisper at up to 30x realtime via the NPU with the GPU asleep;',
              'Privacy-sensitive data: documents, audio and images never leave the device — there is no upload step;',
              'Offline and poor-network environments: inference happens locally, a natural fit for PWAs;',
              'Small-to-mid models serving many users: classification, embeddings, detection — millisecond calls that cost almost nothing when batched on an NPU.',
            ],
          },
          {
            type: 'p',
            text: 'Two cases where WebNN is not the answer yet: multi-billion-parameter generative LLMs, where the ecosystem (WebLLM, MLC) is firmly on WebGPU and operator coverage is more mature; and Safari/Firefox users, who still need the WebGPU/WASM fallback — which is exactly why the `pickBackend` degradation order above is the standard practice.',
          },
          {
            type: 'p',
            text: 'For this site, WebNN is a natural upgrade path: every demo here already follows the "download ONNX weights → run onnxruntime-web" shape, with the WASM/WebGPU substrate in place. Once WebNN ships broadly, the same ONNX weights need no conversion — add one `webnn` entry to the execution-provider list and inference moves seamlessly onto the NPU. That is the dividend of building a model catalogue on the ONNX ecosystem.',
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
        title: '语音活动检测（VAD）：先听清「有人在说」，再谈「说了什么」',
        description:
          'VAD 只回答一个二分类问题——这一秒有没有人说话——却是语音管线里性价比最高的一环。介绍 Silero VAD 与 pyannote-segmentation 两个模型，并附上本站新上线的浏览器端 VAD 演示页。',
        blocks: [
          {
            type: 'p',
            text: '语音活动检测（Voice Activity Detection, VAD）解决的是语音处理里最朴素的问题：**给定一段音频，判断哪些时间段有人在说话**。它不识别说了什么，也不区分说话人，只输出一条逐帧的「这是人声」概率曲线，再由阈值和滞回规则把概率曲线切成区间。听起来简单，但它几乎是所有语音系统的第一道工序：实时字幕用它决定什么时候唤起 ASR，会议转写用它跳过静音段，语音助手用它判断你有没有把话说完。',
          },
          { type: 'h2', text: '为什么不让 ASR 顺便把这件事做了' },
          {
            type: 'p',
            text: '因为性价比差一个数量级。Whisper 这类声学模型的权重在几十到几百 MB，逐段解码自回归生成文本；而现代 VAD 模型只有 **1–2M 参数**（Silero VAD 的 fp32 ONNX 权重实测 2.3 MB），32 ms 一帧就能给出概率，CPU 上单线程毫秒级延迟。先用 VAD 切掉静音和音乐，只把真正的语音段交给 ASR，转写速度、显存占用和 token 成本都直接省下来。',
          },
          {
            type: 'p',
            text: '还有个容易被忽略的原因：**防幻觉**。ASR 对纯噪声、音乐、咳嗽声偶尔会「脑补」出一本正经的文本。VAD 先把非语音帧拦在门外，幻觉文本就从源头少了一大半。',
          },
          { type: 'h2', text: '它不做什么' },
          {
            type: 'ul',
            items: [
              '不识别内容：输出的是时间区间，不是文本；',
              '不区分说话人：「谁在说」是说话人分离（diarization）的工作，pyannote 全家桶在 VAD 之后还得多走几步；',
              '不是降噪：VAD 只标记区间，不修改波形——想还原干净信号请看降噪那一页。',
            ],
          },
          { type: 'h2', text: '本站收录的两个模型' },
          {
            type: 'p',
            text: '目录里 `audio/vad` 任务下有两个互补的模型。**Silero VAD** 是工程实践中的默认答案：一个为流式推理而生的轻量网络，官方 ONNX 权重 2.3 MB（fp32），按 16 kHz / 32 ms 一帧工作，LSTM 状态跨帧传递，浏览器里用 `@ricky0123/vad-web` 或直接 onnxruntime-web 就能实时跑，MIT 许可。**pyannote-segmentation-3.0** 则更进一步：除了「有没有语音」，还输出**重叠语音**的概率——这正是说话人分离管线（VAD → 分离重叠 → 聚类出说话人）的第一级，q8 量化权重实测约 1.5 MB。',
          },
          {
            type: 'table',
            caption: '两个模型的关键差异（体积为本站实测的权重下载字节数）',
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
          { type: 'h2', text: '在浏览器里跑一次' },
          {
            type: 'p',
            text: '本站已经把 `audio/vad` 从纯目录页升级成了可交互的演示页：打开 **语音活动检测演示**，选中文或英文内置示例（或上传自己的音频），页面会真实下载 Silero 的 ONNX 权重并逐帧推理，波形上直接高亮出语音区间，每个区间的平均置信度单独列出。三个滑杆对应 VAD 落地时最常调的三个旋钮：**语音阈值**（越高越保守）、**最短语音时长**（过滤一闪而过的误触发）、**最短静音时长**（避免一段话被呼吸声切碎）。`audio/vad` 目录下另一个模型 pyannote-segmentation 因为浏览器 ONNX 需要自建 Kaldi fbank 特征前端，演示页会明确标注由 Silero 代跑。',
          },
          {
            type: 'p',
            text: '「人声 + 音乐」示例是检验 VAD 鲁棒性的试金石：能量门限式的老办法会把音乐整体判成语音，而训练过的神经网络基本能守住边界——这也是为什么 VAD 值得用模型而不是信号处理规则来做。',
          },
          { type: 'h2', text: '放进自己的管线' },
          {
            type: 'ul',
            items: [
              '实时字幕 / 会议纪要：VAD 切区间 → 每个区间送 ASR → 汇总成文。本站「应用场景」里的会议记录组合（VAD + Whisper + 摘要）就是这个结构；',
              '语音助手：VAD 判断用户是否说完（尾点检测），比固定超时自然得多；',
              '语音克隆与降噪：合成前先只保留人声帧，避免把音乐也学进去；',
              '音频归档：按语音区间检索、跳转和计费，而不是按整段音频。',
            ],
          },
          { type: 'h2', text: '相邻工序' },
          {
            type: 'p',
            text: 'VAD 是语音管线的起点，它的下游都在本站有对应演示：**语音识别**把切好的区间转成带时间戳的文字；**语音降噪**在同一音频上还原干净波形。想在一条完整链路里看效果，从语音活动检测演示页开始，再顺着切到这两页即可。',
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
        title: 'Voice activity detection: hear that someone is speaking before asking what they said',
        description:
          'VAD answers a single binary question — is anyone speaking right now? — yet it is the highest-leverage stage of a speech pipeline. A tour of Silero VAD and pyannote-segmentation, plus the new in-browser VAD demo on this site.',
        blocks: [
          {
            type: 'p',
            text: 'Voice activity detection (VAD) solves the plainest problem in speech processing: **given an audio clip, decide which time ranges contain speech**. It never says what was said or who said it — it emits a per-frame "this is speech" probability track, and a threshold with hysteresis turns that track into segments. Simple as it sounds, it is the first stage of almost every speech system: live captions use it to decide when to wake the ASR, meeting transcribers use it to skip silence, voice assistants use it to decide whether you have finished your sentence.',
          },
          { type: 'h2', text: 'Why not let the ASR do this for free' },
          {
            type: 'p',
            text: 'Because the cost differs by an order of magnitude. Acoustic models like Whisper weigh tens to hundreds of MB and decode text autoregressively; a modern VAD is **1–2M parameters** (Silero VAD\u2019s fp32 ONNX build measures 2.3 MB), scores one 32 ms frame at a time, and runs single-threaded on CPU with millisecond latency. Cutting silence and music out before transcription saves decoding time, memory and tokens all at once.',
          },
          {
            type: 'p',
            text: 'There is a subtler reason too: **hallucination control**. ASR models occasionally transcribe confident-sounding text over pure noise, music or coughs. A VAD in front of the recogniser removes most of those phantom words at the source.',
          },
          { type: 'h2', text: 'What it does not do' },
          {
            type: 'ul',
            items: [
              'No content: the output is time ranges, not text;',
              'No speakers: "who is talking" belongs to speaker diarization, and the pyannote stack walks several more steps after VAD;',
              'No cleanup: VAD only marks ranges, it never touches the waveform — that is the denoising page\u2019s job.',
            ],
          },
          { type: 'h2', text: 'The two models in our catalogue' },
          {
            type: 'p',
            text: 'The `audio/vad` task lists two complementary entries. **Silero VAD** is the engineering default: a lightweight network built for streaming, 2.3 MB of fp32 ONNX weights, operating on 16 kHz / 32 ms frames with LSTM state carried across frames; in the browser it runs in real time through `@ricky0123/vad-web` or plain onnxruntime-web, under an MIT licence. **pyannote-segmentation-3.0** goes further: besides speech, it scores **overlapping speech** — the first stage of a diarization pipeline (VAD → separate overlaps → cluster speakers). Its q8 build measures about 1.5 MB.',
          },
          {
            type: 'table',
            caption: 'Key differences (download sizes are measured in this catalogue)',
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
          { type: 'h2', text: 'Try it in the browser' },
          {
            type: 'p',
            text: 'We have promoted `audio/vad` from a catalogue-only page to an interactive demo: open the **voice activity detection demo**, pick a built-in Chinese or English sample (or upload your own audio), and the page downloads Silero\u2019s ONNX weights for real, runs them frame by frame, highlights speech ranges on the waveform and lists each segment\u2019s mean confidence. Three sliders expose the knobs that matter in production: the **speech threshold** (higher is more conservative), the **minimum speech duration** (filters one-frame false triggers) and the **minimum silence duration** (keeps a breath from splitting one utterance in two). The other card, pyannote-segmentation, needs a hand-rolled Kaldi fbank front-end in the browser, so the demo clearly labels Silero as its stand-in.',
          },
          {
            type: 'p',
            text: 'The "speech over music" sample is the robustness litmus test: an energy gate labels the entire music bed as speech, while a trained network holds the boundary — which is exactly why VAD is worth doing with a model rather than a signal-processing rule.',
          },
          { type: 'h2', text: 'Wiring it into a pipeline' },
          {
            type: 'ul',
            items: [
              'Live captions / meeting notes: VAD segments each range, the ASR transcribes it, a summariser folds it together — the same shape as the meeting-notes recipe in our applications section (VAD + Whisper + summarisation);',
              'Voice assistants: VAD endpointing detects when the user has finished speaking, far more natural than a fixed timeout;',
              'Voice cloning and denoising: keep only speech frames before synthesis so the model never learns the music bed;',
              'Archives: index, navigate and bill by speech ranges instead of whole files.',
            ],
          },
          { type: 'h2', text: 'The neighbouring stages' },
          {
            type: 'p',
            text: 'VAD is where a speech pipeline starts, and its downstream stages both have demos on this site: **speech recognition** turns the cut ranges into timestamped text, and **speech denoising** rebuilds a clean waveform from the same audio. Start at the voice activity detection demo, then hop across.',
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
        title: '只有 1.3B：OXR 凭什么拿下文档解析三榜第一',
        description:
          'SoMark 团队开源的文档解析模型 OXR-1.0，把 PDF 和文档图片解析成 Markdown/JSON 与版面坐标。OmniDocBench、olmOCR-Bench、DocParsingBench 三个榜单第一，单卡 100 页完整解析 101 秒。',
        blocks: [
          {
            type: 'p',
            text: 'SoMark 团队（守扣科技）开源了文档解析模型 **OXR**（Optical Everything Recognition）。主模型只有 **1.3B 参数**，却在一周左右拿下三个公开文档解析基准的第一，GitHub 星标在开源首周即破千。它能把 PDF 和文档图片解析成 **Markdown / JSON**，同时给出每个内容块在原页上的版面坐标，并按阅读顺序组织输出——团队把这称为「Agent 友好数据」：文档解析完就能直接送进知识库、RAG 或 Agent 流程。',
          },
          {
            type: 'p',
            text: 'OXR 支持文字、标题、表格、公式、化学方程式、化学结构式、代码块、印章等 **13 类文档元素**：表格输出为 HTML/Markdown（保留行列与单元格结构），公式按 LaTeX 输出，化学方程式用 mhchem 语法、化学结构式用 SMILES 表示，多栏报纸、论文与 A3 试卷按阅读顺序还原。',
          },
          { type: 'h2', text: '三榜第一，速度也是第一梯队' },
          {
            type: 'p',
            text: '三个榜单考察的侧面各不相同：OmniDocBench 覆盖多种文档与版式并评估阅读顺序；olmOCR-Bench 用具体检查项判断关键文字与表格关系是否保留；DocParsingBench 由 SoMark 团队开源，面向真实业务文档。',
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
          { type: 'h2', text: 'RSI：让解析错误变成训练数据' },
          {
            type: 'p',
            text: 'OXR 从零开始预训练，后训练阶段引入了**递归自我改进（RSI, Recursive Self-Improvement）**范式——团队称这是文档解析领域首个无需人工标注新增数据的 RSI 流程：',
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
            text: '省下的是新增训练数据的人工标注：评判、归因与数据准备由模型协作完成，哪里解析得差，下一轮就围绕哪里补数据。',
          },
          { type: 'h2', text: '版面分析可插拔' },
          {
            type: 'p',
            text: 'OXR 的另一个设计是把**版面分析做成独立、可插拔模块**：一个轻量模型负责定位内容区域，主模型在同一阶段完成内容识别与阅读顺序判断（判断顺序时能用上内容语义，也省去单独排序环节）。业务对「同一块内容怎么拆」的定义各不相同——有的要拆成标题加正文，有的要整体当表格——这时可以接入自己的版面模型调整元素类别、区域边界与分组，再复用 OXR 的识别与排序能力。',
          },
          { type: 'h2', text: '怎么接入' },
          {
            type: 'p',
            text: '最快的路径是官方**在线 Demo**（免费上传 PDF/图片）与**免费 API**（无需注册）。Node.js 侧可用官方 `somark-js`（Node 18+，附带 CLI）：',
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
            text: '本站已在「多模态 → 文档理解」演示页收录 OXR-1.0：它的权重跑在服务端，没有浏览器权重，因此在演示页点击 OXR-1.0 卡片会直接跳转到上面的在线示例，而不是本地推理。',
          },
        ],
      },
      en: {
        title: 'Just 1.3B: how OXR tops three document-parsing benchmarks',
        description:
          'OXR-1.0, open-sourced by the SoMark team, parses PDFs and document images into Markdown/JSON with layout coordinates. It ranks #1 on OmniDocBench, olmOCR-Bench and DocParsingBench while parsing 100 pages in 101 seconds on a single GPU.',
        blocks: [
          {
            type: 'p',
            text: 'The SoMark team has open-sourced **OXR** (Optical Everything Recognition), a document-parsing model whose main network is only **1.3B parameters** — yet within about a week it claimed first place on three public document-parsing benchmarks and passed 1,000 GitHub stars. It turns PDFs and document images into **Markdown / JSON** with per-block layout coordinates, ordered by reading sequence — what the team calls agent-friendly data, ready to flow into knowledge bases, RAG pipelines or agents.',
          },
          {
            type: 'p',
            text: 'OXR recognises **13 element types**: text, titles, tables, formulas, chemical equations, chemical structures, code blocks, stamps and more. Tables come out as HTML/Markdown with row and cell structure intact, formulas as LaTeX, chemical equations in mhchem syntax, molecular structures as SMILES, and multi-column newspapers, papers and A3 exam sheets are reassembled in reading order.',
          },
          { type: 'h2', text: 'First on three benchmarks, fast too' },
          {
            type: 'p',
            text: 'The three benchmarks probe different things: OmniDocBench covers many document types and layouts including reading order; olmOCR-Bench checks whether key text and table relations survive; DocParsingBench, open-sourced by SoMark, targets real business documents.',
          },
          { type: 'table', ...OXR_BENCH_TABLE.en },
          {
            type: 'p',
            text: 'For speed, the team parsed a fixed 100-page draw from OmniDocBench on a **single NVIDIA RTX PRO 6000 Blackwell (96 GB)**: OXR-1.0 finished in 101 seconds — roughly 1.43× the throughput of PaddleOCR-VL-1.6 and 2.52× that of MinerU2.5-Pro.',
          },
          { type: 'table', ...OXR_SPEED_TABLE.en },
          {
            type: 'p',
            text: 'Those numbers correspond to the specified hardware and fixed document set. The hosted demo adds upload and queue latency, so wall-clock times you see there are not comparable.',
          },
          { type: 'h2', text: 'RSI: turning parse errors into training data' },
          {
            type: 'p',
            text: 'OXR is pre-trained from scratch, and its post-training introduces a **recursive self-improvement (RSI)** loop — per the team, the first in document parsing that needs no newly hand-labelled data:',
          },
          {
            type: 'ul',
            items: [
              'OXR parses unlabelled documents to produce candidate results;',
              'a general multimodal model judges the rollouts, finding and diagnosing error and weak samples;',
              'an independent clustering model groups similar causes;',
              'the general model then plans the next training round and prepares targeted data, and OXR trains and validates on it — then the loop repeats.',
            ],
          },
          {
            type: 'p',
            text: 'What is saved is manual labelling: judging, attribution and data preparation are done by cooperating models, and the next round targets exactly where parsing is weakest.',
          },
          { type: 'h2', text: 'Pluggable layout analysis' },
          {
            type: 'p',
            text: 'Layout analysis is an **independent, pluggable module**: a lightweight model locates content regions while the main model handles content recognition and reading order in one pass (ordering can exploit content semantics, and no separate ordering stage is needed). Businesses differ on how the same block should be split — title plus body, or one table — so you can plug in your own layout model with your own element categories, region boundaries and grouping, and keep OXR\u2019s recognition and ordering.',
          },
          { type: 'h2', text: 'How to get started' },
          {
            type: 'p',
            text: 'The fastest paths are the hosted **online demo** (free uploads) and the **free API** (no sign-up). For Node.js there is the official `somark-js` SDK (Node 18+, CLI included):',
          },
          {
            type: 'code',
            label: 'parse.mjs',
            text: 'import { SoMark } from \'somark-js\';\n\n// reads the SOMARK_API_KEY environment variable\nconst client = new SoMark();\n\nconst result = await client.parser.parse({\n  file: \'./sample.pdf\',\n  formats: [\'md\'],\n});\n\nawait result.save(\'./result.md\', \'md\');\nconsole.log(result.md);',
          },
          {
            type: 'p',
            text: 'Self-hosting runs via Docker (a single 24 GB GPU to start; 48 GB+ recommended for long documents and higher concurrency). Weights are published on Hugging Face and ModelScope. The licence is a custom one based on Apache 2.0 with additional terms — read the repository LICENSE before commercial use.',
          },
          { type: 'links', items: [
            { label: 'GitHub · SoMarkAI/OXR', href: 'https://github.com/SoMarkAI/OXR' },
            { label: 'Hugging Face · SoMarkAI/OXR-1.0', href: 'https://huggingface.co/SoMarkAI/OXR-1.0' },
            { label: 'Online demo (community WASM port)', href: 'https://huggingface.co/spaces/fusorlabs/oxr-wasm' },
            { label: 'Official free API', href: 'https://free-oxr.somark.cn/' },
          ] },
          {
            type: 'p',
            text: 'This site lists OXR-1.0 under Multimodal → Document understanding: its weights run on servers and ship no browser build, so clicking the OXR-1.0 card on the demo page opens the hosted demo above instead of running locally.',
          },
        ],
      },
    },
  },
];

export const findPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
