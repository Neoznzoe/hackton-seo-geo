import { DetectedTool, LegalPages, RiskLevel, SubScore } from "./types";

function toLevel(score: number): RiskLevel {
  return score >= 75 ? "faible" : score >= 45 ? "moyen" : "eleve";
}

function scoreRgpd(
  analytics: DetectedTool[],
  pixels: DetectedTool[]
): SubScore {
  let penalties = 0;
  const details: string[] = [];

  const nonExempt = analytics.filter((t) => !t.cnilExempt);
  const exempt = analytics.filter((t) => t.cnilExempt);

  for (const tool of nonExempt) {
    penalties += 35;
    details.push(`${tool.name} : non exempté CNIL, transfert de données probable`);
  }

  for (const pixel of pixels) {
    penalties += 20;
    details.push(`${pixel.name} : collecte de données personnelles`);
  }

  for (const tool of exempt) {
    details.push(`${tool.name} : exempté de consentement CNIL`);
  }

  if (penalties === 0 && exempt.length > 0) {
    details.push("Tous les outils sont conformes RGPD");
  }
  if (penalties === 0 && exempt.length === 0 && pixels.length === 0) {
    details.push("Aucun outil non-conforme détecté");
  }

  const score = Math.max(0, Math.min(100, 100 - penalties));
  return { label: "Conformité RGPD", score, level: toLevel(score), details };
}

function scoreConsent(
  analytics: DetectedTool[],
  pixels: DetectedTool[],
  consentBanners: DetectedTool[]
): SubScore {
  const details: string[] = [];
  const hasConsent = consentBanners.length > 0;
  const nonExempt = analytics.filter((t) => !t.cnilExempt);
  const needsConsent = nonExempt.length > 0 || pixels.length > 0;

  if (hasConsent) {
    details.push(`Bandeau détecté : ${consentBanners.map((b) => b.name).join(", ")}`);
  }

  if (hasConsent && needsConsent) {
    details.push("Le bandeau couvre les outils non-exempts");
    return { label: "Consentement", score: 100, level: "faible", details };
  }

  if (!hasConsent && needsConsent) {
    details.push("Bandeau de consentement manquant alors que des outils non-exempts sont présents");
    return { label: "Consentement", score: 10, level: "eleve", details };
  }

  if (hasConsent && !needsConsent) {
    details.push("Bandeau présent (bonne pratique même si non obligatoire)");
    return { label: "Consentement", score: 100, level: "faible", details };
  }

  details.push("Aucun bandeau nécessaire (pas d'outil non-exempt)");
  return { label: "Consentement", score: 100, level: "faible", details };
}

function scoreTrackers(
  pixels: DetectedTool[],
  tagManagers: DetectedTool[],
  consentBanners: DetectedTool[]
): SubScore {
  let penalties = 0;
  const details: string[] = [];
  const hasConsent = consentBanners.length > 0;

  if (pixels.length === 0) {
    details.push("Aucun pixel de tracking tiers détecté");
  }

  for (const pixel of pixels) {
    if (!hasConsent) {
      penalties += 30;
      details.push(`${pixel.name} sans consentement préalable`);
    } else {
      penalties += 5;
      details.push(`${pixel.name} présent (couvert par le bandeau)`);
    }
  }

  const hasGtm = tagManagers.some((t) => t.id === "gtm");
  if (hasGtm && !hasConsent) {
    penalties += 15;
    details.push("Google Tag Manager sans gestion du consentement");
  } else if (hasGtm && hasConsent) {
    details.push("Google Tag Manager contrôlé par le bandeau de consentement");
  }

  if (tagManagers.length === 0 && pixels.length === 0) {
    details.push("Configuration propre sans trackers tiers");
  }

  const score = Math.max(0, Math.min(100, 100 - penalties));
  return { label: "Trackers tiers", score, level: toLevel(score), details };
}

