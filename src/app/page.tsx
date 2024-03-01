"use client";
import Link from "next/link";

import { LinkItem } from "@/components/ui/Link/Link";
import NotifyPopup from "@/components/ui/Notification/NotifyPopup";
import { useEventsAll, useUsersAll } from "@/core/hooks";
import { useSpeakersAll } from "@/core/hooks/useSpeakers";
import { ROUTES } from "@/core/routes";
import { getParticipants } from "@/core/utils";

import { useUserId } from "./context/context";

import styles from "./styles.module.scss";
import { MainBanner } from "@/components/ui/MainBanner/MainBanner";
import { Title } from "@/components/ui/Title/Title";
import { SmallCard } from "@/components/ui/SmallCard/SmallCard";

export default function Home() {
  const { events, isError, isLoading } = useEventsAll();
  const { data } = useUsersAll();
  const { speakers } = useSpeakersAll();
  const { isAuth } = useUserId();

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
