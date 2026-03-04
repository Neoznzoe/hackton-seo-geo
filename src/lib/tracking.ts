import { CustomEvent, PageViews } from "@piwikpro/react-piwik-pro";

export function trackEvent(
  category: string,
  action: string,
  name?: string,
  value?: number
) {
  try {
    CustomEvent.trackEvent(category, action, name, value);
  } catch {
    // Piwik Pro not initialized (consent refused)
  }
}

export function trackPageView(title?: string) {
  try {
    PageViews.trackPageView(title);
  } catch {
    // Piwik Pro not initialized
  }
}

export function trackToolView(toolSlug: string) {
  trackEvent("tool", "view", toolSlug);
}

export function trackComparison(tool1: string, tool2: string) {
  trackEvent("comparison", "view", `${tool1}-vs-${tool2}`);
}

export function trackClickCompare(from: string, to: string) {
  trackEvent("comparison", "click", `${from} → ${to}`);
}

export function trackExternalLink(toolName: string, url: string) {
  trackEvent("conversion", "click", `${toolName} | ${url}`);
}

export function trackCtaClick(label: string) {
  trackEvent("engagement", "click", label);
}

export function trackFaqToggle(question: string) {
  trackEvent("engagement", "toggle", question);
}

export function trackCategoryClick(slug: string) {
  trackEvent("navigation", "click", slug);
}

export function trackScrollDepth(depth: number) {
  trackEvent("engagement", "scroll", `${depth}%`);
}
