'use client';

import { CloudflareImage } from '@/components/shared/CloudflareImage';
import { CONFIG } from '@/config';
import { useTranslations } from 'next-intl';
import { useCountdown } from '@/hooks/useCountdown';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { PiClockCountdownBold } from 'react-icons/pi';
import { Link } from '@/i18n/navigation';
import {
  GiTwoShadows,
  GiHypersonicBolt,
  GiSaberAndPistol,
} from 'react-icons/gi';

type Props = {
  banners: BannerItemProps[];
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
];

export const HomePageContent = ({ banners }: Props) => {
  const t = useTranslations('HomePage');
  const tNav = useTranslations('Navbar');

  return (
    <div className="flex h-full flex-col gap-8 py-2 sm:gap-10">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-yellow-400/15 bg-linear-to-br from-yellow-400/10 via-neutral-800/70 to-neutral-900/60 px-5 py-8 text-center shadow-xl shadow-black/10 sm:px-8 sm:py-10">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {CONFIG.appName}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-xl">
          {t('description')}
        </p>
      </div>
      <div className="flex grow flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-yellow-400">
            {t('shortcutMenu')}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {pages.map((page) => {
              return (
                <Link
                  key={page.key}
                  href={page.href}
                  className="flex items-center rounded-xl border border-yellow-400/40 bg-neutral-800/80 px-3 py-2 text-yellow-300 shadow-sm shadow-black/10 duration-150 hover:border-yellow-300 hover:bg-neutral-700 hover:text-yellow-200 focus-visible:ring-2 focus-visible:ring-yellow-400 active:bg-neutral-600"
                >
                  {page.icon}
                  <p className="ml-2 truncate">{tNav(page.key)}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-yellow-400">
            {t('limitedBanners')}
          </h2>
          <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
            {banners.map((banner, i) => {
              const isLast = i === banners.length - 1;
              const isOdd = banners.length % 2 === 1;

              return (
                <div
                  key={banner.id}
                  className={`${isOdd && isLast ? 'w-full md:col-span-2 md:max-w-md md:justify-self-center' : ''}`}
                >
                  <BannerItem
                    id={banner.id}
                    name={banner.name}
                    itemName={banner.itemName}
                    icon={banner.icon}
                    endTime={banner.endTime}
                  />
                </div>
              );
            })}
          </div>
        </div>
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
}: BannerItemProps) => {
  const t = useTranslations('HomePage');
  const countdown = useCountdown(endTime);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const endTimeText =
    mounted && endTime
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
      className="group flex w-full gap-4 overflow-hidden rounded-xl bg-neutral-800 ring-2 ring-neutral-700/80 duration-300 hover:bg-neutral-700 hover:ring-yellow-500/80"
    >
      <div className="flex w-fit items-center justify-center bg-neutral-900 p-1 duration-300 group-hover:bg-neutral-800">
        <CloudflareImage
          src={icon}
          alt={itemName}
          width={100}
          height={100}
          draggable={false}
          className="transition duration-300 group-hover:scale-110 group-hover:transform"
        />
      </div>
      <div className="relative flex flex-1 flex-col">
        <div className="absolute top-0 right-0 flex w-fit items-center justify-center gap-1 rounded-bl-xl bg-neutral-700/80 px-2 py-0.5 duration-300 group-hover:bg-neutral-600/80">
          <div className="flex items-center gap-1 text-xs font-semibold text-green-500">
            <PiClockCountdownBold />
            {mounted ? endTimeText || t('longTime') : t('loading')}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className="font-bold">{name}</div>
          <div
            className="text-sm font-semibold"
            style={{ color: CONFIG.enumColors.rarities.rarity_6 }}
          >
            {itemName}
          </div>
        </div>
      </div>
    </Link>
  );
};
