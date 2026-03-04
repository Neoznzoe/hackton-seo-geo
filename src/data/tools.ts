import { AnalyticsTool } from "@/lib/types";

export const tools: AnalyticsTool[] = [
  {
    slug: "google-analytics-4",
    name: "Google Analytics 4",
    shortDescription:
      "La solution analytics gratuite de Google, la plus utilisee au monde.",
    description:
      "Google Analytics 4 (GA4) est la derniere version de la plateforme d'analyse web de Google. Basee sur un modele evenementiel, elle offre un suivi cross-plateforme (web et app), des rapports d'exploration avances et une integration native avec l'ecosysteme Google (Ads, Search Console, BigQuery). GA4 est gratuite pour la majorite des utilisateurs, avec une version payante (Analytics 360) pour les grandes entreprises.",
    logoUrl: "/logos/ga4.svg",
    websiteUrl: "https://analytics.google.com",
    categories: ["gratuit", "entreprise"],
    pricing: [
      {
        name: "Gratuit",
        price: "0 €",
        period: "pour toujours",
        features: [
          "Jusqu'a 25 millions d'evenements/mois",
          "Rapports standard et explorations",
          "Integration Google Ads",
          "Export BigQuery (quotidien)",
          "14 mois de retention",
        ],
        highlighted: true,
      },
      {
        name: "Analytics 360",
        price: "Sur devis",
        period: "a partir de ~150 000 $/an",
        features: [
          "Evenements illimites",
          "Export BigQuery en streaming",
          "SLA garanti (99,9 %)",
          "Attributions avancees",
          "Support dedie",
        ],
      },
    ],
    features: [
      { label: "Suivi evenementiel", available: true, detail: "Modele natif" },
      { label: "Analyse en temps reel", available: true },
      { label: "Suivi e-commerce", available: true },
      { label: "Entonnoirs de conversion", available: true },
      { label: "Rapports d'exploration", available: true },
      { label: "Integration Google Ads", available: true },
      { label: "Export BigQuery", available: true },
      { label: "Respect vie privee par defaut", available: false },
      { label: "Mode sans cookies", available: false },
      { label: "Auto-hebergement", available: false },
    ],
    compliance: {
      gdprCompliant: false,
      cnilExempt: false,
      cookieless: false,
      dataLocation: "Etats-Unis (serveurs Google)",
      details:
        "GA4 necessite le consentement utilisateur en Europe (RGPD). Les donnees transitent par les serveurs Google aux USA. La CNIL a juge GA non conforme en fevrier 2022 sans mesures complementaires. Le mode Consent Mode v2 et le server-side tagging peuvent ameliorer la conformite.",
    },
    pros: [
      "Gratuit et extremement complet",
      "Integration native avec l'ecosysteme Google",
      "Communaute et documentation tres larges",
      "Export BigQuery pour analyses avancees",
      "Suivi cross-plateforme web + app",
    ],
    cons: [
      "Courbe d'apprentissage importante",
      "Donnees envoyees aux USA (probleme RGPD)",
      "Interface complexe pour les debutants",
      "Necessite un bandeau cookies",
      "Echantillonnage sur gros volumes (version gratuite)",
    ],
    faq: [
      {
        question: "Google Analytics 4 est-il gratuit ?",
        answer:
          "Oui, GA4 est gratuit pour la grande majorite des sites web, avec une limite de 25 millions d'evenements par mois. La version payante Analytics 360 demarre a environ 150 000 $ par an.",
      },
      {
        question: "GA4 est-il conforme au RGPD ?",
        answer:
          "Par defaut, GA4 n'est pas considere conforme au RGPD par la CNIL car les donnees sont transferees aux USA. Il est possible d'ameliorer la conformite via le Consent Mode v2, le server-side tagging et la pseudonymisation des donnees.",
      },
      {
        question:
          "Quelle est la difference entre Universal Analytics et GA4 ?",
        answer:
          "GA4 utilise un modele evenementiel (au lieu des sessions/pages vues), offre un suivi cross-plateforme natif, et inclut l'export BigQuery gratuit. Universal Analytics a ete definitivement arrete en juillet 2024.",
      },
    ],
  },
  {
    slug: "matomo",
    name: "Matomo",
    shortDescription:
      "Alternative open source a Google Analytics avec hebergement local possible.",
    description:
      "Matomo (anciennement Piwik) est la principale alternative open source a Google Analytics. Il offre le choix entre un hebergement local (On-Premise) pour un controle total des donnees et une version cloud hebergee en Europe. Matomo est reconnu par la CNIL comme exempte de consentement dans sa configuration respectueuse de la vie privee.",
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
        period: "auto-heberge",
        features: [
          "Fonctionnalites completes",
          "Donnees 100 % chez vous",
          "Plugins marketplace",
          "Pas de limite de trafic",
          "Support communautaire",
        ],
        highlighted: true,
      },
      {
        name: "Cloud",
        price: "23 €",
        period: "/mois",
        features: [
          "Heberge en Europe (Allemagne)",
          "Mises a jour automatiques",
          "Support par email",
          "50 000 pages vues/mois incluses",
          "Sauvegardes automatiques",
        ],
      },
    ],
    features: [
      { label: "Suivi evenementiel", available: true },
      { label: "Analyse en temps reel", available: true },
      { label: "Suivi e-commerce", available: true },
      { label: "Entonnoirs de conversion", available: true },
      { label: "Heatmaps et session recording", available: true, detail: "Plugin premium" },
      { label: "A/B Testing", available: true, detail: "Plugin premium" },
      { label: "Import Google Analytics", available: true },
      { label: "Respect vie privee par defaut", available: true },
      { label: "Mode sans cookies", available: true },
      { label: "Auto-hebergement", available: true },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: "Au choix : votre serveur ou cloud en Allemagne",
      details:
        "Matomo est officiellement recommande par la CNIL. En configuration sans cookies (avec anonymisation IP), il est exempte du recueil de consentement. Les donnees restent en Europe ou sur vos propres serveurs.",
    },
    pros: [
      "Open source et gratuit (On-Premise)",
      "100 % propriete des donnees",
      "Exempte de consentement CNIL",
      "Fonctionnalites comparables a GA4",
      "Import des donnees historiques GA",
    ],
    cons: [
      "Version On-Premise necessite maintenance serveur",
      "Interface moins moderne que les alternatives",
      "Plugins premium payants (heatmaps, A/B testing)",
      "Cloud relativement cher pour gros volumes",
      "Performances a optimiser sur gros trafic",
    ],
    faq: [
      {
        question: "Matomo est-il vraiment gratuit ?",
        answer:
          "Oui, la version On-Premise (auto-hebergee) de Matomo est 100 % gratuite et open source. La version Cloud demarre a 23 €/mois. Certains plugins avances (heatmaps, A/B testing) sont payants.",
      },
      {
        question: "Matomo est-il exempte de consentement cookies ?",
        answer:
          "Oui, en configuration respectueuse de la vie privee (sans cookies, avec anonymisation IP), Matomo est officiellement exempte du recueil de consentement par la CNIL.",
      },
      {
        question: "Peut-on migrer de Google Analytics vers Matomo ?",
        answer:
          "Oui, Matomo propose un outil d'import natif qui permet de recuperer vos donnees historiques Google Analytics (Universal Analytics et GA4).",
      },
    ],
  },
  {
    slug: "plausible",
    name: "Plausible Analytics",
    shortDescription:
      "Analytics simple, leger et respectueux de la vie privee. Script < 1 ko.",
    description:
      "Plausible Analytics est un outil d'analyse web leger, open source et axe sur la vie privee. Son script de tracking pese moins d'1 ko (contre ~45 ko pour GA4), ce qui n'impacte pas les performances. Plausible ne collecte aucune donnee personnelle et fonctionne sans cookies, le rendant conforme au RGPD sans bandeau de consentement.",
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
        period: "/mois",
        features: [
          "Jusqu'a 10 000 pages vues/mois",
          "Sites illimites",
          "Tableau de bord partage",
          "API incluse",
          "Heberge en Europe (Allemagne)",
        ],
        highlighted: true,
      },
      {
        name: "Business",
        price: "19 €",
        period: "/mois",
        features: [
          "Jusqu'a 10 000 pages vues/mois",
          "Revenue tracking",
          "Funnels",
          "Ecommerce analytics",
          "Support prioritaire",
        ],
      },
    ],
    features: [
      { label: "Suivi evenementiel", available: true, detail: "Custom events" },
      { label: "Analyse en temps reel", available: true },
      { label: "Suivi e-commerce", available: true, detail: "Plan Business" },
      { label: "Entonnoirs de conversion", available: true, detail: "Plan Business" },
      { label: "Tableau de bord simple", available: true },
      { label: "API complete", available: true },
      { label: "Script < 1 ko", available: true },
      { label: "Respect vie privee par defaut", available: true },
      { label: "Mode sans cookies", available: true },
      { label: "Auto-hebergement", available: true, detail: "Community Edition" },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: "Allemagne (Hetzner, UE)",
      details:
        "Plausible ne collecte aucune donnee personnelle, n'utilise pas de cookies et ne fait aucun suivi cross-site. Il est conforme au RGPD, ePrivacy, PECR et CCPA sans bandeau de consentement.",
    },
    pros: [
      "Extremement leger (< 1 ko)",
      "Aucun cookie, conforme RGPD sans bandeau",
      "Interface simple et intuitive",
      "Open source (AGPL)",
      "Auto-hebergement possible",
    ],
    cons: [
      "Fonctionnalites limitees vs GA4",
      "Pas de heatmaps ni session recording",
      "Pas d'analyse de cohortes",
      "Tarification basee sur les pages vues",
      "Moins adapte aux sites tres complexes",
    ],
    faq: [
      {
        question: "Plausible est-il conforme au RGPD ?",
        answer:
          "Oui, Plausible est 100 % conforme au RGPD. Il ne collecte aucune donnee personnelle, n'utilise pas de cookies et n'effectue aucun suivi cross-site. Aucun bandeau de consentement n'est necessaire.",
      },
      {
        question: "Peut-on auto-heberger Plausible ?",
        answer:
          "Oui, Plausible Community Edition est disponible en auto-hebergement via Docker. Le code est open source sous licence AGPL.",
      },
      {
        question: "Plausible peut-il remplacer Google Analytics ?",
        answer:
          "Pour la plupart des sites, oui. Plausible couvre les metriques essentielles (pages vues, sources, pays, conversions). Pour des besoins avances (cohortes, attribution multi-touch), GA4 reste plus complet.",
      },
    ],
  },
  {
    slug: "piwik-pro",
    name: "Piwik PRO",
    shortDescription:
      "Suite analytics entreprise avec consent manager integre et hebergement UE.",
    description:
      "Piwik PRO est une suite analytics entreprise complete qui inclut un analytics web, un tag manager, un consent manager et une customer data platform. Concu pour les organisations soucieuses de la conformite, il offre un hebergement en Union Europeenne et des fonctionnalites avancees de segmentation et d'attribution.",
    logoUrl: "/logos/piwik-pro.svg",
    websiteUrl: "https://piwikpro.fr",
    categories: ["privacy-first", "entreprise", "hebergement-local"],
    pricing: [
      {
        name: "Core",
        price: "0 €",
        period: "pour toujours",
        features: [
          "Jusqu'a 500 000 actions/mois",
          "Analytics + Tag Manager",
          "Consent Manager",
          "Hebergement cloud UE",
          "Support communautaire",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Sur devis",
        features: [
          "Actions illimitees",
          "Customer Data Platform",
          "Private cloud ou on-premise",
          "SLA garanti",
          "Support dedie + CSM",
        ],
      },
    ],
    features: [
      { label: "Suivi evenementiel", available: true },
      { label: "Analyse en temps reel", available: true },
      { label: "Suivi e-commerce", available: true },
      { label: "Entonnoirs de conversion", available: true },
      { label: "Tag Manager integre", available: true },
      { label: "Consent Manager", available: true },
      { label: "Customer Data Platform", available: true, detail: "Enterprise" },
      { label: "Respect vie privee par defaut", available: true },
      { label: "Mode sans cookies", available: true },
      { label: "Auto-hebergement", available: true, detail: "Enterprise" },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: "Union Europeenne (Allemagne/Pays-Bas) ou on-premise",
      details:
        "Piwik PRO est concu pour la conformite RGPD. Le Consent Manager integre gere le consentement. En mode analytics sans cookies, il est exempte de consentement. Donnees hebergees exclusivement en UE.",
    },
    pros: [
      "Suite complete (analytics, tags, consent, CDP)",
      "Plan gratuit genereux (500K actions/mois)",
      "Hebergement 100 % UE",
      "Consent Manager integre",
      "Migration facile depuis GA",
    ],
    cons: [
      "Interface moins intuitive que Plausible",
      "CDP reservee au plan Enterprise",
      "Documentation parfois incomplte en francais",
      "On-premise uniquement en Enterprise",
      "Communaute plus restreinte",
    ],
    faq: [
      {
        question: "Piwik PRO est-il gratuit ?",
        answer:
          "Oui, le plan Core est gratuit et inclut jusqu'a 500 000 actions par mois, avec analytics, tag manager et consent manager. Le plan Enterprise est sur devis.",
      },
      {
        question: "Quelle est la difference entre Piwik PRO et Matomo ?",
        answer:
          "Piwik PRO est un fork commercial de Piwik (ancien nom de Matomo). Il se distingue par un consent manager integre, une CDP et un focus entreprise. Matomo reste open source avec un modele freemium.",
      },
      {
        question: "Ou sont hebergees les donnees Piwik PRO ?",
        answer:
          "Les donnees sont hebergees en Union Europeenne (Allemagne ou Pays-Bas) sur des serveurs certifies. Le plan Enterprise permet egalement un hebergement on-premise.",
      },
    ],
  },
  {
    slug: "simple-analytics",
    name: "Simple Analytics",
    shortDescription:
      "Analytics minimaliste et ethique, 100 % sans cookies ni donnees personnelles.",
    description:
      "Simple Analytics est un outil d'analyse web minimaliste base aux Pays-Bas. Il ne collecte aucune donnee personnelle, n'utilise pas de cookies et offre un tableau de bord epure. Simple Analytics se distingue par son engagement ethique et sa transparence, avec un business model base uniquement sur les abonnements.",
    logoUrl: "/logos/simple-analytics.svg",
    websiteUrl: "https://simpleanalytics.com",
    categories: ["privacy-first", "sans-cookies"],
    pricing: [
      {
        name: "Starter",
        price: "9 €",
        period: "/mois",
        features: [
          "100 000 pages vues/mois",
          "1 utilisateur",
          "Sites illimites",
          "Evenements personnalises",
          "Heberge aux Pays-Bas",
        ],
        highlighted: true,
      },
      {
        name: "Business",
        price: "49 €",
        period: "/mois",
        features: [
          "1 000 000 pages vues/mois",
          "10 utilisateurs",
          "Objectifs et entonnoirs",
          "Export de donnees",
          "Support prioritaire",
        ],
      },
    ],
    features: [
      { label: "Suivi evenementiel", available: true },
      { label: "Analyse en temps reel", available: true },
      { label: "Suivi e-commerce", available: false },
      { label: "Entonnoirs de conversion", available: true, detail: "Plan Business" },
      { label: "Tableau de bord simple", available: true },
      { label: "API complete", available: true },
      { label: "Import tweets analytics", available: true },
      { label: "Respect vie privee par defaut", available: true },
      { label: "Mode sans cookies", available: true },
      { label: "Auto-hebergement", available: false },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: "Pays-Bas (UE)",
      details:
        "Simple Analytics ne collecte aucune donnee personnelle et n'utilise aucun cookie. Il est conforme au RGPD, ePrivacy et CCPA. Aucun bandeau de consentement necessaire.",
    },
    pros: [
      "Extremement simple d'utilisation",
      "Zero cookies, zero donnees personnelles",
      "Entreprise basee en UE (Pays-Bas)",
      "Business model ethique et transparent",
      "Mini-sites publics pour transparence",
    ],
    cons: [
      "Pas de suivi e-commerce",
      "Pas d'auto-hebergement",
      "Fonctionnalites limitees",
      "Tarification elevee pour gros volumes",
      "Pas de heatmaps ni session recording",
    ],
    faq: [
      {
        question: "Simple Analytics est-il conforme au RGPD ?",
        answer:
          "Oui, Simple Analytics est 100 % conforme au RGPD. Aucune donnee personnelle n'est collectee, aucun cookie n'est utilise. Pas besoin de bandeau de consentement.",
      },
      {
        question: "Peut-on utiliser Simple Analytics sans cookies ?",
        answer:
          "Oui, Simple Analytics fonctionne entierement sans cookies par conception. C'est son fonctionnement par defaut, pas une option a activer.",
      },
      {
        question: "Simple Analytics convient-il a un site e-commerce ?",
        answer:
          "Simple Analytics est adapte pour les metriques de base (trafic, sources, conversions), mais ne propose pas de suivi e-commerce avance (panier, revenus). Pour un e-commerce, Matomo ou Plausible Business sont plus adaptes.",
      },
    ],
  },
  {
    slug: "fathom",
    name: "Fathom Analytics",
    shortDescription:
      "Analytics premium, rapide et respectueux de la vie privee. Conforme RGPD.",
    description:
      "Fathom Analytics est un outil d'analyse web premium axe sur la simplicite et la vie privee. Fonde au Canada, il offre des tableaux de bord clairs, un script de tracking leger et une conformite RGPD native. Fathom se distingue par ses fonctionnalites d'uptime monitoring et ses rapports par email.",
    logoUrl: "/logos/fathom.svg",
    websiteUrl: "https://usefathom.com",
    categories: ["privacy-first", "sans-cookies"],
    pricing: [
      {
        name: "Growth",
        price: "15 $",
        period: "/mois",
        features: [
          "Jusqu'a 100 000 pages vues/mois",
          "50 sites",
          "Evenements personnalises",
          "Rapports email",
          "Uptime monitoring",
        ],
        highlighted: true,
      },
      {
        name: "Business",
        price: "25 $",
        period: "/mois",
        features: [
          "Jusqu'a 200 000 pages vues/mois",
          "100 sites",
          "API complete",
          "Support prioritaire",
          "Toutes les fonctionnalites",
        ],
      },
    ],
    features: [
      { label: "Suivi evenementiel", available: true },
      { label: "Analyse en temps reel", available: true },
      { label: "Suivi e-commerce", available: false },
      { label: "Entonnoirs de conversion", available: true },
      { label: "Uptime monitoring", available: true },
      { label: "Rapports email", available: true },
      { label: "Script leger", available: true },
      { label: "Respect vie privee par defaut", available: true },
      { label: "Mode sans cookies", available: true },
      { label: "Auto-hebergement", available: false },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: "Union Europeenne (pour les visiteurs UE)",
      details:
        "Fathom isole automatiquement les donnees des visiteurs UE sur des serveurs europeens. Il n'utilise pas de cookies et ne collecte pas de donnees personnelles. Conforme RGPD, CCPA et ePrivacy.",
    },
    pros: [
      "Interface tres simple et claire",
      "Uptime monitoring inclus",
      "Isolation des donnees UE automatique",
      "Script leger et rapide",
      "Rapports email automatiques",
    ],
    cons: [
      "Pas de version gratuite",
      "Pas d'auto-hebergement",
      "Pas de suivi e-commerce",
      "Tarification en dollars US",
      "Fonctionnalites avancees limitees",
    ],
    faq: [
      {
        question: "Fathom Analytics est-il gratuit ?",
        answer:
          "Non, Fathom ne propose pas de version gratuite. Les plans demarrent a 15 $/mois pour 100 000 pages vues. Un essai gratuit de 30 jours est disponible.",
      },
      {
        question: "Fathom est-il conforme au RGPD ?",
        answer:
          "Oui, Fathom est conforme au RGPD. Il isole automatiquement les donnees des visiteurs europeens sur des serveurs situes en UE et ne collecte aucune donnee personnelle.",
      },
      {
        question: "Fathom propose-t-il de l'uptime monitoring ?",
        answer:
          "Oui, Fathom inclut un monitoring de disponibilite de votre site avec alertes en cas de panne, directement integre dans le tableau de bord analytics.",
      },
    ],
  },
  {
    slug: "adobe-analytics",
    name: "Adobe Analytics",
    shortDescription:
      "Solution analytics entreprise avancee, leader du marche premium.",
    description:
      "Adobe Analytics fait partie de la suite Adobe Experience Cloud. C'est une solution analytics enterprise de reference, offrant des capacites avancees d'attribution, de segmentation en temps reel, d'analyse predictive (IA) et d'integration omnicanale. Principalement utilisee par les grandes entreprises et les sites a fort trafic.",
    logoUrl: "/logos/adobe-analytics.svg",
    websiteUrl: "https://business.adobe.com/products/analytics/adobe-analytics.html",
    categories: ["entreprise"],
    pricing: [
      {
        name: "Select",
        price: "Sur devis",
        features: [
          "Analytics de base",
          "Attribution rules-based",
          "Segmentation",
          "Rapports en temps reel",
          "Support standard",
        ],
      },
      {
        name: "Prime / Ultimate",
        price: "Sur devis",
        features: [
          "Attribution algorithmique (IA)",
          "Analyses predictives",
          "Audiences cross-device",
          "Integration Adobe Experience Platform",
          "Support premium dedie",
        ],
        highlighted: true,
      },
    ],
    features: [
      { label: "Suivi evenementiel", available: true },
      { label: "Analyse en temps reel", available: true },
      { label: "Suivi e-commerce", available: true },
      { label: "Entonnoirs de conversion", available: true },
      { label: "Attribution algorithmique (IA)", available: true },
      { label: "Analyses predictives", available: true },
      { label: "Segmentation avancee", available: true },
      { label: "Respect vie privee par defaut", available: false },
      { label: "Mode sans cookies", available: false },
      { label: "Auto-hebergement", available: false },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: false,
      cookieless: false,
      dataLocation: "Au choix : USA, Europe, Asie",
      details:
        "Adobe Analytics propose un hebergement des donnees en Europe. Adobe fournit des outils de conformite RGPD (suppression/export de donnees). Un bandeau de consentement est neanmoins necessaire car des cookies de tracking sont utilises.",
    },
    pros: [
      "Extremement puissant et complet",
      "IA predictive et attribution avancee",
      "Segmentation en temps reel",
      "Integration Adobe Experience Cloud",
      "Hebergement possible en Europe",
    ],
    cons: [
      "Prix tres eleve (a partir de ~100 000 $/an)",
      "Complexite de mise en oeuvre",
      "Necessite une equipe dediee",
      "Courbe d'apprentissage tres importante",
      "Necessite un bandeau cookies",
    ],
    faq: [
      {
        question: "Combien coute Adobe Analytics ?",
        answer:
          "Adobe Analytics fonctionne sur devis. Les tarifs demarrent generalement autour de 100 000 $ par an pour le plan Select. Les plans Prime et Ultimate sont encore plus chers.",
      },
      {
        question: "Adobe Analytics est-il adapte aux PME ?",
        answer:
          "Non, Adobe Analytics est concu pour les grandes entreprises avec des equipes analytics dediees. Pour les PME, des alternatives comme GA4, Matomo ou Plausible sont plus adaptees et abordables.",
      },
      {
        question: "Adobe Analytics est-il conforme au RGPD ?",
        answer:
          "Adobe propose des outils de conformite RGPD et permet l'hebergement en Europe. Cependant, des cookies de tracking sont utilises, necessitant un bandeau de consentement.",
      },
    ],
  },
  {
    slug: "umami",
    name: "Umami",
    shortDescription:
      "Analytics open source, leger et auto-hebergeable. Alternative gratuite et moderne.",
    description:
      "Umami est un outil d'analyse web open source, leger et axe sur la vie privee. Entierement auto-hebergeable, il offre un tableau de bord moderne et intuitif. Umami est une excellente alternative gratuite pour les developpeurs qui souhaitent garder le controle total de leurs donnees analytics sans compromis sur la simplicite.",
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
        period: "pour toujours",
        features: [
          "Toutes les fonctionnalites",
          "Sites et pages vues illimites",
          "Donnees 100 % chez vous",
          "Support communautaire",
          "MIT License",
        ],
        highlighted: true,
      },
      {
        name: "Cloud",
        price: "9 $",
        period: "/mois",
        features: [
          "100 000 evenements/mois",
          "Hebergement gere",
          "Mises a jour automatiques",
          "Support par email",
          "Sauvegardes incluses",
        ],
      },
    ],
    features: [
      { label: "Suivi evenementiel", available: true },
      { label: "Analyse en temps reel", available: true },
      { label: "Suivi e-commerce", available: false },
      { label: "Entonnoirs de conversion", available: false },
      { label: "Tableau de bord moderne", available: true },
      { label: "API complete", available: true },
      { label: "Multi-langue", available: true },
      { label: "Respect vie privee par defaut", available: true },
      { label: "Mode sans cookies", available: true },
      { label: "Auto-hebergement", available: true },
    ],
    compliance: {
      gdprCompliant: true,
      cnilExempt: true,
      cookieless: true,
      dataLocation: "Votre serveur (auto-heberge) ou cloud",
      details:
        "Umami ne collecte aucune donnee personnelle et n'utilise pas de cookies. En auto-hebergement, vous avez un controle total sur les donnees. Conforme RGPD sans bandeau de consentement.",
    },
    pros: [
      "100 % open source (MIT License)",
      "Gratuit et auto-hebergeable",
      "Interface moderne et intuitive",
      "Tres leger et performant",
      "Facile a deployer (Docker, Vercel, Railway)",
    ],
    cons: [
      "Pas de suivi e-commerce",
      "Pas d'entonnoirs de conversion",
      "Pas de heatmaps ni session recording",
      "Necessite connaissances techniques (self-hosted)",
      "Communaute plus petite que Matomo",
    ],
    faq: [
      {
        question: "Umami est-il gratuit ?",
        answer:
          "Oui, Umami est 100 % gratuit et open source (licence MIT) en auto-hebergement. La version cloud demarre a 9 $/mois.",
      },
      {
        question: "Comment deployer Umami ?",
        answer:
          "Umami peut etre deploye via Docker, Vercel, Railway ou tout serveur supportant Node.js. Il necessite une base de donnees PostgreSQL ou MySQL.",
      },
      {
        question: "Umami est-il adapte pour un gros site ?",
        answer:
          "Umami est performant et peut gerer un trafic important en auto-hebergement avec un serveur adapte. Pour les tres gros volumes, Matomo ou une solution enterprise seront plus adaptes.",
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
