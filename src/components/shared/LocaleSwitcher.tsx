'use client';

import { CONFIG } from '@/config';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useState, useRef, useEffect, useId } from 'react';
import { FaGlobeAsia } from 'react-icons/fa';
import { TiArrowSortedDown } from 'react-icons/ti';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

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

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative min-w-0 rounded-xl bg-white/5"
      ref={dropdownRef}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.stopPropagation();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-haspopup="listbox"
        aria-label="Select language"
        className="flex w-36 max-[390px]:w-28 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-yellow-400"
      >
        <span className="flex min-w-0 items-center gap-2">
          <FaGlobeAsia aria-hidden="true" className="shrink-0" />
          <span className="truncate">
            {CONFIG.locales.find((e) => e.id === locale)?.name}
          </span>
        </span>

        <TiArrowSortedDown
          aria-hidden="true"
          className={`shrink-0 text-base text-white/45 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl bg-neutral-800 shadow-lg shadow-black/30">
          <div
            id={listId}
            role="listbox"
            aria-label="Select language"
            className="flex max-h-64 flex-col gap-1 overflow-y-auto overscroll-contain p-2"
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
                  className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-left text-xs transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-yellow-400 ${locale === item.id ? 'bg-white/10 text-white' : 'text-white/70'}`}
                >
                  {item.name}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
