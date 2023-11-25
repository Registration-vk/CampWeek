"use client";
import { regions } from "@/feature/MeetingForm/static";
import dayjs from "dayjs";
import Link from "next/link";

import { useEventById, useUsersAll } from "@/core/hooks";
import { useSpeakersAll } from "@/core/hooks/useSpeakers";
import { useVisitorsAll } from "@/core/hooks/useVisitors";

import styles from "./styles.module.scss";

type Props = {
  eventId: number;
};
export const EventCard = (props: Props) => {
  const { event } = useEventById(props.eventId);
  const { speakers } = useSpeakersAll();
  const { visitors } = useVisitorsAll();
  const { data } = useUsersAll();

  console.log(data);

  const matchedLocation = regions.find((region) => Number(region.value) === event?.region_id);

  const speakersIds = speakers
    ?.filter((speaker) => speaker.event_id === props.eventId)
    .map((v) => v.speaker_id);

  const matchedSpeakers = data?.flatMap((user) => {
    if (speakersIds?.includes(user.id)) {
      return `${user.first_name} ${user.last_name}`;
    }
    return [];
  });

  console.log(matchedSpeakers);

  return (
    event && (
      <table className={styles.card}>
        <tbody>
          <tr>
            <td>Название мероприятия</td>
            <td>{event.name}</td>
          </tr>
          <tr>
            <td>Целевая аудитория</td>
            <td>{event.roles.split(";").join(", ")}</td>
          </tr>
          <tr>
            <td>Ссылка на мероприятие</td>
            <td>
              <Link href={event.link}>{event.link}</Link>
            </td>
          </tr>
          <tr>
            <td>Дата мероприятия</td>
            <td>{dayjs(event.date_time).format("DD.MM.YYYY")}</td>
          </tr>
          <tr>
            <td>Время проведения</td>
            <td>{`с ${event.time_start} по ${event.time_end}`}</td>
          </tr>
          <tr>
            <td>Ссылка на доп.регистрацию</td>
            <td>
              {event.add_link.length ? event.add_link : "Дополнительная регистрация не требуется"}
            </td>
          </tr>
          <tr>
            <td>Описание мероприятия</td>
            <td>{event.description.length ? event.description : "Не указано"}</td>
          </tr>
          <tr>
            <td>Дополнительная информация</td>
            <td>{event.add_info.length ? event.add_info : "Не указана"}</td>
          </tr>
          {matchedSpeakers && (
            <tr>
              <td>Спикеры</td>
              <td>{matchedSpeakers.join(", ")}</td>
            </tr>
          )}

          <tr>
            <td>Участники</td>
            <td>Иван Иванов</td>
          </tr>

          <tr>
            <td>Город проведения</td>
            <td>{matchedLocation?.label}</td>
          </tr>
        </tbody>
      </table>
    )
  );
};
