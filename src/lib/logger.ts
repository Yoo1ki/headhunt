type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogContext = Record<string, unknown>;

const serializeError = (error: Error) => ({
  name: error.name,
  message: error.message,
  stack: error.stack,
  ...(error.cause === undefined ? {} : { cause: normalizeValue(error.cause) }),
});

const normalizeValue = (value: unknown): unknown => {
  if (value instanceof Error) return serializeError(value);
  if (Array.isArray(value)) return value.map(normalizeValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        normalizeValue(nestedValue),
      ])
    );
  }
  return value;
};

const write = (level: LogLevel, message: string, context: LogContext = {}) => {
  const entry = {
    ...Object.fromEntries(
      Object.entries(context).map(([key, value]) => [
        key,
        normalizeValue(value),
      ])
    ),
    level,
    message,
  };

  if (level === 'error') {
    console.error(entry);
  } else if (level === 'warn') {
    console.warn(entry);
  } else if (level === 'debug') {
    console.debug(entry);
  } else {
    console.info(entry);
  }
};

export const logger = {
  debug: (message: string, context?: LogContext) =>
    write('debug', message, context),
  info: (message: string, context?: LogContext) =>
    write('info', message, context),
  warn: (message: string, context?: LogContext) =>
    write('warn', message, context),
  error: (message: string, context?: LogContext) =>
    write('error', message, context),
};
