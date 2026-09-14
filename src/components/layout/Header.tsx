'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SlMenu, SlClose } from 'react-icons/sl';
import { MobileNavbar } from './MobileNavbar';
import { Link, useRouter } from '@/i18n/navigation';
import { LocaleSwitcher } from '../shared/LocaleSwitcher';
import { CONFIG } from '@/config';

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pendingNavigationRef = useRef<string | null>(null);
  const closeMenu = useCallback(() => {
    if (window.history.state?.headhuntMobileMenu) {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  const handleMobileNavigation = useCallback(
    (href?: string) => {
      pendingNavigationRef.current = href ?? null;

      if (window.history.state?.headhuntMobileMenu) {
        window.history.back();
      } else {
        setIsOpen(false);
        if (href) router.push(href);
      }
    },
    [router]
  );

  useEffect(() => {
    if (!isOpen) return;

    let closedByHistory = false;
    const currentHistoryState = window.history.state;
    window.history.pushState(
      {
        ...(typeof currentHistoryState === 'object' && currentHistoryState
          ? currentHistoryState
          : {}),
        headhuntMobileMenu: true,
      },
      '',
      window.location.href
    );

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    const handlePopState = () => {
      closedByHistory = true;
      setIsOpen(false);
      const pendingHref = pendingNavigationRef.current;
      pendingNavigationRef.current = null;
      if (pendingHref) router.push(pendingHref);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const handleResize = () => {
      if (desktop.matches) closeMenu();
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('popstate', handlePopState);
    desktop.addEventListener('change', handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('popstate', handlePopState);
      desktop.removeEventListener('change', handleResize);

      if (!closedByHistory && window.history.state?.headhuntMobileMenu) {
        window.history.back();
      }
    };
  }, [closeMenu, isOpen, router]);

  return (
    <>
      <header
        className={`flex w-full items-center bg-neutral-800 shadow-xs ${className}`}
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
                onClick={toggleMenu}
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
      <MobileNavbar isOpen={isOpen} onClick={handleMobileNavigation} />
    </>
  );
};
