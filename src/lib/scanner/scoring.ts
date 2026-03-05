import {
  DetectedTool,
  LegalPages,
  RiskLevel,
  LetterGrade,
  SubScore,
  SecurityHeaders,
  ThirdPartyResource,
  ConsentEffectiveness,
  scoreToLetterGrade,
} from "./types";

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
  consentBanners: DetectedTool[],
  consentEffectiveness: ConsentEffectiveness
): SubScore {
  const details: string[] = [];
  const hasConsent = consentBanners.length > 0;
  const nonExempt = analytics.filter((t) => !t.cnilExempt);
  const needsConsent = nonExempt.length > 0 || pixels.length > 0;

  if (hasConsent) {
    details.push(`Bandeau détecté : ${consentBanners.map((b) => b.name).join(", ")}`);
  }

  if (hasConsent && needsConsent) {
    // Check if consent actually blocks scripts
    if (consentEffectiveness.scriptsBlocked) {
      details.push("Le bandeau bloque effectivement les scripts avant consentement");
      return { label: "Consentement", score: 100, level: "faible", details };
    } else {
      details.push("Bandeau présent mais aucun mécanisme de blocage de scripts détecté");
      return { label: "Consentement", score: 60, level: "moyen", details };
    }
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

function scoreLegal(legalPages: LegalPages, isEcommerce: boolean): SubScore {
  let score = 0;
  const details: string[] = [];

  if (legalPages.mentionsLegales) {
    score += 30;
  } else {
    details.push("Mentions légales manquantes (obligatoire, loi LCEN)");
  }

  if (legalPages.politiqueConfidentialite) {
    score += 30;
  } else {
    details.push("Politique de confidentialité manquante (obligatoire, RGPD art. 13)");
  }

  if (legalPages.cgu) {
    score += 15;
  } else {
    details.push("CGU manquantes (fortement recommandé)");
  }

  if (isEcommerce) {
    if (legalPages.cgv) {
      score += 15;
    } else {
      details.push("CGV manquantes (obligatoire pour les sites e-commerce)");
    }
  } else {
    // Not e-commerce: CGV not required, give points automatically
    score += 15;
    if (legalPages.cgv) {
      details.push("CGV présentes (non obligatoire pour un site non-marchand)");
    } else {
      details.push("CGV non requises (site non-marchand détecté)");
    }
  }

  if (legalPages.politiqueCookies) {
    score += 10;
  } else {
    details.push("Politique cookies manquante (recommandé)");
  }

  if (details.length === 0) {
    details.push("Toutes les pages légales sont en place");
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
    score += 10;
    details.push("Aucun outil de mesure d'audience détecté (bon pour la vie privée)");
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

  const legalCount = [
    legalPages.mentionsLegales,
    legalPages.politiqueConfidentialite,
    legalPages.cgu,
    legalPages.cgv,
    legalPages.politiqueCookies,
  ].filter(Boolean).length;

  if (legalCount === 5) {
    score += 15;
    details.push("Toutes les pages légales sont en place");
  } else if (legalCount >= 3) {
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

function scoreSecurity(headers: SecurityHeaders): SubScore {
  let score = 0;
  const details: string[] = [];

  if (headers.https) {
    score += 30;
    details.push("HTTPS actif (chiffrement en transit)");
  } else {
    details.push("HTTPS manquant : les données transitent en clair");
  }

  if (headers.hsts) {
    score += 20;
    details.push("Strict-Transport-Security présent (force HTTPS)");
  } else {
    details.push("Header HSTS manquant (risque de downgrade HTTP)");
  }

  if (headers.contentSecurityPolicy) {
    score += 20;
    details.push("Content-Security-Policy présent (protection XSS)");
  } else {
    details.push("Content-Security-Policy manquant (risque d'injection de scripts)");
  }

  if (headers.xFrameOptions) {
    score += 10;
    details.push("X-Frame-Options présent (protection clickjacking)");
  } else {
    details.push("X-Frame-Options manquant");
  }

  if (headers.xContentTypeOptions) {
    score += 10;
    details.push("X-Content-Type-Options présent");
  } else {
    details.push("X-Content-Type-Options manquant");
  }

  if (headers.referrerPolicy) {
    score += 10;
    details.push("Referrer-Policy présent (contrôle des fuites de données)");
  } else {
    details.push("Referrer-Policy manquant (le referrer complet peut fuiter)");
  }

  return { label: "Sécurité", score, level: toLevel(score), details };
}

function scoreThirdParty(resources: ThirdPartyResource[]): SubScore {
  let score = 100;
  const details: string[] = [];

  const riskyResources = resources.filter((r) => r.gdprRisk);
  const safeResources = resources.filter((r) => !r.gdprRisk);

  for (const r of riskyResources) {
    score -= 15;
    details.push(`${r.name} (${r.domain}) : ${r.detail.split(".")[0]}`);
  }

  for (const r of safeResources) {
    details.push(`${r.name} : faible risque RGPD`);
  }

  if (resources.length === 0) {
    details.push("Aucune ressource tierce à risque détectée");
  }

  score = Math.max(0, Math.min(100, score));
  return { label: "Ressources tierces", score, level: toLevel(score), details };
}

export interface FullScoreResult {
  globalScore: number;
  globalLevel: RiskLevel;
  letterGrade: LetterGrade;
  subScores: {
    rgpd: SubScore;
    consent: SubScore;
    trackers: SubScore;
    legal: SubScore;
    bestPractices: SubScore;
    security: SubScore;
    thirdParty: SubScore;
  };
}

export function calculateFullScore(
  analytics: DetectedTool[],
  pixels: DetectedTool[],
  consentBanners: DetectedTool[],
  tagManagers: DetectedTool[],
  legalPages: LegalPages,
  securityHeaders: SecurityHeaders,
  thirdPartyResources: ThirdPartyResource[],
  consentEffectiveness: ConsentEffectiveness,
  isEcommerce: boolean = false
): FullScoreResult {
  const rgpd = scoreRgpd(analytics, pixels);
  const consent = scoreConsent(analytics, pixels, consentBanners, consentEffectiveness);
  const trackers = scoreTrackers(pixels, tagManagers, consentBanners);
  const legal = scoreLegal(legalPages, isEcommerce);
  const bestPractices = scoreBestPractices(analytics, consentBanners, tagManagers, legalPages);
  const security = scoreSecurity(securityHeaders);
  const thirdParty = scoreThirdParty(thirdPartyResources);

  // Weighted average: RGPD 25%, Consent 15%, Trackers 10%, Legal 15%, BestPractices 10%, Security 15%, ThirdParty 10%
  const globalScore = Math.round(
    rgpd.score * 0.25 +
    consent.score * 0.15 +
    trackers.score * 0.10 +
    legal.score * 0.15 +
    bestPractices.score * 0.10 +
    security.score * 0.15 +
    thirdParty.score * 0.10
  );

  const globalLevel = toLevel(globalScore);
  const letterGrade = scoreToLetterGrade(globalScore);

  return {
    globalScore,
    globalLevel,
    letterGrade,
    subScores: { rgpd, consent, trackers, legal, bestPractices, security, thirdParty },
  };
}
