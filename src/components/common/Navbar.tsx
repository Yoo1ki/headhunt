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
import { FaDiscord } from "react-icons/fa6";
import { CONFIG } from "@/config";

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

  const scrollToTop = () => {
    const container = document.getElementById("scroll-container");

    if (container && window.innerWidth >= 1024) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="overflow-y-auto max-h-full px-4 my-4">
        <div className="flex flex-col justify-start gap-2">
          {menu.map((item) => {
            const isActive = segment === item.href;

            const baseClass =
              "flex gap-2 items-center rounded-xl p-2 duration-300 w-full";

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
                  <span className="truncate">{t(item.key)}</span>
                  <span className="text-xs bg-neutral-900 rounded-sm py-0.5 px-1">
                    Coming soon
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
                    ? (e) => {
                        e.preventDefault();
                        scrollToTop();
                      }
                    : onClick
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
        className="hover:bg-[#5865F2] active:bg-[#5865F2]/90 rounded-xl flex gap-2 px-4 py-3 justify-center items-center cursor-pointer"
      >
        <FaDiscord size={24} />
        <span className="truncate">Join Discord</span>
      </Link>
    </div>
  );
};
