"use client";

import { default as SelectNative } from "react-select";

import styles from "./styles.module.scss";

export type SelectOption = { value: string; label: string };

type Props = {
  label?: string;
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  description?: string;
  value?: any;
  options: SelectOption[];
  onChange: any;
};

export default function SelectField(props: Props) {
  const {
    label,
    placeholder,
    isMulti = false,
    isSearchable = true,
    description,
    value,
    options,
    onChange,
  } = props;

  return (
    <div>
      {label && <label>{label}</label>}
      <SelectNative
        isMulti={isMulti}
        isSearchable={isSearchable}
        className={styles.select}
        options={options}
        placeholder={placeholder}
        value={props.options.find((c) => c.value === value)}
        onChange={(e: any) =>
          e.value ? onChange(e.value) : onChange(e.map((c: any) => c.value))
        }
      />
      {description && <div>{description}</div>}
    </div>
  );
}