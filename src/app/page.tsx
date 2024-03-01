"use client";
import { useEventsAll } from "@/core/hooks";

import styles from "./styles.module.scss";
import { MainBanner } from "@/components/ui/MainBanner/MainBanner";
import { Title } from "@/components/ui/Title/Title";
import { SmallCard } from "@/components/ui/SmallCard/SmallCard";

export default function Home() {
  const { events, isError, isLoading } = useEventsAll();

  console.log("Список эвентов", events);

  return (
    <div className={styles.Main}>
      <Title />
      <MainBanner />
      {isLoading && <h5>Загрузка данных...</h5>}
      {isError && <h5>При загрузке данных произошла ошибка</h5>}
      <h2 className={styles.title}>Программа</h2>
      <div className={styles.eventsWrapper}>
        {events && events.length ? (
          events
            .sort((a, b) => Number(new Date(a.date_time)) - Number(new Date(b.date_time))) // Уточнить порядок сортировки
            .map((event) => <SmallCard event={event} key={event.id} />)
        ) : (
          <h3>Мероприятий не запланировано</h3>
        )}
      </div>
    </div>
  );
}
