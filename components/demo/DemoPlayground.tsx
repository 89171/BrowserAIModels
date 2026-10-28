'use client';

import { Link } from '@/i18n/routing';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '@/lib/client-context';
import { FRAMEWORK_LABEL, LICENSE_LABEL } from '@/lib/data/models';
import { BROWSER_INFEASIBLE, realSpecFor, ocrUnavailableReason } from '@/lib/data/real-models';
import { computesRealSignal } from '@/lib/engine';
import { getDemo } from '@/lib/data/registry';
import type { DemoSpec, InputState, Locale, ModelEntry } from '@/lib/types';
import { runInference, type RunResult } from '@/lib/engine';
import { AudioPanel, ImagePanel, LinesEditor, SampleBar, TextField, VideoPanel, sampleToInput, type VideoRect } from './InputPanel';
import { ParamBar } from './ParamBar';
import { ResultView } from './results';
import { LatestRun, releaseOutputUrls } from '@/lib/engine/latest-run';
import { initialDemoParams, supportedParams } from '@/lib/engine/contracts';
import { LiveOverlay } from './LiveOverlay';

export function DemoPlayground({
  category,
  subcategory,
  categoryName,
  subcategoryName,
  models,
  initialModelId,
}: {
  category: string;
  subcategory: string;
  /** Localised labels come from the catalogue's translations, passed down by the server page. */
  categoryName: string;
  subcategoryName: string;
  /**
   * Resolved on the server: importing the catalogue into this client component
   * would ship every entry of the site to the browser.
   */
  models: ModelEntry[];
  /** Set by /demos/:category/:subcategory/:model so a catalogue link opens on that entry. */
  initialModelId?: string;
}) {
  const { locale, tr } = useApp();
  const spec = getDemo(category, subcategory) as DemoSpec | undefined;
  // How many entries in this subcategory ship real browser weights — shown in the
  // switcher header so users can tell which switches will actually download.
  const realCount = useMemo(
    () => models.filter((m) => realSpecFor(category, subcategory, m.id)).length,
    [models, category, subcategory]
  );

  const [modelId, setModelId] = useState(() =>
    initialModelId && models.some((m) => m.id === initialModelId) ? initialModelId : (models[0]?.id ?? '')
  );
  const [sampleId, setSampleId] = useState(spec?.samples[0]?.id ?? '');
  const [input, setInput] = useState<InputState>(() =>
    spec ? sampleToInput(spec.samples[0], locale) : { text: '', fields: {}, lines: [] }
  );
  const [params, setParams] = useState<Record<string, string | number | boolean>>(() => initialDemoParams(spec, input.text));
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<string | undefined>();
  const [result, setResult] = useState<RunResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [audioPeaks, setAudioPeaks] = useState<number[]>([]);
  const [maskKey, setMaskKey] = useState(0);
  const maskRef = useRef<{ alpha: Float32Array; w: number; h: number } | null>(null);
  const [maskDims, setMaskDims] = useState<{ w: number; h: number } | undefined>(undefined);
  // video-inpainting: normalised watermark selection kept in a ref so dragging
  // does not re-render the whole playground; mirrored in state for the overlay.
  const DEFAULT_VIDEO_RECT: VideoRect = { x: 0.6, y: 0.68, w: 0.34, h: 0.2 };
  const needsVideoRect = spec?.outputKind === 'video-inpainting';
  const rectRef = useRef<VideoRect | null>(needsVideoRect ? DEFAULT_VIDEO_RECT : null);
  const [selRect, setSelRect] = useState<VideoRect | null>(needsVideoRect ? DEFAULT_VIDEO_RECT : null);

  const runs = useRef(new LatestRun());
  useEffect(() => {
    const queue = runs.current;
    return () => queue.invalidate();
  }, []);
  useEffect(() => {
    const src = input.media?.src;
    const queue = runs.current;
    return () => {
      if (src?.startsWith('blob:')) queue.afterIdle(() => URL.revokeObjectURL(src));
    };
  }, [input.media?.src]);
  useEffect(() => () => releaseOutputUrls(result?.payload), [result]);

  const invalidate = () => {
    runs.current.invalidate();
    setRunning(false);
    setPhase(undefined);
    setResult(null);
    setError(null);
  };

  const model = models.find((m) => m.id === modelId) ?? models[0];

  /*
   * Switching task or language remounts this component (the page passes a key),
   * so the "reset the sample when the spec changes" effects that used to live
   * here are no longer needed — and neither is the `dirty` flag that guarded the
   * locale one.
   */

  const pickSample = (id: string) => {
    if (!spec) return;
    const s = spec.samples.find((x) => x.id === id);
    if (!s) return;
    invalidate();
    setSampleId(id);
    setInput(sampleToInput(s, locale));
    setResult(null);
    setError(null);
    maskRef.current = null;
    setMaskKey((k) => k + 1);
  };

  const update = (patch: Partial<InputState>) => {
    invalidate();
    if (patch.media !== undefined) maskRef.current = null;
    setInput((prev) => ({ ...prev, ...patch }));
  };

  const run = useCallback(
    async (overrides?: { modelId?: string; input?: InputState }) => {
      if (!spec || !model) return;
      const activeModel = overrides?.modelId
        ? models.find((m) => m.id === overrides.modelId) ?? model
        : model;
      const state = overrides?.input ?? input;
      const runId = runs.current.begin();
      setResult(null);
      setRunning(true);
      setError(null);
      setPhase(undefined);
      try {
        const res = await runs.current.enqueue(runId, () => runInference(spec.outputKind, {
          spec,
          model: activeModel,
          locale,
          text: state.text,
          fields: state.fields,
          lines: state.lines.filter((l) => l.trim().length > 0),
          params,
          sampleId,
          media: state.media
            ? {
                src: state.media.src,
                builtin: state.media.builtin,
                sampleId: state.media.sampleId,
                reference: state.media.reference,
              }
            : undefined,
          maskAlpha: maskRef.current?.alpha,
          maskSize: maskRef.current ? { w: maskRef.current.w, h: maskRef.current.h } : undefined,
          videoRect: rectRef.current ?? undefined,
          onPhase: (message) => { if (runs.current.current(runId)) setPhase(message); },
        }));
        if (!res) return;
        if (!runs.current.current(runId)) { releaseOutputUrls(res.payload); return; }
        setResult(res);
      } catch (e) {
        if (!runs.current.current(runId)) return;
        setError(e instanceof Error ? e.message : String(e));
        setResult(null);
      } finally {
        if (runs.current.current(runId)) {
          setRunning(false);
          setPhase(undefined);
        }
      }
    },
    [spec, model, models, input, params, locale, sampleId]
  );

  const changeModel = (id: string) => {
    setModelId(id);
    if (ocrUnavailableReason(category, subcategory, id)) {
      invalidate();
      return;
    }
    void run({ modelId: id });
  };

  if (!spec || !model) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm">{locale === 'zh' ? '未找到该演示' : 'Demo not found'}</p>
        <Link href="/demos" className="btn mt-4 inline-flex">
          {tr('backHome')}
        </Link>
      </div>
    );
  }

  const real = realSpecFor(category, subcategory, model.id);
  const unavailable = ocrUnavailableReason(category, subcategory, model.id);
  const allowedParams = supportedParams(spec, real);
  const textFields = real?.task === 'image-to-text' && spec.outputKind === 'chat' ? []
    : real?.task === 'document-question-answering' ? [{ key: 'question', label: { zh: '文档问题（英文）', en: 'Document question (English)' }, placeholder: { zh: '例如：What is the invoice number?', en: 'e.g. What is the invoice number?' } }]
    : spec.textFields;
  const needsText = spec.inputMode === 'text';
  const needsLines = spec.inputMode === 'lines';
  const needsImage = spec.inputMode === 'image' || spec.inputMode === 'image+text';
  const needsAudio = spec.inputMode === 'audio' || spec.inputMode === 'audio+text';
  const needsVideo = spec.inputMode === 'video';

  return (
    <div className="mx-auto max-w-[1420px] px-4 py-6 lg:px-8 lg:py-8">
      {/* breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--fg-faint)' }}>
        <Link href="/demos" className="hover:underline">
          {tr('backHome')}
        </Link>
        <span>/</span>
        <span>{categoryName}</span>
        <span>/</span>
        <span style={{ color: 'var(--fg-muted)' }}>{subcategoryName}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">{subcategoryName}</h1>
        <p className="mt-1.5 text-[13px]" style={{ color: 'var(--fg-muted)' }}>
          {spec.tagline[locale]}
        </p>
        <p className="mt-2 max-w-3xl text-[12px] leading-5" style={{ color: 'var(--fg-subtle)' }}>
          {spec.task[locale]}
        </p>
        {real?.task === 'image-to-text' && spec.outputKind === 'chat' && (
          <p className="mt-2 text-[12px]" style={{ color: 'var(--fg-subtle)' }}>
            {locale === 'zh' ? '当前模型生成整图描述，不支持按问题作答。' : 'This model captions the image; question answering is not supported.'}
          </p>
        )}
      </header>

      {/* model switcher */}
      <section className="surface mb-6 rounded-xl p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-medium" style={{ color: 'var(--fg-subtle)' }}>
            {tr('modelSwitcher')} · {models.length} {tr('modelsAvailable')}
            {realCount > 0 ? (
              <>
                {' · '}
                <span style={{ color: 'var(--fg-faint)' }}>
                  {tr('weightsAvailableCount').replace('{n}', String(realCount))}
                </span>
              </>
            ) : null}
          </span>
          <span className="text-[10px]" style={{ color: 'var(--fg-faint)' }}>
            {tr('modelHint')}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {models.map((m) => {
            const active = m.id === modelId;
            const real = realSpecFor(category, subcategory, m.id);
            const unavailable = ocrUnavailableReason(category, subcategory, m.id);
            const infeasible = !real ? BROWSER_INFEASIBLE[`${category}/${subcategory}`] : undefined;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => changeModel(m.id)}
                className="group max-w-[260px] rounded-lg border px-3 py-2 text-left transition-colors"
                style={{
                  background: active ? 'var(--accent)' : 'var(--bg)',
                  color: active ? 'var(--accent-fg)' : 'var(--fg)',
                  borderColor: active ? 'var(--accent)' : 'var(--border)',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[12.5px] font-medium">{m.name}</span>
                  {real ? (
                    // Solid pill: switching to this entry really downloads weights,
                    // so it must be obvious enough to spot before clicking.
                    <span
                      className="mono shrink-0 rounded border px-1 py-px text-[9.5px] leading-none"
                      title={real.note[locale]}
                      style={{
                        borderStyle: 'solid',
                        borderColor: active ? 'var(--accent-fg)' : 'var(--fg-faint)',
                        color: active ? 'var(--accent-fg)' : 'var(--fg-muted)',
                        opacity: active ? 1 : 0.9,
                      }}
                    >
                      {real.substitute ? '◇' : '◆'} {tr('browserWeights')}
                    </span>
                  ) : (
                    // Say the quiet part out loud: nothing will be downloaded.
                    // The tooltip distinguishes "deterministic fake output" from
                    // "real signal processing on top of fake weights" — very different
                    // things that a single badge cannot convey.
                    // NOTE: border-style must be inline — globals.css sets
                    // `* { border-style: solid }`, which beats the `border-dashed` class.
                    <span
                      className="mono shrink-0 rounded border px-1 py-px text-[9.5px] leading-none"
                      title={
                        unavailable ? unavailable[locale] : infeasible
                          ? infeasible[locale]
                          : spec && computesRealSignal(spec.outputKind)
                            ? tr('simulatorSignalHint')
                            : tr('simulatorRandomHint')
                      }
                      style={{
                        borderStyle: 'dashed',
                        borderColor: active ? 'var(--accent-fg)' : 'var(--border)',
                        color: active ? 'var(--accent-fg)' : 'var(--fg-faint)',
                        opacity: active ? 0.9 : 1,
                      }}
                    >
                      {unavailable ? (locale === 'zh' ? '尚未接入' : 'Not integrated') : infeasible ? tr('infeasibleBadge') : tr('simulatorBadge')}
                    </span>
                  )}
                </div>
                <div
                  className="mt-1 flex items-center gap-1.5 text-[10px]"
                  style={{ color: active ? 'var(--accent-fg)' : 'var(--fg-faint)', opacity: active ? 0.75 : 1 }}
                >
                  <span>{FRAMEWORK_LABEL[m.framework] ?? m.framework}</span>
                  <span>·</span>
                  <span className="mono">{m.size}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* ---------------------------------------------------------- input */}
        <section className="surface rounded-xl p-4 lg:p-5">
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <h2 className="text-[13px] font-semibold">{tr('input')}</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-ghost !px-2 !text-[11px]"
                onClick={() => pickSample(sampleId)}
              >
                {tr('reset')}
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <SampleBar spec={spec} sampleId={sampleId} onPick={pickSample} />

            {needsText && (
              <div className="space-y-4">
                <TextField
                  label={locale === 'zh' ? '文本内容' : 'Text'}
                  value={input.text}
                  onChange={(v) => update({ text: v })}
                  multiline
                  rows={8}
                  hint={`${input.text.length}`}
                />
                {textFields?.map((f) => (
                  <TextField
                    key={f.key}
                    label={f.label[locale]}
                    value={input.fields[f.key] ?? ''}
                    placeholder={f.placeholder?.[locale]}
                    onChange={(v) => update({ fields: { ...input.fields, [f.key]: v } })}
                    multiline={f.multiline}
                    rows={f.multiline ? 3 : undefined}
                  />
                ))}
              </div>
            )}

            {needsLines && (
              <div className="space-y-4">
                {textFields?.map((f) => (
                  <TextField
                    key={f.key}
                    label={f.label[locale]}
                    value={input.fields[f.key] ?? ''}
                    placeholder={f.placeholder?.[locale]}
                    onChange={(v) => update({ fields: { ...input.fields, [f.key]: v } })}
                    multiline={f.multiline}
                  />
                ))}
                <div>
                  <div className="mb-2 text-[11px]" style={{ color: 'var(--fg-subtle)' }}>
                    {locale === 'zh' ? '语料' : 'Corpus'}
                  </div>
                  <LinesEditor lines={input.lines} onChange={(lines) => update({ lines })} />
                </div>
              </div>
            )}

            {needsImage && (
              <div className="space-y-4">
                <ImagePanel
                  spec={spec}
                  media={input.media}
                  onMedia={(m) => update({ media: m })}
                  brushMask={maskDims}
                  onBrushMask={(alpha, w, h) => {
                    // Keep the pixels in a ref so painting never re-renders the canvas;
                    // only the mask size is mirrored into state (it changes once).
                    invalidate();
                    maskRef.current = { alpha, w, h };
                    setMaskDims((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
                  }}
                  maskKey={maskKey}
                />
                {textFields?.map((f) => (
                  <TextField
                    key={f.key}
                    label={f.label[locale]}
                    value={input.fields[f.key] ?? ''}
                    placeholder={f.placeholder?.[locale]}
                    onChange={(v) => update({ fields: { ...input.fields, [f.key]: v } })}
                    multiline={f.multiline}
                    rows={f.multiline ? 6 : undefined}
                  />
                ))}
              </div>
            )}

            {needsAudio && (
              <div className="space-y-5">
                <AudioPanel
                  media={input.media}
                  onMedia={(m) => update({ media: m })}
                  peaks={audioPeaks}
                  onPeaks={setAudioPeaks}
                />
                {textFields?.map((f) => (
                  <TextField
                    key={f.key}
                    label={f.label[locale]}
                    value={input.fields[f.key] ?? ''}
                    placeholder={f.placeholder?.[locale]}
                    onChange={(v) => update({ fields: { ...input.fields, [f.key]: v } })}
                    multiline={f.multiline}
                    rows={4}
                  />
                ))}
              </div>
            )}

            {needsVideo && (
              <VideoPanel
                media={input.media}
                onMedia={(m) => update({ media: m })}
                selection={needsVideoRect ? selRect : undefined}
                onSelection={
                  needsVideoRect
                    ? (rect) => {
                        invalidate();
                        rectRef.current = rect;
                        setSelRect(rect);
                      }
                    : undefined
                }
              />
            )}

            <div className="border-t pt-4">
              <ParamBar
                spec={spec}
                values={params}
                supported={allowedParams}
                englishChineseOnly={real?.task === 'translation'}
                onChange={(k, v) => { invalidate(); setParams((prev) => ({ ...prev, [k]: v })); }}
              />
            </div>

            {spec.brush && (
              <button
                type="button"
                className="btn w-full"
                onClick={() => {
                  invalidate();
                  maskRef.current = null;
                  setMaskDims(undefined);
                  setMaskKey((k) => k + 1);
                }}
              >
                {tr('brushClear')}
              </button>
            )}

            <button
              type="button"
              className="btn btn-primary w-full !py-2.5"
              onClick={() => run()}
              disabled={running || Boolean(unavailable)}
            >
              {running ? tr('running') : result ? tr('rerun') : tr('run')}
            </button>
            {unavailable && <p className="rounded-lg border px-3 py-2 text-[11px]" role="status">{unavailable[locale]}</p>}
            {error && (
              <p className="rounded-lg border px-3 py-2 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
                {tr('loadFailed')}: {error}
              </p>
            )}
          </div>
        </section>

        {/* --------------------------------------------------------- output */}
        <section className="surface h-fit rounded-xl p-4 lg:sticky lg:top-4 lg:p-5">
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <h2 className="text-[13px] font-semibold">{spec.resultTitle?.[locale] ?? tr('output')}</h2>
            <span className="text-[10px]" style={{ color: 'var(--fg-faint)' }}>
              {model.name}
            </span>
          </div>
          <ResultView result={result} running={running} phase={phase} />
        </section>
      </div>

      {spec.webcam && (
        <div className="mt-6">
          <LiveOverlay
            mp={realSpecFor(category, subcategory, model.id)?.mp}
            variant={
              spec.outputKind === 'landmarks-pose'
                ? 'pose'
                : spec.outputKind === 'landmarks-hand'
                  ? 'hand'
                  : 'face'
            }
          />
        </div>
      )}

      {/* ------------------------------------------------------- model info */}
      <section className="surface mt-6 rounded-xl p-5">
        <h2 className="mb-4 text-[13px] font-semibold">{tr('modelInfo')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-[14px] font-medium">{model.name}</div>
            <p className="mt-1.5 text-[12px] leading-5" style={{ color: 'var(--fg-muted)' }}>
              {model.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="tag">{tr('framework')}: {FRAMEWORK_LABEL[model.framework] ?? model.framework}</span>
              <span className="tag">
                {tr('size')}: {model.size}
              </span>
              <span className="tag">
                {tr('license')}: {LICENSE_LABEL[model.license] ?? model.license}
              </span>
              {model.languages.slice(0, 2).map((l) => (
                <span key={l} className="tag">
                  {l}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {model.demoUrl && (
                <a className="btn !text-[11px]" href={model.demoUrl} target="_blank" rel="noreferrer">
                  {tr('officialDemo')} ↗
                </a>
              )}
              {model.docsUrl && (
                <a className="btn !text-[11px]" href={model.docsUrl} target="_blank" rel="noreferrer">
                  {tr('docs')} ↗
                </a>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="mb-2 text-[11px] font-medium" style={{ color: 'var(--fg-subtle)' }}>
                {tr('allModels')}
              </div>
              <div className="space-y-1">
                {models.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => changeModel(m.id)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] transition-colors"
                    style={{
                      background: m.id === modelId ? 'var(--bg-muted)' : 'transparent',
                      color: m.id === modelId ? 'var(--fg)' : 'var(--fg-muted)',
                    }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: m.id === modelId ? 'var(--fg)' : 'var(--border-strong)' }}
                    />
                    <span className="min-w-0 flex-1 truncate">{m.name}</span>
                    {realSpecFor(category, subcategory, m.id) ? (
                      <span
                        className="mono shrink-0 text-[10px]"
                        style={{ color: 'var(--fg-muted)' }}
                        title={tr('browserWeightsHint')}
                      >
                        ◆
                      </span>
                    ) : null}
                    <span className="mono shrink-0 text-[10px]" style={{ color: 'var(--fg-faint)' }}>
                      {m.size}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="surface-inset rounded-lg p-3">
              <div className="mb-1 text-[11px] font-medium" style={{ color: 'var(--fg-subtle)' }}>
                {tr('notes')}
              </div>
              <p className="text-[11px] leading-5" style={{ color: 'var(--fg-faint)' }}>
                {tr('derivedResult')}
              </p>
              <p className="mt-2 text-[11px] leading-5" style={{ color: 'var(--fg-faint)' }}>
                {locale === 'zh'
                  ? '切换模型只改变权重量化、设备与后端元信息；示例内容（文本、图片、音频、视频）在同一子类内通用。'
                  : 'Switching models only changes weight size, device and backend metadata; samples are shared across every model in the subcategory.'}
              </p>
              {realCount > 0 ? (
                <p className="mt-2 text-[11px] leading-5" style={{ color: 'var(--fg-faint)' }}>
                  {tr('browserWeightsHint')}
                </p>
              ) : (
                <p className="mt-2 text-[11px] leading-5" style={{ color: 'var(--fg-faint)' }}>
                  {locale === 'zh'
                    ? '本子类下所有模型都没有浏览器可直接加载的 ONNX 权重，因此切换模型不会触发任何下载。'
                    : 'No model here ships browser-loadable ONNX weights, so switching never triggers a download.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
