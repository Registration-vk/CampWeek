import { ComponentProps } from "react";

import clsx from "clsx";

import styles from "./styles.module.scss";

export type ButtonVariant = "vk" | "desktop" | "mobile" | "burger" | "clear";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  fluid?: boolean;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
} & ComponentProps<"button">;

export const Button = (props: Props) => {
  const {
    variant = "desktop",
    fluid,
    disabled,
    loading,
    children,
    className,
    onClick,
    ...rest
  } = props;
  return (
    <button
      className={clsx(
        styles.Button,
        {
          [styles.Button__vk]: variant === "vk",
          [styles.Button__desktop]: variant === "desktop",
          [styles.Button__mobile]: variant === "mobile",
          [styles.Button__burger]: variant === "burger",
          // [styles.Button__desktopIconLeft]: variant === "desktopIconLeft",
          // [styles.Button__desktopIconRight]: variant === "desktopIconRight",
          [styles.Button__clear]: variant === "clear",
          [styles.Button__loading]: loading,
          [styles.Button__fluid]: fluid,
          [styles.Button_disabled]: disabled,
        },
        [className],
      )}
      type="button"
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {!loading && children}
    </button>
  );
};
