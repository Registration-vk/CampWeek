"use client";
import { useEventsAll } from "@/core/hooks";

import styles from "./styles.module.scss";
import { MainBanner } from "@/components/ui/MainBanner/MainBanner";
import { Title } from "@/components/ui/Title/Title";
import { Carousel } from "@/components/ui/Carousel/Carousel";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";
import { fetchEvents } from "@/core/store/services/fetchEvents";
import { useEffect } from "react";

export default function Home() {
  const { events, isError, isLoading } = useEventsAll();
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchEvents());
  // }, [dispatch]);

  console.log("Список эвентов", events);

  return (
    <div className={styles.Main}>
      <Title />
      <MainBanner />
      <div className={styles.eventsWrapper}>
        <h2 className={styles.title}>Программа</h2>
        {isLoading && <h5>Загрузка данных...</h5>}
        {isError && <h5>При загрузке данных произошла ошибка</h5>}
        {events && events.length > 0 && <Carousel events={events} />}
        {!events ||
          (events.length < 1 && (
            <div className={styles.noEventWrapper}>
              <h3 className={styles.noEventTitle}>Совсем скоро здесь появятся наши мероприятия</h3>
              <p className={styles.noEventText}>А пока вы можете заявить о своём мероприятии</p>
            </div>
          ))}
      </div>
    </div>
  );
}
