const normalizeError = (error: unknown) =>
  error instanceof Error
    ? { name: error.name, message: error.message, stack: error.stack }
    : error;

export const logger = {
  info: (message: string, ...details: unknown[]) =>
    console.info(`[info] ${message}`, ...details),
  success: (message: string, ...details: unknown[]) =>
    console.info(`[success] ${message}`, ...details),
  warn: (message: string, ...details: unknown[]) =>
    console.warn(`[warn] ${message}`, ...details),
  error: (message: string, error?: unknown) =>
    console.error(
      `[error] ${message}`,
      error === undefined ? '' : normalizeError(error)
    ),
};

export function runScript(name: string, task: () => Promise<void>) {
  logger.info(`${name} started`);

  void task()
    .then(() => logger.success(`${name} completed`))
    .catch((error: unknown) => {
      logger.error(`${name} failed`, error);
      process.exitCode = 1;
    });
}
