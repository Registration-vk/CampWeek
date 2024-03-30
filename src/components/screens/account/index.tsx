"use client";

import { useCallback, useState } from "react";
import { FieldValues } from "react-hook-form";

import UserForm from "@/feature/UserForm";

import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal/Modal";
import { useUpdate } from "@/core/hooks";
import { UserFormData } from "@/core/services/users";
import { useSelector } from "react-redux";
import { getUserId } from "@/core/store/slices/userAuthSlice";

export default function AccountScreen() {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const userId = useSelector(getUserId);
  const mutation = useUpdate<UserFormData>(`/api/v1/user/${userId}`, { userId });

  const formSubmittedCallback = async (formData: UserFormData) => {
    if (userId !== undefined && userId !== null) {
      await mutation.mutateAsync(formData).then((value) => {
        if (value.status === 200) {
          setIsAuthModal(true);
        }
      });
    } else {
      throw Error("Пользователь не может быть изменен");
    }
  };

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  if (mutation.isPending) {
    return <div>Идет загрузка...</div>;
  }

  return (
    <>
      <Modal isOpen={isAuthModal} onClose={onCloseModal}>
        <div>Изменения в вашем профиле были сохранены</div>
        <Button onClick={onCloseModal} variant="desktop">
          Закрыть
        </Button>
      </Modal>
      <UserForm
        formSubmittedCallback={formSubmittedCallback as unknown as (data: FieldValues) => void}
      />
    </>
  );
}
