import { AppState } from "../lib/appState";

interface AggregatesProps extends Omit<AppState, "dataPoints" | "config"> {}

export function Aggregates({ plotState }: AggregatesProps) {
  return (
    <>
      {plotState.plotData.value.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div style={{ color: "green" }}>Min: {plotState.min.value}</div>
            <div style={{ color: "red" }}>Max: {plotState.max.value}</div>
          </div>
          <div>
            <div style={{ color: "blue" }}>Average: {plotState.avg.value}</div>
            <div style={{ color: "purple" }}>
              Variance: {plotState.variance.value}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
