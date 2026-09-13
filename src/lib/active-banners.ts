import type { Banners } from '@/types/banner';

export function getActiveLimitedBanners(banners: Banners, now: number) {
  return Object.values(banners)
    .filter(
      (banner) =>
        !banner.id.startsWith('weaponbox') &&
        now >= (banner.startTime ?? 0) &&
        now <= (banner.endTime ?? Infinity)
    )
    .sort((a, b) => (b.startTime ?? 0) - (a.startTime ?? 0));
}
