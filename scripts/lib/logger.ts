type LogLevel = 'info' | 'success' | 'warn' | 'error';

const colors: Record<LogLevel, string> = {
  info: '\u001b[36m',
  success: '\u001b[32m',
  warn: '\u001b[33m',
  error: '\u001b[31m',
};
const reset = '\u001b[0m';
const useColor = Boolean(process.stdout.isTTY && !process.env.NO_COLOR);

const normalizeDetail = (detail: unknown) =>
  detail instanceof Error
    ? {
        name: detail.name,
        message: detail.message,
        stack: detail.stack,
        ...(detail.cause === undefined ? {} : { cause: detail.cause }),
      }
    : detail;

const write = (level: LogLevel, message: string, details: unknown[]) => {
  const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
  const label = level.toUpperCase().padEnd(7);
  const formattedLabel = useColor ? `${colors[level]}${label}${reset}` : label;
  const output = `${time}  ${formattedLabel}  ${message}`;
  const normalizedDetails = details.map(normalizeDetail);

  if (level === 'error') console.error(output, ...normalizedDetails);
  else if (level === 'warn') console.warn(output, ...normalizedDetails);
  else console.info(output, ...normalizedDetails);
};

export const logger = {
  info: (message: string, ...details: unknown[]) =>
    write('info', message, details),
  success: (message: string, ...details: unknown[]) =>
    write('success', message, details),
  warn: (message: string, ...details: unknown[]) =>
    write('warn', message, details),
  error: (message: string, ...details: unknown[]) =>
    write('error', message, details),
};

export function runScript(name: string, task: () => Promise<void>) {
  const startedAt = performance.now();
  logger.info(`${name} started`);

  void Promise.resolve()
    .then(task)
    .then(() => {
      const duration = ((performance.now() - startedAt) / 1000).toFixed(1);
      logger.success(`${name} completed`, { duration: `${duration}s` });
    })
    .catch((error: unknown) => {
      logger.error(`${name} failed`, error);
      process.exitCode = 1;
    });
}
