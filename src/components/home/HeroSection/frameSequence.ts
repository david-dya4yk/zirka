import { FRAME_SETS, type FrameSet, frameAt, frameSrc } from './stages';

// Parallel downloads; more only competes with the page's own requests.
const CONCURRENCY = 6;
// Canvas resolution cap: past 2× the frames have no more detail to show.
const MAX_DPR = 2;

/** Every 16th frame first, then 8th, 4th… so any scroll position soon has a close frame. */
function loadOrder(count: number): number[] {
  const order: number[] = [];
  const seen = new Set<number>();
  for (let step = 16; step >= 1; step /= 2) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (!seen.has(count - 1)) order.splice(1, 0, count - 1);
  return order;
}

/**
 * Scroll-scrubbed frame sequence drawn on a canvas. Frames are downloaded and decoded once up
 * front, so scrolling only repaints a ready bitmap: no network, no decode, no React render.
 * Until a frame arrives the closest loaded one stands in.
 */
export class FrameSequence {
  private readonly frames: (HTMLImageElement | undefined)[];
  private readonly ctx: CanvasRenderingContext2D | null;
  private target = 0;
  private drawn = -1;
  private disposed = false;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly set: FrameSet,
  ) {
    this.frames = new Array<HTMLImageElement | undefined>(FRAME_SETS[set].count);
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.resize();
    void this.load();
  }

  /** Shows the frame for scroll progress 0–1. */
  seek(progress: number): void {
    this.target = frameAt(this.set, progress);
    this.draw();
  }

  /** Matches the canvas buffer to its on-screen size. */
  resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const w = Math.round(this.canvas.clientWidth * dpr);
    const h = Math.round(this.canvas.clientHeight * dpr);
    if (w === this.canvas.width && h === this.canvas.height) return;
    this.canvas.width = w;
    this.canvas.height = h;
    this.drawn = -1;
    this.draw();
  }

  dispose(): void {
    this.disposed = true;
  }

  private async load(): Promise<void> {
    const queue = loadOrder(this.frames.length);
    const worker = async (): Promise<void> => {
      for (let i = queue.shift(); i !== undefined && !this.disposed; i = queue.shift()) {
        const img = new Image();
        img.src = frameSrc(this.set, i);
        try {
          await img.decode();
        } catch {
          continue;
        }
        this.frames[i] = img;
        // Repaint only if this frame is closer to the target than what is on screen.
        if (Math.abs(i - this.target) < Math.abs(this.drawn - this.target)) this.draw();
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  }

  private nearestLoaded(): number {
    for (let d = 0; d < this.frames.length; d++) {
      if (this.frames[this.target - d]) return this.target - d;
      if (this.frames[this.target + d]) return this.target + d;
    }
    return -1;
  }

  private draw(): void {
    const index = this.nearestLoaded();
    const img = this.frames[index];
    if (!img || !this.ctx || index === this.drawn || this.disposed) return;
    // object-fit: cover, centred.
    const { width: cw, height: ch } = this.canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    this.ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    this.drawn = index;
    this.canvas.dataset['ready'] = '';
  }
}
