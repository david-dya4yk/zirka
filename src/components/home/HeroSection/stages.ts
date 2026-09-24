export const FRAME_COUNT = 40;

export function frameSrc(index: number): string {
  return `/frames/${String(index).padStart(3, '0')}.jpg`;
}

export interface Stage {
  code: string;
  name: string;
  /** Scroll progress (0–1) at which this stage becomes active. */
  from: number;
}

export const STAGES = [
  { code: '00', name: 'ДІЛЯНКА', from: 0 },
  { code: '01', name: 'КОТЛОВАН', from: 0.08 },
  { code: '02', name: 'ФУНДАМЕНТ', from: 0.16 },
  { code: '03', name: 'КАРКАС', from: 0.3 },
  { code: '04', name: 'ФАСАД', from: 0.58 },
  { code: '05', name: 'БЛАГОУСТРІЙ', from: 0.82 },
] as const satisfies readonly Stage[];

export function stageIndexAt(progress: number): number {
  let index = 0;
  STAGES.forEach((stage, i) => {
    if (progress >= stage.from) index = i;
  });
  return index;
}
