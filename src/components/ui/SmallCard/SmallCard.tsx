import styles from "./SmallCard.module.scss";
import { Event } from "@/core/services/events";
import { useUsersAll } from "@/core/hooks";
import { useSpeakersAll } from "@/core/hooks/useSpeakers";
import { getParticipants } from "@/core/utils";
import OnlineIcon from "@/assets/icons/icons/onlineBlue.svg";
import ClockIcon from "@/assets/icons/icons/clock.svg";
import CalendarIcon from "@/assets/icons/icons/calendar.svg";
import CityIcon from "@/assets/icons/icons/cityBlue.svg";
import PlusIcon from "@/assets/icons/icons/plus.svg";
import { title } from "process";
import { Icon } from "../Icon/Icon";
import { CSSProperties, memo, useState } from "react";
import { useUserId } from "@/app/context/context";
import { Button } from "../Button/Button";
import NotifyPopup from "../Notification/NotifyPopup";
import clsx from "clsx";

type SmallCardProps = {
  event: Event;
  className?: string;
  style?: CSSProperties;
};

export const SmallCard = memo((props: SmallCardProps) => {
  const { event, className, style, ...otherProps } = props;
  const [isVisitorQueryEnabled, setIsVisitorQueryEnabled] = useState(false);
  const { isAuth, userId } = useUserId();
  const { speakers } = useSpeakersAll();
  const { data } = useUsersAll();

  const convertDate = (date: string) => {
    const inputDate = new Date(date);
    const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "long" });
    const formattedDateStr = dateFormatter.format(inputDate);
    return formattedDateStr;
  };

  const registerForEvent = (participant: "visitor") => {
    participant === "visitor" ? setIsVisitorQueryEnabled(true) : setIsVisitorQueryEnabled(false);
  };

  return (
    <section className={clsx(styles.card, {}, [className])} style={style} {...otherProps}>
      {title && <div className={styles.cardTitle}>{event.name}</div>}
      <div className={styles.cardDescription}>{event.description}</div>
      <div className={styles.cardTimeWrapper}>
        <div>
          <Icon Svg={CalendarIcon} />
          {convertDate(event.date_time)}
        </div>
        <div>
          <Icon Svg={ClockIcon} />
          {`${event.time_start} - ${event.time_end}`}
        </div>
        <div>
          <Icon Svg={OnlineIcon} />
          Онлайн
        </div>
      </div>
      <div className={styles.cardSpickerWrapper}>
        <h3 className={styles.spickerTitle}>Спикеры</h3>
        <div className={styles.cardText}>
          {(speakers && data && getParticipants(speakers, data, event.id).join(", ")) ||
            "Спикеры отсутствуют"}
        </div>
      </div>
      {event.roles && (
        <div className={styles.cardForWhomWrapper}>
          <h3 className={styles.spickerTitle}>Для кого</h3>
          <div className={styles.cardText}>{event.roles.split(";").join(", ")}</div>
        </div>
      )}
      <div className={styles.buttonWrapper}>
        <Button
          onClick={() => registerForEvent("visitor")}
          disabled={isAuth}
          className={styles.button}
        >
          <Icon Svg={PlusIcon} />
          Участвовать
          <NotifyPopup>Требуется авторизация</NotifyPopup>
        </Button>
        <Button
          variant="clear"
          onClick={() => registerForEvent("visitor")}
          className={styles.button}
        >
          Подробнее
        </Button>
      </div>
    </section>
  );
});
