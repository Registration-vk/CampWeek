import React, { ComponentProps, ForwardedRef, useEffect, useRef, useState } from "react";

import clsx from "clsx";

import styles from "./styles.module.scss";

type Props = {
  label?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: string) => void;
  defaultValue?: string;
} & ComponentProps<"input">;

const Input = (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, error, onChange, defaultValue, ...rest } = props;

  return (
    <div className={styles.container}>
      {label && (
        <label className={clsx(styles.label, { [styles.labelActive]: defaultValue != "" })}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(styles.input, {
          [styles.input__error]: !!error,
          [styles.inputCheckbox]: props.type == "checkbox",
          [styles.readOnly]: props.readOnly,
          [styles.inputActive]: defaultValue != "",
        })}
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default React.forwardRef(Input);
