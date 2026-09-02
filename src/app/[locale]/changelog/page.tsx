import { ChangelogPageContent } from './_components/ChangelogPageContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'See the latest features and improvements on Headhunt.cc.',
};

export default function ChangelogPage() {
  return <ChangelogPageContent />;
}
