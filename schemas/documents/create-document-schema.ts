import { z } from "zod";

export const createDocumentSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
});

export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;
