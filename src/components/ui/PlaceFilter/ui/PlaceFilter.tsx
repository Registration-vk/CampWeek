"use client";
import clsx from "clsx";
import { Icon } from "../../Icon/Icon";
import styles from "./PlaceFilter.module.scss";
import { MouseEvent, memo, useCallback, useEffect, useState } from "react";
import closeIcon from "../assets/closefilter.svg";

export type PlaceFilterTheme = "active" | "disable";

export interface PlaceFilterProps {
  text: string;
  editable?: boolean;
  disabled?: boolean;
  Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
  onAdd?: () => void;
  onDelete?: () => void;
}

export const PlaceFilter = memo((props: PlaceFilterProps) => {
  const { text, editable, disabled, Svg, onDelete, onAdd } = props;
  const [isActive, setIsActive] = useState(false);

  const isCityInStorage = useCallback(() => {
    const storedCities = localStorage.getItem("cities");

    if (storedCities) {
      const parsedStoredCities = JSON.parse(storedCities);
      return parsedStoredCities.some((city: string) => city === text);
    } else {
      return false;
    }
  }, [text]);

  useEffect(() => {
    if (isCityInStorage()) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [editable, isCityInStorage]);

  const onActive = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(styles.button)) {
      setIsActive(true);
      onAdd && onAdd();
    }
  };

  const onClose = (event: MouseEvent<SVGSVGElement>) => {
    setIsActive(false);
    event.stopPropagation();
    onDelete && onDelete();
  };

  if (!editable && !isCityInStorage()) {
    return null;
  }

  return (
    <button
      className={clsx(styles.button, {
        [styles.button__active]: isActive,
        [styles.button__editable]: !editable,
      })}
      onClick={onActive}
    >
      {Svg && <Icon Svg={Svg}></Icon>}
      {text}
      {editable && isActive && (
        <Icon className={styles.closeButton} Svg={closeIcon} onClick={onClose}></Icon>
      )}
    </button>
  );
});
