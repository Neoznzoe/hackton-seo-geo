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
  "scanner.placeholder": { fr: "exemple.fr", en: "example.com" },
  "scanner.inputLabel": { fr: "URL du site à analyser", en: "Website URL to analyze" },
  "scanner.button": { fr: "Analyser", en: "Analyze" },
  "scanner.analyzing": { fr: "Analyse...", en: "Analyzing..." },
  "scanner.free": { fr: "Gratuit et sans inscription. Nous ne stockons aucune donnée.", en: "Free, no sign-up. We don't store any data." },

  // Scanner results
  "scanner.detailByCategory": { fr: "Détail par catégorie", en: "Detail by category" },
  "scanner.showDetail": { fr: "Voir le détail", en: "Show details" },
  "scanner.hideDetail": { fr: "Masquer le détail", en: "Hide details" },
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
  "scanner.errorOccurred": { fr: "Une erreur est survenue.", en: "An error occurred." },
  "scanner.breadcrumbHome": { fr: "Accueil", en: "Home" },
  "scanner.breadcrumbScanner": { fr: "Scanner RGPD", en: "GDPR Scanner" },

  // GlobalScoreCard
  "scanner.level.excellent": { fr: "Excellent", en: "Excellent" },
  "scanner.level.excellentSub": { fr: "Votre site est bien configuré", en: "Your site is well configured" },
  "scanner.level.warning": { fr: "À améliorer", en: "Needs improvement" },
  "scanner.level.warningSub": { fr: "Des points d'attention ont été détectés", en: "Some issues have been detected" },
  "scanner.level.danger": { fr: "Non conforme", en: "Non-compliant" },
  "scanner.level.dangerSub": { fr: "Des risques importants ont été identifiés", en: "Significant risks have been identified" },
  "scanner.scoreDescription": {
    fr: "Score global basé sur la conformité RGPD, le consentement, les trackers et les bonnes pratiques.",
    en: "Overall score based on GDPR compliance, consent, trackers and best practices.",
  },
  "scanner.sitemapFound": { fr: "Sitemap trouvé", en: "Sitemap found" },
  "scanner.noSitemapBadge": { fr: "Pas de sitemap", en: "No sitemap" },

  // SitemapAlert
  "scanner.sitemapAlertTitle": { fr: "Aucun sitemap trouvé", en: "No sitemap found" },
  "scanner.sitemapAlertDesc": {
    fr: "Nous n'avons pas pu trouver de fichier sitemap.xml sur ce site. Seule la page d'accueil a été analysée. Ajoutez un sitemap pour permettre une analyse multi-pages complète.",
    en: "We couldn't find a sitemap.xml file on this site. Only the homepage was analyzed. Add a sitemap to enable a complete multi-page analysis.",
  },

  // Loading steps
  "scanner.step.connecting": { fr: "Connexion au site...", en: "Connecting to site..." },
  "scanner.step.homepage": { fr: "Analyse de la page d'accueil...", en: "Analyzing homepage..." },
  "scanner.step.sitemap": { fr: "Recherche du sitemap...", en: "Searching for sitemap..." },
  "scanner.step.pages": { fr: "Analyse des pages du site...", en: "Analyzing site pages..." },
  "scanner.step.analytics": { fr: "Détection des outils analytics...", en: "Detecting analytics tools..." },
  "scanner.step.pixels": { fr: "Détection des pixels de tracking...", en: "Detecting tracking pixels..." },
  "scanner.step.consent": { fr: "Vérification du bandeau de consentement...", en: "Checking consent banner..." },
  "scanner.step.legal": { fr: "Vérification des pages légales...", en: "Checking legal pages..." },
  "scanner.step.score": { fr: "Calcul du score RGPD...", en: "Calculating GDPR score..." },

  // Plan selector
  "plan.free": { fr: "Gratuit", en: "Free" },
  "plan.essential": { fr: "Essentiel", en: "Essential" },
  "plan.pro": { fr: "Pro", en: "Pro" },
  "plan.expert": { fr: "Expert", en: "Expert" },
  "plan.popular": { fr: "Populaire", en: "Popular" },
  "plan.pagesMax": { fr: "pages max", en: "max pages" },
  "plan.pageMax": { fr: "page", en: "page" },
  "plan.freeDesc": { fr: "Apercu rapide, donnees limitees", en: "Quick overview, limited data" },
  "plan.essentialDesc": { fr: "Analyse complete de 5 pages", en: "Full analysis of 5 pages" },
  "plan.proDesc": { fr: "Couverture etendue du site", en: "Extended site coverage" },
  "plan.expertDesc": { fr: "Audit exhaustif de toutes les pages", en: "Exhaustive audit of all pages" },
  "plan.analyze": { fr: "Analyser", en: "Analyze" },
  "plan.unlock": { fr: "Debloquer", en: "Unlock" },
  "plan.upTo": { fr: "Jusqu'a", en: "Up to" },
  "plan.pages": { fr: "pages", en: "pages" },
  "plan.allPages": { fr: "Toutes les pages", en: "All pages" },
  "plan.perScan": { fr: "/scan", en: "/scan" },

  // Premium gate
  "premium.unlock": { fr: "Debloquer cette section", en: "Unlock this section" },
  "premium.upgradeDesc": {
    fr: "Passez a un plan premium pour acceder aux details complets de l'analyse.",
    en: "Upgrade to a premium plan to access full analysis details.",
  },
  "premium.choosePlan": { fr: "Choisir un plan", en: "Choose a plan" },

  // PDF export
  "export.pdf": { fr: "Exporter en PDF", en: "Export as PDF" },
  "export.generating": { fr: "Generation...", en: "Generating..." },

  // ActionPlan priorities
  "scanner.urgent": { fr: "Urgent", en: "Urgent" },
  "scanner.recommended": { fr: "Recommandé", en: "Recommended" },
  "scanner.optional": { fr: "Optionnel", en: "Optional" },

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
  "legal.cgvNotRequired": { fr: "Non requis (site non-marchand)", en: "Not required (non-commercial site)" },
  "legal.cookies": { fr: "Politique cookies", en: "Cookie policy" },
  "legal.cookiesRequired": { fr: "Recommandé", en: "Recommended" },

  // Security headers
  "security.title": { fr: "En-têtes de sécurité", en: "Security headers" },
  "security.headersPresent": { fr: "headers présents", en: "headers present" },
  "security.https": { fr: "Chiffrement en transit", en: "In-transit encryption" },
  "security.hsts": { fr: "Force HTTPS", en: "Forces HTTPS" },
  "security.csp": { fr: "Protection XSS", en: "XSS protection" },
  "security.xframe": { fr: "Protection clickjacking", en: "Clickjacking protection" },
  "security.xcontent": { fr: "Protection MIME sniffing", en: "MIME sniffing protection" },
  "security.referrer": { fr: "Contrôle des fuites de données", en: "Data leak control" },

  // Third party
  "thirdParty.title": { fr: "Ressources tierces", en: "Third-party resources" },
  "thirdParty.none": { fr: "Aucune ressource tierce détectée", en: "No third-party resource detected" },
  "thirdParty.noExternal": { fr: "Aucune ressource tierce externe identifiée.", en: "No external third-party resource identified." },
  "thirdParty.detected": { fr: "détectée", en: "detected" },
  "thirdParty.detectedPlural": { fr: "détectées", en: "detected" },
  "thirdParty.atRisk": { fr: "à risque", en: "at risk" },
  "thirdParty.lowRisk": { fr: "Faible risque RGPD", en: "Low GDPR risk" },
  "thirdParty.font": { fr: "Police", en: "Font" },
  "thirdParty.embed": { fr: "Embed", en: "Embed" },
  "thirdParty.cdn": { fr: "CDN", en: "CDN" },
  "thirdParty.captcha": { fr: "Captcha", en: "Captcha" },

  // Consent effectiveness
  "consentEff.title": { fr: "Efficacité du consentement", en: "Consent effectiveness" },
  "consentEff.blocked": { fr: "Scripts bloqués avant consentement", en: "Scripts blocked before consent" },
  "consentEff.notBlocked": { fr: "Aucun blocage détecté", en: "No blocking detected" },
  "consentEff.warning": {
    fr: "Le bandeau est présent mais les scripts semblent chargés avant le consentement.",
    en: "The banner is present but scripts seem loaded before consent.",
  },

  // Sitemap alert (full)
  "sitemap.notFound": {
    fr: "Aucun sitemap trouvé. Seule la page d'accueil a été analysée. Ajoutez un sitemap.xml pour une analyse plus complète.",
    en: "No sitemap found. Only the homepage was analyzed. Add a sitemap.xml for a more complete analysis.",
  },

  // Action section
  "action.compareTools": { fr: "Comparer les outils", en: "Compare tools" },
  "action.compareDesc": { fr: "Trouvez l'alternative idéale", en: "Find the ideal alternative" },
  "action.migrationGuide": { fr: "Guide de migration", en: "Migration guide" },
  "action.migrationDesc": { fr: "Étape par étape", en: "Step by step" },
  "action.rgpdAnalytics": { fr: "RGPD & Analytics", en: "GDPR & Analytics" },
  "action.rgpdDesc": { fr: "Tout savoir sur la conformité", en: "Everything about compliance" },
  "action.allTools": { fr: "Tous les outils", en: "All tools" },
  "action.allToolsDesc": { fr: "8 solutions analysées", en: "8 solutions analyzed" },

  // Table of contents
  "toc.title": { fr: "Sommaire", en: "Table of contents" },

  // Summary box
  "summary.title": { fr: "En résumé", en: "Summary" },

  // Tool detail page
  "tool.breadcrumb": { fr: "Outils", en: "Tools" },
  "tool.presentation": { fr: "Présentation de", en: "About" },
  "tool.pricing": { fr: "Tarifs de", en: "Pricing for" },
  "tool.features": { fr: "Fonctionnalités", en: "Features" },
  "tool.compliance": { fr: "Conformité RGPD et vie privée", en: "GDPR compliance and privacy" },
  "tool.prosCons": { fr: "Avantages et inconvénients", en: "Pros and cons" },
  "tool.faqAbout": { fr: "Questions fréquentes sur", en: "FAQ about" },
  "tool.compareWith": { fr: "Comparez {name} avec les alternatives", en: "Compare {name} with alternatives" },
  "tool.visitWebsite": { fr: "Visiter le site officiel", en: "Visit official website" },
  "tool.summary.gdpr": { fr: "RGPD", en: "GDPR" },
  "tool.summary.compliant": { fr: "conforme", en: "compliant" },
  "tool.summary.nonCompliant": { fr: "non conforme", en: "non-compliant" },
  "tool.summary.cnilExempt": { fr: "exemptée de consentement CNIL", en: "CNIL consent-exempt" },
  "tool.summary.cookieless": { fr: "sans cookies", en: "cookieless" },
  "tool.summary.dataHosted": { fr: "Données hébergées", en: "Data hosted" },
  "tool.summary.freeTier": { fr: "Offre gratuite disponible.", en: "Free tier available." },
  "tool.summary.startingAt": { fr: "À partir de", en: "Starting at" },

  // TOC items for tool detail
  "toc.presentation": { fr: "Présentation", en: "Overview" },
  "toc.pricing": { fr: "Tarifs", en: "Pricing" },
  "toc.features": { fr: "Fonctionnalités", en: "Features" },
  "toc.compliance": { fr: "Conformité RGPD", en: "GDPR Compliance" },
  "toc.prosCons": { fr: "Avantages / Inconvénients", en: "Pros / Cons" },
  "toc.faq": { fr: "FAQ", en: "FAQ" },
  "toc.compare": { fr: "Comparer", en: "Compare" },

  // Scanner FAQ
  "scannerFaq.q1": { fr: "Comment fonctionne le scanner RGPD ?", en: "How does the GDPR scanner work?" },
  "scannerFaq.a1": {
    fr: "Le scanner analyse le code source HTML de la page d'accueil du site indiqué. Il recherche les signatures connues des outils analytics (Google Analytics, Matomo, Plausible...), des pixels de tracking (Meta, LinkedIn, TikTok...) et des bandeaux de consentement (Tarteaucitron, Axeptio, Cookiebot...). Le score de risque est calculé en fonction des outils détectés et de la présence d'un bandeau de consentement.",
    en: "The scanner analyzes the HTML source code of the specified site's homepage. It searches for known signatures of analytics tools (Google Analytics, Matomo, Plausible...), tracking pixels (Meta, LinkedIn, TikTok...) and consent banners (Tarteaucitron, Axeptio, Cookiebot...). The risk score is calculated based on detected tools and the presence of a consent banner.",
  },
  "scannerFaq.q2": { fr: "Quels outils analytics sont détectés ?", en: "Which analytics tools are detected?" },
  "scannerFaq.a2": {
    fr: "Le scanner détecte Google Analytics 4, Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics, Adobe Analytics, Umami, ainsi que les pixels Meta (Facebook), LinkedIn, TikTok, Twitter/X et Hotjar. Il identifie également Google Tag Manager et les principaux bandeaux de consentement.",
    en: "The scanner detects Google Analytics 4, Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics, Adobe Analytics, Umami, as well as Meta (Facebook), LinkedIn, TikTok, Twitter/X and Hotjar pixels. It also identifies Google Tag Manager and major consent banners.",
  },
  "scannerFaq.q3": { fr: "Le scanner stocke-t-il des données ?", en: "Does the scanner store data?" },
  "scannerFaq.a3": {
    fr: "Non, le scanner ne stocke aucune donnée. L'analyse est effectuée en temps réel et les résultats ne sont pas conservés. Seul le code HTML public de la page est analysé, aucune donnée personnelle n'est collectée.",
    en: "No, the scanner does not store any data. The analysis is performed in real-time and results are not retained. Only the public HTML code of the page is analyzed, no personal data is collected.",
  },
  "scannerFaq.q4": { fr: "Qu'est-ce qu'un outil exempté CNIL ?", en: "What is a CNIL-exempt tool?" },
  "scannerFaq.a4": {
    fr: "La CNIL accorde une exemption de consentement à certains outils analytics qui respectent des critères stricts : données anonymisées, pas de transfert hors UE, finalité strictement limitée à la mesure d'audience. Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics et Umami bénéficient de cette exemption sous certaines configurations.",
    en: "The CNIL grants a consent exemption to certain analytics tools that meet strict criteria: anonymized data, no transfers outside the EU, purpose strictly limited to audience measurement. Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics and Umami benefit from this exemption under certain configurations.",
  },
  "scannerFaq.q5": { fr: "Le score de risque est-il fiable à 100% ?", en: "Is the risk score 100% reliable?" },
  "scannerFaq.a5": {
    fr: "Le scanner analyse uniquement le code source HTML visible de la page d'accueil. Certains scripts peuvent être chargés dynamiquement, via un tag manager, ou sur d'autres pages du site. Le score donne une indication fiable mais ne remplace pas un audit RGPD complet.",
    en: "The scanner only analyzes the visible HTML source code of the homepage. Some scripts may be loaded dynamically, via a tag manager, or on other pages of the site. The score provides a reliable indication but does not replace a complete GDPR audit.",
  },

  // Page details
  "pageDetails.title": { fr: "Détail par page", en: "Detail by page" },
  "pageDetails.pagesWithIssues": { fr: "page avec des problèmes", en: "page with issues" },
  "pageDetails.pagesWithIssuesPlural": { fr: "pages avec des problèmes", en: "pages with issues" },
  "pageDetails.clean": { fr: "sans problème", en: "clean" },
  "pageDetails.noIssues": {
    fr: "Aucun problème détecté sur les pages analysées",
    en: "No issues detected on analyzed pages",
  },
  "pageDetails.issue": { fr: "problème", en: "issue" },
  "pageDetails.issues": { fr: "problèmes", en: "issues" },
  "pageDetails.severityHigh": { fr: "Critique", en: "Critical" },
  "pageDetails.severityMedium": { fr: "Moyen", en: "Medium" },
  "pageDetails.severityLow": { fr: "Faible", en: "Low" },
  "pageDetails.consentMissing": {
    fr: "Bandeau de consentement manquant",
    en: "Consent banner missing",
  },
  "pageDetails.nonExempt": { fr: "non-exempt CNIL", en: "non-exempt CNIL" },
  "pageDetails.filterAll": { fr: "Toutes", en: "All" },
  "pageDetails.filterIssues": { fr: "Avec problemes", en: "With issues" },
  "pageDetails.filterClean": { fr: "Sans probleme", en: "Clean" },
  "pageDetails.pagesScanned": { fr: "pages analysees", en: "pages scanned" },
  "pageDetails.homepage": { fr: "Page d'accueil", en: "Homepage" },

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

  // Category page
  "category.breadcrumb": { fr: "Catégories", en: "Categories" },
  "category.toolsInCategory": { fr: "outil dans cette catégorie", en: "tool in this category" },
  "category.toolsInCategoryPlural": { fr: "outils dans cette catégorie", en: "tools in this category" },
  "category.comparison": { fr: "Comparatif", en: "Comparison" },
} as const;

export type TranslationKey = keyof typeof translations;
