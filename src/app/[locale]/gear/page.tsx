import { GearPageContent } from './_components/GearPageContent';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('GearPage');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function GearPage() {
  return <GearPageContent />;
}