function scoreLegal(legalPages: LegalPages): SubScore {
  let score = 0;
  const details: string[] = [];

  // Mentions légales = obligatoire (loi LCEN)
  if (legalPages.mentionsLegales) {
    score += 30;
    details.push("Mentions légales : détectées");
  } else {
    details.push("Mentions légales : non détectées (obligatoire, loi LCEN)");
  }

  // Politique de confidentialité = obligatoire (RGPD art. 13)
  if (legalPages.politiqueConfidentialite) {
    score += 30;
    details.push("Politique de confidentialité : détectée");
  } else {
    details.push("Politique de confidentialité : non détectée (obligatoire, RGPD art. 13)");
  }

  // CGU = fortement recommandé
  if (legalPages.cgu) {
    score += 15;
    details.push("CGU : détectées");
  } else {
    details.push("CGU : non détectées (fortement recommandé)");
  }

  // CGV = obligatoire pour e-commerce, recommandé sinon
  if (legalPages.cgv) {
    score += 15;
    details.push("CGV : détectées");
  } else {
    details.push("CGV : non détectées (obligatoire pour les sites e-commerce)");
  }

  // Politique cookies = recommandé si cookies utilisés
  if (legalPages.politiqueCookies) {
    score += 10;
    details.push("Politique cookies : détectée");
  } else {
    details.push("Politique cookies : non détectée (recommandé)");
  }

  return { label: "Obligations légales", score, level: toLevel(score), details };
}

function scoreBestPractices(
  analytics: DetectedTool[],
  consentBanners: DetectedTool[],
  tagManagers: DetectedTool[],
  legalPages: LegalPages
): SubScore {
  let score = 50;
  const details: string[] = [];

  const hasAnalytics = analytics.length > 0;
  const hasGtm = tagManagers.some((t) => t.id === "gtm");

  if (hasAnalytics || hasGtm) {
    score += 10;
    details.push("Mesure d'audience en place");
  } else {
    details.push("Aucun outil de mesure d'audience détecté");
  }

  const hasExempt = analytics.some((t) => t.cnilExempt);
  if (hasExempt) {
    score += 15;
    details.push("Utilisation d'un outil exempté CNIL");
  }

  if (consentBanners.length > 0) {
    score += 10;
    details.push("Bandeau de consentement en place");
  }

  const nonExempt = analytics.filter((t) => !t.cnilExempt);
  if (nonExempt.length === 0 && hasAnalytics) {
    score += 10;
    details.push("Aucun outil non-exempté détecté");
  }

  // Legal completeness bonus
  const legalCount = [
    legalPages.mentionsLegales,
    legalPages.politiqueConfidentialite,
    legalPages.cgu,
    legalPages.cgv,
    legalPages.politiqueCookies,
  ].filter(Boolean).length;

  if (legalCount >= 4) {
    score += 10;
    details.push("Pages légales quasi-complètes");
  } else if (legalCount <= 1) {
    score -= 10;
    details.push("Très peu de pages légales détectées");
  }

  const totalTools = analytics.length;
  if (totalTools > 2) {
    score -= 10;
    details.push(`${totalTools} outils analytics simultanés (optimisable)`);
  }

  score = Math.max(0, Math.min(100, score));
  return { label: "Bonnes pratiques", score, level: toLevel(score), details };
}

export interface FullScoreResult {
  globalScore: number;
  globalLevel: RiskLevel;
  subScores: {
    rgpd: SubScore;
    consent: SubScore;
    trackers: SubScore;
    legal: SubScore;
    bestPractices: SubScore;
  };
}

export function calculateFullScore(
  analytics: DetectedTool[],
  pixels: DetectedTool[],
  consentBanners: DetectedTool[],
  tagManagers: DetectedTool[],
  legalPages: LegalPages
): FullScoreResult {
  const rgpd = scoreRgpd(analytics, pixels);
  const consent = scoreConsent(analytics, pixels, consentBanners);
  const trackers = scoreTrackers(pixels, tagManagers, consentBanners);
  const legal = scoreLegal(legalPages);
  const bestPractices = scoreBestPractices(analytics, consentBanners, tagManagers, legalPages);

  // Weighted average: RGPD 30%, Consent 20%, Trackers 15%, Legal 20%, Best Practices 15%
  const globalScore = Math.round(
    rgpd.score * 0.3 +
    consent.score * 0.2 +
    trackers.score * 0.15 +
    legal.score * 0.2 +
    bestPractices.score * 0.15
  );

  const globalLevel = toLevel(globalScore);

  return {
    globalScore,
    globalLevel,
    subScores: { rgpd, consent, trackers, legal, bestPractices },
  };
}
