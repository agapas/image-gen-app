import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  disabled?: boolean;
  label?: string;
  options?: Option[];
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
  disabled,
  label = "Select an option:",
  options = [],
  value = options[0]?.value,
  onChange,
}: Props) => {
  return (
    <div className="select-with-label">
      <label htmlFor="select-element">{label}</label>
      <select
        id="select-element"
        disabled={disabled}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
