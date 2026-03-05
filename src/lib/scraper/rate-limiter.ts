/**
 * Simple in-memory rate limiter for scraping operations.
 * Ensures we don't overwhelm target servers.
 */

const DEFAULT_MIN_DELAY_MS = 2000; // 2 seconds between requests to the same domain

const lastRequestMap = new Map<string, number>();

/**
 * Wait if necessary before making a request to a domain.
 * Enforces minimum delay between requests to the same host.
 */
export async function waitForRateLimit(
  domain: string,
  crawlDelay: number | null = null
): Promise<void> {
  const minDelay = crawlDelay
    ? Math.max(crawlDelay * 1000, DEFAULT_MIN_DELAY_MS)
    : DEFAULT_MIN_DELAY_MS;

  const lastRequest = lastRequestMap.get(domain);
  if (lastRequest) {
    const elapsed = Date.now() - lastRequest;
    if (elapsed < minDelay) {
      await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
    }
  }

  lastRequestMap.set(domain, Date.now());
}

/**
 * Global scraping rate limiter - max 5 scrape operations per minute per IP.
 */
const globalRateMap = new Map<string, { count: number; resetAt: number }>();

export function isScrapingRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = globalRateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    globalRateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  entry.count++;
  return entry.count > 5;
}
