import { ComponentProps, memo } from "react";

import clsx from "clsx";

import styles from "./Button.module.scss";

export type ButtonVariant = "vk" | "desktop" | "mobile" | "burger" | "clear" | "loadMore";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
} & ComponentProps<"button">;

export const Button = memo((props: Props) => {
  const {
    variant = "desktop",
    disabled,
    loading,
    children,
    className,
    onClick,
    ...otherProps
  } = props;
  return (
    <button
      className={clsx(styles.Button, className, {
        [styles.Button__vk]: variant === "vk",
        [styles.Button__desktop]: variant === "desktop",
        [styles.Button__mobile]: variant === "mobile",
        [styles.Button__burger]: variant === "burger",
        [styles.Button__clear]: variant === "clear",
        [styles.Button__loadMore]: variant === "loadMore",
        [styles.Button__loading]: loading,
        [styles.Button_disabled]: disabled,
      })}
      type="button"
      disabled={disabled}
      onClick={onClick}
      {...otherProps}
    >
      {!loading && children}
    </button>
  );
});
