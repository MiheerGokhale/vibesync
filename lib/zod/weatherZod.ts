import { z } from "zod";

export const wheatherSchema = z.object({
    temperature:z.string(),
      condition:z.string(),
      description:z.string(),
      country:z.string(),
      city:z.string(),
      windSpeed:z.string(),
      tempFeeling:z.string(),
      weatherStatus:z.string(),
})

export type WheatherSchema = z.infer<typeof wheatherSchema>;