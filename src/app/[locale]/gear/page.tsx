import { GearPageContent } from './_components/GearPageContent';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { Gear, GearFilters } from '@/types/gear';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('GearPage');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function GearPage() {
  const currentLocale = await getLocale();
  const [gear, filters] = await Promise.all([
    import(`@/data/gear/${currentLocale}.json`).then((module) =>
      Object.values(module.default as Record<string, Gear>)
    ),
    import(`@/data/gear/filters/${currentLocale}.json`).then(
      (module) => module.default as GearFilters
    ),
  ]);

  return <GearPageContent gear={gear} filters={filters} />;
}
