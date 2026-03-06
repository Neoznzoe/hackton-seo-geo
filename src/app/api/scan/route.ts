import { NextRequest, NextResponse } from "next/server";
import {
  detectTools,
  detectLegalPages,
  detectEcommerce,
  extractSecurityHeaders,
  detectThirdPartyResources,
  detectConsentEffectiveness,
} from "@/lib/scanner/detectors";
import { calculateFullScore } from "@/lib/scanner/scoring";
import { generateRecommendations } from "@/lib/scanner/recommendations";
import {
  ScanResult,
  ScanPlan,
  PLAN_LIMITS,
  DetectedTool,
  LegalPages,
  SecurityHeaders,
  ThirdPartyResource,
  ConsentEffectiveness,
  PageDetail,
  PageIssue,
} from "@/lib/scanner/types";
import { discoverSitemap, selectPages } from "@/lib/scanner/sitemap";

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  entry.count++;
  return entry.count > 10;
}

function isPrivateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "[::1]" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.16.") ||
      hostname.startsWith("172.17.") ||
      hostname.startsWith("172.18.") ||
      hostname.startsWith("172.19.") ||
      hostname.startsWith("172.2") ||
      hostname.startsWith("172.30.") ||
      hostname.startsWith("172.31.") ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal")
    ) {
      return true;
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return true;
    }

    return false;
  } catch {
    return true;
  }
}

const PLAN_TIMEOUTS: Record<ScanPlan, number> = {
  gratuit: 15_000,
  essentiel: 30_000,
  pro: 60_000,
  expert: 90_000,
};

const fetchHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
  "Accept-Encoding": "identity",
};

async function fetchPageHtml(targetUrl: string, timeoutMs = 8000): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: fetchHeaders,
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    let html = await res.text();
    if (html.length > 2 * 1024 * 1024) {
      html = html.slice(0, 2 * 1024 * 1024);
    }
    return html;
  } catch {
    return null;
  }
}

function mergeTools(existing: DetectedTool[], newTools: DetectedTool[]): DetectedTool[] {
  const merged = [...existing];
  for (const tool of newTools) {
    if (!merged.some((t) => t.id === tool.id)) {
      merged.push(tool);
    }
  }
  return merged;
}

function mergeLegalPages(a: LegalPages, b: LegalPages): LegalPages {
  return {
    mentionsLegales: a.mentionsLegales || b.mentionsLegales,
    cgu: a.cgu || b.cgu,
    cgv: a.cgv || b.cgv,
    politiqueConfidentialite: a.politiqueConfidentialite || b.politiqueConfidentialite,
    politiqueCookies: a.politiqueCookies || b.politiqueCookies,
  };
}

