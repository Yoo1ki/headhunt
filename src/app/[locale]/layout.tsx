import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { ImportStatus } from '@/components/shared/ImportStatus';
import { NotificationStatus } from '@/components/shared/NotificationStatus';
import { MigrationNotice } from '@/components/shared/MigrationNotice';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { CONFIG } from '@/config';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('HomePage');
  const localeUrls = Object.fromEntries(
    routing.locales.map((item) => [item, `${CONFIG.baseUrl}/${item}`])
  );

  const metadata: Metadata = {
    title: {
      default: `${CONFIG.appName} — ${t('title')}`,
      template: `%s — ${CONFIG.appName}`,
    },
    description: t('description'),
    metadataBase: new URL(CONFIG.baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: localeUrls,
    },
    openGraph: {
      type: 'website',
      siteName: CONFIG.appName,
      title: `${CONFIG.appName} — ${t('title')}`,
      description: t('description'),
      url: `/${locale}`,
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${CONFIG.appName} — ${t('title')}`,
      description: t('description'),
    },
    keywords: [
      'Arknights Endfield',
      'Arknights Endfield pity',
      'Arknights Endfield gacha',
      'Arknights Endfield tracker',
      'endfield pity tracker',
      'endfield gacha tracker',
      'endfield headhunt tracker',
      'headhunting',
      'headhunt tracker',
      'headhunting pity',
      'headhunting records',
      'gacha tracker',
      'pity tracker',
      'pity counter',
      'pity checker',
      'check pity',
      'track pity',
      'gacha history',
      'pull history',
      'summon tracker',
      'free gacha tool',
      'gacha tools',
    ],
    other: {
      IE_RM_OFF: 'true',
    },
  };

  return metadata;
}

export default async function HomeLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <NextIntlClientProvider>
      <Header className="fixed top-0 z-50 h-14 lg:relative" />
      <div className="relative mt-14 lg:mt-0 lg:flex-1">
        <div
          id="scroll-container"
          className="absolute inset-0 flex flex-col lg:overflow-y-auto"
        >
          <div className="flex-1 lg:container lg:mx-auto lg:flex lg:gap-4 lg:px-4">
            <div className="hidden w-64 lg:block">
              <Sidebar />
            </div>
            <div className="mt-4 flex flex-1 flex-col gap-4 lg:mb-4">
              <main className="container mx-auto flex flex-1 flex-col px-4 lg:px-0">
                {children}
              </main>
              <Footer />
            </div>
            <ImportStatus />
            <NotificationStatus />
            <MigrationNotice />
            <ScrollToTop />
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
