import * as z from "zod";
export const FormSchema = z.object({
  name: z.string().min(1, "Bill name is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  dueDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Due date must be in the future",
  }),
  payee: z.string().min(1, "Payee information is required"),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
