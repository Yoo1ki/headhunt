import { z } from 'zod';

export const bannerPayloadSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, 'Min 1 id').max(20, 'Too many id'),
});
