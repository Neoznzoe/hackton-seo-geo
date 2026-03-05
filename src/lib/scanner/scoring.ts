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
  let penalties = 0;
  const details: string[] = [];
  const hasConsent = consentBanners.length > 0;

  // Non-exempt analytics
  const nonExemptAnalytics = analytics.filter((t) => !t.cnilExempt);
  for (const tool of nonExemptAnalytics) {
    if (!hasConsent) {
      penalties += 40;
      details.push(`${tool.name} detecte sans bandeau de consentement (-40)`);
    } else {
      penalties += 15;
      details.push(`${tool.name} detecte avec bandeau de consentement (-15)`);
    }
  }

  // Pixels
  for (const pixel of pixels) {
    if (!hasConsent) {
      penalties += 25;
      details.push(`${pixel.name} detecte sans bandeau de consentement (-25)`);
    } else {
      penalties += 10;
      details.push(`${pixel.name} detecte avec bandeau de consentement (-10)`);
    }
  }

  // GTM without consent
  const hasGtm = tagManagers.some((t) => t.id === "gtm");
  if (hasGtm && !hasConsent) {
    penalties += 10;
    details.push("Google Tag Manager sans gestion du consentement (-10)");
  }

  // Extra non-exempt trackers
  const extraNonExempt = Math.max(0, nonExemptAnalytics.length - 1);
  if (extraNonExempt > 0) {
    penalties += extraNonExempt * 10;
    details.push(`${extraNonExempt} tracker(s) non-exempt(s) supplementaire(s) (-${extraNonExempt * 10})`);
  }

  // Score = 100 - penalties, capped between 0 and 100
  const score = Math.max(0, Math.min(100, 100 - penalties));

  const level: RiskLevel =
    score >= 75 ? "faible" : score >= 45 ? "moyen" : "eleve";

  // Positive details
  const exemptAnalytics = analytics.filter((t) => t.cnilExempt);
  for (const tool of exemptAnalytics) {
    details.push(`${tool.name} : exempte de consentement CNIL`);
  }

  if (hasConsent) {
    details.push("Bandeau de consentement detecte");
  }

  if (score === 100) {
    details.push("Aucun probleme de conformite detecte");
  }

  return { score, level, details };
}
