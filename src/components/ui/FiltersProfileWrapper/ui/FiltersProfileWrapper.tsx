"use client";
import OnlineIcon from "../assets/online.svg";
import PenIcon from "../assets/pen.svg";
import CityIcon from "../assets/city.svg";
import { PlaceFilter } from "../../PlaceFilter/ui/PlaceFilter";
import { Icon } from "../../Icon/Icon";
import styles from "./FiltersProfileWrapper.module.scss";
import { Button } from "../../Button/Button";
import { useState } from "react";

const cities = ["Онлайн", "Москва", "Санкт-Петербург", "Рязань", "Псков", "Оренбург"];

export const FiltersProfileWrapper = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const onEdit = () => {
    setIsEditable(true);
  };

  const onCancel = () => {
    setIsEditable(false);
    setSelectedCities([]);
  };

  const onAddCity = (city: string) => {
    const cityIndex = selectedCities.indexOf(city);

    if (cityIndex === -1) {
      setSelectedCities((prev) => [...prev, city]);
    }
  };

  const onSave = (cities: string[]) => {
    onCancel();

    cities.map((city) => {
      localStorage.setItem(`${city}`, city);
    });
    setSelectedCities([]);
  };

  return (
    <section className={styles.filtersSection}>
      <div className={styles.titleWrapper}>
        <h5 className={styles.title}>Интересующие конференции</h5>
        {!isEditable && (
          <Button variant="clear" className={styles.penIcon} onClick={onEdit}>
            <Icon Svg={PenIcon} />
          </Button>
        )}
      </div>
      <div className={styles.filtersWrapper}>
        {cities.map((city, index) => {
          return (
            <PlaceFilter
              text={city}
              key={`${city}-${index}`}
              editable={isEditable}
              onClick={() => onAddCity(city)}
            >
              <Icon Svg={city === "Онлайн" ? OnlineIcon : CityIcon}></Icon>
              {city}
            </PlaceFilter>
          );
        })}
      </div>

      {isEditable && (
        <div className={styles.buttonWrapper}>
          <Button className={styles.saveButton} onClick={() => onSave(selectedCities)}>
            Сохранить
          </Button>
          <Button className={styles.cancelButton} onClick={onCancel}>
            Отмена
          </Button>
        </div>
      )}
    </section>
  );
};
