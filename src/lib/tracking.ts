import { CustomEvent, PageViews } from "@piwikpro/react-piwik-pro";

// ---------------------------------------------------------------------------
// Core helpers
// ---------------------------------------------------------------------------

function sendEvent(
  category: string,
  action: string,
  name?: string,
  value?: number
) {
  try {
    CustomEvent.trackEvent(category, action, name, value);
  } catch {
    // Piwik Pro not initialized (consent refused or SSR)
  }
}

export function trackPageView(title?: string) {
  try {
    PageViews.trackPageView(title);
  } catch {
    // Piwik Pro not initialized
  }
}

// ---------------------------------------------------------------------------
// PLAN DE MARQUAGE — Events custom organises par categorie
// ---------------------------------------------------------------------------

// --- Navigation -----------------------------------------------------------

export function trackPageLanding(pageType: string, slug?: string) {
  sendEvent("navigation", "page_landing", `${pageType}${slug ? `:${slug}` : ""}`);
}

export function trackInternalNavigation(from: string, to: string) {
  sendEvent("navigation", "internal_link", `${from} -> ${to}`);
}

export function trackCategoryClick(slug: string) {
  sendEvent("navigation", "category_click", slug);
}

// --- Funnel : Decouverte --------------------------------------------------

export function trackToolView(toolSlug: string) {
  sendEvent("funnel", "step_1_view_tool", toolSlug);
}

export function trackComparison(tool1: string, tool2: string) {
  sendEvent("funnel", "step_2_compare", `${tool1}-vs-${tool2}`);
}

export function trackClickCompare(from: string, to: string) {
  sendEvent("funnel", "step_2_compare_click", `${from} -> ${to}`);
}

// --- Funnel : Conversion --------------------------------------------------

export function trackExternalLink(toolName: string, url: string) {
  sendEvent("funnel", "step_3_conversion_click", `${toolName} | ${url}`);
}

export function trackCtaClick(label: string) {
  sendEvent("funnel", "step_cta_click", label);
}

// --- Funnel : Scanner (funnel secondaire) ---------------------------------

export function trackScannerOpen() {
  sendEvent("scanner_funnel", "step_1_open", "scanner_page");
}

export function trackScanUrlInput(url: string) {
  sendEvent("scanner_funnel", "step_2_url_input", url);
}

export function trackScanPlanSelect(plan: string) {
  sendEvent("scanner_funnel", "step_3_plan_select", plan);
}

export function trackScan(url: string) {
  sendEvent("scanner_funnel", "step_4_scan_start", url);
}

export function trackScanResult(riskLevel: string, score: number) {
  sendEvent("scanner_funnel", "step_5_scan_result", riskLevel, score);
}

export function trackScanRecommendationClick(link: string) {
  sendEvent("scanner_funnel", "step_6_recommendation_click", link);
}

// --- Engagement -----------------------------------------------------------

export function trackScrollDepth(depth: number) {
  sendEvent("engagement", "scroll_depth", `${depth}%`, depth);
}

export function trackFaqToggle(question: string) {
  sendEvent("engagement", "faq_toggle", question);
}

export function trackTimeOnPage(seconds: number, pageType: string) {
  sendEvent("engagement", "time_on_page", pageType, seconds);
}

export function trackContentInteraction(contentType: string, action: string, label: string) {
  sendEvent("engagement", "content_interaction", `${contentType}:${action}:${label}`);
}

// --- Segmentation utilisateur ---------------------------------------------

export function trackUserSegment() {
  const isReturning = typeof window !== "undefined" && localStorage.getItem("devradar_visited") === "true";
  const segment = isReturning ? "returning" : "new";
  sendEvent("user", "segment", segment);

  if (typeof window !== "undefined") {
    localStorage.setItem("devradar_visited", "true");
  }
}

export function trackEntryPoint(referrer: string) {
  let source = "direct";
  if (referrer.includes("google")) source = "google";
  else if (referrer.includes("bing")) source = "bing";
  else if (referrer.includes("linkedin")) source = "linkedin";
  else if (referrer.includes("twitter") || referrer.includes("x.com")) source = "twitter";
  else if (referrer.includes("chatgpt") || referrer.includes("openai")) source = "chatgpt";
  else if (referrer.includes("perplexity")) source = "perplexity";
  else if (referrer) source = "other_referral";

  sendEvent("user", "entry_source", source);
}

// --- Consent management ---------------------------------------------------

export function trackConsentChoice(choice: "accepted" | "refused") {
  sendEvent("consent", "cookie_banner", choice);
}
