import { getLocale } from "next-intl/server";
import { Roboto } from "next/font/google";
import { CONFIG } from "@/config";
import "@/app/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

export const metadata = {
  metadataBase: new URL(CONFIG.baseUrl),
  openGraph: {
    images: ["/opengraph-image"],
  },
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
