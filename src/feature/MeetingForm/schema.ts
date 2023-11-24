import * as z from "zod";

const schema = z.object({
  meetingName: z.string({
    required_error: "Обязательное поле *"
  }).min(1,{ message: "Укажите название *" }),
  meetingLink: z.string().url(),
  meetingDate: z.coerce.date({
    errorMap: () => ({ message: "Укажите дату *" })
  }),
  meetingStart: z.coerce.string({
    errorMap: () => ({ message: "Укажите время *" })
  }).min(5),
  meetingEnd: z.coerce.string({
    errorMap: () => ({ message: "Укажите время *" })
  }).min(5),
  isRegNeeded: z.boolean().optional(),
  meetingAddLink: z.string().url({ message: "Укажите корректную ссылку *" }).optional().or(z.literal('')),
  meetingDsc: z.string(),
  meetingAddInfo: z.string(),
  // meetingSpeakers: z.array(z.string(), {
  //   required_error: "Обязательное поле *"
  // }),
  meetingSpeakerInfo: z.string(),
  // meetingTarget: z.array(z.string(), {
  //   required_error: "Обязательное поле *"
  // }),
  meetingNotes: z.string(),
})
.refine((data) => (data.meetingEnd.slice(0,2) >= data.meetingStart.slice(0,2)), {
  message: 'Время окончания должно быть позже времени начала',
  path: ["meetingEnd"]
});

export { schema };

