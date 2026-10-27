# Web AI Models

A static, bilingual (en/zh) catalog of AI models, tools and application workflows
that run **in the browser**, plus an interactive demo section. The catalog pages
only display entries; the demos under `/demos` run inference in the tab.

Every page is pre-rendered: 10 categories, 40 task pages, one page per entry, an
application-workflow page and 39 demo pages (with a URL per preselected model),
in both locales.

The English homepage is served at `/`; `/en` redirects there using a static
meta-refresh document. English task and model pages retain their `/en/*` URLs,
and the Chinese homepage remains at `/zh`.

## What makes an entry trustworthy

The catalog separates *source review* from *runtime testing*, and says which one
a field rests on:

| Field | Meaning |
| --- | --- |
| `browserEvidence.status: pending` | Nobody has confirmed this runs in a browser. |
| `browserEvidence.status: upstream-example` | The project documents a browser integration — not a test on your device. |
| `browserEvidence.status: tested` | Measured here, with the conditions recorded in `benchmarks`. |
| `downloadBytes` | Exact bytes of the weight files for that precision, read from the host. |
| `reportedDownloadSize` | A historical estimate. Not a measurement. |
| `codeLicense` / `weightLicense` | Declared by the package / the model repo. Absent means unverified. |
| `reportedLicense` | A legacy label kept for comparison. Never treated as verified. |
| `identityUnresolved` | The entry's identity is in doubt — exclude it from model selection. |

Nothing here is inferred from a model's popularity or size, and no entry claims a
license, a size or a browser capability that a source does not state.

## Demo section (migrated from AI-Demos)

`/[locale]/demos` hosts the interactive playgrounds that used to live in a
separate app. The catalog and the demos are one site now:

| Path | What it is |
| --- | --- |
| `/[locale]/demos` | Index of every task that has a playground |
| `/[locale]/demos/[category]/[subcategory]` | The playground; switch models inside the task |
| `/[locale]/demos/[category]/[subcategory]/[model]` | Same page with one entry preselected (canonicalised to the task page) |

How the two codebases were joined:

- **One taxonomy.** The demo registry was written against an older set of
  category slugs (`llm/embedding`, `vision/text-to-image`, `multimodal/face`, …).
  Its specs already declared the catalog's slugs, so `lib/data/registry.ts` is now
  grouped by them — `search-rag`, `generative-vision`, `generative-audio`,
  `real-time` — and `text/token-classification` became `text/ner`. Route, model
  list and `real-models.ts` lookup keys now share one vocabulary.
- **One model list.** `lib/demo-catalog.ts` merges the catalog's entries with the
  demo snapshot, so a model added here shows up in the switcher without
  re-running an extraction script, and a catalog link always opens the entry it
  points at.
- **One locale.** `AppProvider` reads the locale from the route instead of
  localStorage; the demo UI's own language and theme toggles are gone because the
  header already owns both.
- **Scoped CSS.** The playground palette and `.btn`/`.surface`/`.field` classes
  live under `.demo-scope` in `app/globals.css`, so nothing leaks into the
  catalog's black-on-white typography.

Runtime assets are not committed. `npm install` runs `scripts/copy-ort-wasm.cjs`,
which copies the ONNX Runtime and MediaPipe wasm into `public/ort` and
`public/mediapipe` (both gitignored, ~120 MB); the sample images/audio/video live
in `public/samples` and the ffmpeg worker in `public/vendor/ffmpeg`.

The playgrounds are honest about what runs: entries with real ONNX weights
download and execute them, the rest use a deterministic simulator, and every page
labels which one it is using.

## Commands

```bash
npm run dev          # http://localhost:3000 serves the English homepage
npm run build        # runs check:i18n first, then prerenders every page
npm run lint
npm run typecheck
npm test             # translation-structure, routing and catalog-sync unit tests
npm run check:i18n   # en/zh parity, dead keys, and every key the code references
```

`NEXT_PUBLIC_SITE_URL` is required for a production build — every canonical,
hreflang, sitemap and robots URL derives from it, so a placeholder that reaches
production would point the whole site at a domain we do not own. See
`.env.example`.

## SEO

Every page ships metadata (title, description, keywords, canonical, hreflang
alternates, Open Graph/Twitter) and structured data:

| Page | JSON-LD |
| --- | --- |
| All | `WebSite` (one node in `SiteDocument`, referenced by `@id`) |
| Home | `ItemList` of categories + `FAQPage` |
| Task | `FAQPage` (from `TaskInsights`) + `ItemList` + breadcrumbs |
| Entry | `SoftwareApplication` + `FAQPage` (from `ModelInsights`) + `WebPage` + breadcrumbs |
| Demos index | `CollectionPage` + `FAQPage` + breadcrumbs |
| Demo task | `WebApplication` + breadcrumbs |
| Demo deep link | `noindex` — the canonical points at the task page, so the near-duplicates stay out of the index and the sitemap |

