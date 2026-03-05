import { ScrapedToolData, ScrapeResult, ScrapeLog } from "./types";
import { checkRobotsTxt, SCRAPER_USER_AGENT } from "./robots-parser";
import { waitForRateLimit } from "./rate-limiter";
import { logScrape, createLogEntry } from "./logger";
import { SCRAPING_SOURCES, ScrapingSource } from "./sources";

const FETCH_TIMEOUT = 10_000;

/**
 * Main scraping function for competitive intelligence.
 * Respects robots.txt, applies rate limiting, logs all operations.
 * Only collects non-personal, publicly available product data.
 */
export async function scrapeCompetitiveIntelligence(): Promise<ScrapeResult> {
  const startTime = Date.now();
  const tools: ScrapedToolData[] = [];
  const allLogs: ScrapeLog[] = [];

  let successCount = 0;

  for (const source of SCRAPING_SOURCES) {
    const log = createLogEntry(source.url);
    const opStart = Date.now();

    try {
      // 1. Check robots.txt
      log.robotsTxtChecked = true;
      const robotsRule = await checkRobotsTxt(source.url, source.path);
      log.robotsTxtAllowed = robotsRule.allowed;

      if (!robotsRule.allowed) {
        log.error = "Blocked by robots.txt — scraping skipped";
        log.duration = Date.now() - opStart;
        logScrape(log);
        allLogs.push(log);
        continue;
      }

      // 2. Rate limiting
      const domain = new URL(source.url).hostname;
      await waitForRateLimit(domain, robotsRule.crawlDelay);

      // 3. Fetch the page
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

      const response = await fetch(source.url, {
        signal: controller.signal,
        headers: {
          "User-Agent": SCRAPER_USER_AGENT,
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
        },
      });
      clearTimeout(timer);

      log.statusCode = response.status;

      if (!response.ok) {
        log.error = `HTTP ${response.status}`;
        log.duration = Date.now() - opStart;
        logScrape(log);
        allLogs.push(log);
        continue;
      }

      let html = await response.text();
      // Data minimization: only keep first 500KB
      if (html.length > 500_000) {
        html = html.slice(0, 500_000);
      }

      // 4. Extract data (non-personal, product info only)
      const toolData = extractToolData(source, html);
      log.dataPoints = countDataPoints(toolData);
      tools.push(toolData);
      successCount++;

      log.duration = Date.now() - opStart;
      logScrape(log);
      allLogs.push(log);
    } catch (err) {
      log.error = err instanceof Error ? err.message : "Unknown error";
      log.duration = Date.now() - opStart;
      logScrape(log);
      allLogs.push(log);
    }
  }

  return {
    success: successCount > 0,
    tools,
    logs: allLogs,
    metadata: {
      totalSources: SCRAPING_SOURCES.length,
      successfulSources: successCount,
      totalDuration: Date.now() - startTime,
      scrapedAt: new Date().toISOString(),
    },
  };
}

function extractToolData(
  source: ScrapingSource,
  html: string
): ScrapedToolData {
  // Strip HTML tags for text analysis
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

  // Extract pricing mentions
  let pricing: string | null = null;
  for (const pattern of source.extractors.pricing) {
    const match = text.match(pattern);
    if (match) {
      pricing = match[0].trim();
      break;
    }
  }

  // Detect features from page content
  const detectedFeatures: string[] = [];
  for (const pattern of source.extractors.features) {
    if (pattern.test(text)) {
      detectedFeatures.push(pattern.source.replace(/\\/g, ""));
    }
    // Reset lastIndex for global regexes
    pattern.lastIndex = 0;
  }

  const lowerText = text.toLowerCase();

  return {
    name: source.toolName,
    source: source.url,
    scrapedAt: new Date().toISOString(),
    pricing,
    freeplan: /free|gratuit|0\s*[€$]/i.test(text) ? true : null,
    openSource: /open[- ]?source/i.test(text) ? true : null,
    selfHosted: /self[- ]?host/i.test(text) ? true : null,
    gdprCompliant: /gdpr|rgpd/i.test(lowerText) ? true : null,
    cookieless: /cookie[- ]?free|no[- ]?cookie|sans[- ]?cookie|cookieless/i.test(text) ? true : null,
  };
}

function countDataPoints(data: ScrapedToolData): number {
  let count = 0;
  if (data.pricing) count++;
  if (data.freeplan !== null) count++;
  if (data.openSource !== null) count++;
  if (data.selfHosted !== null) count++;
  if (data.gdprCompliant !== null) count++;
  if (data.cookieless !== null) count++;
  return count;
}
