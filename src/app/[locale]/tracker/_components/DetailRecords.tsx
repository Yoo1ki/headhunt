import { CONFIG } from '@/config';
import type { BannerItem, TypeItem } from '@/types/profile';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Tooltip } from '@/components/ui/Tooltip';
import { FaCircleInfo } from 'react-icons/fa6';

type DetailRecordsProps = {
  label?: string;
  stats: TypeItem | BannerItem | undefined;
  hash: string;
};

export const DetailRecords = ({
  label = 'Unknown',
  stats,
  hash,
}: DetailRecordsProps) => {
  const t = useTranslations('TrackerPage.DetailRecords');
  const locale = useLocale();

  const details = useMemo(() => {
    const isWeapon = hash.startsWith('weponbox');

    const localeValue =
      CONFIG.locales.find((l) => l.id === locale)?.value ?? 'en-US';

    const r4 = stats?.r4Count ?? 0;
    const r5 = stats?.r5Count ?? 0;
    const r6 = stats?.r6Count ?? 0;

    const totalPulls = r4 + r5 + r6;
    const hasR6 = r6 > 0;

    const currencyMultiplier = isWeapon ? 198 : 500;

    const base = [
      {
        label: isWeapon ? t('totalIssue') : t('totalHeadhunt'),
        description: t('totalPullsDescription'),
        value: totalPulls,
      },
      {
        label: isWeapon ? t('totalArsenalTicket') : t('totalOroberyl'),
        description: isWeapon
          ? t('totalArsenalTicketDescription')
          : t('totalOroberylDescription'),
        value: (totalPulls * currencyMultiplier).toLocaleString(localeValue),
      },
      {
        label: isWeapon ? t('r4Issue') : t('r4Headhunt'),
        description: t('rarityCountDescription', { rarity: 4 }),
        value: r4,
      },
      {
        label: isWeapon ? t('r5Issue') : t('r5Headhunt'),
        description: t('rarityCountDescription', { rarity: 5 }),
        value: r5,
      },
      {
        label: isWeapon ? t('r6Issue') : t('r6Headhunt'),
        description: t('rarityCountDescription', { rarity: 6 }),
        value: r6,
      },
      {
        label: t('r6AvgPity'),
        description: t('r6AvgPityDescription'),
        value: hasR6 ? Math.round(stats?.r6AvgPity ?? 0) : '-',
      },
    ];

    if (hash === 'joint' || hash === 'standard' || hash === 'beginner') {
      return base;
    }

    const extra = [
      ...(!isWeapon
        ? [
            {
              label: t('rotateWinRate'),
              description: t('rotateWinRateDescription'),
              value: hasR6
                ? `${Math.round((stats?.rotateWin ?? 0) * 100)}%`
                : '-',
            },
          ]
        : []),
      {
        label: t('rateupWinRate'),
        description: t('rateupWinRateDescription'),
        value: hasR6 ? `${Math.round((stats?.rateupWin ?? 0) * 100)}%` : '-',
      },
    ];

    return [...base, ...extra];
  }, [stats, hash, locale, t]);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-neutral-800/80 px-3 py-2">
      <h2 className="text-xl font-bold">{label}</h2>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))' }}
      >
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-neutral-900/80 px-2 py-1"
          >
            <span className="flex max-w-full items-center justify-center gap-1.5 text-center text-sm font-semibold text-white">
              <span className="line-clamp-1">{detail.label}</span>
              <Tooltip title={detail.description} position="top">
                <button
                  type="button"
                  className="shrink-0 cursor-help rounded-full text-white/35 transition-colors hover:text-yellow-300 focus-visible:text-yellow-300 focus-visible:outline-none"
                  aria-label={t('showDescription', { label: detail.label })}
                >
                  <FaCircleInfo className="text-xs" />
                </button>
              </Tooltip>
            </span>
            <span className="line-clamp-1 font-semibold text-white/80">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
