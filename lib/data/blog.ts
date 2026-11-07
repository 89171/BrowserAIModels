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
    slug: 'detection-to-matte',
    date: '2026-11-07',
    tags: ['vision', 'detection', 'segmentation', 'background-removal'],
    i18n: {
      zh: {
        title: '从边界框到软蒙版：视觉分割的三级台阶',
        description:
          '检测给框、分割给像素、抠图给带羽化的 alpha。vision 分类里的 YOLO、SAM、RMBG 与 BiRefNet 分别站在哪一级，2.5 MiB 与 93.9 MiB 的差距换来了什么。',
        blocks: [
          {
            type: 'p',
            text: '「把图里的人抠出来」听起来是一个任务，工程上是三级台阶：**检测框 → 像素级蒙版 → 带软边的 alpha**。每一级输出的信息量差一个数量级，模型体积也差一个数量级。本站 `vision` 分类把这三件事拆成 detection / segmentation / background-removal 三个子类，正好可以顺着看。',
          },
          { type: 'h2', text: '第一级：框，回答「在哪、是什么」' },
          {
            type: 'p',
            text: '**YOLOv10n** 用 2.5 MiB 就能在浏览器里跑到实时，是端侧检测的默认选择；**RT-DETR R18**（约 20.0 MiB）用 Transformer 解码器换掉了 NMS，端到端直接出框，重叠目标多时更稳；**MediaPipe Object Detection**（约 6.9 MiB）为移动端做了专门优化。',
          },
          {
            type: 'p',
            text: '检测的两个后处理旋钮几乎决定了观感：**置信度阈值**决定漏检与误检的平衡，**NMS IoU** 决定重叠框保留几个。阈值调低，密集场景里的行人才不会漏；IoU 调低，同一个目标才不会出现三个框。',
          },
          { type: 'h2', text: '第二级：蒙版，逐像素判定前景' },
          {
            type: 'p',
            text: '分割把框里的像素逐个判定为前景或背景。轻量档够用就好：**MediaPipe Selfie** 只有 0.2 MiB，实时换背景完全够；**U²-Netp** 4.4 MiB、**MODNet** 6.3 MiB 在边缘上更干净一些。通用档是 **SAM Tiny**（约 13.1 MiB）：它支持以点或框作为提示做「可提示分割」——同一张图点一下，就能分出你指的那个物体，而不必预先定义类别。',
          },
          {
            type: 'p',
            text: '这一级的输出往往是二值或低分辨率蒙版。直接放大边缘会出现锯齿和硬边，这正是第三级存在的理由。',
          },
          { type: 'h2', text: '第三级：软 alpha，边缘才是产品' },
          {
            type: 'p',
            text: '抠图要的不是 0/1，而是 0 到 1 的连续值，并且要保住发丝、半透明纱料和运动模糊。**RMBG-1.4** 约 42.3 MiB（int8；fp16 会翻倍到 84 MiB 左右），**BiRefNet-lite 512** 约 93.9 MiB，边缘更精细但加载更慢。',
          },
          {
            type: 'p',
            text: '模型只完成一半工作。它们输出的是 logits，要先 sigmoid 再归一化；然后是三步后处理：**引导滤波**做边缘羽化（对应演示里的 feather 滑杆）、**levels** 调整黑白场（对应 thresh 滑杆）、**反溢色**去掉背景色在边缘的残留。这三步的观感差异，往往比模型榜单上的 IoU 差异更大——用户看的就是边缘那两三个像素。',
          },
          {
            type: 'table',
            caption: '三级台阶与代表模型（体积为本站实测）',
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
          { type: 'h2', text: '把三级串起来' },
          {
            type: 'code',
            label: '框 → 局部蒙版 → 贴回全图',
            text: "// 检测给出 box，只把框内区域送进分割模型，省掉整图推理\nconst crop = cropToBox(frame, box);\nconst mask = await segmenter(crop);\n\n// 局部蒙版按 box 贴回原图尺寸\ncomposeMask(mask, box, frame.width, frame.height);\n\n// 软 alpha：sigmoid → 引导滤波羽化 → levels → 反溢色",
          },
          {
            type: 'p',
            text: '这个「先裁后分割」的技巧在端侧特别值钱：1080p 整图跑一次分割，和把 200×300 的人像裁出来跑一次，耗时差一个数量级，而结果几乎一样。',
          },
          { type: 'h2', text: '怎么选' },
          {
            type: 'ul',
            items: [
              '只需要知道目标在哪、有几个 → 检测；',
              '要换背景、做虚化 → 轻量分割（0.2–6 MiB 足够）；',
              '要合成到新背景、要印刷级边缘 → 软 alpha 抠图（RMBG / BiRefNet）；',
              '要「点哪儿抠哪儿」、目标类别不固定 → SAM 类提示式分割。',
            ],
          },
          {
            type: 'p',
            text: '本站三个演示可以串着看：检测演示先给框，分割演示给出逐像素蒙版，抠图演示输出带透明通道、边缘带羽化的结果——同一个任务，三级台阶的差别一眼就能看出来。',
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
        title: 'From bounding box to soft matte: the three rungs of vision segmentation',
        description:
          'Detection gives a box, segmentation gives pixels, matting gives a feathered alpha. Where YOLO, SAM, RMBG and BiRefNet sit in our vision category, and what the gap between 2.5 MiB and 93.9 MiB buys.',
        blocks: [
          {
            type: 'p',
            text: '"Cut the person out of this photo" sounds like one task. In engineering it is three rungs: **bounding box → pixel mask → soft alpha**. Each rung carries an order of magnitude more information, and costs an order of magnitude more weight. Our `vision` category splits them into detection, segmentation and background-removal, which makes the ladder easy to walk.',
          },
          { type: 'h2', text: 'Rung one: the box, answering where and what' },
          {
            type: 'p',
            text: '**YOLOv10n** reaches real time in the browser at 2.5 MiB and is the client-side default; **RT-DETR R18** (about 20.0 MiB) replaces NMS with a Transformer decoder and emits boxes end to end, which helps in crowded scenes; **MediaPipe Object Detection** (about 6.9 MiB) is tuned for mobile.',
          },
          {
            type: 'p',
            text: 'Two post-processing knobs decide how it feels: the **confidence threshold** trades misses against false positives, and **NMS IoU** decides how many overlapping boxes survive. Lower the threshold and pedestrians stop disappearing; lower the IoU and one object stops wearing three boxes.',
          },
          { type: 'h2', text: 'Rung two: the mask, deciding per pixel' },
          {
            type: 'p',
            text: 'Segmentation labels each pixel inside the box as foreground or background. Lightweights go far: **MediaPipe Selfie** is 0.2 MiB and plenty for real-time background swapping; **U²-Netp** at 4.4 MiB and **MODNet** at 6.3 MiB give cleaner edges. The general-purpose option is **SAM Tiny** (about 13.1 MiB), which supports **promptable segmentation** — click a point and it segments that object, with no predefined class list.',
          },
          {
            type: 'p',
            text: 'This rung usually produces a binary or low-resolution mask. Upsampling it directly yields stair-stepped, hard edges — which is precisely why rung three exists.',
          },
          { type: 'h2', text: 'Rung three: soft alpha, where the product actually lives' },
          {
            type: 'p',
            text: 'Matting does not want 0/1 but a continuous 0-to-1 alpha that preserves hair, translucent fabric and motion blur. **RMBG-1.4** measures about 42.3 MiB as int8 (roughly double as fp16); **BiRefNet-lite 512** measures about 93.9 MiB, with finer edges and a slower load.',
          },
          {
            type: 'p',
            text: 'The model is only half the work. It emits logits — sigmoid, then normalise — and then three post-processing steps: **guided filtering** for edge feathering (the feather slider in our demo), **levels** for the black and white points (the thresh slider), and **decontamination** to remove background colour bleeding into the edge. Those three steps change the result more than the IoU gap between models on a leaderboard, because users are looking at two or three pixels of edge.',
          },
          {
            type: 'table',
            caption: 'The three rungs and representative models (sizes measured here)',
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
          { type: 'h2', text: 'Chaining the three' },
          {
            type: 'code',
            label: 'Box → local mask → composite back',
            text: "// the detector gives a box; only that crop goes to the segmenter\nconst crop = cropToBox(frame, box);\nconst mask = await segmenter(crop);\n\n// paste the local mask back at the box's position\ncomposeMask(mask, box, frame.width, frame.height);\n\n// soft alpha: sigmoid → guided-filter feather → levels → decontaminate",
          },
          {
            type: 'p',
            text: 'Crop-then-segment is worth a lot on the client: segmenting a 1080p frame costs an order of magnitude more than segmenting a 200×300 crop of the person, and the result is practically identical.',
          },
          { type: 'h2', text: 'How to choose' },
          {
            type: 'ul',
            items: [
              'Only need to know where and how many → detection;',
              'Swap or blur the background → lightweight segmentation (0.2–6 MiB is enough);',
              'Composite onto a new scene, or print-grade edges → soft-alpha matting (RMBG / BiRefNet);',
              'Click-to-segment with no fixed class list → SAM-style promptable segmentation.',
            ],
          },
          {
            type: 'p',
            text: 'The three demos chain naturally: detection draws the box, segmentation turns it into a per-pixel mask, matting returns a transparent PNG with a feathered edge — the difference between rungs is visible at a glance.',
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
        title: '从听到说：浏览器语音管线的三段',
        description:
          'Whisper 系的 ASR、Kokoro/Piper 系的 TTS，以及只需要一段参考音频的声音克隆。看 audio 与 generative-audio 分类里，哪些模型真的能在标签页里跑起来，体积和延迟各花在哪里。',
        blocks: [
          {
            type: 'p',
            text: '语音是最适合端侧的模态之一：采样率高、数据敏感、用户对延迟极其敏感。本站把它拆成 `audio`（asr / tts / denoising / source-separation / audio-classification）与 `generative-audio`（text-to-music / voice-cloning）两个分类。本文只走「听到说」这条主线，降噪、分离与 VAD 各有专文。',
          },
          { type: 'h2', text: '第一段：ASR 把波形变成带时间戳的文字' },
          {
            type: 'p',
            text: 'Whisper 是编码器-解码器结构：log-mel 频谱进编码器，解码器自回归地吐 token。端侧的关键数字是体积：**Whistle 约 16.1 MiB**，走 WASM、加载最快；**Whisper Base 约 73.3 MiB**，多语言质量明显更好；**Whisper Small 约 191 MiB**，质量最好但首次加载最慢。',
          },
          {
            type: 'p',
            text: 'Whisper 原生按 30 秒窗口处理，更长的音频要自己切窗并处理边界。这就是词级时间戳在工程上很值钱的原因：它让「按固定窗口切」变成「按句切」，既避免把词切两半，也方便后续做字幕对齐。',
          },
          {
            type: 'p',
            text: '还有个容易被忽略的搭配：**VAD 先切出语音区间，只把有声部分送进 ASR**。这样既省解码时间，又能压掉 ASR 对纯噪声「脑补」出文本的幻觉。',
          },
          { type: 'h2', text: '第二段：TTS 是两段式，声学模型加声码器' },
          {
            type: 'p',
            text: '文本先被声学模型映射成频谱或离散声学 token，声码器再把频谱还原成波形。**Kokoro 82M**（约 121 MiB）是端侧质量与体积的平衡点；**Piper** 走多语言轻量路线，每种语言一个独立小包；**Silero TTS** 在 CPU 上就能实时合成；**Bark** 表现力最强（能笑、能叹气），但体积和延迟都上一个台阶。',
          },
          {
            type: 'p',
            text: '端侧 TTS 的真正优势不是省钱，而是**首字延迟**：省掉一次网络往返，语音助手才可能做到「按下就说」。代价是音色库固定、韵律控制不如云端方案细，长文本还得自己分句喂。',
          },
          { type: 'h2', text: '第三段：克隆只需要一段参考音频' },
          {
            type: 'p',
            text: '声音克隆把「音色」和「内容」解耦：参考音频先编码成说话人嵌入，再和待读文本一起送进合成器。**OpenVoice v2** 强调零样本音色转换（同一段话换音色），**Coqui XTTS v2** 支持多语言克隆。两者都是多组件管线，浏览器里要分别加载编码器、合成器和声码器。',
          },
          {
            type: 'p',
            text: '这一段的工程重点其实是合规：**克隆他人声音需要明确授权**。端侧能力让这件事变得极其容易，也就更容易越界——产品上该有明确的同意流程和使用边界，而不是把它当成一个普通的滤镜。',
          },
          {
            type: 'table',
            caption: '三段管线的代表模型（体积为本站实测或按语言分包）',
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
          { type: 'h2', text: '在浏览器里跑一段 ASR' },
          {
            type: 'code',
            label: 'Transformers.js：带时间戳的转写',
            text: "const asr = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base', {\n  dtype: 'q8',\n});\n\nconst out = await asr(audioUrl, {\n  return_timestamps: 'word',\n  chunk_length_s: 30,\n  stride_length_s: 5,\n});\n// out.text / out.chunks[i].timestamp",
          },
          { type: 'h2', text: '串成一条链路' },
          {
            type: 'p',
            text: 'VAD 切区间 → ASR 出文字 → LLM 改写或摘要 → TTS 读回来。整条链路都在标签页里完成：会议记录、语音笔记、无障碍朗读、离线翻译耳机都能这么搭。本站的语音活动检测演示是这条链路的第一环，语音识别与语音合成是后两环，声音克隆则演示了「换一个音色说同样的话」。',
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
        title: 'From hearing to speaking: the three stages of a browser speech pipeline',
        description:
          'Whisper-family ASR, Kokoro/Piper-family TTS, and voice cloning that needs only a reference clip. Which models in our audio and generative-audio categories actually run in a tab, and where the megabytes and milliseconds go.',
        blocks: [
          {
            type: 'p',
            text: 'Speech is one of the most natural modalities for the client: high sample rates, sensitive data, and users who notice latency immediately. We split it into `audio` (asr / tts / denoising / source-separation / audio-classification) and `generative-audio` (text-to-music / voice-cloning). This post follows one line only — hearing to speaking; denoising, separation and VAD have their own write-ups.',
          },
          { type: 'h2', text: 'Stage one: ASR turns a waveform into timestamped text' },
          {
            type: 'p',
            text: 'Whisper is an encoder-decoder: log-mel spectrograms go into the encoder, and the decoder emits tokens autoregressively. The numbers that matter on the client are sizes: **Whistle at about 16.1 MiB** runs on WebAssembly and loads fastest; **Whisper Base at about 73.3 MiB** is markedly better across languages; **Whisper Small at about 191 MiB** is the best of the three and the slowest to load.',
          },
          {
            type: 'p',
            text: 'Whisper processes 30-second windows natively, so anything longer needs hand-rolled windowing and boundary handling. That is why word-level timestamps earn their keep: they turn "cut every 30 seconds" into "cut between sentences", which avoids splitting words and makes subtitle alignment straightforward.',
          },
          {
            type: 'p',
            text: 'One pairing people overlook: **let VAD cut speech ranges first and send only those to the ASR**. It saves decoding time and suppresses the hallucinated text Whisper occasionally produces over pure noise.',
          },
          { type: 'h2', text: 'Stage two: TTS is two models, acoustics plus vocoder' },
          {
            type: 'p',
            text: 'Text is first mapped to a spectrogram or discrete acoustic tokens by an acoustic model, then a vocoder rebuilds the waveform. **Kokoro 82M** (about 121 MiB) is the client-side balance of quality and size; **Piper** takes the lightweight multilingual route with one small package per language; **Silero TTS** synthesises in real time on CPU; **Bark** is the most expressive — it can laugh and sigh — at a step up in size and latency.',
          },
          {
            type: 'p',
            text: 'The real advantage of on-device TTS is not cost but **time to first syllable**: removing a network round trip is what lets an assistant speak the moment you press. The trade is a fixed voice catalogue, coarser prosody control than cloud systems, and sentence splitting you have to do yourself for long text.',
          },
          { type: 'h2', text: 'Stage three: cloning needs one reference clip' },
          {
            type: 'p',
            text: 'Cloning decouples timbre from content: a reference clip is encoded into a speaker embedding, which is fed to the synthesiser along with the target text. **OpenVoice v2** emphasises zero-shot timbre conversion (same words, different voice); **Coqui XTTS v2** clones across languages. Both are multi-component pipelines — encoder, synthesiser and vocoder load separately in the browser.',
          },
          {
            type: 'p',
            text: 'The engineering emphasis here is really compliance: **cloning someone\u2019s voice requires explicit consent**. Client-side capability makes this trivially easy and therefore easy to abuse, so the product needs a consent flow and stated limits — not a filter in a menu.',
          },
          {
            type: 'table',
            caption: 'Representative models per stage (sizes measured here, or packaged per language)',
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
          { type: 'h2', text: 'Running ASR in the browser' },
          {
            type: 'code',
            label: 'Transformers.js: transcription with timestamps',
            text: "const asr = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base', {\n  dtype: 'q8',\n});\n\nconst out = await asr(audioUrl, {\n  return_timestamps: 'word',\n  chunk_length_s: 30,\n  stride_length_s: 5,\n});\n// out.text / out.chunks[i].timestamp",
          },
          { type: 'h2', text: 'Chaining the pipeline' },
          {
            type: 'p',
            text: 'VAD cuts ranges → ASR produces text → an LLM rewrites or summarises → TTS reads it back. The whole chain lives in a tab: meeting notes, voice memos, accessible read-aloud, offline translation earbuds. Our VAD demo is the first link, speech recognition and speech synthesis are the next two, and voice cloning demonstrates swapping the timbre while keeping the words.',
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
        title: '摄像头里的 16 毫秒：实时人脸、姿态与手势',
        description:
          'real-time 分类下的检测器、关键点模型和跟踪算法，加起来不到 15 MB。看它们如何在一帧 16.7 ms 的预算里分工，抖动为什么比精度更影响体感，以及这些推理为什么必须留在端上。',
        blocks: [
          {
            type: 'p',
            text: '实时视觉的硬约束不是准确率，而是**帧预算**。30 fps 每帧 33 ms，60 fps 只有 16.7 ms，其中还要扣掉解码、绘制和页面合成。所以 `real-time` 分类的模型都小得反常：人脸检测 0.2 MiB、姿态 5.5 MiB、手部 7.5 MiB——因为它们要在每一帧都跑完。',
          },
          { type: 'h2', text: '两段式：检测器找人，回归器找人身上的点' },
          {
            type: 'p',
            text: '没有人会在整张 1080p 图上直接回归 468 个面部关键点。标准做法是先用 0.2 MiB 的 BlazeFace 类检测器裁出人脸框，再把 128×128 的小图送进 Face Mesh 回归 468 个点。姿态同理：检测器给人体框，Pose 回归 33 个关节点；手部是 21 个点。两段式的意义是**把算力集中到有目标的区域**，背景像素不参与回归。',
          },
          {
            type: 'table',
            caption: 'real-time 分类的分工与本站实测体积',
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
          { type: 'h2', text: '抖动比精度更影响体感' },
          {
            type: 'p',
            text: '关键点模型逐帧独立推理，输出一定会抖。用户看到的不是 mAP，而是「骨架在抖」。三个手段按顺序上：**置信度阈值**先丢掉低分点；**时序平滑**（指数滑动平均）压住坐标的高频抖动；**跟踪**给目标一个稳定 ID。本站姿态演示里的「时序平滑」开关就是第二件事。',
          },
          {
            type: 'p',
            text: 'ByteTrack 解决第三件事：把本帧的检测框和上一帧的轨迹做 IoU 匹配，遮挡之后还能把同一个 ID 接回来。它本身不跑神经网络，纯 WASM 就够——跟踪是「让逐帧检测变成一条轨迹」的那层胶水，也是做计数、测速、停留时长的前提。',
          },
          { type: 'h2', text: '为什么必须留在端上' },
          {
            type: 'p',
            text: '摄像头画面是最敏感的数据之一。端侧推理意味着**从采集到绘制，视频帧全程不离开标签页**：没有上传、没有录制、也没有服务端日志。延迟上同样没有网络往返，手势交互才有可能压到 50 ms 以内——超过这个数，用户会觉得「手势不跟手」。',
          },
          {
            type: 'code',
            label: '逐帧推理的骨架（MediaPipe Tasks）',
            text: "const landmarker = await HandLandmarker.createFromOptions(vision, {\n  baseOptions: { modelAssetPath: '/models/hand_landmarker.task' },\n  runningMode: 'VIDEO',\n  numHands: 2,\n});\n\nconst loop = () => {\n  if (video.readyState >= 2) {\n    const result = landmarker.detectForVideo(video, performance.now());\n    draw(canvas, result);\n  }\n  requestAnimationFrame(loop);\n};",
          },
          { type: 'h2', text: '几个工程细节' },
          {
            type: 'ul',
            items: [
              '分辨率别贪高：640×480 对关键点已经足够，1080p 只会让推理时间翻倍；',
              '不要在 rAF 回调里 await 网络或解码，掉帧会直接表现为延迟累积；',
              '叠加层用 canvas 2D 绘制，不要每帧增删 DOM 节点；',
              '移动端注意发热降频：连续跑几分钟后帧率会掉，必要时降低推理频率而不是分辨率。',
            ],
          },
          {
            type: 'p',
            text: '想亲手试：打开人脸、姿态或手部演示并允许摄像头，就能看到实时叠加；跟踪演示则用同一段视频展示跨帧 ID 的稳定性——遮挡一下，看 ID 会不会被接回来。',
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
        title: 'Sixteen milliseconds per frame: real-time face, pose and hands',
        description:
          'The detectors, landmark models and trackers in our real-time category add up to under 15 MB. How they divide a 16.7 ms frame budget, why jitter matters more than accuracy, and why this inference has to stay on the device.',
        blocks: [
          {
            type: 'p',
            text: 'Real-time vision is bounded by the **frame budget**, not by accuracy. At 30 fps you have 33 ms per frame; at 60 fps, 16.7 ms — minus decode, drawing and compositing. That is why the models in our `real-time` category are absurdly small: 0.2 MiB for face detection, 5.5 MiB for pose, 7.5 MiB for hands. They have to finish every single frame.',
          },
          { type: 'h2', text: 'Two stages: a detector finds people, a regressor finds the points' },
          {
            type: 'p',
            text: 'Nobody regresses 468 facial landmarks over a full 1080p frame. The standard shape is a 0.2 MiB BlazeFace-class detector cropping the face box, then a 128×128 crop feeding Face Mesh for 468 points. Pose works the same way: detector gives the body box, Pose regresses 33 joints; hands give 21 points. The point of two stages is **concentrating compute where the target is** — background pixels never enter the regressor.',
          },
          {
            type: 'table',
            caption: 'What each subcategory does, with measured sizes from this catalogue',
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
          { type: 'h2', text: 'Jitter ruins the experience before accuracy does' },
          {
            type: 'p',
            text: 'Landmark models run independently per frame, so outputs wobble. Users never see mAP — they see a skeleton shaking. Three fixes, in order: a **confidence threshold** drops low-score points; **temporal smoothing** (an exponential moving average) damps the high-frequency wobble; **tracking** gives each target a stable id. The smoothing toggle in our pose demo is the second one.',
          },
          {
            type: 'p',
            text: 'ByteTrack handles the third: it matches this frame\u2019s boxes to last frame\u2019s tracks by IoU and can re-attach the same id after an occlusion. It runs no neural network at all — plain WebAssembly is enough. Tracking is the glue that turns per-frame detections into trajectories, and trajectories are the prerequisite for counting, speed and dwell time.',
          },
          { type: 'h2', text: 'Why it has to stay on-device' },
          {
            type: 'p',
            text: 'Camera frames are among the most sensitive data a browser can touch. On-device inference means **frames never leave the tab**, from capture to draw: no upload, no recording, no server logs. There is also no network round trip, which is the only way gesture interaction lands under 50 ms — beyond that, users say the gesture "does not follow".',
          },
          {
            type: 'code',
            label: 'The per-frame skeleton (MediaPipe Tasks)',
            text: "const landmarker = await HandLandmarker.createFromOptions(vision, {\n  baseOptions: { modelAssetPath: '/models/hand_landmarker.task' },\n  runningMode: 'VIDEO',\n  numHands: 2,\n});\n\nconst loop = () => {\n  if (video.readyState >= 2) {\n    const result = landmarker.detectForVideo(video, performance.now());\n    draw(canvas, result);\n  }\n  requestAnimationFrame(loop);\n};",
          },
          { type: 'h2', text: 'Practical details' },
          {
            type: 'ul',
            items: [
              'Do not chase resolution: 640×480 is plenty for landmarks, and 1080p simply doubles inference time;',
              'Never await network or decoding inside the rAF callback — dropped frames show up as accumulated latency;',
              'Draw the overlay with canvas 2D instead of adding and removing DOM nodes every frame;',
              'Watch thermal throttling on mobile: sustained sessions drop frame rate, so lower the inference rate rather than the resolution.',
            ],
          },
          {
            type: 'p',
            text: 'Try it: open the face, pose or hand demo and allow the camera to see the overlay live. The tracking demo uses the same clip to show id stability across frames — occlude the subject and watch whether the id comes back.',
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
        title: '在浏览器里跑大模型：681 MiB 到 4.2 GB 的取舍',
        description:
          '本站 llm 分类里的七个对话模型、三个结构化输出方案和三个代码模型，体积相差六倍。搞清参数量、量化位数和内存带宽，才知道哪一档真的能放进用户的标签页。',
        blocks: [
          {
            type: 'p',
            text: '浏览器里跑大模型早就不是演示级的事情了。本站 `llm` 分类下，chat 有七个模型：最小的 **TinyLlama 1.1B** 实测 681 MiB，最大的 **Llama-3 8B** 要 4.2 GB。中间这六倍差距不是「精度」两个字能概括的，它由三件事决定——**参数量、量化位数，以及被词表和 KV cache 吃掉的固定开销**。',
          },
          { type: 'h2', text: '体积是怎么算出来的' },
          {
            type: 'p',
            text: '权重字节数约等于「参数量 × 每参数字节数」。4 bit 量化是 0.5 字节/参数，所以 1.5B 模型的理论值是 0.75 GB，实测 828 MiB——多出来的是 embedding 表、归一化参数和量化 scale。8B 用同样的 4 bit 是 4 GB，实测 4.2 GB。结论很直接：**端侧能不能跑，先看参数量，再看你愿意接受几位量化**。',
          },
          {
            type: 'table',
            caption: '本站对话与代码模型的实测下载体积',
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
          { type: 'h2', text: '真正的瓶颈是内存带宽，不是算力' },
          {
            type: 'p',
            text: '生成阶段每吐一个 token，都要把全部权重从头读一遍。所以 tokens/s 大致等于 **内存带宽 ÷ 模型体积**。同一块 GPU 跑 828 MiB 的模型比跑 4.2 GB 的快五倍，不是因为算得快，而是因为读得少。这解释了两件事：为什么端侧模型宁可少参数也不放弃 4 bit；为什么长 prompt 的首 token 慢、后续 token 快——prefill 是并行的矩阵乘，decode 是串行地读权重。',
          },
          {
            type: 'p',
            text: '再补一个常被忽略的数字：KV cache。它随上下文长度线性增长，在 4K 上下文、1.5B 模型上通常是几十到上百 MB。所以「模型 828 MiB」不等于「标签页只占 828 MiB」。',
          },
          { type: 'h2', text: '端侧的三种用法' },
          {
            type: 'p',
            text: '**对话**：指令微调模型逐 token 生成，本站演示可以调采样温度和系统提示。Qwen2 1.5B 是性价比最高的一档，中文表现也够用；需要更强推理时再上 Phi-3 Mini。**结构化输出**：让模型只吐合法 JSON。这件事在端侧比在云端更重要，因为你没有服务端兜底去校验和重试。**代码**：DeepSeek-Coder 1.3B 与 CodeLlama 7B，覆盖补全、解释和改写。',
          },
          {
            type: 'p',
            text: '结构化输出有两条路：**约束解码**（用 grammar 或 JSON schema 限制每一步可选的 token）和**提示词 + 校验重试**。端侧几乎一定要选前者——重试意味着再跑一遍完整前向，代价是双倍的电和延迟。',
          },
          {
            type: 'code',
            label: 'WebLLM：加载并流式生成',
            text: "import { CreateMLCEngine } from '@mlc-ai/web-llm';\n\nconst engine = await CreateMLCEngine('Qwen2-1.5B-Instruct-q4f16_1-MLC', {\n  initProgressCallback: (p) => console.log(p.text),\n});\n\nconst stream = await engine.chat.completions.create({\n  messages: [{ role: 'user', content: '把这段话改写成正式邮件：周五之前给我数据' }],\n  temperature: 0.7,\n  stream: true,\n});\nfor await (const chunk of stream) append(chunk.choices[0]?.delta?.content ?? '');",
          },
          {
            type: 'p',
            text: '第一次加载需要下载权重，1.5B 在普通宽带上是十来秒的事，8B 就是分钟级。所以产品上必须给进度条和缓存策略，否则用户会以为页面卡死——浏览器缓存命中之后，二次打开才是「秒开」。',
          },
          { type: 'h2', text: '什么时候不该放浏览器' },
          {
            type: 'ul',
            items: [
              '需要 70B 级模型才达标的复杂推理；',
              '首屏就要回答，无法接受一次几秒到几十秒的权重下载；',
              '用户设备没有 WebGPU，纯 CPU 上的 8B 模型慢到不可用；',
              '合规要求完整的服务端审计与内容留存。',
            ],
          },
          {
            type: 'p',
            text: '反过来说，**8B 以下、任务边界清晰（改写、抽取、分类、代码补全）、且愿意为首次加载付出一次下载**的场景，正是端侧 LLM 的甜点区：没有按 token 计费，没有网络往返，文本不出设备。',
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
        title: 'Running an LLM in a browser tab: 681 MiB to 4.2 GB',
        description:
          'Seven chat models, three structured-output approaches and three code models in our llm category differ sixfold in size. Parameter count, quantisation width and memory bandwidth explain which tier actually fits in a tab.',
        blocks: [
          {
            type: 'p',
            text: 'LLMs in the browser stopped being demo-ware a while ago. Our `llm` category lists seven chat models: the smallest, **TinyLlama 1.1B**, measures 681 MiB; the largest, **Llama-3 8B**, needs 4.2 GB. That sixfold spread is not a story about "accuracy" — it comes down to three things: **parameter count, quantisation width, and the fixed overhead eaten by the vocabulary and KV cache**.',
          },
          { type: 'h2', text: 'Where the megabytes come from' },
          {
            type: 'p',
            text: 'Weight bytes ≈ parameters × bytes per parameter. At 4 bit that is 0.5 bytes per parameter, so a 1.5B model should be 0.75 GB — it measures 828 MiB, the extra being the embedding table, norm parameters and quantisation scales. An 8B model at the same 4 bit should be 4 GB and measures 4.2 GB. The conclusion is blunt: **first look at parameter count, then decide how many bits you are willing to spend**.',
          },
          {
            type: 'table',
            caption: 'Measured download sizes for chat and code models in this catalogue',
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
          { type: 'h2', text: 'The bottleneck is bandwidth, not FLOPs' },
          {
            type: 'p',
            text: 'Every generated token requires reading all the weights once. So tokens/s is roughly **memory bandwidth ÷ model size**. The same GPU runs an 828 MiB model five times faster than a 4.2 GB one not because it computes faster, but because it reads five times less. That explains two familiar behaviours: why on-device models sacrifice parameters before giving up 4 bit, and why a long prompt means slow first token but fast later ones — prefill is a parallel matmul, decode is a serial weight read.',
          },
          {
            type: 'p',
            text: 'One number people forget: KV cache. It grows linearly with context and typically costs tens to a hundred-plus MB at 4K context on a 1.5B model. "828 MiB of weights" does not mean "828 MiB of tab".',
          },
          { type: 'h2', text: 'Three jobs it does well on the client' },
          {
            type: 'p',
            text: '**Chat**: an instruction-tuned model generating token by token, with temperature and system prompt exposed in our demo. Qwen2 1.5B is the value pick and handles Chinese well; step up to Phi-3 Mini when reasoning gets harder. **Structured output**: make the model emit legal JSON. This matters more on the client than in the cloud, because there is no server-side safety net to validate and retry. **Code**: DeepSeek-Coder 1.3B and CodeLlama 7B for completion, explanation and rewriting.',
          },
          {
            type: 'p',
            text: 'Structured output takes one of two paths: **constrained decoding** (a grammar or JSON schema limits the legal token at every step) or **prompt plus validate-and-retry**. On the client the first is almost mandatory — a retry means another full forward pass, at double the power and latency.',
          },
          {
            type: 'code',
            label: 'WebLLM: load and stream',
            text: "import { CreateMLCEngine } from '@mlc-ai/web-llm';\n\nconst engine = await CreateMLCEngine('Qwen2-1.5B-Instruct-q4f16_1-MLC', {\n  initProgressCallback: (p) => console.log(p.text),\n});\n\nconst stream = await engine.chat.completions.create({\n  messages: [{ role: 'user', content: 'Rewrite this as a formal email: send me the data by Friday' }],\n  temperature: 0.7,\n  stream: true,\n});\nfor await (const chunk of stream) append(chunk.choices[0]?.delta?.content ?? '');",
          },
          {
            type: 'p',
            text: 'The first load downloads the weights: seconds for 1.5B on ordinary broadband, minutes for 8B. So the product needs a progress indicator and a cache strategy, or users will conclude the page has hung. Only the second visit, served from the browser cache, feels instant.',
          },
          { type: 'h2', text: 'When the browser is the wrong place' },
          {
            type: 'ul',
            items: [
              'Complex reasoning that genuinely needs a 70B-class model;',
              'A first screen that must answer immediately, with no appetite for a multi-second or multi-minute download;',
              'Devices without WebGPU, where an 8B model on CPU is unusably slow;',
              'Compliance requirements for server-side auditing and content retention.',
            ],
          },
          {
            type: 'p',
            text: 'The sweet spot is the mirror image: **under 8B, a well-bounded task (rewriting, extraction, classification, code completion), and a user who will pay one download** — no per-token bill, no round trip, and the text never leaves the device.',
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
        title: '浏览器里的 RAG：嵌入、重排、向量索引三件套',
        description:
          '检索增强生成不是一个大模型的事，而是三个可以独立替换的零件。看 search-rag 分类里的嵌入模型、交叉编码器与向量索引各自负责什么、体积差在哪，以及为什么它们特别适合搬到浏览器里。',
        blocks: [
          {
            type: 'p',
            text: 'RAG 常被当成一个大模型的能力，其实它是一条流水线：**嵌入把文本变成一个点，向量索引负责在点海里快速找到邻居，重排再给这些邻居重新打分**。三者职责不同，换掉任何一个，效果和成本都会明显变化。本站 `search-rag` 分类就是按这三件事拆成 embedding / reranker / semantic-search 三个子类，每个子类都有能在浏览器里直接跑的演示。',
          },
          { type: 'h2', text: '第一件：嵌入把句子压成一个点' },
          {
            type: 'p',
            text: '嵌入模型是双塔结构（bi-encoder）：一次只编码一句话，输出定长向量，句子的语义被压进这几百个数字里。**all-MiniLM-L6-v2** 是端侧的默认答案——384 维、权重实测约 21.9 MiB，CPU 上编码一条短句是毫秒级；**BGE Small EN** 与 **GTE Small** 同为 32.4 MiB 级别，在检索基准上略强；**BGE-M3** 支持多语言与长上下文，代价是 1.1 GB 的下载量。',
          },
          {
            type: 'p',
            text: '这里有个服务器上不用操心、端侧却必须算的账：**索引内存 = 条数 × 维度 × 每维字节数**。10 万条 384 维向量，fp32 约 147 MB，int8 量化后约 37 MB。浏览器标签页的内存预算比服务器紧得多，所以端侧索引几乎都会选 int8。',
          },
          { type: 'h2', text: '第二件：索引决定召回速度' },
          {
            type: 'p',
            text: '十万条向量做暴力余弦扫描，在 CPU 上要几十毫秒，而且随条数线性增长。HNSW（分层可导航小世界图）把查询压到近似对数复杂度，是目前端侧最常用的选择：**hnswlib.js** 是它的 WASM 移植，**Voyager** 是 Spotify 的近似最近邻库，**LanceDB** 走列式存储加向量索引，**Vectra** 则把索引落在本地文件里。',
          },
          {
            type: 'p',
            text: '它们共同的工程价值不是「快」，而是**索引可以留在本地**：文档切片、向量、索引全在用户的设备上，检索这一步根本不需要发请求。隐私敏感的合同、病历、内部知识库，这是唯一能接受的形态。',
          },
          { type: 'h2', text: '第三件：重排把顺序调对' },
          {
            type: 'p',
            text: '双塔模型为了能预计算，必须把查询和文档分开编码，代价是丢掉了词级的交互信息——「退款政策」和「退货规则」在向量空间里很近，但「不退款」和「退款」也很近。交叉编码器（cross-encoder）把「查询 + 候选」拼成一条输入整体过一遍模型，判断准得多，但每条候选都要一次前向，没法预计算。',
          },
          {
            type: 'p',
            text: '所以标准结构是两段式：**嵌入召回 top-50，交叉编码器重排到 top-5**。本站的 **MS MARCO MiniLM Cross-Encoder**（约 22.1 MiB）就是干这个的轻量选择，**BGE Reranker Base**（约 266 MiB）更准也更贵。',
          },
          {
            type: 'table',
            caption: '三件套的分工与本站实测体积',
            head: ['阶段', '代表模型', '实测体积', '输出'],
            rows: [
              ['嵌入', 'all-MiniLM-L6-v2', '~21.9 MiB', '384 维向量'],
              ['嵌入（多语言 / 长文）', 'BGE-M3', '~1.1 GB', '1024 维向量'],
              ['索引', 'hnswlib.js / Voyager / LanceDB / Vectra', '库体积，无模型权重', 'top-k 近邻 id'],
              ['重排', 'MS MARCO MiniLM Cross-Encoder', '~22.1 MiB', '查询-文档相关性分数'],
              ['重排（更强）', 'BGE Reranker Base', '~266 MiB', '查询-文档相关性分数'],
            ],
          },
          { type: 'h2', text: '在浏览器里拼起来' },
          {
            type: 'code',
            label: '两段式检索的骨架（transformers.js）',
            text: "import { pipeline } from '@huggingface/transformers';\n\nconst embed = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { dtype: 'q8' });\nconst encode = async (text: string) =>\n  (await embed(text, { pooling: 'mean', normalize: true })).data;\n\n// 1. 建索引：语料逐条 encode 后写入 HNSW\n// 2. 召回：index.search(queryVec, 50)\n// 3. 重排：cross-encoder 对 (query, doc) 打分，取 top-5",
          },
          {
            type: 'p',
            text: '一个容易踩的坑：**索引和查询必须用同一个模型、同一套归一化**。换了嵌入模型（哪怕同尺寸）就必须重建索引，否则相似度分数根本没有可比性——这也是端侧索引重建成本需要提前评估的原因。',
          },
          { type: 'h2', text: '什么时候值得搬到端侧' },
          {
            type: 'ul',
            items: [
              '隐私：文档本身不能上传，只有检索发生在本地才成立；',
              '离线与弱网：内网、飞机、现场作业场景下照样能查；',
              '零边际成本：没有按 token 计费的 embedding API，用户量越大越划算；',
              '首字节延迟：省掉一次网络往返，交互式搜索的体感差异明显。',
            ],
          },
          {
            type: 'p',
            text: '反过来，语料上百万条、需要频繁全量重建、或多租户共享一套索引时，端侧不是好选择——这些场景的瓶颈在索引规模和运维，而不是延迟。',
          },
          {
            type: 'p',
            text: '想亲手看看差别，从嵌入演示开始：同一批句子换成不同模型，向量分布和相似度矩阵会立刻变得不一样；再到重排演示看交叉编码器如何把顺序纠正过来，最后在语义检索里看两段式串起来的效果。',
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
        title: 'RAG in the browser: embeddings, rerankers and vector indexes',
        description:
          'Retrieval-augmented generation is not one model but three interchangeable parts. A tour of the embedding models, cross-encoders and vector indexes in our search-rag category — what each does, where the megabytes go, and why they belong on the client.',
        blocks: [
          {
            type: 'p',
            text: 'RAG is usually described as a capability of a large model, but it is really a pipeline: **an embedding turns text into a point, a vector index finds the nearest points fast, and a reranker re-scores those neighbours**. Each part can be swapped, and each swap changes quality and cost. Our `search-rag` category is split along exactly those lines — embedding, reranker, semantic-search — and every subcategory has a demo that runs in the browser.',
          },
          { type: 'h2', text: 'Part one: embeddings compress a sentence into a point' },
          {
            type: 'p',
            text: 'An embedding model is a bi-encoder: it encodes one sentence at a time into a fixed-length vector, and the meaning lives in those few hundred numbers. **all-MiniLM-L6-v2** is the client-side default — 384 dimensions, roughly 21.9 MiB of weights, millisecond encoding of a short sentence on CPU. **BGE Small EN** and **GTE Small** sit at the same 32.4 MiB level and score slightly better on retrieval benchmarks; **BGE-M3** adds multilingual and long-context coverage for 1.1 GB of download.',
          },
          {
            type: 'p',
            text: 'One sum you never do on a server but must do on a client: **index memory = rows × dimensions × bytes per value**. A hundred thousand 384-dim vectors occupy about 147 MB as fp32 and about 37 MB as int8. Browser tabs have a much tighter memory budget than servers, which is why on-device indexes are almost always int8.',
          },
          { type: 'h2', text: 'Part two: the index sets recall speed' },
          {
            type: 'p',
            text: 'A brute-force cosine scan over 100k vectors costs tens of milliseconds on CPU and grows linearly. HNSW (hierarchical navigable small world graphs) brings queries down to roughly logarithmic, which makes it the client-side default: **hnswlib.js** is its WebAssembly port, **Voyager** is Spotify\u2019s nearest-neighbour library, **LanceDB** pairs columnar storage with a vector index, and **Vectra** keeps the index in a local file.',
          },
          {
            type: 'p',
            text: 'The shared value is not raw speed but **locality**: chunks, vectors and the index never leave the device, so the retrieval step needs no request at all. For contracts, medical records or internal knowledge bases, that is the only acceptable shape.',
          },
          { type: 'h2', text: 'Part three: the reranker fixes the order' },
          {
            type: 'p',
            text: 'A bi-encoder must encode query and document separately so vectors can be precomputed — at the cost of token-level interaction. "Refund policy" and "return rules" land close in vector space, but so do "no refunds" and "refunds". A cross-encoder concatenates query and candidate into one input and runs the model over the pair; far more accurate, but one forward pass per candidate, so nothing can be precomputed.',
          },
          {
            type: 'p',
            text: 'Hence the standard two-stage shape: **embeddings recall the top 50, the cross-encoder reranks down to 5**. Our **MS MARCO MiniLM Cross-Encoder** (about 22.1 MiB) is the light option; **BGE Reranker Base** (about 266 MiB) is stronger and pricier.',
          },
          {
            type: 'table',
            caption: 'Division of labour, with measured download sizes from this catalogue',
            head: ['Stage', 'Representative model', 'Measured size', 'Output'],
            rows: [
              ['Embedding', 'all-MiniLM-L6-v2', '~21.9 MiB', '384-dim vector'],
              ['Embedding (multilingual / long)', 'BGE-M3', '~1.1 GB', '1024-dim vector'],
              ['Index', 'hnswlib.js / Voyager / LanceDB / Vectra', 'Library only, no weights', 'top-k neighbour ids'],
              ['Rerank', 'MS MARCO MiniLM Cross-Encoder', '~22.1 MiB', 'query-document relevance'],
              ['Rerank (stronger)', 'BGE Reranker Base', '~266 MiB', 'query-document relevance'],
            ],
          },
          { type: 'h2', text: 'Wiring it up in the browser' },
          {
            type: 'code',
            label: 'The skeleton of two-stage retrieval (transformers.js)',
            text: "import { pipeline } from '@huggingface/transformers';\n\nconst embed = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { dtype: 'q8' });\nconst encode = async (text: string) =>\n  (await embed(text, { pooling: 'mean', normalize: true })).data;\n\n// 1. build: encode every chunk, insert into HNSW\n// 2. recall: index.search(queryVec, 50)\n// 3. rerank: cross-encode (query, doc), keep the top 5",
          },
          {
            type: 'p',
            text: 'One trap worth naming: **index and query must use the same model and the same normalisation**. Swap the embedding model — even for one of the same size — and the index has to be rebuilt, because similarity scores are no longer comparable. That rebuild cost belongs in the planning, not in the incident report.',
          },
          { type: 'h2', text: 'When client-side RAG pays off' },
          {
            type: 'ul',
            items: [
              'Privacy: if documents cannot be uploaded, retrieval has to happen locally to exist at all;',
              'Offline and poor networks: intranets, flights, field work;',
              'Zero marginal cost: no per-token embedding API — the bill does not grow with users;',
              'Time to first byte: one network round trip disappears, and interactive search feels different.',
            ],
          },
          {
            type: 'p',
            text: 'The opposite cases are equally clear: millions of chunks, frequent full rebuilds, or one shared index across tenants — there the bottleneck is index operations, not latency, and the client is the wrong home.',
          },
          {
            type: 'p',
            text: 'To see the difference, start with the embedding demo: same sentences, different models, and the vector spread and similarity matrix change immediately. Then watch the reranker reorder a candidate list, and finally see both stages chained in semantic search.',
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
