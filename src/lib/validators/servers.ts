import { z } from "zod";

export const createServerValidator = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  image: z.string().min(1, {
    message: "Image is required.",
  }),
});
export type CreateServerValidatorType = z.infer<typeof createServerValidator>;
