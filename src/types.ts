import { Signal } from "@preact/signals";

export interface Config {
  n: Signal<number>;
  s: Signal<number>;
  p: Signal<number>;
  t: Signal<number>;
  r: Signal<number>;
}

export interface PlotState {
  curStep: Signal<number>;
  downsampledData: Signal<PlotData[]>;

  plotData: Signal<PlotData[]>;
  isRunning: Signal<boolean>;
  min: Signal<number>;
  max: Signal<number>;
  avg: Signal<number>;
  variance: Signal<number>;
}

export interface PlotData {
  x: number;
  y: number;
}

export type DataPoints = [number, number][];
