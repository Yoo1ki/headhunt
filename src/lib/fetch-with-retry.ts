import { delay } from './delay';

type FetchRetryOptions = RequestInit & {
  retries?: number;
  retryDelay?: number;
  retryOn?: (res: Response | null, error: unknown) => boolean;
};

export async function fetchWithRetry(
  url: string,
  options: FetchRetryOptions = {}
) {
  const { retries = 3, retryDelay = 500, retryOn, ...fetchOptions } = options;

  for (let attempt = 1; attempt <= retries; attempt++) {
    let res: Response | null = null;

    try {
      res = await fetch(url, fetchOptions);

      // default retry logic (kalau tidak diset)
      const shouldRetry =
        retryOn?.(res, null) ?? (!res.ok && res.status >= 500); // retry hanya 5xx

      if (shouldRetry) {
        throw new Error(`Retryable error: ${res.status}`);
      }

      return res;
    } catch (error) {
      const shouldRetry = retryOn?.(res, error) ?? true; // retry kalau network error

      if (!shouldRetry || attempt === retries) {
        throw error;
      }

      // exponential backoff
      await delay(retryDelay * 2 ** (attempt - 1));
    }
  }

  throw new Error('Unreachable');
}
