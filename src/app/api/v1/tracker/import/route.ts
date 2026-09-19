import { TRACKER_CONFIG } from '@/config/tracker';
import { headhuntTypes } from '@/data/tracker/headhunt-types';
import type {
  DataImportRecord,
  GameRecordOperator,
  GameRecordOther,
  GameRecordWeapon,
  ResGameRecord,
} from '@/types/import';
import { fetchJsonWithRetry } from '@/lib/fetch-json-with-retry';
import { importPayloadSchema } from '@/lib/validators/import-payload';
import { jsonError, jsonSuccess } from '@/lib/api-response';
import { parseJsonRequest } from '@/lib/parse-json-request';

function isOperator(
  record: GameRecordOperator | GameRecordWeapon | GameRecordOther
): record is GameRecordOperator {
  return 'charId' in record;
}

export async function POST(req: Request) {
  const body = await parseJsonRequest(req);
  const payload = importPayloadSchema.safeParse(body);
  if (!payload.success) return jsonError('Bad Request');

  const { type_id: headhuntTypeId, url, last_id: lastId } = payload.data;
  const type = headhuntTypes.find(
    (headhuntType) => headhuntType.id === headhuntTypeId
  )!;
  const params = new URLSearchParams({
    lang: 'en-us',
    ...(lastId ? { seq_id: lastId.toString() } : {}),
    ...(type.poolType ? { pool_type: type.poolType } : {}),
    token: url.token,
    server_id: url.server,
  });
  const recordUrl = new URL(type.endpoint, TRACKER_CONFIG.api.baseUrl);
  recordUrl.search = params.toString();

  const res = await fetchJsonWithRetry<ResGameRecord>(recordUrl, {
    context: 'tracker.import.v1',
  });
  if (res?.code === 40100) return jsonError('Invalid Token', 401);
  if (res?.code !== 0) return jsonError('Unknown Error', 500);

  const data: DataImportRecord = {
    list: res.data.list.map((record) => {
      if (isOperator(record)) {
        return {
          id: Number(record.seqId),
          bannerId: record.poolId,
          itemId: record.charId,
          rarity: record.rarity,
          isFree: record.isFree,
          isNew: record.isNew,
          timestamp: Number(record.gachaTs),
        };
      }

      const weaponRecord = record as GameRecordWeapon;
      return {
        id: Number(weaponRecord.seqId),
        bannerId: weaponRecord.poolId,
        itemId: weaponRecord.weaponId,
        rarity: weaponRecord.rarity,
        isNew: weaponRecord.isNew,
        timestamp: Number(weaponRecord.gachaTs),
      };
    }),
    hasMore: res.data.hasMore,
  };

  return jsonSuccess(data);
}
