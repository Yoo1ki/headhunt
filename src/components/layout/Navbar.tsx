'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import type { JSX } from 'react';
import {
  GiHypersonicBolt,
  GiSaberAndPistol,
  GiShorts,
  GiTwoShadows,
  GiWoodCabin,
} from 'react-icons/gi';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { FaDiscord } from 'react-icons/fa6';
import { CONFIG } from '@/config';

type NavbarProps = {
  onClick?: (href?: string) => void;
};

type MenuItem = {
  key: string;
  href: string;
  icon: JSX.Element;
  disabled?: boolean;
};

const menu: MenuItem[] = [
  { key: 'home', href: '/', icon: <GiWoodCabin /> },
  { key: 'tracker', href: '/tracker', icon: <GiHypersonicBolt /> },
  { key: 'operators', href: '/operators', icon: <GiTwoShadows /> },
  { key: 'weapons', href: '/weapons', icon: <GiSaberAndPistol /> },
  { key: 'gear', href: '/gear', icon: <GiShorts />, disabled: true },
];

export const Navbar = ({ onClick }: NavbarProps) => {
  const segment = '/' + (useSelectedLayoutSegment() ?? '');
  const t = useTranslations('Navbar');

  const scrollToTop = () => {
    const container = document.getElementById('scroll-container');

    if (container && window.innerWidth >= 1024) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="my-4 max-h-full overflow-y-auto px-4">
        <div className="flex flex-col justify-start gap-2">
          {menu.map((item) => {
            const isActive = segment === item.href;

            const baseClass =
              'flex gap-2 items-center rounded-xl p-2 duration-300 w-full';

            const activeClass = isActive
              ? 'bg-white/5 text-yellow-400'
              : 'hover:bg-white/10';

            const disabledClass = item.disabled
              ? 'opacity-40 cursor-not-allowed pointer-events-none'
              : '';

            if (item.disabled) {
              return (
                <div key={item.key} className={`${baseClass} ${disabledClass}`}>
                  {item.icon}
                  <span className="truncate">{t(item.key)}</span>
                  <span className="ml-auto rounded-md bg-neutral-900 px-1.5 py-0.5 text-[10px] font-semibold text-white/50 uppercase">
                    {t('comingSoon')}
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={
                  isActive
                    ? (event) => {
                        event.preventDefault();
                        scrollToTop();
                        onClick?.();
                      }
                    : onClick
                      ? (event) => {
                          event.preventDefault();
                          onClick(item.href);
                        }
                      : undefined
                }
                className={`${baseClass} ${activeClass}`}
              >
                {item.icon}
                <span className="truncate">{t(item.key)}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <Link
        href={CONFIG.discordUrl}
        target="_blank"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 transition duration-300 hover:bg-[#5865F2] active:bg-[#5865F2]/90"
      >
        <FaDiscord size={24} />
        <span className="truncate">{t('joinDiscord')}</span>
      </Link>
    </div>
  );
};
