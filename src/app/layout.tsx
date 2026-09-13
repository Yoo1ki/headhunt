import { getLocale } from 'next-intl/server';
import { Roboto } from 'next/font/google';
import { CONFIG } from '@/config';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/app/globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.baseUrl),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html lang={locale}>
      <body className={`${roboto.variable} lg:flex lg:h-screen lg:flex-col`}>
        {children}
      </body>
      {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
    </html>
  );
}
