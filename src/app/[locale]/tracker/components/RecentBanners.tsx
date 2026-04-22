import { Banners } from "@/types/banner";
import { useMemo, useState } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import { CFImage } from "@/components/ui/CFImage";

type RecentBannersProps = {
  banners: Partial<Banners>;
  bannerIds: Set<string>;
  selectedId: string | null;
  onSelected: (id: string | null) => void;
};

const PAGE_SIZE = 6;

export const RecentBanners = ({
  banners,
  bannerIds,
  selectedId,
  onSelected,
}: RecentBannersProps) => {
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
      : "bg-neutral-800 hover:ring-2 hover:ring-white/50 ";

  return (
    <div className="flex flex-wrap gap-1 justify-center items-center">
      <div
        className={`${getColor(selectedId === null)} px-3 py-1 h-8 w-24 rounded-md flex justify-center items-center cursor-pointer`}
        onClick={() => onSelected(null)}
      >
        <span className="text-xs font-semibold line-clamp-1">All Banner</span>
      </div>
      {fBannerIds.map((bannerId) => {
        const banner = banners[bannerId];

        const isSelected = bannerId === selectedId;
        const colorClass = getColor(isSelected);

        return (
          <div
            key={bannerId}
            onClick={() =>
              isSelected ? onSelected(null) : onSelected(bannerId)
            }
            className={`${colorClass} relative h-8 w-24 rounded-md overflow-hidden cursor-pointer`}
          >
            {banner ? (
              <CFImage
                src={banner.image}
                alt={banner.name}
                fill
                sizes="96px"
                draggable={false}
                className="object-cover"
              />
            ) : (
              <div className="bg-neutral-800/80 text-xs w-full h-full flex items-center justify-center rounded-md text-white/60">
                Unknown
              </div>
            )}
          </div>
        );
      })}
      {hasMore && (
        <Tooltip position="right" title={`${bannerIdsArray.length - visible}`}>
          <button
            className="rounded-xl text-xs px-3 py-1 self-center cursor-pointer bg-neutral-700/80 text-white/80 hover:bg-neutral-700 hover:text-white active:bg-neutral-700/60 active:text-white/60 transition"
            onClick={handleLoadMore}
          >
            More...
          </button>
        </Tooltip>
      )}
    </div>
  );
};
