import { z } from "zod";
import { CONFIG } from "@/config";

const extractImportUrl = (value: string) => {
  const url = new URL(value);

  if (url.origin !== CONFIG.endfieldBaseUrl) return null;

  const params = url.searchParams;

  const patterns = [
    { token: "u8_token", server: "server" },
    { token: "token", server: "server_id" },
  ];

  for (const pattern of patterns) {
    const token = params.get(pattern.token);
    const server = params.get(pattern.server);

    if (token && server) {
      return { token, server };
    }
  }

  return null;
};

export const importUrlSchema = z.url().transform((value, ctx) => {
  try {
    const result = extractImportUrl(value);

    if (!result) {
      ctx.addIssue({ code: "custom", message: "URL tidak valid" });
      return z.NEVER;
    }

    return result;
  } catch {
    ctx.addIssue({ code: "custom", message: "URL tidak valid" });
    return z.NEVER;
  }
});
