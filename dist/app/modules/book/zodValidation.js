"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodBookSchema = void 0;
const zod_1 = require("zod");
exports.zodBookSchema = zod_1.z.object({
    title: zod_1.z.string().trim(),
    author: zod_1.z.string().trim(),
    genre: zod_1.z.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ]),
    isbn: zod_1.z.string().trim(),
    description: zod_1.z.string().trim().default(""),
    copies: zod_1.z
        .number()
        .int("Copies must be an integer")
        .min(0, "Copies must be a positive number"),
    available: zod_1.z.boolean().default(true),
});
