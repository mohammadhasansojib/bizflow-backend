import * as z from "zod";


export const UserRegistrationSchema = z.object({
    username: z.string()
    .min(3, "username must be at least 3 characters")
    .max(15, "username must be at most 15 characters"),

    email: z.email("invalid email address"),

    password: z.string()
    .min(8, "password must be at least 8 characters")
    .max(30, "password can be at most 30 characters"),
});