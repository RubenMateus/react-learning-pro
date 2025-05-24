import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty("Nome obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Telefone inválido"),
  company: z.object({
    name: z.string().nonempty("Nome da empresa obrigatório"),
  }),
});

export type User = z.infer<typeof UserSchema>;
