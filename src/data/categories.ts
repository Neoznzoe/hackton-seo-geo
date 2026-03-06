import { Category } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/constants";

export const categories: Category[] = [
  {
    slug: "privacy-first",
    name: { fr: "Privacy-First", en: "Privacy-First" },
    description: {
      fr: "Outils analytics qui placent la protection de la vie privee au coeur de leur fonctionnement. Conformes au RGPD sans bandeau de consentement.",
      en: "Analytics tools that put privacy at the core of their operation. GDPR compliant without consent banners.",
    },
    metaTitle: {
      fr: `Meilleurs outils analytics privacy-first en ${CURRENT_YEAR}`,
      en: `Best privacy-first analytics tools in ${CURRENT_YEAR}`,
    },
    metaDescription: {
      fr: "Comparatif des outils analytics respectueux de la vie privee : Matomo, Plausible, Fathom, Umami, Piwik PRO, Simple Analytics. Conformes RGPD sans consentement.",
      en: "Comparison of privacy-friendly analytics tools: Matomo, Plausible, Fathom, Umami, Piwik PRO, Simple Analytics. GDPR compliant without consent.",
    },
  },
  {
    slug: "open-source",
    name: { fr: "Open Source", en: "Open Source" },
    description: {
      fr: "Solutions analytics open source que vous pouvez auto-heberger, auditer et personnaliser. Code transparent et communaute active.",
      en: "Open source analytics solutions you can self-host, audit and customize. Transparent code and active community.",
    },
    metaTitle: {
      fr: `Meilleurs outils analytics open source en ${CURRENT_YEAR}`,
      en: `Best open source analytics tools in ${CURRENT_YEAR}`,
    },
    metaDescription: {
      fr: "Comparatif des solutions analytics open source : Matomo, Plausible, Umami. Auto-hebergement, code transparent et gratuit.",
      en: "Comparison of open source analytics solutions: Matomo, Plausible, Umami. Self-hosting, transparent code and free.",
    },
  },
  {
    slug: "gratuit",
    name: { fr: "Gratuit", en: "Free" },
    description: {
      fr: "Outils analytics proposant une offre gratuite genereuse, suffisante pour la plupart des sites web et applications.",
      en: "Analytics tools offering a generous free plan, sufficient for most websites and applications.",
    },
    metaTitle: {
      fr: `Meilleurs outils analytics gratuits en ${CURRENT_YEAR}`,
      en: `Best free analytics tools in ${CURRENT_YEAR}`,
    },
    metaDescription: {
      fr: "Comparatif des outils analytics gratuits : Google Analytics 4, Matomo On-Premise, Umami, Piwik PRO Core. Solutions gratuites pour votre site web.",
      en: "Comparison of free analytics tools: Google Analytics 4, Matomo On-Premise, Umami, Piwik PRO Core. Free solutions for your website.",
    },
  },
  {
    slug: "entreprise",
    name: { fr: "Entreprise", en: "Enterprise" },
    description: {
      fr: "Solutions analytics conques pour les grandes entreprises : fonctionnalites avancees, SLA, support dedie et scalabilite.",
      en: "Analytics solutions designed for large enterprises: advanced features, SLA, dedicated support and scalability.",
    },
    metaTitle: {
      fr: `Meilleurs outils analytics entreprise en ${CURRENT_YEAR}`,
      en: `Best enterprise analytics tools in ${CURRENT_YEAR}`,
    },
    metaDescription: {
      fr: "Comparatif des solutions analytics entreprise : Adobe Analytics, Google Analytics 360, Piwik PRO Enterprise. Outils pour les grandes organisations.",
      en: "Comparison of enterprise analytics solutions: Adobe Analytics, Google Analytics 360, Piwik PRO Enterprise. Tools for large organizations.",
    },
  },
  {
    slug: "sans-cookies",
    name: { fr: "Sans Cookies", en: "Cookieless" },
    description: {
      fr: "Outils analytics fonctionnant sans aucun cookie. Aucun bandeau de consentement requis, conformite RGPD simplifiee.",
      en: "Analytics tools that work without any cookies. No consent banner required, simplified GDPR compliance.",
    },
    metaTitle: {
      fr: `Meilleurs outils analytics sans cookies en ${CURRENT_YEAR}`,
      en: `Best cookieless analytics tools in ${CURRENT_YEAR}`,
    },
    metaDescription: {
      fr: "Comparatif des outils analytics sans cookies : Plausible, Simple Analytics, Fathom, Umami. Pas de bandeau de consentement necessaire.",
      en: "Comparison of cookieless analytics tools: Plausible, Simple Analytics, Fathom, Umami. No consent banner needed.",
    },
  },
  {
    slug: "hebergement-local",
    name: { fr: "Hebergement Local", en: "Self-Hosting" },
    description: {
      fr: "Solutions analytics auto-hebergeables sur vos propres serveurs. Controle total des donnees, ideal pour la souverainete numerique.",
      en: "Self-hostable analytics solutions on your own servers. Full data control, ideal for digital sovereignty.",
    },
    metaTitle: {
      fr: `Meilleurs outils analytics auto-hebergeables en ${CURRENT_YEAR}`,
      en: `Best self-hostable analytics tools in ${CURRENT_YEAR}`,
    },
    metaDescription: {
      fr: "Comparatif des outils analytics auto-hebergeables : Matomo, Plausible, Umami, Piwik PRO. Gardez le controle total de vos donnees analytics.",
      en: "Comparison of self-hostable analytics tools: Matomo, Plausible, Umami, Piwik PRO. Keep full control of your analytics data.",
    },
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
