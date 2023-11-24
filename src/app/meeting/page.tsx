"use client";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

import MeetingForm from "@/feature/MeetingForm";
import { useRouter } from "next/navigation";

import { useCreateEvent } from "@/core/hooks";
import { ROUTES } from "@/core/routes";
import { EventFormData } from "@/core/services/events";

export default function MeetingPage() {
  const [submittedData, setSubmittedData] = useState<EventFormData>({} as EventFormData);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const { isError } = useCreateEvent(submittedData, isQueryEnabled);
  const router = useRouter();

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
      region_id: 1,
      creator_id: 1,
    });
    console.log(formData);
    setIsQueryEnabled(true);
    router.push(ROUTES.application.path);
  };

  return isError ? (
    <h5>При создании формы произошла ошибка</h5>
  ) : (
    <MeetingForm formSubmittedCallback={formSubmittedCallback} />
  );
}
