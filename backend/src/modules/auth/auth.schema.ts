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

export const loginSchema = z.strictObject({
    nickname: z.string().min(3, "Nickname must be at least 3 characters long").max(15, "Nickname must be at most 15 characters long"),
    password: z.string().min(12, "Password must be at least 12 characters long"),
});

export const updateProfileSchema = z.strictObject({
    nickname: z.string().min(3, "Nickname must be at least 3 characters long").max(15, "Nickname must be at most 15 characters long").optional(),
    native_language_id: z.number().int().positive().optional(),
    foreign_language_id: z.number().int().positive().optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
}).refine((data) => {
    if (data.native_language_id === undefined || data.foreign_language_id === undefined) {
        return true;
    }

    return data.native_language_id !== data.foreign_language_id;
}, {
    message: 'Native and foreign languages must be different',
    path: ['foreign_language_id'],
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
