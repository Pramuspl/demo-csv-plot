import "./app.css";
import CsvFileInput from "./components/CSVInput";
import { DataPoints } from "./types";
import { ConfigBox } from "./components/ConfigBox";
import { createAppState } from "./lib/appState";
import { Plot } from "./components/Plot";

const { dataPoints, config, plotState } = createAppState();

export function App() {
  const handleFileLoad = (csvData: DataPoints) => {
    dataPoints.value = csvData;
  };

  return (
    <>
      <div>
        <h1>CSV Data Plot in Preact</h1>
        <ConfigBox
          config={config}
          dataPoints={dataPoints}
          plotState={plotState}
        />
        <CsvFileInput onFileLoad={handleFileLoad} />
        <Plot config={config} plotState={plotState} />
      </div>
    </>
  );
}
