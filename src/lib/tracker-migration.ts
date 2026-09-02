import { HeadhuntTypeId } from '@/data/tracker/headhunt-types';
import type { Headhunt, Profile, RecordItem } from '@/types/profile';
import { summarizeTrackerRecords } from './tracker-stats';

const usesBannerPity = (typeId: string) =>
  typeId === HeadhuntTypeId.Weponbox || typeId === HeadhuntTypeId.Joint;

const isRecord = (value: unknown): value is RecordItem => {
  if (!value || typeof value !== 'object') return false;
  const record = value as Partial<RecordItem>;

  return (
    typeof record.id === 'number' &&
    Number.isFinite(record.id) &&
    typeof record.typeId === 'string' &&
    Boolean(record.typeId) &&
    typeof record.bannerId === 'string' &&
    Boolean(record.bannerId) &&
    typeof record.itemId === 'string' &&
    Boolean(record.itemId) &&
    typeof record.rarity === 'number' &&
    record.rarity >= 1 &&
    record.rarity <= 6 &&
    typeof record.timestamp === 'number' &&
    Number.isFinite(record.timestamp)
  );
};

const calculateStats = (records: RecordItem[]) => {
  const summary = summarizeTrackerRecords(records);
  const {
    r4Count,
    r5Count,
    r6Count,
    freeCount,
    r5PityTotal,
    r6PityTotal,
    rotateWinCount,
    rateupWinCount,
    guaranteeCount: guarantee,
  } = summary;

  const attempt = r6Count - guarantee;

  return {
    r4Count,
    r5Count,
    r6Count,
    freeCount,
    r5AvgPity: r5Count ? r5PityTotal / r5Count : 0,
    r6AvgPity: r6Count ? r6PityTotal / r6Count : 0,
    rotateWin: attempt > 0 ? rotateWinCount / attempt : 0,
    rateupWin: attempt > 0 ? rateupWinCount / attempt : 0,
    guarantee,
  };
};

const calculatePity = (records: RecordItem[]) => {
  let pity5 = 0;
  let pity6 = 0;

  const chronologicalRecords = [...records].sort(
    (a, b) => a.timestamp - b.timestamp || a.id - b.id
  );

  for (const record of chronologicalRecords) {
    if (record.isFree || record.pity === 0) continue;

    pity5++;
    pity6++;
    if (record.rarity === 5) pity5 = 0;
    if (record.rarity === 6) pity6 = 0;
  }

  return { r5Pity: Math.min(pity5, pity6), r6Pity: pity6 };
};

export const rebuildHeadhuntForV2 = (headhunt: Headhunt): Headhunt => {
  const records = Object.fromEntries(
    Object.entries(headhunt.records).map(([typeId, items]) => [
      typeId,
      (items ?? []).filter(isRecord),
    ])
  );

  const typeIds = new Set([
    ...Object.keys(headhunt.types),
    ...Object.keys(records),
  ]);
  const types: Headhunt['types'] = {};

  for (const typeId of typeIds) {
    const typeRecords = records[typeId] ?? [];
    types[typeId] = {
      id: typeId,
      lastRecordId: typeRecords.reduce(
        (latest, record) => Math.max(latest, record.id),
        0
      ),
      ...(!usesBannerPity(typeId) ? calculatePity(typeRecords) : {}),
      ...calculateStats(typeRecords),
    };
  }

  const recordsByBanner = new Map<string, RecordItem[]>();
  for (const typeRecords of Object.values(records)) {
    for (const record of typeRecords ?? []) {
      const bannerRecords = recordsByBanner.get(record.bannerId) ?? [];
      bannerRecords.push(record);
      recordsByBanner.set(record.bannerId, bannerRecords);
    }
  }

  const bannerIds = new Set([
    ...Object.keys(headhunt.banners),
    ...recordsByBanner.keys(),
  ]);
  const banners: Headhunt['banners'] = {};

  for (const bannerId of bannerIds) {
    const bannerRecords = recordsByBanner.get(bannerId) ?? [];
    const typeId =
      bannerRecords[0]?.typeId ?? headhunt.banners[bannerId]?.typeId;
    if (!typeId) continue;

    banners[bannerId] = {
      id: bannerId,
      typeId,
      ...(usesBannerPity(typeId) ? calculatePity(bannerRecords) : {}),
      ...calculateStats(bannerRecords),
    };
  }

  return { ...headhunt, types, banners, records };
};

export const migrateProfilesToV2 = (
  profiles: Record<string, Profile>
): Record<string, Profile> =>
  Object.fromEntries(
    Object.entries(profiles).map(([id, profile]) => [
      id,
      profile.stores?.headhunt
        ? {
            ...profile,
            id,
            stores: {
              ...profile.stores,
              headhunt: rebuildHeadhuntForV2(profile.stores.headhunt),
            },
          }
        : { ...profile, id },
    ])
  );
