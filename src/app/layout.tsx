import { getLocale } from "next-intl/server";
import { Roboto } from "next/font/google";
import "@/app/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

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
