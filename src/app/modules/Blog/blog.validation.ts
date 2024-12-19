import { z } from "zod";

// Updated blog validation schema
export const blogValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    isPublished: z.boolean().default(true),
    author: z.string().nonempty("Author is required"), // Ensure author is a non-empty string
});

// Define type for validated blog data
export type IBlogValidation = z.infer<typeof blogValidationSchema>;

// Validation function
export const validateBlog = (data: unknown) => {
    return blogValidationSchema.safeParse(data);
};
