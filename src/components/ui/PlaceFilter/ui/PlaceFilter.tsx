"use client";
import clsx from "clsx";
import { Icon } from "../../Icon/Icon";
import styles from "./PlaceFilter.module.scss";
import {
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  Dispatch,
  SetStateAction,
  Ref,
} from "react";
import closeIcon from "../assets/closefilter.svg";

interface PlaceFilterProps {
  text: string;
  editable?: boolean;
  disabled?: boolean;
  Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
  isEditFilter?: boolean;
  isFilterActive?: boolean;
  onAdd?: (value?: string) => void;
  onDelete?: () => void;
}

const PlaceFilter = (props: PlaceFilterProps) => {
  const { text, editable, disabled, Svg, isEditFilter, isFilterActive, onDelete, onAdd } = props;
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
    if (isFilterActive) {
      setIsActive(false);
    }
  }, [isFilterActive]);

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
      onAdd && onAdd(text);
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
        [styles.button__disabled]: disabled,
      })}
      onClick={onActive}
    >
      {Svg && <Icon Svg={Svg}></Icon>}
      {text}
      {editable && isActive && isEditFilter && (
        <Icon className={styles.closeButton} Svg={closeIcon} onClick={onClose}></Icon>
      )}
    </button>
  );
};

export default memo(PlaceFilter);
