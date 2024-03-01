"use client";

import dayjs from "dayjs";
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
      {isLoading && <h5>Загрузка данных...</h5>}
      {isError && <h5>При загрузке данных произошла ошибка</h5>}
      <Title />
      <MainBanner />
      {events && events.length ? (
        events
          .sort((a, b) => Number(new Date(a.date_time)) - Number(new Date(b.date_time))) // Уточнить порядок сортировки
          .map((event) => (
            <Link href={`${ROUTES.application.event.path}/${event.id}`} key={event.id}>
              <SmallCard
                // subtitle={`${dayjs(event.date_time).format("DD.MM.YYYY")} в ${event.time_start}`}
                title={event.name}
                fullName={
                  (speakers && data && getParticipants(speakers, data, event.id).join(", ")) ||
                  "Спикеры отсутствуют"
                }
                typeEvent={event.roles.split(";").join(", ")}
                description={event.description}
                date={`${dayjs(event.date_time).format("DD.MM.YYYY")}`}
                timeStart={`${event.time_start}`}
                timeEnd={`${event.end}`}
              />
            </Link>
          ))
      ) : (
        <h3>Мероприятий не запланировано</h3>
      )}
      <LinkItem link={"/meeting"} isDisabled={!isAuth}>
        Добавить мероприятие
        <NotifyPopup>Требуется авторизация</NotifyPopup>
      </LinkItem>
    </div>
  );
}
