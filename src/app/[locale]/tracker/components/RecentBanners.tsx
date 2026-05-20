import { Banners } from "@/types/banner";
import { useMemo, useState } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import { CFImage } from "@/components/ui/CFImage";
import { useTranslations } from "next-intl";

type RecentBannersProps = {
  banners: Partial<Banners>;
  bannerIds: Set<string>;
  selectedId: string | null;
  onSelected: (id: string | null) => void;
};

const PAGE_SIZE = 5;

export const RecentBanners = ({
  banners,
  bannerIds,
  selectedId,
  onSelected,
}: RecentBannersProps) => {
  const t = useTranslations("TrackerPage");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const bannerIdsArray = useMemo(() => [...bannerIds], [bannerIds]);

  const fBannerIds = useMemo(() => {
    return bannerIdsArray.slice(0, visible);
  }, [bannerIdsArray, visible]);

  const hasMore = visible < bannerIdsArray.length;

  const handleLoadMore = () => {
    if (hasMore) {
      setVisible((prev) => {
        if (prev >= bannerIdsArray.length) return prev;
        return prev + PAGE_SIZE;
      });
    }
  };

  const getColor = (isSelected: boolean) =>
    isSelected
      ? "ring-2 bg-white/10"
      : "bg-neutral-900 hover:ring-2 hover:ring-white/50 ";

  return (
    <div className="bg-neutral-800/80 rounded-xl px-3 py-2 flex flex-col gap-4">
      <h2 className="font-bold text-xl">{t("recentBanners")}</h2>

      <div
        className="grid gap-2 items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(6rem, 1fr))",
        }}
      >
        <div
          className={`${getColor(selectedId === null)} px-3 py-1 w-full h-full rounded-md flex justify-center items-center cursor-pointer`}
          onClick={() => onSelected(null)}
        >
          <span className="text-xs font-semibold line-clamp-1">{t("all")}</span>
        </div>
        {fBannerIds.map((bannerId) => {
          const banner = banners[bannerId];

          const isSelected = bannerId === selectedId;
          const colorClass = getColor(isSelected);

          return (
            <div
              key={bannerId}
              onClick={
                banner
                  ? () => (isSelected ? onSelected(null) : onSelected(bannerId))
                  : undefined
              }
              className={`${colorClass} relative w-full h-full rounded-md overflow-hidden ${banner ? "cursor-pointer" : "select-none"}`}
            >
              {banner ? (
                <CFImage
                  src={banner.image}
                  alt={banner.name}
                  width={96}
                  height={32}
                  draggable={false}
                  className="w-full h-full"
                />
              ) : (
                <div className="bg-neutral-900/80 text-xs w-full h-full flex items-center justify-center rounded-md text-white/60">
                  Unknown
                </div>
              )}
            </div>
          );
        })}
        {hasMore && (
          <Tooltip
            position="right"
            title={`${bannerIdsArray.length - visible}`}
          >
            <button
              className="rounded-xl w-full text-xs px-3 py-1 self-center cursor-pointer bg-neutral-700/80 text-white/80 hover:bg-neutral-700 hover:text-white active:bg-neutral-700/60 active:text-white/60 transition"
              onClick={handleLoadMore}
            >
              {t("more")}
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
