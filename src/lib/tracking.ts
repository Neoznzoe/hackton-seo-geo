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
// PLAN DE MARQUAGE — Funnel principal = Scanner RGPD
// ---------------------------------------------------------------------------

// --- Funnel principal : Scanner RGPD --------------------------------------
// Etapes : Homepage CTA → Open scanner → Choix plan → Lancer scan → Résultat → Action

/** Step 0 : clic sur le CTA scanner depuis la homepage */
export function trackScannerCtaClick(source: string) {
  sendEvent("funnel", "step_0_scanner_cta", source);
}

/** Step 1 : ouverture de la page scanner */
export function trackScannerOpen() {
  sendEvent("funnel", "step_1_scanner_open", "scanner_page");
}

/** Step 2 : saisie d'une URL dans le champ */
export function trackScanUrlInput(url: string) {
  sendEvent("funnel", "step_2_url_input", url);
}

/** Step 3 : sélection d'un plan (gratuit/rapide/complet) */
export function trackScanPlanSelect(plan: string) {
  sendEvent("funnel", "step_3_plan_select", plan);
}

/** Step 4 : lancement du scan */
export function trackScan(url: string) {
  sendEvent("funnel", "step_4_scan_start", url);
}

/** Step 5 : résultat affiché (score + niveau de risque) */
export function trackScanResult(riskLevel: string, score: number) {
  sendEvent("funnel", "step_5_scan_result", riskLevel, score);
}

/** Step 6 : clic sur une recommandation du plan d'action */
export function trackScanRecommendationClick(link: string) {
  sendEvent("funnel", "step_6_recommendation_click", link);
}

/** Step 6b : clic vers un outil depuis les résultats scanner */
export function trackScanToolClick(toolName: string) {
  sendEvent("funnel", "step_6_tool_click", toolName);
}

// --- Funnel secondaire : Découverte outils --------------------------------

export function trackToolView(toolSlug: string) {
  sendEvent("discovery", "view_tool", toolSlug);
}

export function trackComparison(tool1: string, tool2: string) {
  sendEvent("discovery", "compare", `${tool1}-vs-${tool2}`);
}

export function trackClickCompare(from: string, to: string) {
  sendEvent("discovery", "compare_click", `${from} -> ${to}`);
}

export function trackExternalLink(toolName: string, url: string) {
  sendEvent("discovery", "external_link", `${toolName} | ${url}`);
}

export function trackCtaClick(label: string) {
  sendEvent("discovery", "cta_click", label);
}

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

// --- Veille concurrentielle (scraping) ------------------------------------

export function trackVeilleLaunch() {
  sendEvent("veille", "scrape_launch", "competitive_intelligence");
}

export function trackVeilleResult(toolsFound: number, duration: number) {
  sendEvent("veille", "scrape_result", `tools:${toolsFound}`, duration);
}

export function trackVeilleLogsView() {
  sendEvent("veille", "view_logs", "scraping_logs");
}

// --- Consent management ---------------------------------------------------

export function trackConsentChoice(choice: "accepted" | "refused") {
  sendEvent("consent", "cookie_banner", choice);
}

// ---------------------------------------------------------------------------
// Legacy aliases (deprecated — kept for backwards compatibility)
// ---------------------------------------------------------------------------

/** @deprecated Use trackScan */
export function trackEvent(category: string, action: string, name?: string, value?: number) {
  sendEvent(category, action, name, value);
}
