"use client";

import { FieldValues } from "react-hook-form";

import { useUserId } from "@/app/context/context";
import UserForm from "@/feature/UserForm";

import { useUpdate } from "@/core/hooks";
import { UserFormData } from "@/core/services/users";

export default function AccountScreen() {
  const { userId } = useUserId();
  const mutation = useUpdate<UserFormData>(`/api/v1/user/${userId}`, {userId})

  const formSubmittedCallback = (formData: UserFormData) => {
    if (userId !== undefined && userId !== null) {
      mutation.mutate(formData)
    } else {
      throw Error('Пользователь не может быть изменен')
    }
  };

  return <UserForm formSubmittedCallback={formSubmittedCallback as unknown as (data: FieldValues) => void} />;
}
