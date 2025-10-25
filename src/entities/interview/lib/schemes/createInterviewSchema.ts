import { z } from "zod";

export const createInterviewSchema = z.object({
  jobRoleDescription: z
    .string()
    .min(10, "Описание должно быть не менее 10 символов")
    .max(500, "Описание должно быть не более 500 символов"),
  amountOfQuestions: z.number().min(5).max(30),
});

export type CreateInterviewFormData = z.infer<typeof createInterviewSchema>;
