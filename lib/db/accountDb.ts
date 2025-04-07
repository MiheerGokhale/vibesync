import { prisma } from "../Prisma-Config";
import { AccountSchema } from "../zod/accountZod";

export const accountDb = {
    createAccount: async ({ id, userId, emailAddress, provider, image, access_token, refresh_token, token_type }: AccountSchema) => {
        return await prisma.spotifyAccount.upsert({
            where: { id },  // Check if the account exists by ID
            update: { 
                userId,
                emailAddress,
                provider,
                image,
                token_type,
                access_token,
                refresh_token
            },  // Update existing account
            create: { 
                id,
                userId,
                emailAddress,
                provider,
                image,
                token_type,
                access_token,
                refresh_token
            }  // Create new account if it doesn't exist
        });
    },
    getAccounts: async (userId:string) => {   
        return await prisma.spotifyAccount.findMany({
            where:{
                userId
            }
        })
    },
    getAccount: async (userId:string,emailAddress:string) => {

        console.log(userId,emailAddress);
        return await prisma.spotifyAccount.findFirst({
            where:{
                userId,
                emailAddress
            }
        })
    },
    getPlaylists: async (accoundId:string) => {
        return await prisma.spotifyAccount.findUnique({
            where:{
                id:accoundId
            },
            select:{
                playlists:{
                    orderBy:{
                        date:"desc"
                    },
                    select:{
                        id:true,
                        name:true,
                        date:true,
                        publicId:true,
                        tracks:{
                            select:{
                                name:true,
                                uri:true,
                                image:true
                            }
                        }
                    }
                }
            }
        });
    }
}