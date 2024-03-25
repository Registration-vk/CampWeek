import styles from "./SmallCard.module.scss";
import { Event } from "@/core/services/events";
import { useUsersAll } from "@/core/hooks";
import { useSpeakersAll } from "@/core/hooks/useSpeakers";
import { convertDate, getParticipants } from "@/core/utils";
import OnlineIcon from "@/assets/icons/icons/onlineBlue.svg";
import ClockIcon from "@/assets/icons/icons/clock.svg";
import CalendarIcon from "@/assets/icons/icons/calendar.svg";
import CityIcon from "@/assets/icons/icons/cityBlue.svg";
import MicrophoneIcon from "@/assets/icons/icons/microphone.svg";
import ForWhomIcon from "@/assets/icons/icons/forWhome.svg";
import PlusIcon from "@/assets/icons/icons/plus.svg";
import SuccessfulIcon from "@/assets/icons/icons/successful.svg";
import CheckIcon from "@/assets/icons/icons/Check.svg";
import { title } from "process";
import { Icon } from "../Icon/Icon";
import { CSSProperties, memo, useCallback, useEffect, useState } from "react";
import { useUserId } from "@/app/context/context";
import { Button } from "../Button/Button";
import clsx from "clsx";
import { regionsId } from "@/feature/MeetingForm/static";
import { useRouter } from "next/navigation";
import { Meeting } from "@/core/store/types/StateSchema";
import Link from "next/link";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";
import { fetchRegisterAsVisitor } from "@/core/store/services/fetchRegisterAsVisitor";
import { Modal } from "../Modal/Modal";
import { getEventByVisitor } from "@/core/store/slices/eventByVisitorIdSlice";
import { useSelector } from "react-redux";

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
  const { eventsByVisitorId } = useSelector(getEventByVisitor);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const dispatch = useAppDispatch();
  const [isVisitorQueryEnabled, setIsVisitorQueryEnabled] = useState(false);
  const { isAuth, userId } = useUserId();
  const { speakers } = useSpeakersAll();
  const { data } = useUsersAll();
  const router = useRouter();

  useEffect(() => {
    setIsVisitor(eventsByVisitorId.some((value) => value.id === event.id));
  }, [event.id, eventsByVisitorId]);

  const onOpenSuccessRegister = () => {};

  const registerAsVisitor = async () => {
    console.log("нажал кнопку");
    if (event.id && userId) {
      const result = await dispatch(
        fetchRegisterAsVisitor({ event_id: event.id, visitor_id: userId }),
      );
      console.log("запрос");
      if (result.meta.requestStatus === "fulfilled") {
        console.log("успешно");
        setIsVisitor(true);
        setIsOpenSuccessModal(true);
      }
    }
  };

  if (theme === EventCardTheme.SmallCard) {
    return (
      <section className={clsx(styles.card, {}, [className])} style={style} {...otherProps}>
        <Modal isOpen={isOpenSuccessModal} onClose={() => setIsOpenSuccessModal(false)}>
          <div>
            <Icon Svg={SuccessfulIcon} />
            <h3>Вы успешно зарегистрировались на мероприятие</h3>
            <div>
              Мы напомним об этом мероприятии перед началом, а также будем держать в курсе, если
              что‑то поменяется.
            </div>
          </div>
        </Modal>
        <div className={styles.cardTitleWrapper}>
          {title && <div className={styles.cardTitle}>{event.name}</div>}
          {isVisitor && (
            <div className={styles.cardTitleIcon}>
              <Icon Svg={CheckIcon} />
            </div>
          )}
        </div>

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
          <Button onClick={registerAsVisitor} disabled={!isAuth} className={styles.button}>
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
        {isVisitor && (
          <div className={styles.visitorWrapper}>
            <Icon Svg={CheckIcon} />
            <div className={styles.visitorText}>Участвую</div>
          </div>
        )}
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
            onClick={registerAsVisitor}
            disabled={isAuth}
            className={styles.button_Big}
            style={{ width: "600px" }}
          >
            <Icon Svg={PlusIcon} />
            Участвовать
          </Button>
        </div>
      </section>
    );
  }
});
