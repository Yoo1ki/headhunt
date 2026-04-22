import { z } from "zod";
import { importUrlSchema } from "@/lib/validators/import-url";
import { headhuntTypes } from "@/data/tracker/headhunt-types";

export const importPayloadSchema = z.object({
  type_id: z.string().refine((val) => headhuntTypes.some((e) => e.id === val), {
    message: "Invalid type",
  }),
  url: importUrlSchema,
  last_id: z.number().optional(),
});
