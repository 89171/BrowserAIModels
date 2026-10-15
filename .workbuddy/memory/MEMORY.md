# 项目长期记忆

本目录同时保存两个相邻项目。**WebAIModels 是本仓库**；AI-Demos 是另一仓库，因无独立记忆目录而记在此。

## 一、WebAIModels（本仓库）
- 仓库 `git@github.com:89171/WebAIModels.git`，GitHub 已改名为 **BrowserAIModels**（推送有 moved 提示，仍可推）。
- 定位：**纯静态目录站**，双语 en/zh，10 分类 / 34 任务页 / 117 条目，**不运行任何模型**，只展示目录与来源核查状态。
- 部署：`output: 'export'` → `out/`，`esa.jsonc` 指 ESA Pages，线上 browseraimodels.xyz。
- 栈：Next 16.4.1 / React 19.3.1 / next-intl 4.14.9 / Tailwind 4.3.3 / ESLint 10.12.0 / TS 6.0.3。

### 硬约定
- **不许加 `middleware.ts` / `proxy.ts`**：静态导出不能跑中间件，根页用 meta refresh 跳转。
- 路由参数一律异步（`params: Promise`）；动态段都要 `generateStaticParams`。
- `lib/site.ts` 在 production 下缺 `NEXT_PUBLIC_SITE_URL` 会抛错拒绝构建（`.env.production` 已给）。
- Tailwind v4 配置在 `app/globals.css` 的 `@theme`（无 `tailwind.config.ts`）；`max-w-prose` 由 `--max-width-*` 驱动。
- ESLint 扁平配置 `eslint.config.mjs`；`lint` 脚本不能带 `--ext`。
- TS 只能到 6.x（`typescript-eslint` peer 上限 `<6.1.0`）；TS 7 还移除了 tsconfig 的 `baseUrl`。
- CI 跑 `npm ci → lint → typecheck → test → build`，build 注入 `NEXT_PUBLIC_SITE_URL`。

### 锁文件的坑（10-06~10-09 CI 连续红就是这个）
在**已有 `node_modules`** 的目录上直接 `npm install`，生成的 lock 会漏记 optional/inBundle
传递依赖 → CI 第一步 `npm ci` 报 `Missing: X from lock file`，后面全跑不到。改依赖后必须补
`npm install --package-lock-only`，再用 `npm ci --dry-run` 验证收敛。

### 遗留
`messages/*.json` 里 applications 文案含未转义花括号（`{file, strideMs}`）：dev 下 next-intl 报
`INVALID_MESSAGE`，生产则原样输出，不阻断构建。

## 二、AI-Demos（另一仓库）
- `github.com:89171/AI-Demos.git`，**只能走 SSH**（本机无 credential helper）。
- 带**真实推理**的浏览器端 Demo 站：`lib/engine/index.ts` 的 `runInference(kind, ctx)` 可插拔；
  真实权重在 `lib/engine/real.ts` + `lib/data/real-models.ts`。
- 栈 Next 16 / React 19 / Tailwind 4（CSS-first）。i18n 用 `lib/i18n.ts` 的 `L={zh,en}` + `useApp().tr(key)`。
- 配色黑白灰，靠 `app/globals.css` 的 `--bg/--fg/--border/…` 变量；v4 preflight 会把边框变
  `currentColor`，故全局补 `* { border-color: var(--border); }`。
- 10 分类 / 30 子类：`lib/data/models.json`（103 条）+ `lib/data/registry.ts`（每子类 DemoSpec）。
- **ORT wasm 必须全量本地化**：`scripts/copy-ort-wasm.cjs` 把 `ort-wasm-*.{mjs,wasm}`（8 个 / ~82MB）
  拷进 `public/ort/` 并设 `wasm.wasmPaths='/ort/'`；只拷 jsep 会报 `no available backend found`。
- 覆盖率盘点（10-15）：真实 48 / 模拟 55，覆盖 19/30 子类；`meta.simulated = !real` 决定标注。

## 三、本地环境坑（通用）
- 沙箱拦 `rm -rf node_modules`/`.next`：依赖用原地 `npm install`，缓存目录用 `mv` 到 `/tmp`。
- `npm install` 报 `ENOTEMPTY`/`CODEBUDDY_BROKER_DENY`：清掉 `node_modules/.<pkg>-xxxxx` 残留再装。
- `next dev`/`next build` 尽量前台跑；后台易被回收，沙箱代理会让 worker 报 `broker.sock` ECONNREFUSED。
- 本机代理会干扰本机端口/外网 `curl`（`502`/`000`/假 308）：加 `--noproxy '*'` 和 `-H "Connection: close"`。
- 浏览器实测用 `agent-browser`；点击前等 hydrate，用 `button.btn-primary` 取按钮。
