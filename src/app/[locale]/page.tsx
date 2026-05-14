import { getLocale } from "next-intl/server";
import { PageContent } from "./PageContent";
import { Banners } from "@/types/banner";
import { Catalogs } from "@/types/catalog";

export default async function HomePage() {
  const locale = await getLocale();

  const [banners, catalogs] = await Promise.all([
    import(`@/data/tracker/banners/${locale}.json`).then(
      (m) => m.default as Banners,
    ),
    import(`@/data/tracker/catalogs/${locale}.json`).then(
      (m) => m.default as Catalogs,
    ),
  ]);

  const now = Date.now() / 1000;

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

  const limitedBanners = activeBanners
    .filter((banner) => !banner.id.startsWith("weaponbox"))
    .map((banner) => {
      let itemName = catalogs[banner.rateup].name;
      if (banner.id.startsWith("joint")) {
        itemName =
          banner.rotate?.map((id) => catalogs[id].name).join(", ") ?? itemName;
      }
      return {
        id: banner.id,
        name: banner.name,
        endTime: banner.endTime,
        itemName,
        icon: catalogs[banner.rateup].icon,
      };
    });

  return <PageContent banners={limitedBanners} />;
}
