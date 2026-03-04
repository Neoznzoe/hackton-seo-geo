import { GlossaryTerm } from "@/lib/types";

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "RGPD",
    slug: "rgpd",
    definition:
      "Le Reglement General sur la Protection des Donnees (RGPD) est un reglement europeen entre en vigueur le 25 mai 2018. Il encadre le traitement des donnees personnelles des residents de l'Union Europeenne et impose des obligations strictes aux entreprises en matiere de collecte, stockage et utilisation des donnees.",
    relatedTools: ["matomo", "plausible", "piwik-pro", "simple-analytics", "fathom", "umami"],
  },
  {
    term: "CNIL",
    slug: "cnil",
    definition:
      "La Commission Nationale de l'Informatique et des Libertes (CNIL) est l'autorite francaise de protection des donnees. Elle veille a l'application du RGPD en France, emet des recommandations sur les outils analytics et peut exempter certains outils du recueil de consentement.",
    relatedTools: ["matomo", "plausible", "piwik-pro"],
  },
  {
    term: "Cookies",
    slug: "cookies",
    definition:
      "Les cookies sont de petits fichiers texte stockes sur le navigateur de l'utilisateur. En analytics, ils servent a identifier les visiteurs recurrents et suivre leur comportement. Le RGPD impose le consentement prealable pour les cookies non essentiels.",
    relatedTools: ["google-analytics-4", "adobe-analytics"],
  },
  {
    term: "Consentement",
    slug: "consentement",
    definition:
      "Le consentement est l'accord explicite donne par un utilisateur avant la collecte de ses donnees personnelles. Le RGPD exige un consentement libre, specifique, eclaire et univoque. Certains outils analytics sans cookies en sont exemptes.",
  },
  {
    term: "Analytics sans cookies",
    slug: "analytics-sans-cookies",
    definition:
      "Les outils analytics sans cookies identifient les visiteurs sans stocker de fichiers sur leur navigateur, generalement via un hash anonyme combine a l'adresse IP et au User-Agent. Cette approche est souvent exemptee de consentement par la CNIL.",
    relatedTools: ["plausible", "simple-analytics", "fathom", "umami"],
  },
  {
    term: "Auto-hebergement",
    slug: "auto-hebergement",
    definition:
      "L'auto-hebergement (self-hosting) consiste a installer et gerer un logiciel analytics sur ses propres serveurs. Cela garantit un controle total des donnees et une souverainete numerique complete, mais necessite des competences techniques.",
    relatedTools: ["matomo", "plausible", "umami"],
  },
  {
    term: "Open Source",
    slug: "open-source",
    definition:
      "Un logiciel open source rend son code source accessible publiquement. En analytics, cela permet d'auditer le code, de verifier qu'aucune donnee n'est collectee a votre insu, et de contribuer au developpement du projet.",
    relatedTools: ["matomo", "plausible", "umami"],
  },
  {
    term: "Tracking evenementiel",
    slug: "tracking-evenementiel",
    definition:
      "Le tracking evenementiel est un modele de collecte de donnees base sur les actions des utilisateurs (clics, telechargements, soumissions de formulaire) plutot que sur les seules pages vues. C'est le modele standard de GA4.",
    relatedTools: ["google-analytics-4", "matomo", "plausible"],
  },
  {
    term: "Donnees personnelles",
    slug: "donnees-personnelles",
    definition:
      "Les donnees personnelles sont toute information relative a une personne physique identifiee ou identifiable : nom, email, adresse IP, identifiant de cookie, etc. Le RGPD encadre strictement leur traitement.",
  },
  {
    term: "Bandeau de consentement",
    slug: "bandeau-consentement",
    definition:
      "Le bandeau de consentement (cookie banner) est l'interface qui informe les visiteurs des cookies utilises et recueille leur consentement. Il est obligatoire pour tout site utilisant des cookies non essentiels selon le RGPD.",
  },
  {
    term: "Taux de rebond",
    slug: "taux-de-rebond",
    definition:
      "Le taux de rebond mesure le pourcentage de visiteurs qui quittent un site apres n'avoir consulte qu'une seule page. Un taux eleve peut indiquer un probleme d'UX ou un contenu non pertinent.",
  },
  {
    term: "Entonnoir de conversion",
    slug: "entonnoir-conversion",
    definition:
      "L'entonnoir de conversion (funnel) est une visualisation du parcours utilisateur vers un objectif (achat, inscription). Il permet d'identifier les etapes ou les visiteurs abandonnent et d'optimiser le taux de conversion.",
    relatedTools: ["google-analytics-4", "matomo", "piwik-pro"],
  },
  {
    term: "Heatmap",
    slug: "heatmap",
    definition:
      "Une heatmap (carte de chaleur) est une representation visuelle des zones les plus cliquees ou survolees d'une page web. Elle permet d'analyser le comportement des utilisateurs et d'optimiser l'ergonomie.",
    relatedTools: ["matomo"],
  },
  {
    term: "Tag Manager",
    slug: "tag-manager",
    definition:
      "Un Tag Manager est un outil permettant d'ajouter et de gerer des scripts de suivi (tags) sur un site web sans modifier le code source. Il simplifie le deploiement des outils analytics, marketing et publicitaires.",
    relatedTools: ["google-analytics-4", "piwik-pro"],
  },
  {
    term: "Attribution",
    slug: "attribution",
    definition:
      "L'attribution est le processus qui determine quels canaux marketing (publicite, SEO, email, reseaux sociaux) ont contribue a une conversion. Les modeles d'attribution peuvent etre simples (dernier clic) ou algorithmiques (IA).",
    relatedTools: ["google-analytics-4", "adobe-analytics"],
  },
  {
    term: "BigQuery",
    slug: "bigquery",
    definition:
      "BigQuery est un entrepot de donnees cloud de Google. GA4 offre un export natif vers BigQuery, permettant des analyses SQL avancees sur les donnees analytics brutes, sans echantillonnage.",
    relatedTools: ["google-analytics-4"],
  },
  {
    term: "Server-side tagging",
    slug: "server-side-tagging",
    definition:
      "Le server-side tagging consiste a envoyer les donnees de tracking depuis votre serveur plutot que depuis le navigateur du visiteur. Cela ameliore les performances, la vie privee et la fiabilite de la collecte.",
    relatedTools: ["google-analytics-4", "matomo"],
  },
  {
    term: "Consent Mode",
    slug: "consent-mode",
    definition:
      "Le Consent Mode est une fonctionnalite de Google qui adapte le comportement des tags Google en fonction du consentement de l'utilisateur. Le Consent Mode v2 est obligatoire depuis mars 2024 pour les annonceurs utilisant Google Ads en Europe.",
    relatedTools: ["google-analytics-4"],
  },
  {
    term: "Privacy by design",
    slug: "privacy-by-design",
    definition:
      "Le Privacy by Design est un principe qui integre la protection de la vie privee des la conception d'un produit. En analytics, cela signifie minimiser la collecte de donnees, anonymiser par defaut et ne pas utiliser de cookies.",
    relatedTools: ["plausible", "simple-analytics", "fathom", "umami"],
  },
  {
    term: "Anonymisation IP",
    slug: "anonymisation-ip",
    definition:
      "L'anonymisation IP consiste a masquer une partie de l'adresse IP du visiteur avant son stockage. C'est une technique recommandee par la CNIL pour minimiser la collecte de donnees personnelles en analytics.",
    relatedTools: ["matomo", "plausible", "umami"],
  },
  {
    term: "SPA (Single Page Application)",
    slug: "spa",
    definition:
      "Une SPA est une application web qui charge une seule page HTML et met a jour dynamiquement le contenu. Les outils analytics doivent supporter le suivi SPA pour comptabiliser correctement les navigations sans rechargement de page.",
  },
  {
    term: "UTM",
    slug: "utm",
    definition:
      "Les parametres UTM (Urchin Tracking Module) sont des balises ajoutees aux URLs pour suivre l'origine du trafic dans les outils analytics. Les 5 parametres sont : source, medium, campaign, term et content.",
  },
  {
    term: "CDP (Customer Data Platform)",
    slug: "cdp",
    definition:
      "Une CDP est une plateforme qui centralise les donnees clients provenant de multiples sources pour creer des profils unifies. Piwik PRO propose une CDP integree a sa suite analytics dans son offre Enterprise.",
    relatedTools: ["piwik-pro"],
  },
  {
    term: "Echantillonnage",
    slug: "echantillonnage",
    definition:
      "L'echantillonnage est une technique qui analyse un sous-ensemble representatif des donnees plutot que l'ensemble complet. GA4 applique un echantillonnage sur les gros volumes en version gratuite, ce qui peut affecter la precision des rapports.",
    relatedTools: ["google-analytics-4"],
  },
  {
    term: "ePrivacy",
    slug: "eprivacy",
    definition:
      "La directive ePrivacy (2002/58/CE) est une reglementation europeenne complementaire au RGPD qui regit specifiquement les communications electroniques, y compris l'utilisation des cookies et le tracking en ligne.",
  },
];

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}
