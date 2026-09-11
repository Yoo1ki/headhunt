import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('GearPage');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function GearPage() {
  notFound();
}
