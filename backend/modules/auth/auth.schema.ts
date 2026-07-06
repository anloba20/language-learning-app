import * as z from "zod";

export const registerSchema = z.strictObject({
    nickname: z.string().min(3, "Nickname must be at least 3 characters long").max(15, "Nickname must be at most 15 characters long"),
    password: z.string().min(12, "Password must be at least 12 characters long"),
    email: z.email("Invalid email address"),
});

export const loginSchema = z.strictObject({
    nickname: z.string().min(3, "Nickname must be at least 3 characters long").max(15, "Nickname must be at most 15 characters long"),
    password: z.string().min(12, "Password must be at least 12 characters long"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;