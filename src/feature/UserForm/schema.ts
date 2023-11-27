import * as z from "zod";

const schema = z.object({
  sex: z.enum(["1", "2"], {
    errorMap: () => ({ message: "Укажите ваш пол *" }),
  }),
  first_name: z
    .string()
    .min(2, {
      message: "Обязательное поле *",
    })
    .max(50, {
      message: "Имя превысило допустимое количество знаков *",
    }),
  last_name: z
    .string()
    .min(1, {
      message: "Обязательное поле *",
    })
    .max(50, {
      message: "Имя превысило допустимое количество знаков *",
    }),
  bdate: z.coerce
    .date()
    .min(new Date("1923-10-01"), { message: "Укажите корректную дату *" })
    .max(new Date("2009-10-01"), { message: "Укажите корректную дату *" }),
  city: z.string().min(1, {
    message: "Обязательное поле *",
  }),
  // roles: z.array(z.string()).nonempty({
  //   message: "Выберите роль *",
  // }),
  // meetings: z.array(z.string()).nonempty({
  //   message: "Выберите интересующие мероприятия *",
  // }),
});

export { schema };
