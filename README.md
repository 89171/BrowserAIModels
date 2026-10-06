# Web AI Models

A static, bilingual (en/zh) catalog of AI models, tools and application workflows
that run **in the browser**. The site renders a catalog; it never runs a model.

Every page is pre-rendered: 10 categories, 34 task pages, one page per entry and
an application-workflow page, in both locales.

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

## Commands

```bash
npm run dev          # http://localhost:3000, redirects to /en or /zh
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
- Weight licenses cover 64 of 117 entries. Three Hugging Face repos declare none
  and have no base model to inherit from; the rest are tools and MediaPipe or
  TensorFlow.js assets that publish no weight license at all.
- Four entries have an unresolved identity and are marked as such in the UI
  rather than deleted, so the gap stays visible.
- 22 models claim a browser runtime without pinning the weights they would load,
  so their size, license and revision stay unverifiable. They are listed in
  `UNPINNED_BACKLOG` in `tests/catalog.test.cjs`, which only allows that list to
  shrink: a new entry must pin a weight or declare its identity unresolved.
