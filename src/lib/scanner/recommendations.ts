import { DetectedTool, LegalPages, Recommendation } from "./types";

export function generateRecommendations(
  analytics: DetectedTool[],
  pixels: DetectedTool[],
  consentBanners: DetectedTool[],
  tagManagers: DetectedTool[],
  legalPages: LegalPages,
  riskLevel: string
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const hasConsent = consentBanners.length > 0;
  const hasGtm = tagManagers.some((t) => t.id === "gtm");

  // --- Legal pages ---

  if (!legalPages.mentionsLegales) {
    recommendations.push({
      title: "Ajouter des mentions légales",
      description:
        "Les mentions légales sont obligatoires pour tout site web (loi LCEN). Elles doivent inclure l'identité de l'éditeur, l'hébergeur, et le directeur de publication.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide conformité",
      priority: "high",
    });
  }

  if (!legalPages.politiqueConfidentialite) {
    recommendations.push({
      title: "Ajouter une politique de confidentialité",
      description:
        "Le RGPD (article 13) impose d'informer les utilisateurs sur le traitement de leurs données personnelles : finalités, base légale, durée de conservation, droits des personnes.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide RGPD",
      priority: "high",
    });
  }

  if (!legalPages.cgu) {
    recommendations.push({
      title: "Ajouter des conditions générales d'utilisation (CGU)",
      description:
        "Les CGU encadrent l'utilisation de votre site et protègent votre responsabilité. Elles sont fortement recommandées pour tout site web.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide conformité",
      priority: "medium",
    });
  }

  if (!legalPages.politiqueCookies && (pixels.length > 0 || analytics.some((t) => !t.cnilExempt))) {
    recommendations.push({
      title: "Ajouter une politique cookies",
      description:
        "Votre site utilise des outils non-exempts qui déposent des cookies. Une page dédiée expliquant les cookies utilisés et leur finalité est recommandée par la CNIL.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide cookies CNIL",
      priority: "medium",
    });
  }

  // --- Analytics ---

  if (analytics.some((t) => t.id === "ga4")) {
    recommendations.push({
      title: "Remplacer Google Analytics 4 par une alternative conforme",
      description:
        "GA4 transfère les données vers les USA et nécessite un consentement explicite. Matomo ou Plausible sont des alternatives conformes RGPD et exemptées CNIL.",
      link: "/comparer/google-analytics-4-vs-matomo",
      linkLabel: "Comparer GA4 vs Matomo",
      priority: "high",
    });
    recommendations.push({
      title: "Découvrir Plausible comme alternative légère",
      description:
        "Plausible est une solution analytics simple, sans cookies, conforme RGPD et exemptée CNIL.",
      link: "/comparer/google-analytics-4-vs-plausible",
      linkLabel: "Comparer GA4 vs Plausible",
      priority: "medium",
    });
  }

  if (analytics.some((t) => t.id === "adobe-analytics")) {
    recommendations.push({
      title: "Migrer d'Adobe Analytics vers Piwik PRO",
      description:
        "Piwik PRO offre des fonctionnalités entreprise comparables à Adobe Analytics tout en étant conforme RGPD avec hébergement européen.",
      link: "/comparer/adobe-analytics-vs-piwik-pro",
      linkLabel: "Comparer Adobe vs Piwik PRO",
      priority: "high",
    });
  }

  // --- Consent ---

  if (pixels.length > 0 && !hasConsent) {
    recommendations.push({
      title: "Ajouter un bandeau de consentement",
      description:
        "Des pixels de tracking tiers ont été détectés sans bandeau de consentement. Un bandeau conforme RGPD est obligatoire (Tarteaucitron, Axeptio, Cookiebot...).",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide RGPD Analytics",
      priority: "high",
    });
  }

  const nonExemptWithoutConsent =
    analytics.filter((t) => !t.cnilExempt).length > 0 && !hasConsent;
  if (nonExemptWithoutConsent && !recommendations.some((r) => r.title.includes("bandeau"))) {
    recommendations.push({
      title: "Mettre en place un bandeau de consentement",
      description:
        "Votre outil analytics nécessite le consentement des visiteurs. Ajoutez un bandeau conforme (Tarteaucitron, Axeptio, Cookiebot, Didomi ou OneTrust).",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide RGPD Analytics",
      priority: "high",
    });
  }

  // --- No analytics ---

  if (analytics.length === 0 && hasGtm && hasConsent) {
    recommendations.push({
      title: "Configuration conforme détectée",
      description:
        "Un tag manager et un bandeau de consentement sont en place. Les outils analytics sont probablement chargés après consentement, ce qui est conforme. Pour aller plus loin, envisagez une solution exemptée CNIL.",
      link: "/comparer",
      linkLabel: "Comparer les alternatives",
      priority: "low",
    });
  }

  if (analytics.length === 0 && !hasGtm) {
    recommendations.push({
      title: "Installer un outil analytics conforme",
      description:
        "Aucun outil analytics n'a été détecté. Plausible ou Matomo sont d'excellentes options conformes RGPD, exemptées CNIL et faciles à installer.",
      link: "/outils/plausible",
      linkLabel: "Découvrir Plausible",
      priority: "medium",
    });
  }

  // --- Already compliant ---
  if (riskLevel === "faible" && analytics.length > 0) {
    recommendations.push({
      title: "Votre site est bien configuré !",
      description:
        "Félicitations, vos outils analytics semblent conformes RGPD. Continuez à surveiller votre conformité et consultez nos comparatifs pour optimiser votre stack.",
      link: "/comparer",
      linkLabel: "Voir tous les comparatifs",
      priority: "low",
    });
  }

  return recommendations;
}
