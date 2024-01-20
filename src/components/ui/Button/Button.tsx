import { ComponentProps } from "react";

import clsx from "clsx";

import styles from "./styles.module.scss";

type ButtonVariant = "primary" | "secondary";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  fluid?: boolean;
  variant?: ButtonVariant;
} & ComponentProps<"button">;

export const Button = (props: Props) => {
  const { variant = "primary", fluid, disabled, loading, children, ...rest } = props;
  return (
    <button
      className={clsx(styles.Button, {
        [styles.Button__primary]: variant === "primary",
        [styles.Button__loading]: loading,
        [styles.Button__fluid]: fluid,
        [styles.Button_disabled]: disabled,
      })}
      type="button"
      disabled={disabled}
      {...rest}
    >
      {!loading && children}
    </button>
  );
};
