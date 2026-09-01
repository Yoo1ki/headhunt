import { PrivacyPolicyPageContent } from './_components/PrivacyPolicyPageContent';
import type { Metadata } from 'next';

export async function generateMetadata() {
  const metadata: Metadata = {
    title: 'Privacy Policy',
  };

  return metadata;
}

export default async function PrivacyPolicyPage() {
  return <PrivacyPolicyPageContent />;
}
