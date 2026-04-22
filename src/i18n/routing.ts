import { CONFIG } from "@/config";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: CONFIG.locales.filter((e) => e.enable).map((e) => e.id),
  defaultLocale: "en",
  localePrefix: "always",
});
