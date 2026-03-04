import { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "privacy-first",
    name: "Privacy-First",
    description:
      "Outils analytics qui placent la protection de la vie privee au coeur de leur fonctionnement. Conformes au RGPD sans bandeau de consentement.",
    metaTitle: "Meilleurs outils analytics privacy-first en 2025",
    metaDescription:
      "Comparatif des outils analytics respectueux de la vie privee : Matomo, Plausible, Fathom, Umami, Piwik PRO, Simple Analytics. Conformes RGPD sans consentement.",
  },
  {
    slug: "open-source",
    name: "Open Source",
    description:
      "Solutions analytics open source que vous pouvez auto-heberger, auditer et personnaliser. Code transparent et communaute active.",
    metaTitle: "Meilleurs outils analytics open source en 2025",
    metaDescription:
      "Comparatif des solutions analytics open source : Matomo, Plausible, Umami. Auto-hebergement, code transparent et gratuit.",
  },
  {
    slug: "gratuit",
    name: "Gratuit",
    description:
      "Outils analytics proposant une offre gratuite genereuse, suffisante pour la plupart des sites web et applications.",
    metaTitle: "Meilleurs outils analytics gratuits en 2025",
    metaDescription:
      "Comparatif des outils analytics gratuits : Google Analytics 4, Matomo On-Premise, Umami, Piwik PRO Core. Solutions gratuites pour votre site web.",
  },
  {
    slug: "entreprise",
    name: "Entreprise",
    description:
      "Solutions analytics conques pour les grandes entreprises : fonctionnalites avancees, SLA, support dedie et scalabilite.",
    metaTitle: "Meilleurs outils analytics entreprise en 2025",
    metaDescription:
      "Comparatif des solutions analytics entreprise : Adobe Analytics, Google Analytics 360, Piwik PRO Enterprise. Outils pour les grandes organisations.",
  },
  {
    slug: "sans-cookies",
    name: "Sans Cookies",
    description:
      "Outils analytics fonctionnant sans aucun cookie. Aucun bandeau de consentement requis, conformite RGPD simplifiee.",
    metaTitle: "Meilleurs outils analytics sans cookies en 2025",
    metaDescription:
      "Comparatif des outils analytics sans cookies : Plausible, Simple Analytics, Fathom, Umami. Pas de bandeau de consentement necessaire.",
  },
  {
    slug: "hebergement-local",
    name: "Hebergement Local",
    description:
      "Solutions analytics auto-hebergeables sur vos propres serveurs. Controle total des donnees, ideal pour la souverainete numerique.",
    metaTitle: "Meilleurs outils analytics auto-hebergeables en 2025",
    metaDescription:
      "Comparatif des outils analytics auto-hebergeables : Matomo, Plausible, Umami, Piwik PRO. Gardez le controle total de vos donnees analytics.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
