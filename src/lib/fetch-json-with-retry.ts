import { delay as wait } from './delay';

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

      console.warn(`[${context}] Request failed`, {
        attempt,
        attempts,
        status: response.status,
      });
    } catch (error) {
      console.warn(`[${context}] Request failed`, {
        attempt,
        attempts,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    await wait(delay);
  }

  return null;
}
