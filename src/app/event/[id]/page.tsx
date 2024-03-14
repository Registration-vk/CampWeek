"use client";
import { useEffect } from "react";
import cls from "./styles.module.scss";
import Arrow from "@/assets/icons/icons/arrowBack.svg";
import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";
import { useSelector } from "react-redux";
import { getEventById } from "@/core/store/slices/eventByIdSlice";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";
import { fetchEventById } from "@/core/store/services/fetchEventById";
import { EventCardTheme, SmallCard } from "@/components/ui/SmallCard/SmallCard";
import { Icon } from "@/components/ui/Icon/Icon";
import Link from "next/link";

export default function EventPage({ params }: { params: { id: string } }) {
  const { event, isLoading, error } = useSelector(getEventById);
  const dispatch = useAppDispatch();

  // const [isSpeakerQueryEnabled, setIsSpeakerQueryEnabled] = useState(false);
  // const [isVisitorQueryEnabled, setIsVisitorQueryEnabled] = useState(false);

  // const { isAuth, userId } = useUserId();
  // console.log("userId speaker", userId);

  // const { isError } = useCreateSpeaker(
  //   { speaker_id: userId!, event_id: Number(params.id) }, // Здесь передаем id авторизованного пользователя
  //   isSpeakerQueryEnabled,
  // );

  // const { visitor } = useCreateVisitor(
  //   { visitor_id: userId!, event_id: Number(params.id) }, // Здесь передаем id авторизованного пользователя
  //   isVisitorQueryEnabled,
  // );

  // const registerForEvent = (participant: "speaker" | "visitor") => {
  //   participant === "speaker" ? setIsSpeakerQueryEnabled(true) : setIsVisitorQueryEnabled(true);
  // };

  useEffect(() => {
    dispatch(fetchEventById(Number(params.id)));
    console.log(event);
  }, [dispatch, params.id]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PageWrapper>
      <div className={cls.backToArrowWrapper}>
        <Link href={"/meetings"}>
          <Icon Svg={Arrow} className={cls.backToArrow} />
        </Link>
        <h4 className={cls.backToHeader}>Мероприятия</h4>
      </div>
      {/* <EventCard eventId={Number(params.id)} /> */}
      {event && <SmallCard event={event} theme={EventCardTheme.BigCard} />}
    </PageWrapper>
  );
}
