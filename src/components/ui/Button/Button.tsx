import { ComponentProps } from "react";

import clsx from "clsx";

import styles from "./styles.module.scss";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "desktop"
  | "mobile"
  | "desktopIconLeft"
  | "desktopIconRight"
  | "clear";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  fluid?: boolean;
  variant?: ButtonVariant;
  className?: string;
} & ComponentProps<"button">;

export const Button = (props: Props) => {
  const { variant = "primary", fluid, disabled, loading, children, className, ...rest } = props;
  return (
    <button
      className={clsx(styles.Button, [className], {
        [styles.Button__primary]: variant === "primary",
        [styles.Button__desktop]: variant === "desktop",
        [styles.Button__mobile]: variant === "mobile",
        // [styles.Button__desktopIconLeft]: variant === "desktopIconLeft",
        // [styles.Button__desktopIconRight]: variant === "desktopIconRight",
        [styles.Button__clear]: variant === "clear",
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
