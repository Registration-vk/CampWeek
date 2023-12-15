"use client";

import { useCallback, useState } from "react";
import { FieldValues } from "react-hook-form";

import { useUserId } from "@/app/context/context";
import UserForm from "@/feature/UserForm";

import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal/Modal";
import { useUpdate } from "@/core/hooks";
import { UserFormData } from "@/core/services/users";

export default function AccountScreen() {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { userId } = useUserId();
  const mutation = useUpdate<UserFormData>(`/api/v1/user/${userId}`, {userId})

  const formSubmittedCallback = async (formData: UserFormData) => {
    if (userId !== undefined && userId !== null) {
      await mutation.mutateAsync(formData).then((value) => {
        if (value.status === 200) {
          setIsAuthModal(true)
        }
      })     
    } else {
      throw Error('Пользователь не может быть изменен')
    }
  };

  const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);
  
  if (mutation.isPending) {
    return <div>Идет загрузка...</div>
  }
  
  return (
    <div>
      <Modal isOpen={isAuthModal} onClose={onCloseModal}>
        <div>Пользователь изменен</div>
        <Button onClick={onCloseModal}>ОК</Button>
      </Modal>
      <UserForm formSubmittedCallback={formSubmittedCallback as unknown as (data: FieldValues) => void} />
    </div>
  )
}
