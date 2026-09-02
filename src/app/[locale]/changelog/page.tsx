import { ChangelogPageContent } from './_components/ChangelogPageContent';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ChangelogPage');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ChangelogPage() {
  return <ChangelogPageContent />;
}
