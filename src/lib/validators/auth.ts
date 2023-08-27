import { z } from "zod";

export const loginValidator = z.object({
  username: z.string().min(1, "Username must be at least 1 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export type LoginValidatorType = z.infer<typeof loginValidator>;

export const registerValidator = z.object({
  username: z.string().min(1, "Username must be at least 1 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().optional(),
});
export type RegisterValidatorType = z.infer<typeof registerValidator>;
