"use client";

import { ElementType } from "react";
import { Control, FieldErrors, FieldValues, UseFormRegister, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui";

import classes from "./styles.module.scss";

export interface WrappedComponentProps<TFieldsValues extends FieldValues = FieldValues> {
  control: Control<TFieldsValues>;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<TFieldsValues>;
}

export interface WithFormProps {
  formSubmittedCallback: (data: FieldValues) => void;
}

export interface WithFormSettingsProps {
  resolver: z.infer<z.Schema<any, any>>;
  buttonText?: string;
}

const withForm =
  <FormFields extends FieldValues = FieldValues>(
    WrappedComponent: ElementType,
    { resolver, buttonText = "Отправить" }: WithFormSettingsProps,
  ) =>
  // eslint-disable-next-line react/display-name
  (props: WithFormProps) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      register,
    } = useForm<FormFields>({
      resolver: zodResolver(resolver),
    });

    const onSubmit = async (data: FieldValues) => {
      props.formSubmittedCallback(data);
    };

    return (
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <WrappedComponent errors={errors} control={control} register={register} />
        <div className={classes.button}>
          <Button type={"submit"}>{buttonText}</Button>
        </div>
      </form>
    );
  };

export default withForm;
