import { prisma } from "../Prisma-Config";
import { PlaylistSchema } from "../zod/spotifyZod";

export const playlistDb = {
    savePlaylist : async ({accountId,playlistName,tracks}:PlaylistSchema) => {
        return await prisma.playlist.create({
            data:{
                accountId,
                name:playlistName,
                date:new Date(),
                tracks: {
                    create: tracks.map(track => ({
                        image: track.image,
                        name: track.name,
                        uri: track.id
                    }))
                }
            }
        })
    }
}