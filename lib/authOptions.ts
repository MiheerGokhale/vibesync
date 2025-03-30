import CredentialsProvider  from "next-auth/providers/credentials";
import { loginSchema } from "./zod/userZod";
import { userDb } from "./db/userDb";
import bcrypt from "bcrypt"


const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "abc@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // ✅ Input validation using Zod
                const parsedInput = loginSchema.safeParse({
                    email: credentials?.email,
                    password: credentials?.password
                });

                if (!parsedInput.success) {
                    console.error("Validation failed:", parsedInput.error.format());
                    throw new Error("Invalid email or password format");
                }

                console.log("auth actions-------------------------");

                try {
                    // ✅ Fetch user from DB
                    const user = await userDb.getUser(credentials?.email as string);
                    if (!user) {
                        throw new Error("User not found"); // Authentication failed
                    }

                    // ✅ Compare password
                    const isMatch = await bcrypt.compare(credentials?.password as string, user.password);
                    if (!isMatch) {
                        throw new Error("Incorrect password"); // Authentication failed
                    }

                    return user; // ✅ Authentication successful
                } catch (error) {
                    console.error("Authentication error:", error.message);
                    throw new Error(error.message || "Authentication failed.");
                }
            },
        }),
    ],
    secret:process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login", // Redirect failed login attempts here
    },
};

export default authOptions;
