import { getLocale } from "next-intl/server";
import { PageContent } from "./PageContent";
import { Banners } from "@/types/banner";
import { Catalogs } from "@/types/catalog";
import { Enums } from "@/types/enums";
import { headhuntTypes } from "@/data/tracker/headhunt-types";
import { getTranslations } from "next-intl/server";

export default async function TrackerPage() {
  const locale = await getLocale();
  const t = await getTranslations("TrackerPage");

  const [banners, catalogs, enums] = await Promise.all([
    import(`@/data/tracker/banners/${locale}.json`).then(
      (m) => m.default as Banners,
    ),
    import(`@/data/tracker/catalogs/${locale}.json`).then(
      (m) => m.default as Catalogs,
    ),
    import(`@/data/enums/${locale}.json`).then((m) => m.default as Enums),
  ]);

  const now = Date.now() / 1000;

  const weponbox = headhuntTypes.find((e) => e.id === "weponbox");

  const sortedBanners = Object.values(banners).sort((a, b) => {
    const aStart = a.startTime ?? 0;
    const bStart = b.startTime ?? 0;
    return bStart - aStart;
  });

  const activeBanners = sortedBanners.filter((banner) => {
    const start = banner.startTime ?? 0;
    const end = banner.endTime ?? Infinity;
    return now >= start && now <= end;
  });

  const weaponTypes = activeBanners
    .filter((banner) => banner.id.startsWith("weponbox"))
    .map((banner) => {
      return {
        id: banner.id,
        name: banner.name,
        icon: catalogs[banner.rateup].icon,
        r5PityLimit: weponbox!.r5PityLimit,
        r6PityLimit: weponbox!.r6PityLimit,
        guaranteeAt: weponbox!.guaranteeAt,
      };
    });

  const bannerTypes = headhuntTypes.map((type) => {
    const banner =
      activeBanners.find((banner) => banner.id.startsWith(type.id)) ??
      sortedBanners.find((banner) => banner.id.startsWith(type.id));

    const icon = banner?.rateup ? catalogs[banner.rateup].icon : type.icon;

    const subIcons =
      type.id === "weponbox"
        ? (() => {
            const primary = weaponTypes.slice(1, 3).map((w) => w.icon);
            return primary.length >= 2
              ? primary
              : sortedBanners
                  .filter((b) => b.id.startsWith("weponbox"))
                  .slice(1, 3)
                  .map((b) => catalogs[b.rateup].icon);
          })()
        : undefined;

    return {
      id: type.id,
      name: t(`${type.id}Name`),
      icon,
      subIcons,
      r5PityLimit: type.r5PityLimit,
      r6PityLimit: type.r6PityLimit,
      guaranteeAt: type.guaranteeAt,
    };
  });

  const types = {
    bannerTypes,
    weaponTypes,
  };

  const rarities = enums.rarities.filter((r) =>
    ["rarity_4", "rarity_5", "rarity_6"].includes(r.id),
  );

  return (
    <PageContent
      types={types}
      banners={banners}
      catalogs={catalogs}
      rarities={rarities}
    />
  );
}
