const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
  "Accept-Encoding": "identity",
};

async function fetchText(url: string, timeoutMs = 8000): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: FETCH_HEADERS,
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export interface SitemapDiscovery {
  found: boolean;
  sitemapUrl?: string;
  urls: string[];
}

/**
 * Discover sitemap by checking robots.txt then common paths.
 */
export async function discoverSitemap(baseUrl: string): Promise<SitemapDiscovery> {
  const parsed = new URL(baseUrl);
  const origin = parsed.origin;

  // 1. Check robots.txt for Sitemap directive
  const robotsTxt = await fetchText(`${origin}/robots.txt`);
  if (robotsTxt) {
    const match = robotsTxt.match(/^Sitemap:\s*(.+)$/im);
    if (match) {
      const sitemapUrl = match[1].trim();
      const urls = await fetchAndParseSitemap(sitemapUrl);
      if (urls.length > 0) {
        return { found: true, sitemapUrl, urls };
      }
    }
  }

  // 2. Try common sitemap paths
  const commonPaths = ["/sitemap.xml", "/sitemap_index.xml", "/sitemap/sitemap.xml"];
  for (const path of commonPaths) {
    const sitemapUrl = `${origin}${path}`;
    const urls = await fetchAndParseSitemap(sitemapUrl);
    if (urls.length > 0) {
      return { found: true, sitemapUrl, urls };
    }
  }

  return { found: false, urls: [] };
}

/**
 * Fetch a sitemap URL and parse it. Handles sitemap index files.
 */
async function fetchAndParseSitemap(url: string): Promise<string[]> {
  const xml = await fetchText(url);
  if (!xml) return [];

  // Check if it's a sitemap index
  if (xml.includes("<sitemapindex")) {
    const sitemapUrls = parseSitemapIndex(xml);
    if (sitemapUrls.length > 0) {
      // Fetch the first sub-sitemap
      const subXml = await fetchText(sitemapUrls[0]);
      if (subXml) return parseSitemapUrls(subXml);
    }
    return [];
  }

  return parseSitemapUrls(xml);
}

/**
 * Extract sitemap URLs from a sitemap index XML.
 */
function parseSitemapIndex(xml: string): string[] {
  const urls: string[] = [];
  const regex = /<sitemap>\s*<loc>\s*(.*?)\s*<\/loc>/gi;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

/**
 * Extract page URLs from a sitemap XML.
 */
function parseSitemapUrls(xml: string): string[] {
  const urls: string[] = [];
  const regex = /<url>\s*<loc>\s*(.*?)\s*<\/loc>/gi;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

// Patterns for legal pages (high priority)
const LEGAL_PATTERNS = [
  /mentions[_-]?legales/i,
  /legal[_-]?notice/i,
  /cgu/i,
  /conditions[_-]?(generales[_-]?)?(utilisation|vente)/i,
  /cgv/i,
  /confidentialit/i,
  /privacy/i,
  /cookie/i,
  /donnees[_-]?personnelles/i,
];

// Patterns for diverse/interesting pages
const DIVERSE_PATTERNS = [
  /contact/i,
  /about|a-propos|qui-sommes/i,
  /blog/i,
  /services?/i,
  /tarifs?|pricing/i,
  /faq/i,
];

/**
 * Select pages intelligently from sitemap URLs.
 * Priority: homepage > legal pages > diverse pages > rest by sitemap order.
 */
export function selectPages(urls: string[], limit: number, homepageUrl: string): string[] {
  if (urls.length === 0) return [homepageUrl];

  const normalizedHome = homepageUrl.replace(/\/$/, "");
  const selected: string[] = [];
  const used = new Set<string>();

  // 1. Always include homepage
  const homepage = urls.find((u) => u.replace(/\/$/, "") === normalizedHome) || homepageUrl;
  selected.push(homepage);
  used.add(homepage.replace(/\/$/, ""));

  // 2. Legal pages
  for (const url of urls) {
    if (selected.length >= limit) break;
    const normalized = url.replace(/\/$/, "");
    if (used.has(normalized)) continue;
    const path = new URL(url).pathname.toLowerCase();
    if (LEGAL_PATTERNS.some((p) => p.test(path))) {
      selected.push(url);
      used.add(normalized);
    }
  }

  // 3. Diverse pages
  for (const url of urls) {
    if (selected.length >= limit) break;
    const normalized = url.replace(/\/$/, "");
    if (used.has(normalized)) continue;
    const path = new URL(url).pathname.toLowerCase();
    if (DIVERSE_PATTERNS.some((p) => p.test(path))) {
      selected.push(url);
      used.add(normalized);
    }
  }

  // 4. Fill remaining from sitemap order
  for (const url of urls) {
    if (selected.length >= limit) break;
    const normalized = url.replace(/\/$/, "");
    if (used.has(normalized)) continue;
    selected.push(url);
    used.add(normalized);
  }

  return selected;
}
