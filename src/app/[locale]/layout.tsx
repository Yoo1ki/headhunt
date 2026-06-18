import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { ImportStatus } from '@/components/ImportStatus';
import { GoToTop } from '@/components/GoToTop';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PWAUpdateToast from '@/components/PWAUpdateToast';
import { CONFIG } from '@/config';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  const t = await getTranslations('HomePage');

  const metadata: Metadata = {
    title: {
      default: `${CONFIG.appName} — ${t('title')}`,
      template: `%s — ${CONFIG.appName}`,
    },
    description: t('description'),
    keywords: [
      'Arknights Endfield',
      'Arknights Endfield pity',
      'Arknights Endfield gacha',
      'Arknights Endfield tracker',
      'Endfield pity tracker',
      'Endfield gacha tracker',
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
            <PWAUpdateToast />
            <GoToTop />
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
