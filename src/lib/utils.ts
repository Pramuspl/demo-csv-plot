import { LTTB } from "downsample";

export const average = (arr: number[]): number =>
  arr.reduce((sum, val) => sum + val, 0) / arr.length;

export const variance = (arr: number[]): number => {
  const mean = average(arr);
  return arr.reduce((sum, val) => sum + (val - mean) ** 2, 0) / arr.length;
};

export function downsample(data: [number, number][], factor: number) {
  const downsampledData = LTTB(data, factor) as [number, number][];

  return downsampledData.map((point) => ({
    x: point[0],
    y: point[1],
  }));
}
