import { headhuntTypes, HeadhuntTypeId } from '@/data/tracker/headhunt-types';
import bannerCatalog from '@/data/tracker/banners/en.json';
import type { Banners } from '@/types/banner';
import type { Headhunt, Profile, RecordItem } from '@/types/profile';
import { GachaResult } from '@/types/profile';
import { summarizeTrackerRecords } from './tracker-stats';

const usesBannerPity = (typeId: string) =>
  typeId === HeadhuntTypeId.Weponbox || typeId === HeadhuntTypeId.Joint;

const typeConfig = new Map(headhuntTypes.map((type) => [type.id, type]));
const banners = bannerCatalog as Banners;

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

type PityState = { pity5: number; pity6: number };
type GuaranteeState = { pullCount: number; hasRateup: boolean };

const rebuildRecords = (headhunt: Headhunt) => {
  const chronologicalRecords = Object.entries(headhunt.records)
    .flatMap(([typeId, records]) =>
      (records ?? []).filter(isRecord).map((record) => ({ ...record, typeId }))
    )
    .sort((a, b) => a.timestamp - b.timestamp || a.id - b.id);

  const pityStates = new Map<string, PityState>();
  const guaranteeStates = new Map<string, GuaranteeState>();
  const rebuiltRecords: Record<string, RecordItem[]> = {};

  for (const record of chronologicalRecords) {
    const type = typeConfig.get(record.typeId as HeadhuntTypeId);
    const banner = banners[record.bannerId];
    const isFree = record.isFree === true || record.pity === 0;
    const pityKey = usesBannerPity(record.typeId)
      ? record.bannerId
      : record.typeId;
    const pityState = pityStates.get(pityKey) ?? { pity5: 0, pity6: 0 };
    let pity = 0;
    let result =
      record.itemId === banner?.rateup
        ? GachaResult.Rateup
        : banner?.rotate?.includes(record.itemId)
          ? GachaResult.Rotate
          : GachaResult.Lose;

    if (!isFree) {
      pity = 1;
      pityState.pity5++;
      pityState.pity6++;

      if (record.rarity === 5) {
        pity = Math.min(pityState.pity5, pityState.pity6);
        pityState.pity5 = 0;
      }
      if (record.rarity === 6) {
        pity = pityState.pity6;
        pityState.pity6 = 0;
      }
      pityStates.set(pityKey, pityState);

      const guaranteeState = guaranteeStates.get(record.bannerId) ?? {
        pullCount: 0,
        hasRateup: false,
      };
      guaranteeState.pullCount++;
      const isRateup = record.itemId === banner?.rateup;
      if (
        isRateup &&
        guaranteeState.pullCount === (type?.guaranteeAt ?? Infinity) &&
        !guaranteeState.hasRateup
      ) {
        result = GachaResult.Guarantee;
      }
      if (isRateup) guaranteeState.hasRateup = true;
      guaranteeStates.set(record.bannerId, guaranteeState);
    }

    const rebuiltRecord: RecordItem = {
      id: record.id,
      typeId: record.typeId,
      bannerId: record.bannerId,
      itemId: record.itemId,
      rarity: record.rarity,
      pity,
      isFree,
      isNew: record.isNew,
      result,
      timestamp: record.timestamp,
    };
    rebuiltRecords[record.typeId] = [
      rebuiltRecord,
      ...(rebuiltRecords[record.typeId] ?? []),
    ];
  }

  return { records: rebuiltRecords, pityStates };
};

export const rebuildHeadhuntForV2 = (headhunt: Headhunt): Headhunt => {
  const { records, pityStates } = rebuildRecords(headhunt);
  const types: Headhunt['types'] = {};

  for (const typeId of Object.keys(records)) {
    const typeRecords = records[typeId] ?? [];
    const pity = pityStates.get(typeId);
    types[typeId] = {
      id: typeId,
      lastRecordId: typeRecords.reduce(
        (latest, record) => Math.max(latest, record.id),
        0
      ),
      ...(!usesBannerPity(typeId)
        ? {
            r5Pity: Math.min(pity?.pity5 ?? 0, pity?.pity6 ?? 0),
            r6Pity: pity?.pity6 ?? 0,
          }
        : {}),
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

  const banners: Headhunt['banners'] = {};

  for (const bannerId of recordsByBanner.keys()) {
    const bannerRecords = recordsByBanner.get(bannerId) ?? [];
    const typeId = bannerRecords[0]?.typeId;
    if (!typeId) continue;
    const pity = pityStates.get(bannerId);

    banners[bannerId] = {
      id: bannerId,
      typeId,
      ...(usesBannerPity(typeId)
        ? {
            r5Pity: Math.min(pity?.pity5 ?? 0, pity?.pity6 ?? 0),
            r6Pity: pity?.pity6 ?? 0,
          }
        : {}),
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
