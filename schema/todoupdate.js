import z from "zod"
export const todoUpdateSchema = z.object({
    title: z.string().optional(),
    body: z.string().optional(),
});