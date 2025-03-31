import { prisma } from "../Prisma-Config";
import { AccountSchema } from "../zod/accountZod";

export const accountDb = {
    createAccount: async ({id,userId,emailAddress,provider,image,access_token,refresh_token,token_type}:AccountSchema) => {
        return await prisma.spotifyAccount.create({
            data:{
                id,
                userId,
                emailAddress,
                provider,
                image,
                token_type,
                access_token,
                refresh_token
            }
        })
    }
}