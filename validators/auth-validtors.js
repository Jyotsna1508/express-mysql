import z from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "name must be at least 3 characters")
    .max(100, "name must be at most 100 characters"),
  email: z
    .email("invalid email address")
    .max(100, "email must be at most 100 characters")
    .transform((s) => s.toLowerCase()),
  password: z
    .string()
    .trim()
    .min(6, "password must be at least 6 characters")
    .max(100, "password must be at most 100 characters"),
});
