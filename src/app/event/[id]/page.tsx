"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { EventCard } from "@/components/ui/EventCard/EventCard";
import { useCreateSpeaker } from "@/core/hooks/useSpeakers";

import styles from "./styles.module.scss";

export default function EventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const { isError } = useCreateSpeaker(
    { speaker_id: 1, event_id: Number(params.id) }, // Здесь передаем id авторизованного пользователя
    isQueryEnabled,
  );

  const registerForEvent = () => {
    setIsQueryEnabled(true);
    window.location.reload();
  };

  return isError ? (
    <h5>При регистрации произошла ошибка</h5>
  ) : (
    <div className={styles.main}>
      <h2>Мероприятие</h2>
      <EventCard eventId={Number(params.id)} />
      <div className={styles.main__buttons}>
        <Button onClick={registerForEvent}>Стать спикером</Button>
        <Button onClick={registerForEvent}>Стать участником</Button>
      </div>
    </div>
  );
}
