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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`flex w-full items-center bg-neutral-800 shadow-sm ${className}`}
      >
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="overflow-hidden text-xl font-bold text-white"
            >
              {CONFIG.appName}
            </Link>
            <div className="flex items-center gap-4">
              <LocaleSwitcher />
              <button
                type="button"
                onClick={onClick}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
      <div className={`${!isOpen && 'hidden'} transition-all duration-300`}>
        <MobileNavbar onClick={onClick} />
      </div>
    </>
  );
};
