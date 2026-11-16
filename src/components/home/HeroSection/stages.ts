// Two renders of the same build-up: 2560×1440 for landscape screens, 1080×1920 for portrait phones.
export const FRAME_SETS = {
  desktop: { dir: 'desktop', count: 95 },
  mobile: { dir: 'mobile', count: 122 },
} as const;
export type FrameSet = keyof typeof FRAME_SETS;

/** Portrait viewports get the vertical render; must match the <source media> in HeroSection. */
export const MOBILE_FRAMES_QUERY = '(max-aspect-ratio: 1/1)';

/** Frame of a set shown at scroll progress 0–1. */
export function frameAt(set: FrameSet, progress: number): number {
  return Math.round(progress * (FRAME_SETS[set].count - 1));
}

export function frameSrc(set: FrameSet, index: number): string {
  return `/frames/${FRAME_SETS[set].dir}/${String(index).padStart(3, '0')}.webp`;
}

export interface Stage {
  code: string;
  name: string;
  /** Scroll progress (0–1) at which this stage becomes active. */
  from: number;
}

export const STAGES = [
  { code: '00', name: 'ДІЛЯНКА', from: 0 },
  { code: '01', name: 'КОТЛОВАН', from: 0.12 },
  { code: '02', name: 'ФУНДАМЕНТ', from: 0.27 },
  { code: '03', name: 'КАРКАС', from: 0.33 },
  { code: '04', name: 'ФАСАД', from: 0.55 },
  { code: '05', name: 'БЛАГОУСТРІЙ', from: 0.78 },
] as const satisfies readonly Stage[];

export function stageIndexAt(progress: number): number {
  let index = 0;
  STAGES.forEach((stage, i) => {
    if (progress >= stage.from) index = i;
  });
  return index;
}
