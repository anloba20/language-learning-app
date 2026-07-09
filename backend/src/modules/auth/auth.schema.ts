import * as z from "zod";

export const registerSchema = z.strictObject({
    nickname: z.string().min(3, "Nickname must be at least 3 characters long").max(15, "Nickname must be at most 15 characters long"),
    password: z.string().min(12, "Password must be at least 12 characters long"),
    confirm_password: z.string().min(12, "Password must be at least 12 characters long"),
    email: z.email("Invalid email address"),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords must match',
  path: ['confirm_password'],
});



export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = {
    nickname: string;
    password: string;
}