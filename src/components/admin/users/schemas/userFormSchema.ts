
import * as z from "zod";
import { UserRole } from "@/types";

// Schema di validazione per il form utente
export const userFormSchema = z.object({
  name: z.string().min(2, { message: "Il nome deve avere almeno 2 caratteri" }),
  email: z.string().email({ message: "Email non valida" }),
  role: z.enum(["user", "shop", "collaborator", "admin"], {
    message: "Seleziona un ruolo valido",
  }),
  password: z.string().optional(),
  fiscalCode: z.string().optional(),
  vatNumber: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
