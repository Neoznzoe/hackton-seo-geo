import { DetectedTool, RiskLevel } from "./types";

interface ScoreBreakdown {
  score: number;
  level: RiskLevel;
  details: string[];
}

export function calculateRiskScore(
  analytics: DetectedTool[],
  pixels: DetectedTool[],
  consentBanners: DetectedTool[],
  tagManagers: DetectedTool[]
): ScoreBreakdown {
  let score = 0;
  const details: string[] = [];
  const hasConsent = consentBanners.length > 0;

  // Non-exempt analytics
  const nonExemptAnalytics = analytics.filter((t) => !t.cnilExempt);
  for (const tool of nonExemptAnalytics) {
    if (!hasConsent) {
      score += 40;
      details.push(`${tool.name} detecte sans bandeau de consentement (+40)`);
    } else {
      score += 15;
      details.push(`${tool.name} detecte avec bandeau de consentement (+15)`);
    }
  }

  // Pixels
  for (const pixel of pixels) {
    if (!hasConsent) {
      score += 25;
      details.push(`${pixel.name} detecte sans bandeau de consentement (+25)`);
    } else {
      score += 10;
      details.push(`${pixel.name} detecte avec bandeau de consentement (+10)`);
    }
  }

  // GTM without consent
  const hasGtm = tagManagers.some((t) => t.id === "gtm");
  if (hasGtm && !hasConsent) {
    score += 10;
    details.push("Google Tag Manager sans gestion du consentement (+10)");
  }

  // Extra non-exempt trackers
  const extraNonExempt = Math.max(0, nonExemptAnalytics.length - 1);
  if (extraNonExempt > 0) {
    score += extraNonExempt * 10;
    details.push(`${extraNonExempt} tracker(s) non-exempt(s) supplementaire(s) (+${extraNonExempt * 10})`);
  }

  // Cap at 100
  score = Math.min(100, score);

  const level: RiskLevel =
    score <= 25 ? "faible" : score <= 55 ? "moyen" : "eleve";

  if (score === 0) {
    details.push("Aucun risque RGPD identifie.");
  }

  return { score, level, details };
}
