"use client";
import dayjs from "dayjs";
import Link from "next/link";

import { Aside, Banner } from "@/components/ui";
import { LinkItem } from "@/components/ui/Link/Link";
import { useEventsAll } from "@/core/hooks";
import { ROUTES } from "@/core/routes";

import styles from "./styles.module.scss";

export default function Home() {
  const { data, isError, isLoading } = useEventsAll();
  console.log(document.cookie);
  return (
    <>
      <main className={styles.Main}>
        {isLoading && <h5>Загрузка данных...</h5>}
        {isError && <h5>При загрузке данных произошла ошибка</h5>}
        {data &&
          data
            .sort((a, b) => Number(new Date(b.date_time)) - Number(new Date(a.date_time))) // Уточнить порядок сортировки
            .map((event) => (
              <Link href={`${ROUTES.application.event.path}/${event.id}`} key={event.id}>
                <Banner
                  subtitle={`${dayjs(event.date_time).format("DD.MM.YYYY")} в ${event.time_start}`}
                  title={event.name}
                  fullName={"Иванов Иван Иванович"}
                  typeEvent={"Начинающие вожатые"}
                >
                  <h3>{event.description}</h3>
                </Banner>
              </Link>
            ))}
        <LinkItem link={"/meeting"}>Добавить мероприятие</LinkItem>
      </main>
      <Aside />
    </>
  );
}
