import { ScrapeLog } from "./types";

/**
 * Scraping logger - maintains an in-memory audit trail of all scraping operations.
 * Required for RGPD compliance and transparency.
 */

const MAX_LOGS = 1000;
const logs: ScrapeLog[] = [];

export function logScrape(entry: ScrapeLog): void {
  logs.push(entry);
  // Keep only the last MAX_LOGS entries to minimize data retention
  if (logs.length > MAX_LOGS) {
    logs.splice(0, logs.length - MAX_LOGS);
  }
}

export function getRecentLogs(limit: number = 50): ScrapeLog[] {
  return logs.slice(-limit);
}

export function createLogEntry(
  target: string,
  partial: Partial<ScrapeLog> = {}
): ScrapeLog {
  return {
    timestamp: new Date().toISOString(),
    target,
    robotsTxtChecked: false,
    robotsTxtAllowed: false,
    statusCode: null,
    duration: 0,
    dataPoints: 0,
    error: null,
    ...partial,
  };
}
