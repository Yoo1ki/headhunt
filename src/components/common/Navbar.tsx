"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { JSX } from "react";
import {
  GiHypersonicBolt,
  GiSaberAndPistol,
  GiShorts,
  GiTwoShadows,
  GiWoodCabin,
} from "react-icons/gi";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type NavbarProps = {
  onClick?: () => void;
};

type MenuItem = {
  key: string;
  href: string;
  icon: JSX.Element;
  disabled?: boolean;
};

const menu: MenuItem[] = [
  { key: "home", href: "/", icon: <GiWoodCabin /> },
  { key: "operators", href: "/operators", icon: <GiTwoShadows /> },
  { key: "tracker", href: "/tracker", icon: <GiHypersonicBolt /> },
  { key: "weapons", href: "/weapons", icon: <GiSaberAndPistol /> },
  { key: "gear", href: "/gear", icon: <GiShorts />, disabled: true },
];

export const Navbar = ({ onClick }: NavbarProps) => {
  const segment = "/" + (useSelectedLayoutSegment() ?? "");
  const t = useTranslations("Navbar");

  return (
    <div className="overflow-y-auto max-h-full px-4">
      <div className="flex flex-col justify-start gap-2">
        {menu.map((item) => {
          const isActive = segment === item.href;

          const baseClass =
            "flex items-center rounded-xl p-2 duration-300 w-full";

          const activeClass = isActive
            ? "bg-white/5 text-yellow-400"
            : "hover:bg-white/10";

          const disabledClass = item.disabled
            ? "opacity-40 cursor-not-allowed pointer-events-none"
            : "";

          if (item.disabled) {
            return (
              <div key={item.key} className={`${baseClass} ${disabledClass}`}>
                {item.icon}
                <p className="ml-2 truncate">{t(item.key)}</p>
                <span className="text-xs bg-neutral-900 rounded-sm ml-2 py-0.5 px-1">
                  Coming soon
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={onClick}
              className={`${baseClass} ${activeClass}`}
            >
              {item.icon}
              <p className="ml-2 truncate">{t(item.key)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
