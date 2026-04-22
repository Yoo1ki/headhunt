import { CONFIG } from "@/config";
import { headhuntTypes } from "@/data/tracker/headhunt-types";
import {
  DataImportRecord,
  GameRecordOperator,
  GameRecordWeapon,
  ResGameRecord,
} from "@/types/import";
import { importPayloadSchema } from "@/lib/validators/import-payload";
import { jsonError, jsonSuccess } from "@/lib/api-response";

function isOperator(
  e: GameRecordOperator | GameRecordWeapon,
): e is GameRecordOperator {
  return "charId" in e;
}

export async function POST(req: Request) {
  const body = await req.json();

  // Validasi Payload
  const payload = importPayloadSchema.safeParse(body);
  if (!payload.success) {
    return jsonError("Bad Request");
  }
  const { type_id: HeadhuntTypeId, url, last_id: lastId } = payload.data;

  // Gabungkan API URL & Path
  const type = headhuntTypes.find((type) => type.id === HeadhuntTypeId)!;

  const params = new URLSearchParams({
    lang: "en-us",
    ...(lastId ? { seq_id: lastId.toString() } : {}),
    ...(type.poolType ? { pool_type: type.poolType } : {}),
    token: url.token,
    server_id: url.server,
  });

  const recordUrl = new URL(type.endpoint, CONFIG.endfieldBaseUrl);

  recordUrl.search = params.toString();

  // Fetch API
  const maxRetries = 3;
  let attempts = 0;
  let res: ResGameRecord | null = null;
  let success = false;

  // Metode ini harus diganti jika trafik banyak
  // karena ini multiple request
  while (attempts < maxRetries && !success) {
    try {
      const response = await fetch(recordUrl);
      if (!response.ok) {
        attempts++;
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }
      res = await response.json();
      success = true;
    } catch (err) {
      console.error(`Attempt ${attempts + 1} failed:`, err);
      attempts++;
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  // Cek Error Invalid Token
  if (success && res?.code === 40100) {
    return jsonError("Invalid Token", 401);
  }
  // Cek Error Lain
  if (!success || res?.code !== 0) {
    return jsonError("Unknown Error", 500);
  }

  // Menyiapkan data output
  const data: DataImportRecord = {
    list: res.data.list.map((e) => {
      if (isOperator(e)) {
        const list = e as GameRecordOperator;
        return {
          id: Number(list.seqId),
          bannerId: list.poolId,
          itemId: list.charId,
          rarity: list.rarity,
          isFree: list.isFree,
          isNew: list.isNew,
          timestamp: Number(list.gachaTs),
        };
      }

      const list = e as GameRecordWeapon;
      return {
        id: Number(list.seqId),
        bannerId: list.poolId,
        itemId: list.weaponId,
        rarity: list.rarity,
        isNew: list.isNew,
        timestamp: Number(list.gachaTs),
      };
    }),
    hasMore: res.data.hasMore,
  };

  // Kirim Response
  return jsonSuccess(data);
}
