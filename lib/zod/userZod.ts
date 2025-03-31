import { z } from "zod";

export const signUpSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export const userAccountSchema = z.object({
    id:z.string(),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    image:z.string(),
    provider:z.string(),
    access_token:z.string(),
    refresh_token:z.string(),
    token_type:z.string()
})

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LogInInput = z.infer<typeof loginSchema>;
export type UserAccountSchema = z.infer<typeof userAccountSchema>;