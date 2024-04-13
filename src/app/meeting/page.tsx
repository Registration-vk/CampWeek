"use client";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import MeetingForm from "@/feature/MeetingForm";
import { useRouter } from "next/navigation";

import { useCreateEvent } from "@/core/hooks";
import { useCreateSpeaker } from "@/core/hooks/useSpeakers";
import { ROUTES } from "@/core/routes";
import { EventFormData } from "@/core/services/events";
import { useSelector } from "react-redux";
import { getUserId } from "@/core/store/slices/userAuthSlice";

export default function MeetingPage() {
  const userId = useSelector(getUserId);
  const [submittedData, setSubmittedData] = useState<EventFormData>({} as EventFormData);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const { event, isError, isSuccess } = useCreateEvent(submittedData, isQueryEnabled);
  const { speaker, isSuccessful } = useCreateSpeaker(
    { event_id: event?.id || 0, speaker_id: userId! },
    isSuccess,
  );
  const router = useRouter();

  useEffect(() => {
    if (isSuccessful) router.push(ROUTES.application.path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessful]);

  const formSubmittedCallback = (formData: FieldValues) => {
    setSubmittedData({
      name: formData.meetingName,
      link: formData.meetingLink,
      add_link: formData.meetingAddLink,
      date_time: formData.meetingDate,
      time_start: formData.meetingStart,
      time_end: formData.meetingEnd,
      // is_reg_needed: formData.isRegNeeded,
      is_reg_needed: false,
      
      description: formData.meetingDsc,
      add_info: formData.meetingAddInfo,
      notes: formData.meetingNotes,
      roles: formData.meetingTarget.join(";"),
      region_id: Number(formData.meetingLocation),
      creator_id: userId!, // Здесь передаем id авторизованного пользователя
    });
    setIsQueryEnabled(true);
  };

  return isError ? (
    <h5>При создании формы произошла ошибка</h5>
  ) : (
    <MeetingForm formSubmittedCallback={formSubmittedCallback} />
  );
}
