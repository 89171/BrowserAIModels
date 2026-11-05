/**
 * Voice activity detection.
 *
 * `sileroVad` runs the official Silero VAD ONNX graph (v5, ~2.3 MB) through
 * onnxruntime-web: the model consumes 32 ms frames (512 new samples preceded by
 * a 64-sample context window) and emits a speech probability per frame; the LSTM
 * state feeds back between frames. `energyVad` is the no-weights fallback — a
 * short-window RMS gate that reports real speech regions without any checkpoint.
 * Both share the same hysteresis segment builder (threshold + minimum speech /
 * silence durations), so switching model swaps the probabilities, not the logic.
 */
import { decodeAudio, peaks } from './audio-tasks';
import { createSession, fetchModel, loadOrt } from './ort';

const RATE = 16000;
const CHUNK = 512; // 32 ms of new samples per inference frame
const CONTEXT = 64; // samples of trailing context prepended to every frame (v5)

export interface VadOptions {
  threshold: number;
  minSpeechMs: number;
  minSilenceMs: number;
}

export interface VadSegment {
  start: number;
  end: number;
  confidence: number;
}

export interface VadResult {
  duration: number;
  segments: VadSegment[];
  /** peak-normalised waveform for the timeline view */
  peaks: number[];
  /** fraction of the clip classified as speech */
  speechRatio: number;
  /** bytes downloaded this run (0 = session served from cache) */
  bytes: number;
}

/* ------------------------------------------------------- segment assembly */

function framesToSegments(
  probs: number[],
  frameDur: number,
  opts: VadOptions
): VadSegment[] {
  const minSilenceFrames = Math.max(1, Math.round(opts.minSilenceMs / 1000 / frameDur));
  const minSpeechFrames = Math.max(1, Math.round(opts.minSpeechMs / 1000 / frameDur));
  const out: VadSegment[] = [];
  let start = -1;
  let gap = 0;
  for (let i = 0; i < probs.length; i++) {
    const active = probs[i] >= opts.threshold;
    if (active) {
      if (start < 0) start = i - Math.min(gap, minSilenceFrames - 1);
      gap = 0;
    } else if (start >= 0) {
      gap++;
      if (gap >= minSilenceFrames) {
        const end = i - gap + 1;
        if (end - start >= minSpeechFrames) {
          const slice = probs.slice(start, end);
          out.push({
            start: Math.round(start * frameDur * 100) / 100,
            end: Math.round(end * frameDur * 100) / 100,
            confidence: Math.round((slice.reduce((s, x) => s + x, 0) / slice.length) * 1000) / 1000,
          });
        }
        start = -1;
        gap = 0;
      }
    }
  }
  if (start >= 0) {
    const end = probs.length - gap;
    if (end - start >= minSpeechFrames) {
      const slice = probs.slice(start, end);
      out.push({
        start: Math.round(start * frameDur * 100) / 100,
        end: Math.round(end * frameDur * 100) / 100,
        confidence: Math.round((slice.reduce((s, x) => s + x, 0) / slice.length) * 1000) / 1000,
      });
    }
  }
  return out;
}

function summarise(
  buffer: AudioBuffer,
  probs: number[],
  frameDur: number,
  opts: VadOptions
): { segments: VadSegment[]; speechRatio: number; peaks: number[] } {
  const segments = framesToSegments(probs, frameDur, opts);
  const speechSamples = segments.reduce((s, x) => s + (x.end - x.start), 0);
  const duration = buffer.length / buffer.sampleRate;
  return {
    segments,
    speechRatio: duration > 0 ? Math.round((speechSamples / duration) * 1000) / 1000 : 0,
    peaks: peaks(buffer, 320),
  };
}

/* ------------------------------------------------------------ real weights */

const sessions = new Map<string, Promise<{ session: Awaited<ReturnType<typeof createSession>>; bytes: number }>>();

export async function sileroVad(
  src: string,
  modelUrl: string,
  opts: VadOptions,
  onProgress?: (ratio: number) => void
): Promise<VadResult> {
  const buffer = await decodeAudio(src, RATE);
  const pcm = buffer.getChannelData(0);
  let job = sessions.get(modelUrl);
  if (!job) {
    job = fetchModel(modelUrl, (r) => onProgress?.(r)).then(async (bytes) => ({
      session: await createSession(bytes),
      bytes: bytes.byteLength,
    }));
    sessions.set(modelUrl, job);
    job.catch(() => sessions.delete(modelUrl));
  }
  const { session, bytes } = await job;
  const ort = await loadOrt();
  const srTensor = new ort.Tensor('int64', BigInt64Array.from([BigInt(RATE)]), []);
  let state = new ort.Tensor('float32', new Float32Array(2 * 1 * 128), [2, 1, 128]);
  const context = new Float32Array(CONTEXT);
  const frameDur = CHUNK / RATE;
  const probs: number[] = [];
  const input = new Float32Array(CONTEXT + CHUNK);
  for (let i = 0; i + CHUNK <= pcm.length; i += CHUNK) {
    // Yield to the UI thread every ~100 frames so the progress read-out moves.
    if ((i / CHUNK) % 100 === 0 && i > 0) await new Promise((r) => setTimeout(r, 0));
    input.set(context, 0);
    input.set(pcm.subarray(i, i + CHUNK), CONTEXT);
    const result = await session.run({
      input: new ort.Tensor('float32', input, [1, CONTEXT + CHUNK]),
      state,
      sr: srTensor,
    });
    state = result.stateN as typeof state;
    probs.push(Number(result.output.data[0]));
    context.set(pcm.subarray(i + CHUNK - CONTEXT, i + CHUNK));
  }
  return { duration: pcm.length / RATE, bytes, ...summarise(buffer, probs, frameDur, opts) };
}

/* ------------------------------------------------- no-weights fallback path */

/**
 * Energy gate over 50 ms windows: speech frames keep more than 14% of the
 * loudest window's RMS. Real signal processing — but not a neural network —
 * so the result meta stays honest about what computed the segments.
 */
export async function energyVad(
  src: string,
  opts: VadOptions,
  onProgress?: (ratio: number) => void
): Promise<VadResult> {
  const buffer = await decodeAudio(src, RATE);
  const ch = buffer.getChannelData(0);
  const win = Math.floor(buffer.sampleRate * 0.05);
  const frameDur = win / buffer.sampleRate;
  const energies: number[] = [];
  for (let i = 0; i < ch.length; i += win) {
    let s = 0;
    for (let k = i; k < Math.min(i + win, ch.length); k++) s += ch[k] * ch[k];
    energies.push(Math.sqrt(s / win));
  }
  const max = Math.max(...energies, 1e-6);
  const probs = energies.map((e) => Math.round(Math.min(1, e / (max * 0.14)) * 1000) / 1000);
  onProgress?.(1);
  return { duration: ch.length / buffer.sampleRate, bytes: 0, ...summarise(buffer, probs, frameDur, opts) };
}
