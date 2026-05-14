"use client";

import { create } from "zustand";
import { useStorageStore } from "./useStorageStore";
import { headhuntTypes } from "@/data/tracker/headhunt-types";
import {
  BannerItem,
  GachaResult,
  Headhunt,
  RecordItem,
  TypeItem,
} from "@/types/profile";
import { ImportRecordItem, ResImportRecord } from "@/types/import";
import banners from "@/data/tracker/banners/en.json";
import { Banners } from "@/types/banner";
import { fetchWithRetry } from "@/lib/fetch-with-retry";

type TProcessType = "import" | "sync";

type ImportState = {
  processType: TProcessType;
  isImporting: boolean;
  totalRecord: number;
  errorType: "unknown" | "expired" | "network" | null;

  importRecords: (url: string, processType?: TProcessType) => Promise<void>;
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
  const newCount = newData.count;

  const totalCount = oldCount + newCount;

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
  const newCount = records.reduce(
    (acc, record) => {
      if (record.pity === 0) acc.free++;

      switch (record.rarity) {
        case 4:
          acc.r4++;
          break;
        case 5:
          acc.r5++;
          acc.r5Pity += record.pity;
          break;
        case 6:
          acc.r6++;
          acc.r6Pity += record.pity;
          break;
      }

      switch (record.result) {
        case GachaResult.Rotate:
          acc.rotateWin++;
          break;
        case GachaResult.Rateup:
          acc.rotateWin++;
          acc.rateupWin++;
          break;
        case GachaResult.Guarantee:
          acc.guarantee++;
          break;
      }

      return acc;
    },
    {
      r4: 0,
      r5: 0,
      r6: 0,
      free: 0,
      r5Pity: 0,
      r6Pity: 0,
      rotateWin: 0,
      rateupWin: 0,
      guarantee: 0,
    },
  );

  const r4Count = (oldData?.r4Count ?? 0) + newCount.r4;
  const r5Count = (oldData?.r5Count ?? 0) + newCount.r5;
  const r6Count = (oldData?.r6Count ?? 0) + newCount.r6;
  const freeCount = (oldData?.freeCount ?? 0) + newCount.free;

  const oldAttempt = (oldData?.r6Count ?? 0) - (oldData?.guarantee ?? 0);
  const oldRotateWinCount = (oldData?.rotateWin ?? 0) * oldAttempt;
  const oldRateupWinCount = (oldData?.rateupWin ?? 0) * oldAttempt;
  const rotateWinCount = oldRotateWinCount + newCount.rotateWin;
  const rateupWinCount = oldRateupWinCount + newCount.rateupWin;

  const guarantee = (oldData?.guarantee ?? 0) + newCount.guarantee;
  const attempt = r6Count - guarantee;

  const r5AvgPity = combineAverage(
    { avg: oldData?.r5AvgPity, count: oldData?.r5Count },
    { pityCount: newCount.r5Pity, count: newCount.r5 },
  );

  const r6AvgPity = combineAverage(
    { avg: oldData?.r6AvgPity, count: oldData?.r6Count },
    { pityCount: newCount.r6Pity, count: newCount.r6 },
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
  processType: "import",
  isImporting: false,
  totalRecord: 0,
  errorType: null,

  importRecords: async (url, processType = "import") => {
    const { getCurrentProfile, setProfile } = useStorageStore.getState();

    const profile = getCurrentProfile();
    if (!profile) return;

    const headhuntBanners: HeadhuntBanners = Object.fromEntries(
      Object.entries(banners as Banners).map(([key, value]) => [
        key,
        {
          id: value.id,
          rateup: value.rateup,
          rotate: value.rotate,
        },
      ]),
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

      const list: ImportRecordItem[] = [];
      let hasMore = true;

      while (hasMore) {
        try {
          // Metode ini harus diganti jika trafik banyak
          // karena ini multiple request
          const response = await fetchWithRetry("/api/v1/tracker/import", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type_id: type.id,
              url: parsedUrl,
              ...(list.at(-1)?.id ? { last_id: list.at(-1)?.id } : {}),
            }),
          });

          if (!response.ok) {
            // Kasih delay minimal 300ms biar notif muncul
            await new Promise((r) => setTimeout(r, 300));
            isError = true;
            set({
              errorType: response.status === 401 ? "expired" : "unknown",
            });
            break;
          }

          const json = (await response.json()) as ResImportRecord;

          const newList = json.data.list.filter(
            (record) => record.id > lastRecordId,
          );

          list.push(...newList);
          set((state) => ({
            totalRecord: state.totalRecord + newList.length,
          }));

          if (newList.length !== json.data.list.length) break;
          hasMore = json.data.hasMore;
        } catch (err: unknown) {
          // Kasih delay minimal 300ms biar notif muncul
          await new Promise((r) => setTimeout(r, 300));
          isError = true;
          set({
            errorType: err instanceof TypeError ? "network" : "unknown",
          });
          break;
        }
      }

      newRawRecords.set(type.id, list);
    }

    //* Check & Get Temporary Missing Banners
    const missingBannerIds = new Set<string>();

    for (const type of headhuntTypes) {
      if (type.id === "beginner" || type.id === "standard") continue;

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
        const res = await fetchWithRetry("/api/v1/tracker/banner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: [...missingBannerIds],
          }),
        });

        if (!res.ok) {
          // Kasih delay minimal 300ms biar notif muncul
          await new Promise((r) => setTimeout(r, 300));
          isError = true;
          set({
            errorType: res.status === 401 ? "expired" : "unknown",
          });
        }

        const json = (await res.json()) as {
          data: HeadhuntBanners;
        };

        const newBanners = json.data;

        for (const [id, banner] of Object.entries(newBanners)) {
          headhuntBanners[id] = banner;
        }
      } catch (err: unknown) {
        // Kasih delay minimal 300ms biar notif muncul
        await new Promise((r) => setTimeout(r, 300));
        isError = true;
        set({
          errorType: err instanceof TypeError ? "network" : "unknown",
        });
      }
    }

    //* PROSES
    for (const type of headhuntTypes) {
      const records = newRawRecords.get(type.id);
      if (!records?.length) continue;

      const isWeapon = type.id === "weponbox";
      const isJoint = type.id === "joint";
      const isWpOrJo = isWeapon || isJoint;

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
        const key = isWpOrJo ? record.bannerId : type.id;
        const old = isWpOrJo ? oldBanner : oldHeadhunt?.types[type.id];
        const _pity = pityMap.get(key) ?? {
          pity5: old?.r5Pity ?? 0,
          pity6: old?.r6Pity ?? 0,
        };
        if (!record.isFree) {
          pity++;
          _pity.pity5++;
          _pity.pity6++;

          if (record.rarity === 5) {
            pity = Math.min(_pity.pity5, _pity.pity6);
            _pity.pity5 = 0;
          }

          if (record.rarity === 6) {
            pity = _pity.pity6;
            _pity.pity6 = 0;
          }

          pityMap.set(key, _pity);

          // Cek Guarantee
          const {
            r4Count = 0,
            r5Count = 0,
            r6Count = 0,
            freeCount = 0,
          } = oldBanner ?? {};
          const count = r4Count + r5Count + r6Count - freeCount;

          const _rateupState = rateupState.get(record.bannerId) ?? {
            no: count,
            hasGotRateup: Boolean(oldBanner?.rateupWin),
          };

          _rateupState.no++;
          const isRateup = record.itemId === banner?.rateup;
          if (
            isRateup &&
            _rateupState.no === (type?.guaranteeAt ?? Infinity) &&
            !_rateupState.hasGotRateup
          ) {
            result = GachaResult.Guarantee;
          }
          if (isRateup) _rateupState.hasGotRateup = true;
          rateupState.set(record.bannerId, _rateupState);
        }

        //* Update Record
        const processedRecord: RecordItem = {
          id: record.id,
          typeId: type.id,
          bannerId: record.bannerId,
          itemId: record.itemId,
          rarity: record.rarity,
          pity,
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
        (record) => record.bannerId,
      ).forEach((records, id) => {
        const pity = pityMap.get(id);
        const stats = getStats({
          records,
          oldData: oldHeadhunt?.banners[id],
        });

        newHeadhunt.banners[id] = {
          id,
          typeId: type.id,
          ...(isWpOrJo
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
        ...(!isWpOrJo
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
      setProfile({
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
      });
    }

    set({ isImporting: false });
  },
}));
