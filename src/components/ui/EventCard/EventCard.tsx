"use client";
import dayjs from "dayjs";

import { useEventById } from "@/core/hooks";

import styles from "./styles.module.scss";

type Props = {
  eventId: number;
};
export const EventCard = (props: Props) => {
  const { data } = useEventById(props.eventId);
  console.log(data);

  return (
    data && (
      <table className={styles.card}>
        <tbody>
          <tr>
            <td>Название мероприятия</td>
            <td>{data.name}</td>
          </tr>
          <tr>
            <td>Ссылка на мероприятие</td>
            <td>{data.link}</td>
          </tr>
          <tr>
            <td>Дата мероприятия</td>
            <td>{dayjs(data.date_time).format("DD.MM.YYYY")}</td>
          </tr>
          <tr>
            <td>Время проведения</td>
            <td>{`с ${data.time_start} по ${data.time_end}`}</td>
          </tr>
          <tr>
            <td>Ссылка на доп.регистрацию</td>
            <td>
              {data.add_link.length ? data.add_link : "Дополнительная регистрация не требуется"}
            </td>
          </tr>
          <tr>
            <td>Описание мероприятия</td>
            <td>{data.description.length ? data.description : "Не указано"}</td>
          </tr>
          <tr>
            <td>Дополнительная информация</td>
            <td>{data.add_info.length ? data.add_info : "Не указана"}</td>
          </tr>
          <tr>
            <td>Спикеры</td>
            <td>Иванов Иван Иванович</td>
          </tr>
          <tr>
            <td>Город проведения</td>
            <td>Москва</td>
          </tr>
        </tbody>
      </table>
    )
  );
};
