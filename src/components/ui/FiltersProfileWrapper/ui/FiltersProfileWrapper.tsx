"use client";
import OnlineIcon from "../assets/online.svg";
import PenIcon from "../assets/pen.svg";
import CityIcon from "../assets/city.svg";
import { PlaceFilter } from "../../PlaceFilter/ui/PlaceFilter";
import { Icon } from "../../Icon/Icon";
import styles from "./FiltersProfileWrapper.module.scss";
import { Button } from "../../Button/Button";
import { useCallback, useState } from "react";

const cities = ["Онлайн", "Москва", "Санкт-Петербург", "Рязань", "Псков", "Оренбург"];

function createInitialCities() {
  const storedCities = localStorage.getItem("cities");
  return storedCities ? JSON.parse(storedCities) : [];
}

export const FiltersProfileWrapper = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [storedCities, setStoredCities] = useState<string[]>(createInitialCities);

  console.log(storedCities);

  const onEdit = () => {
    setIsEditable(true);
  };

  const onCancel = () => {
    setIsEditable(false);
    setStoredCities(createInitialCities);
  };

  const onAddCity = useCallback(
    (city: string) => {
      const cityIndex = storedCities.indexOf(city);

      if (cityIndex === -1) {
        setStoredCities((prev) => [...prev, city]);
      }
    },
    [storedCities],
  );

  const onDeleteCity = useCallback(
    (city: string) => {
      const cityIndex = storedCities.indexOf(city);
      if (cityIndex >= 0) {
        setStoredCities((prev) => prev.filter((c) => c !== city));
      }
    },
    [storedCities],
  );

  const onSave = (cities: string[]) => {
    setIsEditable(false);
    localStorage.setItem("cities", JSON.stringify(cities));
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
              onAdd={() => onAddCity(city)}
              onDelete={() => onDeleteCity(city)}
              Svg={city === "Онлайн" ? OnlineIcon : CityIcon}
            />
          );
        })}
      </div>

      {isEditable && (
        <div className={styles.buttonWrapper}>
          <Button className={styles.saveButton} onClick={() => onSave(storedCities)}>
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