import { type JSX } from "preact";

export function NumberInput({
  id,
  disabled = false,
  label,
  min,
  value,
  onChange,
}: {
  id: string;
  disabled?: boolean;
  label: string;
  min?: number;
  value: number;
  onChange: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: ".5rem",
      }}
    >
      <label htmlFor={id} style={{ marginRight: ".5rem" }}>
        {label}
      </label>
      <input
        type="number"
        min={min ?? 0}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
      ></input>
    </div>
  );
}
