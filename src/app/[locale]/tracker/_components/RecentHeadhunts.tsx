import { useMemo, useState } from 'react';
import { Filter } from '@/components/ui/Filter';
import { Tooltip } from '@/components/ui/Tooltip';
import type { Enums, RarityId } from '@/types/enums';
import { CONFIG } from '@/config';
import type { RecordItem } from '@/types/profile';
import { GachaResult } from '@/types/profile';
import type { Catalogs } from '@/types/catalog';
import { PiImageBroken } from 'react-icons/pi';
import { CloudflareImage } from '@/components/shared/CloudflareImage';
import { useTranslations } from 'next-intl';

type RecentHeadhuntsProps = {
  hash: string;
  records: RecordItem[];
  catalogs: Partial<Catalogs>;
  rarities: Enums['rarities'];
  guaranteedLimit: number;
};

const PAGE_SIZE = 50;

const isIncluded = <T,>(filter: T[], value: T) =>
  filter.length === 0 || filter.includes(value);

const getPityColor = ({
  pity,
  rarityId,
  isWeapon,
}: {
  pity: number;
  rarityId: RarityId;
  isWeapon: boolean;
}) => {
  let color = 'bg-blue-500/80';

  if (rarityId === 'rarity_6') {
    if (isWeapon) {
      if (pity > 30) color = 'bg-red-500/80';
      else if (pity > 20) color = 'bg-orange-500/80';
      else if (pity > 0) color = 'bg-green-500/80';
    } else {
      if (pity > 65) color = 'bg-red-500/80';
      else if (pity > 40) color = 'bg-orange-500/80';
      else if (pity > 0) color = 'bg-green-500/80';
    }
  } else {
    if (pity > 7) color = 'bg-red-500/80';
    else if (pity > 5) color = 'bg-orange-500/80';
    else if (pity > 0) color = 'bg-green-500/80';
  }

  return color;
};

export const RecentHeadhunts = ({
  hash,
  records,
  catalogs,
  rarities,
  guaranteedLimit,
}: RecentHeadhuntsProps) => {
  const t = useTranslations('TrackerPage');
  const isWeapon = hash.startsWith('weponbox');

  const [visible, setVisible] = useState(PAGE_SIZE);
  const [rarityFilter, setRarityFilter] = useState<string[]>(['rarity_6']);

  const handleChangeRarity = (values: string[]) => {
    setRarityFilter(values);
    setVisible(PAGE_SIZE);
  };

  const filteredRecords = useMemo(() => {
    return records.filter((record) =>
      isIncluded(rarityFilter, `rarity_${record.rarity}`)
    );
  }, [records, rarityFilter]);

  const visibleRecords = useMemo(() => {
    return filteredRecords.slice(0, visible);
  }, [filteredRecords, visible]);

  const hasMore = visible < filteredRecords.length;

  const handleLoadMore = () => {
    if (hasMore) {
      setVisible((prev) => {
        if (prev >= filteredRecords.length) return prev;
        return prev + PAGE_SIZE;
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-neutral-800/80 px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-bold">
          {isWeapon ? t('recentIssues') : t('recentHeadhunts')}
        </h2>

        <div>
          <Filter
            data={rarities
              .filter((r) =>
                ['rarity_4', 'rarity_5', 'rarity_6'].includes(r.id)
              )
              .map((e) => ({
                id: e.id,
                name: `${e.name}★`,
                icon: 'rarity',
                color: CONFIG.enumColors.rarities[e.id],
              }))}
            value={rarityFilter}
            onChange={handleChangeRarity}
          />
        </div>
      </div>

      {visibleRecords.some(
        (record) => record.result === GachaResult.Guarantee
      ) && (
        <div className="w-fit rounded-md border-l-2 border-violet-500 bg-violet-500/20 px-2 py-0.5 text-sm font-light italic">
          <span className="font-semibold">G</span> ={' '}
          {t('guaranteedDesc', { limit: guaranteedLimit })}
        </div>
      )}

      <div
        className="grid items-center gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(4rem, 1fr))',
        }}
      >
        {visibleRecords?.map((record, index) => {
          const catalog = catalogs[record.itemId];

          const name = catalog?.name ?? record.itemId;
          const rarityId =
            catalog?.rarityId ??
            (`rarity_${record.rarity}` as keyof typeof CONFIG.enumColors.rarities);
          const isGuarantee = record.result === GachaResult.Guarantee;

          const pityColor = getPityColor({
            pity: record.pity,
            rarityId: rarityId,
            isWeapon: isWeapon || hash === 'beginner',
          });

          return (
            <div
              key={index}
              className="group flex items-center justify-center rounded-full"
            >
              <Tooltip title={name} position="top">
                <div
                  className="relative h-16 w-16 overflow-hidden rounded-xl bg-neutral-800 ring-2"
                  style={
                    {
                      '--tw-ring-color': CONFIG.enumColors.rarities[rarityId],
                    } as React.CSSProperties
                  }
                >
                  {catalog ? (
                    <CloudflareImage
                      src={catalog.icon}
                      alt={name}
                      width={64}
                      height={64}
                      draggable="false"
                      className="scale-110 transition duration-300 group-hover:scale-120 group-hover:transform"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                      <PiImageBroken size={24} />
                    </div>
                  )}
                  <div
                    className={`${isGuarantee ? 'bg-violet-500' : pityColor} absolute right-0 bottom-0 flex items-center justify-center rounded-tl-xl px-1 py-0.5 text-sm font-semibold`}
                  >
                    {isGuarantee ? 'G' : record.pity || 'Free'}
                  </div>
                </div>
              </Tooltip>
            </div>
          );
        })}
        {hasMore && (
          <Tooltip
            position="right"
            title={`${filteredRecords.length - visible}`}
          >
            <button
              className="w-full cursor-pointer self-center rounded-xl bg-neutral-700/80 px-3 py-1 text-xs text-white/80 transition hover:bg-neutral-700 hover:text-white active:bg-neutral-700/60 active:text-white/60"
              onClick={handleLoadMore}
            >
              {t('more')}
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
