import { z } from "zod";

export const accountSchema = z.object({
  id:z.string(),
  userId:z.string(),
  emailAddress:z.string().email(),
  provider:z.string(),
  image:z.string(),
  access_token:z.string(),
  token_type:z.string(),
  refresh_token:z.string()
})

export type AccountSchema = z.infer<typeof accountSchema>;