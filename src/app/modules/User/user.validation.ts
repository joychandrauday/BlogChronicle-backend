// user.validation.ts
import { z } from "zod";

// Define Zod schema for user validation
export const userValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.string().default("user"),
    isBlocked: z.boolean().default(false),
});

// Define type for validated user data
export type IUserValidation = z.infer<typeof userValidationSchema>;

// Validation function
export const validateUser = (data: unknown) => {
    return userValidationSchema.safeParse(data);
};
