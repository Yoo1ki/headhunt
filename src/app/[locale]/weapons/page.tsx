import { WeaponsPageContent } from './_components/WeaponsPageContent';
import { getLocale } from 'next-intl/server';
import type { Weapon } from '@/types/weapons';
import type { Enums } from '@/types/enums';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata() {
  const t = await getTranslations('WeaponsPage');

  const metadata: Metadata = {
    title: t('title'),
    description: t('description'),
  };

  return metadata;
}

export default async function WeaponsPage() {
  const locale = await getLocale();

  const [enums, weapons] = await Promise.all([
    import(`@/data/enums/${locale}.json`).then((m) => m.default as Enums),
    import(`@/data/weapons/${locale}.json`).then((m) => m.default as Weapon[]),
  ]);

  return (
    <WeaponsPageContent
      rarities={enums.rarities}
      weaponTypes={enums.wpTypes}
      weapons={weapons}
    />
  );
}
