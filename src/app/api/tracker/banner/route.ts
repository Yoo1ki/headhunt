import { CONFIG } from "@/config";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { bannerPayloadSchema } from "@/lib/validators/banner-payload";
import { GamePoolOperator } from "../../../../../scripts/interfaces/game-pool-operator";
import { GamePoolWeapon } from "../../../../../scripts/interfaces/game-pool-weapon";

type Banner = {
  id: string;
  rateup: string;
  rotate?: string[];
};

export async function POST(req: Request) {
  const body = await req.json();

  // Validasi Payload
  const payload = bannerPayloadSchema.safeParse(body);
  if (!payload.success) {
    return jsonError("Bad Request");
  }
  const { ids } = payload.data;

  const bannerMap: Record<string, Banner> = {};

  for (const id of ids) {
    const params = new URLSearchParams({
      lang: "en-us",
      pool_id: id,
      server_id: "2",
    });
    const url = new URL("/api/content", CONFIG.endfieldBaseUrl);
    url.search = params.toString();

    // Fetch API
    const maxRetries = 3;
    let attempts = 0;
    let res: GamePoolOperator | GamePoolWeapon | null = null;
    let success = false;

    while (attempts < maxRetries && !success) {
      try {
        const response = await fetch(url);
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

    // Cek Error
    if (!success || res?.code !== 0) {
      return jsonError("Unknown Error", 500);
    }

    const data = res.data.pool;
    const isOperator = data.pool_gacha_type === "char";

    const rotate = isOperator
      ? (res as GamePoolOperator).data.pool.rotate_list
          .map((e) => data.all.find((f) => f.name === e.name)?.id)
          .filter((id): id is string => Boolean(id))
      : [];

    bannerMap[id] = {
      id,
      rateup: data.all.find((e) => e.name === data.up6_name)!.id,
      ...(rotate.length ? { rotate } : {}),
    };
  }

  // Kirim Response
  return jsonSuccess(bannerMap);
}
