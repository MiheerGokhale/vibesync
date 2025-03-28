import CredentialsProvider  from "next-auth/providers/credentials";
import { prisma } from "./Prisma-Config";

const authOptions = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "email", type: "text", placeholder: "abc@gmail.com" },
            password: { label: "password", type: "password" }
        },
        async authorize(credentials, req) {
            const user = await prisma.user.findUnique({
                where: { email: credentials?.email }
            });

            if (credentials?.password === user?.password) {
                return user;
            }
            return null;
        }
    },)
];

export default authOptions;
