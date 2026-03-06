import { AnalyticsTool } from "@/lib/types";

export const tools: AnalyticsTool[] = [
  {
    slug: "google-analytics-4",
    name: "Google Analytics 4",
    shortDescription: {
      fr: "La solution analytics gratuite de Google, la plus utilisee au monde.",
      en: "Google's free analytics solution, the most widely used in the world.",
    },
    description: {
      fr: "Google Analytics 4 (GA4) est la derniere version de la plateforme d'analyse web de Google. Basee sur un modele evenementiel, elle offre un suivi cross-plateforme (web et app), des rapports d'exploration avances et une integration native avec l'ecosysteme Google (Ads, Search Console, BigQuery). GA4 est gratuite pour la majorite des utilisateurs, avec une version payante (Analytics 360) pour les grandes entreprises.",
      en: "Google Analytics 4 (GA4) is the latest version of Google's web analytics platform. Built on an event-based model, it offers cross-platform tracking (web and app), advanced exploration reports, and native integration with the Google ecosystem (Ads, Search Console, BigQuery). GA4 is free for most users, with a paid version (Analytics 360) for large enterprises.",
    },
    logoUrl: "/logos/ga4.svg",
    websiteUrl: "https://analytics.google.com",
    categories: ["gratuit", "entreprise"],
    pricing: [
      {
        name: { fr: "Gratuit", en: "Free" },
        price: "0 €",
        period: { fr: "pour toujours", en: "forever" },
        features: [
          { fr: "Jusqu'a 25 millions d'evenements/mois", en: "Up to 25 million events/month" },
          { fr: "Rapports standard et explorations", en: "Standard reports and explorations" },
          { fr: "Integration Google Ads", en: "Google Ads integration" },
          { fr: "Export BigQuery (quotidien)", en: "BigQuery export (daily)" },
          { fr: "14 mois de retention", en: "14 months data retention" },
        ],
        highlighted: true,
      },
      {
        name: "Analytics 360",
        price: "Sur devis",
        period: { fr: "a partir de ~150 000 $/an", en: "starting at ~$150,000/year" },
        features: [
          { fr: "Evenements illimites", en: "Unlimited events" },
          { fr: "Export BigQuery en streaming", en: "Streaming BigQuery export" },
          { fr: "SLA garanti (99,9 %)", en: "Guaranteed SLA (99.9%)" },
          { fr: "Attributions avancees", en: "Advanced attribution" },
          { fr: "Support dedie", en: "Dedicated support" },
        ],
      },
    ],
    features: [
      { label: { fr: "Suivi evenementiel", en: "Event tracking" }, available: true, detail: { fr: "Modele natif", en: "Native model" } },
      { label: { fr: "Analyse en temps reel", en: "Real-time analysis" }, available: true },
      { label: { fr: "Suivi e-commerce", en: "E-commerce tracking" }, available: true },
      { label: { fr: "Entonnoirs de conversion", en: "Conversion funnels" }, available: true },
      { label: { fr: "Rapports d'exploration", en: "Exploration reports" }, available: true },
      { label: { fr: "Integration Google Ads", en: "Google Ads integration" }, available: true },
      { label: { fr: "Export BigQuery", en: "BigQuery export" }, available: true },
      { label: { fr: "Respect vie privee par defaut", en: "Privacy by default" }, available: false },
      { label: { fr: "Mode sans cookies", en: "Cookieless mode" }, available: false },
      { label: { fr: "Auto-hebergement", en: "Self-hosting" }, available: false },
    ],
    compliance: {
      gdprCompliant: false,
      cnilExempt: false,
      cookieless: false,
      dataLocation: { fr: "Etats-Unis (serveurs Google)", en: "United States (Google servers)" },
      details: {
        fr: "GA4 necessite le consentement utilisateur en Europe (RGPD). Les donnees transitent par les serveurs Google aux USA. La CNIL a juge GA non conforme en fevrier 2022 sans mesures complementaires. Le mode Consent Mode v2 et le server-side tagging peuvent ameliorer la conformite.",
        en: "GA4 requires user consent in Europe (GDPR). Data passes through Google servers in the USA. The French DPA (CNIL) ruled GA non-compliant in February 2022 without additional measures. Consent Mode v2 and server-side tagging can improve compliance.",
      },
    },
    pros: [
      { fr: "Gratuit et extremement complet", en: "Free and extremely comprehensive" },
      { fr: "Integration native avec l'ecosysteme Google", en: "Native integration with the Google ecosystem" },
      { fr: "Communaute et documentation tres larges", en: "Very large community and documentation" },
      { fr: "Export BigQuery pour analyses avancees", en: "BigQuery export for advanced analysis" },
      { fr: "Suivi cross-plateforme web + app", en: "Cross-platform web + app tracking" },
    ],
    cons: [
      { fr: "Courbe d'apprentissage importante", en: "Steep learning curve" },
      { fr: "Donnees envoyees aux USA (probleme RGPD)", en: "Data sent to the USA (GDPR concern)" },
      { fr: "Interface complexe pour les debutants", en: "Complex interface for beginners" },
      { fr: "Necessite un bandeau cookies", en: "Requires a cookie consent banner" },
      { fr: "Echantillonnage sur gros volumes (version gratuite)", en: "Data sampling on high volumes (free version)" },
    ],
    faq: [
      {
        question: { fr: "Google Analytics 4 est-il gratuit ?", en: "Is Google Analytics 4 free?" },
        answer: {
          fr: "Oui, GA4 est gratuit pour la grande majorite des sites web, avec une limite de 25 millions d'evenements par mois. La version payante Analytics 360 demarre a environ 150 000 $ par an.",
          en: "Yes, GA4 is free for the vast majority of websites, with a limit of 25 million events per month. The paid Analytics 360 version starts at approximately $150,000 per year.",
        },
      },
      {
        question: { fr: "GA4 est-il conforme au RGPD ?", en: "Is GA4 GDPR compliant?" },
        answer: {
          fr: "Par defaut, GA4 n'est pas considere conforme au RGPD par la CNIL car les donnees sont transferees aux USA. Il est possible d'ameliorer la conformite via le Consent Mode v2, le server-side tagging et la pseudonymisation des donnees.",
          en: "By default, GA4 is not considered GDPR compliant by the French DPA (CNIL) because data is transferred to the USA. Compliance can be improved through Consent Mode v2, server-side tagging, and data pseudonymization.",
        },
      },
      {
        question: {
          fr: "Quelle est la difference entre Universal Analytics et GA4 ?",
          en: "What is the difference between Universal Analytics and GA4?",
        },
        answer: {
          fr: "GA4 utilise un modele evenementiel (au lieu des sessions/pages vues), offre un suivi cross-plateforme natif, et inclut l'export BigQuery gratuit. Universal Analytics a ete definitivement arrete en juillet 2024.",
          en: "GA4 uses an event-based model (instead of sessions/pageviews), offers native cross-platform tracking, and includes free BigQuery export. Universal Analytics was permanently shut down in July 2024.",
        },
      },
    ],
  },
  {
    slug: "matomo",
    name: "Matomo",
    shortDescription: {
      fr: "Alternative open source a Google Analytics avec hebergement local possible.",
      en: "Open source alternative to Google Analytics with self-hosting option.",
    },
    description: {
      fr: "Matomo (anciennement Piwik) est la principale alternative open source a Google Analytics. Il offre le choix entre un hebergement local (On-Premise) pour un controle total des donnees et une version cloud hebergee en Europe. Matomo est reconnu par la CNIL comme exempte de consentement dans sa configuration respectueuse de la vie privee.",
      en: "Matomo (formerly Piwik) is the leading open source alternative to Google Analytics. It offers a choice between self-hosting (On-Premise) for full data control and a cloud version hosted in Europe. Matomo is recognized by the French DPA (CNIL) as consent-exempt in its privacy-friendly configuration.",
    },
    logoUrl: "/logos/matomo.svg",
    websiteUrl: "https://matomo.org",
    categories: [
      "privacy-first",
      "open-source",
      "gratuit",
      "hebergement-local",
    ],
    pricing: [
      {
        name: "On-Premise",
        price: "0 €",
        period: { fr: "auto-heberge", en: "self-hosted" },
        features: [
          { fr: "Fonctionnalites completes", en: "Full features" },
          { fr: "Donnees 100 % chez vous", en: "100% data ownership" },
          { fr: "Plugins marketplace", en: "Plugin marketplace" },
          { fr: "Pas de limite de trafic", en: "No traffic limits" },
          { fr: "Support communautaire", en: "Community support" },
        ],
        highlighted: true,
      },
      {
        name: "Cloud",
        price: "23 €",
        period: { fr: "/mois", en: "/month" },
        features: [
          { fr: "Heberge en Europe (Allemagne)", en: "Hosted in Europe (Germany)" },
          { fr: "Mises a jour automatiques", en: "Automatic updates" },
          { fr: "Support par email", en: "Email support" },
          { fr: "50 000 pages vues/mois incluses", en: "50,000 pageviews/month included" },
          { fr: "Sauvegardes automatiques", en: "Automatic backups" },
        ],
      },
    ],
    features: [
      { label: { fr: "Suivi evenementiel", en: "Event tracking" }, available: true },
      { label: { fr: "Analyse en temps reel", en: "Real-time analysis" }, available: true },
      { label: { fr: "Suivi e-commerce", en: "E-commerce tracking" }, available: true },
      { label: { fr: "Entonnoirs de conversion", en: "Conversion funnels" }, available: true },
      { label: { fr: "Heatmaps et session recording", en: "Heatmaps and session recording" }, available: true, detail: { fr: "Plugin premium", en: "Premium plugin" } },
      { label: { fr: "A/B Testing", en: "A/B Testing" }, available: true, detail: { fr: "Plugin premium", en: "Premium plugin" } },
      { label: { fr: "Import Google Analytics", en: "Google Analytics import" }, available: true },
      { label: { fr: "Respect vie privee par defaut", en: "Privacy by default" }, available: true },
      { label: { fr: "Mode sans cookies", en: "Cookieless mode" }, available: true },
      { label: { fr: "Auto-hebergement", en: "Self-hosting" }, available: true },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: { fr: "Au choix : votre serveur ou cloud en Allemagne", en: "Your choice: your own server or cloud in Germany" },
      details: {
        fr: "Matomo est officiellement recommande par la CNIL. En configuration sans cookies (avec anonymisation IP), il est exempte du recueil de consentement. Les donnees restent en Europe ou sur vos propres serveurs.",
        en: "Matomo is officially recommended by the French DPA (CNIL). In cookieless configuration (with IP anonymization), it is exempt from consent collection. Data stays in Europe or on your own servers.",
      },
    },
    pros: [
      { fr: "Open source et gratuit (On-Premise)", en: "Open source and free (On-Premise)" },
      { fr: "100 % propriete des donnees", en: "100% data ownership" },
      { fr: "Exempte de consentement CNIL", en: "CNIL consent-exempt" },
      { fr: "Fonctionnalites comparables a GA4", en: "Features comparable to GA4" },
      { fr: "Import des donnees historiques GA", en: "GA historical data import" },
    ],
    cons: [
      { fr: "Version On-Premise necessite maintenance serveur", en: "On-Premise version requires server maintenance" },
      { fr: "Interface moins moderne que les alternatives", en: "Less modern interface than alternatives" },
      { fr: "Plugins premium payants (heatmaps, A/B testing)", en: "Paid premium plugins (heatmaps, A/B testing)" },
      { fr: "Cloud relativement cher pour gros volumes", en: "Cloud relatively expensive for high volumes" },
      { fr: "Performances a optimiser sur gros trafic", en: "Performance needs optimization for high traffic" },
    ],
    faq: [
      {
        question: { fr: "Matomo est-il vraiment gratuit ?", en: "Is Matomo really free?" },
        answer: {
          fr: "Oui, la version On-Premise (auto-hebergee) de Matomo est 100 % gratuite et open source. La version Cloud demarre a 23 €/mois. Certains plugins avances (heatmaps, A/B testing) sont payants.",
          en: "Yes, the On-Premise (self-hosted) version of Matomo is 100% free and open source. The Cloud version starts at €23/month. Some advanced plugins (heatmaps, A/B testing) are paid.",
        },
      },
      {
        question: { fr: "Matomo est-il exempte de consentement cookies ?", en: "Is Matomo exempt from cookie consent?" },
        answer: {
          fr: "Oui, en configuration respectueuse de la vie privee (sans cookies, avec anonymisation IP), Matomo est officiellement exempte du recueil de consentement par la CNIL.",
          en: "Yes, in privacy-friendly configuration (without cookies, with IP anonymization), Matomo is officially exempt from consent collection by the French DPA (CNIL).",
        },
      },
      {
        question: { fr: "Peut-on migrer de Google Analytics vers Matomo ?", en: "Can you migrate from Google Analytics to Matomo?" },
        answer: {
          fr: "Oui, Matomo propose un outil d'import natif qui permet de recuperer vos donnees historiques Google Analytics (Universal Analytics et GA4).",
          en: "Yes, Matomo offers a native import tool that lets you recover your Google Analytics historical data (Universal Analytics and GA4).",
        },
      },
    ],
  },
  {
    slug: "plausible",
    name: "Plausible Analytics",
    shortDescription: {
      fr: "Analytics simple, leger et respectueux de la vie privee. Script < 1 ko.",
      en: "Simple, lightweight, privacy-friendly analytics. Script < 1 KB.",
    },
    description: {
      fr: "Plausible Analytics est un outil d'analyse web leger, open source et axe sur la vie privee. Son script de tracking pese moins d'1 ko (contre ~45 ko pour GA4), ce qui n'impacte pas les performances. Plausible ne collecte aucune donnee personnelle et fonctionne sans cookies, le rendant conforme au RGPD sans bandeau de consentement.",
      en: "Plausible Analytics is a lightweight, open source, privacy-focused web analytics tool. Its tracking script weighs less than 1 KB (compared to ~45 KB for GA4), which has no impact on performance. Plausible collects no personal data and works without cookies, making it GDPR compliant without a consent banner.",
    },
    logoUrl: "/logos/plausible.svg",
    websiteUrl: "https://plausible.io",
    categories: [
      "privacy-first",
      "open-source",
      "sans-cookies",
      "hebergement-local",
    ],
    pricing: [
      {
        name: "Growth",
        price: "9 €",
        period: { fr: "/mois", en: "/month" },
        features: [
          { fr: "Jusqu'a 10 000 pages vues/mois", en: "Up to 10,000 pageviews/month" },
          { fr: "Sites illimites", en: "Unlimited websites" },
          { fr: "Tableau de bord partage", en: "Shared dashboard" },
          { fr: "API incluse", en: "API included" },
          { fr: "Heberge en Europe (Allemagne)", en: "Hosted in Europe (Germany)" },
        ],
        highlighted: true,
      },
      {
        name: "Business",
        price: "19 €",
        period: { fr: "/mois", en: "/month" },
        features: [
          { fr: "Jusqu'a 10 000 pages vues/mois", en: "Up to 10,000 pageviews/month" },
          { fr: "Revenue tracking", en: "Revenue tracking" },
          { fr: "Funnels", en: "Funnels" },
          { fr: "Ecommerce analytics", en: "Ecommerce analytics" },
          { fr: "Support prioritaire", en: "Priority support" },
        ],
      },
    ],
    features: [
      { label: { fr: "Suivi evenementiel", en: "Event tracking" }, available: true, detail: { fr: "Custom events", en: "Custom events" } },
      { label: { fr: "Analyse en temps reel", en: "Real-time analysis" }, available: true },
      { label: { fr: "Suivi e-commerce", en: "E-commerce tracking" }, available: true, detail: { fr: "Plan Business", en: "Business plan" } },
      { label: { fr: "Entonnoirs de conversion", en: "Conversion funnels" }, available: true, detail: { fr: "Plan Business", en: "Business plan" } },
      { label: { fr: "Tableau de bord simple", en: "Simple dashboard" }, available: true },
      { label: { fr: "API complete", en: "Full API" }, available: true },
      { label: { fr: "Script < 1 ko", en: "Script < 1 KB" }, available: true },
      { label: { fr: "Respect vie privee par defaut", en: "Privacy by default" }, available: true },
      { label: { fr: "Mode sans cookies", en: "Cookieless mode" }, available: true },
      { label: { fr: "Auto-hebergement", en: "Self-hosting" }, available: true, detail: { fr: "Community Edition", en: "Community Edition" } },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: { fr: "Allemagne (Hetzner, UE)", en: "Germany (Hetzner, EU)" },
      details: {
        fr: "Plausible ne collecte aucune donnee personnelle, n'utilise pas de cookies et ne fait aucun suivi cross-site. Il est conforme au RGPD, ePrivacy, PECR et CCPA sans bandeau de consentement.",
        en: "Plausible collects no personal data, does not use cookies, and performs no cross-site tracking. It is compliant with GDPR, ePrivacy, PECR, and CCPA without a consent banner.",
      },
    },
    pros: [
      { fr: "Extremement leger (< 1 ko)", en: "Extremely lightweight (< 1 KB)" },
      { fr: "Aucun cookie, conforme RGPD sans bandeau", en: "No cookies, GDPR compliant without a banner" },
      { fr: "Interface simple et intuitive", en: "Simple and intuitive interface" },
      { fr: "Open source (AGPL)", en: "Open source (AGPL)" },
      { fr: "Auto-hebergement possible", en: "Self-hosting available" },
    ],
    cons: [
      { fr: "Fonctionnalites limitees vs GA4", en: "Limited features compared to GA4" },
      { fr: "Pas de heatmaps ni session recording", en: "No heatmaps or session recording" },
      { fr: "Pas d'analyse de cohortes", en: "No cohort analysis" },
      { fr: "Tarification basee sur les pages vues", en: "Pricing based on pageviews" },
      { fr: "Moins adapte aux sites tres complexes", en: "Less suited for very complex websites" },
    ],
    faq: [
      {
        question: { fr: "Plausible est-il conforme au RGPD ?", en: "Is Plausible GDPR compliant?" },
        answer: {
          fr: "Oui, Plausible est 100 % conforme au RGPD. Il ne collecte aucune donnee personnelle, n'utilise pas de cookies et n'effectue aucun suivi cross-site. Aucun bandeau de consentement n'est necessaire.",
          en: "Yes, Plausible is 100% GDPR compliant. It collects no personal data, does not use cookies, and performs no cross-site tracking. No consent banner is required.",
        },
      },
      {
        question: { fr: "Peut-on auto-heberger Plausible ?", en: "Can you self-host Plausible?" },
        answer: {
          fr: "Oui, Plausible Community Edition est disponible en auto-hebergement via Docker. Le code est open source sous licence AGPL.",
          en: "Yes, Plausible Community Edition is available for self-hosting via Docker. The code is open source under the AGPL license.",
        },
      },
      {
        question: { fr: "Plausible peut-il remplacer Google Analytics ?", en: "Can Plausible replace Google Analytics?" },
        answer: {
          fr: "Pour la plupart des sites, oui. Plausible couvre les metriques essentielles (pages vues, sources, pays, conversions). Pour des besoins avances (cohortes, attribution multi-touch), GA4 reste plus complet.",
          en: "For most websites, yes. Plausible covers essential metrics (pageviews, sources, countries, conversions). For advanced needs (cohorts, multi-touch attribution), GA4 remains more comprehensive.",
        },
      },
    ],
  },
  {
    slug: "piwik-pro",
    name: "Piwik PRO",
    shortDescription: {
      fr: "Suite analytics entreprise avec consent manager integre et hebergement UE.",
      en: "Enterprise analytics suite with built-in consent manager and EU hosting.",
    },
    description: {
      fr: "Piwik PRO est une suite analytics entreprise complete qui inclut un analytics web, un tag manager, un consent manager et une customer data platform. Concu pour les organisations soucieuses de la conformite, il offre un hebergement en Union Europeenne et des fonctionnalites avancees de segmentation et d'attribution.",
      en: "Piwik PRO is a comprehensive enterprise analytics suite that includes web analytics, a tag manager, a consent manager, and a customer data platform. Designed for compliance-conscious organizations, it offers EU hosting and advanced segmentation and attribution features.",
    },
    logoUrl: "/logos/piwik-pro.svg",
    websiteUrl: "https://piwikpro.fr",
    categories: ["privacy-first", "entreprise", "hebergement-local"],
    pricing: [
      {
        name: "Core",
        price: "0 €",
        period: { fr: "pour toujours", en: "forever" },
        features: [
          { fr: "Jusqu'a 500 000 actions/mois", en: "Up to 500,000 actions/month" },
          { fr: "Analytics + Tag Manager", en: "Analytics + Tag Manager" },
          { fr: "Consent Manager", en: "Consent Manager" },
          { fr: "Hebergement cloud UE", en: "EU cloud hosting" },
          { fr: "Support communautaire", en: "Community support" },
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Sur devis",
        features: [
          { fr: "Actions illimitees", en: "Unlimited actions" },
          { fr: "Customer Data Platform", en: "Customer Data Platform" },
          { fr: "Private cloud ou on-premise", en: "Private cloud or on-premise" },
          { fr: "SLA garanti", en: "Guaranteed SLA" },
          { fr: "Support dedie + CSM", en: "Dedicated support + CSM" },
        ],
      },
    ],
    features: [
      { label: { fr: "Suivi evenementiel", en: "Event tracking" }, available: true },
      { label: { fr: "Analyse en temps reel", en: "Real-time analysis" }, available: true },
      { label: { fr: "Suivi e-commerce", en: "E-commerce tracking" }, available: true },
      { label: { fr: "Entonnoirs de conversion", en: "Conversion funnels" }, available: true },
      { label: { fr: "Tag Manager integre", en: "Built-in Tag Manager" }, available: true },
      { label: { fr: "Consent Manager", en: "Consent Manager" }, available: true },
      { label: { fr: "Customer Data Platform", en: "Customer Data Platform" }, available: true, detail: "Enterprise" },
      { label: { fr: "Respect vie privee par defaut", en: "Privacy by default" }, available: true },
      { label: { fr: "Mode sans cookies", en: "Cookieless mode" }, available: true },
      { label: { fr: "Auto-hebergement", en: "Self-hosting" }, available: true, detail: "Enterprise" },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: { fr: "Union Europeenne (Allemagne/Pays-Bas) ou on-premise", en: "European Union (Germany/Netherlands) or on-premise" },
      details: {
        fr: "Piwik PRO est concu pour la conformite RGPD. Le Consent Manager integre gere le consentement. En mode analytics sans cookies, il est exempte de consentement. Donnees hebergees exclusivement en UE.",
        en: "Piwik PRO is designed for GDPR compliance. The built-in Consent Manager handles consent. In cookieless analytics mode, it is consent-exempt. Data hosted exclusively in the EU.",
      },
    },
    pros: [
      { fr: "Suite complete (analytics, tags, consent, CDP)", en: "Complete suite (analytics, tags, consent, CDP)" },
      { fr: "Plan gratuit genereux (500K actions/mois)", en: "Generous free plan (500K actions/month)" },
      { fr: "Hebergement 100 % UE", en: "100% EU hosting" },
      { fr: "Consent Manager integre", en: "Built-in Consent Manager" },
      { fr: "Migration facile depuis GA", en: "Easy migration from GA" },
    ],
    cons: [
      { fr: "Interface moins intuitive que Plausible", en: "Less intuitive interface than Plausible" },
      { fr: "CDP reservee au plan Enterprise", en: "CDP reserved for Enterprise plan" },
      { fr: "Documentation parfois incomplte en francais", en: "Documentation sometimes incomplete in French" },
      { fr: "On-premise uniquement en Enterprise", en: "On-premise only available on Enterprise" },
      { fr: "Communaute plus restreinte", en: "Smaller community" },
    ],
    faq: [
      {
        question: { fr: "Piwik PRO est-il gratuit ?", en: "Is Piwik PRO free?" },
        answer: {
          fr: "Oui, le plan Core est gratuit et inclut jusqu'a 500 000 actions par mois, avec analytics, tag manager et consent manager. Le plan Enterprise est sur devis.",
          en: "Yes, the Core plan is free and includes up to 500,000 actions per month, with analytics, tag manager, and consent manager. The Enterprise plan is custom-priced.",
        },
      },
      {
        question: { fr: "Quelle est la difference entre Piwik PRO et Matomo ?", en: "What is the difference between Piwik PRO and Matomo?" },
        answer: {
          fr: "Piwik PRO est un fork commercial de Piwik (ancien nom de Matomo). Il se distingue par un consent manager integre, une CDP et un focus entreprise. Matomo reste open source avec un modele freemium.",
          en: "Piwik PRO is a commercial fork of Piwik (the former name of Matomo). It stands out with a built-in consent manager, a CDP, and an enterprise focus. Matomo remains open source with a freemium model.",
        },
      },
      {
        question: { fr: "Ou sont hebergees les donnees Piwik PRO ?", en: "Where is Piwik PRO data hosted?" },
        answer: {
          fr: "Les donnees sont hebergees en Union Europeenne (Allemagne ou Pays-Bas) sur des serveurs certifies. Le plan Enterprise permet egalement un hebergement on-premise.",
          en: "Data is hosted in the European Union (Germany or Netherlands) on certified servers. The Enterprise plan also allows on-premise hosting.",
        },
      },
    ],
  },
  {
    slug: "simple-analytics",
    name: "Simple Analytics",
    shortDescription: {
      fr: "Analytics minimaliste et ethique, 100 % sans cookies ni donnees personnelles.",
      en: "Minimalist and ethical analytics, 100% cookieless with no personal data.",
    },
    description: {
      fr: "Simple Analytics est un outil d'analyse web minimaliste base aux Pays-Bas. Il ne collecte aucune donnee personnelle, n'utilise pas de cookies et offre un tableau de bord epure. Simple Analytics se distingue par son engagement ethique et sa transparence, avec un business model base uniquement sur les abonnements.",
      en: "Simple Analytics is a minimalist web analytics tool based in the Netherlands. It collects no personal data, uses no cookies, and offers a clean dashboard. Simple Analytics stands out through its ethical commitment and transparency, with a business model based solely on subscriptions.",
    },
    logoUrl: "/logos/simple-analytics.svg",
    websiteUrl: "https://simpleanalytics.com",
    categories: ["privacy-first", "sans-cookies"],
    pricing: [
      {
        name: "Starter",
        price: "9 €",
        period: { fr: "/mois", en: "/month" },
        features: [
          { fr: "100 000 pages vues/mois", en: "100,000 pageviews/month" },
          { fr: "1 utilisateur", en: "1 user" },
          { fr: "Sites illimites", en: "Unlimited websites" },
          { fr: "Evenements personnalises", en: "Custom events" },
          { fr: "Heberge aux Pays-Bas", en: "Hosted in the Netherlands" },
        ],
        highlighted: true,
      },
      {
        name: "Business",
        price: "49 €",
        period: { fr: "/mois", en: "/month" },
        features: [
          { fr: "1 000 000 pages vues/mois", en: "1,000,000 pageviews/month" },
          { fr: "10 utilisateurs", en: "10 users" },
          { fr: "Objectifs et entonnoirs", en: "Goals and funnels" },
          { fr: "Export de donnees", en: "Data export" },
          { fr: "Support prioritaire", en: "Priority support" },
        ],
      },
    ],
    features: [
      { label: { fr: "Suivi evenementiel", en: "Event tracking" }, available: true },
      { label: { fr: "Analyse en temps reel", en: "Real-time analysis" }, available: true },
      { label: { fr: "Suivi e-commerce", en: "E-commerce tracking" }, available: false },
      { label: { fr: "Entonnoirs de conversion", en: "Conversion funnels" }, available: true, detail: { fr: "Plan Business", en: "Business plan" } },
      { label: { fr: "Tableau de bord simple", en: "Simple dashboard" }, available: true },
      { label: { fr: "API complete", en: "Full API" }, available: true },
      { label: { fr: "Import tweets analytics", en: "Tweet analytics import" }, available: true },
      { label: { fr: "Respect vie privee par defaut", en: "Privacy by default" }, available: true },
      { label: { fr: "Mode sans cookies", en: "Cookieless mode" }, available: true },
      { label: { fr: "Auto-hebergement", en: "Self-hosting" }, available: false },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: { fr: "Pays-Bas (UE)", en: "Netherlands (EU)" },
      details: {
        fr: "Simple Analytics ne collecte aucune donnee personnelle et n'utilise aucun cookie. Il est conforme au RGPD, ePrivacy et CCPA. Aucun bandeau de consentement necessaire.",
        en: "Simple Analytics collects no personal data and uses no cookies. It is compliant with GDPR, ePrivacy, and CCPA. No consent banner required.",
      },
    },
    pros: [
      { fr: "Extremement simple d'utilisation", en: "Extremely easy to use" },
      { fr: "Zero cookies, zero donnees personnelles", en: "Zero cookies, zero personal data" },
      { fr: "Entreprise basee en UE (Pays-Bas)", en: "Company based in the EU (Netherlands)" },
      { fr: "Business model ethique et transparent", en: "Ethical and transparent business model" },
      { fr: "Mini-sites publics pour transparence", en: "Public mini-sites for transparency" },
    ],
    cons: [
      { fr: "Pas de suivi e-commerce", en: "No e-commerce tracking" },
      { fr: "Pas d'auto-hebergement", en: "No self-hosting" },
      { fr: "Fonctionnalites limitees", en: "Limited features" },
      { fr: "Tarification elevee pour gros volumes", en: "High pricing for large volumes" },
      { fr: "Pas de heatmaps ni session recording", en: "No heatmaps or session recording" },
    ],
    faq: [
      {
        question: { fr: "Simple Analytics est-il conforme au RGPD ?", en: "Is Simple Analytics GDPR compliant?" },
        answer: {
          fr: "Oui, Simple Analytics est 100 % conforme au RGPD. Aucune donnee personnelle n'est collectee, aucun cookie n'est utilise. Pas besoin de bandeau de consentement.",
          en: "Yes, Simple Analytics is 100% GDPR compliant. No personal data is collected, no cookies are used. No consent banner is needed.",
        },
      },
      {
        question: { fr: "Peut-on utiliser Simple Analytics sans cookies ?", en: "Can you use Simple Analytics without cookies?" },
        answer: {
          fr: "Oui, Simple Analytics fonctionne entierement sans cookies par conception. C'est son fonctionnement par defaut, pas une option a activer.",
          en: "Yes, Simple Analytics works entirely without cookies by design. This is its default behavior, not an option to enable.",
        },
      },
      {
        question: { fr: "Simple Analytics convient-il a un site e-commerce ?", en: "Is Simple Analytics suitable for an e-commerce site?" },
        answer: {
          fr: "Simple Analytics est adapte pour les metriques de base (trafic, sources, conversions), mais ne propose pas de suivi e-commerce avance (panier, revenus). Pour un e-commerce, Matomo ou Plausible Business sont plus adaptes.",
          en: "Simple Analytics is suitable for basic metrics (traffic, sources, conversions) but does not offer advanced e-commerce tracking (cart, revenue). For e-commerce, Matomo or Plausible Business are better suited.",
        },
      },
    ],
  },
  {
    slug: "fathom",
    name: "Fathom Analytics",
    shortDescription: {
      fr: "Analytics premium, rapide et respectueux de la vie privee. Conforme RGPD.",
      en: "Premium, fast, privacy-friendly analytics. GDPR compliant.",
    },
    description: {
      fr: "Fathom Analytics est un outil d'analyse web premium axe sur la simplicite et la vie privee. Fonde au Canada, il offre des tableaux de bord clairs, un script de tracking leger et une conformite RGPD native. Fathom se distingue par ses fonctionnalites d'uptime monitoring et ses rapports par email.",
      en: "Fathom Analytics is a premium web analytics tool focused on simplicity and privacy. Founded in Canada, it offers clear dashboards, a lightweight tracking script, and native GDPR compliance. Fathom stands out with its uptime monitoring features and email reports.",
    },
    logoUrl: "/logos/fathom.svg",
    websiteUrl: "https://usefathom.com",
    categories: ["privacy-first", "sans-cookies"],
    pricing: [
      {
        name: "Growth",
        price: "15 $",
        period: { fr: "/mois", en: "/month" },
        features: [
          { fr: "Jusqu'a 100 000 pages vues/mois", en: "Up to 100,000 pageviews/month" },
          { fr: "50 sites", en: "50 websites" },
          { fr: "Evenements personnalises", en: "Custom events" },
          { fr: "Rapports email", en: "Email reports" },
          { fr: "Uptime monitoring", en: "Uptime monitoring" },
        ],
        highlighted: true,
      },
      {
        name: "Business",
        price: "25 $",
        period: { fr: "/mois", en: "/month" },
        features: [
          { fr: "Jusqu'a 200 000 pages vues/mois", en: "Up to 200,000 pageviews/month" },
          { fr: "100 sites", en: "100 websites" },
          { fr: "API complete", en: "Full API" },
          { fr: "Support prioritaire", en: "Priority support" },
          { fr: "Toutes les fonctionnalites", en: "All features" },
        ],
      },
    ],
    features: [
      { label: { fr: "Suivi evenementiel", en: "Event tracking" }, available: true },
      { label: { fr: "Analyse en temps reel", en: "Real-time analysis" }, available: true },
      { label: { fr: "Suivi e-commerce", en: "E-commerce tracking" }, available: false },
      { label: { fr: "Entonnoirs de conversion", en: "Conversion funnels" }, available: true },
      { label: { fr: "Uptime monitoring", en: "Uptime monitoring" }, available: true },
      { label: { fr: "Rapports email", en: "Email reports" }, available: true },
      { label: { fr: "Script leger", en: "Lightweight script" }, available: true },
      { label: { fr: "Respect vie privee par defaut", en: "Privacy by default" }, available: true },
      { label: { fr: "Mode sans cookies", en: "Cookieless mode" }, available: true },
      { label: { fr: "Auto-hebergement", en: "Self-hosting" }, available: false },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: { fr: "Union Europeenne (pour les visiteurs UE)", en: "European Union (for EU visitors)" },
      details: {
        fr: "Fathom isole automatiquement les donnees des visiteurs UE sur des serveurs europeens. Il n'utilise pas de cookies et ne collecte pas de donnees personnelles. Conforme RGPD, CCPA et ePrivacy.",
        en: "Fathom automatically isolates EU visitor data on European servers. It does not use cookies and collects no personal data. Compliant with GDPR, CCPA, and ePrivacy.",
      },
    },
    pros: [
      { fr: "Interface tres simple et claire", en: "Very simple and clear interface" },
      { fr: "Uptime monitoring inclus", en: "Uptime monitoring included" },
      { fr: "Isolation des donnees UE automatique", en: "Automatic EU data isolation" },
      { fr: "Script leger et rapide", en: "Lightweight and fast script" },
      { fr: "Rapports email automatiques", en: "Automatic email reports" },
    ],
    cons: [
      { fr: "Pas de version gratuite", en: "No free version" },
      { fr: "Pas d'auto-hebergement", en: "No self-hosting" },
      { fr: "Pas de suivi e-commerce", en: "No e-commerce tracking" },
      { fr: "Tarification en dollars US", en: "Pricing in US dollars" },
      { fr: "Fonctionnalites avancees limitees", en: "Limited advanced features" },
    ],
    faq: [
      {
        question: { fr: "Fathom Analytics est-il gratuit ?", en: "Is Fathom Analytics free?" },
        answer: {
          fr: "Non, Fathom ne propose pas de version gratuite. Les plans demarrent a 15 $/mois pour 100 000 pages vues. Un essai gratuit de 30 jours est disponible.",
          en: "No, Fathom does not offer a free version. Plans start at $15/month for 100,000 pageviews. A 30-day free trial is available.",
        },
      },
      {
        question: { fr: "Fathom est-il conforme au RGPD ?", en: "Is Fathom GDPR compliant?" },
        answer: {
          fr: "Oui, Fathom est conforme au RGPD. Il isole automatiquement les donnees des visiteurs europeens sur des serveurs situes en UE et ne collecte aucune donnee personnelle.",
          en: "Yes, Fathom is GDPR compliant. It automatically isolates European visitor data on EU-based servers and collects no personal data.",
        },
      },
      {
        question: { fr: "Fathom propose-t-il de l'uptime monitoring ?", en: "Does Fathom offer uptime monitoring?" },
        answer: {
          fr: "Oui, Fathom inclut un monitoring de disponibilite de votre site avec alertes en cas de panne, directement integre dans le tableau de bord analytics.",
          en: "Yes, Fathom includes uptime monitoring for your website with downtime alerts, directly integrated into the analytics dashboard.",
        },
      },
    ],
  },
  {
    slug: "adobe-analytics",
    name: "Adobe Analytics",
    shortDescription: {
      fr: "Solution analytics entreprise avancee, leader du marche premium.",
      en: "Advanced enterprise analytics solution, premium market leader.",
    },
    description: {
      fr: "Adobe Analytics fait partie de la suite Adobe Experience Cloud. C'est une solution analytics enterprise de reference, offrant des capacites avancees d'attribution, de segmentation en temps reel, d'analyse predictive (IA) et d'integration omnicanale. Principalement utilisee par les grandes entreprises et les sites a fort trafic.",
      en: "Adobe Analytics is part of the Adobe Experience Cloud suite. It is a leading enterprise analytics solution offering advanced attribution, real-time segmentation, predictive analysis (AI), and omnichannel integration capabilities. Primarily used by large enterprises and high-traffic websites.",
    },
    logoUrl: "/logos/adobe-analytics.svg",
    websiteUrl: "https://business.adobe.com/products/analytics/adobe-analytics.html",
    categories: ["entreprise"],
    pricing: [
      {
        name: "Select",
        price: "Sur devis",
        features: [
          { fr: "Analytics de base", en: "Basic analytics" },
          { fr: "Attribution rules-based", en: "Rules-based attribution" },
          { fr: "Segmentation", en: "Segmentation" },
          { fr: "Rapports en temps reel", en: "Real-time reports" },
          { fr: "Support standard", en: "Standard support" },
        ],
      },
      {
        name: "Prime / Ultimate",
        price: "Sur devis",
        features: [
          { fr: "Attribution algorithmique (IA)", en: "Algorithmic attribution (AI)" },
          { fr: "Analyses predictives", en: "Predictive analytics" },
          { fr: "Audiences cross-device", en: "Cross-device audiences" },
          { fr: "Integration Adobe Experience Platform", en: "Adobe Experience Platform integration" },
          { fr: "Support premium dedie", en: "Dedicated premium support" },
        ],
        highlighted: true,
      },
    ],
    features: [
      { label: { fr: "Suivi evenementiel", en: "Event tracking" }, available: true },
      { label: { fr: "Analyse en temps reel", en: "Real-time analysis" }, available: true },
      { label: { fr: "Suivi e-commerce", en: "E-commerce tracking" }, available: true },
      { label: { fr: "Entonnoirs de conversion", en: "Conversion funnels" }, available: true },
      { label: { fr: "Attribution algorithmique (IA)", en: "Algorithmic attribution (AI)" }, available: true },
      { label: { fr: "Analyses predictives", en: "Predictive analytics" }, available: true },
      { label: { fr: "Segmentation avancee", en: "Advanced segmentation" }, available: true },
      { label: { fr: "Respect vie privee par defaut", en: "Privacy by default" }, available: false },
      { label: { fr: "Mode sans cookies", en: "Cookieless mode" }, available: false },
      { label: { fr: "Auto-hebergement", en: "Self-hosting" }, available: false },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: false,
      cookieless: false,
      dataLocation: { fr: "Au choix : USA, Europe, Asie", en: "Choice of: USA, Europe, Asia" },
      details: {
        fr: "Adobe Analytics propose un hebergement des donnees en Europe. Adobe fournit des outils de conformite RGPD (suppression/export de donnees). Un bandeau de consentement est neanmoins necessaire car des cookies de tracking sont utilises.",
        en: "Adobe Analytics offers data hosting in Europe. Adobe provides GDPR compliance tools (data deletion/export). A consent banner is nonetheless required as tracking cookies are used.",
      },
    },
    pros: [
      { fr: "Extremement puissant et complet", en: "Extremely powerful and comprehensive" },
      { fr: "IA predictive et attribution avancee", en: "Predictive AI and advanced attribution" },
      { fr: "Segmentation en temps reel", en: "Real-time segmentation" },
      { fr: "Integration Adobe Experience Cloud", en: "Adobe Experience Cloud integration" },
      { fr: "Hebergement possible en Europe", en: "Hosting available in Europe" },
    ],
    cons: [
      { fr: "Prix tres eleve (a partir de ~100 000 $/an)", en: "Very high price (starting at ~$100,000/year)" },
      { fr: "Complexite de mise en oeuvre", en: "Complex implementation" },
      { fr: "Necessite une equipe dediee", en: "Requires a dedicated team" },
      { fr: "Courbe d'apprentissage tres importante", en: "Very steep learning curve" },
      { fr: "Necessite un bandeau cookies", en: "Requires a cookie consent banner" },
    ],
    faq: [
      {
        question: { fr: "Combien coute Adobe Analytics ?", en: "How much does Adobe Analytics cost?" },
        answer: {
          fr: "Adobe Analytics fonctionne sur devis. Les tarifs demarrent generalement autour de 100 000 $ par an pour le plan Select. Les plans Prime et Ultimate sont encore plus chers.",
          en: "Adobe Analytics works on a custom pricing basis. Prices generally start around $100,000 per year for the Select plan. The Prime and Ultimate plans are even more expensive.",
        },
      },
      {
        question: { fr: "Adobe Analytics est-il adapte aux PME ?", en: "Is Adobe Analytics suitable for SMBs?" },
        answer: {
          fr: "Non, Adobe Analytics est concu pour les grandes entreprises avec des equipes analytics dediees. Pour les PME, des alternatives comme GA4, Matomo ou Plausible sont plus adaptees et abordables.",
          en: "No, Adobe Analytics is designed for large enterprises with dedicated analytics teams. For SMBs, alternatives like GA4, Matomo, or Plausible are more suitable and affordable.",
        },
      },
      {
        question: { fr: "Adobe Analytics est-il conforme au RGPD ?", en: "Is Adobe Analytics GDPR compliant?" },
        answer: {
          fr: "Adobe propose des outils de conformite RGPD et permet l'hebergement en Europe. Cependant, des cookies de tracking sont utilises, necessitant un bandeau de consentement.",
          en: "Adobe provides GDPR compliance tools and allows hosting in Europe. However, tracking cookies are used, requiring a consent banner.",
        },
      },
    ],
  },
  {
    slug: "umami",
    name: "Umami",
    shortDescription: {
      fr: "Analytics open source, leger et auto-hebergeable. Alternative gratuite et moderne.",
      en: "Open source, lightweight, self-hostable analytics. Free and modern alternative.",
    },
    description: {
      fr: "Umami est un outil d'analyse web open source, leger et axe sur la vie privee. Entierement auto-hebergeable, il offre un tableau de bord moderne et intuitif. Umami est une excellente alternative gratuite pour les developpeurs qui souhaitent garder le controle total de leurs donnees analytics sans compromis sur la simplicite.",
      en: "Umami is an open source, lightweight, privacy-focused web analytics tool. Fully self-hostable, it offers a modern and intuitive dashboard. Umami is an excellent free alternative for developers who want to maintain full control over their analytics data without compromising on simplicity.",
    },
    logoUrl: "/logos/umami.svg",
    websiteUrl: "https://umami.is",
    categories: [
      "privacy-first",
      "open-source",
      "gratuit",
      "sans-cookies",
      "hebergement-local",
    ],
    pricing: [
      {
        name: "Self-hosted",
        price: "0 €",
        period: { fr: "pour toujours", en: "forever" },
        features: [
          { fr: "Toutes les fonctionnalites", en: "All features" },
          { fr: "Sites et pages vues illimites", en: "Unlimited websites and pageviews" },
          { fr: "Donnees 100 % chez vous", en: "100% data ownership" },
          { fr: "Support communautaire", en: "Community support" },
          "MIT License",
        ],
        highlighted: true,
      },
      {
        name: "Cloud",
        price: "9 $",
        period: { fr: "/mois", en: "/month" },
        features: [
          { fr: "100 000 evenements/mois", en: "100,000 events/month" },
          { fr: "Hebergement gere", en: "Managed hosting" },
          { fr: "Mises a jour automatiques", en: "Automatic updates" },
          { fr: "Support par email", en: "Email support" },
          { fr: "Sauvegardes incluses", en: "Backups included" },
        ],
      },
    ],
    features: [
      { label: { fr: "Suivi evenementiel", en: "Event tracking" }, available: true },
      { label: { fr: "Analyse en temps reel", en: "Real-time analysis" }, available: true },
      { label: { fr: "Suivi e-commerce", en: "E-commerce tracking" }, available: false },
      { label: { fr: "Entonnoirs de conversion", en: "Conversion funnels" }, available: false },
      { label: { fr: "Tableau de bord moderne", en: "Modern dashboard" }, available: true },
      { label: { fr: "API complete", en: "Full API" }, available: true },
      { label: { fr: "Multi-langue", en: "Multi-language" }, available: true },
      { label: { fr: "Respect vie privee par defaut", en: "Privacy by default" }, available: true },
      { label: { fr: "Mode sans cookies", en: "Cookieless mode" }, available: true },
      { label: { fr: "Auto-hebergement", en: "Self-hosting" }, available: true },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: { fr: "Votre serveur (auto-heberge) ou cloud", en: "Your server (self-hosted) or cloud" },
      details: {
        fr: "Umami ne collecte aucune donnee personnelle et n'utilise pas de cookies. En auto-hebergement, vous avez un controle total sur les donnees. Conforme RGPD sans bandeau de consentement.",
        en: "Umami collects no personal data and does not use cookies. With self-hosting, you have full control over the data. GDPR compliant without a consent banner.",
      },
    },
    pros: [
      { fr: "100 % open source (MIT License)", en: "100% open source (MIT License)" },
      { fr: "Gratuit et auto-hebergeable", en: "Free and self-hostable" },
      { fr: "Interface moderne et intuitive", en: "Modern and intuitive interface" },
      { fr: "Tres leger et performant", en: "Very lightweight and performant" },
      { fr: "Facile a deployer (Docker, Vercel, Railway)", en: "Easy to deploy (Docker, Vercel, Railway)" },
    ],
    cons: [
      { fr: "Pas de suivi e-commerce", en: "No e-commerce tracking" },
      { fr: "Pas d'entonnoirs de conversion", en: "No conversion funnels" },
      { fr: "Pas de heatmaps ni session recording", en: "No heatmaps or session recording" },
      { fr: "Necessite connaissances techniques (self-hosted)", en: "Requires technical knowledge (self-hosted)" },
      { fr: "Communaute plus petite que Matomo", en: "Smaller community than Matomo" },
    ],
    faq: [
      {
        question: { fr: "Umami est-il gratuit ?", en: "Is Umami free?" },
        answer: {
          fr: "Oui, Umami est 100 % gratuit et open source (licence MIT) en auto-hebergement. La version cloud demarre a 9 $/mois.",
          en: "Yes, Umami is 100% free and open source (MIT license) for self-hosting. The cloud version starts at $9/month.",
        },
      },
      {
        question: { fr: "Comment deployer Umami ?", en: "How to deploy Umami?" },
        answer: {
          fr: "Umami peut etre deploye via Docker, Vercel, Railway ou tout serveur supportant Node.js. Il necessite une base de donnees PostgreSQL ou MySQL.",
          en: "Umami can be deployed via Docker, Vercel, Railway, or any server supporting Node.js. It requires a PostgreSQL or MySQL database.",
        },
      },
      {
        question: { fr: "Umami est-il adapte pour un gros site ?", en: "Is Umami suitable for a large website?" },
        answer: {
          fr: "Umami est performant et peut gerer un trafic important en auto-hebergement avec un serveur adapte. Pour les tres gros volumes, Matomo ou une solution enterprise seront plus adaptes.",
          en: "Umami is performant and can handle significant traffic with self-hosting on an appropriate server. For very high volumes, Matomo or an enterprise solution would be more suitable.",
        },
      },
    ],
  },
];

export function getToolBySlug(slug: string): AnalyticsTool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): AnalyticsTool[] {
  return tools.filter((t) => t.categories.includes(categorySlug as AnalyticsTool["categories"][number]));
}

export function generateToolPairs(): { tool1: AnalyticsTool; tool2: AnalyticsTool; slug: string }[] {
  const pairs: { tool1: AnalyticsTool; tool2: AnalyticsTool; slug: string }[] = [];
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      pairs.push({
        tool1: tools[i],
        tool2: tools[j],
        slug: `${tools[i].slug}-vs-${tools[j].slug}`,
      });
    }
  }
  return pairs;
}

export function parseVsSlug(slug: string): { tool1: AnalyticsTool; tool2: AnalyticsTool } | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  const tool1 = getToolBySlug(parts[0]);
  const tool2 = getToolBySlug(parts[1]);
  if (!tool1 || !tool2) return null;
  return { tool1, tool2 };
}
