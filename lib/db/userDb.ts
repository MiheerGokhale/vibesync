import { prisma } from "../Prisma-Config";
import { SignUpInput} from "../zod/userZod";

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
    }
}