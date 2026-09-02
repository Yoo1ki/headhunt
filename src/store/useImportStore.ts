'use client';

import { create } from 'zustand';
import { useStorageStore } from './useStorageStore';
import { HeadhuntTypeId, headhuntTypes } from '@/data/tracker/headhunt-types';
import type {
  BannerItem,
  Headhunt,
  RecordItem,
  TypeItem,
} from '@/types/profile';
import { GachaResult } from '@/types/profile';
import type { ImportRecordItem, ResImportRecord } from '@/types/import';
import banners from '@/data/tracker/banners/en.json';
import type { Banners } from '@/types/banner';
import { fetchWithRetry } from '@/lib/fetch-with-retry';
import { delay } from '@/lib/delay';
import { summarizeTrackerRecords } from '@/lib/tracker-stats';

type ImportProcessType = 'import' | 'sync';

type ImportState = {
  processType: ImportProcessType;
  isImporting: boolean;
  totalRecord: number;
  errorType: 'unknown' | 'expired' | 'network' | null;

  importRecords: (
    url: string,
    processType?: ImportProcessType,
    profileId?: string
  ) => Promise<void>;
};

type HeadhuntBanners = Record<
  string,
  {
    id: string;
    rateup: string;
    rotate?: string[];
  }
>;

type AvgInput = {
  avg?: number;
  count?: number;
};

type NewData = {
  pityCount: number;
  count: number;
};

function groupBy<T, K>(array: T[], getKey: (item: T) => K): Map<K, T[]> {
  return array.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key)!.push(item);
    return acc;
  }, new Map<K, T[]>());
}

export function combineAverage(oldData: AvgInput, newData: NewData): number {
  const oldAvg = oldData.avg ?? 0;
  const oldCount = oldData.count ?? 0;

  const newTotal = newData.pityCount;
  const incomingCount = newData.count;

  const totalCount = oldCount + incomingCount;

  if (totalCount === 0) return 0;

  return (oldAvg * oldCount + newTotal) / totalCount;
}

function getStats({
  records,
  oldData,
}: {
  records: RecordItem[];
  oldData: BannerItem | TypeItem | undefined;
}) {
  const newStats = summarizeTrackerRecords(records);

  const r4Count = (oldData?.r4Count ?? 0) + newStats.r4Count;
  const r5Count = (oldData?.r5Count ?? 0) + newStats.r5Count;
  const r6Count = (oldData?.r6Count ?? 0) + newStats.r6Count;
  const freeCount = (oldData?.freeCount ?? 0) + newStats.freeCount;

  const oldAttempt = (oldData?.r6Count ?? 0) - (oldData?.guarantee ?? 0);
  const oldRotateWinCount = (oldData?.rotateWin ?? 0) * oldAttempt;
  const oldRateupWinCount = (oldData?.rateupWin ?? 0) * oldAttempt;
  const rotateWinCount = oldRotateWinCount + newStats.rotateWinCount;
  const rateupWinCount = oldRateupWinCount + newStats.rateupWinCount;

  const guarantee = (oldData?.guarantee ?? 0) + newStats.guaranteeCount;
  const attempt = r6Count - guarantee;

  const r5AvgPity = combineAverage(
    { avg: oldData?.r5AvgPity, count: oldData?.r5Count },
    { pityCount: newStats.r5PityTotal, count: newStats.r5Count }
  );

  const r6AvgPity = combineAverage(
    { avg: oldData?.r6AvgPity, count: oldData?.r6Count },
    { pityCount: newStats.r6PityTotal, count: newStats.r6Count }
  );

  const rotateWin = attempt > 0 ? rotateWinCount / attempt : 0;
  const rateupWin = attempt > 0 ? rateupWinCount / attempt : 0;

  return {
    r4Count,
    r5Count,
    r6Count,
    freeCount,
    r5AvgPity,
    r6AvgPity,
    rotateWin,
    rateupWin,
    guarantee,
  };
}

