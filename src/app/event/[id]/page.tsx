"use client";
import { useState } from "react";

import { useUserId } from "@/app/context/context";

import { Button } from "@/components/ui";
import { EventCard } from "@/components/ui/EventCard/EventCard";
import { useCreateSpeaker } from "@/core/hooks/useSpeakers";
import { useCreateVisitor } from "@/core/hooks/useVisitors";

import styles from "./styles.module.scss";

export default function EventPage({ params }: { params: { id: string } }) {
  const [isSpeakerQueryEnabled, setIsSpeakerQueryEnabled] = useState(false);
  const [isVisitorQueryEnabled, setIsVisitorQueryEnabled] = useState(false);

  const { isAuth, userId } = useUserId();
  console.log("userId speaker", userId);

  const { isError } = useCreateSpeaker(
    { speaker_id: userId!, event_id: Number(params.id) }, // Здесь передаем id авторизованного пользователя
    isSpeakerQueryEnabled,
  );

  const { visitor } = useCreateVisitor(
    { visitor_id: userId!, event_id: Number(params.id) }, // Здесь передаем id авторизованного пользователя
    isVisitorQueryEnabled,
  );

  const registerForEvent = (participant: "speaker" | "visitor") => {
    participant === "speaker" ? setIsSpeakerQueryEnabled(true) : setIsVisitorQueryEnabled(true);
    window.location.reload();
  };

  return isError ? (
    <h5>При регистрации произошла ошибка</h5>
  ) : (
    <div className={styles.main}>
      <h2>Мероприятие</h2>
      <EventCard eventId={Number(params.id)} />
      <div className={styles.main__buttons}>
        <Button onClick={() => registerForEvent("speaker")} disabled={!isAuth}>
          Стать спикером
        </Button>
        <Button onClick={() => registerForEvent("visitor")} disabled={!isAuth}>
          Стать участником
        </Button>
      </div>
    </div>
  );
}
