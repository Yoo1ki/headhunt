import { delay as wait } from './delay';
import { logger } from './logger';

type FetchJsonWithRetryOptions = {
  attempts?: number;
  delay?: number;
  context?: string;
};

export async function fetchJsonWithRetry<T>(
  input: RequestInfo | URL,
  {
    attempts = 3,
    delay = 500,
    context = 'external-api',
  }: FetchJsonWithRetryOptions = {}
): Promise<T | null> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(input);

      if (response.ok) {
        return (await response.json()) as T;
      }

      logger.warn('External request failed', {
        context,
        attempt,
        attempts,
        status: response.status,
      });
    } catch (error) {
      logger.warn('External request failed', {
        context,
        attempt,
        attempts,
        error,
      });
    }

    await wait(delay);
  }

  return null;
}
