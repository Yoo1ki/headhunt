import { z } from 'zod';
import { TRACKER_CONFIG } from '@/config/tracker';

export const extractImportCredential = (value: string) => {
  const url = new URL(value);

  if (url.origin !== TRACKER_CONFIG.api.baseUrl) return null;

  const params = url.searchParams;
  const token = params.get('token') ?? params.get('u8_token');
  const server = params.get('server_id') ?? params.get('server');

  return token && server ? { token, server } : null;
};

export const importUrlSchema = z.url().transform((value, ctx) => {
  try {
    const result = extractImportCredential(value);

    if (!result) {
      ctx.addIssue({ code: 'custom', message: 'Invalid URL' });
      return z.NEVER;
    }

    return result;
  } catch {
    ctx.addIssue({ code: 'custom', message: 'Invalid URL' });
    return z.NEVER;
  }
});
