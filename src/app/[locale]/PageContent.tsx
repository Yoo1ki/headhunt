"use client";

import { CFImage } from "@/components/ui/CFImage";
import { CONFIG } from "@/config";
import { useTranslations } from "next-intl";
import { useCountdown } from "@/hooks/useCountdown";
import { JSX, useEffect, useState } from "react";
import { PiClockCountdownBold } from "react-icons/pi";
import { Link } from "@/i18n/navigation";
import {
  GiTwoShadows,
  GiHypersonicBolt,
  GiSaberAndPistol,
} from "react-icons/gi";

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
  { key: "operators", href: "/operators", icon: <GiTwoShadows /> },
  { key: "tracker", href: "/tracker", icon: <GiHypersonicBolt /> },
  { key: "weapons", href: "/weapons", icon: <GiSaberAndPistol /> },
];

export const PageContent = ({ banners }: Props) => {
  const t = useTranslations("HomePage");
  const tNav = useTranslations("Navbar");

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-bold text-white">{CONFIG.appName}</h1>
        <div className="text-xl text-center">{t("description")}</div>
      </div>
      <div className="flex flex-col grow justify-center items-center gap-8">
        <div className="flex flex-col items-center gap-4 w-full">
          <h2 className="text-xl font-bold text-yellow-400">
            {t("shortcutMenu")}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {pages.map((page) => {
              return (
                <Link
                  key={page.key}
                  href={page.href}
                  className="flex items-center rounded-xl p-2 duration-150 border-2 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 border-yellow-400 hover:border-yellow-300 active:border-yellow-200 text-yellow-400 hover:text-yellow-300 active:text-yellow-200"
                >
                  {page.icon}
                  <p className="ml-2 truncate">{tNav(page.key)}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
          <h2 className="text-xl font-bold text-yellow-400">
            {t("limitedBanners")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            {banners.map((banner, i) => {
              const isLast = i === banners.length - 1;
              const isOdd = banners.length % 2 === 1;

              return (
                <div
                  key={banner.id}
                  className={`${isOdd && isLast ? "md:col-span-2 md:justify-self-center md:max-w-md w-full" : ""}`}
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
  const t = useTranslations("HomePage");
  const countdown = useCountdown(endTime);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const endTimeText =
    mounted && endTime
      ? countdown?.expired
        ? "Ended"
        : countdown?.text
      : undefined;

  const hash = id.startsWith("weponbox") ? id : "special";
  return (
    <Link
      href={`/tracker#${hash}`}
      className="flex gap-4 group w-full rounded-xl ring-2 ring-neutral-700/80 bg-neutral-800 duration-300 hover:ring-yellow-500/80 hover:bg-neutral-700 overflow-hidden"
    >
      <div className="bg-neutral-900 group-hover:bg-neutral-800 duration-300 w-fit p-1 flex justify-center items-center">
        <CFImage
          src={icon}
          alt={itemName}
          width={100}
          height={100}
          draggable={false}
          className="group-hover:transform group-hover:scale-110 transition duration-300"
        />
      </div>
      <div className="flex-col flex-1 flex relative">
        <div className="absolute top-0 right-0 bg-neutral-700/80 group-hover:bg-neutral-600/80 duration-300 w-fit rounded-bl-xl px-2 py-0.5 flex justify-center items-center gap-1">
          <div className="text-xs font-semibold text-green-500 flex items-center gap-1">
            <PiClockCountdownBold />
            {mounted ? endTimeText || t("longTime") : t("loading")}
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center">
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
