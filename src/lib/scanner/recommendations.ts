import {
  DetectedTool,
  LegalPages,
  Recommendation,
  SecurityHeaders,
  ThirdPartyResource,
  ConsentEffectiveness,
} from "./types";

export function generateRecommendations(
  analytics: DetectedTool[],
  pixels: DetectedTool[],
  consentBanners: DetectedTool[],
  tagManagers: DetectedTool[],
  legalPages: LegalPages,
  riskLevel: string,
  securityHeaders: SecurityHeaders,
  thirdPartyResources: ThirdPartyResource[],
  consentEffectiveness: ConsentEffectiveness
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const hasConsent = consentBanners.length > 0;
  const hasGtm = tagManagers.some((t) => t.id === "gtm");

  // --- Legal pages ---

  if (!legalPages.mentionsLegales) {
    recommendations.push({
      title: "Ajouter des mentions legales",
      description:
        "Les mentions legales sont obligatoires pour tout site web (loi LCEN). Elles doivent inclure l'identite de l'editeur, l'hebergeur, et le directeur de publication.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide conformite",
      priority: "high",
    });
  }

  if (!legalPages.politiqueConfidentialite) {
    recommendations.push({
      title: "Ajouter une politique de confidentialite",
      description:
        "Le RGPD (article 13) impose d'informer les utilisateurs sur le traitement de leurs donnees personnelles : finalites, base legale, duree de conservation, droits des personnes.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide RGPD",
      priority: "high",
    });
  }

  if (!legalPages.cgu) {
    recommendations.push({
      title: "Ajouter des conditions generales d'utilisation (CGU)",
      description:
        "Les CGU encadrent l'utilisation de votre site et protegent votre responsabilite. Elles sont fortement recommandees pour tout site web.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide conformite",
      priority: "medium",
    });
  }

  if (!legalPages.politiqueCookies && (pixels.length > 0 || analytics.some((t) => !t.cnilExempt))) {
    recommendations.push({
      title: "Ajouter une politique cookies",
      description:
        "Votre site utilise des outils non-exempts qui deposent des cookies. Une page dediee expliquant les cookies utilises et leur finalite est recommandee par la CNIL.",
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

  // --- Consent ---

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

  // --- Consent effectiveness ---

  if (hasConsent && !consentEffectiveness.scriptsBlocked) {
    recommendations.push({
      title: "Configurer le blocage des scripts avant consentement",
      description:
        "Un bandeau est present mais les scripts ne semblent pas bloques avant consentement. Utilisez type=\"text/plain\" ou les attributs data-consent pour bloquer les scripts tant que le visiteur n'a pas consenti.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide blocage scripts",
      priority: "high",
    });
  }

  // --- Security headers ---

  if (!securityHeaders.https) {
    recommendations.push({
      title: "Activer HTTPS",
      description:
        "Votre site n'utilise pas HTTPS. Les donnees transitent en clair, ce qui expose les visiteurs a des risques de vol de donnees. Installez un certificat SSL/TLS (Let's Encrypt est gratuit).",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide securite",
      priority: "high",
    });
  }

  if (securityHeaders.https && !securityHeaders.hsts) {
    recommendations.push({
      title: "Ajouter le header Strict-Transport-Security (HSTS)",
      description:
        "HSTS force les navigateurs a utiliser HTTPS, empechant les attaques de downgrade HTTP. Ajoutez l'en-tete avec max-age d'au moins 6 mois.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide headers securite",
      priority: "medium",
    });
  }

  if (!securityHeaders.contentSecurityPolicy) {
    recommendations.push({
      title: "Ajouter une Content-Security-Policy (CSP)",
      description:
        "La CSP protege contre les injections de scripts (XSS) en limitant les sources de contenu autorisees. C'est aussi un moyen de controler les scripts tiers charges sur votre site.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide CSP",
      priority: "medium",
    });
  }

  if (!securityHeaders.referrerPolicy) {
    recommendations.push({
      title: "Ajouter un Referrer-Policy",
      description:
        "Sans Referrer-Policy, les URLs completes de votre site peuvent fuiter vers les sites tiers. Utilisez \"strict-origin-when-cross-origin\" ou \"no-referrer\" pour limiter les fuites de donnees.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide Referrer-Policy",
      priority: "low",
    });
  }

  // --- Third-party resources ---

  const riskyResources = thirdPartyResources.filter((r) => r.gdprRisk);

  if (riskyResources.some((r) => r.name === "Google Fonts")) {
    recommendations.push({
      title: "Heberger les polices Google Fonts localement",
      description:
        "Google Fonts transfere l'IP des visiteurs vers Google (USA). Depuis l'arret LG Munich 2022, cela peut entrainer une amende. Telechargez et hebergez les polices sur votre serveur.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide Google Fonts RGPD",
      priority: "high",
    });
  }

  if (riskyResources.some((r) => r.name === "YouTube")) {
    recommendations.push({
      title: "Utiliser youtube-nocookie.com pour les embeds YouTube",
      description:
        "L'embed YouTube standard depose des cookies de tracking Google. Remplacez youtube.com/embed par youtube-nocookie.com/embed ou ajoutez un consentement prealable.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide embeds RGPD",
      priority: "medium",
    });
  }

  if (riskyResources.some((r) => r.name === "Google reCAPTCHA")) {
    recommendations.push({
      title: "Remplacer reCAPTCHA par une alternative respectueuse",
      description:
        "reCAPTCHA collecte des donnees comportementales et les transfere a Google. Des alternatives comme hCaptcha ou Cloudflare Turnstile sont plus respectueuses de la vie privee.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Alternatives a reCAPTCHA",
      priority: "medium",
    });
  }

  if (riskyResources.some((r) => r.name === "Google Maps")) {
    recommendations.push({
      title: "Envisager OpenStreetMap pour remplacer Google Maps",
      description:
        "Google Maps transfere des donnees vers les USA et depose des cookies. OpenStreetMap (via Leaflet) est une alternative open-source sans tracking.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Alternatives a Google Maps",
      priority: "medium",
    });
  }

  if (riskyResources.some((r) => r.name === "Adobe Fonts (Typekit)")) {
    recommendations.push({
      title: "Heberger les polices Adobe Fonts localement",
      description:
        "Adobe Fonts transfere des donnees vers les USA. Telechargez les polices et hebergez-les sur votre serveur pour eviter les transferts de donnees.",
      link: "/ressources/rgpd-analytics",
      linkLabel: "Guide polices RGPD",
      priority: "medium",
    });
  }

  // --- No analytics ---

  if (analytics.length === 0 && hasGtm && hasConsent) {
    recommendations.push({
      title: "Configuration conforme detectee",
      description:
        "Un tag manager et un bandeau de consentement sont en place. Les outils analytics sont probablement charges apres consentement, ce qui est conforme. Pour aller plus loin, envisagez une solution exemptee CNIL.",
      link: "/comparer",
      linkLabel: "Comparer les alternatives",
      priority: "low",
    });
  }

  if (analytics.length === 0 && !hasGtm) {
    recommendations.push({
      title: "Installer un outil analytics conforme",
      description:
        "Aucun outil analytics n'a ete detecte. Plausible ou Matomo sont d'excellentes options conformes RGPD, exemptees CNIL et faciles a installer.",
      link: "/outils/plausible",
      linkLabel: "Decouvrir Plausible",
      priority: "medium",
    });
  }

  // --- Already compliant ---
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
