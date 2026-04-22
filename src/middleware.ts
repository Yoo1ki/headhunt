import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  },
});

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  // runtime: "experimental-edge",
};
