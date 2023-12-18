import { object, string, z } from "zod";

export const CreatePostSchema = object({
  title: string(),
  description: string(),
});

export type CreatePostSchema = z.infer<typeof CreatePostSchema>;
