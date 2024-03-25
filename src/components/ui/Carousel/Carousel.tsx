"use client";
import { useState } from "react";
import cls from "./Carousel.module.scss";
import { SmallCard } from "../SmallCard/SmallCard";
import { Event } from "@/core/services/events";
import { Button } from "../Button/Button";
import ArrowIcon from "@/assets/icons/icons/arrow.svg";
import { Icon } from "../Icon/Icon";

interface CarouselProps {
  events: Event[];
}

export const Carousel = (props: CarouselProps) => {
  const { events } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < events.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={cls.carousel}>
      <div className={cls.cardsContainer}>
        {events
          .sort((a, b) => Number(new Date(a.date_time)) - Number(new Date(b.date_time))) // Уточнить порядок сортировки
          .map((event, index) => (
            <SmallCard
              event={event}
              key={`${event.id} - carouselItems`}
              className={`${cls.cardItem} ${index === currentIndex ? cls.active : ""}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            />
          ))}
      </div>
      <Button
        className={`${cls.arrow} ${cls.prev}`}
        onClick={handlePrev}
        variant="clear"
        style={{ visibility: currentIndex > 0 ? "visible" : "hidden" }}
      >
        <Icon Svg={ArrowIcon} />
      </Button>
      <Button
        className={`${cls.arrow} ${cls.next}`}
        onClick={handleNext}
        variant="clear"
        style={{
          visibility: currentIndex < events.length - 2 ? "visible" : "hidden",
        }}
      >
        <Icon Svg={ArrowIcon} />
      </Button>
    </div>
  );
};
