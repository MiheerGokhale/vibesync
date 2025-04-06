import { z } from "zod";

export const playlistSchema = z.object({
    accountId:z.string(),
    playlistName:z.string(),
    tracks:z.array(z.object({
        id:z.string(),
        name:z.string(),
        image:z.string()
    }))
})

export type PlaylistSchema = z.infer<typeof playlistSchema>;