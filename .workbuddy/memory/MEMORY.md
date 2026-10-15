# WebAIModels / AI-Demos 项目长期记忆

## 项目结构
- 源码仓库：`/Users/jianmin.zhu/github/applications/WebAIModels`（分类与子类定义的数据来源）
- 演示站：`/Users/jianmin.zhu/github/applications/AI-Demos`（Next.js 16 App Router + React 19 + Tailwind CSS 4）
- 技术栈与版本：Next 16.4.0 / React 19.3.0 / Tailwind 4.3.3 / TS 5.9.3 / ESLint 9（扁平配置，`next lint` 已废弃）
- **WebAIModels 已于 2026-10-15 全量升级到与演示站同代**：Next 16.4.1 / React 19.3.1 / next-intl 4.14.9 /
  Tailwind 4.3.3（`@tailwindcss/postcss`）/ ESLint 10.12.0 + `eslint-config-next` 16.4.1 / **TS 6.0.3（不能上 7）**
- Tailwind v4 为 CSS-first：`app/globals.css` 首行 `@import 'tailwindcss'`，`postcss.config.js` 用 `@tailwindcss/postcss`，**没有** `tailwind.config.ts`

## WebAIModels 升级后必须记住的三条
1. **TS 卡在 6.x**：`typescript-eslint` 的 peer 是 `<6.1.0`，TS 7 直接崩；TS 7 还移除了 `baseUrl`。
2. **`middleware.ts` 在 Next 16 已改名 `proxy.ts`**（handler 形状不变）；ESLint 必须用 `eslint.config.mjs` flat config。
3. **`app/[locale]/layout.tsx` 必须有 `export const dynamic = 'force-static'`**。否则 next-intl 的
   `NextIntlClientProvider` 读 `formats` 会走 `headers()`，把 88 个页面全打成动态 `ƒ`。排查动态 API 用
   `dynamic = 'error'` 看报错最快。Tailwind v4 里 `max-w-prose` 由 `--max-width-prose` 驱动（不是 `--container-prose`）。

## 约定
- 配色：黑白灰，靠 `app/globals.css` 的 CSS 变量（`--bg` / `--fg` / `--border` / `--bg-inset` / `--fg-muted` / `--fg-faint` / `--fg-subtle`）。Tailwind v4 preflight 会把边框色变成 `currentColor`，故全局补 `* { border-color: var(--border); }`
- i18n：`lib/i18n.ts` 的 `L = {zh,en}` + `useApp()` 的 `tr(key)`，文案一律走 i18n，不硬编码中文
- 10 分类 / 30 子类：`lib/data/models.json`（103 个模型元数据）+ `lib/data/registry.ts`（每子类 DemoSpec）
- 演示引擎可插拔：`lib/engine/index.ts` 的 `runInference(kind, ctx)`；真实权重分支在 `lib/engine/real.ts` + `lib/data/real-models.ts`

## 真实推理（Transformers.js）关键约束
- 版本：`@huggingface/transformers@4.3.1` + `onnxruntime-web`，浏览器侧 WASM/WebGPU
- **ORT wasm 必须全量本地化**：`scripts/copy-ort-wasm.cjs` 要把 `onnxruntime-web/dist` 下所有 `ort-wasm-*.{mjs,wasm}` 拷进 `public/ort/`（共 8 个文件 / 约 82 MB），并设 `env.backends.onnx.wasm.wasmPaths='/ort/'`。
  只拷 `jsep` + 普通两套会报 `no available backend found ... ort-wasm-simd-threaded.asyncify.mjs`。`public/ort/` 已进 `.gitignore`，不入库。
- 只有 `REAL_MODELS` 里登记过的「分类 / 嵌入 / 检测」三子类部分模型有浏览器可跑权重，其余子类保持模拟引擎
- 标注诚实性：`meta.simulated = !real`，只有真正执行了 ONNX 权重才显示「真实权重 / 真实计算」，否则一律「演示模式」

## 本地运行
- 开发：`next dev -p 3100`；生产：`next build && next start -p 3100`
- 验证口径：`tsc --noEmit` + `eslint .` + `next build` + 30 个演示页 HTTP 200

## 排查环境的坑（省时间）
- 后台常驻服务的包装进程常会被回收并上报 `failed`，但真实进程还活着。先 `lsof -nP -iTCP:<port> -sTCP:LISTEN` 确认，别直接重启。
- 本机有沙箱代理 `HTTP_PROXY=http://127.0.0.1:57967`。`curl -L` 跟随重定向时，keep-alive 复用连接会拿到代理返回的 `308` 自指，看起来像重定向死循环。
  加 `-H "Connection: close"` 或用浏览器验证即可区分真假。
- 需要跑真实浏览器验证时用 `agent-browser`（`open / eval / upload / screenshot / close`）。点击前先等 React hydrate，
  否则首击无反应；`eval` 里按 `button.btn-primary` 取主按钮，别用文本模糊匹配（会误点到模型切换按钮）。
