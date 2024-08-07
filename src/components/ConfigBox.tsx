import { NumberInput } from "./NumberInput";
import { Config, DataPoints, PlotState } from "../types";
import { Signal } from "@preact/signals";

interface ConfigBoxProps {
  config: Config;
  dataPoints: Signal<DataPoints>;
  plotState: PlotState;
}

export function ConfigBox({ config, dataPoints, plotState }: ConfigBoxProps) {
  const isRunning = plotState.isRunning.value;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        padding: ".5rem",
        border: "1px solid silver",
        borderRadius: ".5rem",
      }}
    >
      <NumberInput
        id="n"
        label="Number of data points to render (N)"
        onChange={(e) => (config.n.value = e.currentTarget.valueAsNumber)}
        value={config.n.value}
        disabled={isRunning}
      />
      <NumberInput
        id="s"
        label="Starting index (S)"
        onChange={(e) => (config.s.value = e.currentTarget.valueAsNumber)}
        value={config.s.value}
        disabled={isRunning}
      />
      <NumberInput
        id="p"
        label="Step size (P)"
        onChange={(e) => (config.p.value = e.currentTarget.valueAsNumber)}
        value={config.p.value}
        disabled={isRunning}
      />
      <NumberInput
        id="t"
        label="Time interval in ms (T)"
        onChange={(e) => (config.t.value = e.currentTarget.valueAsNumber)}
        value={config.t.value}
        disabled={isRunning}
        min={16}
      />
      <NumberInput
        id="r"
        label="Downsampling target ratio (R)"
        onChange={(e) => (config.r.value = e.currentTarget.valueAsNumber)}
        value={config.r.value}
        disabled={isRunning}
      />
      <input
        disabled={dataPoints.value.length === 0}
        type="button"
        value={isRunning ? "Stop" : "Start"}
        onClick={() => (plotState.isRunning.value = !isRunning)}
      />
    </div>
  );
}
