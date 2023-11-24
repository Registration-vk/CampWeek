"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { EventCard } from "@/components/ui/EventCard/EventCard";
import { ROUTES } from "@/core/routes";

import styles from "./styles.module.scss";

export default function EventPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <h2>Мероприятие</h2>
      <EventCard eventId={Number(params.id)} />
      <Button onClick={() => router.push(ROUTES.application.registration.path)}>
        Зарегистрироваться на мероприятие
      </Button>
    </div>
  );
}
