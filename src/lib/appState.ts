import { computed, Signal, signal } from "@preact/signals";
import { DataPoints, Config, PlotState, PlotData } from "../types";
import { average, downsample, variance } from "./utils";

export interface AppState {
  dataPoints: Signal<DataPoints>;
  config: Config;
  plotState: PlotState;
}

export function createAppState(): AppState {
  const dataPoints = signal<DataPoints>([]);

  const config: Config = {
    n: signal<number>(100),
    s: signal<number>(0),
    p: signal<number>(10),
    t: signal<number>(500),
    r: signal<number>(1000),
  };

  const plotState: PlotState = {
    downsampledData: computed((): PlotData[] =>
      downsample(dataPoints.value, config.r.value)
    ),
    plotData: signal<PlotData[]>([]),
    curStep: signal<number>(0),
    isRunning: signal<boolean>(false),
    min: computed((): number =>
      Math.min(...plotState.plotData.value.map((v) => v.y))
    ),
    max: computed((): number =>
      Math.max(...plotState.plotData.value.map((v) => v.y))
    ),
    avg: computed((): number =>
      average(plotState.plotData.value.map((v) => v.y))
    ),
    variance: computed((): number =>
      variance(plotState.plotData.value.map((v) => v.y))
    ),
  };

  return { dataPoints, config, plotState };
}
