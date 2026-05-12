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

  const wpTypes = activeBanners
    .filter((banner) => banner.id.startsWith("weponbox"))
    .map((banner) => {
      return {
        id: banner.id,
        name: banner.name,
        icons: [
          {
            name: catalogs[banner.rateup].name,
            url: catalogs[banner.rateup].icon,
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

    const icons = banner?.rateup
      ? [
          {
            name: catalogs[banner.rateup].name,
            url: catalogs[banner.rateup].icon,
          },
        ]
      : [
          {
            name: t(`${type.id}Name`),
            url: type.icon,
          },
        ];

    if (type.id === "weponbox") {
      const primary = wpTypes.slice(1, 3).flatMap((wp) => wp.icons);
      const subIcons =
        primary.length >= 2
          ? primary
          : sortedBanners
              .filter((b) => b.id.startsWith("weponbox"))
              .slice(1, 3)
              .map((b) => {
                return {
                  name: catalogs[b.rateup].name,
                  url: catalogs[b.rateup].icon,
                };
              });
      icons.push(...subIcons);
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

  const opTypeTemp = {
    id: "rerun" as HeadhuntTypeId,
    name: "Special Headhunting",
    icons: [
      {
        name: "Laevatain",
        url: "b1631fda37aa7e67abae26081bc23a332641b53542d4aa9a57f38cfdffee885e",
      },
      {
        name: "Gilberta",
        url: "69c0b9842f5e59f873ca892191ae18d595350cdd30e93b00219d362a4e0d5909",
      },
      {
        name: "Ardelia",
        url: "eff495276cc8c3d4c70865fe2dc11ec1f1f54a12c6a161e4a89a3e386ec7ada7",
      },
      {
        name: "Pogranichnik",
        url: "181886b4c063ae3d3ddd377496d7b81166e5ec43a60604750254d021eecd2487",
      },
    ],
    r5PityLimit: 10,
    r6PityLimit: 80,
    guaranteeAt: 0,
  };

  opTypes.splice(1, 0, opTypeTemp);

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
