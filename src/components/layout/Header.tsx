'use client';

import { useEffect, useState } from 'react';
import { SlMenu, SlClose } from 'react-icons/sl';
import { MobileNavbar } from './MobileNavbar';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from '../shared/LocaleSwitcher';
import { CONFIG } from '@/config';

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const handleResize = () => {
      if (desktop.matches) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    desktop.addEventListener('change', handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      desktop.removeEventListener('change', handleResize);
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`flex w-full items-center bg-neutral-800 shadow-sm ${className}`}
      >
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              className="flex shrink-0 items-center overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/headhunt-logo.png"
                alt={CONFIG.appName}
                width={185}
                height={32}
                className="h-auto w-[clamp(8.5rem,42vw,11.5625rem)]"
              />
            </Link>
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <LocaleSwitcher />
              <button
                type="button"
                onClick={onClick}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                className="cursor-pointer rounded-lg p-1 text-white transition-colors hover:bg-white/10 lg:hidden"
              >
                {isOpen ? (
                  <SlClose className="h-8 w-8" />
                ) : (
                  <SlMenu className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNavbar isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  );
};
