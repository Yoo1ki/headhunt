import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Filter } from "@/components/ui/Filter";
import { Button } from "@/components/ui/Button";
import { FaSyncAlt } from "react-icons/fa";
import { Enums } from "@/types/enums";
import { CONFIG } from "@/config";
import { RecordItem } from "@/types/profile";
import { Banners } from "@/types/banner";
import { Catalogs } from "@/types/catalog";
import { useLocale, useTranslations } from "next-intl";
import { PiImageBroken } from "react-icons/pi";
import { CFImage } from "@/components/ui/CFImage";

type HeadhuntRecordsProps = {
  hash: string;
  records: RecordItem[];
  banners: Partial<Banners>;
  catalogs: Partial<Catalogs>;
  rarities: Enums["rarities"];
  isSyncing: boolean;
  disabled: boolean;
  onSync: () => void;
};

const formatTimestamp = ({ ts, locale }: { ts: number; locale: string }) => {
  const date = new Date(ts);

  const formatted = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

  return formatted;
};

const PAGE_SIZE = 50;

const isIncluded = <T,>(filter: T[], value: T) =>
  filter.length === 0 || filter.includes(value);

export const HeadhuntRecords = ({
  hash,
  records,
  catalogs,
  banners,
  rarities,
  isSyncing,
  disabled,
  onSync,
}: HeadhuntRecordsProps) => {
  const t = useTranslations("TrackerPage");
  const locale = useLocale();

  const [visible, setVisible] = useState(PAGE_SIZE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const isWeapon = hash.startsWith("weponbox");
  const hideBanner = hash === "standard" || hash === "beginner";

  const [rarityFilter, setRarityFilter] = useState<string[]>([
    "rarity_5",
    "rarity_6",
  ]);

  const handleChangeRarity = (values: string[]) => {
    setRarityFilter(values);
    setVisible(PAGE_SIZE);
  };

  const recordsWithNo = useMemo(() => {
    return records.map((record, index) => ({
      no: records.length - index,
      ...record,
    }));
  }, [records]);

  const filteredRecords = useMemo(() => {
    return recordsWithNo.filter((record) =>
      isIncluded(rarityFilter, `rarity_${record.rarity}`),
    );
  }, [recordsWithNo, rarityFilter]);

  const visibleRecords = useMemo(() => {
    return filteredRecords.slice(0, visible);
  }, [filteredRecords, visible]);

  const hasMore = visible < filteredRecords.length;

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        setVisible((prev) => {
          if (prev >= filteredRecords.length) return prev;
          return prev + PAGE_SIZE;
        });
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, filteredRecords.length]);

  return (
    <>
      <div className="bg-neutral-800/80 rounded-xl px-3 py-2 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-2">
          <h2 className="font-bold text-xl">
            {isWeapon ? t("issueRecords") : t("headhuntRecords")}
          </h2>

          <div>
            <Filter
              data={rarities
                .filter((r) =>
                  ["rarity_4", "rarity_5", "rarity_6"].includes(r.id),
                )
                .map((e) => ({
                  id: e.id,
                  name: `${e.name}★`,
                  icon: "rarity",
                  color: CONFIG.enumColors.rarities[e.id],
                }))}
              value={rarityFilter}
              onChange={handleChangeRarity}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {visibleRecords.length ? (
            <table className="table-auto w-max min-w-full whitespace-nowrap text-center table-records">
              <thead>
                <tr>
                  <th className="w-10">{t("pull")}</th>
                  <th className="text-left">
                    {isWeapon ? t("weapon") : t("operator")}
                  </th>
                  <th className="w-15">{t("pity")}</th>
                  {!hideBanner && <th className="w-30">{t("banner")}</th>}
                  <th className="w-40">{t("time")}</th>
                </tr>
              </thead>

              <tbody>
                {visibleRecords.map((record, index) => {
                  const catalog = catalogs[record.itemId];
                  const banner = banners[record.bannerId];

                  const name = catalog?.name ?? record.itemId;
                  const rarityId =
                    catalog?.rarityId ??
                    (`rarity_${record.rarity}` as keyof typeof CONFIG.enumColors.rarities);
                  const time = formatTimestamp({
                    ts: record.timestamp,
                    locale:
                      CONFIG.locales.find((l) => l.id === locale)?.value ??
                      "en-US",
                  });

                  return (
                    <tr
                      key={index}
                      style={
                        {
                          color: CONFIG.enumColors.rarities[rarityId],
                          "--hover-bg": CONFIG.enumColors.rarities[rarityId],
                        } as React.CSSProperties
                      }
                      className="hover:bg-(--hover-bg)/5"
                    >
                      <td className="rounded-l-xl">{record.no}</td>

                      <td className="flex gap-2 items-center">
                        {catalog ? (
                          <CFImage
                            src={catalog.icon}
                            alt={name}
                            width={40}
                            height={40}
                            draggable={false}
                          />
                        ) : (
                          <div className="w-10 h-10 flex justify-center items-center">
                            <PiImageBroken
                              size={24}
                              className="text-white/60"
                            />
                          </div>
                        )}
                        <span>{name}</span>
                      </td>

                      <td>{record.pity || "Free"}</td>

                      {!hideBanner && (
                        <td>
                          <div className="flex justify-center items-center">
                            <div className="relative w-full h-full rounded-md overflow-hidden">
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
                                <div className="bg-neutral-900/80 w-full h-8 text-xs flex items-center justify-center rounded-md text-white/60">
                                  Unknown
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      )}

                      <td className="rounded-r-xl">{time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center gap-2 py-10">
              <p>{t("noRecordFound")}</p>
              <Button onClick={onSync} variant="secondary" disabled={disabled}>
                {isSyncing ? (
                  <>
                    <FaSyncAlt className="animate-spin" />
                    <span> {t("syncing")}</span>
                  </>
                ) : (
                  <>
                    <FaSyncAlt />
                    <span>{t("sync")}</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {hasMore && (
        <div
          ref={loadMoreRef}
          className="bg-neutral-800 rounded-xl px-3 py-2 flex justify-center items-center gap-2"
        >
          <AiOutlineLoading3Quarters size={24} className="animate-spin" />
          <p>{t("loading")}</p>
        </div>
      )}
    </>
  );
};