export const useImportStore = create<ImportState>((set) => ({
  processType: 'import',
  isImporting: false,
  totalRecord: 0,
  errorType: null,

  importRecords: async (url, processType = 'import', profileId) => {
    const { profiles, currentProfileId, setProfile } =
      useStorageStore.getState();

    const targetProfileId = profileId ?? currentProfileId;
    const profile = profiles[targetProfileId];
    if (!profile) return;

    const headhuntBanners: HeadhuntBanners = Object.fromEntries(
      Object.entries(banners as Banners).map(([key, value]) => [
        key,
        {
          id: value.id,
          rateup: value.rateup,
          rotate: value.rotate,
        },
      ])
    );

    const parsedUrl = new URL(url);

    let isError = false;
    set({ processType, isImporting: true, totalRecord: 0, errorType: null });

    const oldHeadhunt = profile.stores?.headhunt;

    const newHeadhunt: Headhunt = {
      url,
      types: {},
      banners: {},
      records: {},
    };

    const newRawRecords = new Map<string, ImportRecordItem[]>();

    // Fetch
    for (const type of headhuntTypes) {
      if (isError) break;

      const lastRecordId = oldHeadhunt?.types[type.id]?.lastRecordId ?? 0;

      const fetchedRecords: ImportRecordItem[] = [];
      let hasMore = true;
      let nextId: number | undefined;

      while (hasMore) {
        try {
          // Metode ini harus diganti jika trafik banyak
          // karena ini multiple request
          const response = await fetchWithRetry('/api/v2/tracker/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type_id: type.id,
              url: parsedUrl,
              ...(nextId ? { last_id: nextId } : {}),
            }),
          });

          if (!response.ok) {
            // Kasih delay minimal 300ms biar notif muncul
            await delay(300);
            isError = true;
            set({
              errorType: response.status === 401 ? 'expired' : 'unknown',
            });
            break;
          }

          const json = (await response.json()) as ResImportRecord;
          nextId = json.data.nextId;

          const newRecords = json.data.list.filter(
            (record) => record.id > lastRecordId
          );

          fetchedRecords.push(...newRecords);
          set((state) => ({
            totalRecord: state.totalRecord + newRecords.length,
          }));

          if (newRecords.length !== json.data.list.length) break;
          hasMore = json.data.hasMore;
          if (hasMore && !nextId) break;
        } catch (err: unknown) {
          // Kasih delay minimal 300ms biar notif muncul
          await delay(300);
          isError = true;
          set({
            errorType: err instanceof TypeError ? 'network' : 'unknown',
          });
          break;
        }
      }

      newRawRecords.set(type.id, fetchedRecords);
    }

    //* Check & Get Temporary Missing Banners
    const missingBannerIds = new Set<string>();

    for (const type of headhuntTypes) {
      if (
        type.id === HeadhuntTypeId.Beginner ||
        type.id === HeadhuntTypeId.Standard
      ) {
        continue;
      }

      const records = newRawRecords.get(type.id);
      if (!records?.length) continue;

      for (const { bannerId } of records) {
        if (!headhuntBanners[bannerId]) {
          missingBannerIds.add(bannerId);
        }
      }
    }

    if (missingBannerIds.size) {
      try {
        const response = await fetchWithRetry('/api/v1/tracker/banner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ids: [...missingBannerIds],
          }),
        });

        if (!response.ok) {
          // Kasih delay minimal 300ms biar notif muncul
          await delay(300);
          isError = true;
          set({
            errorType: response.status === 401 ? 'expired' : 'unknown',
          });
        }

        if (response.ok) {
          const json = (await response.json()) as {
            data: HeadhuntBanners;
          };

          for (const [id, banner] of Object.entries(json.data)) {
            headhuntBanners[id] = banner;
          }
        }
      } catch (err: unknown) {
        // Kasih delay minimal 300ms biar notif muncul
        await delay(300);
        isError = true;
        set({
          errorType: err instanceof TypeError ? 'network' : 'unknown',
        });
      }
    }

    //* PROSES
    for (const type of headhuntTypes) {
      const records = newRawRecords.get(type.id);
      if (!records?.length) continue;

      const isWeapon = type.id === HeadhuntTypeId.Weponbox;
      const isJoint = type.id === HeadhuntTypeId.Joint;
      const usesBannerPity = isWeapon || isJoint;

      const oldType = oldHeadhunt?.types[type.id];

      // Pity Map
      const pityMap = new Map<string, { pity5: number; pity6: number }>();

      // Cek Rateup
      const rateupState = new Map<
        string,
        { no: number; hasGotRateup: boolean }
      >();

      // Last Record Id
      let lastRecordId: number = 0;

      for (let i = records.length - 1; i >= 0; i--) {
        const record = records[i];
        lastRecordId = record.id;
        const banner = headhuntBanners[record.bannerId];

        const oldBanner = oldHeadhunt?.banners[record.bannerId];

        let pity: number = 0;

        let result: GachaResult =
          record.itemId === banner?.rateup
            ? GachaResult.Rateup
            : banner?.rotate?.includes(record.itemId)
              ? GachaResult.Rotate
              : GachaResult.Lose;

        // Hitung Pity
        const pityKey = usesBannerPity ? record.bannerId : type.id;
        const previousPity = usesBannerPity
          ? oldBanner
          : oldHeadhunt?.types[type.id];
        const pityState = pityMap.get(pityKey) ?? {
          pity5: previousPity?.r5Pity ?? 0,
          pity6: previousPity?.r6Pity ?? 0,
        };
        if (!record.isFree) {
          pity++;
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

          pityMap.set(pityKey, pityState);

          // Cek Guarantee
          const {
            r4Count = 0,
            r5Count = 0,
            r6Count = 0,
            freeCount = 0,
          } = oldBanner ?? {};
          const count = r4Count + r5Count + r6Count - freeCount;

          const currentRateupState = rateupState.get(record.bannerId) ?? {
            no: count,
            hasGotRateup: Boolean(oldBanner?.rateupWin),
          };

          currentRateupState.no++;
          const isRateup = record.itemId === banner?.rateup;
          if (
            isRateup &&
            currentRateupState.no === (type?.guaranteeAt ?? Infinity) &&
            !currentRateupState.hasGotRateup
          ) {
            result = GachaResult.Guarantee;
          }
          if (isRateup) currentRateupState.hasGotRateup = true;
          rateupState.set(record.bannerId, currentRateupState);
        }

        //* Update Record
        const processedRecord: RecordItem = {
          id: record.id,
          typeId: type.id,
          bannerId: record.bannerId,
          itemId: record.itemId,
          rarity: record.rarity,
          pity,
          isFree: record.isFree,
          isNew: record.isNew,
          result,
          timestamp: record.timestamp,
        };

        newHeadhunt.records[type.id] = [
          processedRecord,
          ...(newHeadhunt.records[type.id] ?? []),
        ];
      }

      //* Update Banner
      groupBy(
        newHeadhunt.records[type.id] ?? [],
        (record) => record.bannerId
      ).forEach((records, id) => {
        const pity = pityMap.get(id);
        const stats = getStats({
          records,
          oldData: oldHeadhunt?.banners[id],
        });

        newHeadhunt.banners[id] = {
          id,
          typeId: type.id,
          ...(usesBannerPity
            ? {
                r5Pity: Math.min(pity?.pity5 ?? 0, pity?.pity6 ?? 0),
                r6Pity: pity?.pity6 ?? 0,
              }
            : {}),
          r4Count: stats.r4Count,
          r5Count: stats.r5Count,
          r6Count: stats.r6Count,
          freeCount: stats.freeCount,
          r5AvgPity: stats.r5AvgPity,
          r6AvgPity: stats.r6AvgPity,
          rotateWin: stats.rotateWin,
          rateupWin: stats.rateupWin,
          guarantee: stats.guarantee,
        };
      });

      //* Update Type
      const pity = pityMap.get(type.id);
      const stats = getStats({
        records: newHeadhunt.records[type.id] ?? [],
        oldData: oldType,
      });

      newHeadhunt.types[type.id] = {
        id: type.id,
        lastRecordId,
        ...(!usesBannerPity
          ? {
              r5Pity: Math.min(pity?.pity5 ?? 0, pity?.pity6 ?? 0),
              r6Pity: pity?.pity6 ?? 0,
            }
          : {}),
        r4Count: stats.r4Count,
        r5Count: stats.r5Count,
        r6Count: stats.r6Count,
        freeCount: stats.freeCount,
        r5AvgPity: stats.r5AvgPity,
        r6AvgPity: stats.r6AvgPity,
        rotateWin: stats.rotateWin,
        rateupWin: stats.rateupWin,
        guarantee: stats.guarantee,
      };
    }

    const oldRecords = oldHeadhunt?.records ?? {};
    const mergedRecords: typeof oldRecords = { ...oldRecords };

    for (const typeId in newHeadhunt.records) {
      const oldList = oldRecords[typeId] ?? [];
      const newList = newHeadhunt.records[typeId] ?? [];

      mergedRecords[typeId] = [...newList, ...oldList];
    }

    if (!isError) {
      setProfile(
        {
          ...profile,
          stores: {
            ...(profile?.stores ?? {}),
            headhunt: {
              url: newHeadhunt.url,
              types: {
                ...(oldHeadhunt?.types ?? {}),
                ...newHeadhunt.types,
              },
              banners: {
                ...(oldHeadhunt?.banners ?? {}),
                ...newHeadhunt.banners,
              },
              records: mergedRecords,
            },
          },
        },
        { makeActive: false }
      );
    }

    set({ isImporting: false });
  },
}));
