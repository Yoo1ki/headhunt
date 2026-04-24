"use client";

import { CONFIG } from "@/config";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { FaGlobeAsia } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { useImportStore } from "@/store/useImportStore";
import clsx from "clsx";

export const SwitchLocale = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const isImporting = useImportStore((s) => s.isImporting);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (newLocale: string) => {
    const hash = window.location.hash;

    const segments = pathname.split("/");
    if (CONFIG.locales.some((l) => l.id === segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    window.location.href = segments.join("/") + hash;
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const stateClass = isImporting
    ? "bg-neutral-600 text-white/60"
    : "cursor-pointer";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        disabled={isImporting}
        onClick={() => setOpen(!open)}
        className={clsx(
          "w-36 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 flex justify-between items-center gap-2 duration-300",
          stateClass,
        )}
      >
        <div className="flex items-center gap-2">
          <FaGlobeAsia />
          {CONFIG.locales.find((e) => e.id === locale)?.name}
        </div>

        <TiArrowSortedDown
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 p-1 bg-neutral-800/80 backdrop-blur-sm flex flex-col gap-1 rounded-xl shadow-xl overflow-auto max-h-100 w-full z-50">
          {CONFIG.locales
            .filter((e) => e.enable)
            .map((e) => (
              <div
                key={e.id}
                onClick={() => handleChange(e.id)}
                className={`
                px-3 py-2 rounded-lg cursor-pointer text-sm
                hover:bg-neutral-600/80 hover:text-white duration-300 
                ${locale === e.id ? "bg-neutral-700/80 text-white" : "text-white/80"}
              `}
              >
                {e.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
