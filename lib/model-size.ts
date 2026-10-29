/**
 * How much a model actually downloads.
 *
 * A catalogue entry lists variants for two different reasons, and they size
 * differently:
 *
 *   * alternative precision builds of the same graph (fp32, fp16, q8, q4f16…) —
 *     a page downloads exactly one of them, so the entry's size is the SMALLEST;
 *   * the components one pipeline needs (PaddleOCR's detection + recognition) —
 *     the browser fetches all of them, so the entry's size is their SUM.
 *
 * Reading `Math.min` over every variant (the old behaviour) understates a
 * pipeline, and reading the fp32 build overstates every quantised model by 2–4x.
 * Both were visible as wrong `size` badges, so the rule lives here once instead
 * of in each surface that renders a size.
 */
import type { ModelVariant } from '../types/taxonomy';

/** Structural, because callers pass catalogue entries, demo entries or keywords. */
type SizedVariant = Partial<Pick<ModelVariant, 'label' | 'quantization' | 'downloadBytes' | 'reportedDownloadSize'>>;

export interface SizedEntry {
  variants?: SizedVariant[];
}

/** Labels that name a part of a pipeline rather than an encoding of one graph. */
const COMPONENT_LABEL =
  /(^|[\s_-])(det|detection|detector|rec|recognition|recognizer|encoder|decoder|text[_ -]?encoder|image[_ -]?encoder|unet|vae|vocoder|tokenizer)([\s_-]|$)/i;

export interface WeightTier {
  bytes: number;
  /**
   * Which precision build that byte count belongs to ("q8", "fp16", "q4f16").
   * Undefined when the number is a sum over pipeline parts, because then no
   * single encoding describes it.
   */
  quantization?: string;
}

/**
 * The build a page actually downloads, with its precision attached: a bare byte
 * count is ambiguous, since the same model is 42 MiB as int8 and 84 MiB as fp16.
 */
export function weightDownloadTier(entry: SizedEntry): WeightTier | undefined {
  const measured = (entry.variants ?? []).filter(
    (variant): variant is SizedVariant & { downloadBytes: number } =>
      typeof variant.downloadBytes === 'number' && variant.downloadBytes > 0,
  );
  if (!measured.length) return undefined;
  if (measured.length === 1) {
    return { bytes: measured[0].downloadBytes, quantization: measured[0].quantization };
  }

  // A quantisation label marks an alternative build, never a pipeline part, so
  // only unquantised component labels are summed.
  const components = measured.filter(
    (variant) => !variant.quantization && COMPONENT_LABEL.test(variant.label ?? ''),
  );
  if (components.length === measured.length) {
    return { bytes: measured.reduce((sum, variant) => sum + variant.downloadBytes, 0) };
  }

  const smallest = measured.reduce((a, b) => (a.downloadBytes <= b.downloadBytes ? a : b));
  return { bytes: smallest.downloadBytes, quantization: smallest.quantization };
}

/**
 * Bytes the browser fetches for this entry, or `undefined` when nothing is
 * measured — callers then fall back to the reported estimate or say "unknown".
 */
export function weightDownloadBytes(entry: SizedEntry): number | undefined {
  return weightDownloadTier(entry)?.bytes;
}
