"use client";
import { useUserId } from "@/app/context/context";

import { InputField, MultipleSelectField, SingleSelectField } from "@/components/ui/form";
import { withForm, WrappedComponentProps } from "@/core/hoc";
import { useUserById } from "@/core/hooks";

import { schema } from "./schema";
import { optionsMeetings, optionsRoles } from "./static";
import styles from "./styles.module.scss";

export function Index(props: WrappedComponentProps) {
  const { userId } = useUserId();
  const { data: user, isLoading, isError } = useUserById(Number(userId), `/api/v1/user/${userId}`);

  return (
    <>
      {isLoading && <h5>Загрузка данных...</h5>}
      {isError && <h5>При загрузке данных произошла ошибка</h5>}
      {user && (
        <>
          <InputField
            control={props.control}
            inputName={"first_name"}
            inputLabel={"Ваше имя"}
            defaultValue={user.first_name}
            className={styles.inputName}
          />
          <InputField
            control={props.control}
            inputName={"last_name"}
            inputLabel={"Фамилия"}
            defaultValue={user.last_name}
            className={styles.inputLastName}
          />
          <SingleSelectField
            control={props.control}
            className={styles.inputSex}
            selectName={"sex"}
            selectLabel={"Пол"}
            selectOptions={[
              { value: "0", label: "Не указан" },
              { value: "1", label: "Женский" },
              { value: "2", label: "Мужской" },
            ]}
            defaultValue={user.sex.toString()}
          />
          <InputField
            control={props.control}
            inputName={"bdate"}
            inputLabel={"Дата рождения"}
            inputType={"date"}
            defaultValue={user.bdate}
            className={styles.inputBdate}
          />
          <InputField
            control={props.control}
            inputName={"city"}
            inputLabel={"Город проживания"}
            defaultValue={user.city}
            className={styles.inputCity}
          />
          {/* <MultipleSelectField
            control={props.control}
            selectName={"roles"}
            selectLabel={"Роль в мероприятии"}
            selectOptions={optionsRoles}
            defaultValue={["counselor", "designer"]}
          />
          <MultipleSelectField
            control={props.control}
            selectName={"meetings"}
            selectLabel={"Регион мероприятия"}
            selectOptions={optionsMeetings}
            defaultValue={["game"]}
          /> */}
        </>
      )}
    </>
  );
}

export default withForm(Index, {
  resolver: schema,
  buttonText: "Сохранить",
});
