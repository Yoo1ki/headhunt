import { TRACKER_CONFIG } from '@/config/tracker';
import { jsonError, jsonSuccess } from '@/lib/api-response';
import { fetchJsonWithRetry } from '@/lib/fetch-json-with-retry';
import { bannerPayloadSchema } from '@/lib/validators/banner-payload';
import { parseJsonRequest } from '@/lib/parse-json-request';
import { logger } from '@/lib/logger';
import type { GamePool, GamePoolOperator } from '@/types/api/game-pool';

type Banner = {
  id: string;
  rateup: string;
  rotate?: string[];
};

export async function POST(req: Request) {
  const body = await parseJsonRequest(req);

  // Validasi Payload
  const payload = bannerPayloadSchema.safeParse(body);
  if (!payload.success) {
    return jsonError('Bad Request');
  }
  const { ids } = payload.data;

  const bannerMap: Record<string, Banner> = {};

  for (const id of ids) {
    const params = new URLSearchParams({
      lang: 'en-us',
      pool_id: id,
      server_id: '2',
    });
    const url = new URL('/api/content', TRACKER_CONFIG.api.baseUrl);
    url.search = params.toString();

    // Fetch API
    const res = await fetchJsonWithRetry<GamePool>(url, {
      context: 'tracker.banner',
    });

    // Cek Error
    if (res?.code !== 0) {
      return jsonError('Unknown Error', 500);
    }

    const data = res.data.pool;
    const isOperator = data.pool_gacha_type === 'char';

    const rotate = isOperator
      ? (res as GamePoolOperator).data.pool.rotate_list
          .map((e) => data.all.find((f) => f.name === e.name)?.id)
          .filter((id): id is string => Boolean(id))
      : [];

    const rateup = data.all.find((item) => item.name === data.up6_name);
    if (!rateup) {
      logger.warn('Rate-up item not found', {
        context: 'tracker.banner',
        bannerId: id,
      });
      return jsonError('Unknown Error', 500);
    }

    bannerMap[id] = {
      id,
      rateup: rateup.id,
      ...(rotate.length ? { rotate } : {}),
    };
  }

  // Kirim Response
  return jsonSuccess(bannerMap);
}
