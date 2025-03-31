import { prisma } from "../Prisma-Config";
import { SignUpInput, UserAccountSchema} from "../zod/userZod";

export const userDb = {
    createUser: async ({firstName,lastName,email,password}:SignUpInput) => {
        return await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password
            }
        });
    },
    getUser: async (email:string) => {
        return await prisma.user.findUnique({
            where:{
                email
            }
        });
    },
    createUserAccount: async ({id,firstName,lastName,email,password,image,provider,access_token,refresh_token,token_type}:UserAccountSchema) => {
        return await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password,
                accounts:{
                    create: {
                        id,
                        provider,
                        access_token,
                        refresh_token,
                        token_type,
                        image,
                        emailAddress:email
                    }
                }
            }
        
        })
    }
}