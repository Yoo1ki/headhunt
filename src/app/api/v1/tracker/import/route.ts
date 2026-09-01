import { CONFIG } from '@/config';
import { headhuntTypes } from '@/data/tracker/headhunt-types';
import type {
  DataImportRecord,
  GameRecordOperator,
  GameRecordWeapon,
  ResGameRecord,
} from '@/types/import';
import { fetchJsonWithRetry } from '@/lib/fetch-json-with-retry';
import { importPayloadSchema } from '@/lib/validators/import-payload';
import { jsonError, jsonSuccess } from '@/lib/api-response';
import { parseJsonRequest } from '@/lib/parse-json-request';

function isOperator(
  e: GameRecordOperator | GameRecordWeapon
): e is GameRecordOperator {
  return 'charId' in e;
}

export async function POST(req: Request) {
  const body = await parseJsonRequest(req);

  // Validasi Payload
  const payload = importPayloadSchema.safeParse(body);
  if (!payload.success) {
    return jsonError('Bad Request');
  }
  const { type_id: headhuntTypeId, url, last_id: lastId } = payload.data;

  // Gabungkan API URL & Path
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

  const recordUrl = new URL(type.endpoint, CONFIG.endfieldBaseUrl);

  recordUrl.search = params.toString();

  // Fetch API
  // Metode ini harus diganti jika trafik banyak
  // karena ini multiple request
  const res = await fetchJsonWithRetry<ResGameRecord>(recordUrl, {
    context: 'tracker.import',
  });

  // Cek Error Invalid Token
  if (res?.code === 40100) {
    return jsonError('Invalid Token', 401);
  }
  // Cek Error Lain
  if (res?.code !== 0) {
    return jsonError('Unknown Error', 500);
  }

  // Menyiapkan data output
  const data: DataImportRecord = {
    list: res.data.list.map((record) => {
      if (isOperator(record)) {
        const operatorRecord = record as GameRecordOperator;
        return {
          id: Number(operatorRecord.seqId),
          bannerId: operatorRecord.poolId,
          itemId: operatorRecord.charId,
          rarity: operatorRecord.rarity,
          isFree: operatorRecord.isFree,
          isNew: operatorRecord.isNew,
          timestamp: Number(operatorRecord.gachaTs),
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

  // Kirim Response
  return jsonSuccess(data);
}
