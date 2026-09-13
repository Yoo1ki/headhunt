import { PrivacyPolicyPageContent } from './_components/PrivacyPolicyPageContent';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('PrivacyPolicy');
  const metadata: Metadata = {
    title: t('title'),
  };

  return metadata;
}

export default async function PrivacyPolicyPage() {
  return <PrivacyPolicyPageContent />;
}
