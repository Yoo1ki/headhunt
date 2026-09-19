import { TRACKER_CONFIG } from '@/config/tracker';
import { headhuntTypes } from '@/data/tracker/headhunt-types';
import type {
  DataImportRecord,
  GameRecordOperator,
  GameRecordOther,
  GameRecordWeapon,
  ResGameRecord,
} from '@/types/import';
import { jsonError, jsonSuccess } from '@/lib/api-response';
import { fetchJsonWithRetry } from '@/lib/fetch-json-with-retry';
import { parseJsonRequest } from '@/lib/parse-json-request';
import { importPayloadSchema } from '@/lib/validators/import-payload';

type GameRecord = GameRecordOperator | GameRecordWeapon | GameRecordOther;

const isOperatorDraw = (record: GameRecord): record is GameRecordOperator =>
  record.kind === 'draw' && 'charId' in record;

const isWeaponDraw = (record: GameRecord): record is GameRecordWeapon =>
  record.kind === 'draw' && 'weaponId' in record;

export async function POST(req: Request) {
  const processType = new URL(req.url).pathname.endsWith('/sync')
    ? 'sync'
    : 'import';
  const body = await parseJsonRequest(req);
  const payload = importPayloadSchema.safeParse(body);
  if (!payload.success) return jsonError('Bad Request');

  const { type_id: headhuntTypeId, url, last_id: lastId } = payload.data;
  const type = headhuntTypes.find(
    (headhuntType) => headhuntType.id === headhuntTypeId
  )!;
  const serverIds =
    url.server === TRACKER_CONFIG.import.autoServerId
      ? TRACKER_CONFIG.import.serverIds
      : [url.server];
  let serverId = serverIds[0];
  let res: ResGameRecord | null = null;

  for (const candidateServerId of serverIds) {
    const params = new URLSearchParams({
      lang: TRACKER_CONFIG.import.language,
      ...(lastId ? { seq_id: lastId.toString() } : {}),
      ...(type.poolType ? { pool_type: type.poolType } : {}),
      token: url.token,
      server_id: candidateServerId,
    });
    const recordUrl = new URL(type.endpoint, TRACKER_CONFIG.api.baseUrl);
    recordUrl.search = params.toString();
    res = await fetchJsonWithRetry<ResGameRecord>(recordUrl, {
      context: `tracker.${processType}.v2`,
    });

    if (res?.code === 0) {
      serverId = candidateServerId;
      break;
    }
  }

  if (res?.code === 40100) return jsonError('Invalid Token', 401);
  if (res?.code !== 0) return jsonError('Unknown Error', 500);

  const data: DataImportRecord = {
    list: res.data.list.flatMap((record) => {
      if (isOperatorDraw(record)) {
        return [
          {
            id: Number(record.seqId),
            bannerId: record.poolId,
            itemId: record.charId,
            rarity: record.rarity,
            isFree: record.isFree,
            isNew: record.isNew,
            timestamp: Number(record.gachaTs),
          },
        ];
      }

      if (isWeaponDraw(record)) {
        return [
          {
            id: Number(record.seqId),
            bannerId: record.poolId,
            itemId: record.weaponId,
            rarity: record.rarity,
            isNew: record.isNew,
            timestamp: Number(record.gachaTs),
          },
        ];
      }

      return [];
    }),
    hasMore: res.data.hasMore,
    nextId: Number(res.data.list.at(-1)?.seqId) || undefined,
    ...(url.server === TRACKER_CONFIG.import.autoServerId ? { serverId } : {}),
  };

  return jsonSuccess(data);
}
