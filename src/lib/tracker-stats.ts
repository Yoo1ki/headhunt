import type { RecordItem } from '@/types/profile';
import { GachaResult } from '@/types/profile';

export const summarizeTrackerRecords = (records: RecordItem[]) =>
  records.reduce(
    (summary, record) => {
      // Backups created before `isFree` was stored use pity 0 for free pulls.
      const isFree = record.isFree === true || record.pity === 0;
      if (isFree) summary.freeCount++;

      if (record.rarity === 4) summary.r4Count++;
      if (record.rarity === 5) {
        summary.r5Count++;
        summary.r5PityTotal += record.pity;
      }
      if (record.rarity === 6) {
        summary.r6Count++;
        summary.r6PityTotal += record.pity;
      }

      if (
        record.result === GachaResult.Rotate ||
        record.result === GachaResult.Rateup
      ) {
        summary.rotateWinCount++;
      }
      if (record.result === GachaResult.Rateup) summary.rateupWinCount++;
      if (record.result === GachaResult.Guarantee) summary.guaranteeCount++;

      return summary;
    },
    {
      r4Count: 0,
      r5Count: 0,
      r6Count: 0,
      freeCount: 0,
      r5PityTotal: 0,
      r6PityTotal: 0,
      rotateWinCount: 0,
      rateupWinCount: 0,
      guaranteeCount: 0,
    }
  );
