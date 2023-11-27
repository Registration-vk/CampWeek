"use client";

import { FieldValues } from "react-hook-form";

import UserForm from "@/feature/UserForm";
import { $api } from "@/core/axios";
import { useUserId } from "@/app/context/context";

export default function AccountScreen() {
  const {userId} = useUserId()
  const formSubmittedCallback = (formData: FieldValues) => {
    
    // eslint-disable-next-line no-console
    console.log(formData);

    $api.patch(`/api/v1/user/${userId}/`, formData )
  };

  return <UserForm formSubmittedCallback={formSubmittedCallback} />;
}
