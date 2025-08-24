import { z } from "zod";

export const zodBookSchema = z.object({
    title: z.string().trim(),
    author: z.string().trim(),
    genre: z.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ]),
    isbn: z.string().trim(),
    description: z.string().trim().default(""),
    copies: z
        .number()
        .int("Copies must be an integer")
        .min(0, "Copies must be a positive number"),
    available: z.boolean().default(true),
});
