import { type JSX } from "preact";
import Papa from "papaparse";
import { DataPoints } from "../types";

type FileLoadFun = (data: DataPoints) => void;

interface CsvFileInputProps {
  onFileLoad: FileLoadFun;
}

const CsvFileInput = ({ onFileLoad }: CsvFileInputProps) => {
  const handleFileChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          onFileLoad(result.data as DataPoints);
        },
        header: false,
        dynamicTyping: true,
        skipEmptyLines: true,
      });
    } else {
      throw new Error("No file selected");
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};
export default CsvFileInput;
