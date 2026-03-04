import { DetectedTool, Recommendation } from "./types";

export function generateRecommendations(
  analytics: DetectedTool[],
  pixels: DetectedTool[],
  consentBanners: DetectedTool[],
  riskLevel: string
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const hasConsent = consentBanners.length > 0;

  // GA4 detected
  if (analytics.some((t) => t.id === "ga4")) {
    recommendations.push({
      title: "Remplacer Google Analytics 4 par une alternative conforme",
      description:
        "GA4 transfere les donnees vers les USA et necessite un consentement explicite. Matomo ou Plausible sont des alternatives conformes RGPD et exemptees CNIL.",
      link: "/comparer/google-analytics-4-vs-matomo",
      linkLabel: "Comparer GA4 vs Matomo",
      priority: "high",
    });
    recommendations.push({
      title: "Decouvrir Plausible comme alternative legere",
      description:
        "Plausible est une solution analytics simple, sans cookies, conforme RGPD et exemptee CNIL.",
      link: "/comparer/google-analytics-4-vs-plausible",
      linkLabel: "Comparer GA4 vs Plausible",
      priority: "medium",
    });
  }

  // Adobe detected
  if (analytics.some((t) => t.id === "adobe-analytics")) {
    recommendations.push({
      title: "Migrer d'Adobe Analytics vers Piwik PRO",
      description:
        "Piwik PRO offre des fonctionnalites entreprise comparables a Adobe Analytics tout en etant conforme RGPD avec hebergement europeen.",
      link: "/comparer/adobe-analytics-vs-piwik-pro",
      linkLabel: "Comparer Adobe vs Piwik PRO",
      priority: "high",
    });
  }

  // Pixels without consent
  if (pixels.length > 0 && !hasConsent) {
    recommendations.push({
      title: "Ajouter un bandeau de consentement",
      description:
        "Des pixels de tracking tiers ont ete detectes sans bandeau de consentement. Un bandeau conforme RGPD est obligatoire (Tarteaucitron, Axeptio, Cookiebot...).",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide RGPD Analytics",
      priority: "high",
    });
  }

  // Non-exempt analytics without consent
  const nonExemptWithoutConsent =
    analytics.filter((t) => !t.cnilExempt).length > 0 && !hasConsent;
  if (nonExemptWithoutConsent && !recommendations.some((r) => r.title.includes("bandeau"))) {
    recommendations.push({
      title: "Mettre en place un bandeau de consentement",
      description:
        "Votre outil analytics necessite le consentement des visiteurs. Ajoutez un bandeau conforme (Tarteaucitron, Axeptio, Cookiebot, Didomi ou OneTrust).",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide RGPD Analytics",
      priority: "high",
    });
  }

  // No analytics at all
  if (analytics.length === 0) {
    recommendations.push({
      title: "Installer un outil analytics conforme",
      description:
        "Aucun outil analytics n'a ete detecte. Plausible ou Matomo sont d'excellentes options conformes RGPD, exemptees CNIL et faciles a installer.",
      link: "/outils/plausible",
      linkLabel: "Decouvrir Plausible",
      priority: "medium",
    });
    recommendations.push({
      title: "Decouvrir Matomo pour une solution complete",
      description:
        "Matomo est une alternative open source et complete a Google Analytics, conforme RGPD et exemptee CNIL.",
      link: "/outils/matomo",
      linkLabel: "Decouvrir Matomo",
      priority: "medium",
    });
  }

  // Already compliant
  if (riskLevel === "faible" && analytics.length > 0) {
    recommendations.push({
      title: "Votre site est bien configure !",
      description:
        "Felicitations, vos outils analytics semblent conformes RGPD. Continuez a surveiller votre conformite et consultez nos comparatifs pour optimiser votre stack.",
      link: "/comparer",
      linkLabel: "Voir tous les comparatifs",
      priority: "low",
    });
  }

  return recommendations;
}
