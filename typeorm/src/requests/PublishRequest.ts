import { boolean, object, string, z } from "zod";

export const PublishRequest = object({
  status: boolean(),
});

export type PublishRequest = z.infer<typeof PublishRequest>;
