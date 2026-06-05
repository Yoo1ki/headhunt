import { getLocale } from "next-intl/server";
import { PageContent } from "./PageContent";
import { Banners } from "@/types/banner";
import { Catalogs } from "@/types/catalog";
import { Enums } from "@/types/enums";
import { HeadhuntTypeId, headhuntTypes } from "@/data/tracker/headhunt-types";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata() {
  const t = await getTranslations("TrackerPage");

  const metadata: Metadata = {
    title: t("title"),
  };

  return metadata;
}

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

  const weponbox = headhuntTypes.find((e) => e.id === HeadhuntTypeId.Weponbox);

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

  const wpTypes = activeBanners
    .filter((banner) => banner.id.startsWith(HeadhuntTypeId.Weponbox))
    .map((banner) => {
      return {
        id: banner.id,
        name: banner.name,
        icons: [
          {
            name: catalogs[banner.rateup]?.name ?? banner.rateup,
            url: catalogs[banner.rateup]?.icon ?? "",
          },
        ],
        r5PityLimit: weponbox!.r5PityLimit,
        r6PityLimit: weponbox!.r6PityLimit,
        guaranteeAt: weponbox!.guaranteeAt,
      };
    });

  const opTypes = headhuntTypes.map((type) => {
    const banner =
      activeBanners.find((banner) => banner.id.startsWith(type.id)) ??
      sortedBanners.find((banner) => banner.id.startsWith(type.id));

    let icons = banner?.rateup
      ? [
          {
            name: catalogs[banner.rateup]?.name ?? banner.rateup,
            url: catalogs[banner.rateup]?.icon ?? "",
          },
        ]
      : [
          {
            name: t(`${type.id}Name`),
            url: type.icon,
          },
        ];

    if (type.id === HeadhuntTypeId.Weponbox) {
      const primary = wpTypes.slice(1, 3).flatMap((wp) => wp.icons);
      const subIcons =
        primary.length >= 2
          ? primary
          : sortedBanners
              .filter((b) => b.id.startsWith(HeadhuntTypeId.Weponbox))
              .slice(1, 3)
              .map((b) => {
                return {
                  name: catalogs[b.rateup].name,
                  url: catalogs[b.rateup].icon,
                };
              });
      icons.push(...subIcons);
    }

    if (
      type.id === HeadhuntTypeId.Special ||
      type.id === HeadhuntTypeId.Joint
    ) {
      icons = banner?.rotate?.map((id) => {
        return {
          name: catalogs[id]?.name ?? id,
          url: catalogs[id]?.icon ?? "",
        };
      }) ?? [
        {
          name: t(`${type.id}Name`),
          url: type.icon,
        },
      ];
    }

    return {
      id: type.id,
      name: t(`${type.id}Name`),
      icons,
      r5PityLimit: type.r5PityLimit,
      r6PityLimit: type.r6PityLimit,
      guaranteeAt: type.guaranteeAt,
    };
  });

  const types = {
    opTypes,
    wpTypes,
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
