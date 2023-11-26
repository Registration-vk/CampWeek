"use client";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import MeetingForm from "@/feature/MeetingForm";
import { useRouter } from "next/navigation";

import { useCreateEvent } from "@/core/hooks";
import { useCreateSpeaker } from "@/core/hooks/useSpeakers";
import { ROUTES } from "@/core/routes";
import { EventFormData } from "@/core/services/events";

import { useUserId } from "../context/context";

export default function MeetingPage() {
  const [submittedData, setSubmittedData] = useState<EventFormData>({} as EventFormData);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const { userId } = useUserId();
  console.log("userId meeting", userId);
  const { event, isError, isSuccess } = useCreateEvent(submittedData, isQueryEnabled);
  const { speaker, isSuccessful } = useCreateSpeaker(
    { event_id: event?.id || 0, speaker_id: userId! },
    isSuccess,
  );
  const router = useRouter();

  console.log("created event", event, isSuccess);
  console.log("created speaker", speaker);

  useEffect(() => {
    if (isSuccessful) router.push(ROUTES.application.path);
  }, [isSuccessful]);

  const formSubmittedCallback = (formData: FieldValues) => {
    setSubmittedData({
      name: formData.meetingName,
      link: formData.meetingLink,
      add_link: formData.meetingAddLink,
      date_time: formData.meetingDate,
      time_start: formData.meetingStart,
      time_end: formData.meetingEnd,
      is_reg_needed: formData.isRegNeeded,
      approved: true,
      description: formData.meetingDsc,
      add_info: formData.meetingAddInfo,
      notes: formData.meetingNotes,
      roles: formData.meetingTarget.join(";"),
      region_id: Number(formData.meetingLocation),
      creator_id: userId!, // Здесь передаем id авторизованного пользователя
    });
    console.log(formData);
    setIsQueryEnabled(true);
  };

  return isError ? (
    <h5>При создании формы произошла ошибка</h5>
  ) : (
    <MeetingForm formSubmittedCallback={formSubmittedCallback} />
  );
}
