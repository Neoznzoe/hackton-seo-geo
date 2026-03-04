import { NextRequest, NextResponse } from "next/server";
import { detectTools } from "@/lib/scanner/detectors";
import { calculateRiskScore } from "@/lib/scanner/scoring";
import { generateRecommendations } from "@/lib/scanner/recommendations";
import { ScanResult } from "@/lib/scanner/types";

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

    // Block private/reserved IPs and localhost
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

    // Only allow http/https
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return true;
    }

    return false;
  } catch {
    return true;
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de requetes. Reessayez dans une minute." },
      { status: 429 }
    );
  }

  // Parse body
  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requete invalide." },
      { status: 400 }
    );
  }

  const { url } = body;
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
      { error: "URL non autorisee." },
      { status: 400 }
    );
  }

  // Fetch HTML with timeout
  let html: string;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "DevRadar-Scanner/1.0 (+https://devradar.up.railway.app)",
        Accept: "text/html",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Le site a repondu avec le statut ${response.status}.` },
        { status: 422 }
      );
    }

    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "La page est trop volumineuse (> 2 Mo)." },
        { status: 422 }
      );
    }

    html = await response.text();

    // Truncate if too large
    if (html.length > 2 * 1024 * 1024) {
      html = html.slice(0, 2 * 1024 * 1024);
    }
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Le site n'a pas repondu dans les 5 secondes."
        : "Impossible de charger le site.";
    return NextResponse.json({ error: message }, { status: 422 });
  }

  // Detect tools
  const { analytics, pixels, consentBanners, tagManagers } = detectTools(html);

  // Calculate risk score
  const { score, level, details } = calculateRiskScore(
    analytics,
    pixels,
    consentBanners,
    tagManagers
  );

  // Generate recommendations
  const recommendations = generateRecommendations(
    analytics,
    pixels,
    consentBanners,
    level
  );

  const result: ScanResult = {
    url: normalizedUrl,
    scannedAt: new Date().toISOString(),
    analytics,
    pixels,
    consentBanners,
    tagManagers,
    riskScore: score,
    riskLevel: level,
    riskDetails: details,
    recommendations,
  };

  return NextResponse.json(result);
}
