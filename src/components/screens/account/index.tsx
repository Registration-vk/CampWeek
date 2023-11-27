"use client";

import { FieldValues } from "react-hook-form";

import { useUserId } from "@/app/context/context";
import UserForm from "@/feature/UserForm";

import { $api } from "@/core/axios";

export default function AccountScreen() {
  const {userId} = useUserId()

  const formSubmittedCallback = async (formData: FieldValues) => {
    
    // eslint-disable-next-line no-console
    console.log(formData);
    await $api.patch(`/api/v1/user/${userId}/`, formData )
    window.location.reload();
  };

  return <UserForm formSubmittedCallback={formSubmittedCallback} />;
}
