export const OTEL_LOGGER = 'OTEL_LOGGER';

export interface IOtelLoggerRecord {
  body?: string;
  severityText?: string;
  attributes?: Record<string, unknown>;
}

export interface IOtelLogger {
  emit(log: IOtelLoggerRecord): void;
}
