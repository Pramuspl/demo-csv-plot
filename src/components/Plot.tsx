import { useSignalEffect } from "@preact/signals";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { AppState } from "../lib/appState";
import { PlotData } from "../types";
import { Aggregates } from "./Aggregates";

let interval: NodeJS.Timeout;

interface PlotProps extends Omit<AppState, "dataPoints"> {}

export function Plot({ plotState, config }: PlotProps) {
  function resetPlot() {
    plotState.plotData.value = [
      ...plotState.downsampledData.value.slice(
        config.s.value,
        config.s.value + config.n.value
      ),
    ];
    plotState.curStep.value = config.s.value;
  }

  useSignalEffect(() => {
    if (plotState.isRunning.value === true) {
      resetPlot();
      // on an interval defined by T, update the plot removing last P points and adding consecutive P points
      interval = setInterval(() => {
        plotState.plotData.value = [
          ...plotState.plotData.value.slice(config.p.value),
          ...plotState.downsampledData.value.slice(
            plotState.curStep.value,
            plotState.curStep.value + config.p.value
          ),
        ];
        plotState.curStep.value += config.p.value;

        // stop updating when the data points are exhausted
        if (plotState.curStep.value > plotState.downsampledData.value.length) {
          clearInterval(interval);
        }
      }, config.t.value);
    } else if (plotState.isRunning.value === false) {
      if (interval) {
        clearInterval(interval);
      }
      resetPlot();
    }
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <LineChart width={400} height={400} data={plotState.plotData.value}>
        <Line
          dot={false}
          dataKey={(v: PlotData) => v.y}
          stroke="teal"
          isAnimationActive={false}
        />
        <XAxis dataKey={(v: PlotData) => v.x} />
        <YAxis dataKey={(v: PlotData) => v.y} />
      </LineChart>
      <Aggregates plotState={plotState} />
    </div>
  );
}
