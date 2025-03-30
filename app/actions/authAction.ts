"use server"

import { userDb} from "@/lib/db/userDb"
import { signUpSchema,SignUpInput } from "@/lib/zod/userZod"
import bcrypt from "bcrypt";

export async function signUpUser(input:SignUpInput){
    // validate input using zod
    const parsedInput = signUpSchema.safeParse(input);

    if (!parsedInput.success) {
        throw new Error(JSON.stringify(parsedInput.error.format(),null,2));
    }

    const { firstName,lastName,email,password } = parsedInput.data;
    const hashedPassword = await bcrypt.hash(password,10);

    return await userDb.createUser({firstName,lastName,email,password:hashedPassword});
}