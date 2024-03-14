import styles from "./SmallCard.module.scss";
import { Event } from "@/core/services/events";
import { useUsersAll } from "@/core/hooks";
import { useSpeakersAll } from "@/core/hooks/useSpeakers";
import { getParticipants } from "@/core/utils";
import OnlineIcon from "@/assets/icons/icons/onlineBlue.svg";
import ClockIcon from "@/assets/icons/icons/clock.svg";
import CalendarIcon from "@/assets/icons/icons/calendar.svg";
import CityIcon from "@/assets/icons/icons/cityBlue.svg";
import MicrophoneIcon from "@/assets/icons/icons/microphone.svg";
import ForWhomIcon from "@/assets/icons/icons/forWhome.svg";
import PlusIcon from "@/assets/icons/icons/plus.svg";
import { title } from "process";
import { Icon } from "../Icon/Icon";
import { CSSProperties, memo, useState } from "react";
import { useUserId } from "@/app/context/context";
import { Button } from "../Button/Button";
import clsx from "clsx";
import { regionsId } from "@/feature/MeetingForm/static";
import { useRouter } from "next/navigation";
import { Meeting } from "@/core/store/types/StateSchema";
import Link from "next/link";

export enum EventCardTheme {
  SmallCard = "smallCard",
  BigCard = "bigCard",
}

type SmallCardProps = {
  event: Meeting;
  theme?: EventCardTheme;
  className?: string;
  style?: CSSProperties;
};

export const SmallCard = memo((props: SmallCardProps) => {
  const { event, className, style, theme = EventCardTheme.SmallCard, ...otherProps } = props;
  const [isVisitorQueryEnabled, setIsVisitorQueryEnabled] = useState(false);
  const { isAuth, userId } = useUserId();
  const { speakers } = useSpeakersAll();
  const { data } = useUsersAll();
  const router = useRouter();

  const convertDate = (date: string) => {
    const inputDate = new Date(date);
    const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "long" });
    const formattedDateStr = dateFormatter.format(inputDate);
    return formattedDateStr;
  };

  const registerForEvent = (participant: "visitor") => {
    participant === "visitor" ? setIsVisitorQueryEnabled(true) : setIsVisitorQueryEnabled(false);
  };

  if (theme === EventCardTheme.SmallCard) {
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
            {regionsId[`${event.region_id}`]}
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
          </Button>
          <Button
            variant="clear"
            onClick={() => router.push(`/event/${event.id}`)}
            className={styles.button}
          >
            Подробнее
          </Button>
        </div>
      </section>
    );
  }

  if (theme === EventCardTheme.BigCard) {
    return (
      <section className={styles.bigCard} {...otherProps}>
        {title && <div className={styles.bigCardTitle}>{event.name}</div>}
        <div className={styles.bigCardDescription}>{event.description}</div>
        <div className={styles.bigCardTimeWrapper}>
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
            {regionsId[`${event.region_id}`]}
          </div>
        </div>
        <div className={styles.cardSpickerWrapper_Big}>
          <h3 className={styles.spickerTitle_Big}>
            <Icon Svg={MicrophoneIcon} />
            Спикеры
          </h3>
          <div className={styles.cardText_Big}>
            {(speakers && data && getParticipants(speakers, data, event.id).join(", ")) ||
              "Спикеры отсутствуют"}
          </div>
        </div>
        {event.roles && (
          <div className={styles.cardForWhomWrapper_Big}>
            <h3 className={styles.spickerTitle_Big}>
              <Icon Svg={ForWhomIcon} />
              <span>Для кого</span>
            </h3>
            <div className={styles.cardText_Big}>{event.roles.split(";").join(", ")}</div>
          </div>
        )}
        <div className={styles.spickerAddInfo_Big}>
          <h3 className={styles.spickerTitle_Big}>Страница мероприятия</h3>
          <div className={styles.cardText_Big}>
            <Link href={event.link} className={styles.links} target="_blank">
              {event.link}
            </Link>
          </div>
        </div>
        <div className={styles.spickerAddInfoLink_Big}>
          <h3 className={styles.spickerTitle_Big}>Ссылка на доп.регистрацию</h3>
          <div className={styles.cardText_Big}>
            {event.add_link ? (
              <Link href={event.add_link} className={styles.links} target="_blank">
                {event.add_link}
              </Link>
            ) : (
              "Дополнительная регистрация не требуется"
            )}
          </div>
        </div>
        <div className={styles.spickerAddInfo_Big}>
          <h3 className={styles.spickerTitle_Big}>Дополнительная информация</h3>
          <div className={styles.cardText_Big}>
            {event.add_info ? event.add_info : "Дополнительная информация отсутствует"}
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <Button
            onClick={() => registerForEvent("visitor")}
            disabled={isAuth}
            className={styles.button_Big}
          >
            <Icon Svg={PlusIcon} />
            Участвовать
          </Button>
        </div>
      </section>
    );
  }
});
