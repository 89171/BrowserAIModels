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
