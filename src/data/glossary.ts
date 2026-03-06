import { GlossaryTerm } from "@/lib/types";

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: { fr: "RGPD", en: "GDPR" },
    slug: "rgpd",
    definition: {
      fr: "Le Reglement General sur la Protection des Donnees (RGPD) est un reglement europeen entre en vigueur le 25 mai 2018. Il encadre le traitement des donnees personnelles des residents de l'Union Europeenne et impose des obligations strictes aux entreprises en matiere de collecte, stockage et utilisation des donnees.",
      en: "The General Data Protection Regulation (GDPR) is a European regulation that came into effect on May 25, 2018. It governs the processing of personal data of European Union residents and imposes strict obligations on companies regarding data collection, storage and use.",
    },
    relatedTools: ["matomo", "plausible", "piwik-pro", "simple-analytics", "fathom", "umami"],
  },
  {
    term: { fr: "CNIL", en: "CNIL" },
    slug: "cnil",
    definition: {
      fr: "La Commission Nationale de l'Informatique et des Libertes (CNIL) est l'autorite francaise de protection des donnees. Elle veille a l'application du RGPD en France, emet des recommandations sur les outils analytics et peut exempter certains outils du recueil de consentement.",
      en: "The Commission Nationale de l'Informatique et des Libertes (CNIL) is the French data protection authority. It oversees GDPR enforcement in France, issues recommendations on analytics tools and can exempt certain tools from consent requirements.",
    },
    relatedTools: ["matomo", "plausible", "piwik-pro"],
  },
  {
    term: { fr: "Cookies", en: "Cookies" },
    slug: "cookies",
    definition: {
      fr: "Les cookies sont de petits fichiers texte stockes sur le navigateur de l'utilisateur. En analytics, ils servent a identifier les visiteurs recurrents et suivre leur comportement. Le RGPD impose le consentement prealable pour les cookies non essentiels.",
      en: "Cookies are small text files stored on the user's browser. In analytics, they are used to identify returning visitors and track their behavior. The GDPR requires prior consent for non-essential cookies.",
    },
    relatedTools: ["google-analytics-4", "adobe-analytics"],
  },
  {
    term: { fr: "Consentement", en: "Consent" },
    slug: "consentement",
    definition: {
      fr: "Le consentement est l'accord explicite donne par un utilisateur avant la collecte de ses donnees personnelles. Le RGPD exige un consentement libre, specifique, eclaire et univoque. Certains outils analytics sans cookies en sont exemptes.",
      en: "Consent is the explicit agreement given by a user before the collection of their personal data. The GDPR requires consent that is freely given, specific, informed and unambiguous. Some cookieless analytics tools are exempt from this requirement.",
    },
  },
  {
    term: { fr: "Analytics sans cookies", en: "Cookieless analytics" },
    slug: "analytics-sans-cookies",
    definition: {
      fr: "Les outils analytics sans cookies identifient les visiteurs sans stocker de fichiers sur leur navigateur, generalement via un hash anonyme combine a l'adresse IP et au User-Agent. Cette approche est souvent exemptee de consentement par la CNIL.",
      en: "Cookieless analytics tools identify visitors without storing files on their browser, typically through an anonymous hash combining the IP address and User-Agent. This approach is often exempt from consent requirements by the CNIL.",
    },
    relatedTools: ["plausible", "simple-analytics", "fathom", "umami"],
  },
  {
    term: { fr: "Auto-hebergement", en: "Self-hosting" },
    slug: "auto-hebergement",
    definition: {
      fr: "L'auto-hebergement (self-hosting) consiste a installer et gerer un logiciel analytics sur ses propres serveurs. Cela garantit un controle total des donnees et une souverainete numerique complete, mais necessite des competences techniques.",
      en: "Self-hosting means installing and managing analytics software on your own servers. It guarantees full data control and complete digital sovereignty, but requires technical expertise.",
    },
    relatedTools: ["matomo", "plausible", "umami"],
  },
  {
    term: { fr: "Open Source", en: "Open Source" },
    slug: "open-source",
    definition: {
      fr: "Un logiciel open source rend son code source accessible publiquement. En analytics, cela permet d'auditer le code, de verifier qu'aucune donnee n'est collectee a votre insu, et de contribuer au developpement du projet.",
      en: "Open source software makes its source code publicly accessible. In analytics, this allows you to audit the code, verify that no data is collected without your knowledge, and contribute to the project's development.",
    },
    relatedTools: ["matomo", "plausible", "umami"],
  },
  {
    term: { fr: "Tracking evenementiel", en: "Event tracking" },
    slug: "tracking-evenementiel",
    definition: {
      fr: "Le tracking evenementiel est un modele de collecte de donnees base sur les actions des utilisateurs (clics, telechargements, soumissions de formulaire) plutot que sur les seules pages vues. C'est le modele standard de GA4.",
      en: "Event tracking is a data collection model based on user actions (clicks, downloads, form submissions) rather than page views alone. It is the standard model in GA4.",
    },
    relatedTools: ["google-analytics-4", "matomo", "plausible"],
  },
  {
    term: { fr: "Donnees personnelles", en: "Personal data" },
    slug: "donnees-personnelles",
    definition: {
      fr: "Les donnees personnelles sont toute information relative a une personne physique identifiee ou identifiable : nom, email, adresse IP, identifiant de cookie, etc. Le RGPD encadre strictement leur traitement.",
      en: "Personal data is any information relating to an identified or identifiable natural person: name, email, IP address, cookie identifier, etc. The GDPR strictly regulates their processing.",
    },
  },
  {
    term: { fr: "Bandeau de consentement", en: "Consent banner" },
    slug: "bandeau-consentement",
    definition: {
      fr: "Le bandeau de consentement (cookie banner) est l'interface qui informe les visiteurs des cookies utilises et recueille leur consentement. Il est obligatoire pour tout site utilisant des cookies non essentiels selon le RGPD.",
      en: "The consent banner (cookie banner) is the interface that informs visitors about the cookies used and collects their consent. It is mandatory for any website using non-essential cookies under the GDPR.",
    },
  },
  {
    term: { fr: "Taux de rebond", en: "Bounce rate" },
    slug: "taux-de-rebond",
    definition: {
      fr: "Le taux de rebond mesure le pourcentage de visiteurs qui quittent un site apres n'avoir consulte qu'une seule page. Un taux eleve peut indiquer un probleme d'UX ou un contenu non pertinent.",
      en: "Bounce rate measures the percentage of visitors who leave a site after viewing only one page. A high rate may indicate a UX problem or irrelevant content.",
    },
  },
  {
    term: { fr: "Entonnoir de conversion", en: "Conversion funnel" },
    slug: "entonnoir-conversion",
    definition: {
      fr: "L'entonnoir de conversion (funnel) est une visualisation du parcours utilisateur vers un objectif (achat, inscription). Il permet d'identifier les etapes ou les visiteurs abandonnent et d'optimiser le taux de conversion.",
      en: "The conversion funnel is a visualization of the user journey toward a goal (purchase, sign-up). It helps identify the steps where visitors drop off and optimize the conversion rate.",
    },
    relatedTools: ["google-analytics-4", "matomo", "piwik-pro"],
  },
  {
    term: { fr: "Heatmap", en: "Heatmap" },
    slug: "heatmap",
    definition: {
      fr: "Une heatmap (carte de chaleur) est une representation visuelle des zones les plus cliquees ou survolees d'une page web. Elle permet d'analyser le comportement des utilisateurs et d'optimiser l'ergonomie.",
      en: "A heatmap is a visual representation of the most clicked or hovered areas of a web page. It helps analyze user behavior and optimize usability.",
    },
    relatedTools: ["matomo"],
  },
  {
    term: { fr: "Tag Manager", en: "Tag Manager" },
    slug: "tag-manager",
    definition: {
      fr: "Un Tag Manager est un outil permettant d'ajouter et de gerer des scripts de suivi (tags) sur un site web sans modifier le code source. Il simplifie le deploiement des outils analytics, marketing et publicitaires.",
      en: "A Tag Manager is a tool for adding and managing tracking scripts (tags) on a website without modifying the source code. It simplifies the deployment of analytics, marketing and advertising tools.",
    },
    relatedTools: ["google-analytics-4", "piwik-pro"],
  },
  {
    term: { fr: "Attribution", en: "Attribution" },
    slug: "attribution",
    definition: {
      fr: "L'attribution est le processus qui determine quels canaux marketing (publicite, SEO, email, reseaux sociaux) ont contribue a une conversion. Les modeles d'attribution peuvent etre simples (dernier clic) ou algorithmiques (IA).",
      en: "Attribution is the process of determining which marketing channels (advertising, SEO, email, social media) contributed to a conversion. Attribution models can be simple (last click) or algorithmic (AI).",
    },
    relatedTools: ["google-analytics-4", "adobe-analytics"],
  },
  {
    term: { fr: "BigQuery", en: "BigQuery" },
    slug: "bigquery",
    definition: {
      fr: "BigQuery est un entrepot de donnees cloud de Google. GA4 offre un export natif vers BigQuery, permettant des analyses SQL avancees sur les donnees analytics brutes, sans echantillonnage.",
      en: "BigQuery is a Google cloud data warehouse. GA4 offers native export to BigQuery, enabling advanced SQL analysis on raw analytics data without sampling.",
    },
    relatedTools: ["google-analytics-4"],
  },
  {
    term: { fr: "Server-side tagging", en: "Server-side tagging" },
    slug: "server-side-tagging",
    definition: {
      fr: "Le server-side tagging consiste a envoyer les donnees de tracking depuis votre serveur plutot que depuis le navigateur du visiteur. Cela ameliore les performances, la vie privee et la fiabilite de la collecte.",
      en: "Server-side tagging involves sending tracking data from your server rather than from the visitor's browser. This improves performance, privacy and data collection reliability.",
    },
    relatedTools: ["google-analytics-4", "matomo"],
  },
  {
    term: { fr: "Consent Mode", en: "Consent Mode" },
    slug: "consent-mode",
    definition: {
      fr: "Le Consent Mode est une fonctionnalite de Google qui adapte le comportement des tags Google en fonction du consentement de l'utilisateur. Le Consent Mode v2 est obligatoire depuis mars 2024 pour les annonceurs utilisant Google Ads en Europe.",
      en: "Consent Mode is a Google feature that adjusts the behavior of Google tags based on user consent. Consent Mode v2 has been mandatory since March 2024 for advertisers using Google Ads in Europe.",
    },
    relatedTools: ["google-analytics-4"],
  },
  {
    term: { fr: "Privacy by design", en: "Privacy by design" },
    slug: "privacy-by-design",
    definition: {
      fr: "Le Privacy by Design est un principe qui integre la protection de la vie privee des la conception d'un produit. En analytics, cela signifie minimiser la collecte de donnees, anonymiser par defaut et ne pas utiliser de cookies.",
      en: "Privacy by Design is a principle that integrates privacy protection from the very design stage of a product. In analytics, this means minimizing data collection, anonymizing by default and not using cookies.",
    },
    relatedTools: ["plausible", "simple-analytics", "fathom", "umami"],
  },
  {
    term: { fr: "Anonymisation IP", en: "IP anonymization" },
    slug: "anonymisation-ip",
    definition: {
      fr: "L'anonymisation IP consiste a masquer une partie de l'adresse IP du visiteur avant son stockage. C'est une technique recommandee par la CNIL pour minimiser la collecte de donnees personnelles en analytics.",
      en: "IP anonymization involves masking part of the visitor's IP address before storage. It is a technique recommended by the CNIL to minimize the collection of personal data in analytics.",
    },
    relatedTools: ["matomo", "plausible", "umami"],
  },
  {
    term: { fr: "SPA (Single Page Application)", en: "SPA (Single Page Application)" },
    slug: "spa",
    definition: {
      fr: "Une SPA est une application web qui charge une seule page HTML et met a jour dynamiquement le contenu. Les outils analytics doivent supporter le suivi SPA pour comptabiliser correctement les navigations sans rechargement de page.",
      en: "A SPA is a web application that loads a single HTML page and dynamically updates its content. Analytics tools must support SPA tracking to correctly count navigations without page reloads.",
    },
  },
  {
    term: { fr: "UTM", en: "UTM" },
    slug: "utm",
    definition: {
      fr: "Les parametres UTM (Urchin Tracking Module) sont des balises ajoutees aux URLs pour suivre l'origine du trafic dans les outils analytics. Les 5 parametres sont : source, medium, campaign, term et content.",
      en: "UTM (Urchin Tracking Module) parameters are tags added to URLs to track traffic origin in analytics tools. The 5 parameters are: source, medium, campaign, term and content.",
    },
  },
  {
    term: { fr: "CDP (Customer Data Platform)", en: "CDP (Customer Data Platform)" },
    slug: "cdp",
    definition: {
      fr: "Une CDP est une plateforme qui centralise les donnees clients provenant de multiples sources pour creer des profils unifies. Piwik PRO propose une CDP integree a sa suite analytics dans son offre Enterprise.",
      en: "A CDP is a platform that centralizes customer data from multiple sources to create unified profiles. Piwik PRO offers a CDP integrated into its analytics suite in its Enterprise plan.",
    },
    relatedTools: ["piwik-pro"],
  },
  {
    term: { fr: "Echantillonnage", en: "Sampling" },
    slug: "echantillonnage",
    definition: {
      fr: "L'echantillonnage est une technique qui analyse un sous-ensemble representatif des donnees plutot que l'ensemble complet. GA4 applique un echantillonnage sur les gros volumes en version gratuite, ce qui peut affecter la precision des rapports.",
      en: "Sampling is a technique that analyzes a representative subset of data rather than the complete dataset. GA4 applies sampling on large volumes in its free version, which can affect report accuracy.",
    },
    relatedTools: ["google-analytics-4"],
  },
  {
    term: { fr: "ePrivacy", en: "ePrivacy" },
    slug: "eprivacy",
    definition: {
      fr: "La directive ePrivacy (2002/58/CE) est une reglementation europeenne complementaire au RGPD qui regit specifiquement les communications electroniques, y compris l'utilisation des cookies et le tracking en ligne.",
      en: "The ePrivacy Directive (2002/58/EC) is a European regulation complementary to the GDPR that specifically governs electronic communications, including the use of cookies and online tracking.",
    },
  },
];

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}
