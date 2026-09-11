'use client';

import { CloudflareImage } from '@/components/shared/CloudflareImage';
import { PageTitle } from '@/components/ui/PageTitle';
import { CONFIG } from '@/config';
import { useTranslations } from 'next-intl';
import { useCountdown } from '@/hooks/useCountdown';
import type { JSX } from 'react';
import { PiClockCountdownBold } from 'react-icons/pi';
import { Link } from '@/i18n/navigation';
import {
  GiTwoShadows,
  GiHypersonicBolt,
  GiSaberAndPistol,
  GiShorts,
} from 'react-icons/gi';

type Props = {
  banners: BannerItemProps[];
  initialNow: number;
};

type BannerItemProps = {
  id: string;
  name: string;
  endTime?: number;
  itemName: string;
  icon: string;
};

type MenuItem = {
  key: string;
  href: string;
  icon: JSX.Element;
  disabled?: boolean;
};

const pages: MenuItem[] = [
  { key: 'operators', href: '/operators', icon: <GiTwoShadows /> },
  { key: 'tracker', href: '/tracker', icon: <GiHypersonicBolt /> },
  { key: 'weapons', href: '/weapons', icon: <GiSaberAndPistol /> },
  { key: 'gear', href: '/gear', icon: <GiShorts /> },
];

export const HomePageContent = ({ banners, initialNow }: Props) => {
  const t = useTranslations('HomePage');
  const tNav = useTranslations('Navbar');

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col">
      <PageTitle title={CONFIG.appName} desc={t('description')} />
      <div className="flex flex-col gap-8">
        <section
          aria-labelledby="home-shortcuts"
          className="flex flex-col gap-3"
        >
          <h2
            id="home-shortcuts"
            className="text-base font-semibold text-white/85"
          >
            {t('shortcutMenu')}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {pages.map((page) => {
              return (
                <Link
                  key={page.key}
                  href={page.href}
                  className="flex min-w-0 items-center gap-3 rounded-xl bg-neutral-800/80 p-4 text-sm font-semibold text-white/80 transition-colors hover:bg-neutral-700 hover:text-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-400 active:bg-neutral-600"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl text-yellow-400"
                  >
                    {page.icon}
                  </span>
                  <span className="truncate">{tNav(page.key)}</span>
                </Link>
              );
            })}
          </div>
        </section>
        <section aria-labelledby="home-banners" className="flex flex-col gap-3">
          <h2
            id="home-banners"
            className="text-base font-semibold text-white/85"
          >
            {t('limitedBanners')}
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {banners.map((banner) => (
              <BannerItem key={banner.id} {...banner} initialNow={initialNow} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export const BannerItem = ({
  id,
  name,
  endTime,
  itemName,
  icon,
  initialNow,
}: BannerItemProps & { initialNow: number }) => {
  const t = useTranslations('HomePage');
  const countdown = useCountdown(endTime, initialNow);

  const endTimeText =
    endTime !== undefined
      ? countdown?.expired
        ? t('ended')
        : t('countdown', {
            days: countdown?.time?.days || 0,
            hours: countdown?.time?.hours || 0,
            minutes: countdown?.time?.minutes || 0,
            seconds: countdown?.time?.seconds || 0,
          })
      : undefined;

  const hash = id.startsWith('weponbox') ? id : id.split('_')[0];
  return (
    <Link
      href={`/tracker#${hash}`}
      className="group flex min-w-0 items-center gap-3 rounded-xl bg-neutral-800/80 p-3 transition-colors hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-yellow-400 sm:gap-4 sm:p-4"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-900/60 sm:h-24 sm:w-24">
        <div className="pointer-events-none absolute inset-1 rounded-lg border border-white/10" />
        <CloudflareImage
          src={icon}
          alt={itemName}
          width={100}
          height={100}
          draggable={false}
          className="h-full w-full object-contain transition duration-300 motion-safe:group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div>
          <h3 className="text-sm leading-snug font-semibold break-words text-white/90">
            {name}
          </h3>
          <div
            className="mt-1 text-sm leading-snug font-medium break-words"
            style={{ color: CONFIG.enumColors.rarities.rarity_6 }}
          >
            {itemName}
          </div>
        </div>
        <div
          className={`flex min-h-5 items-center gap-1.5 text-xs tabular-nums ${countdown?.expired ? 'text-white/40' : 'text-white/60'}`}
        >
          <PiClockCountdownBold aria-hidden="true" className="shrink-0" />
          <span>{endTimeText || t('longTime')}</span>
        </div>
      </div>
    </Link>
  );
};