function buildPageDetail(
  pageUrl: string,
  baseUrl: string,
  detection: { analytics: DetectedTool[]; pixels: DetectedTool[]; consentBanners: DetectedTool[]; tagManagers: DetectedTool[] },
  legal: LegalPages,
  thirdParty: ThirdPartyResource[],
): PageDetail {
  const path = (() => {
    try {
      const u = new URL(pageUrl);
      return u.pathname || "/";
    } catch {
      return pageUrl;
    }
  })();

  const issues: PageIssue[] = [];
  const toolsFound: string[] = [];

  // Non-exempt analytics = high severity
  for (const tool of detection.analytics) {
    toolsFound.push(tool.name);
    if (!tool.cnilExempt) {
      issues.push({ type: "analytics", label: `${tool.name} (__non_exempt__)`, severity: "high" });
    }
  }

  // Tracking pixels = high severity
  for (const tool of detection.pixels) {
    toolsFound.push(tool.name);
    issues.push({ type: "pixel", label: tool.name, severity: "high" });
  }

  // No consent banner but non-exempt tools present
  if (
    detection.consentBanners.length === 0 &&
    (detection.analytics.some((t) => !t.cnilExempt) || detection.pixels.length > 0)
  ) {
    issues.push({ type: "consent", label: "__consent_missing__", severity: "high" });
  }

  // Tag managers
  for (const tool of detection.tagManagers) {
    toolsFound.push(tool.name);
  }

  // Third-party resources with GDPR risk
  for (const res of thirdParty) {
    if (res.gdprRisk) {
      issues.push({ type: "third-party", label: `${res.name} (${res.domain})`, severity: "medium" });
    }
  }

  return { url: pageUrl, path, issues, toolsFound };
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans une minute." },
      { status: 429 }
    );
  }

  // Parse body
  let body: { url?: string; plan?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide." },
      { status: 400 }
    );
  }

  const { url } = body;
  const plan: ScanPlan = (["gratuit", "essentiel", "pro", "expert"].includes(body.plan || "") ? body.plan : "gratuit") as ScanPlan;
  const pageLimit = PLAN_LIMITS[plan];

  if (!url || typeof url !== "string") {
    return NextResponse.json(
      { error: "URL requise." },
      { status: 400 }
    );
  }

  // Normalize URL
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
    normalizedUrl = "https://" + normalizedUrl;
  }

  // SSRF protection
  if (isPrivateUrl(normalizedUrl)) {
    return NextResponse.json(
      { error: "URL non autorisée." },
      { status: 400 }
    );
  }

  // Global timeout for the entire scan
  const globalTimeout = PLAN_TIMEOUTS[plan];
  const scanStart = Date.now();

  // 1. Fetch homepage HTML first (validates the site is reachable)
  let homepageHtml: string;
  let responseHeaders: Record<string, string> = {};
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    let response: Response;
    try {
      response = await fetch(normalizedUrl, {
        signal: controller.signal,
        headers: fetchHeaders,
        redirect: "follow",
      });
    } catch {
      const parsed = new URL(normalizedUrl);
      if (!parsed.hostname.startsWith("www.")) {
        parsed.hostname = "www." + parsed.hostname;
        clearTimeout(timer);
        const controller2 = new AbortController();
        const timer2 = setTimeout(() => controller2.abort(), 10_000);
        response = await fetch(parsed.toString(), {
          signal: controller2.signal,
          headers: fetchHeaders,
          redirect: "follow",
        });
        clearTimeout(timer2);
        normalizedUrl = parsed.toString();
      } else {
        clearTimeout(timer);
        throw new Error("Connexion refusée par le serveur.");
      }
    }
    clearTimeout(timer);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Le site a répondu avec le statut ${response.status}.` },
        { status: 422 }
      );
    }

    // Capture response headers for security analysis
    response.headers.forEach((value, key) => {
      responseHeaders[key.toLowerCase()] = value;
    });

    homepageHtml = await response.text();
    if (homepageHtml.length > 2 * 1024 * 1024) {
      homepageHtml = homepageHtml.slice(0, 2 * 1024 * 1024);
    }
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    const detail = error instanceof Error ? error.message : String(error);
    const message = isTimeout
      ? "Le site n'a pas répondu dans les 10 secondes."
      : `Impossible de charger le site. Vérifiez l'URL et réessayez. (${detail})`;
    return NextResponse.json({ error: message }, { status: 422 });
  }

  // 2. Discover sitemap
  const sitemap = await discoverSitemap(normalizedUrl);

  // 3. Select pages to scan
  const pagesToScan = selectPages(sitemap.urls, pageLimit, normalizedUrl);

  // 4. Analyze homepage (already fetched)
  let allAnalytics: DetectedTool[] = [];
  let allPixels: DetectedTool[] = [];
  let allConsentBanners: DetectedTool[] = [];
  let allTagManagers: DetectedTool[] = [];
  let allLegalPages: LegalPages = {
    mentionsLegales: false,
    cgu: false,
    cgv: false,
    politiqueConfidentialite: false,
    politiqueCookies: false,
  };

  // Process homepage
  const homeDetection = detectTools(homepageHtml);
  allAnalytics = mergeTools(allAnalytics, homeDetection.analytics);
  allPixels = mergeTools(allPixels, homeDetection.pixels);
  allConsentBanners = mergeTools(allConsentBanners, homeDetection.consentBanners);
  allTagManagers = mergeTools(allTagManagers, homeDetection.tagManagers);
  allLegalPages = mergeLegalPages(allLegalPages, detectLegalPages(homepageHtml));

  const homeThirdParty = detectThirdPartyResources(homepageHtml);
  const allPageDetails: PageDetail[] = [
    buildPageDetail(normalizedUrl, normalizedUrl, homeDetection, detectLegalPages(homepageHtml), homeThirdParty),
  ];

  // 5. Fetch and analyze additional pages in parallel
  const additionalPages = pagesToScan.filter(
    (u) => u.replace(/\/$/, "") !== normalizedUrl.replace(/\/$/, "")
  );

  let pagesScanned = 1; // homepage already scanned

  if (additionalPages.length > 0) {
    const remainingTime = globalTimeout - (Date.now() - scanStart);
    const perPageTimeout = Math.min(8000, Math.max(3000, remainingTime / additionalPages.length));

    const results = await Promise.allSettled(
      additionalPages.map((pageUrl) => fetchPageHtml(pageUrl, perPageTimeout))
    );

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.status === "fulfilled" && result.value) {
        pagesScanned++;
        const html = result.value;
        const detection = detectTools(html);
        allAnalytics = mergeTools(allAnalytics, detection.analytics);
        allPixels = mergeTools(allPixels, detection.pixels);
        allConsentBanners = mergeTools(allConsentBanners, detection.consentBanners);
        allTagManagers = mergeTools(allTagManagers, detection.tagManagers);
        const pageLegal = detectLegalPages(html);
        allLegalPages = mergeLegalPages(allLegalPages, pageLegal);
        const pageThirdParty = detectThirdPartyResources(html);
        allPageDetails.push(
          buildPageDetail(additionalPages[i], normalizedUrl, detection, pageLegal, pageThirdParty),
        );
      }
    }
  }

  // 6. Detect security headers, third-party resources, consent effectiveness, e-commerce
  const securityHeaders: SecurityHeaders = extractSecurityHeaders(responseHeaders, normalizedUrl);
  const thirdPartyResources: ThirdPartyResource[] = detectThirdPartyResources(homepageHtml);
  const consentEffectiveness: ConsentEffectiveness = detectConsentEffectiveness(homepageHtml);
  const isEcommerce = detectEcommerce(homepageHtml);

  // 7. Calculate scores on aggregated data
  const { globalScore, globalLevel, letterGrade, subScores } = calculateFullScore(
    allAnalytics,
    allPixels,
    allConsentBanners,
    allTagManagers,
    allLegalPages,
    securityHeaders,
    thirdPartyResources,
    consentEffectiveness,
    isEcommerce
  );

  // 8. Generate recommendations
  const recommendations = generateRecommendations(
    allAnalytics,
    allPixels,
    allConsentBanners,
    allTagManagers,
    allLegalPages,
    globalLevel,
    securityHeaders,
    thirdPartyResources,
    consentEffectiveness
  );

  // For the free plan, strip detailed data — only keep score + sub-score levels
  if (plan === "gratuit") {
    const strippedSubScores = Object.fromEntries(
      Object.entries(subScores).map(([key, sub]) => [
        key,
        { ...sub, details: [] as string[] },
      ])
    ) as unknown as typeof subScores;

    const scanResult: ScanResult = {
      url: normalizedUrl,
      scannedAt: new Date().toISOString(),
      plan,
      sitemapFound: sitemap.found,
      sitemapUrl: sitemap.sitemapUrl,
      pagesScanned,
      totalPagesInSitemap: sitemap.urls.length,
      analytics: [],
      pixels: [],
      consentBanners: [],
      tagManagers: [],
      legalPages: allLegalPages,
      securityHeaders,
      thirdPartyResources: [],
      consentEffectiveness: { scriptsBlocked: false, dataGdprSrc: false, typePlaintext: false, consentGating: false, details: [] },
      globalScore,
      globalLevel,
      letterGrade,
      subScores: strippedSubScores,
      recommendations: [],
      pageDetails: [],
    };

    return NextResponse.json(scanResult);
  }

  const scanResult: ScanResult = {
    url: normalizedUrl,
    scannedAt: new Date().toISOString(),
    plan,
    sitemapFound: sitemap.found,
    sitemapUrl: sitemap.sitemapUrl,
    pagesScanned,
    totalPagesInSitemap: sitemap.urls.length,
    analytics: allAnalytics,
    pixels: allPixels,
    consentBanners: allConsentBanners,
    tagManagers: allTagManagers,
    legalPages: allLegalPages,
    securityHeaders,
    thirdPartyResources,
    consentEffectiveness,
    globalScore,
    globalLevel,
    letterGrade,
    subScores,
    recommendations,
    pageDetails: allPageDetails,
  };

  return NextResponse.json(scanResult);
}
