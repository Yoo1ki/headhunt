import { CONFIG } from "@/config";
import { BannerItem, TypeItem } from "@/types/profile";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";

type DetailRecordsProps = {
  label?: string;
  stats: TypeItem | BannerItem | undefined;
  hash: string;
};

export const DetailRecords = ({
  label = "Unknown",
  stats,
  hash,
}: DetailRecordsProps) => {
  const t = useTranslations("TrackerPage.DetailRecords");
  const locale = useLocale();

  const details = useMemo(() => {
    const isWeapon = hash.startsWith("weponbox");

    const localeValue =
      CONFIG.locales.find((l) => l.id === locale)?.value ?? "en-US";

    const r4 = stats?.r4Count ?? 0;
    const r5 = stats?.r5Count ?? 0;
    const r6 = stats?.r6Count ?? 0;

    const totalPulls = r4 + r5 + r6;
    const hasR6 = r6 > 0;

    const currencyMultiplier = isWeapon ? 198 : 500;

    const base = [
      {
        label: isWeapon ? t("totalIssue") : t("totalHeadhunt"),
        value: totalPulls,
      },
      {
        label: isWeapon ? t("totalArsenalTicket") : t("totalOroberyl"),
        value: (totalPulls * currencyMultiplier).toLocaleString(localeValue),
      },
      {
        label: isWeapon ? t("r4Issue") : t("r4Headhunt"),
        value: r4,
      },
      {
        label: isWeapon ? t("r5Issue") : t("r5Headhunt"),
        value: r5,
      },
      {
        label: isWeapon ? t("r6Issue") : t("r6Headhunt"),
        value: r6,
      },
      {
        label: t("r6AvgPity"),
        value: hasR6 ? Math.round(stats?.r6AvgPity ?? 0) : "-",
      },
    ];

    if (hash === "standard" || hash === "beginner") {
      return base;
    }

    const extra = [
      ...(!isWeapon
        ? [
            {
              label: t("rotateWinRate"),
              value: hasR6
                ? `${Math.round((stats?.rotateWin ?? 0) * 100)}%`
                : "-",
            },
          ]
        : []),
      {
        label: t("rateupWinRate"),
        value: hasR6 ? `${Math.round((stats?.rateupWin ?? 0) * 100)}%` : "-",
      },
    ];

    return [...base, ...extra];
  }, [stats, hash, locale, t]);

  return (
    <div className="flex flex-col gap-4 bg-neutral-800/80 rounded-xl px-3 py-2">
      <h2 className="font-bold text-xl">{label}</h2>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))" }}
      >
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex flex-col gap-1 justify-center items-center bg-neutral-900/80 rounded-xl px-2 py-1"
          >
            <span className="text-sm font-semibold text-center text-white line-clamp-1">
              {detail.label}
            </span>
            <span className="font-semibold text-white/80 line-clamp-1">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
