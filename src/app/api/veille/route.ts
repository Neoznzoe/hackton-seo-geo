import { NextRequest, NextResponse } from "next/server";
import { scrapeCompetitiveIntelligence } from "@/lib/scraper/scraper";
import { getRecentLogs } from "@/lib/scraper/logger";
import { isScrapingRateLimited } from "@/lib/scraper/rate-limiter";

/**
 * GET /api/veille — Launch competitive intelligence scraping.
 * Rate limited to 5 requests per minute per IP.
 * All operations are logged and respect robots.txt.
 */
export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isScrapingRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de requetes. Reessayez dans une minute." },
      { status: 429 }
    );
  }

  const result = await scrapeCompetitiveIntelligence();

  return NextResponse.json(result);
}

/**
 * GET /api/veille/logs — Get recent scraping logs (transparency/audit).
 */
export async function POST() {
  const logs = getRecentLogs(50);
  return NextResponse.json({ logs });
}