The intros and FAQ copy under the `seo.*` message namespace are generated from
the catalogue (`lib/seo.ts` counts entries, evidence and the smallest verified
weight), so a task page with three entries says something different from one with
twelve — and gaps ("size not verified yet") are stated as gaps instead of being
filled with an estimate. Keywords restate what the page shows in the phrases
people search for ("run NER in the browser", "浏览器 命名实体识别"); they never
claim a fact the page does not carry.

`npm run build` ends with `check:seo` (`scripts/check-seo.cjs`), which fails the
build when: the sitemap has duplicate or unreachable URLs, an advertised route has
no exported HTML, a key page loses its description/canonical/hreflang or its
structured data, or a demo deep link leaks into the index or the sitemap.

## Deploying

`esa.jsonc` uploads `./out` to the Pages host, which rejects any single file above
**25 MiB**. Two kinds of asset break that cap: the vendored ONNX Runtime builds
(`jsep` 28 MB, `asyncify` 26 MB) and Turbopack's copy of the `asyncify` binary in
`_next/static/media/`.

Those live in object storage. `NEXT_PUBLIC_ASSET_BASE` (see `.env.example`) is the
bucket origin; `lib/engine/remote-assets.ts` turns it into the
`ort.env.wasm.wasmPaths` prefix, so production fetches the binaries cross-origin
while `npm run dev` keeps using `public/ort/`. Re-upload after bumping
`onnxruntime-web` and after any change to the wasm filenames:

```bash
for f in public/ort/*; do fuc "$f"; done   # prints the public URL of each file
```

`postbuild` then runs `scripts/prune-large-assets.cjs`, which drops those binaries
from `out/` and fails the build if anything else is still over the cap — a file
that ships unseen would only fail at the host instead.

The bucket needs a CORS rule that allows `GET`/`HEAD` for the site origin,
otherwise the browser refuses the cross-origin wasm fetch and every real-weights
demo dies with `no available backend found`.

## Refreshing the catalog

```bash
node scripts/sync-hf.mjs --dry-run   # report what would change
node scripts/sync-hf.mjs             # rewrite data/models.ts
```

The sync fills only what an upstream source states: weight license (inheriting a
`base_model`'s license when a format conversion declares none), code license and
runtime version from the npm registry, weight revision, per-precision download
sizes from the file listing, and sizes of non-Hugging-Face artifacts via a HEAD
request. Two things it refuses to do:

- **Guess a license.** A repo that declares none keeps "not verified".
- **Repair an identity.** An entry whose repo ships no browser weights is
  reported, never patched — pointing `modelId` somewhere else is a review
  decision, so the dry-run report drives it by hand.

Its size arithmetic is the part most likely to be quietly wrong (a pipeline sums
its components, a component takes the largest of its duplicate exports, a file
adds its external-data sidecar), so that logic is covered by
`tests/sync-hf.test.mjs`.

## Adding an entry

1. Add the record to the right `category.subcategory` list in `data/models.ts`,
   with `id`, `nameKey`, `descriptionKey`, `kind`, `framework`, `tasks`, at least
   one dated `sources` entry, and `browserEvidence.status: 'pending'`.
2. Add `models.<id>.name` and `models.<id>.description` to **both**
   `messages/en.json` and `messages/zh.json`. `npm run check:i18n` fails on a
   missing key *and* on a key nothing references.
3. If it is a Hugging Face model or an npm package, set `modelId` / `npmPackage`
   and run the sync instead of typing licenses and sizes by hand.

## Known gaps

- `browserEvidence.status: tested` is 0 of 117: no entry has been measured on a
  real device from this repo, so `benchmarks` and `peakMemoryMB` are empty
  everywhere. Everything else is sourced; this is the one field that needs a
  browser harness rather than an API.
- Weight licenses cover 73 of 126 entries. Three Hugging Face repos declare none
  and have no base model to inherit from; the rest are tools and MediaPipe or
  TensorFlow.js assets that publish no weight license at all.
- Four entries have an unresolved identity and are marked as such in the UI
  rather than deleted, so the gap stays visible.
- 22 models claim a browser runtime without pinning the weights they would load,
  so their size, license and revision stay unverifiable. They are listed in
  `UNPINNED_BACKLOG` in `tests/catalog.test.cjs`, which only allows that list to
  shrink: a new entry must pin a weight or declare its identity unresolved.
