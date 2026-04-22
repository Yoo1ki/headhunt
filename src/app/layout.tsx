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
  title: "Headhunt.cc — Arknights: Endfield Pity Tracker (For Real)",
  description:
    "Free tool to track your gacha pity in Arknights: Endfield. Check pull history and pity count easily.",
  keywords: [
    "Arknights Endfield",
    "Arknights Endfield pity",
    "Arknights Endfield gacha",
    "Arknights Endfield tracker",
    "Endfield pity tracker",
    "Endfield gacha tracker",
    "headhunting",
    "headhunt tracker",
    "headhunting pity",
    "headhunting records",
    "gacha tracker",
    "pity tracker",
    "pity counter",
    "pity checker",
    "check pity",
    "track pity",
    "gacha history",
    "pull history",
    "summon tracker",
    "free gacha tool",
    "gacha tools",
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
      <body className={`${roboto.variable} lg:flex lg:flex-col lg:h-screen`}>
        {children}
      </body>
    </html>
  );
}
