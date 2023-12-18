import { object, string, z } from "zod";

export const IdSchema = object({
  id: string(),
});

export type IdSchema = z.infer<typeof IdSchema>;
