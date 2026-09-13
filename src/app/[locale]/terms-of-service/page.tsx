import { TermsOfServicePageContent } from './_components/TermsOfServicePageContent';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('TermsOfService');

  const metadata: Metadata = {
    title: t('title'),
  };

  return metadata;
}

export default function TermsOfServicePage() {
  return <TermsOfServicePageContent />;
}
