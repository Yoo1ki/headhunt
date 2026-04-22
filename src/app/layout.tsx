import { getLocale } from "next-intl/server";
import { Roboto } from "next/font/google";
import "@/app/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

export const metadata = {
  title:
    "Headhunt - The Best Arknight: Endfield Tools for Tracking Gacha Records",
  description:
    "Free tool designed to help you track your Headhunting pity records in Arknights: Endfield.",
  keywords: [
    "Arknights Endfield",
    "Headhunting",
    "Headhunt",
    "issue records",
    "gacha tracker",
    "pity records",
    "pity counter",
    "check pity",
    "tools",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </head>
      <body className={`${roboto.variable} lg:flex lg:flex-col lg:h-screen`}>
        {children}
      </body>
    </html>
  );
}
