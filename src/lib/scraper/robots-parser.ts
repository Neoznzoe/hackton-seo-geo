import { RobotsTxtRule } from "./types";

const SCRAPER_USER_AGENT = "DevRadarBot/1.0";

/**
 * Fetch and parse robots.txt for a given domain.
 * Returns whether our bot is allowed to scrape the target path.
 */
export async function checkRobotsTxt(
  baseUrl: string,
  targetPath: string = "/"
): Promise<RobotsTxtRule> {
  const defaultRule: RobotsTxtRule = { allowed: true, crawlDelay: null };

  try {
    const url = new URL("/robots.txt", baseUrl);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent": SCRAPER_USER_AGENT,
      },
    });
    clearTimeout(timer);

    if (!res.ok) {
      // No robots.txt = everything is allowed by convention
      return defaultRule;
    }

    const text = await res.text();
    return parseRobotsTxt(text, targetPath);
  } catch {
    // Network error fetching robots.txt = assume allowed
    return defaultRule;
  }
}

function parseRobotsTxt(content: string, targetPath: string): RobotsTxtRule {
  const lines = content.split("\n").map((l) => l.trim());
  let inOurSection = false;
  let inWildcard = false;
  let crawlDelay: number | null = null;
  const disallowedPaths: string[] = [];
  const allowedPaths: string[] = [];

  for (const line of lines) {
    if (line.startsWith("#") || line === "") continue;

    const lower = line.toLowerCase();

    if (lower.startsWith("user-agent:")) {
      const agent = line.slice("user-agent:".length).trim().toLowerCase();
      if (agent === "devradarbot" || agent === "devradarbot/1.0") {
        inOurSection = true;
        inWildcard = false;
      } else if (agent === "*") {
        if (!inOurSection) inWildcard = true;
      } else {
        if (!inOurSection) inWildcard = false;
      }
      continue;
    }

    if (!inOurSection && !inWildcard) continue;

    if (lower.startsWith("disallow:")) {
      const path = line.slice("disallow:".length).trim();
      if (path) disallowedPaths.push(path);
    } else if (lower.startsWith("allow:")) {
      const path = line.slice("allow:".length).trim();
      if (path) allowedPaths.push(path);
    } else if (lower.startsWith("crawl-delay:")) {
      const delay = parseInt(line.slice("crawl-delay:".length).trim(), 10);
      if (!isNaN(delay)) crawlDelay = delay;
    }
  }

  // Check if our target path is explicitly allowed
  for (const path of allowedPaths) {
    if (targetPath.startsWith(path)) {
      return { allowed: true, crawlDelay };
    }
  }

  // Check if our target path is disallowed
  for (const path of disallowedPaths) {
    if (path === "/" || targetPath.startsWith(path)) {
      return { allowed: false, crawlDelay };
    }
  }

  return { allowed: true, crawlDelay };
}

export { SCRAPER_USER_AGENT };
