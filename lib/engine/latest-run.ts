/** Serialize work and discard obsolete queued requests before they allocate a model. */
export class LatestRun {
  private version = 0;
  private tail: Promise<unknown> = Promise.resolve();
  begin() { return ++this.version; }
  invalidate() { this.version++; }
  current(id: number) { return this.version === id; }
  enqueue<T>(id: number, task: () => Promise<T>): Promise<T | undefined> {
    const job = this.tail.then(() => this.current(id) ? task() : undefined);
    this.tail = job.catch(() => undefined);
    return job;
  }
  afterIdle(task: () => void) { void this.tail.then(task, task); }
}

/** Only output URLs are owned here; originalUrl/videoUrl belong to the input. */
export function releaseOutputUrls(payload: unknown) {
  if (!payload || typeof payload !== 'object') return;
  for (const [key, value] of Object.entries(payload)) {
    if (key === 'url' && typeof value === 'string' && value.startsWith('blob:')) URL.revokeObjectURL(value);
    else if (Array.isArray(value)) value.forEach(releaseOutputUrls);
  }
}
