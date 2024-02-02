"use client";
import clsx from "clsx";
import { Icon } from "../../Icon/Icon";
import styles from "./PlaceFilter.module.scss";
import { MouseEvent, ReactNode, memo, useEffect, useState } from "react";
import closeIcon from "../assets/closefilter.svg";

export type PlaceFilterTheme = "active" | "disable";

export interface PlaceFilterProps {
  text: string;
  editable?: boolean;
  disabled?: boolean;
  //   Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
  children?: ReactNode;
  onClick: () => void;
}

export const PlaceFilter = memo((props: PlaceFilterProps) => {
  const { text, editable, disabled, children, onClick } = props;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const storedCity = localStorage.getItem(`${text}`);
    if (storedCity) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [editable, text]);

  const onActive = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(styles.button)) {
      console.log(event.target);
      setIsActive(true);
      onClick();
    }
  };

  const onClose = (event: MouseEvent<SVGSVGElement>) => {
    setIsActive(false);
    event.stopPropagation();
    localStorage.removeItem(`${text}`);
  };

  if (!editable && !localStorage.getItem(`${text}`)) {
    return null;
  }

  return (
    <button
      className={clsx(styles.button, {
        [styles.button__active]: isActive,
        [styles.button__disabled]: disabled,
      })}
      onClick={onActive}
    >
      {children}
      {editable && isActive && (
        <Icon className={styles.closeButton} Svg={closeIcon} onClick={onClose}></Icon>
      )}
    </button>
  );
});
