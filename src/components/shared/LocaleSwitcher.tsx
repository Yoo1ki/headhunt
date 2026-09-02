'use client';

import { CONFIG } from '@/config';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { FaGlobeAsia } from 'react-icons/fa';
import { TiArrowSortedDown } from 'react-icons/ti';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (newLocale: string) => {
    const hash = window.location.hash;
    router.replace(pathname + hash, { locale: newLocale });
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
        className="flex w-36 cursor-pointer items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-1.5 shadow-sm shadow-black/10 duration-300 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-yellow-400"
      >
        <span className="flex items-center gap-2">
          <FaGlobeAsia />
          {CONFIG.locales.find((e) => e.id === locale)?.name}
        </span>

        <TiArrowSortedDown
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 flex max-h-100 w-full flex-col gap-1 overflow-auto rounded-xl bg-neutral-800/80 p-1 shadow-xl backdrop-blur-sm"
          role="listbox"
        >
          {CONFIG.locales
            .filter((item) => item.enable)
            .map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleChange(item.id)}
                role="option"
                aria-selected={locale === item.id}
                className={`cursor-pointer rounded-lg px-3 py-2 text-left text-sm duration-300 hover:bg-neutral-600/80 hover:text-white ${locale === item.id ? 'bg-neutral-700/80 text-white' : 'text-white/80'}`}
              >
                {item.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
