import { TermsOfServicePageContent } from './_components/TermsOfServicePageContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsOfServicePage() {
  return <TermsOfServicePageContent />;
}
