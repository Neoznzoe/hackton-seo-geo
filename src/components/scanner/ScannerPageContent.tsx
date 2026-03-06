"use client";

import { useTranslation } from "@/lib/i18n/LanguageProvider";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FaqSection from "@/components/content/FaqSection";
import { FaqItem } from "@/lib/types";

const FAQ_ITEMS: FaqItem[] = [
  {
    question: { fr: "Comment fonctionne le scanner RGPD ?", en: "How does the GDPR scanner work?" },
    answer: {
      fr: "Le scanner analyse le code source HTML de la page d'accueil du site indiqué. Il recherche les signatures connues des outils analytics (Google Analytics, Matomo, Plausible...), des pixels de tracking (Meta, LinkedIn, TikTok...) et des bandeaux de consentement (Tarteaucitron, Axeptio, Cookiebot...). Le score de risque est calculé en fonction des outils détectés et de la présence d'un bandeau de consentement.",
      en: "The scanner analyzes the HTML source code of the specified site's homepage. It searches for known signatures of analytics tools (Google Analytics, Matomo, Plausible...), tracking pixels (Meta, LinkedIn, TikTok...) and consent banners (Tarteaucitron, Axeptio, Cookiebot...). The risk score is calculated based on detected tools and the presence of a consent banner.",
    },
  },
  {
    question: { fr: "Quels outils analytics sont détectés ?", en: "Which analytics tools are detected?" },
    answer: {
      fr: "Le scanner détecte Google Analytics 4, Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics, Adobe Analytics, Umami, ainsi que les pixels Meta (Facebook), LinkedIn, TikTok, Twitter/X et Hotjar. Il identifie également Google Tag Manager et les principaux bandeaux de consentement.",
      en: "The scanner detects Google Analytics 4, Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics, Adobe Analytics, Umami, as well as Meta (Facebook), LinkedIn, TikTok, Twitter/X and Hotjar pixels. It also identifies Google Tag Manager and major consent banners.",
    },
  },
  {
    question: { fr: "Le scanner stocke-t-il des données ?", en: "Does the scanner store data?" },
    answer: {
      fr: "Non, le scanner ne stocke aucune donnée. L'analyse est effectuée en temps réel et les résultats ne sont pas conservés. Seul le code HTML public de la page est analysé, aucune donnée personnelle n'est collectée.",
      en: "No, the scanner does not store any data. The analysis is performed in real-time and results are not retained. Only the public HTML code of the page is analyzed, no personal data is collected.",
    },
  },
  {
    question: { fr: "Qu'est-ce qu'un outil exempté CNIL ?", en: "What is a CNIL-exempt tool?" },
    answer: {
      fr: "La CNIL accorde une exemption de consentement à certains outils analytics qui respectent des critères stricts : données anonymisées, pas de transfert hors UE, finalité strictement limitée à la mesure d'audience. Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics et Umami bénéficient de cette exemption sous certaines configurations.",
      en: "The CNIL grants a consent exemption to certain analytics tools that meet strict criteria: anonymized data, no transfers outside the EU, purpose strictly limited to audience measurement. Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics and Umami benefit from this exemption under certain configurations.",
    },
  },
  {
    question: { fr: "Le score de risque est-il fiable à 100% ?", en: "Is the risk score 100% reliable?" },
    answer: {
      fr: "Le scanner analyse uniquement le code source HTML visible de la page d'accueil. Certains scripts peuvent être chargés dynamiquement, via un tag manager, ou sur d'autres pages du site. Le score donne une indication fiable mais ne remplace pas un audit RGPD complet.",
      en: "The scanner only analyzes the visible HTML source code of the homepage. Some scripts may be loaded dynamically, via a tag manager, or on other pages of the site. The score provides a reliable indication but does not replace a complete GDPR audit.",
    },
  },
];

export function ScannerBreadcrumb() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
      <Breadcrumb
        items={[
          { label: t("scanner.breadcrumbHome"), href: "/" },
          { label: t("scanner.breadcrumbScanner"), href: "/scanner" },
        ]}
      />
    </div>
  );
}

export function ScannerFaq() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <FaqSection items={FAQ_ITEMS} heading={t("scanner.faq")} />
    </section>
  );
}
