export type Locale = "fr" | "en";

export const translations = {
  // Header
  "nav.compare": { fr: "Comparer", en: "Compare" },
  "nav.tools": { fr: "Outils", en: "Tools" },
  "nav.guide": { fr: "Guide", en: "Guide" },
  "nav.glossary": { fr: "Glossaire", en: "Glossary" },
  "nav.scan": { fr: "Scanner mon site", en: "Scan my site" },
  "nav.openMenu": { fr: "Ouvrir le menu", en: "Open menu" },

  // Footer
  "footer.description": {
    fr: "Comparateur d'outils analytics web. Trouvez la solution adaptée à vos besoins en matière de confidentialité, fonctionnalités et budget.",
    en: "Web analytics tools comparator. Find the solution that fits your privacy needs, features and budget.",
  },
  "footer.tools": { fr: "Outils", en: "Tools" },
  "footer.categories": { fr: "Catégories", en: "Categories" },
  "footer.compareAll": { fr: "Comparer tous les outils", en: "Compare all tools" },
  "footer.resources": { fr: "Ressources", en: "Resources" },
  "footer.freeScanner": { fr: "Scanner RGPD gratuit", en: "Free GDPR Scanner" },
  "footer.guideChoose": { fr: "Guide : choisir son outil", en: "Guide: choose your tool" },
  "footer.rgpdAnalytics": { fr: "RGPD et analytics", en: "GDPR & analytics" },
  "footer.legalNotice": { fr: "Mentions légales", en: "Legal notice" },
  "footer.privacyPolicy": { fr: "Politique de confidentialité", en: "Privacy policy" },
  "footer.cookiePolicy": { fr: "Politique de cookies", en: "Cookie policy" },
  "footer.competitive": { fr: "Veille concurrentielle", en: "Competitive intelligence" },
  "footer.rights": { fr: "Tous droits réservés.", en: "All rights reserved." },
  "footer.project": { fr: "Projet hackathon M2 IW.", en: "M2 IW Hackathon project." },

  // Scanner Hero
  "scanner.title": { fr: "Scanner RGPD Analytics", en: "GDPR Analytics Scanner" },
  "scanner.subtitle": {
    fr: "Analysez n'importe quel site web pour détecter ses outils analytics, évaluer sa conformité RGPD/CNIL, et recevoir des recommandations personnalisées.",
    en: "Analyze any website to detect its analytics tools, evaluate GDPR/CNIL compliance, and receive personalized recommendations.",
  },
  "scanner.placeholder": { fr: "https://example.com", en: "https://example.com" },
  "scanner.button": { fr: "Analyser", en: "Analyze" },
  "scanner.analyzing": { fr: "Analyse en cours...", en: "Analyzing..." },
  "scanner.free": { fr: "Gratuit et sans inscription. Nous ne stockons aucune donnée.", en: "Free, no sign-up. We don't store any data." },

  // Scanner results
  "scanner.score.excellent": { fr: "Excellent", en: "Excellent" },
  "scanner.score.good": { fr: "Votre site est bien configuré", en: "Your site is well configured" },
  "scanner.score.warning": { fr: "Des améliorations sont possibles", en: "Improvements are possible" },
  "scanner.score.danger": { fr: "Des problèmes importants détectés", en: "Significant issues detected" },
  "scanner.detailByCategory": { fr: "Détail par catégorie", en: "Detail by category" },
  "scanner.showDetail": { fr: "Voir le détail", en: "Show detail" },
  "scanner.hideDetail": { fr: "Masquer", en: "Hide" },
  "scanner.detectedTools": { fr: "Outils détectés", en: "Detected tools" },
  "scanner.analytics": { fr: "Analytics", en: "Analytics" },
  "scanner.noAnalytics": {
    fr: "Aucun outil analytics détecté — bon pour la vie privée",
    en: "No analytics tool detected — good for privacy",
  },
  "scanner.trackingPixels": { fr: "Pixels de tracking", en: "Tracking pixels" },
  "scanner.noPixels": { fr: "Aucun pixel détecté", en: "No pixel detected" },
  "scanner.tagManagers": { fr: "Tag managers", en: "Tag managers" },
  "scanner.noTagManager": { fr: "Aucun tag manager détecté", en: "No tag manager detected" },
  "scanner.deepAnalysis": { fr: "Analyse approfondie", en: "Deep analysis" },
  "scanner.actionPlan": { fr: "Plan d'action", en: "Action plan" },
  "scanner.recommendations": { fr: "recommandations", en: "recommendations" },
  "scanner.goFurther": { fr: "Aller plus loin", en: "Go further" },
  "scanner.faq": { fr: "Questions fréquentes", en: "FAQ" },
  "scanner.pagesAnalyzed": { fr: "page analysée", en: "page analyzed" },
  "scanner.pagesAnalyzedPlural": { fr: "pages analysées", en: "pages analyzed" },
  "scanner.inSitemap": { fr: "dans le sitemap", en: "in sitemap" },
  "scanner.analysisDate": { fr: "Analyse effectuée le", en: "Analysis performed on" },
  "scanner.error": { fr: "Erreur d'analyse", en: "Analysis error" },
  "scanner.retry": { fr: "Réessayer", en: "Retry" },

  // Consent banner card
  "consent.title": { fr: "Bandeau de consentement", en: "Consent banner" },
  "consent.detected": { fr: "Bandeau détecté", en: "Banner detected" },
  "consent.missingRequired": {
    fr: "Aucun bandeau de consentement détecté. Des outils non-exempts CNIL ont été détectés, un bandeau est obligatoire.",
    en: "No consent banner detected. Non-exempt CNIL tools were detected, a banner is required.",
  },
  "consent.notNeeded": {
    fr: "Aucun bandeau nécessaire : pas d'outil non-exempt CNIL détecté sur votre site.",
    en: "No banner needed: no non-exempt CNIL tool detected on your site.",
  },

  // Legal pages card
  "legal.title": { fr: "Pages légales", en: "Legal pages" },
  "legal.mentionsLegales": { fr: "Mentions légales", en: "Legal notice" },
  "legal.mentionsRequired": { fr: "Obligatoire (loi LCEN)", en: "Required (LCEN law)" },
  "legal.privacy": { fr: "Politique de confidentialité", en: "Privacy policy" },
  "legal.privacyRequired": { fr: "Obligatoire (RGPD art. 13)", en: "Required (GDPR art. 13)" },
  "legal.cgu": { fr: "CGU", en: "Terms of use" },
  "legal.cguRequired": { fr: "Fortement recommandé", en: "Strongly recommended" },
  "legal.cgv": { fr: "CGV", en: "Terms of sale" },
  "legal.cgvRequired": { fr: "Obligatoire (e-commerce)", en: "Required (e-commerce)" },
  "legal.cookies": { fr: "Politique cookies", en: "Cookie policy" },
  "legal.cookiesRequired": { fr: "Recommandé", en: "Recommended" },

  // Security headers
  "security.title": { fr: "En-têtes de sécurité", en: "Security headers" },
  "security.headersPresent": { fr: "headers présents", en: "headers present" },

  // Third party
  "thirdParty.title": { fr: "Ressources tierces", en: "Third-party resources" },
  "thirdParty.none": { fr: "Aucune ressource tierce détectée", en: "No third-party resource detected" },
  "thirdParty.risk": { fr: "à risque identifiée", en: "at-risk identified" },
  "thirdParty.noRisk": { fr: "Aucune ressource tierce à risque détectée", en: "No at-risk third-party resource detected" },

  // Consent effectiveness
  "consentEff.title": { fr: "Efficacité du consentement", en: "Consent effectiveness" },
  "consentEff.blocked": { fr: "Scripts bloqués avant consentement", en: "Scripts blocked before consent" },
  "consentEff.notBlocked": { fr: "Aucun blocage détecté", en: "No blocking detected" },
  "consentEff.warning": {
    fr: "Le bandeau est présent mais les scripts semblent chargés avant le consentement.",
    en: "The banner is present but scripts seem loaded before consent.",
  },

  // Plans
  "plan.free": { fr: "Gratuit", en: "Free" },
  "plan.fast": { fr: "Rapide", en: "Fast" },
  "plan.complete": { fr: "Complet", en: "Complete" },

  // Action section
  "action.compareTools": { fr: "Comparer les outils", en: "Compare tools" },
  "action.compareDesc": { fr: "Trouvez l'alternative idéale", en: "Find the ideal alternative" },
  "action.migrationGuide": { fr: "Guide de migration", en: "Migration guide" },
  "action.migrationDesc": { fr: "Étape par étape", en: "Step by step" },
  "action.rgpdAnalytics": { fr: "RGPD & Analytics", en: "GDPR & Analytics" },
  "action.rgpdDesc": { fr: "Tout savoir sur la conformité", en: "Everything about compliance" },
  "action.allTools": { fr: "Tous les outils", en: "All tools" },
  "action.allToolsDesc": { fr: "8 solutions analysées", en: "8 solutions analyzed" },

  // Sitemap alert
  "sitemap.notFound": {
    fr: "Aucun sitemap trouvé. Seule la page d'accueil a été analysée. Ajoutez un sitemap.xml pour une analyse plus complète.",
    en: "No sitemap found. Only the homepage was analyzed. Add a sitemap.xml for a more complete analysis.",
  },

  // Theme
  "theme.light": { fr: "Clair", en: "Light" },
  "theme.dark": { fr: "Sombre", en: "Dark" },

  // Homepage
  "home.heroTitle": {
    fr: "Trouvez l'outil analytics respectueux de la vie privée",
    en: "Find the privacy-friendly analytics tool",
  },
  "home.heroSubtitle": {
    fr: "Comparez les meilleures solutions analytics web en matière de conformité RGPD, fonctionnalités et prix.",
    en: "Compare the best web analytics solutions for GDPR compliance, features and pricing.",
  },
  "home.scanCta": { fr: "Scanner mon site gratuitement", en: "Scan my site for free" },
  "home.compareCta": { fr: "Comparer les outils", en: "Compare tools" },
  "home.toolsTitle": { fr: "Outils analysés", en: "Analyzed tools" },

  // Loading
  "loading.analyzing": { fr: "Analyse en cours...", en: "Analyzing..." },
  "loading.homepage": { fr: "Analyse de la page d'accueil...", en: "Analyzing homepage..." },
  "loading.sitemap": { fr: "Découverte du sitemap...", en: "Discovering sitemap..." },
  "loading.tools": { fr: "Détection des outils...", en: "Detecting tools..." },
  "loading.legal": { fr: "Vérification des pages légales...", en: "Checking legal pages..." },
  "loading.score": { fr: "Calcul du score...", en: "Calculating score..." },
} as const;

export type TranslationKey = keyof typeof translations;
