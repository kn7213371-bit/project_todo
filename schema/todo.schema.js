import z from "zod";

export const todoSchema=z.object({
    title :z.string(),
    body:z.string(),
    done :z.boolean().default(false),
});

